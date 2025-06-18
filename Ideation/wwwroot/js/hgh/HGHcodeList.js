var projectArray = [];
projectArray = $("#ProjectValue").val();
projectArray = projectArray != [] && projectArray != null ? JSON.parse(projectArray) : [];
var SelectedFlag = 0;

var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 1));

$('[data-datepicker-startdate1]').datepicker({
    format: 'dd/mm/yyyy',
    endDate: end,
    autoclose: true
}).on('changeDate', function () {
    $('[data-datepicker-enddate1]').datepicker('setStartDate', $(this).val());
});
$('[data-datepicker-enddate1]').datepicker({
    format: 'dd/mm/yyyy',
    enddate: end,
    autoclose: true
}).on('changeDate', function () {
    $('[data-datepicker-startdate1]').datepicker('setEndDate', $(this).val());
});

initializeAutocomplete();

function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function initializeAutocomplete() {
    $("[data-projectid]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                SelectedFlag = 0;
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                var obj = [];
                var cnt = 0;
                $.grep(projectArray, function (value) {
                    var name = value.ProjectId;
                    var id = value.ProjectId;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id })
                        cnt++
                    }
                });
                response(obj);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {

                var terms = split(this.value);
                terms.pop();
                var selectedTerm = ui.item.value;
                if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                    $(event.target).siblings('.already-selected').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    SelectedFlag = 2;
                    terms.push("");
                    this.value = terms.join(", ");
                }
                else {
                    SelectedFlag = 1;
                    terms.push(selectedTerm);
                    terms.push("");
                    this.value = terms.join(", ");
                }
                return false;
            },
            close: function (event, ui) {
                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (SelectedFlag === 0 && $(event.target).val() != '') {
                        var inputValue = $(event.target).val();
                        var parts = inputValue.split(',');
                        parts.pop();
                        parts.push("");
                        var result = parts.join(', ');
                        $(event.target).val(result);
                        $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                    else if (SelectedFlag === 1) {
                        // this will handel over all span tag
                        $(event.target).siblings('span').addClass('hide');
                    }
                }
            },
            change: function (event, ui) {

                $(event.target).siblings('span').addClass('hide');

                var terms = split(this.value);
                var validItem = [];
                var invalidItem = [];
                if (terms.length > 0) {
                    terms.forEach(function (obj) {
                        if (obj != null && obj != "") {
                            var filteredResources = projectArray.filter(item => item.ProjectId === obj);

                            if (filteredResources.length > 0) {
                                validItem.push(obj);
                            }
                            else {
                                invalidItem.push(obj);
                            }
                        }
                    });

                    if (validItem.length > 0) {
                        validItem.push("");
                        this.value = validItem.join(", ");
                    }

                    if (invalidItem.length > 0) {
                        this.value = validItem.join(", ");
                        $(event.target).siblings('.not-valid').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                }
            }
        });
}
function GetHGHCodeData() {
    var ProjectId = $("#ProjectId").val();
    var fromDate = $("#FromDate").val();
    var toDate = $("#ToDate").val();
    $.ajax({
        type: "POST",
        url: ROOT + "HGH/GetHGHCodeList",
        dataType: "JSON",
        async: false,
        data: {
            ProjectId: ProjectId,
            FromDate: fromDate,
            ToDate: toDate,
        },
        success: function (data) {
            if (data) {
                CreateHGHGrid(data);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        search: false,
        width: 85,
        ignoreCase: true,
        exportcol: false,
        title: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            let actionHtml = '<div class="d-flex action_icons align-items-center">';
            actionHtml += '<a onclick="OnViewHistory(\'' + rowobject.ProjectId + '\', \'' + rowobject.HGHId + '\')" title="History">' +
                '<i class="fas fa-history color-warning"></i></a>';
            if (rowobject.IsEditable == 1) {
                actionHtml += '<a onclick="OnEditHGH(\'' + rowobject.ProjectId + '\', \'' + rowobject.HGHId + '\', \'' + rowobject.StatusId + '\')" edit-color" title = "Edit" > ' +
                    '<i class="fas fa-pen color-blue"></i></a>';
            }
            if (rowobject.StatusId == 0) {
                actionHtml += '<a onclick="OnDeleteHGH(\'' + rowobject.ProjectId + '\', \'' + rowobject.HGHId + '\')" class="" title="Delete">' + '<i class="fas fa-trash text-danger"></i></a>';
            }
            if (rowobject.StatusId == 70) {
                actionHtml += '<a onclick="OnRetrytoApprove(\'' + rowobject.ProjectId + '\')" title="SAP Retry" ><i class="fas fa-reply color-primary"></i></a>';
                actionHtml += '<a onclick="ShowSAPFailedInfo(\'' + rowobject.ProjectId + '\')" title="SAP Remarks" ><i class="fas fa-info text-info"></i></a>';
            }
            actionHtml += '</div>';
            return actionHtml;
        }
    },
    {
        name: 'ProjectId',
        label: 'Project Id',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Project',
        label: 'Project Name',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HGHCode',
        label: 'HGH Code',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Status',
        label: 'Status',
        width: 110,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<span class= "${rowobject.StatusClass}"> ${rowobject.Status}</span> `;
        }
    },
    {
        name: 'Status',
        label: 'Status',
        width: 110,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        hidden: true,
    },
    {
        name: 'HUB',
        label: 'HUB',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'StartDate',
        label: 'Start Date',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'EndDate',
        label: 'End Date',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedDate',
        label: 'Created Date',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedBy',
        label: 'Created By',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProjectBriefId',
        label: 'Project Brief ID',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },

]

GetHGHCodeData();
function CreateHGHGrid(data) {
    $.jgrid.gridUnload('#HGHList');
    $("#HGHList").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_HGHList',
        rowNum: 30,
        scroll: 1,
        //multiselect: true,
        gridComplete: function () {
            var objRows = $("#HGHList tbody tr");
            var objHeader = $("#HGHList tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#HGHList").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-210px + 100vh)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
function OnEditHGH(ProjectId, HGHId, StatusId) {
    window.location.href = ROOT + "HGH/EditHGHCode" + '?q=' + Encrypt("ProjectId=" + ProjectId + "&HGHId=" + HGHId + "&StatusId=" + StatusId);
}

function OnDeleteHGH(ProjectId, HGHId) {
    confirm("Are you sure you want to delete?", function () {
        window.location.href = ROOT + "HGH/DeleteHGHCode" + '?q=' + Encrypt("HGHId=" + HGHId + "&ProjectId=" + ProjectId);
    });
}

$(document).on("click", "#searchbtn", function () {
    GetHGHCodeData();
});

$(document).on("click", "#refreshbtn", function () {
    $("#ProjectId").val('');
    $("#FromDate").val('');
    $("#ToDate").val('');
    $('[data-datepicker-enddate1]').datepicker('setStartDate', '');
    GetHGHCodeData();
});

function OnViewHistory(ProjectId, HGHId) {
    $.ajax({
        type: "GET",
        url: ROOT + "HGH/GetHGHCodeHistory",
        data: {
            ProjectId: ProjectId,
            HGHId: HGHId
        },
        success: function (data) {
            if (data) {
                $("#PrototypeHistory").modal('show');
                $(".ProjectId").text(ProjectId);
                GetHistorydata(data);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}

colmodels5 = [
    {
        name: 'FromStage',
        label: 'From Stage',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'ToStage',
        label: 'To Stage',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    //{
    //    name: 'AssignedTo',
    //    label: 'Assigned To',
    //    width: 150,
    //    resizable: true,
    //    ignoreCase: true,
    //},
    {
        name: 'ReceivedOn',
        label: 'Received On',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SubmittedOn',
        label: 'Submitted On',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SubmittedBy',
        label: 'Submitted By',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: 'wrap',
    },
]
function GetHistorydata(data) {
    $.jgrid.gridUnload('#ViewApprovalHistory');
    $("#ViewApprovalHistory").jqGrid({
        height: 'auto',
        rowNum: 100,
        mtype: 'GET',
        datatype: 'local',
        data: data,
        loadonce: true,
        colModel: colmodels5,
        pager: "#pager_ViewApprovalHistory",
        viewrecords: true,
        scroll: true,
        width: 1100,
        gridComplete: function () {
            var objRows = $("#ViewApprovalHistory tbody tr");
            var objHeader = $("#ViewApprovalHistory tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-210px + 100vh)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
$("#DownloadExcel").click(function () {
    var data = $('#ViewApprovalHistory').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#ViewApprovalHistory").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "HGHHistory.xlsx",
            maxlength: 1000,

        });
    }
});

$("#DownloadListExcel").click(function () {
    var data = $('#HGHList').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#HGHList").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "HGHListData.xlsx",
            maxlength: 1000,

        });
    }
});

function ShowSAPFailedInfo(ProjectId) {
    
    $.ajax({
        type: "POST",
        url: ROOT + "HGH/GetSAPFailedInfo",
        dataType: "JSON",
        data: {
            ReqNo: ProjectId,
            Page: "HGH"
        },
        success: function (result) {
            if (result.length > 0) {
                alert(result[0].Response);
            }
            else {
                alert("There is no SAP failed remarks !!!")
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}
function OnRetrytoApprove(ProjectId) {
    confirm("Are you sure you want to retry?", function () {
        $.ajax({
            type: "POST",
            url: ROOT + "HGH/HGHSapRetry",
            dataType: "JSON",
            data: {  ProjectId: ProjectId },
            success: function (result) {
                showAlertMessage(result);
            },
            error: function (xhr, status, error) {
                alert("Error Occured: " + error);
            }
        });
    })
}
function showAlertMessage(message) {
    $('#alertText').text(message.Item1);
    $('#alertMessage').removeClass().addClass('alert ' + message.Item2);
    $('#alertMessage').show();
    $("#refreshbtn").click();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 8000);
}
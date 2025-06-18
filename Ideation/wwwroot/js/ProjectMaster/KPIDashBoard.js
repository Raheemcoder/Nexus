var issueRowNoArray = [];
var delaylist = [];
var StatusList = [];
var gridData = [];

$(document).ready(function () {

    $(".projectname_hub p").html('<span><b>KPI DashBoard</b></span>');

    delaylist = $.parseJSON($('#ResonForDelay').val());
    StatusList = $.parseJSON($('#StatusNames').val());

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    $('.year').datepicker({
        format: 'yyyy',
        viewMode: "years",
        minViewMode: "years",
        todayHighlight: true,
        autoclose: true
    });

    var year_selected = $("#Year_Selected").val();
    if (year_selected === "") {
        $('.year').datepicker('setDate', today);
    } else {
        $('.year').datepicker('setDate', year_selected);
    }
 
    var currentMonth = date.getMonth() + 1;

    var month_selected = $("#Month_Selected").val();
    if (month_selected === "") {
        $("#Month option[value='" + currentMonth + "']").prop("selected", true);
    } else {
        var selectedMonths = month_selected.split(",");
        $("#Month").val(selectedMonths);
    }
    $("#Month").multiselect("refresh");
    GetKPIDashboardData();

});

var issueId_ProjectCode = '';
function arrtSetting_ProjectCode(rowId, val, rawObject) {
    var result;
    var projectName = rawObject.ProjectCode;
    var hub = rawObject.Hub;
    var projectNameHub = projectName + '_' + hub;

    if (issueId_ProjectCode === '' || issueId_ProjectCode != projectNameHub) {
        var issueDataFilter = gridData.filter(function (obj) {
            return obj.ProjectCode === projectName && obj.Hub === hub;
        });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    } else {
        result = ' style="display:none"';
    }

    issueId_ProjectCode = projectNameHub;
    return result;
}

var issueId_ProjectNameHub = '';
function arrtSetting_ProjectName(rowId, val, rawObject) {
    var result;
    var projectName = rawObject.ProjectName;
    var hub = rawObject.Hub;
    var projectNameHub = projectName + '_' + hub;

    if (issueId_ProjectNameHub === '' || issueId_ProjectNameHub != projectNameHub) {
        var issueDataFilter = gridData.filter(function (obj) {
            return obj.ProjectName === projectName && obj.Hub === hub;
        });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    } else {
        result = ' style="display:none"';
    }

    issueId_ProjectNameHub = projectNameHub;
    return result;
}

var issueId_Hub = '';
function arrtSetting_Hub(rowId, val, rawObject) {
    var result;
    var projectName = rawObject.ProjectCode;
    var hub = rawObject.Hub;
    var projectNameHub = projectName + '_' + hub;

    if (issueId_Hub === '' || issueId_Hub != projectNameHub) {
        var issueDataFilter = gridData.filter(function (obj) {
            return obj.ProjectCode === projectName && obj.Hub === hub;
        });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    } else {
        result = ' style="display:none"';
    }

    issueId_Hub = projectNameHub;
    return result;
}

var issueId_Division = '';
function arrtSetting_Division(rowId, val, rawObject) {
    var result;
    var projectName = rawObject.ProjectCode;
    var Division = rawObject.Division;
    var Hub = rawObject.Hub;
    var projectNameHub = projectName + '_' + Hub;

    if (issueId_Division === '' || issueId_Division != projectNameHub) {
        var issueDataFilter = gridData.filter(function (obj) {
            return obj.ProjectCode === projectName && obj.Hub === Hub;
        });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    } else {
        result = ' style="display:none"';
    }

    issueId_Division = projectNameHub;
    return result;
}

KPIColmodels = [
    {
        name: 'ProjectCode',
        label: 'Project Code',
        width: 80,
        resizable: true,
        sortable: false,
        ignoreCase: true,
        cellattr: arrtSetting_ProjectCode,
        classes: 'projectcode'
    },
    {
        name: 'ProjectId',
        label: 'ProjectId',
        resizable: true,
        sortable: false,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'ProjectName',
        label: 'Project Name',
        width: 140,
        sortable: false,
        resizable: true,
        ignoreCase: true,
        cellattr: arrtSetting_ProjectName,
    },
    {
        name: 'Division',
        label: 'Division',
        width: 60,
        sortable: false,
        resizable: true,
        ignoreCase: true,
        cellattr: arrtSetting_Division,
    },
    {
        name: 'Hub',
        label: 'Hub',
        resizable: true,
        sortable: false,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'HUBName',
        label: 'HUB',
        width: 60,
        resizable: true,
        sortable: false,
        ignoreCase: true,
        cellattr: arrtSetting_Hub,
    },
    {
        name: 'TaskDesc',
        label: 'KPI',
        width: 140,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'TaskDescription',
        label: 'TaskDescription',
        sortable: false,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'StartDate',
        label: 'Baseline Start Date',
        width: 70,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'EndDate',
        label: 'Baseline End Date',
        width: 70,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'LatestVersionStartDate',
        label: 'Latest Version Start Date',
        width: 70,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'LatestVersionEndDate',
        label: 'Latest Version End Date',
        width: 70,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'CompletionDate',
        label: 'Completion Date',
        width: 70,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        classes: "Status",
    },
    {
        name: 'StatusNames',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'StatusNames',
        label: 'Status',
        width: 110,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            for (var i = 0; i < StatusList.length; i++) {
                var value = StatusList[i].Value;
                var Text = StatusList[i].Text;
                if (rowobject.Status == "10" && value == "10") {
                    return '<div class="' + value + '"><span class="text-danger">' + Text + '</span></div>';
                    break
                }
                else if (rowobject.Status == "1" && value == "1") {
                    return '<div class="' + value + '"><span class="text-success">' + Text + '</span></div>';
                    break
                }
                else if (rowobject.Status == "5" && value == "5") {
                    return '<div class="' + value + '"><span class="text-warning">' + Text + '</span></div>';
                    break
                }
                else if (rowobject.Status == "15" && value == "15") {
                    return '<div class="' + value + '"><span class="text-info">' + Text + '</span></div>';
                    break
                }
            }
        }
    },
    {
        name: 'Delay',
        label: 'Delay',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        classes: "isDelayExists"
    },
    {
        name: 'ReasonForDelay',
        label: 'Reason for Delay',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "Reason",
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.Status == "1" || rowobject.Status == "15") {
                return "";
            }
            else {
                var productString = "";
                for (var i = 0; i < delaylist.length; i++) {
                    var isSelected = rowobject.LatestReason ? rowobject.LatestReason.trim().toLowerCase() == delaylist[i].Text.trim().toLowerCase() ? "selected" : "" : "";
                    productString += '<option value="' + delaylist[i].Value + '" ' + isSelected + '>' + delaylist[i].Text + '</option>';
                }
                if (rowobject.Delay == "1") {
                    return `<div class="action_icons single-select_dropdown reason-dd-div">
                        <div class="d-flex align-items-center">
                            <select class="form-control appearence ReasonforDelay" data-singleselect>
                                <option value="">Select</option>` + productString + `
                            </select>
                            <i class="fas fa-history color-eye ml-2" onclick="showRemarks(1,this)" title="Reason for delay History"></i>
                        </div>
                        <span class="error-color error_delay hide">Please select reason for delay</span>
                    </div>`;
                } else {
                    return `<div class="action_icons align-items-center single-select_dropdown reason-dd-div">
                        <select class="form-control appearence ReasonforDelay" data-singleselect>
                            <option value="">Select</option>` + productString + `
                        </select>
                        <span class="error-color error_delay hide">Please select reason for delay</span>
                    </div>`;
                }
            }
        }
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        classes: "isRemarksExists",
    },
    {
        name: 'DelayRemarks',
        label: 'Remarks',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "DeplayRemarks",
        sortable: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.Remarks == "1") {
                return `<div class="align-items-center action_icons" >
                            <div class="d-flex align-items-center">
                                <textarea class="form-control Remarks" value="">${rowobject.LatestRemarks || ''}</textarea>
                                <i class="fas fa-history color-eye ml-2" onclick="showRemarks(2,this)" title="Remarks History"></i>
                            </div>
                            <span class="error-color error_remarks hide" >Please enter Remarks</span>
                       </div>`
            }
            else {
                return `<div class="action_icons" >
                            <textarea class="form-control Remarks" value="">${rowobject.LatestRemarks || ''}</textarea>
                            <span class="error-color error_remarks hide">Please enter Remarks</span>
                        </div>`
            }
        }
    }
]
function CreateKPIGrid(data) {

    $.jgrid.gridUnload('#KPIdashboard');

    $("#KPIdashboard").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: KPIColmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_KPIdashboard',
        rowNum: data.length,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#KPIdashboard tbody tr");
            var objHeader = $("#KPIdashboard tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            var pagercount = $('#KPIdashboard').find('tr').find('td.projectcode:visible').length;
            $("#pager_KPIdashboard").find('.ui-paging-info').text("View 1 - " + pagercount + " of " + pagercount);
            applyRowspan();

            $('[data-singleselect]').select2();
        },
        loadComplete: function () {
            $(this).find('.DeplayRemarks,.Reason').removeAttr('title');
        }
    });

    $("#KPIdashboard").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $("#KPIdashboard").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-300px + 100vh)' });
    $("#KPIdashboard").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $("#KPIdashboard").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $("#KPIdashboard").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#KPIdashboard").closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }
    else {
        $("#KPIdashboard").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#KPIdashboard").closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }

}
function applyRowspan() {
    issueId_Hub = '';
    issueId_ProjectNameHub = '';
    issueId_ProjectCode = '';
    issueId_Division = '';
}
$('#global-search').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#KPIdashboard tbody tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
function GetKPIDashboardData() {

    $.ajax({
        type: "POST",
        url: ROOT + "KPIDashBoard/GetKPIDashboardData",
        dataType: "json",
        data: {
            Year: $(".year").val(),
            Month: $(".Month").val().length == 0 ? "" : $(".Month").val().join(',').toString(),
            Division: $("#selected-division").val().length == 0 ? "" : $("#selected-division").val().join(',').toString()
        },
        success: function (result) {
            gridData = result;
            CreateKPIGrid(result);
        }
    });

}

$(".search").on("click", function () {

    var changeLen = ValidateChanges();
    if (changeLen > 0) {
        UnsavedDataAlert("You have some unsaved Data, Please save otherwise you will lose the data",
            function () {
                $(".Savedetails").click();
            },
            function () {
                $("#UnsavedChangesAlert").modal("hide");
                GetKPIDashboardData();
            },
        );
    }
    else if (changeLen == 0) {
        GetKPIDashboardData();
    }

});

$(".refresh").on("click", function () {

    var changeLen = ValidateChanges();
    if (changeLen > 0) {
        UnsavedDataAlert("You have some unsaved Data, Please save otherwise you will lose the data",
            function () {
                $(".Savedetails").click();
            },
            function () {
                $("#UnsavedChangesAlert").modal("hide");
                refreshFields();
                GetKPIDashboardData();
            },
        );
    }
    else if (changeLen == 0) {
        refreshFields();
        GetKPIDashboardData();
    }

});

function refreshFields() {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    $('.year').datepicker({
        format: 'yyyy',
        viewMode: "years",
        minViewMode: "years",
        todayHighlight: true,
        autoclose: true
    });

    $('.year').datepicker('setDate', today);

    $("#Month option").prop("selected", false);

    var currentMonth = date.getMonth() + 1;

    for (var i = 0; i <= currentMonth; i++) {
        $("#Month option[value='" + currentMonth + "']").prop("selected", true);
    }

    $("#Month").multiselect("refresh");
    $("#selected-division").val('').multiselect("refresh");
}
function UnsavedDataAlert(msg, func, func1) {
    $('#unsavedmessage').empty().html(msg);
    $('#UnsavedChangesAlert').modal('show');
    if (func) {
        $("#saveunsavedchanges").unbind("click");
        $('#saveunsavedchanges').on("click", func);
    }
    if (func1) {
        $("#continueunsavedchanges").unbind("click");
        $('#continueunsavedchanges').on("click", func1);
    }
}
$(".Savedetails").off("click").on("click", function (i, obj) {

    issueRowNoArray = [];

    var ProjectForSave = [];
    var IsValid = true;
    $("#KPIdashboard tbody tr").each(function (i) {
        if (i != 0) {
            var selectedDelay = $(this).find("select.ReasonforDelay").val();
            var Status = $(this).find(".Status").text().trim();
            var selectedRemarks = $(this).find(".Remarks").val().trim();

            if (selectedDelay == "" && selectedRemarks != "") {
                $(this).find(".error_delay").removeClass('hide');
                issueRowNoArray.push(i);
                IsValid = false;
            }
            else {
                $(this).find(".error_delay").addClass('hide');
            }

            if (selectedRemarks == "" && Status != "1" && Status != "15" && selectedDelay != "" && selectedDelay != null && selectedDelay != undefined) {
                $(this).find(".error_remarks").removeClass('hide');
                issueRowNoArray.push(i);
                IsValid = false;
            }
            else {
                $(this).find(".error_remarks").addClass('hide');
            }
        }
    });
    var row = issueRowNoArray[0] > 6 ? issueRowNoArray[0] - 4 : 1;

    if (row != 1) {
        document.getElementById('' + row + '').scrollIntoView(
            { behavior: 'auto' }
        );
    }

    if (IsValid) {
        gridData.forEach(function (obj, i) {

            if (
                (obj.ReasonForDelay != "" && obj.ReasonForDelay != undefined && obj.ReasonForDelay != null) &&
                (obj.DelayRemarks != "" && obj.DelayRemarks != undefined && obj.DelayRemarks != null)
            ) {
                ProjectForSave.push(gridData[i]);
            }
            if (
                (obj.DelayRemarks != "" && obj.DelayRemarks != undefined && obj.DelayRemarks != null) &&
                (obj.ReasonForDelay == "" && (obj.Status == "1" || obj.Status == "15"))
            ) {
                ProjectForSave.push(gridData[i]);
            }

        });

        if (ProjectForSave.length == 0) {
            alert("There is no data to save");
        }
        else {
            handelConfirmPopup('Are you sure do you want to save ?',
                function () {
                    var month = $('#Month').val().join(',');
                    var year = $('.year').val()
                    $('#Month_Selected').val(month);
                    $('#Year_Selected').val(year)
                    $('#ProjectDataToSave').val(JSON.stringify(ProjectForSave));
                    document.getElementById('ProjectDataToSave_Submit').submit();
                },
            );
        }
    }

});

checkedData = [];

$('body').on('change', '.ReasonforDelay', function () {
    if ($(this).val().trim() != "") {
        var tr = $(this).closest('tr');
        tr.find(".error_delay").addClass('hide');
    }
    getRowDataInArray(this);
});

$('body').on('keyup', '.Remarks', function () {
    if ($(this).val().trim() != "") {
        var tr = $(this).closest('tr');
        tr.find(".error_remarks").addClass('hide');
    }
    getRowDataInArray(this);
});

function getRowDataInArray(obj) {

    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#KPIdashboard');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");
    var ProjectId = grd.jqGrid('getCell', rowid, 'ProjectId');
    var TaskDescription = grd.jqGrid('getCell', rowid, 'TaskDescription');
    var Hub = grd.jqGrid('getCell', rowid, 'Hub');
    var ReasonForDelay = $(clossestTableRow).children().find(".ReasonforDelay").val() != undefined ?
        $(clossestTableRow).children().find(".ReasonforDelay").val() : "";
    var DelayRemarks = $(clossestTableRow).children().find(".Remarks").val();

    var foundIndex = gridData.findIndex(x => x.ProjectId === ProjectId && x.TaskDescription == TaskDescription && x.Hub == Hub);
    gridData[foundIndex].ReasonForDelay = ReasonForDelay;
    gridData[foundIndex].DelayRemarks = DelayRemarks;

}

RemarksColmodels = [
    {
        name: 'DelayReason',
        label: 'Reason For Delay',
        width: 80,
        align: 'center',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 80,
        align: 'center',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedBy',
        label: 'Updated By',
        width: 40,
        align: 'center',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedOn',
        label: 'Updated On',
        width: 40,
        align: 'center',
        resizable: true,
        ignoreCase: true,
    },
]
function showRemarksGrid(status, popupName, result, projectName, kpi) {

    $("#modal-label").html(popupName);
    $("#project-name").html(projectName);
    $("#kpi-name").html(kpi);

    $.jgrid.gridUnload('#ViewRemarks');

    $("#ViewRemarks").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: RemarksColmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_ViewRemarks',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ViewRemarks tbody tr");
            var objHeader = $("#ViewRemarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            if (status == "1") {
                $("#ViewRemarks").jqGrid('hideCol', 'DelayReason');
            }
        }
    });

    $("#ViewRemarks").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $("#ViewRemarks").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-240px + 100vh)' });
    $("#ViewRemarks").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $("#ViewRemarks").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $("#ViewRemarks").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#ViewRemarks").closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }
    else {
        $("#ViewRemarks").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#ViewRemarks").closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }

    $("#KPIRemarks").modal("show");

}
function showRemarks(Type, obj) {

    var clossestTableRow = $(obj).closest("tr");
    var popupName = Type == 1 ? "Reason for Delay" : "Remarks";
    var grd = $('#KPIdashboard');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");
    var ProjectId = grd.jqGrid('getCell', rowid, 'ProjectId');
    var TaskDescription = grd.jqGrid('getCell', rowid, 'TaskDescription');
    var Hub = grd.jqGrid('getCell', rowid, 'Hub');
    var status = grd.jqGrid('getCell', rowid, 'Status');
    var prjName = grd.jqGrid('getCell', rowid, 'ProjectName');
    var hubName = grd.jqGrid('getCell', rowid, 'HUBName');
    var kpi = grd.jqGrid('getCell', rowid, 'TaskDesc');
    var projectCode = grd.jqGrid('getCell', rowid, 'ProjectCode');

    var projectName = projectCode + ' ' + prjName + ' - ' + hubName;

    $.ajax({
        type: "POST",
        url: ROOT + "KPIDashBoard/GetKPIDashboardRemarks",
        dataType: "json",
        data: {
            ProjectId: ProjectId,
            KPIId: TaskDescription,
            Hub: Hub
        },
        success: function (result) {
            showRemarksGrid(status, popupName, result, projectName, kpi);
        }
    });

}
function validateFilteredData(new_data) {

    var grid_filtered_data = new_data;
    var colModel = $("#KPIdashboard").jqGrid('getGridParam', 'colModel');
    var filteredColNames = colModel.filter(function (col) {
        return col.search === true;
    }).map(function (col) {
        return col.name;
    });

    $.each(filteredColNames, function (i, obj) {
        var value = $(".ui-search-input").closest('td').find("#gs_" + obj).val();
        if (!(value === "") || (value === null) || typeof (value) === "undefined") {
            grid_filtered_data = grid_filtered_data.filter(function (data) {
                return data[obj]?.toLowerCase().includes(value.toLowerCase());
            })
        }
    });

    return grid_filtered_data.length;
}
function ValidateReasonExists(reason) {
    var reasonLen = delaylist.filter(item => item.Text.toLowerCase() == reason.toLowerCase()).length;
    if (reasonLen > 0) {
        return true
    }
    else {
        return false
    }
}

$('body').on('change', '#new-reason', function () {

    var newReason = $("#new-reason").val().trim();

    if (newReason == "") {
        $("#new-reason").siblings('span:first').removeClass('hide');
    }

    if (ValidateReasonExists(newReason)) {
        $("#new-reason").siblings('span:first').addClass('hide');
        $('.reason-exists').removeClass('hide');
    }
    else {
        $('.reason-exists').addClass('hide');
    }

});
function getReasonGrid() {

    $.jgrid.gridUnload('#reason-grid');

    ReasonGridColModels = [
        {
            label: 'Action',
            name: 'Value',
            resizable: true,
            ignoreCase: true,
            width: 40,
            search: false,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Disabled == false) {
                    return `<div class="text-center trash_icon">
                            <i class="fas fa-trash" onclick="deleteReason(${rowobject.Value})" title="Delete" role="button"></i>
                            </div> `;
                }
                else {
                    return ''
                }
            }
        },
        {
            label: 'Reason',
            name: 'Text',
            resizable: true,
            ignoreCase: true,
            width: 220
        },
    ],

        $("#reason-grid").jqGrid({
            url: '',
            datatype: 'local',
            data: delaylist.length > 0 ? delaylist : [],
            mtype: 'GET',
            colModel: ReasonGridColModels,
            loadonce: true,
            viewrecords: true,
            pager: '#reasongrid-pager',
            rowNum: 20,
            scroll: 1,
            gridComplete: function () {
                var objRows = $("#reason-grid tbody tr");
                var objHeader = $("#reason-grid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
            }
        });

    $("#reason-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#reason-grid').closest('.jqg-first-row-header').hide();
    $('#reason-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-280px + 100vh)' });
    $('#reason-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#reason-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#reason-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#reason-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#reason-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#reason-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
$('body').on('click', '#open-reason', function () {
    getReasonGrid();
    $("#new-reason").val('');
    $("#new-reason").siblings('span').addClass('hide');
    $("#reason-modal").modal("show");
});
function saveDeleteReason(action, reasonIdORName) {

    // add means will pass 1
    // delete means will pass 2

    var type = "";
    var reasonId = 0;
    var reasonName = "";

    if (action == 1) {
        type = "add";
        reasonName = reasonIdORName;

    }
    else if (action == 2) {
        type = "delete";
        reasonId = reasonIdORName;
    }

    $.ajax({
        url: ROOT + 'KPIDashBoard/InsertUpdateReason',
        type: 'POST',
        dataType: 'JSON',
        data: {
            ReasonId: reasonId,
            ReasonName: reasonName,
            Type: type,
        },
        success: function (obj) {

            var message = obj.message;

            if (message.toLowerCase().includes("successfully")) {

                delaylist = obj.DelayReason != "" ? $.parseJSON(obj.DelayReason) : [];

                generateSingleSelectOptions();

                $.jgrid.gridUnload('#reason-grid');
                getReasonGrid();
                $("#new-reason").val('');
                $(".alt-success-reason").html(message).removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });

            }
            else {
                alert('Error Occured: ' + message);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    })

}
function deleteReason(reasonId) {

    handelConfirmPopup('Are you sure do you want to Delete ?',
        function () {
            saveDeleteReason(2, reasonId);
        },
    );

}
function handelConfirmPopup(msg, func) {

    $('#confirmpopupmesssage').empty().html(msg);
    $('#confirmpopup').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }

}
$('body').on('click', '#add-new-reason', function () {

    var newReason = $("#new-reason").val().trim();

    if (newReason == "") {
        $('.reason-exists').addClass('hide');
        $("#new-reason").siblings('span:first').removeClass('hide');
        return false;
    }
    else {
        $("#new-reason").siblings('span:first').addClass('hide');
    }

    if (ValidateReasonExists(newReason)) {
        $("#new-reason").siblings('span:first').addClass('hide');
        $('.reason-exists').removeClass('hide');
        return false;
    }

    $('.reason-exists').addClass('hide');

    saveDeleteReason(1, newReason);

});
$("#exceldownload").on('click', function () {

    var data = $('#KPIdashboard').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        return false;
    }

    var Year = $(".year").val();
    var Month = $(".Month").val().length == 0 ? "" : $(".Month").val().join(',').toString();
    var Division = $("#selected-division").val().length == 0 ? "" : $("#selected-division").val().join(',').toString();

    window.location.href = ROOT + "KPIDashBoard/KPIDashBoardExcel?Year=" + Year + "&&Month=" + Month + "&&Division=" + Division;

});
function ValidateChanges() {
    var length = 0;
    gridData.forEach(function (obj, i) {
        if (
            (obj.ReasonForDelay != "" && obj.ReasonForDelay != undefined && obj.ReasonForDelay != null) ||
            (obj.DelayRemarks != "" && obj.DelayRemarks != undefined && obj.DelayRemarks != null)
        ) {
            length++;
        }
    });
    return length;
}
function generateSingleSelectOptions() {
    $("#KPIdashboard tbody tr").each(function () {
        var selectedValue = $(this).find("select.ReasonforDelay").val();

        var $select = $(this).find("select.ReasonforDelay");
        $select.empty();

        var productString = "";

        productString += '<option value="">Select</option>';

        for (var i = 0; i < delaylist.length; i++) {
            productString += '<option value="' + delaylist[i].Value + '">' + delaylist[i].Text + '</option>';
        }

        $select.append(productString);

        $select.val(selectedValue);

        if ($select.val() == null) {
            $select.val('');
        }
    });
}
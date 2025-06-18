var JsonClaimsGridData = [];
var statusList = [];
var divisionList = [];
var div_arr = [];
var filtered_arr = [];
var globalGridId = "";
var globalProjectNumber = "";
var globalStageId = "";
const StatusClassObject = {
    "Draft": "text-success",
    "DSG Review": "text-muted",
    "CFT Review": "text-danger",
    "Addendum": "text-primary",
    "DSG Signoff": "text-primary",
    "Manager Approval": "text-warning",
    "Signed off": "text-success"
}
var role = "";
var LoginId = "";

$(document).ready(function () {
    setTimeout(function () {
        $(".alert_msg_close").trigger("click");
    }, 5000);
    div_arr = JSON.parse($('#Griddata').val());
    JsonClaimsGridData = JSON.parse($('#JSONClaimsGridData').val());
    statusList = JSON.parse($('#Statuses').val());
    divisionList = JSON.parse($('#Griddata').val());
    role = $("#Role").val();
    LoginId = $("#LoginId").val();
    filtered_arr = div_arr.filter(function (obj) { return obj.Division.toLowerCase() === "ahp" });
    createJQGrid(JsonClaimsGridData.ClaimsGridList);
    findDivisionCount(divisionList);

    var options = '';
    $.each(statusList, function (i, obj) {
        options += '<option value="' + obj.StatusName + '">' + obj.StatusName + '</option>';
    });

    $('#statusDrpDown').append(options);

    options = '';

    var ProjList = JsonClaimsGridData?.ClaimsGridList;
    var option = "";
    var uniqueProjectNumbers = [];
    $.each(ProjList, function (i, obj) {
        if (uniqueProjectNumbers.indexOf(obj.ProjectNumber) === -1) {
            uniqueProjectNumbers.push(obj.ProjectNumber);
            option += '<option value="' + obj.ProjectNumber + '">' + obj.ProjectNumber + '</option>';
        }
    });

    $('#projectDropdown').append(option);

    option = '';


    $('[data-datepicker-year]').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
        autoclose: true
    });

});

var isEditInfo = "view";
function createJQGrid(JsonClaimsGridData) {

    $.jgrid.gridUnload('#claims_documeent');
    $("#claims_documeent").jqGrid({
        url: '',
        datatype: 'local',
        data: JsonClaimsGridData,
        mtype: 'GET',
        colModel: colmodels1,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_claims_documeent',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {

            renderClaimsGridOnSearch(JsonClaimsGridData);
            var objRows = $("#claims_documeent tbody tr");
            var objHeader = $("#claims_documeent tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });


    $("#claims_documeent").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#gs_Action').hide();
    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

}
var colmodels1 = [
    {

        name: 'Action',
        label: 'Action',
        resizable: true,
        width: 50,
        ignoreCase: true,
        exportcol: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.StatusId > "2") {
                if (rowobject.IsEdit === "Edit" || JsonClaimsGridData.Role === "ADMIN") {
                    return '<div class="d-flex action_icons align-items-center justify-content-start" title=""><i class="hover_dots fa fa-ellipsis-h"></i>' +
                        '<ul class="hover_icons">' +
                        '<li><a onclick="onClickView(\'' + rowobject.ProjectNumber + '\', \'' + rowobject.GridId + '\', \'' + rowobject.StatusId + '\')" class="" title="View"><i class="fas fa-eye color-eye"></i>View</a></li>' +
                        '<li><a onclick=onClickEdit("' + rowobject.ProjectNumber + '","' + rowobject.GridId + '","' + rowobject.StatusId + '") title="Edit" class="edit-color"><i class="fas fa-pen"></i>Edit</a></li>' +
                        '<li><a onclick="HistoryOfTheForm(\'' + rowobject.GridId + '\', \'' + rowobject.ProjectNumber + '\', \'' + rowobject.StatusId + '\')" title="History"><i class="fas fa-history color-history"></i>History</a></li>' +
                        '<li><a onclick="OnDownload(\'' + rowobject.ProjectNumber + '\', \'' + rowobject.GridId + '\')" title="Download"><i class="fas fa-download color-download"></i>Download</a></li>' +
                        (rowobject.SupportingDocument == 1 ? '<li><a data-toggle="modal" onclick="ShowSupportingDocuments(\'' + rowobject.ProjectNumber + '\',\'' + rowobject.GridId + '\')" title="Documents"><i class="fas fa-file color-file"></i>Documents</a></li>' : '') +
                        '</ul>' +
                        '</div>';

                }
                else {
                    return '<div class="d-flex action_icons align-items-center justify-content-start" title=""><i class="hover_dots fa fa-ellipsis-h"></i>' +
                        '<ul class="hover_icons">' +
                        '<li><a onclick="onClickView(\'' + rowobject.ProjectNumber + '\', \'' + rowobject.GridId + '\', \'' + rowobject.StatusId + '\')" class="" title="View"><i class="fas fa-eye color-eye"></i>View</a></li>' +
                        '<li><a onclick="HistoryOfTheForm(\'' + rowobject.GridId + '\', \'' + rowobject.ProjectNumber + '\', \'' + rowobject.StatusId + '\')" title="History"><i class="fas fa-history color-history"></i>History</a></li>' +
                        '<li><a onclick="OnDownload(\'' + rowobject.ProjectNumber + '\', \'' + rowobject.GridId + '\')" title="Download"><i class="fas fa-download color-download"></i>Download</a></li>' +
                        (rowobject.SupportingDocument == 1 ? '<li><a data-toggle="modal" onclick="ShowSupportingDocuments(\'' + rowobject.ProjectNumber + '\',\'' + rowobject.GridId + '\')" title="Documents"><i class="fas fa-file color-file"></i>Documents</a></li>' : '') +
                        '</ul>' +
                        '</div>';
                }
            }
            else {
                if (rowobject.IsEdit === "Edit" || JsonClaimsGridData.Role === "ADMIN") {
                    return '<div class="d-flex action_icons align-items-center justify-content-start" title=""><i class="hover_dots fa fa-ellipsis-h"></i>' +
                        '<ul class="hover_icons">' +
                        '<li><a onclick="onClickView(\'' + rowobject.ProjectNumber + '\', \'' + rowobject.GridId + '\', \'' + rowobject.StatusId + '\')" class="" title="View"><i class="fas fa-eye color-eye"></i>View</a></li>' +
                        '<li><a onclick=onClickEdit("' + rowobject.ProjectNumber + '","' + rowobject.GridId + '","' + rowobject.StatusId + '") title="Edit" class="edit-color"><i class="fas fa-pen"></i>Edit</a></li>' +
                        '<li><a onclick="HistoryOfTheForm(\'' + rowobject.GridId + '\', \'' + rowobject.ProjectNumber + '\', \'' + rowobject.StatusId + '\')" title="History"><i class="fas fa-history color-history"></i>History</a></li>' +
                        '<li><a onclick="OnDownload(\'' + rowobject.ProjectNumber + '\', \'' + rowobject.GridId + '\')" title="Download"><i class="fas fa-download color-download"></i>Download</a></li>' +
                        '<li><a onclick=onClickDelete("' + rowobject.GridId + '","' + rowobject.StatusId + '") title="Delete"><i class="fas fa-trash color-delete"></i>Delete</a></li>' +
                        (rowobject.SupportingDocument == 1 ? '<li><a data-toggle="modal" onclick="ShowSupportingDocuments(\'' + rowobject.ProjectNumber + '\',\'' + rowobject.GridId + '\')" title="Documents"><i class="fas fa-file color-file"></i>Documents</a></li>' : '') +
                        '</ul>' +
                        '</div>';


                }
                else {
                    return '<div class="d-flex action_icons align-items-center justify-content-start" title=""><i class="hover_dots fa fa-ellipsis-h"></i>' +
                        '<ul class="hover_icons">' +
                        '<li><a onclick="onClickView(\'' + rowobject.ProjectNumber + '\', \'' + rowobject.GridId + '\', \'' + rowobject.StatusId + '\')" class="" title="View"><i class="fas fa-eye color-eye"></i>View</a></li>' +
                        '<li><a onclick="HistoryOfTheForm(\'' + rowobject.GridId + '\', \'' + rowobject.ProjectNumber + '\', \'' + rowobject.StatusId + '\')" title="History"><i class="fas fa-history color-history"></i>History</a></li>' +
                        '<li><a onclick="OnDownload(\'' + rowobject.ProjectNumber + '\', \'' + rowobject.GridId + '\')" title="Download"><i class="fas fa-trash color-delete"></i></a>Delete</li>' +
                        (rowobject.SupportingDocument == 1 ? '<li><a data-toggle="modal" onclick="ShowSupportingDocuments(\'' + rowobject.ProjectNumber + '\',\'' + rowobject.GridId + '\')" title="Documents"><i class="fas fa-file color-file"></i>Documents</a></li>' : '') +
                        '</div>';
                }

            }
        }

    },
    {
        name: 'GridId',
        label: 'Claims Grid ID',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProjectNumber',
        label: 'Project No',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HGLApprovalNumber',
        label: 'HGL Code',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProductName',
        label: 'Project Name',
        width: 300,
        resizable: true,
        ignoreCase: true,
    }, {
        name: 'Division',
        label: 'Division',
        width: 100,
        resizable: true,
        ignoreCase: true,
    }, {
        name: 'Dosage',
        label: 'Dosage Form',
        width: 150,
        resizable: true,
        ignoreCase: true,
    }, {
        name: 'AnchorHUB',
        label: 'Participating/ Anchor/ Primary HUBS',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CFTStatus',
        label: 'CFT Status',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        width: 60,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.StatusId > "2") {
                return '<div class="justify-center_ text-center action_icons">' +
                    '<a onclick=showCFTStatus("' + rowobject.ProjectNumber + '","' + rowobject.GridId + '")  data-attr="CFTStatus"><i title="CFT Status" class="fas fa-info pr-1 color-info" style="font-size:14px; cursor:pointer"></i></a>' +
                    '</div>'
            }
            else {
                return "";
            }
        }
    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        width: 100,
        hidden: true,
        exportcol: true,
        formatter: function (cellvalue, options, rowobject) {
            return rowobject.StatusName;
        }
    },
    {
        name: 'StatusName',
        label: 'Status',
        width: 140,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<span><a class="' + StatusClassObject[rowobject.StatusName] + '" onclick=onClickEdit("' + rowobject.ProjectNumber + '","' + rowobject.GridId + '","' + rowobject.StatusId + '","' + rowobject.IsEdit.toLowerCase() + '") title="Edit">' + rowobject.StatusName + '</a></span>'
        }
    }, {
        name: 'CreatedBy',
        label: 'Initiated By',
        width: 110,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedDate',
        label: 'Initiated On',
        width: 110,
        resizable: true,
        ignoreCase: true,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd-m-Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd-mm-yyyy',
                    autoclose: true
                }).change(function () {
                    $('#claims_documeent')[0].triggerToolbar();
                });

            }
        }
    },
    {
        name: 'ApprovedBy',
        label: 'Approved By',
        width: 110,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'ApprovedOnForExcel',
        label: 'Approved On',
        width: 110,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.ApprovedOn === "" || rowobject.ApprovedOn === null) {
                return '';
            } else {
                var [year, month, day] = rowobject.ApprovedOn.split('-');
                return `${day}-${month}-${year}`;
            }
        }
    },
    {
        name: 'ApprovedOn',
        label: 'Approved On',
        width: 110,
        resizable: true,
        ignoreCase: true,
        sorttype: 'date',
        formatter: 'date',
        exportcol: false,
        formatoptions: { newformat: 'd-m-Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd-mm-yyyy',
                    autoclose: true
                }).change(function () {
                    $('#claims_documeent')[0].triggerToolbar();
                });

            }
        }
    },
];

function findDivisionCount(result) {

    var DivisionTotals = {};
    var allDivisionElements = $(".division-count");
    allDivisionElements.each(function () {
        $(this).text('0');
    });
    $.each(result, function (i, obj) {
        var Division = $.trim(obj.Division).toLowerCase();
        if (DivisionTotals[Division] === undefined) {
            DivisionTotals[Division] = 1;
        } else {
            DivisionTotals[Division]++;
        }
    });

    var sum = 0;
    for (var Division in DivisionTotals) {
        if (Division != "") {

            var totalCountElement = $("#" + Division.replaceAll(" ", '').toLowerCase());
            if (totalCountElement.length > 0) {
                totalCountElement.text(parseInt(DivisionTotals[Division]).toLocaleString('en-IN'));
            }
        }
        sum = DivisionTotals[Division] + sum;
        $(".allDivisionTotal").text(parseInt(sum).toLocaleString('en-IN'));
    }
}
$('#btnrefresh').on('click', function () {
    ClaimsListLoad('refresh');
});
function getDivisiondetails(obj) {

    var type = obj.innerText.split(' ');
    var divisionid = obj.getAttribute('data-divisionid');
    var sanitizedDivision = type.map(function (word) {
        return word.replace(/[\d,]+/g, '');
    });
    var DivisionName = $.trim(sanitizedDivision.join(' '));
    DivisionName = DivisionName == "All" ? "" : DivisionName;
    ClaimsListLoad('', divisionid);
}

function ClaimsListLoad(flag, Divisionid) {
    if (flag == "refresh") {
        $(".DivisionDetails li").find('.active').removeClass("active");
        $(".allDivisions").addClass("active");
        $('#projectDropdown').val('All').trigger('change');
        $('#statusDrpDown').val('All').trigger('change');
    }
    var division = Divisionid;
    var status = $("#statusDrpDown").val();
    var projectNo = $("#projectDropdown").val();

    $.ajax({
        type: "GET",
        url: ROOT + "NewClaimsGrid/ClaimsGridDisplayfilter",
        data: { ProjectNo: projectNo, Status: status, Division: division },
        success: function (result) {
            var result_json = result;
            if (flag == "refresh") {
                findDivisionCount(result_json);
            }
            createJQGrid(result_json);
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}



$(document).ready(function () {
    $('.filterable .btn-filter').click(function () {
        var $panel = $(this).parents('.filterable'),
            $filters = $panel.find('.filters input'),
            $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function (e) {
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
            inputContent = $input.val().toLowerCase(),
            $panel = $input.parents('.filterable'),
            column = $panel.find('.filters th').index($input.parents('th')),
            $table = $panel.find('.table'),
            $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function () {
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
        }
    });

});
setTimeout(function () {
    $('#message_alert').fadeOut('slow');
}, 5000);

function onClickEdit(ProjectNumber, GridId, StatusId, isEdit = "edit") {
    isEdit = JsonClaimsGridData.Role === "ADMIN" ? "edit" : isEdit;
    window.location.href = ROOT + "NewClaimsGrid/EditGridDocument" + '?q=' + Encrypt("ProjectNumber=" + ProjectNumber + "&StatusId=" + StatusId + "&IsEdit=" + isEdit + "&GridId=" + GridId)
}

function GetRowDataInArray(obj) {

    var grid = $('#claims_documeent');
    var rowId = $(obj).closest("tr.jqgrow").attr("id");
    var ProjectNumber = grid.jqGrid('getCell', rowId, 'ProjectNumber');
    var StatusName = grid.jqGrid('getCell', rowId, 'StatusName');
    var StatusId = grid.jqGrid('getCell', rowId, 'StatusId');

    var arrayitem = {
        ProjectNumber: ProjectNumber, StatusName: StatusName, StatusId: StatusId
    };

    return arrayitem;

}

function onClickDelete(gridId, StatusId) {

    $('#DeleteModal').modal('show');
    $("#DeleteRecord").off("click").on("click", function () {

        window.location.href = ROOT + "NewClaimsGrid/DeleteClaimsRecord?GridId=" + gridId;

    });

}

function onClickView(ProjectNumber, GridId, StatusId, isEdit = "view") {

    $.ajax({
        url: ROOT + "NewClaimsGrid/ClaimsGrid_PV",
        type: "POST",
        dataType: "HTML",
        data: { ProjectNumber: ProjectNumber, StatusId: StatusId, IsEdit: isEdit, GridId: GridId },
        success: function (response) {
            $("#resultDiv").html(response);
            $('#previewmodal').modal('show');
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}
function showCFTStatus(ProjectNumber, GridId) {

    $.ajax({
        type: "POST",
        url: ROOT + "NewClaimsGrid/CFTStatusInfo",
        data: { projectNo: ProjectNumber, GridId: GridId },
        success: function (Result) {
            $('#cftApprovalTable').empty();
            var str = "";
            if (Result.length > 0) {
                $.each(Result, function (i, obj) {
                    var RemarksCol = "";
                    if (obj.Status != 'Confirmed') {
                        RemarksCol += "<td class='p-2'></td>"
                    }
                    else {
                        RemarksCol = "";
                        RemarksCol += "<td class=''><a onClick='showCFTRemarks(" + JSON.stringify(obj.DeptName) + "," + JSON.stringify(ProjectNumber) + "," + JSON.stringify(GridId) + ")'><i class='fas fa-eye' aria-hidden='true' title='CFT Remarks'></i></a></td>"

                    }
                    var count = 0;
                    if (obj.AnchorDept != null) {
                        var anchorhubdept = obj.AnchorDept.split(',')
                        var depatmentBasedOnHubwithoutIndia1 = $.grep(anchorhubdept, function (value, index) {
                            return value.indexOf("RA_INDIA") === -1;
                        });
                        for (var i = 0; i < depatmentBasedOnHubwithoutIndia1.length; i++) {
                            if (obj.DeptName == depatmentBasedOnHubwithoutIndia1[i]) {
                                count = 1;
                                break;
                            }
                        }
                    }
                    if (count == 1) {
                        str += "<tr>";
                        str += "<td style='display:none;' data-projNo='projNo'>" + ProjectNumber + "</td><td data-attr='deptName' class='p-2 _cft_back'>" + obj.DeptName + "</td><td class='p-2'>" + obj.DeptUser + "</td><td class='p-2'>" + obj.Status + "</td>" + RemarksCol + "</tr>";
                    }
                    else {
                        str += "<tr>";
                        str += "<td style='display:none;' data-projNo='projNo'>" + ProjectNumber + "</td><td data-attr='deptName' class='p-2'>" + obj.DeptName + "</td><td class='p-2'>" + obj.DeptUser + "</td><td class='p-2'>" + obj.Status + "</td>" + RemarksCol + "</tr>";
                    }
                });
                $('#cftApprovalTable').append(str);

                str = "";
                $('#CFTStatus').modal('show');
            }

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}

function showCFTRemarks(dept, projNo, GridId) {
    debugger;
    $.ajax({
        type: "POST",
        url: ROOT + 'NewClaimsGrid/GetCFTRemarksBasedOnDept',
        data: { ProjectNo: projNo, DeptName: dept, GridId: GridId },
        success: function (Result) {

            $('#CFTRBody').empty();
            $('#CFTRHeader').empty();
            var head = '<th scope="col">Claims</th>';
            head += '  <th scope="col">' + dept + ' Remarks</th>'
            var str = "";
            $('#CFTRHeader').append(head);

            if (Result.length > 0) {
                $.each(Result, function (i, obj) {

                    str += "<tr>";
                    str += "<td class='p-2'>" + obj.Claims + "</td><td class='p-2'>" + obj.CFTRemarks + "</td></tr>";
                });
                $('#CFTRBody').append(str);
                str = "";
                $('#CFTRModal').modal('show');
            }

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }

    });

}

$('#SearchPrototypeData').click(function () {

    var Status = $("#statusDrpDown").val();
    var ProjectNo = $("#projectDropdown").val();
    var Division = $("#ClaimsDivision").val();
    $.ajax({
        type: "GET",
        url: ROOT + "NewClaimsGrid/ClaimsGridDisplayfilter",
        data: { ProjectNo: ProjectNo, Status: Status, Division: Division },
        success: function (App_Results) {
            renderClaimsGridOnSearch(App_Results);
            App_jsons = App_Results;
            findDivisionCount(App_jsons);
            $.jgrid.gridUnload('#claims_documeent');
            $("#claims_documeent").jqGrid({
                height: 'auto',
                rowNum: 1000,
                data: App_jsons,
                datatype: 'local',
                loadonce: true,
                colModel: colmodels1,
                pager: '#pager_claims_documeent',
                viewrecords: true,
                scroll: true,

                gridComplete: function () {
                    var objRows = $("#claims_documeent tbody tr");
                    var objHeader = $("#claims_documeent tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });

            $("#claims_documeent").jqGrid('filterToolbar', {
                autosearch: true,
                stringResult: false,
                searchOnEnter: false,
                defaultSearch: "cn"
            });
            $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-250px + 100vh)' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 330) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
            }

        },
        error: function (err) {
            alert("Error occured!!", err);
        }
    });

});

function renderClaimsGridOnSearch(ClaimsDetails) {
    var ListNode = $("#pagination-demo1");
    let itemHtml = '';
    for (let i = 0; i < ClaimsDetails.length; i++) {
        const { ProjectNumber, ProjectDescription, ProductName, IsEdit, Remarks, StatusName, StatusId, GridId, HGLApprovalNumber, LicenseCategory, CreatedDate, Dosage, CreatedBy, ApprovedBy, AnchorHUB, SupportingDocument, Division } = ClaimsDetails[i];
        var actionIconsHtml = ''
        if (StatusId > 2) {
            if (IsEdit === "Edit" || JsonClaimsGridData.Role === "ADMIN") {
                actionIconsHtml += '<span class="right_icons">' +
                    '<a onclick=onClickView("' + ProjectNumber + '","' + GridId + '","' + StatusId + '","' + IsEdit.toLowerCase() + '") title="View"> <i class="flaticon-view color-blue"></i></a>' +
                    '<a onclick=onClickEdit("' + ProjectNumber + '","' + GridId + '","' + StatusId + '","' + IsEdit.toLowerCase() + '") title="Edit"> <i class="flaticon-pen color-info"></i></a>' +
                    '<a onclick=HistoryOfTheForm("' + GridId + '","' + ProjectNumber + '","' + StatusId + '") title="History"> <i class="flaticon-history-2 color-warning"></i></a>' +
                    '<a onclick=OnDownload("' + ProjectNumber + '","' + GridId + '") title="Download"><i class="flaticon-download color-green"></i></a>' +
                    (SupportingDocument == "1" ? '<a onclick=ShowSupportingDocuments("' + ProjectNumber + '","' + GridId + '") title="Document"><i class="fas fa-file-alt color-info"></i></a>' : '<i></i>');
            }

            else {
                actionIconsHtml += '<span class="right_icons">' +
                    '<a onclick=onClickView("' + ProjectNumber + '","' + GridId + '","' + StatusId + '","' + IsEdit.toLowerCase() + '") title="View"> <i class="flaticon-view color-blue"></i></a>' +
                    '<a onclick=OnDownload("' + ProjectNumber + '","' + GridId + '") title="Download"><i class="flaticon-download color-green"></i></a>' +
                    '<a onclick=HistoryOfTheForm("' + GridId + '","' + ProjectNumber + '","' + StatusId + '") title="History"><i class="flaticon-history-2 color-warning"></i></a>' +
                    (SupportingDocument == "1" ? '<a onclick=ShowSupportingDocuments("' + ProjectNumber + '","' + GridId + '") title="Document"><i class="fas fa-file-alt color-info"></i></a>' : '<i></i>') +
                    (StatusId == "2" ? '<a onclick=onClickDelete("' + GridId + '","' + StatusId + '") title = "Delete"> <i class="flaticon-delete color-danger"></i></a>' : '<i></i>');
            }
        }

        else {
            if (IsEdit === "Edit" || JsonClaimsGridData.Role === "ADMIN") {
                actionIconsHtml += '<span class="right_icons">' +
                    '<a onclick=onClickView("' + ProjectNumber + '","' + GridId + '","' + StatusId + '","' + IsEdit.toLowerCase() + '") title="View"> <i class="flaticon-view color-blue"></i></a>' +
                    '<a onclick=onClickEdit("' + ProjectNumber + '","' + GridId + '","' + StatusId + '","' + IsEdit.toLowerCase() + '") title="Edit"> <i class="flaticon-pen color-info"></i></a>' +
                    '<a onclick=HistoryOfTheForm("' + GridId + '","' + ProjectNumber + '","' + StatusId + '") title="History"> <i class="flaticon-history-2 color-warning"></i></a>' +
                    '<a onclick=OnDownload("' + ProjectNumber + '","' + GridId + '") title="Download"><i class="flaticon-download color-green"></i></a>' +
                    (SupportingDocument == "1" ? '<a onclick=ShowSupportingDocuments("' + ProjectNumber + '","' + GridId + '") title="Document"><i class="fas fa-file-alt color-info"></i></a>' : '<i></i>') +
                    (StatusId == "2" ? '<a onclick=onClickDelete("' + GridId + '","' + StatusId + '") title = "Delete"> <i class="flaticon-delete color-danger"></i></a>' : '<i></i>');

            }
            else {
                actionIconsHtml += '<span class="right_icons">' +
                    '<a onclick=onClickView("' + ProjectNumber + '","' + GridId + '","' + StatusId + '","' + IsEdit.toLowerCase() + '") title="View"> <i class="flaticon-view color-blue"></i></a>' +
                    '<a onclick=OnDownload("' + ProjectNumber + '","' + GridId + '") title="Download"><i class="flaticon-download color-green"></i></a>' +
                    '<a onclick=HistoryOfTheForm("' + GridId + '","' + ProjectNumber + '","' + StatusId + '") title="History"><i class="flaticon-history-2 color-warning"></i></a>' +
                    (SupportingDocument == "1" ? '<a onclick=ShowSupportingDocuments("' + ProjectNumber + '","' + GridId + '") title="Document"><i class="fas fa-file-alt color-info"></i></a>' : '<i></i>') +
                    (StatusId == "2" ? '<a onclick=onClickDelete("' + GridId + '","' + StatusId + '") title = "Delete"> <i class="flaticon-delete color-danger"></i></a>' : '<i></i>');

            }
        }
        itemHtml += '<div class="card-section">' +
            '<div class="card_details_search">' +
            '<div class="card_title">' +
            '<div class="_mtitle_head">' +
            '<h4 class="list_data"><b><b>Product Name:</b></b> ' + ProductName + '</h4>' +
            '<h4 class="grid_data"><b>Project No:</b> ' + ProjectNumber + '</h4>' +
            '</div>' +
            '<div class="rollback_remarks">';
        itemHtml += actionIconsHtml;
        if (StatusId > 2) {
            itemHtml += '<a onclick=showCFTStatus("' + ProjectNumber + '","' + GridId + '") ><i  title="CFT Status" class="flaticon-info color-primary"></i></a>';
        }
        itemHtml += '</span > ' +
            '</div>' +
            '</div>' +

            '<div class="card-body">' +
            '<div class="card_details">' +
            '<ul>' +
            '<li>' +
            '<span class="list_data"><b>Project No:</b> ' + ProjectNumber + '</span>' +
            '<span><b>Division :</b> ' + Division + '</span>' +
            '</li> ' +
            '<li>' +
            '<span><b>HGL Code:</b>' + HGLApprovalNumber + '</span>' +
            '<span > <b>Grid ID:</b> ' + GridId + ' </span > ' +
            '</li > ' +
            '<li>' +
            '<span><b>Initiated By:</b> ' + CreatedBy + '</span>' +
            '<span><b>Initiated On:</b>' + CreatedDate + '</span>' +
            '<span class="grid_data" > Remarks: ' + Remarks + '</span > ' +
            '</li>' +
            '<li>' +
            '<span><a ><button class="btn btn-label btn-green ' + StatusClassObject[StatusName] + '"title="Edit" onclick=onClickEdit("' + ProjectNumber + '","' + GridId + '","' + StatusId + '","' + IsEdit.toLowerCase() + '")>' + StatusName + '</button></a></span>' +
            '</li>' +
            '<li>' +
            '<span><b>Approved By:</b> ' + ApprovedBy + '</span>' +
            '<span><b>Anchor HUB:</b> ' + AnchorHUB + '</span>' +
            '</li>' +
            '</ul > ' +
            '</div > ' +
            '</div> ' +

            '</div>' +
            '</div>'
    }
    ListNode.empty();
    ListNode.append(itemHtml);

}
function handleNavigation() {
    if (obj != null) {
        obj = JSON.parse(obj);
        window.location.href = `/NewClaimsGrid/ClaimsGridDocument?ProjectNumber=${obj.projectnumber}&StatusId=${obj.StatusId}&IsEdit=${obj.IsEdit}&GridId=${obj.gridId}`;
    }
}
function OnDownload(ProjectNumber, GridId) {

    var fd = new FormData();
    $.ajax({
        url: ROOT + "NewClaimsGrid/GenerateClaimsPdf",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectNumber: ProjectNumber, GridId: GridId },
        success: function (result) {
            $('.GenerateClaimsPdf').html(result);
            var htmldata = $(".GenerateClaimsPdf").html();
            fd.append('JsonString', htmldata)
            $.ajax({
                url: ROOT + 'NewClaimsGrid/GeneratePdfHtml',
                type: 'POST',
                dataType: 'HTML',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    window.location = window.location.origin + ROOT + 'NewClaimsGrid/GeneratePdf?ProjectId=' + GridId + '&Type=' + "Claims"
                },
                error: function (xhr, status, error) {
                    debugger
                    alert("Error Occured: " + error);
                }
            });
        },
        error: function (xhr, status, error) {
            debugger
            alert("Error Occured: " + error);
        }
    });
}
const historyColModel = [
    {
        name: 'FromStage',
        label: 'From Stage',
        resizable: true,
        ignoreCase: true,
        search: true,
        stype: 'text',
        width: 100,
    }, {
        name: 'ToStageName',
        label: 'To Stage',
        resizable: true,
        ignoreCase: true,
        search: true,
        stype: 'text',
        width: 100,
    }, {
        name: 'AssignedTo',
        label: 'Assigned To',
        resizable: true,
        ignoreCase: true,
        search: true,
        stype: 'text',
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            let result = '';
            if (rowobject.AssignedTo != null) {
                let data = rowobject.AssignedTo.split(',');
                for (let d of data) {
                    result += '<p style="margin-bottom:5px">' + d + '</p>';
                }
            }
            return result;
        }
    }, {
        name: 'ReceivedOn',
        label: 'Received On',
        resizable: true,
        ignoreCase: true,
        search: true,
        stype: 'text',
        width: 100,
    }, {
        name: 'SubmittedOn',
        label: 'Submitted On',
        resizable: true,
        ignoreCase: true,
        search: true,
        stype: 'text',
        width: 100,
    }, {
        name: 'SubmittedBy',
        label: 'Submitted By',
        resizable: true,
        ignoreCase: true,
        search: true,
        stype: 'text',
        width: 100,
    }, {
        name: 'NoOfDaysTaken',
        label: 'No Of Days Taken',
        resizable: true,
        ignoreCase: true,
        search: true,
        stype: 'text',
        width: 100,
    }, {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        search: true,
        stype: 'text',
        width: 100,
    },
]
function HistoryOfTheForm(GridId, ProjectNumber, Stage) {

    globalGridId = GridId;
    globalProjectNumber = ProjectNumber;
    globalStageId = Stage;
    updateHistoryStatus(Stage);
    $.ajax({
        type: "POST",
        url: ROOT + 'NewClaimsGrid/FetchFormHistoryDetails',
        data: { GridId: GridId, ProjectNumber: ProjectNumber },
        success: function (Result) {

            colurhign(Result);
            var tableBody = $("#Claims_Remarks tbody");
            var itemHtml = '';
            $("#Claims_Remarks tbody").empty();

            if (Result && Array.isArray(Result) && Result.length) {
                tableBody.empty();

                for (let item of Result) {
                    let result = '';
                    if (item.AssignedTo != null) {
                        let data = item.AssignedTo.split(',');
                        for (let d of data) {
                            result += '<p style="margin-bottom:5px">' + d + '</p>';
                        }
                    }
                    itemHtml += '<tr>' +
                        '<td>' + item.FromStage + '</td>' +
                        '<td>' + item.ToStageName + '</td>' +
                        '<td>' + result + '</td>' +
                        '<td>' + item.ReceivedOn + '</td>' +
                        '<td>' + item.SubmittedOn + '</td>' +
                        '<td>' + item.SubmittedBy + '</td>' +
                        '<td>' + item.NoOfDaysTaken + '</td>' +
                        '<td>' + item.Remarks + '</td>' +
                        '</tr>'
                }
            }

            $("#history").modal("show");
            tableBody.append(itemHtml);
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }

    });
}
function colurhign(ResultData) {
    $(".approve_reject_claims li").each(function () {
        if (ResultData != "") {
            if ($(this).text() == ResultData[0].ToStage) {
                $(this).addClass("warning");
                $(this).removeClass("completed");

            }
            else if ($(this).text() == ResultData[0].FromStage) {
                $(this).removeClass("warning");
                $(this).addClass("completed");
            }
            else {
                $(this).removeClass("warning");
            }
        }
        else if ($(this).text() == "Draft") {
            $(this).addClass("warning");
            $(this).removeClass("completed");
        }
        else {
            $(this).removeClass("completed");
            $(this).removeClass("warning");
        }
    });
    $(".approve_reject_claims li").each(function () {
        var currentText = $(this).text();
        var isInResultData = ResultData.some(function (item) {
            return item.FromStage.includes(currentText);
        });

        if (!isInResultData) {
            $(this).removeClass("completed");
        }
    });

}
function updateHistoryStatus(stage) {
    $(".approve_reject_claims li").each(function () {
        let original = stage * 2 - 3;
        let index = $(this).index();
        if (index <= original) {
            if (index % 2 == 0) {
                $(this).addClass("completed");
            } else {
                $(this).addClass("text-success");
            }
        } else {
            if (index % 2 == 0) {
                $(this).removeClass("completed");
            } else {
                $(this).removeClass("text-success");
            }
        }
    });
}

$("#HistoryExcel").click(function () {
    var d = new Date();
    const formattedDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '_');
    var formattedTime = d.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/:/g, '_');

    var downloadUrl = ROOT + "NewClaimsGrid/ExportToExcelHistory"
        + "?projectNumber=" + encodeURIComponent(globalProjectNumber)
        + "&fileName=" + encodeURIComponent("ClaimsHistory")
        + "&GridId=" + encodeURIComponent(globalGridId)
    window.open(downloadUrl, '_blank')
});

colmodels12 = [
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 150,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'CreatedBy',
        label: 'Created by',
        width: 60,
        ignoreCase: true,
        resizable: true,
        hidden: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 90,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        width: 40,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'StatusId',
        label: 'Stage',
        width: 10,
        ignoreCase: true,
        resizable: true,
        hidden: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 40,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            var fileName = rowobject.DocumentName.replaceAll('"', ''); // Remove double quotes
            var fileExtension = fileName.split('.').pop().toLowerCase();
            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
                'csv': 'Microsoft Excel Spreadsheet',
            };
            var matches = rowobject.UploadedBy.match(/\(([^)]+)\)/);

            if (rowobject.StatusId <= 3) {
                if (fileExtension in fileTypes) {
                    return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a>";
                } else {
                    return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewSupportingDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a></div>";
                }
            }
            else if (role == "DSG Initiator" || role == "ADMIN" || role == "DSG Manager" || LoginId == matches[1]) {

                if (fileExtension in fileTypes) {
                    return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a>";
                } else {
                    return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewSupportingDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a></div>";
                }
            }
            else {
                if (fileExtension in fileTypes) {
                    return "";
                }
                else {
                    return "<div class='text-center'><a class='mr-2' onclick='ViewSupportingDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a></div>";
                }
            }
        }
    }
],
    $('#Grid_Supporting_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels12,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Grid_Supporting_Document',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_Supporting_Document tbody tr");
            var objHeader = $("#Grid_Supporting_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-250px + 100vh)' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}

$(".ViewData").on("click", function () {
    $("#Document_show_popup").modal('show');
});
function ShowSupportingDocuments(ProjectNumber, GridId) {

    $.ajax({
        type: "POST",
        url: ROOT + "NewClaimsGrid/GetSupportingDocuments",
        data: { ProjectNumber: ProjectNumber, GridId: GridId },
        dataType: "json",
        success: function (data) {

            $('#supporting_documents').modal('show');

            $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-250px + 100vh)' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 100) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
            }

            $("#Grid_Supporting_Document").jqGrid("clearGridData");

            $("#Grid_Supporting_Document").jqGrid('setGridParam', { data: data.length == 0 ? [] : data });

            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
        }
    });
}
function ViewSupportingDoc(rowId) {

    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {
        var imageUrl = ROOT + 'Pdfupload/' + filename;
        window.open(imageUrl, '_blank');
    }
}
function DownloadSupportingDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {
        $('.SupportingDoc').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}
$("#ExcelDownload").click(function () {

    var data = $('#claims_documeent').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("No data in Grid");
    }
    else {
        $("#claims_documeent").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "ClaimsGrid.xlsx",
            maxlength: 1000,
        });
    }

});
function DownloadSupportingDoc_V(EncodedFile) {
    var filename = decodeURIComponent(EncodedFile);
    if (filename.length > 0) {
        $('.SupportingDoc').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}
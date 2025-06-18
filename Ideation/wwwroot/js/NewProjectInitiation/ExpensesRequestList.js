var isExport = false;
var Role = $("#Role").val();
var LoginId = $("#LoginId").val();
$(document).ready(function () {
    setTimeout(function () {
        $(".aler_dismissal_close").trigger("click");
    }, 3000);
    $('#btnSearch').trigger('click');
});
if (["hod", "depttl", "deptuser", "user"].includes(Role.toLowerCase())) {
    $(".buttonshow").removeClass('hide');
}
GenerateDatePicker();
var supportingTypes = ['pdf', 'docx', 'doc', 'xlsx', 'xls', 'jpg', 'jpeg', 'png', 'txt', 'csv', 'ppt', 'pptx'];
var unSupportedViewTypes = {
    'doc': 'Microsoft Word Document',
    'docx': 'Microsoft Word Document',
    'xls': 'Microsoft Excel Spreadsheet',
    'xlsx': 'Microsoft Excel Spreadsheet',
    'csv': 'Microsoft Excel Spreadsheet',
    'ppt': 'Microsoft PowerPoint',
    'pptx': 'Microsoft PowerPoint'
}
function GenerateDatePicker() {
    //$('#StartDate').datepicker('destroy');
    //$('#StartDate').datepicker({
    //    todayHighlight: true,
    //    autoclose: true,
    //    format: 'dd/mm/yyyy',
    //  //  startDate: '+0d'
    //});
    //$('#EndDate').datepicker('destroy');
    //$('#EndDate').datepicker({
    //    todayHighlight: true,
    //    autoclose: true,
    //    format: 'dd/mm/yyyy',
    //  //  startDate: '+0d'
    //});
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

}

var colmodels = [
    {
        name: 'Action',
        label: 'Action',
        sortable: false,
        search: false,
        width: 70,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            const userRole = Role || "Default";
            const actionsHtml = formatActions(userRole, rowobject);
            return `<div class="action_buttons d-flex align-items-center">${actionsHtml}</div>`;
        }
    },
    {
        name: 'ExpensesRefId',
        label: 'ExpenseRefId',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportCol: true,
        width: 50,
        hidden: true,
    },
    {
        name: 'ExpenseHeaderId',
        label: 'Expense Ref No',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportCol: true,
        width: 50,
    },
    {
        name: 'ProjectName',
        label: 'Project Id',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportCol: true,
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 90,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true
    },
    {
        name: 'Category',
        label: 'Category',
        width: 90,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true
    },
    {
        name: 'Advance',
        label: 'Advance (INR)',
        width: 90,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        classes: "text-right",
        sorttype: "number",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'TotalExpenses1',
        label: 'Total Expenses (INR)(Actual+Other)',
        width: 90,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'TotalExpenses',
        label: 'Total Expenses (INR) <span class="small_size">(Actual+Other)</span>',
        width: 90,
        resizable: true,
        exportcol: false,
        classes: "text-right",
        sortable: false,
        search: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'StatusName',
        label: 'Status',
        width: 120,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true,
        hidden: true
    },
    {
        name: 'StatusId',
        label: 'StatusId',
        width: 90,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        sortable: false,
        hidden: true
    },
    {
        name: 'Status',
        label: 'Status',
        width: 90,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (["0", "130"].includes(rowobject.StatusId.toLowerCase())) {
                return '<div class="">' +
                    '<span class="mr-1 cursor_pointer text-warning"> ' + cellvalue + ' </span>' +
                    '</div>';
            } else if (["20", "150"].includes(rowobject.StatusId.toLowerCase())) {
                return '<div class="">' +
                    '<span class="mr-1 cursor_pointer text-success"> ' + cellvalue + ' </span>' +
                    '</div>';
            } else if (["140", "40"].includes(rowobject.StatusId.toLowerCase())) {
                return '<div class="pr_fields_">' +
                    '<span class="mr-1 cursor_pointer text-warning"> ' + cellvalue + ' </span>' +
                    '</div>';
            }
            else if (["30", "100"].includes(rowobject.StatusId.toLowerCase())) {
                return '<div class="pr_fields_">' +
                    '<span class="mr-1 cursor_pointer text-danger"> ' + cellvalue + ' </span>' +
                    '</div>';
            } else {
                return cellvalue;
            }
        }
    },
    {
        name: 'ClaimedBy',
        label: 'Initiated By',
        width: 90,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        sortable: false,
    },
    {
        name: 'ClaimedOn',
        label: 'Initiated On',
        width: 60,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        sortable: false,
        formatter: 'date',
        formatoptions: { newformat: 'd M y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd M yy',
                    autoclose: true
                }).change(function () {
                    $('#ExpensesRequest_Grid')[0].triggerToolbar();
                });
            }
        },
    },
    //{
    //    name: 'ClaimedOn',
    //    label: 'Claimed On',
    //    width: 60,
    //    resizable: true,
    //    ignoreCase: true,
    //    exportcol: true,
    //    sorttype: 'date',
    //    formatter: function (cellvalue) {
    //        if (!cellvalue || cellvalue === "&#160;" || cellvalue.trim() === "") {
    //            return '';
    //        }
    //        var dateObj = new Date(cellvalue);
    //        if (isNaN(dateObj.getTime())) {
    //            return '';  
    //        }
    //        var options = { day: '2-digit', month: 'short', year: '2-digit' };
    //        return dateObj.toLocaleDateString('en-GB', options).replace(/\./g, '-');
    //    },
    //    searchoptions: {
    //        sopt: ['eq'],
    //        dataInit: function (e) {
    //            $(e).datepicker({
    //                format: 'dd-M-yy',
    //                autoclose: true
    //            }).change(function () {
    //                $('#ExpensesRequest_Grid')[0].triggerToolbar();
    //            });
    //        }
    //    }
    //},
    {
        name: 'CreatedBy',
        label: 'CreatedBy',
        width: 60,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        hidden: true,
        sortable: false,
    }

];
function createJQGrid(result) {
    $.jgrid.gridUnload('#ExpensesRequest_Grid');
    $("#ExpensesRequest_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#ExpensesRequest_Pager',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ExpensesRequest_Grid tbody tr");
            var objHeader = $("#ExpensesRequest_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#ExpensesRequest_Grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('#ExpensesRequest_Grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-230px + 95vh)' });
    $('#ExpensesRequest_Grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#audit_trail').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#ExpensesRequest_Grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#ExpensesRequest_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#ExpensesRequest_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

}
function OnDeleteExpense(ExpensesRefId) {
    $('#confirmationPopUpforDelete').modal('show');
    $('#confirmdelete').off('click').on('click', function () {
        $.ajax({
            type: "POST",
            url: ROOT + "NewProjectInitiation/DeleteExpenses",
            data: {
                ExpenseRefId: ExpensesRefId
            },
            success: function (result) {
                $('#confirmationPopUpforDelete').modal('hide');
                window.location.reload();
            }
        });
    });
}

$('#btnSearch').on('click', function () {
    var startDate = $('#StartDate').val()
    var endDate = $('#EndDate').val()
    var projectId = $('#ProjectId').val()
    var department = $('#DepartmentId').val()
    var category = $('#CategoryId').val()

    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetExpenseRequestList",
        data: {
            startDate: startDate,
            endDate: endDate,
            ProjectId: projectId,
            DepartmentId: department,
            CategoryId: category
        },
        success: function (result) {
            createJQGrid(result);
        }
    });

});
$('#btnRefresh').on('click', function () {
    $('#StartDate').val('')
    $('#EndDate').val('')
    $('#ProjectId').val('').trigger('change')
    $('#DepartmentId').val('').trigger('change')
    $('#CategoryId').val('').trigger('change')
    $('#btnSearch').trigger('click');

});
function exportToExcel(gridId, file) {
    $("#" + gridId).jqGrid("exportToExcel", {
        includeLabels: true,
        includeGroupHeader: true,
        includeFooter: true,
        fileName: file + ".xlsx",
        maxlength: 200
    });
}
$("#excel-download").click(function () {
    isExport = true;
    var fileName = "Expenses Request";
    var data = $('#ExpensesRequest_Grid').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isExport = false;
    }
    if (isExport) {
        exportToExcel("ExpensesRequest_Grid", fileName);
        isExport = false;
    }
});
function OnEditExpense(ExpenseHeaderId, StatusId) {
    window.location.href = ROOT + 'NewProjectInitiation/EditExpensesRequest' + '?q=' + Encrypt("ExpensesRefId=" + ExpenseHeaderId + "&StatusId=" + StatusId);
}
var Historycolmodels = [
    {
        name: 'FromStageName',
        label: 'From Stage',
        resizable: true,
        ignoreCase: true,
        sortable: true,
        width: 120,
    },
    {
        name: 'ToStageName',
        label: 'To Stage',
        resizable: true,
        ignoreCase: true,
        sortable: true,
        width: 120,
    },
    {
        name: 'AssignedTo',
        label: 'Assigned To',
        resizable: true,
        ignoreCase: true,
        sortable: true,
        width: 150,
    },
    {
        name: 'ReceivedOn',
        label: 'Received On',
        resizable: true,
        ignoreCase: true,
        sortable: true,
        width: 80,
    },
    {
        name: 'SubmittedBy',
        label: 'Submitted By',
        resizable: true,
        ignoreCase: true,
        sortable: true,
        width: 120,
    },
    {
        name: 'SubmittedOn',
        label: 'Submitted On',
        resizable: true,
        ignoreCase: true,
        sortable: true,
        width: 80,
    },
    {
        name: 'NoOfDaysTaken',
        label: 'No. Of Days Taken',
        resizable: true,
        ignoreCase: true,
        sortable: true,
        width: 90,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        sortable: true,
        width: 200,
    },

];
function createHistoryJQGrid(data) {
    $.jgrid.gridUnload('#ExpensesHistory_Grid');

    $("#ExpensesHistory_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: Historycolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#ExpensesHistory_Grid_pager',
        rowNum: 1000,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#ExpensesHistory_Grid tbody tr");
            var objHeader = $("#ExpensesHistory_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#ExpensesHistory_Grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#ExpensesHistory_Grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#audit_trail').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#ExpensesHistory_Grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#ExpensesHistory_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#ExpensesHistory_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

    $("#ExpensesHistory_Grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
function ShowHistory(ExpensesRefId, Project, Department, Category) {
    $('#ProjectNameForHistory').text(decodeURIComponent(Project))
    $('#DeptNameForHistory').text(Department)
    $('#CategoryNameForHistory').text(Category)

    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetExpenseHistory",
        data: {
            ExpenseRefId: ExpensesRefId
        },
        success: function (result) {
            var flowstatus = result.StatusList;
            var HistoryList = result.ExpenseHistoryList;
            var newList = []

            for (var i = 0; i < flowstatus.length; i++) {
                if (flowstatus[i].StatusId === "0") {
                    newList.push(`<li class="bg_hgml yet-tocomplete mt-2" data-viewhistory=0 > Draft </li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2" data-viewhistory=0></li>`)
                }
                else if (flowstatus[i].StatusId === "150") {
                    newList.push(`<li class="bg_hgml yet-tocomplete mt-2" data-viewhistory=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>`)
                }
                else if (flowstatus[i].StatusId === "100" || flowstatus[i].StatusId === "30") {
                    newList.push(
                        `<li class="fas fa-arrow-right yet-tocomplete hide mt-2"  data-viewhistory=${flowstatus[i].StatusId}></li>` + `<li class="bg_hgml yet-tocomplete hide mt-2" data-viewhistory=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>`)
                }
                else {
                    newList.push(`<li class="bg_hgml yet-tocomplete mt-2" data-viewhistory=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2"  data-viewhistory=${flowstatus[i].StatusId}></li>`)
                }
            }
            $('#AddLi').html(newList.join(""));
            var approvalFirstItemLabel = ["Draft"]
            if (HistoryList != 0) {
                for (var i = HistoryList.length - 1; i >= 0; i--) {
                    var item = HistoryList[i];

                    $(`[data-viewhistory=${item.FromStage}]`)
                        .removeClass('yet-tocomplete warning')
                        .addClass('completed');

                    // Special case for FromStage "0"
                    if (item.FromStage === "0" || item.FromStage === "130") {
                        $(`[data-viewhistory=0]`)
                            .removeClass('yet-tocomplete warning')
                            .addClass('completed');
                    }
                    if (item.ToStage === "130") {
                        // Update label text for stage 130
                        if (!approvalFirstItemLabel.includes(" / Roll back to initiator")) {
                            approvalFirstItemLabel[1] = " / Roll back to initiator";
                        }
                        $(`.bg_hgml[data-viewhistory=0]`).text(approvalFirstItemLabel.join(""));
                        $(`[data-viewhistory=0]`).removeClass('completed').addClass('warning');
                    } else if (item.ToStage === "100" || item.ToStage === "30") {
                        // Mark stages 100 and 30 as rejected
                        $(`[data-viewhistory=${item.ToStage}]`)
                            .removeClass('hide yet-tocomplete')
                            .addClass('rejected');
                    } else if (item.ToStage === "20" || item.ToStage === "150") {
                        // Mark stages 20 and 150 as completed
                        $(`[data-viewhistory=${item.ToStage}]`)
                            .removeClass('yet-tocomplete warning')
                            .addClass('completed');
                    }
                    else {
                        // Default case: Mark as warning
                        $(`[data-viewhistory=${item.ToStage}]`)
                            .removeClass('yet-tocomplete completed')
                            .addClass('warning');
                    }
                }
            }

            else {
                $(`[data-viewhistory=0]`).removeClass('yet-tocomplete')
                $(`[data-viewhistory=0]`).addClass('warning')
            }

            $("#ShowExpensesHistory").modal("show");
            createHistoryJQGrid(HistoryList);
        }
    });
}
function downloadoc(docdata) {
    var fileName = docdata.getAttribute("data-filename");
    $.ajax({
        url: ROOT + 'NewProjectInitiation/DownloadExpensesFile',
        data: {
            docName: fileName
        },
        type: 'GET',
        success: function (result) {
            window.location.href = ROOT + "NewProjectInitiation/DownloadExpensesFile?docName=" + fileName;

        }
    });
}
function viewdoc(docdata) {
    var fileName = docdata.getAttribute("data-filename");
    $.ajax({
        url: ROOT + 'NewProjectInitiation/ViewExpensesFile',
        data: {
            docName: fileName
        },
        type: 'GET',
        success: function (result) {
            var fileUrl = ROOT + result;
            window.open(fileUrl, '_blank');
        }
    });
}
var supportingcolmodels = [
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 150,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'CreatedBy',
        label: 'Uploaded by',
        width: 60,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'CreatedOn',
        label: 'Uploaded On',
        width: 60,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'Action',
        label: 'Action',
        align: 'center',
        width: 40,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            var fileextension = rowobject.DocumentName.split('.').pop().toLowerCase();

            if ((fileextension === "pdf" || fileextension === "jpg" || fileextension === "png" || fileextension === "jpeg")) {
                return '<div class="d-flex action_icons align-items-center justify-content-center">' +
                    '<a href="#" title="Download" class="" onclick="downloadoc(this)" data-filename="' + rowobject.DocumentName + '"><i class="fas fa-download color-download"></i></a>' +
                    '<a href="#" title="View" class="" onclick="viewdoc(this)"  data-filename="' + rowobject.DocumentName + '"><i class="fas fa-eye color-eye"></i></a>' +
                    '</div >';

            }
            else {
                return '<div class="d-flex action_icons align-items-center justify-content-center">' +
                    '<a href="#" title="Download" class="" onclick="downloadoc(this)" data-filename="' + rowobject.DocumentName + '"><i class="fas fa-download color-download"></i></a>' +
                    '</div >';
            }


        }
    },
]
function ShowExpensesFileGrid(data) {
    $.jgrid.gridUnload('#Grid_Expense_Document');
    $('#Grid_Expense_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: supportingcolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#Grid_Expense_Document_pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_Expense_Document tbody tr");
            var objHeader = $("#Grid_Expense_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
    }
}
function ShowExpensesFiles(ExpensesRefId) {
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetExpenseFiles",
        data: {
            ExpenseRefId: ExpensesRefId
        },
        success: function (result) {
            $('#Document_Popup').modal('show');
            ShowExpensesFileGrid(result);
        }
    });
}
function OnViewExpense(ExpenseRefId, category) {

    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetExpenseRequestDataById",
        data: {
            ExpenseRefId: ExpenseRefId
        },
        success: function (result) {

            $('#ProjectIdForPopup').text(result.Header[0]?.ProjectName);
            $('#DepartmentNameForPopup').text(result.Header[0]?.DepartmentName);
            $('#CategoryForPopup').text(result.Header[0]?.CategoryName);
            $('#ExpensesHeaderId').text(result.Header[0]?.ExpenseHeaderId);
            $('#DateOfClaim').text(result.Header[0]?.ClaimedOn);
            $('#EmployeeForPopup').text(result.Header[0]?.Employee);

            CreateJqgridForApprovalView(result.Details);
            $('#ViewRequestDetails').modal('show');

        }
    });
}
function OnApproveOrReject(ExpensesRefId, Status, Action) {

    $('#confirmation_msg').text('Are you sure you want to ' + Action);
    $('#modaltitle').text(Action + "Confirmation")
    $('#ActionConfirmation').modal('show');
    var isValid = true;
    var remarks = $('#ActionRemarks').val()
    if (remarks.trim() == '') {
        $('#Error_ActionRemarks').show();
        isValid = false;
    }
    else {
        $('#Error_ActionRemarks').hide();
    }
    if (isValid) {
        $('#ByClick_OK').off('click').on('click', function () {
            ;
            $.ajax({
                type: "POST",
                url: ROOT + "NewProjectInitiation/UpdateExpenseRequestStatus",
                data: {
                    ExpenseRefId: ExpensesRefId,
                    Action: Action,
                    FromStage: Status,
                    Remarks: remarks

                },
                success: function (result) {

                    CreateJQGrid(result);
                }
            });
        });
    }
}


// Common action sets
const commonActions = {
    ViewOnly: ["View", "History", "Documents"],
    EditActions: ["View", "Edit", "History", "Documents", "Delete"],
    RollBackActions: ["View", "Edit", "History", "Documents"],
    ApproveActions: ["View", "Edit", "Approve", "Reject", "Rollback", "History", "Documents"],
    CancelActions: ["View", "History", "Documents", "Cancel"]
};

// Simplified configuration
const actionConfig = {
    DeptTL: {
        0: commonActions.EditActions,
        130: commonActions.RollBackActions,
        140: commonActions.CancelActions,
        150: commonActions.ViewOnly,
        20: commonActions.ViewOnly,
        40: commonActions.ViewOnly,
        30: commonActions.ViewOnly,
        100: commonActions.ViewOnly
    },
    "DeptUser": {
        0: commonActions.EditActions,
        130: commonActions.RollBackActions,
        140: commonActions.CancelActions,
        150: commonActions.ViewOnly,
        20: commonActions.ViewOnly,
        40: commonActions.ViewOnly,
        30: commonActions.ViewOnly,
        100: commonActions.ViewOnly
    },
    "User": {
        0: commonActions.EditActions,
        130: commonActions.RollBackActions,
        140: commonActions.CancelActions,
        150: commonActions.ViewOnly,
        20: commonActions.ViewOnly,
        40: commonActions.ViewOnly,
        30: commonActions.ViewOnly,
        100: commonActions.ViewOnly
    },
    HOD: {
        0: commonActions.EditActions,
        130: commonActions.RollBackActions,
        140: commonActions.ApproveActions,
        150: commonActions.ViewOnly,
        20: commonActions.ViewOnly,
        40: commonActions.CancelActions,
        30: commonActions.ViewOnly,
        100: commonActions.ViewOnly
    },
    "R&D Admin": {
        40: commonActions.ApproveActions,
        150: commonActions.ViewOnly,
        20: commonActions.ViewOnly,
        140: commonActions.ViewOnly,
        30: commonActions.ViewOnly,
        100: commonActions.ViewOnly
    },
    Other: {
        130: commonActions.ViewOnly,
        140: commonActions.ViewOnly,
        150: commonActions.ViewOnly,
        20: commonActions.ViewOnly,
        40: commonActions.ViewOnly,
        30: commonActions.ViewOnly,
        100: commonActions.ViewOnly
    }
};

// Action templates
const actionTemplates = {
    Delete: (id, login) => (login === LoginId) ? `<a class="mr-1" onclick="OnDeleteExpense('${id}')" title="Delete"><i class="fas fa-trash text-danger"></i></a>` : '',
    Edit: (id, StatusId, Login) => (StatusId == "130" && Login != LoginId) ? '' : `<a class="mr-1" onclick="OnEditExpense('${id}','${StatusId}')" title="Edit"><i class="fas fa-pen text-primary"></i></a>`,
    History: (id, ProjectName, DepartmentName, Category) => `<a class="mr-1" onclick="ShowHistory('${id}','${ProjectName.replace(/'/g, "\\'")}','${DepartmentName}','${Category}')" title="History"><i class="fas fa-history text-warning"></i></a>`,
    Documents: id => `<a class="mr-1" onclick="ShowExpensesFiles('${id}')" title="Documents"><i class="fas fa-file text-success"></i></a>`,
    View: (id, category) => `<a class="mr-1" onclick="OnViewExpense('${id}','${category}')" title="View"><i class="fas fa-eye text-info"></i></a>`,
    Approve: (id, TotalExpenses, StatusId) => `<span class="mr-1" role="button" title="Approve" buttonName = "1" expId = ${id} statusId = ${StatusId} app-flow-btn><i class="fas fa-thumbs-up text-success"></i></span>`,
    /*  Reject: (id, StatusId) => `<a class="mr-1" onclick="ValidateReject('${id}',${StatusId})" title="Reject"><i class="fas fa-thumbs-down text-danger"></i></a>`,*/
    Rollback: (id, StatusId) => `<span class="mr-1" role="button" title="Rollback"><i class="fas fa-repeat text-primary" buttonName = "2" expId = ${id} statusId = ${StatusId} app-flow-btn></i></span>`,
    Cancel: (id, StatusId, login) => (login === LoginId) ? `<span class="mr-1" role="button" title="Cancel" buttonName = "3" expId = ${id} statusId = ${StatusId}  app-flow-btn><i class="fas fa-close text-danger" style="font-size:13px"></i></span>` : '',
};

// Function to format actions based on role and status
function formatActions(role, rowobject) {
    const actions = actionConfig[role]?.[rowobject.StatusId] || actionConfig["Other"][rowobject.StatusId] || [];

    return actions.map(action => {
        if (actionTemplates[action]) {
            if (action === "View") {
                return actionTemplates[action](rowobject.ExpensesRefId, rowobject.Category);
            }
            else if (action === "Delete") {
                return actionTemplates[action](rowobject.ExpensesRefId, rowobject.CreatedBy);
            }
            else if (action === "Approve") {
                return actionTemplates[action](rowobject.ExpensesRefId, rowobject.TotalExpenses, rowobject.StatusId);
            }
            else if (action === "Reject") {
                return actionTemplates[action](rowobject.ExpensesRefId, rowobject.StatusId);
            }
            else if (action === "Rollback") {
                return actionTemplates[action](rowobject.ExpensesRefId, rowobject.StatusId);
            }
            else if (action === "History") {
                return actionTemplates[action](rowobject.ExpensesRefId, encodeURIComponent(rowobject.ProjectName), rowobject.DepartmentName, rowobject.Category);
            }
            else if (action === "Cancel") {
                return actionTemplates[action](rowobject.ExpensesRefId, rowobject.StatusId, rowobject.CreatedBy);
            }
            else if (action === "Edit") {
                return actionTemplates[action](rowobject.ExpensesRefId, rowobject.StatusId, rowobject.CreatedBy);
            }
            else {
                return actionTemplates[action](rowobject.ExpensesRefId);
            }
        }
        return '';
    }).join("");
}

function ValidateReject(ExpensesId, StatusId) {
    var role = Role.toLowerCase().trim();
    var action = role === 'hod' ? "L1Reject" : "L2Reject";
    var ApprovalFlow = [{
        FromStage: StatusId,
        Action: action,
        IsSave: "N"
    }];

    const modalMessage = "Are you sure you want to Reject?";

    const modalTitle = "Reject Confirmation";
    ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow, ExpensesId);
}
function ValidateRoleBack(ExpensesId, StatusId) {
    var role = Role.toLowerCase().trim();
    var action = role === 'hod' ? "L1RollBack" : "L2RollBack";
    var ApprovalFlow = [{
        FromStage: StatusId,
        Action: action,
        IsSave: "N"
    }];

    const modalMessage = "Are you sure you want to Roll Back?";

    const modalTitle = "Roll Back Confirmation";
    ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow, ExpensesId);
}
function ValidateCancel(ExpensesId, StatusId) {
    var action = (StatusId == '140' ? 'L1Cancel' : 'L2Cancel')
    var ApprovalFlow = [{
        FromStage: StatusId,
        Action: action,
        IsSave: "N"
    }];

    const modalMessage = "Are you sure you want to Cancel?";

    const modalTitle = "Cancel Confirmation";
    ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow, ExpensesId);
}
function ValidateApprove(ExpensesId, TotalExpenses, StatusId) {
    var role = Role.toLowerCase().trim();
    var ApprovalFlow = [];
    var action = "";

    if (role == "hod") {
        action = "Pending"
        ApprovalFlow = {
            FromStage: StatusId,
            Action: action,
            IsSave: "N"
        };
    }
    else if (role == "r&d admin") {
        action = "L2Approve";
        ApprovalFlow = {
            FromStage: StatusId,
            Action: action,
            IsSave: "N"
        };

    }
    const modalMessage = (role != "r&d admin")
        ? "Are you sure you want to send for R&D Admin Approval?"
        : "Are you sure you want to Approve?";

    const modalTitle = "Approve Confirmation";
    ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow, ExpensesId);
}
function ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow, ExpensesId) {

    $("#ApproveModal").modal('show');
    $("#ModalLabel").text(modalTitle);
    $(".modalmsg").text(modalMessage);

    $('#ByClick_OK').off('click').on('click', function () {
        const Remarks = $("#ApprovalRemarks").val().trim();

        if (!Remarks) {
            $("#E_ApprovalRemarks").show();
            return;
        }
        $(this).prop('disabled', true);
        $("#Remarks").val(Remarks);
        $("#ExpensesRefId").val(ExpensesId);
        $("#ApprovalFlow").val(JSON.stringify(ApprovalFlow));
        document.getElementById('AddExpensesReq').submit();
    });
}

$(window).on('hidden.bs.modal', function () {
    $("#ApprovalRemarks").val('');
    $("#E_ApprovalRemarks").hide();
});


$(document).on('click', '#DownloadHistory', function () {
    var data = $('#ExpensesHistory_Grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#ExpensesHistory_Grid").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "Expenses Approval Info.xlsx",
            maxlength: 1000,
        });
    }
});

function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function MakeAsMoney(number) {
    if (number != null && number != "" && number != undefined) {
        return parseFloat(number).toLocaleString('en-IN', { maximumFractionDigits: 3 })
    }
    else if (number == 0) {
        return 0;
    }
    return "";
}


var approvalColModels = [
    {
        name: 'Category',
        label: 'Category',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'NatureOfExpenses',
        label: 'Nature Of Expenses',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ProjectId',
        label: 'ProjectId',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'BillrefNo',
        label: 'Bill ref. No',
        resizable: true,
        ignoreCase: true,
        width: 100,
        //formatter: function (cellvalue, options, rowobject) {
        //    return `
        //        <span class="textB_class">${cellvalue}</span>
        //    `;
        //},
    },
    {
        name: 'Advance',
        label: 'Advance',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ActualExpenses',
        label: 'Actual Expenses (INR)',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'Otherfee',
        label: 'Other Fee (INR)',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'NetPaytoInitiator',
        label: 'Net Payable to Initiator (INR)',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {

            var Amount = CalculateNET(rowobject.Advance, rowobject.ActualExpenses, rowobject.Otherfee)
            return (Amount < 0) ? -Amount : "NA"
        }
    },
    {
        name: 'NetReceiveFromInitiator',
        label: 'Net Receivable From Initiator (INR)',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {

            var Amount = CalculateNET(rowobject.Advance, rowobject.ActualExpenses, rowobject.Otherfee)
            return (Amount > 0) ? Amount : "NA"
        }
    },
    {
        name: 'UTRNo',
        label: 'UTR No.',
        resizable: true,
        ignoreCase: true,
        width: 90,
    },
    {
        name: 'FieldRemarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        width: 90,
    },
    {
        name: 'PlaceOfStay',
        label: 'Place Of Stay',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'GSTNo',
        label: 'GST No.',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'FromDate',
        label: 'From Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ToDate',
        label: 'To Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },

    {
        name: 'TravelDate',
        label: 'Date of Travel',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ModeOfFare',
        label: 'Mode Of Travel',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue == "0") { return 'NA' }
            else return cellvalue;
        }

    },
    {
        name: 'PurposeOfTravel',
        label: 'Purpose of Travel',
        resizable: true,
        ignoreCase: true,
        width: 150,
    },
    {
        name: 'FromLocation',
        label: 'Travelling From',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ToLocation',
        label: 'Travelling To',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: '',
        label: 'UTR Document',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            var fileName = rowobject.UTRDocument;
            var fileExtension = fileName ? fileName.split('.').pop().toLowerCase() : '';
            var DocFile = encodeURIComponent(fileName);

            if (fileName) {
                return `
            <div class="d-flex action_icons align-items-center justify-content-center" title="${fileName}">
                <span class="mr-2" role="button" onclick="DownloadUTRDoc('${DocFile}')">
                    <i class="fas fa-download download-pr-file-item color-download" title="UTR Document Download"></i>
                </span>
                ${!(fileExtension in unSupportedViewTypes) ? `
                <span class="mr-2" role="button" onclick="ViewUTRDoc('${DocFile}')">
                    <i class="fas fa-eye view-pr-file-item color-eye" title="UTR Document View"></i>
                </span>` : ''}
            </div>`;
            }

            return '';
        }

    }
]
function CalculateNET(Advance, Actual, OtherFee) {
    var total = 0;
    total = Advance - Actual - OtherFee;
    return total;
}
function CreateJqgridForApprovalView(data) {

    $.jgrid.gridUnload('#JqgridForApprovalView');

    $("#JqgridForApprovalView").jqGrid({
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: approvalColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#JqgridForApprovalView_pager',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {

            var objRows = $("#JqgridForApprovalView tbody tr");
            var objHeader = $("#JqgridForApprovalView tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
    });

    $("#JqgridForApprovalView").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#JqgridForApprovalView').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-200px + 100vh)' });
    $('#JqgridForApprovalView').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#audit_trail').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#JqgridForApprovalView').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#JqgridForApprovalView').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#JqgridForApprovalView').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }
}

$(document).on('click', "[app-flow-btn]", function () {

    var btnName = $(this).attr('buttonName');
    var StatusId = $(this).attr('statusId');
    var expId = $(this).attr('expId')
    var role = Role.toLowerCase().trim();

    // approve
    if (btnName == "1") {

        if (role == "hod") {
            action = "Pending"
            ApprovalFlow = {
                FromStage: StatusId,
                Action: action,
                IsSave: "N"
            };
        }
        else if (role == "r&d admin") {
            action = "L2Approve";
            ApprovalFlow = {
                FromStage: StatusId,
                Action: action,
                IsSave: "N"
            };

        }
        const modalMessage = (role != "r&d admin")
            ? "Are you sure you want to send for R&D Admin Approval?"
            : "Are you sure you want to Approve?";

        const modalTitle = "Approve Confirmation";
        HandelAction(modalTitle, modalMessage, ApprovalFlow, expId);

    }
    // roleback
    else if (btnName == "2") {

        var action = role === 'hod' ? "L1RollBack" : "L2RollBack";

        var ApprovalFlow = [{
            FromStage: StatusId,
            Action: action,
            IsSave: "N"
        }];

        const modalMessage = "Are you sure you want to Roll Back?";
        const modalTitle = "Roll Back Confirmation";

        HandelAction(modalTitle, modalMessage, ApprovalFlow, expId);

    }
    // cancel
    else if (btnName == "3") {

        var action = (StatusId == '140' ? 'L1Cancel' : 'L2Cancel')
        var ApprovalFlow = [{
            FromStage: StatusId,
            Action: action,
            IsSave: "N"
        }];

        const modalMessage = "Are you sure you want to Cancel?";
        const modalTitle = "Cancel Confirmation";

        HandelAction(modalTitle, modalMessage, ApprovalFlow, expId);

    }

});
function HandelAction(modalTitle, modalMessage, ApprovalFlow, expId) {

    $("#ApproveModal").modal('show');
    $("#ModalLabel").text(modalTitle);
    $(".modalmsg").text(modalMessage);

    $('#ByClick_OK').off('click').on('click', function () {

        const Remarks = $("#ApprovalRemarks").val().trim();
        if (!Remarks) {
            $("#E_ApprovalRemarks").show();
            return;
        }

        $.ajax({
            url: ROOT + "NewProjectInitiation/ApproveOrRejectTheExpenses",
            type: "POST",
            datatype: "text",
            data: {
                Remarks: Remarks,
                ApprovalFlow: JSON.stringify(ApprovalFlow),
                ExpensesRefId: expId
            },
            success: function (result) {
                if (result.toLowerCase().includes('success')) {
                    window.location.href = ROOT + 'NewProjectInitiation/ExpensesRequestList';
                }
                else {
                    alert(result);
                }
            },
            error: function (xhr, status, error) {
                alert("Error Occured: " + error);
            }
        });
    });
}

$(document).on("click", "#ViewExcelDownload", function () {
    var data = $('#JqgridForApprovalView').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#JqgridForApprovalView").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "ExpensesRequestDetails.xlsx",
            maxlength: 1000, // maxlength for visible string data

        });
    }
});
function DownloadUTRDoc(DocFile) {
    window.location.href = ROOT + "NewProjectInitiation/DownloadPRVendorFile?DocumentName=" + DocFile;
}
function ViewUTRDoc(DocFile) {
    var data = decodeURIComponent(DocFile);
    if (DocFile) {
        var url = ROOT + 'BudgetRequestFiles/' + data;
        window.open(url, '_blank');
    }
}

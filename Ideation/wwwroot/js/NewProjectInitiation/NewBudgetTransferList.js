﻿$(document).ready(function () {
    getProjectslist();
});

var colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        search: false,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="d-flex action_icons align-items-center" title="">
                        <a class="text-warning mr-2" title="Audit Trail" onclick="AuditTrail('${rowobject.ProjectId}')">
                            <i class="fas fa-history"></i>
                        </a>
                        <a onclick="LinkToReport('${rowobject.ProjectId}')" class="text-info mr-2" title="Link to Report">
                            <i class="fas fa-link"></i>
                        </a>
                        <span onclick="getProjectBudgetYear('` + rowobject.ProjectId + `','` + rowobject.ProjectName + `')" class="text-success mr-2" role="button">
                            <i class="fas fa-info-circle YearBudget" title="Year wise Budget And Expenses Info" aria-hidden="true"></i>
                        </span>
                         <a onclick="getProjectBudgetDepartment('` + rowobject.ProjectId + `','` + rowobject.ProjectName + `')" title="Department wise budget and Expenses Info" style="color: #1562a4;">
                             <i class="fas fa-info"></i>
                        </a>
                    </div>`;
        }
    },
    {
        name: 'ProjectName',
        label: 'Project Id',
        width: 200,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="Project_Id_col" title="' + cellvalue + '">' +
                '<a class="text-info color-blue" title="' + cellvalue + '" style="white-space: wrap;" href="' + ROOT + 'NewProjectInitiation/ProjectBudgetTransfer?q=' + Encrypt('ProjectId=' + rowobject.ProjectId) + '">' + cellvalue + '</a>' + '</div>';
        }
    },
    {
        name: 'ProjectName',
        label: 'Project Id',
        width: 150,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'ProjectId',
        label: 'Project Id',
        width: 10,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'TotalBudgetAmt',
        label: 'Total Budget  (INR)',
        width: 110,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'AssignedAmt',
        label: 'Assigned Amount (INR)',
        width: 110,
        resizable: true,
        sortable: false,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'AssignedBalance',
        label: 'Total Balance (INR)',
        width: 110,
        resizable: true,
        sortable: false,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'TotalExpenseAmt',
        label: 'Expenses (INR)',
        width: 110,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'Balance',
        label: 'Expenses Balance (INR)',
        width: 110,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'BaselineBudget',
        label: 'Baseline Budget (INR)',
        width: 110,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'AdditionalBudget',
        label: 'Additional Budget (INR)',
        width: 110,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'TransferBudget',
        label: 'In Transfer Budget (INR)',
        width: 110,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
];
function createJqGrid(result) {
    result.forEach(function (item) {
        item.TotalBudgetAmt = MakeAsMoney(item.TotalBudgetAmt)
        item.Balance = MakeAsMoney(item.Balance)
        item.TotalExpenseAmt = MakeAsMoney(item.TotalExpenseAmt)
        item.TransferBudget = MakeAsMoney(item.TransferBudget)
        item.BaselineBudget = MakeAsMoney(item.BaselineBudget)
        item.AdditionalBudget = MakeAsMoney(item.AdditionalBudget)
        item.AssignedAmt = MakeAsMoney(item.AssignedAmt)
        item.AssignedBalance = MakeAsMoney(item.AssignedBalance)
    });
    $.jgrid.gridUnload('#budgetTransfer_grid');
    $("#budgetTransfer_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_budgetTransfer_grid',
        rowNum: 100000,
        scroll: 1,
        footerrow: true,

        gridComplete: function () {
            var objRows = $("#budgetTransfer_grid tbody tr");
            var objHeader = $("#budgetTransfer_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }, loadComplete: function () {

            var $grid = $('#budgetTransfer_grid');

            var TotalBudgetAmt = $grid.jqGrid('getCol', 'TotalBudgetAmt')
            var BaselineBudget = $grid.jqGrid('getCol', 'BaselineBudget')
            var AdditionalBudget = $grid.jqGrid('getCol', 'AdditionalBudget')
            var TransferBudget = $grid.jqGrid('getCol', 'TransferBudget')
            var TotalExpenseAmt = $grid.jqGrid('getCol', 'TotalExpenseAmt')
            var Balance = $grid.jqGrid('getCol', 'Balance')
            var AssignedAmt = $grid.jqGrid('getCol', 'AssignedAmt')
            var AssignedBalance = $grid.jqGrid('getCol', 'AssignedBalance')

            var total = 0;
            function getTotal(arraymodified) {
                total = 0;
                $.each(arraymodified, function (i, obj) {
                    if (obj != '' && obj != null) {
                        total = total + parseFloat(obj.replace(/,/g, ''));
                    }
                });
                return total;
            }

            TotalBudgetAmt = MakeAsMoney(getTotal(TotalBudgetAmt));
            BaselineBudget = MakeAsMoney(getTotal(BaselineBudget));
            AdditionalBudget = MakeAsMoney(getTotal(AdditionalBudget));
            TransferBudget = MakeAsMoney(getTotal(TransferBudget));
            TotalExpenseAmt = MakeAsMoney(getTotal(TotalExpenseAmt));
            Balance = MakeAsMoney(getTotal(Balance));
            AssignedBalance = MakeAsMoney(getTotal(AssignedBalance));
            AssignedAmt = MakeAsMoney(getTotal(AssignedAmt));

            $grid.jqGrid('footerData', 'set', { 'TotalBudgetAmt': TotalBudgetAmt });
            $grid.jqGrid('footerData', 'set', { 'BaselineBudget': BaselineBudget });
            $grid.jqGrid('footerData', 'set', { 'AdditionalBudget': AdditionalBudget });
            $grid.jqGrid('footerData', 'set', { 'TransferBudget': TransferBudget });
            $grid.jqGrid('footerData', 'set', { 'TotalExpenseAmt': TotalExpenseAmt });
            $grid.jqGrid('footerData', 'set', { 'Balance': Balance });
            $grid.jqGrid('footerData', 'set', { 'AssignedBalance': AssignedBalance });
            $grid.jqGrid('footerData', 'set', { 'AssignedAmt': AssignedAmt });
            $grid.jqGrid('footerData', 'set', { 'ProjectName': "Total" });

        }
    });

    $('#budgetTransfer_grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#budgetTransfer_grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#budgetTransfer_grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#budgetTransfer_grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#budgetTransfer_grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#budgetTransfer_grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#budgetTransfer_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    var grid = $('#budgetTransfer_grid');
    var gview = grid.closest('.ui-jqgrid-btable').parents(".ui-jqgrid-view");
    $("div.ui-jqgrid-sdiv", gview).after($("div.ui-jqgrid-bdiv", gview));
}

function getProjectslist() {
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetBudgetTransferList",
        dataType: "json",
        data: {
        },
        success: function (result) {
            createJqGrid(result);
        }
    });
}

function AuditTrail(ProjectId) {
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetProjectTransferHistory",
        dataType: "JSON",
        data: {
            ProjectId: ProjectId
        },
        success: function (result) {
            $("#auditTrail").modal("show");
            var projectId = ProjectId;
            $(".project_id").text(result[0]?.ProjectId);
            createAuditJQGrid(result);
            $('#ProjIdForTransferHistory').val(projectId);
        }
    });
}
function MakeAsMoney(number) {

    if (number != null && number != "" && number != undefined) {
        return parseFloat(number).toLocaleString('en-IN', { maximumFractionDigits: 0 })
    }
    else if (number == 0) {
        return 0;
    }
    return "";
}
var auditcolmodels = [
    {
        name: 'BudgetReqNo',
        label: 'Budget Request Number',
        width: 80,
        hidden: true,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'RequestedYear',
        label: 'From Year',
        width: 50,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ToYear',
        label: 'To Year',
        width: 50,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue == "0") {
                return ''
            }
            return cellvalue;
        }
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CategoryName',
        label: 'Category',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 80,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<span class="${rowobject.BudgetTypeClass}">${rowobject.BudgetType}</span>`;
        }
    },
    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 10,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'RequestedAmount',
        label: 'Requested Budget (INR)',
        width: 80,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.BudgetType == 'Transfer In' || rowobject.BudgetType == 'Transfer Out') {
                return '';
            }
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'ApprovedAmount',
        label: 'Approved/ Transfered Budget (INR)',
        width: 80,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var additionalBudget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return additionalBudget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Status',
        label: 'Action',
        width: 120,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<span class="${rowobject.StatusClass}">${rowobject.Status}</span>`;
        }
    },
    {
        name: 'Status',
        label: 'Action',
        width: 10,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true
    },
    {
        name: 'CreatedBy',
        label: 'Action By',
        width: 130,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'CreatedOn',
        label: 'Action On',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 180,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'History',
        label: 'History',
        width: 60,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="grid-icons-group -justify-center"> <a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="showApprovalHistory('${rowobject.BudgetReqNo}', '${rowobject.RequestedYear}', '${rowobject.DepartmentName}', '${rowobject.CategoryName}', '${rowobject.BudgetType}', '${rowobject.Amount}')" 
        class="icon_color text-success btn_button" title="View">
        <i class="fas fa-eye"></i></a></div>`;
        }

    },
];
function createAuditJQGrid(result) {
    $.jgrid.gridUnload('#audit_trail')
    $("#audit_trail").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: auditcolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#audit_pager',
        rowNum: 1000,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#audit_trail tbody tr");
            var objHeader = $("#audit_trail tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

    $('#audit_trail').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#audit_trail').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#audit_trail').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#audit_trail').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#audit_trail').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#audit_trail').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#audit_trail").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}

$(document).on('click', '#HistoryExcelDownload', function () {
    var data = $('#audit_trail').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#audit_trail").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "TransferHistory.xlsx",
            maxlength: 1000,
        });
    }
});
$(".ProjectButtonSync , .BudgetButtonSync , .ExpensesButtonSync").on("click", function () {
    var clickedId = $(this).attr("id");

    var buttontype = clickedId == "ProjectView" ? "ProjectView" : clickedId == "BudgetView" ? "BudgetView" : clickedId == "ExpenseView" ? "ExpenseView" : "";
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/MethodForAPI",
        dataType: "json",
        data: {
            type: buttontype
        },
        success: function (result) {
            if (result != "") {
                showAlertMessage(result)
            }
        }
    });
});
function showAlertMessage(message) {
    var lines = message.split(",");
    var hasFailure = 0;

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes("sucessfully inserted")) {
            continue;
        } else {
            hasFailure++;
        }
    }

    var alertClass = hasFailure == 1 ? "alert-danger" : "alert-success";
    var formattedMessage = lines.join("<br>");
    if (hasFailure == 0) {

        $('#alertText').html(formattedMessage);
        $('#alertMessage').removeClass().addClass('alert ' + alertClass);
        $('#alertMessage').show();
        setTimeout(function () {
            $('#alertMessage').hide();
        }, 30000);
    }
    else {
        $("#AlertPopUp").modal("show");
        $('#AlertMessage').html(formattedMessage);
    }
    getProjectslist();
}

col = [
    {
        name: 'Year',
        label: 'Year',
        width: 20,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'TotalBudgetAmt',
        label: 'Budget (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: false,

        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return '<a class="text-info color-blue" onclick="showyearwisedata(' + rowobject.Year + ', \'Budget\')">' + Budget + '</a>';
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'TotalBudgetAmt',
        label: 'Budget (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'AssignedAmt',
        label: 'Assigned Amount (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: true,
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'AssignedBalance',
        label: 'Total Balance (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: true,
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'Expense',
        label: 'Expenses (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return '<a class="text-info color-blue" onclick="showyearwisedata(' + rowobject.Year + ', \'Expenses\')">' + Budget + '</a>';
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Balance',
        label: 'Expenses Balance (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Expense',
        label: 'Expenses (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget;
            }
            else {
                return ''
            }
        }
    }
];
function createJQGridYearWise(result) {
    $.jgrid.gridUnload('#YearWisebudget');
    $("#YearWisebudget").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: result,
        mtype: 'GET',
        colModel: col,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_YearWisebudget',
        rowNum: 50,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,

        gridComplete: function () {
            var objRows = $("#YearWisebudget tbody tr");
            var objHeader = $("#YearWisebudget tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#YearWisebudget');


            var Budget = $grid.jqGrid('getCol', 'TotalBudgetAmt')
            var Expense = $grid.jqGrid('getCol', 'Expense')
            var AssignedAmt = $grid.jqGrid('getCol', 'AssignedAmt')
            var AssignedBalance = $grid.jqGrid('getCol', 'AssignedBalance')
            var Balance = $grid.jqGrid('getCol', 'Balance');

            function getTotal(arraymodified) {
                total = 0;
                $.each(arraymodified, function (i, obj) {
                    if (obj != '' && obj != null) {
                        total = total + parseFloat(obj.replace(/,/g, ''));
                    }
                });
                return total;
            }
            AssignedAmt = getTotal(AssignedAmt);
            AssignedBalance = getTotal(AssignedBalance);

            const extractValues = (Budget) => {
                return Budget.map(item => {
                    const match = item.match(/>([^<]+)</);
                    return match ? match[1] : null;
                });
            };
            const Budgetvalues = extractValues(Budget);

            const ExpextractValues = (Expense) => {
                return Expense.map(item => {
                    const match = item.match(/>([^<]+)</);
                    return match ? match[1] : null;
                });
            };
            const Expensesvalues = ExpextractValues(Expense);

            var budgetTotal = 0, Expensetotal = 0, Balancetotal = 0;
            $.each(Budgetvalues, function (i, obj) {
                if (obj != '' && obj != null) {
                    budgetTotal = budgetTotal + parseFloat(obj.replace(/,/g, ''));
                }
            });
            $.each(Expensesvalues, function (i, obj) {
                if (obj != '' && obj != null) {
                    Expensetotal = Expensetotal + parseFloat(obj.replace(/,/g, ''));
                }
            });
            $.each(Balance, function (i, obj) {
                if (obj != '' && obj != null) {
                    Balancetotal = Balancetotal + parseFloat(obj.replace(/,/g, ''));
                }
            });

            $grid.jqGrid('footerData', 'set', { 'Year': "Total" });
            $grid.jqGrid('footerData', 'set', { 'TotalBudgetAmt': budgetTotal.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'Expense': Expensetotal.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'AssignedBalance': AssignedBalance });
            $grid.jqGrid('footerData', 'set', { 'AssignedAmt': AssignedAmt });
            $grid.jqGrid('footerData', 'set', { 'Balance': Balancetotal });
        }
    });

    $('#YearWisebudget').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#YearWisebudget').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#YearWisebudget').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#YearWisebudget').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#YearWisebudget').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#YearWisebudget').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#YearWisebudget").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}

function getProjectBudgetYear(ProjectId, ProjectName) {
    $('#budget_projectid').val(ProjectId)
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetYearWiseBudgetAndExpense",
        dataType: "json",
        async: false,
        data: { ProjectId: ProjectId },
        success: function (data) {
            $("#ShowBudget").modal("show");
            $(".project_id").text(ProjectName)
            createJQGridYearWise(data);
        }
    });
}

var yearwisecol = [
    {
        name: 'Department',
        label: 'Department',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Category',
        label: 'Category',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TotalBudgetAmt',
        label: 'Budget (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'TotalExpenseAmt',
        label: 'Expenses (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            //return MakeAsMoney(cellvalue);
            return parseFloat(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 2 });
        }

    },
    {
        name: 'Balance',
        label: 'Balance (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    }
];
function createYearWiseDataGrid(result, type) {

    type.toLowerCase() == 'budget' ? $('#title').text('Budget Details') : $('#title').text('Expense Details');

    $.jgrid.gridUnload('#YearWiseIndividualbudget');

    $("#YearWiseIndividualbudget").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: result,
        mtype: 'GET',
        colModel: yearwisecol,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_YearWiseIndividualbudget',
        rowNum: result.length,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,
        gridComplete: function () {
            var objRows = $("#YearWiseIndividualbudget tbody tr");
            var objHeader = $("#YearWiseIndividualbudget tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#YearWiseIndividualbudget');

            var Budget = $grid.jqGrid('getCol', 'TotalBudgetAmt');
            var Expense = $grid.jqGrid('getCol', 'TotalExpenseAmt');
            var Balance = $grid.jqGrid('getCol', 'Balance');
            var total = 0;

            function getTotal(column) {
                total = 0
                $.each(column, function (i, obj) {
                    if (obj != '' && obj != null) {
                        total = total + parseFloat(obj.replace(/,/g, ''));
                    }
                });
                return total;
            }

            var budget = getTotal(Budget);
            var expense = getTotal(Expense);
            var balance = getTotal(Balance);

            budget = budget.toFixed(2);
            expense = expense.toFixed(2);
            balance = balance.toFixed(2);

            $grid.jqGrid('footerData', 'set', { 'Department': "Total" });
            $grid.jqGrid('footerData', 'set', { 'Category': "" });
            $grid.jqGrid('footerData', 'set', { 'TotalBudgetAmt': budget });
            $grid.jqGrid('footerData', 'set', { 'TotalExpenseAmt': expense });
            $grid.jqGrid('footerData', 'set', { 'Balance': balance });
        }
    });

    $('#YearWiseIndividualbudget').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#YearWiseIndividualbudget').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#YearWiseIndividualbudget').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#YearWiseIndividualbudget').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#YearWiseIndividualbudget').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#YearWiseIndividualbudget').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

    $("#YearWiseIndividualbudget").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
function showyearwisedata(year, type) {
    if (year != "" && year != undefined && year != null) {
        var project = $('#budget_projectid').val();
        var Year = year;
        $.ajax({
            type: "GET",
            url: ROOT + "NewProjectInitiation/GetBudgetAndExpenseBasedOnYear",
            data:
            {
                Project: project, Year: year
            },
            dataType: "JSON",
            success: function (response) {
                $("#showYearWiseBudget").modal("show");
                $.jgrid.gridUnload('#YearWiseIndividualbudget');
                createYearWiseDataGrid(response, type);
                $(".project_data").text();
                $('.year_data').text(Year);
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
}

$(document).on('click', '#DepartmentBudgetDownload', function () {
    var data = $('#YearWiseIndividualbudget').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#YearWiseIndividualbudget").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "YearBudgetDetails.xlsx",
            maxlength: 1000,
        });
    }
});


var sapcolmod = [

    {
        name: "ProjectId",
        label: "Project Id",
        width: 60,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: false
    },
    {
        name: "ProjectName",
        label: "Project Id",
        width: 100,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: "IspaceBudget",
        label: "iSpace Budget (INR)",
        width: 50,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                if (options.rowId === undefined || options.rowId === "" || options.rowId === "") {
                    return Budget;
                }
                return '<a class="text-info color-blue" onclick="GetBudgetDifference(\'' + rowobject.ProjectId + '\', \'' + rowobject.ProjectName +'\')">' + Budget + '</a>';
            }
            else {
                return ''
            }
        }
    },
    {
        name: "SAPBuget",
        label: "SAP Budget (INR)",
        width: 50,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                if (options.rowId === undefined || options.rowId === "" || options.rowId === "") {
                    return Budget;
                }
                return '<a class="text-info color-blue" onclick="GetBudgetDifference(\'' + rowobject.ProjectId + '\', \'' + rowobject.ProjectName +'\')">' + Budget + '</a>';
            }
            else {
                return ''
            }
        }
    },
    {
        name: "Balance",
        label: "Difference (INR)",
        width: 50,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            var value = rowobject.IspaceBudget - rowobject.SAPBuget
            if (value != "" && value != undefined && value != null && value != 0) {
                var Budget = parseFloat(value).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Legacy',
        label: 'Legacy',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.Legacy == 'Yes') {
                return '<span class="true">Yes</span>'
            }
            else {
                return '<span class="">No</span>'
            }
        }
    },
];
function createJQGridForSAP(result) {
    $.jgrid.gridUnload('#SAPDifferenceProjects')
    $("#SAPDifferenceProjects").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: result,
        mtype: 'GET',
        colModel: sapcolmod,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_SAPDifferenceProjects',
        rowNum: 1000,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,

        gridComplete: function () {
            $(".true").closest("tr").find("td.Project").addClass("legacy_color");

            var objRows = $("#SAPDifferenceProjects tbody tr");
            var objHeader = $("#SAPDifferenceProjects tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
    });

    $('#SAPDifferenceProjects').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#SAPDifferenceProjects').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#SAPDifferenceProjects').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#SAPDifferenceProjects').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#SAPDifferenceProjects').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#SAPDifferenceProjects').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#SAPDifferenceProjects").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}

$(document).on('click', '.Syncdifferent', function () {
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetSAPdifferenceProjectDetails",
        data: {},
        dataType: "JSON",
        success: function (response) {
            $("#ShowDifference").modal("show");
            createJQGridForSAP(response);
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});

function LinkToReport(ProjectId) {
    window.open(ROOT + 'NewProjectBudgetReport/ProjectBudgetPBReport' + '?q=' + Encrypt("projectId=" + ProjectId), '_blank');
}


$(document).on("click", "#TransferExcelDownload", function () {
    var data = $('#budgetTransfer_grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#budgetTransfer_grid").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "ProjectBudgetDetails.xlsx",
            maxlength: 1000,

        });
    }
});

$(document).on("click", "#SAPExcelDownload", function () {
    var data = $('#SAPDifferenceProjects').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#SAPDifferenceProjects").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "BudgetDifferenceFromSAP.xlsx",
            maxlength: 1000,
        });
    }
});
var historydatacomodels = [
    {
        name: 'BudgetReqNo',
        label: 'Budget Request Number',
        width: 80,
        hidden: true,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'RequestedAmount',
        label: 'Requested Budget (INR)',
        width: 90,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'ApprovedAmount',
        label: 'Approved Budget (INR)',
        width: 90,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'Status',
        label: 'Action',
        width: 120,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        // hidden:true,
        formatter: function (cellvalue, options, rowobject) {
            return `<span class="${rowobject.StatusClass}">${rowobject.Status}</span>`;
        }
    },
    {
        name: 'Status',
        label: 'Action',
        width: 10,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true
    },
    {
        name: 'CreatedBy',
        label: 'Action By',
        width: 130,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'CreatedOn',
        label: 'Action On',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    }
];
function createGridForHistory(result) {
    $.jgrid.gridUnload('#history_gridforapprovalinfo');
    $("#history_gridforapprovalinfo").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: historydatacomodels,
        loadonce: true,
        viewrecords: true,
        pager: '#history_pagerforapprovalinfo',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#history_gridforapprovalinfo tbody tr");
            var objHeader = $("#history_gridforapprovalinfo tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

    $('#history_gridforapprovalinfo').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#history_gridforapprovalinfo').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#history_gridforapprovalinfo').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#history_gridforapprovalinfo').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#history_gridforapprovalinfo').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#history_gridforapprovalinfo').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#history_gridforapprovalinfo").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
function showApprovalHistory(budgetReqNo, requestedyear, requesteddepartment, category, budgettype, budget) {
    var projectId = $('#ProjIdForTransferHistory').val()
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetApprovalHistoryInfo",
        data: { projectId: projectId, budgetReqNo: budgetReqNo },
        success: function (result) {
            $('#approvalhistorypopup').modal('show');
            $('.RequestedYearForHistory').text(requestedyear)
            $('.RequestedDepartmentForHistory').text(requesteddepartment)
            $('.category').text(category)
            $('.BudgetTypeForHistory').text(budgettype)
            $('.BudgetForHistory').text(budget)
            createGridForHistory(result);
        }
    });
}

function getProjectBudgetDepartment(ProjectId, projectName) {

    $('#budget_projectid').val(ProjectId);

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetProjectDepartmentBudget",
        dataType: "json",
        data: {
            ProjectId: ProjectId,
        },
        success: function (result) {

            $(".project_id").text(projectName);
            createDepartmentBudgetGrid(result);
            $("#ProjectDepartmentBudget").modal("show");

        }
    });
}

colmodDepartment = [
    {
        name: "Department",
        label: "Department Name",
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: "Year",
        label: "Year",
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: "Category",
        label: "Category Name",
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TotalBudgetAmt',
        label: 'Total Budget  (INR)',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'AssignedAmt',
        label: 'Assigned Amount (INR)',
        width: 120,
        resizable: true,
        sortable: false,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'AssignedBalance',
        label: 'Total Balance (INR)',
        width: 130,
        resizable: true,
        sortable: false,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'TotalExpenseAmt',
        label: 'Expenses (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'Balance',
        label: 'Expenses Balance (INR)',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'BaselineBudget',
        label: 'Baseline Budget (INR)',
        width: 140,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'AdditionalBudget',
        label: 'Additional Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'TransferBudget',
        label: 'In Transfer Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },

];
function createDepartmentBudgetGrid(result) {

    $.jgrid.gridUnload('#DepartmentWiseBudget');

    $("#DepartmentWiseBudget").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: result,
        mtype: 'GET',
        colModel: colmodDepartment,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_DepartmentWiseBudget',
        rowNum: 100000,
        scroll: 1,
        footerrow: true,

        gridComplete: function () {

            var objRows = $("#DepartmentWiseBudget tbody tr");
            var objHeader = $("#DepartmentWiseBudget tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },

        loadComplete: function () {

            var $grid = $('#DepartmentWiseBudget');

            var TotalBudgetAmt = $grid.jqGrid('getCol', 'TotalBudgetAmt')
            var BaselineBudget = $grid.jqGrid('getCol', 'BaselineBudget')
            var AdditionalBudget = $grid.jqGrid('getCol', 'AdditionalBudget')
            var TransferBudget = $grid.jqGrid('getCol', 'TransferBudget')
            var TotalExpenseAmt = $grid.jqGrid('getCol', 'TotalExpenseAmt')
            var Balance = $grid.jqGrid('getCol', 'Balance')

            var total = 0;
            function getTotal(arraymodified) {
                total = 0;
                $.each(arraymodified, function (i, obj) {
                    if (obj != '' && obj != null) {
                        total = total + parseFloat(obj.replace(/,/g, ''));
                    }
                });
                return total;
            }

            TotalBudgetAmt = (getTotal(TotalBudgetAmt));
            BaselineBudget = (getTotal(BaselineBudget));
            AdditionalBudget = (getTotal(AdditionalBudget));
            TransferBudget = (getTotal(TransferBudget));
            TotalExpenseAmt = (getTotal(TotalExpenseAmt));
            Balance = (getTotal(Balance));

            $grid.jqGrid('footerData', 'set', { 'TotalBudgetAmt': TotalBudgetAmt });
            $grid.jqGrid('footerData', 'set', { 'BaselineBudget': BaselineBudget });
            $grid.jqGrid('footerData', 'set', { 'AdditionalBudget': AdditionalBudget });
            $grid.jqGrid('footerData', 'set', { 'TransferBudget': TransferBudget });
            $grid.jqGrid('footerData', 'set', { 'TotalExpenseAmt': TotalExpenseAmt });
            $grid.jqGrid('footerData', 'set', { 'Balance': Balance });
            $grid.jqGrid('footerData', 'set', { 'Department': "Total" });

        }
    });

    $('#DepartmentWiseBudget').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-320px + 100vh)' });
    $('#DepartmentWiseBudget').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#DepartmentWiseBudget').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#DepartmentWiseBudget').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#DepartmentWiseBudget').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
        $('#DepartmentWiseBudget').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#DepartmentWiseBudget').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $('#DepartmentWiseBudget').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

    $("#DepartmentWiseBudget").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}

$(document).on('click', '#PrjDepartmentBudgetDownload', function () {

    var data = $('#DepartmentWiseBudget').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#DepartmentWiseBudget").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "DepartmentBudgetDetails.xlsx",
            maxlength: 1000,
        });
    }

});

$(document).on('click', '#YearExcelDownload', function () {
    var projectId = $('#budget_projectid').val()
    var data = $('#YearWisebudget').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#YearWisebudget").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "YearWiseBudget_" + projectId + ".xlsx",
            maxlength: 1000,
        });
    }
});

function MakeAsMoney(number) {

    if (number != null && number != "" && number != undefined) {
        return parseFloat(number).toLocaleString('en-IN', { maximumFractionDigits: 0 })
    }
    else if (number == 0) {
        return 0;
    }
    return "";
}
function GetBudgetDifference(ProjectId, Source) {
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetYearWiseBudgetAndExpense",
        dataType: "json",
        async: false,
        data: { ProjectId: ProjectId },
        success: function (data) {
            $("#ShowDifferenceDepartmentWise").modal("show");
            $(".project_id").text(ProjectId)
            CreateSAPDifferenceGrid(data);
        }
    });
}

diffcol = [

    {
        name: "Year",
        label: "Year",
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TotalBudgetAmt',
        label: 'iSpace Budget(INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'SAPBudgetAmt',
        label: 'SAP Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: true,
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'Difference',
        label: 'Difference(INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue == undefined || cellvalue == null || cellvalue == "") {
                var diff = rowobject.TotalBudgetAmt - rowobject.SAPBudgetAmt
                return MakeAsMoney(diff);
            }
            else {
                return MakeAsMoney(cellvalue);
            }
        }
    },
]
function CreateSAPDifferenceGrid(result) {
    $.jgrid.gridUnload('#SAPDifference_DepartmenetWise_Project');
    $("#SAPDifference_DepartmenetWise_Project").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: result,
        mtype: 'GET',
        colModel: diffcol,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_SAPDifference_DepartmenetWise_Project',
        rowNum: 50,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,

        gridComplete: function () {
            var objRows = $("#SAPDifference_DepartmenetWise_Project tbody tr");
            var objHeader = $("#SAPDifference_DepartmenetWise_Project tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },

        loadComplete: function () {
            var $grid = $('#SAPDifference_DepartmenetWise_Project');
            var Budget = $grid.jqGrid('getCol', 'TotalBudgetAmt')
            var SAPBudgetAmt = $grid.jqGrid('getCol', 'SAPBudgetAmt')
            var DifferenceAmt = $grid.jqGrid('getCol', 'Difference')
            debugger
            function getTotal(arraymodified) {
                total = 0;
                $.each(arraymodified, function (i, obj) {
                    if (obj != '' && obj != null) {
                        var num = parseFloat(obj.toString().replace(/,/g, ''));
                        if (!isNaN(num)) {
                            total += num;
                        }
                    }
                });
                return total;
            }
            const SAPBudgetvalues = getTotal(SAPBudgetAmt);
            const Budgetvalues = getTotal(Budget);
            const DifferenceValues = getTotal(DifferenceAmt);

            $grid.jqGrid('footerData', 'set', { 'Year': "Total" });
            $grid.jqGrid('footerData', 'set', { 'TotalBudgetAmt': Budgetvalues.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'SAPBudgetAmt': SAPBudgetvalues });
            $grid.jqGrid('footerData', 'set', { 'Difference': DifferenceValues });
        }

    })
}


$(document).on('click', '#SAPExcelDownloadDepartmentWise', function () {
    var data = $('#SAPDifference_DepartmenetWise_Project').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#SAPDifference_DepartmenetWise_Project").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "YearWiseBudgetDifferenceFromSAP.xlsx",
            maxlength: 1000,
        });
    }
});
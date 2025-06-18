$(document).ready(function () {
    getProjectslist();
});

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 80,
        search: false,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol:false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="d-flex action_icons align-items-center" title="">
                        <a  class="text-warning mr-2" title="Audit Trail" onclick="AuditTrail('${rowobject.ProjectId}')">
                            <i class="fas fa-history"></i>
                        </a>
                        <a onclick="LinkToReport('${rowobject.ProjectId}')" class="text-info mr-2" title="Link to Report">
                            <i class="fas fa-link"></i>
                        </a>
                         <span onclick="getProjectBudgetYear('` + rowobject.ProjectId + `','` + rowobject.ProjectName +`')" class="text-success">
    <i class="fas fa-info-circle YearBudget" title="Year Budget Info" aria-hidden="true"></i>
</span>
                    </div>`;
        }
    },
    {
        name: 'ProjectName',
        label: 'Project ID',
        width: 220,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProjectId',
        label: 'Project ID',
        width: 10,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'TotalBudgetAmt',
        label: 'Total Budget  (INR)',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
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
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
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
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
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
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'TotalExpenseAmt',
        label: 'Expenses (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Balance',
        label: 'Balance (INR)',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }

    },
],

    $("#budgetTransfer_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_budgetTransfer_grid',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#budgetTransfer_grid tbody tr");
            var objHeader = $("#budgetTransfer_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$("#budgetTransfer_grid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
function getProjectslist() {
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetBudgetTransferList",
        dataType: "json",
        data: {
        },
        success: function (result) {
            $("#budgetTransfer_grid").jqGrid("clearGridData");
            $("#budgetTransfer_grid").jqGrid('setGridParam', { data: result });
            $("#budgetTransfer_grid").trigger('reloadGrid', [{ page: 1 }]);
        }
    });
}

function AuditTrail(ProjectId) {
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetProjectTransferHistory",
        dataType: "json",
        data: { ProjectId: ProjectId },
        success: function (result) {
            $("#auditTrail").modal("show");
            $(".project_id").text(result[0].ProjectId);
            $("#audit_trail").jqGrid("clearGridData");
            $("#audit_trail").jqGrid('setGridParam', { data: result });
            $("#audit_trail").trigger('reloadGrid', [{ page: 1 }]);
        }
    });
}
colmodels = [

    {
        name: 'Year',
        label: 'Year',
        width: 80,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",

    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'Category',
        label: 'Category',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "",
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<a href="#" class="value_info"> <span class="color-brown">' + cellvalue + '</span></a>'

        }
    },
    {
        name: 'Category',
        label: 'Category',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: "",
        exportcol: true,
        hidden: true,
    },
    {
        name: 'BudgetType',
        label: 'Request Type',
        width: 100,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.BudgetType == "Baseline") {
                return '<a href="#" class="value_info"> <span class="color-green_">' + cellvalue + '</span></a>';
            }
            else if (rowobject.BudgetType == "Additional") {
                return '<a href="#" class="value_info"> <span class="text-warning">' + cellvalue + '</span></a>';
            }
            else if (rowobject.BudgetType == "Transfer In" || rowobject.BudgetType == "Transfer Out") {
                return '<a href="#" class="value_info"> <span class="color-blue">' + cellvalue + '</span></a>';
            }
            else {
                return '';
            }
        }
    },
    {
        name: 'BudgetType',
        label: 'Request Type',
        width: 100,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        hidden: true,
    },
    {
        name: 'Amount',
        label: 'Amount (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { 'minimumFractionDigits': 0, 'maximumFractionDigits': 2 });
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'CreatedBy',
        label: 'L2 Approver',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",

    },
    {
        name: 'CreatedDate',
        label: 'L2 Approved On',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
],
    $("#audit_trail").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
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

$("#audit_trail").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 258) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
}

$("#HistoryExcelDownload").click(function () {
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
        url: ROOT + "ProjectMaster/MethodForAPI",
        dataType: "json",
        data: {type:buttontype
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
        //    lines[i] = "<span style='color: red;'>" + lines[i] + "</span>";
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
],

    $("#YearWisebudget").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: [],
        mtype: 'GET',
        colModel: col,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_YearWisebudget',
        rowNum: 1000,
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

            var budgetTotal = 0, Expensetotal = 0
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

            $grid.jqGrid('footerData', 'set', { 'Year': "Total" });
            $grid.jqGrid('footerData', 'set', { 'TotalBudgetAmt': budgetTotal.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'Expense': Expensetotal.toFixed(2) });
        }
    });
$("#YearWisebudget").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
function getProjectBudgetYear(ProjectId, ProjectName) {
    $('#budget_projectid').val(ProjectId)
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetYearWiseBudgetAndExpense",
        dataType: "json",
        async: false,
        data: { ProjectId: ProjectId },
        success: function (data) {
            $("#ShowBudget").modal("show");
            $(".project_id").text(ProjectName)
            $("#YearWisebudget").jqGrid("clearGridData");
            $("#YearWisebudget").jqGrid('setGridParam', { data: data });
            $("#YearWisebudget").trigger('reloadGrid', [{ page: 1 }]);
        }
    });
}
var yearwisebudgetcol = [
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
        name: 'Budget',
        label: 'Budget (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget
            }
            else {
                return ''
            }
        }
    }
];
var yearwiseexpensecol = [
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
        name: 'Expense',
        label: 'Expenses (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Expense = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Expense
            }
            else {
                return ''
            }
        }
    },

];
function createYearWiseDataGrid(result, type) {
    type.toLowerCase() == 'budget' ? $('#title').text('Budget Details') : $('#title').text('Expense Details')
    $("#YearWiseIndividualbudget").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: result,
        mtype: 'GET',
        colModel: type.toLowerCase() == 'budget' ? yearwisebudgetcol : yearwiseexpensecol,
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
            var typecolumn = '';
            if (type.toLowerCase() == 'budget') {
                typecolumn = $grid.jqGrid('getCol', 'Budget')
            }
            else {
                typecolumn = $grid.jqGrid('getCol', 'Expense')

            }
            var total = 0
            $.each(typecolumn, function (i, obj) {
                if (obj != '' && obj != null) {
                    total = total + parseFloat(obj.replace(/,/g, ''));
                }
            });
            $grid.jqGrid('footerData', 'set', { 'Department': "Total" });
            $grid.jqGrid('footerData', 'set', { 'Category': "" });
            if (type.toLowerCase() == 'budget') {
                $grid.jqGrid('footerData', 'set', { 'Budget': total.toFixed(2) });

            }
            else {
                $grid.jqGrid('footerData', 'set', { 'Expense': total.toFixed(2) });

            }
        }
    });
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
        var Type = type;
        var Year = year;
        $.ajax({
            type: "GET",
            url: ROOT + "ProjectMaster/GetBudgetAndExpenseBasedOnYear",
            data:
            {
                Project: project, Year: year, Type: type
            },
            dataType: "JSON",
            success: function (response) {
                $("#showYearWiseBudget").modal("show");
                $.jgrid.gridUnload('#YearWiseIndividualbudget');
                createYearWiseDataGrid(response, Type);
                $(".project_data").text($('.projname').text());
                $('.year_data').text(Year);

                $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
                $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
                var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
                if ($TableHeight > 128) {
                    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                    $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "17px");
                }
                else {
                    $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "0px");
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
}


$("#DepartmentBudgetDownload").click(function () {
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


colmod = [

    {
        name: "ProjectId",
        label: "Project ID",
        width: 60,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: "IspaceBudget",
        label: "iSpace Budget (INR)",
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget
            }
            else {
                return ''
            }
        }
        
    },
    {
        name: "SAPBuget",
        label: "SAP Budget (INR)",
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget
            }
            else {
                return ''
            }
        }
    },
    {
        name: "Balance",
        label: "Difference (INR)",
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            var value = rowobject.IspaceBudget - rowobject.SAPBuget
            if (value != "" && value != undefined && value != null && value != 0) {
                var Budget = parseFloat(value).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget
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
],

$("#SAPDifferenceProjects").jqGrid({
    url: '',
    datatype: 'local',
    width: 500,
    data: [],
    mtype: 'GET',
    colModel: colmod,
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
$("#SAPDifferenceProjects").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$(".Syncdifferent").on("click", function () {
    $.ajax({
        type: "GET",
        url: ROOT + "ProjectMaster/GetSAPdifferenceProjectDetails",
        data: {},
       dataType: "JSON",
        success: function (response) {
            $("#ShowDifference").modal("show");
            $("#SAPDifferenceProjects").jqGrid("clearGridData");
            $("#SAPDifferenceProjects").jqGrid('setGridParam', { data: response });
            $("#SAPDifferenceProjects").trigger('reloadGrid', [{ page: 1 }]);
        },
        error: function () {
            alert("Error occured!!");
        }
    });
})
function LinkToReport(ProjectId) {
    window.open(ROOT + 'ProjectBudgetReport/ProjectBudgetPBReport' + '?q=' + Encrypt("projectId=" + ProjectId), '_blank');
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

$('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 128) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}

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
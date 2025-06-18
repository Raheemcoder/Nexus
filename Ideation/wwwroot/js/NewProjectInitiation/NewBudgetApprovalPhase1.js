$(document).ready(function () {
    getProjectslist();
});

$('[data-singleselect]').select2();
$('.data-singleselect').select2();

function getProjectslist() {
    var status = $(".status").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetBudgetPendingList",
        dataType: "json",
        data: { Status: status },
        success: function (result) {
            createJQGrid(result);
        }
    });
}
var colmodels = [
{
        name: 'ProductName',
        label: 'Project Id',
        width: 170,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {

            var isDeptPending = rowobject.ReqPendDeptName != "" ? "y" : "n";

            return '<div class="d-flex action_icons align-items-center" title="">' +
                '<a href="' + ROOT + 'NewProjectInitiation/BaseLineBudgetApprovalPhase1?q=' + Encrypt('ProjectId=' + rowobject.ProjectId + "&BudgetType=" + rowobject.BudgetType + "&PendingDeptFlag=" + isDeptPending) + '" class="text-info color-blue" title="">' + cellvalue + '</a>' +
                '</div>';
        }
    },
    {
        name: 'ProductName',
        label: 'Project Id',
        width: 170,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        hidden: true
    },
    {
        name: 'ProjectId',
        label: 'ProjectId',
        width: 120,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 170,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            var departmentNames = cellvalue?.split(',');

            var uniqueDepartments = new Set();
            for (var i = 0; i < departmentNames?.length; i++) {
                uniqueDepartments.add(departmentNames[i].trim());
            }
            var uniqueDepartmentString = Array.from(uniqueDepartments).join(', ');
            return uniqueDepartmentString;
        }
    },
    {
        name: 'ReqPendDeptCount',
        label: 'No. of Pending Departments for baseline budget request',
        width: 80,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<span title="${rowobject.ReqPendDeptName}">${cellvalue}</span>`
        }
    },
    {
        name: 'NoOfPendingRequest',
        label: 'No. Of Pending Request',
        width: 80,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'PendingBudget',
        label: 'Pending Budget',
        width: 80,
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
        name: 'TotalBudget',
        label: 'Total Budget',
        width: 80,
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
        name: 'BudgetType',
        label: 'BudgetType',
        width: 120,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    }
];
function createJQGrid(result) {
    $.jgrid.gridUnload('#BudgetRequest');
    $("#BudgetRequest").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#BudgetRequest_pager',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#BudgetRequest tbody tr");
            var objHeader = $("#BudgetRequest tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

    $('#BudgetRequest').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-200px + 100vh)' });
    $('#BudgetRequest').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#BudgetRequest').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#BudgetRequest').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#BudgetRequest').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#BudgetRequest').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#BudgetRequest").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}

$(document).on('change', '.status', function () {
    getProjectslist();
});

$(document).on('click', '#ExcelDownload', function () {
    var data = $('#BudgetRequest').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#BudgetRequest").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "Budget Approval List.xlsx",
            maxlength: 1000,
        });
    }
});

$(document).ready(function () {
    GetL2ApprovalData();
})

$('.data-singleselect').select2();
$('[data-singleselect]').select2();

function GetL2ApprovalData() {
    var status = $(".status").val();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetL2ApprovalList",
        dataType: "json",
        data: { Status:status },
        success: function (result) {
            $("#L2BudgetGrid").jqGrid("clearGridData");
            $("#L2BudgetGrid").jqGrid('setGridParam', { data: result });
            $("#L2BudgetGrid").trigger('reloadGrid', [{ page: 1 }]);
        }
    })
}


colmodels = [

    {
        name: 'ProductName',
        label: 'Project ID',
        width: 200,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex action_icons align-items-center l2budget_ Project_Id_col" title="' + cellvalue + '">' +
                '<a href="' + ROOT + 'ProjectMaster/BaseLineBudgetApprovalPhase2?q=' + Encrypt('ProjectId=' + rowobject.ProjectId) + '" class="text-info color-blue" title="' + cellvalue + '">' + cellvalue + '</a>' +
                '</div>';
        }
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
        name: 'ReqBaselineBudget',
        label: 'Req Baseline Budget',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'AppBaselineBudget',
        label: 'L1 Approved Baseline Budget',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'L2PendingBaselineBudget',
        label: 'L2 Pending Baseline Budget',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return '<a class="task_status value_info "> <span class="text-warning">' + Budget + '</span></a>'
            }
            else {
                return "";
            }
        }
    },
    {
        name: 'ReqAdditionalBudget',
        label: 'Req Additional Budget',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'AppAdditionalBudget',
        label: 'L1 Approved Additional Budget',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'L2PendingAdditionalBudget',
        label: 'L2 Pending Additional Budget',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return '<a class="task_status value_info "> <span class="text-warning">' + Budget + '</span></a>'
            }
            else {
                return "";
            }
        }
    },
],

    $("#L2BudgetGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_L2BudgetGrid',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#L2BudgetGrid tbody tr");
            var objHeader = $("#L2BudgetGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#L2BudgetGrid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 258) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
}

$(".status").on("change", function () {
    GetL2ApprovalData();
})



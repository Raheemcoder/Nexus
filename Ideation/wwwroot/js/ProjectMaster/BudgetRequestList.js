$(document).ready(function () {
    getProjectslist();
});

$('[data-singleselect]').select2()
$('.data-singleselect').select2()

colmodels = [

    {
        name: 'ProductName',
        label: 'Project ID',
        width: 200,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex action_icons align-items-center Project_Id_col" title="' + cellvalue + '">' +
                '<a class="text-info color-blue" title="' + cellvalue + '" style="white-space: wrap;" href="' + ROOT + 'ProjectMaster/ProjectBaselineBudget?q=' + Encrypt('ProjectId=' + rowobject.ProjectId) + '">' + cellvalue + '</a>'+ '</div>';
        }
    },
    {
        name: 'ProjectId',
        label: 'Project ID',
        width: 250,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'ReqBaselineBudget',
        label: 'Requested BaseLine Budget (INR)',
        width: 100,
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
        name: 'AppBaselineBudget',
        label: 'Approved BaseLine Budget (INR)',
        width: 100,
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
        name: 'ReqAdditionalBudget',
        label: 'Requested Additional Budget (INR)',
        width: 100,
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
        name: 'AppAdditionalBudget',
        label: 'Approved Additional Budget (INR)',
        width: 100,
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

$("#BudgetRequest").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_BudgetRequest',
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

$("#BudgetRequest").jqGrid('filterToolbar', {
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

function getProjectslist() {
    var status = $(".status").val();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetBudgetPlanningList",
        dataType: "json",
        data: { Status: status },
        success: function (result) {
            $("#BudgetRequest").jqGrid("clearGridData");
            $("#BudgetRequest").jqGrid('setGridParam', { data: result});
            $("#BudgetRequest").trigger('reloadGrid', [{ page: 1 }]);
        }
    })
}

$(".status").on("change", function () {
    getProjectslist();
})
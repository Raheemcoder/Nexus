$(document).ready(function () {
    getProjectslist();
});

$('[data-singleselect]').select2();
$('.data-singleselect').select2();

var colmodels = [
    {
        name: 'ProductName',
        label: 'Project Id',
        width: 200,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex action_icons align-items-center Project_Id_col" title="' + cellvalue + '">' +
                '<a class="text-info color-blue" title="' + cellvalue + '" style="white-space: wrap;" href="' + ROOT + 'NewProjectInitiation/ProjectBaselineBudget?q=' + Encrypt('ProjectId=' + rowobject.ProjectId) + '">' + cellvalue + '</a>' + '</div>';
        }
    },
    {
        name: 'ProjectId',
        label: 'Project Id',
        width: 250,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'ReqBaselineBudget',
        label: 'Requested Baseline Budget (INR)',
        width: 90,
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
        label: 'Approved Baseline Budget (INR)',
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


function getProjectslist() {
    var status = $(".status").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetBudgetPlanningList",
        dataType: "json",
        data: { Status: status },
        success: function (result) {
            createJQGrid(result);
        }
    });
}
$(".status").on("change", function () {
    getProjectslist();
});
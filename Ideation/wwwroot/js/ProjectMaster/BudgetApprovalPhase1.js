$(document).ready(function () {
    getProjectslist();
});

$('[data-singleselect]').select2()
$('.data-singleselect').select2()

function getProjectslist() {
    var status = $(".status").val();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetBudgetPendingList",
        dataType: "json",
        data: { Status: status },
        success: function (result) {
            $("#BudgetRequest").jqGrid("clearGridData");
            $("#BudgetRequest").jqGrid('setGridParam', { data: result });
            $("#BudgetRequest").trigger('reloadGrid', [{ page: 1 }]);
        }
    });
}

colmodels = [
    {
        name: 'ProductName',
        label: 'Project ID',
        width: 200,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex action_icons align-items-center Project_Id_col" title="' + cellvalue + '">' +
                '<a href="' + ROOT + 'ProjectMaster/BaseLineBudgetApprovalPhase1?q=' + Encrypt('ProjectId=' + rowobject.ProjectId + "&BudgetType=" + rowobject.BudgetType) + '" class="text-info color-blue" title="' + cellvalue + '">' + cellvalue + '</a>' +
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
        name: 'DepartmentName',
        label: 'Department',
        width: 120,
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
        name: 'NoOfPendingRequest',
        label: 'No. Of Pending Request',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BudgetType',
        label: 'BudgetType',
        width: 120,
        resizable: true,
        ignoreCase: true,
        hidden: true,
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

$(".status").on("change", function () {
    getProjectslist();
})
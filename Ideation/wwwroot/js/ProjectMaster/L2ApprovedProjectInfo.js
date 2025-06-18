
$(document).ready(function () {

    getL2ApprovalInfo();

})

var DepartmentsBudget = [];
function getL2ApprovalInfo() {

    var projectId = $("#ProjectId").val();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetL2ApprovalProjectInfo",
        dataType: "json",
        data: { ProjectId: projectId },
        success: function (result) {

            $(".projectName").text(result.BudgetProjectData[0].ProductName)

            var BaselineBudget = result.BudgetProjectData[0].ApprovedBaselinebudget != null ? parseInt(result.BudgetProjectData[0].ApprovedBaselinebudget) : 0;
            var AdditionalBudget = result.BudgetProjectData[0].ApprovedAdditionalbudget != null ? parseInt(result.BudgetProjectData[0].ApprovedAdditionalbudget) : 0;
            $(".ApprovedBaselineBudget").text(BaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
            $(".ApprovedAdditionalBudget").text(AdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))

            $(".TotalBudget").text((BaselineBudget + AdditionalBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 }));

            var count = 0;
            DepartmentsBudget = result.CategoryValue;
            //$.each(result.CategoryValue, function (i, obj) {
            //    if (obj.CategoryName != null) {
            //        var budget = parseInt(obj.value).toLocaleString("en-IN", { maximumFractionDigits: 0 });
            //        var categoryList = '<li><b> ' + obj.CategoryName + ':</b> <i class="fas fa-inr"></i> ' + budget + '</li>';
            //        $(".categoriesandvalues").append(categoryList);
            //        count++
            //    }
            //})
            count == 0 ? $(".hideBar").hide() : $(".hideBar").show();
            $("#Info").jqGrid("clearGridData");
            $("#Info").jqGrid('setGridParam', { data: result.BudgetPlan });
            $("#Info").trigger('reloadGrid', [{ page: 1 }]);

        }
    })
}

colmodels = [
    {
        name: 'Year',
        label: 'Year',
        width: 80,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Category',
        label: 'Category',
        width: 180,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 110,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.BudgetType == "Baseline") {
                return '<a class="value_info"> <span class="color-green_">' + cellvalue + '</span></a>';
            }
            else if (rowobject.BudgetType == "Additional") {
                return '<a class="value_info"> <span class="text-warning">' + cellvalue + '</span></a>';
            }
            else if (rowobject.BudgetType == "Transfer In" || rowobject.BudgetType == "Transfer Out") {
                return '<a class="value_info"> <span class="color-blue">' + cellvalue + '</span></a>';
            }
            else {
                return '';
            }
        }
    },
    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 110,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'RequestedBudget',
        label: 'Req Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != null && cellvalue != undefined) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'L1ApprovedBudget',
        label: 'L1 Approved Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != null && cellvalue != undefined) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'L2ApprovedBudget',
        label: 'L2 Approved Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != null) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Status',
        label: 'Status',
        width: 170,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.Status == "L2 Approval Pending") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "L1 Approved") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "L2 Approved" || rowobject.Status == "SAP Posting Sucessfully") {
                return '<a class="task_status value_info "> <span class="text-success">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "L1 Approval Pending") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "Pending For L1 Approval") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "Rejected" || rowobject.Status == "SAP Failed") {
                return '<a class="task_status value_info "> <span class="text-danger">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "Waiting for SAP Posting" || rowobject.Status == "SAP In Progress") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "") {
                return "";
            }
            else
            {
                return rowobject.Status
            }
        }
    },
    {
        name: 'Status',
        label: 'Status',
        width: 170,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,

    },
    {
        name: 'CreatedBy',
        label: 'Requested By',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedDate',
        label: 'Requested On',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Requested Remarks',
        width: 180,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'L1ActionBy',
        label: 'L1 Approved By',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'L1ActionOn',
        label: 'L1 Approved On',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'L1ApprovedRemarks',
        label: 'L1 Approved Remarks',
        width: 180,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'L2ActionBy',
        label: 'L2 Approved By',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'L2ActionOn',
        label: 'L2 Approved On',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'L2ApprovedRemarks',
        label: 'L2 Approved Remarks',
        width: 180,
        resizable: true,
        ignoreCase: true,
    },
],

    $("#Info").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#Info_pager',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Info tbody tr");
            var objHeader = $("#Info tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        },
    });
$("#Info").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-280px + 100vh)' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 258) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
}

function BackButton() {
    var projectId = $("#ProjectId").val();
    window.location.href = ROOT + "ProjectMaster/BaseLineBudgetApprovalPhase2" + '?q=' + Encrypt("ProjectId=" + projectId);
}
$("#ExcelDownload").click(function () {
    var data = $('#Info').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#Info").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "BudgetInfo.xlsx",
            maxlength: 1000,

        });
    }
});

$(".GetDepartmentBudgets").on("click", function () {
   
    $("#ShowDepartmentList").modal("show");
    $("#DepartmentBudget").jqGrid("clearGridData");
    $("#DepartmentBudget").jqGrid('setGridParam', { data: DepartmentsBudget });
    $("#DepartmentBudget").trigger('reloadGrid', [{ page: 1 }]);


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
});

colModel = [
   {
        name: 'CategoryName',
        label: 'Department',
        width: 180,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'value',
        label: 'Total Budget',
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
],

    $("#DepartmentBudget").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colModel,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_DepartmentBudget',
        rowNum: 1000,
        scroll: 1,
        footerrow: true,

        gridComplete: function () {
            var objRows = $("#DepartmentBudget tbody tr");
            var objHeader = $("#DepartmentBudget tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#DepartmentBudget');
            var typecolumn= $grid.jqGrid('getCol', 'value')
            var total = 0
            $.each(typecolumn, function (i, obj) {
                if (obj != '' && obj != null) {
                    total = total + parseFloat(obj.replace(/,/g, ''));
                }
            });
            $grid.jqGrid('footerData', 'set', { 'CategoryName': "Total" });
            $grid.jqGrid('footerData', 'set', { 'value': total.toFixed(2) });
        }
    });
$("#DepartmentBudget").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$(document).on("click", "#DepartmentExcelDownload", function () {
    var data = $('#DepartmentBudget').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#DepartmentBudget").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "DepartmentWiseBudget.xlsx",
            maxlength: 1000,
        });
    }
});
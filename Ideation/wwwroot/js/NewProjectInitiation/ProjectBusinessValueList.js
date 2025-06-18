var previousRowSpanPrjId = "";
var gridDataBusinessList = [];
var previousRowSpanRowId = "";
var rowSpanCount = 0;

$(document).ready(function () {
    var projectId = $('#ProjectIdForBusiness').val()
    $("#prj-id").val(projectId).trigger('change');
    $("#search-btn").click();
    if (projectId == 'All') {
        $('#BackToBudgetApprove').hide();
    }
    else {
        $('#BackToBudgetApprove').show();

    }

});
$('#BackToBudgetApprove').on('click', function () {
    var projectId = $("#prj-id").val();
    window.location.href = ROOT + "NewProjectInitiation/BaseLineBudgetApprovalPhase1?projectId=" + projectId;
});
function arrtSetting_ProjectId(rowId, val, rawObject) {
    
    var result;
    var prjId = rawObject.ProjectId;

    if (previousRowSpanPrjId != prjId) {
        var filteredData = gridDataBusinessList.filter(function (obj) {
            return obj.ProjectId == prjId && obj.Product.trim().toLowerCase() === rawObject.Product.trim().toLowerCase();
        });
        rowSpanCount = CountOfRowSpan(filteredData);
        result = ' rowspan=' + '"' + rowSpanCount + '"';
        previousRowSpanRowId = rowId;
    }
    else if (previousRowSpanRowId == rowId) {
        result = ' rowspan=' + '"' + previousRowSpanCount + '"';
    }
    else {
        result = ' style="display:none"';
    }
    
    previousRowSpanPrjId = prjId;
    previousRowSpanCount = rowSpanCount;
    return result;

}
function CountOfRowSpan(new_data) {
    
    var grid_filtered_data = new_data;
    var colModel = $("#prj-budget-buss-list").jqGrid('getGridParam', 'colModel');

    var filteredColNames = colModel.filter(function (col) {
        return col.search === true;
    }).map(function (col) {
        return col.name;
    });

    $.each(filteredColNames, function (i, obj) {
        var value = $(".ui-search-input").closest('td').find("#gs_" + obj).val();
        if (!(value === "") || (value === null) || typeof (value) === "undefined") {
            grid_filtered_data = grid_filtered_data.filter(function (data) {
                return data[obj]?.toLowerCase().includes(value.toLowerCase());
            });
        }
    });

    return grid_filtered_data.length;

}

$(document).on('click', '#search-btn', function () {

    var projectId = $("#prj-id").val();
    if (projectId == 'All') {
        $('#BackToBudgetApprove').hide();
    }
    else {
        $('#BackToBudgetApprove').show();

    }
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/PBV_ProjectsDataList",
        data:
        {
            ProjectId: projectId
        },
        dataType: "JSON",
        success: function (response) {

            if (response) {
                gridDataBusinessList = response;
                CreateListJqgrid(response);
            }

        },
        error: function () {
            alert("Error occured!!");
        }
    });

});

$(document).on('click', '#refresh-btn', function () {

    $("#prj-id").val('All').change();
    $("#search-btn").click();

});


const colmodels = [
    {
        name: 'ProjectId',
        label: 'Project Id',
        width: 90,
        resizable: true,
        ignoreCase: true,
        cellattr: arrtSetting_ProjectId,
        sortable: false
    },
    {
        name: 'Product',
        label: 'Project Description',
        width: 160,
        resizable: true,
        ignoreCase: true,
        cellattr: arrtSetting_ProjectId,
        sortable: false
    },
    {
        name: 'ProjectBriefId',
        label: 'Project Brief Id',
        width: 70,
        resizable: true,
        ignoreCase: true,
        cellattr: arrtSetting_ProjectId,
        sortable: false
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'HUBName',
        label: 'HUB',
        width: 65,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'NPV',
        label: 'NPV',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'IRR',
        label: 'IRR',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'Y0Q',
        label: 'Y0 Qty',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'center'
    },
    {
        name: 'Y1Q',
        label: 'Y1 Qty',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'center'
    },
    {
        name: 'Y2Q',
        label: 'Y2 Qty',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'center'
    },
    {
        name: 'Y3Q',
        label: 'Y3 Qty',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'center'
    },
    {
        name: 'ProposedSellingPrice',
        label: 'PSP (Currency)',
        width: 70,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'right'
    },
    {
        name: 'Currency',
        label: 'Currency',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'center'
    },
    {
        name: 'SellingPriceUSD',
        label: 'PSP (USD)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'right'
    },
    {
        name: 'Y0V',
        label: '(Y0 Qty * PSP) Y0 Value (USD)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'right'
    },
    {
        name: 'Y1V',
        label: '(Y1 Qty * PSP) Y1 Value (USD)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'right'
    },
    {
        name: 'Y2V',
        label: '(Business Value = Y2 Qty * PSP) Y2 Value (USD)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'right'
    },
    {
        name: 'Y3V',
        label: '(Y3 Qty * PSP) Y3 Value (USD)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'right'
    },
    
    // hidden
    {
        name: 'UOM',
        label: 'UOM',
        width: 10,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        hidden: true,
        exportcol: false
    },
    {
        name: 'ProjectStartYear',
        label: 'Project Start Year',
        width: 60,
        resizable: true,
        ignoreCase: true,
        cellattr: arrtSetting_ProjectId,
        sortable: false
    },
    {
        name: 'ProjectStartYearSum',
        label: 'Project Start Year Requested Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        cellattr: arrtSetting_ProjectId,
        align: 'right'
    },
    // hidden
    {
        name: 'ProjectNextYear',
        label: 'Project Successive Year',
        width: 10,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        hidden: true,
        exportcol: false
    },
    {
        name: 'ProjectNextYearSum',
        label: 'Project Succ Year Requested Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        cellattr: arrtSetting_ProjectId,
        align: 'right'
    },
    {
        name: 'TotalBudgetRequested',
        label: 'Total Requested Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        cellattr: arrtSetting_ProjectId,
        align: 'right'
    },
    {
        name: 'TotalAllocatedBudget',
        label: 'Total Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        cellattr: arrtSetting_ProjectId,
        align: 'right'
    },
];

function CreateListJqgrid(data) {

    $.jgrid.gridUnload('#prj-budget-buss-list');

    $("#prj-budget-buss-list").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#prj-budget-buss-list-pager',
        rowNum: data.length,
        scroll: 1,
        footerrow: true,

        gridComplete: function () {
            previousRowSpanPrjId = ''
            previousRowSpanRowId=''
            var objRows = $("#prj-budget-buss-list tbody tr");
            var objHeader = $("#prj-budget-buss-list tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {

            var $grid = $('#prj-budget-buss-list');
            var Y0V = $grid.jqGrid('getCol', 'Y0V')
            var Y1V = $grid.jqGrid('getCol', 'Y1V')
            var Y2V = $grid.jqGrid('getCol', 'Y2V')
            var Y3V = $grid.jqGrid('getCol', 'Y3V')

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
            Y0V = MakeAsMoney(getTotal(Y0V));
            Y1V = MakeAsMoney(getTotal(Y1V));
            Y2V = MakeAsMoney(getTotal(Y2V));
            Y3V = MakeAsMoney(getTotal(Y3V));

            $grid.jqGrid('footerData', 'set', { 'Y0V': Y0V });
            $grid.jqGrid('footerData', 'set', { 'Y1V': Y1V });
            $grid.jqGrid('footerData', 'set', { 'Y2V': Y2V });
            $grid.jqGrid('footerData', 'set', { 'Y3V': Y3V });
            $grid.jqGrid('footerData', 'set', { 'ProjectId': "Total" });
        }
    });

    jQuery("#prj-budget-buss-list").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {
                startColumnName: 'SKU',
                numberOfColumns: 16,
                titleText: '<div class="text-center"><b>Business Information (USD)</b></div>'
            },
            {
                startColumnName: 'ProjectStartYear',
                numberOfColumns: 6,
                titleText: '<div class="text-center"><b>Requested Budget (INR)</b></div>'
            }
        ]
    });

    $("#prj-budget-buss-list").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-300px + 100vh)' });
    $("#prj-budget-buss-list").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $("#prj-budget-buss-list").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $("#prj-budget-buss-list").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#prj-budget-buss-list").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $("#prj-budget-buss-list").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#prj-budget-buss-list").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#prj-budget-buss-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    var grid = $('#prj-budget-buss-list');
    var gview = grid.closest('.ui-jqgrid-btable').parents(".ui-jqgrid-view");
    $("div.ui-jqgrid-sdiv", gview).after($("div.ui-jqgrid-bdiv", gview));
}

$(document).on('click', "#exceldownload", function () {

    var data = $('#prj-budget-buss-list').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#prj-budget-buss-list").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: false,
            includeFooter: true,
            exportcol: false,
            fileName: "ProjectBusinessValue.xlsx",
            maxlength: 100000,
        });
    }

});

function MakeAsMoney(number) {
    if (number != null && number != "" && number != undefined) {
        return parseFloat(number).toLocaleString('en-IN', { maximumFractionDigits: 0 })
    }
    else if (number == 0) {
        return '';
    }
    return "";
}
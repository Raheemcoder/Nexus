var oldRegion;
var data = [];
arrtSetting = function (rowId, val) {
    var result;
    if (oldRegion = undefined || oldRegion != val) {
        var regDataFilter = data.filter(function (obj) { return obj.Region === val });
        var count = regDataFilter.length;
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    oldRegion = val;
    return result;
};
var IngridentDetailColModels = [
    {
        name: 'RowNo',
        align: 'center',
        hidden: true
    },
    {

        name: 'Region',
        align: 'center',
        classes: 'trs',
        cellattr: arrtSetting,
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;
        }
    },
    {
        name: 'Category', classes: 'trs1',
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;

        }
    },
    {
        name: 'RegulatoryStatus',
        label: 'Regulatory<br>Status',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 80,
    },
    {
        name: 'CRemarks',
        label: 'Compliance Remarks',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 250,
    },
    {
        name: 'ImpactDates',
        label: 'Impact Dates',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 200,
        formatter: function (cell, formatterParams, onRendered) {
            if (!cell) {
                return '';
            }
            var dateParts = cell.split(' ')[0].split('/');
            var month = parseInt(dateParts[0]);
            var day = parseInt(dateParts[1]);
            var year = parseInt(dateParts[2]);
            var formattedDate = new Date(year, month - 1, day);
            return formattedDate.toLocaleDateString();
        }

    },
    {
        name: 'References',
        label: 'References',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 150,
    },
    {
        name: 'INCI',
        label: 'INCI',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 150,
        align: "right"
    },
];
$(document).ready(function () {
    $("#StatusId").val("111").trigger("change");
    GetSearchResult("", "", $("#StatusId").val())
});
function GetParticularIngredientData(Data) {
    var ingredientid = parseInt(Data.getAttribute("data-ingredientid"));
    var ingredientname = Data.getAttribute("data-ingredientname");
    var synonym = Data.getAttribute("data-synonyms");
    if (synonym === 'null') {
        synonym = "";
    }
    var casno = Data.getAttribute("data-casno");
    var functionname = Data.getAttribute("data-function");
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetIngredientsRegulationById",
        data:
        {
            IngredientId: ingredientid
        },
        dataType: "JSON",
        success: function (response) {
            //$('#loader').css('visibility', 'visible');
            $("#IngredientViewModal1").modal("show");
            $.jgrid.gridUnload('#viewlist');
            createModalGrid_modal(JSON.parse(response));
            $("#ActiveIngredientName").text(ingredientname);
            $("#ActiveSynonymName").text(synonym);
            $("#ActiveCASName").text(casno);
            $("#ActiveFunctions").text(functionname);

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
function createModalGrid_modal(data) {
    $("#compliance_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: IngridentDetailColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#compliance_pager',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#compliance_grid tbody tr");
            var objHeader = $("#compliance_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }


    });
    $("#compliance_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '80vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

}
function UsageStatusWithComments(cellvalue) {

    if (cellvalue != null) {
        var color = "";
        var text = "";
        color = color + cellvalue;
        if (color == 'Blue') {
            return `<span><span class="pe-2"><i class="blue_circle"></i></span>` + text + `</span>`;
        }
        else if (color == 'Green') {
            return `<span><span class="pe-2"><i class="green_circle"></i></span>` + text + `</span>`;
        }
        else if (color == 'Yellow') {
            return `<span><span class="pe-2"><i class="yellow_circle"></i></span>` + text + `</span>`;
        }
        else if (color == 'Red') {
            return `<span><span class="pe-2"><i class="red_circle"></i></span>` + text + `</span>`;
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
}
function Get_UpdateIngredient(IngredientData) {
    var ingredientname = IngredientData.getAttribute("data-IngredientName");
    $('#IngredientName_valid').addClass("_hide");
    $('#CASNumber_valid').addClass("_hide");
    if (!(ingredientname === null || ingredientname === "" || typeof (ingredientname) === "undefined")) {
        $("#title").text("Edit Ingredient");

        $.ajax({
            url: ROOT + 'NewRID/AddIngredient',
            data: { IngredientName: ingredientname },
            type: 'GET',
            success: function (result) {
                //$('#loader').css('visibility', 'visible');
                data = JSON.parse(result);
                $("#IngredientName").val(data[0].ingredientname);
                $("#CASNumber").val(data[0].casno);
                $("#FunctionId").val(data[0].functionname).trigger("change");
                $("#IngredientName").attr('disabled', true)
                $("#CASNumber").attr('disabled', true)
            }
        });

    }
    else {
        $("#title").text("Add Ingredient");
        $("#IngredientName").val("");
        $("#CASNumber").val("");
        $("#FunctionId").val("").trigger("change");

        $("#IngredientName").attr('disabled', false)
        $("#CASNumber").attr('disabled', false)

    }
}

var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 1));
$('[data-datepicker-startdate]').datepicker({
    format: 'dd/mm/yyyy',
    //startDate: start,
    endDate: end,
    autoclose: true
}).on('changeDate', function () {
    $('[data-datepicker-enddate]').datepicker('setStartDate', $(this).val());
    //$('[data-datepicker-enddate]').datepicker('setDate', $(this).val());
});
$('[data-datepicker-enddate]').datepicker({
    format: 'dd/mm/yyyy',
    startDate: start,
    endDate: end,
    autoclose: true
    // update "StartDate" defaults whenever "EndDate" changes
}).on('changeDate', function () {
    $('[data-datepicker-startdate]').datepicker('setEndDate', $(this).val());
});
var isValidStartDateFlag = 1;
var isValidEndDateFlag = 1;

$('#Search_Start_Date').on("change", function (event) {

    var startDate = $('#Search_Start_Date').val();
    if (startDate.length > 10 || startDate.length < 10) {
        $('#Err_Search_Start_Date').show();
        isValidStartDateFlag = 0;
    }
    else {
        $('#Err_Search_Start_Date').hide();
        isValidStartDateFlag = 1;
    }
});

$('#Search_End_Date').on("change", function (event) {

    var endDate = $('#Search_End_Date').val();
    if (endDate.length > 10 || endDate.length < 10) {
        $('#Err_Search_End_Date').show();
        isValidEndDateFlag = 0;
    }
    else {
        $('#Err_Search_End_Date').hide();
        isValidEndDateFlag = 1;
    }
});

$('#search_ingredient').on('click', function () {
    getDate();
});

function getDate() {
    if (isValidEndDateFlag == 1 && isValidStartDateFlag == 1) {
        var startDate = $('[data-datepicker-startdate]').datepicker('getDate');
        var endDate = $('[data-datepicker-enddate]').datepicker('getDate');
        var status = $("#StatusId").val();


        if (startDate == null && endDate == null && status == "") {

            alert("There is no data to search");

        }
        else {
            if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (status != undefined && status != null && status != "")
            ) {

                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                GetSearchResult(formattedStartDate, formattedEndDate, status);

            }
            else if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (status == undefined || status == null || status == "")
            ) {
                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                GetSearchResult(formattedStartDate, formattedEndDate, '');
            }

            else if (
                (startDate == undefined || startDate == null || startDate == "") &&
                (endDate == undefined || endDate == null || endDate == "") &&
                (status != undefined && status != null && status != "")
            ) {
                GetSearchResult('', '', status);
            }
            else if (
                
                ((startDate != undefined && startDate != null && startDate != "") &&
                    (endDate == undefined || endDate == null || endDate == "")) ||
                ((startDate == undefined || startDate == null || startDate == "") &&
                    (endDate != undefined && endDate != null && endDate != ""))
            ) {
                alert("Please select both start date and end date for search");
            }
            else {
                alert("There is no data to search");
            }
        }
    }
    else {
        alert('Please select a valid date');
    }
}
function FormateDateForSearch(DateToFormat) {

    var date = DateToFormat.getDate();
    var month = DateToFormat.getMonth() + 1;

    date = (date < 10 ? '0' : '') + date;
    month = (month < 10 ? '0' : '') + month;

    var formattedDate = DateToFormat.getFullYear() + '-' + month + '-' + date;
    return formattedDate;
}

$('#refresh_date').on('click', function () {

    $('[data-datepicker-startdate]').datepicker('destroy');
    $('[data-datepicker-startdate]').val('');
    $('[data-datepicker-startdate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true
        }
    );

    $('[data-datepicker-enddate]').datepicker('destroy');
    $('[data-datepicker-enddate]').val('');
    $('[data-datepicker-enddate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true
        }
    );
    $("#StatusId").val('111').trigger('change');

    GetSearchResult('', '', '111');

});

function GetSearchResult(formattedStartDate, formattedEndDate, status) {
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetIngredientBasedOnSearchRegulation",
        data: {
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            Status: status
        },
        dataType: "JSON",
        success: function (response) {
            debugger;
            $.jgrid.gridUnload('#compliance_grid');
            createMainGrid(JSON.parse(response));

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

functionAttrSetting = function (rowId, val) {
    var result = "";
    if (val.length > 200) {
        result = 'style="white-space:nowrap !important;"';
    }
    else {
        result = "";
    }
    return result;
};

function createMainGrid(data) {
    jQuery("#compliance_grid").jqGrid({

        datatype: 'local',
        data: data,
        colModel: [
            {
                name: 'Action',
                label: 'Action',
                width: 20,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    var html = '<div style="text-align:center;">';

                    if (rowobject.Status == "Open") {
                        html += '<a href="' + ROOT + 'NewRID/AddIngredientRequest?q=' + Encrypt('ingredientId=' + rowobject.IngredientReqId) + '" class="edit-color" title="Edit" data-IngredientName="' + rowobject.IngredientName + '" data-Casno="' + rowobject.CASNumber + '" data-Region="' + rowobject.Region + '" data-function="' + rowobject.FunctionName + '">' +

                            '<i class="fas fa-pen""></i>' +
                            '</a>';

                    }
                    else {
                        html = '';
                    }



                    return html;
                },
                search: false



            },
            {
                name: 'IngredientName',
                label: 'Ingredient Name',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 200,


            },

            {
                name: 'CASNumber',
                label: 'CAS Number',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 90,
            },

            {
                name: 'FunctionName',
                label: 'Functions',
                width: 330,
                resizable: true,
                search: true,
                ignorecase: true,
                cellattr: functionAttrSetting,
            },
            {
                name: 'Region',
                label: 'Region',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 150,



            },
            {
                name: 'Status',
                label: 'Status',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 90,
                search: true


            },
            {
                name: 'CreatedBy',
                label: 'Requested By',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 150,


            },
            {
                name: 'CreatedDate',
                label: 'Requested Date',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 100,

            },



        ],
        loadonce: true,
        pager: "#compliance_pager",
        viewrecords: true,
        ignoreCase: true,
        rowNum:20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ingredient tbody tr");
            var objHeader = $("#ingredient tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }

    });
    $("#compliance_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '59vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'max-height': 'calc(100vh - 280px )' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
    $('#compliance_grid').closest("#gview_rideditview").css({ 'z-index': '0' });
}
function getDateForExcel(formattedStartDate, formattedEndDate) {
    var isValid = true;
    var status = $("#StatusId").val();
    var data = $('#compliance_grid').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewRID/GetComplianceRequestExcelData?StartDate=" + formattedStartDate + "&&EndDate=" + formattedEndDate + "&Status=" + status;
    }
}
$("#exceldownload").on('click', function () {
    if (isValidEndDateFlag == 1 && isValidStartDateFlag == 1) {
        var startDate = $('[data-datepicker-startdate]').datepicker('getDate');
        var endDate = $('[data-datepicker-enddate]').datepicker('getDate');
        var status = $("#StatusId").val();


        if (startDate == null && endDate == null && status == "") {

            alert("There is no data to search");

        }
        else {
            if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (status != undefined && status != null && status != "")
            ) {

                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);


                getDateForExcel(formattedStartDate, formattedEndDate);
            }
            else if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (status == undefined || status == null || status == "")
            ) {
                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                getDateForExcel(formattedStartDate, formattedEndDate)
            }

            else if (
                (startDate == undefined || startDate == null || startDate == "") &&
                (endDate == undefined || endDate == null || endDate == "") &&
                (status != undefined && status != null && status != "")
            ) {
                getDateForExcel('', '');
            }
            else if (
                
                ((startDate != undefined && startDate != null && startDate != "") &&
                    (endDate == undefined || endDate == null || endDate == "")) ||
                ((startDate == undefined || startDate == null || startDate == "") &&
                    (endDate != undefined && endDate != null && endDate != ""))
            ) {
                alert("Please select both start date and end date for search");
            }
            else {
                alert("There is no data to search");
            }
        }
    }
    else {
        alert('Please select a valid date');
    }
});
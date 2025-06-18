var oldRegion = "";
var data = [];
var DivisionBasedIngredientList = [];
/*var ComplianceRequestList = [];*/
var ingredientNames = [];
var CASNumbers = [];

$(document).ready(function () {

    var start = new Date();
    var end = new Date(new Date().setYear(start.getFullYear() + 1));

    $('[data-datepicker-startdate]').datepicker({
        format: 'dd/mm/yyyy',
        endDate: end,
        autoclose: true
    }).on('changeDate', function () {
        $('[data-datepicker-enddate]').datepicker('setStartDate', $(this).val());
    });

    $('[data-datepicker-enddate]').datepicker({
        format: 'dd/mm/yyyy',
        startDate: start,
        endDate: end,
        autoclose: true
    });

    var IngredientListGridData = $('#DivisionBasedIngredientListJson').val();
    if (IngredientListGridData != undefined && IngredientListGridData != null && IngredientListGridData != "") {
        DivisionBasedIngredientList = $.parseJSON(IngredientListGridData);
    }

    //var ComplianceRequestListData = $('#ComplianceRequestListJson').val();
    //if (ComplianceRequestListData != undefined && ComplianceRequestListData != null && ComplianceRequestListData != "") {
    //    ComplianceRequestList = $.parseJSON(ComplianceRequestListData);
    //}

    ingredientNames = JSON.parse($("#IngredientNameList").val());
    CASNumbers = JSON.parse($("#CASNumberList").val());
    IngridentListColModels = [
        {
            name: 'IsEdited',
            label: 'IsEdited',
            resizable: true,
            ignoreCase: true,
            hidden: true,
            cellattr: add_color,
        },
        {
            name: 'IngredientName',
            label: 'Ingredient Name',
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return '<a href="javascript:void(0)" class="rid_" data-target="#ParticularIngredientModal" data-ingredientid="' + rowobject.IngredientId + '" data-ingredientname="' + rowobject.IngredientName + '"  data-synonyms="' + rowobject.Synonyms + '" data-casno = "' + rowobject.CASNumber + '" data-function = "' + rowobject.FunctionName + '" onclick="GetParticularIngredientData(this)">' + cellvalue + '</a>';
            }
        },
        {
            name: 'Synonyms',
            label: 'Synonyms',
            resizable: true,
            ignoreCase: true,
            index: 'Synonyms',
        },
        {
            name: 'CASNumber',
            label: 'CAS Number',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'FunctionName',
            label: 'Functions',
            resizable: true,
            ignorecase: true,
            cellattr: functionAttrSetting,
        },
        {
            name: 'AdultLeaveOn',
            label: 'Adult - Leave On',
            resizable: true,
            ignorecase: true,
            width: 100,
            align: 'center',
            index: 'AdultLeaveOn',
            formatter: function (cellvalue, options, rowobject) {
                var result = UsageStatus(cellvalue);
                return result;
            }
        },
        {
            name: 'AdultRinseOff',
            label: 'Adult - Rinse Off',
            resizable: true,
            ignorecase: true,
            width: 100,
            align: 'center',
            index: 'AdultRinseOff',
            formatter: function (cellvalue, options, rowobject) {
                var result = UsageStatus(cellvalue);
                return result;
            }
        },
        {
            name: 'BabyLeaveOn',
            label: 'Baby - Leave On',
            resizable: true,
            ignorecase: true,
            width: 100,
            align: 'center',
            index: 'BabyLeaveOn',
            formatter: function (cellvalue, options, rowobject) {
                var result = UsageStatus(cellvalue);
                return result;
            }
        },
        {
            name: 'BabyRinseOff',
            label: 'Baby - Rinse Off',
            resizable: true,
            ignorecase: true,
            width: 100,
            align: 'center',
            index: 'BabyRinseOff',
            formatter: function (cellvalue, options, rowobject) {
                var result = UsageStatus(cellvalue);
                return result;
            }
        },
        {
            name: 'LastUpdatedDate',
            label: 'Last Updated Date',
            width: 100,
            resizable: true,
            ignorecase: true,
            sorttype: 'date',
            formatter: 'date',
            formatoptions: { newformat: 'd/m/Y' },
            searchoptions: {
                sopt: ['eq'],
                dataInit: function (e) {
                    $(e).datepicker({
                        format: 'dd/mm/yyyy',
                        autoclose: true
                    }).change(function () {
                        $('#IngredientListGrid')[0].triggerToolbar();
                    });

                }
            }
        },
    ],

        $("#IngredientListGrid").jqGrid({
            url: '',
            datatype: 'local',
            data: DivisionBasedIngredientList.length > 0 ? DivisionBasedIngredientList : [],
            mtype: 'GET',
            colModel: IngridentListColModels,
            loadonce: true,
            viewrecords: true,
            pager: '#IngredientListGrid_Pager',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#IngredientListGrid tbody tr");
                var objHeader = $("#IngredientListGrid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

                $(".add-edited-color").siblings("td").addClass("add-edited-color");
                $(".add-rollback-color").siblings("td").addClass("add-rollback-color");

            }

        });

    $("#IngredientListGrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    jQuery("#IngredientListGrid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {
                startColumnName: 'AdultLeaveOn',
                numberOfColumns: 4,
                titleText: '<div id="Usage" class="text-center">Usage</div>',
                index: 'Usage',
                name: 'Usage',
            }
        ]
    });

    $('#Usage').closest('th').addClass('testing');
    $('#IngredientListGrid').closest('.jqg-first-row-header').hide();
    $('#IngredientListGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 290px )' });
    $('#IngredientListGrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#IngredientListGrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#IngredientListGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#IngredientListGrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#IngredientListGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#IngredientListGrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
    $('#IngredientListGrid').closest("#gview_IngredientListGrid").css({ 'z-index': '0' });

});
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
arrtSetting = function (rowId, val) {
    var result;
    if (oldRegion === '' || oldRegion != val) {
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
add_color = function (rowId, val, rowobject) {
    var result = "";
    if (rowobject.IsEdited == 1 || rowobject.IsEdited == 2) {
        result = 'class="add-edited-color"';
    }
    return result;
};
function UsageStatus(cellvalue) {

    if (cellvalue != null) {

        if (cellvalue == 'Red') {
            return '<span class="red_circle"></span>';
        }
        else if (cellvalue == 'Blue') {
            return '<span class="purple_circle"></span>';
        }
        else if (cellvalue == 'Yellow') {
            return '<span class="yellow_circle"></span>';
        }
        else if (cellvalue == 'Green') {
            return '<span class="green_circle"></span>';
        }
    }
    else {
        return "";
    }

}

function ExcelDownload(formattedStartDate, formattedEndDate, searchedText) {

    var isValid = true;
    var data = $('#IngredientListGrid').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewRID/DownloadRIDCosmeticsExcel?StartDate=" + formattedStartDate + "&&EndDate=" + formattedEndDate + "&searchText=" + searchedText;
    }
}
$("#excel-download").on('click', function () {

    var startDate = $('[data-datepicker-startdate]').datepicker('getDate');
    var endDate = $('[data-datepicker-enddate]').datepicker('getDate');
    var searchedText = $("#global_search").val().trim();

    if (
        (startDate != undefined && startDate != null && startDate != "") &&
        (endDate != undefined && endDate != null && endDate != "") &&
        (searchedText != undefined && searchedText != null && searchedText != "")
    ) {

        var formattedStartDate = FormateDateForSearch(startDate);
        var formattedEndDate = FormateDateForSearch(endDate);

        ExcelDownload(formattedStartDate, formattedEndDate, searchedText);
    }
    else if (
        (startDate != undefined && startDate != null && startDate != "") &&
        (endDate != undefined && endDate != null && endDate != "") &&
        (searchedText == undefined || searchedText == null || searchedText == "")
    ) {
        var formattedStartDate = FormateDateForSearch(startDate);
        var formattedEndDate = FormateDateForSearch(endDate);

        ExcelDownload(formattedStartDate, formattedEndDate, '');
    }

    else if (
        (startDate == undefined || startDate == null || startDate == "") &&
        (endDate == undefined || endDate == null || endDate == "")
    ) {
        ExcelDownload('', '', searchedText);
    }
    else {
        ExcelDownload('', '', '')
    }

});

//-----------------------------------------------------------Particular Ingrident Details Jqgrid

var IngridentColModels = [
    {
        name: 'RowNo',
        align: 'center',
        sortable: false,
        hidden: true
    },
    {
        name: 'Region',
        align: 'center',
        classes: 'trs',
        width: 80,
        sortable: false,
        cellattr: arrtSetting,
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;
        }
    },
    {
        name: 'Category',
        classes: 'trs1',
        width: 80,
        sortable: false,
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
        sortable: false,
        width: 80,
        hidden: true,

        formatter: function (cellvalue, options, rowobject) {
            var result = UsageStatusWithCommentsForPopup(cellvalue);
            return result;
        }
    },
    {
        name: 'CRemarks',
        label: 'Compliance Remarks',
        resizable: true,
        ignoreCase: true,
        search: true,
        sortable: false,
        width: 250,
        //classes:'word-break-td'
        formatter:  function(cellvalue, options, rowobject) {
            if (cellvalue != null && cellvalue.length > 0) {
                var charCount = cellvalue.length;
                var rows = Math.ceil(charCount / 100) + 1;
                return `<textarea class="form-control date_text_freezed" rows="${rows}" readonly>${cellvalue}</textarea>`;
            }
            return '';
        }
    },
    {
        name: 'ImpactDates',
        label: 'Impact Date',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        search: true,
        width: 80,
    },
    {
        name: 'References',
        label: 'References',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        search: true,
        width: 120,
    },
    {
        name: 'ReferenceDoc',
        label: 'Reference Doc',
        align: 'center',
        sortable: false,
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 80,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsFileExists == true) {
                return '<a href="javascript: void(0);" class="grid-icon-only approveicon" onclick="ViewUploadedFiles(' + rowobject.RegionId + ',' + rowobject.CategoryId + ')" class="icon_color text-success btn_button" title="view"><i class="fas fa-eye"></i></a>';

            }
            else {
                return '';
            }
        }

    },
];
function GetParticularIngredientData(Data) {

    var ingredientid = Data.getAttribute("data-ingredientid");
    var ingredientname = Data.getAttribute("data-ingredientname");
    var synonym = Data.getAttribute("data-synonyms");
    if (synonym === 'null') {
        synonym = "";
    }
    var casno = Data.getAttribute("data-casno");
    if (casno === 'null') {
        casno = "";
    }
    var functionname = Data.getAttribute("data-function");
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetIngredientsRegulationById",
        data: {
            IngredientId: ingredientid
        },
        dataType: "JSON",
        success: function (response) {

            $("#ParticularIngredientModal").modal("show");
            $.jgrid.gridUnload('#particular-ingredient-details');
            data = JSON.parse(response);
            createModalGrid();
            $("#ActiveIngredientName").text(ingredientname);
            $("#ActiveSynonymName").text(synonym);
            $("#ActiveCASName").text(casno);
            $("#ActiveFunctions").text(functionname);
            $("#IngredientId").val(ingredientid);

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
function createModalGrid() {

    oldRegion = '';
    $("#particular-ingredient-details").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: IngridentColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#particular-ingredient-details-pager',
        rowNum: data.length,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#particular-ingredient-details tbody tr");
            var objHeader = $("#particular-ingredient-details tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#particular-ingredient-details').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 280px )' });
    $('#particular-ingredient-details').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#particular-ingredient-details').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#particular-ingredient-details').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#particular-ingredient-details').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#particular-ingredient-details').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#particular-ingredient-details').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

}
function ViewUploadedFiles(region, category) {
    var ingredientId = parseInt($("#IngredientId").val());
    $.ajax({
        url: ROOT + 'NewRID/DisplayUploadedFiles',
        type: 'POST',
        dataType: 'JSON',
        data: { IngredientId: ingredientId, RegionId: region, CategoryId: category },

        success: function (result) {

            $.jgrid.gridUnload('#FileUploadjqgrid');
            var filedata = JSON.parse(result);
            $('#displayuploadedfiles').modal('show');
            CreateJQGridUploadFile(filedata);
        }

    });
}

var IngredientFileColModels = [
    {

        name: 'RegionId',
        label: 'RegionId',
        hidden: true,
    },
    {

        name: 'CategoryId',
        label: 'CategoryId',
        hidden: true,
    },
    {

        name: 'EnclosureName',
        label: 'File Name',
        width: 250,

    },
    {

        name: 'UploadedBy',
        label: 'Uploaded By',
        width: 150,
    },
    {

        name: 'UploadedOn',
        label: 'Uploaded Date',
        width: 100,
    },
    {
        name: 'Action',
        align: 'center',
        width: 50,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="action_icons">' +
                '<a href="#" title="Download" class="btn-icon" onclick="downloadoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" ><i class="fas fa-download color-download"></i></a>' +
                '</div >';
        }
    },
];
function CreateJQGridUploadFile(filedata) {

    $("#FileUploadjqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: filedata,
        mtype: 'GET',
        colModel: IngredientFileColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#FileUploadpager',
        rowNum: 100,
        scroll: 1,
        gridComplete: function () {

            var objRows = $("#FileUploadjqgrid tbody tr");
            var objHeader = $("#FileUploadjqgrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $('#FileUploadjqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 280px )' });
    $('#FileUploadjqgrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#FileUploadjqgrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#FileUploadjqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#FileUploadjqgrid').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#FileUploadjqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#FileUploadjqgrid').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

}
function downloadoc(docdata) {

    var ingredientId = parseInt($("#IngredientId").val());
    var regionId = docdata.getAttribute("data-region");
    var categoryId = docdata.getAttribute("data-category");
    var enclosurename = docdata.getAttribute("data-enclosure");
    window.location.href = ROOT + "NewRID/FileDownload?docName=" + enclosurename + "&&ingredientId=" + ingredientId + "&&regionId=" + regionId + "&&categoryId=" + categoryId;

}
function UsageStatusWithComments(cellvalue) {

    if (cellvalue != null) {
        var color = "";
        var text = "";

        var index = cellvalue.indexOf('-')
        color = cellvalue.substr(0, index);
        text = cellvalue.substr(index + 1, cellvalue.length);

        if (color == 'Blue') {
            return `<span>` + text + `</span>`;
        }
        else if (color == 'Green') {
            return `<span>` + text + `</span>`;
        }
        else if (color == 'Yellow') {
            return `<span>` + text + `</span>`;
        }
        else if (color == 'Red') {
            return `<span>` + text + `</span>`;
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
}

//------------------------------------------------------------Search Based on Date and text

$('#search_ingredient').on('click', function () {

    var startDate = $('[data-datepicker-startdate]').datepicker('getDate');
    var endDate = $('[data-datepicker-enddate]').datepicker('getDate');
    var searchedText = $("#global_search").val().trim();


    if (startDate == null && endDate == null && searchedText == "") {
        alert("There is no data to search");
    }
    else {
        // for both date and text search
        if (
            (startDate != undefined && startDate != null && startDate != "") &&
            (endDate != undefined && endDate != null && endDate != "") &&
            (searchedText != undefined && searchedText != null && searchedText != "")
        ) {

            var formattedStartDate = FormateDateForSearch(startDate);
            var formattedEndDate = FormateDateForSearch(endDate);

            GetSearchResult(formattedStartDate, formattedEndDate, searchedText);
        }
        // for date search
        else if (
            (startDate != undefined && startDate != null && startDate != "") &&
            (endDate != undefined && endDate != null && endDate != "") &&
            (searchedText == undefined || searchedText == null || searchedText == "")
        ) {
            var formattedStartDate = FormateDateForSearch(startDate);
            var formattedEndDate = FormateDateForSearch(endDate);

            GetSearchResult(formattedStartDate, formattedEndDate, '');
        }
        // for text search
        else if (
            (startDate == undefined || startDate == null || startDate == "") &&
            (endDate == undefined || endDate == null || endDate == "") &&
            (searchedText != undefined && searchedText != null && searchedText != "")
        ) {
            GetSearchResult('', '', searchedText);
        }
        // alert if both date is not selected
        else if (
            ((startDate != undefined && startDate != null && startDate != "") &&
                (endDate == undefined || endDate == null || endDate == "")) ||
            ((startDate == undefined || startDate == null || startDate == "") &&
                (endDate != undefined && endDate != null && endDate != ""))
        ) {
            alert("Please select both start date and end date for search");
        }
        // alert when no data is searched
        else {
            alert("There is no data to search");
        }
    }
});
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

    $("#global_search").val('');

    GetSearchResult('', '', '');

});
function GetSearchResult(formattedStartDate, formattedEndDate, searchText) {
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetIngredientBasedOnSearch",
        data: {
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            SearchText: searchText,
            Source: "RnD"
        },
        dataType: "JSON",
        success: function (response) {

            var responseData = response;

            $('#IngredientListGrid').jqGrid('clearGridData');

            if (responseData != undefined) {
                $("#IngredientListGrid").jqGrid('setGridParam', { data: responseData }).trigger("reloadGrid", [{ page: 1 }]);
            }

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

//--------------------------------------------------Compliance Request

$("#ComplianceRequest_popup").on('click', function () {

    $('#Request_Ingrident').val('');
    $('#Request_CASNumber').val('');
    $("#Request_Region").val('').multiselect('refresh');
    $("#Request_Function").val('').multiselect('refresh');
    $("#IRAStatusDropDown").val("111").trigger("change");
    $("#search_ComplianceRequestList").trigger("click");

    $('#Err_Request_Region').hide();
    $('#Request_Ingrident').siblings('span').addClass('hide');
    $('#Request_CASNumber').siblings('span').addClass('hide');

    $("#NewIngredient_Request").modal("show");

});

// ingredient name
$(document).on('change', '#Request_Ingrident', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span:first').addClass('hide');
        var result = CheckValidIngredient($(this).val());
        if (result == 0) {
            $(".ingredient-exists").removeClass('hide');
        }
        else {
            $(".ingredient-exists").addClass('hide');
        }
    }
});
$(document).on('change', '#Request_CASNumber', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span:first').addClass('hide');
        var result = CheckValidCASNumber($(this).val());
        if (result == 0) {
            $(".casnumber-exists").removeClass('hide');
        }
        else {
            $(".casnumber-exists").addClass('hide');
        }
    }
});

function CheckValidIngredient(ingredientName, e) {
    var index = ingredientNames.findIndex(function (obj, i) {
        return obj.IngredientName.trim().toLowerCase() === ingredientName.trim().toLowerCase()
    });
    if (index > -1) {
        return 0;
    };
    return 1;

}
function CheckValidCASNumber(CASNumber, e) {

    var index = CASNumbers.findIndex(function (obj, i) {
        return obj.CASNumber.trim() === CASNumber.trim()
    });
    if (index > -1) {
        return 0;
    };
    return 1;

}

$('#Request_Region').on("change", function (event) {

    var Region = $.trim($('#Request_Region').val());
    if (Region.length > 0) {

        $('#Err_Request_Region').hide();
    }
    else {
        $('#Err_Request_Region').show();
    }

});

$("#ComplianceRequest_save").on('click', function () {

    $('.Err_Request').hide();
    var Ingrident = $.trim($('#Request_Ingrident').val());
    var CASNumber = $.trim($('#Request_CASNumber').val());
    if (CASNumber == null || typeof (CASNumber) == "undefined") {
        CASNumber = '';
    }
    var Region = $.trim($('#Request_Region').val());
    var Function = $.trim($('#Request_Function').val());
    var result = CheckValidIngredient(Ingrident);
    if (result == 0) {
        $(".ingredient-exists").removeClass('hide');
        return false;
    }
    else {
        $(".ingredient-exists").addClass('hide');
    }
    var casresult = CheckValidCASNumber(CASNumber);
    if (casresult == 0) {
        $(".casnumber-exists").removeClass('hide');
        return false;
    }
    else {
        $(".casnumber-exists").addClass('hide');
    }


    if (Ingrident.length == 0 || Region.length == 0) {
        Ingrident.length == 0 ? $('#Request_Ingrident').siblings('span:first').removeClass('hide') : $('#Request_Ingrident').siblings('span:first').addClass('hide');
        Region.length == 0 ? $('#Err_Request_Region').show() : $('#Err_Request_Region').hide();
        return false;
    }

    $('#confirmpopupmesssage').empty().html('Are you sure you want to save the details ?');
    $("#confirmpopup").modal("show");
    $('#ConfirmOKbutton').off('click').on('click', function () {

        $('#confirmpopup').modal('hide');

        $.ajax({
            type: "POST",
            url: ROOT + "NewRID/ComplianceRequest_Save",
            data: {
                IngredientName: Ingrident,
                Region: Region,
                FunctionId: Function,
                CASNumber: CASNumber,
            },
            success: function (response) {

                var responseMessage = JSON.parse(response.Item1);
                if (response.Item2 != "") {
                    ingredientNames = JSON.parse(response.Item2);
                }

                var alertDiv = document.getElementById("ComplianceRequestResultAlert");
                var messageBold = document.getElementById("ComplianceRequestResultMessage");
                alertDiv.classList.remove("alert-success", "alert-danger");
                alertDiv.classList.add(responseMessage.Item2);
                messageBold.textContent = responseMessage.Item1;
                alertDiv.style.display = "block";

                if (responseMessage.Item2.toLowerCase().includes("success")) {
                    $('#Request_Ingrident').val('');
                    $('#Request_CASNumber').val('');
                    $("#Request_Region").val('').multiselect('refresh');
                    $("#Request_Function").val('').multiselect('refresh');

                    $("#IRAStatusDropDown").val("111").trigger("change");
                    $("#search_ComplianceRequestList").trigger("click");
                }

                setTimeout(function () {
                    $('#ComplianceRequestResultAlert').hide();
                }, 3000);

            },
            error: function (error) {
                alert(error);
            }
        });

    });

});

ComplianceRequestListColModels = [

    {
        name: 'IngredientName',
        label: 'Ingredient Name',
        resizable: true,
        ignoreCase: true,
        width: 150,
    },
    {
        name: 'CASNumber',
        label: 'CAS Number',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },
    {
        name: 'FunctionName',
        label: 'Functions',
        width: 250,
        resizable: true,
        ignorecase: true,
        cellattr: functionAttrSetting,
    },
    {
        name: 'Region',
        label: 'Region',
        width: 120,
        resizable: true,
        ignorecase: true,
    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        width: 80,
    },
    {
        name: 'CreatedBy',
        label: 'Requested By',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 80,
    },
    {
        name: 'CreatedDate',
        label: 'Requested Date',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 80,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd/m/Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd/mm/yyyy',
                    autoclose: true
                }).change(function () {
                    $('#ComplianceRequestGrid')[0].triggerToolbar();
                });

            }
        }
    },

],

    $("#ComplianceRequestGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: ComplianceRequestListColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#ComplianceRequestGrid_Pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#ComplianceRequestGrid tbody tr");
            var objHeader = $("#ComplianceRequestGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }

    });

$("#ComplianceRequestGrid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$('#ComplianceRequestGrid').closest('.jqg-first-row-header').hide();
$('#ComplianceRequestGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 370px )' });
$('#ComplianceRequestGrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
var $TableHeight = $('#ComplianceRequestGrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 130) {
    $('#ComplianceRequestGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $('#ComplianceRequestGrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
}
else {
    $('#ComplianceRequestGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $('#ComplianceRequestGrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
}

$("#search_ComplianceRequestList").on('click', function () {

    var statusId = $("#IRAStatusDropDown").val();

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetComplianceRequestBasedOnSearch",
        data: {
            ingredientTypeId: 0,
            Status: statusId
        },
        dataType: "JSON",
        success: function (response) {

            var responseData = JSON.parse(response);

            $('#ComplianceRequestGrid').jqGrid('clearGridData');

            if (responseData != undefined) {
                $("#ComplianceRequestGrid").jqGrid('setGridParam', { data: responseData }).trigger("reloadGrid", [{ page: 1 }]);
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

});
function UsageStatusWithCommentsForPopup(cellvalue) {

    if (cellvalue != null) {
        var color = "";
        var text = "";
        color = color + cellvalue;
        if (color == 'Blue') {
            return `<span><span class="purple_circle"></span>` + text + `</span>`;
        }
        else if (color == 'Green') {
            return `<span><span class="green_circle"></span>` + text + `</span>`;
        }
        else if (color == 'Yellow') {
            return `<span><span class="yellow_circle"></span>` + text + `</span>`;
        }
        else if (color == 'Red') {
            return `<span><span class="red_circle"></span>` + text + `</span>`;
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
}
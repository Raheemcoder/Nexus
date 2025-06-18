var oldRegion="";
var data = [];
var IngredientListGridData = $('#DivisionBasedIngredientListJson').val();
var DivisionBasedIngredientList = [];
if (IngredientListGridData != undefined && IngredientListGridData != null && IngredientListGridData != "") {
    DivisionBasedIngredientList = $.parseJSON(IngredientListGridData);
}

var ComplianceRequestListData = $('#ComplianceRequestListJson').val();
var ComplianceRequestList = [];
if (ComplianceRequestListData != undefined && ComplianceRequestListData != null && ComplianceRequestListData != "") {
    ComplianceRequestList = $.parseJSON(ComplianceRequestListData);
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

//-----------------------------------------------------List Ingrident Jqgrid of Search Page

IngridentListColModels = [
    //{
    //    name: 'IngredientId',
    //    label: 'Ingredient Id',
    //    resizable: true,
    //    ignoreCase: true,
    //    hidden: true,
    //},
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
        //width: 250,
        //formatter: function (cellvalue, options, rowobject) {

        //    return '<a href="javascript:void(0)" class="rid_" onclick="GetParticularIngredientData(' + rowobject.IngredientId + ',this)">' + cellvalue + '</a>';

        //}
        formatter: function (cellvalue, options, rowobject) {
            return '<a href="#" class="rid_" data-target="#IngredientModal1" data-ingredientid="' + rowobject.IngredientId + '" data-ingredientname="' + rowobject.IngredientName + '"  data-synonyms="' + rowobject.Synonyms + '" data-casno = "' + rowobject.CASNumber + '" data-function = "' + rowobject.FunctionName + '" onclick="GetParticularIngredientData(this)">' + cellvalue + '</a>';
        }
    },
    {
        name: 'Synonyms',
        label: 'Synonyms',
        resizable: true,
        ignoreCase: true,
        //width: 150,
        index: 'Synonyms',
    },
    {
        name: 'CASNumber',
        label: 'CAS Number',
        resizable: true,
        ignoreCase: true,
        //width: 90,
    },
    {
        name: 'FunctionName',
        label: 'Functions',
        //width: 120,
        resizable: true,
        ignorecase: true,
        cellattr: functionAttrSetting,
    },
    {
        name: 'AdultLeaveOn',
        label: 'Adult - Leave On',
        resizable: true,
        //width: 100,
        align: 'center',
        ignorecase: true,
        index: 'AdultLeaveOn',
        formatter: function (cellvalue, options, rowobject) {
            var result = UsageStatus(cellvalue);
            return result;
        }
    },
    {
        name: 'AdultRinseOff',
        label: 'Adult - Rinse Off',
        //width: 100,
        resizable: true,
        ignorecase: true,
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
        //width: 100,
        ignorecase: true,
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
        //width: 100,
        ignorecase: true,
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
        //width: 120,
        resizable: true,
        ignorecase: true,
        //formatter: function (cellvalue, options, rowobject) {
        //    var result = FormatDateForList(cellvalue);
        //    return result;
        //}
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
        rowNum: DivisionBasedIngredientList.length,
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
$('#IngredientListGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '55vh' });
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

function UsageStatus(cellvalue) {
    if (cellvalue != null) {

        if (cellvalue == 'Red') {
            return '<span class="pe-2"><i class="red_circle"></i></span>';
        }
        else if (cellvalue == 'Blue') {
            return '<span class="pe-2"><i class="blue_circle"></i></span>';
        }
        else if (cellvalue == 'Yellow') {
            return '<span class="pe-2"><i class="yellow_circle"></i></span>';
        }
        else if (cellvalue == 'Green') {
            return '<span class="pe-2"><i class="green_circle"></i></span>';
        }
    }
    else {
        return "";
    }

}

//function FormatDateForList(DateToFormat) {
//    if (DateToFormat == null || DateToFormat == undefined) {
//        return "";
//    }
//    else {
//        var DateToFormat = new Date(DateToFormat);

//        var date = DateToFormat.getDate();
//        var month = DateToFormat.getMonth() + 1;

//        date = (date < 10 ? '0' : '') + date;
//        month = (month < 10 ? '0' : '') + month;

//        var formattedDate = date + '/' + month + '/' + DateToFormat.getFullYear();
//        return formattedDate;
//    }
//}

function GetParticularIngredientData(ingredientId, obj) {

    var closestRow = obj.closest("tr.jqgrow");
    var rowId = closestRow.id;
    var myGrid = $("#IngredientListGrid");
    var ingredientContent = myGrid.jqGrid("getCell", rowId, "IngredientName");
    var ingredientName = $(ingredientContent).text().trim();

    $.ajax({
        type: "GET",
        url: ROOT + "RID/GetParticularIngredientDetails",
        data: {
            IngredientId: ingredientId
        },
        dataType: "JSON",
        success: function (response) {

            var responseData = JSON.parse(response);

            $('#ParticularIngredientDetails').jqGrid('clearGridData');

            if (responseData != undefined) {
                $("#ParticularIngredientDetails").jqGrid('setGridParam', { data: responseData }).trigger("reloadGrid", [{ page: 1 }]);
            }

            $("#ParticularIngredientDetailsModal").modal("show");
            $("#ActiveIngredientName").text(ingredientName);
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

//-----------------------------------------------------------Particular Ingrident Details Jqgrid of Search Page

IngridentDetailColModels = [

    {
        name: 'Region',
        label: 'Region',
        width: 70,
        resizable: true,
        ignorecase: true,
    },
    {
        name: 'AdultLeaveOn',
        label: 'Adult - Leave On',
        resizable: true,
        width: 120,
        ignorecase: true,
        formatter: function (cellvalue, options, rowobject) {
            var result = UsageStatusWithComments(cellvalue);
            return result;
        }

    },
    {
        name: 'AdultRinseOff',
        label: 'Adult - Rinse Off',
        width: 120,
        resizable: true,
        ignorecase: true,
        formatter: function (cellvalue, options, rowobject) {
            var result = UsageStatusWithComments(cellvalue);
            return result;
        }
    },
    {
        name: 'BabyLeaveOn',
        label: 'Baby - Leave On',
        resizable: true,
        width: 120,
        ignorecase: true,
        formatter: function (cellvalue, options, rowobject) {
            var result = UsageStatusWithComments(cellvalue);
            return result;
        }
    },
    {
        name: 'BabyRinseOff',
        label: 'Baby - Rinse Off',
        resizable: true,
        width: 120,
        ignorecase: true,
        formatter: function (cellvalue, options, rowobject) {
            var result = UsageStatusWithComments(cellvalue);
            return result;
        }
    },

],

    $("#ParticularIngredientDetails").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: IngridentDetailColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#ParticularIngredientDetails_Pager',
        rowNum: 20,
        scroll: 1,


        gridComplete: function () {
            var objRows = $("#ParticularIngredientDetails tbody tr");
            var objHeader = $("#ParticularIngredientDetails tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }

    });

//$("#ParticularIngredientDetails").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

function UsageStatusWithComments(cellvalue) {

    if (cellvalue != null) {
        var color = "";
        var text = "";

        var index = cellvalue.indexOf('-')
        color = cellvalue.substr(0, index);
        text = cellvalue.substr(index + 1, cellvalue.length);

        //if (color == 'Blue') {
        //    return `<span><span class="pe-2"><i class="blue_circle"></i></span>` + text + `</span>`;
        //}
        //else if (color == 'Green') {
        //    return `<span><span class="pe-2"><i class="green_circle"></i></span>` + text + `</span>`;
        //}
        //else if (color == 'Yellow') {
        //    return `<span><span class="pe-2"><i class="yellow_circle"></i></span>` + text + `</span>`;
        //}
        //else if (color == 'Red') {
        //    return `<span><span class="pe-2"><i class="red_circle"></i></span>` + text + `</span>`;
        //}
        //else {
        //    return "";
        //}

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

$('#ParticularIngredientDetails').closest('.jqg-first-row-header').hide();
$("#ParticularIngredientDetails").closest('.ui-jqgrid-bdiv').css({ 'max-height': '55vh' });
$("#ParticularIngredientDetails").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $("#ParticularIngredientDetails").closest(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 280) {
    $("#ParticularIngredientDetails").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $("#ParticularIngredientDetails").closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
}
else {
    $("#ParticularIngredientDetails").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $("#ParticularIngredientDetails").closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}

//------------------------------------------------------------Search Based on Date and text

$('#search_ingredient').on('click', function () {

    var startDate = $('[-datepicker-startdate]').datepicker('getDate');
    var endDate = $('[-datepicker-enddate]').datepicker('getDate');
    var searchedText = $("#global_search").val().trim();


    if (startDate == null && endDate == null && searchedText == "") {

        alert("There is no data to search");

    }
    else
    {
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

    $('[-datepicker-startdate]').datepicker('destroy');
    $('[-datepicker-startdate]').val('');
    $('[-datepicker-startdate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true
        }
    );

    $('[-datepicker-enddate]').datepicker('destroy');
    $('[-datepicker-enddate]').val('');
    $('[-datepicker-enddate]').datepicker(
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
        url: ROOT + "RID/GetIngredientBasedOnSearch",
        data: {
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            SearchText: searchText,
            Source: "RnD"
        },
        dataType: "JSON",
        success: function (response) {

            var responseData = JSON.parse(response);

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

//--------------------------------------------------------------------------------datepicker attribute

var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 1));
$('[-datepicker-startdate]').datepicker({
    format: 'dd/mm/yyyy',
    //startDate: start,
    endDate: end,
    autoclose: true
}).on('changeDate', function () {
    $('[-datepicker-enddate]').datepicker('setStartDate', $(this).val());
    //$('[-datepicker-enddate]').datepicker('setDate', $(this).val());
});
$('[-datepicker-enddate]').datepicker({
    format: 'dd/mm/yyyy',
    startDate: start,
    endDate: end,
    autoclose: true
    // update "StartDate" defaults whenever "EndDate" changes
}).on('changeDate', function () {
    $('[-datepicker-startdate]').datepicker('setEndDate', $(this).val());
});

//--------------------------------------------------------------------------------Compliance Request form handeling

$("#ComplianceRequest_popup").on('click', function () {

    $('#Request_Ingrident').val('');
    $('#Request_CASNumber').val('');
    $("#Request_Region").val('').multiselect('refresh');
    $("#Request_Function").val('').multiselect('refresh');
    $("#IRAStatusDropDown").val("111").trigger("change");
    $("#search_ComplianceRequestList").trigger("click");

    $('#Err_Request_Ingredient').hide();
    $('#Err_Request_CASNumber').hide();
    $('#Err_Request_Region').hide();

    $("#NewIngredient_Request").modal("show");
});

$('#Request_Ingrident').on("keyup", function (event) {

    var Ingrident = $.trim($('#Request_Ingrident').val());
    if (Ingrident.length > 0) {

        $('#Err_Request_Ingredient').hide();
    }
    else {
        $('#Err_Request_Ingredient').show();
    }
});

//$('#Request_CASNumber').on("keyup", function (event) {

//    var CASNumber = $.trim($('#Request_CASNumber').val());
//    if (CASNumber.length > 0) {

//        $('#Err_Request_CASNumber').hide();
//    }
//    else {
//        $('#Err_Request_CASNumber').show();
//    }
//});

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


    if (Ingrident.length == 0 || /*CASNumber.length == 0 ||*/ Region.length == 0) {

        Ingrident.length == 0 ? $('#Err_Request_Ingredient').show() : $('#Err_Request_Ingredient').hide();
        //CASNumber.length == 0 ? $('#Err_Request_CASNumber').show() : $('#Err_Request_CASNumber').hide();
        Region.length == 0 ? $('#Err_Request_Region').show() : $('#Err_Request_Region').hide();
    }
    else {
        $("#RequestSave_Confirmation_Modal").modal("show");

        $('#RequestSave_ok').off('click').on('click', function () {

            $('#RequestSave_Confirmation_Modal').modal('hide');

            $.ajax({
                type: "POST",
                url: ROOT + "RID/ComplianceRequest_Save",
                data: {
                    IngredientName: Ingrident,
                    Region: Region,
                    FunctionId: Function,
                    CASNumber: CASNumber,
                },
                success: function (response) {

                    //if (response == "1") {
                    //    window.location.reload();
                    //}

                    var responseData = JSON.parse(response);

                    var alertDiv = document.getElementById("ComplianceRequestResultAlert");
                    var messageBold = document.getElementById("ComplianceRequestResultMessage");
                    alertDiv.classList.remove("alert-success", "alert-danger");
                    alertDiv.classList.add(responseData.Item2);
                    messageBold.textContent = responseData.Item1;
                    alertDiv.style.display = "block";

                    if (responseData.Item2.toLowerCase().includes("success")) {
                        $('#Request_Ingrident').val('');
                        $('#Request_CASNumber').val('');
                        $("#Request_Region").val('').multiselect('refresh');
                        $("#Request_Function").val('').multiselect('refresh');

                        $("#IRAStatusDropDown").val("111").trigger("change");
                        $("#search_ComplianceRequestList").trigger("click");
                    }

                    setTimeout(function () {
                        $('#ComplianceRequestResultAlert').hide();
                    }, 5000);

                },
                error: function (error) {
                    alert(error);
                }
            });

        });

        $('#RequestSave_cancel').off('click').on('click', function () {

            $('#RequestSave_Confirmation_Modal').modal('hide');
        });
    }

});

//--------------------------------------------------Set time out on response message
//setTimeout(function () {
//    $('#ComplianceRequest_SaveResponse').hide();
//}, 5000);

//--------------------------------------------------Compliance Request Grid

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
        //formatter: function (cellvalue, options, rowobject) {
        //    var result = FormatDateForList(cellvalue);
        //    return result;
        //}
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
        rowNum: 1000,
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
$('#ComplianceRequestGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '30vh' });
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
        url: ROOT + "RID/GetComplianceRequestBasedOnSearch",
        data: {
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
var IngridentColModels = [
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
        hidden:true,

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
        width: 250,
    },
    {
        name: 'ImpactDates',
        label: 'Impact Date',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 200,

    },
    {
        name: 'References',
        label: 'References',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 150,
    },
    {
        name: 'ReferenceDoc',
        label: 'Reference Doc',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 100,
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
    debugger;
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
        url: ROOT + "RID/GetIngredientsRegulationById",
        data: {
            IngredientId: ingredientid
        },
        dataType: "JSON",
        success: function (response) {
            //$('#loader').css('visibility', 'visible');
            $("#IngredientModal1").modal("show");
            $.jgrid.gridUnload('#ingriedienttable');
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
    $("#ingriedienttable").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: IngridentColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected1',
        rowNum: 100,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ingriedienttable tbody tr");
            var objHeader = $("#ingriedienttable tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }


    });
    $('#ingriedienttable').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#ingriedienttable').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#ingriedienttable').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#ingriedienttable').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#ingriedienttable').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#ingriedienttable').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#ingriedienttable').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
}
$('#closebtn').click(function () {
    $("#IngredientModal1").modal("hide");

});
function ViewUploadedFiles(region,category) {
    var ingredientId = parseInt($("#IngredientId").val());
    $.ajax({
        url: ROOT + 'RID/DisplayUploadedFiles',
        type: 'POST',
        dataType: 'JSON',
        data: { IngredientId: ingredientId,RegionId:region,CategoryId:category},

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
            return '<div class="demo-content ">' +
                '<a href="#" title="Download" class="btn-icon btn-success" onclick="downloadoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" ><i class="fa fa-download"></i></a>' +
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
    $('#FileUploadjqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
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
    window.location.href = ROOT + "RID/FileDownload?docName=" + enclosurename + "&&ingredientId=" + ingredientId + "&&regionId=" + regionId + "&&categoryId=" + categoryId;

}
var oldRegion = "";
var regionId_CRemarks = '';
var ParticularIngredientDetails = [];
var IngredientList = [];
/*var ComplianceRequestList = [];*/
var divisionId = $("#DivisionId").val();
var ingredienttypeName;
var ingredientnameforpopup;
var ingredientNames = [];
var CASNumbers = [];

$(document).ready(function () {
    
    $('.hidebotanicalname').hide();
    $('.hidecas').hide();
    $('.hideenumber').hide();
    $('.hideingnamesforinactives').hide();
    $('.hideingnamesforactives').show();
    $('.data-singleselect').select2();
    var start = new Date();
    var end = new Date(new Date().setYear(start.getFullYear() + 1));

    $('[data-datepicker-startdate]').datepicker({
        format: 'dd/mm/yyyy',
        endDate: end,
        todayHighlight: true,
        autoclose: true
    }).on('changeDate', function () {
        $('[data-datepicker-enddate]').datepicker('setStartDate', $(this).val());
    });

    $('[data-datepicker-enddate]').datepicker({
        format: 'dd/mm/yyyy',
        startDate: start,
        todayHighlight: true,
        endDate: end,
        autoclose: true
    });

    $(".nav-tabs li a").each(function () {
        if ($(this).hasClass('active')) {
            $(this).click();
        }
    });

    //var ComplianceRequestListData = $('#ComplianceRequestListJson').val();
    //if (ComplianceRequestListData != undefined && ComplianceRequestListData != null && ComplianceRequestListData != "") {
    //    CreateComplianceRequestListGrid(ComplianceRequestListData);
    //}
    ingredientNames = JSON.parse($("#IngredientNameList").val());
    CASNumbers = JSON.parse($("#CASNumberList").val());
    $('.select2-hidden-accessible').each(function () {
        $(this).select2({
            dropdownParent: $(this).parent()
        });
    });
});

function updateGridColumns() {
    if (ingredienttypeName.trim().toLowerCase() === 'active herbs') {
        $("#IngredientListGrid").jqGrid('hideCol', 'CASNumber');
        $("#IngredientListGrid").jqGrid('hideCol', 'ENumber');
    }
    if (ingredienttypeName.trim().toLowerCase() === 'active others') {
        $("#IngredientListGrid").jqGrid('hideCol', 'ENumber');
        $("#IngredientListGrid").jqGrid('hideCol', 'BotanicalName');
        $("#IngredientListGrid").jqGrid('showCol', 'CASNumber');
    }
    else if (ingredienttypeName.trim().toLowerCase() === 'inactives') {
        $("#IngredientListGrid").jqGrid('hideCol', 'BotanicalName');
    }
    $("#IngredientListGrid").jqGrid('setGridWidth', $("#IngredientListGrid").width());
}
//-----------------------------------------------------------Ingrident List Jqgrid
function CreateIngredientListGrid(data) {

    $.jgrid.gridUnload('#IngredientListGrid');

    var labelName = ingredienttypeName.trim().toLowerCase() === 'active herbs'
        ? 'Ingredient Name (Sanskrit/English)'
        : 'Ingredient Name';

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
            name: 'BotanicalName',
            label: 'Botanical Name',
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                if (ingredienttypeName.trim().toLowerCase() == 'active herbs') {
                    return '<a href="javascript:void(0)" class="rid_" onclick="GetParticularIngredientData(' + rowobject.IngredientId + ')">' + cellvalue + '</a>';
                }
                else {
                    return cellvalue;
                }
            }
        },
        {
            name: 'IngredientName',
            label: labelName,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                if (ingredienttypeName.trim().toLowerCase() != 'active herbs') {
                    return '<a href="javascript:void(0)" class="rid_" onclick="GetParticularIngredientData(' + rowobject.IngredientId + ')">' + cellvalue + '</a>';
                }
                else {
                    return cellvalue;
                }
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
            name: 'ENumber',
            label: 'E Number',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'InMedicine',
            label: 'In Medicine',
            resizable: true,
            ignorecase: true,
            width: 100,
            align: 'center',
            formatter: function (cellvalue, options, rowobject) {
                var result = UsageStatus(cellvalue);
                return result;
            }
        },
        {
            name: 'InFoodSupplement',
            label: 'In Food Supplement',
            resizable: true,
            ignorecase: true,
            width: 100,
            align: 'center',
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
                        autoclose: true,
                        todayHighlight: true,
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
            data: data,
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
                updateGridColumns();

                $(".nav-tabs li a").each(function () {
                    if ($(this).hasClass('active')) {
                        if ($(this).text()?.trim().toLowerCase().includes('others')) {
                            jQuery("#IngredientListGrid").jqGrid('hideCol', "BotanicalName");
                        }
                        else if ($(this).text()?.trim().toLowerCase().includes('inactives')) {
                            jQuery("#IngredientListGrid").jqGrid('hideCol', "BotanicalName");
                            jQuery("#IngredientListGrid").jqGrid('hideCol', "PartUsed");
                            jQuery("#IngredientListGrid").jqGrid('hideCol', "SolventsUsed");
                            jQuery("#IngredientListGrid").jqGrid('hideCol', "Markers");
                        }
                    }
                });

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
                startColumnName: 'InMedicine',
                numberOfColumns: 2,
                titleText: '<div id="Usage" class="text-center">Usage</div>',
                index: 'Usage',
                name: 'Usage',
            }
        ]
    });

    $('#Usage').closest('th').addClass('testing');
    $('#IngredientListGrid').closest('.jqg-first-row-header').hide();
    $('#IngredientListGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 310px)' });
    $('#IngredientListGrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#IngredientListGrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#IngredientListGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#IngredientListGrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#IngredientListGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#IngredientListGrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }
    $('#IngredientListGrid').closest("#gview_IngredientListGrid").css({ 'z-index': '0' });

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
        var regDataFilter = ParticularIngredientDetails.filter(function (obj) { return obj.Region === val });
        var count = regDataFilter.length;
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    oldRegion = val;
    return result;
};
arrtSetting_CRemarks = function (rowId, val, rowobject) {
    var result;
    var regionId = rowobject.RegionId;
    if (regionId_CRemarks === '' || regionId_CRemarks != regionId) {
        var regionDataFilter = ParticularIngredientDetails.filter(function (obj) { return obj.RegionId === regionId });
        var count = regionDataFilter.length;
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    regionId_CRemarks = regionId;
    return result;
}
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

//-----------------------------------------------------------Particular Ingrident Details Jqgrid

var IngridentColModels = [
    {
        name: 'Region',
        classes: 'trs',
        cellattr: arrtSetting,
        align: 'center',
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;
        }
    },
    {
        name: 'Category',
        classes: 'trs1',
        align: 'center',
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;
        }
    },
    {
        name: 'CRemarks',
        label: 'Compliance Remarks',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        align: 'center',
        classes: 'align-middle',
        cellattr: function (rowId, cellValue, rowObject) {
            if (rowObject.ComplianceExists == 1) {
                return arrtSetting_CRemarks(rowId, cellValue, rowObject);
            } else {
                return '';
            }
        },
        formatter: function (cellValue, options, rowObject) {
            if (rowObject.ComplianceExists == 1) {
                return '<div class="cremarks_icon mt-3" style="text-align:center;"><a href="javascript:void(0)" onclick="OpenCRemarksPopup(\'' + rowObject.RegionId + '\', \'' + rowObject.Region + '\')"><i class="fas fa-info-circle" title="compliance remarks"></i></a></div>';
            }
            else {
                if (ingredienttypeName.trim().toLowerCase() == 'inactives') {
                    if (rowObject.InActivesCRemarks != "") {
                        return '<div class="cremarks_icon" style="text-align:center;"><a href="javascript:void(0)" onclick="OpenInactivesCRemarksPopup(\'' + rowObject.RegionId + '\', \'' + rowObject.Region + '\',\'' + rowObject.CategoryId + '\',\'' + rowObject.Category + '\')"><i class="fas fa-info-circle" title="compliance remarks"></i></a></div>';
                    }
                }
            }
            return '';
        }
    },
    {
        name: 'CInfo',
        label: 'Claims Info',
        resizable: true,
        ignoreCase: true,
        align: 'center',
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.CInfo != '') {
                return '<div class=""><a href="javascript:void(0)" onclick="OpenClaimsInfoPopup(\'' + rowobject.RegionId + '\', \'' + rowobject.Region + '\',\'' + rowobject.CategoryId + '\',\'' + rowobject.Category + '\')"><i class="fas fa-info-circle" title="compliance remarks"></i></a></div>';
            }
            else {
                return '';
            }
        }
    },
    {
        name: 'ImpactDates',
        label: 'Impact Date',
        resizable: true,
        align: 'center',
        ignoreCase: true,
        search: true,
        sortable: false
    }
];
function GetParticularIngredientData(ingredientId) {

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetParticularIngredientDetails",
        data: {
            IngredientId: ingredientId
        },
        dataType: "JSON",
        success: function (result) {
            $('#IngredientIdForCompliance').val(ingredientId);
            var response = JSON.parse(result);

            $.jgrid.gridUnload('#particular-ingredient-details');
            ParticularIngredientDetails = response.Item2;
            if (ingredienttypeName.trim().toLowerCase() == "active herbs") {
                $('.hidebotanicalname').show();
                $('.hidecas').hide();
                $('.hideenumber').hide();
                $('.ing-bot-name').text(response.Item1[0].BotanicalName);

            }
            if (ingredienttypeName.trim().toLowerCase() == "active others") {
                $('.hidebotanicalname').hide();
                $('.hidecas').show();
                $('.hideenumber').hide();
                $('.ing-cas-no').text(response.Item1[0].CASNumber);
                $('.ing-e-no').text(response.Item1[0].ENumber);
            }
            if (ingredienttypeName.trim().toLowerCase() == "inactives") {
                $('.hidebotanicalname').hide();
                $('.hidecas').show();
                $('.hideenumber').show();
                $('.ing-cas-no').text(response.Item1[0].CASNumber);
                $('.ing-e-no').text(response.Item1[0].ENumber);
            }
            $('.ing-name').text(response.Item1[0].IngredientName);
            $('.ing-sys').text(response.Item1[0].Synonyms);
            ingredientnameforpopup = response.Item1[0].IngredientName;

            createModalGrid(ParticularIngredientDetails);

            $("#ParticularIngredientModal").modal("show");
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}
function OpenClaimsInfoPopup(regionId, region, categoryId, category) {
    var ingredientId = $('#IngredientIdForCompliance').val()
    var ingredientName = ingredientnameforpopup

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetFoodSupplementClaimsInfo",
        data: { ingredientId: ingredientId, regionId: regionId, categoryId: categoryId },
        success: function (result) {
            $('#richeditordata_claims').html(result[0].ClaimsInfo);
            $('#Claims_Region').text(region)
            $('#Claims_Ingredient').text(ingredientName)
            $('#Claims_Category').text(category)
            $('#claimsinfopopup').modal('show');
        }
    });
}
function OpenInactivesCRemarksPopup(regionId, region, categoryId, category) {

    var ingredientId = $('#IngredientIdForCompliance').val()
    var ingredientName = ingredientnameforpopup

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetFoodSupplementComplianceRemarksInactives",
        data: {
            ingredientId: ingredientId,
            regionId: regionId,
            categoryId: categoryId
        },
        success: function (result) {
            if (result) {
                $('#ComplianceInactives_Ingredient').text(ingredientName)
                $('#ComplianceInactives_Region').text(region)
                $('#ComplianceInactives_Category').text(category)
                $('#richeditordata_complianceinactives').html(result);
                $('#complianceremarksinactivespopup').modal('show');
            }
            else {
                alert("Error Occured : " + result);
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
function OpenCRemarksPopup(regionId, region) {
    
    var ingredientId = $('#IngredientIdForCompliance').val()
    var ingredientTypeId = $('#IngredientTypeId').val()
    var ingredientName = ingredientnameforpopup
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetFoodSupplementComplianceRemarks",
        data: { ingredientTypeId: ingredientTypeId, ingredientId: ingredientId, regionId: regionId },
        success: function (result) {
            
            var regionData = result.HeaderData;
            var data = result.CRemarksData;
            $('#complianceremarkspopup').modal('show');
            var tablebody = $('#complianceremarkspopup tbody');
            tablebody.empty();
            $.each(regionData, function (index, item) {
                var row = `<tr>
                          <th>${item.RegionGroupName}</th>
                          <td>${item.RegionGroupData}</td>
                       </tr>`;
                tablebody.append(row);
            });
            $('#Compliance_Region').text(region)
            $('#Compliance_Ingredient').text(ingredientName)
            $('#richeditordata').html(data[0].AdditionalInfo);
            $('#InMedicineForClaims').val(data[0].MedicineRecommendation)
            $('#InfoodSupplementsForClaims').val(data[0].FoodSupplementRecommendation)
            $('#recommendationforregion').text(region + " Recommendation")
        }
    });

}

function createModalGrid(data) {
    regionId_CRemarks = '';
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
        rowNum: 20,
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
            if (ingredienttypeName.trim().toLowerCase() == 'inactives') {
                $("#particular-ingredient-details").jqGrid('hideCol', 'CInfo');
            }
            $("#particular-ingredient-details").jqGrid('setGridWidth', $("#particular-ingredient-details").width());
        }
    });

    $('#particular-ingredient-details').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#particular-ingredient-details').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
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

//------------------------------------------------------------Search Based on Date and text of List Jqgrid

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
    if (!(DateToFormat === "" || DateToFormat === null)) {
        var date = DateToFormat.getDate();
        var month = DateToFormat.getMonth() + 1;

        date = (date < 10 ? '0' : '') + date;
        month = (month < 10 ? '0' : '') + month;

        var formattedDate = DateToFormat.getFullYear() + '-' + month + '-' + date;
        return formattedDate
    } else {
        return "";
    }
}
$('#refresh_date').on('click', function () {

    $('[data-datepicker-startdate]').datepicker('destroy');
    $('[data-datepicker-startdate]').val('');
    $('[data-datepicker-startdate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true,
            todayHighlight: true,
        }
    );

    $('[data-datepicker-enddate]').datepicker('destroy');
    $('[data-datepicker-enddate]').val('');
    $('[data-datepicker-enddate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true,
            todayHighlight: true,
        }
    );

    $("#global_search").val('');

    var firstingredient = $("#firstingredient").val();
    ingredienttypeName = $("#firstingredienttypename").val();

    $(".ingredienttype_content li").find('.active').removeClass("active");
    $("#selectedingredient_" + firstingredient).addClass("active");

    GetSearchResult('', '', '');

});
function GetSearchResult(formattedStartDate, formattedEndDate, searchText) {

    var ingredientTypeId = $(".nav-tabs li a").filter(function () {
        return $(this).hasClass('active');
    }).attr('IngredientTypeId');

    $('#IngredientTypeId').val(ingredientTypeId)
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetIngredientBasedOnSearch",
        data: {
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            SearchText: searchText,
            Source: "RnD",
            IngredientTypeId: ingredientTypeId
        },
        dataType: "JSON",
        success: function (response) {
            var responseData = response;
            CreateIngredientListGrid(responseData);
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}

//-------------------------------------------------------------Compliance Request functionality and jqgrid

function clearRequestDataPopup() {

    var ingredientTypeId = $(".nav-tabs li a").filter(function () {
        return $(this).hasClass('active');
    }).attr('IngredientTypeId');

    $("#NewIngredient_Request").modal("show");

    $('#Request_IngredientType').val(ingredientTypeId);
    $('#Request_BotanicalName').val('');
    $('#Request_IngridentName').val('');
    $('#Request_CASNumber').val('');
    $('#Request_Region').val('');
    $("#Request_Status").val('111');

    $('#Request_IngredientType').trigger("change");
    $("#Request_Status").trigger("change");
    $("#Request_Region").multiselect('refresh');

    $("#search_ComplianceRequestList").trigger("click");
    $(".req-error").hide();
    $(".ingredient-exists").hide();
    $(".casnumber-exists").hide();
}
$('#Request_IngredientType').on("change", function (event) {
    var selectedvalue = parseInt($(this).val());
    var selectedtext = $.trim($('#Request_IngredientType option:selected').text())

    if (selectedtext.trim().toLowerCase() == 'active herbs') {
        $('.botanicaldiv').show();
        $('.casdiv').hide();
        $('.ingredientnamebasedontype').html('Ingredient Name (Sanskrit/ English) <span class="text-danger">*</span>');
    }
    else if (selectedtext.trim().toLowerCase() == 'active others') {
        $('.botanicaldiv').hide();
        $('.casdiv').show();
        $('.ingredientnamebasedontype').html('Ingredient Name <span class="text-danger">*</span>');
    }
    else if (selectedtext.trim().toLowerCase() == 'inactives') {
        $('.botanicaldiv').hide();
        $('.casdiv').show();
        $('.ingredientnamebasedontype').html('Ingredient Name <span class="text-danger">*</span>');

    }

    $("Request_BotanicalName").val("");
    $("Request_CASNumber").val("");

    $("#Err_Request_BotanicalName").hide();
    $("#Err_Request_IngridentName").hide();
    $("#Err_Request_CASNumber").hide();
    $("#Err_Request_Region").hide();
    var statusId = $("#Request_Status").val();
    var ingredientTypeId = $('#Request_IngredientType').val()
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetComplianceRequestBasedOnSearch",
        data: {
            Status: statusId,
            ingredientTypeId: ingredientTypeId
        },
        dataType: "JSON",
        success: function (response) {
            var responseData = JSON.parse(response);
            CreateComplianceRequestListGrid(responseData);
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
});

$('#Request_BotanicalName').on("change", function (event) {
    var value = $(this).val().trim();
    if (value === "" || value === null) {
        $("#Err_Request_BotanicalName").show();
    } else {
        $("#Err_Request_BotanicalName").hide();
    }
});

$('#Request_IngridentName').on("change", function (event) {
    
    var value = $(this).val().trim();
    if (value === "" || value === null) {
        $("#Err_Request_IngridentName").show();
    } else {
        $("#Err_Request_IngridentName").hide();
    }
});
$('#Request_Region').on("change", function (event) {
    var value = $(this).val();
    if (value === "" || value === null) {
        $("#Err_Request_Region").show();
    } else {
        $("#Err_Request_Region").hide();
    }
});
$(document).on('change', '#Request_IngridentName', function () {
    
    if ($(this).val().trim() != "") {
        $(this).siblings('span:first').hide();
        var result = CheckValidIngredient($(this).val());
        if (result == 0) {
            $(".ingredient-exists").show();
        }
        else {
            $(".ingredient-exists").hide();
        }
    }
});
$(document).on('change', '#Request_CASNumber', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span:first').hide();
        var result = CheckValidCASNumber($(this).val());
        if (result == 0) {
            $(".casnumber-exists").show();
        }
        else {
            $(".casnumber-exists").hide();
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
$("#ComplianceRequest_save").on('click', function () {
    
    var isValidSave = true;
    var selectedtext = $.trim($('#Request_IngredientType option:selected').text())
    var ingredienttypeid = $.trim($('#Request_IngredientType').val());
    var reqingredienttypename = $.trim($('#Request_IngredientType option:selected').text());
    var botanicalname = $.trim($('#Request_BotanicalName').val());
    var ingridentname = $.trim($('#Request_IngridentName').val());
    var casnumber = $.trim($('#Request_CASNumber').val());
    var region = $.trim($('#Request_Region').val());

    if (selectedtext.trim().toLowerCase() == 'active herbs') {
        if (botanicalname === "" || botanicalname === null) {
            $("#Err_Request_BotanicalName").show();
            isValidSave = false;
        } else {
            $("#Err_Request_BotanicalName").hide();
        }
    }
    //else if (selectedtext.trim().toLowerCase() == 'active others') {
    //    if (casnumber === "" || casnumber === null) {
    //        $("#Err_Request_CASNumber").show();
    //        isValidSave = false;
    //    } else {
    //        $("#Err_Request_CASNumber").hide();
    //    }
    //}
    //else if (selectedtext.trim().toLowerCase() == 'inactives') {
    //    if (casnumber === "" || casnumber === null) {
    //        $("#Err_Request_CASNumber").show();
    //        isValidSave = false;
    //    } else {
    //        $("#Err_Request_CASNumber").hide();
    //    }
    //};

    if (ingridentname === "" || ingridentname === null) {
        $("#Err_Request_IngridentName").show();
        isValidSave = false;
    }
    else {
        $("#Err_Request_IngridentName").hide();
    };

    if (region === "" || region === null) {
        $("#Err_Request_Region").show();
        isValidSave = false;
    }
    else {
        $("#Err_Request_Region").hide();
    };
    var result = CheckValidIngredient(ingridentname);
    if (result == 0) {
        $(".ingredient-exists").show();
        isValidSave = false;

    }
    else {
        $(".ingredient-exists").hide();
    }
    var casresult = CheckValidCASNumber(casnumber);
    if (casresult == 0) {
        $(".casnumber-exists").show();
        isValidSave = false;
    }
    else {
        $(".casnumber-exists").hide();
    }
    if (isValidSave) {
        $('#confirmpopupmesssage').empty().html('Are you sure you want to submit the Compliance Request ?');
        $("#confirmpopup").modal("show");

        $('#ConfirmOKbutton').off('click').on('click', function () {
            $('#confirmpopup').modal('hide');
            $.ajax({
                type: "POST",
                url: ROOT + "NewRID/ComplianceRequest_Save",
                data: {
                    BotanicalName: botanicalname,
                    IngredientName: ingridentname,
                    Region: region,
                    CASNumber: casnumber,
                    IngredientTypeId: parseInt(ingredienttypeid)
                },
                success: function (response) {

                    var responseData = JSON.parse(response.Item1);
                    var alertDiv = document.getElementById("ComplianceRequestResultAlert");
                    var messageBold = document.getElementById("ComplianceRequestResultMessage");

                    alertDiv.classList.remove("alert-success", "alert-danger");
                    alertDiv.classList.add(responseData.Item2);
                    messageBold.textContent = responseData.Item1;
                    alertDiv.style.display = "block";
                    if (response.Item2 != "") {
                        ingredientNames = JSON.parse(response.Item2);
                    }
                    if (responseData.Item2.toLowerCase().includes("success")) {
                        clearRequestDataPopup();
                    }

                    setTimeout(function () {
                        $('#ComplianceRequestResultAlert').hide();
                    }, 3000);

                },
                error: function (xhr, status, error) {
                    alert("Error Occured: " + error);
                }
            });

        });
    }

});

$("#search_ComplianceRequestList").on('click', function () {
    var statusId = $("#Request_Status").val();
    var ingredientTypeId = $('#Request_IngredientType').val()
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetComplianceRequestBasedOnSearch",
        data: {
            ingredientTypeId: ingredientTypeId,
            Status: statusId
        },
        dataType: "JSON",
        success: function (response) {
            var responseData = JSON.parse(response);
            CreateComplianceRequestListGrid(responseData);
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

});

function CreateComplianceRequestListGrid(data) {

    $.jgrid.gridUnload('#ComplianceRequestGrid');
    var ComplianceRequestListColModels = [
        {
            name: 'IngredientType',
            label: 'Ingredient Type',
            resizable: true,
            ignoreCase: true,
            width: 100,
        },
        {
            name: 'IngredientName',
            label: 'Ingredient Name',
            resizable: true,
            ignoreCase: true,
            width: 150,
        },
        {
            name: 'BotanicalName',
            label: "Botanical Name",
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'CASNumber',
            label: 'CAS Number',
            resizable: true,
            ignoreCase: true,
            width: 120,
        },
        {
            name: 'Region',
            label: 'Region',
            width: 165,
            resizable: true,
            ignorecase: true,
        },
        {
            name: 'Status',
            label: 'Status',
            resizable: true,
            ignoreCase: true,
            width: 60,
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
                        autoclose: true,
                        todayHighlight: true,
                    }).change(function () {
                        $('#ComplianceRequestGrid')[0].triggerToolbar();
                    });

                }
            }
        },
    ];

    $("#ComplianceRequestGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data.length > 0 ? data : [],
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
            updateRequestGridColumns();
            if ($('#Request_IngredientType option:selected').text().trim().toLowerCase() != 'active herbs') {
                $("#ComplianceRequestGrid").jqGrid('hideCol', 'BotanicalName');
                $("#ComplianceRequestGrid").jqGrid('setGridWidth', $("#ComplianceRequestGrid").width());

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
    $('#ComplianceRequestGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 330px )' });
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
}

function updateRequestGridColumns() {

    var reqingredientTypeName = $("#Request_IngredientType option:Selected").text();

    if (reqingredientTypeName.trim().toLowerCase() === 'active herbs') {
        $("#IngredientListGrid").jqGrid('hideCol', 'CASNumber');
        $("#IngredientListGrid").jqGrid('hideCol', 'ENumber');
    }
    if (reqingredientTypeName.trim().toLowerCase() === 'active others') {
        $("#IngredientListGrid").jqGrid('hideCol', 'BotanicalName');
        $("#IngredientListGrid").jqGrid('hideCol', 'ENumber');
        $("#IngredientListGrid").jqGrid('showCol', 'CASNumber');
    }
    else if (reqingredientTypeName.trim().toLowerCase() === 'inactives') {
        $("#IngredientListGrid").jqGrid('hideCol', 'BotanicalName');
    }
};

//-----------------------------------------------Get IngredientTypes Jqgrid Data
function GetIngredientTypesGridData(obj) {
    var startDate = $('[data-datepicker-startdate]').datepicker('getDate');
    var endDate = $('[data-datepicker-enddate]').datepicker('getDate');
    var searchedText = $("#global_search").val().trim();

    var formattedStartDate = FormateDateForSearch(startDate);
    var formattedEndDate = FormateDateForSearch(endDate);


    $(obj).parent().siblings().find('a').removeClass('active');
    $(obj).addClass('active');
    GetSearchResult(formattedStartDate, formattedEndDate, searchedText);
    ingredienttypeName = obj.getAttribute('IngredientTypeName');

}

//--------------------------------------------------------------- Excel download

function ExcelDownload(formattedStartDate, formattedEndDate, searchedText) {
    var ingredientTypeId = $(".nav-tabs li a").filter(function () {
        return $(this).hasClass('active');
    }).attr('IngredientTypeId');

    var isValid = true;
    var data = $('#IngredientListGrid').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewRID/DownloadFoodSupplementRIDExcel?StartDate=" + formattedStartDate + "&&EndDate=" + formattedEndDate + "&&searchText=" + searchedText + "&&IngredientTypeId=" + ingredientTypeId + "&&IngredientTypeName=" + ingredienttypeName;
    }
}

$("#exceldownload").on('click', function () {

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
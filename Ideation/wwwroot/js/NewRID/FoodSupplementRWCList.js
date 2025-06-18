var oldRegion = "";
var regionId_CRemarks = '';
var ParticularIngredientDetails = [];
var IngredientList = [];
var divisionId = $("#DivisionId").val();
var ingredienttypeName;
var ingredientnameforpopup;
var Loginid = $("#LoginId").val();

$(document).ready(function () {

    $('.hidebotanicalname').hide();
    $('.hidecas').hide();
    $('.hideenumber').hide();
    $('.hideingnamesforinactives').hide();
    $('.hideingnamesforactives').show();

    var start = new Date();
    var end = new Date(new Date().setYear(start.getFullYear() + 1));

    $('[data-datepicker-startdate]').datepicker({
        format: 'dd/mm/yyyy',
        endDate: end,
        autoclose: true,
        todayHighlight: true,
    }).on('changeDate', function () {
        $('[data-datepicker-enddate]').datepicker('setStartDate', $(this).val());
    });

    $('[data-datepicker-enddate]').datepicker({
        format: 'dd/mm/yyyy',
        startDate: start,
        endDate: end,
        autoclose: true,
        todayHighlight: true,
    });

    $(".nav-tabs li a").each(function () {
        if ($(this).hasClass('active')) {
            $(this).click();
        }
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
            name: 'Action',
            label: 'Action',
            resizable: true,
            ignoreCase: true,
            search: false,
            width: 50,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="d-flex justify-content-around align-items-center">
                            <i class="fas fa-history text-warning"
                            onclick="ShowHistory(${rowobject.IngredientId},this)" data-ingName="${rowobject.IngredientName}" title="History" role="button"></i>

                            ${rowobject.IsConfirmed == 1 ? `
                            <i class="fas fa-pen text-primary"
                            onclick="GetAddEditFSDetails(${rowobject.IngredientId}, 2)" title="Edit" role="button"></i>` : ''}

                            <i class="fas fa-trash text-danger"
                            onclick="DeleteIngredient(${rowobject.IngredientId})" title="Delete" role="button"></i>
                        </div>`;
            }
        },
        {
            name: 'BotanicalName',
            label: 'Botanical Name',
            resizable: true,
            ignorecase: true,
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
                        } else if ($(this).text()?.trim().toLowerCase().includes('inactives')) {
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
        result = 'rowspan=' + '"' + count + '"';
    }
    else {
        result = 'style="display:none"';
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
    if (rowobject.IsRollback == 1 && rowobject.IsApproved == 1) {
        result = 'class="add-rollback-color"';
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
        name: 'RegulatoryStatuscolor',
        label: 'Regulatory Status',
        resizable: true,
        ignoreCase: true,
        search: true,
        align: 'center',
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != null) {
                var result = UsageStatus(cellvalue);
                return result;
            }
            else {
                return cellvalue;
            }

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
        ignoreCase: true,
        search: true,
        sortable: false,
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

            $.jgrid.gridUnload('#particular-ingredient-details-fs-pdf-download');
            ParticularIngredientDetails = response.Item2;

            if (ingredienttypeName.trim().toLowerCase() == "active herbs") {
                $('.hidebotanicalname').show();
                $('.ing-bot-name').text(response.Item1[0].BotanicalName);

            }
            if (ingredienttypeName.trim().toLowerCase() == "active others") {
                $('.hidebotanicalname').hide();
                $('.hidecas').show();
                $('.hideenumber').hide();
                $('#ingbasedontype').text('Ingredient Name(E/S)')
                $('.ing-cas-no').text(response.Item1[0].CASNumber);
                $('.ing-e-no').text(response.Item1[0].ENumber);
            }
            if (ingredienttypeName.trim().toLowerCase() == "inactives") {
                $('.hidecas').show();
                $('.hideenumber').show();
                $('.hideingnamesforinactives').show();
                $('.hideingnamesforactives').hide();
                $('.ing-cas-no').text(response.Item1[0].CASNumber);
                $('.ing-e-no').text(response.Item1[0].ENumber);
            }
            $('.ing-name').text(response.Item1[0].IngredientName);
            $('.ing-sys').text(response.Item1[0].Synonyms);
            ingredientnameforpopup = response.Item1[0].IngredientName;
            createModalGrid(ParticularIngredientDetails);
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

    var ingredientId = $('#IngredientIdForCompliance').val();
    var ingredientTypeId = $('#IngredientTypeId').val();
    var ingredientName = ingredientnameforpopup;

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetFoodSupplementComplianceRemarks",
        data: { ingredientTypeId: ingredientTypeId, ingredientId: ingredientId, regionId: regionId },
        success: function (result) {
            var regionData = result.HeaderData;
            var data = result.CRemarksData;
            $('#complianceremarkspopup-fs-pdf-download').modal('show');
            var tablebody = $('#complianceremarkspopup-fs-pdf-download tbody');
            tablebody.empty();
            $.each(regionData, function (index, item) {
                var row = `<tr>
                          <th>${item.RegionGroupName}</th>
                          <td>${item.RegionGroupData}</td>
                       </tr>`;
                tablebody.append(row);

            });
            $('#Compliance_RegionId').val(regionId)
            $('#Compliance_Region').text(region)
            $('#Compliance_Ingredient').text(ingredientName)
            $('#richeditordata').html(data[0].AdditionalInfo);
            $('#InMedicineForClaims').val(data[0].MedicineRecommendation)
            $('#InfoodSupplementsForClaims').val(data[0].FoodSupplementRecommendation)
            $('#recommendationforregion').text(region + " Recommendation")
        }
    });

}
function applyRowSpan() {
    oldRegion = '';
    regionId_CRemarks = '';
}
function createModalGrid(data) {

    $("#particular-ingredient-details-fs-pdf-download").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: IngridentColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#particular-ingredient-details-pager-fs-pdf-download',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#particular-ingredient-details-fs-pdf-download tbody tr");
            var objHeader = $("#particular-ingredient-details-fs-pdf-download tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            applyRowSpan();
            if (ingredienttypeName.trim().toLowerCase() == 'inactives') {
                $("#particular-ingredient-details-fs-pdf-download").jqGrid('hideCol', 'CInfo');
            }
            $("#particular-ingredient-details-fs-pdf-download").jqGrid('setGridWidth', $("#particular-ingredient-details-fs-pdf-download").width());

        }
    });

    $('#particular-ingredient-details-fs-pdf-download').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#particular-ingredient-details-fs-pdf-download').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#particular-ingredient-details-fs-pdf-download').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#particular-ingredient-details-fs-pdf-download').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#particular-ingredient-details-fs-pdf-download').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#particular-ingredient-details-fs-pdf-download').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#particular-ingredient-details-fs-pdf-download').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

    if (ingredienttypeName.trim().toLowerCase() === 'inactives') {
        $("#download-ing-com-rem-pdf").hide();
    }
    else {
        $("#download-ing-com-rem-pdf").show();
    }

    $("#ParticularIngredientModal-fs-pdf-download").modal("show");

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
    $(".ingredienttype_content li").find('.active').removeClass("active");
    $("#selectedingredient_" + firstingredient).addClass("active");
    ingredienttypeName = $("#firstingredienttypename").val();
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
            Source: "IRA",
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
function ExcelDownload(formattedStartDate, formattedEndDate, searchedText, ingredientType) {

    var isValid = true;
    var data = $('#IngredientListGrid').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewRID/DownloadFoodSupplementRWCExcel?StartDate=" + formattedStartDate + "&&EndDate=" + formattedEndDate + "&&searchText=" + searchedText + "&&IngredientType=" + ingredientType + "&&IngredientTypeName=" + ingredienttypeName;;
    }
}

$("#exceldownload").on('click', function () {
    var startDate = $('[data-datepicker-startdate]').datepicker('getDate');
    var endDate = $('[data-datepicker-enddate]').datepicker('getDate');
    var searchedText = $("#global_search").val().trim();
    var ingredientTypeId = $(".nav-tabs li a").filter(function () {
        return $(this).hasClass('active');
    }).attr('IngredientTypeId');

    if (
        (startDate != undefined && startDate != null && startDate != "") &&
        (endDate != undefined && endDate != null && endDate != "") &&
        (searchedText != undefined && searchedText != null && searchedText != "")
    ) {

        var formattedStartDate = FormateDateForSearch(startDate);
        var formattedEndDate = FormateDateForSearch(endDate);

        ExcelDownload(formattedStartDate, formattedEndDate, searchedText, ingredientTypeId);
    }
    else if (
        (startDate != undefined && startDate != null && startDate != "") &&
        (endDate != undefined && endDate != null && endDate != "") &&
        (searchedText == undefined || searchedText == null || searchedText == "")
    ) {
        var formattedStartDate = FormateDateForSearch(startDate);
        var formattedEndDate = FormateDateForSearch(endDate);

        ExcelDownload(formattedStartDate, formattedEndDate, '', ingredientTypeId);
    }

    else if (
        (startDate == undefined || startDate == null || startDate == "") &&
        (endDate == undefined || endDate == null || endDate == "")
    ) {
        ExcelDownload('', '', searchedText, ingredientTypeId);
    }
    else {
        ExcelDownload('', '', '')
    }

});

function DeleteIngredient(ingredientid) {

    handelConfirmPopup('Are you sure do you want to Delete ?',
        function () {
            $.ajax({
                type: "POST",
                url: ROOT + "NewRID/DeleteIngredient",
                data: {
                    IngredientId: ingredientid
                },
                dataType: "JSON",
                success: function (result) {
                    if (result.includes("Successfully")) {
                        window.location.reload();
                    }
                    else {
                        alert(result);
                    }
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
        },
    );

}

function handelConfirmPopup(msg, func) {
    $('#confirmpopupmesssage').empty().html(msg);
    $('#confirmpopup').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }
}
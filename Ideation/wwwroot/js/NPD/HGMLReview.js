
var jsonFormNpdData = $.parseJSON($('#JsonFormNpdData').val());
var jsonFormNpdHgmlReviewData = $.parseJSON($('#JsonFormNpdHgmlReviewData').val());


$(document).ready(function () {

    $('#Npd_ProjectName').val(jsonFormNpdData.ProjectDetails[0].ProjectName);
    $('#Npd_BusinessObjective').val(jsonFormNpdData.ProjectDetails[0].BusinessObjective);
    $('#PP_TargetConsumer').val(jsonFormNpdData.ProjectDetails[0].TargetConsumer);
    $('#PP_CompetitiveOfferings').val(jsonFormNpdData.ProjectDetails[0].CompetitiveOfferings);
    $('#PP_UnmetNeed').val(jsonFormNpdData.ProjectDetails[0].UnmetNeed);
    $('#Npd_InitiatorRemarks').val(jsonFormNpdData.ProjectDetails[0].InitiatorRemarks);

    $('#PD_HGML_Remarks').val(jsonFormNpdHgmlReviewData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
    $('#PP_HGML_Remarks').val(jsonFormNpdHgmlReviewData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
    $('#FP_HGML_Remarks').val(jsonFormNpdHgmlReviewData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
    $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlReviewData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
    $('#BI_HGML_Remarks').val(jsonFormNpdHgmlReviewData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);

    $('#HgmlDataSendToHubConfirmation').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].DoYouWantSentToHub);

    if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

        $('#HgmlData_HubDropdown').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].Hub)
        $('#HgmlData_HubUsersDropdown').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].HubUsers)
        $('#HgmlDataHgmlToHubRemarks').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].HgmlToHubRemarks)

        $("#HgmlData_SendToHub_Yes").show();
        $("#HgmlData_SendToHub_No").hide();

        $("#HGML_Data").jqGrid("clearGridData");
    }
    else if ($('#HgmlDataSendToHubConfirmation').val() == 'No') {

        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").show();
    }
    else
    {
        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").hide();
    }

    var DivId = $("#Division").val();
    var categoryId = $("#Category").val();

    $.ajax({
        type: "POST",
        url: ROOT + "User/GetCategoryBYId",
        data: { divisionId: DivId },
        dataType: "json",
        success: function (Categoryresult) {
            //
            if (Categoryresult != null) {
                $("option").remove(".CategoryOption");
                var CategoryList = '';

                $.each(Categoryresult, function (i, obj) {
                    //
                    if (obj.categoryID == categoryId) {
                        CategoryList = '<option class="CategoryOption" selected value="' + obj.categoryID + '">' + obj.categoryName + '</option>';
                    }
                    else {
                        CategoryList = '<option class="CategoryOption" value="' + obj.categoryID + '">' + obj.categoryName + '</option>';
                    }
                    $(".addCategoryOption").append(CategoryList);
                })
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
    
    $('.filterable .btn-filter').click(function () {
        var $panel = $(this).parents('.filterable'),
            $filters = $panel.find('.filters input'),
            $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function (e) {
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
            inputContent = $input.val().toLowerCase(),
            $panel = $input.parents('.filterable'),
            column = $panel.find('.filters th').index($input.parents('th')),
            $table = $panel.find('.table'),
            $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function () {
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
        }
    });
});

$("#HgmlDataSendToHubConfirmation").change(function () {
    var pofile = $("#HgmlDataSendToHubConfirmation").val();
    if (pofile == "Yes") {
        $("#HgmlData_SendToHub_Yes").show();
        $("#HgmlData_SendToHub_No").hide();

        $('#Button_SendToHub').show();
        $('#Button_SendToPmd').hide();

    }
    else if (pofile == "No") {
        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").show();

        $('#Button_SendToHub').hide();
        $('#Button_SendToPmd').show();
    }
    else {
        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").hide();
    }

});


//Business Objective

CKEDITOR.replace('Npd_BusinessObjective', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

//Competitive Offerings

CKEDITOR.replace('PP_CompetitiveOfferings', {
    height: 275,
    width: 950,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],

    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

//UnmetNeed

CKEDITOR.replace('PP_UnmetNeed', {
    height: 275,
    width: 950,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],

    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});



//Product Positioning

colmodels = [

    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ExpectedFeatures',
        label: 'Expected Features',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ExpectedBenefits',
        label: 'Expected Benefits',
        resizable: true,
        ignoreCase: true,
    },

],
    $("#Product_Positioning").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['ProductPositioning'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Product_Positioning tbody tr");
            var objHeader = $("#Product_Positioning tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


//Product Positioning : Formulation Profile

colmodels = [

    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DesiredIngredients',
        label: 'Desired Ingredients',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'IndicationOrConditions',
        label: 'Indication Conditions',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'MustHaveClaims',
        label: 'Must Have Claims',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'NiceToHaveClaims',
        label: 'Nice to Have Claims',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DosageForm',
        label: 'Dosage Form',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BenchmarkProducts',
        label: 'Benchmark Products',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DesiredProductCharacteristics',
        label: 'Desired Product Characteristics',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BenchmarkProductsImageDownload',
        label: 'Images',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
        return `<div class="text-center icon_section align-items-left">
                <a onclick="DownloadBenchmarkProductsImage(`+ options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `FP_DownloadBenchmarkProductsImage"><i class="fa fa-download mr-2" title="Edit"></i></a>
                </div>`;
        }
    },
    {
        name: 'BenchmarkProductsImage',
        label: 'Benchmark Products Image Hide',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },

],
    $("#Formulation_Profile").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['FormulationProfile'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_product',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Formulation_Profile tbody tr");
            var objHeader = $("#Formulation_Profile tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}



//Product Positioning : Packaging Profile

colmodels = [

    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'PrimaryPackaging',
        label: 'Primary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SecondaryPackaging',
        label: 'Secondary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TertiaryPackaging',
        label: 'Tertiary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BenchmarkProducts',
        label: 'Benchmark Products',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DesiredPackagingCharacteristics',
        label: 'Desired Packaging Characteristics',
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'Others',
        label: 'Others (If any)',
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'Mould',
        label: 'Mould',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ImagesUploadDownload',
        label: 'Images',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
            <a onclick="DownloadPackageImage(`+ options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `PPR_DownloadPackageImagesUpload"><i class="fa fa-download mr-2" title="Edit"></i></a>
            </div>`;
        }
    },
    {
        name: 'ImagesUpload',
        label: 'Images Hide',
        resizable: true,
        ignoreCase: true, 
        hidden: true
    },
],

    $("#Packaging_Profile").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['PackagingProfile'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Packaging_Profile tbody tr");
            var objHeader = $("#Packaging_Profile tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


//Business Information

colmodels = [
 
    {
        name: 'Product',
        label: 'Product',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedNamesOfProduct',
        label: 'Proposed Name&#8217;s of Product',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedLaunchDate',
        label: 'Proposed Launch Date',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedTP',
        label: 'Proposed TP',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedMRP',
        label: 'Proposed MRP',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ExpectedGP',
        label: 'Expected GP % ',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BusinessValue',
        label: 'Business Value <span class="Bus_val">(Y2 Quantity * Proposed Selling Price)</span>',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M1Quantity',
        label: 'M1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M2Quantity',
        label: 'M2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M3Quantity',
        label: 'M3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y1Quantity',
        label: 'Y1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y2Quantity',
        label: 'Y2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y3Quantity',
        label: 'Y3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UOM',
        label: 'UOM',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },

],

    $("#Business_Information").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['BusinessInformation'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_businessinfo',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Business_Information tbody tr");
            var objHeader = $("#Business_Information tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}

//HGML Data

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
            <a onclick = onEditHgmlData(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
            <a onclick = onDeleteHgmlData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
        </div>`;
        }
    },
    {
        name: 'ProductName',
        label: 'Product Name',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ParticipatingMarkets',
        label: 'Participating Markets',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProjectPriority',
        label: 'Project Priority',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
    },

],

    $("#HGML_Data").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdHgmlReviewData["HgmlDataList"],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_HGML',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#HGML_Data tbody tr");
            var objHeader = $("#HGML_Data tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}



data = [
    {
        //"Action": "",
        "Product": "Product1",
        "SKU": "SKU001",
        "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo (TBC)",
        "Proposedlaunchdate": "12-06-2022",
        "ProposedSellingPrice": "Rs 3 for 6 ml",
        "ProposedTP": "Rs 2 for 6 ml",
        "ProposedMRP": "Rs 2 for 6 ml",
        "ExpectedGP": "Rs 2 for 6 ml",
        "M1": "20,00,000.",
        "M2": "30,00,000.",
        "M3": "20,00,000.",
        "Y1": "2,20.00.000.",
        "Y2": "2,20,00,000.",
        "Y3": "3,70,00,000.",
        "UOM": "ml",
        "BusinessValue": "",
        "ProjectCategorization": "",
        "ComplexitytobeAssigned": "",
        "Stakeholders": "",
    },
    {
        //"Action": "",
        "Product": "Product2",
        "SKU": "SKU002",
        "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo ",
        "Proposedlaunchdate": "12-07-2022",
        "ProposedSellingPrice": "Rs 3 for 6 ml",
        "ProposedTP": "Rs 2 for 6 ml",
        "ProposedMRP": "Rs 2 for 6 ml",
        "ExpectedGP": "Rs 2 for 6 ml",
        "M1": "20,00,000.",
        "M2": "30,00,000.",
        "M3": "20,00,000.",
        "Y1": "2,20.00.000.",
        "Y2": "2,20,00,000.",
        "Y3": "3,70,00,000.",
        "UOM": "ml",
        "BusinessValue": "",
        "ProjectCategorization": "",
        "ComplexitytobeAssigned": "",
        "Stakeholders": "",
    },
    {
        //"Action": "",
        "Product": "Product3",
        "SKU": "SKU003",
        "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo (TBC)",
        "Proposedlaunchdate": "12-09-2022",
        "ProposedSellingPrice": "Rs 3 for 6 ml",
        "ProposedTP": "Rs 2 for 6 ml",
        "ProposedMRP": "Rs 2 for 6 ml",
        "ExpectedGP": "Rs 2 for 6 ml",
        "M1": "20,00,000.",
        "M2": "30,00,000.",
        "M3": "20,00,000.",
        "Y1": "2,20.00.000.",
        "Y2": "2,20,00,000.",
        "Y3": "3,70,00,000.",
        "UOM": "ml",
        "BusinessValue": "",
        "ProjectCategorization": "",
        "ComplexitytobeAssigned": "",
        "Stakeholders": "",
    },



]
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
                  <a class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fa fa-edit mr-2" title="Edit"></i></a>
                  <a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#DeleteModal" title="Delete"></i></a>
                  </div>`;
        }
    },
    {
        name: 'Product',
        label: 'Product',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedNamesofproduct',
        label: 'Proposed Name&#8217;s of Product',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Proposedlaunchdate',
        label: 'Proposed Launch Date',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedTP',
        label: 'Proposed TP',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedMRP',
        label: 'Proposed MRP',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ExpectedGP',
        label: 'Expected GP % ',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BusinessValue',
        label: 'Business Value',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M1',
        label: 'M1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M2',
        label: 'M2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M3',
        label: 'M3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y1',
        label: 'Y1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y2',
        label: 'Y2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y3',
        label: 'Y3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UOM',
        label: 'UOM',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },

],

    $("#business_info_view").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_businessinfo',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#business_info_view tbody tr");
            var objHeader = $("#business_info_view tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


$("#edit_info").click(function () {
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $("#product").val(productValue);
    var skuValue = $(tr).children("td").eq(2).text();
    $("#sku").val(skuValue);
    var ProposedValue = $(tr).children("td").eq(3).text();
    $("#proposed").val(ProposedValue);
    var dateValue = $(tr).children("td").eq(4).text();
    $("#date").val(dateValue);
    var PriceValue = $(tr).children("td").eq(5).text();
    $("#price").val(PriceValue);
    var MRPValue = $(tr).children("td").eq(6).text();
    $("#mrp_tp").val(MRPValue);
    var GPValue = $(tr).children("td").eq(7).text();
    $("#gp").val(GPValue);
    var m1Value = $(tr).children("td").eq(8).text();
    $("#m1").val(m1Value);
    var m2Value = $(tr).children("td").eq(9).text();
    $("#m2").val(m2Value);
    var m3Value = $(tr).children("td").eq(10).text();
    $("#m3").val(m3Value);
    var y1Value = $(tr).children("td").eq(11).text();
    $("#y1").val(y1Value);
    var y2Value = $(tr).children("td").eq(12).text();
    $("#y2").val(y2Value);
    var y3Value = $(tr).children("td").eq(13).text();
    $("#y3").val(y3Value);
});



$('.data-multiselect').multiselect({
    //includeSelectAllOption: true,
    //buttonWidth: 265,
    //enableCaseInsensitiveFiltering: true,
    //dropdownPosition: 'above',
    dropUp: true,
    //enableFiltering: true
});


$(".js-select2").select2({

    placeholder: "Select HUB",
    allowHtml: true,
    allowClear: false,
    includeSelectAllOption: true,

});

$(document).ready(function () {
    $('.example-dropUp').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',

        dropUp: true
    });
});



//Dependency dropdown for Category

$("#Division").change(function () {
    
    var DivId = $("#Division").val();
    $.ajax({
        type: "POST",
        url: ROOT + "User/GetCategoryBYId",
        data: { divisionId: DivId },
        dataType: "json",
        success: function (categoryResult) {
            
            if (categoryResult != null) {
                $("option").remove(".CategoryOption");
                $.each(categoryResult, function (i, obj) {
                    
                    var categoryList = '<option class="CategoryOption" value="' + obj.categoryID + '">' + obj.categoryName + '</option>';
                    $(".addCategoryOption").append(categoryList);
                })
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});


/*Code to get date*/
var todayDate = new Date();
$('#NPD_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));


//Dependency dropdown for Category

$("#HgmlData_HubDropdown").change(function () {
    
    var HubIds = $("#HgmlData_HubDropdown").val();
    $.ajax({
        type: "POST",
        url: ROOT + "Base/GetUserEmailBasedOnHub",
        data: { hubIds: HubIds },
        dataType: "json",
        success: function (UserEmailResult) {
            
            if (UserEmailResult != null) {
                $("option").remove(".HubUsersOption");
                var userEmailList=''
                $.each(UserEmailResult, function (i, obj) {
                    
                    userEmailList += '<option class="HubUsersOption" value="' + i + '">' + obj.hgmlDataHubUsersList + '</option>';

                    //$(".addHubUsersList").append(userEmailList);
                   
                })
                $("#HgmlData_HubUsersDropdown").html(userEmailList);
                //$("#HgmlData_HubUsersDropdown").multiselect('refresh'); //refresh the select here
                $('#HgmlData_HubUsersDropdown').multiselect('rebuild');
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
    $('.example-dropUp').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 5 ,
        buttonWidth: '100%',

        dropUp: true
    });
});


/*Validation and Inserting data to Table for HGML Data*/
var EditRowId1 = 0;

$("#HgmlData_ProductName").keyup(function () {
    $("#HgmlData_ProductName").val() == "" ? $("#Error_HgmlDataProductName").show() : $("#Error_HgmlDataProductName").hide();
});
$("#HgmlData_ParticipatingMarkets").keyup(function () {
    $("#HgmlData_ParticipatingMarkets").val() == "" ? $("#Error_HgmlDataParticipatingMarkets").show() : $("#Error_HgmlDataParticipatingMarkets").hide();
});
$("#HgmlData_ProjectPriority").change(function () {
    $("#HgmlData_ProjectPriority").val() == "" ? $("#Error_HgmlDataProjectPriority").show() : $("#Error_HgmlDataProjectPriority").hide();
});


$("#Add_HGML_Data").click(function () {

    
    var productName = $.trim($("#HgmlData_ProductName").val());
    var participatingMarkets = $.trim($("#HgmlData_ParticipatingMarkets").val());
    var projectPriority = $.trim($("#HgmlData_ProjectPriority").val());
    var flag1 = true;

    if (productName == "" || participatingMarkets == "" || projectPriority == "") {
        flag1 = false;

        productName == "" ? $("#Error_HgmlDataProductName").show() : $("#Error_HgmlDataProductName").hide();
        participatingMarkets == "" ? $("#Error_HgmlDataParticipatingMarkets").show() : $("#Error_HgmlDataParticipatingMarkets").hide();
        projectPriority == "" ? $("#Error_HgmlDataProjectPriority").show() : $("#Error_HgmlDataProjectPriority").hide();

    }

    if (flag1) {

        var griddata = [];
        var hgmlData = {};

        $('.Error_HgmlData').hide();

        hgmlData = {
            ProductName: productName,
            ParticipatingMarkets: participatingMarkets,
            ProjectPriority: projectPriority,
            Remarks: $("#HgmlData_Remarks").val()
        }

        if (EditRowId1 == 0) {

            griddata.push(hgmlData);
            var HD1 = $("#HGML_Data").jqGrid('getGridParam', 'data');
            var HD2 = $.merge(HD1, griddata);
            $("#HGML_Data").jqGrid('setGridParam', { data: HD2 });
            $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {

            $.each(hgmlData, function (key, value) {
                $("#HGML_Data").jqGrid('setCell', EditRowId1, key, value);
            });
            $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

            EditRowId1 = 0;
        }

        $('.HGMLData').val("");                            // To reset the textbox fields
    }
});

//On Clicking the edit button 
function onEditHgmlData(RowId) {

    
    EditRowId1 = RowId;

    $('.Error_HgmlData').hide();

    var DataFromTheRow = jQuery('#HGML_Data').jqGrid('getRowData', RowId);

    $('#HgmlData_ProductName').val(DataFromTheRow.ProductName);
    $('#HgmlData_ParticipatingMarkets').val(DataFromTheRow.ParticipatingMarkets);
    $('#HgmlData_ProjectPriority').val(DataFromTheRow.ProjectPriority);
    $('#HgmlData_Remarks').val(DataFromTheRow.Remarks);

}

//On deleting the row data
function onDeleteHgmlData(RowId) {
    
    $('div#jqGridRow_DeleteModal').modal('toggle');

    $('#jqGridRow_DeleteModal_Ok').click(function () {

        $("#HGML_Data").jqGrid('delRowData', RowId);
        $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

        $('.HGMLData').val("");
    });
}


//To download Benchmark Products Image
function DownloadBenchmarkProductsImage(rowId) {
    
    var filename = $('#Formulation_Profile').jqGrid('getCell', rowId, 'BenchmarkProductsImage');
    if (filename.length > 0) {
        $('#' + rowId + 'FP_DownloadBenchmarkProductsImage').prop("href", ROOT + "NewInitiation/DownloadImageFile?fileName=" + filename);
        return true;
    }
}

//To download Package Image
function DownloadPackageImage(rowId) {

    var filename = $('#Packaging_Profile').jqGrid('getCell', rowId, 'ImagesUpload');
    if (filename.length > 0) {
        $('#' + rowId + 'PPR_DownloadPackageImagesUpload').prop("href", ROOT + "NewInitiation/DownloadImageFile?fileName=" + filename);
        return true;
    }
}






// On click of Save button

function validateSaveForm() {
    
    var hgmlData = [];

    $('div#SaveModal').modal('show');

    $("#NPD_Save_Ok").click(function () {

        if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

            hgmlData = [{
                Hub: $('#HgmlData_HubDropdown').val(),
                HubUsers: $('#HgmlData_HubUsersDropdown').val(),
                HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
            }]
        }
        else if ($('#HgmlDataSendToHubConfirmation').val() == 'No') {

            hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
        }

        
        $('#HgmlData').val(JSON.stringify(hgmlData));
        $('#NpdStatus').val(2);

        document.getElementById('Npd_HGMLReview_Form_Submit').submit();

    });

}

// On click of Send Back Initiator button

function validateSendBackInitiatorForm() {
    
    var approvalStatus = [];
    var hgmlData = [];
    $('div#SendbackModal').modal('show');

    $("#NPD_SendBackToInitiator_Ok").click(function () {
        

        var sendBackToInitiatorRemarks = $('#PopUp_SendBackToInitiatorRemarks').val();
        if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

            hgmlData = [{
                Hub: $('#HgmlData_HubDropdown').val(),
                HubUsers: $('#HgmlData_HubUsersDropdown').val(),
                HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
            }]
        }
        else if ($('#HgmlDataSendToHubConfirmation').val() == 'No') {

            hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
        }

        approvalStatus = [{
            FromStage: 2,
            FromStageName: "HGML Review",
            Action: "Send Back",
            ToStage: 8,
            ToStageName: "Sent Back to Initiator"
        }];

        
        $('#HgmlData').val(JSON.stringify(hgmlData));
        $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
        $('#SendBackToInitiatorRemarks').val(sendBackToInitiatorRemarks);
        $('#NpdStatus').val(8);

        document.getElementById('Npd_HGMLReview_Form_Submit').submit();

    });
}

// On click of Send To HUB button

function validateSendToHubForm() {
    
    var flag = true;
    var approvalStatus = [];
    var hgmlData = [];
    $('#HgmlDataSendToHubConfirmation').val() == '' ? ($('#Error_DoYouWantSentToHUB').show(), flag = false) : $('#Error_DoYouWantSentToHUB').hide();

    if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

        flag = true;

        $('#HgmlData_HubDropdown').val() == '' ? ($('#Error_HgmlDataHub').show(), flag = false) : $('#Error_HgmlDataHub').hide();
        $('#HgmlData_HubUsersDropdown').val() == '' ? ($('#Error_HgmlDataHubUsers').show(), flag = false) : $('#Error_HgmlDataHubUsers').hide();
    }
    else {
        flag = false;
    }

    if (flag)
        $('div#SendToHubModal').modal('show');

    $("#NPD_SendToHub_Ok").click(function () {
        

        var sendToHubRemarks = $('#PopUp_SendToHubRemarks').val();

        hgmlData = [{
            Hub: $('#HgmlData_HubDropdown').val(),
            HubUsers: $('#HgmlData_HubUsersDropdown').val(),
            HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
        }];

        approvalStatus = [{
            FromStage: 2,
            FromStageName: "HGML Review",
            Action: "Send to HUB",
            ToStage: 3,
            ToStageName: "HUB Review"
        }];

        $('#HgmlData').val(JSON.stringify(hgmlData));
        $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
        $('#SendToHubRemarks').val(sendToHubRemarks);
        $('#NpdStatus').val(3);

        document.getElementById('Npd_HGMLReview_Form_Submit').submit();

    });
}



// On click of Send To PMD button

function validateSendToPmdForm() {
    
    var flag = true;

    $('#HgmlDataSendToHubConfirmation').val() == '' ? ($('#Error_DoYouWantSentToHUB').show(), flag = false) : $('#Error_DoYouWantSentToHUB').hide();

    var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

    if ($('#HgmlDataSendToHubConfirmation').val() == 'No') {

        flag = true;
        hgmlData.length === 0 ? ($('#Error_HgmlData').show(), flag = false) : $('#Error_HgmlData').hide();
    }
    else {
        flag = false;
    }

    if (flag) {

        $('div#SendToPmdModal').modal('show');

        $("#NPD_SendToPmd_Ok").click(function () {
            
            var sendToPmdRemarks = $('#PopUp_SendToPmdRemarks').val();

            approvalStatus = [{
                FromStage: 2,
                FromStageName: "HGML Review",
                Action: "Send to PMD",
                ToStage: 5,
                ToStageName: "PMD Review"
            }];

            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SendToPmdRemarks').val(sendToPmdRemarks);
            $('#NpdStatus').val(5);

            document.getElementById('Npd_HGMLReview_Form_Submit').submit();

        });
    }
}

// On click of Reject button

function validateRejectForm()
{
    
    var approvalStatus = [];

    $('div#RejectModal').modal('show');

    $("#NPD_Reject_Ok").click(function () {
        
        var rejectRemarks = $('#PopUp_RejectRemarks').val();

        approvalStatus = [{
            FromStage: 2,
            FromStageName: "HGML Review",
            Action: "Reject",
            ToStage: 7,
            ToStageName: "Rejected"
        }];

        
        $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
        $('#RejectRemarks').val(rejectRemarks);
        $('#NpdStatus').val(7);

        document.getElementById('Npd_HGMLReview_Form_Submit').submit();

    });
}


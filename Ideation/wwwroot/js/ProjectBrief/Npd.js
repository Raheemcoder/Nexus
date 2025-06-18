
var productPositioningProductNameList = [];
var formulationProfileProductNameList = [];
var packagingProfileProductNameList = [];
var businessInformationProductNameList = [];
var sustainabilityProductNameList = [];
var deleteImageIn_DocGrid = [];
var isPreview = 0;

$('.example-dropUp').multiselect({
    enableFiltering: true,
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 500,
    buttonWidth: '100%',
    dropUp: true
});


$('.data-datepicker').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'dd-mm-yyyy',
    startDate: '+0d'
});


CKEDITOR.replace('Npd_BusinessObjective', {
    height: 50,
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
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('PP_CompetitiveOfferings', {
    height: 50,
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
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('PP_UnmetNeed', {
    height: 50,
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
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('PP_ExpectedFeatures', {
    height: 50,
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
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('PP_ExpectedBenefits', {
    height: 50,
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

    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});


CKEDITOR.replace('PPR_PrimaryPackaging', {
    height: 50,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },

    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },
    ],
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('PPR_SecondaryPackaging', {
    height: 50,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },

    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },
    ],
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('PPR_TertiaryPackaging', {
    height: 50,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },
    ],
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('PPR_BenchmarkProducts', {
    height: 50,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    ],
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('PPR_DesiredPackagingCharacteristics', {
    height: 50,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },

    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },
    ],
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('PPR_Others', {
    height: 50,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },

    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    ],
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});


$("#Division").change(function () {
    var DivId = $("#Division").val();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/GetCategory",
        data: { divisionId: DivId },
        dataType: "json",
        success: function (categoryResult) {

            if (categoryResult != null) {
                $("option").remove(".CategoryOption");
                $.each(categoryResult, function (i, obj) {
                    var categoryList = '<option class="CategoryOption" value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                    $(".addCategoryOption").append(categoryList);
                });
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});

var todayDate = new Date();
$('#NPD_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));

var NPDHeaderTableData = [];
var ProjectDetailsData = [];
var ProductPositioningGridData = [];
var FormulationProfileGridData = [];
var PackagingProfileGridData = [];
var BusinessInformationGridData = [];
var InitiatorRemarksData = [];

var EditRowId1 = 0;
var flag1;

$("#Npd_ProjectName").focusout(function () {

    if ($('#Npd_ProjectName-error').text() == '') {
        $("#Npd_ProjectName").val() == "" ? $("#Error_Npd_ProjectName").show() : $("#Error_Npd_ProjectName").hide();
    }
});

CKEDITOR.instances.Npd_BusinessObjective.on('change', function () {
    if ($('#Npd_BusinessObjective-error').text() == '') {
        CKEDITOR.instances["Npd_BusinessObjective"].getData() == '' ? $("#Error_Npd_BusinessObjective").show() : $("#Error_Npd_BusinessObjective").hide();
    }
});
$("#PP_TargetConsumer").keyup(function () {
    $("#PP_TargetConsumer").val() == "" ? $("#Error_PP_TargetConsumer").show() : $("#Error_PP_TargetConsumer").hide();
});
$("#PP_Product").keyup(function () {
    $("#Error_PP_Product").hide().text('');
});
$("#PP_Product").focusout(function () {

    var productName = $.trim($("#PP_Product").val()).toLowerCase();
    productName == "" ? ($("#Error_PP_Product").show().text('Please enter Product Name')) : $("#Error_PP_Product").hide().text('');
    const productList = $("#Product_Positioning").jqGrid("getCol", "Product");

    if (productName != "") {
        var flag = 0;
        productList.forEach(function (item, index) {
            if ($.trim(item).toLowerCase() == productName && EditRowId1 != (index + 1)) {
                flag1 = false;
                flag = 1;
            }
        });

        flag == 1 ? ($("#Error_PP_Product").show().text('Product already exists. Please add another product')) : $("#Error_PP_Product").hide().text('');
    }
});
CKEDITOR.instances['PP_ExpectedFeatures'].on('change', function () {
    CKEDITOR.instances["PP_ExpectedFeatures"].getData() == '' ? $("#Error_PP_ExpectedFeatures").show() : $("#Error_PP_ExpectedFeatures").hide();
});
CKEDITOR.instances['PP_ExpectedBenefits'].on('change', function () {
    CKEDITOR.instances["PP_ExpectedBenefits"].getData() == '' ? $("#Error_PP_ExpectedBenefits").show() : $("#Error_PP_ExpectedBenefits").hide();
});


colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 70,
        resizable: true,
        ignoreCase: true,
        align: 'top',
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="action_icons">
              <a onclick=onEditProductPositioning(` + options.rowId + `) class="edit" title="Edit" id="edit_info"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
              <a onclick=onDeleteProductPositioning(` + options.rowId + `) class="" title="Delete" ><i class="fas fa-trash color-delete" title="Delete"></i></a>
              </div>`;
        }
    },
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
    {
        name: 'Sku',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
    },
],

    $("#Product_Positioning").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
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

$("#Product_Positioning_V").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_worksheet_V',
    rowNum: 20,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Product_Positioning_V tbody tr");
        var objHeader = $("#Product_Positioning_V tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#Product_Positioning_V").jqGrid('hideCol', "Action");

    }
});
$("#Add_ProductPositioning").click(function () {

    var TargetConsumer = $.trim($("#PP_TargetConsumer").val());
    var Product = $.trim($("#PP_Product").val());
    var ExpectedFeatures = $.trim(CKEDITOR.instances["PP_ExpectedFeatures"].getData());
    var ExpectedBenefits = $.trim(CKEDITOR.instances["PP_ExpectedBenefits"].getData());
    var sku = $.trim($("#PP_Sku").val());
    var flag1 = true;

    var contentWithoutTags = ExpectedFeatures.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var ExpectedFeaturesactualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    var contentWithoutTags = ExpectedBenefits.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var ExpectedBenefitsactualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    var tempSku = sku?.replace(/(^,|,$)/g, '').replace(/,,+/g, ',');
    var arr = tempSku?.split(/\s*,\s*/);
    var uniqueArr = [];
    var uniqueObj = {};
    arr?.forEach(function (item) {
        var lowerItem = item.toLowerCase().replace(/\s+/g, '');
        if (!uniqueObj[lowerItem]) {
            uniqueObj[lowerItem] = true;
            uniqueArr.push(item.toLowerCase());
        }
    });
    var resultSku = uniqueArr.join(',').replace(/(^,|,$)/g, '').replace(/,,+/g, ',');
    sku = resultSku.replaceAll(',', ', ');

    $('.Error_ProductPositioning').hide();

    var productList = $("#Product_Positioning").jqGrid("getCol", "Product");
    var flag = 0;
    productList.forEach(function (item, index) {

        if ($.trim(item).toLowerCase() == Product.toLowerCase() && EditRowId1 != (index + 1)) {

            flag1 = false;
            flag = 1;
        }
    });

    flag == 1 ? ($("#Error_PP_Product").show().text('Product already exists. Please add another product')) : $("#Error_PP_Product").hide().text('');

    if (TargetConsumer == "" || Product == "" || ExpectedFeaturesactualData == "" || ExpectedBenefitsactualData == "" || sku == "") {
        flag1 = false;
        TargetConsumer == "" ? $("#Error_PP_TargetConsumer").show() : $("#Error_PP_TargetConsumer").hide();
        Product == "" ? $("#Error_PP_Product").show().text('Please enter Product Name') : $("#Error_PP_Product").hide().text('');
        ExpectedFeaturesactualData == "" ? $("#Error_PP_ExpectedFeatures").show() : $("#Error_PP_ExpectedFeatures").hide();
        ExpectedBenefitsactualData == "" ? $("#Error_PP_ExpectedBenefits").show() : $("#Error_PP_ExpectedBenefits").hide();
        sku == "" ? $("#Error_PP_Sku").show() : $("#Error_PP_Sku").hide();
    }

    if (flag1) {
        $(".Error_ProductPositioning").hide();
        var griddata = [];
        var ProductPositioning = {};

        ProductPositioning = {
            Product: $.trim($("#PP_Product").val()),
            ExpectedFeatures: CKEDITOR.instances["PP_ExpectedFeatures"].getData(),
            ExpectedBenefits: CKEDITOR.instances["PP_ExpectedBenefits"].getData(),
            Sku: sku
        }

        $('.ProductPositioning').val("");                            // To reset the text box fields

        CKEDITOR.instances["PP_ExpectedFeatures"].setData('');
        CKEDITOR.instances["PP_ExpectedBenefits"].setData('');

        CKEDITOR.instances['PP_ExpectedFeatures'].on('change', function () {
            $("#Error_PP_ExpectedFeatures").hide();
        });
        CKEDITOR.instances['PP_ExpectedBenefits'].on('change', function () {
            $("#Error_PP_ExpectedBenefits").hide();
        });

        if (EditRowId1 == 0) {
            griddata.push(ProductPositioning);
            var PP1 = $("#Product_Positioning").jqGrid('getGridParam', 'data');
            var PP2 = $.merge(PP1, griddata);
            $("#Product_Positioning").jqGrid('setGridParam', { data: PP2 });
            $("#Product_Positioning").trigger('reloadGrid', [{ page: 1 }]);

            $("#Product_Positioning_V").jqGrid('setGridParam', { data: PP2 });
            $("#Product_Positioning_V").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            var previousRowData = jQuery("#Product_Positioning").jqGrid('getRowData', EditRowId1);
            var oldProductName = previousRowData.Product;

            if (Product != oldProductName) {

                var formulationProfileData = formulationProfileData_1;
                var packagingProfileData = packagingProfileData_1;
                var businessInformationData = $("#Business_Information").jqGrid('getGridParam', 'data');
                var sustainabilityData = $("#Table_Sustainability").jqGrid('getGridParam', 'data');

                $.each(formulationProfileData, function (i, fpData) {
                    if (fpData.Product == oldProductName) {

                        formulationProfileData_1[i].Product = Product;
                        $("#FP_Table_" + i + " span.FP_Product").text(Product);
                    }
                });
                $.each(packagingProfileData, function (i, pprData) {
                    if (pprData.Product == oldProductName) {

                        packagingProfileData_1[i].Product = Product;
                        $("#PPR_Table_" + i + " span.PPR_Product").text(Product);
                    }
                });
                $.each(businessInformationData, function (i, biData) {
                    if (biData.Product == oldProductName) {

                        $("#Business_Information").jqGrid('setCell', (i + 1), "Product", Product, { width: 90 } );
                    }
                });
                $.each(sustainabilityData, function (i, susData) {
                    if (susData.Product == oldProductName) {

                        $("#Table_Sustainability").jqGrid('setCell', (i + 1), "Product", Product);
                    }
                });
            }

            $("#Product_Positioning").jqGrid('setRowData', EditRowId1, ProductPositioning);
            $("#Product_Positioning").trigger('reloadGrid', [{ page: 1 }]);

            $("#Product_Positioning_V").jqGrid('setRowData', EditRowId1, ProductPositioning);
            $("#Product_Positioning_V").trigger('reloadGrid', [{ page: 1 }]);

            EditRowId1 = 0;
        }

        productPositioningProductNameList = jQuery('#Product_Positioning').jqGrid("getCol", "Product");

        formulationProfileProductNameList = formulationProfileData_1.map(m => m.Product);
        formulationProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, formulationProfileProductNameList) == -1 });

        packagingProfileProductNameList = packagingProfileData_1.map(m => m.Product);
        packagingProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, packagingProfileProductNameList) == -1 });

        businessInformationProductNameList = $("#Business_Information").jqGrid("getCol", "Product");
        businessInformationProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, businessInformationProductNameList) == -1 });

        sustainabilityProductNameList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, sustainabilityProductNameList) == -1 });

        $("option").remove("#FP_Product .ProductOption");
        if (formulationProfileProductNameList.length > 0) {

            var productOption = "";

            $.each(formulationProfileProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#FP_Product").append(productOption);
        }

        $("option").remove("#PPR_Product .ProductOption");
        $("option").remove("#BI_Product .ProductOption");
        if (productPositioningProductNameList.length > 0) {
            var productOption = "";
            $.each(productPositioningProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PPR_Product").append(productOption);
            $("#BI_Product").append(productOption);
        }

        $("option").remove("#SUS_Product .ProductOption");
        if (sustainabilityProductNameList.length > 0) {
            var productOption = "";
            $.each(sustainabilityProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#SUS_Product").append(productOption);
        }
    }
});

function onEditProductPositioning(RowId) {
    EditRowId1 = RowId;
    $(".Error_ProductPositioning").hide();
    var DataFromTheRow = jQuery('#Product_Positioning').jqGrid('getRowData', RowId);

    $('#PP_Product').val(DataFromTheRow.Product);
    CKEDITOR.instances["PP_ExpectedFeatures"].setData(DataFromTheRow.ExpectedFeatures);
    CKEDITOR.instances["PP_ExpectedBenefits"].setData(DataFromTheRow.ExpectedBenefits);
    $('#PP_Sku').val(DataFromTheRow.Sku);

}

function onDeleteProductPositioning(RowId) {

    confirm("Deleting a Product from Product Positioning will delete all the records in Formulation Profile, Packaging Profile, Sustainability and Business Information respective to that Product. <br>  Are you sure you want to delete?", function () {
        var formulationProfileRowId = [];
        var packagingProfileRowId = [];
        var businessInformationRowId = [];
        var sustainabilityRowId = [];

        var productPositioningData = jQuery('#Product_Positioning').jqGrid('getRowData', RowId);
        var ppProductName = productPositioningData.Product;
        var formulationProfileData = formulationProfileData_1;
        var packagingProfileData = packagingProfileData_1;
        var businessInformationData = $("#Business_Information").jqGrid('getGridParam', 'data');
        var sustainabilityData = $("#Table_Sustainability").jqGrid('getGridParam', 'data');

        $.each(formulationProfileData, function (i, fpData) {
            if (fpData != undefined) {
                if (fpData.Product == ppProductName) {
                    formulationProfileRowId.push(i);
                }
            }
        });
        $.each(packagingProfileData, function (i, pprData) {
            if (pprData != undefined) {
                if (pprData.Product == ppProductName) {
                    packagingProfileRowId.push(i);
                }
            }
        });
        $.each(businessInformationData, function (i, biData) {

            if (biData.Product == ppProductName) {
                businessInformationRowId.push(i + 1);
            }
        });
        $.each(sustainabilityData, function (i, susData) {

            if (susData.Product == ppProductName) {
                sustainabilityRowId.push(i + 1);
            }
        });

        $("#Product_Positioning").jqGrid('delRowData', RowId);
        $("#Product_Positioning").trigger('reloadGrid', [{ page: 1 }]);

        $.each(formulationProfileRowId.reverse(), function (i, fpRowId) {
            onDeleteFormulationProfile(fpRowId, '#FP_Table_' + fpRowId, 1);
        });

        $.each(packagingProfileRowId, function (i, pprRowId) {
            onDeletePackagingProfile(pprRowId, '#PPR_Table_' + pprRowId, 1);
        });

        $.each(businessInformationRowId.reverse(), function (i, biRowId) {

            $("#Business_Information").jqGrid('delRowData', biRowId);
            $("#Business_Information").trigger('reloadGrid', [{ page: 1 }]);
        });

        $.each(sustainabilityRowId.reverse(), function (i, susRowId) {

            $("#Table_Sustainability").jqGrid('delRowData', susRowId);
            $("#Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);
        });

        productPositioningProductNameList = jQuery('#Product_Positioning').jqGrid("getCol", "Product");

        formulationProfileProductNameList = formulationProfileData_1.map(m => m.Product);
        formulationProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, formulationProfileProductNameList) == -1 });

        packagingProfileProductNameList = packagingProfileData_1.map(m => m.Product);
        packagingProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, packagingProfileProductNameList) == -1 });

        businessInformationProductNameList = $("#Business_Information").jqGrid("getCol", "Product");
        businessInformationProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, businessInformationProductNameList) == -1 });

        sustainabilityProductNameList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, sustainabilityProductNameList) == -1 });

        $("option").remove("#FP_Product .ProductOption");
        if (formulationProfileProductNameList.length > 0) {
            var productOption = "";
            $.each(formulationProfileProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#FP_Product").append(productOption);
        }

        $("option").remove("#PPR_Product .ProductOption");
        $("option").remove("#BI_Product .ProductOption");
        if (productPositioningProductNameList.length > 0) {
            var productOption = "";
            $.each(productPositioningProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PPR_Product").append(productOption);
            $("#BI_Product").append(productOption);
        }

        $("option").remove("#SUS_Product .ProductOption");
        if (sustainabilityProductNameList.length > 0) {
            var productOption = "";
            $.each(sustainabilityProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#SUS_Product").append(productOption);
        }

        EditRowId1 = 0;
    });
}

$("#FP_Product").change(function () {

    var productName = $("#FP_Product").val();
    const productList = formulationProfileData_1.map(m => m.Product);
    productName == "" ? ($("#Error_FP_Product").show().text('Please select Product')) : $("#Error_FP_Product").hide().text('');
    if (productName != "") {
        productList.includes(productName) ? ($("#Error_FP_Product").show().text('This Product already consists the definition, Please select the different Product')) : $("#Error_FP_Product").hide().text('');
    }
});
$("#FP_DesiredIngredients").keyup(function () {
    $("#FP_DesiredIngredients").val() == "" ? $("#Error_FP_DesiredIngredients").show() : $("#Error_FP_DesiredIngredients").hide();
});
$("#FP_MustHaveClaims").keyup(function () {
    $("#FP_MustHaveClaims").val() == "" ? $("#Error_FP_MustHaveClaims").show() : $("#Error_FP_MustHaveClaims").hide();
});
$("#FP_NiceToHaveClaims").keyup(function () {
    $("#FP_NiceToHaveClaims").val() == "" ? $("#Error_FP_NiceToHaveClaims").show() : $("#Error_FP_NiceToHaveClaims").hide();
});
$("#FP_BenchmarkProducts").keyup(function () {
    $("#FP_BenchmarkProducts").val() == "" ? $("#Error_FP_BenchmarkProducts").show() : $("#Error_FP_BenchmarkProducts").hide();
});

var formulationProfileData_1 = [];
var FormulationimageGridData = [];
var FormulationimageGrid = [];
var fpRowId = -1;
var EditRowId2 = -1;

$("#Add_FormulationProfile").click(function () {
    var Product = $.trim($("#FP_Product").val());
    var DesiredIngredients = $.trim($("#FP_DesiredIngredients").val());
    var MustHaveClaims = $.trim($("#FP_MustHaveClaims").val());
    var NiceToHaveClaims = $.trim($("#FP_NiceToHaveClaims").val());
    var BenchmarkProducts = $.trim($("#FP_BenchmarkProducts").val());
    var flag2 = true;

    EditRowId2 == -1 && $("#Error_FP_Product").text() != '' ? flag2 = false : "";

    if (Product == "" || DesiredIngredients == "" || MustHaveClaims == "" || NiceToHaveClaims == "" || BenchmarkProducts == "") {
        flag2 = false;
        Product == "" ? $("#Error_FP_Product").show().text('Please select Product') : $("#Error_FP_Product").hide().text('');
        DesiredIngredients == "" ? $("#Error_FP_DesiredIngredients").show() : $("#Error_FP_DesiredIngredients").hide();
        MustHaveClaims == "" ? $("#Error_FP_MustHaveClaims").show() : $("#Error_FP_MustHaveClaims").hide();
        NiceToHaveClaims == "" ? $("#Error_FP_NiceToHaveClaims").show() : $("#Error_FP_NiceToHaveClaims").hide();
        BenchmarkProducts == "" ? $("#Error_FP_BenchmarkProducts").show() : $("#Error_FP_BenchmarkProducts").hide();
    }

    if (flag2) {

        var griddata = [];
        var FormulationProfile = {};

        var BenchmarkImageFileName = "";

        var BenchmarkProductsImagePath = SaveBenchmarkProductsImageFile();

        if (BenchmarkProductsImagePath == "") {
            BenchmarkImageFileName = $('#Display_FP_BenchmarkProductsImage').text();
        }
        else if (BenchmarkProductsImagePath != "") {
            $.each(BenchmarkProductsImagePath, function (k, obj) {

                if (k + 1 == BenchmarkProductsImagePath.length) {
                    BenchmarkImageFileName += obj;
                }
                else if (k == 0) {
                    BenchmarkImageFileName = obj + ',';
                }
                else {
                    BenchmarkImageFileName += obj + ',';
                }
            });
        }
        BenchmarkProductsImagePathName = BenchmarkImageFileName;

        FormulationProfile = {
            Product: $("#FP_Product").val(),
            DesiredIngredients: $("#FP_DesiredIngredients").val(),
            IndicationOrConditions: $("#FP_IndicationOrConditions").val(),
            MustHaveClaims: $("#FP_MustHaveClaims").val(),
            NiceToHaveClaims: $("#FP_NiceToHaveClaims").val(),
            DosageForm: $("#FP_DosageForm").val(),
            BenchmarkProducts: $("#FP_BenchmarkProducts").val(),
            DesiredProductCharacteristics: $("#FP_DesiredProductCharacteristics").val(),
            BenchmarkProductsImageHide: BenchmarkProductsImagePathName
        }

        if (EditRowId2 == -1) {

            fpRowId = fpRowId + 1;

            formulationProfileData_1[fpRowId] = FormulationProfile;

            var htmlTag =
                `<table id="FP_Table_` + (fpRowId) + `" style="width:100%">
                    <thead>
                        <tr>
                            <th colspan="4">
                                <b>Product : </b>
                                <span class="FP_Product">`+ FormulationProfile.Product + `</span>
                                <span>
                                    <div class="justify-center_1">
                                        <a onclick="onEditFormulationProfile(`+ fpRowId + `)" class="btn-icon -edit edithide"><i class="fas fa-edit" title="Edit"></i></a>
                                        <a onclick="onDeleteFormulationProfile(`+ fpRowId + `,'#FP_Table_` + fpRowId + `',0)" class="btn-icon -delete deletehide"><i class="fas fa-trash" data-bs-toggle="modal" title="Delete"></i></a>
                                          
                                      ${FormulationProfile.BenchmarkProductsImageHide.length == '' || FormulationProfile.BenchmarkProductsImageHide == null ? '' : `
              					      <a onclick="DispalyImages(` + fpRowId + `)" class="btn-icon -info imagesinfo" id="` + fpRowId + `_Images" title="Images info">
                                     <i class="fas fa-images" data-bs-toggle="modal" title="Images"></i>
                                        </a>`
                }
                                    </div>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width:25%;">
                                <span class="remarkss"><b>Desired Ingredients : </b></span>
                                <span>`+ FormulationProfile.DesiredIngredients + `</span>
                            </td>
                            <td style="width:25%;">
                                <span class="remarkss"><b>Indication / Condition : </b></span>
                                <span>`+ FormulationProfile.IndicationOrConditions + `</span>
                            </td>
                            <td>
                                <span class="remarkss"><b>Must have claims : </b></span>
                                <span>`+ FormulationProfile.MustHaveClaims + `</span>
                            </td>
                            <td>
                                <span class="remarkss"><b>Nice to have claims : </b></span>
                                <span>`+ FormulationProfile.NiceToHaveClaims + `</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="remarkss"><b>Dosage Form : </b></span>
                                <span>`+ FormulationProfile.DosageForm + `</span>
                            </td>
                            <td>
                                <span class="remarkss"><b>Benchmark Products : </b></span>
                                <span>`+ FormulationProfile.BenchmarkProducts + `</span>
                            </td>
                            <td colspan="2">
                                <span class="remarkss"><b>Desired Product Characteristics :</b></span>
                                <span>`+ FormulationProfile.DesiredProductCharacteristics + `</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br class="FP_Table_Break`+ fpRowId + `" />`;

            $('.Formulation_Profile_Table').append(htmlTag);
            if (BenchmarkProductsImagePathName != "") {

                BenchmarkProductsImagePathName = BenchmarkProductsImagePathName.split(',');
                $.each(BenchmarkProductsImagePathName, function (i, j) {
                    var imagedata = {}
                    imagedata = {
                        TableClass: fpRowId,
                        Image: BenchmarkProductsImagePathName[i],
                    }
                    FormulationimageGrid.push(imagedata);

                });
            }
        }
        else {

            var DataFromTheRow = formulationProfileData_1[EditRowId2];
            var htmlTag = "";
            var editedRowdata;
            var tableId = "#FP_Table_" + EditRowId2;

            formulationProfileData_1[EditRowId2] = FormulationProfile;

            if ($("#FP_BenchmarkProductsImage").val() != '' && DataFromTheRow.BenchmarkProductsImageHide.length > 0) {

                $.ajax({
                    type: 'POST',
                    url: ROOT + "ProjectBrief/DeleteImageFile",
                    data: { fileName: DataFromTheRow.BenchmarkProductsImageHide },
                    success: function (data) {

                    }
                });
            }

            if ($("#FP_BenchmarkProductsImage").val() == '' && DataFromTheRow.BenchmarkProductsImageHide.length > 0) {

                FormulationProfile = {
                    Product: Product,
                    DesiredIngredients: $("#FP_DesiredIngredients").val(),
                    IndicationOrConditions: $("#FP_IndicationOrConditions").val(),
                    MustHaveClaims: $("#FP_MustHaveClaims").val(),
                    NiceToHaveClaims: $("#FP_NiceToHaveClaims").val(),
                    DosageForm: $("#FP_DosageForm").val(),
                    BenchmarkProducts: $("#FP_BenchmarkProducts").val(),
                    DesiredProductCharacteristics: $("#FP_DesiredProductCharacteristics").val(),
                    BenchmarkProductsImageHide: BenchmarkProductsImagePathName
                }

                formulationProfileData_1[EditRowId2] = FormulationProfile;
            }

            editedRowdata = formulationProfileData_1[EditRowId2];

            htmlTag =
                `<thead>
                        <tr>
                            <th colspan="4">
                                <b>Product : </b>
                                <span class="FP_Product">`+ editedRowdata.Product + `</span>
                                <span>
                                    <div class="justify-center_1">
                                        <a onclick="onEditFormulationProfile(`+ EditRowId2 + `)" class="btn-icon -edit edithide"><i class="fas fa-edit" title="Edit"></i></a>
                                        <a onclick="onDeleteFormulationProfile(`+ EditRowId2 + `,'#FP_Table_` + EditRowId2 + `',0)" class="btn-icon -delete deletehide"><i class="fas fa-trash" data-bs-toggle="modal" title="Delete"></i></a>                          
                                      ${editedRowdata.BenchmarkProductsImageHide.length == '' || editedRowdata.BenchmarkProductsImageHide == null ? '' : `
									 <a onclick="DispalyImages(` + EditRowId2 + `)" class="btn-icon -info imagesinfo" id="` + EditRowId2 + `_Images" title="Images info"> <i class="fas fa-images" data-bs-toggle="modal" title="Images"></i></a>`
                }
                                    </div>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width:25%;">
                                <span class="remarkss"><b>Desired Ingredients : </b></span>
                                <span>`+ editedRowdata.DesiredIngredients + `</span>
                            </td>
                            <td style="width:25%;">
                                <span class="remarkss"><b>Indication / Condition : </b></span>
                                <span>`+ editedRowdata.IndicationOrConditions + `</span>
                            </td>
                            <td>
                                <span class="remarkss"><b>Must have claims : </b></span>
                                <span>`+ editedRowdata.MustHaveClaims + `</span>
                            </td>
                            <td>
                                <span class="remarkss"><b>Nice to have claims : </b></span>
                                <span>`+ editedRowdata.NiceToHaveClaims + `</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="remarkss"><b>Dosage Form : </b></span>
                                <span>`+ editedRowdata.DosageForm + `</span>
                            </td>
                            <td>
                                <span class="remarkss"><b>Benchmark Products : </b></span>
                                <span>`+ editedRowdata.BenchmarkProducts + `</span>
                            </td>
                            <td colspan="2">
                                <span class="remarkss"><b>Desired Product Characteristics :</b></span>
                                <span>`+ editedRowdata.DesiredProductCharacteristics + `</span>
                            </td>
                        </tr>
                    </tbody>  
                    `
                ;

            $(tableId).html(htmlTag);
            if (BenchmarkProductsImagePathName != "") {
                var editedTableClass = EditRowId2
                var deletePresentedTable = []
                if (FormulationimageGrid.length > 0) {
                    for (i = 0; i < FormulationimageGrid.length; i++) {
                        if (editedTableClass == FormulationimageGrid[i].TableClass) {
                            deletePresentedTable.push(editedTableClass)
                        }
                    }
                }
                FormulationimageGrid = FormulationimageGrid.filter(obj1 =>
                    !deletePresentedTable.some(obj2 =>
                        obj2 === obj1.TableClass
                    )
                );

                var BenchmarkProductsImagePathName = BenchmarkProductsImagePathName.split(',');
                $.each(BenchmarkProductsImagePathName, function (i, j) {

                    var imagedata = {}
                    imagedata = {
                        TableClass: editedTableClass,
                        Image: BenchmarkProductsImagePathName[i],
                    }
                    FormulationimageGrid.push(imagedata);
                });

            }
            EditRowId2 = -1;

        }
        BenchmarkImageFileName = "";
        $('.FormulationProfile').val("");                            // To reset the textbox fields
        $("#Display_FP_BenchmarkProductsImage").empty();

        var productList = formulationProfileData_1.map(m => m.Product);
        formulationProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        $("option").remove("#FP_Product .ProductOption");

        if (formulationProfileProductNameList.length > 0) {

            var productOption = "";

            $.each(formulationProfileProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#FP_Product").append(productOption);
        }
    }
});


//On Clicking the edit button 
function onEditFormulationProfile(RowId) {
    EditRowId2 = RowId;

    $(".Error_FormulationProfile").hide();

    var DataFromTheRow = formulationProfileData_1[EditRowId2];
    var productList = formulationProfileData_1.map(m => m.Product);

    formulationProfileProductNameList = $.grep(formulationProfileProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    formulationProfileProductNameList.push(DataFromTheRow.Product);

    $("option").remove("#FP_Product .ProductOption");

    if (formulationProfileProductNameList.length > 0) {

        var productOption = "";
        $.each(formulationProfileProductNameList, function (i, obj) {

            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });

        $("#FP_Product").append(productOption);
    }

    $('#FP_Product').val(DataFromTheRow.Product);
    $('#FP_DesiredIngredients').val(DataFromTheRow.DesiredIngredients);
    $('#FP_IndicationOrConditions').val(DataFromTheRow.IndicationOrConditions);
    $('#FP_MustHaveClaims').val(DataFromTheRow.MustHaveClaims);
    $('#FP_NiceToHaveClaims').val(DataFromTheRow.NiceToHaveClaims);
    $('#FP_DosageForm').val(DataFromTheRow.DosageForm);
    $('#FP_BenchmarkProducts').val(DataFromTheRow.BenchmarkProducts);
    $('#FP_DesiredProductCharacteristics').val(DataFromTheRow.DesiredProductCharacteristics);

    $("#Display_FP_BenchmarkProductsImage").text(DataFromTheRow.BenchmarkProductsImageHide);
    $('#FP_BenchmarkProductsImage').val('');
}

function onDeleteFormulationProfile(RowId = 0, tableId, flag = 0) {

    var DataFromTheRow = formulationProfileData_1[RowId];
    var FileName = DataFromTheRow.BenchmarkProductsImageHide;
    var path = "";
    if (flag == 1) {

        if (FileName != '') {
            $.ajax({
                type: 'POST',
                url: ROOT + "ProjectBrief/DeleteImageFile",
                data: { fileName: FileName },
                success: function (data) {
                    path = data;
                }
            });
        }
        delete formulationProfileData_1[RowId];
        $(tableId).remove();
        $(`.FP_Table_Break` + RowId).remove();

    }
    else {

        confirm("Are you sure You want to delete?", function () {

            if (FileName != '') {
                $.ajax({
                    type: 'POST',
                    url: ROOT + "ProjectBrief/DeleteImageFile",
                    data: { fileName: FileName },
                    success: function (data) {
                        path = data;
                    }
                });
            }

            delete formulationProfileData_1[RowId];
            $(tableId).remove();
            $(`.FP_Table_Break` + RowId).remove();


            $('.FormulationProfile').val("");                            // To reset the textbox fields
            $('#Display_FP_BenchmarkProductsImage').empty();
            EditRowId2 = -1;

            var productList = formulationProfileData_1.map(m => m.Product);
            productPositioningProductNameList = $("#Product_Positioning").jqGrid("getCol", "Product");
            formulationProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });

            $("option").remove("#FP_Product .ProductOption");

            if (formulationProfileProductNameList.length > 0) {
                var productOption = "";
                $.each(formulationProfileProductNameList, function (i, obj) {

                    if (obj != "") {
                        productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                    }
                });

                $("#FP_Product").append(productOption);
            }
        });
    }
}
function DownloadBenchmarkProductsImage(rowId) {

    var filename = formulationProfileData_1[rowId].BenchmarkProductsImageHide;
    if (filename.length > 0) {
        $('#' + rowId + 'DownloadBenchmarkProductsImage').prop("href", ROOT + "ProjectBrief/DownloadImageFile?fileName=" + filename);
        return true;
    }
    else {
        $('#' + rowId + 'DownloadBenchmarkProductsImage').empty().text('No Image Present');
    }
}

function SaveBenchmarkProductsImageFile() {

    var fileName = [];
    var files = $('#FP_BenchmarkProductsImage').prop("files");
    for (var i = 0; i < files.length; i++) {
        var formData = new FormData();
        formData.append("file", files[i]);
        $.ajax({
            type: 'POST',
            url: ROOT + "ProjectBrief/SaveImageFile",
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                fileName.push(data.replaceAll('"', ''));
            }
        });
    }
    return fileName;
}

$("#FP_BenchmarkProductsImage").change(function () {
    $("#Display_FP_BenchmarkProductsImage").empty();
});

//************************ Product Profile: Packaging Profile**********************//

$("#PPR_Product").change(function () {

    var productName = $.trim($("#PPR_Product").val());

    productName == "" ? ($("#Error_PPR_Product").show().text('Please select Product')) : $("#Error_PPR_Product").hide().text('');

    var productPositioningData = $("#Product_Positioning").jqGrid("getGridParam", "data");
    var skuArray = [];

    $.each(productPositioningData, function (i, data) {

        if ($.trim(data.Product) == productName) {

            skuArray = data.Sku?.split(',').map(item => item.trim());
        }
    });

    var skuOption = "";

    skuArray.forEach(function (item, index) {

        skuOption += `<option class="SkuOption" value="` + item + `" >` + item + `</option>`
    });

    $("option").remove("#PPR_SKU .SkuOption");

    $('#PPR_SKU').append(skuOption).multiselect('rebuild');
});

$("#PPR_SKU").change(function () {
    $("#PPR_SKU").val() == "" ? $("#Error_PPR_SKU").show() : $("#Error_PPR_SKU").hide();
});
//});
CKEDITOR.instances['PPR_PrimaryPackaging'].on('change', function () {
    CKEDITOR.instances["PPR_PrimaryPackaging"].getData() == '' ? '' : $("#Error_PPR_PrimaryPackaging").hide();
});
//});
var packagingProfileData_1 = [];
var ppRowId = -1;
EditRowId3 = -1;
var imageGridData = [];
var imageGrid = [];

//***********Adding PackagingProfile**********************


$("#Add_PackagingProfile").click(function () {
    var Product = $.trim($("#PPR_Product").val());
    var SKU = $.trim($("#PPR_SKU").val());
    var PrimaryPackaging = $.trim(CKEDITOR.instances["PPR_PrimaryPackaging"].getData());
    var flag3 = true;

    $(".Error_PackagingProfile").hide();

    EditRowId3 == -1 && $("#Error_PPR_Product").text() != '' ? flag3 = false : "";

    var contentWithoutTags = PrimaryPackaging.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var PrimaryPackagingData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    if (Product == "" || SKU == "" || PrimaryPackagingData == "") {
        flag3 = false;

        Product == "" ? $("#Error_PPR_Product").show().text('Please select Product') : $("#Error_PPR_Product").hide().text('');
        SKU == "" ? $("#Error_PPR_SKU").show() : $("#Error_PPR_SKU").hide();
        PrimaryPackagingData == "" ? $("#Error_PPR_PrimaryPackaging").show() : $("#Error_PPR_PrimaryPackaging").hide();
    }

    var selectedSku = $('#PPR_SKU').val();

    if (flag3) {
        var gridRowData = packagingProfileData_1;
        var flag = 0;
        gridRowData.forEach(function (item, index) {
            if (item.Product == Product && EditRowId3 != index) {
                var skuArray = item.SKU?.split(',').map(sku => sku.trim());
                $.each(selectedSku, function (index, item) {
                    if ($.inArray(item, skuArray) !== -1) {

                        flag3 = false;
                        flag = 1;

                        return false; // exit the loop early
                    }
                });
            }
        });

        if (flag) {

            $('#Error_PPR_Product_Sku').show().text('Selected Product and SKU combination already exists.');
        }
    }
    if (flag3) {

        var griddata = [];
        var PackagingProfile = {};
        var ImageFileName = "";

        var PackageImageFile = SavePackageImageFile();
        if (PackageImageFile == "") {
            ImageFileName = $('#Display_PackageImagesUpload').text();
        }
        else if (PackageImageFile != "") {
            $.each(PackageImageFile, function (k, obj) {

                if (k + 1 == PackageImageFile.length) {
                    ImageFileName += obj;
                }
                else if (k == 0) {
                    ImageFileName = obj + ',';
                }
                else {
                    ImageFileName += obj + ',';
                }
            });
        }
        PackageImageFileName = ImageFileName;

        PackagingProfile = {
            Product: $("#PPR_Product").val(),
            SKU: $("#PPR_SKU").val().toString(),
            PrimaryPackaging: $.trim(CKEDITOR.instances["PPR_PrimaryPackaging"].getData()),
            SecondaryPackaging: $.trim(CKEDITOR.instances["PPR_SecondaryPackaging"].getData()),
            TertiaryPackaging: $.trim(CKEDITOR.instances["PPR_TertiaryPackaging"].getData()),
            BenchmarkProducts: $.trim(CKEDITOR.instances["PPR_BenchmarkProducts"].getData()),
            DesiredPackagingCharacteristics: $.trim(CKEDITOR.instances["PPR_DesiredPackagingCharacteristics"].getData()),
            Others: $.trim(CKEDITOR.instances["PPR_Others"].getData()),
            Mould: $("#PPR_Mould").val(),
            ImagesUploadHide: PackageImageFileName,
        }

        if (EditRowId3 == -1) {

            ppRowId = ppRowId + 1;

            packagingProfileData_1[ppRowId] = PackagingProfile;

            var htmlTag = `

        <table id="PPR_Table_`+ (ppRowId) + `" style="width:100%">
            <thead>
                <tr>
                    <th colspan="2">
                        <b>Product : </b>
                        <span class="PPR_Product">`+ PackagingProfile.Product + `</span>
                    </th>
                    <th style="width:25%">
                        <b>SKU : </b>
                        <span>`+ PackagingProfile.SKU + `</span>
                    </th>
                    <th>
                        <span>
                            <div class="justify-center_1">
                                <a onclick="onEditPackagingProfile(`+ ppRowId + `)" class="btn-icon -edit edithide"><i class="fas fa-edit" title="Edit"></i></a>
                                <a onclick="onDeletePackagingProfile(`+ ppRowId + `,'#PPR_Table_` + ppRowId + `',0)" class="btn-icon -delete deletehide"><i class="fas fa-trash" data-bs-toggle="modal" title="Delete"></i></a>
                                    ${PackagingProfile.ImagesUploadHide !== '' && PackagingProfile.ImagesUploadHide !== null ? `
                                     <a class="btn-icon -info imagesinfo" title="Images info" onclick="ShowImages(`+ ppRowId + `)"  id="` + ppRowId + `"><i class="fas fa-images" data-bs-toggle="modal" title="Images"></i></a>` : ''}
                           </div>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="width:25%;">
                        <span class="remarkss"><b>Primary Packaging : </b> </span>
                        <span>`+ PackagingProfile.PrimaryPackaging + `</span>
                    </td>
                    <td style="width:25%;">
                        <span class="remarkss"><b>Secondary Packaging : </b></span>
                        <span>`+ PackagingProfile.SecondaryPackaging + `</span>
                    </td>
                    <td>
                        <span class="remarkss"><b>Tertiary Packaging : </b> </span>
                        <span>`+ PackagingProfile.TertiaryPackaging + `</span>
                    </td>
                    <td>
                        <span class="remarkss"> <b>Benchmark products : </b> </span>
                        <span>`+ PackagingProfile.BenchmarkProducts + `</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <span class="remarkss"><b>Desired Packaging Characteristics</b></span>
                        <span>`+ PackagingProfile.DesiredPackagingCharacteristics + `</span>
                    </td>
                    <td>
                        <span class="remarkss"><b>Others (if any) : </b></span>
                        <span>`+ PackagingProfile.Others + `</span>
                    </td>
                    <td>
                        <span class="remarkss"><b>Mold : </b></span>
                        <span>`+ PackagingProfile.Mould + `</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <br class="PPR_Table_Break`+ ppRowId + `" />
            `;

            $('.Packaging_Profile_Table').append(htmlTag);

            if (PackageImageFileName != "") {
                PackageImageFileName = PackageImageFileName.split(',');
                $.each(PackageImageFileName, function (i, j) {
                    var imagedata = {}
                    imagedata = {
                        TableClass: ppRowId,
                        Image: PackageImageFileName[i],
                    }
                    imageGrid.push(imagedata);

                });
            }

        }
        else {

            var DataFromTheRow = packagingProfileData_1[EditRowId3];
            var htmlTag = "";
            var editedRowdata;
            var tableId = "#PPR_Table_" + EditRowId3;

            packagingProfileData_1[EditRowId3] = PackagingProfile;

            if ($("#PPR_ImagesUpload").val() != '' && DataFromTheRow.ImagesUploadHide.length > 0) {
                $.ajax({
                    type: 'POST',
                    url: ROOT + "ProjectBrief/DeleteImageFile",
                    data: { fileName: DataFromTheRow.ImagesUploadHide },
                    success: function (data) {

                    }
                });
            }

            if ($("#PPR_ImagesUpload").val() == '' && DataFromTheRow.ImagesUploadHide.length > 0) {

                PackagingProfile = {
                    Product: Product,
                    SKU: $("#PPR_SKU").val().toString(),
                    PrimaryPackaging: $.trim(CKEDITOR.instances["PPR_PrimaryPackaging"].getData()),
                    SecondaryPackaging: $.trim(CKEDITOR.instances["PPR_PrimaryPackaging"].getData()),
                    TertiaryPackaging: $.trim(CKEDITOR.instances["PPR_TertiaryPackaging"].getData()),
                    BenchmarkProducts: $.trim(CKEDITOR.instances["PPR_BenchmarkProducts"].getData()),
                    DesiredPackagingCharacteristics: $.trim(CKEDITOR.instances["PPR_DesiredPackagingCharacteristics"].getData()),
                    Others: $.trim(CKEDITOR.instances["PPR_Others"].getData()),
                    Mould: $("#PPR_Mould").val(),
                    ImagesUploadHide: PackageImageFileName,
                }

                packagingProfileData_1[EditRowId3] = PackagingProfile;
            }

            editedRowdata = packagingProfileData_1[EditRowId3];

            htmlTag = `
        
                <thead>
                    <tr>
                        <th colspan="2">
                            <b>Product : </b>
                            <span class="PPR_Product">`+ editedRowdata.Product + `</span>
                        </th>
                        <th style="width:25%">
                            <b>SKU : </b>
                            <span>`+ editedRowdata.SKU + `</span>
                        </th>
                        <th>
                            <span>
                                <div class="justify-center_1">
                                    <a onclick="onEditPackagingProfile(`+ EditRowId3 + `)" class="btn-icon -edit edithide"><i class="fas fa-edit"></i></a>
                                    <a onclick="onDeletePackagingProfile(`+ EditRowId3 + `,'#PPR_Table_` + EditRowId3 + `',0)" class="btn-icon -delete deletehide"><i class="fas fa-trash" data-bs-toggle="modal" title="Delete"></i></a>
                                    ${PackagingProfile.ImagesUploadHide !== '' && PackagingProfile.ImagesUploadHide !== null ? `
                                     <a class="btn-icon -info imagesinfo" title="Images info" onclick="ShowImages(`+ EditRowId3 + `)" id="` + EditRowId3 + `"> <i class="fas fa-images" data-bs-toggle="modal" title="Images"></i></a>` : ''}
                                     </div>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="width:25%;">
                            <span class="remarkss"><b>Primary Packaging : </b> </span>
                            <span>`+ editedRowdata.PrimaryPackaging + `</span>
                        </td>
                        <td style="width:25%;">
                            <span class="remarkss"><b>Secondary Packaging : </b></span>
                            <span>`+ editedRowdata.SecondaryPackaging + `</span>
                        </td>
                        <td>
                            <span class="remarkss"><b>Tertiary Packaging : </b> </span>
                            <span>`+ editedRowdata.TertiaryPackaging + `</span>
                        </td>
                        <td>
                            <span class="remarkss"> <b>Benchmark products : </b> </span>
                            <span>`+ editedRowdata.BenchmarkProducts + `</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span class="remarkss"><b>Desired Packaging Characteristics</b></span>
                            <span>`+ editedRowdata.DesiredPackagingCharacteristics + `</span>
                        </td>
                        <td>
                            <span class="remarkss"><b>Others (if any) : </b></span>
                            <span>`+ editedRowdata.Others + `</span>
                        </td>
                        <td>
                            <span class="remarkss"><b>Mold : </b></span>
                            <span>`+ editedRowdata.Mould + `</span>
                        </td>
                    </tr>
                </tbody>
                `;
            $(tableId).html(htmlTag);

            if (PackageImageFileName != "") {
                var editedTableClass = EditRowId3
                var deletePresentedTable = []
                if (imageGrid.length > 0) {
                    for (i = 0; i < imageGrid.length; i++) {
                        if (editedTableClass == imageGrid[i].TableClass) {
                            deletePresentedTable.push(editedTableClass)
                        }
                    }
                }
                imageGrid = imageGrid.filter(obj1 =>
                    !deletePresentedTable.some(obj2 =>
                        obj2 === obj1.TableClass
                    )
                );

                var PackageImageFileName = PackageImageFileName.split(',');

                $.each(PackageImageFileName, function (i, j) {

                    var imagedata = {}
                    imagedata = {
                        TableClass: editedTableClass,
                        Image: PackageImageFileName[i],
                    }
                    imageGrid.push(imagedata);
                });

            }
            EditRowId3 = -1;


        }
        ImageFileName = "";
        $('.PackagingProfile').val("");                                          // To reset the text box fields
        CKEDITOR.instances["PPR_PrimaryPackaging"].setData('');
        CKEDITOR.instances["PPR_SecondaryPackaging"].setData('');
        CKEDITOR.instances["PPR_TertiaryPackaging"].setData('');
        CKEDITOR.instances["PPR_BenchmarkProducts"].setData('');
        CKEDITOR.instances["PPR_DesiredPackagingCharacteristics"].setData('');
        CKEDITOR.instances["PPR_Others"].setData('');
        $("#Display_PackageImagesUpload").empty();
        $("option").remove("#PPR_SKU .SkuOption");
        $('#PPR_SKU').multiselect('rebuild');
        $('#Error_PPR_PrimaryPackaging').hide();
    }
});

//On editing the row data
function onEditPackagingProfile(RowId) {


    EditRowId3 = RowId;

    $(".Error_PackagingProfile").hide();

    var DataFromTheRow = packagingProfileData_1[RowId];
    var productList = packagingProfileData_1.map(m => m.Product);

    var productPositioningData = $("#Product_Positioning").jqGrid("getGridParam", "data");
    var skuArray = [];
    var selectedSkuArray = DataFromTheRow.SKU.split(',').map(item => item.trim());

    var ImageUpload = DataFromTheRow.ImagesUploadHide;

    var file = "";

    if (ImageUpload != "") {
        for (var i = 0; i < imageGrid.length; i++) {

            if (RowId == imageGrid[i].TableClass) {

                var image = imageGrid[i];

                var imageUrl = image.Image;

                file += imageUrl + ",";
            }

        }
        if (file.length > 0) {
            file = file.slice(0, -1);
        }
        DataFromTheRow.ImagesUploadHide = file;
    }

    $.each(productPositioningData, function (i, data) {

        if ($.trim(data.Product) == DataFromTheRow.Product) {

            skuArray = data.Sku.split(',').map(item => item.trim());
        }
    });
    var skuOption = "";
    skuArray.forEach(function (item, index) {

        if (selectedSkuArray.includes(item)) {

            skuOption += `<option class="SkuOption" selected value="` + item + `" >` + item + `</option>`
        }
        else {

            skuOption += `<option class="SkuOption" value="` + item + `" >` + item + `</option>`
        }
    });

    $("option").remove("#PPR_SKU .SkuOption");
    $('#PPR_SKU').append(skuOption).multiselect('rebuild');

    $("#PPR_Product").val(DataFromTheRow.Product);
    CKEDITOR.instances["PPR_PrimaryPackaging"].setData(DataFromTheRow.PrimaryPackaging);

    CKEDITOR.instances["PPR_SecondaryPackaging"].setData(DataFromTheRow.SecondaryPackaging);
    CKEDITOR.instances["PPR_TertiaryPackaging"].setData(DataFromTheRow.TertiaryPackaging);
    CKEDITOR.instances["PPR_BenchmarkProducts"].setData(DataFromTheRow.BenchmarkProducts);
    CKEDITOR.instances["PPR_DesiredPackagingCharacteristics"].setData(DataFromTheRow.DesiredPackagingCharacteristics);
    CKEDITOR.instances["PPR_Others"].setData(DataFromTheRow.Others);

    $("#PPR_Mould").val(DataFromTheRow.Mould);
    $("#Display_PackageImagesUpload").text(DataFromTheRow.ImagesUploadHide);
    $('#PPR_ImagesUpload').val('');

}
//On deleting the row data
function onDeletePackagingProfile(RowId, tableId, flag = 0) {
    var DataFromTheRow = packagingProfileData_1[RowId];
    var FileName = DataFromTheRow.ImagesUploadHide;
    var path = "";

    if (flag == 1) {

        if (FileName != '') {

            $.ajax({
                type: 'POST',
                url: ROOT + "ProjectBrief/DeleteImageFile",
                data: { fileName: FileName },
                success: function (data) {
                    path = data;
                }
            });
        }

        delete packagingProfileData_1[RowId];
        $(tableId).remove();
        $(`.PPR_Table_Break` + RowId).remove();

        var deletePresentedTable = []
        if (imageGrid.length > 0) {
            for (i = 0; i < imageGrid.length; i++) {
                if (RowId == imageGrid[i].TableClass) {
                    deletePresentedTable.push(RowId)
                }
            }
        }
        imageGrid = imageGrid.filter(obj1 =>
            !deletePresentedTable.some(obj2 =>
                obj2 === obj1.TableClass
            )
        );
    }
    else {
        confirm("Are you sure You want to delete?", function () {
            if (FileName != '') {

                $.ajax({
                    type: 'POST',
                    url: ROOT + "ProjectBrief/DeleteImageFile",
                    data: { fileName: FileName },
                    success: function (data) {
                        path = data;
                    }
                });
            }

            delete packagingProfileData_1[RowId];
            $(tableId).remove();
            $(`.PPR_Table_Break` + RowId).remove();

            $('.PackagingProfile').val("");                            // To reset the text box fields
            $("#Display_PackageImagesUpload").empty();
            $("option").remove("#PPR_SKU .SkuOption");
            $('#PPR_SKU').multiselect('rebuild');

            var deletePresentedTable = []
            if (imageGrid.length > 0) {
                for (i = 0; i < imageGrid.length; i++) {
                    if (RowId == imageGrid[i].TableClass) {
                        deletePresentedTable.push(RowId)
                    }
                }
            }
            imageGrid = imageGrid.filter(obj1 =>
                !deletePresentedTable.some(obj2 =>
                    obj2 === obj1.TableClass
                )
            );

            EditRowId3 = -1;
        });
    }
}

function DownloadPackageImage(rowId) {

    var filename = packagingProfileData_1[rowId].ImagesUploadHide;
    if (filename.length > 0) {
        $('#' + rowId + 'DownloadPackageImage').prop("href", ROOT + "ProjectBrief/DownloadImageFile?fileName=" + filename);
        return true;
    }
    else {
        $('#' + rowId + 'DownloadPackageImage').empty().text('No Image Present');

    }
}

function SavePackageImageFile() {

    var fileName = [];
    var files = $('#PPR_ImagesUpload').prop("files");
    for (var i = 0; i < files.length; i++) {
        var formData = new FormData();
        formData.append("file", files[i]);

        $.ajax({
            type: 'POST',
            url: ROOT + "ProjectBrief/SaveImageFile",
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {

                fileName.push(data.replaceAll('"', ''));
            }
        });
    }

    return fileName;
}
$("#PPR_ImagesUpload").change(function () {
    $("#Display_PackageImagesUpload").empty();
});



var EditRowId4 = 0;

$("#BI_Product").change(function () {

    var productName = $("#BI_Product").val();

    productName == "" ? ($("#Error_BI_Product").show().text('Please select Product')) : $("#Error_BI_Product").hide().text('');
    const productList = $("#Business_Information").jqGrid("getCol", "Product");

    var productPositioningData = $("#Product_Positioning").jqGrid("getGridParam", "data");
    var skuArray = [];

    $.each(productPositioningData, function (i, data) {

        if ($.trim(data.Product) == productName) {

            skuArray = data.Sku?.split(',').map(item => item.trim());
        }
    });

    var skuOption = "";

    skuArray.forEach(function (item, index) {

        skuOption += `<option class="SkuOption" value="` + item + `" >` + item + `</option>`
    });

    $("option").remove("#BI_SKU .SkuOption");

    $('#BI_SKU').append(skuOption);
});

$("#BI_SKU").change(function () {
    $("#BI_SKU").val() == "" ? $("#Error_BI_SKU").show() : $("#Error_BI_SKU").hide();
});

$("#BI_ProposedNamesOfProduct").keyup(function () {
    $("#BI_ProposedNamesOfProduct").val() == "" ? $("#Error_BI_ProposedNamesOfProduct").show() : $("#Error_BI_ProposedNamesOfProduct").hide();
});

$("#BI_ProposedLaunchDate").change(function () {
    $("#BI_ProposedLaunchDate").val() == "" ? $("#Error_BI_ProposedLaunchDate").show() : $("#Error_BI_ProposedLaunchDate").hide();
    $("#DateError_ProposedLaunchDate").hide();
});

$("#BI_ProposedSellingPrice").keyup(function () {
    $("#BI_ProposedSellingPrice").val() == "" ? $("#Error_BI_ProposedSellingPrice").show() : $("#Error_BI_ProposedSellingPrice").hide();
    $("#NotNumber_ProposedSellingPrice").hide();
});

$("#BI_ProposedTP").keyup(function () {
    $("#BI_ProposedTP").val() == "" ? $("#Error_BI_ProposedTP").show() : $("#Error_BI_ProposedTP").hide();
    $("#NotNumber_ProposedTP").hide();
});

$("#BI_ProposedMRP").keyup(function () {
    $("#BI_ProposedMRP").val() == "" ? $("#Error_BI_ProposedMRP").show() : $("#Error_BI_ProposedMRP").hide();
});

$("#BI_Currency").change(function () {
    $("#BI_Currency").val() == "" ? $("#Error_BI_Currency").show() : $("#Error_BI_Currency").hide();
});

$("#BI_ExpectedGP").keyup(function () {
    $("#BI_ExpectedGP").val() == "" ? $("#Error_BI_ExpectedGP").show() : $("#Error_BI_ExpectedGP").hide();
    $("#NotNumber_ExpectedGP").hide();
    $('#Error_Range_ExpectedGP').hide();
});
$("#BI_ProposedSellingPrice, #BI_Y2Quantity").change(function () {

    $("#BI_BusinessValue").val("");
    if ($("#BI_ProposedSellingPrice").val() != "" && $("#BI_Y2Quantity").val() != "") {
        const value = ($("#BI_ProposedSellingPrice").val().replaceAll(',', '')) * ($("#BI_Y2Quantity").val().replaceAll(',', ''));
        const formattedValue = value.toLocaleString('en-US', { maximumFractionDigits: 0 });
        $("#BI_BusinessValue").val(formattedValue);
    }
});

$("#BI_M1Quantity").keyup(function () {
    $("#BI_M1Quantity").val() == "" ? $("#Error_BI_M1Quantity").show() : $("#Error_BI_M1Quantity").hide();
    $("#NotNumber_M1Quantity").hide();
    $('#Error_Zero_M1Quantity').hide();
});

$("#BI_M2Quantity").keyup(function () {
    $("#BI_M2Quantity").val() == "" ? $("#Error_BI_M2Quantity").show() : $("#Error_BI_M2Quantity").hide();
    $("#NotNumber_M2Quantity").hide();
});

$("#BI_M3Quantity").keyup(function () {
    $("#BI_M3Quantity").val() == "" ? $("#Error_BI_M3Quantity").show() : $("#Error_BI_M3Quantity").hide();
    $("#NotNumber_M3Quantity").hide();
});
$("#BI_Y1Quantity").keyup(function () {
    $("#BI_Y1Quantity").val() == "" ? $("#Error_BI_Y1Quantity").show().text('Please enter Y1 Quantity') : $("#Error_BI_Y1Quantity").hide();
    $("#NotNumber_Y1Quantity").hide();
    $('#Error_Zero_Y1Quantity').hide();
});

$("#BI_Y2Quantity").keyup(function () {
    $("#BI_Y2Quantity").val() == "" ? $("#Error_BI_Y2Quantity").show() : $("#Error_BI_Y2Quantity").hide();
    $("#NotNumber_Y2Quantity").hide();
});

$("#BI_Y3Quantity").keyup(function () {
    $("#BI_Y3Quantity").val() == "" ? $("#Error_BI_Y3Quantity").show() : $("#Error_BI_Y3Quantity").hide();
    $("#NotNumber_Y3Quantity").hide();
});

$("#BI_UOM").keyup(function () {
    $("#BI_UOM").val() == "" ? $("#Error_BI_UOM").show() : $("#Error_BI_UOM").hide();
});

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="action_icons">
              <a onclick="onEditBusinessInformation(`+ options.rowId + `)" class="edit" title="Edit" id="edit_info"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
              <a onclick="onDeleteBusinessInformation(`+ options.rowId + `)" class="" title="Delete" ><i class="fas fa-trash color-delete" title="Delete"></i></a>
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
        label: 'Expected COP',
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
        name: 'Currency',
        label: 'Currency',
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
        name: 'M4Quantity',
        label: 'M4 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M5Quantity',
        label: 'M5 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M6Quantity',
        label: 'M6 Quantity',
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
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_businessinfo',
        rowNum: 20,
        scroll: 1,

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

$("#Business_Information_V").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_businessinfo_V',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#Business_Information_V tbody tr");
        var objHeader = $("#Business_Information_V tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#Business_Information_V").jqGrid('hideCol', "Action");
    }
});


$("#Add_BusinessInformation").click(function () {

    $('.Error_BusinessInformation').hide();

    var flag4 = true;
    var sumOfMonthQuantity = 0;

    var product = $("#BI_Product").val();
    var sku = $.trim($("#BI_SKU").val());
    var proposedNamesOfProduct = $.trim($("#BI_ProposedNamesOfProduct").val());
    var proposedLaunchDate = $.trim($("#BI_ProposedLaunchDate").val());
    var proposedSellingPrice = $.trim($("#BI_ProposedSellingPrice").val());
    var proposedTP = $.trim($("#BI_ProposedTP").val());
    var proposedMRP = $.trim($("#BI_ProposedMRP").val());
    var currency = $.trim($("#BI_Currency").val());
    var expectedGP = $.trim($("#BI_ExpectedGP").val());
    var businessValue = $.trim($("#BI_BusinessValue").val());
    var m1Quantity = $.trim($("#BI_M1Quantity").val());
    var m2Quantity = $.trim($("#BI_M2Quantity").val());
    var m3Quantity = $.trim($("#BI_M3Quantity").val());
    var m4Quantity = $.trim($("#BI_M4Quantity").val());
    var m5Quantity = $.trim($("#BI_M5Quantity").val());
    var m6Quantity = $.trim($("#BI_M6Quantity").val());
    var y1Quantity = $.trim($("#BI_Y1Quantity").val());
    var y2Quantity = $.trim($("#BI_Y2Quantity").val());
    var y3Quantity = $.trim($("#BI_Y3Quantity").val());
    var uom = $.trim($("#BI_UOM").val());

    EditRowId4 == 0 && $("#Error_BI_Product").text() != '' ? flag4 = false : "";
    proposedSellingPrice = (proposedSellingPrice.replaceAll(',', ''));
    proposedTP = (proposedTP.replaceAll(',', ''));
    proposedMRP = (proposedMRP.replaceAll(',', ''));
    expectedGP = (expectedGP.replace('%', ''));
    m1Quantity = (m1Quantity.replaceAll(',', ''));
    m2Quantity = (m2Quantity.replaceAll(',', ''));
    m3Quantity = (m3Quantity.replaceAll(',', ''));
    m4Quantity = (m4Quantity.replaceAll(',', ''));
    m5Quantity = (m5Quantity.replaceAll(',', ''));
    m6Quantity = (m6Quantity.replaceAll(',', ''));
    y1Quantity = (y1Quantity.replaceAll(',', ''));
    y2Quantity = (y2Quantity.replaceAll(',', ''));
    y3Quantity = (y3Quantity.replaceAll(',', ''));

    m1Quantity == 0 && m1Quantity != "" ? ($('#Error_Zero_M1Quantity').show(), flag4 = false) : $('#Error_Zero_M1Quantity').hide();
    y1Quantity == 0 && y1Quantity != "" ? ($('#Error_Zero_Y1Quantity').show(), flag4 = false) : $('#Error_Zero_Y1Quantity').hide();
    ((expectedGP < 1 || expectedGP > 100) && expectedGP != "") ? ($('#Error_Range_ExpectedGP').show(), flag4 = false) : $('#Error_Range_ExpectedGP').hide();

    if (product == "" || sku == "" || proposedLaunchDate == "" || proposedSellingPrice == "" || proposedTP == "" || proposedMRP == "" || currency == "" || expectedGP == "" || businessValue == "" || m1Quantity == "" || m2Quantity == "" || m3Quantity == "" || y1Quantity == "" || y2Quantity == "" || y3Quantity == "" || uom == "" || isNaN(proposedSellingPrice) || isNaN(proposedTP) || isNaN(expectedGP) || isNaN(businessValue.replaceAll(',', '')) || isNaN(m1Quantity) || isNaN(m2Quantity) || isNaN(m3Quantity) || isNaN(y1Quantity) || isNaN(y2Quantity) || isNaN(y3Quantity)) {

        flag4 = false;

        product == "" ? $("#Error_BI_Product").show().text('Please select Product') : $("#Error_BI_Product").hide().text('');
        sku == "" ? $("#Error_BI_SKU").show() : $("#Error_BI_SKU").hide();
        proposedNamesOfProduct == "" ? $("#Error_BI_ProposedNamesOfProduct").show() : $("#Error_BI_ProposedNamesOfProduct").hide();
        uom == "" ? $("#Error_BI_UOM").show() : $("#Error_BI_UOM").hide();
        proposedMRP == "" ? $("#Error_BI_ProposedMRP").show() : $("#Error_BI_ProposedMRP").hide();
        currency == "" ? $("#Error_BI_Currency").show() : $("#Error_BI_Currency").hide();
        $("#BI_ProposedLaunchDate").val() == "" ? $("#Error_BI_ProposedLaunchDate").show() : $("#Error_BI_ProposedLaunchDate").hide();
        proposedSellingPrice == "" ? $("#Error_BI_ProposedSellingPrice").show() : (isNaN(proposedSellingPrice) ? $("#NotNumber_ProposedSellingPrice").show() : $("#NotNumber_ProposedSellingPrice").hide());
        proposedTP == "" ? $("#Error_BI_ProposedTP").show() : (isNaN(proposedTP) ? ($("#NotNumber_ProposedTP").show()) : $("#NotNumber_ProposedTP").hide());
        expectedGP == "" ? $("#Error_BI_ExpectedGP").show() : (isNaN(expectedGP) ? ($("#NotNumber_ExpectedGP").show()) : $("#NotNumber_ExpectedGP").hide());
        m1Quantity == "" ? $("#Error_BI_M1Quantity").show() : (isNaN(m1Quantity) ? ($("#NotNumber_M1Quantity").show()) : $("#NotNumber_M1Quantity").hide());
        m2Quantity == "" ? $("#Error_BI_M2Quantity").show() : (isNaN(m2Quantity) ? ($("#NotNumber_M2Quantity").show()) : $("#NotNumber_M2Quantity").hide());
        m3Quantity == "" ? $("#Error_BI_M3Quantity").show() : (isNaN(m3Quantity) ? ($("#NotNumber_M3Quantity").show()) : $("#NotNumber_M3Quantity").hide());
        y1Quantity == "" ? $("#Error_BI_Y1Quantity").show().text('Please enter Y1 Quantity') : (isNaN(y1Quantity) ? ($("#NotNumber_Y1Quantity").show()) : $("#NotNumber_Y1Quantity").hide());
        y2Quantity == "" ? $("#Error_BI_Y2Quantity").show() : (isNaN(y2Quantity) ? ($("#NotNumber_Y2Quantity").show()) : $("#NotNumber_Y2Quantity").hide());
        y3Quantity == "" ? $("#Error_BI_Y3Quantity").show() : (isNaN(y3Quantity) ? ($("#NotNumber_Y3Quantity").show()) : $("#NotNumber_Y3Quantity").hide());
    }

    m1Quantity = parseInt(m1Quantity);
    m2Quantity = parseInt(m2Quantity);
    m3Quantity = parseInt(m3Quantity);
    m4Quantity = parseInt(m4Quantity);
    m5Quantity = parseInt(m5Quantity);
    m6Quantity = parseInt(m6Quantity);
    y1Quantity = parseInt(y1Quantity);

    sumOfMonthQuantity = m1Quantity + m2Quantity + m3Quantity + (isNaN(m4Quantity) ? 0 : m4Quantity) + (isNaN(m5Quantity) ? 0 : m5Quantity) + (isNaN(m6Quantity) ? 0 : m6Quantity);
    ((y1Quantity != "") && (y1Quantity <= sumOfMonthQuantity)) ? ($("#Error_BI_Y1Quantity").show().text('Y1 Quantity should be greater than ( M1 + M2 + M3 + M4 + M5 + M6) quantity'), flag4 = false) : "";

    if (flag4) {

        var gridRowData = $("#Business_Information").jqGrid('getGridParam', 'data');
        var flag = 0;

        gridRowData.forEach(function (item, index) {

            if (item.Product == product && item.SKU == sku && EditRowId4 != (index + 1)) {

                flag4 = false;
                flag = 1;
            }
        });

        if (flag) {

            $('#Error_BI_Product_Sku').show().text('Selected Product and SKU combination already exists.');
        }
    }

    if (flag4) {

        var gridRowData = $("#Business_Information").jqGrid('getGridParam', 'data');
        var flag = 0;

        gridRowData.forEach(function (item, index) {

            if (item.Product == product && item.SKU == sku && EditRowId4 != (index + 1)) {

                flag4 = false;
                flag = 1;
            }
        });

        if (flag) {

            $('#Error_BI_Product_Sku').show().text('The selected Product and SKU already consists the definition for Business Information.');
        }
    }

    if (flag4) {

        var griddata = [];
        var BusinessInformation = {};

        $('.Error_BusinessInformation').hide();
        $('#Error_BI_Product').hide();

        BusinessInformation = {
            Product: product,
            SKU: sku,
            ProposedNamesOfProduct: proposedNamesOfProduct,
            ProposedLaunchDate: proposedLaunchDate,
            ProposedSellingPrice: proposedSellingPrice,
            ProposedTP: proposedTP,
            ProposedMRP: proposedMRP,
            Currency: currency,
            ExpectedGP: expectedGP,
            BusinessValue: businessValue,
            M1Quantity: m1Quantity,
            M2Quantity: m2Quantity,
            M3Quantity: m3Quantity,
            M4Quantity: isNaN(m4Quantity) || 0 ? "" : m4Quantity,
            M5Quantity: isNaN(m5Quantity) || 0 ? "" : m5Quantity,
            M6Quantity: isNaN(m6Quantity) || 0 ? "" : m6Quantity,
            Y1Quantity: y1Quantity,
            Y2Quantity: y2Quantity,
            Y3Quantity: y3Quantity,
            UOM: uom
        };

        if (EditRowId4 == 0) {

            griddata.push(BusinessInformation);
            var BI1 = $("#Business_Information").jqGrid('getGridParam', 'data');
            var BI2 = $.merge(BI1, griddata);
            $("#Business_Information").jqGrid('setGridParam', { data: BI2 });
            $("#Business_Information").trigger('reloadGrid', [{ page: 1 }]);

            $("#Business_Information_V").jqGrid('setGridParam', { data: BI2 });
            $("#Business_Information_V").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            $('#BI_Product').attr('disabled', false);

            $("#Business_Information").jqGrid('setRowData', EditRowId4, BusinessInformation);
            $("#Business_Information").trigger('reloadGrid', [{ page: 1 }]);

            $("#Business_Information_V").jqGrid('setRowData', EditRowId4, BusinessInformation);
            $("#Business_Information_V").trigger('reloadGrid', [{ page: 1 }]);

            EditRowId4 = 0;
        }

        $('.BusinessInformation').val("");                            // To reset the text box fields
        $("option").remove("#BI_SKU .SkuOption");

        $('#BI_ProposedLaunchDate').datepicker('destroy');
        $('.data-datepicker').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd-mm-yyyy',
            startDate: '+0d'
        });

    }
});

function onEditBusinessInformation(RowId) {

    EditRowId4 = RowId;

    $(".Error_BusinessInformation").hide();

    var DataFromTheRow = jQuery('#Business_Information').jqGrid('getRowData', RowId);

    var productPositioningData = $("#Product_Positioning").jqGrid("getGridParam", "data");
    var skuArray = [];
    var selectedSkuArray = DataFromTheRow.SKU.split(',').map(item => item.trim());

    $.each(productPositioningData, function (i, data) {

        if ($.trim(data.Product) == DataFromTheRow.Product) {

            skuArray = data.Sku.split(',').map(item => item.trim());
        }
    });

    var skuOption = "";

    skuArray.forEach(function (item, index) {

        if (selectedSkuArray.includes(item)) {

            skuOption += `<option class="SkuOption" selected value="` + item + `" >` + item + `</option>`
        }
        else {

            skuOption += `<option class="SkuOption" value="` + item + `" >` + item + `</option>`
        }
    });

    $("option").remove("#BI_SKU .SkuOption");
    $('#BI_SKU').append(skuOption);

    $("#BI_Product").val(DataFromTheRow.Product);
    $("#BI_SKU").val(DataFromTheRow.SKU);
    $("#BI_ProposedNamesOfProduct").val(DataFromTheRow.ProposedNamesOfProduct);
    $("#BI_ProposedSellingPrice").val(DataFromTheRow.ProposedSellingPrice);
    $("#BI_ProposedTP").val(DataFromTheRow.ProposedTP);
    $("#BI_ProposedMRP").val(DataFromTheRow.ProposedMRP);
    $("#BI_Currency").val(DataFromTheRow.Currency);
    $("#BI_ExpectedGP").val(DataFromTheRow.ExpectedGP);
    $("#BI_BusinessValue").val(DataFromTheRow.BusinessValue);
    $("#BI_M1Quantity").val(DataFromTheRow.M1Quantity);
    $("#BI_M2Quantity").val(DataFromTheRow.M2Quantity);
    $("#BI_M3Quantity").val(DataFromTheRow.M3Quantity);
    $("#BI_M4Quantity").val(DataFromTheRow.M4Quantity);
    $("#BI_M5Quantity").val(DataFromTheRow.M5Quantity);
    $("#BI_M6Quantity").val(DataFromTheRow.M6Quantity);
    $("#BI_Y1Quantity").val(DataFromTheRow.Y1Quantity);
    $("#BI_Y2Quantity").val(DataFromTheRow.Y2Quantity);
    $("#BI_Y3Quantity").val(DataFromTheRow.Y3Quantity);
    $("#BI_UOM").val(DataFromTheRow.UOM);

    var date = DataFromTheRow.ProposedLaunchDate.split("-").join("-");
    $('#BI_ProposedLaunchDate').datepicker('setDate', date);
}

//On deleting Business Information row data
function onDeleteBusinessInformation(RowId = 0) {
    var DataFromTheRow = jQuery('#Business_Information').jqGrid('getRowData', RowId);

    confirm("Are you sure You want to delete?", function () {

        $("#Business_Information").jqGrid('delRowData', RowId);
        $("#Business_Information").trigger('reloadGrid', [{ page: 1 }]);


        $('.BusinessInformation').val("");
        EditRowId4 = 0;

    });
}

$("#Npd_ProjectName").focusout(function () {

    if ($('#Npd_ProjectName-error').text() == '') {
        $("#Npd_ProjectName").val() == "" ? $("#Error_Npd_ProjectName").show() : $("#Error_Npd_ProjectName").hide();
    }
});

CKEDITOR.instances.Npd_BusinessObjective.on('change', function () {
    if ($('#Npd_BusinessObjective-error').text() == '') {
        CKEDITOR.instances["Npd_BusinessObjective"].getData() == '' ? $("#Error_Npd_BusinessObjective").show() : $("#Error_Npd_BusinessObjective").hide();
    }
});
// Sustainability section codes
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return `<div class="action_icons">
            <a onclick=onEditSustainability(` + options.rowId + `) class="" title="Edit" id="edit_worksheet"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
            <a onclick=onDeleteSustainability(` + options.rowId + `) class="" title="Delete" ><i class="fas fa-trash color-delete"  title="Delete"></i></a>
        </div>`;
        }
    },
    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TargetedGoals',
        label: 'What sustainability goals are targeted?',
        resizable: true,
        ignoreCase: true,
        width: 200,
    },
    {
        name: 'Reusable',
        label: 'Reusable',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Recycle',
        label: 'Recycle',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Reducing',
        label: 'Reducing',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Recovering',
        label: 'Recovering',
        resizable: true,
        ignoreCase: true,
    },
],

    $("#Table_Sustainability").jqGrid({
        height: 'auto',
        rowNum: 10000000,
        mtype: 'GET',
        url: '',
        datatype: 'local',
        data: [],
        loadonce: true,
        colModel: colmodels,
        pager: "#pager_Table_Sustainability",
        viewrecords: true,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Table_Sustainability tbody tr");
            var objHeader = $("#Table_Sustainability tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

$("#Table_Sustainability_V").jqGrid({
    height: 'auto',
    rowNum: 10000000,
    mtype: 'GET',
    url: '',
    datatype: 'local',
    data: [],
    loadonce: true,
    colModel: colmodels,
    pager: "#pager_Table_Sustainability_V",
    viewrecords: true,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Table_Sustainability_V tbody tr");
        var objHeader = $("#Table_Sustainability_V tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#Table_Sustainability_V").jqGrid('hideCol', "Action");
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


$("#SUS_Product").change(function () {

    var productName = $("#SUS_Product").val();
    const productList = $("#Table_Sustainability").jqGrid("getCol", "Product");

    productName == "" ? ($("#Error_SUS_Product").show().text('Please select Product')) : $("#Error_SUS_Product").hide().text('');

    if (productName != "") {

        productList.includes(productName) ? ($("#Error_SUS_Product").show().text('This product already consists the definition, Please select the different product')) : $("#Error_SUS_Product").hide().text('');
    }
});
$("#SUS_TargetedGoals").keyup(function () {
    $("#SUS_TargetedGoals").val() == "" ? $("#Error_SUS_TargetedGoals").show() : $("#Error_SUS_TargetedGoals").hide();
});

var editRowId5 = 0;

$(document).on('click', '#Add_Sustainability', function () {

    var flag = true;

    var product = $("#SUS_Product").val();
    var targetedGoals = $.trim($("#SUS_TargetedGoals").val());
    var reusable = $.trim($("#SUS_Reusable").val());
    var recycle = $.trim($("#SUS_Recycle").val());
    var reducing = $.trim($("#SUS_Reducing").val());
    var recovering = $.trim($("#SUS_Recovering").val());

    editRowId5 == 0 && $("#Error_SUS_Product").text() != '' ? flag = false : "";

    if (product == "" || targetedGoals == "") {

        flag = false;

        product == "" ? $("#Error_SUS_Product").show().text('Please select Product') : $("#Error_SUS_Product").hide().text('');
        targetedGoals == "" ? $("#Error_SUS_TargetedGoals").show() : $("#Error_SUS_TargetedGoals").hide();
    }

    if (flag) {

        var gridData = [];
        var sustainabilityData = {};

        sustainabilityData = {
            Product: product,
            TargetedGoals: targetedGoals,
            Reusable: reusable,
            Recycle: recycle,
            Reducing: reducing,
            Recovering: recovering
        }

        if (editRowId5 == 0) {

            gridData.push(sustainabilityData);
            var SUS1 = $("#Table_Sustainability").jqGrid('getGridParam', 'data');
            var SUS2 = $.merge(SUS1, gridData);
            $("#Table_Sustainability").jqGrid('setGridParam', { data: SUS2 });
            $("#Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);

            $("#Table_Sustainability_V").jqGrid('setGridParam', { data: SUS2 });
            $("#Table_Sustainability_V").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {

            sustainabilityData = {
                Product: product,
                TargetedGoals: targetedGoals,
                Reusable: reusable,
                Recycle: recycle,
                Reducing: reducing,
                Recovering: recovering
            }

            $("#Table_Sustainability").jqGrid('setRowData', editRowId5, sustainabilityData);
            $("#Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);

            $("#Table_Sustainability_V").jqGrid('setRowData', editRowId5, sustainabilityData);
            $("#Table_Sustainability_V").trigger('reloadGrid', [{ page: 1 }]);

            editRowId5 = 0;
        }

        $('.Sustainability').val("");                            // To reset the textbox fields

        productPositioningProductNameList = $("#Product_Positioning").jqGrid("getCol", "Product");
        var productList = $("#Table_Sustainability").jqGrid("getCol", "Product");

        sustainabilityProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        $("option").remove("#SUS_Product .ProductOption");

        if (sustainabilityProductNameList.length > 0) {

            var productOption = "";

            $.each(sustainabilityProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#SUS_Product").append(productOption);
        }
    }
});

//On deleting the Sustainability row data

function onDeleteSustainability(deleteRowId) {

    var dataFromTheRow = jQuery('#Table_Sustainability').jqGrid('getRowData', deleteRowId);

    confirm("Are you sure you want to delete?", function () {

        $("#Table_Sustainability").jqGrid('delRowData', deleteRowId);
        $("#Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);

        $('.Sustainability').val("");                            // To reset the textbox fields

        var productList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        productPositioningProductNameList = $("#Product_Positioning").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        $("option").remove("#SUS_Product .ProductOption");

        if (sustainabilityProductNameList.length > 0) {

            var productOption = "";

            $.each(sustainabilityProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#SUS_Product").append(productOption);
        }

        editRowId5 = 0;
        deleteRowId = 0;
    });

    $("#Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);
}



//On editing the Sustainability row data

function onEditSustainability(editRowId) {

    editRowId5 = editRowId;

    $(".Error_Sustainability").hide();

    var dataFromTheRow = jQuery('#Table_Sustainability').jqGrid('getRowData', editRowId);
    var productList = $("#Table_Sustainability").jqGrid("getCol", "Product");

    sustainabilityProductNameList = $.grep(sustainabilityProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    sustainabilityProductNameList.push(dataFromTheRow.Product);

    $("option").remove("#SUS_Product .ProductOption");

    if (sustainabilityProductNameList.length > 0) {

        var productOption = "";

        $.each(sustainabilityProductNameList, function (i, obj) {

            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });

        $("#SUS_Product").append(productOption);
    }

    $("#SUS_Product").val(dataFromTheRow.Product);
    $("#SUS_TargetedGoals").val(dataFromTheRow.TargetedGoals);
    $("#SUS_Reusable").val(dataFromTheRow.Reusable);
    $("#SUS_Recycle").val(dataFromTheRow.Recycle);
    $("#SUS_Reducing").val(dataFromTheRow.Reducing);
    $("#SUS_Recovering").val(dataFromTheRow.Recovering);
}

colmodels = [
    {
        name: '',
        label: 'Action',
        width: 30,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            var fileName = rowobject.DocumentName;
            var fileExtension = fileName.split('.').pop().toLowerCase(); // Extract the file extension

            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
                'csv': 'Microsoft Excel Spreadsheet',
            };

            return '<div class="action_icons">' +
                '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                '<span class="action-link"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="deletehide" title="Delete"><i class="fas fa-trash color-delete" title="Delete"></i></a></span>' +
                '</div> ';
        }
    },
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 150,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 60,
        ignoreCase: true,
        resizable: true,
    }
],
    $('#Grid_Supporting_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Grid_Supporting_Document',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_Supporting_Document tbody tr");
            var objHeader = $("#Grid_Supporting_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

$('#Grid_Supporting_Document_V').jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_Grid_Supporting_Document_V',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#Grid_Supporting_Document_V tbody tr");
        var objHeader = $("#Grid_Supporting_Document_V tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
    }
});

$("#Add_SupportingDocuments").on("click", function () {

    var document = $("#Supportingdocuments").val();
    var GetDoc = $("#GetDocName").val();
    var flag = true;

    if (document != "" || GetDoc != "") {
        var supportingDocument = $('#Supportingdocuments').prop("files");
        var modifiedSupportingDocumentsName = SaveSupportingDocumentFile(supportingDocument);
        modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");


        var griddata = [];
        var docData = {};
        if (document == "") {
            modifiedSupportingDocumentsName = GetDoc;
        }
        docData = {
            DocumentName: modifiedSupportingDocumentsName,
            UploadedBy: $('#UserName').val()
        }
        if (editDocId == 0) {
            griddata.push(docData);
            var doc1 = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            var doc2 = $.merge(doc1, griddata);
            $("#Grid_Supporting_Document").jqGrid('setGridParam', { data: doc2 });
            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);

            $("#Grid_Supporting_Document_V").jqGrid('setGridParam', { data: doc2 });
            $("#Grid_Supporting_Document_V").trigger('reloadGrid', [{ page: 1 }]);

        }
        else {

            $.each(docData, function (key, value) {
                $("#Grid_Supporting_Document").jqGrid('setCell', editDocId, key, value);
                $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);

                $("#Grid_Supporting_Document_V").jqGrid('setCell', editDocId, key, value);
                $("#Grid_Supporting_Document_V").trigger('reloadGrid', [{ page: 1 }]);

            });

            editDocId = 0;
        }
        $("#Supportingdocuments").val('');

    }
    else {
        $("#ErrorMsg_Document").show();
        setTimeout(function () {
            $("#ErrorMsg_Document").hide();
        }, 2000);

    }

});

function SaveSupportingDocumentFile(fileName) {

    var modifiedfileName = "";
    var formData = new FormData();

    if (fileName != "") {

        formData.append("file", fileName[0]);
        $.ajax({
            type: 'POST',
            url: ROOT + "ProjectBrief/SaveImageFile",
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {

                modifiedfileName = data;
            }


        });
    }
    return modifiedfileName;
}



//Formulation profile multiselect images
var formData = new FormData();
function fileValidation() {

    var flag = true;
    var supportedExtention = ['jpg', 'jpeg', 'png', 'gif', 'jfif', 'tiff', 'bmp', 'svg'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#FP_BenchmarkProductsImage`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_InvalidBenchmarkProductsImage').show();
            setTimeout(function () {
                $('#Err_InvalidBenchmarkProductsImage').hide();
            }, 5000);

            $(`#FP_BenchmarkProductsImage`).val('');

            flag = false;

            return false;
        }
    });

    if (flag) {

        for (var i = 0; i < $(`#FP_BenchmarkProductsImage`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#FP_BenchmarkProductsImage`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#FP_BenchmarkProductsImage').val('');
                $('#deleteSelectedFile').hide();
                $(`#FP_BenchmarkProductsImage`).get(0).val('');
                return false;
            }
            var supportedFiles = [];
            var file1 = $(`#FP_BenchmarkProductsImage`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#FP_BenchmarkProductsImage`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);

        }
    }
}

function documentFileValidation() {
    var flag = true;
    var supportedExtention = ['pdf', 'doc', 'xls', 'xlsx', 'ppt', 'pptx', 'docx', 'csv'];
    var fileLength = 0;
    var filesArray = [];

    filesArray = $(`#Supportingdocuments`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_SupportingDocuments').show();
            setTimeout(function () {
                $('#Err_SupportingDocuments').hide();
            }, 5000);

            $(`#Supportingdocuments`).val('');

            flag = false;

            return false;
        }
    });
    if (flag) {
        for (var i = 0; i < $(`#Supportingdocuments`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#Supportingdocuments`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#Supportingdocuments').val('');
                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#Supportingdocuments`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#Supportingdocuments`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);


        }
    }
}

var editDocId = 0;

function OnEditUploadedDoc(rowId) {

    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    $("#GetDocName").text(filename);
    editDocId = rowId;
}

$("#Supportingdocuments").on("change", function () {
    $("#GetDocName").empty();
});

function ViewUploadedDoc(rowId) {

    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {
        var imageUrl = ROOT + 'NPDImages/' + filename;
        window.open(imageUrl, '_blank');
    }
}

$("#ViewData").on("click", function () {
    $("#Document_show_popup").modal('show');
});

$("#ViewData").on("click", function () {
    $("#Document_show_popup").modal('show');
});

function DownloadUploadedDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {

        $('.Report').prop("href", ROOT + "ProjectBrief/DownloadImageFile?fileName=" + filename);
        return true;
    }
}
var data = [];
function OnRemoveImage(Image, TableClass) {

    var tableclass = TableClass
    var FormulationimageGridData = [];
    confirm("Are you sure you want to delete image?", function () {

        var filename = decodeURIComponent(Image)
        data.push(filename);

        var deleteImageIn_imageGrid = [];
        $.each(FormulationimageGrid, function (i, obj) {

            if (filename != FormulationimageGrid[i].Image && tableclass == FormulationimageGrid[i].TableClass) {
                FormulationimageGridData.push(FormulationimageGrid[i]);
            }
            if (filename == FormulationimageGrid[i].Image && tableclass == FormulationimageGrid[i].TableClass) {
                deleteImageIn_imageGrid.push(FormulationimageGrid[i])
            }
        });
        FormulationimageGrid = FormulationimageGrid.filter(obj1 =>
            !deleteImageIn_imageGrid.some(obj2 => obj1.TableClass == obj2.TableClass && obj1.Image == obj2.Image))

        jQuery('#uploaded_images_table1').jqGrid('clearGridData');
        $("#uploaded_images_table1").jqGrid('setGridParam', { data: FormulationimageGridData });
        $("#uploaded_images_table1").trigger('reloadGrid', [{ page: 1 }]);
        $("#Display_FP_BenchmarkProductsImage").empty();

        var InsertImageData = [];
        var InsertImage = "";
        var imageClass = TableClass;
        for (i = 0; i < FormulationimageGrid.length; i++) {
            if (FormulationimageGrid[i].TableClass == imageClass) {
                InsertImageData.push(FormulationimageGrid[i]);
            }
        }
        for (i = 0; i < InsertImageData.length; i++) {
            if (i + 1 == InsertImageData.length) {
                InsertImage += InsertImageData[i].Image;
            }
            else {
                InsertImage += InsertImageData[i].Image + ',';
            }
        }
        formulationProfileData_1[imageClass].BenchmarkProductsImageHide = InsertImage

        if (FormulationimageGridData.length == 0) {
            table = "FP_Table_" + tableclass;
            $(".formulation_table table").each(function (index) {
                var tableClass = $(this).attr("id");
                if (table == tableClass) {
                    $('#Images_show_popup1').modal('hide');
                    $(this).find(".imagesinfo").hide();
                }
            });
        }

    });
}

function OnDeleteUploadedDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    confirm("Are you sure you want to delete?", function () {
        if (filename.length > 0) {

            $.ajax({
                type: 'POST',
                url: ROOT + "ProjectBrief/DeleteImageFile",
                data: { fileName: filename },
                success: function (data) {
                    path = data;
                }
            });

            $("#Grid_Supporting_Document").jqGrid('delRowData', rowId);
            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
            var data1 = {}
            data1 = {
                DocumentName: filename
            }
            deleteImageIn_DocGrid.push(data1);
        }
    });
}

function onlyNumbers(evt) {
    var e = event || evt;
    var charCode = e.which || e.keyCode;

    if (evt.id == "BI_ProposedSellingPrice" || evt.id == "BI_ProposedTP" || evt.id == "BI_ExpectedGP") {


        if (evt.id == BI_ProposedSellingPrice) {
            if ($("#BI_ProposedSellingPrice").val().trim() == '') {
                nonZeroEntered = false;
            }
            var currentValue = evt.value;
            if (charCode === 48 && !nonZeroEntered) {
                return false;
            }
            if (charCode >= 49 && charCode <= 57) {
                nonZeroEntered = true;
            }
            if (charCode == 46 && currentValue.indexOf(".") !== -1) {
                return false;
            }

            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
                return false;
            }
        }
        else {
            var currentValue = evt.value;
            if (charCode == 46 && currentValue.indexOf(".") !== -1) {
                return false;
            }

            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
                return false;
            }
        }
    }
    else {
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
    }
    return true;
}
function onlyNumbersforMRP(evt) {
    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;
    if (evt != '') {
        var currentValue = evt.value;
    }
    if (charCode == 46 && (currentValue.indexOf(".") !== -1 || currentValue.length === 0)) {
        // if decimal point is pressed and it already exists in the value or it is pressed as the first character, return false
        return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }
    return true;
}
function restrictSpecialCharacters(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;

    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        return true;
    }
    else {
        return false;
    }
}
var formData = new FormData();

function validateFileUpload() {

    var flag = true;
    var supportedExtention = ['jpg', 'jpeg', 'png', 'gif', 'jfif', 'tiff', 'bmp', 'svg'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#PPR_ImagesUpload`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_Invalid_PPR_ImagesUpload').show();
            setTimeout(function () {
                $('#Err_Invalid_PPR_ImagesUpload').hide();
            }, 5000);

            $(`#PPR_ImagesUpload`).val('');

            flag = false;

            return false;
        }
    });

    if (flag) {

        for (var i = 0; i < $(`#PPR_ImagesUpload`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#PPR_ImagesUpload`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#PPR_ImagesUpload').val('');
                $('#deleteSelectedFile').hide();
                $(`#PPR_ImagesUpload`).get(0).val('');


                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#PPR_ImagesUpload`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#PPR_ImagesUpload`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);
        }
    }
}


colmodels =
    [
        {
            name: 'Image',
            label: 'Image Name',
            width: 200,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TableClass',
            label: 'TableClass',
            width: 90,
            resizable: true,
            ignoreCase: true,
            hidden: true,
        },
        {
            name: 'TableId',
            label: 'TableId',
            width: 90,
            resizable: true,
            ignoreCase: true,
            hidden: true,
        },
        {
            name: '',
            label: 'Action',
            width: 50,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                var imageName = encodeURIComponent(rowobject.Image);
                return '<div class="text-center icon_section align-items-left">' +
                    '<span class="action-link"><a class="btn-icon -download DownloadImage" title="Download Image" onclick=DownloadUploadedImage("' + imageName + '") id="DownloadImage"><i class="fas fa-download color-download" aria-hidden="true"></i></a></span>' +
                    '<span class="action-link"><a class="btn-icon -view ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye color-eye"></i></a></span>' +
                    '<span class="action-link"><a class="btn-icon -delete DeletePopUpImage" title="Delete Image" onclick=OnRemoveFormulationImage("' + imageName + '","' + rowobject.TableClass + '")><i class="fas fa-trash color-delete"></i></a></span>' +
                    '</div>';
            }
        },
    ],

    $("#uploaded_images_table").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_uploaded_images_table',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#uploaded_images_table tbody tr");
            var objHeader = $("#uploaded_images_table tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            if (isPreview == 1) {
                $("#uploaded_images_table").find('.DeletePopUpImage').hide();
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
function ShowImages(rowId) {

    var imageGridData = [];
    var filename = packagingProfileData_1[rowId].ImagesUploadHide;
    $.each(imageGrid, function (i, obj) {
        if (rowId == imageGrid[i].TableClass) {
            imageGridData.push(imageGrid[i]);
        }

    });
    jQuery('#uploaded_images_table').jqGrid('clearGridData');
    $("#uploaded_images_table").jqGrid('setGridParam', { data: imageGridData });
    $("#uploaded_images_table").trigger('reloadGrid', [{ page: 1 }]);
    $('#Images_show_popup').modal('show');
}

function DownloadUploadedImage(filename) {

    if (filename.length > 0) {
        var downloadLink = $('<a>')
            .attr('href', ROOT + "ProjectBrief/DownloadImageFile?fileName=" + decodeURIComponent(filename))
            .attr('target', '_blank')
            .attr('download', filename)
            .appendTo('body');

        downloadLink[0].click();
        downloadLink.remove();
        return true;
    }
}

function ViewUploadedImage(filename) {

    if (filename.length > 0) {
        var imageUrl = ROOT + 'NPDImages/' + decodeURIComponent(filename);
        window.open(imageUrl, '_blank');
    }
}


var data = [];
function OnRemoveFormulationImage(Image, TableClass) {

    var tableclass = TableClass
    var imageGridData = [];
    confirm("Are you sure you want to delete image?", function () {

        var filename = decodeURIComponent(Image)
        data.push(filename);
        var deleteImageIn_imageGrid = [];
        $.each(imageGrid, function (i, obj) {

            if (filename != imageGrid[i].Image && tableclass == imageGrid[i].TableClass) {
                imageGridData.push(imageGrid[i]);
            }
            if (filename == imageGrid[i].Image && tableclass == imageGrid[i].TableClass) {
                deleteImageIn_imageGrid.push(imageGrid[i])
            }
        });
        imageGrid = imageGrid.filter(obj1 =>
            !deleteImageIn_imageGrid.some(obj2 => obj1.TableClass == obj2.TableClass && obj1.Image == obj2.Image))

        jQuery('#uploaded_images_table').jqGrid('clearGridData');
        $("#uploaded_images_table").jqGrid('setGridParam', { data: imageGridData });
        $("#uploaded_images_table").trigger('reloadGrid', [{ page: 1 }]);
        $("#Display_PackageImagesUpload").empty();
        var InsertImageData = [];
        var InsertImage = "";
        var imageClass = TableClass;
        for (i = 0; i < imageGrid.length; i++) {
            if (imageGrid[i].TableClass == imageClass) {
                InsertImageData.push(imageGrid[i]);
            }
        }
        for (i = 0; i < InsertImageData.length; i++) {
            if (i + 1 == InsertImageData.length) {
                InsertImage += InsertImageData[i].Image;
            }
            else {
                InsertImage += InsertImageData[i].Image + ',';
            }
        }
        packagingProfileData_1[imageClass].ImagesUploadHide = InsertImage

        if (imageGridData.length == 0) {
            table = "PPR_Table_" + tableclass;
            $(".formulation_table table").each(function (index) {
                var tableClass = $(this).attr("id");
                if (table == tableClass) {
                    $('#Images_show_popup').modal('hide');
                    $(this).find(".imagesinfo").hide();
                }
            });
        }
    });
}



colmodels =
    [
        {
            name: 'Image',
            label: 'Image Name',
            width: 200,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TableClass',
            label: 'TableClass',
            width: 90,
            resizable: true,
            ignoreCase: true,
            hidden: true,
        },
        {
            name: '',
            label: 'Action',
            width: 50,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {

                var imageName = encodeURIComponent(rowobject.Image);
                return '<div class="text-center icon_section align-items-left">' +
                    '<span class="action-link ml-2"><a class="DownloadImage" title="Download Image" onclick=DownloadUploadedImage("' + imageName + '") id="DownloadImage"><i class="fas fa-download color-download" aria-hidden="true"></i></a></span>' +
                    '<span class="action-link ml-2"><a class="ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye color-eye"></i></a></span>' +
                    '<span class="action-link ml-2"><a class="DeletePopUpImage" title="Delete Image" onclick=OnRemoveImage("' + imageName + '","' + rowobject.TableClass + '")><i class="fas fa-trash color-delete"></i></a></span>' +
                    '</div>';
            }

        },
    ],

    $("#uploaded_images_table1").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_uploaded_images_table1',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#uploaded_images_table1 tbody tr");
            var objHeader = $("#uploaded_images_table1 tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            if (isPreview == 1) {
                $("#uploaded_images_table1").find('.DeletePopUpImage').hide();
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
function DispalyImages(rowId) {

    var FormulationimageGridData = [];
    var filename = formulationProfileData_1[rowId].BenchmarkProductsImage;
    $.each(FormulationimageGrid, function (i, obj) {
        if (rowId == FormulationimageGrid[i].TableClass) {
            FormulationimageGridData.push(FormulationimageGrid[i]);
        }
    });
    jQuery('#uploaded_images_table1').jqGrid('clearGridData');
    $("#uploaded_images_table1").jqGrid('setGridParam', { data: FormulationimageGridData });
    $("#uploaded_images_table1").trigger('reloadGrid', [{ page: 1 }]);

    $('#Images_show_popup1').modal('show');
}


// save the form

function ValidateSaveForm() {

    $('#NPD_Save_Ok').prop("disabled", false);

    var npdHeaderTableData = [];
    var projectDetailsData = [];
    var projectName = $('#Npd_ProjectName').val().trim();
    var businessObjective = CKEDITOR.instances["Npd_BusinessObjective"].getData();
    var targetConsumer = $('#PP_TargetConsumer').val();
    var competitiveOfferings = CKEDITOR.instances["PP_CompetitiveOfferings"].getData();
    var unmetNeed = CKEDITOR.instances["PP_UnmetNeed"].getData();
    var initiatorRemarks = $('#Npd_InitiatorRemarks').val();
    var productPositioningGridData = $('#Product_Positioning').jqGrid('getGridParam', 'data');
    var formulationProfileGridData = formulationProfileData_1.filter(row => row.length !== 0);
    var packagingProfileGridData = packagingProfileData_1.filter(row => row.length !== 0);
    var businessInformationGridData = $('#Business_Information').jqGrid('getGridParam', 'data');
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

    businessInformationGridData = businessInformationGridData.map(function (obj) {
        obj.BusinessValue = obj.BusinessValue.replaceAll(',', '');
        return obj;
    });

    var flag = true;

    $('#Npd_Category-error').hide();
    $('#Division-error').hide();

    $('.Error_ProjectDetails').hide();
    $('.Error_EmptyGrid').hide();


    if ($('#Npd_ProjectName-error').text() != '') {
        flag = false;
        $("#Error_Npd_ProjectName").hide();
    }
    else {
        projectName == "" ? ($('#Error_Npd_ProjectName').show(), flag = false) : $('#Error_Npd_ProjectName').hide();
    }
    //$('#Npd_Form_Submit').validate();
    //if ($('#Npd_Form_Submit').valid()) {
    //}
    //else {
    //    flag = false;
    //}

    if (flag) {

        $('div#SaveModal').modal('show');
        $("#NPD_Save_Ok").click(function () {

            $('#NPD_Save_Ok').prop("disabled", true);
            $("#NPD_Table").each(function (i) {

                npdHeaderTableData.push({
                    ProjectName: projectName,
                    ProjectType: "1",
                    Hub: $(this).find('#NPD_Hub').text(),
                    Division: $(this).find('#NPD_Division option:selected').val(),
                    Category: $(this).find('#NPD_Category option:selected').val(),
                    InitiatedBy: $.trim($(this).find('#NPD_InitiatedBy').text()),
                    InitiatedDate: $(this).find('#NPD_InitiatedDate').text(),
                    Status: "1"
                });
            });

            projectDetailsData = [{
                ProjectName: projectName,
                BusinessObjective: businessObjective,
                TargetConsumer: targetConsumer,
                CompetitiveOfferings: competitiveOfferings,
                UnmetNeed: unmetNeed,
                InitiatorRemarks: initiatorRemarks
            }];


            $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
            $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
            $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
            $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
            $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
            $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#NpdStatus').val(1);

            document.getElementById('Npd_Form_Submit').submit();

        });
    }
}
function ValidateSendToManagerForm() {

    $('#NPD_Submit_Ok').prop("disabled", false);

    var npdHeaderTableData = [];
    var projectDetailsData = [];
    var approvalStatus = [];

    var projectName = $('#Npd_ProjectName').val().trim();
    var businessObjective = CKEDITOR.instances["Npd_BusinessObjective"].getData();
    var targetConsumer = $('#PP_TargetConsumer').val();
    var competitiveOfferings = CKEDITOR.instances["PP_CompetitiveOfferings"].getData();
    var unmetNeed = CKEDITOR.instances["PP_UnmetNeed"].getData();
    var initiatorRemarks = $('#Npd_InitiatorRemarks').val();
    var productPositioningGridData = $('#Product_Positioning').jqGrid('getGridParam', 'data');
    var formulationProfileGridData = formulationProfileData_1.filter(row => row.length !== 0);
    var packagingProfileGridData = packagingProfileData_1.filter(row => row.length !== 0);
    var businessInformationGridData = $('#Business_Information').jqGrid('getGridParam', 'data');
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

    var contentWithoutTags = businessObjective.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
    businessInformationGridData = businessInformationGridData.map(function (obj) {
        obj.BusinessValue = obj.BusinessValue.replaceAll(',', '');
        return obj;
    });

    var flag = true;

    $('.Error_ProjectDetails').hide();

    $('#Npd_Form_Submit').validate();
    if ($('#Npd_Form_Submit').valid()) {
    }
    else {
        flag = false;
    }

    $("#Division").val() == "" ? ($('#ErrorDivision').show(), flag = false) : $('#ErrorDivision').hide();
    $("#Npd_Category").val() == "" ? ($('#ErrorCategory').show(), flag = false) : $('#ErrorCategory').hide();

    if ($('#Npd_BusinessObjective-error').text() != '') {
        $("#Error_Npd_BusinessObjective").hide();
    }
    else {
        actualData == '' ? ($("#Error_Npd_BusinessObjective").show(), flag = false) : $("#Error_Npd_BusinessObjective").hide();
    }
    projectName == "" ? ($('#Error_Npd_ProjectName').show(), flag = false) : $('#Error_Npd_ProjectName').hide();
    targetConsumer == "" ? ($('#Error_PP_TargetConsumer').show(), flag = false) : $('#Error_PP_TargetConsumer').hide();

    productPositioningGridData.length === 0 ? ($('#Error_ProductPositioning').show(), flag = false) : $('#Error_ProductPositioning').hide();
    formulationProfileGridData.length === 0 ? ($('#Error_FormulationProfile').show(), flag = false) : $('#Error_FormulationProfile').hide();
    packagingProfileGridData.length === 0 ? ($('#Error_PackagingProfile').show(), flag = false) : $('#Error_PackagingProfile').hide();
    businessInformationGridData.length === 0 ? ($('#Error_BusinessInformation').show(), flag = false) : $('#Error_BusinessInformation').hide();
    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if (flag) {

        $('div#SubmitModal').modal('show');
        $("#NPD_Submit_Ok").click(function () {

            $('#NPD_Submit_Ok').prop("disabled", true);
            $("#NPD_Table").each(function (i) {

                npdHeaderTableData.push({
                    ProjectName: projectName,
                    ProjectType: "1",
                    Hub: $(this).find('#NPD_Hub').text(),
                    Division: $(this).find('#NPD_Division option:selected').val(),
                    Category: $(this).find('#NPD_Category option:selected').val(),
                    InitiatedBy: $.trim($(this).find('#NPD_InitiatedBy').text()),
                    InitiatedDate: $(this).find('#NPD_InitiatedDate').text(),
                    Status: "9"
                });
            });
            projectDetailsData = [{
                ProjectName: projectName,
                BusinessObjective: businessObjective,
                TargetConsumer: targetConsumer,
                CompetitiveOfferings: competitiveOfferings,
                UnmetNeed: unmetNeed,
                InitiatorRemarks: initiatorRemarks
            }];

            approvalStatus = [{
                FromStage: 1,
                FromStageName: "Draft",
                Action: "Send to Manager Review",
                ToStage: 9,
                ToStageName: "Pending For Approval"
            }];

            $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
            $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
            $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
            $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
            $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
            $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));

            $('#NpdStatus').val(9);

            document.getElementById('Npd_Form_Submit').submit();

        });
    }
}

function ValidateSubmitForm() {

    $('#NPD_Submit_Ok').prop("disabled", false);

    var npdHeaderTableData = [];
    var projectDetailsData = [];
    var approvalStatus = [];

    var projectName = $('#Npd_ProjectName').val().trim();
    var businessObjective = CKEDITOR.instances["Npd_BusinessObjective"].getData();
    var targetConsumer = $('#PP_TargetConsumer').val();
    var competitiveOfferings = CKEDITOR.instances["PP_CompetitiveOfferings"].getData();
    var unmetNeed = CKEDITOR.instances["PP_UnmetNeed"].getData();
    var initiatorRemarks = $('#Npd_InitiatorRemarks').val();
    var productPositioningGridData = $('#Product_Positioning').jqGrid('getGridParam', 'data');
    var formulationProfileGridData = formulationProfileData_1.filter(row => row.length !== 0);
    var packagingProfileGridData = packagingProfileData_1.filter(row => row.length !== 0);
    var businessInformationGridData = $('#Business_Information').jqGrid('getGridParam', 'data');
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

    businessInformationGridData = businessInformationGridData.map(function (obj) {
        obj.BusinessValue = obj.BusinessValue.replaceAll(',', '');
        return obj;
    });

    var flag = true;

    $('.Error_ProjectDetails').hide();

    $('#Npd_Form_Submit').validate();
    if ($('#Npd_Form_Submit').valid()) {
    }
    else {
        flag = false;
    }


    $("#Division").val() == "" ? ($('#ErrorDivision').show(), flag = false) : $('#ErrorDivision').hide();
    $("#Npd_Category").val() == "" ? ($('#ErrorCategory').show(), flag = false) : $('#ErrorCategory').hide();

    if ($('#Npd_BusinessObjective-error').text() != '') {
        $("#Error_Npd_BusinessObjective").hide();
    }
    else {
        CKEDITOR.instances["Npd_BusinessObjective"].getData() == '' ? ($("#Error_Npd_BusinessObjective").show(), flag = false) : $("#Error_Npd_BusinessObjective").hide();
    }
    projectName == "" ? ($('#Error_Npd_ProjectName').show(), flag = false) : $('#Error_Npd_ProjectName').hide();
    targetConsumer == "" ? ($('#Error_PP_TargetConsumer').show(), flag = false) : $('#Error_PP_TargetConsumer').hide();

    productPositioningGridData.length === 0 ? ($('#Error_ProductPositioning').show(), flag = false) : $('#Error_ProductPositioning').hide();
    formulationProfileGridData.length === 0 ? ($('#Error_FormulationProfile').show(), flag = false) : $('#Error_FormulationProfile').hide();
    packagingProfileGridData.length === 0 ? ($('#Error_PackagingProfile').show(), flag = false) : $('#Error_PackagingProfile').hide();
    businessInformationGridData.length === 0 ? ($('#Error_BusinessInformation').show(), flag = false) : $('#Error_BusinessInformation').hide();
    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if (flag) {
        $('div#SubmitModal').modal('show');
        $("#NPD_Submit_Ok").click(function () {

            $('#NPD_Submit_Ok').prop("disabled", true);

            $("#NPD_Table").each(function (i) {

                npdHeaderTableData.push({
                    ProjectName: projectName,
                    ProjectType: "1",
                    Hub: $(this).find('#NPD_Hub').text(),
                    Division: $(this).find('#NPD_Division option:selected').val(),
                    Category: $(this).find('#NPD_Category option:selected').val(),
                    InitiatedBy: $.trim($(this).find('#NPD_InitiatedBy').text()),
                    InitiatedDate: $(this).find('#NPD_InitiatedDate').text(),
                    Status: "2"
                });
            });
            projectDetailsData = [{
                ProjectName: projectName,
                BusinessObjective: businessObjective,
                TargetConsumer: targetConsumer,
                CompetitiveOfferings: competitiveOfferings,
                UnmetNeed: unmetNeed,
                InitiatorRemarks: initiatorRemarks
            }];

            approvalStatus = [{
                FromStage: 1,
                FromStageName: "Draft",
                Action: "Submit",
                ToStage: 2,
                ToStageName: "HGML Review"
            }];

            $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
            $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
            $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
            $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
            $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
            $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));

            $('#NpdStatus').val(2);

            document.getElementById('Npd_Form_Submit').submit();

        });
    }
}

$('#Npd_ProjectName,#PP_TargetConsumer, #Npd_InitiatorRemarks').change(function () {

    $('.Npd_ProjectName_V').text($('#Npd_ProjectName').val())
    $('.PP_TargetConsumer_V').text($('#PP_TargetConsumer').val())
    $('.Npd_InitiatorRemarks_V').text($('#Npd_InitiatorRemarks').val())
});

CKEDITOR.instances.Npd_BusinessObjective.on('change', function () {
    $('.Npd_BusinessObjective_V').empty();
    var businessobjective = `<span>` + CKEDITOR.instances["Npd_BusinessObjective"].getData() + `</span>`;
    $('.Npd_BusinessObjective_V').append(businessobjective);
});
CKEDITOR.instances.PP_CompetitiveOfferings.on('change', function () {
    $('.PP_CompetitiveOfferings_V').empty();
    var competativeoffering = `<span>` + CKEDITOR.instances["PP_CompetitiveOfferings"].getData() + `</span>`;
    $('.PP_CompetitiveOfferings_V').append(competativeoffering);
});
CKEDITOR.instances.PP_UnmetNeed.on('change', function () {
    $('.PP_UnmetNeed_V').empty();
    var unmetneed = `<span>` + CKEDITOR.instances["PP_UnmetNeed"].getData() + `</span>`;
    $('.PP_UnmetNeed_V').append(unmetneed);
});

$(".preview").on("click", function () {
    $(".edithide").hide();
    $(".deletehide").hide();

    $(".Division_V").text($("#Division option:selected").text())
    $(".Npd_Category_V").text($("#Npd_Category option:selected").text())
    if ($(".Division_V").text() == "--Select--") {
        $(".Division_V").text('');
    }
    if ($(".Npd_Category_V").text() == "--Select--") {
        $(".Npd_Category_V").text('');
    }


    isPreview = 1;
});

$('.modal.preview').on('hidden.bs.modal', function (e) {
    $(".edithide").show();
    $(".deletehide").show();
    isPreview = 0;
});
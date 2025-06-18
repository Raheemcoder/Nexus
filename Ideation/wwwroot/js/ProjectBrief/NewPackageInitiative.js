var productDescriptionProductNameList = [];
var packagingProfileProductNameList = [];
var businessInformationProductNameList = [];
var SustainabilityProductNameList = [];
var deleteImageIn_DocGrid = [];
var IsPreview = 0;
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(document).scrollTop() >= 50) {
            $("body").addClass("test");
        } else {
            $("body").removeClass("test");
        }
    });

    $('body').on('keyup', '.trim', function () {
        var index = this.value.length - 2;
        var key = this.value.charAt(index);
        var initialkey = this.value.charAt(0);
        if ((!(key === " " || key === "    ") && (index > -1)) && (initialkey != " ")) {
            this.value = this.value;
        } else {
            this.value = this.value.trim();
        }
    });
});
CKEDITOR.replace('editor1', {
    height: 150,
    toolbarGroups: [
        {
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
CKEDITOR.replace('editor2', {
    height: 50,
    toolbarGroups: [
        {
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
CKEDITOR.replace('editor3', {
    height: 50,
    toolbarGroups: [
        {
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
CKEDITOR.replace('editor4', {
    height: 50,
    toolbarGroups: [
        {
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
CKEDITOR.replace('editor5', {
    height: 50,
    toolbarGroups: [
        {
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
CKEDITOR.replace('ExpectedPack_PrimaryPackaging', {
    height: 50,
    toolbarGroups: [

        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_SecondaryPackaging', {
    height: 50,
    toolbarGroups: [

        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_TertiaryPackaging', {
    height: 50,
    toolbarGroups: [
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_BenchmarkProduct', {
    height: 50,
    toolbarGroups: [
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_DesiredPack', {
    height: 50,
    toolbarGroups: [
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_Other', {
    height: 50,
    toolbarGroups: [
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

var prevSectionId = ""; // Variable to store the previous section ID

function moveToTop(sectionId, additionalClass) {
    var section = document.getElementById(sectionId);
    if (section) {
        // Remove 'active' class from all links
        var allLinks = document.querySelectorAll('.link_href a');
        allLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        // Remove the previous additional class from the previous section
        if (prevSectionId !== "") {
            var prevSection = document.getElementById(prevSectionId);
            if (prevSection) {
                prevSection.classList.remove(additionalClass);
            }
        }

        // Add 'active' class to the clicked link
        var clickedLink = document.querySelector('.link_href a[href="#' + sectionId + '"]');
        if (clickedLink) {
            clickedLink.classList.add('active');
        }

        // Add the specified additional class to the current section
        section.classList.add(additionalClass);

        // Scroll to the section
        var sectionTop = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: sectionTop, behavior: 'smooth' });

        // Update the previous section ID
        prevSectionId = sectionId;
    }
}
function updateLabel(selectElement) {
    var label = selectElement.nextElementSibling; // Get the label element

    if (selectElement.value !== "") {
        label.style.top = "10px";
        label.style.fontSize = "12px";

        label.style.color = "#555";
    } else {
        label.style.top = "50%";
        label.style.fontSize = "16px";
        label.style.color = "";
    }
}

$('.body-content').scroll(function () {
    var sticky = $('.body-content'),
        scroll = $('.body-content').scrollTop();
    if (scroll >= 130) sticky.addClass('fixed');
    else sticky.removeClass('fixed');

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
$("#Division").change(function () {
    $('#Error_Pack_Division').hide()
});


$(".addCategoryOption").change(function () {
    $('#Error_pack_Category').hide()
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
                })
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});
$("#ProductDescription_ProjectName").on('change keypress', function () {
    $("#Error_in_ProjectName").prop("hidden", true);
});

CKEDITOR.instances.editor1.on('change', function () {
    var BusinessRationalData = CKEDITOR.instances["editor1"].getData();

    var contentWithoutTags = BusinessRationalData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
    //CKEDITOR.instances['editorsk1'].setData(actualData);
    if (actualData == '') {
        $("#ErrorIn_BusinessRational").prop("hidden", false)
    } else {
        $("#ErrorIn_BusinessRational").prop("hidden", true);
    }
});

var todayDate = new Date();
$('#PackageInitiative_InitatedOn').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));


function OnEditProductDesc(RowData) {
    $(".ToClearData").val("");
    $("#Error_PP_Product").text("");
    var DataFromTheRow1 = jQuery('#product_description').jqGrid('getRowData', RowData);
    $('#ProductDescription_Product').val(DataFromTheRow1.ProductName);
    $('#ProductDescription_NewBrandName').val(DataFromTheRow1.NewBrandName);
    $('#ProductDescription_SKU').val(DataFromTheRow1.SKU);
    EditProductDescriptionRow = RowData;
    $(".remove").prop("hidden", true);
}
colmodels = [


    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        search:false,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center  action_icons icon_section align-items-left">' +
                '<a onclick="OnEditProductDesc(' + options.rowId + ')" class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen pr-2 color-info" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a  onclick="OnDeleteProductDesc(' + options.rowId + ')" class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';
        }
    },
    {
        name: 'ProductName',
        label: 'Product Name',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'NewBrandName',
        label: 'New Brand Name',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
],

    $("#product_description").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#product_pager',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#product_description tbody tr");
            var objHeader = $("#product_description tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#product_description_PV").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#product_pager_V',
    rowNum: 30,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#product_description_PV tbody tr");
        var objHeader = $("#product_description_PV tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#product_description_PV").jqGrid('hideCol', "Action");


    }
});
$("#product_description").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

function OnDeleteProductDesc(RowData) {
    var businessInformationRowId = [];
    var packagingProfileRowId = [];
    var SustainabilityRowId = [];
    var productDescription = jQuery('#product_description').jqGrid('getRowData', RowData);
    var ppProductName = productDescription.ProductName;
    var businessInformationData = $("#business_info").jqGrid("getGridParam", "data");
    var sustainabilityData = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");

    $(".formulation_table table").each(function (index) {
        var tableId = $(this).attr("id");
        var productName = $(this).find("th span:first").text();
        if (ppProductName == productName) { packagingProfileRowId.push(tableId) }
    });

    $.each(businessInformationData, function (i, biData) {
        if (biData.Product == ppProductName) {
            businessInformationRowId.push(i + 1);
        }
    });

    $.each(sustainabilityData, function (i, SData) {
        if (SData.Product == ppProductName) {
            SustainabilityRowId.push(i + 1);
        }
    });


    confirm("Deleting a Product Name from Product Description will delete all the records in Packaging Profile,Business Information and Sustainability respective to that Product.<br> Are you sure you want to delete?", function () {

        $("#product_description").jqGrid('delRowData', RowData);
        $("#product_description").trigger('reloadGrid', [{ page: 1 }]);

        $.each(packagingProfileRowId, function (i, obj) {

            OnDeleteExpectedPackaging(obj, 1)
        });
        var tables = $(".formulation_table table");
        tables.each(function (index) {
            var newTableID = "myTable" + (index + 1);
            $(this).attr("id", newTableID);
        });
        $.each(businessInformationRowId.reverse(), function (i, biRowId) {

            $("#business_info").jqGrid('delRowData', biRowId);
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);

        });
        $.each(SustainabilityRowId.reverse(), function (i, SRowId) {

            $("#SustainabiltityGrid").jqGrid('delRowData', SRowId);
            $("#SustainabiltityGrid").trigger('reloadGrid', [{ page: 1 }]);

        });

        $(".ToClearData").val("");
        EditProductDescriptionRow = 0;

        var productList = $("#product_description").jqGrid("getCol", "ProductName");

        if (productList.length > 0) {
            var productOption = "";
            $("option").remove(".ProductOption");
            $.each(productList, function (i, obj) {

                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            });

            $("#BusinessInfo_Product,#ExpectedPackage_Product,#Sustain_Product").append(productOption);
        }

        productDescriptionProductNameList = jQuery('#product_description').jqGrid("getCol", "ProductName");

        businessInformationProductNameList = $("#business_info").jqGrid("getCol", "Product");
        businessInformationProductNameList = productDescriptionProductNameList.slice(0);

        SustainabilityProductNameList = $("#SustainabiltityGrid").jqGrid("getCol", "Product");
        SustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, SustainabilityProductNameList) == -1 });

        $("option").remove("#BusinessInfo_Product .ProductOption");

        if (businessInformationProductNameList.length > 0) {

            var productOption = "";

            $.each(businessInformationProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#BusinessInfo_Product").append(productOption);
        }

        $("option").remove("#Sustain_Product .ProductOption");

        if (SustainabilityProductNameList.length > 0) {

            var productOption = "";

            $.each(SustainabilityProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#Sustain_Product").append(productOption);
        }
    });
}
$('#AddProductDescription').on("click", function () {
    var flag = true;
    var Product = $.trim($("#ProductDescription_Product").val());

    var tempSku = $('#ProductDescription_SKU').val().replace(/(^,|,$)/g, '').replace(/,,+/g, ',');
    var arr = tempSku.split(/\s*,\s*/);
    var uniqueArr = [];
    var uniqueObj = {};
    arr.forEach(function (item) {
        var lowerItem = item.toLowerCase().replace(/\s+/g, '');
        if (!uniqueObj[lowerItem]) {
            uniqueObj[lowerItem] = true;
            uniqueArr.push(item);
        }
    });
    var resultSku = uniqueArr.join(',').replace(/(^,|,$)/g, '').replace(/,,+/g, ',');
    var SKU = $.trim(resultSku);
    var productList = $("#product_description").jqGrid("getCol", "ProductName");
    var flag1 = 0;

    productList.forEach(function (item, index) {

        if (item == Product && EditProductDescriptionRow != (index + 1)) {

            flag = false;
            flag1 = 1;
        }
    });

    flag1 == 1 ? ($("#Error_PP_Product").show().text('This Product already consists the definition, Please enter the different Product')) : $("#Error_PP_Product").hide().text('');
    if (Product == "") {
        flag = false;
        Product == "" ? $("#Error_PP_Product").show().text('Please enter Product Name') : $("#Error_PP_Product").hide().text('');
    }
    if (SKU == "" || SKU < 0) {
        flag = false;
        $("#ErrorIn_SKU").prop("hidden", false);
    }
    if (flag) {
        var griddata = [];
        var ProductDescription = {};
        ProductDescription =
        {
            ProductName: Product,
            NewBrandName: $.trim($("#ProductDescription_NewBrandName").val()),
            SKU: SKU,
        }
        if (EditProductDescriptionRow == 0) {
            griddata.push(ProductDescription);
            var ProductDescription1 = $("#product_description").jqGrid('getGridParam', 'data');
            var ProductDescription2 = $.merge(ProductDescription1, griddata);
            $("#product_description").jqGrid('setGridParam', { data: ProductDescription2 });
            $("#product_description").trigger('reloadGrid', [{ page: 1 }]);

            $("#product_description_PV").jqGrid('setGridParam', { data: ProductDescription2 });
            $("#product_description_PV").trigger('reloadGrid', [{ page: 1 }]);

        }
        else {
            var previousRowData = jQuery("#product_description").jqGrid('getRowData', EditProductDescriptionRow);
            var oldProductName = previousRowData.ProductName;

            if (Product != oldProductName) {
                var businessInformationData = $("#business_info").jqGrid('getGridParam', 'data');
                var SustainData = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");

                $(".formulation_table table").each(function (index) {
                    var tableId = $(this).attr("id");
                    var productName = $(this).find(".expectedProduct").text();
                    if (oldProductName == productName) {
                        $("#" + tableId).find('thead .expectedProduct').text(Product);
                    }
                });

                $.each(businessInformationData, function (i, biData) {
                    if (biData.Product == oldProductName) {

                        $("#business_info").jqGrid('setCell', (i + 1), "Product", Product);
                    }
                });
                $.each(SustainData, function (i, SData) {
                    if (SData.Product == oldProductName) {

                        $("#SustainabiltityGrid").jqGrid('setCell', (i + 1), "Product", Product);
                    }
                });
            }
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
            $("#SustainabiltityGrid").trigger('reloadGrid', [{ page: 1 }]);
            $("#product_description").jqGrid('setRowData', EditProductDescriptionRow, ProductDescription);
            $("#product_description").trigger('reloadGrid', [{ page: 1 }]);
            EditProductDescriptionRow = 0;
        }
        $(".ToClearData").val("");
        $("#productdescriptionMsg").prop("hidden", true);
        productDescriptionProductNameList = jQuery('#product_description').jqGrid("getCol", "ProductName");
        businessInformationProductNameList = $("#business_info").jqGrid("getCol", "Product");
        businessInformationProductNameList = productDescriptionProductNameList.slice(0);
        packagingProfileProductNameList = productDescriptionProductNameList.slice(0);
        SustainabilityProductNameList = $("#SustainabiltityGrid").jqGrid("getCol", "Product");
        SustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, SustainabilityProductNameList) == -1 });
        $("option").remove("#BusinessInfo_Product .ProductOption");

        if (businessInformationProductNameList.length > 0) {

            var productOption = "";

            $.each(businessInformationProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#BusinessInfo_Product").append(productOption);
        }

        $("option").remove("#ExpectedPackage_Product .ProductOption");

        if (packagingProfileProductNameList.length > 0) {

            var productOption = "";

            $.each(packagingProfileProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#ExpectedPackage_Product").append(productOption);
        }
        $("option").remove("#Sustain_Product .ProductOption");

        if (SustainabilityProductNameList.length > 0) {

            var productOption = "";

            $.each(SustainabilityProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#Sustain_Product").append(productOption);
        }
    }
    $("#BusinessInfo_BusinessValue").on("click", function () {

        if ($("#BusinessInfo_BusinessValue").val() == 'NaN') {
            $("#BusinessInfo_BusinessValue").val("");
        }
    });

    $("#BusinessInfo_ProposeSellingPrice, #BusinessInfo_Y2Quantity").change(function () {

        $("#BusinessInfo_BusinessValue").val("");
        if (isNaN($("#BusinessInfo_ProposeSellingPrice").val()) || isNaN($("#BusinessInfo_Y2Quantity").val())) {
            $("#BusinessInfo_BusinessValue").val("");
        }
        else {
            if ($("#BusinessInfo_ProposeSellingPrice").val() != "" && $("#BusinessInfo_Y2Quantity").val() != "") {

                const value = ($("#BusinessInfo_ProposeSellingPrice").val().replaceAll(',', '')) * ($("#BusinessInfo_Y2Quantity").val().replaceAll(',', ''));
                const formattedValue = value.toLocaleString('en-Us', { maximumFractionDigits: 0 });

                $("#BusinessInfo_BusinessValue").val(formattedValue);
                $("#ErrorInBusinessInfo_BusinessValue").prop("hidden", true);
            }
        }
    });
    $('.data-datepicker').datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'dd-mm-yyyy',
        startDate: '+0d'
    });

});


var EditSustainRowId = 0
function OnEditSustainability(RowData) {
    $(".Toremove").val("");
    var DataFromTheRow = jQuery('#SustainabiltityGrid').jqGrid('getRowData', RowData);
    $('#Sustain_Target').val(DataFromTheRow.TargetedSustainGoals);
    $('#Sustain_Reusable').val(DataFromTheRow.Reusable);
    $('#Sustain_Recycle').val(DataFromTheRow.Recycle);
    $('#Sustain_Reducing').val(DataFromTheRow.Reducing);
    $('#Sustain_Recovering').val(DataFromTheRow.Recovering);
    EditSustainRowId = RowData;
    var productList = $("#SustainabiltityGrid").jqGrid("getCol", "Product");
    SustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    SustainabilityProductNameList.push(DataFromTheRow.Product);
    $("option").remove("#Sustain_Product .ProductOption");
    if (SustainabilityProductNameList.length > 0) {
        var productOption = "";
        $.each(SustainabilityProductNameList, function (i, obj) {
            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });
        $("#Sustain_Product").append(productOption);
    }
    $('#Sustain_Product').val(DataFromTheRow.Product);
    $("#Error_Sustain_Product").hide();
    $("#Error_Sustain_Target").hide();
}
function OnDeleteSustainabitity(RowData) {
    confirm("Are you sure you want to delete?", function () {
        $("#SustainabiltityGrid").jqGrid('delRowData', RowData, '', '');
        $("#SustainabiltityGrid").trigger('reloadGrid', [{ page: 1 }]);
        var productList = $("#SustainabiltityGrid").jqGrid("getCol", "Product");
        $(".Toremove").val("");
        EditSustainRowId = 0;
        productDescriptionProductNameList = $("#product_description").jqGrid("getCol", "ProductName");
        SustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
        $("option").remove("#Sustain_Product .ProductOption");
        if (SustainabilityProductNameList.length > 0) {
            var productOption = "";
            $.each(SustainabilityProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#Sustain_Product").append(productOption);
        }
    });
}
$("#Sustain_Product").change(function () {
    var productName = $("#Sustain_Product").val();
    productName == "" ? $("#Error_Sustain_Product").show() : $("#Error_Sustain_Product").hide();
});
$("#Sustain_Target").on('keyup', function () {
    var sustainabilityProduct = $("#Sustain_Target").val();
    sustainabilityProduct == "" ? $("#Error_Sustain_Target").show() : $("#Error_Sustain_Target").hide();
});
colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 60,
        resizable: true,
        search:false,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center action_icons icon_section align-items-left">' +
                '<a onclick=OnEditSustainability(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen pr-2 color-info" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=OnDeleteSustainabitity(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';
        }
    },
    {
        name: 'Product',
        label: 'Product',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TargetedSustainGoals',
        label: 'What sustainability goals are targeted?',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Reusable',
        label: 'Reusable',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'Recycle',
        label: 'Recycle',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Reducing',
        label: 'Reducing',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'Recovering',
        label: 'Recovering',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
],

    $("#SustainabiltityGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_SustainabiltityGrid',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#SustainabiltityGrid tbody tr");
            var objHeader = $("#SustainabiltityGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#SustainabiltityGrid_PV").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_SustainabiltityGrid_V',
    rowNum: 30,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#SustainabiltityGrid tbody tr");
        var objHeader = $("#SustainabiltityGrid tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#SustainabiltityGrid_PV").jqGrid('hideCol', "Action");

    }
});

$("#SustainabiltityGrid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
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
function fileValidation() {
    var flag = true;
    var supportedExtention = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv'];
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
            $("#Grid_Supporting_Document_V").jqGrid('setGridParam', { data: doc2 });

            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
            $("#Grid_Supporting_Document_V").trigger('reloadGrid', [{ page: 1 }]);

        }
        else {

            $.each(docData, function (key, value) {
                $("#Grid_Supporting_Document").jqGrid('setCell', editDocId, key, value);
                $("#Grid_Supporting_Document_V").jqGrid('setCell', editDocId, key, value);

                $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
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
function DownloadUploadedDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {

        $('.Report').prop("href", ROOT + "ProjectBrief/DownloadImageFile?fileName=" + filename);
        return true;
    }
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
/*supporting document script*/
colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 40,
        resizable: true,
        ignoreCase: true,
        search:false,
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

            return '<div class="text-left icon_section action_icons align-items-left">' +
                '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                '<span class="action-link"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete" title="Delete"><i class="fas fa-trash color-delete" title="Delete"></i></a></span>' +
                '</div> ';
        }
    },
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 100,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'UploadedBy',
        label: 'Uploaded By',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },

],

    $("#Grid_Supporting_Document").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Grid_Supporting_Document',
        rowNum: 30,
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
$("#Grid_Supporting_Document_V").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_Grid_Supporting_Document_V',
    rowNum: 30,
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
        jQuery("#Grid_Supporting_Document_V").jqGrid('hideCol', "Action");

    }
});
$("#Grid_Supporting_Document").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 130) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
}
document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.ship_to');

    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('highlight_section');
            } else {
                entry.target.classList.remove('highlight_section');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(function (section) {
        observer.observe(section);
    });
});
var EditProductDescriptionRow = 0;
var RowId = 0;
var EditRowId1 = 0;

$("#ProductDescription_Product").change(function () {
    var productName = $.trim($("#ProductDescription_Product").val()).toLowerCase();
    productName == "" ? ($("#Error_PP_Product").show().text('Please enter Product Name')) : $("#Error_PP_Product").hide().text('');

    const productList = $("#product_description").jqGrid("getCol", "ProductName");

    const lowerCaseProductList = productList.map(product => product.toLowerCase());

    if (productName != "" && EditRowId1 == 0) {

        lowerCaseProductList.includes(productName) ? ($("#Error_PP_Product").show().text('Product already exists. Please add another product')) : $("#Error_PP_Product").hide().text('');
    }
});
$("#BusinessInfo_Product").change(function () {
    var productName = $("#BusinessInfo_Product").val();
    productName == "" ? ($("#Error_BI_Product").show().text('Please select Product')) : $("#Error_BI_Product").hide().text('');
});
$("#BusinessInfo_Product").change(function () {
    $("option").remove("#BusinessInfo_SKU .skuOption");
    var productName = $("#BusinessInfo_Product").val();
    $(".Error_BI_Product").hide().text('');

    $("option").remove("#BusinessInfo_SKU .options");

    $("option").remove("#BusinessInfo_SKU .skuOption");
    if (productName != "") {

        var gridData = $("#product_description").jqGrid('getGridParam', 'data');
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].ProductName == productName) {
                var sku = gridData[i].SKU;
                var skuList = sku.split(',');
                var skuOption = "";
                $.each(skuList, function (i, obj) {

                    if (obj != "" || obj != null || obj != undefined) {
                        skuOption += '<option class="skuOption" value="' + obj + '">' + obj + '</option>';
                    }
                });
                $('#BusinessInfo_SKU').append(skuOption);
                break;
            }
        }
    }
});
$("#ProductDescription_SKU").on('keypress change', function () {
    $("#ErrorIn_SKU").prop("hidden", true);
    $("#errorSKU").prop("hidden", true);
});

$("#BusinessInfo_SKU").on('keypress change', function () {
    $("#ErrorinBusinessInfo_SKU").prop("hidden", true);
});
$("#BusinessInfo_ProposedLaunchDate").change(function () {
    $("#BI_ProposedLaunchDate").val() == "" ? $("#ErrorInBusinessInfo_ProposedLunchDate").show() : $("#ErrorInBusinessInfo_ProposedLunchDate").hide();
    $("#DateError_ProposedLaunchDate").hide();
});
$("#BusinessInfo_ProposeSellingPrice").on('keypress change', function () {
    $("#ErrorInBusinessInfo_ProposedSellingPrice").prop("hidden", true);
});
$("#BusinessInfo_ProposeTP").on('keypress change', function () {
    $("#ErrorInBusinessInfo_ProposedTP").prop("hidden", true);
});
$("#BusinessInfo_ProposeMRP").on('keypress change', function () {
    $("#ErrorInBusinessInfo_ProposedMRP").prop("hidden", true);
});
$("#BI_Currency").on('change', function () {
    $("#ErrorInBusinessInfo_Currency").prop("hidden", true);
});
$("#BusinessInfo_ExpectedGP").on('keyup change', function () {
    $("#ErrorInBusinessInfo_ExpectedGP").prop("hidden", true);
    $("#Error_Range_ExpectedGP").hide();
});
$("#BusinessInfo_BusinessValue").on('change', function () {
    $("#ErrorInBusinessInfo_BusinessValue").prop("hidden", true);
});
$("#BusinessInfo_M1Quantity").on('keypress change', function () {
    $("#ErrorInBusinessInfo_M1Quantity").prop("hidden", true);
});
$("#BusinessInfo_M2Quantity").on('keypress change', function () {
    $("#ErrorInBusinessInfo_M2Quantity").prop("hidden", true);
});
$("#BusinessInfo_M3Quantity").on('keypress change', function () {
    $("#ErrorInBusinessInfo_M3Quantity").prop("hidden", true);
});
$("#BusinessInfo_Y1Quantity").on('keypress change', function () {
    $("#ErrorInBusinessInfo_Y1Quantity").prop("hidden", true);
});

$("#BusinessInfo_Y2Quantity").on('keypress change', function () {
    $("#ErrorInBusinessInfo_Y2Quantity").prop("hidden", true);
});

$("#BusinessInfo_Y3Quantity").on('keypress change', function () {
    $("#ErrorInBusinessInfo_Y3Quantity").prop("hidden", true);
});

$("#BusinessInfo_UOM").on('keypress change', function () {
    $("#ErrorInBusinessInfo_UOM").prop("hidden", true);
});
$("#AddBusinessInfoData").on("click", function () {
    var flag = true;
    var Product = $.trim($("#BusinessInfo_Product").val());
    var SKU = $.trim($("#BusinessInfo_SKU").val());
    var ProposeLaunchDate = $("#BusinessInfo_ProposedLaunchDate").val();
    var ProposedSellingPrice = $.trim($("#BusinessInfo_ProposeSellingPrice").val());
    var ProposedTP = $.trim($("#BusinessInfo_ProposeTP").val());
    var ProposedMRP = $.trim($("#BusinessInfo_ProposeMRP").val());
    var Currency = $("#BI_Currency").val();
    var ExpectedGP = $.trim($("#BusinessInfo_ExpectedGP").val());
    var M1Quantity = $.trim($("#BusinessInfo_M1Quantity").val());
    var M2Quantity = $.trim($("#BusinessInfo_M2Quantity").val());
    var M3Quantity = $.trim($("#BusinessInfo_M3Quantity").val());
    var M4Quantity = $.trim($("#BusinessInfo_M4Quantity").val());
    var M5Quantity = $.trim($("#BusinessInfo_M5Quantity").val());
    var M6Quantity = $.trim($("#BusinessInfo_M6Quantity").val());
    var Y1Quantity = $.trim($("#BusinessInfo_Y1Quantity").val());
    var Y2Quantity = $.trim($("#BusinessInfo_Y2Quantity").val());
    var Y3Quantity = $.trim($("#BusinessInfo_Y3Quantity").val());
    var UOM = $.trim($("#BusinessInfo_UOM").val());
    var BusinessValue = $("#BusinessInfo_BusinessValue").val();
    EditBusinessInfoRow == 0 && $("#Error_BI_Product").text() != '' ? flag = false : "";
    ExpectedGP = parseFloat(ExpectedGP.replace(/%/g, ''));
    M1Quantity = parseFloat(M1Quantity.replace(/,/g, ''));
    M2Quantity = parseFloat(M2Quantity.replace(/,/g, ''));
    M3Quantity = parseFloat(M3Quantity.replace(/,/g, ''));
    M4Quantity = parseFloat(M4Quantity.replace(/,/g, ''));
    M5Quantity = parseFloat(M5Quantity.replace(/,/g, ''));
    M6Quantity = parseFloat(M6Quantity.replace(/,/g, ''));
    Y1Quantity = parseFloat(Y1Quantity.replace(/,/g, ''));
    Y2Quantity = parseFloat(Y2Quantity.replace(/,/g, ''));
    Y3Quantity = parseFloat(Y3Quantity.replace(/,/g, ''));

    if (isNaN(ProposedSellingPrice) || isNaN(Y2Quantity)) {
        $("#BusinessInfo_BusinessValue").empty();
    }
    Product == "" ? $("#Error_BI_Product").show().text('Please select Product') : $("#Error_BI_Product").hide().text('');
    if (SKU == "" || SKU < 0) {
        flag = false;
        $("#ErrorinBusinessInfo_SKU").prop("hidden", false);
    }
    if (ProposeLaunchDate == "Invalid Date" || ProposeLaunchDate == "") {
        flag = false;
        $("#ErrorInBusinessInfo_ProposedLunchDate").show();
    }
    if (ProposedSellingPrice == "" || ProposedSellingPrice < 0 || isNaN(ProposedSellingPrice)) {
        flag = false;
        $("#ErrorInBusinessInfo_ProposedSellingPrice").prop("hidden", false);
    }
    if (ProposedTP == "" || isNaN(ProposedTP)) {
        flag = false;
        $("#ErrorInBusinessInfo_ProposedTP").prop("hidden", false);

    }
    if (ProposedMRP == "" || isNaN(ProposedMRP)) {
        flag = false;
        $("#ErrorInBusinessInfo_ProposedMRP").prop("hidden", false);

    }
    if (Currency == "") {
        flag = false;
        $("#ErrorInBusinessInfo_Currency").prop("hidden", false);
    }
    if (ExpectedGP == "" || isNaN(ExpectedGP)) {
        flag = false;
        $("#ErrorInBusinessInfo_ExpectedGP").prop("hidden", false);
        $('#Error_Range_ExpectedGP').hide();
    }
    if (M1Quantity === "" || isNaN(M1Quantity) || M1Quantity < 0) {
        flag = false;

        $("#ErrorInBusinessInfo_M1Quantity").prop("hidden", false);

    }
    if (M2Quantity === "" || isNaN(M2Quantity) || M2Quantity < 0) {
        flag = false;
        $("#ErrorInBusinessInfo_M2Quantity").prop("hidden", false);
    }
    if (M3Quantity === "" || isNaN(M3Quantity) || M3Quantity < 0) {
        flag = false;
        $("#ErrorInBusinessInfo_M3Quantity").prop("hidden", false);
    }
    if (Y1Quantity == "" || isNaN(Y1Quantity) || Y1Quantity < ((+M1Quantity) + (+M2Quantity) + (+M3Quantity) + (+(isNaN(M4Quantity) ? "" : M4Quantity)) + (+(isNaN(M5Quantity) ? "" : M5Quantity)) + (+(isNaN(M6Quantity) ? "" : M6Quantity))) || Y1Quantity <= 0) {
        flag = false;
        $("#ErrorInBusinessInfo_Y1Quantity").prop("hidden", false);
    }
    else {
        $("#ErrorInBusinessInfo_Y1Quantity").prop("hidden", true);
    }
    if (Y2Quantity === "" || isNaN(Y2Quantity) || Y2Quantity < 0) {
        flag = false;
        $("#ErrorInBusinessInfo_Y2Quantity").prop("hidden", false);
    }
    if (Y3Quantity === "" || isNaN(Y3Quantity) || Y3Quantity < 0) {
        flag = false;
        $("#ErrorInBusinessInfo_Y3Quantity").prop("hidden", false);
    }
    if (UOM == "") {
        flag = false;
        $("#ErrorInBusinessInfo_UOM").prop("hidden", false);
    }
    (ExpectedGP < 1 || ExpectedGP > 100) && (ExpectedGP != "") ? ($('#Error_Range_ExpectedGP').show(), flag = false) : $('#Error_Range_ExpectedGP').hide();
    if (flag) {
        var griddata = [];
        var BusinessInformation = {};
        BusinessInformation = {
            Product: $("#BusinessInfo_Product").val(),
            SKU: $("#BusinessInfo_SKU").val(),
            ProposeLaunchDate: $("#BusinessInfo_ProposedLaunchDate").val(),
            ProposedSellingPrice: $("#BusinessInfo_ProposeSellingPrice").val(),
            ProposedTP: $("#BusinessInfo_ProposeTP").val(),
            ProposedMRP: $("#BusinessInfo_ProposeMRP").val(),
            Currency: $("#BI_Currency").val(),
            ExpectedGP: $("#BusinessInfo_ExpectedGP").val(),
            M1Quantity: M1Quantity,
            M2Quantity: M2Quantity,
            M3Quantity: M3Quantity,
            M4Quantity: isNaN(M4Quantity) ? "" : M4Quantity,
            M5Quantity: isNaN(M5Quantity) ? "" : M5Quantity,
            M6Quantity: isNaN(M6Quantity) ? "" : M6Quantity,
            Y1Quantity: Y1Quantity,
            Y2Quantity: Y2Quantity,
            Y3Quantity: Y3Quantity,
            UOM: $("#BusinessInfo_UOM").val(),
            BusinessValue: $("#BusinessInfo_BusinessValue").val(),
        }

        if (EditBusinessInfoRow == 0) {
            griddata.push(BusinessInformation);
            var BusinessInfo1 = $("#business_info").jqGrid('getGridParam', 'data');
            var BusinessInfo2 = $.merge(BusinessInfo1, griddata);
            $("#business_info").jqGrid('setGridParam', { data: BusinessInfo2 });
            $("#businessInfoGrid_PV").jqGrid('setGridParam', { data: BusinessInfo2 });

            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
            $("#businessInfoGrid_PV").trigger('reloadGrid', [{ page: 1 }]);

        }
        else {
            $("#business_info").jqGrid('setRowData', EditBusinessInfoRow, BusinessInformation);
            $("#businessInfoGrid_PV").jqGrid('setRowData', EditBusinessInfoRow, BusinessInformation);

            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
            $("#businessInfoGrid_PV").trigger('reloadGrid', [{ page: 1 }]);


            EditBusinessInfoRow = 0;
        }
        $(".mandate").val("");
        $("#businessinfoMsg").prop("hidden", true);
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('.data-datepicker').datepicker('setDate', today);
        $('#BusinessInfo_ProposedLaunchDate').val('');
        $('#BusinessInfo_SKU').prop('selectedIndex', 0);
        $('#BusinessInfo_SKU .skuOption').remove();
        $('#BusinessInfo_SKU .options').remove();
        $("#ErrorInBusinessInfo_BusinessValue").prop("hidden", true);
    }
    isvalid = true;
    isEditBI = false;
});
var EditBusinessInfoRow = 0;
var isEditBI = false;
var BIEditedSKU = "";
function OnEditBusinessInfo(RowData) {
    isEditBI = true;
    var DataFromTheRow = jQuery('#business_info').jqGrid('getRowData', RowData);
    var productList = $("#business_info").jqGrid("getCol", "Product");
    BIEditedSKU = DataFromTheRow.SKU;
    var ProposedSellingPrice = DataFromTheRow.ProposedSellingPrice;
    var Y2Quantity = DataFromTheRow.Y2Quantity;
    $('#BusinessInfo_Product').val(DataFromTheRow.Product);
    $('#BusinessInfo_Product').trigger("change");
    $('#BusinessInfo_SKU .skuOption').remove();
    $('#BusinessInfo_SKU .options').remove();
    $('.Err-BIcombination').hide();
    $('#AddBusinessInfoData').prop('disabled', false);
    var skuVals = DataFromTheRow.SKU.split(',');
    var gridData = $("#product_description").jqGrid('getGridParam', 'data');
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].ProductName == $('#BusinessInfo_Product').val()) {
            var sku = gridData[i].SKU;
            var skuList = sku.split(',');
            var skuOption = "";
            $.each(skuList, function (i, obj) {
                if (obj != "" || obj != null || obj != undefined) {
                    skuOption += '<option class="options" value="' + obj + '">' + obj + '</option>';
                }
            });
            $("#BusinessInfo_SKU").append(skuOption);
            break;
        }
    }
    $("#BusinessInfo_SKU").val(DataFromTheRow.SKU);
    var val = DataFromTheRow.ProposeLaunchDate.split("-").join("-");
    $('#BusinessInfo_ProposedLaunchDate').val(DataFromTheRow.ProposeLaunchDate.split("-").join("-"));
    $('#BusinessInfo_ProposedLaunchDate').datepicker('setDate', val);

    $('#BusinessInfo_ProposeSellingPrice').val(ProposedSellingPrice.split(",").join(""));
    $('#BusinessInfo_ProposeTP').val(DataFromTheRow.ProposedTP);
    $('#BusinessInfo_ProposeMRP').val(DataFromTheRow.ProposedMRP);
    $('#BI_Currency').val(DataFromTheRow.Currency);
    $('#BusinessInfo_ExpectedGP').val(DataFromTheRow.ExpectedGP);
    $('#BusinessInfo_BusinessValue').val(DataFromTheRow.BusinessValue);
    $('#BusinessInfo_M1Quantity').val(DataFromTheRow.M1Quantity);
    $('#BusinessInfo_M2Quantity').val(DataFromTheRow.M2Quantity);
    $('#BusinessInfo_M3Quantity').val(DataFromTheRow.M3Quantity);
    $('#BusinessInfo_M4Quantity').val(DataFromTheRow.M4Quantity);
    $('#BusinessInfo_M5Quantity').val(DataFromTheRow.M5Quantity);
    $('#BusinessInfo_M6Quantity').val(DataFromTheRow.M6Quantity);
    $('#BusinessInfo_Y1Quantity').val(DataFromTheRow.Y1Quantity);
    $('#BusinessInfo_Y2Quantity').val(Y2Quantity.split(",").join(""));
    $('#BusinessInfo_Y3Quantity').val(DataFromTheRow.Y3Quantity);
    $('#BusinessInfo_UOM').val(DataFromTheRow.UOM);
    EditBusinessInfoRow = RowData;
    $(".ToRemoveValue").prop("hidden", true);
}
function onlyNumbers(evt) {
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
//function onlyNumbersNotdecimals(evt) {
//    var e = event || evt;
//    var charCode = e.which || e.keyCode;

//    if (charCode > 31 && (charCode < 48 || charCode > 57) || charCode == 46) {
//        return false;
//    }

//    return true;
//}
function onlyNumbersNotdecimals(input) {
    var value = input.value;
    if (!isNaN(value) && Number.isInteger(parseFloat(value))) {
        return true;
    }
    else {
        input.value = '';
        return false;
    }
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
function OnDeleteBusinessInfo(RowData) {
    confirm("Are you sure you want to delete?", function () {
        $("#business_info").jqGrid('delRowData', RowData, '', '')
        $(".mandate").val("");
        EditBusinessInfoRow = 0;
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('.data-datepicker').datepicker('setDate', today);
        $('#BusinessInfo_ProposedLaunchDate').val('');
    });
}
colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        search:false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center action_icons icon_section align-items-left">' +
                '<a onclick=OnEditBusinessInfo(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen pr-2 color-info" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=OnDeleteBusinessInfo(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';
        }
    },
    {
        name: 'Product',
        label: 'Product',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposeLaunchDate',
        label: 'Proposed Launch Date',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedTP',
        label: 'Expected COP',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ProposedMRP',
        label: 'Proposed MRP',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Currency',
        label: 'Currency',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ExpectedGP',
        label: 'Expected GP',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BusinessValue',
        label: 'Business Value (<span class="sku_name">(Y2 Quantity * Proposed Selling Price)</span>)',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M1Quantity',
        label: 'M1 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'M2Quantity',
        label: 'M2 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M3Quantity',
        label: 'M3 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'M4Quantity',
        label: 'M4 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M5Quantity',
        label: 'M5 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'M6Quantity',
        label: 'M6 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y1Quantity',
        label: 'Y1 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'Y2Quantity',
        label: 'Y2 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y3Quantity',
        label: 'Y3 Quantity',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'UOM',
        label: 'UOM',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
],

    $("#business_info").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_business_info',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#business_info tbody tr");
            var objHeader = $("#business_info tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#businessInfoGrid_PV").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_businessInfoGrid_PV',
    rowNum: 30,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#business_info tbody tr");
        var objHeader = $("#business_info tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#businessInfoGrid_PV").jqGrid('hideCol', "Action");

    }
});
$("#business_info").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
editedTable = "";
isEditPP = false;
isEdited = 0;
$("#ExpectedPackage_Product").change(function () {
    $("#ErrorMSgSKU").prop("hidden", true);
    $("#ExpectedPack_SKU").empty();
    $("#ExpectedPack_SKU").multiselect('rebuild');// remove all options from the dropdown
    var productName = $("#ExpectedPackage_Product").val();
    $(".Error_PP_Product").hide().text('');
    var existingSku = [];
    if (productName != "") {
        if (isEdited == 0) {
            $(".formulation_table table").each(function (index) {
                var tableProduct = $(this).find(".expectedProduct").text();
                var tableSKU = $(this).find(".expectedSKU").text();

                if (tableProduct == productName) {
                    var skusplitlist = tableSKU.toString().split(',');
                    for (let i = 0; i < skusplitlist.length; i++) {
                        existingSku.push(skusplitlist[i]);
                    }
                }
            });
        }
        else {
            $(".formulation_table table").each(function (index) {
                if (editedTable.get(0) !== this) {
                    var tableProduct = $(this).find(".expectedProduct").text();
                    var tableSKU = $(this).find(".expectedSKU").text();

                    if (tableProduct == productName) {
                        var skusplitlist = tableSKU.toString().split(',');
                        for (let i = 0; i < skusplitlist.length; i++) {
                            existingSku.push(skusplitlist[i]);
                        }
                    }
                }
            });
        }
        var gridData = $("#product_description").jqGrid('getGridParam', 'data');
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].ProductName == productName) {
                var sku = gridData[i].SKU;
                var skuList = sku.split(',');
                result = $.grep(skuList, function (element) {
                    return $.inArray(element, existingSku) === -1;
                });

                if (result.length == 0) {
                    $("#ErrorMSgSKU").prop("hidden", false);
                }
                else {
                    var skuOption = "";
                    $.each(result, function (i, obj) {
                        if (obj != "" || obj != null || obj != undefined) {
                            skuOption += '<option value="' + obj + '">' + obj + '</option>';
                        }
                    });
                }
                $("#ExpectedPack_SKU").html(skuOption);
                $('#ExpectedPack_SKU').multiselect('rebuild');
                break;
            }
        }
    }
});
function SavePackageImageFile() {
    var fileName = [];
    var files = $('#ExpectedPack_ImageUpload').prop("files");

    for (var i = 0; i < files.length; i++) {
        var formData = new FormData();
        formData.append("file", files[i]);
        $.ajax({
            type: 'POST',
            url: ROOT + "ProjectBrief/SavePackageInitiativesImageFile",
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {

                fileName.push(data.replaceAll('"', ''));
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
    return fileName;
}
var editedTable = "";
var isEdited = 0;
function OnEditExpectedPackaging(event) {
    //$(window).scrollTop($('#ExpectedPackage_Product').position().top)
    document.getElementById('ExpectedPackage_Product').scrollIntoView({ behavior: 'smooth' });
    var table = $(event.target).closest("table");
    var tableId = $(event.target).closest("table").attr("id")
    var tableclass = $(event.target).closest("table").attr("class").replace('mt-4 ', '')
    var ImagesTableClass = 'Images_' + $(event.target).closest("table").attr("class").replace('mt-4 ', '')
    var dataFromTheRow = packagingProfileData_1[tableclass];
    isEditPP = true;
    isEdited = 1;
    $("#ExpectedPack_SKU").empty();
    $("#ExpectedPack_SKU").multiselect('rebuild');
    $("#ErrorMSgSKU").prop("hidden", true);
    $("#ExpectedPackage_Product").val(table.find(".expectedProduct").text());
    PPEditedSKU = table.find(".expectedSKU").text();
    var selectedArr = PPEditedSKU.split(',');
    var prdDescArr = [];
    var expArr = [];
    var gridData = $("#product_description").jqGrid('getGridParam', 'data');
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].ProductName == $('#ExpectedPackage_Product').val()) {
            var temp = gridData[i].SKU.split(',');
            for (let j = 0; j < temp.length; j++) {
                prdDescArr.push(temp[j]);
            }

        }
    }
    $(".formulation_table table").each(function (index) {
        var productName = $(this).find(".expectedProduct").text();
        var tableSKU = $(this).find(".expectedSKU").text();
        if (productName == $('#ExpectedPackage_Product').val()) {
            var temp = tableSKU.split(',');
            for (let j = 0; j < temp.length; j++) {
                expArr.push(temp[j]);
            }
        }
    });
    var finalList = $.grep(prdDescArr, function (element) {
        return $.inArray(element, expArr) == -1;
    });

    for (let k = 0; k < selectedArr.length; k++) {
        finalList.push(selectedArr[k]);
    }
    $('#ExpectedPack_SKU').empty();
    var skuVals = table.find(".expectedSKU").text().split(',');
    var gridData = $("#product_description").jqGrid('getGridParam', 'data');
    var skuOption = "";
    $.each(finalList, function (i, obj) {
        if (obj != "" || obj != null || obj != undefined) {
            skuOption += '<option value="' + obj + '">' + obj + '</option>';
        }
    });
    $("#ExpectedPack_SKU").html(skuOption);
    $('#ExpectedPack_SKU').multiselect('rebuild');

    $('#ExpectedPack_SKU').val(skuVals);
    $("#ExpectedPack_SKU").multiselect('rebuild');
    CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].setData(dataFromTheRow.PrimaryPackaging);
    CKEDITOR.instances["ExpectedPack_SecondaryPackaging"].setData(dataFromTheRow.SecondaryPackaging);
    CKEDITOR.instances["ExpectedPack_TertiaryPackaging"].setData(dataFromTheRow.TertiaryPackaging);
    CKEDITOR.instances["ExpectedPack_BenchmarkProduct"].setData(dataFromTheRow.BenchmarkProducts);
    CKEDITOR.instances["ExpectedPack_DesiredPack"].setData(dataFromTheRow.DesiredProductCharacteristics);
    CKEDITOR.instances["ExpectedPack_Other"].setData(dataFromTheRow.Others);
    $("#Expected_Mould").val($.trim(table.find(".expected_molds").text())).trigger("change");
    $('#ToGetImage').text($.trim(table.find(".imageUpload").text()))
    editedTable = table;
    editedTableClass = tableclass;
    $(".removeError").prop("hidden", true);
    table.find(".image_table img").removeAttr("src");
    $("#Error_PPR_Product").hide().text('');
    $("#ExpectedPack_ImageUpload").val('')
}
$("#ExpectedPack_ImageUpload").on("change", function () {

    $(".ToHideImage").empty();
});
function OnDeleteExpectedPackaging(event, flag = 0) {
    if (flag == 1) {
        var table = event// direct table name is coming;
        var tableclass = 'Images_' + $('#' + event).attr('class').replace('mt-4 ', '');
        var FileName = $('#' + event + '').find(".imageUpload").text();
        if (FileName != '') {
            $.ajax({
                type: 'POST',
                url: ROOT + "ProjectBrief/DeletePackImageFile",
                data: { fileName: FileName },
                success: function (data) {
                    path = data;
                }
            });
        }
        $('#' + event + '').remove();
        delete packagingProfileData_1[tableclass];

        var editedTableId = $(table).attr('id') + '_Images';
        var deletePresentedTable = []
        if (imageGrid.length > 0) {
            for (i = 0; i < imageGrid.length; i++) {
                if (editedTableId == imageGrid[i].TableId) {
                    deletePresentedTable.push(editedTableId)
                }
            }
        }
        imageGrid = imageGrid.filter(obj1 =>
            !deletePresentedTable.some(obj2 =>
                obj2 === obj1.TableId
            )
        );
        editedTable = "";
        isEditPP = false;
        isEdited = "";
        $(".Toremove").val("");
        $(".ToHideImage").empty();
        $("#ExpectedPack_SKU").empty();
        $("#ExpectedPack_SKU").multiselect('rebuild');

        CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].setData('');
        CKEDITOR.instances["ExpectedPack_SecondaryPackaging"].setData('');
        CKEDITOR.instances["ExpectedPack_TertiaryPackaging"].setData('');
        CKEDITOR.instances["ExpectedPack_BenchmarkProduct"].setData('');
        CKEDITOR.instances["ExpectedPack_DesiredPack"].setData('');
        CKEDITOR.instances["ExpectedPack_Other"].setData('');
    }
    else {
        var table = $(event.target).closest("table");
        var tableclass = 'Images_' + table.attr('class').replace('mt-4 ', '');
        var FileName = table.find(".imageUpload").text();

        confirm("Are you sure you want to delete?", function () {

            if (FileName != '') {

                $.ajax({
                    type: 'POST',
                    url: ROOT + "ProjectBrief/DeletePackImageFile",
                    data: { fileName: FileName },
                    success: function (data) {
                        path = data;
                    }
                });
            }
            $(table).remove();
            delete packagingProfileData_1[tableclass];

            var tables = $(".formulation_table table");
            tables.each(function (index) {
                var newTableID = "myTable" + (index + 1);
                $(this).attr("id", newTableID);
            });

            var editedTableId = $(table).attr('id') + '_Images';
            var deletePresentedTable = []
            if (imageGrid.length > 0) {
                for (i = 0; i < imageGrid.length; i++) {
                    if (editedTableId == imageGrid[i].TableId) {
                        deletePresentedTable.push(editedTableId)
                    }
                }
            }
            imageGrid = imageGrid.filter(obj1 =>
                !deletePresentedTable.some(obj2 =>
                    obj2 === obj1.TableId
                )
            );
            editedTable = "";
            isEditPP = false;
            isEdited = "";
            $(".Toremove").val("");
            $(".ToHideImage").empty();
            $("#ExpectedPack_SKU").empty();
            $("#ExpectedPack_SKU").multiselect('rebuild');

            CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].setData('');
            CKEDITOR.instances["ExpectedPack_SecondaryPackaging"].setData('');
            CKEDITOR.instances["ExpectedPack_TertiaryPackaging"].setData('');
            CKEDITOR.instances["ExpectedPack_BenchmarkProduct"].setData('');
            CKEDITOR.instances["ExpectedPack_DesiredPack"].setData('');
            CKEDITOR.instances["ExpectedPack_Other"].setData('');
        });
    }
}

CKEDITOR.instances.ExpectedPack_PrimaryPackaging.on('change', function () {
    $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true);
});
var packagingProfileData_1 = [];
var editedTableClass = 0;
var imageGrid = [];
var particulartableImage = "";
$("#AddExpectedPackagingData").on("click", function () {
    var flag = true;
    var Product = $.trim($("#ExpectedPackage_Product").val());
    var SKU = $("#ExpectedPack_SKU").val().toString();
    //var PrimaryPackaging = CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].getData().trim();
    var Pack_PrimaryPackagingData = CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].getData();
    var PrimaryPackaging = Pack_PrimaryPackagingData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
    var secondaryPackaging = CKEDITOR.instances["ExpectedPack_SecondaryPackaging"].getData();
    var tertiaryPackaging = CKEDITOR.instances["ExpectedPack_TertiaryPackaging"].getData();
    var benchmarkProducts = CKEDITOR.instances["ExpectedPack_BenchmarkProduct"].getData();
    var desiredPackagingCharacteristics = CKEDITOR.instances["ExpectedPack_DesiredPack"].getData();
    var others = CKEDITOR.instances["ExpectedPack_Other"].getData();
    var mould = $("#Expected_Mould").val();
    var tableCounter = $(".formulation_table table").length + 1;
    var contentWithoutTags = PrimaryPackaging.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
    if (Product == "" || SKU == "" || actualData == "") {
        flag = false;
        Product == "" ? ($("#Error_PPR_Product").show().text('Please select Product')) : $("#Error_PPR_Product").hide().text('');
        SKU == "" ? $("#ErrorInExpectedPack_SKU").prop("hidden", false) : $("#ErrorInExpectedPack_SKU").prop("hidden", true)
        actualData == "" ? $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", false) : $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true)
    }
    if (flag) {
        var ImageUpload1 = "";
        var Images = SavePackageImageFile();
        if (Images == "") {
            ImageUpload1 = $('#ToGetImage').text();
        }
        else if (Images != "") {
            $.each(Images, function (k, obj) {
                if (k + 1 == Images.length) {
                    ImageUpload1 += obj;
                }
                else if (k == 0) {
                    ImageUpload1 = obj + ',';
                }
                else {
                    ImageUpload1 += obj + ',';
                }
            });
        }

        var PackagingProfile = {};
        PackagingProfile = {
            Product: $("#ExpectedPackage_Product").val(),
            SKU: $('#ExpectedPack_SKU').val().toString(),
            PrimaryPackaging: CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].getData(),
            SecondaryPackaging: CKEDITOR.instances["ExpectedPack_SecondaryPackaging"].getData(),
            TertiaryPackaging: CKEDITOR.instances["ExpectedPack_TertiaryPackaging"].getData(),
            BenchmarkProducts: CKEDITOR.instances["ExpectedPack_BenchmarkProduct"].getData(),
            DesiredProductCharacteristics: CKEDITOR.instances["ExpectedPack_DesiredPack"].getData(),
            Others: CKEDITOR.instances["ExpectedPack_Other"].getData(),
            Moulds: $("#Expected_Mould").val(),
            ImageUpload: ImageUpload1
        };

        if (editedTable != "") {
            // Update the existing table with the edited data
            editedTableClass = editedTable.attr("class").replace('mt-4 ', '')
            packagingProfileData_1[editedTableClass] = PackagingProfile;
            editedRowdata = PackagingProfile;
            var htmltag = ""
            htmltag = ` <thead>
                 <tr>

                 <th colspan="2"><b>Product : </b><span class="expectedProduct">`+ Product + `</span></th>

                 <th style="width:25%"> <b>SKU : </b><span class="expectedSKU">` + SKU + `</span></th>
                  <th>
                     <div class="justify-center_1 action_icons">
                       <a class="btn-icon -edit" title="Edit" onclick=OnEditExpectedPackaging(event)><i class="fas fa-pen pr-2 color-info"></i></a>
                       <a class="btn-icon -delete" title="Delete" onclick=OnDeleteExpectedPackaging(event)><i class="fas fa-trash color-delete"></i></a>
                       <a class="btn-icon -info imagesinfo" title="Images info" onclick=ShowImages(event) id="myTable${tableCounter}_Images"><i class="fas fa-images" data-bs-toggle="modal" title="Images"></i></a></a>
                      </div>
                 </th>
                </span>
                 </th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr>
                 <td style="width:25%;">
                 <span class="remarkss"><b>Primary Packaging : </b></span>
                 <span class ="expected_PrimaryPack">
                      `+ editedRowdata.PrimaryPackaging + `
                 </span>
                 </td>


                 <td style="width:25%;">
                 <span class="remarkss">
                 <b> Secondary Packaging: </b></span>
                 </span>
                 <span class="expected_SecondaryPack">`+ editedRowdata.SecondaryPackaging + `</span>

                 </td>
                 <td>
                 <span class="remarkss">
                 <b> Tertiary Packaging: </b></span>
                 </span>
                 <span class="expected_TertiaryPack">`+ editedRowdata.TertiaryPackaging + `</span>
                 </td>
                 <td>
                 <span class="remarkss">
                 <b>Benchmark Products : </b></span>
                 </span>
                 <span class="expected_BenchMark">`+ editedRowdata.BenchmarkProducts + `</span>
                 </td>

                 </tr>
                 <tr>
                 <td  colspan="2">
                 <span class="remarkss">
                 <b>Desired Packaging Characteristics </b></span>
                 </span>
                 <span class="expected_desiredPack"> `+ editedRowdata.DesiredProductCharacteristics + `</span>
                 </td>
                 <td>
                 <span class="remarkss">
                 <b> Others if(any): </b></span>
                 </span>
                 <span class="expected_others">`+ editedRowdata.Others + `</span>
                 </td>

                 <td>
                 <span class="remarkss">
                 <b>Mold :</b>
                 </span>
                 <span class="expected_molds">`+ mould + `</span>

                 </td>
                 </tr>
                 <tr style="display: none;">
                 <td colspan="4" class="hiddenRow">
                     <span class="imageUpload">${ImageUpload1}</span>
                  </td>
                  </tr>
                  <tr>
                 </tbody>
            `

            $(editedTable).html(htmltag);
            var row = editedTable.find("tbody tr");
            var rowh = editedTable.find("thead");
            row.find(".imageUpload").text(ImageUpload1);
            if (ImageUpload1 == "") {
                editedTable.find(".imagesinfo").hide();
            }
            else {
                var editedTableId = $(editedTable).attr('id') + '_Images';
                var editedTableClass = 'Images_' + $(editedTable).attr('class').replace('mt-4 ', '');
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
                var ImageUpload1 = ImageUpload1.split(',');
                $.each(ImageUpload1, function (i, j) {
                    var imagedata = {}
                    imagedata = {
                        TableId: editedTableId,
                        TableClass: editedTableClass,
                        Image: ImageUpload1[i],
                    }
                    imageGrid.push(imagedata);
                });
            }
        }
        else if (editedTable == "") {
            var tablecountclass = 0;
            tablecountclass = packagingProfileData_1.length + 1
            packagingProfileData_1[tablecountclass] = PackagingProfile;

            var newTable = `<table class="mt-4 ${tablecountclass}" style="width:100%" id="myTable${tableCounter}">
                 <thead>
                 <tr>

                 <th colspan="2"><b>Product : </b><span class="expectedProduct">`+ Product + `</span></th>

                 <th style="width:25%"> <b>SKU : </b><span class="expectedSKU">` + SKU + `</span></th>
                  <th>
                     <div class="justify-center_1 action_icons">
                       <a class="btn-icon -edit" title="Edit" onclick=OnEditExpectedPackaging(event)><i class="fas fa-pen pr-2 color-info"></i></a>
                       <a class="btn-icon -delete" title="Delete" onclick=OnDeleteExpectedPackaging(event)><i class="fas fa-trash color-delete"></i></a>
                       <a class="btn-icon -info imagesinfo" title="Images info" onclick=ShowImages(event) id="myTable${tableCounter}_Images"><i class="fas fa-images"></i></a>
                  </div>
                 </th>
                </span>
                 </th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr>
                 <td style="width:25%;">
                 <span class="remarkss"><b>Primary Packaging : </b></span>
                 <span class ="expected_PrimaryPack">
                      `+ PrimaryPackaging + `
                 </span>
                 </td>


                 <td style="width:25%;">
                 <span class="remarkss">
                 <b> Secondary Packaging: </b></span>
                 </span>
                 <span class="expected_SecondaryPack">`+ secondaryPackaging + `</span>

                 </td>
                 <td>
                 <span class="remarkss">
                 <b> Tertiary Packaging: </b></span>
                 </span>
                 <span class="expected_TertiaryPack">`+ tertiaryPackaging + `</span>
                 </td>
                 <td>
                 <span class="remarkss">
                 <b>Benchmark Products : </b></span>
                 </span>
                 <span class="expected_BenchMark">`+ benchmarkProducts + `</span>
                 </td>

                 </tr>
                 <tr>
                 <td  colspan="2">
                 <span class="remarkss">
                 <b>Desired Packaging Characteristics </b></span>
                 </span>
                 <span class="expected_desiredPack"> `+ desiredPackagingCharacteristics + `</span>
                 </td>
                 <td>
                 <span class="remarkss">
                 <b> Others if(any): </b></span>
                 </span>
                 <span class="expected_others">`+ others + `</span>
                 </td>

                 <td>
                 <span class="remarkss">
                 <b>Mold :</b>
                 </span>
                 <span class="expected_molds">`+ mould + `</span>

                 </td>
                 </tr>
                 <tr style="display: none;">
                 <td colspan="4" class="hiddenRow">
                     <span class="imageUpload">${ImageUpload1}</span>
                  </td>
                  </tr>
                  <tr>
                 </tbody>
                 </table>`

            if (ImageUpload1 == "") {
                var $newTable = $(newTable);
                $newTable.find(".imagesinfo").hide();
                $('.formulation_table').append($newTable);
            }
            if (ImageUpload1 != "") {
                var ImageUpload1 = ImageUpload1.split(',');
                $.each(ImageUpload1, function (i, j) {
                    var imagedata = {}
                    imagedata = {
                        TableId: 'myTable' + tableCounter + '_Images',
                        TableClass: 'Images_' + tablecountclass,
                        Image: ImageUpload1[i],
                    }
                    imageGrid.push(imagedata);

                });
                $('.formulation_table').append(newTable);
            }
        }
        CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].setData('');
        CKEDITOR.instances["ExpectedPack_SecondaryPackaging"].setData('');
        CKEDITOR.instances["ExpectedPack_TertiaryPackaging"].setData('');
        CKEDITOR.instances["ExpectedPack_BenchmarkProduct"].setData('');
        CKEDITOR.instances["ExpectedPack_DesiredPack"].setData('');
        CKEDITOR.instances["ExpectedPack_Other"].setData('');
        $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true);
        $(".Toremove").val("");
        $(".ToHideImage").empty();
        $("#ExpectedPack_SKU").empty();
        $("#ExpectedPack_SKU").multiselect('rebuild');
        $("#Expected_Mould").val("").trigger("change");
    }
    $("#ExpectedPackagingMsg").prop("hidden", true);
    editedTable = "";
    isEditPP = false;
    isEdited = 0;
});

var formData = new FormData();
function validateFileUpload() {
    var flag = true;
    var supportedExtention = ['jpg', 'jpeg', 'png', 'gif', 'jfif', 'tiff', 'bmp', 'svg'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#ExpectedPack_ImageUpload`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_InvalidPackagingImage').show();
            setTimeout(function () {
                $('#Err_InvalidPackagingImage').hide();
            }, 5000);

            $(`#ExpectedPack_ImageUpload`).val('');

            flag = false;

            return false;
        }
    });

    if (flag) {
        for (var i = 0; i < $(`#ExpectedPack_ImageUpload`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#ExpectedPack_ImageUpload`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#ExpectedPack_ImageUpload').val('');
                $('#deleteSelectedFile').hide();
                $(`#ExpectedPack_ImageUpload`).get(0).val('');
                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#ExpectedPack_ImageUpload`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#ExpectedPack_ImageUpload`).get(0).files[i].name.toString().split('\\').pop();

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
            name: '',
            label: 'Action',
            width: 50,
            resizable: true,
            ignoreCase: true,
            search:false,
            formatter: function (cellvalue, options, rowobject) {
                var imageName = encodeURIComponent(rowobject.Image);
                return '<div class="text-center icon_section align-items-left">' +
                    '<span class="action-link"><a class="btn-icon -download DownloadImage" title="Download Image" onclick=DownloadUploadedImage("' + imageName + '") id="DownloadImage"><i class="fas fa-download color-download" aria-hidden="true"></i></a></span>' +
                    '<span class="action-link"><a class="btn-icon -view ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye color-eye"></i></a></span>' +
                    '<span class="action-link"><a class="btn-icon -delete DeletePopUpImage" title="Delete Image" onclick=OnRemoveImage("' + imageName + '","' + rowobject.TableClass + '")><i class="fas fa-trash color-delete"></i></a></span>' +
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
        }
    });
$("#uploaded_images_table_PV").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_uploaded_images_table_PV',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#uploaded_images_table_PV tbody tr");
        var objHeader = $("#uploaded_images_table_PV tbody tr td");

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

function ShowImages(event) {
    var imageGridData = [];
    var tableId = $(event.target).closest("table").closest("div").attr("class");
    var tableClass = 'Images_' + $(event.target).closest("table").attr("class").replace('mt-4 ', '');
    $.each(imageGrid, function (i, obj) {
        if (tableClass == imageGrid[i].TableClass) {
            imageGridData.push(imageGrid[i]);
        }
    });

    jQuery('#uploaded_images_table').jqGrid('clearGridData');
    $("#uploaded_images_table").jqGrid('setGridParam', { data: imageGridData });
    $("#uploaded_images_table").trigger('reloadGrid', [{ page: 1 }]);
    if (tableId === "formulation_table") {
        $('#Images_show_popup').modal('show');
    }
    else {
        $('#Images_show_popup_PV').modal('show');
    }
}

function DownloadUploadedImage(filename) {
    if (filename.length > 0) {
        var downloadLink = $('<a>')
            .attr('href', ROOT + "ProjectBrief/DownloadPackageImageFile?fileName=" + decodeURIComponent(filename))
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
        var imageUrl = ROOT + 'PackageInitiativesImages/' + decodeURIComponent(filename);
        window.open(imageUrl, '_blank');
    }
}


var data = [];
function OnRemoveImage(Image, TableClass) {
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
        $('#ToGetImage').text("");

        $(".formulation_table table").each(function () {
            var table = $(this);
            var tableclass = "Images_" + $(this).attr("class").replace('mt-4 ', '');
            var InsertImageData = [];
            var InsertImage = "";
            for (i = 0; i < imageGrid.length; i++) {
                if (imageGrid[i].TableClass == tableclass) {
                    InsertImageData.push(imageGrid[i]);
                }
            }
            for (i = 0; i < InsertImageData.length; i++) {
                if (InsertImageData.length == i + 1) {
                    InsertImage += InsertImageData[i].Image;
                }
                else {
                    InsertImage += InsertImageData[i].Image + ','
                }
            }
            table.find(".imageUpload").text(InsertImage);
        });

        if (imageGridData.length == 0) {
            var table = TableClass.replace('Images_', '')
            $(".formulation_table table").each(function (index) {
                var tableClass = $(this).attr("class").replace('mt-4 ', '');
                if (table == tableClass) {
                    $('#Images_show_popup').modal('hide');
                    $(this).find(".imagesinfo").hide();
                }
            });
        }
    });
}
$('#AddSustainability').on('click', function () {
    var flag1 = true;
    var Product = $.trim($("#Sustain_Product").val());
    var targetSustain = $.trim($("#Sustain_Target").val());

    if (Product == "" || targetSustain == "") {
        Product == "" ? ($("#Error_Sustain_Product").show(), flag1 = false) : $("#Error_Sustain_Product").hide();
        targetSustain == "" ? ($("#Error_Sustain_Target").show(), flag1 = false) : $("#Error_Sustain_Target").hide();
    }
    if (flag1) {
        var sustainData = [];
        var Sustainabilityinfo = {};
        Sustainabilityinfo = {
            Product: $("#Sustain_Product").val(),
            TargetedSustainGoals: $.trim($("#Sustain_Target").val()),
            Reusable: $.trim($("#Sustain_Reusable").val()),
            Recycle: $.trim($("#Sustain_Recycle").val()),
            Reducing: $.trim($("#Sustain_Reducing").val()),
            Recovering: $.trim($("#Sustain_Recovering").val()),

        }
        if (EditSustainRowId == 0) {
            sustainData.push(Sustainabilityinfo);
            var SustainInfo1 = $("#SustainabiltityGrid").jqGrid('getGridParam', 'data');
            var SustainInfo2 = $.merge(SustainInfo1, sustainData);

            $("#SustainabiltityGrid").jqGrid('setGridParam', { data: SustainInfo2 });

            $("#SustainabiltityGrid").trigger('reloadGrid', [{ page: 1 }]);

            $("#SustainabiltityGrid_PV").jqGrid('setGridParam', { data: SustainInfo2 });
            $("#SustainabiltityGrid_PV").trigger('reloadGrid', [{ page: 1 }]);

        }
        else {

            $.each(Sustainabilityinfo, function (key, value) {
                $("#SustainabiltityGrid").jqGrid('setRowData', EditSustainRowId, Sustainabilityinfo);
                $("#SustainabiltityGrid").trigger('reloadGrid', [{ page: 1 }]);

                $("#SustainabiltityGrid_PV").jqGrid('setRowData', EditSustainRowId, Sustainabilityinfo);
                $("#SustainabiltityGrid_PV").trigger('reloadGrid', [{ page: 1 }]);

            });
            EditSustainRowId = 0;
        }

        var productList = $("#SustainabiltityGrid").jqGrid("getCol", "Product");

        $(".Toremove").val("");
        EditSustainRowId = 0;

        productDescriptionProductNameList = $("#product_description").jqGrid("getCol", "ProductName");

        SustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        $("option").remove("#Sustain_Product .ProductOption");

        if (SustainabilityProductNameList.length > 0) {
            var productOption = "";

            $.each(SustainabilityProductNameList, function (i, obj) {
                //
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#Sustain_Product").append(productOption);
        }

    }
    $("#SusutainabitityMsg").prop("hidden", true);
});
var formData = new FormData();
function validateFileUpload() {
    var flag = true;
    var supportedExtention = ['jpg', 'jpeg', 'png', 'gif', 'jfif', 'tiff', 'bmp', 'svg'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#ExpectedPack_ImageUpload`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_InvalidPackagingImage').show();
            setTimeout(function () {
                $('#Err_InvalidPackagingImage').hide();
            }, 5000);

            $(`#ExpectedPack_ImageUpload`).val('');

            flag = false;

            return false;
        }
    });

    if (flag) {
        for (var i = 0; i < $(`#ExpectedPack_ImageUpload`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#ExpectedPack_ImageUpload`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#ExpectedPack_ImageUpload').val('');
                $('#deleteSelectedFile').hide();
                $(`#ExpectedPack_ImageUpload`).get(0).val('');
                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#ExpectedPack_ImageUpload`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#ExpectedPack_ImageUpload`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);


        }
    }
}
//CKEDITOR.instances.ExpectedPack_PrimaryPackaging.on('change', function () {
//    var Pack_PrimaryPackagingData = CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].getData().trim();
//    var contentWithoutTags = Pack_PrimaryPackagingData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
//    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
//    if (actualData != "") {
//        $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true);
//    } else {
//        $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", false);
//    }
//});

//if (statusname == "1" || statusname == "8" || statusname == "9") {
//    CKEDITOR.instances.ExpectedPack_PrimaryPackaging.on('change', function () {
//        $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true);
//    });
//}
function ValidatePackSaveForm() {
    debugger;
    $('#ToSave').prop("disabled", false);
    var projectName = $('#ProductDescription_ProjectName').val();
    var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
    var BusinessRationalData = CKEDITOR.instances["editor1"].getData();
    var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
    var ExpectedPackagingGridValue = [];

    $(".formulation_table table").each(function () {
        var table = $(this);
        var id = table.attr("class").replace('mt-4 ', '');
        ExpectedPackagingGridValue.push({
            Product: table.find(".expectedProduct").text().trim(),
            SKU: table.find(".expectedSKU").text().trim(),
            PrimaryPackaging: packagingProfileData_1[id].PrimaryPackaging,
            SecondaryPackaging: packagingProfileData_1[id].SecondaryPackaging,
            TertiaryPackaging: packagingProfileData_1[id].TertiaryPackaging,
            BenchmarkProducts: packagingProfileData_1[id].BenchmarkProducts,
            DesiredProductCharacteristics: packagingProfileData_1[id].DesiredProductCharacteristics,
            Others: packagingProfileData_1[id].Others,
            Moulds: table.find(".expected_molds").text().trim(),
            ImageUpload: table.find(".imageUpload").text().trim(),
        });
    });
    var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");

    var flag = true;
    CKEDITOR.instances.editor1.on('change', function () {
        CKEDITOR.instances["editor1"].getData() == '' ? $("#ErrorIn_BusinessRational").prop("hidden", false) : $("#ErrorIn_BusinessRational").prop("hidden", true);
    });
    if ($('#ProductDescription_ProjectName-error').text() != '') {
        flag = false;
        $("#Error_in_ProjectName").prop("hidden", true);
    }
    else {
        projectName == "" ? ($('#Error_in_ProjectName').prop("hidden", false), flag = false) : $('#Error_in_ProjectName').prop("hidden", true);
    }
    if (projectName == "") {
        document.getElementById('Error_in_ProjectName').scrollIntoView({ behavior: 'smooth' })
    }
    if (flag) {

        $('div#SaveModal').modal('show');
        confirm("Are you sure you want to save the details", function () {
            if (data != []) {
                $.each(data, function (i, val) {
                    $.ajax({
                        type: 'POST',
                        url: ROOT + "ProjectBrief/DeletePackImageFile",
                        data: { fileName: val },
                    });
                });
            }
            var PackageHeaderTableData2 = [];
            $(".initiated_section").each(function (i) {
                PackageHeaderTableData2.push({
                    ProjectName: $('#ProductDescription_ProjectName').val(),
                    ProjectType: "3",
                    Hub: $('.hub_name').text(),
                    Division: $('#Division').val(),
                    Category: $('.addCategoryOption').val(),
                    InitiatedBy: $('#PackageInitiative_InitiatedBy').text(),
                    InitiatedDate: $('#PackageInitiative_InitatedOn').text(),
                    Status: "1"
                });
            });
            var ProjectDetails = [];
            ProjectDetails =
                [{
                    ProjectName: projectName,
                    BusinessRational: BusinessRationalData,
                    PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                }];

            $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData2));
            $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
            $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
            $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
            $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
            $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));
            var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val()
            $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks)
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            document.getElementById('Package_Form_Submit').submit();
            $('#ToSave').prop("disabled", true);
        });
    }
}
function ValidatePackSubmitToManager() {
    $('#ByClickOk').prop("disabled", false);
    var PackageHeaderTableData1 = [];
    var ProjectDetails = [];
    var ProjectName = $('#ProductDescription_ProjectName').val();
    var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
    var BusinessRationalData = CKEDITOR.instances["editor1"].getData().trim();
    var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
    var ExpectedPackagingGridValue = [];
    var contentWithoutTags = BusinessRationalData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
    $(".formulation_table table").each(function () {
        var table = $(this);
        var id = table.attr("class").replace('mt-4 ', '');
        ExpectedPackagingGridValue.push({
            Product: table.find(".expectedProduct").text().trim(),
            SKU: table.find(".expectedSKU").text().trim(),
            PrimaryPackaging: packagingProfileData_1[id].PrimaryPackaging,
            SecondaryPackaging: packagingProfileData_1[id].SecondaryPackaging,
            TertiaryPackaging: packagingProfileData_1[id].TertiaryPackaging,
            BenchmarkProducts: packagingProfileData_1[id].BenchmarkProducts,
            DesiredProductCharacteristics: packagingProfileData_1[id].DesiredProductCharacteristics,
            Others: packagingProfileData_1[id].Others,
            Moulds: table.find(".expected_molds").text().trim(),
            ImageUpload: table.find(".imageUpload").text().trim(),
        });
    });
    var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
    var PackageHeaderTableData1 = [];
    $(".initiated_section").each(function (i) {
        PackageHeaderTableData1.push({
            ProjectName: ProjectName,
            ProjectType: "3",
            Hub: $('.hub_name').text(),
            Division: $('#Division').val(),
            Category: $('.addCategoryOption').val(),
            InitiatedBy: $('#PackageInitiative_InitiatedBy').text(),
            InitiatedDate: $('#PackageInitiative_InitatedOn').text(),
            Status: "9"
        });
    });
    ProjectDetails =
        [{
            ProjectName: ProjectName,
            BusinessRational: BusinessRationalData
        }];
    var flag = true;
    $('#Package_Form_Submit').validate();
    if ($('#Package_Form_Submit').valid()) {
        flag = true;
    }
    else { flag = false; }

    if ($('#ProductDescription_ProjectName-error').text() != '') {
        flag = false;
        $("#Error_in_ProjectName").prop("hidden", true);
    }
    else {
        if ($("#ProductDescription_ProjectName").val() == "") {
            $("#Error_in_ProjectName").prop("hidden", false);
            flag = false;
        }
        else {
            $("#Error_in_ProjectName").prop("hidden", true);
        }
    }
    if ($.isEmptyObject(BusinessValueGridData) || $.isEmptyObject(ProductDescriptionGridValue) || $.isEmptyObject(ExpectedPackagingGridValue)
        || actualData == "" || $.isEmptyObject(SustainabilityGridValue)) {
        flag = false;
        $.isEmptyObject(BusinessValueGridData) ? $('#businessinfoMsg').prop("hidden", false) : $('#businessinfoMsg').prop("hidden", true);
        $.isEmptyObject(ProductDescriptionGridValue) ? $('#productdescriptionMsg').prop("hidden", false) : $('#productdescriptionMsg').prop("hidden", true);
        $.isEmptyObject(ExpectedPackagingGridValue) ? $('#ExpectedPackagingMsg').prop("hidden", false) : $('#ExpectedPackagingMsg').prop("hidden", true);
        actualData == "" ? $('#ErrorIn_BusinessRational').prop("hidden", false) : $('#ErrorIn_BusinessRational').prop("hidden", true);
        $.isEmptyObject(SustainabilityGridValue) ? $('#SusutainabitityMsg').prop("hidden", false) : $('#SusutainabitityMsg').prop("hidden", true);

    }
    if ($.isEmptyObject(SustainabilityGridValue)) {
        document.getElementById('SusutainabitityMsg').scrollIntoView({ behavior: 'smooth' });
    }

    if ($.isEmptyObject(ExpectedPackagingGridValue)) {
        document.getElementById('ExpectedPackagingMsg').scrollIntoView({ behavior: 'smooth' });
    }
    if ($.isEmptyObject(BusinessValueGridData)) {
        document.getElementById('businessinfoMsg').scrollIntoView({ behavior: 'smooth' });
    }
    if (BusinessRationalData == "") {
        document.getElementById('ErrorIn_BusinessRational').scrollIntoView({ behavior: 'smooth' });
    }
    if ($.isEmptyObject(ProductDescriptionGridValue)) {
        document.getElementById('productdescriptionMsg').scrollIntoView({ behavior: 'smooth' });
    }
    if (ProjectName == "") {
        document.getElementById('Error_in_ProjectName').scrollIntoView({ behavior: 'smooth' });
    }
    PackageHeaderTableData1[0].Division == "" ? (flag = false, $('#Error_Pack_Division').show()) : $('#Error_Pack_Division').hide();
    PackageHeaderTableData1[0].Division == "" ? (flag = false, document.getElementById('Error_Pack_Division').scrollIntoView({ behavior: 'smooth' })) : "";
    PackageHeaderTableData1[0].Category == "" ? (flag = false, $('#Error_pack_Category').show()) : $('#Error_pack_Category').hide();
    PackageHeaderTableData1[0].Category == "" ? (flag = false, document.getElementById('Error_pack_Category').scrollIntoView({ behavior: 'smooth' })) : "";
    if (flag) {
        confirm("Are you sure you want to send the details for approval", function () {

            if (data != []) {
                $.each(data, function (i, val) {

                    $.ajax({
                        type: 'POST',
                        url: ROOT + "ProjectBrief/DeletePackImageFile",
                        data: { fileName: val },
                    });
                });
            }
            var PackageHeaderTableData1 = [];
            $(".initiated_section").each(function (i) {
                PackageHeaderTableData1.push({
                    ProjectName: $('#ProductDescription_ProjectName').val(),
                    ProjectType: "3",
                    Hub: $('.hub_name').text(),
                    Division: $('#Division').val(),
                    Category: $('.addCategoryOption').val(),
                    InitiatedBy: $('#PackageInitiative_InitiatedBy').text(),
                    InitiatedDate: $('#PackageInitiative_InitatedOn').text(),
                    Status: "9"
                });
            });
            ProjectDetails =
                [{
                    ProjectName: ProjectName,
                    BusinessRational: BusinessRationalData,
                    PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                }];
            approvalStatus = [{
                ProjectType: "Package Initiatives",
                FromStage: 1,
                FromStageName: "Draft",
                Action: "Send to Manager Review",
                ToStage: 9,
                ToStageName: "Pending For Approval"

            }];
            var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val()
            $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
            $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
            $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
            $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
            $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks);
            $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#Package_Form_Submit').submit();
            $('#ByClickOk').prop("disabled", true);
        });

    }
}
function ValidatePackSubmitForm() {
    $('#ByClickOk').prop("disabled", false);
    var PackageHeaderTableData1 = [];
    var ProjectDetails = [];
    var ProjectName = $('#ProductDescription_ProjectName').val();
    var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
    var BusinessRationalData = CKEDITOR.instances["editor1"].getData().trim();
    var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
    var ExpectedPackagingGridValue = [];
    var contentWithoutTags = BusinessRationalData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
    $(".formulation_table table").each(function () {
        var table = $(this);
        var id = table.attr("class").replace('mt-4 ', '');
        ExpectedPackagingGridValue.push({
            Product: table.find(".expectedProduct").text().trim(),
            SKU: table.find(".expectedSKU").text().trim(),
            PrimaryPackaging: packagingProfileData_1[id].PrimaryPackaging,
            SecondaryPackaging: packagingProfileData_1[id].SecondaryPackaging,
            TertiaryPackaging: packagingProfileData_1[id].TertiaryPackaging,
            BenchmarkProducts: packagingProfileData_1[id].BenchmarkProducts,
            DesiredProductCharacteristics: packagingProfileData_1[id].DesiredProductCharacteristics,
            Others: packagingProfileData_1[id].Others,
            Moulds: table.find(".expected_molds").text().trim(),
            ImageUpload: table.find(".imageUpload").text().trim(),
        });
    });
    var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
    var PackageHeaderTableData1 = [];
    $(".initiated_section").each(function (i) {
        PackageHeaderTableData1.push({

            ProjectName: ProjectName,
            ProjectType: "3",
            Hub: $('.hub_name').text(),
            Division: $('#Division').val(),
            Category: $('.addCategoryOption').val(),
            InitiatedBy: $('#PackageInitiative_InitiatedBy').text(),
            InitiatedDate: $('#PackageInitiative_InitatedOn').text(),
            Status: "2"
        });
    });
    ProjectDetails =
        [{
            ProjectName: ProjectName,
            BusinessRational: BusinessRationalData
        }];
    var flag = true;
    $('#Package_Form_Submit').validate();
    if ($('#Package_Form_Submit').valid()) {
        flag = true;
    }
    else { flag = false; }

    if ($('#ProductDescription_ProjectName-error').text() != '') {
        flag = false;
        $("#Error_in_ProjectName").prop("hidden", true);
    }
    else {
        if ($("#ProductDescription_ProjectName").val() == "") {
            $("#Error_in_ProjectName").prop("hidden", false);
            flag = false;
        }
        else {
            $("#Error_in_ProjectName").prop("hidden", true);
        }
    }
    if ($.isEmptyObject(BusinessValueGridData) || $.isEmptyObject(ProductDescriptionGridValue) || $.isEmptyObject(ExpectedPackagingGridValue)
        || actualData == "" || $.isEmptyObject(SustainabilityGridValue)) {
        flag = false;
        $.isEmptyObject(BusinessValueGridData) ? $('#businessinfoMsg').prop("hidden", false) : $('#businessinfoMsg').prop("hidden", true);
        $.isEmptyObject(ProductDescriptionGridValue) ? $('#productdescriptionMsg').prop("hidden", false) : $('#productdescriptionMsg').prop("hidden", true);
        $.isEmptyObject(ExpectedPackagingGridValue) ? $('#ExpectedPackagingMsg').prop("hidden", false) : $('#ExpectedPackagingMsg').prop("hidden", true);
        actualData == "" ? $('#ErrorIn_BusinessRational').prop("hidden", false) : $('#ErrorIn_BusinessRational').prop("hidden", true);
        $.isEmptyObject(SustainabilityGridValue) ? $('#SusutainabitityMsg').prop("hidden", false) : $('#SusutainabitityMsg').prop("hidden", true);

    }
    if ($.isEmptyObject(SustainabilityGridValue)) {
        document.getElementById('SusutainabitityMsg').scrollIntoView({ behavior: 'smooth' });
    }

    if ($.isEmptyObject(ExpectedPackagingGridValue)) {
        document.getElementById('ExpectedPackagingMsg').scrollIntoView({ behavior: 'smooth' });
    }
    if ($.isEmptyObject(BusinessValueGridData)) {
        document.getElementById('businessinfoMsg').scrollIntoView({ behavior: 'smooth' });
    }
    if (BusinessRationalData == "") {
        document.getElementById('ErrorIn_BusinessRational').scrollIntoView({ behavior: 'smooth' });
    }
    if ($.isEmptyObject(ProductDescriptionGridValue)) {
        document.getElementById('productdescriptionMsg').scrollIntoView({ behavior: 'smooth' });
    }
    if (ProjectName == "") {
        document.getElementById('Error_in_ProjectName').scrollIntoView({ behavior: 'smooth' });
    }
    PackageHeaderTableData1[0].Division == "" ? (flag = false, $('#Error_Pack_Division').show()) : $('#Error_Pack_Division').hide();
    PackageHeaderTableData1[0].Division == "" ? (flag = false, document.getElementById('Error_Pack_Division').scrollIntoView({ behavior: 'smooth' })) : "";
    PackageHeaderTableData1[0].Category == "" ? (flag = false, $('#Error_pack_Category').show()) : $('#Error_pack_Category').hide();
    PackageHeaderTableData1[0].Category == "" ? (flag = false, document.getElementById('Error_pack_Category').scrollIntoView({ behavior: 'smooth' })) : "";
    if (flag) {
        confirm("Are you sure you want to send the details for approval", function () {

            if (data != []) {
                $.each(data, function (i, val) {

                    $.ajax({
                        type: 'POST',
                        url: ROOT + "ProjectBrief/DeletePackImageFile",
                        data: { fileName: val },
                    });
                });
            }
            var PackageHeaderTableData1 = [];
            $(".initiated_section").each(function (i) {
                PackageHeaderTableData1.push({
                    ProjectName: $('#ProductDescription_ProjectName').val(),
                    ProjectType: "3",
                    Hub: $('.hub_name').text(),
                    Division: $('#Division').val(),
                    Category: $('.addCategoryOption').val(),
                    InitiatedBy: $('#PackageInitiative_InitiatedBy').text(),
                    InitiatedDate: $('#PackageInitiative_InitatedOn').text(),
                    Status: "2"
                });
            });
            ProjectDetails =
                [{
                    ProjectName: ProjectName,
                    BusinessRational: BusinessRationalData,
                    PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                }];
            approvalStatus = [{
                ProjectType: "Package Initiatives",
                FromStage: 1,
                FromStageName: "Draft",
                Action: "Send to HGML Review",
                ToStage: 2,
                ToStageName: "HGML Review"

            }];
            var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val()
            $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
            $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
            $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
            $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
            $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks);
            $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#Package_Form_Submit').submit();
            $('#ByClickOk').prop("disabled", true);

        });
    }
}
//////////Preview//////////////////////////////////////////
$('#ProductDescription_ProjectName').change(function () {

    $('.PI_ProjectName_V').text($('#ProductDescription_ProjectName').val())
});
CKEDITOR.instances.editor1.on('change', function () {
    $('.PI_BusinessRational_V').empty();
    var businessrational = `<span>` + CKEDITOR.instances["editor1"].getData() + `</span>`;
    $('.PI_BusinessRational_V').append(businessrational);
});

$(".preview").on('click', function () {
    IsPreview = 1;
    $(".TotalBusinessValue_PV").text($(".TotalBusinessValue").val())
    $('.Division_PV').text($("#Division option:selected").text());
    $('.Category_PV').text($("#Category option:selected").text());
    if ($('.Division_PV').text() == '--Select--') {
        $('.Division_PV').text('')
    }
    $('.Category_PV').text($(".addCategoryOption option:selected").text());
    if ($('.Category_PV').text() == '---Select---') {
        $('.Category_PV').text('')
    }
    $(".PackageInitiatorRemarks_PV").text($("#PackageInitiatorRemarks").val())
    var packagingProfiletables = $(".formulation_table").html();
    $("#Packaging_Profile_Table").empty();
    $("#Packaging_Profile_Table").append(packagingProfiletables);
    $("#Packaging_Profile_Table").find("i.fa-pen").remove();
    $("#Packaging_Profile_Table").find("i.fa-trash").remove();

    var uploadedimages = $("#uploaded_images_table").jqGrid('getGridParam', 'data');
    $('#uploaded_images_table_PV').jqGrid('clearGridData');
    $("#uploaded_images_table_PV").jqGrid('setGridParam', { data: uploadedimages });
    $("#uploaded_images_table_PV").trigger('reloadGrid', [{ page: 1 }]);
    $("#uploaded_images_table_PV").find("i.fa-trash").remove();

});




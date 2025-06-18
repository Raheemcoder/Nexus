
$('.data-datepicker').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'dd-mm-yyyy',
    startDate: '+0d'

});


// To store the Product Name of each section
var businessInfoProductNameList = [];
var packagingProfileProductNameList = [];
var sustainabilityProductNameList = [];
var deleteImageIn_DocGrid = [];
var deleteImageIn_BenchMark = [];

CKEDITOR.replace('PackagingProfilePrimaryPackaging', {
    height: 275,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    //{
    //    "name": "links",
    //    "groups": ["links"]
    //},
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

        //{
        //    "name": "insert",
        //    "groups": ["insert"]
        //},

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('PackagingProfileSecondaryPackaging', {
    height: 275,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    //{
    //    "name": "links",
    //    "groups": ["links"]
    //},
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

        //{
        //    "name": "insert",
        //    "groups": ["insert"]
        //},

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('PackagingProfileTertiaryPackaging', {
    height: 275,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    //{
    //    "name": "links",
    //    "groups": ["links"]
    //},
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

        //{
        //    "name": "insert",
        //    "groups": ["insert"]
        //},

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('PackagingProfileBenchMarkProduct', {
    height: 275,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    //{
    //    "name": "links",
    //    "groups": ["links"]
    //},
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

        //{
        //    "name": "insert",
        //    "groups": ["insert"]
        //},

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('PackagingProfileDesiredPackagingCharacters', {
    height: 275,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    //{
    //    "name": "links",
    //    "groups": ["links"]
    //},
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

        //{
        //    "name": "insert",
        //    "groups": ["insert"]
        //},

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('PackagingProfileOthers', {
    height: 275,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    //{
    //    "name": "links",
    //    "groups": ["links"]
    //},
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

        //{
        //    "name": "insert",
        //    "groups": ["insert"]
        //},

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
$("#BusinessInformationLaunchDate").keypress(function (event) {
    // Get the current input value
    var inputValue = $(this).val();

    // Allow only numeric keys and hyphens
    var allowedKeys = [45]; // hyphen
    if (event.which >= 48 && event.which <= 57) {
        allowedKeys.push(event.which);
    }

    // Check if the pressed key is allowed
    if (allowedKeys.indexOf(event.which) == -1) {
        event.preventDefault();
        return;
    }

    // Check if the input value already contains two hyphens
    if ((inputValue.match(/-/g) || []).length >= 2) {
        event.preventDefault();
        return;
    }

    // Check if the input value is a valid date format (dd-mm-yyyy)
    var dateFormat = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateFormat.test(inputValue)) {
        event.preventDefault();
        return;
    }
});

CKEDITOR.replace('editornf', {
    height: 150,
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


$("#Division").change(function () {
    ////
    var DivId = $("#Division").val();
    $.ajax({
        type: "POST",
        // url: ROOT + "User/GetCategoryBYId",
        url: ROOT + "NewInitiation/GetCategory",
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


//
var todayDate = new Date();
$('#Reformulation_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));



colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        scroll: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center icon_section align-items-left">' +
                '<a onclick=onEditProductDescription(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeleteProductDescription(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';
        }
    },
    {
        name: 'ExistingBrandName',
        label: 'Brand Name',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'NewBrandName',
        label: 'New Brand Name',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
    },
],


    $("#prd_desc").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_moulds',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#prd_desc tbody tr");
            var objHeader = $("#prd_desc tbody tr td");

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



var RowIdProductDescription = 0;
var ProductDescriptionEditRowId = 0;
var isvalid = true;
var noDuplicate = true;



$("#ProductDescriptionExistingName").change(function () {

    if (ProductDescriptionEditRowId > 0) {

        var existingNamesList = $("#prd_desc").jqGrid("getCol", "ExistingBrandName");
        const lowerCaseProductList = existingNamesList.map(product => product.toLowerCase());
        lowerCaseProductList.includes($(this).val().trim().toLowerCase()) && editedProductName != $(this).val().trim().toLowerCase() ? (noDuplicate = false, $('#nameAlreadyExists_Err').show()) : (noDuplicate = true, $('#nameAlreadyExists_Err').hide());


    } else {
        var existingNamesList = $("#prd_desc").jqGrid("getCol", "ExistingBrandName");
        const lowerCaseProductList = existingNamesList.map(product => product.toLowerCase());
        lowerCaseProductList.includes($(this).val().trim().toLowerCase()) && editedProductName != $(this).val().trim().toLowerCase() ? (noDuplicate = false, $('#nameAlreadyExists_Err').show()) : (noDuplicate = true, $('#nameAlreadyExists_Err').hide());

    }

});


var ProdSKUData = [];

$('#ProductDescriptionAdd').click(function () {
    $.each($('.ProductDescription'), function (i, v) {
        if ($.trim($(this).val()) === "" || $.trim($(this).val()) === null) {
            $(this).parents('.form-group').find('.Err-ProductDescription').show();
            isvalid = false;
        } else {
            $(this).parents('.form-group').find('.Err-ProductDescription').hide();
        }
        /* SKU = CKEDITOR.instances["editornf"].getData();*/


        var tempSku = $('#SKUDetails').val().replace(/(^,|,$)/g, '').replace(/,,+/g, ',').trim();

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

        SKU = resultSku;

        SKU == "" ? ($('#Err-ProductDescription-sku').show(), isvalid = false) : $('#Err-ProductDescription').hide()

    });
    var ProductDesctipitonReformulation = {};
    var Product = $.trim($("#ProductDescriptionExistingName").val());
    //  existingNamesList.includes(existingName) ? (isvalid = false, $('#nameAlreadyExists_Err').show()) : $('#nameAlreadyExists_Err').hide()

    if (isvalid && noDuplicate) {
        $('#Err-ProductDescription').hide();
        var gridDataProductDesctipiton = [];
        ProductDesctipitonReformulation = {
            ExistingBrandName: $("#ProductDescriptionExistingName").val().trim(),
            NewBrandName: $("#ProductDescriptionNewBrandName").val().trim(),
            SKU: SKU,
        }

        if (ProductDescriptionEditRowId == 0) {
            gridDataProductDesctipiton.push(ProductDesctipitonReformulation);
            var PD1 = $("#prd_desc").jqGrid('getGridParam', 'data');
            var PD2 = $.merge(PD1, gridDataProductDesctipiton);
            $("#prd_desc").jqGrid('setGridParam', { data: PD2 });
            $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            var previousRowData = jQuery("#prd_desc").jqGrid('getRowData', ProductDescriptionEditRowId);
            var oldProductName = previousRowData.ExistingBrandName;

            if (Product != oldProductName) {

                var packagingProfileData = packagingProfileData_1;
                var businessInformationData = $("#business_info").jqGrid('getGridParam', 'data');
                var sustainabilityData = $("#Table_Sustainability").jqGrid('getGridParam', 'data');


                $.each(packagingProfileData, function (i, pprData) {
                    if (pprData != undefined) {

                        if (pprData.Product == oldProductName) {

                            packagingProfileData_1[i].Product = Product;
                            $("#PP_Table_" + i + " span.expectedProduct").text(Product);
                            //$("#Packaging_Profile").jqGrid('setCell', (i + 1), "Product", Product);
                        }
                    }
                });
                $.each(businessInformationData, function (i, biData) {
                    if (biData.Product == oldProductName) {

                        $("#business_info").jqGrid('setCell', (i + 1), "Product", Product);
                    }
                });
                $.each(sustainabilityData, function (i, susData) {
                    if (susData.Product == oldProductName) {

                        $("#Table_Sustainability").jqGrid('setCell', (i + 1), "Product", Product);
                    }
                });
            }



            $("#prd_desc").jqGrid('setRowData', ProductDescriptionEditRowId, ProductDesctipitonReformulation);
            $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);

            ProductDescriptionEditRowId = 0;
        }

        var productList = $("#prd_desc").jqGrid("getCol", "ExistingBrandName");
        sustainabilityProductNameList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productList, function (el) { return $.inArray(el, sustainabilityProductNameList) == -1 });

        $("option").remove(".ProductOption");
        if (productList.length > 0) {
            var productOption = "";

            $.each(productList, function (i, obj) {

                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            });

            $("#PackagingProfileProduct,#BusinessInformationProductName").append(productOption);
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

        productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingBrandName");
        packagingProfileProductNameList = $("#expected").jqGrid("getCol", "Product");
        packagingProfileProductNameList = productDescriptionProductNameList.slice(0);
        businessInfoProductNameList = $("#business_info").jqGrid("getCol", "Product");
        businessInfoProductNameList = productDescriptionProductNameList.slice(0);
        $("option").remove("#PackagingProfileProduct .ProductOption");
        if (packagingProfileProductNameList.length > 0) {
            var productOption = "";
            $.each(packagingProfileProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#PackagingProfileProduct").append(productOption);
        }
        $("option").remove("#BusinessInformationProductName .ProductOption");
        if (businessInfoProductNameList.length > 0) {
            var productOption = "";
            $.each(businessInfoProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#BusinessInformationProductName").append(productOption);
        }


        var updatedBrand = $('#ProductDescriptionExistingName').val().trim();

        $("#business_info").find("tr").each(function () {
            // Get the value of the "productname" column in this row
            var productName = $(this).jqGrid('getCell', $(this).attr('id'), 'Product');

            // Compare the product name value
            if (productName === editedProductName) {
                // Set the value of the "productname" column in this row to "value100"
                $(this).jqGrid('setCell', $(this).attr('id'), 'Product', updatedBrand);
            }
        });


        $(".ProductDesctipitonEmpty").val("");
        $("#BusinessInformationSKU").empty();
        $("#BusinessInformationSKU").append('<option value="">--Select--</option>');
        $("#PackagingProfileSKU").empty();
        $('#PackagingProfileSKU').multiselect('rebuild');
    }
    isvalid = true;
});


var editedProductName = "";
function onEditProductDescription(RowIdProductDescription) {


    ProductDescriptionEditRowId = RowIdProductDescription;
    var DataFromGridProductDescription = jQuery('#prd_desc').jqGrid('getRowData', ProductDescriptionEditRowId)
    editedProductName = DataFromGridProductDescription.ExistingBrandName;
    $("#ProductDescriptionExistingName").val(DataFromGridProductDescription.ExistingBrandName);
    $("#ProductDescriptionNewBrandName").val(DataFromGridProductDescription.NewBrandName);
    $("#SKUDetails").val(DataFromGridProductDescription.SKU);
}

function onDeleteProductDescription(RowIdProductDescription) {


    //$('div#jqGridRow_DeleteModal').modal('toggle');

    //$('#jqGridRow_DeleteModal_Ok').click(function () {

    confirm("Deleting a Product from Product Description will delete all the records in Packaging Profile, Sustainability and Business Information respective to that Product.Are you sure you want to delete?", function () {

        var businessInformationRowId = [];
        var packagingProfileRowId = [];
        var sustainabilityRowId = [];


        var productDescription = jQuery('#prd_desc').jqGrid('getRowData', RowIdProductDescription);
        var ppProductName = productDescription.ExistingBrandName;
        var packagingProfileData = packagingProfileData_1;

        var businessInformationData = $("#business_info").jqGrid("getGridParam", "data");
        var sustainabilityData = $("#Table_Sustainability").jqGrid('getGridParam', 'data');

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

        $.each(packagingProfileRowId.reverse(), function (i, pprRowId) {

            onDeletePackagingProfile(pprRowId, '#PP_Table_' + pprRowId, 1);

        });

        $.each(businessInformationRowId.reverse(), function (i, biRowId) {

            $("#business_info").jqGrid('delRowData', biRowId);

        });

        $.each(sustainabilityRowId.reverse(), function (i, susRowId) {

            $("#Table_Sustainability").jqGrid('delRowData', susRowId);
            $("#Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);
        });


        /*        $("#prd_desc").jqGrid('delRowData', RowData);*/


        $("#prd_desc").jqGrid('delRowData', RowIdProductDescription);

        if (RowIdProductDescription == ProductDescriptionEditRowId) {
            ProductDescriptionEditRowId = 0;
        }


        $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
        /*   $("#expected").trigger('reloadGrid', [{ page: 1 }]);*/

        //var productList = $("#prd_desc").jqGrid("getCol", "ExistingBrandName");

        //if (productList.length >= 0) {
        //    var productOption = "";
        //    $("option").remove(".ProductOption");
        //    $.each(productList, function (i, obj) {
        //        
        //        productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
        //    });

        //    $("#PackagingProfileProduct,#BusinessInformationProductName").append(productOption);
        //}
        productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingBrandName");
        //packagingProfileProductNameList = $("#expected").jqGrid("getCol", "Product");
        //packagingProfileProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, packagingProfileProductNameList) == -1 });
        businessInfoProductNameList = $("#business_info").jqGrid("getCol", "Product");
        //businessInfoProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, businessInfoProductNameList) == -1 });
        sustainabilityProductNameList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, sustainabilityProductNameList) == -1 });
        packagingProfileProductNameList = productDescriptionProductNameList.slice(0);
        businessInfoProductNameList = productDescriptionProductNameList.slice(0);


        $("option").remove("#PackagingProfileProduct .ProductOption");
        if (packagingProfileProductNameList.length > 0) {
            var productOption = "";
            $.each(packagingProfileProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#PackagingProfileProduct").append(productOption);
        }
        $("option").remove("#BusinessInformationProductName .ProductOption");
        if (businessInfoProductNameList.length > 0) {
            var productOption = "";
            $.each(businessInfoProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#BusinessInformationProductName").append(productOption);

            $('#BusinessInformationSKU .skuOption').remove();
            $('#BusinessInformationSKU .options').remove();
            $('#BusinessInformationSKU').prop('selectedIndex', 0);

            $('#PackagingProfileSKU').val('').multiselect('refresh');
            $("#PackagingProfileSKU").empty();
            $("#PackagingProfileSKU").multiselect('rebuild');

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

    });

    //    });
}

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center icon_section align-items-left">' +
                '<a onclick=onEditBusinessInformation(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeleteBusinessInformation(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';
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
        name: 'ProposeLaunchDate',
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
        name: 'M4',
        label: 'M4 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M5',
        label: 'M5 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M6',
        label: 'M6 Quantity',
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
        name: 'Revisioninpackagingformat',
        label: 'Revision in Packaging Format',
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

    $("#business_info").jqGrid({
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



$("#BusinessInformationSellingPrice, #BusinessInformationY2").change(function () {
    //
    $("#BI_BusinessValue").val("");
    if ($("#BusinessInformationSellingPrice").val() != "" && $("#BusinessInformationY2").val() != "") {

        var value = $("#BusinessInformationSellingPrice").val() * $("#BusinessInformationY2").val();
        const formattedValue = value.toLocaleString('en-US', { maximumFractionDigits: 0 });
        $("#BusinessInformationBusinessValue").val(formattedValue);
    }
});
//Display Packaging profile 
$('#Radio1').click(function () {
    //
    $("#PackagingProfile").show()
    $("#PackagingProfileGrid").show()
})
$('#Radio2').click(function () {
    //
    $("#PackagingProfile").hide()
    $("#PackagingProfileGrid").hide()
})


var RowIdBusinessInformation = 0;
var EditRowIdBusinessInformation = 0;
var isvalid = true;
var isEditBI = false;
var BIEditedSKU = "";




$('#BusinessInformationAdd').click(function () {
    var isvalid = true;

    $.each($('.BusinessInformationManditoryField'), function (i, v) {
        if ($.trim($(this).val()) === "" || $.trim($(this).val()) === null) {
            $(this).parents('.form-group').find('.Err-BusinessInformation').show();
            isvalid = false;
        } else {
            $(this).parents('.form-group').find('.Err-BusinessInformation').hide();
        }
    });

    //if ($("input[type=radio][name=survey]:checked").val() == 'Yes') {

    //    var reformulationPackagingProfileGrid = $('#expected').jqGrid('getGridParam', 'data');
    //    var reformulationBusinessInformation = $('#business_info').jqGrid('getDataIDs');
    //    var YesCount = 0;
    //
    //    $.each(reformulationBusinessInformation, function (j, v) {
    //
    //        var temp = $("#business_info").jqGrid('getRowData', v)
    //        var Revisioninpackagingformat = temp.Revisioninpackagingformat
    //        if (Revisioninpackagingformat == "Yes") {
    //            YesCount++;
    //        }
    //    })

    //    if (reformulationPackagingProfileGrid.length <= YesCount && reformulationPackagingProfileGrid.length!=0){
    //        $("#Err-PackagingProfileBI").show()
    //        isvalid = false;
    //    }
    //   else if (reformulationPackagingProfileGrid.length == 0 ) {
    //        $("#Err-PackagingProfileBI").show()
    //        isvalid = false;
    //    }
    //    else {
    //        $("#Err-PackagingProfileBI").hide()
    //        isvalid = true;

    //    }

    //}


    var SP, TP, GP, Currency, M1, M2, M3, M4, M5, M6, Y1, Y2, Y3, Proposedlaunchdate;
    GP = $("#BusinessInformationExpectedGP").val();
    Currency = $("#BusinessInformationCurrency").val();
    MRP = $("#BusinessInformationProposedMRP").val();
    SP = $("#BusinessInformationSellingPrice").val();
    M1 = $("#BusinessInformationM1").val();
    M2 = $("#BusinessInformationM2").val();
    M3 = $("#BusinessInformationM3").val();
    M4 = $("#BusinessInformationM4").val();
    M5 = $("#BusinessInformationM5").val();
    M6 = $("#BusinessInformationM6").val();
    Y1 = $("#BusinessInformationY1").val();
    Y2 = $("#BusinessInformationY2").val();
    Y3 = $("#BusinessInformationY3").val();
    TP = $("#BusinessInformationProposedTP").val();

    var date = $("#BusinessInformationLaunchDate").val();
    // var Proposedlaunchdate = new Date(date);

    Proposedlaunchdate = date;
    GP = parseFloat(GP.replace(/,/g, ''));
    (GP < 1 || GP > 100) ? ($('#Error_Range_ExpectedGP').show(), isvalid = false) : $('#Error_Range_ExpectedGP').hide();

    //&& M4 != "" && M5 != "" && M6 != ""

    if (TP != "" && SP != "" && M1 != "" && M2 != "" && M3 != "" && Y1 != "" && Y2 != "" && Y3 != "" && SP != "" && Currency != "" && MRP != "") {
        TP = parseFloat(TP.replace(/,/g, ''));
        SP = parseFloat(SP.replace(/,/g, ''));
        M1 = parseFloat(M1.replace(/,/g, ''));
        M2 = parseFloat(M2.replace(/,/g, ''));
        M3 = parseFloat(M3.replace(/,/g, ''));
        M4 = parseFloat(M4.replace(/,/g, ''));
        M5 = parseFloat(M5.replace(/,/g, ''));
        M6 = parseFloat(M6.replace(/,/g, ''));
        //M4 = M4 == "" ? "" : parseFloat(M4.replace(/,/g, ''));
        //M5 = M5 == "" ? "" : parseFloat(M5.replace(/,/g, ''));
        //M6 = M6 == "" ? "" : parseFloat(M6.replace(/,/g, ''));
        Y1 = parseFloat(Y1.replace(/,/g, ''));
        Y2 = parseFloat(Y2.replace(/,/g, ''));
        Y3 = parseFloat(Y3.replace(/,/g, ''));
        MRP = parseFloat(MRP.replace(/,/g, ''));

        //  (GP < 1 || GP > 100) ? ($('#Error_Range_ExpectedGP').show(), flag = false) : $('#Error_Range_ExpectedGP').hide();


        //|| isNaN(M4) || isNaN(M5) || isNaN(M6)
        if (isNaN(M1) || isNaN(M2) || isNaN(M3) || isNaN(Y1) || isNaN(Y2) || isNaN(Y3) || isNaN(TP) || isNaN(GP) || isNaN(SP) || isNaN(MRP)) {

            isvalid = false;
            isNaN(M1) ? $("#Err-NAN-M1").show() : $("#Err-NAN-M1").hide()
            isNaN(M2) ? $("#Err-NAN-M2").show() : $("#Err-NAN-M2").hide()
            isNaN(Y1) ? $("#Err-NAN-Y1").show() : $("#Err-NAN-Y1").hide()
            isNaN(Y2) ? $("#Err-NAN-Y2").show() : $("#Err-NAN-Y2").hide()
            isNaN(Y3) ? $("#Err-NAN-Y3").show() : $("#Err-NAN-Y3").hide()
            isNaN(TP) ? $("#Err-NAN-TP").show() : $("#Err-NAN-TP").hide()
            isNaN(GP) ? $("#Err-NAN-GP").show() : $("#Err-NAN-GP").hide()
            isNaN(SP) ? $("#Err-NAN-SP").show() : $("#Err-NAN-SP").hide()
            isNaN(MRP) ? $("#Err-NAN-MRP").show() : $("#Err-NAN-MRP").hide()
            isNaN(M3) ? $("#Err-NAN-M3").show() : $("#Err-NAN-M3").hide()
            //isNaN(M4) ? $("#Err-NAN-M4").show() : $("#Err-NAN-M4").hide()
            //isNaN(M5) ? $("#Err-NAN-M5").show() : $("#Err-NAN-M5").hide()
            //isNaN(M6) ? $("#Err-NAN-M6").show() : $("#Err-NAN-M6").hide()
        }
    }
    else if (TP === 0 || GP === 0 || SP === 0 || M1 === 0 || M2 === 0 || M3 === 0 || Y1 === 0 || Y2 === 0 || Y3 === 0) {

        // M4 === 0 || M5 === 0 || M6 === 0 ||

        M1 == 0 ? ($("#Err-Zero-M1").show(), isvalid = false) : $("#Err-Zero-M1").hide()
        M2 == 0 ? ($("#Err-Zero-M2").show(), isvalid = false) : $("#Err-Zero-M2").hide()
        M3 == 0 ? ($("#Err-Zero-M3").show(), isvalid = false) : $("#Err-Zero-M3").hide()
        //M4 == 0 ? ($("#Err-Zero-M4").show(), isvalid = false) : $("#Err-Zero-M4").hide()
        //M5 == 0 ? ($("#Err-Zero-M5").show(), isvalid = false) : $("#Err-Zero-M5").hide()
        //M6 == 0 ? ($("#Err-Zero-M6").show(), isvalid = false) : $("#Err-Zero-M6").hide()
        Y1 == 0 ? ($("#Err-Zero-Y1").show(), isvalid = false) : $("#Err-Zero-Y1").hide()
        Y2 == 0 ? ($("#Err-Zero-Y2").show(), isvalid = false) : $("#Err-Zero-Y2").hide()
        Y3 == 0 ? ($("#Err-Zero-Y3").show(), isvalid = false) : $("#Err-Zero-Y3").hide()
        SP == 0 ? ($("#Err-Zero-SP").show(), isvalid = false) : $("#Err-Zero-SP").hide()
        TP == 0 ? ($("#Err-Zero-TP").show(), isvalid = false) : $("#Err-Zero-TP").hide()
    }
    var BV = $("#BusinessInformationBusinessValue").val();
    Y1 < (M1 + M2 + M3 + (isNaN(M4) ? 0 : M4) + (isNaN(M5) ? 0 : M5) + (isNaN(M6) ? 0 : M6)) ? ($('#Y1Less').show(), isvalid = false) : $('#Y1Less').hide();

    var tempUom = $("#BusinessInformationUOM").val();

    if (tempUom != "") {
        for (var i = 0; i < tempUom.length; i++) {
            if ((tempUom.charCodeAt(i) >= 65 && tempUom.charCodeAt(i) <= 90) || (tempUom.charCodeAt(i) >= 97 && tempUom.charCodeAt(i) <= 122)) {
                continue;
            }
            else {
                isvalid = false;
                $('.UomErr').show();
                break;
            }
        }
    }

    EditRowIdBusinessInformation == 0 && $(".Error_BI_Product").text() != '' ? isvalid = false : "";


    if (isvalid) {
        $('#err-business_info').hide()
        var gridDataBusinessInformation = [];
        var BusinessInformation = {};
        $("#Err-NAN-GP").hide()
        $("#Err-NAN-BV").hide()
        $("#Err-NAN-TP").hide()
        $("#Err-NAN-MRP").hide()
        $("#Err-NAN-SP").hide()
        $("#Err-NAN-M1").hide()
        $("#Err-NAN-M2").hide()
        $("#Err-NAN-M3").hide()
        //$("#Err-NAN-M4").hide()
        //$("#Err-NAN-M5").hide()
        //$("#Err-NAN-M6").hide()
        $("#Err-NAN-Y1").hide()
        $("#Err-NAN-Y2").hide()
        $("#Err-NAN-Y3").hide()
        $('.UomErr').hide()
        BusinessInformation = {
            Product: $("#BusinessInformationProductName").val(),
            SKU: $("#BusinessInformationSKU").val(),
            ProposeLaunchDate: Proposedlaunchdate,
            ProposedSellingPrice: $("#BusinessInformationSellingPrice").val(),
            ProposedTP: $("#BusinessInformationProposedTP").val(),
            ProposedMRP: $("#BusinessInformationProposedMRP").val(),
            ExpectedGP: $("#BusinessInformationExpectedGP").val(),
            BusinessValue: BV,
            M1: $("#BusinessInformationM1").val(),
            M2: $("#BusinessInformationM2").val(),
            M3: $("#BusinessInformationM3").val(),
            M4: $("#BusinessInformationM4").val(),
            M5: $("#BusinessInformationM5").val(),
            M6: $("#BusinessInformationM6").val(),
            Y1: $("#BusinessInformationY1").val(),
            Y2: $("#BusinessInformationY2").val(),
            Y3: $("#BusinessInformationY3").val(),
            Currency: $("#BusinessInformationCurrency").val(),
            Revisioninpackagingformat: $("input[type=radio][name=survey]:checked").val(),
            UOM: $("#BusinessInformationUOM").val(),
        };
        $("input[type=radio][name=survey]:checked").val() == "Yes" ? $("#PackagingProfile").show() : $("#PackagingProfile").hide();
        if (EditRowIdBusinessInformation == 0) {
            gridDataBusinessInformation.push(BusinessInformation);
            var BI1 = $("#business_info").jqGrid('getGridParam', 'data');
            var BI2 = $.merge(BI1, gridDataBusinessInformation);
            $("#business_info").jqGrid('setGridParam', { data: BI2 });
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            //$.each(BusinessInformation, function (key, value) {
            //    $("#business_info").jqGrid('setCell', EditRowIdBusinessInformation, key, value);
            //});
            $("#business_info").jqGrid('setRowData', EditRowIdBusinessInformation, BusinessInformation);
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
            EditRowIdBusinessInformation = 0;
        }
        $(".BusinessInformationManditoryField").val("");
        $("#BusinessInformationM4").val("");
        $("#BusinessInformationM5").val("");
        $("#BusinessInformationM6").val("");

        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('.data-datepicker').datepicker('setDate', today);
        $('#BusinessInformationLaunchDate').val('');
        $('#BusinessInformationSKU .skuOption').remove();
        $('#BusinessInformationSKU .options').remove();


        //var productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingBrandName");

        //var productList = $("#business_info").jqGrid("getCol", "Product");

        //businessInfoProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        //$("option").remove("#BusinessInformationProductName .ProductOption");

        //if (businessInfoProductNameList.length > 0) {


        //    var productOption = "";

        //    $.each(businessInfoProductNameList, function (i, obj) {

        //        if (obj != "") {
        //            productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
        //        }
        //    });

        //    $("#BusinessInformationProductName").append(productOption);
        //}


        $('#BusinessInformationSKU').prop('selectedIndex', 0);
    }
    isvalid = true;
    isEditBI = false;
});


function onEditBusinessInformation(RowIdBusinessInformation) {
    isEditBI = true;
    var DataFromTheRowBI = jQuery('#business_info').jqGrid('getRowData', RowIdBusinessInformation);
    BIEditedSKU = DataFromTheRowBI.SKU;
    //var productList = $("#business_info").jqGrid("getCol", "Product");

    //businessInfoProductNameList = $.grep(businessInfoProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    //businessInfoProductNameList.push(DataFromTheRowBI.Product);

    //$("option").remove("#BusinessInformationProductName .ProductOption");

    //if (businessInfoProductNameList.length > 0) {

    //    var productOption = "";

    //    $.each(businessInfoProductNameList, function (i, obj) {

    //        if (obj != "") {
    //            productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>';
    //        }
    //    });

    //    $("#BusinessInformationProductName").append(productOption);
    //}


    $('#BusinessInformationProductName').val(DataFromTheRowBI.Product);
    $('#BusinessInformationSKU .options').remove();
    var skuVals = DataFromTheRowBI.SKU.split(',');
    var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].ExistingBrandName == $('#BusinessInformationProductName').val()) {
            var sku = gridData[i].SKU;
            var skuList = sku.split(',');
            var skuOption = "";
            $.each(skuList, function (i, obj) {
                if (obj != "" || obj != null || obj != undefined) {
                    skuOption += '<option class="options" value="' + obj + '">' + obj + '</option>';
                }
            });
            // $('#PackagingProfileSKU').append(skuOption); // append the new options to the dropdown
            $("#BusinessInformationSKU").append(skuOption);
            break;
        }
    }
    $('.Err-BIcombination').hide();
    $('#BusinessInformationAdd').prop('disabled', false);


    // $("#BusinessInformationProductName").val(DataFromTheRowBI.Product);
    $("#BusinessInformationSKU").val(DataFromTheRowBI.SKU);
    // $("#BusinessInfoLaunchDate").val(DataFromTheRowBI.Proposedlaunchdate);
    var proposedLaunchDate = DataFromTheRowBI.ProposeLaunchDate;

    var val = DataFromTheRowBI.ProposeLaunchDate.split("-").join("-");
    $('#BusinessInformationLaunchDate').val(DataFromTheRowBI.ProposeLaunchDate.split("-").join("-"));
    $('#BusinessInformationLaunchDate').datepicker('setDate', val);


    $("#BusinessInformationSellingPrice").val(DataFromTheRowBI.ProposedSellingPrice);
    $("#BusinessInformationProposedTP").val(DataFromTheRowBI.ProposedTP);
    $("#BusinessInformationProposedMRP").val(DataFromTheRowBI.ProposedMRP);
    $("#BusinessInformationExpectedGP").val(DataFromTheRowBI.ExpectedGP);
    $("#BusinessInformationBusinessValue").val(DataFromTheRowBI.BusinessValue);
    $("#BusinessInformationM1").val(DataFromTheRowBI.M1);
    $("#BusinessInformationM2").val(DataFromTheRowBI.M2);
    $("#BusinessInformationM3").val(DataFromTheRowBI.M3);
    $("#BusinessInformationM4").val(DataFromTheRowBI.M4);
    $("#BusinessInformationM5").val(DataFromTheRowBI.M5);
    $("#BusinessInformationM6").val(DataFromTheRowBI.M6);
    $("#BusinessInformationY1").val(DataFromTheRowBI.Y1);
    $("#BusinessInformationY2").val(DataFromTheRowBI.Y2);
    $("#BusinessInformationY3").val(DataFromTheRowBI.Y3);
    $("#BusinessInformationCurrency").val(DataFromTheRowBI.Currency);
    // RevisionInPackagingFormat: $("input[type=radio][name=survey]:checked").val(),
    $("input[name=survey][value=" + DataFromTheRowBI.Revisioninpackagingformat + "]").prop('checked', true);


    $("#BusinessInformationUOM").val(DataFromTheRowBI.UOM);
    EditRowIdBusinessInformation = RowIdBusinessInformation;
}
function onDeleteBusinessInformation(RowIdBusinessInformation, flag = 0) {
    //;
    //$('div#jqGridRow_DeleteModal').modal('toggle');

    //$('#jqGridRow_DeleteModal_Ok').click(function () {
    if (flag === 1) {
        $("#business_info").jqGrid('delRowData', RowIdBusinessInformation);
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
    }
    else {
        confirm("Are you sure you want to delete?", function () {
            $("#business_info").jqGrid('delRowData', RowIdBusinessInformation);
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);


            //    var productList = $("#business_info").jqGrid("getCol", "Product");
            //    productDescriptionProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingBrandName");
            //    businessInfoProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
            //    //formulationProfileProductNameList.push(DataFromTheRow.Product);

            //    $("option").remove("#BusinessInformationProductName .ProductOption");

            //    if (businessInfoProductNameList.length > 0) {


            //        var productOption = "";

            //        $.each(businessInfoProductNameList, function (i, obj) {
            //            //
            //            if (obj != "") {
            //                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            //            }
            //        });

            //        $("#BusinessInformationProductName").append(productOption);
            //    }

        });
    }

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $('.data-datepicker').datepicker('setDate', today);
    $('#BusinessInformationLaunchDate').val('');
}


$('#BusinessInformationSKU').change(function () {

    var prod = $("#BusinessInformationProductName").val();
    var sku = $("#BusinessInformationSKU").val();

    var gridData = $("#business_info").jqGrid('getGridParam', 'data');

    if (isEditBI) {
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Product == prod && gridData[i].SKU == sku && gridData[i].SKU != BIEditedSKU) {
                $('.Err-BIcombination').show();
                $('#BusinessInformationAdd').prop('disabled', true);
                break;
            }
            else {
                $('.Err-BIcombination').hide();
                $('#BusinessInformationAdd').prop('disabled', false);
            }
        }
    }
    else {

        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Product == prod && gridData[i].SKU == sku) {
                $('.Err-BIcombination').show();
                $('#BusinessInformationAdd').prop('disabled', true);
                break;
            }
            else {
                $('.Err-BIcombination').hide();
                $('#BusinessInformationAdd').prop('disabled', false);
            }
        }

    }

});


$('#PackagingProfileSKU').change(function () {

    var prod = $("#PackagingProfileProduct").val();
    var sku = $("#PackagingProfileSKU").val().toString();

    var gridData = $("#expected").jqGrid('getGridParam', 'data');

    if (isEditPP) {
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Product == prod && gridData[i].SKU == sku && gridData[i].SKU != PPEditedSKU) {
                $('.Err-PPcombination').show();
                $('#PackagingProfileAdd').prop('disabled', true);
                break;
            }
            else {
                $('.Err-PPcombination').hide();
                $('#PackagingProfileAdd').prop('disabled', false);
            }
        }
    }
    else {

        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Product == prod && gridData[i].SKU == sku) {
                $('.Err-PPcombination').show();
                $('#PackagingProfileAdd').prop('disabled', true);
                break;
            }
            else {
                $('.Err-PPcombination').hide();
                $('#PackagingProfileAdd').prop('disabled', false);
            }
        }

    }

});





$("#PackagingProfileProduct").change(function () {
    debugger
    $("#PackagingProfileSKU").empty(); // remove all options from the dropdown
    var productName = $("#PackagingProfileProduct").val();
    $(".Error_PP_Product").hide().text('');
    var existingSku = [];
    if (productName != "") {
        var gridDataExpected = packagingProfileData_1.filter(row => row.length !== 0);
        if (isEdited == 0) {

            if (gridDataExpected.length > 0) {
                for (var i = 0; i < gridDataExpected.length; i++) {
                    if (gridDataExpected[i].Product == productName) {

                        var skusplitlist = gridDataExpected[i].SKU.toString().split(',');
                        for (let i = 0; i < skusplitlist.length; i++) {
                            existingSku.push(skusplitlist[i]);
                        }
                    }
                }
            }
        }
        else {
            debugger
            if (gridDataExpected.length > 0) {
                for (var i = 0; i < gridDataExpected.length; i++) {
                    if (editedRowdata[0] !== gridDataExpected[i]) {
                        debugger
                        if (gridDataExpected[i].Product == productName) {
                            var skusplitlist = gridDataExpected[i].SKU.toString().split(',');
                            for (let i = 0; i < skusplitlist.length; i++) {
                                existingSku.push(skusplitlist[i]);
                            }
                        }
                    }
                }
            }
        }
        var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].ExistingName == productName) {
                var sku = gridData[i].SKU;
                var skuList = sku.split(',');
                result = $.grep(skuList, function (element) {
                    return $.inArray(element, existingSku) === -1;
                });
                if (result.length > 0) {
                    $('.Err-PPNoMoreSKU').hide();
                    var skuOption = "";
                    $.each(result, function (i, obj) {
                        if (obj != "" || obj != null || obj != undefined) {
                            skuOption += '<option value="' + obj + '">' + obj + '</option>';
                        }
                    });
                    // $('#PackagingProfileSKU').append(skuOption); // append the new options to the dropdown
                    $("#PackagingProfileSKU").html(skuOption);
                    $('#PackagingProfileSKU').multiselect('rebuild');
                }
                else {
                    $('.Err-PPNoMoreSKU').show();
                }
                break;
            }
        }
    }
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


$("#BusinessInformationProductName").change(function () {

    $("option").remove("#BusinessInformationSKU .skuOption");
    var productName = $("#BusinessInformationProductName").val();
    $(".Error_BI_Product").hide().text('');
    //harshitha
    $("option").remove("#BusinessInformationSKU .options");

    $("option").remove("#BusinessInformationSKU .skuOption");
    //----------------------
    // productName == "" ? ($("#Error_PP_Product").show().text('Please select Product')) : $("#Error_PP_Product").hide().text('');
    //const productList = $("#business_info").jqGrid("getCol", "Product");

    if (productName != "") {
        // productList.includes(productName) ? ($(".Error_BI_Product").show().text('This Product already consists the definition, Please select the different Product')) : "";

        var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].ExistingBrandName == productName) {
                var sku = gridData[i].SKU;
                var skuList = sku.split(',');
                var skuOption = "";
                $.each(skuList, function (i, obj) {

                    if (obj != "" || obj != null || obj != undefined) {
                        skuOption += '<option class="skuOption" value="' + obj + '">' + obj + '</option>';
                    }
                });
                $('#BusinessInformationSKU').append(skuOption);
                break;
            }
        }
    }
});


colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center icon_section align-items-left">' +
                '<a onclick=onEditPackagingProfile(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeletePackagingProfile(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';
        }
    },
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
        name: 'DesiredPackagingCharacters',
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
        label: 'Mold',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ImagesUploadDownload',
        label: 'Images',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return `<div class="text-center icon_section align-items-left">` +
                (rowobject.ImagesUploadHide == undefined || rowobject.ImagesUploadHide === "" ? `<i></i>` : `<a data-attr="` + options.rowId + `_download" onclick="DownloadPackageImage(` + options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `DownloadPackageImagesUpload"><i class="fa fa-download mr-2" title="Download"></i></a>` +
                    '<a data-attr="' + options.rowId + 'view" class="icon_color btn_button" title="View" id="' + options.rowId + '" href="' + ROOT + 'NPDImages/' + rowobject.ImagesUploadHide + '" target="_blank" ><i class="fa fa-eye mr-2" title="View"></i></a><a data-attr="' + options.rowId + 'delete" onclick="DeletePackageImage(' + options.rowId + ')" class="icon_color btn_button" title="Delete" id="' + options.rowId + '"><i class="fa fa-trash mr-2" title="Delete"></i></a>') +
                `</div> `;

            //return `<div class="text-center icon_section align-items-left">
            //          <a onclick="DownloadPackageImage(`+ options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `DownloadPackageImagesUpload"><i class="fa fa-download mr-2" title="Edit"></i></a>
            //          </div>`;
        }
    },
    {
        name: 'ImagesUploadHide',
        label: 'Images Hide',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },

],

    $("#expected").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#expected tbody tr");
            var objHeader = $("#expected tbody tr td");

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



var RowIdPackagingProfile = 0;
var EditRowIdPackagingProfile = 0;
var isvalid = true;
var image;
var isEditBI = false;
var BIEditedSKU = "";

var isEditPP = false;
var PPEditedSKU = "";

//$('#PackagingProfileAddold').click(function () {
//    $('.Err-PPNoMoreSKU').hide();
//    if ($('#PackagingProfileProduct').val() === "" || $('#PackagingProfileSKU').val().toString() === "" || $('#PackagingProfilePrimaryPackaging').val() === "") {
//        isvalid = false;
//        $('#PackagingProfileProduct').val() === "" ? $('.Err-PackagingProfileProduct').show() : $('.Err-PackagingProfileProduct').hide();
//        $('#PackagingProfileSKU').val().toString() === "" ? $('.Err-PackagingProfileSKU').show() : $('.Err-PackagingProfileSKU').hide();
//        $('#PackagingProfilePrimaryPackaging').val() === "" ? $('.Err-PackagingProfilePrimaryPackaging').show() : $('.Err-PackagingProfilePrimaryPackaging').hide();
//    }
//    else {
//        isvalid = true;
//        $('.Err-PackagingProfileProduct').hide();
//        $('.Err-PackagingProfileSKU').hide();
//        $('.Err-PackagingProfilePrimaryPackaging').hide();
//    }


//    var PackageImageFileName = SavePackageImageFile();
//    PackageImageFileName = PackageImageFileName.replaceAll('"', '');

//    EditRowIdPackagingProfile == 0 && $(".Error_PP_Product").text() != '' ? isvalid = false : "";

//    if (isvalid) {
//        $("#err-expected").hide();
//        var gridDataPackagingProfile = [];
//        var PackagingProfile = {};
//        PackagingProfile = {
//            Product: $("#PackagingProfileProduct").val(),
//            SKU: $("#PackagingProfileSKU").val().toString(),
//            PrimaryPackaging: $("#PackagingProfilePrimaryPackaging").val(),
//            SecondaryPackaging: $("#PackagingProfileSecondaryPackaging").val(),
//            TertiaryPackaging: $("#PackagingProfileTertiaryPackaging").val(),
//            BenchmarkProducts: $("#PackagingProfileBenchMarkProduct").val(),
//            DesiredPackagingCharacters: $("#PackagingProfileDesiredPackagingCharacters").val(),
//            Others: $("#PackagingProfileOthers").val(),
//            Mould: $("#PackagingProfileMould").val(),
//            ImagesUploadHide: PackageImageFileName,
//        };
//        isvalid = true;


//        if (EditRowIdPackagingProfile == 0) {
//            gridDataPackagingProfile.push(PackagingProfile);
//            var PP1 = $("#expected").jqGrid('getGridParam', 'data');
//            var PP2 = $.merge(PP1, gridDataPackagingProfile);
//            $("#expected").jqGrid('setGridParam', { data: PP2 });
//            $("#expected").trigger('reloadGrid', [{ page: 1 }]);
//        }

//        else {
//            $.each(PackagingProfile, function (key, value) {
//                $("#expected").trigger('reloadGrid', [{ page: 1 }]);
//                $("#expected").jqGrid('setCell', EditRowIdPackagingProfile, key, value);
//                $("#expected").trigger('reloadGrid', [{ page: 1 }]);
//            });
//            EditRowIdPackagingProfile = 0;
//        }
//        $(".PackagingProfile").val("");
//        $(".Toremove").val("");
//        $("#Display_PackageImagesUpload").text("");

//        $('#PackagingProfileSKU').val('').multiselect('refresh');
//        $("#PackagingProfileSKU").empty();
//        $("#PackagingProfileSKU").multiselect('rebuild');




//        isEditPP = false;
//    }
//});

var editedPackageRow = 0;
function onEditPackagingProfileold(RowIdPackagingProfile) {
    editedPackageRow = RowIdPackagingProfile;
    isEditPP = true;
    $('.Err-PPNoMoreSKU').hide();
    var DataFromTheRow = jQuery('#expected').jqGrid('getRowData', RowIdPackagingProfile);


    $('#PackagingProfileProduct').val(DataFromTheRow.Product);
    PPEditedSKU = DataFromTheRow.SKU;

    var selectedArr = PPEditedSKU.split(',');
    var prdDescArr = [];
    var expArr = [];

    var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].ExistingBrandName == $('#PackagingProfileProduct').val()) {
            var temp = gridData[i].SKU.split(',');
            for (let j = 0; j < temp.length; j++) {
                prdDescArr.push(temp[j]);
            }

        }
    }

    var gridData = $("#expected").jqGrid('getGridParam', 'data');
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].Product == $('#PackagingProfileProduct').val()) {
            var temp = gridData[i].SKU.split(',');
            for (let j = 0; j < temp.length; j++) {
                expArr.push(temp[j]);
            }

        }
    }

    var finalList = $.grep(prdDescArr, function (element) {
        return $.inArray(element, expArr) == -1;
    });

    for (let k = 0; k < selectedArr.length; k++) {
        finalList.push(selectedArr[k]);
    }

    $('#PackagingProfileSKU').empty();
    var skuVals = DataFromTheRow.SKU.split(',');
    var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
    //for (var i = 0; i < gridData.length; i++) {
    //    if (gridData[i].ExistingName == $('#PackagingProfileProduct').val()) {
    //        var sku = gridData[i].SKU;
    //        var skuList = sku.split(',');
    var skuOption = "";
    $.each(finalList, function (i, obj) {
        if (obj != "" || obj != null || obj != undefined) {
            skuOption += '<option value="' + obj + '">' + obj + '</option>';
        }
    });
    // $('#PackagingProfileSKU').append(skuOption); // append the new options to the dropdown
    $("#PackagingProfileSKU").html(skuOption);
    $('#PackagingProfileSKU').multiselect('rebuild');
    /*break;*/
    //    }
    //}

    $('#PackagingProfileSKU').val(skuVals);
    $("#PackagingProfileSKU").multiselect('rebuild');
    $('#PackagingProfilePrimaryPackaging').val(DataFromTheRow.PrimaryPackaging);
    $('#PackagingProfileSecondaryPackaging').val(DataFromTheRow.SecondaryPackaging);
    $('#PackagingProfileTertiaryPackaging').val(DataFromTheRow.TertiaryPackaging);
    $('#PackagingProfileBenchMarkProduct').val(DataFromTheRow.BenchmarkProducts);
    $('#PackagingProfileDesiredPackagingCharacters').val(DataFromTheRow.DesiredPackagingCharacters);
    $('#PackagingProfileOthers').val(DataFromTheRow.Others);
    $('#PackagingProfileMould').val(DataFromTheRow.Mould);
    $("#Display_PackageImagesUpload").text(DataFromTheRow.ImagesUploadHide);

    //$('#image_upload').val(DataFromTheRow.ImagesUploadHide);
    EditRowIdPackagingProfile = RowIdPackagingProfile;
    image = DataFromTheRow.ImagesUploadHide;
}
function onDeletePackagingProfileold(RowIdPackagingProfile, flag = 0) {
    ;
    //$('div#jqGridRow_DeleteModal').modal('toggle');

    //$('#jqGridRow_DeleteModal_Ok').click(function () {
    if (flag === 1) {

        $("#expected").jqGrid('delRowData', RowIdPackagingProfile);
        $("#expected").trigger('reloadGrid', [{ page: 1 }]);
    }
    else {

        confirm("Are you sure you want to delete?", function () {
            $("#expected").jqGrid('delRowData', RowIdPackagingProfile);
            $("#expected").trigger('reloadGrid', [{ page: 1 }]);



            //var productList = $("#expected").jqGrid("getCol", "Product");
            //productDescriptionProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingBrandName");
            //packagingProfileProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
            ////formulationProfileProductNameList.push(DataFromTheRow.Product);

            //$("option").remove("#PackagingProfileProduct .ProductOption");

            //if (packagingProfileProductNameList.length > 0) {


            //    var productOption = "";

            //    $.each(packagingProfileProductNameList, function (i, obj) {
            //        //
            //        if (obj != "") {
            //            productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            //        }
            //    });

            //    $("#PackagingProfileProduct").append(productOption);
            //}

        });
    }
    /*    });*/
}


//To save Package Image and return file name
function SavePackageImageFile() {
    //var fileName = "";
    var fileName = [];
    var files = $('#image_upload').prop("files");


    // if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
        var formData = new FormData();
        formData.append("file", files[i]);
        $.ajax({
            type: 'POST',
            url: ROOT + "NewInitiation/SaveImageFile",
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                // fileName = data;
                fileName.push(data.replaceAll('"', ''));
            }
        });
    }

    return fileName;
}

$("#image_upload").change(function () {
    $("#Display_PackageImagesUpload").empty();
});

function ProjectDetailsImageFile() {

    var fileName = "";

    //string.replace(searchVal, newvalue)

    var files = $('#ProjectDetailsBenchMarkSampleImage').prop("files");



        var formData = new FormData();
    if (files.length > 0) {
        formData.append("file", files[0]);
        $.ajax({
            type: 'POST',
            url: ROOT + "NewInitiation/SaveImageFile",
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                fileName = data;
            }
        });
    }
    return fileName;
}

//Download Image

function DownloadPackageImageold(rowId) {
    //
    var filename = $('#expected').jqGrid('getCell', rowId, 'ImagesUploadHide');
    if (filename.length > 0) {
        $('#' + rowId + 'DownloadPackageImagesUpload').prop("href", ROOT + "NewInitiation/DownloadImageFile?fileName=" + filename);
        return true;
    }
    else {
        $('#' + rowId + 'DownloadPackageImagesUpload').empty().text('No Image Present');

    }
}

$("#ProjectDetailsBusinessRational").keyup(function () {
    //
    $("#ProjectDetailsBusinessRational").val() == "" ? $("#Err-ProjectDetails-BusinessRational").show() : $("#Err-ProjectDetails-BusinessRational").hide();
});

$("#SkuProjectDetails").keyup(function () {
    //
    $(this).length == 0 ? $("#Err-ProductDescription-sku").show() : $("#Err-ProductDescription-sku").hide();
});

var isSubmitted = true;
function validatesubmitform() {
    
    var flag = true;

    /* SKU = CKEDITOR.instances["editornf"].getData();*/
    //SKU = $('#SKUDetails').val();
    productdescription == "" ? ($("#err-prd_desc").show(), flag = false) : $("#err-prd_desc").hide();
    reformulationBusinessInformation == "" ? ($("#err-business_info").show(), flag = false) : $("#err-business_info").hide();
    // SKU == "" ? ($('#Err-ProductDescription-sku').show(), flag = false, isvalid = false) : ($('#Err-ProductDescription-sku').hide(), isvalid = true), $(window).scrollTop($('.product_packag').position().top);


    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationBusinessInformation = $('#business_info').jqGrid('getGridParam', 'data');
    //var reformulationPackagingProfileGrid = $('#expected').jqGrid('getGridParam', 'data');
    var reformulationPackagingProfileGrid = packagingProfileData_1.filter(row => row.length !== 0);
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var projectdetailsimage = ProjectDetailsImageFile();
    //projectdetailsimage = "" ?: projectdetailsimage
    var ProjectName = $('#ProjectName').val();
    var projectheaders = []
    $("table#Reformulation_Table tbody tr").each(function (i) {
        
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Hub: $(this).find('#Reformulation_Hub').text(),
            Category: $(this).find('#Category option:selected').val(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text(),
            status: 2,
        });
    });
    var projectdetails = [];
    var additionalreformulation = [];
    projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show(), $(window).scrollTop($('#Reformulation_Table').position().top)) : $('#Error_Reformulation_Division').hide();
    projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show(), $(window).scrollTop($('#Reformulation_Table').position().top)) : $('#Error_Reformulation_Division').hide();

    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val(),
        Others: $("#AdditionalRequirmentsOthers").val(),

    };
    var initiatorremarks = $("#editor").val();


    $("#ProjectDetailsBusinessRational").val() == "" ? ($('#Err-ProjectDetails-BusinessRational').show(), flag = false) : $('#Err-ProjectDetails-BusinessRational').hide();
    productdescription.length === 0 ? ($('#Err-ProductDescription').show(), flag = false) : $('#Err-ProductDescription').hide();
    reformulationBusinessInformation.length === 0 ? ($('#err-business_info').show(), flag = false) : $('#err-business_info').hide();
    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if ($("input[type=radio][name=survey]:checked").val() == "yes") {
        reformulationPackagingProfileGrid.length === 0 ? ($("#err-expected").show(), flag = false) : $("#err-expected").hide();
    }
    $('#ProjectName').val() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();
    //$('#ReformulationSubmit').validate();

    //if ($('#ReformulationSubmit').valid()) { }
    //else {
    //    flag = false;
    //}



    if (flag) {
        $('div#SubmitModal').modal('show');
        $("#ConformReformulation").click(function () {
            //
            $("#ProjectHeaders").val(JSON.stringify(projectheaders));
            $("#reformulationProductDescription").val(JSON.stringify(productdescription));
            $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
            $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
            $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
            $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
            $("#InitiatorRemarks").val(initiatorremarks);
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));

            var benchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
            $('#BenchMarkImagesData').val(JSON.stringify(benchMarkImages));

            $("#SaveOrSubmit").val(2);

            if (isSubmitted) {
                isSubmitted = false;
                $('#ReformulationSubmit').submit();
            }
        });
    }
}


function CancelForm() {
    //
    $('div#CancelModal').modal('show');

}
var isSaved = true;
function ValidateSaveForm() {
    
    var flag = true;
    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
    // var reformulationpackagingprofilegrid = $('#expected').jqGrid('getGridParam', 'data');
    var reformulationpackagingprofilegrid = packagingProfileData_1.filter(row => row.length !== 0);
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    
    var projectdetailsimage = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
    var projectheaders = []
    var ProjectName = $('#ProjectName').val();
    // SKU = $('#SKUDetails').val();
    //SKU == "" ? ($('#Err-ProductDescription-sku').show(), isvalid = false) : $('#Err-ProductDescription-sku').hide()
    $("table#Reformulation_Table tbody tr").each(function (i) {
        //;
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Category: $(this).find('#Category option:selected').val(),
            Hub: $(this).find('#Reformulation_Hub').text(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text(),
            status: 1,
        });
    });

    //
    //var obj = JSON.parse();
    //
    projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show()) : flag = true;
    projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show()) : flag = true;

    var projectdetails = [];
    var additionalreformulation = [];
    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val(),
        benchmarksamplesimage: JSON.stringify(projectdetailsimage),
        desiredindications: $("#ProjectDetailsDesiredIndications").val(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val(),
        Others: $("#AdditionalRequirmentsOthers").val(),

    };
    var initiatorremark = $("#editor").val();

    $('#ProjectName').val() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide(), $(window).scrollTop($('#Reformulation_Table').position().top);

    //productdescription == "" ? flag = false : flag = true
    if (flag) {
        $('div#SaveModal').modal('show');
        $("#SaveReformulation").click(function () {

            $("#ProjectHeaders").val(JSON.stringify(projectheaders));
            $("#reformulationProductDescription").val(JSON.stringify(productdescription));
            $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
            $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
            $("#reformulationPackagingProfile").val(JSON.stringify(reformulationpackagingprofilegrid));
            $("#reformulationBusinessInformation").val(JSON.stringify(reformulationbusinessinformation));
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
            $("#InitiatorRemarks").val(initiatorremark);
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));

            var benchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
            $('#BenchMarkImagesData').val(JSON.stringify(benchMarkImages));

            $("#SaveOrSubmit").val(1);


            if (isSaved) {
                isSaved = false;
                $('#ReformulationSubmit').submit();

                if (deleteImagesList.length != 0) {
                    $.each(deleteImagesList, function (i, obj) {
                        $.ajax({
                            type: 'POST',
                            url: ROOT + "NewInitiation/DeleteImageFile?fileName=" + obj,
                            async: false,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                var indexToRemove = jQuery.inArray(obj, deleteImagesList);
                                if (indexToRemove !== -1) {
                                    deleteImagesList.splice(indexToRemove, 1);
                                }
                            }
                        });
                    })
                }
            }


        });
    }
}

//function onlyNumbers(evt) {

//    var e = event || evt; // for trans-browser compatibility
//    var charCode = e.which || e.keyCode;

//    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
//        return false;
//    }
//    return true;
//}

function onlyAlphabets(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;

    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        return true;
    }
    return false;
}


function restrictSpecialCharacters(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;

    if ((charCode < 48 || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || charCode > 122) && charCode != 32) {
        return false;
    }
    else {
        return true;
    }
}
$(window).on('hidden.bs.modal', function () {
    $('.closeModal').val("");
});

$('#Division').change(function () {
    $(this).val() == "" ? $('#Error_Reformulation_Division').show() : $('#Error_Reformulation_Division').hide();
});
$('#Category').change(function () {
    $(this).val() == "" ? $('#Error_Reformulation_Category').show() : $('#Error_Reformulation_Category').hide();
});

$("#ProjectName").keyup(function () {
    ////
    $('#ProjectName').val() == "" ? $("#Error-ProjectName").show() : $("#Error-ProjectName").hide();
});






$('#ProductDescriptionExistingName').keyup(function () {
    $('#ProductDescriptionExistingName').length == 0 ? $("#Err-ProductDescription").show() : $("#Err-ProductDescription").hide();
});

$('#SKUDetails').keyup(function () {
    $('#SKUDetails').length == 0 ? $("#Err-ProductDescription-sku").show() : $("#Err-ProductDescription-sku").hide();
});

$('#BusinessInformationProductName').change(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
});
$('#BusinessInformationSKU').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
});
$('#BusinessInformationLaunchDate').change(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
});
$('#BusinessInformationSellingPrice').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
});
$('#BusinessInformationProposedTP').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-TP").hide()
});
$('#BusinessInformationProposedMRP').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-MRP").hide()
});
$('#BusinessInformationCurrency').change(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
});
$('#BusinessInformationExpectedGP').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-GP").hide()
});
$('#BusinessInformationM1').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-M1").hide()
});
$('#BusinessInformationM2').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-M2").hide()
});
$('#BusinessInformationM3').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-M3").hide()
});
//$('#BusinessInformationM4').keyup(function () {
//    $(this).parent().find('.Err-BusinessInformation').hide();
//    $("#Err-NAN-M4").hide()
//});
//$('#BusinessInformationM5').keyup(function () {
//    $(this).parent().find('.Err-BusinessInformation').hide();
//    $("#Err-NAN-M5").hide()
//});
//$('#BusinessInformationM6').keyup(function () {
//    $(this).parent().find('.Err-BusinessInformation').hide();
//    $("#Err-NAN-M6").hide()
//});
$('#BusinessInformationY1').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-Y1").hide()
});
$('#BusinessInformationY2').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-Y2").hide()
});
$('#BusinessInformationY3').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-Y3").hide()
});
$('#BusinessInformationUOM').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $('.UomErr').hide()
});
$('#BusinessInformationSP').keyup(function () {
    $(this).parent().find('.Err-BusinessInformation').hide();
    $("#Err-NAN-SP").hide()
});

$('#PackagingProfileProduct').change(function () {
    $(this).val() === "" ? $('.Err-PackagingProfileProduct').show() : $('.Err-PackagingProfileProduct').hide();
});
$('#PackagingProfileSKU').keyup(function () {
    $(this).length === 0 ? $('.Err-PackagingProfileSKU').show() : $('.Err-PackagingProfileSKU').hide();
});
$('#PackagingProfilePrimaryPackaging').keyup(function () {
    $(this).length === 0 ? $('.Err-PackagingProfilePrimaryPackaging').show() : $('.Err-PackagingProfilePrimaryPackaging').hide();
});

var formData = new FormData();
function fileBenchValidation() {
    debugger
    var flag = true;
    var supportedExtention = ['jpg', 'jpeg', 'png', 'gif', 'jfif', 'tiff', 'bmp', 'svg'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#ProjectDetailsBenchMarkSampleImage`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_InvalidBenchmarkImage').show();
            $('#ProjectDetailsBenchMarkSampleImage').val('');

            setTimeout(function () {

                $('#Err_InvalidBenchmarkImage').hide();
            }, 5000)
            flag = false;

            return false;
        }
    });
    if (flag) {

        for (var i = 0; i < $(`#ProjectDetailsBenchMarkSampleImage`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#ProjectDetailsBenchMarkSampleImage`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#ProjectDetailsBenchMarkSampleImage').val('');
                $('#delete_icon_Benchmark_Samples_Image').hide();
                $(`#ProjectDetailsBenchMarkSampleImage`).get(0).val('');
                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#ProjectDetailsBenchMarkSampleImage`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#ProjectDetailsBenchMarkSampleImage`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);


        }
    }
}


$('#removeImage').click(function () {
    confirm("Are you sure you want to delete image?", function () {
        $('#ProjectDetailsBenchMarkSampleImage').val('');
        $('#removeImage').hide();
    });
});


var deleteImagesList = [];

function DeletePackageImage(rowId) {

    confirm('Are you sure you want to delete the image', function () {

        var filename = $('#expected').jqGrid('getCell', rowId, 'ImagesUploadHide');

        deleteImagesList.push(filename);

        $('#expected').jqGrid('setCell', rowId, 'ImagesUploadHide', null);

        if (editedPackageRow == rowId) {
            $('#image_upload').val('');
            $('#Display_PackageImagesUpload').text('');
            image = "";
        }
        $('[data-attr="' + rowId + '_download"]').hide();
        $('[data-attr="' + rowId + 'view"]').hide();
        $('[data-attr="' + rowId + 'delete"]').hide();
    })
}

function onlyNumbersNotdecimals(evt) {
    debugger
    var e = event || evt;
    var charCode = e.which || e.keyCode;



    if (charCode > 31 && (charCode < 48 || charCode > 57) || charCode == 46) {
        return false;
    }



    return true;
}



function onlyNumbers(evt) {
    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;

    var currentValue = evt.value;
    if (charCode == 46 && (currentValue.indexOf(".") !== -1 || currentValue.length === 0)) {
        // if decimal point is pressed and it already exists in the value or it is pressed as the first character, return false
        return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }
    return true;
}


//Added by Sachin

// Sustainability section codes

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return `<div class="text-center icon_section align-items-left">
            <a onclick=onEditSustainability(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
            <a onclick=onDeleteSustainability(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fa-trash"  title="Delete"></i></a>
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

            editRowId5 = 0;
        }

        $('.Sustainability').val("");                            // To reset the textbox fields

        productDescriptionProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingBrandName");
        var productList = $("#Table_Sustainability").jqGrid("getCol", "Product");

        sustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });

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
        productDescriptionProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingBrandName");
        sustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });

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

//----------------------------------------------
$("#PackagingProfileProduct").change(function () {
    debugger
    $("#PackagingProfileSKU").empty(); // remove all options from the dropdown
    $('#PackagingProfileSKU').multiselect('rebuild');
    var productName = $("#PackagingProfileProduct").val();
    $(".Error_PP_Product").hide().text('');
    var existingSku = [];

    if (productName != "") {
        //var gridDataExpected = $("#expected").jqGrid('getGridParam', 'data');
        //var gridDataExpected = packagingProfileData_1;
        var gridDataExpected = packagingProfileData_1.filter(row => row.length !== 0);
        var productPositioningData = $("#prd_desc").jqGrid("getGridParam", "data");

        if (gridDataExpected.length > 0) {
            for (var i = 0; i < gridDataExpected.length; i++) {
                if (gridDataExpected[i].Product == productName) {

                    var skusplitlist = gridDataExpected[i].SKU.toString().split(',');

                    for (let i = 0; i < skusplitlist.length; i++) {
                        existingSku.push(skusplitlist[i]);
                    }

                }
            }
        }

        var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');

        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].ExistingBrandName == productName) {
                var sku = gridData[i].SKU;
                var skuList = sku.split(',');

                result = $.grep(skuList, function (element) {
                    return $.inArray(element, existingSku) === -1;
                });

                if (result.length > 0) {
                    $('.Err-PPNoMoreSKU').hide();
                    var skuOption = "";
                    $.each(result, function (i, obj) {
                        if (obj != "" || obj != null || obj != undefined) {
                            skuOption += '<option value="' + obj + '">' + obj + '</option>';
                        }
                    });
                    // $('#PackagingProfileSKU').append(skuOption); // append the new options to the dropdown
                    $("#PackagingProfileSKU").html(skuOption);
                    $('#PackagingProfileSKU').multiselect('rebuild');
                }
                else {
                    $('.Err-PPNoMoreSKU').show();
                }
                break;
            }
        }
    }
});
var ppRowId = -1;
var EditRowIdPackagingProfile = -1;
var packagingProfileData_1 = [];
var imageGrid = [];
$('#PackagingProfileAdd').click(function () {
    var isvalid = true;
    $('.Err-PPNoMoreSKU').hide();
    var primaryPackaging = CKEDITOR.instances["PackagingProfilePrimaryPackaging"].getData().trim(); // Remove HTML tags and entities, then check for meaningful content
    var contentWithoutTags = primaryPackaging.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    if ($('#PackagingProfileProduct').val() === "" || $('#PackagingProfileSKU').val().toString() === "" || actualData === "") {
        $('#PackagingProfileProduct').val() === "" ? (isvalid = false, $('.Err-PackagingProfileProduct').show()) : ($('.Err-PackagingProfileProduct').hide());
        $('#PackagingProfileSKU').val().toString() === "" ? (isvalid = false, $('.Err-PackagingProfileSKU').show()) : ($('.Err-PackagingProfileSKU').hide());
        actualData === "" ? (isvalid = false, $('.Err-PackagingProfilePrimaryPackaging').show()) : ($('.Err-PackagingProfilePrimaryPackaging').hide());
    }
    else {
        isvalid = true;
        $('.Err-PackagingProfileProduct').hide();
        $('.Err-PackagingProfileSKU').hide();
        $('.Err-PackagingProfilePrimaryPackaging').hide();
    }
    var PackageImageFile = SavePackageImageFile();
    var ImageFileName = "";
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
    EditRowIdPackagingProfile == -1 && $(".Error_PP_Product").text() != '' ? isvalid = false : "";
    var selectedSku = $('#PackagingProfileSKU').val();
    if (isvalid) {
        var gridRowData = packagingProfileData_1;


        var flag = 0;

        gridRowData.forEach(function (item, index) {

            if (item.Product == $('#PackagingProfileProduct').val() && EditRowIdPackagingProfile != (index)) {

                var skuArray = item.SKU?.split(',').map(sku => sku.trim());

                $.each(selectedSku, function (index, item) {
                    if ($.inArray(item, skuArray) !== -1) {

                        isvalid = false;
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
    if (isvalid) {
        debugger
        $("#err-expected").hide();
        $('#Err-PackagingProfileBI').hide();
        var gridDataPackagingProfile = [];
        var PackagingProfile = {};
        debugger
        PackagingProfile = {
            Product: $("#PackagingProfileProduct").val(),
            SKU: $('#PackagingProfileSKU').val().toString(),
            PrimaryPackaging: CKEDITOR.instances["PackagingProfilePrimaryPackaging"].getData(),
            SecondaryPackaging: CKEDITOR.instances["PackagingProfileSecondaryPackaging"].getData(),
            TertiaryPackaging: CKEDITOR.instances["PackagingProfileTertiaryPackaging"].getData(),
            BenchmarkProducts: CKEDITOR.instances["PackagingProfileBenchMarkProduct"].getData(),//DesiredPackagingCharacters
            DesiredPackagingCharacters: CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].getData(),
            Others: CKEDITOR.instances["PackagingProfileOthers"].getData(),
            Mould: $("#PackagingProfileMould").val(),
            PackagingProfileImage: PackageImageFileName
        };

        //isvalid = true;
        ppRowId = ppRowId + 1;

        if (EditRowIdPackagingProfile == -1) {

            ppRowId = ppRowId + 1;

            packagingProfileData_1[ppRowId] = PackagingProfile;

            //<a onclick="DownloadPackageImage(` + ppRowId + `)" class="btn-icon -download" id="` + ppRowId + `DownloadPackageImage" title="Download Image">
            //                               <i class="fas fa-download" aria-hidden="true"></i>
            //                           </a>
            //                           <a id="` + ppRowId + `" href="` + ROOT + `NPDImages/` + PackagingProfile.PackagingProfileImage + `" target="_blank" class="btn-icon -view" title="View Image">
            //                               <i class="fas fa-eye"></i>
            //                      </a>`
            var htmlTag = `

        <table class="mt-2" id="PP_Table_`+ (ppRowId) + `" style="width:100%">
            <thead>
                <tr>
                    <th colspan="2">
                        <b>Product : </b>
                        <span class='expectedProduct'>`+ PackagingProfile.Product + `</span>
                    </th>
                    <th style="width:25%">
                        <b>SKU : </b>
                        <span class='expectedSKU'>`+ PackagingProfile.SKU + `</span>
                    </th>
                    <th>
                        <span>
                            <div class="justify-center_1">
                                <a class="btn-icon -edit "><i onclick="onEditPackagingProfile(`+ ppRowId + `)" class="fas fa-edit" title="Edit"></i></a>
                                <a class="btn-icon -delete"><i onclick="onDeletePackagingProfile(`+ ppRowId + `,'#PP_Table_` + ppRowId + `',0)" class="fas fa-trash" data-bs-toggle="modal" title="Delete"></i></a>
                                       ${PackagingProfile.PackagingProfileImage !== '' && PackagingProfile.PackagingProfileImage !== null ? `
                                          <a class="btn-icon -info imagesinfo" title="Images info" onclick="ShowImages(`+ ppRowId + `)" id="` + ppRowId + `"><img src='../images/multiimages.png'/></a>` : ''}
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
                        <span class="remarkss"><b>Desired Packaging Characterstics</b></span>
                        <span>`+ PackagingProfile.DesiredPackagingCharacters + `</span>
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
        
            `;
            $('#Packaging_Profile_Table').append(htmlTag);
            EditRowIdPackagingProfile = -1;
            isEdited = 0;
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

            //debugger
            //var viewContainer = $(`#PP_Table_${ppRowId}`).find(".image_table .image_view");
            //viewContainer.empty(); // Remove the existing img tag

            //var viewButton = $("<img>"); // Create a new img tag
            //viewButton.attr("src", ROOT + 'NPDImages/' + PackagingProfile.PackagingProfileImage);

            //viewContainer.append(viewButton);
        }
        else {

            debugger

            //var DataFromTheRow = jQuery('#Packaging_Profile').jqGrid('getRowData', EditRowId3);

            var DataFromTheRow = packagingProfileData_1[EditRowIdPackagingProfile];
            var htmlTag = "";
            var editedRowdata = "";
            var tableId = "#PP_Table_" + EditRowIdPackagingProfile;

            packagingProfileData_1[EditRowIdPackagingProfile] = PackagingProfile;



            if ($("#PPR_ImagesUpload").val() == '' && DataFromTheRow.ImagesUpload.length > 0) {

                PackagingProfile = {
                    Product: Product,
                    SKU: $("#PPR_SKU").val().toString(),
                    PrimaryPackaging: CKEDITOR.instances["PackagingProfilePrimaryPackaging"].getData(),
                    SecondaryPackaging: CKEDITOR.instances["PackagingProfileSecondaryPackaging"].getData(),
                    TertiaryPackaging: CKEDITOR.instances["PackagingProfileTertiaryPackaging"].getData(),
                    BenchmarkProducts: CKEDITOR.instances["PackagingProfileBenchMarkProduct"].getData(),//DesiredPackagingCharacters
                    DesiredPackagingCharacters: CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].getData(),
                    Others: CKEDITOR.instances["PackagingProfileOthers"].getData(),
                    Mould: $("#PPR_Mould").val(),
                    ImagesUpload: PackageImageFileName,
                }

                packagingProfileData_1[EditRowIdPackagingProfile] = PackagingProfile;
            }

            editedRowdata = packagingProfileData_1[EditRowIdPackagingProfile];

            htmlTag = `
        
                <thead>
                    <tr>
                        <th colspan="2">
                            <b>Product : </b>
                            <span>`+ editedRowdata.Product + `</span>
                        </th>
                        <th style="width:25%">
                            <b>SKU : </b>
                            <span>`+ editedRowdata.SKU + `</span>
                        </th>
                        <th>
                            <span>
                                <div class="justify-center_1">
                                    <a class="btn-icon -edit "><i onclick="onEditPackagingProfile(`+ EditRowIdPackagingProfile + `)" class="fas fa-edit" title="Edit"></i></a>
                                    <a class="btn-icon -delete"><i onclick="onDeletePackagingProfile(`+ EditRowIdPackagingProfile + `,'#PP_Table_` + EditRowIdPackagingProfile + `',0)" class="fas fa-trash" data-bs-toggle="modal" title="Delete"></i></a>
                                     ${editedRowdata.PackagingProfileImage !== '' && editedRowdata.PackagingProfileImage !== null ? `
                                     <a class="btn-icon -info imagesinfo" title="Images info" onclick="ShowImages(`+ EditRowIdPackagingProfile + `)" id="` + EditRowIdPackagingProfile + `"><img src='../images/multiimages.png'/></a>` : ''}
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
                            <span class="remarkss"><b>Desired Packaging Characterstics</b></span>
                            <span>`+ editedRowdata.DesiredPackagingCharacters + `</span>
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
                var editedTableClass = EditRowIdPackagingProfile
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
                    debugger
                    var imagedata = {}
                    imagedata = {
                        TableClass: editedTableClass,
                        Image: PackageImageFileName[i],
                    }
                    imageGrid.push(imagedata);
                });

            }

            //var viewContainer = $(`#PP_Table_${EditRowIdPackagingProfile}`).find(".image_table .image_view");
            //viewContainer.empty(); // Remove the existing img tag

            //var viewButton = $("<img>"); // Create a new img tag
            //viewButton.attr("src", ROOT + 'NPDImages/' + editedRowdata.PackagingProfileImage);

            //viewContainer.append(viewButton);
            EditRowIdPackagingProfile = -1;

        }




        //$(".PackagingProfileEmpty").val("");
        //$(".PackagingProfileEmptyImage").text("");
        //$(".Toremove").val("");

        //$('#PackagingProfileSKU').val('').multiselect('refresh');
        //$("#PackagingProfileSKU").empty();
        //$("#PackagingProfileSKU").multiselect('rebuild');


        CKEDITOR.instances["PackagingProfilePrimaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileSecondaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileTertiaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileBenchMarkProduct"].setData('');
        CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].setData('');
        CKEDITOR.instances["PackagingProfileOthers"].setData('');
        $(".PackagingProfile").val("");
        $(".Toremove").val("");
        $("#Display_PackageImagesUpload").text("");
        ImageFileName = "";
        $('#PackagingProfileSKU').val('').multiselect('refresh');
        $("#PackagingProfileSKU").empty();
        $("#PackagingProfileSKU").multiselect('rebuild');




    }
});

//On editing the row data  
var editedRowdata = "";
var isEdited = 0;
function onEditPackagingProfile(RowId) {
    debugger
    $("#PackagingProfileSKU").empty();
    $("#PackagingProfileSKU").multiselect('rebuild');
    EditRowIdPackagingProfile = RowId;
    isEdited = 1;
    $(".Error_PackagingProfile").hide();

    //var DataFromTheRow = jQuery('#Packaging_Profile').jqGrid('getRowData', RowId);
    var DataFromTheRow = packagingProfileData_1[RowId];
    var productList = packagingProfileData_1.map(m => m.Product);


    var productPositioningData = $("#prd_desc").jqGrid("getGridParam", "data");
    var skuArray = [];
    var selectedSkuArray = DataFromTheRow.SKU.split(',').map(item => item.trim());

    $.each(productPositioningData, function (i, data) {
        debugger
        if ($.trim(data.ExistingBrandName) == DataFromTheRow.Product) {
            debugger
            skuArray = data.SKU.split(',').map(item => item.trim());
        }
    });

    var skuOption = "";

    skuArray.forEach(function (item, index) {
        debugger
        if (selectedSkuArray.includes(item)) {

            skuOption += `<option class="SkuOption" selected value="` + item + `" >` + item + `</option>`
        }
        else {

            skuOption += `<option class="SkuOption" value="` + item + `" >` + item + `</option>`
        }
    });

    $("option").remove("#PackagingProfileSKU .SkuOption");
    $('#PackagingProfileSKU').append(skuOption).multiselect('rebuild');

    $("#PackagingProfileProduct").val(DataFromTheRow.Product);
    ////$("#PackagingProfileSKU").val(DataFromTheRow.SKU);
    //$("#PackagingProfilePrimaryPackaging").val(DataFromTheRow.PrimaryPackaging);
    //$("#PackagingProfileSecondaryPackaging").val(DataFromTheRow.SecondaryPackaging);
    //$("#PackagingProfileTertiaryPackaging").val(DataFromTheRow.TertiaryPackaging);
    //$("#PackagingProfileBenchMarkProduct").val(DataFromTheRow.BenchmarkProducts);
    //$("#PackagingProfileDesiredPackagingCharacters").val(DataFromTheRow.DesiredPackagingCharacters);
    //$("#PackagingProfileOthers").val(DataFromTheRow.Others);

    CKEDITOR.instances["PackagingProfilePrimaryPackaging"].setData(DataFromTheRow.PrimaryPackaging),
        CKEDITOR.instances["PackagingProfileSecondaryPackaging"].setData(DataFromTheRow.SecondaryPackaging),
        CKEDITOR.instances["PackagingProfileTertiaryPackaging"].setData(DataFromTheRow.TertiaryPackaging),
        CKEDITOR.instances["PackagingProfileBenchMarkProduct"].setData(DataFromTheRow.BenchmarkProducts),//DesiredPackagingCharacters
        CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].setData(DataFromTheRow.DesiredPackagingCharacters),
        CKEDITOR.instances["PackagingProfileOthers"].setData(DataFromTheRow.Others),
        $("#PackagingProfileMould").val(DataFromTheRow.Mould);
    $("#Display_PackageImagesUpload").text(DataFromTheRow.PackagingProfileImage);
    editedRowdata = packagingProfileData_1;
    $('.Err-PackagingProfileSKU').hide();
    $('.Err-PackagingProfileProduct').hide();
    $('#image_upload').val('');

}
//On deleting the Packaging Profile row data
function onDeletePackagingProfile(deleteRowId = -1, tableId, flag = 0) {
    debugger
    var DataFromTheRow = packagingProfileData_1[deleteRowId];
    var FileName = DataFromTheRow.PackagingProfileImage;
    var path = "";
    //FileName = null ? "" : FileName

    if (flag == 1) {
        if (FileName != "" && FileName != null) {

            $.ajax({
                type: 'POST',
                url: ROOT + "NewInitiation/DeleteImageFile",
                data: { fileName: FileName },
                success: function (data) {
                    path = data;
                }
            });
        }

        delete packagingProfileData_1[deleteRowId];
        $(tableId).remove();

        $('.PackagingProfile').val("");                            // To reset the text box fields
        $("#Display_PackageImagesUpload").empty();
        $("option").remove("#PackagingProfileSKU .SkuOption");
        $('#PackagingProfileSKU').multiselect('rebuild');
        CKEDITOR.instances["PackagingProfilePrimaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileSecondaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileTertiaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileBenchMarkProduct"].setData('');
        CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].setData('');
        CKEDITOR.instances["PackagingProfileOthers"].setData('');

        EditRowId3 = -1;
        EditRowIdPackagingProfile = -1;
    }
    else {
        debugger

        confirm("Are you sure you want to delete?", function () {
            debugger
            if (FileName != "" && FileName != null) {

                $.ajax({
                    type: 'POST',
                    url: ROOT + "NewInitiation/DeleteImageFile",
                    data: { fileName: FileName },
                    success: function (data) {
                        path = data;
                    }
                });
            }

            delete packagingProfileData_1[deleteRowId];
            $(tableId).remove();

            $('.PackagingProfile').val("");                            // To reset the text box fields
            $("#Display_PackageImagesUpload").empty();
            $("option").remove("#PackagingProfileSKU .SkuOption");
            $('#PackagingProfileSKU').multiselect('rebuild');
            CKEDITOR.instances["PackagingProfilePrimaryPackaging"].setData('');
            CKEDITOR.instances["PackagingProfileSecondaryPackaging"].setData('');
            CKEDITOR.instances["PackagingProfileTertiaryPackaging"].setData('');
            CKEDITOR.instances["PackagingProfileBenchMarkProduct"].setData('');
            CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].setData('');
            CKEDITOR.instances["PackagingProfileOthers"].setData('');

            EditRowId3 = -1;
            EditRowIdPackagingProfile = -1;
        });
    }
}

function DownloadPackageImage(rowId) {
    debugger
    var filename = packagingProfileData_1[rowId].PackagingProfileImage;

    if (filename.length > 0) {
        $('#' + rowId + 'DownloadPackageImage').prop("href", ROOT + "NewInitiation/DownloadImageFile?fileName=" + filename);
        return true;
    }
    else {
        $('#' + rowId + 'DownloadPackageImage').empty().text('No Image Present');

    }
}

function validatesubmitformToManager() {
    
    var flag = true;
    $('#ConformReformulation_Manager').prop("disabled", false);

    /* SKU = CKEDITOR.instances["editornf"].getData();*/
    //SKU = $('#SKUDetails').val();
    productdescription == "" ? ($("#err-prd_desc").show(), flag = false) : $("#err-prd_desc").hide();
    reformulationBusinessInformation == "" ? ($("#err-business_info").show(), flag = false) : $("#err-business_info").hide();
    // SKU == "" ? ($('#Err-ProductDescription-sku').show(), flag = false, isvalid = false) : ($('#Err-ProductDescription-sku').hide(), isvalid = true), $(window).scrollTop($('.product_packag').position().top);


    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationBusinessInformation = $('#business_info').jqGrid('getGridParam', 'data');
    //var reformulationPackagingProfileGrid = $('#expected').jqGrid('getGridParam', 'data');
    var reformulationPackagingProfileGrid = packagingProfileData_1.filter(row => row.length !== 0);
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var projectdetailsimage = ProjectDetailsImageFile();
    //projectdetailsimage = "" ?: projectdetailsimage
    var ProjectName = $('#ProjectName').val();
    var projectheaders = []
    $("table#Reformulation_Table tbody tr").each(function (i) {
        
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Hub: $(this).find('#Reformulation_Hub').text(),
            Category: $(this).find('#Category option:selected').val(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text(),
            status: 9,
        });
    });
    var projectdetails = [];
    var additionalreformulation = [];
    projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show(), $(window).scrollTop($('#Reformulation_Table').position().top)) : $('#Error_Reformulation_Division').hide();
    projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show(), $(window).scrollTop($('#Reformulation_Table').position().top)) : $('#Error_Reformulation_Division').hide();

    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val(),
        Others: $("#AdditionalRequirmentsOthers").val(),

    };
    var initiatorremarks = $("#editor").val();


    $("#ProjectDetailsBusinessRational").val() == "" ? ($('#Err-ProjectDetails-BusinessRational').show(), flag = false) : $('#Err-ProjectDetails-BusinessRational').hide();
    productdescription.length === 0 ? ($('#Err-ProductDescription').show(), flag = false) : $('#Err-ProductDescription').hide();
    reformulationBusinessInformation.length === 0 ? ($('#err-business_info').show(), flag = false) : $('#err-business_info').hide();
    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if ($("input[type=radio][name=survey]:checked").val() == "yes") {
        reformulationPackagingProfileGrid.length === 0 ? ($("#err-expected").show(), flag = false) : $("#err-expected").hide();
    }
    $('#ProjectName').val() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();
    //$('#ReformulationSubmit').validate();

    //if ($('#ReformulationSubmit').valid()) { }
    //else {
    //    flag = false;
    //}



    if (flag) {
        $('div#SubmitModal1').modal('show');
        $("#ConformReformulation_Manager").click(function () {
            //
            $("#ProjectHeaders").val(JSON.stringify(projectheaders));
            $("#reformulationProductDescription").val(JSON.stringify(productdescription));
            $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
            $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
            $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
            $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
            $("#InitiatorRemarks").val(initiatorremarks);
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));

            var benchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
            $('#BenchMarkImagesData').val(JSON.stringify(benchMarkImages));

            $("#SaveOrSubmit").val(9);

            if (isSubmitted) {
                isSubmitted = false;
                $('#ReformulationSubmit').submit();
            }
            $('#ConformReformulation_Manager').prop("disabled", true);
        });
    }
}

var formData = new FormData();
function validateFileUpload() {
    var flag = true;
    var supportedExtention = ['jpg', 'jpeg', 'png', 'gif', 'jfif', 'tiff', 'bmp', 'svg'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#image_upload`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_InvalidPackagingImage').show();
            setTimeout(function () {
                $('#Err_InvalidPackagingImage').hide();
            }, 5000);

            $(`#image_upload`).val('');

            flag = false;

            return false;
        }
    });

    if (flag) {

        for (var i = 0; i < $(`#image_upload`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#image_upload`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#image_upload').val('');
                $('#deleteSelectedFile').hide();
                $(`#image_upload`).get(0).val('');


                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#image_upload`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#image_upload`).get(0).files[i].name.toString().split('\\').pop();

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
            formatter: function (cellvalue, options, rowobject) {
                var imageName = encodeURIComponent(rowobject.Image);
                return '<div class="text-center icon_section align-items-left">' +
                    '<span class="action-link"><a class="btn-icon -download DownloadImage" title="Download Image" onclick=DownloadUploadedImage("' + imageName + '") id="DownloadImage"><i class="fas fa-download" aria-hidden="true"></i></a></span>' +
                    '<span class="action-link"><a class="btn-icon -view ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye"></i></a></span>' +
                    '<span class="action-link"><a class="btn-icon -delete DeletePopUpImage" title="Delete Image" onclick=OnRemoveImage("' + imageName + '","' + rowobject.TableClass + '")><i class="fas fa-trash"></i></a></span>' +
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

function ShowImages(obj) {
    debugger
    var imageGridData = [];
    var tableClass = obj;
    $.each(imageGrid, function (i, obj) {
        if (tableClass == imageGrid[i].TableClass) {
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
            .attr('href', ROOT + "NewInitiation/DownloadImageFile?fileName=" + decodeURIComponent(filename))
            .attr('target', '_blank')
            .attr('download', filename)
            .appendTo('body');

        downloadLink[0].click();
        downloadLink.remove();
        return true;
    }
}

function ViewUploadedImage(filename) {
    debugger
    if (filename.length > 0) {
        var imageUrl = ROOT + 'NPDImages/' + decodeURIComponent(filename);
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
        $('#Display_PackageImagesUpload').text("");

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
        packagingProfileData_1[imageClass].PackagingProfileImage = InsertImage

        if (imageGridData.length == 0) {
            table = "PP_Table_" + tableclass;
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

CKEDITOR.instances.PackagingProfilePrimaryPackaging.on('change', function () {
    $('.Err-PackagingProfilePrimaryPackaging').hide();
});

$("#PackagingProfileSKU").change(function () {
    $(".Err-PackagingProfileSKU").hide();
});

































function fileValidation() {

    debugger
    var flag = true;
    var supportedExtention = ['pdf', 'doc','docx','xls', 'xlsx', 'ppt', 'pptx','csv'];
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
    //if (supportingDocuments != '') {
    //    if (!allowedExtensions.exec(supportingDocuments)) {
    //        $('#Err_SupportingDocuments').show();
    //        $('#Supportingdocuments').val('');
    //        return false;
    //    }
    //    else {
    //        $('#Err_SupportingDocuments').hide();
    //    }
    //}
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
            return '<div class="text-left icon_section align-items-left">' +
                '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download" title="Download"></i></a></span>' +
                (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye" title="View"></i></a></span>') +
                '<span class="action-link"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete" title="Delete"><i class="fas fa-trash" title="Delete"></i></a></span>' +
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

$("#Add_SupportingDocuments").on("click", function () {
    debugger
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

        }
        else {

            $.each(docData, function (key, value) {
                $("#Grid_Supporting_Document").jqGrid('setCell', editDocId, key, value);
                $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);

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
    debugger
    var modifiedfileName = "";
    var formData = new FormData();

    if (fileName != "") {
        debugger
        formData.append("file", fileName[0]);
        $.ajax({
            type: 'POST',
            url: ROOT + "NewInitiation/SaveImageFile",
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

        $('.Report').prop("href", ROOT + "NewInitiation/DownloadImageFile?fileName=" + filename);
        return true;
    }
}

function OnDeleteUploadedDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    confirm("Are you sure you want to delete?", function () {
        if (filename.length > 0) {

            $.ajax({
                type: 'POST',
                url: ROOT + "NewInitiation/DeleteImageFile",
                data: { fileName: filename },
                success: function (data) {
                    path = data;
                }
            });

            $("#Grid_Supporting_Document").jqGrid('delRowData', rowId);
            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
            var data2 = {}
            data2 = {
                DocumentName: filename
            }
            deleteImageIn_DocGrid.push(data2);
        }
    });
}

var editDocId = 0;
//'<a onclick=OnEditUploadedDoc(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit"></i></a >' +

function OnEditUploadedDoc(rowId) {
    debugger
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    $("#GetDocName").text(filename);
    editDocId = rowId;
}

$("#Supportingdocuments").on("change", function () {
    $("#GetDocName").empty();
});

function ViewUploadedDoc(rowId) {
    debugger
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {
        var imageUrl = ROOT + 'NPDImages/' + filename;
        window.open(imageUrl, '_blank');
    }
}

$(".ViewData").on("click", function () {
    $("#Document_show_popup").modal('show');
});

colmodels = [
    {
        name: '',
        label: 'Action',
        width: 30,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            var imageName = encodeURIComponent(rowobject.Image);
            return '<div class="text-center icon_section align-items-left">' +
                '<span class="action-link"><a class="btn-icon -download DownloadImage" title="Download Image" onclick=DownloadUploadedImage("' + imageName + '") id="DownloadImage"><i class="fas fa-download" aria-hidden="true"></i></a></span>' +
                '<span class="action-link"><a class="btn-icon -view ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye"></i></a></span>' +
                '<span class="action-link"><a class="btn-icon -delete hideBenchmark" title="Delete Image" onclick=DeleteBenchmarkImage("' + options.rowId + '")><i class="fas fa-trash"></i></a></span>' +
                '</div>';
        }
    },
    {
        name: 'Image',
        label: 'Image Name',
        width: 150,
        ignoreCase: true,
        resizable: true,
    }
    //{
    //    name: 'UploadedBy',
    //    label: 'Uploaded by',
    //    width: 60,
    //    ignoreCase: true,
    //    resizable: true,
    //}
],
    $('#Grid_BenchMarkImage').jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Grid_BenchMarkImage',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_BenchMarkImage tbody tr");
            var objHeader = $("#Grid_BenchMarkImage tbody tr td");

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


$("#Add_BenchMarkImages").on("click", function () {
    debugger
    var flag = true;
    var files = $('#ProjectDetailsBenchMarkSampleImage').prop("files");

    if (files.length == 0) {
        $(".ShowmsgWhenAdd").show();
        setTimeout(function () {
            $('.ShowmsgWhenAdd').hide();
        }, 5000)
        flag = false;
    }
    if (flag) {

        var modifiedSupportingDocumentsName = SaveBenchMarkImageFile();
        var griddata = [];
        var modifiedSupportingDocumentsName1 = "";
        $.each(modifiedSupportingDocumentsName, function (k, obj) {
            if (k + 1 == modifiedSupportingDocumentsName.length) {
                modifiedSupportingDocumentsName1 += obj;
            }
            else if (k == 0) {
                modifiedSupportingDocumentsName1 = obj + ',';
            }
            else {
                modifiedSupportingDocumentsName1 += obj + ',';
            }
        });
        modifiedSupportingDocumentsName1 = modifiedSupportingDocumentsName1.split(',');
        $.each(modifiedSupportingDocumentsName1, function (i, j) {
            
            var docData = {};
            docData = {
                Image: j,
                UploadedBy: $('#UserName').val()
            }
            griddata.push(docData);
        });
        if (editDocId == 0) {
            var doc1 = $("#Grid_BenchMarkImage").jqGrid('getGridParam', 'data');
            var doc2 = $.merge(doc1, griddata);
            $("#Grid_BenchMarkImage").jqGrid('setGridParam', { data: doc2 });
            $("#Grid_BenchMarkImage").trigger('reloadGrid', [{ page: 1 }]);

        }
        else {

            $.each(docData, function (key, value) {
                $("#Grid_BenchMarkImage").jqGrid('setCell', editDocId, key, value);
                $("#Grid_BenchMarkImage").trigger('reloadGrid', [{ page: 1 }]);

            });

            editDocId = 0;
        }
        $("#ProjectDetailsBenchMarkSampleImage").val('');
    }
});

function SaveBenchMarkImageFile() {

    var fileName = [];
    var files = $('#ProjectDetailsBenchMarkSampleImage').prop("files");

    for (var i = 0; i < files.length; i++) {
        var formData = new FormData();
        formData.append("file", files[i]);
       
        $.ajax({
            type: 'POST',
            url: ROOT + "NewInitiation/SaveImageFile",
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

function DeleteBenchmarkImage(rowId) {
    var filename = $('#Grid_BenchMarkImage').jqGrid('getCell', rowId, 'Image');
    confirm("Are you sure you want to delete?", function () {
            if (filename.length > 0) {
                $.ajax({
                    type: 'POST',
                    url: ROOT + "NewInitiation/DeleteImageFile",
                    data: { fileName: filename },
                    success: function (data) {
                        path = data;
                    }
                });

                $("#Grid_BenchMarkImage").jqGrid('delRowData', rowId);
                $("#Grid_BenchMarkImage").trigger('reloadGrid', [{ page: 1 }]);

                var data1 = {}
                data1 = {
                    Image: filename
                }
                deleteImageIn_BenchMark.push(data1);
            }
    });

}
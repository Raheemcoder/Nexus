var addedData = {};
var savedFieldRemarks = [];
var deletedRemarksData = [];
var packagingProfileData_1 = [];
var fineScreeningData = [];
var deleteImageIn_imageGrid = [];
var IsPreview = 0;
$(document).ready(function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    $('.data-datepicker-monthyear').datepicker({
        format: 'M/yyyy',
        viewMode: 'months',
        minViewMode: 'months',
        todayHighlight: true,
        autoclose: true,
        startDate: '+30'

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

$(".example-dropUp").multiselect({
    enableFiltering: true,
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 500,
    buttonWidth: '100%',
    dropUp: true
});

$(".multiselectDropdown1").multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 500,
    buttonWidth: '100%',
    dropUp: true
});

var hub = $('#Hubs').val() === '' || $('#Hubs').val() === null || typeof ($('#Hubs').val()) === "undefined" ? [] : $('#Hubs').val().split(",");
$('#HgmlData_HubDropdown').val(hub).multiselect('refresh');


CKEDITOR.replace('editorsk1', {
    height: 150,
    classes: "trim",
    class: "trim",
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

CKEDITOR.replace('ExpectedPack_PrimaryPackaging', {
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
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_SecondaryPackaging', {
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
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_TertiaryPackaging', {
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
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_BenchmarkProduct', {
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
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_DesiredPack', {
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
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('ExpectedPack_Other', {
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
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
var productDescriptionProductNameList = [];
var packagingProfileProductNameList = [];
var businessInformationProductNameList = [];
var hgmlDataProductNameList = [];
var pmdDataProductNameList = [];
var targetCostProductNameList = [];
var SustainabilityProductNameList = [];
var GetData = $.parseJSON($('#JsonData').val());
$(document).ready(function () {
    if (GetData['PackageExpectedData'].length > 0) {
        $.each(GetData['PackageExpectedData'], function (i, obj) {
            var tablecountclass = 0;
            tablecountclass = packagingProfileData_1.length + 1
            packagingProfileData_1[tablecountclass] = obj;
        });
    }
});

$('#BI_TotalBusinessValue_Y1').val(GetData.PackageBusinessInfo.length > 0 ? GetData.PackageBusinessInfo[0].TotalBusinessValue_Y1 : "");
$('#BI_TotalBusinessValue_Y2').val(GetData.PackageBusinessInfo.length > 0 ? GetData.PackageBusinessInfo[0].TotalBusinessValue_Y2 : "");
$('#BI_TotalBusinessValue_Y3').val(GetData.PackageBusinessInfo.length > 0 ? GetData.PackageBusinessInfo[0].TotalBusinessValue_Y3 : "");

$('#ProductDescription_ProjectName').val(GetData.ProjectDetails[0].ProjectName);
$(".PI_ProjectName_V").html(GetData.ProjectDetails[0].ProjectName)
$(".PI_BusinessRational_V").html(GetData.ProjectDetails[0].ProjectName)

$('.BusinessRationalData').val(GetData.ProjectDetails[0].BusinessRational);
$('#Pack_InitiatorRemarks').html(GetData.ProjectDetails[0].PackageInitiatorRemarks);
$('.PackageInitiative_hub').html(GetData.PackageHeader[0].Hub);
if (GetData.PackageHeader[0].Division != '0') {
    $('#Division').val(GetData.PackageHeader[0].Division);
}
$('#PackageInitiative_InitiatedBy').html(GetData.PackageHeader[0].CreatedBy);
$('#PackageInitiative_InitatedOn').html(GetData.PackageHeader[0].CreatedDate);
$("#InitiatorRemarks").html(GetData.ProjectDetails[0].PackageInitiatorRemarks);
var statusname = GetData.PackageHeader[0].SID;

$('#PackageInitiative_Status').html(GetData.PackageHeader[0].StatusName);


$('.PackProductDescriptionHGMLReamrks').html(GetData.PackageProductDescriptionHGML[0] === undefined ? "" : GetData.PackageProductDescriptionHGML[0].ProductDescription)

$('.PackPackageProfileHGMLRemarks').html(GetData.PackageProjectDetailsHGML[0] === undefined ? "" : GetData.PackageProjectDetailsHGML[0].PackProjectDetails)

$('.PackBusinessInformationHGMLRemarks').html(GetData.PackageBusinessHGML[0] === undefined ? "" : GetData.PackageBusinessHGML[0].BusinessInformation)

$('.PackExpectedPackHGMLRemarks').html(GetData.PackExpectedHGML[0] === undefined ? "" : GetData.PackExpectedHGML[0].PackagingProfile)

$('.PackSustainabilityHGMLRemarks').html(GetData.PackSustainabilityHGML[0] === undefined ? "" : GetData.PackSustainabilityHGML[0].PackSustainability)

$('.PackHGMLtoHubRemarks').html(GetData.PackageHGMLData[0] === undefined ? "" : GetData.PackageHGMLData[0].HgmlToHubRemarks)



//-------------------------------------

$('.PackProductDescription_HUBReamrks').html(GetData.PackageProductDescriptionHUB[0] === undefined ? "" : GetData.PackageProductDescriptionHUB[0].ProductDescription)

$('.PackPackageProfile_HUBRemarks').html(GetData.PackageProjectDetailsHUB[0] === undefined ? "" : GetData.PackageProjectDetailsHUB[0].PackProjectDetails)

$('.PackBusinessInformation_HUBRemarks').html(GetData.PackageBusinessHUB[0] === undefined ? "" : GetData.PackageBusinessHUB[0].BusinessInformation)

$('.PackExpectedPack_HUBRemarks').html(GetData.PackExpectedHUB[0] === undefined ? "" : GetData.PackExpectedHUB[0].PackagingProfile)

$('.PackHGML_HUBRemarks').html(GetData.PackageHGMLDataORHUBRemarks[0] === undefined ? "" : GetData.PackageHGMLDataORHUBRemarks[0].PackageHGMLDataHUBRemarks)

$('.PackSustainabilityHUBRemarks').html(GetData.PackageSustainabilityHUB[0] === undefined ? "" : GetData.PackageSustainabilityHUB[0].PackSustainability)
//--------------------------------

$("#PackageInitiative_Division").change(function () {
    $('#Error_Pack_Division').hide()
});


$("#PackageInitiative_Category").change(function () {
    $('#Error_pack_Category').hide()
});


$(document).ready(function () {

    if (GetData.PackageProductDesc.length != 0) {
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
                //
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#Sustain_Product").append(productOption);
        }

    }

});
var DivId = $("#Division").val();
var categoryId = $("#Category").val();

var link = "";

if ((statusname == "1" || statusname == "8" || statusname == "9" || statusname == "11") && $('#ViewStatus').val() != 'View') {

    link = ROOT + "ProjectBrief/GetCategory";
}
else {
    link = ROOT + "User/GetCategoryBYId";
}
$.ajax({
    type: "POST",
    url: link,
    data: { divisionId: DivId },
    dataType: "json",
    success: function (Categoryresult) {
        if (Categoryresult != null) {
            $("option").remove(".CategoryOption");
            var CategoryList = '';

            if ((statusname == "1" || statusname == "8" || statusname == "9" || statusname == "11") && $('#ViewStatus').val() != 'View') {

                $.each(Categoryresult, function (i, obj) {

                    if (obj.CategoryId == categoryId) {
                        CategoryList = '<option class="CategoryOption" selected value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                    }
                    else {
                        CategoryList = '<option class="CategoryOption" value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                    }
                    $(".addCategoryOption").append(CategoryList);
                });
            }
            else {
                $.each(Categoryresult, function (i, obj) {
                    if (obj.CategoryID == categoryId) {
                        CategoryList = '<option class="CategoryOption" selected value="' + obj.CategoryID + '">' + obj.CategoryName + '</option>';
                    }
                    else {
                        CategoryList = '<option class="CategoryOption" value="' + obj.CategoryID + '">' + obj.CategoryName + '</option>';
                    }
                    $(".addCategoryOption").append(CategoryList);
                })
            }
        }
    },
    error: function () {
        alert("Error occured!!");
    }
});
//----------------------------
$("#Division").change(function () {
    //
    var DivId = $("#Division").val().toString();
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

$("#HgmlData_HubDropdown").change(function (e) {

    var HubIds = $("#HgmlData_HubDropdown").val();
    var Hub = HubIds.toString();
    $.ajax({
        type: "POST",
        url: ROOT + "Base/GetUserEmailBasedOnHub",
        data: { hubIds: Hub },
        success: function (UserEmailResult) {

            if (UserEmailResult != null) {

                var userEmailList = '';
                $("option").remove(".HubUsersOption");
                $.each(UserEmailResult, function (i, obj) {
                    userEmailList += '<option id="HUbUsersoptions" class="HubUsersOption ' + obj.Hub + '" value="' + obj.HgmlDataHubUsersList + '">' + obj.Hub + ' - ' + obj.HgmlDataHubUsersList + '</option>';
                })
                $("#HgmlData_HubUsersDropdown").html(userEmailList);
                $('#HgmlData_HubUsersDropdown').multiselect('rebuild');

            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});

$("#HgmlData_HubUsersDropdown").change(function (e) {
    $('#Error_HgmlDataHubUsers1').hide();

    $('.HubUsersOption').find('input[type=checkbox]').prop("disabled", false);

    var selectList = $(this).find('option:selected');

    $.each(selectList, function (i, obj1) {
        $(".HubUsersOption").each(function (i, obj2) {
            if ($(this).attr("class").replace(' multiselect-filter-hidden', '') == obj1.className && $.trim($(this).val()) != $.trim(obj1.value)) {
                $(this).find('input[type=checkbox]').prop("disabled", true);
            }
        });
    });
});

// Populating the value for HUB Name in the HUB in Send Back HUB Popup field
var hubAndHubUserData;

$(document).ready(function () {
    var projectId = $('#ProjectId').val();

    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/GetHubNameAndHubUserEmailForHgmlApprove",
        data: { projectId: projectId },
        dataType: "json",
        success: function (userData) {

            hubAndHubUserData = userData;
            var hubNameList = "";
            if (hubAndHubUserData != null) {
                $("option").remove(".HubNameOption");

                hubNameList = '<option class="HubNameOption" selected value="">None Selected</option>'
                $.each(hubAndHubUserData.hgmlApproveHubNameList, function (i, obj) {

                    hubNameList += '<option class="HubNameOption" value="' + obj.hubName + '">' + obj.hubName + '</option>'
                })

                $("#HgmlApprove_HubName_Dropdown").html(hubNameList);
                $('#HgmlApprove_HubName_Dropdown').multiselect('rebuild');
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});
// On change of HUB field in Send back HUB Popup, Populating the HUB user

$('#HgmlApprove_HubName_Dropdown').change(function () {
    ////
    var hubName = $("#HgmlApprove_HubName_Dropdown").val();

    if (hubAndHubUserData != null) {

        $("option").remove(".HubUserOption");
        hubUserList = '<option class="HubUserOption" selected value="">None Selected</option>'
        $.each(hubAndHubUserData.hgmlApproveHubUserList, function (i, obj) {
            ////
            if (obj.hubName == hubName) {
                hubUserList += '<option class="HubUserOption" value="' + obj.hubUser + '">' + obj.hubUser + '</option>'
            }
        })
        $("#HgmlApprove_HubUser_Dropdown").html(hubUserList);
        $('#HgmlApprove_HubUser_Dropdown').multiselect('rebuild');
    }
})

//On Click of Approval Remark icon

function onClickOfApprovalRemarks() {
    //
    $('div#ApprovalRemarks_Popup').modal('show');

    $("#Approval_Remarks_Popup").jqGrid("clearGridData");

    $("#Approval_Remarks_Popup").jqGrid('setGridParam', { data: GetData["ApprovalStatusData"].length == 0 ? [] : GetData["ApprovalStatusData"] });

    $("#Approval_Remarks_Popup").trigger('reloadGrid', [{ page: 1 }]);

}


// Approval status remarks
colmodels = [

    {
        name: 'FromStageName',
        label: 'From Stage',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'FromStage',
        label: 'FromStageId',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'ToStageName',
        label: 'To Stage',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ToStage',
        label: 'ToStageId',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RemarksBy',
        label: 'Remarks By',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Date',
        label: 'Submitted Date',
        resizable: true,
        ignoreCase: true,
    },

],
    $("#Approval_Remarks_Popup").jqGrid({
        height: 'auto',
        rowNum: 100,
        mtype: 'GET',
        url: '',
        datatype: 'local',
        data: [],
        loadonce: true,
        colModel: colmodels,
        pager: "#pager_approval_remarks_popup",
        viewrecords: true,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Approval_Remarks_Popup tbody tr");
            var objHeader = $("#Approval_Remarks_Popup tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$("#Approval_Remarks_Popup").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
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
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
        if ($TableHeight > 90) {
            $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $(".tableremarks").find(".ui-jqgrid-hbox").css("padding-right", "17px");
        }
        else {
            $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $(".tableremarks").find(".ui-jqgrid-hbox").css("padding-right", "0px")
        }
    }, 200)
})


//ProductDescription grid or table

var EditProductDescriptionRow = 0;

colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 40,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center  action_icons icon_section action_icons align-items-left">' +
                '<a onclick=OnEditProductDesc(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen pr-2 color-info" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=OnDeleteProductDesc(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';
        }
    },
    {
        name: 'ProductName',
        label: 'Product Name',
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

    $("#product_description").jqGrid({
        url: '',
        datatype: 'local',
        data: GetData['PackageProductDesc'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected_product_description',
        rowNum: 20,
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
            if (statusname == "2" || statusname == "3" || statusname == "4" || statusname == "5" || statusname == "16" || statusname == "6" || statusname == "7" || statusname == "12" || statusname == "8" && $('#ViewStatus').val() == 'View' || statusname == "9" && $('#ViewStatus').val() == 'View' || statusname == "11" && $('#ViewStatus').val() == 'View' || statusname == "13" || statusname == "14") {
                jQuery("#product_description").jqGrid('hideCol', "Action");
            }
        }

    });
$("#product_description_PV").jqGrid({
    url: '',
    datatype: 'local',
    data: GetData['PackageProductDesc'],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#product_pager_V',
    rowNum: 20,
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

$("#ProductDescription_SKU").on('keypress change', function () {
    $("#ErrorIn_SKU").prop("hidden", true);
});


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
            ProductName: $.trim($("#ProductDescription_Product").val()),
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

});
function OnEditProductDesc(RowData) {
    $("#Error_PP_Product").text("");
    $(".ToClearData").val("");
    var DataFromTheRow1 = jQuery('#product_description').jqGrid('getRowData', RowData);
    $('#ProductDescription_Product').val(DataFromTheRow1.ProductName);
    $('#ProductDescription_NewBrandName').val(DataFromTheRow1.NewBrandName);
    $('#ProductDescription_SKU').val(DataFromTheRow1.SKU);
    EditProductDescriptionRow = RowData;
    $(".remove").prop("hidden", true);
}

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

        //$("#product_description_PV").jqGrid('delRowData', RowData);
        //$("#product_description_PV").trigger('reloadGrid', [{ page: 1 }]);

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
    });
}
$('.data-datepicker').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'dd-mm-yyyy',
    startDate: '+0d'
});

var EditBusinessInfoRow = 0;
var isEditBI = false;
var BIEditedSKU = "";

colmodels =
    [
        {
            name: 'Action',
            label: 'Action',
            width: 90,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return '<div class="text-center icon_section action_icons align-items-left">' +
                    '<a onclick=OnEditBusinessInfo(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen pr-2 color-info" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                    '<a onclick=OnDeleteBusinessInfo(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                    '</div> ';
            }
        },
        {
            name: 'Product',
            label: 'Product',
            width: 150,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'SKU',
            label: 'SKU',
            width: 120,
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
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'M1Quantity',
            label: 'M1 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'M2Quantity',
            label: 'M2 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'M3Quantity',
            label: 'M3 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'M4Quantity',
            label: 'M4 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'M5Quantity',
            label: 'M5 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'M6Quantity',
            label: 'M6 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Y1Quantity',
            label: 'Y1 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Y2Quantity',
            label: 'Y2 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Y3Quantity',
            label: 'Y3 Quantity',
            width: 130,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'UOM',
            label: 'UOM',
            width: 120,
            resizable: true,
            ignoreCase: true,
        },
    ],
    $("#business_info").jqGrid({
        url: '',
        datatype: 'local',
        data: GetData['PackageBusinessInfo'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_business_info',
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
            if (statusname == "2" || statusname == "3" || statusname == "4" || statusname == "5" || statusname == "16" || statusname == "6" || statusname == "7" || statusname == "12" || statusname == "8" && $('#ViewStatus').val() == 'View' || statusname == "9" && $('#ViewStatus').val() == 'View' || statusname == "11" && $('#ViewStatus').val() == 'View' || statusname == "13" || statusname == "14") {
                jQuery("#business_info").jqGrid('hideCol', "Action");
            }
        }
    });

$("#businessInfoGrid_PV").jqGrid({
    url: '',
    datatype: 'local',
    data: GetData['PackageBusinessInfo'],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_businessInfoGrid_PV',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#businessInfoGrid_PV tbody tr");
        var objHeader = $("#businessInfoGrid_PV tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        if (statusname == "2" || statusname == "3" || statusname == "4" || statusname == "5" || statusname == "16" || statusname == "6" || statusname == "7" || statusname == "12" || statusname == "8" && $('#ViewStatus').val() == 'View' || statusname == "9" && $('#ViewStatus').val() == 'View' || statusname == "11" && $('#ViewStatus').val() == 'View' || statusname == "13" || statusname == "14") {
            jQuery("#business_info").jqGrid('hideCol', "Action");
        }
        jQuery("#businessInfoGrid_PV").jqGrid('hideCol', "Action");

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

//To get the HUB BusinessInformation data--------------------
var statusname = GetData.PackageHeader[0].SID;
if (statusname == "3") {
    if ($('#JsonFormPackHUbBusinessData').val() != '') {
        var JsonFormPackHUbData = $.parseJSON($('#JsonFormPackHUbBusinessData').val());
        $('#HgmlData_HUBParticipatingMarkets').val(JsonFormPackHUbData.HgmlDataHUBParticipatingMarket[0] === undefined ? "" : JsonFormPackHUbData.HgmlDataHUBParticipatingMarket[0].HgmlDataHUBParticipatingMarkets)
        $("#HUBbusinessInfo").jqGrid({
            url: '',
            datatype: 'local',
            data: JsonFormPackHUbData["PackageBusinessInfo"] != undefined ? JsonFormPackHUbData["PackageBusinessInfo"] : [],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_HUB_businessinfo',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#HUBbusinessInfo tbody tr");
                var objHeader = $("#HUBbusinessInfo tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }

        });
        $("#HUBbusinessInfo_PV").jqGrid({
            url: '',
            datatype: 'local',
            data: JsonFormPackHUbData["PackageBusinessInfo"] != undefined ? JsonFormPackHUbData["PackageBusinessInfo"] : [],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_HUB_businessinfo_PV',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#HUBbusinessInfo_PV tbody tr");
                var objHeader = $("#HUBbusinessInfo_PV tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
                jQuery("#HUBbusinessInfo_PV").jqGrid('hideCol', "Action");

            }
        });
    }
    else {
        $("#HUBbusinessInfo").jqGrid({
            url: '',
            datatype: 'local',
            data: [],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_HUB_businessinfo',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#HUBbusinessInfo tbody tr");
                var objHeader = $("#HUBbusinessInfo tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
        $("#HUBbusinessInfo_PV").jqGrid({
            url: '',
            datatype: 'local',
            data: [],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_HUB_businessinfo_PV',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#HUBbusinessInfo_PV tbody tr");
                var objHeader = $("#HUBbusinessInfo_PV tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
                jQuery("#HUBbusinessInfo_PV").jqGrid('hideCol', "Action");

            }
        });

    }
    var GetData = $.parseJSON($('#JsonData').val());
    var businessinfoinitiator = GetData["PackageBusinessInfo"];
    var BusinessInformationSpanTag = "";
    if ($('#ViewStatus').val() != 'View') {
        BusinessInformationSpanTag += '<span class="hub_view" id="' + GetData.PackageHeader[0].Hub + '" data-bs-toggle="modal" data-bs-target="#HUBReviewBusinessInfoData" onclick="BusinessInformatoninitiatorData()" > ' + GetData.PackageHeader[0].Hub + ' Business Information</span >';

        $('.GetHubName').text("" + GetData.PackageHeader[0].Hub + " Business Information ");

        $("#PackBusinessInfoInitiatorRemarksLink").html(BusinessInformationSpanTag);
        $("#PackBusinessInfoInitiatorRemarksLink_PV").html(BusinessInformationSpanTag);

    }

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

}
function BusinessInformatoninitiatorData() {
    var GetData = $.parseJSON($('#JsonData').val());
    colmodels =
        [

            {
                name: 'Product',
                label: 'Product',
                width: 150,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'SKU',
                label: 'SKU',
                width: 120,
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
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'M1Quantity',
                label: 'M1 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'M2Quantity',
                label: 'M2 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'M3Quantity',
                label: 'M3 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'M4Quantity',
                label: 'M4 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'M5Quantity',
                label: 'M5 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'M6Quantity',
                label: 'M6 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'Y1Quantity',
                label: 'Y1 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'Y2Quantity',
                label: 'Y2 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'Y3Quantity',
                label: 'Y3 Quantity',
                width: 130,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'UOM',
                label: 'UOM',
                width: 120,
                resizable: true,
                ignoreCase: true,
            },
        ],
        $("#business_info1").jqGrid({
            url: '',
            datatype: 'local',
            data: GetData["PackageBusinessInfo"] != undefined ? GetData["PackageBusinessInfo"] : [],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_business_info1',
            rowNum: 20,
            scroll: true,

            gridComplete: function () {
                var objRows = $("#business_info1 tbody tr");
                var objHeader = $("#business_info1 tbody tr td");

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
}
//Validations for BusinessInformation -----------------------------------------------
$("#BusinessInfo_BusinessValue").on("click", function () {

    if ($("#BusinessInfo_BusinessValue").val() == 'NaN') {
        $("#BusinessInfo_BusinessValue").val("");
    }
});

if ($("#BusinessInfo_BusinessValue").val() == 'NaN') {
    $("#BusinessInfo_BusinessValue").val("");
}

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

    EditBusinessInfoRow == 0 && $("#Error_BI_Product").text() != '' ? flag = false : "";

    if (Product == "") {
        flag = false;
        Product == "" ? $("#Error_BI_Product").show().text('Please select Product') : $("#Error_BI_Product").hide().text('');
    }

    if (SKU == "" || SKU < 0) {
        flag = false;
        $("#ErrorinBusinessInfo_SKU").prop("hidden", false);
    } //
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
    if (Y1Quantity == "" || isNaN(Y1Quantity) || Y1Quantity < ((+M1Quantity) + (+M2Quantity) + (+M3Quantity) + (+(isNaN(M4Quantity) ? "" : M4Quantity)) + (+(isNaN(M5Quantity) ? "" : M5Quantity)) + (+(isNaN(M6Quantity) ? "" : M6Quantity)))
        || Y1Quantity <= 0) {
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
    var BI = Y2Quantity * ProposedSellingPrice

    if (flag) {
        var griddata = [];
        var BusinessInformation = {};
        BusinessInformation = {
            Product: $("#BusinessInfo_Product").val(),
            SKU: $("#BusinessInfo_SKU").val(),
            ProposeLaunchDate: ProposeLaunchDate,
            ProposedSellingPrice: ProposedSellingPrice,
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
            BusinessValue: $("#BusinessInfo_BusinessValue").val()
        }

        if (statusname == "3") {
            if (EditBusinessInfoRow == 0) {

                griddata.push(BusinessInformation);
                var BusinessInfo1 = $("#HUBbusinessInfo").jqGrid('getGridParam', 'data');
                var BusinessInfo2 = $.merge(BusinessInfo1, griddata);
                $("#HUBbusinessInfo").jqGrid('setGridParam', { data: BusinessInfo2 });
                $("#HUBbusinessInfo").trigger('reloadGrid', [{ page: 1 }]);
                //$("#businessInfoGrid_PV").jqGrid('setGridParam', { data: BusinessInfo2 });
                //$("#businessInfoGrid_PV").trigger('reloadGrid', [{ page: 1 }]);
            }
            else {
                $("#HUBbusinessInfo").jqGrid('setRowData', EditBusinessInfoRow, BusinessInformation);
                $("#HUBbusinessInfo").trigger('reloadGrid', [{ page: 1 }]);
                //$("#businessInfoGrid_PV").jqGrid('setRowData', EditBusinessInfoRow, BusinessInformation);
                //$("#businessInfoGrid_PV").trigger('reloadGrid', [{ page: 1 }]);
                EditBusinessInfoRow = 0;
            }
        }

        else {
            if (EditBusinessInfoRow == 0) {
                griddata.push(BusinessInformation);
                var BusinessInfo1 = $("#business_info").jqGrid('getGridParam', 'data');
                var BusinessInfo2 = $.merge(BusinessInfo1, griddata);

                $("#business_info").jqGrid('setGridParam', { data: BusinessInfo2 });
                $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
            }
            else {
                $("#business_info").jqGrid('setRowData', EditBusinessInfoRow, BusinessInformation);
                $("#business_info").trigger('reloadGrid', [{ page: 1 }]);

                EditBusinessInfoRow = 0;
            }

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
$("#BusinessInfo_Product").change(function () {
    var productName = $("#BusinessInfo_Product").val();
    productName == "" ? ($("#Error_BI_Product").show().text('Please select Product')) : $("#Error_BI_Product").hide().text('');
});
$("#BusinessInfo_SKU").on('keypress change', function () {
    $("#ErrorinBusinessInfo_SKU").prop("hidden", true);
});
$("#BusinessInfo_ProposedLaunchDate").on('keypress change', function () {
    $("#BI_ProposedLaunchDate").val() == "" ? $("#ErrorInBusinessInfo_ProposedLunchDate").show() : $("#ErrorInBusinessInfo_ProposedLunchDate").hide();
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

$("#BusinessInfo_BusinessValue").on('keypress change', function () {
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
function OnEditBusinessInfo(RowData) {
    isEditBI = true;
    if (statusname == "3") {
        var DataFromTheRow = jQuery('#HUBbusinessInfo').jqGrid('getRowData', RowData);
        var productList = $("#HUBbusinessInfo").jqGrid("getCol", "Product");

    }
    else {
        var DataFromTheRow = jQuery('#business_info').jqGrid('getRowData', RowData);
        var productList = $("#business_info").jqGrid("getCol", "Product");
    }
    BIEditedSKU = DataFromTheRow.SKU;

    $('#BusinessInfo_SKU .skuOption').remove();
    $('#BusinessInfo_SKU .options').remove();
    $('#BusinessInfo_Product').val(DataFromTheRow.Product);
    $('#BusinessInfo_Product').trigger("change");
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
    var ProposedSellingPrice = DataFromTheRow.ProposedSellingPrice;
    var Y2Quantity = DataFromTheRow.Y2Quantity;
    $('#BusinessInfo_SKU').val(DataFromTheRow.SKU);
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
function OnDeleteBusinessInfo(RowData) {
    confirm("Are you sure you want to delete?", function () {
        if (statusname == "3") {
            $("#HUBbusinessInfo").jqGrid('delRowData', RowData, '', '');
            $("#HUBbusinessInfo").trigger('reloadGrid', [{ page: 1 }]);
            var productList = $("#HUBbusinessInfo").jqGrid("getCol", "Product");

        }
        else {
            $("#business_info").jqGrid('delRowData', RowData, '', '');
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);

            $("#business_info_PV").jqGrid('delRowData', RowData, '', '');
            $("#business_info_PV").trigger('reloadGrid', [{ page: 1 }]);
            var productList = $("#business_info").jqGrid("getCol", "Product");
        }
        $(".mandate").val("");
        EditBusinessInfoRow = 0;
    });
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $('.data-datepicker').datepicker('setDate', today);
    $('#BusinessInfo_ProposedLaunchDate').val('');
}
//Expected Packaging Grid or Table
var isEditPP = true;
var imageGrid = [];
if (GetData['PackageExpectedData'].length > 0) {

    $.each(GetData['PackageExpectedData'], function (i, obj) {
        var tablecountclass = 0;
        tablecountclass = packagingProfileData_1.length + 1
        packagingProfileData_1[tablecountclass] = obj;

        var tableCounter = $(".formulation_table table").length + 1;

        var newTable = `<table class="mt-4 ${tablecountclass}" style="width:100%" id="myTable${tableCounter}">
                 <thead>
                 <tr>
                
                 <th colspan="2"><b>Product : </b><span class="expectedProduct">`+ obj.Product + `</span></th>

                 <th style="width:25%"> <b>SKU : </b><span class="expectedSKU">` + obj.SKU + `</span></th>
                  <th>
                     <div class="justify-center_1 action_icons">
                       <a class="btn-icon -edit Edittable" title="Edit" onclick=OnEditExpectedPackaging(event)><i class="fas fa-pen pr-2 color-info"></i></a>
                       <a class="btn-icon -delete deletetable" title="Delete" onclick=OnDeleteExpectedPackaging(event)><i class="fas fas fa-trash color-delete color-delete"></i></a>
                       <a class="btn-icon -info imagesinfo" title="Images info" onclick=ShowImages(event) id="myTable${tableCounter}_Images"><i class="fas fa-images" data-bs-toggle="modal" title="Images"></i></a>
                  </div>
                 </th>
                </span>
                 </th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr>
                 <td style="width:25%;">
                 <span class="remarkss"><b>Primary Packaging : </b> <span class="remarks_Show show_primarypack" style="display:none"><i class="fas fa-list"></i></span></span>
                 <span class ="expected_PrimaryPack">
                      `+ obj.PrimaryPackaging + `
                 </span>
                 </td>
                 <td style="width:25%;">
                 <span class="remarkss">
                 <b> Secondary Packaging: </b><span class="remarks_Show show_secondarypack" style="display:none"><i class="fas fa-list"></i></span></span>
                 </span>
                 <span class="expected_SecondaryPack">`+ obj.SecondaryPackaging + `</span>
                 
                 </td>
                 <td>
                 <span class="remarkss">
                 <b> Tertiary Packaging: </b><span class="remarks_Show show_tertiarypack" style="display:none"><i class="fas fa-list"></i></span></span>
                 </span>
                 <span class="expected_TertiaryPack">`+ obj.TertiaryPackaging + `</span>
                 </td>
                 <td>
                 <span class="remarkss">
                 <b>Benchmark Products : </b><span class="remarks_Show show_benchmark" style="display:none"><i class="fas fa-list"></i></span></span>
                 </span>
                 <span class="expected_BenchMark">`+ obj.BenchmarkProducts + `</span>
                 </td>
                 
                 </tr>
                 <tr>
                 <td  colspan="2">
                 <span class="remarkss">
                 <b>Desired Packaging Characteristics </b><span class="remarks_Show show_desiredpack" style="display:none"><i class="fas fa-list"></i></span></span>
                 </span>
                 <span class="expected_desiredPack"> `+ obj.DesiredProductCharacteristics + `</span>
                 </td>
                 <td>
                 <span class="remarkss">
                 <b> Others if(any): </b><span class="remarks_Show show_others" style="display:none"><i class="fas fa-list"></i></span></span>
                 </span>
                 <span class="expected_others">`+ obj.Others + `</span>
                 </td>
                 
                 <td>
                 <span class="remarkss">
                 <b>Mold :</b><span class="remarks_Show show_mold" style="display:none"><i class="fas fa-list"></i></span>
                 </span>
                 <span class="expected_molds">`+ obj.Moulds + `</span>
                 
                 </td>
                 </tr>
                 <tr style="display: none;">
                 <td colspan="4" class="hiddenRow">
                     <span class="imageUpload">`+ obj.ImageUpload + `</span>
                  </td>
                  </tr>
                  <tr>
                 </tbody>
                 </table>`

        if (obj.ImageUpload == "") {
            var $newTable = $(newTable);
            $newTable.find(".imagesinfo").hide();
            $('.formulation_table').append($newTable);
        }
        else if (obj.ImageUpload != "") {
            var ImageUpload = obj.ImageUpload.split(',');
            $.each(ImageUpload, function (i, j) {
                var imagedata = {}
                imagedata = {
                    TableId: 'myTable' + tableCounter + '_Images',
                    TableClass: 'Images_' + tablecountclass,
                    Image: ImageUpload[i],
                }
                imageGrid.push(imagedata);
            });
            $('.formulation_table').append(newTable);
        }
    });
    if (GetData.PackageHeader[0].SID > 1 && (GetData.PackageHeader[0].SID != 8 && GetData.PackageHeader[0].SID != 9 && GetData.PackageHeader[0].SID != 11)) {
        $('.remarks_Show').show();
        $('.deletetable').hide();
        $('.Edittable').hide();
        $('.remarks_Show').attr("title", "Remarks List")
    }
    if ($("#ViewStatus").val() == "View") {
        $('.deletetable').hide();
        $('.Edittable').hide();
    }
}
var packagingProfileData_1 = [];
var editedTableClass = 0;
$("#AddExpectedPackagingData").on("click", function () {
    var flag = true;
    var Product = $.trim($("#ExpectedPackage_Product").val());
    var SKU = $("#ExpectedPack_SKU").val().toString();
    var Pack_PrimaryPackagingData = CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].getData();
    var PrimaryPackaging = Pack_PrimaryPackagingData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
    var secondaryPackaging = CKEDITOR.instances["ExpectedPack_SecondaryPackaging"].getData();
    var tertiaryPackaging = CKEDITOR.instances["ExpectedPack_TertiaryPackaging"].getData();
    var benchmarkProducts = CKEDITOR.instances["ExpectedPack_BenchmarkProduct"].getData();
    var desiredPackagingCharacteristics = CKEDITOR.instances["ExpectedPack_DesiredPack"].getData();
    var others = CKEDITOR.instances["ExpectedPack_Other"].getData();

    var mould = $.trim($("#Expected_Mould").val());
    var tableCounter = $(".formulation_table table").length + 1;

    if (Product == "" || SKU == "" || PrimaryPackaging == "") {
        flag = false;
        Product == "" ? ($("#Error_PPR_Product").show().text('Please select Product')) : $("#Error_PPR_Product").hide().text('');
        SKU == "" ? $("#ErrorInExpectedPack_SKU").prop("hidden", false) : $("#ErrorInExpectedPack_SKU").prop("hidden", true)
        PrimaryPackaging == "" ? $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", false) : $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true)
    }

    if (flag) {

        var griddata = [];
        var ExpextedPackaging = {};

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
            BenchmarkProducts: CKEDITOR.instances["ExpectedPack_BenchmarkProduct"].getData(),//DesiredPackagingCharacters
            DesiredProductCharacteristics: CKEDITOR.instances["ExpectedPack_DesiredPack"].getData(),
            Others: CKEDITOR.instances["ExpectedPack_Other"].getData(),
            Moulds: $("#Expected_Mould").val(),
            ImageUpload: ImageUpload1
        };

        if (editedTable != "") {   // Update the existing table with the edited data
            var row = editedTable.find("tbody tr");
            var rowh = editedTable.find("thead");
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
                       <a class="btn-icon -delete" title="Delete" onclick=OnDeleteExpectedPackaging(event)><i class="fas fas fa-trash color-delete color-delete"></i></a>
                       <a class="btn-icon -info imagesinfo" title="Images info" onclick=ShowImages(event) id="myTable${tableCounter}_Images"><i class="fas fa-images" data-bs-toggle="modal" title="Images"></i></a>
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
                       <a class="btn-icon -delete" title="Delete" onclick=OnDeleteExpectedPackaging(event)><i class="fas fas fa-trash color-delete color-delete"></i></a>
                       <a class="btn-icon -info imagesinfo" title="Images info" onclick=ShowImages(event) id="myTable${tableCounter}_Images"><i class="fas fa-images" data-bs-toggle="modal" title="Images"></i></a>
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
            else if (ImageUpload1 != "") {
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
        $("#ExpectedPack_SKU").empty();
        $("#ExpectedPack_SKU").multiselect('rebuild');

        $("#Expected_Mould").val("").trigger("change");
    }
    editedTable = "";
    $(".ToHideImage").empty();
    $("#ExpectedPackagingMsg").prop("hidden", true);

    isEditPP = false;
    isEdited = 0;

});

$("#ExpectedPackage_Product").change(function () {
    var productName = $("#ExpectedPackage_Product").val();

    productName == "" ? ($("#Error_PPR_Product").show().text('Please select Product')) : $("#Error_PPR_Product").hide().text('');
    $("#ErrorInExpectedPack_SKU").prop("hidden", true);
});

$("#ExpectedPack_SKU").on('keypress change', function () {
    $("#ErrorInExpectedPack_SKU").prop("hidden", true);
});

$("#ExpectedPack_PrimaryPackaging").on('keypress change', function () {
    $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true);
});

$("#ExpectedPack_PrimaryPackaging").bind("paste", function () {
    $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true);
});
var editedTable = "";
var isEdited = 0;
function OnEditExpectedPackaging(event) {
    document.getElementById('ExpectedPackage_Product').scrollIntoView({ behavior: 'smooth' });
    var table = $(event.target).closest("table");
    var tableId = $(event.target).closest("table").attr("id")
    var tableclass = $(event.target).closest("table").attr("class").replace('mt-4 ', '')
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
var data = [];
function OnRemoveImage(RowData) {
    var DataFromTheRow2 = jQuery('#ExpectedPack').jqGrid('getRowData', RowData);
    var Image = DataFromTheRow2.ImageUpload;

    confirm("Are you sure you want to delete image?", function () {

        data.push(DataFromTheRow2.ImageUpload);

        ExpextedPackaging =
        {
            Product: DataFromTheRow2.Product,
            SKU: DataFromTheRow2.SKU,
            PrimaryPackaging: DataFromTheRow2.PrimaryPackaging,
            SecondaryPackaging: DataFromTheRow2.SecondaryPackaging,
            TertiaryPackaging: DataFromTheRow2.TertiaryPackaging,
            BenchmarkProducts: DataFromTheRow2.BenchmarkProducts,
            DesiredProductCharacteristics: DataFromTheRow2.DesiredProductCharacteristics,
            Others: DataFromTheRow2.Others,
            Moulds: DataFromTheRow2.Moulds,
            ImageUploadOrFileUpload: '',
            ImageUpload: '',
        }
        $("#ExpectedPack").jqGrid('setRowData', RowData, ExpextedPackaging);
        $("#ExpectedPack").trigger('reloadGrid', [{ page: 1 }]);
        $('#ToGetImage').text("");
    });
}

function ViewUploadedImage(event) {
    var table = $(event.target).closest("table");
    var filename = table.find(".imageUpload").text();
    if (filename.length > 0) {
        var imageUrl = ROOT + 'PackageInitiativesImages/' + filename;
        window.open(imageUrl, '_blank');
    }
}

$("#ExpectedPack_ImageUpload").on("change", function () {
    $(".ToHideImage").empty();
})

//done
function OnDeleteExpectedPackaging(event, flag = 0) {

    if (flag == 1) {

        var table = event
        var tableclass = $('#' + event).attr('class').replace('mt-4 ', '');

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
        var FileName = table.find(".imageUpload").text();
        var tableclass = table.attr('class').replace('mt-4 ', '');
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
//To Download the uploded image

function DownloadUploadedImage(event) {

    var table = $(event.target).closest("table");
    var tableId = $(event.target).closest("table").attr("id");

    var filename = table.find(".imageUpload").text();
    if (filename.length > 0) {
        $('#' + tableId + 'DownloadImage').prop("href", ROOT + "ProjectBrief/DownloadPackageImageFile?fileName=" + filename);
        return true;
    }
    else {
        $('#' + tableId + 'DownloadImage').empty().text('No Image Present');

    }
}

//TO SAVE THE IMAGE IN THE FOLDER

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
            }
        });
    }
    return fileName;
}

//HGML data

if (statusname == "2" || statusname == "13") {
    $(document).ready(function () {
        if ($('#HGMLYesOrNo').val() == '') {
            $("#hgdata").hide();
            $("#hgdata1").hide();
        }
        else {
            var pofile = $("#HGMLYesOrNo").val();
            if (pofile == "Yes") {
                $("#hgdata").show();
                $("#hgdata1").hide();
            }
            else if (pofile == "No") {
                $("#hgdata").hide();
                $("#hgdata1").show();
            }
        }
        $("#HGMLYesOrNo").change(function () {
            var pofile = $("#HGMLYesOrNo").val();
            if (pofile == "Yes") {
                $("#hgdata").show();
                $("#hgdata1").hide();
                $('.SendtoPMD').hide();
                $('#SendtoPMDbottom').hide();

                $('.SendToHUB').show();
                $(".SendtoUnderExploration").hide();

            }
            else if (pofile == "No") {

                $("#hgdata").hide();
                $("#hgdata1").show();
                $('.SendToHUB').hide();
                $('#SendToHUBbottom').hide();

                $('#SendtoPMDbottom').show();

                for (var i = 0; i < GetData['ApprovalStatusData'].length; i++) {
                    var id = GetData.ApprovalStatusData[i].FromStage
                    if (id == 16) {
                        $(".SendtoUnderExploration").show();
                        break;
                    }
                    else {
                        $('.SendtoPMD').show();
                    }
                }
            }
            else {

                $("#hgdata").hide();
                $("#hgdata1").hide();
                $('.SendToHUB').show();
                $('.SendtoPMD').show();


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
}

//To Take the HGML data


colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center  action_icons icon_section align-items-left">
            <a onclick = onEditHgmlData(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
            <a onclick = onDeleteHgmlData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
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
        name: 'ProjectCategorization',
        label: 'Project Categorization',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
    },
]
if (statusname == "2" || statusname == "13") {
    if (GetData.PackageHGMLData[0] != undefined) {

        var check = GetData.PackageHGMLData[0].HGMLYesOrNo;

        if (check == "No") {

            $('#HGMLYesOrNo').val(GetData.PackageHGMLData[0].HGMLYesOrNo);
            $("#HGML_Data").jqGrid({
                url: '',
                datatype: 'local',
                data: GetData['PackageHGMLData'] == undefined ? [] : GetData['PackageHGMLData'],
                mtype: 'GET',
                colModel: colmodels,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_HGML',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#HGML_Data tbody tr");
                    var objHeader = $("#HGML_Data tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                    if ($('#ViewStatus').val() == 'View') {
                        jQuery("#HGML_Data").jqGrid('hideCol', "Action");
                    }

                }

            });
            $("#HGML_Data_PV").jqGrid({
                url: '',
                datatype: 'local',
                data: GetData['PackageHGMLData'] == undefined ? [] : GetData['PackageHGMLData'],
                mtype: 'GET',
                colModel: colmodels,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_HGML_PV',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#HGML_Data_PV tbody tr");
                    var objHeader = $("#HGML_Data_PV tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                    if ($('#ViewStatus').val() == 'View') {
                        jQuery("#HGML_Data").jqGrid('hideCol', "Action");
                    }
                    jQuery("#HGML_Data_PV").jqGrid('hideCol', "Action");


                }

            });

            $('.SendtoPMD').show();
            $('.SendToHUB').hide();
        }
        if (check == "Yes") {

            $('#HGMLYesOrNo').val(GetData.PackageHGMLData[0].HGMLYesOrNo);
            $('#HgmlData_HubDropdown').val(GetData.PackageHGMLData[0].Hub);
            $('.PackHGMLtoHubRemarks').val(GetData.PackageHGMLData[0].HgmlToHubRemarks);
            $('.SendtoPMD').hide();
            $('.SendToHUB').show();

            $("#HGML_Data").jqGrid({
                url: '',
                datatype: 'local',
                data: [],
                mtype: 'GET',
                colModel: colmodels,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_HGML',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#HGML_Data tbody tr");
                    var objHeader = $("#HGML_Data tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }
                    if ($('#ViewStatus').val() == 'View') {
                        jQuery("#HGML_Data").jqGrid('hideCol', "Action");
                    }
                }

            });


        }

    }

    else {
        $("#HGML_Data").jqGrid({
            url: '',
            datatype: 'local',
            data: [],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_HGML',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#HGML_Data tbody tr");
                var objHeader = $("#HGML_Data tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
                if ($('#ViewStatus').val() == 'View') {
                    jQuery("#HGML_Data").jqGrid('hideCol', "Action");
                }

            }
        });
        $("#HGML_Data_PV").jqGrid({
            url: '',
            datatype: 'local',
            data: GetData['PackageHGMLData'] == undefined ? [] : GetData['PackageHGMLData'],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_HGML_PV',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#HGML_Data_PV tbody tr");
                var objHeader = $("#HGML_Data_PV tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

                if ($('#ViewStatus').val() == 'View') {
                    jQuery("#HGML_Data").jqGrid('hideCol', "Action");
                }
                jQuery("#product_description_PV").jqGrid('hideCol', "Action");
                jQuery("#HGML_Data_PV").jqGrid('hideCol', "Action");


            }


        });

    }

    productDescriptionProductNameList = jQuery('#product_description').jqGrid("getCol", "ProductName");

    hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "ProductName");
    hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, hgmlDataProductNameList) == -1 });

    if (hgmlDataProductNameList.length > 0) {

        var productOption = "";

        $("option").remove("#HgmlDataProductName .ProductOption");

        $.each(hgmlDataProductNameList, function (i, obj) {

            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });

        $("#HgmlDataProductName").append(productOption);
    }
}

if (statusname == "3") {

    $("#HGML_Data").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_HGML',
        rowNum: 20,
        scroll: 1,

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
}

var EditRowId = 0;

$("#HgmlDataProductName").change(function () {

    var productName = $("#HgmlDataProductName").val();
    productName == "" ? ($("#Error_HgmlDataProductName").show().text('Please select Product Name')) : $("#Error_HgmlDataProductName").hide().text('');

    const productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

    if (productName != "") {

        productList.includes(productName) ? ($("#Error_HgmlDataProductName").show().text('This Product already consists the definition, Please select the different Product Name')) : $("#Error_HgmlDataProductName").hide().text('');
    }
});


$("#HgmlDataParticipatingMarkets").keyup(function () {
    $("#HgmlDataParticipatingMarkets").val() == "" ? $("#ErrorInHgmlDataParticipatingMarkets").show() : $("#ErrorInHgmlDataParticipatingMarkets").hide();
});
$("#HgmlDataProjectPriority").change(function () {
    $("#HgmlDataProjectPriority").val() == "" ? $("#ErrorInHgmlDataProjectPriority").show() : $("#ErrorInHgmlDataProjectPriority").hide();
});



$("#AddHGMLData").click(function () {
    var productName = $("#HgmlDataProductName").val();
    var participatingMarkets = $.trim($("#HgmlDataParticipatingMarkets").val());
    var projectPriority = $.trim($("#HgmlDataProjectPriority").val());
    var projectCategorization = $("#PMDProjectCategorization").val();
    var flag = true;

    if (productName == "" || participatingMarkets == "" || projectPriority == "" || projectCategorization == "") {
        flag = false;

        productName == "" ? $("#Error_HgmlDataProductName").show().text('Please select Product Name') : $("#Error_HgmlDataProductName").hide().text('');
        participatingMarkets == "" ? $("#ErrorInHgmlDataParticipatingMarkets").show() : $("#ErrorInHgmlDataParticipatingMarkets").hide();
        projectPriority == "" ? $("#ErrorInHgmlDataProjectPriority").show() : $("#ErrorInHgmlDataProjectPriority").hide();
        projectCategorization == "" ? $(".PMDProjectCategorization").show() : $(".PMDProjectCategorization").hide();
    }
    productName == "" ? $("#Error_HgmlDataProductName").show().text('Please select Product Name') : $("#Error_HgmlDataProductName").hide().text('');


    if (flag) {

        var gridData = [];
        var hgmlData = {};

        $('.Error_HgmlData').hide();

        hgmlData = {
            ProductName: productName,
            ParticipatingMarkets: participatingMarkets,
            ProjectPriority: projectPriority,
            Remarks: $("#HgmlData_Remarks").val(),
            ProjectCategorization: projectCategorization
        }

        if (EditRowId == 0) {

            gridData.push(hgmlData);
            var HD1 = $("#HGML_Data").jqGrid('getGridParam', 'data');
            var HD2 = $.merge(HD1, gridData);
            $("#HGML_Data").jqGrid('setGridParam', { data: HD2 });
            $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);
            $("#HGML_Data_PV").jqGrid('setGridParam', { data: HD2 });
            $("#HGML_Data_PV").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            $("#HGML_Data").jqGrid('setRowData', EditRowId, hgmlData);
            $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);
            $("#HGML_Data_PV").jqGrid('setRowData', EditRowId, hgmlData);
            $("#HGML_Data_PV").trigger('reloadGrid', [{ page: 1 }]);
            EditRowId = 0;
        }
        if (statusname == "2" || statusname == "13") {
            $('.HGMLData').val("");
        }
        if (statusname == "4" || statusname == "14") {
            $('.Toclear1').val("");
        }

        var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");


        productDescriptionProductNameList = $("#product_description").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        $("option").remove("#HgmlDataProductName .ProductOption");

        if (hgmlDataProductNameList.length > 0) {

            var productOption = "";

            $.each(hgmlDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#HgmlDataProductName").append(productOption);
        }
        $("#Error_HgmlData_Grid").hide();
    }
});

//On Clicking the edit button 
function onEditHgmlData(RowId) {

    EditRowId = RowId;

    $('.Error_HgmlData').hide();

    var DataFromTheRow = jQuery('#HGML_Data').jqGrid('getRowData', RowId);
    var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

    hgmlDataProductNameList = $.grep(hgmlDataProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    hgmlDataProductNameList.push(DataFromTheRow.ProductName);

    $("option").remove("#HgmlDataProductName .ProductOption");

    if (hgmlDataProductNameList.length > 0) {

        var productOption = "";

        $.each(hgmlDataProductNameList, function (i, obj) {

            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });

        $("#HgmlDataProductName").append(productOption);
    }


    $('#HgmlDataProductName').val(DataFromTheRow.ProductName);
    $('#HgmlDataParticipatingMarkets').val(DataFromTheRow.ParticipatingMarkets);
    $('#HgmlDataProjectPriority').val(DataFromTheRow.ProjectPriority);
    $('#HgmlData_Remarks').val(DataFromTheRow.Remarks);
    $('#PMDProjectCategorization').val(DataFromTheRow.ProjectCategorization);

}

//On deleting the row data
function onDeleteHgmlData(RowId) {
    confirm(" Are you sure you want to delete ?", function () {
        $("#HGML_Data").jqGrid('delRowData', RowId);
        $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);
        EditRowId = 0;
        $('.HGMLData').val("");
        var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        productDescriptionProductNameList = $("#product_description").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
        $("option").remove("#HgmlDataProductName .ProductOption");

        if (hgmlDataProductNameList.length > 0) {


            var productOption = "";

            $.each(hgmlDataProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#HgmlDataProductName").append(productOption);
        }
    });
}

//-------------------------------------------------------------------------------------------

//TO SUBMIT THE Form VALUE

CKEDITOR.instances.editorsk1.on('change', function () {
    var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();

    var contentWithoutTags = BusinessRationalData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
    //CKEDITOR.instances['editorsk1'].setData(actualData);
    if (actualData == '') {
        $("#ErrorIn_BusinessRational").prop("hidden", false)
    } else {
        $("#ErrorIn_BusinessRational").prop("hidden", true);
    }
});


$("#ProductDescription_ProjectName").on('change keypress', function () {
    $("#Error_in_ProjectName").prop("hidden", true);
});



function ValidatePackSubmitForm() {
    $('#ByClickOk').prop("disabled", false);
    $('#ManagerApprovalOK').prop("disabled", false);
    var PackageHeaderTableData1 = [];
    var ProjectDetails = [];
    var ProjectName = $('#ProductDescription_ProjectName').val();
    var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
    var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
    var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
    var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
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

    var PackageHeaderTableData1 = [];
    $(".initiated_section").each(function (i) {
        PackageHeaderTableData1.push({
            ProjectName: ProjectName,
            ProjectType: "3",
            Hub: $(this).find('.hub_name').text(),
            Division: $(this).find('#Division').val(),
            Category: $(this).find('.addCategoryOption').val(),
            InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
            InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
            Status: "2"
        });
    });
    ProjectDetails =
        [{
            ProjectName: ProjectName,
            BusinessRational: BusinessRationalData
        }];
    var flag = true;

    $('#PackageEdit_Form_Submit').validate();

    if ($('#PackageEdit_Form_Submit').valid()) {
        flag = true;
    }
    else {
        flag = false;
    }


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

        if (statusname == '9') {
            $('div#SubmitForHGML').modal('show');
            $("#ManagerApprovalOK").click(function () {
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
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "2"
                    });
                });
                ProjectDetails =
                    [{
                        ProjectName: ProjectName,
                        BusinessRational: BusinessRationalData,
                        PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                    }];
                var PackageInitiatorRemarks = $("#ShowManagerApprovalRemarks").val()

                approvalStatus = [{
                    ProjectType: "Package Initiatives",
                    FromStage: 9,
                    FromStageName: "Pending for Approval",
                    Action: "Send to HGML Review",
                    ToStage: 2,
                    ToStageName: "HGML Review"

                }];

                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks)

                $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
                $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
                $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
                $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
                $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
                $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));
                $('#PackStatus').val(2);

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#ManagerApprovalOK').prop("disabled", true);
            });
        }
        else {
            $('div#SubmitModal').modal('show');
            $("#ByClickOk").click(function () {
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
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "2"
                    });
                });
                ProjectDetails =
                    [{
                        ProjectName: ProjectName,
                        BusinessRational: BusinessRationalData,
                        PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                    }];


                var status = GetData.PackageHeader[0].SID
                var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val()
                if (status == "1") {

                    approvalStatus = [{
                        ProjectType: "Package Initiatives",
                        FromStage: 1,
                        FromStageName: "Draft",
                        Action: "Send to HGML Review",
                        ToStage: 2,
                        ToStageName: "HGML Review"

                    }];
                }
                if (status == "8") {
                    approvalStatus = [{
                        ProjectType: "Package Initiatives",
                        FromStage: 8,
                        FromStageName: "Sent Back To initiator",
                        Action: "Send to HGML Review",
                        ToStage: 2,
                        ToStageName: "HGML Review"
                    }];
                }
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks)

                $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
                $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
                $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
                $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
                $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
                $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))
                $('#PackStatus').val(2);
                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#ByClickOk').prop("disabled", true);
            });
        }
    }
}

//------------------------------------------------------------------------------------------------------  

//Button save


$("#ProductDescription_ProjectName").on('change keypress', function () {
    $("#Error_in_ProjectName").prop("hidden", true);
});


function ValidatePackSaveForm() {

    $('#ToSave_OK').prop("disabled", false);

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );

    if (statusname == "1") {
        var projectName = $('#ProductDescription_ProjectName').val();
        var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
        var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
        var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
        var ExpectedPackagingGridValue = [];
        var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
        var hgmlData = [];

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

        var flag = true;
        if ($('#ProductDescription_ProjectName-error').text() != '') {
            flag = false;
            $("#Error_in_ProjectName").prop("hidden", true);
        }
        else {
            projectName == "" ? ($('#Error_in_ProjectName').prop("hidden", false), flag = false) : $('#Error_in_ProjectName').prop("hidden", true);

        }
        if (projectName == "") {
            document.getElementById('Error_in_ProjectName').scrollIntoView({ behavior: 'smooth' });

        }
        if (flag) {
            $('div#SaveModal').modal('show');

            $("#ToSave_OK").on("click", function () {

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
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
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
                $('#UserName').val($('#UserName').val());

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                $('#PackStatus').val(1);

                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#ToSave_OK').prop("disabled", true);

            });
        }
    }

    if (statusname == "8") {

        var projectName = $('#ProductDescription_ProjectName').val();
        var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
        var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
        var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
        var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
        var ExpectedPackagingGridValue = [];
        var hgmlData = [];

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
        var flag = true;
        if ($('#ProductDescription_ProjectName-error').text() != '') {
            flag = false;
            $("#Error_in_ProjectName").prop("hidden", true);
        }
        else {
            projectName == "" ? ($('#Error_in_ProjectName').prop("hidden", false), flag = false) : $('#Error_in_ProjectName').prop("hidden", true);

        }
        if (flag) {
            $('div#SaveModal').modal('show');

            $("#ToSave_OK").on("click", function () {
                var PackageHeaderTableData2 = [];
                $(".initiated_section").each(function (i) {
                    PackageHeaderTableData2.push({
                        ProjectName: $('#ProductDescription_ProjectName').val(),
                        ProjectType: "3",
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "8"
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
                $('#UserName').val($('#UserName').val());
                $('#PackStatus').val(8);
                $('#CurrentStatus').val(8);

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))


                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#ToSave_OK').prop("disabled", true);

            });
        }
    }

    if (statusname == "2" || statusname == "13") {

        var hgmlData = [];
        $('div#SaveModal').modal('show')
        $("#ToSave_OK").click(function () {
            if ($('#HGMLYesOrNo').val() == 'Yes') {

                var HUbName = $('#HgmlData_HubDropdown').val();
                var HubUser = $('#HgmlData_HubUsersDropdown').val();

                hgmlData = [{
                    Hub: HUbName.toString(),
                    HubUsers: HubUser.toString(),
                    HgmlToHubRemarks: $('.PackHGMLtoHubRemarks').val()
                }]
            }
            else if ($('#HGMLYesOrNo').val() == 'No') {

                hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
            }
            if (statusname == "2") {
                $('#PackStatus').val(2);
                $('#CurrentStatus').val(2);
            }
            if (statusname == "13") {
                $('#PackStatus').val(13);
                $('#CurrentStatus').val(13);
            }
            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#UserName').val($('#UserName').val());
            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))
            document.getElementById('PackageEdit_Form_Submit').submit();
            $('#ToSave_OK').prop("disabled", true);


        });
    }
    if (statusname == "3") {
        $('div#SaveModal').modal('show');
        $("#ToSave_OK").click(function () {
            var BusinessValueGridData = $("#HUBbusinessInfo").jqGrid("getGridParam", "data");
            $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
            var HubApproveStatus = $("#PackHubApprove").val();
            $('#IsHubApproved').val(HubApproveStatus);
            $('#PackStatus').val(3);
            $('#UserName').val($('#UserName').val());
            $('#CurrentStatus').val(3);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))
            document.getElementById('PackageEdit_Form_Submit').submit();
            $('#ToSave_OK').prop("disabled", true);
        });

    }

    if (statusname == "4" || statusname == "14") {

        $('div#SaveModal').modal('show');

        $("#ToSave_OK").click(function () {
            if (statusname == "4") {
                $('#PackStatus').val(4);
                $('#CurrentStatus').val(4);
            }
            if (statusname == "14") {
                $('#PackStatus').val(14);
                $('#CurrentStatus').val(14);
            }
            $('#UserName').val($('#UserName').val());

            var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
            $('#HgmlData').val(JSON.stringify(hgmlData));

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            document.getElementById('PackageEdit_Form_Submit').submit();
            $('#ToSave_OK').prop("disabled", true);
        });
    }
    if (statusname == "5") {

        var targetCostData = [];

        $('div#SaveModal').modal('show');
        $("#ToSave_OK").click(function () {

            var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
            $('#PMDData').val(JSON.stringify(pmdData));

            targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')

            $('#TargetCostGridData').val(JSON.stringify(targetCostData));


            $('#PackStatus').val(5);
            $('#UserName').val($('#UserName').val());
            $('#CurrentStatus').val(5);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            document.getElementById('PackageEdit_Form_Submit').submit();
            $('#ToSave_OK').prop("disabled", true);

        });
    }
    if (statusname == "16") {

        var targetCostData = [];

        $('div#SaveModal').modal('show');
        $("#ToSave_OK").click(function () {

            var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
            $('#PMDData').val(JSON.stringify(pmdData));

            targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
            $('#TargetCostGridData').val(JSON.stringify(targetCostData));


            $('#PackStatus').val(16);
            $('#UserName').val($('#UserName').val());
            $('#CurrentStatus').val(16);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            document.getElementById('PackageEdit_Form_Submit').submit();
            $('#ToSave_OK').prop("disabled", true);

        });
    }

    if (statusname == "9") {

        var projectName = $('#ProductDescription_ProjectName').val();
        var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
        var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
        var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
        var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
        var ExpectedPackagingGridValue = [];
        var hgmlData = [];

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
        var flag = true;
        if ($('#ProductDescription_ProjectName-error').text() != '') {
            flag = false;
            $("#Error_in_ProjectName").prop("hidden", true);
        }
        else {
            projectName == "" ? ($('#Error_in_ProjectName').prop("hidden", false), flag = false) : $('#Error_in_ProjectName').prop("hidden", true);

        }
        if (flag) {
            $('div#SaveModal').modal('show');

            $("#ToSave_OK").on("click", function () {
                var PackageHeaderTableData2 = [];
                $(".initiated_section").each(function (i) {
                    PackageHeaderTableData2.push({
                        ProjectName: $('#ProductDescription_ProjectName').val(),
                        ProjectType: "3",
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "9"
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
                $('#UserName').val($('#UserName').val());
                $('#PackStatus').val(9);
                $('#CurrentStatus').val(9);

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#ToSave_OK').prop("disabled", true);

            });
        }
    }
    if (statusname == "11") {

        var projectName = $('#ProductDescription_ProjectName').val();
        var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
        var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
        var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
        var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
        var ExpectedPackagingGridValue = [];
        var hgmlData = [];

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
        var flag = true;
        if ($('#ProductDescription_ProjectName-error').text() != '') {
            flag = false;
            $("#Error_in_ProjectName").prop("hidden", true);
        }
        else {
            projectName == "" ? ($('#Error_in_ProjectName').prop("hidden", false), flag = false) : $('#Error_in_ProjectName').prop("hidden", true);

        }
        if (flag) {
            $('div#SaveModal').modal('show');

            $("#ToSave_OK").on("click", function () {
                var PackageHeaderTableData2 = [];
                $(".initiated_section").each(function (i) {
                    PackageHeaderTableData2.push({
                        ProjectName: $('#ProductDescription_ProjectName').val(),
                        ProjectType: "3",
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "11"
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
                $('#UserName').val($('#UserName').val());
                $('#PackStatus').val(11);
                $('#CurrentStatus').val(11);

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#ToSave_OK').prop("disabled", true);

            });
        }
    }
}


$("#SendToHGMLApprove").keyup(function () {
    $("#SendToHGMLApprove").val() == "" ? $("#Error_SendToHGMLApprove").show() : $("#Error_SendToHGMLApprove").hide();
});
$("#HgmlData_HUBParticipatingMarkets").keyup(function () {
    $("#HgmlData_HUBParticipatingMarkets").val() == "" ? $("#Error_HgmlDataParticipatingMarkets").show() : $("#Error_HgmlDataParticipatingMarkets").hide();
});
//Send to HGML Approve from hub Review
function ValidatesentTOHGMLApproveForm() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );
    $('#SendToHGML_Ok').prop("disabled", false);

    var HubApproveStatus = $("#PackHubApprove").val();
    var approvalStatus = [];
    var flag = true;

    var BusinessValueGridData = $("#HUBbusinessInfo").jqGrid("getGridParam", "data");
    if (HubApproveStatus == "") {
        $('#spanhubApprove').show();
        flag = false;
    };


    if (HubApproveStatus == "Yes") {

        if (BusinessValueGridData == "") {
            $("#businessinfoMsg").prop("hidden", false);

            flag = false;
        }
        else { flag = true }
    }
    var partiMarketdata = $.trim($("#HgmlData_HUBParticipatingMarkets").val());
    if (partiMarketdata == "") {
        $("#Error_HgmlDataParticipatingMarkets").show();
        document.getElementById('Error_HgmlDataParticipatingMarkets').scrollIntoView({ behavior: 'smooth' });
        flag = false;
    }

    if (HubApproveStatus == "Yes") {
        if (BusinessValueGridData == "") {
            document.getElementById('businessinfoMsg').scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (HubApproveStatus == "") {
        document.getElementById('HGMLHeaderTable').scrollIntoView({ behavior: 'smooth' });
    }

    if (flag == true) {
        $('div#SendTOHGML').modal('show');
        $("#SendToHGML_Ok").click(function () {
            approvalStatus = [{
                FromStage: 3,
                FromStageName: "HUB Review",
                Action: "Send TO HGML",
                ToStage: 4,
                ToStageName: "HGML Approve",
                RemarksType: "HUB"
            }];
            var sendtoHGMLApprove = $('#SendToHGMLApprove').val();

            $('#PackStatus').val(4);
            $('#UserName').val($('#UserName').val());
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));

            $('#CurrentStatus').val(3);
            $('#IsHubApproved').val(HubApproveStatus);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

            if (sendtoHGMLApprove == "") {
                $('#Error_SendToHGMLApprove').show();
                return false;
            }

            else {
                $('#SendToHGMLApproveRemarks').val(sendtoHGMLApprove);
                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#SendToHGML_Ok').prop("disabled", true);
            }

        });
    }
}

$("#ShowSendBackRemarks").keyup(function () {
    $("#ShowSendBackRemarks").val() == "" ? $("#Error_SendBacktoInitiator").show() : $("#Error_SendBacktoInitiator").hide();
});

//Send Back to initiator Form

function PackageInitiativeSendBackForm() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );
    $('#SendBacFromkHGMLReview_Ok').prop("disabled", false);

    if (statusname == "2" || statusname == "13") {
        var flag = true;
        var approvalStatus = [];
        var hgmlData = [];

        $('div#SendbackModal').modal('show')
        $("#SendBacFromkHGMLReview_Ok").click(function () {

            if ($('#HGMLYesOrNo').val() == 'Yes') {
                var HUbName = $('#HgmlData_HubDropdown').val();
                var HubUser = $('#HgmlData_HubUsersDropdown').val();

                hgmlData = [{

                    Hub: HUbName.toString(),
                    HubUsers: HubUser.toString(),
                    HgmlToHubRemarks: $('.PackHGMLtoHubRemarks').val()
                }]
            }
            else if ($('#HGMLYesOrNo').val() == 'No') {

                hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
            }


            var sendbacktoinitiatorRemarks = $('#ShowSendBackRemarks').val();
            var send = true;
            if (sendbacktoinitiatorRemarks == "") {
                $('#Error_SendBacktoInitiator').show();
                return false;
            }
            else {
                $('#packageSendBackToInitiatorRemarks').val(sendbacktoinitiatorRemarks);

            }

            var approvalStatus = [];
            if (statusname == "2") {
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: "HGML Review",
                    Action: "Send Back",
                    ToStage: 8,
                    ToStageName: "Sent Back to Initiator"
                }];
                $('#PackStatus').val(8);
                $('#CurrentStatus').val(2);
            }
            if (statusname == "13") {
                approvalStatus = [{
                    FromStage: 13,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Send Back",
                    ToStage: 8,
                    ToStageName: "Sent Back to Initiator"
                }];
                $('#PackStatus').val(8);
                $('#CurrentStatus').val(13);
            }
            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));


            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            document.getElementById('PackageEdit_Form_Submit').submit();


            $('#SendBacFromkHGMLReview_Ok').prop("disabled", true);


        });
    }
    if (statusname == "5" || statusname == "16") {
        var flag = true;
        var approvalStatus = [];
        var previousStage = ""
        for (var i = 0; i < GetData['ApprovalStatusData'].length; i++) {
            var status = GetData.ApprovalStatusData[i].FromStage
            if (status == 11 || status == 5 || status == 9 || status == 8 || status == 16) {
                continue;
            }
            else {
                var previousStage = status;
                break;
            }
        }
        if (flag) {
            $('div#SendbackModal').modal('show');
            $("#SendBacFromkHGMLReview_Ok").click(function () {
                var sendBack = $('#ShowSendBackRemarks').val();
                if (statusname == "5") {
                    if (previousStage == '2' || previousStage == '13') {
                        approvalStatus = [{
                            FromStage: 5,
                            FromStageName: "Fine Screening Review",
                            Action: "Send Back",
                            ToStage: 13,
                            ToStageName: "Brief Demoted to HGML"
                        }];

                        $('#PackStatus').val(13);
                    }
                    if (previousStage == "4" || previousStage == '14') {
                        approvalStatus = [{
                            ProjectType: "Package Initiatives",
                            FromStage: 5,
                            FromStageName: "Fine Screening Review",
                            Action: "Send Back",
                            ToStage: 14,
                            ToStageName: "Brief Demoted to HGML"
                        }];

                        $('#PackStatus').val(14);
                    }
                    $('#CurrentStatus').val(5);
                }
                if (statusname == "16") {
                    if (previousStage == '2' || previousStage == '13') {
                        approvalStatus = [{
                            FromStage: 16,
                            FromStageName: "Extended Fine Screening",
                            Action: "Send Back",
                            ToStage: 13,
                            ToStageName: "Brief Demoted to HGML"
                        }];

                        $('#PackStatus').val(13);
                    }
                    if (previousStage == "4" || previousStage == '14') {
                        approvalStatus = [{
                            ProjectType: "Package Initiatives",
                            FromStage: 16,
                            FromStageName: "Extended Fine Screening",
                            Action: "Send Back",
                            ToStage: 14,
                            ToStageName: "Brief Demoted to HGML"
                        }];

                        $('#PackStatus').val(14);
                    }
                    $('#CurrentStatus').val(16);
                }
                var sendbacktoinitiatorRemarks = $('#ShowSendBackRemarks').val();

                if (sendbacktoinitiatorRemarks == "") {
                    $('#Error_SendBacktoInitiator').show();
                    return false;

                }
                else {
                    var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
                    $('#PMDData').val(JSON.stringify(pmdData));


                    targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                    $('#TargetCostGridData').val(JSON.stringify(targetCostData));

                    $('#packageSendBackToInitiatorRemarks').val(sendbacktoinitiatorRemarks);

                    $('#SavedRemarks').val(JSON.stringify(savedArray))
                    $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    document.getElementById('PackageEdit_Form_Submit').submit();
                    $('#SendBacFromkHGMLReview_Ok').prop("disabled", true);

                }
            });
        }
    }

    if (statusname == "9") {
        var flag = true;
        var approvalStatus = [];
        var PackageHeaderTableData2 = [];
        var ProjectDetails = [];
        var ProjectName = $('#ProductDescription_ProjectName').val();
        var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
        var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
        var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
        var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");

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

        $(".initiated_section").each(function (i) {
            PackageHeaderTableData2.push({

                ProjectName: $('#ProductDescription_ProjectName').val(),
                ProjectType: "3",
                Hub: $(this).find('.hub_name').text(),
                Division: $(this).find('#Division').val(),
                Category: $(this).find('.addCategoryOption').val(),
                InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                Status: "8"
            });
        });
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
            || BusinessRationalData == "" || $.isEmptyObject(SustainabilityGridValue)) {
            flag = false;
            $.isEmptyObject(BusinessValueGridData) ? $('#businessinfoMsg').prop("hidden", false) : $('#businessinfoMsg').prop("hidden", true);
            $.isEmptyObject(ProductDescriptionGridValue) ? $('#productdescriptionMsg').prop("hidden", false) : $('#productdescriptionMsg').prop("hidden", true);
            $.isEmptyObject(ExpectedPackagingGridValue) ? $('#ExpectedPackagingMsg').prop("hidden", false) : $('#ExpectedPackagingMsg').prop("hidden", true);
            BusinessRationalData == "" ? $('#ErrorIn_BusinessRational').prop("hidden", false) : $('#ErrorIn_BusinessRational').prop("hidden", true);
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
        PackageHeaderTableData2[0].Division == "" ? (flag = false, $('#Error_Pack_Division').show(), document.getElementById('Packaging_table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Pack_Division').hide();
        PackageHeaderTableData2[0].Category == "" ? (flag = false, $('#Error_pack_Category').show(), document.getElementById('Packaging_table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_pack_Category').hide();

        if (flag) {

            $('div#SendbackModal').modal('show')

            $("#SendBacFromkHGMLReview_Ok").click(function () {
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
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "8"
                    });
                });

                var ProjectDetails = [];
                ProjectDetails =
                    [{
                        ProjectName: ProjectName,
                        BusinessRational: BusinessRationalData,
                        PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                    }];
                var sendbacktoinitiatorRemarks = $('#ShowSendBackRemarks').val();
                if (sendbacktoinitiatorRemarks == "") {
                    $('#Error_SendBacktoInitiator').show();
                    return false;
                }
                else {
                    $('#packageSendBackToInitiatorRemarks').val(sendbacktoinitiatorRemarks);
                    var approvalStatus = [];
                    approvalStatus = [{
                        FromStage: 9,
                        FromStageName: "Pending for Approval",
                        Action: "Send Back",
                        ToStage: 8,
                        ToStageName: "Sent Back to Initiator"
                    }];

                    $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData2));
                    $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
                    $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
                    $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
                    $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
                    $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));
                    var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val()

                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks)
                    $('#PackStatus').val(8);
                    $('#CurrentStatus').val(9);

                    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                    $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                    $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                    document.getElementById('PackageEdit_Form_Submit').submit();
                    $('#SendBacFromkHGMLReview_Ok').prop("disabled", true);

                }
            });
        }
    }
}
$('#HgmlData_HubDropdown').on('change', function () {
    $('#Error_HgmlDataHub').hide();
})
$('#HgmlData_HubUsersDropdown').on('change', function () {
    $('#Error_HgmlDataHubUsers').hide();
})
$('#HGMLYesOrNo').on('change', function () {
    $('#Error_HGMLData').hide();
})
//SEnd back to hub

$("#ShowPackSendToHubRemarks").keyup(function () {
    $("#ShowPackSendToHubRemarks").val() == "" ? $("#Error_SendToHUb").show() : $("#Error_SendToHUb").hide();
});
function validateSendToHubForm() {

    $('#SendTohubModel_Ok').prop("disabled", false);

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );

    if (statusname == "2" || statusname == "13") {

        var flag = true;
        var approvalStatus = [];

        $('#HGMLYesOrNo').val() == '' ? ($('#Error_HGMLData').show(), flag = false, document.getElementById('Error_HGMLData').scrollIntoView({ behavior: 'smooth' })) : $('#Error_HGMLData').hide();

        if ($('#HGMLYesOrNo ').val() == 'Yes' && $('#HgmlData_HubDropdown').val() != [] && $('#HgmlData_HubUsersDropdown').val() != []) {

            flag = true;
        }
        else {
            flag = false;
        }
        var hubSelected = $('#HgmlData_HubDropdown').find('option:selected').length;
        var hubUsersSelected = $('#HgmlData_HubUsersDropdown').find('option:selected').length;

        if ($('#HGMLYesOrNo ').val() == 'Yes') {


            if (hubSelected == 0) {
                $('#Error_HgmlDataHub').show();
                flag = false;
            }
            if (hubUsersSelected == 0) {
                $('#Error_HgmlDataHubUsers').show();
                flag = false;
            }
        }

        if (hubUsersSelected != 0 && (hubSelected != hubUsersSelected)) {
            flag = false;
            $('#Error_HgmlDataHubUsers1').show();
        }
        else {
            $('#Error_HgmlDataHubUsers1').hide();
        }
        if (flag) {

            $('div#SendTohubModal').modal('show');

            $("#SendTohubModel_Ok").click(function () {

                var sendToHubRemarks = $('#ShowPackSendToHubRemarks').val();
                //
                var HUbName = $('#HgmlData_HubDropdown').val();
                var HubUser = $('#HgmlData_HubUsersDropdown').val();


                hgmlData = [{

                    Hub: HUbName.toString(),
                    HubUsers: HubUser.toString(),
                    HgmlToHubRemarks: $('.PackHGMLtoHubRemarks').val()
                }]
                if (statusname == "2") {
                    approvalStatus = [{

                        FromStage: 2,
                        FromStageName: "HGML Review",
                        Action: "Send to HUB",
                        ToStage: 3,
                        ToStageName: "HUB Review",
                        RemarksType: "HGML"
                    }];
                    $('#CurrentStatus').val(2);
                }
                if (statusname == "13") {
                    approvalStatus = [{

                        FromStage: 13,
                        FromStageName: "Brief demoted to HGML",
                        Action: "Send to HUB",
                        ToStage: 3,
                        ToStageName: "HUB Review",
                        RemarksType: "HGML"
                    }];
                    $('#CurrentStatus').val(13);
                }
                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#PackStatus').val(3);

                $('#SavedRemarks').val(JSON.stringify(savedArray))
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

                if (sendToHubRemarks == "") {
                    $('#Error_SendToHUb').show();
                    return false;
                }
                else {
                    $('#PackSendToHubRemarks').val(sendToHubRemarks)

                    document.getElementById('PackageEdit_Form_Submit').submit();

                    $('#SendTohubModel_Ok').prop("disabled", true);
                }


            });
        }
    }

    if (statusname == "4" || statusname == "14") {
        $('#SendhubModal').modal('show');
    }
}
//Send to PMD..
$("#ShowSendToPmdRemarks").keyup(function () {
    $("#ShowSendToPmdRemarks").val() == "" ? $("#Error_SendToPMD").show() : $("#Error_SendToPMD").hide();
});
function validateSendToPMDForm() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );

    $('#PackSendToPmd_Ok').prop("disabled", false);

    var flag = true;
    if (statusname == "2" || statusname == "13") {

        $('#HGMLYesOrNo').val() === '' ? ($('#Error_HGMLData').show(), flag = false, document.getElementById('Error_HGMLData').scrollIntoView({ behavior: 'smooth' })) : $('#Error_HGMLData').hide();

        var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

        if ($('#HGMLYesOrNo').val() == 'No' || $('#HGMLYesOrNo').val() == 'Yes') {
            debugger
            flag = true;
            hgmlData.length === 0 ? ($('#Error_HgmlData_Grid').show(), flag = false) : $('#Error_HgmlData_Grid').hide();
        }
        else {
            flag = false;
        }

        if (flag)
            $('div#SendToPmdModal').modal('show');

        $("#PackSendToPmd_Ok").click(function () {
            var sendToPmdRemarks = $('#ShowSendToPmdRemarks').val();
            if (statusname == "2") {
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: "HGML Review",
                    Action: "Send to PMD",
                    ToStage: 5,
                    ToStageName: "Fine Screening Review"
                }];
                $('#CurrentStatus').val(2);
            }
            if (statusname == "13") {
                approvalStatus = [{
                    FromStage: 13,
                    FromStageName: "Breif Demoted to HGML",
                    Action: "Send to PMD",
                    ToStage: 5,
                    ToStageName: "Fine Screening Review"
                }];
                $('#CurrentStatus').val(13);
            }


            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#PackStatus').val(5);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            if (sendToPmdRemarks == "") {
                $('#Error_SendToPMD').show();
                return false;
            }
            else {
                $('#PackSendToPmdRemarks').val(sendToPmdRemarks);

                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#PackSendToPmd_Ok').prop("disabled", true);
            }
        });
    }
    $("#ShowSendToPmdRemarks").keyup(function () {
        $("#ShowSendToPmdRemarks").val() == "" ? $("#Error_SendToPMD").show() : $("#Error_SendToPMD").hide();
    });
    if (statusname == "4" || statusname == "14") {
        var flag = true;
        var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
        hgmlData.length === 0 ? ($('#Error_HgmlData_Grid').show(), flag = false, document.getElementById('#Error_HgmlData_Grid').scrollIntoView({ behavior: 'smooth' })) : $('#Error_HgmlData_Grid').hide();
        if (flag) {
            $('div#SendToPmdModal').modal('show');

            $("#PackSendToPmd_Ok").click(function () {
                var sendToPmdRemarks = $('#ShowSendToPmdRemarks').val();

                if (statusname == "4") {
                    approvalStatus = [{
                        FromStage: 4,
                        FromStageName: "HGML Approve",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#CurrentStatus').val(4);
                }
                if (statusname == "14") {
                    approvalStatus = [{
                        FromStage: 14,
                        FromStageName: "Brief Demoted to HMGL",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#CurrentStatus').val(14);
                }

                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#PackStatus').val(5);

                $('#SavedRemarks').val(JSON.stringify(savedArray))
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

                if (sendToPmdRemarks == "") {
                    $('#Error_SendToPMD').show();
                    return false;
                }
                else {
                    $('#PackSendToPmdRemarks').val(sendToPmdRemarks);

                    document.getElementById('PackageEdit_Form_Submit').submit();

                    $('#PackSendToPmd_Ok').prop("disabled", true);
                }

            });
        }
    }
}
//validate Reject function 
function PackageInitiativeReject() {
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );
    $('#RejectHGMLReview_Ok').prop("disabled", false);
    $('div#RejectModal').modal('show');
    if (statusname == "2" || statusname == "13") {
        $("#RejectHGMLReview_Ok").click(function () {
            if (statusname == "2") {
                var approvalStatus = [];
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: "HGML Review",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#CurrentStatus').val(2);
            }
            if (statusname == "13") {
                var approvalStatus = [];
                approvalStatus = [{
                    FromStage: 13,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#CurrentStatus').val(13);
            }
            var sendRejectbRemarks = $('#ShowPackRejectRemarks').val();

            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));

            $('#PackStatus').val(7);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            if (sendRejectbRemarks == "") {
                $("#Error_RejectRemarks").show();
                return false;
            }
            else {
                $('#PackRejectRemarks').val(sendRejectbRemarks);

                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#RejectHGMLReview_Ok').prop("disabled", true);

            }
            $("#ShowPackRejectRemarks").keyup(function () {
                $("#ShowPackRejectRemarks").val() == "" ? $("#Error_RejectRemarks").show() : $("#Error_RejectRemarks").hide();
            });

        });
    }
    if (statusname == "4" || statusname == "14") {
        $("#RejectHGMLReview_Ok").click(function () {
            if (statusname == "4") {
                approvalStatus = [{
                    FromStage: 4,
                    FromStageName: "HGML Approve",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#CurrentStatus').val(4);
            }
            if (statusname == "14") {
                approvalStatus = [{
                    FromStage: 14,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#CurrentStatus').val(14);
            }

            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            var sendRejectbRemarks = $('#ShowPackRejectRemarks').val();

            $('#PackStatus').val(7);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            if (sendRejectbRemarks == "") {
                $("#Error_RejectRemarks").show();
            }
            else {
                $('#PackRejectRemarks').val(sendRejectbRemarks);

                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#RejectHGMLReview_Ok').prop("disabled", true);
            }
            $("#ShowPackRejectRemarks").keyup(function () {
                $("#ShowPackRejectRemarks").val() == "" ? $("#Error_RejectRemarks").show() : $("#Error_RejectRemarks").hide();
            });

        });
    }
    if (statusname == "5" || statusname == "16") {
        $("#RejectHGMLReview_Ok").click(function () {
            if (statusname == "5") {

                var approvalStatus = [];
                approvalStatus = [{
                    FromStage: 5,
                    FromStageName: "Fine Screening Review",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#CurrentStatus').val(5);
            }
            if (statusname == "16") {

                var approvalStatus = [];
                approvalStatus = [{
                    FromStage: 16,
                    FromStageName: "Extended Fine Screening Review",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#CurrentStatus').val(16);
            }

            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            var sendRejectbRemarks = $('#ShowPackRejectRemarks').val();

            $('#PackStatus').val(7);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            if (sendRejectbRemarks == "") {
                $("#Error_RejectRemarks").show();
            }
            else {
                $('#PackRejectRemarks').val(sendRejectbRemarks);

                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#RejectHGMLReview_Ok').prop("disabled", true);
            }
            $("#ShowPackRejectRemarks").keyup(function () {
                $("#ShowPackRejectRemarks").val() == "" ? $("#Error_RejectRemarks").show() : $("#Error_RejectRemarks").hide();
            });

        });
    }
}
function ValidateAcceptForm() {
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );
    $('#ByClickApprove_Ok').prop("disabled", false);
    var flag = true;
    var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
    var targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data');
    pmdData.length == 0 ? $('div#AcceptModal').modal('hide') : $('div#AcceptModal').modal('show');
    pmdData.length == 0 ? ($('#Error_PMDData').show(), flag = false, document.getElementById('Error_PMDData').scrollIntoView({ behavior: 'smooth' })) : $('#Error_PMDData').hide();
    if (flag) {
        $("#ByClickApprove_Ok").click(function () {
            if (statusname === "5") {
                approvalStatus = [{
                    FromStage: 5,
                    FromStageName: "Fine Screening Review",
                    Action: "Accepted",
                    ToStage: 6,
                    ToStageName: "Accepted"
                }];
                $('#CurrentStatus').val(5);
            }
            if (statusname == "16") {
                approvalStatus = [{
                    FromStage: 16,
                    FromStageName: "Extended Fine Screening",
                    Action: "Accepted",
                    ToStage: 6,
                    ToStageName: "Accepted"
                }];
                $('#CurrentStatus').val(16);
            }

            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
            $('#PMDData').val(JSON.stringify(pmdData));


            targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
            $('#TargetCostGridData').val(JSON.stringify(targetCostData));

            $('#PackStatus').val(6);


            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            var pmdApproveData = $('#PMDDataApprove').val();

            if (pmdApproveData == "") {
                $("#Error_AcceptModal").show();
            }
            else {
                $('#PackPMDDataApproveRemarks').val(pmdApproveData)
                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#ByClickApprove_Ok').prop("disabled", true);
            }

            $("#PMDDataApprove").keyup(function () {
                $("#PMDDataApprove").val() == "" ? $("#Error_AcceptModal").show() : $("#Error_AcceptModal").hide();
            });
        });
    }

}
// download PDF

$(".downloadPackageinitiativePdf").click(function () {
    debugger;
    var fd = new FormData();
    var ProjectId = $("#ProjectId").val();
    //var Status = $("#ProjectstatusID").val();
    var Status = statusname;
    $.ajax({
        url: ROOT + "ProjectBrief/PIDraft",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectId: ProjectId, Type: "Package", Status: Status },
        success: function (result) {
            $('.PIDraft').html(result);
            var htmldata = $(".PIDraft").html();
            fd.append('JsonString', htmldata)
            $.ajax({
                url: ROOT + 'ProjectBrief/GeneratePdfHtml',
                type: 'POST',
                dataType: 'HTML',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    window.location = window.location.origin + ROOT + 'ProjectBrief/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "Packaging Initiative"
                }
            })
        }
    })
});
//-------------------------------------------------------------------------------------------------------------------
if (statusname == "4" || statusname == "14" || statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12" || statusname == "3" && $('#ViewStatus').val() == 'View' /*|| statusname == "7"*/) {

    var GetRemarks = $.parseJSON($('#JsonPackHUBRemarksData').val());

    $('.PackProductDescriptionHGMLReamrks').html(GetRemarks.PackageProductDescriptionHGML[0] === undefined ? "" : GetRemarks.PackageProductDescriptionHGML[0].ProductDescription)

    $('.PackPackageProfileHGMLRemarks').html(GetRemarks.PackageProjectDetailsHGML[0] === undefined ? "" : GetRemarks.PackageProjectDetailsHGML[0].PackProjectDetails)

    $('.PackBusinessInformationHGMLRemarks').html(GetRemarks.PackageBusinessHGML[0] === undefined ? "" : GetRemarks.PackageBusinessHGML[0].BusinessInformation)

    $('.PackExpectedPackHGMLRemarks').html(GetRemarks.PackExpectedHGML[0] === undefined ? "" : GetRemarks.PackExpectedHGML[0].PackagingProfile)

    $('.PackSustainabilityHGMLRemarks').html(GetRemarks.PackSustainabilityHGML[0] === undefined ? "" : GetRemarks.PackSustainabilityHGML[0].PackSustainability)

    $('.PackHGMLtoHubRemarks').html(GetRemarks.PackageHGMLData[0] === undefined ? "" : GetRemarks.PackageHGMLData[0].HgmlToHubRemarks)


    if (statusname == "4" || statusname == "14" || statusname == "3" && $('#ViewStatus').val() == 'View') {

        if (GetRemarks.HgmlDataHUBParticipatingMarket.length > 0) {

            var hubParticipatingMarkets = GetRemarks.HgmlDataHUBParticipatingMarket;
            var hubParticipatingMarketsList = [];
            $.each(hubParticipatingMarkets, function (i, data) {
                hubParticipatingMarketsList.push(data.HgmlDataHUBParticipatingMarkets);
            });
            hubParticipatingMarketsList = hubParticipatingMarketsList.toString().replaceAll(',', ',');
            $('#HgmlDataParticipatingMarkets').val(hubParticipatingMarketsList);
        }
    }
    var hubApprovalData = GetRemarks['PackIsHubApproved'];

    var uniqueHubApprovalData = hubApprovalData.reduce((unique, o) => {
        if (!unique.some(obj => obj.HubName === o.HubName)) {

            unique.push(o);
        }
        return unique;
    }, []);

    var IsHubIdDivTag = "";

    $.each(uniqueHubApprovalData, function (i, data) {

        if (data.IsHubApproved == "Yes") {
            IsHubIdDivTag += `<div class="col-1 H_pad">
                                <label class="col-form-label mt-2">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" id="ParticularHUBStatus" class="form-control green mt-2" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
        }
        else if (data.IsHubApproved == "No") {
            IsHubIdDivTag += `<div class="col-1 H_pad">
                                <label class="col-form-label mt-2">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" class="form-control mt-2 red" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
        }
        else if (data.IsHubApproved == "Yet to Confirm") {
            IsHubIdDivTag += `<div class="col-1 H_pad">
                                <label class="col-form-label mt-2">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" class="form-control orange mt-2" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
        }
    });
    $('#SelectHubStatus').html(IsHubIdDivTag);

    var BusinessinfoBusinessData = GetRemarks["PackageBusinessInfo"];
    if (BusinessinfoBusinessData != '') {
        var HubRemarks = BusinessinfoBusinessData.reduce((unique, o) => {
            if (!unique.some(obj => obj.HubName === o.HubName)) {

                unique.push(o);
            }
            return unique;
        }, []);
        var BusinessInformationSpanTag = "";

        $.each(HubRemarks, function (i, data) {

            BusinessInformationSpanTag += '<span class="hub_view" id="' + data.HubName + 'PackageBusinessInfo" data-bs-toggle="modal" data-bs-target="#BusinessInformationGrid" onclick="BusinessInformatonData(\'' + data.HubName + '\')" > ' + data.HubName + ' Business Information</span >';
        });
    }
    $('#PackBusinessInfoInitiatorRemarksLink').text("" + GetData.PackageHeader[0].Hub + " " + $('#PackBusinessInfoInitiatorRemarksLink').text() + "");
    $('#PackBusinessInfoInitiatorRemarksLink_PV').text("" + GetData.PackageHeader[0].Hub + " " + $('#PackBusinessInfoInitiatorRemarksLink').text() + "");
    $("#BusinessInfoSpanTag").html(BusinessInformationSpanTag);
    $("#BusinessInfoSpanTag_PV").html(BusinessInformationSpanTag);
    var businessInformationBasedOnHub = [];
    function BusinessInformatonData(HubName) {
        var BusinessinfoBusinessData = GetRemarks["PackageBusinessInfo"];
        var HubRemarks = $.grep(GetRemarks['PackageBusinessInfo'], function (e) {
            return e.HubName != null;
        });
        $.each(HubRemarks, function (i, data) {
            businessInformationBasedOnHub = [];
            if (data.HubName == HubName) {
                $.each(HubRemarks, function (i, data) {
                    if (data.HubName == HubName) {
                        businessInformationBasedOnHub.push(data);
                    }
                });
                $('.GetHubName').text(HubName + " " + "Business Information");
                $('#BusinessInformationGrid').modal('show');

                $("#HUBRemarksbusiness_Info").jqGrid("clearGridData");
                $("#HUBRemarksbusiness_Info").jqGrid('setGridParam', { data: businessInformationBasedOnHub });
                $("#HUBRemarksbusiness_Info").trigger('reloadGrid', [{ page: 1 }]);
            }
        });
    }
}
if (statusname == "4" || statusname == "14" || statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12" || statusname == "3" && $('#ViewStatus').val() == 'View' /*|| statusname == "7"*/) {
    colmodels =
        [
            {
                name: 'Product',
                label: 'Product',
                width: 200,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.Product + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'SKU',
                label: 'SKU',
                width: 150,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.SKU + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'ProposeLaunchDate',
                label: 'Proposed Launch Date',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.ProposeLaunchDate + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'ProposedSellingPrice',
                label: 'Proposed Selling Price',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.ProposedSellingPrice + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'ProposedTP',
                label: 'Expected COP',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.ProposedTP + '" readonly="" >' +
                        '</div>';
                }
            },
            {
                name: 'ProposedMRP',
                label: 'Proposed MRP',
                width: 130,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.ProposedMRP + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'Currency',
                label: 'Currency',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.Currency + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'ExpectedGP',
                label: 'Expected GP % ',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.ExpectedGP + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'BusinessValue',
                label: 'Business Value',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.BusinessValue + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'M1Quantity',
                label: 'M1 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.M1Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'M2Quantity',
                label: 'M2 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.M2Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'M3Quantity',
                label: 'M3 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.M3Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'M4Quantity',
                label: 'M4 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.M4Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'M5Quantity',
                label: 'M5 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.M5Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'M6Quantity',
                label: 'M6 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.M6Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'Y1Quantity',
                label: 'Y1 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.Y1Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'Y2Quantity',
                label: 'Y2 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.Y2Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'Y3Quantity',
                label: 'Y3 Quantity',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.Y3Quantity + '" readonly="">' +
                        '</div>';
                }
            },
            {
                name: 'UOM',
                label: 'UOM',
                width: 120,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control" value="' + rowobject.UOM + '" readonly="">' +
                        '</div>';
                }
            },
        ],
        $("#HUBRemarksbusiness_Info").jqGrid({
            url: '',
            datatype: 'local',
            data: [],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_HUBRemarksBusiness_Info',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#HUBRemarksbusiness_Info tbody tr");
                var objHeader = $("#HUBRemarksbusiness_Info tbody tr td");

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
}

// -------------------------------------------------------------
if (statusname == "4" || statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12" || /*statusname == "7" ||*/ statusname == "3" && $('#ViewStatus').val() == 'View' || statusname == "14") {

    var GetRemarks = $.parseJSON($('#JsonPackHUBRemarksData').val());
    colmodels = [

        {
            name: 'HUBName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'ProductDescription',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },

    ],

        $("#product_descriptionHUBRemarksGrid").jqGrid({
            url: '',
            datatype: 'local',
            data: GetRemarks['PackageProductDescriptionHUB'] == undefined ? [] : GetRemarks['PackageProductDescriptionHUB'],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_product_descriptionHUBRemarksGrid',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#product_descriptionHUBRemarksGrid tbody tr");
                var objHeader = $("#product_descriptionHUBRemarksGrid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });

    $("#product_descriptionHUBRemarksGrid_PV").jqGrid({
        url: '',
        datatype: 'local',
        data: GetRemarks['PackageProductDescriptionHUB'] == undefined ? [] : GetRemarks['PackageProductDescriptionHUB'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_product_descriptionHUBRemarksGrid_PV',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#product_descriptionHUBRemarksGrid_PV tbody tr");
            var objHeader = $("#product_descriptionHUBRemarksGrid_PV tbody tr td");

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

    //-----------------------------------------------------------------------------------------------------------------


    colmodels = [
        {
            name: 'HUBName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'PackagingProfile',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },

    ],

        $("#ExpectedPackHUBRemarksGridData").jqGrid({
            url: '',
            datatype: 'local',
            data: GetRemarks['PackExpectedHUB'] == undefined ? [] : GetRemarks['PackExpectedHUB'],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_ExpectedPackHUBRemarksGridData',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#ExpectedPackHUBRemarksGridData tbody tr");
                var objHeader = $("#ExpectedPackHUBRemarksGridData tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
    $("#ExpectedPackHUBRemarksGridData_PV").jqGrid({
        url: '',
        datatype: 'local',
        data: GetRemarks['PackExpectedHUB'] == undefined ? [] : GetRemarks['PackExpectedHUB'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_ExpectedPackHUBRemarksGridData_PV',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#ExpectedPackHUBRemarksGridData_PV tbody tr");
            var objHeader = $("#ExpectedPackHUBRemarksGridData_PV tbody tr td");

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
    //-------------------------------------------------------------------------------------------------------------
    colmodels = [

        {
            name: 'HUBName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'PackProjectDetails',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },
    ],

        $("#BusinessRationalHUBRemarksGrid").jqGrid({
            url: '',
            datatype: 'local',
            data: GetRemarks['PackageProjectDetailsHUB'] == undefined ? [] : GetRemarks['PackageProjectDetailsHUB'],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_BusinessRationalHUBRemarksGrid',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#BusinessRationalHUBRemarksGrid tbody tr");
                var objHeader = $("#BusinessRationalHUBRemarksGrid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
    $("#BusinessRationalHUBRemarksGrid_PV").jqGrid({
        url: '',
        datatype: 'local',
        data: GetRemarks['PackageProjectDetailsHUB'] == undefined ? [] : GetRemarks['PackageProjectDetailsHUB'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_BusinessRationalHUBRemarksGrid_PV',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#BusinessRationalHUBRemarksGrid tbody tr");
            var objHeader = $("#BusinessRationalHUBRemarksGrid tbody tr td");

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
    //-------------------------------------------------------------------------------------------------------------------

    colmodels = [
        {
            name: 'HUBName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'BusinessInformation',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },
    ],

        $("#business_infoHUBRemarksGrid").jqGrid({
            url: '',
            datatype: 'local',
            data: GetRemarks['PackageBusinessHUB'] == undefined ? [] : GetRemarks['PackageBusinessHUB'],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_business_infoHUBRemarksGrid',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#business_infoHUBRemarksGrid tbody tr");
                var objHeader = $("#business_infoHUBRemarksGrid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
    $("#business_infoHUBRemarksGrid_PV").jqGrid({
        url: '',
        datatype: 'local',
        data: GetRemarks['PackageBusinessHUB'] == undefined ? [] : GetRemarks['PackageBusinessHUB'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_business_infoHUBRemarksGrid_PV',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#business_infoHUBRemarksGrid_PV tbody tr");
            var objHeader = $("#business_infoHUBRemarksGrid_PV tbody tr td");

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

    //--------------------


    colmodels = [
        {
            name: 'HUBName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'PackSustainability',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },

    ],

        $("#SustainabilityHUBRemarksGridData").jqGrid({
            url: '',
            datatype: 'local',
            data: GetRemarks['PackageSustainabilityHUB'] == undefined ? [] : GetRemarks['PackageSustainabilityHUB'],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_SustainabilityHUBRemarksGridData',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#SustainabilityHUBRemarksGridData tbody tr");
                var objHeader = $("#SustainabilityHUBRemarksGridData tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
    $("#SustainabilityHUBRemarksGridData_PV").jqGrid({
        url: '',
        datatype: 'local',
        data: GetRemarks['PackageSustainabilityHUB'] == undefined ? [] : GetRemarks['PackageSustainabilityHUB'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_SustainabilityHUBRemarksGridData_PV',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#SustainabilityHUBRemarksGridData_PV tbody tr");
            var objHeader = $("#SustainabilityHUBRemarksGridData_PV tbody tr td");

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
    //--------------------
    colmodels = [
        {
            name: 'HubName',
            label: 'HUB',
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'HgmlDataHUBParticipatingMarkets',
            label: 'Participating Markets',
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'PackageHGMLDataORHUBRemarks',
            label: 'Remarks',
            resizable: true,
            ignoreCase: true
        }
    ];

    var PM_List = GetRemarks.HgmlDataHUBParticipatingMarket

    var RowIdHGML = 0;
    var EditRowIdHGML = 0;
    var isvalid = true;
    $("#HUB_ParticipatingMarkets").jqGrid({
        url: '',
        datatype: 'local',
        data: GetRemarks.HgmlDataHUBParticipatingMarket,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        rowNum: 20,
        scroll: true, gridComplete: function () {
            var objRows = $("#HUB_PartcipatingMarkets tbody tr");
            var objHeader = $("#HUB_PartcipatingMarkets tbody tr td"); if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#HUB_ParticipatingMarkets_PV").jqGrid({
        url: '',
        datatype: 'local',
        data: GetRemarks.HgmlDataHUBParticipatingMarket,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        rowNum: 20,
        scroll: true,
        gridComplete: function () {
            var objRows = $("#HUB_ParticipatingMarkets_PV tbody tr");
            var objHeader = $("#HUB_ParticipatingMarkets_PV tbody tr td"); if (objRows.length > 1) {
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



    //-----------
    colmodels1 = [
        {
            name: 'Action',
            label: 'Action',
            width: 40,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="text-center action_icons icon_section align-items-left">
            <a onclick = onEditHgmlData(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
            <a onclick = onDeleteHgmlData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
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
            name: 'ProjectCategorization',
            label: 'Project Categorization',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Remarks',
            label: 'Remarks',
            resizable: true,
            ignoreCase: true,
        },
    ]

    if (GetData['PackageHGMLData'] == undefined) {
        var data1 = []
    }
    else {
        var data1 = $.grep(GetData['PackageHGMLData'], function (e) {
            return e.ProductName != null;
        });
    }

    $("#HGML_Data").jqGrid({
        url: '',
        datatype: 'local',
        data: data1,
        mtype: 'GET',
        colModel: colmodels1,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_HGML',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#HGML_Data tbody tr");
            var objHeader = $("#HGML_Data tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            if (statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12" || statusname == "14" && $('#ViewStatus').val() == 'View') {
                jQuery("#HGML_Data").jqGrid('hideCol', "Action");
            }
        }

    });
    $("#HGML_Data_PV").jqGrid({
        url: '',
        datatype: 'local',
        data: data1,
        mtype: 'GET',
        colModel: colmodels1,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_HGML_PV',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#HGML_Data_PV tbody tr");
            var objHeader = $("#HGML_Data_PV tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            jQuery("#HGML_Data_PV").jqGrid('hideCol', "Action");

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
}

//--------------------------------------------------------------------------------------------------------
if (statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12") {

    $('.data-datepicker-monthyear').datepicker({
        format: 'M/yyyy',
        viewMode: 'months',
        minViewMode: 'months',
        todayHighlight: true,
        autoclose: true,
        startDate: '+30'
    });

    var GetPMDReview = $.parseJSON($('#JsonPMDReview').val());
    fineScreeningData = $.parseJSON($('#JsonPMDReview').val());

    $('.PackProductDescription_PMDReamrks').html(GetPMDReview.PackageProductDescriptionPMD[0] === undefined ? "" : GetPMDReview.PackageProductDescriptionPMD[0].ProductDescription)

    $('.PackPackageProfilePMDRemarks').html(GetPMDReview.PackageProjectDetailsPMD[0] === undefined ? "" : GetPMDReview.PackageProjectDetailsPMD[0].PackProjectDetails)

    $('.PackBusinessInformation_PMDRemarks').html(GetPMDReview.PackageBusinessPMD[0] === undefined ? "" : GetPMDReview.PackageBusinessPMD[0].BusinessInformation)

    $('.PackExpectedPack_PMDRemarks').html(GetPMDReview.PackExpectedPMD[0] === undefined ? "" : GetPMDReview.PackExpectedPMD[0].PackagingProfile)

    $('.PackSustainabilityPMDRemarks').html(GetPMDReview.PackSustainabilityPMD[0] === undefined ? "" : GetPMDReview.PackSustainabilityPMD[0].PackSustainability)


    colmodels = [
        {
            name: 'Action',
            label: 'Action',
            width: 90,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return '<div class="text-center action_icons icon_section align-items-left">' +
                    '<a onclick=OnEditPmdData(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen pr-2 color-info" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                    '<a onclick=OnDeletePmdData(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                    '</div> ';
            }

        },
        {
            name: 'ProductName',
            label: 'Product Name',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'ComplexityToBeAssigned',
            label: 'Complexity to be Assigned ',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'RandDName',
            label: 'R&D Name ',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Remarks',
            label: 'Remarks',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'ProjectLead',
            label: 'Project Lead',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TargetFirstPrototypeSubmissionDate',
            label: 'Target 1st Prototype submission date',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TargetTTDCompletionDate',
            label: 'Target TTD completion date',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TargetProductionDate',
            label: 'Target production date',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'MajorRiskIfAny',
            label: 'Major Risk if any',
            resizable: true,
            ignoreCase: true,
        },
    ],
        $("#PMD_Data").jqGrid({
            url: '',
            datatype: 'local',
            data: GetPMDReview['PackagePmdData'] == undefined ? [] : GetPMDReview['PackagePmdData'],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_PMD',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#PMD_Data tbody tr");
                var objHeader = $("#PMD_Data tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
                if (statusname == "6" && $('#ViewStatus').val() == 'View' || statusname == "5" && $('#ViewStatus').val() == 'View' || statusname == "16" && $('#ViewStatus').val() == 'View' || statusname == "12" && $('#ViewStatus').val() == 'View') {
                    jQuery("#PMD_Data").jqGrid('hideCol', "Action");
                }

            }
        });
    $("#PMD_Data_PV").jqGrid({
        url: '',
        datatype: 'local',
        data: GetPMDReview['PackagePmdData'] == undefined ? [] : GetPMDReview['PackagePmdData'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_PMD',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#PMD_Data_PV tbody tr");
            var objHeader = $("#PMD_Data_PV tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            jQuery("#PMD_Data_PV").jqGrid('hideCol', "Action");

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

}

var EditRowId = 0;

$("#PMDDataProduct_Product").keyup(function () {
    $("#PMDDataProduct_Product").val() == "" ? $("#ErrorIn_PMDProductName").show() : $("#ErrorIn_PMDProductName").hide();
});

$('#PMDDataProduct_Product').change(function () {

    var productName = $("#PMDDataProduct_Product").val();
    productName == "" ? ($("#ErrorIn_PMDProductName").show().text('Please select Product')) : $("#ErrorIn_PMDProductName").text('');

    const productList = $("#PMD_Data").jqGrid("getCol", "ProductName");

    if (productName != "") {

        productList.includes(productName) ? ($("#Error_PmdData_ProductName").show().text('This Product already consists the definition, Please select the different Product')) : $("#Error_PmdData_ProductName").hide().text('');
    }
});

$("#PMDProjectCategorization").change(function () {
    $("#PMDProjectCategorization").val() == "" ? $("#ErrorInPMDProjectCategorization").show() : $("#ErrorInPMDProjectCategorization").hide();
});
$("#PMDComplexitytobeAssigned").change(function () {
    $("#PMDComplexitytobeAssigned").val() == "" ? $("#ErrorInPMDComplexitytobeAssigned").show() : $("#ErrorInPMDComplexitytobeAssigned").hide();
});
$("#PMD_R_and_DName").change(function () {
    $("#PMD_R_and_DName").val() == "" ? $("#ErrorInPMD_R_and_DName").show() : $("#ErrorInPMD_R_and_DName").hide();
});

$("#PMDData_Remarks").keyup(function () {
    $("#PMDData_Remarks").val() == "" ? $("#ErrorInPMDRemarks").show() : $("#ErrorInPMDRemarks").hide();
});

$("#PMDData_ProjectLead").keyup(function () {
    $("#PMDData_ProjectLead").val() == "" ? $("#Error_Lead").show() : $("#Error_Lead").hide();
});


$("#PMDData_ProjectLead").val($("#UserName").val());

$("#ToAddPMDData").click(function () {

    var productName = $("#PMDDataProduct_Product").val();
    var ComplexitytobeAssigned = $("#PMDComplexitytobeAssigned").val();
    var RandDName = $.trim($("#PMD_R_and_DName").val());
    var PackPMDRemarks = $.trim($("#PMDData_Remarks").val());
    var ProjectLead = $.trim($("#PMDData_ProjectLead").val());
    var flag = true;

    if (productName == "" || ComplexitytobeAssigned == "" || RandDName == "" || PackPMDRemarks == "" || ProjectLead == "") {
        flag = false;

        productName == "" ? ($("#ErrorIn_PMDProductName").show().text('Please select Product')) : $("#Error_PmdData_ProductName").hide().text('');
        ComplexitytobeAssigned == "" ? $("#ErrorInPMDComplexitytobeAssigned").show() : $("#ErrorInPMDComplexitytobeAssigned").hide();
        RandDName == "" ? $("#ErrorInPMD_R_and_DName").show() : $("#ErrorInPMD_R_and_DName").hide();
        PackPMDRemarks == "" ? $("#ErrorInPMDRemarks").show() : $("#ErrorInPMDRemarks").hide();
        ProjectLead == "" ? $("#Error_Lead").show() : $("#Error_Lead").hide();
    }

    if (flag) {

        var gridData = [];
        var pmdData = {};

        $('.Error_HgmlData').hide();

        pmdData = {
            ProductName: productName,
            ComplexityToBeAssigned: ComplexitytobeAssigned,
            RandDName: RandDName,
            Remarks: PackPMDRemarks,
            ProjectLead: $.trim($("#PMDData_ProjectLead").val()),
            TargetFirstPrototypeSubmissionDate: $.trim($("#PMDData_Target1stPrototypeSubmissionDate").val()),
            TargetTTDCompletionDate: $.trim($("#PMDData_TargetTTDCompletionDate").val()),
            TargetProductionDate: $.trim($("#PMDData_TargetProductionDate").val()),
            MajorRiskIfAny: $.trim($("#PMDData_MajorRiskIfAny").val())
        }

        if (EditRowId == 0) {

            gridData.push(pmdData);
            var HD1 = $("#PMD_Data").jqGrid('getGridParam', 'data');
            var HD2 = $.merge(HD1, gridData);
            $("#PMD_Data").jqGrid('setGridParam', { data: HD2 });
            $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);
            $("#PMD_Data_PV").jqGrid('setGridParam', { data: HD2 });
            $("#PMD_Data_PV").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            $("#PMD_Data").jqGrid('setRowData', EditRowId, pmdData);
            $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);
            $("#PMD_Data_PV").jqGrid('setRowData', EditRowId, pmdData);
            $("#PMD_Data_PV").trigger('reloadGrid', [{ page: 1 }]);
            EditRowId = 0;
        }


        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('.data-datepicker-monthyear').datepicker('setDate', today);

        $('.PMdData').val("");


        $("#PMDData_ProjectLead").val($("#UserName").val());

        var productList = $("#PMD_Data").jqGrid("getCol", "ProductName");


        productDescriptionProductNameList = jQuery('#product_description').jqGrid("getCol", "ProductName");
        pmdDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        $("option").remove("#PMDDataProduct_Product .ProductOption");

        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $.each(pmdDataProductNameList, function (i, obj) {
                //
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PMDDataProduct_Product").append(productOption);
        }
        $("#Error_PMDData").hide();
    }
});

//On Clicking the edit button 
function OnEditPmdData(RowId) {
    //
    EditRowId = RowId;

    var DataFromTheRow = jQuery('#PMD_Data').jqGrid('getRowData', RowId);

    var productList = $("#PMD_Data").jqGrid("getCol", "ProductName");

    pmdDataProductNameList = $.grep(pmdDataProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    pmdDataProductNameList.push(DataFromTheRow.ProductName);

    $("option").remove("#PMDDataProduct_Product .ProductOption");

    if (pmdDataProductNameList.length > 0) {

        var productOption = "";

        $.each(pmdDataProductNameList, function (i, obj) {

            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });

        $("#PMDDataProduct_Product").append(productOption);
    }


    $("#PMDDataProduct_Product").val(DataFromTheRow.ProductName);
    $("#PMDComplexitytobeAssigned").val(DataFromTheRow.ComplexityToBeAssigned);
    $("#PMD_R_and_DName").val(DataFromTheRow.RandDName);
    $("#PMDData_Remarks").val(DataFromTheRow.Remarks);
    $("#PMDData_ProjectLead").val(DataFromTheRow.ProjectLead);

    $("#PMDData_Target1stPrototypeSubmissionDate").val(DataFromTheRow.TargetFirstPrototypeSubmissionDate);
    $('#PMDData_Target1stPrototypeSubmissionDate').datepicker('setDate', DataFromTheRow.TargetFirstPrototypeSubmissionDate);

    $("#PMDData_TargetTTDCompletionDate").val(DataFromTheRow.TargetTTDCompletionDate);
    $('#PMDData_TargetTTDCompletionDate').datepicker('setDate', DataFromTheRow.TargetTTDCompletionDate);

    $("#PMDData_TargetProductionDate").val(DataFromTheRow.TargetProductionDate);
    $('#PMDData_TargetProductionDate').datepicker('setDate', DataFromTheRow.TargetProductionDate);

    $("#PMDData_MajorRiskIfAny").val(DataFromTheRow.MajorRiskIfAny);
}

//On deleting the row data
function OnDeletePmdData(RowId) {

    confirm(" Are you sure you want to delete?", function () {

        $("#PMD_Data").jqGrid('delRowData', RowId);
        $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);
        $("#PMD_Data_PV").jqGrid('delRowData', RowId);
        $("#PMD_Data_PV").trigger('reloadGrid', [{ page: 1 }]);
        EditRowId = 0;

        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('.data-datepicker-monthyear').datepicker('setDate', today);

        $('.PMdData').val("");

        var productList = $("#PMD_Data").jqGrid("getCol", "ProductName");
        productDescriptionProductNameList = $("#product_description").jqGrid("getCol", "ProductName");
        pmdDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
        //pmdDataProductNameList.push(DataFromTheRow.ProductName);

        $("option").remove("#PMDDataProduct_Product .ProductOption");

        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $.each(pmdDataProductNameList, function (i, obj) {
                //
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PMDDataProduct_Product").append(productOption);
        }
    });
}

$("#PackHubApprove").change(function () {

    if ($('#PackHubApprove').val() != "") {
        $("#PackHubApprove").val() == "" ? $("#spanhubApprove").show() : $("#spanhubApprove").hide();
    }
});


colModel = [
    {
        name: 'Action',
        resizable: true,
        width: 70,
        label: 'Action',
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
            <a onclick = onDeleteHubApproveData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
        </div>`;
        }

    },
    {
        name: 'HubName',
        resizable: true,
        width: 70,
        label: 'Hub Name',
        ignoreCase: true,

    },
    {
        name: 'HubUser',
        resizable: true,
        width: 80,
        label: 'Hub User',
        ignoreCase: true,

    },
    {
        name: 'Remarks',
        resizable: true,
        width: 80,
        label: 'Remarks',
        ignoreCase: true,

    },

],
    $("#prd_desc1").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        colModel: colModel,
        pager: '#pager_expected1',
        viewrecords: true,
        sortorder: "asec",

        gridComplete: function () {
            var objRows = $("#prd_desc1 tbody tr");
            var objHeader = $("#prd_desc1 tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });


$('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'height': '30vh' });

var $TableHeight1 = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight1 > 290) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px")
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")

}

function onDeleteHubApproveData(RowId) {
    //
    $("#prd_desc1").jqGrid('delRowData', RowId);
    $("#prd_desc1").trigger('reloadGrid', [{ page: 1 }]);
}


$("#HgmlData_HubDropdownApprove").change(function () {


    $('#Error_HgmlDataHubApprove').hide();
    $('#Error_HgmlDataHubUsersApprove').hide();


    var HubUser = $("#HgmlData_HubDropdownApprove").val();


    var userEmailList;
    if (HubUser == '') {
        userEmailList = '<option value="">None Selected</option>';
    }
    else {
        userEmailList = '<option value="' + HubUser + '">' + HubUser + '</option>';
    }

    $("#HgmlData_HubUsersDropdownApprove").html(userEmailList);
    $('#HgmlData_HubUsersDropdownApprove').multiselect('rebuild');

});

$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/GetHubApprovalData",
        data: { projectId: GetData.ProjectDetails[0].ProjectId },
        dataType: "json",
        success: function (Result) {

            if (Result.ApprovalData != null) {
                $("option").remove(".HubUsersOption");
                var hubList = '<option value="">None Selected</option>'
                $.each(Result.ApprovalData, function (i, obj) {
                    hubList += '<option class="HubUsersOption" value="' + obj.HubUser + '">' + obj.HubName + '</option>';
                })

                $("#HgmlData_HubDropdownApprove").html(hubList);

                $("#HgmlData_HubDropdownApprove").multiselect('rebuild');

            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

});

var ProductDescriptionEditRowId = 0;

$('#sendHubHgmlApproveAddbBtn').click(function () {

    var flag = true;
    var allData = $('#prd_desc1').jqGrid('getGridParam', 'data');
    var HubUser = $("#HgmlData_HubDropdownApprove").val();


    $.each(allData, function (i, item) {
        if (item.HubUser == HubUser) {
            $('#HubDupErr').show();
            flag = false;
        }
        else {
            $('#HubDupErr').hide();
        }
    });
    var remarks = $('#SendHubApproveRemarks').val();
    var user = $('#HgmlData_HubUsersDropdownApprove option:selected').val();
    var hub = $('#HgmlData_HubDropdownApprove option:selected').text();

    if (user === "" || hub === "None Selected") {

        hub === "None Selected" ? ($('#Error_HgmlDataHubApprove').show(), flag = false) : $('#Error_HgmlDataHubApprove').hide()
        user === "" ? ($('#Error_HgmlDataHubUsersApprove').show(), flag = false) : $('#Error_HgmlDataHubUsersApprove').hide()
    }
    if (flag) {
        var gridDataHub = [];
        HubData = {
            HubName: hub,
            HubUser: user,
            Remarks: remarks,
        }

        if (ProductDescriptionEditRowId == 0) {
            //
            gridDataHub.push(HubData);
            var PD1 = $("#prd_desc1").jqGrid('getGridParam', 'data');
            var PD2 = $.merge(PD1, gridDataHub);
            $("#prd_desc1").jqGrid('setGridParam', { data: PD2 });
            $("#prd_desc1").trigger('reloadGrid', [{ page: 0 }]);
            $("#HgmlData_HubDropdownApprove").val("").multiselect("refresh");
            $("#HgmlData_HubUsersDropdownApprove").val("").multiselect("refresh");
            $("#SendHubApproveRemarks").val("");

        }
    }

});

function HgmlApproveSendToHub() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );

    var hubGridData = $('#prd_desc1').jqGrid('getGridParam', 'data');

    if (hubGridData.length != 0) {
        var hubData = $('#prd_desc1').jqGrid('getGridParam', 'data');

        if (statusname == "4") {
            approvalStatus = [{
                FromStage: 4,
                FromStageName: "HGML Approve",
                Action: "Send from HGML Approve",
                ToStage: 3,
                ToStageName: "HUB Review"
            }];
            $('#CurrentStatus').val(4);
        }
        if (statusname == "14") {
            approvalStatus = [{
                FromStage: 14,
                FromStageName: "Brief Demoted to HGML",
                Action: "Send from HGML Approve",
                ToStage: 3,
                ToStageName: "HUB Review"
            }];
            $('#CurrentStatus').val(14);
        }

        var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
        $('#HgmlData').val(JSON.stringify(hgmlData));
        $('#JsonPackHgmlToHubData').val(JSON.stringify(hubData));
        $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
        $('#PackStatus').val(3);

        $('#SavedRemarks').val(JSON.stringify(savedArray));
        $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

        document.getElementById('PackageEdit_Form_Submit').submit();

    }
    else {
        $('#Error_HubGridData').show()
    }

}

function validatePmdReviewSendMailForm() {

    $('#PmdReview_SendMail_Button').prop("disabled", false);

    $('#sendMailModal').modal('show');
}
$("#PMDReviewDivision").change(function () {
    var DivId = $("#PMDReviewDivision").val().toString();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/GetUsersBasedOnDevision",
        data: { divisionId: DivId },
        dataType: "json",
        success: function (sendMailData) {
            if (sendMailData != null) {

                var hubUserEmailList = "";
                $("option").remove(".HubUserOption");
                $.each(sendMailData, function (i, data) {

                    hubUserEmailList += '<option class="HUserOption" value="' + data.HubUser + '" selected>' + data.HubName + " - " + data.HubUser + '</option>'
                });

                $("#PmdReview_SendMail_HubUser_Dropdown").html(hubUserEmailList);
                $('#PmdReview_SendMail_HubUser_Dropdown').multiselect('rebuild');
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
    $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('');
});

$('#PmdReview_SendMail_Button').click(function () {

    var flag = true;
    var PmdReview_SelectedUsers = $("#PmdReview_SelectedUsers").val();
    var pmdDivision = $("#PMDReviewDivision").val();
    PmdReview_SelectedUsers == '' ? ($('#Error_PmdReview_SendMail_HubUser_Dropdown').text('Please select users'), flag = false) : $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('');

    if (flag) {

        $('#PmdReview_SendMail_Button').prop("disabled", true);

        downloaddocfile();
        $('#sendMailModal').modal('hide');

    }

});
$('#Add_PmdReview_SendMailUser').click(function () {
    $('#Error_PmdReview_Users').text('');
    var previousValue = $('#PmdReview_SelectedUsers').val();
    var newValue = $("#PmdReview_SendMail_HubUser_Dropdown").val();
    var previousValueArray = previousValue.split(',');
    var concatenatedValue = previousValue;
    var newValueArray = $.map($.trim(newValue).split(','), $.trim);
    var previousValueArray = previousValue.split(',').map(function (value) {
        return $.trim(value)
    });
    var valuesToAdd = newValueArray.filter(function (value) {
        return !previousValueArray.includes(value);
    });
    if (valuesToAdd.length > 0) {
        if (previousValueArray == "") {
            concatenatedValue = valuesToAdd
        }
        else {
            concatenatedValue = previousValueArray.concat(valuesToAdd).join(',');
        }
    }
    if (valuesToAdd.length <= 0 && $('#PmdReview_SelectedUsers').val() != '') {
        $('#Error_PmdReview_Users').text('User already added');
    }
    else {

        if ($("#PmdReview_SendMail_HubUser_Dropdown").val() != '') {
            $('#PmdReview_SelectedUsers').val(concatenatedValue);
            $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('');
            $("#PmdReview_SendMail_HubUser_Dropdown").val("").multiselect('rebuild');
        }
        else {
            $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('Please select users');
        }
    }
});
$("#PmdReview_SendMail_HubUser_Dropdown").change(function () {
    $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('');
});


function downloaddocfile() {
    var PmdReview_SelectedUsers = $("#PmdReview_SelectedUsers").val();
    var PmdReview_SendMail_Remarks = $("#PmdReview_SendMail_Remarks").val()
    var fd = new FormData();
    var ProjectId = $('#ProjectId').val();
    var Status = statusname;


    $.ajax({
        url: ROOT + "ProjectBrief/Header",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectId: ProjectId, Type: "Package" },
        success: function (result) {
            $('.Header').html(result);
            var htmlHeaderdata = $(".Header").html();
            fd.append('JsonHeaderString', htmlHeaderdata)
            $.ajax({
                url: ROOT + "ProjectBrief/PIDraft",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "Package", Status: Status },
                success: function (result) {

                    $('.PIDraft').html(result);
                    var htmldata = $(".PIDraft").html();
                    fd.append('JsonString', htmldata)
                    $.ajax({
                        url: ROOT + 'ProjectBrief/GeneratePdfHtml',
                        type: 'POST',
                        dataType: 'HTML',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            $.ajax({
                                url: ROOT + 'ProjectBrief/GeneratePdfforSendmail?toMailids=' + PmdReview_SelectedUsers + '&remarks=' + PmdReview_SendMail_Remarks + '&ProjectId=' + ProjectId,
                                type: 'POST',
                                success: function () {

                                }

                            })
                        },

                        error: (error) => { console.log(JSON.stringify(error)) }
                    })
                },

                error: (error) => { console.log(JSON.stringify(error)) }
            })
        }
    })
}

function canceledData() {
    $(".cancelThisData").val("");
}

$(window).on('hidden.bs.modal', function () {
    $('.cancelThisData').val("");
    $('#HgmlData_HubDropdownApprove').val("").multiselect('refresh');
    $('#HgmlData_HubUsersDropdownApprove').val("").multiselect('refresh');
    $('.Error_closeModal').text('');
    $('.FieldRemarks').val('');
    $('#PMDReviewDivision').val('').multiselect('rebuild')
    $("#PmdReview_SendMail_HubUser_Dropdown").val("").multiselect('rebuild');
    $('#PmdReview_SendMail_Remarks').val('');
    $('#PmdReview_SelectedUsers').val('');
    $('.daydatepicker').val('');
    $('#Error_SendToPMD').hide();

    $('#HgmlData_Other_HubDropdownApprove').val("").multiselect('refresh');
    $('#HgmlData_Other_HubUsersDropdownApprove').val("").multiselect('refresh');
    $('#SendOtherHubApproveRemarks').val('');
    $("#OtherHubs").jqGrid('clearGridData', true);
    $("#prd_desc1").jqGrid('clearGridData', true);

    $('#DueDate').val('');
    $('#PMDDataExp').val('');
    $('.errorshow').hide();
    $('#Error_Daypicker').hide();

});

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

// to get the view 
if ($('#ViewStatus').val() == 'View') {


    if (statusname === "2" || statusname === "13") {
        if (statusname === "2") {
            $('#statusHeader').text("Packaging Initiative-HGML Review");
        }
        if (statusname === "13") {
            $('#statusHeader').text("Packaging Initiative-Brief Demoted to HGML");
        }

        $('.ViewFieldHUBRemarks,.ViewFieldPMDRemarks').hide();
        $('.ViewOnly').attr('readonly', true);
        $('.ViewOnly').attr('disabled', true);
        $('.HubUsersOption').find('input[type=checkbox]').prop("disabled", true);
        $('.ViewFieldHubGrid').hide();
        $('.ViewModePMD').hide();
        $('.ViewFieldHubStatus').hide();
        $('.ViewPMDHGMLData').hide();
        $('.ViewPmdData2').hide();
        $('.PMDHGML_HUbRemarks').hide();
        $('.pmdinapprove').hide();
        $('.onlyforHubReview').hide();
        $('.hubbusinessinfoView').hide();
        $('.forhubonly').hide();
        $('#HgmlData_HubDropdown').attr('disabled', true);
        $('#HgmlData_HubUsersDropdown').attr('disabled', true);
        $('#InitiatorRemarks').attr('readonly', true);
        $('.onlyfor8').hide();

        $(".multiselect_disabled .multiselect").prop('disabled', true);
    }
    if (statusname === "3") {
        $('#statusHeader').text("Packaging Initiative-HUB Review");
        $('.ViewFieldPMDRemarks').hide();
        $('.ViewMode1').attr('readonly', true);
        $('.ViewOnly').attr('readonly', true);
        $('.ViewModePMD').hide();
        $('.ViewPMDHGMLData').hide();
        $('.HGMLDataNo').hide();
        $('.ViewPmdData2').hide();
        $('.ViewModeField').hide();
        $('.PMDHGML_HUbRemarks').hide();
        $('.H_HData').attr("readonly", true);
        $('.pmdinapprove').hide();
        $('.hubbusinessinfoView').hide();
        $('.onlyforHubReview').hide();
        $('.forhubonly').show();
        $('.ViewMode').attr("disabled", true);
        $('.NonViewField_TotalBusinessValue').hide();
        $('#PackHubApprove').attr('disabled', true);
        $('.NOTHUB').hide();
        $('.onlyfor8').hide();
        var GetRemarks = $.parseJSON($('#JsonPackHUBRemarksData').val());
        GetRemarks['PackageProductDescriptionHUB'].length == 0 ? $(".ProductDescriptionHubRemarks").hide() : $(".ProductDescriptionHubRemarks").show();
        GetRemarks['PackageProjectDetailsHUB'].length == 0 ? $(".ProjectBusinessRational").hide() : $(".ProjectBusinessRational").show();
        GetRemarks['PackageBusinessHUB'].length == 0 ? $(".packagebusinessinfo").hide() : $(".packagebusinessinfo").show();
        GetRemarks['PackExpectedHUB'].length == 0 ? $(".expectedpack").hide() : $(".expectedpack").show();
        GetRemarks['PackageBusinessHUB'].length == 0 ? $(".hubbusinessinfoView").hide() : $(".hubbusinessinfoView").show();

    }
    if (statusname === "4" || statusname === "14") {
        if (statusname === "4") {
            $('#statusHeader').text("Packaging Initiative-HGML Approve");
        }
        if (statusname === "14") {
            $('#statusHeader').text("Packaging Initiative-Brief Demoted to HGML");
        }
        $('.ViewFieldHUBRemarks,.ViewFieldPMDRemarks').hide();
        $('.ViewFieldHubGrid').show();
        $('.ViewModePMD').hide();
        $('.ViewFieldHubStatus').show();
        $('.PMDHGML_HUbRemarks').hide();
        $('.ViewModeField').hide();
        $('.ViewPMDHGMLData').hide();
        $('.ViewPmdData2').hide();
        $('.ViewOnly').prop("disabled", true);
        $('.pmdinapprove').hide();
        $('.onlyforHubReview').hide();
        $('.forhubonly').hide();
        $('.HGMLDataNotReq').hide();
        $('.onlyfor8').hide();
    }
    if (statusname === "5" || statusname === "16") {
        if (statusname === "5") {
            $('#statusHeader').text("Packaging Initiative-Fine Screening Review");
        } if (statusname === "16") {
            $('#statusHeader').text("Packaging Initiative-Extended Fine Screening");
        }
        $('.ViewFieldHUBRemarks').hide();
        $('.ViewFieldHubStatus').hide();
        $('.ViewPmdData2').show();
        $('.ViewPMDHGMLData').hide();
        $('.NoNeed').hide();
        $('.PMDHGML_HUbRemarks').hide();
        $('.ViewOnly').attr('disabled', true);
        $('.ViewModeField').hide();
        $('.ViewModePMD').show();
        $('.HGMLDataNotReq').hide();
        $('.pmdinapprove').hide();
        $('.onlyforHubReview').hide();
        $('.forhubonly').hide();
        $('.onlyfor8').hide();
        var check = GetData.PackageHGMLData[0].HGMLYesOrNo;
        if (check == "No") {
            $('.HGMLDataNo').show();
            $('.showHGMLData').show();
            $('.notforhubreviewpage').show();

        }
        else if (check == "Yes") {
            $('.HGMLDataNo').show();
            $('.showHGMLData').show();
        }
    }
    if (statusname === "6" || statusname === "12") {

        if (statusname === "6") {
            $('#statusHeader').text("Packaging Initiative-Accepted");
        }
        else {
            $('#statusHeader').text("Packaging Initiative-Updated");
        }
        $('.ViewFieldHUBRemarks').hide();
        $('.ViewFieldHubStatus').hide();
        $('.ViewModePMD').show();
        $('.ViewPmdData2').show();
        $('.PMDHGML_HUbRemarks').hide();
        $('.ViewModeField').hide();
        $('.showHGMLData').hide();
        $('.HGMLDataNotReq').hide();
        $('.ViewOnly').hide();
        $('.noneed').hide();
        $('.pmdinapprove').hide();
        $('.HGMLDataNo').hide();
        $('.ViewPMDHGMLData').hide();
        $('.onlyforHubReview').hide();
        $('.forhubonly').hide();
        $('.onlyfor8').hide();


        var check = GetData.PackageHGMLData[0].HGMLYesOrNo;

        if (check == "No") {
            $('.HGMLDataNo').show();
            $('.showHGMLData').show();
        }
        else if (check == "Yes") {
            $('.HGMLDataNo').show();
            $('.showHGMLData').show();
        }
    }
    if (statusname == "7") {
        $('#statusHeader').text("Packaging Initiative-Rejected");
        $('.ViewFieldHUBRemarks,.ViewFieldPMDRemarks').hide();
        $('.ViewFieldHubStatus').hide();
        $('.ViewModeField').hide();
        $('.HGMLDataNo').hide();
        $('.ViewPMDHGMLData').hide();
        $('.ViewModePMD').hide();
        $('.pmdinapprove').hide();
        $('.PMDHGML_HUbRemarks').hide();
        $('.ViewFieldHubGrid').hide();
        $('.onlyforHubReview').hide();
        $('.hubbusinessinfoView').hide();
        $('.forhubonly').hide();
        $('.onlyfor8').hide();

    }

    if (statusname == "8" || statusname == "9" || statusname == "11") {
        if (statusname == "8") {
            $('#statusHeader').text("Packaging Initiative-Sent Back to Initiator");
        }
        if (statusname == "9") {
            $('#statusHeader').text("Packaging Initiative-Pending for Approval");
        }
        if (statusname == "11") {
            $('#statusHeader').text("Packaging Initiative-Brief Demoted");
        }
        $('.forhubonly').hide();
        $('.ViewFieldHUBRemarks').hide();
        $('.ViewFieldPMDRemarks').hide();
        $('.PMDHGML_HUbRemarks').hide();
        $('.pmdinapprove').hide();
        $('.ViewModePMD').hide();
        $('.ViewPMDHGMLData').hide();
        $('.HGMLDataNo').hide();
        $('.ViewModeField').hide();
        $('.ViewFieldHubStatus').hide();
        $('.ViewFieldHubGrid').hide();
        $('.hubbusinessinfoView').hide();
        $('.ViewField1').hide();
        $('.ToClearData').attr('readonly', true);
        $('.Toremove').attr('disabled', true);
        $('.mandate').attr('disabled', true);
        $('#Pack_InitiatorRemarks').attr('readonly', true);
        $('#AddProductDescription').attr("disabled", true);
        $('#AddExpectedPackagingData').attr("disabled", true);
        $('#AddSustainability').attr("disabled", true);

    }
    if (statusname == 9) {
        // $('.onlyfor1and8').hide();
    }
    if (statusname == 1 || statusname == 8) {
        $('.onlyfor9').hide();
    }
}
$(document).ready(function () {

    productDescriptionProductNameList = jQuery('#product_description').jqGrid("getCol", "ProductName");

    if (statusname == '4' || statusname == '2') {

        hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, hgmlDataProductNameList) == -1 });

        $("option").remove("#HgmlDataProductName .ProductOption");

        if (hgmlDataProductNameList.length > 0) {

            var productOption = "";

            $.each(hgmlDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#HgmlDataProductName").append(productOption);
        }
    }

    if (statusname == '5' || statusname == '6' || statusname == '12' || statusname == "16") {

        pmdDataProductNameList = $("#PMD_Data").jqGrid("getCol", "ProductName");
        pmdDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, pmdDataProductNameList) == -1 });

        $("option").remove("#PMDDataProduct_Product .ProductOption");

        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $.each(pmdDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PMDDataProduct_Product").append(productOption);
        }

        if (productDescriptionProductNameList.length > 0) {

            var productOption = "";

            $("option").remove("#TargetCostProductName .ProductOption");

            $.each(productDescriptionProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#TargetCostProductName").append(productOption);
        }
    }
    if (statusname == '3') {
        var businessInformationProductNameList1 = [];
        productDescriptionProductNameList = jQuery('#product_description').jqGrid("getCol", "ProductName");

        businessInformationProductNameList1 = $("#HUBbusinessInfo").jqGrid("getCol", "Product");
        businessInformationProductNameList1 = productDescriptionProductNameList.slice(0);

        $("option").remove("#BusinessInfo_Product .ProductOption");

        if (businessInformationProductNameList1.length > 0) {

            var productOption = "";

            $.each(businessInformationProductNameList1, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#BusinessInfo_Product").append(productOption);
        }
    }


});

if (statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12") {


    var GetRemarks = $.parseJSON($('#JsonPackHUBRemarksData').val());

    GetRemarks['PackageProductDescriptionHUB'].length == 0 ? $(".ProductDescriptionHubRemarks").hide() : $(".ProductDescriptionHubRemarks").show();
    GetRemarks['PackageProjectDetailsHUB'].length == 0 ? $(".ProjectBusinessRational").hide() : $(".ProjectBusinessRational").show();
    GetRemarks['PackageBusinessHUB'].length == 0 ? $(".packagebusinessinfo").hide() : $(".packagebusinessinfo").show();
    GetRemarks['PackExpectedHUB'].length == 0 ? $(".expectedpack").hide() : $(".expectedpack").show();
    GetRemarks['PackageBusinessHUB'].length == 0 ? $(".hubbusinessinfoView").hide() : $(".hubbusinessinfoView").show();
}
$(document).ready(function () {
    if (statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12") {
        $("#PMDData_TargetProductionDate").val("");
        $("#PMDData_Target1stPrototypeSubmissionDate").val("");
        $("#PMDData_TargetTTDCompletionDate").val("");
    }
});
$('#BusinessInfo_SKU').change(function () {

    var prod = $("#BusinessInfo_Product").val();
    var sku = $("#BusinessInfo_SKU").val();

    if (statusname == "3") {
        var gridData = $("#HUBbusinessInfo").jqGrid('getGridParam', 'data');

    }
    else {
        var gridData = $("#business_info").jqGrid('getGridParam', 'data');

    }

    if (isEditBI) {
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Product == prod && gridData[i].SKU == sku && gridData[i].SKU != BIEditedSKU) {
                $('.Err-BIcombination').show();
                $('#AddBusinessInfoData').prop('disabled', true);
                break;
            }
            else {
                $('.Err-BIcombination').hide();
                $('#AddBusinessInfoData').prop('disabled', false);
            }
        }
    }
    else {

        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Product == prod && gridData[i].SKU == sku) {
                $('.Err-BIcombination').show();
                $('#AddBusinessInfoData').prop('disabled', true);
                break;
            }
            else {
                $('.Err-BIcombination').hide();
                $('#AddBusinessInfoData').prop('disabled', false);
            }
        }

    }

});

$("#BusinessInfo_Product").change(function () {

    $("option").remove("#BusinessInfo_SKU .options");

    $("option").remove("#BusinessInfo_SKU .skuOption");

    var productName = $("#BusinessInfo_Product").val();

    $(".Error_BI_Product").hide().text('');

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


$('#ExpectedPack_SKU').change(function () {

    var prod = $("#ExpectedPackage_Product").val();
    var sku = $("#ExpectedPack_SKU").val().toString();
    if (isEditPP) {

        $(".formulation_table table").each(function (index) {
            var productName = $(this).find(".expectedProduct").text();
            var tableSKU = $(this).find(".expectedSKU").text();
            if (productName == prod && tableSKU == sku && tableSKU != PPEditedSKU) {
                $('.Err-PPcombination').show();
                $('#AddExpectedPackagingData').prop('disabled', true);
            }
            else {
                $('.Err-PPcombination').hide();
                $('#AddExpectedPackagingData').prop('disabled', false);
            }
        });
    }
    else {
        $(".formulation_table table").each(function (index) {
            var productName = $(this).find(".expectedProduct").text();
            var tableSKU = $(this).find(".expectedSKU").text();
            if (productName == prod && tableSKU == sku) {
                $('.Err-PPcombination').show();
                $('#AddExpectedPackagingData').prop('disabled', true);
            }
            else {
                $('.Err-PPcombination').hide();
                $('#AddExpectedPackagingData').prop('disabled', false);
            }
        });
    }
});
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
if (statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12") {
    var GetPMDReview = $.parseJSON($('#JsonPMDReview').val());
    colmodels = [
        {
            name: 'Action',
            label: 'Action',
            width: 40,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return '<div class="text-center action_icons icon_section align-items-left">' +
                    '<a onclick=onEditTargetCost(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen pr-2 color-info" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                    '<a onclick=onDeleteTargetCost(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                    '</div> ';
            }
        },
        {
            name: 'Product',
            label: 'Product',
            width: 120,
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
            name: 'Currency',
            label: 'Currency',
            width: 80,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TargetCost',
            label: 'Accepted Target Cost',
            width: 80,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TargetCostRemarks',
            label: 'Remarks',
            width: 100,
            resizable: true,
            ignoreCase: true,
        },
    ],

        $("#TargetCost_Grid").jqGrid({
            url: '',
            data: GetPMDReview['TargetCostDataList'] == undefined ? [] : GetPMDReview['TargetCostDataList'],
            datatype: 'local',
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_TargetCost_Grid',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#TargetCost_Grid tbody tr");
                var objHeader = $("#TargetCost_Grid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
                if (statusname == "5" && $('#ViewStatus').val() == 'View' || statusname == "16" && $('#ViewStatus').val() == 'View' || statusname == "6" && $('#ViewStatus').val() == 'View' || statusname == "12" && $('#ViewStatus').val() == 'View') {
                    jQuery("#TargetCost_Grid").jqGrid('hideCol', "Action");
                }
            }
        });
    $("#TargetCost_Grid_PV").jqGrid({
        url: '',
        data: GetPMDReview['TargetCostDataList'] == undefined ? [] : GetPMDReview['TargetCostDataList'],
        datatype: 'local',
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_TargetCost_Grid_PV',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#TargetCost_Grid_PV tbody tr");
            var objHeader = $("#TargetCost_Grid_PV tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            jQuery("#TargetCost_Grid_PV").jqGrid('hideCol', "Action");

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
    var isEditTC = false;
    var EditRowId2 = 0;
    //To Add Target Cost
    function AddTargetCost() {

        var productName = $("#TargetCostProductName").val();
        var prodSku = $("#TargetCostSKU").val() == "--Select--" ? "" : $("#TargetCostSKU").val();
        var Targetcost = $.trim($("#TargetCost").val());
        var Currency = $("#TargetCost_Currency").val();
        var Remarks = $.trim($("#TargetCostRemarks").val());
        var flag2 = true;

        if (productName == "" || prodSku == "") {
            flag2 = false;
            productName == "" ? $(".Error_ProdName").show() : $(".Error_ProdName").hide();
            prodSku == "" ? $("#Error_ProdSKU").show() : $("#Error_ProdSKU").hide();
        }
        EditRowId2 == 0 && $(".Error_PMD_Tc").text() != '' ? flag2 = false : "";
        if (flag2) {

            var griddata = [];
            var TCData = {};

            TCData = {
                Product: productName,
                SKU: prodSku,
                TargetCost: Targetcost,
                Currency: Currency,
                TargetCostRemarks: Remarks,
            }

            if (EditRowId2 == 0) {

                griddata.push(TCData);
                var HD1 = $("#TargetCost_Grid").jqGrid('getGridParam', 'data');
                var HD2 = $.merge(HD1, griddata);
                $("#TargetCost_Grid").jqGrid('setGridParam', { data: HD2 });
                $("#TargetCost_Grid").trigger('reloadGrid', [{ page: 1 }]);
                $("#TargetCost_Grid_PV").jqGrid('setGridParam', { data: HD2 });
                $("#TargetCost_Grid_PV").trigger('reloadGrid', [{ page: 1 }]);
            }
            else {

                $("#TargetCost_Grid").jqGrid('setRowData', EditRowId2, TCData);
                $("#TargetCost_Grid").trigger('reloadGrid', [{ page: 1 }]);
                $("#TargetCost_Grid_PV").jqGrid('setRowData', EditRowId2, TCData);
                $("#TargetCost_Grid_PV").trigger('reloadGrid', [{ page: 1 }]);

                EditRowId2 = 0;
            }
            $(".TCdata").val("");


            $('#TargetCostSKU .options').remove();

            $('#TargetCostSKU .skuOption').remove();

            $('#TargetCostSKU').prop('selectedIndex', 0);


            isEditTC = false;
            $(".Error_HgmlData").hide();
        }
    }
    var TCEditedSKU = "";
    var EditRowTC = 0;

    function onEditTargetCost(RowIdTargerCost) {

        $('#TargetCostSKU .skuOption').remove();
        EditRowId2 = RowIdTargerCost;
        isEditTC = true;
        var DataFromTheRow = jQuery('#TargetCost_Grid').jqGrid('getRowData', RowIdTargerCost);

        TCEditedSKU = DataFromTheRow.SKU;

        $("#TargetCostProductName").val(DataFromTheRow.Product);
        $('#TargetCostSKU .options').remove();
        var skuVals = DataFromTheRow.SKU.split(',');
        var gridData = $("#product_description").jqGrid('getGridParam', 'data');
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].ProductName == $("#TargetCostProductName").val()) {
                var sku = gridData[i].SKU;
                var skuList = sku.split(',');
                var skuOption = "";
                $.each(skuList, function (i, obj) {
                    if (obj != "" || obj != null || obj != undefined) {
                        skuOption += '<option class="options" value="' + obj + '">' + obj + '</option>';
                    }
                });
                $("#TargetCostSKU").append(skuOption);
                break;
            }
        }

        $("#TargetCostSKU").val(DataFromTheRow.SKU);
        $("#TargetCost").val(DataFromTheRow.TargetCost);
        $("#TargetCost_Currency").val(DataFromTheRow.Currency);
        $("#TargetCostRemarks").val(DataFromTheRow.TargetCostRemarks);
    }

    function onDeleteTargetCost(RowIdTargetCost) {
        confirm("Are you sure you want to delete?", function () {
            $("#TargetCost_Grid").jqGrid('delRowData', RowIdTargetCost);
            $("#TargetCost_Grid").trigger('reloadGrid', [{ page: 1 }]);
            $("#TargetCost_Grid_PV").jqGrid('delRowData', RowIdTargetCost);
            $("#TargetCost_Grid_PV").trigger('reloadGrid', [{ page: 1 }]);
            EditRowId2 = 0;
            deleteRowId = 0;
            $(".TCdata").val('');
        });
    }
}
$("#TargetCostProductName").change(function () {

    $('#TargetCostSKU').empty();
    $('#TargetCostSKU').append('<option>--Select--</option>')
    var productName = $(this).val();
    $(".Error_ProdName").hide();
    $(".Err-TCcombination").hide();


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
                $('#TargetCostSKU').append(skuOption);
                break;
            }
        }
    }
});
$('#TargetCostSKU').change(function () {
    $('#Error_ProdSKU').hide();


    var prod = $("#TargetCostProductName").val();
    var sku = $("#TargetCostSKU").val();

    var gridData = $("#TargetCost_Grid").jqGrid('getGridParam', 'data');

    if (isEditTC) {
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Product == prod && gridData[i].SKU == sku && gridData[i].SKU != TCEditedSKU) {
                $('.Err-TCcombination').show();
                $('#TargertCostAdd').prop('disabled', true);
                break;
            }
            else {
                $('.Err-TCcombination').hide();
                $('#TargertCostAdd').prop('disabled', false);
            }
        }
    }
    else {

        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].Product == prod && gridData[i].SKU == sku) {
                $('.Err-TCcombination').show();
                $('#TargertCostAdd').prop('disabled', true);
                break;
            }
            else {
                $('.Err-TCcombination').hide();
                $('#TargertCostAdd').prop('disabled', false);
            }
        }
    }
});

$('#TargetCost').on('change', function () {

    $('#Error_TC').hide();
});

$('#TargetCost_Currency').change(function () {
    $('#Error_Currency').hide();
});

$("#BusinessInfo_ProposedLaunchDate").keypress(function (event) {
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
$(document).ready(function () {
    var selectedHubList = [];
    if ($('#Hubs').val() != '' && $('#Hubs').val() != null && typeof ($('#Hubs').val()) != "undefined") {
        var selectedHubList = $('#Hubs').val().split(",");
        $('#HgmlData_HubDropdown').multiselect('refresh');
        $('#HgmlData_HubDropdown').val(selectedHubList).multiselect('rebuild');
        $('#HgmlData_HubDropdown').multiselect('rebuild');
        if (!($("#HgmlData_HubDropdown").val() === '' || typeof ($("#HgmlData_HubDropdown").val()) === 'undefined' || $("#HgmlData_HubDropdown").val() === null)) {
            var selectedHubIds = $("#HgmlData_HubDropdown").val().toString();
        }
        if (!($("#HgmlData_HubDropdown").val() === '' || typeof ($("#HgmlData_HubDropdown").val()) === 'undefined' || $("#HgmlData_HubDropdown").val() === null)) {

            $.ajax({
                type: "POST",
                url: ROOT + "Base/GetUserEmailBasedOnHub",
                data: { hubIds: selectedHubIds },
                dataType: "json",
                success: function (UserEmailResult) {

                    if (UserEmailResult != null) {

                        let selectedHubUser = [];

                        selectedHubUser = GetData.PackageHGMLData.length === 0 ? [] : GetData.PackageHGMLData[0].HubUsers.split(",");

                        var userEmailOptionList = ''

                        $("option").remove(".HubUsersOption");

                        $.each(UserEmailResult, function (i, obj) {

                            let matchFound = false;
                            matchFound = selectedHubUser.includes(obj.HgmlDataHubUsersList)

                            if (matchFound) {

                                userEmailOptionList += '<option class="HubUsersOption ' + obj.Hub + '" value="' + obj.HgmlDataHubUsersList + '" selected>' + obj.Hub + ' - ' + obj.HgmlDataHubUsersList + '</option>'
                            }
                            else {
                                userEmailOptionList += '<option class="HubUsersOption ' + obj.Hub + '" value="' + obj.HgmlDataHubUsersList + '" >' + obj.Hub + ' - ' + obj.HgmlDataHubUsersList + '</option>'
                            }
                        });
                        $("#HgmlData_HubUsersDropdown").html(userEmailOptionList);
                        $('#HgmlData_HubUsersDropdown').multiselect('rebuild');
                        $('.HubUsersOption').find('input[type=checkbox]').prop("disabled", false);
                        var selectList = $('#HgmlData_HubUsersDropdown').find('option:selected');
                        $.each(selectList, function (i, obj1) {
                            $(".HubUsersOption").each(function (i, obj2) {
                                if ($(this).attr("class") == obj1.className && $(this).val() != obj1.value) {
                                    $(this).find('input[type=checkbox]').prop("disabled", true);
                                }
                            });
                        });
                    }
                    $('#HgmlData_HubDropdown').val(selectedHubList).multiselect('rebuild');
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
        }
    }

    $('.example-dropUp').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });

});

if (statusname == 2) {

    $('#HgmlData_HubUsersDropdown').val(GetData.PackageHGMLData.length === 0 ? [] : GetData.PackageHGMLData[0].HubUsers);
    $('#HgmlData_HubUsersDropdown').multiselect('refresh');
}


var EditSustainRowId = 0
colmodels = [


    {
        name: 'Action',
        label: 'Action',
        width: 60,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center action_icons icon_section align-items-left">' +
                '<a onclick=OnEditSustainability(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen pr-2 color-info" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=OnDeleteSustainabitity(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
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
        name: 'TargetedSustainGoals',
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
    $("#SustainabiltityGrid").jqGrid({
        height: 'auto',
        rowNum: 100,
        mtype: 'GET',
        url: '',
        datatype: 'local',
        data: GetData['PackageSustainabilityData'],
        loadonce: true,
        colModel: colmodels,
        pager: "#pager_SustainabiltityGrid",
        viewrecords: true,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#SustainabiltityGrid tbody tr");
            var objHeader = $("#SustainabiltityGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            $("#SustainabiltityGrid").setLabel('TargetedSustainGoals', '', { 'text-transform': 'none' });
            if (statusname == "2" || statusname == "3" || statusname == "4" || statusname == "5" || statusname == "16" || statusname == "6" || statusname == "12" || statusname == "7" || statusname == "8" && $('#ViewStatus').val() == 'View' || statusname == "9" && $('#ViewStatus').val() == 'View' || statusname == "11" && $('#ViewStatus').val() == 'View' || statusname == "13" || statusname == "14") {
                jQuery("#SustainabiltityGrid").jqGrid('hideCol', "Action");
            }

        }
    });
$("#SustainabiltityGrid_PV").jqGrid({
    url: '',
    datatype: 'local',
    data: GetData['PackageSustainabilityData'],
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

$('#AddSustainability').on('click', function () {

    var flag = true;
    var Product = $.trim($("#Sustain_Product").val());
    var targetSustain = $.trim($("#Sustain_Target").val());

    if (Product == "" || targetSustain == "") {
        Product == "" ? ($("#Error_Sustain_Product").show(), flag = false) : $("#Error_Sustain_Product").hide();
        targetSustain == "" ? ($("#Error_Sustain_Target").show(), flag = false) : $("#Error_Sustain_Target").hide();
    }

    if (flag) {
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
                $("#SustainabiltityGrid_PV").jqGrid('setGridParam', { data: SustainInfo2 });
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

        $("#SustainabiltityGrid_PV").jqGrid('delRowData', RowData, '', '');
        $("#SustainabiltityGrid_PV").trigger('reloadGrid', [{ page: 1 }]);

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

columnModel = [
    {
        name: 'Product',
        label: 'Product',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'APAC',
        label: 'APAC',
        width: 150,
        resizable: true,
        ignoreCase: true,
        align: 'right',
    },
    {
        name: 'EUROPE',
        label: 'EUROPE',
        width: 130,
        resizable: true,
        ignoreCase: true,
        align: 'right',
    },
    {
        name: 'HGML',
        label: 'HGML',
        width: 120,
        resizable: true,
        ignoreCase: true,
        align: 'right',
    },
    {
        name: 'HUSA',
        label: 'HUSA',
        width: 120,
        resizable: true,
        ignoreCase: true,
        align: 'right',
    },
    {
        name: 'INDIA',
        label: 'INDIA',
        width: 120,
        resizable: true,
        ignoreCase: true,
        align: 'right',
    },
    {
        name: 'METAP',
        label: 'METAP',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: 'wrap',
        align: 'right',
    },
    {
        name: 'TotalBusinessValue',
        label: 'Total ($)',
        width: 150,
        resizable: true,
        ignoreCase: true,
        classes: 'wrap',
        align: 'right',

    }
];

$("#business_value").jqGrid({
    height: 'auto',
    rowNum: 100,
    mtype: 'GET',
    url: '',
    datatype: 'local',
    data: [],
    loadonce: true,
    colModel: columnModel,
    pager: "#pager_business_value",
    viewrecords: true,
    scroll: true,
    sortorder: "asc",
    footerrow: true,
    userDataOnFooter: true,

    loadComplete: function (data) {
        var grid = $(this);
        // Format column values with comma separators
        grid.find(".jqgrow td[role='gridcell']").each(function () {
            var cellValue = $(this).text().trim();
            if (!isNaN(cellValue) && cellValue !== "") {
                var formattedValue = numberWithCommas(parseFloat(cellValue).toFixed(2));
                $(this).text(formattedValue);
            }
        });
    },

    gridComplete: function () {
        adjustGridHeight();
        calculateColumnTotals();

        var objRows = $("#business_value tbody tr");
        var objHeader = $("#business_value tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }

        }
    }
});

$('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'height': '30vh' });
var $TableHeight1 = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight1 > 290) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
} else {
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
}
$(document).on("click", ".TotalBusinessValue_Y1,.TotalBusinessValue_Y2,.TotalBusinessValue_Y3", function () {

    var projectId = $("#ProjectId").val();
    var year = $(this).attr('data-year');

    $.ajax({
        type: "POST",
        url: ROOT + 'ProjectBrief/GetTotalBusinessValue',
        data: {
            projectId: projectId,
            ProjectType: 3,
            Year: year
        },
        success: function (Result) {
            var jsondata = JSON.parse(Result);
            var grid = $("#business_value");
            var colModel = grid.jqGrid("getGridParam", "colModel");
            var hideColumns = [];
            for (var i = 0; i < colModel.length; i++) {
                var colName = colModel[i].name;
                if (isNullColumn(colName, jsondata) || isZeroColumn(colName, jsondata)) {
                    grid.jqGrid("hideCol", colName);
                    hideColumns.push(colName);
                }
            }

            jQuery('#business_value').jqGrid('clearGridData');
            $("#business_value").jqGrid().setGridParam({
                datatype: 'local',
                data: jsondata
            }).trigger('reloadGrid', [{ page: 1 }]);

            var gridWidth = $(".ui-jqgrid").width();
            for (var j = 0; j < hideColumns.length; j++) {
                gridWidth -= $("#" + grid[0].id + "_" + hideColumns[j]).outerWidth();
            }
            $(".ui-jqgrid-view").width(gridWidth);
        },
        error: function () {
            alert("Error occurred!!");
        }
    });
});

function calculateColumnTotals() {
    var grid = $("#business_value");
    var colModel = grid.jqGrid("getGridParam", "colModel");
    var colTotals = {};



    // Calculate column totals
    for (var i = 2; i < colModel.length; i++) {
        var colName = colModel[i].name;
        var total = grid.jqGrid("getCol", colName, false, "sum");
        colTotals[colName] = isNaN(total) ? "" : numberWithCommas(total.toFixed(2));
    }



    // Set the column totals in the footer row
    colTotals["Product"] = "Total ($)";
    grid.footerData("set", colTotals, false);
    grid.trigger("reloadFooterData");
}



function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isNullColumn(columnName, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][columnName] !== null) {
            return false;
        }
    }
    return true;
}

function isZeroColumn(columnName, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][columnName] !== 0 && data[i][columnName] !== 0.00) {
            return false;
        }
    }
    return true;
}

function adjustGridHeight() {
    var gridHeight = $("#business_value").jqGrid("getGridParam", "records") * 23 + 45;
    $("#business_value").jqGrid("setGridHeight", gridHeight);
}



colmodels = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        ignoreCase: true,
        width: 40,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.CreatedBy.toLowerCase() == $("#UserName").val().toLowerCase()) {
                return `<div class="justify-center_">
            <a onclick="remove_row(`+ options.rowId + `)" class="btn-icon -delete"><i class="fa fas fa-trash color-delete" title="Delete" aria-hidden="true"</i></a></div>`
            }
            else {
                return ""
            }
        }
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UpdatedBy',
        label: 'Updated By',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RemarksId',
        label: 'RemarksId',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'CreatedBy',
        label: 'Created By',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
],
    $("#RemarksTable").jqGrid({
        height: 'auto',
        rowNum: 100,
        mtype: 'GET',
        url: '',
        datatype: 'local',
        data: [],
        loadonce: true,
        colModel: colmodels,
        pager: "#pager_RemarksTable",
        viewrecords: true,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#RemarksTable tbody tr");
            var objHeader = $("#RemarksTable tbody tr td");

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


$('.formulation_table table').on('click', '.show_primarypack, .show_secondarypack,.show_tertiarypack,.show_desiredpack,.show_benchmark,.show_others,.show_mold', function () {
    var table = $(this).closest("table").attr("id");
    var productName = $('#' + table).find(".expectedProduct").text();
    var SKU = $('#' + table).find(".expectedSKU").text();
    var ProjectId = $("#ProjectId").val();
    var FiledName = $.trim($(this).closest('td').find('span:nth-child(1)').text().replace(':', ''));

    $.ajax({
        type: 'POST',
        url: ROOT + "ProjectBrief/GetPackagingRemarks",
        data: { ProjectId: ProjectId, Product: productName, SKU: SKU, FieldName: FiledName },
        success: function (result) {

            const filteredArray = result.filter(obj1 =>
                !deletedRemarksData.some(obj2 => obj2.RemarksId === obj1.RemarksId)
            );

            const savedArray = savedFieldRemarks.filter(obj1 =>
                !deletedRemarksData.some(obj2 =>
                    obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
                )
            );
            const data = filteredArray.concat(savedArray);
            var mergedArray = data.filter(s => s.Product == productName && s.SKU == SKU && s.FieldName == FiledName);


            $('#ReamarksName').text(FiledName + " - Remarks");
            $('#FiledProductName').text(productName);
            $('#FiledSKU').text(SKU);
            $('#PackagingProfileRemarks').modal('show');

            $('#RemarksTable').jqGrid("clearGridData");
            $("#RemarksTable").jqGrid('setGridParam', { data: mergedArray });
            $("#RemarksTable").trigger('reloadGrid', [{ page: 1 }]);

        }
    });
    if (($('#ViewStatus').val() == 'View')) {
        $('.FieldRemarks').attr('readonly', true);
        $('.showonlyforHGML').hide();
        jQuery("#RemarksTable").jqGrid('hideCol', "Action");
    }
    if (statusname == '3' || statusname == '5' || statusname == '6' || statusname == '12' || statusname == "16") {
        $('.FieldRemarks').attr('readonly', true);
        $('.showonlyforHGML').hide();
        jQuery("#RemarksTable").jqGrid('hideCol', "Action");
    }
});

$('.formulation_table_PV').on('click', '.show_primarypack, .show_secondarypack,.show_tertiarypack,.show_desiredpack,.show_benchmark,.show_others,.show_mold', function () {
    debugger;
    var table = $(this).closest("table").attr("id");
    var productName = $('#' + table).find(".expectedProduct").text();
    var SKU = $('#' + table).find(".expectedSKU").text();
    var ProjectId = $("#ProjectId").val();
    var FiledName = $.trim($(this).closest('td').find('span:nth-child(1)').text().replace(':', ''));

    $.ajax({
        type: 'POST',
        url: ROOT + "ProjectBrief/GetPackagingRemarks",
        data: { ProjectId: ProjectId, Product: productName, SKU: SKU, FieldName: FiledName },
        success: function (result) {

            const filteredArray = result.filter(obj1 =>
                !deletedRemarksData.some(obj2 => obj2.RemarksId === obj1.RemarksId)
            );

            const savedArray = savedFieldRemarks.filter(obj1 =>
                !deletedRemarksData.some(obj2 =>
                    obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
                )
            );
            const data = filteredArray.concat(savedArray);
            var mergedArray = data.filter(s => s.Product == productName && s.SKU == SKU && s.FieldName == FiledName);


            $('#ReamarksName').text(FiledName + " - Remarks");
            $('#FiledProductName').text(productName);
            $('#FiledSKU').text(SKU);
            $('#PackagingProfileRemarks').modal('show');

            $('#RemarksTable').jqGrid("clearGridData");
            $("#RemarksTable").jqGrid('setGridParam', { data: mergedArray });
            $("#RemarksTable").trigger('reloadGrid', [{ page: 1 }]);

        }
    });
    $('.FieldRemarks').attr('readonly', true);
    $('.showonlyforHGML').hide();
    jQuery("#RemarksTable").jqGrid('hideCol', "Action");
});

$('#SavePackagingFiledRemarks').on("click", function () {

    var ProjectId = $("#ProjectId").val();
    var remarks = $.trim($(".FieldRemarks").val());
    var fieldName = $.trim($('#ReamarksName').text().split('-')[0]);
    var product = $('#FiledProductName').text();
    var SKU = $('#FiledSKU').text();
    var flag = true;
    remarks != "" ? flag = true : flag = false;

    var rowData = $("#RemarksTable").jqGrid("getRowData");
    var maxRemarksId = 0;
    for (var i = 0; i < rowData.length; i++) {
        var remarksId = parseInt(rowData[i].RemarksId);
        if (remarksId > maxRemarksId) {
            maxRemarksId = remarksId;
        }
    }
    if (flag) {

        var griddata = [];
        var RemarksData = {};
        RemarksData =
        {
            Remarks: remarks,
            UpdatedBy: $('#UserName').val(),
            CreatedBy: $('#UserName').val(),
            RemarksId: maxRemarksId + 1,

        }
        griddata.push(RemarksData);
        var Remarks1 = $("#RemarksTable").jqGrid('getGridParam', 'data');
        var Remarks2 = $.merge(Remarks1, griddata);
        $("#RemarksTable").jqGrid('setGridParam', { data: Remarks2 });
        $("#RemarksTable").trigger('reloadGrid', [{ page: 1 }]);


        addedData = {
            ProjectId: ProjectId,
            Product: product,
            SKU: SKU,
            FieldName: fieldName,
            Remarks: remarks,
            UpdatedBy: $('#UserName').val(),
            CreatedBy: $('#UserName').val(),
            RemarksId: maxRemarksId + 1,
        }

        $('.FieldRemarks').val('');
        savedFieldRemarks.push(addedData);

        var indexToRemove = deletedRemarksData.findIndex(obj =>
            obj.ProjectId === addedData.ProjectId &&
            obj.Product === addedData.Product &&
            obj.SKU === addedData.SKU &&
            obj.FieldName === addedData.FieldName &&
            obj.Remarks === addedData.Remarks &&
            parseInt(obj.RemarksId) == parseInt(addedData.RemarksId)
        );
        if (indexToRemove !== -1) {
            deletedRemarksData.splice(indexToRemove, 1);
        }
    }
});

function remove_row(RowData) {

    confirm("Are you sure you want to delete?", function () {
        var Product = $('#FiledProductName').text();
        var SKU = $('#FiledSKU').text();
        var PackageName = $.trim($('#ReamarksName').text().split('-')[0]);
        var projectid = $("#ProjectId").val();
        var remarksData = jQuery('#RemarksTable').jqGrid('getRowData', RowData);
        var data = {
            ProjectId: projectid,
            Remarks: remarksData.Remarks,
            Product: Product,
            SKU: SKU,
            FieldName: PackageName,
            RemarksId: remarksData.RemarksId,
        }
        deletedRemarksData.push(data);

        var indexToRemove = savedFieldRemarks.findIndex(obj =>
            obj.ProjectId === data.ProjectId &&
            obj.Product === data.Product &&
            obj.SKU === data.SKU &&
            obj.FieldName === data.FieldName &&
            obj.Remarks === data.Remarks &&
            parseInt(obj.RemarksId) == parseInt(data.RemarksId)
        );

        if (indexToRemove !== -1) {
            savedFieldRemarks.splice(indexToRemove, 1);
        }
        $("#RemarksTable").jqGrid('delRowData', RowData);
        $("#RemarksTable").trigger('reloadGrid', [{ page: 1 }]);
    });

}
//for auto save in Packageinitiative
$(document).ready(function () {

    //let isInserted = false;
    if (statusname == "1" || (statusname == "8" || statusname == "11" && $('#ViewStatus').val() != 'View')) {
        //
        setInterval(() => {

            validateEditDataSave();
            $('#loader').hide();
            $("#loader").css("visibility", "hidden");

        }, 5 * 60 * 1000)

    }

})
function validateEditDataSave() {

    var ProjectDetails = [];
    var projectName = $('#ProductDescription_ProjectName').val();
    var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
    var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
    var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
    var ExpectedPackagingGridValue = [];
    var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
    var PackageHeaderTableData2 = [];


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

    if (projectName == "") {
        return validateEditDataSave(); // Exit the function if projectName is empty
    }
    if (statusname == "1") {
        $(".initiated_section").each(function (i) {
            PackageHeaderTableData2.push({
                ProjectName: $('#ProductDescription_ProjectName').val(),
                ProjectType: "3",
                Hub: $(this).find('.hub_name').text(),
                Division: $(this).find('#Division').val(),
                Category: $(this).find('.addCategoryOption').val(),
                InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                Status: "1"
            });
        });
        $('#PackStatus').val(1);
        $('#StatusId').val(1);
    } else if (statusname == "8") {
        $(".initiated_section").each(function (i) {
            PackageHeaderTableData2.push({
                ProjectName: $('#ProductDescription_ProjectName').val(),
                ProjectType: "3",
                Hub: $(this).find('.hub_name').text(),
                Division: $(this).find('#Division').val(),
                Category: $(this).find('.addCategoryOption').val(),
                InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                Status: "8"
            });
        });
        $('#PackStatus').val(8);
        $('#StatusId').val(8);
    } else if (statusname == "11") {
        $(".initiated_section").each(function (i) {
            PackageHeaderTableData2.push({
                ProjectName: $('#ProductDescription_ProjectName').val(),
                ProjectType: "3",
                Hub: $(this).find('.hub_name').text(),
                Division: $(this).find('#Division').val(),
                Category: $(this).find('.addCategoryOption').val(),
                InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                Status: "11"
            });
        });
        $('#PackStatus').val(11);
        $('#StatusId').val(11);
    }

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
    $('#UserName').val($('#UserName').val());
    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
    $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
    $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))


    $.ajax({
        url: ROOT + "ProjectBrief/PackageInitiativeAutoSaveEditData",
        type: 'POST',
        data: $('#PackageEdit_Form_Submit').serialize(),
        success: function (response) {



        },
        error: function (error) {

        }
    });
}

function ValidatePackSubmitToManager() {


    $('#ByClickOk').prop("disabled", false);

    var PackageHeaderTableData1 = [];
    var ProjectDetails = [];
    var ProjectName = $('#ProductDescription_ProjectName').val();
    var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
    var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
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
            Hub: $(this).find('.hub_name').text(),
            Division: $(this).find('#Division').val(),
            Category: $(this).find('.addCategoryOption').val(),
            InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
            InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
            Status: "9"
        });
    });


    ProjectDetails =
        [{
            ProjectName: ProjectName,
            BusinessRational: BusinessRationalData
        }];
    var flag = true;
    $('#PackageEdit_Form_Submit').validate();

    if ($('#PackageEdit_Form_Submit').valid()) {
        flag = true;
    }
    else {
        flag = false;
    }


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
        document.getElementById('SusutainabitityMsg').scrollIntoView({ behavior: 'smooth' })
    }

    if ($.isEmptyObject(ExpectedPackagingGridValue)) {
        document.getElementById('ExpectedPackagingMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if ($.isEmptyObject(BusinessValueGridData)) {
        document.getElementById('businessinfoMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if (BusinessRationalData == "") {
        document.getElementById('ErrorIn_BusinessRational').scrollIntoView({ behavior: 'smooth' })
    }
    if ($.isEmptyObject(ProductDescriptionGridValue)) {
        document.getElementById('productdescriptionMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if (ProjectName == "") {
        document.getElementById('Error_in_ProjectName').scrollIntoView({ behavior: 'smooth' })
    }

    PackageHeaderTableData1[0].Division == "" ? (flag = false, $('#Error_Pack_Division').show()) : $('#Error_Pack_Division').hide();
    PackageHeaderTableData1[0].Division == "" ? (flag = false, document.getElementById('Error_Pack_Division').scrollIntoView({ behavior: 'smooth' })) : "";
    PackageHeaderTableData1[0].Category == "" ? (flag = false, $('#Error_pack_Category').show()) : $('#Error_pack_Category').hide();
    PackageHeaderTableData1[0].Category == "" ? (flag = false, document.getElementById('Error_pack_Category').scrollIntoView({ behavior: 'smooth' })) : "";

    if (flag) {
        $('div#SubmitModal').modal('show');
        $("#ByClickOk").click(function () {

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
                    Hub: $(this).find('.hub_name').text(),
                    Division: $(this).find('#Division').val(),
                    Category: $(this).find('.addCategoryOption').val(),
                    InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                    InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                    Status: "9"
                });
            });
            ProjectDetails =
                [{
                    ProjectName: ProjectName,
                    BusinessRational: BusinessRationalData,
                    PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                }];

            var status = GetData.PackageHeader[0].SID
            if (status == "1") {
                approvalStatus = [{
                    ProjectType: "Package Initiatives",
                    FromStage: 1,
                    FromStageName: "Draft",
                    Action: "Send to Manager Review",
                    ToStage: 9,
                    ToStageName: "Pending For Approval"

                }];
            }
            if (status == "8") {
                approvalStatus = [{
                    ProjectType: "Package Initiatives",
                    FromStage: 8,
                    FromStageName: "Sent Back to Initiator",
                    Action: "Send to Manager Review",
                    ToStage: 9,
                    ToStageName: "Pending For Approval"

                }];
            }
            if (status == "11") {
                approvalStatus = [{
                    ProjectType: "Package Initiatives",
                    FromStage: 8,
                    FromStageName: "Brief Demoted to Initiator",
                    Action: "Send to Manager Review",
                    ToStage: 9,
                    ToStageName: "Pending For Approval"

                }];
            }

            var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val()


            $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
            $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
            $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
            $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
            $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks);
            $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));
            $('#PackStatus').val(9);
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));

            document.getElementById('PackageEdit_Form_Submit').submit();

            $('#ByClickOk').prop("disabled", true);
        });
    }
}
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
            formatter: function (cellvalue, options, rowobject) {
                var imageName = encodeURIComponent(rowobject.Image);
                return '<div class="text-center action_icons icon_section align-items-left">' +
                    '<span class="action-link"><a class="btn-icon -download DownloadImage" title="Download Image" onclick=DownloadUploadedImage("' + imageName + '") id="DownloadImage"><i class="fas fa-download color-download" aria-hidden="true"></i></a></span>' +
                    '<span class="action-link"><a class="btn-icon -view ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye color-eye color-eye"></i></a></span>' +
                    '<span class="action-link"><a class="btn-icon -delete DeletePopUpImage" title="Delete Image" onclick=OnRemoveImage("' + imageName + '","' + rowobject.TableClass + '")><i class="fas fas fa-trash color-delete color-delete"></i></a></span>' +
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
            if (statusname != 8 && statusname != 9 && statusname != 1 && statusname != 11 || (statusname == 11 || statusname == 8 || statusname == 9 || statusname == 1) && $('#ViewStatus').val() == 'View') {
                $('.DeletePopUpImage').hide();
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
        if (statusname != 8 && statusname != 9 && statusname != 1 && statusname != 11 || (statusname == 11 || statusname == 8 || statusname == 9 || statusname == 1) && $('#ViewStatus').val() == 'View') {
            $('.DeletePopUpImage').hide();
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

//if (statusname == "1" || statusname == "8" || statusname == "9") {
//    CKEDITOR.instances.ExpectedPack_PrimaryPackaging.on('change', function () {
//        var Pack_PrimaryPackagingData = CKEDITOR.instances["ExpectedPack_PrimaryPackaging"].getData().trim();
//        var contentWithoutTags = Pack_PrimaryPackagingData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
//        var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
//        if (actualData == "") {
//            $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true);
//        } else {
//            $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", false);
//        }
//    });
//}

if (statusname == "1" || statusname == "8" || statusname == "9") {
    CKEDITOR.instances.ExpectedPack_PrimaryPackaging.on('change', function () {
        $("#ErrorInExpectedPack_PrimaryPackaging").prop("hidden", true);
    });
}

function ValidatePackSaveandUpdate() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );
    $('#ByClickUpdate_Ok').prop("disabled", false);
    var flag = true;
    var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
    var targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data');

    if (pmdData.length == 0) { $('div#UpdateModal').modal('hide') }
    pmdData.length == 0 ? ($('#Error_PMDData').show(), flag = false, document.getElementById('Error_PMDData').scrollIntoView({ behavior: 'smooth' })) : $('#Error_PMDData').hide();
    var description = fineScreeningData.PackageProductDescriptionPMD[0] === undefined ? "" : fineScreeningData.PackageProductDescriptionPMD[0].ProductDescription
    var packagingProfile = fineScreeningData.PackageProjectDetailsPMD[0] === undefined ? "" : fineScreeningData.PackageProjectDetailsPMD[0].PackProjectDetails
    var businessInfo = fineScreeningData.PackageBusinessPMD[0] === undefined ? "" : fineScreeningData.PackageBusinessPMD[0].BusinessInformation
    var expectedpack = fineScreeningData.PackExpectedPMD[0] === undefined ? "" : fineScreeningData.PackExpectedPMD[0].PackagingProfile
    var sustainability = fineScreeningData.PackSustainabilityPMD[0] === undefined ? "" : fineScreeningData.PackSustainabilityPMD[0].PackSustainability
    if (pmdData.length == fineScreeningData.PackagePmdData.length && targetCostData.length == fineScreeningData.TargetCostDataList.length &&
        $.trim($('.PackProductDescription_PMDReamrks').val()) == description.replaceAll('\r', '') &&
        $.trim($('.PackPackageProfilePMDRemarks').val()) == packagingProfile.replaceAll('\r', '') &&
        $.trim($('.PackBusinessInformation_PMDRemarks').val()) == businessInfo.replaceAll('\r', '') &&
        $.trim($('.PackExpectedPack_PMDRemarks').val()) == expectedpack.replaceAll('\r', '') &&
        $.trim($('.PackSustainabilityPMDRemarks').val()) == sustainability.replaceAll('\r', '')) {
        var flag1 = false;
        var flag2 = false;
        $.each(pmdData, function (i, obj) {
            if (pmdData[i].ProductName != fineScreeningData.PackagePmdData[i].ProductName ||
                pmdData[i].ProjectCategorization != fineScreeningData.PackagePmdData[i].ProjectCategorization ||
                pmdData[i].ComplexityToBeAssigned != fineScreeningData.PackagePmdData[i].ComplexityToBeAssigned ||
                pmdData[i].RandDName != fineScreeningData.PackagePmdData[i].RandDName ||
                pmdData[i].Remarks != fineScreeningData.PackagePmdData[i].Remarks ||
                pmdData[i].ProjectLead != fineScreeningData.PackagePmdData[i].ProjectLead ||
                pmdData[i].TargetFirstPrototypeSubmissionDate != fineScreeningData.PackagePmdData[i].TargetFirstPrototypeSubmissionDate ||
                pmdData[i].TargetTTDCompletionDate != fineScreeningData.PackagePmdData[i].TargetTTDCompletionDate ||
                pmdData[i].TargetProductionDate != fineScreeningData.PackagePmdData[i].TargetProductionDate ||
                pmdData[i].MajorRiskIfAny != fineScreeningData.PackagePmdData[i].MajorRiskIfAny) {
                flag1 = true;
                return false;
            }
        });
        if (targetCostData.length == 0 && fineScreeningData.TargetCostDataList.length == 0) {
            flag2 = false;
        }
        else {
            $.each(targetCostData, function (i, obj) {
                if (targetCostData[i].Product != fineScreeningData.TargetCostDataList[i].Product ||
                    targetCostData[i].SKU != fineScreeningData.TargetCostDataList[i].SKU ||
                    targetCostData[i].Currency != fineScreeningData.TargetCostDataList[i].Currency ||
                    targetCostData[i].TargetCost != fineScreeningData.TargetCostDataList[i].TargetCost ||
                    targetCostData[i].TargetCostRemarks != fineScreeningData.TargetCostDataList[i].TargetCostRemarks) {
                    flag2 = true;
                    return false;
                }
            });
        }
    }
    if (flag1 == false && flag2 == false) {
        flag = false;
        alert("There are no changes available to save");
    }
    if (flag) {
        $('div#UpdateModal').modal('show');
        $("#ByClickUpdate_Ok").click(function () {
            if (statusname == 6) {
                approvalStatus = [{
                    FromStage: 6,
                    FromStageName: "Accepted",
                    Action: "Update",
                    ToStage: 12,
                    ToStageName: "Updated"
                }];
                $('#PackStatus').val(12);
                $('#CurrentStatus').val(6);
            }
            else {
                approvalStatus = [{
                    FromStage: 12,
                    FromStageName: "Updated",
                    Action: "Update",
                    ToStage: 12,
                    ToStageName: "Updated"
                }];
                $('#PackStatus').val(12);
                $('#CurrentStatus').val(12);
            }
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
            $('#PMDData').val(JSON.stringify(pmdData));


            targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
            $('#TargetCostGridData').val(JSON.stringify(targetCostData));



            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            var pmdApproveData = $('#PMDDataUpdateRemarks').val();

            if (pmdApproveData == "") {
                $("#Error_UpdateModal").show();
            }
            else {
                $('#PackPMDDataApproveRemarks').val(pmdApproveData)
                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#ByClickUpdate_Ok').prop("disabled", true);
            }

            $("#PMDDataApprove").keyup(function () {
                $("#PMDDataApprove").val() == "" ? $("#Error_AcceptModal").show() : $("#Error_AcceptModal").hide();
            });
        });
    }

}
function PMDSendBacktoInitiator() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );
    $('#SendBacFromkHGMLReview_Ok').prop("disabled", false);

    var flag = true;
    var approvalStatus = [];
    if (flag) {
        $('div#SendbackModal').modal('show');
        $("#SendBacFromkHGMLReview_Ok").click(function () {

            if (statusname === "5") {
                approvalStatus = [{
                    FromStage: 5,
                    FromStageName: "Fine Screening Review",
                    Action: "Send Back",
                    ToStage: 11,
                    ToStageName: "Brief Demoted to Initiator"
                }];
                $('#CurrentStatus').val(5);

            }
            if (statusname === "16") {
                approvalStatus = [{
                    FromStage: 16,
                    FromStageName: "Extended Fine Screening",
                    Action: "Send Back",
                    ToStage: 11,
                    ToStageName: "Brief Demoted to Initiator"
                }];
                $('#CurrentStatus').val(16);
            }
            $('#PackStatus').val(11);

            var sendbacktoinitiatorRemarks = $('#ShowSendBackRemarks').val();

            if (sendbacktoinitiatorRemarks == "") {
                $('#Error_SendBacktoInitiator').show();
                return false;

            }
            else {

                var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
                $('#PMDData').val(JSON.stringify(pmdData));


                targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                $('#TargetCostGridData').val(JSON.stringify(targetCostData));

                $('#packageSendBackToInitiatorRemarks').val(sendbacktoinitiatorRemarks);

                $('#SavedRemarks').val(JSON.stringify(savedArray))
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#SendBacFromkHGMLReview_Ok').prop("disabled", true);

            }
        });
    }

}
function ValidatePackSubmitToPMD() {
    $('#ManagerApprovalOK').prop("disabled", false);

    var PackageHeaderTableData1 = [];
    var ProjectDetails = [];
    var ProjectName = $('#ProductDescription_ProjectName').val();
    var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
    var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
    var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
    var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
    var ExpectedPackagingGridValue = [];

    var contentWithoutTags = BusinessRationalData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    var PackageHeaderTableData1 = [];
    $(".initiated_section").each(function (i) {
        PackageHeaderTableData1.push({
            ProjectName: $('#ProductDescription_ProjectName').val(),
            ProjectType: "3",
            Hub: $(this).find('.hub_name').text(),
            Division: $(this).find('#Division').val(),
            Category: $(this).find('.addCategoryOption').val(),
            InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
            InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
            Status: "5"
        });
    });
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

    ProjectDetails =
        [{
            ProjectName: ProjectName,
            BusinessRational: BusinessRationalData
        }];
    var flag = true;

    $('#PackageEdit_Form_Submit').validate();

    if ($('#PackageEdit_Form_Submit').valid()) {
        flag = true;
    }
    else {
        flag = false;
    }


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
        document.getElementById('SusutainabitityMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if ($.isEmptyObject(ExpectedPackagingGridValue)) {
        document.getElementById('ExpectedPackagingMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if ($.isEmptyObject(BusinessValueGridData)) {
        document.getElementById('businessinfoMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if (BusinessRationalData == "") {
        document.getElementById('ErrorIn_BusinessRational').scrollIntoView({ behavior: 'smooth' })
    }
    if ($.isEmptyObject(ProductDescriptionGridValue)) {
        document.getElementById('productdescriptionMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if (ProjectName == "") {
        document.getElementById('Error_in_ProjectName').scrollIntoView({ behavior: 'smooth' })
    }
    PackageHeaderTableData1[0].Division == "" ? (flag = false, $('#Error_Pack_Division').show()) : $('#Error_Pack_Division').hide();
    PackageHeaderTableData1[0].Division == "" ? (flag = false, document.getElementById('Error_Pack_Division').scrollIntoView({ behavior: 'smooth' })) : "";
    PackageHeaderTableData1[0].Category == "" ? (flag = false, $('#Error_pack_Category').show()) : $('#Error_pack_Category').hide();
    PackageHeaderTableData1[0].Category == "" ? (flag = false, document.getElementById('Error_pack_Category').scrollIntoView({ behavior: 'smooth' })) : "";
    if (flag) {

        if (statusname == '9') {

            $('div#SubmitForHGML').modal('show');
            $("#ManagerApprovalOK").click(function () {
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
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "5"
                    });
                });
                ProjectDetails =
                    [{
                        ProjectName: ProjectName,
                        BusinessRational: BusinessRationalData,
                        PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                    }];
                var PackageInitiatorRemarks = $("#ShowManagerApprovalRemarks").val()
                approvalStatus = [{
                    ProjectType: "Package Initiatives",
                    FromStage: 9,
                    FromStageName: "Pending for Approval",
                    Action: "Send to Fine Screening Review",
                    ToStage: 5,
                    ToStageName: "Fine Screening Review"
                }];
                $('#PackStatus').val(5);
                $('#CurrentStatus').val(9);

                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks)

                $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
                $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
                $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
                $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
                $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
                $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#ManagerApprovalOK').prop("disabled", true);
            });
        }
        else {
            $('div#SubmitModal').modal('show');
            $("#ByClickOk").click(function () {

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
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "5"
                    });
                });
                ProjectDetails =
                    [{
                        ProjectName: ProjectName,
                        BusinessRational: BusinessRationalData,
                        PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                    }];

                var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val()

                if (statusname == '11') {
                    approvalStatus = [{
                        ProjectType: "Package Initiatives",
                        FromStage: 11,
                        FromStageName: "Brief demoted to Initiator",
                        Action: "Send to Fine Screening Review",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#PackStatus').val(5);
                    $('#CurrentStatus').val(11);
                }
                if (statusname == '8') {
                    approvalStatus = [{
                        ProjectType: "Package Initiatives",
                        FromStage: 8,
                        FromStageName: "Sent Back to Initiator",
                        Action: "Send to Fine Screening Review",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#PackStatus').val(5);
                    $('#CurrentStatus').val(8);
                }
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks)

                $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
                $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
                $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
                $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
                $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
                $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#ByClickOk').prop("disabled", true);
            });
        }
    }
}
if (statusname == '8' || statusname == '9' || statusname == '11' || statusname == '13' || statusname == '14' || statusname == '4' || statusname == '2') {
    var previousStage = ""
    for (var i = 0; i < GetData['ApprovalStatusData'].length; i++) {
        var id = GetData.ApprovalStatusData[i].FromStage
        if ((id == 13 || id == 14) && (statusname == '8' || statusname == '9')) {
            break;
        }
        else if (id == 16) {
            $('.SendtoUnderExploration').show();
            $('#SendtoUnderExplorInApproval').show();
            $('.sendToPMDinDemoted').hide();
            $('.HideIfDemoted').hide();
            $('.SendtoPMD').hide();
            break;
        }
        else if (id == 5) {
            $('.SendtoPMDInApproval').show();
            $('.SendtoPMDInSendBack').show();
            $('.HideIfDemoted').hide();
            break;
        }
    }
}
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 40,
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
            if (statusname == "3") {

                if ($('#UserName').val().toLowerCase() == rowobject.CreatedBy.toLowerCase()) {
                    return '<div class="text-left icon_section action_icons align-items-left">' +
                        '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '<span class="action-link"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete HideDelete" title="Delete"><i class="fas fas fa-trash color-delete color-delete" title="Delete"></i></a></span>' +
                        '</div> ';
                }
                else {
                    return '<div class="text-left icon_section action_icons align-items-left">' +
                        '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '</div> ';

                }
            }
            else {
                if (rowobject.StatusId != "3") {
                    return '<div class="text-left icon_section action_icons align-items-left">' +
                        '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '<span class="action-link"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete HideDelete" title="Delete"><i class="fas fas fa-trash color-delete color-delete" title="Delete"></i></a></span>' +
                        '</div> ';
                } else {
                    return '<div class="text-left icon_section action_icons align-items-left">' +
                        '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '</div> ';
                }
            }
        }
    },
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 200,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'CreatedBy',
        label: 'Created by',
        width: 60,
        ignoreCase: true,
        resizable: true,
        hidden: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 60,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        width: 50,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'StatusId',
        label: 'Status Id',
        width: 60,
        ignoreCase: true,
        resizable: true,
        hidden: true,
    },
    {
        name: 'StatusName',
        label: 'Stage',
        width: 80,
        ignoreCase: true,
        resizable: true,
    }
],
    $('#Grid_Supporting_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: GetData['SupportingDocData'],
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
            if (statusname != '8' && statusname != '9' && statusname != '1' && statusname != '11' && statusname != '3' || (statusname == '11' || statusname == '8' || statusname == '9' || statusname == '1' || statusname == '3') && $('#ViewStatus').val() == 'View') {
                $('.HideDelete').hide();
            }

        }
    });
$("#Grid_Supporting_Document_PV").jqGrid({
    url: '',
    datatype: 'local',
    data: GetData['SupportingDocData'],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_Grid_Supporting_Document_PV',
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
        //jQuery("#Grid_Supporting_Document_PV").jqGrid('hideCol', "Action");

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

var editDocId = 0;
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
            UploadedBy: $('#UserName').val(),
            CreatedBy: $('#UserName').val(),
            StatusId: statusname
        }
        if (editDocId == 0) {
            griddata.push(docData);
            var doc1 = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            var doc2 = $.merge(doc1, griddata);
            $("#Grid_Supporting_Document").jqGrid('setGridParam', { data: doc2 });
            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
            $("#Grid_Supporting_Document_PV").jqGrid('setGridParam', { data: doc2 });
            $("#Grid_Supporting_Document_PV").trigger('reloadGrid', [{ page: 1 }]);

        }
        else {

            $.each(docData, function (key, value) {
                $("#Grid_Supporting_Document").jqGrid('setCell', editDocId, key, value);
                $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
                $("#Grid_Supporting_Document_PV").jqGrid('setCell', editDocId, key, value);
                $("#Grid_Supporting_Document_PV").trigger('reloadGrid', [{ page: 1 }]);

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
            $("#Grid_Supporting_Document").jqGrid('delRowData', rowId);
            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);

            $("#Grid_Supporting_Document_PV").jqGrid('delRowData', rowId);
            $("#Grid_Supporting_Document_PV").trigger('reloadGrid', [{ page: 1 }]);
            var data1 = {}
            data1 = {
                DocumentName: filename
            }
            deleteImageIn_imageGrid.push(data1);
        }
    });
}
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

$(".ViewData").on("click", function () {
    $("#Document_show_popup").modal('show');
});


if ($('#ViewStatus').val() == "View") {
    $(".SupprotingDoc").hide();
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

function validateSendToUnderExploration() {

    $('#ByClickExp_Ok').prop("disabled", false);
    $('div#UnderExplorationModal').modal('show')

    $("#ByClickExp_Ok").click(function () {

        approvalStatus = [{
            FromStage: 5,
            FromStageName: "Fine Screening Review",
            Action: "Send to Exploration",
            ToStage: 16,
            ToStageName: "Extended Fine Screening"
        }];

        $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
        var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
        $('#PMDData').val(JSON.stringify(pmdData));


        targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
        $('#TargetCostGridData').val(JSON.stringify(targetCostData));

        $('#PackStatus').val(16);
        $('#CurrentStatus').val(5);

        var pmdApproveData = $('#PMDDataExp').val();
        var date = $(".daydatepicker").val();

        if (pmdApproveData == "" || date == "") {
            pmdApproveData == "" ? $(".errorshow").show() : $(".errorshow").hide();
            date == "" ? $("#Error_Daypicker").show() : $("#Error_Daypicker").hide();
        }

        else {
            $('#PackPMDDataApproveRemarks').val(pmdApproveData);
            $('#PMdDueDate').val(date);
            document.getElementById('PackageEdit_Form_Submit').submit();

            $('#ByClickExp_Ok').prop("disabled", true);
        }

        $("#PMDDataExp").keyup(function () {
            $("#PMDDataExp").val() == "" ? $(".errorshow").show() : $(".errorshow").hide();
        });

    });
}


function ValidatePackSubmitToExploration() {
    $('#ManagerApprovalOK').prop("disabled", false);

    var PackageHeaderTableData1 = [];
    var ProjectDetails = [];
    var ProjectName = $('#ProductDescription_ProjectName').val();
    var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
    var BusinessRationalData = CKEDITOR.instances["editorsk1"].getData();
    var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
    var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
    var ExpectedPackagingGridValue = [];

    var contentWithoutTags = BusinessRationalData.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    var PackageHeaderTableData1 = [];
    $(".initiated_section").each(function (i) {
        PackageHeaderTableData1.push({
            ProjectName: $('#ProductDescription_ProjectName').val(),
            ProjectType: "3",
            Hub: $(this).find('.hub_name').text(),
            Division: $(this).find('#Division').val(),
            Category: $(this).find('.addCategoryOption').val(),
            InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
            InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
            Status: "16"
        });
    });
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

    ProjectDetails =
        [{
            ProjectName: ProjectName,
            BusinessRational: BusinessRationalData
        }];
    var flag = true;

    $('#PackageEdit_Form_Submit').validate();

    if ($('#PackageEdit_Form_Submit').valid()) {
        flag = true;
    }
    else {
        flag = false;
    }


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
        document.getElementById('SusutainabitityMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if ($.isEmptyObject(ExpectedPackagingGridValue)) {
        document.getElementById('ExpectedPackagingMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if ($.isEmptyObject(BusinessValueGridData)) {
        document.getElementById('businessinfoMsg').scrollIntoView({ behavior: 'smooth' })
    }
    if (BusinessRationalData == "") {
        $(window).scrollTop($('#ErrorIn_BusinessRational').position().top)
    }
    if ($.isEmptyObject(ProductDescriptionGridValue)) {
        $(window).scrollTop($('#productdescriptionMsg').position().top)
    }
    if (ProjectName == "") {
        $(window).scrollTop($('#Error_in_ProjectName').position().top)
    }
    PackageHeaderTableData1[0].Division == "" ? (flag = false, $('#Error_Pack_Division').show()) : $('#Error_Pack_Division').hide();
    PackageHeaderTableData1[0].Division == "" ? (flag = false, document.getElementById('Error_Pack_Division').scrollIntoView({ behavior: 'smooth' })) : "";
    PackageHeaderTableData1[0].Category == "" ? (flag = false, $('#Error_pack_Category').show()) : $('#Error_pack_Category').hide();
    PackageHeaderTableData1[0].Category == "" ? (flag = false, document.getElementById('Error_pack_Category').scrollIntoView({ behavior: 'smooth' })) : "";

    if (flag) {

        if (statusname == '9') {

            $('div#SubmitForHGML').modal('show');
            $("#ManagerApprovalOK").click(function () {
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
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "16"
                    });
                });
                ProjectDetails =
                    [{
                        ProjectName: ProjectName,
                        BusinessRational: BusinessRationalData,
                        PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                    }];

                var PackageInitiatorRemarks = $("#ShowManagerApprovalRemarks").val()

                approvalStatus = [{
                    ProjectType: "Package Initiatives",
                    FromStage: 9,
                    FromStageName: "Pending for Approval",
                    Action: "Send to Fine Screening Review",
                    ToStage: 16,
                    ToStageName: "Extended Fine Screening"
                }];
                $('#PackStatus').val(16);
                $('#CurrentStatus').val(9);

                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks)

                $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
                $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
                $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
                $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
                $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
                $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#ManagerApprovalOK').prop("disabled", true);
            });
        }

        else {
            $('div#SubmitModal').modal('show');
            $("#ByClickOk").click(function () {

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
                        Hub: $(this).find('.hub_name').text(),
                        Division: $(this).find('#Division').val(),
                        Category: $(this).find('.addCategoryOption').val(),
                        InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
                        InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
                        Status: "16"
                    });
                });
                ProjectDetails =
                    [{
                        ProjectName: ProjectName,
                        BusinessRational: BusinessRationalData,
                        PackageInitiatorRemarks: $("#Pack_InitiatorRemarks").val()

                    }];

                var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val()

                if (statusname == '11') {
                    approvalStatus = [{
                        ProjectType: "Package Initiatives",
                        FromStage: 11,
                        FromStageName: "Brief demoted to Initiator",
                        Action: "Send to Extended Fine Screening",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening"
                    }];
                    $('#PackStatus').val(16);
                    $('#CurrentStatus').val(11);
                }
                if (statusname == '8') {
                    approvalStatus = [{
                        ProjectType: "Package Initiatives",
                        FromStage: 8,
                        FromStageName: "Sent Back to Initiator",
                        Action: "Send to Extended Fine Screening",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening"
                    }];
                    $('#PackStatus').val(16);
                    $('#CurrentStatus').val(8);
                }
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#PackageInitiatorRemarks").val(PackageInitiatorRemarks)

                $('#PackageHeaderTableData').val(JSON.stringify(PackageHeaderTableData1));
                $('#PackageProjectDetails').val(JSON.stringify(ProjectDetails));
                $('#PackageProductDescription').val(JSON.stringify(ProductDescriptionGridValue));
                $('#PackageBusinessInformation').val(JSON.stringify(BusinessValueGridData));
                $('#PackageExpextedPackagingProfile').val(JSON.stringify(ExpectedPackagingGridValue));
                $('#PackageSustainability').val(JSON.stringify(SustainabilityGridValue));

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#ByClickOk').prop("disabled", true);
            });
        }
    }
}

function ValidatePackSubmitToExplorationFromHGML() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );

    $('#PackSendToPmd_Ok').prop("disabled", false);

    var flag = true;
    if (statusname == "2" || statusname == "13") {

        $('#HGMLYesOrNo').val() === '' ? ($('#Error_HGMLData').show(), flag = false, document.getElementById('Error_HGMLData').scrollIntoView({ behavior: 'smooth' })) : $('#Error_HGMLData').hide();

        var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

        if ($('#HGMLYesOrNo').val() == 'No') {

            flag = true;
            hgmlData.length === 0 ? ($('#Error_HgmlData_Grid').show(), flag = false) : $('#Error_HgmlData_Grid').hide();
        }
        else {
            flag = false;
        }

        if (flag)
            $('div#SendToPmdModal').modal('show');

        $("#PackSendToPmd_Ok").click(function () {
            var sendToPmdRemarks = $('#ShowSendToPmdRemarks').val();
            if (statusname == "2") {
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: "HGML Review",
                    Action: "Send to PMD",
                    ToStage: 16,
                    ToStageName: "Extended Fine Screening"
                }];
                $('#CurrentStatus').val(2);
            }
            if (statusname == "13") {
                approvalStatus = [{
                    FromStage: 13,
                    FromStageName: "Breif Demoted to HGML",
                    Action: "Send to PMD",
                    ToStage: 16,
                    ToStageName: "Extended Fine Screening"
                }];
                $('#CurrentStatus').val(13);
            }


            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#PackStatus').val(16);

            $('#SavedRemarks').val(JSON.stringify(savedArray))
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

            if (sendToPmdRemarks == "") {
                $('#Error_SendToPMD').show();
                return false;
            }
            else {
                $('#PackSendToPmdRemarks').val(sendToPmdRemarks);

                document.getElementById('PackageEdit_Form_Submit').submit();

                $('#PackSendToPmd_Ok').prop("disabled", true);
            }
        });
    }
    $("#ShowSendToPmdRemarks").keyup(function () {
        $("#ShowSendToPmdRemarks").val() == "" ? $("#Error_SendToPMD").show() : $("#Error_SendToPMD").hide();
    });
    if (statusname == "4" || statusname == "14") {
        var flag = true;
        var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
        hgmlData.length === 0 ? ($('#Error_HgmlData_Grid').show(), document.getElementById('Error_HgmlData_Grid').scrollIntoView({ behavior: 'smooth' }), flag = false) : $('#Error_HgmlData_Grid').hide();
        if (flag) {
            $('div#SendToPmdModal').modal('show');

            $("#PackSendToPmd_Ok").click(function () {
                var sendToPmdRemarks = $('#ShowSendToPmdRemarks').val();

                if (statusname == "4") {
                    approvalStatus = [{
                        FromStage: 4,
                        FromStageName: "HGML Approve",
                        Action: "Send to PMD",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening"
                    }];
                    $('#CurrentStatus').val(4);
                }
                if (statusname == "14") {
                    approvalStatus = [{
                        FromStage: 14,
                        FromStageName: "Brief Demoted to HMGL",
                        Action: "Send to PMD",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening"
                    }];
                    $('#CurrentStatus').val(14);
                }

                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#PackStatus').val(16);

                $('#SavedRemarks').val(JSON.stringify(savedArray))
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

                if (sendToPmdRemarks == "") {
                    $('#Error_SendToPMD').show();
                    return false;
                }
                else {
                    $('#PackSendToPmdRemarks').val(sendToPmdRemarks);

                    document.getElementById('PackageEdit_Form_Submit').submit();

                    $('#PackSendToPmd_Ok').prop("disabled", true);
                }

            });
        }
    }
}

function SendBacktoPMDbyUnderExp() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );
    $('#SendBacFromkHGMLReview_Ok').prop("disabled", false);

    var flag = true;
    var approvalStatus = [];

    if (flag) {
        $('div#SendbackModal').modal('show');
        $("#SendBacFromkHGMLReview_Ok").click(function () {

            if (statusname === "16") {
                approvalStatus = [{
                    FromStage: 16,
                    FromStageName: "Extended Fine Screening",
                    Action: "Send Back",
                    ToStage: 5,
                    ToStageName: "Fine Screening Review"
                }];
                $('#CurrentStatus').val(16);
            }
            $('#PackStatus').val(5);

            var sendbacktoinitiatorRemarks = $('#ShowSendBackRemarks').val();

            if (sendbacktoinitiatorRemarks == "") {
                $('#Error_SendBacktoInitiator').show();
                return false;

            }
            else {

                var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
                $('#PMDData').val(JSON.stringify(pmdData));


                targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                $('#TargetCostGridData').val(JSON.stringify(targetCostData));

                $('#packageSendBackToInitiatorRemarks').val(sendbacktoinitiatorRemarks);

                $('#SavedRemarks').val(JSON.stringify(savedArray))
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData))

                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                document.getElementById('PackageEdit_Form_Submit').submit();
                $('#SendBacFromkHGMLReview_Ok').prop("disabled", true);

            }
        });
    }

}

function validateSendToOtherHubForm() {
    $('#SendOtherhubModal').modal('show');
}
colModel = [
    {
        name: 'Action',
        resizable: true,
        width: 70,
        label: 'Action',
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
            <a onclick = onDeleteHubApproveData_Other(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
        </div>`;
        }

    },
    {
        name: 'HubName',
        resizable: true,
        width: 70,
        label: 'Hub Name',
        ignoreCase: true,

    },
    {
        name: 'HubUser',
        resizable: true,
        width: 80,
        label: 'Hub User',
        ignoreCase: true,

    },
    {
        name: 'Remarks',
        resizable: true,
        width: 80,
        label: 'Remarks',
        ignoreCase: true,

    },

],
    $("#OtherHubs").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        colModel: colModel,
        pager: '#pager_OtherHubs',
        viewrecords: true,
        sortorder: "asec",

        gridComplete: function () {
            var objRows = $("#OtherHubs tbody tr");
            var objHeader = $("#OtherHubs tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });


$('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'height': '30vh' });

var $TableHeight1 = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight1 > 290) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px")
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")

}
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/GetOtherHubApprovalData",
        data: { projectId: GetData.ProjectDetails[0].ProjectId },
        dataType: "json",
        success: function (Result) {
            if (Result.ApprovalData != null) {
                $("option").remove(".OtherHubUsersOption");
                var OtherhubList = '<option value="">None Selected</option>'
                $.each(Result.ApprovalData, function (i, obj) {
                    OtherhubList += '<option class="OtherHubUsersOption" value="' + obj.HubId + '">' + obj.HubName + '</option>';
                })

                $("#HgmlData_Other_HubDropdownApprove").html(OtherhubList);
                $("#HgmlData_Other_HubDropdownApprove").multiselect('rebuild');

            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

});

$("#HgmlData_Other_HubDropdownApprove").change(function (e) {
    $("#Error_Other_HgmlDataHubApprove").hide();
    var HubIds = $("#HgmlData_Other_HubDropdownApprove").val();
    var Hub = HubIds.toString();
    $.ajax({
        type: "POST",
        url: ROOT + "Base/GetUserEmailBasedOnHub",
        data: { hubIds: Hub },
        success: function (UserEmailResult) {

            if (UserEmailResult != null) {

                var OtheruserEmailList = '';
                $("option").remove(".HubUsersOption");
                $.each(UserEmailResult, function (i, obj) {
                    OtheruserEmailList += '<option id="HUbUsersoptions" class="HubUsersOption ' + obj.Hub + '" value="' + obj.HgmlDataHubUsersList + '">' + obj.Hub + ' - ' + obj.HgmlDataHubUsersList + '</option>';
                })
                $("#HgmlData_Other_HubUsersDropdownApprove").html(OtheruserEmailList);
                $('#HgmlData_Other_HubUsersDropdownApprove').multiselect('rebuild');

            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});
$("#HgmlData_Other_HubUsersDropdownApprove").change(function (e) {
    $("#Error_Other_HgmlDataHubUsersApprove").hide();
    $('.HubUsersOption').find('input[type=checkbox]').prop("disabled", false);
    var selectList = $(this).find('option:selected');
    $.each(selectList, function (i, obj1) {
        $(".HubUsersOption").each(function (i, obj2) {
            if ($(this).attr("class").replace(' multiselect-filter-hidden', '') == obj1.className && $.trim($(this).val()) != $.trim(obj1.value)) {
                $(this).find('input[type=checkbox]').prop("disabled", true);
            }
        });
    });
});

$('#send_Ohter_HubHgmlApproveAddbBtn').click(function () {

    var flag = true;
    var allData = $('#OtherHubs').jqGrid('getGridParam', 'data');
    var HubName = $('#HgmlData_Other_HubDropdownApprove option:selected').text();

    $.each(allData, function (i, item) {
        if (item.HubName == HubName) {
            $('#Other_HubDupErr').show();
            flag = false;
        }
        else {
            $('#Other_HubDupErr').hide();
        }
    });
    var remarks = $('#SendOtherHubApproveRemarks').val();
    var user = $('#HgmlData_Other_HubUsersDropdownApprove option:selected').val();
    var hub = $('#HgmlData_Other_HubDropdownApprove option:selected').text();

    if (user === undefined || hub === "None Selected") {

        hub === "None Selected" ? ($('#Error_Other_HgmlDataHubApprove').show(), flag = false) : $('#Error_Other_HgmlDataHubApprove').hide()
        user === undefined ? ($('#Error_Other_HgmlDataHubUsersApprove').show(), flag = false) : $('#Error_Other_HgmlDataHubUsersApprove').hide()
    }
    if (flag) {
        var gridDataHub = [];
        HubData = {
            HubName: hub,
            HubUser: user,
            Remarks: remarks,
        }

        if (ProductDescriptionEditRowId == 0) {
            gridDataHub.push(HubData);
            var PD1 = $("#OtherHubs").jqGrid('getGridParam', 'data');
            var PD2 = $.merge(PD1, gridDataHub);
            $("#OtherHubs").jqGrid('setGridParam', { data: PD2 });
            $("#OtherHubs").trigger('reloadGrid', [{ page: 0 }]);

            $("#HgmlData_Other_HubUsersDropdownApprove").val("").multiselect("rebuild");
            $("#HgmlData_Other_HubDropdownApprove").val("").multiselect("refresh");
            $("#SendOtherHubApproveRemarks").val("");
        }
    }

});
function onDeleteHubApproveData_Other(RowId) {
    $("#OtherHubs").jqGrid('delRowData', RowId);
    $("#OtherHubs").trigger('reloadGrid', [{ page: 1 }]);
}
function HgmlApproveSendTo_Ohter_Hub() {

    $('#Error_Other_HubGridData').hide()
    var hubGridData1 = $('#OtherHubs').jqGrid('getGridParam', 'data');

    if (hubGridData1.length != 0) {
        var hubData1 = $('#OtherHubs').jqGrid('getGridParam', 'data');

        if (statusname == "4") {
            approvalStatus = [{
                FromStage: 4,
                FromStageName: "HGML Approve",
                Action: "Send from HGML Approve",
                ToStage: 3,
                ToStageName: "HUB Review"
            }];
            $('#CurrentStatus').val(4);
        }
        if (statusname == "14") {
            approvalStatus = [{
                FromStage: 14,
                FromStageName: "Brief Demoted to HGML",
                Action: "Send from HGML Approve",
                ToStage: 3,
                ToStageName: "HUB Review"
            }];
            $('#CurrentStatus').val(14);
        }

        var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
        $('#HgmlData').val(JSON.stringify(hgmlData));
        $('#JsonPackHgmlToOtherHubData').val(JSON.stringify(hubData1));
        $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
        $('#PackStatus').val(3);
        $('#PackageEdit_Form_Submit').submit();

    }
    else {
        $('#Error_Other_HubGridData').show();
        $("#HgmlData_Other_HubUsersDropdownApprove").val("").multiselect("refresh");
        $("#HgmlData_Other_HubDropdownApprove").val("").multiselect("refresh");
        $("#SendOtherHubApproveRemarks").val("");
    }
}

$('.daydatepicker').datepicker({
    autoclose: true,
    viewMode: 'months',
    startDate: '+0d',
    forceParse: false,
    todayHighlight: true,
    format: 'dd-mm-yyyy'
});
function previewgetdetails() {
    $(".PI_ProjectName_V").html(GetData.ProjectDetails[0].ProjectName)

}
$('#ProductDescription_ProjectName').change(function () {

    $('.PI_ProjectName_V').text($('#ProductDescription_ProjectName').val())
});
//CKEDITOR.instances.editor1.on('change', function () {
//    $('.PI_BusinessRational_V').empty();
//    var businessrational = `<span>` + CKEDITOR.instances["editor1"].getData() + `</span>`;
//    $('.PI_BusinessRational_V').append(businessrational);
//});
$('#HGMLYesOrNo').change(function () {

    $('.PI_HUBYesNo_V').text($('#HGMLYesOrNo').val())
});
$('#HgmlData_HubDropdown').change(function () {

    $('.PI_HUB_V').text($('#HgmlData_HubDropdown option:selected').text())
});
$('#HgmlData_HubUsersDropdown').change(function () {

    $('.PI_HUBUser_V').text($('#HgmlData_HubUsersDropdown option:selected').text())
});

$("#HGMLtoHubRemarks").on('keyup', function () {
    $('.PI_Remarks_V').text($('#HGMLtoHubRemarks').val())

});

$(".PackProductDescriptionHGMLReamrks").on('keyup', function () {
    $('.PR_HGMLRemarks').text($(this).val())
});
$(".preview").on('click', function () {
    $(".TotalBusinessValue_PV").text($(".TotalBusinessValue").val())
    IsPreview = 1;
    $('.Division_PV').text($("#Division option:selected").text());
    if ($('.Division_PV').text() == '--Select--') {
        $('.Division_PV').text('')
    }
    $('.Category_PV').text($(".addCategoryOption option:selected").text());
    if ($('.Category_PV').text() == '---Select---') {
        $('.Category_PV').text('')
    }
    $('.ProductDescription_ProjectName_V').text($("#ProductDescription_ProjectName").val());
    $(".PackProductDescription_HUBReamrks_PV").text($(".PackProductDescription_HUBReamrks").val())
    $(".PackPackageProfile_HUBRemarks_PV").text($(".PackPackageProfile_HUBRemarks").val())
    $(".PackBusinessInformation_HUBRemarks_PV").text($(".PackBusinessInformation_HUBRemarks").val())
    $(".PackExpectedPack_HUBRemarks_PV").text($(".PackExpectedPack_HUBRemarks").val())
    $(".PackSustainabilityHUBRemarks_PV").text($(".PackSustainabilityHUBRemarks").val())
    $(".InitiatorRemarks_PV").text($("#InitiatorRemarks").val())
    $(".PackProductDescription_PMDReamrks_PV").text($(".PackProductDescription_PMDReamrks").val())
    $(".PackPackageProfilePMDRemarks_PV").text($(".PackPackageProfilePMDRemarks").val())
    $('.PackPackageProfilePMDRemarks_PV').text($('.PackPackageProfile_HUBRemarks').val())
    $(".PackSustainabilityPMDRemarks_PV").text($(".PackSustainabilityPMDRemarks").val())
    $(".PackBusinessInformation_PMDRemarks_PV").text($(".PackBusinessInformation_PMDRemarks").val())
    var hub = GetData.PackageHeader[0].Hub
    $("#businessinfo_hub").text(hub)

    $('.PI_BusinessRational_V').empty();
    var businessrational = `<span>` + CKEDITOR.instances["editorsk1"].getData() + `</span>`;
    $('.PI_BusinessRational_V').append(businessrational);

    var Proddesc = $("#product_description").jqGrid('getGridParam', 'data');
    $('#product_description_PV').jqGrid('clearGridData');
    $("#product_description_PV").jqGrid('setGridParam', { data: Proddesc });
    $("#product_description_PV").trigger('reloadGrid', [{ page: 1 }]);

    var Businessinfo = $("#business_info").jqGrid('getGridParam', 'data');
    $('#businessInfoGrid_PV').jqGrid('clearGridData');
    $("#businessInfoGrid_PV").jqGrid('setGridParam', { data: Businessinfo });
    $("#businessInfoGrid_PV").trigger('reloadGrid', [{ page: 1 }]);

    var sustainability = $("#SustainabiltityGrid").jqGrid('getGridParam', 'data');
    $('#SustainabiltityGrid_PV').jqGrid('clearGridData');
    $("#SustainabiltityGrid_PV").jqGrid('setGridParam', { data: sustainability });
    $("#SustainabiltityGrid_PV").trigger('reloadGrid', [{ page: 1 }]);

    var supportingDocumentGridData = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
    $('#Grid_Supporting_Document_PV').jqGrid('clearGridData');
    $("#Grid_Supporting_Document_PV").jqGrid('setGridParam', { data: supportingDocumentGridData });
    $("#Grid_Supporting_Document_PV").trigger('reloadGrid', [{ page: 1 }]);
    $("#Grid_Supporting_Document_PV").find("i.fa-pen").remove();
    $("#Grid_Supporting_Document_PV").find("i.fa-trash").remove();

    var businessrationhubremarks = $("#BusinessRationalHUBRemarksGrid").jqGrid('getGridParam', 'data');
    $('#BusinessRationalHUBRemarksGrid_PV').jqGrid('clearGridData');
    $("#BusinessRationalHUBRemarksGrid_PV").jqGrid('setGridParam', { data: businessrationhubremarks });
    $("#BusinessRationalHUBRemarksGrid_PV").trigger('reloadGrid', [{ page: 1 }]);

    var HGMLYesOrNO = $("#HGMLYesOrNo").val();
    $('.PackProductDescriptionHGMLReamrks_PV').text($('.PackProductDescriptionHGMLReamrks').val());
    $('.PackPackageProfileHGMLRemarks_PV').text($('.PackPackageProfileHGMLRemarks').val());
    $('.PackBusinessInformationHGMLRemarks_PV').text($('.PackBusinessInformationHGMLRemarks').val());
    $('.PR_HGMLRemarks').text($('#PackExpectedPackHGMLRemarks').val());
    $('.PackSustainabilityHGMLRemarks_PV').text($('.PackSustainabilityHGMLRemarks').val());

    if (statusname == "2" || statusname == "13") {
        if (HGMLYesOrNO == "Yes") {
            $("#tableyesshow").show();
            $("#tablenoshow").hide();
            var selectedValues = $("#HgmlData_HubDropdown").val();
            var selectedTexts = [];
            selectedValues.forEach(function (value) {
                var matchingOption = $("#HgmlData_HubDropdown option[value='" + value + "']");
                if (matchingOption.length > 0) {
                    selectedTexts.push(matchingOption.text());
                }
            });
            $(".PI_HUB_V").text(selectedTexts.toString());
            $('.PI_HUBUser_V').text($('#HgmlData_HubUsersDropdown').val())

            $('.PI_Remarks_V').text($('.PackHGMLtoHubRemarks').val())

        }
        else if (HGMLYesOrNO == 'No') {
            $("#tableyesshow").hide();
            $("#tablenoshow").show();
            var HGMLData = $("#HGML_Data").jqGrid('getGridParam', 'data');
            $('#HGML_Data_PV').jqGrid('clearGridData');
            $("#HGML_Data_PV").jqGrid('setGridParam', { data: HGMLData });
            $("#HGML_Data_PV").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            $("#tableyesshow").hide();
            $("#tablenoshow").hide();
        }
    }

    $(".PI_PackHGMLtoHubRemarks_V").text($(".PackHGMLtoHubRemarks").val())
    $(".PI_HgmlData_HUBParticipatingMarkets_V").text($("#HgmlData_HUBParticipatingMarkets").val())
    $(".PI_PackageHGMLDataHUBRemarks_V").text($(".PackHGML_HUBRemarks").val())

    //var Businessinfo = $("#HUBbusinessInfo").jqGrid('getGridParam', 'data');
    //$('#HUBbusinessInfo_PV').jqGrid('clearGridData');
    //$("#HUBbusinessInfo_PV").jqGrid('setGridParam', { data: Businessinfo });
    //$("#HUBbusinessInfo_PV").trigger('reloadGrid', [{ page: 1 }]);
    $('#BI_TotalBusinessValue_V_Y1').val($("#BI_TotalBusinessValue_Y1").val());
    $('#BI_TotalBusinessValue_V_Y2').val($("#BI_TotalBusinessValue_Y2").val());
    $('#BI_TotalBusinessValue_V_Y3').val($("#BI_TotalBusinessValue_Y3").val());
    if (statusname == "14" || statusname == "4" || statusname == "6" || statusname == "12" || statusname == "5") {
        $(".tablenoshow").show();
    }
    var HGMLData = $("#HGML_Data").jqGrid('getGridParam', 'data');
    $('#HGML_Data_V').jqGrid('clearGridData');
    $("#HGML_Data_V").jqGrid('setGridParam', { data: HGMLData });
    $("#HGML_Data_V").trigger('reloadGrid', [{ page: 1 }]);

    var Sustaindata = $("#Sustainability_Remarks").jqGrid('getGridParam', 'data');
    $('#Sustainability_Remarks_V').jqGrid('clearGridData');
    $("#Sustainability_Remarks_V").jqGrid('setGridParam', { data: Sustaindata });
    $("#Sustainability_Remarks_V").trigger('reloadGrid', [{ page: 1 }]);


    var packagedata = $("#Packaging_Profile_Remarks").jqGrid('getGridParam', 'data');
    $('#Packaging_Profile_Remarks_V').jqGrid('clearGridData');
    $("#Packaging_Profile_Remarks_V").jqGrid('setGridParam', { data: packagedata });
    $("#Packaging_Profile_Remarks_V").trigger('reloadGrid', [{ page: 1 }]);

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


    var FormulationRemarks = $("#Formulation_Profile_Remarks").jqGrid('getGridParam', 'data');
    $('#Formulation_Profile_Remarks_V').jqGrid('clearGridData');
    $("#Formulation_Profile_Remarks_V").jqGrid('setGridParam', { data: FormulationRemarks });
    $("#Formulation_Profile_Remarks_V").trigger('reloadGrid', [{ page: 1 }]);

    var pmdreview = $("#PMD_Data").jqGrid('getGridParam', 'data');
    $('#PMD_Data_V').jqGrid('clearGridData');
    $("#PMD_Data_V").jqGrid('setGridParam', { data: pmdreview });
    $("#PMD_Data_V").trigger('reloadGrid', [{ page: 1 }]);

    var targetcost = $("#Target_Cost").jqGrid('getGridParam', 'data');
    $('#Target_Cost_V').jqGrid('clearGridData');
    $("#Target_Cost_V").jqGrid('setGridParam', { data: targetcost });
    $("#Target_Cost_V").trigger('reloadGrid', [{ page: 1 }]);

    var hubstatus = $("#HUB_ParticipatingMarkets").jqGrid('getGridParam', 'data');
    $('#HUB_ParticipatingMarkets_V').jqGrid('clearGridData');
    $("#HUB_ParticipatingMarkets_V").jqGrid('setGridParam', { data: hubstatus });
    $("#HUB_ParticipatingMarkets_V").trigger('reloadGrid', [{ page: 1 }]);

    $('.PD_PMD_Remarks_V').text($('#PD_PMD_Remarks').val());
    $('.PP_PMD_Remarks_V').text($('#PP_PMD_Remarks').val());
    $('.FP_PMD_Remarks_V').text($('#FP_PMD_Remarks').val());
    $('.PPR_PMD_Remarks_V').text($('#PPR_PMD_Remarks').val());
    $('.SUS_PMD_Remarks_V').text($('#SUS_PMD_Remarks').val());
    $('.BI_PMD_Remarks_V').text($('#BI_PMD_Remarks').val());
    $('.Pack_InitiatorRemarks_PV').text($('#Pack_InitiatorRemarks').val());

    $(".edithide").hide();
    $(".deletehide").hide();
    $(".hide_field_remarks").hide();

});

var page = $("#Page").val();
if (page == "HGH") {
    $(".preview").addClass('hide');
    $(".link_href").addClass('hide');
    $(".PackagingInit_Cancel").addClass('hide');
}
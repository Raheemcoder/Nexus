var ReformulationJQgrid = $.parseJSON($('#ReformulationJSON').val());
var JsonFormReformulationHgmlReviewData = $.parseJSON($('#JsonFormReformulationHgmlReviewData').val());


$(document).ready(function () {
    $(".remarks").attr('disabled', true);
    $('#ProjectName').val(ReformulationJQgrid.ReformulationTableData[0].ProjectName);
    $('#Division').val(ReformulationJQgrid.ReformulationTableData[0].Division);
    $('#Hub').text(ReformulationJQgrid.ReformulationTableData[0].Hub);
    $('#Reformulation_InitiatedBy').text(ReformulationJQgrid.ReformulationTableData[0].InitiatedBy);
    $('#Reformulation_InitiatedDate').text(ReformulationJQgrid.ReformulationTableData[0].InitiatedDate);
    $('#Reformulation_Status').text(ReformulationJQgrid.ReformulationTableData[0].Status);
    $('#AdditionalRequirementsTextBox').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].AdditionalFormulation);
    $('#AdditionalRequirmentsShelfLife').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].ShelfLife);
    $('#AdditionalRequirmentsFreeFrom').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].FreeFrom);
    $('#AdditionalRequirmentsOthers').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].Others);
    $('#ProjectDetailsBusinessRational').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].BusinessRational);
    $('#ProjectDetailsBenchmarkSampleFormulation').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].BenchmarkSample);
    $('#ProjectDetailsDesiredIndications').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].DesiredIndication);
    $('#ProjectDetailsDesiredDosageForm').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].DesiredDosageForm);

    var todayDate = new Date(ReformulationJQgrid.ReformulationTableData[0].InitiatedDate);
    $('#Reformulation_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));

    $('#ProjDetails_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
    $('#PD_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.ProductDetailsHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.ProductDetailsHGMLRemarksList[0].ProductDetailsHgmlRemark);
    $('#FP_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.FormulationProfileHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
    $('#PPR_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.PackagingProfileHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
    $('#BI_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.BusinessInformationHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);


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
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('editorpp12', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorsp1', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editortp1', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorotany', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorpp212', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorsp2', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editortp3', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorotany1', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorpp33', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorpp44', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorpp55', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorotany2', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});



ReformulationJQgrid = $.parseJSON($('#ReformulationJSON').val());

$('#ProjectName').val(ReformulationJQgrid.ReformulationTableData[0].ProjectName);
$('#ProjectId').val(ReformulationJQgrid.ReformulationTableData[0].ProjectId);
//$('.BusinessRationalData').val(ReformulationJQgrid.ProjectDetails[0].BusinessRational);
$('#editor').val(ReformulationJQgrid.InitiatorRemarksDb[0]);
$('#Division').val(ReformulationJQgrid.ReformulationTableData[0].Division);
$('#Reformulation_InitiatedBy').val(ReformulationJQgrid.ReformulationTableData[0].InitiatedBy);
$('#Reformulation_InitiatedDate').val(ReformulationJQgrid.ReformulationTableData[0].InitiatedDate);
$('#Reformulation_Status').val(ReformulationJQgrid.ReformulationTableData[0].Status);
$('#AdditionalRequirementsTextBox').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].AdditionalFormulation);
$('#AdditionalRequirmentsShelfLife').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].ShelfLife);
$('#AdditionalRequirmentsFreeFrom').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].FreeFrom);
$('#AdditionalRequirmentsOthers').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].Others);
$('#ProjectDetailsBusinessRational').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].BusinessRational);
$('#ProjectDetailsBenchmarkSampleFormulation').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].BenchmarkSample);
$('#ProjectDetailsDesiredIndications').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].DesiredIndication);
$('#ProjectDetailsDesiredDosageForm').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].DesiredDosageForm);


var DivId = $("#Division").val();
var categoryId = $("#Category").val();
$.ajax({
    type: "POST",
    url: ROOT + "User/GetCategoryBYId",
    data: { divisionId: DivId },
    dataType: "json",
    success: function (Categoryresult) {

        if (Categoryresult != null) {
            $("option").remove(".CategoryOption");
            var CategoryList = ''; $.each(Categoryresult, function (i, obj) {

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






data = [
    {
        "Action": " ",
        "ExistingBrandName": "Himalaya anti hair fall shampoo",
        "NewBrandName": "Himalaya anti hair fall Bhringraja shampoo",

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
            return '<div class="text-center icon_section align-items-left">' +
                '<a onclick=onEditProductDescription(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeleteProductDescription(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';
        }
    },
    {
        name: 'ExistingName',
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
        ignoreCase: true
    },


],

    $("#prd_desc").jqGrid({
        url: '',
        datatype: 'local',
        data: ReformulationJQgrid['ReformulationProductDetails'],
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
$('#ProductDescriptionAdd').click(function () {

    $.each($('.ProductDescription'), function (i, v) {
        if ($.trim($(this).val()) === "" || $.trim($(this).val()) === null) {
            $(this).parents('.form-group').find('.Err-ProductDescription').show();
            isvalid = false;
        } else {
            $(this).parents('.form-group').find('.Err-ProductDescription').hide();
        }
        SKU = CKEDITOR.instances["editornf"].getData();
        SKU == "" ? ($('#Err-ProductDescription-sku').show(), isvalid = false) : $('#Err-ProductDescription').hide()

    });
    var ProductDesctipitonReformulation = {};

    if (isvalid) {
        var gridDataProductDesctipiton = [];
        ProductDesctipitonReformulation = {
            ExistingName: $("#ProductExistingName").val(),
            NewBrandName: $("#ProductDescriptionNewBrandName").val(),
            SKU: CKEDITOR.instances["editornf"].getData(),
        }
        if (ProductDescriptionEditRowId == 0) {
            gridDataProductDesctipiton.push(ProductDesctipitonReformulation);
            var PD1 = $("#prd_desc").jqGrid('getGridParam', 'data');
            var PD2 = $.merge(PD1, gridDataProductDesctipiton);
            $("#prd_desc").jqGrid('setGridParam', { data: PD2 });
            $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            $.each(ProductDesctipitonReformulation, function (key, value) {
                $("#prd_desc").jqGrid('setCell', ProductDescriptionEditRowId, key, value);
                CKEDITOR.instances["editornf"].getData();
                $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);
            });
            ProductDescriptionEditRowId = 0;
        }
        $(".ProductDesctipitonEmpty").val("");
        CKEDITOR.instances["editornf"].setData('');

    }
    isvalid = true;
});



function onEditProductDescription(RowIdProductDescription) {

    ProductDescriptionEditRowId = RowIdProductDescription;
    var DataFromGridProductDescription = jQuery('#prd_desc').jqGrid('getRowData', ProductDescriptionEditRowId)
    $("#ProductExistingName").val(DataFromGridProductDescription.ExistingName);
    $("#ProductDescriptionNewBrandName").val(DataFromGridProductDescription.NewBrandName);
    CKEDITOR.instances["editornf"].setData(DataFromGridProductDescription.SKU);
}

function onDeleteProductDescription(RowIdProductDescription) {


    $('div#jqGridRow_DeleteModal').modal('toggle');

    $('#jqGridRow_DeleteModal_Ok').click(function () {


        $("#prd_desc").jqGrid('delRowData', RowIdProductDescription);
        $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);


    });
}


function onEditProductDescription(RowIdProductDescription) {

    ProductDescriptionEditRowId = RowIdProductDescription;
    var DataFromGridProductDescription = jQuery('#prd_desc').jqGrid('getRowData', ProductDescriptionEditRowId)
    $("#ProductExistingName").val(DataFromGridProductDescription.ExistingName);
    $("#ProductDescriptionNewBrandName").val(DataFromGridProductDescription.NewBrandName);
    CKEDITOR.instances["editornf"].setData(DataFromGridProductDescription.SKU);
}

function onDeleteProductDescription(RowIdProductDescription) {


    $('div#jqGridRow_DeleteModal').modal('toggle');

    $('#jqGridRow_DeleteModal_Ok').click(function () {

        $(".ProductDesctipitonEmpty").val("");
        CKEDITOR.instances["editornf"].setData('');
        $("#prd_desc").jqGrid('delRowData', RowIdProductDescription);
        $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);

        ProductDescriptionEditRowId = 0;

    });
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
        name: 'ProposedName',
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
        name: 'RevisionInPackagingFormat',
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
        data: ReformulationJQgrid['ReformulationBusinessInformation'],
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



$("#BusinessInformationSellingPrice, #BusinessInformationY2").change(function () {

    $("#BI_BusinessValue").val("");
    if ($("#BusinessInformationSellingPrice").val() != "" && $("#BusinessInformationY2").val() != "") {
        $("#BusinessInformationBusinessValue").val($("#BusinessInformationSellingPrice").val() * $("#BusinessInformationY2").val());
    }
});



var RowIdBusinessInformation = 0;
var EditRowIdBusinessInformation = 0;
var isvalid = true;
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
    var SP, TP, GP, M1, M2, M3, Y1, Y2, Y3, Proposedlaunchdate;
    GP = $("#BusinessInformationExpectedGP").val();
    SP = $("#BusinessInformationSellingPrice").val();
    M1 = $("#BusinessInformationM1").val();
    M2 = $("#BusinessInformationM2").val();
    M3 = $("#BusinessInformationM3").val();
    Y1 = $("#BusinessInformationY1").val();
    Y2 = $("#BusinessInformationY2").val();
    Y3 = $("#BusinessInformationY3").val();
    TP = $("#BusinessInformationProposedTP").val();

    var date = $("#BusinessInformationLaunchDate").val();
    var Proposedlaunchdate = new Date(date);
    Proposedlaunchdate = Proposedlaunchdate.toLocaleDateString("nl", { year: "numeric", month: "2-digit", day: "2-digit" });
    if (TP != "" && GP != "" && SP != "" && M1 != "" && M2 != "" && M3 != "" && Y1 != "" && Y2 != "" && Y3 != "" && SP != "") {
        TP = parseFloat(TP.replace(/,/g, ''));
        GP = parseFloat(GP.replace(/,/g, ''));
        SP = parseFloat(SP.replace(/,/g, ''));
        M1 = parseFloat(M1.replace(/,/g, ''));
        M2 = parseFloat(M2.replace(/,/g, ''));
        M3 = parseFloat(M3.replace(/,/g, ''));
        Y1 = parseFloat(Y1.replace(/,/g, ''));
        Y2 = parseFloat(Y2.replace(/,/g, ''));
        Y3 = parseFloat(Y3.replace(/,/g, ''));
        (GP < 1 || GP > 100) && expectedGP != "" ? ($('#Error_Range_ExpectedGP').show(), flag = false) : $('#Error_Range_ExpectedGP').hide();
        if (isNaN(M1) || isNaN(M2) || isNaN(M3) || isNaN(Y1) || isNaN(Y2) || isNaN(Y3) || isNaN(TP) || isNaN(GP) || isNaN(SP)) {
            isvalid = false;
            isNaN(M1) ? $("#Err-NAN-M1").show() : $("#Err-NAN-M1").hide()
            isNaN(M2) ? $("#Err-NAN-M2").show() : $("#Err-NAN-M2").hide()
            isNaN(M3) ? $("#Err-NAN-M3").show() : $("#Err-NAN-M3").hide()
            isNaN(Y1) ? $("#Err-NAN-Y1").show() : $("#Err-NAN-Y1").hide()
            isNaN(Y2) ? $("#Err-NAN-Y2").show() : $("#Err-NAN-Y2").hide()
            isNaN(Y3) ? $("#Err-NAN-Y3").show() : $("#Err-NAN-Y3").hide()
            isNaN(TP) ? $("#Err-NAN-TP").show() : $("#Err-NAN-TP").hide()
            isNaN(GP) ? $("#Err-NAN-GP").show() : $("#Err-NAN-GP").hide()
        }
    }
    M1 == 0 ? ($("#Err-Zero-M1").show(), isvalid = false) : $("#Err-Zero-M1").hide()
    M2 == 0 ? ($("#Err-Zero-M2").show(), isvalid = false) : $("#Err-Zero-M2").hide()
    M3 == 0 ? ($("#Err-Zero-M3").show(), isvalid = false) : $("#Err-Zero-M3").hide()
    Y1 == 0 ? ($("#Err-Zero-Y1").show(), isvalid = false) : $("#Err-Zero-Y1").hide()
    Y2 == 0 ? ($("#Err-Zero-Y2").show(), isvalid = false) : $("#Err-Zero-Y2").hide()
    Y3 == 0 ? ($("#Err-Zero-Y3").show(), isvalid = false) : $("#Err-Zero-Y3").hide()
    SP == 0 ? ($("#Err-Zero-SP").show(), isvalid = false) : $("#Err-Zero-SP").hide()
    var BV = SP * Y2;

    if (isvalid) {
        $('#err-business_info').hide()
        var gridDataBusinessInformation = [];
        var BusinessInformation = {};
        $("#Err-NAN-GP").hide()
        $("#Err-NAN-BV").hide()
        $("#Err-NAN-TP").hide()
        $("#Err-NAN-MRP").hide()
        $("#Err-NAN-M1").hide()
        $("#Err-NAN-M2").hide()
        $("#Err-NAN-M3").hide()
        $("#Err-NAN-Y1").hide()
        $("#Err-NAN-Y2").hide()
        $("#Err-NAN-Y3").hide()
        BusinessInformation = {
            Product: $("#BusinessInformationProductName").val(),
            SKU: $("#BusinessInformationSKU").val(),
            Proposedlaunchdate: Proposedlaunchdate,
            ProposedSellingPrice: $("#BusinessInformationSellingPrice").val(),
            ProposedTP: $("#BusinessInformationProposedTP").val(),
            ProposedMRP: $("#BusinessInformationProposedMRP").val(),
            ExpectedGP: $("#BusinessInformationExpectedGP").val(),
            BusinessValue: BV,
            M1: $("#BusinessInformationM1").val(),
            M2: $("#BusinessInformationM2").val(),
            M3: $("#BusinessInformationM3").val(),
            Y1: $("#BusinessInformationY1").val(),
            Y2: $("#BusinessInformationY2").val(),
            Y3: $("#BusinessInformationY3").val(),
            Revisioninpackagingformat: $("input[type=radio][name=survey]:checked").val(),
            UOM: $("#BusinessInformationUOM").val(),
        };
        $("input[type=radio][name=survey]").val() == "Yes" ? $("#PackagingProfile").show() : $("#PackagingProfile").hide();
        if (EditRowIdBusinessInformation == 0) {
            gridDataBusinessInformation.push(BusinessInformation);
            var BI1 = $("#business_info").jqGrid('getGridParam', 'data');
            var BI2 = $.merge(BI1, gridDataBusinessInformation);
            $("#business_info").jqGrid('setGridParam', { data: BI2 });
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            $.each(BusinessInformation, function (key, value) {
                $("#business_info").jqGrid('setCell', EditRowIdBusinessInformation, key, value);
            });
        }
        $(".BusinessInformationManditoryField").val("");
    }
    isvalid = true;
});
function onEditBusinessInformation(RowIdBusinessInformation) {
    //
    EditRowIdBusinessInformation = RowIdBusinessInformation;
    var DataFromTheRowBI = jQuery('#business_info').jqGrid('getRowData', RowIdBusinessInformation);
    $("#BusinessInformationProductName").val(DataFromTheRowBI.Product);
    $("#BusinessInformationSKU").val(DataFromTheRowBI.SKU);
    $("#BusinessInfoLaunchDate").val(DataFromTheRowBI.Proposedlaunchdate);
    $("#BusinessInformationSellingPrice").val(DataFromTheRowBI.ProposedSellingPrice);
    $("#BusinessInformationProposedTP").val(DataFromTheRowBI.ProposedTP);
    $("#BusinessInformationProposedMRP").val(DataFromTheRowBI.ProposedMRP);
    $("#BusinessInformationExpectedGP").val(DataFromTheRowBI.ExpectedGP);
    $("#BusinessInformationBusinessValue").val(DataFromTheRowBI.BusinessValue);
    $("#BusinessInformationM1").val(DataFromTheRowBI.M1Quantity);
    $("#BusinessInformationM2").val(DataFromTheRowBI.M2Quantity);
    $("#BusinessInformationM3").val(DataFromTheRowBI.M3Quantity);
    $("#BusinessInformationY1").val(DataFromTheRowBI.Y1Quantity);
    $("#BusinessInformationY2").val(DataFromTheRowBI.Y2Quantity);
    $("#BusinessInformationY3").val(DataFromTheRowBI.Y3Quantity);
    $("#BusinessInformationUOM").val(DataFromTheRowBI.UOM);
}
function onDeleteBusinessInformation(RowIdBusinessInformation) {

    $('div#jqGridRow_DeleteModal').modal('toggle');

    $('#jqGridRow_DeleteModal_Ok').click(function () {
        $("#business_info").jqGrid('delRowData', RowIdBusinessInformation);
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
    });
}

$("#ProjectDetailsBusinessRational").keyup(function () {

    $("#ProjectDetailsBusinessRational").val() == "" ? $("#Err-ProjectDetails-BusinessRational").show() : $("#Err-ProjectDetails-BusinessRational").hide();
});




function SavePackageImageFile() {


    var fileName = "";
    var files = $('#image_upload').prop("files");
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

$("#image_upload").change(function () {
    $("#Display_PackageImagesUpload").empty();
});

function ProjectDetailsImageFile() {

    var fileName = "";
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

function DownloadPackageImage(rowId) {

    var filename = $('#expected').jqGrid('getCell', rowId, 'ImagesUploadHide');
    if (filename.length > 0) {
        $('#' + rowId + 'DownloadPackageImagesUpload').prop("href", ROOT + "NewInitiation/DownloadImageFile?fileName=" + filename);
        return true;
    }
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
        name: 'Others',
        label: 'Others (If any)',
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
                      <a onclick="DownloadPackageImage(`+ options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `DownloadPackageImagesUpload"><i class="fa fa-download mr-2" title="Edit"></i></a>
                      </div>`;
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
        data: ReformulationJQgrid['ReformulationPackagingProfile'],
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


$('#PackagingProfileAdd').click(function () {
    $.each($('.ManditoryFieldPackagingProfile'), function (i, v) {
        if ($.trim($(this).val()) === "" || $.trim($(this).val()) === null) {
            $(this).parents('.form-group').find('.Err-PackagingProfile').show();
            isvalid = false;
        } else {
            $(this).parents('.form-group').find('.Err-PackagingProfile').hide();
        }
    });
    image = SavePackageImageFile();
    if (isvalid) {
        $("#err-expected").hide();
        var gridDataPackagingProfile = [];
        var PackagingProfile = {};
        PackagingProfile = {
            Product: $("#PackagingProfileProduct").val(),
            SKU: $("#PackagingProfileSKU").val(),
            PrimaryPackaging: $("#PackagingProfilePrimaryPackaging").val(),
            SecondaryPackaging: $("#PackagingProfileSecondaryPackaging").val(),
            TertiaryPackaging: $("#PackagingProfileTertiaryPackaging").val(),
            BenchmarkProducts: $("#PackagingProfileBenchMarkProduct").val(),
            DesiredProductCharacteristics: $("#PackagingProfileDesiredPackagingCharacters").val(),
            Others: $("#PackagingProfileOthers").val(),
            Mould: $("#PackagingProfileMould").val(),
            ImageUpload: image
        };
        isvalid = true;


        if (EditRowIdPackagingProfile == 0) {
            gridDataPackagingProfile.push(PackagingProfile);
            var PP1 = $("#expected").jqGrid('getGridParam', 'data');
            var PP2 = $.merge(PP1, gridDataPackagingProfile);
            $("#expected").jqGrid('setGridParam', { data: PP2 });
            $("#expected").trigger('reloadGrid', [{ page: 1 }]);
        }

        else {
            $.each(PackagingProfile, function (key, value) {
                $("#expected").jqGrid('setCell', EditRowIdPackagingProfile, key, value);
            });
            EditRowIdPackagingProfile = 0;
        }
        $(".PackagingProfile").val("");
    }
});

function onEditPackagingProfile(RowIdPackagingProfile) {
    var DataFromTheRow = jQuery('#expected').jqGrid('getRowData', RowIdPackagingProfile);
    $('#PackagingProfileProduct').val(DataFromTheRow.Product);
    $('#PackagingProfileSKU').val(DataFromTheRow.SKU);
    $('#PackagingProfilePrimaryPackaging').val(DataFromTheRow.PrimaryPackaging);
    $('#PackagingProfileSecondaryPackaging').val(DataFromTheRow.SecondaryPackaging);
    $('#PackagingProfileTertiaryPackaging').val(DataFromTheRow.TertiaryPackaging);
    $('#PackagingProfileBenchMarkProduct').val(DataFromTheRow.BenchmarkProducts);
    $('#PackagingProfileDesiredPackagingCharacters').val(DataFromTheRow.DesiredProductCharacteristics);
    $('#PackagingProfileOthers').val(DataFromTheRow.Others);
    $('#PackagingProfileMould').val(DataFromTheRow.Mould);
    $('#image_upload').val(DataFromTheRow.Image);
    EditRowIdPackagingProfile = RowIdPackagingProfile;
}
function onDeletePackagingProfile(RowIdPackagingProfile) {

    $('div#jqGridRow_DeleteModal').modal('toggle');

    $('#jqGridRow_DeleteModal_Ok').click(function () {
        $("#expected").jqGrid('delRowData', RowIdPackagingProfile);
        $("#expected").trigger('reloadGrid', [{ page: 1 }]);
    });
}


function validatesubmitform() {

    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationBusinessInformation = $('#business_info').jqGrid('getGridParam', 'data');
    var reformulationPackagingProfileGrid = $('#expected').jqGrid('getGridParam', 'data');
    var projectdetailsimage = ProjectDetailsImageFile();
    var ProjectName = $('#ProjectName').val();
    var projectheaders = []
    $("table#Reformulation_Table tbody tr").each(function (i) {
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Hub: $(this).find('#Reformulation_Hub').text(),
            Category: $(this).find('#ReformulationCategory option:selected').val(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text(),
            status: 2,
        });
    });
    var projectdetails = [];
    var additionalreformulation = [];

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
    var flag = true;
    $("#ProjectDetailsBusinessRational").val() == "" ? ($('#Err-ProjectDetails-BusinessRational').show(), flag = false) : $('#Err-ProjectDetails-BusinessRational').hide()
    productdescription.length === 0 ? ($('#Err-ProductDescription').show(), flag = false) : $('#Err-ProductDescription').hide();
    reformulationBusinessInformation.length === 0 ? ($('#err-business_info').show(), flag = false) : $('#err-business_info').hide();
    if ($("input[type=radio][name=survey]:checked").val() == "yes") {
        reformulationPackagingProfileGrid.length === 0 ? ($("#err-expected").show(), flag = false) : $("#err-expected").hide();
    }
    $('#ProjectName').val() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();
    $('#ReformulationEdit').validate();


    if ($('#ReformulationEdit').valid()) { }
    else {
        flag = false;
    }
    productdescription == "" ? ($("#err-prd_desc").show(), flag = false) : $("#err-prd_desc").hide();
    reformulationBusinessInformation == "" ? ($("#err-business_info").show(), flag = false) : $("#err-business_info").hide();

    if (flag) {
        $('div#SubmitModal').modal('show');
        $("#ConformReformulation").click(function () {
            $("#ProjectHeaders").val(JSON.stringify(projectheaders));
            $("#reformulationProductDescription").val(JSON.stringify(productdescription));
            $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
            $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
            $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
            $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
            $("#InitiatorRemarks").val(initiatorremarks);

            $('#ReformulationEdit').submit();

        });
    }
}


function CancelForm() {
    $('div#CancelModal').modal('show');

}
function ValidateSaveForm() {

    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
    var reformulationpackagingprofilegrid = $('#expected').jqGrid('getGridParam', 'data');
    var projectdetailsimage = ProjectDetailsImageFile();
    var projectheaders = []
    var ProjectName = $('#ProjectName').val();
    $("table#Reformulation_Table tbody tr").each(function (i) {
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

    var projectdetails = [];
    var additionalreformulation = [];

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
    var flag = true;
    $('#ProjectName').val() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();

    //productdescription == "" ? flag = false : flag = true
    if (flag) {
        $('div#SaveModal').modal('show');
        $("#SaveReformulationPopUp").click(function () {
            $("#ProjectHeaders").val(JSON.stringify(projectheaders));
            $("#reformulationProductDescription").val(JSON.stringify(productdescription));
            $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
            $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
            $("#reformulationPackagingProfile").val(JSON.stringify(reformulationpackagingprofilegrid));
            $("#reformulationBusinessInformation").val(JSON.stringify(reformulationbusinessinformation));
            $("#InitiatorRemarks").val(initiatorremarks);
            $('#ReformulationEdit').submit();
        })
    }
}

$(".downloadPdfReformulation").click(function () {
    
    var ProjectId = $("#ProjectId").val();
    $.ajax({
        url: ROOT + "NewInitiation/ReformulationDraft",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectId: ProjectId, Type: "Reformulation" },
        success: function (result) {
            
            $('.PDFNPD').html(result);
            var fd = new FormData();
            var htmldata = $(".PDFNPD").html();
            
            fd.append('JsonString', htmldata)
            $.ajax({
                url: ROOT + 'NewInitiation/GeneratePdfHtml',
                type: 'POST',
                dataType: 'HTML',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    window.location = window.location.origin + ROOT + 'NewInitiation/GeneratePdf'
                }
            })
        }
    })
});
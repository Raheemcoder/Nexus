var editRowId5 = 0;
var deletedRemarksData = [];
var packagingProfileData_1 = [];
var PackageImageFileName = '';
var imageGrid = [];
var fineScreeningData = [];
var deleteImageIn_imageGrid = [];
var deleteImageIn_BenchMark = [];
var IsPreview = 0;

$('.data-datepicker').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'dd-mm-yyyy',
    startDate: '+0d'
});

CKEDITOR.replace('PackagingProfilePrimaryPackaging', {
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
CKEDITOR.replace('PackagingProfileSecondaryPackaging', {
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
CKEDITOR.replace('PackagingProfileTertiaryPackaging', {
    height: 50, 
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
    height: 50, 
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
    height: 50, 
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
$(".multiselectDropdown1").multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 500,
    buttonWidth: '100%',
    dropUp: true
});

var YesNo;
var ProjectDetailsBenchMarkSampleImage;
var hubApprove;
var PackageImageFileName;

var businessInfoProductNameList = [];
var packagingProfileProductNameList = [];
var hgmlDataProductNameList = [];
var pmdDataProductNameList = [];
var targetCostProductNameList = [];
var sustainabilityProductNameList = [];

$("#BusinessInformationLaunchDate").keypress(function (event) {
    // Get the current input value
    var inputValue = $(this).val(), allowedKeys = [45], dateFormat = /^\d{2}-\d{2}-\d{4}$/; // hyphen
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
    if (!dateFormat.test(inputValue)) {
        event.preventDefault();
        return;
    }
});

$("#Division").change(function () {

    var DivId = $('#Division').val();

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

var ReformulationJQgrid = $.parseJSON($('#ReformulationJSON').val());

$('#BI_TotalBusinessValue_Y1').val(ReformulationJQgrid.ReformulationBusinessInformation.length > 0
    ? ReformulationJQgrid.ReformulationBusinessInformation[0].TotalBusinessValue_Y1 : "");
$('#BI_TotalBusinessValue_Y2').val(ReformulationJQgrid.ReformulationBusinessInformation.length > 0
    ? ReformulationJQgrid.ReformulationBusinessInformation[0].TotalBusinessValue_Y2 : "");
$('#BI_TotalBusinessValue_Y3').val(ReformulationJQgrid.ReformulationBusinessInformation.length > 0
    ? ReformulationJQgrid.ReformulationBusinessInformation[0].TotalBusinessValue_Y3 : "");

var headerTable = ReformulationJQgrid.ReformulationTableData;
var statusList = $.parseJSON($('#StatusList').val());
var statusName = headerTable[0].Status;
var statusId = $('#StatusId').val();
var packagingProfile = ReformulationJQgrid.PackagingProfile === undefined ? ($('#PackagingProfile').hide(), $('#PackagingProfileGrid').hide()) : ($('#PackagingProfile').show(), $('#PackagingProfileGrid').show());
var JsonFormReformulationStagesData = $.parseJSON($('#JsonFormReformulationApprovalStagesData').val());
var listLength = JsonFormReformulationStagesData["ApprovalStages"].length;
listLength = listLength - 1;

if (statusId == "5" || statusId == "16") {
    $('#PreviousStage').val(JsonFormReformulationStagesData.ApprovalStages[0].FromStageName);
}
if (statusId == "1" || statusId == "8" || statusId == "11") {
    $('#PackagingProfile').show();
}

var JsonFormReformulationHgmlReviewData = $.parseJSON($('#JsonFormReformulationHgmlReviewData').val());
if (statusId == "4" | statusId == '14' || statusId == "5" || statusId == "16" || statusId == "3" || statusId == "6" || statusId == "7" || statusId == "12") {
    var JsonFormReformulationHubReviewData = $.parseJSON($('#JsonFormReformulationHubReviewData').val());
    hubApprove = $('#HubApprove').val();
}
if (statusId == "5" || statusId == "16" || statusId === "6" || statusId == "4" || statusId == "12" || statusId == "14") {
    var JsonFormReformulationPmdReviewData = $.parseJSON($('#JsonFormReformulationPmdReviewData').val());
    var JsonFormReformulationHubBusinessData = JSON.parse($('#JsonFormReformulationHubBusinessData').val());
    fineScreeningData = $.parseJSON($('#JsonFormReformulationPmdReviewData').val());
}
if (statusId == "3") {

    var JsonFormReformulationHubBusinessData = JSON.parse($('#JsonFormReformulationHubBusinessData').val());
}

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="action_icons">' +
                '<a onclick=onEditBusinessInformation(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-edit color-info mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeleteBusinessInformation(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
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
        name: 'ProposedName',
        label: 'Proposed Name',
        width: 130,
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

            if (statusId == '2' || statusId == '7' || statusId == '5' || statusId == '16' || statusId == '13') {
                jQuery("#business_info").jqGrid('hideCol', "Action");
            }
            if (statusId == '1' || statusId == '2' || statusId == '8' || statusId == '9' || statusId == '13') {
                jQuery("#business_info").jqGrid('hideCol', "ProposedName");
            }
            if (statusId == '3') {
                jQuery("#business_info").jqGrid('hideCol', "RevisionInPackagingFormat");
                jQuery("#business_info").jqGrid('hideCol', "ProposedName");
            }
            if (statusId == '4' || statusId == '14') {
                jQuery("#business_info").jqGrid('hideCol', "Action");
                jQuery("#business_info").jqGrid('hideCol', "ProposedName");
            }
            if (statusId == '5' || statusId == '16' || statusId == '6' || statusId == '12') {
                jQuery("#business_info").jqGrid('hideCol', "Action");
                jQuery("#business_info").jqGrid('hideCol', "ProposedName");
            }

            if ($('#ViewStatus').val() == 'View') {
                jQuery("#business_info").jqGrid('hideCol', "Action");
            }
        }
    });

$("#preview_business_info").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#preview_pager_businessinfo',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#preview_business_info tbody tr");
        var objHeader = $("#preview_business_info tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }

        jQuery("#preview_business_info").jqGrid('hideCol', "Action");
        jQuery("#preview_business_info").jqGrid('hideCol', "ProposedName");

        if (statusId == '3') {
            jQuery("#preview_business_info").jqGrid('hideCol', "RevisionInPackagingFormat");
        }
    }
});

$('.hubReviewStatus').hide();
$('#HubReviewStatus').hide();
$('.hgmldatagrid').hide();

$('#ProjectName').val(ReformulationJQgrid.ReformulationTableData[0].ProjectName);
$('#ProjectId').val(ReformulationJQgrid.ReformulationTableData[0].ProjectId);
$('#editor').val(ReformulationJQgrid.ReformulationInitiatorRemarks[0] === undefined ? "" : ReformulationJQgrid.ReformulationInitiatorRemarks[0].initiatorRemarks);
$('#Reformulation_Hub').text(ReformulationJQgrid.ReformulationTableData[0].Hub);
$('#Division').val(ReformulationJQgrid.ReformulationTableData[0].Division);
$('#Category').val(ReformulationJQgrid.ReformulationTableData[0].Category);
$('#Reformulation_InitiatedBy').text(ReformulationJQgrid.ReformulationTableData[0].InitiatedBy);
if (statusName == "Under Exploration") {
    statusName = "Extended Fine Screening Review";
    $('.Page_heading_status').text(statusName);
}
$('#Reformulation_Status').text(statusName);
$('#AdditionalRequirementsTextBox').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].AdditionalFormulation);
$('#AdditionalRequirmentsShelfLife').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].ShelfLife);
$('#AdditionalRequirmentsFreeFrom').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].FreeFrom);
$('#AdditionalRequirmentsOthers').val(ReformulationJQgrid.ReformulationAdditionalFormulation[0] === undefined ? "" : ReformulationJQgrid.ReformulationAdditionalFormulation[0].Others);
$('#ProjectDetailsBusinessRational').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].BusinessRational);
$('#ProjectDetailsBenchmarkSampleFormulation').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].BenchmarkSample);
$('#ProjectDetailsDesiredIndications').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].DesiredIndication);
$('#ProjectDetailsDesiredDosageForm').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].DesiredDosageForm);
// $('#editornf').val(ReformulationJQgrid.ReformulationSKUString === '' ? "" : ReformulationJQgrid.ReformulationSKUString);
$('#ProjectDetailsBenchMarkSampleImageText').val(ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].BenchmarkImage)
ProjectDetailsBenchMarkSampleImage = (ReformulationJQgrid.ReformulationProjectDetails[0] === undefined ? "" : ReformulationJQgrid.ReformulationProjectDetails[0].BenchmarkImage)

//PackProfileImage = ReformulationJQgrid.PackagingProfile == "" ? "" : ReformulationJQgrid.PackagingProfile.Image;

var todayDate = new Date(ReformulationJQgrid.ReformulationTableData[0].InitiatedDate);
$('#Reformulation_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));


//To show HGML Remarks everywhere except Draft
if (statusId != '1') {
    $('.prodPackData').hide();
    $('#ProjectName').attr('disabled', true);
    $('#ProjDetails_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
    $('#PD_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.ProductDetailsHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.ProductDetailsHGMLRemarksList[0].ProductDetailsHgmlRemark);
    $('#FP_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.FormulationProfileHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
    $('#PPR_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.PackagingProfileHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
    $('#BI_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.BusinessInformationHGMLRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
    $("#Division,#Category_Reformulation").attr("disabled", true);
}
if (statusId != '5' && statusId != '16' && statusId != '6' && statusId != '12') {
    $('.pmddata').hide();
}
if (statusId === '1') {
    $('.PackgagingProfileHeader').show();
}
if (statusId != '3') {
    $('.init_businessInfo').hide();
}
if (statusId != '4' && statusId != '3' && statusId != '14') {
    $('.hubstatus').hide();
}
if (statusId == "2" || statusId == "13") {

    $('.hubHidden').hide();
    $(".approveHgmlData").show();
    $(".pmdHidden").hide();
    $("#business_info").hideCol("ProposedName")
    $(".HubReview").hide();
    $('.HideClass').hide();
    $('.approveHgmlData').show();
    $('.pmdHidden').hide();
    $('.hideHgmlGrid').hide();
    $('.hubstatus').hide();
    $(".NoEdit").attr('readonly', true);
    
    $('#PackagingProfileGrid').show()
    
    $('#HubReviewStatus').hide();
    $('#InitiatorRemarks').hide();

    ReformulationHgmlData = $.parseJSON($('#HgmlData').val());
    $('body').on('change', '#HgmlDataSendToHubConfirmation', function () {
        YesNo = $(this).val()

        if (YesNo == 'Yes') {
            $('#HgmlData_HubDropdown').val(JsonFormReformulationHgmlReviewData.HgmlDataList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HgmlDataList[0].Hub)
            $('#HgmlData_HubUsersDropdown').val(JsonFormReformulationHgmlReviewData.HgmlDataList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HgmlDataList[0].HubUsers);

            $('#HgmlDataHgmlToHubRemarks').val(JsonFormReformulationHgmlReviewData.HgmlDataList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HgmlDataList[0].HgmlToHubRemarks)

            $("#HgmlData_SendToHub_Yes").show();
            $("#HgmlData_SendToHub_No").hide();
            $(".Button_SendToPmd").hide();
            $(".hideHgmlGrid").hide();
            $(".Button_SendToHub").show();
            $("#HGML_Data").jqGrid("clearGridData");
            $(".Button_SendToUnderExploration").hide();
        }
        else if (YesNo == 'No') {

            $("#HgmlData_SendToHub_Yes").hide();
            $("#HgmlData_SendToHub_No").show();
            $(".Button_SendToHub").hide();
            $(".hideHgmlGrid").show();

            $("#HgmlData_HubDropdown").val("").multiselect('refresh');
            $("#HgmlData_HubUsersDropdown").val("").multiselect('refresh');

            for (var i = 0; i < JsonFormReformulationStagesData['ApprovalStages'].length; i++) {
                var id = JsonFormReformulationStagesData.ApprovalStages[i].FromStage
                if (id == 16) {
                    $(".Button_SendToUnderExploration").show();
                    break;
                }
                else {
                    $(".Button_SendToPmd").show();
                }
            }
        }
        else {
            $("#HgmlData_SendToHub_Yes").hide();
            $("#HgmlData_SendToHub_No").hide();
            $('.Button_SendToHub').hide();
            $('.Button_SendToPmd').hide();
            $('.hgmldatagrid').hide();
        }
    })
    $("#business_info").jqGrid("clearGridData");
    $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
    $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
}
if (statusId == "7") {

    $("#business_info").jqGrid("clearGridData");
    $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
    $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
}
else if (statusId == "8" || statusId == "9" || statusId == "11") {
    $('.prodPackData').show();
    $(".HubReview").hide();
    $(".pmdHidden").hide();
    $("#business_info").hideCol("ProposedName")
    
    $('#PackagingProfileGrid').show()
    //$(".HubNoEdit").attr('readonly', true);
    $(".HgmlRemarksButton").hide();
    $(".HubNoEdit").hide();
    $('.hubHidden').hide();
    $('.HgmlRemarks').hide();
    $('.pmddata').hide();
    $('.Forhub').hide();
    $('.InitiatorRemarks').show();

    $("#business_info").jqGrid("clearGridData");
    $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
    $("#business_info").trigger('reloadGrid', [{ page: 1 }]);


}
else if (statusId == "7") {
    $('.prodPackData').hide();
    $(".HgmlRemarksButton").hide();
    $(".RejectedButton").show();
    $('.hubHidden').hide();
    //$('#statusHeader').text("Reformulation - " + statusName);
    $('.hgmlremarks').attr("disabled", true);
    $('.pmddata').hide();
    
    $('#PackagingProfileGrid').show()
    $('#InitiatorRemarks').hide();

}
else if (statusId == "4" || statusId == "5" || statusId == "16" || statusId == "3" || statusId == "6" || statusId == "12" || statusId == '14') {

    if (statusId === "4" || statusId == '14') {

        $('.prodPackData').hide();
        $(".HgmlApprovebuttons").show();
        $(".hub").hide();
        $('.SentToHubYesOrNo').hide();
        $(".product_profile").show();
        $("#HgmlData_ApprovePage").hide();
        $(".HubNoEdit").attr('readonly', false);
        $('.PackagingProfileHeadingName').show();
        $("#business_info").jqGrid("clearGridData");
        $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);

        $("#business_info").jqGrid("clearGridData");
        $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
        var ParticipatingMarkets = "";
        $.each(JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList, function (i, obj) {
            if (i == JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList.length - 1) {
                if (obj.HgmlDataHUBParticipatingMarkets != null)
                    ParticipatingMarkets += obj.HgmlDataHUBParticipatingMarkets;
            }
            else {
                if (obj.HgmlDataHUBParticipatingMarkets != null)
                    ParticipatingMarkets += obj.HgmlDataHUBParticipatingMarkets + ' ,';
            }

        })
        $("#HgmlData_ParticipatingMarketsApprovePage").val(ParticipatingMarkets);

    }

    if (statusId == "5" || statusId == "16" || statusId == "6" || statusId == "12") {

        $('#ProjDetails_PMD_Remarks').val(JsonFormReformulationPmdReviewData.ProjectDetailsPmdRemarksList.length == 0 ? "" : JsonFormReformulationPmdReviewData.ProjectDetailsPmdRemarksList[0].ProjectDetailsPmdRemark);
        $('#PD_PMD_Remarks').val(JsonFormReformulationPmdReviewData.ProductDetailsPmdRemarksList.length == 0 ? "" : JsonFormReformulationPmdReviewData.ProductDetailsPmdRemarksList[0].ProductDetailsPmdRemark);
        $('#FP_PMD_Remarks').val(JsonFormReformulationPmdReviewData.FormulationProfilePmdRemarksList.length == 0 ? "" : JsonFormReformulationPmdReviewData.FormulationProfilePmdRemarksList[0].FormulationProfilePmdRemark);
        $('#PPR_PMD_Remarks').val(JsonFormReformulationPmdReviewData.PackagingProfilePmdRemarksList.length == 0 ? "" : JsonFormReformulationPmdReviewData.PackagingProfilePmdRemarksList[0].PackagingProfilePmdRemark);
        $('#BI_PMD_Remarks').val(JsonFormReformulationPmdReviewData.BusinessInformationPmdRemarksList.length == 0 ? "" : JsonFormReformulationPmdReviewData.BusinessInformationPmdRemarksList[0].BusinessInformationPmdRemark);

        $('.prodPackData').hide();
        $('.PmdRemarks').show();
        $('.HgmlRemarks').attr('readonly', true);
        $(".HubNoEdit").attr('readonly', true);
        //$('#statusHeader').text("Reformulation - " + statusName);
        $('.pmdHidden').hide();
        $(".HgmlRemarksButton,.HgmlApprovebuttons, .HideClass").hide();
        $('.PMDButtons').show();
        $('.HubReview').hide();
        $('.NoEdit ').attr('readonly', true);
        $('.HubBusinessInfoLinks').show();
        $('.BusinessInfo').hide();
        $('#HubReviewStatus').hide();
        $('#PackagingProfileGrid').show();
        $('#productDetailsHubRemarksGrid').show();
        $('#projectDetailsHubRemarksGrid').show();
        $('#formulationDetailsHubRemarksGrid').show();
        $('#businessinfoHubRemarksGrid').show();
        $('#packagingProfiileHubRemarksGrid').show();
        $('.PackagingProfileHeadingName').show();
        $('.hgmldatagrid').show();
        $('.hubHidden').hide();
        $('.pmddata').show();
        $('.hubstatus').hide();

        $("#business_info").jqGrid("clearGridData");
        $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);


        if (statusId == "6" || statusId == "12") {
          //  $('#statusHeader').text("Reformulation - " + statusName);
            //  $('.pmddataform').hide();
            $(".HgmlRemarksButton,.HgmlApprovebuttons,.PMDButtons").hide();
            $('.RejectedButton').show();
            //$('.PmdNoEdit').attr('readonly', true);
            $(".InitiatorRemarks").hide();
            //$('.pmdhgmldataheader').hide();

        }

        colmodels = [
            {
                name: 'Action',
                label: 'Action',
                width: 90,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return `<div class="action_icons">
            <a onclick = onEditPmdData(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fas fa-edit color-info mr-2" title="Edit"></i></a>
            <a onclick = onDeletePmdData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fas fa-trash color-delete" title="Delete"></i></a>
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
            //{
            //    name: 'TargetCost',
            //    label: 'Target Cost',
            //    resizable: true,
            //    ignoreCase: true,
            //},
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
                data: JsonFormReformulationPmdReviewData.PmdDataList,
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
                        //if (statusId == '6') {
                        //    jQuery("#PMD_Data").jqGrid('hideCol', "Action");
                        //}
                        if ($('#ViewStatus').val() == 'View') {
                            jQuery("#PMD_Data").jqGrid('hideCol', "Action");

                        }
                    }

                }
            });

        $("#Preview_PMD_Data").jqGrid({
            url: '',
            datatype: 'local',
            data: [],
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#Preview_pager_PMD',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#Preview_PMD_Data tbody tr");
                var objHeader = $("#Preview_PMD_Data tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
                jQuery("#Preview_PMD_Data").jqGrid('hideCol', "Action");
            }
        });


        //GRID FOR Hub Remarks for Product Details
        colmodels1 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'ProductDetailsHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet1").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.ProductDetailsHubRemarksList,
                mtype: 'GET',
                colModel: colmodels1,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet1',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet1 tbody tr");
                    var objHeader = $("#worksheet1 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });


        //GRID FOR Hub Remarks for Project Details
        colmodels2 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'ProjectDetailsHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet2").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.ProjectDetailsHubRemarksList,
                mtype: 'GET',
                colModel: colmodels2,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet2',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet2 tbody tr");
                    var objHeader = $("#worksheet2 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });



        //GRID FOR Hub Remarks for Additional Formulation Details
        colmodels3 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'FormulationProfileHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },



        ],

            $("#worksheet3").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.FormulationProfileHubRemarksList,
                mtype: 'GET',
                colModel: colmodels3,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet3',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet3 tbody tr");
                    var objHeader = $("#worksheet3 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });



        //GRID FOR Hub Remarks for Business Info Details
        colmodels4 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'BusinessInformationHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet4").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.BusinessInformationHubRemarksList,
                mtype: 'GET',
                colModel: colmodels4,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet4',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet4 tbody tr");
                    var objHeader = $("#worksheet4 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }

                    }

                }
            });



        //GRID FOR Hub Remarks for Packaging Profile Details
        colmodels5 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'PackagingProfileHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },



        ],

            $("#worksheet5").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.PackagingProfileHubRemarksList,
                mtype: 'GET',
                colModel: colmodels5,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet5',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet5 tbody tr");
                    var objHeader = $("#worksheet5 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });




        //Grid for Project Desc
        colmodels7 = [
            {
                name: 'ExistingName',
                label: 'Brand Name',
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'NewBrandName',
                label: 'New Brand Name',
                resizable: true,
                ignoreCase: true
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
                colModel: colmodels7,
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

    if (statusId == "3" && $('#Role').val() != 'HGML Team'/*&& $('#ViewStatus').val() != 'View'*/) {

        $('.pmddata').hide();

        $('#ProjDetails_HUB_Remarks').val(JsonFormReformulationHubReviewData.HUBProjectDetailsRemarksList.length == 0 ? "" : JsonFormReformulationHubReviewData.HUBProjectDetailsRemarksList[0].ProjectDetailsHubRemark);
        $('#PD_HUB_Remarks').val(JsonFormReformulationHubReviewData.HUBProductDetailsRemarksList.length == 0 ? "" : JsonFormReformulationHubReviewData.HUBProductDetailsRemarksList[0].ProductDetailsHubRemark);
        $('#FP_HUB_Remarks').val(JsonFormReformulationHubReviewData.HUBAdditionalFormulationProfileRemarksList.length == 0 ? "" : JsonFormReformulationHubReviewData.HUBAdditionalFormulationProfileRemarksList[0].FormulationProfileHubRemark);
        $('#PPR_HUB_Remarks').val(JsonFormReformulationHubReviewData.HUBPackagingProfileRemarksList.length == 0 ? "" : JsonFormReformulationHubReviewData.HUBPackagingProfileRemarksList[0].PackagingProfileHubRemark);
        $('#BI_HUB_Remarks').val(JsonFormReformulationHubReviewData.HUBBusinessInformationRemarksList.length == 0 ? "" : JsonFormReformulationHubReviewData.HUBBusinessInformationRemarksList[0].BusinessInformationHubRemark);
        $('.HgmlOrHubDataHubRemarks').val(JsonFormReformulationHubReviewData.HUBHgmlDataRemarksList.length == 0 ? "" : JsonFormReformulationHubReviewData.HUBHgmlDataRemarksList[0].HgmlOrHubDataHubRemarks);

        $('#HgmlToHubRemarks').val(JsonFormReformulationHgmlReviewData.HGMLtoHubRemarksList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HGMLtoHubRemarksList[0].HgmlToHubRemarks);
        $('#ProductDescriptionAdd').hide();
        $('.HgmlRemarks').attr('readonly', true);
        $('.PmdRemarks').show();
        $(".HubNoEdit").attr('readonly', true);
        //$('#statusHeader').text("Reformulation - " + statusName);
        $('.hubReviewStatus').show();
        $('.pmdHidden').hide();
        $(".HgmlApprovebuttons").hide();
        $('.PMDButtons').hide();
        $('.hubHidden').show();
        $('#HgmlDataHgmlToHubRemarks').attr('disabled', true)
        
        $('#PackagingProfileGrid').show()
        $('#HgmlDataHgmlToHubRemarks').attr('disabled', true);
        //$('#HubReviewStatus').hide();
        $('.approveHgmlData').hide();
        $('#HGMLApprove').show();
        $('#InitiatorRemarks').hide();
        $('#Initiator_BusinessInformation_Link').text("" + ReformulationJQgrid.ReformulationTableData[0].Hub + " " + $('#Initiator_BusinessInformation_Link').text() + "");
        $('#HubBusinessInformationPopupHeading').text(ReformulationJQgrid.ReformulationTableData[0].Hub + " Business Information");

        $("#HgmlData_HUBParticipatingMarkets").val(JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList[0] == undefined ? "" : JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList[0].HgmlDataHUBParticipatingMarkets);
        //  $('#HubApprove').val(JsonFormReformulationHubReviewData. == undefined ? "" : JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList[0].HgmlDataHUBParticipatingMarkets);
        if (JsonFormReformulationHubReviewData['ReformulationHubBusinessInformation'] != null) {

            $("#business_info").jqGrid("clearGridData");
            $("#business_info").jqGrid('setGridParam', { data: JsonFormReformulationHubReviewData['ReformulationHubBusinessInformation'] });
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
        }
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
                name: 'HgmlOrHubDataRemarks',
                label: 'Remarks',
                resizable: true,
                ignoreCase: true
            },

        ];

        var PM_List = JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList
        var RowIdHGML = 0;
        var EditRowIdHGML = 0;
        var isvalid = true;
        $("#HUB_ParticipatingMarkets").jqGrid({
            url: '',
            datatype: 'local',
            data: JsonFormReformulationHubReviewData.AllHUBParticipatingMarketsList,
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            rowNum: 20,
            scroll: true,

            gridComplete: function () {
                var objRows = $("#HUB_PartcipatingMarkets tbody tr");
                var objHeader = $("#HUB_PartcipatingMarkets tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }

                }

            }
        });

    }

    if (statusId == "3" && $('#ViewStatus').val() != 'View') {
        $('#Initiator_BusinessInformation_Link').text("");
        $('#Initiator_BusinessInformation_Link').text("" + ReformulationJQgrid.ReformulationTableData[0].Hub + " " + $('#Initiator_BusinessInformation_Link').text() + "Business Information");
    }

    function onClickInitiatorBusinessInformation() {
        $('div#BusinessInformation_Popup').modal('show');
        $('.PopupBusinessInformationSaveButtons').hide();
    }
    
    if (statusId == "4" || statusId == '14') {

        $('#productDetailsHubRemarksGrid').show();
        $('#projectDetailsHubRemarksGrid').show();
        $('#formulationDetailsHubRemarksGrid').show();
        $('.HubBusinessInfoLinks').show();
        $('#businessinfoHubRemarksGrid').show();
        $('#packagingprofileHubRemarksGrid').show();
        $('#HgmlData_ApprovePage').show();
        $('#HubReviewStatus').show();
        $('#InitiatorRemarks').hide();
        $("#business_info").jqGrid("clearGridData");
        $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);

        $('#ProductDescriptionAdd').hide();
        $(".HideClass").hide();
        $(".NoEdit").attr('readonly', true);
        $(".NotInHubReview").hide();
        $(".HgmlRemarksButton").hide();
        $(".approveHgmlData").show();
        $(".HideForhub").hide();
        $(".HubReview").hide();
        $(".hubHidden").hide();
        $('#PackagingProfile').show();
        $('#PackagingProfileGrid').show();
        $('#HgmlData_SendToHub_No').show();
        $('.hgmldatagrid').hide();
        $('.pmddata').hide();
        $('#HgmlData_SendToHub_No').show();
        $('.hubstatus').show();
        $('#HubReviewStatus').show();
        $(".hideHgmlGrid").show();
        $('#Initiator_BusinessInformation_Link').hide();


        var divTag = "";

        $.each(JsonFormReformulationHubReviewData.HubApprovalStatusList, function (i, obj) {
            if (obj.IsHubApproved == "Yes") {
                divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control green hubStatusValue mt-2" value = "Yes" readonly > </div>';
            }
            if (obj.IsHubApproved == "No") {
                divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control red hubStatusValue mt-2" value = "No" readonly > </div>';
            }
            if (obj.IsHubApproved == "Yet to Confirm") {
                divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control orange hubStatusValue mt-2" value = "Yet to Confirm" readonly > </div>';
            }

        })
        $('#HubReviewStatus').html(divTag);

        //GRID FOR Hub Remarks for Product Details
        colmodels1 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'ProductDetailsHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet1").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.ProductDetailsHubRemarksList,
                mtype: 'GET',
                colModel: colmodels1,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet1',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet1 tbody tr");
                    var objHeader = $("#worksheet1 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });


        //GRID FOR Hub Remarks for Project Details
        colmodels2 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'ProjectDetailsHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet2").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.ProjectDetailsHubRemarksList,
                mtype: 'GET',
                colModel: colmodels2,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet2',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet2 tbody tr");
                    var objHeader = $("#worksheet2 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });



        //GRID FOR Hub Remarks for Additional Formulation Details
        colmodels3 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'FormulationProfileHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },



        ],

            $("#worksheet3").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.FormulationProfileHubRemarksList,
                mtype: 'GET',
                colModel: colmodels3,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet3',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet3 tbody tr");
                    var objHeader = $("#worksheet3 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });



        //GRID FOR Hub Remarks for Business Info Details
        colmodels4 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'BusinessInformationHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet4").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.BusinessInformationHubRemarksList,
                mtype: 'GET',
                colModel: colmodels4,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet4',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet4 tbody tr");
                    var objHeader = $("#worksheet4 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });



        //GRID FOR Hub Remarks for Packaging Profile Details
        colmodels5 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'PackagingProfileHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },



        ],

            $("#worksheet5").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.PackagingProfileHubRemarksList,
                mtype: 'GET',
                colModel: colmodels5,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet5',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet5 tbody tr");
                    var objHeader = $("#worksheet5 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });

        //Grid for Project Desc
        colmodels7 = [
            {
                name: 'ExistingName',
                label: 'Brand Name',
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'NewBrandName',
                label: 'New Brand Name',
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'SKU',
                label: 'SKU',
                resizable: true,
                ignoreCase: true
            }
        ];
        $("#prd_desc").jqGrid({
            url: '',
            datatype: 'local',
            data: ReformulationJQgrid['ReformulationProductDetails'],
            mtype: 'GET',
            colModel: colmodels7,
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

    }

}
else if (statusId == "2" || statusId == '13') {
  //  $('#statusHeader').text("Reformulation - " + statusName);
}
if (statusId != '5' && statusId != '6' && statusId != '12') {
    $('.PmdRemarks').hide();
}

ApprovalStatuscolmodels = [
    {
        name: 'FromStageName',
        label: 'From Stage',
        resizable: true,
        ignoreCase: true
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
        ignoreCase: true
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
        ignoreCase: true
    },
    {
        name: 'RemarksBy',
        label: 'Remarks By',
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'Date',
        label: 'Submitted Date',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return showDate(cellvalue);
        }


    },

];
$("#remarks_grid").jqGrid({
    url: '',
    datatype: 'local',
    data: JsonFormReformulationStagesData['ApprovalStages'],
    mtype: 'GET',
    colModel: ApprovalStatuscolmodels,
    loadonce: true,
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
jQuery("#remarks_grid").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });

function showDate(dateString) {
    var formattedDate = dateString.slice(0, 11).split('/');
    return formattedDate[1] + '-' + formattedDate[0] + '-' + formattedDate[2];
}

var DivId = $("#Division").val();
var categoryId = $("#Category").val();
var link = "";

if ((statusId == "1" || statusId == "8" || statusId == "9" || statusId == "11") && $('#ViewStatus').val() != 'View') {
    link = ROOT + "ProjectBrief/GetCategory";
}
else {
    link = ROOT + "User/GetCategoryBYId";
}
$.ajax({
    type: "POST",
    //url: ROOT + "User/GetCategoryBYId",
    url: link,
    data: { divisionId: DivId },
    dataType: "json",
    success: function (Categoryresult) {

        if (Categoryresult != null) {
            $("option").remove(".CategoryOption");
            var CategoryList = ''; $.each(Categoryresult, function (i, obj) {
                var cId = Categoryresult
                if ((statusId == "1" || statusId == "8" || statusId == "9" || statusId == "11") && $('#ViewStatus').val() != 'View') {

                    if (obj.CategoryId == categoryId) {
                        CategoryList = '<option class="CategoryOption" selected value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                    }
                    else {
                        CategoryList = '<option class="CategoryOption" value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                    }
                    $(".addCategoryOption").append(CategoryList);
                }
                else if ((statusId == "1" || statusId == "8" || statusId == "9" || statusId == "11") && $('#ViewStatus').val() == 'View') {

                    if (obj.CategoryID == categoryId) {
                        CategoryList = '<option class="CategoryOption" selected value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                    }
                    else {
                        CategoryList = '<option class="CategoryOption" value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                    }
                    $(".addCategoryOption").append(CategoryList);
                }
                else {
                    if (obj.CategoryID == categoryId) {
                        CategoryList = '<option class="CategoryOption" selected value="' + obj.CategoryID + '">' + obj.CategoryName + '</option>';
                    }
                    else {
                        CategoryList = '<option class="CategoryOption" value="' + obj.CategoryID + '">' + obj.CategoryName + '</option>';
                    }
                    $(".addCategoryOption").append(CategoryList);
                }



            })
        }
    },
    error: function () {
        alert("Error occured!!");
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
            return '<div class="action_icons">' +
                '<a onclick=onEditProductDescription(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-edit color-info mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeleteProductDescription(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
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
        ignoreCase: true,
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
            if (statusId == '2' || statusId == '3' || statusId == '7' || statusId == '13') {
                jQuery("#prd_desc").jqGrid('hideCol', "Action");
            }
            if ($('#ViewStatus').val() == 'View') {
                jQuery("#prd_desc").jqGrid('hideCol', "Action");
            }

        }
    });

$("#preview_prd_desc").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#preview_pager_moulds',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#preview_prd_desc tbody tr");
        var objHeader = $("#preview_prd_desc tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }

        jQuery("#preview_prd_desc").jqGrid('hideCol', "Action");

    }
});

var RowIdProductDescription = 0;
var ProductDescriptionEditRowId = 0;
var isvalid = true;
var noDuplicate = true;
$("#ProductDescriptionExistingName").change(function () {

    if (ProductDescriptionEditRowId > 0) {

        var existingNamesList = $("#prd_desc").jqGrid("getCol", "ExistingName");
        const lowerCaseProductList = existingNamesList.map(product => product.toLowerCase());
        lowerCaseProductList.includes($(this).val().trim().toLowerCase()) && editedProductName != $(this).val().trim().toLowerCase() ? (noDuplicate = false, $('#nameAlreadyExists_Err').show()) : (noDuplicate = true, $('#nameAlreadyExists_Err').hide());

    } else {
        var existingNamesList = $("#prd_desc").jqGrid("getCol", "ExistingName");
        const lowerCaseProductList = existingNamesList.map(product => product.toLowerCase());
        lowerCaseProductList.includes($(this).val().trim().toLowerCase()) && editedProductName != $(this).val().trim().toLowerCase() ? (noDuplicate = false, $('#nameAlreadyExists_Err').show()) : (noDuplicate = true, $('#nameAlreadyExists_Err').hide());
    }


});
$('#ProductDescriptionAdd').click(function () {
    
    $.each($('.ProductDescription'), function (i, v) {
        if ($.trim($(this).val()) === "" || $.trim($(this).val()) === null) {
            $(this).parents('.form-group').find('.Err-ProductDescription').show();
            isvalid = false;
        } else {
            $(this).parents('.form-group').find('.Err-ProductDescription').hide();
        }
        /*  SKU = CKEDITOR.instances["editornf"].getData();*/

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

    if (isvalid && noDuplicate) {
        $('#Err-ProductDescription').hide();
        var gridDataProductDesctipiton = [];
        ProductDesctipitonReformulation = {
            ExistingName: $.trim($("#ProductDescriptionExistingName").val()),
            NewBrandName: $("#ProductDescriptionNewBrandName").val(),
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
            var oldProductName = previousRowData.ExistingName;

            if (Product != oldProductName) {

                //var packagingProfileData = $("#expected").jqGrid('getGridParam', 'data');
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

                        $("#business_info").jqGrid('setCell', (i + 1), "Product", Product, { width: 90 });
                    }
                });
                $.each(sustainabilityData, function (i, susData) {
                    if (susData.Product == oldProductName) {

                        $("#Table_Sustainability").jqGrid('setCell', (i + 1), "Product", Product, { width: 150 });
                    }
                });
                //var packagingProfileData = packagingProfileData_1;

                //$.each(packagingProfileData, function (i, pprData) {
                //    if (pprData != undefined) {
                //        if (pprData.Product == oldProductName) {

                //            packagingProfileData_1[i].Product = Product;
                //            $("#PP_Table_" + i + " span.expectedProduct").text(Product);
                //            //$("#Packaging_Profile").jqGrid('setCell', (i + 1), "Product", Product);
                //        }
                //    }
                //});
            }

            $("#prd_desc").jqGrid('setRowData', ProductDescriptionEditRowId, ProductDesctipitonReformulation);
            $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);
            ProductDescriptionEditRowId = 0;
        }

        productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingName");
        packagingProfileProductNameList = $("#expected").jqGrid("getCol", "Product");
        packagingProfileProductNameList = productDescriptionProductNameList.slice(0);
        businessInfoProductNameList = $("#business_info").jqGrid("getCol", "Product");
        businessInfoProductNameList = productDescriptionProductNameList.slice(0);
        sustainabilityProductNameList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, sustainabilityProductNameList) == -1 });


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
    editedProductName = DataFromGridProductDescription.ExistingName;
    $("#ProductDescriptionExistingName").val(DataFromGridProductDescription.ExistingName);
    $("#ProductDescriptionNewBrandName").val(DataFromGridProductDescription.NewBrandName);
    $("#SKUDetails").val(DataFromGridProductDescription.SKU);
}
function onDeleteProductDescription(RowIdProductDescription) {

    confirm("Deleting a Product from Product Descripton will delete all the records in Packaging Profile, Sustainability and Business Information respective to that Product.Are you sure you want to delete?", function () {

        var businessInformationRowId = [];
        var packagingProfileRowId = [];
        var sustainabilityRowId = [];

        var productDescription = jQuery('#prd_desc').jqGrid('getRowData', RowIdProductDescription);
        var ppProductName = productDescription.ExistingName;

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
        $.each(packagingProfileRowId.reverse(), function (i, pprRowId) {
            onDeletePackagingProfile(pprRowId, '#PP_Table_' + pprRowId, 1);
        });


        $.each(sustainabilityData, function (i, susData) {

            if (susData.Product == ppProductName) {
                sustainabilityRowId.push(i + 1);
            }
        });

        $.each(businessInformationRowId.reverse(), function (i, biRowId) {

            $("#business_info").jqGrid('delRowData', biRowId);

        });

        $.each(sustainabilityRowId.reverse(), function (i, susRowId) {

            $("#Table_Sustainability").jqGrid('delRowData', susRowId);
            $("#Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);
        });

        $("#prd_desc").jqGrid('delRowData', RowIdProductDescription);

        if (RowIdProductDescription == ProductDescriptionEditRowId) {
            ProductDescriptionEditRowId = 0;
        }


        $("#prd_desc").trigger('reloadGrid', [{ page: 1 }]);
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);

        productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingName");
        packagingProfileProductNameList = productDescriptionProductNameList.slice(0);

        businessInfoProductNameList = $("#business_info").jqGrid("getCol", "Product");
        businessInfoProductNameList = productDescriptionProductNameList.slice(0);

        sustainabilityProductNameList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, sustainabilityProductNameList) == -1 });


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

        $('#BusinessInformationSKU .skuOption').remove();
        $('#BusinessInformationSKU .options').remove();
        $('#BusinessInformationSKU').prop('selectedIndex', 0);

        $('#PackagingProfileSKU').val('').multiselect('refresh');
        $("#PackagingProfileSKU").empty();
        $("#PackagingProfileSKU").multiselect('rebuild');
    });

}
$(document).ready(function () {

    ReformulationJQgrid['ReformulationPackagingProfile'].length <= 0 ? ($('#PackagingProfile').hide(), $('#PackagingProfileGrid').hide()) : ($('#PackagingProfile').show(), $('#PackagingProfileGrid').show());
    statusId > 1 ? $('#PackagingProfile').hide() : $('#PackagingProfile').show();
    if (ReformulationJQgrid.ReformulationProductDetails.length != 0) {

        var productOption = "";

        $("option").remove(".ProductOption");
        $.each(ReformulationJQgrid.ReformulationProductDetails, function (i, obj) {

            productOption += '<option class="ProductOption" value="' + obj.ExistingName + '">' + obj.ExistingName + '</option>'
        });


        productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingName");

        businessInfoProductNameList = $("#business_info").jqGrid("getCol", "Product");
        businessInfoProductNameList = productDescriptionProductNameList.slice(0);

        packagingProfileProductNameList = $("#expected").jqGrid("getCol", "Product");
        packagingProfileProductNameList = productDescriptionProductNameList.slice(0);

        sustainabilityProductNameList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, sustainabilityProductNameList) == -1 });

        hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = productDescriptionProductNameList.slice(0);

        if (statusId == "4" || statusId == '14') {
            hgmlDataProductNameList = [];
            hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "HgmlData_ProductNameApprovePage");
            hgmlDataProductNameList = productDescriptionProductNameList.slice(0);

        }

        if (statusId == "5" || statusId == "16" || statusId == "6" || statusId == "12") {

            pmdDataProductNameList = $("#PMD_Data").jqGrid("getCol", "ProductName");
            pmdDataProductNameList = productDescriptionProductNameList.slice(0);

        }


        if (businessInfoProductNameList.length > 0) {

            var productOption = "";

            $("option").remove("#BusinessInformationProductName .ProductOption");

            $.each(businessInfoProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#BusinessInformationProductName").append(productOption);
        }

        if (packagingProfileProductNameList.length > 0) {

            var productOption = "";

            $("option").remove("#PackagingProfileProduct .ProductOption");

            $.each(packagingProfileProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PackagingProfileProduct").append(productOption);
        }

        if (sustainabilityProductNameList.length > 0) {

            var productOption = "";

            $("option").remove("SUS_Product .ProductOption");

            $.each(sustainabilityProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#SUS_Product").append(productOption);
        }

        if (statusId == "4" || statusId == '14') {
            if (hgmlDataProductNameList.length > 0) {

                var productOption = "";

                $("option").remove("#HgmlData_ProductNameApprovePage .ProductOption");

                $.each(hgmlDataProductNameList, function (i, obj) {

                    if (obj != "") {
                        productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                    }
                });

                $("#HgmlData_ProductNameApprovePage").append(productOption);
            }
        }
        else {
            if (hgmlDataProductNameList.length > 0) {

                var productOption = "";

                $("option").remove("#HgmlData_ProductName .ProductOption");

                $.each(hgmlDataProductNameList, function (i, obj) {

                    if (obj != "") {
                        productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                    }
                });

                $("#HgmlData_ProductName").append(productOption);
            }
        }


        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $("option").remove("#PmdProductName .ProductOption");

            $.each(pmdDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PmdProductName").append(productOption);
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


});
$("#BusinessInformationSellingPrice, #BusinessInformationY2").change(function () {

    $("#BI_BusinessValue").val("");
    if ($("#BusinessInformationSellingPrice").val() != "" && $("#BusinessInformationY2").val() != "") {


        var value = $("#BusinessInformationSellingPrice").val() * $("#BusinessInformationY2").val();
        const formattedValue = value.toLocaleString('en-US', { maximumFractionDigits: 0 });
        $("#BusinessInformationBusinessValue").val(formattedValue);

        /* $("#BusinessInformationBusinessValue").val($("#BusinessInformationSellingPrice").val() * $("#BusinessInformationY2").val());*/
    }
});

//Display Packaging profile 
$('#Radio1').click(function () {
    $("#PackagingProfile").show()
    $("#PackagingProfileDiv").show();
    $('#PackagingProfileNav').show();
})
$('#Radio2').click(function () {
    $("#PackagingProfileDiv").hide();
    $('#PackagingProfileNav').hide();
})


var RowIdBusinessInformation = 0;
var EditRowIdBusinessInformation = 0;
var isvalid = true;
var isEditBI = false;
var BIEditedSKU = "";


$('#BusinessInformationAdd').click(function () {
    ;
    var isvalid = true;
    $.each($('.BusinessInformationManditoryField'), function (i, v) {

        if ($.trim($(this).val()) === "" || $.trim($(this).val()) === null) {
            $(this).parents('.form-group').find('.Err-BusinessInformation').show();
            isvalid = false;
        } else {
            $(this).parents('.form-group').find('.Err-BusinessInformation').hide();
        }
    });

    var SP, Currency, TP, GP, M1, M2, M3, M4, M5, M6, Y1, Y2, Y3, Proposedlaunchdate;
    GP = $("#BusinessInformationExpectedGP").val();
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
    MRP = $("#BusinessInformationProposedMRP").val();
    Currency = $("#BusinessInformationCurrency").val();
    var date = $("#BusinessInformationLaunchDate").val();

    var Proposedlaunchdate = new Date(date);
    Proposedlaunchdate = date;
    GP = parseFloat(GP.replace(/,/g, ''));
    (GP < 1 || GP > 100) ? ($('#Error_Range_ExpectedGP').show(), flag = false) : $('#Error_Range_ExpectedGP').hide();

    //M4 != "" && M5 != "" && M6 != "" &&
    if (TP != "" && SP != "" && M1 != "" && M2 != "" && M3 != "" && Y1 != "" && Y2 != "" && Y3 != "" && SP != "" && MRP != "") {
        TP = parseFloat(TP.replace(/,/g, ''));
        //  GP = parseFloat(GP.replace(/,/g, ''));
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
        //(GP < 1 || GP > 100) && GP != "" ? ($('#Error_Range_ExpectedGP').show(), flag = false) : $('#Error_Range_ExpectedGP').hide();
        // isNaN(M4) || isNaN(M5) || isNaN(M6) ||
        if (isNaN(M1) || isNaN(M2) || isNaN(M3) || isNaN(Y1) || isNaN(Y2) || isNaN(Y3) || isNaN(TP) || isNaN(GP) || isNaN(SP) || isNaN(MRP)) {
            isvalid = false;
            isNaN(M1) ? $("#Err-NAN-M1").show() : $("#Err-NAN-M1").hide()
            isNaN(M2) ? $("#Err-NAN-M2").show() : $("#Err-NAN-M2").hide()
            isNaN(M3) ? $("#Err-NAN-M3").show() : $("#Err-NAN-M3").hide()
            //isNaN(M4) ? $("#Err-NAN-M4").show() : $("#Err-NAN-M4").hide()
            //isNaN(M5) ? $("#Err-NAN-M5").show() : $("#Err-NAN-M5").hide()
            //isNaN(M6) ? $("#Err-NAN-M6").show() : $("#Err-NAN-M6").hide()
            isNaN(Y1) ? $("#Err-NAN-Y1").show() : $("#Err-NAN-Y1").hide()
            isNaN(Y2) ? $("#Err-NAN-Y2").show() : $("#Err-NAN-Y2").hide()
            isNaN(Y3) ? $("#Err-NAN-Y3").show() : $("#Err-NAN-Y3").hide()
            isNaN(TP) ? $("#Err-NAN-TP").show() : $("#Err-NAN-TP").hide()
            isNaN(GP) ? $("#Err-NAN-GP").show() : $("#Err-NAN-GP").hide()
            isNaN(SP) ? $("#Err-NAN-SP").show() : $("#Err-NAN-SP").hide()
            isNaN(MRP) ? $("#Err-NAN-MRP").show() : $("#Err-NAN-MRP").hide()
        }
    }
    else if (TP == 0 || GP == 0 || SP == 0 || M1 == 0 || M2 == 0 || M3 == 0 || Y1 == 0 || Y2 == 0 || Y3 == 0 || TP == '' || GP == '' || SP == '' || M1 == '' || M2 == '' || M3 == '' || Y1 == '' || Y2 == '' || Y3 == '') {
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
    }
    var BV = $("#BusinessInformationBusinessValue").val();
    Y1 < (M1 + M2 + M3 + (isNaN(M4) ? 0 : M4) + (isNaN(M5) ? 0 : M5) + (isNaN(M6) ? 0 : M6)) ? ($('#Y1Less').show(), isvalid = false) : $('#Y1Less').hide();
    (GP < 1 || GP > 100) ? ($('#Error_Range_ExpectedGP').show(), isvalid = false) : $('#Error_Range_ExpectedGP').hide();
    var tempUom = $("#BusinessInformationUOM").val()
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
        $("#Err-NAN-M1").hide()
        $("#Err-NAN-M2").hide()
        $("#Err-NAN-M3").hide()
        //$("#Err-NAN-M4").hide()
        //$("#Err-NAN-M5").hide()
        //$("#Err-NAN-M6").hide()
        $("#Err-NAN-Y1").hide()
        $("#Err-NAN-Y2").hide()
        $("#Err-NAN-Y3").hide()
        BusinessInformation = {
            Product: $("#BusinessInformationProductName").val(),
            SKU: $("#BusinessInformationSKU").val(),
            ProposedName: $("#BusinessInformationProposedNamesOfProduct").val(),
            ProposeLaunchDate: Proposedlaunchdate,
            ProposedSellingPrice: $("#BusinessInformationSellingPrice").val(),
            ProposedTP: $("#BusinessInformationProposedTP").val(),
            ProposedMRP: $("#BusinessInformationProposedMRP").val(),
            ExpectedGP: $("#BusinessInformationExpectedGP").val(),
            BusinessValue: BV,
            M1Quantity: $("#BusinessInformationM1").val(),
            M2Quantity: $("#BusinessInformationM2").val(),
            M3Quantity: $("#BusinessInformationM3").val(),
            M4Quantity: $("#BusinessInformationM4").val(),
            M5Quantity: $("#BusinessInformationM5").val(),
            M6Quantity: $("#BusinessInformationM6").val(),
            Y1Quantity: $("#BusinessInformationY1").val(),
            Y2Quantity: $("#BusinessInformationY2").val(),
            Y3Quantity: $("#BusinessInformationY3").val(),
            RevisionInPackagingFormat: $("input[type=radio][name=survey]:checked").val(),
            UOM: $("#BusinessInformationUOM").val(),
            Currency: $("#BusinessInformationCurrency").val()
        };
        if (EditRowIdBusinessInformation == 0) {
            gridDataBusinessInformation.push(BusinessInformation);
            var BI1 = $("#business_info").jqGrid('getGridParam', 'data');
            var BI2 = $.merge(BI1, gridDataBusinessInformation);
            $("#business_info").jqGrid('setGridParam', { data: BI2 });
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            $("#business_info").jqGrid('setRowData', EditRowIdBusinessInformation, BusinessInformation);
            $("#business_info").trigger('reloadGrid', [{ page: 1 }]);


            EditRowIdBusinessInformation = 0;
        }
        $(".BusinessInformationManditoryField").val("");
        $("#BusinessInformationM4").val("");
        $("#BusinessInformationM5").val("");
        $("#BusinessInformationM6").val("");
        $(".BusinessInformationProposedNamesOfProduct").val("");

        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('.data-datepicker').datepicker('setDate', today);
        $('#BusinessInformationLaunchDate').val('');

        $('#BusinessInformationSKU .skuOption').remove();
        $('#BusinessInformationSKU .options').remove();
    }
    isvalid = true;
    isEditBI = false;
});
function onEditBusinessInformation(RowIdBusinessInformation) {

    isEditBI = true;
    EditRowIdBusinessInformation = RowIdBusinessInformation;
    var DataFromTheRowBI = jQuery('#business_info').jqGrid('getRowData', RowIdBusinessInformation);

    BIEditedSKU = DataFromTheRowBI.SKU;
    $('#BusinessInformationProductName').val(DataFromTheRowBI.Product)
    $('#BusinessInformationSKU .skuOption').remove();
    $('#BusinessInformationSKU .options').remove();
    var skuVals = DataFromTheRowBI.SKU.split(',');
    var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].ExistingName == $('#BusinessInformationProductName').val()) {
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

    $("#BusinessInformationProductName").val(DataFromTheRowBI.Product);
    $("#BusinessInformationSKU").val(DataFromTheRowBI.SKU);

    var proposedLaunchDate = DataFromTheRowBI.ProposeLaunchDate;

    var val = DataFromTheRowBI.ProposeLaunchDate.split("-").join("-");
    $('#BusinessInformationLaunchDate').val(DataFromTheRowBI.ProposeLaunchDate.split("-").join("-"));
    $('#BusinessInformationLaunchDate').datepicker('setDate', val);


    //$("#BusinessInformationLaunchDate").val(proposedLaunchDate.split("-").join("-"));
    $("#BusinessInformationSellingPrice").val(DataFromTheRowBI.ProposedSellingPrice);


    $("#BusinessInformationProposedTP").val(DataFromTheRowBI.ProposedTP);
    $("#BusinessInformationProposedMRP").val(DataFromTheRowBI.ProposedMRP);
    $("#BusinessInformationCurrency").val(DataFromTheRowBI.Currency);
    $("#BusinessInformationExpectedGP").val(DataFromTheRowBI.ExpectedGP);
    $("#BusinessInformationBusinessValue").val(DataFromTheRowBI.BusinessValue);
    $("#BusinessInformationM1").val(DataFromTheRowBI.M1Quantity);
    $("#BusinessInformationM2").val(DataFromTheRowBI.M2Quantity);
    $("#BusinessInformationM3").val(DataFromTheRowBI.M3Quantity);
    $("#BusinessInformationM4").val(DataFromTheRowBI.M4Quantity);
    $("#BusinessInformationM5").val(DataFromTheRowBI.M5Quantity);
    $("#BusinessInformationM6").val(DataFromTheRowBI.M6Quantity);
    $("#BusinessInformationY1").val(DataFromTheRowBI.Y1Quantity);
    $("#BusinessInformationY2").val(DataFromTheRowBI.Y2Quantity);
    $("#BusinessInformationY3").val(DataFromTheRowBI.Y3Quantity);
    $("#BusinessInformationUOM").val(DataFromTheRowBI.UOM);
    $("#BusinessInformationCurrency").val(DataFromTheRowBI.Currency);
    $("input[name=survey][value=" + DataFromTheRowBI.RevisionInPackagingFormat + "]").prop('checked', true);

    $("#BusinessInformationProposedNamesOfProduct").val(DataFromTheRowBI.ProposedName);
}
function onDeleteBusinessInformation(RowIdBusinessInformation) {

    confirm("Are you sure you want to delete?", function () {

        $("#business_info").jqGrid('delRowData', RowIdBusinessInformation);
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);

    });


    $(".BusinessInformationManditoryField").val("");
    $(".BusinessInformationProposedNamesOfProduct").val("");
    $("#BusinessInformationBusinessValue").val("");

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $('.data-datepicker').datepicker('setDate', today);
    $('#BusinessInformationLaunchDate').val('');
}

$("#ProjectDetailsBusinessRational").keyup(function () {

    $("#ProjectDetailsBusinessRational").val().trim() == "" ? $("#Err-ProjectDetails-BusinessRational").show() : $("#Err-ProjectDetails-BusinessRational").hide();
});
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
function SavePackageImageFile() {
   
    var fileName = [];
    var files = $('#image_upload').prop("files");
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
                //fileName = data;
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
    if (files.length == 0) {
        if ($('#ImageName').text() != "") {
            fileName = $('#ImageName').text().replace(/"/g, "");
        }
    }
    else {
        var formData = new FormData();
        if (files.length > 0) {
            formData.append("file", files[0]);
            $.ajax({
                type: 'POST',
                url: ROOT + "ProjectBrief/SaveImageFile",
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
    }
    return fileName;
}

var BenchMarkSampleImage = $("#BenchMarkSampleImage").val();
//$('#ImageName').html(ProjectDetailsBenchMarkSampleImage)
$('#ImageName').text($("#BenchMarkSampleImage").val())
$('#ImageName').text() != '' ? $('#delete_icon_Benchmark_Samples_Image').show() : $('#delete_icon_Benchmark_Samples_Image').hide();
//$("#submittername").("testing");
if (BenchMarkSampleImage != "") {
    $("#ProjectDetailsBenchMarkSampleImageDownload").show();
}

$('#ProjectDetailsBenchMarkSampleImageDownload').click(function () {

    ProjectDetailsBenchMarkSampleImage = $("#BenchMarkSampleImage").val();
    ProjectDetailsBenchMarkSampleImage = ProjectDetailsBenchMarkSampleImage.replaceAll('"', '')
    ProjectDetailsBenchMarkSampleImage = ProjectDetailsBenchMarkSampleImage.replaceAll('"', '')
    ProjectDetailsBenchMarkSampleImage = ProjectDetailsBenchMarkSampleImage.replaceAll('/', '')

    if (ProjectDetailsBenchMarkSampleImage.length > 0) {
        $('#ProjectDetailsBenchMarkSampleImageDownload').prop("href", ROOT + "ProjectBrief/DownloadImageFile?fileName=" + ProjectDetailsBenchMarkSampleImage);
        return true;
    }
});

//Download Image Packaging Profile
function DownloadPackageImageold(rowId) {

    var filename = $('#expected').jqGrid('getCell', rowId, 'PackagingProfileImage');
    if (filename.length > 0) {
        $('#' + rowId + 'DownloadPackageImagesUpload').prop("href", ROOT + "ProjectBrief/DownloadImageFile?fileName=" + filename);
        return true;
    }
    else {
        $('#' + rowId + 'DownloadPackageImagesUpload').empty().text('No Image Present');

    }
}

colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="action_icons">' +
                '<a onclick=onEditPackagingProfile(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-edit color-info mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeletePackagingProfile(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
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

            if (statusId == '1' || statusId == '8' || statusId == '9') {
                return `<div class="action_icons">` +
                    (rowobject.PackagingProfileImage == undefined || rowobject.PackagingProfileImage == "" || rowobject.PackagingProfileImage == null ? `<i></i>` : `<a onclick="DownloadPackageImage(` + options.rowId + `)" class="icon_color btn_button" title="Download" id="` + options.rowId + `DownloadPackageImagesUpload"><i class="fas fa-download color-download mr-2" title="Download"></i></a>` +
                        `<a class="icon_color btn_button" title="View" id="'` + options.rowId + '" href="' + ROOT + 'NPDImages/' + rowobject.PackagingProfileImage + `" target="_blank" ><i class="fas fa-eye color-eye mr-2" title="View"></i></a>` +
                        `<a onclick='onDeleteImage("expected","` + rowobject.PackagingProfileImage + `","` + options.rowId + `")' class="icon_color btn_button" title = "Delete" > <i class="fas fa-trash color-delete" title="Delete"></i></a >`) +
                    `</div> `;
            }
            else {
                return `<div class="action_icons">` +
                    (rowobject.PackagingProfileImage == undefined || rowobject.PackagingProfileImage == "" || rowobject.PackagingProfileImage == null ? `<i></i>` : `<a onclick="DownloadPackageImage(` + options.rowId + `)" class="icon_color btn_button" title="Download" id="` + options.rowId + `DownloadPackageImagesUpload"><i class="fas fa-download color-download mr-2" title="Download"></i></a>` +
                        `<a class="icon_color btn_button" title="View" id="'` + options.rowId + '" href="' + ROOT + 'NPDImages/' + rowobject.PackagingProfileImage + `" target="_blank" ><i class="fas fa-eye color-eye mr-2" title="View"></i></a>`) +
                    `</div> `;
            }
        }
    },
    {
        name: 'PackagingProfileImage',
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
            if (statusId == '2' || statusId == '3' || statusId == '7' || statusId == '5' || statusId == '16' || statusId == '4' || statusId == '6' || statusId == '12' || statusId == '13' || statusId == '14') {
                jQuery("#expected").jqGrid('hideCol', "Action");
            }
            if ($('#ViewStatus').val() == 'View') {
                jQuery("#expected").jqGrid('hideCol', "Action");
            }
        }
    });

var RowIdPackagingProfile = 0;
var EditRowIdPackagingProfile = -1;
var isvalid = true;
//var image;
var isEditPP = false;
var PPEditedSKU = "";
$('#PackagingProfileAddold').click(function () {
    $('.Err-PPNoMoreSKU').hide();

    if ($('#PackagingProfileProduct').val() === "" || $('#PackagingProfileSKU').val().toString() === "" || $('#PackagingProfilePrimaryPackaging').val() === "") {
        $('#PackagingProfileProduct').val() === "" ? (isvalid = false, $('.Err-PackagingProfileProduct').show()) : (isvalid = true, $('.Err-PackagingProfileProduct').hide());
        $('#PackagingProfileSKU').val().toString() === "" ? (isvalid = false, $('.Err-PackagingProfileSKU').show()) : (isvalid = true, $('.Err-PackagingProfileSKU').hide());
        $('#PackagingProfilePrimaryPackaging').val() === "" ? (isvalid = false, $('.Err-PackagingProfilePrimaryPackaging').show()) : (isvalid = true, $('.Err-PackagingProfileProduct').hide());
    }
    else {
        isvalid = true;
        $('.Err-PackagingProfileProduct').hide();
        $('.Err-PackagingProfileSKU').hide();
        $('.Err-PackagingProfilePrimaryPackaging').hide();
    }
    image = SavePackageImageFile();
    image = image.replaceAll('"', '')

    image == "" ? image = PackageImageFileName : PackageImageFileName
    //* var PackageImageFileName = SavePackageImageFile();
    //   PackageImageFileName = PackageImageFileName.replaceAll('"', '');



    EditRowIdPackagingProfile == 0 && $(".Error_PP_Product").text() != '' ? isvalid = false : "";

    if (isvalid) {
        $("#err-expected").hide();
        $('#Err-PackagingProfileBI').hide();
        var gridDataPackagingProfile = [];
        var PackagingProfile = {};
        PackagingProfile = {
            Product: $.trim($("#PackagingProfileProduct").val()),
            SKU: $.trim($('#PackagingProfileSKU').val().toString()),
            PrimaryPackaging: $.trim($("#PackagingProfilePrimaryPackaging").val()),
            SecondaryPackaging: $.trim($("#PackagingProfileSecondaryPackaging").val()),
            TertiaryPackaging: $.trim($("#PackagingProfileTertiaryPackaging").val()),
            BenchmarkProducts: $.trim($("#PackagingProfileBenchMarkProduct").val()),//DesiredPackagingCharacters
            DesiredPackagingCharacters: $.trim($("#PackagingProfileDesiredPackagingCharacters").val()),
            Others: $.trim($("#PackagingProfileOthers").val()),
            Mould: $.trim($("#PackagingProfileMould").val()),
            PackagingProfileImage: image
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
                $("#expected").trigger('reloadGrid', [{ page: 1 }]);
                $("#expected").jqGrid('setCell', EditRowIdPackagingProfile, key, value);
                $("#expected").trigger('reloadGrid', [{ page: 1 }]);
            });
            EditRowIdPackagingProfile = 0;
        }



        $(".PackagingProfileEmpty").val("");
        $(".PackagingProfileEmptyImage").text("");
        $(".Toremove").val("");

        $('#PackagingProfileSKU').val('').multiselect('refresh');
        $("#PackagingProfileSKU").empty();
        $("#PackagingProfileSKU").multiselect('rebuild');

        $("#expected").trigger('reloadGrid', [{ page: 1 }]);
        isEditPP = false;
    }
});
function onEditPackagingProfile(RowIdPackagingProfile) {

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
        if (gridData[i].ExistingName == $('#PackagingProfileProduct').val()) {
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
    var skuOption = "";
    $.each(finalList, function (i, obj) {
        if (obj != "" || obj != null || obj != undefined) {
            skuOption += '<option value="' + obj + '">' + obj + '</option>';
        }
    });
    // $('#PackagingProfileSKU').append(skuOption); // append the new options to the dropdown
    $("#PackagingProfileSKU").html(skuOption);
    $('#PackagingProfileSKU').multiselect('rebuild');
    $('#PackagingProfileSKU').val(skuVals);
    $("#PackagingProfileSKU").multiselect('rebuild');
    $('#PackagingProfilePrimaryPackaging').val(DataFromTheRow.PrimaryPackaging);
    $('#PackagingProfileSecondaryPackaging').val(DataFromTheRow.SecondaryPackaging);
    $('#PackagingProfileTertiaryPackaging').val(DataFromTheRow.TertiaryPackaging);
    $('#PackagingProfileBenchMarkProduct').val(DataFromTheRow.BenchmarkProducts);
    $('#PackagingProfileDesiredPackagingCharacters').val(DataFromTheRow.DesiredPackagingCharacters);
    $('#PackagingProfileOthers').val(DataFromTheRow.Others);
    $('#PackagingProfileMould').val(DataFromTheRow.Mould);
    $('#image_upload').text(DataFromTheRow.Image);
    $("#Display_image_upload").text(DataFromTheRow.PackagingProfileImage);
    $('#PackagingProfile').show();
    PackageImageFileName = DataFromTheRow.PackagingProfileImage
    EditRowIdPackagingProfile = RowIdPackagingProfile;
    $("#expected").trigger('reloadGrid', [{ page: 1 }]);
}
function onDeletePackagingProfile(RowIdPackagingProfile, flag = 0) {

    if (flag === 1) {

        $("#expected").jqGrid('delRowData', RowIdPackagingProfile);
        $("#expected").trigger('reloadGrid', [{ page: 1 }]);
    }
    else {

        confirm("Are you sure you want to delete?", function () {
            $("#expected").jqGrid('delRowData', RowIdPackagingProfile);
            $("#expected").trigger('reloadGrid', [{ page: 1 }]);
        });
    }

    /*});*/
}
$("#PackagingProfileProduct").change(function () {

    $("#PackagingProfileSKU").empty(); // remove all options from the dropdown
    $('#PackagingProfileSKU').multiselect('rebuild');
    var productName = $("#PackagingProfileProduct").val();
    $(".Error_PP_Product").hide().text('');
    var existingSku = [];


    var gridDataExpected = packagingProfileData_1.filter(row => row.length !== 0);
    if (productName != "") {
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

            if (gridDataExpected.length > 0) {
                for (var i = 0; i < gridDataExpected.length; i++) {
                    if (editedRowdata[0] !== gridDataExpected[i]) {

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
$("#BusinessInformationProductName").change(function () {

    $("option").remove("#BusinessInformationSKU .skuOption");
    var productName = $("#BusinessInformationProductName").val();
    $(".Error_BI_Product").hide().text('');
    $("option").remove("#BusinessInformationSKU .options");
    $("option").remove("#BusinessInformationSKU .skuOption");

    if (productName != "") {
        var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].ExistingName == productName) {
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
$("#HgmlData_ProductName").change(function () {
    var productName = $("#HgmlData_ProductName").val();
    $(".Error_Hgml_Product").hide().text('')
    const productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

    if (productName != "") {
        productList.includes(productName) ? ($(".Error_Hgml_Product").show().text('This Product already consists the definition, Please select the different Product')) : "";
    }
});
$("#HgmlData_ProductNameApprovePage").change(function () {
    var productName = $("#HgmlData_ProductNameApprovePage").val();
    $(".Error_HgmlApprove_Product").hide().text('')
    const productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

    if (productName != "") {

        productList.includes(productName) ? ($(".Error_HgmlApprove_Product").show().text('This Product already consists the definition, Please select the different Product')) : "";
    }
});
$("#PmdProductName").change(function () {
    var productName = $("#PmdProductName").val();
    $(".Error_PMD_Product").hide().text('');
    // productName == "" ? ($("#Error_PP_Product").show().text('Please select Product')) : $("#Error_PP_Product").hide().text('');
    const productList = $("#PMD_Data").jqGrid("getCol", "ProductName");

    if (productName != "") {

        productList.includes(productName) ? ($(".Error_PMD_Product").show().text('This Product already consists the definition, Please select the different Product')) : "";
    }
});
$("#HgmlData_HubDropdown").change(function () {

    var HubIds = $("#HgmlData_HubDropdown").val().toString();

    $.ajax({
        type: "POST",
        url: ROOT + "Base/GetUserEmailBasedOnHub",
        data: { hubIds: HubIds },
        dataType: "json",
        success: function (UserEmailResult) {

            if (UserEmailResult != null) {
                $("option").remove(".HubUsersOption");
                var userEmailList = ''
                $.each(UserEmailResult, function (i, obj) {

                    userEmailList += '<option class="HubUsersOption ' + obj.Hub + '" value="' + obj.HgmlDataHubUsersList + '">' + obj.Hub + ' - ' + obj.HgmlDataHubUsersList + '</option>';

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

    $('.example-dropUp2').multiselect({
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });


});

$("#HgmlData_SendToHub_Yes").hide();
$("#HgmlData_SendToHub_No").hide();

$(".HgmlDataSendToHubConfirmation").change(function () {
    $("#Error_DoYouWantSentToHUB").hide();
    var pofile = $(".HgmlDataSendToHubConfirmation").val();
    if (pofile == "Yes") {
        $("#HgmlData_SendToHub_Yes").show();
        $("#HgmlData_SendToHub_No").hide();

        $('.Button_SendToHub').show();
        $('.Button_SendToPmd').hide();

    }
    else if (pofile == "No") {
        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").show();
        $(".hgmldatagrid").show();

        $('.Button_SendToHub').hide();

        for (var i = 0; i < JsonFormReformulationStagesData['ApprovalStages'].length; i++) {
            var id = JsonFormReformulationStagesData.ApprovalStages[i].FromStage
            if (id == 16) {
                $(".Button_SendToUnderExploration").show();
                break;
            }
            else {
                $('.Button_SendToPmd').show();
            }
        }
    }
    else {
        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").hide();
    }

});

if (statusId == "1") {
    $(".NoEdit").attr('readonly', false);
    $(".HgmlRemarks,.hubHidden").hide();
    $(".HubReview").hide();
    $(".Forhub").hide();
    $(".HgmlRemarksButton").hide();
    $(".NotInHubReview").hide();
    $('#Division,#Category_Reformulation').attr('disabled', false);
    $("#business_info").hideCol("ProposedName")  //
    /*Code to get date*/
    var todayDate = new Date();
    $('#Reformulation_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));
    $("#business_info").jqGrid("clearGridData");
    $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
    $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
    $('.InitiatorRemarks').show();

}

if (statusId == "3") {
    $('#Page_Heading').text('Reformulation - ' + statusName);
    //var JsonFormReformulationHgmlReviewData = $.parseJSON($('#JsonFormReformulationHgmlReviewData').val());
    var todayDate = new Date(ReformulationJQgrid.ReformulationTableData[0].InitiatedDate);
    $(".HideClass").hide();
    $(".NoEdit").attr('readonly', true);
    $(".HubNoEdit").attr('readonly', true);
    $(".NotInHubReview").hide();
    $(".HgmlRemarksButton").hide();
    $(".BusinessInfo").show();
    $(".HideForhub").hide();
    $('#PackagingProfileGrid').show()
   
}

if (statusId == "7") {
    $(".NoEdit").attr('readonly', true);
    $(".HubReview").hide();
    $(".HideClass").hide();
    $("#business_info").hideCol("ProposedName")

    $('#Division,#Category_Reformulation').attr('disabled', true);


    var todayDate = new Date(ReformulationJQgrid.ReformulationTableData[0].InitiatedDate);
    $('#Reformulation_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));
}

function validatesubmitform() {
    $('#ConformReformulation').prop("disabled", false);
    $('#ManagerApprovalOK').prop("disabled", false);

    var flag = true;

    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationBusinessInformation = $('#business_info').jqGrid('getGridParam', 'data');
    //var reformulationPackagingProfileGrid = $('#expected').jqGrid('getGridParam', 'data');
    var reformulationPackagingProfileGrid = packagingProfileData_1.filter(row => row.length !== 0);
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var projectdetailsimage = ProjectDetailsImageFile();
    projectdetailsimage == "" ? projectdetailsimage = ProjectDetailsBenchMarkSampleImage : projectdetailsimage = projectdetailsimage
    var ProjectName = $('#ProjectName').val().trim();

    var projectheaders = []
    $("#Reformulation_Table").each(function (i) {
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Hub: $(this).find('#Reformulation_Hub').text().trim(),
            Category: $(this).find('#Reformulation_Category option:selected').val(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
            status: 2,
        });
    });
    var projectdetails = [];
    var additionalreformulation = [];
    projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();
    projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();
    

    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val().trim(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val().trim(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val().trim(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val().trim(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val().trim(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val().trim(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val().trim(),
        Others: $("#AdditionalRequirmentsOthers").val().trim(),
    };
    var initiatorremarks = $("#editor").val().trim();
    
    $("#ProjectDetailsBusinessRational").val().trim() == "" ? ($('#Err-ProjectDetails-BusinessRational').show(), flag = false) : $('#Err-ProjectDetails-BusinessRational').hide()
    productdescription.length === 0 ? ($('#Err-ProductDescription').show(), flag = false) : $('#Err-ProductDescription').hide();
    reformulationBusinessInformation.length === 0 ? ($('#err-business_info').show(), flag = false, /*$(window).scrollTop($('#err-business_info').position().top))*/ document.getElementById('#err-business_info').scrollIntoView({ behavior: 'smooth' })) : $('#err-business_info').hide();

    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if ($("input[type=radio][name=survey]:checked").val() == "yes") {
        reformulationPackagingProfileGrid.length === 0 ? ($("#err-expected").show(), flag = false, /*$(window).scrollTop($('#err-expected').position().top))*/ document.getElementById('err-expected').scrollIntoView({ behavior: 'smooth' })) : $("#err-expected").hide();
    }
    $('#ProjectName').val().trim() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();

    $('#ReformulationEdit').validate();


    if ($('#ReformulationEdit').valid()) { }
    else {
        flag = false;
    }



    if (flag) {
        if (statusId == '9') {
            $('div#SubmitForHGML').modal('show');
            $("#ManagerApprovalOK").click(function () {

                if (deletedImageNameList.length > 0) {

                    $.each(deletedImageNameList, function (index, fileName) {

                        if (projectdetailsimage != "" && projectdetailsimage != null) {
                            $.ajax({
                                type: 'POST',
                                url: ROOT + "ProjectBrief/DeleteImageFile",
                                data: { fileName: fileName },
                                success: function (data) {

                                    path = data;
                                }
                            });
                        }
                    });
                }

                var Remarks = $('#ShowManagerApprovalRemarks').val();
                $("#ProjectHeaders").val(JSON.stringify(projectheaders));
                $("#reformulationProductDescription").val(JSON.stringify(productdescription));
                $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
                $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
                $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
                $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
                $("#InitiatorRemarks").val(initiatorremarks);
                $("#SendBackToInitiatorRemarks").val(Remarks);
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
                $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
                $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

                var approvalStatus = []

                approvalStatus = [{
                    FromStage: 9,
                    FromStageName: statusName,
                    Action: "Send to HGML Review",
                    ToStage: 2,
                    ToStageName: "HGML Review"
                }];
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#ReformulationStatus').val(2);
                $('#ReformulationEdit').submit();

                $('#ManagerApprovalOK').prop("disabled", true);

            });

        }
        else {
            $('div#SubmitModal').modal('show');
            $("#ConformReformulation").click(function () {

                if (deletedImageNameList.length > 0) {

                    $.each(deletedImageNameList, function (index, fileName) {

                        if (projectdetailsimage != "" && projectdetailsimage != null) {
                            $.ajax({
                                type: 'POST',
                                url: ROOT + "ProjectBrief/DeleteImageFile",
                                data: { fileName: fileName },
                                success: function (data) {

                                    path = data;
                                }
                            });
                        }
                    });
                }

                $("#ProjectHeaders").val(JSON.stringify(projectheaders));
                $("#reformulationProductDescription").val(JSON.stringify(productdescription));
                $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
                $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
                $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
                $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
                $("#InitiatorRemarks").val(initiatorremarks);
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
                $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
                $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

                var st = statusName
                var approvalStatus = []
                if (statusId == '8') {

                    approvalStatus = [{

                        FromStage: 8,
                        FromStageName: statusName,
                        Action: "Send to HGML Review",
                        ToStage: 2,
                        ToStageName: "HGML Review"
                    }];
                }
                else if (statusId == '1') {

                    approvalStatus = [{
                        FromStage: 1,
                        FromStageName: statusName,
                        Action: "Send to HGML Review",
                        ToStage: 2,
                        ToStageName: "HGML Review"
                    }];
                }
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#ReformulationStatus').val(2);
                $('#ReformulationEdit').submit();

                $('#ConformReformulation').prop("disabled", true);

            });
        }
    }
}

//HGML Data for PMD Review and Approved
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="action_icons">
            <a onclick = onEditHgmlData(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fas fa-edit color-info mr-2" title="Edit"></i></a>
            <a onclick = onDeleteHgmlData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fas fa-trash color-delete" title="Delete"></i></a>
        </div>`;
        }
    },

    {
        name: 'ProductName',
        label: 'Product Name',
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ParticipatingMarkets',
        label: 'Participating Markets',
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ProjectPriority',
        label: 'Project Priority',
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ProjectCategorization',
        label: 'Project Categorization',
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true
    }

];

var RowIdHGML = 0;
var EditRowIdHGML = 0;
var isvalid = true;
$("#HGML_Data").jqGrid({
    url: '',
    datatype: 'local',
    data: JsonFormReformulationHgmlReviewData.HgmlDataGridList,
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#Pager_HGMLGrid',
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

        if (statusId != '2' && statusId != '4' && statusId != '13' && statusId != '14') {
            jQuery("#HGML_Data").jqGrid('hideCol', "Action");
        }
        if ((statusId == "4" || statusId == '14') && $('#ViewStatus').val() == 'View') {
            jQuery("#HGML_Data").jqGrid('hideCol', "Action")
        }
        if ($('#ViewStatus').val() == 'View') {
            jQuery("#HGML_Data").jqGrid('hideCol', "Action")
        }
    }
});

$('#pager_businessinfo_right .ui-paging-info:nth-child(2)').hide();

$("#Preview_HGML_Data").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#Preview_Pager_HGMLGrid',
    rowNum: 20,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Preview_HGML_Data tbody tr");
        var objHeader = $("#Preview_HGML_Data tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }

        }

        jQuery("#Preview_HGML_Data").jqGrid('hideCol', "Action")
    }
});

var EditRowId1 = 0;
function AddHgmlData() {


    var productName = $('#HgmlData_ProductName').val();
    var participatingMarkets = $('#HgmlData_ParticipatingMarkets').val();
    var projectPriority = $('#HgmlData_ProjectPriority').val();
    var hgmlDataRemarks = $('#HgmlData_Remarks').val();
    var projectCategorization = $("#PmdProjectCategorization").val();
    var flag1 = true;

    if (productName == "" || participatingMarkets == "" || projectPriority == "" || projectCategorization == "") {
        flag1 = false;
        productName == "" ? $(".Error_HgmlDataProductName").show() : $(".Error_HgmlDataProductName").hide();
        participatingMarkets == "" ? $(".Error_HgmlDataParticipatingMarkets").show() : $(".Error_HgmlDataParticipatingMarkets").hide();
        projectPriority == "" ? $(".Error_HgmlDataProjectPriority").show() : $(".Error_HgmlDataProjectPriority").hide();
        projectCategorization == "" ? $(".Error_ProjectCategory").show() : $(".Error_ProjectCategory").hide();
    }

    EditRowId1 == 0 && $(".Error_Hgml_Product").text() != '' ? flag1 = false : "";

    if (flag1) {



        var griddata = [];
        var hgmlData = {};

        $('.Error_EmptyGrid').hide();

        hgmlData = {
            ProductName: productName,
            ParticipatingMarkets: participatingMarkets,
            ProjectPriority: projectPriority,
            Remarks: hgmlDataRemarks,
            ProjectCategorization: projectCategorization
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


        $(".HGMLData").val("");
        // To reset the textbox fields

        productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingName");


        hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, hgmlDataProductNameList) == -1 });

        $("option").remove("#HgmlData_ProductName .ProductOption");

        if (hgmlDataProductNameList.length > 0) {
            var productOption = "";
            $.each(hgmlDataProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#HgmlData_ProductName").append(productOption);
        }
    }

}

//---------------------------------------------------------HGML Approve page

var EditRowId1 = 0;
function AddHgmlDataApprove() {
    
    var productName = $('#HgmlData_ProductNameApprovePage').val();
    var participatingMarkets = $('#HgmlData_ParticipatingMarketsApprovePage').val();
    var projectPriority = $('#HgmlData_ProjectPriorityApprovePage').val();
    var hgmlDataRemarks = $('#HgmlData_RemarksApprovePage').val();
    var projectCategorization = $("#PmdProjectCategorizationApprovePage").val();
    var flag1 = true;

    if (productName == "" || participatingMarkets == "" || projectPriority == "" || projectCategorization == "") {
        flag1 = false;
        productName == "" ? $("#Error_HgmlDataProductNameApprovePage").show() : $("#Error_HgmlDataProductNameApprovePage").hide();
        participatingMarkets == "" ? $("#Error_HgmlDataParticipatingMarkets").show() : $("#Error_HgmlDataParticipatingMarkets").hide();
        projectPriority == "" ? $("#Error_HgmlDataProjectPriority").show() : $("#Error_HgmlDataProjectPriority").hide();
        projectCategorization == "" ? $(".Error_HgmlDataProjectCategory").show() : $(".Error_HgmlDataProjectCategory").hide();
    }

    EditRowId1 == 0 && $(".Error_HgmlApprove_Product").text() != '' ? flag1 = false : "";

    if (flag1) {

        productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingName");

        hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, hgmlDataProductNameList) == -1 });

        if (hgmlDataProductNameList.length > 0) {
            var productOption = "";
            $("option").remove("#HgmlData_ProductNameApprovePage .ProductOption"); $.each(hgmlDataProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#HgmlData_ProductNameApprovePage").append(productOption);
        }

        var griddata = [];
        var hgmlData = {};

        $('.Error_HgmlData').hide();

        hgmlData = {
            ProductName: productName,
            ParticipatingMarkets: participatingMarkets,
            ProjectPriority: projectPriority,
            Remarks: hgmlDataRemarks,
            ProjectCategorization: projectCategorization
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

        $(".HGMLData").val("");

        productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingName");


        hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, hgmlDataProductNameList) == -1 });

        $("option").remove("#HgmlData_ProductNameApprovePage .ProductOption");

        if (hgmlDataProductNameList.length > 0) {
            var productOption = "";
            $.each(hgmlDataProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#HgmlData_ProductNameApprovePage").append(productOption);
        }
        // To reset the textbox fields
    }
}

$('#HgmlData_ParticipatingMarketsApprovePage').keypress(function () {

    $('#HgmlData_ParticipatingMarketsApprovePage').length == 0 ? $("#Error_HgmlDataParticipatingMarkets").show() : $("#Error_HgmlDataParticipatingMarkets").hide();

});
$('#HgmlData_ProductNameApprovePage').change(function () {
    $('#HgmlData_ProductNameApprovePage').val() == "" ? $("#Error_HgmlDataProductNameApprovePage").show() : $("#Error_HgmlDataProductNameApprovePage").hide();
});
$('#HgmlData_ProjectPriorityApprovePage').change(function () {
    $('#HgmlData_ProjectPriorityApprovePage').val() == "" ? $("#Error_HgmlDataProjectPriority").show() : $("#Error_HgmlDataProjectPriority").hide();
});


//On Clicking the edit button 
function onEditHgmlData(RowId) {

    if (statusId == "2") {
        var DataFromTheRowBI = jQuery('#HGML_Data').jqGrid('getRowData', RowId);
        var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

        hgmlDataProductNameList = $.grep(hgmlDataProductNameList, function (el) { return $.inArray(el, productList) == -1 });
        hgmlDataProductNameList.push(DataFromTheRowBI.ProductName);

        $("option").remove("#HgmlData_ProductName .ProductOption");

        if (hgmlDataProductNameList.length > 0) {

            var productOption = "";

            $.each(hgmlDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#HgmlData_ProductName").append(productOption);
        }
    }
    else {
        var DataFromTheRowBI = jQuery('#HGML_Data').jqGrid('getRowData', RowId);
        var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

        hgmlDataProductNameList = $.grep(hgmlDataProductNameList, function (el) { return $.inArray(el, productList) == -1 });
        hgmlDataProductNameList.push(DataFromTheRowBI.ProductName);

        $("option").remove("#HgmlData_ProductNameApprovePage .ProductOption");

        if (hgmlDataProductNameList.length > 0) {

            var productOption = "";

            $.each(hgmlDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#HgmlData_ProductNameApprovePage").append(productOption);
        }

    }
    EditRowId1 = RowId;
    $(".Error_HgmlApprove_Product").hide().text('')
    $('.Error_HgmlData').hide();

    var DataFromTheRow = jQuery('#HGML_Data').jqGrid('getRowData', RowId);

    if (statusId == '2') {
        $('#HgmlData_ProductName').val(DataFromTheRow.ProductName);
        $('#HgmlData_ParticipatingMarkets').val(DataFromTheRow.ParticipatingMarkets);
        $('#HgmlData_ProjectPriority').val(DataFromTheRow.ProjectPriority);
        $('#PmdProjectCategorization').val(DataFromTheRow.ProjectCategorization);
        $('#HgmlData_Remarks').val(DataFromTheRow.Remarks);

    }
    else {
        $('#HgmlData_ProductNameApprovePage').val(DataFromTheRow.ProductName);
        $('#HgmlData_ParticipatingMarketsApprovePage').val(DataFromTheRow.ParticipatingMarkets);
        $('#HgmlData_ProjectPriorityApprovePage').val(DataFromTheRow.ProjectPriority);
        $('#HgmlData_RemarksApprovePage').val(DataFromTheRow.Remarks);
        $('#PmdProjectCategorizationApprovePage').val(DataFromTheRow.ProjectCategorization);
    }


}

//On deleting the row data
function onDeleteHgmlData(RowId) {
    confirm("Are you sure you want to delete?", function () {
        $("#HGML_Data").jqGrid('delRowData', RowId);
        $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

        $('.HGMLData').val("");

        if (statusId == "4" || statusId == "14") {

            var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");
            productDescriptionProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingName");

            hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
            //packagingProfileProductNameList.push(DataFromTheRow.Product);

            $("option").remove("#HgmlData_ProductNameApprovePage .ProductOption");

            if (hgmlDataProductNameList.length > 0) {


                var productOption = "";

                $.each(hgmlDataProductNameList, function (i, obj) {
                    //
                    if (obj != "") {
                        productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                    }
                });

                $("#HgmlData_ProductNameApprovePage").append(productOption);
            }

        }
        else {
            var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");
            productDescriptionProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingName");

            hgmlDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
            //packagingProfileProductNameList.push(DataFromTheRow.Product);

            $("option").remove("#HgmlData_ProductName .ProductOption");

            if (hgmlDataProductNameList.length > 0) {


                var productOption = "";

                $.each(hgmlDataProductNameList, function (i, obj) {
                    //
                    if (obj != "") {
                        productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                    }
                });

                $("#HgmlData_ProductName").append(productOption);
            }
        }
    });

    EditRowId1 = 0;

    /* });*/
}

function CancelForm() {
    $('div#CancelModal').modal('show');
}

$("#PmdProjectLead").keyup(function () {
    $("#PmdProjectLead").val() == "" ? $("#Error_Lead").show() : $("#Error_Lead").hide();
});

$("#PmdProjectLead").val($("#UserName").val());

var EditRowId1 = 0;
function AddPmdData() {

    var productName = $("#PmdProductName").val();
    var complexity = $.trim($("#PmdComplexity option:selected").val());
    var pmdRd = $.trim($("#PmdRD option:selected").val());
    var pmdDataRemarks = $.trim($("#PmdDataRemarks").val());
    var projectLead = $.trim($("#PmdProjectLead").val());
    var prototypeSubmission = $.trim($("#PrototypeSubmissionDate").val());
    var TTDCompletionDate = $.trim($("#TTDCompletionDate").val());
    var ProductionDate = $.trim($("#ProductionDate").val());
    var MajorRisk = $.trim($("#MajorRisk").val());
    //  var TargetCost = $.trim($("#TargetCost").val());
    var flag1 = true;

    if (productName == "" || complexity == "" || pmdRd == "" || pmdDataRemarks == "" || projectLead == "") {

        flag1 = false;

        productName == "" ? $(".Error_ProductName").show() : $(".Error_ProductName").hide();
        complexity == "" ? $("#Error_PmdComplexity").show() : $("#Error_PmdComplexity").hide();
        pmdRd == "" ? $("#Error_PmdRd").show() : $("#Error_PmdRd").hide();
        pmdDataRemarks == "" ? $("#Error_PmdDataRemarks").show() : $("#Error_PmdDataRemarks").hide();
        projectLead == "" ? $("#Error_Lead").show() : $("#Error_Lead").hide();

    }


    EditRowId1 == 0 && $(".Error_PMD_Product").text() != '' ? flag1 = false : "";

    if (flag1) {

        var griddata = [];
        var pmdData = {};

        $('.Error_HgmlData').hide();
        $('#Err-PmdData').hide();

        pmdData = {
            ProductName: productName,
            ComplexityToBeAssigned: complexity,
            RandDName: pmdRd,
            Remarks: pmdDataRemarks,
            ProjectLead: projectLead,
            ProjectLead: projectLead,
            TargetFirstPrototypeSubmissionDate: prototypeSubmission,
            TargetTTDCompletionDate: TTDCompletionDate,
            TargetProductionDate: ProductionDate,
            MajorRiskIfAny: MajorRisk
            //,TargetCost: TargetCost
        }

        if (EditRowId1 == 0) {

            griddata.push(pmdData);
            var HD1 = $("#PMD_Data").jqGrid('getGridParam', 'data');
            var HD2 = $.merge(HD1, griddata);
            $("#PMD_Data").jqGrid('setGridParam', { data: HD2 });
            $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {

            $.each(pmdData, function (key, value) {
                $("#PMD_Data").jqGrid('setCell', EditRowId1, key, value);
            });
            $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);

            EditRowId1 = 0;
        }



        $(".PMDdata").val("");

        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('.data-datepicker-monthyear').datepicker('setDate', today);

        $(".PMDdata").val("");

        var productDescriptionProductNameList = jQuery('#prd_desc').jqGrid("getCol", "ExistingName");

        var pmdDataProductNameList = $("#PMD_Data").jqGrid("getCol", "ProductName");

        pmdDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, pmdDataProductNameList) == -1 });

        $("option").remove("#PmdProductName .ProductOption");

        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $.each(pmdDataProductNameList, function (i, obj) {
                //
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PmdProductName").append(productOption);
        }

        $("#PmdProjectLead").val($("#UserName").val());
        // To reset the textbox fields
    }
}

$('.data-datepicker-monthyear').click(function () {
    $(this).val('');
})

$('#PmdProductName').change(function () {
    $(this).val() == "" ? $(".Error_ProductName").show() : $(".Error_ProductName").hide();
});
$('#PmdProjectCategorization').change(function () {
    $(this).val() == "" ? $(".Error_ProjectCategory").show() : $(".Error_ProjectCategory").hide();
});
$('#PmdComplexity').change(function () {
    $(this).val() == "" ? $("#Error_PmdComplexity").show() : $("#Error_PmdComplexity").hide();
});
$('#PmdRD').change(function () {
    $(this).val() == "" ? $("#Error_PmdRd").show() : $("#Error_PmdRd").hide();
});
$('#PmdDataRemarks').keypress(function () {
    $(this).length == 0 ? $("#Error_PmdDataRemarks").show() : $("#Error_PmdDataRemarks").hide();
});


function onEditPmdData(RowId) {


    var DataFromTheRowBI = jQuery('#PMD_Data').jqGrid('getRowData', RowId);
    var productList = $("#PMD_Data").jqGrid("getCol", "ProductName");

    pmdDataProductNameList = $.grep(pmdDataProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    pmdDataProductNameList.push(DataFromTheRowBI.ProductName);

    $("option").remove("#PmdProductName .ProductOption");

    if (pmdDataProductNameList.length > 0) {

        var productOption = "";

        $.each(pmdDataProductNameList, function (i, obj) {

            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });

        $("#PmdProductName").append(productOption);
    }


    EditRowId1 = RowId;

    $('.Error_HgmlData').hide();

    var DataFromTheRow = jQuery('#PMD_Data').jqGrid('getRowData', RowId);

    $('#PmdProductName').val(DataFromTheRow.ProductName);
    $('#PmdComplexity').val(DataFromTheRow.ComplexityToBeAssigned);
    $('#PmdRD').val(DataFromTheRow.RandDName);
    $('#PmdProjectLead').val(DataFromTheRow.ProjectLead);
    $('#PmdDataRemarks').val(DataFromTheRow.Remarks);
    //$('#TargetCost').val(DataFromTheRow.TargetCost);


    $('#PrototypeSubmissionDate').val(DataFromTheRow.TargetFirstPrototypeSubmissionDate);
    $('#PrototypeSubmissionDate').datepicker('setDate', DataFromTheRow.TargetFirstPrototypeSubmissionDate);

    $('#TTDCompletionDate').val(DataFromTheRow.TargetTTDCompletionDate);
    $('#TTDCompletionDate').datepicker('setDate', DataFromTheRow.TargetTTDCompletionDate);

    $('#ProductionDate').val(DataFromTheRow.TargetProductionDate);
    $('#ProductionDate').datepicker('setDate', DataFromTheRow.TargetProductionDate);


    $('#MajorRisk').val(DataFromTheRow.MajorRiskIfAny);

}



//On deleting the row data
function onDeletePmdData(RowId) {
    confirm("Are you sure you want to delete?", function () {
        $("#PMD_Data").jqGrid('delRowData', RowId);
        $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);

        $('.PMDdata').val("");
        var productList = $("#PMD_Data").jqGrid("getCol", "ProductName");
        productDescriptionProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingName");

        pmdDataProductNameList = $.grep(productDescriptionProductNameList, function (el) { return $.inArray(el, productList) == -1 });
        //packagingProfileProductNameList.push(DataFromTheRow.Product);

        $("option").remove("#PmdProductName .ProductOption");

        if (pmdDataProductNameList.length > 0) {


            var productOption = "";

            $.each(pmdDataProductNameList, function (i, obj) {
                //
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PmdProductName").append(productOption);
        }
    });
}


function ReformulationPmdSave() {

    $('#ReformulationSavePopUp').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var pmdData = [];
    var targetCostData = [];
    $('div#SaveModal').modal('show');

    $("#ReformulationSavePopUp").click(function () {

        pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
        $('#PmdData').val(JSON.stringify(pmdData));
        targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
        $('#TargetCostGridData').val(JSON.stringify(targetCostData));
        if (statusId == '5') {
            $('#ReformulationStatus').val(5);
        }
        else if (statusId == '16') {
            $('#ReformulationStatus').val(16);
        }

        $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
        $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
        $('#ReformulationEdit').submit();
        $('#ReformulationSavePopUp').prop("disabled", true);



    });

}


function ReformulationPmdSendBack() {

    $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var listLength = JsonFormReformulationStagesData['ApprovalStages'].length;
    listLength = listLength - 1;

    //var previousStage = $('#PreviousStage').val();
    var previousStage = "";
    for (var i = 0; i < JsonFormReformulationStagesData['ApprovalStages'].length; i++) {

        var status = JsonFormReformulationStagesData.ApprovalStages[i].FromStage
        if (status == 11 || status == 5 || status == 8 || status == 9 || status == 16) {
            continue;
        }
        else {
            var previousStage = status;
            break;
        }
    }
    //var previousStage = JsonFormReformulationStagesData.ApprovalStages[0].FromStage;
    var pmdData = [];
   
    $('div#SendbackModal').modal('show');
  

    $("#Reformulation_SendBackToInitiator_Ok").click(function () {

        var PMDRemarks = $('#PopUp_SendBackToInitiatorRemarks').val().trim();
        if (PMDRemarks != "") {

            if (statusId == '5') {
                if (previousStage == 13 || previousStage == 2) {

                    pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');

                    targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                    $('#TargetCostGridData').val(JSON.stringify(targetCostData));

                    approvalStatus = [{
                        FromStage: 5,
                        FromStageName: statusName,
                        Action: "Send to Brief Demoted to HGMl",
                        ToStage: 13,
                        ToStageName: "Brief Demoted to HGML"
                    }];

                    $('#PmdData').val(JSON.stringify(pmdData));
                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    $('#ReformulationStatus').val(13);
                    $('#SendToHgmlRemarks').val(PMDRemarks);
                    $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                    $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
                    $('#ReformulationEdit').submit();

                }
                else if (previousStage == 4 || previousStage == 14) {

                    pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
                    targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                    $('#TargetCostGridData').val(JSON.stringify(targetCostData));


                    approvalStatus = [{
                        FromStage: 5,
                        FromStageName: statusName,
                        Action: "Send to Brief Demoted",
                        ToStage: 14,
                        ToStageName: "Brief Demoted to HGML"
                    }];

                    $('#PmdData').val(JSON.stringify(pmdData));
                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    $('#ReformulationStatus').val(14);
                    $('#SendToHgmlRemarks').val(PMDRemarks);
                    $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                    $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
                    $('#ReformulationEdit').submit();

                    $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", true);

                }
            }

            if (statusId == '16') {
                if (previousStage == 13 || previousStage == 2) {


                    pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');

                    targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                    $('#TargetCostGridData').val(JSON.stringify(targetCostData));

                    approvalStatus = [{
                        FromStage: 16,
                        FromStageName: "Extended Fine Screening Review",
                        Action: "Send to Brief Demoted to HGMl",
                        ToStage: 13,
                        ToStageName: "Brief Demoted to HGML"
                    }];

                    $('#PmdData').val(JSON.stringify(pmdData));
                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    $('#ReformulationStatus').val(13);
                    $('#SendToHgmlRemarks').val(PMDRemarks);
                    $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                    $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
                    $('#ReformulationEdit').submit();

                }
                else if (previousStage == 4 || previousStage == 14) {

                    pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
                    targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                    $('#TargetCostGridData').val(JSON.stringify(targetCostData));


                    approvalStatus = [{
                        FromStage: 16,
                        FromStageName: "Extended Fine Screening Review",
                        Action: "Send to Brief Demoted",
                        ToStage: 14,
                        ToStageName: "Brief Demoted to HGML"
                    }];

                    $('#PmdData').val(JSON.stringify(pmdData));
                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    $('#ReformulationStatus').val(14);
                    $('#SendToHgmlRemarks').val(PMDRemarks);
                    $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                    $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
                    $('#ReformulationEdit').submit();

                    $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", true);

                }
            }

        }
        else {

            $('#Error_SendBackRemarks').show();
        }
    });

}


function ReformulationPmdApprove() {

    $('#ReformulatioApproveButton').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;

    var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
    var pmdTargetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data');

    if (pmdData.length === 0) {
        $('#Err-PmdData').show();
        //$(window).scrollTop($('.pmddataform').position().top);
        document.getElementsByClassName('pmddataform').scrollIntoView({ behavior: 'smooth' });
    }
    
    else {

        $('div#ApproveModal').modal('show');

        $("#ReformulatioApproveButton").click(function () {

            var approveRemarks = $('#ApproveRemarks').val().trim();
            if (approveRemarks === '') {
                $('#Error_Reformulation_PMDApproveRemarks').show();
            }
            else {
                if (statusId == "5") {
                    approvalStatus = [{
                        FromStage: 5,
                        FromStageName: statusName,
                        Action: "Accept",
                        ToStage: 6,
                        ToStageName: "Accepted"
                    }];
                }
                if (statusId == "16") {
                    approvalStatus = [{
                        FromStage: 16,
                        FromStageName: "Extended Fine Screening Review",
                        Action: "Send to " + statusList[5].StatusName,
                        ToStage: 6,
                        ToStageName: "Accepted"
                    }];
                }
                $('#SendToHgmlRemarks').val(approveRemarks)
                $('#PmdData').val(JSON.stringify(pmdData));
                targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                $('#TargetCostGridData').val(JSON.stringify(targetCostData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#ReformulationStatus').val(6);
                $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
                $('#ReformulationEdit').submit();

                $('#ReformulatioApproveButton').prop("disabled", true);

            }

        });
    }
}

function ValidateSaveForm() {

    $('#ReformulationSavePopUp').prop("disabled", false);

    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
    //var reformulationpackagingprofilegrid = $('#expected').jqGrid('getGridParam', 'data');
    var reformulationpackagingprofilegrid = packagingProfileData_1.filter(row => row.length !== 0);
    var projectdetailsimage = ProjectDetailsImageFile();
    projectdetailsimage == "" ? projectdetailsimage = ProjectDetailsBenchMarkSampleImage : projectdetailsimage = projectdetailsimage
    var projectheaders = []
    var ProjectName = $('#ProjectName').val().trim();
    var st = statusId == "8" ? 8 : statusId == "9" ? 9 : statusId == "11" ? 11 : 1;
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');

    $("#Reformulation_Table").each(function (i) {

        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Category: $(this).find('#Reformulation_Category option:selected').val(),
            Hub: $(this).find('#Reformulation_Hub').text().trim(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
            status: st,
        });
    });
    flag = true

    var projectdetails = [];
    var additionalreformulation = [];

    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val().trim(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val().trim(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val().trim(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val().trim(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val().trim(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val().trim(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val().trim(),
        Others: $("#AdditionalRequirmentsOthers").val().trim(),

    };
    var initiatorremarks = $("#editor").val().trim();
    //var flag = true;
    $('#ProjectName').val().trim() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();

    //productdescription == "" ? flag = false : flag = true
    if (flag) {
        $('div#SaveModal').modal('show');
        $("#ReformulationSavePopUp").click(function () {

            if (deletedImageNameList.length > 0) {

                $.each(deletedImageNameList, function (index, fileName) {

                    if (projectdetailsimage != "" && projectdetailsimage != null) {
                        $.ajax({
                            type: 'POST',
                            url: ROOT + "ProjectBrief/DeleteImageFile",
                            data: { fileName: fileName },
                            success: function (data) {

                                path = data;
                            }
                        });
                    }
                });
            }

            $("#ProjectHeaders").val(JSON.stringify(projectheaders));
            $("#reformulationProductDescription").val(JSON.stringify(productdescription));
            $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
            $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
            $("#reformulationPackagingProfile").val(JSON.stringify(reformulationpackagingprofilegrid));
            $("#reformulationBusinessInformation").val(JSON.stringify(reformulationbusinessinformation));
            $("#InitiatorRemarks").val(initiatorremarks);
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));

            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))


            var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
            $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
            $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))


            if (statusId == "8") {
                $('#ReformulationStatus').val(8);
            }
            if (statusId == "9") {
                $('#ReformulationStatus').val(9);
            }
            if (statusId == "11") {
                $('#ReformulationStatus').val(11);
            }

            $('#ReformulationEdit').submit();

            $('#ReformulationSavePopUp').prop("disabled", true);

        });
    }
}



$(".downloadReformulationPdf").click(function () {

    var fd = new FormData();
    var ProjectId = $("#ProjectId").val();
    var Status = $("#StatusId").val();
    $.ajax({
        url: ROOT + "ProjectBrief/Header",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectId: ProjectId, Type: "Reformulation" },
        success: function (result) {
            $('.Header').html(result);
            var htmlHeaderdata = $(".Header").html();
            fd.append('JsonHeaderString', htmlHeaderdata)
            $.ajax({
                url: ROOT + "ProjectBrief/PDFReformulation",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "Reformulation", Status: Status },
                success: function (result) {
                    $('.ReformulationDraft').html(result);
                    var htmldata = $(".ReformulationDraft").html();
                    fd.append('JsonString', htmldata)
                    $.ajax({
                        url: ROOT + 'ProjectBrief/GeneratePdfHtml',
                        type: 'POST',
                        dataType: 'HTML',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function () {
                            window.location = window.location.origin + ROOT + 'ProjectBrief/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "Reformulation"
                        }
                    })
                }
            })
        }
    })
});

function ReformulationHgmlReject() {

    $('#Reject_Button').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;
    var approvalStatus = [];
    var hgmlData = [];
    $('div#RejectModal').modal('show');

    $("#Reject_Button").click(function () {
        var rejectRemarks = $('#ReformulationRejectRemarks').val().trim();

        if (rejectRemarks === '') {
            $('#Error_RejectRemarks').show();
        }
        else
        {
            if (statusId == '2') {
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: statusName,
                    Action: "Send to " + statusList[6].StatusName,
                    ToStage: 7,
                    ToStageName: statusList[6].StatusName
                }];
            }
            if (statusId == '4') {
                approvalStatus = [{
                    FromStage: 4,
                    FromStageName: statusName,
                    Action: "Send to " + statusList[6].StatusName,
                    ToStage: 7,
                    ToStageName: statusList[6].StatusName
                }];
            }
            if (statusId == '13') {
                approvalStatus = [{
                    FromStage: 13,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Send to " + statusList[6].StatusName,
                    ToStage: 7,
                    ToStageName: statusList[6].StatusName
                }];
            }
            if (statusId == '14') {
                approvalStatus = [{
                    FromStage: 14,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Send to " + statusList[6].StatusName,
                    ToStage: 7,
                    ToStageName: statusList[6].StatusName
                }];
            }

            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#RejectRemarks').val(rejectRemarks);
            $('#ReformulationStatus').val(7);
            $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
            $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))

            document.getElementById('ReformulationEdit').submit();

            $('#Reject_Button').prop("disabled", true);
        }
        $('#ReformulationRejectRemarks').keyup(function () {
            if ($('#ReformulationRejectRemarks').val() != '') {
                $('#Error_RejectRemarks').hide();
            }
        });
    });

}

function ReformulationPMDUnderExplorationReject() {

    $('#Reject_Button').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;
    var approvalStatus = [];
    var hgmlData = [];
    $('div#RejectModal').modal('show');

    $("#Reject_Button").click(function () {
        var rejectRemarks = $('#ReformulationRejectRemarks').val().trim();

        if (rejectRemarks === '') {
            $('#Error_RejectRemarks').show();
        }
        else {
            if (statusId == 5) {
                approvalStatus = [{
                    FromStage: 5,
                    FromStageName: "Fine Screening Review",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
            }
            else if (statusId == 16) {
                approvalStatus = [{
                    FromStage: 16,
                    FromStageName: "Extended Fine Screening Review",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
            }

            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#RejectRemarks').val(rejectRemarks);
            $('#ReformulationStatus').val(7);
            $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
            $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))

            document.getElementById('ReformulationEdit').submit();

            $('#Reject_Button').prop("disabled", true);

        }
        $('#ReformulationRejectRemarks').keyup(function () {
            if ($('#ReformulationRejectRemarks').val() != '') {
                $('#Error_RejectRemarks').hide();
            }
        });
    });
}

function ReformulationHgmlSave() {

    $('#ReformulationSavePopUp').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;
    var hgmlData = [];
    var sendtohub = $('.HgmlDataSendToHubConfirmation').val();


    $('div#SaveModal').modal('show');

    $("#ReformulationSavePopUp").click(function () {


        if (statusId != '4' && statusId != '14') {

            if (sendtohub === 'Yes') {

                hgmlData = [{
                    Hub: $('#HgmlData_HubDropdown').val().toString(),
                    HubUsers: $('#HgmlData_HubUsersDropdown').val().toString(),
                    HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
                }]
            }
            else if (sendtohub === 'No') {
                hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
            }
        }

        $('#HgmlDataSendToHubConfirmation').val(sendtohub);

        $('#HgmlData').val(JSON.stringify(hgmlData));
        if (statusId == 2) {
            $('#ReformulationStatus').val(2);
        }
        if (statusId == 13) {
            $('#ReformulationStatus').val(13);
        }
        $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
        $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
        $('#ReformulationEdit').submit();

    });

    if (statusId == '4' || statusId == '14') {

        var hgmlData = [];

        $('div#SaveModal').modal('show');

        $("#ReformulationSavePopUp").click(function () {

            hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');


            $('#HgmlDataSendToHubConfirmation').val("No");
            $('#HgmlData').val(JSON.stringify(hgmlData));
            if (statusId == '4') {
                $('#ReformulationStatus').val(4);
            }
            if (statusId == '14') {
                $('#ReformulationStatus').val(14);
            }
            $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
            $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
            $('#ReformulationEdit').submit();

            $('#ReformulationSavePopUp').prop("disabled", true);
        });
    }
}

function ReformulationHgmlSendBack() {

    $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );

    var flag = true;
    var approvalStatus = [];
    var hgmlData = [];
    $('div#SendbackModal').modal('show');

    $("#Reformulation_SendBackToInitiator_Ok").click(function () {


        var sendBackToInitiatorRemarks = $('#PopUp_SendBackToInitiatorRemarks').val().trim();
        if (sendBackToInitiatorRemarks != '') {

            if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

                hgmlData = [{
                    Hub: $('#HgmlData_HubDropdown').val(),
                    HubUsers: $('#HgmlData_HubUsersDropdown').val(),
                    HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
                }]
            }
            else if ($('.HgmlDataSendToHubConfirmation').val() == 'No') {

                $('#HgmlDataSendToHubConfirmation').val("No")
                hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
            }

            if (statusId == '2') {
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: statusName,
                    Action: "Send Back to Initiator",
                    ToStage: 8,
                    ToStageName: "Sent Back to Initiator"
                }];
            }
            if (statusId == '13') {
                approvalStatus = [{
                    FromStage: 13,
                    FromStageName: 'Brief Demoted to HGML',
                    Action: "Send Back to Initiator",
                    ToStage: 8,
                    ToStageName: "Sent Back to Initiator"
                }];
            }


            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SendBackToInitiatorRemarks').val(sendBackToInitiatorRemarks);
            $('#ReformulationStatus').val(8);
            $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
            $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
            $('#ReformulationEdit').submit();
            $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", true);

        }
        else {

            $('#Error_SendBackRemarks').show();
        }

    });
}

$('#PopUp_SendBackToInitiatorRemarks').keyup(function () {
    $(this).val() === '' ? $('#Error_SendBackRemarks').show() : $('#Error_SendBackRemarks').hide();
});
$('.HgmlData_HubUsersDropdown').click(function () {
    $('#Error_HgmlDataHubUsersSelected').hide();
});

function ReformulationHgmlSendtoHub() {

    $('#ReformulationSendToHubReformulation').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;
    var approvalStatus = [];
    var hgmlData = [];

    YesNo = $('.HgmlDataSendToHubConfirmation').val();
    YesNo === "" ? ($('#Error_DoYouWantSentToHUB').show(), flag = false, /*$(window).scrollTop($('#Hgml_Data-Field').position().top))*/ document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })): $('#Error_DoYouWantSentToHUB').hide();


    if (YesNo == 'Yes') {
        flag = true;

        $('#HgmlData_HubDropdown').val() == '' ? ($('#Error_HgmlDataHub').show(), flag = false) : $('#Error_HgmlDataHub').hide();
        let len = $('#HgmlData_HubUsersDropdown').find('option:selected').length;
        len == 0 ? ($('#Error_HgmlDataHubUsersSelected').show(), flag = false) : "";
    }
    else {
        flag = false;
    }

    var hubSelected = $('#HgmlData_HubDropdown').find('option:selected').length;
    var hubUsersSelected = $('#HgmlData_HubUsersDropdown').find('option:selected').length;

    if (hubUsersSelected != 0 && (hubSelected != hubUsersSelected)) {
        flag = false;
        $('#Error_HgmlDataHubUsersSelected').show();
    }
    else {
        $('#Error_HgmlDataHubUsers').hide();
    }

    if (flag)
        $('div#SendhubModalReview').modal('show');

    $("#ReformulationSendToHubReformulation").click(function () {


        var sendToHubRemarks = $('#PopUp_SendToHubRemarks').val().trim();
        if (sendToHubRemarks === "") {
            $('#Error_SendToHub').show();
        }
        else {

            hgmlData = [{
                Hub: $('#HgmlData_HubDropdown').val().toString(),
                HubUsers: $('#HgmlData_HubUsersDropdown').val().toString(),
                HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
            }];

            if (statusId == '2') {
                approvalStatus = [{

                    FromStage: 2,
                    FromStageName: statusName,
                    Action: "Send to" + statusList[2].StatusName,
                    ToStage: 3,
                    ToStageName: statusList[2].StatusName
                }];
            }
            if (statusId == '13') {
                approvalStatus = [{

                    FromStage: 13,
                    FromStageName: 'Brief Demoted to HGML',
                    Action: "Send to" + statusList[2].StatusName,
                    ToStage: 3,
                    ToStageName: statusList[2].StatusName
                }];
            }

            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#HgmlDataSendToHubConfirmation').val(YesNo);
            $('#SendToHubRemarks').val(sendToHubRemarks);
            $('#ReformulationStatus').val(3);
            $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
            $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
            $('#ReformulationEdit').submit();

            $('#ReformulationSendToHubReformulation').prop("disabled", true);
        }
    });
}

function ReformulationSendToPMDForm() {

    $('#ReformulationSendToPMD').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;

    YesNo = $('.HgmlDataSendToHubConfirmation').val();
    YesNo === "" ? ($('#Error_DoYouWantSentToHUB').show(), flag = false, /*$(window).scrollTop($('#Hgml_Data-Field').position().top))*/ document.getElementById('Hgml_Data-Field').scrollIntoView({ behavior: 'smooth' })): $('#Error_DoYouWantSentToHUB').hide();

    var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

    if (YesNo == 'No') {

        flag = true;
        hgmlData.length === 0 ? ($('.Error_EmptyGrid').show(), flag = false) : $('.Error_EmptyGrid').hide();
    }
    else {
        flag = false;
    }

    if (flag) {

        $('div#SendToPmdModal').modal('show');

        $("#ReformulationSendToPMD").click(function () {
            var sendToPmdRemarks = $('#PopUp_SendToPmdRemarks').val().trim();

            if (sendToPmdRemarks != '') {

                if (statusId == '2') {
                    approvalStatus = [{
                        FromStage: 2,
                        FromStageName: statusName,
                        Action: "Send to " + statusList[4].StatusName,
                        ToStage: 5,
                        ToStageName: statusList[4].StatusName
                    }];
                }
                if (statusId == '13') {
                    approvalStatus = [{
                        FromStage: 13,
                        FromStageName: 'Brief Demoted to HGML',
                        Action: "Send to " + statusList[4].StatusName,
                        ToStage: 5,
                        ToStageName: statusList[4].StatusName
                    }];
                }

                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#HgmlDataSendToHubConfirmation').val(YesNo);
                $('#SendToHubRemarks').val(sendToPmdRemarks);
                $('#ReformulationStatus').val(5);
                $('#SendToPmdRemarks').val(sendToPmdRemarks)
                $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
                $('#ReformulationEdit').submit();
                $('#ReformulationSendToPMD').prop("disabled", true);

            }
            else {
                sendToPmdRemarks == '' ? $('#Error_Reformulation_PMDremarks').show() : $('#Error_Reformulation_PMDremarks').hide();
            }
        });
    }
}



function ReformulationSendToPMD() {

    $('#ReformulationSendToPMD').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;
    var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

    if (hgmlData.length === 0) {
        $('#err-hgml_data').show();
        //$(window).scrollTop($('#HgmlData_ApprovePage').position().top);
        document.getElementById('HgmlData_ApprovePage').scrollIntoView({ behavior: 'smooth' });

    } else {
        $('div#SendToPmdModal').modal('show');

        $("#ReformulationSendToPMD").click(function () {

            $("#PopUp_SendToPmdRemarks").keyup(function () {

                $("#PopUp_SendToPmdRemarks").val() == "" ? ($("#Error_Reformulation_PMDremarks").show(), flag = false) : ($("#Error_Reformulation_PMDremarks").hide(), flag = true);
            });
            $("#PopUp_SendToPmdRemarks").val().trim() == "" ? ($("#Error_Reformulation_PMDremarks").show(), flag = false) : ($("#Error_Reformulation_PMDremarks").hide(), flag = true);
            var sendToPmdRemarks = $('#PopUp_SendToPmdRemarks').val();
            if (flag) {
                if (statusId == "4") {
                    approvalStatus = [{
                        FromStage: 4,
                        FromStageName: statusName,
                        Action: "Send to " + statusList[4].StatusName,
                        ToStage: 5,
                        ToStageName: statusList[4].StatusName
                    }];
                }
                if (statusId == "14") {
                    approvalStatus = [{
                        FromStage: 14,
                        FromStageName: "Brief Demoted to HGML",
                        Action: "Send to Brief Demoted",
                        ToStage: 5,
                        ToStageName: statusList[4].StatusName
                    }];
                }
                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SendToPmdRemarks').val(sendToPmdRemarks);
                $('#ReformulationStatus').val(5);
                $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
                $('#ReformulationEdit').submit();
                $('#ReformulationSendToPMD').prop("disabled", true);
            }
        });
    }
}



function ReformulationHubSave() {

    $('#ReformulationSavePopUp').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var businessInformation = [];

    $('div#SaveModal').modal('show');

    $("#ReformulationSavePopUp").click(function () {

        businessInformationGridData = $("#business_info").jqGrid('getGridParam', 'data');


        $('#reformulationBusinessInformation').val(JSON.stringify(businessInformationGridData));
        $('#ReformulationStatus').val(3);
        $('#HubApprove').val(($('#HubApproveSelect :selected').val()));
        $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
        $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))

        var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
        $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
        $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))
        document.getElementById('ReformulationEdit').submit();
        $('#ReformulationSavePopUp').prop("disabled", true);

    });
}


function ReformulationHubToHgml() {

    $('#Reformulation_SendBackToHgml_Ok').prop("disabled", false);
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;
    var approvalStatus = [];
    var hgmlData = [];


    if ($('#HubApproveSelect :selected').text() == "Yes" || $('#HubApproveSelect :selected').text() == "No") {

        var val = $('#HubApproveSelect :selected').text();
        if ($('#HubApproveSelect :selected').text() == "Yes" && jQuery('#business_info').jqGrid('getGridParam', 'reccount') == 0) {

            $('#err-business_info').show();
            //$(window).scrollTop($('.BusinessInfo').position().top);
            document.getElementByClassName('BusinessInfo').scrollIntoView({ behavior: 'smooth' });
            flag = false;
        }
        if ($.trim($('#HgmlData_HUBParticipatingMarkets').val()) == "") {

            $('#Error_HgmlDataParticipatingMarketsApprovePage').show();
            flag = false;
        }
        if (flag) {

            $('div#SendHgmlModal').modal('show');

            $("#Reformulation_SendBackToHgml_Ok").click(function () {

                if ($('#PopUp_SendToHgml').val() == "") {
                    $('#Error_SendToHgml').show();
                }

                else {
                    var sendToHgmlRemarks = $('#PopUp_SendToHgml').val();

                    approvalStatus = [{
                        FromStage: 3,
                        FromStageName: statusName,
                        Action: "Send to " + statusList[3].StatusName,
                        ToStage: 4,
                        ToStageName: statusList[3].StatusName
                    }];


                    businessInformationGridData = $("#business_info").jqGrid('getGridParam', 'data');


                    $('#reformulationBusinessInformation').val(JSON.stringify(businessInformationGridData));
                    $('#HubApprove').val(($('#HubApproveSelect :selected').text()));
                    $('#HgmlData').val(JSON.stringify(hgmlData));
                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    $('#SendToHgmlRemarks').val(sendToHgmlRemarks);
                    $('#ReformulationStatus').val(4);
                    $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                    $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))

                    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                    $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                    $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                    $('#ReformulationEdit').submit();

                    $('#Reformulation_SendBackToHgml_Ok').prop("disabled", true);

                }
            });
        }

    }

    else {
        $('#Error_Reformulation_Hub').show();
        //$(window).scrollTop($('.Err_Reformulation_Hub').position().top);
        document.getElementByClass('Err_Reformulation_Hub').scrollIntoView({ behavior: 'smooth' });

    }


}

$('#PopUp_SendToHgml').keypress(function () {
    $(this).length == 0 ? $('#Error_SendToHgml').show() : $('#Error_SendToHgml').hide();
});
$('#HgmlData_HUBParticipatingMarkets').keypress(function () {
    $(this).length == 0 ? $('#Error_HgmlDataParticipatingMarketsApprovePage').show() : $('#Error_HgmlDataParticipatingMarketsApprovePage').hide();
});
function ReformulationSendBackSave() {
    var hgmlData = [];

    $('div#SaveModal').modal('show');

    $("#ReformulationSavePopUp").click(function () {

        var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
        var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
        //var reformulationpackagingprofilegrid = $('#expected').jqGrid('getGridParam', 'data');
        var reformulationpackagingprofilegrid = packagingProfileData_1.filter(row => row.length !== 0);
        var projectdetailsimage = ProjectDetailsImageFile();
        projectdetailsimage ? ProjectDetailsBenchMarkSampleImage : projectdetailsimage
        var projectheaders = []
        var ProjectName = $('#ProjectName').val().trim();
        $("#Reformulation_Table").each(function (i) {
            projectheaders.push({
                ProjectName: ProjectName,
                Division: $(this).find('#Division option:selected').val(),
                ProjectType: "2",
                Category: $(this).find('#Reformulation_Category option:selected').val(),
                Hub: $(this).find('#Reformulation_Hub').text().trim(),
                InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
                status: 1,
            });
        });
        flag = true

        projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show()) : flag = true;
        projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show()) : flag = true;

        var projectdetails = [];
        var additionalreformulation = [];

        projectdetails = {
            businessrational: $("#ProjectDetailsBusinessRational").val().trim(),
            benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val().trim(),
            benchmarksamplesimage: projectdetailsimage,
            desiredindications: $("#ProjectDetailsDesiredIndications").val().trim(),
            desireddosageform: $("#ProjectDetailsDesiredDosageForm").val().trim(),
        };
        additionalreformulation = {
            AdditionalFormulation: $("#AdditionalRequirementsTextBox").val().trim(),
            ShelfLife: $("#AdditionalRequirmentsShelfLife").val().trim(),
            FreeFrom: $("#AdditionalRequirmentsFreeFrom").val().trim(),
            Others: $("#AdditionalRequirmentsOthers").val().trim(),

        };
        var initiatorremarks = $("#editor").val().trim();
        $('#ProjectName').val().trim() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();

        if (flag) {
            $('div#SaveModal').modal('show');
            $("#SaveReformulation").click(function () {

                $("#ProjectHeaders").val(JSON.stringify(projectheaders));
                $("#reformulationProductDescription").val(JSON.stringify(productdescription));
                $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
                $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
                $("#reformulationPackagingProfile").val(JSON.stringify(reformulationpackagingprofilegrid));
                $("#reformulationBusinessInformation").val(JSON.stringify(reformulationbusinessinformation));
                $("#InitiatorRemarks").val(initiatorremarks);

                $('.ReformulationSubmit').submit();

            });
        }


        $('#HgmlData').val(JSON.stringify(hgmlData));
        $('#ReformulationStatus').val(8);
        $('#ReformulationEdit').submit();

    });

}


colModel = [
    {
        name: 'Action',
        resizable: true,
        width: 70,
        label: 'Action',
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="action_icons">
            <a onclick = onDeleteHubApproveData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fas fa-trash color-delete" title="Delete"></i></a>
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
    confirm("Are you sure you want to delete?", function () {

        $("#prd_desc1").jqGrid('delRowData', RowId);
        $("#prd_desc1").trigger('reloadGrid', [{ page: 1 }]);
    });
}
function HgmlApproveSendToHub() {

    var hubGridData = $('#prd_desc1').jqGrid('getGridParam', 'data');
    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    if (hubGridData.length != 0) {
        var hubData = $('#prd_desc1').jqGrid('getGridParam', 'data');

        if (statusId == "4") {
            approvalStatus = [{
                FromStage: 4,
                FromStageName: statusName,
                Action: "Send to " + statusList[2].StatusName,
                ToStage: 3,
                ToStageName: statusList[2].StatusName
            }];
        }
        if (statusId == "14") {
            approvalStatus = [{
                FromStage: 14,
                FromStageName: 'Brief Demoted to HGML',
                Action: "Send to " + statusList[2].StatusName,
                ToStage: 3,
                ToStageName: statusList[2].StatusName
            }];
        }

        var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
        $('#HgmlData').val(JSON.stringify(hgmlData));

        $('#JsonFormReformulationHgmlToHubData').val(JSON.stringify(hubData));
        $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
        $('#ReformulationStatus').val(3);
        $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
        $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
        $('#ReformulationEdit').submit();

    }
    else {
        $('#Error_HubGridData').show()
    }

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
        data: { projectId: ReformulationJQgrid.ReformulationTableData[0].ProjectId },
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

$('#sendHubHgmlApproveAddbBtn').click(function () {

    var isValid = true;

    var allData = $('#prd_desc1').jqGrid('getGridParam', 'data');
    var Hub = $("#HgmlData_HubDropdownApprove").val();
    var HubUsers = $("#HgmlData_HubUsersDropdownApprove").val();

    if (Hub === "None Selected" || HubUsers === "") {
        Hub === "None Selected" ? ($('#Error_HgmlDataHubApprove').show(), isValid = false) : $('#Error_HgmlDataHubApprove').hide();
        HubUsers === "" ? ($('#Error_HgmlDataHubUsersApprove').show(), isValid = false) : $('#Error_HgmlDataHubUsersApprove').hide();
    }

    $.each(allData, function (i, item) {
        if (item.HubUser == HubUsers) {
            $('#HubDupErr').show();
            isValid = false;
        }
        else {
            $('#HubDupErr').hide();
        }
    });


    if (isValid) {
        var remarks = $('#SendHubApproveRemarks').val().trim();
        var user = $('#HgmlData_HubUsersDropdownApprove option:selected').val();
        var hub = $('#HgmlData_HubDropdownApprove option:selected').text();

        if (user === undefined || hub === '') {

            hub === '' ? $('#Error_HgmlDataHubApprove').show() : $('#Error_HgmlDataHubApprove').hide()
            user === undefined ? $('#Error_HgmlDataHubUsersApprove').show() : $('#Error_HgmlDataHubUsersApprove').hide()
        }
        else {
            var gridDataHub = [];
            HubData = {
                HubName: hub,
                HubUser: user,
                Remarks: remarks,
            }
            if (ProductDescriptionEditRowId == 0) {
                gridDataHub.push(HubData);
                var PD1 = $("#prd_desc1").jqGrid('getGridParam', 'data');
                var PD2 = $.merge(PD1, gridDataHub);
                $("#prd_desc1").jqGrid('setGridParam', { data: PD2 });
                $("#prd_desc1").trigger('reloadGrid', [{ page: 0 }]);

            }
        }
    }

    $('#HgmlData_HubDropdownApprove').val("").multiselect('refresh');
    $('#HgmlData_HubUsersDropdownApprove').val("").multiselect('refresh');
    $('#SendHubApproveRemarks').val("");

});



if (statusId == '4') {

    $('#HubReviewStatus').show();
}

colmodels = [
    {
        name: 'Product',
        label: 'Product',
        width: 130,
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
        name: 'ExpectedGP',
        label: 'Expected GP % ',
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

    $("#Initiator_BusinessInformation_Popup").jqGrid({
        url: '',
        datatype: 'local',
        data: ReformulationJQgrid['ReformulationBusinessInformation'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_businessinfo_popup',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Initiator_BusinessInformation_Popup tbody tr");
            var objHeader = $("#Initiator_BusinessInformation_Popup tbody tr td");

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

if (statusId == '5') {
    $('.HubBusinessInfoLinks').show();
    $('.pmdhgmldataheader').show();
}

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

$('#TargetCost').on('cut copy paste', function (event) {
    event.preventDefault();
});

$("#HgmlData_HubUsersDropdown").change(function (e) {

    $('#Error_HgmlDataHubUsers1').hide();

    $('.HubUsersOption').find('input[type=checkbox]').prop("disabled", false);

    var selectList = $('#HgmlData_HubUsersDropdown').find('option:selected');

    $.each(selectList, function (i, obj1) {

        var val1 = obj1.value;
        var val2 = obj1.className;
        $(".HubUsersOption").each(function (i, obj2) {

            if ($(this).attr("class").replace(' multiselect-filter-hidden', '') == obj1.className && $(this).val() != obj1.value) {
                $(this).find('input[type=checkbox]').prop("disabled", true);
            }
        });
    });
});


//  To populate the HGML data hub and hub users dropdown after saving it 
$('.HgmlDataSendToHubConfirmation').val(JsonFormReformulationHgmlReviewData.HgmlDataList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HgmlDataList[0].DoYouWantSentToHub);

if (statusId == '2' || statusId == '13') {

    if ($('.HgmlDataSendToHubConfirmation').val() == 'Yes') {

        $('.HgmlData_HubDropdown').val(JsonFormReformulationHgmlReviewData.HgmlDataList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HgmlDataList[0].Hub)
        //$('#HgmlData_HubUsersDropdown').val(JsonFormReformulationHgmlReviewData.HgmlDataList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HgmlDataList[0].HubUsers).multiselect('refresh');
        $('.HgmlDataHgmlToHubRemarks').val(JsonFormReformulationHgmlReviewData.HgmlDataList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HgmlDataList[0].HgmlToHubRemarks)

        $("#HgmlData_SendToHub_Yes").show();
        $("#HgmlData_SendToHub_No").hide();
        $(".Button_SendToPmd").hide();

        $("#HGML_Data").jqGrid("clearGridData");
    }
    else if ($('.HgmlDataSendToHubConfirmation').val() == 'No') {

        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").show();
        $(".Button_SendToHub").hide();
        $('.hideHgmlGrid').show();
    }
    else {
        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").hide();
    }

}

function onlyNumbers(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }
    return true;
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


function onlyAlphabets(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;

    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        return true;
    }
    return false;
}


//SEND MAIL FUNCTION TO 
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
                //hubUserEmailList = '<option class="HubUserOption" selected value="">None Selected</option>'
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
    PmdReview_SelectedUsers == '' ? ($('#Error_PmdReview_SendMail_HubUser_Dropdown').text('Please select users'), flag = false) : $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('');

    if (flag) {
        downloaddocfile();
        $('#PmdReview_SendMail_Button').prop("disabled", true);
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
            /*  $("#PMDReviewDivision").val('').multiselect('rebuild');*/
            $("#PmdReview_SendMail_HubUser_Dropdown").val('').multiselect('rebuild');
            /*        $('#PmdReview_SendMail_Remarks').val('');*/
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
    var ProjectType = "Reformulation"
    var Status = $("#StatusId").val();

    $.ajax({
        url: ROOT + "ProjectBrief/PDFReformulation",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectId: ProjectId, Type: "Reformulation", Status: Status },
        success: function (result) {
            $('.ReformulationDraft').html(result);
            var htmldata = $(".ReformulationDraft").html();
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

                            //$(".modal-content").hide();
                            //location.reload();

                        }

                    })
                }
            })
        }
    })
}


//To Clear the Remarks area of every modal on close
$(window).on('hidden.bs.modal', function () {
    $('.closeModal').val("");
    $('#HgmlData_HubDropdownApprove').val("").multiselect('refresh');
    $('#HgmlData_HubUsersDropdownApprove').val("").multiselect('refresh');
    $('#PMDReviewDivision').val('').multiselect('rebuild')
    $('#PmdReview_SendMail_Remarks').val('');
    $('#PmdReview_SelectedUsers').val('');
    $('#Error_SendBackRemarks').hide();
    $('#Error_Reformulation_PMDUpdateRemarks').hide();
    $("#PmdReview_SendMail_HubUser_Dropdown").val('').multiselect('rebuild');
    $('#ShowManagerApprovalRemarks').val('');

    $('#DueDate').val('');
    $('#PopUp_SendToExpRemarks').val('');
    $('.errorUnderExp').hide();
    $('#Error_Daypicker').hide();
});


//TO SHOW THE BUSINESS INFO LINKS OF OTHER HUBS
if (statusId == "4" || statusId == "5" || statusId == "16" || statusId == "6" || statusId == "7" || statusId == "12" || statusId == '14') {


    $.each(JsonFormReformulationHubReviewData.HubBIList, function (i, obj) {

        var businesslinks = `<span class="hub_view" onclick="BI('${obj.HubName}')" value=""> ${obj.HubName} Business Information</span>`;

        $(".hub_align").append(businesslinks);
    });


}



//TO LOAD THE BUSINESS INFO OF OTHER HUBS IN POPUP GRID
function BI(hub) {
    $('#BI').modal('show');
    $('#HubbusinessInfoLabel').text(hub + ' Business Information')
    var businessInfo = [];
    $.each(JsonFormReformulationHubBusinessData.ReformulationHubBusinessInformation, function (j, obj) {

        var hubname = obj.FromHubId;
        if (hubname == hub) {
            businessInfo.push(obj);
        }
    });

    $("#Hub_business_info_view").jqGrid("clearGridData");
    $("#Hub_business_info_view").jqGrid('setGridParam', { data: businessInfo });
    $("#Hub_business_info_view").trigger('reloadGrid', [{ page: 1 }]);
}

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

    $("#Hub_business_info_view").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Hub_business_info_view tbody tr");
            var objHeader = $("#Hub_business_info_view tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
businessInfo = [];

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



$('#Division').change(function () {
    $(this).val() == "" ? $('#Error_Reformulation_Division').show() : $('#Error_Reformulation_Division').hide();
});
$('#Category').change(function () {
    $(this).val() == "" ? $('#Error_Reformulation_Category').show() : $('#Error_Reformulation_Category').hide();
});

$("#ProjectName").keyup(function () {
    $('#ProjectName').val().trim() == "" ? $("#Error-ProjectName").show() : $("#Error-ProjectName").hide();
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
    $("#Err-NAN-SP").hide()
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
    $(".UomErr").hide()
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



var useremails = "";


if (statusId === "2" || statusId == '13') {


    $(document).ready(function () {

        var selectedHubList = [];

        if (JsonFormReformulationHgmlReviewData.length != 0) {

            var selectedHubList = JsonFormReformulationHgmlReviewData.HgmlDataList.length === 0 ? [] : JsonFormReformulationHgmlReviewData.HgmlDataList[0].Hub.split(",");
            $('#HgmlData_HubDropdown').multiselect('refresh');
            $('#HgmlData_HubDropdown').val(selectedHubList).multiselect('rebuild');
            $('#HgmlData_HubDropdown').multiselect('rebuild');


            var selectedHubIds = $("#HgmlData_HubDropdown").val().toString();

            if (selectedHubIds != "") {


                $.ajax({
                    type: "POST",
                    url: ROOT + "Base/GetUserEmailBasedOnHub",
                    data: { hubIds: selectedHubIds },
                    dataType: "json",
                    success: function (UserEmailResult) {

                        if (UserEmailResult != null) {

                            let selectedHubUser = [];
                            selectedHubUser = JsonFormReformulationHgmlReviewData.HgmlDataList.length === 0 ? [] : JsonFormReformulationHgmlReviewData.HgmlDataList[0].HubUsers.split(",");

                            var userEmailOptionList = ''

                            $("option").remove(".HubUsersOption");

                            $.each(UserEmailResult, function (i, obj) {
                                //

                                let matchFound = false;
                                matchFound = selectedHubUser.includes(obj.HgmlDataHubUsersList)

                                if (matchFound) {
                                    //
                                    userEmailOptionList += '<option class="HubUsersOption ' + obj.Hub + '" value="' + obj.HgmlDataHubUsersList + '" selected>' + obj.Hub + ' - ' + obj.HgmlDataHubUsersList + '</option>'
                                }
                                else {
                                    userEmailOptionList += '<option class="HubUsersOption ' + obj.Hub + '" value="' + obj.HgmlDataHubUsersList + '" >' + obj.Hub + ' - ' + obj.HgmlDataHubUsersList + '</option>'
                                }
                            });
                            //
                            $("#HgmlData_HubUsersDropdown").html(userEmailOptionList);
                            //$("#HgmlData_HubUsersDropdown").multiselect('refresh'); //refresh the select here
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
    });

}

if (statusId === "1") {
    $('.PackgagingProfileHeader').hide();
}




//To hide all the hub remarks grid if the Send To Hub is bypassed
if (statusId == "4" || statusId == "5" || statusId == "16" || statusId == "6" || statusId == "12" || statusId == '14') {

    JsonFormReformulationHubReviewData.ProductDetailsHubRemarksList.length == 0 ? $('#productDetailsHubRemarksGrid').hide() : $('#productDetailsHubRemarksGrid').show();
    JsonFormReformulationHubReviewData.ProjectDetailsHubRemarksList.length == 0 ? $('#projectDetailsHubRemarksGrid').hide() : $('#projectDetailsHubRemarksGrid').show();
    JsonFormReformulationHubReviewData.FormulationProfileHubRemarksList.length == 0 ? $('#formulationDetailsHubRemarksGrid').hide() : $('#formulationDetailsHubRemarksGrid').show();
    JsonFormReformulationHubReviewData.BusinessInformationHubRemarksList.length == 0 ? $('#businessinfoHubRemarksGrid').hide() : $('#businessinfoHubRemarksGrid').show();
    JsonFormReformulationHubReviewData.PackagingProfileHubRemarksList.length == 0 ? $('.worksheet5').hide() : $('.worksheet5').show();
    JsonFormReformulationHubReviewData["HgmlApproveSustainabilityHubRemarks"].length == 0 ? $('.Sustainability_HubRemarks').hide() : $('.Sustainability_HubRemarks').show();
}



//CODE FOR VIEW MODE FOR ALL PAGES

if ($('#ViewStatus').val() == 'View') {


    $('.ViewModeButton,.ViewModeField').hide();
    $('.ViewMode').attr('readonly', true);
    $('.imageHideForView').hide();
    $('#delete_icon_Benchmark_Samples_Image').hide();
   // $('#statusHeader').text("Reformulation - " + statusName);

    if (statusId == "2" || statusId == '13') {
        $('.InitiatorRemarks').show();
        $('.approveHgmlData').hide();
        $('.worksheet5').hide();
    }

    if (statusId == "8" || statusId == "11") {
        $('.saveReformulation').hide();
        $('.ReformulationSubmit').hide();
        $('#PackagingProfile').hide();

        $('.BusinessInfo .row').hide();
        $('#prd_desc,#business_info,#expected').jqGrid('hideCol', 'Action');
        $('#Division,#Category_Reformulation').attr('disabled', true);
    }

    if (statusId == "3" && $('#Role').val() != 'HGML Team') {
        $('.BusinessInfo,.worksheet5').hide();
        $('#ReformulationCancel').show();
        $('.hubmarkets').show();
        $('#HubApproveSelect').attr('disabled', true);
    }
    if (statusId == "3") {
        $('.HubReview').hide();
        $('.hubReviewCancelBtn').show();
        $(".forDrafrStage").hide();
    }
    if (statusId == "4" || statusId == '14') {
        $('#HgmlData_ApprovePage').hide();
        $('.hideHgmlGrid,.approveHgmlData').hide();
        $('.hubmarkets').show();
    }
    if (statusId == "5" || statusId == "16") {

        $('.ViewModeField').show();
        $('.pmddata').hide();
        $('.hubmarkets').show();
    }

    if (statusId == "6" || statusId == "12") {

        $('.approveHgmlData').show();
        $('.SentToHubYesOrNo').hide();
        $('.hubmarkets').show();
    }

    if (ProjectDetailsBenchMarkSampleImage == "") {
        $('.benchmarksampleimage').hide();
    }

}

if (statusId == 3 && $('#ViewStatus').val() == 'View' && $('#Role').val() == "HGML Team") {


    $('#productDetailsHubRemarksGrid').show();
    $('#projectDetailsHubRemarksGrid').show();
    $('#formulationDetailsHubRemarksGrid').show();
    $('.HubBusinessInfoLinks').show();
    $('#businessinfoHubRemarksGrid').show();
    $('#packagingprofileHubRemarksGrid,#HubReviewStatus').show();
    $('.BusinessInfo,.hubHidden').hide();

    JsonFormReformulationHubReviewData.ProductDetailsHubRemarksList.length == 0 ? $('#productDetailsHubRemarksGrid').hide() : $('#productDetailsHubRemarksGrid').show();
    JsonFormReformulationHubReviewData.ProjectDetailsHubRemarksList.length == 0 ? $('#projectDetailsHubRemarksGrid').hide() : $('#projectDetailsHubRemarksGrid').show();
    JsonFormReformulationHubReviewData.FormulationProfileHubRemarksList.length == 0 ? $('#formulationDetailsHubRemarksGrid').hide() : $('#formulationDetailsHubRemarksGrid').show();
    JsonFormReformulationHubReviewData.BusinessInformationHubRemarksList.length == 0 ? $('#businessinfoHubRemarksGrid').hide() : $('#businessinfoHubRemarksGrid').show();
    JsonFormReformulationHubReviewData.PackagingProfileHubRemarksList.length == 0 ? $('.worksheet5').hide() : $('.worksheet5').show();

    $('.worksheet5,.hubstatus').show();

    var divTag = "";

    $.each(JsonFormReformulationHubReviewData.HubApprovalStatusList, function (i, obj) {

        if (obj.IsHubApproved == "Yes") {
            divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control green hubStatusValue mt-2" value = "Yes" readonly > </div>';
        }
        if (obj.IsHubApproved == "No") {
            divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control red hubStatusValue mt-2" value = "No" readonly > </div>';
        }
        if (obj.IsHubApproved == "Yet to Confirm") {
            divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control orange hubStatusValue mt-2" value = "Yet to Confirm" readonly > </div>';
        }

    })
    $('#HubReviewStatus').html(divTag).css('padding-bottom', '5vh');

    colmodels1 = [

        {
            name: 'HubName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'ProductDetailsHubRemark',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },

    ],

        $("#worksheet1").jqGrid({
            url: '',
            datatype: 'local',
            data: JsonFormReformulationHubReviewData.ProductDetailsHubRemarksList,
            mtype: 'GET',
            colModel: colmodels1,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_worksheet1',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#worksheet1 tbody tr");
                var objHeader = $("#worksheet1 tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });


    //GRID FOR Hub Remarks for Project Details
    colmodels2 = [

        {
            name: 'HubName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'ProjectDetailsHubRemark',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },

    ],

        $("#worksheet2").jqGrid({
            url: '',
            datatype: 'local',
            data: JsonFormReformulationHubReviewData.ProjectDetailsHubRemarksList,
            mtype: 'GET',
            colModel: colmodels2,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_worksheet2',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#worksheet2 tbody tr");
                var objHeader = $("#worksheet2 tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });



    //GRID FOR Hub Remarks for Additional Formulation Details
    colmodels3 = [

        {
            name: 'HubName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'FormulationProfileHubRemark',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },



    ],

        $("#worksheet3").jqGrid({
            url: '',
            datatype: 'local',
            data: JsonFormReformulationHubReviewData.FormulationProfileHubRemarksList,
            mtype: 'GET',
            colModel: colmodels3,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_worksheet3',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#worksheet3 tbody tr");
                var objHeader = $("#worksheet3 tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });



    //GRID FOR Hub Remarks for Business Info Details
    colmodels4 = [

        {
            name: 'HubName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'BusinessInformationHubRemark',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },

    ],

        $("#worksheet4").jqGrid({
            url: '',
            datatype: 'local',
            data: JsonFormReformulationHubReviewData.BusinessInformationHubRemarksList,
            mtype: 'GET',
            colModel: colmodels4,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_worksheet4',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#worksheet4 tbody tr");
                var objHeader = $("#worksheet4 tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }

                }

            }
        });



    //GRID FOR Hub Remarks for Packaging Profile Details
    colmodels5 = [

        {
            name: 'HubName',
            label: 'HUB Name',
            resizable: true,
            width: 300,
            ignoreCase: true,
        },
        {
            name: 'PackagingProfileHubRemark',
            label: 'Remarks',
            resizable: true,
            width: 700,
            ignoreCase: true,
        },



    ],

        $("#worksheet5").jqGrid({
            url: '',
            datatype: 'local',
            data: JsonFormReformulationHubReviewData.PackagingProfileHubRemarksList,
            mtype: 'GET',
            colModel: colmodels5,
            loadonce: true,
            viewrecords: true,
            pager: '#pager_worksheet5',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#worksheet5 tbody tr");
                var objHeader = $("#worksheet5 tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
}


if (statusId == "4" || statusId == '14') {
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
            name: 'HgmlOrHubDataRemarks',
            label: 'Remarks',
            resizable: true,
            ignoreCase: true
        },

    ];

    var PM_List = JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList
    var RowIdHGML = 0;
    var EditRowIdHGML = 0;
    var isvalid = true;
    $("#HUB_ParticipatingMarkets").jqGrid({
        url: '',
        datatype: 'local',
        data: JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#HUB_PartcipatingMarkets tbody tr");
            var objHeader = $("#HUB_PartcipatingMarkets tbody tr td");

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
}

if (statusId != "1" && statusId != "8" && statusId != "9" && statusId != "11") {
    packagingProfileData_1 = ReformulationJQgrid['ReformulationPackagingProfile'];

    var reformulationPackagingProfileGrid = packagingProfileData_1.filter(row => row.length !== 0);
    reformulationPackagingProfileGrid.length == 0 ? ($('#PackagingProfileGrid').hide(), $('.packProfileRemarks').hide()) : $('#PackagingProfileGrid').show();
}


var formData = new FormData();
function fileBenchValidation() {
    
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


if (statusId == "7" && PackagingProfile.length > 0) {
    $('#PackagingProfile').show();
}
$('#PackagingProfileGrid').show();


colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="action_icons">' +
                '<a onclick=onEditTargetCost(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-edit color-info mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeleteTargetCost(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fas fa-trash color-delete" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
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
        name: 'Currency',
        label: '',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TargetCost',
        label: 'Accepted Target Cost',
        width: 130,
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
    datatype: 'local',
    data: JsonFormReformulationPmdReviewData == undefined ? [] : JsonFormReformulationPmdReviewData.TargetCostDataList,
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_HGML',
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

        if ($('#ViewStatus').val() == 'View') {
            jQuery("#TargetCost_Grid").jqGrid('hideCol', "Action");
        }

    }
});

$("#Preview_TargetCost_Grid").jqGrid({
    url: '',
    datatype: 'local',
    data: [] ,
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#Preview_pager_HGML',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#Preview_TargetCost_Grid tbody tr");
        var objHeader = $("#Preview_TargetCost_Grid tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#Preview_TargetCost_Grid").jqGrid('hideCol', "Action");

    }
});



var isEditTC = false;
var EditRowId2 = 0;
//To Add Target Cost
function AddTargetCost() {

    var productName = $("#TargetCostProductName").val();
    var prodSku = $("#TargetCostSKU").val() == "--Select--" ? "" : $("#TargetCostSKU").val();
    var Targetcost = $.trim($("#TargetCost").val());
    var Currency = $.trim($("#TargetCostCurrency").val());
    //  var TargetCost = $.trim($("#TargetCost").val());
    var Remarks = $.trim($("#TargetCostRemarks").val());
    var flag2 = true;

    if (productName == "" || prodSku == "") {
        flag2 = false;
        productName == "" ? $(".Error_ProdName").show() : $(".Error_ProdName").hide();
        prodSku == "" ? $("#Error_ProdSKU").show() : $("#Error_ProdSKU").hide();
        //Currency == "" ? $(".Err-TCCurrency").show() : $(".Err-TCCurrency").hide();
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
        }
        else {


            $("#TargetCost_Grid").jqGrid('setRowData', EditRowId2, TCData);
            $("#TargetCost_Grid").trigger('reloadGrid', [{ page: 1 }]);

            EditRowId2 = 0;
        }
        $(".TCdata").val("");
        $('#TargetCostSKU .skuOption').remove();
        $('#TargetCostSKU .ProductOption').remove();
        $('#TargetCostSKU .Options').remove();
        $('#TargetCostSKU').prop('selectedIndex', 0);
        $('#TargertCostAdd').prop('disabled', false);
        isEditTC = false;
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
    var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].ExistingName == $("#TargetCostProductName").val()) {
            var sku = gridData[i].SKU;
            var skuList = sku.split(',');
            var skuOption = "";
            $.each(skuList, function (i, obj) {
                if (obj != "" || obj != null || obj != undefined) {
                    skuOption += '<option class="options" value="' + obj + '">' + obj + '</option>';
                }
            });
            // $('#PackagingProfileSKU').append(skuOption); // append the new options to the dropdown
            $("#TargetCostSKU").append(skuOption);
            break;
        }
    }

    $("#TargetCostSKU").val(DataFromTheRow.SKU);
    $("#TargetCost").val(DataFromTheRow.TargetCost);
    $("#TargetCostCurrency").val(DataFromTheRow.Currency);
    $("#TargetCostRemarks").val(DataFromTheRow.TargetCostRemarks);

}


function onDeleteTargetCost(RowIdTargetCost, flag = 0) {

    if (flag === 1) {

        $("#TargetCost_Grid").jqGrid('delRowData', RowIdTargetCost);
        $("#TargetCost_Grid").trigger('reloadGrid', [{ page: 1 }]);
    }
    else {

        confirm("Are you sure you want to delete?", function () {
            $("#TargetCost_Grid").jqGrid('delRowData', RowIdTargetCost);
            $("#TargetCost_Grid").trigger('reloadGrid', [{ page: 1 }]);

            EditRowId2 = 0;
            RowIdTargetCost = 0;

            $(".TCdata").val("");
            $('#TargetCostSKU .skuOption').remove();
            $('#TargetCostSKU .ProductOption').remove();
            $('#TargetCostSKU .Options').remove();
            $('#TargetCostSKU').prop('selectedIndex', 0);

        });
    }


}



$("#TargetCostProductName").change(function () {

    $('#TargetCostSKU').empty();
    $('#TargetCostSKU').append('<option>--Select--</option>')
    var productName = $(this).val();


    if (productName != "") {

        var gridData = $("#prd_desc").jqGrid('getGridParam', 'data');
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].ExistingName == productName) {
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

if ((statusId == "8" || statusId == "11") && $('#ViewStatus').val() != 'View') {
    $('#Division,#Category_Reformulation,#ProjectName').attr('disabled', false);
}

if (statusId == "4" && $('#ViewStatus').val() != 'View') {
    $('.approveHgmlData').hide();
}
if (statusId == "4" && $('#ViewStatus').val() == 'View') {
    $('.approveHgmlData,.hgmldatagrid').show();

}



if (statusId == '3') {
    $('#HubApproveSelect').val(hubApprove)
}

if (statusId == '2') {
    $('#HgmlData_HubUsersDropdown').val(JsonFormReformulationHgmlReviewData.HgmlDataList.length == 0 ? "" : JsonFormReformulationHgmlReviewData.HgmlDataList[0].HubUsers);
    $('#HgmlData_HubUsersDropdown').multiselect('refresh');
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

function onlyNumbers(evt) {

    var e = event || evt;
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

var deletedImageNameList = [];

function onDeleteImage(gridId, imageName, rowId) {

    if (gridId == "expected") {

        confirm("Are you sure you want to delete image?", function () {

            var dataFromTheRow = jQuery('#expected').jqGrid('getRowData', rowId);

            PackagingProfile = {
                Product: dataFromTheRow.Product,
                SKU: dataFromTheRow.SKU,
                PrimaryPackaging: dataFromTheRow.PrimaryPackaging,
                SecondaryPackaging: dataFromTheRow.SecondaryPackaging,
                TertiaryPackaging: dataFromTheRow.TertiaryPackaging,
                BenchmarkProducts: dataFromTheRow.BenchmarkProducts,
                DesiredPackagingCharacters: dataFromTheRow.DesiredPackagingCharacters,
                Others: dataFromTheRow.Others,
                Mould: dataFromTheRow.Mould,
                PackagingProfileImage: ""
            };

            deletedImageNameList.push(dataFromTheRow.PackagingProfileImage);

            $("#expected").jqGrid('setRowData', rowId, PackagingProfile);
            $("#expected").trigger('reloadGrid', [{ page: 1 }]);
        });
    }
    else {

        confirm("Are you sure you want to delete image?", function () {

            var fileName = "";
            if ($.trim($('#ImageName').text()) != "") {
                fileName = $.trim($('#ImageName').text())
            }
            else if ($('#ProjectDetailsBenchMarkSampleImage').val() != "") {
                fileName = $('#ProjectDetailsBenchMarkSampleImage').val();
            }

            fileName = fileName.replace(/"/g, '')

            if (fileName != '') {

                deletedImageNameList.push(fileName);
                $('#ProjectDetailsBenchMarkSampleImage').val('');
                $('#BenchMarkSampleImage').val('');
                $('#ImageName').text('');
                ProjectDetailsBenchMarkSampleImage = '';
                $('#delete_icon_Benchmark_Samples_Image').hide();
            }
        });
    }
}

if (statusId != '1' && statusId != '8' && statusId != '11') {
    $('#ProjectDetailsBenchMarkSampleImage').prop('disabled', true);
    $('#delete_icon_Benchmark_Samples_Image').hide();
}


//If status is Draft or Sent Back to Initiator
if (statusId == '1' || statusId == '8' || statusId == '9' || statusId == "11") {

    $('.NotInRefDraft').hide();
}

//If status is HGML Review
if (statusId == '2' || statusId == '13') {

    if (JsonFormReformulationHgmlReviewData != undefined) {

        $('#SUS_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList.length > 0 ? JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark : '');
    }

    $('.NotInRefHgmlReview').hide();
}

//If status is HUB Review
if (statusId == '3') {

    $('.NotInRefHubReview').hide();
    $('.hubstatus').hide();

    $('#SUS_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList.length > 0 ? JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark : '');

    if ($('#ViewStatus').val() != 'View') {

        $('#SUS_HUB_Remarks').val(JsonFormReformulationHubReviewData.SustainabilityHubRemarksList.length == 0 ? "" : JsonFormReformulationHubReviewData.SustainabilityHubRemarksList[0].SustainabilityHubRemark);
    }

    if ($('#ViewStatus').val() == 'View') {

        $('.Sustainability_HubRemarks').show();
        $('.SUS_HUB_Remarks').hide();

        $('#productDetailsHubRemarksGrid').show();
        $('#projectDetailsHubRemarksGrid').show();
        $('#formulationDetailsHubRemarksGrid').show();
        $('.HubBusinessInfoLinks').show();
        $('#businessinfoHubRemarksGrid').show();
        $('.PackagingProfile_HubRemarks').show();
        $('.HgmlOrHubDataSection').hide();
        $('.hubReviewStatus').hide();


        //GRID FOR Hub Remarks for Product Details
        colmodels1 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'ProductDetailsHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet1").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.ProductDetailsHubRemarksList,
                mtype: 'GET',
                colModel: colmodels1,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet1',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet1 tbody tr");
                    var objHeader = $("#worksheet1 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });


        //GRID FOR Hub Remarks for Project Details
        colmodels2 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'ProjectDetailsHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet2").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.ProjectDetailsHubRemarksList,
                mtype: 'GET',
                colModel: colmodels2,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet2',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet2 tbody tr");
                    var objHeader = $("#worksheet2 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });



        //GRID FOR Hub Remarks for Additional Formulation Details
        colmodels3 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'FormulationProfileHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },



        ],

            $("#worksheet3").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.FormulationProfileHubRemarksList,
                mtype: 'GET',
                colModel: colmodels3,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet3',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet3 tbody tr");
                    var objHeader = $("#worksheet3 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });



        //GRID FOR Hub Remarks for Business Info Details
        colmodels4 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'BusinessInformationHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },

        ],

            $("#worksheet4").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.BusinessInformationHubRemarksList,
                mtype: 'GET',
                colModel: colmodels4,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet4',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet4 tbody tr");
                    var objHeader = $("#worksheet4 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }

                    }

                }
            });



        //GRID FOR Hub Remarks for Packaging Profile Details
        colmodels5 = [

            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 300,
                ignoreCase: true,
            },
            {
                name: 'PackagingProfileHubRemark',
                label: 'Remarks',
                resizable: true,
                width: 700,
                ignoreCase: true,
            },



        ],

            $("#worksheet5").jqGrid({
                url: '',
                datatype: 'local',
                data: JsonFormReformulationHubReviewData.PackagingProfileHubRemarksList,
                mtype: 'GET',
                colModel: colmodels5,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_worksheet5',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#worksheet5 tbody tr");
                    var objHeader = $("#worksheet5 tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }

                }
            });


        $('.hubstatus').show();
        $('#HubReviewStatus').show();
        var divTag = "";

        $.each(JsonFormReformulationHubReviewData.HubApprovalStatusList, function (i, obj) {

            if (obj.IsHubApproved == "Yes") {
                divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control green hubStatusValue mt-2" value = "Yes" readonly > </div>';
            }
            if (obj.IsHubApproved == "No") {
                divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control red hubStatusValue mt-2" value = "No" readonly > </div>';
            }
            if (obj.IsHubApproved == "Yet to Confirm") {
                divTag += '<div class="col-1"> <label class= "col-form-label mt-2">' + obj.HubName + '</label></div>  <div class="col-2 "> <input type = "text" class= "form-control orange hubStatusValue mt-2" value = "Yet to Confirm" readonly > </div>';
            }

        })
        $('#HubReviewStatus').html(divTag).css('padding-bottom', '5vh');



        //Participating Market Grid
        $('.hubmarkets').show();

        var PM_List = JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList
        var RowIdHGML = 0;
        var EditRowIdHGML = 0;
        var isvalid = true;
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
                name: 'HgmlOrHubDataRemarks',
                label: 'Remarks',
                resizable: true,
                ignoreCase: true
            },

        ],

            $("#HUB_ParticipatingMarkets").jqGrid({
                datatype: 'local',
                url: '',
                data: JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList.length >= 0 ? JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList : [],
                mtype: 'GET',
                colModel: colmodels,
                loadonce: true,
                viewrecords: true,
                rowNum: 20,
                scroll: true,
                gridComplete: function () {

                    var objRows = $("#HUB_PartcipatingMarkets tbody tr");
                    var objHeader = $("#HUB_PartcipatingMarkets tbody tr td");

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


        //HUB Business Information

        $('.init_businessInfo').hide();

        $.each(JsonFormReformulationHubReviewData.HubBIList, function (i, obj) {

            var businesslinks = `<span class="hub_view" onclick="BI('${obj.HubName}')" value=""> ${obj.HubName} Business Information</span>`;

            $(".hub_align").append(businesslinks);
        });

        $("#business_info").jqGrid("clearGridData");
        $("#business_info").jqGrid('setGridParam', { data: ReformulationJQgrid['ReformulationBusinessInformation'] });
        $("#business_info").trigger('reloadGrid', [{ page: 1 }]);
    }

    $("#SUS_HGML_Remarks").prop("readonly", true);
}



//If status is HGML Approve
if (statusId == '4' || statusId == '14') {

    $('#SUS_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList.length > 0 ? JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark : '');

    $('.NotInRefHgmlApprove').hide();
}

//If status is Fine Screening Review (PMD Review)
if (statusId == '5' || statusId == '16' || statusId == '6' || statusId == '12') {

    $('#SUS_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList.length > 0 ? JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark : '');

    $('#SUS_PMD_Remarks').val(JsonFormReformulationPmdReviewData.SustainabilityPmdRemarksList.length == 0 ? "" : JsonFormReformulationPmdReviewData.SustainabilityPmdRemarksList[0].SustainabilityPmdRemark);

    $("#SUS_HGML_Remarks").prop("readonly", true);

    $('.NotInRefPmdReview').hide();

    if ($('#ViewStatus').val() == 'View') {

        $('.pmdDataSection').show();
        $('.pmdDataFields').hide();
        $('.pmdDataGrid').show();

        $('.targetCostSection').show();
        $('.targetCostFields').hide();
        $('.targetCostGrid').show();
    };
}

//If status is Approved or Rejected
if (statusId == '6' || statusId == '7' || statusId == '12') {

    // $('.NotInRefApproved').hide();
    if (statusId == '7') {
        $("#SUS_HGML_Remarks, #SUS_HUB_Remarks, #SUS_PMD_Remarks").prop("readonly", true);
    }
    if (statusId == '6' || statusId == '12') {
        $("#SUS_HGML_Remarks, #SUS_HUB_Remarks").prop("readonly", true);
    }

    $('#SUS_HGML_Remarks').val(JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList.length > 0 ? JsonFormReformulationHgmlReviewData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark : '');
    //    $('#SUS_PMD_Remarks').val(JsonFormReformulationPmdReviewData.SustainabilityPmdRemarksList.length == 0 ? "" : JsonFormReformulationPmdReviewData.SustainabilityPmdRemarksList[0].SustainabilityPmdRemark);
}

//If status is Sent Back to Initiator
if (statusId == '8') {

    // $('.').hide();
}

if ($('#ViewStatus').val() == 'View') {

    $("#SUS_HGML_Remarks, #SUS_HUB_Remarks, #SUS_PMD_Remarks").prop("readonly", true);
    $('.NotInRefViewPage').hide();
}


if (ReformulationJQgrid['ReformulationPackagingProfile'].length > 0) {
    packagingProfileData_1 = ReformulationJQgrid['ReformulationPackagingProfile'];
    if (packagingProfileData_1.length > 0) {
        var htmlTag = ""
        ppRowId = packagingProfileData_1.length - 1;

        $.each(packagingProfileData_1, function (i, obj) {

            htmlTag += ` 
            <table class ="mt-2" id="PP_Table_`+ (i) + `" style="width:100%">
            <thead>
                <tr>
                    <th colspan="2">
                        <b>Product : </b><span>
                        <span>`+ obj.Product + `</span>
                    </th>
                    <th style="width:25%">
                        <b>SKU : </b><span>
                        <span>`+ obj.SKU + `</span>
                    </th>
                    <th>
                        <span>
                           <div class="action_icons justify-center_1">
                                <a class="btn-icon -edit Edittable"><i onclick="onEditPackagingProfile(`+ i + `)" class="fas fa-edit color-info " title="Edit"></i></a>
                                <a class="btn-icon -delete deletetable ppDeleteHide"><i onclick="onDeletePackagingProfile(`+ i + `,'#PP_Table_` + i + `',0)" class="fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                ${obj.PackagingProfileImage !== '' && obj.PackagingProfileImage !== null ? `
                                <a class="btn-icon -info imagesinfo" title="Images info" onclick="ShowImages(`+ i + `)" id="` + i + `"><i class="fas fa-images" data-bs-toggle="modal" title="Images"></i></a>`: ''}
                            </div>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="width:25%;">
                        <span class="remarkss"><b>Primary Packaging : </b> <span class="remarks_Show show_primarypack list_icon" style="display:none"><i class="fas fa-list color-list"></i></span></span>
                        <span>`+ obj.PrimaryPackaging + `</span>
                    </td>
                    <td style="width:25%;">
                    <span class="remarkss">
                        <b> Secondary Packaging: </b><span class="remarks_Show show_secondarypack list_icon" style="display:none"><i class="fas fa-list color-list"></i></span></span><span>`+ obj.SecondaryPackaging + `</span>
                    </td>
                    <td>
                         <span class="remarkss">
                 <b> Tertiary Packaging: </b><span class="remarks_Show show_tertiarypack list_icon" style="display:none"><i class="fas fa-list color-list"></i></span></span>
                 </span>
                        <span>`+ obj.TertiaryPackaging + `</span>
                    </td>
                    <td>
                 <span class="remarkss">
                 <b>Benchmark Products : </b><span class="remarks_Show show_benchmark list_icon" style="display:none"><i class="fas fa-list color-list"></i></span></span>
                 </span>                        <span>`+ obj.BenchmarkProducts + `</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                     <span class="remarkss">
                 <b>Desired Packaging Characteristics </b><span class="remarks_Show show_desiredpack list_icon" style="display:none"><i class="fas fa-list color-list"></i></span></span>
                 </span><span>`+ obj.DesiredPackagingCharacters + `</span>
                    </td>
                    <td>
                        <span class="remarkss">
                 <b> Others if(any): </b><span class="remarks_Show show_others list_icon" style="display:none"><i class="fas fa-list color-list"></i></span></span>
                 </span>                        <span>`+ obj.Others + `</span>
                    </td>
                    <td>
                    <span class="remarkss">
                 <b>Mold :</b><span class="remarks_Show show_mold list_icon" style="display:none"><i class="fas fa-list color-list"></i></span>
                 </span>                        <span>`+ obj.Mould + `</span>
                    </td>
                </tr>
            </tbody>
        </table>
        
            `;

            var id = i;
            if (obj.PackagingProfileImage !== '' && obj.PackagingProfileImage !== null) {

                var PackagingProfileImage = obj.PackagingProfileImage.split(',');
                $.each(PackagingProfileImage, function (i, j) {
                    var imagedata = {}
                    imagedata = {
                        TableClass: id,
                        Image: PackagingProfileImage[i],
                    }
                    imageGrid.push(imagedata);
                });
            }
        });
        $('#Packaging_Profile_Table').append(htmlTag);
        if (statusId > 1 && statusId != 8 && statusId != 11) {
            $('.remarks_Show').attr("title", "Remarks List")
            $('.remarks_Show').show();
            $('.deletetable').hide();
            $('.Edittable').hide();
        }
    }

}
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="action_icons">
            <a onclick=onEditSustainability(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fas fa-edit color-info mr-2" title="Edit"></i></a>
            <a onclick=onDeleteSustainability(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fas fa-trash color-delete"  title="Delete"></i></a>
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
        data: ReformulationJQgrid['Sustainability'],
        //data: [],
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

            //If the status is HGML Review or HUB Review or HGML Approve or Fine Screening Review (PMD Review) or Approved or Rejected
            if (statusId == '2' || statusId == '13' || statusId == '3' || statusId == '4' || statusId == '14' || statusId == '5' || statusId == '16' || statusId == '6' || statusId == '12' || statusId == '7' || $('#ViewStatus').val() == 'View') {

                jQuery("#Table_Sustainability").jqGrid('hideCol', "Action");
            }
        }
    });

$("#preview_Table_Sustainability").jqGrid({
    height: 'auto',
    rowNum: 10000000,
    mtype: 'GET',
    url: '',
    datatype: 'local',
    data: [],
    loadonce: true,
    colModel: colmodels,
    pager: "#preview_pager_Table_Sustainability",
    viewrecords: true,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#preview_Table_Sustainability tbody tr");
        var objHeader = $("#preview_Table_Sustainability tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }

        jQuery("#preview_Table_Sustainability").jqGrid('hideCol', "Action");
    }
});


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

        productPositioningProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingName");
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



//HUB remarks grid for Sustainability section

colmodels = [

    {
        name: 'HubName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },
],

    $("#Sustainability_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        //data:  [] ,
        //data: JsonFormReformulationHubReviewData == undefined ? [] : JsonFormReformulationHubReviewData["HgmlApproveSustainabilityHubRemarks"],
        data: (JsonFormReformulationHubReviewData == null || JsonFormReformulationHubReviewData == 'undefined') ? [] : JsonFormReformulationHubReviewData["HgmlApproveSustainabilityHubRemarks"],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Sustainability_Remarks',
        rowNum: 1000000,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Sustainability_Remarks tbody tr");
            var objHeader = $("#Sustainability_Remarks tbody tr td");

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


$('#PrototypeSubmissionDate,#TTDCompletionDate,#ProductionDate').on('click', function (e) {
    e.preventDefault();
    $(this).attr("autocomplete", "off");
});



if ($('#ViewStatus').val() == 'View') {


    if (statusId == '2') {
        $('.InitiatorRemarks').hide();
       
    }

    $('.hubReviewButtonsList').show();
    $('.saveReformulation').hide();
    $('.ReformulationSubmit').hide();

    if (statusId == '4' || statusId == '6' || statusId == '7' || statusId == '2' || statusId == '5' || statusId == '14') {
        $('.hubReviewButtonsList').hide();
    }
}

//On deleting the Sustainability row data

function onDeleteSustainability(deleteRowId) {


    var dataFromTheRow = jQuery('#Table_Sustainability').jqGrid('getRowData', deleteRowId);

    confirm("Are you sure you want to delete?", function () {

        $("#Table_Sustainability").jqGrid('delRowData', deleteRowId);
        $("#Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);

        $('.Sustainability').val("");                            // To reset the textbox fields

        var productList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        var productDescriptionProductNameList = $("#prd_desc").jqGrid("getCol", "ExistingName");
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

//----------------------------------------------------------

var ppRowId = -1;
$('#PackagingProfileAdd').click(function () {
    $('.Err-PPNoMoreSKU').hide();
    var primaryPackaging = CKEDITOR.instances["PackagingProfilePrimaryPackaging"].getData().trim(); // Remove HTML tags and entities, then check for meaningful content
    var contentWithoutTags = primaryPackaging.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var actualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();
    if ($('#PackagingProfileProduct').val() === "" || $('#PackagingProfileSKU').val().toString() === "" || actualData === "") {
        $('#PackagingProfileProduct').val() === "" ? (isvalid = false, $('.Err-PackagingProfileProduct').show()) : ($('.Err-PackagingProfileProduct').hide());
        $('#PackagingProfileSKU').val().toString() === "" ? (isvalid = false, $('.Err-PackagingProfileSKU').show()) : ($('.Err-PackagingProfileSKU').hide());
        //CKEDITOR.instances["PackagingProfilePrimaryPackaging"].getData() === "" ? (isvalid = false, $('.Err-PackagingProfilePrimaryPackaging').show()) : ($('.Err-PackagingProfileProduct').hide());
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
        ImageFileName = $('#Display_image_upload').text();
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

                var skuArray = item.SKU.split(',').map(sku => sku.trim());

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

        $("#err-expected").hide();
        $("#Error_PPR_Product_Sku").hide();
        $('#Err-PackagingProfileBI').hide();
        var gridDataPackagingProfile = [];
        var PackagingProfile = {};
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
        ppRowId = packagingProfileData_1.length;

        if (EditRowIdPackagingProfile == -1) {

            ppRowId = ppRowId + 1;

            packagingProfileData_1[ppRowId] = PackagingProfile;

            var htmlTag = `

        <table class="mt-2" id="PP_Table_`+ (ppRowId) + `" style="width:100%">
            <thead>
                <tr>
                    <th colspan="2">
                        <b>Product : </b>
                        <span class="expectedproduct">`+ PackagingProfile.Product + `</span>
                    </th>
                    <th style="width:25%">
                        <b>SKU : </b>
                        <span class="expectedSKU">`+ PackagingProfile.SKU + `</span>
                    </th>
                    <th>
                        <span>
                            <div class="action_icons justify-center_1">
                                <a class="btn-icon -edit "><i onclick="onEditPackagingProfile(`+ ppRowId + `)" class="fas fa-edit color-info" title="Edit"></i></a>
                                <a class="btn-icon -delete ppDeleteHide"><i onclick="onDeletePackagingProfile(`+ ppRowId + `,'#PP_Table_` + ppRowId + `',0)" class="fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                       ${PackagingProfile.PackagingProfileImage !== '' && PackagingProfile.PackagingProfileImage !== null ? `
                                      <a class="btn-icon -info imagesinfo" title="Images info" onclick="ShowImages(`+ ppRowId + `)" id="` + ppRowId + `"><i  class="fas fa-images" data-bs-toggle="modal" title="images"></i></a>` : ''}
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
        }
        else {

            //var DataFromTheRow = jQuery('#Packaging_Profile').jqGrid('getRowData', EditRowId3);

            var DataFromTheRow = packagingProfileData_1[EditRowIdPackagingProfile];
            var htmlTag = "";
            var editedRowdata;
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
                                <div class="action_icons justify-center_1">
                                    <a class="btn-icon -edit "><i onclick="onEditPackagingProfile(`+ EditRowIdPackagingProfile + `)" class="fas fa-edit color-info" title="Edit"></i></a>
                                    <a class="btn-icon -delete ppDeleteHide"><i onclick="onDeletePackagingProfile(`+ EditRowIdPackagingProfile + `,'#PP_Table_` + EditRowIdPackagingProfile + `',0)" class="fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                     ${editedRowdata.PackagingProfileImage !== '' && editedRowdata.PackagingProfileImage !== null ? `
                                    <a class="btn-icon -info imagesinfo" title="Images info" onclick="ShowImages(`+ EditRowIdPackagingProfile + `)" id="` + EditRowIdPackagingProfile + `"><i  class="fas fa-images" data-bs-toggle="modal" title="images"></i></a>` : ''}
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
                //if ($('#image_upload').val() == "") {
                PackageImageFileName = PackageImageFileName.split(',');
                //}
                $.each(PackageImageFileName, function (i, j) {

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

        CKEDITOR.instances["PackagingProfilePrimaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileSecondaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileTertiaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileBenchMarkProduct"].setData('');
        CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].setData('');
        CKEDITOR.instances["PackagingProfileOthers"].setData('');
        $(".PackagingProfileEmpty").val("");
        $(".PackagingProfileEmptyImage").text("");
        $(".Toremove").val("");
        ImageFileName = "";
        $('#PackagingProfileSKU').val('').multiselect('refresh');
        $("#PackagingProfileSKU").empty();
        $("#PackagingProfileSKU").multiselect('rebuild');
        $("#image_upload").val('');

        $('#PackagingProfileGrid').show();
    }

});


//On editing the row data  
var editedRowdata = "";
var isEdited = 0;
function onEditPackagingProfile(RowId) {

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

        if ($.trim(data.ExistingName) == DataFromTheRow.Product) {

            skuArray = data.SKU.split(',').map(item => item.trim());
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

    $("option").remove("#PackagingProfileSKU .SkuOption");
    $('#PackagingProfileSKU').append(skuOption).multiselect('rebuild');

    $("#PackagingProfileProduct").val(DataFromTheRow.Product);

    CKEDITOR.instances["PackagingProfilePrimaryPackaging"].setData(DataFromTheRow.PrimaryPackaging),
    CKEDITOR.instances["PackagingProfileSecondaryPackaging"].setData(DataFromTheRow.SecondaryPackaging),
    CKEDITOR.instances["PackagingProfileTertiaryPackaging"].setData(DataFromTheRow.TertiaryPackaging),
    CKEDITOR.instances["PackagingProfileBenchMarkProduct"].setData(DataFromTheRow.BenchmarkProducts),//DesiredPackagingCharacters
    CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].setData(DataFromTheRow.DesiredPackagingCharacters),
    CKEDITOR.instances["PackagingProfileOthers"].setData(DataFromTheRow.Others),
    $("#PackagingProfileMould").val(DataFromTheRow.Mould);
    $("#Display_image_upload").text(DataFromTheRow.PackagingProfileImage);
    editedRowdata = packagingProfileData_1;
    $('.Err-PackagingProfileSKU').hide();
    $('.Err-PackagingProfileProduct').hide();
    $('#image_upload').val('');
}
//On deleting the Packaging Profile row data
function onDeletePackagingProfile(deleteRowId = -1, tableId, flag = 0) {

    var DataFromTheRow = packagingProfileData_1[deleteRowId];
    var FileName = DataFromTheRow.PackagingProfileImage;
    var path = "";
    //FileName = null ? "" : FileName

    if (flag == 1) {
        if (FileName != "" && FileName != null) {

            $.ajax({
                type: 'POST',
                url: ROOT + "ProjectBrief/DeleteImageFile",
                data: { fileName: FileName },
                success: function (data) {
                    path = data;
                }
            });
        }

        $('.PackagingProfile').val("");                            // To reset the text box fields
        $("#Display_PackageImagesUpload").empty();
        CKEDITOR.instances["PackagingProfilePrimaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileSecondaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileTertiaryPackaging"].setData('');
        CKEDITOR.instances["PackagingProfileBenchMarkProduct"].setData('');//DesiredPackagingCharacters
        CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].setData('');
        CKEDITOR.instances["PackagingProfileOthers"].setData('');
        //$('#PackagingProfileSKU').empty();
        //$('#PackagingProfileSKU').multiselect('rebuild')
        $("option").remove("#PackagingProfileSKU .SkuOption");
        $('#PackagingProfileSKU').multiselect('rebuild');

        EditRowId3 = -1;
        EditRowIdPackagingProfile = -1;

        delete packagingProfileData_1[deleteRowId];
        $(tableId).remove();
    }
    else {

        confirm("Are you sure you want to delete?", function () {
            if (FileName != "" && FileName != null) {

                $.ajax({
                    type: 'POST',
                    url: ROOT + "ProjectBrief/DeleteImageFile",
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
            CKEDITOR.instances["PackagingProfilePrimaryPackaging"].setData('');
            CKEDITOR.instances["PackagingProfileSecondaryPackaging"].setData('');
            CKEDITOR.instances["PackagingProfileTertiaryPackaging"].setData('');
            CKEDITOR.instances["PackagingProfileBenchMarkProduct"].setData('');//DesiredPackagingCharacters
            CKEDITOR.instances["PackagingProfileDesiredPackagingCharacters"].setData('');
            CKEDITOR.instances["PackagingProfileOthers"].setData('');
            //$('#PackagingProfileSKU').empty();
            //$('#PackagingProfileSKU').multiselect('rebuild')
            $("option").remove("#PackagingProfileSKU .SkuOption");
            $('#PackagingProfileSKU').multiselect('rebuild');

            EditRowId3 = -1;
            EditRowIdPackagingProfile = -1;
        });
    }
}

function DownloadPackageImage(rowId) {

    var filename = packagingProfileData_1[rowId].PackagingProfileImage;

    if (filename.length > 0) {
        $('#' + rowId + 'DownloadPackageImage').prop("href", ROOT + "ProjectBrief/DownloadImageFile?fileName=" + filename);
        return true;
    }
    else {
        $('#' + rowId + 'DownloadPackageImage').empty().text('No Image Present');

    }
}

var addedData = {};
var deletedRemarksData = [];
var savedFieldRemarks = [];
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        ignoreCase: true,
        width: 40,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.CreatedBy == $("#UserName").val()) {
                return `<div class="action_icons justify-center_">
                <a onclick="remove_row(`+ options.rowId + `)" class="btn-icon -delete"><i class="fas fa-trash color-delete" title="Delete" aria-hidden="true"</i></a></div>`
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
        label: 'CreatedBy',
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

            if (IsPreview == 1)
            {
                $(".showonlyforHGML").hide();
                jQuery("#RemarksTable").jqGrid('hideCol', "Action");
            }
            else
            {
                if (statusId == '3' || statusId == '5' || statusId == '16' || statusId == '6' || statusId == '12') {
                    $(".showonlyforHGML").hide();
                    jQuery("#RemarksTable").jqGrid('hideCol', "Action");
                }
                else {
                    $(".showonlyforHGML").show();
                    jQuery("#RemarksTable").jqGrid('showCol', "Action");
                }
            }

        }
    });
$('.formulation_table').on('click', '.show_primarypack, .show_secondarypack,.show_tertiarypack,.show_desiredpack,.show_benchmark,.show_others,.show_mold', function () {
    
    var table = $(this).closest("table").attr("id");
    var productName = $.trim($('#' + table).find(".expectedProduct").text());
    var SKU = $.trim($('#' + table).find(".expectedSKU").text());
    var ProjectId = $.trim($("#ProjectId").val());
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
                    obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
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
});

$('#SavePackagingFiledRemarks').on("click", function () {

    var ProjectId = $.trim($("#ProjectId").val());
    var remarks = $.trim($(".FieldRemarks").val());
    var fieldName = $.trim($('#ReamarksName').text().split('-')[0]);
    var product = $.trim($('#FiledProductName').text());
    var SKU = $.trim($('#FiledSKU').text());
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
],

$("#business_value").jqGrid({
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: columnModel,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_business_value',
    rowNum: 30,
    scroll: 1,
    sortorder: "asc",
    footerrow: true,
    userDataOnFooter: true,
    loadComplete: function (data) {
        var grid = $(this);
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
            for (var i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }

    }
});


$("#business_value").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$(document).on("click", ".TotalBusinessValue_Y1,.TotalBusinessValue_Y2,.TotalBusinessValue_Y3", function () {

    var projectId = $("#ProjectId").val();

    var year = $(this).attr('data-year');

    $.ajax({
        type: "POST",
        url: ROOT + 'ProjectBrief/GetTotalBusinessValue?projectId=' + projectId + '&ProjectType=' + 2 + '&Year=' + year,
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


function adjustGridHeight() {
    var gridHeight = $("#business_value").jqGrid("getGridParam", "records") * 23 + 45;
    $("#business_value").jqGrid("setGridHeight", gridHeight);
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
function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function () {

    if ($(statusId == "8" || statusId == "9" || statusId == "11")) {

        if ((ReformulationJQgrid['ReformulationPackagingProfile'].length > 0) && ($('#ViewStatus').val() != "View")) {
            $("a.-delete").show();
            $("a.-edit").show();
            $('#PackagingProfile').show();
        }

        else if ((ReformulationJQgrid['ReformulationPackagingProfile'].length > 0) && ($('#ViewStatus').val() == "View")) {
            $(".ppDeleteHide").hide();
            $("a.-edit").hide();
            $('#PackagingProfile').hide();
        }
    }
    if (statusId != "8" && statusId != "1" && statusId != "9" && statusId != "11") {
        $(".ppDeleteHide").hide();
        $("a.-edit").hide();
        $('#PackagingProfile').hide();
    }
    if (statusId == '9' || statusId == '1' || statusId == '8' || statusId == "11") {
        $(".list_icon").hide();
    }
    else {
        $(".list_icon").show();
    }

});

//for auto save in Reformulation edit data
$(document).ready(function () {

    //let isInserted = false;
    if (statusId == '1' || (statusId == '8' || statusId == '11' && $('#ViewStatus').val() != 'View')) {

        setInterval(() => {

            validateEditDataSave();

            $('#loader').hide();
            $("#loader").css("visibility", "hidden");
        }, 5 * 60 * 1000)

    }

})
function validateEditDataSave() {

    var projectdetails = [];
    var additionalreformulation = [];
    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
    //var reformulationpackagingprofilegrid = $('#expected').jqGrid('getGridParam', 'data');
    var reformulationpackagingprofilegrid = packagingProfileData_1.filter(row => row.length !== 0);
    var projectdetailsimage = ProjectDetailsImageFile();
    projectdetailsimage == "" ? projectdetailsimage = ProjectDetailsBenchMarkSampleImage : projectdetailsimage = projectdetailsimage
    var projectheaders = []
    var ProjectName = $('#ProjectName').val().trim();
    //SKU = CKEDITOR.instances["editornf"].getData();
    //SKU == "" ? ($('#Err-ProductDescription-sku').show(), isvalid = false) : $('#Err-ProductDescription-sku').hide()
    if (statusId == "8" || statusId == "1") {
        var st = statusId == "8" ? 8 : 1;
    } else if (statusId == "11") {
        st = 11;
    }
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

    if (ProjectName == "") {
        return validateEditDataSave(); // Exit the function if projectName is empty
    }

    $("#Reformulation_Table").each(function (i) {

        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Category: $(this).find('#Reformulation_Category option:selected').val(),
            Hub: $(this).find('#Reformulation_Hub').text().trim(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
            status: st,
        });
    });
    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val().trim(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val().trim(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val().trim(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val().trim(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val().trim(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val().trim(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val().trim(),
        Others: $("#AdditionalRequirmentsOthers").val().trim(),

    };
    var initiatorremarks = $("#editor").val().trim();

    $("#ProjectHeaders").val(JSON.stringify(projectheaders));
    $("#reformulationProductDescription").val(JSON.stringify(productdescription));
    $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
    $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
    $("#reformulationPackagingProfile").val(JSON.stringify(reformulationpackagingprofilegrid));
    $("#reformulationBusinessInformation").val(JSON.stringify(reformulationbusinessinformation));
    $("#InitiatorRemarks").val(initiatorremarks);
    $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
    $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
    $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));

    var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
    $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
    $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

    if (statusId == "8") {
        $('#ReformulationStatus').val(8);
    } else if (statusId == "11") {
        $('#ReformulationStatus').val(11);
    } else if (statusId == "1") {
        $('#ReformulationStatus').val(1);
    }

    $.ajax({
        url: ROOT + "ProjectBrief/ReformulationAutoSaveEditData",
        type: 'POST',
        data: $('#ReformulationEdit').serialize(),
        success: function (response) {

        },
        error: function (error) {

        }
    });
}
//}
if (statusId == '9' && $('#ViewStatus').val() != 'View') {

    $('.HgmlRemarks').hide();
    $('.HubReview').hide();
    $('.hubHidden').hide();
    $('.HgmlRemarksButton').hide();
    $('.prodPackData').show();
    $('.InitiatorRemarks').show();
    $('.forPendingStage').show();
    $('.forDrafrStage').hide();

    $('#Division,#Category_Reformulation,#ProjectName,#ProjectDetailsBenchMarkSampleImage').attr('disabled', false);

}
if (statusId == '9' && $('#ViewStatus').val() == 'View') {

    $('.HgmlRemarks').hide();
    $('.HubReview').hide();
    $('.hubHidden').hide();
    $('.HgmlRemarksButton').hide();
    $('.prodPackData').show();
    $('.InitiatorRemarks').show();
    $('.forPendingStage').hide();
    $('.forDrafrStage').hide();
    $('#ProductDescriptionAdd').attr("disabled", true);
    $('#BusinessInformationAdd').attr("disabled", true);
    $('#PackagingProfileAdd').attr("disabled", true);
}

function validateSendBackformToManager() {

    $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", false);

    var flag = true;

    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationBusinessInformation = $('#business_info').jqGrid('getGridParam', 'data');
    var reformulationPackagingProfileGrid = packagingProfileData_1.filter(row => row.length !== 0);
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var projectdetailsimage = ProjectDetailsImageFile();
    projectdetailsimage == "" ? projectdetailsimage = ProjectDetailsBenchMarkSampleImage : projectdetailsimage = projectdetailsimage
    var ProjectName = $('#ProjectName').val().trim();
    var projectdetails = [];
    var additionalreformulation = [];
    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val().trim(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val().trim(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val().trim(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val().trim(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val().trim(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val().trim(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val().trim(),
        Others: $("#AdditionalRequirmentsOthers").val().trim(),

    };
    var initiatorremarks = $("#editor").val().trim();
    $("#ProjectDetailsBusinessRational").val().trim() == "" ? ($('#Err-ProjectDetails-BusinessRational').show(), flag = false) : $('#Err-ProjectDetails-BusinessRational').hide()
    productdescription.length === 0 ? ($('#Err-ProductDescription').show(), flag = false) : $('#Err-ProductDescription').hide();
    reformulationBusinessInformation.length === 0 ? ($('#err-business_info').show(), flag = false, /*$(window).scrollTop($('#err-business_info').position().top))*/ document.getElementById('err-business_info').scrollIntoView({ behavior: 'smooth' })) : $('#err-business_info').hide();

    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if ($("input[type=radio][name=survey]:checked").val() == "yes") {
        reformulationPackagingProfileGrid.length === 0 ? ($("#err-expected").show(), flag = false, /*$(window).scrollTop($('#err-expected').position().top))*/ document.getElementById('err-expected').scrollIntoView({ behavior: 'smooth' })): $("#err-expected").hide();
    }
    $('#ProjectName').val().trim() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();
    var projectheaders = []
    $("#Reformulation_Table").each(function (i) {
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Hub: $(this).find('#Reformulation_Hub').text().trim(),
            Category: $(this).find('#Reformulation_Category option:selected').val(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
            status: 8,
        });
    });
    projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();
    projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();


    if (flag) {
        $('div#SendbackModal').modal('show');
        $("#Reformulation_SendBackToInitiator_Ok").click(function () {

            if (deletedImageNameList.length > 0) {

                $.each(deletedImageNameList, function (index, fileName) {

                    if (projectdetailsimage != "" && projectdetailsimage != null) {
                        $.ajax({
                            type: 'POST',
                            url: ROOT + "ProjectBrief/DeleteImageFile",
                            data: { fileName: fileName },
                            success: function (data) {

                                path = data;
                            }
                        });
                    }
                });
            }
            var PMDRemarks = $('#PopUp_SendBackToInitiatorRemarks').val();
            if (PMDRemarks != "") {
                $("#ProjectHeaders").val(JSON.stringify(projectheaders));
                $("#reformulationProductDescription").val(JSON.stringify(productdescription));
                $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
                $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
                $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
                $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
                $("#InitiatorRemarks").val(initiatorremarks);
                $('#SendBackToInitiatorRemarks').val(PMDRemarks);
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));

                var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
                $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
                $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

                approvalStatus = [{

                    FromStage: 9,
                    FromStageName: statusName,
                    Action: "Send back",
                    ToStage: 8,
                    ToStageName: "Sent Back to Initiator"
                }];

                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#ReformulationStatus').val(8);
                document.getElementById('ReformulationEdit').submit();

                $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", true);
            }
            else {
                $('#Error_SendBackRemarks').show();
            }
        });
    }
}

function validatesubmitformToManager() {

    var flag = true;
    $('#ConformReformulation').prop("disabled", false);
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
    var ProjectName = $('#ProjectName').val().trim();
    var projectheaders = []

    $("#Reformulation_Table").each(function (i) {
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Hub: $(this).find('#Reformulation_Hub').text().trim(),
            Category: $(this).find('#Reformulation_Category option:selected').val(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
            status: 9,
        });
    });

    var approvalStatus = []
    if (statusId == '1') {
        approvalStatus = [{

            FromStage: 1,
            FromStageName: "Draft",
            Action: "Send to Pending for Approval",
            ToStage: 9,
            ToStageName: "Pending For Approval"
        }];
    }
    if (statusId == '8') {
        approvalStatus = [{

            FromStage: 8,
            FromStageName: statusName,
            Action: "Send to Pending for Approval",
            ToStage: 9,
            ToStageName: "Pending For Approval"
        }];
    }
    if (statusId == '11') {
        approvalStatus = [{

            FromStage: 11,
            FromStageName: "Brief Demoted to Initiator",
            Action: "Send to Pending for Approval",
            ToStage: 9,
            ToStageName: "Pending For Approval"
        }];
    }
    var projectdetails = [];
    var additionalreformulation = [];
    projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();
    projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();

    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val().trim(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val().trim(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val().trim(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val().trim(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val().trim(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val().trim(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val().trim(),
        Others: $("#AdditionalRequirmentsOthers").val().trim(),

    };
    var initiatorremarks = $("#editor").val().trim();


    $("#ProjectDetailsBusinessRational").val().trim() == "" ? ($('#Err-ProjectDetails-BusinessRational').show(), flag = false) : $('#Err-ProjectDetails-BusinessRational').hide();
    productdescription.length === 0 ? ($('#Err-ProductDescription').show(), flag = false) : $('#Err-ProductDescription').hide();
    reformulationBusinessInformation.length === 0 ? ($('#err-business_info').show(), flag = false) : $('#err-business_info').hide();
    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if ($("input[type=radio][name=survey]:checked").val() == "yes") {
        reformulationPackagingProfileGrid.length === 0 ? ($("#err-expected").show(), flag = false) : $("#err-expected").hide();
    }
    $('#ProjectName').val().trim() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();
    
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
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $("#SaveOrSubmit").val(9);

            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

            var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
            $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
            $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

            document.getElementById('ReformulationEdit').submit();
            $('#ConformReformulation').prop("disabled", true);
        });
    }
}

if (statusId == '2' || statusId == '13' || ($('#ViewStatus').val() == "View")) {
    $("#Initiator_Remarks").val(ReformulationJQgrid.ReformulationInitiatorRemarks[0].initiatorRemarks);
    $('#Initiator_Remarks').attr('readonly', true);
}

if (statusId != '2' && statusId != '13') {
    $('.initiator_remarks_hgml').hide();
}

if (statusId == '9') {
    $('#ImageName').text() != '' ? $('#delete_icon_Benchmark_Samples_Image').show() : $('#delete_icon_Benchmark_Samples_Image').hide();
}
if (statusId == '8' && $('#ViewStatus').val() == 'View') {
    $('.forDrafrStage').hide();
}

if (statusId == '9' && $('#ViewStatus').val() == 'View') {
    $("#delete_icon_Benchmark_Samples_Image").hide();
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

            $("#image_upload").val('');

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
                return '<div class="action_icons">' +
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
            if (statusId != 8 && statusId != 9 && statusId != 1 && statusId != 11 || (statusId == 11 || statusId == 8 || statusId == 9 || statusId == 1) && $('#ViewStatus').val() == 'View') {
                $('.DeletePopUpImage').hide();
            }

            if (IsPreview == 1) {
                $("#uploaded_images_table").find('.DeletePopUpImage').hide();
            }
        }
    });



function ShowImages(obj) {
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

function ValidatePackSaveandUpdate() {

    $('#ByClickUpdate_Ok').prop("disabled", false);

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj2.RemarksId == obj1.RemarksId
        )
    );
    var flag = true;

    var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
    var targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data');

    if (pmdData.length === 0) {
        $('#Err-PmdData').show();
        flag = false;
        //$(window).scrollTop($('.pmddataform').position().top);
        document.getElementByClassName('pmddataform').scrollIntoView({ behavior: 'smooth' });
    }
    var productDetais = fineScreeningData.ProductDetailsPmdRemarksList.length == 0 ? "" : fineScreeningData.ProductDetailsPmdRemarksList[0].ProductDetailsPmdRemark;
    var projectDetails = fineScreeningData.ProjectDetailsPmdRemarksList.length == 0 ? "" : fineScreeningData.ProjectDetailsPmdRemarksList[0].ProjectDetailsPmdRemark;
    var formulation = fineScreeningData.FormulationProfilePmdRemarksList.length == 0 ? "" : fineScreeningData.FormulationProfilePmdRemarksList[0].FormulationProfilePmdRemark;
    var businessInfo = fineScreeningData.BusinessInformationPmdRemarksList.length == 0 ? "" : fineScreeningData.BusinessInformationPmdRemarksList[0].BusinessInformationPmdRemark;
    var packageProfile = fineScreeningData.PackagingProfilePmdRemarksList.length == 0 ? "" : fineScreeningData.PackagingProfilePmdRemarksList[0].PackagingProfilePmdRemark;
    var sustainability = fineScreeningData.SustainabilityPmdRemarksList.length == 0 ? "" : fineScreeningData.SustainabilityPmdRemarksList[0].SustainabilityPmdRemark;

    if (pmdData.length == fineScreeningData.PmdDataList.length && targetCostData.length == fineScreeningData.TargetCostDataList.length &&
        $.trim($('#PD_PMD_Remarks').val()) == productDetais.replaceAll('\r', '') &&
        $.trim($('#ProjDetails_PMD_Remarks').val()) == projectDetails.replaceAll('\r', '') &&
        $.trim($('#FP_PMD_Remarks').val()) == formulation.replaceAll('\r', '') &&
        $.trim($('#BI_PMD_Remarks').val()) == businessInfo.replaceAll('\r', '') &&
        $.trim($('#PPR_PMD_Remarks').val()) == packageProfile.replaceAll('\r', '') &&
        $.trim($('#SUS_PMD_Remarks').val()) == sustainability.replaceAll('\r', '')) {

        var flag1 = false;
        var flag2 = false;

        $.each(pmdData, function (i, obj) {
            if (pmdData[i].ProductName != fineScreeningData.PmdDataList[i].ProductName ||
                pmdData[i].ProjectCategorization != fineScreeningData.PmdDataList[i].ProjectCategorization ||
                pmdData[i].ComplexityToBeAssigned != fineScreeningData.PmdDataList[i].ComplexityToBeAssigned ||
                pmdData[i].RandDName != fineScreeningData.PmdDataList[i].RandDName ||
                pmdData[i].Remarks != fineScreeningData.PmdDataList[i].Remarks ||
                pmdData[i].ProjectLead != fineScreeningData.PmdDataList[i].ProjectLead ||
                pmdData[i].TargetFirstPrototypeSubmissionDate != fineScreeningData.PmdDataList[i].TargetFirstPrototypeSubmissionDate ||
                pmdData[i].TargetTTDCompletionDate != fineScreeningData.PmdDataList[i].TargetTTDCompletionDate ||
                pmdData[i].TargetProductionDate != fineScreeningData.PmdDataList[i].TargetProductionDate ||
                pmdData[i].MajorRiskIfAny != fineScreeningData.PmdDataList[i].MajorRiskIfAny) {
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

            var approvalStatus = [];
            var approveRemarks = $('#PMDDataUpdateRemarks').val();
            if (approveRemarks === '') {
                $('#Error_Reformulation_PMDUpdateRemarks').show();
            }
            else {
                if (statusId == '6') {
                    approvalStatus = [{
                        FromStage: 6,
                        FromStageName: statusName,
                        Action: 'Send to Update',
                        ToStage: 12,
                        ToStageName: 'Updated'
                    }];

                    $('#ReformulationStatus').val(12);
                }
                if (statusId == '12') {
                    approvalStatus = [{
                        FromStage: 12,
                        FromStageName: statusName,
                        Action: 'Updated',
                        ToStage: 12,
                        ToStageName: 'Updated'
                    }];
                    $('#ReformulationStatus').val(12);
                }
                $('#SendToHgmlRemarks').val(approveRemarks)
                $('#PmdData').val(JSON.stringify(pmdData));
                targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
                $('#TargetCostGridData').val(JSON.stringify(targetCostData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));

                $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
                $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData))
                $('#ReformulationEdit').submit();
                $('#ByClickUpdate_Ok').prop("disabled", true);

            }

        });
    }
}


function PMDSendBacktoInitiator() {

    const savedArray = savedFieldRemarks.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.ProjectId === obj1.ProjectId && obj2.Product === obj1.Product && obj2.SKU === obj1.SKU && obj2.FieldName === obj1.FieldName && obj2.Remarks === obj1.Remarks && obj1.RemarksId === obj2.RemarksId
        )
    );

    $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", false);
    $('div#SendbackModal').modal('show');

    $("#Reformulation_SendBackToInitiator_Ok").click(function () {
        var approvalStatus = [];
        var sendbacktoinitiatorRemarks = $('#PopUp_SendBackToInitiatorRemarks').val().trim();

        if (sendbacktoinitiatorRemarks == "") {
            $('#Error_SendBackRemarks').show();
            return false;
        }
        else {

            var pmdData = [];
            var targetCostData = [];

            if (statusId == "5") {
                approvalStatus = [{
                    FromStage: 5,
                    FromStageName: "Fine Screening Review",
                    Action: "Send Back",
                    ToStage: 11,
                    ToStageName: "Brief Demoted to Initiator"
                }];
            }
            if (statusId == "16") {
                approvalStatus = [{
                    FromStage: 16,
                    FromStageName: "Extended Fine Screening Review",
                    Action: "Send Back",
                    ToStage: 11,
                    ToStageName: "Brief Demoted to Initiator"
                }];
            }


            $('#ReformulationStatus').val(11);

            pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
            $('#PmdData').val(JSON.stringify(pmdData));
            targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
            $('#TargetCostGridData').val(JSON.stringify(targetCostData)); 6
            $('#SavedPackagingRemarks').val(JSON.stringify(savedArray))
            $('#DeletedPackagingRemarks').val(JSON.stringify(deletedRemarksData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SendToHgmlRemarks').val(sendbacktoinitiatorRemarks)
            $('#ReformulationEdit').submit();
            $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", true);
        }
    });
}

function ValidatePackSubmitToPMD() {
    
    var flag = true;
    $('#ConformReformulation').prop("disabled", false);
    $('#ManagerApprovalOK').prop("disabled", false);

    productdescription == "" ? ($("#err-prd_desc").show(), flag = false) : $("#err-prd_desc").hide();
    reformulationBusinessInformation == "" ? ($("#err-business_info").show(), flag = false) : $("#err-business_info").hide();
    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationBusinessInformation = $('#business_info').jqGrid('getGridParam', 'data');
    var reformulationPackagingProfileGrid = packagingProfileData_1.filter(row => row.length !== 0);
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var projectdetailsimage = ProjectDetailsImageFile();
    var ProjectName = $('#ProjectName').val().trim();
    var projectheaders = []

    $("#Reformulation_Table").each(function (i) {
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Hub: $(this).find('#Reformulation_Hub').text().trim(),
            Category: $(this).find('#Reformulation_Category option:selected').val(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
            status: 5,
        });
    });

    var approvalStatus = []
    if (statusId == '11') {
        approvalStatus = [{

            FromStage: 11,
            FromStageName: 'Brief Demoted to Initiator',
            Action: "Send to Fine Screening Review",
            ToStage: 5,
            ToStageName: "Fine Screening Review"
        }];
    }

    if (statusId == '9') {
        approvalStatus = [{

            FromStage: 9,
            FromStageName: 'Pending for Approval',
            Action: "Send to Fine Screening Review",
            ToStage: 5,
            ToStageName: "Fine Screening Review"
        }];
    }
    if (statusId == '8') {
        approvalStatus = [{

            FromStage: 8,
            FromStageName: 'Sent Back to Initiator',
            Action: "Send to Fine Screening Review",
            ToStage: 5,
            ToStageName: "Fine Screening Review"
        }];
    }
    var projectdetails = [];
    var additionalreformulation = [];
    projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();
    projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();

    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val().trim(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val().trim(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val().trim(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val().trim(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val().trim(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val().trim(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val().trim(),
        Others: $("#AdditionalRequirmentsOthers").val().trim(),

    };
    var initiatorremarks = $("#editor").val().trim();


    $("#ProjectDetailsBusinessRational").val().trim() == "" ? ($('#Err-ProjectDetails-BusinessRational').show(), flag = false) : $('#Err-ProjectDetails-BusinessRational').hide();
    productdescription.length === 0 ? ($('#Err-ProductDescription').show(), flag = false) : $('#Err-ProductDescription').hide();
    reformulationBusinessInformation.length === 0 ? ($('#err-business_info').show(), flag = false) : $('#err-business_info').hide();
    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if ($("input[type=radio][name=survey]:checked").val() == "yes") {
        reformulationPackagingProfileGrid.length === 0 ? ($("#err-expected").show(), flag = false) : $("#err-expected").hide();
    }
    $('#ProjectName').val().trim() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();
    if (flag) {
        if (statusId == '9') {
            $('div#SubmitForHGML').modal('show');
            $("#ManagerApprovalOK").click(function () {
                var Remarks = $('#ShowManagerApprovalRemarks').val();
                $("#ProjectHeaders").val(JSON.stringify(projectheaders));
                $("#reformulationProductDescription").val(JSON.stringify(productdescription));
                $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
                $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
                $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
                $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $("#InitiatorRemarks").val(initiatorremarks);
                $("#SendBackToInitiatorRemarks").val(Remarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
                $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
                $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

                $("#SaveOrSubmit").val(5);

                document.getElementById('ReformulationEdit').submit();
                $('#ManagerApprovalOK').prop("disabled", true);
            });
        }
        else {

            $('div#SubmitModal').modal('show');
            $("#ConformReformulation").click(function () {
                $("#ProjectHeaders").val(JSON.stringify(projectheaders));
                $("#reformulationProductDescription").val(JSON.stringify(productdescription));
                $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
                $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
                $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
                $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $("#InitiatorRemarks").val(initiatorremarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#SaveOrSubmit").val(5);

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
                $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
                $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

                document.getElementById('ReformulationEdit').submit();
                $('#ConformReformulation').prop("disabled", true);
            });
        }
    }
}

if (statusId == '6' || statusId == '12') {
    $('.pmdhgmldataheader').show();
    $('.AcceptButton').show();
    $('.RejectedButton').hide();
}
if (statusId == '14') {
    $('.hideforBrief').hide();
}
if (statusId == '11') {

    $('.ReformulationSubmit').hide();
    $('.forBriefDemotedStage').show();
}

if (statusId == '3' || statusId == '5' || statusId == '16' || statusId == '6' || statusId == '12') {
    $('.FieldRemarks').attr('readonly', true);
    $('.showonlyforHGML').hide();
    jQuery("#RemarksTable").jqGrid('hideCol', "Action");
}

if (statusId == '8' || statusId == '9' || statusId == '11' || statusId == '13' || statusId == '14' || statusId == '2' || statusId == '4') {
    var previousStage = ""
    for (var i = 0; i < JsonFormReformulationStagesData['ApprovalStages'].length; i++) {
        var id = JsonFormReformulationStagesData.ApprovalStages[i].FromStage
        if ((id == 13 || id == 14) && (statusId == '8' || statusId == '9')) {
            break;
        }
        else if (id == 16) {
            $(".forBriefDemotedStage").hide();
            $('.ReformulationSubmit').hide();
            $('.Button_SendToPmd').hide();
            $('.UnderExpforBriefDemotedStage').show();
            $('.Button_SendToUnderExploration').show();
            $('.ShowInHGMLIfUn').show();
            $('.hideinHGMLIfUn').hide();
            break;
        }
        else if (id == 5) {
            $('.ReformulationSubmit').hide();
            $('.forBriefDemotedStage').show();
            break;
        }

    }
}

CKEDITOR.instances.PackagingProfilePrimaryPackaging.on('change', function () {
    $('.Err-PackagingProfilePrimaryPackaging').hide();
});

$("#PackagingProfileSKU").change(function () {
    $(".Err-PackagingProfileSKU").hide();
});

$("#PMDDataUpdateRemarks").keypress(function () {
    $("#Error_Reformulation_PMDUpdateRemarks").hide();
});

if (($('#ViewStatus').val() == 'View')) {
    $(".forDrafrStage").hide();
    $("#ReformulationSubmitToPMD").hide();
    $('#ProductDescriptionAdd').attr('disabled', true);
    $('#BusinessInformationAdd').attr('disabled', true);
    $('.onlyforPMD').hide();
    $('.Ref_SaveAndUpdate').hide();
    $('.pmdhgmldataheader').hide();
    $('.hideforView').hide();
    $('#BusinessInformationAdd, #PackagingProfileAdd ,#ProductDescriptionAdd').hide();
    $('#AdditionalRequirementsTextBox').attr('readonly', true);
}
if (($('#ViewStatus').val() == 'View') && (statusId == 11 || statusId == 8 || statusId == 9 || statusId == 3)) {
    $('.hideforView').show();
}

if (($('#ViewStatus').val() == 'View') && statusId == 5) {
    $('.pmdhgmldataheader').show()
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
            }
            if (statusId == "3") {

                if ($('#UserName').val().toLowerCase() == rowobject.CreatedBy.toLowerCase()) {
                    return '<div class="action_icons">' +
                        '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '<span class="action-link"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete HideDelete" title="Delete"><i class="fas fa-trash color-delete" title="Delete"></i></a></span>' +
                        '</div> ';
                }
                else {
                    return '<div class="action_icons">' +
                        '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '</div> ';

                }
            }
            else {
                if (rowobject.StatusId != "3" && statusId != "5" && statusId != "16" && statusId != "6" && statusId != "13" && statusId != "14" && statusId != "2" && statusId != "4") {
                    return '<div class="action_icons">' +
                        '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '<span class="action-link"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete HideDelete" title="Delete"><i class="fas fa-trash color-delete" title="Delete"></i></a></span>' +
                        '</div> ';
                } else {
                    return '<div class="action_icons">' +
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
        width: 150,
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
        width: 60,
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
        data: ReformulationJQgrid['SupportingDocData'],
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
            if (statusId != 8 && statusId != 9 && statusId != 1 && statusId != 11 && statusId != 3 || (statusId == 11 || statusId == 8 || statusId == 9 || statusId == 1 || statusId == 3) && $('#ViewStatus').val() == 'View') {
                $('.HideDelete').hide();
            }
        }
    });

$('#preview_Grid_Supporting_Document').jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#preview_pager_Grid_Supporting_Document',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#preview_Grid_Supporting_Document tbody tr");
        var objHeader = $("#preview_Grid_Supporting_Document tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }

        $('#preview_Grid_Supporting_Document').find('.HideDelete').hide();
    }
});
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
            StatusId: statusId,
        }
        if (editDocId == 0) {
            griddata.push(docData);
            var doc1 = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            var doc2 = $.merge(doc1, griddata);
            $("#Grid_Supporting_Document").jqGrid('setGridParam', { data: doc2 });
            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
        }
        else
        {
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
            data2 = {}
            data2 = {
                DocumentName: filename
            }
            deleteImageIn_imageGrid.push(data2);
        }
    });
}


//'<a onclick=OnEditUploadedDoc(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-edit color-info mr-2" title="Edit"></i></a >' +

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


if ($('#ViewStatus').val() == 'View') {
    $(".SupprotingDoc").hide();
}

function documentFileValidation() {
    
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
if (statusId == '2' || statusId == '13' || statusId == '4' || statusId == '14' || statusId == '5' || statusId == '6' || statusId == '12' || statusId == '7' || statusId == '16' || $('#ViewStatus').val() == 'View') {
    $(".forViewAnd2456127").show();
}

if ((statusId == '1' || statusId == '3' || statusId == '9' || statusId == '8' || statusId == '11') && $('#ViewStatus').val() != 'View') {
    $(".for139811").show();
}


function validateSendToUnderExploration() {

    $('#ReformulationSendToUnderEX').prop("disabled", false);
    $('div#SendToUnderExModal').modal('show');

    $("#ReformulationSendToUnderEX").click(function () {

        var approveRemarks = $('#PopUp_SendToExpRemarks').val().trim();
        var date = $(".daydatepicker").val();
        if (approveRemarks === '' || date == "") {
            approveRemarks == "" ? $('.errorUnderExp').show() : $('.errorUnderExp').hide();
            date == "" ? $("#Error_Daypicker").show() : $("#Error_Daypicker").hide();
        }
        else {
            approvalStatus = [{
                FromStage: 5,
                FromStageName: "Fine Screening Review",
                Action: "Send to Extended Fine Screening Review",
                ToStage: 16,
                ToStageName: "Extended Fine Screening Review"
            }];
            $('#SendToHgmlRemarks').val(approveRemarks)
            var pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
            $('#PmdData').val(JSON.stringify(pmdData));
            var targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
            $('#TargetCostGridData').val(JSON.stringify(targetCostData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#ReformulationStatus').val(16);
            $('#PMdDueDate').val(date);
            $('#ReformulationEdit').submit();

            $('#ReformulationSendToUnderEX').prop("disabled", true);
        }
        $("#PopUp_SendToExpRemarks").keyup(function () {
            $("#PopUp_SendToExpRemarks").val().trim() == "" ? $(".errorUnderExp").show() : $(".errorUnderExp").hide();
        });
    });
}
if (statusId == "16") {
    $(".pmdhgmldataheader").show();
    $(".PmdRemarks").show();
    $(".buttonPMD").show();

    if (packagingProfileData_1.length == 0) {
        $(".packProfileRemarks").hide();
    }
}


if (statusId == "5") {
    $(".buttonExp").show();
}

function validateSendBackToPMD() {

    $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", false);
    $('div#SendbackModal').modal('show');

    $("#Reformulation_SendBackToInitiator_Ok").click(function () {
        var approvalStatus = [];
        var sendbacktoinitiatorRemarks = $('#PopUp_SendBackToInitiatorRemarks').val();

        if (sendbacktoinitiatorRemarks == "") {
            $('#Error_SendBackRemarks').show();
            return false;
        }
        else {

            var pmdData = [];
            var targetCostData = [];
            approvalStatus = [{
                FromStage: 16,
                FromStageName: "Extended Fine Screening Review",
                Action: "Send Back",
                ToStage: 5,
                ToStageName: "Fine Screening Review"
            }];

            $('#ReformulationStatus').val(5);

            pmdData = $('#PMD_Data').jqGrid('getGridParam', 'data');
            $('#PmdData').val(JSON.stringify(pmdData));
            targetCostData = $('#TargetCost_Grid').jqGrid('getGridParam', 'data')
            $('#TargetCostGridData').val(JSON.stringify(targetCostData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SendToHgmlRemarks').val(sendbacktoinitiatorRemarks)
            $('#ReformulationEdit').submit();
            $('#Reformulation_SendBackToInitiator_Ok').prop("disabled", true);
        }
    });
}


function ValidatePackSubmitToUnderExp() {
    
    var flag = true;
    $('#ConformReformulation').prop("disabled", false);
    $('#ManagerApprovalOK').prop("disabled", false);

    productdescription == "" ? ($("#err-prd_desc").show(), flag = false) : $("#err-prd_desc").hide();
    reformulationBusinessInformation == "" ? ($("#err-business_info").show(), flag = false) : $("#err-business_info").hide();
    var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
    var reformulationBusinessInformation = $('#business_info').jqGrid('getGridParam', 'data');
    var reformulationPackagingProfileGrid = packagingProfileData_1.filter(row => row.length !== 0);
    var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
    var projectdetailsimage = ProjectDetailsImageFile();
    var ProjectName = $('#ProjectName').val().trim();
    var projectheaders = []

    $("#Reformulation_Table").each(function (i) {
        projectheaders.push({
            ProjectName: ProjectName,
            Division: $(this).find('#Division option:selected').val(),
            ProjectType: "2",
            Hub: $(this).find('#Reformulation_Hub').text().trim(),
            Category: $(this).find('#Reformulation_Category option:selected').val(),
            InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
            status: 16,
        });
    });

    var approvalStatus = []
    if (statusId == '11') {
        approvalStatus = [{

            FromStage: 11,
            FromStageName: 'Brief Demoted to Initiator',
            Action: "Send to Fine Screening Review",
            ToStage: 16,
            ToStageName: "Extended Fine Screening Review"
        }];
    }

    if (statusId == '9') {
        approvalStatus = [{

            FromStage: 9,
            FromStageName: 'Pending for Approval',
            Action: "Send to Fine Screening Review",
            ToStage: 16,
            ToStageName: "Extended Fine Screening Review"
        }];
    }
    if (statusId == '8') {
        approvalStatus = [{

            FromStage: 8,
            FromStageName: 'Sent Back to Initiator',
            Action: "Send to Fine Screening Review",
            ToStage: 16,
            ToStageName: "Extended Fine Screening Review"
        }];
    }
    var projectdetails = [];
    var additionalreformulation = [];
    projectheaders[0].Division == "" ? (flag = false, $('#Error_Reformulation_Division').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();
    projectheaders[0].Category == "" ? (flag = false, $('#Error_Reformulation_Category').show(), document.getElementById('Reformulation_Table').scrollIntoView({ behavior: 'smooth' })) : $('#Error_Reformulation_Division').hide();

    projectdetails = {
        businessrational: $("#ProjectDetailsBusinessRational").val().trim(),
        benchmarksamplesformulation: $("#ProjectDetailsBenchmarkSampleFormulation").val().trim(),
        benchmarksamplesimage: projectdetailsimage,
        desiredindications: $("#ProjectDetailsDesiredIndications").val().trim(),
        desireddosageform: $("#ProjectDetailsDesiredDosageForm").val().trim(),
    };
    additionalreformulation = {
        AdditionalFormulation: $("#AdditionalRequirementsTextBox").val().trim(),
        ShelfLife: $("#AdditionalRequirmentsShelfLife").val().trim(),
        FreeFrom: $("#AdditionalRequirmentsFreeFrom").val().trim(),
        Others: $("#AdditionalRequirmentsOthers").val().trim(),

    };
    var initiatorremarks = $("#editor").val().trim();


    $("#ProjectDetailsBusinessRational").val().trim() == "" ? ($('#Err-ProjectDetails-BusinessRational').show(), flag = false) : $('#Err-ProjectDetails-BusinessRational').hide();
    productdescription.length === 0 ? ($('#Err-ProductDescription').show(), flag = false) : $('#Err-ProductDescription').hide();
    reformulationBusinessInformation.length === 0 ? ($('#err-business_info').show(), flag = false) : $('#err-business_info').hide();
    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if ($("input[type=radio][name=survey]:checked").val() == "yes") {
        reformulationPackagingProfileGrid.length === 0 ? ($("#err-expected").show(), flag = false) : $("#err-expected").hide();
    }
    $('#ProjectName').val().trim() == "" ? ($("#Error-ProjectName").show(), flag = false) : $("#Error-ProjectName").hide();
    
    if (flag) {
        if (statusId == '9') {
            $('div#SubmitForHGML').modal('show');
            $("#ManagerApprovalOK").click(function () {
                var Remarks = $('#ShowManagerApprovalRemarks').val();
                $("#ProjectHeaders").val(JSON.stringify(projectheaders));
                $("#reformulationProductDescription").val(JSON.stringify(productdescription));
                $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
                $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
                $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
                $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $("#InitiatorRemarks").val(initiatorremarks);
                $("#SendBackToInitiatorRemarks").val(Remarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#SaveOrSubmit").val(16);

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
                $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
                $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

                document.getElementById('ReformulationEdit').submit();
                $('#ManagerApprovalOK').prop("disabled", true);
            });
        }
        else {

            $('div#SubmitModal').modal('show');
            $("#ConformReformulation").click(function () {
                $("#ProjectHeaders").val(JSON.stringify(projectheaders));
                $("#reformulationProductDescription").val(JSON.stringify(productdescription));
                $("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
                $("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
                $("#reformulationPackagingProfile").val(JSON.stringify(reformulationPackagingProfileGrid));
                $("#reformulationBusinessInformation").val(JSON.stringify(reformulationBusinessInformation));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $("#InitiatorRemarks").val(initiatorremarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $("#SaveOrSubmit").val(16);

                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
                $('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
                $('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))

                document.getElementById('ReformulationEdit').submit();
                $('#ConformReformulation').prop("disabled", true);
            });
        }
    }
}

function ReformulationSendToUnderExplorationForm() {
    var flag = true;
    $('#ReformulationSendToPMD').prop("disabled", false);
    var YesNo = $('.HgmlDataSendToHubConfirmation').val();
    YesNo === "" ? ($('#Error_DoYouWantSentToHUB').show(), flag = false, /*$(window).scrollTop($('#Hgml_Data-Field').position().top))*/ document.getElementById('Hgml_Data-Field').scrollIntoView({ behavior: 'smooth' })) : $('#Error_DoYouWantSentToHUB').hide();

    var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

    if (YesNo == 'No') {

        flag = true;
        hgmlData.length === 0 ? ($('.Error_EmptyGrid').show(), flag = false) : $('.Error_EmptyGrid').hide();
    }
    else {
        flag = false;
    }

    if (flag) {

        $('div#SendToPmdModal').modal('show');

        $("#ReformulationSendToPMD").click(function () {
            var sendToPmdRemarks = $('#PopUp_SendToPmdRemarks').val().trim();

            if (sendToPmdRemarks != '') {

                if (statusId == '2') {
                    approvalStatus = [{
                        FromStage: 2,
                        FromStageName: statusName,
                        Action: "Send to Extended Fine Screening Review",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                }
                if (statusId == '13') {
                    approvalStatus = [{
                        FromStage: 13,
                        FromStageName: 'Brief Demoted to HGML',
                        Action: "Send to Extended Fine Screening Review",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                }

                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#HgmlDataSendToHubConfirmation').val(YesNo);
                $('#SendToHubRemarks').val(sendToPmdRemarks);
                $('#ReformulationStatus').val(16);
                $('#SendToPmdRemarks').val(sendToPmdRemarks)

                $('#ReformulationEdit').submit();

                $('#ReformulationSendToPMD').prop("disabled", true);

            }
            else {
                sendToPmdRemarks == '' ? $('#Error_Reformulation_PMDremarks').show() : $('#Error_Reformulation_PMDremarks').hide();
            }
            $("#PopUp_SendToPmdRemarks").keyup(function () {

                $("#PopUp_SendToPmdRemarks").val() == "" ? ($("#Error_Reformulation_PMDremarks").show(), flag = false) : ($("#Error_Reformulation_PMDremarks").hide(), flag = true);
            });

        });
    }
}

function ReformulationSendToUnderExploration() {

    $('#ReformulationSendToPMD').prop("disabled", false);
    var flag = true;
    var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

    if (hgmlData.length === 0) {
        $('#err-hgml_data').show();
        //$(window).scrollTop($('#HgmlData_ApprovePage').position().top);
        document.getElementById('HgmlData_ApprovePage').scrollIntoView({ behavior: 'smooth' })

    } else {
        $('div#SendToPmdModal').modal('show');

        $("#ReformulationSendToPMD").click(function () {

            $("#PopUp_SendToPmdRemarks").val() == "" ? ($("#Error_Reformulation_PMDremarks").show(), flag = false) : ($("#Error_Reformulation_PMDremarks").hide(), flag = true);

            var sendToPmdRemarks = $('#PopUp_SendToPmdRemarks').val().trim();
            if (flag) {
                if (statusId == "4") {
                    approvalStatus = [{
                        FromStage: 4,
                        FromStageName: statusName,
                        Action: "Send to " + statusList[4].StatusName,
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                }
                if (statusId == "14") {
                    approvalStatus = [{
                        FromStage: 14,
                        FromStageName: "Brief Demoted to HGML",
                        Action: "Send to Brief Demoted",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                }
                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SendToPmdRemarks').val(sendToPmdRemarks);
                $('#ReformulationStatus').val(16);
                $('#ReformulationEdit').submit();

                $('#ReformulationSendToPMD').prop("disabled", true);
            }
            $("#PopUp_SendToPmdRemarks").keyup(function () {

                $("#PopUp_SendToPmdRemarks").val() == "" ? ($("#Error_Reformulation_PMDremarks").show(), flag = false) : ($("#Error_Reformulation_PMDremarks").hide(), flag = true);
            });
        });
    }
}

if (statusId == "16" && $('#ViewStatus').val() == 'View') {
    $(".buttonPMD").hide();
}

if ($('#ViewStatus').val() == 'View') {
    $(".buttonExp").hide();
    $(".Button_SendToUnderExploration").hide();
    $(".UnderExpforBriefDemotedStage").hide();
    $(".ShowInHGMLIfUn").hide();
}


colmodels = [
    {
        name: '',
        label: 'Action',
        width: 30,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            var imageName = encodeURIComponent(rowobject.Image);
            return '<div class="action_icons">' +
                '<span class="action-link"><a class="btn-icon -download DownloadImage" title="Download Image" onclick=DownloadUploadedImage("' + imageName + '") id="DownloadImage"><i class="fas fa-download color-download" aria-hidden="true"></i></a></span>' +
                '<span class="action-link"><a class="btn-icon -view ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye color-eye"></i></a></span>' +
                '<span class="action-link"><a class="btn-icon -delete2 hideBenchmark" style="display:none" title="Delete Image" onclick=DeleteBenchmarkImage("' + imageName + '")><i class="fas fa-trash color-delete"></i></a></span>' +
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
],
    $('#Grid_BenchMarkImage').jqGrid({
        url: '',
        datatype: 'local',
        data: ReformulationJQgrid['ReformulationBenchMarkImages'],
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
            if ((statusId == '1' || statusId == '8' || statusId == '9' || statusId == '11') && $('#ViewStatus').val() != "View") {
                $('.hideBenchmark').show();
            }
        }
    });

$('#Preview_Grid_BenchMarkImage').jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#Preview_pager_Grid_BenchMarkImage',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#Preview_Grid_BenchMarkImage tbody tr");
        var objHeader = $("#Preview_Grid_BenchMarkImage tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        $('#Preview_Grid_BenchMarkImage').find('.hideBenchmark').hide();
    }
});

var griddata_Bench = [];

if (ReformulationJQgrid['ReformulationBenchMarkImages'].length > 0) {
    var docData = {};

    $.each(ReformulationJQgrid['ReformulationBenchMarkImages'], function (i, j) {

        docData = {
            Image: j.Image,
            UploadedBy: j.UploadedBy
        }
        griddata_Bench.push(docData);
    });
}
$("#Add_BenchMarkImages").on("click", function () {
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
            griddata_Bench.push(docData);
        });

        $("#Grid_BenchMarkImage").jqGrid('setGridParam', { data: griddata_Bench });
        $("#Grid_BenchMarkImage").trigger('reloadGrid', [{ page: 1 }]);

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

function DeleteBenchmarkImage(filename) {
    var file = decodeURIComponent(filename)
    confirm("Are you sure you want to delete?", function () {

        if (filename.length > 0) {
            griddata_Bench = griddata_Bench.filter(obj1 => obj1.Image !== file);

            var bImage = {};
            var bImage = {
                Image: file
            }

            deleteImageIn_BenchMark.push(bImage);

            $('#Grid_BenchMarkImage').jqGrid('clearGridData');
            $("#Grid_BenchMarkImage").jqGrid('setGridParam', { data: griddata_Bench });
            $("#Grid_BenchMarkImage").trigger('reloadGrid', [{ page: 1 }]);
        }
    });
}

if ((statusId == '1' || statusId == '8' || statusId == '9' || statusId == '11') && $('#ViewStatus').val() != "View") {
    $(".onlyforinit").show();
}

if ($('#ViewStatus').val() == "View") {
    $(".HideforAllView").hide();
    $(".benchmarksampleimage").show();
}

if (statusId == "3") {
    $(".hideforView").hide();
}

$('.daydatepicker').datepicker({
    autoclose: true,
    viewMode: 'months',
    startDate: '+0d',
    forceParse: false,
    todayHighlight: true,
    format: 'dd-mm-yyyy'
})

if (statusId == "2" || statusId == "4" || statusId == "5" || statusId == "6" || statusId == "12" || statusId == '13' || statusId == "14" || statusId == "16") {
    $("#Hd").show();
}
else {
    $("#Hd").hide();
}

if (ReformulationJQgrid['ReformulationPackagingProfile'].length > 0) {
    $("#PackagingProfileDiv").show();
}
else {
    $("#PackagingProfileDiv").hide();
}

if (statusId == "1" || statusId == "2" || statusId == "8" || statusId == "9" || statusId == "11" || statusId == "13") {
    $("#IR").show();
}
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
        name: 'HgmlOrHubDataRemarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true
    },

];
$("#Preview_HUB_ParticipatingMarkets").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    rowNum: 20,
    pager: '#Preview_pager_HUB',
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Preview_HUB_PartcipatingMarkets tbody tr");
        var objHeader = $("#Preview_HUB_PartcipatingMarkets tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }

        }
    }
});

$("#Preview_Modal").click(function () {
    IsPreview = 1;

    $(".PreviewFineScreeningRemarks").hide();
    $(".PreviewHGMLRemarks").hide();
    $(".PreviewHUBRemarks").hide();

    $(".PreviewCategory").text($('.addCategoryOption option:selected').text());
    $(".PreviewDivision").text($('#Division option:selected').text());

    if ($('.addCategoryOption option:selected').val() == "") {
        $(".PreviewCategory").text('');
    }
    if ($('#Division option:selected').val() == "") {
        $(".PreviewDivision").text('');
    }

    $(".PreviewProjectName").text($("#ProjectName").val());

    $(".PreviewBusinessRational").text($("#ProjectDetailsBusinessRational").val().trim());
    $(".PreviewBenchmarksamples").text($("#ProjectDetailsBenchmarkSampleFormulation").val().trim());
    $(".PreviewDesiredIndications").text($("#ProjectDetailsDesiredIndications").val());
    $(".PreviewDesiredDosageForm").text($("#ProjectDetailsDesiredDosageForm").val().trim());

    $(".Previewtextbox").val($("#AdditionalRequirementsTextBox").val().trim());
    $(".PreviewShelflife").text($("#AdditionalRequirmentsShelfLife").val().trim());
    $(".PreviewFreefrom").text($("#AdditionalRequirmentsFreeFrom").val().trim());
    $(".PreviewOthers").text($("#AdditionalRequirmentsOthers").val().trim());

    var benchMarkImageGridData = $("#Grid_BenchMarkImage").jqGrid('getGridParam', 'data');
    $('#Preview_Grid_BenchMarkImage').jqGrid('clearGridData');
    $("#Preview_Grid_BenchMarkImage").jqGrid('setGridParam', { data: benchMarkImageGridData });
    $("#Preview_Grid_BenchMarkImage").trigger('reloadGrid', [{ page: 1 }]);

    var isPackagingProfileSelected = $("input[name='survey']:checked").val();

    if ((isPackagingProfileSelected).toLowerCase() == "yes") {
        $("#Preview_PackagingProfile").show();
        $("#Packaging_Profile_Preview").empty();
        var divData = $("#Packaging_Profile_Table").html();
        $("#Packaging_Profile_Preview").append(divData);
        $("#Packaging_Profile_Preview").find("i.fa-edit").remove();
        $("#Packaging_Profile_Preview").find("i.fa-trash").remove();
    }

    var prdDescGridData = $("#prd_desc").jqGrid('getGridParam', 'data');;
    $('#preview_prd_desc').jqGrid('clearGridData');
    $("#preview_prd_desc").jqGrid('setGridParam', { data: prdDescGridData });
    $("#preview_prd_desc").trigger('reloadGrid', [{ page: 1 }]);

    var businessInfoGridData = $("#business_info").jqGrid('getGridParam', 'data');
    $('#preview_business_info').jqGrid('clearGridData');
    $("#preview_business_info").jqGrid('setGridParam', { data: businessInfoGridData });
    $("#preview_business_info").trigger('reloadGrid', [{ page: 1 }]);

    $('#BI_TotalBusinessValue_V_Y1').val($("#BI_TotalBusinessValue_Y1").val());
    $('#BI_TotalBusinessValue_V_Y2').val($("#BI_TotalBusinessValue_Y2").val());
    $('#BI_TotalBusinessValue_V_Y3').val($("#BI_TotalBusinessValue_Y3").val());

    var sustainabilityGridData = $("#Table_Sustainability").jqGrid('getGridParam', 'data');
    $('#preview_Table_Sustainability').jqGrid('clearGridData');
    $("#preview_Table_Sustainability").jqGrid('setGridParam', { data: sustainabilityGridData });
    $("#preview_Table_Sustainability").trigger('reloadGrid', [{ page: 1 }]);

    var supportingDocumentGridData = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
    $('#preview_Grid_Supporting_Document').jqGrid('clearGridData');
    $("#preview_Grid_Supporting_Document").jqGrid('setGridParam', { data: supportingDocumentGridData });
    $("#preview_Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);

    if (statusId == "2" || statusId == "13") {
        $("#Preview_HMGLData").show();
        $(".PreviewSentToHubOrNot").show();

        var isSentToHub = $(".HgmlDataSendToHubConfirmation").val()

        $(".PreviewSentToHub").text($(".HgmlDataSendToHubConfirmation").val());

        if ((isSentToHub).toLowerCase() == "no") {

            $("#PreviewHubSentToHubNoDiv").show();
            $("#Preview_HMGLDataGrid").show();
            $("#PreviewHubSentToHubYesDiv").hide();

            var hgmlGridData = $("#HGML_Data").jqGrid('getGridParam', 'data');
            $('#Preview_HGML_Data').jqGrid('clearGridData');
            $("#Preview_HGML_Data").jqGrid('setGridParam', { data: hgmlGridData });
            $("#Preview_HGML_Data").trigger('reloadGrid', [{ page: 1 }]);
            
        }
        else if ((isSentToHub).toLowerCase() == "yes") {

            $("#PreviewHubSentToHubYesDiv").show();
            $("#PreviewHubSentToHubNoDiv").hide();
            $("#Preview_HMGLDataGrid").hide();

            var selectedValues = $("#HgmlData_HubDropdown").val();
            var selectedTexts = [];
            selectedValues.forEach(function (value) {
                var matchingOption = $("#HgmlData_HubDropdown option[value='" + value + "']");
                if (matchingOption.length > 0) {
                    selectedTexts.push(matchingOption.text());
                }
            });

            $(".PreviewHUB").text(selectedTexts.toString());
            $(".PreviewHUBUsers").text($("#HgmlData_HubUsersDropdown").val());
            $(".PreviewHGMLToHUBRemarks").text($("#HgmlDataHgmlToHubRemarks").val());

        }
    }
    if (statusId == "4" || statusId == "13" || statusId == "14") {

        $("#Preview_HUBStatus").show();

        $("#Preview_HubReviewStatus").empty();
        var divData = $("#HubReviewStatus").html();
        $("#Preview_HubReviewStatus").append(divData);

        var hubremarksGridData = $("#HUB_ParticipatingMarkets").jqGrid('getGridParam', 'data');
        $('#Preview_HUB_ParticipatingMarkets').jqGrid('clearGridData');
        $("#Preview_HUB_ParticipatingMarkets").jqGrid('setGridParam', { data: hubremarksGridData });
        $("#Preview_HUB_ParticipatingMarkets").trigger('reloadGrid', [{ page: 1 }]);

        $("#Preview_HMGLDataGird").show();
        
    }
    if (statusId == "4" || statusId == "5" || statusId == "6" || statusId == "11" || statusId == "12" || statusId == "14" || statusId == "16") {

        $("#Preview_HMGLData").show();
        $("#Preview_HMGLDataGrid").show();
        var hgmlGridData = $("#HGML_Data").jqGrid('getGridParam', 'data');
        $('#Preview_HGML_Data').jqGrid('clearGridData');
        $("#Preview_HGML_Data").jqGrid('setGridParam', { data: hgmlGridData });
        $("#Preview_HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

    }
    if (statusId == "3") {

        $("#Preview_HMGLHUBData").show();
        $(".PreviewHgmlToHubRemarks").text($("#HgmlToHubRemarks").val());
        $(".PreviewHgmlData_HUBParticipatingMarkets").text($("#HgmlData_HUBParticipatingMarkets").val());
        $(".PreviewHgmlData_Remarks").text($("#HgmlData_Remarks").val());

        $(".PreviewHUBRemarks").show();

        $(".PreviewPrdDescHUBRemarks").text($("#PD_HUB_Remarks").val());
        $(".PreviewPrjDetailHUBRemarks").text($("#ProjDetails_HUB_Remarks").val());
        $(".PreviewAddFormReqHUBRemarks").text($("#FP_HUB_Remarks").val());
        $(".PreviewBusiInfoHUBRemarks").text($("#BI_HUB_Remarks").val());
        $(".PreviewSusHUBRemarks").text($("#SUS_HUB_Remarks").val());
        if ((isPackagingProfileSelected).toLowerCase() == "yes") {
            $(".PreviewPackProHUBRemarks").text($("#PPR_HUB_Remarks").val());
        }

    }
    if (statusId == "5" || statusId == "16" || statusId == "6" || statusId == "12") {

        $("#Preview_TargetCost").show();
        $("#Preview_FineScreeningData").show();

        var fineScreeningGridData = $("#PMD_Data").jqGrid('getGridParam', 'data');
        $('#Preview_PMD_Data').jqGrid('clearGridData');
        $("#Preview_PMD_Data").jqGrid('setGridParam', { data: fineScreeningGridData });
        $("#Preview_PMD_Data").trigger('reloadGrid', [{ page: 1 }]);

        var targetCostGridData = $("#TargetCost_Grid").jqGrid('getGridParam', 'data');
        $('#Preview_TargetCost_Grid').jqGrid('clearGridData');
        $("#Preview_TargetCost_Grid").jqGrid('setGridParam', { data: targetCostGridData });
        $("#Preview_TargetCost_Grid").trigger('reloadGrid', [{ page: 1 }]);

        $(".PreviewFineScreeningRemarks").show();

        $(".PreviewPrdDescFineScreeningRemarks").text($("#PD_PMD_Remarks").val());
        $(".PreviewPrjDetailFineScreeningRemarks").text($("#ProjDetails_PMD_Remarks").val());
        $(".PreviewAddFormReqFineScreeningRemarks").text($("#FP_PMD_Remarks").val());
        $(".PreviewBusiInfoFineScreeningRemarks").text($("#BI_PMD_Remarks").val());
        $(".PreviewSusFineScreeningRemarks").text($("#SUS_PMD_Remarks").val());
        if ((isPackagingProfileSelected).toLowerCase() == "yes") {
            $(".PreviewPackProFineScreeningRemarks").text($("#PPR_PMD_Remarks").val());
        }
    }
    if (statusId == "1" || statusId == "2" || statusId == "8" || statusId == "9" || statusId == "11" || statusId == "13")
    {
        $("#Preview_InitiatorRemarks").show();

        if (statusId == "2" || statusId == "13") {
            $(".PreviewInitiatorRemarks").text($("#Initiator_Remarks").val());
        }
        else if (statusId == "11" || statusId == "8" || statusId == "1") {
            $(".PreviewInitiatorRemarks").text($(".initiator_remarks_editable").val());
        }
        else if (statusId == "9") {
            $(".PreviewInitiatorRemarks").text($(".initiator_remarks_disabled").val());
        }
    }
    if (statusId == "2" || statusId == "3" || statusId == "4" || statusId == "13" || statusId == "14" || statusId == "5" || statusId == "6" || statusId == "12" || statusId == "16")
    {
        $(".PreviewHGMLRemarks").show();
        
        $(".PreviewPrdDescHGMLRemarks").text($("#PD_HGML_Remarks").val());
        $(".PreviewPrjDetailHGMLRemarks").text($("#ProjDetails_HGML_Remarks").val());
        $(".PreviewAddFormReqHGMLRemarks").text($("#FP_HGML_Remarks").val());
        $(".PreviewBusiInfoHGMLRemarks").text($("#BI_HGML_Remarks").val());
        $(".PreviewSusHGMLRemarks").text($("#SUS_HGML_Remarks").val());
        if ((isPackagingProfileSelected).toLowerCase() == "yes") {
            $(".PreviewPackProHGMLRemarks").text($("#PPR_HGML_Remarks").val());
        }
    }
    $("#Preview_Modal_Popup").modal("show");
});

$(".previewPopup").click(function () {
    IsPreview = 0;
    $("#Preview_Modal_Popup").modal("hide");
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
var page = $("#Page").val();
if (page == "HGH") {
    $(".link_href").addClass('hide');
    $(".btn-cancel, .hubReviewButtonsList , .HgmlRemarksButton").addClass('hide');
}
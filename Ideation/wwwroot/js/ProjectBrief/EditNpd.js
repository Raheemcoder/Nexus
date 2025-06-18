
var jsonFormNpdData = $.parseJSON($('#JsonFormNpdData').val());
var jsonFormNpdHgmlReviewData = [];
var jsonFormNpdHubReviewData = [];

var jsonFormNpdHgmlApproveData = [];
var jsonFormNpdPmdReviewData = [];
var fineScreeningData = [];

var productPositioningProductNameList = [];
var formulationProfileProductNameList = [];
var packagingProfileProductNameList = [];
var businessInformationProductNameList = [];
var hgmlDataProductNameList = [];
var pmdDataProductNameList = [];
var sustainabilityProductNameList = [];

var addedData = {};
var deletedRemarksData = [];
var savedProjectRemarksData = [];
var imageGrid = [];
var FormulationimageGrid = [];
var deleteImageIn_imageGrid = [];
var DeletedSupportingDoc = [];
var field = 0;
var SKU = "";

var packagingProfileData_1 = [];
var formulationProfileData_1 = [];

var ppRowId = -1;
var fpRowId = -1;

var isPreview = 0;

var iconName = $('#IconName').val();

var statusName = jsonFormNpdData.StatusNameDb[0].length == 0 ? "" : jsonFormNpdData.StatusNameDb[0].StatusName;
$('#NPD_Status').text(statusName == 'Under Exploration' ? 'Extended Fine Screening Review' : statusName);

var statusId = jsonFormNpdData.StatusNameDb[0].length == 0 ? "" : parseInt(jsonFormNpdData.StatusNameDb[0].StatusId);

if (iconName == "View" && statusId == "3") {

    $('.NotInHubReview_ViewPage').hide();
    statusId = parseInt(statusId);
    statusId = statusId + 1;
}

$('#BI_TotalBusinessValue_Y1').val(jsonFormNpdData.BusinessInformation.length > 0 ? jsonFormNpdData.BusinessInformation[0].TotalBusinessValue_Y1 : "");
$('#BI_TotalBusinessValue_Y2').val(jsonFormNpdData.BusinessInformation.length > 0 ? jsonFormNpdData.BusinessInformation[0].TotalBusinessValue_Y2 : "");
$('#BI_TotalBusinessValue_Y3').val(jsonFormNpdData.BusinessInformation.length > 0 ? jsonFormNpdData.BusinessInformation[0].TotalBusinessValue_Y3 : "");

if (statusId == 2 || statusId == 3 || statusId == 13) {

    jsonFormNpdHgmlReviewData = $.parseJSON($('#JsonFormNpdHgmlReviewData').val());
}

if (statusId == 3) {

    jsonFormNpdHubReviewData = $.parseJSON($('#JsonFormNpdHubReviewData').val());
}

if (statusId == 4 || statusId == 5 || statusId == 16 || statusId == 6 || statusId == 7 || statusId == 12 || statusId == 14) {

    jsonFormNpdHgmlApproveData = $.parseJSON($('#JsonFormNpdHgmlApproveData').val());
}

if (statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12 || statusId == 7) {

    jsonFormNpdPmdReviewData = $.parseJSON($('#JsonFormNpdPmdReviewData').val());
    fineScreeningData = $.parseJSON($('#JsonFormNpdPmdReviewData').val());
}

$('#NPD_InitiatedBy').text(jsonFormNpdData.NpdHeaderTable.length == 0 ? "" : jsonFormNpdData.NpdHeaderTable[0].InitiatedBy);
$('#NPD_InitiatedDate').text(jsonFormNpdData.NpdHeaderTable.length == 0 ? "" : jsonFormNpdData.NpdHeaderTable[0].InitiatedDate);
$('#NPD_Hub').text(jsonFormNpdData.NpdHeaderTable.length == 0 ? "" : jsonFormNpdData.NpdHeaderTable[0].Hub);
var previoustatus = "";
$(document).ready(function () {

    $('.example-dropUp').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });
    $('.example-dropDown').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropDown: true
    });


    var selectedHubList = [];


    if (jsonFormNpdHgmlReviewData.length != 0) {        
        var selectedHubList = jsonFormNpdHgmlReviewData.HgmlDataList.length === 0 ? [] : jsonFormNpdHgmlReviewData.HgmlDataList[0].DoYouWantSentToHub == "No" ? [] : jsonFormNpdHgmlReviewData.HgmlDataList[0].Hub.split(",");
        $('#HgmlData_HubDropdown').multiselect('refresh');
        $('#HgmlData_HubDropdown').val(selectedHubList).multiselect('rebuild');
        $('#HgmlData_HubDropdown').multiselect('rebuild');
        var selectedHubIds = "";
        if ($("#HgmlData_HubDropdown").val() != undefined) {
            selectedHubIds = $("#HgmlData_HubDropdown").val().toString();
        }

        if (selectedHubIds != "") {
            $.ajax({
                type: "POST",
                url: ROOT + "Base/GetUserEmailBasedOnHub",
                data: { hubIds: selectedHubIds },
                dataType: "json",
                success: function (UserEmailResult) {

                    if (UserEmailResult != null) {

                        let selectedHubUser = [];
                        selectedHubUser = jsonFormNpdHgmlReviewData.HgmlDataList.length === 0 ? [] : jsonFormNpdHgmlReviewData.HgmlDataList[0].HubUsers.split(",");

                        var userEmailOptionList = ''

                        $("option").remove(".HubUsersOption");

                        $.each(UserEmailResult, function (i, obj) {

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

    previoustatus = jsonFormNpdData.ApprovalStatusData.length > 0 ? jsonFormNpdData["ApprovalStatusData"][0].FromStage : "";
    $('#Npd_ProjectName').val(jsonFormNpdData.ProjectDetails.length > 0 ? jsonFormNpdData.ProjectDetails[0].ProjectName : "");
    $('#Npd_BusinessObjective').val(jsonFormNpdData.ProjectDetails.length > 0 ? jsonFormNpdData.ProjectDetails[0].BusinessObjective : "");
    $('#PP_TargetConsumer').val(jsonFormNpdData.ProjectDetails.length > 0 ? jsonFormNpdData.ProjectDetails[0].TargetConsumer : "");
    $('#PP_CompetitiveOfferings').val(jsonFormNpdData.ProjectDetails.length > 0 ? jsonFormNpdData.ProjectDetails[0].CompetitiveOfferings : "");
    $('#PP_UnmetNeed').val(jsonFormNpdData.ProjectDetails.length > 0 ? jsonFormNpdData.ProjectDetails[0].UnmetNeed : "");
    $('#Npd_InitiatorRemarks').val(jsonFormNpdData.ProjectDetails.length > 0 ? jsonFormNpdData.ProjectDetails[0].InitiatorRemarks : "");

    $('#InitiatorRemarks').val(jsonFormNpdData.ProjectDetails.length > 0 ? jsonFormNpdData.ProjectDetails[0].InitiatorRemarks : "");

    var DivId = $("#Division").val();
    var categoryId = $("#Category").val();

    var link = "";

    if ((statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) && iconName != 'View') {
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
                if ((statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) && iconName != 'View') {
                    $.each(Categoryresult, function (i, obj) {
                        if (obj.CategoryId == categoryId) {
                            CategoryList = '<option class="CategoryOption" selected value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                        }
                        else {
                            CategoryList = '<option class="CategoryOption" value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                        }
                        $(".addCategoryOption").append(CategoryList);
                    });
                } else {
                    $.each(Categoryresult, function (i, obj) {

                        if (obj.CategoryID == categoryId) {
                            CategoryList = '<option class="CategoryOption" selected value="' + obj.CategoryID + '">' + obj.CategoryName + '</option>';
                        }
                        else {
                            CategoryList = '<option class="CategoryOption" value="' + obj.CategoryID + '">' + obj.CategoryName + '</option>';
                        }
                        $(".addCategoryOption").append(CategoryList);
                    });
                }
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

    //Appending the row data to Packaging Profile and Formulation Profile section
    if (jsonFormNpdData != null) {

        packagingProfileData_1 = jsonFormNpdData['PackagingProfile'];
        formulationProfileData_1 = jsonFormNpdData['FormulationProfile'];
        if (packagingProfileData_1.length > 0) {

            var htmlTag = ""
            ppRowId = packagingProfileData_1.length - 1;
            $.each(packagingProfileData_1, function (i, data) {

                htmlTag +=
                    `<table id="PPR_Table_` + (i) + `" style="width:100%">
                    <thead>
                        <tr>
                            <th colspan="2">
                                <b>Product : </b>
                                <span class="PPR_Product">`+ data.Product + `</span>
                            </th>
                            <th style="width:25%">
                                <b>SKU : </b>
                                <span>`+ data.SKU + `</span>
                            </th>
                            <th>
                                <span>
                                    <div class="justify-center_1 action_icons">
                                        <a onclick="onEditPackagingProfile(`+ i + `)" class="btn-icon edithide -edit ${iconName != "View" && (statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) ? '' : 'hide_field_remarks'}"><i class="fas fa-pen pr-2 color-info edithide" title="Edit"></i></a>
                                        <a onclick="onDeletePackagingProfile(`+ i + `,'#PPR_Table_` + i + `',0)" class="btn-icon deletehide -delete ${iconName != "View" && (statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) ? '' : 'hide_field_remarks'}"><i class="fa fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                              ${data.ImagesUpload !== '' && data.ImagesUpload !== null ? `
                                      
		                               <a onclick="ShowImages(` + i + `)" class="btn-icon -info imagesinfo " id="` + i + `_Images" title="Images info">
                                             <i class="fas fa-images" data-bs-toggle="modal" title="Images"></i>
                                        </a>` : ''
                    }
                                    </div>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width:25%;">
                                <span class="remarkss"><b>Primary Packaging : </b> 
                                    <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('PPR', ${i}, 1, 'Primary Packaging')" class="fas fa-list" title="Remarks List"></i></span>
                                </span>
                                <div>`+ data.PrimaryPackaging + `</div>
                            </td>
                            <td style="width:25%;">
                                <span class="remarkss"><b>Secondary Packaging : </b>
                                    <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('PPR', ${i}, 2, 'Secondary Packaging')" class="fas fa-list" title="Remarks List" ></i></span>
                                </span>
                                <div>`+ data.SecondaryPackaging + `</div>
                            </td>
                            <td>
                                <span class="remarkss"><b>Tertiary Packaging : </b> 
                                    <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('PPR', ${i}, 3, 'Tertiary Packaging')" class="fas fa-list" title="Remarks List"></i></span>
                                </span>
                                <div>`+ data.TertiaryPackaging + `</div>
                            </td>
                            <td>
                                <span class="remarkss"> <b>Benchmark Products : </b> 
                                    <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('PPR', ${i}, 4, 'Benchmark Products')" class="fas fa-list" title="Remarks List"></i></span>
                                </span>
                                <div>`+ data.BenchmarkProducts + `</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <span class="remarkss"><b>Desired Packaging Characteristics</b>
								 <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('PPR', ${i}, 5, 'Desired Packaging Characteristics')" class="fas fa-list" title="Remarks List"></i></span>
                                </span>
                                <div>`+ data.DesiredPackagingCharacteristics + `</div>
                            </td>
                            <td>
                                <span class="remarkss"><b>Others (if any) : </b>
                                    <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('PPR', ${i}, 6, 'Others (if any)')" class="fas fa-list" title="Remarks List"></i></span>
                                </span>
                                <div>`+ data.Others + `</div>
                            </td>
                            <td>
                                <span class="remarkss"><b>Mold : </b>
                                    <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('PPR', ${i}, 7, 'Mold')" class="fas fa-list" title="Remarks List"></i></span>
                                </span>
                                <div>`+ data.Mould + `</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br class="PPR_Table_Break`+ i + `" />`;
            });

            $('.Packaging_Profile_Table').append(htmlTag);
            for (var i = 0; i < packagingProfileData_1.length; i++) {
                var ImagesUpload = packagingProfileData_1[i].ImagesUpload;
                var ImageUpload = ImagesUpload.split(',');

                $.each(ImageUpload, function (j, imageUrl) {
                    var imagedata = {
                        TableClass: i,
                        Image: imageUrl.trim() // Trim any whitespace
                    };
                    imageGrid.push(imagedata);
                });
            }
        }

        if (formulationProfileData_1.length > 0) {

            var htmlTag = "";
            fpRowId = formulationProfileData_1.length - 1;
            $.each(formulationProfileData_1, function (i, data) {
                htmlTag +=
                    `<table id="FP_Table_` + (i) + `" style="width:100%">
                        <thead>
                            <tr>
                                <th colspan="4">
                                    <b>Product : </b>
                                    <span class="FP_Product">`+ data.Product + `</span>
                                    <span>
                                        <div class="justify-center_1 action_icons">
                                            <a onclick="onEditFormulationProfile(`+ i + `)" class="btn-icon -edit edithide ${iconName != "View" && (statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) ? '' : 'hide_field_remarks'} "><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
                                            <a onclick="onDeleteFormulationProfile(`+ i + `,'#FP_Table_` + i + `',0)" class="deletehide btn-icon -delete ${iconName != "View" && (statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) ? '' : 'hide_field_remarks'}"><i class="fa fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                               ${data.BenchmarkProductsImage !== '' && data.BenchmarkProductsImage !== null ? ` 
											   <a onclick="DispalyImages(` + i + `)" class="btn-icon -info imagesinfo " id="` + i + `_Images" title="Images info">
                                            <i class="fas fa-images" data-bs-toggle="modal" title="Images"></i>
                                        </a>` : ''
                    }
                                        </div>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="width:25%;">
                                    <span class="remarkss"><b>Desired Ingredients : </b>
									
                                        <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('FP', ${i}, 8, 'Desired Ingredients')" class="fas fa-list" title="Remarks List"></i></span>
                                    </span>
                                    <div>`+ data.DesiredIngredients + `</div>
                                </td>
                                <td style="width:25%;">
                                    <span class="remarkss"><b>Indication / Condition : </b>
                                        <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('FP', ${i}, 9, 'Indication / Condition')" class="fas fa-list" title="Remarks List"></i></span>
                                    </span>
                                    <div>`+ data.IndicationOrConditions + `</div>
                                </td>
                                <td>
                                    <span class="remarkss"><b>Must have claims : </b>
                                        <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('FP', ${i}, 10, 'Must have claims')" class="fas fa-list" title="Remarks List"></i></span>
                                    </span>
                                    <div>`+ data.MustHaveClaims + `</div>
                                </td>
                                <td>
                                    <span class="remarkss"><b>Nice to have claims : </b>
                                        <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('FP', ${i}, 11, 'Nice to have claims')" class="fas fa-list" title="Remarks List"></i></span>
                                    </span>
                                    <div>`+ data.NiceToHaveClaims + `</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="remarkss"><b>Dosage Form : </b>
                                        <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('FP', ${i}, 12, 'Dosage Form')" class="fas fa-list" title="Remarks List"></i></span>
                                    </span>
                                    <div>`+ data.DosageForm + `</div>
                                </td>
                                <td>
                                    <span class="remarkss"><b>Benchmark Products : </b>
                                        <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('FP', ${i}, 13, 'Benchmark Products')" class="fas fa-list" title="Remarks List"></i></span>
                                    </span>
                                    <div>`+ data.BenchmarkProducts + `</div>
                                </td>
                                <td colspan="2">
                                    <span class="remarkss"><b>Desired Product Characteristics :</b>
                                        <span class="${statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11 ? 'hide_field_remarks' : ''}" data-bs-toggle="modal" data-bs-target=""><i onclick="onClickFieldRemarksIcon('FP', ${i}, 14, 'Desired Product Characteristics')" class="fas fa-list" title="Remarks List"></i></span>
                                    </span>
                                    <div>`+ data.DesiredProductCharacteristics + `</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br class="FP_Table_Break`+ i + `" />`;
            });

            $('.Formulation_Profile_Table').append(htmlTag);

            for (var i = 0; i < formulationProfileData_1.length; i++) {
                var ImagesUpload = formulationProfileData_1[i].BenchmarkProductsImage;
                var ImageUpload = ImagesUpload.split(',');
                $.each(ImageUpload, function (j, imageUrl) {
                    var imagedata = {
                        TableClass: i,
                        Image: imageUrl.trim() // Trim any whitespace
                    };
                    FormulationimageGrid.push(imagedata);
                });
            }

            if ((statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) && iconName != 'View') {
                $(".edithide").show();
                $(".deletehide").show();
            }
            else {
                $(".edithide").hide();
                $(".deletehide").hide();
            }
        }
    }

    if (statusId == 1) {
        $('#Page_Heading').text('NPD-' + statusName);
        $(".NotInNpd").hide();

        var todayDate = new Date();
        $('#NPD_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));

    }
    if (statusId == 13) {
        $('#Page_Heading').text('NPD-' + 'Brief Demoted to HGML');

        $(".NotInNpdHgmlReview").hide();

        $('#Division').attr("disabled", true);
        $('#Npd_Category').attr("disabled", true);
        $("#Npd_ProjectName,#Npd_BusinessObjective,#PP_TargetConsumer,#PP_CompetitiveOfferings,#PP_UnmetNeed").prop("readonly", true);

        $('#PD_HGML_Remarks').val(jsonFormNpdHgmlReviewData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
        $('#PP_HGML_Remarks').val(jsonFormNpdHgmlReviewData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
        $('#FP_HGML_Remarks').val(jsonFormNpdHgmlReviewData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
        $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlReviewData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
        $('#BI_HGML_Remarks').val(jsonFormNpdHgmlReviewData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
        $('#SUS_HGML_Remarks').val(jsonFormNpdHgmlReviewData.SustainabilityHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark);

        $('#HgmlDataSendToHubConfirmation').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].DoYouWantSentToHub);

        if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {
            $('#HgmlData_HubDropdown').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].Hub)
            $('#HgmlData_HubUsersDropdown').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].HubUsers)
            $('#HgmlDataHgmlToHubRemarks').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].HgmlToHubRemarks)

            $("#HgmlData_SendToHub_Yes").show();
            $("#HgmlData_SendToHub_No").hide();
            $(".Button_SendToPmd").hide();

            $("#HGML_Data").jqGrid("clearGridData");
        }
        else if ($('#HgmlDataSendToHubConfirmation').val() == 'No') {

            $("#HgmlData_SendToHub_Yes").hide();
            $("#HgmlData_SendToHub_No").show();
            $(".Button_SendToHub").hide();
        }
        else {
            $("#HgmlData_SendToHub_Yes").hide();
            $("#HgmlData_SendToHub_No").hide();
        }
    }
    if (statusId == 2) {
        $('#Page_Heading').text('NPD-' + statusName);

        $(".NotInNpdHgmlReview").hide();

        $('#Division').attr("disabled", true);
        $('#Npd_Category').attr("disabled", true);
        $("#Npd_ProjectName,#Npd_BusinessObjective,#PP_TargetConsumer,#PP_CompetitiveOfferings,#PP_UnmetNeed").prop("readonly", true);

        $('#PD_HGML_Remarks').val(jsonFormNpdHgmlReviewData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
        $('#PP_HGML_Remarks').val(jsonFormNpdHgmlReviewData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
        $('#FP_HGML_Remarks').val(jsonFormNpdHgmlReviewData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
        $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlReviewData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
        $('#BI_HGML_Remarks').val(jsonFormNpdHgmlReviewData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
        $('#SUS_HGML_Remarks').val(jsonFormNpdHgmlReviewData.SustainabilityHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark);

        $('#HgmlDataSendToHubConfirmation').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].DoYouWantSentToHub);

        if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

            $('#HgmlData_HubDropdown').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].Hub)
            $('#HgmlData_HubUsersDropdown').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].HubUsers)
            $('#HgmlDataHgmlToHubRemarks').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].HgmlToHubRemarks)

            $("#HgmlData_SendToHub_Yes").show();
            $("#HgmlData_SendToHub_No").hide();
            $(".Button_SendToPmd").hide();

            $("#HGML_Data").jqGrid("clearGridData");
        }
        else if ($('#HgmlDataSendToHubConfirmation').val() == 'No') {

            $("#HgmlData_SendToHub_Yes").hide();
            $("#HgmlData_SendToHub_No").show();
            $(".Button_SendToHub").hide();
        }
        else {
            $("#HgmlData_SendToHub_Yes").hide();
            $("#HgmlData_SendToHub_No").hide();
        }
    }

    if (statusId == 8) {
        $(".NotInNpd").hide();
        $('#Page_Heading').text('NPD-' + statusName);
    }
    if (statusId == 11) {
        $('#Page_Heading').text('NPD-' + statusName);

        $(".NotInNpd").hide();
    }
    if (statusId == 9) {
        $('#Page_Heading').text('NPD-' + statusName)
        $(".NotInNpd").hide();
    }

    if (statusId == 3) {
        $('#Page_Heading').text('NPD-' + statusName);
        $(".NotInHubReview").hide();

        $('#Division').attr("disabled", true);
        $('#Npd_Category').attr("disabled", true);
        $("#Npd_ProjectName,#Npd_BusinessObjective,#PP_TargetConsumer,#PP_CompetitiveOfferings,#PP_UnmetNeed,#PD_HGML_Remarks,#PP_HGML_Remarks,#FP_HGML_Remarks,#PPR_HGML_Remarks,#BI_HGML_Remarks,#SUS_HGML_Remarks").prop("readonly", true);

        $("#Business_Information").jqGrid("clearGridData");
        $("#Business_Information").jqGrid('setGridParam', { data: jsonFormNpdHubReviewData["BusinessInformation"] });
        $("#Business_Information").trigger('reloadGrid', [{ page: 1 }]);
        $('#HubApproveConfirmation').val(jsonFormNpdHubReviewData["HubApproveConfirmationList"].length == 0 ? "" : (jsonFormNpdHubReviewData.HubApproveConfirmationList[0].IsHubApproved != 'Yet to Confirm' ? jsonFormNpdHubReviewData.HubApproveConfirmationList[0].IsHubApproved : ""));
        $("#HubApproveConfirmation").select2();

        $('#PD_HGML_Remarks').val(jsonFormNpdHgmlReviewData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
        $('#PP_HGML_Remarks').val(jsonFormNpdHgmlReviewData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
        $('#FP_HGML_Remarks').val(jsonFormNpdHgmlReviewData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
        $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlReviewData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
        $('#BI_HGML_Remarks').val(jsonFormNpdHgmlReviewData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
        $('#HgmlOrHubData_HgmlToHubRemarks').val(jsonFormNpdHgmlReviewData.HgmlDataList.length == 0 ? "" : jsonFormNpdHgmlReviewData.HgmlDataList[0].HgmlToHubRemarks);
        $('#SUS_HGML_Remarks').val(jsonFormNpdHgmlReviewData.SustainabilityHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlReviewData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark);

        $('#PD_HUB_Remarks').val(jsonFormNpdHubReviewData.ProjectDetailsHubRemarksList.length == 0 ? "" : jsonFormNpdHubReviewData.ProjectDetailsHubRemarksList[0].ProjectDetailsHubRemarks);
        $('#PP_HUB_Remarks').val(jsonFormNpdHubReviewData.ProductPositioningHubRemarksList.length == 0 ? "" : jsonFormNpdHubReviewData.ProductPositioningHubRemarksList[0].ProductPositioningHubRemarks);
        $('#FP_HUB_Remarks').val(jsonFormNpdHubReviewData.FormulationProfileHubRemarksList.length == 0 ? "" : jsonFormNpdHubReviewData.FormulationProfileHubRemarksList[0].FormulationProfileHubRemarks);
        $('#PPR_HUB_Remarks').val(jsonFormNpdHubReviewData.PackagingProfileHubRemarksList.length == 0 ? "" : jsonFormNpdHubReviewData.PackagingProfileHubRemarksList[0].PackagingProfileHubRemarks);
        $('#BI_HUB_Remarks').val(jsonFormNpdHubReviewData.BusinessInformationHubRemarksList.length == 0 ? "" : jsonFormNpdHubReviewData.BusinessInformationHubRemarksList[0].BusinessInformationHubRemarks);
        $('#HgmlOrHubData_HUB_Remarks').val(jsonFormNpdHubReviewData.HgmlOrHubDataHubRemarksList.length == 0 ? "" : jsonFormNpdHubReviewData.HgmlOrHubDataHubRemarksList[0].HgmlOrHubDataHubRemarks);
        $('#SUS_HUB_Remarks').val(jsonFormNpdHubReviewData.SustainabilityHubRemarksList.length == 0 ? "" : jsonFormNpdHubReviewData.SustainabilityHubRemarksList[0].SustainabilityHubRemarks);

        $('.Initiator_BusinessInformation_Link').text("" + jsonFormNpdData.NpdHeaderTable.length > 0 ? jsonFormNpdData.NpdHeaderTable[0].Hub + ' Business Information' : '' + " " + $('.Initiator_BusinessInformation_Link').text() + "");
        $('#HubBusinessInformationPopupHeading').text(jsonFormNpdData.NpdHeaderTable.length > 0 ? jsonFormNpdData.NpdHeaderTable[0].Hub : '' + " Business Information");

        $('#HgmlData_HubParticipatingMarkets').val(jsonFormNpdHubReviewData.HgmlDataHubParticipatingMarketsList.length == 0 ? "" : jsonFormNpdHubReviewData.HgmlDataHubParticipatingMarketsList[0].ParticipatingMarkets);
    }

    if (statusId == 4 || statusId == 14 || ((previoustatus == 4 || previoustatus == 14) && statusId == 7)) {
        if (statusId == 4) {

            $('#Page_Heading').text('NPD-' + statusName);
        } else {
            $('#Page_Heading').text('NPD-' + 'Brief Demoted to HGML');
        }

        $('.NotInHgmlApprove').hide();

        $('#Division').attr("disabled", true);
        $('#Npd_Category').attr("disabled", true);
        $("#Npd_ProjectName,#Npd_BusinessObjective,#PP_TargetConsumer,#PP_CompetitiveOfferings,#PP_UnmetNeed").prop("readonly", true);

        $('#PD_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
        $('#PP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
        $('#FP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
        $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
        $('#BI_HGML_Remarks').val(jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
        $('#SUS_HGML_Remarks').val(jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark);

        $("#HGML_Data").jqGrid("clearGridData");
        $("#HGML_Data").jqGrid('setGridParam', { data: jsonFormNpdHgmlApproveData["HgmlDataList"].length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlDataList"] });
        $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

        if (jsonFormNpdHgmlApproveData.length != 0) {

            var productPositioningHubRemarks = jsonFormNpdHgmlApproveData["HgmlApproveProductPositioningHubRemarks"];

            var uniqueProductPositioningHubRemarks = productPositioningHubRemarks.reduce((unique, o) => {
                if (!unique.some(obj => obj.Hub === o.Hub)) {
                    unique.push(o);
                }
                return unique;
            }, []);

            var htmlSpanTag = "";

            $.each(uniqueProductPositioningHubRemarks, function (i, data) {

                htmlSpanTag += '<span class="hub_view" id="' + data.Hub + 'HubProductPositioningRemark" data-bs-toggle="modal" onclick="onClickOfProductPositioningHubRemarksLink(\'' + data.Hub + '\')" > ' + data.Hub + ' Remarks</span>';
            });

            $(".ProductPositioningHubRemarks_Link").html(htmlSpanTag);
        }


        var hubBusinessInformation = jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationData"];

        if (hubBusinessInformation != '') {
            var uniquehubBusinessInformation = hubBusinessInformation.reduce((unique, o) => {
                if (!unique.some(obj => obj.FromHubName === o.FromHubName)) {
                    unique.push(o);
                }
                return unique;
            }, []);

            var htmlSpanTag = "";

            $.each(uniquehubBusinessInformation, function (i, data) {

                htmlSpanTag += '<span class="hub_view" id="' + data.FromHubName + 'HubBusinessInformation" data-bs-toggle="modal" onclick="onClickOfHubBusinessInformationLink(\'' + data.FromHubName + '\')">' + data.FromHubName + ' Business Information</span>';
            });

            $(".HubBusinessInformation_Link").html(htmlSpanTag);

            var htmlSpanTag_V = "";

            $.each(uniquehubBusinessInformation, function (i, data) {

                htmlSpanTag_V += '<span class="hub_view" id="' + data.FromHubName + 'HubBusinessInformation_V" data-bs-toggle="modal" onclick="onClickOfHubBusinessInformationLink_V(\'' + data.FromHubName + '\')">' + data.FromHubName + ' Business Information</span>';
            });

            $(".HubBusinessInformation_Link_V").html(htmlSpanTag_V);
        }

        var hubApprovalData = jsonFormNpdHgmlApproveData['HubApprovalData'];

        var uniqueHubApprovalData = hubApprovalData.reduce((unique, o) => {
            if (!unique.some(obj => obj.HubName === o.HubName)) {

                unique.push(o);
            }
            return unique;
        }, []);

        var divTag = "";

        $.each(uniqueHubApprovalData, function (i, data) {

            if (data.IsHubApproved == "Yes") {
                divTag += `<div class="col-1 H_pad">
                                <label class="col-form-label">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" class="form-control green" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
            }
            else if (data.IsHubApproved == "No") {
                divTag += `<div class="col-1 H_pad" >
                                <label class="col-form-label">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" class="form-control red" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
            }
            else if (data.IsHubApproved == "Yet to Confirm") {
                divTag += `<div class="col-1 H_pad">
                                <label class="col-form-label">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" class="form-control orange" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
            }
        });

        $('#HubApprovalStatus').html(divTag);

        $("#HUB_ParticipatingMarkets").jqGrid("clearGridData");
        $("#HUB_ParticipatingMarkets").jqGrid('setGridParam', { data: jsonFormNpdHgmlApproveData["HgmlDataHubParticipatingMarketsList"].length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlDataHubParticipatingMarketsList"] });
        $("#HUB_ParticipatingMarkets").trigger('reloadGrid', [{ page: 1 }]);

        if (jsonFormNpdHgmlApproveData.HgmlDataHubParticipatingMarketsList.length > 0) {

            var hubParticipatingMarkets = jsonFormNpdHgmlApproveData.HgmlDataHubParticipatingMarketsList;
            var hubParticipatingMarketsList = [];
            $.each(hubParticipatingMarkets, function (i, data) {

                hubParticipatingMarketsList.push(data.ParticipatingMarkets);
            });
            hubParticipatingMarketsList = hubParticipatingMarketsList.toString().replaceAll(',', ', ');

            $('#HgmlData_ParticipatingMarkets').val(hubParticipatingMarketsList);
        }
    }

    if (statusId == 5 || statusId == 16 || ((previoustatus == 5 || previoustatus == 16) && statusId == 7)) {
        if (statusId != 7) {
            $('#Page_Heading').text('NPD-' + (statusName == 'Under Exploration' ? 'Extended Fine Screening Review' : statusName));

        }

        $(".NotInPmdReview").hide();

        $('#Division').attr("disabled", true);
        $('#Npd_Category').attr("disabled", true);
        $("#Npd_ProjectName,#Npd_BusinessObjective,#PP_TargetConsumer,#PP_CompetitiveOfferings,#PP_UnmetNeed,#PD_HGML_Remarks,#PP_HGML_Remarks,#FP_HGML_Remarks,#PPR_HGML_Remarks,#BI_HGML_Remarks,#SUS_HGML_Remarks").prop("readonly", true);

        $('#PD_Pmd_Remarks').val(jsonFormNpdPmdReviewData.ProjectDetailsPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.ProjectDetailsPmdRemarksList[0].ProjectDetailsPmdRemarks);
        $('#PP_Pmd_Remarks').val(jsonFormNpdPmdReviewData.ProductPositioningPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.ProductPositioningPmdRemarksList[0].ProductPositioningPmdRemarks);
        $('#FP_Pmd_Remarks').val(jsonFormNpdPmdReviewData.FormulationProfilePmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.FormulationProfilePmdRemarksList[0].FormulationProfilePmdRemarks);
        $('#PPR_Pmd_Remarks').val(jsonFormNpdPmdReviewData.PackagingProfilePmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.PackagingProfilePmdRemarksList[0].PackagingProfilePmdRemarks);
        $('#BI_Pmd_Remarks').val(jsonFormNpdPmdReviewData.BusinessInformationPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.BusinessInformationPmdRemarksList[0].BusinessInformationPmdRemarks);
        $('#SUS_PMD_Remarks').val(jsonFormNpdPmdReviewData.SustainabilityPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.SustainabilityPmdRemarksList[0].SustainabilityPmdRemarks);

        $('#PD_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
        $('#PP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
        $('#FP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
        $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
        $('#BI_HGML_Remarks').val(jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
        $('#SUS_HGML_Remarks').val(jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark);

        $("#HGML_Data").jqGrid("clearGridData");
        $("#HGML_Data").jqGrid('setGridParam', { data: jsonFormNpdHgmlApproveData["HgmlDataList"].length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlDataList"] });
        $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

        $('#PmdData_TargetFirstPrototypeSubmissionDate, #PmdData_TargetTTDCompletionDate, #PmdData_TargetProductionDate').val('');

        if (jsonFormNpdHgmlApproveData.length != 0) {

            var productPositioningHubRemarks = jsonFormNpdHgmlApproveData["HgmlApproveProductPositioningHubRemarks"];

            var uniqueProductPositioningHubRemarks = productPositioningHubRemarks.reduce((unique, o) => {
                if (!unique.some(obj => obj.Hub === o.Hub)) {
                    unique.push(o);
                }
                return unique;
            }, []);

            var htmlSpanTag = "";

            $.each(uniqueProductPositioningHubRemarks, function (i, data) {

                htmlSpanTag += '<span class="hub_view" id="' + data.Hub + 'HubProductPositioningRemark" data-bs-toggle="modal" onclick="onClickOfProductPositioningHubRemarksLink(\'' + data.Hub + '\')" > ' + data.Hub + ' Remarks</span>';
            });

            $(".ProductPositioningHubRemarks_Link").html(htmlSpanTag);
        }

        var hubBusinessInformation = jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationData"];

        if (hubBusinessInformation != '') {
            var uniquehubBusinessInformation = hubBusinessInformation.reduce((unique, o) => {
                if (!unique.some(obj => obj.FromHubName === o.FromHubName)) {
                    unique.push(o);
                }
                return unique;
            }, []);

            var htmlSpanTag = "";

            $.each(uniquehubBusinessInformation, function (i, data) {

                htmlSpanTag += '<span class="hub_view" id="' + data.Hub + 'HubBusinessInformation" data-bs-toggle="modal" onclick="onClickOfHubBusinessInformationLink(\'' + data.FromHubName + '\')">' + data.FromHubName + ' Business Information</span>';
            });

            $(".HubBusinessInformation_Link").html(htmlSpanTag);

            var htmlSpanTag_V = "";

            $.each(uniquehubBusinessInformation, function (i, data) {

                htmlSpanTag_V += '<span class="hub_view" id="' + data.Hub + 'HubBusinessInformation_V" data-bs-toggle="modal" onclick="onClickOfHubBusinessInformationLink_V(\'' + data.FromHubName + '\')">' + data.FromHubName + ' Business Information</span>';
            });

            $(".HubBusinessInformation_Link_V").html(htmlSpanTag_V);
        }

        var hubApprovalData = jsonFormNpdHgmlApproveData['HubApprovalData'];

        var uniqueHubApprovalData = hubApprovalData.reduce((unique, o) => {
            if (!unique.some(obj => obj.HubName === o.HubName)) {

                unique.push(o);
            }
            return unique;
        }, []);

        var divTag = "";

        $.each(uniqueHubApprovalData, function (i, data) {

            if (data.IsHubApproved == "Yes") {
                divTag += `<div class="col-1 H_pad">
                                <label class="col-form-label">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" class="form-control green" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
            }
            else if (data.IsHubApproved == "No") {
                divTag += `<div class="col-1 H_pad" >
                                <label class="col-form-label">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" class="form-control red" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
            }
            else if (data.IsHubApproved == "Yet to Confirm") {
                divTag += `< div class="col-1 H_pad" >
                                <label class="col-form-label">`+ data.HubName + `</label>
                           </div>
                           <div class="col-2">
                                <input type="text" class="form-control orange" value="`+ data.IsHubApproved + `" readonly>
                           </div>`
            }
        });

        $('#HubApprovalStatus').html(divTag);
    }

    if (statusId == 6) {

        $('#Page_Heading').text('NPD-' + statusName);
        $('.NotInApproved').hide();

        $('#Division').attr("disabled", true);
        $('#Npd_Category').attr("disabled", true);
        $("#Npd_ProjectName,#Npd_BusinessObjective,#PP_TargetConsumer,#PP_CompetitiveOfferings,#PP_UnmetNeed,#PD_HGML_Remarks,#PP_HGML_Remarks,#FP_HGML_Remarks,#PPR_HGML_Remarks,#BI_HGML_Remarks,#SUS_HGML_Remarks").prop("readonly", true);

        $('#PD_Pmd_Remarks').val(jsonFormNpdPmdReviewData.ProjectDetailsPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.ProjectDetailsPmdRemarksList[0].ProjectDetailsPmdRemarks);
        $('#PP_Pmd_Remarks').val(jsonFormNpdPmdReviewData.ProductPositioningPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.ProductPositioningPmdRemarksList[0].ProductPositioningPmdRemarks);
        $('#FP_Pmd_Remarks').val(jsonFormNpdPmdReviewData.FormulationProfilePmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.FormulationProfilePmdRemarksList[0].FormulationProfilePmdRemarks);
        $('#PPR_Pmd_Remarks').val(jsonFormNpdPmdReviewData.PackagingProfilePmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.PackagingProfilePmdRemarksList[0].PackagingProfilePmdRemarks);
        $('#BI_Pmd_Remarks').val(jsonFormNpdPmdReviewData.BusinessInformationPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.BusinessInformationPmdRemarksList[0].BusinessInformationPmdRemarks);
        $('#SUS_PMD_Remarks').val(jsonFormNpdPmdReviewData.SustainabilityPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.SustainabilityPmdRemarksList[0].SustainabilityPmdRemarks);

        $('#PD_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
        $('#PP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
        $('#FP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
        $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
        $('#BI_HGML_Remarks').val(jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
        $('#SUS_HGML_Remarks').val(jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark);

        $("#HGML_Data").jqGrid("clearGridData");
        $("#HGML_Data").jqGrid('setGridParam', { data: jsonFormNpdHgmlApproveData["HgmlDataList"].length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlDataList"] });
        $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

        if (jsonFormNpdHgmlApproveData.length != 0) {

            var productPositioningHubRemarks = jsonFormNpdHgmlApproveData["HgmlApproveProductPositioningHubRemarks"];

            var uniqueProductPositioningHubRemarks = productPositioningHubRemarks.reduce((unique, o) => {
                if (!unique.some(obj => obj.Hub === o.Hub)) {
                    unique.push(o);
                }
                return unique;
            }, []);

            var htmlSpanTag = "";

            $.each(uniqueProductPositioningHubRemarks, function (i, data) {

                htmlSpanTag += '<span class="hub_view" id="' + data.Hub + 'HubProductPositioningRemark" data-bs-toggle="modal" onclick="onClickOfProductPositioningHubRemarksLink(\'' + data.Hub + '\')" > ' + data.Hub + ' Remarks</span>';
            });

            $(".ProductPositioningHubRemarks_Link").html(htmlSpanTag);
        }

        var hubBusinessInformation = jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationData"].length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationData"];

        if (hubBusinessInformation != '') {
            var uniquehubBusinessInformation = hubBusinessInformation.reduce((unique, o) => {
                if (!unique.some(obj => obj.FromHubName === o.FromHubName)) {
                    unique.push(o);
                }
                return unique;
            }, []);

            var htmlSpanTag = "";

            $.each(uniquehubBusinessInformation, function (i, data) {

                htmlSpanTag += '<span class="hub_view" id="' + data.Hub + 'HubBusinessInformation" data-bs-toggle="modal" onclick="onClickOfHubBusinessInformationLink(\'' + data.FromHubName + '\')">' + data.FromHubName + ' Business Information</span>';
            });

            $(".HubBusinessInformation_Link").html(htmlSpanTag);

            var htmlSpanTag_V = "";

            $.each(uniquehubBusinessInformation, function (i, data) {

                htmlSpanTag_V += '<span class="hub_view" id="' + data.Hub + 'HubBusinessInformation_V" data-bs-toggle="modal" onclick="onClickOfHubBusinessInformationLink_V(\'' + data.FromHubName + '\')">' + data.FromHubName + ' Business Information</span>';
            });

            $(".HubBusinessInformation_Link_V").html(htmlSpanTag_V);

        }
    }

    if (statusId == 12) {

        $('#Page_Heading').text('NPD-' + statusName);
        $('.NotInApproved').hide();

        $('#Division').attr("disabled", true);
        $('#Npd_Category').attr("disabled", true);
        $("#Npd_ProjectName,#Npd_BusinessObjective,#PP_TargetConsumer,#PP_CompetitiveOfferings,#PP_UnmetNeed,#PD_HGML_Remarks,#PP_HGML_Remarks,#FP_HGML_Remarks,#PPR_HGML_Remarks,#BI_HGML_Remarks,#SUS_HGML_Remarks").prop("readonly", true);

        $('#PD_Pmd_Remarks').val(jsonFormNpdPmdReviewData.ProjectDetailsPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.ProjectDetailsPmdRemarksList[0].ProjectDetailsPmdRemarks);
        $('#PP_Pmd_Remarks').val(jsonFormNpdPmdReviewData.ProductPositioningPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.ProductPositioningPmdRemarksList[0].ProductPositioningPmdRemarks);
        $('#FP_Pmd_Remarks').val(jsonFormNpdPmdReviewData.FormulationProfilePmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.FormulationProfilePmdRemarksList[0].FormulationProfilePmdRemarks);
        $('#PPR_Pmd_Remarks').val(jsonFormNpdPmdReviewData.PackagingProfilePmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.PackagingProfilePmdRemarksList[0].PackagingProfilePmdRemarks);
        $('#BI_Pmd_Remarks').val(jsonFormNpdPmdReviewData.BusinessInformationPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.BusinessInformationPmdRemarksList[0].BusinessInformationPmdRemarks);
        $('#SUS_PMD_Remarks').val(jsonFormNpdPmdReviewData.SustainabilityPmdRemarksList.length == 0 ? "" : jsonFormNpdPmdReviewData.SustainabilityPmdRemarksList[0].SustainabilityPmdRemarks);

        $('#PD_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
        $('#PP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
        $('#FP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
        $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
        $('#BI_HGML_Remarks').val(jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
        $('#SUS_HGML_Remarks').val(jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark);

        $("#HGML_Data").jqGrid("clearGridData");
        $("#HGML_Data").jqGrid('setGridParam', { data: jsonFormNpdHgmlApproveData["HgmlDataList"].length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlDataList"] });
        $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

        if (jsonFormNpdHgmlApproveData.length != 0) {
            var productPositioningHubRemarks = jsonFormNpdHgmlApproveData["HgmlApproveProductPositioningHubRemarks"];
            var uniqueProductPositioningHubRemarks = productPositioningHubRemarks.reduce((unique, o) => {
                if (!unique.some(obj => obj.Hub === o.Hub)) {
                    unique.push(o);
                }
                return unique;
            }, []);

            var htmlSpanTag = "";

            $.each(uniqueProductPositioningHubRemarks, function (i, data) {

                htmlSpanTag += '<span class="hub_view" id="' + data.Hub + 'HubProductPositioningRemark" data-bs-toggle="modal" onclick="onClickOfProductPositioningHubRemarksLink(\'' + data.Hub + '\')" > ' + data.Hub + ' Remarks</span>';
            });

            $(".ProductPositioningHubRemarks_Link").html(htmlSpanTag);
        }

        var hubBusinessInformation = jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationData"].length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationData"];

        if (hubBusinessInformation != '') {
            var uniquehubBusinessInformation = hubBusinessInformation.reduce((unique, o) => {
                if (!unique.some(obj => obj.FromHubName === o.FromHubName)) {
                    unique.push(o);
                }
                return unique;
            }, []);

            var htmlSpanTag = "";

            $.each(uniquehubBusinessInformation, function (i, data) {

                htmlSpanTag += '<span class="hub_view" id="' + data.Hub + 'HubBusinessInformation" data-bs-toggle="modal" onclick="onClickOfHubBusinessInformationLink(\'' + data.FromHubName + '\')">' + data.FromHubName + ' Business Information</span>';
            });
            $(".HubBusinessInformation_Link").html(htmlSpanTag);
        }
    }

    if (statusId == 7) {
        $('.NotInRejected').hide();
        $('.NotInNpdHgmlReview').hide();

        $('#Page_Heading').text('NPD-' + statusName);

        $('#Division').attr("disabled", true);
        $('#Npd_Category').attr("disabled", true);
        $("#Npd_ProjectName,#Npd_BusinessObjective,#PP_TargetConsumer,#PP_CompetitiveOfferings,#PP_UnmetNeed,#PD_HGML_Remarks,#PP_HGML_Remarks,#FP_HGML_Remarks,#PPR_HGML_Remarks,#BI_HGML_Remarks,#SUS_HGML_Remarks").prop("readonly", true);

        $('#PD_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProjectDetailsHGMLRemarksList[0].ProjectDetailsHgmlRemark);
        $('#PP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.ProductPositioningHGMLRemarksList[0].ProductPositioningHgmlRemark);
        $('#FP_HGML_Remarks').val(jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.FormulationProfileHGMLRemarksList[0].FormulationProfileHgmlRemark);
        $('#PPR_HGML_Remarks').val(jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.PackagingProfileHGMLRemarksList[0].PackagingProfileHgmlRemark);
        $('#BI_HGML_Remarks').val(jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.BusinessInformationHGMLRemarksList[0].BusinessInformationHgmlRemark);
        $('#SUS_HGML_Remarks').val(jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList.length == 0 ? "" : jsonFormNpdHgmlApproveData.SustainabilityHGMLRemarksList[0].SustainabilityHgmlRemark);

        if (previoustatus == "5" || previoustatus == "16") {
            $(".OnlyPMDReject").show();
        }
        else if (previoustatus == "4" || previoustatus == "14") {
            $(".Project_Details_HubRemarks").show();
            $(".Product_Positioning_HubRemarks_Link").show();
            $(".inHGMLApprovereject").show();
            $(".Formulation_Profile_HubRemarks").show();
            $(".Packaging_Profile_HubRemarks").show();
            $(".Sustainability_HubRemarks").show();
            $(".OnlyPMDReject").hide();
        }
        else if (previoustatus == "2" || previoustatus == "13") {
            $(".OnlyPMDReject").hide();
        }
    }
    if (jsonFormNpdData.ProductPositioning.length != 0) {
        productPositioningProductNameList = jQuery('#Product_Positioning').jqGrid("getCol", "Product");

        //formulationProfileProductNameList = $("#Formulation_Profile").jqGrid("getCol", "Product");
        formulationProfileProductNameList = formulationProfileData_1.map(m => m.Product);
        formulationProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, formulationProfileProductNameList) == -1 });

        //packagingProfileProductNameList = $("#Packaging_Profile").jqGrid("getCol", "Product");
        packagingProfileProductNameList = packagingProfileData_1.map(m => m.Product);
        packagingProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, packagingProfileProductNameList) == -1 });

        businessInformationProductNameList = $("#Business_Information").jqGrid("getCol", "Product");
        businessInformationProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, businessInformationProductNameList) == -1 });

        hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, hgmlDataProductNameList) == -1 });

        pmdDataProductNameList = $("#PMD_Data").jqGrid("getCol", "ProductName");
        pmdDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, pmdDataProductNameList) == -1 });

        sustainabilityProductNameList = $("#Table_Sustainability").jqGrid("getCol", "Product");
        sustainabilityProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, sustainabilityProductNameList) == -1 });

        if (formulationProfileProductNameList.length > 0) {

            var productOption = "";

            $("option").remove("#FP_Product .ProductOption");

            $.each(formulationProfileProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#FP_Product").append(productOption);
        }

        if (productPositioningProductNameList.length > 0) {

            var productOption = "";

            $("option").remove("#PPR_Product .ProductOption");

            $.each(productPositioningProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PPR_Product").append(productOption);
            $("#BI_Product").append(productOption);
            $("#TC_ProductName").append(productOption);
        }

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

        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $("option").remove("#PmdData_ProductName .ProductOption");

            $.each(pmdDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PmdData_ProductName").append(productOption);
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
    }

    if (statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12) {

        jsonFormNpdHgmlApproveData["HgmlApproveProjectDetailsHubRemarks"].length == 0 ? $(".Project_Details_HubRemarks").hide() : $(".Project_Details_HubRemarks").show();
        jsonFormNpdHgmlApproveData["HgmlApproveProductPositioningHubRemarks"].length == 0 ? $(".Product_Positioning_HubRemarks_Link").hide() : $(".Product_Positioning_HubRemarks_Link").show();
        jsonFormNpdHgmlApproveData["HgmlApproveFormulationProfileHubRemarks"].length == 0 ? $(".Formulation_Profile_HubRemarks").hide() : $(".Formulation_Profile_HubRemarks").show();
        jsonFormNpdHgmlApproveData["HgmlApprovePackagingProfileHubRemarks"].length == 0 ? $(".Packaging_Profile_HubRemarks").hide() : $(".Packaging_Profile_HubRemarks").show();
        jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationHubRemarks"].length == 0 ? $(".Business_Information_HubRemarks").hide() : $(".Business_Information_HubRemarks").show();
        jsonFormNpdHgmlApproveData["HgmlApproveSustainabilityHubRemarks"].length == 0 ? $(".Sustainability_HubRemarks").hide() : $(".Sustainability_HubRemarks").show();

    }
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
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

//Competitive Offerings

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

//Unmet Need

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

CKEDITOR.replace('PP_HUB_Remarks', {
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

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center action_icons icon_section align-items-left">
            <a onclick=onEditProductPositioning(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
            <a onclick=onDeleteProductPositioning(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete"  title="Delete"></i></a>
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
            if (statusId == 2 || statusId == 3 || statusId == 4 || statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12 || statusId == 7 || statusId == 13 || statusId == 14 || iconName == 'View') {
                jQuery("#Product_Positioning").jqGrid('hideCol', "Action");
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
$("#benefits_profile").hide();
$("#expected_profile").hide();

colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center action_icons icon_section align-items-left">
                        <a onclick=onEditFormulationProfile(` + options.rowId + `) class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
                        <a onclick=onDeleteFormulationProfile(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
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

            if (statusId == 1 || statusId == 8) {

                return `<div class="text-center action_icons icon_section align-items-left">` +
                    (rowobject.BenchmarkProductsImage == "" ? '<i></i>' : `<a onclick="DownloadBenchmarkProductsImage(` + options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `FP_DownloadBenchmarkProductsImage"><i class="fas fa-download color-download" title="Edit"></i></a>` +
                        '<a class="icon_color btn_button" title="View" id="' + options.rowId + '" href="' + ROOT + 'NPDImages/' + rowobject.BenchmarkProductsImage + '" target="_blank" ><i class="fas fa-eye color-eye" title="View"></i></a>' +
                        `<a onclick='onDeleteImage("Formulation_Profile","` + rowobject.BenchmarkProductsImage + `","` + options.rowId + `")' class="icon_color btn_button" title = "Delete" > <i class="fa fas fa-trash color-delete" title="Delete"></i></a >`) +
                    `</div>`;
            }
            else {
                return `<div class="text-center action_icons icon_section align-items-left">` +
                    (rowobject.BenchmarkProductsImage == "" ? '<i></i>' : `<a onclick="DownloadBenchmarkProductsImage(` + options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `FP_DownloadBenchmarkProductsImage"><i class="fas fa-download color-download" title="Edit"></i></a>` +
                        '<a class="icon_color btn_button" title="View" id="' + options.rowId + '" href="' + ROOT + 'NPDImages/' + rowobject.BenchmarkProductsImage + '" target="_blank" ><i class="fas fa-eye color-eye" title="View"></i></a>') +
                    `</div>`;
            }
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
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Formulation_Profile tbody tr");
            var objHeader = $("#Formulation_Profile tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }


            //If the status is HGML Review or HUB Review or HGML Approve or Fine Screening Review (PMD Review) or Approved or Rejected
            if (statusId == 2 || statusId == 3 || statusId == 4 || statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12 || statusId == 7 || statusId == 13 || statusId == 14 || iconName == 'View') {
                jQuery("#Formulation_Profile").jqGrid('hideCol', "Action");
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

//Product Profile: Packaging Profile

colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center action_icons icon_section align-items-left">
        <a onclick="onEditPackagingProfile(`+ options.rowId + `)" class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
        <a onclick="onDeletePackagingProfile(`+ options.rowId + `)" class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete"
           title="Delete"></i></a>
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

            if (statusId == 1 || statusId == 8) {
                return `<div class="text-center action_icons icon_section align-items-left">` +
                    (rowobject.ImagesUpload == "" ? '<i></i>' : `<a onclick="DownloadPackageImage(` + options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `PPR_DownloadPackageImagesUpload"><i class="fas fa-download color-download" title="Edit"></i></a>` +
                        '<a class="icon_color btn_button" title="View" id="' + options.rowId + '" href="' + ROOT + 'NPDImages/' + rowobject.ImagesUpload + '" target="_blank" ><i class="fas fa-eye color-eye" title="View"></i></a>' +
                        `<a onclick='onDeleteImage("Packaging_Profile","` + rowobject.ImagesUpload + `","` + options.rowId + `")' class="icon_color btn_button" title = "Delete" > <i class="fa fas fa-trash color-delete" title="Delete"></i></a >`) +
                    `</div>`;
            }
            else {
                return `<div class="text-center action_icons icon_section align-items-left">` +
                    (rowobject.ImagesUpload == "" ? '<i></i>' : `<a onclick="DownloadPackageImage(` + options.rowId + `)" class="icon_color btn_button" title="Edit" id="` + options.rowId + `PPR_DownloadPackageImagesUpload"><i class="fas fa-download color-download" title="Edit"></i></a>` +
                        '<a class="icon_color btn_button" title="View" id="' + options.rowId + '" href="' + ROOT + 'NPDImages/' + rowobject.ImagesUpload + '" target="_blank" ><i class="fas fa-eye color-eye" title="View"></i></a>') +
                    `</div>`;
            }
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

            //If the status is HGML Review or HUB Review or HGML Approve or PMD Review or Approved or Rejected or Update
            if (statusId == 2 || statusId == 3 || statusId == 4 || statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12 || statusId == 7 || statusId == 13 || statusId == 14 || iconName == 'View') {
                jQuery("#Packaging_Profile").jqGrid('hideCol', "Action");
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

$('.data-datepicker').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'dd-mm-yyyy',
    startDate: '+0d'
});


colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center action_icons icon_section align-items-left">
        <a onclick="onEditBusinessInformation(`+ options.rowId + `)" class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
        <a onclick="onDeleteBusinessInformation(`+ options.rowId + `)" class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
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

            //If the status is HGML Review or HGML Approve or Fine Screening Review(PMD Review) or Approved or Rejected or Update
            if (statusId == 2 || statusId == 4 || statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12 || statusId == 7 || statusId == 13 || statusId == 14 || iconName == 'View') {
                jQuery("#Business_Information").jqGrid('hideCol', "Action");
            }
        }
    });
$("#Business_Information_V").jqGrid({
    url: '',
    datatype: 'local',
    data: jsonFormNpdData['BusinessInformation'],
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

//Dependency dropdown for Category
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


/*Code to get date*/
var todayDate = new Date();
var EditRowId1 = 0;
var flag1;

$("#PP_TargetConsumer").keyup(function () {
    $("#PP_TargetConsumer").val() == "" ? $("#Error_PP_TargetConsumer").show() : $("#Error_PP_TargetConsumer").hide();
});
$("#PP_Product").keyup(function () {
    $("#Error_PP_Product").hide().text('');
});
$("#PP_Product").focusout(function () {
    var productName = $.trim($("#PP_Product").val()).toLowerCase();
    productName == "" ? ($("#Error_PP_Product").show().text('Please enter Product')) : $("#Error_PP_Product").hide().text('');
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

$("#Add_ProductPositioning").click(function () {
    var TargetConsumer = $.trim($("#PP_TargetConsumer").val());
    var Product = $.trim($("#PP_Product").val());
    var ExpectedFeatures = $.trim(CKEDITOR.instances["PP_ExpectedFeatures"].getData());
    var ExpectedBenefits = $.trim(CKEDITOR.instances["PP_ExpectedBenefits"].getData());
    var sku = $.trim($('#PP_Sku').val());
    var flag1 = true;

    var contentWithoutTags = ExpectedFeatures.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var ExpectedFeaturesactualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    var contentWithoutTags = ExpectedBenefits.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var ExpectedBenefitsactualData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    //To remove the unwanted spaces, coma's and to get the unique SKU from the entered SKU value
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
        Product == "" ? $("#Error_PP_Product").show().text('Please enter Product') : $("#Error_PP_Product").hide().text('');
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

                        $("#Business_Information").jqGrid('setCell', (i + 1), "Product", Product, { width: 90 });

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

            EditRowId1 = 0;
        }

        productPositioningProductNameList = jQuery('#Product_Positioning').jqGrid("getCol", "Product");

        formulationProfileProductNameList = formulationProfileData_1.map(m => m.Product);
        formulationProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, formulationProfileProductNameList) == -1 });

        packagingProfileProductNameList = packagingProfileData_1.map(m => m.Product);
        packagingProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, packagingProfileProductNameList) == -1 });

        businessInformationProductNameList = $("#Business_Information").jqGrid("getCol", "Product");
        businessInformationProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, businessInformationProductNameList) == -1 });

        hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        hgmlDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, hgmlDataProductNameList) == -1 });

        pmdDataProductNameList = $("#PMD_Data").jqGrid("getCol", "ProductName");
        pmdDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, pmdDataProductNameList) == -1 });

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


        $("option").remove("#PmdData_ProductName .ProductOption");
        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $.each(pmdDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PmdData_ProductName").append(productOption);
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

//On Clicking the edit button 
function onEditProductPositioning(editRowId) {

    EditRowId1 = editRowId;

    $(".Error_ProductPositioning").hide();

    var DataFromTheRow = jQuery('#Product_Positioning').jqGrid('getRowData', editRowId);

    $('#PP_Product').val(DataFromTheRow.Product);
    CKEDITOR.instances["PP_ExpectedFeatures"].setData(DataFromTheRow.ExpectedFeatures);
    CKEDITOR.instances["PP_ExpectedBenefits"].setData(DataFromTheRow.ExpectedBenefits);
    $('#PP_Sku').val(DataFromTheRow.Sku);
}

function onDeleteProductPositioning(deleteRowId = 0) {
    confirm("Deleting a Product from Product Positioning will delete all the records in Formulation Profile, Packaging Profile, Sustainability and Business Information respective to that Product. <br>  Are you sure you want to delete?", function () {
        debugger;
        var formulationProfileRowId = [];
        var packagingProfileRowId = [];
        var businessInformationRowId = [];
        var sustainabilityRowId = [];

        var productPositioningData = jQuery('#Product_Positioning').jqGrid('getRowData', deleteRowId);
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

        $("#Product_Positioning").jqGrid('delRowData', deleteRowId);
        $("#Product_Positioning").trigger('reloadGrid', [{ page: 1 }]);

        $.each(formulationProfileRowId.reverse(), function (i, fpRowId) {

            onDeleteFormulationProfile(fpRowId, '#FP_Table_' + fpRowId, 1);
        });

        $.each(packagingProfileRowId.reverse(), function (i, pprRowId) {

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

        packagingProfileProductNameList = productPositioningProductNameList.slice(0);
        //packagingProfileProductNameList = packagingProfileData_1.map(m => m.Product);
        //packagingProfileProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, packagingProfileProductNameList) == -1 });

        businessInformationProductNameList = $("#Business_Information").jqGrid("getCol", "Product");
        businessInformationProductNameList = productPositioningProductNameList.slice(0);
        //            $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, businessInformationProductNameList) == -1 });

        hgmlDataProductNameList = $("#HGML_Data").jqGrid("getCol", "Product");
        hgmlDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, hgmlDataProductNameList) == -1 });

        pmdDataProductNameList = $("#PMD_Data").jqGrid("getCol", "Product");
        pmdDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, pmdDataProductNameList) == -1 });

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
        if (packagingProfileProductNameList.length > 0) {

            var productOption = "";
            $.each(packagingProfileProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PPR_Product").append(productOption);
        }

        $("option").remove("#BI_Product .ProductOption");
        if (businessInformationProductNameList.length > 0) {

            var productOption = "";
            $.each(businessInformationProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#BI_Product").append(productOption);
        }

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

        $("option").remove("#PmdData_ProductName .ProductOption");
        if (pmdDataProductNameList.length > 0) {
            var productOption = "";
            $.each(pmdDataProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });
            $("#PmdData_ProductName").append(productOption);
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

var EditRowId2 = -1;
var FormulationimageGridData = [];
$("#Add_FormulationProfile").click(function () {


    var Product = $("#FP_Product").val();
    var DesiredIngredients = $.trim($("#FP_DesiredIngredients").val());
    var MustHaveClaims = $.trim($("#FP_MustHaveClaims").val());
    var NiceToHaveClaims = $.trim($("#FP_NiceToHaveClaims").val());
    var BenchmarkProducts = $.trim($("#FP_BenchmarkProducts").val());
    var flag2 = true;

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
            Product: Product,
            DesiredIngredients: $("#FP_DesiredIngredients").val(),
            IndicationOrConditions: $("#FP_IndicationOrConditions").val(),
            MustHaveClaims: $("#FP_MustHaveClaims").val(),
            NiceToHaveClaims: $("#FP_NiceToHaveClaims").val(),
            DosageForm: $("#FP_DosageForm").val(),
            BenchmarkProducts: $("#FP_BenchmarkProducts").val(),
            DesiredProductCharacteristics: $("#FP_DesiredProductCharacteristics").val(),
            BenchmarkProductsImage: BenchmarkProductsImagePathName
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
                                    <div class="justify-center_1 action_icons">
                                        <a onclick="onEditFormulationProfile(`+ fpRowId + `)" class="btn-icon -edit edithide"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
                                        <a onclick="onDeleteFormulationProfile(`+ fpRowId + `,'#FP_Table_` + fpRowId + `',0)" class="btn-icon -delete deletehide"><i class="fa fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                     ${FormulationProfile.BenchmarkProductsImage.length == '' || FormulationProfile.BenchmarkProductsImage == null ? '' : `
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

            if ($("#FP_BenchmarkProductsImage").val() != '' && DataFromTheRow.BenchmarkProductsImage.length > 0) {

                $.ajax({
                    type: 'POST',
                    url: ROOT + "ProjectBrief/DeleteImageFile",
                    data: { fileName: DataFromTheRow.BenchmarkProductsImage },
                    success: function (data) {

                    }
                });
            }

            if ($("#FP_BenchmarkProductsImage").val() == '' && DataFromTheRow.BenchmarkProductsImage.length > 0) {

                FormulationProfile = {
                    Product: Product,
                    DesiredIngredients: $("#FP_DesiredIngredients").val(),
                    IndicationOrConditions: $("#FP_IndicationOrConditions").val(),
                    MustHaveClaims: $("#FP_MustHaveClaims").val(),
                    NiceToHaveClaims: $("#FP_NiceToHaveClaims").val(),
                    DosageForm: $("#FP_DosageForm").val(),
                    BenchmarkProducts: $("#FP_BenchmarkProducts").val(),
                    DesiredProductCharacteristics: $("#FP_DesiredProductCharacteristics").val(),
                    BenchmarkProductsImage: BenchmarkProductsImagePathName
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
                                    <div class="justify-center_1 action_icons">
                                        <a onclick="onEditFormulationProfile(`+ EditRowId2 + `)" class="btn-icon -edit "><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
                                        <a onclick="onDeleteFormulationProfile(`+ EditRowId2 + `,'#FP_Table_` + EditRowId2 + `',0)" class="btn-icon -delete"><i class="fa fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                           ${editedRowdata.BenchmarkProductsImage.length == '' || editedRowdata.BenchmarkProductsImage == null ? '' : `
										    <a onclick="DispalyImages(` + EditRowId2 + `)" class="btn-icon -info imagesinfo" id="` + EditRowId2 + `_Images" title="Images info">
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
                    </tbody>`
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
        $('#deleteSelectedFile').hide()

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
function onEditFormulationProfile(editRowId) {

    EditRowId2 = editRowId;

    $(".Error_FormulationProfile").hide();

    var DataFromTheRow = formulationProfileData_1[editRowId];
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

    $("#Display_FP_BenchmarkProductsImage").text(DataFromTheRow.BenchmarkProductsImage);
    $('#FP_BenchmarkProductsImage').val('');
}
function onDeleteFormulationProfile(deleteRowId = -1, tableId, flag = 0) {

    var DataFromTheRow = formulationProfileData_1[deleteRowId];
    var FileName = DataFromTheRow.BenchmarkProductsImage;
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

        delete formulationProfileData_1[deleteRowId];
        $(tableId).remove();
        $(`.FP_Table_Break` + deleteRowId).remove();
        var deletePresentedTable = []
        if (FormulationimageGrid.length > 0) {
            for (i = 0; i < FormulationimageGrid.length; i++) {
                if (deleteRowId == FormulationimageGrid[i].TableClass) {
                    deletePresentedTable.push(deleteRowId)
                }
            }
        }
        FormulationimageGrid = FormulationimageGrid.filter(obj1 =>
            !deletePresentedTable.some(obj2 =>
                obj2 === obj1.TableClass
            )
        );
    }
    else {
        confirm("Are you sure you want to delete?", function () {

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

            delete formulationProfileData_1[deleteRowId];
            $(tableId).remove();
            $(`.FP_Table_Break` + deleteRowId).remove();

            $('.FormulationProfile').val("");                            // To reset the textbox fields
            $('#Display_FP_BenchmarkProductsImage').empty();
            var deletePresentedTable = []
            if (FormulationimageGrid.length > 0) {
                for (i = 0; i < FormulationimageGrid.length; i++) {
                    if (deleteRowId == FormulationimageGrid[i].TableClass) {
                        deletePresentedTable.push(deleteRowId)
                    }
                }
            }
            FormulationimageGrid = FormulationimageGrid.filter(obj1 =>
                !deletePresentedTable.some(obj2 =>
                    obj2 === obj1.TableClass
                )
            );
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

//To download Benchmark Products Image
function DownloadBenchmarkProductsImage(rowId) {

    var filename = formulationProfileData_1[rowId].BenchmarkProductsImage;
    if (filename != null && filename != '') {
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
CKEDITOR.instances['PPR_PrimaryPackaging'].on('change', function () {
    CKEDITOR.instances["PPR_PrimaryPackaging"].getData() == '' ? '' : $("#Error_PPR_PrimaryPackaging").hide();
});
var EditRowId3 = -1;
var imageGridData = [];
$("#Add_PackagingProfile").click(function () {


    var Product = $("#PPR_Product").val();
    var SKU = $.trim($("#PPR_SKU").val());
    var PrimaryPackaging = $.trim(CKEDITOR.instances["PPR_PrimaryPackaging"].getData());
    var flag3 = true;

    var contentWithoutTags = PrimaryPackaging.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
    var PrimaryPackagingData = contentWithoutTags.replace(/&nbsp;/g, "").trim();

    EditRowId3 == -1 && $("#Error_PPR_Product").text() != '' ? flag3 = false : "";

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

            if (item.Product == Product && EditRowId3 != (index)) {

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

        $(".Error_PackagingProfile").hide();

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
            Product: Product,
            SKU: $("#PPR_SKU").val().toString(),
            PrimaryPackaging: $.trim(CKEDITOR.instances["PPR_PrimaryPackaging"].getData()),
            SecondaryPackaging: $.trim(CKEDITOR.instances["PPR_SecondaryPackaging"].getData()),
            TertiaryPackaging: $.trim(CKEDITOR.instances["PPR_TertiaryPackaging"].getData()),
            BenchmarkProducts: $.trim(CKEDITOR.instances["PPR_BenchmarkProducts"].getData()),
            DesiredPackagingCharacteristics: $.trim(CKEDITOR.instances["PPR_DesiredPackagingCharacteristics"].getData()),
            Others: $.trim(CKEDITOR.instances["PPR_Others"].getData()),
            Mould: $("#PPR_Mould").val(),
            ImagesUpload: PackageImageFileName,
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
                            <div class="justify-center_1 action_icons">
                                <a onclick="onEditPackagingProfile(`+ ppRowId + `)" class="btn-icon -edit edithide"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
                                <a onclick="onDeletePackagingProfile(`+ ppRowId + `,'#PPR_Table_` + ppRowId + `',0)" class="btn-icon -delete deletehide"><i class="fa fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                      ${PackagingProfile.ImagesUpload.length == '' || PackagingProfile.ImagesUpload == null ? '' : `
                            
						      <a onclick="ShowImages(` + ppRowId + `)" class="btn-icon -info imagesinfo" id="` + ppRowId + `_Images" title="Images info">
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

            if ($("#PPR_ImagesUpload").val() != '' && DataFromTheRow.ImagesUpload.length > 0) {
                $.ajax({
                    type: 'POST',
                    url: ROOT + "ProjectBrief/DeleteImageFile",
                    data: { fileName: DataFromTheRow.ImagesUpload },
                    success: function (data) {

                    }
                });
            }

            if ($("#PPR_ImagesUpload").val() == '' && DataFromTheRow.ImagesUpload.length > 0) {

                PackagingProfile = {
                    Product: Product,
                    SKU: $("#PPR_SKU").val().toString(),
                    PrimaryPackaging: $.trim(CKEDITOR.instances["PPR_PrimaryPackaging"].getData()),
                    SecondaryPackaging: $.trim(CKEDITOR.instances["PPR_SecondaryPackaging"].getData()),
                    TertiaryPackaging: $.trim(CKEDITOR.instances["PPR_TertiaryPackaging"].getData()),
                    BenchmarkProducts: $.trim(CKEDITOR.instances["PPR_BenchmarkProducts"].getData()),
                    DesiredPackagingCharacteristics: $.trim(CKEDITOR.instances["PPR_DesiredPackagingCharacteristics"].getData()),
                    Others: $.trim(CKEDITOR.instances["PPR_Others"].getData()),
                    Mould: $("#PPR_Mould").val(),
                    ImagesUpload: PackageImageFileName,
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
                                <div class="justify-center_1 action_icons">
                                    <a onclick="onEditPackagingProfile(`+ EditRowId3 + `)" class="btn-icon -edit edithide"><i class="fas fa-pen pr-2 color-info"></i></a>
                                    <a onclick="onDeletePackagingProfile(`+ EditRowId3 + `,'#PPR_Table_` + EditRowId3 + `',0)" class="btn-icon -delete deletehide"><i class="fa fas fa-trash color-delete" data-bs-toggle="modal" title="Delete"></i></a>
                                     ${editedRowdata.ImagesUpload.length == '' || editedRowdata.ImagesUpload == null ? '' : `
										    <a onclick="ShowImages(` + EditRowId3 + `)" class="btn-icon -info imagesinfo" id="` + EditRowId3 + `_Images" title="Images info">
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
        $('.PackagingProfile').val("");                            // To reset the text box fields
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

//On editing the Packaging Profile row data
function onEditPackagingProfile(RowId) {

    debugger;
    EditRowId3 = RowId;

    $(".Error_PackagingProfile").hide();
    var DataFromTheRow = packagingProfileData_1[RowId];
    var productList = packagingProfileData_1.map(m => m.Product);


    var productPositioningData = $("#Product_Positioning").jqGrid("getGridParam", "data");
    var skuArray = [];
    var selectedSkuArray = DataFromTheRow.SKU.split(',').map(item => item.trim());

    var ImageUpload = DataFromTheRow.ImagesUpload;

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
        DataFromTheRow.ImagesUpload = file;
    }


    $.each(productPositioningData, function (i, data) {

        if ($.trim(data.Product) == DataFromTheRow.Product) {

            skuArray = data.Sku.split(',').map(item => item.trim());
        }
    });

    var productList = packagingProfileData_1.map(m => m.Product);
    productPositioningProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    productPositioningProductNameList.push(DataFromTheRow.Product);

    $("option").remove("#PPR_Product .ProductOption");

    if (productPositioningProductNameList.length > 0) {

        var productOption = "";

        $.each(productPositioningProductNameList, function (i, obj) {

            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });

        $("#PPR_Product").append(productOption);
    }
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
    $("#Display_PackageImagesUpload").text(DataFromTheRow.ImagesUpload);
    $('#PPR_ImagesUpload').val('');

}

function onDeletePackagingProfile(deleteRowId = -1, tableId, flag = 0) {

    var DataFromTheRow = packagingProfileData_1[deleteRowId];
    var FileName = DataFromTheRow.ImagesUpload;
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

        delete packagingProfileData_1[deleteRowId];
        $(tableId).remove();
        $(`.PPR_Table_Break` + deleteRowId).remove();
        var deletePresentedTable = []
        if (imageGrid.length > 0) {
            for (i = 0; i < imageGrid.length; i++) {
                if (deleteRowId == imageGrid[i].TableClass) {
                    deletePresentedTable.push(deleteRowId)
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
        confirm("Are you sure you want to delete?", function () {
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

            delete packagingProfileData_1[deleteRowId];
            $(tableId).remove();
            $(`.PPR_Table_Break` + deleteRowId).remove();

            $("#Display_PackageImagesUpload").empty();
            $("option").remove("#PPR_SKU .SkuOption");
            $('#PPR_SKU').multiselect('rebuild');

            var deletePresentedTable = []
            if (imageGrid.length > 0) {
                for (i = 0; i < imageGrid.length; i++) {
                    if (deleteRowId == imageGrid[i].TableClass) {
                        deletePresentedTable.push(deleteRowId)
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

    var filename = packagingProfileData_1[rowId].ImagesUpload;

    if (filename != null && filename != '') {

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

    ((y1Quantity != "") && (y1Quantity <= sumOfMonthQuantity)) ? ($("#Error_BI_Y1Quantity").show().text('Y1 Quantity should be greater than ( M1 + M2 + M3 + M4 + M5 + M6 ) quantity'), flag4 = false) : "";

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
        var griddata = [];
        var BusinessInformation = {};
        $('.Error_BusinessInformation').hide();
        $("#Error_BI_Product").hide();

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
        }
        else {
            $("#Business_Information").jqGrid('setRowData', EditRowId4, BusinessInformation);
            $("#Business_Information").trigger('reloadGrid', [{ page: 1 }]);

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

function onEditBusinessInformation(editRowId) {

    EditRowId4 = editRowId;

    $(".Error_BusinessInformation").hide();

    var DataFromTheRow = jQuery('#Business_Information').jqGrid('getRowData', editRowId);

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
function onDeleteBusinessInformation(deleteRowId) {
    confirm("Are you sure you want to delete?", function () {

        $("#Business_Information").jqGrid('delRowData', deleteRowId);
        $("#Business_Information").trigger('reloadGrid', [{ page: 1 }]);

        $('.BusinessInformation').val("");
        $('#BI_ProposedLaunchDate').datepicker('destroy');
        $('.data-datepicker').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd-mm-yyyy',
            startDate: '+0d'
        });

        EditRowId4 = 0;
        deleteRowId = 0;
    });
}


/*By Clicking Submit button in NPD*/
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

/*By Clicking Submit button in NPD*/

function validateNpdSubmitForm() {

    $('#NPD_Submit_Ok').prop("disabled", false);
    $('#ManagerApprovalOK').prop("disabled", false);

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

    $('#Npd_Edit_Form_Submit').validate();
    if ($('#Npd_Edit_Form_Submit').valid()) {
    }
    else {
        flag = false;
    }

    if ($('#Npd_BusinessObjective-error').text() != '') {

        $("#Error_Npd_BusinessObjective").hide();
    }
    actualData == '' ? ($("#Error_Npd_BusinessObjective").show(), flag = false) : $("#Error_Npd_BusinessObjective").hide();
    projectName == "" ? ($('#Error_Npd_ProjectName').show(), flag = false) : $('#Error_Npd_ProjectName').hide();
    targetConsumer == "" ? ($('#Error_PP_TargetConsumer').show(), flag = false) : $('#Error_PP_TargetConsumer').hide();

    productPositioningGridData.length === 0 ? ($('#Error_ProductPositioning').show(), flag = false) : $('#Error_ProductPositioning').hide();
    formulationProfileGridData.length === 0 ? ($('#Error_FormulationProfile').show(), flag = false) : $('#Error_FormulationProfile').hide();
    packagingProfileGridData.length === 0 ? ($('#Error_PackagingProfile').show(), flag = false) : $('#Error_PackagingProfile').hide();
    businessInformationGridData.length === 0 ? ($('#Error_BusinessInformation').show(), flag = false) : $('#Error_BusinessInformation').hide();
    sustainabilityGridData.length === 0 ? ($('#Error_Sustainability').show(), flag = false) : $('#Error_Sustainability').hide();

    if (flag) {
        if (statusId == '9') {

            $('div#SubmitForHGML').modal('show');

            $("#ManagerApprovalOK").click(function () {
                $('#ManagerApprovalOK').prop("disabled", true);

                var Remarks = $('#ShowManagerApprovalRemarks').val();

                if (deletedImageNameList.length > 0) {

                    $.each(deletedImageNameList, function (index, fileName) {

                        if (fileName != '') {
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
                    FromStage: 9,
                    FromStageName: "Pending For Approval",
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
                $('#SendBackToInitiatorRemarks').val(Remarks);
                $('#NpdCurrentStatusName').val("New");
                $('#NpdStatus').val(2);
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));

                document.getElementById('Npd_Edit_Form_Submit').submit();

            });
        }

        else {
            $('div#SubmitModal').modal('show');
            $("#NPD_Submit_Ok").click(function () {

                $('#NPD_Submit_Ok').prop("disabled", true);

                if (deletedImageNameList.length > 0) {

                    $.each(deletedImageNameList, function (index, fileName) {

                        if (fileName != '') {
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


                if (statusId == 1) {
                    approvalStatus = [{
                        FromStage: 1,
                        FromStageName: "Draft",
                        Action: "Submit",
                        ToStage: 2,
                        ToStageName: "HGML Review"
                    }];
                }
                if (statusId == 8) {
                    approvalStatus = [{
                        FromStage: 8,
                        FromStageName: "Sent Back to Initiator",
                        Action: "Submit",
                        ToStage: 2,
                        ToStageName: "HGML Review"
                    }];
                }

                $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
                $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
                $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
                $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
                $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
                $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#NpdCurrentStatusName').val("New");
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))
                $('#NpdStatus').val(2);

                document.getElementById('Npd_Edit_Form_Submit').submit();

            });
        }
    }
}

/*By Clicking Save button in NPD*/
function validateNpdSaveForm() {


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

    //$('#Npd_Edit_Form_Submit').validate();
    //if ($('#Npd_Edit_Form_Submit').valid()) {
    //}
    //else {
    //    flag = false;
    //}
    if (flag) {

        $('div#SaveModal').modal('show');

        $("#NPD_Save_Ok").click(function () {

            $('#NPD_Save_Ok').prop("disabled", true);

            if (deletedImageNameList.length > 0) {

                $.each(deletedImageNameList, function (index, fileName) {

                    if (fileName != '') {
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
            if (deleteImageIn_imageGrid.length > 0) {
                $.each(deleteImageIn_imageGrid, function (index, obj) {
                    $.ajax({
                        type: 'POST',
                        url: ROOT + "ProjectBrief/DeleteImageFile",
                        data: { fileName: obj.DocumentName },
                        success: function (data) {
                            path = data;
                        }
                    });
                });
            }
            if (statusId == 1) {
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
                $('#NpdCurrentStatusName').val("New");

                $('#NpdStatus').val(1);
            }
            else if (statusId == 11) {
                $("#NPD_Table").each(function (i) {
                    npdHeaderTableData.push({
                        ProjectName: projectName,
                        ProjectType: "1",
                        Hub: $(this).find('#NPD_Hub').text(),
                        Division: $(this).find('#NPD_Division option:selected').val(),
                        Category: $(this).find('#NPD_Category option:selected').val(),
                        InitiatedBy: $.trim($(this).find('#NPD_InitiatedBy').text()),
                        InitiatedDate: $(this).find('#NPD_InitiatedDate').text(),
                        Status: "11"
                    });
                });
                $('#NpdCurrentStatusName').val("Brief Demoted to Initiator");
                $('#NpdStatus').val(11);
            } else if (statusId == 8) {
                $("#NPD_Table").each(function (i) {
                    npdHeaderTableData.push({
                        ProjectName: projectName,
                        ProjectType: "1",
                        Hub: $(this).find('#NPD_Hub').text(),
                        Division: $(this).find('#NPD_Division option:selected').val(),
                        Category: $(this).find('#NPD_Category option:selected').val(),
                        InitiatedBy: $.trim($(this).find('#NPD_InitiatedBy').text()),
                        InitiatedDate: $(this).find('#NPD_InitiatedDate').text(),
                        Status: "8"
                    });
                });
                $('#NpdCurrentStatusName').val("Sent Back to Initiator");
                $('#NpdStatus').val(8);
            }

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
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))
            $('#UserName').val($('#UserName').val());

            document.getElementById('Npd_Edit_Form_Submit').submit();

        });
    }
}

//To download pdf

$(".downloadPdf").click(function () {

    var fd = new FormData();

    var ProjectId = $("#ProjectId").val();
    var Status = statusId;

    $.ajax({
        url: ROOT + "ProjectBrief/PDFNPD",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectId: ProjectId, Type: "NPD", Status: Status },
        success: function (result) {
            $('.PDFNPD').html(result);
            var htmldata = $(".PDFNPD").html();
            fd.append('JsonString', htmldata)
            $.ajax({
                url: ROOT + 'ProjectBrief/GeneratePdfHtml',
                type: 'POST',
                dataType: 'HTML',
                data: fd,
                contentType: false,
                processData: false,
                success: function () {

                    window.location = window.location.origin + ROOT + 'ProjectBrief/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "NPD"
                }
            })
        }
    })
});


//*************************NPD HGML Review *********************//

//HGML Data

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
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

],

    $("#HGML_Data").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdHgmlReviewData.length == 0 ? [] : jsonFormNpdHgmlReviewData["HgmlDataList"],
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
            if (statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12 || iconName == 'View') {

                jQuery("#HGML_Data").jqGrid('hideCol', "Action");
            }
        }
    });
$("#HGML_Data_V").jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_HGML_V',
    rowNum: 20,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#HGML_Data_V tbody tr");
        var objHeader = $("#HGML_Data_V tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#HGML_Data_V").jqGrid('hideCol', "Action");
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

// On change of Send to HUB Confirmation

$("#HgmlDataSendToHubConfirmation").change(function () {
    ////
    var pofile = $("#HgmlDataSendToHubConfirmation").val();
    pofile == "" ? $('#Error_DoYouWantSentToHUB').show() : $('#Error_DoYouWantSentToHUB').hide();

    if (pofile == "Yes") {
        $('#SendtoUnderExploration').hide();
        $("#HgmlData_SendToHub_Yes").show();
        $("#HgmlData_SendToHub_No").hide();

        $('.Button_SendToHub').show();
        $('.Button_SendToPmd').hide();

    }
    else if (pofile == "No") {
        $('#SendtoUnderExploration').hide();
        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").show();

        $('.Button_SendToHub').hide();
        $('.Button_SendToPmd').show();
        for (var i = 0; i < jsonFormNpdData["ApprovalStatusData"].length; i++) {
            var id = jsonFormNpdData.ApprovalStatusData[i].FromStage
            if (id == 16) {
                $('.Button_SendToPmd').hide();
                $('#SendtoUnderExploration').show();
            }
        }
    }
    else {
        $("#HgmlData_SendToHub_Yes").hide();
        $("#HgmlData_SendToHub_No").hide();
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

$(document).ready(function () {
    $('.example-dropUp1').multiselect({
        enableFiltering: true,
        //includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });
});

//*******************HGML Data***********************//

var EditRowId1 = 0;

$("#HgmlData_ProductName").change(function () {

    var productName = $("#HgmlData_ProductName").val();
    productName == "" ? ($("#Error_HgmlDataProductName").show().text('Please select Product Name')) : $("#Error_HgmlDataProductName").hide().text('');

    const productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

    if (productName != "") {

        productList.includes(productName) ? ($("#Error_HgmlDataProductName").show().text('This Product already consists the definition, Please select the different Product Name')) : $("#Error_HgmlDataProductName").hide().text('');
    }
});
$("#HgmlData_ParticipatingMarkets").keyup(function () {
    $("#HgmlData_ParticipatingMarkets").val() == "" ? $("#Error_HgmlDataParticipatingMarkets").show() : $("#Error_HgmlDataParticipatingMarkets").hide();
});
$("#HgmlData_ProjectPriority").change(function () {
    $("#HgmlData_ProjectPriority").val() == "" ? $("#Error_HgmlDataProjectPriority").show() : $("#Error_HgmlDataProjectPriority").hide();
});

$(".Add_HGML_Data").click(function () {

    var productName = $("#HgmlData_ProductName").val();
    var participatingMarkets = $.trim($("#HgmlData_ParticipatingMarkets").val());
    var projectPriority = $.trim($("#HgmlData_ProjectPriority").val());
    var projectCategorization = $("#PmdData_ProjectCategorization").val();
    var flag1 = true;

    EditRowId1 == 0 && $("#Error_HgmlDataProductName").text() != '' ? flag1 = false : "";

    if (productName == "" || participatingMarkets == "" || projectPriority == "" || projectCategorization == "") {
        flag1 = false;

        productName == "" ? $("#Error_HgmlDataProductName").show().text('Please select Product Name') : $("#Error_HgmlDataProductName").hide().text('');
        participatingMarkets == "" ? $("#Error_HgmlDataParticipatingMarkets").show() : $("#Error_HgmlDataParticipatingMarkets").hide();
        projectPriority == "" ? $("#Error_HgmlDataProjectPriority").show() : $("#Error_HgmlDataProjectPriority").hide();
        projectCategorization == "" ? $(".Error_PmdData").show() : $(".Error_PmdData").hide();
    }

    if (flag1) {
        var griddata = [];
        var hgmlData = {};

        $('.Error_HgmlData').hide();

        hgmlData = {
            ProductName: productName,
            ParticipatingMarkets: participatingMarkets,
            ProjectPriority: projectPriority,
            Remarks: $("#HgmlData_Remarks").val(),
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

            $('#HgmlData_ProductName').attr('disabled', false);

            $("#HGML_Data").jqGrid('setRowData', EditRowId1, hgmlData);
            $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

            EditRowId1 = 0;
        }

        $('.HGMLData').val("");
        var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

        hgmlDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });

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
});

//On Clicking the edit button 
function onEditHgmlData(editRowId) {

    ////
    EditRowId1 = editRowId;

    $('.Error_HgmlData').hide();
    var DataFromTheRow = jQuery('#HGML_Data').jqGrid('getRowData', editRowId);
    var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");

    hgmlDataProductNameList = $.grep(hgmlDataProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    hgmlDataProductNameList.push(DataFromTheRow.ProductName);

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

    $('#HgmlData_ProductName').val(DataFromTheRow.ProductName);
    $('#HgmlData_ParticipatingMarkets').val(DataFromTheRow.ParticipatingMarkets);
    $('#HgmlData_ProjectPriority').val(DataFromTheRow.ProjectPriority);
    $('#HgmlData_Remarks').val(DataFromTheRow.Remarks);
    $('#PmdData_ProjectCategorization').val(DataFromTheRow.ProjectCategorization);

}

//On deleting the row data
function onDeleteHgmlData(deleteRowId) {

    var DataFromTheRow = jQuery('#HGML_Data').jqGrid('getRowData', deleteRowId);

    confirm("Are you sure you want to delete?", function () {

        $("#HGML_Data").jqGrid('delRowData', deleteRowId);
        $("#HGML_Data").trigger('reloadGrid', [{ page: 1 }]);

        deleteRowId = 0;
        EditRowId1 = 0;

        $('.HGMLData').val("");

        var productList = $("#HGML_Data").jqGrid("getCol", "ProductName");
        productPositioningProductNameList = $("#Product_Positioning").jqGrid("getCol", "Product");
        hgmlDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });

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
    });
}

// On click of Save button

function validateHgmlReviewSaveForm() {

    $('#NPD_Save_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var hgmlData = [];

    $('div#SaveModal').modal('show');
    $("#NPD_Save_Ok").click(function () {

        $('#NPD_Save_Ok').prop("disabled", true);

        if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

            hgmlData = [{
                Hub: $('#HgmlData_HubDropdown').val().toString(),
                HubUsers: $('#HgmlData_HubUsersDropdown').val().toString(),
                HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
            }]
        }
        else if ($('#HgmlDataSendToHubConfirmation').val() == 'No') {

            hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
        }

        if (statusId == 2) {
            $('#NpdStatus').val(2);
            $('#NpdCurrentStatusName').val("HGML Review");
        } else if (statusId == 13) {
            $('#NpdStatus').val(13);
            $('#NpdCurrentStatusName').val("Brief Demoted to HGML Review");

        }

        $('#HgmlData').val(JSON.stringify(hgmlData));
        $('#SavedRemarks').val(JSON.stringify(arrayDetails));
        $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

        document.getElementById('Npd_Edit_Form_Submit').submit();

    });
}

// On click of Send Back Initiator button

function validateHgmlReviewSendBackInitiatorForm() {
    $('#NPD_SendBackToInitiator_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var approvalStatus, hgmlData = [];
    var flag = true;

    $('div#SendbackModal').modal('show');

    $("#NPD_SendBackToInitiator_Ok").click(function () {

        var sendBackToInitiatorRemarks = $.trim($('#PopUp_SendBackToInitiatorRemarks').val());

        sendBackToInitiatorRemarks == "" ? ($('#Error_Npd_SendBackToInitiatorRemarks').show(), flag = false) : ($('#Error_Npd_SendBackToInitiatorRemarks').hide(), flag = true);

        if (flag) {

            $('#NPD_SendBackToInitiator_Ok').prop("disabled", true);

            if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

                hgmlData = [{
                    Hub: $('#HgmlData_HubDropdown').val().toString(),
                    HubUsers: $('#HgmlData_HubUsersDropdown').val().toString(),
                    HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
                }];
            }
            else if ($('#HgmlDataSendToHubConfirmation').val() == 'No') {

                hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
            }
            if (statusId == 2) {
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: "HGML Review",
                    Action: "Send Back",
                    ToStage: 8,
                    ToStageName: "Sent Back to Initiator"
                }];
                $('#NpdStatus').val(8);
                $('#NpdCurrentStatusName').val("HGML Review");
            } else if (statusId == 13) {

                approvalStatus = [{
                    FromStage: 13,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Send Back",
                    ToStage: 8,
                    ToStageName: "Sent Back to Initiator"
                }];
                $('#NpdStatus').val(8);
                $('#NpdCurrentStatusName').val("Brief Demoted to HGML Review");
            }
            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SendBackToInitiatorRemarks').val(sendBackToInitiatorRemarks);


            $('#SavedRemarks').val(JSON.stringify(arrayDetails));
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

            document.getElementById('Npd_Edit_Form_Submit').submit();
        }
    });
}
function validateHgmlReviewSendToHubForm() {

    $('#NPD_SendToHub_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var approvalStatus = [];
    var hgmlData = [];

    ($('#HgmlDataSendToHubConfirmation').val() == '' || $('#HgmlDataSendToHubConfirmation').val() == undefined) ? ($('#Error_DoYouWantSentToHUB').show(), flag = false) : $('#Error_DoYouWantSentToHUB').hide();

    if ($('#HgmlDataSendToHubConfirmation').val() == 'Yes') {

        flag = true;

        $('#HgmlData_HubDropdown').val() == '' ? ($('#Error_HgmlDataHub').show(), flag = false) : $('#Error_HgmlDataHub').hide();
        $('#HgmlData_HubUsersDropdown').val() == '' ? ($('#Error_HgmlDataHubUsers').show(), flag = false) : $('#Error_HgmlDataHubUsers').hide();
    }
    else {
        flag = false;
    }

    var hubSelected = $('#HgmlData_HubDropdown').find('option:selected').length;
    var hubUsersSelected = $('#HgmlData_HubUsersDropdown').find('option:selected').length;

    if (hubUsersSelected != 0 && (hubSelected != hubUsersSelected)) {
        flag = false;
        $('#Error_HgmlDataHubUsers1').show();
    }
    else {
        $('#Error_HgmlDataHubUsers1').hide();
    }

    if (flag)
        $('div#SendToHubModal').modal('show');

    $("#NPD_SendToHub_Ok").click(function () {

        var sendToHubRemarks = $.trim($('#PopUp_SendToHubRemarks').val());

        sendToHubRemarks == "" ? ($('#Error_Npd_SendToHubRemarks').show(), flag = false) : ($('#Error_Npd_SendToHubRemarks').hide(), flag = true);

        if (flag) {

            $('#NPD_SendToHub_Ok').prop("disabled", true);

            hgmlData = [{
                Hub: $('#HgmlData_HubDropdown').val().toString(),
                HubUsers: $('#HgmlData_HubUsersDropdown').val().toString(),
                HgmlToHubRemarks: $('#HgmlDataHgmlToHubRemarks').val()
            }];
            if (statusId == 2) {
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: "HGML Review",
                    Action: "Send to HUB",
                    ToStage: 3,
                    ToStageName: "HUB Review"
                }];
                $('#NpdStatus').val(3);
                $('#NpdCurrentStatusName').val("HGML Review");
            }
            if (statusId == 13) {
                approvalStatus = [{

                    FromStage: 13,
                    FromStageName: "Brief demoted to HGML",
                    Action: "Send to HUB",
                    ToStage: 3,
                    ToStageName: "HUB Review",

                }];
                $('#NpdStatus').val(3);
                $('#NpdCurrentStatusName').val("Brief Demoted to HGML Review");
            }

            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SendToHubRemarks').val(sendToHubRemarks);

            $('#SavedRemarks').val(JSON.stringify(arrayDetails));
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

            document.getElementById('Npd_Edit_Form_Submit').submit();
        }
    });
}

// On click of Send To PMD button

function validateHgmlReviewSendToPmdForm() {

    $('#NPD_SendToPmd_Ok').prop("disabled", false);
    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

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
            var sendToPmdRemarks = $.trim($('#PopUp_SendToPmdRemarks').val());

            sendToPmdRemarks == "" ? ($('#Error_Npd_SendToPmdRemarks').show(), flag = false) : ($('#Error_Npd_SendToPmdRemarks').hide(), flag = true);

            if (flag) {

                $('#NPD_SendToPmd_Ok').prop("disabled", true);
                if (statusId == 2) {
                    approvalStatus = [{
                        FromStage: 2,
                        FromStageName: "HGML Review",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#NpdStatus').val(5);
                    $('#NpdCurrentStatusName').val("HGML Review");

                } else if (statusId == 13) {
                    approvalStatus = [{
                        FromStage: 13,
                        FromStageName: "Brief Demoted to HGML",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#NpdStatus').val(5);
                    $('#NpdCurrentStatusName').val("Brief Demoted to HGML Review");
                }


                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SendToPmdRemarks').val(sendToPmdRemarks);
                $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

                document.getElementById('Npd_Edit_Form_Submit').submit();
            }
        });
    }
}

// On click of Reject button

function validateHgmlReviewRejectForm() {

    $('#NPD_Reject_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;

    $('div#RejectModal').modal('show');
    $('#Error_Npd_RejectRemarks').hide();

    var approvalStatus = [];
    $("#NPD_Reject_Ok").click(function () {

        var rejectRemarks = $.trim($('#PopUp_RejectRemarks').val());
        rejectRemarks == '' ? ($('#Error_Npd_RejectRemarks').show(), flag = false) : ($('#Error_Npd_RejectRemarks').hide(), flag = true);

        if (flag) {

            $('#NPD_Reject_Ok').prop("disabled", true);
            if (statusId == 2) {
                approvalStatus = [{
                    FromStage: 2,
                    FromStageName: "HGML Review",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#NpdStatus').val(7);
                $('#NpdCurrentStatusName').val("HGML Review");

            } else if (statusId == 13) {
                approvalStatus = [{
                    FromStage: 13,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#NpdStatus').val(7);
                $('#NpdCurrentStatusName').val("Brief Demoted to HGML Review");
            }


            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#RejectRemarks').val(rejectRemarks);
            $('#SavedRemarks').val(JSON.stringify(arrayDetails));
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

            document.getElementById('Npd_Edit_Form_Submit').submit();
        }
    });
}


//********************NPD HUB Review***********************//

//Initiator Business Information Pop Up

colmodels = [
    {
        name: 'NpdBusinessInformationId',
        label: 'Npd Business Information Id',
        width: 130,
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="demo-content">' +
                '<input type="text" class="form-control Product" readonly value="' + rowobject.Product + '">' +
                '</div>';

        }
    },
    {
        name: 'SKU',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="demo-content">' +
                '<input type="text" class="form-control SKU" readonly value="' + rowobject.SKU + '">' +
                '</div>';
        }
    },
    {
        name: 'ProposedLaunchDate',
        label: 'Proposed Launch Date',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" class="form-control ProposedLaunchDate data-datepicker" value="' + rowobject.ProposedLaunchDate + '">' + '<span class="ProposedLaunchDateerror-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" class="form-control ProposedLaunchDate" readonly value="' + rowobject.ProposedLaunchDate + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);" id="BI_ProposedSellingPrice" class="form-control ProposedSellingPrice" value="' + rowobject.ProposedSellingPrice + '">' + '<span class="ProposedSellingPriceerror-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);" class="form-control ProposedSellingPrice" readonly value="' + rowobject.ProposedSellingPrice + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'ProposedTP',
        label: 'Expected COP',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);" id="BI_ProposedTP" class="form-control ProposedTP" value="' + rowobject.ProposedTP + '">' + '<span class="ProposedTPerror-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text"  onkeypress="return onlyNumbers(this);"  class="form-control ProposedTP" readonly value="' + rowobject.ProposedTP + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'ProposedMRP',
        label: 'Proposed MRP',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" class="form-control ProposedMRP" value="' + rowobject.ProposedMRP + '">' + '<span class="ProposedMRPerror-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" class="form-control ProposedMRP" readonly value="' + rowobject.ProposedMRP + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'Currency',
        label: 'Currency',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" class="form-control Currency" readonly value="' + rowobject.Currency + '">' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" class="form-control Currency" readonly value="' + rowobject.Currency + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'ExpectedGP',
        label: 'Expected GP % ',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);" id="BI_ExpectedGP"  class="form-control ExpectedGP" value="' + rowobject.ExpectedGP + '">' + '<span class="BIerror-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control ExpectedGP" readonly value="' + rowobject.ExpectedGP + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'BusinessValue',
        label: 'Business Value <span class="Bus_val">(Y2 Quantity * Proposed Selling Price)</span>',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control BusinessValue" readonly value="' + rowobject.BusinessValue + '">' +
                '</div>';
        }
    },
    {
        name: 'M1Quantity',
        label: 'M1 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M1Quantity" value="' + rowobject.M1Quantity + '">' + '<span class="M1error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M1Quantity" readonly value="' + rowobject.M1Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'M2Quantity',
        label: 'M2 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M2Quantity" value="' + rowobject.M2Quantity + '">' + '<span class="M2error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M2Quantity" readonly value="' + rowobject.M2Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'M3Quantity',
        label: 'M3 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {

                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M3Quantity" value="' + rowobject.M3Quantity + '">' + '<span class="M3error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M3Quantity" readonly value="' + rowobject.M3Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'M4Quantity',
        label: 'M4 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {

                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M4Quantity" value="' + rowobject.M4Quantity + '">' + '<span class="M4error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M4Quantity" readonly value="' + rowobject.M4Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'M5Quantity',
        label: 'M5 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            if ((statusId == 4 || statusId == 14) && iconName != "View") {

                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M5Quantity" value="' + rowobject.M5Quantity + '">' + '<span class="M5error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M5Quantity" readonly value="' + rowobject.M5Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'M6Quantity',
        label: 'M6 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            if ((statusId == 4 || statusId == 14) && iconName != "View") {

                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M6Quantity" value="' + rowobject.M6Quantity + '">' + '<span class="M6error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M6Quantity" readonly value="' + rowobject.M6Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'Y1Quantity',
        label: 'Y1 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y1Quantity" value="' + rowobject.Y1Quantity + '">' + '<span class="Y1error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y1Quantity" readonly value="' + rowobject.Y1Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'Y2Quantity',
        label: 'Y2 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y2Quantity" value="' + rowobject.Y2Quantity + '">' + '<span class="Y2error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y2Quantity" readonly value="' + rowobject.Y2Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'Y3Quantity',
        label: 'Y3 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y3Quantity" value="' + rowobject.Y3Quantity + '">' + '<span class="Y3error-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y3Quantity" readonly value="' + rowobject.Y3Quantity + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'UOM',
        label: 'UOM',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if ((statusId == 4 || statusId == 14) && iconName != "View") {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return restrictSpecialCharacters();" class="form-control UOM" value="' + rowobject.UOM + '">' + '<span class="UOMerror-message popup_err" style="color: red;"></span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<input type="text" onkeypress="return restrictSpecialCharacters();" class="form-control UOM" readonly value="' + rowobject.UOM + '">' +
                    '</div>';
            }
        }
    },
    {
        name: 'FromHubName',
        label: 'From Hub Name',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'FromHubId',
        label: 'From Hub Name',
        resizable: true,
        ignoreCase: true,
        hidden: true
    }
],

    $("#Initiator_BusinessInformation_Popup").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['BusinessInformation'],
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
colmodels_V = [
    {
        name: 'NpdBusinessInformationId',
        label: 'Npd Business Information Id',
        width: 130,
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="demo-content">' +
                '<input type="text" class="form-control Product" readonly value="' + rowobject.Product + '">' +
                '</div>';

        }
    },
    {
        name: 'SKU',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="demo-content">' +
                '<input type="text" class="form-control SKU" readonly value="' + rowobject.SKU + '">' +
                '</div>';
        }
    },
    {
        name: 'ProposedLaunchDate',
        label: 'Proposed Launch Date',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" class="form-control ProposedLaunchDate data-datepicker" readonly value="' + rowobject.ProposedLaunchDate + '">' + '<span class="ProposedLaunchDateerror-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" class="form-control ProposedLaunchDate" readonly value="' + rowobject.ProposedLaunchDate + '">' +
                '</div>';
            /*}*/
        }
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);" id="BI_ProposedSellingPrice" class="form-control ProposedSellingPrice" value="' + rowobject.ProposedSellingPrice + '">' + '<span class="ProposedSellingPriceerror-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}

            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);" class="form-control ProposedSellingPrice"readonly  value="' + rowobject.ProposedSellingPrice + '">' +
                '</div>';
            /*}*/
        }
    },
    {
        name: 'ProposedTP',
        label: 'Expected COP',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);" id="BI_ProposedTP" class="form-control ProposedTP" value="' + rowobject.ProposedTP + '">' + '<span class="ProposedTPerror-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text"  onkeypress="return onlyNumbers(this);"  class="form-control ProposedTP" readonly value="' + rowobject.ProposedTP + '">' +
                '</div>';
            /*}*/
        }
    },
    {
        name: 'ProposedMRP',
        label: 'Proposed MRP',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" class="form-control ProposedMRP" value="' + rowobject.ProposedMRP + '">' + '<span class="ProposedMRPerror-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" class="form-control ProposedMRP" readonly value="' + rowobject.ProposedMRP + '">' +
                '</div>';
            /*}*/
        }
    },
    {
        name: 'Currency',
        label: 'Currency',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" class="form-control Currency" readonly value="' + rowobject.Currency + '">' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" class="form-control Currency" readonly value="' + rowobject.Currency + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'ExpectedGP',
        label: 'Expected GP % ',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);" id="BI_ExpectedGP"  class="form-control ExpectedGP" value="' + rowobject.ExpectedGP + '">' + '<span class="BIerror-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            /* else {*/
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control ExpectedGP" readonly value="' + rowobject.ExpectedGP + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'BusinessValue',
        label: 'Business Value <span class="Bus_val">(Y2 Quantity * Proposed Selling Price)</span>',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control BusinessValue" readonly value="' + rowobject.BusinessValue + '">' +
                '</div>';
        }
    },
    {
        name: 'M1Quantity',
        label: 'M1 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M1Quantity" value="' + rowobject.M1Quantity + '">' + '<span class="M1error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M1Quantity" readonly value="' + rowobject.M1Quantity + '">' +
                '</div>';
            /*}*/
        }
    },
    {
        name: 'M2Quantity',
        label: 'M2 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M2Quantity" value="' + rowobject.M2Quantity + '">' + '<span class="M2error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M2Quantity" readonly value="' + rowobject.M2Quantity + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'M3Quantity',
        label: 'M3 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {

            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M3Quantity" value="' + rowobject.M3Quantity + '">' + '<span class="M3error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            /*else {*/
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M3Quantity" readonly value="' + rowobject.M3Quantity + '">' +
                '</div>';
            /*}*/
        }
    },
    {
        name: 'M4Quantity',
        label: 'M4 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {

            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M4Quantity" value="' + rowobject.M4Quantity + '">' + '<span class="M4error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M4Quantity" readonly value="' + rowobject.M4Quantity + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'M5Quantity',
        label: 'M5 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {

            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M5Quantity" value="' + rowobject.M5Quantity + '">' + '<span class="M5error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M5Quantity" readonly value="' + rowobject.M5Quantity + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'M6Quantity',
        label: 'M6 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {

            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M6Quantity" value="' + rowobject.M6Quantity + '">' + '<span class="M6error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control M6Quantity" readonly value="' + rowobject.M6Quantity + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'Y1Quantity',
        label: 'Y1 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y1Quantity" value="' + rowobject.Y1Quantity + '">' + '<span class="Y1error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y1Quantity" readonly value="' + rowobject.Y1Quantity + '">' +
                '</div>';
            /*}*/
        }
    },
    {
        name: 'Y2Quantity',
        label: 'Y2 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y2Quantity" value="' + rowobject.Y2Quantity + '">' + '<span class="Y2error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y2Quantity" readonly value="' + rowobject.Y2Quantity + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'Y3Quantity',
        label: 'Y3 Quantity',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //If the status is HGML Approve
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y3Quantity" value="' + rowobject.Y3Quantity + '">' + '<span class="Y3error-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            //else {
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return onlyNumbers(this);"  class="form-control Y3Quantity" readonly value="' + rowobject.Y3Quantity + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'UOM',
        label: 'UOM',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            //if ((statusId == 4 || statusId == 14) && iconName != "View") {
            //    return '<div class="demo-content">' +
            //        '<input type="text" onkeypress="return restrictSpecialCharacters();" class="form-control UOM" value="' + rowobject.UOM + '">' + '<span class="UOMerror-message popup_err" style="color: red;"></span>' +
            //        '</div>';
            //}
            /*else {*/
            return '<div class="demo-content">' +
                '<input type="text" onkeypress="return restrictSpecialCharacters();" class="form-control UOM" readonly value="' + rowobject.UOM + '">' +
                '</div>';
            /* }*/
        }
    },
    {
        name: 'FromHubName',
        label: 'From Hub Name',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'FromHubId',
        label: 'From Hub Name',
        resizable: true,
        ignoreCase: true,
        hidden: true
    }
],
    $("#Initiator_BusinessInformation_Popup_V").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['BusinessInformation'],
        mtype: 'GET',
        colModel: colmodels_V,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_businessinfo_popup_V',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {

            var objRows = $("#Initiator_BusinessInformation_Popup_V tbody tr");
            var objHeader = $("#Initiator_BusinessInformation_Popup_V tbody tr td");

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

function validateHubReviewSaveForm() {

    $('#NPD_Save_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var businessInformation = [];

    $('div#SaveModal').modal('show');

    $("#NPD_Save_Ok").click(function () {

        $('#NPD_Save_Ok').prop("disabled", true);

        businessInformationGridData = $("#Business_Information").jqGrid('getGridParam', 'data');

        businessInformationGridData = businessInformationGridData.map(function (obj) {
            obj.BusinessValue = obj.BusinessValue.replaceAll(',', '');
            return obj;
        });

        $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
        var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
        $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
        $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

        $('#Npd_HubApproveConfirmation').val($('#NPD_Table').find('#Npd_HubApproveConfirmation option:selected').val());
        $('#NpdCurrentStatusName').val("HUB Review");
        $('#NpdStatus').val(3);

        $('#SavedRemarks').val(JSON.stringify(arrayDetails));
        $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

        document.getElementById('Npd_Edit_Form_Submit').submit();
    });
}

$('#HubApproveConfirmation').change(function () {
    $('#Error_HubApprove').hide();
});

function validateHubReviewSendToHgmlForm() {

    $('#NPD_SendToHgml_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var isHubApproved = $('#HubApproveConfirmation').val();
    isHubApproved == '' || isHubApproved == null ? ($('#Error_HubApprove').show(), $(window).scrollTop($('.Npd_HeaderTable').position().top), flag = false) : $('#Error_HubApprove').hide();
    var businessInformationGridData = $("#Business_Information").jqGrid('getGridParam', 'data');
    var productPostingHubRemarks = $.trim(CKEDITOR.instances["PP_HUB_Remarks"].getData());

    productPostingHubRemarks == "" ? (flag = false, $('#Error_Npd_Hub_Remarks').text('Please enter Product Positioning Hub remarks')) : ($('#Error_Npd_Hub_Remarks').text(''));
    businessInformationGridData = businessInformationGridData.map(function (obj) {
        obj.BusinessValue = obj.BusinessValue.replaceAll(',', '');
        return obj;
    });

    var hubParticipatingMarkets = $.trim($('#HgmlData_HubParticipatingMarkets').val());

    hubParticipatingMarkets == "" ? ($('#Error_HgmlData_HubParticipatingMarkets').show(), flag = false) : $('#Error_HgmlData_HubParticipatingMarkets').hide();

    if (isHubApproved == 'Yes') {
        businessInformationGridData.length == 0 ? ($('#Error_BusinessInformation').show(), $(window).scrollTop($('.BI_Scroll').position().top), flag = false) : $('#Error_BusinessInformation').hide();
    }

    if (flag) {
        $('div#SendToHgmlModal').modal('show');

        $("#NPD_SendToHgml_Ok").click(function () {

            var sendToHgmlRemarks = $.trim($('#PopUp_SendToHgmlRemarks').val());

            sendToHgmlRemarks == "" ? ($('#Error_Npd_SendToHgmlRemarks').show(), flag = false) : ($('#Error_Npd_SendToHgmlRemarks').hide(), flag = true);

            if (flag) {

                $('#NPD_SendToHgml_Ok').prop("disabled", true);

                approvalStatus = [{
                    FromStage: 3,
                    FromStageName: "HUB Review",
                    Action: "Send to HGML",
                    ToStage: 4,
                    ToStageName: "HGML Approve"
                }];

                $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
                $('#NpdCurrentStatusName').val("HUB Review");
                $('#NpdStatus').val(4);
                $('#SendToHgmlRemarks').val(sendToHgmlRemarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));

                $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));
                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))
                document.getElementById('Npd_Edit_Form_Submit').submit();
            }
        });
    }
}

CKEDITOR.replace('ProductPositioningHubRemarksPopup', {
    height: 100,
    width: 1100,
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


colmodels = [

    {
        name: 'Hub',
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

    $("#Project_Details_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveProjectDetailsHubRemarks"],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet1',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Project_Details_Remarks tbody tr");
            var objHeader = $("#Project_Details_Remarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
$("#Project_Details_Remarks_V").jqGrid({
    url: '',
    datatype: 'local',
    data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveProjectDetailsHubRemarks"],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_worksheet1_V',
    rowNum: 20,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Project_Details_Remarks_V tbody tr");
        var objHeader = $("#Project_Details_Remarks_V tbody tr td");

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

colmodels = [

    {
        name: 'Hub',
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

    $("#Formulation_Profile_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveFormulationProfileHubRemarks"],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet2',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Formulation_Profile_Remarks tbody tr");
            var objHeader = $("#Formulation_Profile_Remarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
$("#Formulation_Profile_Remarks_V").jqGrid({
    url: '',
    datatype: 'local',
    data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveFormulationProfileHubRemarks"],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_worksheet2_V',
    rowNum: 20,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Formulation_Profile_Remarks_V tbody tr");
        var objHeader = $("#Formulation_Profile_Remarks_V tbody tr td");

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

colmodels = [

    {
        name: 'Hub',
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

    $("#Packaging_Profile_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApprovePackagingProfileHubRemarks"],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet3',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Packaging_Profile_Remarks tbody tr");
            var objHeader = $("#Packaging_Profile_Remarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
$("#Packaging_Profile_Remarks_V").jqGrid({
    url: '',
    datatype: 'local',
    data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApprovePackagingProfileHubRemarks"],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_worksheet3_V',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#Packaging_Profile_Remarks_V tbody tr");
        var objHeader = $("#Packaging_Profile_Remarks_V tbody tr td");

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

colmodels = [

    {
        name: 'Hub',
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

    $("#Business_Information_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationHubRemarks"],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet4',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Business_Information_Remarks tbody tr");
            var objHeader = $("#Business_Information_Remarks tbody tr td");

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
});

colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 60,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center action_icons icon_section align-items-left">
                        <a onclick=onDeleteSendBackHubRemarksData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
                    </div>`;
        }
    },
    {
        name: 'HubName',
        label: 'HUB',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HubUser',
        label: 'HUB User',
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

    $("#HgmlApprove_SendBackHubRemarksTable").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected1',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#HgmlApprove_SendBackHubRemarksTable tbody tr");
            var objHeader = $("#HgmlApprove_SendBackHubRemarksTable tbody tr td");

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
                $.each(hubAndHubUserData.HgmlApproveHubNameList, function (i, obj) {

                    hubNameList += '<option class="HubNameOption" value="' + obj.HubName + '">' + obj.HubName + '</option>'
                });
                $("#HgmlApprove_HubName_Dropdown").html(hubNameList);
                $('#HgmlApprove_HubName_Dropdown').multiselect('rebuild');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error - " + errorThrown);
        }
    });
});

$('#HgmlApprove_HubName_Dropdown').change(function () {

    var hubName = $("#HgmlApprove_HubName_Dropdown").val();

    if (hubAndHubUserData != null) {

        $("option").remove(".HubUserOption");
        hubUserList = '<option class="HubUserOption" selected value="">None Selected</option>'
        $.each(hubAndHubUserData.HgmlApproveHubUserList, function (i, obj) {

            if (obj.HubName == hubName) {
                hubUserList += '<option class="HubUserOption" value="' + obj.HubUser + '">' + obj.HubUser + '</option>'
            }
        })
        $("#HgmlApprove_HubUser_Dropdown").html(hubUserList);
        $('#HgmlApprove_HubUser_Dropdown').multiselect('rebuild');
    }
});

function onClickOfProductPositioningHubRemarksLink(hubName) {

    var productPositioningHubRemarks = jsonFormNpdHgmlApproveData["HgmlApproveProductPositioningHubRemarks"];
    var uniqueProductPositioningHubRemarks = productPositioningHubRemarks.reduce((unique, o) => {
        if (!unique.some(obj => obj.Hub === o.Hub)) {
            unique.push(o);
        }
        return unique;
    }, []);

    $.each(uniqueProductPositioningHubRemarks, function (i, data) {

        if (data.Hub == hubName) {

            $('#ProductPositioningHubRemarkHeading').text("" + hubName + " Remarks");

            $('div#onClick_ProductPositioningHubRemarkslink_Popup').modal('show');

            CKEDITOR.instances["ProductPositioningHubRemarksPopup"].setData(data.Remarks)
        }
    });
}

function onClickOfApprovalRemarks() {

    $('div#ApprovalRemarks_Popup').modal('show');

    $("#Approval_Remarks_Popup").jqGrid("clearGridData");
    $("#Approval_Remarks_Popup").jqGrid('setGridParam', { data: jsonFormNpdData["ApprovalStatusData"].length == 0 ? [] : jsonFormNpdData["ApprovalStatusData"] });
    $("#Approval_Remarks_Popup").trigger('reloadGrid', [{ page: 1 }]);
}

function onClickInitiatorBusinessInformation() {

    $('div#BusinessInformation_Popup').modal('show');
    $('.PopupBusinessInformationSaveButtons').hide();

    $("#Initiator_BusinessInformation_Popup").jqGrid("clearGridData");
    $("#Initiator_BusinessInformation_Popup").jqGrid('setGridParam', { data: jsonFormNpdData['BusinessInformation'] });
    $("#Initiator_BusinessInformation_Popup").trigger('reloadGrid', [{ page: 1 }]);

    $('.data-datepicker').datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'dd-mm-yyyy',
        startDate: '+0d'
    });
}

var businessInformationBasedOnHub = [];
var businessInformationBasedOnHubDuplicateData = []

function onClickOfHubBusinessInformationLink(FromHubName) {

    businessInformationBasedOnHubDuplicateData = [];
    var hubBusinessInformation = jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationData"];

    var uniquehubBusinessInformation = hubBusinessInformation.reduce((unique, o) => {
        if (!unique.some(obj => obj.FromHubName === o.FromHubName)) {
            unique.push(o);
        }
        return unique;
    }, []);

    $.each(uniquehubBusinessInformation, function (i, data) {

        businessInformationBasedOnHub = [];

        if (data.FromHubName == FromHubName) {

            $.each(hubBusinessInformation, function (i, data) {
                data.M4Quantity = (data.M4Quantity === "null" || data.M4Quantity === null || data.M4Quantity === "0") ? "" : data.M4Quantity;
                data.M5Quantity = (data.M5Quantity === "null" || data.M5Quantity === null || data.M5Quantity === "0") ? "" : data.M5Quantity;
                data.M6Quantity = (data.M6Quantity === "null" || data.M6Quantity === null || data.M6Quantity === "0") ? "" : data.M6Quantity;

                if (data.FromHubName == FromHubName) {

                    businessInformationBasedOnHub.push(data);
                    businessInformationBasedOnHubDuplicateData.push(data);
                }
            });

            $('#HubBusinessInformationPopupHeading').text("" + FromHubName + " Business Information");

            $('div#BusinessInformation_Popup').modal('show');

            $("#Initiator_BusinessInformation_Popup").jqGrid("clearGridData");
            $("#Initiator_BusinessInformation_Popup").jqGrid('setGridParam', { data: businessInformationBasedOnHub });
            $("#Initiator_BusinessInformation_Popup").trigger('reloadGrid', [{ page: 1 }]);

            $('.data-datepicker').datepicker({
                todayHighlight: true,
                autoclose: true,
                format: 'dd-mm-yyyy',
                startDate: '+0d'
            });
        }
    });
}

function onClickOfHubBusinessInformationLink_V(FromHubName) {

    businessInformationBasedOnHubDuplicateData = [];
    var hubBusinessInformation = jsonFormNpdHgmlApproveData["HgmlApproveBusinessInformationData"];

    var uniquehubBusinessInformation = hubBusinessInformation.reduce((unique, o) => {
        if (!unique.some(obj => obj.FromHubName === o.FromHubName)) {
            unique.push(o);
        }
        return unique;
    }, []);

    $.each(uniquehubBusinessInformation, function (i, data) {

        businessInformationBasedOnHub = [];

        if (data.FromHubName == FromHubName) {

            $.each(hubBusinessInformation, function (i, data) {
                data.M4Quantity = (data.M4Quantity === "null" || data.M4Quantity === null || data.M4Quantity === "0") ? "" : data.M4Quantity;
                data.M5Quantity = (data.M5Quantity === "null" || data.M5Quantity === null || data.M5Quantity === "0") ? "" : data.M5Quantity;
                data.M6Quantity = (data.M6Quantity === "null" || data.M6Quantity === null || data.M6Quantity === "0") ? "" : data.M6Quantity;

                if (data.FromHubName == FromHubName) {

                    businessInformationBasedOnHub.push(data);
                    businessInformationBasedOnHubDuplicateData.push(data);
                }
            });

            $('#HubBusinessInformationPopupHeading').text("" + FromHubName + " Business Information");

            $('div#BusinessInformation_Popup_V').modal('show');

            $("#Initiator_BusinessInformation_Popup_V").jqGrid("clearGridData");
            $("#Initiator_BusinessInformation_Popup_V").jqGrid('setGridParam', { data: businessInformationBasedOnHub });
            $("#Initiator_BusinessInformation_Popup_V").trigger('reloadGrid', [{ page: 1 }]);

            $('.data-datepicker').datepicker({
                todayHighlight: true,
                autoclose: true,
                format: 'dd-mm-yyyy',
                startDate: '+0d'
            });
        }
    });
}

function GetRowDataInArray(obj) {

    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#Initiator_BusinessInformation_Popup');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    var proposedSellingPrice = $(clossestTableRow).children().find(".ProposedSellingPrice").val();
    var y2Quantity = $(clossestTableRow).children().find(".Y2Quantity").val();

    if (proposedSellingPrice != "" && y2Quantity != "") {

        $(clossestTableRow).children().find(".BusinessValue").val("");
        $(clossestTableRow).children().find(".BusinessValue").val((proposedSellingPrice.replaceAll(',', '')) * (y2Quantity.replaceAll(',', '')));
    }

    var npdBusinessInformationId = grd.jqGrid('getCell', rowid, 'NpdBusinessInformationId');
    var product = $(clossestTableRow).children().find(".Product").val();
    var sku = $(clossestTableRow).children().find(".SKU").val();
    var proposedNamesOfProduct = $(clossestTableRow).children().find(".ProposedNamesOfProduct").val();
    var proposedLaunchDate = $(clossestTableRow).children().find(".ProposedLaunchDate").val();
    var proposedTP = $(clossestTableRow).children().find(".ProposedTP").val();
    var proposedMRP = $(clossestTableRow).children().find(".ProposedMRP").val();
    var currency = $(clossestTableRow).children().find(".Currency").val();
    var expectedGP = $(clossestTableRow).children().find(".ExpectedGP").val();
    var businessValue = $(clossestTableRow).children().find(".BusinessValue").val();
    var m1Quantity = $(clossestTableRow).children().find(".M1Quantity").val();
    var m2Quantity = $(clossestTableRow).children().find(".M2Quantity").val();
    var m3Quantity = $(clossestTableRow).children().find(".M3Quantity").val();
    var m4Quantity = $(clossestTableRow).children().find(".M4Quantity").val();
    var m5Quantity = $(clossestTableRow).children().find(".M5Quantity").val();
    var m6Quantity = $(clossestTableRow).children().find(".M6Quantity").val();
    var y1Quantity = $(clossestTableRow).children().find(".Y1Quantity").val();
    var y3Quantity = $(clossestTableRow).children().find(".Y3Quantity").val();
    var uom = $(clossestTableRow).children().find(".UOM").val();
    var fromHubName = grd.jqGrid('getCell', rowid, 'FromHubName');
    var fromHubId = grd.jqGrid('getCell', rowid, 'FromHubId');

    var arrayitem = {

        NpdBusinessInformationId: npdBusinessInformationId,
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
        M4Quantity: m4Quantity,
        M5Quantity: m5Quantity,
        M6Quantity: m6Quantity,
        Y1Quantity: y1Quantity,
        Y2Quantity: y2Quantity,
        Y3Quantity: y3Quantity,
        UOM: uom,
        FromHubName: fromHubName,
        FromHubId: fromHubId
    };
    return arrayitem;
}

$('body').on('change', '.Product, .SKU, .ProposedNamesOfProduct, .ProposedLaunchDate, .ProposedSellingPrice, .ProposedTP, .ProposedMRP, .Currency, .ExpectedGP, .BusinessValue, .M1Quantity, .M2Quantity, .M3Quantity, .M4Quantity, .M5Quantity, .M6Quantity, .Y1Quantity, .Y2Quantity, .Y3Quantity, .UOM', function () {

    rowData = GetRowDataInArray(this);

    var FoundIndex = businessInformationBasedOnHubDuplicateData.findIndex(x => x.NpdBusinessInformationId === rowData.NpdBusinessInformationId);

    if (FoundIndex !== -1) {
        businessInformationBasedOnHubDuplicateData[FoundIndex] = rowData;
    }
    else {
        businessInformationBasedOnHubDuplicateData.push(rowData);
    }
});
$('body').on('change', '.ExpectedGP,.ProposedTP,.ProposedMRP,.ProposedLaunchDate,.ProposedSellingPrice, .BusinessValue, .M1Quantity, .M2Quantity, .M3Quantity, .M4Quantity, .M5Quantity, .M6Quantity, .Y1Quantity, .Y2Quantity, .Y3Quantity, .UOM', function () {
    var $this = $(this);
    var $closestTr = $this.closest('tr');
    var flag = true;
    $closestTr.find('.BIerror-message, .M1error-message, .M2error-message, .M3error-message, .M4error-message, .M5error-message, .M6error-message, .Y1error-message, .Y2error-message, .Y3error-message,.UOMerror-message,.ProposedTPerror-message,.ProposedLaunchDateerror-message,.ProposedMRPerror-message,.ProposedSellingPriceerror-message').text("");

    var M1Quantity = $closestTr.find('.M1Quantity').val();
    var M2Quantity = $closestTr.find('.M2Quantity').val();
    var M3Quantity = $closestTr.find('.M3Quantity').val();
    var M4Quantity = $closestTr.find('.M4Quantity').val();
    var M5Quantity = $closestTr.find('.M5Quantity').val();
    var M6Quantity = $closestTr.find('.M6Quantity').val();
    var Y1Quantity = $closestTr.find('.Y1Quantity').val();
    var Y2Quantity = $closestTr.find('.Y2Quantity').val();
    var Y3Quantity = $closestTr.find('.Y3Quantity').val();
    var UOM = $closestTr.find('.UOM').val();
    var PropsedTP = $closestTr.find('.ProposedTP').val();
    var ProposedLaunchDate = $closestTr.find('.ProposedLaunchDate').val();
    var ProposedMRP = $closestTr.find('.ProposedMRP').val();
    var expectGp = $closestTr.find('.ExpectedGP').val();
    var ProposedSellingPrice = $closestTr.find('.ProposedSellingPrice').val();
    var currentExpectGp = parseInt(expectGp);

    if (isNaN(expectGp) || expectGp === "") {
        $closestTr.find('.BIerror-message').text('Please enter Expected GP');
    } else if (currentExpectGp < 1 || currentExpectGp > 100) {
        $closestTr.find('.BIerror-message').text('Expected GP should be in between 1 and 100');
    }

    if (isNaN(M1Quantity) || M1Quantity === "") {
        $closestTr.find('.M1error-message').text('Please enter M1 Quantity');
    } else if (parseInt(M1Quantity) === 0) {
        $closestTr.find('.M1error-message').text('M1 Quantity cannot be zero');
    }

    if (isNaN(M2Quantity) || M2Quantity === "") {
        $closestTr.find('.M2error-message').text('Please enter M2 Quantity');
    } else if (parseInt(M2Quantity) === 0) {
        $closestTr.find('.M2error-message').text('M2 Quantity cannot be zero');
    }
    if (isNaN(M3Quantity) || M3Quantity === "") {
        $closestTr.find('.M3error-message').text('Please enter M3 Quantity');
    } else if (parseInt(M3Quantity) === 0) {
        $closestTr.find('.M3error-message').text('M3 Quantity cannot be zero');
    }
    if (parseInt(M4Quantity) === 0) {
        $closestTr.find('.M4error-message').text('M4 Quantity cannot be zero');
    }
    if (parseInt(M5Quantity) === 0) {
        $closestTr.find('.M5error-message').text('M5 Quantity cannot be zero');
    }
    if (parseInt(M6Quantity) === 0) {
        $closestTr.find('.M6error-message').text('M6 Quantity cannot be zero');
    }
    if (isNaN(Y1Quantity) || Y1Quantity === "") {
        $closestTr.find('.Y1error-message').text('Please enter Y1 Quantity');
    }

    if (isNaN(Y2Quantity) || Y2Quantity === "") {
        $closestTr.find('.Y2error-message').text('Please enter Y2 Quantity');
    }

    if (isNaN(Y3Quantity) || Y3Quantity === "") {
        $closestTr.find('.Y3error-message').text('Please enter Y3 Quantity');
    }
    if (UOM === "") {
        $closestTr.find('.UOMerror-message').text('Please enter UOM');
    }
    if (PropsedTP === "") {
        $closestTr.find('.ProposedTPerror-message').text('Please enter Proposed TP');
    }
    if (ProposedMRP === "") {
        $closestTr.find('.ProposedMRPerror-message').text('Please enter Proposed MRP');
    }
    if (ProposedLaunchDate === "") {
        $closestTr.find('.ProposedLaunchDateerror-message').text('Please enter Proposed Launch Date');
    }
    if (ProposedSellingPrice === "") {
        $closestTr.find('.ProposedSellingPriceerror-message').text('Please enter Proposed Selling Price');
    }
    M4Quantity = M4Quantity == "" ? "0" : M4Quantity;
    M5Quantity = M5Quantity == "" ? "0" : M5Quantity;
    M6Quantity = M6Quantity == "" ? "0" : M6Quantity;
    var TotalQuantity = parseInt(M1Quantity) + parseInt(M2Quantity) + parseInt(M3Quantity) + parseInt(M4Quantity) + parseInt(M5Quantity) + parseInt(M6Quantity);

    if (TotalQuantity >= parseInt(Y1Quantity)) {
        $closestTr.find('.Y1error-message').text('Y1 Quantity should be greater than (M1 + M2 + M3 + M4 + M5 + M6 ) quantity');
    }
    $('.popup_err').each(function () {

        if ($(this).text() != '') {
            flag = false;
        }
    });

    flag ? $('#Save_Hub_BIValue').prop('disabled', false) : $('#Save_Hub_BIValue').prop('disabled', true);

});
function onClickOfSaveInHubBusinessInformationPopup() {
    var flag = true;

    $("table#Initiator_BusinessInformation_Popup tbody tr").each(function () {
        var $closestTr = $(this).closest('tr');

        $closestTr.find('.BIerror-message, .M1error-message, .M2error-message, .M3error-message, .M4error-message, .M5error-message, .M6error-message, .Y1error-message, .Y2error-message, .Y3error-message,.UOMerror-message,.ProposedTPerror-message,.ProposedSellingPriceerror-message').text("");

        var M1Quantity = $closestTr.find('.M1Quantity').val();
        var M2Quantity = $closestTr.find('.M2Quantity').val();
        var M3Quantity = $closestTr.find('.M3Quantity').val();
        var M4Quantity = $closestTr.find('.M4Quantity').val();
        var M5Quantity = $closestTr.find('.M5Quantity').val();
        var M6Quantity = $closestTr.find('.M6Quantity').val();
        var Y1Quantity = $closestTr.find('.Y1Quantity').val();
        var Y2Quantity = $closestTr.find('.Y2Quantity').val();
        var Y3Quantity = $closestTr.find('.Y3Quantity').val();
        var UOM = $closestTr.find('.UOM').val();
        var expectGp = $closestTr.find('.ExpectedGP').val();
        var PropsedTP = $closestTr.find('.ProposedTPerror-message').val();
        var ProposedLaunchDate = $closestTr.find('.ProposedLaunchDate').val();
        var ProposedMRP = $closestTr.find('.ProposedMRP').val();
        var ProposedSellingPrice = $closestTr.find('.ProposedSellingPrice').val();

        var currentExpectGp = parseInt(expectGp);

        if (isNaN(expectGp) || expectGp === "") {
            $closestTr.find('.BIerror-message').text('Please enter ExpectedGP');
        } else if (currentExpectGp < 1 || currentExpectGp > 100) {
            $closestTr.find('.BIerror-message').text('Expected GP should be in between 1 and 100');
        }
        if (isNaN(M1Quantity) || M1Quantity === "") {
            $closestTr.find('.M1error-message').text('Please enter M1 Quantity');
        } else if (parseInt(M1Quantity) === 0) {
            $closestTr.find('.M1error-message').text('M1 Quantity cannot be zero');
        }
        if (isNaN(M2Quantity) || M2Quantity === "") {
            $closestTr.find('.M2error-message').text('Please enter M2 Quantity');
        } else if (parseInt(M2Quantity) === 0) {
            $closestTr.find('.M2error-message').text('M2 Quantity cannot be zero');
        }
        if (isNaN(M3Quantity) || M3Quantity === "") {
            $closestTr.find('.M3error-message').text('Please enter M3 Quantity');
        } else if (parseInt(M3Quantity) === 0) {
            $closestTr.find('.M3error-message').text('M3 Quantity cannot be zero');
        }
        if (parseInt(M4Quantity) === 0) {
            $closestTr.find('.M4error-message').text('M4 Quantity cannot be zero');
        }
        if (parseInt(M5Quantity) === 0) {
            $closestTr.find('.M5error-message').text('M5 Quantity cannot be zero');
        }
        if (parseInt(M6Quantity) === 0) {
            $closestTr.find('.M6error-message').text('M6 Quantity cannot be zero');
        }
        if (isNaN(Y1Quantity) || Y1Quantity === "") {
            $closestTr.find('.Y1error-message').text('Please enter Y1 Quantity');
        }
        if (isNaN(Y2Quantity) || Y2Quantity === "") {
            $closestTr.find('.Y2error-message').text('Please enter Y2 Quantity');
        }
        if (isNaN(Y3Quantity) || Y3Quantity === "") {
            $closestTr.find('.Y3error-message').text('Please enter Y3Quantity');
        }
        if (UOM === "") {
            $closestTr.find('.UOMerror-message').text('Please enter UOM');
        }
        if (PropsedTP === "") {
            $closestTr.find('.UProposedTPerror-message').text('Please enter UOM');
        }
        if (ProposedMRP === "") {
            $closestTr.find('.ProposedMRPerror-message').text('Please enter ProposedMRP');
        }
        if (ProposedLaunchDate === "") {
            $closestTr.find('.ProposedLaunchDateerror-message').text('Please enter ProposedLaunchDate');
        }
        if (ProposedSellingPrice === "") {
            $closestTr.find('.ProposedSellingPriceerror-message').text('Please enter ProposedSellingPrice');
        }
        M4Quantity = M4Quantity == "" ? 0 : M4Quantity;
        M5Quantity = M5Quantity == "" ? 0 : M5Quantity;
        M6Quantity = M6Quantity == "" ? 0 : M6Quantity;

        var TotalQuantity = parseInt(M1Quantity) + parseInt(M2Quantity) + parseInt(M3Quantity) + parseInt(M4Quantity) + parseInt(M5Quantity) + parseInt(M6Quantity);

        if (TotalQuantity >= parseInt(Y1Quantity)) {
            $closestTr.find('.Y1error-message').text('Y1 Quantity should be greater than(M1 + M2 + M3 + M4 + M5 + M6 ) quantity');
        }
    });

    $('.popup_err').each(function () {

        if ($(this).text() != '')
            flag = false;
    });


    var projectId = $('#ProjectId').val();
    var userName = $('#UserName').val();
    if (businessInformationBasedOnHubDuplicateData === businessInformationBasedOnHub) {
        flag = false;
    }

    if (flag) {
        $.ajax({
            type: 'POST',
            datatype: 'json',
            url: ROOT + "ProjectBrief/SaveNpdPopupHubBusinessInformation",
            data: { projectId: projectId, userName: userName, businessInformationData: JSON.stringify(businessInformationBasedOnHubDuplicateData) },
            success: function (NpdHgmlApproveData) {

                jsonFormNpdHgmlApproveData = $.parseJSON(NpdHgmlApproveData);
                $('#BusinessInformation_Popup').modal('hide');
            }
        });
    } else {
        $('#BusinessInformation_Popup').modal('show');
        return false;
    }
}

$('#HgmlApprove_HubName_Dropdown').change(function () {

    $("#Error_HgmlApprove_HubName").hide();
    $("#Error_HgmlApprove_HubName1").hide();
});
$('#HgmlApprove_HubUser_Dropdown').change(function () {

    $("#Error_HgmlApprove_HubUser").hide();
});
$("#Add_SendBackHubRemarks").click(function () {

    var hubName = $("#HgmlApprove_HubName_Dropdown").val();
    var hubUser = $("#HgmlApprove_HubUser_Dropdown").val();
    var remarks = $.trim($("#HgmlApprove_SendBackHubRemarks").val());
    var flag = true;

    var sendToHubData = $('#HgmlApprove_SendBackHubRemarksTable').jqGrid('getGridParam', 'data');

    $('.Error_HgmlApprovePopupData').hide();

    $.each(sendToHubData, function (i, data) {
        if (data.HubName == hubName) {
            $('#Error_HgmlApprove_HubName1').show();
            flag = false;
        }
        else {
            $('#Error_HgmlApprove_HubName1').hide();
        }
    });

    if (hubName == "" || hubUser == "") {
        flag = false;
        hubUser == "" ? $("#Error_HgmlApprove_HubUser").show() : $("#Error_HgmlApprove_HubUser").hide();
        hubName == "" ? $("#Error_HgmlApprove_HubName").show() : $("#Error_HgmlApprove_HubName").hide();
    }

    if (flag) {
        var griddata = [];
        var sendBackHubRemarksData = {};

        sendBackHubRemarksData = {
            HubName: hubName,
            HubUser: hubUser,
            Remarks: remarks,
        };

        $('#HgmlApprove_HubName_Dropdown').val('').multiselect('refresh');    // To reset the text box fields
        $('#HgmlApprove_HubUser_Dropdown').val('').multiselect('refresh');    // To reset the text box fields

        griddata.push(sendBackHubRemarksData);
        var HAR1 = $("#HgmlApprove_SendBackHubRemarksTable").jqGrid('getGridParam', 'data');
        var HAR2 = $.merge(HAR1, griddata);
        $("#HgmlApprove_SendBackHubRemarksTable").jqGrid('setGridParam', { data: HAR2 });
        $("#HgmlApprove_SendBackHubRemarksTable").trigger('reloadGrid', [{ page: 1 }]);
        $("#HgmlApprove_SendBackHubRemarks").val('');
    }
});

function onDeleteSendBackHubRemarksData(deleteRowId) {
    confirm("Are you sure you want to delete?", function () {

        $("#HgmlApprove_SendBackHubRemarksTable").jqGrid('delRowData', deleteRowId);
        $("#HgmlApprove_SendBackHubRemarksTable").trigger('reloadGrid', [{ page: 1 }]);
        deleteRowId = 0;
    });
}

function validateHgmlApproveSaveForm() {
    $('#NPD_Save_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );
    var hgmlData = [];

    $('div#SaveModal').modal('show');
    $("#NPD_Save_Ok").click(function () {

        $('#NPD_Save_Ok').prop("disabled", true);

        hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

        $('#HgmlData').val(JSON.stringify(hgmlData));
        if (statusId == 4) {
            $('#NpdStatus').val(4);
            $('#NpdCurrentStatusName').val("HGML Approve");
        } else if (statusId == 14) {
            $('#NpdStatus').val(14);
            $('#NpdCurrentStatusName').val("Brief Demoted to HGML Approve");
        }


        $('#SavedRemarks').val(JSON.stringify(arrayDetails));
        $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

        document.getElementById('Npd_Edit_Form_Submit').submit();
    });
}

function validateHgmlApproveSendBackToHubForm() {

    $('#SendBackHub_Popup_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

    $('#SendhubModal').modal('show');
    $('#SendBackHub_Popup_Ok').click(function () {

        var sendBackHubRemarksData = $('#HgmlApprove_SendBackHubRemarksTable').jqGrid('getGridParam', 'data');
        sendBackHubRemarksData.length == 0 ? ($('#Error_HgmlApprovePopupData').show(), flag = false) : ($('#Error_HgmlApprovePopupData').hide(), flag = true);

        if (flag) {

            $('#SendBackHub_Popup_Ok').prop("disabled", true);
            if (statusId == 4) {
                approvalStatus = [{
                    FromStage: 4,
                    FromStageName: "HGML Approve",
                    Action: "Send Back",
                    ToStage: 3,
                    ToStageName: "HUB Review"
                }];
                $('#NpdStatus').val(3);
                $('#NpdCurrentStatusName').val("HGML Approve");
            } else if (statusId == 14) {
                approvalStatus = [{
                    FromStage: 14,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Send Back",
                    ToStage: 3,
                    ToStageName: "HUB Review"
                }];
                $('#NpdStatus').val(3);
                $('#NpdCurrentStatusName').val("Brief Demoted to HGML Approve");
            }

            $('#HgmlData').val(JSON.stringify(hgmlData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#HgmlApproveSendBackHubRemarksData').val(JSON.stringify(sendBackHubRemarksData));


            $('#SavedRemarks').val(JSON.stringify(arrayDetails));
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

            document.getElementById('Npd_Edit_Form_Submit').submit();
        }
    });
}

// On Clicking Send to PMD in HGML Approve form

function validateHgmlApproveSendToPmdForm() {
    $('#NPD_SendToPmd_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

    hgmlData.length == 0 ? ($('#Error_HgmlData').show(), flag = false) : $('#Error_HgmlData').hide();

    if (flag) {

        $('div#SendToPmdModal').modal('show');
        $("#NPD_SendToPmd_Ok").click(function () {

            var sendToPmdRemarks = $.trim($('#PopUp_SendToPmdRemarks').val());
            sendToPmdRemarks == "" ? ($('#Error_Npd_SendToPmdRemarks').show(), flag = false) : ($('#Error_Npd_SendToPmdRemarks').hide(), flag = true);
            if (flag) {

                $('#NPD_SendToPmd_Ok').prop("disabled", true);

                if (statusId == 4) {
                    approvalStatus = [{
                        FromStage: 4,
                        FromStageName: "HGML Approve",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#NpdStatus').val(5);
                    $('#NpdCurrentStatusName').val("HGML Approve");
                } else if (statusId == 14) {
                    approvalStatus = [{
                        FromStage: 14,
                        FromStageName: "Brief Demoted to HGML",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#NpdStatus').val(5);
                    $('#NpdCurrentStatusName').val("Brief Demoted to HGML Approve");
                }


                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SendToPmdRemarks').val(sendToPmdRemarks);


                $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

                document.getElementById('Npd_Edit_Form_Submit').submit();
            }
        });
    }
}

$('#PopUp_RejectRemarks').keyup(function () {
    $('#Error_Npd_RejectRemarks').hide();
});

function validateHgmlApproveRejectForm() {

    $('#NPD_Reject_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var approvalStatus = [];

    $('div#RejectModal').modal('show');
    $('#Error_Npd_RejectRemarks').hide();

    $("#NPD_Reject_Ok").click(function () {

        var flag = true;

        var rejectRemarks = $.trim($('#PopUp_RejectRemarks').val());

        rejectRemarks == '' ? ($('#Error_Npd_RejectRemarks').show(), flag = false) : $('#Error_Npd_RejectRemarks').hide();

        if (flag) {

            $('#NPD_Reject_Ok').prop("disabled", true);

            if (statusId == 4) {
                approvalStatus = [{
                    FromStage: 4,
                    FromStageName: "HGML Approve",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#NpdStatus').val(7);
                $('#NpdCurrentStatusName').val("HGML Approve");
            } else if (statusId == 14) {
                approvalStatus = [{
                    FromStage: 14,
                    FromStageName: "Brief Demoted to HGML",
                    Action: "Rejected",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#NpdStatus').val(7);
                $('#NpdCurrentStatusName').val("Brief Demoted to HGML Approve");
            }

            var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');
            $('#HgmlData').val(JSON.stringify(hgmlData));

            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#RejectRemarks').val(rejectRemarks);


            $('#SavedRemarks').val(JSON.stringify(arrayDetails));
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

            document.getElementById('Npd_Edit_Form_Submit').submit();
        }
    });
}

function validatePMDReviewRejectForm() {

    $('#NPD_Reject_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var approvalStatus = [];

    $('div#RejectModal').modal('show');
    $('#Error_Npd_RejectRemarks').hide();

    $("#NPD_Reject_Ok").click(function () {

        var flag = true;

        var rejectRemarks = $.trim($('#PopUp_RejectRemarks').val());

        rejectRemarks == '' ? ($('#Error_Npd_RejectRemarks').show(), flag = false) : $('#Error_Npd_RejectRemarks').hide();

        if (flag) {

            $('#NPD_Reject_Ok').prop("disabled", true);

            if (statusId == 5) {
                approvalStatus = [{
                    FromStage: 5,
                    FromStageName: "Fine Screening Review",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#NpdStatus').val(7);
                $('#NpdCurrentStatusName').val("Fine Screening Review");
            }
            else if (statusId == 16) {
                approvalStatus = [{
                    FromStage: 16,
                    FromStageName: "Extended Fine Screening Review",
                    Action: "Reject",
                    ToStage: 7,
                    ToStageName: "Rejected"
                }];
                $('#NpdStatus').val(7);
                $('#NpdCurrentStatusName').val("Under Exploration");
            }

            var pmdData = jQuery('#PMD_Data').jqGrid('getGridParam', 'data');
            var targetCostData = jQuery('#Target_Cost').jqGrid('getGridParam', 'data');

            $('#PmdData').val(JSON.stringify(pmdData));
            $('#NpdTargetCostData').val(JSON.stringify(targetCostData));

            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#RejectRemarks').val(rejectRemarks);


            $('#SavedRemarks').val(JSON.stringify(arrayDetails));
            $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

            document.getElementById('Npd_Edit_Form_Submit').submit();
        }
    });
}

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

//PMD Review

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

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center action_icons icon_section align-items-left">
                        <a onclick=onEditPmdData(` + options.rowId + `) class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
                        <a onclick=onDeletePmdData(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
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
        label: 'Target 1st Prototype Submission Date',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TargetTTDCompletionDate',
        label: 'Target TTD Completion Date',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TargetProductionDate',
        label: 'Target Production Date',
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
        data: jsonFormNpdPmdReviewData.length == 0 ? [] : jsonFormNpdPmdReviewData["PmdDataList"],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_PMD',
        rowNum: 200,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#PMD_Data tbody tr");
            var objHeader = $("#PMD_Data tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            if ((statusId !== 6 || statusId !== 12) && iconName == 'View') {

                jQuery("#PMD_Data").jqGrid('hideCol', "Action");
            }
        }
    });
$("#PMD_Data_V").jqGrid({
    url: '',
    datatype: 'local',
    data: jsonFormNpdPmdReviewData.length == 0 ? [] : jsonFormNpdPmdReviewData["PmdDataList"],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_PMD_V',
    rowNum: 200,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#PMD_Data_V tbody tr");
        var objHeader = $("#PMD_Data_V tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#PMD_Data_V").jqGrid('hideCol', "Action");
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

$('#PmdData_ProductName').change(function () {

    var productName = $("#PmdData_ProductName").val();
    productName == "" ? ($("#Error_PmdData_ProductName").show().text('Please select Product')) : $("#Error_PmdData_ProductName").hide().text('');

    const productList = $("#PMD_Data").jqGrid("getCol", "ProductName");

    if (productName != "") {

        productList.includes(productName) ? ($("#Error_PmdData_ProductName").show().text('This Product already consists the definition, Please select the different Product')) : $("#Error_PmdData_ProductName").hide().text('');
    }
});
$('#PmdData_ProjectCategorization').change(function () {
    $('#PmdData_ProjectCategorization').val() == "" ? $("#Error_PmdData_ProjectCategorization").show() : $("#Error_PmdData_ProjectCategorization").hide();
});
$('#PmdData_ComplexityToBeAssigned').change(function () {
    $('#PmdData_ComplexityToBeAssigned').val() == "" ? $("#Error_PmdData_ComplexityToBeAssigned").show() : $("#Error_PmdData_ComplexityToBeAssigned").hide();
});
$('#PmdData_RandDName').change(function () {
    $('#PmdData_RandDName').val() == "" ? $("#Error_PmdData_RandDName").show() : $("#Error_PmdData_RandDName").hide();
});
$('#PmdData_Remarks').keyup(function () {
    $('#PmdData_Remarks').val() == "" ? $("#Error_PmdData_Remarks").show() : $("#Error_PmdData_Remarks").hide();
});

$("#PmdData_ProjectLead").keyup(function () {
    $("#PmdData_ProjectLead").val() == "" ? $("#Error_Lead").show() : $("#Error_Lead").hide();
});

$("#PmdData_ProjectLead").val($("#UserName").val());

$("#Add_PmdData").click(function () {

    var productName = $("#PmdData_ProductName").val();
    var complexityToBeAssigned = $("#PmdData_ComplexityToBeAssigned").val();
    var RandDName = $("#PmdData_RandDName").val();
    var remarks = $.trim($("#PmdData_Remarks").val());
    var ProjectLead = $.trim($("#PmdData_ProjectLead").val());
    var flag = true;

    EditRowId1 == 0 && $("#Error_PmdData_ProductName").text() != '' ? flag = false : "";

    if (productName == "" || complexityToBeAssigned == "" || RandDName == "" || remarks == "" || ProjectLead == "") {

        flag = false;
        productName == "" ? $("#Error_PmdData_ProductName").show().text('Please select Product Name') : $("#Error_PmdData_ProductName").hide().text('');
        complexityToBeAssigned == "" ? $("#Error_PmdData_ComplexityToBeAssigned").show() : $("#Error_PmdData_ComplexityToBeAssigned").hide();
        RandDName == "" ? $("#Error_PmdData_RandDName").show() : $("#Error_PmdData_RandDName").hide();
        remarks == "" ? $("#Error_PmdData_Remarks").show() : $("#Error_PmdData_Remarks").hide();
        ProjectLead == "" ? $("#Error_Lead").show() : $("#Error_Lead").hide();
    }

    if (flag) {
        var griddata = [];
        var pmdData = {};

        pmdData = {
            ProductName: productName,
            ComplexityToBeAssigned: complexityToBeAssigned,
            RandDName: RandDName,
            Remarks: remarks,
            ProjectLead: $.trim($("#PmdData_ProjectLead").val()),
            TargetFirstPrototypeSubmissionDate: $.trim($("#PmdData_TargetFirstPrototypeSubmissionDate").val()),
            TargetTTDCompletionDate: $.trim($("#PmdData_TargetTTDCompletionDate").val()),
            TargetProductionDate: $.trim($("#PmdData_TargetProductionDate").val()),
            MajorRiskIfAny: $.trim($("#PmdData_MajorRiskIfAny").val())
        };

        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('.data-datepicker-monthyear').datepicker('setDate', today);

        $('.PmdData').val("");                            // To reset the text box fields

        $("#PmdData_ProjectLead").val($("#UserName").val());

        if (EditRowId1 == 0) {
            griddata.push(pmdData);
            var PMD1 = $("#PMD_Data").jqGrid('getGridParam', 'data');
            var PMD2 = $.merge(PMD1, griddata);
            $("#PMD_Data").jqGrid('setGridParam', { data: PMD2 });
            $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {

            $('#PmdData_ProductName').attr('disabled', false);

            $("#PMD_Data").jqGrid('setRowData', EditRowId1, pmdData);
            $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);

            EditRowId1 = 0;
        }


        var productList = $("#PMD_Data").jqGrid("getCol", "ProductName");

        pmdDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        $("option").remove("#PmdData_ProductName .ProductOption");

        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $.each(pmdDataProductNameList, function (i, obj) {
                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PmdData_ProductName").append(productOption);
        }
    }
});

//On Clicking the edit button 
function onEditPmdData(editRowId) {

    EditRowId1 = editRowId;

    $(".Error_PmdData").hide();

    var DataFromTheRow = jQuery('#PMD_Data').jqGrid('getRowData', editRowId);
    var productList = $("#PMD_Data").jqGrid("getCol", "ProductName");

    pmdDataProductNameList = $.grep(pmdDataProductNameList, function (el) { return $.inArray(el, productList) == -1 });
    pmdDataProductNameList.push(DataFromTheRow.ProductName);

    $("option").remove("#PmdData_ProductName .ProductOption");

    if (pmdDataProductNameList.length > 0) {

        var productOption = "";
        $.each(pmdDataProductNameList, function (i, obj) {

            if (obj != "") {
                productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
            }
        });

        $("#PmdData_ProductName").append(productOption);
    }

    $("#PmdData_ProductName").val(DataFromTheRow.ProductName);
    $("#PmdData_ComplexityToBeAssigned").val(DataFromTheRow.ComplexityToBeAssigned);
    $("#PmdData_RandDName").val(DataFromTheRow.RandDName);
    $("#PmdData_Remarks").val(DataFromTheRow.Remarks);
    $("#PmdData_ProjectLead").val(DataFromTheRow.ProjectLead);
    $("#PmdData_TargetFirstPrototypeSubmissionDate").val(DataFromTheRow.TargetFirstPrototypeSubmissionDate);
    $('#PmdData_TargetFirstPrototypeSubmissionDate').datepicker('setDate', DataFromTheRow.TargetFirstPrototypeSubmissionDate);

    $("#PmdData_TargetTTDCompletionDate").val(DataFromTheRow.TargetTTDCompletionDate);
    $('#PmdData_TargetTTDCompletionDate').datepicker('setDate', DataFromTheRow.TargetTTDCompletionDate);

    $("#PmdData_TargetProductionDate").val(DataFromTheRow.TargetProductionDate)
    $('#PmdData_TargetProductionDate').datepicker('setDate', DataFromTheRow.TargetProductionDate);

    $("#PmdData_TargetCost").val(DataFromTheRow.TargetCost);
    $("#PmdData_MajorRiskIfAny").val(DataFromTheRow.MajorRiskIfAny);
}

function onDeletePmdData(deleteRowId) {


    var DataFromTheRow = jQuery('#PMD_Data').jqGrid('getRowData', deleteRowId);

    confirm("Are you sure you want to delete?", function () {

        $("#PMD_Data").jqGrid('delRowData', deleteRowId);
        $("#PMD_Data").trigger('reloadGrid', [{ page: 1 }]);
        deleteRowId = 0;
        EditRowId1 = 0;

        $('.PmdData').val('');

        var productList = $("#PMD_Data").jqGrid("getCol", "ProductName");
        productPositioningProductNameList = $("#Product_Positioning").jqGrid("getCol", "Product");
        pmdDataProductNameList = $.grep(productPositioningProductNameList, function (el) { return $.inArray(el, productList) == -1 });

        $("option").remove("#PmdData_ProductName .ProductOption");

        if (pmdDataProductNameList.length > 0) {

            var productOption = "";

            $.each(pmdDataProductNameList, function (i, obj) {

                if (obj != "") {
                    productOption += '<option class="ProductOption" value="' + obj + '">' + obj + '</option>'
                }
            });

            $("#PmdData_ProductName").append(productOption);
        }
    });
}

function validatePmdReviewSaveForm() {

    $('#NPD_Save_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    $('div#SaveModal').modal('show');
    $("#NPD_Save_Ok").click(function () {
        $('#NPD_Save_Ok').prop("disabled", true);

        var pmdData = jQuery('#PMD_Data').jqGrid('getGridParam', 'data');
        var targetCostData = jQuery('#Target_Cost').jqGrid('getGridParam', 'data');

        $('#PmdData').val(JSON.stringify(pmdData));
        $('#NpdTargetCostData').val(JSON.stringify(targetCostData));
        if (statusId == 16) {
            $('#NpdCurrentStatusName').val("Under Exploration");
            $('#NpdStatus').val(16);

        } else if (statusId == 5) {
            $('#NpdCurrentStatusName').val("Fine Screening Review");
            $('#NpdStatus').val(5);

        }
        $('#SavedRemarks').val(JSON.stringify(arrayDetails));
        $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

        document.getElementById('Npd_Edit_Form_Submit').submit();
    });
}

function validatePmdReviewAcceptForm() {

    $('#Common_Cofirmation_Popup_Ok').prop("disabled", false);
    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var pmdData = [];
    var targetCostData = [];
    var approvalStatus = [];
    if (statusId == 5) {
        $('#Error_PmdData').hide();
        $('.Error_EmptyGrid').hide();

        pmdData = jQuery('#PMD_Data').jqGrid('getGridParam', 'data');
        targetCostData = jQuery('#Target_Cost').jqGrid('getGridParam', 'data');

        pmdData.length == 0 ? ($('#Error_PmdData').show(), flag = false) : $('#Error_PmdData').hide();
    } else if (statusId == 16) {
        pmdData = jQuery('#PMD_Data').jqGrid('getGridParam', 'data');
        targetCostData = jQuery('#Target_Cost').jqGrid('getGridParam', 'data');

        pmdData.length == 0 ? ($('#Error_PmdData').show(), flag = false) : $('#Error_PmdData').hide();
    }


    if (flag) {

        $('div#Common_Cofirmation_Popup').modal('show');
        $('#Common_Cofirmation_Popup_Heading').text("Accept Confirmation");
        $('#Common_Cofirmation_Popup_Message').text("Are you sure you want to Accept the Project Brief?");

        $('#Common_Cofirmation_Popup_Ok').click(function () {

            var acceptRemarks = $.trim($('#Confirmation_Remarks').val());

            acceptRemarks == "" ? ($('#Error_Npd_ConfirmationRemarks').show().text('Please enter Confirmation Remarks'), flag = false) : ($('#Error_Npd_ConfirmationRemarks').hide(), flag = true);

            if (flag) {

                $('#Common_Cofirmation_Popup_Ok').prop("disabled", true);
                if (statusId == 5) {
                    approvalStatus = [{
                        FromStage: 5,
                        FromStageName: "Fine Screening Review",
                        Action: "Accept",
                        ToStage: 6,
                        ToStageName: "Accepted"
                    }];
                    $('#NpdCurrentStatusName').val("Fine Screening Review");
                    $('#NpdStatus').val(6);
                } else if (statusId == 16) {
                    approvalStatus = [{
                        FromStage: 16,
                        FromStageName: "Extended Fine Screening Review",
                        Action: "Accept",
                        ToStage: 6,
                        ToStageName: "Accepted"
                    }];
                    $('#NpdCurrentStatusName').val("Under Exploration");
                    $('#NpdStatus').val(6);
                }

                $('#PmdData').val(JSON.stringify(pmdData));
                $('#NpdTargetCostData').val(JSON.stringify(targetCostData));
                $('#ConfirmationRemarks').val(acceptRemarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));

                $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

                document.getElementById('Npd_Edit_Form_Submit').submit();
            }
        });
    }
}

function validatePmdReviewSendBackForm() {

    $('#Common_Cofirmation_Popup_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var approvalStatus = [];

    var previousStage = ""
    for (var i = 0; i < jsonFormNpdData["ApprovalStatusData"].length; i++) {

        var status = jsonFormNpdData.ApprovalStatusData[i].FromStage;
        if (status == "11" || status == "5" || status == "16" || status == "9" || status == "8") {
            continue;
        }
        else {
            var previousStage = status;
            break;
        }
    }
    if (flag) {

        $('div#Common_Cofirmation_Popup').modal('show');
        $('#Common_Cofirmation_Popup_Heading').text("Send Back Confirmation");
        $('#Common_Cofirmation_Popup_Message').text("Are you sure you want to Send Back to the Project Brief?");

        var pmdData = jQuery('#PMD_Data').jqGrid('getGridParam', 'data');
        var targetCostData = jQuery('#Target_Cost').jqGrid('getGridParam', 'data');

        $('#Common_Cofirmation_Popup_Ok').click(function () {

            var sendBackRemarks = $.trim($('#Confirmation_Remarks').val());
            sendBackRemarks == "" ? ($('#Error_Npd_ConfirmationRemarks').show().text('Please enter Send Back Remarks'), flag = false) : ($('#Error_Npd_ConfirmationRemarks').hide(), flag = true);

            if (flag) {

                $('#Common_Cofirmation_Popup_Ok').prop("disabled", true);
                if (statusId == 5) {
                    if (previousStage == '2' || previousStage == '13') {
                        approvalStatus = [{
                            FromStage: 5,
                            FromStageName: "Fine Screening Review",
                            Action: "Send Back",
                            ToStage: 13,
                            ToStageName: "Brief Demoted to HGML"
                        }];

                        $('#NpdStatus').val(13);
                    }
                    if (previousStage == "4" || previousStage == '14') {
                        approvalStatus = [{
                            ProjectType: "Npd",
                            FromStage: 5,
                            FromStageName: "Fine Screening Review",
                            Action: "Send Back",
                            ToStage: 14,
                            ToStageName: "Brief Demoted to HGML"
                        }];

                        $('#NpdStatus').val(14);
                    }
                } else if (statusId == 16) {
                    if (previousStage == '2' || previousStage == '13') {
                        approvalStatus = [{
                            FromStage: 16,
                            FromStageName: "Extended Fine Screening Review",
                            Action: "Send Back",
                            ToStage: 13,
                            ToStageName: "Brief Demoted to HGML"
                        }];

                        $('#NpdStatus').val(13);
                    }
                    if (previousStage == "4" || previousStage == '14') {
                        approvalStatus = [{
                            ProjectType: "Npd",
                            FromStage: 16,
                            FromStageName: "Extended Fine Screening Review",
                            Action: "Send Back",
                            ToStage: 14,
                            ToStageName: "Brief Demoted to HGML"
                        }];

                        $('#NpdStatus').val(14);
                    }
                }
                $('#NpdCurrentStatusName').val("Fine Screening Review");
                $('#PmdData').val(JSON.stringify(pmdData));
                $('#NpdTargetCostData').val(JSON.stringify(targetCostData));
                $('#ConfirmationRemarks').val(sendBackRemarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));

                $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

                document.getElementById('Npd_Edit_Form_Submit').submit();
            }
        });
    }
}


var userEmailListWithHub = [];

$("#HgmlData_HubDropdown").change(function () {

    var HubIds = $("#HgmlData_HubDropdown").val().toString();
    userEmailListWithHub = [];

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

                });
                $("#HgmlData_HubUsersDropdown").html(userEmailList);
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
        maxHeight: 5,
        buttonWidth: '100%',

        dropUp: true
    });
});

var nonZeroEntered = false; // Flag to track if a non-zero number has been entered

function onlyNumbers(evt) {
    var e = event || evt;
    var charCode = e.which || e.keyCode;

    if (evt.id == "TC_TargetCost" || evt.id == "BI_ProposedSellingPrice" || evt.id == "BI_ProposedTP" || evt.id == "BI_ExpectedGP") {


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
    PmdReview_SelectedUsers == '' ? ($('#Error_PmdReview_SendMail_HubUser_Dropdown').text('Please select users'), flag = false) : $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('');

    if (flag) {
        $('#sendMailModal').modal('hide');
        $('#PmdReview_SendMail_Button').prop("disabled", true);

        downloaddocfile();
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
            $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('')
            $("#PmdReview_SendMail_HubUser_Dropdown").val('').multiselect('rebuild');
        }
        else {
            $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('Please select users');
        }
    }
});

$("#PmdReview_SendMail_HubUser_Dropdown").change(function () {
    $('#Error_PmdReview_SendMail_HubUser_Dropdown').text('');
});
$('#HgmlData_HubDropdown').change(function (e) {

    $('#HgmlData_HubDropdown').val() == '' ? $('#Error_HgmlDataHub').show() : $('#Error_HgmlDataHub').hide();
});

$("#HgmlData_HubUsersDropdown").change(function (e) {

    $('#Error_HgmlDataHubUsers1').hide();
    var selectList = [];

    $('.HubUsersOption').find('input[type=checkbox]').prop("disabled", false);

    selectList = $(this).find('option:selected');
    $.each(selectList, function (i, obj1) {
        $(".HubUsersOption").each(function (i, obj2) {

            if ($(this).attr("class").replace(' multiselect-filter-hidden', '') == obj1.className && $.trim($(this).val()) != $.trim(obj1.value)) {
                $(this).find('input[type=checkbox]').prop("disabled", true);
            }
        });
    });
});

$(window).on('hidden.bs.modal', function () {
    $('.closeModal').val("");
    $('.Error_closeModal').text('');
    $('#PmdReview_SelectedUsers').val('');
    $('#PmdReview_SendMail_Remarks').val('');
    $('#PMDReviewDivision').val('').multiselect('rebuild')
    $("#PmdReview_SendMail_HubUser_Dropdown").val('').multiselect('rebuild');

    $('#DueDate').val('');
    $('#PopUp_SendToExpRemarks').val('');
    $('#Error_Reformulation_PMDremarks').hide();
    $('#Error_Daypicker').hide();

});

function downloaddocfile() {
    var PmdReview_SelectedUsers = $("#PmdReview_SelectedUsers").val();
    var PmdReview_SendMail_Remarks = $("#PmdReview_SendMail_Remarks").val()

    var fd = new FormData();
    var ProjectId = $('#ProjectId').val();
    var Status = statusId;

    $.ajax({
        url: ROOT + "ProjectBrief/Header",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectId: ProjectId, Type: "NPD" },
        success: function (result) {

            $('.Header').html(result);
            var htmlHeaderdata = $(".Header").html();

            fd.append('JsonHeaderString', htmlHeaderdata)
            $.ajax({
                url: ROOT + "ProjectBrief/PDFNPD",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "NPD", Status: Status },
                success: function (result) {

                    $('.PDFNPD').html(result);
                    var htmldata = $(".PDFNPD").html();

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
                        }
                    })
                }
            })
        }
    })
}
$(document).ready(function () {

    if (iconName == 'View') {

        $('.NotInView').hide();

        $('#Npd_Edit_Form_Submit *:not(button)').attr('readonly', 'readonly');
        $('#Npd_Edit_Form_Submit *:not(button)').attr('disabled', true);

        $('.btn-ap, .btn-sb, .btn-add, .btn-rej, .btn-cnl, .btn-mail').hide();
        $('.btn-cnl').show();
    }

});


colmodels = [
    {
        name: 'HubName',
        label: 'HUB',
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
        name: 'HgmlOrHubDataHubRemarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true
    },
];

$("#HUB_ParticipatingMarkets").jqGrid({
    url: '',
    datatype: 'local',
    data: [], /*JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList*/
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_HUB_ParticipatingMarkets',
    rowNum: 1000,
    scroll: true,
    gridComplete: function () {
        var objRows = $("#HUB_ParticipatingMarkets tbody tr");
        var objHeader = $("#HUB_ParticipatingMarkets tbody tr td");
        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
    }
});

$("#HUB_ParticipatingMarkets_V").jqGrid({
    url: '',
    datatype: 'local',
    data: [], /*JsonFormReformulationHubReviewData.HgmlDataHUBParticipatingMarketsList*/
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_HUB_ParticipatingMarkets_V',
    rowNum: 1000,
    scroll: true,
    gridComplete: function () {
        var objRows = $("#HUB_ParticipatingMarkets_V tbody tr");
        var objHeader = $("#HUB_ParticipatingMarkets_V tbody tr td");
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

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center action_icons icon_section align-items-left">
                        <a onclick=onEditTargetCost(` + options.rowId + `) class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
                        <a onclick=onDeleteTargetCost(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete" title="Delete"></i></a>
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
        name: 'Sku',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Currency',
        label: 'Currency',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TargetCost',
        label: 'Accepted Target Cost',
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

    $("#Target_Cost").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdPmdReviewData.length == 0 ? [] : jsonFormNpdPmdReviewData["TargetCostDataList"],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Target_Cost',
        rowNum: 200,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Target_Cost tbody tr");
            var objHeader = $("#Target_Cost tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            if (iconName == 'View') {

                jQuery("#Target_Cost").jqGrid('hideCol', "Action");
            }

        }
    });
$("#Target_Cost_V").jqGrid({
    url: '',
    datatype: 'local',
    data: jsonFormNpdPmdReviewData.length == 0 ? [] : jsonFormNpdPmdReviewData["TargetCostDataList"],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_Target_Cost_V',
    rowNum: 200,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Target_Cost_V tbody tr");
        var objHeader = $("#Target_Cost_V tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        jQuery("#Target_Cost_V").jqGrid('hideCol', "Action");

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


$("#TC_ProductName").change(function () {
    var productName = $("#TC_ProductName").val();

    productName == "" ? ($("#Error_TC_ProductName").show().text('Please select Product')) : $("#Error_TC_ProductName").hide().text('');

    var productPositioningData = $("#Product_Positioning").jqGrid("getGridParam", "data");
    var skuArray = [];

    $.each(productPositioningData, function (i, data) {

        if ($.trim(data.Product) == productName) {

            skuArray = data.Sku.split(',').map(item => item.trim());
        }
    });

    var skuOption = "";

    skuArray.forEach(function (item, index) {

        skuOption += `<option class="SkuOption" value="` + item + `" >` + item + `</option>`
    });

    $("option").remove("#TC_Sku .SkuOption");

    $('#TC_Sku').append(skuOption);
});

var editRowId2 = 0;

$("#Add_TargetCost").click(function () {

    $(".Error_TC").hide();
    $('.Error_EmptyGrid').hide();

    var productName = $("#TC_ProductName").val();
    var sku = $("#TC_Sku").val();
    var targetCost = $("#TC_TargetCost").val();
    var currency = $("#TC_Currency").val();
    var Remarks = $.trim($("#TargetCostRemarks").val());
    var flag1 = true;
    if (productName == "" || sku == "") {

        flag1 = false;
        productName == "" ? $("#Error_TC_ProductName").show().text('Please select Product Name') : $("#Error_TC_ProductName").hide().text('');
        sku == "" ? $("#Error_TC_Sku").show() : $("#Error_TC_Sku").hide();
    }

    if (flag1) {

        var gridRowData = $("#Target_Cost").jqGrid('getGridParam', 'data');
        var flag = 0;

        gridRowData.forEach(function (item, index) {

            if (item.ProductName == productName && item.Sku == sku && editRowId2 != (index + 1)) {

                flag1 = false;
                flag = 1;
            }
        });
        if (flag) {
            $('#Error_TC_Product_Sku').show().text('Selected Product and SKU combination already exists');
        }
    }

    if (flag1) {

        $('.Error_TC').hide();

        var griddata = [];
        var targetCostData = {};

        targetCostData = {
            ProductName: productName,
            Sku: sku,
            TargetCost: targetCost,
            Currency: currency,
            TargetCostRemarks: Remarks,
        };

        $('.TargetCost').val("");                            // To reset the text box fields

        if (editRowId2 == 0) {

            griddata.push(targetCostData);
            var TC1 = $("#Target_Cost").jqGrid('getGridParam', 'data');
            var TC2 = $.merge(TC1, griddata);
            $("#Target_Cost").jqGrid('setGridParam', { data: TC2 });
            $("#Target_Cost").trigger('reloadGrid', [{ page: 1 }]);
        }
        else {
            $("#Target_Cost").jqGrid('setRowData', editRowId2, targetCostData);
            $("#Target_Cost").trigger('reloadGrid', [{ page: 1 }]);

            editRowId2 = 0;
        }
    }
});

function onEditTargetCost(editRowId) {

    editRowId2 = editRowId;

    $(".Error_TC").hide();

    var DataFromTheRow = jQuery('#Target_Cost').jqGrid('getRowData', editRowId);

    var productPositioningData = $("#Product_Positioning").jqGrid("getGridParam", "data");
    var skuArray = [];

    var selectedSkuArray = DataFromTheRow.Sku?.split(',').map(item => item.trim());

    $.each(productPositioningData, function (i, data) {

        if ($.trim(data.Product) == DataFromTheRow.ProductName) {

            skuArray = data.Sku?.split(',').map(item => item.trim());
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

    $("option").remove("#TC_Sku .SkuOption");
    $('#TC_Sku').append(skuOption);

    $("#TC_ProductName").val(DataFromTheRow.ProductName);
    $("#TC_Sku").val(DataFromTheRow.Sku);
    $("#TC_TargetCost").val(DataFromTheRow.TargetCost);
    $("#TC_Currency").val(DataFromTheRow.Currency);
    $("#TargetCostRemarks").val(DataFromTheRow.TargetCostRemarks);
}
function onDeleteTargetCost(deleteRowId) {

    var DataFromTheRow = jQuery('#Target_Cost').jqGrid('getRowData', deleteRowId);
    confirm("Are you sure you want to delete?", function () {

        $("#Target_Cost").jqGrid('delRowData', deleteRowId);
        $("#Target_Cost").trigger('reloadGrid', [{ page: 1 }]);

        editRowId2 = 0;
        deleteRowId = 0;
        $('.TargetCost').val('');
    });
}

$('[data-multiselect]').multiselect({
    includeSelectAllOption: true,
    buttonWidth: 220,
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});

var deletedImageNameList = [];
function onDeleteImage(gridId, imageName, rowId) {

    if (gridId == "Formulation_Profile") {

        confirm("Are you sure you want to delete image?", function () {

            var dataFromTheRow = formulationProfileData_1[rowId];

            FormulationProfile = {
                Product: dataFromTheRow.Product,
                DesiredIngredients: dataFromTheRow.DesiredIngredients,
                IndicationOrConditions: dataFromTheRow.IndicationOrConditions,
                MustHaveClaims: dataFromTheRow.MustHaveClaims,
                NiceToHaveClaims: dataFromTheRow.NiceToHaveClaims,
                DosageForm: dataFromTheRow.DosageForm,
                BenchmarkProducts: dataFromTheRow.BenchmarkProducts,
                DesiredProductCharacteristics: dataFromTheRow.DesiredProductCharacteristics,
                BenchmarkProductsImage: ""
            }
            deletedImageNameList.push(dataFromTheRow.BenchmarkProductsImage);
            formulationProfileData_1[rowId] = FormulationProfile;
        });
    }

    if (gridId == "Packaging_Profile") {

        confirm("Are you sure you want to delete image?", function () {
            var dataFromTheRow = packagingProfileData_1[rowId];

            PackagingProfile = {
                Product: dataFromTheRow.Product,
                SKU: dataFromTheRow.SKU,
                PrimaryPackaging: dataFromTheRow.PrimaryPackaging,
                SecondaryPackaging: dataFromTheRow.SecondaryPackaging,
                TertiaryPackaging: dataFromTheRow.TertiaryPackaging,
                BenchmarkProducts: dataFromTheRow.BenchmarkProducts,
                DesiredPackagingCharacteristics: dataFromTheRow.DesiredPackagingCharacteristics,
                Others: dataFromTheRow.Others,
                Mould: dataFromTheRow.Mould,
                ImagesUpload: "",
            }

            deletedImageNameList.push(dataFromTheRow.ImagesUpload);
            packagingProfileData_1[rowId] = PackagingProfile;

        });
    }
}

// Sustainability section codes
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return `<div class="text-center action_icons icon_section align-items-left">
            <a onclick=onEditSustainability(` + options.rowId + `) class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fas fa-pen pr-2 color-info" title="Edit"></i></a>
            <a onclick=onDeleteSustainability(` + options.rowId + `) class="icon_color btn_button" title="Delete" ><i class="fa fas fa-trash color-delete"  title="Delete"></i></a>
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
        rowNum: 20,
        mtype: 'GET',
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['Sustainability'],
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

            if (statusId == 2 || statusId == 3 || statusId == 4 || statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12 || statusId == 7 || statusId == 13 || statusId == 14 || iconName == 'View') {
                jQuery("#Table_Sustainability").jqGrid('hideCol', "Action");
            }
        }
    });



$("#Table_Sustainability_V").jqGrid({
    height: 'auto',
    rowNum: 20,
    mtype: 'GET',
    url: '',
    datatype: 'local',
    data: jsonFormNpdData['Sustainability'],
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

//HUB remarks grid for Sustainability section

colmodels = [

    {
        name: 'Hub',
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
        data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveSustainabilityHubRemarks"],
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
$("#Sustainability_Remarks_V").jqGrid({
    url: '',
    datatype: 'local',
    data: jsonFormNpdHgmlApproveData.length == 0 ? [] : jsonFormNpdHgmlApproveData["HgmlApproveSustainabilityHubRemarks"],
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_Sustainability_Remarks_V',
    rowNum: 1000000,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Sustainability_Remarks_V tbody tr");
        var objHeader = $("#Sustainability_Remarks_V tbody tr td");

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


//Table for field remarks
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
            <a onclick="currentrowdelete(`+ options.rowId + `)" class="btn-icon -delete"><i class="fa fas fa-trash color-delete" title="Delete" aria-hidden="true"</i></a></div>`

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
        name: 'fieldId',
        label: 'fieldId',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'ProjectId',
        label: 'ProjectId',
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
    }, {
        name: 'RemarksId',
        label: 'RemarksId',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
],
    $("#FieldRemarks_Table").jqGrid({
        height: 'auto',
        rowNum: 1000,
        mtype: 'GET',
        url: '',
        datatype: 'local',
        data: [],
        loadonce: true,
        colModel: colmodels,
        pager: "#pager_FieldRemarks_Table",
        viewrecords: true,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#FieldRemarks_Table tbody tr");
            var objHeader = $("#FieldRemarks_Table tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            if (statusId == 5 || statusId == 16 || statusId == 6 || statusId == 12 || statusId == 3) {
                jQuery("#FieldRemarks_Table").jqGrid('hideCol', "Action");
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

//On click of field remarks icon

function onClickFieldRemarksIcon(sectionType, index, fieldId, fieldName) {

    field = fieldId;
    var rowData = {};
    if (sectionType == "PPR") {
        rowData = packagingProfileData_1[index];
        sku = rowData.SKU;
    }
    if (sectionType == "FP") {
        rowData = formulationProfileData_1[index];
        sku = "";

    }
    var productName = rowData.Product;
    var projectId = $("#ProjectId").val();
    SKU = sku;
    $.ajax({
        type: 'POST',
        url: ROOT + "ProjectBrief/GetFieldRemarks",
        data: { projectId: projectId, productName: productName, sku: sku, fieldId: fieldId },
        success: function (data) {
            $('#FieldRemarks_ModalName').text(fieldName + " - Remarks");
            $('#FiledRemarks_ProductName').text(rowData.Product);
            $('#FiledRemarks_SKU').text(sku);
            $('#FiledRemarks_FieldId').text(fieldId);

            $('#FieldRemarks_Modal').modal('show');

            if (isPreview == 1) {
                $("#Save_FieldRemarks").hide();
            }
            else {
                $("#Save_FieldRemarks").show();
            }
            const filteredArray = data.filter(obj1 =>
                !deletedRemarksData.some(obj2 => obj2.RemarksId === obj1.RemarksId)
            );
            const savedArray = savedProjectRemarksData.filter(obj1 =>
                !deletedRemarksData.some(obj2 =>
                    obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
                )
            );
            const data1 = filteredArray.concat(savedArray);
            var mergedArray = data1.filter(s => s.FieldId == field && s.Product == productName && s.SKU == sku);

            $('#FieldRemarks_Table').jqGrid("clearGridData");
            $("#FieldRemarks_Table").jqGrid('setGridParam', { data: mergedArray });
            $("#FieldRemarks_Table").trigger('reloadGrid', [{ page: 1 }]);
        },

    });
    if (iconName == 'View' || isPreview == 1) {
        jQuery("#FieldRemarks_Table").jqGrid('hideCol', "Action");
    }
    else {
        jQuery("#FieldRemarks_Table").jqGrid('showCol', "Action");
    }

}

$('#Save_FieldRemarks').on("click", function () {
    var Projectid = $("#ProjectId").val();
    var remarks = $.trim($("#FieldRemarks_Value").val());
    var product = $.trim($('#FiledRemarks_ProductName').text());
    var userName = $('#UserName').val();
    var flag = true;
    remarks == "" ? flag = false : "";
    var rowData = $("#FieldRemarks_Table").jqGrid("getRowData");
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
            UpdatedBy: userName,
            CreatedBy: userName,
            RemarksId: maxRemarksId + 1,
        }
        griddata.push(RemarksData);
        var Remarks1 = $("#FieldRemarks_Table").jqGrid('getGridParam', 'data');
        var Remarks2 = $.merge(Remarks1, griddata);
        $("#FieldRemarks_Table").jqGrid('setGridParam', { data: Remarks2 });
        $("#FieldRemarks_Table").trigger('reloadGrid', [{ page: 1 }]);

        addedData = {
            ProjectId: Projectid,
            Remarks: remarks,
            UpdatedBy: userName,
            FieldId: field,
            SKU: sku,
            Product: product,
            CreatedBy: userName,
            RemarksId: maxRemarksId + 1,
        }
        savedProjectRemarksData.push(addedData);
        $('#FieldRemarks_Value').val('');
        $('#Save_FieldRemarks').attr("disabled", false);
        var indexToRemove = deletedRemarksData.findIndex(obj =>
            obj.ProjectId === addedData.ProjectId &&
            obj.Product === addedData.Product &&
            obj.SKU === addedData.SKU &&
            obj.FieldId === addedData.FieldId &&
            obj.Remarks === addedData.Remarks
            && parseInt(obj.RemarksId) == parseInt(addedData.RemarksId)
        );
        if (indexToRemove !== -1) {
            deletedRemarksData.splice(indexToRemove, 1);
        }
    }
});
function currentrowdelete(RowData) {
    confirm("Are you sure you want to delete?", function () {
        var projectid = $("#ProjectId").val();
        var sku = $.trim($('#FiledRemarks_SKU').text());
        var product = $.trim($('#FiledRemarks_ProductName').text());
        var remarksData = jQuery('#FieldRemarks_Table').jqGrid('getRowData', RowData);

        var data = {
            ProjectId: projectid,
            Remarks: remarksData.Remarks,
            FieldId: field,
            SKU: sku,
            Product: product,
            RemarksId: remarksData.RemarksId,
        }
        deletedRemarksData.push(data);
        var indexToRemove = savedProjectRemarksData.findIndex(obj =>
            obj.ProjectId === data.ProjectId &&
            obj.Product === data.Product &&
            obj.SKU === data.SKU &&
            obj.FieldId === data.FieldId &&
            obj.Remarks === data.Remarks && parseInt(obj.RemarksId) == parseInt(data.RemarksId)
        );
        if (indexToRemove !== -1) {
            savedProjectRemarksData.splice(indexToRemove, 1);
        }
        $("#FieldRemarks_Table").jqGrid('delRowData', RowData);
        $("#FieldRemarks_Table").trigger('reloadGrid', [{ page: 1 }]);

    });
}

/** on click of icon business values*/
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

    },
],

    $("#TotalBusinessValue_Popup").jqGrid({
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

            var objRows = $("#TotalBusinessValue_Popup tbody tr");
            var objHeader = $("#TotalBusinessValue_Popup tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (var i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$("#TotalBusinessValue_Popup").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
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
        url: ROOT + 'ProjectBrief/GetTotalBusinessValue?projectId=' + projectId + '&ProjectType=' + 1 + '&Year=' + year,
        success: function (Result) {

            var jsondata = JSON.parse(Result);
            var grid = $("#TotalBusinessValue_Popup");
            var colModel = $("#TotalBusinessValue_Popup").jqGrid("getGridParam", "colModel");
            var hideColumns = [];

            for (var i = 0; i < colModel.length; i++) {
                var colName = colModel[i].name;
                if (isNullColumn(colName, jsondata) || isZeroColumn(colName, jsondata)) {
                    grid.jqGrid("hideCol", colName);
                    hideColumns.push(colName);
                }
            }

            jQuery('#TotalBusinessValue_Popup').jqGrid('clearGridData');
            $("#TotalBusinessValue_Popup").jqGrid().setGridParam({
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
    var grid = $("#TotalBusinessValue_Popup");
    var colModel = grid.jqGrid("getGridParam", "colModel");
    var colTotals = {};

    for (var i = 2; i < colModel.length; i++) {

        var colName = colModel[i].name;
        var total = grid.jqGrid("getCol", colName, false, "sum");
        colTotals[colName] = isNaN(total) ? "" : numberWithCommas(total.toFixed(2));
    }

    colTotals["Product"] = "Total ($)";
    grid.footerData("set", colTotals, false);
    grid.trigger("reloadFooterData");
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function adjustGridHeight() {
    var gridHeight = $("#TotalBusinessValue_Popup").jqGrid("getGridParam", "records") * 23 + 45;
    $("#TotalBusinessValue_Popup").jqGrid("setGridHeight", gridHeight);
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
    if (statusId == 1 || (statusId == 8 || statusId == 11 && iconName != 'View')) {

        setInterval(() => {
            validateEditDataSave();
            $('#loader').hide();
            $("#loader").css("visibility", "hidden");
        }, 5 * 60 * 1000)
    }

});
function validateEditDataSave() {
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
    if (projectName == "") {
        return validateEditDataSave(); // Exit the function if projectName is empty
    }
    //$('#Npd_Edit_Form_Submit').validate();
    //if ($('#Npd_Edit_Form_Submit').valid()) {
    //}
    //else {
    //    return validateEditDataSave();
    //}

    if (statusId == 1) {
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
        $('#NpdCurrentStatusName').val("New");

    } else if (statusId == 8) {
        $("#NPD_Table").each(function (i) {

            npdHeaderTableData.push({
                ProjectName: projectName,
                ProjectType: "1",
                Hub: $(this).find('#NPD_Hub').text(),
                Division: $(this).find('#NPD_Division option:selected').val(),
                Category: $(this).find('#NPD_Category option:selected').val(),
                InitiatedBy: $.trim($(this).find('#NPD_InitiatedBy').text()),
                InitiatedDate: $(this).find('#NPD_InitiatedDate').text(),
                Status: "8"
            });
        });
        $('#NpdCurrentStatusName').val("Sent Back to Initiator");
    } else if (statusId == 11) {
        $("#NPD_Table").each(function (i) {

            npdHeaderTableData.push({
                ProjectName: projectName,
                ProjectType: "1",
                Hub: $(this).find('#NPD_Hub').text(),
                Division: $(this).find('#NPD_Division option:selected').val(),
                Category: $(this).find('#NPD_Category option:selected').val(),
                InitiatedBy: $.trim($(this).find('#NPD_InitiatedBy').text()),
                InitiatedDate: $(this).find('#NPD_InitiatedDate').text(),
                Status: "11"
            });
        });
        $('#NpdCurrentStatusName').val("Brief Demoted to Initiator");
    }


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
    $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));
    $('#UserName').val($('#UserName').val());
    $.ajax({
        url: ROOT + "ProjectBrief/NPDAutoSaveEditData",
        type: 'POST',
        data: $('#Npd_Edit_Form_Submit').serialize(),
        success: function (response) {
        },
        error: function (error) {
        }
    });
}
function validateNpdsendbackForm() {

    $('#NPD_SendBackToInitiator_Ok').prop("disabled", false);

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

    $('#Npd_Edit_Form_Submit').validate();
    if ($("#Npd_Edit_Form_Submit").valid()) {
    }
    else {
        flag = false;
    }

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

        $('div#SendbackModal').modal('show');
        $("#NPD_SendBackToInitiator_Ok").click(function () {

            var sendBackToInitiatorRemarks = $.trim($('#PopUp_SendBackToInitiatorRemarks').val());

            sendBackToInitiatorRemarks == "" ? ($('#Error_Npd_SendBackToInitiatorRemarks').show(), flag = false) : ($('#Error_Npd_SendBackToInitiatorRemarks').hide(), flag = true);
            if (flag) {
                $('#NPD_SendBackToInitiator_Ok').prop("disabled", true);


                if (deletedImageNameList.length > 0) {

                    $.each(deletedImageNameList, function (index, fileName) {

                        if (fileName != '') {
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

                $("#NPD_Table").each(function (i) {

                    npdHeaderTableData.push({
                        ProjectName: projectName,
                        ProjectType: "1",
                        Hub: $(this).find('#NPD_Hub').text(),
                        Division: $(this).find('#NPD_Division option:selected').val(),
                        Category: $(this).find('#NPD_Category option:selected').val(),
                        InitiatedBy: $.trim($(this).find('#NPD_InitiatedBy').text()),
                        InitiatedDate: $(this).find('#NPD_InitiatedDate').text(),
                        Status: "8"
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
                    FromStage: 9,
                    FromStageName: "Pending For Approval",
                    Action: "Send Back",
                    ToStage: 8,
                    ToStageName: "Sent Back to Initiator"
                }];

                $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
                $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
                $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
                $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
                $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
                $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SendBackToInitiatorRemarks').val(sendBackToInitiatorRemarks);
                $('#NpdCurrentStatusName').val("Pending For Approval");
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

                $('#NpdStatus').val(8);

                document.getElementById('Npd_Edit_Form_Submit').submit();

            }
        });
    }
}


/*	on click of send to Manages*/
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

    $('#Npd_Edit_Form_Submit').validate();
    if ($('#Npd_Edit_Form_Submit').valid()) {
    }
    else {
        flag = false;
    }

    if ($('#Npd_BusinessObjective-error').text() != '') {

        $("#Error_Npd_BusinessObjective").hide();
    }


    actualData == '' ? ($("#Error_Npd_BusinessObjective").show(), flag = false) : $("#Error_Npd_BusinessObjective").hide();
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

            if (deletedImageNameList.length > 0) {

                $.each(deletedImageNameList, function (index, fileName) {

                    if (fileName != '') {
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
            if (statusId == 8) {
                approvalStatus = [{
                    FromStage: 8,
                    FromStageName: "Sent Back to Initiator",
                    Action: "Send to Manager Review",
                    ToStage: 9,
                    ToStageName: "Pending For Approval"
                }];
                $('#NpdCurrentStatusName').val("Pending For Approval");
            } else if (statusId == 1) {
                approvalStatus = [{
                    FromStage: 1,
                    FromStageName: "Draft",
                    Action: "Send to Manager Review",
                    ToStage: 9,
                    ToStageName: "Pending For Approval"
                }];
                $('#NpdCurrentStatusName').val("Pending For Approval");
            } else if (statusId == 11) {
                approvalStatus = [{
                    FromStage: 11,
                    FromStageName: "Brief Demoted to Initiator",
                    Action: "Send to Manager Review",
                    ToStage: 9,
                    ToStageName: "Pending For Approval"
                }];
                $('#NpdCurrentStatusName').val("Pending For Approval");

            }
            $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
            $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
            $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
            $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
            $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
            $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

            $('#NpdStatus').val(9);
            document.getElementById('Npd_Edit_Form_Submit').submit();

        });
    }
}
/*By Clicking Save button in NPD*/

function validateNpdPendingApprovalSaveForm() {


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

    if (flag) {

        $('div#SaveModal').modal('show');

        $("#NPD_Save_Ok").click(function () {

            $('#NPD_Save_Ok').prop("disabled", true);
            if (deletedImageNameList.length > 0) {
                $.each(deletedImageNameList, function (index, fileName) {

                    if (fileName != '') {
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

            $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
            $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
            $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
            $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
            $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
            $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
            $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));
            $('#UserName').val($('#UserName').val());
            $('#NpdCurrentStatusName').val("Pending For Approval");
            $('#NpdStatus').val(9);
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))

            document.getElementById('Npd_Edit_Form_Submit').submit();

        });
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
            name: '',
            label: 'Action',
            width: 50,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {

                var imageName = encodeURIComponent(rowobject.Image);
                return '<div class="text-center action_icons icon_section align-items-left">' +
                    '<span class="action-link"><a class="btn-icon -download DownloadImage" title="Download Image" onclick=DownloadUploadedImage("' + imageName + '") id="DownloadImage"><i class="fas fa-download color-download" aria-hidden="true"></i></a></span>' +
                    '<span class="action-link ml-2"><a class="btn-icon -view ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye color-eye"></i></a></span>' +
                    '<span class="action-link ml-2"><a class="btn-icon -delete DeletePopUpImage" title="Delete Image" onclick=OnRemoveImage("' + imageName + '","' + rowobject.TableClass + '")><i class="fa fas fa-trash color-delete"></i></a></span>' +
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
            if ((statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) && iconName != 'View') {

                $('.DeletePopUpImage').show();
            } else {
                $('.DeletePopUpImage').hide();
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
    var filename = packagingProfileData_1[rowId].ImagesUpload;
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
        packagingProfileData_1[imageClass].ImagesUpload = InsertImage
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

function ValidateNpdSaveandUpdate() {
    $('#Common_Cofirmation_Popup_Ok').prop("disabled", false);
    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var pmdData = [];
    var targetCostData = [];
    var approvalStatus = [];

    $('#Error_PmdData').hide();
    $('.Error_EmptyGrid').hide();

    pmdData = jQuery('#PMD_Data').jqGrid('getGridParam', 'data');
    targetCostData = jQuery('#Target_Cost').jqGrid('getGridParam', 'data');

    pmdData.length == 0 ? ($('#Error_PmdData').show(), flag = false) : $('#Error_PmdData').hide();

    var projectDetails = fineScreeningData.ProjectDetailsPmdRemarksList.length == 0 ? "" : fineScreeningData.ProjectDetailsPmdRemarksList[0].ProjectDetailsPmdRemarks;
    var productPosition = fineScreeningData.ProductPositioningPmdRemarksList.length == 0 ? "" : fineScreeningData.ProductPositioningPmdRemarksList[0].ProductPositioningPmdRemarks;
    var formulation = fineScreeningData.FormulationProfilePmdRemarksList.length == 0 ? "" : fineScreeningData.FormulationProfilePmdRemarksList[0].FormulationProfilePmdRemarks;
    var packageProfile = fineScreeningData.PackagingProfilePmdRemarksList.length == 0 ? "" : fineScreeningData.PackagingProfilePmdRemarksList[0].PackagingProfilePmdRemarks;
    var businessInfo = fineScreeningData.BusinessInformationPmdRemarksList.length == 0 ? "" : fineScreeningData.BusinessInformationPmdRemarksList[0].BusinessInformationPmdRemarks;
    var sustainability = fineScreeningData.SustainabilityPmdRemarksList.length == 0 ? "" : fineScreeningData.SustainabilityPmdRemarksList[0].SustainabilityPmdRemarks;

    if (pmdData.length == fineScreeningData.PmdDataList.length && targetCostData.length == fineScreeningData.TargetCostDataList.length &&
        $.trim($('#PD_Pmd_Remarks').val()) == projectDetails.replaceAll('\r', '') &&
        $.trim($('#PP_Pmd_Remarks').val()) == productPosition.replaceAll('\r', '') &&
        $.trim($('#FP_Pmd_Remarks').val()) == formulation.replaceAll('\r', '') &&
        $.trim($('#PPR_Pmd_Remarks').val()) == packageProfile.replaceAll('\r', '') &&
        $.trim($('#BI_Pmd_Remarks').val()) == businessInfo.replaceAll('\r', '') &&
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
                if (targetCostData[i].ProductName != fineScreeningData.TargetCostDataList[i].ProductName ||
                    targetCostData[i].Sku != fineScreeningData.TargetCostDataList[i].Sku ||
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

        $('div#Common_Cofirmation_Popup').modal('show');
        $('#Common_Cofirmation_Popup_Heading').text("Update Confirmation");
        $('#Common_Cofirmation_Popup_Message').text("Are you sure you want to Update the Project Brief?");

        $('#Common_Cofirmation_Popup_Ok').click(function () {

            var acceptRemarks = $.trim($('#Confirmation_Remarks').val());

            acceptRemarks == "" ? ($('#Error_Npd_ConfirmationRemarks').show().text('Please enter Remarks'), flag = false) : ($('#Error_Npd_ConfirmationRemarks').hide(), flag = true);

            if (flag) {

                $('#Common_Cofirmation_Popup_Ok').prop("disabled", true);

                if (statusId == 6) {
                    approvalStatus = [{
                        FromStage: 6,
                        FromStageName: "Accepted",
                        Action: "Update",
                        ToStage: 12,
                        ToStageName: "Updated"
                    }];
                    $('#NpdStatus').val(12);
                } else if (statusId == 12) {
                    approvalStatus = [{
                        FromStage: 12,
                        FromStageName: "Updated",
                        Action: "Update",
                        ToStage: 12,
                        ToStageName: "Updated"
                    }];
                    $('#NpdStatus').val(12);
                }

                $('#PmdData').val(JSON.stringify(pmdData));
                $('#NpdTargetCostData').val(JSON.stringify(targetCostData));
                $('#NpdCurrentStatusName').val("Fine Screening Review");
                $('#ConfirmationRemarks').val(acceptRemarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

                $('#Npd_Edit_Form_Submit').submit();
            }
        });
    }
}
function validatePmdReviewSendBackFormToInitiator() {
    $('#Common_Cofirmation_Popup_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var approvalStatus = [];

    var listLength = jsonFormNpdData["ApprovalStatusData"].length;
    listLength = listLength - 1;

    if (flag) {

        $('div#Common_Cofirmation_Popup').modal('show');
        $('#Common_Cofirmation_Popup_Heading').text("Send Back Confirmation");
        $('#Common_Cofirmation_Popup_Message').text("Are you sure you want to Send Back to the Project Brief?");

        var pmdData = jQuery('#PMD_Data').jqGrid('getGridParam', 'data');
        var targetCostData = jQuery('#Target_Cost').jqGrid('getGridParam', 'data');

        $('#Common_Cofirmation_Popup_Ok').click(function () {
            var sendBackRemarks = $.trim($('#Confirmation_Remarks').val());
            sendBackRemarks == "" ? ($('#Error_Npd_ConfirmationRemarks').show().text('Please enter Send Back Remarks'), flag = false) : ($('#Error_Npd_ConfirmationRemarks').hide(), flag = true);

            if (flag) {

                $('#Common_Cofirmation_Popup_Ok').prop("disabled", true);

                if (statusId == 5) {
                    approvalStatus = [{
                        FromStage: 5,
                        FromStageName: "Fine Screening Review",
                        Action: "Send Back",
                        ToStage: 11,
                        ToStageName: "Brief Demoted to Initiator"
                    }];
                    $('#NpdStatus').val(11);
                    $('#NpdCurrentStatusName').val("Fine Screening Review");
                } else if (statusId == 16) {
                    approvalStatus = [{
                        FromStage: 16,
                        FromStageName: "Extended Fine Screening Review",
                        Action: "Send Back",
                        ToStage: 11,
                        ToStageName: "Brief Demoted to Initiator"
                    }];
                    $('#NpdStatus').val(11);
                    $('#NpdCurrentStatusName').val("Under Exploration");
                }

                $('#PmdData').val(JSON.stringify(pmdData));
                $('#NpdTargetCostData').val(JSON.stringify(targetCostData));
                $('#ConfirmationRemarks').val(sendBackRemarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));

                $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

                document.getElementById('Npd_Edit_Form_Submit').submit();
            }
        });
    }
}


function validateInitiatorsendtoPmd() {

    $('#NPD_Submit_Ok').prop("disabled", false);
    $('#ManagerApprovalOK').prop("disabled", false);


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

    $('#Npd_Edit_Form_Submit').validate();
    if ($('#Npd_Edit_Form_Submit').valid()) {
    }
    else {
        flag = false;
    }

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

        if (statusId == '9') {
            $('div#SubmitForHGML').modal('show');
            $("#ManagerApprovalOK").click(function () {
                $('#ManagerApprovalOK').prop("disabled", true);
                var Remarks = $('#ShowManagerApprovalRemarks').val();
                if (deletedImageNameList.length > 0) {
                    $.each(deletedImageNameList, function (index, fileName) {

                        if (fileName != '') {
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
                    FromStage: 9,
                    FromStageName: "Pending For Approval",
                    Action: "Send to PMD",
                    ToStage: 5,
                    ToStageName: "Fine Screening Review"
                }];
                $('#NpdStatus').val(5);
                $('#NpdCurrentStatusName').val("Pending For Approval");


                $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
                $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
                $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
                $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
                $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
                $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SendBackToInitiatorRemarks').val(Remarks);
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));
                $('#Npd_Edit_Form_Submit').submit();

            });
        }
        else {
            $('div#SubmitModal').modal('show');
            $("#NPD_Submit_Ok").click(function () {

                $('#NPD_Submit_Ok').prop("disabled", true);

                if (deletedImageNameList.length > 0) {

                    $.each(deletedImageNameList, function (index, fileName) {

                        if (fileName != '') {
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


                if (statusId == 11) {
                    approvalStatus = [{
                        FromStage: 11,
                        FromStageName: "Brief Demoted to Initiator",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#NpdStatus').val(5);
                    $('#NpdCurrentStatusName').val("Brief Demoted to Initiator");
                } else if (statusId == 9) {
                    approvalStatus = [{
                        FromStage: 9,
                        FromStageName: "Pending For Approval",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#NpdStatus').val(5);
                    $('#NpdCurrentStatusName').val("Pending For Approval");
                }
                else if (statusId == 8) {
                    approvalStatus = [{
                        FromStage: 8,
                        FromStageName: "Sent Back to Initiator",
                        Action: "Send to PMD",
                        ToStage: 5,
                        ToStageName: "Fine Screening Review"
                    }];
                    $('#NpdStatus').val(5);
                    $('#NpdCurrentStatusName').val("Sent Back to Initiator");
                }

                ////
                $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
                $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
                $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
                $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
                $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
                $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid))
                $('#Npd_Edit_Form_Submit').submit();

            });
        }
    }
}
if (statusId == 8 || statusId == 9 || statusId == 11 || statusId == 13 || statusId == 14 || statusId == 4 || statusId == 2) {
    var previousStage = ""
    for (var i = 0; i < jsonFormNpdData["ApprovalStatusData"].length; i++) {
        var id = jsonFormNpdData.ApprovalStatusData[i].FromStage
        if ((id == 13 || id == 14) && (statusId == 8 || statusId == 9)) {
            break;
        }
        else if (id == 16) {
            $('.SendtoUnderExplorationInSendBack').show();
            $('.SendtoUnderExplorInApproval').show();
            $('.SendtoUnderExploration').show();
            $('.sendToPMDinDemoted').hide();
            $('.HideIfDemoted').hide();
            $('.Button_SendToPmd').hide();
            $('.SendtoPMD').hide();
            break;
        }
        else if (id == 5) {
            $('.SendToPmd_').show();
            $('.SendToPmdSendback_').show();
            $('.HideIfDemoted').hide();
            break;
        }
    }
}
if (statusId == 12 || statusId == 6) {
    $(".NotInPmdReview").hide();
}
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
                    '<span class="action-link ml-2"><a class="btn-icon -view ViewImage" onclick=ViewUploadedImage("' + imageName + '") target="_blank" id="ViewImage" title="View Image"><i class="fas fa-eye color-eye"></i></a></span>' +
                    '<span class="action-link ml-2"><a class="btn-icon -delete DeletePopUpImage" title="Delete Image" onclick=OnRemoveFormulationImage("' + imageName + '","' + rowobject.TableClass + '")><i class="fa fas fa-trash color-delete"></i></a></span>' +
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
            if ((statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) && iconName != 'View') {

                $('.DeletePopUpImage').show();
            } else {
                $('.DeletePopUpImage').hide();
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
        formulationProfileData_1[imageClass].BenchmarkProductsImage = InsertImage
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
function validatePmdReviewToUnderExploration() {

    $('#Common_Cofirmation_Popup_Ok').prop("disabled", false);

    $('#ReformulationSendToUnderEX').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var pmdData = [];
    var targetCostData = [];
    var approvalStatus = [];

    $('#Error_PmdData').hide();
    $('.Error_EmptyGrid').hide();

    pmdData = jQuery('#PMD_Data').jqGrid('getGridParam', 'data');
    targetCostData = jQuery('#Target_Cost').jqGrid('getGridParam', 'data');

    if (flag) {

        if (statusId == 5) {
            $('div#SendToUnderExModal').modal('show');
            $('#ReformulationSendToUnderEX').click(function () {
                $('#ReformulationSendToUnderEX').prop("disabled", true);

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
                        Action: "UnderExploration",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                    $('#NpdStatus').val(16);
                    $('#NpdCurrentStatusName').val("Fine Screening Review");

                    $('#PmdData').val(JSON.stringify(pmdData));
                    $('#NpdTargetCostData').val(JSON.stringify(targetCostData));
                    $('#ConfirmationRemarks').val(approveRemarks);
                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                    $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));
                    $('#PMdDueDate').val(date);
                    document.getElementById('Npd_Edit_Form_Submit').submit();
                }
            });

        } else if (statusId == 16) {
            $('div#Common_Cofirmation_Popup').modal('show');
            $('#Common_Cofirmation_Popup_Heading').text("Sent Back Confirmation");
            $('#Common_Cofirmation_Popup_Message').text("Are you sure you want to Sent Back to the Project Brief?");

            $('#Common_Cofirmation_Popup_Ok').click(function () {

                var acceptRemarks = $.trim($('#Confirmation_Remarks').val());
                if (statusId == 5) {
                    acceptRemarks == "" ? ($('#Error_Npd_ConfirmationRemarks').show().text('Please enter Extended Fine Screening Review Remarks'), flag = false) : ($('#Error_Npd_ConfirmationRemarks').hide(), flag = true);
                } else if (statusId == 16) {

                    acceptRemarks == "" ? ($('#Error_Npd_ConfirmationRemarks').show().text('Please enter Send back to Fine screening Remarks'), flag = false) : ($('#Error_Npd_ConfirmationRemarks').hide(), flag = true);
                }

                if (flag) {

                    $('#Common_Cofirmation_Popup_Ok').prop("disabled", true);
                    if (statusId == 5) {
                        approvalStatus = [{
                            FromStage: 5,
                            FromStageName: "Fine Screening Review",
                            Action: "UnderExploration",
                            ToStage: 16,
                            ToStageName: "Extended Fine Screening Review"
                        }];
                        $('#NpdStatus').val(16);
                        $('#NpdCurrentStatusName').val("Fine Screening Review");
                    } else if (statusId == 16) {
                        approvalStatus = [{
                            FromStage: 16,
                            FromStageName: "Extended Fine Screening Review",
                            Action: "Sent Back to Pmd",
                            ToStage: 5,
                            ToStageName: "Fine Screening Review"
                        }];
                        $('#NpdStatus').val(5);
                        $('#NpdCurrentStatusName').val("Under Exploration");
                    }


                    $('#PmdData').val(JSON.stringify(pmdData));
                    $('#NpdTargetCostData').val(JSON.stringify(targetCostData));
                    $('#ConfirmationRemarks').val(acceptRemarks);
                    $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                    $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                    $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));

                    document.getElementById('Npd_Edit_Form_Submit').submit();
                }
            });
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
            if (statusId == "3") {

                if ($('#UserName').val().toLowerCase() == rowobject.CreatedBy.toLowerCase()) {
                    return '<div class="text-left action_icons icon_section align-items-left">' +
                        '<span class="action-link ml-2"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link ml-2"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '<span class="action-link ml-2"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete HideDelete deletehide" title="Delete"><i class="fa fas fa-trash color-delete" title="Delete"></i></a></span>' +
                        '</div> ';
                }
                else {
                    return '<div class="text-left action_icons icon_section align-items-left">' +
                        '<span class="action-link ml-2"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link ml-2"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '</div> ';

                }
            }
            else {
                if (rowobject.StatusId != "3") {
                    return '<div class="text-left action_icons icon_section align-items-left">' +
                        '<span class="action-link ml-2"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link ml-2"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
                        '<span class="action-link ml-2"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete HideDelete deletehide" title="Delete"><i class="fa fas fa-trash color-delete" title="Delete"></i></a></span>' +
                        '</div> ';
                } else {
                    return '<div class="text-left action_icons icon_section align-items-left">' +
                        '<span class="action-link ml-2"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download color-download" title="Download"></i></a></span>' +
                        (fileExtension in fileTypes ? '' : '<span class="action-link ml-2"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye color-eye" title="View"></i></a></span>') +
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
        data: jsonFormNpdData['SupportingDocData'],
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
            if (statusId != 8 && statusId != 9 && statusId != 1 && statusId != 11 && statusId != 3 || (statusId == 11 || statusId == 8 || statusId == 9 || statusId == 1 || statusId == 3) && iconName == 'View') {
                $('.HideDelete').hide();
            }
        }
    });


$('#Grid_Supporting_Document_V').jqGrid({
    url: '',
    datatype: 'local',
    data: jsonFormNpdData['SupportingDocData'],
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
            StatusId: statusId
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


if (iconName == "View") {
    $(".SupprotingDoc").hide();
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

function ValidatePackSubmitToExploration() {

    $('#NPD_Submit_Ok').prop("disabled", false);
    $('#ManagerApprovalOK').prop("disabled", false);


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

    $('#Npd_Edit_Form_Submit').validate();
    if ($('#Npd_Edit_Form_Submit').valid()) {
    }
    else {
        flag = false;
    }

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

        if (statusId == '9') {
            $('div#SubmitForHGML').modal('show');
            $("#ManagerApprovalOK").click(function () {
                $('#ManagerApprovalOK').prop("disabled", true);
                var Remarks = $('#ShowManagerApprovalRemarks').val();
                if (deletedImageNameList.length > 0) {

                    $.each(deletedImageNameList, function (index, fileName) {

                        if (fileName != '') {
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
                    FromStage: 9,
                    FromStageName: "Pending For Approval",
                    Action: "Send to Under Exploration",
                    ToStage: 16,
                    ToStageName: "Extended Fine Screening Review"
                }];
                $('#NpdStatus').val(16);
                $('#NpdCurrentStatusName').val("Pending For Approval");


                $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
                $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
                $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
                $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
                $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
                $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SendBackToInitiatorRemarks').val(Remarks);
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));
                $('#Npd_Edit_Form_Submit').submit();

            });
        }
        else {
            $('div#SubmitModal').modal('show');

            $("#NPD_Submit_Ok").click(function () {

                $('#NPD_Submit_Ok').prop("disabled", true);

                if (deletedImageNameList.length > 0) {

                    $.each(deletedImageNameList, function (index, fileName) {

                        if (fileName != '') {
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


                if (statusId == 11) {
                    approvalStatus = [{
                        FromStage: 11,
                        FromStageName: "Brief Demoted to Initiator",
                        Action: "Send to Under Exploration",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                    $('#NpdStatus').val(16);
                    $('#NpdCurrentStatusName').val("Brief Demoted to Initiator");
                } else if (statusId == 9) {
                    approvalStatus = [{
                        FromStage: 9,
                        FromStageName: "Pending For Approval",
                        Action: "Send to Under Exploration",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                    $('#NpdStatus').val(16);
                    $('#NpdCurrentStatusName').val("Pending For Approval");
                }
                else if (statusId == 8) {
                    approvalStatus = [{
                        FromStage: 8,
                        FromStageName: "Sent Back to Initiator",
                        Action: "Send to Under Exploration",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                    $('#NpdStatus').val(16);
                    $('#NpdCurrentStatusName').val("Sent Back to Initiator");
                }

                $('#NpdHeaderTableData').val(JSON.stringify(npdHeaderTableData));
                $('#ProjectDetailsData').val(JSON.stringify(projectDetailsData));
                $('#ProductPositionigData').val(JSON.stringify(productPositioningGridData));
                $('#FormulationProfileData').val(JSON.stringify(formulationProfileGridData));
                $('#PackagingProfileData').val(JSON.stringify(packagingProfileGridData));
                $('#BusinessInformationData').val(JSON.stringify(businessInformationGridData));
                $('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_imageGrid));
                $('#Npd_Edit_Form_Submit').submit();

            });
        }
    }
}
function ValidateNpdSubmitToExplorationFromHGML() {
    $('#NPD_SendToPmd_Ok').prop("disabled", false);

    const arrayDetails = savedProjectRemarksData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.ProjectId === obj1.ProjectId && obj2.SKU === obj1.SKU && obj2.FieldId === obj1.FieldId && obj2.Product === obj1.Product && obj2.RemarksId === obj1.RemarksId
        )
    );

    var flag = true;
    var hgmlData = $('#HGML_Data').jqGrid('getGridParam', 'data');

    hgmlData.length == 0 ? ($('#Error_HgmlData').show(), flag = false) : $('#Error_HgmlData').hide();

    if (flag) {

        $('div#SendToPmdModal').modal('show');

        $("#NPD_SendToPmd_Ok").click(function () {

            var sendToPmdRemarks = $.trim($('#PopUp_SendToPmdRemarks').val());
            sendToPmdRemarks == "" ? ($('#Error_Npd_SendToPmdRemarks').show(), flag = false) : ($('#Error_Npd_SendToPmdRemarks').hide(), flag = true);

            if (flag) {

                $('#NPD_SendToPmd_Ok').prop("disabled", true);

                if (statusId == 2) {
                    approvalStatus = [{
                        FromStage: 2,
                        FromStageName: "HGML Review",
                        Action: "Send to Under Exploration",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                    $('#NpdStatus').val(16);
                    $('#NpdCurrentStatusName').val("HGML Review");

                } else if (statusId == 13) {
                    approvalStatus = [{
                        FromStage: 13,
                        FromStageName: "Brief Demoted to HGML",
                        Action: "Send to Under Exploration",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                    $('#NpdStatus').val(16);
                    $('#NpdCurrentStatusName').val("Brief Demoted to HGML Review");

                } else if (statusId == 4) {
                    approvalStatus = [{
                        FromStage: 4,
                        FromStageName: "HGML Approve",
                        Action: "Send to Under Exploration",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                    $('#NpdStatus').val(16);
                    $('#NpdCurrentStatusName').val("HGML Approve");
                } else if (statusId == 14) {
                    approvalStatus = [{
                        FromStage: 14,
                        FromStageName: "Brief Demoted to HGML",
                        Action: "Under Exploration",
                        ToStage: 16,
                        ToStageName: "Extended Fine Screening Review"
                    }];
                    $('#NpdStatus').val(16);
                    $('#NpdCurrentStatusName').val("Brief Demoted to HGML Approve");
                }


                $('#HgmlData').val(JSON.stringify(hgmlData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SendToPmdRemarks').val(sendToPmdRemarks);


                $('#SavedRemarks').val(JSON.stringify(arrayDetails));
                $('#DeletedRemarks').val(JSON.stringify(deletedRemarksData));
                document.getElementById('Npd_Edit_Form_Submit').submit();
            }
        });
    }
}
$('.daydatepicker').datepicker({
    autoclose: true,
    viewMode: 'months',
    startDate: '+0d',
    forceParse: false,
    todayHighlight: true,
    format: 'dd-mm-yyyy'
})
$('#Npd_ProjectName,#PP_TargetConsumer,#Npd_InitiatorRemarks').change(function () {

    $('.Npd_ProjectName_V').text($('#Npd_ProjectName').val());
    $('.PP_TargetConsumer_V').text($('#PP_TargetConsumer').val());
    $('.Npd_InitiatorRemarks_V').text($('#Npd_InitiatorRemarks').val());
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

$(document).on('click', '.preview', function () {
    isPreview = 1;

    $(".Division_V").text($("#Division option:selected").text())
    $(".Npd_Category_V").text($("#Npd_Category option:selected").text())
    if ($(".Division_V").text() == "--Select--") {
        $(".Division_V").text('');
    }
    if ($(".Npd_Category_V").text() == "--Select--") {
        $(".Npd_Category_V").text('');
    }

    $('.Npd_ProjectName_V').text(jsonFormNpdData.ProjectDetails.length > 0 ? jsonFormNpdData.ProjectDetails[0].ProjectName : "");
    $('.PP_TargetConsumer_V').text($('#PP_TargetConsumer').val());

    $('.Npd_BusinessObjective_V').empty();
    var businessobjective = `<span>` + CKEDITOR.instances["Npd_BusinessObjective"].getData() + `</span>`;
    $('.Npd_BusinessObjective_V').append(businessobjective);

    $('.PP_CompetitiveOfferings_V').empty();
    var competativeoffering = `<span>` + CKEDITOR.instances["PP_CompetitiveOfferings"].getData() + `</span>`;
    $('.PP_CompetitiveOfferings_V').append(competativeoffering);

    $('.PP_UnmetNeed_V').empty();
    var unmetneed = `<span>` + CKEDITOR.instances["PP_UnmetNeed"].getData() + `</span>`;
    $('.PP_UnmetNeed_V').append(unmetneed);

    $('.PP_HUB_Remarks_V').empty();
    var pphubremarks = `<span>` + CKEDITOR.instances["PP_HUB_Remarks"].getData() + `</span>`;
    $('.PP_HUB_Remarks_V').append(pphubremarks);

    var ProdPosition = $("#Product_Positioning").jqGrid('getGridParam', 'data');
    $('#Product_Positioning_V').jqGrid('clearGridData');
    $("#Product_Positioning_V").jqGrid('setGridParam', { data: ProdPosition });
    $("#Product_Positioning_V").trigger('reloadGrid', [{ page: 1 }]);

    var sustainability = $("#Table_Sustainability").jqGrid('getGridParam', 'data');
    $('#Table_Sustainability_V').jqGrid('clearGridData');
    $("#Table_Sustainability_V").jqGrid('setGridParam', { data: sustainability });
    $("#Table_Sustainability_V").trigger('reloadGrid', [{ page: 1 }]);

    //var Businessinfo = $("#Business_Information").jqGrid('getGridParam', 'data');
    //$('#Business_Information_V').jqGrid('clearGridData');
    //$("#Business_Information_V").jqGrid('setGridParam', { data: Businessinfo });
    //$("#Business_Information_V").trigger('reloadGrid', [{ page: 1 }]);

    var supportingDocumentGridData = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
    $('#Grid_Supporting_Document_V').jqGrid('clearGridData');
    $("#Grid_Supporting_Document_V").jqGrid('setGridParam', { data: supportingDocumentGridData });
    $("#Grid_Supporting_Document_V").trigger('reloadGrid', [{ page: 1 }]);

    var HGMLYesOrNO = $("#HgmlDataSendToHubConfirmation").val();
    $(".HgmlDataSendToHubConfirmation_V").text($("#HgmlDataSendToHubConfirmation").val())


    $('.PD_HGML_Remarks_V').text($('#PD_HGML_Remarks').val());
    $('.PP_HGML_Remarks_V').text($('#PP_HGML_Remarks').val());
    $('.FP_HGML_Remarks_V').text($('#FP_HGML_Remarks').val());
    $('.PPR_HGML_Remarks_V').text($('#PPR_HGML_Remarks').val());
    $('.SUS_HGML_Remarks_V').text($('#SUS_HGML_Remarks').val());
    $('.BI_HGML_Remarks_V').text($('#BI_HGML_Remarks').val());

    $('.PD_HUB_Remarks_V').text($('#PD_HUB_Remarks').val());
    $('.FP_HUB_Remarks_V').text($('#FP_HUB_Remarks').val());
    $('.PPR_HUB_Remarks_V').text($('#PPR_HUB_Remarks').val());
    $('.SUS_HUB_Remarks_V').text($('#SUS_HUB_Remarks').val());
    $('.BI_HUB_Remarks_V').text($('#BI_HUB_Remarks').val());



    if (statusId == "2" || statusId == "13") {
        if (HGMLYesOrNO == "Yes") {
            $(".tableyesshow").show();
            $(".tablenoshow").hide();

            var selectedValues = $("#HgmlData_HubDropdown").val();
            var selectedTexts = [];
            selectedValues.forEach(function (value) {
                var matchingOption = $("#HgmlData_HubDropdown option[value='" + value + "']");
                if (matchingOption.length > 0) {
                    selectedTexts.push(matchingOption.text());
                }
            });
            $(".HgmlData_HubDropdown_V").text(selectedTexts.toString());
            $(".HgmlData_HubUsersDropdown_V").text($("#HgmlData_HubUsersDropdown").val())
            $(".HgmlDataHgmlToHubRemarks_V").text($("#HgmlDataHgmlToHubRemarks").val())
        }
        else if (HGMLYesOrNO == 'No') {
            $(".tableyesshow").hide();
            $(".tablenoshow").show();
        }
        else {
            $(".tableyesshow").hide();
            $(".tablenoshow").hide();
        }
    }
    if (statusId == "14" || statusId == "4" || statusId == "6" || statusId == "12" || statusId == "5") {
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
    $(".PP_Pmd_Remarks_V").text($('#PP_Pmd_Remarks').val())
    $('.PD_Pmd_Remarks_V').text($('#PD_Pmd_Remarks').val());
    $('.PP_Pmd_Remarks_V').text($('#PP_Pmd_Remarks').val());
    $('.FP_Pmd_Remarks_V').text($('#FP_Pmd_Remarks').val());
    $('.PPR_Pmd_Remarks_V').text($('#PPR_Pmd_Remarks').val());
    $('.SUS_Pmd_Remarks_V').text($('#SUS_PMD_Remarks').val());
  
    $('.BI_Pmd_Remarks_V').text($('#BI_Pmd_Remarks').val());
    $('.Npd_InitiatorRemarks_V').text($('#InitiatorRemarks').val());
    $('.Npd_InitiatorRemarks_V').text($('#Npd_InitiatorRemarks').val());

    $(".edithide").hide();
    $(".deletehide").hide();
    $(".hide_field_remarks").hide();

    $('#BI_TotalBusinessValue_V_Y1').val($("#BI_TotalBusinessValue_Y1").val());
    $('#BI_TotalBusinessValue_V_Y2').val($("#BI_TotalBusinessValue_Y2").val());
    $('#BI_TotalBusinessValue_V_Y3').val($("#BI_TotalBusinessValue_Y3").val());

    $('.HgmlOrHubData_HgmlToHubRemarks_V').text($("#HgmlOrHubData_HgmlToHubRemarks").val())
    $('.HgmlData_HubParticipatingMarkets_V').text($("#HgmlData_HubParticipatingMarkets").val())
    $('.HgmlOrHubData_HUB_Remarks_V').text($("#HgmlOrHubData_HUB_Remarks").val())

});

$('.modal.preview').on('hidden.bs.modal', function (e) {
    isPreview = 0;

    if ((statusId == 1 || statusId == 8 || statusId == 9 || statusId == 11) && iconName != 'View') {
        $(".edithide").show();
        $(".deletehide").show();
    }
    else {
        $(".edithide").hide();
        $(".deletehide").hide();
    }
});

$('#HgmlData_HubUsersDropdown').multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 5,
    buttonWidth: '100%',
    dropUp: true
});

var page = $("#Page").val();
if (page == "HGH") {
    $(".btn-cancel").addClass('hide');
    $(".link_href").addClass('hide');
}
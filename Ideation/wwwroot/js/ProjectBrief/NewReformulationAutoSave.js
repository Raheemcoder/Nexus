$(document).ready(function () {
	let isInserted = false;
	setInterval(() => {
		if (isInserted === false) {
			validateSave(true);
			$('#loader').hide();
			$("#loader").css("visibility", "hidden");
			isInserted = true;
		}
		else {
			validateEditDataSave(true);
			$('#loader').hide();
			$("#loader").css("visibility", "hidden");
		}
	}, 1 * 60 * 1000)
});
function validateSave(isAutoSave = false) {
	
	var projectdetails = [];
	var additionalreformulation = [];
	var projectheaders = []
	
	var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
	var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
	var reformulationpackagingprofilegrid = packagingProfileData_1.filter(row => row.length !== 0);
	var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
	var projectdetailsimage = ProjectDetailsImageFile();
	var initiatorremark = $("#editor").val().trim();
	var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

	var ProjectName = $('#ProjectName').val().trim();
	$("#Reformulation_Table").each(function (i) {
		projectheaders.push({
			ProjectName: ProjectName,
			Division: $(this).find('#Division option:selected').val(),
			ProjectType: "2",
			Category: $(this).find('#Category option:selected').val(),
			Hub: $(this).find('#Reformulation_Hub').text(),
			InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
			status: 1,
		});
	});

	if (ProjectName == "" || projectheaders[0].Division == "" || projectheaders[0].Category == "")
	{
		return validateSave(); 
	}

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

	$("#ProjectHeaders").val(JSON.stringify(projectheaders));
	$("#reformulationProductDescription").val(JSON.stringify(productdescription));
	$("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
	$("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
	$("#reformulationPackagingProfile").val(JSON.stringify(reformulationpackagingprofilegrid));
	$("#reformulationBusinessInformation").val(JSON.stringify(reformulationbusinessinformation));
	$('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
	$('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
	var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
	$('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
	$("#InitiatorRemarks").val(initiatorremark);
	$("#SaveOrSubmit").val(1);

	$.ajax({
		url: ROOT + "ProjectBrief/ReformulationAutoSaveData",
		type: 'POST',
		data: $('#ReformulationSubmit').serialize(),
		success: function (response) {
			$("#ProjectId").val(response.result);
		},
		error: function (error) {
		}
	});
}

function validateEditDataSave(isAutoSave = false) {
	
	var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
	var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
	var reformulationpackagingprofilegrid = packagingProfileData_1.filter(row => row.length !== 0);
	var projectdetailsimage = ProjectDetailsImageFile();
	projectdetailsimage == "" ? projectdetailsimage = ProjectDetailsBenchMarkSampleImage : projectdetailsimage = projectdetailsimage
	var projectheaders = []
	var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
	var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

	var ProjectName = $('#ProjectName').val().trim();
	$("#Reformulation_Table").each(function (i) {
		projectheaders.push({
			ProjectName: ProjectName,
			Division: $(this).find('#Division option:selected').val(),
			ProjectType: "2",
			Category: $(this).find('#Category option:selected').val(),
			Hub: $(this).find('#Reformulation_Hub').text(),
			InitiatedBy: $(this).find('#Reformulation_InitiatedBy').text().trim(),
			status: 1,
		});
	});

	if (ProjectName == "" || projectheaders[0].Division == "" || projectheaders[0].Category == "") {
		return validateSave();
	}
	

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
	var initiatorremarks = $("#editor").val();
	$("#ProjectHeaders").val(JSON.stringify(projectheaders));
	$("#reformulationProductDescription").val(JSON.stringify(productdescription));
	$("#reformulationProjectDetails").val(JSON.stringify(projectdetails));
	$("#reformulationAdditionalFormulationRequirements").val(JSON.stringify(additionalreformulation));
	$("#reformulationPackagingProfile").val(JSON.stringify(reformulationpackagingprofilegrid));
	$("#reformulationBusinessInformation").val(JSON.stringify(reformulationbusinessinformation));
	$('#SustainabilityData').val(JSON.stringify(sustainabilityGridData));
	$("#InitiatorRemarks").val(initiatorremarks);
	$("#SaveOrSubmit").val(1);
	$('#ReformulationStatus').val(1);
	$('#UserName').val($('#UserName').val());
	$('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
	var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
	$('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
	$.ajax({
		url: ROOT + "ProjectBrief/ReformulationAutoSaveEditData",
		type: 'POST',
		data: $('#ReformulationSubmit').serialize(),
		success: function (response) {
		},
		error: function (error) {
		}
	});
}
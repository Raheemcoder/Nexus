$(document).ready(function () {

	let isInserted = false;
	setInterval(() => {
		if (isInserted === false) {
			debugger
			validateSave(true);
			$('#loader').hide();
			$("#loader").css("visibility", "hidden");
			isInserted = true;
		} else {
			validateEditDataSave(true);
			$('#loader').hide();
			$("#loader").css("visibility", "hidden");
		}
	}, 5 * 60 * 1000)
})
function validateSave(isAutoSave = false) {
	debugger
	var projectdetails = [];
	var additionalreformulation = [];
	var projectheaders = []
	var ProjectName = $('#ProjectName').val();
	var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
	var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
	// var reformulationpackagingprofilegrid = $('#expected').jqGrid('getGridParam', 'data');
	var reformulationpackagingprofilegrid = packagingProfileData_1.filter(row => row.length !== 0);
	var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
	var projectdetailsimage = ProjectDetailsImageFile();
	var initiatorremark = $("#editor").val();
	var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');


	if (ProjectName == "") {
		return validateSave(); // Exit the function if projectName is empty
	}



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
	debugger
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

	// Make an AJAX call to send the data
	$.ajax({
		url: ROOT + "NewInitiation/ReformulationAutoSaveData",
		type: 'POST',
		data: $('#ReformulationSubmit').serialize(),
		success: function (response) {
			$("#ProjectId").val(response.result);
			//$(document)
			//	.ajaxStart(function () {
			//		$('#loader').hide();
			//		$("#loader").css("visibility", "hidden");
			//	})
			//	.ajaxStop(function () {
			//		$('#loader').hide();
			//		$("#loader").css("visibility", "hidden");
			//	})
			//	.ajaxComplete(function () {
			//		$('#loader').hide();
			//		$("#loader").css("visibility", "hidden");
			//	});
		},
		error: function (error) {
			// Handle the error response
		}
	});
}


function validateEditDataSave(isAutoSave = false) {
	debugger
	var productdescription = $('#prd_desc').jqGrid('getGridParam', 'data');
	var reformulationbusinessinformation = $('#business_info').jqGrid('getGridParam', 'data');
	//var reformulationpackagingprofilegrid = $('#expected').jqGrid('getGridParam', 'data');
	var reformulationpackagingprofilegrid = packagingProfileData_1.filter(row => row.length !== 0);
	var projectdetailsimage = ProjectDetailsImageFile();
	projectdetailsimage == "" ? projectdetailsimage = ProjectDetailsBenchMarkSampleImage : projectdetailsimage = projectdetailsimage
	var projectheaders = []
	var ProjectName = $('#ProjectName').val();
	//SKU = CKEDITOR.instances["editornf"].getData();
	//SKU == "" ? ($('#Err-ProductDescription-sku').show(), isvalid = false) : $('#Err-ProductDescription-sku').hide()
	var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
	var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
	//var deleteImageIn_imageGrid = [];

	if (ProjectName == "") {
		return validateSave(); // Exit the function if projectName is empty
	}


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

	debugger
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
	$('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
	
	var BenchMarkImages = $('#Grid_BenchMarkImage').jqGrid('getGridParam', 'data');
	$('#BenchMarkImagesData').val(JSON.stringify(BenchMarkImages));
	$('#DeletedBenchMarkImages').val(JSON.stringify(deleteImageIn_BenchMark))


	debugger
	// Make an AJAX call to send the data
	$.ajax({
		url: ROOT + "NewInitiation/ReformulationAutoSaveEditData",
		type: 'POST',
		data: $('#ReformulationSubmit').serialize(),
		success: function (response) {
			debugger
			//$(document)
			//	.ajaxStart(function () {
			//		$('#loader').hide();
			//		$("#loader").css("visibility", "hidden");
			//	})
			//	.ajaxStop(function () {
			//		$('#loader').hide();
			//		$("#loader").css("visibility", "hidden");
			//	})
			//	.ajaxComplete(function () {
			//		$('#loader').hide();
			//		$("#loader").css("visibility", "hidden");
			//	});
		},
		error: function (error) {
			// Handle the error response
		}
	});
}

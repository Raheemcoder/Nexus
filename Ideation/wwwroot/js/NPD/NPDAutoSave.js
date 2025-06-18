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
	var npdHeaderTableData = [];
	var projectDetailsData = [];
	var projectName = $('#Npd_ProjectName').val();
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
		debugger
		return validateSave(); // Exit the function if projectName is empty
	}



	$("table#NPD_Table tbody tr").each(function (i) {
		npdHeaderTableData.push({
			ProjectName: projectName,
			ProjectType: "1",
			Hub: $(this).find('#NPD_Hub').text(),
			Division: $(this).find('#NPD_Division option:selected').val(),
			Category: $(this).find('#NPD_Category option:selected').val(),
			InitiatedBy: $(this).find('#NPD_InitiatedBy').text(),
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
	debugger
	// Make an AJAX call to send the data
	$.ajax({

		url: ROOT + "NewInitiation/NPDAutoSaveData",
		type: 'POST',
		data: $('#Npd_Form_Submit').serialize(),
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
	var npdHeaderTableData = [];
	var projectDetailsData = [];
	var projectName = $('#Npd_ProjectName').val();
	var businessObjective = CKEDITOR.instances["Npd_BusinessObjective"].getData();
	var targetConsumer = $('#PP_TargetConsumer').val();
	var competitiveOfferings = CKEDITOR.instances["PP_CompetitiveOfferings"].getData();
	var unmetNeed = CKEDITOR.instances["PP_UnmetNeed"].getData();
	var initiatorRemarks = $('#Npd_InitiatorRemarks').val();
	var productPositioningGridData = $('#Product_Positioning').jqGrid('getGridParam', 'data');
	//var formulationProfileGridData = $('#Formulation_Profile').jqGrid('getGridParam', 'data');
	var formulationProfileGridData = formulationProfileData_1.filter(row => row.length !== 0);
	//var packagingProfileGridData = $('#Packaging_Profile').jqGrid('getGridParam', 'data');
	var packagingProfileGridData = packagingProfileData_1.filter(row => row.length !== 0);
	var businessInformationGridData = $('#Business_Information').jqGrid('getGridParam', 'data');
	var sustainabilityGridData = $('#Table_Sustainability').jqGrid('getGridParam', 'data');
	var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
	//var deleteImageIn_imageGrid = [];
	businessInformationGridData = businessInformationGridData.map(function (obj) {
		obj.BusinessValue = obj.BusinessValue.replaceAll(',', '');
		return obj;
	});

	if (projectName == "") {
		return validateEditDataSave(); // Exit the function if projectName is empty
	}


	debugger
	$("table#NPD_Table tbody tr").each(function (i) {

		npdHeaderTableData.push({
			ProjectName: projectName,
			ProjectType: "1",
			Hub: $(this).find('#NPD_Hub').text(),
			Division: $(this).find('#NPD_Division option:selected').val(),
			Category: $(this).find('#NPD_Category option:selected').val(),
			InitiatedBy: $(this).find('#NPD_InitiatedBy').text(),
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
	$('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
	$('#UserName').val($('#UserName').val());

	$('#NpdCurrentStatusName').val("New");

	debugger
	// Make an AJAX call to send the data
	$.ajax({
		url: ROOT + "NewInitiation/NPDAutoSaveEditData",
		type: 'POST',
		data: $('#Npd_Form_Submit').serialize(),
		success: function (response) {

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


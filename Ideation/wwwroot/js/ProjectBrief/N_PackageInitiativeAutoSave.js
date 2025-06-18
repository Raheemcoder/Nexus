$(document).ready(function () {
	let isInserted = false;
	setInterval(() => {
		if (isInserted === false) {
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
	var ProjectDetails = [];
	var PackageHeaderTableData2 = [];
	var projectName = $('#ProductDescription_ProjectName').val();
	var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
	var BusinessRationalData = CKEDITOR.instances["editor1"].getData();
	var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
	var ExpectedPackagingGridValue = [];
	var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
	var PackageInitiatorRemarks = $("#Pack_InitiatorRemarks").val();
	var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
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
		return validateSave(); // Exit the function if projectName is empty
	}

	$(".initiated_section").each(function (i) {
		PackageHeaderTableData2.push({

			ProjectName: $('#ProductDescription_ProjectName').val(),
			ProjectType: "3",
			Hub: $('.hub_name').text(),
			Division: $('#Division').val(),
			Category: $('.addCategoryOption').val(),
			InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
			InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
			Status: "1"
		});
	});


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
	$("#PackageInitiatorRemarks").val(PackageInitiatorRemarks);
	$('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
	// Make an AJAX call to send the data
	$.ajax({
		url: ROOT + "ProjectBrief/PackageInitiativeAutoSaveData",
		type: 'POST',
		data: $('#Package_Form_Submit').serialize(),
		success: function (response) {
			$("#ProjectId").val(response.result);
		},
		error: function (error) {
		}
	});
}


function validateEditDataSave(isAutoSave = false) {
	var ProjectDetails = [];
	var projectName = $('#ProductDescription_ProjectName').val();
	var ProductDescriptionGridValue = $("#product_description").jqGrid("getGridParam", "data");
	var BusinessRationalData = CKEDITOR.instances["editor1"].getData();
	var BusinessValueGridData = $("#business_info").jqGrid("getGridParam", "data");
	var ExpectedPackagingGridValue = [];
	var SustainabilityGridValue = $("#SustainabiltityGrid").jqGrid("getGridParam", "data");
	var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
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
		return validateSave(); // Exit the function if projectName is empty
	}


	$(".initiated_section").each(function (i) {
		PackageHeaderTableData2.push({
			ProjectName: $('#ProductDescription_ProjectName').val(),
			ProjectType: "3",
			Hub: $('.hub_name').text(),
			Division: $('#Division').val(),
			Category: $('.addCategoryOption').val(),
			InitiatedBy: $(this).find('#PackageInitiative_InitiatedBy').text(),
			InitiatedDate: $(this).find('#PackageInitiative_InitatedOn').text(),
			Status: "1"
		});
	});
	

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
	$('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
	$('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
	$('#UserName').val($('#UserName').val());
	$('#PackStatus').val(1);
	$('#StatusId').val(1);
	$.ajax({
		url: ROOT + "ProjectBrief/PackageInitiativeAutoSaveEditData",
		type: 'POST',
		data: $('#Package_Form_Submit').serialize(),
		success: function (response) {
		},
		error: function (error) {
			// Handle the error response
		}
	});
}

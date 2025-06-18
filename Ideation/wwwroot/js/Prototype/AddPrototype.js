var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1; // getMonth() returns a zero-based index
var year = today.getFullYear();
var todaydate = $.datepicker.formatDate('dd-mm-yy', today);

$(".Date").val(todaydate);

var projectDetails = $.parseJSON($('#ProjectDetails').val());
var prototypeId = "";

var submissionDetailsTableData = [];

$(document).ready(function () {

	$('#SubmissionDetails').hide();
});



$('.batchaddbtn').click(function () {

	var data1 = `  <div id="batch" class="mt-5">
        <div class="row product_profile" >
            <div class="col-lg-3">
                <div class="form-group">
                    <label>Submission No. <span class="color-red">*</span></label>
                    <div class="demo-content">
                        <input type="text" class="form-control" />
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="form-group">
                    <label>Composiiton details<span class="color-red">*</span></label>
                    <div class="demo-content">
                        <input type="file" class="form-control" />
                    </div>
                </div>
            </div>


            <div class="add_grid_">
                <div class="col-md-12">
                    <div class="">
                        <div class="d-flex">
                            <button type="button" class="btn-cnl1"><i class="fas fa-trash"></i></button>
                            <button type="button" class="btn-sb ms-2" > Clone</button>
                        </div>
                        <div class="m-table__main mt-2 mb-4 jai-hanuman">
                            <div class="m-table__responsive -virtual-scroll">
                                <table id="product_profile" class="table table-bordered"></table>
                                <div id="pager_product"></div>
                            </div>
                            <div class="float-right text-left pt-2">
                                <button type="button" class="btn-add">Save</button>
                            </div>
                        </div>



                    </div>

                </div>

            </div>
        </div>
    </div>`

	$('.batch_add').append(data1);

	var ID = $("div#batch:last").find('#pager_product');
	$("div#batch:last").find('#product_profile').jqGrid({
		url: '',
		datatype: 'local',
		data: data,
		mtype: 'GET',
		multiselect: true,
		colModel: colmodels,
		loadonce: true,
		viewrecords: true,
		//pager: ID,
		rowNum: 20,
		scroll: 1,

		gridComplete: function () {
			var objRows = $("div#batch:last").find("#product_profile tbody tr");
			var objHeader = $("div#batch:last").find("#product_profile tbody tr td");

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
})


data = [
	{
		"Action": " ",
		"Date": "",
		"DesiredIngredients": "Bhrigaraja & Palasha",
		"IndicationConditions": "1 sachet per Hair wash, shampoo",
		"Musthaveclaims": "Reduces Hair Fall",
		"Nicetohaveclaims": "Reduces Hair Fall",
		"DosageForm": "Liquid",
		"BenchmarkProducts": "Pantene Hair Fall Control, Dove Hair Fall rescue",
		"DesiredProductCharacteristics": "3 years Free from Paraben Sachet format",
		"ImageUpload": "",
	},



]
colmodels2 = [

	{
		name: 'Action',
		label: 'Action',
		width: 90,
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `<div class="text-center icon_section align-items-left">
            <a class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fas fa-edit mr-2" title="Edit"></i></a>
        </div>`;
		}
	},
	{
		name: 'Date',
		label: 'Date',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

        <div class="demo-content">
            <input type="text" class="form-control " id="data-datepicker1" >
        </div>
        `;
		}
	},
	{
		name: 'BatchNumber',
		label: 'BatchNumber',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

        <div class="demo-content">
            <input type="text" class="form-control">
        </div>
        `;
		}
	},
	{
		name: 'SamplesByFD',
		label: 'Samples By FD',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

        <div class="demo-content">
            <input type="text" class="form-control">
        </div>
        `;
		}
	},

	{
		name: 'F&DComments',
		label: 'F&D Comments2',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

        <div class="demo-content">
            <textarea class="form-control"></textarea>
        </div>
        `;
		}
	},
	{
		name: 'AddRow',
		label: '',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

                    <div class="demo-content1">
                        <input type="button" class="btn btn-primary"><i class="fas fa-plus mr-2" title="Edit" aria-hidden="true"></i></button>
                    </div>
                `;
		}
	},

],

	$("#product_profile1").jqGrid({
		url: '',
		datatype: 'local',
		data: data,
		mtype: 'GET',
		colModel: colmodels2,
		loadonce: true,
		viewrecords: true,
		multiselect: true,
		pager: '#pager_product1',
		rowNum: 10000,
		scroll: true,

		gridComplete: function () {
			var objRows = $("#product_profile1 tbody tr");
			var objHeader = $("#product_profile1 tbody tr td");

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






$('.data-datepicker').datepicker({
	format: 'dd-mm-yyyy',
	todayHighlight: true,
	autoclose: true
});

$('[data-datepicker]').datepicker({
	format: 'dd-mm-yyyy',
	todayHighlight: true,
	autoclose: true,
	endDate: todaydate // set maximum date to today's date
});

$('#data-datepicker1').datepicker({
	format: 'dd-mm-yyyy',
	todayHighlight: true,
	autoclose: true
});

data = [
	{

		"Action": " ",
		"Date": "",
		"DesiredIngredients": "Bhrigaraja & Palasha",
		"IndicationConditions": "1 sachet per Hair wash, shampoo",
		"Musthaveclaims": "Reduces Hair Fall",
		"Nicetohaveclaims": "Reduces Hair Fall",
		"DosageForm": "Liquid",
		"BenchmarkProducts": "Pantene Hair Fall Control, Dove Hair Fall rescue",
		"DesiredProductCharacteristics": "3 years Free from Paraben Sachet format",
		"ImageUpload": "",
	},



]
colmodels = [

	{
		name: 'Date',
		label: 'Date',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

                <div class="demo-content">
                        <input type="text" class="form-control" data-datepicker readonly >
                </div>
            `;
		}
	},
	{
		name: 'BatchNumber',
		label: 'BatchNumber',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return ` <div class="demo-content">
                                        <input type="text" class="form-control" value="BN-135" readonly>
                                 </div>`;
		}
	},
	{
		name: 'SamplesByFD',
		label: 'Samples By FD',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

                                                                <div class="demo-content">
                                                                        <input type="text" class="form-control" value="10" readonly>
                                                                </div>
                                                            `;
		}
	},

	{
		name: 'F&DComments',
		label: 'F&D Comments',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

                                                                    <div class="demo-content">
                                                                            <textarea class="form-control" readonly>Updated</textarea>
                                                                    </div>
                                                                `;
		}
	},


],

	$("#submission").jqGrid({
		url: '',
		datatype: 'local',
		data: data,
		mtype: 'GET',
		colModel: colmodels,
		loadonce: true,
		viewrecords: true,
		//pager: '#pager_product',
		rowNum: 20,
		scroll: 1,

		gridComplete: function () {
			var objRows = $("#submission tbody tr");
			var objHeader = $("#submission tbody tr td");

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




data = [
	{

		"Action": " ",
		"Date": "",
		"DesiredIngredients": "Bhrigaraja & Palasha",
		"IndicationConditions": "1 sachet per Hair wash, shampoo",
		"Musthaveclaims": "Reduces Hair Fall",
		"Nicetohaveclaims": "Reduces Hair Fall",
		"DosageForm": "Liquid",
		"BenchmarkProducts": "Pantene Hair Fall Control, Dove Hair Fall rescue",
		"DesiredProductCharacteristics": "3 years Free from Paraben Sachet format",
		"ImageUpload": "",
	},



]
colmodels = [

	{
		name: 'Date',
		label: 'Date',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

                        <div class="demo-content">
                                 <input type="text" class="form-control" value="12/02/2022" data-datepicker readonly >
                        </div>
                    `;
		}
	},
	{
		name: 'BatchNumber',
		label: 'BatchNumber',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

                        <div class="demo-content">
                                <input type="text" class="form-control" value="BN-135" readonly>
                        </div>
                    `;
		}
	},
	{
		name: 'SamplesByFD',
		label: 'Samples By FD',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

                        <div class="demo-content">
                                <input type="text" class="form-control" value="10" readonly>
                        </div>
                    `;
		}
	},

	{
		name: 'F&DComments',
		label: 'F&D Comments',
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			return `

                        <div class="demo-content">
                                <textarea class="form-control" readonly>Updated</textarea>
                        </div>
                    `;
		}
	},


],

	$("#submission1").jqGrid({
		url: '',
		datatype: 'local',
		data: data,
		mtype: 'GET',
		colModel: colmodels,
		loadonce: true,
		viewrecords: true,
		//pager: '#pager_product',
		rowNum: 10000,
		scroll: true,

		gridComplete: function () {
			var objRows = $("#submission1 tbody tr");
			var objHeader = $("#submission1 tbody tr td");

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


//$(document).ready(function () {

//    $('#SubmissionDetails').hide();
//});


$('#ProjectNo').change(function () {
	debugger
	$('#Error_ProjectNo').hide();
	var projectNo = $('#ProjectNo').val();

	var projectDetailsOfProjectNo = projectDetails.filter(val => val.ProjectNo == projectNo);

	$('#ProjectDescription').val(projectDetailsOfProjectNo[0].ProjectDescription);
	$('#ProductName').val(projectDetailsOfProjectNo[0].ProjectDescription);
	$('#HghCode').val(projectDetailsOfProjectNo[0].HghCode);
	/*$('#ProductName').val(projectDetailsOfProjectNo[0].ProductName);*/
	$('#DivisionName').val(projectDetailsOfProjectNo[0].DivisionName);

});
$('#ProductName').keyup(function () {

	$('#ProductName').val() == "" ? $('#Error_ProductName').show() : $('#Error_ProductName').hide();

});
$('#ProvisionalClaim').keyup(function () {

	$('#ProvisionalClaim').val() == "" ? $('#Error_ProvisionalClaim').show() : $('#Error_ProvisionalClaim').hide();
});
$('#DosageForm').keyup(function () {

	$('#DosageForm').val() == "" ? $('#Error_DosageForm').show() : $('#Error_DosageForm').hide();
});

$('#SaveHeader').click(function () {

	debugger
	var flag = true;
	var projectNo = $('#ProjectNo').val();
	var productName = $('#ProductName').val();
	var provisionalClaim = $('#ProvisionalClaim').val();
	var dosageForm = $('#DosageForm').val();

	projectNo == "" ? ($('#Error_ProjectNo').show(), flag = false) : $('#Error_ProjectNo').hide();
	productName == "" ? ($('#Error_ProductName').show(), flag = false) : $('#Error_ProductName').hide();
	provisionalClaim == "" ? ($('#Error_ProvisionalClaim').show(), flag = false) : $('#Error_ProvisionalClaim').hide();
	dosageForm == "" ? ($('#Error_DosageForm').show(), flag = false) : $('#Error_DosageForm').hide();

	if (flag) {
		debugger
		var supportingDocument = $('#Supportingdocuments').prop("files");

		var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);
		debugger

		modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

		var prototypeDetails = {
			ProjectNo: projectNo,
			ProjectDescription: $('#ProjectDescription').val(),
			HghCode: $('#HghCode').val(),
			ProductName: productName,
			DivisionName: $('#DivisionName').val(),
			DosageForm: $('#DosageForm').val(),
			ProvisionalClaim: provisionalClaim,
			Remarks: $('#Remarks').val(),
			SupportingDocument: modifiedSupportingDocumentsName,
			StatusId: 2,
		};

		$.ajax({
			type: "POST",
			url: ROOT + "Prototype/UploadPrototypeDetails",
			data: { prototype: prototypeDetails, prototypeId: prototypeId },
			//contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				debugger
				//console.log('ProjectId :' + response);
				$('#SubmissionDetails').show();
				$('#Extra_CancelButton').hide();
				//$('#SubmissionNo').val(response.toString() + "-S1");
				$('#SubmissionNo').val(response.SubmissionNo.toString());
				prototypeId = response.PrototypeId;
			},
			error: function (err) {
				alert(err.responseText);
			}
		});
	}
});


//To save Composition file and return file name
function SaveCompositionFile(fileName) {
	debugger
	var modifiedfileName = "";
	//var files = $('#FP_BenchmarkProductsImage').prop("files");
	var formData = new FormData();

	if (fileName != "") {
		debugger
		formData.append("file", fileName[0]);
		$.ajax({
			type: 'POST',
			url: ROOT + "Prototype/SaveImageFile",
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


$('#Add_GridRow').click(function () {

	debugger;

	$('.ErrorMessage').hide();

	var row = "";
	var table = document.getElementById("SubmissionDetail_Table");
	var lastRow = table.rows.length - 1;
	var samplesByFd = "";
	var FandDComments = "";
	var BatchNo = "";
	$('#SubmissionDetail_Table tbody tr').each(function () {
		debugger
		var rowIndex = $(this).index(); // get the row index
		var j = rowIndex + 1;

		if (j == lastRow) {
			debugger
			samplesByFd = $(this).closest('tr').find('#SamplesByFd').val();
			FandDComments = $(this).closest('tr').find('#FandDComments').val();
			BatchNo = $(this).closest('tr').find('#BatchNumber').val();
		}
	});

	row =
		`<tr>
            <td style="text-align:center"><input type="checkbox" onclick class="Check" name="name1"/></td>
            <td id="SlNo">`+ (lastRow + 1) + `</td>
            <td>
                <div class="">
                    <input type="text" value="`+ todaydate + `" placeholder="Date" id="Date" class="form-control Date" data-datepicker autocomplete="off">
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" value="`+ BatchNo + `"  placeholder="Batch Number"  id="BatchNumber" class="form-control BatchNumber">
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" onpaste="return false;" autocomplete="off" value="`+ samplesByFd + `" onkeypress="return onlyNumbers();" onchange="onlyNumbers()"  placeholder="Samples By FD"  id="SamplesByFd" class="form-control samplesbyfd">
                </div>
            </td>
            <td>
                <div class="">
                    <textarea placeholder="F&D Comments" id="FandDComments" class="form-control FandDComments">`+ FandDComments + `</textarea>
                </div>
            </td>
            <td>
                <div class="Composition d-flex">
                    <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" id="CompositionFile" class="form-control" onchange="return fileCompositionValidation()">
                    <a onclick=DownloadImage(this) style="display:none" id="CompositionImageDownload"  class="btn-icon -delete mt-2 ms-2">
                        <i class="fas fa-download" title="Download"></i>
                    </a>
                     <a onclick=ViewImage(this) style="display:none" id="CompositionImageView" target="" class="btn-icon -view mt-2 ms-2" title="View">
                        <i class="fas fa-eye" title="View"></i>
                     </a>                  
                </div>
                <div>
                     <span id="Err_CompositionDocuments" style="color:red;display:none">The file must be of type: .pdf, .doc, .docx, .xls, .xlsx, .png, .Jpg</span>
                </div>
            </td>
            <td style="display:none">
                    <div class="">
                    <textarea  id="CompositionHide" class="form-control CompositionHide"></textarea>
                </div>
            </td>
        </tr>`;

	$("#SubmissionDetail_Table").append(row);

	$('[data-datepicker]').datepicker({
		format: 'dd-mm-yyyy',
		todayHighlight: true,
		autoclose: true,
		endDate: todaydate// set maximum date to today's date
	});
});


$(document).on('change', '#CompositionFile', function (e) {
	debugger

	var clossestTableRow = $(this).closest("tr");

	var existingFile = clossestTableRow.find("#CompositionHide").val();

	if (existingFile != "") {
		$.ajax({
			type: 'POST',
			url: ROOT + "Prototype/DeleteImageFile",
			data: { fileName: existingFile },
			success: function (data) {

			}
		});
	}
	var selectedCompositionFileName = $(this).prop("files");

	var modifiedCompositionFileName = SaveCompositionFile(selectedCompositionFileName);
	modifiedCompositionFileName.replaceAll('"', '');

	clossestTableRow.find("#CompositionHide").val(modifiedCompositionFileName);

	clossestTableRow.find("#CompositionHide").val() != "" ? clossestTableRow.find("#CompositionImageDownload").show() : clossestTableRow.find("#CompositionImageDownload").hide();
	clossestTableRow.find("#CompositionHide").val() != "" ? clossestTableRow.find("#CompositionImageView").show() : clossestTableRow.find("#CompositionImageView").hide();

	debugger
	var imageFilename = clossestTableRow.find("#CompositionHide").val();
	var extension = imageFilename.split('.').pop();
	extension = extension.toLowerCase();
	extension = extension.replace(/"/g, "");
	

	if (extension === "xlsx" || extension === "xls" || extension === "doc" || extension === "docx") {
		clossestTableRow.find("#CompositionImageView").hide();
	} else {
		clossestTableRow.find("#CompositionImageView").show();
	}	
});


//To save Composition file and return file name
function SaveCompositionFile(fileName) {
	debugger
	var modifiedfileName = "";
	//var files = $('#FP_BenchmarkProductsImage').prop("files");
	var formData = new FormData();

	if (fileName != "") {
		debugger
		formData.append("file", fileName[0]);
		$.ajax({
			type: 'POST',
			url: ROOT + "Prototype/SaveImageFile",
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

// On check of Check box in Composition Details table header
$('#Check_Header').click(function () {

	var checkBox = document.getElementById("Check_Header");
	if (checkBox.checked) {

		$('.Check').prop('checked', true);
	}
	else {
		$('.Check').prop('checked', false);
	}

});


$(document).on('click', '#Delete', function (e) {

	debugger
	$('.ErrorMessage').hide();

	var checkedRows = [];
	var flag = true;

	checkedRows = $('#SubmissionDetail_Table tbody tr:has(:checkbox:checked)');

	checkedRows.length == 0 ? (flag = false, alert('Please select at least one batch for delete.')) : flag = true;

	if (flag) {

		$('#DeleteModal1').modal('show');
	}
});

$(document).on('click', '#Delete_Ok1', function (e) {
	debugger
	var checkedRows = $('#SubmissionDetail_Table tbody tr:has(:checkbox:checked)');
	var checkedRowData = [];

	checkedRows.each(function () {
		debugger
		var existingFile = $(this).closest('tr').find('#CompositionHide').val();

		$(this).closest('tr').remove();

		if (existingFile != "") {
			$.ajax({
				type: 'POST',
				url: ROOT + "Prototype/DeleteImageFile",
				data: { fileName: existingFile },
				success: function (data) {
					// console.log('success');
				}
			});
		}
	});

	$('#SubmissionDetail_Table tbody tr').each(function (i, obj) {

		var j = parseInt(i);

		$(this).closest('tr').find('#SlNo').text(j + 1);
	});
});

$(document).on('click', '#Save', function (e) {
	debugger
	var flag = true;
	var isBatchNumberDuplicated = false;
	var submissionNo = $('#SubmissionNo').val();

	$('.Error').hide();

	submissionNo == "" ? ($('#Error_SubmissionNo').show(), flag = false) : $('#Error_SubmissionNo').hide();

	var submissionDetailsData = [];

	$('#SubmissionDetail_Table tbody tr').each(function (i, obj) {

		var arrayitem = {

			SubmissionNo: submissionNo,
			Date: $(obj).find('#Date').val(),
			BatchNumber: $.trim($(obj).find('#BatchNumber').val()),
			SamplesByFd: $(obj).find('#SamplesByFd').val(),
			FandDComments: $(obj).find('#FandDComments').val(),
			Composition: ($(obj).find('#CompositionHide').val() == "" ? "" : $(obj).find('#CompositionHide').val().replaceAll('"', ''))
		};
		debugger
		submissionDetailsData.push(arrayitem);
	});

	var duplicateBatchNumbers = submissionDetailsData
		.map(function (item) {
			return item.BatchNumber;
		})
		.filter(function (value, index, self) {
			return self.indexOf(value) !== index;
		});

	$('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
		debugger
		var batchNumber = $.trim($(obj).find('#BatchNumber').val());
		if (duplicateBatchNumbers.includes(batchNumber)) {
			debugger
			flag = false;
			isBatchNumberDuplicated = true;
			$(obj).find('#BatchNumber').css('background-color', 'yellow');
		}
	});

	if (isBatchNumberDuplicated) {

		alert('Please enter the unique batch number');

		setTimeout(function () {
			$('#SubmissionDetail_Table tbody tr #BatchNumber').css('background-color', '');
		}, 5000);
	}

	if (flag) {

		$('#SaveModal').modal('show');

		$('#Save_Ok').click(function () {

			$('#SubmissionDetailsData').val(JSON.stringify(submissionDetailsData));
			$('#PrototypeStatusId').val(2);

			document.getElementById('Prototype_Details_Submit').submit();
		});
	}
});


$(document).on('click', '#SendToPmd', function (e) {
	debugger
	var flag = true;
	var submissionDetailsData = [];
	var emptyRow = [];
	var isBatchNumberDuplicated = false;
	var isRowEmpty = false;

	$('#SendToPmd_Ok').prop("disabled", false);

	$('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
		debugger
		var submissionNo = $('#SubmissionNo').val();

		var arrayitem = {

			SubmissionNo: submissionNo,
			Date: $.trim($(obj).find('#Date').val()),
			BatchNumber: $.trim($(obj).find('#BatchNumber').val()),
			SamplesByFd: $.trim($(obj).find('#SamplesByFd').val()),
			FandDComments: $.trim($(obj).find('#FandDComments').val()),
			Composition: ($(obj).find('#CompositionHide').val() == "" ? "" : $(obj).find('#CompositionHide').val().replaceAll('"', ''))
		};

		$(obj).find('#Date').css('outline', '');
		$(obj).find('#BatchNumber').css('outline', '');
		$(obj).find('#SamplesByFd').css('outline', '');

		arrayitem.Date == "" ? (emptyRow.push(i + 1), $(obj).find('#Date').css('outline', '1.5px solid red')) : "";
		arrayitem.BatchNumber == "" ? (emptyRow.push(i + 1), $(obj).find('#BatchNumber').css('outline', '1.5px solid red')) : "";
		arrayitem.SamplesByFd == "" ? (emptyRow.push(i + 1), $(obj).find('#SamplesByFd').css('outline', '1.5px solid red')) : "";

		//arrayitem.Date == "" ? emptyRow.push(i + 1) : "";
		//arrayitem.BatchNumber == "" ? emptyRow.push(i + 1) : "";
		//arrayitem.SamplesByFd == "" ? emptyRow.push(i + 1) : "";

		submissionDetailsData.push(arrayitem);
	});

	emptyRow = $.unique(emptyRow);
	var stringFormattedEmptyRow = emptyRow.join(", ");

	if (emptyRow.length > 0) {
		flag = false;
		isRowEmpty = true;
		alert('Please enter the all mandatory fields in row No ' + stringFormattedEmptyRow + '.');
	}
	else if (submissionDetailsData.length == 0) {
		flag = false;
		isRowEmpty = true;
		alert('Please enter atleast one batch details to send to PMD');
	}

	var duplicateBatchNumbers = submissionDetailsData
		.map(function (item) {
			return item.BatchNumber;
		})
		.filter(function (value, index, self) {
			return self.indexOf(value) !== index;
		});

	$('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
		debugger
		var batchNumber = $.trim($(obj).find('#BatchNumber').val());
		if (duplicateBatchNumbers.includes(batchNumber)) {
			debugger
			flag = false;
			isBatchNumberDuplicated = true;
			$(obj).find('#BatchNumber').css('background-color', 'yellow');
		}
	});

	if (!isRowEmpty) {

		if (isBatchNumberDuplicated) {
			alert('Please enter the unique batch number');
		}

		setTimeout(function () {
			$('#SubmissionDetail_Table tbody tr #BatchNumber').css('background-color', '');
		}, 5000);
	}

	//submissionDetailsData.length == 0 ? ($('#Error_SubmissionDetails').show(), flag = false) : $('#Error_SubmissionDetails').hide()

	$.ajax({
		type: "POST",
		url: ROOT + "Prototype/GetPmdUser",
		dataType: "json",
		data: { prototypeId: prototypeId },
		success: function (response) {
			debugger

			if (response != null) {
				var userEmailOptionList = "";
				$.each(response.PmdUserList, function (i, obj) {

					userEmailOptionList += '<option class="PmdUsersOption ' + obj.UserEmail + '" value="' + obj.UserEmail + '" >' + /*obj.UserEmail.split("@")[0]*/ obj.LoginId + '</option>'

				});

				$("#AddPrototype_PmdUserDropDown").html(userEmailOptionList);
				$('#AddPrototype_PmdUserDropDown').multiselect('rebuild');
			}

		},
		error: function () {
			alert("Error occured!!");
		}
	});

	if (flag) {

		$('#sendToPmdModal').modal('show');


		$('#SendToPmd_Ok').click(function () {

			var selectedPmdUser = $('#SelectedPmdUsersToSendPrototype').val();
			var confirmationRemarks = $.trim($('#ConfirmationRemarks').val());
			selectedPmdUser == "" ? $('#Error_SelectPmdUser').show() : $('#Error_SelectPmdUser').hide();
			//confirmationRemarks == "" ? $('#Error_ConfirmationRemarks').show() : $('#Error_ConfirmationRemarks').hide();

			var approvalStatus = [{
				FromStage: 2,
				Action: "Send To PMD",
				ToStage: 3,
			}];

			if (selectedPmdUser != "") {
				$('#SendToPmd_Ok').prop("disabled", true);

				$('#SubmissionDetailsData').val(JSON.stringify(submissionDetailsData));
				$('#ApprovalStatus').val(JSON.stringify(approvalStatus));
				$('#Prot_SelectedPmdUsersToSendPrototype').val(selectedPmdUser);
				$('#Prot_ConfirmationRemarks').val(confirmationRemarks);

				$('#PrototypeStatusId').val(3);

				document.getElementById('Prototype_Details_Submit').submit();
			}
		});
	}
});


$(document).on('click', '#Add_SendPmdUser', function () {
	debugger
	var flag = true;
	var selectedPmdUser = $('#AddPrototype_PmdUserDropDown').val();

	selectedPmdUser == "" ? (flag = false, $('#Error_SelectPmdUser').show()) : $('#Error_SelectPmdUser').hide();

	if (flag) {
		$('#SelectedPmdUsersToSendPrototype').val(selectedPmdUser);
		$('#AddPrototype_PmdUserDropDown').multiselect('rebuild');
	}
});


$(document).on('click', '#Clone', function (e) {

	debugger
	var flag = true;
	var checkedRows = $('#SubmissionDetail_Table tbody tr:has(:checkbox:checked)');

	checkedRows.length > 1 ? ($('#Error_Clone').show(), flag = false) : $('#Error_Clone').hide();
	checkedRows.length == 0 ? (alert('Please select any one row to clone'), flag = false) : "";

	var checkedRowData = [];

	if (flag) {

		checkedRows.each(function () {

			var date = $(this).closest('tr').find('#Date').val();
			var batchNumber = $(this).closest('tr').find('#BatchNumber').val();
			var samplesByFd = $(this).closest('tr').find('#SamplesByFd').val();
			var fandDComments = $(this).closest('tr').find('#FandDComments').val();

			var arrayItem = {

				Date: date,
				BatchNumber: $.trim(batchNumber),
				SamplesByFd: $.trim(samplesByFd),
				FandDComments: $.trim(fandDComments)
			}

			checkedRowData.push(arrayItem)
		});

		var table = document.getElementById("SubmissionDetail_Table");
		var lastRow = table.rows.length - 1;

		$("#SubmissionDetail_Table tbody tr").each(function (i, obj) {
			debugger
			var j = i + 1;

			if (j == lastRow) {
				debugger
				$(this).closest('tr').find('#Date').val(checkedRowData[0].Date);
				$(this).closest('tr').find('#BatchNumber').val(checkedRowData[0].BatchNumber);
				$(this).closest('tr').find('#SamplesByFd').val(checkedRowData[0].SamplesByFd);
				$(this).closest('tr').find('#FandDComments').val(checkedRowData[0].FandDComments);
			}
		});
	}
});


function DownloadImage(obj) {
	
	console.log($(obj).closest('tr').find('#CompositionHide').val());

	var fileName = $(obj).closest('tr').find('#CompositionHide').val();
	fileName = fileName.replace(/"/g, '');

	if (fileName != "") {
		$(obj).closest('tr').find('#CompositionImageDownload').prop("href", ROOT + "Prototype/DownloadImageFile?fileName=" + fileName);
		return true;
	}
}

function onlyNumbers(evt) {

	var e = event || evt; // for trans-browser compatibility
	var charCode = e.which || e.keyCode;

	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}


$('.example-dropUp').multiselect({
	enableFiltering: true,
	includeSelectAllOption: true,
	enableCaseInsensitiveFiltering: true,
	maxHeight: 500,
	buttonWidth: '100%',
	dropUp: true
});


$("#ViewData").on("click", function () {
	debugger

	$("#ViewModel").modal('show');

	$.ajax({
		type: "POST",
		url: ROOT + "Prototype/GetSupportingDocumentDetail",
		data: { prototypeId: prototypeId },
		dataType: "json",
		success: function (response) {
			debugger

		},
		error: function (err) {
			alert(err.responseText);
		}
	});


});


colmodels = [
	{
		name: 'Document',
		label: 'Document',
		width: 130,
		resizable: true,
		ignoreCase: true,
	},
	{
		name: 'CreatedBy',
		label: 'Uploaded BY',
		width: 130,
		resizable: true,
		ignoreCase: true,
	},
	{
		name: 'CreatedOn',
		label: 'Uploaded on',
		width: 130,
		resizable: true,
		ignoreCase: true,
	},
],
	$("#ViewDataforUser").jqGrid({
		height: 'auto',
		rowNum: 100,
		mtype: 'GET',
		url: '',
		datatype: 'local',
		data: [],
		loadonce: true,
		colModel: colmodels,
		pager: "#pager_ViewDataForUser",
		viewrecords: true,
		scroll: true,

		gridComplete: function () {
			var objRows = $("#ViewDataforUser tbody tr");
			var objHeader = $("#ViewDataforUser tbody tr td");

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


$(window).on('hidden.bs.modal', function () {

	$('.closeModal').val("");
});

//Validation for Samples By FD cannot be zero
$(document).on('change', '#SamplesByFd', function () {

	$('.samplesbyfd').css('outline', '');

	var samplesByFd = parseInt($(this).val());
	samplesByFd == 0 ? ($(this).css('outline', '1.5px solid red'), $(this).val(''), alert('Samples by FD value cannot be zero.')) : $(this).css('outline', '');
});


$(document).on("keyup", "#ConfirmationRemarks, #BatchNumber, #FandDComments", function () {
	debugger
	if ($(this).val().trim() === "") {
		this.value = this.value.trim();
	}
	this.value = this.value.replace(/[^a-zA-Z0-9_@./!`~*#&+\-$ ]/g, '');
	this.value = this.value.replace(/  +/g, ' ');
});

// To do the file validation
function fileValidation() {

	var supportingDocuments = $('#Supportingdocuments').val();
	var allowedExtensions =
		/(\.pdf|\.doc|\.docx|\.xls|\.xlsx)$/i;

	if (supportingDocuments != '') {
		if (!allowedExtensions.exec(supportingDocuments)) {
			$('#Err_SupportingDocuments').show();
			$('#Supportingdocuments').val('');
			setTimeout(function () {

				$('#Err_SupportingDocuments').hide();
			}, 5000);
			return false;
		}
		else {
			$('#Err_SupportingDocuments').hide();
		}
	}
}

// Added Code to send to manager

$(document).on('click', '#SendForApproval', function (e) {
	var flag = true;
	var submissionDetailsData = [];
	var emptyRow = [];
	var isBatchNumberDuplicated = false;
	var isRowEmpty = false;

	$('#Approval_Ok').prop("disabled", false);

	$('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
		var submissionNo = $('#SubmissionNo').val();

		var arrayitem = {

			SubmissionNo: submissionNo,
			Date: $.trim($(obj).find('#Date').val()),
			BatchNumber: $.trim($(obj).find('#BatchNumber').val()),
			SamplesByFd: $.trim($(obj).find('#SamplesByFd').val()),
			FandDComments: $.trim($(obj).find('#FandDComments').val()),
			Composition: ($(obj).find('#CompositionHide').val() == "" ? "" : $(obj).find('#CompositionHide').val().replaceAll('"', ''))
		};

		$(obj).find('#Date').css('outline', '');
		$(obj).find('#BatchNumber').css('outline', '');
		$(obj).find('#SamplesByFd').css('outline', '');

		arrayitem.Date == "" ? (emptyRow.push(i + 1), $(obj).find('#Date').css('outline', '1.5px solid red')) : "";
		arrayitem.BatchNumber == "" ? (emptyRow.push(i + 1), $(obj).find('#BatchNumber').css('outline', '1.5px solid red')) : "";
		arrayitem.SamplesByFd == "" ? (emptyRow.push(i + 1), $(obj).find('#SamplesByFd').css('outline', '1.5px solid red')) : "";

		submissionDetailsData.push(arrayitem);
	});

	emptyRow = $.unique(emptyRow);
	var stringFormattedEmptyRow = emptyRow.join(", ");

	if (emptyRow.length > 0) {
		flag = false;
		isRowEmpty = true;
		alert('Please enter the all mandatory fields in row No ' + stringFormattedEmptyRow + '.');
	}
	else if (submissionDetailsData.length == 0) {
		flag = false;
		isRowEmpty = true;
		alert('Please enter atleast one batch details to send to Approval');
	}

	var duplicateBatchNumbers = submissionDetailsData
		.map(function (item) {
			return item.BatchNumber;
		})
		.filter(function (value, index, self) {
			return self.indexOf(value) !== index;
		});

	$('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
		debugger
		var batchNumber = $.trim($(obj).find('#BatchNumber').val());
		if (duplicateBatchNumbers.includes(batchNumber)) {
			debugger
			flag = false;
			isBatchNumberDuplicated = true;
			$(obj).find('#BatchNumber').css('background-color', 'yellow');
		}
	});

	if (!isRowEmpty) {

		if (isBatchNumberDuplicated) {
			alert('Please enter the unique batch number');
		}

		setTimeout(function () {
			$('#SubmissionDetail_Table tbody tr #BatchNumber').css('background-color', '');
		}, 5000);
	}


	if (flag) {
		$('#ApprovalModal').modal('show');
		$("#Approval_Ok").click(function () {
			var approvalStatus = [{
				FromStage: 2,
				Action: "Send To Pending for Approval",
				ToStage: 10,
			}];

			$('#SubmissionDetailsData').val(JSON.stringify(submissionDetailsData));
			$('#ApprovalStatus').val(JSON.stringify(approvalStatus));
			var ApprovalRemarks = $('.ApprovalRemarks').val();
			$('#Prot_ConfirmationRemarks').val(ApprovalRemarks)
			$('#PrototypeStatusId').val(10);
			document.getElementById('Prototype_Details_Submit').submit();
			$('#Approval_Ok').prop("disabled", true);
		});
	}
});

function fileCompositionValidation() {
	var supportingDocuments = $('#CompositionFile').val();
	var allowedExtensions =
		/(\.pdf|\.doc|\.docx|\.xls|\.xlsx|\.jpeg|\.png|\.jpg)$/i;

	if (supportingDocuments != '') {
		if (!allowedExtensions.exec(supportingDocuments)) {
			$('#Err_CompositionDocuments').show();
			$('#CompositionFile').val('');
			setTimeout(function () {

				$('#Err_CompositionDocuments').hide();
			}, 7000);
			return false;
		}
		else {
			$('#Err_CompositionDocuments').hide();
		}
	}
}
function ViewImage(obj) {
	debugger
	console.log($(obj).closest('tr').find('#compositionhide').val());

	var fileName = $(obj).closest('tr').find('#CompositionHide').val();
	fileName = fileName.replace(/"/g, '');

	var extension = fileName.split('.').pop();
	extension = extension.toLowerCase();

	//var extension = getFileExtension(fileName);
	//extension = extension.replace(/"/g, "");
	//console.log(extension);

	if (fileName != "") {
		var imageUrl = ROOT + "PrototypeImages/" + fileName;
		// Open the image URL in a new tab.
		window.open(imageUrl, '_blank');
	}

	//if (extension === "pdf" || extension === "png" || extension === "jpeg" || extension === "jpg") {
	//	debugger
	//	if (fileName != "") {
	//		$(obj).closest('tr').find('#CompositionImageView').prop("href", ROOT + "Prototype/DownloadImageFile?fileName=" + fileName);
	//		return true;
	//	}
	//}
}
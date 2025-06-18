var projectRemarksData = $.parseJSON($('#ProjectRemarksJsonData').val());

$(document).ready(function () {
	$("#FromDate").datepicker({
		format: 'dd/mm/yyyy',
		todayHighlight: true,
		changeMonth: true,
		changeYear: true,
		todayBtn: 1,
		autoclose: true,
	}).on('changeDate', function (selected) {
		var fromDate = parseDate($('#FromDate').val());
		var toDate = parseDate($('#ToDate').val());

		if (fromDate > toDate) {
			alert('From Date should not be greater than To Date');
			$('#FromDate').val('');
		}
	});

	$("#ToDate").datepicker({
		format: 'dd/mm/yyyy',
		todayHighlight: true,
		changeMonth: true,
		changeYear: true,
		todayBtn: 1,
		autoclose: true,
	}).on('changeDate', function (selected) {
		var toDate = parseDate($('#ToDate').val());
		var fromDate = parseDate($('#FromDate').val());

		if (fromDate > toDate) {
			alert('To Date should not be less than From Date');
			$('#ToDate').val('');
		}
	});

	function parseDate(dateString) {
		var parts = dateString.split('/');
		return new Date(parts[2], parts[1] - 1, parts[0]);
	}
});


$(".js-select2").select2({

	placeholder: "Select HUB",
	allowHtml: true,
	allowClear: false,
	includeSelectAllOption: true,

});

colmodels = [
	{
		name: 'Action',
		label: 'Action',
		search: false,
		width: 70,
		resizable: true,
		ignoreCase: true,
		formatter: function (cellvalue, options, rowobject) {
			debugger
			if (rowobject.Task != null) {
				return '<div class="justify-center_"> <a href="#" id="Remarks_Icon" data-bs-toggle="modal"  data-createdby="' + rowobject.CreatedBy + '" data-task="' + rowobject.Task + '" data-createdon="' + rowobject.Date + '" onclick="Remarks_Icon(this)" data-bs-target="#productModal" title="Project Details" class= "btn-icon -edit " > <i class="fas fa-info-circle" > </i></a ></div>'
			}
			else {
				return '<div class="justify-center_"> </div>'
			}
		}
	},
	{
		name: 'ProjectId',
		label: 'Project Id/Task',
		resizable: true,
		ignoreCase: true,
		width: 200,
	},
	{
		name: 'Date',
		label: 'Date',
		resizable: true,
		width: 70,
		ignoreCase: true,
	},
	{
		name: 'UserName',
		label: 'User Name',
		resizable: true,
		width: 120,
		ignoreCase: true,
	},

	{
		name: 'Remarks',
		label: 'Remarks',
		resizable: true,
		ignoreCase: true,
		width: 300,
		search: true,
	},
	{
		name: 'Task',
		label: 'Task',
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

	$("#ProjectRemarks_Grid").jqGrid({
		url: '',
		datatype: 'local',
		data: projectRemarksData,
		mtype: 'GET',
		colModel: colmodels,
		loadonce: true,
		viewrecords: true,
		pager: '#pager_ProjectRemarks',
		rowNum:1000000,
		scroll: 1,

		gridComplete: function () {
			var objRows = $("#ProjectRemarks_Grid tbody tr");
			var objHeader = $("#ProjectRemarks_Grid tbody tr td");

			if (objRows.length > 1) {
				var objFirstRowColumns = $(objRows[1]).children("td");
				for (i = 0; i < objFirstRowColumns.length; i++) {
					$(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
				}
			}

		}
	});
$("#ProjectRemarks_Grid").jqGrid('filterToolbar', {
	autosearch: true,
	stringResult: false,
	searchOnEnter: false,
	defaultSearch: "cn"
});

$('.ui-jqgrid-bdiv').css({ 'max-height': '40vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 208) {
	$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
	$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
	$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
	$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}

$('#SearchProjectRemarksData').on('click', function () {
	PrototypeLoad();
});
function PrototypeLoad() {
	var Projectid = $("#Project_id").val();
	var FromDate = $("#FromDate").val();
	var Todate = $("#ToDate").val();
	var User_Id = $("#User_Id").val();
	var flag = true;

	if (FromDate == '' || Todate == '') {
		flag = false
		FromDate == "" ? alert('Please select From Date') : alert('Please select To date');
	}
	if (flag) {
		$.ajax({
			type: "POST",
			url: ROOT + "EffortTracker/GetProjectReport_Details",
			data: { Projectid: Projectid, FromDate: FromDate, Todate: Todate, UserId: User_Id },
			success: function (App_Results) {

				var jsonsDetails = JSON.parse(App_Results);
				$("#ProjectRemarks_Grid").jqGrid("clearGridData");
				$("#ProjectRemarks_Grid").jqGrid('setGridParam', { data: jsonsDetails });
				$("#ProjectRemarks_Grid").trigger('reloadGrid', [{ page: 1 }]);
				$("#ProjectRemarks_Grid").jqGrid('filterToolbar', {
					autosearch: true,
					stringResult: false,
					searchOnEnter: false,
					defaultSearch: "cn"
				});

				$('.ui-jqgrid-bdiv').css({ 'max-height': '40vh' });
				$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
				var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
				if ($TableHeight > 208) {
					$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
					$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
				}
				else {
					$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
					$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
				}
			},

			error: function () {
				alert("Error occured!!");
			}
		});
	}
}

$('[data-singleselect]').select2()
$('.data-singleselect').select2()

//active class
function setNavigation() {
	var path = window.location.pathname;
	path = path.replace(/\/$/, "");
	path = decodeURIComponent(path);
	//path = path.split('/')[2];

	$("#main_menu li a, #main_menu1 li a").each(function () {
		var href = $(this).attr('href');
		var subURL = $(this).attr('data-subURL');
		var URLs = '';
		if (subURL != undefined) {
			URLs = subURL.split(';');
		}
		if (path === href || URLs.indexOf(path) >= 0) {
			if ($(this).parents('#main_menu, #main_menu1').length >= 1) {
				$(this).parents('li').addClass('active');
				//$(this).parents(".has-menu").addClass('active');
				//$(this).parents('.has-menu').last().addClass('activeparents');
			}
			else {
				$(this).addClass('activeparents');
				$(this).parents('li').addClass('activeparents');
			}


		}
	});
}
setNavigation();

$(".Datepicker_StartDate,.Datepicker_EndDate").keydown(function (event) {
	if (event.key == 'Backspace') {
		return false;
	}
});

$(".Datepicker_StartDate,.Datepicker_EndDate").keypress(function (event) {
	var inputValue = $(this).val();
	var allowedKeys = [45];
	if (event.which >= 48 && event.which <= 57) {
		allowedKeys.push(event.which);
	}

	if (allowedKeys.indexOf(event.which) == -1) {
		event.preventDefault();
		return;
	}
	if ((inputValue.match(/-/g) || []).length >= 2) {
		event.preventDefault();
		return;
	}
	var dateFormat = /^\d{2}-\d{2}-\d{4}$/;
	if (!dateFormat.test(inputValue)) {
		event.preventDefault();
		return;
	}
});


function Remarks_Icon(obj) {
	var CreatedBy = $(obj).data('createdby');
	var date = $(obj).data('createdon');
	var task = $(obj).data('task');

	$.ajax({
		type: "POST",
		url: ROOT + "EffortTracker/GetTaskDetails",
		data: { task: task, date: date, CreatedBy: CreatedBy },
		success: function (App_Results) {
			App_jsons = JSON.parse(App_Results);
			$.jgrid.gridUnload('#ProjectRemarks_Grid1');
			colmodels = [

				{
					name: 'SlNO',
					label: 'Sl.No',
					resizable: true,
					ignoreCase: true,
					width: 80,
					search: false,

				},

				{
					name: 'ProjectName',
					label: 'Project Names',
					resizable: true,
					ignoreCase: true,
					width: 650,
				},
			],

			$("#ProjectRemarks_Grid1").jqGrid({
				url: '',
				datatype: 'local',
				data: App_jsons,
				mtype: 'GET',
				colModel: colmodels,
				loadonce: true,
				viewrecords: true,
				pager: '#pager_ProjectRemarks1',
				rowNum: App_jsons.length,
				scroll: 1,

				gridComplete: function () {
					var objRows = $("#ProjectRemarks_Grid1 tbody tr");
					var objHeader = $("#ProjectRemarks_Grid1 tbody tr td");

					if (objRows.length > 1) {
						var objFirstRowColumns = $(objRows[1]).children("td");
						for (i = 0; i < objFirstRowColumns.length; i++) {
							$(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
						}
					}

				}
			});
			$("#ProjectRemarks_Grid1").jqGrid('filterToolbar', {
				autosearch: true,
				stringResult: false,
				searchOnEnter: false,
				defaultSearch: "cn"
			});
			$('.ui-jqgrid-bdiv').css({ 'max-height': '40vh' });
			$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
			var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
			if ($TableHeight > 208) {
				$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
				$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
			}
			else {
				$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
				$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
			}

		},

		error: function () {
			alert("Error occured!!");
		}
	});
}
$(document).ready(function () {
    $("#ProjectId").val();
    getProjectdata();
});

var checkedData = [];
var LenghtOfProjects = 0;

$('[data-singleselect]').select2()
$('.data-singleselect').select2()
function updateYearDropdown(fromYear, toYear) {

    var $dropdown = $('.year');
    $dropdown.empty();
    $dropdown.append($('<option>', { text: "select" }));

    var currentYear = new Date().getFullYear();

    if (toYear >= currentYear && fromYear >= currentYear) {
        $dropdown.append($('<option>', {
            value: fromYear,
            text: fromYear
        }));
    }
    else {

        for (var year = fromYear; year <= currentYear + 1; year++) {
            $dropdown.append($('<option>', {
                value: year,
                text: year
            }));
        }
        //$dropdown.append($('<option>', {
        //    value: currentYear,
        //    text: currentYear
        //}));
        //$dropdown.append($('<option>', {
        //    value: currentYear - 1,
        //    text: currentYear - 1
        //}));
    }
}

colmodels1 = [

    {
        name: 'Year',
        label: 'Requested Year',
        width: 100
    },
    {
        name: 'DepartmentName',
        label: 'Department Name',
        width: 180
    },

    {
        name: 'Category',
        label: 'Category',
        width: 180
    },
    {
        name: 'CategoryId',
        label: 'CategoryId',
        width: 180,
        hidden: true,
    },
    {
        name: 'ReqBaselineBudget',
        label: 'Req Baseline Budget (INR)',
        width: 140,
        classes: "Requestclass",
        formatter: function (cellvalue, options, rowobject) {


            var index = checkedData.findIndex(s => s.DepartmentName == rowobject.DepartmentName && s.CategoryId == rowobject.CategoryId);
            var Reqbud;
            if (index >= 0) {
                Reqbud = checkedData[index].RequestedBudget;
            }
            else {
                Reqbud = rowobject.ReqBaselineBudget;
            }
            if (rowobject.Status == "" || rowobject.Status == null || rowobject.Status == undefined) {
                return '<div class="action_icons input_budget -items-center" title="">' +
                    '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" type="text" class="form-control budget" value=' + Reqbud + ' /><span class="text-danger hide" > Please enter Budget</span >' +
                    '</div>';
            }
           else if (rowobject.IsBaselineNotrequired == "True" ) {
                var Budget = parseInt(Reqbud).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return '<div class="action_icons input_budget -items-center" title="">' +
                    '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" type="text" class="form-control budget" value=' + Budget + ' disabled /><span class="text-danger hide" > Please enter Budget</span >' +
                    '</div>';
            }
            else if (rowobject.Status == "Rejected") {
                return '<div class="action_icons input_budget -items-center" title="">' +
                    '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" type="text" class="form-control budget" value=0 /><span class="text-danger hide" > Please enter Budget</span >' +
                    '</div>';
            }
            else {
                var Budget = parseInt(Reqbud).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return '<div class="action_icons input_budget -items-center" title="">' +
                    '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" type="text" class="form-control budget" value=' + Budget + ' disabled /><span class="text-danger hide" > Please enter Budget</span >' +
                    '</div>';
            }
        }
    },
    {
        name: 'AppBaselineBudget',
        label: 'Approved Baseline Budget (INR)',
        width: 140,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Status',
        label: 'Baseline Budget Status',
        width: 180,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.ReqBaselineBudget == 0 || rowobject.ReqBaselineBudget == null) {
                return "";
            }
            else if (rowobject.Status == "Pending For L1 Approval") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "L1 Approved" || rowobject.Status == "L2 Approved" || rowobject.Status == "SAP Posting Sucessfully'") {
                return '<a class="task_status value_info "> <span class="text-success">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "Rejected" || rowobject.Status == "SAP Failed") {
                return '<a class="task_status value_info "> <span class="text-danger">' + cellvalue + '</span></a>'
            }
            else if (rowobject.Status == "Waiting for SAP Posting" || rowobject.Status == "SAP In Progress") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else {
                return "";
            }
        }
    },
    {
        name: 'StatusId',
        label: 'StatusId',
        width: 180,
        hidden: true,
    },
    {
        name: 'CreatedBy',
        label: 'Requested By',
        width: 130,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.ReqBaselineBudget == 0 || rowobject.ReqBaselineBudget == null) {
                return "";
            }
            else return cellvalue;

        }
    },
    {
        name: 'IsBaselineNotrequired',
        label: 'IsBaselineNotrequired',
        width: 180,
        hidden: true,
    },
],
    $("#ProjectBasedOnCategory").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels1,
        loadonce: true,
        viewrecords: true,
        pager: '#ProjectBasedOnCategory_pager',
        rowNum: 1000,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#ProjectBasedOnCategory tbody tr");
            var objHeader = $("#ProjectBasedOnCategory tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            //if ($("#Role").val() != "Admin") {
            //    jQuery("#ProjectBasedOnCategory").jqGrid('hideCol', "DepartmentName");
            //}
        }
    });
$("#ProjectBasedOnCategory").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 258) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
}

function getProjectdata() {

    var RoleName = $("#Role").val();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetProjectBaselineBudget",
        dataType: "json",
        data: {
            ProjectId: $("#ProjectId").val(),
            FromDate: $("#FromDate").val(),
            ToDate: $("#ToDate").val()
        },
        success: function (result) {

            LenghtOfProjects = result.BudgetPlan.length;

            if (result.ProjectDates.length > 0) {
                startYear = result.ProjectDates[0].ProjectStartDate;
                $("#FromDate").datepicker('update', result.ProjectDates[0].ProjectStartDate);
                $("#ToDate").datepicker('update', result.ProjectDates[0].ProjectEndDate);
                updateYearDropdown(result.ProjectDates[0].ProjectStartDate, result.ProjectDates[0].ProjectEndDate);
            }

            $("#ProjectBasedOnCategory").jqGrid("clearGridData");
            $("#ProjectBasedOnCategory").jqGrid('setGridParam', { data: result.BudgetPlan });
            $("#ProjectBasedOnCategory").trigger('reloadGrid', [{ page: 1 }]);

            $("#SubmitDetails").hide();
            $("#SaveDetails").hide();
            $("#AdditionalBudgetRequest").hide();
            
            var pendingForApprovalFound = false;
            var isNew = false;
            var isAlreadyPresent = false;
            var SubmittedDate = "";
            for (var i = 0; i < result.BudgetPlan.length; i++) {
                if (result.BudgetPlan[i].IsBaselineNotrequired == "True") {
                    $("#AdditionalBudgetRequest").show()
                    isAlreadyPresent = true;
                }
                else if (result.BudgetPlan[i].Status == "Rejected" || result.BudgetPlan[i].Status == "" || result.BudgetPlan[i].Status == null) {
                    SubmittedDate += ',' + result.BudgetPlan[i].Year
                    $("#SubmitDetails").show();
                    $("#SaveDetails").show();
                }
                if (result.BudgetPlan[i].Status == "L1 Approved" || result.BudgetPlan[i].Status == "L2 Approved" || result.BudgetPlan[i].Status == "Pending For L1 Approval" || result.BudgetPlan[i].Status == "Waiting for SAP Posting" || result.BudgetPlan[i].Status == "SAP Failed" || result.BudgetPlan[i].Status == "SAP In Progress" || result.BudgetPlan[i].Status == "SAP Posting Sucessfully") {
                    if (result.BudgetPlan[i].Status != "Pending For L1 Approval") {
                        pendingForApprovalFound = true;
                    }
                    isNew = true;
                    SubmittedDate = result.BudgetPlan[i].Year
                }
            }

            const distinctStatusIds = [...new Set(result.BudgetPlan.map(plan => plan.StatusId))];

            //if (distinctStatusIds.length == 1 && distinctStatusIds[0] == null) {
            //    $(".year").val(result.ProjectDates[0].RequestedYear);
            //}
            //else 
            if (result.ProjectDates[0].RequestedYear != null) {
                $(".year").val(result.ProjectDates[0].RequestedYear);
                $(".year").attr("disabled", true);
            }
            if (pendingForApprovalFound) {
                ($("#Role").val() == "Admin") ? $("#AdditionalBudgetRequest").hide() : $("#AdditionalBudgetRequest").show();
            }
            let datesArray = SubmittedDate.split(',');
            let uniqueDates = Array.from(new Set(datesArray.filter(date => date !== 'null' && date !== '')));
            let submitdate = uniqueDates.join(',');

            if (isNew) {
                var $dropdown = $('.year');
                $dropdown.empty();
                $dropdown.append($('<option>', {
                    value: submitdate,
                    text: submitdate
                }));
                $(".year").attr("disabled", true);
            }
            if (isAlreadyPresent) {
                $(".year").attr("disabled", true);
            }

            $(".projectid").text(result.BudgetProjectData[0].ProductName)
            $(".projectidhidden").text(result.BudgetProjectData[0].ProjectId)
            $(".template").text(result.BudgetProjectData[0].Template)
            //  $(".createdDate").text(result.BudgetProjectData[0].CreatedDate)
            $(".startDate").text(result.BudgetProjectData[0].StartDate)
            $(".endDate").text(result.BudgetProjectData[0].EndDate)

            var BaselineBudget = result.BudgetProjectData[0].ApprovedBaselinebudget != null ? parseInt(result.BudgetProjectData[0].ApprovedBaselinebudget) : 0;
            var AdditionalBudget = result.BudgetProjectData[0].ApprovedAdditionalbudget != null ? parseInt(result.BudgetProjectData[0].ApprovedAdditionalbudget) : 0;

            $(".ApprovedBaselineBudget").text(BaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
            $(".ApprovedAdditionalBudget").text(AdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))

            if (RoleName == "Admin") {
                $("#SubmitDetails").hide();
                $("#SaveDetails").hide();
            }
        }
    })
}

function onlyNumbers(evt) {
    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;
    if (evt != '') {
        var currentValue = evt.value;
    }
    if (charCode == 46 && (currentValue.indexOf(".") !== -1 || currentValue.length === 0)) {
        return false;
    }
    //else if (charCode === 45 && (currentValue.indexOf('-') === -1 && currentValue.length === 0)) {
    //         return true;
    // }
    //else 
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

$("#SaveDetails").off("click").on("click", function () {
    var RequestData = [];
    $("#ProjectBasedOnCategory").find("tr").each(function (index, element) {
        var rowData = {};
        if (index != 0) {
            var StatusId = $("#ProjectBasedOnCategory").jqGrid('getCell', element.id, 'StatusId');
            var AppBaselineBudget = $("#ProjectBasedOnCategory").jqGrid('getCell', element.id, 'AppBaselineBudget');
            var DepartmentName = $("#ProjectBasedOnCategory").jqGrid('getCell', element.id, 'DepartmentName');

            if (StatusId == "" || StatusId == "30") {
                $(element).find("input").each(function () {
                    var id = $(this).attr("id");
                    var value = $(this).val();
                    rowData = {
                        DepartmentName: DepartmentName,
                        Category: id,
                        BudgetValue: value,
                        BudgetType: 11,
                        Status: StatusId == "" ? 0 : StatusId,
                        BudgetYear: $(".year").val()
                    }
                    RequestData.push(rowData);
                });
            }
        }
    });

    $("#SavePopUp").modal("show");
    $("#SaveOk").off("click").on("click", function () {
        $(document).find($('#SaveOk')).attr('disabled', true);
        $.ajax({
            type: "POST",
            url: ROOT + "ProjectMaster/SaveBudgetData",
            data: { ProjectId: $(".projectidhidden").text(), RequestedData: JSON.stringify(RequestData), isSave: "Yes" },
            success: function (data) {
                getProjectdata();
                //         showAlertMessage(data.OutMessage, data.StyleClass)
            }, error: function () {
                alert("Error occured!!");
            }
        })
        $(document).find($('#SaveOk')).attr('disabled', false);

    })
});
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
    getProjectdata();

}

$("#SubmitDetails").off("click").on("click", function () {
    var RequestData = [];
    var flag = true;
    var count = 0

    var Requestyear = $(".RequestYear").val();
    $(".hideforadditinal").show();

    Requestyear != "select" ? ($("#Error_in_Year").hide(), flag = true) : ($("#Error_in_Year").show(), flag = false);
    $("#ProjectBasedOnCategory").find("tr").each(function (index, element) {
        var rowData = {};
        if (index != 0) {
            var StatusId = $("#ProjectBasedOnCategory").jqGrid('getCell', element.id, 'StatusId');
            var DepartmentName = $("#ProjectBasedOnCategory").jqGrid('getCell', element.id, 'DepartmentName');
            if (StatusId == "" || StatusId == "30") {
                $(element).find("input").each(function () {
                    var id = $(this).attr("id");
                    var value = $(this).val();

                    if (value == "") {
                        $(this).siblings('span').removeClass('hide');
                        flag = false;
                    }
                    if (value == 0 && StatusId == "30") {

                    }
                    if (value == 0) {
                        count++;
                    }
                    else {
                        rowData = {
                            DepartmentName: DepartmentName,
                            Category: id,
                            BudgetValue: value,
                            BudgetType: 11,
                            Status: value != 0 ? 10 : StatusId != "" ? StatusId : '',
                            BudgetYear: $(".year").val(),
                        }
                        RequestData.push(rowData);
                    }

                });
            }


        }
    });

    if (count == LenghtOfProjects && flag) {
        alert("Please request the budget atleast for category");
        flag = false;
    }
    else if (RequestData.length == 0 && flag) {
        alert("Please request the budget atleast for category");
        flag = false;
    }
    if (flag) {
        $("#SubmitPopUp").modal("show");
        $("#SubmitOK").off("click").on("click", function () {
            var flag1 = true;
            $(".ApprovalRemarks").val().trim() == "" ? (flag1 = false, $("#Error_ApprovalRemarks").show()) : flag1 = true;
            if (flag1) {
                $(document).find($('#SubmitOK')).attr('disabled', true);
                $.ajax({
                    type: "POST",
                    url: ROOT + "ProjectMaster/SaveBudgetData",
                    dataType: "json",
                    async: false,
                    data: { ProjectId: $(".projectidhidden").text(), RequestedData: JSON.stringify(RequestData), Remarks: $(".ApprovalRemarks").val() },
                    success: function (data) {
                        showAlertMessage(data.OutMessage, data.StyleClass)
                    }, error: function () {
                        alert("Error occured!!");
                    }
                });
                $(document).find($('#SubmitOK')).attr('disabled', false);

                $("#SubmitPopUp").modal("hide");
            }
        });
    }
});

colmodels = [
    {
        name: 'RequestedYear',
        label: 'Requested Year',
        width: 110,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DepartmentName',
        label: 'Department Name',
        width: 180,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Category',
        label: 'Category',
        width: 160,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 120,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.BudgetType == "Baseline") {
                return '<a class="value_info"> <span class="color-green_">' + cellvalue + '</span></a>';
            }
            else if (rowobject.BudgetType == "Additional") {
                return '<a class="value_info"> <span class="text-warning">' + cellvalue + '</span></a>';
            }
            else if (rowobject.BudgetType == "Transfer In" || rowobject.BudgetType == "Transfer Out") {
                return '<a class="value_info"> <span class="color-blue">' + cellvalue + '</span></a>';
            }
            else {
                return '';
            }
        }
    },
    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 120,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'RequestedBudget',
        label: 'Requested Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'ApprovedBudget',
        label: 'Approved Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'CreateBy',
        label: 'Budget Requested By',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedOn',
        label: 'Budget Requested On',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RequestRemarks',
        label: 'Budget Requested Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Action',
        label: 'L1 Action',
        width: 160,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {

            if (rowobject.Action == "L1 Approved") {
                return '<span class="text-success">L1 Approved</span>';
            }
            else if (rowobject.Action == "Rejected") {
                return '<span class="text-danger">Rejected</span>';
            }
            else if (rowobject.Action == "Pending For L1 Approval") {
                return '<span class="text-warning">Pending For L1 Approval</span>';
            }
            else {
                return "";
            }
        }
    },
    {
        name: 'Action',
        label: 'L1 Action',
        width: 160,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true
    },
    {
        name: 'ActionBy',
        label: 'L1 Action By',
        width: 160,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'ActionOn',
        label: 'L1 Action On',
        width: 130,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'ApproveRemarks',
        label: 'L1 Action Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'L2Action',
        label: 'L2 Action',
        width: 160,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.L2Action == "L2 Approved" || rowobject.L2Action == "SAP Posting Sucessfully'") {
                return '<span class="text-success">' + rowobject.L2Action + '</span>';
            }
            else if (rowobject.L2Action == "SAP In Progress" || rowobject.L2Action == "Waiting for SAP Posting") {
                return '<span class="text-warning">' + rowobject.L2Action + '</span>';
            }
            else if (rowobject.L2Action == "SAP Failed") {
                return '<span class="text-danger">' + rowobject.L2Action + '</span>';
            }

            else {
                return "";
            }
        }
    },
    {
        name: 'L2Action',
        label: 'L2 Action',
        width: 160,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true
    },
    {
        name: 'L2ActionBy',
        label: 'L2 Action By',
        width: 160,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'L2ActionOn',
        label: 'L2 Action On',
        width: 130,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'L2ApproveRemarks',
        label: 'L2 Action Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
],

    $("#history_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#history_pager',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#history_grid tbody tr");
            var objHeader = $("#history_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#history_grid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 258) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
}

colmodels = [
    {
        name: "Action",
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        search: false,
        formatter: function (cellvalue, options, rowobject) {

            if (rowobject.Status == "" || rowobject.Status == undefined || rowobject.Status == null) {
                return '<div class="text-center icon_section align-items-left">' +
                    '<a class="btn-icon -delete"  onclick="OnDeleteResources(' + options.rowId + ')"><i class="fas fa-trash" id="DeleteResource" title="Delete"></i></a>' +
                    '</div> ';
            }
            else {
                return "";
            }
        }
    },
    {
        name: 'BudgetYear',
        label: 'Requested Year',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 160,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Category',
        label: 'Category',
        width: 160,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ReqAdditionalBudget',
        label: 'Req Additional Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Status',
        label: 'Status',
        width: 160,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.Status == "L1 Approved" || rowobject.Status == "L2 Approved") {
                return '<span class="text-success">' + rowobject.Status + '</span>';
            }
            else if (rowobject.Status == "Rejected") {
                return '<span class="text-danger">' + rowobject.Status + '</span>';
            }
            else if (rowobject.Status == "Pending For L1 Approval") {
                return '<span class="text-warning">' + rowobject.Status + '</span>';
            }
            else {
                return "";
            }
        }
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CategoryId',
        label: 'CategoryId',
        width: 130,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'CreatedBy',
        label: 'Created By',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedDate',
        label: 'Created On',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'isNew',
        label: 'isNew',
        width: 100,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
],

    $("#AdditionalGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#AdditionalGrid_Pager',
        rowNum: 100,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#AdditionalGrid tbody tr");
            var objHeader = $("#AdditionalGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#AdditionalGrid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 258) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
}


$(document).ready(function () {

    $('[data-singleselect]').select2()
    $('.data-singleselect').select2()
    $('.data-singleselect').select2({
        dropdownParent: $('#add_project')
    });

})
$("#approvalHistory").on("click", function () {
    var ProjectId = $(".projectidhidden").text();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetBudgetHistory",
        data: {
            ProjectId: ProjectId
        },
        success: function (data) {
            $('div#historypopup').modal('show');
            $(".project_id").text($(".projectid").text());
            $("#history_grid").jqGrid("clearGridData");
            $("#history_grid").jqGrid('setGridParam', { data: data });
            $("#history_grid").trigger('reloadGrid', [{ page: 1 }]);
        }
    })
});


$("#AdditionalBudgetRequest").on("click", function () {
    var ProjectId = $(".projectidhidden").text();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetApprovedDataForAdditionalPage",
        data: { ProjectId: ProjectId },
        success: function (data) {
            $('div#AdditionBudgetRequest').modal('show');

            var startYear = $(".year").val();
            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            $('.Add_year').datepicker({
                format: 'yyyy',
                viewMode: 'years',
                minViewMode: 'years',
                todayHighlight: true,
                autoclose: true,
                startDate: new Date(startYear, 0, 1),
                endDate: new Date(new Date().getFullYear() + 1, 11, 31)
            });
            $('.Add_year').datepicker('setDate', today);


            $("option").remove(".CategoryOption");
            $("option").remove(".DepartmentOption");
            var addedCategories = [];
            var addedDepartments = [];
            var RoleName = $("#Role").val();
            if (RoleName == "Admin") {
                $(".hideforAdmin").hide();
            }
            $('[data-singleselect]').select2()
            $('.select2-hidden-accessible').each(function () {
                $(this).select2({
                    dropdownParent: $(this).parent()
                });
            });

            $.each(data.CategoryMaster, function (i, obj) {
                if (!addedDepartments.includes(obj.DepartmentName)) {
                    var categoryList = '<option class="DepartmentOption" value="' + obj.DepartmentName + '">' + obj.DepartmentName + '</option>';
                    $(".DepartmentValue").append(categoryList);
                    addedDepartments.push(obj.DepartmentName);
                }
            })

            $(".Add_ProjectId").text($(".projectid").text())

            $(".project_id").text($(".projectid").text());
            $("#AdditionalGrid").jqGrid("clearGridData");
            $("#AdditionalGrid").jqGrid('setGridParam', { data: data.BudgetPlan });
            $("#AdditionalGrid").trigger('reloadGrid', [{ page: 1 }]);
        }
    })

});

var AdditionalBudgetData = [];

$("#AddAdditionalRequest").on("click", function () {
    if (!categoryFound) {
        var year = $(".Add_year").val().trim();
        var category = $("#ADD_Category option:selected").text().trim();
        var department = $("#ADD_Department option:selected").val();
        var requestedBudget = $(".requestedBudget").val().trim();
        var Remarks = $(".AdditionalRemarks").val().trim();
        var CategoryId = $("#ADD_Category option:selected").val();
        var flag = true;
        year == "" ? ($(".Error_Year").show(), flag = false) : $(".Error_Year").hide();
        CategoryId == "" ? ($(".Error_Category").show().text("Please select category"), flag = false) : $(".Error_Category").hide().text("");
        requestedBudget == "" ? ($(".Error_ReqBudget").show(), flag = false) : $(".Error_ReqBudget").hide();
        Remarks == "" ? ($(".Error_Remarks").show(), flag = false) : $(".Error_Remarks").hide();
        department == "" ? ($(".Error_Department").show().text("Please select department"), flag = false) : $(".Error_Department").hide().text("");
        if (flag) {
            var griddata = [];
            var AdditionalData = {};
            AdditionalData = {
                BudgetYear: year,
                Category: category,
                ReqAdditionalBudget: requestedBudget,
                Remarks: Remarks,
                CategoryId: CategoryId,
                DepartmentName: department,
                isNew: 1
            }

            griddata.push(AdditionalData);
            AdditionalBudgetData.push(AdditionalData);

            var B1 = $("#AdditionalGrid").jqGrid('getGridParam', 'data');
            var B2 = $.merge(B1, griddata);
            $("#AdditionalGrid").jqGrid('setGridParam', { data: B2 });
            $("#AdditionalGrid").trigger('reloadGrid', [{ page: 1 }]);
            $(".clearThisData").val("");
            $(".CategoryValue").val("");
            $(".DepartmentValue").val("");
            $("option").remove(".CategoryOption");
        }
    }
})
var categoryFound = false;
$("#ADD_Category, .Add_year").on("change", function () {
    categoryFound = false;
    var category = $("#ADD_Category option:selected").val();
    var Department = $("#ADD_Department option:selected").val();
    const CatList = $("#AdditionalGrid").jqGrid("getGridParam", "data");
    var BudgetYear = $(".Add_year").val();
    if (category != "") {
        $.each(CatList, function (i, obj) {

            if ((obj.CategoryId == category && Department == obj.DepartmentName && BudgetYear == obj.BudgetYear) && (obj.Status != "L1 Approved" && obj.Status != "L2 Approved" && obj.Status != "Rejected")) {
                $(".Error_Category").show().text('Additional budget is already requested for the selected category');
                categoryFound = true;
                return false;

            }
            else {
                $(".Error_Category").hide().text('');
            }

        })
    }
})
$("#ADD_Department").on("change", function () {
    $(".Error_Category").hide().text("");
    var Department = $("#ADD_Department option:selected").val();
    var ProjectId = $(".projectidhidden").text();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetCategoryforAdditionalRequest",
        data: { ProjectId: ProjectId, Department: Department },
        success: function (data) {

            var addedCategories = [];
            $("option").remove(".CategoryOption");
            $.each(data.CategoryMaster, function (i, obj) {
                if (!addedCategories.includes(obj.CategoryId)) {
                    var categoryList = '<option class="CategoryOption" value="' + obj.CategoryId + '">' + obj.CategoryName + '</option>';
                    $(".CategoryValue").append(categoryList);
                    addedCategories.push(obj.CategoryId);
                }
            })
        }
    });
})
function OnDeleteResources(RowData) {
    var AdditionalGrid = jQuery('#AdditionalGrid').jqGrid('getRowData', RowData);

    $("#DeletetePopUp").modal("show");
    $("#deleteResource").off("click").on("click", function () {
        $("#AdditionalGrid").jqGrid('delRowData', RowData, '', '');
        $("#AdditionalGrid").trigger('reloadGrid', [{ page: 1 }]);

        var index = AdditionalBudgetData.findIndex(obj => obj.CategoryId == AdditionalGrid.CategoryId)
        if (index !== -1) {
            AdditionalBudgetData.splice(index, 1);
        }
    });
}

$('#SaveAdditionalRequest').off('click').on('click', function () {
    var AdditionalBudgetDataToSave = [];
    var Additiondata = $("#AdditionalGrid").jqGrid("getGridParam", "data");
    $.each(Additiondata, function (i, obj) {
        if (obj.isNew != undefined) {
            var DatatoSave = {};
            DatatoSave = {
                BudgetYear: obj.BudgetYear,
                Category: obj.Category,
                ReqAdditionalBudget: obj.ReqAdditionalBudget,
                Remarks: obj.Remarks,
                CategoryId: obj.CategoryId,
                DepartmentName: obj.DepartmentName,
            }
            AdditionalBudgetDataToSave.push(DatatoSave);
        }
    });

    if (AdditionalBudgetDataToSave.length == 0) {
        alert("There is no data to save")
    }
    else {
        $("#SubmitPopUp").modal("show");
        $(".hideforadditinal").hide();
        $("#SubmitOK").off("click").on("click", function () {
            $("#SubmitOK").attr("disabled", true);
            $.ajax({
                type: "POST",
                url: ROOT + "ProjectMaster/SaveAdditinalRequestData",
                dataType: "json",
                async: false,
                data: { ProjectId: $(".projectidhidden").text(), RequestedData: JSON.stringify(AdditionalBudgetDataToSave) },
                success: function (data) {
                    $("#SubmitPopUp").modal("hide");
                    $("#AdditionBudgetRequest").modal("hide");
                }, error: function () {
                    alert("Error occured!!");
                }
            });

        });
    }
});

$(window).on('hidden.bs.modal', function () {
    $("#SubmitOK").attr("disabled", false)
    $(".Error_ReqBudget").hide();
    $(".Error_Remarks").hide();
    $(".Error_Category").hide();
    $(".Error_Department").hide();
    $(".Error_Year").hide();
    $(".clearThisData").val("");
    $(".CategoryValue").val("");
    $(".DepartmentValue").val("");
    $(".ApprovalRemarks").val("");
    AdditionalBudgetData = [];
    categoryFound = false;
});
$("#SearchData").on("click", function (i, obj) {
    getProjectdata();
});
$("#HistoryExcelDownload").click(function () {
    var data = $('#history_grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#history_grid").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "BudgetHistory.xlsx",
            maxlength: 1000,

        });
    }
});

$('body').on('change', '.Requestclass', function () {
    var rowData = getRowDataInArray(this);
    var foundIndex = checkedData.findIndex(x => x.MaterialCode === rowData.MaterialCode);

    if (foundIndex !== -1) {
        checkedData[foundIndex] = rowData;
    }
    else {
        checkedData.push(rowData);
    }
});

function getRowDataInArray(obj) {
    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#ProjectBasedOnCategory');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");
    var Department = grd.jqGrid('getCell', rowid, 'DepartmentName');
    var CategoryId = grd.jqGrid('getCell', rowid, 'CategoryId');
    var RequestedBudget = $(clossestTableRow).children().find(".budget").val() != undefined ? $(clossestTableRow).children().find(".budget").val() : grd.jqGrid('getCell', rowid, 'ReqBaselineBudget');

    var arrayitem = {

        DepartmentName: Department,
        CategoryId: CategoryId,
        RequestedBudget: RequestedBudget
    };

    return arrayitem;
}

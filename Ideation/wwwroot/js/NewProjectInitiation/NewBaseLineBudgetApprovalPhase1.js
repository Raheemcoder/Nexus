var flagVal = true;
var DepartmentsBudget = [];
var budgetData = [];

$(document).ready(function () {

    Budget = $("#BudgetType").val();

    if (Budget.includes('11')) {
        getProjectslist("Baseline");
    }
    else {
        $(".AdditionalBudget").trigger("click");
    }

    $('[data-singleselect]').select2()
    $('.data-singleselect').select2()
    $('.data-singleselect').select2({
        dropdownParent: $('#add_project')
    });

});

$("#SearchData").on("click", function () {

    var projectId = $("#ProjectId").val();
    var department = $("#Department").val();
    var category = $("#Category").val();

    var Type = $(".BudgetType").text();

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetBudgetPendingDataForProject",
        dataType: "JSON",
        data: {
            ProjectId: projectId, BudgetType: Type, Department: department, Category: category
        },
        success: function (result) {
            loadGrid(result.BudgetPlan, Type);
            DepartmentsBudget = result.DepartmentBudgetMaster;
        }
    });

});
$(".BaselineBudget").on("click", function () {
    $("#Department").val('').select2();
    $("#Category").val('').select2();
    getProjectslist("Baseline")
});
$(".AdditionalBudget").on("click", function () {
    $("#Department").val('').select2();
    $("#Category").val('').select2();
    getProjectslist("Additional");
});
$("#RejectData,#ApproveData").on("click", function () {
    
    var ButtonClicked = $(this).attr("id");
    var button = ButtonClicked == "ApproveData" ? "Approve" : "Reject";
    var buttonCase = button.toLowerCase();
    flagVal = true;
    var myApprovalPendingData = [];
    var selectedYear = []
    var flag = true;
    var BudgetType = $(".BudgetType").text() == "Baseline" ? 11 : 21;
    var ProjectId = $(".ProjectId_hidden").text();
    var requestedBaselineBudget = budgetData.ApprovedBaselinebudget;
    var requestedAdditionalBudget = budgetData.ApprovedAdditionalbudget;
    var baselineNumber = parseFloat(requestedBaselineBudget) || 0;
    var additionalNumber = parseFloat(requestedAdditionalBudget) || 0;
    var totalBudget = baselineNumber + additionalNumber;
    var TotalBudget = formatToIndianSystem(totalBudget);
    $("#list tr").each(function () {
        if ($(this).find('.checkbox').prop('checked')) {
            var rowData = getchecckedRowData(this, button);
            selectedYear.push(rowData.RequestedYear);
            myApprovalPendingData.push(rowData);
        }
    });
    var totalPendingValue = 0;
    myApprovalPendingData.forEach(function (item) {
        totalPendingValue += parseFloat(item.ApprovedAmount.replace(/,/g, ''));
    });
    if (flagVal) {
        if (myApprovalPendingData == [] || myApprovalPendingData.length == 0) {
            flag = false
            alert('Please select atleast one data to ' + buttonCase)
        }
        else if (flag) {
            $('#Approve').modal('show');
            $(".modaltitle").text(button + " Confirmation");
            if (button.toLowerCase() == 'approve') {
                if (TotalBudget != 0) {
                    $(".ProjctAndBudget").html(`Total of <b>${TotalBudget}</b> INR is allocated to <b>${ProjectId} </b>`);
                    $(".modalmsg").html(`Are you sure you want to allocate an additional budget of INR <b>${totalPendingValue.toLocaleString('en-IN')}</b>?`);
                }
                else {
                    $(".modalmsg").html(`Are you sure you want to allocate an budget of INR <b>${totalPendingValue.toLocaleString("en-IN")}</b>?`);
                }
            }
            else {
                $(".modalmsg").text("Are you sure you want to " + buttonCase + "?");

            }
            $('#ByClick_OK').off('click').on('click', function () {
                var flag1 = true;
                $(".ApprovalRemarks").val().trim() == "" ? (flag1 = false, $("#Error_ApprovalRemarks").show()) : flag1 = true;
                if (flag1) {
                    $(document).find($('#ByClick_OK')).attr('disabled', true);
                    $.ajax({
                        type: "POST",
                        url: ROOT + "NewProjectInitiation/SaveBaselineApprovalData",
                        dataType: "JSON",
                        data: {
                            selecteddata: JSON.stringify(myApprovalPendingData), Remarks: $(".ApprovalRemarks").val()
                        },
                        data: {
                            selecteddata: JSON.stringify(myApprovalPendingData), Remarks: $(".ApprovalRemarks").val(), FromStage: "10", Action: button, BudgetType: BudgetType, ProjectId: ProjectId
                        },
                        success: function (data) {
                            showAlertMessage(data.OutMessage, data.StyleClass);
                        }, error: function () {
                            alert("Error occured!!");
                        }
                    });
                    $(document).find($('#ByClick_OK')).attr('disabled', false);
                    $("#SubmitPopUp").modal("hide");
                    $('#Department').val('').select2();
                    $('#Category').val('').select2();

                }
            });
        }
    }

});
$(document).on("click", "#btnrefresh", function () {
    $("#Department").val('').select2();
    $("#Category").val('').select2();
    var Type = $(".BudgetType").text();
    getProjectslist(Type)
});
$(window).on('hidden.bs.modal', function () {
    $(".cancelThisData").val("");
    $("#Error_ApprovalRemarks").hide();
});

function formatToIndianSystem(number) {
    var x = number.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    var result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return result;
}

function getProjectslist(Type) {

    var projectId = $("#ProjectId").val();
    var department = $("#Department").val();
    var category = $("#Category").val();

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetBudgetPendingDataForProject",
        dataType: "json",
        data: { ProjectId: projectId, BudgetType: Type, Department: department, Category: category },
        success: function (result) {
            if (result.BudgetProjectData.length != 0) {
                budgetData = result.BudgetProjectData[0];
                
                $(".ProjectId").text(result.BudgetProjectData[0].ProductName)
                $(".ProjectId_hidden").text(result.BudgetProjectData[0].ProjectId)
                var BaselineBudget = result.BudgetProjectData[0].ApprovedBaselinebudget != null ? parseInt(result.BudgetProjectData[0].ApprovedBaselinebudget) : 0;
                var AdditionalBudget = result.BudgetProjectData[0].ApprovedAdditionalbudget != null ? parseInt(result.BudgetProjectData[0].ApprovedAdditionalbudget) : 0;
                var ReqBaselineBudget = result.BudgetProjectData[0].RequestedBaselinebudget != null ? parseInt(result.BudgetProjectData[0].RequestedBaselinebudget) : 0;
                var ReqAdditionalBudget = result.BudgetProjectData[0].RequestedAdditionalBudget != null ? parseInt(result.BudgetProjectData[0].RequestedAdditionalBudget) : 0;
                var requestedBaselineBudget = budgetData.ApprovedBaselinebudget;
                var requestedAdditionalBudget = budgetData.ApprovedAdditionalbudget;
                var baselineNumber = parseFloat(requestedBaselineBudget) || 0;
                var additionalNumber = parseFloat(requestedAdditionalBudget) || 0;
                var totalBudget = baselineNumber + additionalNumber;
                var TotalBudget = formatToIndianSystem(totalBudget);
                $(".ApprovedBaselineBudget").text(BaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
                $(".ApprovedAdditionalBudget").text(AdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
                $(".RequestedBaselineBudget").text(ReqBaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
                $(".RequestedAdditionalBudget").text(ReqAdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
                $('.TotalBudget').text(TotalBudget)

                $(".BudgetType").text(Type)
                var addedCategories = [];
                var addedDepartments = [];
                $("option").remove(".CategoryOption");
                $("option").remove(".DepartmentOption");
            }
            if (result.BudgetPlan != 0) {
                $.each(result.BudgetPlan, function (i, obj) {
                    if (!addedCategories?.includes(obj.CategoryId)) {
                        var categoryList = '<option class="CategoryOption" value="' + obj.CategoryId + '">' + obj.Category + '</option>';
                        $(".CategoryValue").append(categoryList);
                        addedCategories?.push(obj.CategoryId);
                    }
                })
                $.each(result.BudgetPlan, function (i, obj) {

                    if (!addedDepartments?.includes(obj.DepartmentName)) {
                        var DeptList = '<option class="DepartmentOption" value="' + obj.DepartmentId + '">' + obj.DepartmentName + '</option>';
                        $(".DepartmentValue").append(DeptList);
                        addedDepartments?.push(obj.DepartmentName);
                    }
                })
            }
            loadGrid(result.BudgetPlan, Type);
            DepartmentsBudget = result.DepartmentBudgetMaster;
        }
    })

}
function checkBox(e) {
    e = e || event;/* get IE event ( not passed ) */
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = false;
    var headerCheckbox = document.getElementById('cbox');
    var isChecked = headerCheckbox.checked;
    if (isChecked) {
        $('#list .checkbox').prop('checked', true);
        $('#list tr').addClass('show_edit');
    }
    else {
        $('#list .checkbox').prop('checked', false);
        $('#list tr').removeClass('show_edit');
    }
}
function onlyNumbers(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;
    if (evt != '') {
        var currentValue = evt.value;
    }
    if (charCode == 46 && (currentValue.indexOf(".") !== -1 || currentValue.length === 0)) {
        // if decimal point is pressed and it already exists in the value or it is pressed as the first character, return false
        return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function SingleApproveOrReject(obj, IsApproved) {
    debugger;
    var flag = true;
    var clossestTableRow = $(obj).closest("tr");
    var RequestBaseline = $(clossestTableRow).find("td.reqval").text();
    var ApprovalBudget = $(clossestTableRow).find("td input.appvalue").val();
    var BudgetReqNo = $(clossestTableRow).find("td.BudgetReqNo").text();
    var ProjectId = $(".ProjectId_hidden").text();
    var requestedBaselineBudget = budgetData.ApprovedBaselinebudget;
    var requestedAdditionalBudget = budgetData.ApprovedAdditionalbudget;
    var baselineNumber = parseFloat(requestedBaselineBudget) || 0;
    var additionalNumber = parseFloat(requestedAdditionalBudget) || 0;
    var totalBudget = baselineNumber + additionalNumber;
    var TotalBudget = formatToIndianSystem(totalBudget);

    $('.ApprovedBaselineBudget').text()
    $('.ApprovedBaselineBudget').text()
    $('.ApprovedBaselineBudget').text()
    $('.ApprovedBaselineBudget').text()
    if (ApprovalBudget == "") {
        $(clossestTableRow).find("td span.hide").removeClass("hide");
        flag = false;
    }
    var Action = IsApproved == 'Y' ? 'Approve' : 'Reject';
    if (flag) {
        $('#Approve').modal('show');
        
        if (IsApproved == "Y") {
            $(".modaltitle").text("Approve Confirmation");
            //$(".modalmsg").text("Are you sure you want to approve?");
            if (TotalBudget != 0) {
                $(".ProjctAndBudget").html(`Total of <b>${TotalBudget}</b> INR is allocated to <b>${ProjectId} </b>`);
                $(".modalmsg").html(`Are you sure you want to allocate an additional budget of INR <b>${ApprovalBudget.toLocaleString('en-IN')}</b>?`);
            }
            else {
                $(".modalmsg").html(`Are you sure you want to allocate an budget of INR <b>${ApprovalBudget.toLocaleString("en-IN")}</b>?`);
            }
        }
        else {
            $(".modaltitle").text("Reject Confirmation");
            $(".modalmsg").text("Are you sure you want to reject?");
        }
        $('#ByClick_OK').off('click').on('click', function () {
            var selecteddata = [];
            selecteddata = [{
                RequestedAmount: RequestBaseline,
                ApprovedAmount: Action == "Reject" ? "" : ApprovalBudget,
                BudgetReqNo: BudgetReqNo
            }]
            var BudgetType = $(".BudgetType").text() == 'Baseline' ? "11" : "21";
            var flag1 = true;
            $(".ApprovalRemarks").val().trim() == "" ? (flag1 = false, $("#Error_ApprovalRemarks").show()) : flag1 = true;
            if (flag1) {
                $(document).find($('#ByClick_OK')).attr('disabled', true);
                $.ajax({
                    type: "POST",
                    url: ROOT + "NewProjectInitiation/SaveBaselineApprovalData",
                    dataType: "JSON",
                    async: false,
                    data: {
                        selecteddata: JSON.stringify(selecteddata), Remarks: $(".ApprovalRemarks").val(), FromStage: "10", Action: Action, BudgetType: BudgetType, ProjectId: ProjectId
                    },
                    success: function (data) {
                        showAlertMessage(data.OutMessage, data.StyleClass);
                    }, error: function () {
                        alert("Error occured!!");
                    }
                });
                $(document).find($('#ByClick_OK')).attr('disabled', false);
                $("#SubmitPopUp").modal("hide")
                $('#Category').val('').select2();
                $('#Department').val('').select2();
                getProjectslist($(".BudgetType").text());
            }
        });
    }

}
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#Approve').modal('hide');
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
    getProjectslist($(".BudgetType").text());
}
function checktheinputValue(obj) {

    var clossestTableRow = $(obj).closest("tr");
    var BaselineBudget = $(clossestTableRow).find("td.reqval").text();
    var AddedBaselineBudget = parseFloat(BaselineBudget.replace(/,/g, ''));
    var ApprovalValue = parseFloat((obj.value).replace(/,/g, ''));
    if (ApprovalValue > AddedBaselineBudget) {
        alert("Approved budget should not be greater than requested budget")
        $(obj).val("");
    }
}
function getchecckedRowData(obj, Status) {

    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#list');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");
    var BudgetReqNo = grd.jqGrid('getCell', rowid, 'BudgetReqNo');
    var ReqBaselineBudget = grd.jqGrid('getCell', rowid, 'ReqBaselineBudget');
    var ApprovedBudget = $(clossestTableRow).find("td input.appvalue").val();
    var ProjectId = $(".ProjectId_hidden").text();
    if (ApprovedBudget == "") {
        $(clossestTableRow).find("td span.hide").removeClass("hide");
        flagVal = false;
    }
    var arrayitem = {};
    var arrayitem = {
        BudgetReqNo: BudgetReqNo,
        RequestedAmount: ReqBaselineBudget,
        ApprovedAmount: Status == "Reject" ? "" : ApprovedBudget
    };

    return arrayitem;

}
function loadGrid(result, Type) {

    $.jgrid.gridUnload('#list');

    colmodels = [
        {
            name: "BudgetReqNo",
            label: 'BudgetReqNo',
            width: 90,
            resizable: true,
            hidden: true,
            classes: "BudgetReqNo"
        },
        {
            name: "SAPLogNo",
            label: 'SAPLogNo',
            width: 90,
            resizable: true,
            hidden: true,
        },
        {
            name: 'CheckBox',
            label: '<input type="checkbox" id="cbox" onclick="checkBox(event)"/>',
            editable: true,
            index: 'Check_Box',
            width: 50,
            align: 'left',
            resizable: false,
            edittype: 'checkbox',
            formatoptions: {
                disabled: false
            },
            editoptions:
            {
                value: "True:False"
            },

            sortable: false,
            search: false,
            formatter: function checkboxFormatter(cellValue, options, rowObject) {
                if (rowObject.Status?.toLowerCase() == "pending for approval") {
                    var uniqueId = 'chk_' + options.rowId;
                    var checkbox = '<input type="checkbox" id="' + uniqueId + '" class="checkbox" />';
                    return checkbox;
                }
                else {
                    return '';
                }
            }
        },
        {
            name: 'Action',
            label: 'Action',
            align: 'center',
            classes: 'trs',
            width: 70,
            search: false,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Status?.toLowerCase() == "pending for approval") {
                    return '<div class="d-flex action_icons align-items-center" title="">' +
                        '<a onclick=SingleApproveOrReject(this,"Y") class="pl-1" title="Approve" > <i class="fas fa-thumbs-up text-success mr-2"></i></a> ' +
                        '<a onclick=SingleApproveOrReject(this,"N")  class="pl-1" title="Reject"> <i class="fas fa-thumbs-down text-danger mr-2"></i></a> ' +
                        '</div>';
                }
                else if (rowobject.Status?.toLowerCase() == "sap failed") {
                    return '<div class="d-flex action_icons align-items-center" title="">' +
                        '<a onclick="BudgetAllocationRetry(\'' + rowobject.BudgetReqNo + '\')" class="view-color pl-1" role="button" title="Post SAPStatus" title="Retry"><i class="pr-2 fas fa-reply color-eye" title="Retry" ></i></a>' +
                        '<a onclick="SapFailedInfo(\'' + rowobject.SAPLogNo + '\')" title="Remarks" class="pl-1"> <i class="fas fa-eye"></i></a>' +
                        '</div>';
                }

                else {
                    return '';
                }
            }
        },
        {
            name: 'BudgetYear',
            label: 'Requested Year',
            width: 90,
            classes: "BudgetYear",
        },
        {
            name: 'DepartmentName',
            label: 'Department',
            width: 160,
            classes: "Dept",
        },
        {
            name: 'DepartmentId',
            label: 'DeptId',
            width: 10,
            hidden: true,
            classes: "DeptId",
        },
        {
            name: 'Category',
            label: 'Category',
            width: 160,
        },
        {
            name: 'CategoryId',
            label: 'Category',
            width: 180,
            hidden: true,
        },
        {
            name: 'ReqBaselineBudget',
            label: Type == "Baseline" ? "Request Baseline Budget (INR)" : "Request Additional Budget (INR)",
            width: 120,
            classes: "reqval text-right",
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
                    var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                    return Budget;
                }
                else {
                    return ''
                }
            }
        },
        {
            name: 'AppBaselineBudget',
            label: Type == "Baseline" ? "Approved Baseline Budget (INR)" : "Approved Additional Budget (INR)",
            width: 140,
            formatter: function (cellvalue, options, rowobject) {

                if (rowobject.Status == "") {
                    return '';
                }
                else if (rowobject.Status?.toLowerCase() == "pending for approval") {
                    var Budget = parseInt(rowobject.ReqBaselineBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                    return '<div class="action_icons input_budget -items-center" title="">' +
                        '<input type="text" class="form-control appvalue" onkeypress="return onlyNumbers(this)" onkeyup="return checktheinputValue(this)" value="' + Budget + '" /><span class="text-danger hide errormsg"> Please enter Budget</span>' +
                        '</div>';
                }
                else {
                    var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                    return '<div class="text-right">' + Budget + '</div>';
                }
            },
        },
        {
            name: 'Status',
            label: Type == "Baseline" ? "Baseline Budget Status" : "Additional Budget Status",
            width: 180,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Status?.toLowerCase() == "pending for approval") {
                    return '<div class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></div>'
                }
                else if (rowobject.Status?.toLowerCase() == "approved") {
                    return '<div class="task_status value_info "> <span class="text-success">' + cellvalue + '</span></div>'
                }
                else if (rowobject.Status?.toLowerCase() == "rejected" || rowobject.Status?.toLowerCase() == "sap failed" || rowobject.Status?.toLowerCase() == "cancelled") {
                    return '<div class="task_status value_info "> <span class="text-danger">' + cellvalue + '</span></div>'
                }
                else if (rowobject.Status?.toLowerCase() == "waiting for sap posting" || rowobject.Status?.toLowerCase() == "sap in progress") {
                    return '<div class="task_status value_info "> <span class="color-blue">' + cellvalue + '</span></div>'
                }
            }
        },
        {
            name: 'CreatedBy',
            label: 'Requested By',
            width: 140,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'CreatedDate',
            label: 'Requested On',
            width: 140,
            resizable: true,
            ignoreCase: true,
        },
    ],

        $("#list").jqGrid({
            datatype: 'local',
            data: result,
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#list_pager',
            rowNum: 500,
            hoverrows: false,
            scroll: 1,
            beforeSelectRow: function () {
                return false;
            },
            gridComplete: function () {
                var objRows = $("#list tbody tr");
                var objHeader = $("#list tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
                var List = $("#list").jqGrid("getGridParam", "data");
                var approvedCount = 0;
                for (var i = 0; i < List.length; i++) {
                    if (List[i].Status?.toLowerCase() === "pending for approval" || List[i].Status?.toLowerCase() == "sap failed") {
                        approvedCount++;
                    }
                }
                if ($("#Role").val().toLowerCase() == "admin" || approvedCount == 0) {
                    $("#cbox").hide();
                    $("#RejectData").hide();
                    $("#ApproveData").hide();
                    jQuery("#list").jqGrid('hideCol', "Action");
                    jQuery("#list").jqGrid('hideCol', "CheckBox");

                } else {
                    $("#cbox").show();
                    $("#RejectData").show();
                    $("#ApproveData").show();
                    jQuery("#list").jqGrid('showCol', "Action");
                    jQuery("#list").jqGrid('showCol', "CheckBox");
                }
            }
        });

    $('#list').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-320px + 100vh)' });
    $('#list').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#list').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#list').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#list').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}
//$('.appvalue').on('change', function () {
//    myApprovalPendingData
//});
function GetInformation() {
    var projectId = $(".ProjectId_hidden").text();
    window.location.href = ROOT + "NewProjectInitiation/L2ApprovedProjectInfo" + '?q=' + Encrypt("ProjectId=" + projectId);
}

$(document).on("click", "#approvalHistory", function () {

    var ProjectId = $(".ProjectId_hidden").text();
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetBudgetHistory",
        dataType: "json",
        data: { ProjectId: ProjectId },
        success: function (result) {
            $('div#historypopup').modal('show');
            $(".project_id").text($(".ProjectId").text());
            var BaselineBudget = result.BudgetProjectData[0]?.ApprovedBaselinebudget != null ? parseInt(result.BudgetProjectData[0].ApprovedBaselinebudget) : 0;
            var AdditionalBudget = result.BudgetProjectData[0]?.ApprovedAdditionalbudget != null ? parseInt(result.BudgetProjectData[0].ApprovedAdditionalbudget) : 0;
            $(".ApprovedBaselineBudget").text(BaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
            $(".ApprovedAdditionalBudget").text(AdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))

            $(".TotalBudget").text((BaselineBudget + AdditionalBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 }));

            var count = 0;
            count == 0 ? $(".hideBar").hide() : $(".hideBar").show();

            createJQGridForHistory(result.BudgetHistory);
        }
    })

});
var historymodel = [
    {
        name: 'BudgetReqNo',
        label: 'Budget Request Number',
        width: 80,
        hidden: true,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'RequestedYear',
        label: 'Requested Year',
        width: 80,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CategoryName',
        label: 'Category',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 90,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<span class="${rowobject.BudgetTypeClass}">${rowobject.BudgetType}</span>`;
        }
    },
    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 80,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'RequestedAmount',
        label: 'Requested Amount(INR)',
        width: 80,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'ApprovedAmount',
        label: 'Approved Amount(INR)',
        width: 80,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null) {
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
        label: 'Action',
        width: 120,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<span class="${rowobject.StatusClass}">${rowobject.Status}</span>`;
        }
    },
    {
        name: 'Status',
        label: 'Action',
        width: 10,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true
    },
    {
        name: 'CreatedBy',
        label: 'Action By',
        width: 130,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'CreatedOn',
        label: 'Action On',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'History',
        label: 'History',
        width: 60,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        search:false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="grid-icons-group -justify-center"> <a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="showApprovalHistory('${rowobject.BudgetReqNo}', '${rowobject.RequestedYear}', '${rowobject.DepartmentName}', '${rowobject.CategoryName}', '${rowobject.BudgetType}', '${rowobject.Amount}')" 
        class="icon_color text-success btn_button" title="View">
        <i class="fas fa-eye"></i></a></div>`;
        }

    },
];
function createJQGridForHistory(result) {

    $.jgrid.gridUnload('#history_grid');
    $("#history_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: historymodel,
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

    $('#history_grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-300px + 100vh)' });
    $('#history_grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#history_grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#history_grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#history_grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#history_grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#history_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
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

$(document).on("click", "#GetDepartmentBudgets", function () {

    $("#ShowDepartmentList").modal("show");
    listForDepartmentBudget(DepartmentsBudget);

});
var colModel = [
    {
        name: 'Department',
        label: 'Department',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TotalBudget',
        label: 'Total Budget',
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { 'minimumFractionDigits': 0 });
                return Budget;
            }
            else if (cellvalue == 0) {
                return 0;
            }
            else {
                return ''
            }
        }
    },
];
function listForDepartmentBudget(result) {

    $.jgrid.gridUnload('#DepartmentBudget');

    $("#DepartmentBudget").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: colModel,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_DepartmentBudget',
        rowNum: 1000,
        scroll: 1,
        footerrow: true,

        gridComplete: function () {
            var objRows = $("#DepartmentBudget tbody tr");
            var objHeader = $("#DepartmentBudget tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#DepartmentBudget');
            var typecolumn = $grid.jqGrid('getCol', 'TotalBudget')
            var total = 0
            $.each(typecolumn, function (i, obj) {
                if (obj != '' && obj != null) {
                    total = total + parseFloat(obj.replace(/,/g, ''));
                }
            });
            $grid.jqGrid('footerData', 'set', { 'Department': "Total" });
            $grid.jqGrid('footerData', 'set', { 'TotalBudget': total.toFixed(2) });
        }
    });

    $('#DepartmentBudget').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-300px + 100vh)' });
    $('#DepartmentBudget').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#DepartmentBudget').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#DepartmentBudget').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#DepartmentBudget').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#DepartmentBudget').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#DepartmentBudget").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}

$(document).on("click", "#DepartmentExcelDownload", function () {
    var data = $('#DepartmentBudget').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#DepartmentBudget").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "DepartmentWiseBudget.xlsx",
            maxlength: 1000,
        });
    }
});

function BudgetAllocationRetry(BudgetReqNo) {
    confirm("Are you sure you want to retry?", function () {
        $.ajax({
            type: "POST",
            url: ROOT + "NewProjectInitiation/SendProjectCode",
            data: {
                ProjectCode: BudgetReqNo,
                PageType: "Approve"
            },
            success: function () {
                window.location.reload();
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    })
}
function SapFailedInfo(SAPLogNo) {
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetSAPFailedInfo",
        dataType: "JSON",
        async: false,
        data: {
            ReqNo: SAPLogNo,
            Page: "BudgetReq"
        },
        success: function (result) {
            if (result.Length != "") {
                $("#SAPFailedShow").modal('show');
                ListForFailedRemarks(result)
            }
        }
    })
}

var sapColModel = [
    {
        name: 'Response',
        label: 'Remarks',
        width: 180,
        resizable: true,
        ignoreCase: true,
    }
];
function ListForFailedRemarks(result) {

    $.jgrid.gridUnload('#SapFailedRemarks');

    $("#SapFailedRemarks").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: sapColModel,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_SapFailedRemarks',
        rowNum: 1000,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#SapFailedRemarks tbody tr");
            var objHeader = $("#SapFailedRemarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
    });

    $('#SapFailedRemarks').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-300px + 100vh)' });
    $('#SapFailedRemarks').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#SapFailedRemarks').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#SapFailedRemarks').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#SapFailedRemarks').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#SapFailedRemarks').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#SapFailedRemarks").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}


var historydatacomodels = [
    {
        name: 'BudgetReqNo',
        label: 'Budget Request Number',
        width: 80,
        hidden: true,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'RequestedAmount',
        label: 'Requested Budget (INR)',
        width: 90,
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
        name: 'ApprovedAmount',
        label: 'Approved Budget (INR)',
        width: 90,
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
        name: 'Status',
        label: 'Action',
        width: 120,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        // hidden:true,
        formatter: function (cellvalue, options, rowobject) {
            return `<span class="${rowobject.StatusClass}">${rowobject.Status}</span>`;
        }
    },
    {
        name: 'Status',
        label: 'Action',
        width: 10,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true
    },
    {
        name: 'CreatedBy',
        label: 'Action By',
        width: 130,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'CreatedOn',
        label: 'Action On',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    }
];
function createGridForHistory(result) {
    $.jgrid.gridUnload('#history_gridforapprovalinfo');
    $("#history_gridforapprovalinfo").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: historydatacomodels,
        loadonce: true,
        viewrecords: true,
        pager: '#history_pagerforapprovalinfo',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#history_gridforapprovalinfo tbody tr");
            var objHeader = $("#history_gridforapprovalinfo tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

    $('#history_gridforapprovalinfo').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#history_gridforapprovalinfo').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#history_gridforapprovalinfo').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#history_gridforapprovalinfo').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#history_gridforapprovalinfo').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#history_gridforapprovalinfo').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#history_gridforapprovalinfo").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
function showApprovalHistory(budgetReqNo, requestedyear, requesteddepartment, category, budgettype, budget) {
    var projectId = $("#ProjectId").val()
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetApprovalHistoryInfo",
        data: { projectId: projectId, budgetReqNo: budgetReqNo },
        success: function (result) {
            $('#approvalhistorypopup').modal('show');
            $('.RequestedYearForHistory').text(requestedyear)
            $('.RequestedDepartmentForHistory').text(requesteddepartment)
            $('.category').text(category)
            $('.BudgetTypeForHistory').text(budgettype)
            $('.BudgetForHistory').text(budget)
            createGridForHistory(result);
        }
    });
}
$('#LinkToBusinessInfo').on('click', function () {
    var projectId = $("#ProjectId").val()
    window.location.href = ROOT + "NewProjectInitiation/ProjectBusinessValueList?q=" + Encrypt('projectId=' + projectId);

});

var IngridentDocViewColModels = [
    {
        name: 'Action',
        label: 'Action',
        align: 'center',
        sortable: false,
        width: 40,
        formatter: function (cellvalue, options, rowobject) {
            var fileextension = rowobject.EnclosureName.split('.').pop().toLowerCase();

            if ((fileextension === "pdf" || fileextension === "jpg" || fileextension === "png" || fileextension === "jpeg")) {
                return '<div class="d-flex action_icons align-items-center justify-content-center">' +
                    '<a href="#" title="Download" class="" onclick="downloadoc(this)" data-project="' + rowobject.ProjectId + '" data-department="' + rowobject.DepartmentId + '" data-enclosure="' + rowobject.EnclosureName + '"><i class="fas fa-download color-download"></i></a>' +
                    '<a href="#" title="View" class="" onclick="viewdoc(this)" data-project="' + rowobject.ProjectId + '" data-department="' + rowobject.DepartmentId + '" data-enclosure="' + rowobject.EnclosureName + '"><i class="fas fa-eye color-eye"></i></a>' +
                    '</div >';
            }
            else {
                return '<div class="d-flex action_icons align-items-center justify-content-center">' +
                    '<a href="#" title="Download" class="" onclick="downloadoc(this)" data-project="' + rowobject.ProjectId + '" data-department="' + rowobject.DepartmentId + '" data-enclosure="' + rowobject.EnclosureName + '"><i class="fas fa-download color-download"></i></a>' +
                    '</div >';
            }


        }
    },
    {
        name: 'DocumentId',
        label: 'DocumentId',
        align: 'center',
        hidden: true
    },
    {
        name: 'DepartmentId',
        label: 'Department Id',
        align: 'center',
        hidden: true
    },
    {
        name: 'DepartmentName',
        label: 'Department Name',
        width: 65,
        sortable: false
    },
    {
        name: 'EnclosureName',
        label: 'Document Name',
        sortable: false
    },
    {
        name: 'CreatedBy',
        label: 'Uploaded By',
        width: 70,
        sortable: false
    },
    {
        name: 'CreatedDate',
        label: 'Uploaded On',
        width: 50,
        sortable: false
    }

];
function createFileModalGrid(result) {
    $.jgrid.gridUnload('#projectbudgetviewfiles');
    $("#projectbudgetviewfiles").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: IngridentDocViewColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected2',
        rowNum: 200,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#projectbudgetviewfiles tbody tr");
            var objHeader = $("#projectbudgetviewfiles tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }


    });

    $('#projectbudgetviewfiles').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#projectbudgetviewfiles').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#viewlist').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#projectbudgetviewfiles').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#projectbudgetviewfiles').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#projectbudgetviewfiles').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#projectbudgetviewfiles').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
}
function downloadoc(docdata) {

    var projectId = docdata.getAttribute("data-project");
    var departmentId = docdata.getAttribute("data-department");
    var enclosurename = docdata.getAttribute("data-enclosure");
    window.location.href = ROOT + "NewProjectInitiation/FileDownload?docName=" + enclosurename + "&&projectId=" + projectId + "&&departmentId=" + departmentId
}
function ViewDocumentsDataModal() {
    var projectId = $('#ProjectId').val()
    var projectName = $('.ProjectId').text()
    var BudgetType = $(".BudgetType").text() == "Baseline" ? 11 : 21;

    $.ajax({
        url: ROOT + 'NewProjectInitiation/GetFileDetails',
        type: 'GET',
        data: { ProjectId: projectId, BudgetType: BudgetType},
        success: function (result) {
            document_data_array = result;
            createFileModalGrid(result);

            $('.filedetails').html('View Documents - <span class="colordetails">' + projectName + '</span>');

            $("#ViewFileModal").modal("show");
        },
        error: function () {
            alert("An error occurred!");
        }
    });

}
function viewdoc(docdata) {
    var projectId = docdata.getAttribute("data-project");
    var departmentId = docdata.getAttribute("data-department");
    var enclosurename = docdata.getAttribute("data-enclosure");
    $.ajax({
        url: ROOT + 'NewProjectInitiation/FileView',
        data: {
            docName: enclosurename,
            projectId: projectId,
            departmentId: departmentId
        },
        type: 'GET',
        success: function (result) {
            var fileUrl = ROOT + result;
            window.open(fileUrl, '_blank');
        }
    });
}
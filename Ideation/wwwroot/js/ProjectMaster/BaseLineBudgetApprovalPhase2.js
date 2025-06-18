
$(document).ready(function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    $('[data-datepicker-year]').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
        todayHighlight: true,
        autoclose: true,
        startDate: 0,
        endDate: new Date(new Date().getFullYear(), 11, 31)
    });
    $('[data-datepicker-year]').datepicker('setDate', today);
    getProjectslist(1);
})

$('.data-singleselect').select2();
$('[data-singleselect]').select2();

var outMessage = $("#OutMessage").val();
if (outMessage != "" && outMessage != null && outMessage != undefined) {
    $('#AlertPopUp').modal('show');
    $("#PopAlertMessage").text(outMessage)
}

function getProjectslist(search) {
    var projectId = $("#ProjectId").val();
    var department = ""
    var category = ""
    var year = $(".year").val();
    if (search == 0) {
        department = $("#Department").val();
        category = $("#Category").val();

    }
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetL2ApprovalPendingDataForProject",
        dataType: "json",
        data: { ProjectId: projectId, Department: department, Category: category, year: year },
        success: function (result) {
            if (result.BudgetProjectData.length != 0) {
                $(".projectName").text(result.BudgetProjectData[0].ProductName)
                $(".ProjectId_hidden").text(result.BudgetProjectData[0].ProjectId)
                $(".template").text(result.BudgetProjectData[0].Template)
                $(".createdDate").text(result.BudgetProjectData[0].CreatedDate)
                var BaselineBudget = result.BudgetProjectData[0].ApprovedBaselinebudget != null ? parseInt(result.BudgetProjectData[0].ApprovedBaselinebudget) : 0;
                var AdditionalBudget = result.BudgetProjectData[0].ApprovedAdditionalbudget != null ? parseInt(result.BudgetProjectData[0].ApprovedAdditionalbudget) : 0;
                $(".ApprovedBaselineBudget").text(BaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
                $(".ApprovedAdditionalBudget").text(AdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
                $(".TotalBudget").text((BaselineBudget + AdditionalBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 }));

            }
            if (search == 1) {
                $("option").remove(".CategoryOption");
                $("option").remove(".DepartmentOption");
                var addedCategories = [];
                var addedDepartments = [];
                $.each(result.BudgetPlan, function (i, obj) {
                    if (!addedCategories.includes(obj.CategoryId)) {
                        var categoryList = '<option class="CategoryOption" value="' + obj.CategoryId + '">' + obj.Category + '</option>';
                        $(".CategoryValue").append(categoryList);
                        addedCategories.push(obj.CategoryId);
                    }
                })
                $.each(result.BudgetPlan, function (i, obj) {

                    if (!addedDepartments.includes(obj.DepartmentName)) {
                        var DeptList = '<option class="DepartmentOption" value="' + obj.DepartmentName + '">' + obj.DepartmentName + '</option>';
                        $(".DepartmentValue").append(DeptList);
                        addedDepartments.push(obj.DepartmentName);
                    }
                })
            }
            $("#list").jqGrid("clearGridData");
            $("#list").jqGrid('setGridParam', { data: result.BudgetPlan });
            $("#list").trigger('reloadGrid', [{ page: 1 }]);
        }
    })

}


colmodels = [
    {
        name: 'CheckBox',
        label: '<input type="checkbox" id="cbox" onclick="checkBox(event)"/>',
        editable: true,
        index: 'Check_Box',
        width: 60,
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
            if (rowObject.BaselineApprovalStatus == "L2 Approval Pending" || rowObject.AdditionalBudgetApprovalStatus == "L2 Approval Pending") {
                var uniqueId = 'chk_' + options.rowId;
                var checkbox = '<input type="checkbox" id="' + uniqueId + '" class="checkbox" />';
                return checkbox;
            }
            else {
                return ''
            }
        }
    },

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        search: false,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.BaselineApprovalStatus == "L2 Approval Pending" || rowobject.AdditionalBudgetApprovalStatus == "L2 Approval Pending") {
                return '<div class="d-flex action_icons align-items-center justify-content-between" title="">' +
                    '<a onclick=SingleApprove(this) class="pl-1" title="Approve" > <i class="fas fa-thumbs-up text-success"></i></a> '
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'BudgetYear',
        label: 'Requested Year',
        width: 120,
        classes: "BudgetYear",
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 180,
        resizable: true,
        ignoreCase: true,
        classes: "Dept",
    },
    {
        name: 'Category',
        label: 'Category',
        width: 180,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'CategoryId',
        label: 'CategoryId',
        width: 180,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        classes: "category"
    },
    {
        name: 'AppBaselineBudget',
        label: 'Pending Baseline Budget (INR)',
        width: 140,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.BaselineApprovalStatus == "L2 Approval Pending" || rowobject.BaselineApprovalStatus == "L1 Approval Pending") {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return '<a class="task_status value_info"> <span class="text-warning baslinepending">' + Budget + '</span></a>'
            }
            else {
                return ''
            }
        }

    },
    {
        name: 'BaselineApprovalStatus',
        label: 'Baseline Budget Approval Status',
        width: 180,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.BaselineApprovalStatus == "L2 Approval Pending" || rowobject.BaselineApprovalStatus == "L1 Approval Pending") {
                return '<a class="task_status value_info "> <span class="text-warning baselinestatus">' + cellvalue + '</span></a>'
            }
            else if (rowobject.BaselineApprovalStatus == "L2 Approved" || rowobject.BaselineApprovalStatus == "SAP Posting Sucessfully") {
                return '<a class="task_status value_info "> <span class="text-success baselinestatus">' + cellvalue + '</span></a>'
            }
            else if (rowobject.BaselineApprovalStatus == "Waiting for SAP Posting" || rowobject.BaselineApprovalStatus == "SAP In Progress")
            {
                return '<a class="task_status value_info "> <span class="text-warning baselinestatus">' + cellvalue + '</span></a>'
            }
            else if (rowobject.BaselineApprovalStatus == "SAP Failed") {
                return '<a class="task_status value_info "> <span class="text-danger baselinestatus">' + cellvalue + '</span></a>'
            }
            else {
                return cellvalue;
            }
        }
    },

    {
        name: 'AppAdditionalBudget',
        label: 'Pending Additional Budget (INR)',
        width: 140,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.AdditionalBudgetApprovalStatus == "L2 Approval Pending" || rowobject.AdditionalBudgetApprovalStatus == "L1 Approval Pending") {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                return '<a class="task_status value_info"> <span class="text-warning additionalpending">' + Budget + '</span></a>'
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'AdditionalBudgetApprovalStatus',
        label: 'Additional Budget Approval Status',
        width: 180,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.AdditionalBudgetApprovalStatus == "L2 Approval Pending") {
                return '<a class="task_status value_info "> <span class="text-warning additionalstatus">' + cellvalue + '</span></a>'
            }
            else if (rowobject.AdditionalBudgetApprovalStatus == "L2 Approved" || rowobject.AdditionalBudgetApprovalStatus == "SAP Posting Sucessfully") {
                return '<a class="task_status value_info "> <span class="text-success additionalstatus">' + cellvalue + '</span></a>'
            }
            else if (rowobject.AdditionalBudgetApprovalStatus == "L1 Approval Pending") {
                return '<a class="task_status value_info "> <span class="text-warning additionalstatus">' + cellvalue + '</span></a>'
            }
            else if (rowobject.AdditionalBudgetApprovalStatus == "Waiting for SAP Posting" || rowobject.AdditionalBudgetApprovalStatus == "SAP In Progress") {
                return '<a class="task_status value_info "> <span class="text-warning additionalstatus">' + cellvalue + '</span></a>'
            }
            else if (rowobject.AdditionalBudgetApprovalStatus == "") {
                return ' <span class="text-warning">' + cellvalue + '</span>'
            }
            else if (rowobject.AdditionalBudgetApprovalStatus == "SAP Failed") {
                return '<a class="task_status value_info "> <span class="text-danger additionalstatus">' + cellvalue + '</span></a>'
            }
            else {
                return rowobject.AdditionalBudgetApprovalStatus 
            }

        }
    },
],

    $("#list").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#list_pager',
        rowNum: 1000,
        scroll: 1,

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
            var pendingcount = 0;
            for (var i = 0; i < List.length; i++) {
                if (List[i].AdditionalBudgetApprovalStatus === "L2 Approval Pending" || List[i].BaselineApprovalStatus === "L2 Approval Pending")
                {
                    approvedCount++;
                }
            }
            if (approvedCount > 0) {
                $("#cbox").show();
                $("#ApproveData").show();
                jQuery("#list").jqGrid('showCol', "Action");
                jQuery("#list").jqGrid('showCol', "CheckBox");
            }
            else {
                $("#cbox").hide();
                $("#ApproveData").hide();
                jQuery("#list").jqGrid('hideCol', "Action");
                jQuery("#list").jqGrid('hideCol', "CheckBox");               
            }

        }
    });
$("#list").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 258) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
}

$("#SearchData").on("click", function () {
    getProjectslist(0);
});

function checkBox(e) {
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

function SingleApprove(obj) {
    var flag = true;
    var clossestTableRow = $(obj).closest("tr");
    var DepartmentName = $(clossestTableRow).find("td.Dept").text();
    var Category = $(clossestTableRow).find("td.category").text();
    var BudgetYear = $(clossestTableRow).find("td.BudgetYear").text();
    var BaselinePending = $(clossestTableRow).find("td").find('.baslinepending').text();
    var BaselineStatus = $(clossestTableRow).find("td").find('.baselinestatus').text();
    var AdditionalPending = $(clossestTableRow).find("td").find('.additionalpending').text();
    var AdditionalStatus = $(clossestTableRow).find("td").find('.additionalstatus').text();
    var ProjectId = $(".ProjectId_hidden").text();
    var selecteddata = [];
    var totalPendingValue = 0;
    if (BaselineStatus === "L2 Approval Pending") {
        totalPendingValue += parseFloat(BaselinePending.replace(/,/g, ''));
    }
    if (AdditionalStatus === "L2 Approval Pending") {
        totalPendingValue += parseFloat(AdditionalPending.replace(/,/g, ''));
    }
    selecteddata = [{
        ProjectId: ProjectId,
        CategoryId: Category,
        DepartmentName: DepartmentName,
        BaselinePending: BaselinePending,
        BaselineStatus: BaselineStatus,
        AdditionalPending: AdditionalPending,
        AdditionalStatus: AdditionalStatus,
        RequestedYear: BudgetYear
    }]
    if (flag) {
        $('#Approve').modal('show');
        $(".modaltitle").text("Approve Confirmation");
        var TotalBudget = $(".TotalBudget").text();
        var projectid = $(".projectName").text();

        if (TotalBudget != 0) {
            $(".ProjctAndBudget").html(`Total of <b>${TotalBudget}</b> INR is allocated to <b>${projectid} </b>`);
            $(".modalmsg").html(`Are you sure you want to allocate an additional budget of INR <b>${totalPendingValue.toLocaleString('en-IN')}</b>?`);
        }
        else {
            $(".modalmsg").html(`Are you sure you want to allocate an budget of INR <b>${totalPendingValue.toLocaleString("en-IN")}</b>?`);
        }
        $('#ByClick_OK').off('click').on('click', function () {
            $(document).find($('#ByClick_OK')).attr('disabled', true);
            var flag1 = true;
            var Approveremarks = $(".ApprovalRemarks").val().trim();
            if (Approveremarks == "") {
                flag1 = false;
                $("#Error_ApprovalRemarks").show();
                $(this).attr('disabled', false);
            }
            else { flag1 = true; }
            if (flag1) {
                $('#ProjectDataToSave').val(JSON.stringify(selecteddata));
                $("#Remarks").val(Approveremarks);
                document.getElementById('L2Approve_Save').submit();
            }
        });
    }
}

var flagVal = true;
$("#ApproveData").off("click").on("click", function () {
    flagVal = true;
    var myApprovalPendingData = [];
    var selectedYear = [];
    $("#list tr").each(function () {
        if ($(this).find('.checkbox').prop('checked')) {
            var rowData = getchecckedRowData(this);
            selectedYear.push(rowData.RequestedYear);
            myApprovalPendingData.push(rowData);
        }
    });
    var uniqSelectedYear = [...new Set(selectedYear)];
    if (uniqSelectedYear.length > 1 && myApprovalPendingData.length > 0) {
        flagVal = false
        alert('Please select the budget requests of either ' + uniqSelectedYear.join(' / ') + ' to allocate.')
    }

    if (myApprovalPendingData == [] || myApprovalPendingData.length == 0) {
        flagVal = false
        alert('Please select atleast one data to approve')
    }
    if (flagVal) {
        $('#Approve').modal('show');
        $(".modaltitle").text("Approve Confirmation");

        var totalPendingValue = 0;
        myApprovalPendingData.forEach(function (item) {
            if (item.BaselineStatus === "L2 Approval Pending") {
                totalPendingValue += parseFloat(item.BaselinePending.replace(/,/g, ''));
            }
            if (item.AdditionalStatus === "L2 Approval Pending") {
                totalPendingValue += parseFloat(item.AdditionalPending.replace(/,/g, ''));
            }
        });
        var TotalBudget = $(".TotalBudget").text();
        var projectid = $(".projectName").text();

        if (TotalBudget != 0) {
            $(".ProjctAndBudget").html(`Total of <b>${TotalBudget}</b> INR is allocated to <b>${projectid} </b>`);
            $(".modalmsg").html(`Are you sure you want to allocate an additional budget of INR <b>${totalPendingValue.toLocaleString('en-IN')}</b>?`);

        }
        else {
            $(".modalmsg").html(`Are you sure you want to allocate an budget of INR <b>${totalPendingValue.toLocaleString('en-IN')}</b>?`);
        }
        $('#ByClick_OK').off('click').on('click', function () {
            $(document).find($('#ByClick_OK')).attr('disabled', true);
            var flag1 = true;
            var Approveremarks = $(".ApprovalRemarks").val().trim();
            if (Approveremarks == "") {
                flag1 = false;
                $("#Error_ApprovalRemarks").show();
                $(this).attr('disabled', false);
            }
            else { flag1 = true; }
            if (flag1) {
                $('#ProjectDataToSave').val(JSON.stringify(myApprovalPendingData));
                $("#Remarks").val(Approveremarks);
                document.getElementById('L2Approve_Save').submit();
            }
        });
    }
});

function getchecckedRowData(obj) {
    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#list');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");
    var RequestedYear = grd.jqGrid('getCell', rowid, 'BudgetYear');
    var DepartmentName = grd.jqGrid('getCell', rowid, 'DepartmentName');
    var Category = grd.jqGrid('getCell', rowid, 'CategoryId');
    var BaselinePending = $(clossestTableRow).find("td").find('.baslinepending').text();
    var BaselineStatus = $(clossestTableRow).find("td").find('.baselinestatus').text();
    var AdditionalPending = $(clossestTableRow).find("td").find('.additionalpending').text();
    var AdditionalStatus = $(clossestTableRow).find("td").find('.additionalstatus').text();
    var ProjectId = $(".ProjectId_hidden").text();
    var arrayitem = {};
    var arrayitem = {
        ProjectId: ProjectId,
        CategoryId: Category,
        DepartmentName: DepartmentName,
        BaselinePending: BaselinePending,
        BaselineStatus: BaselineStatus,
        AdditionalPending: AdditionalPending,
        AdditionalStatus: AdditionalStatus,
        RequestedYear: RequestedYear,
    };

    return arrayitem;
}

function showAlertMessage(message, alertClass) {
    $('#Approve').modal('hide');
    if (alertClass == "alert-success") {
        $('#alertText').text(message);
        $('#alertMessage').removeClass().addClass('alert ' + alertClass);
        $('#alertMessage').show();
        setTimeout(function () {
            $('#alertMessage').hide();
        }, 6000);
    }
    else if (alertClass == "alert-danger") {
        $('#AlertPopUp').modal('show');
        $("#PopAlertMessage").text(message)
    }
    getProjectslist(1);
}

function GetInformation() {
    var projectId = $(".ProjectId_hidden").text();
    window.location.href = ROOT + "ProjectMaster/L2ApprovedProjectInfo" + '?q=' + Encrypt("ProjectId=" + projectId);
}
$(window).on('hidden.bs.modal', function () {
    $(".cancelThisData").val("");
    $("#Error_ApprovalRemarks").hide();
});
var checkedData = [];
var LenghtOfProjects = 0;
var BaselinegridData = [];
var BaselineUpdatedgridData = [];
var fromYear = "";
var toYear = "";
var categoryFound = false;
var AdditionalBudgetData = [];
var issueId_Dept = "";
var issueId_Year = '';
var latestrowId;
var latestrow;
var count = 0;
var document_data_array = [];

$(document).ready(function () {

    getProjectdata();
    $('[data-singleselect]').select2();
    $('.data-singleselect').select2();
    $('.data-singleselect').select2({
        dropdownParent: $('#add_project')
    });

});

function getProjectdata() {

    $(".AdditionalShow").hide();
    $(".BasleineShow").show();

    var RoleName = $("#Role").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetProjectBaselineBudget",
        dataType: "json",
        data: {
            ProjectId: $("#ProjectId").val(),
            FromDate: $("#FromDate").val(),
            ToDate: $("#ToDate").val()
        },
        success: function (result) {
            LenghtOfProjects = result.BudgetPlan.length;
            if (result.ProjectDates.length > 0) {
                $("#FromDate").datepicker('update', result.ProjectDates[0].ProjectStartDate);
                $("#ToDate").datepicker('update', result.ProjectDates[0].ProjectEndDate);
                fromYear = result.ProjectDates[0].ProjectStartDate;
                toYear = result.ProjectDates[0].ProjectEndDate;
            }
            BaselinegridData = result.BudgetPlan;
            BaselineUpdatedgridData = result.BudgetPlan;

            $("#SubmitDetails").hide();
            $("#SaveDetails").hide();
            if (RoleName != "Admin") {
                for (var i = 0; i < result.BudgetPlan.length; i++) {
                    if ((result.BudgetPlan[i].Status == "Rejected" || result.BudgetPlan[i].Status == "" || result.BudgetPlan[i].Status == null) && result.BudgetPlan[i].IsBaselineNotrequired == "False") {
                        $("#SubmitDetails").show();
                        $("#SaveDetails").show();

                    }
                }
            }

            $(".projectid").text(result.ProjectDates[0]?.ProductName)
            $("#ProjectId").text(result.ProjectDates[0]?.ProjectId)

            $(".startDate").text(result.ProjectDates[0]?.StartDate)
            $(".endDate").text(result.ProjectDates[0]?.EndDate)

            var AppBaselineBudget = result.ProjectDates[0]?.AppBaselineBudget != null ? parseInt(result.ProjectDates[0]?.AppBaselineBudget) : 0;
            var AppAdditionalBudget = result.ProjectDates[0]?.AppAdditionalBudget != null ? parseInt(result.ProjectDates[0]?.AppAdditionalBudget) : 0;
            var ReqBaselineBudget = result.ProjectDates[0]?.ReqBaselineBudget != null ? parseInt(result.ProjectDates[0]?.ReqBaselineBudget) : 0;
            var ReqAdditionalBudget = result.ProjectDates[0]?.ReqAdditionalBudget != null ? parseInt(result.ProjectDates[0]?.ReqAdditionalBudget) : 0;

            count = result.ProjectDates[0]?.CountOfSavedReq;
            var requestedBaselineBudget = result.ProjectDates[0]?.AppBaselineBudget;
            var requestedAdditionalBudget = result.ProjectDates[0]?.AppAdditionalBudget;
            var baselineNumber = parseFloat(requestedBaselineBudget) || 0;
            var additionalNumber = parseFloat(requestedAdditionalBudget) || 0;
            var TotalBudget = baselineNumber + additionalNumber;

            $(".ApprovedBaselineBudget").text(AppBaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
            $(".ApprovedAdditionalBudget").text(AppAdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
            $(".RequestedBaselineBudget").text(ReqBaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
            $(".RequestedAdditionalBudget").text(ReqAdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
            $('.TotalBudget').text(TotalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))

            createJQGrid(result.BudgetPlan);
        }
    });
}
function arrtSetting_RequestedYear(rowId, val, rawObject) {

    var result;
    var Year = rawObject.Year;
    var DepartmentId = rawObject.DepartmentId;
    var Department = rawObject.DepartmentName;
    var Year_Department = Year + '_' + DepartmentId;

    if (issueId_Year === '' || issueId_Year != Year_Department) {
        var issueDataFilter = BaselinegridData.filter(function (obj) {
            return obj.Year == Year && obj.DepartmentId == DepartmentId;
        });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    } else {
        result = ' style="display:none"';
    }
    issueId_Year = Year_Department;
    return result;
}
function arrtSetting_Department(rowId, val, rawObject) {
    var result;
    var Id = rawObject.DepartmentId;
    var Year = rawObject.Year;
    var Department = rawObject.DepartmentName;
    var Year_Department = Id + '_' + Year;

    if (issueId_Dept === '' || issueId_Dept != Year_Department) {
        var issueDataFilter = BaselinegridData.filter(function (obj) {
            return obj.DepartmentId === Id && obj.Year == Year
        });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    } else {
        result = ' style="display:none"';
    }
    issueId_Dept = Year_Department;
    return result;
}
function applyRowspan() {
    issueId_Dept = '';
    issueId_Year = '';
}
function onlyNumbers(evt) {
    var e = event || evt;
    var charCode = e.which || e.keyCode;
    if (evt != '') {
        var currentValue = evt.value;
    }
    if (charCode == 46 && (currentValue.indexOf(".") !== -1 || currentValue.length === 0)) {
        return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function showAlertMessage(message, alertClass, type) {

    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 5000);

    if (type == 21) {
        $(".AdditionalBudget").trigger("click");
    }
    else {
        $(".BaselineBudget").trigger("click");
    }

}
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
function validateFilteredData(new_data) {

    var grid_filtered_data = new_data;
    var colModel = $("#ProjectBasedOnCategory").jqGrid('getGridParam', 'colModel');
    var filteredColNames = colModel.filter(function (col) {
        return col.search === true;
    }).map(function (col) {
        return col.name;
    });

    $.each(filteredColNames, function (i, obj) {
        var value = $(".ui-search-input").closest('td').find("#gs_" + obj).val();
        if (!(value === "") || (value === null) || typeof (value) === "undefined") {
            grid_filtered_data = grid_filtered_data.filter(function (data) {
                return data[obj]?.toLowerCase().includes(value.toLowerCase());
            })
        }
    });

    return grid_filtered_data.length;
}
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
function CancelRequest(obj, from = "") {

    var rowId = $(obj).closest('tr').attr('id');
    var prjId = $("#ProjectId").text().trim();

    if (from == "") {
        debugger
        var budgetReqNo = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'BudgetReqNo');
        var RequestedAmt = $("#ProjectBasedOnCategory").find('tr[id="' + rowId + '"]').find(".budget").val();
        var year = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'Year');
        var from = 11;
    }
    else {
        var year = parseInt($("#AdditionalGrid").jqGrid('getCell', rowId, 'BudgetYear'));
        var RequestedAmt = $("#AdditionalGrid").find('tr[id="' + rowId + '"]').find(".budget").val();
        var budgetReqNo = $("#AdditionalGrid").jqGrid('getCell', rowId, 'BudgetReqNo');
        var from = 21;
    }

    handelConfirmRemarksPopup("Are you sure you want to cancel the request",
        function () {

            var remarks = $("#with-remarks-data").val().trim();
            if (remarks != "" && remarks != null && remarks != undefined) {
                $("#with-remarks-data").siblings('span').addClass('hide');
            }
            else {
                $("#with-remarks-data").siblings('span').removeClass('hide');
                return false;
            }

            $("#save-with-remarks-popup").modal("hide");

            $.ajax({
                type: "POST",
                url: ROOT + "NewProjectInitiation/AlterBudgetRequest",
                dataType: "JSON",
                data: {
                    ProjectId: prjId,
                    LatestYear: 0,
                    PreviousYear: year,
                    EditedAmt: 0,
                    From: from,
                    Type: 2,// Cancel budget
                    BudgetReqNo: budgetReqNo,
                    FromStage: 10,
                    Action: "Cancel",
                    Remarks: remarks,
                    RequestedAmount: RequestedAmt
                },
                success: function (result) {

                    responseMsgClass = result.MessageClass;
                    responseMsg = result.Message;

                    showAlertMessage(responseMsg, responseMsgClass, from);
                },
                error: function (xhr, status, error) {
                    alert("Error Occured: " + error);
                }
            });

        },
    );

}
function EditRequest(obj, from = "") {

    var rowId = $(obj).closest('tr').attr('id');
    var row, amt;

    if (from == "") {
        $("#SubmitDetails").hide();
        $("#SaveDetails").hide();
        row = $("#ProjectBasedOnCategory").find('tr[id="' + rowId + '"]');
        amt = parseFloat(row.find(".budget").val().replace(/,/g, '')) || 0;

        var dept = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'DepartmentId');
        $("#ProjectBasedOnCategory").find('tr').each(function (i, obj) {
            if ($(obj).find(".deptId").html() == dept) {
                latestrowId = obj.id;
                return false;
            }
        });
        latestrow = $("#ProjectBasedOnCategory").find('tr[id="' + latestrowId + '"]');
    }
    else {
        $("#SaveAdditionalRequest").hide();
        amt = parseFloat($("#AdditionalGrid").find('tr[id="' + rowId + '"]').find(".budget").val().replace(/,/g, '')) || 0;
        row = $("#AdditionalGrid").find('tr[id="' + rowId + '"]');
    }

    row.find(".before-edit-budget").addClass("hide");
    row.find(".after-edit-budget").removeClass("hide");
    row.find(".budget").val(parseInt(amt));
    row.find(".budget").prop('disabled', false);

}
function SaveEdit(obj, from = "") {

    var rowId = $(obj).closest('tr').attr('id');
    var prjId = $("#ProjectId").text().trim();

    if (from == "") {
        var departmentId = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'DepartmentId');
        var categoryId = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'CategoryId');
        var budgetReqNo = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'BudgetReqNo');
        var year = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'Year');
        var amt = $("#ProjectBasedOnCategory").find('tr[id="' + rowId + '"]').find(".budget").val();
        var from = 11;
    }
    else {
        var departmentId = $("#AdditionalGrid").jqGrid('getCell', rowId, 'DepartmentId');
        var categoryId = $("#AdditionalGrid").jqGrid('getCell', rowId, 'CategoryId');
        var budgetReqNo = $("#AdditionalGrid").jqGrid('getCell', rowId, 'BudgetReqNo');
        var year = parseInt($("#AdditionalGrid").jqGrid('getCell', rowId, 'BudgetYear'));
        var amt = $("#AdditionalGrid").find('tr[id="' + rowId + '"]').find(".budget").val();
        var from = 21;
    }

    if (amt < 0) {
        //$("#" + rowId + "").find('.edit-zero-msg').removeClass('hide').delay(5000).queue(
        //    function (next) {
        //        $(this).addClass('hide');
        //        next();
        //    }
        //);
        alert("Please enter the amount")
        return false;
    }


    handelConfirmRemarksPopup("Are you sure do you save the updated amount?",
        function () {

            var remarks = $("#with-remarks-data").val().trim();
            if (remarks != "" && remarks != null && remarks != undefined) {
                $("#with-remarks-data").siblings('span').addClass('hide');
            }
            else {
                $("#with-remarks-data").siblings('span').removeClass('hide');
                return false;
            }

            $("#save-with-remarks-popup").modal("hide");

            $.ajax({
                type: "POST",
                url: ROOT + "NewProjectInitiation/AlterBudgetRequest",
                dataType: "JSON",
                data: {
                    ProjectId: prjId,
                    EditedAmt: amt,
                    Type: 1, //Edit budget
                    From: from,
                    BudgetReqNo: budgetReqNo,
                    Action: "Edit",
                    Remarks: remarks,
                    RequestedAmount: amt
                },
                success: function (result) {

                    responseMsgClass = result.MessageClass;
                    responseMsg = result.Message;

                    showAlertMessage(responseMsg, responseMsgClass, from);
                },
                error: function (xhr, status, error) {
                    alert("Error Occured: " + error);
                }
            });

        },
    );

}
function CancelEdit(obj, amt, from = "") {

    $("#SaveAdditionalRequest").show();
    $("#SubmitDetails").show();
    $("#SaveDetails").show();

    var rowId = $(obj).closest('tr').attr('id');
    if (from == "") {
        var row = $("#ProjectBasedOnCategory").find('tr[id="' + rowId + '"]');
    }
    else {
        var row = $("#AdditionalGrid").find('tr[id="' + rowId + '"]');
    }

    if (from != "add" && count == 0) {
        latestrow.find(".before-edit-budget-year").removeClass("hide");
        latestrow.find(".after-edit-budget-year").addClass("hide");
    }

    row.find(".before-edit-budget").removeClass("hide");
    row.find(".after-edit-budget").addClass("hide");

    row.find(".budget").val(parseInt(amt).toLocaleString('en-IN', { maximumFractionDigits: 0 }));
    row.find(".budget").prop('disabled', true);

}

var colmodels1 = [
    {
        name: 'BudgetReqNo',
        label: 'BudgetReq No',
        width: 50,
        hidden: true,
        classes: 'BudgetReqNo',
    },
    {
        name: 'Action',
        label: 'Action',
        width: 50,
        resizable: true,
        ignoreCase: true,
        search: false,
        exportcol: false,
        align: "center",
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            var role = $("#Role").val()
            if (role.trim().toLowerCase() != 'admin') {
                if (rowobject.ReqBaselineBudget >= 0 && rowobject.StatusId == 10) {
                    return `<div class="action_icons grid-icons-group -justify-center before-edit-budget">
                            <a href="#" onclick="EditRequest(this)">
                                <i class="fas fa-pen color-info"></i>
                            </a>
                            <a href="#" onclick="CancelRequest(this)">
                                <i class="fas fa-times-circle color-history" style="font-size:14px"></i>
                            </a>
                        </div>

                        <div class="action_icons grid-icons-group -justify-center after-edit-budget hide">
                            <a href="#"  onclick="SaveEdit(this)">
                                <i class="fas fa-save color-file"></i>
                            </a>
                            <a href="#" onclick="CancelEdit(this,${rowobject.ReqBaselineBudget})">
                                <i class="btn-close"></i>
                            </a>
                        </div >`;
                }
                else {
                    return "";
                }
            }
            else {
                return "";
            }
        }
    },
    {
        name: 'Year',
        label: 'Requested Year',
        width: 100,
        cellattr: arrtSetting_RequestedYear,
        classes: 'Yearcode',
        sortable: false,
    },
    //{
    //    name: 'Year',
    //    label: 'Requested Year',
    //    width: 100,
    //    cellattr: arrtSetting_RequestedYear,
    //    classes: 'Yearcode',
    //    sortable: false,
    //    formatter: function (cellvalue, options, rowobject) {

    //        if (count == 0) {
    //            if (cellvalue != "" && cellvalue != null && cellvalue != undefined && rowobject.Yearfreez != 0
    //                && rowobject.Yearfreez != null && rowobject.Yearfreez != "") {
    //                var YearOption = "";
    //                var currentYear = new Date().getFullYear();
    //                if (toYear > currentYear && fromYear >= currentYear) {
    //                    if (fromYear == cellvalue) {
    //                        YearOption += '<option value="' + fromYear + '" selected>' + fromYear + '</option>';
    //                    }
    //                    else {
    //                        YearOption += '<option value="' + fromYear + '">' + fromYear + '</option>';
    //                    }
    //                }
    //                else {
    //                    for (var year = fromYear; year <= currentYear + 1; year++) {
    //                        if (year == cellvalue) {
    //                            YearOption += '<option value="' + year + '" selected>' + year + '</option>';
    //                        }
    //                        else {
    //                            YearOption += '<option value="' + year + '">' + year + '</option>';
    //                        }
    //                    }
    //                }
    //                return `<span class="before-edit-budget-year">${cellvalue}</span>
    //                        <div class="d-flex action_icons align-items-center single-select_dropdown after-edit-budget-year hide">
    //                              <select title="" class="form-control appearence RequestYear `+ rowobject.DepartmentId + ` data-singleselect"> 
    //                              ` + YearOption + `</select>
    //                        </div>`;
    //            }
    //            else if (cellvalue != "" && cellvalue != null && cellvalue != undefined &&
    //                (rowobject.StatusId == null || rowobject.StatusId == "" || rowobject.Yearfreez == 0)) {
    //                var YearOption = "";
    //                var currentYear = new Date().getFullYear();
    //                if (toYear >= currentYear && fromYear >= currentYear) {
    //                    if (fromYear == cellvalue) {
    //                        YearOption += '<option value="' + fromYear + '" selected>' + fromYear + '</option>';
    //                    }
    //                    else {
    //                        YearOption += '<option value="' + fromYear + '">' + fromYear + '</option>';
    //                    }
    //                }
    //                else {
    //                    for (var year = fromYear; year <= currentYear + 1; year++) {
    //                        if (year == cellvalue) {
    //                            YearOption += '<option value="' + year + '" selected>' + year + '</option>';
    //                        }
    //                        else {
    //                            YearOption += '<option value="' + year + '">' + year + '</option>';
    //                        }
    //                    }
    //                }
    //                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
    //                          <select title="" class="form-control appearence RequestYear `+ rowobject.DepartmentId + ` data-singleselect"> 
    //                          <option value="" >Select</option>` + YearOption + `</select>
    //                        </div>
    //                         <span class="error-color error_year e_`+ rowobject.DepartmentId + ` hide" >Please select year</span>`;
    //            }
    //            else {
    //                var YearOption = "";
    //                var currentYear = new Date().getFullYear();
    //                if (toYear >= currentYear && fromYear >= currentYear) {
    //                    YearOption += '<option value="' + fromYear + '">' + fromYear + '</option>';
    //                }
    //                else {
    //                    for (var year = fromYear; year <= currentYear + 1; year++) {
    //                        YearOption += '<option value="' + year + '">' + year + '</option>';
    //                    }
    //                }
    //                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
    //                          <select title="" class="form-control appearence RequestYear `+ rowobject.DepartmentId + ` data-singleselect"> 
    //                          <option value="" >Select</option>` + YearOption + `</select>
    //                        </div>
    //                         <span class="error-color error_year e_`+ rowobject.DepartmentId + ` hide" >Please select year</span>`;
    //            }
    //        }
    //        else {
    //            return `<span class="year-value">${cellvalue}</span>`
    //        }

    //    }
    //},
    {
        name: 'DepartmentId',
        label: 'Department',
        width: 180,
        hidden: true,
        classes: 'deptId',
        exportcol: false,
        sortable: false
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 120,
        cellattr: arrtSetting_Department,
        classes: 'deptcode',
        sortable: false
    },
    {
        name: 'Category',
        label: 'Category',
        width: 180,
        sortable: false

    },
    {
        name: 'CategoryId',
        label: 'CategoryId',
        width: 180,
        hidden: true,
        sortable: false

    },
    {
        name: 'ReqBaselineBudget',
        label: 'Req Baseline Budget (INR)',
        width: 140,
        classes: "Requestclass",
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            var index = checkedData.findIndex(s => s.DepartmentName == rowobject.DepartmentName && s.CategoryId == rowobject.CategoryId);
            var Reqbud;

            if (index >= 0) {
                Reqbud = checkedData[index].RequestedBudget == "" ? "" : checkedData[index].RequestedBudget;
            }
            else {
                Reqbud = rowobject.ReqBaselineBudget == "" ? "" : rowobject.ReqBaselineBudget;
            }

            if ((rowobject.Status == "" || rowobject.Status == null || rowobject.Status == undefined) && (rowobject.IsBaselineNotrequired == "False")) {
                return '<div class="action_icons input_budget -items-center" title="">' +
                    '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" onpaste="handlePaste(event)" type="text" class="form-control budget" value="' + Reqbud + '" /><span class="text-danger hide" > Please enter Budget</span >' +
                    '</div>';
            }
            else if (rowobject.IsBaselineNotrequired == "True") {
                var Budget = "";
                if (Reqbud != "" && Reqbud != undefined && Reqbud != null) {
                    Budget = parseInt(Reqbud).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                }
                return '<div class="action_icons input_budget -items-center" title="">' +
                    '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" onpaste="handlePaste(event)" type="text" class="form-control budget" value="' + Budget + '" disabled /><span class="text-danger hide" > Please enter Budget</span >' +
                    '</div>';
            }
            else if (rowobject.StatusId == "30" || rowobject.StatusId == "100") {
                return '<div class="action_icons input_budget -items-center" title="">' +
                    '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" onpaste="handlePaste(event)" type="text" class="form-control budget" value="" /><span class="text-danger hide" > Please enter Budget</span >' +
                    '</div>';
            }
            else {
                var Budget = "";
                if (Reqbud != "" && Reqbud != undefined && Reqbud != null) {
                    Budget = parseInt(Reqbud).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                }
                return '<div class="action_icons input_budget -items-center" title="">' +
                    '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" onpaste="handlePaste(event)" type="text" class="form-control budget" value="' + Budget + '" disabled /><span class="text-danger hide" > Please enter Budget</span ><span class="text-danger hide edit-zero-msg text-wrap">  Please enter the amount greater than 0</span >' +
                    '</div>';
            }

        }
    },
    {
        name: 'AppBaselineBudget',
        label: 'Approved Baseline Budget (INR)',
        width: 170,
        classes: "text-right",
        sortable: false,
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
        label: 'Baseline Budget Status',
        width: 120,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.ReqBaselineBudget == "" || rowobject.ReqBaselineBudget == null) {
                return "";
            }
            else if (rowobject.StatusId == "10") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else if (rowobject.StatusId == "50") {
                return '<a class="task_status value_info "> <span class="text-success">' + cellvalue + '</span></a>'
            }
            else if (rowobject.StatusId == "30" || rowobject.StatusId == "70" || rowobject.StatusId == "100") {
                return '<a class="task_status value_info "> <span class="text-danger">' + cellvalue + '</span></a>'
            }
            else if (rowobject.StatusId == "60" || rowobject.StatusId == "80") {
                return '<a class="task_status value_info "> <span class="color-blue">' + cellvalue + '</span></a>'
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
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.StatusId != 0 && rowobject.StatusId != null) {
                return cellvalue;
            }
            else return "";
        }
    },
    {
        name: 'IsBaselineNotrequired',
        label: 'IsBaselineNotrequired',
        width: 180,
        hidden: true,
    },
    {
        name: 'Yearfreez',
        label: 'Yearfreez',
        width: 180,
        hidden: true,
    },
];
function createJQGrid(result) {

    $.jgrid.gridUnload('#ProjectBasedOnCategory');

    $("#ProjectBasedOnCategory").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
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

            var pagercount = $('#ProjectBasedOnCategory').find('tr').find('td.Yearcode:visible').length;
            $("#ProjectBasedOnCategory").find('.ui-paging-info').text("View 1 - " + pagercount + " of " + pagercount);
            applyRowspan();

            $('[data-singleselect]').select2();
            $('.data-singleselect').select2();
        },
        loadComplete: function () {
            $(this).find('td, textarea, input, select, span').removeAttr('title');
        }

    });

    $('#ProjectBasedOnCategory').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-230px + 100vh)' });
    $('#ProjectBasedOnCategory').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#ProjectBasedOnCategory').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#ProjectBasedOnCategory').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#ProjectBasedOnCategory').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#ProjectBasedOnCategory').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#ProjectBasedOnCategory").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}

var additionalcolmodels = [
    {
        name: "BudgetReqNo",
        label: 'BudgetReqNo',
        width: 90,
        resizable: true,
        hidden: true,
        classes: "BudgetReqNo"
    },
    {
        name: "Action",
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        search: false,
        formatter: function (cellvalue, options, rowobject) {

            if (rowobject.Status == 0) {
                return `<div class="action_icons grid-icons-group -justify-center before-edit-budget">
                            <a href="#" onclick="OnDeleteResources(` + options.rowId + `)">
                                <i class="fas fa-trash color-danger" id="DeleteResource" title="Delete"></i>
                            </a>
                        </div>`
            }
            else if (rowobject.Status == "Pending For Approval") {
                var role = $("#Role").val()
                if (role.trim().toLowerCase() != 'admin') {
                    return `<div class="action_icons grid-icons-group -justify-center before-edit-budget">
                            <a href="#" onclick="EditRequest(this,'add')">
                                <i class="fas fa-pen color-info"></i>
                            </a>
                            <a href="#" onclick="CancelRequest(this,'add')">
                                <i class="fas fa-times-circle color-history" style="font-size:14px"></i>
                            </a>
                        </div>

                        <div class="action_icons grid-icons-group -justify-center after-edit-budget hide">
                            <a href="#"  onclick="SaveEdit(this,'add')">
                                <i class="fas fa-save color-file"></i>
                            </a>
                            <a href="#" onclick="CancelEdit(this,${rowobject.ReqAdditionalBudget},'add')">
                                <i class="btn-close"></i>
                            </a>
                        </div >`;
                }
                else {
                    return '';
                }

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
        name: 'DepartmentId',
        label: 'Department',
        hidden: true,
        exportcol: false,
        sortable: false
    },
    {
        name: 'Category',
        label: 'Category',
        width: 160,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CategoryId',
        label: 'Category',
        hidden: true,
        sortable: false
    },
    {
        name: 'ReqAdditionalBudget',
        label: 'Req Additional Budget (INR)',
        width: 120,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                if (rowobject.Status == "Pending For Approval" || rowobject.Status == 0) {

                    return '<div class="action_icons input_budget -items-center" title="">' +
                        '<input id=' + rowobject.CategoryId + ' onkeypress="return onlyNumbers(this);" onpaste="handlePaste(event)" type="text" class="form-control budget" value=' + Budget + ' disabled />' +
                        '</div>';
                }
                else {
                    return Budget;
                }
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'AppAdditionalBudget',
        label: 'Approved Additional Budget (INR)',
        width: 170,
        classes: "text-right",
        sortable: false,
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
        label: 'Status',
        width: 160,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.StatusId == "10") {
                return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
            }
            else if (rowobject.StatusId == "50") {
                return '<a class="task_status value_info "> <span class="text-success">' + cellvalue + '</span></a>'
            }
            else if (rowobject.StatusId == "30" || rowobject.StatusId == "70" || rowobject.StatusId == "100") {
                return '<a class="task_status value_info "> <span class="text-danger">' + cellvalue + '</span></a>'
            }
            else if (rowobject.StatusId == "60" || rowobject.StatusId == "80") {
                return '<a class="task_status value_info "> <span class="color-blue">' + cellvalue + '</span></a>'
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
];
function createJQGridForAdditional(result) {

    $.jgrid.gridUnload('#AdditionalGrid');

    $("#AdditionalGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: additionalcolmodels,
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

    $('#AdditionalGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-230px + 100vh)' });
    $('#AdditionalGrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#AdditionalGrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#AdditionalGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#AdditionalGrid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#AdditionalGrid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#AdditionalGrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}

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
        label: 'Year',
        width: 50,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 100,
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
        width: 10,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'RequestedAmount',
        label: 'Requested Budget (INR)',
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
        label: 'Approved Budget (INR)',
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
        width: 180,
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
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="grid-icons-group -justify-center"> <a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="showApprovalHistory('${rowobject.BudgetReqNo}', '${rowobject.RequestedYear}', '${rowobject.DepartmentName}', '${rowobject.CategoryName}', '${rowobject.BudgetType}', '${rowobject.Amount}')" 
        class="icon_color text-success btn_button" title="View">
        <i class="fas fa-eye"></i></a></div>`;
        }

    },
];
function CreateJQGridForHistory(result) {

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

    $('#history_grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
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
function handlePaste(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');
    if (/[^0-9]/.test(pastedData) || pastedData.includes('.')) {
        event.preventDefault();
        event.target.value = '';
        alert('Please enter a valid budget');
        return;
    }
}

$("#SaveDetails").off("click").on("click", function () {

    var RequestData = [];
    var count = 0
    var flag = true;
    var Yearerror = 0
    $.each(BaselineUpdatedgridData, function (i, data) {
        var rowData = {};

        var Year = data.Year == null ? "" : data.Year;
        var StatusId = data.StatusId == null ? "" : data.StatusId;
        var invalue = data.ReqBaselineBudget;
        var DepartmentId = data.DepartmentId;
        var BudgetReqNo = data.BudgetReqNo;


        if (StatusId == "" || StatusId == "30") {
            if (invalue == "" && (BudgetReqNo != "" || BudgetReqNo != null || BudgetReqNo != "0")) {
                count++;
            }
            else {
                rowData = {
                    DepartmentId: data.DepartmentId,
                    CategoryId: data.CategoryId,
                    RequestedAmount: invalue,
                    BudgetYear: Year,
                    BudgetReqNo: BudgetReqNo
                }
                RequestData.push(rowData);
            }
        }

    });
    if (count == LenghtOfProjects && flag && Yearerror == 0) {
        alert("There is no data to save");
        flag = false;
    }
    else if (RequestData.length == 0 && flag && Yearerror == 0) {
        alert("There is no data to save");
        flag = false;
    }

    if (flag) {
        $("#SavePopUp").modal("show");
        $("#SaveOk").off("click").on("click", function () {
            $(document).find($('#SaveOk')).attr('disabled', true);
            $.ajax({
                type: "POST",
                url: ROOT + "NewProjectInitiation/SaveBudgetData",
                data: { ProjectId: $("#ProjectId").text(), RequestedData: JSON.stringify(RequestData), isSave: "Yes", BudgetType: "11", FromStage: 0 },
                success: function (data) {
                    showAlertMessage(data.OutMessage, data.StyleClass, 11)
                    getProjectdata();
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
            $(document).find($('#SaveOk')).attr('disabled', false);
        });
    }
});
$("#SubmitDetails").off("click").on("click", function () {

    var RequestData = [];
    var flag = true;
    var count = 0
    var Yearerror = 0
    $(".hideforadditinal").show();
    $.each(BaselineUpdatedgridData, function (i, data) {

        var rowData = {};

        var Year = data.Year == null ? "" : data.Year;
        var StatusId = data.StatusId == null ? "" : data.StatusId;
        var invalue = data.ReqBaselineBudget;
        var DepartmentId = data.DepartmentId;
        var BudgetReqNo = data.BudgetReqNo;

        if (StatusId == "" || StatusId == "30" || StatusId == "100") {

            if (invalue == "" && (BudgetReqNo != "" || BudgetReqNo != null || BudgetReqNo != "0")) {
                count++;
            }
            else {
                rowData = {
                    DepartmentId: data.DepartmentId,
                    CategoryId: data.CategoryId,
                    RequestedAmount: invalue,
                    BudgetYear: Year,
                    BudgetReqNo: BudgetReqNo
                }
                RequestData.push(rowData);
            }
        }
    });

    if (count > 0) {
        alert("Please enter at least <b>0</b> against each category to submit the baseline budget request.");
        flag = false;
    }
    else if (count == LenghtOfProjects && flag && Yearerror == 0) {
        alert("There is no data to save");
        flag = false;
    }
    else if (RequestData.length == 0 && flag && Yearerror == 0) {
        alert("There is no data to save");
        flag = false;
    }

    if (flag) {

        HandelConfirmDetails(
            function () {

                var remarks = $(".ApprovalRemarks").val().trim();
                if (remarks != "" && remarks != null && remarks != undefined) {
                    $("#Error_ApprovalRemarks").hide();
                }
                else {
                    $("#Error_ApprovalRemarks").show();
                    return false;
                }

                $.ajax({
                    type: "POST",
                    url: ROOT + "NewProjectInitiation/SaveBudgetData",
                    dataType: "json",
                    data: {
                        ProjectId: $("#ProjectId").text(),
                        RequestedData: JSON.stringify(RequestData),
                        Remarks: $(".ApprovalRemarks").val(),
                        FromStage: 0,
                        Action: "Submit",
                        BudgetType: "11"
                    },
                    success: function (data) {

                        if (data.OutMessage.includes("success")) {
                            showAlertMessage(data.OutMessage, data.StyleClass, 11);
                            $("#SubmitPopUp").modal("hide");
                        }
                        else {
                            alert(data.OutMessage);
                        }

                    },
                    error: function () {
                        alert("Error occured!!");
                    }
                });

            },
        )
    }
});

function HandelConfirmDetails(func) {

    $(".ApprovalRemarks").val('');

    $('#SubmitPopUp').modal('show');

    if (func) {
        $("#SubmitOK").unbind("click");
        $('#SubmitOK').on("click", func);
    }

}

$('#SaveAdditionalRequest').off('click').on('click', function () {

    var AdditionalBudgetDataToSave = [];
    var Additiondata = $("#AdditionalGrid").jqGrid("getGridParam", "data");
    $.each(Additiondata, function (i, obj) {

        if (obj.isNew != undefined) {
            var DatatoSave = {};
            DatatoSave = {
                DepartmentId: obj.DepartmentId,
                BudgetYear: obj.BudgetYear,
                RequestedAmount: obj.ReqAdditionalBudget,
                Remarks: obj.Remarks,
                CategoryId: obj.CategoryId,
                BudgetReqNo: 0
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
            $("#SubmitOK").attr('disabled', true);
            $.ajax({
                type: "POST",
                url: ROOT + "NewProjectInitiation/SaveAdditionalRequestData",
                dataType: "JSON",
                data: {
                    ProjectId: $("#ProjectId").text(), RequestedData: JSON.stringify(AdditionalBudgetDataToSave), Action: "Submit", FromStage: 0
                },
                success: function (data) {
                    showAlertMessage(data.OutMessage, data.StyleClass, 21)
                    $("#SubmitPopUp").modal("hide");
                    $("#AdditionBudgetRequest").modal("hide");
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
        });

    }
});
$(document).on("click", ".approvalHistory", function () {
    var ProjectId = $("#ProjectId").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetBudgetHistory",
        dataType: "json",
        data: { ProjectId: ProjectId },
        success: function (result) {
            $('div#historypopup').modal('show');
            $(".project_id").text($(".projectid").text());
            var BaselineBudget = result.BudgetProjectData[0]?.ApprovedBaselinebudget != null ? parseInt(result.BudgetProjectData[0].ApprovedBaselinebudget) : 0;
            var AdditionalBudget = result.BudgetProjectData[0]?.ApprovedAdditionalbudget != null ? parseInt(result.BudgetProjectData[0].ApprovedAdditionalbudget) : 0;
            $(".ApprovedBaselineBudgetForPopup").text(BaselineBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))
            $(".ApprovedAdditionalBudgetForPopup").text(AdditionalBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 }))

            $(".TotalBudgetForPopup").text((BaselineBudget + AdditionalBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 }));

            var count = 0;
            DepartmentsBudget = result.CategoryValue;
            count == 0 ? $(".hideBar").hide() : $(".hideBar").show();

            CreateJQGridForHistory(result.BudgetHistory);
        }
    })
})
$(document).on('click', '#AddAdditionalRequest', function () {
    const CatList = $("#AdditionalGrid").jqGrid("getGridParam", "data");
    var CategoryId = $("#ADD_Category option:selected").val();
    var departmentId = $("#ADD_Department option:selected").val().trim();
    var BudgetYear = $(".Add_year").val().trim();
    if (CategoryId != "") {
        $.each(CatList, function (i, obj) {
            if ((obj.CategoryId == CategoryId && departmentId == obj.DepartmentId && BudgetYear == obj.BudgetYear) && (obj.Status != "Approved" && obj.Status != "Rejected" && obj.Status != "Cancelled")) {
                $(".Error_Category").show().text('Additional budget is already requested for the selected category');
                categoryFound = true;
                return false;
            }
            else {
                $(".Error_Category").text('');
            }

        })
    }
    if (!categoryFound) {

        var year = $(".Add_year").val().trim();
        var category = $("#ADD_Category option:selected").text().trim();
        var department = $("#ADD_Department option:selected").text().trim();
        var departmentId = $("#ADD_Department option:selected").val().trim();
        var requestedBudget = $(".requestedBudget").val().trim();
        var Remarks = $(".AdditionalRemarks").val().trim();
        var CategoryId = $("#ADD_Category option:selected").val();
        var flag = true;
        year == "" ? ($(".Error_Year").show(), flag = false) : $(".Error_Year").hide();
        CategoryId == "" ? ($(".Error_Category").show().text("Please select category"), flag = false) : $(".Error_Category").hide().text("");
        requestedBudget == "" ? ($(".Error_ReqBudget").show(), flag = false) : $(".Error_ReqBudget").hide();
        Remarks == "" ? ($(".Error_Remarks").show(), flag = false) : $(".Error_Remarks").hide();
        departmentId == "" ? ($(".Error_Department").show().text("Please select department"), flag = false) : $(".Error_Department").hide().text("");

        if (flag) {

            var griddata = [];
            var AdditionalData = {};

            AdditionalData = {
                BudgetYear: year,
                Category: category,
                ReqAdditionalBudget: parseInt(requestedBudget.replace(/,/g, ''), 10),
                Remarks: Remarks,
                CategoryId: CategoryId,
                DepartmentId: departmentId,
                isNew: 1,
                Status: 0,
                DepartmentName: department
            }

            griddata.push(AdditionalData);
            AdditionalBudgetData.push(AdditionalData);

            var B1 = $("#AdditionalGrid").jqGrid('getGridParam', 'data');
            var B2 = $.merge(griddata, B1);
            createJQGridForAdditional(B2);
            $(".clearThisData").val("");
            $(".CategoryValue").val("").select2();
        }
    }

});
$(document).on('change', '#ADD_Category, .Add_year', function () {
    categoryFound = false;
    var category = $("#ADD_Category option:selected").val();
    var DepartmentId = $("#ADD_Department option:selected").val().trim();
    const CatList = $("#AdditionalGrid").jqGrid("getGridParam", "data");
    var BudgetYear = $(".Add_year").val();
    if (category != "") {
        $.each(CatList, function (i, obj) {
            if ((obj.CategoryId == category && DepartmentId == obj.DepartmentId && BudgetYear == obj.BudgetYear) && (obj.Status != "Approved" && obj.Status != "Rejected" && obj.Status != "Cancelled")) {
                $(".Error_Category").show().text('Additional budget is already requested for the selected category');
                categoryFound = true;
                return false;
            }
            else {
                $(".Error_Category").text('');
            }

        })
    }
})
$(document).on('change', '#ADD_Department', function () {
    $(".Error_Category").hide().text("");
    var Department = $("#ADD_Department option:selected").val().trim();
    var ProjectId = $("#ProjectId").text();
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetCategoryforAdditionalRequest",
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
            if (data.CategoryMaster[0]?.Year != "") {
                var startYear = data.CategoryMaster[0]?.Year;
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
            }
        }
    });
})
$(window).on('hidden.bs.modal', function () {
    $('#SubmitOK').attr('disabled', false);
    $('#SaveAdditionalRequest').attr("disabled", false);
    $(".Error_ReqBudget").hide();
    $(".Error_Remarks").hide();
    $(".Error_Category").hide();
    $(".Error_Department").hide();
    $(".Error_Year").hide();
    $(".clearThisData").val("");
    $(".ApprovalRemarks").val("");
    AdditionalBudgetData = [];
    categoryFound = false;
});
$(document).on('click', '#SearchData', function () {
    getProjectdata();
});
$(document).on('click', '#HistoryExcelDownload', function () {
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
$(document).on('click', '.BaselineBudget', function () {
    getProjectdata()
    $("#BudgetType").val("11");
});
$(document).on('click', '.AdditionalBudget', function () {

    $(".BasleineShow").hide();
    $(".AdditionalShow").show();
    $("#BudgetType").val("21");

    var ProjectId = $("#ProjectId").text();
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetApprovedDataForAdditionalPage",
        data: { ProjectId: ProjectId },
        success: function (data) {
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
                    var categoryList = '<option class="DepartmentOption" value="' + obj.DepartmentId + '">' + obj.DepartmentName + '</option>';
                    $(".DepartmentValue").append(categoryList);
                    addedDepartments.push(obj.DepartmentName);
                }
            })

            $(".Add_ProjectId").text($(".projectid").text())

            $(".project_id").text($(".projectid").text());
            createJQGridForAdditional(data.BudgetPlan);

        }

    });
});
$('body').on('change', '.RequestYear', function () {
    if ($(this).val().trim() != "") {
        var tr = $(this).closest('tr');
        tr.find(".error_year").addClass('hide');
    }
});
$(document).on("change", ".RequestYear", function () {
    var rowId = $(this).closest('tr').attr('id');
    var DepartmentId = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'DepartmentId');
    var yearval = $(element).children().find("." + DepartmentId).val();
    var Year = yearval == undefined || yearval == "" ? $(element).prevAll().find("." + DepartmentId).val() : yearval;
    $.each(BaselineUpdatedgridData, function (index, data) {
        data.Year = Year
    });
});
$(document).on("change", ".Requestclass", function (i, obj) {
    var rowId = $(this).closest('tr').attr('id');
    var DepartmentId = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'DepartmentId');
    var Year = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'Year');
    var CategoryId = $("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'CategoryId');
    var invalue = $(this).find("input.budget").val();
    invalue = invalue == "" ? "" : invalue;

    $.each(BaselineUpdatedgridData, function (index, data) {
        if (data.DepartmentId == DepartmentId && data.CategoryId == CategoryId && data.Year == Year) {
            data.ReqBaselineBudget = invalue
        }
    });
    //var statusId = parseInt($("#ProjectBasedOnCategory").jqGrid('getCell', rowId, 'StatusId'));
    //if (statusId == 10) {
    //    if (invalue == 0) {
    //        $(this).find('.edit-zero-msg').removeClass('hide').delay(5000).queue(
    //            function (next) {
    //                $(this).addClass('hide');
    //                next();
    //            }
    //        );
    //    }
    //}
});
function handelConfirmRemarksPopup(msg, func) {

    $("#with-remarks-data").val('');
    $("#with-remarks-data").siblings('span').addClass('hide');

    $("#save-with-remarks-msg").html(msg);

    $('#save-with-remarks-popup').modal('show');
    if (func) {
        $("#save-confirm").unbind("click");
        $('#save-confirm').on("click", func);
    }

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
        label: 'Approved Budget (INR)',
        width: 90,
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
$('#FileUpload').on('change', function (event) {
    var file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
        alert("The file size should be less than 5 MB ");
        $(this).val('');
        return;
    }
});
$('body').on("change", '.mandatory', function () {
    var id = $(this)[0].id;
    var value = this.value;
    if (value === "" || value === null) {
        $("#Err_" + id).show();
    } else {
        $("#Err_" + id).hide();
    }
});
$('#UploadFileData').on('click', function (event) {
    var isValid = true;
    var projectId = $('#ProjectId').val();
    var departmentId = $('#DepartmentForFile').val();
    var file = $('#FileUpload')[0].files[0];
    var budgetType = $(".BudgetType").text() == "Baseline" ? 11 : 21;

    if (departmentId == null || departmentId == '') {
        $('#Err_DepartmentForFile').show();
        isValid = false;
    }
    else {
        $("#Err_DepartmentForFile").hide();
    }

    if (!file) {
        $('#Err_FileUpload').show();
        isValid = false;
    }
    else {
        $('#Err_FileUpload').hide();
    }

    if (isValid) {
        if (file.size > 5 * 1024 * 1024) {
            alert("File size exceeds the 5MB limit. Please select a smaller file.");
            return;
        }
        else {
            var index = document_data_array.findIndex(function (obj) {
                return obj.EnclosureName.replaceAll(" ", "").toLowerCase() === file.name.replaceAll(" ", "").toLowerCase() && parseInt(obj.DepartmentId) === parseInt(departmentId)
            });
            if (index > -1) {
                alert("File with same Name is already uploaded for same Department");
                return false;
            }
            
        }
        var fd = new FormData();
        fd.append("ProjectId", projectId);
        fd.append("DepartmentId", departmentId);
        fd.append("EnclosureName", file.name);
        fd.append("PostedFile", file);
        //fd.append("BudgetType",budgetType)
        fd.append("IsActive", 1);
        $('#confirmationPopUpforSave').modal('show');
        $('#confirmsave').off('click').on('click', function () {
            $.ajax({
                url: ROOT + 'NewProjectInitiation/UploadBudgetFile',
                type: 'POST',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.includes("Successfully")) {
                        $('#confirmationPopUpforSave').modal('hide');
                        alert(result);
                        ViewDocumentsDataModal();
                    }
                    else {
                        alert(result);
                    }
                },
                error: function () {
                    alert("An error occurred!");
                }
            });
        });
    }
});
var IngridentDocViewColModels = [
    {
        name: 'Action',
        label: 'Action',
        align: 'center',
        width: 40,
        sortable:false,
        formatter: function (cellvalue, options, rowobject) {
            var fileextension = rowobject.EnclosureName.split('.').pop().toLowerCase();

            if ((fileextension === "pdf" || fileextension === "jpg" || fileextension === "png" || fileextension === "jpeg")) {
                    return '<div class="d-flex action_icons align-items-center justify-content-center">' +
                        '<a href="#" title="Download" class="" onclick="downloadoc(this)" data-project="' + rowobject.ProjectId + '" data-department="' + rowobject.DepartmentId + '" data-enclosure="' + rowobject.EnclosureName + '"><i class="fas fa-download color-download"></i></a>' +
                        '<a href="#" title="View" class="" onclick="viewdoc(this)" data-project="' + rowobject.ProjectId + '" data-department="' + rowobject.DepartmentId + '" data-enclosure="' + rowobject.EnclosureName + '"><i class="fas fa-eye color-eye"></i></a>' +
                        '<a href="#" title="Delete" onclick="deletedoc(this)" data-project="' + rowobject.ProjectId + '" data-department="' + rowobject.DepartmentId + '" data-enclosure="' + rowobject.EnclosureName + '" data-enclosureid="' + rowobject.DocumentId + '" class=""><i class="fa fa-trash color-delete"></i></a>' +
                        '</div >';
               
            }
            else {
                return '<div class="d-flex action_icons align-items-center justify-content-center">' +
                    '<a href="#" title="Download" class="" onclick="downloadoc(this)" data-project="' + rowobject.ProjectId + '" data-department="' + rowobject.DepartmentId + '" data-enclosure="' + rowobject.EnclosureName + '"><i class="fas fa-download color-download"></i></a>' +
                    '<a href="#" title="Delete" onclick="deletedoc(this)" data-project="' + rowobject.ProjectId + '" data-department="' + rowobject.DepartmentId + '" data-enclosure="' + rowobject.EnclosureName + '" data-enclosureid="' + rowobject.DocumentId + '" class=""><i class="fa fa-trash color-delete"></i></a>' +
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
        sortable: false,
        width: 65
    },
    {
        name: 'EnclosureName',
        label: 'Document Name',
        sortable: false
    },
    {
        name: 'CreatedBy',
        label: 'Uploaded By',
        sortable: false,
        width:70
    },
    {
        name: 'CreatedDate',
        label: 'Uploaded On',
        sortable: false,
        width:50
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
function deletedoc(docdata) {

    var projectId = docdata.getAttribute("data-project");
    var departmentId = docdata.getAttribute("data-department");
    var enclosurename = docdata.getAttribute("data-enclosure");
    var enclosureid = docdata.getAttribute("data-enclosureid");
    //$('#closebtn').trigger("click");
    $("#confirmpopup1").modal("show");
    $('#ConfirmDeletebutton').off('click').on('click', function () {
        $.ajax({
            url: ROOT + 'NewProjectInitiation/DeleteDocument',
            type: 'POST',
            // data: { ProjectId: projectId, DepartmentId: departmentId, EnclosureId: enclosureid },
            data: { EnclosureId: enclosureid },
            success: function (result) {
                debugger;
                if (result.includes("Successfully")) {
                    ViewDocumentsDataModal();
                    alert(result);

                }
                else {
                    alert(result);
                }
            },
            error: function () {
                alert("An error occurred!");
            }
        });
    });
    $('#confirmpopup1').modal('hide');


}
function ViewDocumentsDataModal() {
    $('#DepartmentForFile').val('').trigger('change');
    $('#FileUpload').val('')
    $('.validation').hide();
    var projectId = $('#ProjectId').val()
    var projectName = $('.projectid').text()
    //var budgetType = $(".BudgetType").text() == "Baseline" ? 11 : 21;

    $.ajax({
        url: ROOT + 'NewProjectInitiation/GetFileDetails',
        type: 'GET',
        data: { ProjectId: projectId},
        success: function (result) {
            document_data_array = result;
            createFileModalGrid(result);
            $('.filedetails').html('Upload Documents - <span class="colordetails">' + projectName + '</span>');
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
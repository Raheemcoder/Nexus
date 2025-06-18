
$(document).ready(function () {
    Budget = $("#BudgetType").val();
    if (Budget.includes('11')){
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
})

function getProjectslist(Type) {

    var projectId = $("#ProjectId").val();
    var department = $("#Department").val();
    var category = $("#Category").val();

    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetBudgetPendingDataForProject",
        dataType: "json",
        data: { ProjectId: projectId, BudgetType: Type, Department: department, Category: category },
        success: function (result) {
            $(".ProjectId").text(result.BudgetProjectData[0].ProductName)
            $(".ProjectId_hidden").text(result.BudgetProjectData[0].ProjectId)
            $(".template").text(result.BudgetProjectData[0].Template)
            $(".CreatedDate").text(result.BudgetProjectData[0].CreatedDate)
            $(".BudgetType").text(Type)
            var addedCategories = [];
            var addedDepartments = [];
            $("option").remove(".CategoryOption");
            $("option").remove(".DepartmentOption");
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
            $.jgrid.gridUnload('#list');

            loadGrid(result.BudgetPlan,Type);
        }
    })

}


$("#SearchData").on("click", function () {
    var projectId = $("#ProjectId").val();
    var department = $("#Department").val();
    var category = $("#Category").val();
    var Type = $(".BudgetType").text();
    
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetBudgetPendingDataForProject",
        dataType: "json",
        data: { ProjectId: projectId, BudgetType: Type, Department: department, Category: category },
        success: function (result) {
            loadGrid(result.BudgetPlan,Type);
        }
    });
});

$(".BaselineBudget").on("click", function () {
    $("#Department").val('').select2();
    $("#Category").val('').select2();
    getProjectslist("Baseline")
})

$(".AdditionalBudget").on("click", function () {
    $("#Department").val('').select2();
    $("#Category").val('').select2();
    getProjectslist("Additional")
})


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

function SingleApproveOrReject(obj, Category, IsApproved) {
    var flag = true;
    var clossestTableRow = $(obj).closest("tr");
    var DepartmentName = $(clossestTableRow).find("td.Dept").text();
    var RequestBaseline = $(clossestTableRow).find("td.reqval").text();
    var ApprovalBudget = $(clossestTableRow).find("td input.appvalue").val();
    var BudgetYear = $(clossestTableRow).find("td.BudgetYear").text();
    var ProjectId = $(".ProjectId_hidden").text();
    if (ApprovalBudget == "") {
        $(clossestTableRow).find("td span.hide").removeClass("hide");
        flag = false;
    }
    var Action = IsApproved == 'Y' ? '20' : '30';
    if (flag)
    {
        $('#Approve').modal('show');
        if (IsApproved == "Y") {
            $(".modaltitle").text("Approve Confirmation");
            $(".modalmsg").text("Are you sure you want to approve?");
        }
        else {
            $(".modaltitle").text("Reject Confirmation");
            $(".modalmsg").text("Are you sure you want to reject?");
        }
        $('#ByClick_OK').off('click').on('click', function () {
            var selecteddata = [];
            selecteddata = [{
                ProjectId: ProjectId,
                DepartmentName: DepartmentName,
                Category: Category,
                RequestBaseline: RequestBaseline,
                ApprovalBudget: Action == "30" ? "" : ApprovalBudget,
                BudgetType: $(".BudgetType").text(),
                Action: Action,
                RequestedYear: BudgetYear,
            }]
            var flag1 = true;
            $(".ApprovalRemarks").val().trim() == "" ? (flag1 = false, $("#Error_ApprovalRemarks").show()) : flag1 = true;
            if (flag1) {
                $(document).find($('#ByClick_OK')).attr('disabled', true);
                $.ajax({
                    type: "POST",
                    url: ROOT + "ProjectMaster/SaveBaselingApprovalData",
                    dataType: "json",
                    async:false,
                    data: { selecteddata: JSON.stringify(selecteddata), Remarks: $(".ApprovalRemarks").val() },
                    success: function (data) {
                        showAlertMessage(data.OutMessage, data.StyleClass)
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


var flagVal = true;
$("#RejectData,#ApproveData").on("click", function () {
    
    var ButtonClicked = $(this).attr("id");
    var button = ButtonClicked == "ApproveData" ? "Approve" : "Reject";
    var buttonCase = button.toLowerCase();
    flagVal = true;
    var myApprovalPendingData = [];
    var selectedYear = []
    var flag = true;
    $("#list tr").each(function () {
        if ($(this).find('.checkbox').prop('checked')) {
            var rowData = getchecckedRowData(this, button);
            selectedYear.push(rowData.RequestedYear);
            myApprovalPendingData.push(rowData);
        }
    });
     var uniqSelectedYear = [...new Set(selectedYear)];
    //if (uniqSelectedYear.length > 1 && myApprovalPendingData.length > 0) {
    //    flagVal = false
    //    alert('Please select the budget requests of either ' + uniqSelectedYear.join(' / ') +' to '+buttonCase+'.') 
    //}
    if (flagVal) {
        if (myApprovalPendingData == [] || myApprovalPendingData.length == 0) {
            flag = false
            alert('Please select atleast one data to ' + buttonCase)
        }
        else if (flag) {
            $('#Approve').modal('show');
            $(".modaltitle").text(button+" Confirmation");
            $(".modalmsg").text("Are you sure you want to " + buttonCase +"?");
            $('#ByClick_OK').off('click').on('click', function () {
                var flag1 = true;
                $(".ApprovalRemarks").val().trim() == "" ? (flag1 = false, $("#Error_ApprovalRemarks").show()) : flag1 = true;
                if (flag1) {
                    $(document).find($('#ByClick_OK')).attr('disabled', true);
                    $.ajax({
                        type: "POST",
                        url: ROOT + "ProjectMaster/SaveBaselingApprovalData",
                        dataType: "json",
                        data: { selecteddata: JSON.stringify(myApprovalPendingData), Remarks: $(".ApprovalRemarks").val() },
                        success: function (data) {
                            showAlertMessage(data.OutMessage, data.StyleClass)
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


function getchecckedRowData(obj, Status) {
    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#list');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");
    var RequestedYear = grd.jqGrid('getCell', rowid, 'BudgetYear');
    var Department = grd.jqGrid('getCell', rowid, 'DepartmentName');
    var Category = grd.jqGrid('getCell', rowid, 'CategoryId');
    var ReqBaselineBudget = grd.jqGrid('getCell', rowid, 'ReqBaselineBudget');
    var ApprovedBudget = $(clossestTableRow).find("td input.appvalue").val();
    var ProjectId = $(".ProjectId_hidden").text();
    if (ApprovedBudget == "") {
        $(clossestTableRow).find("td span.hide").removeClass("hide");
        flagVal = false;
    }
    var arrayitem = {};
  var Action= Status == "Reject" ? '30' : '20'
    var arrayitem = {
        ProjectId: ProjectId,
        DepartmentName: Department,
        Category: Category,
        RequestBaseline: ReqBaselineBudget,
        ApprovalBudget: Action=="30"?"":ApprovedBudget,
        Action: Action,
        BudgetType: $(".BudgetType").text(),
        RequestedYear: RequestedYear,
    };

    return arrayitem;
}

$(window).on('hidden.bs.modal', function () {
    $(".cancelThisData").val("");
    $("#Error_ApprovalRemarks").hide();
})

$("#approvalHistory").on("click", function () {
    var ProjectId = $(".ProjectId_hidden").text();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetBudgetHistory",
        data: {
            ProjectId: ProjectId
        },
        success: function (data) {
            $('div#historypopup').modal('show');
            $(".project_id").text($(".ProjectId").text());
            $("#history_grid").jqGrid("clearGridData");
            $("#history_grid").jqGrid('setGridParam', { data: data });
            $("#history_grid").trigger('reloadGrid', [{ page: 1 }]);
        }
    })
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
        width: 180,
        resizable: true,
        ignoreCase: true,
        exportcol:false,
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
        width: 180,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        hidden:true,
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
        width: 100,
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
                return '<span class="text-success">' + rowobject.L2Action +'</span>';
            }
            else if (rowobject.L2Action == "SAP In Progress" || rowobject.L2Action == "Waiting for SAP Posting")
            {
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

function loadGrid(result, Type) {
    $.jgrid.gridUnload('#list');

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
                if (rowObject.Status == "Pending For L1 Approval") {
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
            //cellattr: arrtSetting, 
            width: 100,
            search: false,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Status == "Pending For L1 Approval") {
                    return '<div class="d-flex action_icons align-items-center" title="">' +
                        '<a onclick=SingleApproveOrReject(this,' + rowobject.CategoryId + ',"Y") class="pl-1" title="Approve" > <i class="fas fa-thumbs-up text-success mr-2"></i></a> ' +
                        '<a onclick=SingleApproveOrReject(this,' + rowobject.CategoryId + ',"N")  class="pl-1" title="Reject"> <i class="fas fa-thumbs-down text-danger mr-2"></i></a> ' +
                        '</div>';
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
            classes: "Dept",
            //  cellattr: arrtSetting
        },
        {
            name: 'Category',
            label: 'Category',
            width: 180,
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
            width: 140,
            classes: "reqval",
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
            name: 'AppBaselineBudget',
            label: Type == "Baseline" ? "Approved Baseline Budget (INR)" : "Approved Additional Budget (INR)",
            width: 140,
            formatter: function (cellvalue, options, rowobject) {

                if (rowobject.Status == "") {
                    return '';
                }
                //else if (rowobject.Status == "L1 Approved" || rowobject.Status == "L2 Approved" || rowobject.Status == "Rejected") {
                //    var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                //    return '<div class="text-right">' + Budget + '</div>';
                //}
                else if (rowobject.Status == "Pending For L1 Approval") {
                    var Budget = parseInt(rowobject.ReqBaselineBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                    return '<div class="action_icons input_budget -items-center" title="">' +
                        '<input type="text" class="form-control appvalue" onkeypress="return onlyNumbers(this)" onkeyup="return checktheinputValue(this)" value="' + Budget + '" /><span class="text-danger hide errormsg"> Please enter Budget</span>' +
                        '</div>';
                }
                else {
                    var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                    return '<div class="text-right">' + Budget + '</div>';
                }
                //else {
                //    var Budget = parseInt(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                //    return '<div class="action_icons input_budget -items-center" title="">' +
                //        '<input type="text" class="form-control appvalue" onkeypress="return onlyNumbers(this)" onkeyup="return checktheinputValue(this)" value="' + Budget + '" /><span class="text-danger hide errormsg"> Please enter Budget</span>' +
                //        '</div>';
                //}

            },
        },
        {
            name: 'Status',
            label: 'Baseline Budget Status',
            width: 180,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Status == "Pending For L1 Approval") {
                    return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
                }
                else if (rowobject.Status == "L1 Approved" || rowobject.Status == "L2 Approved" || rowobject.Status == "SAP Posting Sucessfully") {
                    return '<a class="task_status value_info "> <span class="text-success">' + cellvalue + '</span></a>'
                }
                else if (rowobject.Status == "Rejected" || rowobject.Status == "SAP Failed") {
                    return '<a class="task_status value_info "> <span class="text-danger">' + cellvalue + '</span></a>'
                }
                else if (rowobject.Status == "Waiting for SAP Posting" || rowobject.Status == "SAP In Progress") {
                    return '<a class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></a>'
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
                    if (List[i].Status === "Pending For L1 Approval") {
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

    $("#list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    })

    $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
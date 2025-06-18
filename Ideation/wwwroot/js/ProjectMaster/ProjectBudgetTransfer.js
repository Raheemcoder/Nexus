var fromArray = [];
var toArray = [];
var ProjectId = $("#ProjectId").val();

$(document).ready(function () {
    var ProjectId = $("#ProjectId").val();
    getDataToTrasfer();
});

$('.data-singleselect').select2();
$('[data-singleselect]').select2();

var outMessage = $("#HiddenOutMsg").text();
if (outMessage != "" && outMessage != null && outMessage != undefined) {
    $('#AlertPopUp').modal('show');
    $("#AlertMessage").text(outMessage)
}

colmodels = [
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'Category',
        label: 'Category',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'CategoryId',
        label: 'Category',
        width: 10,
        resizable: true,
        ignoreCase: true,
        classes: 'category-id',
        hidden: true,
    },
    {
        name: 'Year',
        label: 'Year',
        width: 50,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",

    },
    {
        name: 'Budget',
        label: 'Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        //formatter: function (cellvalue, options, rowobject) {
        //    if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
        //        var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
        //        return Budget;
        //    }
        //    else {
        //        return ''
        //    }
        //}

    },
    {
        name: 'ExpenseAmt',
        label: 'Expenses (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",

    },
    {
        name: 'Balance',
        label: 'Balance (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        //formatter: function (cellvalue, options, rowobject) {
        //    if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
        //        var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { maximumFractionDigits: 0 })
        //        return Budget;
        //    }
        //    else {
        //        return ''
        //    }
        //}

    },
    {
        name: 'ToTransfer',
        label: 'To Transfer (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        hidden : true,
    },
    {
        name: 'ToTransferData',
        label: 'To Transfer (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "toArray",
        formatter: function (cellvalue, options, rowobject) {
            if ((rowobject.Balance == 0 || rowobject.Balance == null) && rowobject.ToTransfer == '0') {
                return '';
            }
            else if (rowobject.ToTransfer != '0') {
                transferedRowsCatId.push(rowobject.CategoryId)
                return `
                <div class="action_icons input_budget items-center" title="">
                    <input onkeypress="return onlyNumbers(event);" 
                           onkeyup="checkinputValue(this)" 
                           placeholder="${rowobject.Balance}" 
                           type="text" value="${rowobject.ToTransfer}"
                           class="form-control budget" />
                    <input type="hidden" class="hiddenBalance" value="${rowobject.Balance}" />
                </div>`;
            }
            else {
                return `
                <div class="action_icons input_budget items-center" title="">
                    <input onkeypress="return onlyNumbers(event);" 
                           onkeyup="checkinputValue(this)" 
                           placeholder="${rowobject.Balance}" 
                           type="text" 
                           class="form-control budget" />
                    <input type="hidden" class="hiddenBalance" value="${rowobject.Balance}" />
                </div>`;
            }
        }
    }
],

    $("#TransferGridFromYear").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        footerrow: true,
        userDataOnFooter: true,
        pager: '#pager_TransferGridFromYear',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#TransferGridFromYear tbody tr");
            var objHeader = $("#TransferGridFromYear tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#TransferGridFromYear')
            var Budget = $grid.jqGrid('getCol', 'Budget', false, 'sum')
            var Expense = $grid.jqGrid('getCol', 'ExpenseAmt', false, 'sum')
            var Balance = $grid.jqGrid('getCol', 'Balance', false, 'sum')
            var ToTransfer = $grid.jqGrid('getCol', 'ToTransfer', false, 'sum')

            $grid.jqGrid('footerData', 'set', { 'DepartmentName': "Total" });
            $grid.jqGrid('footerData', 'set', { 'Category': "" });
            $grid.jqGrid('footerData', 'set', { 'Year': "" });
            $grid.jqGrid('footerData', 'set', { 'Budget': Budget.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'ExpenseAmt': Expense.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'Balance': Balance.toFixed(2) });

            if (ToTransfer != 0) {
                $(".AmountToTransfer").val(ToTransfer.toFixed(2));
                $(".AmountToTransfer").attr("placeholder", (parseFloat(Balance) + parseFloat(ToTransfer)).toFixed(2));
            }
            else {
                $(".AmountToTransfer").attr("placeholder", Balance.toFixed(2));
            }
        }
    });
$("#TransferGridFromYear").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

colmodels = [
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'Category',
        label: 'Category',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'CategoryId',
        label: 'Category',
        width: 10,
        resizable: true,
        ignoreCase: true,
        classes: 'category-id',
        hidden: true,
    },
    {
        name: 'Year',
        label: 'Year',
        width: 45,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",

    },
    {
        name: 'Budget',
        label: 'Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",

    },
    {
        name: 'ExpenseAmt',
        label: 'Expenses (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",

    },
    {
        name: 'Balance',
        label: 'Balance (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",

    },
],

    $("#TransferGridToYear").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_TransferGridToYear',
        rowNum: 20,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,

        gridComplete: function () {
            var objRows = $("#TransferGridToYear tbody tr");
            var objHeader = $("#TransferGridToYear tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#TransferGridToYear');
            var Budget = $grid.jqGrid('getCol', 'Budget', false, 'sum')
            var Expense = $grid.jqGrid('getCol', 'ExpenseAmt', false, 'sum')
            var Balance = $grid.jqGrid('getCol', 'Balance', false, 'sum')

            $grid.jqGrid('footerData', 'set', { 'DepartmentName': "Total" });
            $grid.jqGrid('footerData', 'set', { 'Category': "" });
            $grid.jqGrid('footerData', 'set', { 'Year': "" });
            $grid.jqGrid('footerData', 'set', { 'Budget': Budget.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'ExpenseAmt': Expense.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'Balance': Balance.toFixed(2) });
        }

    });
$("#TransferGridToYear").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

colmodels = [
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'Category',
        label: 'Category',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'CategoryId',
        label: 'Category',
        width: 10,
        resizable: true,
        ignoreCase: true,
        classes: 'category-id',
        hidden: true,
    },
    {
        name: 'Year',
        label: 'Year',
        width: 50,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",

    },
    {
        name: 'Budget',
        label: 'Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'ExpenseAmt',
        label: 'Expenses (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'Balance',
        label: 'Balance (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
],

    $("#PopFromtrasferGrid").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_PopFromtrasferGrid',
        rowNum: 20,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,

        gridComplete: function () {
            var objRows = $("#PopFromtrasferGrid tbody tr");
            var objHeader = $("#PopFromtrasferGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#PopFromtrasferGrid');

            var Budget = $grid.jqGrid('getCol', 'Budget', false, 'sum')
            var Expense = $grid.jqGrid('getCol', 'ExpenseAmt', false, 'sum')
            var Balance = $grid.jqGrid('getCol', 'Balance', false, 'sum')

            $grid.jqGrid('footerData', 'set', { 'DepartmentName': "Total" });
            $grid.jqGrid('footerData', 'set', { 'Category': "" });
            $grid.jqGrid('footerData', 'set', { 'Year': "" });
            $grid.jqGrid('footerData', 'set', { 'Budget': Budget.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'ExpenseAmt': Expense.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'Balance': Balance.toFixed(2) });
        }
    });

$("#PopFromtrasferGrid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

colmodels = [
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'Category',
        label: 'Category',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'CategoryId',
        label: 'Category',
        width: 10,
        resizable: true,
        ignoreCase: true,
        classes: 'category-id',
        hidden: true,
    },
    {
        name: 'Year',
        label: 'Year',
        width: 50,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'Budget',
        label: 'Budget (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'ExpenseAmt',
        label: 'Expenses (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
    {
        name: 'Balance',
        label: 'Balance (INR)',
        width: 100,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
    },
],

    $("#PopTotrasferGrid").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_PopTotrasferGrid',
        rowNum: 20,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,

        gridComplete: function () {
            var objRows = $("#PopTotrasferGrid tbody tr");
            var objHeader = $("#PopTotrasferGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        },
        loadComplete: function () {
            var $grid = $('#PopTotrasferGrid');

            var Budget = $grid.jqGrid('getCol', 'Budget', false, 'sum')
            var Expense = $grid.jqGrid('getCol', 'ExpenseAmt', false, 'sum')
            var Balance = $grid.jqGrid('getCol', 'Balance', false, 'sum')

            $grid.jqGrid('footerData', 'set', { 'DepartmentName': "Total" });
            $grid.jqGrid('footerData', 'set', { 'Category': "" });
            $grid.jqGrid('footerData', 'set', { 'Year': "" });
            $grid.jqGrid('footerData', 'set', { 'Budget': Budget.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'ExpenseAmt': Expense.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'Balance': Balance.toFixed(2) });
        }
    });
$("#PopTotrasferGrid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$('[data-datepicker-year]').datepicker({
    format: 'yyyy',
    viewMode: 'years',
    minViewMode: 'years',
    todayHighlight: true,
    autoclose: true
});
$('[data-datepicker-year]').datepicker('setDate', today);

function getDataToTrasfer() {
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetProjectDataToTransfer",
        dataType: "json",
        data: {
            ProjectId: $("#ProjectId").val()
        },
        success: function (result) {
            $(".ProjectId").text(result[0].ProjectId);

            $(".TotalBudget").text(parseFloat(result[0].TotalBudgetAmt == null ? 0 : result[0].TotalBudgetAmt).toLocaleString('en-IN', { maximumFractionDigits: 0 }));
            $(".BaselineAmount").text(parseFloat(result[0].BaselineBudget == null ? 0 : result[0].BaselineBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 }));
            $(".AdditionalAmount").text(parseFloat(result[0].AdditionalBudget == null ? 0 : result[0].AdditionalBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 }));
            $(".transferAmount").text(parseFloat(result[0].TransferBudget == null ? 0 : result[0].TransferBudget).toLocaleString('en-IN', { maximumFractionDigits: 0 }));
            $(".Expense").text(parseFloat(result[0].Expense == null ? 0 : result[0].Expense).toLocaleString('en-IN', { maximumFractionDigits: 0 }));
            $(".Balance").text(parseFloat(result[0].Balance == null ? 0 : result[0].Balance).toLocaleString('en-IN', { maximumFractionDigits: 0 }));
        }
    });
}
$('body').on('change', '#FromYear,#ToYear,#Department', function () {
    var fromyear = $("#FromYear").val();
    var toYear = $("#ToYear").val();
    var Department = $("#Department").val();
    if (fromyear != "") {
        $(".error_fromyear").hide();
    }
    if (toYear != "") {
        $(".error_toyear").hide()
    }
    if (Department != "") {
        $(".error_department").hide()
    }
});
$("#Search").on("click", function () {
    $(".AmountToTransfer").siblings('span').addClass('hide');
    $(".AmountToTransfer").val("");
    $(".AmountToTransfer").attr("placeholder", "");

    modifiedToArray = [];
    modifiedFromArray = [];
    transferedRowsCatId = [];

    var fromyear = $("#FromYear").val();
    var toYear = $("#ToYear").val();
    var Department = $("#Department").val();
    var flag = true;

    if (fromyear == "" || toYear == "" || Department == "") {
        fromyear == "" ? $(".error_fromyear").show() : $(".error_fromyear").hide();
        toYear == "" ? $(".error_toyear").show() : $(".error_toyear").hide();
        Department == "" ? $(".error_department").show() : $(".error_department").hide();
        flag = false;
    }
    if (flag) {
        $.ajax({
            type: "POST",
            url: ROOT + "ProjectMaster/GetProjectDataBasedOnYear",
            dataType: "json",
            data: {
                ProjectId: $("#ProjectId").val(),
                FromYear: fromyear,
                ToYear: toYear,
                Department: Department
            },
            success: function (result) {

                fromArray = [];
                toArray = [];

                fromArray = result.FromTransferData;
                toArray = result.ToTransferData;

                $("#TransferGridFromYear").jqGrid("clearGridData");
                $("#TransferGridFromYear").jqGrid('setGridParam', { data: fromArray });
                $("#TransferGridFromYear").trigger('reloadGrid', [{ page: 1 }]);

                $("#TransferGridToYear").jqGrid("clearGridData");
                $("#TransferGridToYear").jqGrid('setGridParam', { data: toArray });
                $("#TransferGridToYear").trigger('reloadGrid', [{ page: 1 }]);

            }
        });
    }
})

function onlyNumbers(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;
    if (evt != '') {
        var currentValue = evt.value;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;

}

function IsSumofCategoryToTransfer() {

    var totalTransferAmt = $(".AmountToTransfer").val();

    if (totalTransferAmt == "" || totalTransferAmt <= 0) {
        $(".AmountToTransfer").siblings('span').removeClass('hide');
        return 4; // no amount to transfer
    }

    var sumOfCategoryTransferAmt = 0;

    $("#TransferGridFromYear tbody tr").each(function (i) {
        if (i != 0) {
            var value = $(this).find(".budget").val();
            if (value != "" && value != null && value != undefined && parseFloat(value) > 0) {
                sumOfCategoryTransferAmt += parseFloat(value);
            }
        }
    });

    if (sumOfCategoryTransferAmt > totalTransferAmt) {
        return 1; // greater
    }
    else if (sumOfCategoryTransferAmt < totalTransferAmt) {
        return 2; // lesser
    }
    else if (sumOfCategoryTransferAmt == totalTransferAmt) {
        return 3; // equal
    }
    else {
        return 0; // miscellanious
    }

}
function checkinputValue(obj) {
 
   var result = IsSumofCategoryToTransfer();

    if (result == 1) {
        alert("The sum of the categories transfer amount cannot be greater than the <b>Amount to transfer</b>");

        $(obj).val("");
        return false;
    }
    if (result == 4) {
        $(obj).val("");
        return false;
    }

    var closestTableRow = $(obj).closest("tr");
    var baselineBudget = $(closestTableRow).find("input.hiddenBalance").val();
    var addedBaselineBudget = parseFloat(baselineBudget.replace(/,/g, '')) || 0;
    var approvalValue = parseFloat(obj.value.replace(/,/g, '')) || 0;

    if (approvalValue > addedBaselineBudget) {
        alert("Transfer amount should not be greater than balance amount");
        $(obj).val("");
    }

}

$('body').on('change', '.AmountToTransfer', function () {
    if ($(".AmountToTransfer").val() != "" && $(".AmountToTransfer").val() > 0) {
        $(".AmountToTransfer").siblings('span').addClass('hide');
    }
});

var modifiedFromArray = [];
var modifiedToArray = [];
var transferedRowsCatId = [];

function checkModifiedData() {
    
    modifiedToArray = [];
    modifiedFromArray = [];

    if (transferedRowsCatId.length > 0) {

        transferedRowsCatId.forEach(function (item) {

            var fromRow = fromArray.filter(obj => obj.CategoryId == item).length > 0 ? fromArray.filter(obj => obj.CategoryId == item) : [];
            var toRow = toArray.filter(obj => obj.CategoryId == item).length > 0 ? toArray.filter(obj => obj.CategoryId == item) : [];

            if (fromRow.length > 0) {

                var filteredFromRow = $.extend(true, {}, fromRow[0]);
                var filteredToRow = toRow.length > 0 ? $.extend(true, {}, toRow[0]) : [];

                if (toRow.length > 0) {

                    filteredToRow.Budget = (parseFloat(filteredToRow.Budget) + parseFloat(filteredFromRow.ToTransfer)).toString();
                    filteredToRow.Balance = parseFloat(filteredToRow.Budget) - parseFloat(filteredToRow.ExpenseAmt).toString();
                    filteredToRow.TransferAction = 'IN';
                    filteredToRow.ToTransfer = filteredFromRow.ToTransfer
                    modifiedToArray.push(filteredToRow);

                }

                if (toRow.length == 0) {

                    var toYear = $("#ToYear").val();
                    var Budget = filteredFromRow.ToTransfer;
                    var Balance = filteredFromRow.ToTransfer;

                    var createdToRow = [];
                    createdToRow.push({
                        Balance: Balance,
                        Budget: Budget,
                        Category: filteredFromRow.Category,
                        CategoryId: filteredFromRow.CategoryId,
                        DepartmentName: filteredFromRow.DepartmentName,
                        ExpenseAmt: "0",
                        Year: toYear,
                        ToTransfer: Budget,
                        TransferAction: "IN"
                    });

                    modifiedToArray.push(createdToRow[0]);
                }

                filteredFromRow.Budget = (parseFloat(filteredFromRow.Budget) - parseFloat(filteredFromRow.ToTransfer)).toString();
                filteredFromRow.Balance = (parseFloat(filteredFromRow.Budget) - parseFloat(filteredFromRow.ExpenseAmt)).toString();
                modifiedFromArray.push(filteredFromRow);

            }

        });

        fromArray.forEach(function (item) {
            let isUnique = true;

            modifiedFromArray.forEach(function (item1) {
                if (item.CategoryId === item1.CategoryId) {
                    isUnique = false;
                    return;
                }
            });

            if (isUnique) {
                modifiedFromArray.push(item);
            }
        });

        toArray.forEach(function (item) {
            let isUnique = true;

            modifiedToArray.forEach(function (item1) {
                if (item.CategoryId === item1.CategoryId) {
                    isUnique = false;
                    return;
                }
            });

            if (isUnique) {
                modifiedToArray.push(item);
            }
        });
    }

}
$(".ConfirmTransfer").off("click").on("click", function () {
    checkModifiedData();
    var result = IsSumofCategoryToTransfer();
    if (result == 3) {
        checkModifiedData();
        $("#PopFromtrasferGrid").jqGrid("clearGridData");
        $("#PopFromtrasferGrid").jqGrid('setGridParam', { data: modifiedFromArray });
        $("#PopFromtrasferGrid").trigger('reloadGrid', [{ page: 1 }]);

        $("#PopTotrasferGrid").jqGrid("clearGridData");
        $("#PopTotrasferGrid").jqGrid('setGridParam', { data: modifiedToArray });
        $("#PopTotrasferGrid").trigger('reloadGrid', [{ page: 1 }]);

        $("#ShowConfirmPopUp").modal("show");
    }
    else if (result == 2) {
        alert("The sum of the categories transfer amount cannot be lesser than the <b>Amount to transfer</b>");
    }
    else if (result == 1) {
        alert("The sum of the categories transfer amount cannot be greater than the <b>Amount to transfer</b>");
    }
});

$("#ConfirmSave").off("click").on("click", function () {
    $(document).find($('#ConfirmSave')).attr('disabled', true);
    var Approveremarks = $.trim($("#ApprovalRemarks").val())
    var DataToInsert = [];
    $.each(modifiedFromArray, function (i, obj) {
        if (obj.ToTransfer != "0") {
            obj.TransferAction = "OUT"
            DataToInsert.push(obj)
        }
    });
    $.each(modifiedToArray, function (i, obj) {
        if (obj.TransferAction == "IN") {
            DataToInsert.push(obj)
        }
    });
    if (DataToInsert.length == 0) {
        alert('There is no data to save');
    }
    else if (Approveremarks == "") {
        $("#Error_ApprovalRemarks").show();
        $(document).find($('#ConfirmSave')).attr('disabled', false);
    }
    else {
        $('#ProjectDataToSave').val(JSON.stringify(DataToInsert));
        $("#ProjectId").val(ProjectId);
        $("#IsSave").val('No');
        $("#Remarks").val(Approveremarks);
        document.getElementById('BudgetTransfer_Save').submit();
    }
});
$(".SaveData").off("click").on("click", function () {

    var DataToInsert = [];
    checkModifiedData();
    $.each(modifiedFromArray, function (i, obj) {
        if (obj.ToTransfer != "0") {
            obj.TransferAction = "OUT"
            DataToInsert.push(obj)
        }
    });
    $.each(modifiedToArray, function (i, obj) {
        if (obj.TransferAction == "IN") {
            DataToInsert.push(obj)
        }
    });
    if (DataToInsert.length == 0) {
        alert('There is no data to save');
    }
    else {
        $("#SaveModal").modal("show");
        $("#Save_Ok").off("click").on("click", function () {

            $(document).find($('#Save_Ok')).attr('disabled', true);

            $('#ProjectDataToSave').val(JSON.stringify(DataToInsert));
            $("#ProjectId").val(ProjectId);
            $("#IsSave").val('Yes');
            document.getElementById('BudgetTransfer_Save').submit();
        })
    }
});
$('body').on('change', '.budget', function () {
    
    var $currentTr = $(this).closest('tr');
    var catId = $currentTr.find('.category-id').text();
    fromArray.filter(function (item) {
        if (item.CategoryId == catId) {
            var value = $currentTr.find('.budget').val();
            if (value != "" && value != null && value != undefined && parseFloat(value) > 0) {
                item.ToTransfer = $currentTr.find('.budget').val();
                if (!transferedRowsCatId.includes(catId)) {
                    transferedRowsCatId.push(catId);
                }
            }
            else if (value == "" && item.ToTransfer != "")
            {
                item.Balance = item.Budget
                item.ToTransfer = 0
            }
        }
    });

});
function checkinputValueforTotal(evt) {
    var inputValue = $(".AmountToTransfer").val()
    var placeholderValue = $(".AmountToTransfer").attr("placeholder");
    if (parseInt(inputValue) > parseInt(placeholderValue)) {
        alert("Entered amount should not be greater than the from year balance amount.");
        $(".AmountToTransfer").val('');
    }
}

$("#FromYear").on("change", function () {

    var fromyear = $("#FromYear").val();
    var Options = "";
    var DeptOptions = "";

    if (fromyear != "") {
        $.ajax({
            type: "POST",
            url: ROOT + "ProjectMaster/GetTransferToYearAndDepartment",
            dataType: "json",
            data: {
                ProjectId: $("#ProjectId").val(),
                FromYear: fromyear,
            },
            success: function (result) {
                $("option").remove("#ToYear .ToYearOption");
                $.each(result.ToYearValue, function (i, obj) {
                    Options += '<option class="ToYearOption" value="' + obj.YearVal + '">' + obj.YearVal + '</option>'
                })
                $("#ToYear").append(Options);

                $("option").remove("#Department .DeptOption");
                $.each(result.DepartmentValue, function (i, obj) {
                    DeptOptions += '<option class="DeptOption" value="' + obj.DepartmentName + '">' + obj.DepartmentName + '</option>'
                })
                $("#Department").append(DeptOptions);
            }
        });
    }
    else {
        $("option").remove("#Department .DeptOption");
        $("option").remove("#ToYear .ToYearOption");
    }
});





col = [
    {
        name: 'Year',
        label: 'Year',
        width: 20,
        resizable: true,
        ignoreCase: true,
        classes: "",
    },
    {
        name: 'TotalBudgetAmt',
        label: 'Budget (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: false,

        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return '<a class="text-info color-blue" onclick="showyearwisedata(' + rowobject.Year + ', \'Budget\')">' + Budget + '</a>';
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'TotalBudgetAmt',
        label: 'Budget (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget;
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Expense',
        label: 'Expenses (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return '<a class="text-info color-blue" onclick="showyearwisedata(' + rowobject.Year + ', \'Expenses\')">' + Budget + '</a>';
            }
            else {
                return ''
            }
        }
    },
    {
        name: 'Expense',
        label: 'Expenses (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        exportcol: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return Budget;
            }
            else {
                return ''
            }
        }
    }
],

    $("#YearWisebudget").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: [],
        mtype: 'GET',
        colModel: col,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_YearWisebudget',
        rowNum: 20,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,

        gridComplete: function () {
            var objRows = $("#YearWisebudget tbody tr");
            var objHeader = $("#YearWisebudget tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#YearWisebudget');

            var Budget = $grid.jqGrid('getCol', 'TotalBudgetAmt')
            var Expense = $grid.jqGrid('getCol', 'Expense')


            const extractValues = (Budget) => {
                return Budget.map(item => {
                    const match = item.match(/>([^<]+)</);
                    return match ? match[1] : null;
                });
            };
            const Budgetvalues = extractValues(Budget);

            const ExpextractValues = (Expense) => {
                return Expense.map(item => {
                    const match = item.match(/>([^<]+)</);
                    return match ? match[1] : null;
                });
            };
            const Expensesvalues = ExpextractValues(Expense);

            var budgetTotal = 0, Expensetotal = 0
            $.each(Budgetvalues, function (i, obj) {
                if (obj != '' && obj != null) {
                    budgetTotal = budgetTotal + parseFloat(obj.replace(/,/g, ''));
                }
            });
            $.each(Expensesvalues, function (i, obj) {
                if (obj != '' && obj != null) {
                    Expensetotal = Expensetotal + parseFloat(obj.replace(/,/g, ''));
                }
            });

            $grid.jqGrid('footerData', 'set', { 'Year': "Total" });
            $grid.jqGrid('footerData', 'set', { 'TotalBudgetAmt': budgetTotal.toFixed(2) });
            $grid.jqGrid('footerData', 'set', { 'Expense': Expensetotal.toFixed(2) });
        }
    });
$("#YearWisebudget").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 128) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}

$(".YearBudget").on("click", function () {
    $('#budget_projectid').val(ProjectId)
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetYearWiseBudgetAndExpense",
        dataType: "json",
        async: false,
        data: { ProjectId: $("#ProjectId").val() },
        success: function (data) {
            $("#ShowBudget").modal("show");
            $(".project_id").text($(".ProjectId").text())
            $("#YearWisebudget").jqGrid("clearGridData");
            $("#YearWisebudget").jqGrid('setGridParam', { data: data });
            $("#YearWisebudget").trigger('reloadGrid', [{ page: 1 }]);

        }
    });

})

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 128) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}
$("#HistoryExcelDownload").click(function () {
    var data = $('#YearWisebudget').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#YearWisebudget").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "YearWisebudgetInfo.xlsx",
            maxlength: 1000,

        });
    }
});

function showyearwisedata(year, type) {
    debugger;
    var project = $('#budget_projectid').val();
    var Type = type;
    var Year = year;
    $.ajax({
        type: "GET",
        url: ROOT + "ProjectMaster/GetBudgetAndExpenseBasedOnYear",
        data:
        {
            Project: project, Year: year, Type: type
        },
        dataType: "JSON",
        success: function (response) {
            $("#showYearWiseBudget").modal("show");
            $.jgrid.gridUnload('#YearWiseIndividualbudget');
            createYearWiseDataGrid(response, Type);
            $(".project_data").text($('.projname').text());
            $('.year_data').text(Year);
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}


var yearwisebudgetcol = [
    {
        name: 'Department',
        label: 'Department',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Category',
        label: 'Category',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Budget',
        label: 'Budget (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Budget = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return  Budget 
            }
            else {
                return ''
            }
        }
    }
];
var yearwiseexpensecol = [
    {
        name: 'Department',
        label: 'Department',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Category',
        label: 'Category',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Expense',
        label: 'Expenses (INR)',
        width: 60,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue != "" && cellvalue != undefined && cellvalue != null && cellvalue != 0) {
                var Expense = parseFloat(cellvalue).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                return  Expense 
            }
            else {
                return ''
            }
        }
    }
];
function createYearWiseDataGrid(result, type) {
    type.toLowerCase() == 'budget' ? $('#title').text('Budget Details') : $('#title').text('Expense Details')
    $("#YearWiseIndividualbudget").jqGrid({
        url: '',
        datatype: 'local',
        width: 500,
        data: result,
        mtype: 'GET',
        colModel: type.toLowerCase() == 'budget' ? yearwisebudgetcol : yearwiseexpensecol,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_YearWiseIndividualbudget',
        rowNum: result.length,
        scroll: 1,
        footerrow: true,
        userDataOnFooter: true,
        gridComplete: function () {
            var objRows = $("#YearWiseIndividualbudget tbody tr");
            var objHeader = $("#YearWiseIndividualbudget tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var $grid = $('#YearWiseIndividualbudget');
            var typecolumn = '';
            if (type.toLowerCase() == 'budget') {
                typecolumn = $grid.jqGrid('getCol', 'Budget')
            }
            else {
                typecolumn = $grid.jqGrid('getCol', 'Expense')

            }

            //const extractValues = (typecolumn) => {
            //    return typecolumn.map(item => {
            //        const match = item.match(/>([^<]+)</);
            //        return match ? match[1] : null;
            //    });
            //};
            //const values = extractValues(typecolumn);
            var total = 0
            $.each(typecolumn, function (i, obj) {
                if (obj != '' && obj != null) {
                    total = total + parseFloat(obj.replace(/,/g, ''));
                }
            });
            $grid.jqGrid('footerData', 'set', { 'Department': "Total" });
            $grid.jqGrid('footerData', 'set', { 'Category': "" });
            if (type.toLowerCase() == 'budget') {
                $grid.jqGrid('footerData', 'set', { 'Budget': total.toFixed(2) });

            }
            else {
                $grid.jqGrid('footerData', 'set', { 'Expense': total.toFixed(2) });

            }
        }
    });
    $("#YearWiseIndividualbudget").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 128) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "17px");
    }
    else {
        $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }
}

$("#DepartmentBudgetDownload").click(function () {
    var data = $('#YearWiseIndividualbudget').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#YearWiseIndividualbudget").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "YearBudgetDetails.xlsx",
            maxlength: 1000,
        });
    }
});

$(document).on("click", "#YearExcelDownload", function () {
    var data = $('#YearWisebudget').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#YearWisebudget").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "YearWisebudgetInfo.xlsx",
            maxlength: 1000,

        });
    }
});
var RefNos = [];
var Role = $("#Role").val();
var StatusId = "";
var supportingDoc = 0;
var ExpRefId = "";
var LoginId = $("#LoginId").val();
var countOfDeletedfiles = 0
var ExData = $.parseJSON($('#ExpensesRequestData').val());
var ExpensesRefId = 0;
AssignValueToFileds(ExData);
$(".CommonField, .hidepayable, .hiderecievable, #Exp_Add").hide();
var GridData = [];
GridData = ExData;
var DocData = [];
var DocName = "";
var Doc = "";
var UserName = $("#UserName").val();
var LoginId = $("#LoginId").val();
var UTRDocData = [];
var UTRDocName = "";
var UTRDoc = "";

var supportingTypes = ['pdf', 'docx', 'doc', 'xlsx', 'xls', 'jpg', 'jpeg', 'png', 'txt', 'csv', 'ppt', 'pptx'];
var unSupportedViewTypes = {
    'doc': 'Microsoft Word Document',
    'docx': 'Microsoft Word Document',
    'xls': 'Microsoft Excel Spreadsheet',
    'xlsx': 'Microsoft Excel Spreadsheet',
    'csv': 'Microsoft Excel Spreadsheet',
    'ppt': 'Microsoft PowerPoint',
    'pptx': 'Microsoft PowerPoint'
}
var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 1));

$('[data-datepicker-startdate1]').datepicker({
    format: 'dd/mm/yyyy',
    endDate: end,
    autoclose: true
}).on('changeDate', function () {
    $('[data-datepicker-enddate1]').datepicker('setStartDate', $(this).val());
});
$('[data-datepicker-enddate1]').datepicker({
    format: 'dd/mm/yyyy',
    enddate: end,
    autoclose: true
}).on('changeDate', function () {
    $('[data-datepicker-startdate1]').datepicker('setEndDate', $(this).val());
});
$(document).ready(function () {

    $('.data-datepicker-startdate').datepicker({
        todayHighlight: true,
        format: 'dd/mm/yyyy',
        autoclose: true,
    });

    if (StatusId != 0 && StatusId != "130") {
        $("#DepartmentId, #ProjectId , #CategoryId , #EmployeeName, #natureOfExpense").attr("disabled", true);
        $(".prjcatnoe").removeClass('d-flex');
        $(".prjcatnoe").addClass('hide');
        $("#Exp_Save").addClass('hide');
        $("#Exp_Submit").addClass('hide');
    }
    else if (StatusId == '0' || StatusId == "130") {
        $("#Exp_Approve, #Exp_Reject ,#Exp_RollBack").addClass('hide');
    }

});
function AssignValueToFileds(ExData) {

    StatusId = ExData[0].StatusId;
    $("#DepartmentId").val(ExData[0].DepartmentId);
    GetEmployeeName(1);
    ExpensesRefId = ExData[0].ExpensesRefId;

}

var formData = new FormData();

const fields = [
    { Id: "billRefNo", e_Id: "E_billRefNo", NEId: "All" },
    { Id: "actualExp", e_Id: "E_actualExp", NEId: "All" },
    { Id: "otherFee", e_Id: "E_otherFee", NEId: "All" },
    { Id: "UploadDocument", e_Id: "E_UploadDocument", NEId: "All" },
    { Id: "natureOfExpense", e_Id: "E_natureOfExpense", NEId: "All" },
    { Id: "FieldRemarks", e_Id: "E_FieldRemarks", NEId: "All" },
    { Id: "placeOfStay", e_Id: "E_placeOfStay", NEId: "3" },
    { Id: "GSTNo", e_Id: "E_GSTNo", NEId: "3" },
    { Id: "fromDate", e_Id: "E_fromDate", NEId: "3" },
    { Id: "toDate", e_Id: "E_toDate", NEId: "3" },
    { Id: "TransId", e_Id: "E_modeoftrans", NEId: "6" },
    { Id: "purposeTravel", e_Id: "E_purposeTravel", NEId: "6" },
    { Id: "FromLocation", e_Id: "E_FromLocation", NEId: "6" },
    { Id: "ToLocation", e_Id: "E_ToLocation", NEId: "6" }
];
function validateFields() {
    let isValid = true;
    var currentNEId = $("#natureOfExpense").val();

    fields.forEach(({ Id, e_Id, NEId }) => {
        const input = document.getElementById(Id);
        const errorElement = document.getElementById(e_Id);
        if (NEId !== "All" && !NEId.split(",").includes(currentNEId)) {
            return;
        }
        if (input.value.trim() === "" || (input.value.trim() === "0" && Id != "otherFee")) {
            errorElement.classList.remove("hide");
            isValid = false;
        } else {
            errorElement.classList.add("hide");
        }
    });

    var ProjectId = $("#ProjectId").val();
    var CategoryId = $("#CategoryId").val();

    if (CategoryId == 1) { // material
        if (ProjectId == "") {
            isValid = false;
            $("#E_ProjectId").removeClass('hide');
        }
        else {
            $("#E_ProjectId").addClass('hide');
        }
    }
    else {
        $("#E_ProjectId").addClass('hide');
    }

    return isValid;
}

$(document).on('change', "#DepartmentId, #CategoryId, #ProjectId ,#EmployeeName", function () {

    var elementId = $(this).attr('id');
    var elementValue = $.trim($(this).val());

    switch (elementId) {
        case "ProjectId":
            elementValue !== "" ? ($("#E_ProjectId").addClass('hide')) : '';
            break;
        case "DepartmentId":
            elementValue !== "" ? ($("#E_department").addClass('hide')) : '';
            break;
        case "CategoryId":
            elementValue !== "" ? ($("#E_category").addClass('hide')) : '';
            break;
        case "EmployeeName":
            elementValue !== "" ? ($("#E_EmployeeName").addClass('hide')) : '';
            break;
    }
});

$(document).on('change', "#UploadDocument", function () {
    $("#UploadDocument").val() === "" ? ($("#E_UploadDocument").removeClass('hide'), flag = true) : $("#E_UploadDocument").addClass('hide');
});

$(document).on('keyup', "#natureOfExpense, #billRefNo, #placeOfLandB, #actualExp, #otherFee, #purposeTravel,#FromLocation, #ToLocation, #localConvey, #placeOfStay, #GSTNo, #Remarks", function () {
    var elementId = $(this).attr('id');
    var errorElementId = `#E_${elementId}`;
    var elementValue = $.trim($(this).val());

    if (elementValue != "") {
        $(errorElementId).addClass('hide');
    }
});

$(document).on('change', "#CategoryId", function () {
    $(".F_Value").val('');
    $("#TransId").val('').select2();
    var CategoryId = $("#CategoryId").val();

    if (CategoryId == 5) { // rem
        $(".prj_star").hide();
    }
    else {
        $(".prj_star").show();
    }
    $("#nature-of-exp-fields").addClass('hide');
    GetExpensesMasterData();
});
function GetExpensesMasterData() {

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetExpesnesMasterData",
        dataType: "JSON",
        data: {
            ExpensesRefId: $("#ExpensesRefId").val(),
            ProjectId: '',// passing as empty
            Department: $("#DepartmentId").val(),
            CategoryId: $("#CategoryId").val()
        },
        success: function (result) {

            $("#ExpensesRefId").val(result.ExpensesRefId);

            let billRefNo = result.BillrefNo;
            RefNos = billRefNo?.split(',');

            var NatureOfExpList = $.parseJSON(result.NatureOfExp)
            $("#natureOfExpense option.NEOption").remove();
            var NatureOfExp = "";

            if (NatureOfExpList.length != 0) {
                $.each(NatureOfExpList, function (i, obj) {
                    NatureOfExp = '<option class="NEOption" value="' + obj.Key + '">' + obj.Description + '</option>';
                    $(".addNEOption").append(NatureOfExp);
                });
            }

        }
    });

}

function onlyNumbers(evt) {
    var e = event || evt;
    var charCode = e.which || e.keyCode;
    var currentValue = evt.value;
    if (charCode == 46 && (currentValue.indexOf(".") !== -1 || currentValue.length === 0)) {
        return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }
    return true;
}
function validateFileUpload() {
    var flag = true;
    var supportedExtention = ['pdf', 'doc', 'docx', 'xls', 'txt', 'xlsx', 'ppt', 'zip', 'jpg', 'jpeg', 'png', 'csv'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#UploadDocument`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            alert("Please upload a valid file");
            $(`#UploadDocument`).val('');

            flag = false;

            return false;
        }
    });

    if (flag) {

        for (var i = 0; i < $(`#UploadDocument`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#UploadDocument`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#UploadDocument').val('');
                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#UploadDocument`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#UploadDocument`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = "100" + fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });
            Doc = fileName;
            Array.from(filesArray).forEach(function (item) {
                var Id = GridData.length + 1
                DocData = DocData.filter(m => m.DetailsId !== Id);
                DocData.push({
                    DetailsId: GridData.length + 1,
                    File: item,
                    DocId: GridData.length + 1 + "_S",

                })
                DocName = item;
            })
        }
    }
}
function SupportingDocument(DetailsId) {
    var data = GridData.filter(m => m.DetailsId == DetailsId)
    createFileModalGrid(data)
    $("#Document_Popup").modal('show');
}
function createFileModalGrid(data) {
    $.jgrid.gridUnload('#Grid_Expense_Document');

    $("#Grid_Expense_Document").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: SupportingColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#Grid_Expense_Document_pager',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#Grid_Expense_Document tbody tr");
            var objHeader = $("#Grid_Expense_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '35vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 300) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

    $("#Grid_Expense_Document").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}

$("#Advance, #actualExp, #otherFee, #localConvey").change(function () {
    CalculateNetAmount();
});
function CalculateNetAmount() {
    var Advance = parseFloat($("#Advance").val().replaceAll(',', '') || 0);
    var Actual = parseFloat($("#actualExp").val().replaceAll(',', '') || 0);
    var OtherFee = parseFloat($("#otherFee").val().replaceAll(',', '') || 0);
    //var Localconvey = parseFloat($("#localConvey").val().replaceAll(',', '') || 0);

    var total = 0;
    total = Advance - Actual - OtherFee;
    if (total == 0) {
        $('.hiderecievable').hide();
        $('.hidepayable').hide();
    }
    else if (total > 0) {
        $('.hiderecievable').show();
        $('.hidepayable').hide();
        $("#receivable").val(total.toFixed(3));
        $("#Payable").val('0');
    }
    else {
        $('.hidepayable').show();
        $('.hiderecievable').hide();
        $("#receivable").val('0');
        $("#Payable").val(-total.toFixed(3));
    }
}
function CalculateNET(Advance, Actual, OtherFee) {
    var total = 0;
    total = Advance - Actual - OtherFee;
    return total;
}
function GetFiledValues() {
    var data = [];
    data.push({
        ProjectId: $("#ProjectId").val(),
        CategoryId: $("#CategoryId").val(),
        ExpensesRefId: ExpensesRefId,
        BillrefNo: $("#billRefNo").val()?.trim() || "",
        NatureOfExpenses: $("#natureOfExpense").val()?.trim() || "",
        Advance: $("#Advance").val()?.trim() || "",
        ActualExpenses: $("#actualExp").val()?.trim() || "",
        Otherfee: $("#otherFee").val()?.trim() || "",
        ModeofFare: $("#TransId").val()?.trim() || "",
        PurposeOfTravel: $("#purposeTravel").val()?.trim() || "",
        FromLocation: $("#FromLocation").val()?.trim() || "",
        ToLocation: $("#ToLocation").val()?.trim() || "",
        PlaceOfLAndB: $("#placeOfLandB").val()?.trim() || "",
        LocalconveyCharges: $("#localConvey").val()?.trim() || "",
        TravelDate: $("#TravelDate").val()?.trim() || ""
    });
    return data;
}
function ValidateSave() {

    var flag = true;

    var DepartmentId = $("#DepartmentId").val();
    var EmployeeId = $("#EmployeeName").val();

    DepartmentId == "" ? ($("#E_department").removeClass('hide'), flag = false) : $("#E_department").addClass('hide');
    EmployeeId == "" ? ($("#E_EmployeeName").removeClass('hide'), flag = false) : $("#E_EmployeeName").addClass('hide');

    if (GridData.length == 0) {
        $(".Grid_validation").removeClass('hide');
        flag = false;
    }

    if (flag) {

        var formData = new FormData();

        $(".F_Error").addClass('hide');
        var ApprovalFlow = [{
            FromStage: StatusId,
            Action: "Save",
            IsSave: "Y"
        }];

        var RequestData = GridData
        confirm("Are you sure you want to save?", function () {

            DocData.forEach(doc => {
                if (doc.File) {
                    formData.append(`${doc.DetailsId}`, doc.File);
                }
            });
            UTRDocData.forEach(doc => {
                if (doc.File) {
                    formData.append(`${doc.DetailsId}_U`, doc.File);
                }
            });
            $('#ConfirmOKbutton').prop("disabled", true);
            formData.append("RequestedData", JSON.stringify(RequestData));
            formData.append("ApprovalFlow", JSON.stringify(ApprovalFlow));
            formData.append("DocData", JSON.stringify(DocData));
            formData.append("DepartmentId", DepartmentId);
            formData.append("EmployeeCode", EmployeeId);
            formData.append("ExpRefNo", $("#ExpensesRefId").val());
            formData.append("UTRDocData", JSON.stringify(UTRDocData))

            $.ajax({
                url: ROOT + "NewProjectInitiation/InsertExpensesRequestData",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.toLowerCase().includes('success')) {
                        window.location.href = ROOT + "NewProjectInitiation/ExpensesRequestList";
                    }
                    else {
                        alert(result);
                    }
                }
            });

        });
    }
}
function ValidateSubmit() {

    var flag = true;

    var DepartmentId = $("#DepartmentId").val();
    var EmployeeId = $("#EmployeeName").val();

    DepartmentId == "" ? ($("#E_department").removeClass('hide'), flag = false) : $("#E_department").addClass('hide');
    EmployeeId == "" ? ($("#E_EmployeeName").removeClass('hide'), flag = false) : $("#E_EmployeeName").addClass('hide');

    if (GridData.length == 0) {
        $(".Grid_validation").removeClass('hide');
        flag = false;
    }

    if (flag) {

        var role = Role.toLowerCase().trim();
        var action = role === 'hod' ? "L2Submit" : "L1Submit";

        var ApprovalFlow = [{
            FromStage: StatusId,
            Action: action,
            IsSave: "N"
        }];

        const modalMessage = "Are you sure you want to send for approval?";

        const modalTitle = "Submit Confirmation";
        ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow);

    }
}
function ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow) {

    $("#ApproveModal").modal('show');
    $("#ModalLabel").text(modalTitle);
    $(".modalmsg").text(modalMessage);

    $('#ByClick_OK').off('click').on('click', function () {
        const Remarks = $("#ApprovalRemarks").val().trim();

        if (!Remarks) {
            $("#E_ApprovalRemarks").show();
            return;
        }
        $("#ByClick_OK").prop("disabled", true);
        var RequestData = GridData;

        DocData.forEach(doc => {
            if (doc.File) {
                formData.append(`${doc.DetailsId}`, doc.File);
            }
        });
        UTRDocData.forEach(doc => {
            if (doc.File) {
                formData.append(`${doc.DetailsId}_U`, doc.File);
            }
        });

        formData.append("RequestedData", JSON.stringify(RequestData));
        formData.append("ApprovalFlow", JSON.stringify(ApprovalFlow));
        formData.append("DocData", JSON.stringify(DocData));
        formData.append("Remarks", Remarks);
        formData.append("DepartmentId", $("#DepartmentId").val());
        formData.append("EmployeeCode", $("#EmployeeName").val());
        formData.append("ExpRefNo", $("#ExpensesRefId").val());
        formData.append("UTRDocData", JSON.stringify(UTRDocData))

        $.ajax({
            url: ROOT + "NewProjectInitiation/InsertExpensesRequestData",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                if (result.toLowerCase().includes('success')) {
                    window.location.href = ROOT + "NewProjectInitiation/ExpensesRequestList";
                }
                else {
                    alert(result);
                }
            }
        });
    });
}
function ValidateApprove() {

    var role = Role.toLowerCase().trim();
    var Actual = parseFloat($("#actualExp").val().replaceAll(',', '') || 0);
    var OtherFee = parseFloat($("#otherFee").val().replaceAll(',', '') || 0);

    var NETAmount = Actual + OtherFee;

    if (role == "hod") {
        action = "Pending"
        ApprovalFlow = {
            FromStage: StatusId,
            Action: action,
            IsSave: "N"
        };
    }
    else if (role == "r&d admin") {
        action = "L2Approve";
        ApprovalFlow = {
            FromStage: StatusId,
            Action: action,
            IsSave: "N"
        };

    }
    const modalMessage = (role != "r&d admin")
        ? "Are you sure you want to send for R&D Admin Approval?"
        : "Are you sure you want to Approve?";

    const modalTitle = "Approve Confirmation";
    ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow);
}
function validateCommonFields(RequestData) {
    if (!validateFields()) return false;
    if ($("#UploadDocument").val().trim() === "" && supportingDoc === 0) {
        $("#E_UploadDocument").removeClass('hide');
        return false;
    }
    if (RefNos.includes(RequestData[0]?.BillrefNo)) {
        alert("Bill ref. number is already present");
        return false;
    }
    return true;
}
function ValidateRoleBack() {
    // const RequestData = GetFiledValues();
    // if (!validateCommonFields(RequestData)) return;
    var role = Role.toLowerCase().trim();
    var action = role === 'hod' ? "L1RollBack" : "L2RollBack";
    var ApprovalFlow = [{
        FromStage: StatusId,
        Action: action,
        IsSave: "N"
    }];

    const modalMessage = "Are you sure you want to Roll Back?";

    const modalTitle = "Roll Back Confirmation";
    ShowModalAndHandleSubmit(modalTitle, modalMessage, ApprovalFlow);
}

$(window).on('hidden.bs.modal', function () {
    $("#ApprovalRemarks").val('');
    $("#E_ApprovalRemarks").hide();
});

SupportingColModels = [
    {
        name: 'DocumentName',
        label: 'Document',
        resizable: true,
        ignoreCase: true,
        width: 150,
    },
    {
        name: 'DocCreatedBy',
        label: 'Uploaded By',
        width: 55,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DocCreatedOn',
        label: 'Uploaded On',
        resizable: true,
        ignoreCase: true,
        width: 75
    },
    {
        name: '',
        label: 'Action',
        width: 35,
        search: false,
        resizable: true,
        ignoreCase: true,
        classes: "DownloadFile",
        formatter: function (cellvalue, options, rowobject) {
            var fileName = rowobject.DocumentName;
            var fileExtension = fileName.split('.').pop().toLowerCase();

            return `
                    <div class="d-flex action_icons align-items-center justify-content-center">
                        <span class="mr-2" role="button" onclick="DownloadVendorDoc(${rowobject.DetailsId})">
                            <i class="fas fa-download download-pr-file-item color-download" title="Download"></i>
                        </span>
                        ${(fileExtension in unSupportedViewTypes) ? `` :
                    `<span class="mr-2" role="button" onclick="ViewVendorDoc(${rowobject.DetailsId})">
                                <i class="fas fa-eye view-pr-file-item color-eye" title="View"></i>
                            </span>`
                }
                    </div>`;
        }
    },

]
function ShowExpensesFileGrid(data) {
    $.jgrid.gridUnload('#Grid_Expense_Document');
    $('#Grid_Expense_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: SupportingColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#Grid_Expense_Document_pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_Expense_Document tbody tr");
            var objHeader = $("#Grid_Expense_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
    }
}
function ShowExpensesFiles(ExpensesRefId) {
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetExpenseFiles",
        data: {
            ExpenseRefId: ExpensesRefId
        },
        success: function (result) {
            $('#Document_Popup').modal('show');
            ShowExpensesFileGrid(result);
        }
    });
}

$("#ShowSupportingDoc").on("click", function () {
    ShowExpensesFiles(ExpensesRefId)
})
function Deletedoc(docName, docId) {
    confirm("Are you sure you want to delete?", function () {
        $.ajax({
            url: ROOT + 'NewProjectInitiation/DeleteSupportingDoc',
            data: {
                ExpensesRefId: ExpensesRefId,
                docName: docName,
                docId: docId
            },
            type: 'GET',
            success: function (result) {
                if (result.includes("Successfully")) {
                    supportingDoc = supportingDoc - 1
                    ShowExpensesFiles(ExpensesRefId);
                    alert(result);
                }
                else {
                    alert(result);
                }
            }
        });
    })
}
function viewdoc(docdata) {
    var fileName = docdata.getAttribute("data-filename");
    $.ajax({
        url: ROOT + 'NewProjectInitiation/ViewExpensesFile',
        data: {
            docName: fileName
        },
        type: 'GET',
        success: function (result) {
            var fileUrl = ROOT + result;
            window.open(fileUrl, '_blank');
        }
    });
}
function downloadoc(docdata) {
    var fileName = docdata.getAttribute("data-filename");
    $.ajax({
        url: ROOT + 'NewProjectInitiation/DownloadExpensesFile',
        data: {
            docName: fileName
        },
        type: 'GET',
        success: function (result) {
            window.location.href = ROOT + "NewProjectInitiation/DownloadExpensesFile?docName=" + fileName;

        }
    });
}
function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function MakeAsMoney(number) {

    if (number != null && number != "" && number != undefined) {
        return parseFloat(number).toLocaleString('en-IN', { maximumFractionDigits: 0 })
    }
    else if (number == 0) {
        return 0;
    }
    return "";
}
$(document).on('change', "#TransId", function () {
    $("#TransId").val() == "" ? $("#E_modeoftrans").removeClass('hide') : $("#E_modeoftrans").addClass('hide')
});

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        ignoreCase: true,
        width: 90,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="action_icons grid-icons-group action_icons align-items-left">' +
                ((StatusId == 0 || StatusId == "130") ? '<a onclick="OnDeleteExpData(' + rowobject.DetailsId + ')" class="btn_button" title="Delete"><i class="fa fas fa-trash color-delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' : '') +
                '<a onclick=SupportingDocument(' + rowobject.DetailsId + ') class="btn_button" title="Supporting Document"><i class="fa fas fa-file color-green" aria-hidden="true"></i><span class="sr-only">Info</span></a>' +
                '<span class="mr-2 cancelrow project_close hide cancelrow_' + rowobject.DetailsId + '"  data-lineno="' + rowobject.DetailsId + '"  title="Close" ><i class="fas fa-times-circle color-history"></i></span>' +
                '<span onclick=FetchData(' + options.rowId + ') class="mr-2 saverow project_save hide saverow_' + rowobject.DetailsId + '" data-lineno="' + rowobject.DetailsId + '" title="Save" ><i class="fas fa-save color-file"></i></span>' +
                '</div> ';
        }
    },
    {
        name: 'ProjectId',
        label: 'Project',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'Category',
        label: 'Category',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'NatureOfExpenses',
        label: 'Nature Of Expenses',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'BillrefNo',
        label: 'Bill ref. No',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            return `
            <span class="text_class">${cellvalue}</span>
            <div class="Edit_class hide">
            <input type="text" class="form-control" value="${cellvalue}" title = "${cellvalue}" onpaste="return false;"/></div>
        `;
        },
    },
    {
        name: 'Advance',
        label: 'Advance',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ActualExpenses',
        label: 'Actual Expenses (INR)',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'Otherfee',
        label: 'Other Fee (INR)',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'NetPaytoInitiator',
        label: 'Net Payable to Initiator (INR)',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            var Amount = CalculateNET(rowobject.Advance, rowobject.ActualExpenses, rowobject.Otherfee)
            return (Amount < 0) ? -Amount : "NA"
        }
    },
    {
        name: 'NetReceiveFromInitiator',
        label: 'Net Receivable From Initiator (INR)',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            var Amount = CalculateNET(rowobject.Advance, rowobject.ActualExpenses, rowobject.Otherfee)
            return (Amount > 0) ? Amount : "NA"
        }
    },
    {
        name: 'UTRNo',
        label: 'UTR No.',
        resizable: true,
        ignoreCase: true,
        width: 90,
    },
    {
        name: 'FieldRemarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        width: 90,
    },
    {
        name: 'PlaceOfStay',
        label: 'Place Of Stay',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'GSTNo',
        label: 'GST No.',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'FromDate',
        label: 'From Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ToDate',
        label: 'To Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },

    {
        name: 'TravelDate',
        label: 'Date of Travel',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ModeofFare',
        label: 'Mode Of Travel',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'PurposeOfTravel',
        label: 'Purpose of Travel',
        resizable: true,
        ignoreCase: true,
        width: 150,
    },
    {
        name: 'FromLocation',
        label: 'Travelling From',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ToLocation',
        label: 'Travelling To',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: '',
        label: 'UTR Document',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            var fileName = rowobject.UTRDocument;
            var fileExtension = fileName ? fileName.split('.').pop().toLowerCase() : '';

            if (fileName) {
                return `
                <div class="d-flex action_icons align-items-center justify-content-center" title="${fileName}">
                    <span class="mr-2" role="button" onclick="DownloadUTRDoc(${rowobject.DetailsId})">
                        <i class="fas fa-download download-pr-file-item color-download" title="UTR Document Download"></i>
                    </span>
                    ${!(fileExtension in unSupportedViewTypes) ? `
                    <span class="mr-2" role="button" onclick="ViewUTRDoc(${rowobject.DetailsId})">
                        <i class="fas fa-eye view-pr-file-item color-eye" title="UTR Document View"></i>
                    </span>` : ''}
                </div>`;
            }

            return '';
        }
    }
]
GetExpensesGrid(ExData)
function GetExpensesGrid(data) {
    $.jgrid.gridUnload('#ExpensesData_grid');
    $("#ExpensesData_grid").jqGrid({
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#ExpensesData_pager',
        rowNum: 1000,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ExpensesData_grid tbody tr");
            var objHeader = $("#ExpensesData_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
    });

    $("#ExpensesData_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('#ProductGroup_Grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-200px + 100vh)' });
    $('#ProductGroup_Grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#audit_trail').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#ProductGroup_Grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#ProductGroup_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#ProductGroup_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }
}
function OnEditExpData(DetailsId) {
    var index = GridData.findIndex(m => m.DetailsId === DetailsId);
    if (index >= 0) {
        $(".text_class").addClass('hide');
        $(".Edit_class").removeClass('hide');
    }
}
$(document).on('click', '.edit_info', function () {
    $(this).closest(".ui-widget-content").find(".Edit_class").removeClass("hide");
    $(this).closest(".ui-widget-content").find(".text_class").addClass("hide");
    $(this).closest(".grid-icons-group").find(".prject-close").removeClass("hide");
    $(this).closest(".grid-icons-group").find(".prject-close").removeClass("hide");
    $(this).closest(".grid-icons-group").find(".edit_info").addClass("hide");
});

function GetExpenseDataForApproval(expensesRefId) {

    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetExpenseRequestDataById",
        dataType: "JSON",
        data: {
            ExpenseRefId: expensesRefId
        },
        success: function (result) {

            if (result) {

                $("#ProjectId").val(result.Header[0]?.ProjectId)
                $("#DepartmentId").val(result.Header[0]?.DepartmentId)
                $("#CategoryId").val(result.Header[0]?.CategoryId);
                $("#Employee").val(result.Header[0]?.Employee);

                CreateJqgridForApprovalView(result.Details);
            }
            else {
                alert(result);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}

$(document).on('click', "[app-flow-btn]", function () {

    var btnName = $(this).attr('buttonName');
    var role = Role.toLowerCase().trim();

    // approve
    if (btnName == "1") {

        if (role == "hod") {
            action = "Pending"
            ApprovalFlow = {
                FromStage: StatusId,
                Action: action,
                IsSave: "N"
            };
        }
        else if (role == "r&d admin") {
            action = "L2Approve";
            ApprovalFlow = {
                FromStage: StatusId,
                Action: action,
                IsSave: "N"
            };

        }
        const modalMessage = (role != "r&d admin")
            ? "Are you sure you want to send for R&D Admin Approval?"
            : "Are you sure you want to Approve?";

        const modalTitle = "Approve Confirmation";
        HandelAction(modalTitle, modalMessage, ApprovalFlow);

    }
    // roleback
    else if (btnName == "2") {

        var action = role === 'hod' ? "L1RollBack" : "L2RollBack";

        var ApprovalFlow = [{
            FromStage: StatusId,
            Action: action,
            IsSave: "N"
        }];

        const modalMessage = "Are you sure you want to Roll Back?";
        const modalTitle = "Roll Back Confirmation";

        HandelAction(modalTitle, modalMessage, ApprovalFlow);

    }

});
function HandelAction(modalTitle, modalMessage, ApprovalFlow) {

    $("#ApproveModal").modal('show');
    $("#ModalLabel").text(modalTitle);
    $(".modalmsg").text(modalMessage);

    $('#ByClick_OK').off('click').on('click', function () {

        const Remarks = $("#ApprovalRemarks").val().trim();
        if (!Remarks) {
            $("#E_ApprovalRemarks").show();
            return;
        }
        $(this).prop('disabled', true);

        $.ajax({
            url: ROOT + "NewProjectInitiation/ApproveOrRejectTheExpenses",
            type: "POST",
            datatype: "text",
            data: {
                Remarks: Remarks,
                ApprovalFlow: JSON.stringify(ApprovalFlow),
                ExpensesRefId: ExpensesRefId
            },
            success: function (result) {
                if (result.toLowerCase().includes('success')) {
                    window.location.href = ROOT + 'NewProjectInitiation/ExpensesRequestList';
                }
                else {
                    alert(result);
                }
            },
            error: function (xhr, status, error) {
                alert("Error Occured: " + error);
            }
        });
    });
}
function ValidateAdd() {

    if (!validateBillRefNo()) return;
    if (!validateFields()) return;
    var RequestData = GetFiledValuesForGrid();
    var ExpData1 = $("#ExpensesData_grid").jqGrid('getGridParam', 'data');
    var ExpData2 = $.merge(RequestData, ExpData1);
    GridData = [];
    GridData = ExpData2
    GetExpensesGrid(ExpData2);
    var HideField = {
        "1": ".CommonField",
        "3": ".showforHotel",
        "6": ".showforTravel"
    };
    $.each(HideField, function (key, selector) {
        $(selector).addClass('hide');
    });

    $(".Grid_validation").hide();
    $('.hiderecievable').hide();
    $('.hidepayable').hide();

    $("#natureOfExpense").val('').select2();
    $("#TransId").val('').select2();
    $(".F_Value").val("");
    $("#ProjectId").val("").change();
    $("#CategoryId").val("").change();

    $("#Exp_Add").hide();
}
function validateBillRefNo() {
    billRefNo = $.trim($("#billRefNo").val());
    if (RefNos.includes(billRefNo)) {
        alert("Bill ref. number is already present");
        return false;
    }
    if (GridData.some(row => row.BillrefNo === billRefNo)) {
        alert("Bill ref. number is already present");
        return false;
    }
    return true;
}
function OnDeleteExpData(DetailsId) {
    confirm("Are you sure you want to delete?", function () {
        GridData = GridData.filter(item => item.DetailsId != DetailsId);
        GetExpensesGrid(GridData);
    });
}

$(document).on("change", "#natureOfExpense", function () {
    $(".F_Value").val('');
    $("#TransId").val('').select2();
    fields.forEach(({ Id, e_Id, NEId }) => {
        const errorElement = document.getElementById(e_Id);
        errorElement.classList.add("hide");
    });

    var selectedNEval = $("#natureOfExpense").val();

    $("#nature-of-exp-fields").removeClass('hide');

    $('.hidepayable').hide();
    $('.hiderecievable').hide();
    $('.CommonField').show();

    selectedNEval != "" ? $("#Exp_Add").show() : $("#Exp_Add").hide();

    var showMap = {
        "1": ".CommonField",
        "2": ".CommonField",
        "4": ".CommonField",
        "5": ".CommonField",
        "3": ".showforHotel,.CommonField",
        "6": ".showforTravel, .CommonField"
    };
    $.each(showMap, function (key, selector) {
        $(selector).addClass('hide');
    });

    if (showMap[selectedNEval]) {
        $(showMap[selectedNEval]).removeClass('hide');
    }
    else {
        $(showMap[selectedNEval]).addClass('hide');
    }
});
function GetFiledValuesForGrid() {
    var data = [];
    var val = $("#natureOfExpense").val();
    var name = $("#natureOfExpense option[value='" + val + "']").text();
    var mode = $("#TransId").val()?.trim();
    var modeName = mode == "" ? "" : $("#TransId option[value='" + mode + "']").text();
    var catVal = $("#CategoryId").val();
    data.push({
        DetailsId: GridData.length + 1,
        ProjectId: $("#ProjectId").val(),
        CategoryId: catVal,
        Category: $("#CategoryId option[value='" + catVal + "']").text(),
        ExpensesRefId: $("#ExpensesRefId").val(),
        BillrefNo: $("#billRefNo").val()?.trim() || "",
        NatureOfExpenses: name.trim() || "",
        Advance: $("#Advance").val()?.trim() || "",
        ActualExpenses: $("#actualExp").val()?.trim() || "",
        Otherfee: $("#otherFee").val()?.trim() || "",
        ModeofFareId: mode,
        ModeofFare: modeName || "",
        PurposeOfTravel: $("#purposeTravel").val()?.trim() || "NA",
        FromLocation: $("#FromLocation").val()?.trim() || "NA",
        ToLocation: $("#ToLocation").val()?.trim() || "NA",
        PlaceOfLAndB: $("#placeOfLandB").val()?.trim() || "NA",
        LocalconveyCharges: $("#localConvey").val()?.trim() || "NA",
        TravelDate: $("#TravelDate").val()?.trim() || "NA",
        NetPaytoInitiator: $("#Payable").val()?.trim() || "NA",
        NetReceiveFromInitiator: $("#receivable").val()?.trim() || "NA",
        PlaceOfStay: $("#placeOfStay").val()?.trim() || "NA",
        GSTNo: $("#GSTNo").val()?.trim() || "NA",
        FromDate: $("#fromDate").val()?.trim() || "NA",
        ToDate: $("#toDate").val()?.trim() || "NA",
        FieldRemarks: $("#FieldRemarks").val()?.trim() || "NA",
        SupportingDoc: DocName,
        DocumentName: Doc,
        UTRNo: $("#UTRNo").val()?.trim() || "NA",
        UTRDoc: UTRDocName,
        UTRDocument: UTRDoc
    });
    return data;
}
function downloadFile(file) {
    try {
        const fileURL = URL.createObjectURL(file);
        let a = document.getElementById('hiddenDownloadLink');
        if (!a) {
            a = document.createElement('a');
            a.id = 'hiddenDownloadLink';
            a.style.display = 'none';
            document.body.appendChild(a);
        }

        a.href = fileURL;
        a.download = file.name || 'download';
        a.click();
        setTimeout(() => URL.revokeObjectURL(fileURL), 1000);
    } catch (error) {
    }
}
function ViewVendorDoc(DetailsId) {
    const item = GridData.filter(m => m.DetailsId == DetailsId);
    var data = item[0]?.DocumentName;
    var savedIndex = DocData.findIndex(item => item.DetailsId == DetailsId);
    if (data) {
        if (savedIndex !== -1) {
            var data = item.supportingDoc;
            var fileUrl = URL.createObjectURL(data);
            window.open(fileUrl, '_blank');
            URL.revokeObjectURL(fileUrl);
        }
        else {
            var url = ROOT + 'BudgetRequestFiles/' + data;
            window.open(url, '_blank');
        }
    }
}
function DownloadVendorDoc(DetailsId) {
    // Check if the document exists in DocData
    var savedIndex = DocData.findIndex(item => item.DetailsId == DetailsId);

    if (savedIndex !== -1) {
        const item = GridData.find(m => m.DetailsId === DetailsId);
        const data = item?.SupportingDoc;

        if (data) {
            downloadFile(data); // Local download
        } else {
            console.warn("SupportingDoc not found for DetailsId:", DetailsId);
        }
    } else {
        const item = GridData.find(m => m.DetailsId == DetailsId);

        if (item && item.DocumentName) {
            const fileName = encodeURIComponent(item.DocumentName); // handle special characters
            window.location.href = ROOT + "NewProjectInitiation/DownloadPRVendorFile?DocumentName=" + fileName;
        } else {
            console.warn("Document not found for DetailsId:", DetailsId);
        }
    }
}
function downloadFile(file) {
    try {
        const fileURL = URL.createObjectURL(file);
        let a = document.getElementById('hiddenDownloadLink');
        if (!a) {
            a = document.createElement('a');
            a.id = 'hiddenDownloadLink';
            a.style.display = 'none';
            document.body.appendChild(a);
        }

        a.href = fileURL;
        a.download = file.name || 'download';
        a.click();
        setTimeout(() => URL.revokeObjectURL(fileURL), 1000);
    } catch (error) {
    }
}

$(document).on("change", "#DepartmentId", function () {
    GetEmployeeName(2);
});
function GetEmployeeName(flag) {

    //flag 1 ---> on load
    //flag 2 ---> on change

    var DepartmentId = $("#DepartmentId").val();
    if (DepartmentId != "") {
        $.ajax({
            type: "POST",
            url: ROOT + "NewProjectInitiation/GetEmployeeData",
            dataType: "JSON",
            async: false,
            data: {
                DepartmentId: $("#DepartmentId").val(),
            },
            success: function (result) {

                $("#EmployeeName option.EmpOption").remove();
                var Employee = "";
                if (result.length != 0) {
                    $.each(result, function (i, obj) {

                        if (flag == 2) {
                            Employee += '<option class="EmpOption" value="' + obj.ID + '">' + obj.Name + '</option>';
                        }
                        else {
                            if (obj.ID != ExData[0].EmployeeName)
                                Employee += '<option class="EmpOption" value="' + obj.ID + '">' + obj.Name + '</option>';
                            else
                                Employee += '<option class="EmpOption" selected value="' + obj.ID + '">' + obj.Name + '</option>';
                        }

                    });
                }
                $(".addEmpOption").append(Employee);

            }
        });
    }
}
function validateUTRFileUpload() {
    var supportedExtention = ['pdf', 'doc', 'docx', 'xls', 'txt', 'xlsx', 'ppt', 'zip', 'jpg', 'jpeg', 'png', 'csv'];
    var files = $(`#UTRUploadDocument`).get(0).files;

    if (files.length === 0) {
        alert("Please select a file to upload.");
        return false;
    }
    var file = files[0];
    var ext = file.name.split('.').pop().toLowerCase();
    if ($.inArray(ext, supportedExtention) === -1) {
        alert("Please upload a valid file");
        $(`#UTRUploadDocument`).val('');
        return false;
    }

    var fileSizeKB = file.size / 1024;
    if (fileSizeKB > 5120) { // 5 MB = 5120 KB
        alert("The file size should be less than 5 MB.");
        $('#UTRUploadDocument').val('');
        return false;
    }
    var fileName = file.name.toString().split('\\').pop();
    UTRDoc = fileName;
    Array.from(files).forEach(function (item) {
        var Id = GridData.length + 1
        UTRDocData = UTRDocData.filter(m => m.DetailsId !== Id);
        UTRDocData.push({
            DetailsId: GridData.length + 1,
            File: item,
            DocId: GridData.length + 1 + "_U",

        })
        UTRDocName = item;
    })
}

function ViewUTRDoc(DetailsId) {
    const item = GridData.find(m => m.DetailsId == DetailsId);
    var data = item?.UTRDocument;
    var savedIndex = UTRDocData.findIndex(item => item.DetailsId == DetailsId);
    if (data) {
        if (savedIndex !== -1) {
            var data = item.UTRDoc;
            var fileUrl = URL.createObjectURL(data);
            window.open(fileUrl, '_blank');
            URL.revokeObjectURL(fileUrl);
        }
        else {
            var url = ROOT + 'BudgetRequestFiles/' + data;
            window.open(url, '_blank');
        }
    }
}
function DownloadUTRDoc(DetailsId) {
    const item = GridData.find(m => m.DetailsId == DetailsId);
    const data = item?.UTRDocument;
    var savedIndex = UTRDocData.findIndex(item => item.DetailsId == DetailsId);
    if (savedIndex !== -1) {
        if (data) {
            downloadFile(data); // Local download
        } else {
            console.warn("SupportingDoc not found for DetailsId:", DetailsId);
        }
    }
    else {
        const item = GridData.find(m => m.DetailsId == DetailsId);
        if (item && item.UTRDocument) {
            const fileName = encodeURIComponent(item.UTRDocument); // handle special characters
            window.location.href = ROOT + "NewProjectInitiation/DownloadPRVendorFile?DocumentName=" + fileName;
        } else {
            console.warn("Document not found for DetailsId:", DetailsId);
        }
    }
}
// variables
var userRole = "";
var loginId = "";
var prHeaderId = 0;
var prInitiatedBy = "";
var todayDate = new Date();

var selectedProjectId = 0;
var selectedMat = 0;
var lastDetailId = 0;
var lastVendorDetailId = 0;

var latestDepartment = "";
var changedDepartment = "";
var flagDepartment = true;

var latestCategory = "";
var changedCategory = "";
var flagCategory = true;

var oldValue = "";
var oldValueDesc = "";
var newValue = "";
var newValueDesc = "";

var purchaseGroup = "";

// arrays
var dropDownArray = [];
var latestFilteredMatArray = [];
var headerArray = [];
var detailsArray = [];
var documentArray = [];
var documentFilesArray = [];
var remarksArray = [];

var alreadySavedData = [];

// var for file uploads
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

$(document).ready(function () {

    userRole = $("#Role").val()?.toLowerCase();
    loginId = $("#LoginId").val();
    prHeaderId = parseInt($("#PRHeaderId").val());

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetPRCreationData",
        dataType: "JSON",
        async: false,
        data: {
            prHeaderId: prHeaderId
        },
        success: function (result) {

            alreadySavedData = result;
            dropDownArray = result.PRDropdownList;

            if (prHeaderId > 0) {
                headerArray = structuredClone(result.PRHeaderList);
                detailsArray = structuredClone(result.PRDetailsList);
                documentArray = structuredClone(result.PRDocumentList);
            }

            if (detailsArray.length > 0) {
                lastDetailId = Math.max.apply(Math, detailsArray.map(function (item) {
                    return item.DetailId;
                }));
            }

            if (documentArray.length > 0) {
                lastVendorDetailId = Math.max.apply(Math, documentArray.map(function (item) {
                    return item.VendorDetailId;
                }));
            }

            if (prHeaderId == 0) {
                headerArray.push({
                    Department: "",
                    Category: 0,
                    Priority: 0,
                    MaterialType: "",
                    StatusId: 0 // if pr header is 0 then it is in initial stage
                });
            }
            else {
                latestCategory = headerArray[0]?.Category;
                latestDepartment = headerArray[0]?.Department;

                prInitiatedBy = headerArray[0]?.PRInitiatedBy;

                $("#department").val(headerArray[0]?.Department).change();
                $("#priority").val(headerArray[0]?.Priority).change();
                $("#category").val(headerArray[0]?.Category).change();
            }

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }

    });

    CreateJqgrid(detailsArray);
    InitializeAutocompleteDatepicker();

});

//----------------------------------------------------------Helper functions
function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function generateSingleSelectOptions(Type, selectedValue, parent = "") {

    var list = dropDownArray.filter(item =>
        item.Type.toLowerCase() == Type.toLowerCase() &&
        (parent == "" || item.Parent == parent)
    );

    if (parent == "" && Type.toLowerCase() == "storagelocation") {
        list = [];
    }

    var options = list.map(item => {
        const isSelected = item.Key == selectedValue ? "selected" : "";
        return `<option value="${item.Key}" ${isSelected}>${item.Key + ' - ' + item.Description}</option>`;
    }).join('');

    const firstOption = '<option value="">Select</option>';
    return firstOption + options;

}
function AddNewPRItem() {

    var flag = true;

    if ($("#department").val() == "") {
        $("#department").siblings('span').removeClass('hide').delay(5000).queue(function (next) { $("#department").siblings('span:last').addClass('hide'); next(); });
        flag = false;
    }
    if ($("#category").val() == "") {
        $("#category").siblings('span').removeClass('hide').delay(5000).queue(function (next) { $("#category").siblings('span:last').addClass('hide'); next(); });
        flag = false;
    }

    if (flag) {

        var id = lastDetailId + 1;
        detailsArray.push({
            DetailId: id,
            Project: "",
            ProjectIdDesc: "",
            GLCode: "",
            GLCodeDescription: "",
            BalanceBudget: "",
            MaterialCode: "",
            MaterialCodeDescription: "",
            PurchaseGrp: purchaseGroup,
            HSNCode: "",
            Quantity: "",
            UOM: "",
            StandardCost: "",
            ApproximateCost: "",
            PlantCode: "",
            StorageLocationCode: "",
            StockOnHand: "",
            DeliveryDate: "",
            Remarks: "",
            IsSaved: 0
        });
        CreateJqgrid(detailsArray);
        InitializeAutocompleteDatepicker();
        lastDetailId = id;

    }

}
function CheckBudgHSNPurGrpAlert(type, DetailId, result) {

    var bal = result.filter(item => item.Type == "BalanceBudget")[0]?.Description;
    var sum = 0;

    bal = (bal != undefined && bal != null && bal != "") ? parseFloat(bal.replace(/,/g, '')) : 0;
    
    detailsArray.forEach(function (obj) {

        if (obj.Project == newValue) {
            sum +=

            (obj.Quantity != "" ? parseFloat(obj.Quantity) : 0)

            *

            (obj.ApproximateCost != "" ? parseFloat(obj.ApproximateCost.replace(/,/g, '')) : 0)
        }
        
    });

    bal = bal - sum;

    if (
        result.length == 0 ||
        (result.length > 0 && type == "ProjectDepartmentCategoryDependent" && (bal <= 0))
    ) {

        var msg = "There is no balance budget avaliable for the project still you need continue, Please confirm?"

        OnModifyDataAlterAlert(msg,
            function () {
                bal = "0";
                setMaterialProjectValue();
            },
            function () {
                detailsArray.forEach(function (item) {
                    if (item.DetailId == DetailId) {
                        if (type == "ProjectDepartmentCategoryDependent") {
                            $("#" + DetailId).find("[project-id-auto-suggest]").val(oldValueDesc)
                                .attr('title', oldValueDesc).trigger('mouseleave').trigger('mouseenter');

                            item.Project = oldValue;
                            item.ProjectIdDesc = oldValueDesc
                        }
                        else {
                            $("#" + DetailId).find("[material-auto-suggest]").val(oldValueDesc)
                                .attr('title', oldValueDesc).trigger('mouseleave').trigger('mouseenter');

                            item.MaterialCode = oldValue;
                            item.MaterialCodeDescription = oldValueDesc;
                        }
                    }
                });
            }
        );
    }
    else {
        bal = parseFloat(bal).toLocaleString('en-IN');
        setMaterialProjectValue();
    }

    function setMaterialProjectValue() {

       

        var flag = 0;
        detailsArray.forEach(function (item) {
            if (item.DetailId == DetailId) {

                // result will be empty only for budget case, for others record will come with empty data
                if (result.length == 0) {
                    item.BalanceBudget = '';
                    item.Project = newValue;
                    item.ProjectIdDesc = newValueDesc;
                }
                else {
                    result.forEach((data) => {

                        if (data.Type === "BalanceBudget") {
                            item.BalanceBudget = bal;
                            item.Project = newValue;
                            item.ProjectIdDesc = newValueDesc;
                        }
                        else if (data.Type === "HSNCode") {
                            item.HSNCode = data.Description;
                            item.MaterialCode = newValue;
                            item.MaterialCodeDescription = newValueDesc;
                            flag = 1;
                        }
                        else if (data.Type === "UOM") {
                            item.UOM = data.Description;
                            item.Quantity = "";
                            $("#" + DetailId).find("#uom-cat").text(data.Description);
                            $("#" + DetailId).find("[quantity]").val('');
                            flag = 1;
                        }

                    });

                    if (flag == 1) {
                        // only on material change
                        GetDependentValues(item.PlantCode, "MaterialPlantDependent", DetailId);
                        GetDependentValues(item.StorageLocationCode, "PlantSLDependent", DetailId);
                    }

                }
            }
        });
    }

}
function GetDependentValues(newValue, toGet, DetailId = 0) {

    if (toGet == "PlantSLDependent") {
        var obj = detailsArray.filter(item => item.DetailId == DetailId);
        newValue = obj[0]?.MaterialCode + '/' + obj[0]?.PlantCode + '/' + newValue;
    }
    else if (toGet == "MaterialPlantDependent") {
        var obj = detailsArray.filter(item => item.DetailId == DetailId);
        newValue = obj[0]?.MaterialCode + '/' + newValue;
    }

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetPRCreationDepedentData",
        dataType: "JSON",
        async: false,
        data: {
            Department: latestDepartment,
            Category: latestCategory,
            Value: newValue,
            Type: toGet
        },
        success: function (result) {

            if (result && toGet == "DepartmentDependent") {
                dropDownArray = dropDownArray.filter(item => item.Type != "Project");
                dropDownArray = dropDownArray.concat(result);
            }
            else if (result && toGet == "CategoryDependent") {
                dropDownArray = dropDownArray.filter(item => item.Type != "GLCode" && item.Type != "MaterialType" && item.Type != "PurchaseGrp");
                dropDownArray = dropDownArray.concat(result);
                headerArray[0].MaterialType = result.filter(item => item.Type == "MaterialType")[0]?.Key;
                purchaseGroup = result.filter(item => item.Type == "PurchaseGrp")[0]?.Key;
                detailsArray.forEach(function (item) {
                    item.PurchaseGrp = purchaseGroup
                });
            }
            else if (result && toGet == "ProjectDepartmentCategoryDependent") {
                CheckBudgHSNPurGrpAlert(toGet, DetailId, result);
            }
            else if (result && toGet == "MaterialDependent") {
                CheckBudgHSNPurGrpAlert(toGet, DetailId, result);
            }
            else if (result && toGet == "PlantSLDependent") {
                dropDownArray = dropDownArray.filter(item => item.Type != "StockOnHand");
                dropDownArray = dropDownArray.concat(result);
                var stockOnHand = result.length > 0 ? result.filter(item => item.Type == "StockOnHand")[0]?.Key : "";
                detailsArray.forEach(function (item) {
                    if (item.DetailId == DetailId) {
                        item.StockOnHand = stockOnHand;
                    }
                });
                $("#" + DetailId).find("[stock-on-hand]").val(stockOnHand);
            }
            else if (result && toGet == "MaterialPlantDependent") {
                dropDownArray = dropDownArray.filter(item => item.Type != "ApproximateCost");
                dropDownArray = dropDownArray.concat(result);
                var standardCost = result.length > 0 ? result.filter(item => item.Type == "ApproximateCost")[0]?.Key : "";
                detailsArray.forEach(function (item) {
                    if (item.DetailId == DetailId) {
                        item.ApproximateCost = standardCost;
                        item.StandardCost = standardCost;
                    }
                });
                $("#" + DetailId).find("[approx-cost]").val(standardCost);
            }

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}
function AlertForAutoSuggestChange(obj, value, valueDesc, type) {

    var slNo = GetSlNo(obj);

    if (type?.toLowerCase() == "project") {
        detailsArray.forEach(function (item) {
            if (item.DetailId == slNo) {
                if (item.Project != "" && item.Project != value) {
                    OnModifyDataAlterAlert("On Changing the project, Accordingly balance budget will change, Please confirm to continue",
                        function () {
                            newValue = value;
                            newValueDesc = valueDesc;
                            oldValue = item.Project;
                            oldValueDesc = item.ProjectIdDesc;
                            GetDependentValues(value, "ProjectDepartmentCategoryDependent", slNo);
                        },
                        function () {
                            $(obj).val(item.ProjectIdDesc).attr('title', item.ProjectIdDesc).trigger('mouseleave').trigger('mouseenter');
                        }
                    );
                }
                else {
                    newValue = value;
                    newValueDesc = valueDesc;
                    oldValue = item.Project;
                    oldValueDesc = item.ProjectIdDesc;
                    GetDependentValues(value, "ProjectDepartmentCategoryDependent", slNo);
                }
            }
        });
    }
    else if (type?.toLowerCase() == "material") {
        detailsArray.forEach(function (item) {
            if (item.DetailId == slNo) {
                if (item.MaterialCode != "" && item.MaterialCode != value) {
                    OnModifyDataAlterAlert("On Changing the material, You will lose the entered quantity and approximate cost of the material, Please confirm to continue",
                        function () {
                            newValue = value;
                            newValueDesc = valueDesc;
                            oldValue = item.MaterialCode;
                            oldValueDesc = item.MaterialCodeDescription;
                            GetDependentValues(value, "MaterialDependent", slNo);
                        },
                        function () {
                            $(obj).val(item.MaterialCodeDescription).attr('title', item.MaterialCodeDescription).trigger('mouseleave').trigger('mouseenter');
                        }
                    );
                }
                else {
                    newValue = value;
                    newValueDesc = valueDesc;
                    oldValue = item.MaterialCode;
                    oldValueDesc = item.MaterialCodeDescription;
                    GetDependentValues(value, "MaterialDependent", slNo);
                }
            }
        });
    }

}
function OpenInfoPopup(slNo) {

    var obj = detailsArray.filter(item => item.DetailId == slNo)[0];

    $("#info-dept").text($('#department option:selected').text());
    $("#info-cat").text($('#category option:selected').text());

    $("#info-prj-id").text(obj.ProjectIdDesc);
    $("#info-gl-code-desc").text(obj.GLCodeDescription);
    $("#info-mat-type").text(dropDownArray.filter(item => item.Type == "MaterialType")[0].Key);
    $("#info-mat-code-desc").text(obj.MaterialCodeDescription);
    $("#info-bal-bud").text(obj.BalanceBudget == 0 ? '' : obj.BalanceBudget);
    $("#info-pur-grp").text(obj.PurchaseGrp);
    $("#info-hsn-code").text(obj.HSNCode);

    $("#pr-dependent-info-popup").modal("show");
}
function manipulateDetailsArray(value, detailId, columnName) {
    detailsArray.forEach(function (item) {
        if (item.DetailId == detailId) {
            item[columnName] = value;
        }
    });
}
function NavigateToPRList() {

    NavigateRefreshPR(2);

}
function GetDetailId(obj) {
    var tr = $(obj).closest('tr');
    var id = parseInt(tr.find("[PR-Item-Id]").text().trim());
    return id;
}
function DeletePRMaterialDetail(DetailId) {

    handelConfirmPopup('Are you sure do you want to delete the material detail?',
        function () {

            var isDeleted = false;
            var responseMsg = "";
            var responseMsgClass = "";

            var isSaved = detailsArray.filter(item => item.DetailId == DetailId)[0].IsSaved;

            if (isSaved == 1) {
                $.ajax({
                    type: "POST",
                    url: ROOT + "NewProjectInitiation/DeletePRMaterialDetail",
                    dataType: "JSON",
                    data: {
                        Id: DetailId,
                    },
                    async: false,
                    success: function (result) {

                        responseMsgClass = result.Item2;
                        responseMsg = result.Item1;

                        if (responseMsg.toLowerCase().includes('success')) {
                            isDeleted = true;
                        }
                    },
                    error: function (xhr, status, error) {
                        alert("Error Occured: " + error);
                    }
                });
            }
            else {
                isDeleted = true;
            }

            if (isDeleted) {

                var foundIndex = detailsArray?.findIndex(x => x.DetailId == DetailId);

                if (foundIndex !== -1) {

                    detailsArray?.splice(foundIndex, 1);

                    var asIndex = alreadySavedData?.PRDetailsList?.findIndex(x => x.DetailId == DetailId);

                    if (asIndex !== -1) {
                        alreadySavedData?.PRDetailsList?.splice(asIndex, 1);
                    }

                    CreateJqgrid(detailsArray);
                    InitializeAutocompleteDatepicker();

                    responseMsgClass = "alert-danger";
                    responseMsg = "Material detail has been deleted successfully";

                    $("#response-message-div").html(

                        `<div class="alert ${responseMsgClass} alert-dismissible d-flex justify-content-between" role="alert" id="message_alert">
                        ${responseMsg}
                        </div>`

                    );

                    $("#response-message-div").removeClass('hide').delay(3000).queue(
                        function (next) {
                            $(this).addClass('hide');
                            next();
                        }
                    );
                }
            }
        }
    )

}
function ValidateChangesDone() {

    var department = $("#department").val().trim();
    var priority = $("#priority").val().trim();
    var category = $("#category").val().trim();

    if (prHeaderId > 0) {

        // header comparsion
        if (
            (department != alreadySavedData.PRHeaderList[0].Department) ||
            (priority != alreadySavedData.PRHeaderList[0].Priority) ||
            (category != alreadySavedData.PRHeaderList[0].Category) ||
            (headerArray[0]?.MaterialType != alreadySavedData.PRHeaderList[0].MaterialType)
        ) {
            return true;
        }

        var detailsArrayLen = detailsArray.length;
        var asDetailsArrayLen = alreadySavedData.PRDetailsList.length;
        var documentArrayLen = documentArray.length;
        var asDocumentArrayLen = alreadySavedData.PRDocumentList.length;

        // details & document array length comparsion
        if (
            detailsArrayLen != asDetailsArrayLen ||
            documentArrayLen != asDocumentArrayLen
        ) {
            return true;
        }

        // details id comparsion
        var detailsArrayIds = detailsArray.map(obj => obj.DetailId);
        var asDetailsArrayIds = alreadySavedData.PRDetailsList.map(obj => obj.DetailId);
        var commonIds = detailsArrayIds.filter(id => asDetailsArrayIds.includes(id));

        if (commonIds.length != detailsArrayLen) {
            return true;
        }

        // documents id comparsion
        var documentArrayIds = documentArray.map(obj => obj.VendorDetailId);
        var asDocumentArrayIds = alreadySavedData.PRDocumentList.map(obj => obj.VendorDetailId);
        var commonIds = documentArrayIds.filter(id => asDocumentArrayIds.includes(id));

        if (commonIds.length != documentArrayLen) {
            return true;
        }

        // details data comparision
        for (var i = 0; i < alreadySavedData.PRDetailsList.length; i++) {
            for (var j = 0; j < detailsArray.length; j++) {
                if (detailsArray[j].DetailId == alreadySavedData.PRDetailsList[i].DetailId) {
                    if (
                        (detailsArray[j].Project != alreadySavedData.PRDetailsList[i].Project) ||
                        (detailsArray[j].GLCode != alreadySavedData.PRDetailsList[i].GLCode) ||
                        //(detailsArray[j].BalanceBudget != alreadySavedData.PRDetailsList[i].BalanceBudget) ||
                        (detailsArray[j].MaterialCode != alreadySavedData.PRDetailsList[i].MaterialCode) ||
                        (detailsArray[j].PurchaseGrp != alreadySavedData.PRDetailsList[i].PurchaseGrp) ||
                        (detailsArray[j].HSNCode != alreadySavedData.PRDetailsList[i].HSNCode) ||
                        (detailsArray[j].Quantity != alreadySavedData.PRDetailsList[i].Quantity) ||
                        (detailsArray[j].UOM != alreadySavedData.PRDetailsList[i].UOM) ||
                        (detailsArray[j].StandardCost != alreadySavedData.PRDetailsList[i].StandardCost) ||
                        (detailsArray[j].ApproximateCost != alreadySavedData.PRDetailsList[i].ApproximateCost) ||
                        (detailsArray[j].PlantCode != alreadySavedData.PRDetailsList[i].PlantCode) ||
                        (detailsArray[j].StorageLocationCode != alreadySavedData.PRDetailsList[i].StorageLocationCode) ||
                        //(detailsArray[j].StockOnHand != alreadySavedData.PRDetailsList[i].StockOnHand) ||
                        (detailsArray[j].DeliveryDate != alreadySavedData.PRDetailsList[i].DeliveryDate) ||
                        (detailsArray[j].Remarks != alreadySavedData.PRDetailsList[i].Remarks)
                    ) {
                        return true;
                    }
                }
            }
        }
    }
    else {

        if (
            (department != '') ||
            (priority != '') ||
            (category != '')
        ) {
            return true;
        }

        if (documentArray.length > 0 || detailsArray.length > 0) {
            return true;
        }

    }
    return false;

}
function ShowHeaderValidation(Action) {

    if (
        (latestDepartment == "" || latestDepartment == null) &&
        (latestCategory != "" && latestCategory != null && detailsArray.length > 0)
    ) {
        alert("Please select department to <span>" + Action + "</span>");
    }
    else if (
        (latestDepartment != "" && latestDepartment != null) &&
        (latestCategory == "" || latestCategory != null) && detailsArray.length > 0
    ) {
        alert("Please select category to <span>" + Action + "</span>");
    }
    else if (
        (latestDepartment != "" && latestDepartment != null && latestCategory != "" && latestCategory != null) &&
        detailsArray.length == 0
    ) {
        alert("Please enter atleast one material details to <span>" + Action + "</span>");
    }
    else if (
        (latestDepartment != "" && latestDepartment != null) &&
        ((latestCategory == "" || latestCategory == null) && detailsArray.length == 0)
    ) {
        alert("Please select category and enter atleast one material details to <span>" + Action + "</span>");
    }
    else if (
        (latestCategory != "" && latestCategory != null) &&
        ((latestDepartment == "" || latestDepartment == null) && detailsArray.length == 0)
    ) {
        alert("Please select department and enter atleast one material details to <span>" + Action + "</span>");
    }
    else if (
        (latestCategory != "" || latestCategory != null) &&
        (latestDepartment == "" || latestDepartment == null) && (detailsArray.length > 0)
    ) {
        alert("Please enter atleast one material details to <span>" + Action + "</span>");
    }
    else if (
        (latestCategory == "" || latestCategory == null) &&
        (latestDepartment == "" || latestDepartment == null) && (detailsArray.length == 0)
    ) {
        alert("Please select department, category and enter atleast one material details to <span>" + Action + "</span>");
    }

}
function ShowDetailsValidation(type) {

    //type 1 ---> going to next level (approval, retry, approve & create pr)
    //type 2 ---> draft or save or rollback

    var mandatoryColumns = ["Project", "GLCode", "MaterialCode", "PurchaseGrp", "Quantity", "UOM", "PlantCode", "StorageLocationCode", "DeliveryDate"];

    if (type == 1) {
        //for (var j = 0; j < detailsArray.length; j++) {
        //    if (
        //        !IsValidData(detailsArray[j].Project) ||
        //        !IsValidData(detailsArray[j].GLCode) ||
        //        !IsValidData(detailsArray[j].MaterialCode) ||
        //        !IsValidData(detailsArray[j].PurchaseGrp) ||
        //        !IsValidData(detailsArray[j].Quantity) ||
        //        !IsValidData(detailsArray[j].UOM) ||
        //        !IsValidData(detailsArray[j].PlantCode) ||
        //        !IsValidData(detailsArray[j].StorageLocationCode) ||
        //        !IsValidData(detailsArray[j].DeliveryDate) ||
        //        !(
        //            detailsArray[j].Quantity != "" &&
        //            parseInt(detailsArray[j].Quantity) > 0
        //        )
        //    ) {
        //        return true;
        //    }
        //}

        var valid = false;
        $.each(detailsArray, function (index, currentItem) {
            var Slno = currentItem.DetailId;
            $.each(currentItem, function (key, value) {
                if (mandatoryColumns.includes(key)) {
                    if (!IsValidData(value)) {
                        $("." + Slno + key).removeClass('hide');
                        //scrollToRow(Slno);
                        valid = true;
                    }
                }
            });
        });
        return valid;
    }
    else {
        for (var j = 0; j < detailsArray.length; j++) {
            if (
                IsValidData(detailsArray[j].Project) &&
                IsValidData(detailsArray[j].GLCode) &&
                IsValidData(detailsArray[j].MaterialCode) &&
                IsValidData(detailsArray[j].PurchaseGrp) &&
                IsValidData(detailsArray[j].Quantity) &&
                IsValidData(detailsArray[j].UOM) &&
                IsValidData(detailsArray[j].PlantCode) &&
                IsValidData(detailsArray[j].StorageLocationCode) &&
                IsValidData(detailsArray[j].DeliveryDate) &&
                (
                    detailsArray[j].Quantity != "" &&
                    parseInt(detailsArray[j].Quantity) > 0
                )
            ) {
                return true;
            }
        }
    }

    return false;
}
function IsAnyDetailsColumnValid() {
    for (var j = 0; j < detailsArray.length; j++) {
        if (
            IsValidData(detailsArray[j].Project) ||
            IsValidData(detailsArray[j].GLCode) ||
            IsValidData(detailsArray[j].MaterialCode) ||
            !IsValidData(detailsArray[j].PurchaseGrp) ||
            IsValidData(detailsArray[j].Quantity) ||
            IsValidData(detailsArray[j].UOM) ||
            IsValidData(detailsArray[j].PlantCode) ||
            IsValidData(detailsArray[j].StorageLocationCode) ||
            IsValidData(detailsArray[j].DeliveryDate) ||
            detailsArray[j].Quantity > 0
        ) {
            return true;
        }
    }
    return false;
}
function GetLatestHeaderRemarksArray(Remark, Msg, Action) {

    remarksArray = [];
    remarksArray.push({
        Remark: Remark,
        Action: Action,
        Msg: Msg
    });

    headerArray[0].Department = latestDepartment;
    headerArray[0].Category = latestCategory;
    headerArray[0].Priority = $("#priority").val();

}
function GetSlNo(obj) {
    var tr = $(obj).closest('tr');
    var slNo = parseInt(tr.find("[PR-Item-Id]").text().trim());
    return slNo;
}
function InitializeAutocompleteDatepicker() {

    // both id and value for project is same
    $("[project-id-auto-suggest]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                selectedProjectId = 0;
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                var obj = [];
                var cnt = 0;
                $.grep((dropDownArray.filter(item => item.Type == "Project")), function (value) {
                    var name = value.Description;
                    var id = value.Key;
                    if (matcher.test(name) && cnt < 500) {
                        obj.push({ "value": name, "id": id })
                        cnt++
                    }
                });
                response(obj);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                var selectedTerm = ui.item.value;
                if (selectedTerm != "" || selectedTerm != null || selectedTerm != undefined) {
                    selectedProjectId = 1;
                    this.value = selectedTerm;
                    $(this).attr('title', selectedTerm).trigger('mouseleave').trigger('mouseenter');
                    AlertForAutoSuggestChange(this, ui.item.id, ui.item.value, "Project");
                }
                return false;
            },
            close: function (event, ui) {
                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (selectedProjectId === 0 && $(event.target).val().trim() != "") {
                        $(event.target).val('');
                        $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                    else if (selectedProjectId === 1) {
                        $(event.target).siblings('span').addClass('hide');
                    }
                }
            }
        });

    // id and value for material is different
    $("[material-auto-suggest]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                selectedMat = 0;
                $.ajax({
                    type: "POST",
                    url: ROOT + "NewProjectInitiation/GetPRCreationMaterialData",
                    dataType: "JSON",
                    async: false,
                    data: {
                        Value: request.term,
                        MatType: dropDownArray.filter(item => item.Type == "MaterialType")[0].Key
                    },
                    success: function (result) {
                        latestFilteredMatArray = result;
                        response(result);   
                    },
                    error: function (xhr, status, error) {
                        alert("Error Occured: " + error);
                    }
                });
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                var selectedTerm = ui.item.value;
                if (selectedTerm != "" || selectedTerm != null || selectedTerm != undefined) {
                    selectedMat = 1;
                    this.value = selectedTerm;
                    $(this).attr('title', selectedTerm).trigger('mouseleave').trigger('mouseenter');
                    AlertForAutoSuggestChange(this, ui.item.id, selectedTerm, "Material");
                }
                return false;
            },
            close: function (event, ui) {
                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (selectedMat === 0 && $(event.target).val().trim() != "") {
                        $(event.target).val('');
                        $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                    else if (selectedMat === 1) {
                        $(event.target).siblings('span').addClass('hide');
                    }
                }
            },
            change: function (event, ui) {
                
            },
        });

    var datepickerOptions = {
        format: 'dd/mm/yyyy',
        autoclose: true,
        changeMonth: true,
        todayHighlight: true,
        startDate: new Date(todayDate)
    };

    $('[delivery-date-datepicker]').datepicker('destroy');
    $('[delivery-date-datepicker]').datepicker(datepickerOptions);

}
function allowFloatOnly(input) {
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}
function allowFloatAndComma(input) {
    input.value = input.value.replace(/[^0-9,.]/g, '').replace(/(\..*?)\..*/g, '$1');
}
function handelPasteFloatOnly(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');

    if (/[^0-9.]/.test(pastedData) || (pastedData.split('.').length > 2)) {
        event.preventDefault();
        event.target.value = '';
        alert('Please enter a valid quantity');
    }
}
function handlePasteFloatAndComma(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');
    if (/[^0-9,.]/.test(pastedData) || (pastedData.split('.').length > 2)) {
        event.preventDefault();
        event.target.value = '';
        alert('Please enter valid money');
    }
}
function RefreshPRCreation() {

    NavigateRefreshPR(1);

}
function NavigateRefreshPR(type) {

    // type 1 ---> refresh
    // type 2 ---> navigate to list

    if (ValidateChangesDone()) {

        var msg = (prInitiatedBy == "" || loginId?.includes(prInitiatedBy)) ?
            "You have some unsaved Data, Please save otherwise you will lose the data" :
            "You have some unsaved Data, Please save as draft otherwise you will lose the data";

        UnsavedDataAlert(msg,
            function () {
                (prInitiatedBy == "" || loginId?.includes(prInitiatedBy)) ?
                    $("#save-draft-Button").click() :
                    $("#save-Button").click();
            },
            function () {
                type == 1 ? window.location.reload() : window.location.href = ROOT + 'NewProjectInitiation/PRList';
            },
        );

    }
    else {
        type == 1 ? window.location.reload() : window.location.href = ROOT + 'NewProjectInitiation/PRList';
    }

}

//----------------------------------------------------------On change functions
$(document).on('change', '#department', function () {

    changedDepartment = $(this).val().trim();

    if (flagDepartment) {
        if (detailsArray.length > 0 && IsAnyDetailsColumnValid() && changedDepartment != latestDepartment) {
            OnModifyDataAlterAlert("On Changing the department, You will lose the entered project id for the materials, Please confirm to continue",
                function () {
                    $(this).siblings('span:last').addClass('hide');
                    latestDepartment = changedDepartment;
                    GetDependentValues(changedDepartment, "DepartmentDependent");
                    detailsArray.forEach(function (item) {
                        item.Project = "";
                        item.ProjectIdDesc = "";
                        item.BalanceBudget = "";
                    });
                    $("[project-id-auto-suggest]").val('');
                },
                function () {
                    flagDepartment = false;
                    $("#department").val(latestDepartment).change();
                }
            );
        }
        else {
            $(this).siblings('span:last').addClass('hide');
            latestDepartment = changedDepartment;
            GetDependentValues(changedDepartment, "DepartmentDependent");
            if (
                IsValidData($("#department").val()) &&
                IsValidData($("#category").val()) &&
                detailsArray.length == 0
            ) {
                $("#add-pr-row").click();
            }
            else if (
                IsValidData($("#department").val()) &&
                IsValidData($("#category").val()) &&
                detailsArray.length > 0
            ) {
                CreateJqgrid(detailsArray);
                InitializeAutocompleteDatepicker();
            }
        }
    }
    else {
        flagDepartment = true;
    }

});
$(document).on('change', '#category', function () {

    changedCategory = $(this).val().trim();

    if (flagCategory) {
        if (detailsArray.length > 0 && IsAnyDetailsColumnValid() && changedCategory != latestCategory) {
            OnModifyDataAlterAlert("On Changing the category, You will lose the entered materials data, Please confirm to continue",
                function () {
                    $(this).siblings('span:last').addClass('hide');
                    latestCategory = changedCategory;
                    GetDependentValues(changedCategory, "CategoryDependent");
                    detailsArray.forEach(function (item) {
                        item.GLCode = "";
                        item.GLCodeDescription = "";
                        item.BalanceBudget = "";
                        item.MaterialCode = "";
                        item.MaterialCodeDescription = "";
                        item.PurchaseGrp = purchaseGroup;
                        item.HSNCode = "";
                        item.Quantity = "";
                        item.UOM = "";
                        item.StandardCost = "";
                        item.ApproximateCost = "";
                    });

                    CreateJqgrid(detailsArray);
                    InitializeAutocompleteDatepicker();
                },
                function () {
                    flagCategory = false;
                    $("#category").val(latestCategory).change();
                }
            );
        }
        else {
            $(this).siblings('span:last').addClass('hide');
            latestCategory = changedCategory;
            GetDependentValues(changedCategory, "CategoryDependent");
            if (
                IsValidData($("#department").val()) &&
                IsValidData($("#category").val()) &&
                detailsArray.length == 0
            ) {
                $("#add-pr-row").click();
            }
            else if (
                IsValidData($("#department").val()) &&
                IsValidData($("#category").val()) &&
                detailsArray.length > 0
            ) {
                CreateJqgrid(detailsArray);
                InitializeAutocompleteDatepicker();
            }
        }
    }
    else {
        flagCategory = true;
    }

});
$(document).on('change', '[plant-code-dropdown]', function () {

    var detailId = GetDetailId(this);
    var plantCode = $(this).val().trim();
    manipulateDetailsArray(plantCode, detailId, "PlantCode");
    var slOptions = generateSingleSelectOptions("StorageLocation", "", plantCode);
    $(this).closest('tr').find(".storage-loc-td select").html(slOptions);

    detailsArray.forEach(function (item) {
        if (item.DetailId == detailId) {
            item.StockOnHand = "";
            item.StorageLocationCode = "";
        }
    });
    $("#" + detailId).find("[stock-on-hand]").val("");

    if (plantCode == "") {
        detailsArray.forEach(function (item) {
            if (item.DetailId == detailId) {
                item.StandardCost = "";
            }
        });
        $("#" + detailId).find("[approx-cost]").val("");
    }
    else {
        GetDependentValues(plantCode, "PlantSLDependent", detailId);
        GetDependentValues(plantCode, "MaterialPlantDependent", detailId);
    }

});
$(document).on('change', `[glCode-dropdown],[quantity],[approx-cost],[storage-location-dropdown],
[delivery-date-datepicker],[vendor-contact-details]`, function () {

    var value = $(this).val().trim();
    var $cell = $(this).closest('td');
    var colIndex = $cell.index();
    var grid = $("#pr-creation-grid");
    var colModel = grid.jqGrid('getGridParam', 'colModel');
    var columnName = colModel[colIndex].name;

    var detailId = GetDetailId(this);

    manipulateDetailsArray(value, detailId, columnName);

    if (columnName == "GLCode") {
        manipulateDetailsArray($(this).find('option:selected').text(), detailId, "GLCodeDescription");
    }
    else if (columnName == "StorageLocationCode") {
        if (value == "") {
            detailsArray.forEach(function (item) {
                if (item.DetailId == detailId) {
                    item.StockOnHand = "";
                }
            });
            $("#" + detailId).find("[stock-on-hand]").val("");
        }
        else {
            GetDependentValues(value, "PlantSLDependent", detailId);
        }
    }

});

//----------------------------------------------------------On Save functions

$(document).on('click', '#save-draft-Button', function () {

    if (latestDepartment != "" && latestDepartment != null && latestCategory != "" && latestCategory != null && detailsArray.length > 0) {
        saveFunction
            (
                "draft",
                "Please fill atleast one material details completely and quantity should be greater than 0 for all the material to save the PR as draft",
                "Are you sure you want to save as draft?",
                "saved as draft",
                "Saved as draft"
            );
    }
    else {
        ShowHeaderValidation("save as draft");
    }

});

$(document).on('click', '#send-approval-Button', function () {

    if ((latestDepartment != "" && latestDepartment != null && latestCategory != "" && latestCategory != null && detailsArray.length > 0)) {
        saveFunction
            (
                "approval",
                `Please fill all the mandatory fields to send the PR for approval
                    <div class="mt-2">
                        <strong>Project Id, GL Code, Material Code Description, Quantity, Plant, Storage Location , Delivery Date and
                        quantity should be greater than 0 for all the material</strong>
                    </div>
                `,
                "Are you sure you want to send the PR for approval?",
                "sent for approval",
                "Sent for approval"
            );
    }
    else {
        ShowHeaderValidation("send for approval");
    }

});

$(document).on('click', '#roll-back-pr-Button', function () {

    if ((latestDepartment != "" && latestDepartment != null && latestCategory != "" && latestCategory != null && detailsArray.length > 0)) {
        saveFunction
            (
                "rollback",
                "Please fill atleast one material details completely and quantity should be greater than 0 for all the material to rollback the PR to initiator",
                "Are you sure you want to roll back the PR to initiator?",
                "roll backed to initiator",
                "Roll backed to initiator"
            );
    }
    else {
        ShowHeaderValidation("roll back to initiator");
    }

});

$(document).on('click', '#create-approve-pr-Button', function () {

    if ((latestDepartment != "" && latestDepartment != null && latestCategory != "" && latestCategory != null && detailsArray.length > 0)) {
        saveFunction
            (
                "approvecreate",
                `Please fill all the mandatory fields to approve and created the PR
                    <div class="mt-2">
                        <strong>Project Id, GL Code, Material Code Description, Quantity, Plant, Storage Location , Delivery Date and
                        quantity should be greater than 0 for all the material</strong>
                    </div>
                `,
                "Are you sure you want to approve and create the PR?",
                "approved and sent for PR creation",
                "Approved and sent for PR creation"
            );
    }
    else {
        ShowHeaderValidation("approve and create the PR");
    }

});

$(document).on('click', '#retry-pr-Button', function () {

    if ((latestDepartment != "" && latestDepartment != null && latestCategory != "" && latestCategory != null && detailsArray.length > 0)) {
        saveFunction
            (
                "sapretry",
                `Please fill all the mandatory fields to retry the PR in SAP for PR Creation
                    <div class="mt-2">
                        <strong>Project Id, GL Code, Material Code Description, Quantity, Plant, Storage Location , Delivery Date and
                        quantity should be greater than 0 for all the material</strong>
                    </div>
                `,
                "Are you sure you want to save and retry the PR in SAP for PR Creation?",
                "retry to SAP",
                "Retry to SAP"
            );
    }
    else {
        ShowHeaderValidation("to retry the PR in SAP for PR Creation");
    }

});

$(document).on('click', '#save-Button', function () {

    if ((latestDepartment != "" && latestDepartment != null && latestCategory != "" && latestCategory != null && detailsArray.length > 0)) {
        saveFunction
            (
                "save",
                "Please fill atleast one material details completely and quantity should be greater than 0 for all the material to save the PR",
                "Are you sure you want to save?",
                "saved",
                "Saved"
            );
    }
    else {
        ShowHeaderValidation("save the PR");
    }

});

function saveFunction(type, validationMsg, confirmMsg, msg, action) {

    if (
        !ValidateChangesDone() &&
        (type == "draft" || type == "save")
    ) {
        alert('There is no changes to save');
        return false;
    }

    if (type != "draft" && type != "rollback" && type != "save") {
        if (ShowDetailsValidation(1)) {
            // alert(validationMsg);
            return false;
        }
    }
    else {
        if (!ShowDetailsValidation(2)) {
            alert(validationMsg);
            return false;
        }
    }

    if (type != "draft" && type != "sapretry" && type != "save") {
        $(".hide-remarks-div").show();
    }
    else {
        $(".hide-remarks-div").hide();
    }

    handelConfirmRemarksPopup(confirmMsg,
        function () {

            var remarks = "";

            if (type != "draft" && type != "sapretry" && type != "save") {

                remarks = $("#with-remarks-data").val().trim();
                if (remarks != "" && remarks != null && remarks != undefined) {
                    $("#with-remarks-data").siblings('span').addClass('hide');
                }
                else {
                    $("#with-remarks-data").siblings('span').removeClass('hide');
                    return false;
                }

            }

            $("#save-with-remarks-popup").modal("hide");

            GetLatestHeaderRemarksArray(remarks, msg, action);

            detailsArray = detailsArray.sort((a, b) => a.DetailId - b.DetailId);

            var formData = new FormData();
            formData.append("PRHeaderId", prHeaderId);
            formData.append("HeaderJson", JSON.stringify(headerArray));
            formData.append("DetailsJson", JSON.stringify(detailsArray));
            formData.append("DocumentJson", JSON.stringify(documentArray));
            formData.append("RemarksJson", JSON.stringify(remarksArray));

            documentFilesArray.forEach(doc => {
                if (doc.File) {
                    formData.append(`${doc.VendorDetailId}`, doc.File);
                }
            });

            $.ajax({
                url: ROOT + "NewProjectInitiation/SaveOrApprovePRDetails",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.toLowerCase().includes('success')) {
                        window.location.href = ROOT + 'NewProjectInitiation/PRList';
                    }
                    else {
                        alert(result);
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error Occured: " + error);
                }
            });

            $(".hide-remarks-div").show();

        }
    );
}

//----------------------------------------------------------Jqgrid code
colModel =
    [
        {
            name: 'Action',
            label: `<span class="Eticon_list mb-2">
                            <button class= "plus plus_icon" onclick="AddNewPRItem()" title="Add Record" id="add-pr-row">
                                <i class="fas fa-plus" aria-hidden="true"></i>
                            </button>
                        </span>`,
            resizable: true,
            width: 45,
            ignoreCase: true,
            sortable: false,
            search:false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_ text-center mt-1">
                            <span class="cursor_pointer" onclick="DeletePRMaterialDetail(${rowobject.DetailId})">
                                <i class="fas fa-trash delete-pr-item text-danger" role="button" title="Delete"></i>
                            </span>
                        </div>`;
            }
        },
        {
            name: 'DetailId',
            label: 'S.No',
            resizable: true,
            width: 10,
            ignoreCase: true,
            key: true,
            hidden: true,
            search: false,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_ text-center mt-1">
                            <span PR-Item-Id>${cellvalue}</span>
                        </div>`;
            }
        },
        {
            name: 'ProjectIdDesc',
            label: 'Project Id <span class="color-danger">*</span> ',
            resizable: true,
            width: 110,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                            <input type="text" class="form-control" id="Project" data-pr-id="${rowobject.DetailId}" project-id-auto-suggest value="${cellvalue}" title = "${cellvalue}" onpaste="return false;"/>
                            <span class="text-danger text-wrap ${rowobject.DetailId}Project hide">Please select project</span>
                            <span class="text-danger hide text-wrap select-from-list">Please select project id from the list</span>
                            <span class="text-danger hide text-wrap not-valid-user">Please select a valid project id</span>
                        </div>`;
            }
        },
        {
            name: 'GLCode',
            label: 'GL Code <span class="color-danger">*</span>',
            width: 110,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                            <select class="form-control" data-singleselect id="GLCode" data-pr-id="${rowobject.DetailId}" glCode-dropdown>
                            ${generateSingleSelectOptions("GLCode", cellvalue)}
                            </select>
                            <span class="text-danger text-wrap ${rowobject.DetailId}GLCode hide">Please select GL code</span>
                        </div>`;
            }
        },
        {
            name: 'MaterialCodeDescription',
            label: 'Material Code Description <span class="color-danger">*</span>',
            width: 190,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                            <input type="text" class="form-control" material-auto-suggest value="${cellvalue}" title = "${cellvalue}" id="MaterialCode" data-pr-id="${rowobject.DetailId}" onpaste="return false;"/>
                            <span class="text-danger text-wrap ${rowobject.DetailId}MaterialCode hide">Please select material description</span>
                            <span class="text-danger hide text-wrap select-from-list">Please select material from the list</span>
                            <span class="text-danger hide text-wrap not-valid-mat">Please select a valid material</span>
                        </div>`;
            }
        },
        {
            name: 'Info',
            label: 'Info',
            width: 40,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            search: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_ text-center">
                            <span onclick="OpenInfoPopup(${rowobject.DetailId})" role="button"><i class="fas fa-info-circle" title="info"></i></span>
                        </div>`;
            }
        },
        {
            name: 'PlantCode',
            label: 'Plant <span class="color-danger">*</span>',
            width: 100,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                            <select class="form-control" data-singleselect id="PlantCode" data-pr-id="${rowobject.DetailId}" plant-code-dropdown>
                            ${generateSingleSelectOptions("Plant", cellvalue)}
                            </select>
                            <span class="text-danger text-wrap ${rowobject.DetailId}PlantCode hide">Please select plant</span>
                        </div>`;
            }
        },
        {
            name: 'StorageLocationCode',
            label: 'Storage Location <span class="color-danger">*</span>',
            width: 110,
            resizable: true,
            ignoreCase: true,
            classes: "storage-loc-td",
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                            <select class="form-control" data-singleselect id="StorageLocationCode" data-pr-id="${rowobject.DetailId}" storage-location-dropdown>
                            ${generateSingleSelectOptions("StorageLocation", cellvalue, rowobject.PlantCode)}
                            </select>
                            <span class="text-danger text-wrap ${rowobject.DetailId}StorageLocationCode hide">Please select SL</span>
                        </div>`;
            }
        },
        {
            name: 'StockOnHand',
            label: 'Stock On Hand',
            width: 70,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                           <input type="text" class="form-control" readonly stock-on-hand value="${cellvalue == 0 ? '' : cellvalue}"/>
                        </div>`;
            }
        },
        {
            name: 'Quantity',
            label: 'Quantity <span class="color-danger">*</span>',
            width: 90,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                        <div class="pr_fields_ uom_qty">
                            <div class="d-flex">
                                <input class="form-control" data-pr-id="${rowobject.DetailId}" id ="Quantity" quantity value="${cellvalue == 0 ? '' : cellvalue}"
                                    autocomplete="off"
                                    type="text"
                                    oninput="allowFloatOnly(this)"
                                    onpaste="handelPasteFloatOnly(event)"
                                />
                                <span id="uom-cat">${rowobject.UOM}</span>
                            </div>
                            </div>
                            <span class="text-danger text-wrap ${rowobject.DetailId}Quantity hide">Please enter qty.</span>
                        </div>`;
            }
        },
        {
            name: 'ApproximateCost',
            label: 'Approx Cost (INR)',
            width: 100,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                             <input class="form-control" approx-cost value="${cellvalue == 0 ? '' : cellvalue}"
                                autocomplete="off"
                                type="text" 
                                oninput="allowFloatAndComma(this)"
                                onpaste="handlePasteFloatAndComma(event)"
                             />
                         </div>`;
            }
        },
        {
            name: 'DeliveryDate',
            label: 'Delivery Date <span class="color-danger">*</span>',
            width: 100,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_ pr_calendericon">
                            <input type="text" data-pr-id="${rowobject.DetailId}" id="DeliveryDate" class="form-control date_text_freezed" delivery-date-datepicker autocomplete="off" readonly value="${cellvalue}"/>
                            <i class="fas fa-calendar"></i>
                             <span class="text-danger text-wrap ${rowobject.DetailId}DeliveryDate hide">Please select DD</span>
                        </div>`;
            }
        },
        {
            name: 'Remarks',
            label: 'Remarks',
            width: 150,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="pr_fields_">
                    <textarea class="form-control" rows="1" vendor-contact-details>${cellvalue}</textarea>
                </div>`;
            }
        },
    ]
function CreateJqgrid(data) {

    data = data.sort((a, b) => b.DetailId - a.DetailId);

    $.jgrid.gridUnload('#pr-creation-grid');

    var $grid = $("#pr-creation-grid");

    $grid.jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colModel,
        viewrecords: true,
        loadonce: true,
        pager: '#pr-creation-grid-pager',
        rowNum: data.length,
        hoverrows: false,
        gridComplete: function () {

            var objRows = $("#pr-creation-grid tbody tr");
            var objHeader = $("#pr-creation-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            $(this).find('td, select, span').removeAttr('title');

            $("[data-singleselect]").select2();

            InitializeAutocompleteDatepicker();
        }
    });

    $("#pr-creation-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $("#pr-creation-grid").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 230px)' });
    $("#pr-creation-grid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#pr-creation-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 400) {
        $('#pr-creation-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#pr-creation-grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
        $('#pr-creation-grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#pr-creation-grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $('#pr-creation-grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

}
//----------------------------------------------------------File upload
function EmptyFileFields() {
    $('#VendorForFile').val('');
    $('#FileUpload').val('');
}
function ViewDocumentsDataModal() {

    EmptyFileFields();
    $('.validation').hide();
    createFileModalGrid(documentArray);
    $("#ViewFileModal").modal("show");

}
function ValidateFileUpload(event) {

    var count = event.target.files.length;

    for (var i = 0; i < count; i++) {
        var fileExtension = event.target.files[i].name.split('.').pop().toLowerCase();
        if (!supportingTypes.includes(fileExtension)) {
            $(".file-format-err").removeClass('hide').delay(4000).queue(
                function (next) {
                    $(this).addClass('hide');
                    next();
                }
            );
            $(this).val('');
            isValid = false;
            return false;
        }
    }

    var maxSizeInBytes = 5 * 1024 * 1024;
    var validFilesArr = [];
    for (var i = 0; i < count; i++) {
        if (event.target.files[i].size <= maxSizeInBytes) {
            validFilesArr.push(i);
        }
    }

    if (count != validFilesArr.length) {
        var dt = new DataTransfer();
        validFilesArr.forEach(function (index) {
            dt.items.add(event.target.files[index]);
        });
        const fileInput = document.getElementById('FileUpload');
        fileInput.files = dt.files;
        //event.target.files = dt.files;
        $(".file-exceed-err").removeClass('hide').delay(4000).queue(
            function (next) {
                $(this).addClass('hide');
                next();
            }
        );
    }

}
function DeletePRVendorDetail(VendorDetailId) {

    handelConfirmPopup('Are you sure do you want to delete the vendor detail?',
        function () {

            var isDeleted = false;
            var responseMsg = "";

            var isSaved = documentArray.filter(item => item.VendorDetailId == VendorDetailId)[0].IsSaved;

            if (isSaved == 1) {
                $.ajax({
                    type: "POST",
                    url: ROOT + "NewProjectInitiation/DeletePRVendorDetail",
                    dataType: "JSON",
                    data: {
                        FileName: documentArray.filter(item => item.VendorDetailId == VendorDetailId)[0].DocumentName,
                        Id: VendorDetailId,
                    },
                    async: false,
                    success: function (result) {

                        responseMsg = result.Item1;

                        if (responseMsg.toLowerCase().includes('success')) {
                            isDeleted = true;
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
            else {
                isDeleted = true;
            }

            if (isDeleted) {

                var indexOfFile = documentFilesArray.findIndex(function (obj) {
                    return obj.VendorDetailId == VendorDetailId
                });
                if (indexOfFile > -1) {
                    documentFilesArray.splice(indexOfFile, 1);
                }

                var indexOfASRecord = alreadySavedData.PRDocumentList?.findIndex(function (obj) {
                    return obj.VendorDetailId == VendorDetailId
                });

                if (indexOfASRecord > -1) {
                    alreadySavedData.PRDocumentList.splice(indexOfASRecord, 1);
                }

                var indexOfRecord = documentArray.findIndex(function (obj) {
                    return obj.VendorDetailId == VendorDetailId
                });

                if (indexOfRecord > -1) {
                    documentArray.splice(indexOfRecord, 1);
                    createFileModalGrid(documentArray);

                    $(".file-deleted").html(responseMsg);
                    $(".file-deleted").removeClass('hide').delay(4000).queue(
                        function (next) {
                            $(this).addClass('hide');
                            next();
                        }
                    );
                }
            }
        }
    )

}
function DownloadVendorDoc(VendorDetailId) {

    var isFileNotSaved = documentFilesArray.findIndex(item => item.VendorDetailId == VendorDetailId);

    if (isFileNotSaved != -1) {
        var fileObj = documentFilesArray.filter(item => item.VendorDetailId == VendorDetailId)[0].File;
        downloadFile(fileObj);
    }
    else {
        var fileName = documentArray.filter(item => item.VendorDetailId == VendorDetailId)[0].DocumentName;
        window.location.href = ROOT + "NewProjectInitiation/DownloadPRVendorFile?DocumentName=" + fileName;
    }

}
function downloadFile(file) {

    const fileURL = URL.createObjectURL(file);
    const a = document.getElementById('hiddenDownloadLink');
    a.href = fileURL;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(fileURL);

}
function ViewVendorDoc(VendorDetailId) {

    var isFileNotSaved = documentFilesArray.findIndex(item => item.VendorDetailId == VendorDetailId);

    if (isFileNotSaved != -1) {
        var fileObj = documentFilesArray.filter(item => item.VendorDetailId == VendorDetailId)[0].File;
        var fileUrl = URL.createObjectURL(fileObj);
        window.open(fileUrl, '_blank');
        URL.revokeObjectURL(fileUrl);
    }
    else {
        var fileName = documentArray.filter(item => item.VendorDetailId == VendorDetailId)[0].DocumentName;
        var url = ROOT + 'BudgetRequestFiles/' + fileName;
        window.open(url, '_blank');
    }

}
$('#FileUpload').on('change', function () {
    ValidateFileUpload({ target: { files: $('#FileUpload')[0].files } });
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
$(document).on('click', '#UploadFileData', function () {

    var isValidData = true;
    var vendorName = $('#VendorForFile').val().trim();
    var files = $('#FileUpload')[0].files;

    if (vendorName == null || vendorName == '') {
        $('#Err_VendorForFile').show();
        isValidData = false;
    }
    else {
        $("#Err_VendorForFile").hide();
    }

    if (files.length == 0) {
        $('#Err_FileUpload').show();
        isValidData = false;
    }
    else {
        $('#Err_FileUpload').hide();
    }

    if (isValidData) {
        Array.from(files).forEach(function (item) {
            var id = lastVendorDetailId + 1;
            documentArray.push({
                VendorDetailId: id,
                VendorName: vendorName,
                DocumentName: item.name,
                UploadedOn: new Date(todayDate).toLocaleDateString("en-GB"),
                UploadedBy: loginId,
                IsSaved: 0
            });
            documentFilesArray.push({
                VendorDetailId: id,
                File: item,
            });
            lastVendorDetailId = id;
        });

        EmptyFileFields();
        createFileModalGrid(documentArray);
    }

});
var VendorFileColModels = [
    {
        name: 'Action',
        label: 'Action',
        align: 'center',
        width: 50,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            var fileName = rowobject.DocumentName;
            var fileExtension = fileName.split('.').pop().toLowerCase();

            return `
                    <div class="d-flex action_icons align-items-center justify-content-center">
                        <span class="mr-2" role="button" onclick="DownloadVendorDoc(${rowobject.VendorDetailId})">
                            <i class="fas fa-download download-pr-file-item color-download" title="Download"></i>
                        </span>
                        ${(fileExtension in unSupportedViewTypes) ? `` :
                    `<span class="mr-2" role="button" onclick="ViewVendorDoc(${rowobject.VendorDetailId})">
                                <i class="fas fa-eye view-pr-file-item color-eye" title="View"></i>
                            </span>`
                }
                        <span role="button" onclick="DeletePRVendorDetail(${rowobject.VendorDetailId})">
                            <i class="fas fa-trash delete-pr-file-item color-delete" title="Delete"></i>
                        </span>
                    </div>`;
        }
    },
    {
        name: 'VendorName',
        label: 'Vendor Name',
        sortable: false,
        width: 70
    },
    {
        name: 'DocumentName',
        label: 'Document Name',
        sortable: false,
        width: 100
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded By',
        sortable: false,
        width: 60
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        sortable: false,
        width: 40
    }
];
function createFileModalGrid(data) {

    $.jgrid.gridUnload('#vendorviewfiles');

    $("#vendorviewfiles").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: VendorFileColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_vendorviewfiles',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#vendorviewfiles tbody tr");
            var objHeader = $("#vendorviewfiles tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#vendorviewfiles').closest('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
    $('#vendorviewfiles').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#viewlist').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 300) {
        $('#vendorviewfiles').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#vendorviewfiles').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#vendorviewfiles').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#vendorviewfiles').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

    $("#vendorviewfiles").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}
$(document).on("change", '#PlantCode, #Project, #GLCode, #MaterialCode, #Quantity, #StorageLocationCode, #DeliveryDate', function () {
    var CurrentField = $(this);
    var DetailId = $(this).data("pr-id");
    var className = CurrentField.attr('id');
    $("." + DetailId + className).addClass('hide');
});
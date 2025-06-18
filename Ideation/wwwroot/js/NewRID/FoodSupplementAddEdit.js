var regStatusList = [];
var IngredientTypeList = [];
var ingredientNamesList = [];

var unEditedData = {};
var headerArray = [];
var detailsArray = [];
var complianceRemarksArray = [];
var regionGroupArray = [];

var oldRegion = "";
var oldRegionForCategory = "";

var activeHerbId = 0;
var activeOtherId = 0;
var inActiveId = 0;

var claimsInfoPopupRowId = 0;
var claimsInfoPopupRegId = 0;
var claimsInfoPopupCatId = 0;
var claimsInfoPopupArrIndex = 0;
var complianceRemarksPopupRegId = 0;
var complianceRemarksPopupRowId = 0;
var comRemarksInactivesPopupRowId = 0;
var comRemarksInactivesPopupArrIndex = 0;

// this is ingredientTypeId from controller & temporaray on change will use this
var ingredientTypeId = 0;
var ingredientORRequestId = 0;
var from = 0;

var workingIngredientTypeName = "";
var workingIngredientTypeId = 0;
var workingTab = 0;

var isIngredientTypeNotSelected = false;

// validatation array's
var login_region = [];
var allregionIdArr = [];
var validationToShowArray = [];

var config = {
    height: 200,
    toolbar: [
        { name: 'clipboard', items: ['Undo', 'Redo'] },
        { name: 'styles', items: ['Styles', 'Format'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'TextColor', 'BGColor'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Blockquote'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        { name: 'insert', items: ['Image', 'Table'] },
        { name: 'tools', items: ['Maximize'] }
    ]
};

$(document).ready(function () {

    regStatusList = JSON.parse($("#RegulatoryStatus").val());
    IngredientTypeList = JSON.parse($("#serializedIngredientTypeList").val());
    ingredientNamesList = JSON.parse($("#IngredientNameList").val());

    ingredientTypeId = parseInt($("#IngredientTypeId").val());
    from = $("#IsFrom").val();
    ingredientORRequestId = $("#IngredientORRequestId").val();

    GetWorkingIngredientData();

    activeHerbId = IngredientTypeList.filter(item => item.IngredientTypeName.toLowerCase().includes('herb')).map(item => item.IngredientTypeId)[0];
    activeOtherId = IngredientTypeList.filter(item => item.IngredientTypeName.toLowerCase().includes('other')).map(item => item.IngredientTypeId)[0];
    inActiveId = IngredientTypeList.filter(item => item.IngredientTypeName.toLowerCase().includes('inactive')).map(item => item.IngredientTypeId)[0];

    // On Add & On Edit (on Edit it will be hided)
    $(".nav-tabs li a").each(function () {
        var result = $(this).attr('IngredientTypeId').split(",").map(function (item) {
            return parseInt(item, 10);
        });

        if (result.includes(ingredientTypeId)) {
            $(this).click(); // will move to tab switch function
        }
    });

    // On Edit
    // IsFrom can be 1(new), 2(edit), 3(request edit)
    if (from != 1) {

        $(".ingredient-tab-div").hide();

        if (workingIngredientTypeId == inActiveId) {
            $(".ing-type-name").html("IngredientType : Inactives");
        }
        else {
            $(".ing-type-name").hide();
        }

        $("#ingredient-name").prop('disabled', true);
        $("#ingredient-type").prop('disabled', true);

    }

});

//-------------------------------------------------------------Helper functions--------------------------------------------------------------------------
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert alert_green alert-dismissable ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 5000);
}

function GetFoodSupplementAddEditData() {

    $.ajax({
        url: ROOT + 'NewRID/GetFoodSupplementAddEditData',
        dataType: 'JSON',
        type: 'GET',
        data: {
            IngredientORRequestId: ingredientORRequestId,
            IngredientType: ingredientTypeId,
            From: from
        },
        async: false,
        success: function (result) {
            if (result != null) {

                unEditedData = structuredClone(result);
                headerArray = result.HeaderArray;
                detailsArray = result.DetailsArray;
                claimsInfoArray = structuredClone(result.DetailsArray);
                complianceRemarksArray = result.ComplainceRemarksArray;
                complianceinitialArray = structuredClone(result.ComplainceRemarksArray);
                regionGroupArray = result.RegionGroupArray;

                if(headerArray[0].IsConfirmed == 1){
                    $("#save-draft-fs").hide();
                }

                validationToShowArray = [];

                $(".mandatory-field").addClass('hide');

                initialregionGroupArray = structuredClone(result.RegionGroupArray);
                $("#ingredient-name").val(headerArray[0].IngredientName);
                $("#botanical-name").val(headerArray[0].BotanicalName);
                $("#synonyms").val(headerArray[0].Synonyms);
                $("#cas-number").val(headerArray[0].CASNumber);
                $("#E-number").val(headerArray[0].ENumber);

                CreatePageJqgrid(detailsArray);
                Datepicker();

                $.each(login_region, function (index, data) {
                    var regionIds = detailsArray.filter(function (obj) {
                        return obj.Region.toLowerCase() == data.toLowerCase();
                    })
                    allregionIdArr.indexOf(parseInt(regionIds[0].RegionId)) > -1 ? "" : allregionIdArr.push(parseInt(regionIds[0].RegionId));
                });
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}
function GetWorkingIngredientData() {
    var workingIngredientObj = IngredientTypeList.filter(item => item.IngredientTypeId == ingredientTypeId);
    workingIngredientTypeName = workingIngredientObj[0].IngredientTypeName;
    workingIngredientTypeId = workingIngredientObj[0].IngredientTypeId;
}
function Datepicker() {

    $('[data-datepicker-startdate]').datepicker('destroy');
    $('[data-datepicker-startdate]').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });

}
function EmptyFields() {

    $("#ingredient-name").val('');
    $("#botanical-name").val('');
    $("#synonyms").val('');
    $("#cas-number").val('');
    $("#E-number").val('');

}
function ActiveTab() {

    EmptyFields();
    $(".ingredient-type-div").show();
    $("#ingredient-type").val('');

    $(".botanical-name-div").hide();
    $(".herb-lab-name").hide();
    $(".other-lab-name").hide();
    $(".ing-name-div").hide();
    $(".syn-div").hide();
    $(".cas-no-div").hide();
    $(".e-num-div").hide();

    CreatePageJqgrid([]);

}
function activeHerbField() {

    EmptyFields();

    $(".other-lab-name").hide();
    $(".cas-no-div").hide();
    $(".e-num-div").hide();

    $(".ingredient-type-div").show();
    $(".botanical-name-div").show();
    $(".herb-lab-name").show();
    $(".ing-name-div").show();
    $(".syn-div").show();

    GetFoodSupplementAddEditData();

}
function activeOtherField() {

    EmptyFields();

    $(".botanical-name-div").hide();
    $(".herb-lab-name").hide();

    $(".ingredient-type-div").show();
    $(".other-lab-name").show();
    $(".ing-name-div").show();
    $(".syn-div").show();
    $(".cas-no-div").show();
    $(".e-num-div").hide();

    GetFoodSupplementAddEditData();

}
function inActivesField() {

    EmptyFields();

    $(".ingredient-type-div").hide();
    $(".botanical-name-div").hide();
    $(".herb-lab-name").hide();

    $(".other-lab-name").show();
    $(".ing-name-div").show();
    $(".syn-div").show();
    $(".cas-no-div").show();
    $(".e-num-div").show();

    GetFoodSupplementAddEditData();

}
function generateSingleSelectOptions(selectedValue) {
    var options = regStatusList.map(item => {
        const isSelected = item.RegulatoryStatusId == selectedValue ? "selected" : "";
        return `<option value="${item.RegulatoryStatusId}" ${isSelected}>${item.RegulatoryStatusName}</option>`;
    }).join('');
    const firstOption = '<option value=' + 0 + '>Select</option>';
    return firstOption + options;
}
setRowSpanRegion = function (rowId, val) {
    var result;
    if (oldRegion == "" || oldRegion != val) {
        var regDataFilter = detailsArray.filter(function (obj) { return obj.Region === val });
        var count = regDataFilter.length;
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    oldRegion = val;
    return result;
};
setRowSpanCategoryRC = function (rowId, val, rowObject) {
    var result;
    if (oldRegionForCategory == "" || oldRegionForCategory != rowObject.Region) {
        var regDataFilter = detailsArray.filter(function (obj) { return obj.Region === rowObject.Region });
        var count = regDataFilter.length;
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    oldRegionForCategory = rowObject.Region;
    return result;
};
function CreatePageJqgrid(data) {

    $.jgrid.gridUnload('#add-edit-grid');

    $("#add-edit-grid").jqGrid({
        datatype: 'local',
        data: data,
        colNames: ['Row No', 'Region Id', 'Category Id', 'Region', 'Category',
            'Regulatory Status <span class="text-danger">*</span>', 'Compliance Remarks <span class="text-danger">*</span>',
            'Claims Info <span class="text-danger">*</span>', 'Compliance Remarks <span class="text-danger">*</span>', 'Impact Date'],
        colModel: [
            {
                name: 'RowNo',
                label: 'Row No',
                hidden: true,
                classes: 'row-no',
                key: true
            },
            {
                name: 'RegionId',
                label: 'Region Id',
                classes: 'row-region-id',
                hidden: true
            },
            {
                name: 'CategoryId',
                label: 'Category Id',
                hidden: true
            },
            {
                name: 'Region',
                cellattr: setRowSpanRegion,
                width: 80,
                classes: 'align-middle',
                align: 'center',
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsEditable == true) {
                        var index = login_region.findIndex(function (obj) { return obj === cellvalue });
                        index == -1 ? login_region.push(cellvalue) : '';
                    }
                    return cellvalue;
                }
            },
            {
                name: 'Category',
                classes: "Category",
                width: 80
            },
            {
                name: 'RegulatoryStatus',
                classes: "Regulatory Status",
                width: 120,
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsEditable == true) {
                        return `<div>
                        <select class="form-control" data-reg-status>
                            ${generateSingleSelectOptions(rowobject.RegulatoryStatus)}
                        </select>
                        <br>
                        <span class="text-danger text-wrap hide mandatory-field">Please select regulatory status</span>
                        </div>`;
                    }
                    else {
                        return `<div>
                        <select class="form-control" disabled>
                            ${generateSingleSelectOptions(rowobject.RegulatoryStatus)}
                        </select>
                        </div>`;
                    }
                }
            },
            {
                name: 'ComplainceRemarksActives',
                cellattr: setRowSpanCategoryRC,
                classes: "Compliance Remarks",
                width: 78,
                classes: 'align-middle',
                align: 'center',
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsEditable == true) {
                        return `<div class="text-center">
                        <a href="javascript:void(0)">
                            <i class="fas fa-info-circle" title="compliance remarks" data-com-remarks></i>
                        </a>
                        <br>
                        <span class="text-danger text-wrap hide mandatory-field">Please enter compliance remarks </span>
                        </div>`;
                    }
                    else {
                        return `<div class="text-center" disabled>
                        <i class="fas fa-info-circle"></i>
                        </div>`;
                    }
                }
            },
            {
                name: 'ClaimsInfo',
                classes: "Claims Info",
                width: 60,
                classes: 'align-middle',
                align: 'center',
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsEditable == true) {
                        return `<div class="text-center">
                        <a href="javascript:void(0)" title="claims info" data-claims-info><i class="fas fa-info-circle"></i></a>
                        <br>
                        <span class="text-danger text-wrap hide mandatory-field">Please enter claims info</span>
                        </div>`
                    }
                    else {
                        return '<div class="text-center" disabled><a href="javascript:void(0)" title="claims info" style="cursor:initial"><i class="fas fa-info-circle"></i></a></div>'
                    }
                }
            },
            {
                name: 'ComplainceRemarksInActives',
                label: "Compliance Remarks",
                width: 120,
                classes: 'align-middle',
                align: 'center',
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsEditable == true) {
                        return `<div class="text-center">
                        <a href="javascript:void(0)" title="compliance remarks" inactive-c-rem><i class="fas fa-info-circle"></i></a>
                        <br>
                        <span class="text-danger text-wrap hide mandatory-field">Please enter compliance remarks</span>
                        </div>`
                    }
                    else {
                        return '<div class="text-center" disabled><a href="javascript:void(0)" title="compliance remarks" style="cursor:initial"><i class="fas fa-info-circle"></i></a></div>'
                    }
                }
            },
            {
                name: 'ImpactDate',
                classes: "Impact Date",
                width: 120,
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsEditable == true) {
                        return `<div class="">
                        <input type="text" class="form-control ImpactDates_text_freezed" data-imp-date data-datepicker-startdate value="` + rowobject.ImpactDates + `" readonly/>
                        </div>`;
                    }
                    else {
                        return `<div class="">
                        <input type="text" class="form-control" data-datepicker-startdate value="` + rowobject.ImpactDates + `" disabled/>
                        </div>`;
                    }
                }
            },

        ],
        cmTemplate: { sortable: false },
        loadonce: true,
        viewrecords: true,
        pager: '#add-edit-grid-pager',
        rowNum: data.length,
        hoverrows: false,
        scroll: 1,
        sortable: true,
        beforeSelectRow: function () {
            return false;
        },
        gridComplete: function () {
            $('[data-reg-status]').select2();
            if (workingTab == 2) {
                jQuery("#add-edit-grid").jqGrid('hideCol', "ComplainceRemarksActives");
                jQuery("#add-edit-grid").jqGrid('hideCol', "ClaimsInfo");
            }
            else {
                jQuery("#add-edit-grid").jqGrid('hideCol', "ComplainceRemarksInActives");
            }
        },
        loadComplete: function () {
            $(this).find('td, textarea, input, select, span').removeAttr('title');
        }
    });

    $('#add-edit-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 250px )' });
    $('#add-edit-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#add-edit-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#add-edit-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#add-edit-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#add-edit-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#add-edit-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

}

//-------- this is only for - NEW FORM
function TabSwitch(tabType, obj) {

    // tabType 1 ---> Actives
    // tabType 2 ---> InActives

    if (ValidateIsChangesDoneOverAll(0, 0)) {
        UnsavedDataAlert("You have some unsaved Data, Please save as draft otherwise you will lose the data",
            function () {
                $("#save-draft-fs").click();
            },
            function () {
                OnAction(tabType, obj, 1);
            },
        );
    }
    else {
        OnAction(tabType, obj, 1);
    }

}
function OnAction(tabType, obj, action, changedIngredientId = 0) {

    // action -- 1 (on tab switch) 
    // action -- 2 (on refresh)
    // action -- 3 (on change of ingredient type in actives)

    workingTab = tabType;

    if (action == 1) {
        $(obj).parent().siblings().find('a').removeClass('active');
        $(obj).addClass('active');

        if (workingTab == 2) {

            $("#IngredientTypeId").val(inActiveId);
            ingredientTypeId = parseInt($("#IngredientTypeId").val());
            GetWorkingIngredientData();

            var newUrl = ROOT + "NewRID/FoodSupplementAddEdit" + '?q=' + Encrypt("IngredientORRequestId=" + ingredientORRequestId + "&IngredientType=" + workingIngredientTypeId + "&From=" + from);
            window.history.replaceState(null, '', newUrl);

            inActivesField();

        }
        else {

            var newUrl = ROOT + "NewRID/FoodSupplementAddEdit" + '?q=' + Encrypt("IngredientORRequestId=" + ingredientORRequestId + "&IngredientType=" + workingIngredientTypeId + "&From=" + from);
            window.history.replaceState(null, '', newUrl);

            if (ingredientTypeId == activeHerbId) {
                $("#ingredient-type").val(activeHerbId).change();
            }
            else if (ingredientTypeId == activeOtherId) {
                $("#ingredient-type").val(activeOtherId).change();
            }
            else {
                ActiveTab();
            }

        }
    }
    else if (action == 2) {
        if (!isIngredientTypeNotSelected) {
            EmptyFields();
            GetFoodSupplementAddEditData();
        }
    }
    else if (action == 3) {

        $("#IngredientTypeId").val(changedIngredientId);
        ingredientTypeId = parseInt($("#IngredientTypeId").val());
        GetWorkingIngredientData();

        var newUrl = ROOT + "NewRID/FoodSupplementAddEdit" + '?q=' + Encrypt("IngredientORRequestId=" + ingredientORRequestId + "&IngredientType=" + workingIngredientTypeId + "&From=" + from);
        window.history.replaceState(null, '', newUrl);

        if (changedIngredientId == activeHerbId) {
            activeHerbField();
        }
        else if (changedIngredientId == activeOtherId) {
            activeOtherField();
        }

    }
}
function LoadRegionGroupJqgrid(regionId) {

    $.jgrid.gridUnload('#region-group-jqgrid');

    var colmodels = [];

    var filteredRegionGroupData = regionGroupArray.filter(item => item.RegionId == regionId);
    var filteredData = {};
    var filteredDataArray = [];

    filteredRegionGroupData.forEach(function (item) {

        if (filteredRegionGroupData.length > 0) {

            colmodels.push(
                {
                    name: item.RegionGroupLabel,
                    label: item.RegionGroupLabel,
                    width: 200,
                    resizable: true,
                    ignoreCase: true,
                    sortable: false,
                    formatter: function (cellvalue, options, rowobject) {
                        return '<div class="text-center input_form">' +
                            '<textarea class="form-control p-2" rows="9" onchange="OnChangeRegionGroupData(' + item.RegionGroupId + ',this)">' + item.RegionGroupData + '</textarea>' +
                            '<span class="text-danger text-wrap hide mandatory-field" id="region-grp-id-' + item.RegionGroupId + '">Please enter header details</span>'
                        '</div>';
                    }
                }
            );

            var key = item.RegionGroupLabel;
            var value = item.RegionGroupData;

            filteredData[key] = value;
        }

        filteredDataArray[0] = filteredData;

    });

    $("#region-group-jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: filteredDataArray,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        scroll: 1,
        sortable: false,
        emptyrecords: "<b class='text-danger' style='font-size:12px;'>There is no header added to the region, Please add headers in <a style='color: #007bff !important;' onclick=navigateMenu(" + 2 + ")> Region compliance header master</a> page</b>",

        gridComplete: function () {
            var objRows = $("#region-group-jqgrid tbody tr");
            var objHeader = $("#region-group-jqgrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            $(this).find('td, textarea, span').removeAttr('title');
        }
    });
}
function AbleToOpenPopup(popup) {
    
    var bot = IsValidData($("#botanical-name").val());
    var ing = IsValidData($("#ingredient-name").val());

    if (workingIngredientTypeId == activeHerbId) {
        if (bot && ing) {
            return true;
        }
        else if (!bot && !ing) {
            if (popup == 1) {
                alert("Please enter botanical name & ingredient name to open compalince remarks");
                return false;
            }
            else {
                alert("Please enter botanical name & ingredient name to open claims info");
                return false;
            }
        }
        else if (!bot) {
            if (popup == 1) {
                alert("Please enter botanical name to open compalince remarks");
                return false;
            }
            else {
                alert("Please enter botanical name to open claims info");
                return false;
            }
        }
        else if (!ing) {
            if (popup == 1) {
                alert("Please enter ingredient name to open compalince remarks");
                return false;
            }
            else {
                alert("Please enter ingredient name to open claims info");
                return false;
            }
        }
    }
    else if (workingIngredientTypeId == activeOtherId) {
        if (ing) {
            return true;
        }
        else if (!ing) {
            if (popup == 1) {
                alert("Please enter ingredient name to open compalince remarks");
                return false;
            }
            else {
                alert("Please enter ingredient name to open claims info");
                return false;
            }
        }
    }
    else if (workingIngredientTypeId == inActiveId) {
        if (ing) {
            return true;
        }
        else if (!ing) {
            alert("Please enter ingredient name to open compalince remarks");
            return false;
        }
    }

    return false;

}
function CheckIngredientAlreadyExists(ingredientName, e) {
    var index = ingredientNamesList.findIndex(function (obj, i) {
        return obj.IngredientName.trim().toLowerCase() === ingredientName.trim().toLowerCase()
    });
    if (index > -1) {
        return 0;
    };
    return 1;
}
function GetMatchedArrayIndex(obj, ArrayNo) {

    // Array No 1 -- detailsArray
    // Array No 2 -- complianceRemarksArray

    var $tr = $(obj).closest('tr');
    var rowNo = parseInt($($tr).find('.row-no').text());
    var rowRegionId = parseInt($($tr).find('.row-region-id').text());
    var matchedArrIndex;

    if (ArrayNo == 1) {
        for (var i = 0; i < detailsArray.length; i++) {
            var row = detailsArray[i];
            if (row.RowNo == rowNo) {
                matchedArrIndex = i;
                break;
            }
        }
    }
    else {
        for (var i = 0; i < complianceRemarksArray.length; i++) {
            var row = complianceRemarksArray[i];
            if (row.RegionId == rowRegionId) {
                matchedArrIndex = i;
                break;
            }
        }
    }

    return matchedArrIndex;

}
function onSaveCloseRemCom() {

    var regId = complianceRemarksPopupRegId;
    var obj = complianceRemarksArray.filter(item => item.RegionId == regId);
    obj[0].MedicineRecommendation = $("#in-med-recommendation").val().trim();
    obj[0].FoodSupplementRecommendation = $("#in-fs-recommendation").val().trim();
    obj[0].AdditionalInfo = $.trim(CKEDITOR.instances["compliance-remarks-editor"].getData());

    if (isOneRegionDataAdded(complianceRemarksPopupRegId)) {
        $(".mandatory-field").addClass('hide');
    }

}
function onSaveCloseClaInfo() {

    var matchedArrIndex = claimsInfoPopupArrIndex;
    detailsArray[matchedArrIndex].CInfo = $.trim(CKEDITOR.instances["claims-info-editor"].getData());

    if (isOneRegionDataAdded(detailsArray[matchedArrIndex].RegionId)) {
        $(".mandatory-field").addClass('hide');
    }
}
function onSaveCloseRemComInactives() {
    
    var matchedArrIndex = comRemarksInactivesPopupArrIndex;
    detailsArray[matchedArrIndex].InActivesCRemarks = $.trim(CKEDITOR.instances["compliance-remarks-editor-inactives"].getData());

    if (isOneRegionDataAdded(detailsArray[matchedArrIndex].RegionId)) {
        $(".mandatory-field").addClass('hide');
    }

}
function isOneRegionDataAdded(regId) {

    if (workingIngredientTypeId == inActiveId) {

        let regDetailArr = detailsArray.filter(o => o.RegionId == regId);

        for (let a = 0; regDetailArr.length > a; a++) {
            if (!
                (regDetailArr[a].RegulatoryStatus > 0 &&
                    IsValidData(regDetailArr[a].InActivesCRemarks))
            ) {
                return false;
            }
        }

    }
    else {
        let regDetailArr = detailsArray.filter(o => o.RegionId == regId);

        for (let a = 0; regDetailArr.length > a; a++) {
            if (!
                (regDetailArr[a].RegulatoryStatus > 0 &&
                    IsValidData(regDetailArr[a].CInfo))
            ) {
                return false;
            }
        }

        let regCRArr = complianceRemarksArray.filter(item => item.RegionId == regId);

        for (let b = 0; b < regCRArr.length; b++) {
            if (!
                (IsValidData(regCRArr[b].MedicineRecommendation) &&
                    IsValidData(regCRArr[b].FoodSupplementRecommendation))
            ) {
                return false;
            }
        }

        let regRGArr = regionGroupArray.filter(item => item.RegionId == regId);

        if (regRGArr.length > 0) {
            for (let c = 0; c < regRGArr.length; c++) {
                if (!IsValidData(regRGArr[c].RegionGroupData)) {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }

    return true;
}

//-------------------------------------------------------------------on click & change code-------------------------------------------------------------------

// on click of refresh
$(document).on('click', '#refresh', function () {

    if (ingredientTypeId == inActiveId && workingTab == 1) {
        alert('Please select the ingredient type');
    }
    else {
        if (ValidateIsChangesDoneOverAll(0, 0)) {
            UnsavedDataAlert("You have some unsaved Data, Please save as draft otherwise you will lose the data",
                function () {
                    $("#save-draft-fs").click();
                },
                function () {
                    OnAction(workingTab, '', 2);
                },
            );
        }
        else {
            OnAction(workingTab, '', 2);
        }
    }

});

// ingredient type on change
$(document).on('change', '#ingredient-type', function () {

    if (ValidateIsChangesDoneOverAll(0, 0) == false) {

        if ($(this).val().trim() != "") {

            isIngredientTypeNotSelected = false;
            $(this).siblings('span').addClass('hide');
            var ingTypeId = ($(this).val());

            if (parseInt(ingTypeId) == parseInt(activeHerbId)) {
                OnAction(workingTab, '', 3, activeHerbId);
            }
            else if (parseInt(ingTypeId) == parseInt(activeOtherId)) {
                OnAction(workingTab, '', 3, activeOtherId);
            }

        }
        else if ($(this).val().trim() == "") {
            isIngredientTypeNotSelected = true;
            ActiveTab();
        }

    }
    else {
        UnsavedDataAlert("You have some unsaved Data, Please save as draft otherwise you will lose the data",
            function () {
                $("#save-draft-fs").click();
            },
            function () {
                OnAction(workingTab, '', 3, $("#ingredient-type").val());
            },
        );
    }

});

// botanical name on change
$(document).on('change', '#botanical-name', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span').addClass('hide');
    }
});

// ingredient name on change
$(document).on('change', '#ingredient-name', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span:first').addClass('hide');
        var result = CheckIngredientAlreadyExists($(this).val());
        if (result == 0) {
            $(".ingredient-exists").removeClass('hide');
        }
        else {
            $(".ingredient-exists").addClass('hide');
        }
    }
});

// ingredient reg status on change
$(document).on('change', '[data-reg-status]', function () {
    if ($(this).val().trim() != "") {

        var matchedArrIndex = GetMatchedArrayIndex(this, 1);
        detailsArray[matchedArrIndex].RegulatoryStatus = parseInt($(this).val().trim());
        $(this).siblings('span:last').addClass('hide');
        if (isOneRegionDataAdded(detailsArray[matchedArrIndex].RegionId)) {
            $(".mandatory-field").addClass('hide');
        }
    }
});

// show compliance remarks popup
$(document).on('click', '[data-com-remarks]', function () {

    $("#in-fs-recommendation").closest('.form-group').find("span").addClass('hide');
    $("#in-med-recommendation").closest('.form-group').find("span").addClass('hide');

    var matchedArrIndex = GetMatchedArrayIndex(this, 2);

    if (AbleToOpenPopup(1)) {
        $(".cr-popup-reg-name").text(complianceRemarksArray[matchedArrIndex].Region);
        $(".cr-popup-ing-name").text($("#ingredient-name").val().trim());

        LoadRegionGroupJqgrid(complianceRemarksArray[matchedArrIndex].RegionId);

        if (CKEDITOR.instances['compliance-remarks-editor']) {
            CKEDITOR.instances['compliance-remarks-editor'].destroy(true);
        }
        CKEDITOR.replace('compliance-remarks-editor', config);
        var AdditionalInfo = complianceRemarksArray[matchedArrIndex].AdditionalInfo;
        if (AdditionalInfo != undefined) {
            CKEDITOR.instances["compliance-remarks-editor"].setData(AdditionalInfo);
        }
        CKEDITOR.addCss(`
                          img {
                           height: 200px !important;
                          }
                        `);
        complianceRemarksPopupRegId = complianceRemarksArray[matchedArrIndex].RegionId;
        complianceRemarksPopupRowId = detailsArray.filter(o => o.RegionId == complianceRemarksPopupRegId).map(item => item.RowNo)[0];
        $(".cr-popup-recc-header").html(complianceRemarksArray[matchedArrIndex].Region + ' Recommendation');
        $("#in-med-recommendation").val(complianceRemarksArray[matchedArrIndex].MedicineRecommendation);
        $("#in-fs-recommendation").val(complianceRemarksArray[matchedArrIndex].FoodSupplementRecommendation);

        if (validationToShowArray.length > 0) {

            let reccValidation = validationToShowArray.filter(item => item.type == "Recc" && item.regId == complianceRemarksPopupRegId);

            if (reccValidation.length > 0) {

                reccValidation.forEach(function (item) {
                    if (item.id == 1) {
                        $("#in-fs-recommendation").closest('.form-group').find("span").removeClass('hide');
                    } else if (item.id == 2) {
                        $("#in-med-recommendation").closest('.form-group').find("span").removeClass('hide');
                    }
                });

            }

            let rgValidation = validationToShowArray.filter(item => item.type == "RegGroup" && item.regId == complianceRemarksPopupRegId);

            rgValidation.forEach(function (item) {
                $("#region-grp-id-" + item.id).removeClass('hide');
            });

        }

        $("#compliance-remarks-popup").modal('show');
    }

});

// show claims info popup
$(document).on('click', '[data-claims-info]', function () {

    claimsInfoPopupRowId = $(this).closest('tr').attr('id');
    var matchedArrIndex = GetMatchedArrayIndex(this, 1);

    if (AbleToOpenPopup(2)) {
        $(".ci-popup-reg-name").text(detailsArray[matchedArrIndex].Region);
        $(".ci-popup-ing-name").text($("#ingredient-name").val().trim());
        $(".ci-popup-cat-name").text(detailsArray[matchedArrIndex].Category);

        claimsInfoPopupRegId = detailsArray[matchedArrIndex].RegionId;
        claimsInfoPopupCatId = detailsArray[matchedArrIndex].CategoryId;
        claimsInfoPopupArrIndex = matchedArrIndex;

        if (CKEDITOR.instances['claims-info-editor']) {
            CKEDITOR.instances['claims-info-editor'].destroy(true);
        }
        CKEDITOR.replace('claims-info-editor', config);
        var CInfo = detailsArray[matchedArrIndex].CInfo;
        if (CInfo != undefined) {
            CKEDITOR.instances["claims-info-editor"].setData(CInfo);
        }
        CKEDITOR.addCss(`
                          img {
                            height: 200px !important;
                          }
                        `);

        // claims info ckeditor on change
        CKEDITOR.instances['claims-info-editor'].on('change', function () {
            var editorContent = CKEDITOR.instances['claims-info-editor'].getData().trim();
            if (editorContent != "") {
                $("#" + claimsInfoPopupRowId).find("[data-claims-info]").parent().find("span").addClass('hide');
            }
        });

        $("#claims-info-popup").modal('show');
    }

});

// show compliance remarks popup for inactives
$(document).on('click', '[inactive-c-rem]', function () {
    
    comRemarksInactivesPopupRowId = $(this).closest('tr').attr('id');
    var matchedArrIndex = GetMatchedArrayIndex(this, 1);
    comRemarksInactivesPopupArrIndex = matchedArrIndex;

    if (AbleToOpenPopup(3)) {
        $(".cir-popup-reg-name").text(detailsArray[matchedArrIndex].Region);
        $(".cir-popup-ing-name").text($("#ingredient-name").val().trim());
        $(".cir-popup-cat-name").text(detailsArray[matchedArrIndex].Category);

        claimsInfoPopupRegId = detailsArray[matchedArrIndex].RegionId;
        claimsInfoPopupCatId = detailsArray[matchedArrIndex].CategoryId;
        claimsInfoPopupArrIndex = matchedArrIndex;

        if (CKEDITOR.instances['compliance-remarks-editor-inactives']) {
            CKEDITOR.instances['compliance-remarks-editor-inactives'].destroy(true);
        }
        CKEDITOR.replace('compliance-remarks-editor-inactives', config);
        var InActivesCRemarks = detailsArray[matchedArrIndex].InActivesCRemarks;
        if (InActivesCRemarks != undefined) {
            CKEDITOR.instances["compliance-remarks-editor-inactives"].setData(InActivesCRemarks);
        }
        CKEDITOR.addCss(`
                          img {
                            height: 200px !important;
                          }
                        `);

        // compliance remarks inactives ckeditor on change
        CKEDITOR.instances['compliance-remarks-editor-inactives'].on('change', function () {
            var editorContent = CKEDITOR.instances['compliance-remarks-editor-inactives'].getData().trim();
            if (editorContent != "") {
                $("#" + comRemarksInactivesPopupRowId).find("[inactive-c-rem]").parent().find("span").addClass('hide');
            }
        });

        $("#compliance-remarks-popup-inactives").modal('show');
    }

});

// fs recc on change
$(document).on('change', '#in-fs-recommendation', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span').addClass('hide');
        if (validationToShowArray.length > 0) {
            validationToShowArray = validationToShowArray.filter(o =>
                !(o.id == 1 && o.regId == complianceRemarksPopupRegId && o.type == "Recc")
            );
        }
        if (validationToShowArray.filter(o => o.regId == complianceRemarksPopupRegId).length == 0) {
            $("#" + complianceRemarksPopupRowId).find("[data-com-remarks]").closest(".text-center").find("span").addClass('hide');
        }
    }
});

// im recc on change
$(document).on('change', '#in-med-recommendation', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span').addClass('hide');
        if (validationToShowArray.length > 0) {
            validationToShowArray = validationToShowArray.filter(o =>
                !(o.id == 2 && o.regId == complianceRemarksPopupRegId && o.type == "Recc")
            );
        }
        if (validationToShowArray.filter(o => o.regId == complianceRemarksPopupRegId).length == 0) {
            $("#" + complianceRemarksPopupRowId).find("[data-com-remarks]").closest(".text-center").find("span").addClass('hide');
        }
    }
});

// close compliance remarks popup
$(document).on('click', '.com-rem-popup-close', function () {

    onSaveCloseRemCom();
    $("#compliance-remarks-popup").modal('hide');

});

// close claims info popup
$(document).on('click', '.c-info-popup-close', function () {

    onSaveCloseClaInfo();
    $("#claims-info-popup").modal('hide');

});

// close complaince remarks inactives remarks popup
$(document).on('click', '.com-rem-popup-close-inactives', function () {
    
    onSaveCloseRemComInactives();
    $("#compliance-remarks-popup-inactives").modal('hide');

});

// ingredient impact dates
$(document).on('change', '[data-imp-date]', function () {

    var matchedArrIndex = GetMatchedArrayIndex(this, 1);
    detailsArray[matchedArrIndex].ImpactDates = $(this).val().trim();

});
function OnChangeRegionGroupData(regionGroupId, obj) {
    regionGroupArray.map(function (item) {
        if (item.RegionGroupId == parseInt(regionGroupId)) {
            item.RegionGroupData = $(obj).val().trim();
        }
    });

    $(obj).siblings('span').addClass('hide');

    if (validationToShowArray.length > 0) {
        validationToShowArray = validationToShowArray.filter(o => o.id != parseInt(regionGroupId) || o.type == "Recc")
    }

    if (validationToShowArray.filter(o => o.regId == complianceRemarksPopupRegId).length == 0) {
        $("#" + complianceRemarksPopupRowId).find("[data-com-remarks]").closest(".text-center").find("span").addClass('hide');
    }
}
function navigateMenu(page) {

    // page 1 - to region wise compliance list
    // page 2 - to header page
    //page 3 - to compliance request list page

    if (ValidateIsChangesDoneOverAll(0, 0)) {
        UnsavedDataAlert("You have some unsaved Data, Please save as draft otherwise you will lose the data",
            function () {
                $("#save-draft-fs").click();
            },
            function () {
                if (page == 1) {
                    window.location.href = ROOT + "NewRID/FoodSupplementRWCList" + '?q=' + Encrypt("IngredientType=" + workingIngredientTypeId);
                }
                else {
                    window.location.href = ROOT + "NewRID/ComplianceHeaderMaster";
                }

            },
        );
    }
    else {
        if (page == 1) {
            window.location.href = ROOT + "NewRID/FoodSupplementRWCList" + '?q=' + Encrypt("IngredientType=" + workingIngredientTypeId);
        }
        else if (page == 3) {
            window.location.href = ROOT + "NewRID/FoodSupplementComplianceRequest";
        }
        else {
            window.location.href = ROOT + "NewRID/ComplianceHeaderMaster";
        }
    }

}
function OpenPreview() {

    var regId = complianceRemarksPopupRegId;
    var obj = complianceRemarksArray.filter(item => item.RegionId == regId)[0];

    $(".crp-popup-reg-name").text(obj.Region);
    $(".crp-popup-ing-name").text($("#ingredient-name").val().trim());

    var ckEditorData = $.trim(CKEDITOR.instances["compliance-remarks-editor"].getData());
    var regionGroupDataArray = regionGroupArray.filter(item => item.RegionId == regId);
    var regionGroupHTML = CRRegionGroupData(regionGroupDataArray);
    var ckEditorHTML = CRCkEditorData(ckEditorData);

    $(".crp-popup-reg-grp-data").html(regionGroupHTML);
    $(".crp-popup-add-info-data").html(ckEditorHTML);
    $(".crp-popup-recc-header").html(obj.Region + ' Recommendation');
    $(".crp-in-med-recommendation").val($("#in-med-recommendation").val().trim());
    $(".crp-in-fs-recommendation").val($("#in-fs-recommendation").val().trim());

    $("#preview-ing-details-popup").modal('show');

}

//--------------------------------------------------------------Code for Validation and save----------------------------------------------------------------
function ValidateIsChangesDoneOverAll(id, type) {

    // type 0 --> From refresh (or) back (or) ingredient type change (or) tab switch
    // type 1 --> From save as draft (or) save and confirm

    // AS ---> Already Saved, NS ----> Not Saved

    if (Object.keys(unEditedData).length !== 0) {

        var ingredientType = $("#ingredient-type").val();
        var ingredientName = $("#ingredient-name").val().trim();
        var ingBotanicalName = $("#botanical-name").val().trim();
        var ingSynonyms = $("#synonyms").val().trim();
        var ingCASNo = $("#cas-number").val().trim();
        var ingENo = $("#E-number").val().trim();

        if (
            // (ingredientType != unEditedData.HeaderArray[0].IngredientType) ||
            (ingredientName != unEditedData.HeaderArray[0].IngredientName) ||
            (ingBotanicalName != unEditedData.HeaderArray[0].BotanicalName) ||
            (ingSynonyms != unEditedData.HeaderArray[0].Synonyms) ||
            (ingCASNo != unEditedData.HeaderArray[0].CASNumber) ||
            (ingENo != unEditedData.HeaderArray[0].ENumber)
        ) {
            return true;
        }

        for (var i = 0; i < unEditedData.DetailsArray.length; i++) {

            if (
                (detailsArray[i].RegulatoryStatus != unEditedData.DetailsArray[i].RegulatoryStatus) ||
                (detailsArray[i].ImpactDates != unEditedData.DetailsArray[i].ImpactDates) ||
                (detailsArray[i].CInfo != unEditedData.DetailsArray[i].CInfo) ||
                (detailsArray[i].InActivesCRemarks != unEditedData.DetailsArray[i].InActivesCRemarks)
            ) {
                return true;
            }

        }

        for (var i = 0; i < unEditedData.ComplainceRemarksArray.length; i++) {

            let id = unEditedData.ComplainceRemarksArray[i].RegionId;

            let comRemDataAS = unEditedData.ComplainceRemarksArray.filter(item => item.RegionId == id)[0];
            let comRegionGroupDataAS = unEditedData.RegionGroupArray.filter(item => item.RegionId == id);

            let comRemDataNS = complianceRemarksArray.filter(item => item.RegionId == id)[0];
            let comRegionGroupDataNS = regionGroupArray.filter(item => item.RegionId == id);

            for (let j = 0; j < comRegionGroupDataAS.length; j++) {
                const regionGroupDataNS = comRegionGroupDataNS
                    .filter(item => item.RegionGroupId == comRegionGroupDataAS[j].RegionGroupId)
                    .map(item => item.RegionGroupData)[0];

                if (comRegionGroupDataAS[j].RegionGroupData != regionGroupDataNS) {
                    return true;
                }
            }

            if (
                (comRemDataAS.MedicineRecommendation != comRemDataNS.MedicineRecommendation) ||
                (comRemDataAS.FoodSupplementRecommendation != comRemDataNS.FoodSupplementRecommendation) ||
                (comRemDataAS.AdditionalInfo != comRemDataNS.AdditionalInfo)
            ) {
                return true;
            }
        }

    }

    return false;
}
function ValidateIsChangesDoneInPopup(id, type) {

    if (type == 1) {

        // Here id is regionId

        onSaveCloseRemCom();

        var comRemDataAS = unEditedData.ComplainceRemarksArray.filter(item => item.RegionId == id);
        var comRegionGroupDataAS = unEditedData.RegionGroupArray.filter(item => item.RegionId == id);

        var comRemDataNS = complianceRemarksArray.filter(item => item.RegionId == id);
        var comRegionGroupDataNS = regionGroupArray.filter(item => item.RegionId == id);

        if (
            (comRemDataAS[0].MedicineRecommendation != comRemDataNS[0].MedicineRecommendation) ||
            (comRemDataAS[0].FoodSupplementRecommendation != comRemDataNS[0].FoodSupplementRecommendation) ||
            (comRemDataAS[0].AdditionalInfo != comRemDataNS[0].AdditionalInfo)
        ) {
            return true;
        }

        for (var i = 0; i < comRegionGroupDataAS.length; i++) {
            const regionGroupDataNS = comRegionGroupDataNS.filter(item => item.RegionGroupId == comRegionGroupDataAS[i].RegionGroupId)
                .map(item => item.RegionGroupData);

            if (comRegionGroupDataAS[i].RegionGroupData != regionGroupDataNS) {
                return true;
                break;
            }
        }

    }

    if (type == 2) {

        // Here id is Index of array

        onSaveCloseClaInfo();

        var claimsInfoDataAS = unEditedData.DetailsArray[id].CInfo;

        var claimsInfoDataNS = detailsArray[id].CInfo;

        if (claimsInfoDataAS != claimsInfoDataNS) {
            return true;
        }

    }

    return false;
}
function IsValidationExists(isSaveAndConfirm = 0) {

    validationToShowArray = [];
    $(".mandatory-field").addClass('hide');

    var isValidSave = true;
    var isOneRegionAdded = true;

    // Basic validation
    var ingredientType = $("#ingredient-type").val();
    var ingredientName = $("#ingredient-name").val().trim();
    var botanicalName = $("#botanical-name").val().trim();
    var invalidregions = [];

    if (workingIngredientTypeId != inActiveId) {
        (IsValidData(ingredientType)) ?
            $("#ingredient-type").siblings('span').addClass('hide') :
            ($("#ingredient-type").siblings('span').removeClass('hide'), isValidSave = false);
    }

    if (workingIngredientTypeId == activeHerbId) {
        (IsValidData(botanicalName)) ?
            $("#botanical-name").siblings('span').addClass('hide') :
            ($("#botanical-name").siblings('span').removeClass('hide'), isValidSave = false);
    }

    (ingredientName !== "" && ingredientName !== undefined && ingredientName !== null) ?
        $("#ingredient-name").siblings('span:first').addClass('hide') :
        ($("#ingredient-name").siblings('span:first').removeClass('hide'), isValidSave = false);

    if (from == 1) {
        var result = CheckIngredientAlreadyExists(ingredientName);
        if (result == 0) {
            $(".ingredient-exists").removeClass('hide');
            isValidSave = false;
        }
        else {
            $(".ingredient-exists").addClass('hide');
        }
    }

    // Detailed validation

    if (isSaveAndConfirm == 1) {

        let regionIdToValidate = [];

        if (workingIngredientTypeId == inActiveId) {

            for (let a = 0; a < allregionIdArr.length; a++) {

                // Check detailsArray for RegulatoryStatus, CInfo, and ImpactDates
                let regDetailArr = detailsArray.filter(item => item.RegionId == allregionIdArr[a]);

                for (let b = 0; b < regDetailArr.length; b++) {
                    if (regDetailArr[b].RegulatoryStatus > 0 ||
                        IsValidData(regDetailArr[b].InActivesCRemarks) || IsValidData(regDetailArr[b].ImpactDates)) {
                        if (!regionIdToValidate.includes(allregionIdArr[a])) {
                            regionIdToValidate.push(allregionIdArr[a]);
                        }
                        break;
                    }
                }

            }

            for (var j = 0; regionIdToValidate.length > j; j++) {

                $("#add-edit-grid").find('tr').not('.jqgfirstrow').each(function (i, obj) {

                    var jqgridRegId = parseInt($(obj).find('.row-region-id').html());

                    if (regionIdToValidate[j] == jqgridRegId) {

                        if (!(detailsArray[i].RegulatoryStatus > 0)) {
                            $(obj).find("[data-reg-status]").parent().find("span").removeClass('hide');
                            isValidSave = false;
                        }
                        else {
                            $(obj).find("[data-reg-status]").parent().find("span:last").addClass('hide');
                        }

                        if (!IsValidData(detailsArray[i].InActivesCRemarks)) {
                            $(obj).find("[inactive-c-rem]").parent().find("span").removeClass('hide');
                            isValidSave = false;
                        }
                        else {
                            $(obj).find("[inactive-c-rem]").parent().find("span").addClass('hide');
                        }

                    }

                });

                if (!(isOneRegionDataAdded(regionIdToValidate[j]))) {
                    isOneRegionAdded = false;
                    invalidregions.push(regionIdToValidate[j]);
                    //break;
                }

            }

        }
        else {

            validationToShowArray = [];

            for (let a = 0; a < allregionIdArr.length; a++) {

                let isRegionAdded = false;

                // Check detailsArray for RegulatoryStatus, CInfo, and ImpactDates
                let regDetailArr = detailsArray.filter(item => item.RegionId == allregionIdArr[a]);

                for (let b = 0; b < regDetailArr.length; b++) {
                    if (regDetailArr[b].RegulatoryStatus > 0 ||
                        IsValidData(regDetailArr[b].CInfo) || IsValidData(regDetailArr[b].ImpactDates)) {
                        if (!regionIdToValidate.includes(allregionIdArr[a])) {
                            regionIdToValidate.push(allregionIdArr[a]);
                        }
                        isRegionAdded = true;
                        break;
                    }
                }

                if (!isRegionAdded) {
                    // Check complianceRemarksArray for AdditionalInfo, MedicineRecommendation, FoodSupplementRecommendation
                    let regCRArr = complianceRemarksArray.filter(item => item.RegionId == allregionIdArr[a]);

                    for (let b = 0; b < regCRArr.length; b++) {
                        if (IsValidData(regCRArr[b].AdditionalInfo) ||
                            IsValidData(regCRArr[b].MedicineRecommendation) ||
                            IsValidData(regCRArr[b].FoodSupplementRecommendation)) {
                            if (!regionIdToValidate.includes(allregionIdArr[a])) {
                                regionIdToValidate.push(allregionIdArr[a]);
                            }
                            isRegionAdded = true;
                            break;
                        }
                    }
                }

                if (!isRegionAdded) {
                    // Check regionGroupArray for RegionGroupData
                    let regRGArr = regionGroupArray.filter(item => item.RegionId == allregionIdArr[a]);

                    for (let b = 0; b < regRGArr.length; b++) {
                        if (IsValidData(regRGArr[b].RegionGroupData)) {
                            if (!regionIdToValidate.includes(allregionIdArr[a])) {
                                regionIdToValidate.push(allregionIdArr[a]);
                            }
                            isRegionAdded = true;
                            break;
                        }
                    }
                }
            }

            for (var j = 0; regionIdToValidate.length > j; j++) {

                $("#add-edit-grid").find('tr').not('.jqgfirstrow').each(function (i, obj) {

                    var rowId = $(obj).attr('id');
                    var jqgridRegId = parseInt($(obj).find('.row-region-id').html());

                    if (regionIdToValidate[j] == jqgridRegId) {

                        if (!(detailsArray[i].RegulatoryStatus > 0)) {
                            $(obj).find("[data-reg-status]").parent().find("span").removeClass('hide');
                            isValidSave = false;
                        }
                        else {
                            $(obj).find("[data-reg-status]").parent().find("span:last").addClass('hide');
                        }

                        if (!IsValidData(detailsArray[i].CInfo)) {
                            $(obj).find("[data-claims-info]").parent().find("span").removeClass('hide');
                            isValidSave = false;
                        }
                        else {
                            $(obj).find("[data-claims-info]").parent().find("span").addClass('hide');
                        }

                        let crFlag = true;

                        if (!IsValidData(complianceRemarksArray.filter(o => o.RegionId == regionIdToValidate[j]).map(o => o.FoodSupplementRecommendation)[0])) {
                            validationToShowArray.push({
                                rowId: rowId,
                                regId: regionIdToValidate[j],
                                type: "Recc",
                                id: 1
                            });
                            crFlag = false;
                            isValidSave = false;
                        }

                        if (!IsValidData(complianceRemarksArray.filter(o => o.RegionId == regionIdToValidate[j]).map(o => o.MedicineRecommendation)[0])) {
                            validationToShowArray.push({
                                rowId: rowId,
                                regId: regionIdToValidate[j],
                                type: "Recc",
                                id: 2
                            });
                            crFlag = false;
                            isValidSave = false;
                        }

                        var regRegionGroupArr = regionGroupArray.filter(item => item.RegionId == regionIdToValidate[j]);

                        if (regRegionGroupArr.length > 0) {
                            for (var i = 0; regRegionGroupArr.length > i; i++) {
                                if (!IsValidData(regRegionGroupArr[i].RegionGroupData)) {
                                    validationToShowArray.push({
                                        rowId: rowId,
                                        regId: regionIdToValidate[j],
                                        type: "RegGroup",
                                        id: regRegionGroupArr[i].RegionGroupId
                                    });
                                    crFlag = false;
                                    isValidSave = false;
                                }
                            }
                        }
                        else {
                            validationToShowArray.push({
                                rowId: rowId,
                                regId: regionIdToValidate[j],
                                type: "RegGroup",
                                id: 0
                            });
                            crFlag = false;
                            isValidSave = false;
                        }

                        if (crFlag) {
                            $(obj).find("[data-com-remarks]").closest('div').find("span").addClass('hide');
                        }
                        else {
                            $(obj).find("[data-com-remarks]").closest('div').find("span").removeClass('hide');

                        }

                    }

                });

                if (!(isOneRegionDataAdded(regionIdToValidate[j]))) {
                    isOneRegionAdded = false;
                    invalidregions.push(regionIdToValidate[j]);
                    //break;
                }

            }

        }

        var len = regionIdToValidate.length;
        var str = "";

        if (len > 0) {
            if (!isOneRegionAdded) {
                invalidregions.forEach(function (item) {
                    str += detailsArray.filter(o => o.RegionId == item).map(o => o.Region)[0] + ", ";
                });
                if (str.endsWith(', ')) {
                    str = str.slice(0, -2);
                }
                var msg = "Please enter the Regulatory Status, Compliance Remarks and Claims Info for <b> " + str + "</b> region";
                alert(msg);
            }
        }
        else {
            alert("Please enter the Regulatory Status, Compliance Remarks and Claims Info for atleast one region");
            isValidSave = false;
        }
    }

    if (isValidSave) {
        $(".mandatory-field").addClass('hide');
    }

    return isValidSave;
}

$(document).on('click', '#save-com-rem', function () {

    if (IsValidationExists()) {

        var savingRegionId = complianceRemarksPopupRegId;
        var isModified = ValidateIsChangesDoneInPopup(savingRegionId, 1);

        if (isModified) {
            $('#save-draft-fs').click();
        }
        else {
            alert('There are no changes to save');
        }

    }

});
$(document).on('click', '#save-cla-info', function () {

    if (IsValidationExists()) {

        var savingRowId = claimsInfoPopupArrIndex;
        var isModified = ValidateIsChangesDoneInPopup(savingRowId, 2);

        if (isModified) {
            $('#save-draft-fs').click();
        }
        else {
            alert('There are no changes to save');
        }

    }

});
$(document).on('click', '#save-draft-fs', function () {

    if (ValidateIsChangesDoneOverAll(0, 1)) {
        if (IsValidationExists()) {
            handelConfirmPopup("Are you sure you want to save the ingredient details as draft?",
                function () {

                    headerArray[0].IngredientType = workingIngredientTypeId;
                    headerArray[0].IngredientName = $("#ingredient-name").val().trim();
                    headerArray[0].BotanicalName = $("#botanical-name").val().trim();
                    headerArray[0].Synonyms = $("#synonyms").val().trim();
                    headerArray[0].CASNumber = $("#cas-number").val().trim();
                    headerArray[0].ENumber = $("#E-number").val().trim();

                    detailsArray.forEach(item => {
                        if (item.ImpactDates) {
                            item.ImpactDates = moment(item.ImpactDates, "DD/MM/YYYY").format("YYYY-MM-DD");
                        }
                    });

                    $.ajax({
                        url: ROOT + "NewRID/SaveFoodSupplementAddEdit",
                        type: "POST",
                        data: {

                            IngredientORRequestId: headerArray[0].IngredientId,
                            IngredientType: headerArray[0].IngredientType,
                            From: from,
                            SaveType: "draft",

                            HeaderJson: JSON.stringify(headerArray),
                            DetailsJson: JSON.stringify(detailsArray),
                            ComplainceRemarksJson: JSON.stringify(complianceRemarksArray),
                            RegionGroupJson: JSON.stringify(regionGroupArray)

                        },
                        success: function (result) {

                            $("#confirmpopup").modal("hide");

                            if (result.Message.toLowerCase().includes('success')) {
                                GetAddEditFSDetails(result.Id, 2, workingIngredientTypeId);
                            }
                            else {
                                alert(result.Message);
                            }

                        },
                        error: function (xhr, status, error) {
                            detailsArray.forEach(item => {
                                if (item.ImpactDates) {
                                    item.ImpactDates = moment(item.ImpactDates, "YYYY-MM-DD").format("DD/MM/YYYY");
                                }
                            });
                            alert("Error Occured: " + error);
                        }
                    });

                }
            )
        }
    }
    else {
        alert('There are no changes to save');
    }

});
$(document).on('click', '#save-con-fs', function () {
    if (IsValidationExists(1)) {

        if (ValidateIsChangesDoneOverAll(0, 1) || headerArray[0].IsConfirmed == 0) {

            handelConfirmRemarksPopup("Are you sure you want to save and confirm the ingredient details?",
                function () {

                    var remarks = $("#with-remarks-data").val().trim();
                    if (from == 2) {
                        if (remarks != "" && remarks != null && remarks != undefined) {
                            $("#with-remarks-data").siblings('span').addClass('hide');
                        }
                        else {
                            $("#with-remarks-data").siblings('span').removeClass('hide');
                            return false;
                        }
                    }

                    $("#save-with-remarks-popup").modal("hide");

                    headerArray[0].IngredientType = workingIngredientTypeId;
                    headerArray[0].IngredientName = $("#ingredient-name").val().trim();
                    headerArray[0].BotanicalName = $("#botanical-name").val().trim();
                    headerArray[0].Synonyms = $("#synonyms").val().trim();
                    headerArray[0].CASNumber = $("#cas-number").val().trim();
                    headerArray[0].ENumber = $("#E-number").val().trim();

                    detailsArray.forEach(item => {
                        if (item.ImpactDates) {
                            item.ImpactDates = moment(item.ImpactDates, "DD/MM/YYYY").format("YYYY-MM-DD");
                        }
                    });

                    $.ajax({
                        url: ROOT + "NewRID/SaveFoodSupplementAddEdit",
                        type: "POST",
                        data: {

                            IngredientORRequestId: headerArray[0].IngredientId,
                            IngredientType: headerArray[0].IngredientType,
                            From: from,
                            SaveType: "Confirm",
                            Action: "Sent for Level 1 Approval",
                            Remarks: remarks,

                            HeaderJson: JSON.stringify(headerArray),
                            DetailsJson: JSON.stringify(detailsArray),
                            ComplainceRemarksJson: JSON.stringify(complianceRemarksArray),
                            RegionGroupJson: JSON.stringify(regionGroupArray)

                        },
                        success: function (result) {

                            if (result.Message.toLowerCase().includes('success')) {
                                window.location.href = ROOT + "NewRID/FoodSupplementRWCList" + '?q=' + Encrypt("IngredientType=" + workingIngredientTypeId);
                            }
                            else {
                                alert(result.Message);
                            }

                        },
                        error: function (xhr, status, error) {
                            detailsArray.forEach(item => {
                                if (item.ImpactDates) {
                                    item.ImpactDates = moment(item.ImpactDates, "YYYY-MM-DD").format("DD/MM/YYYY");
                                }
                            });
                            alert("Error Occured: " + error);
                        }
                    });

                },
            );
        }
        else {
            alert('There are no changes to save');
        }
    }

});
$('#download-com-rem-pdf-ondemand').on('click', function () {

    var isValid = true;
    var generatePDFData = "";
    var regId = complianceRemarksPopupRegId;
    var regiondata = complianceRemarksArray.filter(item => item.RegionId == regId)[0];
    var ckEditorData = $.trim(CKEDITOR.instances["compliance-remarks-editor"].getData());
    var regionGroupDataArray = regionGroupArray.filter(item => item.RegionId == regId);
    var ingredientname = $("#ingredient-name").val().trim();

    var additionalInformation = $.trim(CKEDITOR.instances["compliance-remarks-editor"].getData().replaceAll("&nbsp;", "").trim());
    var inMedicine = $("#in-med-recommendation").val().trim();
    var infoodSupplement = $("#in-fs-recommendation").val().trim();

    var validregionGroupRemarksData = regionGroupDataArray.filter(function (obj) {
        return obj.RegionGroupData.trim() != "" && obj.RegionGroupData.trim() != null;
    })
    if ((validregionGroupRemarksData.length === 0) && (additionalInformation === "" || additionalInformation === null) &&
        (inMedicine === "" || inMedicine != null) && (infoodSupplement === "" || infoodSupplement === null)) {
        isValid = false;
        alert("There is no data available to export to PDF");
    }
    if (isValid) {

        var generatePDFData = [];

        generatePDFData.push({
            "Region": regiondata.Region,
            "IngredientName": ingredientname,
            "RegionGroupData": regionGroupDataArray,
            "RegionRecommendation": regiondata.Region + ' Recommendation',
            "AdditionalInformation": ckEditorData,
            "InMedicine": $("#in-med-recommendation").val().trim(),
            "InFoodSupplement": $("#in-fs-recommendation").val().trim()
        });

        var fd = new FormData();
        $.ajax({
            url: ROOT + "NewRID/FoodSupplementPdf",
            type: 'POST',
            dataType: 'HTML',
            contentType: "application/json",
            cache: false,
            data: JSON.stringify(generatePDFData),
            success: function (result) {

                $('.GenerateFSPdf').html(result);
                var htmldata = $(".GenerateFSPdf").html();
                fd.append('JsonString', htmldata);

                $.ajax({
                    url: ROOT + 'NewRID/GeneratePdfHtml',
                    type: 'POST',
                    dataType: 'HTML',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        window.location = window.location.origin + ROOT + 'NewRID/GeneratePdfForAddIngredient?Region=' + regiondata.Region + '&IngredientName=' + ingredientname
                    }

                });
            }
        });

    }
});
$(document).on('click', '.cke_button__image, .cke_button__table', function () {
    $(".modal").addClass('d-none');
});
$(document).on('click', '.cke_dialog_close_button, .cke_dialog_ui_button', function () {
    $(".modal").removeClass('d-none');
});
$(document).on('click', '.cke_button__link, .cke_button__table', function () {
    $(".modal").addClass('d-none');
});
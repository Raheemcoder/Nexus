var Approve_DivisionBasedIngredientList = [];
var AlreadySaved_Approve_DivisionBasedIngredientList = [];
var groupedByRegion;
var CategoryValue = [];
var RegulartoryStatusValue = [];
var UserApprovalLevel = "";
add_color = function (rowId, val, rowobject) {
    var result = "";
    if (rowobject.IsEdited == 1) {
        result = 'class="add-edited-color"';
    }
    if (rowobject.IsRollback == 1) {
        result = 'class="add-rollback-color"';
    }
    return result;
};
functionAttrSetting = function (rowId, val) {
    var result = "";
    if (val.length > 200) {
        result = 'style="white-space:nowrap !important;"';
    }
    else {
        result = "";
    }
    return result;
};
arrtSetting = function (rowId, val) {
    var result;
    if (oldRegion === '' || oldRegion != val) {
        var regDataFilter = data.filter(function (obj) { return obj.Region === val });
        var count = regDataFilter.length;
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    oldRegion = val;
    return result;
};
$(document).ready(function () {
    var firstingredient = $("#firstingredient").val();
    $("#selectedingredient_" + firstingredient).addClass("active");
    var firstElement = $("#selectedingredient_" + firstingredient);
    getapprovallist(firstElement);

});
var Approve_IngridentListColModels = [
    {
        name: 'IsRollback',
        label: 'IsRollback',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        cellattr: add_color,
    },
    {
        name: 'IsEdited',
        label: 'IsEdited',
        resizable: true,
        ignoreCase: true,
        hidden: true,

    },
    {
        name: 'IngredientId',
        label: 'Ingredient Id',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        key: true,

    },
    {
        name: 'IngredientName',
        label: 'Ingredient Name',
        resizable: true,
        ignoreCase: true,
        //width: 250,
        formatter: function (cellvalue, options, rowobject) {
            return '<a href="javascript:void(0)" class="rid_" onclick="GetParticularIngredientData(' + rowobject.IngredientId + ',this)">' + cellvalue + '</a>';
        }
    },
    {
        name: 'Synonyms',
        label: 'Synonyms',
        resizable: true,
        ignoreCase: true,
        //width: 150,
        index: 'Synonyms',
    },
    {
        name: 'CASNumber',
        label: 'CAS Number',
        resizable: true,
        ignoreCase: true,
        //width: 90,
    },
    {
        name: 'InMedicine',
        label: 'In Medicine',
        resizable: true,
        //width: 100,
        align: 'center',
        search: false,
        ignorecase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (UserApprovalLevel.toLowerCase() == "level1") {
                var result = Level1_GetApprovalDropDown(cellvalue, options.rowId, options.colModel.label);
                return result;
            }
            else if (UserApprovalLevel.toLowerCase() == "level2") {
                var result = `<strong>` + Level2_GetSelectedLabel(cellvalue) + `</strong>`;
                return result;
            }
        }
        
    },
    {
        name: 'InFoodSupplement',
        label: 'In Food Supplement',
        resizable: true,
        ignorecase: true,
        search: false,
        align: 'center',
        formatter: function (cellvalue, options, rowobject) {
            if (UserApprovalLevel.toLowerCase() == "level1") {
                var result = Level1_GetApprovalDropDown(cellvalue, options.rowId, options.colModel.label);
                return result;
            }
            else if (UserApprovalLevel.toLowerCase() == "level2") {
                var result = `<strong>` + Level2_GetSelectedLabel(cellvalue) + `</strong>`;
                return result;
            }
        }
    },
    
    {
        name: 'CreatedBy',
        label: 'Requested By',
        resizable: true,
        ignoreCase: true,
        width: 90,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        width: 90,
        formatter: function (cellvalue, options, rowobject) {
            return '<a href="javascript: void(0);" class="grid-icon-only approveicon" onclick="ViewRemarks(' + rowobject.IngredientId + ', \'' + rowobject.IngredientName + '\')" class="icon_color text-success btn_button" title="view"><i class="fas fa-info"></i></a>';
        }
    },
    {
        name: 'IsChecked',
        label: 'Action <input type="checkbox" id="cbox" onclick="checkBox(event)" class="ml-2"/>',
        editable: true,
        index: 'Check_Box',
        width: 60,
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
        align: 'center',
        formatter: function checkboxFormatter(cellValue, options, rowObject) {
            var Checked = cellValue == true ? "checked" : "";
            var uniqueId = 'checkbox-' + options.rowId;
            var checkbox = '<input type="checkbox" ' + Checked + ' id="' + uniqueId + '" class="checkbox"/>';
            return checkbox;
        }
    },

];
function CreateMainJQGrid(result) {
    debugger;
    var Approve_IngredientListGridData = result;

    if (Approve_IngredientListGridData != undefined && Approve_IngredientListGridData != null && Approve_IngredientListGridData != "") {
        Approve_DivisionBasedIngredientList = Approve_IngredientListGridData;
        AlreadySaved_Approve_DivisionBasedIngredientList = Approve_IngredientListGridData;
    }

    UserApprovalLevel = $("#UserApprovalLevel").val();

    if (UserApprovalLevel == undefined || UserApprovalLevel == null || UserApprovalLevel == "") {
        UserApprovalLevel = "";
    }

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/FoodSupplementRegulatoryStatusDropDownData",
        data: {
        },
        dataType: "JSON",
        async: false,
        success: function (response) {
            var responseData = JSON.parse(response);
            CategoryValue = responseData.Item2;
            RegulartoryStatusValue = responseData.Item1;
        },
        error: function () {
            alert("Error occured!!");
        }
    });



    $("#Approve_IngredientListGrid").jqGrid({

        url: '',
        datatype: 'local',
        data: Approve_DivisionBasedIngredientList.length > 0 ? Approve_DivisionBasedIngredientList : [],
        mtype: 'GET',
        colModel: Approve_IngridentListColModels,
        loadonce: true,
        viewrecords: true,
        hoverrows: false,
        pager: '#Approve_IngredientListGrid_Pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Approve_IngredientListGrid tbody tr");
            var objHeader = $("#Approve_IngredientListGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            $('[data-singleselect]').select2();

            $(".add-edited-color").siblings("td").addClass("add-edited-color");
            $(".add-rollback-color").siblings("td").addClass("add-rollback-color");

            var headerCheckbox = document.getElementById('cbox');
            var allChecked = true;
            $('#Approve_IngredientListGrid tbody .checkbox').each(function () {
                if (!this.checked) {
                    allChecked = false;
                    return false;
                }
            });

            var Count = $("#Approve_IngredientListGrid").jqGrid('getGridParam', 'records');

            if (allChecked) {
                if (Count > 0) {
                    headerCheckbox.checked = true;
                }
            } else {
                headerCheckbox.checked = false;
            }
        }
    });

    $("#Approve_IngredientListGrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    jQuery("#Approve_IngredientListGrid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {
                startColumnName: 'InMedicine',
                numberOfColumns: 2,
                titleText: '<div id="ApproveUsage" class="text-center">Usage</div>',
                index: 'Usage',
                name: 'Usage',

            }
        ]
    });

    $('#ApproveUsage').closest('th').addClass('testing');
    $('#Approve_IngredientListGrid').closest('.jqg-first-row-header').hide();
    $('#Approve_IngredientListGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '60vh' });
    $('#Approve_IngredientListGrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#Approve_IngredientListGrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#Approve_IngredientListGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Approve_IngredientListGrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#Approve_IngredientListGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Approve_IngredientListGrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}
function getapprovallist(element) {
    var ingredienttypeid = $(element).attr('data-value');
    $.ajax({
        url: ROOT + 'NewRID/FoodSupplementGetApprovalData',
        type: 'GET',
        dataType: 'JSON',
        data: { IngredientTypeId: ingredienttypeid },
        success: function (result) {
            $.jgrid.gridUnload('#Approve_IngredientListGrid');
            CreateMainJQGrid(result);
        }

    });
}
//---------------------------------------Since this color is hard coded in SP if any change in SP -
//--------------------------------------------[Ingredient_GetDetailsByCategory_Approval] Then change the configuration here also.

var colorStatusMapping_Level1 = [
    { key: 'Red', value: 'Prohibited' },
    { key: 'Blue', value: 'Higher Management/HUB Decision Required' },// As per business requirement value is changed
    { key: 'Green', value: 'Allowed' },
    { key: 'Yellow', value: 'Allowed With Restrictions' }
];

var colorStatusMapping_Level2 = [
    { key: 'Red', value: 'Prohibited' },
    { key: 'Blue', value: 'Higher Management/HUB Decision Required' },// As per business requirement value is chagned
    { key: 'Green', value: 'Allowed' },
    { key: 'Yellow', value: 'Allowed With Restrictions' }
];

// Added this since in model we can able to give " (- and space) ", I have configured here
var categoryNameMapping = [
    { key: 'InMedicine', value: 'In Medicine' },
    { key: 'InFoodSupplement', value: 'In Food Supplement' }
];
//-----------------------------------------------------List Ingrident Jqgrid of Approve Page

var IngredientRemarksColModels = [
    {

        name: 'Remarks',
        label: 'Remarks',
        width: 150
    },
    {

        name: 'Action',
        label: 'Action',
        width: 100

    },
    {

        name: 'CreatedBy',
        label: 'Action By',
        width: 100,

    },
    {

        name: 'CreatedDate',
        label: 'Action Date',
        width: 100,
    },
];
function CreateJQGridForRemarks(filedata) {
    $("#Remarksjqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: filedata,
        mtype: 'GET',
        colModel: IngredientRemarksColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#Remarkspager',
        rowNum: 100,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#Remarksjqgrid tbody tr");
            var objHeader = $("#Remarksjqgrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }


    });
    $('#Remarksjqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#Remarksjqgrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#FileUploadjqgrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#Remarksjqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Remarksjqgrid').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#Remarksjqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Remarksjqgrid').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
}

function ViewRemarks(ingredientId, ingredientName) {
    $.ajax({
        url: ROOT + 'NewRID/DisplayRemarksById',
        type: 'GET',
        dataType: 'JSON',
        data: { IngredientId: ingredientId, IngredientName: ingredientName },
        success: function (result) {
            $.jgrid.gridUnload('#Remarksjqgrid');
            $('#displayremarks').modal('show');
            CreateJQGridForRemarks(result);
        }

    });
}
$('#exceldownload').on('click', function () {

    window.location.href = ROOT + "NewRID/GetApprovalRemarksExcelData";

});
var IngridentColModels = [
    {
        name: 'Region',
        align: 'center',
        classes: 'trs',
        cellattr: arrtSetting,
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;
        }
    },
    {
        name: 'Category',
        classes: 'trs1',
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;
        }
    },
    {
        name: 'RegulatoryStatus',
        label: 'Regulatory Status',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        formatter: function (cellvalue, options, rowobject) {
            var result = UsageStatus(cellvalue);
            return result;
        }
    },
    {
        name: 'CRemarks',
        label: 'Compliance Remarks',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class=""><a href="javascript:void(0)"><i class="fas fa-info-circle" title="compliance remarks" onclick= OpenCRemarksPopup(' + rowobject.RowNo + ')></i></a></div>'
        }
    },
    {
        name: 'ImpactDates',
        label: 'Impact Date',
        resizable: true,
        ignoreCase: true,
        search: true,
    }
];
function createModalGrid(data) {

    oldRegion = '';

    $("#particular-ingredient-details").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: IngridentColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#particular-ingredient-details-pager',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#particular-ingredient-details tbody tr");
            var objHeader = $("#particular-ingredient-details tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#particular-ingredient-details').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#particular-ingredient-details').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#particular-ingredient-details').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#particular-ingredient-details').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#particular-ingredient-details').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#particular-ingredient-details').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#particular-ingredient-details').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

}
function GetParticularIngredientData(ingredientId) {

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetParticularIngredientDetails",
        data: {
            IngredientId: ingredientId
        },
        dataType: "JSON",
        success: function (result) {

            var response = JSON.parse(result);

            $.jgrid.gridUnload('#particular-ingredient-details');
            ParticularIngredientDetails = response.Item2;

            $('.ing-name').text(response.Item1[0].IngredientName);
            $('.ing-sys').text(response.Item1[0].Synonyms);
            $('.ing-bot-name').text(response.Item1[0].BotanicalName);
            $('.ing-cas-no').text(response.Item1[0].CASNumber);
            $('.ing-e-no').text(response.Item1[0].ENumber);
            $('.ing-part-used').text(response.Item1[0].PartUsed);
            $('.ing-sol-used').text(response.Item1[0].SolventsUsed);
            $('.ing-marker').text(response.Item1[0].Markers);

            createModalGrid(ParticularIngredientDetails);

            $("#ParticularIngredientModal").modal("show");
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
function Level1_GetApprovalDropDown(alreadySelected, ingredientId, categoryname) {
    if (alreadySelected == null || alreadySelected == undefined) {
        var selectedValue = "Not Selected"
    }
    else {
        var alreadySelected = colorStatusMapping_Level1.filter(item => item.key.toLowerCase() === alreadySelected.toLowerCase());
        var selectedValue = alreadySelected.map(item => item.value);
    }

    function FuncIsSelected(ComingValue) {
        if (selectedValue[0].toLowerCase() == ComingValue.toLowerCase()) {
            return 1;
        }
        else {
            return 0;
        }
    }

    var category = CategoryValue.filter(function (item) {
        return item.CategoryName.toLowerCase() === categoryname.toLowerCase();
    });

    var categoryId = category[0].CategoryId;

    var DefaultJsonToPass = {
        IngredientId: parseInt(ingredientId),
        CategoryId: categoryId,
        RegStatusId: 0
    };

    var DefaultjsonString = JSON.stringify(DefaultJsonToPass).replace(/"/g, "'");

    var ApproveDropDown = '<select class="demo-content ApproveDropDown" data-singleselect >' + '<option value=' + DefaultjsonString + '> ---Select--- </option>';

    for (var i = 0; i < RegulartoryStatusValue.length; i++) {
        var JsonToPass = {
            IngredientId: parseInt(ingredientId),
            CategoryId: categoryId,
            RegStatusId: RegulartoryStatusValue[i].RegulatoryStatusId
        };

        var jsonString = JSON.stringify(JsonToPass).replace(/"/g, "'");

        var isSelected = (FuncIsSelected(RegulartoryStatusValue[i].RegulatoryStatusName) == 1) ? 'selected' : '';

        ApproveDropDown += '<option value="' + jsonString + '" ' + isSelected + ' >' + RegulartoryStatusValue[i].RegulatoryStatusName + '</option>';
    }

    ApproveDropDown += '</select>';

    return ApproveDropDown;

}
function Level2_GetSelectedLabel(alreadySelected) {
    if (alreadySelected == null || alreadySelected == undefined) {
        return ""
    }
    else {
        var alreadySelected = colorStatusMapping_Level2.filter(item => item.key.toLowerCase() === alreadySelected.toLowerCase());
        return alreadySelected.map(item => item.value);
    }
}

//-----------------------------------------------------List Ingrident Jqgrid check box of Approve Page


// For Header Select All Action
function checkBox(e) {
    e = e || event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = false;

    var headerCheckbox = document.getElementById('cbox');
    var isChecked = headerCheckbox.checked;
    if (isChecked) {
        $('#Approve_IngredientListGrid .checkbox').prop('checked', true);
        Approve_DivisionBasedIngredientList.forEach((item) => {
            item.IsChecked = true;
        });
    }
    else {
        $('#Approve_IngredientListGrid .checkbox').prop('checked', false);
        Approve_DivisionBasedIngredientList.forEach((item) => {
            item.IsChecked = false;
        });
    }
}

// For Particular Row Check box action
$('body').on('click', '#Approve_IngredientListGrid tr td .checkbox', function () {

    var checkeClosestRow = $(this).closest("tr.jqgrow");
    var checkedRowId = parseInt(checkeClosestRow.attr("id"));

    if ($(this).prop('checked')) {
        Approve_DivisionBasedIngredientList.forEach((item) => {
            if (item.IngredientId == checkedRowId) {
                item.IsChecked = true;
            }
        });
    }
    else {
        Approve_DivisionBasedIngredientList.forEach((item) => {
            if (item.IngredientId == checkedRowId) {
                item.IsChecked = false;
            }
        });
    }

    var headerCheckbox = document.getElementById('cbox');
    var allChecked = true;
    $('#Approve_IngredientListGrid tbody .checkbox').each(function () {
        if (!this.checked) {
            allChecked = false;
            return false;
        }
    });

    if (allChecked) {
        headerCheckbox.checked = true;
    } else {
        headerCheckbox.checked = false;
    }

});

//-----------------------------------------------------------Particular Ingrident Details Jqgrid

var oldRegion = "";
arrtSetting = function (rowId, val) {

    var RowToSpan;
    Object.keys(groupedByRegion).forEach((region) => {
        if (region === val.toUpperCase()) {
            const length = groupedByRegion[region].length;
            RowToSpan = length;
        }
    });

    var result;
    if (oldRegion = undefined || oldRegion != val.toUpperCase()) {
        result = ' rowspan=' + '"' + RowToSpan + '"';
    }
    else {
        result = ' style="display:none"';
    }
    oldRegion = val.toUpperCase();
    return result;
};

$("#Approve_ParticularIngredientDetails").jqGrid({
    datatype: 'local',
    data: [],
    colNames: ['Region', 'Category', 'Regulatory Status', 'Compliance Remarks', 'Impact Dates', 'References',/* 'Ref Documents',*//* 'INCI'*/],
    colModel: [

        { name: 'Region', align: 'center', classes: 'trs', cellattr: arrtSetting },

        { name: 'Category', classes: 'trs1' },

        {
            name: 'RegulatoryStatus',
            align: 'center',
            formatter: function (cellvalue, options, rowobject) {
                var result = UsageStatus(cellvalue);
                return result;
            }
        },

        {
            name: 'CRemarks',
        },

        {
            name: 'ImpactDates',
        },

        {
            name: 'References',
        },

    ],

    cmTemplate: { sortable: false },
    loadonce: true,
    viewrecords: true,
    pager: '#Approve_ParticularIngredientDetails_Pager',
    rowNum: 20,
    hoverrows: false,
    scroll: 1,
    beforeSelectRow: function () {
        return false;
    },
    gridComplete: function () {
        oldRegion = "";
    }
});

$('#Approve_ParticularIngredientDetails').closest('.jqg-first-row-header').hide();
$('#Approve_ParticularIngredientDetails').closest('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
$('#Approve_ParticularIngredientDetails').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
var $TableHeight = $('#Approve_ParticularIngredientDetails').closest(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 130) {
    $('#Approve_ParticularIngredientDetails').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $('#Approve_ParticularIngredientDetails').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
}
else {
    $('#Approve_ParticularIngredientDetails').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $('#Approve_ParticularIngredientDetails').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
}

function UsageStatus(cellvalue) {
    if (cellvalue != null && cellvalue != undefined) {

        if (cellvalue == 'Red') {
            return '<span class="pe-2"><i class="red_circle"></i></span>';
        }
        else if (cellvalue == 'Blue') {
            return '<span class="pe-2"><i class="blue_circle"></i></span>';
        }
        else if (cellvalue == 'Yellow') {
            return '<span class="pe-2"><i class="yellow_circle"></i></span>';
        }
        else if (cellvalue == 'Green') {
            return '<span class="pe-2"><i class="green_circle"></i></span>';
        }
    }
    else {
        return "";
    }
}

//--------------------------------------------------On change of approval dropdown and remarks text area

$(document).on("change", ".ApproveDropDown", function () {
    debugger;
    var closestRow = $(this).closest("tr.jqgrow");
    var changedrowId = parseInt(closestRow.attr("id"));

    var matchedArrIndex;
    for (var i = 0; i < Approve_DivisionBasedIngredientList.length; i++) {
        var ingredient = Approve_DivisionBasedIngredientList[i];

        if (ingredient.IngredientId == changedrowId) {
            matchedArrIndex = i;
            break;
        }
    }

    var jsonData = $(this).find("option:selected").val();
    var jsonString = jsonData.replace(/'/g, '"');
    var parsedData = JSON.parse(jsonString);

    if (parsedData.RegStatusId != 0) {

        var regStatus = RegulartoryStatusValue.filter(item => item.RegulatoryStatusId == parsedData.RegStatusId)
        var regStatusName = regStatus[0].RegulatoryStatusName;
        var colorStatus = colorStatusMapping_Level1.filter(item => item.value.toLowerCase() === regStatusName.toLowerCase());
        var color = colorStatus.map(item => item.key);

        var category = CategoryValue.filter(item => item.CategoryId == parsedData.CategoryId)
        var categoryName = category[0].CategoryName;
        var mappedCategory = categoryNameMapping.filter(item => item.value.toLowerCase() === categoryName.toLowerCase());
        var arrayCategory = mappedCategory.map(item => item.key);

        Approve_DivisionBasedIngredientList[matchedArrIndex][arrayCategory] = color[0];

    }
    else {

        var category = CategoryValue.filter(item => item.CategoryId == parsedData.CategoryId)
        var categoryName = category[0].CategoryName;
        var mappedCategory = categoryNameMapping.filter(item => item.value.toLowerCase() === categoryName.toLowerCase());
        var arrayCategory = mappedCategory.map(item => item.key);

        Approve_DivisionBasedIngredientList[matchedArrIndex][arrayCategory] = null;
    }

});

$(document).on("change", "#Remarks_text", function () {

    var rollBackRemarks = $("#Remarks_text").val().trim();

    if (rollBackRemarks.length > 0) {
        $('#Err_Remarks_text').hide();
    }
    else {
        $('#Err_Remarks_text').show();
    }

});

//--------------------------------------------------Rollback remarks popup

$("#Level2_Remarks").click(function () {

    var result = $("#MostRecentRemark").val();
    var remarks = $.parseJSON(result);

    $("#Remarks_table").empty();

    var table = $('#Remarks_table');
    var thead = '<thead class="remarks-table-header"><tr><th>Ingredient Name</th><th>Rollback By</th><th>Rollback On</th><th>Remarks</th></tr></thead>';
    var tbody = "";

    remarks.forEach(function (item) {
        tbody += '<tr><td class="word-wrap-td">' + item.IngredientName + '</td><td>' + item.ActionBy + '</td><td>' + item.ActionDate + '</td><td>' + item.Remarks + '</td></tr>';
    });

    table.append(thead);
    table.append('<tbody class="remarks-table-body">' + tbody + '</tbody>');


    $("#RollBack_RemarksToShow").modal("show");
});

//-------------------------------------------------validating & handeling the action performed

var rowtofill = [];
var GenerateDataToSave = [];
var ingredientCheckedForSave = [];

function AlertIngredientNotFilled(IngredientIdToFill) {

    var ingredientNames = [];

    var ingredientNames = Approve_DivisionBasedIngredientList
        .filter(row => IngredientIdToFill.includes(row.IngredientId))
        .map(row => row.IngredientName);

    var alertMessage = `<div><span class="alert-fill-span">Please select all the category for below Ingredients to Approve</span><div><br><strong class="alert-fill-strong">${ingredientNames.join(', ')} </strong>`;

    alert(alertMessage);
}
function GetJson(alreadySelected, categoryName, ingredientId) {
    debugger;
    var category = CategoryValue.filter(function (item) {
        return item.CategoryName.toLowerCase() === categoryName.toLowerCase();
    });

    var categoryId = category[0].CategoryId;

    if (alreadySelected == null || alreadySelected == undefined) {
        var selectedValue = "Not Selected"
    }
    else {
        var alreadySelected = colorStatusMapping_Level1.filter(item => item.key.toLowerCase() === alreadySelected.toLowerCase());
        var selectedValue = alreadySelected.map(item => item.value);
    }

    if (selectedValue != "Not Selected") {
        var regStatus = RegulartoryStatusValue.filter(item => item.RegulatoryStatusName.toLowerCase() == selectedValue[0].toLowerCase())
        var regStatusId = regStatus[0].RegulatoryStatusId;
    }
    else {
        var regStatusId = 0;
    }


    var JsonToPass = {
        IngredientId: ingredientId,
        CategoryId: categoryId,
        RegStatusId: regStatusId,
        ComplianceRemarks: "",
    };

    return JsonToPass;

}
function Addto_GenerateDataToSave(parsedData) {
    debugger;
    GenerateDataToSave.push({
        parsedData
    });
}
function SubmitApproval(combinedDataToApprove, isSubmit) {
    debugger;
    $("#Remarks_modal").modal("hide");
    $.ajax({
        type: "POST",
        url: ROOT + "NewRID/ApproveRevertIngredient",
        data: {
            IngredientToApprove: JSON.stringify(combinedDataToApprove),
            Action: "Approve",
            Remarks: $("#Remarks_text").val().trim(),
            IsSubmitted: isSubmit
        },
        success: function (response) {
            if (response == "1" || response == "2") {
                window.location.reload();
            }
            else {
                alert('Error Occured!!!');
            }
        },
        error: function (error) {
            alert(error);
        }
    });

}
function SubmitReverted(combinedDataToApprove) {

    $("#Remarks_modal").modal("hide");
    $.ajax({
        type: "POST",
        url: ROOT + "NewRID/FoodSupplementApproveRevertIngredient",
        data: {
            IngredientToApprove: JSON.stringify(combinedDataToApprove),
            Action: "RollBack",
            Remarks: $("#Remarks_text").val().trim(),
        },
        success: function (response) {

            if (response == "1") {
                window.location.reload();
            }
            else {
                alert('Error Occured!!!');
            }
        },
        error: function (error) {
            alert(error);
        }
    });

}
function SubmitCheckedRecord(ingredientIdForSave, Action) {
    debugger;
    GenerateDataToSave = [];

    for (var z = 0; z < ingredientIdForSave.length; z++) {

        var ingredient = Approve_DivisionBasedIngredientList.find(item => item.IngredientId == ingredientIdForSave[z])

        var inmedicine = Addto_GenerateDataToSave(GetJson(ingredient.InMedicine, 'In Medicine', ingredient.IngredientId));
        var infoodsupplement = Addto_GenerateDataToSave(GetJson(ingredient.InFoodSupplement, 'In Food Supplement', ingredient.IngredientId));
    }

    var combinedDataToApprove = [];

    GenerateDataToSave.forEach(item => {
        combinedDataToApprove.push(item.parsedData);
    });

    if (Action.toLowerCase() == "approve") {
        SubmitApproval(combinedDataToApprove, true);
    }
    else if (Action.toLowerCase() == "rollback") {
        SubmitReverted(combinedDataToApprove);
    }
    else if (Action.toLowerCase() == "save") {
        SubmitApproval(combinedDataToApprove, false);
    }

}
function GetIngredientChecked() {
    debugger;
    ingredientCheckedForSave = []
    $('#Approve_IngredientListGrid tbody .checkbox').each(function () {
        if (this.checked) {
            var Row = $(this).closest("tr.jqgrow");
            var rowId = parseInt(Row.attr("id"));
            ingredientCheckedForSave.push(rowId);
        }
    });

}
function validateRemarks(Action) {

    var rollBackRemarks = $("#Remarks_text").val().trim();

    if (Action.toLowerCase() == "rollback") {
        if (rollBackRemarks != "") {
            $('#Err_Remarks_text').hide();
            $('#RollBack_modal').modal('hide');
            SubmitCheckedRecord(ingredientCheckedForSave, Action);
        }
        else {
            $('#Err_Remarks_text').show();
        }
    }
    else {
        SubmitCheckedRecord(ingredientCheckedForSave, Action);
    }

}

$("#approvebtn").click(function () {
    debugger;
    var totalRecords = $("#Approve_IngredientListGrid").jqGrid('getGridParam', 'records');

    GetIngredientChecked();

    if (totalRecords == 0) {
        alert("There is no data to approve");
    }
    else if (ingredientCheckedForSave.length == 0) {
        alert("Please select atleast one ingredient to approve");
    }
    //level 1 approval
    else if (UserApprovalLevel.toLowerCase() == "level1") {
        debugger;
        $("#remarks-mandatory").addClass('hide');

        rowtofill = [];

        for (var i = 0; i < ingredientCheckedForSave.length; i++) {
            debugger;
            var matchingIngredient = Approve_DivisionBasedIngredientList.find(item => item.IngredientId == ingredientCheckedForSave[i])

            var rowId = matchingIngredient.IngredientId;

            if (matchingIngredient.InMedicine== null || matchingIngredient.InFoodSupplement == null) {
                const isRowIdPresent = rowtofill.includes(rowId);
                if (isRowIdPresent) {
                    rowtofill = rowtofill.map(item => (item === rowId ? rowId : item));
                } else {
                    rowtofill.push(rowId);
                }
            }
            else {
                rowtofill = rowtofill.filter(item => item !== rowId)
            }
        }

        if (rowtofill.length > 0) {
            
            AlertIngredientNotFilled(rowtofill);
        }

        else if (rowtofill.length == 0) {

            $('#Err_Remarks_text').hide();
            $("#Remarks_text").val('');
            $("#Remarks_modal").modal("show");

            $('#SendtoApproveRevert').off('click').on('click', function () {
                validateRemarks("Approve");
            });

        }

    }
    //level 2 approval
    else if (UserApprovalLevel.toLowerCase() == "level2") {

        $("#remarks-mandatory").addClass('hide');

        $('#Err_Remarks_text').hide();
        $("#Remarks_text").val('');
        $("#Remarks_modal").modal("show");

        $('#SendtoApproveRevert').off('click').on('click', function () {
            validateRemarks("Approve");
        });
    }
});

$("#cancelbtn").click(function () {
    window.location.href = ROOT + "NewRID/RIDList"
});

$("#revertbtn").click(function () {

    var totalRecords = $("#Approve_IngredientListGrid").jqGrid('getGridParam', 'records');

    GetIngredientChecked();

    if (totalRecords > 0) {

        if (ingredientCheckedForSave.length > 0) {

            $('#Err_Remarks_text').hide();
            $("#Remarks_text").val('');
            $("#remarks-mandatory").removeClass('hide');
            $("#Remarks_modal").modal("show");

            $('#SendtoApproveRevert').off('click').on('click', function () {
                validateRemarks("RollBack");
            });
        }
        else {
            alert("Please select atleast one ingredient to rollback");
        }
    }
    else {
        alert("There is no data to roll back");
    }

});

$("#saveasdraftbtn").on('click', function () {
    debugger;
    var totalRecords = $("#Approve_IngredientListGrid").jqGrid('getGridParam', 'records');
    GetIngredientChecked();

    if (totalRecords == 0) {
        alert("There is no data to save");
    }
    else if (ingredientCheckedForSave.length == 0) {
        alert("Please select atleast one ingredient to save");
    }
    //level 1 approval
    else if (UserApprovalLevel.toLowerCase() == "level1") {

        $("#remarks-mandatory").addClass('hide');

        rowtofill = [];

        for (var i = 0; i < ingredientCheckedForSave.length; i++) {

            var matchingIngredient = Approve_DivisionBasedIngredientList.find(item => item.IngredientId == ingredientCheckedForSave[i])

            var rowId = matchingIngredient.IngredientId;

            if (matchingIngredient.InMedicine == null || matchingIngredient.InFoodSupplement == null) {
                const isRowIdPresent = rowtofill.includes(rowId);
                if (isRowIdPresent) {
                    rowtofill = rowtofill.map(item => (item === rowId ? rowId : item));
                } else {
                    rowtofill.push(rowId);
                }
            }
            else {
                rowtofill = rowtofill.filter(item => item !== rowId)
            }
        }

        if (rowtofill.length > 0) {
            AlertIngredientNotFilled(rowtofill);
        }

        else if (rowtofill.length == 0) {
            $('#confirmpopupmesssage').empty().html('Are you sure you want to save the details ?');
            $("#confirmpopup").modal("show");
            $('#ConfirmOKbutton').off('click').on('click', function () {
                validateRemarks("save");
            });
        }

    }
});
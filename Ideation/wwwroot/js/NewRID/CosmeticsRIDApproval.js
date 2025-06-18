var Approve_DivisionBasedIngredientList = [];
var AlreadySaved_Approve_DivisionBasedIngredientList = [];
var groupedByRegion;
var CategoryValue = [];
var RegulartoryStatusValue = [];
var UserApprovalLevel = "";
var particularingredientdetails = [];


$(document).ready(function () {

    var Approve_IngredientListGridData = $('#Approve_DivisionBasedIngredientListJson').val();

    if (Approve_IngredientListGridData != undefined && Approve_IngredientListGridData != null && Approve_IngredientListGridData != "") {
        Approve_DivisionBasedIngredientList = $.parseJSON(Approve_IngredientListGridData);
        AlreadySaved_Approve_DivisionBasedIngredientList = $.parseJSON(Approve_IngredientListGridData);
    }

    UserApprovalLevel = $("#UserApprovalLevel").val();

    if (UserApprovalLevel == undefined || UserApprovalLevel == null || UserApprovalLevel == "") {
        UserApprovalLevel = "";
    }

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/RegulatoryStatusDropDownData",
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

    PageJqgrid();

});


//---------------------------------------Since this color is hard coded in SP if any change in
//---------------------------------------SP - [Ingredient_GetDetailsByCategory_Approval] Then change the configuration here also.

var colorStatusMapping_Level1 = [
    { key: 'Red', value: 'Prohibited' },
    { key: 'Blue', value: 'PR issue/Upcoming restriction/ Upcoming Ban' },// As per business requirement value is changed
    { key: 'Green', value: 'Allowed' },
    { key: 'Yellow', value: 'Restrictions' }
];

var colorStatusMapping_Level2 = [
    { key: 'Red', value: 'Prohibited' },
    { key: 'Blue', value: 'HGML Approval Required' },// As per business requirement value is changed
    { key: 'Green', value: 'Allowed' },
    { key: 'Yellow', value: 'Restrictions' }
];

// Added this since in model we can able to give " (- and space) ", I have configured here
var categoryNameMapping = [
    { key: 'AdultLeaveOn', value: 'Adult - Leave on' },
    { key: 'AdultRinseOff', value: 'Adult - Rinse off' },
    { key: 'BabyLeaveOn', value: 'Baby - Leave on' },
    { key: 'BabyRinseOff', value: 'Baby - Rinse off' }
];
//-----------------------------------------------------List Ingrident Jqgrid of Approve Page
add_color = function (rowId, val, rowobject) {
    var result = "";
    if (rowobject.IsEdited == 1 || rowobject.IsEdited == 2) {
        result = 'class="add-edited-color"';
    }
    if (rowobject.IsRollback == 1 || rowobject.IsRollback == 2) {
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

Approve_IngridentListColModels = [
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
            return '<a href="javascript:void(0)" class="rid_" onclick="Approve_GetParticularIngredientData(' + rowobject.IngredientId + ',this)">' + cellvalue + '</a>';
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
        name: 'FunctionName',
        label: 'Functions',
        //width: 120,
        resizable: true,
        ignorecase: true,
        cellattr: functionAttrSetting,
    },
    {
        name: 'AdultLeaveOn',
        label: 'Adult - Leave On',
        resizable: true,
        //width: 100,
        align: 'center',
        search: false,
        ignorecase: true,
        index: 'AdultLeaveOn',
        formatter: function (cellvalue, options, rowobject) {
            if (UserApprovalLevel.toLowerCase() == "level1") {
                var result = Level1_GetApprovalDropDown(cellvalue, options.rowId, options.colModel.label);
                return result;
            }
            else if (UserApprovalLevel.toLowerCase() == "level2") {
                var result = `<strong style="font-weight:700">` + Level2_GetSelectedLabel(cellvalue) + `</strong>`;
                return result;
            }
        }
    },
    {
        name: 'AdultRinseOff',
        label: 'Adult - Rinse Off',
        //width: 100,
        resizable: true,
        ignorecase: true,
        search: false,
        align: 'center',
        index: 'AdultRinseOff',
        formatter: function (cellvalue, options, rowobject) {
            if (UserApprovalLevel.toLowerCase() == "level1") {
                var result = Level1_GetApprovalDropDown(cellvalue, options.rowId, options.colModel.label);
                return result;
            }
            else if (UserApprovalLevel.toLowerCase() == "level2") {
                var result = `<strong style="font-weight:700">` + Level2_GetSelectedLabel(cellvalue) + `</strong>`;
                return result;
            }
        }
    },
    {
        name: 'BabyLeaveOn',
        label: 'Baby - Leave On',
        resizable: true,
        //width: 100,
        ignorecase: true,
        search: false,
        align: 'center',
        index: 'BabyLeaveOn',
        formatter: function (cellvalue, options, rowobject) {
            if (UserApprovalLevel.toLowerCase() == "level1") {
                var result = Level1_GetApprovalDropDown(cellvalue, options.rowId, options.colModel.label);
                return result;
            }
            else if (UserApprovalLevel.toLowerCase() == "level2") {
                var result = `<strong style="font-weight:700">` + Level2_GetSelectedLabel(cellvalue) + `</strong>`;
                return result;
            }
        }
    },
    {
        name: 'BabyRinseOff',
        label: 'Baby - Rinse Off',
        resizable: true,
        //width: 100,
        ignorecase: true,
        search: false,
        align: 'center',
        index: 'BabyRinseOff',
        formatter: function (cellvalue, options, rowobject) {
            if (UserApprovalLevel.toLowerCase() == "level1") {
                var result = Level1_GetApprovalDropDown(cellvalue, options.rowId, options.colModel.label);
                return result;
            }
            else if (UserApprovalLevel.toLowerCase() == "level2") {
                var result = `<strong style="font-weight:700">` + Level2_GetSelectedLabel(cellvalue) + `</strong>`;
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
        align: 'center',
        search: false,
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

]
function PageJqgrid() {

    $.jgrid.gridUnload('#Approve_IngredientListGrid');

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
                startColumnName: 'AdultLeaveOn',
                numberOfColumns: 4,
                titleText: '<div id="ApproveUsage" class="text-center">Usage</div>',
                index: 'Usage',
                name: 'Usage',

            }
        ]
    });

    $('#ApproveUsage').closest('th').addClass('testing');
    $('#Approve_IngredientListGrid').closest('.jqg-first-row-header').hide();
    $('#Approve_IngredientListGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-250px + 100vh)' });
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

var IngredientRemarksColModels = [
    {

        name: 'Remarks',
        label: 'Remarks',
        width: 150,
        sortable:false
    },
    {

        name: 'Action',
        label: 'Action',
        width: 100,
        sortable: false

    },
    {

        name: 'CreatedBy',
        label: 'Action By',
        width: 100,
        sortable: false

    },
    {

        name: 'CreatedDate',
        label: 'Action Date',
        width: 100,
        sortable: false
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
function Approve_GetParticularIngredientData(ingredientId, obj) {

    var closestRow = obj.closest("tr.jqgrow");
    var rowId = closestRow.id;

    var gridname = "Approve_IngredientListGrid";
    var rowData = $('#' + gridname).jqGrid('getRowData', rowId);

    var ingredientContent = rowData.IngredientName;
    var ingredientName = $(ingredientContent).text().trim();
    var synonyms = rowData.Synonyms;
    var CASNumber = rowData.CASNumber;
    var functionName = rowData.FunctionName;

    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/Approve_GetParticularIngredientDetails",
        data: {
            IngredientId: ingredientId
        },
        dataType: "JSON",
        success: function (response) {

            var responseData = JSON.parse(response);

            groupedByRegion = {};

            responseData.forEach((obj) => {
                const region = obj.Region.toUpperCase();
                if (!groupedByRegion[region]) {
                    groupedByRegion[region] = [];
                }
                groupedByRegion[region].push(obj);
            });

            const newArray = Object.values(groupedByRegion).flat();


            // Check if there is data in the response
            if (responseData != undefined) {
                particularingredientdetails = newArray;
                CreateParticularIngDataGrid(particularingredientdetails);
            }

            $("#Approve_ParticularIngredientDetailsModal").modal("show");
            $("#Approve_ActiveIngredientName").text(ingredientName);
            $("#Approve_Synonyms").text(synonyms);
            $("#Approve_CAS").text(CASNumber);
            $("#Approve_Functions").text(functionName);

        },
        error: function () {
            alert("Error occured!!");
        }
    });
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
function CreateParticularIngDataGrid(data) {

    $.jgrid.gridUnload('#Approve_ParticularIngredientDetails');

    ParticularIngredientDetailsColModel =
        [
            {
                label: 'Region',
                name: 'Region',
                align: 'center',
                classes: 'trs',
                cellattr: arrtSetting,
                width: 80,
            },
            {
                label: 'Category',
                name: 'Category',
                classes: 'trs1',
                width: 80,
            },
            {
                label: 'Regulatory Status',
                name: 'RegulatoryStatus',
                align: 'center',
                width: 80,
                formatter: function (cellvalue, options, rowobject) {
                    var result = UsageStatus(cellvalue);
                    return result;
                }
            },
            {
                label: 'Compliance Remarks',
                name: 'CRemarks',
                //classes: 'word-break-td',
                width: 250,
                formatter: function (cellvalue, options, rowobject) {
                    if (cellvalue != null  && cellvalue.length > 0) {
                        var charCount = cellvalue.length;
                        var rows = Math.ceil(charCount / 100) + 1;
                        return `<textarea class="form-control date_text_freezed" rows="${rows}" readonly>${cellvalue}</textarea>`;
                    }
                    return '';
                }
            },
            {
                label: 'Impact Dates',
                name: 'ImpactDates',
                width: 80,
            },
            {
                label: 'References',
                name: 'References',
                width: 120,
            },
        ],

        $("#Approve_ParticularIngredientDetails").jqGrid({

            datatype: 'local',
            data: data,
            colModel: ParticularIngredientDetailsColModel,
            cmTemplate: { sortable: false },
            loadonce: true,
            viewrecords: true,
            pager: '#Approve_ParticularIngredientDetails_Pager',
            rowNum: particularingredientdetails.length,
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

}
function UsageStatus(cellvalue) {
    if (cellvalue != null && cellvalue != undefined) {

        if (cellvalue == 'Red') {
            return '<span class="pe-2"><i class="red_circle"></i></span>';
        }
        else if (cellvalue == 'Blue') {
            return '<span class="pe-2"><i class="purple_circle"></i></span>';
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
    GenerateDataToSave.push({
        parsedData
    });
}
function SubmitApproval(combinedDataToApprove, isSubmit) {

    $("#Remarks_modal").modal("hide");
    $.ajax({
        type: "POST",
        url: ROOT + "NewRID/ApproveRevertIngredient",
        data: {
            IngredientToApprove: JSON.stringify(combinedDataToApprove),
            Action: "Approve",
            Remarks: $("#Remarks_text").val().trim(),
            ApprovalLevel: UserApprovalLevel,
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
        url: ROOT + "NewRID/ApproveRevertIngredient",
        data: {
            IngredientToApprove: JSON.stringify(combinedDataToApprove),
            Action: "RollBack",
            Remarks: $("#Remarks_text").val().trim(),
            ApprovalLevel: UserApprovalLevel
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

    GenerateDataToSave = [];

    for (var z = 0; z < ingredientIdForSave.length; z++) {

        var ingredient = Approve_DivisionBasedIngredientList.find(item => item.IngredientId == ingredientIdForSave[z])

        var adultLeaveOn = Addto_GenerateDataToSave(GetJson(ingredient.AdultLeaveOn, 'Adult - Leave on', ingredient.IngredientId));
        var adultRinseOff = Addto_GenerateDataToSave(GetJson(ingredient.AdultRinseOff, 'Adult - Rinse off', ingredient.IngredientId));
        var babyLeaveOn = Addto_GenerateDataToSave(GetJson(ingredient.BabyLeaveOn, 'Baby - Leave on', ingredient.IngredientId));
        var babyRinseOff = Addto_GenerateDataToSave(GetJson(ingredient.BabyRinseOff, 'Baby - Rinse off', ingredient.IngredientId));

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

        $("#remarks-mandatory").addClass('hide');

        rowtofill = [];

        for (var i = 0; i < ingredientCheckedForSave.length; i++) {

            var matchingIngredient = Approve_DivisionBasedIngredientList.find(item => item.IngredientId == ingredientCheckedForSave[i])

            var rowId = matchingIngredient.IngredientId;

            if (matchingIngredient.AdultLeaveOn == null || matchingIngredient.AdultRinseOff == null ||
                matchingIngredient.BabyLeaveOn == null || matchingIngredient.BabyRinseOff == null ||
                matchingIngredient.AdultLeaveOn == undefined || matchingIngredient.AdultRinseOff == undefined ||
                matchingIngredient.BabyLeaveOn == undefined || matchingIngredient.BabyRinseOff == undefined) {
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
    window.location.href = ROOT + "NewRID/CosmeticsRIDList"
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

            if (matchingIngredient.AdultLeaveOn == null || matchingIngredient.AdultRinseOff == null ||
                matchingIngredient.BabyLeaveOn == null || matchingIngredient.BabyRinseOff == null ||
                matchingIngredient.AdultLeaveOn == undefined || matchingIngredient.AdultRinseOff == undefined ||
                matchingIngredient.BabyLeaveOn == undefined || matchingIngredient.BabyRinseOff == undefined) {
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
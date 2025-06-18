var oldRegion = "";
var data = [];
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
var IngridentDetailColModels = [
    {
        name: 'RowNo',
        align: 'center',
        hidden: true
    },
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
        name: 'Category', classes: 'trs1',
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;

        }
    },
    {
        name: 'RegulatoryStatus',
        label: 'Regulatory<br>Status',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 80,

        formatter: function (cellvalue, options, rowobject) {
            var result = UsageStatusWithComments(cellvalue);
            return result;
        }
    },
    {
        name: 'CRemarks',
        label: 'Compliance Remarks',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 250,
    },
    {
        name: 'ImpactDates',
        label: 'Impact Date',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 200,

    },
    {
        name: 'References',
        label: 'References',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 150,
    },
    {
        name: 'ReferenceDoc',
        label: 'Reference Doc',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 150,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsFileExists == true) {
                return '<a href="javascript: void(0);" class="grid-icon-only approveicon" onclick="ViewUploadedFiles(' + rowobject.RegionId + ',' + rowobject.CategoryId + ')" class="icon_color text-success btn_button" title="view"><i class="fas fa-eye"></i></a>';

            }
            else {
                return '';
            }
        }
    },
];
$(document).ready(function () {
    var data = JSON.parse($("#DivisionBasedIngredientListJson").val())
    createGrid(data)

})
$('#prd_desc1').closest('#Usage').closest('th').addClass('testing');
$('#prd_desc1').closest('.jqg-first-row-header').hide();
function UsageStatus(cellvalue) {
    if (cellvalue != null) {

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
function UsageStatusWithComments(cellvalue) {

    if (cellvalue != null) {
        var color = "";
        var text = "";
        color = color + cellvalue;
        if (color == 'Blue') {
            return `<span><span class="pe-2"><i class="purple_circle"></i></span>` + text + `</span>`;
        }
        else if (color == 'Green') {
            return `<span><span class="pe-2"><i class="green_circle"></i></span>` + text + `</span>`;
        }
        else if (color == 'Yellow') {
            return `<span><span class="pe-2"><i class="yellow_circle"></i></span>` + text + `</span>`;
        }
        else if (color == 'Red') {
            return `<span><span class="pe-2"><i class="red_circle"></i></span>` + text + `</span>`;
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
}

$('#global-search').on('input', function () {
    var searchValue = $(this).val().toLowerCase();
    var cardSections = $('.card-section');
    cardSections.each(function () {
        var cardDetailsSearch = $(this).find('.card_details_search');
        var cardText = cardDetailsSearch.text().toLowerCase();

        if (cardText.includes(searchValue)) {
            $(this).css('display', 'block');
        } else {
            $(this).css('display', 'none');
        }
    });
});
$(".board_view").hide();
$(".list_gridview").hide();

$(".list").click(function () {
    $(".grid_view").addClass("list_view");
    $(".grid_view").removeClass("listgrid_table");
    $(".list_gridview").show();
    $(".grid_table").hide();
});

$(".table_view").click(function () {
    $(".grid_view").addClass("listgrid_table");
    $(".grid_view").removeClass("list_view");
    $(".grid_table").show();
});

$(".collapse_cell").click(function () {
    $(this).closest("li").addClass("cell_close");
});
$(".expand_cell").click(function () {
    $(this).closest("li").removeClass("cell_close");
});
function GetParticularIngredientData(Data) {
    var ingredientid = Data.getAttribute("data-ingredientid");
    var ingredientname = Data.getAttribute("data-ingredientname");
    var synonym = Data.getAttribute("data-synonyms");
    if (synonym === 'null') {
        synonym = "";
    }
    var casno = Data.getAttribute("data-casno");
    if (casno === 'null') {
        casno = "";
    }
    var functionname = Data.getAttribute("data-function");
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetIngredientsRegulationById",
        data: {
            IngredientId: ingredientid
        },
        dataType: "JSON",
        success: function (response) {
            //$('#loader').css('visibility', 'visible');
            data = JSON.parse(response);
            $.jgrid.gridUnload('#viewlist');
            createModalGrid();
            $("#IngredientModal1").modal("show");
            $("#ActiveIngredientName").text(ingredientname);
            $("#ActiveSynonymName").text(synonym);
            $("#ActiveCASName").text(casno);
            $("#ActiveFunctions").text(functionname);
            $("#IngredientId").val(ingredientid);
            //$('#loader').css('visibility', 'hidden');


        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
function createModalGrid() {
    oldRegion = "";
    $("#viewlist").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: IngridentDetailColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#viewlist_pager',
        rowNum: data.length,
        sortable: false,
        cmTemplate: { sortable: false },
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#viewlist tbody tr");
            var objHeader = $("#viewlist tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }


    });
    //$("#viewlist").jqGrid('filterToolbar', {
    //    autosearch: true,
    //    stringResult: false,
    //    searchOnEnter: false,
    //    defaultSearch: "cn"
    //});

    $('#viewlist').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#viewlist').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#viewlist').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#viewlist').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#viewlist').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#viewlist').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#viewlist').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
}
$('#closebtn').click(function () {
    $("#IngredientModal1").modal("hide");

});


//------------------------------------------------------------Search Based on Date and text

var isValidStartDateFlag = 1;
var isValidEndDateFlag = 1;

$('#Search_Start_Date').on("change", function (event) {

    var startDate = $('#Search_Start_Date').val();
    if (startDate.length > 10 || startDate.length < 10) {
        $('#Err_Search_Start_Date').show();
        isValidStartDateFlag = 0;
    }
    else {
        $('#Err_Search_Start_Date').hide();
        isValidStartDateFlag = 1;
    }
});

$('#Search_End_Date').on("change", function (event) {

    var endDate = $('#Search_End_Date').val();
    if (endDate.length > 10 || endDate.length < 10) {
        $('#Err_Search_End_Date').show();
        isValidEndDateFlag = 0;
    }
    else {
        $('#Err_Search_End_Date').hide();
        isValidEndDateFlag = 1;
    }
});

$('#search_ingredient').on('click', function () {

    if (isValidEndDateFlag == 1 && isValidStartDateFlag == 1) {
        var startDate = $('[data-datepicker-startdate]').datepicker('getDate');
        var endDate = $('[data-datepicker-enddate]').datepicker('getDate');
        var searchedText = $("#global_search").val().trim();


        if (startDate == null && endDate == null && searchedText == "") {

            alert("There is no data to search");

        }
        else {
            if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (searchedText != undefined && searchedText != null && searchedText != "")
            ) {

                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                GetSearchResult(formattedStartDate, formattedEndDate, searchedText);
            }
            else if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (searchedText == undefined || searchedText == null || searchedText == "")
            ) {
                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                GetSearchResult(formattedStartDate, formattedEndDate, '');
            }

            else if (
                (startDate == undefined || startDate == null || startDate == "") &&
                (endDate == undefined || endDate == null || endDate == "") &&
                (searchedText != undefined && searchedText != null && searchedText != "")
            ) {
                GetSearchResult('', '', searchedText);
            }
            else if (
                ((startDate != undefined && startDate != null && startDate != "") &&
                    (endDate == undefined || endDate == null || endDate == "")) ||
                ((startDate == undefined || startDate == null || startDate == "") &&
                    (endDate != undefined && endDate != null && endDate != ""))
            ) {
                alert("Please select both start date and end date for search");
            }
            else {
                alert("There is no data to search");
            }
        }
    }
    else {
        alert('Please select a valid date');
    }

});

function FormateDateForSearch(DateToFormat) {

    var date = DateToFormat.getDate();
    var month = DateToFormat.getMonth() + 1;

    date = (date < 10 ? '0' : '') + date;
    month = (month < 10 ? '0' : '') + month;

    var formattedDate = DateToFormat.getFullYear() + '-' + month + '-' + date;
    return formattedDate;
}

$('#refresh_date').on('click', function () {

    $('[data-datepicker-startdate]').datepicker('destroy');
    $('[data-datepicker-startdate]').val('');
    $('[data-datepicker-startdate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true
        }
    );

    $('[data-datepicker-enddate]').datepicker('destroy');
    $('[data-datepicker-enddate]').val('');
    $('[data-datepicker-enddate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true
        }
    );

    $("#global_search").val('');


    GetSearchResult('', '', '');

});

function GetSearchResult(formattedStartDate, formattedEndDate, searchText) {
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetIngredientBasedOnSearch",
        data: {
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            SearchText: searchText,
            Source: "IRA"
        },
        dataType: "JSON",
        success: function (response) {
            $.jgrid.gridUnload('#prd_desc1');
            createGrid(response)

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

//--------------------------------------------------------------------------------datepicker attribute

var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 1));
$('[data-datepicker-startdate]').datepicker({
    format: 'dd/mm/yyyy',
    //startDate: start,
    endDate: end,
    autoclose: true
}).on('changeDate', function () {
    $('[data-datepicker-enddate]').datepicker('setStartDate', $(this).val());
    //$('[data-datepicker-enddate]').datepicker('setDate', $(this).val());
});
$('[data-datepicker-enddate]').datepicker({
    format: 'dd/mm/yyyy',
    startDate: start,
    endDate: end,
    autoclose: true
    // update "StartDate" defaults whenever "EndDate" changes
}).on('changeDate', function () {
    $('[data-datepicker-startdate]').datepicker('setEndDate', $(this).val());
});

add_color = function (rowId, val, rowobject) {
    var result = "";
    if (rowobject.IsEdited == 1) {
        result = 'class="add-edited-color"';
    }
    else if (rowobject.IsRollback == 1) {
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

function createGrid(data) {
    debugger;
    jQuery("#prd_desc1").jqGrid({
        datatype: 'local',
        data: data,
        colModel: [
            {
                name: 'IsEdited',
                label: 'IsEdited',
                resizable: true,
                ignoreCase: true,
                hidden: true,
                cellattr: add_color,
            },
            {
                name: 'Action',
                label: 'Action',
                width: 80,
                resizable: true,
                ignoreCase: true,
                search: false,
                
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="justify-center_ action_icons">' +
                        '<a href="' + ROOT + 'NewRID/AddIngredient?q=' + Encrypt('ingredientid=' + rowobject.IngredientId) + '" class="btn-icon edit-color" title="Edit">' +
                        '<i class="fas fa-pen"></i>' +
                        '</a>' +
                        '<a href="#" class="btn-icon" onclick="DeleteIngredient(this)" data-ingredientid="' + rowobject.IngredientId + '" title="Delete">' +
                        '<i class="fas fa-trash color-delete"></i>' +
                        '</a>' +
                        '</div>';
                }


            },
            {
                name: 'IngredientName',
                label: 'Ingredient Name',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 250,
                formatter: function (cellvalue, options, rowobject) {
                    return '<a href="#" class="rid_" data-target="#IngredientModal1" data-ingredientid="' + rowobject.IngredientId + '" data-ingredientname="' + rowobject.IngredientName + '"  data-synonyms="' + rowobject.Synonyms + '" data-casno = "' + rowobject.CASNumber + '" data-function = "' + rowobject.FunctionName + '" onclick="GetParticularIngredientData(this)">' + cellvalue + '</a>';
                }

            },
            {
                name: 'Synonyms',
                label: 'Synonyms',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 150,
                index: 'Synonyms',


            },
            {
                name: 'CASNumber',
                label: 'CAS Number',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 90,
            },
            {
                name: 'FunctionName',
                label: 'Functions',
                width: 120,
                resizable: true,
                search: true,
                ignorecase: true,
                cellattr: functionAttrSetting,
            },
            {
                name: 'AdultLeaveOn',
                label: 'Adult - Leave On',
                resizable: true,
                //width: 100,
                align: 'center',
                ignorecase: true,
                index: 'AdultLeaveOn',
                formatter: function (cellvalue, options, rowobject) {
                    var result = UsageStatus(cellvalue);
                    return result;
                }
            },
            {
                name: 'AdultRinseOff',
                label: 'Adult - Rinse Off',
                //width: 100,
                resizable: true,
                ignorecase: true,
                align: 'center',
                index: 'AdultRinseOff',
                formatter: function (cellvalue, options, rowobject) {
                    var result = UsageStatus(cellvalue);
                    return result;
                }
            },
            {
                name: 'BabyLeaveOn',
                label: 'Baby - Leave On',
                resizable: true,
                //width: 100,
                ignorecase: true,
                align: 'center',
                index: 'BabyLeaveOn',
                formatter: function (cellvalue, options, rowobject) {
                    var result = UsageStatus(cellvalue);
                    return result;
                }
            },
            {
                name: 'BabyRinseOff',
                label: 'Baby - Rinse Off',
                resizable: true,
                //width: 100,
                ignorecase: true,
                align: 'center',
                index: 'BabyRinseOff',
                formatter: function (cellvalue, options, rowobject) {
                    var result = UsageStatus(cellvalue);
                    return result;
                }
            },


        ],
        loadonce: true,
        pager: "#pager_expected1",
        viewrecords: true,
        ignoreCase: true,
        rowNum:20,
        sortable: false,
        cmTemplate: { sortable: false },
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ingredient tbody tr");
            var objHeader = $("#ingredient tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            $(".add-edited-color").siblings("td").addClass("add-edited-color");
        }
    });
    $("#prd_desc1").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#prd_desc1').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 280px )' });
    $('#prd_desc1').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#prd_desc1').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#prd_desc1').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#prd_desc1').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#prd_desc1').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#prd_desc1').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
    $('#prd_desc1').closest("#gview_prd_desc1").css({ 'z-index': '0' });
    jQuery("#prd_desc1").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {
                startColumnName: 'AdultLeaveOn',
                numberOfColumns: 4,
                titleText: '<div id="Usage" class="text-center">Usage</div>',
                index: 'Usage',
                name: 'Usage',
            }
        ]
    });
}
function DeleteIngredient(data) {
    debugger;
    var ingredientid = data.getAttribute("data-ingredientid");
    $('#confirmpopupmesssage').text('Are you sure ,you want to delete');
    $("#confirmpopup").modal("show");
    $('#ConfirmOKbutton').on('click', function () {
        //confirm2("Are you sure do you want to delete..?", function () {
        $.ajax({
            type: "POST",
            url: ROOT + "NewRID/DeleteIngredient",
            data: {
                IngredientId: ingredientid
            },
            dataType: "JSON",
            success: function (result) {
                if (result.includes("Successfully")) {
                    //$('#loader').css('visibility', 'visible');
                    window.location.reload();
                } else {
                    alert(result);
                }
                //$('#loader').css('visibility', 'hidden');
            },
            error: function () {
                alert("Error occured!!");
            }
        });
        $('#confirmpopup').modal('hide');
    });
}
function ViewUploadedFiles(region, category) {
    var ingredientId = parseInt($("#IngredientId").val());
    $.ajax({
        url: ROOT + 'NewRID/DisplayUploadedFiles',
        type: 'POST',
        dataType: 'JSON',
        data: { IngredientId: ingredientId, RegionId: region, CategoryId: category },

        success: function (result) {

            $.jgrid.gridUnload('#FileUploadjqgrid');
            var filedata = JSON.parse(result);
            $('#displayuploadedfiles').modal('show');
            CreateJQGridUploadFile(filedata);
        }

    });
}
var IngredientFileColModels = [

    {

        name: 'RegionId',
        label: 'RegionId',
        hidden: true,
    },
    {

        name: 'CategoryId',
        label: 'CategoryId',
        hidden: true,
    },
    {

        name: 'EnclosureName',
        label: 'File Name',
        width: 250,

    },
    {

        name: 'UploadedBy',
        label: 'Uploaded By',
        width: 150,
    },
    {

        name: 'UploadedOn',
        label: 'Uploaded Date',
        width: 100,
    },
    {
        name: 'Action',
        align: 'center',
        width: 50,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="action_icons ">' +
                '<a href="#" title="Download" class="fas fa-download color-download" onclick="downloadoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" ></a>' +
                '</div >';
        }
    },


];
function CreateJQGridUploadFile(filedata) {
    $("#FileUploadjqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: filedata,
        mtype: 'GET',
        colModel: IngredientFileColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#FileUploadpager',
        rowNum: 100,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#FileUploadjqgrid tbody tr");
            var objHeader = $("#FileUploadjqgrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }


    });
    $('#FileUploadjqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#FileUploadjqgrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#FileUploadjqgrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#FileUploadjqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#FileUploadjqgrid').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#FileUploadjqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#FileUploadjqgrid').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
}
function downloadoc(docdata) {
    var ingredientId = parseInt($("#IngredientId").val());
    var regionId = docdata.getAttribute("data-region");
    var categoryId = docdata.getAttribute("data-category");
    var enclosurename = docdata.getAttribute("data-enclosure");
    window.location.href = ROOT + "NewRID/FileDownload?docName=" + enclosurename + "&&ingredientId=" + ingredientId + "&&regionId=" + regionId + "&&categoryId=" + categoryId;
}
function getDateForExcel(formattedStartDate, formattedEndDate) {
    var isValid = true;
    var searchedtext = $("#global_search").text();
    var data = $('#prd_desc1').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewRID/GetRegionWiseComplianceData?StartDate=" + formattedStartDate + "&&EndDate=" + formattedEndDate + "&searchText=" + searchedtext;
    }
}
$("#exceldownload").on('click', function () {
    debugger;
    if (isValidEndDateFlag == 1 && isValidStartDateFlag == 1) {
        var startDate = $('[data-datepicker-startdate]').datepicker('getDate');
        var endDate = $('[data-datepicker-enddate]').datepicker('getDate');
        var searchedText = $("#global_search").val().trim();

        
            if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (searchedText != undefined && searchedText != null && searchedText != "")
            ) {

                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                getDateForExcel(formattedStartDate, formattedEndDate, searchedText);
            }
            else if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (searchedText == undefined || searchedText == null || searchedText == "")
            ) {
                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                getDateForExcel(formattedStartDate, formattedEndDate, '');
            }

            else if (
                (startDate == undefined || startDate == null || startDate == "") &&
                (endDate == undefined || endDate == null || endDate == "") 
 
            ) {
                getDateForExcel('', '', searchedText);
            }
            
            
        }
   
    else {
        alert('Please select a valid date');
    }
});
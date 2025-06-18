var oldRegion;
var data = [];
arrtSetting = function (rowId, val) {
    var result;
    if (oldRegion = undefined || oldRegion != val) {
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

        //formatter: function (cellvalue, options, rowobject) {
        //    var result = UsageStatusWithComments(cellvalue);
        //    return result;
        //}
    },
    {
        name: 'CRemarks',
        label: 'Compliance Remarks',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 250,
    },
    {
        name: 'ImpactDates',
        label: 'Impact Dates',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 200,
        formatter: function (cell, formatterParams, onRendered) {
            if (!cell) {
                return '';
            }
            var dateParts = cell.split(' ')[0].split('/');
            var month = parseInt(dateParts[0]);
            var day = parseInt(dateParts[1]);
            var year = parseInt(dateParts[2]);
            var formattedDate = new Date(year, month - 1, day);
            return formattedDate.toLocaleDateString();
        }

    },
    {
        name: 'References',
        label: 'References',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 150,
    },
    {
        name: 'INCI',
        label: 'INCI',
        align: 'center',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 150,
        align: "right"
    },
];
$(document).ready(function () {

    $("#StatusId").val("111").trigger("change");
    GetSearchResult("", "", $("#StatusId").val())
    //var data = JSON.parse($("#IngredientListJson").val())
    //data = JSON.parse($("#IngredientListJson").val());
    //createMainGrid(data)
    //data = data.filter(item => item.Status.toLowerCase() == "open"); 
    //$("#search_ingredient").trigger("click");
});
function GetParticularIngredientData(Data) {
    var ingredientid = parseInt(Data.getAttribute("data-ingredientid"));
    var ingredientname = Data.getAttribute("data-ingredientname");
    var synonym = Data.getAttribute("data-synonyms");
    if (synonym === 'null') {
        synonym = "";
    }
    var casno = Data.getAttribute("data-casno");
    var functionname = Data.getAttribute("data-function");
    $.ajax({
        type: "GET",
        url: ROOT + "RID/GetIngredientsRegulationById",
        data:
        {
            IngredientId: ingredientid
        },
        dataType: "JSON",
        success: function (response) {
            //$('#loader').css('visibility', 'visible');
            $("#IngredientViewModal1").modal("show");
            $.jgrid.gridUnload('#viewlist');
            createModalGrid_modal(JSON.parse(response));
            $("#ActiveIngredientName").text(ingredientname);
            $("#ActiveSynonymName").text(synonym);
            $("#ActiveCASName").text(casno);
            $("#ActiveFunctions").text(functionname);

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
function createModalGrid_modal(data) {
    $("#viewlist").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: IngridentDetailColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected1',
        rowNum: 20,
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
    $("#viewlist").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '80vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

    $("#viewlist").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}
function UsageStatusWithComments(cellvalue) {

    if (cellvalue != null) {
        var color = "";
        var text = "";
        color = color + cellvalue;
        if (color == 'Blue') {
            return `<span><span class="pe-2"><i class="blue_circle"></i></span>` + text + `</span>`;
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
function Get_UpdateIngredient(IngredientData) {
    //debugger;
    //var ingredientid = IngredientData.getAttribute("data-IngredientId")
    var ingredientname = IngredientData.getAttribute("data-IngredientName");
    /*var casno = IngredientData.getAttribute("data-Casno");*/
    //var Region = IngredientData.getAttribute("data-Region");
    //var functionname = IngredientData.getAttribute("data-function");
    $('#IngredientName_valid').addClass("_hide");
    $('#CASNumber_valid').addClass("_hide");
    if (!(ingredientname === null || ingredientname === "" || typeof (ingredientname) === "undefined")) {
        $("#title").text("Edit Ingredient");

        $.ajax({
            url: ROOT + 'RID/AddIngredient',
            data: { IngredientName: ingredientname },
            type: 'GET',
            success: function (result) {
                //$('#loader').css('visibility', 'visible');
                data = JSON.parse(result);
                $("#IngredientName").val(data[0].ingredientname);
                $("#CASNumber").val(data[0].casno);
                $("#FunctionId").val(data[0].functionname).trigger("change");
                $("#IngredientName").attr('disabled', true)
                $("#CASNumber").attr('disabled', true)
            }
        });

    }
    else {
        $("#title").text("Add Ingredient");
        $("#IngredientName").val("");
        $("#CASNumber").val("");
        $("#FunctionId").val("").trigger("change");

        $("#IngredientName").attr('disabled', false)
        $("#CASNumber").attr('disabled', false)

    }
}

var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 1));
$('[-datepicker-startdate]').datepicker({
    format: 'dd/mm/yyyy',
    //startDate: start,
    endDate: end,
    autoclose: true
}).on('changeDate', function () {
    $('[-datepicker-enddate]').datepicker('setStartDate', $(this).val());
    //$('[-datepicker-enddate]').datepicker('setDate', $(this).val());
});
$('[-datepicker-enddate]').datepicker({
    format: 'dd/mm/yyyy',
    startDate: start,
    endDate: end,
    autoclose: true
    // update "StartDate" defaults whenever "EndDate" changes
}).on('changeDate', function () {
    $('[-datepicker-startdate]').datepicker('setEndDate', $(this).val());
});
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
    debugger;
    if (isValidEndDateFlag == 1 && isValidStartDateFlag == 1) {
        var startDate = $('[-datepicker-startdate]').datepicker('getDate');
        var endDate = $('[-datepicker-enddate]').datepicker('getDate');
        var status = $("#StatusId").val();


        if (startDate == null && endDate == null && status == "") {

            alert("There is no data to search");

        }
        else {
            if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (status != undefined && status != null && status != "")
            ) {

                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                GetSearchResult(formattedStartDate, formattedEndDate, status);
            }
            else if (
                (startDate != undefined && startDate != null && startDate != "") &&
                (endDate != undefined && endDate != null && endDate != "") &&
                (status == undefined || status == null || status == "")
            ) {
                var formattedStartDate = FormateDateForSearch(startDate);
                var formattedEndDate = FormateDateForSearch(endDate);

                GetSearchResult(formattedStartDate, formattedEndDate, '');
            }

            else if (
                (startDate == undefined || startDate == null || startDate == "") &&
                (endDate == undefined || endDate == null || endDate == "") &&
                (status != undefined && status != null && status != "")
            ) {
                GetSearchResult('', '', status);
            }
            //else if (
            //    ((startDate != undefined && startDate != null && startDate != "") &&
            //        (endDate == undefined || endDate == null || endDate == "")) ||
            //    ((startDate == undefined || startDate == null || startDate == "") &&
            //        (endDate != undefined && endDate != null && endDate != ""))
            //) {
            //    alert("Please select both start date and end date for search");
            //}
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

    $('[-datepicker-startdate]').datepicker('destroy');
    $('[-datepicker-startdate]').val('');
    $('[-datepicker-startdate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true
        }
    );

    $('[-datepicker-enddate]').datepicker('destroy');
    $('[-datepicker-enddate]').val('');
    $('[-datepicker-enddate]').datepicker(
        {
            format: 'dd/mm/yyyy',
            autoclose: true
        }
    );
    $("#StatusId").val('111').trigger('change');

    GetSearchResult('', '', '111');

});

function GetSearchResult(formattedStartDate, formattedEndDate, status) {
    $.ajax({
        type: "GET",
        url: ROOT + "RID/GetIngredientBasedOnSearchRegulation",
        data: {
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            Status: status
        },
        dataType: "JSON",
        success: function (response) {
            $.jgrid.gridUnload('#rideditview');
            createMainGrid(JSON.parse(response));

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

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

function createMainGrid(data) {
    jQuery("#rideditview").jqGrid({

        datatype: 'local',
        data: data,
        colModel: [
            {
                name: 'Action',
                label: 'Action',
                width: 60,
                resizable: true,
                ignoreCase: true,
                //formatter: function (cellvalue, options, rowobject) {
                //    return `<div class="justify-center_">

                //                            '<a href="#" class="btn-icon -edit "><i class="fas fa-edit" onclick="Get_InsertUpdateRetailMaster(this)"  data-IngredientName="' + rowobject.IngredientName + '" data-Casno=' + rowobject.CASNumber + ' data-Region=' + rowobject.Region + '></i></a>'

                //                            <a href="#" class="btn-icon -delete"><i class="fas fa-trash" data-bs-toggle="modal" data-bs-target="#DeleteModal" title="Delete"></i></a>

                //                        </div>`;
                //}
                //formatter: function (cellvalue, options, rowobject) {
                //    return '<div class="justify-center_">' +
                //        '<a href="' + ROOT + 'RID/AddIngredient?ingredientId=' + rowobject.IngredientReqId+'" class="btn-icon -edit"  data-IngredientName="' + rowobject.IngredientName + '" data-Casno="' + rowobject.CASNumber + '" data-Region="' + rowobject.Region + '" data-function="'+rowobject.FunctionName+'">' +
                //        '<i class="fas fa-edit"></i>' +
                //        '</a>' +
                //        '<a href="#" class="btn-icon -view" data-bs-toggle="modal" data-target="#IngredientViewModal1" data-ingredientid="' + rowobject.IngredientId + '" data-ingredientname="' + rowobject.IngredientName + '"  data-synonyms="' + rowobject.Synonyms + '" data-casno = "' + rowobject.CASNumber + '" data-function = "' + rowobject.FunctionName + '" onclick="GetParticularIngredientData(this)" title="View">' +
                //        '<i class="fas fa-eye"></i>' +
                //        '</a>' +
                //        '</div>';

                //}
                formatter: function (cellvalue, options, rowobject) {
                    var html = '<div class="text-center">';

                    if (rowobject.Status == "Open") {
                        //html += '<a href="' + ROOT + 'RID/AddIngredient?ingredientId=' + rowobject.IngredientReqId + '" class="btn-icon -edit" data-IngredientName="' + rowobject.IngredientName + '" data-Casno="' + rowobject.CASNumber + '" data-Region="' + rowobject.Region + '" data-function="' + rowobject.FunctionName + '">' +
                        html += '<a href="' + ROOT + 'RID/AddIngredientRequest?q=' + Encrypt('ingredientId=' + rowobject.IngredientReqId) + '" class="btn-icon -edit" data-IngredientName="' + rowobject.IngredientName + '" data-Casno="' + rowobject.CASNumber + '" data-Region="' + rowobject.Region + '" data-function="' + rowobject.FunctionName + '">' +

                            '<i class="fas fa-edit"></i>' +
                            '</a>';

                    }
                    else {
                        html = '';
                    }
                    //    html += '<a href="#" class="btn-icon -view" data-ingredientid="' + rowobject.IngredientReqId + '" data-ingredientname="' + rowobject.IngredientName + '"  data-synonyms="' + rowobject.Synonyms + '" data-casno = "' + rowobject.CASNumber + '" data-function = "' + rowobject.FunctionName + '" onclick="GetParticularIngredientData(this)" title="View">' +
                    //        '<i class="fas fa-eye"></i>' +
                    //        '</a>' +
                    //        '</div>';
                    //}



                    return html;
                },
                search: false



            },
            {
                name: 'IngredientName',
                label: 'Ingredient Name',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 200,


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
                width: 330,
                resizable: true,
                search: true,
                ignorecase: true,
                cellattr: functionAttrSetting,
            },
            {
                name: 'Region',
                label: 'Region',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 150,



            },
            {
                name: 'Status',
                label: 'Status',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 90,
                search: true


            },
            {
                name: 'CreatedBy',
                label: 'Requested By',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 150,


            },
            {
                name: 'CreatedDate',
                label: 'Requested Date',
                resizable: true,
                ignoreCase: true,
                search: true,
                width: 100,
                //formatter: function (cell, formatterParams, onRendered) {
                //    if (!cell) {
                //        return '';
                //    }
                //    var dateParts = cell.split(' ')[0].split('/');
                //    var month = parseInt(dateParts[0]);
                //    var day = parseInt(dateParts[1]);
                //    var year = parseInt(dateParts[2]);
                //    var formattedDate = new Date(year, month - 1, day);
                //    return moment(formattedDate).format('DD/MM/YYYY');

                ////    return formattedDate.toLocaleDateString();
                //}

            },



        ],
        loadonce: true,
        pager: "#rideditview_Pager",
        viewrecords: true,
        ignoreCase: true,
        rowNum: data.length,
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
        }

    });
    $("#rideditview").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '59vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
    $('#rideditview').closest("#gview_rideditview").css({ 'z-index': '0' });
}
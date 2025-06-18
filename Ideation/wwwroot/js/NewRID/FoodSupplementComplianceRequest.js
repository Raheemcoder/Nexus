var ingredienttypeid = 0;
var ingredienttypeName;
$(document).ready(function () {
    $("#refresh_data").trigger("click");
    ingredienttypeName = $('#firstingredienttypename').val();
});
function getcompliancelist(element) {
    ingredienttypeid = $(element).attr('data-value');
    ingredienttypeName = $(element).attr('data-ingredienttypename');
    $('#searchingredienttype').val(parseInt(ingredienttypeid));
    $('#search_ingredient').trigger('click');
}
function updateGridColumns() {
    if (ingredienttypeName.trim().toLowerCase() === 'active herbs') {
        $("#compliancerequestgrid").jqGrid('hideCol', 'CASNumber');
        $("#compliancerequestgrid").jqGrid('hideCol', 'ENumber');
    }
    if (ingredienttypeName.trim().toLowerCase() === 'active others') {
        $("#compliancerequestgrid").jqGrid('hideCol', 'BotanicalName');
        $("#compliancerequestgrid").jqGrid('showCol', 'CASNumber');
    }
    else if (ingredienttypeName.trim().toLowerCase() === 'inactives') {
        $("#compliancerequestgrid").jqGrid('hideCol', 'BotanicalName');
    }
    $("#compliancerequestgrid").jqGrid('setGridWidth', $("#compliancerequestgrid").width());
}
$('#search_ingredient').on('click', function () {
    var isValid = true;
    ingredienttypeid = $('#searchingredienttype').val();
    var startDate = $('#Search_Start_Date').val();
    var endDate = $('#Search_End_Date').val();
    var status = $("#StatusId").val();
    if (startDate == null && endDate == null && status == "") {

        alert("There is no data to search");
        isValid = false;

    }
    if (((startDate != undefined && startDate != null && startDate != "") &&
        (endDate == undefined || endDate == null || endDate == "")) ||
        ((startDate == undefined || startDate == null || startDate == "") &&
            (endDate != undefined && endDate != null && endDate != ""))
    ) {
        alert("Please select both start date and end date for search");
        isValid = false;
    }
    if (isValid) {
        $.ajax({
            url: ROOT + 'NewRID/FoodSupplementComplianceRequestGetListBasedOnSearch',
            dataType: 'JSON',
            data: {
                IngredientTypeId: ingredienttypeid,
                StartDate: startDate,
                EndDate: endDate,
                Status: status
            },
            type: 'GET',
            success: function (result) {
                createJQGrid(result);

            },
            error: function () {
                alert(" An Error occured!!");
            }
        });
    }

});

$('#refresh_data').on('click', function () {

    var firstingredient = $("#firstingredient").val();
    $('#searchingredienttype').val(parseInt(firstingredient));
    $('#Search_Start_Date').val('');
    $('#Search_End_Date').val('');
    $('[data-datepicker]').datepicker('destroy');
    $('[data-datepicker]').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
    });
    $("#StatusId").val('111').trigger('change');
    $(".ingredienttype_content li").find('.active').removeClass("active");
    $("#selectedingredient_" + firstingredient).addClass("active");

    $('#search_ingredient').trigger('click');
});


$('[data-datepicker]').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true,
});

$('#Search_Start_Date').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true,
}).on('changeDate', function () {
    $('#Search_End_Date').val("");
    $('#Search_End_Date').datepicker('setStartDate', $(this).val());
});


function createJQGrid(data) {
    $.jgrid.gridUnload('#compliancerequestgrid');
    var labelName = ingredienttypeName.trim().toLowerCase() === 'active herbs'
        ? 'Ingredient Name (Sanskrit/English)'
        : 'Ingredient Name';
    var colmodels = [
        {
            name: 'Action',
            label: 'Action',
            width: 60,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                var IngredientTypeId = parseInt(ingredienttypeid);

                var html = '<div class="justify-center_ action_icons">';
                if (rowobject.Status == "Open") {
                    html += '<a href="#" onclick="GetAddEditFSDetails(' + rowobject.IngredientReqId + ', ' + 3 + ' ,' + IngredientTypeId + ')" class="edit-color" title="Edit" data-IngredientName="' + rowobject.IngredientName + '" data-Casno="' + rowobject.CASNumber + '" data-Region="' + rowobject.Region + '" data-function="' + rowobject.FunctionName + '">' +

                        '<i class="fas fa-pen text-primary"></i>' +
                        '</a>';
                } else {
                    html = '';
                }
                return html;
            },
            search: false
        },
        {
            name: 'BotanicalName',
            label: 'Botanical Name',
            resizable: true,
            ignoreCase: true,
            width: 200
        },
        {
            name: 'IngredientName',
            label: labelName,
            resizable: true,
            ignoreCase: true,
            width: 200
        },
        {
            name: 'CASNumber',
            label: 'CAS Number',
            resizable: true,
            ignoreCase: true,
            width: 90,
        },
        {
            name: 'Region',
            label: 'Region',
            width: 120,
            resizable: true,
            ignorecase: true,
        },
        {
            name: 'Status',
            label: 'Status',
            width: 120,
            resizable: true,
            ignorecase: true,
        },
        {
            name: 'CreatedBy',
            label: 'Requested By',
            width: 120,
            resizable: true,
            ignorecase: true,
        },
        {
            name: 'CreatedDate',
            label: 'Requested Date',
            width: 120,
            resizable: true,
            ignorecase: true,
            sorttype: 'date',
            formatter: 'date',
            formatoptions: { newformat: 'd/m/Y' },
            searchoptions: {
                sopt: ['eq'],
                dataInit: function (e) {
                    $(e).datepicker({
                        format: 'dd/mm/yyyy',
                        autoclose: true,
                        todayHighlight: true,
                    }).change(function () {
                        $('#compliancerequestgrid')[0].triggerToolbar();
                    });

                }
            }
        },
    ];
    $("#compliancerequestgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expecte',
        rowNum: data.length,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#compliancerequestgrid tbody tr");
            var objHeader = $("#compliancerequestgrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            updateGridColumns();
        }
    });
    $("#compliancerequestgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
$('#exceldownload').on('click', function () {
    var isValid = true;
    var ingredienttypeid = $('#searchingredienttype').val();
    var startDate = $('#Search_Start_Date').val();
    var endDate = $('#Search_End_Date').val();
    var status = $("#StatusId").val();
    var data = $('#compliancerequestgrid').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewRID/GetFoodSupplementComplianceRequestExcelData?IngredientTypeId=" + ingredienttypeid + "&&IngredientTypeName=" + ingredienttypeName + "&&startDate=" + startDate + "&&endDate=" + endDate + "&&Status=" + status;
    }
});
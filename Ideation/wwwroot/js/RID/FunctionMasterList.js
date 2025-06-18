$(document).ready(function () {
    $("#FunctionId").val(0);
    $(".showStatus").css("display", "none !important");
    $("#Status").val(true);
    GetFunctionData();
})

var functioncolmodels =
    [
        {
            name: 'Action',
            label: 'Action',
            width: 50,
            resizable: true,
            ignoreCase: true,
            search: false,
            formatter: function (cellvalue, options, rowobject) {
                return '<div class="justify-center_ action_icons">' +
                    '<a href="#" class="btn-icon edit-color " onclick="EditFunction(this)" data-functionid="' + rowobject.FunctionId + '" data-functionname = "' + rowobject.FunctionName + '" data-status=' + rowobject.Status + ' title="Edit">' +
                    '<i class="fas fa-pen""></i>' +
                    '</a>' +
                    //'<a href="#" class="btn-icon -delete" onclick="DeleteFunction(this)" data-functionid="' + rowobject.FunctionId + '" title="Delete">' +
                    //'<i class="fas fa-trash"></i>' +
                    //'</a>' +
                    '</div>';
            }


        },
        {
            name: 'FunctionId',
            label: 'Function Id',
            resizable: true,
            ignoreCase: true,
            search: true,
            width: 100,
            hidden: true

        },
        {
            name: 'FunctionName',
            label: 'Function Name',
            resizable: true,
            ignoreCase: true,
            search: true,
            width: 100,

        },
        {
            name: 'StatusName',
            label: 'Status',
            resizable: true,
            ignoreCase: true,
            search: true,
            width: 100,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Status === true) {
                    return '<span class="text-success">' + rowobject.StatusName + '</span>'
                } else {
                    return '<span class="text-danger">' + rowobject.StatusName + '</span>'
                }
            }

        },


    ];
function GetFunctionData() {
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetFunctionList",
        success: function (result) {
            createGrid(result);
        }
    });
}
function createGrid(data) {
    debugger;
    $.jgrid.gridUnload('#function_list');
    jQuery("#function_list").jqGrid({
        datatype: 'local',
        data: data,
        colModel: functioncolmodels,
        loadonce: true,
        pager: "#pager_expected1_",
        viewrecords: true,
        ignoreCase: true,
        rowNum: data.length,
        sortable: false,
        cmTemplate: { sortable: false },
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#function_list tbody tr");
            var objHeader = $("#function_list tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#function_list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#function_list').closest('.ui-jqgrid-bdiv').css({ 'max-height': '55vh' });
    $('#function_list').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#function_list').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#function_list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#function_list').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#function_list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#function_list').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
    $('#function_list').closest("#gview_function_list").css({ 'z-index': '0' });
}

$("input[name=StatusType]").click(function () {
    var value = $("#Filter_Active").is(":checked");
    value ? $("#Status").val(true) : $("#Status").val(false);
})

$("#savebtn").on('click', function () {
    debugger;
    var isValid = true;
    var functionid = $("#FunctionId").val();
    var functionname = $('#FunctionName').val().trim();
    var status = $('#Status').val() == "true" ? true : false;
    if (functionname == '' || functionname == null || functionname == "undefined") {
        isValid = false;
        $("#FunctionName_valid").show();
    }
    if (isValid) {
        $.ajax({
            type: "POST",
            url: ROOT + "NewRID/SaveFunction",
            data: { functionId: functionid, functionName: functionname, status: status },
            success: function (result) {
                debugger;
                if (result.toLowerCase().includes('success')) {
                    $('#FunctionName').val('')
                    window.location.reload();
                }
                else {
                    alert(result);
                }
            }
        });
    }
});
function EditFunction(data) {
    var functionId = data.getAttribute('data-functionid');
    var functionName = data.getAttribute('data-functionname');
    var status = data.getAttribute('data-status') == "true" ? true : false;
    $('#FunctionName').val(functionName);
    $('#FunctionId').val(functionId);
    $('#Status').val(status);
    status ? $("#Filter_Active").prop("checked", true) : $("#Filter_InActive").prop("checked", true)
    $(".showStatus").css("display", "block !important");
}
function DeleteFunction(data) {
    var functionId = data.getAttribute('data-functionid')
    $("#confirmpopup").modal("show");

    $('#ConfirmOKbutton').on('click', function () {
        $.ajax({
            type: "POST",
            url: ROOT + "NewRID/DeleteFunction",
            data: {
                functionId: functionId
            },
            success: function (result) {
                if (result.includes("Successfully")) {
                    window.location.reload();
                } else {
                    alert(result);
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    });
}

$("#exceldownload").on('click', function () {
    var isValid = true;
    var data = $('#function_list').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewRID/GetFunctionMasterExcelData";
    }
});
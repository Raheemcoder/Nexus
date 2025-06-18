var isExport = false;
var roleName = $('#role').val()
//var IsActiveList = ['Active', 'InActive'];
var statuslist = JSON.parse($('#StatusList').val())
var IsActiveList = statuslist.map(function (item) {
    return item.Text;
    
});
$(document).ready(function () {
    $('#btnSearch').trigger('click');
    $('#StatusId').val("1").trigger('change');
    setTimeout(function () {
        $(".aler_dismissal_close").trigger("click");
    }, 5000);
    if (roleName.toLowerCase() == 'view role') {
        $('.hidelegend').hide();
    }
    else {
        $('.hidelegend').show();

    }
});
function LoadGridData() {
    $.ajax({
        type: "GET",
        url: ROOT + "RDMS/GetPlantList",
        data: {},
        async: false,
        success: function (response) {
            createJQGrid(response);
        },
        error: function (response) {
            alert(response);
        }
    });
}
var colmodels = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        width: 30,
        ignoreCase: true,
        sortable: false,
        search: false,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (roleName.trim().toLowerCase() != 'view role') {
                return '<div class="action_icons grid-icons-group -justify-center">' +
                    '<a id="prject-edit" href="javascript:void(0);" class="grid-icon-only prject-edit" title="Edit">' +
                    '<i class="fas fa-pen color-eye"></i></a>' +
                    '<span id="prject-close" class="grid-icon-only prject-close hide" title="Close">' +
                    '<a class="grid-icon-only" href="javascript:void(0);">' +
                    '<i class="fas fa-times-circle color-history"></i></a>' +
                    '<a href="javascript:void(0);" class="grid-icon-only" title="Save" onclick="FetchData(' + options.rowId + ')">' +
                    '<i class="fas fa-save color-file"></i></a></span>' +
                    '<a href="javascript:void(0);" class="grid-icon-only ml-2" title="View" onclick="ViewData(' + rowobject.PlantId + ', \'' + rowobject.PlantCode + '\', \'' + rowobject.PlantName + '\')">' +
                    '<i class="fas fa-info color-info"></i></a>';
            }
            else {
                return '<div class="action_icons grid-icons-group -justify-center">' +
                    '<a href="javascript:void(0);" class="grid-icon-only ml-2" title="View" onclick="ViewData(' + rowobject.PlantId + ', \'' + rowobject.PlantCode + '\', \'' + rowobject.PlantName + '\')">' +
                    '<i class="fas fa-info color-info"></i></a>';
            }
            

        }


    },
    {
        name: 'PlantId',
        label: 'Plant Id',
        resizable: true,
        width: 25,
        ignoreCase: true,
        exportCol: true,
        hidden:true
    },
    {
        name: 'PlantCode',
        label: 'Plant Code',
        resizable: true,
        width: 25,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'PlantName',
        label: 'Plant Name',
        width: 80,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'DisplayName',
        label: 'Display Name',
        width: 80,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'PlantType',
        label: 'Plant Type',
        width: 35,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'State',
        label: 'State Name',
        width: 50,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'City',
        label: 'City Name',
        width: 50,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'Status',
        label: 'Status',
        width: 50,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            var optionData = "";
            for (var optionIndex = 0; optionIndex <= IsActiveList.length - 1; optionIndex++) {
                optionData += ("<option>" + IsActiveList[optionIndex] + "</option>");
            }
            return '<span class="' + rowobject.StatusClass + ' status_text">' + rowobject.Status + '</span>' + '<div class="status-dropdown"><select id="' + options.rowId + 'status-dropdown" class="form-control status-dropdown table-dropdown hide">' + optionData + '</select></div>';

        }
    },
    {
        name: 'StatusName',
        label: 'Status',
        width: 50,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        hidden:true
    }
];

function createJQGrid(result) {
    $.jgrid.gridUnload('#PlantMaster_grid');
    $("#PlantMaster_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#PlantMaster_pager',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#PlantMaster_grid tbody tr");
            var objHeader = $("#PlantMaster_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            
        }
    });
    $("#PlantMaster_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 240px)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
$('#btnSearch').on('click', function () {
    debugger;
    var plantCode = $('#PlantCode').val()
    var status = $('#StatusId').val()
    if (status == '') {
        status = 1
    }
    
    $.ajax({
        type: "GET",
        url: ROOT + "RDMS/GetPlantList",
        data: {plantCode : plantCode ,Status :status},
        async: false,
        success: function (response) {
            createJQGrid(response);
        },
        error: function (response) {
            alert(response);
        }
    });
});
$('#btnrefresh').on('click', function () {
    $('#PlantCode').val('').trigger('change');
    $('#StatusId').val("1").trigger('change');
    $('#btnSearch').trigger('click');

});
function ViewData(plantId, plantCode, plantName) {
    var plant = plantCode  + '['+ plantName + ']';
    $.ajax({
        type: "GET",
        url: ROOT + "RDMS/GetPlantListById",
        data: {plantId : plantId},
        async: false,
        success: function (response) {
            debugger;
            $('.PlantId_text').html('View Plant - '+ plant)
            $('#View_EmailId').text(response[0].EmailId)
            $('#View_Planttype').text(response[0].PlantType)
            $('#View_PhoneNumm').text(response[0].PhoneNo)
            $('#View_Address').text(response[0].Address)
            $('#View_City').text(response[0].City)
            $('#View_State').text(response[0].State)
            $('#View_Status').text(response[0].Status)
            $('#ViewProjectData').modal('show');

        },
        error: function (response) {
            alert(response);
        }
    });

}
function FetchData(data) {
    debugger;
    var rowData = jQuery("#PlantMaster_grid").getRowData(data);

    var plantId = rowData['PlantId'];
    var status = $('#' + data + 'status-dropdown :selected').text();
    if (status.toLowerCase() == 'active') {
        status = 1
    }
    else {
        status = 0
    }
    //window.location.href = ROOT + "RDMS/UpdatePlantMaster" + '?q=' + Encrypt("PlantId=" + plantId + "&Status=" + status);
    window.location.href = ROOT + "RDMS/UpdatePlantMaster?PlantId=" + plantId + "&Status=" + status

}

$(document).on('click', '.prject-edit', function () {
    var $container = $(this).closest(".ui-widget-content");
    $container.find(".status-dropdown").removeClass("hide");
    $container.find(".status_text").addClass("hide");
    var currentStatus = $container.find(".status_text").text().trim();
    $container.find(".status-dropdown").val(currentStatus);
    $(this).addClass("hide");
    $(this).closest(".grid-icons-group").find(".prject-close").removeClass("hide");
});

$(document).on('click', '.prject-close', function () {
    $(this).closest(".ui-widget-content").find(".status-dropdown").addClass("hide");
    $(this).closest(".ui-widget-content").find(".status_text").removeClass("hide");
    $(this).addClass("hide");
    $(this).closest(".grid-icons-group").find(".prject-edit").removeClass("hide");
});

function exportToExcel(gridId, file) {
    $("#" + gridId).jqGrid("exportToExcel", {
        includeLabels: true,
        includeGroupHeader: true,
        includeFooter: true,
        fileName: file + ".xlsx",
        maxlength: 200
    });
}
$("#exceldownload").click(function () {
    isExport = true;
    var fileName = "Manufacturing Location Master";
    var data = $('#PlantMaster_grid').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isExport = false;
    }
    if (isExport) {
        exportToExcel("PlantMaster_grid", fileName);
        isExport = false;
    }
});
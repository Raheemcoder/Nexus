
$(document).ready(function () {


});



colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        search: false,
        exportcol: false,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            debugger
            var role = (rowobject.RoleName).replace('&', '#');
            return '<div class="text-center icon_section action_link align-items-left">' +
                '<a href="' + ROOT + 'Role/Add' + '?q=' + Encrypt("RoleId=" + rowobject.RoleId) + '" class="icon_color btn_button btn-icon -edit mr-2" title="Edit"><i class="fa fa-edit" title="Edit"></i></a>' +
                '<a href="' + ROOT + 'Role/MenuAdd?q=' + Encrypt("RoleId=" + rowobject.RoleId + "&RoleName=" + role)+ '" class="icon_color btn_button btn-icon -link"><i class="fa fa-link" title="Menu Access"></i></a>' +
                '</div>';

        }
    },
    {
        name: 'RoleName',
        label: 'Role Name',
        resizable: true,
        ignoreCase: true,
        search: true,

    },
    {
        name: 'RoleId',
        label: 'RoleId',
        resizable: true,
        ignoreCase: true,
        search: false,
        hidden: true,
        exportcol: false,

    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        search: false,
        hidden: true,
        exportcol: true,

    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        search: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsActive == 1) {
                return '<p class="text-success">' + cellvalue + '</p>'
            }
            else {
                return '<p class="text-danger">' + cellvalue + '</p>'
            }
        }
    },





],

    $("#UserList").jqGrid({
        height: 'auto',
        rowNum: 100,
        mtype: 'GET',

        url: ROOT + "Role/RoleListDisplay",
        datatype: 'json',
        loadonce: true,
        colModel: colmodels,
        pager: "#pager_user",
        viewrecords: true,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#UserList tbody tr");
            var objHeader = $("#UserList tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#UserList").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}

setTimeout(function () {
    $("#message").fadeOut();
}, 5000);

$("#ExcelDownload").click(function () {
    var data = $('#UserList').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#UserList").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "RoleList.xlsx",
            maxlength: 1000, // maxlength for visible string data

        });
    }
});
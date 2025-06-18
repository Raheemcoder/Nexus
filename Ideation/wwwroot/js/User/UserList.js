
$(document).ready(function () {



});


colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        search: false,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center d-flex align-items-left">' +
                '<a href="' + ROOT + 'User/Add' + '?q=' + Encrypt("LoginID=" + rowobject.LoginId) + '"  class="icon_color btn_button useredit btn-icon -edit" title="Edit" ><i class="fa fa-edit" title="Edit"></i></a>' +
                '</div>';
            '</div>';
        }
    },
    {
        name: 'Name',
        label: 'Name',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 100,

    },
    {
        name: 'LoginId',
        label: 'Login Id',
        resizable: true,
        ignoreCase: true,
        width: 100,
        search: true,

    },
    {
        name: 'EmailId',
        label: 'Email Id',
        resizable: true,
        ignoreCase: true,
        width: 190,
        search: true,

    },
    {
        name: 'ADUser',
        label: 'User Type',
        resizable: true,
        ignoreCase: true,
        search: true,
        exportcol: false,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue == 'No') {
                return '<p class="text-success">' + cellvalue + '</p>'
            }
            else {
                return '<p class="text-danger">' + cellvalue + '</p>'
            }
        }

    },
    {
        name: 'ADUser',
        label: 'User Type',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 100,
        exportcol: true,
        hidden: true,

    },
    {
        name: 'Role',
        label: 'Role',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 100,

    },
    {
        name: 'Hub',
        label: 'HUB',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 100,

    },
    {
        name: 'DivisionNames',
        label: 'Division',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 100,

    },
    {
        name: 'DivisionNames',
        classes: 'divisionid',
        hidden: true
    },
    {
        name: 'CategoryNames',
        label: 'Category',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 100,
        classes: 'Category'

    },
    {
        name: 'ManagerNames',
        label: 'Manager',
        resizable: true,
        ignoreCase: true,
        search: true,

    },
   
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        search: true,
        exportcol: false,
        width: 100,
        
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue == 'Active') {
                return '<p class="text-success">' + cellvalue + '</p>'
            }
            else {
                return '<p class="text-danger">' + cellvalue + '</p>'
            }
        }
    },

    {
        name: 'Status',
        label: 'Status',
        //resizable: true,
        //ignoreCase: true,
        //search: true,
        //width: 100,
        exportcol: true,
        hidden: true,
    },



],



    $("#UserList").jqGrid({
        height: 'auto',
        rowNum: 1000,
        // rowList: [5, 10, 15],
        mtype: 'GET',

        url: ROOT + "User/UserListDisplay",
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
            fileName: "UserList.xlsx",
            maxlength: 1000, // maxlength for visible string data

        });
    }
});
var userId = ''
var isExport = 0;
var models = [
    {
        name: 'Action',
        resizable: true,
        width: 30,
        label: 'Action',
        ignoreCase: true,
        classes: 'text-center',
        search: false,
        sortable: false,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="grid-icons-group -justify-center" title="Edit"><a href="' + ROOT + 'MasterManagement/MMAddUser?q=' + Encrypt("LoginId=" + rowobject.LoginId) + '" class="grid-icon-only"><i class="fas fa-pen"></i></a></div>';
        }
    },

    {
        name: 'UserName',
        resizable: true,
        label: 'Name',
        ignoreCase: true
    },
    {
        name: 'EmailId',
        label: 'Email Id',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'IsActive',
        resizable: true,
        width: 50,
        search: true,
        label: 'Status',
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
                if (isExport == 0) {
                    if (rowobject.IsActive === 'Active') {
                        return '<span class="text-success">' + 'Active' + '</span>';
                    }
                    else {
                        return '<span class="text-danger">' + 'InActive' + '</span>';

                    }
                }
                else {
                    return cellvalue;
                }

            }
            
        
    }
]
$(document).ready(function () {
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        url: ROOT + 'MasterManagement/MMGetUserList',
        success: function (data) {
            console.log('data', data);
            if (data != null) {
                $.each(data, function (index, obj) {
                    if (obj.IsActive == true) {
                        obj.IsActive = 'Active';
                    } else {
                        obj.IsActive = 'InActive';
                    }
                })
                console.log('changeduSERDATA', data)
                CreateJQGrid(data);
            }
        }
    });
});
function CreateJQGrid(data) {
    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: models,
        loadonce: true,
        viewrecords: true,
        rowNum: 10000,
        scroll: true,
        pager: '#pager',
        userDataOnFooter: true,

        //multiselect: true,
        gridComplete: function () {
            var objRows = $("#jqgrid tbody tr");
            var objHeader = $("#jqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: true,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();

    if ($TableHeight > 230) {

        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "17px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
       

//$('#UserMasterExport').click(function () {
//    location.href = ROOT + 'MasterManagement/ExportProjectList?q='+Encrypt('Project="UM"')
//})

$(document).on('click', '#UserMasterExport', function () {
    isExport = 1;
    debugger
    $("#jqgrid").jqGrid("exportToExcel", {
        includeLabels: true,
        includeGroupHeader: true,
        includeFooter: true,
        fileName: "UserMaster.xlsx",
        //fileName: fileName,
        maxlength: 40 // maxlength for visible string data

    });
    isExport = 0;
});
var isExport = 0;

var colModels = [
    {
        name: 'Action',
        label: 'Action',
        width: 110,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        classes: 'text-center',
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="grid-icons-group -justify-center"><a id="prject-edit" href=' + ROOT + 'MasterManagement/EditMMProjectMaster?q=' + Encrypt("ProjectCode=" + rowobject.ProjectCode + "&IsMilestonesCompleted=" + rowobject.AllMilestonesCompleted + "&Status=" + rowobject.Status) + ' class="grid-icon-only prject-edit" title="Edit" ><i class="fas fa-pen"></i></a></div>';
        }
    },
    {
        name: 'ProjectCode',
        label: 'Project Code',
        width: 100,
        search: true,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ProjectName',
        resizable: true,
        label: 'Project Name',
        width: 100,
        ignoreCase: true
    },
    {
        name: 'Hub',
        resizable: true,
        label: 'Project Hub',
        width: 100,
        ignoreCase: true
    },
    {
        name: 'Division',
        resizable: true,
        label: 'Project Division',
        width: 100,
        ignoreCase: true
    },
    {
        name: 'Type',
        label: 'Project Type',
        resizable: true,
        width: 100,
        ignoreCase: true
    },
    {
        name: 'Manager',
        resizable: true,
        label: 'Project Manager/Responsible',
        width: 100,
        ignoreCase: true,

    },
    //{
    //    name: 'AllMilestonesCompleted',
    //    resizable: true,
    //    label: 'MSC',
    //    width: 100,
    //    ignoreCase: true,

    //},
    {
        name: 'Status',
        resizable: true,
        width: 70,
        label: 'Project Status',
        ignoreCase: true,
        title: false,
        stype: 'select',
        searchoptions: {
            value: ':All;In Progress:In Progress;Planning:Planning;Completed:Completed;Locked:Locked',
            /*defaultValue: 'In Progress'*/
        },
        formatter: function (cellvalue, options, rowobject) {
            if (isExport == 0) {
                var status = $('<div>').html(rowobject.Status).text(); // Remove HTML tags from Status column
                return '<span class="' + rowobject.Class + ' status_text ">' + status + '</span>';
            }
            else {
                return cellvalue;
            }

        }
    }
]

$(document).ready(function () {

    var qp = "Divisions=&Status=&IsFiltered=NO";

    CreateJQGrid(qp)
});

function CreateJQGrid(qp) {
    var gridData = "";
    //$.ajax({
    //    url: ROOT + 'MasterManagement/MMProjectList?' + qp,
    //    async: false,
    //    caches: false,
    //    success: function (result) {
    //        gridData = result;
    //        //CreateJQGrid(gridData);
    //    },
    //    error: function () {

    //    }
    //})


    $.jgrid.gridUnload('#jqgrid');
    debugger
    jQuery("#jqgrid").jqGrid({
        url: ROOT + 'MasterManagement/MMProjectList?' + qp,
        datatype: 'JSON',
        mtype: 'GET',
        colModel: colModels,
        width: 1,
        rowNum: 10000,
        viewrecords: true,
        scroll: true,
        pager: '#pager',
        loadonce: true,
        //serializeGridData: function (postData) {
        //    return JSON.stringify(postData);
        //},
        //jsonReader: {
        //    repeatitems: false,
        //    root: function (obj) { return obj; }
        //},
        //ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
        gridComplete: function () {
            debugger;
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

$(document).on('click', '#ProjectMasterExport', function () {
    isExport = 1;
    var filterdData = $('#jqgrid').jqGrid('getGridParam', 'data');

    $("#jqgrid").jqGrid("exportToExcel", {
        includeLabels: true,
        includeGroupHeader: true,
        includeFooter: true,
        fileName: "ProjectMaster.xlsx",
        //fileName: fileName,
        maxlength: 40 // maxlength for visible string data

    });
    isExport = 0;
});

$('#projectsFilter').click(function () {
    // $('#loader').css('visibility', 'visible');
    var divisions = $('#Divisions').val().toString();
    var status = $('#Status').val().toString();
    $('.multiselect-search').val('');
    CreateJQGrid('Divisions=' + divisions + '&Status=' + status + '&IsFiltered=Yes')
})
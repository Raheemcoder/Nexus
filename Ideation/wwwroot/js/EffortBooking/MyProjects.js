var colModels = [
    {
        name: 'ProjectCode',
        label: 'Project No',
        width: 100,
        search: true,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ProjectDescription',
        resizable: true,
        label: 'Project Description',
        width: 100,
        ignoreCase: true
    }
]
$(document).ready(function () {
    $(".images_excel").hide();
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        url: ROOT + "EffortTracker/GetMyProjectList",
        success: function (data) {
            debugger;
            if (data != null) {

                jQuery("#myProjectsJqgrid").jqGrid({
                    datatype: 'local',
                    data: data,
                    colModel: colModels,
                    width: 1,
                    rowNum: 10000,
                    viewrecords: true,
                    scroll: true,
                    pager: '#pager',
                    gridComplete: function () {
                        var objRows = $("#myProjectsJqgrid tbody tr");
                        var objHeader = $("#myProjectsJqgrid tbody tr td");
                        if (objRows.length > 1) {
                            var objFirstRowColumns = $(objRows[1]).children("td");
                            for (i = 0; i < objFirstRowColumns.length; i++) {
                                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                            }
                        }
                    }
                });

                $("#myProjectsJqgrid").jqGrid('filterToolbar', {
                    autosearch: true,
                    stringResult: true,
                    searchOnEnter: false,
                    defaultSearch: "cn"
                });

                $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
                $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
                var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();

                if ($TableHeight > 270) {

                    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
                }
                else {
                    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
                    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
                }
            }
        },
        error: function () {
        }
    });
});




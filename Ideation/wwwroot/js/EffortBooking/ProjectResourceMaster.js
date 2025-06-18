var initialdata
$(document).ready(function () {
    $('.data-multiselect').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });

    var jsonResult = $.parseJSON(($('#JsonFormProjectsDetails').val()));
    initialdata = jsonResult
    createJqGrid(jsonResult);
});

$('#projectsFilter').click(function () {
    $('#loader').css('visibility', 'visible');
    var projects = $('#Projects').val().toString();
    var resource = $('#Resource').val().toString();
    $('.multiselect-search').val('');

    $.ajax({
        type: "POST",
        async: false,
        beforeSend: function () {
            $('#loader').css('visibility', 'visible');
        },
        url: ROOT + 'EffortTracker/Get_ProjectResourceMasterData',
        data: { Projects: projects, Resources: resource, IsFiltered: 'Yes' },
        dataType: 'json',
        success: function (result) {
            $("#ProjectResouceMasterGrid").jqGrid('clearGridData');
            $("#ProjectResouceMasterGrid").jqGrid('setGridParam', { data: result });
            $("#ProjectResouceMasterGrid").trigger('reloadGrid', [{ page: 1 }]);
            $('#loader').css('visibility', 'hidden');
        },
        error: function () {
        }
    })

})

$('#projectgrid_refresh').click(function () {
    $('#projectsFilter').trigger("click");
})


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
    },
    {
        name: 'ResourceName',
        resizable: true,
        label: 'Resource Name',
        width: 100,
        ignoreCase: true
    },
    {
        name: 'Manager',
        resizable: true,
        label: 'Manager',
        width: 100,
        ignoreCase: true
    }
]


function createJqGrid(data) {

    $.jgrid.gridUnload('#ProjectResouceMasterGrid');

        jQuery("#ProjectResouceMasterGrid").jqGrid({
            datatype: 'local',
            data: data,
            colModel: colModels,
            width: 1,
            rowNum: 10000,
            viewrecords: true,
            scroll: true,
            pager: '#pager',
            gridComplete: function () {
                var objRows = $("#ProjectResouceMasterGrid tbody tr");
                var objHeader = $("#ProjectResouceMasterGrid tbody tr td");
                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
               
            },
            
        });

        $("#ProjectResouceMasterGrid ").jqGrid('filterToolbar', {
            autosearch: true,
            stringResult: true,
            searchOnEnter: false,
            defaultSearch: "cn"
        });

        $('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
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
$(document).on('click', '#ProjectResourceMasterExport', function () {
    $("#ProjectResouceMasterGrid").jqGrid("exportToExcel", {
        data: JSON.parse($('#JsonFormProjectsDetails').val()),
        includeLabels: true,
        includeGroupHeader: true,
        includeFooter: true,
        exportcol: false,
        fileName: "ProjectResourceMaster.xlsx",
        maxlength: 40 
    });
});
$("#projectgrid_refresh").on('click', function () {
    $('#Projects option').prop("selected", true);
    $("#Projects").multiselect('refresh');
    $('#Resource option').prop("selected", true);
    $("#Resource").multiselect('refresh');
    refreshJqGrid();
});
function refreshJqGrid() {
    createJqGrid(initialdata)
}

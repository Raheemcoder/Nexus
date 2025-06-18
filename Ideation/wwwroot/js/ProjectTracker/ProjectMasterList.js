var previousValue = '';
var selectedrowid = '';
var IsActiveList = ['Active', 'InActive'];

$(document).ready(function () {

    $(".list_approved").hide();
    $(".select_project").hide();
    $(".select_hub").hide();
    $(".projname").hide();
    $(".projectName_error").hide();
    $(".hubName_error").hide();

    $("#projectNameList").eq(1).remove();
    $('#projectNameList').hide();

    $.ajax({
        type: 'GET',
        async: false,
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        url: ROOT + "ProjectTracker/ProjectList",
        success: function (data) {
            if (data != null) {
                data = JSON.parse(data);
                CreateJQGrid(data);
            }
        },
        error: function (err) {
            alert(err);
        }
    });

});

$(document).on('click', '.prject-edit', function () {
    $(this).closest(".ui-widget-content").find(".status-dropdown").removeClass("hide");
    $(this).closest(".ui-widget-content").find(".status_text").addClass("hide");
    $(this).addClass("hide");
    $(this).closest(".grid-icons-group").find(".prject-close").removeClass("hide");
});

$(document).on('click', '.prject-close', function () {
    $(this).closest(".ui-widget-content").find(".status-dropdown").addClass("hide");
    $(this).closest(".ui-widget-content").find(".status_text").removeClass("hide");
    $(this).addClass("hide");
    $(this).closest(".grid-icons-group").find(".prject-edit").removeClass("hide");
});

$(document).on('click', '.status-dropdown', function () {
    previousValue = $(this).val();
});

$('#jqgrid tr').on('click', function () {
    var rowId = $(this).attr('id');
});

function statuschanged(rowId) {
    var rowData = jQuery("#jqgrid").getRowData(rowId);
    selectedrowid = rowId;
    var status = $('#' + rowId + 'status-dropdown :selected').text();

    if (rowData.PMUMappingStatus == 'Yes') {
        if (status == 'Completed' || status == 'Locked')
            $('#ProjectStatuschange').modal('show');
        return false;
    }
}

$('#btnCancel').click(function () {
    $('#' + selectedrowid + 'status-dropdown :selected').val('In Progress');
    $('#' + selectedrowid + 'status-dropdown :selected').text('In Progress');
});

$('#btnAccept').click(function () {
    $('#ProjectStatuschange').hide();
});

function CreateJQGrid(data) {

    jQuery("#jqgrid").jqGrid({
        datatype: 'local',
        data: data,
        colModel: [
            {
                name: 'StatusDropdown',
                label: 'StatusDropdown',
                width: 100,
                resizable: true,
                ignoreCase: true,
                hidden: true
            },
            {
                name: 'ProjectId',
                label: 'ProjectId',
                width: 100,
                resizable: true,
                ignoreCase: true,
                hidden: true
            },
            {
                name: 'ProjectStatusId',
                label: 'ProjectStatusId',
                width: 100,
                resizable: true,
                ignoreCase: true,
                hidden: true
            },
            {
                name: 'Action',
                label: 'Action',
                width: 50,
                resizable: true,
                ignoreCase: true,
                classes: 'text-center',
                search: false,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="action_icons grid-icons-group -justify-center">' +
                        '<a id="prject-edit" href="javascript:void(0);" class="grid-icon-only prject-edit" title="Edit">' +
                        '<i class="fas fa-pen color-eye"></i></a>' +
                        '<span id="prject-close" class="grid-icon-only prject-close hide" title="Close">' +
                        '<a class="grid-icon-only" href="javascript:void(0);">' +
                        '<i class="fas fa-times-circle color-history"></i></a>' +
                        '<a href="javascript:void(0);" class="grid-icon-only" title="Save" onclick="FetchData(' + options.rowId + ')">' +
                        '<i class="fas fa-save color-file"></i></a></span></div>';
                }
            },
            {
                name: 'ProjectCode',
                label: 'Project Code',
                width: 80,
                search: true,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'ProjectName',
                resizable: true,
                label: 'Project Name',
                width: 120,
                ignoreCase: true
            },
            {
                name: 'Division',
                resizable: true,
                label: 'Project Division',
                width: 50,
                ignoreCase: true
            },
            {
                name: 'Type',
                label: 'Project Type',
                resizable: true,
                width: 90,
                ignoreCase: true
            },
            {
                name: 'HubName',
                label: 'HUB Name',
                resizable: true,
                width: 50,
                ignoreCase: true
            },
            {
                name: 'HubStatus',
                label: 'Project Planning Status',
                resizable: true,
                width: 80,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    if (cellvalue.toLowerCase() == "approved") {
                        return '<span class="text-success">' + cellvalue + '</span>';
                    }
                    else if (cellvalue.toLowerCase() == "saved") {
                        return '<span class="text-warning">' + cellvalue + '</span>';
                    }
                    else {
                        return '<span>' + cellvalue + '</span>';
                    }
                }
            },
            {
                name: 'IsProjectPlanning',
                label: 'Project Planning Required',
                resizable: true,
                width: 80,
                ignoreCase: true,
            },
            {
                name: 'ProjectStartDate',
                label: 'Project Start Date',
                resizable: true,
                width: 60,
                ignoreCase: true
            },
            {
                name: 'ProjectEndDate',
                label: 'Project End Date',
                resizable: true,
                width: 60,
                ignoreCase: true
            },
            {
                name: 'Manager',
                resizable: true,
                label: 'Project Manager/Responsible',
                width: 100,
                ignoreCase: true,
            },

            {
                name: 'Status',
                resizable: true,
                width: 100,
                label: 'Project Status',
                ignoreCase: true,
                title: false,
                formatter: function (cellvalue, options, rowobject) {

                    var optionData = "";
                    for (var optionIndex = 0; optionIndex < rowobject.StatusDropdown.length; optionIndex++) {
                        if (rowobject.StatusDropdown[optionIndex] == rowobject.Status) {
                            optionData += ("<option>" + rowobject.StatusDropdown[optionIndex] + "</option>");
                        }

                    }
                    for (var optionIndex = 0; optionIndex < rowobject.StatusDropdown.length; optionIndex++) {
                        if (rowobject.StatusDropdown[optionIndex] != rowobject.Status) {
                            optionData += ("<option>" + rowobject.StatusDropdown[optionIndex] + "</option>");
                        }
                    }
                    return '<span class="' + rowobject.Class + ' status_text">' + rowobject.Status + '</span>' + '<div class="status-dropdown"><select id="' + options.rowId + 'status-dropdown" class="form-control status-dropdown table-dropdown hide" onchange="statuschanged(' + options.rowId + ')">' + optionData + '</select></div>';

                }
            },
            {
                name: 'IsActive',
                resizable: true,
                width: 80,
                label: 'Is Active',
                ignoreCase: true,
                title: false,
                formatter: function (cellvalue, options, rowobject) {

                    var optionData = "";
                    for (var optionIndex = 0; optionIndex <= IsActiveList.length - 1; optionIndex++) {
                        optionData += ("<option" + (IsActiveList[optionIndex].toLowerCase() == rowobject.IsActive.toLowerCase() ? " selected" : "") + ">" + IsActiveList[optionIndex] + "</option>");
                    }
                    return '<span class="' + rowobject.IsActiveClass + ' status_text">' + rowobject.IsActive + '</span>' + '<div class="status-dropdown"><select id="' + options.rowId + 'IsActive-dropdown" class="form-control status-dropdown table-dropdown hide">' + optionData + '</select></div>';
                }
            },
        ],
        rowNum: 20,
        viewrecords: true,
        scroll: true,
        pager: '#pager',
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

    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-240px + 100vh)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 240) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }
}

function FetchData(data) {

    var rowData = jQuery("#jqgrid").getRowData(data);

    var projectId = rowData['ProjectId'];
    var status = $('#' + data + 'status-dropdown :selected').text();
    var IsActive = $('#' + data + 'IsActive-dropdown :selected').text();

    window.location.href = ROOT + "ProjectTracker/UpdateProjectMaster" + '?q=' + Encrypt("ProjectId=" + projectId + "&Status=" + status + "&IsActive=" + IsActive);

}

$("#exceldownload").on('click', function () {
    window.location.href = ROOT + "ProjectTracker/GetProjectMasterExcelSummaryData";
});
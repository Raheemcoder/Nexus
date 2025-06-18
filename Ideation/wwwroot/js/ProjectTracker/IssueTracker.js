var gridData = [];
var griddatafortask = [];
var taskdata = [];
var selectedhub = [];
var selectedhubIds = [];
var oldRegion;
var issueId_action = '';
var selectedTaskId = 0;
var selectedhubId = 0;
var selectedHubName = '';
var hubProjectData = [];
var taskarrayafterdelete = [];
var udpateFromOwnerArray = [];
var role = 0;
$(document).ready(function () {

    $("#selected-hub").empty();

    var today = new Date();
    $('[founded-date]').datepicker('destroy');
    $('[founded-date]').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        changeMonth: true,
        maxDate: new Date(today)
    });

    $('[due-date]').datepicker('destroy');
    $('[due-date]').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        changeMonth: true
    });

    $('[closed-date]').datepicker('destroy');
    $('[closed-date]').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        changeMonth: true
    });

    $(".example-dropUp").multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });
    $('[data-singleselect]').select2()
    $('.data-singleselect').select2()
    $('.data-singleselect').select2({
        dropdownParent: $('#add_project')
    });
    $("#new-task").autocomplete({

        source: function (request, response) {
            var filter_array = [];
            $.each(taskdata[0], function (i, obj) {
                if (obj.TaskDescription && request.term && obj.TaskDescription.toLowerCase().includes(request.term.trim().toLowerCase())) {
                    var index = filter_array.findIndex(function (obj1) { return obj1.label === obj.TaskDescription });
                    if (index == -1) {
                        filter_array.push({
                            label: obj.TaskDescription,
                            value: obj.TaskDescription,
                            id: obj.TaskId
                        });
                    }
                }
            });
            response(filter_array);
        },
        minLength: 0,

        select: function (event, ui) {
            selectedTaskId = ui.item.id;
            selectedTaskDesc = ui.item.label;
            var hubData = taskdata[0].filter(function (ob1) { return ob1.TaskDescription === selectedTaskDesc });
            selectedhub = [];
            $.each(hubData, function (i, data) {
                selectedhub.push({ "HubId": data.HubId, "HubName": data.HubName })
                selectedhubIds.push(data.HubId);
            })
            $('#SelectedImpactedTaskHub').multiselect('destroy');
            $('#SelectedImpactedTaskHub').empty();
            $.each(selectedhub, function (obj1, item) {
                $('#SelectedImpactedTaskHub').append('<option value=' + item.HubId + '>' + item.HubName + '</option>');
            });
            $("#SelectedImpactedTaskHub").multiselect({
                enableFiltering: true,
                includeSelectAllOption: true,
                enableCaseInsensitiveFiltering: true,
                maxHeight: 500,
                buttonWidth: '100%',
                dropUp: true
            });
            $('#SelectedImpactedTaskHub').val(selectedhubIds);
            $('#SelectedImpactedTaskHub').multiselect('refresh');
        },

        close: function (event, ui) {
            if ($(event.target).val() !== '' && $(event.target).val() !== null && typeof ($(event.target).val()) !== "undefined") {
                var intaskArray = taskdata[0].filter(item => item.TaskDescription.toLowerCase() == $(event.target).val().toLowerCase()).length;
                if (selectedTaskId == 0 && intaskArray == 0) {
                    $(event.target).val("");
                    alert("Please select the Task from the list");
                }
            }
        },
        change: function (event, ui) {
            if ($(event.target).val() !== '' && $(event.target).val() !== null && typeof ($(event.target).val()) !== "undefined") {
                var intaskArray = taskdata[0].filter(item => item.TaskDescription.toLowerCase() == $(event.target).val().toLowerCase()).length;
                if (intaskArray == 0) {
                    $(event.target).val("");
                    alert("Please select the Task from the list");
                }
            }
            $(".Err-empty-task").hide();
        }
    });

    if (!($('#selectedProjectId').val() === null || $('#selectedProjectId').val() === "" || typeof ($('#selectedProjectId').val()) === "undefined")) {
        $('.projectName_error').text('');
        var projectName = $('#selectedProjectName').val();
        var projectId = $('#selectedProjectId').val();
        $("#ProjectId").select2().val(projectId).trigger("change");
        getData();
    }
    else {
        $('.projectName_error').text('Please select the Project');
    }

    role = parseInt($("#userRole").val());
    createJQGrid([]);

});
function arrtSetting_Action(rowId, val, rawObject) {

    var result;
    var issueId = rawObject.IssueId;
    if (issueId_action === '' || issueId_action != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_action = issueId;
    return result;
}
var issueId_new = '';
function arrtSetting_IssueId(rowId, val, rawObject) {
    
    var result;
    var issueId = rawObject.IssueId;
    if (issueId_new === '' || issueId_new != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_new = issueId;
    return result;
}
var issueId_hub = '';
function arrtSetting_Hub(rowId, val,rawObject) {
    
    var result;
    var issueId = rawObject.IssueId;
    if (issueId_hub === '' || issueId_hub != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_hub = issueId;
    return result;
}
var issueId_issuedesc = '';
function arrtSetting_Issuedesc(rowId, val, rawObject) {
    var result;
    var issueId = rawObject.IssueId;
    if (issueId_issuedesc === '' || issueId_issuedesc != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_issuedesc = issueId;
    return result;
}
var issueId_issuedate = '';
function arrtSetting_IssueDate(rowId, val, rawObject) {
    var result;
    var issueId = rawObject.IssueId;
    if (issueId_issuedate === '' || issueId_issuedate != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_issuedate = issueId;
    return result;
}
var issueId_impactassesment = '';
function arrtSetting_ImpactAssessment(rowId, val, rawObject) {
    var result;
    var issueId = rawObject.IssueId;
    if (issueId_impactassesment === '' || issueId_impactassesment != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_impactassesment = issueId;
    return result;
}
var issueId_impacttask = '';
function arrtSetting_ImpactTask(rowId, val, rawObject) {
    var result;
    var issueId = rawObject.IssueId;
    if (issueId_impacttask === '' || issueId_impacttask != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_impacttask = issueId;
    return result;
}
var issueId_CreatedBy = '';
function arrtSetting_CreatedBy(rowId, val, rawObject) {
    var result;
    var issueId = rawObject.IssueId;
    if (issueId_CreatedBy === '' || issueId_CreatedBy != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_CreatedBy = issueId;
    return result;
}
var issueId_CreatedOn = '';
function arrtSetting_CreatedOn(rowId, val, rawObject) {
    var result;
    var issueId = rawObject.IssueId;
    if (issueId_CreatedOn === '' || issueId_CreatedOn != issueId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.IssueId === issueId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    issueId_CreatedOn = issueId;
    return result;
}
function validateFilteredData(new_data) {

    var grid_filtered_data = new_data;

    var colModel = $("#list-issuetracker-jqgrid").jqGrid('getGridParam', 'colModel');

    var filteredColNames = colModel.filter(function (col) {

        return col.search === true;

    }).map(function (col) {

        return col.name;

    });

    $.each(filteredColNames, function (i, obj) {

        var value = $(".ui-search-input").closest('td').find("#gs_" + obj).val();

        if (!(value === "") || (value === null) || typeof (value) === "undefined") {

            

            grid_filtered_data = grid_filtered_data.filter(function (data) {

                return data[obj].toLowerCase().includes(value.toLowerCase());

            })

        }

    })

    return grid_filtered_data.length;

}
$("#ProjectId").on('change', function () {
    var value = $(this).val();
    if (value != "" && value != null && value != undefined && value != "0") {
        $('.projectName_error').text('');
    }
    else {
        $('.projectName_error').text('Please select the Project');
    }
    $("#issue-desc").val('');
    $("#issue-iden-date").val('');
    $("#selected-impact-ass").val('').multiselect('refresh');
    griddatafortask = [];
    addActionArray = [];
    getData();
});
function handelConfirmPopup(msg, func) {
    $('#confirmpopupmesssage').empty().html(msg);
    $('#confirmpopup').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }
}
function handelConfirmChangeDatePopup(msg, func, func1) {
    $('#confirmDateChangemsg').empty().html(msg);
    $('#confirmDateChange').modal('show');
    if (func) {
        $("#confirmDateChangeSave").unbind("click");
        $('#confirmDateChangeSave').on("click", func);
    }
    if (func1) {
        $("#confirmDateChangeCancel").unbind("click");
        $('#confirmDateChangeCancel').on("click", func1);
    }
}
function getData() {

    var projectid = $("#ProjectId option:selected").val()
    $.ajax({
        type: "GET",
        url: ROOT + "TrackerSupport/GetIssueList",
        data: {
            projectId: projectid
        },
        success: function (result) {
            if (result != null && result != undefined) {
                gridData = result.Item1;
                hubProjectData = result.Item2;
                udpateFromOwnerArray = result.Item3;

                applyRowspan();
                createJQGrid(gridData);
                generateHubOptions(hubProjectData);
            }
        }
    });

}
function DeleteIssue(issuedata) {

    var issueId = issuedata.getAttribute('data-issueid');
    var projectId = $("#ProjectId").val();

    handelConfirmPopup('Are you sure do you want to Delete ?',
        function () {
            $.ajax({
                type: "POST",
                url: ROOT + "TrackerSupport/DeleteIssue",
                data: { ProjectId: projectId, IssueId: issueId },
                success: function (result) {
                    if (result != null && result != undefined && result.Message.includes('Successfully')) {
                        getData();
                    }
                    else {
                        alert(result);
                    }
                }
            });
        },
    );

}
function applyRowspan() {
    issueId_action = '';
    issueId_new = '';
    issueId_hub = '';
    issueId_issuedesc = '';
    issueId_issuedate = '';
    issueId_impactassesment = '';
    issueId_impacttask = '';
    issueId_CreatedBy = '';
    issueId_CreatedOn = '';
}
function createJQGrid(data) {

    $.jgrid.gridUnload('#list-issuetracker-jqgrid');
    $("#list-issuetracker-jqgrid").jqGrid({
        datatype: 'local',
        data: data,
        colModel: [
            {
                name: 'Action',
                width: 80,
                search: false,
                exportcol: false,
                cellattr: arrtSetting_Action,
                formatter: function (cellvalue, options, rowobject) {
                    var deleteIcon = '';
                    if (!rowobject.ActionPlan && (rowobject.ActionPlan == null || rowobject.ActionPlan == '')) {
                        deleteIcon = '<a href="#" title="Delete" id="deletebtn" onclick="DeleteIssue(this)" data-issueid="' + rowobject.IssueId + '"><i class="fas fa-trash text-danger"></i></a>';
                    }

                    return '<div class="d-flex align-items-center justify-content-evenly">' +
                        '<span class="editRow" title="Edit"><i class="fas fa-pen text-primary" onclick="GetIssueData(this)" data-issueid="' + rowobject.IssueId + '" style="cursor:pointer;"></i></span>' +
                        deleteIcon +
                        '</div>';
                }
            },
            {
                label: 'Issue No',
                name: 'IssueNo',
                width: 100,
                cellattr: arrtSetting_IssueId,
                classes: 'issue-no'
            },
            {
                label: 'HUB',
                name: 'HubName',
                width: 150,
                cellattr: arrtSetting_Hub
            },
            {
                label: 'Issue Description',
                name: 'IssueDescription',
                width: 300,
                cellattr: arrtSetting_Issuedesc
            },
            {
                label: 'Issue Identification Date',
                name: 'IssueIdentificationDate',
                width: 85,
                cellattr: arrtSetting_IssueDate
            },
            {
                label: 'Impact Assessment',
                name: 'ImpactAssesment',
                width: 200,
                cellattr: arrtSetting_ImpactAssessment
            },
            {
                label: 'Impacted Task',
                name: 'ImpactedTask',
                width: 70,
                search: false,
                cellattr: arrtSetting_ImpactTask,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="action_icons text-center"><a href="#" onclick="ShowImpactedTaskPopup(this)" data-issueid="' + rowobject.IssueId + '" class="grid-icon-only -medidum-size" data-toggle="modal" title="Impacted Task"><i class="fas fa-comment-alt text-warning"></i></a></div>';
                }
            },
            {
                label: 'Created By',
                name: 'CreatedBy',
                width: 100,
                cellattr: arrtSetting_CreatedBy
            },
            {
                label: 'Created On',
                name: 'CreatedOn',
                width: 70,
                cellattr: arrtSetting_CreatedOn
            },
            {
                label: 'Action Plan',
                name: 'ActionPlan',
                width: 300,
            },
            {
                label: 'Action Assigned To',
                name: 'Resources',
                width: 200,
            },
            {
                label: 'Due Date',
                name: 'DueDate',
                width: 80,
            },
            {
                label: 'Priority',
                name: 'Priority',
                width: 80,
            },
            {
                label: 'Status',
                name: 'Status',
                width: 80,
            },
            {
                label: 'Updates from the Owner',
                search: false,
                name: 'OwnerUpdate',
                width: 70,
                formatter: function (cellvalue, options, rowobject) {
                    return rowobject.OwnerUpdate > 0 ?
                        '<div class="text-center action_icons"><a href="#" onclick="ShowOwnerUpdatePopup(' + rowobject.ActionId + ')" title="Updates from the owner"><i class="fas fa-history color-info"></i></a></div>' : '';
                }
            },
            {
                label: 'Closed On Date And Closed Remarks',
                name: 'ClosedDetails',
                width: 300,
            },
        ],
        cmTemplate: { sortable: false },
        loadonce: true,
        viewrecords: true,
        pager: '#list-issuetracker-pager',
        rowNum: data.length,
        hoverrows: false,
        scroll: 1,
        beforeSelectRow: function () {
            return false;
        },
        gridComplete: function () {
            if (role == 4 || role == 3 || role==6) {
                $("#list-issuetracker-jqgrid").jqGrid('hideCol', "Action");
            }
            applyRowspan();
            var pagercount = $('#list-issuetracker-jqgrid').find('tr').find('td.issue-no:visible').length;
            if (pagercount ==0) {
                $("#list-issuetracker-pager").find('.ui-paging-info').text("No Records To View");

            }
            else {
                $("#list-issuetracker-pager").find('.ui-paging-info').text("View 1 - " + pagercount + " of " + pagercount); 

            }
            
        }
    });

    if (role == 4 || role == 3 || role==6) {
        $('#list-issuetracker-jqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-240px + 100vh)' });
    }
    else {
        $('#list-issuetracker-jqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-320px + 100vh)' });
    }
    $('#list-issuetracker-jqgrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#list-issuetracker-jqgrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#list-issuetracker-jqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#list-issuetracker-jqgrid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#list-issuetracker-jqgrid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#list-issuetracker-jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}
function generateImpactedTaskHubOptions(Action) {

    // Action 1 -----> hub on add issue list page
    // Action 2 -----> hub on edit issue popup

    var selected_hubarray = [];
    if (Action == 1) {
        selected_hubarray = $('#selected-hub').val();
    }
    else if (Action == 2) {
        selected_hubarray = $('#edited-selected-hub').val();
    }

    $('#SelectedImpactedTaskHub').multiselect('destroy');
    $('#SelectedImpactedTaskHub').empty();
    $.each(hubProjectData, function (obj1, item) {
        var index = selected_hubarray.findIndex(function (obj) { return item.HubId == obj });
        if (index > -1) {
            $('#SelectedImpactedTaskHub').append('<option value=' + item.HubId + '>' + item.HubName + '</option>');
        }
    });
    $("#SelectedImpactedTaskHub").multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });
    $('#SelectedImpactedTaskHub').val(selected_hubarray);
    $('#SelectedImpactedTaskHub').multiselect('refresh');
}
function generateHubOptions(hubList) {

    var hubHtmlId = ['#selected-hub', '#edited-selected-hub']
    hubHtmlId.forEach(function (id) {
        $(id).multiselect('destroy');
        $(id).empty();
        $.each(hubList, function (obj1, item) {
            $(id).append('<option value=' + item.HubId + '>' + item.HubName + '</option>');
        });
        $(id).multiselect({
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true,
            maxHeight: 500,
            buttonWidth: '100%',
            dropUp: true
        });
        $(id).multiselect('refresh');
    });

}
$("#open-task-popup").on('click', function () {

    var isValid = true;
    var projectid = $("#ProjectId option:selected").val()
    var hubId = $("#selected-hub").val().join(',').toString();

    if (projectid == 0) {
        alert("Please select Project and HUB");
        isValid = false;
    }
    else if (hubId == 0 || hubId == '') {
        alert("Please select HUB");
        isValid = false;
    }
    else if (projectid == 0 && (hubId == 0 || hubId == '')) {
        alert("Please select Project");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: ROOT + "TrackerSupport/GetTaskList",
            data: {
                projectId: projectid, hubId: hubId
            },
            success: function (result) {
                if (result.length > 0) {
                    taskdata.push(result);
                }
                generateImpactedTaskHubOptions(1);
                $("#task-modal").modal('show');
                getTaskGrid();

                selectedTaskId = 0;
                selectedhubId = 0;
                selectedHubName = '';
            }
        });
    }

});
function getTaskGrid() {

    taskarrayafterdelete = griddatafortask.filter(function (obj) {
        return parseInt(obj.IsActive) === 1
    });
    
    $(".Err-empty-task").hide();
    $(".Err-exists-task").hide();
    $(".Err-kpi-task").hide();
    $("#new-task").val('');
    $.jgrid.gridUnload('#task-grid');
    taskgridColModels = [
        {
            name: 'TaskId',
            label: 'Action',
            resizable: true,
            ignoreCase: true,
            align: 'center',
            width: 80,
            search: false,
            formatter: function (cellvalue, options, rowobject) {
                return '<div></button > <a class="trash_icon" onclick="DeleteImpactedTask(' + rowobject.TaskId + ')"><i class="fas fa-trash" title="Delete"></i></a></div>'
            }
        },
        {
            name: 'TaskDescription',
            label: 'Task',
            resizable: true,
            ignoreCase: true,
            width: 220,
        },
        {
            name: 'HUB',
            label: 'HUB',
            resizable: true,
            ignoreCase: true,
            width: 220,
        },
    ],

        $("#task-grid").jqGrid({
            url: '',
            datatype: 'local',
            data: taskarrayafterdelete,
            mtype: 'GET',
            colModel: taskgridColModels,
            loadonce: true,
            viewrecords: true,
            pager: '#taskgrid-pager',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#task-grid tbody tr");
                var objHeader = $("#task-grid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
            }

        });

    $("#task-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#task-grid').closest('.jqg-first-row-header').hide();
    $('#task-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '22vh' });
    $('#task-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#task-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#task-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#task-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#task-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#task-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}
function ShowImpactedTaskPopup(issuedatabyid) {

    var issueId = issuedatabyid.getAttribute('data-issueid');
    $.ajax({
        type: "POST",
        url: ROOT + "TrackerSupport/GetTaskById",
        data: {
            IssueId: issueId
        },
        success: function (result) {
            getTaskGridById(result);
            $("#task-modalforlist").modal('show');
        }
    });

}
function getTaskGridById(datafortask) {

    $.jgrid.gridUnload('#task-grid-list');
    taskgridColModelsById = [
        {
            name: 'TaskDescription',
            label: 'Task',
            resizable: true,
            ignoreCase: true,
            width: 220,

        },
        {
            name: 'HUB',
            label: 'HUB',
            resizable: true,
            ignoreCase: true,
            width: 220,

        },
    ],

        $("#task-grid-list").jqGrid({
            url: '',
            datatype: 'local',
            mtype: 'GET',
            data: datafortask,
            colModel: taskgridColModelsById,
            loadonce: true,
            viewrecords: true,
            pager: '#taskgrid-pager',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#task-grid tbody tr");
                var objHeader = $("#task-grid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
            }

        });

    $("#task-grid-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#task-grid-listd').closest('.jqg-first-row-header').hide();
    $('#task-grid-list').closest('.ui-jqgrid-bdiv').css({ 'max-height': '22vh' });
    $('#task-grid-list').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#task-grid-list').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#task-grid-list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#task-grid-list').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#task-grid-list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#task-grid-list').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }


}
$("#add-new-task").on('click', function () {
    
    var task = $("#new-task").val();
    var hubName = [];
    var hubId = $("#SelectedImpactedTaskHub").val();
    var taskid = selectedTaskId;
    var isValid = true;
    var hub = [];
    $('#SelectedImpactedTaskHub option').each(function () {
        if ($(this).is(':checked')) {
            hub.push($(this).text());
        }
    });

    hubId = hubId.join(',');
    hubName = hub.join(',');

    var TaskDescription = {};

    if (task == '') {
        isValid = false;
       
        $(".Err-empty-task").show();
        $(".Err-exists-task").hide();

    }
    else if ($("#SelectedImpactedTaskHub").val() == '' || $("#SelectedImpactedTaskHub").val() == null || typeof $("#SelectedImpactedTaskHub").val() === 'undefined') {
        isValid = false;
        $(".Err-task").show();
    }
    if (task != '') {
        var index = griddatafortask.findIndex(function (obj) { return parseInt(obj.TaskId) === parseInt(taskid) && parseInt(obj.IsActive) == 1 })
        if (index > -1) {
            isValid = false;
            $(".Err-exists-task").show();
            $(".Err-empty-task").hide();

        }
    }
    
    if (isValid) {
        TaskDescription =
        {
            TaskId: taskid,
            TaskDescription: task,
            HUBId: hubId,
            HUB: hubName,
            IsActive: 1,
            IsNew: 1
        }

        griddatafortask.unshift(TaskDescription);
        getTaskGrid();

        $("#open-task-popup").siblings('span').addClass('hide');
        $("#open-edit-impactedtask-popup").siblings('span').addClass('hide');
    }
    $("#new-task").val('');
    $("#SelectedImpactedTaskHub").multiselect('refresh');
});
$("#new-task").on('keyup', function () {
    $(".Err-empty-task").hide();
    $(".Err-exists-task").hide();
});
$("#SelectedImpactedTaskHub").on('change', function () {
    $(".Err-task").hide();
})
function DeleteImpactedTask(TaskId) {

    handelConfirmPopup('Are you sure do you want to Delete ?',
        function () {
            var index = griddatafortask.findIndex(function (obj) { return parseInt(obj.TaskId) == parseInt(TaskId) });
            
            if (index > -1) {
                griddatafortask[index].IsActive = 0
            }
            getTaskGrid();
        },
    );

}
function OwnerUpdateJqgrid(data) {

    $.jgrid.gridUnload('#owner-update-grid-list');
    OwnerUpdateJqgridColModel = [
        {
            name: 'OwnerUpdate',
            label: 'Updates from the owner',
            resizable: true,
            ignoreCase: true,
            width: 340,
        },
        {
            name: 'CreatedBy',
            label: 'Created By',
            resizable: true,
            ignoreCase: true,
            width: 80,
        },
        {
            name: 'CreatedOn',
            label: 'Created Date',
            resizable: true,
            ignoreCase: true,
            width: 80,
        },
    ],

        $("#owner-update-grid-list").jqGrid({
            url: '',
            datatype: 'local',
            mtype: 'GET',
            data: data,
            colModel: OwnerUpdateJqgridColModel,
            loadonce: true,
            viewrecords: true,
            pager: '#owner-update-grid-pager',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#owner-update-grid-list tbody tr");
                var objHeader = $("#owner-update-grid-list tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
            }

        });

    $("#owner-update-grid-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#owner-update-grid-list').closest('.jqg-first-row-header').hide();
    $('#owner-update-grid-list').closest('.ui-jqgrid-bdiv').css({ 'max-height': '22vh' });
    $('#owner-update-grid-list').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#owner-update-grid-list').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#owner-update-grid-list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#owner-update-grid-list').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#owner-update-grid-list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#owner-update-grid-list').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}
function ShowOwnerUpdatePopup(ActionId) {

    var filteredArray = udpateFromOwnerArray.filter(item => item.ActionId == ActionId);

    OwnerUpdateJqgrid(filteredArray);

    $("#owner-update-modalforlist").modal('show');

}
$("#exceldownload").on('click', function () {
    var isValid = true;
    var projectid = $("#ProjectId").val()
    var projectName = $("#ProjectId option:selected").text()
    if (projectid == 0) {
        alert("Please select Project");
        isValid = false;
    }
    else {
        var data = $('#list-issuetracker-jqgrid').jqGrid('getGridParam', 'data');
        if (data.length === 0) {
            alert("There is no data present in the grid");
            isValid = false;
        }
    }
    if (isValid) {
        window.location.href = ROOT + "TrackerSupport/GetIssueExcelData?projectId=" + projectid + "&&projectName=" + projectName;
    }

})

//------- Issue Tracker Add Edit Issue common code ----------

var allDropDownList = [];
var statusList = [];
var priorityList = [];
var hubList = [];
var impactAssList = [];

var closedStatusId = "";

var selectedResourcesId = 0;
var assignedToList = [];

var addActionArray = [];
var invalidAddAction = [];

var workingIssueId = '';
var dataBeforeEdit = [];
var editedHeaderData = [];
var editedActionData = [];
var editedImpactedData = [];
var invalidEditAction = [];

var headers = [];
var details = [];
var impactedTasks = [];

var addIssueFoundDate = "";
var editIssueFoundDate = "";


if ($("#AllDropDownList").val() != null && $("#AllDropDownList").val() != undefined && $("#AllDropDownList").val() != "") {
    allDropDownList = JSON.parse($("#AllDropDownList").val());
}

if (allDropDownList.length > 0) {
    statusList = allDropDownList.filter(item => item.Type.toLowerCase() == "issuestatus");
    closedStatusId = statusList.filter(item => item.Text.toLowerCase() === "closed")[0].Value.toString();
    priorityList = allDropDownList.filter(item => item.Type.toLowerCase() == "priority");
    hubList = allDropDownList.filter(item => item.Type.toLowerCase() == "projhub");
    impactAssList = allDropDownList.filter(item => item.Type.toLowerCase() == "impactassesment");
}

if ($("#AssignedtoList").val() != null && $("#AssignedtoList").val() != undefined && $("#AssignedtoList").val() != "") {
    assignedToList = JSON.parse($("#AssignedtoList").val());
}

// hub, closed date, due date, impact assessment
$(document).on('change', '#selected-hub, #edited-selected-hub, #selected-impact-ass, #edited-selected-impact-ass, #action-due-date, [data-action-due-date], #action-closed-date, [data-action-closed-date]', function () {
    $(this).siblings('span').addClass('hide');
});

// issue description, action plan, closed remarks
$(document).on('change', '#issue-desc, #edited-issue-desc,#action-plan, [data-action-plan],#action-closed-remark, [data-action-closed-remark]', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span').addClass('hide');
    }
});

// issue identification date
$(document).on('change', '#issue-iden-date, #edited-issue-iden-date', function () {
    $(this).siblings('span').addClass('hide');
    if ($(this).is('#edited-issue-iden-date')) {
        setStartDate();
    }
});

// status dropdown
$(document).on('change', '#action-selected-status, [data-action-status]', function () {
    if ($(this).is('#action-selected-status')) {
        if ($(this).val() == closedStatusId) {
            $('#action-closed-date').removeAttr("disabled");
            $('#action-closed-remark').removeAttr("disabled");
        } else {
            $('#action-closed-date').attr("disabled", "disabled").val('').siblings('span').addClass('hide');
            $('#action-closed-remark').attr("disabled", "disabled").val('').siblings('span').addClass('hide');
        }
    } else {
        if ($(this).val() == closedStatusId) {
            $(this).closest('tr').find("[data-action-closed-date]").removeAttr("disabled");
            $(this).closest('tr').find("[data-action-closed-remark]").removeAttr("disabled");
        } else {
            $(this).closest('tr').find("[data-action-closed-date]").val('').attr("disabled", "disabled").siblings('span').addClass('hide');
            $(this).closest('tr').find("[data-action-closed-remark]").val('').attr("disabled", "disabled").siblings('span').addClass('hide');
        }
    }

    if ($(this).val() != "") {
        $(this).siblings('span').addClass('hide');
    }
});

// priority dropdown
$(document).on('change', '#action-selected-priority, [data-action-priority]', function () {
    if ($(this).val() != "") {
        $(this).siblings('span').addClass('hide');
    }
});


function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function initializeAutocompleteDatepicker(Action) {

    // Action 1 ---> Add Action
    // Action 2 ---> Edit Added Action

    $("[data-assigned-to]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                selectedResourcesId = 0;
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                var obj = [];
                var cnt = 0;
                var matching = $.grep(assignedToList, function (value) {
                    var name = value.EmployeeName + " - " + value.UserName;
                    var id = value.EmployeeName + " - " + value.UserName;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id })
                        cnt++
                    }
                    return matcher.test(id);
                });
                response(obj);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {

                var terms = split(this.value);
                terms.pop();
                var selectedTerm = ui.item.value;
                if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                    $(event.target).siblings('.already-selected').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    selectedResourcesId = 2;
                    terms.push("");
                    this.value = terms.join(", ");
                }
                else {
                    selectedResourcesId = 1;
                    terms.push(selectedTerm);
                    terms.push("");
                    this.value = terms.join(", ");
                }
                return false;
            },
            close: function (event, ui) {

                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (selectedResourcesId === 0) {
                        var inputValue = $(event.target).val();
                        var parts = inputValue.split(',');
                        parts.pop();
                        parts.push("");
                        var result = parts.join(',');
                        $(event.target).val(result);
                        $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                    else if (selectedResourcesId === 1) {
                        // this will handel over all span tag
                        $(event.target).siblings('span').addClass('hide');
                    }
                }
            },
            change: function (event, ui) {

                $(event.target).siblings('span').addClass('hide');

                var terms = split(this.value);
                var validResources = [];
                var invalidResources = [];
                if (terms.length > 0) {
                    terms.forEach(function (resource) {
                        if (resource != null && resource != "") {
                            var resourceName = resource.split('-')[0].trim().toLowerCase();
                            var filteredResources = assignedToList.filter(item => item.EmployeeName.toLowerCase().trim() === resourceName);

                            if (filteredResources.length > 0) {
                                var value = filteredResources[0];
                                validResources.push(value.EmployeeName + " - " + value.UserName);
                            }
                            else {
                                invalidResources.push(resource);
                            }
                        }
                    });

                    if (validResources.length > 0) {
                        validResources.push("");
                        this.value = validResources.join(", ");
                    }

                    if (invalidResources.length > 0) {
                        this.value = validResources.join(", ");
                        $(event.target).siblings('.not-valid-user').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                }
            }
        });

    if (Action == 1) {
        addIssueFoundDate = $("#issue-iden-date").val();
    }

    var datepickerOptions = {
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        changeMonth: true
    };

    if (Action == 1 && addIssueFoundDate !== "") {
        datepickerOptions.minDate = addIssueFoundDate;
    }

    if (Action == 2 && editIssueFoundDate !== "") {
        datepickerOptions.minDate = editIssueFoundDate;
    }

    $('[due-date]').datepicker('destroy');
    $('[closed-date]').datepicker('destroy');
    $('[due-date]').datepicker(datepickerOptions);
    $('[closed-date]').datepicker(datepickerOptions);


}
function setStartDate() {

    var foundDate = $("#edited-issue-iden-date").val();
    handelConfirmChangeDatePopup('On changing "Issue Identification Date" will result in the removal of Due Date and End Date having date before the Issue Identification Date. Do you wish to continue ?',
        function () {
            $('#edit-action-data-table').dataTable().$('tr').each(function (i, obj) {

                var dueDate = $(obj).find('[data-action-due-date]').val();

                var closedDate = ($(obj).find('[data-action-closed-date]').val()) != "" ? $(obj).find('[data-action-closed-date]').val() :
                    $(obj).find('[data-action-closed-date]').val();

                if (moment(foundDate, "DD/MM/YYYY") > moment(dueDate, "DD/MM/YYYY")) {
                    $(obj).find('[data-action-due-date]').val('');
                }

                if (closedDate != "" && (moment(foundDate, "DD/MM/YYYY") > moment(closedDate, "DD/MM/YYYY"))) {
                    $(obj).find('[data-action-closed-date]').val('');
                }

            });
            $('[due-date]').datepicker('option', 'minDate', foundDate);
            $('[closed-date]').datepicker('option', 'minDate', foundDate);
        },
        function () {
            $('#edited-issue-iden-date').val($('[data-previousvalue]').attr('data-previousvalue'));
        },
    );

}

function generateSingleSelectOptions(list, selectedValue) {

    var options = list.map(item => {
        const isSelected = item.Value == selectedValue ? "selected" : "";
        return `<option value="${item.Value}" ${isSelected}>${item.Text}</option>`;
    }).join('');

    const firstOption = '<option value="">Select</option>';
    return firstOption + options;

}
function DeleteAction(obj, actionId, Action) {

    handelConfirmPopup('Are you sure do you want to Delete ?',
        function () {
            if (Action == 1) {
                addActionArray = addActionArray.filter(item => item.actionId !== actionId);
                DestroyDataTable(1);
                obj.closest('tr').remove();
                InitializeDataTable(1, $('#action-data-table tbody tr').length);
            }
            else if (Action == 2) {
                DestroyDataTable(2);
                obj.closest('tr').remove();
                InitializeDataTable(2, $('#edit-action-data-table tbody tr').length);
            }
        },
    );

}
function HideShowActionDataTableValidation(obj, Action) {
    
    var actionPlanElement = $(obj).find('[data-action-plan]');
    var assignedToElement = $(obj).find('[data-assigned-to]');
    var actionDueDateElement = $(obj).find('[data-action-due-date]');
    var actionStatusElement = $(obj).find('[data-action-status]');
    var actionPriorityElement = $(obj).find('[data-action-priority]');

    var actionClosedDateElement = null;
    var actionClosedRemarkElement = null;
    if ($(actionStatusElement).val() === closedStatusId) {
        actionClosedDateElement = $(obj).find('[data-action-closed-date]');
        actionClosedRemarkElement = $(obj).find('[data-action-closed-remark]');
    }

    function isValid(element) {
        var value = $(element).val().trim();
        return value !== null && value !== undefined && value !== "";
    }

    function HideShowActionElementValidation(element) {
        if (isValid(element)) {
            $(element).siblings('span:first').addClass('hide');
        }
        else {
            $(element).siblings('span:first').removeClass('hide');
            invalidEditAction.push(1);
            // Note: 1 will be pushed multiple times irrespective of whether it is add or edit action but only in EDIT ACTION WE ARE CONSIDERING IT FOR CHECKING
        }
    }

    function HideShowActionDateValidation(element) {
        var value = $(element).val().trim();

        if (value !== null && value !== undefined && value !== "") {
            $(element).siblings('span:first').addClass('hide');
            var elementid = $("#issue-iden-date");
            if (Action == 2) {
                elementid = $("#edited-issue-iden-date");
            }
            if (moment(elementid, "DD/MM/YYYY") > moment(value, "DD/MM/YYYY")) {
                $(element).siblings('span').eq(1).removeClass('hide');
                invalidEditAction.push(1);
                // Note: 1 will be pushed multiple times irrespective of whether it is add or edit action but only in EDIT ACTION WE ARE CONSIDERING IT FOR CHECKING
            }
            else {
                $(element).siblings('span').eq(1).removeClass('hide');
            }
        }
        else {
            $(element).siblings('span:first').removeClass('hide');
            invalidEditAction.push(1);
            // Note: 1 will be pushed multiple times irrespective of whether it is add or edit action but only in EDIT ACTION WE ARE CONSIDERING IT FOR CHECKING
        }
    }

    HideShowActionElementValidation(actionPlanElement);
    HideShowActionElementValidation(assignedToElement);
    HideShowActionDateValidation(actionDueDateElement);
    HideShowActionElementValidation(actionStatusElement);
    HideShowActionElementValidation(actionPriorityElement);

    if ($(actionStatusElement).val() === closedStatusId) {
        HideShowActionDateValidation(actionClosedDateElement);
        HideShowActionElementValidation(actionClosedRemarkElement);
    }

}
function ValidateAction(Action) {
    
    // Action 1 ---> Add Action
    // Action 2 ---> Edit Added Action

    if (invalidAddAction.length > 0 && Action == 1) {
        $('#action-data-table').dataTable().$('tr').each(function (i, obj) {
            var actionId = parseInt($(obj).find('[data-action-id]').attr('data-action-id'));
            if (invalidAddAction.includes(actionId)) {
                HideShowActionDataTableValidation(obj, 1);
            }
        });
    }
    else if (Action == 2) {
        invalidEditAction = [];
        $('#edit-action-data-table').dataTable().$('tr').each(function (i, obj) {
            HideShowActionDataTableValidation(obj, 2);
        });
    }
}
function DestroyDataTable(Action) {

    if (Action == 1) {
        var table = $('#action-data-table').DataTable();

        if ($.fn.DataTable.isDataTable('#action-data-table')) {
            table.destroy();
        }
    }
    else if (Action == 2) {
        var table = $('#edit-action-data-table').DataTable();

        if ($.fn.DataTable.isDataTable('#edit-action-data-table')) {
            table.destroy();
        }
    }

}
function InitializeDataTable(Action, length) {

    if (Action == 1) {
        var actiontable =
            $('#action-data-table').DataTable({
                orderCellsTop: true,
                fixedHeader: true,
                pageLength: length,
                scrollCollapse: true,
                paging: true,
            });

        $("#action-data-table_paginate").hide();
    }
    else if (Action == 2) {
        var editactiontable =
            $('#edit-action-data-table').DataTable({
                orderCellsTop: true,
                fixedHeader: true,
                pageLength: length,
                scrollCollapse: true,
                order: [],
                paging: true,
            });

        $("#edit-action-data-table_paginate").hide();
    }

}

//--------------------Add issue--------------------
function ShowActionPopup(data) {

    let tableHtml = `
    <table id="action-data-table" class="display table table-fixed issue-action-table">
        <thead>
            <tr>
                <th>Action</th>
                <th>Action Plan</th>
                <th>Assigned To</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updates From The Owner</th>
                <th>Closed On Date</th>
                <th>Closing Remark</th>
            </tr>
        </thead>
        <tbody>`;

    data.forEach(function (item) {
        const isDisabled = item.status != closedStatusId ? "disabled" : "";
        tableHtml += `
        <tr>
            <td class="text-center">
                <a href="#" title="Delete" id="delete-action-btn" data-action-id="${item.actionId}" onclick="DeleteAction(this,${item.actionId},1)">
                <i class="fas fa-trash text-danger"></i>
                </a>
            </td>
            <td class="action_input">
                <textarea class="form-control" data-action-plan rows="2" autocomplete="off">${item.actionPlan}</textarea>
                <span class="text-danger hide">Please Enter action plan</span>
            </td>
            <td class="action_input">
                <input type="text" class="form-control" data-assigned-to value="${item.assignedTo}" />
                <span class="text-danger hide select-user">Please select user </span>
                <span class="text-danger hide select-from-list">Please select user from the list</span>
                <span class="text-danger hide already-selected">user has been already selected</span>
                <span class="text-danger hide not-valid-user">Please select a valid user</span>
            </td>
            <td class="action_date trackersupport_datatablecalicon">
                <input type="text" class="form-control date_text_freezed" data-action-due-date readonly value="${item.dueDate}"  due-date/>
                <span class="text-danger hide">Please select due date</span>
                <i class="fas fa-calendar"></i>
            </td>
             <td class="action_select">
                <select class="form-control" data-action-priority>
                    ${generateSingleSelectOptions(priorityList, item.priority)}
                </select>
                <span class="text-danger hide">Please select Priority</span>
            </td>
            <td class="action_select">
                <select class="form-control" data-action-status>
                    ${generateSingleSelectOptions(statusList, item.status)}
                </select>
                <span class="text-danger hide">Please select status</span>
            </td>
            <td class="action_input">
                <textarea class="form-control" data-action-owner-update rows="2" autocomplete="off">${item.ownerUpdate}</textarea>
            </td>
            <td class="action_date trackersupport_datatablecalicon">
                <input type="text" class="form-control" data-action-closed-date readonly ${isDisabled} value="${item.closedDate}" closed-date/>
                <span class="text-danger hide">Please select closed on date</span>
                <i class="fas fa-calendar"></i>
            </td>
            <td class="action_input">
                <textarea class="form-control" rows="2" data-action-closed-remark ${isDisabled} autocomplete="off">${item.closedRemark}</textarea>
                <span class="text-danger hide">Please enter closing remark</span>
            </td>
        </tr>`;
    });

    tableHtml += `
        </tbody>
    </table>`;

    $('#action-table').html(tableHtml);
    InitializeDataTable(1, data.length);
    initializeAutocompleteDatepicker(1);
    ValidateAction(1);
}
$(document).on('click', '#open-action-popup', function () {

    $("#action-plan").val('').siblings('span').addClass('hide');
    $("#action-assigned-to").val('').siblings('span').addClass('hide');
    $("#action-due-date").val('').siblings('span').addClass('hide');
    $("#action-selected-status").val('').siblings('span').addClass('hide');
    $("#action-selected-priority").val('').siblings('span').addClass('hide');
    $("#action-owner-update").val('');
    $("#action-closed-date").val('').attr("disabled", "disabled").siblings('span').addClass('hide');
    $("#action-closed-remark").val('').attr("disabled", "disabled").siblings('span').addClass('hide');

    ShowActionPopup(addActionArray);
    $('#addActionPopup').modal("show");

});
$(document).on('click', '#add-action-to-table', function () {

    var actionPlan = $("#action-plan").val().trim();
    var assignedTo = $("#action-assigned-to").val().trim();
    var dueDate = $("#action-due-date").val();
    var status = $("#action-selected-status").val();
    var priority = $("#action-selected-priority").val();
    var ownerUpdate = $("#action-owner-update").val().trim();
    var closedDate = $("#action-closed-date").val();
    var closedRemark = $("#action-closed-remark").val().trim();

    var isValidAction = true;

    (actionPlan !== "" && actionPlan !== undefined && actionPlan !== null) ?
        $("#action-plan").siblings('span').addClass('hide') :
        ($("#action-plan").siblings('span').removeClass('hide'), isValidAction = false);

    (assignedTo !== "" && assignedTo !== undefined && assignedTo !== null) ?
        $("#action-assigned-to").siblings('span').addClass('hide') :
        ($("#action-assigned-to").siblings('.select-user').removeClass('hide'), isValidAction = false);

    (dueDate !== "" && dueDate !== undefined && dueDate !== null) ?
        $("#action-due-date").siblings('span').addClass('hide') :
        ($("#action-due-date").siblings('span').removeClass('hide'), isValidAction = false);

    (priority !== "" && priority !== undefined && priority !== null) ?
        $("#action-selected-priority").siblings('span').addClass('hide') :
        ($("#action-selected-priority").siblings('span').removeClass('hide'), isValidAction = false);

    (status !== "" && status !== undefined && status !== null) ?
        $("#action-selected-status").siblings('span').addClass('hide') :
        ($("#action-selected-status").siblings('span').removeClass('hide'), isValidAction = false);

    if (status == closedStatusId) {
        (closedDate !== "" && closedDate !== undefined && closedDate !== null) ?
            $("#action-closed-date").siblings('span').addClass('hide') :
            ($("#action-closed-date").siblings('span').removeClass('hide'), isValidAction = false);

        (closedRemark !== "" && closedRemark !== undefined && closedRemark !== null) ?
            $("#action-closed-remark").siblings('span').addClass('hide') :
            ($("#action-closed-remark").siblings('span').removeClass('hide'), isValidAction = false);
    }

    if (isValidAction) {
        addActionArray.push({
            actionId: addActionArray.reduce((max, item) => Math.max(max, item.actionId), 0) + 1,
            actionPlan: actionPlan,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
            priority: priority,
            ownerUpdate: ownerUpdate,
            closedDate: closedDate,
            closedRemark: closedRemark
        });

        $("#action-plan").val('').siblings('span').addClass('hide');
        $("#action-assigned-to").val('').siblings('span').addClass('hide');
        $("#action-due-date").val('').siblings('span').addClass('hide');
        $("#action-selected-status").val('').siblings('span').addClass('hide');
        $("#action-selected-priority").val('').siblings('span').addClass('hide');
        $("#action-owner-update").val('');
        $("#action-closed-date").val('').attr("disabled", "disabled").siblings('span').addClass('hide');
        $("#action-closed-remark").val('').attr("disabled", "disabled").siblings('span').addClass('hide');
    }

    DestroyDataTable(1);

    ShowActionPopup(addActionArray);

});
$(document).on('click', '.close-action-popup', function () {

    addActionArray = [];
    $('#action-data-table').dataTable().$('tr').each(function (i, obj) {
        addActionArray.push({
            actionId: addActionArray.reduce((max, item) => Math.max(max, item.actionId), 0) + 1,
            actionPlan: $(obj).find('[data-action-plan]').val().trim(),
            assignedTo: $(obj).find('[data-assigned-to]').val().trim(),
            dueDate: $(obj).find('[data-action-due-date]').val(),
            status: $(obj).find('[data-action-status]').val(),
            priority: $(obj).find('[data-action-priority]').val(),
            ownerUpdate: $(obj).find('[data-action-owner-update]').val().trim(),
            closedDate: $(obj).find('[data-action-closed-date]').val(),
            closedRemark: $(obj).find('[data-action-closed-remark]').val().trim()
        });
    });

    $("#addActionPopup").modal("hide");

});
$(document).on('click', '#save-issue', function () {

    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== "undefined" && $('#ProjectId').val() !== '0')
    {

        var isValidSave = true;

        var hub = $("#selected-hub").val().toString();
        var issueDesc = $("#issue-desc").val().trim();
        var issueIdentDate = $("#issue-iden-date").val();
        issueIdentDate = issueIdentDate != "" ? moment(issueIdentDate, "DD/MM/YYYY").format("YYYY-MM-DD") : issueIdentDate;
        var impactAss = $("#selected-impact-ass").val().toString();

        (hub !== "" && hub !== undefined && hub !== null) ?
            $("#selected-hub").siblings('span').addClass('hide') :
            ($("#selected-hub").siblings('span').removeClass('hide'), isValidSave = false);

        (issueDesc !== "" && issueDesc !== undefined && issueDesc !== null) ?
            $("#issue-desc").siblings('span').addClass('hide') :
            ($("#issue-desc").siblings('span').removeClass('hide'), isValidSave = false);

        (issueIdentDate !== "" && issueIdentDate !== undefined && issueIdentDate !== null) ?
            $("#issue-iden-date").siblings('span').addClass('hide') :
            ($("#issue-iden-date").siblings('span').removeClass('hide'), isValidSave = false);

        (impactAss !== "" && impactAss !== undefined && impactAss !== null) ?
            $("#selected-impact-ass").siblings('span').addClass('hide') :
            ($("#selected-impact-ass").siblings('span').removeClass('hide'), isValidSave = false);


        if (griddatafortask.length == 0) {
            $("#open-task-popup").siblings('span').removeClass('hide')
            isValidSave = false;
        }
        else {
            $("#open-task-popup").siblings('span').addClass('hide')
        }

        invalidAddAction = [];
        function isValidActionObj(obj) {

            const status = 'status';
            const actionId = 'actionId';
            const closedDate = 'closedDate';
            const closedRemark = 'closedRemark';
            const ownerUpdate = 'ownerUpdate'

            if (obj[status] == closedStatusId) {
                for (let key in obj) {
                    if ((obj[key] === "" || obj[key] === null || obj[key] === undefined) && key != ownerUpdate) {
                        invalidAddAction.push(
                            obj[actionId],
                        );
                    }
                }
            }
            else {
                for (let key in obj) {
                    if (key != closedDate && key != closedRemark && key != ownerUpdate) {
                        if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
                            invalidAddAction.push(
                                obj[actionId],
                            );
                        }
                    }
                }
            }
        }

        if (addActionArray.length > 0) {
            addActionArray.forEach(function (item) {
                isValidActionObj(item);
            });
        }
        if (invalidAddAction.length > 0) {
            $("#open-action-popup").siblings('span').removeClass('hide')
            isValidSave = false;
        }
        else {
            $("#open-action-popup").siblings('span').addClass('hide')
        }

        if (isValidSave) {
            handelConfirmPopup('Are you sure do you want to Save ?',
                function () {
                    var formData = new FormData();

                    headers = [];
                    details = [];
                    impactedTasks = [];

                    headers.push({
                        HUBId: hub,
                        IssueDescription: issueDesc,
                        IssueIdentificationDate: issueIdentDate,
                        ImpactAssesmentId: impactAss,
                    });

                    var temp = addActionArray;

                    details = temp;

                    details = details.map(array => {
                        return { ...array, hubId: hub };
                    });
                    details.forEach(function (item) {
                        item.dueDate = moment(item.dueDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                        item.closedDate = item.closedDate != "" ? moment(item.closedDate, "DD/MM/YYYY").format("YYYY-MM-DD") : item.closedDate;
                    });

                    impactedTasks = griddatafortask;

                    formData.append("Headers", JSON.stringify(headers));
                    formData.append("Details", JSON.stringify(details));
                    formData.append("ImpactedTasks", JSON.stringify(impactedTasks));
                    formData.append("IsInsert", addActionArray.length == 0 ? 2 : 1);
                    formData.append("IssueId", 0);
                    formData.append("ProjectId", $('#ProjectId').val());

                    $.ajax({
                        url: ROOT + 'TrackerSupport/InsertUpdateIssue',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (response != "" && response != null && response != undefined && response.toLowerCase().includes("success")) {
                                workingIssueId = '';
                                headers = [];
                                details = [];
                                impactedTasks = [];
                                gridData = [];
                                griddatafortask = [];
                                addActionArray = [];
                                hubProjectData = [];
                                $("#selected-hub").val('').multiselect("refresh");
                                $("#issue-desc").val('')
                                $("#issue-iden-date").val('');
                                $("#selected-impact-ass").val('').multiselect("refresh");
                                getData();
                                $("#response-message").text(response);
                                $("#response-message-div").removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                            }
                            else {
                                alert(response);
                            }
                        },
                        error: function (xhr, status, error) {
                            alert(error);
                        }
                    });
                },
            );
        }
    }
    else {
        alert('Please select the Project');
    }

});

//--------------------Edit issue--------------------

function GetIssueData(issuedata) {

    workingIssueId = issuedata.getAttribute('data-issueid');
    $.ajax({
        type: "GET",
        url: ROOT + "TrackerSupport/GetParticularIssueData",
        data: {
            issueId: parseInt(workingIssueId)
        },
        success: function (response) {
            if (response != null && response != undefined) {
                dataBeforeEdit = response;
                editIssueFoundDate = response.Item1[0].IssueIdenDate;
                ShowEditIssuePopup(response.Item1, response.Item2, response.Item3);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
    var trElement = issuedata.closest('tr');
    var textOfClassElement = $(trElement).find("td.issue-no").text();
    $(".edit-issue-no").text(textOfClassElement);
    $('#editIssuePopup').modal("show");

}
function ShowEditIssuePopup(headerdata, actiondata, impactedtaskdata) {
    
    $('#edited-selected-hub').val(((headerdata[0].Hub).trim()).split(',')).multiselect('refresh');
    $("#edited-issue-desc").val(headerdata[0].IssueDesc);
    $("#edited-issue-iden-date").val(headerdata[0].IssueIdenDate);
    $('#edited-issue-iden-date').attr('data-previousvalue', headerdata[0].IssueIdenDate);
    $('#edited-selected-impact-ass').val(((headerdata[0].ImpactedAss).trim()).split(',')).multiselect('refresh');

    let tableHtml = `
    <table id="edit-action-data-table" class="display table table-fixed edit-action-table issue-action-table">
        <thead>
            <tr>
                <th class="add-row-cursor">
                    <div class="text-center plus-icon-div">
                        <button class="fas fa-plus plus_icon" onclick="CreateActionRow(this)" title="Add"></button>
                    </div>
                </th>
                <th class="hide">Action Id</th>
                <th>Action Plan</th>
                <th>Assigned To</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updates From The Owner</th>
                <th>Closed On Date</th>
                <th>Closing Remark</th>
            </tr>
        </thead>
        <tbody>`;

    actiondata.forEach(function (item, index) {
        const isDisabled = item.Status != closedStatusId ? "disabled" : "";
        var rowId = "rowId-" + (index + 1);
        tableHtml += `
        <tr id="`+ rowId + `">
            <td>
            </td>
            <td class="hide">
                <input type="text" class="form-control" data-action-id value="${item.ActionId}"/>
            </td>
            <td class="action_input">
                <textarea class="form-control" data-action-plan rows="2" autocomplete="off">${item.ActionPlan}</textarea>
                <span class="text-danger hide">Please Enter action plan</span>
            </td>
            <td class="action_input">
                <input type="text" class="form-control" data-assigned-to value="${item.AssignedTo}" />
                <span class="text-danger hide select-user">Please select user </span>
                <span class="text-danger hide select-from-list">Please select user from the list</span>
                <span class="text-danger hide already-selected">user has been already selected</span>
                <span class="text-danger hide not-valid-user">Please select a valid user</span>
            </td>
            <td class="action_date trackersupport_datatablecalicon">
                <input type="text" class="form-control date_text_freezed" due-date data-action-due-date readonly value="${item.DueDate}" />
                <span class="text-danger hide">Please select due date</span>
                <i class="fas fa-calendar"></i>
            </td>
            <td class="action_select">
                <select class="form-control" data-action-priority>
                    ${generateSingleSelectOptions(priorityList, item.Priority)}
                </select>
                <span class="text-danger hide">Please select Priority</span>
            </td>
            <td class="action_select">
                <select class="form-control" data-action-status>
                    ${generateSingleSelectOptions(statusList, item.Status)}
                </select>
                <span class="text-danger hide">Please select status</span>
            </td>
            <td class="action_input d-flex align-items-center action_icons">
                <textarea rows="2" class="form-control" data-action-owner-update autocomplete="off"></textarea>
                ${item.OwnerUpdate > 0 ? `<a href="#" onclick="ShowOwnerUpdatePopup(${item.ActionId})" title="Updates from the owner"><i class="fas fa-history color-info ml-2"></i></a>` : ''}
            </td>
            <td class="action_date trackersupport_datatablecalicon">
                <input type="text" class="form-control" closed-date data-action-closed-date readonly ${isDisabled} value="${item.ClosedDate}" />
                <span class="text-danger hide">Please select closed on date</span>
                <i class="fas fa-calendar"></i>
            </td>
            <td class="action_input">
                <textarea class="form-control" rows="2" data-action-closed-remark ${isDisabled} autocomplete="off">${item.ClosedRemark}</textarea>
                <span class="text-danger hide">Please enter closing remark</span>
            </td>
        </tr>`;
    });

    tableHtml += `
        </tbody>
    </table>`;

    $('#edit-issue-table').html(tableHtml);

    InitializeDataTable(2, actiondata.length);
    initializeAutocompleteDatepicker(2);
    ValidateAction(2);

    impactedtaskdata = impactedtaskdata.map(task => {
        return { ...task, IsNew: 0 };
    });

    griddatafortask = [];
    griddatafortask = impactedtaskdata;
    $("#task-grid").jqGrid('setGridParam', { data: griddatafortask });
    $("#task-grid").trigger('reloadGrid', [{ page: 1 }]);

}
function CreateActionRow() {

    var length = $('#edit-action-data-table tbody tr').length + 1;
    var rowId = "rowId-" + length;
    var newRow = `<tr id=` + rowId + `>
                    <td class="text-center">
                        <a href="#" title="Delete" id="delete-action-btn" onclick="DeleteAction(this,${length},2)">
                        <i class="fas fa-trash text-danger"></i></a>
                    </td>
                    <td class="hide">
                        <input type="text" class="form-control" data-action-id value=""/>
                    </td>
                    <td class="action_input">
                        <textarea rows="2" class="form-control" data-action-plan autocomplete="off"></textarea>
                        <span class="text-danger hide">Please Enter action plan</span>
                    </td>
                    <td class="action_input">
                        <input type="text" class="form-control" data-assigned-to />
                        <span class="text-danger hide select-user">Please select user </span>
                        <span class="text-danger hide select-from-list">Please select user from the list</span>
                        <span class="text-danger hide already-selected">user has been already selected</span>
                        <span class="text-danger hide not-valid-user">Please select a valid user</span>
                    </td>
                    <td class="action_date trackersupport_datatablecalicon">
                        <input type="text" class="form-control date_text_freezed"  data-action-due-date readonly due-date/>
                        <span class="text-danger hide">Please select due date</span>
                        <i class="fas fa-calendar"></i>
                    </td>
                    <td class="action_select">
                        <select class="form-control" data-action-priority>
                            ${generateSingleSelectOptions(priorityList, 0)}
                        </select>
                        <span class="text-danger hide">Please select Priority</span>
                    </td>
                    <td class="action_select">
                        <select class="form-control" data-action-status>
                            ${generateSingleSelectOptions(statusList, 0)}
                        </select>
                        <span class="text-danger hide">Please select status</span>
                    </td>
                    <td class="action_input">
                        <textarea rows="2" class="form-control" data-action-owner-update autocomplete="off"></textarea>
                    </td>
                    <td class="action_date trackersupport_datatablecalicon">
                        <input type="text" class="form-control"  data-action-closed-date readonly disabled closed-date/>
                        <span class="text-danger hide">Please select closed on date</span>
                        <i class="fas fa-calendar"></i>
                    </td>
                    <td class="action_input">
                        <textarea class="form-control" rows="2" data-action-closed-remark disabled autocomplete="off"></textarea>
                        <span class="text-danger hide">Please enter closing remark</span>
                    </td>
                </tr>`;

    DestroyDataTable(2);
    $('#edit-action-data-table').find('tbody').append(newRow);
    InitializeDataTable(2, length);
    initializeAutocompleteDatepicker(2);

}
$("#open-edit-impactedtask-popup").on('click', function () {

    var isValid = true;
    var projectid = $("#ProjectId option:selected").val();
    var hubId = $("#edited-selected-hub").val().join(',').toString();

    if (projectid == 0) {
        alert("Please select Project");
        isValid = false;
    }
    else if (hubId == 0 || hubId == '') {
        alert("Please select HUB");
        isValid = false;
    }
    else if (projectid == 0 || (hubId == 0 || hubId == '')) {
        alert("Please select Project and HUB");
        isValid = false;
    }

    if (isValid) {
        $.ajax({
            type: "POST",
            url: ROOT + "TrackerSupport/GetTaskList",
            data: {
                projectId: projectid, hubId: hubId
            },
            success: function (result) {
                if (result.length > 0) {
                    taskdata.push(result);
                }
                generateImpactedTaskHubOptions(2);
                $("#task-modal").modal('show');
                getTaskGrid();
                selectedTaskId = 0;
                selectedhubId = 0;
                selectedHubName = '';
            }
        });
    }

});
function CompareIssueEditedData() {

    var isIssueChanged = false;
    if (dataBeforeEdit.Item1.length != headers.length || dataBeforeEdit.Item2.length != details.length || dataBeforeEdit.Item3.length != impactedTasks.length) {
        isIssueChanged = true;
    }
    else {
        if (details.filter(item => item.ownerUpdate != "").length != 0) {
            isIssueChanged = true;
        }

        if (isIssueChanged == false) {
            for (var i = 0; i < headers.length; i++) {
                if (
                    headers[i].HUBId !== dataBeforeEdit.Item1[0].Hub ||
                    headers[i].IssueDescription !== dataBeforeEdit.Item1[0].IssueDesc ||
                    headers[i].IssueIdentificationDate !== (dataBeforeEdit.Item1[0].IssueIdenDate != "" ? moment(dataBeforeEdit.Item1[0].IssueIdenDate, "DD/MM/YYYY").format("YYYY-MM-DD") : dataBeforeEdit.Item1[0].IssueIdenDate) ||
                    headers[i].ImpactAssesmentId !== dataBeforeEdit.Item1[0].ImpactedAss
                ) {
                    isIssueChanged = true;
                    break;
                }
            }
        }

        if (isIssueChanged == false) {
            for (var i = 0; i < details.length; i++) {

                var filteredAction = dataBeforeEdit.Item2.filter(item => item.ActionId == details[i].actionId)
                if (filteredAction.length > 0) {

                    if (details[i].actionPlan !== filteredAction[0].ActionPlan ||
                        details[i].assignedTo !== filteredAction[0].AssignedTo ||
                        details[i].dueDate !== (filteredAction[0].DueDate != "" ? moment(filteredAction[0].DueDate, "DD/MM/YYYY").format("YYYY-MM-DD") : filteredAction[0].DueDate) ||
                        details[i].status !== filteredAction[0].Status ||
                        details[i].priority !== filteredAction[0].Priority ||
                        details[i].closedDate !== (filteredAction[0].ClosedDate != "" ? moment(filteredAction[0].ClosedDate, "DD/MM/YYYY").format("YYYY-MM-DD") : filteredAction[0].ClosedDate) ||
                        details[i].closedRemark !== filteredAction[0].ClosedRemark
                    ) {
                        isIssueChanged = true;
                        break;
                    }
                }
                else {
                    isIssueChanged = true;
                    break;
                }
            }
        }

        if (isIssueChanged == false) {
            for (var i = 0; i < impactedTasks.length; i++) {

                var filteredTask = dataBeforeEdit.Item3.filter(item => item.TaskId == impactedTasks[i].TaskId)
                if (filteredTask.length > 0) {

                    if (impactedTasks[i].TaskId !== filteredTask[0].TaskId ||
                        impactedTasks[i].HUBId !== filteredTask[0].HUBId ||
                        impactedTasks[i].IsActive !== filteredTask[0].IsActive
                    ) {
                        isIssueChanged = true;
                        break;
                    }
                }
                else {
                    isIssueChanged = true;
                    break;
                }
            }
        }

    }
    return isIssueChanged;
}
$(document).on('click', '.close-edit-popup', function () {
    generateEditedDate(1);
    if (CompareIssueEditedData()) {

        UnsavedDataAlert("You have some unsaved Data, Please save otherwise you will lose the data",
            function () {
                $("#save-edited-issue").click();
            },
            function () {
                $("#editIssuePopup").modal("hide");
                griddatafortask = [];
            },
        );
    }
    else {
        $("#editIssuePopup").modal("hide");
        griddatafortask = [];
    }
});
function UnsavedDataAlert(msg, func, func1) {
    $('#unsavedmessage').empty().html(msg);
    $('#UnsavedChangesAlert').modal('show');
    if (func) {
        $("#saveunsavedchanges").unbind("click");
        $('#saveunsavedchanges').on("click", func);
    }
    if (func1) {
        $("#continueunsavedchanges").unbind("click");
        $('#continueunsavedchanges').on("click", func1);
    }
}
$(document).on('click', '#save-edited-issue', function () {
    
    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== "undefined" && $('#ProjectId').val() !== '0')
    {

        var isValidEditSave = true;

        var hub = $("#edited-selected-hub").val().toString();
        var issueDesc = $("#edited-issue-desc").val().trim();
        var issueIdentDate = $("#edited-issue-iden-date").val();
        issueIdentDate = issueIdentDate != "" ? moment(issueIdentDate, "DD/MM/YYYY").format("YYYY-MM-DD") : issueIdentDate;
        var impactAss = $("#edited-selected-impact-ass").val().toString();

        (hub !== "" && hub !== undefined && hub !== null) ?
            $("#edited-selected-hub").siblings('span').addClass('hide') :
            ($("#edited-selected-hub").siblings('span').removeClass('hide'), isValidEditSave = false);

        (issueDesc !== "" && issueDesc !== undefined && issueDesc !== null) ?
            $("#edited-issue-desc").siblings('span').addClass('hide') :
            ($("#edited-issue-desc").siblings('span').removeClass('hide'), isValidEditSave = false);

        (issueIdentDate !== "" && issueIdentDate !== undefined && issueIdentDate !== null) ?
            $("#edited-issue-iden-date").siblings('span').addClass('hide') :
            ($("#edited-issue-iden-date").siblings('span').removeClass('hide'), isValidEditSave = false);

        (impactAss !== "" && impactAss !== undefined && impactAss !== null) ?
            $("#edited-selected-impact-ass").siblings('span').addClass('hide') :
            ($("#edited-selected-impact-ass").siblings('span').removeClass('hide'), isValidEditSave = false);

        if (griddatafortask.length == 0) {
            $("#open-edit-impactedtask-popup").siblings('span').removeClass('hide');
            isValidEditSave = false;
        }
        else {
            $("#open-edit-impactedtask-popup").siblings('span').addClass('hide');
        }

        ValidateAction(2);

        if (invalidEditAction.length > 0) {
            isValidEditSave = false;
        }

        if (isValidEditSave) {
            generateEditedDate(2);
        }

    }
    else {
        alert('Please select the Project');
    }
});
function generateEditedDate(Action) {

    // Action 1 -------> edited date to compare
    // Action 2 -------> edited date to compare and save

    var hub = $("#edited-selected-hub").val().toString();
    var issueDesc = $("#edited-issue-desc").val().trim();
    var issueIdentDate = $("#edited-issue-iden-date").val();
    issueIdentDate = issueIdentDate != "" ? moment(issueIdentDate, "DD/MM/YYYY").format("YYYY-MM-DD") : issueIdentDate;
    var impactAss = $("#edited-selected-impact-ass").val().toString();

    headers = [];
    details = [];
    impactedTasks = [];

    headers.push({
        HUBId: hub,
        IssueDescription: issueDesc,
        IssueIdentificationDate: issueIdentDate,
        ImpactAssesmentId: impactAss,
    });
    $('#edit-action-data-table').dataTable().$('tr').each(function (i, obj) {
        details.push({
            hubId: $("#edited-selected-hub").val().toString(),
            actionId: $(obj).find('[data-action-id]').val(),
            actionPlan: $(obj).find('[data-action-plan]').val().trim(),
            assignedTo: $(obj).find('[data-assigned-to]').val().trim(),
            dueDate: moment($(obj).find('[data-action-due-date]').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            status: $(obj).find('[data-action-status]').val(),
            priority: $(obj).find('[data-action-priority]').val(),
            ownerUpdate: $(obj).find('[data-action-owner-update]').val().trim(),
            closedDate: (($(obj).find('[data-action-closed-date]').val()) != "" ?
                moment($(obj).find('[data-action-closed-date]').val(), "DD/MM/YYYY").format("YYYY-MM-DD") : ($(obj).find('[data-action-closed-date]').val())),
            closedRemark: $(obj).find('[data-action-closed-remark]').val().trim()
        });
    });

    impactedTasks = griddatafortask;

    if (Action == 1) {
    }
    else if (Action == 2) {
        SubmitEditedData(headers, details, impactedTasks);
    }

}
function SubmitEditedData(headers, details, impactedTasks) {

    if (CompareIssueEditedData()) {
        handelConfirmPopup('Are you sure do you want to Save ?',
            function () {
                var formData = new FormData();

                formData.append("Headers", JSON.stringify(headers));
                formData.append("Details", JSON.stringify(details));
                formData.append("ImpactedTasks", JSON.stringify(impactedTasks));
                formData.append("IsInsert", 3);
                formData.append("IssueId", workingIssueId);
                formData.append("ProjectId", $('#ProjectId').val());

                $.ajax({
                    url: ROOT + 'TrackerSupport/InsertUpdateIssue',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response != "" && response != null && response != undefined && response.toLowerCase().includes("success")) {
                            workingIssueId = '';
                            headers = [];
                            details = [];
                            impactedTasks = [];
                            gridData = [];
                            griddatafortask = [];
                            addActionArray = [];
                            getData();
                            $("#editIssuePopup").modal("hide");
                            $("#response-message").text(response);
                            $("#response-message-div").removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                        }
                        else {
                            alert(response);
                        }
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });
            },
        );

    }
    else {
        alert('There is no changes to save');
    }

}
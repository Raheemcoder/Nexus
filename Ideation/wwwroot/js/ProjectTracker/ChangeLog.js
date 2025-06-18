//------- Change Log List variables & array ----------

var role = 0;
var oldRegion;

var gridData = [];
var udpateFromOwnerArray = [];
var remarksArray = [];
var hubProjectData = [];

//------- Change Log Add & Edit variables & array ----------

var allDropDownList = [];
var statusList = [];
var priorityList = [];
var hubList = [];
var impactAreaList = [];
var crStatus = [];

var closedStatusId = "";
var agreedCRStatusId = "";
var rejectedCRStatusId = "";
var onHoldCRStatusId = "";

var selectedResourcesId = 0;
var assignedToList = [];

var addActionArray = [];
var invalidAddAction = [];

var workingChangeId = '';
var dataBeforeEdit = [];
var editedHeaderData = [];
var editedActionData = [];
var invalidEditAction = [];

var headers = [];
var details = [];

var addChangeFoundDate = "";
var editChangeFoundDate = "";

var scopeId = 0;
var timeLineId = 0;
var isScopeUnCheckable;

$(document).ready(function () {

    var today = new Date();
    $('[founded-date]').datepicker('destroy');
    $('[founded-date]').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        changeMonth: true,
        maxDate: new Date(today)
    });

    $('[app-rej-date]').datepicker('destroy');
    $('[app-rej-date]').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        changeMonth: true,
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

    role = parseInt($("#userRole").val());

    if ($("#AllDropDownList").val() != null && $("#AllDropDownList").val() != undefined && $("#AllDropDownList").val() != "") {
        allDropDownList = JSON.parse($("#AllDropDownList").val());
    }

    if ($("#AssignedtoList").val() != null && $("#AssignedtoList").val() != undefined && $("#AssignedtoList").val() != "") {
        assignedToList = JSON.parse($("#AssignedtoList").val());
    }

    if (allDropDownList.length > 0) {
        statusList = allDropDownList.filter(item => item.Type.toLowerCase() == "issuestatus");
        closedStatusId = statusList.filter(item => item.Text.toLowerCase() === "closed")[0].Value.toString();
        priorityList = allDropDownList.filter(item => item.Type.toLowerCase() == "priority");
        hubList = allDropDownList.filter(item => item.Type.toLowerCase() == "projhub");
        impactAreaList = allDropDownList.filter(item => item.Type.toLowerCase() == "impactassesment");
        crStatus = allDropDownList.filter(item => item.Type.toLowerCase() == "crstatus");
        agreedCRStatusId = crStatus.filter(item => item.Text.toLowerCase() === "agreed")[0].Value.toString();
        rejectedCRStatusId = crStatus.filter(item => item.Text.toLowerCase() === "rejected")[0].Value.toString();
        onHoldCRStatusId = crStatus.filter(item => item.Text.toLowerCase() === "on hold")[0].Value.toString();

        scopeId = parseInt(impactAreaList.filter(item => item.Text.toLowerCase() === "scope")[0].Value);
        timeLineId = parseInt(impactAreaList.filter(item => item.Text.toLowerCase() === "timeline")[0].Value);
    }

    if (!($('#selectedProjectId').val() === null || $('#selectedProjectId').val() === "" || typeof ($('#selectedProjectId').val()) === "undefined")) {
        $('.projectName_error').text('');
        var projectId = $('#selectedProjectId').val();
        $("#ProjectId").select2().val(projectId).trigger("change");
        getData();
    }
    else {
        $('.projectName_error').text('Please select the Project');
    }

    initializeAutocompleteDatepicker();
    createJQGrid([]);

});

var changeId_action = '';
function arrtSetting_Action(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_action === '' || changeId_action != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_action = changeId;
    return result;
}

var changeId_new = '';
function arrtSetting_ChangeId(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_new === '' || changeId_new != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_new = changeId;
    return result;
}

var changeId_hub = '';
function arrtSetting_Hub(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_hub === '' || changeId_hub != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_hub = changeId;
    return result;
}

var changeId_proposedBy = '';
function arrtSetting_ChangePropsedBy(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_proposedBy === '' || changeId_proposedBy != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_proposedBy = changeId;
    return result;
}

var changeId_proposedDate = '';
function arrtSetting_ChangeProposedDate(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_proposedDate === '' || changeId_proposedDate != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_proposedDate = changeId;
    return result;
}

var changeId_changeDetails = '';
function arrtSetting_ChangeDetails(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_changeDetails === '' || changeId_changeDetails != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_changeDetails = changeId;
    return result;
}

var changeId_impactArea = '';
function arrtSetting_ImpactArea(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_impactArea === '' || changeId_impactArea != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_impactArea = changeId;
    return result;
}

var changeId_impactdesc = '';
function arrtSetting_ImpactDescription(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_impactdesc === '' || changeId_impactdesc != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_impactdesc = changeId;
    return result;
}

var changeId_propsedBy = '';
function arrtSetting_ProposedBy(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_propsedBy === '' || changeId_propsedBy != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_propsedBy = changeId;
    return result;
}

var changeId_CRStatus = '';
function arrtSetting_ChangeRequestStatus(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_CRStatus === '' || changeId_CRStatus != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_CRStatus = changeId;
    return result;
}

var changeId_AgreedRejectedBy = '';
function arrtSetting_AgreedRejectedBy(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_AgreedRejectedBy === '' || changeId_AgreedRejectedBy != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_AgreedRejectedBy = changeId;
    return result;
}

var changeId_AgreedRejectedDate = '';
function arrtSetting_AgreedRejectedDate(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_AgreedRejectedDate === '' || changeId_AgreedRejectedDate != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_AgreedRejectedDate = changeId;
    return result;
}

var changeId_Remarks = '';
function arrtSetting_Remarks(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_Remarks === '' || changeId_Remarks != changeId) {
        var changeDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(changeDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_Remarks = changeId;
    return result;
}
var changeId_CreatedBy = '';
function arrtSetting_CreatedBy(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_CreatedBy === '' || changeId_CreatedBy != changeId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_CreatedBy = changeId;
    return result;
}
var changeId_CreatedOn = '';
function arrtSetting_CreatedOn(rowId, val, rawObject) {
    var result;
    var changeId = rawObject.ChangeId;
    if (changeId_CreatedOn === '' || changeId_CreatedOn != changeId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.ChangeId === changeId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    changeId_CreatedOn = changeId;
    return result;
}

function MultiselectHubOptions(type) {

    // type 1 -- List page
    // type 2 -- Edit popup

    var hubFieldId = type == 1 ? $("#selected-hub") : $("#edited-selected-hub");

    hubFieldId.html("");

    var hubDrop = '';
    for (var i = 0; i < hubProjectData.length; i++) {
        if (hubProjectData[i].HubApproved === "1") {
            hubDrop += '<option class="approvedHub" value="' + hubProjectData[i].HubId + '">' + hubProjectData[i].HubName + '</option>';
        } else if (hubProjectData[i].HubApproved === "0" && hubProjectData[i].HubSaved === "1") {
            hubDrop += '<option class="savedHub" value="' + hubProjectData[i].HubId + '">' + hubProjectData[i].HubName + '</option>';
        } else {
            hubDrop += '<option value="' + hubProjectData[i].HubId + '">' + hubProjectData[i].HubName + '</option>';
        }
    }

    hubFieldId.html(hubDrop);

    hubFieldId.multiselect('destroy');

    hubFieldId.multiselect({
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '100%',
        includeSelectAllOption: true
    });

}

function validateFilteredData(new_data) {

    var grid_filtered_data = new_data;

    var colModel = $("#list-changelog-jqgrid").jqGrid('getGridParam', 'colModel');

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
    $("#selected-hub").val('').multiselect('refresh');
    $('#change-details').val('');
    $('#proposed-date').val('');
    $('#proposed-by').val('');
    $('#selected-impact-area').val('').multiselect('refresh');
    $('#impact-description').val('').trigger('change');
    $('#selected-cr-status').val('').trigger('change');
    $('#app-rej-date').val('');
    $('#app-rej-by').val('');
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
function handelConfirmPopup1(msg, func, func1) {

    $(".ConfirmCancelbutton1").hide();
    $(".resource-required-div").hide();

    $('#confirmpopupmesssage1').empty().html(msg);
    $('#confirmpopup1').modal('show');

    if (func) {
        $("#ConfirmYesbutton1").unbind("click");
        $('#ConfirmYesbutton1').on("click", func);
    }
    if (func1) {
        $("#ConfirmNobutton1").unbind("click");
        $('#ConfirmNobutton1').on("click", func1);
    }

}
function handelConfirmRemarksPopup(crStatus, func) {

    $("#change-remarks").val('');
    $("#change-remarks").siblings('span').addClass('hide');

    if (crStatus.toLowerCase() == "select") {
        $('#save-with-remarks-label').html('Remarks');
    }
    else if (crStatus.toLowerCase() == "agreed") {
        $('#save-with-remarks-label').html(crStatus + ' Remarks');
    }
    else {
        $('#save-with-remarks-label').html(crStatus + ' Remarks ' + '<span class="text-danger">*</span>');
    }

    $('#save-with-remarks-popup').modal('show');
    if (func) {
        $("#save-confirm").unbind("click");
        $('#save-confirm').on("click", func);
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
        url: ROOT + "TrackerSupport/GetChangeList",
        data: {
            projectId: projectid
        },
        success: function (result) {
            if (result != null && result != undefined) {
                gridData = result.Item1;
                hubProjectData = result.Item2;
                udpateFromOwnerArray = result.Item3;
                remarksArray = result.Item4;
                MultiselectHubOptions(1);
                applyRowspan();
                createJQGrid(gridData);
            }
        }
    });

}
function DeleteChange(changedata) {

    var changeId = changedata.getAttribute('data-changeid');
    var isScopeUnCheckableOnDelete = parseInt(changedata.getAttribute('data-isScopeUnCheckable'));
    var projectId = $("#ProjectId").val();

    var msg = isScopeUnCheckableOnDelete == 1 ?
        "Since there is a scope and timeline change, Please contact admin to delete the current scope changed pmu mapping plan to delete the change" :
        "Are you sure do you want to Delete ?";

    if (isScopeUnCheckableOnDelete == 1) {
        alert(msg);
    }
    else {
        handelConfirmPopup(msg,
            function () {
                $.ajax({
                    type: "POST",
                    url: ROOT + "TrackerSupport/DeleteChange",
                    data: { ProjectId: projectId, ChangeId: changeId },
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

}
function applyRowspan() {
    changeId_action = '';
    changeId_new = '';
    changeId_hub = '';
    changeId_proposedBy = '';
    changeId_proposedDate = '';
    changeId_changeDetails = '';
    changeId_impactArea = '';
    changeId_impactdesc = '';
    changeId_propsedBy = '';
    changeId_CRStatus = '';
    changeId_AgreedRejectedBy = '';
    changeId_AgreedRejectedDate = '';
    changeId_Remarks = '';
    changeId_CreatedBy = '';
    changeId_CreatedOn = '';
}
function createJQGrid(data) {

    $.jgrid.gridUnload('#list-changelog-jqgrid');
    $("#list-changelog-jqgrid").jqGrid({
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

                    if (rowobject.ChangeRequestStatus == "Rejected") {
                        return '';
                    }

                    var deleteIcon = '';
                    if (!rowobject.ActionItem && (rowobject.ActionPlan == null || rowobject.ActionPlan == '')) {
                        deleteIcon = '<a href="#" title="Delete" id="deletebtn" onclick="DeleteChange(this)" data-changeid="' + rowobject.ChangeId + '" data-isScopeUnCheckable = "' + rowobject.IsScopeUnCheckable + '"><i class="fas fa-trash text-danger"></i></a>';
                    }

                    return '<div class="d-flex align-items-center justify-content-evenly">' +
                        '<span class="editRow" title="Edit"><i class="fas fa-pen text-primary" onclick="GetChangeData(this)" data-changeid="' + rowobject.ChangeId + '" style="cursor:pointer;"  data-isScopeUnCheckable = "' + rowobject.IsScopeUnCheckable + '"></i></span>' +
                        deleteIcon +
                        '</div>';
                }
            },
            {
                label: 'Change Id',
                name: 'ChangeId',
                width: 10,
                hidden: true
            },
            {
                label: 'Change No',
                name: 'ChangeNo',
                width: 100,
                cellattr: arrtSetting_ChangeId,
                classes: 'change-no'
            },
            {
                label: 'HUB',
                name: 'HubName',
                width: 120,
                cellattr: arrtSetting_Hub
            },
            {
                label: 'Change Proposed By',
                name: 'ProposedBy',
                width: 200,
                cellattr: arrtSetting_ChangePropsedBy
            },
            {
                label: 'Change Proposed Date',
                name: 'ProposedDate',
                width: 80,
                cellattr: arrtSetting_ChangeProposedDate,
                classes: "ChangeProposedDate"
            },
            {
                label: 'Change Details',
                name: 'ChangeDetails',
                width: 250,
                cellattr: arrtSetting_ChangeDetails,
            },
            {
                label: 'Impact Area',
                name: 'ImpactArea',
                width: 200,
                cellattr: arrtSetting_ImpactArea,
            },
            {
                label: 'Impact Description',
                name: 'ImpactDescription',
                width: 250,
                cellattr: arrtSetting_ImpactDescription,
            },
            {
                label: 'Change Request Status',
                name: 'ChangeRequestStatus',
                width: 85,
                classes: "ChangeRequestStatus",
                cellattr: arrtSetting_ChangeRequestStatus,
                formatter: function (cellvalue, options, rowobject) {

                    if (rowobject.ChangeRequestStatus == "Agreed") {
                        return '<a href="#" class="task_status value_info"> <span class="text-success">' + cellvalue + '</span></a>'
                    }
                    else if (rowobject.ChangeRequestStatus == "Rejected") {
                        return '<a href="#" class="task_status value_info"> <span class="text-danger">' + cellvalue + '</span></a>'
                    }
                    else if (rowobject.ChangeRequestStatus == "On Hold") {
                        return '<a href="#" class="task_status value_info"> <span class="text-warning">' + cellvalue + '</span></a>'
                    }
                    else {
                        return '';
                    }
                }
            },
            {
                label: 'Agreed/Rejected By',
                name: 'AgreedRejectedBy',
                width: 200,
                classes: "AgreedRejectedBy",
                cellattr: arrtSetting_AgreedRejectedBy

            },
            {
                label: 'Agreed/Rejected Date',
                name: 'AgreedRejectedDate',
                width: 100,
                classes: "AgreedRejectedDate",
                cellattr: arrtSetting_AgreedRejectedDate

            },
            {
                label: 'Remarks',
                name: 'Remarks',
                width: 70,
                search: false,
                cellattr: arrtSetting_Remarks,
                formatter: function (cellvalue, options, rowobject) {
                    return rowobject.Remarks > 0 ?
                        '<div class="text-center action_icons"><a href="#" onclick="ShowRemarksPopup(' + rowobject.ChangeId + ')" title="Remarks"><i class="fas fa-info color-info"></i></a></div>' : '';
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
                width: 250,
            },
            {
                label: 'Action Assigned To',
                name: 'Resources',
                width: 200,
            },
            {
                label: 'Due Date',
                name: 'DueDate',
                width: 80
            },
            {
                label: 'Priority',
                name: 'Priority',
                width: 80
            },
            {
                label: 'Status',
                name: 'Status',
                width: 80
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
                width: 250,
            },
        ],
        cmTemplate: { sortable: false },
        loadonce: true,
        viewrecords: true,
        pager: '#changelog_pager',
        rowNum: data.length,
        hoverrows: false,
        scroll: 1,
        beforeSelectRow: function () {
            return false;
        },
        gridComplete: function () {
            if (role == 4 || role == 3) {
                $("#list-changelog-jqgrid").jqGrid('hideCol', "Action");
            }
            applyRowspan();
            var pagercount = $('#list-changelog-jqgrid').find('tr').find('td.change-no:visible').length;
            if (pagercount == 0) {
                $("#changelog_pager").find('.ui-paging-info').text("No Records To View");
            }
            else {
                $("#changelog_pager").find('.ui-paging-info').text("View 1 - " + pagercount + " of " + pagercount);
            }
        }
    });

    if (role == 4 || role == 3) {
        $('#list-changelog-jqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-240px + 100vh)' });
    }
    else {
        $('#list-changelog-jqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-390px + 100vh)' });
    }
    $('#list-changelog-jqgrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#list-changelog-jqgrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#list-changelog-jqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#list-changelog-jqgrid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#list-changelog-jqgrid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#list-changelog-jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

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
        var data = $('#list-changelog-jqgrid').jqGrid('getGridParam', 'data');
        if (data.length === 0) {
            alert("There is no data present in the grid");
            isValid = false;
        }
    }
    if (isValid) {
        window.location.href = ROOT + "TrackerSupport/GetChangeExcelData?projectId=" + projectid + "&&projectName=" + projectName;
    }

})
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

function RemarksJqgrid(data) {

    $.jgrid.gridUnload('#remarks-grid-list');
    RemarksJqgridColModel = [
        {
            name: 'Remarks',
            label: 'Remarks',
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

        $("#remarks-grid-list").jqGrid({
            url: '',
            datatype: 'local',
            mtype: 'GET',
            data: data,
            colModel: RemarksJqgridColModel,
            loadonce: true,
            viewrecords: true,
            pager: '#remarks-grid-pager',
            rowNum: 20,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#remarks-grid-list tbody tr");
                var objHeader = $("#remarks-grid-list tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
            }
        });

    $("#remarks-grid-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#remarks-grid-list').closest('.jqg-first-row-header').hide();
    $('#remarks-grid-list').closest('.ui-jqgrid-bdiv').css({ 'max-height': '22vh' });
    $('#remarks-grid-list').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#remarks-grid-list').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#remarks-grid-list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#remarks-grid-list').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#remarks-grid-list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#remarks-grid-list').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}
function ShowRemarksPopup(ChangeId) {

    var filteredArray = remarksArray.filter(item => item.ChangeId == ChangeId);
    RemarksJqgrid(filteredArray);
    $("#remarks-modalforlist").modal('show');

}


//-----------------------------Change log add & edit code

// hub, closed date, due date, impact area and agreed/rejected date
$(document).on('change', '#selected-hub, #edited-selected-hub, #selected-impact-area, #edited-selected-impact-area, #action-due-date, [data-action-due-date], #action-closed-date, [data-action-closed-date],#app-rej-date,#edited-app-rej-date', function () {
    $(this).siblings('span').addClass('hide');
});

// change description, action plan, closed remarks
$(document).on('change', '#change-details, #edited-change-details,#impact-description,#edited-impact-description, #action-plan, [data-action-plan],#action-closed-remark, [data-action-closed-remark]', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span').addClass('hide');
    }
});

// change Proposed date
$(document).on('change', '#proposed-date, #edited-proposed-date', function () {
    $(this).siblings('span').addClass('hide');
    if ($(this).is('#edited-proposed-date')) {
        setStartDate(2);
    }
    else {
        setStartDate(0);
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
    }
    else {
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

// CR status dropdown
$(document).on('change', '#selected-cr-status, #edited-selected-cr-status', function () {
    if ($(this).is('#selected-cr-status')) {
        if ($(this).val() == rejectedCRStatusId) {
            $(".cr-add-mand").removeClass('hide');
        } else {
            $(".cr-add-mand").addClass('hide');
            $("#app-rej-date").siblings('span').addClass('hide');
            $("#app-rej-by").siblings('span:first').addClass('hide');
        }
    }
    else {
        if ($(this).val() == rejectedCRStatusId) {
            $(".cr-edit-mand").removeClass('hide');
        } else {
            $(".cr-edit-mand").addClass('hide');
            $("#edited-app-rej-date").siblings('span').addClass('hide');
            $("#edited-app-rej-by").siblings('span:first').addClass('hide');
        }
    }
});

function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function initializeAutocompleteDatepicker(Action = 0) {

    // Action 0 ---> For List Page Approved/Rejected Date
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

    $("[data-assigned-to-ss]")
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
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
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
                var selectedTerm = ui.item.value;
                if (selectedTerm != "" || selectedTerm != null || selectedTerm != undefined) {
                    selectedResourcesId = 1;
                    this.value = selectedTerm;
                }
                return false;
            },
            close: function (event, ui) {

                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (selectedResourcesId === 0) {
                        $(event.target).val('');
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
                        this.value = validResources[0];
                    }
                    else {
                        this.value = '';
                        $(event.target).siblings('.not-valid-user').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                }
            }
        });

    var datepickerOptions = {
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        changeMonth: true
    };

    if (Action == 1) {
        addChangeFoundDate = $("#proposed-date").val();
    }

    if (Action == 1 && addChangeFoundDate !== "") {
        datepickerOptions.minDate = addChangeFoundDate;
    }

    if (Action == 2 && editChangeFoundDate !== "") {
        datepickerOptions.minDate = editChangeFoundDate;
    }

    $('[due-date]').datepicker('destroy');
    $('[closed-date]').datepicker('destroy');
    $('[app-rej-date]').datepicker('destroy');

    $('[due-date]').datepicker(datepickerOptions);
    $('[closed-date]').datepicker(datepickerOptions);
    $('[app-rej-date]').datepicker(datepickerOptions);

}
function setStartDate(Action) {

    // Action 0 -----> List Approved or Rejected datepicker
    // Action 2 -----> Edit Change

    if (Action == 2) {
        var foundDate = $("#edited-proposed-date").val();
        handelConfirmChangeDatePopup('On changing "Proposed Date" will result in the removal of Due Date and End Date having date before the Proposed Date. Do you wish to continue ?',
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
                $('#edited-proposed-date').val($('[data-previousvalue]').attr('data-previousvalue'));
            },
        );
    }
    else {
        var foundDate = $("#proposed-date").val();
        $('[app-rej-date]').datepicker('option', 'minDate', foundDate);
    }

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
            var elementid = $("#proposed-date");
            if (Action == 2) {
                elementid = $("#edited-proposed-date");
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

function AlertRedirectToPMUMapping(response, action) {

    var hubId = response.Item3;
    var hubName = response.Item4;

    handelConfirmPopup1(
        "The scope has changed. Do you want to redirect to the PMU Mapping page to create a new project plan?",
        function () {
            window.location.href = ROOT + "TrackerSupport/RedirectToPMUMappingOnScopeChange?hubId=" + hubId + "&&hubName=" + hubName;
        },
        function () {
            EmptyValuesAlterMsgReloadGrid(action, response)
        }
    )

}

function EmptyValuesAlterMsgReloadGrid(action, response) {

    // action -- 1 -- save
    // action -- 2 -- edit

    if (action == 1) {
        $("#selected-hub").val('').multiselect("refresh");;
        $("#change-details").val('');
        $("#proposed-date").val('');
        $("#proposed-by").val('');
        $("#selected-impact-area").val('').multiselect("refresh");;
        $("#impact-description").val('');
        $("#selected-cr-status").val('');
        $("#app-rej-date").val('');
        $("#app-rej-by").val('');
    }

    workingChangeId = '';
    headers = [];
    details = [];
    addActionArray = [];
    $(".cr-add-mand").addClass('hide');
    getData();

    $("#editChangePopup").modal("hide");
    $("#response-message").text(response.Item1);
    $("#response-message-div").removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });

}
function AlertOnSavedPMUMappingExists(impactArea, selectedCR, hub) {

    var isValidSave;
    var alertHub = [];

    hubProjectData
        .filter(a => a.HubSaved == "1")
        .forEach(item => {
            if (hub?.includes(item.HubId)) {
                alertHub.push({
                    HubName: item.HubName,
                    RefNo: item.RefNo
                });
            }
        });

    if (
        impactArea?.includes(scopeId.toString()) &&
        impactArea?.includes(timeLineId.toString()) &&
        selectedCR == agreedCRStatusId &&
        alertHub.length > 0
    ) {
        let tableHTML = `
                <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
                    <thead>
                        <tr>
                            <th style="padding: 8px; background-color: #f2f2f2;border:1px solid;">Hub Name</th>
                            <th style="padding: 8px; background-color: #f2f2f2;border:1px solid;">Change Log No / Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${alertHub.map(item => `
                            <tr>
                                <td style="padding: 8px;border:1px solid;">${item.HubName}</td>
                                <td style="padding: 8px;border:1px solid;">${item.RefNo}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `;

        alert(
            `For these hubs, PMU mapping is saved but not yet approved. So you can modify that.<br><br>
                HUB's and their reference change log No (or) remarks for which PMU Mapping is saved is mentioned below<br><br>
                ${tableHTML}`
        );

        isValidSave = false;
    }
    else {
        isValidSave = true;
    }
    return isValidSave;

}
function GetScopeChangeIssueAlterMsg(alertHub) {

    //if (alertHub.length == 0) {
    //    alert(`
    //        1. Since CR Status is not agreed (or) <br>
    //        2. Scope or Timeline in impacted area is unchecked <br><br>
    //        Please contact admin to delete the current scope changed pmu mapping plan to save the change`
    //    );
    //}
    //else {
    //    let msg = `
    //                <strong>
    //                    ${alertHub.map(item => item.HubName).join(", ")}
    //                </strong>
    //            `;

    //    alert(`
    //        1. Since CR Status is not agreed (or)<br>
    //        2. Scope or Timeline in impacted area is unchecked (or)<br>
    //        3. The ${msg} HUB's are unchecked for which already scope change PMU Mapping has been saved <br><br>
    //        Please contact admin to delete the current scope changed pmu mapping plan to save the change`
    //    );
    //}

    alert(`For the selected project already Scope Baseline is created. Please contact Admin to delete the Scope Baseline to update the CR Status/ Impact Area values/ HUB values`);

}

//--------------------Add Change--------------------
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
                <i class="fas fa-calendar"></i>
                <span class="text-danger hide">Please select due date</span>
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
                <i class="fas fa-calendar"></i>
                <span class="text-danger hide">Please select closed on date</span>
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
$(document).on('click', '#save-change', function () {

    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== "undefined" && $('#ProjectId').val() !== '0') {

        var isValidSave = true;

        var hub = $("#selected-hub").val().toString();
        var changeDesc = $("#change-details").val().trim();
        var proposedDate = $("#proposed-date").val();
        proposedDate = proposedDate != "" ? moment(proposedDate, "DD/MM/YYYY").format("YYYY-MM-DD") : proposedDate;
        var proposedBy = $("#proposed-by").val().trim();
        var impactArea = $("#selected-impact-area").val().toString();
        var impactedDesc = $("#impact-description").val().trim();
        var selectedCR = $("#selected-cr-status").val();
        var apprejDate = $("#app-rej-date").val();
        apprejDate = apprejDate != "" ? moment(apprejDate, "DD/MM/YYYY").format("YYYY-MM-DD") : apprejDate;
        var apprejBy = $("#app-rej-by").val().trim();

        (hub !== "" && hub !== undefined && hub !== null) ?
            $("#selected-hub").siblings('span').addClass('hide') :
            ($("#selected-hub").siblings('span').removeClass('hide'), isValidSave = false);

        (changeDesc !== "" && changeDesc !== undefined && changeDesc !== null) ?
            $("#change-details").siblings('span').addClass('hide') :
            ($("#change-details").siblings('span').removeClass('hide'), isValidSave = false);

        (proposedDate !== "" && proposedDate !== undefined && proposedDate !== null) ?
            $("#proposed-date").siblings('span').addClass('hide') :
            ($("#proposed-date").siblings('span').removeClass('hide'), isValidSave = false);

        (proposedBy !== "" && proposedBy !== undefined && proposedBy !== null) ?
            $("#proposed-by").siblings('span:first').addClass('hide') :
            ($("#proposed-by").siblings('span:first').removeClass('hide'), isValidSave = false);

        (impactArea !== "" && impactArea !== undefined && impactArea !== null) ?
            $("#selected-impact-area").siblings('span').addClass('hide') :
            ($("#selected-impact-area").siblings('span').removeClass('hide'), isValidSave = false);

        (impactedDesc !== "" && impactedDesc !== undefined && impactedDesc !== null) ?
            $("#impact-description").siblings('span').addClass('hide') :
            ($("#impact-description").siblings('span').removeClass('hide'), isValidSave = false);

        if (selectedCR == rejectedCRStatusId) {

            (apprejDate !== "" && apprejDate !== undefined && apprejDate !== null) ?
                $("#app-rej-date").siblings('span').addClass('hide') :
                ($("#app-rej-date").siblings('span').removeClass('hide'), isValidSave = false);

            (apprejBy !== "" && apprejBy !== undefined && apprejBy !== null) ?
                $("#app-rej-by").siblings('span:first').addClass('hide') :
                ($("#app-rej-by").siblings('span:first').removeClass('hide'), isValidSave = false);

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
            $("#open-action-popup").siblings('span').removeClass('hide');
            isValidSave = false;
        }
        else {
            $("#open-action-popup").siblings('span').addClass('hide');
        }

        var flag = AlertOnSavedPMUMappingExists(impactArea, selectedCR, hub);

        if (flag == false) {
            isValidSave = false;
        }

        if (isValidSave) {

            handelConfirmRemarksPopup($("#selected-cr-status option:selected").text(),
                function () {

                    var remarks = $("#change-remarks").val().trim();
                    if (selectedCR != "" && selectedCR != agreedCRStatusId) {
                        if (remarks != "" && remarks != null && remarks != undefined) {
                            $("#change-remarks").siblings('span').addClass('hide');
                        }
                        else {
                            $("#change-remarks").siblings('span').removeClass('hide');
                            return false;
                        }
                    }

                    $("#save-with-remarks-popup").modal("hide");
                    var formData = new FormData();

                    headers = [];
                    details = [];

                    headers.push({
                        hubId: hub,
                        changeDescription: changeDesc,
                        proposedDate: proposedDate,
                        proposedBy: proposedBy,
                        impactAreaId: impactArea,
                        impactedDesc: impactedDesc,
                        selectedCR: selectedCR,
                        apprejDate: apprejDate,
                        apprejBy: apprejBy,
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

                    formData.append("Headers", JSON.stringify(headers));
                    formData.append("Details", JSON.stringify(details));
                    formData.append("IsInsert", addActionArray.length == 0 ? 2 : 1);
                    formData.append("ChangeId", 0);
                    formData.append("ProjectId", $('#ProjectId').val());
                    formData.append("Remarks", remarks);

                    $.ajax({
                        url: ROOT + 'TrackerSupport/InsertUpdateChange',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (response != "" && response != null && response != undefined && response.Item1.toLowerCase().includes("success")) {
                                if (response.Item2 == 0) {
                                    EmptyValuesAlterMsgReloadGrid(1, response);
                                }
                                else {
                                    AlertRedirectToPMUMapping(response, 1);
                                }
                            }
                            else {
                                alert(response.Item1);
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

//--------------------Edit Change--------------------
function GetChangeData(changedata) {

    workingChangeId = changedata.getAttribute('data-changeid');
    isScopeUnCheckable = parseInt(changedata.getAttribute('data-isScopeUnCheckable'));

    $.ajax({
        type: "GET",
        url: ROOT + "TrackerSupport/GetParticularChangeData",
        data: {
            ChangeId: parseInt(workingChangeId)
        },
        success: function (response) {
            if (response != null && response != undefined) {
                dataBeforeEdit = response;
                editChangeFoundDate = response.Item1[0]?.ProposedDate;
                hubProjectData = response.Item3;
                ShowEditChangePopup(response.Item1, response.Item2);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
    var trElement = changedata.closest('tr');
    var textOfClassElement = $(trElement).find("td.change-no").text();
    $(".edit-change-no").text(textOfClassElement);
    $('#editChangePopup').modal("show");

}
function ShowEditChangePopup(headerdata, actiondata) {

    MultiselectHubOptions(2);

    $(".cr-add-mand").addClass('hide');

    $('#edited-selected-hub').val(((headerdata[0].Hub).trim()).split(',')).multiselect('refresh');
    $("#edited-change-details").val(headerdata[0].ChangeDesc);
    $("#edited-proposed-date").val(headerdata[0].ProposedDate);
    $('#edited-proposed-date').attr('data-previousvalue', headerdata[0].ProposedDate);
    $("#edited-proposed-by").val(headerdata[0].ProposedBy);
    $('#edited-selected-impact-area').val(((headerdata[0].ImpactArea).trim()).split(',')).multiselect('refresh');
    $("#edited-impact-description").val(headerdata[0].ImpactedDesc);
    $("#edited-selected-cr-status").val(headerdata[0].CRStatus);
    $("#edited-app-rej-date").val(headerdata[0].AgreedRejectedDate);
    $("#edited-app-rej-by").val(headerdata[0].AgreedRejectedBy);

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
                <i class="fas fa-calendar"></i>
                <span class="text-danger hide">Please select due date</span>
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
                <i class="fas fa-calendar"></i>
                <span class="text-danger hide">Please select closed on date</span>
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

    $('#edit-change-table').html(tableHtml);

    InitializeDataTable(2, actiondata.length);
    initializeAutocompleteDatepicker(2);
    ValidateAction(2);

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
                        <input type="text" class="form-control date_text_freezed" data-action-due-date readonly due-date/>
                        <i class="fas fa-calendar"></i>
                        <span class="text-danger hide">Please select due date</span>
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
                        <i class="fas fa-calendar"></i>
                        <span class="text-danger hide">Please select closed on date</span>
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
function CompareChangeEditedData() {

    var isChangeEdited = false;
    if (dataBeforeEdit.Item1.length != headers.length || dataBeforeEdit.Item2.length != details.length) {
        isChangeEdited = true;
    }
    else {
        if (details.filter(item => item.ownerUpdate != "").length != 0) {
            isChangeEdited = true;
        }

        if (isChangeEdited == false) {
            for (var i = 0; i < headers.length; i++) {
                if (
                    headers[i].hubId !== dataBeforeEdit.Item1[0].Hub ||
                    headers[i].changeDescription !== dataBeforeEdit.Item1[0].ChangeDesc ||
                    headers[i].proposedDate !== (dataBeforeEdit.Item1[0].ProposedDate != "" ?
                        moment(dataBeforeEdit.Item1[0].ProposedDate, "DD/MM/YYYY").format("YYYY-MM-DD") : dataBeforeEdit.Item1[0].ProposedDate) ||
                    headers[i].proposedBy !== dataBeforeEdit.Item1[0].ProposedBy ||
                    headers[i].impactAreaId !== dataBeforeEdit.Item1[0].ImpactArea ||
                    headers[i].impactedDesc !== dataBeforeEdit.Item1[0].ImpactedDesc ||
                    headers[i].selectedCR !== dataBeforeEdit.Item1[0].CRStatus ||
                    headers[i].apprejDate !== (dataBeforeEdit.Item1[0].AgreedRejectedDate != "" ?
                        moment(dataBeforeEdit.Item1[0].AgreedRejectedDate, "DD/MM/YYYY").format("YYYY-MM-DD") : dataBeforeEdit.Item1[0].AgreedRejectedDate) ||
                    headers[i].apprejBy !== dataBeforeEdit.Item1[0].AgreedRejectedBy
                ) {
                    isChangeEdited = true;
                    break;
                }
            }
        }

        if (isChangeEdited == false) {
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
                        isChangeEdited = true;
                        break;
                    }
                }
                else {
                    isChangeEdited = true;
                    break;
                }
            }
        }

    }
    return isChangeEdited;
}
$(document).on('click', '.close-edit-popup', function () {

    generateEditedDate(1);
    if (CompareChangeEditedData()) {

        UnsavedDataAlert("You have some unsaved Data, Please save otherwise you will lose the data",
            function () {
                $("#save-edited-change").click();
            },
            function () {
                $("#editChangePopup").modal("hide");
            },
        );
    }
    else {
        $("#editChangePopup").modal("hide");
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
$(document).on('click', '#save-edited-change', function () {

    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== "undefined" && $('#ProjectId').val() !== '0') {

        var isValidEditSave = true;

        var hub = $("#edited-selected-hub").val().toString();
        var changeDesc = $("#edited-change-details").val().trim();
        var proposedDate = $("#edited-proposed-date").val();
        proposedDate = proposedDate != "" ? moment(proposedDate, "DD/MM/YYYY").format("YYYY-MM-DD") : proposedDate;
        var proposedBy = $("#edited-proposed-by").val().trim();
        var impactArea = $("#edited-selected-impact-area").val().toString();
        var impactedDesc = $("#edited-impact-description").val().trim();
        var selectedCR = $("#edited-selected-cr-status").val();
        var apprejDate = $("#edited-app-rej-date").val();
        apprejDate = apprejDate != "" ? moment(apprejDate, "DD/MM/YYYY").format("YYYY-MM-DD") : apprejDate;
        var apprejBy = $("#edited-app-rej-by").val().trim();

        (hub !== "" && hub !== undefined && hub !== null) ?
            $("#edited-selected-hub").siblings('span').addClass('hide') :
            ($("#edited-selected-hub").siblings('span').removeClass('hide'), isValidEditSave = false);

        (changeDesc !== "" && changeDesc !== undefined && changeDesc !== null) ?
            $("#edited-change-details").siblings('span').addClass('hide') :
            ($("#edited-change-details").siblings('span').removeClass('hide'), isValidEditSave = false);

        (proposedDate !== "" && proposedDate !== undefined && proposedDate !== null) ?
            $("#edited-proposed-date").siblings('span').addClass('hide') :
            ($("#edited-proposed-date").siblings('span').removeClass('hide'), isValidEditSave = false);

        (proposedBy !== "" && proposedBy !== undefined && proposedBy !== null) ?
            $("#edited-proposed-by").siblings('span:first').addClass('hide') :
            ($("#edited-proposed-by").siblings('span:first').removeClass('hide'), isValidEditSave = false);

        (impactArea !== "" && impactArea !== undefined && impactArea !== null) ?
            $("#edited-selected-impact-area").siblings('span').addClass('hide') :
            ($("#edited-selected-impact-area").siblings('span').removeClass('hide'), isValidEditSave = false);

        (impactedDesc !== "" && impactedDesc !== undefined && impactedDesc !== null) ?
            $("#edited-impact-description").siblings('span').addClass('hide') :
            ($("#edited-impact-description").siblings('span').removeClass('hide'), isValidEditSave = false);

        if (selectedCR == rejectedCRStatusId) {

            (apprejDate !== "" && apprejDate !== undefined && apprejDate !== null) ?
                $("#edited-app-rej-date").siblings('span').addClass('hide') :
                ($("#edited-app-rej-date").siblings('span').removeClass('hide'), isValidEditSave = false);

            (apprejBy !== "" && apprejBy !== undefined && apprejBy !== null) ?
                $("#edited-app-rej-by").siblings('span:first').addClass('hide') :
                ($("#edited-app-rej-by").siblings('span:first').removeClass('hide'), isValidEditSave = false);

        }

        ValidateAction(2);

        if (invalidEditAction.length > 0) {
            isValidEditSave = false;
        }

        var alertHub = [];

        hubProjectData
            .filter(a => a.IsHubUnCheckable == 1)
            .forEach(item => {
                if (!hub?.includes(item.HubId)) {
                    alertHub.push({
                        HubName: item.HubName
                    });
                }
            });

        if (
            isScopeUnCheckable == 1 &&
            (
                !$("#edited-selected-impact-area").val()?.includes(scopeId.toString()) ||
                !$("#edited-selected-impact-area").val()?.includes(timeLineId.toString()) ||
                (selectedCR == rejectedCRStatusId || selectedCR == onHoldCRStatusId || selectedCR == "") ||
                alertHub.length > 0
            )
        ) {
            GetScopeChangeIssueAlterMsg(alertHub);
            isValidEditSave = false;
        }

        var flag = true;
        if (isScopeUnCheckable == 0) { // since on edit scope is already done then we should not consider
            flag = AlertOnSavedPMUMappingExists(impactArea, selectedCR, hub);
        }

        if (flag == false) {
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
    var changeDesc = $("#edited-change-details").val().trim();
    var proposedDate = $("#edited-proposed-date").val();
    proposedDate = proposedDate != "" ? moment(proposedDate, "DD/MM/YYYY").format("YYYY-MM-DD") : proposedDate;
    var proposedBy = $("#edited-proposed-by").val().trim();
    var impactArea = $("#edited-selected-impact-area").val().toString();
    var impactedDesc = $("#edited-impact-description").val().trim();
    var selectedCR = $("#edited-selected-cr-status").val();
    var apprejDate = $("#edited-app-rej-date").val();
    apprejDate = apprejDate != "" ? moment(apprejDate, "DD/MM/YYYY").format("YYYY-MM-DD") : apprejDate;
    var apprejBy = $("#edited-app-rej-by").val().trim();

    headers = [];
    details = [];

    headers.push({
        hubId: hub,
        changeDescription: changeDesc,
        proposedDate: proposedDate,
        proposedBy: proposedBy,
        impactAreaId: impactArea,
        impactedDesc: impactedDesc,
        selectedCR: selectedCR,
        apprejDate: apprejDate,
        apprejBy: apprejBy,
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

    if (Action == 1) {
    }
    else if (Action == 2) {
        SubmitEditedData(headers, details, selectedCR);
    }

}
function SubmitEditedData(headers, details, selectedCR) {

    if (CompareChangeEditedData()) {

        handelConfirmRemarksPopup($("#edited-selected-cr-status option:selected").text(),
            function () {

                var remarks = $("#change-remarks").val().trim();
                if (selectedCR != "" && selectedCR != agreedCRStatusId) {
                    if (remarks != "" && remarks != null && remarks != undefined) {
                        $("#change-remarks").siblings('span').addClass('hide');
                    }
                    else {
                        $("#change-remarks").siblings('span').removeClass('hide');
                        return false;
                    }
                }

                $("#save-with-remarks-popup").modal("hide");
                var formData = new FormData();

                formData.append("Headers", JSON.stringify(headers));
                formData.append("Details", JSON.stringify(details));
                formData.append("IsInsert", 3);
                formData.append("ChangeId", workingChangeId);
                formData.append("ProjectId", $('#ProjectId').val());
                formData.append("Remarks", remarks);

                $.ajax({
                    url: ROOT + 'TrackerSupport/InsertUpdateChange',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response != "" && response != null && response != undefined && response.Item1.toLowerCase().includes("success")) {
                            if (response.Item2 == 0) {
                                EmptyValuesAlterMsgReloadGrid(2, response);
                            }
                            else {
                                AlertRedirectToPMUMapping(response, 2);
                            }
                        }
                        else {
                            alert(response.Item1);
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
var gridData = [];
var oldRegion;
var udpateFromOwnerArray = [];
var role = 0;
$(document).ready(function () {

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

var risk_action = '';
function arrtSetting_Action(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (risk_action === '' || risk_action != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    risk_action = riskId;
    return result;
}

var riskId_new = '';
function arrtSetting_RiskId(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (riskId_new === '' || riskId_new != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_new = riskId;
    return result;
}

var riskId_riskdesc = '';
function arrtSetting_riskdesc(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (riskId_riskdesc === '' || riskId_riskdesc != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_riskdesc = riskId;
    return result;
}

var riskId_riskDate = '';
function arrtSetting_riskDate(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (riskId_riskDate === '' || riskId_riskDate != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_riskDate = riskId;
    return result;
}

var riskId_impactArea = '';
function arrtSetting_ImpactArea(rowId, val, rawObject) {

    var result;
    var riskId = rawObject.RiskId;
    if (riskId_impactArea === '' || riskId_impactArea != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_impactArea = riskId;
    return result;
}

var riskId_impactdesc = '';
function arrtSetting_ImpactDescription(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (riskId_impactdesc === '' || riskId_impactdesc != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_impactdesc = riskId;
    return result;
}

var riskId_impactLevel = '';
function arrtSetting_ImpactLevel(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (riskId_impactLevel === '' || riskId_impactLevel != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_impactLevel = riskId;
    return result;
}

var riskId_probabilitylevel = '';
function arrtSetting_probabilityLevel(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (riskId_probabilitylevel === '' || riskId_probabilitylevel != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_probabilitylevel = riskId;
    return result;
}

var riskId_priorityLevel = '';
function arrtSetting_priorityLevel(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    var prioritylevel = gridData[rowId - 1].PriorityLevel;
    let style = '';
    if (parseFloat(prioritylevel) >= 15 && parseFloat(prioritylevel) < 25) {
        style = 'background-color: #FFA500; color: #000000;';
    }
    else if (parseFloat(prioritylevel) >= 25) {
        style = 'background-color: #FF0000; color: #000000;'; // Red
    }
    else if (parseFloat(prioritylevel) >= 1 && parseFloat(prioritylevel) <= 5) {
        style = 'background-color: #00FF00; color: #000000;'; // Green
    }
    else if (parseFloat(prioritylevel) > 5 && parseFloat(prioritylevel) < 15) {
        style = 'background-color: #ffff00; color: #000000;'; // Yellow
    }
    if (riskId_priorityLevel === '' || riskId_priorityLevel != riskId) {
        var riskDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(riskDataFilter);
        result = ' style="' + style + '" rowspan="' + count + '"';

    }
    else {
        result = ' style="display:none"';
    }
    riskId_priorityLevel = riskId;
    return result;
}

var riskId_CreatedBy = '';
function arrtSetting_CreatedBy(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (riskId_CreatedBy === '' || riskId_CreatedBy != riskId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_CreatedBy = riskId;
    return result;
}

var riskId_CreatedOn = '';
function arrtSetting_CreatedOn(rowId, val, rawObject) {
    var result;
    var riskId = rawObject.RiskId;
    if (riskId_CreatedOn === '' || riskId_CreatedOn != riskId) {
        var issueDataFilter = gridData.filter(function (obj) { return obj.RiskId === riskId });
        var count = validateFilteredData(issueDataFilter);
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    riskId_CreatedOn = riskId;
    return result;
}

function validateFilteredData(new_data) {
    
    var grid_filtered_data = new_data;

    var colModel = $("#list-riskregister-jqgrid").jqGrid('getGridParam', 'colModel');

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
    $('#risk-desc').val('');
    $('#risk-iden-date').val('');
    $('#selected-impact-area').val('').multiselect('refresh');
    $('#impact-description').val('').trigger('change');
    $('#selected-impact-level').val('');
    $('#selected-probability-level').val('');
    $('#priority-level').val('');
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
        url: ROOT + "TrackerSupport/GetRiskList",
        data: {
            projectId: projectid
        },
        success: function (result) {

            gridData = result.Item1;
            udpateFromOwnerArray = result.Item2;
            applyRowspan();
            createJQGrid(gridData);
        }
    });

}
function DeleteRisk(riskdata) {

    var riskId = riskdata.getAttribute('data-riskid');
    var projectId = $("#ProjectId").val();

    handelConfirmPopup('Are you sure do you want to Delete ?',
        function () {
            $.ajax({
                type: "POST",
                url: ROOT + "TrackerSupport/DeleteRisk",
                data: { ProjectId: projectId, RiskId: riskId },
                success: function (result) {
                    if (result.Message.includes('Successfully')) {
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

    risk_action = ''
    riskId_new = ''
    riskId_riskdesc = ''
    riskId_riskDate = ''
    riskId_impactArea = ''
    riskId_impactdesc = ''
    riskId_impactLevel = ''
    riskId_probabilitylevel = ''
    riskId_priorityLevel = '';
    riskId_CreatedBy = '';
    riskId_CreatedOn = '';

}
function createJQGrid(data) {

    $.jgrid.gridUnload('#list-riskregister-jqgrid');
    $("#list-riskregister-jqgrid").jqGrid({
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
                    if (!rowobject.ActionItem && (rowobject.ActionPlan == null || rowobject.ActionPlan == '')) {
                        deleteIcon = '<a href="#" title="Delete" id="deletebtn" onclick="DeleteRisk(this)" data-riskid="' + rowobject.RiskId + '"><i class="fas fa-trash text-danger"></i></a>';
                    }

                    return '<div class="d-flex align-items-center justify-content-evenly">' +
                        '<span class="editRow" title="Edit"><i class="fas fa-pen text-primary" onclick="GetRiskData(this)" data-RiskId="' + rowobject.RiskId + '" style="cursor:pointer;"></i></span>' +
                        deleteIcon +
                        '</div>';
                }
            },
            {
                label: 'RiskId',
                name: 'RiskId',
                width: 10,
                hidden: true
            },
            {
                label: 'Risk No',
                name: 'RiskNo',
                width: 100,
                cellattr: arrtSetting_RiskId,
                classes: 'risk-no'
            },
            {
                label: 'Risk Description',
                name: 'RiskDescription',
                width: 300,
                cellattr: arrtSetting_riskdesc,
            },
            {
                label: 'Risk Identification Date',
                name: 'RiskIdentificationDate',
                width: 85,
                cellattr: arrtSetting_riskDate,
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
                width: 300,
                cellattr: arrtSetting_ImpactDescription,
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
                label: 'Impact Level',
                name: 'ImpactLevel',
                width: 70,
                align:'center',
                cellattr: arrtSetting_ImpactLevel
            },
            {
                label: 'Probability Level',
                name: 'ProbabilityLevel',
                width: 70,
                align: 'center',
                cellattr: arrtSetting_probabilityLevel
            },
            {
                label: 'Priority Level',
                name: 'PriorityLevel',
                width: 70,
                align: 'center',
                cellattr: arrtSetting_priorityLevel,
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
                name: 'OwnerUpdate',
                search: false,
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
        pager: '#RiskRegister_pager',
        rowNum: data.length,
        hoverrows: false,
        scroll: 1,
        beforeSelectRow: function () {
            return false;
        },
        gridComplete: function () {
            if (role == 4 || role == 3 || role == 6) {
                $("#list-riskregister-jqgrid").jqGrid('hideCol', "Action");
            }
            var pagercount = $('#list-riskregister-jqgrid').find('tr').find('td.risk-no:visible').length;
            if (pagercount == 0) {
                $("#RiskRegister_pager").find('.ui-paging-info').text("No Recors To View"); 
            }
            else {
                $("#RiskRegister_pager").find('.ui-paging-info').text("View 1 - " + pagercount + " of " + pagercount); 
            }
            applyRowspan();
        }
    });
    jQuery("#list-riskregister-jqgrid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            { startColumnName: 'Action', numberOfColumns: 9, titleText: 'Risk Identification & Classification' },
            { startColumnName: 'ImpactLevel', numberOfColumns: 3, titleText: 'Risk Assessment' },
            { startColumnName: 'ActionPlan', numberOfColumns: 3, titleText: 'Risk Response Plan' },
            { startColumnName: 'Priority', numberOfColumns: 4, titleText: 'Monitoring & Control' },
        ]
    });

    if (role == 4 || role == 3 || role == 6) {
        $('#list-riskregister-jqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    }
    else {
        $('#list-riskregister-jqgrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-350px + 100vh)' });
    }
    $('#list-riskregister-jqgrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#list-riskregister-jqgrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#list-riskregister-jqgrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#list-riskregister-jqgrid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#list-riskregister-jqgrid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#list-riskregister-jqgrid").jqGrid('filterToolbar', {
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
        var data = $('#list-riskregister-jqgrid').jqGrid('getGridParam', 'data');
        if (data.length === 0) {
            alert("There is no data present in the grid");
            isValid = false;
        }
    }
    if (isValid) {
        window.location.href = ROOT + "TrackerSupport/GetRiskExcelData?projectId=" + projectid + "&&projectName=" + projectName;
    }

});
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

//------- Risk Register Add & Edit common code ----------

var allDropDownList = [];
var statusList = [];
var priorityList = [];
var impactAreaList = [];
var impactLevelList = [];
var probabilityLevelList = [];

var closedStatusId = "";

var selectedResourcesId = 0;
var assignedToList = [];

var addActionArray = [];
var invalidAddAction = [];

var workingRiskId = '';
var dataBeforeEdit = [];
var editedHeaderData = [];
var editedActionData = [];
var invalidEditAction = [];

var headers = [];
var details = [];

var addRiskFoundDate = "";
var editRiskFoundDate = "";


if ($("#AllDropDownList").val() != null && $("#AllDropDownList").val() != undefined && $("#AllDropDownList").val() != "") {
    allDropDownList = JSON.parse($("#AllDropDownList").val());
}

if (allDropDownList.length > 0) {
    statusList = allDropDownList.filter(item => item.Type.toLowerCase() == "issuestatus");
    closedStatusId = statusList.filter(item => item.Text.toLowerCase() === "closed")[0].Value.toString();
    priorityList = allDropDownList.filter(item => item.Type.toLowerCase() == "priority");
    impactAreaList = allDropDownList.filter(item => item.Type.toLowerCase() == "impactassesment");
    impactLevelList = allDropDownList.filter(item => item.Type.toLowerCase() == "impactlevel");
    probabilityLevelList = allDropDownList.filter(item => item.Type.toLowerCase() == "probabilitylevel");
}

if ($("#AssignedtoList").val() != null && $("#AssignedtoList").val() != undefined && $("#AssignedtoList").val() != "") {
    assignedToList = JSON.parse($("#AssignedtoList").val());
}

// closed date, due date
$(document).on('change', '#action-due-date, [data-action-due-date], #action-closed-date, [data-action-closed-date],#selected-impact-area, #edited-selected-impact-area', function () {
    $(this).siblings('span').addClass('hide');
});

// change description, action plan, closed remarks
$(document).on('change', '#risk-desc, #edited-risk-desc,#impact-description,#edited-impact-description, #action-plan, [data-action-plan],#action-closed-remark, [data-action-closed-remark]', function () {
    if ($(this).val().trim() != "") {
        $(this).siblings('span').addClass('hide');
    }
});

// change Proposed date
$(document).on('change', '#risk-iden-date, #edited-risk-iden-date', function () {
    $(this).siblings('span').addClass('hide');
    if ($(this).is('#edited-risk-iden-date')) {
        setStartDate();
    }
});

// change impact and probability level
$(document).on('change', '#selected-impact-level, #edited-selected-impact-level,#selected-probability-level, #edited-selected-probability-level', function () {

    var flag = true;
    $(this).siblings('span').addClass('hide');

    if ($(this).is('#selected-impact-level') || $(this).is('#selected-probability-level')) {
        if ($('#selected-impact-level').val() == "") {
            $('#selected-impact-level').siblings('span').removeClass('hide');
            flag = false;
        }

        if ($('#selected-probability-level').val() == "") {
            $('#selected-probability-level').siblings('span').removeClass('hide');
            flag = false
        }

        if (flag) {
            CalcPriorityLevel(1, parseInt($('#selected-impact-level option:selected').text()), parseInt($('#selected-probability-level option:selected').text()));
        }
        else {
            $("#priority-level").val('');
        }
    }
    else if ($(this).is('#edited-selected-impact-level') || $(this).is('#edited-selected-probability-level')) {
        if ($('#edited-selected-impact-level').val() == "") {
            $('#edited-selected-impact-level').siblings('span').removeClass('hide');
            flag = false
        }

        if ($('#edited-selected-probability-level').val() == "") {
            $('#edited-selected-probability-level').siblings('span').removeClass('hide');
            flag = false
        }

        if (flag) {
            CalcPriorityLevel(2, parseInt($('#edited-selected-impact-level option:selected').text()), parseInt($('#edited-selected-probability-level option:selected').text()));
        }
        else {
            $("#edited-priority-level").val('');
        }
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

    var datepickerOptions = {
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        changeMonth: true
    };

    if (Action == 1) {
        addRiskFoundDate = $("#risk-iden-date").val();
    }

    if (Action == 1 && addRiskFoundDate !== "") {
        datepickerOptions.minDate = addRiskFoundDate;
    }

    if (Action == 2 && editRiskFoundDate !== "") {
        datepickerOptions.minDate = editRiskFoundDate;
    }

    $('[due-date]').datepicker('destroy');
    $('[closed-date]').datepicker('destroy');

    $('[due-date]').datepicker(datepickerOptions);
    $('[closed-date]').datepicker(datepickerOptions);

}
function setStartDate() {

    var foundDate = $("#edited-risk-iden-date").val();
    handelConfirmChangeDatePopup('On changing "Risk Identification Date" will result in the removal of Due Date and End Date having date before the Risk Identification Date. Do you wish to continue ?',
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
            $('#edited-risk-iden-date').val($('[data-previousvalue]').attr('data-previousvalue'));
        },
    );

}

function CalcPriorityLevel(Action, impactlevel, probabilitylevel) {
    if (Action == 1) {
        $("#priority-level").val(impactlevel * probabilitylevel);
        $("#priority-level").siblings('span').addClass('hide');
    }
    else if (Action == 2) {
        $("#edited-priority-level").val(impactlevel * probabilitylevel);
        $("#edited-priority-level").siblings('span').addClass('hide');
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
            var elementid = $("#risk-iden-date");
            if (Action == 2) {
                elementid = $("#edited-risk-iden-date");
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

//--------------------Add Risk--------------------
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
$(document).on('click', '#save-risk', function () {

    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== "undefined" && $('#ProjectId').val() !== '0') {

        var isValidSave = true;

        var riskDesc = $("#risk-desc").val().trim();
        var RiskIdentificationDate = $("#risk-iden-date").val();
        RiskIdentificationDate = RiskIdentificationDate != "" ? moment(RiskIdentificationDate, "DD/MM/YYYY").format("YYYY-MM-DD") : RiskIdentificationDate;
        var impactArea = $("#selected-impact-area").val().toString();
        var impactedDesc = $("#impact-description").val().trim();
        var impactLevel = $("#selected-impact-level").val();
        var probabilityLevel = $("#selected-probability-level").val();
        var priorityLevel = $("#priority-level").val().trim();


        (riskDesc !== "" && riskDesc !== undefined && riskDesc !== null) ?
            $("#risk-desc").siblings('span').addClass('hide') :
            ($("#risk-desc").siblings('span').removeClass('hide'), isValidSave = false);

        (RiskIdentificationDate !== "" && RiskIdentificationDate !== undefined && RiskIdentificationDate !== null) ?
            $("#risk-iden-date").siblings('span').addClass('hide') :
            ($("#risk-iden-date").siblings('span').removeClass('hide'), isValidSave = false);

        (impactArea !== "" && impactArea !== undefined && impactArea !== null) ?
            $("#selected-impact-area").siblings('span').addClass('hide') :
            ($("#selected-impact-area").siblings('span').removeClass('hide'), isValidSave = false);

        (impactedDesc !== "" && impactedDesc !== undefined && impactedDesc !== null) ?
            $("#impact-description").siblings('span').addClass('hide') :
            ($("#impact-description").siblings('span').removeClass('hide'), isValidSave = false);

        (impactLevel !== "" && impactLevel !== undefined && impactLevel !== null) ?
            $("#selected-impact-level").siblings('span').addClass('hide') :
            ($("#selected-impact-level").siblings('span').removeClass('hide'), isValidSave = false);

        (probabilityLevel !== "" && probabilityLevel !== undefined && probabilityLevel !== null) ?
            $("#selected-probability-level").siblings('span').addClass('hide') :
            ($("#selected-probability-level").siblings('span').removeClass('hide'), isValidSave = false);

        (priorityLevel !== "" && priorityLevel !== undefined && priorityLevel !== null) ?
            $("#priority-level").siblings('span').addClass('hide') :
            ($("#priority-level").siblings('span').removeClass('hide'), isValidSave = false);

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

        if (isValidSave) {
            handelConfirmPopup('Are you sure do you want to Save ?',
                function () {
                    var formData = new FormData();

                    headers = [];
                    details = [];

                    headers.push({
                        riskDescription: riskDesc,
                        riskIdentificationDate: RiskIdentificationDate,
                        impactAreaId: impactArea,
                        impactedDesc: impactedDesc,
                        impactLevel: impactLevel,
                        probabilityLevel: probabilityLevel,
                        priorityLevel: priorityLevel
                    });

                    var temp = addActionArray;

                    details = temp;

                    details.forEach(function (item) {
                        item.dueDate = moment(item.dueDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                        item.closedDate = item.closedDate != "" ? moment(item.closedDate, "DD/MM/YYYY").format("YYYY-MM-DD") : item.closedDate;
                    });

                    formData.append("Headers", JSON.stringify(headers));
                    formData.append("Details", JSON.stringify(details));
                    formData.append("IsInsert", addActionArray.length == 0 ? 2 : 1);
                    formData.append("RiskId", 0);
                    formData.append("ProjectId", $('#ProjectId').val());

                    $.ajax({
                        url: ROOT + 'TrackerSupport/InsertUpdateRisk',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (response != "" && response != null && response != undefined && response != "" && response.toLowerCase().includes("success")) {
                                workingRiskId = '';
                                headers = [];
                                details = [];
                                addActionArray = [];
                                hubProjectData = [];
                                getData();
                                $("#risk-desc").val('');
                                $("#risk-iden-date").val('');
                                $("#selected-impact-area").val('').multiselect("refresh");;
                                $("#impact-description").val('');
                                $("#selected-impact-level").val('');
                                $("#selected-probability-level").val('');
                                $("#priority-level").val('');

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

//--------------------Edit Risk--------------------
function GetRiskData(Riskdata) {

    workingRiskId = Riskdata.getAttribute('data-riskid');
    $.ajax({
        type: "GET",
        url: ROOT + "TrackerSupport/GetParticularRiskData",
        data: {
            RiskId: parseInt(workingRiskId)
        },
        success: function (response) {
            if (response != null && response != undefined) {
                dataBeforeEdit = response;
                editRiskFoundDate = response.Item1[0]?.RiskIdentificationDate;
                ShowEditRiskPopup(response.Item1, response.Item2);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
    var trElement = Riskdata.closest('tr');
    var textOfClassElement = $(trElement).find("td.risk-no").text();
    $(".edit-risk-no").text(textOfClassElement);
    $('#editRiskPopup').modal("show");

}
function ShowEditRiskPopup(headerdata, actiondata) {

    $("#edited-risk-desc").val(headerdata[0].RiskDesc);
    $("#edited-risk-iden-date").val(headerdata[0].RiskIdentificationDate);
    $('#edited-risk-iden-date').attr('data-previousvalue', headerdata[0].RiskIndentificationDate);
    $('#edited-selected-impact-area').val(((headerdata[0].ImpactArea).trim()).split(',')).multiselect('refresh');
    $("#edited-impact-description").val(headerdata[0].ImpactedDesc);
    headerdata[0].ImpactLevel != 0 ? $("#edited-selected-impact-level").val(headerdata[0].ImpactLevel) : "";
    headerdata[0].ProbabilityLevel != 0 ? $("#edited-selected-probability-level").val(headerdata[0].ProbabilityLevel) : "";
    headerdata[0].PriorityLevel != 0 ? $("#edited-priority-level").val(headerdata[0].PriorityLevel) : "";

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

    $('#edit-risk-table').html(tableHtml);

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
                        <input type="text" class="form-control date_text_freezed"  data-action-due-date readonly due-date/>
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
function CompareRiskEditedData() {

    var isRiskEdited = false;
    if (dataBeforeEdit.Item1.length != headers.length || dataBeforeEdit.Item2.length != details.length) {
        isRiskEdited = true;
    }
    else {
        if (details.filter(item => item.ownerUpdate != "").length != 0) {
            isRiskEdited = true;
        }

        if (isRiskEdited == false) {
            for (var i = 0; i < headers.length; i++) {
                if (
                    headers[i].riskDescription !== dataBeforeEdit.Item1[0].RiskDesc ||
                    headers[i].riskIdentificationDate !== (dataBeforeEdit.Item1[0].RiskIdentificationDate != "" ?
                        moment(dataBeforeEdit.Item1[0].RiskIdentificationDate, "DD/MM/YYYY").format("YYYY-MM-DD") : dataBeforeEdit.Item1[0].RiskIdentificationDate) ||
                    headers[i].impactAreaId !== dataBeforeEdit.Item1[0].ImpactArea ||
                    headers[i].impactedDesc !== dataBeforeEdit.Item1[0].ImpactedDesc ||
                    headers[i].impactLevel !== dataBeforeEdit.Item1[0].ImpactLevel ||
                    headers[i].probabilitylevel !== dataBeforeEdit.Item1[0].Probabilitylevel ||
                    headers[i].priorityLevel !== dataBeforeEdit.Item1[0].PriorityLevel
                ) {
                    isRiskEdited = true;
                    break;
                }
            }
        }

        if (isRiskEdited == false) {
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
                        isRiskEdited = true;
                        break;
                    }
                }
                else {
                    isRiskEdited = true;
                    break;
                }
            }
        }

    }
    return isRiskEdited;
}
$(document).on('click', '.close-edit-popup', function () {

    generateEditedDate(1);
    if (CompareRiskEditedData()) {

        UnsavedDataAlert("You have some unsaved Data, Please save otherwise you will lose the data",
            function () {
                $("#save-edited-risk").click();
            },
            function () {
                $("#editRiskPopup").modal("hide");
            },
        );

    }
    else {
        $("#editRiskPopup").modal("hide");
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
$(document).on('click', '#save-edited-risk', function () {

    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== "undefined" && $('#ProjectId').val() !== '0') {

        var isValidEditSave = true;

        var riskDesc = $("#edited-risk-desc").val().trim();
        var RiskIdentificationDate = $("#edited-risk-iden-date").val();
        RiskIdentificationDate = RiskIdentificationDate != "" ? moment(RiskIdentificationDate, "DD/MM/YYYY").format("YYYY-MM-DD") : RiskIdentificationDate;
        var impactArea = $("#edited-selected-impact-area").val().toString();
        var impactedDesc = $("#edited-impact-description").val().trim();
        var impactLevel = $("#edited-selected-impact-level").val();
        var probabilityLevel = $("#edited-selected-probability-level").val();
        var priorityLevel = $("#edited-priority-level").val().trim();

        (riskDesc !== "" && riskDesc !== undefined && riskDesc !== null) ?
            $("#edited-risk-desc").siblings('span').addClass('hide') :
            ($("#edited-risk-desc").siblings('span').removeClass('hide'), isValidEditSave = false);

        (RiskIdentificationDate !== "" && RiskIdentificationDate !== undefined && RiskIdentificationDate !== null) ?
            $("#edited-risk-iden-date").siblings('span').addClass('hide') :
            ($("#edited-risk-iden-date").siblings('span').removeClass('hide'), isValidEditSave = false);

        (impactArea !== "" && impactArea !== undefined && impactArea !== null) ?
            $("#edited-selected-impact-area").siblings('span').addClass('hide') :
            ($("#edited-selected-impact-area").siblings('span').removeClass('hide'), isValidEditSave = false);

        (impactedDesc !== "" && impactedDesc !== undefined && impactedDesc !== null) ?
            $("#edited-impact-description").siblings('span').addClass('hide') :
            ($("#edited-impact-description").siblings('span').removeClass('hide'), isValidEditSave = false);

        (impactLevel !== "" && impactLevel !== undefined && impactLevel !== null) ?
            $("#edited-selected-impact-level").siblings('span').addClass('hide') :
            ($("#edited-selected-impact-level").siblings('span').removeClass('hide'), isValidEditSave = false);

        (probabilityLevel !== "" && probabilityLevel !== undefined && probabilityLevel !== null) ?
            $("#edited-selected-probability-level").siblings('span').addClass('hide') :
            ($("#edited-selected-probability-level").siblings('span').removeClass('hide'), isValidEditSave = false);

        (priorityLevel !== "" && priorityLevel !== undefined && priorityLevel !== null) ?
            $("#edited-priority-level").siblings('span').addClass('hide') :
            ($("#edited-priority-level").siblings('span').removeClass('hide'), isValidEditSave = false);

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

    var riskDesc = $("#edited-risk-desc").val().trim();
    var RiskIdentificationDate = $("#edited-risk-iden-date").val();
    RiskIdentificationDate = RiskIdentificationDate != "" ? moment(RiskIdentificationDate, "DD/MM/YYYY").format("YYYY-MM-DD") : RiskIdentificationDate;
    var impactArea = $("#edited-selected-impact-area").val().toString();
    var impactedDesc = $("#edited-impact-description").val().trim();
    var impactLevel = $("#edited-selected-impact-level").val();
    var probabilityLevel = $("#edited-selected-probability-level").val();
    var priorityLevel = $("#edited-priority-level").val().trim();

    headers = [];
    details = [];

    headers.push({
        riskDescription: riskDesc,
        riskIdentificationDate: RiskIdentificationDate,
        impactAreaId: impactArea,
        impactedDesc: impactedDesc,
        impactLevel: impactLevel,
        probabilityLevel: probabilityLevel,
        priorityLevel: priorityLevel
    });

    $('#edit-action-data-table').dataTable().$('tr').each(function (i, obj) {
        details.push({
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
        SubmitEditedData(headers, details);
    }

}
function SubmitEditedData(headers, details) {

    if (CompareRiskEditedData()) {
        handelConfirmPopup('Are you sure do you want to Save ?',
            function () {

                var formData = new FormData();

                formData.append("Headers", JSON.stringify(headers));
                formData.append("Details", JSON.stringify(details));
                formData.append("IsInsert", 3);
                formData.append("RiskId", workingRiskId);
                formData.append("ProjectId", $('#ProjectId').val());

                $.ajax({
                    url: ROOT + 'TrackerSupport/InsertUpdateRisk',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response != "" && response != null && response != undefined && response.toLowerCase().includes("success")) {
                            workingRiskId = '';
                            headers = [];
                            details = [];
                            addActionArray = [];
                            getData();
                            $("#editRiskPopup").modal("hide");
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
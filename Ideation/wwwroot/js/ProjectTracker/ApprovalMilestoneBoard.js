var roleId = "";
var jsonData = [];
var projectId = 0;
var projectName = "";
var projectCode = "";
var hubList = [];
var hubId = 0;
var hub = "";
var smallSlNoToApprove = 0;

var pendingCards = $();
var approvedCards = $();
var rejectedCards = $();
var isKPI;
var sortedOrder = "";

var approveProjectId = '';
var approveSlNo = '';
var approveStartDate = '';
var approveEndDate = '';
var approvePMUVersion = '';

$(document).ready(function () {

    roleId = $('#RoleId').val();
    jsonData = $.parseJSON($('#JsonData').val());
    hubList = JSON.parse($("#getHubList").val());

    projectName = jsonData[0].ProjectName;
    projectCode = jsonData[0].ProjectCode;
    projectId = jsonData[0].ProjectId;
    hub = jsonData[0].Hub;
    hubId = hubList.filter(item => item.HubName.toLowerCase() == hub.toLowerCase()).map(item => item.HubId)[0];

    if (jsonData != "" && jsonData != undefined && jsonData != null) {
        var projecthubname = hub + '-(' + projectCode + ')' + projectName;
        $("#projhub").text(projecthubname);
    }

    var pendingArray = jsonData.filter(item => item.Status.toLowerCase() === 'pending for approval');
    var pendingCount = pendingArray.length;
    var approvedArray = jsonData.filter(item => item.Status.toLowerCase() === 'approved');
    var approvedCount = approvedArray.length;
    var rejectedArray = jsonData.filter(item => item.Status.toLowerCase() === 'rejected');
    var rejectedCount = rejectedArray.length;

    if (pendingArray.length > 0) {
        smallSlNoToApprove = pendingArray[0].SlNo;
    }

    $(".pending-count").text(pendingCount);
    $(".approved-count").text(approvedCount);
    $(".rejected-count").text(rejectedCount);
   
    $.each(pendingArray, function (pendingIndex, obj) {
        var pIndex = obj.UserName?.lastIndexOf(' ');
        var pLastName = '';
        if (pIndex != -1) {
            pLastName = obj.UserName[pIndex + 1];
        }
        var pShortName = (obj.UserName[0] + pLastName).toUpperCase();
        isKPI = (obj.IsKPI && obj.IsKPIIncluded) ? "color-red" : "";

        var pendingCard = `
            <div class="hide_section">
                 <div class="open_list" >
                    <div>
                        <div class="list_card">
                            <div class="hub_project">
                                `+ obj.Hub + `(` + obj.ProjectCode + `)` + obj.ProjectName + `
                            </div>
                            <div class="task_list ${isKPI}">
                                ` + obj.TaskName + `
                            </div>
                            <div class="project_date">
                                <span>
                                    <i class="fa fa-calendar"></i>` + obj.StartDate + `
                                </span>
                                <span>-</span>
                                <span>
                                    <i class="fa fa-calendar"></i>` + obj.EndDate + `
                                </span>
                                <span class="extend_date"> <i class="fa fa-calendar"></i>` + obj.RequestedEndDate + `</span>
                            </div>
                            <div class="status">
                                <span class="text-info">` + obj.Status + `</span>
                            </div>
                            <div class="user_name_list">
                                <span class="user_profile">`+ pShortName + `</span><span class="">` + obj.UserName + `</span>
                            </div>
                            <div class="last_modified">
                                <p class="mb-0">
                                    Last modified on ` + obj.ModifiedDate + `
                                </p>
                            </div>
                            <div class="comments grid-icons-group -justify-center">
                                <span class="comments_icon" onclick="MileStoneRemarksHistory(${obj.SlNo})">
                                <i class="fa fa-comment" title="Remarks"></i>
                                </span>
                                 ${roleId != '3' ? `
                                     <span class="check_icon" onclick="ApproveMilestone(${obj.SlNo},'${obj.StartDate}','${obj.RequestedEndDate}','${obj.PMUVersion}')">
                                        <i class=" fas fa-check" title="Approve"></i>
                                    </span>
                                    <span class="reject_icon" onclick="RejectMilestone(${obj.ExtendedId})">
                                        <i class="fas fa-times" title="Reject"></i>
                                    </span>`
                                 : ''}
                            </div>
                        </div>
                      </div>
                     </div>
                   </div>`

        pendingCards = pendingCards.add($(pendingCard));
    });
    $.each(approvedArray, function (approvedIndex, obj) {

        var aIndex = obj.UserName?.lastIndexOf(' ');
        var aLastName = '';
        if (aIndex != -1) {
            aLastName = obj.UserName[aIndex + 1];
        }
        var aShortName = (obj.UserName[0] + aLastName).toUpperCase();

        isKPI = (obj.IsKPI && obj.IsKPIIncluded) ? "color-red" : "";

        var approvedCard = `
            <div class="hide_section">
             <div class="open_list">
              <div>
                <div class="list_card">
                    <div class="hub_project">
                        `+ obj.Hub + `(` + obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list ${isKPI}">
                          ` + obj.TaskName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>` + obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>` + obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-success">` + obj.Status + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ aShortName + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                            Last modified on ` + obj.ModifiedDate + `
                        </p>
                    </div>
                    <div class="comments grid-icons-group -justify-center">
                        <span class="comments_icon" onclick="MileStoneRemarksHistory(${obj.SlNo})">
                            <i class="fa fa-comment" title="Remarks"></i>
                        </span>
                        ${obj.Remarks?.toLowerCase().includes('auto approved') ? `
                            <span class="user_profile">AA</span>
                        ` : ''
                    }  
                    </div>
                </div>
              </div>
             </div>
            </div>`
        approvedCards = approvedCards.add($(approvedCard));
    });
    $.each(rejectedArray, function (rejectedIndex, obj) {
        var rIndex = obj.UserName?.lastIndexOf(' ');
        var rLastName = '';
        if (rIndex != -1) {
            rLastName = obj.UserName[rIndex + 1];
        }
        var rShortName = (obj.UserName[0] + rLastName).toUpperCase();

        isKPI = (obj.IsKPI && obj.IsKPIIncluded) ? "color-red" : "";

        var rejectedCard = `<div class="hide_section">
         <div class="open_list" >
            <div>
                <div class="list_card">
                    <div class="hub_project">
                        `+ obj.Hub + `(` + obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list ${isKPI}">
                        ` + obj.TaskName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>` + obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>` + obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-warning">` + obj.Status + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ rShortName + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                            Last modified on ` + obj.ModifiedDate + `
                        </p>
                    </div>
                    <div class="comments grid-icons-group -justify-center">
                        <span class="comments_icon" onclick="MileStoneRemarksHistory(${obj.SlNo})">
                            <i class="fa fa-comment" title="Remarks"></i>
                        </span>
                    </div>
                </div>
             </div>
            </div>
         </div>`
        rejectedCards = rejectedCards.add($(rejectedCard));

    });

    $('.pending-cards').html(pendingCards);
    $('.approved-cards').html(approvedCards);
    $('.rejected-cards').html(rejectedCards);

});

function ApproveMilestone(SlNo, StartDate, RequestedEndDate, PMUVersion) {

    if (smallSlNoToApprove == SlNo) {

        $("#ApprovalRemarks").val('');
        $('.Error_Approve_Remarks').hide();

        $("#ApproveRemarksNoDependency").val('');
        $('.Error_Approve_Remarks_No_Dependency').hide();

        approveProjectId = projectId;
        approveSlNo = SlNo;
        approveStartDate = StartDate;
        approveEndDate = RequestedEndDate;
        approvePMUVersion = PMUVersion;

        $.ajax({
            url: ROOT + 'ProjectTracker/PMUmappingData',
            type: 'POST',
            async: false,
            cache: false,
            dataType: 'JSON',
            data: {
                ProjectId: approveProjectId,
                Hub: hubId,
                PMUVersion: approvePMUVersion
            },
            success: function (response) {
                sortedOrder = slNoSortingArray(response.PMUMappingDetails);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });

        $.ajax({
            url: ROOT + 'ProjectTracker/DependentMilestoneList',
            type: 'POST',
            dataType: 'JSON',
            data: {
                projectId: approveProjectId,
                slNo: approveSlNo,
                startDate: moment(approveStartDate, 'DD MMM YYYY').format("DD/MM/YYYY"),
                pmuVersion: approvePMUVersion,
                endDate: moment(approveEndDate, 'DD MMM YYYY').format("DD/MM/YYYY"),
                Hub: hubId,
                SortedOrder: sortedOrder
            },
            success: function (result) {
                if (result.length > 0) {
                    $('#dependentMilestonesAlert').modal('show');
                    CreateJqGriddependent(result);
                }
                else {
                    $('#ApproveConfirmation').modal('show');
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        })

    }
    else {
        alert('Please address the extension requests of the earlier tasks');
    }
}

models = [
    {
        name: 'SlNo',
        label: 'SlNo',
        width: 60,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        sortable: false
    },
    {
        name: 'TaskDesc',
        resizable: true,
        width: 100,
        label: 'Task',
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'Duration',
        label: 'Duration',
        width: 60,
        hidden: true,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'StartDate',
        label: 'Start Date',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'EndDate',
        resizable: true,
        label: 'End Date',
        sorttype: 'Date',
        width: 100,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'UpdatedStartDate',
        label: 'Revised Start Date',
        width: 105,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'UpdatedEndDate',
        resizable: true,
        label: 'Revised End Date',
        sorttype: 'Date',
        width: 105,
        ignoreCase: true,
        sortable: false,
    }
]
function CreateJqGriddependent(data) {

    $.jgrid.gridUnload('#dependentjqgrid');

    $("#dependentjqgrid").jqGrid({
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: models,
        loadonce: true,
        viewrecords: true,
        sortable: false,
        rowNum: 20,
        gridview: true,
        scroll: 1,
        pager: '#pager',
        gridComplete: function () {
            var objRows = $("#dependentjqgrid tbody tr");
            var objHeader = $("#dependentjqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $("#dependentjqgrid").closest('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
    $("#dependentjqgrid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $("#dependentjqgrid").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $("#dependentjqgrid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#dependentjqgrid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $("#dependentjqgrid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#dependentjqgrid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}

$('body').on('click', '#btnok, #btnokNoDependency', function () {

    var button = $(this).text().toLowerCase().trim();
    var approvalRemarks = '';

    if (button == "yes") {
        approvalRemarks = $("#ApprovalRemarks").val().trim();
    }
    else {
        approvalRemarks = $("#ApproveRemarksNoDependency").val().trim();
    }

    var startDate = moment(approveStartDate, 'DD MMM YYYY').format("DD/MM/YYYY");
    var endDate = moment(approveEndDate, 'DD MMM YYYY').format("DD/MM/YYYY");

    $.ajax({

        url: ROOT + 'ProjectTracker/ApproveMilestone',
        type: 'POST',
        dataType: 'TEXT',
        data: {
            projectId: approveProjectId,
            approvalRemarks: approvalRemarks,
            hub: hubId,
            sortedOrder: sortedOrder
        },
        success: function (result) {

            if (result == "1") {
                window.location.href = ROOT + "ProjectTracker/PmuMappings" + '?q=' + Encrypt("SlNo=" + approveSlNo + "&StartDate=" + startDate + "&EndDate=" + endDate + "&PMUVersion=" + approvePMUVersion);
            }
            else {
                alert(result);
            }

        },
        error: function (xhr, status, error) {
            alert(error);
        }

    });

});

function RejectMilestone(ExtendedId) {

    $("#RejectRemarks").val('');
    $('.Error_Reject_Remarks').hide();
    $('#RejectionConfirmation').modal('show');
    $("#rejectok").click(function () {


        var RejectedRemarks = $("#RejectRemarks").val().trim();
        var isvalid = true;

        if (RejectedRemarks === "") {
            isvalid = false;
            $('.Error_Reject_Remarks').show();
            return false;
        }
        if (isvalid) {
            $('.Error_Reject_Remarks').hide();
            $.ajax({
                url: ROOT + 'ProjectTracker/RejectMilestone',
                type: 'POST',
                dataType: 'TEXT',
                data: {
                    extendId: ExtendedId,
                    ApprovalRemarks: RejectedRemarks,
                },
                success: function (result) {
                    if (result.toLowerCase().includes("successfully")) {
                        window.location.reload();
                    }
                    else {
                        alert(result);
                    }
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        }

    });

}

$('#global-search').on('input', function () {

    var searchValue = $(this).val().toLowerCase().trim();
    var cardSections = $('.hide_section');
    var approve_count = 0, reject_count = 0, pending_count = 0;
    cardSections.each(function () {
        var cardDetailsSearch = $(this).find('.open_list');
        var cardText = cardDetailsSearch.text().toLowerCase();

        if (cardText.includes(searchValue)) {
            $(this).css('display', 'block');
            var status = $(this).find('.text-info').html();
            var status = $(this).find('.text-info').html();
            var status_Approve = $(this).find('.text-success').html()
            var status_reject = $(this).find('.text-warning').html()
            var status_pending = $(this).find('.text-info').html()
            if (status_Approve == "Approved") {
                approve_count++;
            }
            else if (status_reject == "Rejected") {
                reject_count++
            }
            else if (status_pending == "Pending For Approval") {
                pending_count++;
            }
        } else {
            $(this).css('display', 'none');
        }
        $(".pending-count").text(pending_count);
        $(".approved-count").text(approve_count);
        $(".rejected-count").text(reject_count);
    });

});

RemarksColmodel = [
    {
        name: 'ActualStartDate',
        label: 'Planned Start Date',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'ActualEndDate',
        label: 'Planned End Date',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'RequestedEndDate',
        label: 'Requested End Date',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'RevisedStartDate',
        label: 'Revised Start Date',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'RevisedEndDate',
        label: 'Revised End Date',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        widht: 150
    },
    {
        name: 'UpdatedBy',
        label: 'Updated By',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'UpdatedOn',
        label: 'Updated On',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
]

function RemarksGrid(result) {

    $("#remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: RemarksColmodel,
        loadonce: true,
        viewrecords: true,
        pager: '#remarks_pager',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#remarks tbody tr");
            var objHeader = $("#remarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '47vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}

function MileStoneRemarksHistory(SlNo) {

    $.ajax({
        url: ROOT + 'ProjectTracker/GetParticularTaskRemarksHistory',
        type: 'GET',
        dataType: 'JSON',
        data: {
            projectId: projectId,
            slNo: SlNo,
            hubId: hubId
        },
        success: function (result) {

            if (result != undefined && result != null) {
                $.jgrid.gridUnload('#remarks');
                RemarksGrid(result);
                $("#remarks-popup").modal('show');
            }
            else {
                alert('Error occured!!!');
            }

        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}
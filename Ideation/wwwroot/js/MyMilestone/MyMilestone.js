var pid = $("#ProjectId").val();
var status = "";
var milestoneIdforchangestatus = '';
var filter = $('#SearchProject').val();
var cardddetailsProjectId = '';
var cardddetailsmilestoneid = '';
var cardddetailstatus = '';
var cardrelation = '';
var email = '';
var dependentMilestonedisplay = '';
var role = '';
var selectedval = 'n';
var StatusList = [];
var data = [];
var prevEndDate = '';
var errorflag = '';
var ValidationAlertDisplay = true;
var Approvebuttonclick = true;
var Buttoneflag = '';
var Requestflag = '';
var userrequest = true;
var userconfirmation = true;
var DisplaySubGridValue = '';
var SelecteDprojectId = '';
var filteruserid = '';
var dependentMilestoneDetailsList = [];
var SubmilestoneData = [];
var UpdatedEndDate_User = '';
var DependentSub_Milestones = [];
var UpdatedStartDate_User = '';
var EndDateExtensionflag = '';
var VersionReamrks = '';
var HubForSave = '';
var HubList = JSON.parse($("#getHubList").val());
var HubId = 0;
var cardDetailsHub = '';
$(document).ready(function () {
    $('#Versionchange').hide();
    $('#loader').css('visibility', 'hidden');
    $('#ProjectId').hide();
    $(".projectName_error").hide();
    $(".hubName_error").hide();
    
    //projectNameList
    $("#projectNameList").eq(1).remove();
    $('.select-multiple').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true,
        selectAllValue: '0'
    });
    
    $('#projectNameList').hide();
    StatusList = ['open', 'notstarted', 'overdue'];
    $('#cardscount').html('<b>' + $('#Countlist').val() + '</b>');


});

var GetData = $.parseJSON($('#JsonData').val());

var a = 1;
var b = 1;
var c = 1;
var d = 1;

if (GetData != undefined || GetData != null) {
    $(".project-hub-name").text(GetData[0].Hub + '-(' + GetData[0].ProjectCode + ')' + GetData[0].ProjectName)
}

$.each(GetData, function (i, obj) {
    
    if (obj.UserName != null) {
        var pIndex = obj.UserName.lastIndexOf(' ');
        var pLastName = '';
        if (pIndex != -1) {
            pLastName = obj.UserName[pIndex + 1];
        }
        var substringValue = (obj.UserName[0] + pLastName).toUpperCase();
    }

    if (GetData[i].MilestoneStatus == "Completed") {

        $(".count_completed").text(a);
        var substringValue = (obj.UserName != null && obj.UserName != "") ? obj.UserName.substring(0, 2).toUpperCase() : " ";
        var newId = `<div class="hide_section">
        <div class="open_list">
            <div>
                <div class="list_card">
                    <div class="hub_project">
                         `+ obj.Hub +` - (`+ obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list">
                       `+ obj.MilestoneName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.StartDate+ `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-info">`+ obj.MilestoneStatus + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+substringValue+`</span><span class="">`+ obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                           `+ obj.ModifiedDate + `
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>`
        var $newId = $(newId);
        $('.Completed').append($newId);
        a = a + 1;
    }
    else if (GetData[i].MilestoneStatus == "OverDue") {
        $(".count_overdue").text(b);
        var substringValue = (obj.UserName != null && obj.UserName != "")? obj.UserName.substring(0, 2).toUpperCase() : " ";
        var newId = `<div class="hide_section">
        <div class="open_list">
            <div>
                <div class="list_card">
                    <div class="hub_project">
                        `+ obj.Hub + ` - (` + obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list">
                       `+ obj.MilestoneName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-info">`+ obj.MilestoneStatus + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                           `+ obj.ModifiedDate + `
                        </p>
                    </div>
                    ${obj.IsAlreadyRequest == 0 ? `
                    <div class="comments">
                        <span title="Project Details" onclick="EditeMyMilestone('${obj.ProjectId}', '${obj.StartDate}', '${obj.EndDate}', '${obj.MilestoneStatus}', '${obj.DisplaySubMilestone}', ${obj.MilestoneId}, ${obj.SlNo}, '${obj.PMUVersion}', '${obj.MilestoneName}',
                        '${obj.ProjectCode}', '${obj.ProjectName}', '${obj.Hub}', '${obj.IsWeekendExcluded}')">
                            <i class="fa fa-comment"></i>
                        </span>
                    </div>
                ` : ''}    
                </div>
            </div>
        </div>
        </div>`
        var $newId = $(newId);
        $('.overdue_list').append($newId);
        b = b + 1;
    }
    else if (GetData[i].MilestoneStatus == "In Progress") {
        $(".count_inprogress").text(c);
        var substringValue = (obj.UserName != null && obj.UserName != "") ? obj.UserName.substring(0, 2).toUpperCase() : "";
        var newId = `<div class="hide_section">
            <div class="open_list">
            <div>
                <div class="list_card">
                    <div class="hub_project">
                        `+ obj.Hub +` - (`+ obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list">
                       `+ obj.MilestoneName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-info">`+ obj.MilestoneStatus + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                           `+ obj.ModifiedDate + `
                        </p>
                    </div>
                    ${obj.IsAlreadyRequest == 0 ? `
                    <div class="comments">
                        <span title="Project Details" onclick="EditeMyMilestone('${obj.ProjectId}', '${obj.StartDate}', '${obj.EndDate}', '${obj.MilestoneStatus}', '${obj.DisplaySubMilestone}', ${obj.MilestoneId}, ${obj.SlNo}, '${obj.PMUVersion}', '${obj.MilestoneName}',
                        '${obj.ProjectCode}', '${obj.ProjectName}', '${obj.Hub}','${obj.IsWeekendExcluded}')">
                            <i class="fa fa-comment"></i>
                        </span>
                    </div>
                ` : ''}
                </div>
            </div>
            </div>
        </div>`
        var $newId = $(newId);
        $('.list_inProgress').append($newId);
        c = c + 1;
    }
    else if (GetData[i].MilestoneStatus == "Open") {
        $(".count_open").text(d);
        var substringValue = (obj.UserName != null && obj.UserName != "") ? obj.UserName.substring(0, 2).toUpperCase() : "";
        var newId = `<div class="hide_section">
        <div class="open_list">
            <div>
                <div class="list_card">
                    <div class="hub_project">
                        `+ obj.Hub +` - (`+ obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list">
                       `+ obj.MilestoneName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-info">`+ obj.MilestoneStatus + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                           `+ obj.ModifiedDate + `
                        </p>
                    </div>
                    ${obj.IsAlreadyRequest == 0 ? `
                    <div class="comments">
                        <span title="Project Details" onclick="EditeMyMilestone('${obj.ProjectId}', '${obj.StartDate}', '${obj.EndDate}', '${obj.MilestoneStatus}', '${obj.DisplaySubMilestone}', ${obj.MilestoneId}, ${obj.SlNo}, '${obj.PMUVersion}', '${obj.MilestoneName}',
                        '${obj.ProjectCode}', '${obj.ProjectName}', '${obj.Hub}', '${obj.IsWeekendExcluded}')">
                            <i class="fa fa-comment"></i>
                        </span>
                    </div>
                ` : ''}
                </div>
            </div>
            </div>
        </div>`
        var $newId = $(newId);
        $('.open_list_progress').append($newId);
        d = d + 1;
    }
});


$('[data-multiselect]').multiselect({
    includeSelectAllOption: true,
    buttonWidth: 220,
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    numberDisplayed: 1
});
$('.datepicker').datepicker({
    format: 'dd/mm/yyyy',
    todayHighlight: true,
    autoclose: true
});

$('.c-filter__filter').click(function () {
    $('#page-wrapper').addClass('custom-page-wrapper');
});

function MyMilestone(User, SearchText, Status, Type, email, DisplaySubMilestone) {
    
    $.ajax({
        type: "POST",
        url: ROOT + 'ProjectTracker/Filtersearch',
        data: { "UserId": User, "SearchText": SearchText, "Status": Status, "Type": Type, "Email": email },
        dataType: "json",
        success: function (response) {
            data = response;
            var card = " ";
            $('#cardContainer').empty();
            if (response.length > 0) {
                console.log('response', response.length);
                $('#cardscount').html('<b>' + response.length + '</b>');
                for (var i = 0; i < response.length; i++) {
                    card += ' <div class="col-md-6 col-lg-3">';
                    card += ' <div class="m-block__item">';
                    if (response[i].MilestoneStatus == 'Not Started') {
                        card += ' <div class="m-block__item--title -notstarted" title="Project Name 1">' + "(" + response[i].ProjectCode + " )" + response[i].ProjectName + '</div>';

                    } else if (response[i].MilestoneStatus == 'Open') {
                        card += ' <div class="m-block__item--title -open" title="Project Name 1">' + "(" + response[i].ProjectCode + " )" + response[i].ProjectName + '</div>';

                    } else if (response[i].MilestoneStatus == 'OverDue') {
                        card += ' <div class="m-block__item--title -overdue" title="Project Name 1">' + "(" + response[i].ProjectCode + " )" + response[i].ProjectName + '</div>';

                    }
                    else if (response[i].MilestoneStatus == 'Completed') {
                        card += ' <div class="m-block__item--title -completed" title="Project Name 1">' + "(" + response[i].ProjectCode + " )" + response[i].ProjectName + '</div>';

                    } else {

                    }
                    card += '<div class="m-block__item--content">';
                    card += ' <h5 class="m-block__item--content-title">' + response[i].MilestoneName + '</h5>';
                    card += ' <div class="m-block__item--date-group">';
                    card += ' <div class="m-block__item--date-item">';
                    card += ' <i class="fas fa-calendar-alt"></i>' + response[i].StartDate + ' </div>';
                    card += ' <span>-</span>';
                    card += ' <div class="m-block__item--date-item">';
                    card += ' <i class="fas fa-calendar-alt"></i>' + response[i].EndDate + '</div>';
                    card += '</div>'
                    card += '<p class="m-block__item--date-item">' + response[i].MilestoneStatus + '</p>';
                    card += '<p class="m-block__item--date-item">' + response[i].UserName + '</p>';
                    card += '<p class="m-block__item--date-item" id="' + response[i].MilestoneId +'DisplaySubMilestone" hidden> ' + response[i].DisplaySubMilestone +'</p>';

                    card += '<div class="m-block__item--content-infoicon">';
                    card += '<span>Last modified on ' + response[i].ModifiedDate + '</span>';
                    if (JSON.parse(response[i].ShowProjectDetails)) {
                        card += '<i class="fas fa-comment-alt" onclick="EditeMyMilestone(' +
                            response[i].ProjectId + ', \'' + response[i].StartDate + ' cre\', \'' +
                            response[i].EndDate + '\', \'' + response[i].MilestoneStatus + '\', \'' +
                            response[i].DisplaySubMilestone + '\', \'' + response[i].MilestoneId + '\', \'' +
                            response[i].SlNo + '\', \'' + response[i].PMUVersion + '\', \'' +
                            response[i].MilestoneName + '\')" title="Project Details"></i>';
                    }

                    card += '</div>';
                    card += '</div>';
                    card += '</div>';
                    card += '</div>';


                }
            } else {
                alert('No Records to View');

            }

            //console.log(card)
            $('#cardContainer').append(card);

        }
    });
}

$("#milestone").change(function () {

    var milestoneid = $("#milestone").val();
    var ProjectId = parseInt(pid);
    $.ajax({
        type: "POST",
        url: ROOT + 'ProjectTracker/DatePicker',
        data: { "milestoneid": milestoneid, "ProjectId": ProjectId },
        dataType: "json",
        success: function (response) {

            $("#StartDate").val(response[0].StartDate);
            $("#EndDate").val(response[0].EndDate);
        }
    });
});

function isWeekend(date) {
    var day = date.getDay();
    return [0, 6].indexOf(day) === -1;
}

var ExtendEndDate = '';
var ExtendStartDate = '';
// Checking and showing the modal for date extension or for approval
function EditeMyMilestone(Id, StartDate, EndDate, MilestoneStatus, DisplaySubMilestone, MilestoneId, SlNo, PMUVersion, MilestoneName, projectcode, projectName, Hub,IsWeekendExcluded) {
    DisplaySubGridValue = DisplaySubMilestone.trim();
    var flag = '';
    var Remarks = '';
    EndDate = EndDate.trim();
    prevEndDate = EndDate;
    HubForSave = Hub;
    $('#Versionchange').hide();
    $('#SlNo').val(SlNo);
    $('#PMUVersion').val(PMUVersion);
    $('#MilestoneName').val(MilestoneName);
    $('.prj-header').text(Hub + ' - ' + '(' + projectcode + ')' + ' ' + projectName);

    $('.DisplayCompletedDate').hide();
    $('.display-extended-date').hide();
    
    if (IsWeekendExcluded == "1") {
        ExtendStartDate = '';
        ExtendEndDate = '';
        //for approving
        ExtendStartDate = new Date(EndDate);
        ExtendStartDate.setDate(ExtendStartDate.getDate() + 1);
        if (ExtendStartDate.getDay() == 6) {
            ExtendStartDate.setDate(ExtendStartDate.getDate() + 1);
        }
        if (ExtendStartDate.getDay() == 0) {
            ExtendStartDate.setDate(ExtendStartDate.getDate() + 1);
        }

        //for extending
        var ExtendEndDate = new Date(EndDate);
        if (ExtendEndDate.getDay() == 6) {
            ExtendEndDate.setDate(ExtendEndDate.getDate() + 1);
        }
        if (ExtendEndDate.getDay() == 0) {
            ExtendEndDate.setDate(ExtendEndDate.getDate() + 1);
        }
        $('#ExtendedDate').datepicker("destroy");
        $('#ExtendedDate').datepicker({
            dateFormat: 'dd/mm/yy',
            showButtonPanel: true,
            showOtherMonths: true,
            autoclose: true,
            minDate: new Date(ExtendStartDate),
            beforeShowDay: function (date) {
                return [isWeekend(date), ''];
            }
        });
        //$('#ExtendedDate').datepicker("setDate", new Date(ExtendStartDate));
        $('#extended-remarks').val(''); $('#need-extended-remarks').html('');
        $('#ExtendedDate').val(''); $('#need-extended-date').html('');

        $('#ActualCompletedDate').datepicker("destroy");
        $('#ActualCompletedDate').datepicker({
            dateFormat: 'dd/mm/yy',
            minDate: new Date(StartDate),
            maxDate: new Date(ExtendEndDate),
            showButtonPanel: true,
            showOtherMonths: true,
            autoclose: true,
            beforeShowDay: function (date) {
                return [isWeekend(date), ''];
            }
        });
        $('#ActualCompletedDate').datepicker("setDate", new Date(ExtendEndDate));
        $('#Remarks').val(''); $('#Remarkserror').html('');
    }
    else {
        ExtendStartDate = '';
        ExtendEndDate = '';
        //for approving
         ExtendStartDate = new Date(EndDate);
         ExtendStartDate.setDate(ExtendStartDate.getDate() + 1);

        //for extending
         ExtendEndDate = new Date(EndDate);
        
        $('#ExtendedDate').datepicker("destroy");
        $('#ExtendedDate').datepicker({
            dateFormat: 'dd/mm/yy',
            showButtonPanel: true,
            showOtherMonths: true,
            autoclose: true,
            minDate: new Date(ExtendStartDate),
        });
        //$('#ExtendedDate').datepicker("setDate", new Date(ExtendStartDate));
        $('#extended-remarks').val(''); $('#need-extended-remarks').html('');
        $('#ExtendedDate').val(''); $('#need-extended-date').html('');

        $('#ActualCompletedDate').datepicker("destroy");
        $('#ActualCompletedDate').datepicker({
            dateFormat: 'dd/mm/yy',
            minDate: new Date(StartDate),
            maxDate: new Date(ExtendEndDate),
            showButtonPanel: true,
            showOtherMonths: true,
            autoclose: true,
        });
        $('#ActualCompletedDate').datepicker("setDate", new Date(ExtendEndDate));
        $('#Remarks').val(''); $('#Remarkserror').html('');
    }

    var MilestoneName = '';
    cardddetailsProjectId = Id;
    cardddetailsmilestoneid = MilestoneId;
    cardddetailstatus = MilestoneStatus;
    
    if (MilestoneStatus == " Completed ") {
        MilestoneStatus = 'Completed';
    }
    pid = Id;
    milestoneIdforchangestatus = MilestoneId;
    var ss = $('#milestone').val();
    //var DisplaySubMilestone = $('#DisplaySubMilestone').text();
    
    $.ajax({
            url: ROOT + 'ProjectTracker/MileStoneBoard',
            data: {
                ProjectID: parseInt(Id),
                DisplaySubMilestone: DisplaySubGridValue
            },
            // dataType: 'JSON',
            type: 'POST',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].MilestoneId == MilestoneId) {
                        MilestoneName = result[i].MilestoneName;
                        flag = result[i].flag;
                        Requestflag = result[i].flag;
                        Remarks = result[i].Remarks;
                    }
                }

                if ($('#RoleId').val() == '3') {
                    if (flag == 'Pending For Approval') {
                        $('#btnSubmit').hide();
                        $('.-cancel').hide();
                    } else {
                        $('#btnSubmit').show();
                        $('.-cancel').show();
                    }
                } else {
                    if (flag == 'Approved' || flag == 'Rejected' || flag == null || flag =='') {
                        $('#btnApprove').hide();
                        $('#btnReject').hide();
                        $('#btnSubmit').show();
                        $("#Remarks").val('');
                    } else {
                        $('#btnApprove').show();
                        $('#btnReject').show();
                        $('#btnSubmit').hide();
                        $("#Remarks").val(Remarks);
                    }
                }

                if (MilestoneStatus == 'Completed') {
                    //$('#open').addClass('-outline-success');
                    ////$('#completed').css("background", "green");
                    //$('#completed').removeClass('-outline-success');
                } else {
                    //$('#open').removeClass('-outline-success');
                    ////$('#completed').css("background", "green");
                    //$('#completed').addClass('-outline-success');
                }
                prevEndDate = moment(EndDate).format('DD/MM/YYYY');
                $("#milestone").val($('#MilestoneName').val());
                $("#StartDate").val(moment(StartDate).format('DD/MM/YYYY'));
                $("#EndDate").val(prevEndDate)
                $("#EndDate").attr('data-previousvalue', prevEndDate);
               $('#selectedendDate').val(moment(EndDate).format('DD/MM/YYYY'))
                $('#addModal').modal('show');

            },
            error: function (err) {
                alert(err.statusText);
            }
    });
}

// showing extenddate or approvedate datepicker and remarks column
$(".status").click(function () {

    EndDateExtensionflag = false;
    CompletedStatus = $(this).text();
    var SlNo = $('#SlNo').val();
    var MilestoneName = $('#MilestoneName').val();
    HubId = HubList.filter(item => item.HubName == HubForSave).map(item => item.HubId);

    if (CompletedStatus == 'Completed') {

        //$('#date-ext').addClass('-outline-success');
        //$('#completed').removeClass('-outline-success');
        $('.DisplayCompletedDate').show();
        $('.display-extended-date').hide();

        $.ajax({
            url: ROOT + 'ProjectTracker/AlertforCompletthemilestone',
            data: {
                "ProjectId": parseInt(cardddetailsProjectId),
                "MilestoneId": parseInt(cardddetailsmilestoneid),
                DisplaySubMilestone: DisplaySubGridValue,
                SlNo: SlNo,
                Hub: HubId
            },
            type: 'POST',
            success: function (result) {
                if (result.length > 0) {
                    $('.DisplayCompletedDate').hide();
                    $('#displaySpanmsg').html('<b>Dependent milestone is not Completed<b/>');
                    $('#btndepent').removeAttr('hidden');
                    $('#btnok').hide();
                    $('#BtnCanceldependent').hide();
                    $('#milestone').val(MilestoneName);
                    dependentMilestonedisplay = true;

                    CompletedStatus = cardddetailstatus;
                    //$('#date-ext').removeClass('-outline-success');
                    //$('#completed').addClass('-outline-success');
                    //$('#completed').removeClass('completed_status');

                    CreateJqGrid(result);
                    $('#dependentMilestones').modal('show');

                    if (dependentMilestonedisplay) {
                        $("#jqgrid").jqGrid('hideCol', 'UpdatedStartDate');
                        $("#jqgrid").jqGrid('hideCol', 'UpdatedEndDate');
                    } else {
                        $("#jqgrid").jqGrid('showCol', 'UpdatedStartDate');
                        $("#jqgrid").jqGrid('showCol', 'UpdatedEndDate');
                    }
                }
                else {
                    $('.DisplayCompletedDate').show();
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });

    }
    else if (CompletedStatus == 'Date Extension') {

        //$('#open').removeClass('-outline-success');
        //$('#completed').addClass('-outline-success');
        $('.DisplayCompletedDate').hide();
        $('.display-extended-date').show();
    }
});

$("#myUserInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myUserList li").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
$('body').addClass("menuitemshow");

var filterstats = '';
$(".checkboxlist").change(function () {
    
    ProjectName = $("#ProjectId option:Selected").text();
    projectId = $('#ProjectId').children(":selected").attr("value");
    $(".m-block__item").parent('.col-lg-3').remove();
    var milestones = $("input[name=milestone]:checked").map(function () { return this.value; }).get().join(',');
    var userid = $("input[name=UserList]:checked").map(function () { return this.value; }).get().join(',');
    filterstats = $("input[name=milestoneStatus]:checked").map(function () { return this.value; }).get().join(',');
    console.log(milestones);

    var id = $("input[name=milestone]:checked").map(function () { return this.value; }).get();
    if (id.length > 0 || filterstats != '' || userid != '') {
        // alert('checked');
        if (filter == '') {
            var Type = 'list';
            MyMilestone(milestones, userid, filterstats, ProjectName, projectId, Type, email);
        }
        else {
            var Type = 'search';
            MyMilestone(milestones, userid, filterstats, filter, '', Type, email);

        }
    }
    else {
        var Type = 'list';
        MyMilestone(milestones, userid, filterstats, ProjectName, projectId, Type, email);
    }

});
$("#Cancel").click(function (e) {
    $("input[name=milestone]").prop("checked", false);
    $("input[name=milestoneStatus]").prop("checked", false);
    $('#page-wrapper').removeClass('custom-page-wrapper');
    $('Remarks').val('');
    e.preventDefault();
    location.reload();
    //selected = 's'
    $("div.id_100 select").select2().val(projectId).change();
});

var CompletedStatus = '';
var white = false
var bgcolor;
//$(".status").click(function () {
//    debugger
//    EndDateExtensionflag = false;
//    CompletedStatus = $(this).text();
//    var SlNo = $('#SlNo').val();
//    var MilestoneName = $('#MilestoneName').val();
//    if (CompletedStatus == 'Completed') {
//        $('#open').addClass('-outline-success');

//        $('#completed').removeClass('-outline-success');


//        //for completed aleret

//        $.ajax({
//            url: ROOT + 'Milestone/AlertforCompletthemilestone',
//            data: { "ProjectId": parseInt(cardddetailsProjectId), "MilestoneId": parseInt(cardddetailsmilestoneid), DisplaySubMilestone: DisplaySubGridValue, SlNo: SlNo },
//            // dataType: 'JSON',
//            type: 'POST',
//            success: function (result) {
//               debugger
//                if (result.length > 0) {
//                    debugger
//                    $('.DisplayCompletedDate').hide();

//                    //for (var milestone = 0; milestone <= result.length - 1; milestone++) {

//                    //    if ((result[milestone].MilestoneStatus != "Completed" && result[milestone].MilestoneStatus != null))
//                    //    {

//                    //        //alert('Dependent milestone is not Completed');
//                           $('#displaySpanmsg').html('<b>Dependent milestone is not Completed<b/>');
//                            $('#btndepent').removeAttr('hidden');
//                            $('#btnok').hide();
//                            $('#BtnCanceldependent').hide();
//                            $('#milestone').val(MilestoneName);
//                            dependentMilestonedisplay = true;

//                            //dependentMilestoneDetails(cardddetailsProjectId, cardddetailsmilestoneid);

//                            CompletedStatus = cardddetailstatus;
//                            $('#open').removeClass('-outline-success');
//                            $('#completed').addClass('-outline-success');
//                            $('#completed').removeClass('completed_status');
//                            ValidationAlertDisplay = false;
//                    //        break;
//                    //    }
//                    //    else {
//                    //        ValidationAlertDisplay = true;

//                    //    }

//                        console.log('prevEndDate', $('#selectedendDate').val());
//                        console.log('EndDate', $('#EndDate').val());
//                        var prevEndDate = moment($('#selectedendDate').val(), 'DD/MM/YYYY')
//                        var endDate = moment($('#EndDate').val(), 'DD/MM/YYYY');
//                        if (new Date(prevEndDate).getTime() !== new Date(endDate).getTime()) {
//                            alert('Milestone cannot be completed on extending the End Date')
//                            CompletedStatus = 'Open';
//                            $('#open').removeClass('-outline-success');
//                            $('#completed').addClass('-outline-success');
//                            $('#completed').removeClass('completed_status');
//                            $('#EndDate').removeClass('input-disabled');
//                            $('.DisplayCompletedDate').hide();
//                            ValidationAlertDisplay = false;
//                            $('#EndDate').val($('#selectedendDate').val());
//                        } else {
//                            ValidationAlertDisplay = true;
//                        }
//                    //}

//                    debugger
//                    //$("#jqgrid").jqGrid("clearGridData", true);
//                    //jQuery('#jqgrid').jqGrid('setGridParam', { data: result });
//                    //jQuery('#jqgrid').trigger('reloadGrid');
//                    CreateJqGrid(result);
//                    $('#dependentMilestones').modal('show');

//                    if (dependentMilestonedisplay) {
//                        $("#jqgrid").jqGrid('hideCol', 'UpdatedStartDate');
//                        $("#jqgrid").jqGrid('hideCol', 'UpdatedEndDate');
//                    } else {
//                        $("#jqgrid").jqGrid('showCol', 'UpdatedStartDate');
//                        $("#jqgrid").jqGrid('showCol', 'UpdatedEndDate');
//                    }

//                }
//                else {
//                    debugger
//                    var prevEndDate = moment($('#selectedendDate').val(), 'DD/MM/YYYY')
//                    var endDate = moment($('#EndDate').val(), 'DD/MM/YYYY');
//                    if (new Date(prevEndDate).getTime() !== new Date(endDate).getTime()) {
//                        alert('Milestone cannot be completed on extending the End Date')
//                        CompletedStatus = 'Open';
//                        $('#open').removeClass('-outline-success');
//                        $('#completed').addClass('-outline-success');
//                        $('#completed').removeClass('completed_status');
//                        $('.DisplayCompletedDate').hide();
//                        ValidationAlertDisplay = false;
//                        $('#EndDate').val($('#selectedendDate').val());

//                    } else {
//                        ValidationAlertDisplay = true;
//                        $('.DisplayCompletedDate').show();
//                        $('#EndDate').addClass('input-disabled');
//                        $('#EndDate').removeClass('hasDatepicker');
//                        $("#EndDate").datepicker("destroy");
//                    }


//                }
//                if (ValidationAlertDisplay) {
//                    debugger
//                    $('#EndDate').addClass('input-disabled');
//                    $('#EndDate').removeClass('hasDatepicker');
//                    $("#EndDate").datepicker("destroy");
//                }
//            },
//            error: function (err) {
//                alert(err.statusText);
//            }
//        });


//    }
//    else if (CompletedStatus == 'Open') {
//        $('#open').removeClass('-outline-success');
//        //$('#completed').css("background", "green");
//        $('#completed').addClass('-outline-success');
//        $('.DisplayCompletedDate').hide();
//        $('#EndDate').removeClass('input-disabled');
//        $('#EndDate').addClass('hasDatepicker');
//    }
//});

$("#btnSubmit").click(function () {
    Approvebuttonclick = true;
    Buttoneflag = 'Submitted';
    var SlNo = $('#SlNo').val();
    var PMUVersion = $('#PMUVersion').val();
    var ProjectId = parseInt(pid);
    var MilestoneId = cardddetailsmilestoneid;
    HubId = HubList.filter(item => item.HubName == HubForSave).map(item => item.HubId);

    if (CompletedStatus == 'Completed')
    {
        var Remarks = $('#Remarks').val().trim();
        if (Remarks.length == 0) {
            $('#Remarkserror').html('Please enter the remarks');
            return false;
        }
    }
    else
    {
        var ExtendedDate = $("#ExtendedDate").val().trim();
        var ExtendedRemarks = $('#extended-remarks').val().trim();
        if (ExtendedRemarks.length == 0 || ExtendedDate.length == 0) {
            ExtendedDate.length == 0 ? $('.need-extended-date').html('Please select the extended date') : $('.need-extended-date').html('');
            ExtendedRemarks.length == 0 ? $('.need-extended-remarks').html('Please enter the remarks') : $('.need-extended-remarks').html('');
            return false;
        }
    }

    if ($('#RoleId').val() == '3' && moment($('#EndDate').val(), "DD/MM/YYYY").isSame(moment($('#selectedendDate').val(), "DD/MM/YYYY"))) {
        flag = 'Pending For Approval';
        if (CompletedStatus != 'Completed') {
            cardedit();
        } else {
            cardedit();
        }
    }
    else
    {
        flag = '';
        if ((!moment($('#ExtendedDate').val(), "DD/MM/YYYY").isSame(moment($('#selectedendDate').val(), "DD/MM/YYYY"))) && CompletedStatus != 'Completed') {
            $('#btndepent').attr('hidden', true);
            $('#btnok').show();
            $('#BtnCanceldependent').show();
            $('#displaySpanmsg').html('On Extending end date the dependent milestones date(s) will be updated. Are you sure you want to proceed ?</b>');
            dependentMilestonedisplay = false
            $.ajax({
                type: "get",
                url: ROOT + "ProjectTracker/GetMilestoneRevisedDates",
                data: { 
                    ProjectId: ProjectId,
                    MilestoneId: MilestoneId,
                    SlNo: SlNo,
                    PMUVersion: PMUVersion,
                    StartDate: $('#StartDate').val(),
                    EndDate: $('#ExtendedDate').val(),
                    Hub: HubId[0]
                },
                dataType: "json",
                success: function (response) {
                    dependentMilestoneDetailsList = response;
                        $('#dependentMilestones').modal('show');
                        $("#jqgrid").jqGrid("clearGridData", true);
                        jQuery('#jqgrid').jqGrid('setGridParam', { data: response });
                        jQuery('#jqgrid').trigger('reloadGrid');
                        CreateJqGrid(response);
                        if (dependentMilestonedisplay) {
                            $("#jqgrid").jqGrid('hideCol', 'UpdatedStartDate');
                            $("#jqgrid").jqGrid('hideCol', 'UpdatedEndDate');
                        } else {
                            $("#jqgrid").jqGrid('showCol', 'UpdatedStartDate');
                            $("#jqgrid").jqGrid('showCol', 'UpdatedEndDate');
                        }
                },
                error: function (err) {
                    var filter
                    alert(err.statusText);
                }
            });
        }
        else {
            cardedit();
        }
    }
});

$('#btnok').click(function () {
    Approvebuttonclick = true;
    flag = 'Approved'
    cardedit();
})
//function cardedit() {
//    var ProjectId = parseInt(pid);
//    var ActualCompletedDate = '';
//    var ExtendedDate = '';
//    var Remarks = '';
//    var ExtendedRemarks = '';
//    var MilestoneId = cardddetailsmilestoneid;
//    var StartDate = $('#StartDate').val();
//    var ExtendedEndDate = $('#ExtendedDate').val();
//    var CompletedEndDate = $('#ActualCompletedDate').val();
//    var Version = $('#Version').val();
//    var previousEndDate = $("#EndDate").attr('data-previousvalue');

//    var AccepptMailtrigger = $('input[name="AccepptMailtrigger"]:checked').val();
//    var AccepptVersionCreation = $('input[name="AccepptVersionCreation"]:checked').val();

//    var d = new Date();
//    var year = d.getFullYear();
//    var month = String(d.getMonth() + 1).padStart(2, '0');
//    var day = String(d.getDate()).padStart(2, '0');
//    var CurrentDate = year + '-' + month + '-' + day;

//    var startDateCompare = moment(StartDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
//    prevEndDate = moment(prevEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD');


//    var MailTriggerRequired = $('#AccepptMailtrigger').is(':checked') ? true : false;
//    var IsNewVersion = $('#AccepptVersionCreation').is(':checked') ? true : false;
//    var NewVersionName = $('#Version').val();
//    if ($('#AccepptVersionCreation').is(':checked')) {
//        if ($('#Version').val() == '') {
//            $('#VersionError').text('Please enter the Version');
//            errorflag = false;
//            return false;
//        } else {
//            $('#VersionError').text(' ');
//        }
//    }

//    if (CompletedStatus == 'Completed')
//    {

//        var changedEndDate = moment(CompletedEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

//        if ($('#ActualCompletedDate').val() == '') {
//            alert('Please select Extension Date ');
//            return false;
//        }
//        else {
//            ActualCompletedDate = $('#ActualCompletedDate').val();
//            flag = '';
//        }

//        var Remarks = $('#Remarks').val();
//        if (Remarks.length == 0) {
//            $('#Remarkserror').html('Please enter the remarks');
//            errorflag = false
//            return false;
//        }
//        else {
//            errorflag = true
//        }

//        if (new Date(startDateCompare) > new Date(changedEndDate)) {
//            alert("Please Select the Completed Date greater than the StartDate.");
//            errorflag = false
//            return false;
//        }
//        else {
//            errorflag = true
//        }

//        if (CurrentDate > changedEndDate) {
//            if (Remarks.length == 0) {
//                $('#Remarkserror').html('Please enter the remarks');
//                $('#dependentMilestones').modal('hide');
//                errorflag = false
//                return false;
//            }
//            else {
//                errorflag = true
//            }
//        }
//        else {
//            //changedEndDate = new Date(EndDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
//            changedEndDate = moment(CompletedEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
//            if (prevEndDate == changedEndDate) {
//                console.log('Equal');
//                errorflag = true
//            }
//            else
//            {
//                if (Remarks.length == 0) {
//                    // alert("Please Enter Remarks");
//                    $('#Remarkserror').html('Please enter the remarks');
//                    errorflag = false
//                    $('#dependentMilestones').modal('hide');
//                    // $('#dependentMilestones').modal('show');
//                    return false;
//                } else {
//                    errorflag = true
//                }
//            }
//        }
//    }
//    else {
//        var changedEndDate = moment(ExtendedEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

//        if (CompletedStatus == 'Date Extension') {
//            if ($('#ExtendedDate').val() == '') {
//                alert('Please select Extension Date ');
//                return false;
//            } else {
//                ExtendedDate = $('#ExtendedDate').val();
//            }
//        }
//        if (CompletedStatus == 'Date Extension') {
//            flag = '';
//        }

//        var ExtendedRemarks = $('#extended-remarks').val();
//        if (ExtendedRemarks.length == 0) {
//            $('.need-extended-remarks').html('Please enter the remarks');
//            errorflag = false
//            // $('#UserConfirmationforenddate').modal('hide');
//            //$('#addModal').modal('show');
//            return false;
//        }
//        else {
//            errorflag = true

//        }
//        if (ExtendedDate.length == " ") {
//            alert("Please select End Date")
//            errorflag = false
//            return false;
//        } else {
//            errorflag = true

//        }

//        if (new Date(startDateCompare) > new Date(changedEndDate)) {
//            alert("Please Select the Extended Date greater than the StartDate.");
//            errorflag = false
//            return false;
//        } else {
//            errorflag = true

//        }

//        if (CurrentDate > changedEndDate) {
//            if (ExtendedRemarks.length == 0) {
//                //alert("Please Enter Remarks");
//                $('#Remarkserror').html('Please enter the remarks');
//                $('#dependentMilestones').modal('hide');
//                errorflag = false
//                return false;
//            }
//            else {
//                errorflag = true
//            }
//        }
//        else {
//            //changedEndDate = new Date(EndDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
//            changedEndDate = moment(ExtendedEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
//            if (prevEndDate == changedEndDate) {
//                console.log('Equal');
//                errorflag = true
//            }
//            else {
//                if (ExtendedRemarks.length == 0) {
//                    // alert("Please Enter Remarks");
//                    $('.need-extended-remarks').html('Please enter the remarks');
//                    errorflag = false
//                    $('#dependentMilestones').modal('hide');
//                    // $('#dependentMilestones').modal('show');
//                    return false;
//                } else {
//                    errorflag = true

//                }
//            }
//        }
//    }

//    if ($('#RoleId').val() == '3' && userconfirmation) {
//        if (CompletedStatus == 'Completed') {
//            $('#UserConfirmationforCompleteMilestone').modal('show');
//            userrequest = false;

//        } else {
//            if (!errorflag) {
//                $('#UserConfirmationforenddate').modal('show');
//                userrequest = false;
//            }

//        }
//    }

//    HubId = HubList.filter(item => item.HubName == HubForSave).map(item => item.HubId);

//    if (CompletedStatus == 'Completed') {

//        var milestone = {
//            "ProjectId": ProjectId,
//            "MilestoneId": MilestoneId,
//            "StartDate": moment($('#StartDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
//            "EndDate": moment($('#EndDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
//            "MilestoneStatus": CompletedStatus,
//            "ActualCompletedDate": ActualCompletedDate,
//            "Remarks": Remarks,
//            "AccepptMailtrigger": MailTriggerRequired,
//            "AccepptVersionCreation": IsNewVersion,
//            "Buttoneflag": Buttoneflag,
//            "NewVersionName": NewVersionName,
//            "Remarks": Remarks,
//            "SlNo": $('#SlNo').val(),
//            "PMUVersion": $('#PMUVersion').val(),
//            "CompletedStatus": CompletedStatus,
//            'flag': flag,
//            "PreviousEndDate": moment($('#EndDate').attr('data-previousvalue'), "DD/MM/YYYY").format("YYYY-MM-DD"),
//            "VersionRemarks": $('#VersionRemarks').val(),
//            "HubId": HubId
//        };
//    }
//    else {
//        var milestone = {
//            "ProjectId": ProjectId,
//            "MilestoneId": MilestoneId,
//            "StartDate": moment($('#StartDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
//            "EndDate": moment($('#selectedendDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
//            "MilestoneStatus": CompletedStatus,
//            "ExtendedDate": ExtendedDate,
//            "Remarks": Remarks,
//            "AccepptMailtrigger": MailTriggerRequired,
//            "AccepptVersionCreation": IsNewVersion,
//            "Buttoneflag": Buttoneflag,
//            "NewVersionName": NewVersionName,
//            "Remarks": ExtendedRemarks,
//            "SlNo": $('#SlNo').val(),
//            "PMUVersion": $('#PMUVersion').val(),
//            "CompletedStatus": CompletedStatus,
//            'flag': flag,
//            "PreviousEndDate": moment($('#EndDate').attr('data-previousvalue'), "DD/MM/YYYY").format("YYYY-MM-DD"),
//            "VersionRemarks": $('#VersionRemarks').val(),
//            "HubId": HubId
//        }
//    }


//    if (milestone != null && errorflag && Approvebuttonclick && userrequest) {
//        $.ajax({
//            type: "post",
//            url: ROOT + "Milestone/New_EditPMUMapping",
//            data: {
//                Milestone: milestone,
//            },
//            dataType: "json",
//            success: function (response) {
//                $('#addModal').modal('hide');
//                if (response != null) {
//                    console.log('filter', filter);
//                    window.location.href = ROOT + "Milestone/Index";
//                }
//                else {
//                    alert("Something went wrong");
//                }
//            },
//            error: function (err) {
//                var filter
//                alert(err.statusText);
//            }
//        });
//    }
//}

function cardedit() {
    var ProjectId = parseInt(pid);
    var Remarks = '';
    var ExtendedRemarks = '';
    var MilestoneId = cardddetailsmilestoneid;
    var ExtendedEndDate = $('#ExtendedDate').val();
    var CompletedEndDate = $('#ActualCompletedDate').val();

    var AccepptMailtrigger = $('input[name="AccepptMailtrigger"]:checked').val();
        var AccepptVersionCreation = $('input[name="AccepptVersionCreation"]:checked').val();

    var MailTriggerRequired = $('#AccepptMailtrigger').is(':checked') ? true : false;
        var IsNewVersion = $('#AccepptVersionCreation').is(':checked') ? true : false;
        var NewVersionName = $('#Version').val();
        if ($('#AccepptVersionCreation').is(':checked')) {
            if ($('#Version').val() == '') {
                $('#VersionError').text('Please enter the Version');
                errorflag = false;
                return false;
            } else {
                $('#VersionError').text(' ');
            }
        }

    if (CompletedStatus == 'Completed') {

        if (CompletedEndDate == '') 
        {
            $('.need-completed-date').html('Please select Completion Date');
            errorflag = false
            return false;
        }
        else {
            $('.need-completed-date').html('');
            errorflag = true
            flag = '';
        }

        var Remarks = $('#Remarks').val().trim();
        if (Remarks.length == 0) {
            $('#Remarkserror').html('Please enter the remarks');
            errorflag = false
            return false;
        }
        else {
            errorflag = true
        }
    }
    //else {
    //    if (ExtendedEndDate == '') {
    //        alert('Please select Completion Date');
    //        errorflag = false
    //        return false;
    //    }
    //    else {
    //        errorflag = true
    //        flag = '';
    //    }

    //    ExtendedRemarks = $('#extended-remarks').val().trim();
    //    if (ExtendedRemarks.length == 0) {
    //        $('.need-extended-remarks').html('Please enter the remarks');
    //        errorflag = false
    //        return false;
    //    }
    //    else {
    //        errorflag = true
    //    }
    //}
    else {
        ExtendedRemarks = $('#extended-remarks').val().trim();
        if (ExtendedRemarks.length == 0 || ExtendedEndDate.length == 0) {
            ExtendedEndDate.length == 0 ? $('.need-extended-date').html('Please select the extended date') : $('.need-extended-date').html('');
            ExtendedRemarks.length == 0 ? $('.need-extended-remarks').html('Please enter the remarks') : $('.need-extended-remarks').html('');
            return false;
        }
        else {
            errorflag = true
            flag = '';
        }
    }

    if ($('#RoleId').val() == '3' && userconfirmation) {
        if (CompletedStatus == 'Completed') {
            $('#UserConfirmationforCompleteMilestone').modal('show');
            userrequest = false;

        } else {
            if (!errorflag) {
                $('#UserConfirmationforenddate').modal('show');
                userrequest = false;
            }
        }
    }

    HubId = HubList.filter(item => item.HubName == HubForSave).map(item => item.HubId);

    if (CompletedStatus == 'Completed') {

        var milestone = {
            "ProjectId": ProjectId,
            "MilestoneId": MilestoneId,
            "StartDate": moment($('#StartDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "EndDate": moment($('#EndDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "MilestoneStatus": CompletedStatus,
            "ActualCompletedDate": CompletedEndDate,
            "Remarks": Remarks,
            "AccepptMailtrigger": MailTriggerRequired,
            "AccepptVersionCreation": IsNewVersion,
            "Buttoneflag": Buttoneflag,
            "NewVersionName": NewVersionName,
            "Remarks": Remarks,
            "SlNo": $('#SlNo').val(),
            "PMUVersion": $('#PMUVersion').val(),
            "CompletedStatus": CompletedStatus,
            'flag': flag,
            "PreviousEndDate": moment($('#EndDate').attr('data-previousvalue'), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "VersionRemarks": $('#VersionRemarks').val(),
            "HubId": HubId
        };
    }
    else {
        var milestone = {
            "ProjectId": ProjectId,
            "MilestoneId": MilestoneId,
            "StartDate": moment($('#StartDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "EndDate": moment($('#selectedendDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "MilestoneStatus": CompletedStatus,
            "ExtendedDate": ExtendedEndDate,
            "Remarks": Remarks,
            "AccepptMailtrigger": MailTriggerRequired,
            "AccepptVersionCreation": IsNewVersion,
            "Buttoneflag": Buttoneflag,
            "NewVersionName": NewVersionName,
            "Remarks": ExtendedRemarks,
            "SlNo": $('#SlNo').val(),
            "PMUVersion": $('#PMUVersion').val(),
            "CompletedStatus": CompletedStatus,
            'flag': flag,
            "PreviousEndDate": moment($('#EndDate').attr('data-previousvalue'), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "VersionRemarks": $('#VersionRemarks').val(),
            "HubId": HubId
        }
    }


    if (milestone != null && errorflag && Approvebuttonclick && userrequest) {
        $.ajax({
            type: "post",
            url: ROOT + "ProjectTracker/New_EditPMUMapping",
            data: {
                Milestone: milestone,
            },
            dataType: "json",
            success: function (response) {
                $('#addModal').modal('hide');
                $('#dependentMilestones').modal('hide');
                if (response.toLowerCase().includes("updated"))
                {
                    window.location.href = ROOT + "ProjectTracker/MileStoneBoard";
                }
                else {
                    alert(response);
                }
            },
            error: function (err) {
                var filter
                alert(err.statusText);
            }
        });
    }
}
$('#extended-remarks').keyup(function () {
    if ($('#extended-remarks').val() == '') {
        $('.need-extended-remarks').html('Please enter the remarks');
    } else {
        $('.need-extended-remarks').html('');
    }
})
$('#Remarks').keyup(function () {
    if ($('#Remarks').val() == '') {
        $('#Remarkserror').html('Please enter the remarks');
    } else {
        $('#Remarkserror').html('');
    }
})
$("#ExtendedDate").change(function () {
    if (($('#ExtendedDate').val()).length == 0) {
        $('.need-extended-date').html('Please select the extended date');
    } else {
        $('.need-extended-date').html('');
    }
})
$('#CompleteMilestone').click(function () {
    userrequest = true;
    userconfirmation = false;
    cardedit();
})
$('#endChangeDate').click(function () {
    flag = 'Pending For Approval';
    userrequest = true;
    userconfirmation = false;
    cardedit();
});
$('#EndNoButton').click(function () {
    $('#UserConfirmationforenddate').modal('hide');
})

Submodels = [
    {
        name: 'SequenceNo',
        label: 'Milestone Id',
        // width: 40,
        resizable: true,
        hidden: true,
        ignoreCase: true,
    },
    {
        name: 'TaskDescription',
        resizable: true,
        label: 'Milestone No',
        //width: 90,
        ignoreCase: true,

    },
    {
        name: 'SubMilestoneName',
        resizable: true,
        label: 'Milestone Name',
        //width: 90,
        ignoreCase: true,
    },
    {
        name: 'SetRelation',
        resizable: true,
        label: 'Set Relation',
        //width: 90,
        ignoreCase: true,

    },
    {
        name: 'StartDate',
        label: 'Start Date',
        width: 100,
        resizable: true,
        //hidden: true,
        //sorttype:'Date',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'EndDate',
        resizable: true,
        label: 'End Date',
        sorttype: 'Date',
        width: 100,
        //hidden: true,
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UpdatedStartDate',
        label: 'Revised Start Date',
        width: 100,
        resizable: true,
        //hidden: true,
        //sorttype:'Date',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UpdatedEndDate',
        resizable: true,
        label: 'Revised End Date',
        sorttype: 'Date',
        width: 100,
        //hidden: true,
        ignoreCase: true,
        sortable: false,

    },


]
models = [
    {
        name: 'SlNo',
        label: 'Sl No',
        width: 60,
        align:'center',
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'TaskDesc',
        resizable: true,
        width: 100,
        label: 'Tasks',
        ignoreCase: true,
        sortable: false

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
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UpdatedEndDate',
        resizable: true,
        label: 'Revised End Date',
        sorttype: 'Date',
        width: 100,
        ignoreCase: true,
        sortable: false,
    }
]
function CreateJqGrid(data) {

    $.jgrid.gridUnload('#jqgrid');
    
    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: models,
        loadonce: true,
        viewrecords: true,
        sortable: false,
        rowNum: 10000,
        gridview: true,
        scroll: 1,
        pager: '#pager',
        userDataOnFooter: true,
        gridComplete: function () {
            var objRows = $("#jqgrid tbody tr");
            var objHeader = $("#jqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            $('.submilestoneexist').each(function (i, obj) {
                console.log(obj.textContent);
                if (obj.textContent != 'True') {
                    var td = $(obj).parent().find('td.sgcollapsed');
                    $(td).unbind("click").html("");
                }
            })

            var $grid = $('#jqgrid');
            // $("#jqgrid").jqGrid("setGridParam", { beforeSelectRow: function (rowid, e) { return $(e.target).is("input:checkbox"); } });
            var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
            $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
            $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
            parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
        }

    });

    

}
function dependentMilestoneDetails(ProjectId, MilestoneId) {
    SelecteDprojectId = ProjectId;
    $.ajax({
        async: true,
        type: "post",
        url: ROOT + "ProjectTracker/DependentMilestoneList",
        data: { ProjectId: ProjectId, MilestoneId: MilestoneId },
        //  contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            
            dependentMilestoneDetailsList = response;
            if (EndDateExtensionflag) {
                displayUpdatedatesdetails(MilestoneId, ProjectId);
               // EndDateExtensionflag = false;
            } else {
                
                SubMilestoneDataList(ProjectId)
                $('#dependentMilestones').modal('show');
                $("#jqgrid").jqGrid("clearGridData", true);
                jQuery('#jqgrid').jqGrid('setGridParam', { data: response });
                jQuery('#jqgrid').trigger('reloadGrid');
                CreateJqGrid(response);
                if (dependentMilestonedisplay) {
                    $("#jqgrid").jqGrid('hideCol', 'UpdatedStartDate');
                    $("#jqgrid").jqGrid('hideCol', 'UpdatedEndDate');
                } else {
                    $("#jqgrid").jqGrid('showCol', 'UpdatedStartDate');
                    $("#jqgrid").jqGrid('showCol', 'UpdatedEndDate');
                }
            }

        },
        error: function (err) {
            var filter
            alert(err.statusText);
        }
    });
}
function SubMilestoneDataList(ProjectId) {
    var SubMilestonedata = dependentMilestoneDetailsList.filter(obj => obj.SubmilestoneExit == 'True');
    DependentSub_Milestones = [];
    if (SubMilestonedata.length > 0) {
        for (var j = 0; j < SubMilestonedata.length; j++) {
            var SubMilestone_Id = SubMilestonedata[j].SequenceNo;
            console.log(SubMilestone_Id)
            $.ajax({
                async: false,
                type: "Get",
                url: ROOT + "Master/GetProjectSummarySubMilestoneDetails",
                data: { ProjectId: ProjectId, SequenceNo: SubMilestone_Id },
                //  contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //DependentSub_Milestones.push(response)
                    DependentSub_Milestones = $.merge(DependentSub_Milestones, response);

                },
                error: function (err) {
                    var filter
                    alert(err.statusText);
                }
            });
        }
    }
}
function displayUpdatedatesdetails(MilestoneId, ProjectId) {
     DependentSub_Milestones = [];
    SubMilestoneDataList(ProjectId)
    var parent_Index = '';
  
    if (DisplaySubGridValue == 'True' && DependentSub_Milestones.length>0) {
        var index = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == MilestoneId);
        DependentSub_Milestones[index].UpdatedStartDate = DependentSub_Milestones[index].StartDate;

        DependentSub_Milestones[index].UpdatedEndDate = UpdatedEndDate_User;
        parent_Index= SubMilestoneDatesDisplay(index + 1, DependentSub_Milestones[index].SequenceNo);
       
    }



    if (dependentMilestoneDetailsList.length>0)
    {
        if (DisplaySubGridValue == '') {
            var index = dependentMilestoneDetailsList.findIndex(obj => obj.MilestoneId == MilestoneId);
            dependentMilestoneDetailsList[index].UpdatedStartDate = dependentMilestoneDetailsList[index].StartDate;

            dependentMilestoneDetailsList[index].UpdatedEndDate = UpdatedEndDate_User;
            var SequnceNo = dependentMilestoneDetailsList[index].SequenceNo;
        }
        else {
            var index = parent_Index;
        }
        for (var i = index + 1; i < dependentMilestoneDetailsList.length; i++) {
            var Setrelation = dependentMilestoneDetailsList[i].SetRelation;
            if (Setrelation != '' && Setrelation != undefined && Setrelation != null) {
                var Setrelation_Index = dependentMilestoneDetailsList.findIndex(obj => obj.SequenceNo == Setrelation);

            } else {
                var Setrelation_Index = dependentMilestoneDetailsList.findIndex(obj => obj.SequenceNo == dependentMilestoneDetailsList[index].SequenceNo);

            }
            var SetrelationEndDate = dependentMilestoneDetailsList[Setrelation_Index].UpdatedEndDate;
            EndDate = new Date(SetrelationEndDate.split("/").reverse().join("-"));
            StartDate = moment(EndDate).add(1, 'days').format('DD/MM/YYYY');
            dependentMilestoneDetailsList[i].UpdatedStartDate = StartDate
            if (dependentMilestoneDetailsList[i].SubmilestoneExit == 'True') {
                var index = DependentSub_Milestones.findIndex(obj => obj.SequenceNo == dependentMilestoneDetailsList[i].SequenceNo);
                DependentSub_Milestones[index].UpdatedStartDate = StartDate;
                var enddate = new Date(StartDate.split("/").reverse().join("-"));
                var updatedEndDate = moment(enddate).add(parseInt(DependentSub_Milestones[index].Duration)-1, 'days').format('DD/MM/YYYY');
                DependentSub_Milestones[index].UpdatedEndDate = updatedEndDate;
                var nextstartdate = new Date(updatedEndDate.split("/").reverse().join("-"));
                StartDate = moment(nextstartdate).add(1, 'days').format('DD/MM/YYYY');
                DependentSub_Milestones[index + 1].UpdatedStartDate = StartDate;
                SubMilestoneDatesDisplay(index+1, dependentMilestoneDetailsList[i].SequenceNo) 
            } else {

                var enddate = new Date(StartDate.split("/").reverse().join("-"));
                var updatedEndDate = moment(enddate).add(parseInt(dependentMilestoneDetailsList[i].Duration)-1, 'days').format('DD/MM/YYYY');
                dependentMilestoneDetailsList[i].UpdatedEndDate = updatedEndDate;
            }
        }
    }
    $('#dependentMilestones').modal('show');
    $("#jqgrid").jqGrid("clearGridData", true);
    jQuery('#jqgrid').jqGrid('setGridParam', { data: dependentMilestoneDetailsList });
     jQuery('#jqgrid').trigger('reloadGrid');
    CreateJqGrid(dependentMilestoneDetailsList);
    $("#jqgrid").jqGrid('showCol', 'UpdatedStartDate');
    $("#jqgrid").jqGrid('showCol', 'UpdatedEndDate');
   
}
function SubMilestoneDatesDisplay(index,SequnceNo) {

    for (var i = index; i < DependentSub_Milestones.length; i++) {

        if (DependentSub_Milestones[i].SequenceNo == SequnceNo) {
            var Setrelation = DependentSub_Milestones[i].SetRelation;
            if (Setrelation != '' && Setrelation != '0' && Setrelation != undefined) {
                var Setrelation_Index = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == Setrelation);

            } else {
                var Setrelation_Index = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == DependentSub_Milestones[i].SubMilestoneId);

            }
            var SetrelationEndDate = DependentSub_Milestones[Setrelation_Index].UpdatedEndDate;
            EndDate = new Date(SetrelationEndDate.split("/").reverse().join("-"));
            StartDate = moment(EndDate).add(1, 'days').format('DD/MM/YYYY');
            DependentSub_Milestones[i].UpdatedStartDate = StartDate;
            var enddate = new Date(StartDate.split("/").reverse().join("-"));
            var updatedEndDate = moment(enddate).add(parseInt(DependentSub_Milestones[i].Duration)-1, 'days').format('DD/MM/YYYY');
            DependentSub_Milestones[i].UpdatedEndDate = updatedEndDate;
        }
    }
    ;
    var data = DependentSub_Milestones.filter(obj => obj.SequenceNo == SequnceNo)
    var lasetSubMilestone = data[data.length - 1].SetRelation;
    var multipleSameSubmilestones = data.filter(obj => obj.SetRelation == lasetSubMilestone);
    var LastDate = [];
    $.each(multipleSameSubmilestones, function (i, obj) {

        var enddate = multipleSameSubmilestones[i].UpdatedEndDate;
        if (enddate != '' && enddate != null) {

            var nextenddate = new Date(enddate.split("/").reverse().join("-"));
            LastDate.push(new Date(nextenddate));
        }
    })
    var highestDate = new Date(Math.max.apply(null, LastDate));
    //var highestDate = data[data.length - 1].EndDate;

    highestDate = moment(highestDate).format('DD/MM/YYYY');

    var StartingDate = new Date(data[0].UpdatedStartDate.split("/").reverse().join("-"));
    var Finaldate = new Date(highestDate.split("/").reverse().join("-"));
    var timeDiff = Finaldate.getTime() - StartingDate.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalDuration = daysDiff + 1;
    parent_Index = dependentMilestoneDetailsList.findIndex(obj => obj.SequenceNo == SequnceNo);
    dependentMilestoneDetailsList[parent_Index].UpdatedStartDate = moment(StartingDate).format('DD/MM/YYYY');
    //dependentMilestoneDetailsList[parent_Index].Duration = totalDuration;

    dependentMilestoneDetailsList[parent_Index].UpdatedEndDate = highestDate;
 
    return parent_Index;
}

$('#btnApprove').click(function () {
    Approvebuttonclick = false;
    Buttoneflag = 'Approve';
    flag = '';
   var d= cardedit();
    var ProjectId = parseInt(pid);
    var MilestoneId = cardddetailsmilestoneid;
    UpdatedEndDate_User = $('#EndDate').val();
    if (errorflag) {
        EndDateExtensionflag = true;
        $('#displaySpanmsg').html('On Approving the Proposed end date the dependent milestones date(s) will be updated.Please enter appropriate remarks on approving, Are you sure you want to proceed ?</b>');
        $('#btndepent').attr('hidden', true);
        $('#btnok').show();
        $('#BtnCanceldependent').show();
        dependentMilestonedisplay = false;

        dependentMilestoneDetails(ProjectId, MilestoneId);
    }
    //cardedit();
})
$('#btnReject').on('click', function () {
  
    Buttoneflag = 'reject'
    flag ='Rejected'
    cardedit();
})



$('#SearchUser').on('click', function () {
    
    var hubId = $('#HubId').val().join(',');
    var projectId = $("#Project_ID").val().join(',');
    var statusId = $('#StatusId').val().join(',');

    GetSearchedData(hubId, projectId, statusId)
   
});

function GetSearchedData(hubId, projectId, statusId) {

    $.ajax({
        type: "POST",
        url: ROOT + 'ProjectTracker/GetMyMileStoneSearchedData',
        data: { "HubId": hubId, "ProjectId": projectId, "StatusId": statusId },
        dataType: "json",
        success: function (response) {
            data = response;
            var a = 1;
            var b = 1;
            var c = 1;
            var d = 1;
            
            $(".hide_section").empty();
            $(".count_num").empty();
            $('#cardscount').empty();
            $('#cardscount').html('<b>' + response.length + '</b>');

            $.each(response, function (i, obj) {
                if (obj.UserName != null) {
                    var pIndex = obj.UserName.lastIndexOf(' ');
                    var pLastName = '';
                    if (pIndex != -1) {
                        pLastName = obj.UserName[pIndex + 1];
                    }
                    var substringValue = (obj.UserName[0] + pLastName).toUpperCase();
                }

                if (response[i].MilestoneStatus == "Completed") {

                    $(".count_completed").text(a);
                    var substringValue = (obj.UserName != null && obj.UserName != "") ? obj.UserName.substring(0, 2).toUpperCase() : " ";
                    var newId = `<div class="hide_section">
        <div class="open_list">
            <div>
                <div class="list_card">
                    <div class="hub_project">
                         `+ obj.Hub + ` - (` + obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list">
                       `+ obj.MilestoneName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-info">`+ obj.MilestoneStatus + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                           `+ obj.ModifiedDate + `
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>`
                    var $newId = $(newId);
                    $('.Completed').append($newId);
                    a = a + 1;
                }
                else if (response[i].MilestoneStatus == "OverDue") {
                    $(".count_overdue").text(b);
                    var substringValue = (obj.UserName != null && obj.UserName != "") ? obj.UserName.substring(0, 2).toUpperCase() : " ";
                    var newId = `<div class="hide_section">
        <div class="open_list">
            <div>
                <div class="list_card">
                    <div class="hub_project">
                        `+ obj.Hub + ` - (` + obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list">
                       `+ obj.MilestoneName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-info">`+ obj.MilestoneStatus + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                           `+ obj.ModifiedDate + `
                        </p>
                    </div>
                                 
                    ${obj.IsAlreadyRequest == 0 ? `
                    <div class="comments">
                        <span title="Project Details" onclick="EditeMyMilestone('${obj.ProjectId}', '${obj.StartDate}', '${obj.EndDate}', '${obj.MilestoneStatus}', '${obj.DisplaySubMilestone}', ${obj.MilestoneId}, ${obj.SlNo}, '${obj.PMUVersion}', '${obj.MilestoneName}',
                        '${obj.ProjectCode}', '${obj.ProjectName}', '${obj.Hub}', '${obj.IsWeekendExcluded}')">
                            <i class="fa fa-comment"></i>
                        </span>
                    </div>
                ` : ''} 
                </div>
            </div>
        </div>
        </div>`
                    var $newId = $(newId);
                    $('.overdue_list').append($newId);
                    b = b + 1;
                }
                else if (response[i].MilestoneStatus == "In Progress") {
                    $(".count_inprogress").text(c);
                    var substringValue = (obj.UserName != null && obj.UserName != "") ? obj.UserName.substring(0, 2).toUpperCase() : "";
                    var newId = `<div class="hide_section">
            <div class="open_list">
            <div>
                <div class="list_card">
                    <div class="hub_project">
                        `+ obj.Hub + ` - (` + obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list">
                       `+ obj.MilestoneName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-info">`+ obj.MilestoneStatus + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                           `+ obj.ModifiedDate + `
                        </p>
                    </div>
                    ${obj.IsAlreadyRequest == 0 ? `
                    <div class="comments">
                        <span title="Project Details" onclick="EditeMyMilestone('${obj.ProjectId}', '${obj.StartDate}', '${obj.EndDate}', '${obj.MilestoneStatus}', '${obj.DisplaySubMilestone}', ${obj.MilestoneId}, ${obj.SlNo}, '${obj.PMUVersion}', '${obj.MilestoneName}',
                        '${obj.ProjectCode}', '${obj.ProjectName}', '${obj.Hub}', '${obj.IsWeekendExcluded}')">
                            <i class="fa fa-comment"></i>
                        </span>
                    </div>
                ` : ''} 
                </div>
            </div>
            </div>
        </div>`
                    var $newId = $(newId);
                    $('.list_inProgress').append($newId);
                    c = c + 1;
                }
                else if (response[i].MilestoneStatus == "Open") {
                    $(".count_open").text(d);
                    var substringValue = (obj.UserName != null && obj.UserName != "") ? obj.UserName.substring(0, 2).toUpperCase() : "";
                    var newId = `<div class="hide_section">
        <div class="open_list">
            <div>
                <div class="list_card">
                    <div class="hub_project">
                        `+ obj.Hub + ` - (` + obj.ProjectCode + `)` + obj.ProjectName + `
                    </div>
                    <div class="task_list">
                       `+ obj.MilestoneName + `
                    </div>
                    <div class="project_date">
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.StartDate + `
                        </span>
                        <span>-</span>
                        <span>
                            <i class="fa fa-calendar"></i>`+ obj.EndDate + `
                        </span>
                    </div>
                    <div class="status">
                        <span class="text-info">`+ obj.MilestoneStatus + `</span>
                    </div>
                    <div class="user_name_list">
                        <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                    </div>
                    <div class="last_modified">
                        <p class="mb-0">
                           `+ obj.ModifiedDate + `
                        </p>
                    </div>
                     ${obj.IsAlreadyRequest == 0 ? `
                    <div class="comments">
                        <span title="Project Details" onclick="EditeMyMilestone('${obj.ProjectId}', '${obj.StartDate}', '${obj.EndDate}', '${obj.MilestoneStatus}', '${obj.DisplaySubMilestone}', ${obj.MilestoneId}, ${obj.SlNo}, '${obj.PMUVersion}', '${obj.MilestoneName}',
                        '${obj.ProjectCode}', '${obj.ProjectName}', '${obj.Hub}', '${obj.IsWeekendExcluded}')">
                            <i class="fa fa-comment"></i>
                        </span>
                    </div>
                ` : ''} 
                </div>
            </div>
            </div>
        </div>`
                    var $newId = $(newId);
                    $('.open_list_progress').append($newId);
                    d = d + 1;
                }
            });
        }
    });
}

$("#SearchProject").on("keydown", function (event) {
    // Check if the pressed key is Backspace (keyCode 8) or "Backspace"
    if ((event.keyCode != 8 || event.key != "Backspace")) {
        var value = $(this).val().trim().toLowerCase();
        if ($('#SearchProject').val().trim().length > 3) {
            /*window.location.reload();*/
            MyMilestone('', value, '', 'search', email);

        }
    }
    filter = '';
});

$('#Search_btn').on('click', function () {
    
    SearchMilestone();
});

function SearchMilestone() {
    var type = 'search';

    $(".m-block__item").parent('.col-lg-3').remove();
    filter = $('#SearchProject').val().toLowerCase();

    $.trim(filter);
    
        if (jQuery.inArray(filter, StatusList) != -1) {
            MyMilestone(filteruserid, '', $.trim(filter), type, email);
        } else {
            MyMilestone(filteruserid, $.trim(filter), '', type, email);
        }
}

//$('#EndDate').on('change', function () {
//    EndDateExtensionflag = true;
//    var startDate = moment($('#StartDate').val(), 'DD/MM/YYYY');
//    UpdatedStartDate_User = $('#StartDate').val();
//    var endDate = moment($('#EndDate').val(), 'DD/MM/YYYY');
//    UpdatedEndDate_User = $('#EndDate').val();
//    var prevenddate = moment($('#selectedendDate').val(), 'DD/MM/YYYY');


//    //var prevEndDate = moment($('#selectedendDate').val(), 'DD/MM/YYYY')
//    //var endDate = moment($('#EndDate').val(), 'DD/MM/YYYY');

//    if (CompletedStatus == 'Completed') {


//        if (new Date(prevenddate).getTime() !== new Date(endDate).getTime()) {
//            alert('Milestone cannot be completed on extending the End Date')
//            CompletedStatus = 'Open';
//            $('#open').removeClass('-outline-success');
//            $('#completed').addClass('-outline-success');
//            $('#completed').removeClass('completed_status');
//            $('.DisplayCompletedDate').hide();
//            $('#EndDate').removeClass('input-disabled');
//            $("#EndDate").datepicker("destroy");
//            ValidationAlertDisplay = false;
//            $('#EndDate').val($('#selectedendDate').val());

//        } else {

//            $('.DisplayCompletedDate').show();
//            $('#EndDate').addClass('input-disabled');
//            $('#EndDate').removeClass('hasDatepicker');

//            $("#EndDate").datepicker("option", "disabled", false);
//            $("#EndDate").datepicker("destroy");
//        }
//    }


//    return false;

//});

//$('#ActualCompletedDate').on('change', function () {

//    var ActualCompletedDate = moment($('#ActualCompletedDate').val(), 'DD/MM/YYYY');
//    var endDate = moment($('#EndDate').val(), 'DD/MM/YYYY');

//    if ($('#RoleId').val() == '3') {
//        if (ActualCompletedDate < endDate) {
//            alert('can not select the End date is less than the displayed End Date');
//            $('#open').removeClass('-outline-success');
//            $('#completed').addClass('-outline-success');
//            $('#completed').removeClass('completed_status');
//            $('.DisplayCompletedDate').hide();
//        }
//    }

//    if (new Date(ActualCompletedDate).getTime() !== new Date(endDate).getTime())
//    {
//        alert('Milestone cannot be completed on extending the End Date')
//        $('#date-ext').removeClass('-outline-success');
//        $('#completed').addClass('-outline-success');
//        $('#completed').removeClass('completed_status');
//        $('.DisplayCompletedDate').hide();
//    }
//    return false;
//});

$('#BtnCanceldependent').on('click', function () {
    $('#dependentMilestones').modal('hide');
})

$('#AccepptVersionCreation').change(function () {
   
    if ($(this).is(':checked')) {

        $.ajax({
            type: "post",
            url: ROOT + "ProjectTracker/GetVersion",
            data: { ProjectId: cardddetailsProjectId },
            dataType: "json",
            success: function (response) {
                console.log('response', response);
                $('#Version').val(response);
                $('#VersionError').text('');
                $('#VersionRemarks').val('');
                $('#VersionRemarkspop').modal('show');
                $('#Versionchange').show();
            },
            error: function (err) {
                var filter
                alert(err.statusText);
            }
        });
    } else {
        $('#Versionchange').hide();
    }
});

$('#VersionAcept').click(function () {
    var version = $('#Version').val();
    if (version.length == 0) {
        $('#VersionError').text('Please enter the Version');
       // $('#VersionRemarkspop').modal('show');
        $('#Versionchange').show();
    } else {
        $('#Versionchange').hide();
        //$('#userconfirmationforversion').modal('hide');
    }
})
//$('#CancelVersion').click(function () {

//    $('#userconfirmationforversion').modal('hide');
//    $('#AccepptVersionCreation').prop('checked', false);
//})
$('#btnCancel').click(function () {
    $('#addModal').modal('hide');
    $('#AccepptVersionCreation').prop('checked', false);
})
$('#btndepent').click(function () {
    $('#dependentMilestones').modal('hide');
})

$('#SaveVerionRemarks').click(function () {
    VersionReamrks = $('#VersionRemarks').val();
    var Version = $('#Version').val();
    if (Version == '') {
        $('#VersionError').text('Please Enter the Version');
        return false;
    }

    if (VersionReamrks == '') {
        $('#VersionRemarksError').text('Please Enter the Remarks');
        return false;
    } else {
        $('#VersionRemarkspop').modal('hide');
    }
})

$('#CancelVerionRemarks').click(function () {
    $('#VersionRemarkspop').modal('hide');
    $('#AccepptVersionCreation').prop('checked', false);
    $('#Versionchange').hide();

})

$('#global-search').on('input', function () {
    var searchValue = $.trim($(this).val().toLowerCase());
    var cardSections = $('.hide_section');
    var totalProjects = 0;
    var open_count = 0, inprogress_count = 0, completed_count = 0, overdue_count = 0;
    cardSections.each(function () {
        var cardDetailsSearch = $(this).find('.open_list');
        var cardText = cardDetailsSearch.text().toLowerCase();
       
        if (cardText.includes(searchValue)) {
            $(this).css('display', 'block');
            var status = $(this).find('.text-info').html();
            if (status == "Open") {
                open_count++;
            }
            else if (status == "In Progress") {
                inprogress_count++
            }
            else if (status == "OverDue") {
                overdue_count++;
            }
            else if (status == "Completed") {
                completed_count++
            }

        } else {
            $(this).css('display', 'none');
        }
        totalProjects = open_count + inprogress_count + completed_count + overdue_count;
        $("#cardscount").text(totalProjects);
        $(".count_open").text(open_count);
        $(".count_inprogress").text(inprogress_count);
        $(".count_completed").text(completed_count);
        $(".count_overdue").text(overdue_count);

    });
});
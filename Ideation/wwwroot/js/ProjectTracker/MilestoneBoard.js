var selectedStatus = '';
var extendEndDate = '';
var extendStartDate = '';
var sortedOrder = "";
var projectStartDate;
var a = 0;
var b = 0;
var c = 0;
var d = 0;
var startDate = "";
var endDate = "";
var header = [];
var details = [];
var prjFullName = "";
var selectedTask = 0;
var selectedSlNo = 0;


$(document).ready(function () {

    var arr1 = $('#ProjectHeaders').val();
    var arr2 = $('#ProjectMyMilestoneDetails').val();

    if (arr1 != "" && arr1 != null && arr1 != undefined) {
        header = $.parseJSON(arr1);
    }

    if (arr2 != "" && arr2 != null && arr2 != undefined) {
        details = $.parseJSON(arr2);
    }

    if (header.length > 0) {
        prjFullName = header[0].HubName + '-(' + header[0].ProjectCode + ')' + header[0].ProjectName;
        $("#projhub").text(prjFullName);
        $('.prj-header').text(prjFullName);
        projectStartDate = header[0].ProjectStartDate;
    }

    $.each(details, function (i, obj) {

        var substringValue = "";

        if (obj.UserName != null) {
            var pIndex = obj.UserName.lastIndexOf(' ');
            var pLastName = '';
            if (pIndex != -1) {
                pLastName = obj.UserName[pIndex + 1];
            }
            substringValue = (obj.UserName[0] + pLastName).toUpperCase();
        }

        var isKPI = (obj.IsKPI && header[0].IsKPIIncluded) ? "color-red" : "";

        if (obj.TaskStatus == "Completed") {

            var newId = `<div class="hide_section">
                            <div class="open_list">
                                <div>
                                    <div class="list_card">
                                        <div class="hub_project">
                                             ${prjFullName}
                                        </div>
                                        <div class="task_list ${isKPI}">
                                           `+ obj.TaskName + `
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
                                            <span class="text-info">`+ obj.TaskStatus + `</span>
                                        </div>
                                        <div class="user_name_list">
                                            <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                                        </div>
                                        <div class="last_modified">
                                            <p class="mb-0">
                                               `+ header[0].LastModifiedDate + `
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

        else if (obj.TaskStatus == "OverDue") {

            var newId = `<div class="hide_section">
                            <div class="open_list">
                                <div>
                                    <div class="list_card">
                                        <div class="hub_project">
                                            ${prjFullName}
                                        </div>
                                        <div class="task_list ${isKPI}">
                                           `+ obj.TaskName + `
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
                                            <span class="text-info">`+ obj.TaskStatus + `</span>
                                        </div>
                                        <div class="user_name_list">
                                            <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                                        </div>
                                        <div class="last_modified">
                                            <p class="mb-0">
                                               `+ header[0].LastModifiedDate + `
                                            </p>
                                        </div>
                                        ${obj.IsAlreadyRequest == 0 ? `
                                        <div class="comments">
                                            <span title="Project Details" onclick="TaskExtendORComplete('${obj.TaskId}')">
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

        else if (obj.TaskStatus == "In Progress") {

            var newId = `<div class="hide_section">
                            <div class="open_list">
                                <div>
                                    <div class="list_card">
                                        <div class="hub_project">
                                            ${prjFullName}
                                        </div>
                                        <div class="task_list ${isKPI}">
                                            `+ obj.TaskName + `
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
                                            <span class="text-info">`+ obj.TaskStatus + `</span>
                                        </div>
                                        <div class="user_name_list">
                                            <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                                        </div>
                                        <div class="last_modified">
                                            <p class="mb-0">
                                                `+ header[0].LastModifiedDate + `
                                            </p>
                                        </div>
                                        ${obj.IsAlreadyRequest == 0 ? `
                                        <div class="comments">
                                            <span title="Project Details" onclick="TaskExtendORComplete('${obj.TaskId}')">
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

        else if (obj.TaskStatus == "Open") {

            var newId = `<div class="hide_section">
                            <div class="open_list">
                                <div>
                                    <div class="list_card">
                                        <div class="hub_project">
                                            ${prjFullName}
                                        </div>
                                        <div class="task_list ${isKPI}">
                                           `+ obj.TaskName + `
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
                                            <span class="text-info">`+ obj.TaskStatus + `</span>
                                        </div>
                                        <div class="user_name_list">
                                            <span class="user_profile">`+ substringValue + `</span><span class="">` + obj.UserName + `</span>
                                        </div>
                                        <div class="last_modified">
                                            <p class="mb-0">
                                               `+ header[0].LastModifiedDate + `
                                            </p>
                                        </div>
                                        ${obj.IsAlreadyRequest == 0 ? `
                                        <div class="comments">
                                            <span title="Project Details" onclick="TaskExtendORComplete('${obj.TaskId}')">
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

        $(".count_completed").text(a);
        $(".count_overdue").text(b);
        $(".count_inprogress").text(c);
        $(".count_open").text(d);

    });

});
function isWeekend(date) {
    var day = date.getDay();
    return [0, 6].indexOf(day) === -1;
}
function TaskExtendORComplete(TaskId) {

    $("#completed").removeClass("complete_exten");
    $("#date-ext").removeClass("extension");
    $('.DisplayCompletedDate').hide();
    $('.display-extended-date').hide();

    selectedTask = TaskId;

    var obj = details.filter(item => item.TaskId == TaskId)[0];

    selectedSlNo = obj.SlNo;
    var taskName = obj.TaskName;
    var eDate = obj.EndDate;
    var sDate = obj.StartDate;

    if (header[0].IsWeekendExcluded) {

        extendStartDate = '';
        extendEndDate = '';

        //for approving
        extendStartDate = new Date(eDate);
        extendStartDate.setDate(extendStartDate.getDate() + 1);
        if (extendStartDate.getDay() == 6) {
            extendStartDate.setDate(extendStartDate.getDate() + 1);
        }
        if (extendStartDate.getDay() == 0) {
            extendStartDate.setDate(extendStartDate.getDate() + 1);
        }

        //for extending
        var extendEndDate = new Date(eDate);
        if (extendEndDate.getDay() == 6) {
            extendEndDate.setDate(extendEndDate.getDate() + 1);
        }
        if (extendEndDate.getDay() == 0) {
            extendEndDate.setDate(extendEndDate.getDate() + 1);
        }

        $('#ExtendedDate').datepicker("destroy");
        $('#ExtendedDate').datepicker({
            dateFormat: 'dd/mm/yy',
            autoclose: true,
            changeMonth: true,
            minDate: new Date(extendStartDate),
            beforeShowDay: function (date) {
                return [isWeekend(date), ''];
            }
        });

        $('#ActualCompletedDate').datepicker("destroy");
        $('#ActualCompletedDate').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            minDate: new Date(projectStartDate),
            maxDate: new Date(extendEndDate),
            autoclose: true,
            beforeShowDay: function (date) {
                return [isWeekend(date), ''];
            }
        });
    }
    else {
        extendStartDate = '';
        extendEndDate = '';

        //for approving
        extendStartDate = new Date(eDate);
        extendStartDate.setDate(extendStartDate.getDate() + 1);

        //for extending
        extendEndDate = new Date(eDate);

        $('#ExtendedDate').datepicker("destroy");
        $('#ExtendedDate').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            autoclose: true,
            minDate: new Date(extendStartDate),
        });

        $('#ActualCompletedDate').datepicker("destroy");
        $('#ActualCompletedDate').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            minDate: new Date(projectStartDate),
            maxDate: new Date(extendEndDate),
            autoclose: true,
        });
    }

    var endDate = moment(eDate).format('DD/MM/YYYY');
    var startDate = moment(sDate).format('DD/MM/YYYY');

    $("#milestone").val(taskName);
    $("#StartDate").val(startDate);
    $("#EndDate").val(endDate)
    $("#EndDate").attr('data-previousvalue', endDate);

    $('#Complete_DateExtension_ModalPopup').modal('show');

};
$(".status").click(function () {

    selectedStatus = $(this).text();

    $('#ActualCompletedDate').val('');
    $('.need-completed-date').html('');
    $('#comp-remarks').val('');
    $('.need-completed-remarks').html('');

    $('#ExtendedDate').val('');
    $('.need-extended-date').html('');
    $('#extended-remarks').val('');
    $('.need-extended-remarks').html('');

    if (selectedStatus == 'Completed') {

        $('#ActualCompletedDate').datepicker("setDate", new Date(extendEndDate));

        $('.display-extended-date').hide();

        $.ajax({
            url: ROOT + 'ProjectTracker/CheckMilestoneCanBeCompleted',
            data: {
                ProjectId: header[0].ProjectId,
                SlNo: selectedSlNo,
                Hub: header[0].HubId
            },
            type: 'POST',
            success: function (result) {

                if (result.length > 0) {

                    $('.DisplayCompletedDate').hide();

                    $('#displaySpanmsg').html('<b>Dependent milestone is not Completed<b/>');
                    $('#btndepent').removeAttr('hidden');
                    $('#btnok').hide();
                    $('#BtnCanceldependent').hide();

                    CreateJqGrid(result);
                    $("#jqgrid").jqGrid('hideCol', 'UpdatedStartDate');
                    $("#jqgrid").jqGrid('hideCol', 'UpdatedEndDate');

                    $('#dependentMilestones').modal('show');

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
    else if (selectedStatus == 'Date Extension') {
        $('.DisplayCompletedDate').hide();
        $('.display-extended-date').show();
    }
});
$("#btnSubmit").click(function () {

    if (selectedStatus == 'Completed') {

        var Remarks = $('#comp-remarks').val().trim();
        if (Remarks.length == 0) {
            $('.need-completed-remarks').html('Please enter the remarks');
            return false;
        }

    }
    else {

        var ExtendedDate = $("#ExtendedDate").val().trim();
        var ExtendedRemarks = $('#extended-remarks').val().trim();

        if (ExtendedRemarks.length == 0 || ExtendedDate.length == 0) {
            ExtendedDate.length == 0 ? $('.need-extended-date').html('Please select the extended date') : $('.need-extended-date').html('');
            ExtendedRemarks.length == 0 ? $('.need-extended-remarks').html('Please enter the remarks') : $('.need-extended-remarks').html('');
            return false;
        }

    }

    if (selectedStatus != 'Completed') {

        $('#btndepent').attr('hidden', true);
        $('#btnok').show();
        $('#BtnCanceldependent').show();
        $('#displaySpanmsg').html('On Extending end date the dependent milestones date(s) will be updated. Are you sure you want to proceed ?</b>');

        $.ajax({
            url: ROOT + 'ProjectTracker/PMUmappingData',
            type: 'POST',
            async: false,
            cache: false,
            dataType: 'JSON',
            data: {
                ProjectId: header[0].ProjectId,
                Hub: header[0].HubId,
                PMUVersion: header[0].PMUVersion
            },

            success: function (response) {
                sortedOrder = slNoSortingArray(response.PMUMappingDetails);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });

        $.ajax({
            type: "get",
            url: ROOT + "ProjectTracker/GetMilestoneRevisedDates",
            data: {
                ProjectId: header[0].ProjectId,
                MilestoneId: selectedTask,
                SlNo: selectedSlNo,
                PMUVersion: header[0].PMUVersion,
                StartDate: $('#StartDate').val(),
                EndDate: $('#ExtendedDate').val(),
                Hub: header[0].HubId,
                SortedOrder: sortedOrder
            },
            dataType: "JSON",
            success: function (response) {

                CreateJqGrid(response);
                $("#jqgrid").jqGrid('showCol', 'UpdatedStartDate');
                $("#jqgrid").jqGrid('showCol', 'UpdatedEndDate');

                $('#dependentMilestones').modal('show');

            },
            error: function (err) {
                alert(err.statusText);
            }
        });

    }
    else {
        sumbitData();
    }
});
$('#btnok').click(function () {
    sumbitData();
});
function sumbitData() {

    var CompletedRemarks = '';
    var ExtendedRemarks = '';
    var ExtendedEndDate = $('#ExtendedDate').val();
    var CompletedEndDate = $('#ActualCompletedDate').val();

    if (selectedStatus == 'Completed') {
        if (CompletedEndDate == '') {
            $('.need-completed-date').html('Please select Completion Date');
            return false;
        }
        else {
            $('.need-completed-date').html('');
        }

        var CompletedRemarks = $('#comp-remarks').val().trim();
        if (CompletedRemarks.length == 0) {
            $('.need-completed-remarks').html('Please enter the remarks');
            return false;
        }
    }
    else {
        ExtendedRemarks = $('#extended-remarks').val().trim();
        if (ExtendedRemarks.length == 0 || ExtendedEndDate.length == 0) {
            ExtendedEndDate.length == 0 ? $('.need-extended-date').html('Please select the extended date') : $('.need-extended-date').html('');
            ExtendedRemarks.length == 0 ? $('.need-extended-remarks').html('Please enter the remarks') : $('.need-extended-remarks').html('');
            return false;
        }
    }

    if (selectedStatus == 'Completed') {

        var milestone = {
            "ProjectId": header[0].ProjectId,
            "TaskId": selectedTask,
            "StartDate": moment($('#StartDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "EndDate": moment($('#EndDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "ActionDate": moment(CompletedEndDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            "Remarks": CompletedRemarks,
            "SlNo": selectedSlNo,
            "PMUVersion": header[0].PMUVersion,
            "Status": selectedStatus,
            "HubId": header[0].HubId
        }
    }
    else {
        var milestone = {
            "ProjectId": header[0].ProjectId,
            "TaskId": selectedTask,
            "StartDate": moment($('#StartDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "EndDate": moment($('#EndDate').val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            "ActionDate": moment(ExtendedEndDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            "Remarks": ExtendedRemarks,
            "SlNo": selectedSlNo,
            "PMUVersion": header[0].PMUVersion,
            "Status": selectedStatus,
            "HubId": header[0].HubId
        }
    }

    if (milestone != null) {
        $.ajax({
            type: "POST",
            url: ROOT + "ProjectTracker/New_EditPMUMapping",
            data: {
                Milestone: milestone,
            },
            dataType: "JSON",
            success: function (response) {
                $('#Complete_DateExtension_ModalPopup').modal('hide');
                $('#dependentMilestones').modal('hide');
                if (response.toLowerCase().includes("updated")) {
                    window.location.href = ROOT + "ProjectTracker/MileStoneBoard";
                }
                else {
                    alert(response);
                }
            },
            error: function (err) {
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
});
$('#comp-remarks').keyup(function () {
    if ($('#comp-remarks').val() == '') {
        $('.need-completed-remarks').html('Please enter the remarks');
    }
    else {
        $('.need-completed-remarks').html('');
    }
});
$("#ExtendedDate").change(function () {
    if (($('#ExtendedDate').val()).length == 0) {
        $('.need-extended-date').html('Please select the extended date');
    } else {
        $('.need-extended-date').html('');
    }
});
$("#date-ext").click(function () {
    $("#date-ext").addClass("extension");
    $("#completed").removeClass("complete_exten");
});
$("#completed").click(function () {
    $("#completed").addClass("complete_exten");
    $("#date-ext").removeClass("extension");
});
models = [
    {
        name: 'SlNo',
        label: 'Sl No',
        width: 60,
        align: 'center',
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
        rowNum: 20,
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
    });

    $("#jqgrid").closest('.ui-jqgrid-bdiv').css({ 'max-height': '60vh' });
    $("#jqgrid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $("#jqgrid").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $("#jqgrid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#jqgrid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $("#jqgrid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#jqgrid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}
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
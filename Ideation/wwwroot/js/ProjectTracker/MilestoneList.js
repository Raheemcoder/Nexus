var selectedrowdata = '';
var selectedrowid = '';
var PrevEndDate = '';
var ApprovalData = [];
var SelecteDprojectId = '';
var dependentMilestoneDetailsList = [];
var DependentSub_Milestones = [];
var DisplaySubGridValue = '';
var UpdatedEndDate_User = '';
var selectedStatus = $("#selectedStatus").val();
$(document).ready(function () {
    $(".list_approved").hide();
    $(".select_project").hide(); 
    $(".select_hub").hide();
    $('.projectDrop').hide();
    $('#projectNameList').hide();
    var MilestoneStatusList = ['All', 'Open,OverDue,In Progress', 'Completed'];
    $.each(MilestoneStatusList, function (i, item) {
        var newOption = $('<option value="' + item + '">' + item + '</option>');
        $('#StatuList').append(newOption);
    })
    $('#StatuList').show();
    if (selectedStatus == '' || selectedStatus == null || selectedStatus == undefined) {
        $('#StatuList').val('Open,OverDue,In Progress');
    }
    else {
        $('#StatuList').val(selectedStatus);
    }

    pendingMilestoneList();
});

$('#searchstatus').on('click', function () {
    pendingMilestoneList();
})

function pendingMilestoneList() {
    var Status = $('#StatuList').val();
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'JSON',
        url: ROOT + "ProjectTracker/GetMyMileStoneList",
        data: {
            status: Status
        },
        success: function (data) {
            ApprovalData = data;
            if (data != null) {
                CreateJQGrid(data);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}
function CreateJQGrid(data) {
    $.jgrid.gridUnload('#jqgrid');
    jQuery("#jqgrid").jqGrid({
        datatype: 'local',
        data: data,
        colModel: [
            {
                name: 'ProjectId',
                hidden: true
            },
            {
                name: 'ProjectCode',
                label: 'Project Code',
                width: 100,
                search: true,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div><a style="color:blue!important;cursor:pointer;" href="' + ROOT + 'ProjectTracker/MilestoneBoard?q=' + Encrypt('ProjectId=' + rowobject.ProjectId + '&HubId=' + rowobject.HubId) + '">' + rowobject.ProjectCode + '</a></div>';
                }
            },
            {
                name: 'ProjectName',
                resizable: true,
                label: 'Project Name',
                width: 300,
                ignoreCase: true,
                search: true,
            },
            {
                name: 'HubName',
                resizable: true,
                label: 'HUB',
                width: 100,
                ignoreCase: true,
                search: true,
            },
        ],
        width: 1,
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
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

}
$("#btn_refresh").on('click', function () {
    $("#StatuList").val('Open,OverDue,In Progress')
    window.location.reload();
})
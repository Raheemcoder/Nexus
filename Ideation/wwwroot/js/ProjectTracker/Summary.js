var GridData = [];
var isExport = false;

$(document).ready(function () {

    $("#DisplayVersionRemarks").hide()
    $(".list_approved").hide();
    $("#dispVersion").hide();
    $(".projectName_error").text("Please Select Project");
    $('.hubName_error').text('Please Select HUB');

    if (!($('#selectedProjectId').val() === null || $('#selectedProjectId').val() === "" || typeof ($('#selectedProjectId').val()) === "undefined") &&
        !($('#selectedHubId').val() === null || $('#selectedHubId').val() === "" || typeof ($('#selectedHubId').val()) === "undefined"))
    {

        var projectName = $('#selectedProjectName').val();
        var projectId = $('#selectedProjectId').val();
        var hubName = $('#selectedHubName').val();
        var hubId = $('#selectedHubId').val();

        $("#ProjectId").select2().val(projectId).trigger("change");
        $("#Hub").select2().val(hubId).trigger("change");

        $.ajax({
            dataType: 'JSON',
            url: ROOT + "ProjectTracker/GetSummaryMilestoneList",
            method: "POST",
            data: { projectId: projectId, projectName: projectName, HubId: hubId, HubName: hubName },
            success: function (data) {
                data = JSON.parse(data);
                GridData = data;
                if (data.length > 0) {
                    $('#DisplayVersionRemarks').removeAttr('hidden');
                    $('#DisplayVersionRemarks').show();
                } else {
                    $('#DisplayVersionRemarks').attr('hidden', true);
                    $('#DisplayVersionRemarks').hide();
                }
                $("#list").jqGrid("clearGridData", true);
                jQuery('#list').jqGrid('setGridParam', { data: data });
                jQuery('#list').trigger('reloadGrid');
                CreateJqGrid(data);
                CreateJqGridModal(data);
            },
            error: function (err) {
                alert(err);
            }
        });

        GetCurrentUpdates(1);
    }
    else {
        $("div.id_100 select").select2().val('0').change();
    }

});

$("#Version").on('change', function () {
    var projectId = parseInt($('#ProjectId').children(":selected").attr('value'));
    var hubId = parseInt($('#Hub option:selected').val());
    var hubName = $('#Hub option:selected').text();
    var projectName = $("#ProjectId option:Selected").text()
    var version = $("#Version option:selected").text();
    $.ajax({
        dataType: 'JSON',
        url: ROOT + "ProjectTracker/GetSummaryMilestoneList",
        method: "POST",
        data: { projectId: projectId, projectName: projectName, HubId: hubId, HubName: hubName, Version: version },
        success: function (data) {
            data = JSON.parse(data);
            GridData = data;
            if (data.length > 0) {
                $('#DisplayVersionRemarks').removeAttr('hidden');
                $('#DisplayVersionRemarks').show();
            } else {
                $('#DisplayVersionRemarks').attr('hidden', true);
                $('#DisplayVersionRemarks').hide();
            }
            CreateJqGrid(data);
            CreateJqGridModal(data);
        },
        error: function (err) {
            alert(err);
        }
    });
});
$('#ProjectId').change(function (e) {
    GetHubList($('#ProjectId').children(":selected").attr('value'));
    FetchHubData();
    GetCurrentUpdates(1);
    $("#dispVersion").hide();
});
$("#Hub").on('change', function (e) {
    FetchHubData();
    GetCurrentUpdates(1);
    $("#dispVersion").hide();
});

function FetchHubData(projectId, projectName) {
    var isValid = true;
    var projectName = $("#ProjectId option:Selected").text();
    var projectId = $('#ProjectId').children(":selected").attr('value');
    var hubId = parseInt($('#Hub option:selected').val());
    var hubName = $('#Hub option:selected').text();

    if (projectId == "0") {
        $(".projectName_error").show();
        isValid = false;
        $(".projectName_error").html("Please Select Project Name");

    } else {
        $(".projectName_error").hide();
    }
    if (hubId == 0) {
        $(".hubName_error").text('Please Select HUB');
        isValid = false;

    } else {
        $(".hubName_error").hide();
        $(".hubName_error").text('');

    }

    if (isValid) {

        $("#projhub").text(projectName + "-" + hubName)
        $.ajax({
            dataType: 'json',
            url: ROOT + "ProjectTracker/GetSummaryVersion",
            method: "POST",
            data: { projectId: projectId, projectName: projectName, HubId: hubId },
            success: function (data) {

                if (data.length > 0) {
                    $('#Version').empty();
                    $.each(data, function (index, item) {
                        $('#Version').append('<option value=' + item.Value + '>' + item.Text + '</option>');
                    })
                    $('#Version').select2();
                    $("#Version").trigger("change");
                    $("#dispVersion").show();
                } else {
                    $('#Version').empty();
                    $('#Version').select2();
                    $("#Version").trigger("change");
                    $("#dispVersion").hide();
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    }
    else {
        var data = ''
        $('#Version').empty();
        $('#Version').select2();
        $("#Version").trigger("change");
        $('#DisplayVersionRemarks').attr('hidden', true);
        $('#DisplayVersionRemarks').hide();
        CreateJqGrid(data);
        CreateJqGridModal(data);
    }
}
function CreateJqGrid(gridData) {

    $.jgrid.gridUnload('#list');
    add_color = function (rowId, val, rowobject) {
        var result = "";
        if (rowobject.IsCriticalPath == "1") {
            result = 'class="slno-color-red"';
        }
        return result;
    };

    var $grid = $("#list"),
        resizeColumnHeader = function () {
            var rowHight, resizeSpanHeight,
                headerRow = $(this).closest("div.ui-jqgrid-view")
                    .find("table.ui-jqgrid-htable>thead>tr.ui-jqgrid-labels");

            rowHight = headerRow.height();
            headerRow.find("div.ui-jqgrid-sortable").each(function () {
                var ts = $(this);
                ts.css('top', (rowHight - ts.outerHeight()) / 2 + 'px');
            });
        },
        fixPositionsOfFrozenDivs = function () {
            var $rows;
            if (typeof this.grid.fbDiv !== "undefined") {
                $rows = $('>div>table.ui-jqgrid-btable>tbody>tr', this.grid.bDiv);
                $('>table.ui-jqgrid-btable>tbody>tr', this.grid.fbDiv).each(function (i) {
                    var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
                    if ($(this).hasClass("jqgrow")) {
                        $(this).height(rowHight);
                        rowHightFrozen = $(this).height();
                        if (rowHight !== rowHightFrozen) {
                            $(this).height(rowHight + (rowHight - rowHightFrozen));
                        }
                    }
                });
                $(this.grid.fbDiv).height(this.grid.bDiv.clientHeight);
                $(this.grid.fbDiv).css($(this.grid.bDiv).position());
            }
            if (typeof this.grid.fhDiv !== "undefined") {
                $rows = $('>div>table.ui-jqgrid-htable>thead>tr', this.grid.hDiv);
                $('>table.ui-jqgrid-htable>thead>tr', this.grid.fhDiv).each(function (i) {
                    var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
                    $(this).height(rowHight);
                    rowHightFrozen = $(this).height();
                    if (rowHight !== rowHightFrozen) {
                        $(this).height(rowHight + (rowHight - rowHightFrozen));
                    }
                });
                $(this.grid.fhDiv).height(this.grid.hDiv.clientHeight);
                $(this.grid.fhDiv).css($(this.grid.hDiv).position());
            }
        },
        fixGboxHeight = function () {
            var gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight(),
                pagerHeight = $(this.p.pager).outerHeight();

            $("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
            gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight();
            pagerHeight = $(this.p.pager).outerHeight();
            $("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
        };


    $grid.jqGrid({
        url: '',
        mtype: 'GET',
        datatype: 'local',
        data: gridData,
        colModel: [
            {
                name: 'SequenceNo',
                label: 'S.No',
                width: 45,
                resizable: true,
                ignoreCase: true,
                search: false,
                cellattr: add_color,
                align: 'center',
                frozen: true
            },
            {
                name: 'WBSHeaderDesc',
                label: 'WBS Header',
                width: 250,
                resizable: true,
                ignoreCase: true,
                frozen: true,
                formatter: function (cellvalue, options, rowobject) {
                    return '<span class="wbsheader-summary-color">' + rowobject.WBSHeaderDesc + '</span>';
                }
            },
            {
                name: 'TaskDesc',
                label: 'Task Name',
                width: 250,
                resizable: true,
                ignoreCase: true,
                frozen: true,
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsKPI == true && rowobject.IsKPIIncluded == true) {
                        return '<span class="color-red">' + rowobject.TaskDesc + '</span>';
                    }
                    else {
                        return '<span>' + rowobject.TaskDesc + '</span>';
                    }
                }
            },
            {
                name: 'Status',
                label: 'Task Status',
                width: 90,
                resizable: true,
                ignoreCase: true,
                frozen: true,
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.Status == 'Open') {
                        return '<div class="task_status open"><span> ' + rowobject.Status + '</span></div>';
                    } else if (rowobject.Status == 'In Progress') {
                        return '<div class="task_status inprogress"><span> ' + rowobject.Status + '</span></div>';
                    } else if (rowobject.Status == 'Completed') {
                        return '<div class="task_status complete"><span> ' + rowobject.Status + '</span></div>';
                    } else if (rowobject.Status == 'OverDue') {
                        return '<div class="task_status overdue"><span> ' + rowobject.Status + '</span></div>';
                    }
                    else {
                        return '';
                    }
                }
            },
            {
                name: 'SetRelation',
                label: 'Dependency',
                resizable: true,
                ignoreCase: true,
                hidden: true
            },
            {
                name: 'baselineStartDate',
                label: 'Baseline Start Date',
                width: 120,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'baselineEndDate',
                label: 'Baseline End Date',
                width: 120,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'StartDate',
                label: 'Version Start Date',
                width: 120,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'EndDate',
                label: 'Version End Date',
                width: 120,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'CompletedDate',
                label: 'Submitted Date',
                width: 120,
                resizable: true,
                ignoreCase: true,
                hidden: true
            },
            {
                name: 'ActualCompletedDate',
                label: 'Actual Completed Date',
                width: 120,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'UserName',
                label: 'User Name',
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'Extention',
                label: 'Remarks',
                width: 120,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'Completion',
                label: 'Completion Remarks',
                width: 150,
                resizable: true,
                ignoreCase: true
            },

            {
                name: 'Remarks',
                label: 'History',
                width: 120,
                resizable: true,
                ignoreCase: true,
                search: false,
                formatter: function (cellvalue, options, rowobject) {
                    return '<div class="action_icons text-center"><a href=""  onclick="LoadModal(' + rowobject.SequenceNo + ',' + rowobject.WBSHeaderId + ',' + rowobject.TaskId + ')" class="grid-icon-only -medidum-size" data-toggle="modal" title="History"><i class="fas fa-comment-alt text-warning"></i></a></div>';
                }
            },
            {
                name: 'FileName',
                label: 'File Download',
                width: 120,
                resizable: true,
                ignoreCase: true,
                search: false,
                formatter: function (cellvalue, options, rowobject) {

                    if (parseInt(rowobject.FileName) == 1) {
                        return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" ><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.SequenceNo + ',' + rowobject.WBSHeaderId + ',' + rowobject.TaskId + ')" class="icon_color text-success btn_button" title="View" id="' + options.rowId + 'viewuploadedfile"><i class="fas fa-eye"></i></a></div>';
                    }
                    else {
                        return '';
                    }
                }
            },
            {
                name: 'SubmilestoneExit',
                label: 'SubmilestoneExit',
                hidden: true,
                resizable: true,
                ignoreCase: true
            }
        ],
        viewrecords: true,
        scroll: false,
        shrinkToFit: false,
        width: 1050,
        loadonce: true,
        pager: '#pager',
        rowNum: gridData.length,
        resizeStop: function () {
            resizeColumnHeader.call(this);
            fixPositionsOfFrozenDivs.call(this);
            fixGboxHeight.call(this);
        },
        loadComplete: function () {
            fixPositionsOfFrozenDivs.call(this);
        }
    });

    $grid.jqGrid('navGrid', '#pager', { add: false, edit: false, del: false }, {}, {}, {},
        { multipleSearch: true, overlay: 0 });
    $grid.jqGrid('filterToolbar', { autosearch: true, stringResult: true, searchOnEnter: false, defaultSearch: 'cn' });
    $grid.jqGrid('navButtonAdd', '#pager', {
        caption: "Filter",
        title: "Toggle Searching Toolbar",
        buttonicon: 'ui-icon-pin-s',
        onClickButton: function () {
            this.toggleToolbar();
            if ($.isFunction(this.p._complete)) {
                if ($('.ui-search-toolbar', this.grid.hDiv).is(':visible')) {
                    $('.ui-search-toolbar', this.grid.fhDiv).show();
                } else {
                    $('.ui-search-toolbar', this.grid.fhDiv).hide();
                }
                this.p._complete.call(this);
                fixPositionsOfFrozenDivs.call(this);
            }
        }
    });

    resizeColumnHeader.call($grid[0]);
    $grid.jqGrid('setFrozenColumns');
    fixPositionsOfFrozenDivs.call($grid[0]);

    var $TableHeight = $('#list').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 200) {
        $('#list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#list').closest(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
    }
    else {
        $('#list').closest(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
    }
}

var Historydata;
function CreateJqGridModal(data) {
    Historydata = data;
}
var data = JSON.parse('{}');
models = [
    {
        name: 'Id',
        label: 'Version',
        width: 100,
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'ModifiedStartDate',
        label: 'Start Date',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ModifiedEndDate',
        label: 'End Date',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'CompltedDate',
        label: 'Submitted Date',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ActualCompletedDate',
        label: 'Actual Completed Date',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'ModifiedBy',
        label: 'Action by',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'Extention',
        label: 'Remarks',
        width: 100,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'Completion',
        label: 'Completion Remarks',
        width: 100,
        resizable: true,
        ignoreCase: true
    }
]
$("#HistoryGrid").jqGrid({
    url: '',
    datatype: 'local',
    data: data,
    mtype: 'GET',
    colModel: models,
    loadonce: true,
    viewrecords: true,
    rowNum: 100,
    scroll: 1,
    pager: '#HistoryGridPager',

    //multiselect: true,
    gridComplete: function () {
        var objRows = $("#HistoryGrid tbody tr");
        var objHeader = $("#HistoryGrid tbody tr td");
        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
    },
    loadComplete: function () {
        var $grid = $('#HistoryGrid');
        $("#HistoryGrid").jqGrid("setGridParam", { beforeSelectRow: function (rowId, e) { return $(e.target).is("input:checkbox"); } });
        var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
        $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
        $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
        $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
        parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
    }
});
$("#HistoryGrid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

function LoadModal(SlNo, WbsHeaderId, TaskId) {
    var projectId = $('#ProjectId').children(":selected").attr('value');
    var SlNo = SlNo;
    var hubid = parseInt($('#Hub option:selected').val());
    var version = $("#Version option:selected").text();
    var wbsId = WbsHeaderId;
    var taskId = TaskId;
    $.ajax({
        url: ROOT + "ProjectTracker/GetPMUMappingHistory",
        type: "Get",
        datatype: 'json',
        data: { projectId: projectId, SlNo: SlNo, HubId: hubid, Version: version, WBSHeaderId: wbsId, TaskId: taskId },
        success: function (result) {
            $("#HistoryGrid").jqGrid("clearGridData", true);
            $("#HistoryGrid").jqGrid('setGridParam', { data: result });
            $("#HistoryGrid").trigger('reloadGrid');
            $("#HistoryModal").modal("show");
        }
    });
}
function DownloadUploadedImage(rowId) {
    var uploadedfilerowdata = jQuery('#FileUploadjqgrid').jqGrid('getRowData', rowId);
    var index = uploadedFiles.findIndex(obj => obj.FileName == uploadedfilerowdata.FileName);

    if (uploadedFiles[index].FileName != '') {
        FileName = uploadedFiles[index].FileName.replaceAll('"', '');
        $('#' + rowId + 'DownloadImageOrFile').attr("href", ROOT + "ProjectTracker/DownloadPackageImageFile?fileName=" + FileName.trim());
        return true;
    }
}
function ViewUploadedImages(SeqNo, WbsHeaderId, TaskId) {

    var projectId = $('#ProjectId').children(":selected").attr('value');
    var hubId = parseInt($('#Hub option:selected').val());
    var version = $("#Version option:selected").text();
    var wbsId = WbsHeaderId;
    var taskId = TaskId;
    $.ajax({
        url: ROOT + 'ProjectTracker/DisplayUploadedFiles',
        type: 'POST',
        dataType: 'JSON',
        data: { ProjectId: projectId, SeqNo: SeqNo, HubId: hubId, Version: version, WBSHeaderId: wbsId, TaskId: taskId },

        success: function (result) {
            uploadedFiles = [];
            if (result.length > 0) {
                for (var i = 0; i <= result.length - 1; i++) {
                    uploadedFiles.push(result[i]);
                }

                for (var i = 0; i <= uploadedFiles.length - 1; i++) {
                    uploadedFiles[i].rowId = i + 1;
                }
            }

            $("#FileUploadjqgrid").jqGrid("clearGridData", true);
            jQuery('#FileUploadjqgrid').jqGrid('setGridParam', { data: uploadedFiles });
            jQuery('#FileUploadjqgrid').trigger('reloadGrid');
            CreateJQGridUploadFile(uploadedFiles);
            $('#dependentMilestones').modal('show');

        }
    });

}

filemodels = [
    {
        name: 'MilestoneId',
        label: 'Milestone Id',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },

    {
        name: 'RowId',
        label: 'RowId',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        sortable: false,
    },

    {
        name: 'SequenceNo',
        label: 'Milestone No',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        hidden: true,
    },

    {
        name: 'MilestoneName',
        resizable: true,
        width: 100,
        label: 'Milestone Name',
        ignoreCase: true,
        sortable: false,
        hidden: true

    },
    {
        name: 'FileName',
        resizable: true,
        width: 100,
        label: 'File Name',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UploadedBy',
        resizable: true,
        width: 100,
        label: 'Uploaded By',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UploadedDate',
        resizable: true,
        width: 100,
        label: 'Uploaded Date',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'Action',
        label: 'Action',
        width: 50,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="grid-icons-group -justify-center" id="' + rowobject.rowId + 'DisplayIcons"><a class="grid-icon-only Approveicon" href="' + ROOT + 'PMUMappingsUploads/' + $("#ProjectId").val() + '/' + rowobject.SequenceNo + '/' + decodeURIComponent(rowobject.FileName) + '" download class="icon_color text-success btn_button" title = "Download" id = "' + rowobject.rowId + 'DownloadImageOrFile" ><i class="fas fa-download"></i></a></div>';
        }
    }

]

function CreateJQGridUploadFile(data) {

    $("#FileUploadjqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'Get',
        colModel: filemodels,
        loadonce: true,
        viewrecords: true,
        rowNum: 100,
        pager: '#FileUploadpager',
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#FileUploadjqgrid tbody tr");
            var objHeader = $("#FileUploadjqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
    });
    $("#FileUploadjqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}

$('#uploadedbtnok').click(function () {
    $('#dependentMilestones').modal('hide');
})

versionmodels = [
    {
        name: 'VersionId',
        label: 'Version Id',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'OldVersion',
        label: 'Previous Version ',
        resizable: true,
        ignoreCase: true,
        width: 30

    },
    {
        name: 'NewVersion',
        label: 'Version ',
        resizable: true,
        ignoreCase: true,
        width: 30

    },
    {
        name: 'RemarksType',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        width: 30
    },
    {
        name: 'CreatedBy',
        label: 'Created By',
        resizable: true,
        ignoreCase: true,
        width: 30

    },
    {
        name: 'CreatedDate',
        label: 'Created Date',
        resizable: true,
        ignoreCase: true,
        width: 30

    },

]

$("#Versionremarksdisplay").jqGrid({
    url: '',
    datatype: 'local',
    data: data,
    mtype: 'Get',
    colModel: versionmodels,
    loadonce: true,
    viewrecords: true,
    rowNum: 100,
    pager: '#Versionremarksdisplaypager',
    scroll: 1,
    gridComplete: function () {
        var objRows = $("#Versionremarksdisplay tbody tr");
        var objHeader = $("#Versionremarksdisplay tbody tr td");
        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
    },
});

$("#Versionremarksdisplay").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$('#DisplayVersionRemarks').click(function () {

    var projectId = $('#ProjectId').children(":selected").attr('value');
    var hubId = parseInt($('#Hub option:selected').val())
    var version = $("#Version option:selected").text();
    $.ajax({
        dataType: 'json',
        url: ROOT + "ProjectTracker/GetVersionRemarksDetails",
        method: "get",
        data: {
            projectId: projectId,
            HubId: hubId,
            Version: version,
            IsFrom: 1
        },
        success: function (data) {
            data = JSON.parse(data);
            $("#Versionremarksdisplay").jqGrid("clearGridData", true);
            $("#Versionremarksdisplay").jqGrid('setGridParam', { data: data });
            $("#Versionremarksdisplay").trigger('reloadGrid');
            $('#VersionRemarkspop').modal('show');
        },
        error: function (err) {
            alert(err);
        }
    });
});
function GetExcelData() {
    var projectId = parseInt($('#ProjectId').children(":selected").attr('value'));
    var hubId = parseInt($('#Hub option:selected').val());
    var projectName = $("#ProjectId option:selected").text();
    var version = $("#Version option:selected").text();
    var hubName = $('#Hub option:selected').text();
    var isValid = true;
    if (projectId == 0 && hubId == 0) {
        alert("Please select Project and Hub");
        isValid = false;
    }
    else if (projectId == 0) {
        alert("Please select Project");
        isValid = false;
    }
    else if (hubId == 0) {
        alert("Please select Hub");
        isValid = false;
    }
    else {
        var data = $('#list').jqGrid('getGridParam', 'data');
        if (data.length === 0) {
            alert("No data in Grid");
            isValid = false;
        }
    }
    if (isValid) {
        window.location.href = ROOT + "ProjectTracker/GetExcelSummaryData?projectId=" + projectId + "&&projectName=" + projectName + "&&HubId=" + hubId + "&&HubName=" + hubName + "&&Version=" + version;
    }
}

var updateData = [];
var UpdatesColModel = [
    {
        name: 'OnlyUpdates',
        label: 'Updates',
        width: 100,
        resizable: true,
        ignoreCase: true,
        align:'center',
        sortable: false
    },
    {
        name: 'UpdatedBy',
        label: 'Updated By',
        width: 40,
        resizable: true,
        ignoreCase: true,
        align: 'center',
        sortable: false
    },
    {
        name: 'UpdatedOn',
        label: 'Updated On',
        width: 20,
        resizable: true,
        ignoreCase: true,
        align: 'center',
        sortable: false,
    }
];
function CreateUpdateJqgird(data) {

    $.jgrid.gridUnload('#update-list-grid');

    $("#update-list-grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: UpdatesColModel,
        loadonce: true,
        viewrecords: true,
        pager: '#update-list-grid-pager',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#update-list-grid tbody tr");
            var objHeader = $("#update-list-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#update-list-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#update-list-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#update-list-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 190) {
        $('#update-list-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#update-list-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#update-list-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#update-list-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }

}
$('#update-text').on('change', function () {

    var Updates = $("#update-text").val().trim();
    var index = Updates.indexOf('-');
    Updates = $.trim(Updates.substr(index + 1, Updates.length));

    if (Updates != "" && Updates != null && typeof (Updates) != "undefined") {
        $("#update-text").siblings('span:first').addClass('hide');
    }
   
    if (CheckAlreadyUpdateExists(Updates)) {
        $("#update-text").siblings('span').addClass('hide');
        $("#update-text").siblings('b').addClass('hide');
        $(".update-exists").removeClass('hide').delay(3000).queue(function (next) {
            $(this).addClass('hide');
            next();
        });
    }
    else {
        $(".update-exists").addClass('hide');
    }

});
function CheckAlreadyUpdateExists(Update) {
    var index = updateData.findIndex(function (obj, i) {
        return obj.OnlyUpdates.trim().toLowerCase() === Update.trim().toLowerCase()
    });
    if (index > -1) {
        return true;
    };
    return false;
}
function GetCurrentUpdates(Action) {

    // 2 means when we click on Updates history button

    var isValid = true;
    var hubId = parseInt($('#Hub').val());
    var projectId = parseInt($('#ProjectId').val());

    if (hubId === 0 && projectId === 0) {
        if (Action == 2) {
            alert("Please Select Project and HUB")
        }
        isValid = false;
    }
    else if (projectId == 0) {
        if (Action == 2) {
            alert("Please select Project");
        }
        isValid = false
    }
    else if (hubId == 0) {
        if (Action == 2) {
            alert("Please select Hub");
        }
        isValid = false
    }
    else {
        if (isValid) {
            $.ajax({
                url: ROOT + 'ProjectTracker/GetUpdates',
                type: 'GET',
                data: {
                    HubId: hubId, ProjectId: projectId
                },
                success: function (result) {
                    updateData = [];
                    if (result != null || result != undefined) {
                        updateData = result;
                        $("#update-text").val('');
                        if (updateData.length > 0) {
                            $("#update-text").val(updateData[0].Updates);
                            $(".to-add-title").attr("title", updateData[0].Updates);
                        }
                        else {
                            $(".to-add-title").removeAttr("title");
                        }
                        if (Action == 2) {
                            CreateUpdateJqgird(updateData);
                            $("#Hub_text").text($('#Hub option:selected').text());
                            $("#project_text").text($("#ProjectId option:selected").text());
                            $("#UpdatesModal").modal("show");
                        }
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error Occured: " + error);
                }
            });
        }
    }

}
$("#btn-add-update").on("click", function () {

    var isValid = true;
    var hubId = parseInt($('#Hub').val());
    var projectId = parseInt($('#ProjectId').val());

    if (hubId === 0 && projectId === 0) {
        alert("Please Select Project and HUB")
        isValid = false;
        return false;
    }
    else if (projectId == 0) {
        alert("Please select Project");
        isValid = false;
        return false;
    }
    else if (hubId == 0) {
        alert("Please select Hub");
        isValid = false;
        return false;
    }

    var Updates = $("#update-text").val().trim();
    var index = Updates.indexOf('-');
    Updates = $.trim(Updates.substr(index + 1, Updates.length));

    if (Updates == "" || Updates == null || typeof (Updates) == "undefined") {
        $("#update-text").siblings('span:first').removeClass('hide').delay(3000).queue(function (next) {
            $(this).addClass('hide');
            next();
        });
        isValid = false;
        return false;
    }

    if (CheckAlreadyUpdateExists(Updates)) {
        $("#update-text").siblings('span').addClass('hide');
        $("#update-text").siblings('b').addClass('hide');
        $(".update-exists").removeClass('hide').delay(3000).queue(function (next) {
            $(this).addClass('hide');
            next();
        });
        isValid = false;
        return false;
    }
    else {
        $(".update-exists").addClass('hide');
    }

    if (isValid) {

        confirm('Are you sure you want to save ?',

            function () {
                $.ajax({
                    url: ROOT + 'ProjectTracker/SaveUpdates',
                    type: 'POST',
                    data: {
                        HubId: hubId,
                        ProjectId: projectId,
                        Updates: Updates
                    },
                    success: function (result) {
                        if (result != null && result != undefined) {
                            if (result.toLowerCase().includes("successfully")) {
                                $(".update-saved-success").removeClass('hide').delay(3000).queue(function (next) {
                                    $(this).addClass('hide');
                                    next();
                                });

                                GetCurrentUpdates(1);
                            }
                            else {
                                alert("Error :" + result);
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        alert("Error Occured: " + error);
                    }
                });
            }

        );

    }

});

function confirm(msg, func) {
    $('#confirmpopupmesssage').empty().html(msg);
    $('#confirmpopup').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }
}
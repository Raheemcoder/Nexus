var selectedval = 'n';
var GridData = [];
var isExport = false;
$(document).ready(function () {
    $("#dispVersion").hide();
    $('.hubName_error').text('Please Select HUB');
    var projectId = 2;
    function display(option) {
        console.log(option, 'option');
    }
    $('[data-singleselect]').select2({

        templateselection: function (option) {
            alert('dsfdb');
            return formatSelection(option, 'uppercase');
        }
    });
    //$('[data-singleselect]').select2();
    models = [
        {
            name: 'SequenceNo',
            label: 'S.No',
            width: 60,
            resizable: true,
            ignoreCase: true,
            search: false,
        },
        {
            name: 'WBSHeaderDesc',
            label: 'WBS Header',
            // width: 150,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TaskDesc',
            label: 'Task Name',
            // width: 150,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'SetRelation',
            label: 'Dependency',
            // width: 50,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Status',
            label: 'Task Status',
            //  width: 80,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Status == 'Open') {
                    return '<div class="m-table__status -justify-center"><span class="m-table__text Open"> ' + rowobject.Status + '</span></div>';
                } else if (rowobject.Status == 'In Progress') {
                    return '<div class="m-table__status -justify-center"><span class="m-table__text NotStarted"> ' + rowobject.Status + '</span></div>';
                } else if (rowobject.Status == 'Completed') {
                    return '<div class="m-table__status -justify-center"><span class="m-table__text Completed"> ' + rowobject.Status + '</span></div>';
                } else if (rowobject.Status == 'OverDue') {
                    return '<div class="m-table__status -justify-center"><span class="m-table__text Overdue"> ' + rowobject.Status + '</span></div>';
                }
                else {
                    return '';
                }

                //return '<div class="m-table__status -justify-center"><span class="' + rowobject.Class + '" > ' + rowobject.Status + '</span></div>';

            }
        },


        {
            name: 'baselineStartDate',
            label: 'Baseline Start Date',
            // width: 55,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'baselineEndDate',
            label: 'Baseline End Date',
            //  width: 55,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'StartDate',
            label: 'Version Start Date',
            // width: 55,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'EndDate',
            label: 'Version End Date',
            //  width: 55,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'CompletedDate',
            label: 'Submitted Date',
            // width: 60,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'ActualCompletedDate',
            label: 'Actual Completed Date',
            // width: 60,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'UserName',
            label: 'User Name',
            //  width: 70,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Extention',
            label: 'Remarks',
            // width: 100,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'Completion',
            label: 'Completion Remarks',
            // width: 100,
            resizable: true,
            ignoreCase: true
        },

        {
            name: 'Remarks',
            label: 'History',
            // width: 50,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return '<div class="grid-text-icon"><a href=""  onclick="LoadModal(' + rowobject.SequenceNo + ')" class="grid-icon-only -medidum-size" data-toggle="modal" title="History"><i class="fas fa-comment-alt"></i></a></div>';

            }
        },
        {
            name: 'FileName',
            label: 'File Download',
            // width: 50,
            resizable: true,
            ignoreCase: true,

            formatter: function (cellvalue, options, rowobject) {

                if (parseInt(rowobject.FileName) == 1) {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" ><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.SequenceNo + ')" class="icon_color text-success btn_button" title="View" id="' + options.rowId + 'viewuploadedfile"><i class="fas fa-eye"></i></a></div>';
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
    ]
    if ($('#selectedProjectName').val() != undefined || $('#selectedHubName').val() != undefined) {
        var projectName = $('#selectedProjectName').val();
        var projectId = $('#selectedProjectId').val();
        var hubName = $('#selectedHubName').val();
        var hubId = $('#selectedHubId').val();

        $("div.id_100 select").select2().val(projectId).trigger("change");
        $("div.id_hub select").select2().val(hubId).trigger("change");

        selected = 's';


        $.ajax({
            // contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: ROOT + "Home/MilestoneList",
            method: "POST",
            data: { projectId: projectId, projectName: projectName, HubId: hubId, HubName: hubName },
            success: function (data) {
                data = JSON.parse(data);
                GridData = data;
                //jQuery('#jqgrid').jqGrid('clearGridData');
                if (data.length > 0) {
                    $('#DisplayVersionRemarks').removeAttr('hidden');
                    $('#DisplayVersionRemarks').show();
                } else {
                    $('#DisplayVersionRemarks').attr('hidden', true);
                    $('#DisplayVersionRemarks').hide();
                }
                $("#jqgrid").jqGrid("clearGridData", true);
                jQuery('#jqgrid').jqGrid('setGridParam', { data: data });
                jQuery('#jqgrid').trigger('reloadGrid');
                CreateJqGrid(data);
                CreateJqGridModal(data);
            },
            error: function (err) {
            }
        });
    } else {
        $("div.id_100 select").select2().val('0').change();
        selected = 's';
    }
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
            name: 'SubMilestoneId',
            resizable: true,
            label: 'Sub Milestone Id',
            //width: 90,
            ignoreCase: true,

        },
        {
            name: 'SubMilestoneName',
            resizable: true,
            label: 'Sub Milestone Name',
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
            name: 'RelationType',
            resizable: true,
            label: 'Relation Type',
            ignoreCase: true,
            hidden: true
            // width: 90,

        },
        {
            name: 'Duration',
            resizable: true,
            label: 'Duration',
            //width: 90,
            ignoreCase: true,


        },
        {
            name: 'Status',
            label: 'Milestone Status',
            //width: 80,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Status == 'Open') {
                    return '<div class="m-table__status -justify-center"><span class="m-table__text Open"> ' + rowobject.Status + '</span></div>';
                } else if (rowobject.Status == 'Not Started') {
                    return '<div class="m-table__status -justify-center"><span class="m-table__text NotStarted"> ' + rowobject.Status + '</span></div>';
                } else if (rowobject.Status == 'Completed') {
                    return '<div class="m-table__status -justify-center"><span class="m-table__text Completed"> ' + rowobject.Status + '</span></div>';
                } else if (rowobject.Status == 'OverDue') {
                    return '<div class="m-table__status -justify-center"><span class="m-table__text Overdue"> ' + rowobject.Status + '</span></div>';
                }
                else {
                    return '';
                }
            }
        },


        {
            name: 'baselineStartDate',
            label: 'Baseline Start Date',
            // width: 55,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'baselineEndDate',
            label: 'Baseline End Date',
            //  width: 55,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'StartDate',
            label: 'Start Date',
            // width: 55,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'EndDate',
            label: 'End Date',
            //  width: 55,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'CompletedDate',
            label: 'Submitted Date',
            // width: 60,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'ActualCompletedDate',
            label: 'Actual Completed Date',
            //width: 60,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'UserName',
            label: 'User Name',
            // width: 70,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Extention',
            label: 'Remarks',
            //width: 100,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'Completion',
            label: 'Completion Remarks',
            // width: 100,
            resizable: true,
            ignoreCase: true
        },

        {
            name: 'Remarks',
            label: 'History',
            // width: 50,
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Remarks == null) {
                    rowobject.Remarks = "";
                }
                return '<div class="grid-text-icon"><a href=""  onclick="LoadModal(' + rowobject.SubMilestoneId + ')" class="grid-icon-only -medidum-size" data-toggle="modal" title="History"><i class="fas fa-comment-alt"></i></a></div>';

            }
        },
        {
            name: 'FileName',
            label: 'File Download',
            //width: 50,
            resizable: true,
            ignoreCase: true,
            hidden: true,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.FileName == '1') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" ><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.SequenceNo + ')" class="icon_color text-success btn_button" title="View" id="' + options.rowId + 'viewuploadedfile"><i class="fas fa-eye"></i></a></div>';
                }
                else {
                    return '';
                }
            }
        },
    ]
});
$('#ProjectId').change(function (e) {
    FetchHubData();
    GetHubList($('#ProjectId').children(":selected").attr('value'));
    $("#dispVersion").hide();
});
$("#Hub").on('change', function (e) {
    FetchHubData();
    $("#dispVersion").hide();
   
});
function FetchHubData(projectId, projectName) {
    var isValid = true;
    var projectName = $("#ProjectId option:Selected").text();
    var projectId = $('#ProjectId').children(":selected").attr('value');
    var hubId = parseInt($('#Hub option:selected').val());
   // var version = $("#Version:selected").text();
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
        $(".hubName_error").text('');
    }
    if (isValid) {
        $.ajax({
            //contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: ROOT + "Home/GetSummaryVersion",
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
function CreateJqGrid(data) {
    $.jgrid.gridUnload('#jqgrid');
    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'Get',
        colModel: models,
        loadonce: true,
        viewrecords: true,
        rowNum: data.length,
        pager: '#pager',
        scroll:1,
        subGrid: true,
        subGridOptions: {
            hasSubgrid: function (options) {
                console.log(options);
                var subgridData = options.data.subgridData;
                return subgridData != null && subgridData.length > 0;
            }
        },
        subGridRowExpanded: function (subgrid_id, row_id) {
            var projectId = $('#ProjectId').children(":selected").attr("value");

            var subgrid_table_id = subgrid_id + "_t";
            var selectedMilestone_id = jQuery('#jqgrid').jqGrid('getRowData', row_id);
            var rowSequnce = selectedMilestone_id.SequenceNo;

            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "'></table>");
            $("#" + subgrid_table_id).jqGrid({
                url: ROOT + "Master/GetProjectSummarySubMilestoneDetails",
                datatype: 'json',
                mtype: 'GET',
                colModel: Submodels,
                postData: { projectId: projectId, SequenceNo: rowSequnce },
                loadonce: true,
                viewrecords: true,
                rowNum: 10000,
                scroll: true,
                pager: '#pager_id',
                height: "auto",

            });
            // $("#" + subgrid_table_id).jqGrid("navGrid", "#" + pager_id, { edit: false, add: false, del: false });
        },


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

            var rows = $("#jqgrid").getDataIDs();
            for (var i = 0; i < rows.length; i++) {
                var row_id = rows[i];
                var rowdata = $('#jqgrid').getRowData(row_id);
                if (rowdata.SubmilestoneExit != 'True') {
                    $("#" + row_id + ">td.sgcollapsed").unbind("click").html("");
                }

            }

            var $grid = $('#jqgrid');
            // $("#jqgrid").jqGrid("setGridParam", { beforeSelectRow: function (rowid, e) { return $(e.target).is("input:checkbox"); } });
            var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
            $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
            $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
            parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
        }
    });
    $("#jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();

    if ($TableHeight > 278) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
    }
    else {
        $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");

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



function LoadModal(SlNo) {

    //var projectName = $('#selectedProjectName').val();
    var projectId = $('#ProjectId').children(":selected").attr('value');
    var SlNo = SlNo;
    var hubid = parseInt($('#Hub option:selected').val());
    //var milestoneId = milestoneId;
    var version = $("#Version option:selected").text();
    $.ajax({
        url: ROOT + "GanttChart/GetPMUMappingHistory",
        type: "Get",
        datatype: 'json',
        data: { projectId: projectId, SlNo: SlNo, HubId: hubid, Version: version },
        success: function (result) {
            console.log('result', result);
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
        $('#' + rowId + 'DownloadImageOrFile').attr("href", ROOT + "Master/DownloadPackageImageFile?fileName=" + FileName.trim());
        return true;
    }
}

function ViewUploadedImages(SeqNo, rowId) {
    var projectId = $('#ProjectId').children(":selected").attr('value');
    var hubId = parseInt($('#Hub option:selected').val());
    var version = $("#Version option:selected").text();
    $.ajax({
        url: ROOT + 'Master/DisplayUploadedFiles',
        type: 'POST',
        dataType: 'JSON',
        data: { ProjectId: projectId, SeqNo: SeqNo, HubId: hubId, Version: version },

        success: function (result) {
            console.log('uploadedFiles', result);
            //if (uploadedFiles.length > 0) {
            uploadedFiles = [];
            if (result.length > 0) {
                for (var i = 0; i <= result.length - 1; i++) {

                    //var index = uploadedFiles.findIndex(obj => obj.FileName == result[i].FileName);


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

    // $('#jqgrid').jqGrid('GridUnload');
    $("#FileUploadjqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'Get',
        colModel: filemodels,
        loadonce: true,
        viewrecords: true,
        rowNum: 10000,
        pager: '#FileUploadpager',
        userDataOnFooter: true,
        //multiselect: true,
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

// $('#jqgrid').jqGrid('GridUnload');
$("#Versionremarksdisplay").jqGrid({
    url: '',
    datatype: 'local',
    data: data,
    mtype: 'Get',
    colModel: versionmodels,
    loadonce: true,
    viewrecords: true,
    rowNum: 10000,
    pager: '#Versionremarksdisplaypager',
    userDataOnFooter: true,
    //multiselect: true,
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
    debugger
    var projectId = $('#ProjectId').children(":selected").attr('value');
    var hubId = parseInt($('#Hub option:selected').val())
    var version = $("#Version option:selected").text();
    $.ajax({
        //contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: ROOT + "Home/GetVersionRemarksDetails",
        method: "get",
        data: { projectId: projectId, HubId: hubId, Version: version },
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            $("#Versionremarksdisplay").jqGrid("clearGridData", true);
            $("#Versionremarksdisplay").jqGrid('setGridParam', { data: data });
            $("#Versionremarksdisplay").trigger('reloadGrid');
            // CreateJQGridVersionremarks(data);
            $('#VersionRemarkspop').modal('show');
        },
        error: function (err) {
        }
    });

})
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
    else if (projectId == 0 ) {
        alert("Please select Project");
        isValid = false;
    }
    else if (hubId == 0)
    {
        alert("Please select Hub");
        isValid = false;
    }
    else {
        var data = $('#jqgrid').jqGrid('getGridParam', 'data');
        if (data.length === 0) {
            alert("No data in Grid");
            isValid = false;
        }
    }
    if (isValid) {
        window.location.href = ROOT + "Home/GetExcelSummaryData?projectId=" + projectId + "&&projectName=" + projectName + "&&HubId=" + hubId + "&&HubName=" + hubName +"&&Version="+version;

    }

}
$("#Version").on('change', function () {
    var projectId = parseInt($('#ProjectId').children(":selected").attr('value'));
    var hubId = parseInt($('#Hub option:selected').val());
    var hubName = $('#Hub option:selected').text();
    var projectName = $("#ProjectId option:Selected").text()
    var version = $("#Version option:selected").text();
    $.ajax({
        //contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: ROOT + "Home/MilestoneList",
        method: "POST",
        data: { projectId: projectId, projectName: projectName, HubId: hubId, HubName: hubName, Version: version },
        success: function (data) {
            data = JSON.parse(data);
            console.log(data)
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
        }
    });
});

function GetHubList(projectId) {
    
    if (projectId == 1) {
        projectId = $("ProjectId").val();
    }
    $.ajax({
        dataType: 'json',
        url: ROOT + "Home/GetHubBasedOnProjectId",
        method: "get",
        data: { projectId: projectId},
        success: function (data) {
            var hubDrop = '';
            
            var PriousHub = $("#Hub").val();
            if (data.length > 0) {
                $("#Hub").html("");
                hubDrop += '<option  value="0">Select Hub</option>';

                for (var i = 0; i < data.length; i++) {
                    if (data[i].HubApproved === "1") { 
                        hubDrop += '<option  data-bgcolor="#358375 !important;" class="approvedHub" value="' + data[i].HubId + '">' + data[i].HubName + '</option>';
                    } else if (data[i].HubApproved === "0" && data[i].HubSaved === "1") { 
                        hubDrop += '<option  data-bgcolor="#db8c44 !important;" class="savedHub" value="' + data[i].HubId + '">' + data[i].HubName + '</option>'; 
                    } else {
                        hubDrop += '<option value="' + data[i].HubId + '">' + data[i].HubName + '</option>'; 
                    }
                }
                $("#Hub").html(hubDrop);
                $("#Hub").val(PriousHub);
                $('#Hub').select2({
                    templateResult: function (data) {
                        if (!data.id) {
                            return data.text;
                        }
                        var option = $(data.element);
                        var bgColor = option.data('bgcolor') || 'block';
                        var text = option.text();
                        return $('<span style="color: ' + bgColor + ';  font-weight: bold;">' + text + '</span>');
                    }
                });
            }
        }
    });
}

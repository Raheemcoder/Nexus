var projectId = '';
var projectName = '';
var selectedval = 'n';
$(document).ready(function () {
    debugger;
    $('.projectName_error').hide();
    $('#loader').css('visibility', 'hidden');
    $('.projectDrop').hide();

    //$(function () {
        
    //    var tableContainer = $(".large-table-container-3");
    //    var table = $(".large-table-container-3 table");
    //    var fakeContainer = $(".large-table-fake-top-scroll-container-3");
    //    var fakeDiv = $(".large-table-fake-top-scroll-container-3 div");



    //    var tableWidth = table.width();
    //    fakeDiv.width(tableWidth);



    //    fakeContainer.scroll(function () {
    //        tableContainer.scrollLeft(fakeContainer.scrollLeft());
    //    });
    //    tableContainer.scroll(function () {
    //        fakeContainer.scrollLeft(tableContainer.scrollLeft());
    //    });
    //});
    //$('#ProjectId').select2();
    //projectName = $('#selectedProjectName').val();
    //projectId = $('#selectedProjectId').val();
    ////$("div.id_100 select").select2().val(projectId).change();


    //if ($('#selectedProjectName').val() != 'Select Project Name') {
    //     projectName = $('#selectedProjectName').val();
    //     projectId = $('#selectedProjectId').val();
    //    $("div.id_100 select").select2().val(projectId).change();
    //    selected = 's';
    //}

 
    


   
    //    if (projectId == "")
    //    {
    //        $(".projectId_error").html("Please Select Project Name");
    //        $("#projectHistory").attr("hidden", true)

    //    }
    //    else {
    //        
    //        //$(".projectId_error").html("");
    //        $("#projectHistory").removeAttr("hidden")
    //        $.ajax({
    //            url: ROOT + "GanttChart/GanttChart",
    //            data: { ProjectId: projectId },
    //            dataType: '',
    //            type: "GET",
    //            success: function (data) {
    //                
    //               // $('#LoadTable').html(data);
    //                //alert(data);
    //                //data = JSON.parse(data);
    //                //CreateTable(data);
    //            },
    //            error: function (err) {
    //            }
    //        });
    //    }
   



    //$('#Search').unbind().on('click', function () {
        
       
    //    console.log('fdzv');

    //    var versionId = $('#VersionId').val();
    //    projectId = $('#ProjectId').children(":selected").attr("value");
    //    if (versionId == "--select--") {
    //        $(".projectId_error").html("Please Select Version Id");
    //        $("#projectHistory").attr("hidden", true);

    //    }
    //    else {
    //        //$(".projectId_error").html("");
    //        $("#projectHistory").removeAttr("hidden");

    //        //window.location.href = ROOT + "GanttChart/GetDetails" + '?ProjectId=' + projectId + '&VersionId=' + versionId;
    //        //$('#loader').css('visibility', 'hidden');

    //        $.ajax({
    //            url: ROOT + "GanttChart/GetDetails",
    //            data: { ProjectId: projectId, VersionId: versionId },
    //            dataType: 'HTML',
    //            async: false,
    //            type: "GET",
    //            success: function (data) {
                    
    //                $('#LoadTable').html('');
    //                $('#LoadTable').html(data);

    //            },
    //            error: function (err) {
    //                alert(err);
    //            }
    //        });
    //    }


    //});


 
});




//$('#ProjectId').on('change', function () {
    
//    if (selectedval == 'n') {
//        ProjectName = $("#ProjectId option:Selected").text();
//        projectId = $('#ProjectId').children(":selected").attr("value");
//        $("#projectHistory").removeAttr("hidden");
//        //window.location.href = ROOT + "GanttChart/GanttChart?projectId=" + projectId+"";

//    $.ajax({
//        url: ROOT + "GanttChart/GanttCharts",
//        data: { ProjectId: projectId },
//        dataType: '',
//        type: "GET",
//        success: function (data) {
//            {
//                $("#VersionId").empty();
//                $("#VersionId").append($("<option/>").val('--select--').text('--select--'));
//                $.each(data, function () {
//                    $("#VersionId").append($("<option />").val(this.VersionId).text(this.Version));
//                });
//            }

//        },
//        error: function (err) {
//        }
//    });

//    }

  
//})

//$('.projectDrop').change(function () {

//    $(".projectId_error").html("");

//});

//$("#projectHistory").on("click", function () {

//    var projectId = $('#ProjectId').children(":selected").attr("value");
    
//    $.ajax({
//        url: ROOT + 'GanttChart/GetProjectHistory',
//        //type: "GET",
//        //dataType: 'JSON',
//        data: { ProjectId: projectId },
//        success: function (result) {
            
//            $("#HistoryGrid").jqGrid("clearGridData", true);
//            $("#HistoryGrid").jqGrid('setGridParam', { data: result });
//            $("#HistoryGrid").trigger('reloadGrid');
//            $("#HistoryGrid").hideCol("Id");
//            $(".HistoryModal").modal("show");


            
//        }
//    });


//});

//var data = JSON.parse('{}');
//models = [
//    //{
//    //    name: 'Id',
//    //    label: 'Version',
//    //    width: 100,
//    //    resizable: true,
//    //    ignoreCase: true,
        
//    //},
//    //{
//    //    name: 'MilestoneName',
//    //    label: 'Milestone Name',
//    //    width: 100,
//    //    resizable: true,
//    //    ignoreCase: true,
        
//    //},
//    {
//        name: 'ModifiedStartDate',
//        label: 'Start Date',
//        width: 100,
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'ModifiedEndDate',
//        label: 'End Date',
//        width: 100,
//        resizable: true,
//        ignoreCase: true
//    },
//    {
//        name: 'CompltedDate',
//        label: 'Completed Date',
//        width: 100,
//        resizable: true,
//        ignoreCase: true
//    },
//    {
//        name: 'Extention',
//        label: 'Extension Remarks',
//        width: 100,
//        resizable: true,
//        ignoreCase: true
//    },
//    {
//        name: 'Completion',
//        label: 'Completion Remarks',
//        width: 100,
//        resizable: true,
//        ignoreCase: true
//    },
//    //{
//    //    name: 'Reason',
//    //    label: 'Remarks',
//    //    width: 100,
//    //    resizable: true,
//    //    ignoreCase: true
//    //}

//]
//$("#HistoryGrid").jqGrid({
//    url: '',
//    datatype: 'local',
//    data: data,
//    mtype: 'GET',
//    colModel: models,
//    loadonce: true,
//    rowList: [5, 10, 20, 200, 400],
//    viewrecords: true,
//    rowNum: 10000,
//    //scroll: 1,
//    // pager: '#HistoryGridPager',
//    userDataOnFooter: true,
//    // pageable: true,
//    //autoheight: true,

//    //multiselect: true,
//    gridComplete: function () {
//        var objRows = $("#HistoryGrid tbody tr");
//        var objHeader = $("#HistoryGrid tbody tr td");
//        if (objRows.length > 1) {
//            var objFirstRowColumns = $(objRows[1]).children("td");
//            for (i = 0; i < objFirstRowColumns.length; i++) {
//                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
//            }
//        }
//    },
//    loadComplete: function () {
//        var $grid = $('#HistoryGrid');
//        $("#HistoryGrid").jqGrid("setGridParam", { beforeSelectRow: function (rowId, e) { return $(e.target).is("input:checkbox"); } });
//        var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
//        $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
//        $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
//        $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
//        parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
//    }
//});


////$("#HistoryGrid").jqGrid('filterToolbar', {
////    autosearch: true,
////    stringResult: false,
////    searchOnEnter: false,
////    defaultSearch: "cn"
////});
//$(".History").on("click", function () {

//    var projectId = $('#ProjectId').children(":selected").attr("value");
//    var MilestoneId = $(this).closest('tr').data('milestone');
    
//    $.ajax({
//        url: ROOT + 'GanttChart/GetPMUMappingHistory',
//        type: "GET",
//        dataType: 'JSON',
//        data: { projectId: projectId, milestoneId: MilestoneId },
//        success: function (result) {
            
//            $("#HistoryGrid").jqGrid("clearGridData", true);
//            $("#HistoryGrid").jqGrid('setGridParam', { data: result });
//            $("#HistoryGrid").trigger('reloadGrid');
//            $("#HistoryGrid").showCol("Id");
//            $(".HistoryModal").modal("show");



//        }
//    });
//});
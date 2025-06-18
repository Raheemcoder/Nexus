
var projectUpdatesDetailsHeaderData = $.parseJSON($('#ProjectUpdatesDetailsHeaderData').val());
var roleId =$('#RoleId').val();
var isExport = false;

$('.prototype_').hide()
$('.prototype_1').hide()
$('.prototype_3').hide()

//$('#productModal').modal({
//    keyboard: false
//      backdrop: 'static',
//});

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        ignoreCase: true,
        filter: false,
        width:100,
        search:false,
        formatter: function (cellvalue, options, rowobject) {
            
            if (roleId == "5") {
                return `<div class="justify-center_ d-flex">
                         <a href="#" onclick="onclickGanchatt(this)" class="btn-icon -add" title="Gantt Chart" ><i class="fas fa-chart-bar" aria-hidden="true"></i></a>
                         <a href="#" onclick="onClickHistoryProjectUpdates(this)" class="btn-icon -history" title="View History" ><i style="backgroundcolor" class="fas fa-history" aria-hidden="true"></i></a>
                     </div>`;
            }
            else {
                return `<div class="justify-center_ d-flex">
                         <a href="#" onclick="onclickGanchatt(this)" class="btn-icon -add" title="Gantt Chart" ><i class="fas fa-chart-bar" aria-hidden="true"></i></a>
                         <a onclick="onClickEditProjectUpdates(this)" class="btn-icon -edit" title="Edit"><i class="fas fa-edit"></i></a>
                         <a href="#" onclick="onClickHistoryProjectUpdates(this)" class="btn-icon -history" title="View History" ><i style="backgroundcolor" class="fas fa-history" aria-hidden="true"></i></a>
                    </div>`;
            }
           
        },
        
    },

    {
        name: 'ProjectCode',
        label: 'Project Id',
        resizable: true,
        ignoreCase: true,
        width: 110,
       
    },
    {
        name: 'ProjectId',
        label: 'Project Id',
        resizable: true,
        ignoreCase: true,
        width: 110,
        hidden:true,
    },

    {
        name: 'ProjectName',
        label: 'Project Description',
        resizable: true,
        ignoreCase: true,
        width: 170,
        
    },
    {
        name: 'StartDate',
        label: 'Start Date',
        resizable: true,
        ignoreCase: true,
        width: 110,
    },
    {
        name: 'EndDate',
        label: 'End Date',
        resizable: true,
        ignoreCase: true,
        width: 110,
    },
    {
        name: 'LastMonth',
        label: 'Last Month Updates',
        resizable: true,
        ignoreCase: true,
        width: 270,
        exportcol: true,
        formatter: function (cellvalue, option, rowobject) {
            if (isExport) {
                var $tempElement = $('<div>').html(cellvalue);
                $tempElement.find('ol').each(function () {
                    $(this).find('li').text(function (index, text) {
                        return (index + 1) + '. ' + text;
                    });
                });

                var plainText = $tempElement.text();

                return plainText;
            }
            else {
                return formatComments(cellvalue, option, "Last Month Updates");
            }
        }
    },
    {
        name: 'CurrentMonth',
        label: 'Current Month Updates',
        resizable: true,
        ignoreCase: true,
        width: 270,
        exportcol: true,
        formatter: function (cellvalue, option, rowobject) {
            if (isExport) {
                var $tempElement = $('<div>').html(cellvalue);
                $tempElement.find('ol').each(function () {
                    $(this).find('li').text(function (index, text) {
                        return (index + 1) + '. ' + text;
                    });
                });

                var plainText = $tempElement.text();

                return plainText;
            }
            else {
                return formatComments(cellvalue, option, "Current Month Updates");
            }
        }
    },
    
    {
        name: 'ProjectHub',
        label: 'HUBs',
        resizable: true,
        ignoreCase: true,
        width: 110,
    },
    {
        name: 'ProjectDivision',
        label: 'Division',
        resizable: true,
        ignoreCase: true,
        width: 130,
    },
    {
        name: 'Sku',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
        width: 130,
    },
    {
        name: 'TargetTTD',
        label: 'Target TTD',
        resizable: true,
        ignoreCase: true,
        width: 130,
    },
    {
        name: 'TargetProductionDate',
        label: 'Target Production Date',
        resizable: true,
        ignoreCase: true,
        width: 130,
    },

    {
        name: 'ProjectType',
        label: 'Project Type',
        resizable: true,
        ignoreCase: true,
        width: 110,
        hidden:true
    },
    {
        name: 'ProjectClassification',
        label: 'Project Classification',
        resizable: true,
        ignoreCase: true,
        width: 160,
        hidden:true
    },
    {
        name: 'RAndDName',
        label: 'R&D Name',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ProjectLead',
        label: 'Project Lead',
        resizable: true,
        ignoreCase: true,
        width: 110,
    },
    {
        name: 'HubId',
        label: 'HubId',
        resizable: true,
        ignoreCase: true,
        width: 110,
        hidden:true
    },
    {
        name: 'ProjectStatus',
        label: 'Project Status',
        resizable: true,
        ignoreCase: true,
        width:120,
        formatter: function (cellvalue, options, rowobject) {
            if (roleId == 5) {
                if (cellvalue == "Completed") {
                    return '<a onclick="onClickHistoryProjectUpdates(this)" <p class="text-success">' + cellvalue + '</p></a>'
                }
                else if (cellvalue == "Planning") {
                    return '<a onclick="onClickHistoryProjectUpdates(this)" <p class="text-warning">' + cellvalue + '</p></a>'
                }
                else if (cellvalue == 'In Progress') {
                    return '<a onclick="onClickHistoryProjectUpdates(this)" <p class="text-info">' + cellvalue + '</p></a>'
                }
                else if (cellvalue == 'Locked') {
                    return '<a onclick="onClickHistoryProjectUpdates(this)" <p class="text-danger">' + cellvalue + '</p></a>'
                }

            }
            else {
                if (cellvalue == "Completed") {
                    return '<a onclick="onClickEditProjectUpdates(this)" <p class="text-success">' + cellvalue + '</p></a>'
                }
                else if (cellvalue == "Planning") {
                    return '<a onclick="onClickEditProjectUpdates(this)" <p class="text-warning">' + cellvalue + '</p></a>'
                }
                else if (cellvalue == 'In Progress') {
                    return '<a onclick="onClickEditProjectUpdates(this)" <p class="text-info">' + cellvalue + '</p></a>'
                }
                else if (cellvalue == 'Locked') {
                    return '<a onclick="onClickEditProjectUpdates(this)" <p class="text-danger">' + cellvalue + '</p></a>'
                }
            }
            
           
        }
    },
    {
        name: 'StatusName',
        label: 'Project Status',
        resizable: true,
        ignoreCase: true,
        exportcol:true,
        hidden: true,

    },
],

    $("#ProjectUpdatesList").jqGrid({
        url: '',
        datatype: 'local',
        data: projectUpdatesDetailsHeaderData.length == 0 ? [] : projectUpdatesDetailsHeaderData,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_ProjectUpdatesList',
        rowNum: projectUpdatesDetailsHeaderData.length,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ProjectUpdatesList tbody tr");
            var objHeader = $("#ProjectUpdatesList tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#ProjectUpdatesList").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': 'auto' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 258) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");

}

$('[data-datepicker-year]').datepicker({
    format: 'yyyy',
    viewMode: 'years',
    minViewMode: 'years',
    autoclose: true
});
$(document).ready(function () {
    $('#Projectleaddetails').select2();  
            $('.filterable .btn-filter').click(function () {
                var $panel = $(this).parents('.filterable'),
                    $filters = $panel.find('.filters input'),
                    $tbody = $panel.find('.table tbody');
                if ($filters.prop('disabled') == true) {
                    $filters.prop('disabled', false);
                    $filters.first().focus();
                } else {
                    $filters.val('').prop('disabled', true);
                    $tbody.find('.no-result').remove();
                    $tbody.find('tr').show();
                }
            });

        $('.filterable .filters input').keyup(function (e) {
            /* Ignore tab key */
            var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function () {
                var value = $(this).find('td').eq(column).text().toLowerCase();
        return value.indexOf(inputContent) === -1;
            });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
            }
        });
    });
        setTimeout(function () {
            $('#message_alert').fadeOut('slow');
    }, 5000);



$('#SearchPUData').on('click', function () {
    
    ProjectUpdateLoad();
});

function ProjectUpdateLoad() {
    
    var PUDivision = $("#PUDivision").val();
    var PURandD = $("#PURandDName").val();
    var PUStatus = $("#PUStatus").val();
    var PUProjectType = $("#PUProjectType").val();
    var PUClasiification = $("#PUProjectClassification").val();
    var PUYesNo = $("#PUYesNo").val();
    var ProjectLead = $('#Projectleaddetails').val();
    var UserName = $('#userName').val();

    
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectUpdates/ProjectUpdatesHeaderData",
        data: { PUDivision: PUDivision, PURandD: PURandD, Status: PUStatus, ProjectType: PUProjectType, ProjectClassification: PUClasiification, Updates: PUYesNo, ProjectLead: ProjectLead, UserName: UserName },
        success: function (App_Results) {
            
            App_jsons = JSON.parse(App_Results);
            $.jgrid.gridUnload('#ProjectUpdatesList');
            $("#ProjectUpdatesList").jqGrid({
                height: 'auto',
                datatype: 'local',
                data: App_jsons,
                mtype: 'GET',
                colModel: colmodels,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_ProjectUpdatesList',
                rowNum: 3000,
                scroll: true,

                gridComplete: function () {
                    var objRows = $("#ProjectUpdatesList tbody tr");
                    var objHeader = $("#ProjectUpdatesList tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }
                }
            });
            $("#ProjectUpdatesList").jqGrid('filterToolbar', {
                autosearch: true,
                stringResult: false,
                searchOnEnter: false,
                defaultSearch: "cn"
            });

            $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 258) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
            }
            else {
                $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");

            }
        },

        error: function () {
            alert("Error occured!!");
        }
    });
}


$("#ExcelDownload").click(function () {
    isExport = true;

    var grid = $('#ProjectUpdatesList');
    grid.hideCol('Action');
    grid.hideCol('ProjectStatus');

    var data = $('#ProjectUpdatesList').jqGrid('getGridParam', 'data');

    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        try {
            
            
            $('#ProjectUpdatesList').jqGrid("exportToExcel", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "ProjectUpdates.xlsx",
                maxlength: 80,
                exportcol: true  
            });
        } catch (err) {
            alert(err);
        }
 
        grid.showCol('Action');
        grid.showCol('ProjectStatus');
    }
    isExport = false;
});

function onClickEditProjectUpdates(obj) {
    
    var rowData = GetRowDataInArray(obj);

    
    window.location.href = ROOT + "ProjectUpdates/EditProjectUpdates" + '?q=' + Encrypt("projectCode=" + rowData.ProjectCode);
    
}
function onClickHistoryProjectUpdates(obj) {
    
    var rowData = GetRowDataInArray(obj);

    
    window.location.href = ROOT + "ProjectUpdates/Project_Updates_History" + '?q=' + Encrypt("ProjectCode=" + rowData.ProjectCode);
    
}

function GetRowDataInArray(obj) {
    //
    //var ctr = $(obj).closest("tr");
    var grid = $('#ProjectUpdatesList');
    var rowId = $(obj).closest("tr.jqgrow").attr("id");
    var projectCode = grid.jqGrid('getCell', rowId, 'ProjectCode');
    var projectId = grid.jqGrid('getCell', rowId, 'ProjectId');
    var ProjectName = grid.jqGrid('getCell', rowId, 'ProjectName');
    var HubId = grid.jqGrid('getCell', rowId, 'HubId');

    var arrayitem = {
        ProjectCode: projectCode,
        ProjectId: projectId,
        ProjectName: ProjectName,
        HubId: HubId
    };

    return arrayitem;

}

function showCommentsPopup(rowId,month) {

    //var str = '';
    var cellvalue = $("#commentsRow" + rowId).attr("data-comments"); 
    $('#commentsData').html(cellvalue);
    $('#commentModalPopup').text(month);
    $('#commentsModal').modal('show');
}

function formatComments(cellvalue, option, month) {
    if (cellvalue != 'No Updates Available') {
        
        var $tempElement = $('<div></div>'); // Create a temporary element
        $tempElement.html(cellvalue); // Set the HTML string as its content

        var $listItems = $tempElement.find('li'); // Find all list items
        var listItemCount = $listItems.length; // Count the number of list items

        var $tempElement2 = '';
        if (listItemCount > 4) {
            $listItems = $listItems.slice(0, 4);
            $tempElement2 = $('<div></div>');
            $tempElement2.html($listItems);
            // Keep only the first three list items
        }

        //var str = $listItems.prop('outerHTML'); // Get the HTML string of the modified list items
        var str = "";
        if (listItemCount > 4) {
            str += `<a href="#" class="read-more-show" data-comments="${cellvalue}" id="commentsRow${option.rowId}" onclick="showCommentsPopup(${option.rowId},\'`+month+`\')">Read More</a>`;
            var htmlCode = '';
            $listItems.each(function () {
                htmlCode += this.outerHTML;
            });
            return '<ol>' + htmlCode + '</ol>' + str;
        }
        else {
            return '<div>' + cellvalue + '</div>';
        }
    }
    else {
        return cellvalue;
    }

}

if (roleId == 5) {
    $('#editIcon').hide();
}


//$('.tags').autocomplete({
//    source: ProjectLeadListDetails,
//    //select: function (event, ui) {
//    //    $('#ProjectLead').val(ui.item.label);
//    //}
//})


function onclickGanchatt(obj) {
    var rowData = GetRowDataInArray(obj);
    window.location.href = ROOT + 'GanttChart/Index?q=' + Encrypt("projectId=" + rowData.ProjectId + "&projectCode=" + rowData.ProjectCode + "&isFromPu=Yes" + "&projectName=" + encodeURIComponent(rowData.ProjectName) + "&Hub=" + rowData.HubId);
}
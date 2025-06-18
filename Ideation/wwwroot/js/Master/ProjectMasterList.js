var previousValue = '';
var selectedrowid = '';
$(document).ready(function () {

    $('#ProjectId').hide();
    $(".projectName_error").hide();

    //projectNameList
    $("#projectNameList").eq(1).remove();
    $('#projectNameList').hide();
    var IsActiveList = ['Active', 'InActive'];
   
        $.ajax({
            async: true,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            url: ROOT + "ProjectTracker/ProjectList",
            //data: { itemId: 0 },
            success: function (data) {
                if (data != null) {
                    data = JSON.parse(data);
                    CreateJQGrid(data);
                }
            },
            error: function () {
            }
        });

        function CreateJQGrid(data) {
            jQuery("#jqgrid").jqGrid({
                datatype: 'local',
                data: data,
                colModel: [
                    {
                        name: 'StatusDropdown',
                        label: 'StatusDropdown',
                        width: 100,
                        resizable: true,
                        ignoreCase: true,
                        hidden: true
                    },
                    {
                        name: 'ProjectId',
                        label: 'ProjectId',
                        width: 100,
                        resizable: true,
                        ignoreCase: true,
                        hidden: true
                    },
                    {
                        name: 'ProjectStatusId',
                        label: 'ProjectStatusId',
                        width: 100,
                        resizable: true,
                        ignoreCase: true,
                        hidden: true
                    },
                    {
                        name: 'Action',
                        label: 'Action',
                        width: 110,
                        resizable: true,
                        ignoreCase: true,
                        classes: 'text-center',
                        search: false,
                        formatter: function (cellvalue, options, rowobject) {
                            return '<div class="grid-icons-group -justify-center"><a id="prject-edit" href="javascript: void(0);" class="grid-icon-only prject-edit" title="Edit"><i class="fas fa-pen"></i></a><span id="prject-close" class="grid-icon-only prject-close hide" title="Close"><a class="grid-icon-only" href="javascript: void(0) ;" ><i class="fas fa-times"></i></a><a href="" class="grid-icon-only" title="Save" onclick="FetchData(' + options.rowId + ')"><i class="fas fa-save ml-3"></i></a></span></div>';
                        }
                    },
                    {
                        name: 'ProjectCode',
                        label: 'Project Code',
                        width: 100,
                        search: true,
                        resizable: true,
                        ignoreCase: true
                    },
                    {
                        name: 'ProjectName',
                        resizable: true,
                        label: 'Project Name',
                        width: 100,
                        ignoreCase: true
                    },
                    {
                        name: 'Hub',
                        resizable: true,
                        label: 'Project Hub',
                        width: 100,
                        ignoreCase: true
                    },
                    {
                        name: 'Division',
                        resizable: true,
                        label: 'Project Division',
                        width: 100,
                        ignoreCase: true
                    },
                    {
                        name: 'Type',
                        label: 'Project Type',
                        resizable: true,
                        width: 100,
                        ignoreCase: true
                    },
                    {
                        name: 'Manager',
                        resizable: true,
                        label: 'Project Manager/Responsible',
                        width: 100,
                        ignoreCase: true,

                    },

                    {
                        name: 'Status',
                        resizable: true,
                        width: 70,
                        label: 'Project Status',
                        ignoreCase: true,
                        title: false,
                        // cmTemplate: { title: false },
                        formatter: function (cellvalue, options, rowobject) {

                            var optionData = "";
                            for (var optionIndex = 0; optionIndex < rowobject.StatusDropdown.length; optionIndex++) {
                                if (rowobject.StatusDropdown[optionIndex] == rowobject.Status) {
                                    optionData += ("<option>" + rowobject.StatusDropdown[optionIndex] + "</option>");

                                }

                            }
                            for (var optionIndex = 0; optionIndex < rowobject.StatusDropdown.length; optionIndex++) {
                                if (rowobject.StatusDropdown[optionIndex] != rowobject.Status) {
                                    optionData += ("<option>" + rowobject.StatusDropdown[optionIndex] + "</option>");

                                }
                            }
                            return '<span class="' + rowobject.Class + ' status_text">' + rowobject.Status + '</span>' + '<div class="status-dropdown"><select id="' + options.rowId + 'status-dropdown" class="form-control status-dropdown table-dropdown hide" onchange="statuschanged(' + options.rowId +')">' + optionData + '</select></div>';

                        }
                    },
                    {
                        name: 'PMUMappingStatus',
                        resizable: true,
                        label: 'Is Approved',
                        width: 100,
                        ignoreCase: true,
                        //formatter: function (cellvalue, options, rowobject) {
                        //    if (rowobject.PMUMappingStatus == 'APPROVED') {
                        //        return 'Yes'
                        //    } else if (rowobject.PMUMappingStatus == 'SUBMITTED') {
                        //        return 'No'
                        //    } else {
                        //       // return 'Yet to Start';
                        //        return ''
                        //    }
                        //}

                    },
                    {
                        name: 'IsActive',
                        resizable: true,
                        width: 70,
                        label: 'Is Active',
                        ignoreCase: true,
                        title: false,
                        // cmTemplate: { title: false },
                        formatter: function (cellvalue, options, rowobject) {

                            var optionData = "";
                            for (var optionIndex = 0; optionIndex <= IsActiveList.length - 1; optionIndex++) {
                                optionData += ("<option>" + IsActiveList[optionIndex] + "</option>");
                            }
                            return '<span class="' + rowobject.IsActiveClass + ' status_text">' + rowobject.IsActive + '</span>' + '<div class="status-dropdown"><select id="' + options.rowId + 'IsActive-dropdown" class="form-control status-dropdown table-dropdown hide">' + optionData + '</select></div>';

                        }
                    },
                ],
                //scroll: 1,
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
                // resizable: true,
                //width: 100,
                stringResult: true,
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
    function FetchData(data) {
        debugger;
        var rowData = jQuery("#jqgrid").getRowData(data);
        pageload = false;
        var projectId = rowData['ProjectId'];
        var status = $('#' + data + 'status-dropdown :selected').text();
        var IsActive = $('#' + data + 'IsActive-dropdown :selected').text();

        var fetch = { ProjectId: projectId, Status: status, IsActive: IsActive };
        var projectData = JSON.stringify({ 'projectData': fetch });

        //if (rowData.PMUMappingStatus == 'Yes' || rowData.PMUMappingStatus == 'No') {
        //    $('#ProjectStatuschange').modal('show');
        //    return false;
        //} else {
        //    UpdateStatus(fetch);
        //}
        $.ajax({
            // contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            url: ROOT + "Master/ProjectMaster",
            method: "POST",
            data: { projectData: fetch },
            success: function () {
                window.location.href = ROOT + "Master/ProjectMaster";
                //location.reload();
                // alert("Succesfully updated data");
            },
            error: function (err) {
                Console.error(err);
            }
        });

    }

});


$(document).on('click', '.prject-edit', function () {
    $(this).closest(".ui-widget-content").find(".status-dropdown").removeClass("hide");
    $(this).closest(".ui-widget-content").find(".status_text").addClass("hide");
    $(this).addClass("hide");
    $(this).closest(".grid-icons-group").find(".prject-close").removeClass("hide");
});

$(document).on('click', '.prject-close', function () {
    $(this).closest(".ui-widget-content").find(".status-dropdown").addClass("hide");
    $(this).closest(".ui-widget-content").find(".status_text").removeClass("hide");
    $(this).addClass("hide");
    $(this).closest(".grid-icons-group").find(".prject-edit").removeClass("hide");
});

//getting prev dropdown value 

$(document).on('click', '.status-dropdown', function () {
    previousValue = $(this).val();
});
$('#jqgrid tr').on('click', function () {
    var rowId = $(this).attr('id');
    console.log('Clicked row ID: ' + rowId);
});

function statuschanged(rowId) {
    var rowData = jQuery("#jqgrid").getRowData(rowId);
    selectedrowid = rowId;
    var status = $('#' + rowId + 'status-dropdown :selected').text();

    if (rowData.PMUMappingStatus == 'Yes') {
        if (status == 'Completed' || status == 'Locked')
        $('#ProjectStatuschange').modal('show');
        return false;
    }
}
$('#btnCancel').click(function () {
    $('#' + selectedrowid + 'status-dropdown :selected').val('In Progress');
    $('#' + selectedrowid + 'status-dropdown :selected').text('In Progress');


})
$('#btnAccept').click(function () {
    $('#ProjectStatuschange').hide();

})








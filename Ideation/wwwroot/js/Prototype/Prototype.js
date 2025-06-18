var prototypeDetailsHeaderData = $.parseJSON($('#PrototypeDetailsHeaderData').val());

$('[data-datepicker-year]').datepicker({
    format: 'yyyy',
    viewMode: 'years',
    minViewMode: 'years',
    autoclose: true
});

$(document).ready(function () {

    if ($("#Role").val() === "F&D User" || $("#Role").val() === "ADMIN") {
        $(".AddProto").show();
    }


    $('.data-singleselect').select2();

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

colmodels1 = [

    {
        name: 'Action',
        label: 'Action',
        width: 100,
        resizable: true,
        ignoreCase: true,
        filter: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            if ($("#Role").val() === "ADMIN") {
                return '<div class="justify-center_">'
                    +

                    (rowobject.StatusId == "6" || rowobject.StatusId == "8" ?
                        `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view">
                       <i class="fas fa-eye" title="View"></i></a>`: `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                            <i class="fas fa-edit" title="Edit"></i>
                        </a>`)
                    +

                    (rowobject.StatusId == "6" ? `<a href="#" onclick="downloadReportFile(this)" class="btn-icon -download">
                       <i class="fas fa-download" title = "Download"></i></a>`: '<i></i>') +


                    (rowobject.StatusId == "2" && rowobject.InitiatedBy == $('#empId').val() ? `<a onclick=OnClickDeleteProjectBrief(this) class="btn-icon -delete" title="Delete" >
                       <i class="fas fa-trash" id=""></i></a>` : '<i></i>') +

                    (rowobject.StatusId == "1" ? '<i></i>' : `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                            <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                        </a>`) +

                    '</div>';
            }
            else if ($("#Role").val() == "F&D User") {

                return `<div class="justify-center_">`
                    +

                    (rowobject.StatusId == "8" || rowobject.StatusId == "5" || rowobject.StatusId == "3" || rowobject.StatusId == "6" || (rowobject.StatusId == "4" && rowobject.hubuser == '') || (rowobject.StatusId == '7' && rowobject.InitiatedBy != $('#empId').val()) || (rowobject.StatusId == '9' && rowobject.InitiatedBy != $('#empId').val()) || rowobject.StatusId == "4" && rowobject.hubuser != $("#empId").val() || rowobject.StatusId == "10" && rowobject.IsEditableByManager=='0' ?
                        `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                        <i class="fas fa-edit" title="Edit"></i>
                        </a>`) +

                    (rowobject.StatusId == "4" && rowobject.HubApprovalFromStatus == "4" ? `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                            <i class="fas fa-edit" title="Edit"></i>
                        </a>`: '<i></i>') +

                    (rowobject.StatusId == "6" ? `<a href="#" onclick="downloadReportFile(this)" class="btn-icon -download">
                       <i class="fas fa-download" title = "Download"></i></a>`: '<i></i>') +

                    (rowobject.StatusId == "2" && rowobject.InitiatedBy == $('#empId').val() ? `<a onclick=OnClickDeleteProjectBrief(this) class="btn-icon -delete" title="Delete" >
                       <i class="fas fa-trash" id=""></i></a>` : '<i></i>') +

                    (rowobject.StatusId == "1" ? '<i></i>' : `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                        <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                    </a>`) +
                    '</div>';
            }



            else if ($("#Role").val() == "PMD Team") {

                return '<div class="justify-center_">'
                    +

                    (rowobject.StatusId == "5" || rowobject.StatusId == "7" && rowobject.InitiatedBy != $('#empId').val() || rowobject.StatusId == "9" && rowobject.InitiatedBy != $('#empId').val()
                        || rowobject.StatusId == "8" || rowobject.StatusId == "6" || rowobject.StatusId == "4" && rowobject.hubuser != $("#empId").val()
                    || rowobject.StatusId == "3" && rowobject.InitiatedBy == $("#empId").val() || rowobject.PMDuser?.split(',').indexOf($("#empId").val()) == -1 || rowobject.StatusId == "10" && rowobject.IsEditableByManager == 0 ?
                        `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view"> <i class="fas fa-eye" title="View"></i></a>` : `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                            <i class="fas fa-edit" title="Edit"></i>
                        </a>`)
                    + (rowobject.StatusId == "4" && rowobject.HubApprovalFromStatus == "4" ? `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                            <i class="fas fa-edit" title="Edit"></i></a>`: '<i></i>')

                    + (rowobject.StatusId == "6" ? `<a href="#" onclick="downloadReportFile(this)" class="btn-icon -download">
                       <i class="fas fa-download" title = "Download"></i></a>`: '<i></i>') +


                    (rowobject.StatusId == "2" && rowobject.InitiatedBy == $('#empId').val() ? `<a onclick=OnClickDeleteProjectBrief(this) class="btn-icon -delete" title="Delete" >
                       <i class="fas fa-trash" id=""></i></a>` : '<i></i>') +

                    (rowobject.StatusId == "1" ? '<i></i>' : `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                            <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                        </a>`) +
                    '</div>';
            }
            else if ($("#Role").val() == "HGML Team") {

                return '<div class="justify-center_">'
                    +

                    (rowobject.StatusId == "7" && rowobject.InitiatedBy != $('#empId').val() || rowobject.StatusId == "9" && rowobject.InitiatedBy != $('#empId').val() || rowobject.StatusId == "8" || rowobject.StatusId == "4" ||
                        rowobject.StatusId == "6" || rowobject.StatusId == "3" || rowobject.StatusId == "5" && rowobject.HGMLuser.toLowerCase() != $("#empId").val().toLowerCase() || rowobject.StatusId == "10" && rowobject.IsEditableByManager==0 ?

                        `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                            <i class="fas fa-edit" title="Edit"></i>
                        </a>`)

                    + (rowobject.StatusId == "6" ? `<a href="#" onclick="downloadReportFile(this)" class="btn-icon -download">
                       <i class="fas fa-download" title = "Download"></i></a>`: '<i></i>') +


                    (rowobject.StatusId == "2" && rowobject.InitiatedBy == $('#empId').val() ? `<a onclick=OnClickDeleteProjectBrief(this) class="btn-icon -delete" title="Delete" >
                       <i class="fas fa-trash" id=""></i></a>` : '<i></i>') +


                    (rowobject.StatusId == "1" ? '<i></i>' : `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                            <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                        </a>`) +

                    '</div>';

            }
            else if ($("#Role").val() === "View_Prototype") {
           
                return '<div class="justify-center_">' +

                    (rowobject.StatusId == "6" ? `<a href="#" onclick="downloadReportFile(this)" class="btn-icon -download">
                       <i class="fas fa-download" title = "Download"></i></a>`: '<i></i>') +

                    (rowobject.StatusId == "8" || rowobject.StatusId == "6" || rowobject.StatusId == "3" || rowobject.StatusId == "4" || rowobject.StatusId == "5" || rowobject.StatusId == "7" || rowobject.StatusId == "9" || rowobject.StatusId == "10" || rowobject.StatusId == "2" ?
                        `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : '<i></i>')


            }


            else if ($("#Role").val() === "Marketing Team") {
                debugger

                if (rowobject.StatusId == "5" || rowobject.StatusId == "8" || rowobject.StatusId == "3" || rowobject.StatusId == "6") {

                    if (rowobject.StatusId == "6") {
                        return '<div class="justify-center_">' +

                            `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` +
                            `<a href="#" onclick="downloadReportFile(this)" class="btn-icon -download">
                             <i class="fas fa-download" title="Download"></i></a>`+
                            `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                             <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                             </a>`+ '</div>';

                    }
                    else {
                        return '<div class="justify-center_">' +

                            `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` +
                            `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                             <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                             </a>`+ '</div>';
                    }
                }
                else if (rowobject.StatusId == "7" || rowobject.StatusId == "9" || rowobject.StatusId == "4") {

                    if (rowobject.StatusId == "7" && rowobject.InitiatedBy == $('#empId').val() || rowobject.StatusId == "9" && rowobject.InitiatedBy == $('#empId').val()
                        || rowobject.InitiatedBy == $('#empId').val() && rowobject.StatusId == "4"
                        || rowobject.StatusId == "4" && rowobject.hubuser?.split(',').indexOf($("#empId").val()) != -1 && rowobject.HubApprovalFromStatus != "5") {
                        return '<div class="justify-center_">' +

                            `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                             <i class="fas fa-edit" title="Edit"></i>
                             </a>`+ `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                             <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                             </a>`+ '</div>';
                    }
                    else {
                        return '<div class="justify-center_">' +

                            `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` +
                            `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                             <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                             </a>`+ '</div>';
                    }
                }

                else if (rowobject.StatusId == "2" && rowobject.InitiatedBy == $('#empId').val()) {
                    return '<div class="justify-center_">' +

                        `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                             <i class="fas fa-edit" title="Edit"></i></a>`+
                        `<a onclick=OnClickDeleteProjectBrief(this) class="btn-icon -delete" title="Delete" >
                         <i class="fas fa-trash" id=""></i></a>`+
                        `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                             <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                             </a>`+ '</div>';
                }
                else if (rowobject.StatusId == "10") {
                    if (rowobject.IsEditableByManager == 1) {
                        return '<div class="justify-center_">' +

                            `<a href="#" onclick="onClickEditPrototype(this)" class="btn-icon -edit ">
                             <i class="fas fa-edit" title="Edit"></i>
                             </a>`+ `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                             <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                             </a>`+ '</div>';
                    }
                    else {
                        return '<div class="justify-center_">' +

                            `<a href="#" onclick="onClickViewPrototype(this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` +
                            `<a href="#" onclick="onClickHistoryProtoType(this)" class="btn-icon -history">
                             <i class="fas fa-history" aria-hidden="true" title="View History"></i>
                             </a>`+ '</div>';
                    }
                }
               
                else {
                    return ""

                }
            }
            else {
                return ""
            }

        }
    },

    {
        name: 'PrototypeId',
        label: 'Prototype ID',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },

   
    {
        name: 'ProjectNo',
        label: 'Project No',
        resizable: true,
        width: 120,
        ignoreCase: true,
    },
    {
        name: 'ProjectDescription',
        label: 'Project Description',
        resizable: true,
        ignoreCase: true,
        width: 180,
    },
    {
        name: 'ProductName',
        label: 'Product Name',
        resizable: true,
        ignoreCase: true,
        width: 180,
    },
    
    {
        name: 'StatusName',
        label: 'Status',
        width: 110,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            if (rowobject.StatusId !== null) {
                if ($("#Role").val() == "ADMIN") {
                    if (rowobject.StatusId == "6") {
                        return '<a href="#" class="ProjectBriefstatus text-success"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "8") {
                        return '<a href="#" class="ProjectBriefstatus text-danger"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "9" || rowobject.StatusId == "7") {
                        return '<a href="#" class="ProjectBriefstatus text-info" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else {
                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }
                }
                else if ($("#Role").val() == "F&D User") {

                    if (rowobject.StatusId == "5" || rowobject.StatusId == "3") {
                        return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "6") {
                        return '<a href="#" class="ProjectBriefstatus text-success"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "8") {
                        return '<a href="#" class="ProjectBriefstatus text-danger"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "9" || rowobject.StatusId == "7") {

                        if (rowobject.InitiatedBy == $("#empId").val()) {
                            return '<a href="#" class="ProjectBriefstatus text-info" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                        }
                        else {
                            return '<a href="#" class="ProjectBriefstatus text-info"><span>' + rowobject.StatusName + '</span></a>';
                        }

                    }
                    else if (rowobject.StatusId == "2" || rowobject.StatusId == "1") {
                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "4" && rowobject.hubuser == $("#empId").val() && rowobject.HubApprovalFromStatus == "5") {

                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "10" && rowobject.IsEditableByManager==1) {

                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else {
                        return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }

                }
                else if ($("#Role").val() == "HGML Team") {
                    

                    if (rowobject.StatusId == "3" || rowobject.StatusId == "4") {
                        return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "6") {
                        return '<a href="#" class="ProjectBriefstatus text-success"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "8") {
                        return '<a href="#" class="ProjectBriefstatus text-danger"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "9" || rowobject.StatusId == "7") {

                        if (rowobject.InitiatedBy == $("#empId").val()) {
                            return '<a href="#" class="ProjectBriefstatus text-info" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                        }
                        else {
                            return '<a href="#" class="ProjectBriefstatus text-info"><span>' + rowobject.StatusName + '</span></a>';
                        }
                    }
                    else if (rowobject.StatusId == "5" && rowobject.HGMLuser.toLowerCase() != $("#empId").val().toLowerCase()) {
                        return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "10" && rowobject.IsEditableByManager == 1) {

                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else {
                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }

                }
                else if ($("#Role").val() == "PMD Team") {
                    if (rowobject.StatusId == "5") {
                        return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "6") {
                        return '<a href="#" class="ProjectBriefstatus text-success"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "8") {
                        return '<a href="#" class="ProjectBriefstatus text-danger"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "9" || rowobject.StatusId == "7") {

                        if (rowobject.InitiatedBy == $("#empId").val()) {
                            return '<a href="#" class="ProjectBriefstatus text-info" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                        }
                        else {
                            return '<a href="#" class="ProjectBriefstatus text-info"><span>' + rowobject.StatusName + '</span></a>';
                        }
                    }
                    else if (rowobject.StatusId == '3' && rowobject.InitiatedBy == $("#empId").val()) {
                        return '<a href="#" class="projectbriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == '3' && rowobject.PMDuser?.split(',').indexOf($("#empId").val()) == -1) {
                        return '<a href="#" class="projectbriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "4" && rowobject.hubuser != $("#empId").val()) {

                        if (rowobject.StatusId == "4" && rowobject.HubApprovalFromStatus == "4") {
                            return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';

                        }
                        else {
                            return '<a href="#" class="projectbriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                        }
                    }
                    else if (rowobject.StatusId == "10" && rowobject.IsEditableByManager == 1) {

                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else {
                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }
                }
                else if ($("#Role").val() == "Marketing Team") {
                    if (rowobject.StatusId == "5" || rowobject.StatusId == "3") {
                        return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "6") {
                        return '<a href="#" class="ProjectBriefstatus text-success"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "8") {
                        return '<a href="#" class="ProjectBriefstatus text-danger"><span>' + rowobject.StatusName + '</span></a>';
                    }

                    else if (rowobject.StatusId == "4" && rowobject.hubuser?.split(',').indexOf($("#empId").val()) != -1 && rowobject.HubApprovalFromStatus != "5") {
                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    else if (rowobject.StatusId == "9" || rowobject.StatusId == "7") {

                        if (rowobject.InitiatedBy == $("#empId").val()) {
                            return '<a href="#" class="ProjectBriefstatus text-info" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                        }
                        else {
                            return '<a href="#" class="ProjectBriefstatus text-info"><span>' + rowobject.StatusName + '</span></a>';
                        }

                    }
                    else if (rowobject.StatusId == "2" || rowobject.StatusId == "1") {

                        if (rowobject.InitiatedBy == $("#empId").val()) {
                            return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                        }
                        else {
                            return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                        }

                    }
                    else if (rowobject.StatusId == "10" && rowobject.IsEditableByManager == 1) {

                        return '<a href="#" class="ProjectBriefstatus text-warning" onclick="onClickEditPrototype(this)"><span>' + rowobject.StatusName + '</span></a>';
                    }
                  
                    else {
                        return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }

                }
                else if ($("#Role").val() === "View_Prototype") {
                    debugger
                    rowobject.PrototypeId
                    if (rowobject.StatusId == "6") {
                        return '<a href="#" class="ProjectBriefstatus text-success"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    if (rowobject.StatusId == "3" || rowobject.StatusId == "4" || rowobject.StatusId == "5" || rowobject.StatusId == "10" || rowobject.StatusId == "2" || rowobject.StatusId == "1")  {
                        return '<a href="#" class="ProjectBriefstatus text-warning"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    if (rowobject.StatusId == "7" || rowobject.StatusId == "9") {
                        return '<a href="#" class="ProjectBriefstatus text-info"><span>' + rowobject.StatusName + '</span></a>';
                    }
                    if (rowobject.StatusId == "8") {
                        return '<a href="#" class="ProjectBriefstatus text-danger"><span>' + rowobject.StatusName + '</span></a>';
                    }
                }
            }
            else
                return "";
        }

    },
    {
        name: 'HUBStatus',
        label: 'HUB Status',
        width: 75,
        filter: false,
        search: false,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return `<div class="justify-center_">` +
                (rowobject.StatusId == "4" || rowobject.StatusId == "5" || rowobject.StatusId == "6" || rowobject.StatusId == "8"
                    ? `<a href="#" class="btn-icon -info"><i class="fas fa-info-circle" onclick="onclickViewHubStatus(this)" aria-hidden="true" title="Hub info"></i></a>` : '<i></i>') + `</div>`
        }
    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'DivisionName',
        label: 'Division',
        resizable: true,
        ignoreCase: true,
        width: 85,
    },
    {
        name: 'HghCode',
        label: 'HGH Code',
        resizable: true,
        ignoreCase: true,
        width: 85,
    },
    {
        name: 'ProvisionalClaim',
        label: 'Provisional Claim',
        resizable: true,
        ignoreCase: true,
        width: 120
    },
    {
        name: 'DosageForm',
        label: 'Dosage Form',
        resizable: true,
        ignoreCase: true,
        width: 90
    },
    {
        name: 'NoOfSubmission',
        label: 'No.Of Submissions',
        resizable: true,
        ignoreCase: true,
        width: 112,
    },
    {
        name: 'UserName',
        label: 'Initiated By',
        resizable: true,
        ignoreCase: true,
        width: 100,

    },
    {
        name: 'InitiatedOn',
        label: 'Initiated On',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'CompletedOn',
        label: 'Completed On',
        resizable: true,
        ignoreCase: true,
        width: 100
    },


    {
        name: 'StatusId',
        label: 'Status Id',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'hubstatus',
        label: 'hubstatus',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'hubuser',
        label: 'hubuser',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },


    {
        name: 'SendToHub',
        label: 'SendToHub',
        resizable: true,
        ignoreCase: true,
        hidden: true

    },
    {
        name: 'HGMLuser',
        label: 'HGMLuser',
        resizable: true,
        ignoreCase: true,
        hidden: true

    },
    {
        name: 'HubApprovalFromStatus',
        label: 'HubApprovalFromStatus',
        resizable: true,
        ignoreCase: true,
        hidden: true

    },

    {
        name: 'IsHgmlApproved',
        label: 'IsHgmlApproved',
        resizable: true,
        ignoreCase: true,
        hidden: true

    },
    {
        name: 'InitiatedBy',
        label: 'Initiated By',
        resizable: true,
        ignoreCase: true,
        hidden: true

    },
    {
        name: 'PMDuser',
        label: 'PMDUser',
        resizable: true,
        ignoreCase: true,
        hidden: true

    },

],

    console.log(prototypeDetailsHeaderData)

$("#Prototype_Details_Header").jqGrid({
    height: 'auto',
    url: '',
    datatype: 'local',
    data: prototypeDetailsHeaderData.length == 0 ? [] : prototypeDetailsHeaderData,//jsonFormNpdData['FormulationProfile'],
    mtype: 'GET',
    colModel: colmodels1,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_Prototype_Details_Header',
    rowNum: 100000,
    scroll: true,

    gridComplete: function () {
        var objRows = $("#Prototype_Details_Header tbody tr");
        var objHeader = $("#Prototype_Details_Header tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
    }
});
$("#Prototype_Details_Header").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


function onClickEditPrototype(obj) {

    var rowData = GetRowDataInArray(obj);

    window.location.href = ROOT + "Prototype/EditAddPrototype" + '?q=' + Encrypt("prototypeId=" + rowData.PrototypeId + "&statusId=" + rowData.StatusId);

}

function GetRowDataInArray(obj) {

    //var ctr = $(obj).closest("tr");
    var grid = $('#Prototype_Details_Header');
    var rowId = $(obj).closest("tr.jqgrow").attr("id");

    var prototypeId = grid.jqGrid('getCell', rowId, 'PrototypeId');
    var projectNo = grid.jqGrid('getCell', rowId, 'ProjectNo');
    var statusId = grid.jqGrid('getCell', rowId, 'StatusId');
    var ProductName = $.trim(grid.jqGrid('getCell', rowId, 'ProductName'));
    var arrayitem = {
        PrototypeId: prototypeId, ProjectNo: projectNo, StatusId: statusId, ProductName: ProductName
    };

    return arrayitem;

}

$('#SearchPrototypeData').on('click', function () {
    debugger
    PrototypeLoad();
});

function PrototypeLoad() {
    debugger
    var PrototypeProjectNo = $("#PrototypeProjectNo").val();
    var ProjectName = $("#PrototypeProdutName").val();
    var StatusId = $("#PrototypeStatusName").val();

    if (PrototypeProjectNo == null || PrototypeProjectNo == "") { PrototypeProjectNo = 'All' }
    if (ProjectName == null || ProjectName == "") { ProjectName = 'All' }
    if (StatusId == 0 || StatusId == null || StatusId == "") { StatusId = 0 }
    debugger
    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/PrototypeHeaderData",
        data: { ProjectNo: PrototypeProjectNo, ProductName: ProjectName, StatusId: StatusId },
        success: function (App_Results) {
            console.log('hi');
            App_jsons = JSON.parse(App_Results);

            $.jgrid.gridUnload('#Prototype_Details_Header');
            $("#Prototype_Details_Header").jqGrid({
                height: 'auto',
                datatype: 'local',
                data: App_jsons,
                mtype: 'GET',
                colModel: colmodels1,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_Prototype_Details_Header',
                rowNum: 100000,
                scroll: true,

                gridComplete: function () {
                    var objRows = $("#Prototype_Details_Header tbody tr");
                    var objHeader = $("#Prototype_Details_Header tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }
                }
            });
            $("#Prototype_Details_Header").jqGrid('filterToolbar', {
                autosearch: true,
                stringResult: false,
                searchOnEnter: false,
                defaultSearch: "cn"
            });

            $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 330) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
            }
        },

        error: function () {
            alert("Error occured!!");
        }
    });
}

colmodels = [
    {
        name: 'FromStageName',
        label: 'From Stage',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'ToStageName',
        label: 'To stage',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'AssignedTo',
        label: 'Assigned To',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },


    {
        name: 'SubmittedOn',
        label: 'Submitted On',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ReceivedOn',
        label: 'Received On',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RemarksBy',
        label: 'Submitted By',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'NoOfDaysTaken',
        label: 'No. Of Days Taken',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
],
    $("#ViewApprovalHistory").jqGrid({
        height: 'auto',
        rowNum: 100,
        mtype: 'GET',
        datatype: 'local',
        data: [],
        loadonce: true,
        colModel: colmodels,
        pager: "#pager_ViewApprovalHistory",
        viewrecords: true,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#ViewApprovalHistory tbody tr");
            var objHeader = $("#ViewApprovalHistory tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


function onClickHistoryProtoType(obj) {
    var rowData = GetRowDataInArray(obj);
    var prototypeId = rowData.PrototypeId;

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetPrototypeHistory",
        data: { prototypeId: prototypeId },
        success: function (response) {
            var list = "";
            var fromstage = [];
            var tostage = [];
            var flow = response['PrototypeApprovalHistory'];
            var flowstatus = response['statusNamesList'];
            var newList = []
            for (var i = 0; i < flowstatus.length; i++) {

                if (flowstatus[i].StatusId === "2") {
                    newList.push( `<li class="bg_hgml yet-tocomplete mt-2" data-viewhistory=0 > Prepare(F & D)  </li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2" data-viewhistory=0></li>`)
                }
                else if (flowstatus[i].StatusId == "6") {
                    newList.push( `<li class="bg_hgml yet-tocomplete mt-2" data-viewhistory=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>`)
                }
                else if (flowstatus[i].StatusId == "8") {
                    continue;
                }
                else if (flowstatus[i].StatusId == "10") {
                    newList.splice(1, 0, `<li class="bg_hgml yet-tocomplete mt-2" data-viewhistory=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2"  data-viewhistory=${flowstatus[i].StatusId}></li>`);
                }
                else {
                    newList.push( `<li class="bg_hgml yet-tocomplete mt-2" data-viewhistory=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2"  data-viewhistory=${flowstatus[i].StatusId}></li>`)


                }
            }
            $('#AddLi').html(newList.join(""));
            var approvalFirstItemLabel = ["Prepare (F & D)"]

            if (flow != null && flow != undefined && flow != "") {
                $.each(flow, function (i, data) {
                    if (!$(`[data-viewhistory=${data.FromStage}]`).hasClass('completed') && data.FromStage !== 2) {
                       $(`[data-viewhistory=${data.FromStage}]`).removeClass('yet-tocomplete')
                        $(`[data-viewhistory=${data.FromStage}]`).addClass('completed')
                    }
                    if (data.FromStage == 2 || data.FromStage == 9 || data.FromStage == 7) {

                        $(`[data-viewhistory=0]`).removeClass('yet-tocomplete')
                        $(`[data-viewhistory=0]`).addClass('completed')
                     }

                    if (data.ToStage == 9 || data.ToStage == 7) {
                        if (data.ToStage == 9) {
                            if (!approvalFirstItemLabel.includes(" / Sent back to initiator")) {
                                approvalFirstItemLabel[1] = " / Sent back to initiator"
                            }
                        }
                        else if (data.ToStage == 7) {
                            if (!approvalFirstItemLabel.includes(" / Rework(F & D)")) {
                                approvalFirstItemLabel[2] = " / Rework(F & D)"
                            }
                        }

                        $(`.bg_hgml[data-viewhistory=0]`).text(approvalFirstItemLabel.join(""))
                    }

                });

                if (flow.length !== 0) {
                    let currentState = flow[0];

                    if (currentState.ToStage === "9" || currentState.ToStage === "7") {
                        $(`[data-viewhistory=0]`).removeClass('yet-tocomplete')
                        $(`[data-viewhistory=0]`).removeClass('completed')
                        $(`[data-viewhistory=0]`).addClass('warning')
                    }
                    else if (currentState.ToStage === "8") {
                        $(`[data-viewhistory=6]`).removeClass('yet-tocomplete')
                        $(`[data-viewhistory=6]`).removeClass('completed')
                        $(`[data-viewhistory=6]`).addClass('rejected')
                        $(`[data-viewhistory=6]`).text("Rejected")
                    }
                    else if (currentState.ToStage === "6") {
                        $(`[data-viewhistory=${currentState.ToStage}]`).removeClass('yet-tocomplete')
                        $(`[data-viewhistory=${currentState.ToStage}]`).addClass('completed')
                    }
                  else {
                        $(`[data-viewhistory=${currentState.ToStage}]`).removeClass('yet-tocomplete')
                        $(`[data-viewhistory=${currentState.ToStage}]`).removeClass('completed')
                        $(`[data-viewhistory=${currentState.ToStage}]`).addClass('warning')
                    }
                }


            } else {
                $(`[data-viewhistory=0]`).removeClass('yet-tocomplete')
                $(`[data-viewhistory=0]`).addClass('warning')
            }

            $("#ViewApprovalHistory").jqGrid("clearGridData");
            $("#ViewApprovalHistory").jqGrid('setGridParam', { data: response["PrototypeApprovalHistory"] });
            $("#ViewApprovalHistory").trigger('reloadGrid', [{ page: 1 }]);
            $("#PrototypeHistory").modal('show');

        }
    });
}

$(document).on("click", '#DownloadExcel', function () {
    debugger
    window.location.href = ROOT + "Prototype/GetPrototypeExcel";
});
//pdfdownload
//to downloa dthe report
function downloadReportFile(obj) {
   // $('#loader').css('visibility', 'visible');
    var rowData = GetRowDataInArray(obj);
    var fd = new FormData();
    var PrototypeId = rowData.PrototypeId;
    var ProductName = rowData.ProductName;
    $.ajax({
        url: ROOT + "Prototype/Prototypepdf",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { PrototypeId: PrototypeId },
        success: function (result) {
            //$('#loader').css('visibility', 'visible');
            $('.Prototypepdf').html(result);
            var htmldata = $(".Prototypepdf").html();
            fd.append('JsonString', htmldata)
            $.ajax({
                url: ROOT + 'Prototype/GeneratePrototypePDF',
                type: 'POST',
                dataType: 'HTML',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    //$('#loader').css('visibility', 'visible');
                    window.location = window.location.origin + ROOT + 'Prototype/GenerateProtoPDF?PrototypeId=' + PrototypeId + '&ProductName=' +ProductName
                }
            })


        }
    })
  //  $('#loader').css('visibility', 'hidden');

}



$("#HubStatus_Table_data").jqGrid({
    height: 'auto',
    rowNum: 100,
    mtype: 'GET',
    datatype: 'local',
    data: [],
    loadonce: true,
    colModel: [

        {
            name: 'RowNumber',
            label: 'S.No.',
            resizable: true,
            width: 68,
            ignoreCase: true,
            
        },
        {
            name: 'HubName',
            label: 'HUB',
            resizable: true,
            width: 80,
            ignoreCase: true,
        },
        {
            name: 'HubStatus',
            label: 'HUB Status',
            resizable: true,
            width: 130,
            ignoreCase: true,
            classes: "color",
            //formatter: function (cellvalue, options, rowobject) {
            //    if (cellvalue == "Approve") {
            //        return '<a <p class="text-success">' + cellvalue + '</p></a>'
            //    }
            //    else if (cellvalue == "Yet to Confirm") {
            //        return '<a <p class="text-warning">' + cellvalue + '</p></a>'
            //    }
            //    else if (cellvalue == 'Rework') {
            //        return '<a <p class="text-info">' + cellvalue + '</p></a>'
            //    }
            //    else if (cellvalue == 'Reject') {
            //        return '<a <p class="text-danger">' + cellvalue + '</p></a>'
            //    }

            //}
        },
        {
            name: 'HubUser',
            label: 'HUB User',
            resizable: true,
            width: 250,
            ignoreCase: true,
        },
        {
            name: 'HubRemarks',
            label: 'HUB Remarks',
            resizable: true,
            width: 200,
            ignoreCase: true,
        },
        {
            name: 'ModifiedDate',
            label: 'Approved Date',
            resizable: true,
            width: 200,
            ignoreCase: true,
        },
        {
            name: 'BatchNo',
            label: 'Batch Number',
            resizable: true,
            width: 120,
            ignoreCase: true,
        },

        {
            name: 'NumberOfSamples',
            label: 'No Of Samples',
            resizable: true,
            width: 90,
            ignoreCase: true,
        },
        {
            name: 'TrackingDetails',
            label: 'Tracking Details',
            resizable: true,
            width: 200,
            ignoreCase: true,
        },

        {
            name: 'PmdRemarks',
            label: 'PMD Remarks',
            resizable: true,
            width: 200,
            ignoreCase: true,
        },
        
    ],

    pager: "#HubStatus_pager",
    viewrecords: true,
    sortorder: "asec",
    scroll: true,

    gridComplete: function () {

        var objRows = $("#HubStatus_Table_data tbody tr");
        var objHeader = $("#HubStatus_Table_data tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }

        for (var i = 0; i < objRows.length; i++) {
            debugger
            if ($(objRows[i]).find("td:nth-child(3)").text() === "Yet to Confirm") {
                $(objRows[i]).find("td:nth-child(3)").addClass('warning1');
            }
            else if ($(objRows[i]).find("td:nth-child(3)").text() === "Approve") {
                $(objRows[i]).find("td:nth-child(3)").addClass('completed1');
            }
            else if ($(objRows[i]).find("td:nth-child(3)").text() === "Reject") {
                $(objRows[i]).find("td:nth-child(3)").addClass('rejected1');
            }
            else if ($(objRows[i]).find("td:nth-child(3)").text() === "Rework"){
                $(objRows[i]).find("td:nth-child(3)").addClass('rework');
            }
        }

    }
});
$("#HubStatus_Table_data").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
}

function onclickViewHubStatus(obj) {
    $("#HUBStatusInfo").modal('show');
    var rowData = GetRowDataInArray(obj);
    var PrototypeId = rowData.PrototypeId;
    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/HubStatusInfo",
        data: { PrototypeId: PrototypeId },
        success: function (Result) {
            jsondata = JSON.parse(Result);
            jQuery('#HubStatus_Table_data').jqGrid('clearGridData');
            $("#HubStatus_Table_data").jqGrid().setGridParam({
                datatype: 'local',
                data: jsondata
            }).trigger('reloadGrid', [{ page: 1 }]);
        },
        error: function () {
            alert("Error occured!!");
        }
    });

}

function OnClickDeleteProjectBrief(obj) {
    debugger
    var rowData = GetRowDataInArray(obj);

    $('div#ToDeleteTheSelectedGridRow').modal('show');

    $("#ToDeleteTheSelectedGridRow_Ok").click(function () {

        if (rowData.StatusId == "2") {
            window.location.href = ROOT + "Prototype/DeletePrototypeData?PrototypeId=" + rowData.PrototypeId;
        }
    });
}

function onClickViewPrototype(obj) {

    var rowData = GetRowDataInArray(obj);

    window.location.href = ROOT + "Prototype/EditAddPrototype" + '?q=' + Encrypt("prototypeId=" + rowData.PrototypeId + "&statusId=" + rowData.StatusId + "&iconName=View");

}


$("#ExcelDownload").click(function () {
    debugger

    var grid = $('#Prototype_Details_Header');
    grid.hideCol('Action');
    grid.hideCol('HUBStatus');
    grid.hideCol('StatusName');

    var data = $('#Prototype_Details_Header').jqGrid('getGridParam', 'data');

    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        try {
            $('#Prototype_Details_Header').jqGrid('exportToExcel', {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "Prototype.xlsx",
                maxlength: 80,
                exportcol: true,
            });


        } catch (err) {
            alert(err);
        }

        grid.showCol('Action');
        grid.showCol('HUBStatus');
        grid.showCol('StatusName');

    }
});



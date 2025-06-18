$(document).ready(function () {
    $('#loader').css('visibility', 'visible');
    var date = new Date();
    var searchedyear = $("#SearchedYear").val();
    if (searchedyear != null && searchedyear != "") {
        $('#Year').datepicker('setDate', new Date(searchedyear));
    }
    else {
        $('#Year').datepicker('setDate', new Date($("#YearVal").val()));
    }
    $("#Division").select2();
    $("#Status").select2();

    projectbriefdataloadMain(1);
    $('#loader').css('visibility', 'hidden');
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
    }
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".sd_documents").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $(".sd_documents").find(".ui-jqgrid-htable").css("padding-right", "0px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".sd_documents").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $(".sd_documents").find(".ui-jqgrid-htable").css("padding-right", "0px");
    }

});

colmodels1 = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        width: 60,
        ignoreCase: true,
        search: false,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if ($("#Role").val() === "ADMIN" && rowobject.Legacy != 'True') {
                return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                    `<ul class="hover_icons">` +
                    `${rowobject.StatusID != "7" ? `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen" title="Edit"></i> Edit</a></li>` : ``}` +
                    `${rowobject.StatusID != "1" && rowobject.StatusID != "8" ? `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` : ``}` +
                    `<li><a class="" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                    `${rowobject.StatusID == "1" ? `<li><a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="Delete" ><i class="fas fa-trash color-delete color-delete" id=""></i> Delete</a></li>` : ``}` +
                    `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                    `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="View Supporting Documents"><i class="fas fa-file color-file"></i></i> Supporting Documents</a></li >` : ``}` +
                    `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="" title="Remarks info"><i class="fas fa-info color-info"></i></i> Remarks info</a></li >` : ``}` +
                    `</ul>` +
                    `</div>`;

            }
            else if (($("#Role").val() == "Marketing Team" || $("#Role").val() === "CFT Team" || $("#Role").val() === "Manager") && rowobject.Legacy != 'True') {
                if (rowobject.SubmittedBy.toLowerCase() != $("#empId").val().toLowerCase()) {
                    if (rowobject.StatusID == "1") {
                        return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                            `<ul class="hover_icons">` +
                            `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen" title="Edit"></i> Edit</a></li>` +
                            `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                            `${rowobject.StatusID == "1" ? `<li><a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="Delete" ><i class="fas fa-trash color-delete" id=""></i> Delete</a></li>` : ``}` +
                            `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                            `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i></i> Supporting Documents</a></li>` : ``}` +
                            `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                            `</ul>` +
                            `</div>`;
                    } else if (rowobject.StatusID == "3" && rowobject.IsHubApprove == "YES") {
                        return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                            `<ul class="hover_icons">` +
                            `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen" title="Edit"></i> Edit</a></li>` +
                            `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="fas color-info"><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` +
                            `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                            `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                            `${rowobject.SupportingDocument == 1 ? `<li> <a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                            `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                            `</ul>` +
                            `</div>`;

                    } else if (rowobject.StatusID == "3" && rowobject.IsHubApprove == "NO") {
                        return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                            `<ul class="hover_icons">` +
                            `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` +
                            `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="download" aria-hidden="true"></i> Download</a></li>` +
                            `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                            `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                            `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                            `</ul>` +
                            `</div>`;
                    }
                    else if (rowobject.StatusID == "9") {
                        return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                            `<ul class="hover_icons">` +
                            `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen" title="Edit"></i> Edit</a></li>` +
                            `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` +
                            `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="download" aria-hidden="true"></i> Download</a></li>` +
                            `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                            `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                            `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                            `</ul>` +
                            `</div>`;
                    }

                    else {
                        return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                            `<ul class="hover_icons">` +
                            `${rowobject.StatusID == "1" ? `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen"></i> Edit</a></li>` : ``}` +
                            `${rowobject.StatusID != "1" ? `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` : ``}` +
                            `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                            `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                            `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                            `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                            `</ul>` +
                            `</div>`;
                    }
                } else if (rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase()) {

                    return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                        `<ul class="hover_icons">` +
                        `${rowobject.StatusID == "1" || rowobject.StatusID == "8" || rowobject.StatusID == "11" ? `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen  " title="Edit"></i> Edit</a></li>` : ``}` +
                        `${rowobject.StatusID != "1" && rowobject.StatusID != "8" && rowobject.StatusID != "11" ? `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` : ``}` +
                        `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                        `${rowobject.StatusID == "1" ? `<li><a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="Delete" ><i class="fas fa-trash color-delete" id=""></i> Delete</a></li>` : ``}` +
                        `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                        `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}</li >` +
                        `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                        `</ul>` +
                        `</div>`;
                }
            }
            else if ($("#Role").val() === "HGML Team" && rowobject.Legacy != 'True') {
                if (rowobject.StatusID == "1" || rowobject.StatusID == "2" || rowobject.StatusID == "4" || rowobject.StatusID == "14" || rowobject.StatusID == "13" || (rowobject.StatusID == "9" && rowobject.IsEditableByManager == "1")) {
                    return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                        `<ul class="hover_icons">` +
                        `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen" title="Edit"></i> Edit</a></li>` +
                        `${rowobject.StatusID != "1" && rowobject.StatusID != "8" && rowobject.StatusID != "11" ? `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` : ``}` +
                        `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                        `${rowobject.StatusID == "1" ? `<li><a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="Delete" ><i class="fas fa-trash color-delete" id=""></i> Delete</a></li>` : ``}` +
                        `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                        `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                        `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                        `</ul>` +
                        `</div>`;
                }
                else {
                    return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                        `<ul class="hover_icons">` +
                        `${rowobject.StatusID == "8" && rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase() ? `<li> <a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen"></i> Edit</a>` : ``}` +
                        `${rowobject.StatusID == "11" && rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase() ? `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen"></i> Edit</a>` : ``}` +
                        `${rowobject.StatusID != "1" && (rowobject.StatusID != "8" || rowobject.SubmittedBy.toLowerCase() != $("#empId").val().toLowerCase()) ? `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a>` : ``}` +
                        `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                        `${rowobject.StatusID == "1" ? `<li><a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="Delete" ><i class="fas fa-trash color-delete" id=""></i> Delete</a></li>` : ``}` +
                        `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                        `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                        `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                        `</ul>` +
                        `</div>`;
                }
            }
            else if ($("#Role").val() === "PMD Team" && rowobject.Legacy != 'True') {
                if (rowobject.StatusID == "1" || rowobject.StatusID == "5" || rowobject.StatusID == "9" && rowobject.IsEditableByManager == "1" || rowobject.StatusID == "6" || rowobject.StatusID == "12" || rowobject.StatusID == "16") {
                    return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                        `<ul class="hover_icons">` +
                        `${rowobject.StatusID != "7" ? `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="edit-color" title="Edit" ><i class="fas fa-pen  " title="Edit"></i> Edit</a></li>` : ``}` +
                        `${rowobject.StatusID != "1" && rowobject.StatusID != "8" ? `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` : ``}` +
                        `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                        `${rowobject.StatusID == "1" ? `<li><a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="Delete" ><i class="fas fa-trash color-delete" id=""></i> Delete</a></li>` : ``}` +
                        `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                        `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                        `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                        `</ul>` +
                        `</div>`;
                }

                else {
                    return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                        `<ul class="hover_icons">` +
                        `${rowobject.StatusID == "8" && rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase() ? `<li><a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=" -edit" title="Edit" ><i class="fas fa-pen"></i> Edit</a>` : ``}` +
                        `${rowobject.StatusID != "1" && (rowobject.StatusID != "8" || rowobject.SubmittedBy.toLowerCase() != $("#empId").val().toLowerCase()) ? `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a>` : ``}` +
                        `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                        `${rowobject.StatusID == "1" ? `<li><a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="Delete" ><i class="fas fa-trash color-delete" id=""></i> Delete</a>` : ``}` +
                        `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                        `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                        `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}</li >` +
                        `</ul>` +
                        `</div>`;
                }
            }
            else if ($("#Role").val() === "View Role" && rowobject.Legacy != 'True') {
                if (rowobject.StatusID === "5" || rowobject.StatusID === "6" || rowobject.StatusID === "9" || rowobject.StatusID === "1" || rowobject.StatusID === "2" || rowobject.StatusID === "16" || rowobject.StatusID === "3" || rowobject.StatusID === "4" || rowobject.StatusID === "7" || rowobject.StatusID === "8" || rowobject.StatusID === "11" || rowobject.StatusID === "10" || rowobject.StatusID === "12" || rowobject.StatusID === "13" || rowobject.StatusID === "14") {
                    return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                        `<ul class="hover_icons">` +
                        `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` +
                        `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                        `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                        `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                        `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i>  Remarks info</a></li>` : ``}` +
                        `</ul>` +
                        `</div>`;
                } else {
                    return "";
                }
            }
            else if ($("#Role").val() === "Manager" && rowobject.Legacy != 'True') {
                return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                    `<ul class="hover_icons">` +
                    `<li><a class=""><i class="fas fa-eye color-eye" title="View"></i></a></li>` +
                    `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                    `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                    `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                    `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}` +
                    `</ul>` +
                    `</div>`;
            }
            else if (rowobject.Legacy != 'True') {
                return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                    `<ul class="hover_icons">` +
                    `<li><a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class=""><i class="fas fa-eye color-eye" title="View"></i> View</a></li>` +
                    `<li><a class=" -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                    `<li><a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="" title="View History" ><i class="fas fa-history color-history" aria-hidden="true"></i> History</a></li>` +
                    `${rowobject.SupportingDocument == 1 ? `<li><a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="" title="Supporting Documents"><i class="fas fa-file color-file"></i> Supporting Documents</a></li>` : ``}` +
                    `${rowobject.StatusID == "16" ? `<li><a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class=" iconduedate" title="Remarks info"><i class="fas fa-info color-info"></i> Remarks info</a></li>` : ``}` +
                    `</ul>` +
                    `</div>`;
            }
            else {
                return `<div class="action_icons d-flex action_icons align-items-center" title=""><i class="hover_dots fa fa-ellipsis-h"></i>` +
                    `<ul class="hover_icons">` +
                    `<li><a class=" -download LegacyDownload" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','${rowobject.Legacy}',this)"><i class="fas fa-download color-download " title="Download" aria-hidden="true"></i> Download</a></li>` +
                    `</ul>` +
                    `</div>`;
            }
        }
    },
    {
        name: 'ID',
        label: 'ID',
        width: 90,
        resizable: true,
        ignoreCase: true,
        classes: 'ProjectID',
    },
    {
        label: 'HUB Status',
        width: 60,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="action_icons text-center" title="">' +

                (rowobject.StatusID == "3" ? '<a class="icon_color" title="HUB Status" ><i class="fas fa-info color-info pr-1 color-info HubStatus" data-bs-toggle="modal" data-bs-target="#exampleModal1555"></i></i></a>' : '') +

                '</div>';
        }
    },
    {
        name: 'Status',
        label: 'Status',
        width: 180,
        classes: "text-wrap",
        resizable: true,
        ignoreCase: true,
        exportcol: false,

        formatter: function (cellvalue, options, rowobject) {
            var reformStatus = rowobject.Status;
            if (rowobject.StatusID !== null) {
                if ($("#Role").val() == "ADMIN") {
                    if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {

                        return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-success">${rowobject.Status}</span></a>`;
                    } else if (rowobject.StatusID == "8") {
                        return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-info">${rowobject.Status}</span></a>`;
                    } else if (rowobject.StatusID == "11") {
                        return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-info">${rowobject.Status}</span></a>`;
                    }
                    else if (rowobject.StatusID == "7") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-danger">' + rowobject.Status + '</span></a>';
                    } else {
                        return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                    }
                } else if ($("#Role").val() === "Marketing Team" || $("#Role").val() === "CFT Team" || $("#Role").val() === "Manager") {

                    if (rowobject.SubmittedBy.toLowerCase() != $("#empId").val().toLowerCase()) {
                        if (rowobject.StatusID == "3") {
                            if (rowobject.IsHubApprove == 'YES') {
                                return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                            } else {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                            }
                        } else if (rowobject.StatusID == "9") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        }
                        else if (rowobject.StatusID == "1") {
                            if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
                            } else if (rowobject.StatusID == "8") {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                            } else if (rowobject.StatusID == "11") {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                            } else if (rowobject.StatusID == "7") {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-danger">' + rowobject.Status + '</span></a>';
                            } else if (rowobject.StatusID == "1") {
                                return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                            }
                            else {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                            }
                        } else {
                            if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
                            } else if (rowobject.StatusID == "8") {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                            } else if (rowobject.StatusID == "11") {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                            } else if (rowobject.StatusID == "7") {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-danger">' + rowobject.Status + '</span></a>';
                            } else if (rowobject.StatusID == "1") {
                                return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                            } else {
                                return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                            }
                        }
                    } else if (rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase()) {
                        if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "8") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-info">${rowobject.Status}</span></a>`;
                        } else if (rowobject.StatusID == "11") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-info">${rowobject.Status}</span></a>`;
                        } else if (rowobject.StatusID == "7") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-danger">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "1") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        } else {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                        }
                    }
                } else if ($("#Role").val() === "HGML Team") {
                    if (rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase()) {
                        if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "8") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-info">${rowobject.Status}</span></a>`;
                        } else if (rowobject.StatusID == "11") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-info">${rowobject.Status}</span></a>`;
                        }
                        else if (rowobject.StatusID == "7") {
                            return '<a href="#" class="ProjectBriefstatus" ><span class="text-danger">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "2" || rowobject.StatusID == "4" || rowobject.StatusID == "1" || rowobject.StatusID == "13" || rowobject.StatusID == "14") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        }
                        else {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                        }
                    } else {
                        if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "8") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "11") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                        }
                        else if (rowobject.StatusID == "7") {
                            return '<a href="#" class="ProjectBriefstatus" ><span class="text-danger">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "2" || rowobject.StatusID == "4" || rowobject.StatusID == "14" || rowobject.StatusID == "13") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        } else if (rowobject.StatusID == "9" && rowobject.IsEditableByManager == "1") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        }
                        else {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                        }
                    }
                } else if ($("#Role").val() === "PMD Team") {
                    if (rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase()) {
                        if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-success">${rowobject.Status}</span></a>`;

                        } else if (rowobject.StatusID == "8") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "11") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "7") {
                            return '<a href="#" class="ProjectBriefstatus" ><span class="text-danger">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "5" || rowobject.StatusID == "16") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        } else if (rowobject.StatusID == "1") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        } else {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                        }
                    } else {
                        if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-success">${rowobject.Status}</span></a>`;

                        } else if (rowobject.StatusID == "8") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "11") {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "7") {
                            return '<a href="#" class="ProjectBriefstatus" ><span class="text-danger">' + rowobject.Status + '</span></a>';
                        } else if (rowobject.StatusID == "5" || rowobject.StatusID == "16") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        }
                        else if (rowobject.StatusID == "9" && rowobject.IsEditableByManager == "1") {
                            return `<a href="#" class="ProjectBriefstatus" onclick="onClickEditProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}', this)"><span class="text-warning">${rowobject.Status}</span></a>`;
                        }
                        else {
                            return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                        }
                    }
                } else if ($("#Role").val() === "View Role") {
                    if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "8") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "11") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                    }
                    else if (rowobject.StatusID == "7") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-danger">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "5" || rowobject.StatusID == "16") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "1") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "3") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "9") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                    }
                    else if (rowobject.StatusID == "2" || rowobject.StatusID == "4" || rowobject.StatusID == "13" || rowobject.StatusID == "14") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                    }
                } else {
                    if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "8") {
                        return '<a href="#" class="ProjectBriefstatus" ><span class="text-info">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "11") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-info">' + rowobject.Status + '</span></a>';
                    } else if (rowobject.StatusID == "7") {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-danger">' + rowobject.Status + '</span></a>';
                    } else {
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' + rowobject.Status + '</span></a>';
                    }
                }
            } else {
                return rowobject.Status;
            }
        }
    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        width: 100,
        ignoreCase: true,
        exportcol: true,
        hidden: true,
    },
    {
        name: 'Hub',
        label: 'HUB',
        resizable: true,
        ignoreCase: true,
        width: 80,
        search: true,

    },
    {
        name: 'Division',
        label: 'Division',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProjectType',
        label: 'Project Type',
        classes: 'ProjectType',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProjectName',
        label: 'Project Name',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Products',
        label: 'Product Name',
        width: 100,
        resizable: true,
        ignoreCase: true,
        exportcol: false,

        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="action_icons text-center" title="">' +
                '<a href="#" class="Product" title="Product Name" data-toggle="modal" data-target="#productModal"><i class="fas fa-list color-info"></i></a>' +
                '</div>';
        }
    },
    {
        name: 'ProjectCategorization',
        label: 'Project Categorization',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RandDName',
        label: 'R&D Name',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'InitiatedBy',
        label: 'Initiated By',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SubmittedDate',
        label: 'Initiated Date',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HGMLUser',
        label: 'HGML User',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'StatusID',
        label: 'Status',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
        hidden: true,
        Classes: 'ProjectStatus',

    },
    {
        name: 'IsEditableByManager',
        label: 'IsEditableByManager',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
        hidden: true,
    },
    {
        name: 'HGMLApprovedDate',
        label: 'HGML Approved Date',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Legacy',
        label: 'Legacy',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.Legacy == 'True') {
                return '<span class="true">' + rowobject.Legacy + '</span>'
            }
            else {
                return ""
            }
        }
    },
    {
        name: 'BriefDemotedtoHGML',
        label: 'Brief Demoted to HGML',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BriefDemotedtoInitiator',
        label: 'Brief Demoted to Initiator',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UnderExplorationDate',
        label: 'Extended Fine Screening Date',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UnderExplorationDueDate',
        label: 'Extended Fine Screening Due Date',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RemarksForUnderExp',
        label: 'Remarks For Extended Fine Screening Review',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'PMDUser',
        label: 'PMD User',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ApprovedDate',
        label: 'PMD Accepted Date',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
],

    $("#ProjectBriefList").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels1,
        loadonce: true,
        viewrecords: true,
        pager: '#ProjectBriefList_pager',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ProjectBriefList tbody tr");
            var objHeader = $("#ProjectBriefList tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#ProjectBriefList").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

var metap_total = 0, india_total = 0, apac_total = 0, europe_total = 0, husa_total = 0, packaging_total = 0, npd_total = 0, reformuation_total = 0;

function getHubdetails(obj) {
    var Year = $("#Year").val();
    if (Year == "") { Year = null; }
    var Division = $(".division").val();
    if (Division == "") { Division = 0; }
    var Status = $(".Status").val();
    if (Status == "") { Status = 0; }
    var project = $(".projecttypes li").find('.active').text().split(' ');
    var trimedType = project.map(function (word) {
        return word.replace(/\d+/g, '');
    });

    var ProjectType = $.trim(trimedType.join(' '));
    if (ProjectType == 'All') { ProjectType = 0 }

    var type = obj.innerText.split(' ');
    var sanitizedType = type.map(function (word) {
        return word.replace(/\d+/g, '');
    });
    var Hub = $.trim(sanitizedType.join(' '))
    if (Hub == "All") { Hub = null; }
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/ProjectBriefDisplay",
        data: { Year: Year, Hub: Hub, Division: Division, ProjectType: ProjectType, Status: Status },
        success: function (App_Results) {
            App_jsons = JSON.parse(App_Results);

            var metaptotal = 0, indiatotal = 0, apactotal = 0, europetotal = 0, husatotal = 0, packagingtotal = 0, npdtotal = 0, reformuationtotal = 0;

            $.each(App_jsons, function (i, obj) {

                if ($.trim(obj.Hub).toUpperCase() == "METAP" || $.trim(obj.Hub).toUpperCase() == "RUMEA") { metaptotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "INDIA") { indiatotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "EUROPE") { europetotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "APAC") { apactotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "HUSA") { husatotal++ }

                if ($.trim(obj.ProjectType) == "Packaging Initiative") { packagingtotal++ }
                else if ($.trim(obj.ProjectType) == "NPD") { npdtotal++ }
                else if ($.trim(obj.ProjectType) == "Reformulation") { reformuationtotal++ }

            });
            if (Hub === null || Hub === "") {
                apac_total = apactotal
                europe_total = europetotal
                husa_total = husatotal
                india_total = indiatotal
                metap_total = metaptotal
            } else {
                if (Hub.toLowerCase() === "apac") {
                    apac_total = apactotal
                } if (Hub.toLowerCase() === "europe") {
                    europe_total = europetotal
                }
                if (Hub.toLowerCase() === "husa") {
                    husa_total = husatotal
                } if (Hub.toLowerCase() === "india") {
                    india_total = indiatotal
                } if (Hub.toLowerCase() === "metap") {
                    metap_total = metaptotal
                }
            }

            $(".APACTotal").text(apac_total)
            $(".EUROPETotal").text(europe_total)
            $(".HUSATotal").text(husa_total)
            $(".INDIATotal").text(india_total)
            $(".METAPTotal").text(metap_total)
            $(".AllHubTotal").text(apac_total + metap_total + europe_total + india_total + husa_total);


            if (ProjectType == 0 || ProjectType == "") {
                reformuation_total = reformuationtotal;
                npd_total = npdtotal;
                packaging_total = packagingtotal;
            } else {
                if (ProjectType.toLowerCase() === "npd") {
                    npd_total = npdtotal
                } if (ProjectType.toLowerCase() === "packaging initiative") {
                    packaging_total = packagingtotal
                }
                if (ProjectType.toLowerCase() === "reformulation") {
                    reformuation_total = reformuationtotal
                }
            }

            $(".allProjectTotal").text(reformuation_total + npd_total + packaging_total)
            $(".NPDTotal").text(npd_total)
            $(".PackagingInitiativeTotal").text(packaging_total)
            $(".ReformulationTotal").text(reformuation_total)

            $.jgrid.gridUnload('#ProjectBriefList');
            $("#ProjectBriefList").jqGrid({
                url: '',
                datatype: 'local',
                data: App_jsons,
                mtype: 'GET',
                colModel: colmodels1,
                loadonce: true,
                viewrecords: true,
                pager: '#ProjectBriefList_pager',
                rowNum: 30,
                scroll: 1,
                gridComplete: function () {
                    var objRows = $("#ProjectBriefList tbody tr");
                    var objHeader = $("#ProjectBriefList tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }
                }
            });
            $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 270px)' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 330) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
            }
            $("#ProjectBriefList").jqGrid('filterToolbar', {
                autosearch: true,
                stringResult: false,
                searchOnEnter: false,
                defaultSearch: "cn"
            });
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}


function getProjectdetails(obj) {
    var Year = $("#Year").val();
    if (Year == "") { Year = null; }
    var Division = $(".division").val();
    if (Status = "") { Status = null; }
    var Status = $("#Status_arr").val().join(',').toString();
    if (Division == "" || Division === null || typeof (Division) === "undefined") {
        Division = $("#Division_arr").val().join(',').toString();
        Division = Division.concat(",0");
    }
    var Status = $(".Status").val();
    if (Status == "" || Status === null || typeof (Status) === "undefined") {
        var Status = $("#Status_arr").val().join(',').toString();
        if (Status.includes("13")) {
            Status += ",14";
        }
    }
    var type = obj.innerText.split(' ');
    var sanitizedType = type.map(function (word) {
        return word.replace(/\d+/g, '');
    });
    var ProjectType = $.trim(sanitizedType.join(' '));
    if (ProjectType == 'All') { ProjectType = 0 }

    $(".Hubdetails li").find('.active').removeClass("active");
    $(".allHubs").addClass("active");
    var Hub = $.trim($(".Hubdetails li").find('.active').text()).split(' ')[0];
    if (Hub == "All") { Hub = null; }
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/ProjectBriefDisplay",
        data: { Year: Year, Hub: Hub, Division: Division, ProjectType: ProjectType, Status: Status },
        success: function (App_Results) {
            App_jsons = JSON.parse(App_Results);
            debugger;

            var metaptotal = 0, indiatotal = 0, apactotal = 0, europetotal = 0, husatotal = 0, packagingtotal = 0, npdtotal = 0, reformuationtotal = 0;

            $.each(App_jsons, function (i, obj) {

                if ($.trim(obj.Hub).toUpperCase() == "METAP" || $.trim(obj.Hub).toUpperCase() == "RUMEA") { metaptotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "INDIA") { indiatotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "EUROPE") { europetotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "APAC") { apactotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "HUSA") { husatotal++ }

                if ($.trim(obj.ProjectType) == "Packaging Initiative") { packagingtotal++ }
                else if ($.trim(obj.ProjectType) == "NPD") { npdtotal++ }
                else if ($.trim(obj.ProjectType) == "Reformulation") { reformuationtotal++ }

            });
            if (Hub === null || Hub === "") {
                apac_total = apactotal
                europe_total = europetotal
                husa_total = husatotal
                india_total = indiatotal
                metap_total = metaptotal
            } else {
                if (Hub.toLowerCase() === "apac") {
                    apac_total = apactotal
                } if (Hub.toLowerCase() === "europe") {
                    europe_total = europetotal
                }
                if (Hub.toLowerCase() === "husa") {
                    husa_total = husatotal
                } if (Hub.toLowerCase() === "india") {
                    india_total = indiatotal
                } if (Hub.toLowerCase() === "metap") {
                    metap_total = metaptotal
                }
            }

            $(".APACTotal").text(apac_total)
            $(".EUROPETotal").text(europe_total)
            $(".HUSATotal").text(husa_total)
            $(".INDIATotal").text(india_total)
            $(".METAPTotal").text(metap_total)
            $(".AllHubTotal").text(apac_total + metap_total + europe_total + india_total + husa_total);


            if (ProjectType == 0 || ProjectType == "") {
                reformuation_total = reformuationtotal;
                npd_total = npdtotal;
                packaging_total = packagingtotal;
            } else {
                if (ProjectType.toLowerCase() === "npd") {
                    npd_total = npdtotal
                } if (ProjectType.toLowerCase() === "packaging initiative") {
                    packaging_total = packagingtotal
                }
                if (ProjectType.toLowerCase() === "reformulation") {
                    reformuation_total = reformuationtotal
                }
            }

            $(".allProjectTotal").text(reformuation_total + npd_total + packaging_total)
            $(".NPDTotal").text(npd_total)
            $(".PackagingInitiativeTotal").text(packaging_total)
            $(".ReformulationTotal").text(reformuation_total)


            $.jgrid.gridUnload('#ProjectBriefList');
            $("#ProjectBriefList").jqGrid({
                url: '',
                datatype: 'local',
                data: App_jsons,
                mtype: 'GET',
                colModel: colmodels1,
                loadonce: true,
                viewrecords: true,
                pager: '#ProjectBriefList_pager',
                rowNum: 30,
                scroll: 1,
                gridComplete: function () {
                    var objRows = $("#ProjectBriefList tbody tr");
                    var objHeader = $("#ProjectBriefList tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }
                }
            });
            $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 270px)' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 330) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
            }
            $("#ProjectBriefList").jqGrid('filterToolbar', {
                autosearch: true,
                stringResult: false,
                searchOnEnter: false,
                defaultSearch: "cn"
            });
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

function projectbriefdataloadMain(flag) {
    if (flag == 1) {
        var Year = $("#Year").val();
        if (Year == "") { Year = null; }
        if (Division = "") { Division = null; }
        var Division = $("#Division_arr").val().join(',').toString();
        Division = Division.concat(",0");
        if (Status = "") { Status = null; }

        var Status = $("#Status_arr").val().join(',').toString();
        if (Status.includes("13")) {
            Status = Status.concat(",14");
        }


        var type = $(".projecttypes li").find('.active').text().split(' ');
        var sanitizedType = type.map(function (word) {
            return word.replace(/\d+/g, '');
        });
        var ProjectType = $.trim(sanitizedType.join(' '));
        if (ProjectType == 'All') { ProjectType = 0 }

        var Hub = $.trim($(".Hubdetails li").find(".active").text()).split(' ')[0];
        if (Hub == "All") { Hub = null; }

    }
    if (flag == 0) {

        var Year = $("#YearVal").val();
        if (Year == "") { Year = null; }
        var Division = '', Status = '', ProjectType = '', Hub = '';
        $(".projecttypes li").find('.active').removeClass("active")
        $(".Hubdetails li").find('.active').removeClass("active")
        $(".allProjects").addClass("active");
        $(".allHubs").addClass("active");
        $('#Year').datepicker('setDate', new Date($("#YearVal").val()));
        //$(".division").val('').select2();
        //$(".Status").val('').select2();
        $("#Division_arr option").prop("selected", true);
        $("#Division_arr").multiselect("refresh");
        $("#Status_arr option").prop("selected", true);
        $("#Status_arr").multiselect("refresh");
    }

    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/ProjectBriefDisplayfilter",
        data: { Year: Year, Hub: Hub, Division: Division, ProjectType: ProjectType, Status: Status },
        success: function (App_Results) {
            App_jsons = JSON.parse(App_Results);

            var metaptotal = 0, indiatotal = 0, apactotal = 0, europetotal = 0, husatotal = 0, packagingtotal = 0, npdtotal = 0, reformuationtotal = 0;

            $.each(App_jsons, function (i, obj) {

                if ($.trim(obj.Hub).toUpperCase() == "METAP" || $.trim(obj.Hub).toUpperCase() == "RUMEA") { metaptotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "INDIA") { indiatotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "EUROPE") { europetotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "APAC") { apactotal++ }
                else if ($.trim(obj.Hub).toUpperCase() == "HUSA") { husatotal++ }

                if ($.trim(obj.ProjectType) == "Packaging Initiative") { packagingtotal++ }
                else if ($.trim(obj.ProjectType) == "NPD") { npdtotal++ }
                else if ($.trim(obj.ProjectType) == "Reformulation") { reformuationtotal++ }

            });
            if (Hub === null || Hub === "") {
                apac_total = apactotal
                europe_total = europetotal
                husa_total = husatotal
                india_total = indiatotal
                metap_total = metaptotal
            } else {
                if (Hub.toLowerCase() === "apac") {
                    apac_total = apactotal
                } if (Hub.toLowerCase() === "europe") {
                    europe_total = europetotal
                }
                if (Hub.toLowerCase() === "husa") {
                    husa_total = husatotal
                } if (Hub.toLowerCase() === "india") {
                    india_total = indiatotal
                } if (Hub.toLowerCase() === "metap") {
                    metap_total = metaptotal
                }
            }

            $(".APACTotal").text(apac_total)
            $(".EUROPETotal").text(europe_total)
            $(".HUSATotal").text(husa_total)
            $(".INDIATotal").text(india_total)
            $(".METAPTotal").text(metap_total)
            $(".AllHubTotal").text(apac_total + metap_total + europe_total + india_total + husa_total);


            if (ProjectType == 0 || ProjectType == "") {
                reformuation_total = reformuationtotal;
                npd_total = npdtotal;
                packaging_total = packagingtotal;
            } else {
                if (ProjectType.toLowerCase() === "npd") {
                    npd_total = npdtotal
                } if (ProjectType.toLowerCase() === "packaging initiative") {
                    packaging_total = packagingtotal
                }
                if (ProjectType.toLowerCase() === "reformulation") {
                    reformuation_total = reformuationtotal
                }
            }

            $(".allProjectTotal").text(reformuation_total + npd_total + packaging_total)
            $(".NPDTotal").text(npd_total)
            $(".PackagingInitiativeTotal").text(packaging_total)
            $(".ReformulationTotal").text(reformuation_total)

            $.jgrid.gridUnload('#ProjectBriefList');
            $("#ProjectBriefList").jqGrid({
                url: '',
                datatype: 'local',
                data: App_jsons,
                mtype: 'GET',
                colModel: colmodels1,
                loadonce: true,
                viewrecords: true,
                pager: '#ProjectBriefList_pager',
                rowNum: 30,
                scroll: 1,
                gridComplete: function () {
                    var objRows = $("#ProjectBriefList tbody tr");
                    var objHeader = $("#ProjectBriefList tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }
                }
            });
            $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 270px)' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 330) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
            }
            $("#ProjectBriefList").jqGrid('filterToolbar', {
                autosearch: true,
                stringResult: false,
                searchOnEnter: false,
                defaultSearch: "cn"
            });
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

$("#Search").click(function () {
    projectbriefdataloadMain(1);
});


$("#refresh").click(function () {
    projectbriefdataloadMain(0);
});

function onClickEditProjectBrief(projectType, projectId, status, obj) {
    if (projectType == "NPD") {
        window.location.href = ROOT + "ProjectBrief/EditNpd" + '?q=' + Encrypt("projectId=" + projectId);
    }
    if (projectType == "Reformulation") {

        window.location.href = ROOT + "ProjectBrief/NewEditReformulation" + '?q=' + Encrypt("projectId=" + projectId + "&Status=Edit" + "&StatusId=" + status);
    }
    if (projectType == "Packaging Initiative") {
        window.location.href = ROOT + 'ProjectBrief/EditPackagingInitiative' + '?q=' + Encrypt("projectId=" + projectId + "&ID=" + status);
    }
}
function OnClickDeleteProjectBrief(projectType, projectId, status, obj) {
    $('div#ToDeleteTheSelectedGridRow').modal('show');
    $("#ToDeleteTheSelectedGridRow_Ok").click(function () {

        if (status == "1") {
            window.location.href = ROOT + "ProjectBrief/DeletePageData?ProjectID=" + projectId;
        }
    });

}
function onClickViewProjectBrief(projectType, projectId, status, obj) {
    if (projectType == "Reformulation") {

        window.location.href = ROOT + 'ProjectBrief/NewEditReformulation' + '?q=' + Encrypt("projectId=" + projectId + "&Status=View" + "&StatusId=" + status);
    }
    if (projectType == "Packaging Initiative") {
        window.location.href = ROOT + 'ProjectBrief/EditPackagingInitiative' + '?q=' + Encrypt("projectId=" + projectId + "&Status=View");
    }
    if (projectType == "NPD") {

        window.location.href = ROOT + "ProjectBrief/EditNpd" + '?q=' + Encrypt("projectId=" + projectId + '&status=' + status + '&icon=View');
    }
}
function downloaddocfile(projectType, projectId, status, legacy, obj) {
    if (legacy == 'True') {
        $('.LegacyDownload').prop("href", ROOT + "ProjectBrief/GetLegacyDataPDF?ProjectId=" + projectId);
    }
    else {
        var fd = new FormData();
        var ProjectId = projectId
        var ProjectType = projectType;
        var Status = status;
        if (ProjectType == 'NPD') {

            $.ajax({
                url: ROOT + "ProjectBrief/PDFNPD",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "NPD", Status: Status },
                success: function (result) {
                    $('.PDFNPD').html(result);
                    var htmldata = $(".PDFNPD").html();
                    fd.append('JsonString', htmldata)
                    $.ajax({
                        url: ROOT + 'ProjectBrief/GeneratePdfHtml',
                        type: 'POST',
                        dataType: 'HTML',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            window.location = window.location.origin + ROOT + 'ProjectBrief/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "NPD"
                        }
                    })
                }
            })

        }
        else if (ProjectType == 'Packaging Initiative') {

            $.ajax({
                url: ROOT + "ProjectBrief/PIDraft",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "Package", Status: Status },
                success: function (result) {
                    $('.PIDraft').html(result);
                    var htmldata = $(".PIDraft").html();
                    fd.append('JsonString', htmldata)
                    $.ajax({
                        url: ROOT + 'ProjectBrief/GeneratePdfHtml',
                        type: 'POST',
                        dataType: 'HTML',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            window.location = window.location.origin + ROOT + 'ProjectBrief/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "Packaging Initiative"
                        }
                    })
                }
            })

        }
        else if (ProjectType == 'Reformulation') {


            $.ajax({
                url: ROOT + "ProjectBrief/PDFReformulation",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "Reformulation", Status: Status },
                success: function (result) {
                    $('.ReformulationDraft').html(result);
                    var htmldata = $(".ReformulationDraft").html();
                    fd.append('JsonString', htmldata)
                    $.ajax({
                        url: ROOT + 'ProjectBrief/GeneratePdfHtml',
                        type: 'POST',
                        dataType: 'HTML',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            window.location = window.location.origin + ROOT + 'ProjectBrief/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "Reformulation"
                        }
                    })
                }
            })
        }
    }
}


colModels = [

    {
        name: 'HubName',
        resizable: true,
        width: 70,
        label: 'HUB Name',
        ignoreCase: true,

    },
    {
        name: 'HubUser',
        resizable: true,
        width: 80,
        label: 'HUB User',
        ignoreCase: true,


    },
    {
        name: 'IsHubApproved',
        resizable: true,
        width: 90,
        label: 'HUB Status',
        ignoreCase: true,

    },

    {
        name: 'ProjectId',
        resizable: true,
        width: 80,
        label: 'ProjectId',
        ignoreCase: true,
        hidden: true,
    },
],
    $("#hubtable").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colModels,
        loadonce: true,
        viewrecords: true,
        pager: '#HubStatus_pager',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#hubtable tbody tr");
            var objHeader = $("#hubtable tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });


$(document).on("click", ".HubStatus", function () {
    var projectId = $(this).closest('tr').find('td.ProjectID').text();
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/HubStatusInfo",
        data: { projectId: projectId },
        success: function (Result) {
            jsondata = JSON.parse(Result);
            jQuery('#hubtable').jqGrid('clearGridData');
            $("#hubtable").jqGrid().setGridParam({
                datatype: 'local',
                data: jsondata
            }).trigger('reloadGrid');
        },
        error: function () {
            alert("Error occured!!");
        }
    });

});

function GetRowDataInArray(obj) {
    var grid = $('#ProjectBriefList');
    var rowId = $(obj).closest("tr.jqgrow").attr("id");
    var ProjectId = grid.jqGrid('getCell', rowId, 'ID');
    var ProjectType = grid.jqGrid('getCell', rowId, 'ProjectType');
    var Status = grid.jqGrid('getCell', rowId, 'Status');
    var StatusId = grid.jqGrid('getCell', rowId, 'StatusID');

    var arrayitem = {
        ProjectId: ProjectId, ProjectType: ProjectType, Status: Status, StatusId: StatusId
    };

    return arrayitem;

}

colmodels5 = [
    {
        name: 'FromStageName',
        label: 'From Stage',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'ToStageName',
        label: 'To stage',
        width: 150,
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
        name: 'ReceivedOn',
        label: 'Received On',
        width: 130,
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
        name: 'RemarksBy',
        label: 'Submitted By',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'NoOfDaysTaken',
        label: 'No Of Days Taken',
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
        classes: 'wrap',
    },
],
    $("#ViewApprovalHistory").jqGrid({
        height: 'auto',
        rowNum: 100,
        mtype: 'GET',
        datatype: 'local',
        data: [],
        loadonce: true,
        colModel: colmodels5,
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
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
}
function onClickHistoryProtoType(projectType, projectId, status, obj) {
    var rowData = GetRowDataInArray(obj);
    var projectId = projectId
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/GetProjectBriefHistory",
        data: { ProjectId: projectId },
        success: function (response) {
            var list = "";
            var fromstage = [];
            var tostage = [];
            var flow = response['ProjectBriefHistoryDetails'];
            var flowstatus = response['statusNamesList'];
            var newList = []
            for (var i = 0; i < flowstatus.length; i++) {
                if (i === 1) {
                    newList.push(`<li class="bg_hgml yet-tocomplete mt-2" data-history=0 > Draft </li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2" data-history=0></li>`)
                }
                else if (i == 0) {
                    continue;
                }
                else if (i == 9) {
                    newList.push(`<li class="bg_hgml yet-tocomplete mt-2" data-history=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>`)
                }
                else if (i == 7) {
                    continue
                }

                else if (flowstatus[i].StatusId == 9) {
                    newList.splice(1, 0, `<li class="bg_hgml yet-tocomplete mt-2" data-history=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2"  data-history=${flowstatus[i].StatusId}></li>`);
                }
                else if (flowstatus[i].StatusId == 10) {
                    newList.splice(1, 0, `<li class="bg_hgml yet-tocomplete mt-2" data-history=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2"  data-history=${flowstatus[i].StatusId}></li>`);
                }
                else if (flowstatus[i].StatusId == 6) {
                    newList.push(`<li class="bg_hgml ApprovalClass yet-tocomplete mt-2" data-history=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2"  data-history=${flowstatus[i].StatusId}></li>`)
                }
                else if (flowstatus[i].StatusId == 16) {
                    newList.splice(6, 0, `<li class="bg_hgml yet-tocomplete mt-2" data-history=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2"  data-history=${flowstatus[i].StatusId}></li>`);
                }
                else {
                    newList.push(`<li class="bg_hgml yet-tocomplete mt-2" data-history=${flowstatus[i].StatusId}>` + flowstatus[i].StatusName + `</li>` +
                        `<li class="fas fa-arrow-right yet-tocomplete mt-2"  data-history=${flowstatus[i].StatusId}></li>`)
                }
            }
            $('#AddLi').html(newList.join(""));

            var approvalFirstItemLabel = ["Draft"]

            var approval3rdItemLabel = ['HGML Review']

            var approval5rdItemLabel = ['HGML Approve']

            if (flow != null && flow != undefined && flow != "") {
                $.each(flow, function (i, data) {
                    if (!$(`[data-history=${data.FromStage}]`).hasClass('completed') && data.FromStage !== '1' && data.FromStage !== '0') {
                        $(`[data-history=${data.FromStage}]`).removeClass('yet-tocomplete')
                        $(`[data-history=${data.FromStage}]`).addClass('completed')
                    }
                    if (data.FromStage == '8' || data.FromStage == '1') {
                        $(`[data-history=0]`).removeClass('yet-tocomplete')
                        $(`[data-history=0]`).addClass('completed')
                    }

                    if (data.ToStage == '8' || data.ToStage == '11') {
                        if (data.ToStage == '8') {
                            if (!approvalFirstItemLabel.includes(" / Sent back to Initiator")) {
                                approvalFirstItemLabel[1] = " / Sent back to Initiator"
                            }
                        }
                        else if (data.ToStage == '11') {
                            if (!approvalFirstItemLabel.includes(" / Brief Demoted to Initiator")) {
                                approvalFirstItemLabel[2] = " / Brief Demoted to Initiator"
                            }
                        }

                        $(`.bg_hgml[data-history=0]`).text(approvalFirstItemLabel.join(""))
                    }
                    if (data.ToStage == '13') {
                        if (data.ToStage == '13') {
                            if (!approval3rdItemLabel.includes(" / Brief Demoted to HGML")) {
                                approval3rdItemLabel[1] = " / Brief Demoted to HGML"
                            }
                        }
                        $(`.bg_hgml[data-history='2']`).text(approval3rdItemLabel.join(""))
                    }
                    if (data.ToStage == '14') {
                        if (data.ToStage == '14') {
                            if (!approval5rdItemLabel.includes(" / Brief Demoted to HGML")) {
                                approval5rdItemLabel[1] = " / Brief Demoted to HGML"
                            }
                        }
                        $(`.bg_hgml[data-history='4']`).text(approval5rdItemLabel.join(""))
                    }
                });
                if (flow.length !== 0) {
                    let currentState = flow[0];
                    if (currentState.ToStage === "8" || currentState.ToStage === "11") {
                        $(`[data-history=0]`).removeClass('yet-tocomplete')
                        $(`[data-history=0]`).removeClass('completed')
                        $(`[data-history=0]`).addClass('warning')
                    }
                    else if (currentState.ToStage === "13") {
                        $(`[data-history=2]`).removeClass('yet-tocomplete')
                        $(`[data-history=2]`).removeClass('completed')
                        $(`[data-history=2]`).addClass('warning')
                    }
                    else if (currentState.ToStage === "14") {
                        $(`[data-history=4]`).removeClass('yet-tocomplete')
                        $(`[data-history=4]`).removeClass('completed')
                        $(`[data-history=4]`).addClass('warning')
                    }
                    else if (currentState.ToStage === "7") {
                        $(`[data-history=6]`).removeClass('yet-tocomplete')
                        $(`[data-history=6]`).removeClass('completed')
                        $(`[data-history=6]`).addClass('rejected')
                        $('.ApprovalClass').text("Rejected")
                    }
                    else if (currentState.ToStage === "6" || currentState.ToStage === "12") {
                        $(`[data-history=${currentState.ToStage}]`).removeClass('yet-tocomplete')
                        $(`[data-history=${currentState.ToStage}]`).addClass('completed')
                    }
                    else {
                        $(`[data-history=${currentState.ToStage}]`).removeClass('yet-tocomplete')
                        $(`[data-history=${currentState.ToStage}]`).removeClass('completed')
                        $(`[data-history=${currentState.ToStage}]`).addClass('warning')
                    }
                }

            }
            else {
                $(`[data-history=0]`).removeClass('yet-tocomplete')
                $(`[data-history=0]`).addClass('warning')
            }
            $("#ViewApprovalHistory").jqGrid("clearGridData");
            $("#ViewApprovalHistory").jqGrid('setGridParam', { data: response["ProjectBriefHistoryDetails"] });
            $("#ViewApprovalHistory").trigger('reloadGrid', [{ page: 1 }]);
            $("#PrototypeHistory").modal('show');
        }
    });
}
colmodels12 = [
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 150,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'CreatedBy',
        label: 'Created by',
        width: 60,
        ignoreCase: true,
        resizable: true,
        hidden: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 60,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        width: 60,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'StatusName',
        label: 'Stage',
        width: 80,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 40,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            var fileName = rowobject.DocumentName;
            var fileExtension = fileName.split('.').pop().toLowerCase(); // Extract the file extension

            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
            };

            return '<div class="text-left icon_section align-items-left">' +
                '<span class="action-link pr-2"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class=" -download Report" title="Download"><i class="fas fa-download" title="Download"></i></a></span>' +
                (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class=" -view" target="_blank" title="View"><i class="fas fa-eye" title="View"></i></a></span>') +
                '</div> ';
        }
    }
],
    $('#Grid_Supporting_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels12,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Grid_Supporting_Document',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_Supporting_Document tbody tr");
            var objHeader = $("#Grid_Supporting_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });


$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
}
function onClickSupportingDocuments(projectId) {
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/GetSupportingDocumentsData",
        data: { ProjectId: projectId },
        success: function (data) {

            $('div#Document_show_popup').modal('show');

            $("#Grid_Supporting_Document").jqGrid("clearGridData");

            $("#Grid_Supporting_Document").jqGrid('setGridParam', { data: data.length == 0 ? [] : data });

            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
        }
    });
}

function ViewUploadedDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {
        var imageUrl = ROOT + 'NPDImages/' + filename;
        window.open(imageUrl, '_blank');
    }
}
function DownloadUploadedDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {

        $('.Report').prop("href", ROOT + "ProjectBrief/DownloadImageFile?fileName=" + filename);
        return true;
    }
}
$(document).on("click", '#DownloadExcel', function () {

    window.location.href = ROOT + "ProjectBrief/GetProjectBriefHistoryExcel";
});

$("#ExcelDownload").click(function () {
    var data = $('#ProjectBriefList').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#ProjectBriefList").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "ProjectBrief.xlsx",
            maxlength: 1000,

        });
    }
});
$(document).on("click", ".Product", function () {
    var projectId = $(this).closest('tr').find('td.ProjectID').text();
    var projectType = $(this).closest('tr').find('td.ProjectType').text();
    $.ajax({

        type: "POST",
        url: ROOT + "Base/GetProductNamesInProjectBrief",
        dataType: "json",
        data: { projectId: projectId, projectType: projectType },

        success: function (productResult) {

            $(".ProductName").empty();

            if (productResult != null) {

                var productList = '';

                $.each(productResult, function (i, obj) {

                    var j = parseInt(i);

                    productList += "<tr>" +
                        "<td class='header_table_font'>" + (j + 1) + "</td>" +
                        "<td class='header_table_font'>" + obj.ProductName + "</td>" +
                        "</tr>"
                })
                $(".ProductName").html(productList);
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

});



colmod = [

    {
        name: 'Date',
        label: 'Due Date',
        width: 150,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 150,
        ignoreCase: true,
        resizable: true,

    },
    {
        name: 'CreatedBy',
        label: 'Updated By',
        width: 150,
        ignoreCase: true,
        resizable: true,

    }
],

    $('#remarks_info').jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmod,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_remarks',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#remarks_info tbody tr");
            var objHeader = $("#remarks_info tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });


$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
}

function OnClickRemarksAndDueDate(projectId) {

    $(".ProjectId").val(projectId);
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectBrief/GetPMUDateRemarks",
        data: { ProjectId: projectId },
        success: function (data) {
            $("div#remarks_section").modal("show");
            if ($("#Role").val() !== "ADMIN" && $("#Role").val() !== "PMD Team") {
                $(".PMDDueDateAndRemarks").hide()
            }
            $("#remarks_info").jqGrid("clearGridData");

            $("#remarks_info").jqGrid('setGridParam', { data: data.length == 0 ? [] : data });

            $("#remarks_info").trigger('reloadGrid', [{ page: 1 }]);
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 330) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
            }
        }
    });
}

$('#Save_PmdRemarks').on("click", function () {
    var date = $("#RemarksDate").val()
    var remarks = $("#ProjectRemarks").val().trim();

    if (date == "" || remarks == "") {
        date == "" ? $("#Error_Daypicker").show() : $("#Error_Daypicker").hide();
        remarks == "" ? $("#Error_Remarks").show() : $("#Error_Remarks").hide();
    }
    else {

        var PMDInfo = []

        PMDInfo = [{
            Date: date,
            Remarks: remarks,
            ProjectId: $(".ProjectId").val()
        }];
        $("#ProjectRemarks").val("")
        $("#RemarksDate").val("")

        $.ajax({
            type: "Post",
            url: ROOT + "ProjectBrief/SavePMUDateAndRemarks",
            data: { PMDInfo: JSON.stringify(PMDInfo) },
            dataType: "json",
            success: function (data) {


                var Remarks1 = $("#remarks_info").jqGrid('getGridParam', 'data');
                var Remarks2 = $.merge(Remarks1, PMDInfo);
                $("#remarks_info").jqGrid('setGridParam', { data: Remarks2 });
                $("#remarks_info").trigger('reloadGrid', [{ page: 1 }]);
                projectbriefdataloadMain(1);
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
});

$('.modal#remarks_section').on('hidden.bs.modal', function (e) {

    $("#ProjectRemarks").val("");
    $("#Error_Remarks").hide();
    $("#Error_Daypicker").hide();
});

$('.DayDatePicker').datepicker({
    autoclose: true,
    viewMode: 'months',
    startDate: '+0d',
    forceParse: false,
    todayHighlight: true,
    format: 'dd-mm-yyyy'
})
$(".example-dropUp").multiselect({
    enableFiltering: true,
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 500,
    buttonWidth: '100%',
    dropUp: true
});


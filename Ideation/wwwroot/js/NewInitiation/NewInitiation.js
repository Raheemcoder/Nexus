

$('[data-datepicker-year]').datepicker({
    format: 'yyyy',
    viewMode: 'years',
    minViewMode: 'years',
    autoclose: true
});

$('#RemarksDate').datepicker({
    autoclose: true,
    viewMode: 'months',
    startDate: '+0d',
    forceParse: false,
    todayHighlight: true,
    format: 'dd-mm-yyyy'
})

var date = new Date();
var todayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Set only the year for FromDate

var searchedyear = $("#SearchedYear").val();
if (searchedyear != null && searchedyear != "") {
    $('#Year').datepicker('setDate', new Date(searchedyear));
}
else {
    $('#Year').datepicker('setDate', $.datepicker.formatDate('yyyy', todayDate));
}

var isEdit = $('#IsEdit').val();

var reformStatus = '';

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 150,
        search: false,
        title: false,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (isEdit === "True") {
                if ($("#Role").val() === "ADMIN" && rowobject.Legacy != 'True') {
                    return `<div class="justify-center_">
                ${rowobject.StatusID != "7" ? `<a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit" title="Edit"></i></a>` : `<i></i>`}
                ${rowobject.StatusID != "1" && rowobject.StatusID != "8" ? `<a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<i></i>`}
                <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                ${rowobject.StatusID == "1" ? `<a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -delete" title="Delete" ><i class="fas fa-trash" id=""></i></a>` : `<i></i>`}
                <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

                ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="btn-icon icon_SupportingDocuments" title="View Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
                ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }
              </div>`;
                } else if (($("#Role").val() == "Marketing Team" || $("#Role").val() === "CFT Team" || $("#Role").val() === "Manager") && rowobject.Legacy != 'True') {
                    if (rowobject.SubmittedBy.toLowerCase() != $("#empId").val().toLowerCase()) {
                        if (rowobject.StatusID == "1") {
                            return `<div class="text-center d-flex align-items-left">
                    <a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit" title="Edit"></i></a>
                    <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                    ${rowobject.StatusID == "1" ? `<a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -delete" title="Delete" ><i class="fas fa-trash" id=""></i></a>` : `<i></i>`}
                    <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
                
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }

                  </div>`;
                        } else if (rowobject.StatusID == "3" && rowobject.IsHubApprove == "YES") {
                            return `<div class="text-center d-flex align-items-left">
                    <a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit" title="Edit"></i></a>
                    <a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>
                    <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                    <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }


                  </div>`;
                        } else if (rowobject.StatusID == "3" && rowobject.IsHubApprove == "NO") {
                            return `<div class="text-center d-flex align-items-left">
                    <a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>
                    <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="download" aria-hidden="true"></i></a>
                    <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }


                  </div>`;
                        }
                        else if (rowobject.StatusID == "9") {
                            return `<div class="text-center d-flex align-items-left">
                   <a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit" title="Edit"></i></a>
                   <a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>
                    <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="download" aria-hidden="true"></i></a>
                    <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
               ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }

                  </div>`;
                        }

                        else {
                            return `<div class="text-center d-flex align-items-left">
                    ${rowobject.StatusID == "1" ? `<a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit"></i></a>` : `<i></i>`}
                    ${rowobject.StatusID != "1" ? `<a onclick="onClickViewProjectBrief('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<i></i>`}
                    <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                    <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}', '${rowobject.ID}', '${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }

                  </div>`;
                        }
                    } else if (rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase()) {
                        return `<div class="text-center d-flex align-items-left">
                  ${rowobject.StatusID == "1" || rowobject.StatusID == "8" || rowobject.StatusID == "11" ? `<a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit  " title="Edit"></i></a>` : `<i></i>`}
                  ${rowobject.StatusID != "1" && rowobject.StatusID != "8" && rowobject.StatusID != "11" ? `<a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<i></i>`}
                  <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                  ${rowobject.StatusID == "1" ? `<a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -delete" title="Delete" ><i class="fas fa-trash" id=""></i></a>` : `<i></i>`}
                  <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }


                </div>`;
                    }
                } else if ($("#Role").val() === "HGML Team" && rowobject.Legacy != 'True') {
                    if (rowobject.StatusID == "1" || rowobject.StatusID == "2" || rowobject.StatusID == "4" || rowobject.StatusID == "14" || rowobject.StatusID == "13" || (rowobject.StatusID == "9" && rowobject.IsEditableByManager == "1")) {
                        return `<div class="text-center d-flex align-items-left">
                  <a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit" title="Edit"></i></a>
                  ${rowobject.StatusID != "1" && rowobject.StatusID != "8" && rowobject.StatusID != "11" ? `<a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<i></i>`}
                  <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download  " title="Download" aria-hidden="true"></i></a>
                  ${rowobject.StatusID == "1" ? `<a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -delete" title="Delete" ><i class="fas fa-trash" id=""></i></a>` : `<i></i>`}
                  <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }


                </div>`;
                    }
                    else {
                        return `<div class="text-center d-flex align-items-left">
                                ${rowobject.StatusID == "8" && rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase() ? `<a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fa fa-edit"></i></a>` : `<i></i>`}
                                ${rowobject.StatusID == "11" && rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase() ? `<a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fa fa-edit"></i></a>` : `<i></i>`}
                                ${rowobject.StatusID != "1" && (rowobject.StatusID != "8" || rowobject.SubmittedBy.toLowerCase() != $("#empId").val().toLowerCase()) ? `<a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<i></i>`}
                                <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download  " title="Download" aria-hidden="true"></i></a>
                                ${rowobject.StatusID == "1" ? `<a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -delete" title="Delete" ><i class="fas fa-trash" id=""></i></a>` : `<i></i>`}
                                <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }


                            </div>`;
                    }
                } else if ($("#Role").val() === "PMD Team" && rowobject.Legacy != 'True') {
                    if (rowobject.StatusID == "1" || rowobject.StatusID == "5" || rowobject.StatusID == "9" && rowobject.IsEditableByManager == "1" || rowobject.StatusID == "6" || rowobject.StatusID == "12" || rowobject.StatusID == "16") {
                        return `<div class="text-center d-flex align-items-left">
                  ${rowobject.StatusID != "7" ? `<a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit  " title="Edit"></i></a>` : `<i></i>`}
                  ${rowobject.StatusID != "1" && rowobject.StatusID != "8" ? `<a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<i></i>`}
                  <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download  " title="Download" aria-hidden="true"></i></a>
                  ${rowobject.StatusID == "1" ? `<a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -delete" title="Delete" ><i class="fas fa-trash" id=""></i></a>` : `<i></i>`}
                  <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
               ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }

                </div>`;
                    }

                    else {
                        return `<div class="text-center d-flex align-items-left">
                  ${rowobject.StatusID == "8" && rowobject.SubmittedBy.toLowerCase() == $("#empId").val().toLowerCase() ? `<a onclick="onClickEditProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -edit" title="Edit" ><i class="fas fa-edit"></i></a>` : `<i></i>`}
                  ${rowobject.StatusID != "1" && (rowobject.StatusID != "8" || rowobject.SubmittedBy.toLowerCase() != $("#empId").val().toLowerCase()) ? `<a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>` : `<i></i>`}
                  <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download  " title="Download" aria-hidden="true"></i></a>
                  ${rowobject.StatusID == "1" ? `<a onclick="OnClickDeleteProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -delete" title="Delete" ><i class="fas fa-trash" id=""></i></a>` : `<i></i>`}
                  <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }


                </div>`;
                    }
                } else if ($("#Role").val() === "View Role" && rowobject.Legacy != 'True') {
                    if (rowobject.StatusID === "5" || rowobject.StatusID === "6" || rowobject.StatusID === "9" || rowobject.StatusID === "1" || rowobject.StatusID === "2" || rowobject.StatusID === "16"  || rowobject.StatusID === "3" || rowobject.StatusID === "4" || rowobject.StatusID === "7" || rowobject.StatusID === "8" || rowobject.StatusID === "11" || rowobject.StatusID === "10" || rowobject.StatusID === "12" || rowobject.StatusID === "13" || rowobject.StatusID === "14") {
                        return `<div class="text-center d-flex align-items-left">
                  <a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>
                  <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                  <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>


              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
             ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }


                </div>`;
                    } else {
                        return "";
                    }
                } else if ($("#Role").val() === "Manager" && rowobject.Legacy != 'True') {
                    return `<div class="text-center d-flex align-items-left">
                <a class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a>
                <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
             ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }
 

              </div>`;
                }

                else if (rowobject.Legacy != 'True') {
                    return `<div class="justify-center_">
                <a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a><i></i>
                <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

             ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
            ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }

              </div>`;
                }
                else {
                    return `<div class="justify-center_">
                        <a class="btn-icon -download LegacyDownload" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','${rowobject.Legacy}',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                     </div>`;
                }

            }
            else if (rowobject.Legacy != 'True') {
                return `<div class="justify-center_">
                <a onclick="onClickViewProjectBrief('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -view"><i class="fas fa-eye" title="View"></i></a><i></i>
                <a class="btn-icon -download" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                <a href="#" onclick="onClickHistoryProtoType('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}',this)" class="btn-icon -history" title="View History" ><i class="fas fa-history" aria-hidden="true"></i></a>

              ${rowobject.SupportingDocument == 1 ? `<a href="#" onclick="onClickSupportingDocuments('${rowobject.ID}')" class="icon_SupportingDocuments" title="Supporting Documents"><i class="fa fa-files-o"></i></i></a>` : `<i></i>`}
              ${rowobject.StatusID == "16" ? `<a href="#" onclick="OnClickRemarksAndDueDate('${rowobject.ID}')" class="btn-icon iconduedate" title="Remarks info"><i class="fas fa-info"></i></i></a>` : `<i></i>` }

              </div>`;
            }
            else {
                return `<div class="justify-center_">
                        <a class="btn-icon -download LegacyDownload" href="#" onclick="downloaddocfile('${rowobject.ProjectType}','${rowobject.ID}','${rowobject.StatusID}','${rowobject.Legacy}',this)"><i class="fas fa-download" title="Download" aria-hidden="true"></i></a>
                     </div>`;
            }
        }
    },


    {
        name: 'ID',
        label: 'ID',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 90,
        classes: 'ProjectID',
       
    },

    {
        // name: 'Action',
        label: 'HUB Status',
        width: 70,
        search: false,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="text-center d-flex align-items-left">' +
                //(rowobject.StatusID !== "1" && rowobject.StatusID !== "2" ? '<a href="#" class="icon_color" title="Hub Status" ><i class="fa fa-info-circle HubStatus" data-bs-toggle="modal" data-bs-target="#exampleModal1555"></i></i></a>' : '<i></i>') +
                (rowobject.StatusID == "3" ? '<a href="#" class="icon_color" title="HUB Status" ><i class="fa fa-info-circle HubStatus" data-bs-toggle="modal" data-bs-target="#exampleModal1555"></i></i></a>' : '<i></i>') +

                '</div>';
        }
    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        width: 165,
        ignoreCase: true,
        search: true,
        exportcol: false,
        Classes: 'ProjectStatus',
        formatter: function (cellvalue, options, rowobject) {
            var reformStatus = rowobject.Status;
            if (rowobject.StatusID !== null) {
                if ($("#Role").val() == "ADMIN") {
                    if (rowobject.StatusID == "6" || rowobject.StatusID == "12") {
                        //return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';

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
                           // return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
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
                            // return '<a href="#" class="ProjectBriefstatus"><span class="text-success">' + rowobject.Status + '</span></a>';
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
                        return '<a href="#" class="ProjectBriefstatus"><span class="text-warning">' +rowobject.Status+ '</span></a>';
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
        resizable: true,
        ignoreCase: true,
        width: 130,
        search: true,

    },
    {
        name: 'ProjectType',
        label: 'Project Type',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 130,
        classes: 'ProjectType',

    },
    {
        name: 'ProjectName',
        label: 'Project Name',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 260,

    },
    {
        name: 'Products',
        label: 'Product Name',
        resizable: true,
        ignoreCase: true,
        search: false,
        exportcol: false,
        width: 75,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="text-center">' +
                '<a href="#" class="btn-icon -edit" title="Product Name" ><i class="fas fa-list Product" data-bs-toggle="modal" data-bs-target="#productModal"></i></i></a>' +

                // '<a href="@Url.Content("#")" data-bs-toggle="modal" data-bs-target="#productModal"><i class="glyphicon glyphicon-th-list Product"></i></a>' +
                '</div>';
        }
    },   
    {
        name: 'ProjectCategorization',
        label: 'Project Categorization',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 120,

    },
    {
        name: 'RandDName',
        label: 'R&D Name',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 100,

    },
    {
        name: 'InitiatedBy',
        label: 'Initiated By',
        resizable: true,
        ignoreCase: true,
        search: true,
        width: 130,

    },
    {
        name: 'SubmittedDate',
        label: 'Initiated Date',
        resizable: true,
        ignoreCase: true,
        search: true,
        width:100,

    },
    {
        name: 'HGMLUser',
        label: 'HGML User',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
    },
    {
        name: 'HGMLApprovedDate',
        label: 'HGML Approved Date',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
    },

    
    //{
    //    name: 'Status',
    //    label: 'Status',
    //    resizable: true,
    //    width: 100,
    //    ignoreCase: true,
    //    //search: true,
    //    exportcol: true,

    //    hidden: true,
    //},
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

    //{
    //    name: 'PMDAcceptedDate',
    //    label: 'PMD Accepted Date',
    //    resizable: true,
    //    width: 100,
    //    ignoreCase: true,
    //    search: true,
    //},
    {
        name: 'BriefDemotedtoHGML',
        label: 'Brief Demoted to HGML',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
    },
    {
        name: 'BriefDemotedtoInitiator',
        label: 'Brief Demoted to Initiator',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
    },
    {
        name: 'UnderExplorationDate',
        label: 'Under Exploration Date',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
    },
    {
        name: 'UnderExplorationDueDate',
        label: 'Under Exploration Due Date',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
    },
    {
        name: 'RemarksForUnderExp',
        label: 'Remarks for Under Exploration',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
    },
    {
        name: 'PMDUser',
        label: 'PMD User',
        resizable: true,
        width: 90,
        ignoreCase: true,
        search: true,
    },

    {
        name: 'ApprovedDate',
        label: 'PMD Accepted Date',
        resizable: true,
        width: 90,
        ignoreCase: true,

    },
],


    $(document).ready(function () {

        projectbriefdataloadMain();

    });
setTimeout(function () {
    $('#message_alert').fadeOut('slow');
}, 5000);




function projectbriefdataloadMain() {

    var Year = $("#Year").val();
    if (Year == 'Select Year') { Year = null; }
    var Hub = $(".Hub option:selected").text();
    if (Hub == 'All') { Hub = ''; }
    var Division = $(".division").val();
    var ProjectType = $(".ProjectType").val();
    var Status = $(".Status").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NewInitiation/ProjectBriefDisplay",
        data: { Year: Year, Hub: Hub, Division: Division, ProjectType: ProjectType, Status: Status },
        success: function (App_Results) {
            // console.log(App_Results);
            App_jsons = JSON.parse(App_Results);
            //jQuery('#ProjectBriefList').jqGrid('clearGridData');
            $.jgrid.gridUnload('#ProjectBriefList');


            $("#ProjectBriefList").jqGrid({
                height: 'auto',
                rowNum: 20,
                // rowList: [5, 10, 15],
                //mtype: 'GET',
                data: App_jsons,
                //url: ROOT + "NewInitiation/ProjectBriefDisplayfilter",
                datatype: 'local',
                loadonce: true,
                colModel: colmodels,
                pager: "#pager_user",
                viewrecords: true,
                scroll: true,


                gridComplete: function () {
                    var objRows = $("#ProjectBriefList tbody tr");
                    var objHeader = $("#ProjectBriefList tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }
                    $(".true").closest("tr").find("td.ProjectID").addClass("legacy_color");

                }
            })




            $("#ProjectBriefList").jqGrid('filterToolbar', {
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



            //$("#ProjectBriefList").jqGrid().setGridParam({
            //    datatype: 'local',
            //    data: App_jsons
            //}).trigger('reloadGrid');
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}




//$("#ProjectBriefList").jqGrid({
//    height: 'auto',
//    rowNum: 1000,
//    // rowList: [5, 10, 15],
//    mtype: 'GET',

//    url: ROOT + "NewInitiation/ProjectBriefDisplayfilter",
//    datatype: 'json',
//    loadonce: true,
//    colModel: colmodels,
//    pager: "#pager_user",
//    viewrecords: true,
//    scroll: true,


//    gridComplete: function () {
//        var objRows = $("#ProjectBriefList tbody tr");
//        var objHeader = $("#ProjectBriefList tbody tr td");

//        if (objRows.length > 1) {
//            var objFirstRowColumns = $(objRows[1]).children("td");
//            for (i = 0; i < objFirstRowColumns.length; i++) {
//                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
//            }
//        }

//    }
//});




//$("#ProjectBriefList").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});
//$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
//$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
//var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
//if ($TableHeight > 330) {
//    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
//    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
//}
//else {
//    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
//    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
//}


function onClickEditProjectBrief(projectType, projectId, status, obj) {
    debugger
    var rowData = GetRowDataInArray(obj);

    if (projectType == "NPD") {
        window.location.href = ROOT + "NewInitiation/EditProduction" + '?q=' + Encrypt("projectId=" + projectId);
    }
    if (projectType == "Reformulation") {

        window.location.href = ROOT + "NewInitiation/EditReformulation" + '?q=' + Encrypt("projectId=" + projectId + "&Status=Edit" + "&StatusId=" + status);
    }


    if (projectType == "Packaging Initiative") {
        window.location.href = ROOT + 'NewInitiation/EditPackageIntiatives' + '?q=' + Encrypt("projectId=" + projectId + "&ID=" + status);
    }


}


function OnClickDeleteProjectBrief(projectType, projectId, status, obj) {

    var rowData = GetRowDataInArray(obj);
    $('div#ToDeleteTheSelectedGridRow').modal('show');

    $("#ToDeleteTheSelectedGridRow_Ok").click(function () {

        if (status == "1") {
            window.location.href = ROOT + "NewInitiation/DeletePageData?ProjectID=" + projectId;
        }
    });

}


function onClickViewProjectBrief(projectType, projectId, status, obj) {
    debugger
    var rowData = GetRowDataInArray(obj);

    if (projectType == "Reformulation") {

        window.location.href = ROOT + 'NewInitiation/EditReformulation' + '?q=' + Encrypt("projectId=" + projectId + "&Status=View" + "&StatusId=" + status);
    }
    if (projectType == "Packaging Initiative") {
        window.location.href = ROOT + 'NewInitiation/EditPackageIntiatives' + '?q=' + Encrypt("projectId=" + projectId + "&Status=View");
    }
    if (projectType == "NPD") {

        window.location.href = ROOT + "NewInitiation/EditProduction" + '?q=' + Encrypt("projectId=" + projectId + '&status=' + status + '&icon=View');
    }

}



function GetRowDataInArray(obj) {

    //
    //var ctr = $(obj).closest("tr");
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

$("#Search").click(function () {


    projectbriefdataload();
});


function projectbriefdataload() {

    var Year = $("#Year").val();
    if (Year == 'Select Year') { Year = null; }
    var Hub = $(".Hub option:selected").text();
    if (Hub == 'All') { Hub = ''; }
    var Division = $(".division").val();
    var ProjectType = $(".ProjectType").val();
    var Status = $(".Status").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NewInitiation/ProjectBriefDisplayfilter",
        data: { Year: Year, Hub: Hub, Division: Division, ProjectType: ProjectType, Status: Status },
        success: function (App_Results) {
            // console.log(App_Results);
            App_jsons = JSON.parse(App_Results);
            //jQuery('#ProjectBriefList').jqGrid('clearGridData');
            $.jgrid.gridUnload('#ProjectBriefList');


            $("#ProjectBriefList").jqGrid({
                height: 'auto',
                rowNum: 20,
                // rowList: [5, 10, 15],
                //mtype: 'GET',
                data: App_jsons,
                //url: ROOT + "NewInitiation/ProjectBriefDisplayfilter",
                datatype: 'local',
                loadonce: true,
                colModel: colmodels,
                pager: "#pager_user",
                viewrecords: true,
                scroll: true,


                gridComplete: function () {
                    var objRows = $("#ProjectBriefList tbody tr");
                    var objHeader = $("#ProjectBriefList tbody tr td");

                    if (objRows.length > 1) {
                        var objFirstRowColumns = $(objRows[1]).children("td");
                        for (i = 0; i < objFirstRowColumns.length; i++) {
                            $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                        }
                    }
                    $(".true").closest("tr").find("td.ProjectID").addClass("legacy_color");

                }
            })




            $("#ProjectBriefList").jqGrid('filterToolbar', {
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



            //$("#ProjectBriefList").jqGrid().setGridParam({
            //    datatype: 'local',
            //    data: App_jsons
            //}).trigger('reloadGrid');
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}



function bindGrid() {

}





function downloaddocfile(projectType, projectId, status, legacy, obj) {
    debugger
    if (legacy == 'True') {
        $('.LegacyDownload').prop("href", ROOT + "NewInitiation/GetLegacyDataPDF?ProjectId=" + projectId);
    }
    else {
        var fd = new FormData();
        var ProjectId = projectId
        var ProjectType = projectType;
        var Status = status;
        if (ProjectType == 'NPD') {

            $.ajax({
                url: ROOT + "NewInitiation/PDFNPD",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "NPD", Status: Status },
                success: function (result) {
                    //;
                    $('.PDFNPD').html(result);
                    //var fd = new FormData();
                    var htmldata = $(".PDFNPD").html();
                    //
                    fd.append('JsonString', htmldata)
                    $.ajax({
                        url: ROOT + 'NewInitiation/GeneratePdfHtml',
                        type: 'POST',
                        dataType: 'HTML',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            debugger
                            window.location = window.location.origin + ROOT + 'NewInitiation/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "NPD"
                        }
                    })
                }
            })

        }
        else if (ProjectType == 'Packaging Initiative') {

            $.ajax({
                url: ROOT + "NewInitiation/PIDraft",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "Package", Status: Status },
                success: function (result) {
                    $('.PIDraft').html(result);
                    var htmldata = $(".PIDraft").html();
                    fd.append('JsonString', htmldata)
                    $.ajax({
                        url: ROOT + 'NewInitiation/GeneratePdfHtml',
                        type: 'POST',
                        dataType: 'HTML',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            window.location = window.location.origin + ROOT + 'NewInitiation/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "Packaging Initiative"
                        }
                    })
                }
            })

        }
        else if (ProjectType == 'Reformulation') {


            $.ajax({
                url: ROOT + "NewInitiation/ReformulationDraft",
                type: 'POST',
                dataType: 'HTML',
                cache: false,
                data: { ProjectId: ProjectId, Type: "Reformulation", Status: Status },
                success: function (result) {
                    $('.ReformulationDraft').html(result);
                    var htmldata = $(".ReformulationDraft").html();
                    fd.append('JsonString', htmldata)
                    $.ajax({
                        url: ROOT + 'NewInitiation/GeneratePdfHtml',
                        type: 'POST',
                        dataType: 'HTML',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            window.location = window.location.origin + ROOT + 'NewInitiation/GeneratePdf?ProjectId=' + ProjectId + '&Type=' + "Reformulation"
                        }
                    })
                }
            })
        }
    }
}


// Hub status button
//
$("#HubStatus_Table_data").jqGrid({
    height: 'auto',
    rowNum: 10,
    rowList: [5, 10, 15],
    colModel: [

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

    pager: "#HubStatus_pager",
    viewrecords: true,
    sortorder: "asec",

    gridComplete: function () {
        var objRows = $("#HubStatus_Table_data tbody tr");
        var objHeader = $("#HubStatus_Table_data tbody tr td");
        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
    }
});
jQuery("#HubStatus_Table_data").jqGrid('navGrid', "#Doc_pager", { edit: false, add: false, del: false });

$("#HubStatus_Table_data").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});
$('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'height': '30vh' });

var $TableHeight1 = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight1 > 290) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
}
else {
    //$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "unset");
    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px")
    //$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")

}


$(document).on("click", ".HubStatus", function () {
    //;
    var projectId = $(this).closest('tr').find('td.ProjectID').text();
    $.ajax({
        type: "POST",
        url: ROOT + "NewInitiation/HubStatusInfo",
        data: { projectId: projectId },
        success: function (Result) {
            ////;
            // console.log(Result);
            jsondata = JSON.parse(Result);
            jQuery('#HubStatus_Table_data').jqGrid('clearGridData');
            $("#HubStatus_Table_data").jqGrid().setGridParam({
                datatype: 'local',
                data: jsondata
            }).trigger('reloadGrid');
        },
        error: function () {
            alert("Error occured!!");
        }
    });

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



colmodels1 = [
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
        colModel: colmodels1,
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
function onClickHistoryProtoType(projectType, projectId, status, obj) {
    var rowData = GetRowDataInArray(obj);
    var projectId = projectId
    $.ajax({
        type: "POST",
        url: ROOT + "NewInitiation/GetProjectBriefHistory",
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
             
            var approval5rdItemLabel=['HGML Approve']

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
                    else if (currentState.ToStage === "6" || currentState.ToStage === "12" ) {
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


$(document).on("click", '#DownloadExcel', function () {

    window.location.href = ROOT + "NewInitiation/GetProjectBriefHistoryExcel";
});

//$("#ExcelDownload").click(function () {
//    debugger

//    var data = $('#ProjectBriefList').jqGrid('getGridParam', 'data');
//    if (data.length == 0) {
//        alert("No data in Grid");
//    }
//    else {

//        $("#ProjectBriefList").on("beforeExport", function (e, data) {
//            // Get the header row element
//            var $headerRow = $(data.$exportContainer).find(".jqgfirstrow");

//            // Set the background color and font color of the header row
//            $headerRow.css({
//                "background-color": "#3498DB", // replace with your desired color
//                "color": "#FFFFFF" // replace with your desired color
//            });

//            // Prevent jqGrid from exporting the header row as a regular data row
//            data.postData.exportOptions.includeLabels = false;
//        });
//        $("#ProjectBriefList").on("beforeExport", beforeExportHandler);

//        $("#ProjectBriefList").jqGrid("exportToExcel", {
//            includeLabels: true,
//            includeGroupHeader: true,
//            includeFooter: true,
//            exportcol: false,
//            fileName: "ProjectBrief.xlsx",
//            //fileName: fileName,
//            maxlength: 40 // maxlength for visible string data

//        });

//    }
//});


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
            maxlength: 1000, // maxlength for visible string data

        });
    }
});




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
                '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download" title="Download"></i></a></span>' +
                (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye" title="View"></i></a></span>') +
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
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


$(".ViewData").on("click", function () {
    $("#Document_show_popup").modal('show');
});

function onClickSupportingDocuments(projectId) {
    $.ajax({
        type: "POST",
        url: ROOT + "NewInitiation/GetSupportingDocumentsData",
        data: { ProjectId: projectId },
        success: function (data) {

            $('div#Document_show_popup').modal('show');


            $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 100) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
            }

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

        $('.Report').prop("href", ROOT + "NewInitiation/DownloadImageFile?fileName=" + filename);
        return true;
    }
}



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
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}



function OnClickRemarksAndDueDate(projectId) {

    $(".ProjectId").val(projectId);
    $.ajax({
        type: "POST",
        url: ROOT + "NewInitiation/GetPMUDateRemarks",
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
            if ($TableHeight > 130) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
            }
            else {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
            }
        }
    });
}


$('#Save_PmdRemarks').on("click", function () {
    var date = $("#RemarksDate").val()
    var remarks = $("#ProjectRemarks").val()

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
                url: ROOT + "NewInitiation/SavePMUDateAndRemarks",
                data: { PMDInfo: JSON.stringify(PMDInfo) },
                dataType: "json",
                success: function (data) {
                    
                  
                    var Remarks1 = $("#remarks_info").jqGrid('getGridParam', 'data');
                    var Remarks2 = $.merge(Remarks1, PMDInfo);
                    $("#remarks_info").jqGrid('setGridParam', { data: Remarks2 });
                    $("#remarks_info").trigger('reloadGrid', [{ page: 1 }]);
                    projectbriefdataload();
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
    }
});


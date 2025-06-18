
var validSave = true;
var packLabelClaimsDetails = [];
var packLabelClaimsEditIndex = 0;
var isPackLabelClaimsEdit = false;
var communicationClaimsDetails = []
var onPackClaimsWithRemarks = [];
var communicationClaimsWithRemarks = [];
var communicationClaimsEditIndex = 0;
var isCommunicationClaimsEdit = false;
var claimsData = $.parseJSON($('#JsonClaimsData').val());
var GridId = $("#GridId").val();
var ProjectNumber = $("#ProjectNumber").val();
var department = $("#CFTDeptName").val();
var CFTDepartment = '';
var cftRemarksHeaders = [];
var cftremarksModel = 0;
var ActualSelectedDepartments = "";
var onpackModelClaims = [];
var communicationModelClaims = [];
var depatmentBasedOnHub = "";

var Stage = $('#Stage').val();
var isEdit = $("#isEdit").data("isedit");
var LoginId = $("#LoginId").val();

var role = $("#Role").val();

$('.view-button').hide();
if (Stage > 2) {
    $('#LicenseCategory,#AnchorHUB').prop('disabled', true);
}

//EditStage
if (Stage == 2) {
    $('.EditStage').show();

    var multiselect = $('#my-multiselect');


    var valueToRemove = 'option-value';

    // Find the option with the specified value
    var optionToRemove = multiselect.find('option[value="' + valueToRemove + '"]');

    // Remove the option from the multiselect
    optionToRemove.remove();
}

//CFT Stage
if (Stage == 3) {
    //claimsData = $.parseJSON($('#JsonCFTReviewData').val());
    CFTDepartment = claimsData.CFTDeptName;
    $('.CFTStageButtons').show();
    $('.CFTStage').attr('disabled', true);
    $('.OnPackDetails').hide();
    $('.CommuniactionDetails').hide();
    $('.cen_txt').text('CFT Review');
    // $("#communication_claims").hide();
    // $("#packlabel_claims").hide();
    $('#OtherMarkets').attr('disabled', true);
    $('#ClaimsDivision').attr('disabled', true);

}

//DSG Stage
if (Stage == 4) {
    $('.DSGStageButtons').show();
    $('.responsible_department').hide()
    $('.responsible_department_communication').hide()
    $('.cen_txt').text('DSG Review');
}

if (Stage == 5) {
    $('.ManagerApprovalButtons').show();
    $('.responsible_department').hide()
    $('.responsible_department_communication').hide()
    $('.cen_txt').text('Manager Approval');
}

if (Stage == 6) {
    $('.DSGSignOffBeforeSignedOff').show();
    $('.responsible_department').hide();
    $('.responsible_department_communication').hide();
    $('.cen_txt').text('DSG SignOff');
}
if (Stage == 15) {
    $('.DSGSignOff').show();
    $('#signOff').hide();
    $('.responsible_department').hide();
    $('.responsible_department_communication').hide();
    $('.cen_txt').text('Signed off');
}

if (Stage == 7) {
    $('.Addendum').show();
    $('.responsible_department').hide();
    $('.responsible_department_communication').hide();
    $('.cen_txt').text('Addendum');
}

if (Stage == 8) {
    //$('.EditStage').show();
    $('.cen_txt').text('Rejected');
}

if (Stage == 9) {
    //$('.EditStage').show();
    $('.cen_txt').text('Send Back To DSG');
}
if (Stage > 2) {
    $('#OtherMarkets').attr('disabled', true);
    $('#ClaimsDivision').attr('disabled', true);
}

if (isEdit == 'view') {
    $('.sticky-bottom').hide();
    $('.edit-buttons').hide();
    $('.view-button').show();
    $('.CFTStage').attr('disabled', true);
    $('#LicenseCategory').prop('disabled', true);
    $('#AnchorHUB').prop('disabled', true);
    $('#supportingDocument').prop('disabled', true);
    $('.claims_action_btn').hide();
    $('#OnPackDataAdd').hide();
    $('#CommunicationClaimsDataAdd').hide();
    $('.OnPackDetails').hide();
    $('.CommuniactionDetails').hide();
}


CKEDITOR.replace('RephraseClaims', {
    height: 50,
    width: 500,
    toolbarGroups: [

        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "insert",
            "groups": ["insert"]
        },
    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.instances.RephraseClaims.on('change', function () {
    $('.Rephraseclaims_v').empty();
    var data = `<span>` + CKEDITOR.instances["RephraseClaims"].getData() + `</span>`;
    $('.Rephraseclaims_v').append(data);
});

CKEDITOR.replace('MeasuredBy', {
    height: 50,
    width: 350,
    toolbarGroups: [

        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        }, {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }



    ],

    // Remove the redundant buttons from toolbar groups defined above.
});
CKEDITOR.instances.MeasuredBy.on('change', function (event) {
    // This code will be executed when the CKEditor content changes.
    const editor = event.editor;
    var content = editor.getData(); // Get the current content of the editor.
    content = content.replace(/<\/?[^>]+(>|$)/g, '');
    content = content.replaceAll("&nbsp;", "");
    // You can perform actions based on the changed content here.
    if (content.trim()) {
        $("#Err-MeasuredBy").hide();
    }
});

CKEDITOR.replace('SupportingStmt', {
    height: 50,
    width: 350,
    toolbarGroups: [

        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }
    ],
});
CKEDITOR.instances.SupportingStmt.on('change', function (event) {
    // This code will be executed when the CKEditor content changes.
    const editor = event.editor;
    var content = editor.getData(); // Get the current content of the editor.
    content = content.replace(/<\/?[^>]+(>|$)/g, '');
    content = content.replaceAll("&nbsp;", "");
    // You can perform actions based on the changed content here.
    if (content.trim()) {
        $("#Err-SupportingStmt").hide();
    }
});

CKEDITOR.replace('SupportingTechStmt', {
    height: 50,
    width: 350,
    toolbarGroups: [

        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }



    ],

    // Remove the redundant buttons from toolbar groups defined above.
});
CKEDITOR.instances.SupportingTechStmt.on('change', function (event) {
    // This code will be executed when the CKEditor content changes.
    const editor = event.editor;
    var content = editor.getData(); // Get the current content of the editor.
    content = content.replace(/<\/?[^>]+(>|$)/g, '');
    content = content.replaceAll("&nbsp;", "");
    // You can perform actions based on the changed content here.
    if (content.trim()) {
        $("#Err-SupportingTechStmt").hide();
    }
});

CKEDITOR.replace('CommunicationClaimsMeasuredBy', {
    height: 50,
    width: 350,
    toolbarGroups: [
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }
    ],
});
CKEDITOR.instances.CommunicationClaimsMeasuredBy.on('change', function (event) {
    // This code will be executed when the CKEditor content changes.
    const editor = event.editor;
    var content = editor.getData(); // Get the current content of the editor.
    content = content.replace(/<\/?[^>]+(>|$)/g, '');
    content = content.replaceAll("&nbsp;", "");
    console.log(content, 'content')
    // You can perform actions based on the changed content here.
    if (content.trim()) {
        $("#Err-CommunicationClaimsMeasuredBy").hide();
    }
});



CKEDITOR.replace('multipleEditors_0', {
    height: 50,
    width: 280,
    toolbarGroups: [
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }
    ],
});
CKEDITOR.replace('multipleMeasuredEditors_0', {
    height: 50,
    width: 280,
    toolbarGroups: [
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }
    ],
});


CKEDITOR.replace('communication_multipleEditors_0', {
    height: 50,
    width: 280,
    toolbarGroups: [
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }
    ],
});
CKEDITOR.replace('communication_multipleMeasuredEditors_0', {
    height: 50,
    width: 280,
    toolbarGroups: [
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }
    ],
});

//Header Table Data
$('.projNo').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].ProjectNumber);
$('#prodName').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductName);
$('#apprNo').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].HGLApprovalNumber);
$('#date').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : moment(claimsData.ClaimsHeadersList[0].Date).format('DD/MM/YYYY'));
$('#version').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].VersionNo);

////////////////// For View////////////////////////
$('.projNo_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].ProjectNumber);
$('.prodName_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductName);
$('.apprNo_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].HGLApprovalNumber);
$('#date_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : moment(claimsData.ClaimsHeadersList[0].Date).format('DD/MM/YYYY'));
$('#version_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].VersionNo);
///////////////////////////////////

//Project Details
$('#ProductName').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductName);
$('#HGLApprovalNumber').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].HGLApprovalNumber);
$('#ProductPositioningStatement').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductPositioningStatement);
$('#ClaimsDivision').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].Division);

////////////////// For View////////////////////////
$('#ProductName_v').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductName);
//$('#HGLApprovalNumber_v').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].HGLApprovalNumber);
$('.ProductPositioningStatement_v').text(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductPositioningStatement);
$('.Division_v').text(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].DivisionName);
///////////////////////////////////
//Product Description
$('#LicenseCategory').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].LicenseCategory);
$('#otherhubslicensecategory').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].OtherHUBSLicenseCategory);
$('#Dosage').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].Dosage);
$('#TargetOrgan').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].TargetOrgan);
$('#FormulaFeatures').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].FormulaFeatures);

$('#OtherMarkets').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].OtherMarkets);
$('#ShelfLife').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].ShelfLife);
$('#DirectionForUse').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].DirectionForUse);
$('#Caution').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].Caution);
$('#TargetCustomer').val(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].TargetCustomer);


//$("#ResponsibleDeptOnPack option[value='IRA']").attr("selected", true).prop("disabled", true);
//$("#ResponsibleDeptCommunication option[value='IRA']").attr("selected", true).prop("disabled", true);

$(document).ready(function () {
    if (Stage < 3) {
        if (claimsData.DeptBasedOnHub[0].DeptName != null) {
            depatmentBasedOnHub = claimsData.DeptBasedOnHub[0].DeptName.split(',');
            for (var i = 0; i < depatmentBasedOnHub.length; i++) {
                if (depatmentBasedOnHub[i] == "RA_INDIA") {
                    $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]");
                    $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]");
                }
                else {
                    $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
                    $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
                }
            }
            var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
                return value.indexOf("RA_INDIA") === -1;
            });
            $("#ResponsibleDeptOnPack").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');
            $("#ResponsibleDeptCommunication").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');
        }
    }
    //if (parseInt(Stage) >2) {
    //    $("#RephraseClaims").attr("readonly", true);
    //}
    //if (parseInt(Stage) > 2) {
    //    $("#RephraseClaims").attr("readonly", true);
    //}
    $('.Rephraseclaims_v').empty();
    var data = `<span>` + CKEDITOR.instances["RephraseClaims"].getData() + `</span>`;
    $('.Rephraseclaims_v').append(data);
});

//Supporting Documents Table
colmodels = [

    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 150,
        ignoreCase: true,
        resizable: true,
        hidden: true,
    },
    {
        name: 'SupportingDocument',
        label: 'Document Name',
        width: 140,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 70,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        width: 70,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 10,
        resizable: true,
        ignoreCase: true,
        //hidden:true,
        formatter: function (cellvalue, options, rowobject) {

            var fileName = rowobject.SupportingDocument.replaceAll('"', ''); // Remove double quotes
            var fileExtension = fileName.split('.').pop().toLowerCase();
            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
                'csv': 'Microsoft Excel Spreadsheet',
            };

            var matches = rowobject.UploadedBy.match(/\(([^)]+)\)/);
            if (matches == null) {
                matches = rowobject.UploadedBy
            }


            if (matches == LoginId || matches[1] == LoginId) { // Check if matches[1] is the LoginId
                if (fileExtension in fileTypes) {
                    return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='deletedoc' onclick='DeleteDoc(" + options.rowId + ")'><i class='flaticon-delete color-danger' title='Delete'></i></a></div>";
                } else {
                    return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewUploadedDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a><a class='deletedoc' onclick='DeleteDoc(" + options.rowId + ")'><i class='flaticon-delete color-danger' title='Delete'></i></a></div>";
                }
            }
            else {
                if (Stage <= 3) {
                    if (LoginId == matches[1]) {
                        if (fileExtension in fileTypes) {
                            return '<div class="text-center"><a class="SupportingDoc" onclick="DownloadSupportingDoc(' + options.rowId + ')"><i class="flaticon-download color-green" title="Download"></i></a></div>';
                        } else {
                            return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewUploadedDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a></div>";
                        }
                    }
                    else {
                        if (fileExtension in fileTypes) {
                            return '<div class="text-center"><a class="SupportingDoc" onclick="DownloadSupportingDoc(' + options.rowId + ')"><i class="flaticon-download color-green" title="Download"></i></a></div>';
                        } else {
                            return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewUploadedDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a></div>";
                        }
                    }
                }
                else if (role == "DSG Initiator" || role == "ADMIN" || role == "DSG Manager") {
                    if (fileExtension in fileTypes) {
                        return '<div class="text-center"><a class="SupportingDoc" onclick="DownloadSupportingDoc(' + options.rowId + ')"><i class="flaticon-download color-green" title="Download"></i></a></div>';
                    } else {
                        return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewUploadedDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a></div>";
                    }
                }
                else {
                    if (fileExtension in fileTypes) {
                        return "";
                    }
                    else {
                        return "<div class='text-center'><a class='mr-2' onclick='ViewUploadedDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a></div>";
                    }
                }
            }

            //var fileTypes = {
            //    'doc': 'Microsoft Word Document',
            //    'docx': 'Microsoft Word Document',
            //    'xls': 'Microsoft Excel Spreadsheet',
            //    'xlsx': 'Microsoft Excel Spreadsheet',
            //    'ppt': 'Microsoft PowerPoint',
            //    'pptx': 'Microsoft PowerPoint',
            //    'csv': 'Microsoft Excel Spreadsheet',
            //};
            //var str = "<tr id='row_" + i + "'>";
            //str += "<td class='text-left' style='text-wrap:wrap;><a class='btn-icon -history SupportingDocDownload' data-attribute='" + obj.SupportingDocument + "'>" + fileName + "</a></td><td id='uploadedBy' class='text-left'>" + obj.UploadedBy + "</td><td id='uploadedOn' class='text-left'>" + moment(obj.UploadedOn).format('DD-MM-YYYY') + "</td>";
            //var matches = obj.UploadedBy.match(/\(([^)]+)\)/);

            //if (LoginId == matches[1]) {
            //    if (fileExtension in fileTypes) {
            //        str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a><a class='deletedoc' onclick=DeleteDoc('" + EncodedFile + "','" + i + "')><i class='flaticon-delete color-danger' title='Delete'></i></a></td><tr>";
            //    } else {
            //        str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a><a class='ViewSupportingDoc mr-2' href='" + ROOT + 'Pdfupload/' + decodeURIComponent(EncodedFile) + "' target='_blank'><i class='flaticon-view color-blue' title='View'></i></a><a class='deletedoc' onclick=DeleteDoc('" + EncodedFile + "')><i class='flaticon-delete color-danger' title='Delete'></i></a></td></tr>";
            //    }
            //}
        }
    }

],
    $('#Grid_Supporting_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: claimsData.ClaimsSupportingDocument,
        mtype: 'GET',
        colModel: colmodels,
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
$("#Add_SupportingDocuments").on("click", function () {

    var document = $("#supportingDocument").val();
    var flag = true;

    if (document != "") {
        var supportingDocument = $('#supportingDocument').prop("files");
        var modifiedSupportingDocumentsName = SaveSupportingDocumentFile(supportingDocument);
        modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");
        var griddata = [];
        var docData = {};
        docData = {
            SupportingDocument: modifiedSupportingDocumentsName,
            UploadedBy: $("#LoginId").val()

        }

        griddata.push(docData);
        var doc1 = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
        var doc2 = $.merge(doc1, griddata);
        $("#Grid_Supporting_Document").jqGrid('setGridParam', { data: doc2 });
        $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);

        $("#supportingDocument").val('');
    }
    else {
        $("#Err-supportingDocument").show();
        setTimeout(function () {
            $("#Err-supportingDocument").hide();
        }, 2000);

    }
});
function ViewUploadedDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'SupportingDocument');
    if (filename.length > 0) {
        var imageUrl = ROOT + 'Pdfupload/' + filename;
        window.open(imageUrl, '_blank');
    }
}
function SaveSupportingDocumentFile(fileName) {
    debugger
    var modifiedfileName = "";
    var formData = new FormData();

    if (fileName != "") {
        debugger
        formData.append("file", fileName[0]);
        $.ajax({
            type: 'POST',
            url: ROOT + "ClaimsGrid/SaveSupportingDocument",
            async: false,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {

                modifiedfileName = data;
            }
        });
    }
    return modifiedfileName;
}

function DownloadSupportingDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'SupportingDocument');
    if (filename.length > 0) {
        $('.SupportingDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}
var deleteImageIn_DocGrid = [];
function DeleteDoc(rowId) {
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'SupportingDocument');
    $("#jqGridRow_DeleteModal").modal("show");
    $("#jqGridRow_DeleteModal_Ok").off("click").on("click", function () {
        if (filename.length > 0) {
            $("#Grid_Supporting_Document").jqGrid('delRowData', rowId);
            $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
            //$.ajax({
            //    type: 'POST',
            //    url: ROOT + "ClaimsGrid/DeleteDocumentFile",
            //    data: { fileName: filename },
            //    success: function (data) {
            //        var path = data;
            //    },
            //    error: function (error) {

            //        //alert("Error deleting document: " + error);
            //    }
            //});

            var data1 = {}
            data1 = {
                DocumentName: filename
            }
            deleteImageIn_DocGrid.push(data1);
        }
        $("#jqGridRow_DeleteModal").modal("hide");
    });
}


// validate format and size on file upload
function validateCFTfileupload() {
    var flag = true;
    var supportedExtention = ['xls', 'xlsx'];
    var fileLength = 0;
    var filesArray = [];

    filesArray = $(`#CFTreviewexcelupload`).get(0).files;
    $.each(filesArray, function (index, file) {
        var ext = file.name.split('.').pop().toLowerCase();
        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_InvalidCFTDocFormat').show();
            setTimeout(function () {
                $('#Err_InvalidCFTDocFormat').hide();
            }, 5000);

            $(`#CFTreviewexcelupload`).val('');
            flag = false;
            return false;
        }
    });
    if (flag) {
        for (var i = 0; i < $(`#CFTreviewexcelupload`).get(0).files.length; i++) {
            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            fileLength += $(`#CFTreviewexcelupload`).get(0).files[i].size / 1024;
            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#CFTreviewexcelupload').val('');
                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#CFTreviewexcelupload`).get(0).files[i];
            supportedFiles.push(file1);
            var fileName = $(`#CFTreviewexcelupload`).get(0).files[i].name.toString().split('\\').pop();
            supportedFiles.name = fileName;
            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });
            formData.append('files', newFile);
        }
    }
}

var CFTUploadedDocumentarr = [];
// Add file on click of add button
$("#Add_CFTDocument").on("click", function () {

    var document = $("#CFTreviewexcelupload").val();
    var flag = true;

    if (document != "") {
        var supportingDocument = $('#CFTreviewexcelupload').prop("files");
        var modifiedSupportingDocumentsName = SaveSupportingDocumentFile(supportingDocument);//using same supporting document for save function
        modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");
        var griddata = [];
        var docData = {};
        docData = {
            CFTUploadedDocument: modifiedSupportingDocumentsName,
            UploadedBy: $("#LoginId").val()
        }
        docData1 = {
            DocumentName: modifiedSupportingDocumentsName,
            DepartmentName: department,
        }
        CFTUploadedDocumentarr.push(docData1);
        griddata.push(docData);
        var doc1 = $("#CFTreview_Document").jqGrid('getGridParam', 'data');
        var doc2 = $.merge(doc1, griddata);
        $("#CFTreview_Document").jqGrid('setGridParam', { data: doc2 });
        $("#CFTreview_Document").trigger('reloadGrid', [{ page: 1 }]);
        $("#CFTreviewexcelupload").val("");

    }
    else {
        $("#Err-CFTdocument").show();
        setTimeout(function () {
            $("#Err-CFTdocument").hide();
        }, 2000);

    }
});

//CFT Documents Table
CFTdocumentcolmodels = [

    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 150,
        ignoreCase: true,
        resizable: true,
        hidden: true,
    },
    {
        name: 'CFTUploadedDocument',
        label: 'Document Name',
        width: 140,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 70,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        width: 70,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 10,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {


            var fileName = rowobject.CFTUploadedDocument.replaceAll('"', ''); // Remove double quotes
            var fileExtension = fileName.split('.').pop().toLowerCase();
            var fileTypes = {

                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',

            };
            var matches = rowobject.UploadedBy.match(/\(([^)]+)\)/);

            if (matches && matches[1] == LoginId) { // Check if matches[1] is the LoginId
                if (fileExtension in fileTypes) {
                    return "<div class='text-center'><a class='SupportingCFTUploadedDoc mr-2' onclick='DownloadCFTUploadedDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='deletedoc' onclick='DeleteCFTUploadedDoc(" + options.rowId + ")'><i class='flaticon-delete color-danger' title='Delete'></i></a></div>";
                } else {
                    return "<div class='text-center'><a class='SupportingCFTUploadedDoc mr-2' onclick='DownloadCFTUploadedDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewUploadedDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a><a class='deletedoc' onclick='DeleteCFTUploadedDoc(" + options.rowId + ")'><i class='flaticon-delete color-danger' title='Delete'></i></a></div>";
                }
            } else if (matches && matches[1] != LoginId) {
                if (fileExtension in fileTypes) {
                    return '<div class="text-center"><a class="SupportingCFTUploadedDoc" onclick="DownloadCFTUploadedDoc(' + options.rowId + ')"><i class="flaticon-download color-green" title="Download"></i></a></div>';
                } else {
                    return "<div class='text-center'><a class='SupportingCFTUploadedDoc mr-2' onclick='DownloadCFTUploadedDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewUploadedDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a></div>";
                }

            } else {
                return '<div class="text-left icon_section align-items-left">' +
                    '<span class="action-link"><a onclick=DownloadCFTUploadedDoc(' + options.rowId + ')  class="SupportingCFTUploadedDoc mr-2" title="Download"><i class="flaticon-download color-green" title="Download"></i></a></span>' +
                    (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="mr-2" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
                    '<span class="action-link"><a onclick=DeleteCFTUploadedDoc(' + options.rowId + ') class="deletedoc" title="Delete"><i class="flaticon-delete color-danger" title="Delete"></i></a></span>' +
                    '</div> ';
            }




        }
    }

],
    $('#CFTreview_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: claimsData.CFTUploadedDocumentDetails,
        mtype: 'GET',
        colModel: CFTdocumentcolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_CFTreview_Document',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#CFTreview_Document tbody tr");
            var objHeader = $("#CFTreview_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            } if (isEdit == "view") {
                $(".deletedoc").hide();
            }

        }
    });

function DownloadCFTUploadedDoc(rowId) {
    var filename = $('#CFTreview_Document').jqGrid('getCell', rowId, 'CFTUploadedDocument');
    if (filename.length > 0) {
        $('.SupportingCFTUploadedDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}

var deleteCFTUploadedDoc = [];
function DeleteCFTUploadedDoc(rowId) {
    var filename = $('#CFTreview_Document').jqGrid('getCell', rowId, 'CFTUploadedDocument');
    $("#jqGridRow_DeleteModal").modal("show");
    $("#jqGridRow_DeleteModal_Ok").off("click").on("click", function () {
        if (filename.length > 0) {
            $("#CFTreview_Document").jqGrid('delRowData', rowId);
            $("#CFTreview_Document").trigger('reloadGrid', [{ page: 1 }]);
            var data1 = {}
            data1 = {
                DocumentName: filename,
                GridId: GridId,
                DeptName: department,
                UserId: LoginId,
            }
            deleteCFTUploadedDoc.push(data1);
            CFTUploadedDocumentarr = CFTUploadedDocumentarr.filter(doc => doc.DocumentName !== filename);
        }
        $("#jqGridRow_DeleteModal").modal("hide");
    });
}

//$(claimsData.ClaimsSupportingDocument).each(function (i, obj) {
//    debugger
//    var fileName = obj.SupportingDocument.replaceAll('"', '');
//    var fileExtension = fileName.split('.').pop().toLowerCase();
//    var EncodedFile = encodeURIComponent(fileName);

//    var fileTypes = {
//        'doc': 'Microsoft Word Document',
//        'docx': 'Microsoft Word Document',
//        'xls': 'Microsoft Excel Spreadsheet',
//        'xlsx': 'Microsoft Excel Spreadsheet',
//        'ppt': 'Microsoft PowerPoint',
//        'pptx': 'Microsoft PowerPoint',
//        'csv': 'Microsoft Excel Spreadsheet',
//    };
//    var str = "<tr id='row_" + i +"'>";
//    str += "<td class='text-left' style='text-wrap:wrap;><a class='btn-icon -history SupportingDocDownload' data-attribute='" + obj.SupportingDocument + "'>" + fileName + "</a></td><td id='uploadedBy' class='text-left'>" + obj.UploadedBy + "</td><td id='uploadedOn' class='text-left'>" + moment(obj.UploadedOn).format('DD-MM-YYYY') + "</td>";
//    var matches = obj.UploadedBy.match(/\(([^)]+)\)/);

//    if (LoginId == matches[1]) {
//        if (fileExtension in fileTypes) {
//            str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a><a class='deletedoc' onclick=DeleteDoc('" + EncodedFile + "','" + i +"')><i class='flaticon-delete color-danger' title='Delete'></i></a></td><tr>";
//        } else {
//            str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a><a class='ViewSupportingDoc mr-2' href='" + ROOT + 'Pdfupload/' + decodeURIComponent(EncodedFile) + "' target='_blank'><i class='flaticon-view color-blue' title='View'></i></a><a class='deletedoc' onclick=DeleteDoc('" + EncodedFile + "')><i class='flaticon-delete color-danger' title='Delete'></i></a></td></tr>";
//        }
//    }
//    else {
//        if (fileExtension in fileTypes) {
//            str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a></td><tr>";
//        } else {
//            str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a><a class='ViewSupportingDoc' href='" + ROOT + 'Pdfupload/' + decodeURIComponent(EncodedFile) + "' target='_blank'><i class='flaticon-view color-blue' title='View'></i></a></td></tr>";
//        }
//    }
//    $('#UploadedDocs').append(str);
//    str = "";
//});

//function DownloadSupportingDoc(filename) {
//    if (filename.length > 0) {
//        $('.SupportingDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
//        return true;
//    }
//}



//var deleteImageIn_DocGrid = [];
//function DeleteDoc(encodedFile,num) {
//    debugger
//        var filename = decodeURIComponent(encodedFile);


//        $.ajax({
//            type: 'POST',
//            url: ROOT + "ClaimsGrid/DeleteDocumentFile",
//            data: { fileName: filename },
//            success: function (data) {
//                var path = data;
//            },
//            error: function (error) {

//               //alert("Error deleting document: " + error);
//            }
//        });
//    var UploadedDocs = $(this);
//    $("#row_" + num).html("")


//        var data1 = {
//            DocumentName: filename
//        };
//        deleteImageIn_DocGrid.push(data1);
//    }

//Download Supporting Document
//$('.SupportingDocDownload').click(function () {
//    SupportingDocDownload = $(this).attr('data-attribute');
//    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
//    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
//    SupportingDocDownload = SupportingDocDownload.replaceAll('/', '')

//    if (SupportingDocDownload.length > 0) {
//        $('.SupportingDocDownload').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload);
//        return true;
//    }
//});


//OnClaims JQGrid
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="text-center icon_section align-items-left">' +
                '<a onclick=onEditOnPackClaims(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeleteOnPackClaims(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';

        }
    },

    {
        name: 'Claims',
        label: 'Claims',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Feasibility',
        label: 'Feasibility of Achieving claims',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SupportingStmt',
        label: 'Supporting technical statements from R&D',
        resizable: true,
        width: 200,
        ignoreCase: true,
    },
    {
        name: 'MeasuredBy',
        label: 'Measured By',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'OnPackRemarks',
        label: 'DSG Remarks / Restrictions',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ResponsibleDepartment',
        label: 'Responsible Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CFTRemarksValue',
        width: 100,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'CFTRemarks',
        label: CFTDepartment == '' ? +'CFT Remarks' : CFTDepartment + ' Remarks',
        width: 140,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            var remVal = rowobject.CFTRemarksValue == null ? "" : rowobject.CFTRemarksValue;
            return '<div class="text-center icon_section align-items-left"><textarea data-attr="cftRemarks" class="p-3 form-control" spellcheck="false">' + remVal + '</textarea></div>';
        }
    },


],

    //$("#OnPackClaimsGrid").jqGrid({
    //    url: '',
    //    datatype: 'local',
    //    data: claimsData.ClaimsOnPackDetails,
    //    mtype: 'GET',
    //    colModel: colmodels,
    //    loadonce: true,
    //    viewrecords: true,
    //    pager: '#pager_claims_documeent',
    //    rowNum: 20,
    //    scroll: 1,

    //    gridComplete: function () {
    //        var objRows = $("#OnPackClaimsGrid tbody tr");
    //        var objHeader = $("#OnPackClaimsGrid tbody tr td");

    //        if (objRows.length > 1) {
    //            var objFirstRowColumns = $(objRows[1]).children("td");
    //            for (i = 0; i < objFirstRowColumns.length; i++) {
    //                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
    //            }
    //        }
    //        if (Stage == 2 || Stage == 1) {
    //            jQuery("#OnPackClaimsGrid").jqGrid('hideCol', "CFTRemarks");
    //        }
    //        if (Stage == 3) {
    //            jQuery("#OnPackClaimsGrid").jqGrid('hideCol', "Action");
    //        }
    //        if (Stage > 3) {
    //            $('textarea[data-attr="cftRemarks"]').attr('disabled', true);
    //        }

    //    }
    //});


    $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


//Communication Claims JQGrid
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="text-center icon_section align-items-left">' +
                '<a onclick=onEditCommunicationClaims(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
                '<a onclick=onDeleteCommunicationClaims(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
                '</div> ';

        }
    },

    {
        name: 'CommunicationClaims',
        label: 'Claims',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Feasibility',
        label: 'Feasibility of Achieving claims',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SupportingTechStmt',
        label: 'Supporting technical statements from R&D',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CommunicationClaimsMeasuredBy',
        label: 'Measured By',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CommunicationRemarks',
        label: 'DSG Remarks / Restrictions',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ResponsibleDepartment',
        label: 'Responsible Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CFTRemarksValue',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'CFTRemarks',
        label: CFTDepartment == '' ? +'CFT Remarks' : CFTDepartment + ' Remarks',
        resizable: true,
        width: 100,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            var remVal = rowobject.CFTRemarksValue == null ? "" : rowobject.CFTRemarksValue;
            return '<div class="text-center icon_section align-items-left"><textarea data-attr="cftRemarks" class="p-3 form-control" spellcheck="false">' + remVal + '</textarea></div>';
        }
    },


],

    //$("#CommuniactionClaimsGrid").jqGrid({
    //    url: '',
    //    datatype: 'local',
    //    data: claimsData.ClaimsCommunicationDetails,
    //    mtype: 'GET',
    //    colModel: colmodels,
    //    loadonce: true,
    //    viewrecords: true,
    //    pager: '#pager_claims_documeent1',
    //    rowNum: 20,
    //    scroll: 1,

    //    gridComplete: function () {
    //        var objRows = $("#CommuniactionClaimsGrid tbody tr");
    //        var objHeader = $("#CommuniactionClaimsGrid tbody tr td");

    //        if (objRows.length > 1) {
    //            var objFirstRowColumns = $(objRows[1]).children("td");
    //            for (i = 0; i < objFirstRowColumns.length; i++) {
    //                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
    //            }
    //        }
    //        if (Stage == 2 || Stage == 1) {
    //            jQuery("#CommuniactionClaimsGrid").jqGrid('hideCol', "CFTRemarks");
    //        }
    //        if (Stage == 3) {
    //            jQuery("#CommuniactionClaimsGrid").jqGrid('hideCol', "Action");


    //        }
    //        if (Stage > 3) {
    //            $('textarea[data-attr="commClaimRemarks"]').attr('disabled', true);

    //        }

    //    }
    //});

    $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}



$('.data-multiselect').multiselect({
    includeSelectAllOption: true,
    buttonWidth: '100%',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});



//Comunnication Claims Grid Add record
var isValid = true;
var CommunicationClaimsEditRowId = 0;
//$('#CommunicationClaimsDataAdd').click(function () {
//    if ($("#CommunicationClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == "" || CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData() == "") {
//        $("#CommunicationClaims").val() == "" ? ($('#Err-CommunicationClaims').show(), isValid = false) : $('#Err-CommunicationClaims').hide();
//        $("#CommunicationFeasibilityClaims").val() == "" ? ($('#Err-CommunicationFeasibilityClaims').show(), isValid = false) : $('#Err-CommunicationFeasibilityClaims').hide();
//        CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData() == "" ? ($('#Err-CommunicationClaimsMeasuredBy').show(), isValid = false) : $('#Err-CommunicationClaimsMeasuredBy').hide();
//        $("#ResponsibleDeptCommunication").val() == "" ? ($('#Err-ResponsibleDeptCommunication').show(), isValid = false) : $('#Err-ResponsibleDeptCommunication').hide();

//    }
//    if (isValid) {

//        var gridDataCommunicationClaims = [];
//        CommunicationClaimsData = {
//            CommunicationClaims: $.trim($("#CommunicationClaims").val()),
//            Feasibility: $.trim($("#CommunicationFeasibilityClaims").val()),
//            SupportingTechStmt: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()),
//            CommunicationClaimsMeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()),
//            CommunicationRemarks: $.trim($("#CommunicationRemarks").val()),
//            ResponsibleDepartment: $.trim($("#ResponsibleDeptCommunication").val().toString())
//        }
//        if (CommunicationClaimsEditRowId == 0) {
//            gridDataCommunicationClaims.push(CommunicationClaimsData);
//            var PD1 = $("#CommuniactionClaimsGrid").jqGrid('getGridParam', 'data');
//            var PD2 = $.merge(PD1, gridDataCommunicationClaims);
//            $("#CommuniactionClaimsGrid").jqGrid('setGridParam', { data: PD2 });
//            $("#CommuniactionClaimsGrid").trigger('reloadGrid', [{ page: 1 }]);
//        }
//        else {
//            $.each(CommunicationClaimsData, function (key, value) {
//                $("#CommuniactionClaimsGrid").jqGrid('setCell', CommunicationClaimsEditRowId, key, value);
//                $("#CommuniactionClaimsGrid").trigger('reloadGrid', [{ page: 1 }]);
//            });
//            CommunicationClaimsEditRowId = 0;
//        }
//        $('.claimsField').val("");
//        $("#CommunicationFeasibilityClaims").val("");
//        $("#CommunicationFeasibilityClaims").trigger('change');
//        CKEDITOR.instances["SupportingTechStmt"].setData('');
//        CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
//        $("#ResponsibleDeptCommunication").val("").multiselect('refresh');


//    }
//    isValid = true;
//});



function onEditCommunicationClaims(RowIdCommunicationClaims) {

    CommunicationClaimsEditRowId = RowIdCommunicationClaims;
    var DataFromGridCommunicationClaims = jQuery('#CommuniactionClaimsGrid').jqGrid('getRowData', CommunicationClaimsEditRowId)
    $("#CommunicationClaims").val(DataFromGridCommunicationClaims.CommunicationClaims);
    $("#CommunicationFeasibilityClaims").val(DataFromGridCommunicationClaims.Feasibility);
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#SupportingTechStmt").val(DataFromGridCommunicationClaims.SupportingTechStmt);
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    CKEDITOR.instances["SupportingTechStmt"].setData(DataFromGridCommunicationClaims.SupportingTechStmt);
    //$("#CommunicationClaimsMeasuredBy").val(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    $("#CommunicationRemarks").val(DataFromGridCommunicationClaims.CommunicationRemarks);
    $("#ResponsibleDeptCommunication").val(DataFromGridCommunicationClaims.ResponsibleDepartment)
    var values = DataFromGridCommunicationClaims.ResponsibleDepartment;
    var newVal = values.split(',')
    $("#ResponsibleDeptCommunication").val(newVal);
    $("#ResponsibleDeptCommunication").multiselect("refresh")

}

function onDeleteCommunicationClaims(RowIdCommunicationClaims) {

    confirm("Are yoy sure you want to delete the communication claims?", function () {
        $("#CommuniactionClaimsGrid").jqGrid('delRowData', RowIdCommunicationClaims);
        $("#CommuniactionClaimsGrid").trigger('reloadGrid', [{ page: 1 }]);

    });
}




var isValid = true;
var OnPackDataAddEditRowId = 0;

//$('#OnPackDataAdd').click(function () {
//    if ($("#Claims").val() == "" || $("#FeasibilityClaims").val() == "" || CKEDITOR.instances["MeasuredBy"].getData() == "") {
//        $("#Claims").val() == "" ? ($('#Err-Claims').show(), isValid = false) : $('#Err-Claims').hide();
//        $("#FeasibilityClaims").val() == "" ? ($('#Err-FeasibilityClaims').show(), isValid = false) : $('#Err-FeasibilityClaims').hide();
//        CKEDITOR.instances["MeasuredBy"].getData() == "" ? ($('#Err-MeasuredBy').show(), isValid = false) : $('#Err-MeasuredBy').hide();
//        $("#ResponsibleDeptOnPack").val() == "" ? ($('#Err-ResponsibleDeptOnPack').show(), isValid = false) : $('#Err-ResponsibleDeptOnPack').hide();

//    }
//    if (isValid) {
//        var gridDataOnPackDataClaims = [];
//        OnPackData = {

//            Claims: $.trim($("#Claims").val()),
//            Feasibility: $.trim($("#FeasibilityClaims").val()),
//            SupportingStmt: $.trim(CKEDITOR.instances["SupportingStmt"].getData()),
//            MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()),
//            OnPackRemarks: $.trim($("#OnPackRemarks").val()),
//            ResponsibleDepartment: $("#ResponsibleDeptOnPack").val().toString()
//        }
//        if (OnPackDataAddEditRowId == 0) {

//            gridDataOnPackDataClaims.push(OnPackData);
//            var PD1 = $("#OnPackClaimsGrid").jqGrid('getGridParam', 'data');
//            var PD2 = $.merge(PD1, gridDataOnPackDataClaims);
//            $("#OnPackClaimsGrid").jqGrid('setGridParam', { data: PD2 });
//            $("#OnPackClaimsGrid").trigger('reloadGrid', [{ page: 1 }]);
//        }
//        else {

//            $.each(OnPackData, function (key, value) {
//                $("#OnPackClaimsGrid").jqGrid('setCell', OnPackDataAddEditRowId, key, value);
//                $("#OnPackClaimsGrid").trigger('reloadGrid', [{ page: 1 }]);
//            });
//            OnPackDataAddEditRowId = 0;
//        }
//        $('.onPackField').val("");
//        $("#FeasibilityClaims").val("");
//        $("#FeasibilityClaims").trigger("change");
//        CKEDITOR.instances["MeasuredBy"].setData('');
//        CKEDITOR.instances["SupportingStmt"].setData('');
//        $("#ResponsibleDeptOnPack").val("").multiselect('refresh');

//    }
//    isValid = true;
//});



function onEditOnPackClaims(RowIdOnPack) {
    OnPackDataAddEditRowId = RowIdOnPack;
    var DataFromGridOnPack = jQuery('#OnPackClaimsGrid').jqGrid('getRowData', OnPackDataAddEditRowId)
    $("#Claims").val(DataFromGridOnPack.Claims);
    $("#FeasibilityClaims").val(DataFromGridOnPack.Feasibility);
    $("#FeasibilityClaims").trigger('change');
    //$("#SupportingStmt").val(DataFromGridOnPack.SupportingStmt);
    CKEDITOR.instances["MeasuredBy"].setData(DataFromGridOnPack.MeasuredBy);
    CKEDITOR.instances["SupportingStmt"].setData(DataFromGridOnPack.SupportingStmt);
    //$("#MeasuredBy").val(DataFromGridOnPack.MeasuredBy);
    $("#OnPackRemarks").val(DataFromGridOnPack.OnPackRemarks);
    var values = DataFromGridOnPack.ResponsibleDepartment;
    var newVal = values.split(',')
    $("#ResponsibleDeptOnPack").val(newVal);
    $("#ResponsibleDeptOnPack").multiselect("refresh");
}

function onDeleteOnPackClaims(RowIdOnPack) {
    confirm("Are yoy sure you want to delete the OnPack claims?", function () {
        $("#OnPackClaimsGrid").jqGrid('delRowData', RowIdOnPack);
        $("#OnPackClaimsGrid").trigger('reloadGrid', [{ page: 1 }]);
    });
}



//To Remove all the validation errors
$('.mandatory').on('change keyup', function () {
    if ($(this).val() != "") {
        $(this).parent().find('span').hide();
    }
})

//$('#ProjectNo').change(function () {

//    var projNo = $(this).val();;

//    if (projNo != "") {
//        $.ajax({
//            type: "POST",
//            url: ROOT + "ClaimsGrid/GetDataByProjectNo",
//            data: { projNo: projNo },
//            dataType: "json",
//            success: function (result) {

//                $('#ProductName').val(result[0].ProductName == null ? "null" : "");
//                $('#HGLApprovalNumber').val(result[0].HGLApprovalNumber == null ? "null" : "");

//            },
//            error: function () {
//                alert("Error occured!!");
//            }
//        });
//    }
//    else {
//        $('#ProductName').val("");
//        $('#HGLApprovalNumber').val("");
//    }
//})


//To restrict the file format
//function fileValidation() {
//    var document = $('#supportingDocument').val();

//    // Allowing file type
//    var allowedExtensions =
//        /(\.pdf|\.doc|\.docx|\.xlsx|\.pptx|\.ppt|\.csv|\.xls)$/i;

//    if (document != '') {
//        if (!allowedExtensions.exec(document)) {
//            $('#Err_InvalidDocFormat').show();
//            $('#supportingDocument').val('');

//            setTimeout(function () {
//                $('#Err_InvalidDocFormat').hide();
//            }, 5000)

//            return false;
//        }
//        else {
//            $('#Err_InvalidDocFormat').hide();
//        }

//    }

//}
var formData = new FormData();
function fileValidation() {
    debugger
    var flag = true;
    var supportedExtention = ['pdf', 'doc', 'xls', 'xlsx', 'ppt', 'pptx', 'docx', 'csv'];
    var fileLength = 0;
    var filesArray = [];

    filesArray = $(`#supportingDocument`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $('#Err_InvalidDocFormat').show();
            setTimeout(function () {
                $('#Err_InvalidDocFormat').hide();
            }, 5000);

            $(`#supportingDocument`).val('');

            flag = false;

            return false;
        }
    });
    if (flag) {
        for (var i = 0; i < $(`#supportingDocument`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#supportingDocument`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#supportingDocument').val('');
                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#supportingDocument`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#supportingDocument`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);


        }
    }

}


//Claims Save - Draft Stage
$('.claimsSave').off("click").click(function () {
    validSave = true;

    $('#claimsSaveOk').prop("disabled", false);
    //$('.mandatory').each(function (i, obj) {
    //    if ($(this).val() == "") {
    //        $(this).parent().find('span').show();
    //        validSave = false;
    //    }
    //})

    //var CommunicationClaimsGridLength = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'reccount');
    //var OnPackClaimsGridLength = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'reccount');
    //var CommunicationClaimsGridLength = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'reccount');
    //var OnPackClaimsGridLength = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'reccount');

    //CommunicationClaimsGridLength == 0 ? ($('#Err-CommunicationClaimsGrid').show(), validSave = false) : $('#Err-CommunicationClaimsGrid').hide();

    //OnPackClaimsGridLength == 0 ? ($('#Err-OnPackGrid').show(), validSave = false) : $('#Err-OnPackGrid').hide();
    let ProjectNo_ID = $('#ProjectNo').val();

    if (ProjectNo_ID == "") {
        validSave = false;
        $('#Err-ProjectNo').show()
        return;
    } else {
        $('#Err-ProductName').hide();
        if (ProjectNo_ID == "Others") {
            if ($('#ProductName').val() == "") {
                $('#Err-ProductName').show()
                return;
            }
        } else {
            $('#Err-ProjectNo').hide()
        }
    }

    if (validSave) {
        var editedData = $("#OnPackClaimsGrid").jqGrid("getChangedCells", "dirty");
        // Do something with the edited data

        packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
        communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

        var onPackGridData = JSON.stringify(packLabelClaimsDetails);
        var CommunicationClaimsGridData = JSON.stringify(communicationClaimsDetails);
        var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

        var claimsheaders = [];
        claimsheaders.push({
            ID: claimsData ? claimsData.ClaimsHeadersList[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            VersionNo: 1,
            StatusId: 2,
        });

        var projectdetails = {
            ID: claimsData ? claimsData.ClaimsProjectDetails[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            Division: $("#ClaimsDivision").val()
        };
        var projectbrief = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
        };

        var productdescription = {
            ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim($("#DirectionForUse").val()),
            Caution: $.trim($("#Caution").val()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };


        $('#SaveModal').modal('show');
        $('#claimsSaveOk').off("click").click(function () {
            // var fileName = "";
            //var files = $('#supportingDocument').prop("files");

            //var formData = new FormData();
            //if (files.length > 0) {
            //    formData.append("file", files[0]);
            //    $.ajax({
            //        type: 'POST',
            //        url: ROOT + "ClaimsGrid/SaveSupportingDocument",
            //        async: false,
            //        data: formData,
            //        cache: false,
            //        contentType: false,
            //        processData: false,
            //        success: function (data) {
            //            fileName = data;
            //        }
            //    });
            //}
            $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
            $("#ProductDescription").val(JSON.stringify(productdescription));
            $("#ProjectDetails").val(JSON.stringify(projectdetails));
            $("#OnPackClaims").val(onPackGridData);
            $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
            // $('#SupportingDoc').val(fileName);
            $('#Stage').val(2)
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
            $('#ProjectBrief').val(JSON.stringify(projectbrief));

            $('#EditClaims').submit();
            $('#claimsSaveOk').prop("disabled", true);
        })

    }
});


//Claims sent to cft
$('#claimsSubmit').off("click").click(function () {
    validSave = true;

    $('.mandatory').each(function (i, obj) {
        if ($(this).val() == "") {
            $(this).parent().find('span').show();
            validSave = false;
        }
    })

    var CommunicationClaimsGridLength = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'reccount');
    var OnPackClaimsGridLength = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'reccount');
    CommunicationClaimsGridLength == 0 ? ($('#Err-CommunicationClaimsGrid').show(), validSave = false) : $('#Err-CommunicationClaimsGrid').hide();
    OnPackClaimsGridLength == 0 ? ($('#Err-OnPackGrid').show(), validSave = false) : $('#Err-OnPackGrid').hide();

    if (validSave) {
        var onPackGridData = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'data');
        var CommunicationClaimsGridData = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'data');

        var claimsheaders = [];
        claimsheaders.push({
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            VersionNo: 1,
            StatusId: 3,
        });

        var projectdetails = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            Division: $("#ClaimsDivision").val()
        };

        var projectbrief = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
        };

        var productdescription = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim($("#DirectionForUse").val()),
            Caution: $.trim($("#Caution").val()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };

        var ApprovalStatus = {
            FromStage: 1,
            ToStage: 3,
            Remarks: $('#editor').val()
        };

        $('#SaveModal').modal('show');
        $('#claimsSaveOk').off("click").click(function () {
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            //var fileName = "";
            //var files = $('#supportingDocument').prop("files");

            //var formData = new FormData();
            //if (files.length > 0) {
            //    formData.append("file", files[0]);
            //    $.ajax({
            //        type: 'POST',
            //        url: ROOT + "ClaimsGrid/SaveSupportingDocument",
            //        async: false,
            //        data: formData,
            //        cache: false,
            //        contentType: false,
            //        processData: false,
            //        success: function (data) {
            //            fileName = data;
            //        }
            //    });
            //}


            $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
            $("#ProductDescription").val(JSON.stringify(productdescription));
            $("#ProjectDetails").val(JSON.stringify(projectdetails));
            $("#OnPackClaims").val(JSON.stringify(onPackGridData));
            $("#CommunicationClaimsData").val(JSON.stringify(CommunicationClaimsGridData));
            // $('#SupportingDoc').val(fileName);
            $('#ApprovalStatus').val(JSON.stringify(ApprovalStatus));
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
            $('#Stage').val(2);
            $('#ProjectBrief').val(JSON.stringify(projectbrief));

            $('#EditClaims').submit();
        })

    }
});


//CFT Review Save
$('.CFTSave').off("click").click(function () {
    $('#claimsSaveOk').prop("disabled", false);
    var onPackClaims = [];
    $('#cft_review_pack_claims').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_claims").jqGrid('getRowData', row.id);
            var isPresent = deletedDocuments.some(document => document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName);
            deletedDocuments = deletedDocuments.filter(document => !(document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName));

            if (isPresent) {
                var obj = {
                    Comments: $(row).find(`textarea`).val(),
                    Department: department,//need to change
                    DocumentName: "",
                    ClaimsId: rowData.ClaimsID
                }
                onPackClaims.push(obj);

            }
            else {
                var obj = {
                    Comments: $(row).find(`textarea`).val(),
                    Department: department,//need to change
                    DocumentName: rowData.DocumentName,
                    ClaimsId: rowData.ClaimsID
                }
                onPackClaims.push(obj);
            }
        }
    });

    var communicationClaims = []
    $('#cft_review_pack_communication').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_communication").jqGrid('getRowData', row.id);
            var isPresentinCom = deletedDocumentsCom.some(document => document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName);
            deletedDocumentsCom = deletedDocumentsCom.filter(document => !(document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName));

            if (isPresentinCom) {
                var obj = {
                    Comments: $(row).find(`textarea`).val(),
                    Department: department,//need to change
                    DocumentName: "",
                    ClaimsId: rowData.ClaimsID
                }
                communicationClaims.push(obj);
            }
            else {
                var obj = {
                    Comments: $(row).find(`textarea`).val(),
                    Department: department,//need to change
                    DocumentName: rowData.DocumentName,
                    ClaimsId: rowData.ClaimsID
                }
                communicationClaims.push(obj);
            }
        }
    });

    var claimsheaders = [];
    claimsheaders.push({
        ProjectNumber: $('#ProjectNo').val(),
        ProductName: $('#ProductName').val(),
        HGLApprovalNumber: $('#HGLApprovalNumber').val(),
        VersionNo: 1,
        StatusId: 3,
    });

    $('#SaveModal').modal('show');
    $('#claimsSaveOk').off("click").click(function () {
        var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

        //var ExcelFileName = "";
        //var files = $('#CFTreviewexcelupload').prop("files");

        //var formData = new FormData();
        //if (files.length > 0) {
        //    formData.append("file", files[0]);
        //    $.ajax({
        //        type: 'POST',
        //        url: ROOT + "ClaimsGrid/SaveSupportingDocument",
        //        async: false,
        //        data: formData,
        //        cache: false,
        //        contentType: false,
        //        processData: false,
        //        success: function (data) {
        //            ExcelFileName = data.replace(/"/g, '');;
        //        }
        //    });
        //}

        //var IRAExceldoc = [];
        //IRAExceldoc.push({
        //    DocumentName: ExcelFileName,
        //    DepartmentName: department,
        //});


        if (onPackClaims.length > 0) {
            for (let i = 0; i < onPackClaims.length; i++) {
                let files = $(`#packClaimsDoc${onPackClaims[i].ClaimsId}`).prop("files");
                if (files != undefined && files?.length > 0) {
                    let formData = new FormData();
                    formData.append("file", files[0]);
                    $.ajax({
                        type: 'POST',
                        url: ROOT + "ClaimsGrid/SaveClaimsDocument",
                        async: false,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            onPackClaims[i].DocumentName = data;
                        }
                    });
                }
            }
        }
        if (communicationClaims.length > 0) {
            for (let i = 0; i < communicationClaims.length; i++) {
                let files = $(`#communicationClaimsDoc${communicationClaims[i].ClaimsId}`).prop("files");
                if (files != undefined && files.length > 0) {
                    let formData = new FormData();
                    formData.append("file", files[0]);
                    $.ajax({
                        type: 'POST',
                        url: ROOT + "ClaimsGrid/SaveClaimsDocument",
                        async: false,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            communicationClaims[i].DocumentName = data;
                        }
                    });
                }

            }
        }
        $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
        $("#OnPackClaimsRemarks").val(JSON.stringify(onPackClaims));
        $("#CommunicationClaimsRemarks").val(JSON.stringify(communicationClaims));
        //$('#SupportingDoc').val(fileName);
        $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
        $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
        $('#Stage').val(3)
        //$("#IRAExcelDocument").val(JSON.stringify(IRAExceldoc));
        $("#IRAExcelDocument").val(JSON.stringify(CFTUploadedDocumentarr));
        $('#DeletedCFTUploadedDocument').val(JSON.stringify(deleteCFTUploadedDoc));

        $('#EditClaims').submit();
        $('#claimsSaveOk').prop("disabled", true);
    })

});

const dataSlickIndex = {
    info: 0,
    ads: 1,
    placement: 2,
    schedule: 3,
    review: 4,
    upload: 5,
}
//CFT Review - Send To DGS
$('.SendToDSG').off("click").click(function () {

    $('#SendToDSGApproval').prop("disabled", false);
    var onPackClaims = [];
    $('#cft_review_pack_claims').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_claims").jqGrid('getRowData', row.id);
            var isPresent = deletedDocuments.some(document => document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName);
            deletedDocuments = deletedDocuments.filter(document => !(document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName));

            if (isPresent) {
                var obj = {
                    Comments: $(row).find(`textarea`).val(),
                    Department: department,
                    DocumentName: "",
                    ClaimsId: rowData.ClaimsID
                }
                onPackClaims.push(obj);
            }
            else {
                var obj = {
                    Comments: $(row).find(`textarea`).val(),
                    Department: department,
                    DocumentName: rowData.DocumentName,
                    ClaimsId: rowData.ClaimsID
                }
                onPackClaims.push(obj);
            }
        }
    });
    var onPackClaimschecking = [];
    $('#cft_review_pack_claims').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_claims").jqGrid('getRowData', row.id);
            var obj = {
                Comments: $(row).find(`textarea`).val(),
                Department: department,
                DocumentName: rowData.DocumentName ? rowData.DocumentName : $(row).find(`input[type="file"]`).val(),
                ClaimsId: rowData.ClaimsID,
                ResponsibleDepartment: rowData.ResponsibleDepartment
            }
            onPackClaimschecking.push(obj);
        }
    });

    var communicationClaims = []
    $('#cft_review_pack_communication').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_communication").jqGrid('getRowData', row.id);
            var isPresentinCom = deletedDocumentsCom.some(document => document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName);
            deletedDocumentsCom = deletedDocumentsCom.filter(document => !(document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName));
            if (isPresentinCom) {
                var obj = {
                    Comments: $(row).find(`textarea`).val(),
                    Department: department,
                    DocumentName: '',
                    ClaimsId: rowData.ClaimsID
                }
                communicationClaims.push(obj);
            }
            else {
                var obj = {
                    Comments: $(row).find(`textarea`).val(),
                    Department: department,
                    DocumentName: rowData.DocumentName,
                    ClaimsId: rowData.ClaimsID
                }
                communicationClaims.push(obj);
            }
        }
    });
    var communicationClaimschecking = []
    $('#cft_review_pack_communication').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_communication").jqGrid('getRowData', row.id);
            var obj = {
                Comments: $(row).find(`textarea`).val(),
                Department: department,
                DocumentName: rowData.DocumentName ? rowData.DocumentName : $(row).find(`input[type="file"]`).val(),
                ClaimsId: rowData.ClaimsID,
                ResponsibleDepartment: rowData.ResponsibleDepartment
            }
            communicationClaimschecking.push(obj);
        }
    });
    let isOnpackClaimsFilled = false;
    let isCommunicationClaimsFilled = false;

    if (department != depatmentBasedOnHub) {
        onPackClaimschecking.map(packClaim => {
            let className = "onpack" + packClaim.ClaimsId;
            let RemarksIdName = "onpack" + packClaim.ClaimsId;
            if (packClaim.ResponsibleDepartment.includes(department) && (!packClaim.Comments || packClaim.Comments && packClaim.Comments.trim() == "")) {
                $(`.${className}`).addClass("claims_border-error");
                $(`#${RemarksIdName}`).show();
            } else {
                $(`.${className}`).removeClass("claims_border-error");
                $(`#${RemarksIdName}`).hide();
            }
        });
        communicationClaimschecking.map(communicationClaim => {
            let className = "communication" + communicationClaim.ClaimsId;
            let RemarksIdName = "communication" + communicationClaim.ClaimsId;

            //if (communicationClaim.ResponsibleDepartment.includes(department) && (!communicationClaim.Comments || communicationClaim.Comments && communicationClaim.Comments.trim() == "")) {
            //    $(`.${className}`).addClass("claims_border-error");
            //    $(`#${RemarksIdName}`).show();
            //} else {
            //    $(`.${className}`).removeClass("claims_border-error");
            //    $(`#${RemarksIdName}`).hide();
            //}
        });

        isOnpackClaimsFilled = onPackClaimschecking.some(packClaim => {

            console.log(packClaim, 'packClaims');
            return packClaim.ResponsibleDepartment.includes(department) && (!packClaim.Comments || packClaim.Comments && packClaim.Comments.trim() == "");
        });
        // isCommunicationClaimsFilled = communicationClaimschecking.some(communicationClaim => communicationClaim.ResponsibleDepartment.includes(department) && (!communicationClaim.Comments || communicationClaim.Comments && communicationClaim.Comments.trim() == ""));

    } else {
        onPackClaimschecking.map(packClaim => {
            let className = "onpack" + packClaim.ClaimsId;
            let RemarksIdName = "onpack" + packClaim.ClaimsId;
            let DocumentIdName = "onpack_doc" + packClaim.ClaimsId;
            if (!packClaim.Comments || packClaim.Comments && packClaim.Comments.trim() == "") {
                $(`.${className}`).addClass("claims_border-error");
                $(`#${RemarksIdName}`).show();
            } else {
                $(`.${className}`).removeClass("claims_border-error");
                $(`#${RemarksIdName}`).hide();
            }
            //if (!packClaim.DocumentName || packClaim.DocumentName && packClaim.DocumentName.trim() == "") {
            //    $(`#${DocumentIdName}`).show();
            //} else {
            //    $(`#${DocumentIdName}`).hide();
            //}
        });
        //communicationClaimschecking.map(communicationClaim => {
        //    let className = "communication" + communicationClaim.ClaimsId;
        //    let RemarksIdName = "communication" + communicationClaim.ClaimsId;
        //    let DocumentIdName = "communication_doc" + communicationClaim.ClaimsId;
        //    if (!communicationClaim.Comments || communicationClaim.Comments && communicationClaim.Comments.trim() == "") {
        //        $(`.${className}`).addClass("claims_border-error");
        //        $(`#${RemarksIdName}`).show();
        //    } else {
        //        $(`.${className}`).removeClass("claims_border-error");
        //        $(`#${RemarksIdName}`).hide();
        //    }
        //    //if (!communicationClaim.DocumentName || communicationClaim.DocumentName && communicationClaim.DocumentName.trim() == "") {
        //    //    $(`#${DocumentIdName}`).show();
        //    //} else {
        //    //    $(`#${DocumentIdName}`).hide();
        //    //}
        //});
        //claims condition to make document and comments manditory
        //isOnpackClaimsFilled = onPackClaimschecking.some(packClaim => !packClaim.Comments || packClaim.Comments && packClaim.Comments.trim() == "" || !packClaim.DocumentName || packClaim.DocumentName && packClaim.DocumentName.trim() == "");
        //isCommunicationClaimsFilled = communicationClaimschecking.some(communicationClaim => !communicationClaim.Comments || communicationClaim.Comments && communicationClaim.Comments.trim() == "" || !communicationClaim.DocumentName || communicationClaim.DocumentName && communicationClaim.DocumentName.trim() == "");
        isOnpackClaimsFilled = onPackClaimschecking.some(packClaim => !packClaim.Comments || packClaim.Comments && packClaim.Comments.trim() == "");
        //   isCommunicationClaimsFilled = communicationClaimschecking.some(communicationClaim => !communicationClaim.Comments || communicationClaim.Comments && communicationClaim.Comments.trim() == "");
    }

    if (isOnpackClaimsFilled) {
        $("#packCommentsIsFill").show()
    } else {
        $("#packCommentsIsFill").hide()
    }
    //if (isCommunicationClaimsFilled) {
    //    $("#communicationCommentsIsFill").show();
    //} else {
    //    $("#communicationCommentsIsFill").hide();
    //}

    let tabsArray = []
    $("#form_project_details").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("info");
            return;
        }
    }); $("form#form_product_description").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("placement");
            return;
        }
    });
    if (isOnpackClaimsFilled) {
        tabsArray.push("schedule");
    }
    if (isCommunicationClaimsFilled) {
        tabsArray.push("review");
    }
    let tabsIds = Object.keys(dataSlickIndex);
    tabsArray.map((ele, index) => {
        let index1 = tabsIds.indexOf(ele);
        if (index1 != -1) {
            tabsIds.splice(index1, 1)
        }
    });
    tabsArray.map(ele => {
        $(`li[data-slick-index=${dataSlickIndex[ele]}]`).find('a').css("background-color", "red")
    });
    tabsIds.map(ele => {
        $(`li[data-slick-index=${dataSlickIndex[ele]}]`).find('a').removeAttr("style");
    })
    if (tabsArray.length > 0)
        $(`[data-attr="${tabsArray[0]}"]`).trigger('click');
    if (isOnpackClaimsFilled || isCommunicationClaimsFilled) {
        return;
    }
    var claimsheaders = [];
    claimsheaders.push({
        ID: claimsData ? claimsData.ClaimsHeadersList[0].ID : 0,
        ProjectNumber: $('#ProjectNo').val(),
        ProductName: $('#ProductName').val(),
        HGLApprovalNumber: $('#HGLApprovalNumber').val(),
        VersionNo: 1,
        StatusId: 4,
    });
    $('#CFT_Remarks_Modal').modal('show');

    $('#SendToDSGApproval').off("click").click(function () {
        if ($("#DSG_remarks_text1").val().trim() == "") {
            $("#Error_DSG_remarks_text1").show();
            return;
        } else {
            $("#Error_DSG_remarks_text1").hide();
        }
        //var fileName = "";
        //var files = $('#supportingDocument').prop("files");

        //var formData = new FormData();
        //if (files.length > 0) {
        //    formData.append("file", files[0]);
        //    $.ajax({
        //        type: 'POST',
        //        url: ROOT + "ClaimsGrid/SaveSupportingDocument",
        //        async: false,
        //        data: formData,
        //        cache: false,
        //        contentType: false,
        //        processData: false,
        //        success: function (data) {
        //            fileName = data;
        //        }
        //    });
        //}

        //var formData = new FormData();
        //if (files.length > 0) {
        //    formData.append("file", files[0]);
        //    $.ajax({
        //        type: 'POST',
        //        url: ROOT + "ClaimsGrid/SaveSupportingDocument",
        //        async: false,
        //        data: formData,
        //        cache: false,
        //        contentType: false,
        //        processData: false,
        //        success: function (data) {
        //        fileName = data;
        //        }
        //    });
        //}
        var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

        if (onPackClaims.length > 0) {
            for (let i = 0; i < onPackClaims.length; i++) {
                let files = $(`#packClaimsDoc${onPackClaims[i].ClaimsId}`).prop("files");
                if (files != undefined && files?.length > 0) {
                    let formData = new FormData();
                    formData.append("file", files[0]);
                    $.ajax({
                        type: 'POST',
                        url: ROOT + "ClaimsGrid/SaveClaimsDocument",
                        async: false,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            onPackClaims[i].DocumentName = data;
                        }
                    });
                }
            }
        }
        if (communicationClaims.length > 0) {
            for (let i = 0; i < communicationClaims.length; i++) {
                let files = $(`#communicationClaimsDoc${communicationClaims[i].ClaimsId}`).prop("files");
                if (files != undefined && files.length > 0) {
                    let formData = new FormData();
                    formData.append("file", files[0]);
                    $.ajax({
                        type: 'POST',
                        url: ROOT + "ClaimsGrid/SaveClaimsDocument",
                        async: false,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            communicationClaims[i].DocumentName = data;
                        }
                    });
                }

            }
        }
        //need to write condition to send to next stage.
        //i need to check all required department user enter all comments or not if all department
        //user enter all comments or not if all department user entered all comments then we can
        //increase the toStage count as 4;
        // first we need to go with each and every row and and all department users entered comments or not

        var ApprovalStatus = {
            FromStage: 3,
            ToStage: 3,
            Remarks: $("#DSG_remarks_text1").val()
        };
        $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
        //$("#OnPackClaims").val(onPackClaims);
        //$("#CommunicationClaimsData").val(communicationClaims);
        /*$('#SupportingDoc').val(fileName);*/
        $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
        $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
        $('#ApprovalStatus').val(JSON.stringify(ApprovalStatus));
        $('#Stage').val(3);
        $("#GridId").val(GridId);
        $('#OnPackClaimsRemarks').val(JSON.stringify(onPackClaims));
        $('#CommunicationClaimsRemarks').val(JSON.stringify(communicationClaims));
        $("#IRAExcelDocument").val(JSON.stringify(CFTUploadedDocumentarr));
        $('#DeletedCFTUploadedDocument').val(JSON.stringify(deleteCFTUploadedDoc));

        $('#EditClaims').submit();
        $('#SendToDSGApproval').prop("disabled", true);
    })

});

$("#Department").change(function () {

    var depatmentBasedOnHubwithoutIndia = $.grep(depatmentBasedOnHub, function (value, index) {
        return value.indexOf("RA_INDIA") === -1;
    });
    var DeptIds = $("#Department").val().toString();
    DeptIds = DeptIds + "," + depatmentBasedOnHubwithoutIndia;
    jQuery(document).ajaxStart(function () {
        //$(".preloader").fadeIn();
        $('#loader').css('visibility', 'hidden');
    });
    jQuery(document).ajaxComplete(function () {
        //$(".preloader").fadeOut();
        $('#loader').css('visibility', 'hidden');
    });
    const isTrue = checkUnselectedDefaultValues()
    if (isTrue) {
        $.ajax({
            type: "POST",
            url: ROOT + "ClaimsGrid/GetUserEmailBasedOnDept",
            data: { DeptIds: DeptIds },
            dataType: "json",
            success: function (UserEmailResult) {
                if (UserEmailResult != null) {
                    $("option").remove(".DeptUsersOption");
                    var userEmailList = ''
                    $.each(UserEmailResult, function (i, obj) {

                        userEmailList += '<option class="DeptUsersOption ' + obj.Dept + '" value="' + obj.Email + '">' + obj.Dept + ' - ' + obj.Email + '</option>';

                    })
                    $("#Dept_UsersDropdown").html(userEmailList);

                    $('#Dept_UsersDropdown').multiselect('rebuild');
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }

});


$("#Dept_UsersDropdown").change(function (e) {

    $('#Error_HgmlDataHubUsers1').hide();

    $('.DeptUsersOption').find('input[type=checkbox]').prop("disabled", false);

    var selectList = $('#Dept_UsersDropdown').find('option:selected');

    //$.each(selectList, function (i, obj1) {

    //    var val1 = obj1.value;
    //    var val2 = obj1.className;
    //    $(".DeptUsersOption").each(function (i, obj2) {

    //        if ($(this).attr("class") == obj1.className && $(this).val() != obj1.value) {
    //            $(this).find('input[type=checkbox]').prop("disabled", true);
    //        }
    //    });
    //});
});


$('[data-multiselect2]').multiselect({
    buttonWidth: '100%',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});
function areAllDepartmentsInUniqueLabels(departmentArray, uniqueLabelsArray) {
    // Loop through each department in the departmentArray
    for (let i = 0; i < departmentArray.length; i++) {
        const department = departmentArray[i];

        // Check if the department is not in uniqueLabelsArray
        if (!uniqueLabelsArray.includes(department)) {

            // If a department is not found, return false
            return false;
        }
    }

    // If all departments are found, return true
    return true;
}

$('#CFTUsersAdd').off("click").click(function () {
    var flag = true;
    //$('#Department').val() == "" && $('#Dept_UsersDropdown').val() == "" ? ($('#Err-Department').show(), flag = false) : ""
    //$('#Department').val() == "" && $('#Dept_UsersDropdown').val() != "" ? ($('#Err-Department').show(), flag = false) : ""
    //$('#Department').val() != "" && $('#Dept_UsersDropdown').val() == "" ? ($('#Err-Department').hide(), flag = false) : ""
    $('#Dept_UsersDropdown').val() == "" ? ($('#Error_DeptUsersSelected').show(), flag = false) : ""
    $('#Dept_UsersDropdown').val() != "" ? ($('#Error_DeptUsersSelected').hide(), flag = true) : ""
    var editorRemarks = $("#editor").val();
    if (editorRemarks && editorRemarks.trim()) {
        $("#error_cft_remarks").hide();
    } else {
        $("#error_cft_remarks").show();
        flag = false;
    }
    //$('#Dept_UsersDropdown').val() == "" ? ($('#Error_DeptUsers').show(), flag = false) : $('#Error_DeptUsers').hide();

    var deptSelected = $('#Department').find('option:selected').length;
    var deptUsersSelected = $('#Dept_UsersDropdown').find('option:selected').length;
    var selectedOptions = $("#Dept_UsersDropdown option:selected");
    var departemnts = $('#Department').val();
    if (depatmentBasedOnHub != "") {
        for (var i = 0; i < depatmentBasedOnHub.length; i++) {
            if (depatmentBasedOnHub[i] != "RA_INDIA") {
                departemnts.push(depatmentBasedOnHub[i])
            }
        }
    }
    var selectedOptions = $("#Dept_UsersDropdown option:selected");
    // Initialize an empty Set to store unique labels
    var uniqueLabels = new Set();

    // Loop through the selected options and add their labels to the Set
    selectedOptions.each(function () {
        var label = $(this).text().split('-')[0].trim();
        uniqueLabels.add(label);
    });

    // Convert the Set to an array if needed
    var uniqueLabelsArray = Array.from(uniqueLabels);

    const result = areAllDepartmentsInUniqueLabels(departemnts, uniqueLabelsArray);

    if (deptSelected != 0 && !result) {
        flag = false;
        $('#Error_DeptUsersSelected').show();
    }
    else {
        $('#Error_DeptUsers').hide();
    }
    if (flag) {
        $('#selectedCFTUsers').val($('#Dept_UsersDropdown').val().toString());
        $('#SelectedPMDUsers').val($('#Dept_PMdUsers').val().toString());
        //$('#Department').val("IRA").multiselect('refresh');
        //$('#Dept_UsersDropdown').val("").multiselect('refresh');
        $("#Department").trigger("change");
        $('#Error_DeptUsersSelected').hide();
        $('#Error_DeptUsers').hide();
        $('#Err-Department').hide()
    }

})

$('#SendToCFT').off("click").click(function () {
    validSave = true;

    $('#SaveDetails').prop("disabled", false);
    $('.mandatory').each(function (i, obj) {
        if ($.trim($(this).val()) == "") {
            $(this).parent().find('span').show();
            validSave = false;
        }
    })


    //var CommunicationClaimsGridLength = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'reccount');
    //var OnPackClaimsGridLength = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'reccount');

    packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
    communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

    var CommunicationClaimsGridLength = communicationClaimsDetails.length;
    var OnPackClaimsGridLength = packLabelClaimsDetails.length;

    // CommunicationClaimsGridLength == 0 ? ($('#Err-CommunicationClaimsGrid').show(), validSave = false) : $('#Err-CommunicationClaimsGrid').hide();

    OnPackClaimsGridLength == 0 ? ($('#Err-OnPackGrid').show(), validSave = false) : $('#Err-OnPackGrid').hide();
    let tabsArray = []
    $("#form_project_details").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("info");
            return;
        }
    }); $("form#form_product_description").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (val.length == 0) {
            tabsArray.push("placement");
            return;
        }
    });
    if (OnPackClaimsGridLength == 0) {
        tabsArray.push("schedule");
    }

    //if (CommunicationClaimsGridLength == 0) {
    //    tabsArray.push("review");
    //}
    if ($("#AnchorHUB").val() == "") {
        validSave = false;
        $("#Err-AnchorHUB").show();
        tabsArray.push("placement");
    }

    let tabsIds = Object.keys(dataSlickIndex);
    tabsArray.map((ele, index) => {
        let index1 = tabsIds.indexOf(ele);
        if (index1 != -1) {
            tabsIds.splice(index1, 1)
        }
    });
    tabsArray.map(ele => {
        $(`li[data-slick-index=${dataSlickIndex[ele]}]`).find('a').css("background-color", "red")
    });
    tabsIds.map(ele => {
        $(`li[data-slick-index=${dataSlickIndex[ele]}]`).find('a').removeAttr("style");
    })
    if (tabsArray.length > 0)
        $(`[data-attr="${tabsArray[0]}"]`).trigger('click');

    if (validSave) {
        //var onPackGridData = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'data');
        //var CommunicationClaimsGridData = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'data');
        let onPack = packLabelClaimsDetails.map(ele => {
            if (ele.FromStageNo == 2 && ele.ToStageNo == 2) {
                return { ...ele, ToStageNo: 3 };
            } else {
                return ele;
            }
        })
        let communication = communicationClaimsDetails.map(ele => {
            if (ele.FromStageNo == 2 && ele.ToStageNo == 2) {
                return { ...ele, ToStageNo: 3 };
            } else {
                return ele;
            }
        })
        var onPackGridData = JSON.stringify(onPack);
        var CommunicationClaimsGridData = JSON.stringify(communication);
        //updating Department based on responsible department
        let clonedClaims = JSON.parse(JSON.stringify([...packLabelClaimsDetails, ...communicationClaimsDetails]));
        let responsibleDepartment = clonedClaims.flatMap(claim => claim.ResponsibleDepartment.split(","));
        if (depatmentBasedOnHub != "") {
            for (var i = 0; i < depatmentBasedOnHub.length; i++) {
                var uniqueDepartments = [...new Set([...responsibleDepartment, depatmentBasedOnHub[i]])];
            }
        }
        else {
            var uniqueDepartments = [...new Set([...responsibleDepartment])];

        }
        ActualSelectedDepartments = uniqueDepartments;
        $("#Department").val(uniqueDepartments);
        var depatmentBasedOnHubwithoutIndia = $.grep(depatmentBasedOnHub, function (value, index) {
            return value.indexOf("RA_INDIA") === -1;
        });


        if (depatmentBasedOnHubwithoutIndia != "") {
            for (var i = 0; i < depatmentBasedOnHubwithoutIndia.length; i++) {
                $("#Department option[value=" + depatmentBasedOnHubwithoutIndia[i] + "]").prop("disabled", true);
            }
            $("#Department").val(depatmentBasedOnHubwithoutIndia).multiselect('refresh');
        }
        $("#Department").val(uniqueDepartments).multiselect('refresh');
        $("#Department").trigger("change");
        var claimsheaders = [];
        claimsheaders.push({
            ID: claimsData ? claimsData.ClaimsHeadersList[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            VersionNo: 1,
            StatusId: 3,
        });

        var projectbrief = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
        };

        var projectdetails = {
            ID: claimsData ? claimsData.ClaimsProjectDetails[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            Division: $("#ClaimsDivision").val()
        };

        var productdescription = {
            ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim($("#DirectionForUse").val()),
            Caution: $.trim($("#Caution").val()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };

        $('#SendCFTModal').modal('show');
        $('#SaveDetails').off("click").click(function () {

            var flag = true;
            $('#selectedCFTUsers').val() == "" ? ($('#Error_SelectCFTUser').show(), flag = false) : $('#Error_SelectCFTUser').hide();
            //const emailTextArea = document.getElementById("additionalUsers");
            //const inputText = emailTextArea.value;
            //const emailAddresses = inputText.split(",");
            //const invalidEmails = [];

            //emailAddresses.forEach((email) => {
            //    const trimmedEmail = email.trim();
            //    if (!isValidEmail(trimmedEmail)) {
            //        invalidEmails.push(trimmedEmail);
            //    }
            //});
            //if (invalidEmails.length === 0) {
            //    $("#Error_AddAdditionalUsers").hide()
            //} else {
            //    flag = false;
            //    $("#Error_AddAdditionalUsers").show()
            //    //validationResult.innerHTML = "Invalid email addresses: " + invalidEmails.join(", ");
            //}

            if (flag) {
                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
                //var fileName = "";
                //var files = $('#supportingDocument').prop("files");

                //var formData = new FormData();
                //if (files.length > 0) {
                //    formData.append("file", files[0]);
                //    $.ajax({
                //        type: 'POST',
                //        url: ROOT + "ClaimsGrid/SaveSupportingDocument",
                //        async: false,
                //        data: formData,
                //        cache: false,
                //        contentType: false,
                //        processData: false,
                //        success: function (data) {
                //            fileName = data;
                //        }
                //    });
                //}

                //const selectedUserWithAdditionalDetails = $("#additionalUsers").val().trim() ? $('#selectedCFTUsers').val() + ',' + $("#additionalUsers").val() : $('#selectedCFTUsers').val()
                var DeptDetails = {
                    Remarks: $('#editor').val(),
                    DeptUsers: $('#selectedCFTUsers').val(),
                    Depts: $('#Department').val(),
                    PMDUsers: $('#SelectedPMDUsers').val(),
                }
                var ApprovalStatus = {
                    FromStage: 2,
                    ToStage: 3,
                    Remarks: $('#editor').val(),
                };

                $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
                $("#ProductDescription").val(JSON.stringify(productdescription));
                $("#ProjectDetails").val(JSON.stringify(projectdetails));
                $("#OnPackClaims").val(onPackGridData);
                $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
                // $('#SupportingDoc').val(fileName);
                $('#ApprovalStatus').val(JSON.stringify(ApprovalStatus));
                $('#DeptDetails').val(JSON.stringify(DeptDetails));
                $('#Stage').val(2);
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid))
                $('#ProjectBrief').val(JSON.stringify(projectbrief));
                $('#EditClaims').submit();
                $('#SaveDetails').prop("disabled", true);
            }
        })

    }
});


$(document).ready(function () {
    if (claimsData.ClaimsOnPackDetails) {
        claimsData.ClaimsOnPackDetails = claimsData.ClaimsOnPackDetails.map(ele => {
            if (ele.subOnpackClaims) {
                return { ...ele, subOnpackClaims: ele.subOnpackClaims ? typeof (ele.subOnpackClaims) == 'string' ? JSON.parse(ele.subOnpackClaims) : typeof (ele.subOnpackClaims) == 'object' && ele.subOnpackClaims : "" }
            } else {
                return ele;
            }
        });
    }
    if (claimsData.ClaimsCommunicationDetails) {
        claimsData.ClaimsCommunicationDetails = claimsData.ClaimsCommunicationDetails.map(ele => {
            if (ele.subCommunicationClaims) {
                return { ...ele, subCommunicationClaims: ele.subCommunicationClaims ? typeof (ele.subCommunicationClaims) == 'string' ? JSON.parse(ele.subCommunicationClaims) : typeof (ele.subCommunicationClaims) == 'object' && ele.subCommunicationClaims : "" }
            } else {
                return ele;
            }
        });
    }

    packLabelClaimsDetails = claimsData.ClaimsOnPackDetails;
    communicationClaimsDetails = claimsData.ClaimsCommunicationDetails;
    if (Stage < 3) {
        //version1
        //updateClaimsUi(packLabelClaimsDetails);
        //updateCommunicationClaimsUi(communicationClaimsDetails);
        //version2
        updateClaimsUi2(packLabelClaimsDetails);
        updateCommunicationClaimsUi2(communicationClaimsDetails);
    }
    if (Stage >= 4) {
        onPackClaimsWithRemarks = JSON.parse(claimsData.OnPackClaimsWithRemarks);
        if (onPackClaimsWithRemarks) {
            onPackClaimsWithRemarks = onPackClaimsWithRemarks.map(ele => {
                if (ele.subOnpackClaims) {
                    return { ...ele, subOnpackClaims: ele.subOnpackClaims ? typeof (ele.subOnpackClaims) == 'string' ? JSON.parse(ele.subOnpackClaims) : typeof (ele.subOnpackClaims) == 'object' && ele.subOnpackClaims : "" }
                } else {
                    return ele;
                }
            })
        }
        communicationClaimsWithRemarks = JSON.parse(claimsData.CommunicationClaimsWithRemarks);
        if (communicationClaimsWithRemarks) {
            communicationClaimsWithRemarks = communicationClaimsWithRemarks.map(ele => {
                if (ele.subCommunicationClaims) {
                    return { ...ele, subCommunicationClaims: ele.subCommunicationClaims ? typeof (ele.subCommunicationClaims) == 'string' ? JSON.parse(ele.subCommunicationClaims) : typeof (ele.subCommunicationClaims) == 'object' && ele.subCommunicationClaims : "" }
                } else {
                    return ele;
                }
            })
        }
        if (onPackClaimsWithRemarks.length > 0) {
            var mergedOutput = onPackClaimsWithRemarks.reduce((result, obj) => {
                const existingObj = result.find(
                    item => item.GridId === obj.GridId && item.ClaimsId === obj.ClaimsId
                );

                if (existingObj) {
                    for (const key in obj) {
                        if (obj[key] !== null) {
                            existingObj[key] = obj[key];
                        }
                    }
                } else {
                    result.push({ ...obj });
                }

                return result;
            }, []);
        }
        if (mergedOutput && mergedOutput.length > 0) {
            onPackClaimsWithRemarks = mergedOutput;
        }
        if (communicationClaimsWithRemarks.length > 0) {
            var mergedOutput1 = communicationClaimsWithRemarks.reduce((result, obj) => {
                const existingObj = result.find(
                    item => item.GridId === obj.GridId && item.ClaimsId === obj.ClaimsId
                );

                if (existingObj) {
                    for (const key in obj) {
                        if (obj[key] !== null) {
                            existingObj[key] = obj[key];
                        }
                    }
                } else {
                    result.push({ ...obj });
                }

                return result;
            }, []);
        }
        if (mergedOutput1 && mergedOutput1.length > 0) {
            communicationClaimsWithRemarks = mergedOutput1;
        }
        //version1
        //updateOnPackClaimWithRemarksUI(onPackClaimsWithRemarks);
        //updateCommunicationClaimsWithRemarksUI(communicationClaimsWithRemarks);
        //version 2
        updateOnPackClaimWithRemarksUI2(onPackClaimsWithRemarks);
        updateCommunicationClaimsWithRemarksUI2(communicationClaimsWithRemarks);
    }
})

//pack label claims
$('#OnPackDataAdd').off("click").click(function () {

    if ($("#AnchorHUB").val() != "") {
        let measuredByContent = CKEDITOR.instances["MeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let SupportingStmt = CKEDITOR.instances["SupportingStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let isValidInform = true;
        let isresponsibleDepartment = (Array.isArray($("#ResponsibleDeptOnPack").val()) == true && $("#ResponsibleDeptOnPack").val().length == 0 || $("#ResponsibleDeptOnPack").val() == "")
        if ($("#Claims").val() == "" || $("#FeasibilityClaims").val() == "" || $("#FeasibilityClaims").val() == null || measuredByContent == "" || SupportingStmt == "" || isresponsibleDepartment || $("#ResponsibleDeptOnPack").val()) {
            $("#Claims").val() == "" ? ($('#Err-Claims').show(), isValidInform = false) : $('#Err-Claims').hide();
            ($("#FeasibilityClaims").val() == "" || $("#FeasibilityClaims").val() == null) ? ($('#Err-FeasibilityClaims').show(), isValidInform = false) : $('#Err-FeasibilityClaims').hide();
            measuredByContent == "" ? ($('#Err-MeasuredBy').show(), isValidInform = false) : $('#Err-MeasuredBy').hide();
            SupportingStmt == "" ? ($('#Err-SupportingStmt').show(), isValidInform = false) : $('#Err-SupportingStmt').hide();
            if (depatmentBasedOnHub == "") {
                (Array.isArray($("#ResponsibleDeptOnPack").val()) == true && $("#ResponsibleDeptOnPack").val().length == 0 || $("#ResponsibleDeptOnPack").val() == "") ? ($('#Err-ResponsibleDeptOnPack').show(), isValidInform = false) : $('#Err-ResponsibleDeptOnPack').hide();
            }//$("#OnPackRemarks").val() == "" ? ($('#Err-OnPackRemarks').show(), isValidInform = false) : $('#Err-OnPackRemarks').hide();
            else if (depatmentBasedOnHub.length == 1 && depatmentBasedOnHub.includes("RA_INDIA")) {
                (Array.isArray($("#ResponsibleDeptOnPack").val()) == true && $("#ResponsibleDeptOnPack").val().length == 0 || $("#ResponsibleDeptOnPack").val() == "") ? ($('#Err-ResponsibleDeptOnPack').show(), isValidInform = false) : $('#Err-ResponsibleDeptOnPack').hide();
            }
        }
        if (isValidInform) {
            if (isPackLabelClaimsEdit) {
                onpackModelClaims.splice(0, 1, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) })
            } else {
                onpackModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) })
            }

            var dept = "";
            var depatmentBasedOnHubwithoutIndia = $.grep(depatmentBasedOnHub, function (value, index) {
                return value.indexOf("RA_INDIA") === -1;
            });

            if ($("#ResponsibleDeptOnPack").val() == "") {
                dept = depatmentBasedOnHubwithoutIndia
            }
            else {
                if (depatmentBasedOnHubwithoutIndia != "") {
                    dept = "," + depatmentBasedOnHubwithoutIndia
                }
                else {
                    dept = depatmentBasedOnHubwithoutIndia
                }
            }

            let packLabelClaimsItem = {
                Claims: $.trim($("#Claims").val()),
                Feasibility: $.trim($("#FeasibilityClaims").val()),
                SupportingStmt: $.trim(CKEDITOR.instances["SupportingStmt"].getData()),
                MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()),
                OnPackRemarks: $.trim($("#OnPackRemarks").val()),
                ResponsibleDepartment: $("#ResponsibleDeptOnPack").val().toString() + dept,
                subOnpackClaims: onpackModelClaims
            }

            if (isPackLabelClaimsEdit) {
                packLabelClaimsItem.FromStageNo = packLabelClaimsDetails[packLabelClaimsEditIndex].FromStageNo;
                packLabelClaimsItem.ToStageNo = packLabelClaimsDetails[packLabelClaimsEditIndex].ToStageNo;
                isPackLabelClaimsEdit = false;
                packLabelClaimsDetails.splice(packLabelClaimsEditIndex, 1, packLabelClaimsItem);
            } else {
                packLabelClaimsItem.FromStageNo = Stage;
                packLabelClaimsItem.ToStageNo = Stage;
                packLabelClaimsDetails.push(packLabelClaimsItem)
            }
            //version1
            //updateClaimsUi(packLabelClaimsDetails);
            //version2


            packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);

            updateClaimsUi2(packLabelClaimsDetails);
        }
    }
    else {
        alert("Please select the Anchor Hub in Product Description");
    }
})
$("#open_onpack_modal").off("click").click(function () {
    $("#add_onpack_support_measuredby").trigger("click");
    var $tableRows = $("#onpack_claims_modal_table tbody tr");
    var maxDataAttribute = 0;
    $tableRows.each(function () {
        var dataRowNumber = parseInt($(this).data("rownumber"));
        if (!isNaN(dataRowNumber) && dataRowNumber > maxDataAttribute) {
            maxDataAttribute = dataRowNumber;
        }
    });
    $('#Error_multipleEditors_' + maxDataAttribute + '').hide();
    $('#Error_multipleMeasuredEditors_' + maxDataAttribute + '').hide();
    $("#onpackclaims_modal").modal("show");
})

$("#add_onpack_support_measuredby, #onpack_claims_modal_save").on("click", function () {
    var allRowsFilled = true;
    var clickedElementId = $(this).attr("id");
    // Check if all previous rows' textareas are filled
    $('#onpack_claims_modal_table textarea[name="textarea1"]').each(function () {
        var $tableRows = $("#onpack_claims_modal_table tbody tr");
        var maxDataAttribute = 0;
        $tableRows.each(function () {
            var dataRowNumber = parseInt($(this).data("rownumber"));
            if (!isNaN(dataRowNumber) && dataRowNumber > maxDataAttribute) {
                maxDataAttribute = dataRowNumber;
            }
        });
        var rownumber = maxDataAttribute;
        let textarea1Value = CKEDITOR.instances['multipleEditors_' + rownumber + ''].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();

        if (textarea1Value.trim() === '') {
            $('#Error_multipleEditors_' + rownumber + '').show();
            allRowsFilled = false;
        } else {
            $('#Error_multipleEditors_' + rownumber + '').hide()
        }
        let textarea2Value = CKEDITOR.instances['multipleMeasuredEditors_' + rownumber + ''].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();

        if (textarea2Value.trim() === '') {
            $('#Error_multipleMeasuredEditors_' + rownumber + '').show();
            allRowsFilled = false;
        } else {
            $('#Error_multipleMeasuredEditors_' + rownumber + '').hide()
        }
    });

    var $tableRows = $("#onpack_claims_modal_table tbody tr");
    var maxDataAttribute = 0;

    $tableRows.each(function () {
        var dataRowNumber = parseInt($(this).data("rownumber"));
        if (!isNaN(dataRowNumber) && dataRowNumber > maxDataAttribute) {
            maxDataAttribute = dataRowNumber;
        }
    });
    var rownumber = maxDataAttribute + 1;

    if (allRowsFilled && clickedElementId === "add_onpack_support_measuredby") {
        var addRow = '<tr data-rownumber=' + rownumber + '>' +
            '<td class="paddingRight"><textarea name="textarea1" rows = "2" cols = "50" id="multipleEditors_' + rownumber + '" class="form-control form-control-sm  mt-2" ></textarea > <span style="color:red; display:none" id="Error_multipleEditors_' + rownumber + '">Please Enter Support Statements</span></td>' +
            '<td class="paddingLeft"><textarea name="textarea2" rows="2" cols="50" id="multipleMeasuredEditors_' + rownumber + '" class="form-control form-control-sm  mt-2"></textarea><span style="color:red; display:none" id="Error_multipleMeasuredEditors_' + rownumber + '">Please Enter Measured by</span></td>' +
            '<td type="button" title="Delete" onclick=deleteOnPackData(' + rownumber + ') class="Button_Delete mt-2 ml-3 pt-1"><i class="flaticon-delete color-danger" style="font-size:medium"></i></td>' +
            '</tr>';
        $("#onpack_claims_modal_table tbody").append(addRow);
    }
    CKEDITOR.replace('multipleEditors_' + rownumber + '', {
        height: 50,
        width: 280,
        toolbarGroups: [
            {
                "name": "paragraph",
                "groups": ["list", "blocks"]
            },
            {
                "name": "basicstyles",
                "groups": ["basicstyles"]
            }
        ],
    });
    CKEDITOR.replace('multipleMeasuredEditors_' + rownumber + '', {
        height: 50,
        width: 280,
        toolbarGroups: [
            {
                "name": "paragraph",
                "groups": ["list", "blocks"]
            },
            {
                "name": "basicstyles",
                "groups": ["basicstyles"]
            }
        ],
    });

    if (clickedElementId === "onpack_claims_modal_save" && allRowsFilled) {
        var dataArray = [];
        var $tableRows = $("#onpack_claims_modal_table tbody tr");
        var maxDataAttribute = 0;
        $tableRows.each(function () {
            var dataRowNumber = parseInt($(this).data("rownumber"));
            if (!isNaN(dataRowNumber) && dataRowNumber > maxDataAttribute) {
                maxDataAttribute = dataRowNumber;
            }
            var rownumber = maxDataAttribute;
            var rowData = {
                SupportingStatement: CKEDITOR.instances['multipleEditors_' + rownumber + ''].getData(),
                MeasuredBy: CKEDITOR.instances['multipleMeasuredEditors_' + rownumber + ''].getData()
            };

            // Push the rowData object into the dataArray
            dataArray.push(rowData);
        });

        onpackModelClaims = dataArray;
        if (isPackLabelClaimsEdit) {
            onpackModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), measuredby: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) })
        }
        $("#onpackclaims_modal").modal("hide");
    }
});
$("#open_communication_modal").off("click").click(function () {
    $("#add_communication_support_measuredby").trigger("click");
    var $tableRows = $("#communication_claims_modal_table tbody tr");
    var maxDataAttribute = 0;
    $tableRows.each(function () {
        var dataRowNumber = parseInt($(this).data("rownumber"));
        if (!isNaN(dataRowNumber) && dataRowNumber > maxDataAttribute) {
            maxDataAttribute = dataRowNumber;
        }
    });
    $('#Error_communication_multipleEditors_' + maxDataAttribute + '').hide();
    $('#Error_communication_multipleMeasuredEditors_' + maxDataAttribute + '').hide();
    $("#communicationclaims_modal").modal("show");
})
$("#add_communication_support_measuredby, #communication_claims_modal_save").on("click", function () {
    var allRowsFilled = true;
    var clickedElementId = $(this).attr("id");
    // Check if all previous rows' textareas are filled
    $('#communication_claims_modal_table textarea[name="textarea1"]').each(function () {
        var $tableRows = $("#communication_claims_modal_table tbody tr");
        var maxDataAttribute = 0;
        $tableRows.each(function () {
            var dataRowNumber = parseInt($(this).data("rownumber"));
            if (!isNaN(dataRowNumber) && dataRowNumber > maxDataAttribute) {
                maxDataAttribute = dataRowNumber;
            }
        });

        var rownumber = maxDataAttribute;
        let textarea1Value = CKEDITOR.instances['communication_multipleEditors_' + rownumber + ''].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        if (textarea1Value.trim() === '') {
            $('#Error_communication_multipleEditors_' + rownumber + '').show();
            allRowsFilled = false;
        } else {
            $('#Error_communication_multipleEditors_' + rownumber + '').hide()
        }

        let textarea2Value = CKEDITOR.instances['communication_multipleMeasuredEditors_' + rownumber + ''].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();

        if (textarea2Value.trim() === '') {
            $('#Error_communication_multipleMeasuredEditors_' + rownumber + '').show();
            allRowsFilled = false;
        } else {
            $('#Error_communication_multipleMeasuredEditors_' + rownumber + '').hide()
        }
    });
    // If all previous rows are filled, add a new row
    var $tableRows = $("#communication_claims_modal_table tbody tr");
    var maxDataAttribute1 = 0;

    $tableRows.each(function () {
        var dataRowNumber = parseInt($(this).data("rownumber"));
        if (!isNaN(dataRowNumber) && dataRowNumber > maxDataAttribute1) {
            maxDataAttribute1 = dataRowNumber;
        }
    });
    var rownumber = maxDataAttribute1 + 1;

    if (allRowsFilled && clickedElementId === "add_communication_support_measuredby") {
        var addRow = '<tr data-rownumber=' + rownumber + '>' +
            '<td class="paddingRight"><textarea name="textarea1" rows = "2" cols = "50" id="communication_multipleEditors_' + rownumber + '" class="form-control form-control-sm  mt-2" ></textarea > <span style="color:red; display:none" id="Error_communication_multipleEditors_' + rownumber + '">Please Enter Support Statements</span></td>' +
            '<td class="paddingLeft"><textarea name="textarea2" rows="2" cols="50" id="communication_multipleMeasuredEditors_' + rownumber + '" class="form-control form-control-sm  mt-2"></textarea><span style="color:red; display:none" id="Error_communication_multipleMeasuredEditors_' + rownumber + '">Please Enter Measured by</span></td>' +
            '<td type="button" title="Delete" onclick=deleteCommunicationData(' + rownumber + ') class="mt-2 ml-3 pt-1"><i class="flaticon-delete color-danger" style="font-size:medium"></i></td>' +
            '</tr>';
        $("#communication_claims_modal_table tbody").append(addRow);
    }
    CKEDITOR.replace('communication_multipleEditors_' + rownumber + '', {
        height: 50,
        width: 280,
        toolbarGroups: [
            {
                "name": "paragraph",
                "groups": ["list", "blocks"]
            },
            {
                "name": "basicstyles",
                "groups": ["basicstyles"]
            }
        ],
    });
    CKEDITOR.replace('communication_multipleMeasuredEditors_' + rownumber + '', {
        height: 50,
        width: 280,
        toolbarGroups: [
            {
                "name": "paragraph",
                "groups": ["list", "blocks"]
            },
            {
                "name": "basicstyles",
                "groups": ["basicstyles"]
            }
        ],
    });


    if (clickedElementId === "communication_claims_modal_save" && allRowsFilled) {
        var dataArray = [];
        var $tableRows = $("#communication_claims_modal_table tbody tr");
        var maxDataAttribute = 0;
        $tableRows.each(function () {
            var dataRowNumber = parseInt($(this).data("rownumber"));
            if (!isNaN(dataRowNumber) && dataRowNumber > maxDataAttribute) {
                maxDataAttribute = dataRowNumber;
            }
            var rownumber = maxDataAttribute;

            // Initialize an object for the current row's values
            var rowData = {
                SupportingStatement: CKEDITOR.instances['communication_multipleEditors_' + rownumber + ''].getData(),
                MeasuredBy: CKEDITOR.instances['communication_multipleMeasuredEditors_' + rownumber + ''].getData()
            };

            // Push the rowData object into the dataArray
            dataArray.push(rowData);
        });

        communicationModelClaims = dataArray;
        if (isCommunicationClaimsEdit) {
            communicationModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) })
        }
        $("#communicationclaims_modal").modal("hide");
    }
});
function updateOnpackClaimsModalWhileEdit(itemArray) {
    $("#onpack_claims_modal_table tbody").empty();
    for (let i = 0; i < itemArray.length; i++) {
        if (i !== 0) {
            var addRow = ''
            addRow += '<tr data-rownumber=' + i + '>' +
                '<td class="paddingRight"><textarea name="textarea1" rows = "2" id="multipleEditors_' + i + '" cols = "50" class="form-control form-control-sm  mt-2" >' + itemArray[i].SupportingStatement + '</textarea > <span style="color:red; display:none" id="Error_multipleEditors_' + i + '">Please Enter Support Statements</span></td>' +
                '<td class="paddingLeft"><textarea name="textarea2" rows="2" id="multipleMeasuredEditors_' + i + '" cols="50" class="form-control form-control-sm  mt-2">' + itemArray[i].MeasuredBy + '</textarea><span style="color:red; display:none"id="Error_multipleMeasuredEditors_' + i + '">Please Enter Measured by</span></td>' +
                '<td type="button" title="Delete" onclick=deleteOnPackData(' + i + ') class="Button_Delete mt-2 ml-3 pt-1"><i class="flaticon-delete color-danger" style="font-size:medium"></i></td>' +
                '</tr>';

            $('#onpack_claims_modal_table tbody').append(addRow);
            CKEDITOR.replace('multipleEditors_' + i + '', {
                height: 50,
                width: 280,
                toolbarGroups: [
                    {
                        "name": "paragraph",
                        "groups": ["list", "blocks"]
                    },
                    {
                        "name": "basicstyles",
                        "groups": ["basicstyles"]
                    }
                ],
            });
            CKEDITOR.replace('multipleMeasuredEditors_' + i + '', {
                height: 50,
                width: 280,
                toolbarGroups: [
                    {
                        "name": "paragraph",
                        "groups": ["list", "blocks"]
                    },
                    {
                        "name": "basicstyles",
                        "groups": ["basicstyles"]
                    }
                ],
            });

        }
    }
}
function updateCommunicationClaimsModalWhileEdit(itemArray) {
    $("#communication_claims_modal_table tbody").empty();
    for (let i = 0; i < itemArray.length; i++) {
        if (i !== 0) {
            var addRow = ''
            addRow += '<tr data-rownumber=' + i + '>' +
                '<td class="paddingRight"><textarea name="textarea1" rows = "2" cols = "50" class="form-control form-control-sm  mt-2"  id="communication_multipleEditors_' + i + '" >' + itemArray[i].SupportingStatement + '</textarea > <span style="color:red; display:none" id="Error_communication_multipleEditors_' + i + '">Please Enter Support Statements</span></td>' +
                '<td class="paddingLeft"><textarea name="textarea2" rows="2" cols="50" class="form-control form-control-sm  mt-2"  id="communication_multipleMeasuredEditors_' + i + '">' + itemArray[i].MeasuredBy + '</textarea><span style="color:red; display:none" id="Error_communication_multipleMeasuredEditors_' + i + '">Please Enter Measured by</span></td>' +
                '<td type="button" title="Delete" onclick=deleteCommunicationData(' + i + ') class="mt-2 ml-3 pt-1"><i class="flaticon-delete color-danger" style="font-size:medium"></i></td>' +
                '</tr>';

            $('#communication_claims_modal_table tbody').append(addRow);

            CKEDITOR.replace('communication_multipleEditors_' + i + '', {
                height: 50,
                width: 280,
                toolbarGroups: [
                    {
                        "name": "paragraph",
                        "groups": ["list", "blocks"]
                    },
                    {
                        "name": "basicstyles",
                        "groups": ["basicstyles"]
                    }
                ],
            });
            CKEDITOR.replace('communication_multipleMeasuredEditors_' + i + '', {
                height: 50,
                width: 280,
                toolbarGroups: [
                    {
                        "name": "paragraph",
                        "groups": ["list", "blocks"]
                    },
                    {
                        "name": "basicstyles",
                        "groups": ["basicstyles"]
                    }
                ],
            });

        }
    }
}
//version 1
function updateClaimsUi(claimsDetails) {
    var container = $(".packlabel_claims");
    var container3 = $(".packlabel_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        var itemHtml2 = '<table style="width:100%; class="' + i + '_onpackclaims">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete" onclick="DeleteClaimsRecords(' + i + ')" class="claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td colspan="3"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingStmt + '</span></td>' +
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            '<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>'

        var itemHtml3 = ''



        container.append(itemHtml2); // Append the item HTML to the container
        container3.append(itemHtml2); // Append the item HTML to the container
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }
    //Clearing Claims label feilds values
    $("#Claims").val("");
    $("#OnPackRemarks").val("")
    $("#FeasibilityClaims").val("");
    $("#FeasibilityClaims").trigger("change");
    CKEDITOR.instances["MeasuredBy"].setData('');
    CKEDITOR.instances["SupportingStmt"].setData('');
    $("#ResponsibleDeptOnPack").val("").multiselect('refresh');

}
//version 2
function updateClaimsUi2(claimsDetails) {
    var container = $(".packlabel_claims");
    var container3 = $(".packlabel_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        var itemHtml3 = '<table style="width:100%;" class="' + i + '_onpackclaims">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete" onclick="DeleteClaimsRecords(' + i + ')" class="claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        let subOnpackClaimsData = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";
        console.log(subOnpackClaimsData, 'subOnpackClaimsData');
        for (let j = 0; j < subOnpackClaimsData.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subOnpackClaimsData[j].SupportingStatement + '</td>' +
                '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subOnpackClaimsData[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + subOnpackClaimsData.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }

        itemHtml3 += '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
            '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';


        container.append(itemHtml3); // Append the item HTML to the container
        container3.append(itemHtml3); // Append the item HTML to the container
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }
    //Clearing Claims label feilds values
    $("#Claims").val("");
    $("#OnPackRemarks").val("")
    $("#FeasibilityClaims").val("");
    $("#FeasibilityClaims").trigger("change");
    CKEDITOR.instances["MeasuredBy"].setData('');
    CKEDITOR.instances["SupportingStmt"].setData('');
    $("#ResponsibleDeptOnPack").val("").multiselect('refresh');

    //$("#ResponsibleDeptOnPack option[value='IRA']").prop("disabled", true);
    //$("#ResponsibleDeptOnPack").val("IRA").multiselect('refresh');
    if (depatmentBasedOnHub != "") {
        for (var i = 0; i < depatmentBasedOnHub.length; i++) {
            if (depatmentBasedOnHub[i] == "RA_INDIA") {
                $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]");
            }
            else {
                $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
            }
        }

        var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
            return value.indexOf("RA_INDIA") === -1;
        });

        $("#ResponsibleDeptOnPack").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');
        //$("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub + "]").prop("disabled", true);
        //$("#ResponsibleDeptOnPack").val(depatmentBasedOnHub).multiselect('refresh');
    }

    $('#onpack_claims_modal_table tbody').empty();
    onpackModelClaims = [];

}
var container = $(".packlabel_claims");
var container4 = $(".packlabel_claims1");

container.on("click", ".claims_edit", function () {
    $('#onpack_claims_modal_table tbody').empty();

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    //var index = $(this).data("index"); // Get the data-index attribute
    var item = packLabelClaimsDetails[index]; // Get the edit item using the index

    packLabelClaimsEditIndex = index;
    isPackLabelClaimsEdit = true;
    $("#Claims").val(item.Claims);
    $("#FeasibilityClaims").val(item.Feasibility);
    $("#FeasibilityClaims").trigger('change');
    //$("#SupportingStmt").val(DataFromGridOnPack.SupportingStmt);
    CKEDITOR.instances["MeasuredBy"].setData(item.MeasuredBy);
    CKEDITOR.instances["SupportingStmt"].setData(item.SupportingStmt);
    //$("#MeasuredBy").val(DataFromGridOnPack.MeasuredBy);
    $("#OnPackRemarks").val(item.OnPackRemarks);
    var values = item.ResponsibleDepartment;
    var newVal = values.split(',')
    $("#ResponsibleDeptOnPack").val(newVal);
    $("#ResponsibleDeptOnPack").multiselect("refresh");
    //onpackModelClaims = item.subOnpackClaims;
    onpackModelClaims = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";

    onpackModelClaims = onpackModelClaims.filter(row => row.length !== 0);

    updateOnpackClaimsModalWhileEdit(onpackModelClaims);
});
//container.on("click", ".claims_delete", function () {
//    var index = $(this).data("index"); // Get the data-index attribute
//    $("#DeleteClaimsPOPUp").modal("show");
//    $("#claimsDeleteOk").click(function () {
//        packLabelClaimsDetails.splice(index, 1);
//        //version1
//        //updateClaimsUi(packLabelClaimsDetails);
//        //version2
//        updateClaimsUi2(packLabelClaimsDetails);
//        $("#DeleteClaimsPOPUp").modal("hide");
//    })
//});


//Communication claims
$('#CommunicationClaimsDataAdd').click(function () {

    if ($("#AnchorHUB").val() != "") {
        let isValidInform = true;
        let communicationMeasuredByContent = CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let SupportingTechStmt = CKEDITOR.instances["SupportingTechStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let isresponsibleDepartment = (Array.isArray($("#ResponsibleDeptCommunication").val()) == true && $("#ResponsibleDeptCommunication").val().length == 0 || $("#ResponsibleDeptCommunication").val() == "")

        if ($("#CommunicationClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == null || communicationMeasuredByContent == "" || SupportingTechStmt == "" || isresponsibleDepartment || $("#ResponsibleDeptCommunication").val() == "") {
            $("#CommunicationClaims").val() == "" ? ($('#Err-CommunicationClaims').show(), isValidInform = false) : $('#Err-CommunicationClaims').hide();
            ($("#CommunicationFeasibilityClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == null) ? ($('#Err-CommunicationFeasibilityClaims').show(), isValidInform = false) : $('#Err-CommunicationFeasibilityClaims').hide();
            communicationMeasuredByContent == "" ? ($('#Err-CommunicationClaimsMeasuredBy').show(), isValidInform = false) : $('#Err-CommunicationClaimsMeasuredBy').hide();
            SupportingTechStmt == "" ? ($('#Err-SupportingTechStmt').show(), isValidInform = false) : $('#Err-SupportingTechStmt').hide();
            if (depatmentBasedOnHub == "") {
                $("#ResponsibleDeptCommunication").val() == "" ? ($('#Err-ResponsibleDeptCommunication').show(), isValidInform = false) : $('#Err-ResponsibleDeptCommunication').hide();
            }//$("#CommunicationRemarks").val() == "" ? ($('#Err-CommunicationRemarks').show(), isValidInform = false) : $('#Err-CommunicationRemarks').hide();
            else if (depatmentBasedOnHub.length == 1 && depatmentBasedOnHub.includes("RA_INDIA")) {
                $("#ResponsibleDeptCommunication").val() == "" ? ($('#Err-ResponsibleDeptCommunication').show(), isValidInform = false) : $('#Err-ResponsibleDeptCommunication').hide();
            }
        }
        if (isValidInform) {
            if (isCommunicationClaimsEdit) {
                communicationModelClaims.splice(0, 1, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) })
            } else {
                communicationModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) })
            }

            var dept = "";
            var depatmentBasedOnHubwithoutIndia = $.grep(depatmentBasedOnHub, function (value, index) {
                return value.indexOf("RA_INDIA") === -1;
            });
            if ($("#ResponsibleDeptCommunication").val() == "") {
                dept = depatmentBasedOnHubwithoutIndia
            }
            else {
                if (depatmentBasedOnHubwithoutIndia != "") {
                    dept = "," + depatmentBasedOnHubwithoutIndia
                }
                else {
                    dept = depatmentBasedOnHubwithoutIndia
                }
            }

            let communicationClaimsItem = {
                CommunicationClaims: $.trim($("#CommunicationClaims").val()),
                Feasibility: $.trim($("#CommunicationFeasibilityClaims").val()),
                SupportingTechStmt: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()),
                CommunicationClaimsMeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()),
                CommunicationRemarks: $.trim($("#CommunicationRemarks").val()),
                ResponsibleDepartment: $.trim($("#ResponsibleDeptCommunication").val().toString() + dept),
                subCommunicationClaims: communicationModelClaims
            }
            if (isCommunicationClaimsEdit) {
                communicationClaimsItem.FromStageNo = communicationClaimsDetails[communicationClaimsEditIndex].FromStageNo;
                communicationClaimsItem.ToStageNo = communicationClaimsDetails[communicationClaimsEditIndex].ToStageNo;
                isCommunicationClaimsEdit = false;
                communicationClaimsDetails.splice(communicationClaimsEditIndex, 1, communicationClaimsItem);
            } else {
                communicationClaimsItem.FromStageNo = Stage;
                communicationClaimsItem.ToStageNo = Stage;
                communicationClaimsDetails.push(communicationClaimsItem)
            }
            //version1
            //updateCommunicationClaimsUi(communicationClaimsDetails);
            //version2


            communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

            updateCommunicationClaimsUi2(communicationClaimsDetails);
        }
    }
    else {
        alert("Please select the Anchor Hub in Product Description");
    }
})
function updateCommunicationClaimsUi(claimsDetails) {
    var container = $(".communication_claims");
    var container3 = $(".communication_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        var itemHtml2 = '<table style="width:100%;" class="' + i + '_CommuniClaims">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="communication_claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#CommunicationClaimDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete" onclick="communication_claims_delete(' + i + ')"class="communication_claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td colspan="3"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingTechStmt + '</span></td>' +
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.CommunicationRemarks + '</span></td>' +
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.CommunicationClaimsMeasuredBy + '</span></td>' +
            '<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>'
        container.append(itemHtml2); // Append the item HTML to the container
        container3.append(itemHtml2); // Append the item HTML to the container
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }
    //Clearing Claims label feilds values
    $("#CommunicationClaims").val("")
    $('.claimsField').val("");
    $("#CommunicationFeasibilityClaims").val("");
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#CommunicationRemarks").val("")
    CKEDITOR.instances["SupportingTechStmt"].setData('');
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
    $("#ResponsibleDeptCommunication").val("").multiselect('refresh');

}
function updateCommunicationClaimsUi2(claimsDetails) {
    var container = $(".communication_claims");
    var container3 = $(".communication_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];

        var itemHtml3 = '<table style="width:100%;" class="' + i + '_CommuniClaims">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="communication_claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#CommunicationClaimDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete" onclick="communication_claims_delete(' + i + ')" class="communication_claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        let subCommunicationClaimsData = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";
        console.log(subCommunicationClaimsData, 'subOnpackClaimsData');
        for (let j = 0; j < subCommunicationClaimsData.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subCommunicationClaimsData[j].SupportingStatement + '</td>' +
                '<td colspan="1" style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subCommunicationClaimsData[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + subCommunicationClaimsData.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }

        itemHtml3 += '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.CommunicationRemarks + '</span></td>' +
            '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
        container.append(itemHtml3); // Append the item HTML to the container
        container3.append(itemHtml3); // Append the item HTML to the container
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }
    //Clearing Claims label feilds values
    $("#CommunicationClaims").val("")
    $('.claimsField').val("");
    $("#CommunicationFeasibilityClaims").val("");
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#CommunicationRemarks").val("")
    CKEDITOR.instances["SupportingTechStmt"].setData('');
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
    $("#ResponsibleDeptCommunication").val("").multiselect('refresh');

    //$("#ResponsibleDeptCommunication option[value='IRA']").prop("disabled", true);
    //$("#ResponsibleDeptCommunication").val("IRA").multiselect('refresh');
    if (depatmentBasedOnHub != "") {
        for (var i = 0; i < depatmentBasedOnHub.length; i++) {
            if (depatmentBasedOnHub[i] == "RA_INDIA") {
                $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]");
            } else {
                $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
            }
        }

        var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
            return value.indexOf("RA_INDIA") === -1;
        });
        $("#ResponsibleDeptCommunication").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');

        //$("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub + "]").prop("disabled", true);
        //$("#ResponsibleDeptCommunication").val(depatmentBasedOnHub).multiselect('refresh');
    }

    $('#communication_claims_modal_table tbody').empty();
    communicationModelClaims = [];
}
var container1 = $(".communication_claims");
var container4 = $(".communication_claims1");

container1.on("click", ".communication_claims_edit", function () {
    $('#communication_claims_modal_table tbody').empty();

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    //var index = $(this).data("index"); // Get the data-index attribute
    var item = communicationClaimsDetails[index]; // Get the edit item using the index
    //
    communicationClaimsEditIndex = index;
    isCommunicationClaimsEdit = true;
    $("#CommunicationClaims").val(item.CommunicationClaims);
    $("#CommunicationFeasibilityClaims").val(item.Feasibility);
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#SupportingTechStmt").val(item.SupportingTechStmt);
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData(item.CommunicationClaimsMeasuredBy);
    CKEDITOR.instances["SupportingTechStmt"].setData(item.SupportingTechStmt);
    //$("#CommunicationClaimsMeasuredBy").val(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    $("#CommunicationRemarks").val(item.CommunicationRemarks);
    $("#ResponsibleDeptCommunication").val(item.ResponsibleDepartment)
    var values = item.ResponsibleDepartment;
    var newVal = values.split(',')
    $("#ResponsibleDeptCommunication").val(newVal);
    $("#ResponsibleDeptCommunication").multiselect("refresh")
    communicationModelClaims = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";

    communicationModelClaims = communicationModelClaims.filter(row => row.length !== 0);

    updateCommunicationClaimsModalWhileEdit(communicationModelClaims);
});
//container1.on("click", ".communication_claims_delete", function () {
//    var index = $(this).data("index"); // Get the data-index attribute
//    $("#DeleteClaimsPOPUp").modal("show");
//    $("#claimsDeleteOk").click(function () {
//        communicationClaimsDetails.splice(index, 1);
//        //version1
//        //updateCommunicationClaimsUi(communicationClaimsDetails);
//        //version2
//        updateCommunicationClaimsUi2(communicationClaimsDetails);
//        $("#DeleteClaimsPOPUp").modal("hide");
//    })
//});

$('.generateClaims_pdf').click(function () {
    var fd = new FormData();
    $.ajax({
        url: ROOT + "ClaimsGrid/GenerateClaimsPdf",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectNumber: $('.projNo').text(), GridId: GridId },
        success: function (result) {
            $('.GenerateClaimsPdf').html(result);
            var htmldata = $(".GenerateClaimsPdf").html();
            fd.append('JsonString', htmldata)
            $.ajax({
                url: ROOT + 'ClaimsGrid/GeneratePdfHtml',
                type: 'POST',
                dataType: 'HTML',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    window.location = window.location.origin + ROOT + 'ClaimsGrid/GeneratePdf?ProjectId=' + claimsData.GridId + '&Type=' + "Claims"
                }
            })
        }
    })
});

//cft Review stage
// on pack CFTReview Stage grid Details.
//OnClaims JQGrid
var packClaimsModel = [
    {
        name: "ClaimsID",
        label: "ClaimsID",
        hidden: true,
    }, {
        name: "DocumentName",
        label: "DocumentName",
        hidden: true,
    },
    {
        name: "ProjectNumber",
        label: "ProjectNumber",
        hidden: true,
    },
    {
        name: 'Claims',
        label: 'Claims',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Feasibility',
        label: 'Feasibility of Achieving claims',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SupportingStmt',
        label: 'Supporting technical statements from R&D',
        width: 200,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            const subClaims = JSON.parse(rowobject.subOnpackClaims);
            var formattedStatements = `<ol class="test_number">`;
            $.each(subClaims, function (index, subClaim) {
                formattedStatements += `<li> ${subClaim.SupportingStatement}</li></br>`;
            })
            formattedStatements += `</ol>`
            return formattedStatements;
        }
    },
    {
        name: 'MeasuredBy',
        label: 'Measured By',
        width: 70,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            const subClaims = JSON.parse(rowobject.subOnpackClaims);
            var measured = `<ol class="test_number">`;
            debugger
            $.each(subClaims, function (index, subClaim) {
                measured += `<li> ${subClaim.MeasuredBy}</li></br>`;
            })
            measured += `</ol>`
            return measured;
        }
    },
    {
        name: 'OnPackRemarks',
        label: 'DSG Remarks / Restrictions',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: `Comments`,
        label: `${department} Remarks`,
        resizable: true,
        width: 120,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (isEdit == "view") {
                return '<textarea class="onpack form-control width_100 ' + rowobject.ClaimsID + ' onpack_remarks" readonly>' + cellvalue + '</textarea> <div id="onpack' + rowobject.ClaimsID + '" style="display:none;"><span class="color_red">Please enter the Remarks.</span></div>';
            } else {
                return '<textarea class="onpack width_100 ' + rowobject.ClaimsID + ' onpack_remarks" >' + cellvalue + '</textarea> <div id="onpack' + rowobject.ClaimsID + '" style="display:none;"><span class="color_red">Please enter the Remarks.</span></div>';
            }
        }
    },

    {
        name: 'Docs',
        label: 'Upload Template',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.DocumentName != null && rowobject.DocumentName != "" && rowobject.DocumentName) {

                return '<div style="text-align: center;" class="hideactionbuttons">' +
                    '<span class="upload_icons">' +
                    '<a class="btn-icon -history claimsdocuments" style="background: green; cursor:pointer;" data-attribute=' + rowobject.DocumentName + ' title="Download"><i class="fas fa-download" aria-hidden="true"></i></a>' +
                    '<a class="btn-icon -history deleteclaimsdocuments" onclick="DeleteOnPackClaimsRemarksDocs(' + rowobject.ClaimsID + ',' + options.rowId + ', this)" style="background: red; cursor:pointer;" data-attribute="' + rowobject.DocumentName + '" title="Delete"><i class="fas fa-trash" aria-hidden="true"></i></a>' +
                    '</span>' +
                    '<span class="file_show">' +
                    '<input type="file" class="onpack_document" onchange="validateIRAFileUpload(this,' + options.rowId + ')" style="display:none;" id="packClaimsDoc' + rowobject.ClaimsID + '" accept=".pdf,.xlsx,.pptx,.doc,.docx" />' +
                    '<div id="onpack_doc' + rowobject.ClaimsID + '" style="display:none;"><span class="color_red"></span></div>' +
                    '</span>' +
                    '</div>';
            } else {
                return '<input type="file" onchange="validateIRAFileUpload(this,' + options.rowId + ')" class="onpack_document" id="packClaimsDoc' + rowobject.ClaimsID + '" accept=".pdf,.xlsx,.pptx,.doc,.docx" />' +
                    '<div id="onpack_doc' + rowobject.ClaimsID + '" style="display:none;"><span class="color_red"></span></div>';
            }
        }
    }, {
        name: 'ResponsibleDepartment',
        label: 'Responsible Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
];

if (Stage == 3) {
    $("#cft_review_pack_claims").jqGrid({
        url: '',
        datatype: 'local',
        data: claimsData.ClaimsOnPackDetails,
        mtype: 'GET',
        colModel: packClaimsModel,
        loadonce: true,
        viewrecords: true,
        pager: '#cft_review_pack_claims_pager',
        rowNum: 1000000,
        scroll: 1,

        gridComplete: function () {
            if (claimsData.DeptForFileUpload[0] != undefined) {
                var MandatoryDepts = claimsData.DeptForFileUpload[0].DeptName;
                MandatoryDepts = MandatoryDepts.split(',');
                if (MandatoryDepts.indexOf(department.trim()) === -1) {
                    jQuery("#cft_review_pack_claims").jqGrid('hideCol', "Docs");
                }
            }
            else {
                DeptBasedOnHub = claimsData.DeptBasedOnHub[0].DeptName
                if (department != DeptBasedOnHub) {
                    jQuery("#cft_review_pack_claims").jqGrid('hideCol', "Docs");
                }
            }
            if (isEdit == "view") {
                $(".deleteclaimsdocuments").hide();
            }
        }
    });
}


// communication claims CFTReview Stage grid Details.
//communication  claims JQGrid
var communicationClaimsModel = [
    {
        name: "ClaimsID",
        label: "ClaimsID",
        hidden: true,
    }, {
        name: "DocumentName",
        label: "DocumentName",
        hidden: true,
    },
    {
        name: "ProjectNumber",
        label: "ProjectNumber",
        hidden: true,
    },
    {
        name: 'CommunicationClaims',
        label: 'Claims',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Feasibility',
        label: 'Feasibility of Achieving claims',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SupportingTechStmt',
        label: 'Supporting technical statements from R&D',
        width: 200,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            const subClaims = JSON.parse(rowobject.subCommunicationClaims);
            var formattedStatements = `<ol class="test_number">`;
            $.each(subClaims, function (index, subClaim) {
                formattedStatements += `<li> ${subClaim.SupportingStatement}</li></br>`;
            })
            formattedStatements += `</ol>`
            return formattedStatements;
        }
    },
    {
        name: 'CommunicationClaimsMeasuredBy',
        label: 'Measured By',
        width: 70,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            const subClaims = JSON.parse(rowobject.subCommunicationClaims);
            var measured = `<ol class="test_number">`;
            $.each(subClaims, function (index, subClaim) {
                measured += ` <li> ${subClaim.MeasuredBy}</li></br>`;
            })
            measured += `</ol>`
            return measured;
        }
    },
    {
        name: 'CommunicationRemarks',
        label: 'DSG Remarks / Restrictions',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: `Comments`,
        label: `${department} Remarks`,
        width: 120,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (isEdit == "view") {
                return '<textarea class="communication form-control width_100 ' + rowobject.ClaimsID + ' communication_remarks" readonly>' + cellvalue + '</textarea> <div id="communication' + rowobject.ClaimsID + '" style="display:none;"><span class="color_red">Please enter the Remarks.</span></div>';
            }
            else {
                return '<textarea class="communication form-control width_100 ' + rowobject.ClaimsID + ' communication_remarks">' + cellvalue + '</textarea> <div id="communication' + rowobject.ClaimsID + '" style="display:none;"><span class="color_red">Please enter the Remarks.</span></div>';
            }
        }
    },
    {
        name: 'Docs',
        label: 'Upload Template',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.DocumentName != null && rowobject.DocumentName != "" && rowobject.DocumentName) {
                return '<div style="text-align: center;" class="hideactionbuttons">' +
                    '<span class="upload_icons">' +
                    '<a class="btn-icon -history claimsdocuments" style="background: green; cursor:pointer;" data-attribute=' + rowobject.DocumentName + ' title="Download"><i class="fas fa-download" aria-hidden="true"></i></a>' +
                    '<a class="btn-icon -history deleteclaimsdocuments" onclick="DeleteCommunicationClaimsRemarksDocs(' + rowobject.ClaimsID + ',' + options.rowId + ', this)" style="background: red; cursor:pointer;" data-attribute="' + rowobject.DocumentName + '" title="Delete"><i class="fas fa-trash" aria-hidden="true"></i></a>' +
                    '</span>' +
                    '<span class="file_show">' +
                    '<input type="file" onchange="validateIRAFileUpload(this, ' + options.rowId + ')" class="communication_document" style="display:none;" id="communicationClaimsDoc' + rowobject.ClaimsID + '" accept=".pdf,.xlsx,.pptx,.doc,.docx" />' +
                    '<div id="communication_doc' + rowobject.ClaimsID + '" style="display:none;"><span class="color_red"></span></div>' +
                    '</span>' +
                    '</div>';
            } else {
                return '<input type="file" onchange="validateIRAFileUpload(this, ' + options.rowId + ')" class="communication_document" id="communicationClaimsDoc' + rowobject.ClaimsID + '" accept=".pdf,.xlsx,.pptx,.doc,.docx" />' +
                    '<div id="communication_doc' + rowobject.ClaimsID + '" style="display:none;"><span class="color_red"></span></div>';
            }

        }
    },
    {
        name: 'ResponsibleDepartment',
        label: 'Responsible Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
];

if (Stage == 3) {
    $("#cft_review_pack_communication").jqGrid({
        url: '',
        datatype: 'local',
        data: claimsData.ClaimsCommunicationDetails,
        mtype: 'GET',
        colModel: communicationClaimsModel,
        loadonce: true,
        viewrecords: true,
        pager: '#cft_review_pack_communication_pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            if (claimsData.DeptForFileUpload[0] != undefined) {
                var MandatoryDepts = claimsData.DeptForFileUpload[0].DeptName;
                MandatoryDepts = MandatoryDepts.split(',');
                if (MandatoryDepts.indexOf(department.trim()) === -1) {
                    jQuery("#cft_review_pack_communication").jqGrid('hideCol', "Docs");
                }
            }
            else {
                DeptBasedOnHub = claimsData.DeptBasedOnHub[0].DeptName
                if (department != DeptBasedOnHub) {
                    jQuery("#cft_review_pack_communication").jqGrid('hideCol', "Docs");
                }
            }
            if (isEdit == "view") {
                $(".deleteclaimsdocuments").hide();
            }
        }
    });
}

$('.claimsdocuments').click(function () {
    SupportingDocDownload = $(this).attr('data-attribute');
    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    SupportingDocDownload = SupportingDocDownload.replaceAll('/', '')

    if (SupportingDocDownload.length > 0) {
        $('.claimsdocuments').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload + '&location=ClaimsReviewFiles');
        return true;
    }
});

var deletedDocuments = [];
function DeleteOnPackClaimsRemarksDocs(ClaimsId, rowId, obj) {
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {

        $(obj).closest("td").addClass("upload_temp");

        var rowobject = $('#cft_review_pack_claims').jqGrid('getRowData', rowId);

        var data = claimsData.ClaimsOnPackDetails.find(onPack => onPack.ClaimsID == ClaimsId);
        if (data) {
            data.DocumentName = ""
        }
        var index = claimsData.ClaimsOnPackDetails.findIndex(item => item.ClaimsID == ClaimsId);
        if (index !== -1) {
            claimsData.ClaimsOnPackDetails[index] = data;
        }
        var DataFromTheRow1 = $('#cft_review_pack_claims').jqGrid('getRowData', rowId);
        var DocName = {}
        DocName = {
            claimsId: DataFromTheRow1.ClaimsID,
            DocName: DataFromTheRow1.DocumentName
        }

        deletedDocuments.push(DocName)

        $("#DeleteClaimsPOPUp").modal("hide");
    });
}

var deletedDocumentsCom = [];
function DeleteCommunicationClaimsRemarksDocs(ClaimsId, rowId, obj) {
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").click(function () {
        $(obj).closest("td").addClass("upload_temp");

        var rowobject = $('#cft_review_pack_communication').jqGrid('getRowData', rowId);
        var data1 = claimsData.ClaimsCommunicationDetails.find(onPack => onPack.ClaimsID == ClaimsId);
        if (data1) {
            data1.DocumentName = ""
        }
        var index1 = claimsData.ClaimsCommunicationDetails.findIndex(item => item.ClaimsID == ClaimsId);
        if (index1 !== -1) {
            claimsData.ClaimsCommunicationDetails[index1] = data1;
        }
        var DataFromTheRow2 = $('#cft_review_pack_communication').jqGrid('getRowData', rowId);
        var DocName1 = {}
        DocName1 = {
            claimsId: DataFromTheRow2.ClaimsID,
            DocName: DataFromTheRow2.DocumentName
        }

        deletedDocumentsCom.push(DocName1)

        $("#DeleteClaimsPOPUp").modal("hide");
    })
}

$("#onpackExcel, #communicationExcel").click(function () {
    var d = new Date();
    const formattedDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '_');
    var formattedTime = d.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/:/g, '_');

    var downloadUrl = ROOT + "ClaimsGrid/ExportToExcel"
        + "?projectNumber=" + encodeURIComponent(ProjectNumber)
        + "&fileName=" + encodeURIComponent("Claims" + formattedDate + formattedTime)
        + "&GridId=" + encodeURIComponent(GridId)
    window.open(downloadUrl, '_blank')
})

$("#onPackCFTRemarks").click(function () {
    var projectNumber = $("#ProjectNumber").val();
    var requestData = {
        ProjectNumber: projectNumber,
        TypeOfClaimsRemarks: "OnPack",
        TypeOfCFT: "OnPack",
        GridId: GridId,

    };

    $.ajax({
        url: ROOT + "ClaimsGrid/FetchCFTRemarks", // Update with the actual URL
        type: "post", // Or "POST" if you've configured your action method to accept POST requests
        data: requestData,
        dataType: "json",
        success: function (response) {
            // Handle the JSON response here
            //if (response && response.length > 0) {
            //    var mergedOutput = response.reduce((result, obj) => {
            //        const existingObj = result.find(
            //            item => item.ProjectNumber === obj.ProjectNumber && item.ClaimsId === obj.ClaimsId
            //        );
            //        if (existingObj) {
            //            for (const key in obj) {
            //                if (obj[key] !== null) {
            //                    existingObj[key] = obj[key];
            //                }
            //            }
            //        } else {
            //            result.push({ ...obj });
            //        }
            //         return result;
            //    }, []);
            //}
            //showCFTRemarksModal(mergedOutput);
            var colModel = [];
            for (var columnName in response[0]) {
                if (columnName == "ProjectNumber" || columnName == "ClaimsId") {
                    continue;
                } else {
                    if (response[0].hasOwnProperty(columnName)) {
                        var columnModelObject = {
                            name: columnName,
                            label: columnName,
                            width: 200,
                            sortable: true,
                        };
                        colModel.push(columnModelObject);
                    }
                }
            }
            $.jgrid.gridUnload('#Grid_Show_CFTRemarks');
            $('#Grid_Show_CFTRemarks').jqGrid({
                url: '',
                datatype: 'local',
                data: response,
                mtype: 'GET',
                colModel: colModel,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_Grid_Show_CFTRemarks',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#Grid_Show_CFTRemarks tbody tr");
                    var objHeader = $("#Grid_Show_CFTRemarks tbody tr td");

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

            $('#CFTReamrks_show_popup').modal("show");
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
})

$("#communicationCFTRemarks").click(function () {
    var projectNumber = $("#ProjectNumber").val();
    var requestData = {
        ProjectNumber: projectNumber,
        TypeOfClaimsRemarks: "communication",
        TypeOfCFT: "communication",
        GridId: GridId
    };

    $.ajax({
        url: ROOT + "ClaimsGrid/FetchCFTRemarks", // Update with the actual URL
        type: "post", // Or "POST" if you've configured your action method to accept POST requests
        data: requestData,
        dataType: "json",
        success: function (response) {
            // Handle the JSON response here
            //if (response && response.length > 0) {
            //    var mergedOutput = response.reduce((result, obj) => {
            //        const existingObj = result.find(
            //            item => item.ProjectNumber === obj.ProjectNumber && item.ClaimsId === obj.ClaimsId
            //        );
            //        if (existingObj) {
            //            for (const key in obj) {
            //                if (obj[key] !== null) {
            //                    existingObj[key] = obj[key];
            //                }
            //            }
            //        } else {
            //            result.push({ ...obj });
            //        }
            //         return result;
            //    }, []);
            //}
            //showCFTRemarksModal(mergedOutput);

            var colModel = [];
            for (var columnName in response[0]) {
                if (columnName == "ProjectNumber" || columnName == "ClaimsId") {
                    continue;
                } else {
                    if (response[0].hasOwnProperty(columnName)) {
                        var columnModelObject = {
                            name: columnName,
                            label: columnName,
                            width: 200,
                            sortable: true,
                        };
                        colModel.push(columnModelObject);
                    }
                }
            }
            $.jgrid.gridUnload('#Grid_Show_CFTRemarks');
            $('#Grid_Show_CFTRemarks').jqGrid({
                url: '',
                datatype: 'local',
                data: response,
                mtype: 'GET',
                colModel: colModel,
                loadonce: true,
                viewrecords: true,
                pager: '#pager_Grid_Show_CFTRemarks',
                rowNum: 20,
                scroll: 1,

                gridComplete: function () {
                    var objRows = $("#Grid_Show_CFTRemarks tbody tr");
                    var objHeader = $("#Grid_Show_CFTRemarks tbody tr td");

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

            $('#CFTReamrks_show_popup').modal("show");
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
})


///No use
function showCFTRemarksModal(mergedOutput) {
    let ObjectKeys = Object.keys(mergedOutput[0]);
    let colModel = ObjectKeys.filter(key =>
        key != "ClaimsId" && key != "DocumentName" && key != "ProjectNumber"
    ).map(filtereKey => {
        if (filtereKey != "Claims") {
            return {
                name: filtereKey,
                lable: filtereKey + " Remarks",
                resizable: true,
                ignoreCase: true,
            }
        } else {
            return {
                name: filtereKey,
                lable: "Claims",
                resizable: true,
                ignoreCase: true,
            }
        }
    })
    console.log(colModel, 'coModel')
    $("#cft_remarks").modal("show");
    $("#cft_remarks_table").jqGrid("clearGridData", true);

    showCFTRemarks(colModel, mergedOutput);
}

function showCFTRemarks(colModel, remarks) {
    if (cftremarksModel == 0) {
        $("#cft_remarks_table").jqGrid({
            url: '',
            datatype: 'local',
            data: remarks,
            mtype: 'GET',
            colModel: colModel,
            loadonce: true,
            viewrecords: true,
            pager: '#cft_remarks_table_pager',
            rowNum: 20,
            scroll: 1,
        });
    } else {
        $("#cft_remarks_table").jqGrid('setGridParam', { data: remarks });
    }
    $("#cft_remarks_table").trigger('reloadGrid');
    cftremarksModel += 1;
}
//--- until here

$("#CFTRemarks_excel").click(function () {
    var data = $("#Grid_Show_CFTRemarks").jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        var d = new Date();
        const formattedDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '_');
        var formattedTime = d.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/:/g, '_');
        $("#Grid_Show_CFTRemarks").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            fileName: "CFT_Remarks" + ".xlsx",
            maxlength: 1000,
        });
    }
});
//DSG Review CODE
//version 1 old No need
function updateOnPackClaimWithRemarksUI(claimsDetails) {
    var container = $(".packlabel_claims");
    var container3 = $(".packlabel_claims1");
    container.empty()
    //let dynamicKeys = Object.keys(claimsDetails[0]);
    //console.log(dynamicKeys,'dynamicKeys')
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        let info = fetchContainedDepartment(item);
        var itemHtml2 = '<table style="width:100%;">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" class="claimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>';
        //'<button type="button" class="claimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
        if (item.DocumentName && item.DocumentName !== "") {
            itemHtml2 += '<a class="claimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs" data-index="' + i + '" onclick=downloadTemplate(' + item.DocumentName + ') data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>';
        }
        itemHtml2 += '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingStmt + '</span></td>' +
            /*'<td colspan="1" style="width:20%"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +*/
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            '<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
            //'<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            //'<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>';

        itemHtml2 += "<tr>";
        if (item.ClaimsId != "" && item.FromStageNo <= 3) {
            for (let i = 0; i < info.length; i++) {
                if (i % 3 == 0) {
                    itemHtml2 += '</tr><tr>'
                }
                let colspan = i == 0 || i % 3 == 0 ? 2 : 1;

                itemHtml2 += '<td colspan="' + colspan + '">' +
                    '<span class="remarks"><b>' + info[i] + ' Remarks</b></span>' +
                    '<span>' + item[info[i]] + '</span>' +
                    '</td>'
            }
        }
        itemHtml2 += '</tr>' +
            '</tbody>' +
            '</table>'

        container.append(itemHtml2); // Append the item HTML to the container
        container3.append(itemHtml2); // Append the item HTML to the container
        downloadRemarks()
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }
    //Clearing Claims label feilds values
    $("#Claims").val("");
    $("#OnPackRemarks").val("")
    $("#FeasibilityClaims").val("");
    $("#FeasibilityClaims").trigger("change");
    CKEDITOR.instances["MeasuredBy"].setData('');
    CKEDITOR.instances["SupportingStmt"].setData('');
    $("#ResponsibleDeptOnPack").val("").multiselect('refresh');

}
//version 2
function updateOnPackClaimWithRemarksUI2(claimsDetails) {
    var container = $(".packlabel_claims");
    var container3 = $(".packlabel_claims1");
    container.empty()
    //let dynamicKeys = Object.keys(claimsDetails[0]);
    //console.log(dynamicKeys,'dynamicKeys')
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        let info = fetchContainedDepartment(item);
        var itemHtml2 = '<table style="width:100%;" class="' + i + '_OnpackRemarks">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="claimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>'
            + '<button type="button" title="Delete" onclick="DeleteclaimsWithRemarks(' + i + ')" class="claimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>';
        if (item.DocumentName && item.DocumentName !== "") {
            //var DocumentNamess = item.DocumentName.replace(/"/g, '');
            var fileName = item.DocumentName.replaceAll('"', '');
            var fileExtension = fileName.split('.').pop().toLowerCase();
            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
                'csv': 'Microsoft Excel Spreadsheet',
            };
            itemHtml2 += '<a title="Documents" class="claimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs" data-index="' + i + '"  data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>'
		/*		+ (fileExtension in fileTypes ? '' : '<span class="action-link"><a style="display: none;"  onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon onpackView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') */

				/*+	'<a class="icon_color btn_button claims_action_btn" title="View" target="_blank" onclick="ViewDocFile(' + DocumentNamess + ')" ><i class="fa fa-eye mr-2" title="View"></i></a>'*/;


        }
        itemHtml2 += '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingStmt + '</span></td>' +
            /*'<td colspan="1" style="width:20%"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +*/
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            '<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
            //'<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            //'<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>';

        itemHtml2 += "<tr>";
        if (item.ClaimsId != "" && item.FromStageNo <= 3) {
            for (let i = 0; i < info.length; i++) {
                if (i % 2 == 0) {
                    itemHtml2 += '</tr><tr>'
                }
                let colspan = i == 0 || i % 2 == 0 ? 2 : 2;
                if (item[info[i]] != null) {
                    itemHtml2 += '<td colspan="' + colspan + '">' +
                        '<span class="remarks"><b>' + info[i] + ' Remarks</b></span>' +
                        '<span>' + item[info[i]] + '</span>' +
                        '</td>'
                }
            }
        }
        itemHtml2 += '</tr>' +
            '</tbody>' +
            '</table>'
        var itemHtml3 = '<table style="width:100%;" class="' + i + '_OnpackRemarks">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="claimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>'
            + '<button type="button"  title="Delete" onclick="DeleteclaimsWithRemarks(' + i + ')" class="claimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>';
        if (item.DocumentName && item.DocumentName !== "") {
            //var DocumentNamess = item.DocumentName.replace(/"/g, '');
            var fileName = item.DocumentName.replaceAll('"', '');
            var fileExtension = fileName.split('.').pop().toLowerCase();
            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
                'csv': 'Microsoft Excel Spreadsheet',
            };
            itemHtml3 += '<a title="Documents" class="claimsWithRemarksDownload Icon_file claims_action_btn download_icon_green" onclick=showMultipleUploadedImages("' + item.ClaimsId + '","' + GridId + '","Onpack") data-index="' + i + '"  data-attribute=' + item.DocumentName + '><img src="../images/multiimages.png"/></a>'
				/*+ (fileExtension in fileTypes ? '' : '<span class="action-link"><a style="display: none;"  onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon onpackView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>')*/

				/*+	'<a class="icon_color btn_button claims_action_btn" title="View" target="_blank" onclick="ViewDocFile(' + DocumentNamess + ')" ><i class="fa fa-eye mr-2" title="View"></i></a>'*/;


        }
        itemHtml3 += '</th><tbody>'
        let subOnpackClaimsData = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";
        console.log(subOnpackClaimsData, 'subOnpackClaimsData');
        for (let j = 0; j < subOnpackClaimsData.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subOnpackClaimsData[j].SupportingStatement + '</td>' +
                '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subOnpackClaimsData[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + subOnpackClaimsData.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }
        itemHtml3 += '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
            //'<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            //'<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>';
        if (Stage < 5) {

            itemHtml3 += "<tr>";
            if (item.ClaimsId != "" && item.FromStageNo <= 3) {

                for (let i = 0; i < info.length; i++) {
                    if (i % 2 == 0) {
                        itemHtml3 += '</tr><tr>'
                    }
                    let colspan = i == 0 || i % 2 == 0 ? 2 : 2;
                    if (item[info[i]] != null) {
                        itemHtml3 += '<td colspan="' + colspan + '">' +
                            '<span class="remarks"><b>' + info[i] + ' Remarks</b></span>' +
                            '<span>' + item[info[i]] + '</span>' +
                            '</td>'
                    }
                }

            }
            itemHtml3 += '</tr>';
        }
        itemHtml3 += '</tbody>' +
            '</table>'
        container.append(itemHtml3); // Append the item HTML to the container
        container3.append(itemHtml3); // Append the item HTML to the container
        downloadRemarks()
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }
    //Clearing Claims label feilds values
    $("#Claims").val("");
    $("#OnPackRemarks").val("")
    $("#FeasibilityClaims").val("");
    $("#FeasibilityClaims").trigger("change");
    CKEDITOR.instances["MeasuredBy"].setData('');
    CKEDITOR.instances["SupportingStmt"].setData('');
    $("#ResponsibleDeptOnPack").val("").multiselect('refresh');
    $('#onpack_claims_modal_table tbody').empty();
    onpackModelClaims = [];

}
container.on("click", ".claimsWithRemarksEdit", function () {
    // var index = $(this).data("index"); // Get the data-index attribute

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    var item = onPackClaimsWithRemarks[index]; // Get the edit item using the index
    //
    packLabelClaimsEditIndex = index;
    isPackLabelClaimsEdit = true;
    $("#Claims").val(item.Claims);
    $("#FeasibilityClaims").val(item.Feasibility);
    $("#FeasibilityClaims").trigger('change');
    CKEDITOR.instances["MeasuredBy"].setData(item.MeasuredBy);
    CKEDITOR.instances["SupportingStmt"].setData(item.SupportingStmt);
    $("#OnPackRemarks").val(item.Remarks);
    onpackModelClaims = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";

    onpackModelClaims = onpackModelClaims.filter(row => row.length !== 0);

    updateOnpackClaimsModalWhileEdit(onpackModelClaims);

});
//container.on("click", ".claimsWithRemarksDelete", function () {
//    var index = $(this).data("index"); // Get the data-index attribute
//    $("#DeleteClaimsPOPUp").modal("show");
//    $("#claimsDeleteOk").click(function () {
//        onPackClaimsWithRemarks.splice(index, 1);
//        //version1
//        //updateOnPackClaimWithRemarksUI(onPackClaimsWithRemarks);
//        //version2
//        updateOnPackClaimWithRemarksUI2(onPackClaimsWithRemarks);
//        $("#DeleteClaimsPOPUp").modal("hide");
//    })
//});
$('#OnPackWithRemarksAdd').click(function () {
    let isValidInform = true;
    let measuredByContent = CKEDITOR.instances["MeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
    let SupportingStmt = CKEDITOR.instances["SupportingStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
    //let isresponsibleDepartment = (Array.isArray($("#ResponsibleDeptOnPack").val()) == true && $("#ResponsibleDeptOnPack").val().length == 0 || $("#ResponsibleDeptOnPack").val() == "")
    if ($.trim($("#Claims").val()) == "" || $("#FeasibilityClaims").val() == "" || $("#FeasibilityClaims").val() == null || measuredByContent == "" || SupportingStmt == "" || $("#ResponsibleDeptOnPack").val()) {
        $.trim($("#Claims").val()) == "" ? ($('#Err-Claims').show(), isValidInform = false) : $('#Err-Claims').hide();
        ($("#FeasibilityClaims").val() == "" || $("#FeasibilityClaims").val() == null) ? ($('#Err-FeasibilityClaims').show(), isValidInform = false) : $('#Err-FeasibilityClaims').hide();
        measuredByContent == "" ? ($('#Err-MeasuredBy').show(), isValidInform = false) : $('#Err-MeasuredBy').hide();
        SupportingStmt == "" ? ($('#Err-SupportingStmt').show(), isValidInform = false) : $('#Err-SupportingStmt').hide();
        //$.trim($("#OnPackRemarks").val()) == "" ? ($('#Err-OnPackRemarks').show(), isValidInform = false) : $('#Err-OnPackRemarks').hide();
        //(Array.isArray($("#ResponsibleDeptOnPack").val()) == true && $("#ResponsibleDeptOnPack").val().length == 0 || $("#ResponsibleDeptOnPack").val() == "") ? ($('#Err-ResponsibleDeptOnPack').show(), isValidInform = false) : $('#Err-ResponsibleDeptOnPack').hide();

    }
    let item = onPackClaimsWithRemarks[packLabelClaimsEditIndex];
    if (isValidInform) {
        if (isPackLabelClaimsEdit) {
            onpackModelClaims.splice(0, 1, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) })
        } else {
            onpackModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) })
        }
        let packLabelClaimsItem = {
            ...item,
            Claims: $.trim($("#Claims").val()),
            Feasibility: $.trim($("#FeasibilityClaims").val()),
            SupportingStmt: $.trim(CKEDITOR.instances["SupportingStmt"].getData()),
            MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()),
            Remarks: $.trim($("#OnPackRemarks").val()),
            subOnpackClaims: onpackModelClaims
        }

        if (isPackLabelClaimsEdit) {
            isPackLabelClaimsEdit = false;
            onPackClaimsWithRemarks.splice(packLabelClaimsEditIndex, 1, packLabelClaimsItem);
        } else {
            packLabelClaimsItem.FromStageNo = Stage;
            packLabelClaimsItem.ToStageNo = Stage;
            packLabelClaimsItem.DocumentName = ""
            packLabelClaimsItem.ResponsibleDepartment = ""
            packLabelClaimsItem.ClaimsId = ""
            onPackClaimsWithRemarks.push(packLabelClaimsItem)
        }
        //version1
        //updateOnPackClaimWithRemarksUI(onPackClaimsWithRemarks);
        //version2

        onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);

        updateOnPackClaimWithRemarksUI2(onPackClaimsWithRemarks);
    }
});
//version 1 old
function updateCommunicationClaimsWithRemarksUI(claimsDetails) {
    var container = $(".communication_claims");
    var container3 = $(".communication_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        const info = fetchContainedDepartment(item);
        var itemHtml2 = '<table style="width:100%;" class="' + i + '_CommuniRemarks">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="communicationclaimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#CommunicationClaimDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>'
            + '<button type="button" onclick="communicationclaimsWithRemarksDelete(' + i + ')" class="communicationclaimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>';
        if (item.DocumentName && item.DocumentName !== "") {
            itemHtml2 += '<a title="Download" class="communicationclaimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs"  data-index="' + i + '" data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>';
        }
        itemHtml2 += '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingStmt + '</span></td>' +
            /*'<td colspan="1" style="width:20%"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +*/
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            '<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
            //'<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            //'<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>';

        itemHtml2 += "<tr>";
        if (item.ClaimsId != "" && item.FromStageNo <= 3) {

            for (let i = 0; i < info.length; i++) {
                if (i % 3 == 0) {
                    itemHtml2 += '</tr><tr>'
                }
                let colspan = i == 0 || i % 3 == 0 ? 2 : 1;

                itemHtml2 += '<td colspan="' + colspan + '">' +
                    '<span class="remarks"><b>' + info[i] + ' Remarks</b></span>' +
                    '<span>' + item[info[i]] + '</span>' +
                    '</td>'
            }
        }
        itemHtml2 += '</tr>' +
            '</tbody>' +
            '</table>'
        container.append(itemHtml2); // Append the item HTML to the container
        container3.append(itemHtml2); // Append the item HTML to the container
        downloadRemarks()
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }
    //Clearing Claims label feilds values
    $("#CommunicationClaims").val("")
    $('.claimsField').val("");
    $("#CommunicationFeasibilityClaims").val("");
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#CommunicationRemarks").val("")
    CKEDITOR.instances["SupportingTechStmt"].setData('');
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
    $("#ResponsibleDeptCommunication").val("").multiselect('refresh');

}
//version 2
function updateCommunicationClaimsWithRemarksUI2(claimsDetails) {
    var container = $(".communication_claims");
    var container3 = $(".communication_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        const info = fetchContainedDepartment(item);
        var itemHtml2 = '<table style="width:100%;"class="' + i + '_CommuniRemarks">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="communicationclaimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#CommunicationClaimDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>'
            + '<button type="button" onclick ="communicationclaimsWithRemarksDelete(' + i + ')" class="communicationclaimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>';
        if (item.DocumentName && item.DocumentName !== "") {
            //var DocumentNamess = item.DocumentName.replace(/"/g, '');
            var fileName = item.DocumentName.replaceAll('"', '');
            var fileExtension = fileName.split('.').pop().toLowerCase();
            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
                'csv': 'Microsoft Excel Spreadsheet',
            };
            itemHtml2 += '<a  title="Download" class="communicationclaimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs"  data-index="' + i + '" data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>'
			/*	+(fileExtension in fileTypes ? '' : '<span class="action-link"><a style="display: none;"  onclick="ViewDocFile(\'' + fileName + '\')"  class="btn-icon communicationView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>')*/;
        }
        itemHtml2 += '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingStmt + '</span></td>' +
            /*'<td colspan="1" style="width:20%"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +*/
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            '<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
            //'<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            //'<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>';

        itemHtml2 += "<tr>";
        if (item.ClaimsId != "" && item.FromStageNo <= 3) {

            for (let i = 0; i < info.length; i++) {
                if (i % 2 == 0) {
                    itemHtml2 += '</tr><tr>'
                }
                let colspan = i == 0 || i % 2 == 0 ? 2 : 2;
                if (item[info[i]] != null) {
                    itemHtml2 += '<td colspan="' + colspan + '">' +
                        '<span class="remarks"><b>' + info[i] + ' Remarks</b></span>' +
                        '<span>' + item[info[i]] + '</span>' +
                        '</td>'
                }
            }
        }
        itemHtml2 += '</tr>' +
            '</tbody>' +
            '</table>'
        var itemHtml3 = '<table style="width:100%;" class="' + i + '_CommuniRemarks">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="communicationclaimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#CommunicationClaimDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>'
            + '<button type="button" title="Delete" onclick="communicationclaimsWithRemarksDelete(' + i + ')" class="communicationclaimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>';
        if (item.DocumentName && item.DocumentName !== "") {

            var fileName = item.DocumentName.replaceAll('"', '');
            var fileExtension = fileName.split('.').pop().toLowerCase();
            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
                'csv': 'Microsoft Excel Spreadsheet',
            };
            /*var DocumentNamess = item.DocumentName.replace(/"/g, '');*/
            itemHtml3 += '<a title="Documents" class="communicationclaimsWithRemarksDownload claims_action_btn download_icon_green Icon_file" onclick=showMultipleUploadedImages("' + item.ClaimsId + '","' + GridId + '","Communication") data-index="' + i + '" data-attribute=' + item.DocumentName + '><img src="../images/multiimages.png"/></a>'
				/*+ (fileExtension in fileTypes ? '' : '<span class="action-link"><a style="display: none;" onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon communicationView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>')*/
				/* +'<a class="icon_color btn_button" title="View" onclick="ViewDocFile(' + DocumentNamess + ')" ><i class="fa fa-eye mr-2" title="View"></i></a>'*/;

        }
        itemHtml3 += '</th><tbody>'
        let subCommunicationClaimsData = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";
        console.log(subCommunicationClaimsData, 'subOnpackClaimsData');
        for (let j = 0; j < subCommunicationClaimsData.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subCommunicationClaimsData[j].SupportingStatement + '</td>' +
                '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subCommunicationClaimsData[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + subCommunicationClaimsData.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }
        itemHtml3 += '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
            //'<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            //'<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>';
        if (Stage < 5) {

            itemHtml3 += "<tr>";
            if (item.ClaimsId != "" && item.FromStageNo <= 3) {

                for (let i = 0; i < info.length; i++) {
                    if (item[info[i]] != null) {
                        if (i % 2 == 0) {
                            itemHtml3 += '</tr><tr>'
                        }
                        let colspan = i == 0 || i % 2 == 0 ? 2 : 2;

                        itemHtml3 += '<td colspan="' + colspan + '">' +
                            '<span class="remarks"><b>' + info[i] + ' Remarks</b></span>' +
                            '<span>' + item[info[i]] + '</span>' +
                            '</td>'
                    }
                }
            }
            itemHtml3 += '</tr>';
        }
        itemHtml3 += '</tbody>' +
            '</table>'
        container.append(itemHtml3); // Append the item HTML to the container
        container3.append(itemHtml3); // Append the item HTML to the container
        downloadRemarks()
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }
    //Clearing Claims label feilds values
    $("#CommunicationClaims").val("")
    $('.claimsField').val("");
    $("#CommunicationFeasibilityClaims").val("");
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#CommunicationRemarks").val("")
    CKEDITOR.instances["SupportingTechStmt"].setData('');
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
    $("#ResponsibleDeptCommunication").val("").multiselect('refresh');
    $('#communication_claims_modal_table tbody').empty();
    communicationModelClaims = [];

}
container1.on("click", ".communicationclaimsWithRemarksEdit", function () {

    //var index = $(this).data("index"); // Get the data-index attribute

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    var item = communicationClaimsWithRemarks[index]; // Get the edit item using the index
    //
    communicationClaimsEditIndex = index;
    isCommunicationClaimsEdit = true;
    $("#CommunicationClaims").val(item.Claims);
    $("#CommunicationFeasibilityClaims").val(item.Feasibility);
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#SupportingTechStmt").val(item.SupportingStmt);
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData(item.MeasuredBy);
    CKEDITOR.instances["SupportingTechStmt"].setData(item.SupportingStmt);
    //$("#CommunicationClaimsMeasuredBy").val(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    $("#CommunicationRemarks").val(item.Remarks);
    //$("#ResponsibleDeptCommunication").val(item.ResponsibleDepartment)
    //var values = item.ResponsibleDepartment;
    //var newVal = values.split(',')
    //$("#ResponsibleDeptCommunication").val(newVal);
    //$("#ResponsibleDeptCommunication").multiselect("refresh")
    communicationModelClaims = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";

    communicationModelClaims = communicationModelClaims.filter(row => row.length !== 0);

    updateCommunicationClaimsModalWhileEdit(communicationModelClaims);
});
//container1.on("click", ".communicationclaimsWithRemarksDelete", function () {
//    var index = $(this).data("index"); // Get the data-index attribute
//    $("#DeleteClaimsPOPUp").modal("show");
//    $("#claimsDeleteOk").click(function () {
//        communicationClaimsWithRemarks.splice(index, 1);
//        //version1
//        //updateCommunicationClaimsWithRemarksUI(communicationClaimsWithRemarks);
//        //verions 2
//        updateCommunicationClaimsWithRemarksUI2(communicationClaimsWithRemarks);
//        $("#DeleteClaimsPOPUp").modal("hide");
//    })
//});
$('#CommunicationClaimsWithRemarksAdd').click(function () {
    let communicationMeasuredByContent = CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
    let SupportingTechStmt = CKEDITOR.instances["SupportingTechStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
    let isValidInform = true;
    //let isresponsibleDepartment = (Array.isArray($("#ResponsibleDeptCommunication").val()) == true && $("#ResponsibleDeptCommunication").val().length == 0 || $("#ResponsibleDeptCommunication").val() == "")
    if ($.trim($("#CommunicationClaims").val()) == "" || $("#CommunicationFeasibilityClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == null || communicationMeasuredByContent == "" || SupportingTechStmt == "" || $("#ResponsibleDeptCommunication").val() == "") {
        $.trim($("#CommunicationClaims").val()) == "" ? ($('#Err-CommunicationClaims').show(), isValidInform = false) : $('#Err-CommunicationClaims').hide();
        ($("#CommunicationFeasibilityClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == null) ? ($('#Err-CommunicationFeasibilityClaims').show(), isValidInform = false) : $('#Err-CommunicationFeasibilityClaims').hide();
        communicationMeasuredByContent == "" ? ($('#Err-CommunicationClaimsMeasuredBy').show(), isValidInform = false) : $('#Err-CommunicationClaimsMeasuredBy').hide();
        SupportingTechStmt == "" ? ($('#Err-SupportingTechStmt').show(), isValidInform = false) : $('#Err-SupportingTechStmt').hide();
        //$("#ResponsibleDeptCommunication").val() == "" ? ($('#Err-ResponsibleDeptCommunication').show(), isValidInform = false) : $('#Err-ResponsibleDeptCommunication').hide();
        //$.trim($("#CommunicationRemarks").val()) == "" ? ($('#Err-CommunicationRemarks').show(), isValidInform = false) : $('#Err-CommunicationRemarks').hide();
    }
    let item = communicationClaimsWithRemarks[communicationClaimsEditIndex];
    if (isValidInform) {
        if (isCommunicationClaimsEdit) {
            communicationModelClaims.splice(0, 1, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) })
        } else {
            communicationModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) })
        }
        let communicationClaimsItem = {
            ...item,
            Claims: $.trim($("#CommunicationClaims").val()),
            Feasibility: $.trim($("#CommunicationFeasibilityClaims").val()),
            SupportingStmt: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()),
            MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()),
            Remarks: $.trim($("#CommunicationRemarks").val()),
            subCommunicationClaims: communicationModelClaims
        }
        if (isCommunicationClaimsEdit) {
            isCommunicationClaimsEdit = false;
            communicationClaimsWithRemarks.splice(communicationClaimsEditIndex, 1, communicationClaimsItem);
        } else {
            communicationClaimsItem.FromStageNo = Stage;
            communicationClaimsItem.ToStageNo = Stage;
            communicationClaimsItem.DocumentName = "";
            communicationClaimsItem.ResponsibleDepartment = "";
            communicationClaimsItem.ClaimsId = "";
            communicationClaimsWithRemarks.push(communicationClaimsItem)
        }
        //version1
        //updateCommunicationClaimsWithRemarksUI(communicationClaimsWithRemarks);
        //version2
        communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);
        updateCommunicationClaimsWithRemarksUI2(communicationClaimsWithRemarks);
    }
})

$(".DSGSave,.SaveManagerModal, .DSGSignOffSave, .AddendumSave").off("click").click(function () {
    validSave = true;
    $('#claimsSaveOk').prop("disabled", false);
    $('.mandatory').each(function (i, obj) {
        if ($(this).val() == "") {
            $(this).parent().find('span').show();
            validSave = false;
        }
    })

    //var CommunicationClaimsGridLength = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'reccount');
    //var OnPackClaimsGridLength = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'reccount');

    onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);

    var OnPackClaimsGridLength = onPackClaimsWithRemarks.length;
    var CommunicationClaimsGridLength = communicationClaimsWithRemarks.length;

    //CommunicationClaimsGridLength == 0 ? ($('#Err-CommunicationClaimsGrid').show(), validSave = false) : $('#Err-CommunicationClaimsGrid').hide();

    OnPackClaimsGridLength == 0 ? ($('#Err-OnPackGrid').show(), validSave = false) : $('#Err-OnPackGrid').hide();
    if (validSave) {
        $('div#SaveModal').modal('show');
        $("#claimsSaveOk").on("click", function () {
            var claimsheaders = [];
            claimsheaders.push({
                ID: claimsData ? claimsData.ClaimsHeadersList[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                ProductName: $.trim($('#ProductName').val()),
                HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
                VersionNo: 1,
                StatusId: Stage,
            });

            var projectdetails = {
                ID: claimsData ? claimsData.ClaimsProjectDetails[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                ProductName: $.trim($('#ProductName').val()),
                HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
                ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
                Division: $("#ClaimsDivision").val()
            };

            var productdescription = {
                ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                LicenseCategory: $.trim($('#LicenseCategory').val()),
                Dosage: $.trim($('#Dosage').val()),
                TargetOrgan: $.trim($("#TargetOrgan").val()),
                FormulaFeatures: $.trim($("#FormulaFeatures").val()),
                AnchorHUB: $.trim($("#AnchorHUB").val()),
                OtherMarkets: $.trim($("#OtherMarkets").val()),
                ShelfLife: $.trim($("#ShelfLife").val()),
                DirectionForUse: $.trim($("#DirectionForUse").val()),
                Caution: $.trim($("#Caution").val()),
                TargetCustomer: $.trim($("#TargetCustomer").val()),
                OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
            };
            var projectbrief = {
                ID: claimsData ? claimsData.ClaimsProjectDetails[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
            };

            let Onpack = onPackClaimsWithRemarks.map(ele => ({
                Claims: ele.Claims,
                Feasibility: ele.Feasibility,
                SupportingStmt: ele.SupportingStmt,
                MeasuredBy: ele.MeasuredBy,
                OnPackRemarks: ele.Remarks,
                ResponsibleDepartment: ele.ResponsibleDepartment,
                FromStageNo: ele.FromStageNo,
                ToStageNo: ele.ToStageNo,
                ClaimsId: ele.ClaimsId,
                subOnpackClaims: ele.subOnpackClaims
            }));
            let communication = communicationClaimsWithRemarks.map(ele => ({
                CommunicationClaims: ele.Claims,
                Feasibility: ele.Feasibility,
                SupportingTechStmt: ele.SupportingStmt,
                CommunicationClaimsMeasuredBy: ele.MeasuredBy,
                CommunicationRemarks: ele.Remarks,
                ResponsibleDepartment: ele.ResponsibleDepartment,
                FromStageNo: ele.FromStageNo,
                ToStageNo: ele.ToStageNo,
                ClaimsId: ele.ClaimsId,
                subCommunicationClaims: ele.subCommunicationClaims
            }));

            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            //var fileName = "";
            //var files = $('#supportingDocument').prop("files");

            //var formData = new FormData();
            //if (files.length > 0) {
            //    formData.append("file", files[0]);
            //    $.ajax({
            //        type: 'POST',
            //        url: ROOT + "ClaimsGrid/SaveSupportingDocument",
            //        async: false,
            //        data: formData,
            //        cache: false,
            //        contentType: false,
            //        processData: false,
            //        success: function (data) {
            //            fileName = data;
            //        }
            //    });
            //}
            $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
            $("#ProductDescription").val(JSON.stringify(productdescription));
            $("#ProjectDetails").val(JSON.stringify(projectdetails));
            $('#ProjectBrief').val(JSON.stringify(projectbrief));

            $("#OnPackClaims").val(JSON.stringify(Onpack));
            $("#CommunicationClaimsData").val(JSON.stringify(communication));
            // $('#SupportingDoc').val(fileName);
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
            //$('#ApprovalStatus').val();
            $('#Stage').val(Stage);
            $('#EditClaims').submit();
            $('#claimsSaveOk').prop("disabled", true);
        });
    }

})

$("#SendForApproval, #SendForDSGSignOff, #SendForBackToDSG, #SendToCft1").off("click").click(function () {
    validSave = true;
    $('#SaveDetails').prop("disabled", false);
    $('#SendToApproval').prop("disabled", false);
    var clickedElementId = $(this).attr("id");
    $('.mandatory').each(function (i, obj) {
        if ($(this).val() == "") {
            $(this).parent().find('span').show();
            validSave = false;
        }
    })

    //var CommunicationClaimsGridLength = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'reccount');
    //var OnPackClaimsGridLength = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'reccount');

    //var onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    //var communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);

    onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);

    var OnPackClaimsGridLength = onPackClaimsWithRemarks.length;
    var CommunicationClaimsGridLength = communicationClaimsWithRemarks.length;

    //    CommunicationClaimsGridLength == 0 ? ($('#Err-CommunicationClaimsGrid').show(), validSave = false) : $('#Err-CommunicationClaimsGrid').hide();

    OnPackClaimsGridLength == 0 ? ($('#Err-OnPackGrid').show(), validSave = false) : $('#Err-OnPackGrid').hide();
    let tabsArray = []
    $("#form_project_details").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("info");
            return;
        }
    }); $("form#form_product_description").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("placement");
            return;
        }
    });
    if (OnPackClaimsGridLength == 0) {
        tabsArray.push("schedule");
    }
    //if (CommunicationClaimsGridLength == 0) {
    //    tabsArray.push("review");
    //}
    let tabsIds = Object.keys(dataSlickIndex);
    tabsArray.map((ele, index) => {
        let index1 = tabsIds.indexOf(ele);
        if (index1 != -1) {
            tabsIds.splice(index1, 1)
        }
    });
    tabsArray.map(ele => {
        $(`li[data-slick-index=${dataSlickIndex[ele]}]`).find('a').css("background-color", "red")
    });
    tabsIds.map(ele => {
        $(`li[data-slick-index=${dataSlickIndex[ele]}]`).find('a').removeAttr("style");
    })
    if (tabsArray.length > 0)
        $(`[data-attr="${tabsArray[0]}"]`).trigger('click');

    if (!validSave) {
        return;
    }
    if (clickedElementId === "SendToCft1") {
        let clonedClaims = JSON.parse(JSON.stringify([...onPackClaimsWithRemarks, ...communicationClaimsWithRemarks]));
        let responsibleDepartment = clonedClaims.flatMap(claim => claim.ResponsibleDepartment.split(","));
        let uniqueDepartments = [...new Set([...responsibleDepartment, 'IRA'])];
        $("#Department").val(uniqueDepartments)
        $("#Department option[value='IRA']").prop("disabled", true);
        $("#Department").val(uniqueDepartments).multiselect('refresh');
        $("#Department").trigger("change");
        $('#SendCFTModal').modal('show');
    } else {
        $('#DSG_Remarks').modal('show');
    }
    $('#SaveDetails').click(function () {
        var flag = true;

    });
    $("#SendToApproval, #SaveDetails").off('click').click(function () {
        var flag = true;
        if (clickedElementId === "SendToCft1") {
            $('#selectedCFTUsers').val() == "" ? ($('#Error_SelectCFTUser').show(), flag = false) : $('#Error_SelectCFTUser').hide();
        } else {
            $('#DSG_remarks_text').val().trim() == "" ? ($('#Error_DSG_remarks_text').show(), flag = false) : $('#Error_DSG_remarks_text').hide();
        }
        if (flag) {
            var claimsheaders = [];
            claimsheaders.push({
                ID: claimsData ? claimsData.ClaimsHeadersList[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                ProductName: $.trim($('#ProductName').val()),
                HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
                VersionNo: 1,
                StatusId: clickedElementId === "SendForBackToDSG" ? 4 : clickedElementId === "SendToCft1" ? 3 : clickedElementId === "AddendumSaveUpdate" ? Stage : clickedElementId === "SaveAsAddendum" ? 7 : + Stage + 1,
            });

            var projectdetails = {
                ID: claimsData ? claimsData.ClaimsProjectDetails[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                ProductName: $.trim($('#ProductName').val()),
                HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
                ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
                Division: $("#ClaimsDivision").val()
            };

            var productdescription = {
                ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                LicenseCategory: $.trim($('#LicenseCategory').val()),
                Dosage: $.trim($('#Dosage').val()),
                TargetOrgan: $.trim($("#TargetOrgan").val()),
                FormulaFeatures: $.trim($("#FormulaFeatures").val()),
                AnchorHUB: $.trim($("#AnchorHUB").val()),
                OtherMarkets: $.trim($("#OtherMarkets").val()),
                ShelfLife: $.trim($("#ShelfLife").val()),
                DirectionForUse: $.trim($("#DirectionForUse").val()),
                Caution: $.trim($("#Caution").val()),
                TargetCustomer: $.trim($("#TargetCustomer").val()),
                OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
            };
            var projectbrief = {
                ID: claimsData ? claimsData.ClaimsProjectDetails[0].ID : 0,

                ProjectNumber: $.trim($('#ProjectNo').val()),
                RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
            };

            let Onpack = onPackClaimsWithRemarks.map(ele => ({
                Claims: ele.Claims,
                Feasibility: ele.Feasibility,
                SupportingStmt: ele.SupportingStmt,
                MeasuredBy: ele.MeasuredBy,
                OnPackRemarks: ele.Remarks,
                ResponsibleDepartment: ele.ResponsibleDepartment,
                FromStageNo: ele.FromStageNo,
                ToStageNo: (ele.ClaimsId === "" && clickedElementId === "SendForBackToDSG") ? 4 : (ele.ClaimsId === "" && clickedElementId === "SendToCft1") ? 3 : (ele.ClaimsId === "" && clickedElementId === "AddendumSaveUpdate") ? Stage : (ele.ClaimsId === "" && clickedElementId === "SaveAsAddendum") ? 7 : ele.ClaimsId === "" ? +Stage + 1 : ele.ToStageNo,
                ClaimsId: ele.ClaimsId,
                subOnpackClaims: ele.subOnpackClaims
            }));
            let communication = communicationClaimsWithRemarks.map(ele => ({
                CommunicationClaims: ele.Claims,
                Feasibility: ele.Feasibility,
                SupportingTechStmt: ele.SupportingStmt,
                CommunicationClaimsMeasuredBy: ele.MeasuredBy,
                CommunicationRemarks: ele.Remarks,
                ResponsibleDepartment: ele.ResponsibleDepartment,
                FromStageNo: ele.FromStageNo,
                ToStageNo: (ele.ClaimsId === "" && clickedElementId === "SendForBackToDSG") ? 4 : (ele.ClaimsId === "" && clickedElementId === "SendToCft1") ? 3 : (ele.ClaimsId === "" && clickedElementId === "AddendumSaveUpdate") ? Stage : (ele.ClaimsId === "" && clickedElementId === "SaveAsAddendum") ? 7 : ele.ClaimsId === "" ? +Stage + 1 : ele.ToStageNo,
                ClaimsId: ele.ClaimsId,
                subCommunicationClaims: ele.subCommunicationClaims
            }));
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
            //var fileName = "";
            //var files = $('#supportingDocument').prop("files");

            //var formData = new FormData();
            //if (files.length > 0) {
            //    formData.append("file", files[0]);
            //    $.ajax({
            //        type: 'POST',
            //        url: ROOT + "ClaimsGrid/SaveSupportingDocument",
            //        async: false,
            //        data: formData,
            //        cache: false,
            //        contentType: false,
            //        processData: false,
            //        success: function (data) {
            //            fileName = data;
            //        }
            //    });
            //}
            var ApprovalStatus = [{
                FromStage: Stage,
                ToStage: clickedElementId === "SendForBackToDSG" ? 4 : clickedElementId === "SendToCft1" ? 3 : clickedElementId === "AddendumSaveUpdate" ? Stage : clickedElementId === "SaveAsAddendum" ? 7 : + Stage + 1,
                Remarks: clickedElementId === "SendToCft1" ? $("#editor").val() : $('#DSG_remarks_text').val(),
                Type: clickedElementId === "SendForBackToDSG" ? "BackToDSG" : clickedElementId === "SendToCft1" ? "CFTUpdate" : "Approve"
            }];
            if (clickedElementId === "SendToCft1") {
                var DeptDetails = {
                    Remarks: $('#editor').val(),
                    DeptUsers: $('#selectedCFTUsers').val(),
                    Depts: $('#Department').val()
                }
                $('#DeptDetails').val(JSON.stringify(DeptDetails));
            }
            $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
            $("#ProductDescription").val(JSON.stringify(productdescription));
            $('#ProjectBrief').val(JSON.stringify(projectbrief));
            $("#ProjectDetails").val(JSON.stringify(projectdetails));
            $("#OnPackClaims").val(JSON.stringify(Onpack));
            $("#CommunicationClaimsData").val(JSON.stringify(communication));
            //$('#SupportingDoc').val(fileName);

            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid))
            $('#ApprovalStatus').val(JSON.stringify(ApprovalStatus));
            $('#Stage').val(Stage);
            $('#EditClaims').submit();
            $('#SendToApproval').prop("disabled", true);
            $('#SaveDetails').prop("disabled", true);
        }
    })
})

//function downloadTemplate(fileName) {
//    SupportingDocDownload = fileName;
//    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
//    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
//    SupportingDocDownload = SupportingDocDownload.replaceAll('/', '')

//    if (SupportingDocDownload.length > 0) {
//        $('.downloadUploadedDocs').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload + '&location=ClaimsReviewFiles');
//        return true;
//    }
//}
$("#Claims").on("input", function () {
    if ($(this).val() != "") {
        $('#Err-Claims').hide();
    }
})
$("#FeasibilityClaims").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-FeasibilityClaims').hide();
    }
})
$("#OnPackRemarks").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-OnPackRemarks').hide();
    }
})
$("#ResponsibleDeptOnPack").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-ResponsibleDeptOnPack').hide();
    }
})
$("#cke_MeasuredBy").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-MeasuredBy').hide();
    }
})

//Claims For Communications Other Than Label events
$("#CommunicationFeasibilityClaims").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-CommunicationFeasibilityClaims').hide();
    }
})
$("#CommunicationClaims").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-CommunicationClaims').hide();
    }
});
$("#CommunicationRemarks").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-CommunicationRemarks').hide();
    }
})
$("#ResponsibleDeptCommunication").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-ResponsibleDeptCommunication').hide();
    }
})
$("#cke_CommunicationClaimsMeasuredBy").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-ResponsibleDeptCommunication').hide();
    }
})


$("#ResponsibleDeptOnPack, #ResponsibleDeptCommunication").change(function () {
    var clickedElementId = $(this).attr("id");

    let value = $(this).val();
    if (value && value.length > 0) {
        if (clickedElementId === "ResponsibleDeptOnPack") {
            $("#Err-ResponsibleDeptOnPack").hide();
        } else {
            $("#Err-ResponsibleDeptCommunication").hide();
        }
    }
})


$(".onpack_remarks, .communication_remarks").on("input", function () {
    if ($(this).val()) {
        $(this).next("div").hide();
        $(this).removeClass("claims_border-error");
    }
})

var forOnPackClaimsDetails = [];
var communication_ClaimsDetails = [];
$(".onpack_remarks").on("change", function () {

    forOnPackClaimsDetails.length = 0;
    $('#cft_review_pack_claims').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_claims").jqGrid('getRowData', row.id);
            var obj = {
                Comments: $(row).find(`textarea`).val(),
                Department: department,//need to change
                DocumentName: rowData.DocumentName,
                ClaimsId: rowData.ClaimsID
            }
            forOnPackClaimsDetails.push(obj);
        }
    });

    //console.log(forOnPackClaimsDetails,'forOnPackClaimsDetails')
})
$(".communication_remarks").on("change", function () {
    debugger

    communication_ClaimsDetails.length = 0;
    $('#cft_review_pack_communication').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_communication").jqGrid('getRowData', row.id);
            var obj = {
                Comments: $(row).find(`textarea`).val(),
                Department: department,//need to change
                DocumentName: rowData.DocumentName,
                ClaimsId: rowData.ClaimsID
            }
            communication_ClaimsDetails.push(obj);
        }
    });

    //console.log(communication_ClaimsDetails, 'communication_ClaimsDetails')
})
$(document).ready(function () {
    $('.onpack_document, .communication_document').change(function () {
        var numFiles = this.files.length;
        if (numFiles > 0) {
            $(this).next("div").hide();
        }

        var onPackClaims = [];
        $('#cft_review_pack_claims').find('tr').each(function (i, row) {
            if (row.id != "") {
                var rowData = $("#cft_review_pack_claims").jqGrid('getRowData', row.id);
                var isPresent = deletedDocuments.some(document => document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName);
                deletedDocuments = deletedDocuments.filter(document => !(document.claimsId === rowData.ClaimsID && document.DocName === rowData.DocumentName));

                if (isPresent) {
                    var obj = {
                        Comments: $(row).find(`textarea`).val(),
                        Department: department,//need to change
                        DocumentName: "",
                        ClaimsId: rowData.ClaimsID
                    }
                    onPackClaims.push(obj);

                }
                else {
                    var obj = {
                        Comments: $(row).find(`textarea`).val(),
                        Department: department,//need to change
                        DocumentName: rowData.DocumentName,
                        ClaimsId: rowData.ClaimsID
                    }
                    onPackClaims.push(obj);
                }
            }
        });
    });
});

function fetchContainedDepartment(item) {
    let departmentList = JSON.parse(claimsData.DepartmentList);
    let arrayDepartmentList = departmentList.map(ele => ele.DeptName);

    let itemKeys = Object.keys(item);

    let result = [];
    for (let i = 0; i < itemKeys.length; i++) {

        let j = itemKeys[i];
        if (arrayDepartmentList.includes(j)) {
            result.push(j)
        }
    }
    return result;

}

function checkUnselectedDefaultValues() {
    debugger
    const selectedOptions1 = $("#Department").val()
    if (Array.isArray(selectedOptions1)) {
        for (var i = 0; i < depatmentBasedOnHub.length; i++) {
            if (depatmentBasedOnHub[i] != "RA_INDIA") {
                selectedOptions1.push(depatmentBasedOnHub[i]);
            }
        }
    }
    const unselectedDefaults = ActualSelectedDepartments.filter((opt) => !selectedOptions1.includes(opt));
    const additionalSelectedOptions = selectedOptions1.filter(options => !ActualSelectedDepartments.includes(options));
    console.log(additionalSelectedOptions)
    if (unselectedDefaults.length > 0) {
        alert("You cannot unselect the Responsible Department values, Please remove Dependent Responsible Department from Claims and continue: " + unselectedDefaults.join(", "));
        $("#Department").val([...ActualSelectedDepartments, ...additionalSelectedOptions]).multiselect('refresh');
        return false;
    }
    return true;
}
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function downloadRemarks() {
    /// Commented recently 10/11/2023

    //$(".downloadUploadedDocs").click(function () {
    //    SupportingDocDownload = $(this).attr('data-attribute');
    //    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    //    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    //    SupportingDocDownload = SupportingDocDownload.replaceAll('/', '')

    //    if (SupportingDocDownload.length > 0) {
    //        $('.downloadUploadedDocs').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload + '&location=ClaimsReviewFiles');
    //        return true;
    //    }
    //})
}
//function ViewOnpackUpload(rowId) {

//$(".ViewOnpackUpload").click(function () {
//    debugger
//    var onpackDocView = $(this).data('attribute');
//    onpackDocView = onpackDocView.replace(/["/]/g, ''); // Replace all " and / characters

//    if (onpackDocView.length > 0) {
//        debugger
//        var imageUrl = ROOT + 'Pdfupload/' + onpackDocView;
//        window.open(imageUrl, '_blank');
//    }
//});
//}

//if (isEdit == 'view') {
$('.LicenseCategory_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].LicenseCategoryName);
//$('.LicenseCategory_v').text($('#LicenseCategory').val());
$('.otherhubslicensecategory_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].OtherHUBSLicenseCategory);
$('.Dosage_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].Dosage);
$('.TargetOrgan_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].TargetOrgan);
$('.FormulaFeatures_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].FormulaFeatures);
$('.AnchorHUB_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].AnchorHUB);
$('.OtherMarkets_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].OtherMarkets);
$('.ShelfLife_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].ShelfLife);
$('.DirectionForUse_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].DirectionForUse);
$('.Caution_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].Caution);
$('.TargetCustomer_v').text(claimsData.ClaimsProductDescription[0] === undefined ? "" : claimsData.ClaimsProductDescription[0].TargetCustomer);
//}


//--------For onpaack claims--------------//
//if (isEdit == 'view') {

$(".preview_tab").on("click", function () {
    if (Stage > 3 && isEdit != 'view') {
        $('.onpackView').show();
        $('.communicationView').show();

    } else {
        $('.onpackView').hide();
        $('.communicationView').hide();
    }

    //$('.communicationclaimsWithRemarksDownload').show();

    $('.flaticon-delete').hide();
    $('.claimsWithRemarksDelete').hide();
    $('.communicationclaimsWithRemarksDelete').hide();
    $('.claimsWithRemarksEdit').hide();
    //$('.claimsWithRemarksDownload').hide();
    $('.communicationclaimsWithRemarksEdit').hide();
    //$('.communicationclaimsWithRemarksDownload').hide();
    $('.claims_edit').hide();
    $('.claims_delete').hide();
    $('.communication_claims_edit').hide();
    $('.communication_claims_delete').hide();
    debugger
    if (Stage == "3") {
        var container = $(".packlabel_claims");
        var container4 = $(".packlabel_claims1");
        container.empty()

        var claimsData1 = claimsData.ClaimsOnPackDetails;
        for (var i = 0; i < claimsData1.length; i++) {
            var item = claimsData1[i];
            /*var Remarks = forOnPackClaimsDetails[i].Comments;*/
            var Remarks = forOnPackClaimsDetails[i] ? forOnPackClaimsDetails[i].Comments : claimsData.ClaimsOnPackDetails[i].Comments;
            var Department = forOnPackClaimsDetails[i] ? forOnPackClaimsDetails[i].Department : `${department}`;
            //  var Document = communication_ClaimsDetails[i] ? communication_ClaimsDetails[i].Document : onPackClaims[i].DocumentName;

            //console.log(onPackClaims,'onPackClaimsonPackClaimsonPackClaimsonPackClaims')
            if (item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) {
                var fileName = item.DocumentName.replace(/"/g, ''); // Replace all double quotes
                var fileExtension = fileName.split('.').pop().toLowerCase();
                var fileTypes = {
                    'doc': 'Microsoft Word Document',
                    'docx': 'Microsoft Word Document',
                    'xls': 'Microsoft Excel Spreadsheet',
                    'xlsx': 'Microsoft Excel Spreadsheet',
                    'ppt': 'Microsoft PowerPoint',
                    'pptx': 'Microsoft PowerPoint',
                    'csv': 'Microsoft Excel Spreadsheet',
                };

            }
            var onPacklabelclaimsHtml = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="2"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +

                ((item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) ?
                    '<th colspan="1"style="text-align: right;"><a title="Download" style="background:green;" class="btn-icon onPackPreview claims_action_btn downloadUploadedDocs" onclick="Downloaddoc(\'' + fileName + '\')" title="Download"><i class="fas fa-download" aria-hidden="true"></i></a>'
                    :
                    '<th colspan="1">'
                )

			/*	+	(fileExtension in fileTypes ? '' : '<span style="display: none;"  class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon onpackView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') */ +
                '</th>' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            //if (item.DocumentName && item.DocumentName !== "") {
            //	debugger
            //	var fileName = item.DocumentName.replace(/"/g, ''); // Replace all double quotes
            //	var fileExtension = fileName.split('.').pop().toLowerCase();
            //	var fileTypes = {
            //		'doc': 'Microsoft Word Document',
            //		'docx': 'Microsoft Word Document',
            //		'xls': 'Microsoft Excel Spreadsheet',
            //		'xlsx': 'Microsoft Excel Spreadsheet',
            //		'ppt': 'Microsoft PowerPoint',
            //		'pptx': 'Microsoft PowerPoint',
            //		'csv': 'Microsoft Excel Spreadsheet',
            //	};
            //	onPacklabelclaimsHtml += '<tr>' +
            //		'<td colspan="4"><a title="Download" class="onPackPreview claims_action_btn downloadUploadedDocs" onclick="Downloaddoc(\'' + fileName + '\')" title="Download"><i class="fas fa-download" aria-hidden="true"></i></a>' +
            //		(fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon onpackView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
            //		'</td>' +
            //		'</tr>';
            //}	

            let subOnpackClaimsData = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";
            console.log(subOnpackClaimsData, 'subOnpackClaimsData');
            for (let j = 0; j < subOnpackClaimsData.length; j++) {
                onPacklabelclaimsHtml += '<tr>' +
                    '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subOnpackClaimsData[j].SupportingStatement + '</td>' +
                    '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subOnpackClaimsData[j].MeasuredBy + '</span></td>';
                if (j == 0) {
                    onPacklabelclaimsHtml += '<td rowspan=' + subOnpackClaimsData.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
                }
                onPacklabelclaimsHtml += '</tr>';
            }

            onPacklabelclaimsHtml += '<tr>' +
                '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
                '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' + '</tr>';
            onPacklabelclaimsHtml += '<tr>' +
                '<td colspan="4"><span class="remarks"> <b>' + Department + '' + " Remarks" + ':</b></span><span>' + Remarks + '</span></td>' + '</tr>' +
                '</tbody>' +
                '</table>';

            container.append(onPacklabelclaimsHtml); // Append the item HTML to the container
            container4.append(onPacklabelclaimsHtml); // Append the item HTML to the container
        }
    }
    //        for (var i = 0; i < claimsData1.length; i++) {
    //            var item = claimsData1[i];
    //            var onPacklabelclaimsHtml = `
    //<div class="formulation_table ontable">
    //    <table style="width:100%">
    //        <thead>
    //            <tr>
    //                <th colspan="4" style="/* width: 5%; ">
    //                    <span class="claimsname"><b>Claims Name : </b></span><span>${item.Claims}</span>
    //                </th>
    //                <th style="width: 20%;">
    //                    <span class="feasibility">
    //                        <b>Feasibility of Achieving Claims : </b>
    //                    </span>
    //                    <span>${item.Feasibility}</span>
    //                </th>
    //            </tr>
    //        </thead>
    //        <tbody>
    //            <tr>
    //                <td colspan="3" style="/* width:50%; */">
    //                    <span class="supportingtec"><b>Supporting technical statements from R&D : </b></span>
    //                    <span>${item.SupportingStmt}</span>
    //                </td>
    //                <td style="width:200px">
    //                    <span class="measured">
    //                        <b>Measured By : </b>
    //                    </span>
    //                    <span>${item.MeasuredBy}</span>
    //                </td>
    //                <td style="/* width:25%; */">
    //                    <span class="responsibledept">
    //                        <b>Responsible Department</b>
    //                    </span>
    //                    <span>${item.ResponsibleDepartment}</span>
    //                </td>
    //            </tr>
    //         <tr id="remarksRow">
    //    <td colspan="5">
    //        <span class="restrictions">
    //            <b>DSG Remarks / Restrictions : </b>
    //        </span>
    //        <span>${item.OnPackRemarks}</span>
    //    </td>
    //</tr>

    //        </tbody>
    //    </table>
    //</div><br>`;

    //            container.append(onPacklabelclaimsHtml); // Append the item HTML to the container
    //            container4.append(onPacklabelclaimsHtml); // Append the item HTML to the container
    //        }
    //    }
    if (Stage == "3") {
        debugger
        var Contaner2 = $(".communication_claims");
        Contaner2.empty();
        debugger
        var commuClaimsData = claimsData.ClaimsCommunicationDetails;
        for (var i = 0; i < commuClaimsData.length; i++) {
            var item = commuClaimsData[i];
            var Remarks = communication_ClaimsDetails[i] ? communication_ClaimsDetails[i].Comments : claimsData.ClaimsCommunicationDetails[i].Comments;
            var Department = communication_ClaimsDetails[i] ? communication_ClaimsDetails[i].Department : `${department}`;
            //var Document = communication_ClaimsDetails[i] ? communication_ClaimsDetails[i].Document : onPackClaims[i].Document;
            //console.log(onPackClaims, 'onPackClaimsData')
            if (item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) {
                var fileName = item.DocumentName.replace(/"/g, ''); // Replace all double quotes
                var fileExtension = fileName.split('.').pop().toLowerCase();
                var fileTypes = {
                    'doc': 'Microsoft Word Document',
                    'docx': 'Microsoft Word Document',
                    'xls': 'Microsoft Excel Spreadsheet',
                    'xlsx': 'Microsoft Excel Spreadsheet',
                    'ppt': 'Microsoft PowerPoint',
                    'pptx': 'Microsoft PowerPoint',
                    'csv': 'Microsoft Excel Spreadsheet',
                };
            }
            // || claimsData.CFTDeptName !== "DRA" || claimsData.CFTDeptName !== "Clinical" || claimsData.CFTDeptName !== "FD" || claimsData.CFTDeptName !== "Packaging" || claimsData.CFTDeptName !== "DCSG"
            var communicaationClimsHtml = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="2"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                ((item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) && fileName != undefined ?
                    '<td colspan="1" style="text-align: right;"><a title="Download" style="background: green; " class="btn-icon communicattionPreview claims_action_btn downloadUploadedDocs" onclick="Downloaddoc(\'' + fileName + '\')" data-index="' + i + '" data-attribute=' + fileName + '><i class="fas fa-download" aria-hidden="true"></i></a>'
                    :
                    '<th colspan="1">'
                )
 /*+	(fileExtension in fileTypes ? '' : '<span style="display: none;" class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon communicationView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>')*/ +
                '</td>' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            //if (item.DocumentName && item.DocumentName !== "") {
            //	var fileName = item.DocumentName.replace(/"/g, ''); // Replace all double quotes
            //	var fileExtension = fileName.split('.').pop().toLowerCase();
            //	var fileTypes = {
            //		'doc': 'Microsoft Word Document',
            //		'docx': 'Microsoft Word Document',
            //		'xls': 'Microsoft Excel Spreadsheet',
            //		'xlsx': 'Microsoft Excel Spreadsheet',
            //		'ppt': 'Microsoft PowerPoint',
            //		'pptx': 'Microsoft PowerPoint',
            //		'csv': 'Microsoft Excel Spreadsheet',
            //	};

            //	communicaationClimsHtml += '<tr>' +
            //		'<td colspan="4"><a title="Download" class="communicattionPreview claims_action_btn  downloadUploadedDocs" onclick="Downloaddoc(\'' + fileName + '\')" data-index="' + i + '" data-attribute=' + fileName + '><i class="fas fa-download" aria-hidden="true"></i></a>' +
            //		(fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon communicationView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
            //		'</td>' +
            //		'</tr>';
            //}	
            let subCommunicationClaimsData = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";
            console.log(subCommunicationClaimsData, 'subOnpackClaimsData');
            for (let j = 0; j < subCommunicationClaimsData.length; j++) {
                communicaationClimsHtml += '<tr>' +
                    '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subCommunicationClaimsData[j].SupportingStatement + '</td>' +
                    '<td colspan="1" style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subCommunicationClaimsData[j].MeasuredBy + '</span></td>';
                if (j == 0) {
                    communicaationClimsHtml += '<td rowspan=' + subCommunicationClaimsData.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
                }
                communicaationClimsHtml += '</tr>';
            }

            communicaationClimsHtml += '<tr>' +
                '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.CommunicationRemarks + '</span></td>' +
                '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '</tr>';
            communicaationClimsHtml += '<tr>' +
                '<td colspan="4"><span class="remarks"> <b>' + Department + '' + " Remarks" + ':</b></span><span>' + Remarks + '</span></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>';
            Contaner2.append(communicaationClimsHtml); // Append the item HTML to the container

            //        var commuClaimsData = claimsData.ClaimsCommunicationDetails;
            //        for (var i = 0; i < commuClaimsData.length; i++) {
            //            var item = commuClaimsData[i];
            //            var communicaationClimsHtml = `
            //<div class="formulation_table tablevalues">
            //    <table style="width:100%; border: 1px solid grey;">
            //        <thead>
            //            <tr>
            //                <th colspan="4" style="/* width: 5%; border: 1px solid grey;">
            //                    <span class="claimsname"><b>Claims Name : </b></span><span>${item.CommunicationClaims}</span>
            //                </th>
            //                <th style="width: 20%; border: 1px solid grey;">
            //                    <span class="feasabilityAchieving">
            //                        <b>Feasibility of Achieving Claims : </b>
            //                    </span>
            //                    <span>${item.Feasibility}</span>
            //                </th>
            //            </tr>
            //        </thead>
            //        <tbody>
            //            <tr>
            //                <td colspan="3" style="/* width:50%; border: 1px solid grey;">
            //                    <span class="supportingtTechnical"><b>Supporting technical statements from R&D : </b></span>
            //                    <span>${item.SupportingTechStmt}</span>
            //                </td>
            //                <td style=" width:200px">
            //                    <span class "measured1">
            //                        <b>Measured By : </b>
            //                    </span>
            //                    <span>${item.CommunicationClaimsMeasuredBy}</span>
            //                </td>
            //                <td style="/* width:25%; border: 1px solid grey;">
            //                    <span class="responsible1">
            //                        <b>Responsible Department</b>
            //                    </span>
            //                    <span>${item.ResponsibleDepartment}</span>
            //                </td>
            //            </tr>
            //            <tr>
            //                <td colspan="5" style="border: 1px solid grey;">
            //                    <span class="restrictions1">
            //                        <b>DSG Remarks / Restrictions : </b>
            //                    </span>
            //                    <span>${item.CommunicationRemarks}</span>
            //                </td>
            //            </tr>
            //        </tbody>
            //    </table>
            //</div><br>`;

            //            Contaner2.append(communicaationClimsHtml); // Append the item HTML to the container
        }
    }
});



//if (Stage == "3") {
//for (var i = 0; i < claimsData1.length; i++) {
//    var item = claimsData1[i];
//    var onPacklabelclaimsHtml = '<table style="width:100%; border: 1px solid grey;">' +
//        '<thead> <tr style="border-bottom: 1px solid grey;">' +
//        '<th colspan="3" style="border-right: 1px solid grey;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
//        '<th colspan="1" style="border-left: none !important; border-bottom: none !important;">' +
//        '</th>' +
//        '</tr>' +
//        '</thead>' +
//        '<tbody>';

//    var subOnpackClaimsData = item.subOnpackClaims ? (typeof item.subOnpackClaims === 'string' ? JSON.parse(item.subOnpackClaims) : (typeof item.subOnpackClaims === 'object' ? item.subOnpackClaims : [])) : [];
//    console.log(subOnpackClaimsData, 'subOnpackClaimsData');
//    for (let j = 0; j < subOnpackClaimsData.length; j++) {
//        onPacklabelclaimsHtml += '<tr style="border: 1px solid grey;">' +
//            '<td colspan="2" style="width:70%; border-right: 1px solid grey;"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subOnpackClaimsData[j].SupportingStatement + '</td>' +
//            '<td style="width:15%; border-right: 1px solid grey;"><span class="remarks"> <b>Measured By:</b></span><span>' + subOnpackClaimsData[j].MeasuredBy + '</span></td>';
//        if (j === 0) {
//            onPacklabelclaimsHtml += '<td rowspan=' + subOnpackClaimsData.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
//        }
//        onPacklabelclaimsHtml += '</tr>';
//    }

//    onPacklabelclaimsHtml += '<tr style="border: 1px solid grey;">' +
//        '<td colspan="2" style="border-right: 1px solid grey;"><span class="remarks"> <b>Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
//        '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
//        '</tr>' +
//        '</tbody>' +
//        '</table><br>';

//    // Append the current table to your container (change 'container' to your actual container element)
//    container.append(onPacklabelclaimsHtml);
//}
//}


//}

//--------For Communiction claims--------------//

$(".close").on("click", function () {
    $('.onpackView').hide();
    //$('.communicationclaimsWithRemarksDownload').hide();
    $('.communicationView').hide();
    $('.flaticon-delete').show();
    $('.claimsWithRemarksEdit').show();
    //$('.claimsWithRemarksDownload').show();
    if (isEdit == "view") {
        $('.claimsWithRemarksDelete').hide();
        $('.communicationclaimsWithRemarksDelete').hide();
        $('.communicationclaimsWithRemarksEdit').hide();
        $('.claimsWithRemarksEdit').hide();
    } else {
        $('.claimsWithRemarksDelete').show();
        $('.communicationclaimsWithRemarksDelete').show();
        $('.communicationclaimsWithRemarksEdit').show();
        $('.claimsWithRemarksEdit').show();
    }
    //$('.communicationclaimsWithRemarksDownload').show();
    if (Stage == "3") {
        $('.packlabel_claims').text("");
        $(".communication_claims").text("");
    }
    $('.claims_edit').show();
    $('.communication_claims_edit ').show();
    $('.claims_delete').show();
    $('.communication_claims_delete').show();


});

//

//    $(".closemodal").on("click", function () {
//        window.location.href = "/ClaimsGrid/ClaimsGridDocument";
//    });
//});
$('#date_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : moment(claimsData.ClaimsHeadersList[0].Date).format('DD/MM/YYYY'));
$(document).ready(function () {

    $('.MustHaveclaims_v').text($('#MustHaveClaims').val())
    $('.NicetoHaveclaims_v').text($('#NiceToHaveClaims').val())

    // Bind change event to input elements
    $('#LicenseCategory, #otherhubslicensecategory, #Dosage, #TargetOrgan, #FormulaFeatures, #AnchorHUB, #OtherMarkets, #ShelfLife, #DirectionForUse, #Caution, #TargetCustomer,#ProjectNo,#ProductName,#HGLApprovalNumber,#ProductPositioningStatement,#version,#ClaimsDivision').change(function () {

        var selectedval = $('#LicenseCategory').val();
        $('.LicenseCategory_v').text($('#LicenseCategory option[value="' + selectedval + '"]').text())
        $('.otherhubslicensecategory_v').text($('#otherhubslicensecategory').val())
        $('.Dosage_v').text($('#Dosage').val());
        $('.TargetOrgan_v').text($('#TargetOrgan').val());
        $('.FormulaFeatures_v').text($('#FormulaFeatures').val());
        $('.AnchorHUB_v').text($('#AnchorHUB').val());
        $('.OtherMarkets_v').text($('#OtherMarkets').val());
        $('.ShelfLife_v').text($('#ShelfLife').val());
        $('.DirectionForUse_v').text($('#DirectionForUse').val());
        $('.Caution_v').text($('#Caution').val());
        $('.TargetCustomer_v').text($('#TargetCustomer').val());
        $('.projNo_v').text($('#ProjectNo').val());
        $('.prodName_v').text($('#ProductName').val());
        $('.apprNo_v').text($('#HGLApprovalNumber').val());
        //$('#date_v').text($('#date').val());
        $('#version_v').text($('#version').val());
        $('.ProductPositioningStatement_v').text($('#ProductPositioningStatement').val());
        var val = $('#ClaimsDivision').val();
        if (val != "") {
            $('.Division_v').text($('#ClaimsDivision option[value="' + val + '"]').text());
        }
        else {
            $('.Division_v').text("");
        }
    });
});



function validateSendMailForm() {
    $('#PmdReview_SendMail_Button').prop("disabled", false);
    $('#sendMailModal').modal('show');
}

var isTrue = true;

$("#SendMailDepartment").change(function () {
    var DeptIds = $("#SendMailDepartment").val().toString();
    DeptIds = DeptIds;
    jQuery(document).ajaxStart(function () {
        $('#loader').css('visibility', 'hidden');
    });
    jQuery(document).ajaxComplete(function () {
        $('#loader').css('visibility', 'hidden');
    });
    if (isTrue) {
        $.ajax({
            type: "POST",
            url: ROOT + "ClaimsGrid/GetUserEmailBasedOnDept",
            data: { DeptIds: DeptIds },
            dataType: "json",
            success: function (UserEmailResult) {
                if (UserEmailResult != null) {
                    $("option").remove(".DeptUsersOption");
                    var userEmailList = ''
                    $.each(UserEmailResult, function (i, obj) {

                        userEmailList += '<option class="DeptUsersOption ' + obj.Dept + '" value="' + obj.Email + '">' + obj.Dept + ' - ' + obj.Email + '</option>';

                    })
                    $("#Dept_UsersDropdown_SendMail").html(userEmailList);

                    $('#Dept_UsersDropdown_SendMail').multiselect('rebuild');

                    var deptUser = UsersList.split(',');
                    if (deptUser != null) {
                        for (var i = 0; i < deptUser.length; i++) {
                            $("#Dept_UsersDropdown_SendMail option[value='" + deptUser[i] + "']").prop('selected', true);
                        }
                        $("#Dept_UsersDropdown_SendMail").multiselect('refresh');
                    }
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }

});


$('#SendMailAdd_Users').off("click").click(function () {
    var flag = true;

    $('#Dept_UsersDropdown_SendMail').val() == "" ? ($('#Error_SendMail_DeptUsers').show(), flag = false) : ""
    $('#Dept_UsersDropdown_SendMail').val() != "" ? ($('#Error_SendMail_DeptUsers').hide(), flag = true) : ""
    var editorRemarks = $("#SendMail_Remarks").val();

    var deptSelected = $('#SendMailDepartment').find('option:selected').length;
    var deptUsersSelected = $('#Dept_UsersDropdown_SendMail').find('option:selected').length;
    var selectedOptions = $("#Dept_UsersDropdown_SendMail option:selected");
    var departemnts = $('#SendMailDepartment').val();
    var selectedOptions = $("#Dept_UsersDropdown_SendMail option:selected");

    // Initialize an empty Set to store unique labels
    var uniqueLabels = new Set();

    // Loop through the selected options and add their labels to the Set
    selectedOptions.each(function () {
        var label = $(this).text().split('-')[0].trim();
        uniqueLabels.add(label);
    });

    // Convert the Set to an array if needed
    var uniqueLabelsArray = Array.from(uniqueLabels);

    const result = areAllDepartmentsInUniqueLabels(departemnts, uniqueLabelsArray);

    if (deptSelected != 0 && !result) {
        flag = false;
        $('#Error_DeptUsersSelected').show();
    }
    else {
        $('#Error_SendMail_DeptUsers').hide();
    }
    if (flag) {
        $('#SelectedUsersForSendMail').val($('#Dept_UsersDropdown_SendMail').val().toString());
        //$('#Department').val("IRA").multiselect('refresh');
        //$('#Dept_UsersDropdown').val("").multiselect('refresh');
        $("#SendMailDepartment").trigger("change");
        $('#Error_DeptUsersSelected').hide();
        $('#Error_DeptUsers').hide();
        $('#Err_SendMail_Department').hide()
        $('#Error_SendMail_DeptUsers').hide()
    }
    else {
        $('#Error_SendMail_DeptUsers').show()
    }

})

var UsersList = "";
function validatePmdReviewSendMailForm() {
    $('#SendMail_Buttom').prop("disabled", false);
    $.ajax({
        type: "POST",
        url: ROOT + "ClaimsGrid/GetClaimsAllDepartments",
        data: { GridId: GridId, ProjectNumber: ProjectNumber },
        dataType: "json",
        success: function (respond) {

            if (respond != null) {
                var dept = respond.result.Item1.split(',');
                if (dept != null) {
                    for (var i = 0; i < dept.length; i++) {
                        $("#SendMailDepartment option[value=" + dept[i] + "]");
                    }
                    $("#SendMailDepartment").val(dept).multiselect('refresh');

                }
                var responsibleDepart = respond.result.Item1;
                $.ajax({
                    type: "POST",
                    url: ROOT + "ClaimsGrid/GetUserEmailBasedOnDept",
                    data: { DeptIds: responsibleDepart },
                    dataType: "json",
                    success: function (UserEmailResult) {
                        if (UserEmailResult != null) {
                            $("option").remove(".DeptUsersOption");
                            var userEmailList = ''
                            $.each(UserEmailResult, function (i, obj) {

                                userEmailList += '<option class="DeptUsersOption ' + obj.Dept + '" value="' + obj.Email + '">' + obj.Dept + ' - ' + obj.Email + '</option>';

                            })

                            $("#Dept_UsersDropdown_SendMail").html(userEmailList);
                            $('#Dept_UsersDropdown_SendMail').multiselect('rebuild');

                            var deptUser = respond.result.Item2.split(',');
                            if (deptUser != null) {
                                for (var i = 0; i < deptUser.length; i++) {
                                    $("#Dept_UsersDropdown_SendMail option[value='" + deptUser[i] + "']").prop('selected', true);
                                }
                                $("#Dept_UsersDropdown_SendMail").multiselect('refresh');
                            }
                            UsersList = respond.result.Item2;

                        }
                    },
                    error: function () {
                        alert("Error occured!!");
                    }
                });
            }

        },
        error: function () {
            alert("Error occured!!");
        }
    });

    $('#sendMailModal').modal('show');

    $('#SendMail_Buttom').click(function () {

        var flag = true;
        var SelectedUsers = $("#SelectedUsersForSendMail").val();
        SelectedUsers == '' ? ($('#Error_SendMail_DeptUsers').show(), flag = false) : $('#Error_SendMail_DeptUsers').hide();

        if (flag) {
            $('#SendMail_Buttom').prop("disabled", true);
            downloaddocfile("sendmail");
            $('#sendMailModal').modal('hide');

        }

    });
}
function downloaddocfile(frombutton) {

    var SendMail_SelectedUsers = $("#SelectedUsersForSendMail").val();
    var SendMail_Remarks = $("#SendMail_Remarks").val()
    var fd = new FormData();
    var GridId = $('#GridId').val();
    var ProjectNumber = claimsData.ClaimsHeadersList[0].ProjectNumber;
    var fromButton = frombutton;

    $.ajax({
        url: ROOT + "ClaimsGrid/GenerateClaimsPdf",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: { ProjectNumber: ProjectNumber, GridId: GridId },
        async: false,
        success: function (result) {

            $('.GenerateClaimsPdf').html(result);
            var htmldata = $(".GenerateClaimsPdf").html();
            fd.append('JsonString', htmldata)
            $.ajax({
                url: ROOT + 'ClaimsGrid/GeneratePdfHtml',
                type: 'POST',
                dataType: 'HTML',
                data: fd,
                contentType: false,
                processData: false,
                async: false,
                success: function (result) {

                    $.ajax({
                        url: ROOT + 'ClaimsGrid/GeneratePdfforSendmail?toMailids=' + SendMail_SelectedUsers + '&remarks=' + SendMail_Remarks + '&GridId=' + GridId + '&FromButton=' + fromButton,
                        type: 'POST',
                        async: false,
                        success: function () {

                        },
                        error: function () {
                            alert("Error occured!!");
                        }

                    })
                },
                error: function () {
                    alert("Error occured!!");
                }
            })
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

$(window).on('hidden.bs.modal', function () {

    $("#SendMailDepartment").val("").multiselect('refresh');
    $("#Dept_UsersDropdown_SendMail").val("").multiselect('refresh');
    $("#SendMail_Remarks").val("");
    $("#Error_SendMail_DeptUsers").hide();
    $("#SelectedUsersForSendMail").val("");
    //$("#onpack_claims_modal_table tbody").empty();
    //$("#communication_claims_modal_table tbody").empty();
    $("#selectedCFTUsers").val('');
    $("#editor").val('');
    $("#DSG_remarks_text").val('');
    $("#Error_DSG_remarks_text").hide();

    $("#DSG_remarks_text1").val('');
    $("#Error_DSG_remarks_text1").hide();
});

function deleteOnPackData(Rownumber) {
    Rownumber = parseInt(Rownumber);
    $("#jqGridRow_DeleteModal").modal("show");
    $("#jqGridRow_DeleteModal_Ok").off('click');
    $('#jqGridRow_DeleteModal_Ok').click(function () {
        $("#onpack_claims_modal_table tbody tr[data-rownumber='" + Rownumber + "']").remove();
    });
}

function deleteCommunicationData(Rownumber) {
    Rownumber = parseInt(Rownumber);
    $("#jqGridRow_DeleteModal").modal("show");
    $("#jqGridRow_DeleteModal_Ok").off('click');
    $('#jqGridRow_DeleteModal_Ok').click(function () {
        $("#communication_claims_modal_table tbody tr[data-rownumber='" + Rownumber + "']").remove();
    });
}


$("a[href='#OnPackClaimsDetails']").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});

$("a[href='#CommunicationClaimDetails']").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});
$(document).ready(function () {
    if (isEdit == "view") {
        $('.deletedoc').hide();
        $('#open_onpack_modal').hide()
        $('#open_communication_modal').hide();
        $('.communicationclaimsWithRemarksEdit').hide();
        $('.communicationclaimsWithRemarksDelete').hide();
        $('.claimsWithRemarksDelete').hide();
        $('.claimsWithRemarksEdit').hide();
        $('.communicationView').hide()
    }
});
function ViewDocFile(fileName) {
    var imageUrl = ROOT + 'ClaimsReviewFiles/' + fileName;
    window.open(imageUrl, '_blank');
}
function Downloaddoc(fileName) {
    //SupportingDocDownload = $(this).attr('data-attribute');
    fileName = fileName.replaceAll('"', '')
    fileName = fileName.replaceAll('"', '')
    fileName = fileName.replaceAll('/', '')

    if (fileName.length > 0) {
        $('.downloadUploadedDocs').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + fileName + '&location=ClaimsReviewFiles');
        return true;
    }
}

function validateIRAFileUpload(inputElement, rowId) {
    var flag = true;
    var supportedExtention = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv'];
    var fileLength = 0;
    var filesArray = [];

    var fullPath = $(inputElement).val();
    var filesArray = fullPath.replace(/^.*[\\\/]/, '');

    var ext = filesArray.split('.').pop().toLowerCase();

    if (jQuery.inArray(ext, supportedExtention) === -1) {

        alert("The file must be of type: .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .csv");

        $(inputElement).val('');

        flag = false;

        return false;
    }

    if (flag) {
        for (var i = 0; i < filesArray.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(inputElement).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $(inputElement).val('');
                return false;
            }

            var supportedFiles = [];
            var file1 = $(inputElement).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(inputElement).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);
        }
    }
}

function DeleteClaimsRecords(i) {
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {

        $('table.' + tableclass + '_onpackclaims').remove();
        delete packLabelClaimsDetails[tableclass];
        $("#DeleteClaimsPOPUp").modal("hide");

        $("#Claims").val("");
        $(".onPackField").val("");
        $("#FeasibilityClaims").val("");
        $("#FeasibilityClaims").trigger("change");
        CKEDITOR.instances["MeasuredBy"].setData('');
        CKEDITOR.instances["SupportingStmt"].setData('');
        $("#ResponsibleDeptOnPack").val("").multiselect('refresh');

        //$("#ResponsibleDeptOnPack option[value='IRA']").prop("disabled", true);
        //$("#ResponsibleDeptOnPack").val("IRA").multiselect('refresh');
        if (depatmentBasedOnHub != "") {
            for (var i = 0; i < depatmentBasedOnHub.length; i++) {
                if (depatmentBasedOnHub[i] == "RA_INDIA") {
                    $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]");
                }
                else {
                    $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
                }
            }

            var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
                return value.indexOf("RA_INDIA") === -1;
            });
            $("#ResponsibleDeptOnPack").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');
            //$("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub + "]").prop("disabled", true);
            //$("#ResponsibleDeptOnPack").val(depatmentBasedOnHub).multiselect('refresh');
        }

        onpackModelClaims = [];
        isPackLabelClaimsEdit = false;
        packLabelClaimsEditIndex = 0;
        $("#onpack_claims_modal_table tbody").empty();
    });
}

function communication_claims_delete(i) {
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {

        $('table.' + tableclass + '_CommuniClaims').remove();
        delete communicationClaimsDetails[tableclass];
        //communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);
        $("#DeleteClaimsPOPUp").modal("hide");

        $("#CommunicationClaims").val("");
        $("#CommunicationFeasibilityClaims").val("");
        $("#CommunicationFeasibilityClaims").trigger('change');
        $("#CommunicationRemarks").val("")
        CKEDITOR.instances["SupportingTechStmt"].setData('');
        CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
        $("#ResponsibleDeptCommunication").val("").multiselect('refresh');

        //$("#ResponsibleDeptCommunication option[value='IRA']").prop("disabled", true);
        //$("#ResponsibleDeptCommunication").val("IRA").multiselect('refresh');

        if (depatmentBasedOnHub != "") {
            for (var i = 0; i < depatmentBasedOnHub.length; i++) {
                if (depatmentBasedOnHub[i] == "RA_INDIA") {
                    $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]");
                }
                else {
                    $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
                }
            }

            var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
                return value.indexOf("RA_INDIA") === -1;
            });
            $("#ResponsibleDeptCommunication").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');

            //$("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub + "]").prop("disabled", true);
            //$("#ResponsibleDeptCommunication").val(depatmentBasedOnHub).multiselect('refresh');
        }
        communicationModelClaims = [];
        isCommunicationClaimsEdit = false;
        communicationClaimsEditIndex = 0;
        $('#communication_claims_modal_table tbody').empty();

    });
}

function DeleteclaimsWithRemarks(i) {
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {

        $('table.' + tableclass + '_OnpackRemarks').remove();
        delete onPackClaimsWithRemarks[tableclass];
        $("#DeleteClaimsPOPUp").modal("hide");

        $("#Claims").val("");
        $(".onPackField").val("");
        $("#FeasibilityClaims").val("");
        $("#FeasibilityClaims").trigger("change");
        CKEDITOR.instances["MeasuredBy"].setData('');
        CKEDITOR.instances["SupportingStmt"].setData('');

        onpackModelClaims = [];
        isPackLabelClaimsEdit = false;
        packLabelClaimsEditIndex = 0;
        $("#onpack_claims_modal_table tbody").empty();
    });
}

function communicationclaimsWithRemarksDelete(i) {
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {

        $('table.' + tableclass + '_CommuniRemarks').remove();
        delete communicationClaimsWithRemarks[tableclass];
        $("#DeleteClaimsPOPUp").modal("hide");

        $("#CommunicationClaims").val("");
        $("#FeasibilityClaims").trigger("change");
        $("#CommunicationFeasibilityClaims").val("");
        $("#CommunicationFeasibilityClaims").trigger('change');
        $("#CommunicationRemarks").val("")
        CKEDITOR.instances["SupportingTechStmt"].setData('');
        CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');

        communicationModelClaims = [];
        isCommunicationClaimsEdit = false;
        communicationClaimsEditIndex = 0;
        $('#communication_claims_modal_table tbody').empty();

    });
}

$(document).ready(function () {
    if (Stage == '5' && isEdit != 'view') {
        $("#Preview").modal("show");
        $(".claimsWithRemarksEdit").hide();
        $(".claimsWithRemarksDelete").hide();
        $(".communicationclaimsWithRemarksEdit").hide();
        $(".communicationclaimsWithRemarksDelete").hide();
    }
    //$("#ResponsibleDeptOnPack option[value='IRA']").prop("disabled", true);
    //$("#ResponsibleDeptOnPack").val("IRA").multiselect('refresh');

    //$("#ResponsibleDeptCommunication option[value='IRA']").prop("disabled", true);
    //$("#ResponsibleDeptCommunication").val("IRA").multiselect('refresh');

    if (claimsData.ClaimsProductDescription[0].AnchorHUB != "") {
        var anchorhub = claimsData.ClaimsProductDescription[0].AnchorHUB.split(',');
        for (var i = 0; i < anchorhub.length; i++) {
            $("#AnchorHUB option[value = " + anchorhub[i] + "]");
            $("#OtherMarkets option[value=" + anchorhub[i] + "]").prop("disabled", true);
            $("#OtherMarkets").multiselect('refresh');
        }
        $('#AnchorHUB').val(anchorhub).multiselect('refresh');
    }
    else {
        $('#AnchorHUB').val("");
        $("#OtherMarkets").val("");
    }

    if (claimsData.ClaimsProductDescription[0].OtherMarkets != "") {
        var OtherHub = claimsData.ClaimsProductDescription[0].OtherMarkets.split(',');
        for (var i = 0; i < OtherHub.length; i++) {
            $("#OtherMarkets option[value = " + OtherHub[i] + "]");
            $("#AnchorHUB option[value=" + OtherHub[i] + "]").prop("disabled", true);
            $("#AnchorHUB").multiselect('refresh');
        }
        $('#OtherMarkets').val(OtherHub).multiselect('refresh');

    }
    else {
        $('#OtherMarkets').val("");
    }


    if (claimsData.DeptBasedOnHub[0].DeptName != null) {
        depatmentBasedOnHub = claimsData.DeptBasedOnHub[0].DeptName.split(',');

        for (var i = 0; i < depatmentBasedOnHub.length; i++) {
            if (depatmentBasedOnHub[i] == "RA_INDIA") {
                $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]");
                $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]");
            }
            else {
                $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
                $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
            }
        }

        var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
            return value.indexOf("RA_INDIA") === -1;
        });
        $("#ResponsibleDeptOnPack").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');
        $("#ResponsibleDeptCommunication").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');
    }
    if (claimsData.DeptForExcelUpload[0] != undefined) {

        var MandatoryDept = claimsData.DeptForExcelUpload[0].DeptName;
        MandatoryDept = MandatoryDept.split(',');
        if (MandatoryDept.indexOf(department.trim()) == -1) {
            $(".IRADocumentExcel").hide();
        }
    }

    if (Stage == 3) {
        if (claimsData.DeptForExcelUpload[0] != undefined) {

            var MandatoryDept = claimsData.DeptForExcelUpload[0].DeptName;
            MandatoryDept = MandatoryDept.split(',');
            if (MandatoryDept.indexOf(department.trim()) == -1) {
                $(".IRA_Claims_Remarks_icon").hide();

            }
        }
    }
});

var PreviousHub = [];
var depatmentBasedOnHub = "";

$("#AnchorHUB, #OtherMarkets").change(function () {
    var depatmentBasedOnHubwithoutIndia = $.grep(depatmentBasedOnHub, function (value, index) {
        return value.indexOf("RA_INDIA") === -1;
    });
    PreviousHub = depatmentBasedOnHubwithoutIndia;


    var hub = $("#AnchorHUB").val().toString() + ',' + $("#OtherMarkets").val().toString();
    var participatedhub = $("#AnchorHUB").val().toString();

    depatmentBasedOnHub = "";
    var Length = $("#ResponsibleDeptOnPack option").length;

    for (var i = 0; i <= Length - 1; i++) {
        var dept = $("#ResponsibleDeptOnPack option")[i].value
        $("#ResponsibleDeptOnPack option[value=" + dept + "]").prop("disabled", false);
        $("#ResponsibleDeptCommunication option[value=" + dept + "]").prop("disabled", false);

        $("#ResponsibleDeptOnPack").val(dept).multiselect('refresh');
        $("#ResponsibleDeptCommunication").val(dept).multiselect('refresh');
    }

    for (var i = 0; i <= $("#OtherMarkets option").length - 1; i++) {
        var h = $("#OtherMarkets option")[i].value
        $("#OtherMarkets option[value=" + h + "]").prop("disabled", false);
        $("#OtherMarkets").multiselect('refresh');
    }

    var Length1 = $("#Department option").length;

    for (var i = 0; i <= Length1 - 1; i++) {
        var dept = $("#Department option")[i].value
        $("#Department option[value=" + dept + "]").prop("disabled", false);
        $("#Department").val(dept).multiselect('refresh');
    }

    if (participatedhub != "") {
        $.ajax({
            type: "POST",
            url: ROOT + "ClaimsGrid/GetDepartmentBasedOnHub",
            data: { HubName: hub },
            dataType: "json",
            success: function (result) {
                if (result.length != 0) {
                    depatmentBasedOnHub = result[0].DeptName;
                    $("#ResponsibleDeptCommunication").val("").multiselect('refresh');
                    $("#ResponsibleDeptOnPack").val("").multiselect('refresh');
                    if (depatmentBasedOnHub != "" && depatmentBasedOnHub != null) {
                        depatmentBasedOnHub = depatmentBasedOnHub.split(',');
                        for (var i = 0; i <= depatmentBasedOnHub.length; i++) {
                            if (depatmentBasedOnHub[i] == "RA_INDIA") {
                                $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]");
                                $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]");
                            }
                            else {
                                $("#ResponsibleDeptOnPack option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
                                $("#ResponsibleDeptCommunication option[value=" + depatmentBasedOnHub[i] + "]").prop("disabled", true);
                            }
                        }

                        var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
                            return value.indexOf("RA_INDIA") === -1;
                        });
                        $("#ResponsibleDeptOnPack").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');
                        $("#ResponsibleDeptCommunication").val(depatmentBasedOnHubwithoutIndia1).multiselect('refresh');
                    }
                    else {
                        depatmentBasedOnHub = "";
                    }
                }
                else {
                    $("#ResponsibleDeptOnPack").val("").multiselect('refresh');
                    $("#ResponsibleDeptCommunication").val("").multiselect('refresh');
                }
                if (packLabelClaimsDetails.length !== 0) {
                    for (var i = 0; i < packLabelClaimsDetails.length; i++) {
                        var departments = packLabelClaimsDetails[i].ResponsibleDepartment.split(',');
                        departments = departments.filter(function (value) {
                            return PreviousHub.indexOf(value) === -1;
                        });

                        var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
                            return value.indexOf("RA_INDIA") === -1;
                        });

                        departments = departments.concat(depatmentBasedOnHubwithoutIndia1);
                        var uniqueDepartments = Array.from(new Set(departments));
                        packLabelClaimsDetails[i].ResponsibleDepartment = uniqueDepartments.join(',');

                    }
                }

                updateClaimsUi2(packLabelClaimsDetails);
                if (communicationClaimsDetails.length != 0) {

                    for (var i = 0; i < communicationClaimsDetails.length; i++) {
                        var departments1 = communicationClaimsDetails[i].ResponsibleDepartment.split(',');
                        departments1 = departments1.filter(function (value) {
                            return PreviousHub.indexOf(value) === -1;
                        });

                        var depatmentBasedOnHubwithoutIndia2 = $.grep(depatmentBasedOnHub, function (value, index) {
                            return value.indexOf("RA_INDIA") === -1;
                        });
                        departments1 = departments1.concat(depatmentBasedOnHubwithoutIndia2);

                        var uniqueDepartments1 = Array.from(new Set(departments1));
                        communicationClaimsDetails[i].ResponsibleDepartment = uniqueDepartments1.join(',');
                    }
                    updateCommunicationClaimsUi2(communicationClaimsDetails)
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });

        var hubval = participatedhub.split(',');
        for (var i = 0; i <= hubval.length - 1; i++) {
            $("#OtherMarkets option[value=" + hubval[i] + "]").prop("disabled", true);
            $("#OtherMarkets").multiselect('refresh');
        }
    }
    else {
        $("#ResponsibleDeptOnPack").val("").multiselect('refresh');
        $("#ResponsibleDeptCommunication").val("").multiselect('refresh');
        if (packLabelClaimsDetails.length !== 0) {
            for (var i = 0; i < packLabelClaimsDetails.length; i++) {
                var departments = packLabelClaimsDetails[i].ResponsibleDepartment.split(',');
                departments = departments.filter(function (value) {
                    return PreviousHub.indexOf(value) === -1;
                });
                if (depatmentBasedOnHub != "") {
                    departments1 = departments1.concat(depatmentBasedOnHub);
                }
                var uniqueDepartments = Array.from(new Set(departments));
                packLabelClaimsDetails[i].ResponsibleDepartment = uniqueDepartments.join(',');

            }
        }

        updateClaimsUi2(packLabelClaimsDetails);
        if (communicationClaimsDetails.length != 0) {

            for (var i = 0; i < communicationClaimsDetails.length; i++) {
                var departments1 = communicationClaimsDetails[i].ResponsibleDepartment.split(',');
                departments1 = departments1.filter(function (value) {
                    return PreviousHub.indexOf(value) === -1;
                });
                if (depatmentBasedOnHub != "") {
                    departments1 = departments1.concat(depatmentBasedOnHub);
                }
                var uniqueDepartments1 = Array.from(new Set(departments1));
                communicationClaimsDetails[i].ResponsibleDepartment = uniqueDepartments1.join(',');
            }
            updateCommunicationClaimsUi2(communicationClaimsDetails)
        }

        $("#OtherMarkets").val('').multiselect('refresh');
        $("#AnchorHUB option").prop("disabled", false);
        $("#AnchorHUB").val('').multiselect('refresh');
    }
});


colmodels = [
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 160,
        ignoreCase: true,
        resizable: true,
        formatter: function (cellvalue, options, rowobject) {
            var fileName = rowobject.DocumentName.replaceAll('"', '');
            return fileName;
        }
    },

    {
        name: 'UpdatedBy',
        label: 'Uploaded by',
        width: 80,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'DeptName',
        label: 'Department Name',
        width: 70,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UpdatedOn',
        label: 'Uploaded On',
        width: 45,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: '',
        label: 'Action',
        width: 20,
        ignoreCase: true,
        resizable: true,
        formatter: function (cellvalue, options, rowobject) {

            var fileName = rowobject.DocumentName.replaceAll('"', ''); // Remove double quotes
            var fileExtension = fileName.split('.').pop().toLowerCase();

            var docname = encodeURIComponent(rowobject.DocumentName);

            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
                'ppt': 'Microsoft PowerPoint',
                'pptx': 'Microsoft PowerPoint',
                'csv': 'Microsoft Excel Spreadsheet',
            };

            return '<div class="text-left icon_section align-items-left">' +
                '<span class="action-link"><a onclick=DownlodIRADocs("' + docname + '")  class="mr-2 claimsWithRemarksDownload downloadUploadedDocs" title="Download"><i class="flaticon-download color-green" title="Download"></i></a></span>' +
                (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewIRADocs("' + docname + '")  class="mr-2" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
                '</div> ';
        }
    }

],
    $('#Grid_Uploaded_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Grid_Uploaded_Document',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_Uploaded_Document tbody tr");
            var objHeader = $("#Grid_Uploaded_Document tbody tr td");

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

function showMultipleUploadedImages(claimsId, GridId, Type) {
    $.ajax({
        type: "POST",
        url: ROOT + "ClaimsGrid/GetMultipleDepartmentsUploadedDocs",
        data: { GridId: GridId, ClaimsId: claimsId, Type: Type },
        dataType: "json",
        success: function (result) {
            $("#Grid_Uploaded_Document").jqGrid("clearGridData");
            $("#Grid_Uploaded_Document").jqGrid('setGridParam', { data: result });
            $("#Grid_Uploaded_Document").trigger('reloadGrid', [{ page: 1 }]);
            $("#Documents_show_popup").modal('show');
        }
    });
}


function DownlodIRADocs(fileName) {
    SupportingDocDownload = decodeURIComponent(fileName);
    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    SupportingDocDownload = SupportingDocDownload.replaceAll('/', '')

    if (SupportingDocDownload.length > 0) {
        $('.downloadUploadedDocs').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload + '&location=ClaimsReviewFiles');
        return true;
    }
}

function ViewIRADocs(fileName) {
    var SupportingDocDownload = decodeURIComponent(fileName);
    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    SupportingDocDownload = SupportingDocDownload.replaceAll('/', '')
    if (SupportingDocDownload.length > 0) {
        var imageUrl = ROOT + 'ClaimsReviewFile/' + SupportingDocDownload;
        window.open(imageUrl, '_blank');
    }
}





colModel = [
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 250,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UpdatedBy',
        label: 'Uploaded By',
        width: 150,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'DeptName',
        label: 'Department Name',
        width: 80,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UpdatedOn',
        label: 'Uploaded On',
        width: 80,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: '',
        label: 'Action',
        width: 50,
        ignoreCase: true,
        resizable: true,
        formatter: function (cellvalue, options, rowobject) {

            var matches = rowobject.UpdatedBy.match(/\(([^)]+)\)/);

            if (matches && matches[1] == LoginId) {
                return "<div class='text-center'><a class='SupportingCFTUploadedDoc mr-2' onclick='DownloadCFTUploadedExcelDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a>";
            }
            else if (role == "DSG Initiator" || role == "ADMIN" || role == "DSG Manager") {
                return "<div class='text-center'><a class='SupportingCFTUploadedDoc mr-2' onclick='DownloadCFTUploadedExcelDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a>";
            }
            else {
                return "";
            }

        }
    },
]


$('#GridShow_UploadedExcel').jqGrid({
    url: '',
    datatype: 'local',
    data: [],
    mtype: 'GET',
    colModel: colModel,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_GridShow_UploadedExcel',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
        var objRows = $("#GridShow_UploadedExcel tbody tr");
        var objHeader = $("#GridShow_UploadedExcel tbody tr td");

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


$("#UploadedExcelDocuments").click(function () {
    $.ajax({
        url: ROOT + "ClaimsGrid/FetchExcelDocuments",
        type: "post",
        data: { GridId: GridId },
        dataType: "json",
        success: function (response) {

            jQuery('#GridShow_UploadedExcel').jqGrid('clearGridData');
            $("#GridShow_UploadedExcel").jqGrid('setGridParam', { data: response });
            $("#GridShow_UploadedExcel").trigger('reloadGrid', [{ page: 1 }]);

            $('#ShowIRAUploadedExcel').modal("show");
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
})

function DownloadCFTUploadedExcelDoc(rowId) {
    var filename = $('#GridShow_UploadedExcel').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {
        $('.SupportingCFTUploadedDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}

$("#PreviewCFTDocuments").click(function () {
    $.ajax({
        url: ROOT + "ClaimsGrid/FetchExcelDocuments",
        type: "post",
        data: { GridId: GridId },
        dataType: "json",
        success: function (response) {

            jQuery('#GridShow_UploadedExcel').jqGrid('clearGridData');
            $("#GridShow_UploadedExcel").jqGrid('setGridParam', { data: response });
            $("#GridShow_UploadedExcel").trigger('reloadGrid', [{ page: 1 }]);

            $('#ShowIRAUploadedExcel').modal("show");
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
});




$("#OtherMarkets").change(function () {
    var hub = $("#AnchorHUB").val().toString();

    for (var i = 0; i <= $("#AnchorHUB option").length - 1; i++) {
        var h = $("#AnchorHUB option")[i].value
        $("#AnchorHUB option[value=" + h + "]").prop("disabled", false);
        $("#AnchorHUB").multiselect('refresh');
    }
    if (hub != "") {
        var otherhub = $("#OtherMarkets").val().toString();
        if (otherhub != "") {
            var otherval = otherhub.split(',');
            for (var i = 0; i <= otherval.length - 1; i++) {
                $("#AnchorHUB option[value=" + otherval[i] + "]").prop("disabled", true);
                $("#AnchorHUB").multiselect('refresh');
            }
        }
    }
    else {
        alert('Please select the Anchor HUBS/Participating HUBS');
        $("#OtherMarkets").val("").multiselect("refresh");
    }
});


///////////////////////////////Code for Auto Save Started////////////////////////////////////

$(document).ready(function () {
    setInterval(() => {
        if (Stage < 3 && isEdit != 'view') {
            validateEditDataSave();
        }
        if ((Stage == 4 || Stage == 5 || Stage == 6) && isEdit != 'view') {
            validateAfterCFTSave();
        }
        $('#loader').hide();
        $("#loader").css("visibility", "hidden");
    }, 5 * 60 * 1000)
});
function validateEditDataSave(isAutoSave = false) {
    let ProjectNo_ID = $('#ProjectNo').val();
    if (ProjectNo_ID == "" && ProjectNo_ID != null) {
        validSave = false;
        return;
    }
    if (validSave) {
        packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
        communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

        var onPackGridData = JSON.stringify(packLabelClaimsDetails);
        var CommunicationClaimsGridData = JSON.stringify(communicationClaimsDetails);
        var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

        var claimsheaders = [];
        claimsheaders.push({
            ID: $("#GridId").val(),
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            VersionNo: 1,
            StatusId: 2,
        });

        var projectdetails = {
            ID: $("#GridId").val(),
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            Division: $("#ClaimsDivision").val()
        };

        var productdescription = {
            ID: $("#GridId").val(),
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim($("#DirectionForUse").val()),
            Caution: $.trim($("#Caution").val()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };
        var projectbrief = {
            ID: $("#GridId").val(),
            ProjectNumber: $.trim($('#ProjectNo').val()),
            RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
        };

        $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
        $("#ProductDescription").val(JSON.stringify(productdescription));
        $('#ProjectBrief').val(JSON.stringify(projectbrief));

        $("#ProjectDetails").val(JSON.stringify(projectdetails));
        $("#OnPackClaims").val(onPackGridData);
        $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
        $('#Stage').val(2)
        $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
        $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));

        $.ajax({
            url: ROOT + "ClaimsGrid/ClaimsAutoSaveEditData",
            type: 'POST',
            data: $('#EditClaims').serialize(),
            success: function (response) {
            },
            error: function (error) {
            }
        });
    }
}


function validateAfterCFTSave(isAutoSave = false) {
    validSave = true;
    onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);
    if (validSave) {
        var claimsheaders = [];
        claimsheaders.push({
            ID: claimsData ? claimsData.ClaimsHeadersList[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            VersionNo: 1,
            StatusId: Stage,
        });

        var projectdetails = {
            ID: claimsData ? claimsData.ClaimsProjectDetails[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            Division: $("#ClaimsDivision").val()
        };

        var productdescription = {
            ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim($("#DirectionForUse").val()),
            Caution: $.trim($("#Caution").val()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };
        var projectbrief = {
            ID: $("#GridId").val(),
            ProjectNumber: $.trim($('#ProjectNo').val()),
            RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
        };
        
        let Onpack = onPackClaimsWithRemarks.map(ele => ({
            Claims: ele.Claims,
            Feasibility: ele.Feasibility,
            SupportingStmt: ele.SupportingStmt,
            MeasuredBy: ele.MeasuredBy,
            OnPackRemarks: ele.Remarks,
            ResponsibleDepartment: ele.ResponsibleDepartment,
            FromStageNo: ele.FromStageNo,
            ToStageNo: ele.ToStageNo,
            ClaimsId: ele.ClaimsId,
            subOnpackClaims: ele.subOnpackClaims
        }));
        let communication = communicationClaimsWithRemarks.map(ele => ({
            CommunicationClaims: ele.Claims,
            Feasibility: ele.Feasibility,
            SupportingTechStmt: ele.SupportingStmt,
            CommunicationClaimsMeasuredBy: ele.MeasuredBy,
            CommunicationRemarks: ele.Remarks,
            ResponsibleDepartment: ele.ResponsibleDepartment,
            FromStageNo: ele.FromStageNo,
            ToStageNo: ele.ToStageNo,
            ClaimsId: ele.ClaimsId,
            subCommunicationClaims: ele.subCommunicationClaims
        }));


        var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
        $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
        $("#ProductDescription").val(JSON.stringify(productdescription));
        $("#ProjectDetails").val(JSON.stringify(projectdetails));
        $('#ProjectBrief').val(JSON.stringify(projectbrief));
        $("#OnPackClaims").val(JSON.stringify(Onpack));
        $("#CommunicationClaimsData").val(JSON.stringify(communication));
        $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
        $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
        $('#Stage').val(Stage);

        $.ajax({
            url: ROOT + "ClaimsGrid/ClaimsAutoSaveEditData",
            type: 'POST',
            data: $('#EditClaims').serialize(),
            success: function (response) {
            },
            error: function (error) {
            }
        });
    }
}
$("#AnchorHUB").change(function () {
    var hub = $("#AnchorHUB").val().toString();
    for (var i = 0; i <= $("#OtherMarkets option").length - 1; i++) {
        var h = $("#OtherMarkets option")[i].value
        $("#OtherMarkets option[value=" + h + "]").prop("disabled", false);
        $("#OtherMarkets").multiselect('refresh');
    }
    if (hub != "") {
        var hubval = hub.split(',');
        for (var i = 0; i <= hubval.length - 1; i++) {
            $("#OtherMarkets option[value=" + hubval[i] + "]").prop("disabled", true);
            $("#OtherMarkets").multiselect('refresh');
        }
    }
    else {
        for (var i = 0; i <= $("#AnchorHUB option").length - 1; i++) {
            var h = $("#AnchorHUB option")[i].value
            $("#AnchorHUB option[value=" + h + "]").prop("disabled", false);
            $("#AnchorHUB").multiselect('refresh');
        }

        $("#OtherMarkets").val("").multiselect("refresh");
        $("#AnchorHUB").val("").multiselect("refresh");
    }
});



$('#SendmailCancelButton').click(function () {
    $('#sendMailModal').modal('hide');
})
///////////////////////////////////Auto Save Code is Ended////////////////////////////////////

$("#signOff ,#SaveAsAddendum, #AddendumSaveUpdate").off('click').on("click", function () {

    $('#SendToApproval').prop("disabled", false);
    var clickedElementId = $(this).attr("id");
    var formData = new FormData();
    validSave = true;

    $('.mandatory').each(function (i, obj) {
        if ($(this).val() == "") {
            $(this).parent().find('span').show();
            validSave = false;
        }
    })

    onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);

    var OnPackClaimsGridLength = onPackClaimsWithRemarks.length;

    OnPackClaimsGridLength == 0 ? ($('#Err-OnPackGrid').show(), validSave = false) : $('#Err-OnPackGrid').hide();
    let tabsArray = []
    $("#form_project_details").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("info");
            return;
        }
    }); $("form#form_product_description").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("placement");
            return;
        }
    });
    if (OnPackClaimsGridLength == 0) {
        tabsArray.push("schedule");
    }

    let tabsIds = Object.keys(dataSlickIndex);
    tabsArray.map((ele, index) => {
        let index1 = tabsIds.indexOf(ele);
        if (index1 != -1) {
            tabsIds.splice(index1, 1)
        }
    });
    tabsArray.map(ele => {
        $(`li[data-slick-index=${dataSlickIndex[ele]}]`).find('a').css("background-color", "red")
    });
    tabsIds.map(ele => {
        $(`li[data-slick-index=${dataSlickIndex[ele]}]`).find('a').removeAttr("style");
    })
    if (tabsArray.length > 0)
        $(`[data-attr="${tabsArray[0]}"]`).trigger('click');

    if (!validSave) {
        return;

    }
    $('#DSG_Remarks').modal('show');
    $(".Remarks_title").text("");
    $(".DSG_Sign_Remarks_title").show();

    $(".Remarks_title").text(clickedElementId == 'signOff' ? "Are you sure you want to sign off the Claims grid?" : clickedElementId === "SaveAsAddendum" ? "Are you sure you want to save Addendum?" : clickedElementId === "AddendumSaveUpdate" ? "Are you sure you want to save Addendum?" : "Remarks")

    $("#SendToApproval").off("click").click(function () {
        var flag = true;
        $('#DSG_remarks_text').val().trim() == "" ? ($('#Error_DSG_remarks_text').show(), flag = false) : $('#Error_DSG_remarks_text').hide();

        if (flag) {
            var claimsheaders = [];
            claimsheaders.push({
                ID: claimsData ? claimsData.ClaimsHeadersList[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                ProductName: $.trim($('#ProductName').val()),
                HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
                VersionNo: 1,
                StatusId: clickedElementId === "signOff" ? 15 : clickedElementId === "SaveAsAddendum" ? 7 : clickedElementId === "AddendumSaveUpdate" ? Stage : + Stage + 1,
            });

            var projectdetails = {
                ID: claimsData ? claimsData.ClaimsProjectDetails[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                ProductName: $.trim($('#ProductName').val()),
                HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
                ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
                Division: $("#ClaimsDivision").val()
            };

            var productdescription = {
                ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                LicenseCategory: $.trim($('#LicenseCategory').val()),
                Dosage: $.trim($('#Dosage').val()),
                TargetOrgan: $.trim($("#TargetOrgan").val()),
                FormulaFeatures: $.trim($("#FormulaFeatures").val()),
                AnchorHUB: $.trim($("#AnchorHUB").val()),
                OtherMarkets: $.trim($("#OtherMarkets").val()),
                ShelfLife: $.trim($("#ShelfLife").val()),
                DirectionForUse: $.trim($("#DirectionForUse").val()),
                Caution: $.trim($("#Caution").val()),
                TargetCustomer: $.trim($("#TargetCustomer").val()),
                OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
            };
            let Onpack = onPackClaimsWithRemarks.map(ele => ({
                Claims: ele.Claims,
                Feasibility: ele.Feasibility,
                SupportingStmt: ele.SupportingStmt,
                MeasuredBy: ele.MeasuredBy,
                OnPackRemarks: ele.Remarks,
                ResponsibleDepartment: ele.ResponsibleDepartment,
                FromStageNo: ele.FromStageNo,
                ToStageNo: (ele.ClaimsId === "" && clickedElementId === "signOff") ? 15 : (ele.ClaimsId === "" && clickedElementId === "SaveAsAddendum") ? 7 : (ele.ClaimsId === "" && clickedElementId === "AddendumSaveUpdate") ? Stage : ele.ClaimsId === "" ? +Stage + 1 : ele.ToStageNo,
                ClaimsId: ele.ClaimsId,
                subOnpackClaims: ele.subOnpackClaims
            }));
            let communication = communicationClaimsWithRemarks.map(ele => ({
                CommunicationClaims: ele.Claims,
                Feasibility: ele.Feasibility,
                SupportingTechStmt: ele.SupportingStmt,
                CommunicationClaimsMeasuredBy: ele.MeasuredBy,
                CommunicationRemarks: ele.Remarks,
                ResponsibleDepartment: ele.ResponsibleDepartment,
                FromStageNo: ele.FromStageNo,
                ToStageNo: (ele.ClaimsId === "" && clickedElementId === "signOff") ? 15 : (ele.ClaimsId === "" && clickedElementId === "SaveAsAddendum") ? 7 : (ele.ClaimsId === "" && clickedElementId === "AddendumSaveUpdate") ? Stage : ele.ClaimsId === "" ? +Stage + 1 : ele.ToStageNo,
                ClaimsId: ele.ClaimsId,
                subCommunicationClaims: ele.subCommunicationClaims
            }));
            var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

            var ApprovalStatus = [{
                FromStage: Stage,
                ToStage: clickedElementId === "signOff" ? 15 : clickedElementId === "SaveAsAddendum" ? 7 : clickedElementId === "AddendumSaveUpdate" ? Stage : + Stage + 1,
                Remarks: $('#DSG_remarks_text').val(),
                Type: clickedElementId === "signOff" ? "SignOff" : "Approve"
            }];

            var projectbrief = {
                ProjectNumber: $.trim($('#ProjectNo').val()),
                RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
            };

            var status = clickedElementId === "signOff" ? 15 : clickedElementId === "AddendumSaveUpdate" ? Stage : 6

            formData.append("ClaimsHeaders", JSON.stringify(claimsheaders));
            formData.append("ProductDescription", JSON.stringify(productdescription));
            formData.append("ProjectDetails", JSON.stringify(projectdetails));
            formData.append("OnPackClaims", JSON.stringify(Onpack));
            formData.append("ProjectBrief", JSON.stringify(projectbrief));
            formData.append("CommunicationClaimsData", JSON.stringify(communication));
            formData.append("SupportingDocumentData", JSON.stringify(supportingDocument));
            formData.append("DeletedSupportingdocument", JSON.stringify(deleteImageIn_DocGrid));
            formData.append("ApprovalStatus", JSON.stringify(ApprovalStatus));
            formData.append("Stage", status);
            formData.append("GridId", GridId);
            $.ajax({
                url: ROOT + 'ClaimsGrid/SaveSignOffData',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.includes("Successfully Updated")) {
                        $('#SendMail_Buttom').prop("disabled", false);
                        $.ajax({
                            type: "POST",
                            url: ROOT + "ClaimsGrid/GetClaimsAllDepartments",
                            data: { GridId: GridId, ProjectNumber: ProjectNumber },
                            dataType: "json",
                            success: function (respond) {

                                if (respond != null) {
                                    var dept = respond.result.Item1.split(',');
                                    if (dept != null) {
                                        for (var i = 0; i < dept.length; i++) {
                                            $("#SendMailDepartment option[value=" + dept[i] + "]");
                                        }
                                        $("#SendMailDepartment").val(dept).multiselect('refresh');

                                    }
                                    var responsibleDepart = respond.result.Item1;
                                    $.ajax({
                                        type: "POST",
                                        url: ROOT + "ClaimsGrid/GetUserEmailBasedOnDept",
                                        data: { DeptIds: responsibleDepart },
                                        dataType: "json",
                                        success: function (UserEmailResult) {
                                            if (UserEmailResult != null) {
                                                $("option").remove(".DeptUsersOption");
                                                var userEmailList = ''
                                                $.each(UserEmailResult, function (i, obj) {

                                                    userEmailList += '<option class="DeptUsersOption ' + obj.Dept + '" value="' + obj.Email + '">' + obj.Dept + ' - ' + obj.Email + '</option>';

                                                })
                                                $("#Dept_UsersDropdown_SendMail").html(userEmailList);
                                                $('#Dept_UsersDropdown_SendMail').multiselect('rebuild');

                                                var deptUser = respond.result.Item2.split(',');
                                                if (deptUser != null) {
                                                    for (var i = 0; i < deptUser.length; i++) {
                                                        $("#Dept_UsersDropdown_SendMail option[value='" + deptUser[i] + "']").prop('selected', true);
                                                    }
                                                    $("#Dept_UsersDropdown_SendMail").multiselect('refresh');

                                                    UsersList = respond.result.Item2;

                                                }
                                            }
                                        },
                                        error: function () {
                                            alert("Error occured!!");
                                        }
                                    });
                                }

                            },
                            error: function () {
                                alert("Error occured!!");
                            }
                        });
                        $('#SendToApproval').prop("disabled", true);

                        $("#sendMailModal").modal("show");

                        $('#SendMail_Buttom').off("click").click(function () {
                            var flag1 = true;
                            var SelectedUsers = $("#SelectedUsersForSendMail").val();
                            SelectedUsers == '' ? ($('#Error_SendMail_DeptUsers').show(), flag1 = false) : $('#Error_SendMail_DeptUsers').hide();
                            if (flag1) {
                                $('#SendMail_Buttom').prop("disabled", true);
                                downloaddocfile("Ok");
                                $('#sendMailModal').modal('hide');
                                window.location.href = ROOT + 'ClaimsGrid/ClaimsGridDocument'
                            }
                        });
                        $("#SendmailCancelButton").click(function () {
                            window.location.href = ROOT + 'ClaimsGrid/ClaimsGridDocument'
                        });

                    }
                    else {
                        window.location.href = ROOT + 'ClaimsGrid/ClaimsGridDocument'
                    }
                },

            })

        }
    })
})





































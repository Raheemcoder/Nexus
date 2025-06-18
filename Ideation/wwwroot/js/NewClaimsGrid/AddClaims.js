var validSave = true;
var exitingProjectList = [];
var packLabelClaimsDetails = [];
var packLabelClaimsEditIndex = 0;
var isPackLabelClaimsEdit = false;
var communicationClaimsDetails = []
var communicationClaimsEditIndex = 0;
var isCommunicationClaimsEdit = false;
var onpackModelClaims = [];
var communicationModelClaims = [];
var ActualSelectedDepartments = "";
var Username = $('#LoginId').val();
var containerOnPack = $(".packlabel_claims");
var containerComm = $(".communication_claims");
var IsPreviewOpened = 0;

$(document).ready(function () {
    $('.data-singleselect').select2();
    $('body').on('input', '.trimspaces', function () {
        // Remove spaces only at the beginning of the input
        this.value = this.value.replace(/^\s+/g, '');
    });
});
CKEDITOR.replace('ProductPositioningStatement', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.ProductPositioningStatement.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-ProductPositioningStatement").hide();
    }
});

CKEDITOR.replace('FormulaFeatures', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.FormulaFeatures.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-FormulaFeatures").hide();
    }
});

CKEDITOR.replace('RephraseClaims', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'

    // Remove the redundant buttons from toolbar groups defined above.
});

CKEDITOR.instances.RephraseClaims.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
});

CKEDITOR.replace('DirectionForUse', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.DirectionForUse.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-DirectionForUse").hide();
    }
});

CKEDITOR.replace('Caution', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.Caution.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
});

CKEDITOR.replace('OnPackRemarks', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.OnPackRemarks.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
});

CKEDITOR.replace('CommunicationRemarks', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.CommunicationRemarks.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
});

CKEDITOR.replace('MeasuredBy', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.MeasuredBy.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-MeasuredBy").hide();
    }
});

CKEDITOR.replace('SupportingStmt', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-SupportingStmt").hide();
    }
});

CKEDITOR.replace('SupportingTechStmt', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-SupportingTechStmt").hide();
    }
});

CKEDITOR.replace('CommunicationClaimsMeasuredBy', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-CommunicationClaimsMeasuredBy").hide();
    }
});

CKEDITOR.replace('multipleEditors_0', {
    height: 50,
    //width: 280,
    versionCheck: false,
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
    //width: 280,
    versionCheck: false,
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
    //width: 280,
    versionCheck: false,
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
    //width: 280,
    versionCheck: false,
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

CKEDITOR.instances.ProductPositioningStatement.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.FormulaFeatures.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.RephraseClaims.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.DirectionForUse.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.Caution.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.OnPackRemarks.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.CommunicationRemarks.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.MeasuredBy.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.SupportingStmt.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.SupportingTechStmt.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});
CKEDITOR.instances.CommunicationClaimsMeasuredBy.on('blur', function (event) {
    const editor = event.editor;
    var content = editor.getData().replaceAll("&nbsp;", "");
    var trimmedcontent = content.replace(/^\s+/g, '');
    editor.setData(trimmedcontent);
});

$('.data-multiselect').multiselect({
    includeSelectAllOption: true,
    buttonWidth: '100%',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});

var isValid = true;
var CommunicationClaimsEditRowId = 0;
//$("#Claims").on("input", function () {
//    if ($(this).val() != "") {
//        $('#Err-Claims').hide();
//    }
//});
$("#FeasibilityClaims").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-FeasibilityClaims').hide();
    }
});
$("#OnPackRemarks").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-OnPackRemarks').hide();
    }
});
$("#ResponsibleDeptOnPack").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-ResponsibleDeptOnPack').hide();
    }
});
$("#cke_MeasuredBy").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-MeasuredBy').hide();
    }
});

$("#CommunicationFeasibilityClaims").on("input", function () {
    if ($(this).val() != "") {
        $('#Err-CommunicationFeasibilityClaims').hide();
    }
});
//$("#CommunicationClaims").on("input", function () {
//    if ($(this).val() != "") {
//        $('#Err-CommunicationClaims').hide();
//    }
//});
$("#CommunicationRemarks").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-CommunicationRemarks').hide();
    }
});
$("#ResponsibleDeptCommunication").on("input", function () {
    if ($(this).val() != "") {
        $('#Err-ResponsibleDeptCommunication').hide();
    }
});
$("#cke_CommunicationClaimsMeasuredBy").on("input", function () {
    if ($(this).val() != "") {
        $('#Err-ResponsibleDeptCommunication').hide();
    }
});

function onEditCommunicationClaims(RowIdCommunicationClaims) {

    CommunicationClaimsEditRowId = RowIdCommunicationClaims;
    var DataFromGridCommunicationClaims = jQuery('#CommuniactionClaimsGrid').jqGrid('getRowData', CommunicationClaimsEditRowId)
    //$("#CommunicationClaims").val(DataFromGridCommunicationClaims.CommunicationClaims);
    CKEDITOR.instances["CommunicationClaims"].setData(DataFromGridCommunicationClaims.CommunicationClaims);
    $("#CommunicationFeasibilityClaims").val(DataFromGridCommunicationClaims.Feasibility);
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#SupportingTechStmt").val(DataFromGridCommunicationClaims.SupportingTechStmt);
    //$("#OnPackRemarks").val(DataFromGridCommunicationClaims.DSGRemarks);

    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    CKEDITOR.instances["SupportingTechStmt"].setData(DataFromGridCommunicationClaims.SupportingTechStmt);
    CKEDITOR.instances["CommunicationRemarks"].setData(DataFromGridCommunicationClaims.CommunicationRemarks);

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

function onEditOnPackClaims(RowIdOnPack) {

    OnPackDataAddEditRowId = RowIdOnPack;
    var DataFromGridOnPack = jQuery('#OnPackClaimsGrid').jqGrid('getRowData', OnPackDataAddEditRowId)
/*    $("#Claims").val(DataFromGridOnPack.Claims);*/
    CKEDITOR.instances["Claims"].setData(DataFromGridOnPack.Claims);
    $("#FeasibilityClaims").val(DataFromGridOnPack.Feasibility);
    $("#FeasibilityClaims").trigger('change');
    CKEDITOR.instances["MeasuredBy"].setData(DataFromGridOnPack.MeasuredBy);
    CKEDITOR.instances["SupportingStmt"].setData(DataFromGridOnPack.SupportingStmt);
    CKEDITOR.instances["OnPackRemarks"].setData(DataFromGridOnPack.OnPackRemarks);

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

$('.claimsSave').off("click").click(function () {

    validSave = true;

    $('#claimsSaveOk').prop("disabled", false);

    packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
    communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

    let ProjectNo_ID = $('#ProjectNo').val();

    if (ProjectNo_ID == "" && ProjectNo_ID != null) {
        validSave = false;
        $('#Err-ProjectNo').show();
        document.getElementById('ci').scrollIntoView({ behavior: 'smooth' });
        return false;
    }
    else {
        $('#Err-ProductName').hide();
        if (ProjectNo_ID == "Others") {
            if ($('#ProductName').val() == "") {
                $('#Err-ProductName').show();
                document.getElementById('ci').scrollIntoView({ behavior: 'smooth' });
                return false;
            }
        }
        else {
            $('#Err-ProjectNo').hide();
        }
    }

    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
    if (validSave) {
        let packLabel = packLabelClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 2
        }));
        let communication = communicationClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 2
        }));
        var onPackGridData = JSON.stringify(packLabel);
        var CommunicationClaimsGridData = JSON.stringify(communication);

        var claimsheaders = [];
        claimsheaders.push({
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            VersionNo: 1,
            StatusId: 2,
        });

        var projectdetails = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
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
            //FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            FormulaFeatures: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            //DirectionForUse: $.trim($("#DirectionForUse").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            //Caution: $.trim($("#Caution").val()),
            Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };

        $('#SaveModal').modal('show');
        $('#claimsSaveOk').click(function () {

            $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
            $("#ProductDescription").val(JSON.stringify(productdescription));
            $("#ProjectDetails").val(JSON.stringify(projectdetails));
            $("#OnPackClaims").val(onPackGridData);
            $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#ProjectBrief').val(JSON.stringify(projectbrief));

            $('#ClaimsAdd').submit();
            $('#claimsSaveOk').prop("disabled", true);
        });

    }
});
function validateField(field) {
    var fieldValue;
    var isValid = true;
    var id = field.attr('id');
    if (field.attr('id') && CKEDITOR.instances[field.attr('id')]) {
        fieldValue = $.trim(CKEDITOR.instances[field.attr('id')].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim());
    } else {
        fieldValue = $.trim(field.val());
    }
    if (fieldValue === "") {
        $('#Err-' + id).show()
        isValid = false;
    } else {
        $('#Err-' + id).hide()
    }
    return isValid;
}

$('.SendToCFT').off('click').click(function () {
    $('#Dept_PMdUsers').val('');
    $('#Dept_PMdUsers').multiselect('refresh')
    $('#SelectedPMDUsers').val('')
    $('#selectedCFTUsers').val('')
    $('#editor').val('')

    validSave = true;
    $('#SaveDetails').prop("disabled", false);
    $('.mandatory').each(function (i, obj) {
        if (!validateField($(this))) {
            if (validSave) {
                document.getElementById(($(this).closest(`.details_section`)).parent().prop('id')).scrollIntoView({ behavior: 'smooth' });
            }
            validSave = false;
        }
    });

    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

    packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
    communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

    var OnPackClaimsGridLength = packLabelClaimsDetails.length;
    var CommunicationClaimsGridLength = communicationClaimsDetails.length;

    OnPackClaimsGridLength == 0 ?
        ($('#Err-OnPackGrid').show(),
            validSave == true ? document.getElementById(($("#Err-OnPackGrid").closest(`.details_section`)).parent().prop('id')).scrollIntoView({ behavior: 'smooth' }) : '',
            validSave = false) :
        $('#Err-OnPackGrid').hide();

    if (validSave) {
        $.each(packLabelClaimsDetails, function (k, obj) {
            if (obj.ResponsibleDepartment == "" || obj.ResponsibleDepartment === null) {
                document.getElementById(($("." + k + "_onpackclaims").closest(`.details_section`)).parent().prop('id')).scrollIntoView({ behavior: 'smooth' });
                alert("Please select Responsible Department in all OnPack claims");
                validSave = false;
                return false;
            }
        });
        $.each(communicationClaimsDetails, function (l, obj) {
            if (obj.ResponsibleDepartment == "" || obj.ResponsibleDepartment === null) {
                document.getElementById(($("." + l + "_CommuniClaims").closest(`.details_section`)).parent().prop('id')).scrollIntoView({ behavior: 'smooth' });
                alert("Please select Responsible Department in all Communication claims")
                validSave = false;
                return false;
            }
        });
    }

    if (validSave) {

        let packLabel = packLabelClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 3
        }));
        let communication = communicationClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 3
        }));

        var onPackGridData = JSON.stringify(packLabel);
        var CommunicationClaimsGridData = JSON.stringify(communication);

        let clonedClaims = JSON.parse(JSON.stringify([...packLabelClaimsDetails, ...communicationClaimsDetails]));
        let responsibleDepartment = clonedClaims.flatMap(claim => claim.ResponsibleDepartment.split(","));
        if (depatmentBasedOnHub != '') {
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
            //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
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
            //FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            FormulaFeatures: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            Caution: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };

        $('#SendCFTModal').modal('show');
        $('#SaveDetails').click(function () {

            var flag = true;
            $('#selectedCFTUsers').val() == "" ? ($('#Error_SelectCFTUser').show(), flag = false) : $('#Error_SelectCFTUser').hide();

            if (flag) {

                var DeptDetails = {
                    Remarks: $('#editor').val(),
                    DeptUsers: $('#selectedCFTUsers').val(),
                    Depts: $('#Department').val(),
                    PMDUsers: $('#SelectedPMDUsers').val(),
                }
                var ApprovalStatus = {
                    FromStage: 1,
                    ToStage: 3,
                    Remarks: $('#editor').val(),
                };

                $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
                $("#ProductDescription").val(JSON.stringify(productdescription));
                $("#ProjectDetails").val(JSON.stringify(projectdetails));
                $("#OnPackClaims").val(onPackGridData);
                $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
                //$('#SupportingDoc').val(fileName);
                $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
                $('#ApprovalStatus').val(JSON.stringify(ApprovalStatus));
                $('#DeptDetails').val(JSON.stringify(DeptDetails));
                $('#ProjectBrief').val(JSON.stringify(projectbrief));
                $('#ClaimsAdd').submit();
                $('#SaveDetails').prop("disabled", true);
            }
        });

    }
});

$('.mandatory').on('change keyup', function () {

    var id = $(this)[0].id;
    var value = $(this).val();
    if (value == '' || value == null) {
        $("#Err-" + id).show();
    }
    else {
        $("#Err-" + id).hide();
    }

});

$('#ProjectNo').change(function () {
    $('#ProjectBriefId').text("Project Brief");
    $('.ProjectBriefId_V').text("Project Brief");
    var projNo = $(this).val();

    if (projNo != "" && projNo != "Others") {
        $.ajax({
            type: "POST",
            url: ROOT + "NewClaimsGrid/GetDataByProjectNo",
            data: { projNo: projNo },
            dataType: "json",
            success: function (result) {
                if (result.length > 0) {
                    $('#ProductName').val(result[0].ProductName == null ? "null" : result[0].ProductName);
                    $('#HGLApprovalNumber').val(result[0].HGLApprovalNumber == null ? "null" : result[0].HGLApprovalNumber);

                    $(".HGLApprovalNumber_v").text($('#HGLApprovalNumber').val())
                } else {
                    $('#ProductName').val("");
                    $('#HGLApprovalNumber').val("");
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });
        $.ajax({
            type: "POST",
            url: ROOT + "NewClaimsGrid/GetRquiredClaimsDetails",
            data: { projNo: projNo },
            dataType: "json",
            success: function (result) {
                if (result.length > 0) {
                    $('#NiceToHaveClaims').val(result[0].NiceToHaveClaims == null ? "null" : result[0].NiceToHaveClaims);
                    $('#MustHaveClaims').val(result[0].MustHaveClaims == null ? "null" : result[0].MustHaveClaims);
                    if (result[0].ProjectBriefId !== null) {
                        $('#ProjectBriefId').text("Project Brief - " + (result[0].ProjectBriefId == null ? "" : result[0].ProjectBriefId));
                    }

                    $('.ProjectBriefId_V').text($('#ProjectBriefId').text());

                }
                else {
                    $('#NiceToHaveClaims').val("");
                    $('#MustHaveClaims').val("");
                    $('#ProjectBrieId').text("");
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
    else {
        $('#ProductName').val("");
        $('#HGLApprovalNumber').val("");
    }
});

$("#Department").change(function () {

    var DeptIds = $("#Department").val().toString();
    const isTrue = checkUnselectedDefaultValues();

    var depatmentBasedOnHubwithoutIndia = $.grep(depatmentBasedOnHub, function (value, index) {
        return value.indexOf("RA_INDIA") === -1;
    });
    DeptIds = DeptIds + "," + depatmentBasedOnHubwithoutIndia;
    if (isTrue) {
        $.ajax({
            type: "POST",
            url: ROOT + "NewClaimsGrid/GetUserEmailBasedOnDept",
            data: { DeptIds: DeptIds },
            dataType: "json",
            success: function (UserEmailResult) {
                if (UserEmailResult != null) {
                    $("option").remove(".DeptUsersOption");
                    var userEmailList = ''
                    $.each(UserEmailResult, function (i, obj) {

                        userEmailList += '<option class="DeptUsersOption ' + obj.Dept + '" value="' + obj.Email + '">' + obj.Dept + ' - ' + obj.Email + '</option>';

                    });
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

$('#CFTUsersAdd').click(function () {
    var flag = true;
    var editorRemarks = $("#editor").val();

    $('#Dept_UsersDropdown').val() == "" ? ($('#Error_DeptUsersSelected').show(), flag = false) : ""
    $('#Dept_UsersDropdown').val() != "" ? ($('#Error_DeptUsersSelected').hide(), flag = true) : ""
    if (editorRemarks && editorRemarks.trim()) {
        $("#error_cft_remarks").hide();
    } else {
        $("#error_cft_remarks").show();
        flag = false;
    }
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

});

//---------------------------------------------------------------Auto Save
let autoSaveInterval;
let firstInterval = true;
function stopAutoSave() {
    clearInterval(autoSaveInterval);
    firstInterval = true;
}
function saveChanges(isUpdate = false) {

    var onPackGridData = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'data');
    var CommunicationClaimsGridData = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'data');

    var claimsheaders = [];
    claimsheaders.push({
        ProjectNumber: $.trim($('#ProjectNo').val()),
        ProductName: $.trim($('#ProductName').val()),
        HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
        VersionNo: 1,
        StatusId: 2,
    });

    var projectdetails = {
        ProjectNumber: $.trim($('#ProjectNo').val()),
        ProductName: $.trim($('#ProductName').val()),
        HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
        ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),

        Division: $("#ClaimsDivision").val()
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
        DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
        Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
        TargetCustomer: $.trim($("#TargetCustomer").val()),
    };

    var fileName = "";
    var files = $('#supportingDocument').prop("files");

    var formData = new FormData();
    jQuery(document).ajaxStart(function () {
        $('#loader').css('visibility', 'hidden');
    });
    jQuery(document).ajaxComplete(function () {
        $('#loader').css('visibility', 'hidden');
    });
    if (!isUpdate) {
        if (files.length > 0) {
            formData.append("file", files[0]);
            $.ajax({
                type: 'POST',
                url: ROOT + "NewClaimsGrid/SaveSupportingDocument",
                async: false,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    fileName = data;
                }
            });
        }
    }

    var information = {
        ClaimsHeaders: JSON.stringify(claimsheaders),
        ProductDescription: JSON.stringify(productdescription),
        ProjectDetails: JSON.stringify(projectdetails),
        OnPackClaims: JSON.stringify(onPackGridData),
        CommunicationClaimsData: JSON.stringify(CommunicationClaimsGridData),
        SupportingDoc: fileName,
        InitiatedBy: "",
        ApprovalStatus: isUpdate ? "" : "",
        DeptDetails: isUpdate ? "" : "",
    }

    if (isUpdate) {
        $.ajax({
            type: 'POST',
            url: ROOT + "NewClaimsGrid/AutoUpdate",
            data: { information: information },
            success: function (result) {
            },
            error: function (xhr, status, error) {
            }
        });
    } else {
        $.ajax({
            type: 'POST',
            url: ROOT + "NewClaimsGrid/AutoSave",
            data: { information: information },
            success: function (result) {
            },
            error: function (xhr, status, error) {
            }
        });
    }

}

$(document).ready(function () {

    $("#ProjectNo").change(function () {
        const selectedValue = $(this).val();
        if (selectedValue !== "") {
        } else {
            stopAutoSave();
        }
    });

    $(window).on("beforeunload", function () {
        stopAutoSave();
    });
});

//----------------------------------------------------------------On Pack label claims and On Pack Data
$('#OnPackDataAdd').click(function () {

    if ($("#AnchorHUB").val() != "") {

        let measureByContent = CKEDITOR.instances["MeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let SupportingStmt = CKEDITOR.instances["SupportingStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let onpackClaims = CKEDITOR.instances["Claims"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let isValidInform = true;

        if (onpackClaims == "" || $("#FeasibilityClaims").val() == "" || measureByContent == "" || SupportingStmt == "" || $("#ResponsibleDeptOnPack").val()) {
            onpackClaims == "" ? ($('#Err-Claims').show(), isValidInform = false) : $('#Err-Claims').hide();
            $("#FeasibilityClaims").val() == "" ? ($('#Err-FeasibilityClaims').show(), isValidInform = false) : $('#Err-FeasibilityClaims').hide();
            measureByContent == "" ? ($('#Err-MeasuredBy').show(), isValidInform = false) : $('#Err-MeasuredBy').hide();
            SupportingStmt == "" ? ($('#Err-SupportingStmt').show(), isValidInform = false) : $('#Err-SupportingStmt').hide();
            if (depatmentBasedOnHub == "") {
                $("#ResponsibleDeptOnPack").val() == "" ? ($('#Err-ResponsibleDeptOnPack').show(), isValidInform = false) : $('#Err-ResponsibleDeptOnPack').hide();
            }
            //$.trim($("#OnPackRemarks").val()) == "" ? ($('#Err-OnPackRemarks').show(), isValidInform = false) : $('#Err-OnPackRemarks').hide();
            else if (depatmentBasedOnHub.length == 1 && depatmentBasedOnHub.includes("RA_INDIA")) {
                $("#ResponsibleDeptOnPack").val() == "" ? ($('#Err-ResponsibleDeptOnPack').show(), isValidInform = false) : $('#Err-ResponsibleDeptOnPack').hide();
            }
        }

        if (isValidInform) {

            $("#Err-OnPackGrid").hide();
            if (isPackLabelClaimsEdit) {
                onpackModelClaims.splice(0, 1, { supportstatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) });
            }
            else {
                onpackModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) });
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
                Claims: $.trim(CKEDITOR.instances["Claims"].getData()),
                Feasibility: $.trim($("#FeasibilityClaims").val()),
                SupportingStmt: $.trim(CKEDITOR.instances["SupportingStmt"].getData()),
                MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()),
                //OnPackRemarks: $.trim($("#OnPackRemarks").val()),
                OnPackRemarks: $.trim(CKEDITOR.instances["OnPackRemarks"].getData()),

                ResponsibleDepartment: $("#ResponsibleDeptOnPack").val().toString() + dept,
                subOnpackClaims: onpackModelClaims
            }

            if (isPackLabelClaimsEdit) {
                isPackLabelClaimsEdit = false;
                packLabelClaimsDetails.splice(packLabelClaimsEditIndex, 1, packLabelClaimsItem);
            } else {
                packLabelClaimsDetails.push(packLabelClaimsItem)
            }

            packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);

            AddOnPackClaimsToUI(packLabelClaimsDetails)
        }
    }
    else {
        alert("Please select the Participating/Anchor/Primary Hubs in Product Description");
    }
});
function AddOnPackClaimsToUI(claimsDetails) {

    containerOnPack.empty()

    for (var i = 0; i < claimsDetails.length; i++) {

        var item = claimsDetails[i];

        var itemHtml3 = '<table style="width:100%;" class="' + i + '_onpackclaims ship_to">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th class="" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button"title="Edit" class="claims_edit claims_action_btn pv-icon-hide btn btn-sm" data-index="' + i + '"><a href="#OnPackClaimsDetails" class=""><i class="fas fa-pen" aria-hidden="true"></i></a></button>' +
            '<button type="button"  onclick="DeleteClaimsRecords(' + i + ')" title="Delete" class="claims_delete claims_action_btn color-delete pv-icon-hide btn btn-sm" data-index="' + i + '"><i class="fas fa-trash" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (let j = 0; j < item.subOnpackClaims.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:60%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + item.subOnpackClaims[j].supportstatement + '</td>' +
                '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.subOnpackClaims[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + item.subOnpackClaims.length + ' colspan="1" style="width:25%;"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }

        itemHtml3 += '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
            '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';

        containerOnPack.append(itemHtml3);
    }

    //$("#Claims").val("");
    CKEDITOR.instances["Claims"].setData('');
    $("#OnPackRemarks").val("")
    $("#FeasibilityClaims").val("");
    $("#FeasibilityClaims").trigger("change");
    CKEDITOR.instances["MeasuredBy"].setData('');
    CKEDITOR.instances["SupportingStmt"].setData('');
    CKEDITOR.instances["OnPackRemarks"].setData('');

    $("#ResponsibleDeptOnPack").val("").multiselect('refresh');

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
    }

    $('#onpack_claims_modal_table tbody').empty();
    onpackModelClaims = [];

}
$(".open_onpack_modal").click(function () {

    if (IsPreviewOpened == 0) {
        $("#add_onpack_support_measuredby").trigger("click");
    }
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

});
$("#add_onpack_support_measuredby, #onpack_claims_modal_save").on("click", function () {

    var allRowsFilled = true;
    var clickedElementId = $(this).attr("id");
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
                supportstatement: CKEDITOR.instances['multipleEditors_' + rownumber + ''].getData(),
                MeasuredBy: CKEDITOR.instances['multipleMeasuredEditors_' + rownumber + ''].getData()
            };
            dataArray.push(rowData);
        });

        onpackModelClaims = dataArray;
        if (isPackLabelClaimsEdit) {
            onpackModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) });
        }
        $("#onpackclaims_modal").modal("hide");
    }
});
containerOnPack.on("click", ".claims_edit", function () {

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    var item = packLabelClaimsDetails[index];
    packLabelClaimsEditIndex = index;
    isPackLabelClaimsEdit = true;
    //$("#Claims").val(item.Claims);
    CKEDITOR.instances["Claims"].setData(item.Claims)
    $("#FeasibilityClaims").val(item.Feasibility);
    $("#FeasibilityClaims").trigger('change');
    //$("#SupportingStmt").val(DataFromGridOnPack.SupportingStmt);
    CKEDITOR.instances["MeasuredBy"].setData(item.MeasuredBy);
    CKEDITOR.instances["SupportingStmt"].setData(item.SupportingStmt);
    CKEDITOR.instances["OnPackRemarks"].setData(item.OnPackRemarks);
    var values = item.ResponsibleDepartment;
    var newVal = values.split(',')
    $("#ResponsibleDeptOnPack").val(newVal);
    $("#ResponsibleDeptOnPack").multiselect("refresh");
    onpackModelClaims = item.subOnpackClaims;

    onpackModelClaims = onpackModelClaims.filter(row => row.length !== 0);

    updateOnpackClaimsModalWhileEdit(onpackModelClaims);

});
function updateOnpackClaimsModalWhileEdit(itemArray) {
    for (var i = 0; i < itemArray.length; i++) {
        if (i !== 0) {
            var addRow = ''
            addRow += '<tr data-rownumber=' + i + '>' +
                '<td class="paddingRight"><textarea name="textarea1" rows = "2" id="multipleEditors_' + i + '" cols = "50" class="form-control form-control-sm  mt-2" >' + itemArray[i].supportstatement + '</textarea > <span style="color:red; display:none" id="Error_multipleEditors_' + i + '">Please Enter Support Statements</span></td>' +
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

    for (let i = 0; i < itemArray.length; i++) {
        if (i !== 0) {
            var addRow = ''
            addRow += '<tr data-rownumber=' + i + '>' +
                '<td class="paddingRight"><textarea name="textarea1" rows = "2" cols = "50" id="communication_multipleEditors_' + i + '" class="form-control form-control-sm  mt-2" >' + itemArray[i].supportstatement + '</textarea > <span style="color:red; display:none" id="Error_communication_multipleEditors_' + i + '">Please Enter Support Statements</span></td>' +
                '<td class="paddingLeft"><textarea name="textarea2" rows="2" cols="50" id="communication_multipleMeasuredEditors_' + i + '" class="form-control form-control-sm  mt-2">' + itemArray[i].MeasuredBy + '</textarea><span style="color:red; display:none" id="Error_communication_multipleMeasuredEditors_' + i + '">Please Enter Measured by</span></td>' +
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
function deleteOnPackData(Rownumber) {
    Rownumber = parseInt(Rownumber);
    $("#jqGridRow_DeleteModal").modal("show");
    $("#jqGridRow_DeleteModal_Ok").off('click');
    $('#jqGridRow_DeleteModal_Ok').click(function () {
        $("#onpack_claims_modal_table tbody tr[data-rownumber='" + Rownumber + "']").remove();
    });
}
function DeleteClaimsRecords(i) {
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {
        $('table.' + tableclass + '_onpackclaims').remove();
        delete packLabelClaimsDetails[tableclass];
        //packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
        $("#DeleteClaimsPOPUp").modal("hide");

        //$("#Claims").val("");
        CKEDITOR.instances["Claims"].setData('');
        $("#FeasibilityClaims").val("");
        $(".onPackField").val("");
        $("#FeasibilityClaims").trigger("change");
        CKEDITOR.instances["MeasuredBy"].setData('');
        CKEDITOR.instances["SupportingStmt"].setData('');
        CKEDITOR.instances["OnPackRemarks"].setData('');
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

//---------------------------------------------------------------Communication claims and Communication data
$('#CommunicationClaimsDataAdd').click(function () {

    if ($("#AnchorHUB").val() != "") {
        let communicationMeasuredByContent = CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let SupportingTechStmt = CKEDITOR.instances["SupportingTechStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let CommunicationClaims = CKEDITOR.instances["CommunicationClaims"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let isValidInform = true;
        if (CommunicationClaims == "" || $("#CommunicationFeasibilityClaims").val() == "" || communicationMeasuredByContent == "" || SupportingTechStmt == "" || $("#ResponsibleDeptCommunication").val() == "") {
            CommunicationClaims == "" ? ($('#Err-CommunicationClaims').show(), isValidInform = false) : $('#Err-CommunicationClaims').hide();
            $("#CommunicationFeasibilityClaims").val() == "" ? ($('#Err-CommunicationFeasibilityClaims').show(), isValidInform = false) : $('#Err-CommunicationFeasibilityClaims').hide();
            communicationMeasuredByContent == "" ? ($('#Err-CommunicationClaimsMeasuredBy').show(), isValidInform = false) : $('#Err-CommunicationClaimsMeasuredBy').hide();
            SupportingTechStmt == "" ? ($('#Err-SupportingTechStmt').show(), isValidInform = false) : $('#Err-SupportingTechStmt').hide();

            if (depatmentBasedOnHub == "") {
                $("#ResponsibleDeptCommunication").val() == "" ? ($('#Err-ResponsibleDeptCommunication').show(), isValidInform = false) : $('#Err-ResponsibleDeptCommunication').hide();
            }//$.trim($("#CommunicationRemarks").val()) == "" ? ($('#Err-CommunicationRemarks').show(), isValidInform = false) : $('#Err-CommunicationRemarks').hide();
            else if (depatmentBasedOnHub.length == 1 && depatmentBasedOnHub.includes("RA_INDIA")) {
                $("#ResponsibleDeptCommunication").val() == "" ? ($('#Err-ResponsibleDeptCommunication').show(), isValidInform = false) : $('#Err-ResponsibleDeptCommunication').hide();
            }
        }
        if (isValidInform) {
            $("#Err-CommunicationClaimsGrid").hide();
            if (isCommunicationClaimsEdit) {
                communicationModelClaims.splice(0, 1, { supportstatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) });
            } else {
                communicationModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) });
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
               /* CommunicationClaims: $.trim($("#CommunicationClaims").val()),*/
                CommunicationClaims: $.trim(CKEDITOR.instances["CommunicationClaims"].getData()),
                Feasibility: $.trim($("#CommunicationFeasibilityClaims").val()),
                SupportingTechStmt: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()),
                CommunicationClaimsMeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()),
                //CommunicationRemarks: $.trim($("#CommunicationRemarks").val()),
                CommunicationRemarks: $.trim(CKEDITOR.instances["CommunicationRemarks"].getData()),
                ResponsibleDepartment: $.trim($("#ResponsibleDeptCommunication").val().toString() + dept),
                subCommunicationClaims: communicationModelClaims
            }
            if (isCommunicationClaimsEdit) {
                isCommunicationClaimsEdit = false;
                communicationClaimsDetails.splice(communicationClaimsEditIndex, 1, communicationClaimsItem);
            } else {
                communicationClaimsDetails.push(communicationClaimsItem)
            }

            communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

            AddCommClaimsToUI(communicationClaimsDetails);
        }
    }
    else {
        alert("Please select the Participating/Anchor/Primary Hubs in Product Description");
    }
});
function AddCommClaimsToUI(claimsDetails) {

    containerComm.empty();

    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];

        var itemHtml3 = '<table style="width:100%;" class="' + i + '_CommuniClaims ship_to">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
            '<th class="" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="communication_claims_edit claims_action_btn  pv-icon-hide btn btn-sm" data-index="' + i + '"><a href="#CommunicationClaimDetails"><i class="fas fa-pen" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete"  onclick="communication_claims_delete(' + i + ')" class="communication_claims_delete claims_action_btn color-delete pv-icon-hide btn btn-sm" data-index="' + i + '"><i class="fas fa-trash" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (let j = 0; j < item.subCommunicationClaims.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + item.subCommunicationClaims[j].supportstatement + '</td>' +
                '<td colspan="1" style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.subCommunicationClaims[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + item.subCommunicationClaims.length + ' colspan="1" style="width:25%;"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }

        itemHtml3 += '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.CommunicationRemarks + '</span></td>' +
            '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';

        containerComm.append(itemHtml3);
    }

   // $("#CommunicationClaims").val("")
    CKEDITOR.instances["CommunicationClaims"].setData('');
    $('.claimsField').val("");
    $("#CommunicationFeasibilityClaims").val("");
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#CommunicationRemarks").val("")
    CKEDITOR.instances["SupportingTechStmt"].setData('');
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
    CKEDITOR.instances["CommunicationRemarks"].setData('');

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
$(".open_communication_modal").click(function () {

    if (IsPreviewOpened == 0) {
        $("#add_communication_support_measuredby").trigger("click");
    }

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

});
$("#add_communication_support_measuredby, #communication_claims_modal_save").on("click", function () {

    var allRowsFilled = true;
    var clickedElementId = $(this).attr("id");
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
            var rowData = {
                supportstatement: CKEDITOR.instances['communication_multipleEditors_' + rownumber + ''].getData(),
                MeasuredBy: CKEDITOR.instances['communication_multipleMeasuredEditors_' + rownumber + ''].getData()
            };
            dataArray.push(rowData);
        });

        communicationModelClaims = dataArray;
        if (isCommunicationClaimsEdit) {
            communicationModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) });
        }
        $("#communicationclaims_modal").modal("hide");
    }

});
containerComm.on("click", ".communication_claims_edit", function () {
    // var index = $(this).data("index"); // Get the data-index attribute

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }
    var item = communicationClaimsDetails[index]; // Get the edit item using the index
    //
    communicationClaimsEditIndex = index;
    isCommunicationClaimsEdit = true;
    //$("#CommunicationClaims").val(item.CommunicationClaims);
    CKEDITOR.instances["CommunicationClaims"].setData(item.CommunicationClaims);
    $("#CommunicationFeasibilityClaims").val(item.Feasibility);
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#SupportingTechStmt").val(item.SupportingTechStmt);
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData(item.CommunicationClaimsMeasuredBy);
    CKEDITOR.instances["SupportingTechStmt"].setData(item.SupportingTechStmt);
    CKEDITOR.instances["CommunicationRemarks"].setData(item.CommunicationRemarks);
    //$("#CommunicationClaimsMeasuredBy").val(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    //$("#CommunicationRemarks").val(item.CommunicationRemarks);
    $("#ResponsibleDeptCommunication").val(item.ResponsibleDepartment)
    var values = item.ResponsibleDepartment;
    var newVal = values.split(',')
    $("#ResponsibleDeptCommunication").val(newVal);
    $("#ResponsibleDeptCommunication").multiselect("refresh")
    communicationModelClaims = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";

    var communicationModelClaims = communicationModelClaims.filter(row => row.length !== 0);

    updateCommunicationClaimsModalWhileEdit(communicationModelClaims);
});
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
});
function deleteCommunicationData(Rownumber) {
    Rownumber = parseInt(Rownumber);
    $("#jqGridRow_DeleteModal").modal("show");
    $("#jqGridRow_DeleteModal_Ok").off('click');
    $('#jqGridRow_DeleteModal_Ok').click(function () {
        $("#communication_claims_modal_table tbody tr[data-rownumber='" + Rownumber + "']").remove();
    });
}
function communication_claims_delete(i) {
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {

        $('table.' + tableclass + '_CommuniClaims').remove();
        delete communicationClaimsDetails[tableclass];
        $("#DeleteClaimsPOPUp").modal("hide");

        //$("#CommunicationClaims").val("");
        CKEDITOR.instances["CommunicationClaims"].setData('');
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
//------------------------------------------------------------------ Form fields
function checkUnselectedDefaultValues() {
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

var depatmentBasedOnHub = "";
var PreviousHub = [];

$("#AnchorHUB, #OtherMarkets").change(function () {
    PreviousHub = depatmentBasedOnHub;

    var hub = $("#AnchorHUB").val().toString() + ',' + $("#OtherMarkets").val().toString();

    var participatedhub = $("#AnchorHUB").val().toString();

    depatmentBasedOnHub = "";
    $("#Err-ResponsibleDeptCommunication").hide();
    $("#Err-ResponsibleDeptOnPack").hide();
    var Length = $("#ResponsibleDeptOnPack option").length;

    for (var i = 0; i <= Length - 1; i++) {
        var dept = $("#ResponsibleDeptOnPack option")[i].value
        $("#ResponsibleDeptOnPack option[value=" + dept + "]").prop("disabled", false);
        $("#ResponsibleDeptCommunication option[value=" + dept + "]").prop("disabled", false);

        $("#ResponsibleDeptOnPack").val(dept).multiselect('refresh');
        $("#ResponsibleDeptCommunication").val(dept).multiselect('refresh');
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
            url: ROOT + "NewClaimsGrid/GetDepartmentBasedOnHub",
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
                        var depatmentBasedOnHubwithoutIndia2 = $.grep(depatmentBasedOnHub, function (value, index) {
                            return value.indexOf("RA_INDIA") === -1;
                        });
                        $("#ResponsibleDeptOnPack").val(depatmentBasedOnHubwithoutIndia2).multiselect('refresh');
                        $("#ResponsibleDeptCommunication").val(depatmentBasedOnHubwithoutIndia2).multiselect('refresh');
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
                    AddOnPackClaimsToUI(packLabelClaimsDetails);
                }

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
                    AddCommClaimsToUI(communicationClaimsDetails)
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
                    departments = departments.concat(depatmentBasedOnHub);
                }
                var uniqueDepartments = Array.from(new Set(departments));
                packLabelClaimsDetails[i].ResponsibleDepartment = uniqueDepartments.join(',');

            }
            AddOnPackClaimsToUI(packLabelClaimsDetails);
        }

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
            AddCommClaimsToUI(communicationClaimsDetails)
        }

        $("#OtherMarkets").val('').multiselect('refresh');
        $("#AnchorHUB option").prop("disabled", false);
        $("#AnchorHUB").val('').multiselect('refresh');

    }
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
        alert('Please select Participating/Anchor/Primary HUBS');
        $("#OtherMarkets").val("").multiselect("refresh");
    }

});
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


//------------------------------------------------------------------ Supporting Documents Jqgrid
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
        width: 150,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 60,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 30,
        resizable: true,
        ignoreCase: true,
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

            return '<div class="text-left icon_section align-items-left">' +
                '<span class="action-link"><a onclick=DownloadSupportingDoc(' + options.rowId + ')  class="SupportingDoc mr-2" title="Download"><i class="flaticon-download color-green" title="Download"></i></a></span>' +
                (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="mr-2" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
                '<span class="action-link"><a onclick=DeleteDoc(' + options.rowId + ') class="deletedoc" title="Delete"><i class="flaticon-delete color-danger pv-icon-hide" title="Delete"></i></a></span>' +
                '</div> ';
        }
    },

],
    $('#Grid_Supporting_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: [],
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

function DownloadSupportingDocPreview(rowId) {
    var filename = $('#Grid_Preview_Supporting_Document').jqGrid('getCell', rowId, 'SupportingDocument');
    if (filename.length > 0) {

        $('.SupportingDoc').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}
function ViewUploadedDocPreview(rowId) {
    var filename = $('#Grid_Preview_Supporting_Document').jqGrid('getCell', rowId, 'SupportingDocument');
    if (filename.length > 0) {
        var imageUrl = ROOT + 'Pdfupload/' + filename;
        window.open(imageUrl, '_blank');
    }
}
$("#Add_SupportingDocuments").on("click", function () {

    var document = $("#supportingDocument").val();

    if (document != "") {
        var supportingDocument = $('#supportingDocument').prop("files");
        var modifiedSupportingDocumentsName = SaveSupportingDocumentFile(supportingDocument);
        modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");
        var griddata = [];
        var docData = {};

        var parts = modifiedSupportingDocumentsName.split("_");
        var newFilename = parts[0];
        var fileExtension = modifiedSupportingDocumentsName.split('.').pop();
        newFilename = newFilename + '.' + fileExtension;

        docData = {
            SupportingDocument: modifiedSupportingDocumentsName,
            DocumentName: newFilename,
            // UploadedBy: $('#LoginId').val()

        }

        griddata.push(docData);
        var doc1 = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
        var doc2 = $.merge(doc1, griddata);
        $("#Grid_Supporting_Document").jqGrid('setGridParam', { data: doc2 });
        $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
        $('#supportingDocument').val('');
    }
    else {
        $("#Err_InvalidDocFormat").show();
        setTimeout(function () {
            $("#Err_InvalidDocFormat").hide();
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

    var modifiedfileName = "";
    var formData = new FormData();

    if (fileName != "") {

        formData.append("file", fileName[0]);
        $.ajax({
            type: 'POST',
            url: ROOT + "NewClaimsGrid/SaveSupportingDocument",
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

        $('.SupportingDoc').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
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
            var data1 = {}
            data1 = {
                DocumentName: filename
            }
            deleteImageIn_DocGrid.push(data1);
        }
        $("#jqGridRow_DeleteModal").modal("hide");
    });
}

//------------------------------------------ Code For Auto Save Started
$(document).ready(function () {
    var isInserted = false;
    setInterval(() => {

        if (isInserted === false) {
            validateSave(true);
            $('#loader').hide();
            $("#loader").css("visibility", "hidden");
            isInserted = true;
        } else {
            validateEditDataSave(true);
            $('#loader').hide();
            $("#loader").css("visibility", "hidden");
        }
    }, 5 * 60 * 1000)
});
function validateSave(isAutoSave = false) {

    packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
    communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);
    let ProjectNo_ID = $('#ProjectNo').val();
    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
    if (ProjectNo_ID == "" && ProjectNo_ID != null) {
        validSave = false;
        return false;
    } else {
        if (ProjectNo_ID == "Others") {
            if ($('#ProductName').val() == "") {
                return false;
            }
        }
    }

    if (validSave) {
        let packLabel = packLabelClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 2
        }));
        let communication = communicationClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 2
        }));
        var onPackGridData = JSON.stringify(packLabel);
        var CommunicationClaimsGridData = JSON.stringify(communication);

        var claimsheaders = [];
        claimsheaders.push({
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            VersionNo: 1,
            StatusId: 2,
        });
        var projectdetails = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            ProductName: $.trim($('#ProductName').val()),
            HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
            ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
            Division: $("#ClaimsDivision").val()
        };
        var productdescription = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };
        var projectbrief = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
        };

        $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
        $("#ProductDescription").val(JSON.stringify(productdescription));
        $("#ProjectDetails").val(JSON.stringify(projectdetails));
        $('#ProjectBrief').val(JSON.stringify(projectbrief));
        $("#OnPackClaims").val(onPackGridData);
        $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
        $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));

        $.ajax({

            url: ROOT + "NewClaimsGrid/ClaimsAutoSaveData",
            type: 'POST',
            data: $('#ClaimsAdd').serialize(),
            success: function (response) {

                $("#GridId").val(response.result);
                $("#ProjectNo").attr('disabled', true);
            },
            error: function (error) {
            }
        });
    }

}
function validateEditDataSave(isAutoSave = false) {
    let ProjectNo_ID = $('#ProjectNo').val();
    if (ProjectNo_ID == "" && ProjectNo_ID != null) {
        validSave = false;
        return false;
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
            ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
            Division: $("#ClaimsDivision").val()
        };
        var productdescription = {
            ID: $("#GridId").val(),
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };

        var projectbrief = {
            ProjectNumber: $.trim($('#ProjectNo').val()),
            RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
        };

        $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
        $("#ProductDescription").val(JSON.stringify(productdescription));
        $("#ProjectDetails").val(JSON.stringify(projectdetails));
        $('#ProjectBrief').val(JSON.stringify(projectbrief));
        $("#OnPackClaims").val(onPackGridData);
        $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
        $('#Stage').val(2)
        $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
        $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));

        $.ajax({
            url: ROOT + "NewClaimsGrid/ClaimsAutoSaveEditData",
            type: 'POST',
            data: $('#ClaimsAdd').serialize(),
            success: function (response) {

            },
            error: function (error) {
            }
        });
    }
}
$('.generateClaims_pdf').click(function () {
    var isValid = true;
    isValid = validatePdfData();
    if (isValid) {
        var generatePDFData = "";
        var ProductDescrtionDetailsData = [];
        var OnPackLabelClaimsDetailsData = [];
        var ClaimsForCommunicationData = [];
        var liscendeData = $('#LicenseCategory').val() == "" ? "" : $('#LicenseCategory :selected').text();
        var claimsDivisionData = $('#ClaimsDivision').val() == "" ? "" : $('#ClaimsDivision :selected').text();

        ProductDescrtionDetailsData.push({ "LabelName": "License Category", "Description": liscendeData });
        ProductDescrtionDetailsData.push({ "LabelName": "Other HUBS LicenseCategory", "Description": $("#otherhubslicensecategory").val().trim() });
        ProductDescrtionDetailsData.push({ "LabelName": "Dosage/Product Form", "Description": $("#Dosage").val().trim() });
        ProductDescrtionDetailsData.push({ "LabelName": "Target Organ/Disease", "Description": $("#TargetOrgan").val().trim() });
        ProductDescrtionDetailsData.push({ "LabelName": "Formula Features", "Description": $.trim(CKEDITOR.instances["FormulaFeatures"].getData()) });
        ProductDescrtionDetailsData.push({ "LabelName": "Participating/ Anchor/ Primary HUBS", "Description": $('#AnchorHUB').val().join(",") });
        ProductDescrtionDetailsData.push({ "LabelName": "Non-Participating/ Non-Anchor/ Secondary HUBS", "Description": $('#OtherMarkets').val().join(",") });
        ProductDescrtionDetailsData.push({ "LabelName": "Shelf life at the time of launch", "Description": $("#ShelfLife").val().trim() });
        ProductDescrtionDetailsData.push({ "LabelName": "Direction for use", "Description": $.trim(CKEDITOR.instances["DirectionForUse"].getData()) });
        ProductDescrtionDetailsData.push({ "LabelName": "Caution", "Description": $.trim(CKEDITOR.instances["Caution"].getData()) });
        $(packLabelClaimsDetails).each(function (i, obj) {
            var OpnPackLabelSubClaimsDetails = [];
            $.each(obj.subOnpackClaims, function (j, ele) {
                OpnPackLabelSubClaimsDetails.push({ "SupportingStatement": ele.supportstatement, "MeasuredBy": ele.MeasuredBy });

            });
            OnPackLabelClaimsDetailsData.push({ "Claims": obj.Claims, "Feasibility": obj.Feasibility, "OnPackRemarks": obj.OnPackRemarks, "SubClaimsDetails": OpnPackLabelSubClaimsDetails });
        });
        $(communicationClaimsDetails).each(function (i, obj) {
            var ClaimsForCommunicationSubClaimsDetails = [];
            $.each(obj.subCommunicationClaims, function (j, ele) {
                ClaimsForCommunicationSubClaimsDetails.push({
                    "SupportingStatement": ele.supportstatement, "MeasuredBy": ele.MeasuredBy
                });

            });
            ClaimsForCommunicationData.push({ "Claims": obj.CommunicationClaims, "Feasibility": obj.Feasibility, "OnPackRemarks": obj.CommunicationRemarks, "SubClaimsDetails": ClaimsForCommunicationSubClaimsDetails });
        });

        generatePDFData = {
            "ProductName": $("#ProductName").val().trim(),
            "HGLApprovalNumber": $("#HGLApprovalNumber").text(),
            "VersionNo": $("#version").text().trim(),
            "CreatedDate": $("#date").text().trim(),
            "ProjectNumber": $("#ProjectNo").val().trim(),
            "ProductPositionStatement": $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
            "DivisionName": claimsDivisionData,
            "MustHaveClaims": $('#MustHaveClaims').val().trim() == "" ? "" : $('#MustHaveClaims').val().trim(),
            "NiceToHaveClaims": $('#NiceToHaveClaims').val().trim() == "" ? "" : $('#NiceToHaveClaims').val().trim(),
            "RephraseClaims": $.trim(CKEDITOR.instances["RephraseClaims"].getData()),
            "GridId": $("#GridId").val().trim(),
            "TargetCustomer": $("#TargetCustomer").val().trim(),
            "ProductDescrtionDetails": ProductDescrtionDetailsData,
            "OnPackLabelClaimsDetails": OnPackLabelClaimsDetailsData,
            "ClaimsForCommunication": ClaimsForCommunicationData,
        };

        var fd = new FormData();
        $.ajax({
            url: ROOT + "NewClaimsGrid/GenerateClaimsPdfForAdd",
            type: 'POST',
            dataType: 'HTML',
            cache: false,
            data: { generatePdfData: generatePDFData },
            success: function (result) {
                
                $('.GenerateClaimsPdf').html(result);
                var htmldata = $(".GenerateClaimsPdf").html();
                fd.append('JsonString', htmldata)
                $.ajax({
                    url: ROOT + 'NewClaimsGrid/GeneratePdfHtml',
                    type: 'POST',
                    dataType: 'HTML',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        window.location = window.location.origin + ROOT + 'NewClaimsGrid/GeneratePdfForAdd?Type=' + Claims
                    }

                });
            }
        });
    }
    else {
        alert('No data available to export to PDF');
    }
});

//------------------------------------------- Preview
$(document).on('click', '.preview', function () {

    IsPreviewOpened = 1;

    $('.date_v').text($('#date').val());
    $('.version_v').text($('#version').val());

    $('.ProjectNo_v').text($('#ProjectNo').val());
    $('.ProductName_v').text($('#ProductName').val());
    $('.HGLApprovalNumber_v').text($('#HGLApprovalNumber').val());
    $('.ProductPositioningStatement_v').empty();
    $('.ProductPositioningStatement_v').append(`<span>` + $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()) + `</span>`);
    var val = $('#ClaimsDivision').val();
    if (val != "") {
        $('.Division_v').text($('#ClaimsDivision option[value="' + val + '"]').text());
    }
    else {
        $('.Division_v').text("");
    }

    $('.MustHaveclaims_v').text($('#MustHaveClaims').val());
    $('.NicetoHaveclaims_v').text($('#NiceToHaveClaims').val());
    $('.Rephraseclaims_v').empty();
    $('.Rephraseclaims_v').append(`<span>` + CKEDITOR.instances["RephraseClaims"].getData() + `</span>`);

    var val = $('#LicenseCategory').val();
    if (val != "") {
        $('.LicenseCategory_v').text($('#LicenseCategory option[value="' + val + '"]').text());
    }
    else {
        $('.LicenseCategory_v').text("");
    }

    $('.otherhubslicensecategory_v').text($('#otherhubslicensecategory').val())
    $('.Dosage_v').text($('#Dosage').val());
    $('.TargetOrgan_v').text($('#TargetOrgan').val());
    $('.FormulaFeatures_v').empty();
    $('.FormulaFeatures_v').append(`<span>` + $.trim(CKEDITOR.instances["FormulaFeatures"].getData()) + `</span>`);
    $('.AnchorHUB_v').text($('#AnchorHUB').val());
    $('.OtherMarkets_v').text($('#OtherMarkets').val());
    $('.ShelfLife_v').text($('#ShelfLife').val());
    $('.DirectionForUse_v').empty();
    $('.DirectionForUse_v').append(`<span>` + $.trim(CKEDITOR.instances["DirectionForUse"].getData()) + `</span>`);
    $('.Caution_v').empty();
    $('.Caution_v').append(`<span>` + $.trim(CKEDITOR.instances["Caution"].getData()) + `</span>`);
    $('.TargetCustomer_v').text($('#TargetCustomer').val());


    $(".packlabel_claims_pv").empty();
    var divData = $(".packlabel_claims").html();
    $(".packlabel_claims_pv").append(divData);

    $(".communication_claims_v").empty();
    var divData = $(".communication_claims").html();
    $(".communication_claims_v").append(divData);

    $(".pv-icon-hide").hide();

    $("#preview").modal("show");

});

$(".closepreview").on("click", function () {

    $(".pv-icon-hide").show();
    IsPreviewOpened = 0;

    $("#preview").modal("hide");

});
function validatePdfData() {
    
    var IsEdited = false;
    var projectNumber = $.trim($('#ProjectNo').val());
    var productName = $.trim($('#ProductName').val());
    var hglApprovalNumber = $.trim($('#HGLApprovalNumber').val());
    var productPositioningStatement = $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData());
    var division = $("#ClaimsDivision").val();

    if (projectNumber || productName || hglApprovalNumber || productPositioningStatement || division) {
        IsEdited = true;
    }

    var mustHaveClaims = $.trim($("#MustHaveClaims").val());
    var niceToHaveClaims = $.trim($("#NiceToHaveClaims").val());
    var rephraseClaims = $.trim(CKEDITOR.instances["RephraseClaims"].getData());

    if (mustHaveClaims || niceToHaveClaims || rephraseClaims) {
        IsEdited = true;
    }

    var licenseCategory = $.trim($('#LicenseCategory').val());
    var dosage = $.trim($('#Dosage').val());
    var targetOrgan = $.trim($("#TargetOrgan").val());
    var formulaFeatures = $.trim(CKEDITOR.instances["FormulaFeatures"].getData());
    var anchorHUB = $.trim($("#AnchorHUB").val());
    var otherMarkets = $.trim($("#OtherMarkets").val());
    var shelfLife = $.trim($("#ShelfLife").val());
    var directionForUse = $.trim(CKEDITOR.instances["DirectionForUse"].getData());
    var caution = $.trim(CKEDITOR.instances["Caution"].getData());
    var targetCustomer = $.trim($("#TargetCustomer").val());
    var otherHUBSLicenseCategory = $.trim($("#otherhubslicensecategory").val());

    if (projectNumber || licenseCategory || dosage || targetOrgan || formulaFeatures || anchorHUB || otherMarkets || shelfLife || directionForUse || caution || targetCustomer || otherHUBSLicenseCategory) {
        IsEdited = true;
    }
    packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
    var onpackclaims = packLabelClaimsDetails.map(ele => ({
        Claims: ele.Claims,
        Feasibility: ele.Feasibility,
        SupportingStmt: ele.SupportingStmt,
        MeasuredBy: ele.MeasuredBy,
        OnPackRemarks: ele.Remarks,
        ResponsibleDepartment: ele.ResponsibleDepartment,
        ClaimsId: ele.ClaimsId,
        subOnpackClaims: ele.subOnpackClaims
    }));

    onpackclaims.forEach(ele => {
        if (ele.Claims || ele.Feasibility || ele.SupportingStmt || ele.MeasuredBy || ele.OnPackRemarks || ele.ResponsibleDepartment || ele.ClaimsId || (ele.subOnpackClaims && ele.subOnpackClaims.length > 0)) {
            IsEdited = true;
        }
    });
    communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);
    var communicationclaims = communicationClaimsDetails.map(ele => ({
        CommunicationClaims: ele.Claims,
        Feasibility: ele.Feasibility,
        SupportingTechStmt: ele.SupportingStmt,
        CommunicationClaimsMeasuredBy: ele.MeasuredBy,
        CommunicationRemarks: ele.Remarks,
        ResponsibleDepartment: ele.ResponsibleDepartment,
        ClaimsId: ele.ClaimsId,
        subCommunicationClaims: ele.subCommunicationClaims
    }));

    communicationclaims.forEach(ele => {
        if (ele.CommunicationClaims || ele.Feasibility || ele.SupportingTechStmt || ele.CommunicationClaimsMeasuredBy || ele.CommunicationRemarks || ele.ResponsibleDepartment || ele.ClaimsId || (ele.subCommunicationClaims && ele.subCommunicationClaims.length > 0)) {
            IsEdited = true;
        }
    });

    return IsEdited;
}
CKEDITOR.replace('Claims', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.Claims.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-Claims").hide();
    }
});
CKEDITOR.replace('CommunicationClaims', {
    height: 50,
    //width: 350,
    versionCheck: false,
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
CKEDITOR.instances.CommunicationClaims.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-CommunicationClaims").hide();
    }
});
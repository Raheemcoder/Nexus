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

var container = $(".packlabel_claims");
var containerComm = $(".communication_claims");

var IsPreviewOpened = 0;
var old_onpackclaims = [];
var old_communicationclaims = [];
var old_projectdetails = [];
var old_projectbriefclaims = [];
var old_productdescription = [];
var old_supportingdocuments = [];
$(document).ready(function () {
    $('.data-singleselect').select2();
    $('body').on('input', '.trimspaces', function () {
        // Remove spaces only at the beginning of the input
        this.value = this.value.replace(/^\s+/g, '');
    });
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
        AddOnPackClaimsToUI(packLabelClaimsDetails);
        AddCommClaimsToUI(communicationClaimsDetails);
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
            });
        }
        communicationClaimsWithRemarks = JSON.parse(claimsData.CommunicationClaimsWithRemarks);
        if (communicationClaimsWithRemarks) {
            communicationClaimsWithRemarks = communicationClaimsWithRemarks.map(ele => {
                if (ele.subCommunicationClaims) {
                    return { ...ele, subCommunicationClaims: ele.subCommunicationClaims ? typeof (ele.subCommunicationClaims) == 'string' ? JSON.parse(ele.subCommunicationClaims) : typeof (ele.subCommunicationClaims) == 'object' && ele.subCommunicationClaims : "" }
                } else {
                    return ele;
                }
            });
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

        AddOnPackClaimsToUIWithRemarks(onPackClaimsWithRemarks);
        AddCommClaimsToUIWithRemarks(communicationClaimsWithRemarks);
    }

    if (Stage == '5' && isEdit != 'view') {

        $(".preview").click();
        $(".claimsWithRemarksDelete").hide();
        $(".claimsWithRemarksEdit").hide();
        $(".communicationclaimsWithRemarksDelete").hide();
        $(".communicationclaimsWithRemarksEdit").hide();

    }

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

    $('[data-multiselect]').multiselect({
        includeSelectAllOption: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });

    $('[data-multiselect2]').multiselect({
        includeSelectAllOption: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });

    $('.data-multiselect').multiselect({
        includeSelectAllOption: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });
    declareVariables();

});

// Auto Save 
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

if (Stage > 2) {
    $('#LicenseCategory,#AnchorHUB').prop('disabled', true);
}

if (Stage == 2) {
    $('.cen_txt').text('Draft');
    $('.EditStage').show();
    var multiselect = $('#my-multiselect');
    var valueToRemove = 'option-value';
    var optionToRemove = multiselect.find('option[value="' + valueToRemove + '"]');
    optionToRemove.remove();
}

if (Stage == 3) {

    CFTDepartment = claimsData.CFTDeptName;
    $('.CFTStageButtons').show();
    $('.CFTStage').attr('disabled', true);
    $('.OnPackDetails').hide();
    $('.CommuniactionDetails').hide();
    $('.cen_txt').text('CFT Review');
    $('#OtherMarkets').attr('disabled', true);
    $('#ClaimsDivision').attr('disabled', true);
}

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
    $('.signOff').hide();
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

    $('.cen_txt').text('Rejected');

}

if (Stage == 9) {

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

CKEDITOR.replace('ProductPositioningStatement', {
    height: 50,
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

CKEDITOR.replace('RephraseClaims', {
    height: 50,
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
});
CKEDITOR.instances.RephraseClaims.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
});

CKEDITOR.replace('FormulaFeatures', {
    height: 50,
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
CKEDITOR.instances.FormulaFeatures.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-FormulaFeatures").hide();
    }
});

CKEDITOR.replace('DirectionForUse', {
    height: 50,
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
CKEDITOR.instances.DirectionForUse.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-DirectionForUse").hide();
    }
});

CKEDITOR.replace('Caution', {
    height: 50,
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
CKEDITOR.instances.Caution.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
});

CKEDITOR.replace('OnPackRemarks', {
    height: 50,
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
CKEDITOR.instances.OnPackRemarks.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
});

CKEDITOR.replace('CommunicationRemarks', {
    height: 50,
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
CKEDITOR.instances.CommunicationRemarks.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
});

CKEDITOR.replace('MeasuredBy', {
    height: 50,
    versionCheck: false,
    toolbarGroups: [

        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        }, {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }
    ],
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
CKEDITOR.instances.SupportingTechStmt.on('change', function (event) {
    const editor = event.editor;
    var content = editor.getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "");
    if (content.trim() != "") {
        $("#Err-SupportingTechStmt").hide();
    }
});

CKEDITOR.replace('CommunicationClaimsMeasuredBy', {
    height: 50,
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


//----------------------------------------------------Header Table Data
$('#projNo').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].ProjectNumber);
$('#prodName').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductName);
$('#apprNo').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].HGLApprovalNumber);
$('#date').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : moment(claimsData.ClaimsHeadersList[0].Date).format('DD/MM/YYYY'));
$('#version').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].VersionNo);

//-----------------------------------------------------Project Details
$('#ProductName').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductName);
$('#HGLApprovalNumber').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].HGLApprovalNumber);
$('#ProductPositioningStatement').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductPositioningStatement);
$('#ClaimsDivision').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].Division);

//--------------------------------------------------------Product Description
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

//----------------------------------------------------------Supporting Documents
colmodels = [
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 100,
        ignoreCase: true,
        resizable: true,
        hidden: true,
    },
    {
        name: 'SupportingDocument',
        label: 'Document Name',
        width: 100,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 50,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        width: 50,
        ignoreCase: true,
        resizable: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 30,
        resizable: true,
        ignoreCase: true,
        sortable: false,
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

            if (matches == LoginId || matches[1] == LoginId) {
                if (fileExtension in fileTypes) {
                    return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='deletedoc' onclick='DeleteDoc(" + options.rowId + ")'><i class='flaticon-delete color-danger' title='Delete'></i></a></div>";
                } else {
                    return "<div class='text-center'><a class='SupportingDoc mr-2' onclick='DownloadSupportingDoc(" + options.rowId + ")'><i class='flaticon-download color-green' title='Download'></i></a><a class='mr-2' onclick='ViewUploadedDoc(" + options.rowId + ")'><i class='flaticon-view color-blue' title='View'></i></a><a class='deletedoc' onclick='DeleteDoc(" + options.rowId + ")'><i class='pv-icon-hide flaticon-delete color-danger' title='Delete'></i></a></div>";
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

//--------------------------------------------------------------CFT Documents

function validateCFTfileupload() {

    var isValid = true;
    var file = $('#CFTreviewexcelupload').get(0).files[0];
    if (!file) {
        return false;
    }
    var filename = file.name;
    var extension = filename.split('.').pop().toLowerCase();
    var filesize = file.size;
    var maxSizeInBytes = 5 * 1024 * 1024; //5 MB

    if (extension == "xls" || extension === "xlsx") {
        $("#Err_InvalidCFTDocFormat").text("");
    } else {
        $("#Err_InvalidCFTDocFormat").text("Please select only .xls or .xlsx files");
        isValid = false;
        $('#CFTreviewexcelupload').val("");
        return false;
    }
    if (filesize > maxSizeInBytes) {
        $("#Err_InvalidCFTDocFormat").text("Please select file size less than or equals 5MB");
        isValid = false;
        $('#CFTreviewexcelupload').val("");
        return false;
    } else {
        $("#Err_InvalidCFTDocFormat").text("");
    }
    setTimeout(function () {
        $("#Err_InvalidCFTDocFormat").text("");
    }, 2000);
    return isValid;
}
var CFTUploadedDocumentarr = [];

$("#Add_CFTDocument").on("click", function () {
    $('#CFTreviewexcelupload').text("");
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
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {


            var fileName = rowobject.CFTUploadedDocument.replaceAll('"', ''); // Remove double quotes
            var fileExtension = fileName.split('.').pop().toLowerCase();
            var fileTypes = {

                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',

            };
            var matches = rowobject.UploadedBy.match(/\(([^)]+)\)/);

            if (matches && matches[1] == LoginId) {            // Check if matches[1] is the LoginId
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
        $('.SupportingCFTUploadedDoc').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
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

//--------------------------------------------------------------Communication Claims

var isValid = true;
var CommunicationClaimsEditRowId = 0;
function onEditCommunicationClaims(RowIdCommunicationClaims) {

    CommunicationClaimsEditRowId = RowIdCommunicationClaims;
    var DataFromGridCommunicationClaims = jQuery('#CommuniactionClaimsGrid').jqGrid('getRowData', CommunicationClaimsEditRowId)
    //$("#CommunicationClaims").val(DataFromGridCommunicationClaims.CommunicationClaims);
    CKEDITOR.instances["CommunicationClaims"].setData(DataFromGridCommunicationClaims.CommunicationClaims);
    $("#CommunicationFeasibilityClaims").val(DataFromGridCommunicationClaims.Feasibility);
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#SupportingTechStmt").val(DataFromGridCommunicationClaims.SupportingTechStmt);
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    CKEDITOR.instances["SupportingTechStmt"].setData(DataFromGridCommunicationClaims.SupportingTechStmt);
    //$("#CommunicationClaimsMeasuredBy").val(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    // $("#CommunicationRemarks").val(DataFromGridCommunicationClaims.CommunicationRemarks);
    CKEDITOR.instances["CommunicationRemarks"].setData(DataFromGridCommunicationClaims.CommunicationRemarks);

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

//--------------------------------------------------------------On Pack Label Claims

var isValid = true;
var OnPackDataAddEditRowId = 0;
function onEditOnPackClaims(RowIdOnPack) {
    OnPackDataAddEditRowId = RowIdOnPack;
    var DataFromGridOnPack = jQuery('#OnPackClaimsGrid').jqGrid('getRowData', OnPackDataAddEditRowId)
    //$("#Claims").val(DataFromGridOnPack.Claims);
    CKEDITOR.instances["Claims"].setData(DataFromGridOnPack.Claims);
    $("#FeasibilityClaims").val(DataFromGridOnPack.Feasibility);
    $("#FeasibilityClaims").trigger('change');
    //$("#SupportingStmt").val(DataFromGridOnPack.SupportingStmt);
    CKEDITOR.instances["MeasuredBy"].setData(DataFromGridOnPack.MeasuredBy);

    CKEDITOR.instances["SupportingStmt"].setData(DataFromGridOnPack.SupportingStmt);
    CKEDITOR.instances["OnPackRemarks"].setData(DataFromGridOnPack.OnPackRemarks);
    //$("#MeasuredBy").val(DataFromGridOnPack.MeasuredBy);
    //$("#OnPackRemarks").val(DataFromGridOnPack.OnPackRemarks);
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

//----------------------------------------------------------------To Remove all the validation errors
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

//----------------------------------------------------------------Form save

var formData = new FormData();

//Claims Save - Draft Stage
$('.claimsSave').off("click").click(function () {

    validSave = true;

    $('#claimsSaveOk').prop("disabled", false);
    let ProjectNo_ID = $('#ProjectNo').val();

    if (ProjectNo_ID == "") {
        validSave = false;
        $('#Err-ProjectNo').show();
        return false;
    }
    else {
        $('#Err-ProductName').hide();
        if (ProjectNo_ID == "Others") {
            if ($('#ProductName').val() == "") {
                $('#Err-ProductName').show();
                return false;
            }
        } else {
            $('#Err-ProjectNo').hide();
        }
    }

    if (validSave) {
        var editedData = $("#OnPackClaimsGrid").jqGrid("getChangedCells", "dirty");

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
            //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
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
            FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
            //FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            //DirectionForUse: $.trim($("#DirectionForUse").val()),
            Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
            //Caution: $.trim($("#Caution").val()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };


        $('#SaveModal').modal('show');
        $('#claimsSaveOk').off("click").click(function () {

            $("#ClaimsHeaders").val(JSON.stringify(claimsheaders));
            $("#ProductDescription").val(JSON.stringify(productdescription));
            $("#ProjectDetails").val(JSON.stringify(projectdetails));
            $("#OnPackClaims").val(onPackGridData);
            $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
            $('#Stage').val(2)
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#DeletedSupportingdocument').val(JSON.stringify(deleteImageIn_DocGrid));
            $('#ProjectBrief').val(JSON.stringify(projectbrief));

            $('#EditClaims').submit();
            $('#claimsSaveOk').prop("disabled", true);
        });

    }
});

//Claims sent to cft
$('#claimsSubmit').off("click").click(function () {

    validSave = true;
    //$('.mandatory').each(function (i, obj) {
    //    if ($(this).val() == "") {
    //        $(this).parent().find('span').show();
    //        validSave = false;
    //    }
    //});
    $('.mandatory').each(function (i, obj) {
        if (!validateField($(this))) {
            validSave = false;
        }
    });

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
            ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
            // ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
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
            // FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            //DirectionForUse: $.trim($("#DirectionForUse").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
            // Caution: $.trim($("#Caution").val()),
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
        });
    }
});
var formData = new FormData();
function fileValidation() {

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

        if (onPackClaims.length > 0) {
            for (let i = 0; i < onPackClaims.length; i++) {
                let files = $(`#packClaimsDoc${onPackClaims[i].ClaimsId}`).prop("files");
                if (files != undefined && files?.length > 0) {
                    let formData = new FormData();
                    formData.append("file", files[0]);
                    $.ajax({
                        type: 'POST',
                        url: ROOT + "NewClaimsGrid/SaveClaimsDocument",
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
                        url: ROOT + "NewClaimsGrid/SaveClaimsDocument",
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
    });

});

//CFT Review - Send To DSG
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
            }
            else {
                $(`.${className}`).removeClass("claims_border-error");
                $(`#${RemarksIdName}`).hide();
            }
        });
        communicationClaimschecking.map(communicationClaim => {

            let className = "communication" + communicationClaim.ClaimsId;
            let RemarksIdName = "communication" + communicationClaim.ClaimsId;

        });

        isOnpackClaimsFilled = onPackClaimschecking.some(packClaim => {
            return packClaim.ResponsibleDepartment.includes(department) && (!packClaim.Comments || packClaim.Comments && packClaim.Comments.trim() == "");
        });

    }
    else {
        onPackClaimschecking.map(packClaim => {
            let className = "onpack" + packClaim.ClaimsId;
            let RemarksIdName = "onpack" + packClaim.ClaimsId;
            let DocumentIdName = "onpack_doc" + packClaim.ClaimsId;
            if (!packClaim.Comments || packClaim.Comments && packClaim.Comments.trim() == "") {
                $(`.${className}`).addClass("claims_border-error");
                $(`#${RemarksIdName}`).show();
            }
            else {
                $(`.${className}`).removeClass("claims_border-error");
                $(`#${RemarksIdName}`).hide();
            }
            isOnpackClaimsFilled = onPackClaimschecking.some(packClaim => !packClaim.Comments || packClaim.Comments && packClaim.Comments.trim() == "");
        });
    }

    if (isOnpackClaimsFilled) {
        $("#packCommentsIsFill").show();
        document.getElementById(($('#packCommentsIsFill').closest(`.details_section`)).parent().prop('id')).scrollIntoView({ behavior: 'smooth' });
    }
    else {
        $("#packCommentsIsFill").hide();
    }


    if (isOnpackClaimsFilled || isCommunicationClaimsFilled) {
        return false;
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
    $('#modalheader').text('Send to DSG Review');
    $('#headerlabel').html('Are you sure you want to send to <strong>DSG Review</strong>');
    $('#SendToDSGApproval').off("click").click(function () {

        if ($("#DSG_remarks_text1").val().trim() == "") {
            $("#Error_DSG_remarks_text1").show();
            return false;
        } else {
            $("#Error_DSG_remarks_text1").hide();
        }

        var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

        if (onPackClaims.length > 0) {
            for (let i = 0; i < onPackClaims.length; i++) {
                let files = $(`#packClaimsDoc${onPackClaims[i].ClaimsId}`).prop("files");
                if (files != undefined && files?.length > 0) {
                    let formData = new FormData();
                    formData.append("file", files[0]);
                    $.ajax({
                        type: 'POST',
                        url: ROOT + "NewClaimsGrid/SaveClaimsDocument",
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
                        url: ROOT + "NewClaimsGrid/SaveClaimsDocument",
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
    });

});

$("#Department").change(function () {

    var depatmentBasedOnHubwithoutIndia = $.grep(depatmentBasedOnHub, function (value, index) {
        return value.indexOf("RA_INDIA") === -1;
    });
    var DeptIds = $("#Department").val().toString();
    DeptIds = DeptIds + "," + depatmentBasedOnHubwithoutIndia;
    jQuery(document).ajaxStart(function () {
        $('#loader').css('visibility', 'hidden');
    });
    jQuery(document).ajaxComplete(function () {
        $('#loader').css('visibility', 'hidden');
    });
    const isTrue = checkUnselectedDefaultValues()
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
    $('#Dept_UsersDropdown').val() == "" ? ($('#Error_DeptUsersSelected').show(), flag = false) : ""
    $('#Dept_UsersDropdown').val() != "" ? ($('#Error_DeptUsersSelected').hide(), flag = true) : ""
    var editorRemarks = $("#editor").val();
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
    var uniqueLabels = new Set();
    selectedOptions.each(function () {
        var label = $(this).text().split('-')[0].trim();
        uniqueLabels.add(label);
    });

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
        $("#Department").trigger("change");
        $('#Error_DeptUsersSelected').hide();
        $('#Error_DeptUsers').hide();
        $('#Err-Department').hide()
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
$('.SendToCFT').off("click").click(function () {
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

    packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
    communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

    var CommunicationClaimsGridLength = communicationClaimsDetails.length;
    var OnPackClaimsGridLength = packLabelClaimsDetails.length;

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

        let onPack = packLabelClaimsDetails.map(ele => {
            if (ele.FromStageNo == 2 && ele.ToStageNo == 2) {
                return { ...ele, ToStageNo: 3 };
            } else {
                return ele;
            }
        });
        let communication = communicationClaimsDetails.map(ele => {
            if (ele.FromStageNo == 2 && ele.ToStageNo == 2) {
                return { ...ele, ToStageNo: 3 };
            } else {
                return ele;
            }
        });
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
            ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
            //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            Division: $("#ClaimsDivision").val()
        };

        var productdescription = {
            ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
            // FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            //DirectionForUse: $.trim($("#DirectionForUse").val()),
            Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
            //Caution: $.trim($("#Caution").val()),
            TargetCustomer: $.trim($("#TargetCustomer").val()),
            OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val())
        };
        $('#SendCFTModal').modal('show');
        $('#SaveDetails').off("click").click(function () {
            var flag = true;
            $('#selectedCFTUsers').val() == "" ? ($('#Error_SelectCFTUser').show(), flag = false) : $('#Error_SelectCFTUser').hide();

            if (flag) {
                var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

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
        });

    }
});

//------------------------------------------------------------------------on pack label claims

$('#OnPackDataAdd').off("click").click(function () {

    if ($("#AnchorHUB").val() != "") {
        let measuredByContent = CKEDITOR.instances["MeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let SupportingStmt = CKEDITOR.instances["SupportingStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let onpackClaims = CKEDITOR.instances["Claims"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();

        let isValidInform = true;
        let isresponsibleDepartment = (Array.isArray($("#ResponsibleDeptOnPack").val()) == true && $("#ResponsibleDeptOnPack").val().length == 0 || $("#ResponsibleDeptOnPack").val() == "")
        if (onpackClaims == "" || $("#FeasibilityClaims").val() == "" || $("#FeasibilityClaims").val() == null || measuredByContent == "" || SupportingStmt == "" || isresponsibleDepartment || $("#ResponsibleDeptOnPack").val()) {
            onpackClaims == "" ? ($('#Err-Claims').show(), isValidInform = false) : $('#Err-Claims').hide();
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
                onpackModelClaims.splice(0, 1, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) });
            } else {
                onpackModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) });
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
                // OnPackRemarks: $.trim($("#OnPackRemarks").val()),
                OnPackRemarks: $.trim(CKEDITOR.instances["OnPackRemarks"].getData()),

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

            packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);

            AddOnPackClaimsToUI(packLabelClaimsDetails);
        }
    }
    else {
        alert("Please select Participating/Anchor/Primary hubs in Product Description");
    }
});
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
});
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
            '<td type="button" title="Delete" onclick=deleteOnPackData(' + rownumber + ') class="Button_Delete mt-2 ml-3 pt-1"><i class="pv-icon-hide flaticon-delete color-danger" style="font-size:medium"></i></td>' +
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
            onpackModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), measuredby: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) });
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
});
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
            '<td type="button" title="Delete" onclick=deleteCommunicationData(' + rownumber + ') class="mt-2 ml-3 pt-1"><i class="pv-icon-hide flaticon-delete color-danger" style="font-size:medium"></i></td>' +
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
            communicationModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) });
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
                '<td type="button" title="Delete" onclick=deleteOnPackData(' + i + ') class="Button_Delete mt-2 ml-3 pt-1"><i class="pv-icon-hide color-danger" style="font-size:medium"></i></td>' +
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
                '<td type="button" title="Delete" onclick=deleteCommunicationData(' + i + ') class="mt-2 ml-3 pt-1"><i class="pv-icon-hide color-danger" style="font-size:medium"></i></td>' +
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
function AddOnPackClaimsToUI(claimsDetails) {
    debugger;
    var container = $(".packlabel_claims");
    container.empty()

    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        var itemHtml3 = '<table style="width:100%;" class="' + i + '_onpackclaims ship_to">' +
            '<thead> <tr>' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th colspan="1">' +
            '<button type="button" title="Edit" class="claims_edit pv-icon-hide claims_action_btn btn btn-sm" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fas fa-pen" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete" onclick="DeleteClaimsRecords(' + i + ')" class="claims_delete pv-icon-hide claims_action_btn color-delete btn btn-sm" data-index="' + i + '"><i class="fas fa-trash" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        let subOnpackClaimsData = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";
        for (let j = 0; j < subOnpackClaimsData.length; j++) {
            debugger;
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:65%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subOnpackClaimsData[j].SupportingStatement + '</td>' +
                '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subOnpackClaimsData[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + subOnpackClaimsData.length + ' colspan="1" style="width:20%;"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }

        itemHtml3 += '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
            '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';


        container.append(itemHtml3);

        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
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

container.on("click", ".claims_edit", function () {
    $('#onpack_claims_modal_table tbody').empty();

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    var item = packLabelClaimsDetails[index];

    packLabelClaimsEditIndex = index;
    isPackLabelClaimsEdit = true;
    //$("#Claims").val(item.Claims);
    CKEDITOR.instances["Claims"].setData(item.Claims);
    $("#FeasibilityClaims").val(item.Feasibility);
    $("#FeasibilityClaims").trigger('change');
    //$("#SupportingStmt").val(DataFromGridOnPack.SupportingStmt);
    CKEDITOR.instances["MeasuredBy"].setData(item.MeasuredBy);
    CKEDITOR.instances["SupportingStmt"].setData(item.SupportingStmt);
    CKEDITOR.instances["OnPackRemarks"].setData(item.OnPackRemarks);
    //$("#MeasuredBy").val(DataFromGridOnPack.MeasuredBy);
    //$("#OnPackRemarks").val(item.OnPackRemarks);
    var values = item.ResponsibleDepartment;
    var newVal = values.split(',')
    $("#ResponsibleDeptOnPack").val(newVal);
    $("#ResponsibleDeptOnPack").multiselect("refresh");
    //onpackModelClaims = item.subOnpackClaims;
    onpackModelClaims = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";

    onpackModelClaims = onpackModelClaims.filter(row => row.length !== 0);

    updateOnpackClaimsModalWhileEdit(onpackModelClaims);
});

//--------------------------------------------------------------------------Communication claims
$('#CommunicationClaimsDataAdd').click(function () {

    if ($("#AnchorHUB").val() != "") {
        let isValidInform = true;
        let communicationMeasuredByContent = CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let SupportingTechStmt = CKEDITOR.instances["SupportingTechStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let isresponsibleDepartment = (Array.isArray($("#ResponsibleDeptCommunication").val()) == true && $("#ResponsibleDeptCommunication").val().length == 0 || $("#ResponsibleDeptCommunication").val() == "")
        let CommunicationClaims = CKEDITOR.instances["CommunicationClaims"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();

        if (CommunicationClaims == "" || $("#CommunicationFeasibilityClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == null || communicationMeasuredByContent == "" || SupportingTechStmt == "" || isresponsibleDepartment || $("#ResponsibleDeptCommunication").val() == "") {
            CommunicationClaims == "" ? ($('#Err-CommunicationClaims').show(), isValidInform = false) : $('#Err-CommunicationClaims').hide();
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
                communicationModelClaims.splice(0, 1, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) });
            } else {
                communicationModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) });
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

            AddCommClaimsToUI(communicationClaimsDetails);
        }
    }
    else {
        alert("Please select Participating/Anchor/Primary Hubs Hub in Product Description");
    }
});
function AddCommClaimsToUI(claimsDetails) {

    var container = $(".communication_claims");
    container.empty()

    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];

        var itemHtml3 = '<table style="width:100%;margin-bottom:10px;" class="' + i + '_CommuniClaims ship_to">' +
            '<thead> <tr>' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
            '<th colspan="1">' +
            '<button type="button" title="Edit" class="communication_claims_edit pv-icon-hide claims_action_btn btn btn-sm" data-index="' + i + '"><a href="#CommunicationClaimDetails"><i class="fas fa-pen" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete" onclick="communication_claims_delete(' + i + ')" class="communication_claims_delete pv-icon-hide claims_action_btn color-delete btn btn-sm" data-index="' + i + '"><i class="fas fa-trash" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        let subCommunicationClaimsData = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";
        for (let j = 0; j < subCommunicationClaimsData.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:65%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subCommunicationClaimsData[j].SupportingStatement + '</td>' +
                '<td colspan="1" style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subCommunicationClaimsData[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + subCommunicationClaimsData.length + ' colspan="1" style="width:20%;"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }

        itemHtml3 += '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>DSG Remarks / Restrictions: </b></span><span>' + item.CommunicationRemarks + '</span></td>' +
            '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
        container.append(itemHtml3);
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }

    CKEDITOR.instances["CommunicationClaims"].setData('');
    $('.claimsField').val("");
    $("#CommunicationFeasibilityClaims").val("");
    $("#CommunicationFeasibilityClaims").trigger('change');
    //$("#CommunicationRemarks").val("")
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
containerComm.on("click", ".communication_claims_edit", function () {

    $('#communication_claims_modal_table tbody').empty();

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }
    var item = communicationClaimsDetails[index];
    communicationClaimsEditIndex = index;
    isCommunicationClaimsEdit = true;
    //$("#CommunicationClaims").val(item.CommunicationClaims);
    CKEDITOR.instances["CommunicationClaims"].setData(item.CommunicationClaims);
    $("#CommunicationFeasibilityClaims").val(item.Feasibility);
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#SupportingTechStmt").val(item.SupportingTechStmt);
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData(item.CommunicationClaimsMeasuredBy);
    CKEDITOR.instances["SupportingTechStmt"].setData(item.SupportingTechStmt);
    //$("#CommunicationClaimsMeasuredBy").val(DataFromGridCommunicationClaims.CommunicationClaimsMeasuredBy);
    //$("#CommunicationRemarks").val(item.CommunicationRemarks);
    CKEDITOR.instances["CommunicationRemarks"].setData(item.CommunicationRemarks);
    $("#ResponsibleDeptCommunication").val(item.ResponsibleDepartment)
    var values = item.ResponsibleDepartment;
    var newVal = values.split(',')
    $("#ResponsibleDeptCommunication").val(newVal);
    $("#ResponsibleDeptCommunication").multiselect("refresh")

    communicationModelClaims = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";

    communicationModelClaims = communicationModelClaims.filter(row => row.length !== 0);

    updateCommunicationClaimsModalWhileEdit(communicationModelClaims);
});

//----------------------------------------------------------------------PDF download and Document of Onpack and Comm

$('.generateClaims_pdf').click(function () {

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

    if ($('#Stage').val() == 2 || $('#Stage').val() == 3) {
        debugger;
        packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
        communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);
        $(packLabelClaimsDetails).each(function (i, obj) {
            var OpnPackLabelSubClaimsDetails = [];
            $.each(obj.subOnpackClaims, function (j, ele) {
                OpnPackLabelSubClaimsDetails.push({ "SupportingStatement": ele.SupportingStatement, "MeasuredBy": ele.MeasuredBy });
            });
            OnPackLabelClaimsDetailsData.push({ "Claims": obj.Claims, "Feasibility": obj.Feasibility, "OnPackRemarks": obj.OnPackRemarks, "SubClaimsDetails": OpnPackLabelSubClaimsDetails });

        });
        $(communicationClaimsDetails).each(function (i, obj) {
            var ClaimsForCommunicationSubClaimsDetails = [];
            $.each(obj.subCommunicationClaims, function (j, ele) {
                ClaimsForCommunicationSubClaimsDetails.push({ "SupportingStatement": ele.SupportingStatement, "MeasuredBy": ele.MeasuredBy });

            });
            ClaimsForCommunicationData.push({ "Claims": obj.CommunicationClaims, "Feasibility": obj.Feasibility, "OnPackRemarks": obj.CommunicationRemarks, "SubClaimsDetails": ClaimsForCommunicationSubClaimsDetails });

        });
    }
    else {
        onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
        communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);
        $(onPackClaimsWithRemarks).each(function (i, obj) {
            var OpnPackLabelSubClaimsDetails = [];
            $.each(obj.subOnpackClaims, function (j, ele) {
                OpnPackLabelSubClaimsDetails.push({ "SupportingStatement": ele.SupportingStatement, "MeasuredBy": ele.MeasuredBy });

            });
            OnPackLabelClaimsDetailsData.push({ "Claims": obj.Claims, "Feasibility": obj.Feasibility, "OnPackRemarks": obj.Remarks, "SubClaimsDetails": OpnPackLabelSubClaimsDetails });
        });
        $(communicationClaimsWithRemarks).each(function (i, obj) {

            var ClaimsForCommunicationSubClaimsDetails = [];
            $.each(obj.subCommunicationClaims, function (j, ele) {
                ClaimsForCommunicationSubClaimsDetails.push({ "SupportingStatement": ele.SupportingStatement, "MeasuredBy": ele.MeasuredBy });

            });
            ClaimsForCommunicationData.push({ "Claims": obj.Claims, "Feasibility": obj.Feasibility, "OnPackRemarks": obj.Remarks, "SubClaimsDetails": ClaimsForCommunicationSubClaimsDetails });
        });
    }

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
        url: ROOT + "NewClaimsGrid/GenerateClaimsPdfForEdit",
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
                    window.location = window.location.origin + ROOT + 'NewClaimsGrid/GeneratePdf?ProjectId=' + claimsData.GridId + '&Type=' + "Claims"
                }

            });
        }
    });
});

$(document).on('change', '.onpack_document, .communication_document', function () {

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
});

//-------------------------------------------------------------------------CFT Review

//cft Review stage - On pack CFTReview Stage grid Details.
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
        width: 160,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'Feasibility',
        label: 'Feasibility of Achieving claims',
        width: 150,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'SupportingStmt',
        label: 'Supporting technical statements from R&D',
        width: 250,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            const subClaims = JSON.parse(rowobject.subOnpackClaims);
            var formattedStatements = `<ol class="test_number">`;
            $.each(subClaims, function (index, subClaim) {
                formattedStatements += `<li> ${subClaim.SupportingStatement}</li><br>`;
            });
            formattedStatements += `</ol>`
            return formattedStatements;
        }
    },
    {
        name: 'MeasuredBy',
        label: 'Measured By',
        width: 120,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            const subClaims = JSON.parse(rowobject.subOnpackClaims);
            var measured = `<ol class="test_number">`;

            $.each(subClaims, function (index, subClaim) {
                measured += `<li> ${subClaim.MeasuredBy}</li><br>`;
            });
            measured += `</ol>`
            return measured;
        }
    },
    {
        name: 'OnPackRemarks',
        label: 'DSG Remarks / Restrictions',
        width: 200,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },

    {
        name: `Comments`,
        label: `${department} Remarks`,
        resizable: true,
        width: 120,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (isEdit == "view") {
                return '<div><textarea class="onpack form-control ' + rowobject.ClaimsID + ' onpack_remarks" readonly>' + cellvalue + '</textarea><div id="onpack' + rowobject.ClaimsID + '" style="display:none;"><span class="text-danger">Please enter the Remarks.</span></div></div> ';
            } else {
                return '<div><textarea class="onpack form-control' + rowobject.ClaimsID + ' onpack_remarks" >' + cellvalue + '</textarea><div id="onpack' + rowobject.ClaimsID + '" style="display:none;"><span class="text-danger">Please enter the Remarks.</span></div></div> ';
            }
        }
    },

    {
        name: 'Docs',
        label: 'Upload Template',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.DocumentName != null && rowobject.DocumentName != "" && rowobject.DocumentName) {

                return '<div style="text-align: center;" class="hideactionbuttons">' +
                    '<span class="upload_icons action_icons">' +
                    '<a class="btn-icon -history claimsdocuments" style="cursor:pointer;" data-attribute=' + rowobject.DocumentName + ' title="Download"><i class="fas fa-download color-green" aria-hidden="true"></i></a>' +
                    '<a class="btn-icon -history color-delete deleteclaimsdocuments" onclick="DeleteOnPackClaimsRemarksDocs(' + rowobject.ClaimsID + ',' + options.rowId + ', this)" cursor:pointer;" data-attribute="' + rowobject.DocumentName + '" title="Delete"><i class="fas fa-trash color-delete" aria-hidden="true"></i></a>' +
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
        width: 130,
        resizable: true,
        ignoreCase: true,
        sortable: false,
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

//cft Review stage - communication claims CFTReview Stage grid Details.

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
        width: 160,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'Feasibility',
        label: 'Feasibility of Achieving claims',
        width: 150,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'SupportingTechStmt',
        label: 'Supporting technical statements from R&D',
        width: 250,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            const subClaims = JSON.parse(rowobject.subCommunicationClaims);
            var formattedStatements = `<ol class="test_number">`;
            $.each(subClaims, function (index, subClaim) {
                formattedStatements += `<li> ${subClaim.SupportingStatement}</li></br>`;
            });
            formattedStatements += `</ol>`
            return formattedStatements;
        }
    },
    {
        name: 'CommunicationClaimsMeasuredBy',
        label: 'Measured By',
        width: 120,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            const subClaims = JSON.parse(rowobject.subCommunicationClaims);
            var measured = `<ol class="test_number">`;
            $.each(subClaims, function (index, subClaim) {
                measured += ` <li> ${subClaim.MeasuredBy}</li></br>`;
            });
            measured += `</ol>`
            return measured;
        }
    },
    {
        name: 'CommunicationRemarks',
        label: 'DSG Remarks / Restrictions',
        width: 200,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: `Comments`,
        label: `${department} Remarks`,
        width: 120,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (isEdit == "view") {
                return '<div><textarea class="communication form-control ' + rowobject.ClaimsID + ' communication_remarks" readonly>' + cellvalue + '</textarea></div> <div id="communication' + rowobject.ClaimsID + '" style="display:none;"><span class="text-danger">Please enter the Remarks.</span></div>';
            }
            else {
                return '<div><textarea class="communication form-control' + rowobject.ClaimsID + ' communication_remarks">' + cellvalue + '</textarea></div> <div id="communication' + rowobject.ClaimsID + '" style="display:none;"><span class="text-danger">Please enter the Remarks.</span></div>';
            }
        }
    },
    {
        name: 'Docs',
        label: 'Upload Template',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.DocumentName != null && rowobject.DocumentName != "" && rowobject.DocumentName) {
                return '<div style="text-align: center;" class="hideactionbuttons">' +
                    '<span class="upload_icons action_icons">' +
                    '<a class="btn-icon -history claimsdocuments" style="cursor:pointer;" data-attribute=' + rowobject.DocumentName + ' title="Download"><i class="fas fa-download color-green" aria-hidden="true"></i></a>' +
                    '<a class="btn-icon -history  deleteclaimsdocuments" onclick="DeleteCommunicationClaimsRemarksDocs(' + rowobject.ClaimsID + ',' + options.rowId + ', this)" style="cursor:pointer;" data-attribute="' + rowobject.DocumentName + '" title="Delete"><i class="fas fa-trash color-delete" aria-hidden="true"></i></a>' +
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
        width: 130,
        resizable: true,
        ignoreCase: true,
        sortable: false
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
        $('.claimsdocuments').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload + '&location=ClaimsReviewFiles');
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
    });
}
//cft_review_pack_claims
$("#onpackExcel, #communicationExcel").click(function () {
    var d = new Date();
    const formattedDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '_');
    var formattedTime = d.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/:/g, '_');

    var downloadUrl = ROOT + "NewClaimsGrid/ExportToExcel"
        + "?projectNumber=" + encodeURIComponent(ProjectNumber)
        + "&fileName=" + encodeURIComponent("Claims" + formattedDate + formattedTime)
        + "&GridId=" + encodeURIComponent(GridId)
    window.open(downloadUrl, '_blank')
});
$(document).on('click', '.onPackCFTRemarks', function () {

    var projectNumber = $("#ProjectNumber").val();
    var requestData = {
        ProjectNumber: projectNumber,
        TypeOfClaimsRemarks: "OnPack",
        TypeOfCFT: "OnPack",
        GridId: GridId,
    };

    $.ajax({
        url: ROOT + "NewClaimsGrid/FetchCFTRemarks",
        type: "post",
        data: requestData,
        dataType: "json",
        success: function (response) {

            var colModel = [];
            for (var columnName in response[0]) {
                if (columnName == "ProjectNumber" || columnName == "ClaimsId") {
                    continue;
                }
                else {
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

            $('#CFTReamrks_show_popup').modal("show");
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
});

$(document).on('click', '.communicationCFTRemarks', function () {

    var projectNumber = $("#ProjectNumber").val();
    var requestData = {
        ProjectNumber: projectNumber,
        TypeOfClaimsRemarks: "communication",
        TypeOfCFT: "communication",
        GridId: GridId
    };
    $.ajax({
        url: ROOT + "NewClaimsGrid/FetchCFTRemarks",
        type: "post",
        data: requestData,
        dataType: "json",
        success: function (response) {

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
                            // align: 'center'
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

            $('#CFTReamrks_show_popup').modal("show");
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
});

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

//-------------------------------------------------------------------------DSG Review and other stages

function AddOnPackClaimsToUIWithRemarks(claimsDetails) {

    var container = $(".packlabel_claims");
    container.empty();

    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        let info = fetchContainedDepartment(item);
        var itemHtml2 = '<table style="width:100%;" class="' + i + '_OnpackRemarks ship_to">' +
            '<thead> <tr>' +
            '<th colspan="2" > <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th colspan="1" style="width:20%;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></th>' +
            '<th colspan="1">' +
            '<button type="button" title="Edit" class="claimsWithRemarksEdit pv-icon-hide claims_action_btn btn btn-sm" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fas fa-pen" aria-hidden="true"></i></a></button>'
            + '<button type="button" title="Delete" onclick="DeleteclaimsWithRemarks(' + i + ')" class="pv-icon-hide claims_action_btn color-delete btn btn-sm" data-index="' + i + '"><i class="fas fa-trash" aria-hidden="true"></i></button>';
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
            itemHtml2 += '<a title="Documents" class="claimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs" data-index="' + i + '"  data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>'
        }
        itemHtml2 += '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingStmt + '</span></td>' +
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            '<td colspan="1" style="width:20%"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
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
                        '<span class="remarks"><b>' + info[i] + ' Remarks :</b></span>' +
                        '<span>' + item[info[i]] + '</span>' +
                        '</td>'
                }
            }
        }
        itemHtml2 += '</tr>' +
            '</tbody>' +
            '</table>'
        var itemHtml3 = '<table style="width:100%;" class="' + i + '_OnpackRemarks ship_to">' +
            '<thead> <tr>' +
            '<th colspan="2"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th colspan="1" style="width:20%;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></th>' +
            '<th colspan="1" >' +
            '<button type="button" title="Edit" class="claimsWithRemarksEdit pv-icon-hide claims_action_btn btn btn-sm" data-index="' + i + '"><a href="#OnPackClaimsDetails"  class=""><i class="fas fa-pen" aria-hidden="true"></i></a></button>'
            + '<button type="button"  title="Delete" onclick="DeleteclaimsWithRemarks(' + i + ')" class="claimsWithRemarksDelete pv-icon-hide claims_action_btn color-delete btn btn-sm" data-index="' + i + '"><i class="fas fa-trash" aria-hidden="true"></i></button>';
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
            itemHtml3 += '<a title="Documents" class="claimsWithRemarksDownload Icon_file claims_action_btn download_icon_green" onclick=showMultipleUploadedImages("' + item.ClaimsId + '","' + GridId + '","Onpack") data-index="' + i + '"  data-attribute=' + item.DocumentName + '><img src="../images/multiimages.png" class="img_table"/></a>'
        }
        itemHtml3 += '</th><tbody>'
        let subOnpackClaimsData = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";
        for (let j = 0; j < subOnpackClaimsData.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:65%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subOnpackClaimsData[j].SupportingStatement + '</td>' +
                '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subOnpackClaimsData[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + subOnpackClaimsData.length + ' colspan="1" style="width:20%;"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }
        itemHtml3 += '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
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
                            '<span class="remarks"><b>' + info[i] + ' Remarks:</b></span>' +
                            '<span>' + item[info[i]] + '</span>' +
                            '</td>'
                    }
                }

            }
            itemHtml3 += '</tr>';
        }
        itemHtml3 += '</tbody>' +
            '</table>'
        container.append(itemHtml3);
        downloadRemarks();
        ; if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
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
    $('#onpack_claims_modal_table tbody').empty();
    onpackModelClaims = [];

}

container.on("click", ".claimsWithRemarksEdit", function () {

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    var item = onPackClaimsWithRemarks[index];
    //
    packLabelClaimsEditIndex = index;
    isPackLabelClaimsEdit = true;
    //$("#Claims").val(item.Claims);
    CKEDITOR.instances["Claims"].setData(item.Claims);
    $("#FeasibilityClaims").val(item.Feasibility);
    $("#FeasibilityClaims").trigger('change');
    CKEDITOR.instances["MeasuredBy"].setData(item.MeasuredBy);
    CKEDITOR.instances["SupportingStmt"].setData(item.SupportingStmt);
    CKEDITOR.instances["OnPackRemarks"].setData(item.Remarks);

    onpackModelClaims = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";

    onpackModelClaims = onpackModelClaims.filter(row => row.length !== 0);

    updateOnpackClaimsModalWhileEdit(onpackModelClaims);

});

$('#OnPackWithRemarksAdd').click(function () {

    let isValidInform = true;
    let measuredByContent = CKEDITOR.instances["MeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
    let SupportingStmt = CKEDITOR.instances["SupportingStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
    let onpackClaims = CKEDITOR.instances["Claims"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();

    //let isresponsibleDepartment = (Array.isArray($("#ResponsibleDeptOnPack").val()) == true && $("#ResponsibleDeptOnPack").val().length == 0 || $("#ResponsibleDeptOnPack").val() == "")
    if (onpackClaims == "" || $("#FeasibilityClaims").val() == "" || $("#FeasibilityClaims").val() == null || measuredByContent == "" || SupportingStmt == "" || $("#ResponsibleDeptOnPack").val()) {
        onpackClaims == "" ? ($('#Err-Claims').show(), isValidInform = false) : $('#Err-Claims').hide();
        ($("#FeasibilityClaims").val() == "" || $("#FeasibilityClaims").val() == null) ? ($('#Err-FeasibilityClaims').show(), isValidInform = false) : $('#Err-FeasibilityClaims').hide();
        measuredByContent == "" ? ($('#Err-MeasuredBy').show(), isValidInform = false) : $('#Err-MeasuredBy').hide();
        SupportingStmt == "" ? ($('#Err-SupportingStmt').show(), isValidInform = false) : $('#Err-SupportingStmt').hide();
        //$.trim($("#OnPackRemarks").val()) == "" ? ($('#Err-OnPackRemarks').show(), isValidInform = false) : $('#Err-OnPackRemarks').hide();
        //(Array.isArray($("#ResponsibleDeptOnPack").val()) == true && $("#ResponsibleDeptOnPack").val().length == 0 || $("#ResponsibleDeptOnPack").val() == "") ? ($('#Err-ResponsibleDeptOnPack').show(), isValidInform = false) : $('#Err-ResponsibleDeptOnPack').hide();

    }
    let item = onPackClaimsWithRemarks[packLabelClaimsEditIndex];
    if (isValidInform) {
        if (isPackLabelClaimsEdit) {
            onpackModelClaims.splice(0, 1, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) });
        } else {
            onpackModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) });
        }
        let packLabelClaimsItem = {
            ...item,
            Claims: $.trim(CKEDITOR.instances["Claims"].getData()),
            Feasibility: $.trim($("#FeasibilityClaims").val()),
            SupportingStmt: $.trim(CKEDITOR.instances["SupportingStmt"].getData()),
            MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()),
            Remarks: $.trim(CKEDITOR.instances["OnPackRemarks"].getData()),
            //Remarks: $.trim($("#OnPackRemarks").val()),
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

        AddOnPackClaimsToUIWithRemarks(onPackClaimsWithRemarks);
    }
});

function AddCommClaimsToUIWithRemarks(claimsDetails) {
    var container = $(".communication_claims");
    container.empty();

    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        const info = fetchContainedDepartment(item);
        var itemHtml2 = '<table style="width:100%;"class="' + i + '_CommuniRemarks ship_to">' +
            '<thead> <tr>' +
            '<th colspan="2" > <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th colspan="1" style="width:20%;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></th>' +
            '<th colspan="1" >' +
            '<button type="button" title="Edit" class="communicationclaimsWithRemarksEdit claims_action_btn btn btn-sm pv-hide-icon" data-index="' + i + '"><a href="#CommunicationClaimDetails"  class=""><i class="fas fa-pen" aria-hidden="true"></i></a></button>'
            + '<button type="button" onclick = "communicationclaimsWithRemarksDelete(' + i + ')" class="communicationclaimsWithRemarksDelete pv-hide-icon claims_action_btn color-delete btn btn-sm" data-index="' + i + '"><i class="fas fa-trash" aria-hidden="true"></i></button>';
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
            itemHtml2 += '<a  title="Download" class="communicationclaimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs"  data-index="' + i + '" data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>'
        }
        itemHtml2 += '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td colspan="2"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingStmt + '</span></td>' +
            '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
            '<td colspan="1" style="width:20%"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
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
                        '<span class="remarks"><b>' + info[i] + ' Remarks :</b></span>' +
                        '<span>' + item[info[i]] + '</span>' +
                        '</td>'
                }
            }
        }
        itemHtml2 += '</tr>' +
            '</tbody>' +
            '</table>'
        var itemHtml3 = '<table style="width:100%;" class="' + i + '_CommuniRemarks ship_to">' +
            '<thead> <tr>' +
            '<th colspan="2" > <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th colspan="1" style="width:20%;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></th>' +
            '<th colspan="1">' +
            '<button type="button" title="Edit" class="communicationclaimsWithRemarksEdit pv-icon-hide claims_action_btn btn btn-sm" data-index="' + i + '"><a href="#CommunicationClaimDetails"  class=""><i class="fas fa-pen" aria-hidden="true"></i></a></button>'
            + '<button type="button" title="Delete" onclick="CommunicationClaimsWithRemakrsDelete(' + i + ')" class="communicationclaimsWithRemarksDelete pv-icon-hide claims_action_btn color-delete btn btn-sm" data-index="' + i + '"><i class="fas fa-trash" aria-hidden="true"></i></button>';
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
            itemHtml3 += '<a title="Documents" class="communicationclaimsWithRemarksDownload claims_action_btn download_icon_green Icon_file" onclick=showMultipleUploadedImages("' + item.ClaimsId + '","' + GridId + '","Communication") data-index="' + i + '" data-attribute=' + item.DocumentName + '><img src="../images/multiimages.png" class="img_table"/></a>'
        }
        itemHtml3 += '</th><tbody>'
        let subCommunicationClaimsData = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";
        for (let j = 0; j < subCommunicationClaimsData.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:65%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subCommunicationClaimsData[j].SupportingStatement + '</td>' +
                '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subCommunicationClaimsData[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + subCommunicationClaimsData.length + ' colspan="1" style="width:20%;"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>';
            }
            itemHtml3 += '</tr>';
        }
        itemHtml3 += '<tr>' +
            '<td colspan="4"><span class="remarks"> <b>DSG Remarks / Restrictions : </b></span><span>' + item.Remarks + '</span></td>' +
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
                            '<span class="remarks"><b>' + info[i] + ' Remarks :</b></span>' +
                            '<span>' + item[info[i]] + '</span>' +
                            '</td>'
                    }
                }
            }
            itemHtml3 += '</tr>';
        }
        itemHtml3 += '</tbody>' +
            '</table>'
        container.append(itemHtml3);
        downloadRemarks()
        if (isEdit == 'view' || Stage == 3) {
            $('.claims_action_btn').hide();
        }
    }

    // $("#CommunicationClaims").val("")
    CKEDITOR.instances["CommunicationClaims"].setData('');
    $('.claimsField').val("");
    $("#CommunicationFeasibilityClaims").val("");
    $("#CommunicationFeasibilityClaims").trigger('change');
    CKEDITOR.instances["SupportingTechStmt"].setData('');
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
    CKEDITOR.instances["CommunicationRemarks"].setData('');
    $("#ResponsibleDeptCommunication").val("").multiselect('refresh');
    $('#communication_claims_modal_table tbody').empty();
    communicationModelClaims = [];

}

containerComm.on("click", ".communicationclaimsWithRemarksEdit", function () {

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    var item = communicationClaimsWithRemarks[index];
    communicationClaimsEditIndex = index;
    isCommunicationClaimsEdit = true;
/*    $("#CommunicationClaims").val(item.Claims);*/
    CKEDITOR.instances["CommunicationClaims"].setData(item.Claims);
    $("#CommunicationFeasibilityClaims").val(item.Feasibility);
    $("#CommunicationFeasibilityClaims").trigger('change');
    $("#SupportingTechStmt").val(item.SupportingStmt);
    CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData(item.MeasuredBy);
    CKEDITOR.instances["SupportingTechStmt"].setData(item.SupportingStmt);
    CKEDITOR.instances["OnPackRemarks"].setData(item.OnPackRemarks);
    CKEDITOR.instances["CommunicationRemarks"].setData(item.Remarks);

    communicationModelClaims = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";

    communicationModelClaims = communicationModelClaims.filter(row => row.length !== 0);

    updateCommunicationClaimsModalWhileEdit(communicationModelClaims);
});

$('#CommunicationClaimsWithRemarksAdd').click(function () {

    let communicationMeasuredByContent = CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
    let SupportingTechStmt = CKEDITOR.instances["SupportingTechStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
    let CommunicationClaims = CKEDITOR.instances["CommunicationClaims"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();

    let isValidInform = true;
    //let isresponsibleDepartment = (Array.isArray($("#ResponsibleDeptCommunication").val()) == true && $("#ResponsibleDeptCommunication").val().length == 0 || $("#ResponsibleDeptCommunication").val() == "")
    if (CommunicationClaims == "" || $("#CommunicationFeasibilityClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == null || communicationMeasuredByContent == "" || SupportingTechStmt == "" || $("#ResponsibleDeptCommunication").val() == "") {
        CommunicationClaims == "" ? ($('#Err-CommunicationClaims').show(), isValidInform = false) : $('#Err-CommunicationClaims').hide();
        ($("#CommunicationFeasibilityClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == null) ? ($('#Err-CommunicationFeasibilityClaims').show(), isValidInform = false) : $('#Err-CommunicationFeasibilityClaims').hide();
        communicationMeasuredByContent == "" ? ($('#Err-CommunicationClaimsMeasuredBy').show(), isValidInform = false) : $('#Err-CommunicationClaimsMeasuredBy').hide();
        SupportingTechStmt == "" ? ($('#Err-SupportingTechStmt').show(), isValidInform = false) : $('#Err-SupportingTechStmt').hide();
        //$("#ResponsibleDeptCommunication").val() == "" ? ($('#Err-ResponsibleDeptCommunication').show(), isValidInform = false) : $('#Err-ResponsibleDeptCommunication').hide();
        //$.trim($("#CommunicationRemarks").val()) == "" ? ($('#Err-CommunicationRemarks').show(), isValidInform = false) : $('#Err-CommunicationRemarks').hide();
    }

    let item = communicationClaimsWithRemarks[communicationClaimsEditIndex];
    if (isValidInform) {
        if (isCommunicationClaimsEdit) {
            communicationModelClaims.splice(0, 1, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) });
        } else {
            communicationModelClaims.splice(0, 0, { SupportingStatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) });
        }
        let communicationClaimsItem = {
            ...item,
            Claims: $.trim(CKEDITOR.instances["CommunicationClaims"].getData()),
            Feasibility: $.trim($("#CommunicationFeasibilityClaims").val()),
            SupportingStmt: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()),
            MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()),
            Remarks: $.trim(CKEDITOR.instances["CommunicationRemarks"].getData()),
            //Remarks: $.trim($("#CommunicationRemarks").val()),
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
        AddCommClaimsToUIWithRemarks(communicationClaimsWithRemarks);
    }
});

$(".DSGSave,.SaveManagerModal, .DSGSignOffSave, .AddendumSave").off("click").click(function () {
    validSave = true;
    $('#claimsSaveOk').prop("disabled", false);
    $('.mandatory').each(function (i, obj) {
        if (!validateField($(this))) {
            validSave = false;
        }
    });

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
                ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
                //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
                Division: $("#ClaimsDivision").val()
            };

            var productdescription = {
                ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                LicenseCategory: $.trim($('#LicenseCategory').val()),
                Dosage: $.trim($('#Dosage').val()),
                TargetOrgan: $.trim($("#TargetOrgan").val()),
                FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
                //FormulaFeatures: $.trim($("#FormulaFeatures").val()),
                AnchorHUB: $.trim($("#AnchorHUB").val()),
                OtherMarkets: $.trim($("#OtherMarkets").val()),
                ShelfLife: $.trim($("#ShelfLife").val()),
                DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
                //DirectionForUse: $.trim($("#DirectionForUse").val()),
                //Caution: $.trim($("#Caution").val()),
                Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
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

});
$(".SendForApproval, .SendForDSGSignOff, .SendForBackToDSG, #SendToCft1").off("click").click(function () {

    validSave = true;
    $('#SaveDetails').prop("disabled", false);
    $('#SendToApproval').prop("disabled", false);
    var clickedElementId = $(this).attr("id");
    $('.mandatory').each(function (i, obj) {

        if (!validateField($(this))) {
            validSave = false;
        }
    });

    //var CommunicationClaimsGridLength = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'reccount');
    //var OnPackClaimsGridLength = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'reccount');

    //var onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    //var communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);

    onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);

    var OnPackClaimsGridLength = onPackClaimsWithRemarks.length;
    var CommunicationClaimsGridLength = communicationClaimsWithRemarks.length;

    //CommunicationClaimsGridLength == 0 ? ($('#Err-CommunicationClaimsGrid').show(), validSave = false) : $('#Err-CommunicationClaimsGrid').hide();

    OnPackClaimsGridLength == 0 ? ($('#Err-OnPackGrid').show(), validSave = false) : $('#Err-OnPackGrid').hide();
    let tabsArray = []
    $("#form_project_details").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("info");
            return false;
        }
    });
    $("form#form_product_description").find(".mandatory").each(function () {
        var elementId = $(this).attr("id");
        let val = $(`#${elementId}`).val();
        if (!val.trim()) {
            tabsArray.push("placement");
            return false;
        }
    });

    if (OnPackClaimsGridLength == 0) {
        tabsArray.push("schedule");
    }

    //if (CommunicationClaimsGridLength == 0) {
    //    tabsArray.push("review");
    //}

    if (!validSave) {
        return false;
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
        if ($(this).val() == "Sendbacktodsg") {

            $('#dsgmodalheader').text('Send back to DSG');
            $('#dsgconfirmationmsg').html('Are you sure you want <strong>Send back to DSG</strong>');
        }
        else if ($(this).val() == "sendtodsgsignoff") {
            $('#dsgmodalheader').text('Send to DSG SignOff');
            $('#dsgconfirmationmsg').html('Are you sure you want send to <strong>DSG Signoff</strong>');
        }
        else {
            $('#dsgmodalheader').text('Send for Manager Approval');
            $('#dsgconfirmationmsg').html('Are you sure you want send for <strong>Manager Approval</strong>');
        }

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
                ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
                //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
                Division: $("#ClaimsDivision").val()
            };

            var productdescription = {
                ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
                ProjectNumber: $.trim($('#ProjectNo').val()),
                LicenseCategory: $.trim($('#LicenseCategory').val()),
                Dosage: $.trim($('#Dosage').val()),
                TargetOrgan: $.trim($("#TargetOrgan").val()),
                FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
                //FormulaFeatures: $.trim($("#FormulaFeatures").val()),
                AnchorHUB: $.trim($("#AnchorHUB").val()),
                OtherMarkets: $.trim($("#OtherMarkets").val()),
                ShelfLife: $.trim($("#ShelfLife").val()),
                DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
                //DirectionForUse: $.trim($("#DirectionForUse").val()),
                Caution: $.trim(CKEDITOR.instances["Caution"].getData()),

                //Caution: $.trim($("#Caution").val()),
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
    });
});

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
$(".onpack_remarks, .communication_remarks").on("input", function () {
    if ($(this).val()) {
        $(this).next("div").hide();
        $(this).removeClass("claims_border-error");
    }
});

var forOnPackClaimsDetails = [];
var communication_ClaimsDetails = [];
$(".onpack_remarks").on("change", function () {

    forOnPackClaimsDetails.length = 0;
    $('#cft_review_pack_claims').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_claims").jqGrid('getRowData', row.id);
            var obj = {
                Comments: $(row).find(`textarea`).val(),
                Department: department,
                DocumentName: rowData.DocumentName,
                ClaimsId: rowData.ClaimsID
            }
            forOnPackClaimsDetails.push(obj);
        }
    });

});
$(".communication_remarks").on("change", function () {

    communication_ClaimsDetails.length = 0;
    $('#cft_review_pack_communication').find('tr').each(function (i, row) {
        if (row.id != "") {
            var rowData = $("#cft_review_pack_communication").jqGrid('getRowData', row.id);
            var obj = {
                Comments: $(row).find(`textarea`).val(),
                Department: department,
                DocumentName: rowData.DocumentName,
                ClaimsId: rowData.ClaimsID
            }
            communication_ClaimsDetails.push(obj);
        }
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
function downloadRemarks() {
    /// Commented recently 10/11/2023

    //$(".downloadUploadedDocs").click(function () {
    //    SupportingDocDownload = $(this).attr('data-attribute');
    //    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    //    SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
    //    SupportingDocDownload = SupportingDocDownload.replaceAll('/', '')

    //    if (SupportingDocDownload.length > 0) {
    //        $('.downloadUploadedDocs').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload + '&location=ClaimsReviewFiles');
    //        return true;
    //    }
    //});
}
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

});

var UsersList = "";
function validatePmdReviewSendMailForm() {
    $('#SendMail_Buttom').prop("disabled", false);
    $.ajax({
        type: "POST",
        url: ROOT + "NewClaimsGrid/GetClaimsAllDepartments",
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
                    url: ROOT + "NewClaimsGrid/GetUserEmailBasedOnDept",
                    data: { DeptIds: responsibleDepart },
                    dataType: "json",
                    success: function (UserEmailResult) {
                        if (UserEmailResult != null) {
                            $("option").remove(".DeptUsersOption");
                            var userEmailList = ''
                            $.each(UserEmailResult, function (i, obj) {

                                userEmailList += '<option class="DeptUsersOption ' + obj.Dept + '" value="' + obj.Email + '">' + obj.Dept + ' - ' + obj.Email + '</option>';

                            });

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

    $('#SendMail_Buttom').off("click").click(function () {
        debugger;
        var flag = true;
        var SelectedUsers = $("#SelectedUsersForSendMail").val();
        //SelectedUsers == '' ? ($('#Error_SendMail_DeptUsers').show(), flag = false) : $('#Error_SendMail_DeptUsers').hide();
        SelectedUsers == '' ? ($('.Error_SelectCFTUser').show(), flag = false) : $('Error_SelectCFTUser').hide();
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
        url: ROOT + "NewClaimsGrid/GenerateClaimsPdf",
        type: 'POST',
        dataType: 'HTML',
        cache: false,
        data: {
            ProjectNumber: ProjectNumber,
            GridId: GridId
        },
        async: false,
        success: function (result) {

            $('.GenerateClaimsPdf').html(result);

            var htmldata = $(".GenerateClaimsPdf").html();

            fd.append('JsonString', htmldata);

            $.ajax({
                url: ROOT + 'NewClaimsGrid/GeneratePdfHtml',
                type: 'POST',
                dataType: 'HTML',
                data: fd,
                contentType: false,
                processData: false,
                async: false,
                success: function (result) {
                    $.ajax({
                        url: ROOT + 'NewClaimsGrid/GeneratePdfforSendmail?toMailids=' + SendMail_SelectedUsers + '&remarks=' + SendMail_Remarks + '&GridId=' + GridId + '&FromButton=' + fromButton,
                        type: 'POST',
                        async: false,
                        success: function () {
                        },
                        error: function () {
                            alert("Error occured!!");
                        }
                    });
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
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
function ViewDocFile(fileName) {
    var imageUrl = ROOT + 'ClaimsReviewFiles/' + fileName;
    window.open(imageUrl, '_blank');
}
function Downloaddoc(fileName) {
    fileName = fileName.replaceAll('"', '')
    fileName = fileName.replaceAll('"', '')
    fileName = fileName.replaceAll('/', '')

    if (fileName.length > 0) {
        $('.downloadUploadedDocs').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + fileName + '&location=ClaimsReviewFiles');
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
    debugger;
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {
        debugger;
        $('table.' + tableclass + '_onpackclaims').remove();
        delete packLabelClaimsDetails[tableclass];
        $("#DeleteClaimsPOPUp").modal("hide");

       // $("#Claims").val("");
        CKEDITOR.instances["Claims"].setData('');
        $(".onPackField").val("");
        $("#FeasibilityClaims").val("");
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
function communication_claims_delete(i) {
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {

        $('table.' + tableclass + '_CommuniClaims').remove();
        delete communicationClaimsDetails[tableclass];
        //communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);
        $("#DeleteClaimsPOPUp").modal("hide");

        //$("#CommunicationClaims").val("");
        CKEDITOR.instances["CommunicationClaims"].setData('');
        $("#CommunicationFeasibilityClaims").val("");
        $("#CommunicationFeasibilityClaims").trigger('change');
        //$("#CommunicationRemarks").val("")
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

      //  $("#Claims").val("");
        CKEDITOR.instances["Claims"].setData('');
        $(".onPackField").val("");
        $("#FeasibilityClaims").val("");
        $("#FeasibilityClaims").trigger("change");
        CKEDITOR.instances["MeasuredBy"].setData('');
        CKEDITOR.instances["SupportingStmt"].setData('');
        CKEDITOR.instances["OnPackRemarks"].setData('');

        onpackModelClaims = [];
        isPackLabelClaimsEdit = false;
        packLabelClaimsEditIndex = 0;
        $("#onpack_claims_modal_table tbody").empty();
    });
}
function CommunicationClaimsWithRemakrsDelete(i) {

    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {

        $('table.' + tableclass + '_CommuniRemarks').remove();
        delete communicationClaimsWithRemarks[tableclass];
        $("#DeleteClaimsPOPUp").modal("hide");

        //$("#CommunicationClaims").val("");
        CKEDITOR.instances["CommunicationClaims"].setData('');
        $("#FeasibilityClaims").trigger("change");
        $("#CommunicationFeasibilityClaims").val("");
        $("#CommunicationFeasibilityClaims").trigger('change');
        CKEDITOR.instances["SupportingTechStmt"].setData('');
        CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
        CKEDITOR.instances["CommunicationRemarks"].setData('');
        communicationModelClaims = [];
        isCommunicationClaimsEdit = false;
        communicationClaimsEditIndex = 0;
        $('#communication_claims_modal_table tbody').empty();
    });

}

var PreviousHub = [];
var depatmentBasedOnHub = "";

$("#AnchorHUB, #OtherMarkets").change(function () {
    var depatmentBasedOnHubwithoutIndia = $.grep(depatmentBasedOnHub, function (value, index) {
        return value.indexOf("RA_INDIA") === -1;
    });
    PreviousHub = depatmentBasedOnHubwithoutIndia;
    //if ($("#OtherMarkets").val() != '') {
    //    var hub = $("#AnchorHUB").val().toString() + ',' + $("#OtherMarkets").val().toString();

    //}
    //else {
    //    var hub = $("#AnchorHUB").val().toString()
    //}
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
            url: ROOT + "NewClaimsGrid/GetDepartmentBasedOnHub",
            data: { HubName: hub },
            dataType: "json",
            success: function (result) {
                if (result.length != 0) {
                    debugger;
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
                    debugger;
                    for (var i = 0; i < packLabelClaimsDetails.length; i++) {
                        var departments = packLabelClaimsDetails[i].ResponsibleDepartment.split(',');
                        departments = departments.filter(function (value) {
                            return PreviousHub.indexOf(value) === -1;
                        });

                        var depatmentBasedOnHubwithoutIndia1 = $.grep(depatmentBasedOnHub, function (value, index) {
                            return value.indexOf("RA_INDIA") === -1;
                        });
                        if (departments != '') {
                            departments = departments.concat(depatmentBasedOnHubwithoutIndia1);

                        }
                        else {
                            departments = depatmentBasedOnHubwithoutIndia1;

                        }
                        var uniqueDepartments = Array.from(new Set(departments));
                        packLabelClaimsDetails[i].ResponsibleDepartment = uniqueDepartments.join(',');

                    }
                }

                AddOnPackClaimsToUI(packLabelClaimsDetails);
                if (communicationClaimsDetails.length != 0) {

                    for (var i = 0; i < communicationClaimsDetails.length; i++) {
                        var departments1 = communicationClaimsDetails[i].ResponsibleDepartment.split(',');
                        departments1 = departments1.filter(function (value) {
                            return PreviousHub.indexOf(value) === -1;
                        });

                        var depatmentBasedOnHubwithoutIndia2 = $.grep(depatmentBasedOnHub, function (value, index) {
                            return value.indexOf("RA_INDIA") === -1;
                        });
                        if (departments1 != '') {
                            departments1 = departments1.concat(depatmentBasedOnHubwithoutIndia2);
                        }
                        else {
                            departments1 = depatmentBasedOnHubwithoutIndia2;
                        }
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
                    departments1 = departments1.concat(depatmentBasedOnHub);
                }
                var uniqueDepartments = Array.from(new Set(departments));
                packLabelClaimsDetails[i].ResponsibleDepartment = uniqueDepartments.join(',');

            }
        }

        AddOnPackClaimsToUI(packLabelClaimsDetails);
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
        width: 50,
        ignoreCase: true,
        resizable: true,
        sortable: false,
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
function showMultipleUploadedImages(claimsId, GridId, Type) {
    $.ajax({
        type: "POST",
        url: ROOT + "NewClaimsGrid/GetMultipleDepartmentsUploadedDocs",
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
        $('.downloadUploadedDocs').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload + '&location=ClaimsReviewFiles');
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
        sortable: false,
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

$("#UploadedExcelDocuments").click(function () {
    $.ajax({
        url: ROOT + "NewClaimsGrid/FetchExcelDocuments",
        type: "post",
        data: { GridId: GridId },
        dataType: "json",
        success: function (response) {

            jQuery('#GridShow_UploadedExcel').jqGrid('clearGridData');
            $("#GridShow_UploadedExcel").jqGrid('setGridParam', { data: response });
            $("#GridShow_UploadedExcel").trigger('reloadGrid', [{ page: 1 }]);

            $('#ShowIRAUploadedExcel').modal("show");

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
});
function DownloadCFTUploadedExcelDoc(rowId) {
    var filename = $('#GridShow_UploadedExcel').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {
        $('.SupportingCFTUploadedDoc').prop("href", ROOT + "NewClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}
$("#PreviewCFTDocuments").click(function () {
    $.ajax({
        url: ROOT + "NewClaimsGrid/FetchExcelDocuments",
        type: "post",
        data: { GridId: GridId },
        dataType: "json",
        success: function (response) {

            jQuery('#GridShow_UploadedExcel').jqGrid('clearGridData');
            $("#GridShow_UploadedExcel").jqGrid('setGridParam', { data: response });
            $("#GridShow_UploadedExcel").trigger('reloadGrid', [{ page: 1 }]);

            $('#ShowIRAUploadedExcel').modal("show");
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
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
        alert('Please select Participating/Anchor/Primary Hubs');
        $("#OtherMarkets").val("").multiselect("refresh");
    }
});

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
            //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            Division: $("#ClaimsDivision").val()
        };

        var productdescription = {
            ID: $("#GridId").val(),
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
            //FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            //DirectionForUse: $.trim($("#DirectionForUse").val()),
            //Caution: $.trim($("#Caution").val()),
            Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
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
            url: ROOT + "NewClaimsGrid/ClaimsAutoSaveEditData",
            type: 'POST',
            data: $('#EditClaims').serialize(),
            success: function (response) {
            },
            error: function (xhr, status, error) {
                alert("Error Occured: " + error);
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
            ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),

            //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
            Division: $("#ClaimsDivision").val()
        };

        var productdescription = {
            ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
            ProjectNumber: $.trim($('#ProjectNo').val()),
            LicenseCategory: $.trim($('#LicenseCategory').val()),
            Dosage: $.trim($('#Dosage').val()),
            TargetOrgan: $.trim($("#TargetOrgan").val()),
            FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
            //FormulaFeatures: $.trim($("#FormulaFeatures").val()),
            AnchorHUB: $.trim($("#AnchorHUB").val()),
            OtherMarkets: $.trim($("#OtherMarkets").val()),
            ShelfLife: $.trim($("#ShelfLife").val()),
            DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
            //DirectionForUse: $.trim($("#DirectionForUse").val()),
            //Caution: $.trim($("#Caution").val()),
            Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
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
            url: ROOT + "NewClaimsGrid/ClaimsAutoSaveEditData",
            type: 'POST',
            data: $('#EditClaims').serialize(),
            success: function (response) {
            },
            error: function (xhr, status, error) {
                alert("Error Occured: " + error);
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
});
//function validateSaveAndUpdate() {
//    debugger;
//    var isModified = true;
//    if (claimsData.ProductName != $('#ProductName').val() || claimsData.ClaimsProductDescription != $('#otherhubslicensecategory').val() || claimsData.Dosage != $('#Dosage').val()) {
//        isModified = true;
//    }


//}
$(".signOff ,.SaveAsAddendum, .AddendumSaveUpdate").off('click').on("click", function () {
    var isEdited = true;
    $('#SendToApproval').prop("disabled", false);
    var clickedElementId = $(this).attr("id");
    var formData = new FormData();
    validSave = true;
    $('.mandatory').each(function (i, obj) {
        if (!validateField($(this))) {
            validSave = false;
        }
    });

    onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);

    var OnPackClaimsGridLength = onPackClaimsWithRemarks.length;

    OnPackClaimsGridLength == 0 ? ($('#Err-OnPackGrid').show(), validSave = false) : $('#Err-OnPackGrid').hide();

    if (!validSave) {
        return false;
    }
    if ($(this).val() == "saveandupdate") {
        isEdited = validateAddendumSaveUpdate();

    }
    if (isEdited) {
        $('#DSG_Remarks').modal('show');
        if ($(this).val() == "saveasaddendum") {
            $('#dsgmodalheader').text('Save As Addendum');
            $('#dsgconfirmationmsg').html('Are you sure you want to <strong>Save as Addendum</strong>');
        }
        else if ($(this).val() == "saveandupdate") {
            $('#dsgmodalheader').text('Save and Update');
            $('#dsgconfirmationmsg').html('Are you sure you want to <strong>Save and Update</strong>');
        }
        else {
            $('#dsgmodalheader').text('Signed Off');
            $('#dsgconfirmationmsg').html('Are you sure you want to send for <strong>Signed Off</strong> stage');
        }
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
                    ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
                    //ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
                    Division: $("#ClaimsDivision").val()
                };

                var productdescription = {
                    ID: claimsData ? claimsData.ClaimsProductDescription[0].ID : 0,
                    ProjectNumber: $.trim($('#ProjectNo').val()),
                    LicenseCategory: $.trim($('#LicenseCategory').val()),
                    Dosage: $.trim($('#Dosage').val()),
                    TargetOrgan: $.trim($("#TargetOrgan").val()),
                    FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
                    //FormulaFeatures: $.trim($("#FormulaFeatures").val()),
                    AnchorHUB: $.trim($("#AnchorHUB").val()),
                    OtherMarkets: $.trim($("#OtherMarkets").val()),
                    ShelfLife: $.trim($("#ShelfLife").val()),
                    DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
                    //DirectionForUse: $.trim($("#DirectionForUse").val()),
                    //Caution: $.trim($("#Caution").val()),
                    Caution: $.trim(CKEDITOR.instances["Caution"].getData()),
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

                var status = clickedElementId === "signOff" ? 15 : clickedElementId === "AddendumSaveUpdate" ? Stage : 6;

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
                    url: ROOT + 'NewClaimsGrid/SaveSignOffData',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {

                        if (response.includes("Successfully")) {

                            $('#SendMail_Buttom').prop("disabled", false);

                            $.ajax({
                                type: "POST",
                                url: ROOT + "NewClaimsGrid/GetClaimsAllDepartments",
                                data: {
                                    GridId: GridId,
                                    ProjectNumber: ProjectNumber
                                },
                                dataType: "JSON",
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
                                            url: ROOT + "NewClaimsGrid/GetUserEmailBasedOnDept",
                                            data: { DeptIds: responsibleDepart },
                                            dataType: "json",
                                            success: function (UserEmailResult) {
                                                if (UserEmailResult != null) {
                                                    $("option").remove(".DeptUsersOption");
                                                    var userEmailList = ''
                                                    $.each(UserEmailResult, function (i, obj) {

                                                        userEmailList += '<option class="DeptUsersOption ' + obj.Dept + '" value="' + obj.Email + '">' + obj.Dept + ' - ' + obj.Email + '</option>';

                                                    });
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
                                debugger;
                                var flag1 = true
                                var SelectedUsers = $("#SelectedUsersForSendMail").val().trim();
                                SelectedUsers == '' ? ($('.Error_SelectCFTUser').show(), flag1 = false) : $('.Error_SelectCFTUser').hide();

                                if (flag1) {
                                    $('#SendMail_Buttom').prop("disabled", true);
                                    downloaddocfile("Ok");
                                    $('#sendMailModal').modal('hide');
                                    window.location.href = ROOT + 'NewClaimsGrid/ClaimsGridDocument';
                                }
                            });

                            $("#SendmailCancelButton").click(function () {
                                window.location.href = ROOT + 'NewClaimsGrid/ClaimsGridDocument';
                            });

                        }
                        else {
                            window.location.href = ROOT + 'NewClaimsGrid/ClaimsGridDocument';
                        }
                    },

                });
            }
        });

    }
    else {
        alert("There are no changes to Save & Update");
    }
});

//------------------------------------------- Preview

$(document).on('click', '.preview', function () {

    $('.pv-icon-hide').hide();
    $('.communication_claims_edit').hide();
    $('.communication_claims_delete').hide();

    if (Stage > 3 && isEdit != 'view') {
        $('.onpackView').show();
        $('.communicationView').show();
    }
    else {
        $('.onpackView').hide();
        $('.communicationView').hide();
    }

    if (Stage == "3") {

        var container = $(".packlabel_claims");

        container.empty()

        var claimsData1 = claimsData.ClaimsOnPackDetails;
        for (var i = 0; i < claimsData1.length; i++) {
            var item = claimsData1[i];
            var Remarks = forOnPackClaimsDetails[i] ? forOnPackClaimsDetails[i].Comments : claimsData.ClaimsOnPackDetails[i].Comments;
            var Department = forOnPackClaimsDetails[i] ? forOnPackClaimsDetails[i].Department : `${department}`;
            if (item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) {
                var fileName = item.DocumentName.replace(/"/g, '');
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
                '<th class="" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +

                ((item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) ?
                    '<th colspan="1"style="text-align: right;"><a title="Download" class="btn-icon onPackPreview claims_action_btn downloadUploadedDocs action_icons" onclick="Downloaddoc(\'' + fileName + '\')" title="Download"><i class="fas fa-download color-download" aria-hidden="true"></i></a>'
                    :
                    '<th colspan="1">'
                )
            '</th>' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            let subOnpackClaimsData = item.subOnpackClaims ? typeof (item.subOnpackClaims) == 'string' ? JSON.parse(item.subOnpackClaims) : typeof (item.subOnpackClaims) == 'object' && item.subOnpackClaims : "";
            for (let j = 0; j < subOnpackClaimsData.length; j++) {
                onPacklabelclaimsHtml += '<tr>' +
                    '<td colspan="2" style="width:65%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subOnpackClaimsData[j].SupportingStatement + '</td>' +
                    '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subOnpackClaimsData[j].MeasuredBy + '</span></td>';
                if (j == 0) {
                    onPacklabelclaimsHtml += '<td rowspan=' + subOnpackClaimsData.length + ' colspan="1" style="width:20%;"><div><span class="remarks"> <b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>';
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

            container.append(onPacklabelclaimsHtml);
        }
    }

    if (Stage == "3") {

        var Contaner2 = $(".communication_claims");

        Contaner2.empty();

        var commuClaimsData = claimsData.ClaimsCommunicationDetails;
        for (var i = 0; i < commuClaimsData.length; i++) {
            var item = commuClaimsData[i];
            var Remarks = communication_ClaimsDetails[i] ? communication_ClaimsDetails[i].Comments : claimsData.ClaimsCommunicationDetails[i].Comments;
            var Department = communication_ClaimsDetails[i] ? communication_ClaimsDetails[i].Department : `${department}`;
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
            var communicaationClimsHtml = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="2"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
                '<th class="" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                ((item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) && fileName != undefined ?
                    '<td colspan="1" style="text-align: right;"><a title="Download" class="btn-icon communicattionPreview claims_action_btn downloadUploadedDocs action_icons" onclick="Downloaddoc(\'' + fileName + '\')" data-index="' + i + '" data-attribute=' + fileName + '><i class="fas fa-download color-download" aria-hidden="true"></i></a>'
                    :
                    '<th colspan="1">'
                )
            '</td>' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            let subCommunicationClaimsData = item.subCommunicationClaims ? typeof (item.subCommunicationClaims) == 'string' ? JSON.parse(item.subCommunicationClaims) : typeof (item.subCommunicationClaims) == 'object' && item.subCommunicationClaims : "";
            for (let j = 0; j < subCommunicationClaimsData.length; j++) {
                communicaationClimsHtml += '<tr>' +
                    '<td colspan="2" style="width:65%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + subCommunicationClaimsData[j].SupportingStatement + '</td>' +
                    '<td colspan="1" style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + subCommunicationClaimsData[j].MeasuredBy + '</span></td>';
                if (j == 0) {
                    communicaationClimsHtml += '<td rowspan=' + subCommunicationClaimsData.length + ' colspan="1" style="width:20%;"><div><span class="remarks"><b>Responsible Department:</b></span></div><span>' + item.ResponsibleDepartment + '</span></td>';
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

            Contaner2.append(communicaationClimsHtml);

        }
    }

    IsPreviewOpened = 1;

    $('.date_v').text($('#date').text());
    $('.version_v').text($('#version').text());

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
    if (Stage > 3) {
        var cftremarksdiv = $(".onPackCFTRemarks").closest("div").html();
        $(".packlabel_claims_pv").append(cftremarksdiv);
    }
    $(".packlabel_claims_pv").append(divData);

    $(".communication_claims_v").empty();
    var divData = $(".communication_claims").html();
    if (Stage > 3) {
        var spanWithCFTButton = $("span").has(".communicationCFTRemarks").clone();
        var newDiv = $("<div></div>").append(spanWithCFTButton);
        $(".communication_claims_v").append(newDiv);
    }
    $(".communication_claims_v").append(divData);

    $(".pv-icon-hide").hide();

    $("#preview").modal("show");

});

$(".closepreview").on("click", function () {

    $(".pv-icon-hide").show();

    if (isEdit == "view") {
        $('.claimsWithRemarksDelete').hide();
        $('.communicationclaimsWithRemarksDelete').hide();
        $('.communicationclaimsWithRemarksEdit').hide();
        $('.claimsWithRemarksEdit').hide();
    }
    else {
        $('.claimsWithRemarksDelete').show();
        $('.communicationclaimsWithRemarksDelete').show();
        $('.communicationclaimsWithRemarksEdit').show();
        $('.claimsWithRemarksEdit').show();
    }
    if (Stage == "3") {
        $('.packlabel_claims').text("");
        $('.communication_claims').text("");
    }

    IsPreviewOpened = 0;

    $("#preview").modal("hide");

});

function declareVariables() {
    old_projectdetails.push({
        ProjectNumber: $.trim($('#ProjectNo').val()),
        ProductName: $.trim($('#ProductName').val()),
        HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
        ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
        Division: $("#ClaimsDivision").val()
    });

    old_projectbriefclaims.push({
        MustHaveClaims: $.trim($("#MustHaveClaims").val()),
        NiceToHaveClaims: $.trim($("#NiceToHaveClaims").val()),
        RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
    });

    old_productdescription.push({
        ProjectNumber: $.trim($('#ProjectNo').val()),
        LicenseCategory: $.trim($('#LicenseCategory').val()),
        OtherHUBSLicenseCategory: $.trim($("#otherhubslicensecategory").val()),
        Dosage: $.trim($('#Dosage').val()),
        TargetOrgan: $.trim($("#TargetOrgan").val()),
        AnchorHUB: $.trim($("#AnchorHUB").val()),
        OtherMarkets: $.trim($("#OtherMarkets").val()),
        ShelfLife: $.trim($("#ShelfLife").val()),
        TargetCustomer: $.trim($("#TargetCustomer").val()),
        FormulaFeatures: $.trim(CKEDITOR.instances["FormulaFeatures"].getData()),
        DirectionForUse: $.trim(CKEDITOR.instances["DirectionForUse"].getData()),
        Caution: $.trim(CKEDITOR.instances["Caution"].getData())
    });
    old_supportingdocuments = $.parseJSON($('#JsonClaimsData').val()).ClaimsSupportingDocument;
}
function validateAddendumSaveUpdate() {
    var isEdited = false;
    old_onpackclaims = JSON.parse(claimsData.OnPackClaimsWithRemarks);
    if (old_onpackclaims) {
        old_onpackclaims = old_onpackclaims.map(ele => {
            if (ele.subOnpackClaims) {
                return { ...ele, subOnpackClaims: ele.subOnpackClaims ? typeof (ele.subOnpackClaims) == 'string' ? JSON.parse(ele.subOnpackClaims) : typeof (ele.subOnpackClaims) == 'object' && ele.subOnpackClaims : "" }
            } else {
                return ele;
            }
        });
    }
    if (old_onpackclaims.length > 0) {
        var mergedOutput = old_onpackclaims.reduce((result, obj) => {
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
        old_onpackclaims = mergedOutput;
    }
    old_onpackclaims = old_onpackclaims.map(ele => ({
        Claims: ele.Claims,
        Feasibility: ele.Feasibility,
        SupportingStmt: ele.SupportingStmt,
        MeasuredBy: ele.MeasuredBy,
        OnPackRemarks: ele.Remarks,
        ResponsibleDepartment: ele.ResponsibleDepartment,
        ClaimsId: ele.ClaimsId,
        subOnpackClaims: ele.subOnpackClaims
    }));
    old_communicationclaims = JSON.parse(claimsData.CommunicationClaimsWithRemarks);
    if (old_communicationclaims) {
        old_communicationclaims = old_communicationclaims.map(ele => {
            if (ele.subCommunicationClaims) {
                return { ...ele, subCommunicationClaims: ele.subCommunicationClaims ? typeof (ele.subCommunicationClaims) == 'string' ? JSON.parse(ele.subCommunicationClaims) : typeof (ele.subCommunicationClaims) == 'object' && ele.subCommunicationClaims : "" }
            } else {
                return ele;
            }
        });
    }
    if (old_communicationclaims.length > 0) {
        var mergedOutput1 = old_communicationclaims.reduce((result, obj) => {
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
        old_communicationclaims = mergedOutput1;
    }
    old_communicationclaims = old_communicationclaims.map(ele => ({
        CommunicationClaims: ele.Claims,
        Feasibility: ele.Feasibility,
        SupportingTechStmt: ele.SupportingStmt,
        CommunicationClaimsMeasuredBy: ele.MeasuredBy,
        CommunicationRemarks: ele.Remarks,
        ResponsibleDepartment: ele.ResponsibleDepartment,
        ClaimsId: ele.ClaimsId,
        subCommunicationClaims: ele.subCommunicationClaims
    }));
    var projectdetails = [];
    projectdetails.push({
        ProjectNumber: $.trim($('#ProjectNo').val()),
        ProductName: $.trim($('#ProductName').val()),
        HGLApprovalNumber: $.trim($('#HGLApprovalNumber').val()),
        ProductPositioningStatement: $.trim(CKEDITOR.instances["ProductPositioningStatement"].getData()),
        Division: $("#ClaimsDivision").val()
    });
    var projectbriefclaims = [];
    projectbriefclaims.push({
        MustHaveClaims: $.trim($("#MustHaveClaims").val()),
        NiceToHaveClaims: $.trim($("#NiceToHaveClaims").val()),
        RephraseClaims: $.trim(CKEDITOR.instances["RephraseClaims"].getData())
    });
    var productdescription = [];
    productdescription.push({
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
    });
    onPackClaimsWithRemarks = onPackClaimsWithRemarks.filter(row => row.length !== 0);
    var onpackclaims = onPackClaimsWithRemarks.map(ele => ({
        Claims: ele.Claims,
        Feasibility: ele.Feasibility,
        SupportingStmt: ele.SupportingStmt,
        MeasuredBy: ele.MeasuredBy,
        OnPackRemarks: ele.Remarks,
        ResponsibleDepartment: ele.ResponsibleDepartment,
        ClaimsId: ele.ClaimsId,
        subOnpackClaims: ele.subOnpackClaims
    }));
    communicationClaimsWithRemarks = communicationClaimsWithRemarks.filter(row => row.length !== 0);
    var communicationclaims = communicationClaimsWithRemarks.map(ele => ({
        CommunicationClaims: ele.Claims,
        Feasibility: ele.Feasibility,
        SupportingTechStmt: ele.SupportingStmt,
        CommunicationClaimsMeasuredBy: ele.MeasuredBy,
        CommunicationRemarks: ele.Remarks,
        ResponsibleDepartment: ele.ResponsibleDepartment,
        ClaimsId: ele.ClaimsId,
        subCommunicationClaims: ele.subCommunicationClaims
    }));
    var supportingdocuments = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');

    $.each(old_projectdetails, function (i, obj) {
        var index = projectdetails.findIndex(function (item) {
            return obj.ProjectNumber === item.ProjectNumber && obj.ProductName === item.ProductName &&
                obj.HGLApprovalNumber === item.HGLApprovalNumber && obj.ProductPositioningStatement === item.ProductPositioningStatement && obj.Division === item.Division
        });
        if (index == -1) {
            isEdited = true;
            return isEdited;
        }
    });

    $.each(old_projectbriefclaims, function (i, obj) {
        var index = projectbriefclaims.findIndex(function (item) {
            return obj.MustHaveClaims === item.MustHaveClaims && obj.NiceToHaveClaims === item.NiceToHaveClaims && obj.RephraseClaims === item.RephraseClaims;
        });
        if (index == -1) {
            isEdited = true;
            return isEdited;
        }
    });

    $.each(old_productdescription, function (i, obj) {
        var index = productdescription.findIndex(function (item) {
            return obj.ProjectNumber === item.ProjectNumber && obj.LicenseCategory === item.LicenseCategory && obj.Dosage === item.Dosage &&
                obj.TargetOrgan === item.TargetOrgan && obj.FormulaFeatures === item.FormulaFeatures && obj.AnchorHUB === item.AnchorHUB &&
                obj.OtherMarkets === item.OtherMarkets && obj.ShelfLife === item.ShelfLife && obj.DirectionForUse === item.DirectionForUse &&
                obj.Caution === item.Caution && obj.TargetCustomer === item.TargetCustomer && obj.OtherHUBSLicenseCategory === item.OtherHUBSLicenseCategory;
        });
        if (index == -1) {
            isEdited = true;
            return isEdited;
        }
    });
    if (old_onpackclaims.length != onpackclaims.length) {
        isEdited = true;
        return isEdited;
    }
    else {
        $.each(old_onpackclaims, function (i, obj) {
            var index = onpackclaims.findIndex(function (item) {
                return obj.Claims === item.Claims && obj.Feasibility === item.Feasibility && obj.SupportingStmt === item.SupportingStmt &&
                    obj.MeasuredBy === item.MeasuredBy && obj.OnPackRemarks === item.OnPackRemarks &&
                    obj.ResponsibleDepartment === item.ResponsibleDepartment && parseInt(obj.ClaimsId) === parseInt(item.ClaimsId) &&
                    obj.subOnpackClaims.length === item.subOnpackClaims.length;
            });
            if (index == -1) {
                isEdited = true;
                return isEdited;
            } else {
                $.each(obj.subOnpackClaims, function (j, data) {
                    debugger;
                    var new_subonpackClaims = onpackclaims[index].subOnpackClaims;
                    var subarrayindex = new_subonpackClaims.findIndex(function (ele) {
                        return data.MeasuredBy === ele.MeasuredBy && data.SupportingStatement === ele.SupportingStatement
                    })
                    if (subarrayindex == -1) {
                        isEdited = true;
                        return isEdited;
                    }
                })
            }
        });
    }

    if (old_communicationclaims.length != communicationclaims.length) {
        isEdited = true;
        return isEdited;
    }
    else {
        $.each(old_communicationclaims, function (i, obj) {
            var index = communicationclaims.findIndex(function (item) {
                return obj.Claims === item.Claims && obj.Feasibility === item.Feasibility && obj.SupportingStmt === item.SupportingStmt &&
                    obj.CommunicationClaimsMeasuredBy === item.CommunicationClaimsMeasuredBy && obj.CommunicationRemarks === item.CommunicationRemarks &&
                    obj.ResponsibleDepartment === item.ResponsibleDepartment && parseInt(obj.ClaimsId) === parseInt(item.ClaimsId) &&
                    obj.subCommunicationClaims.length === item.subCommunicationClaims.length;
            });
            if (index == -1) {
                isEdited = true;
                return isEdited;
            } else {
                $.each(obj.subCommunicationClaims, function (j, data) {
                    debugger;
                    var new_subcommunicationClaims = communicationclaims[index].subCommunicationClaims;
                    var subarrayindex = new_subcommunicationClaims.findIndex(function (ele) {
                        return data.MeasuredBy === ele.MeasuredBy && data.SupportingStatement === ele.SupportingStatement
                    })
                    if (subarrayindex == -1) {
                        isEdited = true;
                        return isEdited;
                    }
                })
            }
        });
    }

    if (old_supportingdocuments.length != supportingdocuments.length) {
        isEdited = true;
        return isEdited;
    }
    else {
        $.each(old_supportingdocuments, function (i, obj) {
            debugger;
            var index = supportingdocuments.findIndex(function (item) {
                return obj.SupportingDocument === item.SupportingDocument && obj.UploadedBy === item.UploadedBy && obj.UploadedOn === item.UploadedOn;
            });
            if (index == -1) {
                isEdited = true;
                return isEdited;
            }
        });
    }
    return isEdited;
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
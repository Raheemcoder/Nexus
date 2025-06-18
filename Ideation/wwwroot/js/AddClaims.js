
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
$("#ProjectNo").select2();


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
        },
        {
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
    // You can perform actions based on the changed content here.
    if (content.trim()) {
        $("#Err-CommunicationClaimsMeasuredBy").hide();
    }
});


//$.ajax({
//    url: ROOT + 'ClaimsGrid/GetExistingClaimsProjectList',
//    datatype: 'JSON',
//    success: function (result) {
//        $.each(result, function (i,obj) {
//            $('#ProjectNo').find('option[value="' + obj.ProjectNumber + '"]').remove();
//        })

//    },
//    error: function () {
//        alert('ERROR OCCURED')
//    }

//})

//colmodels = [
//    {
//        name: 'Action',
//        label: 'Action',
//        width: 90,
//        resizable: true,
//        ignoreCase: true,
//        formatter: function (cellvalue, options, rowobject) {

//                return '<div class="text-center icon_section align-items-left">' +
//                    '<a onclick=onEditOnPackClaims(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
//                    '<a onclick=onDeleteOnPackClaims(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
//                    '</div> ';

//        }
//    },

//    {
//        name: 'Claims',
//        label: 'Claims',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'Feasibility',
//        label: 'Feasibility of Achieving claims',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'SupportingStmt',
//        label: 'Supporting technical statements from R&D',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'MeasuredBy',
//        label: 'Measured By',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'OnPackRemarks',
//        label: 'Remarks / Restrictions',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'ResponsibleDepartment',
//        label: 'Responsible Department',
//        resizable: true,
//        ignoreCase: true,
//    },

//],

//$("#OnPackClaimsGrid").jqGrid({
//    url: '',
//    datatype: 'local',
//    data: [],
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

//    }
//});
//$("#worksheet").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

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


//colmodels = [
//    {
//        name: 'Action',
//        label: 'Action',
//        width: 90,
//        resizable: true,
//        ignoreCase: true,
//        formatter: function (cellvalue, options, rowobject) {
//            return '<div class="text-center icon_section align-items-left">' +
//                '<a onclick=onEditCommunicationClaims(' + options.rowId + ') class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fa fa-edit mr-2" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a >' +
//                '<a onclick=onDeleteCommunicationClaims(' + options.rowId + ') class="icon_color btn_button" title="Delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"></i><span class="sr-only">Delete</span></a>' +
//                '</div> ';
//        }
//    },

//    {
//        name: 'CommunicationClaims',
//        label: 'Claims',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'Feasibility',
//        label: 'Feasibility of Achieving claims',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'SupportingTechStmt',
//        label: 'Supporting technical statements from R&D',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'CommunicationClaimsMeasuredBy',
//        label: 'Measured By',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'CommunicationRemarks',
//        label: 'Remarks / Restrictions',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'ResponsibleDepartment',
//        label: 'Responsible Department',
//        resizable: true,
//        ignoreCase: true,
//    },

//],

//$("#CommuniactionClaimsGrid").jqGrid({
//    url: '',
//    datatype: 'local',
//    data: [],
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

//    }
//});

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



$('.data-multiselect').multiselect({
    includeSelectAllOption: true,
    buttonWidth: '100%',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});

//$("#ResponsibleDeptOnPack option[value='IRA']").prop("disabled", true);
//$("#ResponsibleDeptOnPack").val("IRA").multiselect('refresh');

//$("#ResponsibleDeptCommunication option[value='IRA']").prop("disabled", true);
//$("#ResponsibleDeptCommunication").val("IRA").multiselect('refresh');

var isValid = true;
var CommunicationClaimsEditRowId = 0;
//$('#CommunicationClaimsDataAdd').click(function () {
//    if ($("#CommunicationClaims").val() == "" || $("#CommunicationFeasibilityClaims").val() == "" || CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData() == "")
//{
//    $("#CommunicationClaims").val() == "" ? ($('#Err-CommunicationClaims').show(),isValid=false) : $('#Err-CommunicationClaims').hide();
//    $("#CommunicationFeasibilityClaims").val() == "" ? ($('#Err-CommunicationFeasibilityClaims').show(),isValid=false) : $('#Err-CommunicationFeasibilityClaims').hide();
//        CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData() == "" ? ($('#Err-CommunicationClaimsMeasuredBy').show(), isValid = false) : $('#Err-CommunicationClaimsMeasuredBy').hide();
//        $("#ResponsibleDeptCommunication").val() == "" ? ($('#Err-ResponsibleDeptCommunication').show(), isValid = false) : $('#Err-ResponsibleDeptCommunication').hide();

//}
//    if (isValid) {

//        var gridDataCommunicationClaims = [];
//        CommunicationClaimsData = {
//            CommunicationClaims: $.trim($("#CommunicationClaims").val()) ,
//            Feasibility: $.trim($("#CommunicationFeasibilityClaims").val()),
//            SupportingTechStmt: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()) ,
//            CommunicationClaimsMeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) ,
//            CommunicationRemarks: $.trim($("#CommunicationRemarks").val()) ,
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
$("#Claims").on("input", function () {
    if ($(this).val() != "") {
        $('#Err-Claims').hide();
    }
})
$("#FeasibilityClaims").on("input", function () {

    if ($(this).val() != "") {
        $('#Err-FeasibilityClaims').hide();
    }
});
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
})
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
//            Feasibility: $.trim($("#FeasibilityClaims").val()) ,
//            SupportingStmt: $.trim(CKEDITOR.instances["SupportingStmt"].getData()),
//            MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) ,
//            OnPackRemarks: $.trim($("#OnPackRemarks").val()) ,
//            ResponsibleDepartment:$("#ResponsibleDeptOnPack").val().toString()
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


$('.claimsSave').click(function () {
    validSave = true;

    $('#claimsSaveOk').prop("disabled", false);

    //$('.mandatory').each(function (i, obj) {
    //    if ($(this).val() == "") {
    //        $(this).parent().find('span:first').show();
    //        validSave = false;
    //    }
    //})

    packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
    communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);


    let ProjectNo_ID = $('#ProjectNo').val();

    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');
    if (ProjectNo_ID == "" && ProjectNo_ID != null) {
        validSave = false;
        $('#Err-ProjectNo').show()
        $(`[data-attr="info"]`).trigger('click');
        $(`li[data-slick-index=0]`).find('a').css("background-color", "red")
        return;
    } else {
        $('#Err-ProductName').hide();
        $(`li[data-slick-index=0]`).find('a').removeAttr("style");
        if (ProjectNo_ID == "Others") {
            if ($('#ProductName').val() == "") {
                $('#Err-ProductName').show()
                $(`[data-attr="info"]`).trigger('click');
                $(`li[data-slick-index=0]`).find('a').css("background-color", "red")
                return;
            }
        } else {
            $('#Err-ProjectNo').hide()
            $(`li[data-slick-index=0]`).find('a').removeAttr("style");
        }
    }

    if (validSave) {
        let packLabel = packLabelClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 2
        }))
        let communication = communicationClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 2
        }))
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

        $('#SaveModal').modal('show');
        $('#claimsSaveOk').click(function () {
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
            //$("#OnPackClaims").val(JSON.stringify(onPackGridData));
            $("#OnPackClaims").val(onPackGridData);
            $("#CommunicationClaimsData").val(CommunicationClaimsGridData);
            //$('#SupportingDoc').val(fileName);
            $('#SupportingDocumentData').val(JSON.stringify(supportingDocument));
            $('#ProjectBrief').val(JSON.stringify(projectbrief));

            $('#ClaimsAdd').submit();
            $('#claimsSaveOk').prop("disabled", true);
        })

    }
});

const dataSlickIndex = {
    info: 0,
    ads: 1,
    placement: 2,
    schedule: 3,
    review: 4,
    upload: 5,
}
$('#SendToCFT').click(function () {
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
    var supportingDocument = $("#Grid_Supporting_Document").jqGrid('getGridParam', 'data');


    packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
    communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

    var OnPackClaimsGridLength = packLabelClaimsDetails.length;
    var CommunicationClaimsGridLength = communicationClaimsDetails.length;

    //CommunicationClaimsGridLength == 0 ? ($('#Err-CommunicationClaimsGrid').show(), validSave = false) : $('#Err-CommunicationClaimsGrid').hide();

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
    if (OnPackClaimsGridLength === 0) {
        tabsArray.push("schedule");
    }
    //if (CommunicationClaimsGridLength === 0) {
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

    if (!validSave) {
        if (tabsArray.length > 0)
            $(`[data-attr="${tabsArray[0]}"]`).trigger('click');
    }

    if (validSave) {

        //var onPackGridData = $('#OnPackClaimsGrid').jqGrid('getGridParam', 'data');
        //var CommunicationClaimsGridData = $('#CommuniactionClaimsGrid').jqGrid('getGridParam', 'data');
        let packLabel = packLabelClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 3
        }))
        let communication = communicationClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 3
        }))

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

        $('#SendCFTModal').modal('show');
        $('#SaveDetails').click(function () {

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
        })

    }
});



$('.mandatory').on('change keyup', function () {
    if ($(this).val() != "") {
        $(this).parent().find('span').hide();
    }
})

$('#ProjectNo').change(function () {
    $('#ProjectBriefId').text("Project Brief");
    $('.ProjectBriefId_V').text("Project Brief");
    var projNo = $(this).val();

    if (projNo != "" && projNo != "Others") {
        $.ajax({
            type: "POST",
            url: ROOT + "ClaimsGrid/GetDataByProjectNo",
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
            url: ROOT + "ClaimsGrid/GetRquiredClaimsDetails",
            data: { projNo: projNo },
            dataType: "json",
            success: function (result) {
                if (result.length > 0) {
                    $('#NiceToHaveClaims').val(result[0].NiceToHaveClaims == null ? "null" : result[0].NiceToHaveClaims);
                    $('#MustHaveClaims').val(result[0].MustHaveClaims == null ? "null" : result[0].MustHaveClaims);
                    if (result[0].ProjectBriefId !== null) {
                        $('#ProjectBriefId').text("Project Brief - " + (result[0].ProjectBriefId == null ? "" : result[0].ProjectBriefId));
                    }
                    $('.MustHaveclaims_v').text($('#MustHaveClaims').val())
                    $('.NicetoHaveclaims_v').text($('#NiceToHaveClaims').val())
                    $('.ProjectBriefId_V').text($('#ProjectBriefId').text())

                } else {
                    $('#NiceToHaveClaims').val("");
                    $('#MustHaveClaims').val("");
                    $('#ProjectBrieId').text("");
                    $('.MustHaveclaims_v').text("");
                    $('.NicetoHaveclaims_v').text("");
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
})


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

$('#CFTUsersAdd').click(function () {
    var flag = true;
    var editorRemarks = $("#editor").val();


    //$('#Department').val() == "" && $('#Dept_UsersDropdown').val() == "" ? ($('#Err-Department').show(), $('#Error_DeptUsers').show(), flag = false) : console.log('hello')
    //$('#Department').val() == "" && $('#Dept_UsersDropdown').val() != "" ? ($('#Err-Department').show(), $('#Error_DeptUsers').hide(), flag = false) : console.log('hello')
    //$('#Department').val() != "" && $('#Dept_UsersDropdown').val() == "" ? ($('#Err-Department').hide(), flag = false) : console.log('hello')
    //$('#Dept_UsersDropdown').val() == "" ? ($('#Error_DeptUsers').show(), flag = false) : $('#Error_DeptUsers').hide();
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

})

//-------------------------------------------------------------------------------------------------Auto Save
let autoSaveInterval;
let firstInterval = true;

//debugger
//function startAutoSave() {
//    debugger
//    autoSaveInterval = setInterval(function () {
//        if (firstInterval) {
//            saveChanges();
//            firstInterval = false;
//        } else {
//            saveChanges(true);
//        }
//    }, 0.1 * 60 * 1000); // Auto-save every 5 minutes
//}

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
        ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
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
        DirectionForUse: $.trim($("#DirectionForUse").val()),
        Caution: $.trim($("#Caution").val()),
        TargetCustomer: $.trim($("#TargetCustomer").val()),
    };

    var fileName = "";
    var files = $('#supportingDocument').prop("files");

    var formData = new FormData();
    jQuery(document).ajaxStart(function () {
        //$(".preloader").fadeIn();
        $('#loader').css('visibility', 'hidden');
    });
    jQuery(document).ajaxComplete(function () {
        //$(".preloader").fadeOut();
        $('#loader').css('visibility', 'hidden');
    });
    if (!isUpdate) {
        if (files.length > 0) {
            formData.append("file", files[0]);
            $.ajax({
                type: 'POST',
                url: ROOT + "ClaimsGrid/SaveSupportingDocument",
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
    // You can send an AJAX request to your server or use any other method to save the changes.
    if (isUpdate) {
        $.ajax({
            type: 'POST',
            url: ROOT + "ClaimsGrid/AutoUpdate",
            data: { information: information },
            success: function (result) {
                console.log(result, 'successfull');
            },
            error: function (xhr, status, error) {
                console.error("auto-save failed:", error);
            }
        });
    } else {
        $.ajax({
            type: 'POST',
            url: ROOT + "ClaimsGrid/AutoSave",
            data: { information: information },
            success: function (result) {
                console.log(result, 'successfull');
            },
            error: function (xhr, status, error) {
                console.error("auto-save failed:", error);
            }
        });
    }


    console.log("Auto-save triggered!");
}

function updateAutoSave() {
    // Implement your logic to update the auto-saved changes here for the second and subsequent intervals
    console.log("Update auto-save triggered!");
}

$(document).ready(function () {
    $("#ProjectNo").change(function () {
        const selectedValue = $(this).val();
        $("#ProjectNo").select2();
        if (selectedValue !== "") {
            //startAutoSave();
        } else {
            stopAutoSave();
        }
    });

    $(window).on("beforeunload", function () {
        // Clear the auto-save interval when leaving the page
        stopAutoSave();
    });
});

//Pack label claims
$('#OnPackDataAdd').click(function () {
    if ($("#AnchorHUB").val() != "") {
        let measureByContent = CKEDITOR.instances["MeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let SupportingStmt = CKEDITOR.instances["SupportingStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let isValidInform = true;
        if ($.trim($("#Claims").val()) == "" || $("#FeasibilityClaims").val() == "" || measureByContent == "" || SupportingStmt == "" || $("#ResponsibleDeptOnPack").val()) {
            $.trim($("#Claims").val()) == "" ? ($('#Err-Claims').show(), isValidInform = false) : $('#Err-Claims').hide();
            $("#FeasibilityClaims").val() == "" ? ($('#Err-FeasibilityClaims').show(), isValidInform = false) : $('#Err-FeasibilityClaims').hide();
            measureByContent == "" ? ($('#Err-MeasuredBy').show(), isValidInform = false) : $('#Err-MeasuredBy').hide();
            SupportingStmt == "" ? ($('#Err-SupportingStmt').show(), isValidInform = false) : $('#Err-SupportingStmt').hide();
            if (depatmentBasedOnHub == "") {
                $("#ResponsibleDeptOnPack").val() == "" ? ($('#Err-ResponsibleDeptOnPack').show(), isValidInform = false) : $('#Err-ResponsibleDeptOnPack').hide();
            } //$.trim($("#OnPackRemarks").val()) == "" ? ($('#Err-OnPackRemarks').show(), isValidInform = false) : $('#Err-OnPackRemarks').hide();
            else if (depatmentBasedOnHub.length == 1 && depatmentBasedOnHub.includes("RA_INDIA")) {
                $("#ResponsibleDeptOnPack").val() == "" ? ($('#Err-ResponsibleDeptOnPack').show(), isValidInform = false) : $('#Err-ResponsibleDeptOnPack').hide();
            }
        }
        if (isValidInform) {
            $("#Err-OnPackGrid").hide();
            if (isPackLabelClaimsEdit) {
                onpackModelClaims.splice(0, 1, { supportstatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) })
            } else {
                onpackModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) })
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
                isPackLabelClaimsEdit = false;
                packLabelClaimsDetails.splice(packLabelClaimsEditIndex, 1, packLabelClaimsItem);
            } else {
                packLabelClaimsDetails.push(packLabelClaimsItem)
            }
            //version 1
            //updateClaimsUi(packLabelClaimsDetails)
            //version 2

            packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);

            updateClaimsUi2(packLabelClaimsDetails)
        }
    }
    else {
        alert("Please select the Anchor Hub in Product Description");
    }
});

var packLabelClaimsItemonpac = packLabelClaimsDetails;
//version 1
function updateClaimsUi(claimsDetails) {
    debugger
    let parent = $('.packlabel_claims');
    var container = $(".packlabel_claims");
    var container1 = $(".packlabel_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        var itemHtml1 =
            '<div class="claims_info_container">' +
            '<div class="claims_contianer">' +
            '<p class="bb-1">' + item.Claims + '</p>' +
            '<div>' +
            '<button type="button" title="Edit" class="claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete" class="claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            '</div>' +
            '</div>' +
            '<div class="claims_subdiv">' +
            '<div>' +
            '<p class="claims_heading">Feasibility of Achieving claims :</p>' +
            '<p class="claims_heading_subtext">' + item.Feasibility + '</p>' +
            '</div>' +
            '<div>' +
            '<p class="claims_heading">Supporting technical statements from R&D :</p>' +
            '<p class="claims_heading_subtext">' + item.SupportingStmt + '</p>' +
            '</div>' +
            '<div>' +
            '<p class="claims_heading">Measured By :</p>' +
            '<p class="claims_heading_subtext">' + item.MeasuredBy + '</p>' +
            '</div>' +
            '<div>' +
            '<p class="claims_heading">DSG Remarks / Restrictions :</p>' +
            '<p class="claims_heading_subtext">' + item.OnPackRemarks + '</p>' +
            '</div>' +
            '<div>' +
            '<p class="claims_heading">Responsible Department :</p>' +
            '<p class="claims_heading_subtext">' + item.ResponsibleDepartment + '</p>' +
            '</div>' +
            '</div>' +

            '</div>'
        var itemHtml2 = '<table style="width:100%;">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete" class="claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
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

        container.append(itemHtml2); // Append the item HTML to the container
        container1.append(itemHtml2); // Append the item HTML to the container
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
    debugger
    let parent = $('.packlabel_claims');
    var container = $(".packlabel_claims");
    var container1 = $(".packlabel_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];

        var itemHtml3 = '<table style="width:100%;" class="' + i + '_onpackclaims">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button"title="Edit" class="claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#OnPackClaimsDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>' +
            '<button type="button"  onclick="DeleteClaimsRecords(' + i + ')" title="Delete" class="claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (let j = 0; j < item.subOnpackClaims.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + item.subOnpackClaims[j].supportstatement + '</td>' +
                '<td style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.subOnpackClaims[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + item.subOnpackClaims.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
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
        container1.append(itemHtml3); // Append the item HTML to the container
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
var container2 = $(".packlabel_claims1");
// to handle adding onpack multiple supporting and measured by details
$("#open_onpack_modal").click(function () {
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

    // If all previous rows are filled, add a new row

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
        // Loop through each row

        onpackModelClaims = dataArray;
        if (isPackLabelClaimsEdit) {
            onpackModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["MeasuredBy"].getData()) })
        }
        $("#onpackclaims_modal").modal("hide");
    }
});
$("#open_communication_modal").click(function () {
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
            var rowData = {
                supportstatement: CKEDITOR.instances['communication_multipleEditors_' + rownumber + ''].getData(),
                MeasuredBy: CKEDITOR.instances['communication_multipleMeasuredEditors_' + rownumber + ''].getData()
            };
            dataArray.push(rowData);
        });

        communicationModelClaims = dataArray;
        if (isCommunicationClaimsEdit) {
            communicationModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) })
        }
        $("#communicationclaims_modal").modal("hide");
    }
});
container.on("click", ".claims_edit", function () {
    // var index = $(this).data("index"); // Get the data-index attribute

    var Index = $(this).closest('table').attr('class');
    var parts = Index.split('_');
    if (parts.length > 1) {
        var index = parts[0];
    }

    var item = packLabelClaimsDetails[index]; // Get the edit item using the index
    //
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
//container.on("click", ".claims_delete", function () {
//    $("#jqGridRow_DeleteModal").modal("show");
//    $("#jqGridRow_DeleteModal_Ok").off("click").on("click", function () {
//        var index = $(this).data("index"); // Get the data-index attribute
//        packLabelClaimsDetails.splice(index, 1);
//        //version 1
//        //updateClaimsUi(packLabelClaimsDetails);
//        //version 2
//        updateClaimsUi2(packLabelClaimsDetails);
//    });
//});


//Communication claims
$('#CommunicationClaimsDataAdd').click(function () {
   
    if ($("#AnchorHUB").val() != "") {
        let communicationMeasuredByContent = CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let SupportingTechStmt = CKEDITOR.instances["SupportingTechStmt"].getData().replace(/<\/?[^>]+(>|$)/g, '').replaceAll("&nbsp;", "").trim();
        let isValidInform = true;
        if ($.trim($("#CommunicationClaims").val()) == "" || $("#CommunicationFeasibilityClaims").val() == "" || communicationMeasuredByContent == "" || SupportingTechStmt == "" || $("#ResponsibleDeptCommunication").val() == "") {
            $.trim($("#CommunicationClaims").val()) == "" ? ($('#Err-CommunicationClaims').show(), isValidInform = false) : $('#Err-CommunicationClaims').hide();
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
                communicationModelClaims.splice(0, 1, { supportstatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) })
            } else {
                communicationModelClaims.splice(0, 0, { supportstatement: $.trim(CKEDITOR.instances["SupportingTechStmt"].getData()), MeasuredBy: $.trim(CKEDITOR.instances["CommunicationClaimsMeasuredBy"].getData()) })
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
                isCommunicationClaimsEdit = false;
                communicationClaimsDetails.splice(communicationClaimsEditIndex, 1, communicationClaimsItem);
            } else {
                communicationClaimsDetails.push(communicationClaimsItem)
            }
            //version 1
            //updateCommunicationClaimsUi(communicationClaimsDetails);
            //version 2
            communicationClaimsDetails = communicationClaimsDetails.filter(row => row.length !== 0);

            updateCommunicationClaimsUi2(communicationClaimsDetails);
        }
    }
    else {
        alert("Please select the Anchor Hub in Product Description");
    }
});
var communictationclaimsdata = communicationClaimsDetails;
//version 1
function updateCommunicationClaimsUi(claimsDetails) {
    var container = $(".communication_claims");
    var container1 = $(".communication_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];
        var itemHtml1 =
            '<div class="claims_info_container">' +
            '<div class="claims_contianer">' +
            '<p class="bb-1">' + item.CommunicationClaims + '</p>' +
            '<div>' +
            '<button type="button" class="communication_claims_edit claims_action_btn" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>' +
            '<button type="button" class="communication_claims_delete claims_action_btn" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            '</div>' +
            '</div>' +
            '<div class="claims_subdiv">' +
            '<div>' +
            '<p class="claims_heading">Feasibility of Achieving claims :</p>' +
            '<p class="claims_heading_subtext">' + item.Feasibility + '</p>' +
            '</div>' +
            '<div>' +
            '<p class="claims_heading">Supporting technical statements from R&D :</p>' +
            '<p class="claims_heading_subtext">' + item.SupportingTechStmt + '</p>' +
            '</div>' +
            '<div>' +
            '<p class="claims_heading">Measured By:</p>' +
            '<p class="claims_heading_subtext">' + item.CommunicationClaimsMeasuredBy + '</p>' +
            '</div>' +
            '<div>' +
            '<p class="claims_heading">DSG Remarks / Restrictions:</p>' +
            '<p class="claims_heading_subtext">' + item.CommunicationRemarks + '</p>' +
            '</div>' +
            '<div>' +
            '<p class="claims_heading">Responsible Department:</p>' +
            '<p class="claims_heading_subtext">' + item.ResponsibleDepartment + '</p>' +
            '</div>' +
            '</div>' +

            '</div>'
        var itemHtml2 = '<table style="width:100%;">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button"  title="Edit" class="communication_claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>' +
            '<button type="button"  title="Delete" class="communication_claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
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
        container1.append(itemHtml2); // Append the item HTML to the container
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
function updateCommunicationClaimsUi2(claimsDetails) {
    var container = $(".communication_claims");
    var container1 = $(".communication_claims1");
    container.empty()
    // Loop through the dynamic data and create HTML for each item
    for (var i = 0; i < claimsDetails.length; i++) {
        var item = claimsDetails[i];

        var itemHtml3 = '<table style="width:100%;" class="' + i + '_CommuniClaims">' +
            '<thead> <tr style="border: 1px solid grey;">' +
            '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
            '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
            '<button type="button" title="Edit" class="communication_claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><a href="#CommunicationClaimDetails"><i class="fa fa-edit" aria-hidden="true"></i></a></button>' +
            '<button type="button" title="Delete"  onclick="communication_claims_delete(' + i + ')" class="communication_claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (let j = 0; j < item.subCommunicationClaims.length; j++) {
            itemHtml3 += '<tr>' +
                '<td colspan="2" style="width:70%"> <span class="remarks"> <b>Supporting technical statements from R&D:</b></span>' + item.subCommunicationClaims[j].supportstatement + '</td>' +
                '<td colspan="1" style="width:15%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.subCommunicationClaims[j].MeasuredBy + '</span></td>';
            if (j == 0) {
                itemHtml3 += '<td rowspan=' + item.subCommunicationClaims.length + ' colspan="1"><span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>';
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
        container1.append(itemHtml3); // Append the item HTML to the container
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
var container = $(".communication_claims");
var container2 = $(".communication_claims1");

container.on("click", ".communication_claims_edit", function () {
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

    var communicationModelClaims = communicationModelClaims.filter(row => row.length !== 0);

    updateCommunicationClaimsModalWhileEdit(communicationModelClaims);
});
//container.on("click", ".communication_claims_delete", function () {
//$("#jqGridRow_DeleteModal").modal("show");
//    $("#jqGridRow_DeleteModal_Ok").off("click").on("click", function () {
//        var index = $(this).data("index"); // Get the data-index attribute
//        communicationClaimsDetails.splice(index, 1);
//        //version 1
//        //updateCommunicationClaimsUi(communicationClaimsDetails);
//        //version 2
//        updateCommunicationClaimsUi2(communicationClaimsDetails);
//    });
//});

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


// Function to check if the user unselects default values
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
    console.log(additionalSelectedOptions)
    if (unselectedDefaults.length > 0) {
        alert("You cannot unselect the Responsible Department values, Please remove Dependent Responsible Department from Claims and continue: " + unselectedDefaults.join(", "));
        $("#Department").val([...ActualSelectedDepartments, ...additionalSelectedOptions]).multiselect('refresh');
        return false;
        // You can add additional logic here if needed
    }
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}


$(document).ready(function () {
    // Bind change event to input elements
    $('#otherhubslicensecategory, #Dosage, #TargetOrgan, #FormulaFeatures, #AnchorHUB, #OtherMarkets, #ShelfLife, #DirectionForUse, #Caution, #TargetCustomer,#ProjectNo,#ProductName,#HGLApprovalNumber,#ProductPositioningStatement,#date,#version,#ClaimsDivision').change(function () {
        //  $('.LicenseCategory_v').text($('#LicenseCategory').val())
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
        $('.ProjectNo_v').text($('#ProjectNo').val());
        $('.ProductName_v').text($('#ProductName').val());
        $('.HGLApprovalNumber_v').text($('#HGLApprovalNumber').val());
        $('#date_v').text($('#date').val());
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

//--------For onpaack claims--------------//


//$(".preview_tab").on("click", function () {
//    $('.claimsWithRemarksEdit').hide();
//    $('.claimsWithRemarksDownload').hide();
//    $('.communicationclaimsWithRemarksEdit').hide();
//    $('.communicationclaimsWithRemarksDownload').hide();
//    debugger
//   // if (Stage <= "3") {
//        var container = $(".packlabel_claims1");
//        container.empty()

//    var claimsData1 = packLabelClaimsItemonpac;
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
//         <tr id="remarksRow" class="${item.OnPackRemarks == '' ? 'hidden-row' : ''}">
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
//        }
//   // }
//    //if (Stage <= "3") {
//        debugger
//        var Contaner2 = $(".communication_claims1");
//        Contaner2.empty();
//    var commuClaimsData = communictationclaimsdata;
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
//        }
//   // }
//});


$(".preview_tab").on("click", function () {
    $('.claims_edit').hide();
    $('.claims_delete').hide();
    $('.communication_claims_edit').hide();
    $('.communication_claims_delete').hide();
});
$(".closepreview").on("click", function () {
    $('.claims_edit').show();
    $('.communication_claims_edit ').show();
    $('.claims_delete').show();
    $('.communication_claims_delete').show();
    //$('.packlabel_claims1').text("");
    //$(".communication_claims1").text("");

});




var dropdown = document.getElementById("LicenseCategory");
var selectedText = document.getElementById("LicenseCategory_v");
dropdown.addEventListener("change", function () {
    debugger
    // Get the selected option
    var selectedOption = dropdown.options[dropdown.selectedIndex];

    // Get the text of the selected option
    var selectedOptionText = selectedOption.text;

    // Display the selected text
    selectedText.textContent = selectedOptionText;
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
                '<span class="action-link"><a onclick=DeleteDoc(' + options.rowId + ') class="deletedoc" title="Delete"><i class="flaticon-delete color-danger" title="Delete"></i></a></span>' +
                '</div> ';
        }
        /*return "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc(" + options.rowId + ")><i class='flaticon-download color-green' title='Download'></i></a><a class='deletedoc' onclick=DeleteDoc(" + options.rowId + ")><i class='flaticon-delete color-danger' title='Delete'></i></a></td><tr>";*/

        //        var fileName = rowobject.DocumentName;
        //        var fileExtension = fileName.split('.').pop().toLowerCase(); // Extract the file extension

        //        var fileTypes = {
        //            'doc': 'Microsoft Word Document',
        //            'docx': 'Microsoft Word Document',
        //            'xls': 'Microsoft Excel Spreadsheet',
        //            'xlsx': 'Microsoft Excel Spreadsheet',
        //            'ppt': 'Microsoft PowerPoint',
        //            'pptx': 'Microsoft PowerPoint',
        //            'csv': 'Microsoft Excel Spreadsheet',
        //        };



        /*return "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc(" + options.rowId + ")><i class='flaticon-download color-green' title='Download'></i></a><a class='deletedoc' onclick=DeleteDoc(" + options.rowId + ")><i class='flaticon-delete color-danger' title='Delete'></i></a></td><tr>";*/




        //        return '<div class="text-left icon_section align-items-left">' +
        //            '<span class="action-link"><a onclick=DownloadUploadedDoc(' + options.rowId + ')  class="btn-icon -download Report" title="Download"><i class="fas fa-download" title="Download"></i></a></span>' +
        //            (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="btn-icon -view" target="_blank" title="View"><i class="fas fa-eye" title="View"></i></a></span>') +
        //            '<span class="action-link"><a onclick=OnDeleteUploadedDoc(' + options.rowId + ') class="btn-icon -delete" title="Delete"><i class="fas fa-trash" title="Delete"></i></a></span>' +
        //            '</div> ';
        // }
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
$('.ui-jqgrid-bdiv').css({ 'max-height': '30vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")

}

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
                '<span class="action-link"><a onclick=DownloadSupportingDocPreview(' + options.rowId + ')  class="SupportingDoc mr-2" title="Download"><i class="flaticon-download color-green" title="Download"></i></a></span>' +
                (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDocPreview(' + options.rowId + ')  class="mr-2" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
                '</div> ';
        }
    },

],
    $('#Grid_Preview_Supporting_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Preview_Grid_Supporting_Document',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_Preview_Supporting_Document tbody tr");
            var objHeader = $("#Grid_Preview_Supporting_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
$('.ui-jqgrid-bdiv').css({ 'max-height': '30vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")

}

function DownloadSupportingDocPreview(rowId) {
    var filename = $('#Grid_Preview_Supporting_Document').jqGrid('getCell', rowId, 'SupportingDocument');
    if (filename.length > 0) {

        $('.SupportingDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
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

        var doc1 = $("#Grid_Preview_Supporting_Document").jqGrid('getGridParam', 'data');
        var doc2 = $.merge(doc1, griddata);
        $("#Grid_Preview_Supporting_Document").jqGrid('setGridParam', { data: doc2 });
        $("#Grid_Preview_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);

        $("#supportingDocument").val('');
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
    debugger
    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'SupportingDocument');
    if (filename.length > 0) {

        $('.SupportingDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}
var deleteImageIn_DocGrid = [];
//function DeleteDoc(rowId) {
//    debugger
//    var filename = $('#Grid_Supporting_Document').jqGrid('getCell', rowId, 'SupportingDocument');
//    $("#jqGridRow_DeleteModal").modal("show");
//     //confirm("Are you sure you want to delete?", function () {
//    $("#jqGridRow_DeleteModal_Ok").click(function () {
//    if (filename.length > 0) {
//        $("#Grid_Supporting_Document").jqGrid('delRowData', rowId);
//        $("#Grid_Supporting_Document").trigger('reloadGrid', [{ page: 1 }]);
//        $.ajax({
//            type: 'POST',
//            url: ROOT + "ClaimsGrid/DeleteDocumentFile",
//            data: { fileName: filename },
//            success: function (data) {
//                var path = data;
//            },
//            error: function (error) {

//                //alert("Error deleting document: " + error);
//            }
//        });

//        var data1 = {}
//        data1 = {
//            DocumentName: filename
//        }
//        deleteImageIn_DocGrid.push(data1);
//        }
//        $("#jqGridRow_DeleteModal").modal("hide");
//   });
//}
function DeleteDoc(rowId) {
    debugger
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

function DeleteClaimsRecords(i) {
    var tableclass = i;
    $("#DeleteClaimsPOPUp").modal("show");
    $("#claimsDeleteOk").off('click');
    $("#claimsDeleteOk").click(function () {
        $('table.' + tableclass + '_onpackclaims').remove();
        delete packLabelClaimsDetails[tableclass];
        //packLabelClaimsDetails = packLabelClaimsDetails.filter(row => row.length !== 0);
        $("#DeleteClaimsPOPUp").modal("hide");

        $("#Claims").val("");
        $("#FeasibilityClaims").val("");
        $(".onPackField").val("");
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
                    updateClaimsUi2(packLabelClaimsDetails);
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
                    departments = departments.concat(depatmentBasedOnHub);
                }
                var uniqueDepartments = Array.from(new Set(departments));
                packLabelClaimsDetails[i].ResponsibleDepartment = uniqueDepartments.join(',');

            }
            updateClaimsUi2(packLabelClaimsDetails);
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
            updateCommunicationClaimsUi2(communicationClaimsDetails)
        }

        $("#OtherMarkets").val('').multiselect('refresh');
        $("#AnchorHUB option").prop("disabled", false);
        $("#AnchorHUB").val('').multiselect('refresh');

    }
});

/////////////////////Code For Auto Save Started////////////////////////////////////////////////////////

$(document).ready(function () {
    let isInserted = false;
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
        return;
    } else {
        if (ProjectNo_ID == "Others") {
            if ($('#ProductName').val() == "") {
                return;
            }
        }
    }

    if (validSave) {
        let packLabel = packLabelClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 2
        }))
        let communication = communicationClaimsDetails.map(ele => ({
            ...ele,
            FromStageNo: 1,
            ToStageNo: 2
        }))
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
            ProductPositioningStatement: $.trim($("#ProductPositioningStatement").val()),
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
            DirectionForUse: $.trim($("#DirectionForUse").val()),
            Caution: $.trim($("#Caution").val()),
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

            url: ROOT + "ClaimsGrid/ClaimsAutoSaveData",
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
            url: ROOT + "ClaimsGrid/ClaimsAutoSaveEditData",
            type: 'POST',
            data: $('#ClaimsAdd').serialize(),
            success: function (response) {

            },
            error: function (error) {
            }
        });
    }
}

/////////////////////////////////Code for Autosave Ended////////////////////////////////////////



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

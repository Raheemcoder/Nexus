debugger
$(document).ready(function () {
    //if ($('#JsonClaimsData').val() != undefined) {
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

                return '<div class="text-left icon_section align-items-left">' +
                    '<span class="action-link"><a onclick=DownloadCFTUploadedDoc(' + options.rowId + ')  class="SupportingCFTUploadedDoc mr-2" title="Download"><i class="flaticon-download color-green" title="Download"></i></a></span>' +
                    (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick=ViewUploadedDoc(' + options.rowId + ')  class="mr-2" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
                    '</div> ';
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
    })

    var Stage = $('#Stage').val();
    var isEdit = $("#isEdit").data("isedit");
    var LoginId = $("#LoginId").val();
    debugger
    $('.MustHaveclaims_v').text($('#MustHaveClaims').val())
    $('.NicetoHaveclaims_v').text($('#NiceToHaveClaims').val())
    $('.RephraseClaims_v').text($('#RephraseClaims').val())
    debugger
    ////////////////// For View////////////////////////
    $('.projNo_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].ProjectNumber);
    $('.prodName_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductName);
    $('.apprNo_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].HGLApprovalNumber);
    $('#date_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : moment(claimsData.ClaimsHeadersList[0].Date).format('DD/MM/YYYY'));
    $('#version_v').text(claimsData.ClaimsHeadersList[0] === undefined ? "" : claimsData.ClaimsHeadersList[0].VersionNo);



    ////////////////// For View////////////////////////
    $('#ProductName_v').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductName);
    //$('#HGLApprovalNumber_v').val(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].HGLApprovalNumber);
    $('.ProductPositioningStatement_v').text(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].ProductPositioningStatement);
    $('.Division_v').text(claimsData.ClaimsProjectDetails[0] === undefined ? "" : claimsData.ClaimsProjectDetails[0].DivisionName);


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


    //$(document).ready(function () {

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
        debugger
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
    //})

    //version 1
    function updateClaimsUi(claimsDetails) {
        var container = $(".packlabel_claims");
        var container3 = $(".packlabel_claims1");
        container.empty()
        // Loop through the dynamic data and create HTML for each item
        for (var i = 0; i < claimsDetails.length; i++) {
            var item = claimsDetails[i];
            var itemHtml2 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" class="claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>' +
                '<button type="button" class="claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td colspan="3"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingStmt + '</span></td>' +
                '<td colspan="1" style="width:20%"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2"><span class="remarks"> <b>Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
                '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.MeasuredBy + '</span></td>' +
                '<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>'

            var itemHtml3 = ''



            container.append(itemHtml2); // Append the item HTML to the container
            container3.append(itemHtml2); // Append the item HTML to the container
            //if (isEdit == 'view' || Stage ==3) {
            //    $('.claims_action_btn').hide();
            //}
        }
        //Clearing Claims label feilds values
        //$("#Claims").val("");
        //$("#OnPackRemarks").val("")
        //$("#FeasibilityClaims").val("");
        //$("#FeasibilityClaims").trigger("change");
        //CKEDITOR.instances["MeasuredBy"].setData('');
        //CKEDITOR.instances["SupportingStmt"].setData('');
        //$("#ResponsibleDeptOnPack").val("").multiselect('refresh');

    }
    //version 2
    function updateClaimsUi2(claimsDetails) {
        var container = $(".packlabel_claims");
        var container3 = $(".packlabel_claims1");
        container.empty()
        // Loop through the dynamic data and create HTML for each item
        for (var i = 0; i < claimsDetails.length; i++) {
            var item = claimsDetails[i];
            var itemHtml3 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" class="claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>' +
                '<button type="button" class="claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
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
                '<td colspan="2"><span class="remarks"> <b>Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
                '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>';


            container.append(itemHtml3); // Append the item HTML to the container
            container3.append(itemHtml3); // Append the item HTML to the container
            //if (isEdit == 'view' || Stage == 3) {
            //    $('.claims_action_btn').hide();
            //}
        }
        //Clearing Claims label feilds values
        //$("#Claims").val("");
        //$("#OnPackRemarks").val("")
        //$("#FeasibilityClaims").val("");
        //$("#FeasibilityClaims").trigger("change");
        //CKEDITOR.instances["MeasuredBy"].setData('');
        //CKEDITOR.instances["SupportingStmt"].setData('');
        //$("#ResponsibleDeptOnPack").val("").multiselect('refresh');
        //$('#onpack_claims_modal_table tbody').empty();
        onpackModelClaims = [];

    }
    var container = $(".packlabel_claims");
    var container4 = $(".packlabel_claims1");





    //Communication claims
    function updateCommunicationClaimsUi(claimsDetails) {
        var container = $(".communication_claims");
        var container3 = $(".communication_claims1");
        container.empty()
        // Loop through the dynamic data and create HTML for each item
        for (var i = 0; i < claimsDetails.length; i++) {
            var item = claimsDetails[i];
            var itemHtml2 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" class="communication_claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>' +
                '<button type="button" class="communication_claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td colspan="3"><span class="remarks"> <b>Supporting technical statements from R&D:</b></span><span>' + item.SupportingTechStmt + '</span></td>' +
                '<td colspan="1" style="width:20%"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="2"><span class="remarks"> <b>Remarks / Restrictions: </b></span><span>' + item.CommunicationRemarks + '</span></td>' +
                '<td colspan="1" style="width:20%"><span class="remarks"> <b>Measured By:</b></span><span>' + item.CommunicationClaimsMeasuredBy + '</span></td>' +
                '<td colspan="1" style="width:20%"> <span class="remarks"> <b>Responsible Department:</b></span><span>' + item.ResponsibleDepartment + '</span></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>'
            container.append(itemHtml2); // Append the item HTML to the container
            container3.append(itemHtml2); // Append the item HTML to the container
            //if (isEdit == 'view' || Stage ==3) {
            //    $('.claims_action_btn').hide();
            //}
        }
        //Clearing Claims label feilds values
        //$("#CommunicationClaims").val("")
        //$('.claimsField').val("");
        //$("#CommunicationFeasibilityClaims").val("");
        //$("#CommunicationFeasibilityClaims").trigger('change');
        //$("#CommunicationRemarks").val("")
        //CKEDITOR.instances["SupportingTechStmt"].setData('');
        //CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
        //$("#ResponsibleDeptCommunication").val("").multiselect('refresh');

    }

    //Version 2
    function updateCommunicationClaimsUi2(claimsDetails) {
        debugger
        var container = $(".communication_claims");
        var container3 = $(".communication_claims1");
        container.empty()
        // Loop through the dynamic data and create HTML for each item
        for (var i = 0; i < claimsDetails.length; i++) {
            var item = claimsDetails[i];

            var itemHtml3 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="3"> <span> <b>Claims Name: </b></span><span>' + item.CommunicationClaims + '</span></th>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" class="communication_claims_edit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>' +
                '<button type="button" class="communication_claims_delete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
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
                '<td colspan="2"><span class="remarks"> <b>Remarks / Restrictions: </b></span><span>' + item.CommunicationRemarks + '</span></td>' +
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
        //$("#CommunicationClaims").val("")
        //$('.claimsField').val("");
        //$("#CommunicationFeasibilityClaims").val("");
        //$("#CommunicationFeasibilityClaims").trigger('change');
        //$("#CommunicationRemarks").val("")
        //CKEDITOR.instances["SupportingTechStmt"].setData('');
        //CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
        //$("#ResponsibleDeptCommunication").val("").multiselect('refresh');
        //$('#communication_claims_modal_table tbody').empty();
        communicationModelClaims = [];
    }
    var container1 = $(".communication_claims");
    var container4 = $(".communication_claims1");


    $('.generateClaims_pdf').click(function () {
        debugger;
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

    //Supporting Documents Table
    $(claimsData.ClaimsSupportingDocument).each(function (i, obj) {
        debugger
        var fileName = obj.SupportingDocument.replaceAll('"', '');
        var fileExtension = fileName.split('.').pop().toLowerCase();
        var EncodedFile = encodeURIComponent(fileName);

        var fileTypes = {
            'doc': 'Microsoft Word Document',
            'docx': 'Microsoft Word Document',
            'xls': 'Microsoft Excel Spreadsheet',
            'xlsx': 'Microsoft Excel Spreadsheet',
            'ppt': 'Microsoft PowerPoint',
            'pptx': 'Microsoft PowerPoint',
            'csv': 'Microsoft Excel Spreadsheet',
        };
        var str = "<tr>";
        //str += "<td class='text-left' style='text-wrap:wrap;><a class='btn-icon -history SupportingDocDownload' data-attribute='" + obj.SupportingDocument + "'>" + fileName + "</a></td><td id='uploadedBy' class='text-left'>" + obj.UploadedBy + "</td><td id='uploadedOn' class='text-left'>" + moment(obj.UploadedOn).format('DD-MM-YYYY') + "</td>";
        //var matches = obj.UploadedBy.match(/\(([^)]+)\)/);
        str += "<td class='text-left' style='text-wrap:wrap;><a class='btn-icon -history SupportingDocDownload' data-attribute='" + obj.SupportingDocument + "'>" + fileName + "</a></td><td id='uploadedBy' class='text-left'>" + obj.UploadedBy + "</td><td id='' class='text-left'>" + obj.UploadedOn + "</td>";
        var matches = obj.UploadedBy.match(/\(([^)]+)\)/);

        if (Stage <= 3) {
            if (fileExtension in fileTypes) {
                str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc_V('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a></td><tr>";
            } else {
                str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc_V('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a><a class='ViewSupportingDoc' href='" + ROOT + 'Pdfupload/' + decodeURIComponent(EncodedFile) + "' target='_blank'><i class='flaticon-view color-blue' title='View'></i></a></td></tr>";
            }
        }
        else if (role == "DSG Initiator" || role == "ADMIN" || role == "DSG Manager" || matches[1] == LoginId) {
            if (fileExtension in fileTypes) {
                str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc_V('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a></td><tr>";
            } else {
                str += "<td class='text-center'><a class='SupportingDoc mr-2' onclick=DownloadSupportingDoc_V('" + EncodedFile + "')><i class='flaticon-download color-green' title='Download'></i></a><a class='ViewSupportingDoc' href='" + ROOT + 'Pdfupload/' + decodeURIComponent(EncodedFile) + "' target='_blank'><i class='flaticon-view color-blue' title='View'></i></a></td></tr>";
            }
        }
        else {
            if (fileExtension in fileTypes) {
            }
            else {
                str += "<td class='text-center'><a class='ViewSupportingDoc' href='" + ROOT + 'Pdfupload/' + decodeURIComponent(EncodedFile) + "' target='_blank'><i class='flaticon-view color-blue' title='View'></i></a></td></tr>";
            }
        }

        $('#SupportingDocuments_v').append(str);
        str = "";
    });

    //function viewSupportingDocuments() {
    //    debugger
    //    $('#documentModal').modal('show');
    //}

    function DownloadSupportingDoc_V(EncodedFile) {
        debugger
        var filename = decodeURIComponent(EncodedFile);
        if (filename.length > 0) {
            $('.SupportingDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
            return true;
        }
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








    //DSG Review CODE
    //version 1
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
                '<button type="button" class="claimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>';
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
        //$("#Claims").val("");
        //$("#OnPackRemarks").val("")
        //$("#FeasibilityClaims").val("");
        //$("#FeasibilityClaims").trigger("change");
        //CKEDITOR.instances["MeasuredBy"].setData('');
        //CKEDITOR.instances["SupportingStmt"].setData('');
        //$("#ResponsibleDeptOnPack").val("").multiselect('refresh');

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
            var itemHtml2 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
                '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" class="claimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>';
            //'<button type="button" class="claimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            if (item.DocumentName && item.DocumentName !== "") {
                debugger
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
                itemHtml2 += '<a class="claimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs" data-index="' + i + '"  data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>' /*+ (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon onpackView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>')*/;

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
            var itemHtml3 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
                '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" class="claimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>';
            //'<button type="button" class="claimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            if (item.DocumentName && item.DocumentName !== "") {
                debugger
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
                itemHtml3 += '<a class="claimsWithRemarksDownload Icon_file claims_action_btn download_icon_green" title="Documents" onclick=showMultipleUploadedImages("' + item.ClaimsId + '","' + GridId + '","Onpack") data-index="' + i + '"  data-attribute=' + item.DocumentName + '><img src="../images/multiimages.png"/></a>'
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
                        if (i % 3 == 0) {
                            itemHtml3 += '</tr><tr>'
                        }
                        let colspan = i == 0 || i % 3 == 0 ? 2 : 1;

                        itemHtml3 += '<td colspan="' + colspan + '">' +
                            '<span class="remarks"><b>' + info[i] + ' Remarks</b></span>' +
                            '<span>' + item[info[i]] + '</span>' +
                            '</td>'
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
        //$("#Claims").val("");
        //$("#OnPackRemarks").val("")
        //$("#FeasibilityClaims").val("");
        //$("#FeasibilityClaims").trigger("change");
        //CKEDITOR.instances["MeasuredBy"].setData('');
        //CKEDITOR.instances["SupportingStmt"].setData('');
        //$("#ResponsibleDeptOnPack").val("").multiselect('refresh');
        //$('#onpack_claims_modal_table tbody').empty();
        onpackModelClaims = [];

    }

    //version 1
    function updateCommunicationClaimsWithRemarksUI(claimsDetails) {
        var container = $(".communication_claims");
        var container3 = $(".communication_claims1");
        container.empty()
        // Loop through the dynamic data and create HTML for each item
        for (var i = 0; i < claimsDetails.length; i++) {
            var item = claimsDetails[i];
            const info = fetchContainedDepartment(item);
            var itemHtml2 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
                '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" title="Edit" class="communicationclaimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>';
            //'<button type="button" class="communicationclaimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            if (item.DocumentName && item.DocumentName !== "") {
                itemHtml2 += '<a title="Documents" class="communicationclaimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs"  data-index="' + i + '" data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>';
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
        //$("#CommunicationClaims").val("")
        //$('.claimsField').val("");
        //$("#CommunicationFeasibilityClaims").val("");
        //$("#CommunicationFeasibilityClaims").trigger('change');
        //$("#CommunicationRemarks").val("")
        //CKEDITOR.instances["SupportingTechStmt"].setData('');
        //CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
        //$("#ResponsibleDeptCommunication").val("").multiselect('refresh');

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
            var itemHtml2 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
                '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" title="Edit" class="communicationclaimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>';
            //'<button type="button" class="communicationclaimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
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
                itemHtml2 += '<a  title="Documents" class="communicationclaimsWithRemarksDownload claims_action_btn download_icon_green downloadUploadedDocs"  data-index="' + i + '" data-attribute=' + item.DocumentName + '><i class="fas fa-download" aria-hidden="true"></i></a>'
                    //+
                    //(fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')"  class="btn-icon communicationView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>')
                    ;
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
            var itemHtml3 = '<table style="width:100%;">' +
                '<thead> <tr style="border: 1px solid grey;">' +
                '<th colspan="2" style="border: 1px solid #000 !important;"> <span> <b>Claims Name: </b></span><span>' + item.Claims + '</span></th>' +
                '<td colspan="1" style="width:20%;border: 1px solid #000 !important;"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                '<button type="button" title="Edit" class="communicationclaimsWithRemarksEdit claims_action_btn edit_icon_blue" data-index="' + i + '"><i class="fa fa-edit" aria-hidden="true"></i></button>';
            //'<button type="button" class="communicationclaimsWithRemarksDelete claims_action_btn delete_icon_red" data-index="' + i + '"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>' +
            if (item.DocumentName && item.DocumentName !== "") {
                debugger
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
   /*             + (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon communicationView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>')*/
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
                        if (i % 3 == 0) {
                            itemHtml3 += '</tr><tr>'
                        }
                        let colspan = i == 0 || i % 3 == 0 ? 2 : 1;

                        itemHtml3 += '<td colspan="' + colspan + '">' +
                            '<span class="remarks"><b>' + info[i] + ' Remarks</b></span>' +
                            '<span>' + item[info[i]] + '</span>' +
                            '</td>'
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
        //$("#CommunicationClaims").val("")
        //$('.claimsField').val("");
        //$("#CommunicationFeasibilityClaims").val("");
        //$("#CommunicationFeasibilityClaims").trigger('change');
        //$("#CommunicationRemarks").val("")
        //CKEDITOR.instances["SupportingTechStmt"].setData('');
        //CKEDITOR.instances["CommunicationClaimsMeasuredBy"].setData('');
        //$("#ResponsibleDeptCommunication").val("").multiselect('refresh');
        //$('#communication_claims_modal_table tbody').empty();
        communicationModelClaims = [];

    }





    $(document).ready(function () {
        $('.onpack_document, .communication_document').change(function () {
            var numFiles = this.files.length;
            if (numFiles > 0) {
                $(this).next("div").hide();
            }
        });
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
            selectedOptions1.push('IRA');
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


    function downloadRemarks() {
        $(".downloadUploadedDocs").click(function () {
            SupportingDocDownload = $(this).attr('data-attribute');
            SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
            SupportingDocDownload = SupportingDocDownload.replaceAll('"', '')
            SupportingDocDownload = SupportingDocDownload.replaceAll('/', '')

            if (SupportingDocDownload.length > 0) {
                $('.downloadUploadedDocs').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + SupportingDocDownload + '&location=ClaimsReviewFiles');
                return true;
            }
        })
    }




    //--------For onpaack claims--------------//

    //-------------------------------------****------------------------------------------//
    //   if (Stage == "3") {
    //        var container = $(".packlabel_claims");
    //        var container4 = $(".packlabel_claims1");
    //        container.empty()

    //        var claimsData1 = claimsData.ClaimsOnPackDetails;
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
    //            container4.append(onPacklabelclaimsHtml); // Append the item HTML to the container
    //        }
    //}
    //if (Stage == "3") {
    //    debugger
    //    var Contaner2 = $(".communication_claims");
    //    Contaner2.empty();
    //    var commuClaimsData = claimsData.ClaimsCommunicationDetails;
    //    for (var i = 0; i < commuClaimsData.length; i++) {
    //        var item = commuClaimsData[i];
    //        var communicaationClimsHtml = `
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

    //        Contaner2.append(communicaationClimsHtml); // Append the item HTML to the container
    //    }
    //}
    //--------------------------------------------***------------------------------------//
    if (Stage == "3") {
        var container = $(".packlabel_claims");
        var container4 = $(".packlabel_claims1");
        container.empty()

        var claimsData1 = claimsData.ClaimsOnPackDetails;
        for (var i = 0; i < claimsData1.length; i++) {
            var item = claimsData1[i];
            var Remarks = claimsData.ClaimsOnPackDetails[i].Comments;
            //  var Department = `${department}`;
            if (item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) {
                debugger
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
                /*+  (fileExtension in fileTypes ? '' : '<span style="display: none;"  class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon onpackView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>')*/ +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            //if (item.DocumentName && item.DocumentName !== "") {
            //    debugger
            //    var fileName = item.DocumentName.replace(/"/g, ''); // Replace all double quotes
            //    var fileExtension = fileName.split('.').pop().toLowerCase();
            //    var fileTypes = {
            //        'doc': 'Microsoft Word Document',
            //        'docx': 'Microsoft Word Document',
            //        'xls': 'Microsoft Excel Spreadsheet',
            //        'xlsx': 'Microsoft Excel Spreadsheet',
            //        'ppt': 'Microsoft PowerPoint',
            //        'pptx': 'Microsoft PowerPoint',
            //        'csv': 'Microsoft Excel Spreadsheet',
            //    };
            //    onPacklabelclaimsHtml += '<tr>' +
            //        '<td colspan="4"><a title="Download" class="onPackPreview claims_action_btn downloadUploadedDocs" onclick="Downloaddoc(\'' + fileName + '\')" title="Download"><i class="fas fa-download" aria-hidden="true"></i></a>' +
            //        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon onpackView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
            //        '</td>' +
            //        '</tr>';
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
                '<td colspan="2"><span class="remarks"> <b>Remarks / Restrictions: </b></span><span>' + item.OnPackRemarks + '</span></td>' +
                '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '</tr>';
            onPacklabelclaimsHtml += '<tr>' +
                '<td colspan="4"><span class="remarks"> <b>' + item.Department + '' + " Remarks" + ':</b></span><span>' + Remarks + '</span></td>' + '</tr>' +
                '</tbody>' +
                '</table>';

            container.append(onPacklabelclaimsHtml); // Append the item HTML to the container
            container4.append(onPacklabelclaimsHtml); // Append the item HTML to the container
        }
    }
    if (Stage == "3") {
        var Contaner2 = $(".communication_claims");
        Contaner2.empty();
        var commuClaimsData = claimsData.ClaimsCommunicationDetails;
        for (var i = 0; i < commuClaimsData.length; i++) {
            var item = commuClaimsData[i];
            var Remarks = claimsData.ClaimsCommunicationDetails[i].Comments;
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
                '<th class="d-flex gap-10" colspan="1" style=" border-left: none !important;border-bottom: none! important;">' +
                ((item.DocumentName != "" && item.DocumentName != "undefined" && item.DocumentName != null) ?
                    '<td colspan="1" style="text-align: right;"><a title="Download" style="background: green; " class="btn-icon communicattionPreview claims_action_btn downloadUploadedDocs" onclick="Downloaddoc(\'' + fileName + '\')" data-index="' + i + '" data-attribute=' + fileName + '><i class="fas fa-download" aria-hidden="true"></i></a>'
                    :
                    '<th colspan="1">'
                )
                /*+ (fileExtension in fileTypes ? '' : '<span style="display: none;" class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon communicationView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') */ +
                '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            //if (item.DocumentName && item.DocumentName !== "") {
            //    var fileName = item.DocumentName.replace(/"/g, ''); // Replace all double quotes
            //    var fileExtension = fileName.split('.').pop().toLowerCase();
            //    var fileTypes = {
            //        'doc': 'Microsoft Word Document',
            //        'docx': 'Microsoft Word Document',
            //        'xls': 'Microsoft Excel Spreadsheet',
            //        'xlsx': 'Microsoft Excel Spreadsheet',
            //        'ppt': 'Microsoft PowerPoint',
            //        'pptx': 'Microsoft PowerPoint',
            //        'csv': 'Microsoft Excel Spreadsheet',
            //    };

            //    communicaationClimsHtml += '<tr>' +
            //        '<td colspan="4"><a title="Download" class="communicattionPreview claims_action_btn  downloadUploadedDocs" onclick="Downloaddoc(\'' + fileName + '\')" data-index="' + i + '" data-attribute=' + fileName + '><i class="fas fa-download" aria-hidden="true"></i></a>' +
            //        (fileExtension in fileTypes ? '' : '<span class="action-link"><a onclick="ViewDocFile(\'' + fileName + '\')" class="btn-icon communicationView" target="_blank" title="View"><i class="flaticon-view color-blue" title="View"></i></a></span>') +
            //        '</td>' +
            //        '</tr>';
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
                '<td colspan="2"><span class="remarks"> <b>Remarks / Restrictions: </b></span><span>' + item.CommunicationRemarks + '</span></td>' +
                '<td colspan="2"><span class="remarks"> <b>Feasibility of Achieving claims:</b></span><span>' + item.Feasibility + '</span></td>' +
                '</tr>';
            communicaationClimsHtml += '<tr>' +
                '<td colspan="4"><span class="remarks"> <b>' + item.Department + '' + " Remarks" + ':</b></span><span>' + Remarks + '</span></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>';
            Contaner2.append(communicaationClimsHtml); // Append the item HTML to the container
        }
    }




    //--------For Communiction claims--------------//

    $(".close").on("click", function () {
        $('.flaticon-delete').show();

    });
    //$(".close").on("click", function () {
    //    //$('.ontable').text($('.formulation_table ').text());
    //    //$('.tablevalues').text($('.communication_claims').text());
    //    $('.claimsWithRemarksEdit').show();
    //    $('.claimsWithRemarksDownload').show();
    //    $('.communicationclaimsWithRemarksEdit').show();
    //    $('.communicationclaimsWithRemarksDownload').show();
    //    if (Stage == "3") {
    //        $('.packlabel_claims').text("");
    //        $(".communication_claims").text("");
    //    }
    //    $('.claims_edit').show();
    //    $('.communication_claims_edit ').show();
    //    $('.claims_delete').show();
    //    $('.communication_claims_delete').show();


    //});
    if (isEdit = "view") {
        $('.onpackView').hide();
        $('.communicationView').hide();
        $('.claimsWithRemarksEdit').hide();
        //if (Stage > 3 && isEdit != "view") {
        $('.claimsWithRemarksDownload').show();
        $('.communicationclaimsWithRemarksDownload').show();
        // } else {
        //$('.claimsWithRemarksDownload').hide();
        //$('.communicationclaimsWithRemarksDownload').hide();
        //}
        $('.flaticon-delete').hide();
        $('.claimsWithRemarksEdit').hide();
        //$('.claimsWithRemarksDownload').hide();
        $('.communicationclaimsWithRemarksEdit').hide();

        $('.claims_edit').hide();
        $('.claims_delete').hide();
        $('.communication_claims_edit').hide();
        $('.communication_claims_delete').hide();

    }

});

function ViewDocFile(fileName) {
    debugger
    var imageUrl = ROOT + 'ClaimsReviewFiles/' + fileName;
    window.open(imageUrl, '_blank');
}
function Downloaddoc(fileName) {
    debugger
    //SupportingDocDownload = $(this).attr('data-attribute');
    fileName = fileName.replaceAll('"', '')
    fileName = fileName.replaceAll('"', '')
    fileName = fileName.replaceAll('/', '')

    if (fileName.length > 0) {
        $('.downloadUploadedDocs').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + fileName + '&location=ClaimsReviewFiles');
        return true;
    }
}


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
        label: 'Deaprtment Name',
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
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
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



function DownloadCFTUploadedDoc(rowId) {
    var filename = $('#CFTreview_Document').jqGrid('getCell', rowId, 'CFTUploadedDocument');
    if (filename.length > 0) {
        $('.SupportingCFTUploadedDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}



function DownloadCFTUploadedExcelDoc(rowId) {
    var filename = $('#GridShow_UploadedExcel').jqGrid('getCell', rowId, 'DocumentName');
    if (filename.length > 0) {
        $('.SupportingCFTUploadedDoc').prop("href", ROOT + "ClaimsGrid/DownloadDocumentFile?fileName=" + decodeURIComponent(filename));
        return true;
    }
}




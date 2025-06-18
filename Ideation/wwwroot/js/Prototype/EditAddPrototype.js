var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1; // getMonth() returns a zero-based index
var year = today.getFullYear();
var todaydate = $.datepicker.formatDate('dd-mm-yy', today);

var projectDetails = $.parseJSON($('#ProjectDetails').val());
var jsonFormPrototypeData = $.parseJSON($('#JsonFormPrototypeData').val());

var prototypeDetails = jsonFormPrototypeData['PrototypeDetailsList'];
var submissionDetails = jsonFormPrototypeData['PrototypeSubmissionDetailsList'];
var prototypeId = prototypeDetails[0].PrototypeId;
var currentSubmissionNo = prototypeDetails[0].SubmissionNo;

var statusId = $('#PrototypeStatusId').val();
var iconName = $('#IconName').val();

var userRoleId = $('#UserRoleId').val();

var userName = $('#UserName').val();

var jsonFormHubReviewData = [];
var jsonFormHgmlReviewData = [];
var jsonFormApprovedData = [];
var jsonFormReworkData = [];
var prototypeHubDetails = [];

if (statusId != 5 || iconName == 'View') {
    $(".modalstatus_popup").hide();
}
if (statusId == "4") {
    debugger
    jsonFormHubReviewData = $.parseJSON($('#JsonFormPrototypeHubReviewData').val());
}
if (statusId == "5") {
    debugger
    jsonFormHgmlReviewData = $.parseJSON($('#JsonFormPrototypeHgmlReviewData').val());
    currentSubmissionHubDetails = $.parseJSON($('#PrototypeHubDetais').val());
    prototypeHubDetails = currentSubmissionHubDetails.filter(obj => obj.SubmissionNo === currentSubmissionNo && obj.HubName != 'HGML');
    if (prototypeHubDetails.length == 0) {
        $(".modalstatus_popup").hide();
    }
}

if (statusId == "6" || statusId == "8") {
    debugger
    jsonFormApprovedData = $.parseJSON($('#JsonFormPrototypeApprovedData').val());
}

//if (statusId == "7") {
debugger
jsonFormReworkData = $.parseJSON($('#JsonFormPrototypeReworkData').val());
//}

var submissionDetailsTableData = [];

$(document).ready(function () {

    if (statusId == 5 && iconName != 'View') {
        $(".close_status").click(function () {
            $(".modalstatus_popup").hide();

            $(".modalstatus_popup").removeClass('ParticulatBatchPopup');
        });

        $("#CompleteHubStatus_Icon").click(function () {
            $(".modalstatus_popup").show();
        });
        //$("#BatchNoBased_HubStatus_Icon_InJqGrid").click(function () {
        //    $(".modalstatus_popup").show();
        //});
    }

    $("#BatchNoBased_HubStatus_Icon_InApprovedJqGrid").click(function () {
        $(".modalstatus_popup").show();
    });


    //$(".Date").val(todaydate);

    $('#ProjectNo').val(prototypeDetails[0].ProjectNo);
    $('#ProjectNo').trigger('change');

    //$('#ProjectNo').val(prototypeDetails[0].ProjectNo);
    $('#ProjectDescription').val(prototypeDetails[0].ProjectDescription);
    $('#HghCode').val(prototypeDetails[0].HghCode);
    $('#ProductName').val(prototypeDetails[0].ProductName);
    $('#DivisionName').val(prototypeDetails[0].DivisionName);
    $('#DosageForm').val(prototypeDetails[0].DosageForm);
    $('#ProvisionalClaim').val(prototypeDetails[0].ProvisionalClaim);
    $('#Remarks').val(prototypeDetails[0].Remarks);

    $('#SubmissionNo').val(prototypeDetails[0].SubmissionNo);

    $('#Approved_SubmissionNo').text(prototypeDetails[0].SubmissionNo);

    var row = "";
    debugger

    if (statusId == 1 || statusId == 2 || statusId == 7 || statusId == 9 || statusId == 10) {

        if (submissionDetails.length > 0) {

            if (statusId == 7) {
                $('#OnClickAddSubmission_ShowMe_1, #SubmitInRework, #Save').show();
            }

            $.each(submissionDetails, function (i, obj) {
                debugger

                var fileExtension = obj.Composition.split('.').pop().toLowerCase();
                row +=
                    `<tr>
                        <td style="text-align:center"><input type="checkbox" onclick class="Check" name="name1"/></td>
                        <td id="SlNo">`+ (i + 1) + `</td>
                        <td>
                            <div class="">
                                <input placeholder="Date" type="text"  value="`+ obj.Date + `" id="Date" class="form-control Date" data-datepicker autocomplete="off">
                            </div>
                        </td>
                        <td>
                            <div class="">
                                <input placeholder="Batch Number"  type="text"  value="`+ obj.BatchNumber + `" id="BatchNumber" class="form-control BatchNumber">
                            </div>
                        </td>
                        <td>
                            <div class="">
                                <input type="text" onpaste="return false;" autocomplete="off" value="`+ obj.SamplesByFd + `" placeholder="Samples By FD" onkeypress="return onlyNumbers();"  id="SamplesByFd" class="form-control samplesbyfd">
                            </div>
                        </td>
                        <td>
                            <div class="">
                                <textarea placeholder="F&D Comments" id="FandDComments" class="form-control FandDComments" row='1'> `+ obj.FandDComments + `</textarea>
                            </div>
                        </td>
                        <td>
                            <div class="Composition d-flex">
                                <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" id="CompositionFile" class="form-control" onchange="return fileCompositionValidation()">
                                <a onclick="DownloadImage(this)"${(obj.Composition == "" || obj.Composition == null ? ' style="display:none;"' : "")} id="CompositionImageDownload" class="btn-icon -delete mt-2 ms-2">
                                    <i class="fas fa-download" title="Download"></i>
                                </a>
                         <a onclick=ViewImage(this) ${(obj.Composition == "" || obj.Composition == null || fileExtension == "xlsx" || fileExtension == "xls" || fileExtension == "doc" || fileExtension == "docx"  ? ' style="display:none;"' : "")} id="CompositionImageView" target="" class="btn-icon -view mt-2 ms-2" title="View">
                        <i class="fas fa-eye" title="View"></i>
                           </a>               
                            </div>
                            <div>
                               <span id="Err_CompositionDocuments" style="color:red;display:none">The file must be of type: .pdf, .doc, .docx, .xls, .xlsx, .png, .Jpg</span>
                            </div>
                        </td>
                        <td style="display:none">
                                <div class="">
                                <textarea  id="CompositionHide" class="form-control CompositionHide">` + obj.Composition + `</textarea>
                            </div>
                        </td>
                    </tr>`;
            });
        }
    }

    $("#SubmissionDetail_Table").append(row);


    if (statusId == 3) {

        $("#ProjectDescription, #HghCode, #ProductName, #DosageForm, #ProvisionalClaim, #Remarks").attr("readonly", true);
        $("#ProjectNo").prop("disabled", true);

        $('#SaveHeader, #Delete, #Clone, #Add_GridRow').hide();

        $('#SubmissionDetail_Table_Header').empty()

        $('#SubmissionDetail_Table_Header').append(

            `<tr class="bd1">
                <th style="text-align:center" class="SlNo" scope="col">S.No</th>
                <th style="text-align:center" class="Date" scope="col">Date<span class="color-red">*</span></th>
                <th style="text-align:center" class="BatchNumber" scope="col">Batch Number<span class="color-red">*</span></th>
                <th style="text-align:center" class="SamplesByFd" scope="col">Samples By FD<span class="color-red">*</span></th>
                <th style="text-align:center" class="FandDComments" scope="col">F&D Comments</th>
                <th style="text-align:center" class="Composition" scope="col">Composition</th>
                <th style="text-align:center; display:none" scope="col">CompositionHide</th>
                <th style="text-align:center;" class="SamplesSentTo" scope="col">Samples Sent To</th>
            </tr>`
        );

        if (submissionDetails.length > 0) {

            appendDataToSubmissionDetailsTable(submissionDetails, statusId);
        }

    }

    if (statusId == 4) {

        debugger
        $("#ProjectDescription, #HghCode, #ProductName, #DosageForm, #ProvisionalClaim, #Remarks").attr("readonly", true);
        $("#ProjectNo").prop("disabled", true);

        $('#SaveHeader, #Delete, #Clone, #Add_GridRow').hide();

        $('#SubmissionDetail_Table_Header').empty()

        $('#SubmissionDetail_Table_Header').append(

            `<tr class="bd1">
                <th style="text-align:center;" class="" scope="col">S.No</th>
                <th style="text-align:center;" class="Date" scope="col">Date</th>
                <th style="text-align:center;" class="" scope="col">Batch Number</th>
                <th style="text-align:center;" class="" scope="col">Composition</th>
                <th style="text-align:center;" class="" scope="col">F&D Comments</th>
                <th style="text-align:center;" class="" scope="col">Samples Sent To</th>
                <th style="text-align:center;" class="" scope="col">No Of Samples</th>
                <th style="text-align:center;" class="" scope="col">Trackig Details</th>
                <th style="text-align:center;" class="" scope="col">PMD Remarks</th>
                <th style="text-align:center;" class="" scope="col">HUB Status<span class="color-red">*</span></th>
                <th style="text-align:center;" class="" scope="col">HUB Remarks<span class="color-red">*</span></th>

                <th style="text-align:center; display:none" scope="col">CompositionHide</th>
            </tr>`

        );

        if (jsonFormHubReviewData.PrototypeHubReviewData.length > 0) {

            debugger
            var hubReviewSubmissionDetails = jsonFormHubReviewData.PrototypeHubReviewData;

            appendDataToSubmissionDetailsTable(hubReviewSubmissionDetails, statusId);
        }
    }

    if (statusId == 5) {

        debugger
        $("#ProjectDescription, #HghCode, #ProductName, #DosageForm, #ProvisionalClaim, #Remarks").attr("readonly", true);
        $("#ProjectNo").prop("disabled", true);

        $('#SaveHeader, #Delete, #Clone, #Add_GridRow').hide();

        $('#SubmissionDetail_Table_Header').empty()

        $('#SubmissionDetail_Table_Header').append(

            `<tr class="bd1">
                <th>S.No</th>
                <th style="text-align:center" class="Date" scope="col">Date</th>
                <th style="text-align:center" class="BatchNumber" scope="col">Batch Number</th>
               
                <th style="text-align:center" scope="col">F&D Comments</th>
                <th style="text-align:center;" class="" scope="col">Composition</th>
                <th style="text-align:center;" scope="col">Samples Sent To</th>
                <th style="text-align:center;" class="HubStatus" scope="col">HUB Status</th>
                <th style="text-align:center;" class="HgmlStatus" scope="col">HGML Status <span class="color-red">*</span></th>
                <th style="text-align:center;" scope="col">HGML Remarks <span class="color-red">*</span></th>
            </tr>`

        );

        if (jsonFormHgmlReviewData.PrototypeHgmlReviewData.length > 0) {

            debugger
            var hgmlReviewSubmissionDetails = jsonFormHgmlReviewData.PrototypeHgmlReviewData;

            appendDataToSubmissionDetailsTable(hgmlReviewSubmissionDetails, statusId);
        }
    }

    if (statusId == 6) {

        $("#ProjectDescription, #HghCode, #ProductName, #DosageForm, #ProvisionalClaim, #Remarks").attr("readonly", true);
        $("#ProjectNo").prop("disabled", true);

        $('#SaveHeader, #Delete, #Clone, #Add_GridRow').hide();

        $("#Approved_Prototype").jqGrid("clearGridData");
        $("#Approved_Prototype").jqGrid('setGridParam', { data: jsonFormApprovedData.PrototypeSubmissionDetailsList.length == 0 ? [] : jsonFormApprovedData.PrototypeSubmissionDetailsList });
        $("#Approved_Prototype").trigger('reloadGrid', [{ page: 1 }]);


        $(".approvedStageCollapseButton").click();
    }

    if (statusId == 7) {

        $("#ProjectDescription, #HghCode, #ProductName, #DosageForm, #ProvisionalClaim").attr("readonly", true);
        $("#ProjectNo").prop("disabled", true);

        if (submissionDetails.length == 0) {

            $('#SaveHeader, #OnClickAddSubmission_ShowMe_1, #SubmitInRework, #Save').hide();
        }


        if (jsonFormReworkData["PrototypeSubmissionDetailsList"].length != 0) {
            debugger

            var uniqueSubmissions = [];
            var htmlData = "";

            $.each(jsonFormReworkData["PrototypeSubmissionDetailsList"], function (index, submission) {
                var submissionNo = submission.SubmissionNo;
                if ($.inArray(submissionNo, uniqueSubmissions) === -1) {
                    uniqueSubmissions.push(submissionNo);
                }
            });

            //uniqueSubmissions.push('123');

            // Loop through unique submission numbers
            $.each(uniqueSubmissions, function (index, submissionNo) {

                htmlData = `<div class="accordion accordion-flush ${index != 0 ? "mt-3" : ""}" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button onclick="OnClickOfRejectedSubmissionNo(this)" class="accordion-button collapsed px-2 py-2 `+ submissionNo + `" type="button" aria-expanded="false" aria-controls="flush-collapseOne">
                                            <span class="accordion_header" id="Rejected_SubmissionNo">`+ submissionNo + `</span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne`+ submissionNo + `" class="accordion-collapse collapse hideFlush" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                            <div class="row product_profile">
                                            </div>

                                            <div class="row">
                                                <div class="save_buttons float-right text-right">
                                                     <a href="##" onclick="onClickCompleteHubStatus('`+ submissionNo + `')">HUB Status</a>
                                                </div>
                                            </div>

                                            <div class="m-table__main mt-2 mb-4 jai-hanuman">
                                                <div class="m-table__responsive -virtual-scroll">
                                                    <table id="Rework_Prototype`+ submissionNo + `" class="table table-bordered Rework_Prototype"></table>
                                                    <div class="Rework_Prototype_pager"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`


                $('#Dynamic_SubmissionNo').append(htmlData);

                colmodels = [

                    {
                        name: 'SubmissionNo',
                        label: 'Submission No.',
                        resizable: true,
                        ignoreCase: true,
                        hidden: true
                    },
                    {
                        name: 'Date',
                        label: 'Date',
                        resizable: true,
                        ignoreCase: true,
                        width: 100
                    },
                    {
                        name: 'BatchNumber',
                        label: 'Batch Number',
                        resizable: true,
                        ignoreCase: true,
                    },
                    {
                        name: 'SamplesByFd',
                        label: 'Samples By FD',
                        resizable: true,
                        ignoreCase: true,
                    },
                    {
                        name: 'FandDComments',
                        label: 'F&D Remarks',
                        resizable: true,
                        ignoreCase: true,
                        width: 200
                    },
                    {
                        name: '',
                        label: 'Composition',
                        resizable: true,
                        ignoreCase: true,
                        formatter: function (cellvalue, options, rowobject) {
                            debugger
                            return `<div class="demo-content pt-2 d-flex justify-content-center" disabled>` +
                                (rowobject.Composition == "" || rowobject.Composition == null ? '<i></i>' : `<a disabled onclick=DownloadImageInGrid(this,'#Rework_Prototype` + submissionNo + `') id = "CompositionImageDownload" > 
                            <i class="fas fa-download" aria-hidden="true" disabled title="Download"></i>
                        </a>`) +
                                `</div>`;
                        }
                    },
                    {
                        name: 'Composition',
                        label: 'CompositionHide',
                        resizable: true,
                        ignoreCase: true,
                        hidden: true,
                        classes: 'Compositon'
                    },
                    {
                        name: 'SamplesSentTo',
                        label: 'Samples Sent To',
                        resizable: true,
                        ignoreCase: true,
                        width: 200
                    },
                    {
                        name: 'HubStatus',
                        label: 'HUB Status',
                        resizable: true,
                        ignoreCase: true,
                        width: 110,
                        formatter: function (cellvalue, options, rowobject) {

                            return `<div class= "d-flex justify-content-center"  >
                                    <i class="fas fa-eye" aria-hidden="true" id="BatchNoBased_HubStatus_Icon_InJqGrid"></i>
                                </div>`;
                        }
                    },
                    {
                        name: 'HgmlStatus',
                        label: 'HGML Status',
                        resizable: true,
                        ignoreCase: true,

                    },
                    {
                        name: 'HgmlRemarks',
                        label: 'HGML Remarks',
                        resizable: true,
                        ignoreCase: true,
                        width: 200
                    }
                ],

                    $("#Rework_Prototype" + submissionNo).jqGrid({
                        url: '',
                        datatype: 'local',
                        data: [],
                        mtype: 'GET',
                        colModel: colmodels,
                        loadonce: true,
                        viewrecords: true,
                        pager: '.Rework_Prototype_pager',
                        rowNum: 10000,
                        scroll: true,

                        gridComplete: function () {
                            var objRows = $("#Rework_Prototype" + submissionNo + " tbody tr");
                            var objHeader = $("#Rework_Prototype" + submissionNo + " tbody tr td");

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

            });

            var maxSubmissionNo = '';

            for (var i = 0; i < uniqueSubmissions.length; i++) {
                var currentSubmissionNo = uniqueSubmissions[i];
                if (currentSubmissionNo > maxSubmissionNo) {
                    maxSubmissionNo = currentSubmissionNo;
                }
            }

            //Triggering the click event to show the recent submission details

            $("." + maxSubmissionNo + "").click();
        }

    }

    if (statusId == 8) {

        $("#ProjectDescription, #HghCode, #ProductName, #DosageForm, #ProvisionalClaim, #Remarks").attr("readonly", true);
        $("#ProjectNo").prop("disabled", true);

        $('#SaveHeader, #Delete, #Clone, #Add_GridRow').hide();

        $("#Approved_Prototype").jqGrid("clearGridData");
        $("#Approved_Prototype").jqGrid('setGridParam', { data: jsonFormApprovedData.PrototypeSubmissionDetailsList.length == 0 ? [] : jsonFormApprovedData.PrototypeSubmissionDetailsList });
        $("#Approved_Prototype").trigger('reloadGrid', [{ page: 1 }]);

        $('#Rejected_HgmlRemarks').val(jsonFormApprovedData.PrototypeSubmissionDetailsList[0].RejectRemarks);

    }

    if (statusId != 7) {

        if (jsonFormReworkData["PrototypeSubmissionDetailsList"].length != 0) {
            debugger

            var uniqueSubmissions = [];
            var htmlData = "";

            $.each(jsonFormReworkData["PrototypeSubmissionDetailsList"], function (index, submission) {
                var submissionNo = submission.SubmissionNo;
                if ($.inArray(submissionNo, uniqueSubmissions) === -1) {
                    uniqueSubmissions.push(submissionNo);
                }
            });

            //uniqueSubmissions.push('123');

            // Loop through unique submission numbers
            $.each(uniqueSubmissions, function (index, submissionNo) {

                htmlData = `<div class="accordion accordion-flush ${index != 0 ? "mt-3" : ""}" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button onclick="OnClickOfRejectedSubmissionNo(this)" class="accordion-button collapsed px-2 py-2 `+ submissionNo + `" type="button" aria-expanded="false" aria-controls="flush-collapseOne">
                                            <span class="accordion_header" id="Rejected_SubmissionNo">`+ submissionNo + `</span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne`+ submissionNo + `" class="accordion-collapse collapse hideFlush" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                            <div class="row product_profile">
                                            </div>

                                             <div class="row">
                                                <div class="save_buttons float-right text-right">
                                                    <a href="##" onclick="onClickCompleteHubStatus('`+ submissionNo + `')">HUB Status</a>
                                                </div>
                                             </div>

                                            <div class="m-table__main mt-2 mb-4 jai-hanuman">
                                                <div class="m-table__responsive -virtual-scroll">
                                                    <table id="Rework_Prototype`+ submissionNo + `" class="table table-bordered Rework_Prototype"></table>
                                                    <div class="Rework_Prototype_pager"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`


                $('#Dynamic_SubmissionNo').append(htmlData);

                colmodels = [

                    {
                        name: 'SubmissionNo',
                        label: 'Submission No.',
                        resizable: true,
                        ignoreCase: true,
                        hidden: true
                    },
                    {
                        name: 'Date',
                        label: 'Date',
                        resizable: true,
                        ignoreCase: true,
                        width: 100
                    },
                    {
                        name: 'BatchNumber',
                        label: 'Batch Number',
                        resizable: true,
                        ignoreCase: true,
                    },
                    //{
                    //    name: 'SamplesByFd',
                    //    label: 'Samples By FD',
                    //    resizable: true,
                    //    ignoreCase: true,
                    //},
                    {
                        name: 'FandDComments',
                        label: 'F&D Remarks',
                        resizable: true,
                        ignoreCase: true,
                        width: 200
                    },
                    {
                        name: '',
                        label: 'Composition',
                        resizable: true,
                        ignoreCase: true,
                        formatter: function (cellvalue, options, rowobject) {
                            debugger
                            return `<div class="demo-content pt-2 d-flex justify-content-center" disabled>` +
                                (rowobject.Composition == "" || rowobject.Composition == null ? '<i></i>' : `<a disabled onclick=DownloadImageInGrid(this,'#Rework_Prototype` + submissionNo + `') id = "CompositionImageDownload" > 
                            <i class="fas fa-download" aria-hidden="true" disabled title="Download"></i>
                        </a>`) +
                                `</div>`;
                        }
                    },
                    {
                        name: 'Composition',
                        label: 'CompositionHide',
                        resizable: true,
                        ignoreCase: true,
                        hidden: true,
                        classes: 'Compositon'
                    },
                    {
                        name: 'SamplesSentTo',
                        label: 'Samples Sent To',
                        resizable: true,
                        ignoreCase: true,
                        width: 200
                    },
                    {
                        name: 'HubStatus',
                        label: 'HUB Status',
                        resizable: true,
                        ignoreCase: true,
                        width: 110,
                        formatter: function (cellvalue, options, rowobject) {

                            return `<div class= "d-flex justify-content-center" id="BatchNoBased_HubStatus_Icon_InJqGrid" >
                                    <i class="fas fa-eye" aria-hidden="true"></i>
                                </div>`;
                        }
                    },
                    {
                        name: 'HgmlStatus',
                        label: 'HGML Status',
                        resizable: true,
                        ignoreCase: true,

                    },
                    {
                        name: 'HgmlRemarks',
                        label: 'HGML Remarks',
                        resizable: true,
                        ignoreCase: true,
                        width: 200
                    }
                ],

                    $("#Rework_Prototype" + submissionNo).jqGrid({
                        url: '',
                        datatype: 'local',
                        data: [],
                        mtype: 'GET',
                        colModel: colmodels,
                        loadonce: true,
                        viewrecords: true,
                        pager: '.Rework_Prototype_pager',
                        rowNum: 10000,
                        scroll: true,

                        gridComplete: function () {
                            var objRows = $("#Rework_Prototype" + submissionNo + " tbody tr");
                            var objHeader = $("#Rework_Prototype" + submissionNo + " tbody tr td");

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

            });

            var maxSubmissionNo = '';

            for (var i = 0; i < uniqueSubmissions.length; i++) {
                var currentSubmissionNo = uniqueSubmissions[i];
                if (currentSubmissionNo > maxSubmissionNo) {
                    maxSubmissionNo = currentSubmissionNo;
                }
            }

            //Triggering the click event to show the recent submission details

            if (statusId == 2 || statusId == 3 || statusId == 4 || statusId == 5 || statusId == 9) {

                $("." + maxSubmissionNo + "").click();
            }

            if (statusId == 6) {

                $(".approvedStageCollapseButton").click();
            }
        }

        if (statusId == 6) {

            $('#ApprovedTotalHubStatus').append(`<a href="##" onclick="onClickCompleteHubStatus('` + prototypeDetails[0].SubmissionNo + `')">HUB Status</a>`);
        }
    }



    $('[data-datepicker]').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        autoclose: true,
        endDate: todaydate // set maximum date to today's date
    });
});













$('.example-dropUp').multiselect({
    enableFiltering: true,
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 500,
    buttonWidth: '100%',
    dropUp: true
});


$('.batchaddbtn').click(function () {
    var data1 = `  <div id="batch" class="mt-5">
        <div class="row product_profile" >
            <div class="col-lg-3">
                <div class="form-group">
                    <label>Submission No. <span class="color-red">*</span></label>
                    <div class="demo-content">
                        <input type="text" class="form-control" />
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="form-group">
                    <label>Composiiton details<span class="color-red">*</span></label>
                    <div class="demo-content">
                        <input type="file" class="form-control" />
                    </div>
                </div>
            </div>


            <div class="add_grid_">
                <div class="col-md-12">
                    <div class="">
                        <div class="d-flex">
                            <button type="button" class="btn-cnl1"><i class="fas fa-trash"></i></button>
                            <button type="button" class="btn-sb ms-2" > Clone</button>
                        </div>
                        <div class="m-table__main mt-2 mb-4 jai-hanuman">
                            <div class="m-table__responsive -virtual-scroll">
                                <table id="product_profile" class="table table-bordered"></table>
                                <div id="pager_product"></div>
                            </div>
                            <div class="float-right text-left pt-2">
                                <button type="button" class="btn-add">Save</button>
                            </div>
                        </div>



                    </div>

                </div>

            </div>
        </div>
    </div>`

    $('.batch_add').append(data1);

    var ID = $("div#batch:last").find('#pager_product');
    $("div#batch:last").find('#product_profile').jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        multiselect: true,
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        //pager: ID,
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("div#batch:last").find("#product_profile tbody tr");
            var objHeader = $("div#batch:last").find("#product_profile tbody tr td");

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
})


data = [
    {
        "Action": " ",
        "Date": "",
        "DesiredIngredients": "Bhrigaraja & Palasha",
        "IndicationConditions": "1 sachet per Hair wash, shampoo",
        "Musthaveclaims": "Reduces Hair Fall",
        "Nicetohaveclaims": "Reduces Hair Fall",
        "DosageForm": "Liquid",
        "BenchmarkProducts": "Pantene Hair Fall Control, Dove Hair Fall rescue",
        "DesiredProductCharacteristics": "3 years Free from Paraben Sachet format",
        "ImageUpload": "",
    },



]
colmodels2 = [

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
            <a class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fas fa-edit mr-2" title="Edit"></i></a>
        </div>`;
        }
    },
    {
        name: 'Date',
        label: 'Date',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

        <div class="demo-content">
            <input type="text" class="form-control " id="data-datepicker1" >
        </div>
        `;
        }
    },
    {
        name: 'BatchNumber',
        label: 'BatchNumber',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

        <div class="demo-content">
            <input type="text" class="form-control">
        </div>
        `;
        }
    },
    {
        name: 'SamplesByFD',
        label: 'Samples By FD',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

        <div class="demo-content">
            <input type="text" class="form-control">
        </div>
        `;
        }
    },

    {
        name: 'F&DComments',
        label: 'F&D Comments2',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

        <div class="demo-content">
            <textarea class="form-control"></textarea>
        </div>
        `;
        }
    },
    {
        name: 'AddRow',
        label: '',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                    <div class="demo-content1">
                        <input type="button" class="btn btn-primary"><i class="fas fa-plus mr-2" title="Edit" aria-hidden="true"></i></button>
                    </div>
                `;
        }
    },

],

    $("#product_profile1").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels2,
        loadonce: true,
        viewrecords: true,
        multiselect: true,
        pager: '#pager_product1',
        rowNum: 10000,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#product_profile1 tbody tr");
            var objHeader = $("#product_profile1 tbody tr td");

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

$('.data-datepicker').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'dd-mm-yyyy' // set the date format to YYYY-MM-DD
});
$('[data-datepicker]').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'dd-mm-yyyy' // set the date format to YYYY-MM-DD
});

$('#data-datepicker1').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'dd-mm-yyyy' // set the date format to YYYY-MM-DD
});

$('[data-multiselect]').multiselect({
    includeSelectAllOption: true,
    buttonWidth: 220,
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});

data = [
    {

        "Action": " ",
        "Date": "",
        "DesiredIngredients": "Bhrigaraja & Palasha",
        "IndicationConditions": "1 sachet per Hair wash, shampoo",
        "Musthaveclaims": "Reduces Hair Fall",
        "Nicetohaveclaims": "Reduces Hair Fall",
        "DosageForm": "Liquid",
        "BenchmarkProducts": "Pantene Hair Fall Control, Dove Hair Fall rescue",
        "DesiredProductCharacteristics": "3 years Free from Paraben Sachet format",
        "ImageUpload": "",
    },



]
colmodels = [

    {
        name: 'Date',
        label: 'Date',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                <div class="demo-content">
                        <input type="text" class="form-control" data-datepicker readonly >
                </div>
            `;
        }
    },
    {
        name: 'BatchNumber',
        label: 'BatchNumber',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return ` <div class="demo-content">
                                        <input type="text" class="form-control" value="BN-135" readonly>
                                 </div>`;
        }
    },
    {
        name: 'SamplesByFD',
        label: 'Samples By FD',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                                                <div class="demo-content">
                                                                        <input type="text" class="form-control" value="10" readonly>
                                                                </div>
                                                            `;
        }
    },

    {
        name: 'F&DComments',
        label: 'F&D Comments',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                                                    <div class="demo-content">
                                                                            <textarea class="form-control" readonly>Updated</textarea>
                                                                    </div>
                                                                `;
        }
    },


],

    $("#submission1").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        //pager: '#pager_product',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#submission tbody tr");
            var objHeader = $("#submission tbody tr td");

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




data = [
    {

        "Action": " ",
        "Date": "",
        "DesiredIngredients": "Bhrigaraja & Palasha",
        "IndicationConditions": "1 sachet per Hair wash, shampoo",
        "Musthaveclaims": "Reduces Hair Fall",
        "Nicetohaveclaims": "Reduces Hair Fall",
        "DosageForm": "Liquid",
        "BenchmarkProducts": "Pantene Hair Fall Control, Dove Hair Fall rescue",
        "DesiredProductCharacteristics": "3 years Free from Paraben Sachet format",
        "ImageUpload": "",
    },



]
colmodels = [

    {
        name: 'Date',
        label: 'Date',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                        <div class="demo-content">
                                 <input type="text" class="form-control" value="12/02/2022" data-datepicker readonly >
                        </div>
                    `;
        }
    },
    {
        name: 'BatchNumber',
        label: 'BatchNumber',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                        <div class="demo-content">
                                <input type="text" class="form-control" value="BN-135" readonly>
                        </div>
                    `;
        }
    },
    {
        name: 'SamplesByFD',
        label: 'Samples By FD',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                        <div class="demo-content">
                                <input type="text" class="form-control" value="10" readonly>
                        </div>
                    `;
        }
    },

    {
        name: 'F&DComments',
        label: 'F&D Comments',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                        <div class="demo-content">
                                <textarea class="form-control" readonly>Updated</textarea>
                        </div>
                    `;
        }
    },


],

    $("#submission1").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        //pager: '#pager_product',
        rowNum: 10000,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#submission1 tbody tr");
            var objHeader = $("#submission1 tbody tr td");

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


//$(document).ready(function () {

//    $('#SubmissionDetails').hide();
//});


$('#ProjectNo').change(function () {
    debugger
    $('#Error_ProjectNo').hide();
    var projectNo = $('#ProjectNo').val();

    var projectDetailsOfProjectNo = projectDetails.filter(val => val.ProjectNo == projectNo);

    $('#ProjectDescription').val(projectDetailsOfProjectNo[0].ProjectDescription);
    $('#HghCode').val(projectDetailsOfProjectNo[0].HghCode);
    /* $('#ProductName').val(projectDetailsOfProjectNo[0].ProductName);*/
    $('#DivisionName').val(projectDetailsOfProjectNo[0].DivisionName);
    $('#ProductName').val(projectDetailsOfProjectNo[0].ProjectDescription);

});

$('#ProductName').keyup(function () {

    $('#ProductName').val() == "" ? $('#Error_ProductName').show() : $('#Error_ProductName').hide();

});
$('#ProvisionalClaim').keyup(function () {

    $('#ProvisionalClaim').val() == "" ? $('#Error_ProvisionalClaim').show() : $('#Error_ProvisionalClaim').hide();
});
$('#DosageForm').keyup(function () {

    $('#DosageForm').val() == "" ? $('#Error_DosageForm').show() : $('#Error_DosageForm').hide();
});

$('#SaveHeader').click(function () {

    debugger
    var flag = true;
    var projectNo = $('#ProjectNo').val();
    var productName = $('#ProductName').val();
    var provisionalClaim = $('#ProvisionalClaim').val();
    var dosageForm = $('#DosageForm').val();

    projectNo == "" ? ($('#Error_ProjectNo').show(), flag = false) : $('#Error_ProjectNo').hide();
    productName == "" ? ($('#Error_ProductName').show(), flag = false) : $('#Error_ProductName').hide();
    provisionalClaim == "" ? ($('#Error_ProvisionalClaim').show(), flag = false) : $('#Error_ProvisionalClaim').hide();
    dosageForm == "" ? ($('#Error_DosageForm').show(), flag = false) : $('#Error_DosageForm').hide();

    if (flag) {
        debugger
        var supportingDocument = $('#Supportingdocuments').prop("files");

        var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);

        modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

        var prototypeDetails = {
            ProjectNo: projectNo,
            ProjectDescription: $('#ProjectDescription').val(),
            HghCode: $('#HghCode').val(),
            ProductName: productName,
            DivisionName: $('#DivisionName').val(),
            DosageForm: $('#DosageForm').val(),
            ProvisionalClaim: provisionalClaim,
            Remarks: $('#Remarks').val(),
            SupportingDocument: modifiedSupportingDocumentsName,
            StatusId: 2,
        };

        if (statusId == 9) {

            prototypeDetails.StatusId = 9;
        }
        if (statusId == 10) {

            prototypeDetails.StatusId = 10;
        }

        $.ajax({

            type: "POST",
            url: ROOT + "Prototype/UploadPrototypeDetails",
            data: { prototype: prototypeDetails, prototypeId: prototypeId },
            dataType: "json",
            success: function (response) {
                debugger
                $('#SubmissionDetails').show();
                $('#SubmissionNo').val(response.SubmissionNo.toString());
                prototypeId = response.PrototypeId;

                location.reload();
            },
            error: function (err) {

                alert(err.responseText);
            }
        });
    }
});

//To save Composition file and return file name
function SaveCompositionFile(fileName) {
    debugger
    var modifiedfileName = "";
    var formData = new FormData();

    if (fileName != "") {
        debugger
        formData.append("file", fileName[0]);
        $.ajax({
            type: 'POST',
            url: ROOT + "Prototype/SaveImageFile",
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

$('#Add_GridRow').click(function () {

    debugger;

    $('.ErrorMessage').hide();

    var row = "";
    var table = document.getElementById("SubmissionDetail_Table");
    var lastRow = table.rows.length - 1;
    var samplesByFd = "";
    var FandDComments = "";
    var BatchNo = "";

    $('#SubmissionDetail_Table tbody tr').each(function () {
        debugger
        var rowIndex = $(this).index(); // get the row index
        var j = rowIndex + 1;

        if (j == lastRow) {
            debugger
            samplesByFd = $(this).closest('tr').find('#SamplesByFd').val();
            FandDComments = $(this).closest('tr').find('#FandDComments').val();
            BatchNo = $(this).closest('tr').find('#BatchNumber').val();
        }
    });
    row =
        `<tr>
            <td style="text-align:center"><input type="checkbox" onclick class="Check" name="name1"/></td>
            <td id="SlNo">`+ (lastRow + 1) + `</td>
            <td>
                <div class="">
                    <input type="text" value="`+ todaydate + `" placeholder="Date" id="Date" class="form-control Date" data-datepicker>
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" value="`+ BatchNo + `"  placeholder="Batch Number"  id="BatchNumber" class="form-control BatchNumber">
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" onpaste="return false;" autocomplete="off" value="`+ samplesByFd + `" onkeypress="return onlyNumbers();"  placeholder="Samples By FD"  id="SamplesByFd" class="form-control samplesbyfd">
                </div>
            </td>
            <td>
                <div class="">
                    <textarea placeholder="F&D Comments" id="FandDComments" class="form-control FandDComments">`+ FandDComments + `</textarea>
                </div>
            </td>
            <td>
                <div class="Composition d-flex">
                    <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" id="CompositionFile" class="form-control">
                    <a onclick=DownloadImage(this) style="display:none" id="CompositionImageDownload"  class="btn-icon -delete mt-2 ms-2">
                        <i class="fas fa-download" title="Download"></i>
                    </a>
                     <a onclick=ViewImage(this) style="display:none" id="CompositionImageView" target="" class="btn-icon -view mt-2 ms-2" title="View">
                        <i class="fas fa-eye" title="View"></i>
                     </a>
                </div>
            </td>
            <td style="display:none">
                    <div class="">
                    <textarea  id="CompositionHide" class="form-control CompositionHide"></textarea>
                </div>
            </td>
        </tr>`;

    $("#SubmissionDetail_Table").append(row);

    $('[data-datepicker]').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        autoclose: true,
        endDate: todaydate// set maximum date to today's date
    });

});

$(document).on('click', '#Delete', function (e) {

    debugger
    $('.ErrorMessage').hide();

    var checkedRows = [];
    var flag = true;
    checkedRows = $('#SubmissionDetail_Table tbody tr:has(:checkbox:checked)');

    checkedRows.length == 0 ? (flag = false, alert('Please select at least one batch for delete.')) : flag = true;

    if (flag) {

        $('#DeleteModal1').modal('show');
    }
});

$(document).on('click', '#Delete_Ok1', function (e) {
    debugger

    var checkedRows = $('#SubmissionDetail_Table tbody tr:has(:checkbox:checked)');
    var checkedRowData = [];

    checkedRows.each(function () {
        debugger
        var existingFile = $(this).closest('tr').find('#CompositionHide').val();

        $(this).closest('tr').remove();

        if (existingFile != "") {
            $.ajax({
                type: 'POST',
                url: ROOT + "Prototype/DeleteImageFile",
                data: { fileName: existingFile },
                success: function (data) {
                    // console.log('success');
                }
            });
        }
    });

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {

        var j = parseInt(i);

        $(this).closest('tr').find('#SlNo').text(j + 1);
    });

});


$(document).on('change', '#CompositionFile', function (e) {
    debugger

    var clossestTableRow = $(this).closest("tr");

    var existingFile = clossestTableRow.find("#CompositionHide").val();

    if (existingFile != "") {
        $.ajax({
            type: 'POST',
            url: ROOT + "Prototype/DeleteImageFile",
            data: { fileName: existingFile },
            success: function (data) {

            }
        });
    }
    var selectedCompositionFileName = $(this).prop("files");

    var modifiedCompositionFileName = SaveCompositionFile(selectedCompositionFileName);
    modifiedCompositionFileName.replaceAll('"', '');

    clossestTableRow.find("#CompositionHide").val(modifiedCompositionFileName);

    clossestTableRow.find("#CompositionHide").val() != "" ? clossestTableRow.find("#CompositionImageDownload").show() : clossestTableRow.find("#CompositionImageDownload").hide();

    clossestTableRow.find("#CompositionHide").val() != "" ? clossestTableRow.find("#CompositionImageView").show() : clossestTableRow.find("#CompositionImageView").hide();

    var imageFilename = clossestTableRow.find("#CompositionHide").val();
    var extension = imageFilename.split('.').pop();
    extension = extension.toLowerCase();
    extension = extension.replace(/"/g, "");

    if (extension === "xlsx" || extension === "xls" || extension === "doc" || extension === "docx") {
        clossestTableRow.find("#CompositionImageView").hide();
    } else {
        clossestTableRow.find("#CompositionImageView").show();
    }
    //var extension = clossestTableRow.find("#CompositionHide").val();
});

//To save Composition file and return file name
function SaveCompositionFile(fileName) {
    debugger
    var modifiedfileName = "";
    //var files = $('#FP_BenchmarkProductsImage').prop("files");
    var formData = new FormData();

    if (fileName != "") {
        debugger
        formData.append("file", fileName[0]);
        $.ajax({
            type: 'POST',
            url: ROOT + "Prototype/SaveImageFile",
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


// On check of Check box in Composition Details table header
$('#Check_Header').click(function () {

    var checkBox = document.getElementById("Check_Header");
    if (checkBox.checked) {

        $('.Check').prop('checked', true);

    }
    else {
        $('.Check').prop('checked', false);
    }

});


$(document).on('click', '#Clone', function (e) {

    debugger
    var flag = true;
    var checkedRows = $('#SubmissionDetail_Table tbody tr:has(:checkbox:checked)');

    checkedRows.length > 1 ? ($('#Error_Clone').show(), flag = false) : $('#Error_Clone').hide();
    checkedRows.length == 0 ? (alert('Please select any one row to clone'), flag = false) : "";

    var checkedRowData = [];

    if (flag) {

        checkedRows.each(function () {

            var date = $(this).closest('tr').find('#Date').val();
            var batchNumber = $(this).closest('tr').find('#BatchNumber').val();
            var samplesByFd = $(this).closest('tr').find('#SamplesByFd').val();
            var fandDComments = $(this).closest('tr').find('#FandDComments').val();

            var arrayItem = {

                Date: date,
                BatchNumber: $.trim(batchNumber),
                SamplesByFd: $.trim(samplesByFd),
                FandDComments: $.trim(fandDComments)
            }

            checkedRowData.push(arrayItem)
        });

        var table = document.getElementById("SubmissionDetail_Table");
        var lastRow = table.rows.length - 1;

        $("#SubmissionDetail_Table tbody tr").each(function (i, obj) {
            debugger
            var j = i + 1;

            if (j == lastRow) {
                debugger
                $(this).closest('tr').find('#Date').val(checkedRowData[0].Date);
                $(this).closest('tr').find('#BatchNumber').val(checkedRowData[0].BatchNumber);
                $(this).closest('tr').find('#SamplesByFd').val(checkedRowData[0].SamplesByFd);
                $(this).closest('tr').find('#FandDComments').val(checkedRowData[0].FandDComments);
            }
        });
    }
});


$(document).on('click', '#Save', function (e) {

    var flag = true;
    var isBatchNumberDuplicated = false;
    var submissionNo = $('#SubmissionNo').val();

    $('.Error').hide();

    submissionNo == "" ? ($('#Error_SubmissionNo').show(), flag = false) : $('#Error_SubmissionNo').hide();

    var submissionDetailsData = [];

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {

        var arrayitem = {

            SubmissionNo: submissionNo,
            Date: $(obj).find('#Date').val(),
            BatchNumber: $.trim($(obj).find('#BatchNumber').val()),
            SamplesByFd: $(obj).find('#SamplesByFd').val(),
            FandDComments: $(obj).find('#FandDComments').val(),
            Composition: ($(obj).find('#CompositionHide').val() == "" ? "" : $(obj).find('#CompositionHide').val().replaceAll('"', ''))
        };

        submissionDetailsData.push(arrayitem);
    });

    var duplicateBatchNumbers = submissionDetailsData
        .map(function (item) {
            return item.BatchNumber;
        })
        .filter(function (value, index, self) {
            return self.indexOf(value) !== index;
        });

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {

        var batchNumber = $.trim($(obj).find('#BatchNumber').val());
        if (duplicateBatchNumbers.includes(batchNumber)) {

            flag = false;
            isBatchNumberDuplicated = true;
            $(obj).find('#BatchNumber').css('background-color', 'yellow');
        }
    });

    if (isBatchNumberDuplicated) {

        alert('Please enter the unique batch number');

        setTimeout(function () {
            $('#SubmissionDetail_Table tbody tr #BatchNumber').css('background-color', '');
        }, 5000);
    }

    if (flag) {

        $('#SaveModal').modal('show');

        $('#Save_Ok').click(function () {

            $('#SubmissionDetailsData').val(JSON.stringify(submissionDetailsData));

            if (statusId == "2") {

                $('#PrototypeStatusId').val(2);
                $('#FromStageName').val("PrepareFandD");
            }
            else if (statusId == "7") {

                $('#PrototypeStatusId').val(7);
                $('#FromStageName').val("Rework");
            }
            else if (statusId == "9") {

                $('#PrototypeStatusId').val(9);
                $('#FromStageName').val("SentBackToInitiator");
            }
            else {
                $('#PrototypeStatusId').val(10);
                $('#FromStageName').val("PendingForApproval");
            }

            document.getElementById('Prototype_Details_Submit').submit();
        });
    }
});




//On click of Send To PMD button 

function validateSendToPmd() {
    debugger

    var flag = true;
    var submissionDetailsData = [];
    var emptyRow = [];
    var isBatchNumberDuplicated = false;
    var isRowEmpty = false;

    $('#SendToPmd_Ok').prop("disabled", false);

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var submissionNo = $('#SubmissionNo').val();

        var arrayitem = {

            SubmissionNo: submissionNo,
            Date: $(obj).find('#Date').val(),
            BatchNumber: $.trim($(obj).find('#BatchNumber').val()),
            SamplesByFd: $.trim($(obj).find('#SamplesByFd').val()),
            FandDComments: $.trim($(obj).find('#FandDComments').val()),
            Composition: ($(obj).find('#CompositionHide').val() == "" ? "" : $(obj).find('#CompositionHide').val().replaceAll('"', ''))
        };

        $(obj).find('#Date').css('outline', '');
        $(obj).find('#BatchNumber').css('outline', '');
        $(obj).find('#SamplesByFd').css('outline', '');

        arrayitem.Date == "" ? (emptyRow.push(i + 1), $(obj).find('#Date').css('outline', '1.5px solid red')) : "";
        arrayitem.BatchNumber == "" ? (emptyRow.push(i + 1), $(obj).find('#BatchNumber').css('outline', '1.5px solid red')) : "";
        arrayitem.SamplesByFd == "" ? (emptyRow.push(i + 1), $(obj).find('#SamplesByFd').css('outline', '1.5px solid red')) : "";

        submissionDetailsData.push(arrayitem);


    });

    emptyRow = $.unique(emptyRow);
    var stringFormattedEmptyRow = emptyRow.join(", ");

    if (emptyRow.length > 0) {
        flag = false;
        isRowEmpty = true;
        alert('Please enter the all mandatory fields in row No ' + stringFormattedEmptyRow + '.');
    }
    else if (submissionDetailsData.length == 0) {
        flag = false;
        isRowEmpty = true;
        alert('Please enter atleast one batch details to send to PMD');
    }

    if (!isRowEmpty) {

        var duplicateBatchNumbers = submissionDetailsData
            .map(function (item) {
                return item.BatchNumber;
            })
            .filter(function (value, index, self) {
                return self.indexOf(value) !== index;
            });

        $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
            debugger
            var batchNumber = $.trim($(obj).find('#BatchNumber').val());
            if (duplicateBatchNumbers.includes(batchNumber)) {
                debugger
                flag = false;
                isBatchNumberDuplicated = true;
                $(obj).find('#BatchNumber').css('background-color', 'yellow');
            }
        });

        if (isBatchNumberDuplicated) {
            alert('Please enter the unique batch number');

        }

        setTimeout(function () {
            $('#SubmissionDetail_Table tbody tr #BatchNumber').css('background-color', '');
        }, 5000);

    }

    //submissionDetailsData.length == 0 ? ($('#Error_SubmissionDetails').show(), flag = false) : $('#Error_SubmissionDetails').hide()

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetPmdUser",
        dataType: "json",
        data: { prototypeId: prototypeId },
        success: function (response) {
            debugger

            if (response != null) {

                $('option').remove('.removePmdUsersOption');
                var userEmailOptionList = "";

                $.each(response.PmdUserList, function (i, obj) {

                    userEmailOptionList += '<option class="removePmdUsersOption PmdUsersOption ' + obj.UserEmail + '" value="' + obj.UserEmail + '" >' + /*obj.UserEmail.split("@")[0]*/ obj.LoginId + '</option>'

                });

                $("#AddPrototype_PmdUserDropDown").html(userEmailOptionList);
                $('#AddPrototype_PmdUserDropDown').multiselect('rebuild');
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

    if (flag) {
        debugger

        $('#sendToPmdModal').modal('show');

        $('#SendToPmd_Ok').click(function () {

            var selectedPmdUser = $('#SelectedPmdUsersToSendPrototype').val();
            var confirmationRemarks = $.trim($('#ConfirmationRemarks').val());
            selectedPmdUser == "" ? $('#Error_SelectPmdUser').show() : $('#Error_SelectPmdUser').hide();
            //confirmationRemarks == "" ? $('#Error_ConfirmationRemarks').show() : $('#Error_ConfirmationRemarks').hide();

            var approvalStatus = []

            if (statusId != '7' && statusId != '9' && statusId != '10') {
                approvalStatus = [{
                    FromStage: 2,
                    Action: "Send To PMD",
                    ToStage: 3,
                }];
            }
            else if (statusId == '7') {
                approvalStatus = [{
                    FromStage: 7,
                    Action: "Send To PMD",
                    ToStage: 3,
                }];
            }
            else if (statusId == '9') {
                approvalStatus = [{
                    FromStage: 9,
                    Action: "Send To PMD",
                    ToStage: 3,
                }];
            }
            else {
                approvalStatus = [{
                    FromStage: 10,
                    Action: "Send To PMD",
                    ToStage: 3,
                }];
            }

            if (selectedPmdUser != "") {

                $('#SendToPmd_Ok').prop("disabled", true);

                $('#SubmissionDetailsData').val(JSON.stringify(submissionDetailsData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#Prot_SelectedPmdUsersToSendPrototype').val(selectedPmdUser);
                $('#Prot_ConfirmationRemarks').val(confirmationRemarks);

                $('#PrototypeStatusId').val(3);

                if (statusId != "7" && statusId != "9" && statusId != '10') {

                    $('#FromStageName').val("PrepareFandD");
                }
                else if (statusId == "7") {

                    $('#FromStageName').val("Rework");
                }
                else if (statusId == "9") {

                    $('#FromStageName').val("SentBackToInitiator");
                }
                else {
                    $('#FromStageName').val("PendingForApproval");
                }

                document.getElementById('Prototype_Details_Submit').submit();
            }
        });
    }
}

$(document).on('click', '#Add_SendPmdUser', function () {
    debugger
    var flag = true;
    var selectedPmdUser = $('#AddPrototype_PmdUserDropDown').val();

    selectedPmdUser == "" ? (flag = false, $('#Error_SelectPmdUser').show()) : $('#Error_SelectPmdUser').hide();

    if (flag) {
        $('#SelectedPmdUsersToSendPrototype').val(selectedPmdUser);
        // $('#AddPrototype_PmdUserDropDown').multiselect('deselectAll', false);
        $('#AddPrototype_PmdUserDropDown').multiselect('rebuild');
    }
});


$(document).on('click', '#Clone', function (e) {

    debugger
    var flag = true;
    var checkedRows = $('#SubmissionDetail_Table tbody tr:has(:checkbox:checked)');

    checkedRows.length > 1 ? ($('#Error_Clone').show(), flag = false) : $('#Error_Clone').hide();

    var checkedRowData = [];

    if (flag) {

        checkedRows.each(function () {

            var date = $(this).closest('tr').find('#Date').val();
            var batchNumber = $(this).closest('tr').find('#BatchNumber').val();
            var samplesByFd = $(this).closest('tr').find('#SamplesByFd').val();
            var fandDComments = $(this).closest('tr').find('#FandDComments').val();

            var arrayItem = {

                Date: date,
                BatchNumber: batchNumber,
                SamplesByFd: samplesByFd,
                FandDComments: fandDComments
            }

            checkedRowData.push(arrayItem)
        });

        var table = document.getElementById("SubmissionDetail_Table");
        var lastRow = table.rows.length - 1;

        $("#SubmissionDetail_Table tbody tr").each(function (i, obj) {
            debugger
            var j = i + 1;

            if (j == lastRow) {
                debugger
                $(this).closest('tr').find('#Date').val(checkedRowData[0].Date);
                //$(this).closest('tr').find('#BatchNumber').val(checkedRowData[0].BatchNumber);
                $(this).closest('tr').find('#SamplesByFd').val(checkedRowData[0].SamplesByFd);
                $(this).closest('tr').find('#FandDComments').val(checkedRowData[0].FandDComments);
            }
        });
    }
});

function DownloadImage(obj) {

    debugger
    var submissionNo = $('#SubmissionNo').val();
    var username = $('#UserName').val();
    var fileName = $(obj).closest('tr').find('#CompositionHide').val();
    var prototypeId = prototypeDetails[0].PrototypeId;

    var downloadedFileData = [];
    if (fileName != "" && fileName != undefined) {
        downloadedFileData = [{
            UserName: username,
            Composition: fileName,
            SubmissionNo: submissionNo,
            PrototypeId: prototypeId
        }];

        var downloadedFileInfo = JSON.stringify(downloadedFileData);

    }
    if (fileName == '' || fileName == undefined) {
        fileName = $(obj).closest('tr').find('.Composition').val();
    }

    if (fileName != "" && fileName != undefined) {

        fileName = fileName.replace(/"/g, '');
        $(obj).closest('tr').find('#CompositionImageDownload').prop("href", ROOT + "Prototype/DownloadImageFile?fileName=" + fileName);
        $.ajax({
            type: "POST",
            url: ROOT + "Prototype/DownloadedFileInfo",
            data: { data: downloadedFileInfo },
            dataType: "json",
            success: function (Result) { }
        });
        return true;
    }
}


//function onlyNumbers(evt) {
//    debugger
//    var e = event || evt; // for trans-browser compatibility
//    var charCode = e.which || e.keyCode;

//    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//        return false;
//    }
//    return true;
//}


// JQ Grid for Supportig Documents PopUp 

colmodels = [
    {
        name: 'SupportingDocument',
        label: 'Document',
        width: 130,
        resizable: true,
        ignoreCase: true,
        classes: 'Doc',
        formatter: function (cellvalue, options, rowobject) {
            return `<a class="text-primary textcolour Report" onclick="DownloadUploadedImage(` + options.rowId + `)"><span class="textcolour">` + rowobject.SupportingDocument + '</span></a>';

        }
    },
    {
        name: 'Doc',
        label: 'Document',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            return rowobject.SupportingDocument;
        }
    },

    {
        name: 'InitiatedBy',
        label: 'Uploaded By',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'InitiatedOn',
        label: 'Uploaded On',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
],

    $("#ViewDataforUser").jqGrid({
        height: 'auto',
        rowNum: 100,
        mtype: 'GET',
        datatype: 'local',
        //data: response['SupportingDocumentDetailList'],
        data: [],
        loadonce: true,
        colModel: colmodels,
        pager: "#pager_ViewDataForUser",
        viewrecords: true,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#ViewDataforUser tbody tr");
            var objHeader = $("#ViewDataforUser tbody tr td");

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

//On click of icon of Supporting Documents

$("#ViewData").on("click", function () {
    var prototypeId = prototypeDetails[0].PrototypeId;

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetSupportingDocumentDetail",
        data: { prototypeId: prototypeId },
        success: function (response) {

            $("#ViewDataforUser").jqGrid("clearGridData");
            $("#ViewDataforUser").jqGrid('setGridParam', { data: response["SupportingDocumentDetailList"].length == 0 ? [] : response["SupportingDocumentDetailList"] });
            $("#ViewDataforUser").trigger('reloadGrid', [{ page: 1 }]);

            $("#ViewModel").modal('show');

        },
        error: function (err) {
            alert(err.responseText);
        }
    });
});

 //Validation to text boxes to allow only integers

function onlyNumbers(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function DownloadUploadedImage(rowId) {
    debugger
    var filename = $('#ViewDataforUser').jqGrid('getCell', rowId, 'Doc');
    if (filename.length > 0) {

        $('.Report').prop("href", ROOT + "Prototype/DownloadImageFile?fileName=" + filename);
        return true;
    }

    else {

    }
}


$('.example-dropUp').multiselect({
    enableFiltering: true,
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 500,
    buttonWidth: '100%',
    dropUp: true
});

var hubDetailList = [];
var hubDetailTableList = [];
var batchNoDetail = [];
var hubDropDown = [];
var batchNoDropDown = [];
var batchNoSamplesByFdAndComposition = [];

var count = 0;
function addHubDetails(obj) {
    var rows = [];
    var samplesByFd = $(obj).closest('tr').find('#SamplesByFd').val();
    var batchNo = $(obj).closest('tr').find('#BatchNumber').val();
    var row = $(obj).closest('tr');

    $('#HubDetail_SamplesByFd').text(samplesByFd);
    $('#HubDetail_BatchNo').text(batchNo);


    $.ajax({
        type: "GET",
        url: ROOT + "Prototype/GetHubDetails",
        dataType: "json",
        data: { PrototypeId: prototypeId, BatchNo: batchNo },
        success: function (response) {
            hubDetailList = response.hubUserDetail;
            hubDetailTableList = response.hubDetailTableData;
            batchNoDetail = response.batchNoDetail;

            var hubNames = new Set(hubDetailList.map(hub => hub.HubName));

            var batchNos = $.map(batchNoDetail, function (obj) {
                return obj.BatchNo;
            });
            batchNoSamplesByFdAndComposition = batchNoDetail.map(function (item) {
                return {
                    BatchNo: item.BatchNo,
                    SamplesByFd: item.SamplesByFd,
                    Composition: item.Composition
                };
            });

            var i = 0;
            var hubs = "";
            var batchno = "";
            count = 0;
            if (hubDetailTableList.length == 0) {

                $.each(Array.from(hubNames), function (i, obj) {
                    if (obj == "HGML") {
                        hubs += '<option class="HubNames-' + obj + '" value="' + obj + '" selected disabled>' + obj + '</option>'
                    }
                    else {
                        hubs += '<option class="HubNames-' + obj + '" value="' + obj + '">' + obj + '</option>'

                    }
                });

                $.each(Array.from(batchNos), function (i, obj) {
                    batchno += '<option class="batchNos" value="' + obj + '" selected>' + obj + '</option>'
                });

                hubDropDown = `<select class="form-control Hubinfo" multiple="multiple" data-multiselect>` + hubs + `</select>`

                batchNoDropDown = `<select class="form-control batchnoinfo" multiple="multiple" data-multiselect>` + batchno + `</select>`

                hubNames.forEach(function (hubName) {
                    var row = "";
                    if (hubName == "HGML") {
                        batchNoSamplesByFdAndComposition.forEach(function (item) {
                            i++;
                            count++;
                            row = `
                                <tr>
                                     <td>
                                        <label></label>
                                    </td> 
                                    <td>
                                        <label id="SlNo">`+ i + `</label>
                                    </td> 
                                    <td>
                                        <label id="HubName">`+ hubName + `</label>
                                    </td> 
                                    <td>
                                        <label id = "BatchNo" > `+ item.BatchNo + `</label >
                                    </td> 
                                    <td>
                                        <label id = "SamplesByFd" > `+ item.SamplesByFd + `</label >
                                    </td> 
                                    <td>
                                        <div class="">
                                            <input id="NumberOfSamples" placeholder="`+ item.SamplesByFd + `" onpaste="return false;" autocomplete="off" onkeyup="return checkSumOfNoOfSamples(this);" onkeypress="return onlyNumbers(this);" type="text" class="form-control NumberOfSamples">
                                        </div>
                                    </td> 
                                    <td>
                                        <div class="">
                                            <select ${item.Composition == "" ? "disabled" : ""} id="ViewComposition" class="form-control mr-2">
                                                <option value="">Select</option>
                                                <option value="Yes"  ${hubName == "HGML" && item.Composition != "" ? "selected" : ""} >Yes</option>
                                                <option value="No" ${hubName != "HGML" && item.Composition != "" ? "selected" : ""} >No</option>
                                            </select>
                                        </div>
                                    </td> 
                                    <td>
                                        <div class="">
                                            <textarea id="PmdRemarks" class="form-control PmdRemarks"></textarea>
                                        </div>
                                    </td> 
                                    <td style="display:none">
                                        <div class="">
                                            <textarea id="Composition" class="form-control Composition">`+ item.Composition + `</textarea>
                                        </div>
                                    </td>
                                </tr>
                                `;

                            rows.push(row);
                        });
                    }
                });

                $('.hub').html(hubDropDown);
                $('.BatchNo').html(batchNoDropDown);

                var tbody = $('#HubDetail_Table_Body');
                tbody.empty(); // clear previous contents
                tbody.append(rows.join('')); // append the rows
            }

            var SaveHubName = [];
            hubNames.forEach(function (obj) {
                var isFound = hubDetailTableList.some(function (item) {
                    return item.HubName === obj
                });
                if (isFound) {
                    SaveHubName.push(obj);
                }
            });
            var uniqueHubNames = [...new Set(SaveHubName)];

            $.each(Array.from(hubNames), function (i, obj) {
                var optionAdded = false;
                $.each(Array.from(uniqueHubNames), function (i, obj1) {
                    if (obj == "HGML" && obj1 == "HGML") {
                        hubs += '<option class="HubNames-' + obj + '" value="' + obj + '" selected disabled>' + obj + '</option>';
                        optionAdded = true;
                    }
                    else if (obj == obj1 && !optionAdded) {
                        hubs += '<option class="HubNames-' + obj + '" value="' + obj + '" selected>' + obj + '</option>';
                        optionAdded = true;
                    }
                });
                if (!optionAdded) {
                    hubs += '<option class="HubNames-' + obj + '" value="' + obj + '">' + obj + '</option>';
                }
            });

            $.each(Array.from(batchNos), function (i, obj) {
                batchno += '<option class="batchNos" value="' + obj + '" selected>' + obj + '</option>'
            });

            hubDropDown = `<select class="form-control Hubinfo" multiple="multiple" data-multiselect>` + hubs + `</select>`

            batchNoDropDown = `<select class="form-control batchnoinfo" multiple="multiple" data-multiselect>` + batchno + `</select>`

            if (hubDetailTableList.length > 0) {

                var row = "";

                uniqueHubNames.forEach(function (hubName) {

                    batchNoSamplesByFdAndComposition.forEach(function (item) {
                        i++;

                        var paricularHubDetailTableList = hubDetailTableList.filter(item1 => item1.BatchNo === item.BatchNo && item1.HubName === hubName);

                        if (paricularHubDetailTableList.length > 0) {
                            count++;
                            var remainigsamples = 0;
                            var noOfSamplesAssigned = 0;
                            const particularBatchNo = hubDetailTableList.filter(i => i.BatchNo == item.BatchNo);

                            $.each(particularBatchNo, function (i, ob) {
                                debugger
                                var a = ob.NumberOfSamples == "" ? 0 : ob.NumberOfSamples
                                noOfSamplesAssigned += parseInt(a);
                            })
                            remainigsamples = item.SamplesByFd - noOfSamplesAssigned;
                            var Action = "";
                            if (hubName != "HGML") {
                                Action = '<label class="btn-icon -delete DeleteTableData" title="Delete"><i class="fas fa-trash" aria-hidden="true"></i></label>'
                            }
                            row += `
                                    <tr>
                                      <td>
                                            <label>`+ Action + `</label>
                                            </td> 
                                        <td>
                                            <label id="SlNo">`+ i + `</label>
                                        </td> 
                                        <td>
                                            <label id="HubName">`+ hubName + `</label>
                                        </td> 
                                        <td>
                                            <label id = "BatchNo" > `+ item.BatchNo + `</label >
                                        </td> 
                                        <td>
                                            <label id = "SamplesByFd" > `+ item.SamplesByFd + `</label >
                                        </td> 
                                        <td>
                                            <div class="">
                                                <input id="NumberOfSamples" placeholder="`+ remainigsamples + `" onpaste="return false;" autocomplete="off" value="` + paricularHubDetailTableList[0].NumberOfSamples + `"  onkeyup="return checkSumOfNoOfSamples(this);" onkeypress="return onlyNumbers(this);" type="text" class="form-control NumberOfSamples">
                                            </div>
                                        </td> 
                                        <td>
                                            <div class="">
                                                <select ${item.Composition == "" ? "disabled" : ""} id="ViewComposition" class="form-control mr-2">
                                                    <option value="" ${paricularHubDetailTableList[0].ViewComposition === "" ? "selected" : ""}>Select</option>
                                                    <option value="Yes" ${paricularHubDetailTableList[0].ViewComposition === "Yes" ? "selected" : ""}>Yes</option>
                                                    <option value="No" ${paricularHubDetailTableList[0].ViewComposition === "No" ? "selected" : ""}>No</option>
                                                </select>
                                            </div>
                                        </td> 
                                        <td>
                                            <div class="">
                                                <textarea id="PmdRemarks" class="form-control PmdRemarks">`+ paricularHubDetailTableList[0].PmdRemarks + `</textarea >
                                            </div>
                                        </td>
                                        <td style="display:none">
                                            <div class="">
                                                <textarea id="Composition" class="form-control Composition">`+ item.Composition + `</textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    `;
                        }

                        $('.hub').html(hubDropDown);
                        $('.BatchNo').html(batchNoDropDown);
                    });
                });

                $('#HubDetail_Table_Body').empty();
                $('#HubDetail_Table_Body').append(row);
            }

            if (hubDetailTableList.length == 0) {

                var row1 = "";
                var j = 0;

                hubNames.forEach(function (hubName) {
                    j++;

                    const filteredHubUserDetails = hubDetailList.filter(h => h.HubName === hubName);

                    const hubUserDetail = filteredHubUserDetails.map(h => ({
                        UserEmail: h.HubUser,
                        UserName: h.UserName
                    }));

                    row1 += `
                    <tr>
                        <td>
                            <label id="HubName">`+ hubName + `</label>
                        </td> 
                        <td>
                        
                            <select id="HubUser" class="form-control HubUser" data-multiselect multiple="multiple" >`;


                    hubUserDetail.forEach(item => {

                        row1 += `<option value="` + item.UserEmail + `">` + item.UserName + `</option>`

                    });


                    row1 += `</select>

                        </td>
                        <td>
                            <div class="">
                                <textarea id="TrackingDetails" class="form-control"></textarea>
                            </div>
                        </td>`
                });

                $('#HubUser_Table_Body').empty();

                $('#HubUser_Table_Body').append(row1)
            }


            if (hubDetailTableList.length > 0) {
                debugger
                var hubNameList = hubDetailTableList.map(function (hubDetail) {
                    return hubDetail.HubName;
                });
                var distinctHubNameList = $.unique(hubNameList);

                var row = "";
                var i = 0;

                hubNames.forEach(function (hubName) {
                    debugger
                    i++;
                    var isHubExists = distinctHubNameList.includes(hubName);

                    const filteredHubUserDetails = hubDetailList.filter(h => h.HubName === hubName);

                    const hubUserDetail = filteredHubUserDetails.map(h => ({
                        UserEmail: h.HubUser,
                        UserName: h.UserName
                    }));

                    if (isHubExists) {

                        var hubDetailOfParticularHubName = hubDetailTableList.filter(function (data) {
                            return data.HubName === hubName;
                        });

                        if (hubDetailOfParticularHubName) {

                            var arrayOfSelectedHubUser = hubDetailOfParticularHubName[0].HubUser.split(",");
                        }
                        debugger
                        row += `
                            <tr>
                                <td>
                                    <label id="HubName">`+ hubName + `</label>
                                </td>
                                <td>
                                    <select id="HubUser" class="form-control HubUser" data-multiselect multiple="multiple" >`;


                        hubUserDetail.forEach(item => {

                            var isUserSelected = arrayOfSelectedHubUser.some(function (h) {
                                return h === item.UserEmail;
                            });

                            if (isUserSelected) {

                                row += `<option value="` + item.UserEmail + `" selected>` + item.UserName + `</option>`

                            }
                            else {
                                row += `<option value="` + item.UserEmail + `">` + item.UserName + `</option>`
                            }
                        });


                        row += `</select>

                                </td>
                                <td>
                                    <div class="">
                                        <textarea id="TrackingDetails" class="form-control">`+ hubDetailOfParticularHubName[0].TrackingDetails + `</textarea>
                                    </div>
                                </td>`;
                    }
                    else {
                        row += `
                                <tr>
                                    <td>
                                        <label id="HubName">`+ hubName + `</label>
                                    </td> 
                                    <td>
                        
                                        <select id="HubUser" class="form-control HubUser" data-multiselect multiple="multiple" >`;

                        hubUserDetail.forEach(item => {

                            row += `<option value="` + item.UserEmail + `">` + item.UserName + `</option>`

                        });

                        row += `</select>

                                    </td>
                                    <td>
                                        <div class="">
                                            <textarea id="TrackingDetails" class="form-control"></textarea>
                                        </div>
                                    </td>`
                    }
                });

                $('#HubUser_Table_Body').empty();
                $('#HubUser_Table_Body').append(row)
            }

            $('[data-multiselect]').multiselect({

                includeSelectAllOption: true,
                buttonWidth: 220,
                enableCaseInsensitiveFiltering: true,
                enableFiltering: true
            });

            $('#addHubDetailModal').modal('show');
        },
        error: function (err) {

            alert(err.responseText);
        }
    });
}


function appendDataToSubmissionDetailsTable(submissionDetailsData, statusId) {

    debugger

    var row = "";
    $('.SubmissionDetail_Table_Body').empty();

    if (statusId == 3) {
        $.each(submissionDetailsData, function (i, obj) {
            var fileExtension = obj.Composition.split('.').pop().toLowerCase();
            debugger

            row +=
                `<tr>
                        <td id="SlNo" readonly >`+ (i + 1) + `</td>
                        <td>
                            <div class="Date">
                                <input placeholder="Date" type="text"  value="`+ obj.Date + `" id="Date" class="form-control Date" readonly>
                            </div>
                        </td>
                        <td>
                            <div class="BatchNumber" readonly>
                                <input placeholder="Batch Number"  type="text"  value="`+ obj.BatchNumber + `" id="BatchNumber" class="form-control BatchNumber" readonly>
                            </div>
                        </td>
                        <td>
                            <div class="SamplesByFd">
                                <input type="text"  value="`+ obj.SamplesByFd + `" placeholder="Samples By FD" onkeypress="return onlyNumbers();"  id="SamplesByFd" class="form-control samplesbyfd" readonly>
                            </div>
                        </td>
                        <td>
                            <div class="FandDComments">
                                <textarea placeholder="F&D Comments" id="FandDComments" class="form-control FandDComments" rows="1" readonly> `+ obj.FandDComments + `</textarea>
                            </div>
                        </td>
                        <td>
                            <div class="Composition d-flex  justify-content-center">
                                <a onclick="DownloadImage(this)"${(obj.Composition == "" || obj.Composition == null ? ' style="display:none;"' : "")} id="CompositionImageDownload" class="btn-icon -delete">
                                    <i class="fas fa-download" title="Download"></i>
                                </a>
                                 <a onclick=ViewImage(this) ${(obj.Composition == "" || obj.Composition == null || fileExtension == "xlsx" || fileExtension == "xls" || fileExtension == "doc" || fileExtension == "docx" ? ' style="display:none;"' : "")} id="CompositionImageView" target="" class="btn-icon -view" title="View">
                                    <i class="fas fa-eye" title="View"></i>
                           </a>  
                            </div>
                        </td>
                        <td style="display:none">
                                <div class="">
                                <textarea  id="CompositionHide" class="form-control CompositionHide" readonly>` + obj.Composition + `</textarea>
                            </div>
                        </td>
                         <td>
                            <div class="SamplesSentTo">
                                <input type="text" value="`+ (obj.SamplesSentTo == null ? "" : obj.SamplesSentTo) + `" placeholder="Samples Sent To" id="SamplesSentTo" class="form-control SamplesSentTo" readonly>
                            </div>
                        </td>
                    </tr>`;
        });
    }


    if (statusId == 4) {

        debugger
        $.each(submissionDetailsData, function (i, obj) {
            var fileExtension = obj.Composition.split('.').pop().toLowerCase();
            debugger

            row += `<tr d-flex>
            <td id="SlNo" readonly>${i + 1}</td>
            <td>
                <div class="">
                    <input placeholder="Date" type="text" value="${obj.Date}" id="Date" class="form-control Date" readonly>
                </div>
            </td>
            <td>
                <div class="" readonly>
                    <input placeholder="Batch Number" type="text" value="${obj.BatchNo}" id="BatchNumber" class="form-control BatchNumber" readonly>
                </div>
            </td>
           <td>
               <div class="Composition d-flex justify-content-center">
    <a onclick="DownloadImage(this)" ${obj.IsSelectedHubUser == "1" || userRoleId == "1" ? (obj.Composition == "" || obj.Composition == null || obj.ViewComposition == "No" ? 'style="display:none;"' : '') : 'style="display:none;"'} id="CompositionImageDownload" class="btn-icon -delete">
        <i class="fas fa-download" title="Download"></i>
    </a>
     <a onclick=ViewImage(this) ${obj.IsSelectedHubUser == "1" || userRoleId == "1" ? (obj.Composition == "" || obj.Composition == null || fileExtension == "xlsx" || fileExtension == "xls" || fileExtension == "doc" || fileExtension == "docx" || obj.ViewComposition == "No" ? 'style="display:none;"' : '') : 'style="display:none;"'} id="CompositionImageView" target="" class="btn-icon -view" title="View">
        <i class="fas fa-eye" title="View"></i>
   </a>  
</div>
           </td>
           
            <td>
                <div class="">
                    <textarea placeholder="F&D Comments" id="FandDComments" class="form-control FandDComments" readonly>${obj.FandDComments}</textarea>
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" value="${obj.SamplesSentTo == null ? "" : obj.SamplesSentTo}" placeholder="Samples Sent To" id="SamplesSentTo" class="form-control SamplesSentTo" readonly>
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" value="${obj.NumberOfSamples}" placeholder="Number Of Samples" id="SamplesByFd" class="form-control samplesbyfd" readonly>
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" value="${obj.TrackingDetails}" placeholder="Trackig Details" id="TrackigDetails" class="form-control" readonly>
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" value="${obj.PmdRemarks}" placeholder="PMD Remarks" id="PmdRemarks" class="form-control" readonly>
                </div>
            </td>
            <td>
                <div class="">
                    <select ${obj.IsSelectedHubUser == "1" || userRoleId == "1" ? "" : "disabled"} class="form-control mr-3" data-singleselect id="HubStatus">
                        <option value="" ${obj.HubStatus === "" ? "selected" : ""}>-Select-</option>
                        <option ${obj.HubStatus === "Approve" ? "selected" : ""}>Approve</option>
                        <option ${obj.HubStatus === "Reject" ? "selected" : ""}>Reject</option>
                        <option ${obj.HubStatus === "Rework" ? "selected" : ""}>Rework</option>
                    </select>
                </div>
            </td>
            <td>
                <div class="">
                    <textarea ${obj.IsSelectedHubUser == "1" || userRoleId == "1" ? "" : "readonly"} class="form-control" id="HubRemarks">${obj.HubRemarks == null || obj.HubRemarks == undefined ? "" : obj.HubRemarks}</textarea>
                </div>
            </td>
             <td style="display:none">
                <div class="">
                    <textarea id="CompositionHide" class="form-control CompositionHide" readonly>${obj.Composition}</textarea>
                </div>
            </td>
            <td style="display:none">
                <div class="">
                    <textarea id="IsSelectedHubUser_Hide" class="form-control IsSelectedHubUser_Hide" readonly>${obj.IsSelectedHubUser}</textarea>
                </div>
            </td>
        </tr>`;
        });

    }

    if (statusId == 5) {

        $.each(submissionDetailsData, function (i, obj) {
            var fileExtension = obj.Composition.split('.').pop().toLowerCase();
            debugger

            row += `<tr>
            <td id="SlNo" readonly>${i + 1}</td>
            <td>
                <div class="">
                    <input placeholder="Date" type="text" value="${obj.Date}" id="Date" class="form-control Date" readonly>
                </div>
            </td>
            <td>
                <div class="" readonly>
                    <input placeholder="Batch Number" type="text" value="${obj.BatchNumber}" id="BatchNumber" class="form-control BatchNumber" readonly>
                </div>
            </td>
           
            <td>
                <div class="">
                    <textarea placeholder="F&D Comments" id="FandDComments" class="form-control FandDComments" readonly>${obj.FandDComments}</textarea>
                </div>
            </td>
            <td>
                <div class="Composition d-flex justify-content-center">
                    <a onclick="DownloadImage(this)" ${(obj.Composition == "" || obj.Composition == null || obj.ViewComposition == "No") ? 'style="display:none;"' : ""} id="CompositionImageDownload" class="btn-icon -delete">
                        <i class="fas fa-download" title="Download"></i>
                    </a>
                     <a onclick=ViewImage(this)  ${(obj.Composition == "" || obj.Composition == null || fileExtension == "xlsx" || fileExtension == "xls" || fileExtension == "doc" || fileExtension == "docx" || obj.ViewComposition == "No") ? 'style="display:none;"' : ""} id="CompositionImageView" target="" class="btn-icon -view" title="View">
                        <i class="fas fa-eye" title="View"></i>
                      </a>  
                </div>
            </td>
            <td>
                <div class="">
                    <input type="text" value="${obj.SamplesSentTo == null ? "" : obj.SamplesSentTo}" placeholder="Samples Sent To" id="SamplesSentTo" class="form-control SamplesSentTo" readonly>
                </div>
            </td>
            <td>
                <div class="d-flex justify-content-center" id="BatchNoBased_HubStatus_Icon">
                    <i class="fas fa-eye" aria-hidden="true"></i>
                </div>
            </td>
            <td>
                <div class="">
                    <select class="form-control mr-2" data-singleselect id="HgmlStatus">
                        <option value="" ${obj.HgmlStatus === "" ? "selected" : ""}>-Select-</option>
                        <option ${obj.HgmlStatus === "Approve" ? "selected" : ""}>Approve</option>
                        <option ${obj.HgmlStatus === "Reject" ? "selected" : ""}>Reject</option>
                        <option ${obj.HgmlStatus === "Rework" ? "selected" : ""}>Rework</option>
                    </select>
                </div>
            </td>
            <td>

                <div class="">
                    <input type="text" value="${obj.HgmlRemarks == null || obj.HgmlRemarks == undefined ? "" : obj.HgmlRemarks}" placeholder="HGML Remarks" id="HgmlRemarks" class="form-control">
                </div>
            </td>
            <td style="display:none">
                <div class="">
                    <textarea id="CompositionHide" class="form-control CompositionHide" readonly>${obj.Composition}</textarea>
                </div>
            </td>
        </tr>`;
        });
    }

    $("#SubmissionDetail_Table").append(row);
}


$(document).on('click', '#SaveInPmdReview', function (e) {
    debugger
    var flag = true;

    if (flag) {

        $('#SaveModal').modal('show');

        $('#Save_Ok').click(function () {

            var supportingDocument = $('#Supportingdocuments').prop("files");
            var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);
            modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

            $('#PrototypeId').val(prototypeId);
            $('#Prot_SupportingDocument').val(modifiedSupportingDocumentsName);
            $('#PrototypeStatusId').val(3);
            $('#FromStageName').val('PmdReview');

            document.getElementById('Prototype_Details_Submit').submit();
        });
    }
});


function validateSendToHubOrSendBackToInitiator(toStatus) {

    var flag = true;
    var emptyRow = [];
    var emptyRowBatchNo = [];

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {

        var arrayitem = {

            SamplesSentTo: $(obj).find('#SamplesSentTo').val(),
            BatchNumber: $(obj).find('#BatchNumber').val()
        };

        $(obj).find('#SamplesSentTo').css('outline', '');

        arrayitem.SamplesSentTo == "" ? (emptyRow.push(i + 1), emptyRowBatchNo.push(arrayitem.BatchNumber), $(obj).find('#SamplesSentTo').css('outline', '1.5px solid red')) : "";
    });

    if (toStatus == "4") {

        emptyRow = $.unique(emptyRow);
        emptyRowBatchNo = $.unique(emptyRowBatchNo);
        var stringFormattedEmptyRow = emptyRow.join(", ");
        var stringFormattedemptyRowBatchNo = emptyRowBatchNo.join(",  ");

        if (emptyRow.length > 0) {
            flag = false;
            isRowEmpty = true;
            alert('Please enter the HUB details for the Batch No. <b>' + stringFormattedemptyRowBatchNo + '</b>.');
        }
    }

    if (toStatus == "9") {

        $('.SamplesSentTo').css('outline', '');
    }

    if (flag) {

        $('#SubmitModal').modal('show');
        $('#Error_CommonConfirmationRemarks').hide();

        $('#Submit_Ok').click(function () {

            // Disable the button
            $(this).prop('disabled', true);

            // Enable the button after 5 seconds
            setTimeout(function () {
                $('#Submit_Ok').prop('disabled', false);
            }, 5000); // 5000 milliseconds = 5 seconds

            flag = true;

            var confirmationRemarks = $.trim($('.ConfirmationRemarks').val());
            //confirmationRemarks == "" ? ($('#Error_CommonConfirmationRemarks').show(), flag = false) : $('#Error_CommonConfirmationRemarks').hide();

            if (flag) {

                var supportingDocument = $('#Supportingdocuments').prop("files");
                var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);
                modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

                var approvalStatus = [];

                if (toStatus == "4") {

                    approvalStatus = [{
                        FromStage: 3,
                        Action: "Send To HUB",
                        ToStage: 4,
                    }];
                }

                else {
                    if (statusId == "3") {
                        approvalStatus = [{
                            FromStage: 3,
                            Action: "Send Back To Initiator",
                            ToStage: 9,
                        }];
                    }
                    else {
                        approvalStatus = [{
                            FromStage: 10,
                            Action: "Send Back To Initiator",
                            ToStage: 9,
                        }];
                    }
                }

                $('#PrototypeId').val(prototypeId);
                $('#Prot_SupportingDocument').val(modifiedSupportingDocumentsName);
                $('#Prot_ConfirmationRemarks').val(confirmationRemarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));

                $('#FromStageName').val('PmdReview');

                if (toStatus == "4") {

                    $('#PrototypeStatusId').val(4);
                }
                if (toStatus == "9") {

                    $('#PrototypeStatusId').val(9);
                }

                document.getElementById('Prototype_Details_Submit').submit();
            }
        });
    }
}

$('#SaveInHubReview').click(function () {

    var hubReviewData = [];

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var isSelectedHubUser = $(obj).find('#IsSelectedHubUser_Hide').val();
        var arrayitem = [];

        if (isSelectedHubUser == "1" || userRoleId == "1") {

            arrayitem = {

                PrototypeId: prototypeId,
                BatchNo: $(obj).find('#BatchNumber').val(),
                HubName: $(obj).find('#SamplesSentTo').val(),
                HubStatus: $(obj).find('#HubStatus').val(),
                HubRemarks: $.trim($(obj).find('#HubRemarks').val())
            };
        }

        hubReviewData.push(arrayitem);
    });

    $('#SaveModal').modal('show');

    $('#Save_Ok').click(function () {

        var supportingDocument = $('#Supportingdocuments').prop("files");
        var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);
        modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

        $('#PrototypeId').val(prototypeId);
        $('#Prot_SupportingDocument').val(modifiedSupportingDocumentsName);
        $('#SubmissionDetailsData').val(JSON.stringify(hubReviewData));
        $('#PrototypeStatusId').val(4);
        $('#FromStageName').val('HubReview');

        document.getElementById('Prototype_Details_Submit').submit();
    });
});


function validateSendToHgml() {
    debugger
    var flag = true;
    var emptyRow = [];
    var hubReviewData = [];

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var isSelectedHubUser = $(obj).find('#IsSelectedHubUser_Hide').val();
        var arrayitem = [];

        if (isSelectedHubUser == 1 || userRoleId == "1") {

            arrayitem = {

                PrototypeId: prototypeId,
                BatchNo: $(obj).find('#BatchNumber').val(),
                HubName: $(obj).find('#SamplesSentTo').val(),
                HubStatus: $(obj).find('#HubStatus').val(),
                HubRemarks: $.trim($(obj).find('#HubRemarks').val())
            };
        }

        (arrayitem.HubRemarks == "" || arrayitem.HubStatus == "") ? emptyRow.push(i + 1) : "";
        hubReviewData.push(arrayitem);
    });

    emptyRow = $.unique(emptyRow);
    var stringFormattedEmptyRow = emptyRow.join(", ");

    if (emptyRow.length > 0) {
        flag = false;
        isRowEmpty = true;
        alert('Please enter all mandatory fields in Row No ' + stringFormattedEmptyRow + '.');
    }

    if (flag) {

        $('#SubmitModal').modal('show');
        $('#Error_CommonConfirmationRemarks').hide();

        $('#Submit_Ok').click(function () {

            // Disable the button
            $(this).prop('disabled', true);

            // Enable the button after 5 seconds
            setTimeout(function () {
                $('#Submit_Ok').prop('disabled', false);
            }, 5000); // 5000 milliseconds = 5 seconds


            flag = true;

            var confirmationRemarks = $.trim($('.ConfirmationRemarks').val());
            //confirmationRemarks == "" ? ($('#Error_CommonConfirmationRemarks').show(), flag = false) : $('#Error_CommonConfirmationRemarks').hide();

            if (flag) {

                var supportingDocument = $('#Supportingdocuments').prop("files");
                var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);
                modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

                var approvalStatus = [{
                    FromStage: 4,
                    Action: "Send To HGML",
                    ToStage: 5,
                }];

                $('#PrototypeId').val(prototypeId);
                $('#Prot_SupportingDocument').val(modifiedSupportingDocumentsName);
                $('#Prot_ConfirmationRemarks').val(confirmationRemarks);
                $('#SubmissionDetailsData').val(JSON.stringify(hubReviewData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#PrototypeStatusId').val(5);
                $('#FromStageName').val('HubReview');

                document.getElementById('Prototype_Details_Submit').submit();
            }
        });
    }
}



colmodels = [

    {
        name: 'BatchNo',
        label: 'Batch No',
        resizable: true,
        width: 120,
        ignoreCase: true,
        hidden: ''
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
        width: 120,
        ignoreCase: true,
    },
    {
        name: 'HubUser',
        label: 'HUB User',
        resizable: true,
        width: 200,
        ignoreCase: true,
    },
    {
        name: 'HubRemarks',
        label: 'HUB Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'NumberOfSamples',
        label: 'No of Samples',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ViewComposition',
        label: 'View Composition',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TrackingDetails',
        label: 'Tracking Details',
        resizable: true,
        width: 100,
        ignoreCase: true,
    },
    {
        name: 'PmdRemarks',
        label: 'PMD Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },


],

    $("#HubDetail_BasedOn_BatchNo").jqGrid({
        url: '',
        datatype: 'local',
        data: prototypeHubDetails,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#HubDetail_BasedOn_BatchNo_pager',
        rowNum: 10000,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#HubDetail_BasedOn_BatchNo tbody tr");
            var objHeader = $("#HubDetail_BasedOn_BatchNo tbody tr td");

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
                else if ($(objRows[i]).find("td:nth-child(3)").text() === "Rework") {
                    $(objRows[i]).find("td:nth-child(3)").addClass('rework');
                }
            }

            //if (hideBatchNo == true)
            //{
            //    jQuery("#HubDetail_BasedOn_BatchNo").jqGrid('hideCol', "BatchNo");
            //}

        }
    });
$("#HubDetail_BasedOn_BatchNo").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
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
colmodel = [

    {
        name: 'BatchNo',
        label: 'Batch No',
        resizable: true,
        width: 120,
        ignoreCase: true,
        hidden: ''
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
        width: 120,
        ignoreCase: true,
    },
    {
        name: 'HubUser',
        label: 'HUB User',
        resizable: true,
        width: 200,
        ignoreCase: true,
    },
    {
        name: 'HubRemarks',
        label: 'HUB Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'NumberOfSamples',
        label: 'No of Samples',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ViewComposition',
        label: 'View Composition',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TrackingDetails',
        label: 'Tracking Details',
        resizable: true,
        width: 100,
        ignoreCase: true,
    },
    {
        name: 'PmdRemarks',
        label: 'PMD Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
    },
],

    $("#HubDetail_BasedOn_BatchNos").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodel,
        loadonce: true,
        viewrecords: true,
        pager: '#HubDetail_BasedOn_BatchNos_pager',
        rowNum: 10000,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#HubDetail_BasedOn_BatchNos tbody tr");
            var objHeader = $("#HubDetail_BasedOn_BatchNos tbody tr td");

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
                else if ($(objRows[i]).find("td:nth-child(3)").text() === "Rework") {
                    $(objRows[i]).find("td:nth-child(3)").addClass('rework');
                }
            }

            //if (hideBatchNo == true)
            //{
            //    jQuery("#HubDetail_BasedOn_BatchNo").jqGrid('hideCol', "BatchNo");
            //}

        }
    });
$("#HubDetail_BasedOn_BatchNos").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
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

$('#CompleteHubStatus_Icon').click(function () {

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetHubStatusDetails",
        data: { prototypeId: prototypeId },
        dataType: "json",
        success: function (hubStatusDetails) {
            var hubStatusData = hubStatusDetails;

            const currentSubmissionNoBasedHubStatusData = hubStatusData.filter(obj => obj.SubmissionNo === currentSubmissionNo && obj.HubName != 'HGML');

            if (iconName != 'View') {
                $("#HubDetail_BasedOn_BatchNo").jqGrid("clearGridData");
                $("#HubDetail_BasedOn_BatchNo").jqGrid('setGridParam', { data: currentSubmissionNoBasedHubStatusData.length == 0 ? [] : currentSubmissionNoBasedHubStatusData });
                $("#HubDetail_BasedOn_BatchNo").trigger('reloadGrid', [{ page: 1 }]);
            }
            else {
                $('#HubStatusModal').modal('show');
                $("#HubDetail_BasedOn_BatchNos").jqGrid("clearGridData");
                $("#HubDetail_BasedOn_BatchNos").jqGrid('setGridParam', { data: currentSubmissionNoBasedHubStatusData.length == 0 ? [] : currentSubmissionNoBasedHubStatusData });
                $("#HubDetail_BasedOn_BatchNos").trigger('reloadGrid', [{ page: 1 }]);
            }

        },
        error: function (err) {

            alert(err.responseText);
        }
    });
});


$(document).on('click', '#BatchNoBased_HubStatus_Icon', function () {

    debugger
    var clossestTableRow = $(this).closest("tr");

    const batchNo = clossestTableRow.find("#BatchNumber").val();

    const submissionDetailBasedOnBatchNo = [];

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetHubStatusDetails",
        data: { prototypeId: prototypeId },
        dataType: "json",
        success: function (hubStatusDetails) {
            debugger

            var hubStatusData = hubStatusDetails;
            const submissionDetailBasedOnBatchNo = hubStatusData.filter(obj => obj.SubmissionNo === currentSubmissionNo && obj.BatchNo === batchNo);

            $('#HubStatusModal').modal('show');

            $("#HubDetail_BasedOn_BatchNos").jqGrid("clearGridData");
            $("#HubDetail_BasedOn_BatchNos").jqGrid('setGridParam', { data: submissionDetailBasedOnBatchNo.length == 0 ? [] : submissionDetailBasedOnBatchNo });
            $("#HubDetail_BasedOn_BatchNos").trigger('reloadGrid', [{ page: 1 }]);

        },
        error: function (err) {

            alert(err.responseText);
        }
    });

});

$(document).on('click', '#BatchNoBased_HubStatus_Icon_InJqGrid', function () {

    debugger

    var clossestTableRow = $(this).closest("tr");

    // Get the ID of the grid container
    var gridContainerId = $(this).closest(".ui-jqgrid").attr("id");
    // Find the child element with the class "ui-jqgrid-btable" inside the container
    var gridId = $("#" + gridContainerId).find(".ui-jqgrid-btable").attr("id");

    var grd = $('#' + gridId);
    var rowid = $(this).closest("tr.jqgrow").attr("id");

    var batchNo = grd.jqGrid('getCell', rowid, 'BatchNumber');
    var submissionNo = grd.jqGrid('getCell', rowid, 'SubmissionNo');

    const submissionDetailBasedOnBatchNo = [];

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetHubStatusDetails",
        data: { prototypeId: prototypeId },
        dataType: "json",
        success: function (hubStatusDetails) {
            debugger

            var hubStatusData = hubStatusDetails;
            //const submissionDetailBasedOnBatchNo = hubStatusData.filter(obj => obj.BatchNo === batchNo);

            const submissionDetailBasedOnBatchAndSubmissionNo = hubStatusData.filter(obj => obj.BatchNo === batchNo && obj.SubmissionNo === submissionNo);

            $('#HubStatusModal').modal('show');
            $("#HubDetail_BasedOn_BatchNos").jqGrid("clearGridData");
            $("#HubDetail_BasedOn_BatchNos").jqGrid('setGridParam', { data: submissionDetailBasedOnBatchAndSubmissionNo.length == 0 ? [] : submissionDetailBasedOnBatchAndSubmissionNo });
            $("#HubDetail_BasedOn_BatchNos").trigger('reloadGrid', [{ page: 1 }]);
            //}
        },
        error: function (err) {

            alert(err.responseText);
        }
    });

});

$(document).on('click', '#SaveInHgmlReview', function () {

    var hgmlReviewData = [];

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var arrayitem = {

            PrototypeId: prototypeId,
            BatchNo: $(obj).find('#BatchNumber').val(),
            HgmlStatus: $(obj).find('#HgmlStatus').val(),
            HgmlRemarks: $.trim($(obj).find('#HgmlRemarks').val())
        };

        hgmlReviewData.push(arrayitem);
    });

    $('#SaveModal').modal('show');

    $('#Save_Ok').click(function () {

        var supportingDocument = $('#Supportingdocuments').prop("files");
        var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);
        modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

        $('#PrototypeId').val(prototypeId);
        $('#Prot_SupportingDocument').val(modifiedSupportingDocumentsName);
        $('#SubmissionDetailsData').val(JSON.stringify(hgmlReviewData));
        $('#PrototypeStatusId').val(5);
        $('#FromStageName').val('HgmlReview');

        document.getElementById('Prototype_Details_Submit').submit();
    });
});


function validateSubmitInHgmlReview() {
    debugger

    var flag = true;
    var emptyRow = [];
    var hgmlReviewData = [];
    var HgmlStatus = [];
    var count = 0;
    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var arrayitem = {

            PrototypeId: prototypeId,
            BatchNo: $(obj).find('#BatchNumber').val(),
            HgmlStatus: $(obj).find('#HgmlStatus').val(),
            HgmlRemarks: $.trim($(obj).find('#HgmlRemarks').val())
        };
        hgmlReviewData.push(arrayitem);

        (arrayitem.HgmlRemarks == "" || arrayitem.HgmlStatus == "") ? emptyRow.push(i + 1) : "";

        $(obj).find('#HgmlRemarks').css('outline', '');
        $(obj).find('#HgmlStatus').css('outline', '');

        arrayitem.HgmlRemarks == "" ? $(obj).find('#HgmlRemarks').css('outline', '1.5px solid red') : "";
        arrayitem.HgmlStatus == "" ? $(obj).find('#HgmlStatus').css('outline', '1.5px solid red') : "";
    });

    $.each(hgmlReviewData, function (i) {
        HgmlStatus.push(hgmlReviewData[i].HgmlStatus)
    });

    $.each(HgmlStatus, function (i, obj) {
        if (obj == "Approve") {
            count = count + 1;
        }
    });
    if (count > 1) {
        alert("Please note that only one batch can be approved.");
        flag = false;
    }

    emptyRow = $.unique(emptyRow);
    var stringFormattedEmptyRow = emptyRow.join(", ");

    if (emptyRow.length > 0) {
        flag = false;
        isRowEmpty = true;
        alert('Please enter all the mandatory fields in Row No ' + stringFormattedEmptyRow + '.');
    }

    if (flag) {

        $('#SubmitModal').modal('show');
        $('#Error_CommonConfirmationRemarks').hide();

        $('#Submit_Ok').click(function () {

            // Disable the button
            $(this).prop('disabled', true);

            // Enable the button after 5 seconds
            setTimeout(function () {
                $('#Submit_Ok').prop('disabled', false);
            }, 5000); // 5000 milliseconds = 5 seconds

            flag = true;

            var confirmationRemarks = $.trim($('.ConfirmationRemarks').val());
            //confirmationRemarks == "" ? ($('#Error_CommonConfirmationRemarks').show(), flag = false) : $('#Error_CommonConfirmationRemarks').hide();

            if (flag) {

                var supportingDocument = $('#Supportingdocuments').prop("files");
                var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);
                modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

                var approvalStatus = [{
                    FromStage: 5,
                    Action: "Submit",
                    ToStage: 6,
                }];

                $('#PrototypeId').val(prototypeId);
                $('#Prot_SupportingDocument').val(modifiedSupportingDocumentsName);
                $('#Prot_ConfirmationRemarks').val(confirmationRemarks);
                $('#SubmissionDetailsData').val(JSON.stringify(hgmlReviewData));
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#PrototypeStatusId').val(6);
                $('#FromStageName').val('HgmlReview');

                document.getElementById('Prototype_Details_Submit').submit();
            }
        });
    }

}


//colmodels = [

//    {
//        name: 'Date',
//        label: 'Date',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'BatchNumber',
//        label: 'Batch Number',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'SamplesByFd',
//        label: 'Samples By FD',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'FandDComments',
//        label: 'F&D Remarks',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'CompositionDownload',
//        label: 'Composition',
//        resizable: true,
//        ignoreCase: true,
//        formatter: function (cellvalue, options, rowobject) {
//            return `<div class="demo-content pt-2" disabled>` +
//                (rowobject.Composition == "" || rowobject.Composition == null ? '<i></i>' : `<a disabled onclick=DownloadImageInGrid(this) id = "CompositionImageDownload" >
//                            <i class="fas fa-download" aria-hidden="true" disabled title="Download"></i>
//                        </a>`) +
//                `</div>`;
//        }
//    },
//    {
//        name: 'Composition',
//        label: 'CompositionHide',
//        resizable: true,
//        ignoreCase: true,
//        hidden: true,
//        classes: 'Compositon'
//    },
//    {
//        name: 'SamplesSentTo',
//        label: 'Samples Sent To',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'NumberOfSamples',
//        label: 'No of Samples',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'TrackingDetails',
//        label: 'Tracking Details',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'PmdRemarks',
//        label: 'PMD Remarks',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'HubRemarks',
//        label: 'HUB remarks',
//        resizable: true,
//        ignorecase: true,
//    },
//    {
//        name: 'HubStatus',
//        label: 'HUB Status',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'HgmlStatus',
//        label: 'HGML Status',
//        resizable: true,
//        ignoreCase: true,
//        width: 120,
//    },
//    {
//        name: 'HgmlRemarks',
//        label: 'HGML Remarks',
//        resizable: true,
//        ignoreCase: true,
//    }
//],
colmodels = [

    {
        name: 'SubmissionNo',
        label: 'Submission No.',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'Date',
        label: 'Date',
        resizable: true,
        ignoreCase: true,
        width: 100
    },
    {
        name: 'BatchNumber',
        label: 'Batch Number',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SamplesByFd',
        label: 'Samples By FD',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'FandDComments',
        label: 'F&D Remarks',
        resizable: true,
        ignoreCase: true,
        width: 200
    },
    {
        name: 'CompositionDownload',
        label: 'Composition',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="demo-content pt-2 d-flex justify-content-center" disabled>` +
                (rowobject.Composition == "" || rowobject.Composition == null ? '<i></i>' : `<a disabled onclick=DownloadImageInGrid(this,'#Approved_Prototype') id = "CompositionImageDownload" >
                            <i class="fas fa-download" aria-hidden="true" disabled title="Download"></i>
                        </a>`) +
                `</div>`;
        }
    },
    {
        name: 'Composition',
        label: 'CompositionHide',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        classes: 'Compositon'
    },
    {
        name: 'SamplesSentTo',
        label: 'Samples Sent To',
        resizable: true,
        ignoreCase: true,
        width: 200
    },
    {
        name: 'HubStatus',
        label: 'HUB Status',
        resizable: true,
        ignoreCase: true,
        width: 120,
        formatter: function (cellvalue, options, rowobject) {

            return `<div class= "d-flex justify-content-center" id="BatchNoBased_HubStatus_Icon_InApprovedJqGrid" >
                                    <i class="fas fa-eye" aria-hidden="true"></i>
                                </div>`;
        }
    },
    {
        name: 'HgmlStatus',
        label: 'HGML Status',
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'HgmlRemarks',
        label: 'HGML Remarks',
        resizable: true,
        ignoreCase: true,
        width: 200
    }
],

    $("#Approved_Prototype").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#Approved_Prototype_pager',
        rowNum: 10000,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Approved_Prototype tbody tr");
            var objHeader = $("#Approved_Prototype tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            if (statusId == 8) {

                jQuery("#Approved_Prototype").jqGrid('hideCol', "CompositionDownload");
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


function DownloadImageInGrid(obj, tableIdOrClass) {
    debugger

    var clossestTableRow = $(obj).closest("tr");
    var grd = $(tableIdOrClass);
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    //var fileName = $(clossestTableRow).children().find(".Composition").val();

    var fileName = grd.jqGrid('getCell', rowid, 'Composition');

    //var fileName = $(obj).closest('tr').find('.Composition').val();

    if (fileName != "" || fileName != undefined) {

        fileName = fileName.replace(/"/g, '');

        $(obj).closest('tr').find('#CompositionImageDownload').prop("href", ROOT + "Prototype/DownloadImageFile?fileName=" + fileName);
        return true;
    }
}

$('#Add_Submission').click(function () {

    $('#OnClickAddSubmission_ShowMe_1, #SubmitInRework, #Save').show();
    var flag = true;
    var projectNo = $('#ProjectNo').val();
    var productName = $('#ProductName').val();
    var provisionalClaim = $('#ProvisionalClaim').val();
    var dosageForm = $('#DosageForm').val();

    if (flag) {
        debugger
        var supportingDocument = $('#Supportingdocuments').prop("files");

        var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);

        modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

        var prototypeDetails = {
            ProjectNo: projectNo,
            ProjectDescription: $('#ProjectDescription').val(),
            HghCode: $('#HghCode').val(),
            ProductName: productName,
            DivisionName: $('#DivisionName').val(),
            DosageForm: $('#DosageForm').val(),
            ProvisionalClaim: provisionalClaim,
            Remarks: $('#Remarks').val(),
            SupportingDocument: modifiedSupportingDocumentsName,
            StatusId: 7,
        };

        $.ajax({

            type: "POST",
            url: ROOT + "Prototype/UploadPrototypeDetails",
            data: { prototype: prototypeDetails, prototypeId: prototypeId },
            dataType: "json",
            success: function (response) {
                debugger
                $('#SubmissionNo').val(response.SubmissionNo.toString());
                prototypeId = response.PrototypeId;
            },
            error: function (err) {

                alert(err.responseText);
            }
        });
    }

});





//colmodels = [

//    {
//        name: 'SubmissionNo',
//        label: 'Submission No.',
//        resizable: true,
//        ignoreCase: true,
//        hidden: true
//    },
//    {
//        name: 'Date',
//        label: 'Date',
//        resizable: true,
//        ignoreCase: true,
//        width:100
//    },
//    {
//        name: 'BatchNumber',
//        label: 'Batch Number',
//        resizable: true,
//        ignoreCase: true,
//        width:120
//    },
//    {
//        name: 'SamplesByFd',
//        label: 'Samples By FD',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'FandDComments',
//        label: 'F&D Remarks',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: '',
//        label: 'Composition',
//        resizable: true,
//        ignoreCase: true,
//        formatter: function (cellvalue, options, rowobject) {
//            return `<div class="demo-content pt-2" disabled>` +
//                (rowobject.Composition == "" || rowobject.Composition == null ? '<i></i>' : `<a disabled onclick=DownloadImageInGrid(this,'.Rework_Prototype') id = "CompositionImageDownload" > 
//                            <i class="fas fa-download" aria-hidden="true" disabled title="Download"></i>
//                        </a>`) +
//                `</div>`;
//        }
//    },
//    {
//        name: 'Composition',
//        label: 'CompositionHide',
//        resizable: true,
//        ignoreCase: true,
//        hidden: true,
//        classes: 'Compositon'
//    },
//    {
//        name: 'SamplesSentTo',
//        label: 'Samples Sent To',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'NumberOfSamples',
//        label: 'No of Samples',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'TrackingDetails',
//        label: 'Tracking Details',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'PmdRemarks',
//        label: 'PMD Remarks',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'HubRemarks',
//        label: 'HUB remarks',
//        resizable: true,
//        ignorecase: true,
//    },
//    {
//        name: 'HubStatus',
//        label: 'HUB Status',
//        resizable: true,
//        ignoreCase: true,
//    },
//    {
//        name: 'HgmlStatus',
//        label: 'HGML Status',
//        resizable: true,
//        ignoreCase: true,
//        width: 120,
//    },
//    {
//        name: 'HgmlRemarks',
//        label: 'HGML Remarks',
//        resizable: true,
//        ignoreCase: true,
//    }
//],

//    $(".Rework_Prototype").jqGrid({
//        url: '',
//        datatype: 'local',
//        data: [],
//        mtype: 'GET',
//        colModel: colmodels,
//        loadonce: true,
//        viewrecords: true,
//        pager: '.Rework_Prototype_pager',
//        rowNum: 10000,
//        scroll: true,

//        gridComplete: function () {
//            var objRows = $(".Rework_Prototype tbody tr");
//            var objHeader = $(".Rework_Prototype tbody tr td");

//            if (objRows.length > 1) {
//                var objFirstRowColumns = $(objRows[1]).children("td");
//                for (i = 0; i < objFirstRowColumns.length; i++) {
//                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
//                }
//            }
//        }
//    });

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


function OnClickOfRejectedSubmissionNo(button) {

    debugger
    var spanElement = button.querySelector('span');
    var submissionNo = spanElement.textContent;
    var submissionDetailBasedOnSubmissionNo = [];

    $(".hideFlush:not(#flush-collapseOne" + submissionNo + ")").hide();

    $("#flush-collapseOne" + submissionNo + "").toggle('collapse');

    if (jsonFormReworkData["PrototypeSubmissionDetailsList"].length != 0) {

        var submissionDetailsData = jsonFormReworkData["PrototypeSubmissionDetailsList"];

        submissionDetailBasedOnSubmissionNo = submissionDetailsData.filter(obj => obj.SubmissionNo === submissionNo);
    }

    //var grid = $(".Rework_Prototype");
    //var rows = grid.getDataIDs();
    //for (var i = 0; i < rows.length; i++) {
    //    grid.delRowData(rows[i]);
    //}


    $("#Rework_Prototype" + submissionNo).jqGrid('setGridParam', { data: submissionDetailBasedOnSubmissionNo.length == 0 ? [] : submissionDetailBasedOnSubmissionNo });
    $("#Rework_Prototype" + submissionNo).trigger('reloadGrid', [{ page: 1 }]);
}


$(document).ready(function () {

    if (iconName == 'View') {

        //$('.NotInView').hide();

        $('#Prototype_Details_Submit *:not(button)').attr('readonly', 'readonly');
        $('#Prototype_Details_Submit *:not(button,input[type="text"]:not(.Date),textarea)').attr('disabled', true);
        $('#SaveHeader').hide();
        $('.addHubDetails').hide();
        $('#Delete').hide();

        //$('button').attr('disabled', false);
        //$('#HgmlApprove_HubUser_Dropdown').attr('disabled', true);

        $('.btn-ap, .btn-sb, .btn-add, .btn-rej, .btn-cnl, .btn-mail, .btn-back').hide();
        $('.btn-cnl').show();

        //$('.btn-rej').prop("disabled", false);
        //$('.btn-rej').prop("readonly", false);
    }

});




$('#HubDetailModal_Cnl').click(function () {

    var tbody = $('#HubDetail_Table_Body');
    tbody.empty();
});

//Validation for Samples By FD cannot be zero
$(document).on('change', '#SamplesByFd', function () {

    $('.samplesbyfd').css('outline', '');

    var samplesByFd = parseInt($(this).val());
    samplesByFd == 0 ? ($(this).css('outline', '1.5px solid red'), $(this).val(''), alert('Samples by FD value cannot be zero.')) : $(this).css('outline', '');
});


//Validation for Number Of Samples cannot be zero
$(document).on('change', '#NumberOfSamples', function () {

    $('.NumberOfSamples').css('outline', '');

    var numberOfSamples = parseInt($(this).val());
    numberOfSamples == 0 ? ($(this).css('outline', '1.5px solid red'), $(this).val(''), alert('Number Of Samples cannot be zero.')) : $(this).css('outline', '');
});



$(document).on("keyup", ".PmdRemarks, #Confirmation_Remarks, .BatchNumber, #ConfirmationRemarks, #HubRemarks, #HgmlRemarks, #FandDComments", function () {
    debugger
    if ($(this).val().trim() === "") {
        this.value = this.value.trim();
    }
    this.value = this.value.replace(/[^a-zA-Z0-9_@./!`~*#&+\-$ ]/g, '');
    this.value = this.value.replace(/  +/g, ' ');
});


$(document).on('click', '#Save_HubDetail', function () {
    var flag = true;
    var selectedHubDetailData = [];
    var selectedHubAndUserDetail = [];
    var hubHavingdata = [];

    if (flag) {

        $('#HubUser_Table tbody tr').each(function (i, obj) {
            debugger
            var arrayitem = {
                HubName: $.trim($(obj).find('#HubName').text()),
                HubUser: $.trim($(obj).find('#HubUser').val()),
                TrackingDetails: $.trim($(obj).find('#TrackingDetails').val()),
            };
            hubHavingdata.push(arrayitem.HubName);

            hubHavingdata.forEach(function (hub, index) {

                if (arrayitem.HubName == hub) {
                    selectedHubAndUserDetail.push(arrayitem);
                }
            });

        });
        $('#HubDetail_Table tbody tr').each(function (i, obj) {

            var arrayitem1 = {
                HubName: $.trim($(obj).find('#HubName').text()),
                NumberOfSamples: $.trim($(obj).find('#NumberOfSamples').val()),
                ViewComposition: $(obj).find('#ViewComposition').val(),
                PmdRemarks: $.trim($(obj).find('#PmdRemarks').val()),
                Composition: $.trim($(obj).find('#Composition').val()),

            };
            var hubAndUserDetail = selectedHubAndUserDetail.filter(function (item) {
                return item.HubName === arrayitem1.HubName;
            });

            var arrayitem2 = {
                HubName: $.trim($(obj).find('#HubName').text()),
                BatchNo: $.trim($(obj).find('#BatchNo').text()),
                NumberOfSamples: $.trim($(obj).find('#NumberOfSamples').val()),
                ViewComposition: $(obj).find('#ViewComposition').val(),
                TrackingDetails: hubAndUserDetail[0].TrackingDetails,
                PmdRemarks: $.trim($(obj).find('#PmdRemarks').val()),
                HubUser: hubAndUserDetail[0].HubUser
            };

            selectedHubDetailData.push(arrayitem2);
        });
        $.ajax({

            type: "POST",
            url: ROOT + "Prototype/UploadPrototypeHubDetailsInPmdReview",
            data: { hubDetailsData: JSON.stringify(selectedHubDetailData), prototypeId: prototypeId },
            dataType: "json",
            success: function (response) {

                if (response.length > 0) {

                    appendDataToSubmissionDetailsTable(response, statusId);

                    // To get the tooltip in every input fields after apending the data to the table

                    const inputFields = document.querySelectorAll('input[type="text"], textarea');

                    inputFields.forEach((inputField) => {

                        inputField.addEventListener("mouseover", () => {
                            debugger
                            inputField.title = inputField.value;
                            //inputField.style.cursor = "help";
                        });

                        inputField.addEventListener("mouseout", () => {

                            inputField.title = "";
                            //inputField.style.cursor = "default";
                        });
                    });
                }
            },
            error: function (err) {

                alert(err.responseText);
            }
        });

        $('#addHubDetailModal').modal('hide');
    }
});

$(document).on('click', '#Submit_HubDetail', function () {
    debugger
    var hubDetailsData = [];
    var emptyRow = [];
    var enteredSamples = 0;
    var flag = true;

    $('#HubDetail_Table tbody tr').each(function (i, obj1) {

        var arrayitem1 = {

            HubName: $(obj1).find('#HubName').text(),
            BatchNo: $(obj1).find('#BatchNo').text(),
            NumberOfSamples: $(obj1).find('#NumberOfSamples').val(),
            ViewComposition: $(obj1).find('#ViewComposition').val(),
            //TrackingDetails: $(obj1).find('#TrackingDetails').val(),
            PmdRemarks: $.trim($(obj1).find('#PmdRemarks').val()),
        };

        hubDetailsData.push(arrayitem1);
    });

    var hubNamesArray = hubDetailsData.map(function (item) {
        return $.trim(item.HubName);
    });
    var uniqueHubNamesArray = hubNamesArray.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });

    var batchNoArray = hubDetailsData.map(function (item) {
        return $.trim(item.BatchNo);
    });
    var uniqueBatchNoArray = batchNoArray.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });

    var batchNoNotHavingHgmlData = [];

    $('#HubDetail_Table tbody tr').each(function (i, obj1) {

        var arrayitem1 = {

            HubName: $.trim($(obj1).find('#HubName').text()),
            BatchNo: $.trim($(obj1).find('#BatchNo').text()),
            NumberOfSamples: $.trim($(obj1).find('#NumberOfSamples').val()),
            ViewComposition: $(obj1).find('#ViewComposition').val(),
            //TrackingDetails: $.trim($(obj1).find('#TrackingDetails').val()),
            PmdRemarks: $.trim($(obj1).find('#PmdRemarks').val()),
            Composition: $.trim($(obj1).find('#Composition').val())
        };

        $(obj1).find('#NumberOfSamples').css('outline', '');
        $(obj1).find('#ViewComposition').css('outline', '');
        $(obj1).find('#PmdRemarks').css('outline', '');

        if (arrayitem1.HubName == 'HGML') {

            uniqueBatchNoArray.forEach(function (item2, index2) {

                if (item2 == arrayitem1.BatchNo) {

                    if (arrayitem1.NumberOfSamples == '' && (arrayitem1.ViewComposition == '' || (arrayitem1.NumberOfSamples == ''))) {

                        //arrayitem1.PmdRemarks == '' ? $(obj1).find('#PmdRemarks').css('outline', '1.5px solid red') : "";
                        arrayitem1.NumberOfSamples == '' ? $(obj1).find('#NumberOfSamples').css('outline', '1.5px solid red') : "";
                        (arrayitem1.ViewComposition == '' && arrayitem1.Composition != '') ? $(obj1).find('#ViewComposition').css('outline', '1.5px solid red') : "";

                        batchNoNotHavingHgmlData.push(item2)
                    }
                }
            });
        }
    });


    if (batchNoNotHavingHgmlData.length > 0) {

        flag = false;
        batchNoNotHavingHgmlData.toString();

        alert(`Please enter the "No. of samples and HUB user details" for the Batch No. <b>` + batchNoNotHavingHgmlData + `</b>`);
    }

    if (flag) {
        var hubDetailsData1 = [];

        $('#HubDetail_Table tbody tr').each(function (i, obj1) {

            var arrayitem1 = {

                HubName: $.trim($(obj1).find('#HubName').text()),
                BatchNo: $.trim($(obj1).find('#BatchNo').text()),
                NumberOfSamples: $.trim($(obj1).find('#NumberOfSamples').val()),
                ViewComposition: $(obj1).find('#ViewComposition').val(),
                //TrackingDetails: $.trim($(obj1).find('#TrackingDetails').val()),
                PmdRemarks: $.trim($(obj1).find('#PmdRemarks').val()),
                Composition: $.trim($(obj1).find('#Composition').val())
            };

            //$(obj1).find('#HubUser').next('.btn-group').css('border', '');
            $(obj1).find('#NumberOfSamples').css('outline', '');
            $(obj1).find('#ViewComposition').css('outline', '');
            $(obj1).find('#PmdRemarks').css('outline', '');
            debugger
            if ((arrayitem1.PmdRemarks != '' || arrayitem1.NumberOfSamples != '' || (arrayitem1.ViewComposition != '' && (arrayitem1.PmdRemarks != '' || arrayitem1.NumberOfSamples != ''))) && (arrayitem1.NumberOfSamples == '' || (arrayitem1.ViewComposition == '' && arrayitem1.Composition != ''))) {

                //arrayitem1.PmdRemarks == '' ? $(obj1).find('#PmdRemarks').css('outline', '1.5px solid red') : "";
                arrayitem1.NumberOfSamples == '' ? $(obj1).find('#NumberOfSamples').css('outline', '1.5px solid red') : "";
                (arrayitem1.ViewComposition == '' && arrayitem1.Composition != '') ? $(obj1).find('#ViewComposition').css('outline', '1.5px solid red') : "";

                emptyRow.push(i + 1);

            }

            if (emptyRow.length > 0) {

                flag = false;
                emptyRow.toString();

                alert("Please enter the all the mandatory fields in Row No <b>" + emptyRow + "</b>");
            }
        });
    }

    if (flag) {

        var batchNoHavingSamplesNotEqual = [];

        uniqueBatchNoArray.forEach(function (batchNo, index2) {

            var totalNoOfSamples = 0;
            var samplesByFd = 0;

            $('#HubDetail_Table tbody tr').each(function (i, obj) {

                var arrayitem = {
                    HubName: $.trim($(obj).find('#HubName').text()),
                    BatchNo: $.trim($(obj).find('#BatchNo').text()),
                    NumberOfSamples: $.trim($(obj).find('#NumberOfSamples').val()),
                    ViewComposition: $(obj).find('#ViewComposition').val(),
                    //TrackingDetails: $.trim($(obj).find('#TrackingDetails').val()),
                    PmdRemarks: $.trim($(obj).find('#PmdRemarks').val()),
                    Composition: $.trim($(obj).find('#Composition').val()),
                };

                var noOfSamples = parseInt(arrayitem.NumberOfSamples);

                if (arrayitem.NumberOfSamples != '' && ((arrayitem.ViewComposition == '' && arrayitem.Composition == '') || (arrayitem.ViewComposition != ''))) {

                    if (arrayitem.BatchNo == batchNo) {

                        samplesByFd = parseInt($(obj).find('#SamplesByFd').text());

                        totalNoOfSamples += noOfSamples;
                    }
                }
            });

            if (totalNoOfSamples != samplesByFd) {

                $('#HubDetail_Table tbody tr').each(function (i, obj) {

                    var arrayitem = {
                        HubName: $.trim($(obj).find('#HubName').text()),
                        BatchNo: $.trim($(obj).find('#BatchNo').text()),
                        NumberOfSamples: $.trim($(obj).find('#NumberOfSamples').val()),
                        ViewComposition: $(obj).find('#ViewComposition').val(),
                        //TrackingDetails: $.trim($(obj).find('#TrackingDetails').val()),
                        PmdRemarks: $.trim($(obj).find('#PmdRemarks').val()),
                        Composition: $.trim($(obj).find('#Composition').val()),
                    };

                    if (arrayitem.BatchNo == batchNo) {

                        if (arrayitem.NumberOfSamples != '' && ((arrayitem.ViewComposition == '' && arrayitem.Composition == '') || (arrayitem.ViewComposition != ''))) {

                            $(obj).find('#NumberOfSamples').css('outline', '1.5px solid red');
                        }
                    }
                });

                batchNoHavingSamplesNotEqual.push(batchNo);
            }
        });

        if (batchNoHavingSamplesNotEqual.length > 0) {

            flag = false;
            batchNoHavingSamplesNotEqual.toString();
            alert('The sum of the samples entered for Batch No <b>' + batchNoHavingSamplesNotEqual + '</b> should be equal to the Samples by FD')
        }
    }

    var hubHavingdata = [];
    var selectedHubAndUserDetail = [];
    var pendingHubToSelectHubUser = [];

    if (flag) {

        uniqueHubNamesArray.forEach(function (hub, index1) {

            $('#HubDetail_Table tbody tr').each(function (i, obj) {

                var arrayitem = {
                    HubName: $.trim($(obj).find('#HubName').text()),
                    NumberOfSamples: $.trim($(obj).find('#NumberOfSamples').val()),
                    ViewComposition: $(obj).find('#ViewComposition').val(),
                    PmdRemarks: $.trim($(obj).find('#PmdRemarks').val()),
                    Composition: $.trim($(obj).find('#Composition').val()),

                };

                if (arrayitem.HubName == hub) {

                    if (arrayitem.NumberOfSamples != '' && ((arrayitem.ViewComposition == '' && arrayitem.Composition == '') || (arrayitem.ViewComposition != ''))) {

                        hubHavingdata.push(arrayitem.HubName);
                    }
                }
            });
        });


        hubHavingdata = hubHavingdata.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });


        $('#HubUser_Table tbody tr').each(function (i, obj) {

            $(obj).find('#HubUser').next('.btn-group').css('border', '');

            var arrayitem = {
                HubName: $.trim($(obj).find('#HubName').text()),
                HubUser: $.trim($(obj).find('#HubUser').val()),
                TrackingDetails: $.trim($(obj).find('#TrackingDetails').val()),
            };

            hubHavingdata.forEach(function (hub, index) {

                if (arrayitem.HubName == hub) {

                    if (arrayitem.HubUser == '') {

                        pendingHubToSelectHubUser.push(hub);

                        $(obj).find('#HubUser').next('.btn-group').css('border', '1.5px solid red').css('border-radius', '6px');
                    }

                    selectedHubAndUserDetail.push(arrayitem);
                }
            });
        });

        if (pendingHubToSelectHubUser.length > 0) {

            flag = false;
            pendingHubToSelectHubUser.toString();

            alert('Please select the HUB users for <b>' + pendingHubToSelectHubUser + '</b> HUB');
        }
    }


    var selectedHubDetailData = [];

    if (flag) {

        $('#HubDetail_Table tbody tr').each(function (i, obj) {

            var arrayitem1 = {
                HubName: $.trim($(obj).find('#HubName').text()),
                NumberOfSamples: $.trim($(obj).find('#NumberOfSamples').val()),
                ViewComposition: $(obj).find('#ViewComposition').val(),
                PmdRemarks: $.trim($(obj).find('#PmdRemarks').val()),
                Composition: $.trim($(obj).find('#Composition').val()),

            };

            if (arrayitem1.NumberOfSamples != '' && ((arrayitem1.ViewComposition == '' && arrayitem1.Composition == '') || (arrayitem1.ViewComposition != ''))) {

                var hubAndUserDetail = selectedHubAndUserDetail.filter(function (item) {
                    return item.HubName === arrayitem1.HubName;
                });

                var arrayitem2 = {

                    HubName: $.trim($(obj).find('#HubName').text()),
                    BatchNo: $.trim($(obj).find('#BatchNo').text()),
                    NumberOfSamples: $.trim($(obj).find('#NumberOfSamples').val()),
                    ViewComposition: $(obj).find('#ViewComposition').val(),
                    TrackingDetails: hubAndUserDetail[0].TrackingDetails,
                    PmdRemarks: $.trim($(obj).find('#PmdRemarks').val()),
                    HubUser: hubAndUserDetail[0].HubUser
                };

                selectedHubDetailData.push(arrayitem2);
            }

        });


        //console.log(selectedHubDetailData);

        $.ajax({

            type: "POST",
            url: ROOT + "Prototype/UploadPrototypeHubDetailsInPmdReview",
            data: { hubDetailsData: JSON.stringify(selectedHubDetailData), prototypeId: prototypeId },
            dataType: "json",
            success: function (response) {

                if (response.length > 0) {

                    appendDataToSubmissionDetailsTable(response, statusId);

                    // To get the tooltip in every input fields after apending the data to the table

                    const inputFields = document.querySelectorAll('input[type="text"], textarea');

                    inputFields.forEach((inputField) => {

                        inputField.addEventListener("mouseover", () => {
                            debugger
                            inputField.title = inputField.value;
                            //inputField.style.cursor = "help";
                        });

                        inputField.addEventListener("mouseout", () => {

                            inputField.title = "";
                            //inputField.style.cursor = "default";
                        });
                    });
                }
            },
            error: function (err) {

                alert(err.responseText);
            }
        });

        $('#addHubDetailModal').modal('hide');
    }
});

// To check the Sum of number of samples entered for each batch in the popup which is displaying on click of Send Sample button in the PMD Review stage 
function checkSumOfNoOfSamples(obj1) {

    var samplesByFd = parseInt($.trim($(obj1).closest('tr').find('#SamplesByFd').text()));
    var batchNo = $(obj1).closest('tr').find('#BatchNo').text();

    var enteredSamples = 0;
    var afterErrorRemaringSamples = 0;

    $('#HubDetail_Table tbody tr').each(function (i, obj2) {

        if ($(obj2).find('#BatchNo').text() == batchNo) {

            var a = $(obj2).find('#NumberOfSamples').val() == "" ? 0 : parseInt($(obj2).find('#NumberOfSamples').val());
            enteredSamples += parseInt(a);
        }
    });

    if (enteredSamples > samplesByFd) {
        alert("The sum of Number of Samples entered for Batch No <b>" + batchNo + "</b> should be equal to Samples by FD")
        $(obj1).closest('tr').find('#NumberOfSamples').val('');

        $('#HubDetail_Table tbody tr').each(function (i, obj3) {
            if ($(obj3).find('#BatchNo').text() == batchNo) {
                var val = $(obj3).find('#NumberOfSamples').val() == "" ? 0 : parseInt($(obj3).find('#NumberOfSamples').val());
                afterErrorRemaringSamples += parseInt(val);
            }
        });

        var remainingSamples = samplesByFd - afterErrorRemaringSamples
        $('#HubDetail_Table tbody tr').each(function (i, obj4) {
            if ($(obj4).find('#BatchNo').text() == batchNo) {
                $(obj4).find('#NumberOfSamples').attr('placeholder', remainingSamples);
            }
        });
        return false;
    }
    else {
        var remainingSamples = samplesByFd - enteredSamples
        $('#HubDetail_Table tbody tr').each(function (i, obj4) {
            if ($(obj4).find('#BatchNo').text() == batchNo) {
                $(obj4).find('#NumberOfSamples').attr('placeholder', remainingSamples);
            }
        });
    }
}

// Function to get the tooltip in every input fields

$(function () {

    const inputFields = document.querySelectorAll('input[type="text"], textarea');

    inputFields.forEach((inputField) => {

        inputField.addEventListener("mouseover", () => {

            inputField.title = inputField.value;
            //inputField.style.cursor = "help";
        });

        inputField.addEventListener("mouseout", () => {

            inputField.title = "";
            //inputField.style.cursor = "default";
        });
    });
});


//To hide the icon near Supporting Documents field, if there is no supporting documents already uploaded from the previous stages

$(function () {

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetSupportingDocumentDetail",
        data: { prototypeId: prototypeId },
        success: function (response) {

            if (response["SupportingDocumentDetailList"].length == 0) {

                $('#ViewData').hide();
            }
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
});

function fileCompositionValidation() {
    
    var supportingDocuments = $('#CompositionFile').val();
    var allowedExtensions =
        /(\.pdf|\.doc|\.docx|\.xls|\.xlsx|\.jpeg|\.png|\.jpg)$/i;

    if (supportingDocuments != '') {
        if (!allowedExtensions.exec(supportingDocuments)) {
            $('#Err_CompositionDocuments').show();
            $('#CompositionFile').val('');
            setTimeout(function () {

                $('#Err_CompositionDocuments').hide();
            }, 7000);
            return false;
        }
        else {
            $('#Err_CompositionDocuments').hide();
        }
    }
}
// To do the file validation
function fileValidation() {
    debugger
    var supportingDocuments = $('#Supportingdocuments').val();
    var allowedExtensions =
        /(\.pdf|\.doc|\.docx|\.xls|\.xlsx)$/i;

    if (supportingDocuments != '') {
        if (!allowedExtensions.exec(supportingDocuments)) {
            $('#Err_SupportingDocuments').show();
            $('#Supportingdocuments').val('');
            setTimeout(function () {

                $('#Err_SupportingDocuments').hide();
            }, 5000);
            return false;
        }
        else {
            $('#Err_SupportingDocuments').hide();
        }
    }
}

function onDeleteSupportingDocument() {
    debugger
    var fileName = $('#Support_Doc_Name').text();

    confirm("Are you sure you want to delete Supporting Document?", function () {

        if (fileName != '') {
            $.ajax({
                type: 'POST',
                url: ROOT + "Prototype/DeleteImageFile",
                data: { fileName: fileName },
                success: function (data) {

                    $.ajax({
                        type: 'POST',
                        url: ROOT + "Prototype/DeleteSupportingDocument",
                        data: { fileName: fileName, prototypeId: prototypeId, statusId: statusId },
                        success: function (IsDocumentPresent) {

                            if (IsDocumentPresent == "0") {
                                $('#ViewData').hide();
                            }
                            $('#Support_Doc_Name').text('');
                            $('#Delete_Support_Doc').hide();
                        }
                    });
                }
            });
        }
    });
}

function onClickCompleteHubStatus(submissionNo) {
    debugger
    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetHubStatusDetails",
        data: { prototypeId: prototypeId },
        dataType: "json",
        success: function (hubStatusDetails) {
            debugger

            $('#HubStatusModal').modal('show');

            var hubStatusData = hubStatusDetails;

            const currentSubmissionNoBasedHubStatusData = hubStatusData.filter(obj => obj.SubmissionNo === submissionNo);

            $("#HubDetail_BasedOn_BatchNos").jqGrid("clearGridData");
            $("#HubDetail_BasedOn_BatchNos").jqGrid('setGridParam', { data: currentSubmissionNoBasedHubStatusData.length == 0 ? [] : currentSubmissionNoBasedHubStatusData });
            $("#HubDetail_BasedOn_BatchNos").trigger('reloadGrid', [{ page: 1 }]);

        },
        error: function (err) {

            alert(err.responseText);
        }
    });

}

$(document).on('click', '#BatchNoBased_HubStatus_Icon_InApprovedJqGrid', function () {

    debugger

    var clossestTableRow = $(this).closest("tr");
    var grd = $('#Approved_Prototype');
    var rowid = $(this).closest("tr.jqgrow").attr("id");

    var batchNo = grd.jqGrid('getCell', rowid, 'BatchNumber');
    var submissionNo = grd.jqGrid('getCell', rowid, 'SubmissionNo');

    const submissionDetailBasedOnBatchNo = [];

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetHubStatusDetails",
        data: { prototypeId: prototypeId },
        dataType: "json",
        success: function (hubStatusDetails) {
            debugger

            var hubStatusData = hubStatusDetails;
            //const submissionDetailBasedOnBatchNo = hubStatusData.filter(obj => obj.BatchNo === batchNo);

            const submissionDetailBasedOnBatchAndSubmissionNo = hubStatusData.filter(obj => obj.BatchNo === batchNo && obj.SubmissionNo === submissionNo);


            $('#HubStatusModal').modal('show');

            $("#HubDetail_BasedOn_BatchNos").jqGrid("clearGridData");
            $("#HubDetail_BasedOn_BatchNos").jqGrid('setGridParam', { data: submissionDetailBasedOnBatchAndSubmissionNo.length == 0 ? [] : submissionDetailBasedOnBatchAndSubmissionNo });
            $("#HubDetail_BasedOn_BatchNos").trigger('reloadGrid', [{ page: 1 }]);

        },
        error: function (err) {

            alert(err.responseText);
        }
    });

});



colmodels =
    [
        {
            name: 'RowNumber',
            label: 'S.No.',
            resizable: true,
            ignoreCase: true,
            width: 8,
            search: false,
        },
        {
            name: 'SubmissionNo',
            label: 'Submission No',
            resizable: true,
            ignoreCase: true,
            width: 40,
        },
        {
            name: 'FileName',
            label: 'Composition',
            resizable: true,
            ignoreCase: true,
            width: 110,
        },
        {
            name: 'Username',
            label: 'Downloaded By',
            resizable: true,
            ignoreCase: true,
            width: 90,
        },
        {
            name: 'CreatedDate',
            label: 'Downloaded On',
            resizable: true,
            ignoreCase: true,
            width: 60,
        },

    ],
    $("#Compositoin_History_PopUp").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#Pager_Compositoin_History_PopUp',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Compositoin_History_PopUp tbody tr");
            var objHeader = $("#Compositoin_History_PopUp tbody tr td");

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

$("#Compositoin_History_PopUp").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});



$("#CompositionFileHistory").on('click', function () {

    $.ajax({
        type: "POST",
        url: ROOT + "Prototype/GetCompositionHistory",
        data: { prototypeId: prototypeId },
        dataType: "json",
        success: function (Result) {
            debugger

            var jsondata = Result

            //row = `<input type="text" value="` + prototypeDetails[0].PrototypeId + `" class="form-control" readonly>`
            //    $('#ShowPrototypeId').html(row);
            jQuery('#Compositoin_History_PopUp').jqGrid('clearGridData');
            $("#Compositoin_History_PopUp").jqGrid().setGridParam({ data: jsondata });
            jQuery('#Compositoin_History_PopUp').trigger('reloadGrid', [{ page: 1 }]);

        },
        error: function () {
            alert("Error occured!!");
        }
    });
    $("#CompositionHistory").modal('show');
});




// Get the filter inputs and table
var filterInputs = document.querySelectorAll(".filter-input");
var table = document.getElementById("HubDetail_Table");

// Add event listeners for the filter inputs
filterInputs.forEach(function (input) {
    input.addEventListener("keyup", function () {
        var columnIndex = input.getAttribute("data-column");
        var filterValue = input.value.toLowerCase(); // Get the filter value and convert to lowercase

        // Loop through all table rows, and hide/show the rows based on the filter value for the respective column
        for (var i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header row
            var row = table.rows[i];
            var displayRow = true; // Assume the row should be displayed

            // Loop through all filter inputs to check against the cell values
            filterInputs.forEach(function (filterInput) {
                var filterColumnIndex = filterInput.getAttribute("data-column");
                var filterColumnValue = filterInput.value.toLowerCase();

                // Skip the current filter input
                if (filterColumnIndex === columnIndex) {
                    return;
                }

                var cell = row.cells[filterColumnIndex];
                var inputValue = '';

                // Find the input element within the div
                var inputElement = cell.querySelector("div input, div textarea, div label");
                if (inputElement) {
                    if (inputElement.tagName === "LABEL") {
                        inputValue = inputElement.innerText.toLowerCase();
                    } else {
                        inputValue = inputElement.value.toLowerCase();
                    }
                } else {
                    // If the input element is not found, check for select element within the div
                    var selectElement = cell.querySelector("div select");
                    if (selectElement) {
                        inputValue = selectElement.value.toLowerCase();
                    }
                }

                // If the cell value doesn't match the filter value, hide the row
                if (filterColumnValue !== "" && inputValue.indexOf(filterColumnValue) === -1) {
                    displayRow = false;
                    return;
                }
            });

            // Check the filter value for the current column
            var cell = row.cells[columnIndex];
            var inputValue = '';

            // Find the input element within the div
            var inputElement = cell.querySelector("div input, div textarea, div label");
            if (inputElement) {
                if (inputElement.tagName === "LABEL") {
                    inputValue = inputElement.innerText.toLowerCase();
                } else {
                    inputValue = inputElement.value.toLowerCase();
                }
            } else {
                // If the input element is not found, check for select element within the div
                var selectElement = cell.querySelector("div select");
                if (selectElement) {
                    inputValue = selectElement.value.toLowerCase();
                }
            }

            // If the cell value doesn't match the filter value, hide the row
            if (filterValue !== "" && inputValue.indexOf(filterValue) === -1) {
                displayRow = false;
            }

            // Show or hide the row based on the displayRow flag
            if (displayRow) {
                row.style.display = ""; // Show the row
            } else {
                row.style.display = "none"; // Hide the row
            }
        }
    });
});


$(window).on('hidden.bs.modal', function () {

    $('.closeModal').val("");
});

$(document).on('change', '.Hubinfo', function () {
    $(".batchnoinfo option:selected").removeAttr("selected");
    $(".batchnoinfo").val('').multiselect('refresh');
    debugger
    if ($(".Hubinfo").val() == 0) {
        $(".batchnoinfo option").prop("selected", true);
        $(".batchnoinfo").multiselect('refresh');
    }
});


function AddHubAndBatchNo() {
    var selectedHub = $(".Hubinfo").val();
    var selectedbatchno = $(".batchnoinfo").val();
    var selectedBatchesData = [];
    var rowdata = [];
    var hubNameandBatchNo = [];
    var hubNameBatchNo = {}
    var addedHubandbatch = [];
    var addinghubandbatch = {};
    var filteredData = [];
    var commonData = {}
    var BatchNoAndNoOfSamples = [];
    var BatchNoAndSamples = {};
    selectedbatchno.length == 0 ? $('.BatchNo_ErrorMsg').text("Please select Batch Number") : $('.BatchNo_ErrorMsg').text("");

    var maxSlNo = 0;

    $('#HubDetail_Table_Body tr').each(function (i, obj) {
        var j = parseInt(i);
        var slNoElement = $(this).find('#SlNo');
        if (slNoElement.length > 0 && !isNaN(parseInt(slNoElement.text()))) {
            var currentSlNo = parseInt(slNoElement.text());
            if (currentSlNo > maxSlNo) {
                maxSlNo = currentSlNo;
            }
        }
    });

    selectedHub.forEach(function (obj) {
        selectedbatchno.forEach(function (obj1) {
            addinghubandbatch = {
                HubName: obj,
                BatchNo: obj1,
            }
            addedHubandbatch.push(addinghubandbatch);
        });

    });
    $("#HubDetail_Table_Body tr").each(function () {
        if ($(this).find("#HubName").text() != "HGML") {
            hubNameBatchNo = {
                HubName: ($(this).find("#HubName").text()),
                BatchNo: $.trim($(this).find("#BatchNo").text()),
            };
            hubNameandBatchNo.push(hubNameBatchNo);
        }
    });
    $("#HubDetail_Table_Body tr").each(function () {
        BatchNoAndSamples = {
            BatchNo: $.trim($(this).find("#BatchNo").text()),
            NoOfSamples: ($(this).find("#NumberOfSamples").val()),
        };
        BatchNoAndNoOfSamples.push(BatchNoAndSamples);
    });

    var savedHubData = addedHubandbatch.filter(obj1 =>
        !hubNameandBatchNo.some(obj2 =>
            obj2.HubName === obj1.HubName && obj2.BatchNo === obj1.BatchNo
        )
    );

    savedHubData.forEach(function (obj) {
        batchNoSamplesByFdAndComposition.forEach(function (item, i) {
            if (obj.BatchNo == item.BatchNo) {
                selectedBatchesData.push(batchNoSamplesByFdAndComposition[i]);
            }
        });
    });

    var uniqselectedBatchesData = [...new Set(selectedBatchesData)];
    var SaveHubName = [];
    addedHubandbatch.forEach(function (obj) {
        var isFound = hubNameandBatchNo.some(function (item) {
            return item.HubName === obj.HubName && item.BatchNo === obj.BatchNo
        });
        if (!isFound) {
            SaveHubName.push(obj.HubName);
        }
    });
    var uniqueHubNames = [...new Set(SaveHubName)];

    uniqueHubNames.forEach(function (hub) {
        var row = ""; var c = {}; var flag = true;

        uniqselectedBatchesData.forEach(function (batch) {
            hubNameandBatchNo.forEach(function (val) {
                if (val.HubName == hub && val.BatchNo == batch.BatchNo) {
                    flag = false;
                }
            });

            if (flag) {
                maxSlNo++;
                var SamplesBatch = BatchNoAndNoOfSamples.filter(i => i.BatchNo == batch.BatchNo);
                var samples = 0;
                var remaingSample = 0;
                $.each(SamplesBatch, function (i, ob) {
                    samples += ob.NoOfSamples == '' ? 0 : parseInt(ob.NoOfSamples)
                });
                remaingSample = batch.SamplesByFd - samples;
                row = ` <tr>
                        
                         <td>
                              <label class="btn-icon -delete DeleteTableData" title = "Delete"><i class="fas fa-trash" aria-hidden="true"></i></label>
                         </td> 
                          <td>
                      <label id="SlNo">`+ maxSlNo + `</label>
                         </td> 
                         <td>
                             <label id="HubName">`+ hub + `</label>
                         </td> 
                         <td>
                             <label id = "BatchNo" > `+ batch.BatchNo + `</label >
                         </td> 
                         <td>
                             <label id = "SamplesByFd" > `+ batch.SamplesByFd + `</label >
                         </td> 
                         <td>
                             <div class="">
                                 <input id="NumberOfSamples" onpaste="return false;" placeholder="`+ remaingSample + `" autocomplete="off" onkeyup="return checkSumOfNoOfSamples(this);" onkeypress="return onlyNumbers(this);" type="text" class="form-control NumberOfSamples">
                             </div>
                         </td> 
                         <td>
                                  <div class="">
                                      <select ${batch.Composition == "" ? "disabled" : ""} id="ViewComposition" class="form-control mr-2">
                                          <option value="">Select</option>
                                          <option value="Yes"  ${hub == "HGML" && batch.Composition != "" ? "selected" : ""} >Yes</option>
                                          <option value="No" ${hub != "HGML" && batch.Composition != "" ? "selected" : ""} >No</option>
                                      </select>
                                  </div>
                              </td> 
                              <td>
                                  <div class="">
                                      <textarea id="PmdRemarks" class="form-control PmdRemarks"></textarea>
                                  </div>
                              </td> 
                              <td style="display:none">
                                  <div class="">
                                      <textarea id="Composition" class="form-control Composition">`+ batch.Composition + `</textarea>
                                  </div>
                              </td>
                          </tr>`;
                rowdata.push(row);
            }
        });

    });

    $('#HubDetail_Table_Body').append(rowdata);

}

$(document).on('click', '.DeleteTableData', function (e) {
    var rowToDelete = $(this).closest('tr');
    confirm('Are you sure you want to Delete?', function () {
        rowToDelete.remove();
        $('#HubDetail_Table_Body tr').each(function (i, obj) {
            var j = parseInt(i);
            $(this).closest('tr').find('#SlNo').text(j + 1);
        });
    });
});
var addedHubStatus = [];
$(document).on("change", "#HgmlStatus", function () {
    if (statusId == "5") {
        var batchNumberValue = $(this).closest('tr').find('td').eq(2).find('input#BatchNumber').val();
        var hubStatus = $(this).val()
        var existingStatusIndex = -1;
        var count = 0;
        var countOfRework = 0;
        var addedStatus = "";
        var addedBatchNo = "";
        var approvedBatchNo = "";
        for (var a = 0; a < addedHubStatus.length; a++) {
            if (addedHubStatus[a].BatchNo === batchNumberValue) {
                existingStatusIndex = a;
                break;
            }
        }
        if (existingStatusIndex !== -1) {
            addedHubStatus[existingStatusIndex].HubStaus = hubStatus;
        } else {
            var status = {
                HubStaus: hubStatus,
                BatchNo: batchNumberValue,
            };
            addedHubStatus.push(status);
        }
        $.each(addedHubStatus, function (i, obj) {
            if (addedHubStatus[i].HubStaus == "Approve") {
                count = count + 1;
                approvedBatchNo = addedHubStatus[i].BatchNo
                if (count > 1) {
                    addedHubStatus.splice(i, 1);
                }
            }
        });
        $.each(addedHubStatus, function (j, obj) {
            debugger
            if (count == 1) {
                if (addedHubStatus[j] != undefined) {
                    if (addedHubStatus[j].HubStaus == "Rework") {
                        countOfRework = 1;
                        addedStatus = addedHubStatus[j].HubStaus;
                        addedBatchNo = addedHubStatus[j].BatchNo;
                        addedHubStatus.splice(j, 1);
                    }
                }
            }
        });

        if (countOfRework == 1) {
            alert('Please note that already ' + approvedBatchNo + ' selected as approved, not possible to select ' + addedBatchNo + ' for Rework ');
            $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
                if (addedStatus == $(obj).find('#HgmlStatus').val() && addedBatchNo == $(obj).find('#BatchNumber').val()) {
                    $(obj).find('#HgmlStatus').val('')
                }
            });
            flag = false;
        }

        if (count > 1) {
            alert("Please note that only one batch can be approved.");
            $(this).val('');
            flag = false;
        }
    }
});

$(document).on('click', '#SendForApproval', function (e) {
    debugger
    var flag = true;
    var submissionDetailsData = [];
    var emptyRow = [];
    var isBatchNumberDuplicated = false;
    var isRowEmpty = false;

    $('#Approve_Ok').prop("disabled", false);

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var submissionNo = $('#SubmissionNo').val();

        var arrayitem = {

            SubmissionNo: submissionNo,
            Date: $.trim($(obj).find('#Date').val()),
            BatchNumber: $.trim($(obj).find('#BatchNumber').val()),
            SamplesByFd: $.trim($(obj).find('#SamplesByFd').val()),
            FandDComments: $.trim($(obj).find('#FandDComments').val()),
            Composition: ($(obj).find('#CompositionHide').val() == "" ? "" : $(obj).find('#CompositionHide').val().replaceAll('"', ''))
        };

        $(obj).find('#Date').css('outline', '');
        $(obj).find('#BatchNumber').css('outline', '');
        $(obj).find('#SamplesByFd').css('outline', '');

        arrayitem.Date == "" ? (emptyRow.push(i + 1), $(obj).find('#Date').css('outline', '1.5px solid red')) : "";
        arrayitem.BatchNumber == "" ? (emptyRow.push(i + 1), $(obj).find('#BatchNumber').css('outline', '1.5px solid red')) : "";
        arrayitem.SamplesByFd == "" ? (emptyRow.push(i + 1), $(obj).find('#SamplesByFd').css('outline', '1.5px solid red')) : "";

        submissionDetailsData.push(arrayitem);
    });

    emptyRow = $.unique(emptyRow);
    var stringFormattedEmptyRow = emptyRow.join(", ");

    if (emptyRow.length > 0) {
        flag = false;
        isRowEmpty = true;
        alert('Please enter the all mandatory fields in row No ' + stringFormattedEmptyRow + '.');
    }
    else if (submissionDetailsData.length == 0) {
        flag = false;
        isRowEmpty = true;
        alert('Please enter atleast one batch details to send to Approval');
    }

    var duplicateBatchNumbers = submissionDetailsData
        .map(function (item) {
            return item.BatchNumber;
        })
        .filter(function (value, index, self) {
            return self.indexOf(value) !== index;
        });

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var batchNumber = $.trim($(obj).find('#BatchNumber').val());
        if (duplicateBatchNumbers.includes(batchNumber)) {
            debugger
            flag = false;
            isBatchNumberDuplicated = true;
            $(obj).find('#BatchNumber').css('background-color', 'yellow');
        }
    });

    if (!isRowEmpty) {

        if (isBatchNumberDuplicated) {
            alert('Please enter the unique batch number');
        }

        setTimeout(function () {
            $('#SubmissionDetail_Table tbody tr #BatchNumber').css('background-color', '');
        }, 5000);
    }


    if (flag) {

        $('#ApproveModal').modal('show');
        $("#Approve_Ok").click(function () {

            if (statusId == 2) {
                var approvalStatus = [{
                    FromStage: 2,
                    Action: "Send To Pending for Approval",
                    ToStage: 10,
                }];
            }
            if (statusId == 7) {
                var approvalStatus = [{
                    FromStage: 7,
                    Action: "Send To Pending for Approval",
                    ToStage: 10,
                }];
            }
            if (statusId == 9) {
                var approvalStatus = [{
                    FromStage: 9,
                    Action: "Send To Pending for Approval",
                    ToStage: 10,
                }];
            }

            $('#Approve_Ok').prop("disabled", true);

            $('#SubmissionDetailsData').val(JSON.stringify(submissionDetailsData));
            $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
            var ApprovalRemarks = $('.ApprovalRemarks').val();
            $('#Prot_ConfirmationRemarks').val(ApprovalRemarks)
            $('#PrototypeStatusId').val(10);
            $('#FromStageName').val("PendingForApproval");
            document.getElementById('Prototype_Details_Submit').submit();
        });
    }
});


function validateSendBackFromManager() {
    var flag = true;
    var submissionDetailsData = [];
    var emptyRow = [];
    var isBatchNumberDuplicated = false;
    var isRowEmpty = false;


    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var submissionNo = $('#SubmissionNo').val();

        var arrayitem = {

            SubmissionNo: submissionNo,
            Date: $.trim($(obj).find('#Date').val()),
            BatchNumber: $.trim($(obj).find('#BatchNumber').val()),
            SamplesByFd: $.trim($(obj).find('#SamplesByFd').val()),
            FandDComments: $.trim($(obj).find('#FandDComments').val()),
            Composition: ($(obj).find('#CompositionHide').val() == "" ? "" : $(obj).find('#CompositionHide').val().replaceAll('"', ''))
        };

        $(obj).find('#Date').css('outline', '');
        $(obj).find('#BatchNumber').css('outline', '');
        $(obj).find('#SamplesByFd').css('outline', '');

        arrayitem.Date == "" ? (emptyRow.push(i + 1), $(obj).find('#Date').css('outline', '1.5px solid red')) : "";
        arrayitem.BatchNumber == "" ? (emptyRow.push(i + 1), $(obj).find('#BatchNumber').css('outline', '1.5px solid red')) : "";
        arrayitem.SamplesByFd == "" ? (emptyRow.push(i + 1), $(obj).find('#SamplesByFd').css('outline', '1.5px solid red')) : "";

        submissionDetailsData.push(arrayitem);
    });
    emptyRow = $.unique(emptyRow);
    var stringFormattedEmptyRow = emptyRow.join(", ");

    if (emptyRow.length > 0) {
        flag = false;
        isRowEmpty = true;
        alert('Please enter the all mandatory fields in row No ' + stringFormattedEmptyRow + '.');
    }
    else if (submissionDetailsData.length == 0) {
        flag = false;
        isRowEmpty = true;
        alert('Please enter atleast one batch details to send to Approval');
    }

    var duplicateBatchNumbers = submissionDetailsData
        .map(function (item) {
            return item.BatchNumber;
        })
        .filter(function (value, index, self) {
            return self.indexOf(value) !== index;
        });

    $('#SubmissionDetail_Table tbody tr').each(function (i, obj) {
        debugger
        var batchNumber = $.trim($(obj).find('#BatchNumber').val());
        if (duplicateBatchNumbers.includes(batchNumber)) {
            debugger
            flag = false;
            isBatchNumberDuplicated = true;
            $(obj).find('#BatchNumber').css('background-color', 'yellow');
        }
    });

    if (!isRowEmpty) {

        if (isBatchNumberDuplicated) {
            alert('Please enter the unique batch number');
        }

        setTimeout(function () {
            $('#SubmissionDetail_Table tbody tr #BatchNumber').css('background-color', '');
        }, 5000);
    }



    if (flag) {

        $('#SubmitModal').modal('show');
        $('#Error_CommonConfirmationRemarks').hide();

        $('#Submit_Ok').click(function () {
            
            $(this).prop('disabled', true);

            setTimeout(function () {
                $('#Submit_Ok').prop('disabled', false);
            }, 5000); 

            flag = true;

            var confirmationRemarks = $.trim($('.ConfirmationRemarks').val());
            
            if (flag) {

                var supportingDocument = $('#Supportingdocuments').prop("files");
                var modifiedSupportingDocumentsName = SaveCompositionFile(supportingDocument);
                modifiedSupportingDocumentsName = modifiedSupportingDocumentsName.replace(/"/g, "");

                var approvalStatus = [];

                  approvalStatus = [{
                      FromStage: 10,
                      Action: "Send Back To Initiator",
                      ToStage: 9,
                  }];
                  
                

                $('#PrototypeId').val(prototypeId);
                $('#Prot_SupportingDocument').val(modifiedSupportingDocumentsName);
                $('#Prot_ConfirmationRemarks').val(confirmationRemarks);
                $('#ApprovalStatus').val(JSON.stringify(approvalStatus));
                $('#SubmissionDetailsData').val(JSON.stringify(submissionDetailsData));
                $('#FromStageName').val('PendingForApproval');

                $('#PrototypeStatusId').val(9);
                

                document.getElementById('Prototype_Details_Submit').submit();
            }
        });
    }
}
function ViewImage(obj) {
    debugger
    var fileName = $(obj).closest('tr').find('#CompositionHide').val();
    fileName = fileName.replace(/"/g, '');

    var extension = fileName.split('.').pop();
    extension = extension.toLowerCase();

    //var extension = getFileExtension(fileName);
    //extension = extension.replace(/"/g, "");
    //console.log(extension);

    if (fileName != "") {
        var imageUrl = ROOT + "PrototypeImages/" + fileName;
        // Open the image URL in a new tab.
        window.open(imageUrl, '_blank');
    }

    //if (extension === "pdf" || extension === "png" || extension === "jpeg" || extension === "jpg") {
    //    debugger

    //    if (fileName != "") {
    //        $(obj).closest('tr').find('#CompositionImageView').prop("href", ROOT + "Prototype/DownloadImageFile?fileName=" + fileName);
    //        return true;
    //    }
    //}
}
var projectArray = [];
projectArray = $("#ProjectValue").val();
projectArray = projectArray != [] && projectArray != null ? JSON.parse(projectArray) : [];
var selectedId = "";
var ProjectType = "";
var ProjectBriefStatus = "";
var HGHId = $("#HGHId").val();
var MProjectId = $("#MProjectId").val();
var IsPresent = "";
var StatusId = $("#StatusId").val();
var ExsistingHGHCode = [];
$("#ProjectId").attr("disabled", true);
$("#refreshBtn").addClass("hide");
$("#btnSave , #btnSubmit").addClass('hide')

if (StatusId == 0) {
    $("#btnSave , #btnSubmit").removeClass('hide')
}

if (MProjectId != "" || MProjectId != null || MProjectId != undefined) {
    var ProjectName = projectArray.find(m => m.ProjectId == MProjectId).Product;
    $("#ProjectId").val(ProjectName);
    GetProjectInfo();
}

initializeAutocomplete();
function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function initializeAutocomplete() {

    $("[data-projectid]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                var obj = [];
                var cnt = 0;
                var matching = $.grep(projectArray, function (value) {
                    var name = value.Product;
                    var id = value.Product;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id });
                        cnt++;
                    }
                    return matcher.test(id);
                });
                response(obj);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                this.value = ui.item.value;
                selectedId = "";// Indicate a valid selection
                selectedId = ui.item.id;
                $(event.target).siblings('span').addClass('hide'); // Hide error messages if any
                return false;
            },
            close: function (event) {
                var inputValue = $(event.target).val();
                // If no valid project is selected, clear the input and show an error
                if (selectedId === "" || inputValue == "") {
                    $(event.target).val("");
                    // Clear the input
                    $(".HideForNew").addClass('hide');
                    $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) {
                        $(this).addClass('hide');
                        next();
                    });
                } else {
                    $(event.target).val(inputValue);
                    if ($("#ProjectId").val() != "") {
                        GetProjectInfo();
                    }
                    else {
                        $(".HideForNew").addClass('hide');
                    }
                }
            },
            change: function (event, ui) {
                $(event.target).siblings('span').addClass('hide');
                var terms = this.value;
                var validResources = [];
                var invalidResources = [];
                if (terms.length > 0) {
                    if (terms != null && terms != "") {
                        var filteredResources = projectArray.filter(item => item.Product === terms);
                        if (filteredResources.length > 0) {
                            var value = filteredResources[0];
                            validResources.push(terms);
                        }
                        else {
                            invalidResources.push(terms);
                        }
                    }
                    if (validResources.length > 0) {
                        this.value = validResources.join(" ");
                    }

                    if (invalidResources.length > 0) {
                        $(event.target).val("");
                        $(event.target).siblings('.not-valid').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                }
            }
        });
}
$(document).on("click", "#refreshBtn", function () {
    $("#btnSave , #btnSubmit ,.HideForNew").addClass('hide');
    $("#ProjectId ,#HGHCodeValue").val('');
})
colmodels = [
    {
        name: 'Product',
        label: 'Product Name',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HUB',
        label: 'HUB',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Currency',
        label: 'Currency',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BusinessValue',
        label: 'Business Value(Y2 Qty*Proposed selling Price)',
        width: 170,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M1Quantity',
        label: 'M1 Quantity',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M2Quantity',
        label: 'M2 Quantity',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M3Quantity',
        label: 'M3 Quantity',
        width: 80,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M4Quantity',
        label: 'M4 Quantity',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M5Quantity',
        label: 'M5 Quantity',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M6Quantity',
        label: 'M6 Quantity',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y1Quantity',
        label: 'Y1 Quantity',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y2Quantity',
        label: 'Y2 Quantity',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y3Quantity',
        label: 'Y3 Quantity',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UOM',
        label: 'UOM',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },
]
function CreateBusinessInfo(data) {
    $.jgrid.gridUnload('#BusinessValue');
    $("#BusinessValue").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_BusinessValue',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#BusinessValue tbody tr");
            var objHeader = $("#BusinessValue tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#BusinessValue").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 210px)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}

function GetProjectInfo() {
    var project = $("#ProjectId").val();
    var projId = project != "" ? project.split(' - ')[0] : "";
    var projname = project !== "" ? project.split(' - ').slice(1).join(' - ') : "";
    $(".HideForNew").removeClass("hide");
    $("#HGHCodeValue").val("");
    $.ajax({
        url: ROOT + "HGH/HGH_GetProjectInfo",
        type: "POST",
        data: { ProjectId: projId, HGHId: HGHId, ProjectName: projname },
        dataType: "json",
        success: function (result) {
            if (result) {
                var ProjectDetails = JSON.parse(result.ProjectDetails);
                var BusinessInfo = JSON.parse(result.BusinessInfo);
                ExsistingHGHCode = JSON.parse(result.ExsistingHGHCode);

                if (ProjectDetails.length != 0) {
                    CreateProjectDetails(ProjectDetails);
                    CreateBusinessInfo(BusinessInfo);
                    IsPresent = result.IsPresent;
                    $("#HGHCodeValue").val(result.HGHCode);
                    IsPresent = result.IsPresent;
                    if (IsPresent != "0" && IsPresent != null && IsPresent != undefined) {
                        HGHId = IsPresent;
                    }

                    if (ExsistingHGHCode.map(m => m.ProjectId.trim()).includes(projId)) {
                        if (StatusId != 0) {
                            var code = ExsistingHGHCode.find(m => m.ProjectId.trim() == projId).HGHCode
                            CheckHGHResponse(code);
                        }
                    }
                    else {
                        $("#btnSave ,#btnSubmit").removeClass('hide')
                    }
                }
                else {
                    $(".HideForNew").addClass("hide");
                }
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}

function CreateProjectDetails(data) {
    $(".ProjectDetails_ProjectId").text(data[0].ProjectId);
    $(".ProjectDetails_ProjectName").text(data[0].Product);
    $(".ProjectDetails_Bucket").text(data[0].Bucket);
    $(".ProjectDetails_Hub").text(data[0].HUBNames);
    $(".ProjectDetails_StartDate").text(data[0].StartDate);
    $(".ProjectDetails_EndDate").text(data[0].EndDate);
    $(".ProjectDetails_CreatedDate").text(data[0].CreatedDate);
    $(".ProjectDetails_CreatedBy").text(data[0].CreatedBy);
    $(".ProjectDetails_ItemType").text(data[0].ItemType);
    $(".ProjectBriefId").text(data[0].ProjectBriefId);
    ProjectType = data[0].ProjectType;
    ProjectBriefStatus = data[0].ProjectBriefStatus;
    $("#HGHCodeValue").val(data[0].ProjectBriefStatus)
    if (data[0].ProjectBriefId == "" || data[0].ProjectBriefId == null || data[0].ProjectBriefId == undefined) {
        $(".GetBriefHistory, .GetProjectBriefPDF").addClass('hide');
    }
    else {
        $(".GetBriefHistory, .GetProjectBriefPDF").removeClass('hide');
    }
}

// Project Brief View
$(document).on("click", ".GetProjectBriefView", function () {
    var projectId = $(".ProjectBriefId").text();
    if (ProjectType == "3") {
        window.open(ROOT + 'ProjectBrief/EditPackagingInitiative' + '?q=' + Encrypt("projectId=" + projectId + "&Status=" + "View" + "&Page=" + "HGH"), '_blank');
    } else if (ProjectType == "2") {
        window.open(ROOT + 'ProjectBrief/NewEditReformulation' + '?q=' + Encrypt("projectId=" + projectId + "&Status=View" + "&StatusId=" + "" + "&Page=" + "HGH"), '_blank');
    }
    else if (ProjectType == "1") {
        window.open(ROOT + "ProjectBrief/EditNpd" + '?q=' + Encrypt("projectId=" + projectId + '&status=' + "" + '&icon=View' + "&Page=" + "HGH"), '_blank');
    }
});

// Project Brief Download
$(document).on("click", ".GetProjectBriefPDF", function () {
    var fd = new FormData();
    var ProjectId = $(".ProjectBriefId").text();
    var Status = ProjectBriefStatus;
    if (ProjectType == '1') {
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
    else if (ProjectType == '3') {

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
    else if (ProjectType == '2') {


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
});

// Project Brief History
$(document).on("click", ".GetBriefHistory", function () {
    var projectId = $(".ProjectBriefId").text();
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
})

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

$(document).on("keydown", "#HGHCodeValue", function (e) {
    var inputVal = $(this).val();
    if (["Backspace", "Delete", "Tab"].includes(e.key)) {
        return; // Allow these keys without restriction
    }
    // Allow only letters for the first 4 characters
    if (inputVal.length < 4 && !/[A-Za-z]/.test(e.key)) {
        e.preventDefault();
    }
    // Allow only '-' as the 5th character
    //else if (inputVal.length === 4 && e.key !== "-") {
    //    e.preventDefault();
    //}
    //// Allow only numbers for the last 6 characters
    //else if (inputVal.length > 4 && !/[0-9]/.test(e.key)) {
    //    e.preventDefault();
    //}
    //// Prevent input beyond 11 characters
    //else if (inputVal.length >= 11) {
    //    e.preventDefault();
    //}
})
var formData = new FormData();


$(document).on("click", "#btnSubmit, #btnSave", function () {
    var actionType = $(this).attr("id") === "btnSubmit" ? "Submit" : "Save";

    var HGHCode = $("#HGHCodeValue").val().trim();
    var Project = $("#ProjectId").val().trim();
    var ProjectId = $(".ProjectDetails_ProjectId").text();

    // Validation
    var isValid = validateFields(HGHCode, Project, actionType);
    if (!isValid) return false;

    var HGHProjectId = ExsistingHGHCode.find(m => m.HGHCode.trim() === HGHCode)?.ProjectId;
    var ProjectIdwithDesc = projectArray.find(m => m.ProjectId === HGHProjectId)?.Product;

    if (!validateHGHCode(HGHCode)) {
        alert(`Entered HGH code <b> ${HGHCode}</b> is already mapped to the Project <b>${ProjectIdwithDesc}</b>`);
        return false;
    }

    showConfirmationModal(actionType, HGHCode, ProjectId);
});

// Function to Validate Fields
function validateFields(HGHCode, Project, actionType) {
    let isValid = true;

    if (actionType == "Submit") {
        if (!HGHCode) {
            $("#E_HGHCodeValue").removeClass('hide').text("Please enter HGH code");
            isValid = false;
        } else {
            $("#E_HGHCodeValue").addClass('hide');
        }
    }
    if (!Project) {
        $("#E_ProjectId").removeClass('hide');
        isValid = false;
    } else {
        $("#E_ProjectId").addClass('hide');
    }

    return isValid;
}

function showConfirmationModal(actionType, HGHCode, ProjectId) {
    $("#ApproveModal").modal('show');
    $("#ModalLabel").text(`${actionType} Confirmation`);
    $(".modalmsg").text(`Are you sure you want to ${actionType.toLowerCase()}?`);
    $(".hideforSave").toggleClass('hide', actionType === "Save");

    $("#ByClick_OK").off("click").on("click", function () {
        var Remarks = $("#ApprovalRemarks").val().trim();
        if (actionType == "Submit") {
            if (Remarks != "") {
                $(this).attr("disabled", true);
                submitHGHData(actionType, HGHCode, ProjectId, Remarks);
            }
            else {
                $("#E_ApprovalRemarks").show();
            }
        }
        else {
            $(this).attr("disabled", true);
            submitHGHData(actionType, HGHCode, ProjectId, Remarks);
        }
    });
}
function submitHGHData(actionType, HGHCode, ProjectId,Remarks) {
    var formData = new FormData();
    formData.append("Action", actionType);
    formData.append("HGHCode", HGHCode);
    formData.append("ProjectId", ProjectId);
    formData.append("HGHId", HGHId);
    formData.append("Remarks", Remarks);

    $.ajax({
        url: ROOT + "HGH/InsertHGHdata",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.toLowerCase().includes("success")) {
                window.location.href = ROOT + "HGH/HGHCodeList";
            } else {
                alert(result);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occurred: " + error);
        }
    });
}

$(document).on("keyup", "#HGHCodeValue", function () {
    $("#HGHCodeValue").val() == "" ? $("#E_HGHCodeValue").removeClass('hide') : $("#E_HGHCodeValue").addClass('hide');
    $("#ProjectId").val() == "" ? $("#E_ProjectId").removeClass('hide') : $("#E_ProjectId").addClass('hide');
})
$(document).on("change", "#HGHCodeValue", function () {
    var inputVal = $(this).val();
    var regex = /^[A-Za-z]{4}.*$/;

    if (!regex.test(inputVal)) {
        $("#E_HGHCodeValue").removeClass('hide').text("Please enter in AAAA-000000 format.");
        $(this).val("");
    }
    else {
        $("#E_HGHCodeValue").addClass('hide').text("Please enter hgh code.");
    }
})
$(document).on("change", "#ProjectId", function () {
    var inputVal = $(this).val();
    if (inputVal == "") {
        $(".HideForNew").addClass('hide');
    }
});
function CheckHGHResponse(code) {
    var Project = $("#ProjectId").val();
    $("#ConfoModal").modal('show');
    $("#Confirmation").text("Update Confirmation");
    $(".ConfoMsg").html("For the selected project <b>" + Project + "</b> the HGH code - <b> " + code + '</b>' + " is already created, Still do you want to update the HGH Code?");
    $("#HGHCodeValue").val(code);
}
$("#Click_ConfoOk").click(function () {
    $("#ConfoModal").removeClass('show')
    $(".modal-backdrop").removeClass('show')
    $("#btnSubmit").removeClass('hide');
});
$("#Click_ConfoCancel").click(function () {
    $("#ConfoModal").removeClass('show')
    $(".modal-backdrop").removeClass('show');
    $("#btnSave ,#btnSubmit").addClass('hide');
});

function validateHGHCode(HGHCode) {
    var ProjectId = $(".ProjectDetails_ProjectId").text();
    if (ExsistingHGHCode.some(m => m.HGHCode.trim() === HGHCode && m.ProjectId === ProjectId && StatusId == 0)) {
        return true;
    }
    else if (ExsistingHGHCode.some(m => m.HGHCode.trim() === HGHCode && StatusId != 0)) {
        return false;
    }
    else {
        return true;
    }
}
$(window).on('hidden.bs.modal', function () {
    $("#ApprovalRemarks").val('');
    $("#E_ApprovalRemarks").hide();
});
$("#ApprovalRemarks").on("keydown", function () {
    var remarks = $(this).val().trim();
    if (remarks != "") {
        $("#E_ApprovalRemarks").hide();
    }
    else {
        $("#E_ApprovalRemarks").show();
    }
});
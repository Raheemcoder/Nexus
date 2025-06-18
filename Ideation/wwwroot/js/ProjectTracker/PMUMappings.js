var autocompleteDrodownArray = [];
var from;
var to;

var selectedWBSHeaderId = 0;
var selectedTaskId = 0;
var selectedResourcesId = 0;
var selectedWBSHeader = '';
var selectedTask = '';
var documentDetails = [];
var remarksDetails = [];
var deletedDocumentsArray = [];

var isSavable = 1;

var childTasks = [];

var KPIarray = [];
var task_checkkpiarray = [];

var dependencyDependentArray = [];

var isDatesNotModified = true;
var isPMUMappingNotModified = true;

var lastSelectedProject = "";
var lastSelectedHub = "";
var lastSelectedVersion = "";

var kpi_version = "";
var kpi_versionGroup = "";
var kpi_islatest = "";

var remarkscolmodels = [
    {
        name: 'Notes',
        label: 'Notes',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'UpdatedBy',
        label: 'Updated By',
        width: 40,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'UpdatedOn',
        label: 'Updated On',
        width: 40,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd/m/Y' }
    }
];
var notesData = [];

// this variable will get updated every time on AjaxToCheckConditions function
var isScopeChanged = 0;
var isCloneAccepted = 0;
var NextVersion = "";
var NextVersionGroup = "";

var isCloneAcceptedForProject = 0;

var endDateExtReqTasksArr = [];

var versionChangeConfirmed = 0;
var alreadySavedKPIFlag = "";
var alreadySavedWeekendFlag = "";


/*
    ***********Note***************

    1. Version Name will be unique so there is not problem in considering version group
    2. For Clone we are not considering the cloned project IsKpi flag
    3. Not using global variable for Kpi, weekend, version values, because everytime it might change
    4. currentWorkingVersion ---- Maintaning the flag since for version change ( will be set in partial view so every time it will change )
                                    (It will be keep on changing in all the action like version change, save......)
    5. currentSavedLatestVersionGroup,currentSavedLatestVersion ---- Last saved version and version group 
                                                                    ( will be set in partial view so every time it will change )
    6. Project Id & Hub is always taken from fields, because everytime it might change
    7. don't use global variable since conditionally passing the version & version group
    8. isPMUMappingNotModified --- flag variables for Pmumapping change
       isDatesNotModified   --- flag variables for Pmumapping date change
    9. latestversion on scope change will be "" since it is consider as new project so no version
    10. Don't Use common variable dateFromat (since facing date picker issues).

*/

$(document).ready(function () {

    $('.select2-hidden-accessible').each(function () {
        $(this).select2({
            dropdownParent: $(this).parent()
        });
    });

    $("#btnRemarks").hide();
    $("#cloneModal").modal("hide");
    $("#DisplayVersionRemarks").hide();

    setInterval(() => {
        // version should not be created
        if ($("#currentWorkingVersion").val() == "" || $("#currentWorkingVersion").val() == null) {
            PMUAutoValidate();
        }
        $("#loader").css("visibility", "hidden");
    }, 5 * 60 * 1000);

    $.ajax({
        url: ROOT + 'ProjectTracker/DropdownList',
        type: 'POST',
        async: false,
        dataType: 'JSON',
        success: function (result) {
            autocompleteDrodownArray = result;
            getTaskGrid();
        }
    });

    if ($('#selectedProjectId').val() === null || $('#selectedProjectId').val() === '' ||
        typeof ($('#selectedProjectId').val()) === "undefined" || $('#selectedProjectId').val() === '0') {
        $('.projectName_error').text('Please select the Project');

        $(".template-div").hide();
        $(".version-div").hide();
        $(".weekend-switching-div").hide();
        $(".weekend-selected-span").hide();
        $(".kpi-selected").hide();
        $(".kpi-selected-span").hide();
        $("#save-template").hide();
        $("#btn-save").hide();
        $("#btn-approve").hide();
        $('#btn-clone').hide();
    }
    else {
        $('#ProjectId').val($('#selectedProjectId').val());
        $('.projectName_error').text('');

        lastSelectedProject = $('#selectedProjectId').val();
        GetHubList($('#selectedProjectId').val());
    }

    if ($('#selectedHubId').val() === null || $('#selectedHubId').val() === '' ||
        typeof ($('#selectedHubId').val()) === "undefined" || $('#selectedHubId').val() === '0') {
        $('.hubName_error').text('Please select HUB');

        $(".template-div").hide();
        $(".version-div").hide();
        $(".weekend-switching-div").hide();
        $(".weekend-selected-span").hide();
        $(".kpi-selected").hide();
        $(".kpi-selected-span").hide();
        $("#save-template").hide();
        $("#btn-save").hide();
        $("#btn-approve").hide();
        $('#btn-clone').hide();
    }
    else {
        $('#Hub').val($('#selectedHubId').val()).change();
        $('.hubName_error').text('');

        lastSelectedHub = $('#selectedHubId').val();
    }

    gettaskkpidata();

    if ($("#Version").val() == "Baseline") {
        SaveCriticalPathData("Baseline");
    }

    GenerateWBSheaderTaskAutosuggest();
    GetCriticalPath();

});

//---------------helper functions----------------
function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function getDate(element) {
    var date;
    try {
        date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
        date = null;
    }
    return date;
}
function isWeekend(date) {
    var day = date.getDay();
    return [0, 6].indexOf(day) === -1;
}
function EndDateExtensionAlter() {
    if (endDateExtReqTasksArr.length > 0) {

        isSavable = 0;
        GetPMUMappingData();
        var html = "<b><ul>";
        $.each(endDateExtReqTasksArr, function (i, obj) {
            html += "<li>" + obj.TaskDesc + "</li>"
        });
        html += "</ul></b>";
        if ($("#RevisedRequestData").val() == null || $("#RevisedRequestData").val() == undefined || $("#RevisedRequestData").val() == "") {
            alert("There is a end date request for the following Task(s). You cannot update the dates in the PMU Mapping page until you approve the tasks."
                + "</br>" + html);
        }
        else {
            isSavable = 1;
        }

    }
    else {
        isSavable = 1;
        GetPMUMappingData();
    }
}
function AjaxToCheckConditions() {

    //checking scope change is there or not ?
    $.ajax({
        url: ROOT + 'ProjectTracker/CheckForScopeChange',
        type: 'POST',
        async: false,
        data: {
            projectId: parseInt($('#ProjectId').val()),
            HubId: parseInt($('#Hub option:selected').val()),
        },
        dataType: 'JSON',
        success: function (result) {
            var obj = result[0];
            NextVersionGroup = obj.NextVersionGroup;
            NextVersion = obj.NextVersion;
            isScopeChanged = obj.IsScopeChanged;
            isCloneAccepted = obj.IsCloneAccepted;
        }
    });

    //checking any approval request is pending or not ?  
    $.ajax({
        url: ROOT + 'ProjectTracker/CheckForApproval',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            projectId: parseInt($('#ProjectId').val()),
            HubId: parseInt($('#Hub option:selected').val()),
        },
        success: function (result) {
            endDateExtReqTasksArr = result;
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

    if (isScopeChanged == 0) {

        EndDateExtensionAlter();

    }
    else if (isScopeChanged == 1 && isCloneAccepted == 0) {

        var msg = "The scope of the project got changed, Are you wishing to clone the latest version's project planning ?";

        if (endDateExtReqTasksArr.length > 0) {
            msg = `The scope of the project got changed, There are some end date extension requests which will be auto close.
            Are you wishing to clone the latest version's project planning ?`;
        }

        isSavable = 1;
        handelConfirmPopup(
            msg,
            function () {
                isCloneAcceptedForProject = 1;
                loadClonedProjectHubData(
                    parseInt($('#ProjectId').val()),
                    parseInt($('#Hub option:selected').val()),
                    $("#resource-req-scope-change").val(),
                    1, // auto clone flag
                    $('#ProjectId option:selected').text(),
                    $('#Hub option:selected').text()
                );
            },
            function () {
                isCloneAcceptedForProject = 1;
                loadClonedProjectHubData(
                    parseInt($('#ProjectId').val()),
                    parseInt($('#Hub option:selected').val()),
                    "0", // not required to consider for scope change No simply giving as Not required
                    1, // auto clone flag
                    $('#ProjectId option:selected').text(),
                    $('#Hub option:selected').text(),
                    1 // empty page load flag
                );
            },
            function () {
                RevertInitialPageStructure();
            },
        )

    }
    else if (isScopeChanged == 1 && isCloneAccepted != 0) {

        EndDateExtensionAlter();

    }

}
function GenerateWBSheaderTaskAutosuggest() {

    $("#new-wbsheader").autocomplete({
        source: function (request, response) {
            var filter_array = [];
            $.each(autocompleteDrodownArray.WBSHeader, function (i, obj) {
                if (obj.WBSHeaderDesc.toLowerCase().includes(request.term.trim().toLowerCase())) {
                    filter_array.push(obj.WBSHeaderDesc);
                }
            });
            response(filter_array)
        },
        minLength: 2
    });
    $("#new-task").autocomplete({
        source: function (request, response) {
            var filter_array = [];
            $.each(autocompleteDrodownArray.Task, function (i, obj) {
                if (obj.TaskDesc.toLowerCase().includes(request.term.trim().toLowerCase())) {
                    filter_array.push(obj.TaskDesc);
                }
            });
            response(filter_array)
        },
        minLength: 2
    });

}
function PMUAutoValidate() {

    var lastRowId = 0;

    $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
        var headerId = $(obj).attr('data-headerid');
        $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').each(function (detailsi, detailsobj) {
            var detailslno = parseInt($(detailsobj).find('[data-slno]').attr('data-slno'));
            lastRowId = detailslno;
        });
    });

    var slNoToAlert = [];
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
        if (i < lastRowId) {
            var count = 0;
            var slNo = parseInt($(obj).find('[data-slno]').attr('data-slno'));
            var wbsheader = $('#row_' + slNo).find('[data-wbsheader]').val();
            if (wbsheader === null || wbsheader === '' || typeof (wbsheader) === "undefined") {
                count++
            }
            var task = $('#row_' + slNo).find('[data-task]').val();
            if (task === null || task === '' || typeof (task) === "undefined") {
                count++
            }
            if (count == 2) {
                slNoToAlert.push(slNo);
            }
        }
    });

    if (slNoToAlert.length == 0) {

        PMUMappingDataCompare(2);
        if (!isPMUMappingNotModified) {
            PMUAutosubmit();
        }

    }
}
function PMUAutosubmit() {

    var formData = new FormData();
    var pmuMappingsArray = [];

    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {

        var wbsHeader = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
        var headerid = $(obj).attr('data-headerid');
        var task = $(obj).find('[data-task]').attr('data-task');
        var dependency = $(obj).find('[data-dependency]').val();
        var duration = $(obj).find('[data-duration]').val();
        var startdate = $(obj).find('[data-startdate]').val();
        var enddate = $(obj).find('[data-enddate]').val();
        var percentage = $(obj).find('[data-percentage]').val() !== null
            && $(obj).find('[data-percentage]').val() !== ''
            && typeof ($(obj).find('[data-percentage]').val()) !== "undefined" ? parseFloat($(obj).find('[data-percentage]').val()) : 0;
        var resources = $(obj).find('[data-resources]').val();
        var remarks = $(obj).find('[data-remarks]').val();
        var projectId = $('#ProjectId').val();
        var rowNo = $(obj).find('[data-slno]').attr('data-slno');
        var files = $(obj).find("[data-files]")[0].files;
        var relationId = $(obj).attr('data-relationid');
        var milestonestatus = $(obj).attr('data-milestonestatus');
        var resourcesArray = [];

        if (resources !== null && resources !== '' && typeof (resources) !== "undefined") {
            $.each(resources.split(","), function (i, obj) {
                var resourceSplit = obj.split("-");
                if (resourceSplit.length > 1) {
                    var objIndex = autocompleteDrodownArray.Resources.findIndex(function (o) { return o.UserName === resourceSplit[1].replace(" ", "") });
                    if (objIndex >= 0) {
                        var resource = {
                            ProjectId: parseInt(projectId),
                            RowNum: parseInt(rowNo),
                            ResourceName: resourceSplit[1].replace(" ", "")
                        }
                        resourcesArray.push(resource);
                    }
                }
            });
        }

        if (headerid !== null && headerid !== '' && typeof (headerid) !== "undefined" &&
            wbsHeader !== null && wbsHeader !== '' && typeof (wbsHeader) !== "undefined"
        ) {

            // to handel documents
            $.each(files, function (fileIndex, file) {
                if (file.size > 0) {
                    var timestamp = moment().valueOf();
                    formData.append(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp, file);
                    var extension = file.name.split(".").pop();

                    var document = {
                        SlNo: parseInt(rowNo),
                        WBSHeader: parseInt(wbsHeader),
                        Task: 0,
                        ProjectId: parseInt(projectId),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " "),
                        SubmittedBy: "",
                        SubmittedOn: ""
                    };
                    documentDetails.push(document);
                }
            });

            // to handel remarks
            if (remarks != "" && remarks != null && remarks != undefined) {
                var remark = {
                    SlNo: parseInt(rowNo),
                    WBSHeader: parseInt(wbsHeader),
                    Task: 0,
                    ProjectId: parseInt(projectId),
                    RemarkDesc: remarks,
                    SubmittedBy: "",
                    SubmittedOn: ""
                };
                remarksDetails.push(remark);
            }

            // to handel PMUmappings
            var pmuMappings = {
                WBSHeader: parseInt(wbsHeader),
                Task: 0,
                RelationId: 0,
                Dependency: dependency,
                Duration: parseInt(duration),
                StartDate: startdate == "" ? '' : moment(startdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                EndDate: enddate == "" ? '' : moment(enddate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                Percentage: parseFloat(percentage),
                Resources: resources,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                DependencyArray: [],
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                VersionRemarks: $('#VersionRemarks').val()
            }

            pmuMappingsArray.push(pmuMappings);

        }

        if (relationId !== null && relationId !== '' && typeof (relationId) !== "undefined" &&
            task !== null && task !== '' && typeof (task) !== "undefined"
        ) {

            // to documents
            $.each(files, function (fileIndex, file) {
                if (file.size > 0) {
                    var timestamp = moment().valueOf();
                    formData.append(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp, file);
                    var extension = file.name.split(".").pop();

                    var document = {
                        SlNo: parseInt(rowNo),
                        WBSHeader: 0,
                        Task: parseInt(task),
                        ProjectId: parseInt(projectId),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " "),
                        SubmittedBy: "",
                        SubmittedOn: ""
                    };
                    documentDetails.push(document);
                }
            });

            // to handel remarks
            if (remarks != "" && remarks != null && remarks != undefined) {
                var remark = {
                    SlNo: parseInt(rowNo),
                    WBSHeader: 0,
                    Task: parseInt(task),
                    ProjectId: parseInt(projectId),
                    RemarkDesc: remarks,
                    SubmittedBy: "",
                    SubmittedOn: ""
                };
                remarksDetails.push(remark);
            }

            // to dependency
            var dependencyArray = [];
            if (dependency !== null && dependency !== '' && typeof (dependency) !== "undefined") {
                $.each(dependency.split(","), function (depedencyIndex, dependencyObj) {
                    var index = dependencyObj.indexOf('F') > -1 ? dependencyObj.indexOf('F') : dependencyObj.indexOf('S');
                    var dependentRow = dependencyObj.substr(0, index);
                    var dependencyType = dependencyObj.substr(index, 2);
                    var operatorindex = dependencyObj.indexOf('+') > -1 ? dependencyObj.indexOf('+') : dependencyObj.indexOf('-');
                    var dependencyLeadOrLag = dependencyObj.substr(operatorindex, dependencyObj.length);
                    dependencyArray.push({
                        RowNum: parseInt(rowNo),
                        ProjectId: parseInt(projectId),
                        Depedency: parseInt(dependentRow),
                        DependencyType: dependencyType,
                        LeadOrLag: parseInt(dependencyLeadOrLag)
                    })
                })
            }

            // to handel PMUmappings
            var pmuMappings = {
                WBSHeader: 0,
                Task: parseInt(task),
                RelationId: parseInt(relationId),
                Dependency: dependency,
                Duration: parseInt(duration),
                StartDate: startdate == "" ? '' : moment(startdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                EndDate: enddate == "" ? '' : moment(enddate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                Percentage: parseFloat(percentage),
                Resources: resources,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                DependencyArray: dependencyArray,
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                VersionRemarks: $('#VersionRemarks').val()
            }

            pmuMappingsArray.push(pmuMappings);

        }

    });

    if (pmuMappingsArray.length > 0) {

        formData.append("ProjectId", $('#ProjectId').val());
        formData.append("HubId", parseInt($('#Hub option:selected').val()));

        formData.append("PMUMappings", JSON.stringify(pmuMappingsArray));
        formData.append("Documents", JSON.stringify(documentDetails));
        formData.append("Remarks", JSON.stringify(remarksDetails));

        formData.append("LatestVersion", "");
        formData.append("LatestVersionGroup", NextVersionGroup);

        formData.append("IsWeekendExcluded", $('#weekend-switching option:selected').val());
        formData.append("IsKPIIncluded", false);

        formData.append("IsCloneAcceptedForProject", isCloneAcceptedForProject);

        $.ajax({
            url: ROOT + 'ProjectTracker/AutoSavePMUMappings',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {

                $('#VersionRemarks').val('');
                $("#RemarkDetails").val('');
                $("#DocumentDetails").val('');
                remarksDetails = JSON.parse(response.Item2);
                documentDetails = JSON.parse(response.Item1);

                if (remarksDetails == null || remarksDetails == "" || remarksDetails == undefined) {
                    remarksDetails = [];
                }
                if (documentDetails == null || documentDetails == "" || documentDetails == undefined) {
                    documentDetails = [];
                }

                $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
                    if (!($(obj).find('[data-remarks]').val() === "")) {
                        $("#newRemarks_" + (i + 1)).css("display", "block");
                    }
                    if (!($(obj).find('[data-files]').val() === "")) {
                        $("#newDocuments_" + (i + 1)).css("display", "block");
                    }
                    if (!(documentDetails === null || documentDetails === '')) {
                        if (documentDetails.filter(function (no) { return no.SlNo === (i + 1) }).length = 0) {
                            $("#newDocuments_" + (i + 1)).css("display", "none");
                        }
                    }
                    $(obj).find('[data-remarks]').val("");
                    $(obj).find("[data-files]").val("");
                });

            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    }

}
function loadAutoCompleteDropdowns(result) {

    var dateFormat = "dd/mm/yy";
    $('.from').datepicker('destroy');
    $('.to').datepicker('destroy');

    if ($("#isWeekEndExclude").val() == "True") {
        from = $(".from")
            .datepicker({
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: 'dd/mm/yy',
                beforeShowDay: function (date) {
                    return [isWeekend(date), ''];
                }
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
            to = $(".to").datepicker({
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: 'dd/mm/yy',
                beforeShowDay: function (date) {
                    return [isWeekend(date), ''];
                }
            })
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });
    }
    else {
        from = $(".from")
            .datepicker({
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: 'dd/mm/yy',
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
            to = $(".to").datepicker({
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: 'dd/mm/yy',
            })
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });
    }

    $("[data-wbsheader]").autocomplete({

        minLength: 0,
        source: function (request, response) {
            selectedWBSHeaderId = 0;
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            var obj = [];
            var cnt = 0;
            var matching = $.grep(result.WBSHeader, function (value) {
                var name = value.WBSHeaderDesc;
                var id = value.WBSHeaderId;
                if (matcher.test(name) && cnt < 10) {
                    obj.push({ "value": name, "id": id })
                    cnt++
                }
                return matcher.test(id);
            });
            response(obj);
        },
        select: function (event, ui) {
            selectedWBSHeaderId = 0;
            $(event.target).attr('data-wbsheader', ui.item.id);
            selectedWBSHeaderId = parseInt(ui.item.id);

            $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');
            $(event.target).siblings('span').addClass('hide');
        },
        close: function (event, ui) {

            if ($(event.target).val() !== '' && $(event.target).val() !== null && typeof ($(event.target).val()) !== "undefined") {

                var inWBSHeaderArray = result.WBSHeader.filter(item => item.WBSHeaderDesc.toLowerCase() == $(event.target).val().toLowerCase()).length;

                if (selectedWBSHeaderId == 0 && inWBSHeaderArray == 0) {
                    $(event.target).val("");
                    $(event.target).attr('data-wbsheader', '');
                    $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                }
                else {
                    $(event.target).siblings('span').addClass('hide');

                    var rowId = $(event.target).closest('tr').attr('id');
                    var slno = $(event.target).parent().siblings('td[data-slno]').attr('data-slno');
                    var count = 0;
                    if (selectedWBSHeaderId == 0) {
                        selectedWBSHeaderId = autocompleteDrodownArray.WBSHeader.find(item => item.WBSHeaderDesc.toLowerCase() == $(event.target).val().toLowerCase()).WBSHeaderId;
                    }

                    selectedWBSHeader = autocompleteDrodownArray.WBSHeader
                        .filter(item => item.WBSHeaderId === selectedWBSHeaderId)
                        .map(item => item.WBSHeaderDesc);

                    $('#pmumapping').dataTable().$('[data-wbsheader]').each(function (i, obj) {
                        var objectrowId = $(obj).closest('tr').attr('id');
                        var wbsheaderId = $(obj).attr('data-wbsheader') == '0' ? -1 : $(obj).attr('data-wbsheader');
                        if (rowId != objectrowId) {
                            if (parseInt(wbsheaderId) === selectedWBSHeaderId) {
                                count++;
                            }
                        }
                    });

                    if (count > 0) {
                        $(event.target).val('');
                        $(event.target).attr('data-wbsheader', '');
                        $(event.target).siblings('.duplicate-data').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                    else {
                        $(event.target).siblings('span').addClass('hide');

                        var $tr = $(event.target).closest('tr');
                        $($tr).attr("data-headerid", slno);
                        $($tr).find('td [data-task]').attr('readonly', true);
                        $($tr).find('td [data-dependency]').attr('readonly', true);
                        $($tr).find('td [data-duration]').attr('readonly', true);
                        $($tr).find('td [data-percentage]').attr('readonly', true);
                        $($tr).find('[data-resources]').attr('readonly', true).attr('placeholder', '');
                        $($tr).find('td [data-startdate]').removeClass('from');
                        $($tr).find('td [data-startdate]').datepicker('destroy');
                        $($tr).find('td [data-enddate]').removeClass('to');
                        $($tr).find('td [data-enddate]').datepicker('destroy');
                        $($tr).find('td [data-startdate]').removeClass('hasDatepicker');
                        $($tr).find('td [data-enddate]').removeClass('hasDatepicker');
                        $($tr).find('[data-dependency]').siblings('i').addClass('hide');

                        $(event.target).val(selectedWBSHeader[0]);
                        $(event.target).attr('data-wbsheader', selectedWBSHeaderId);

                        var dependentRowArray = [];
                        var rowNo = slno;

                        $('#pmumapping').dataTable().$('[data-relationid]').each(function (i, obj) {

                            var depedency = $(obj).find('[data-dependency]').val();
                            var newDepedencyArray = [];

                            if (depedency !== null && depedency !== '' && typeof (depedency) !== "undefined") {
                                $.each(depedency.split(","), function (dependentIndex, dependentObj) {
                                    var index = dependentObj.indexOf('F') > -1 ? dependentObj.indexOf('F') : dependentObj.indexOf('S');
                                    var dependentRow = dependentObj.substr(0, index);
                                    if (parseInt(dependentRow) !== parseInt(rowNo)) {
                                        var remainingString = dependentObj.substr(index, dependentObj.length);
                                        if (parseInt(dependentRow) > (rowNo + count - 1)) {
                                            var newString = (parseInt(dependentRow) - count) + remainingString;
                                            newDepedencyArray.push(newString);
                                        }
                                        else if (parseInt(dependentRow) !== parseInt(rowNo)) {
                                            newDepedencyArray.push(dependentObj);
                                        }
                                    }
                                    else {
                                        var objIndex = dependentRowArray.findIndex(function (o) { return parseInt(o) === parseInt($(obj).find('[data-slno]').attr('data-slno')) })
                                        if (objIndex == -1) {
                                            dependentRowArray.push(parseInt($(obj).find('[data-slno]').attr('data-slno')));
                                        }
                                    }
                                })
                                $(obj).find('[data-dependency]').val(newDepedencyArray.join(","));
                            }
                        })
                    }
                }
            }

            else {
                $(event.target).siblings('span').addClass('hide');

                var $tr = $(event.target).closest('tr');
                $($tr).find('[data-wbsheader]').attr('data-wbsheader', "");
                $($tr).removeAttr("data-headerid");
                $($tr).find('[data-task]').attr('readonly', false);
                $($tr).find('[data-dependency]').attr('readonly', false);
                $($tr).find('[data-duration]').attr('readonly', false);
                $($tr).find('[data-percentage]').attr('readonly', false);
                $($tr).find('[data-resources]').attr('readonly', false).attr('placeholder', 'Please select the Resources');
                $($tr).find('[data-startdate]').addClass('from');
                $($tr).find('[data-enddate]').addClass('to');
                $($tr).find('[data-dependency]').siblings('i').removeClass('hide');
            }

            smartSheetCalculation(0);

            $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');
        },
        change: function (event, ui) {

            $(event.target).siblings('span').addClass('hide');

            var $tr = $(event.target).closest('tr');
            $($tr).removeAttr("data-relationid");
            $($tr).find('.depndency').val('');

            $('#pmumapping').dataTable().$('[data-relationid]').each(function (i, obj) {
                $($tr).find('[data-slno]').html();
                $($tr).find("[data-relationid]").html();
                var depedency = $(obj).find('[data-dependency]').val();
            });

            if ($(event.target).val() != "" && $(event.target).val() != null && $(event.target).val() != undefined) {
                var inWBSHeaderArray = result.WBSHeader.filter(item => item.WBSHeaderDesc.toLowerCase() == $(event.target).val().toLowerCase()).length;

                if (inWBSHeaderArray == 0) {
                    $(event.target).val('');
                    $(event.target).attr('data-wbsheader', '');
                    $(event.target).siblings('.not-valid-data').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    return false;
                } else {
                    $(event.target).siblings('span').addClass('hide');
                }
            }

            else if ($(event.target).val() === "") {
                var $tr = $(event.target).closest('tr');
                var headerSlNo = parseInt($($tr).find('[data-slno]').attr('data-slno'));

                $($tr).removeAttr("data-headerid");
                $($tr).find('[data-task]').attr('readonly', false);
                $($tr).find('[data-dependency]').attr('readonly', false);
                $($tr).find('[data-dependency]').siblings('i').removeClass('hide');
                $($tr).find('[data-duration]').attr('readonly', false);
                $($tr).find('[data-percentage]').attr('readonly', false);
                $($tr).find('[data-resources]').attr('readonly', false).attr('placeholder', 'Please select the Resources');
                $($tr).find('[data-startdate]').addClass('from');
                $($tr).find('[data-enddate]').addClass('to');

                $($tr).find('[data-task]').val('');
                $($tr).find('[data-dependency]').val('');
                $($tr).find('[data-duration]').val('');
                $($tr).find('[data-percentage]').val('');
                $($tr).find('[data-resources]').val('');
                $($tr).find('[data-startdate]').val('');
                $($tr).find('[data-enddate]').val('');

                var dateFormat = "dd/mm/yy",
                    from = $(".from")
                        .datepicker({
                            changeMonth: true,
                            numberOfMonths: 1,
                            dateFormat: 'dd/mm/yy',
                        })
                        .on("change", function () {
                            to.datepicker("option", "minDate", getDate(this));
                        }),
                    to = $(".to").datepicker({
                        changeMonth: true,
                        numberOfMonths: 1,
                        dateFormat: 'dd/mm/yy',
                    })
                        .on("change", function () {
                            from.datepicker("option", "maxDate", getDate(this));
                        });

                $($tr).find('[data-remarks]').val('');
                $($tr).find('[data-files]').val('');
                $($tr).find('[data-remarks]').siblings('i').addClass('hide');
                $($tr).find('[data-files]').siblings('i').addClass('hide');
                $($tr).find('[data-percentage]').siblings('span').css('width', '0%');

                documentDetails = documentDetails.filter(function (o) {
                    return o.SlNo != headerSlNo;
                });
                remarksDetails = remarksDetails.filter(function (o) {
                    return o.SlNo != headerSlNo;
                });

            }

            smartSheetCalculation(0);

            $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');
        },

    });

    $("[data-task]").autocomplete({

        minLength: 0,
        source: function (request, response) {
            selectedTaskId = 0;
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            var obj = [];
            var cnt = 0;
            var matching = $.grep(result.Task, function (value) {
                var name = value.TaskDesc;
                var id = value.TaskId;
                var kpi = value.IsKPI;
                var yesnokpi = parseInt($("#YesOrNoKPI").val()) === 1 ? true : false;

                if (matcher.test(name) && cnt < 10) {
                    var item = {
                        "value": name,
                        "id": id,
                        "kpi": kpi,
                        "yesorno": yesnokpi,
                    };
                    obj.push({ "value": name, "id": id, "kpi": kpi, "yesnokpi": yesnokpi })
                    cnt++
                }
                return matcher.test(id);
            });
            response(obj);
        },
        focus: function () {
            return false;
        },
        select: function (event, ui) {
            selectedTaskId = 0;
            $(event.target).attr('data-task', ui.item.id);
            if (ui.item.kpi === true && ui.item.yesnokpi === true) {
                $(event.target).addClass("color-red");
            }
            else {
                $(event.target).removeClass("color-red");
            }
            selectedTaskId = parseInt(ui.item.id);
            var index = task_checkkpiarray.findIndex(function (obj) { return obj.Task == ui.item.id; })
            index === -1 ? task_checkkpiarray.push({ "Task": ui.item.id, "IsKPI": ui.item.kpi }) : "";

            $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');
            $(event.target).siblings('span').addClass('hide');
        },
        close: function (event, ui) {

            if ($(event.target).val() !== '' && $(event.target).val() !== null && typeof ($(event.target).val()) !== "undefined") {

                var inTaskArray = result.Task.filter(item => item.TaskDesc.toLowerCase() == $(event.target).val().toLowerCase()).length;

                if (selectedTaskId === 0 && inTaskArray == 0) {
                    $(event.target).val("");
                    $(event.target).attr('data-task', '');
                    $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                }
                else {
                    $(event.target).siblings('span').addClass('hide');

                    var rowId = $(event.target).closest('tr').attr('id');

                    if ($('#pmumapping').dataTable().$('[data-headerid]').length === 0) {
                        $(event.target).val("");
                        $(event.target).attr("data-task", "");
                        alert("There is no parent mapped to the child");
                    }
                    else {
                        var count = 0;
                        if (selectedTaskId == 0) {
                            selectedTaskId = autocompleteDrodownArray.Task.find(item => item.TaskDesc.toLowerCase() == $(event.target).val().toLowerCase()).TaskId;
                        }

                        selectedTask = autocompleteDrodownArray.Task
                            .filter(item => item.TaskId === selectedTaskId)
                            .map(item => item.TaskDesc);

                        var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
                        var parentRowIds = [];
                        var maxParentRowNo = 0;
                        if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
                            var headerTr
                            $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
                                var parentRowNo = parseInt($(obj).attr('data-headerid'));
                                if (parentRowNo < slno) {
                                    headerTr = obj;
                                }
                                else {
                                    return false;
                                }
                            });
                            maxParentRowNo = $(headerTr).attr('data-headerid');
                            $(this).closest('tr').attr("data-relationid", maxParentRowNo);
                        }

                        $('#pmumapping').dataTable().$('[data-relationid]').each(function (i, obj) {
                            var objectrowId = $(obj).attr('id');
                            var taskId = $(obj).find('td [data-task]').attr('data-task');
                            if (rowId != objectrowId) {
                                if (parseInt(taskId) === selectedTaskId) {
                                    count++;
                                }
                            }
                        });

                        if (count > 0) {
                            $(event.target).val("");
                            $(event.target).attr("data-task", "");
                            $(event.target).closest('tr').find("[data-wbsheader]").attr('readonly', false);
                            var $tr = $(event.target).closest('tr');
                            $($tr).removeAttr("data-relationid");
                            $(event.target).siblings('.duplicate-data').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                        }
                        else {

                            $(event.target).val(selectedTask[0]);
                            $(event.target).attr("data-task", selectedTaskId);
                            $(event.target).closest('tr').find("[data-wbsheader]").attr('readonly', true);
                        }
                    }
                }

            }

            else {
                $(event.target).siblings('span').addClass('hide');

                var $tr = $(event.target).closest('tr');
                $($tr).find('[data-wbsheader]').attr('readonly', false);
                $($tr).find('[data-task]').attr('data-task', "");
                $($tr).removeAttr("data-relationid");
            }

            smartSheetCalculation(0);

            $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');
        },
        change: function (event, ui) {
            $(event.target).siblings('span').addClass('hide');

            var $tr = $(event.target).closest('tr');
            $($tr).removeAttr("data-headerid");

            if ($(event.target).val() != "" && $(event.target).val() != null && $(event.target).val() != undefined) {

                var inTaskArray = result.Task.filter(item => item.TaskDesc.toLowerCase() == $(event.target).val().toLowerCase()).length;

                if (inTaskArray == 0) {
                    $(event.target).val("");
                    $(event.target).attr('data-task', '');
                    $(event.target).siblings('.not-valid-data').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    return false;
                }
                else {
                    $(event.target).siblings('span').addClass('hide');
                }

                if (ui.item.kpi === true && ui.item.yesnokpi == true) {
                    $(event.target).addClass("color-red");
                } else {
                    $(event.target).removeClass("color-red");
                }
            }

            else if ($(event.target).val() === "") {

                var $tr = $(event.target).closest('tr');
                var taskSlNo = parseInt($($tr).find('[data-slno]').attr('data-slno'));

                $($tr).find('[data-wbsheader]').attr('readonly', false);
                $($tr).find('[data-task]').attr('data-task', "");

                $($tr).find('[data-task]').val('');
                $($tr).find('[data-dependency]').val('');
                $($tr).find('[data-duration]').val('');
                $($tr).find('[data-percentage]').val('');
                $($tr).find('[data-resources]').val('');
                $($tr).find('[data-startdate]').val('');
                $($tr).find('[data-enddate]').val('');

                $($tr).find('[data-remarks]').val('');
                $($tr).find('[data-files]').val('');
                $($tr).find('[data-remarks]').siblings('i').addClass('hide');
                $($tr).find('[data-files]').siblings('i').addClass('hide');
                $($tr).find('[data-percentage]').siblings('span').css('width', '0%');

                documentDetails = documentDetails.filter(function (o) {
                    return o.SlNo != taskSlNo;
                });
                remarksDetails = remarksDetails.filter(function (o) {
                    return o.SlNo != taskSlNo;
                });

                $($tr).find('[data-duration]').siblings('span').addClass('hide');
                $($tr).find('[data-resources]').siblings('span').addClass('hide');
                $($tr).find('[data-startdate]').siblings('span').addClass('hide');
                $($tr).find('[data-enddate]').siblings('span').addClass('hide');
            }

            $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');

        }

    });

    $("[data-resources]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                selectedResourcesId = 0;
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                var obj = [];
                var cnt = 0;
                var matching = $.grep(result.Resources, function (value) {
                    var name = value.EmployeeName + " - " + value.UserName;
                    var id = value.EmployeeName + " - " + value.UserName;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id })
                        cnt++
                    }
                    return matcher.test(id);
                });
                response(obj);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {

                var $currentTr = $(event.target).closest('tr');
                var task = $($currentTr).find('[data-task]').val();

                if (task === null || task === '' || typeof (task) === "undefined") {
                    $($currentTr).find('[data-resources]').val('');
                    $(event.target).siblings('span').addClass('hide');
                    $($currentTr).find('[data-task]').siblings('span:first').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });

                    selectedResourcesId = 2;
                    return false;
                }
                else {
                    $($currentTr).find('[data-task]').siblings('span:first').addClass('hide');
                }

                var terms = split(this.value);
                terms.pop();
                var selectedTerm = ui.item.value;
                if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                    selectedResourcesId = 2;
                    terms.push("");
                    this.value = terms.join(", ");
                    $(event.target).siblings('.duplicate-data').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                }
                else {
                    selectedResourcesId = 1;
                    terms.push(selectedTerm);
                    terms.push("");
                    this.value = terms.join(", ");
                }

                $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');
                return false;
            },
            close: function (event, ui) {

                if (
                    ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined")
                ) {
                    if (selectedResourcesId === 0 && $(event.target).val().trim() != "") {
                        var inputValue = $(event.target).val();
                        var parts = inputValue.split(',');
                        parts.pop();
                        parts.push("");
                        var result = parts.join(", ");
                        $(event.target).val(result);
                        $(event.target).attr('data-resources', '');
                        $(event.target).siblings('span').addClass('hide');
                        $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                    else if (selectedResourcesId === 1) {
                        $(event.target).siblings('span').addClass('hide');
                    }
                }

                $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');
            },
            change: function (event, ui) {

                var terms = split(this.value);
                var validResources = [];
                var invalidResources = [];
                if (terms.length > 0) {
                    terms.forEach(function (resource) {
                        if (resource != null && resource != "") {
                            var resourceName = resource.split('-')[0].trim().toLowerCase();
                            var filteredResources = result.Resources.filter(item => item.EmployeeName.toLowerCase().trim() === resourceName);

                            if (filteredResources.length > 0) {
                                var value = filteredResources[0];
                                validResources.push(value.EmployeeName + " - " + value.UserName);
                            }
                            else {
                                invalidResources.push(resource);
                            }
                        }
                    });

                    if (validResources.length > 0) {
                        validResources.push("");
                        this.value = validResources.join(", ");
                        $(event.target).siblings('span').addClass('hide');
                    }

                    if (invalidResources.length > 0) {
                        alert("<strong>" + invalidResources.toString() + "</strong> is not a valid resource");
                    }
                }

                $(event.target).attr('title', $(event.target).val()).trigger('mouseleave').trigger('mouseenter');

            }
        });

}
function gettaskkpidata() {
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
        var task = $(obj).find('[data-task]').attr('data-task');
        if (!(task === "" || task === null || typeof (task) === "undefined")) {
            var index = task_checkkpiarray.findIndex(function (ob) { return parseInt(ob.Task) == parseInt(task); })
            var kpi_index = autocompleteDrodownArray.Task.findIndex(function (obj) { return parseInt(obj.TaskId) == parseInt(task) })
            index === -1 && kpi_index > -1 ? task_checkkpiarray.push({ "Task": task, "IsKPI": autocompleteDrodownArray.Task[kpi_index].IsKPI }) : "";
        }
    });
}
function deleteRow(e) {

    var $tr = $(e).closest('tr');
    var rowNo = [];
    rowNo.push(parseInt($($tr).find('[data-slno]').attr('data-slno')));
    var isHeader = $($tr).attr('data-headerid') !== null && $($tr).attr('data-headerid') !== '' && typeof ($($tr).attr('data-headerid')) !== "undefined" ? true : false;
    var id = $($tr).attr('data-headerid');
    var message = isHeader ? "Are you sure, Do you want to delete this header and dependent tasks?" : "Are you sure, Do you want to delete this task and it's dependencies will be cleared?";
    var count = 1;
    childTasks = [];
    confirm(message, function () {

        if ($.fn.DataTable.isDataTable('#pmumapping')) {
            $('#pmumapping').dataTable().fnDestroy();
        }

        $($tr).remove();

        var relationId = 0
        if (!isHeader) {
            relationId = ($($tr).attr('data-relationid') !== null && $($tr).attr('data-relationid') !== ''
                && typeof ($($tr).attr('data-relationid')) !== "undefined") ? parseInt($($tr).attr('data-relationid')) : 0;
        }
        else {
            $('tr[data-relationid="' + id + '"]').each(function (i, obj) {
                childTasks.push(parseInt($(obj).find('[data-slno]').attr('data-slno')))
                rowNo.push(parseInt($(obj).find('td[data-slno]').attr('data-slno')));
                $(obj).remove();
                count++;
            })
        }
        var tableLength = $('#pmumapping tbody tr').length;
        initializeDataTable(tableLength);
        $('#pmumapping').dataTable().$('td[data-slno]').each(function (i, obj) {
            var tr = $(obj).closest('tr');
            $(tr).attr('id', 'row_' + (i + 1));
            $(tr).find('td[data-slno]').attr('data-slno', (i + 1));
            $(tr).find('[data-files]').attr('name', "files_" + (i + 1));
            $(tr).find('td[data-slno]').text((i + 1));
        })
        $('#pmumapping').dataTable().$('tr[data-headerid]').each(function (i, obj) {
            var headerid = $(obj).attr('data-headerid');
            var slno = $(obj).find('td[data-slno]').attr('data-slno');
            if (parseInt(headerid) !== parseInt(slno)) {
                $(obj).attr('data-headerid', slno);
                $('#pmumapping').dataTable().$('tr[data-relationid="' + headerid + '"]').each(function (j, child) {
                    $(child).attr('data-relationid', slno);
                })
            }
        })

        ManipulateFilesRemarksArray("2", rowNo, childTasks);
        var dependentRowArray = [];
        $('#pmumapping').dataTable().$('[data-relationid]').each(function (i, obj) {

            var depedency = $(obj).find('[data-dependency]').val();
            var newDepedencyArray = [];
            if (depedency !== null && depedency !== '' && typeof (depedency) !== "undefined") {
                $.each(depedency.split(","), function (dependentIndex, dependentObj) {
                    var index = dependentObj.indexOf('F') > -1 ? dependentObj.indexOf('F') : dependentObj.indexOf('S');
                    var dependentRow = parseInt(dependentObj.substr(0, index));

                    if (!rowNo.includes(dependentRow)) {
                        var remainingString = dependentObj.substr(index, dependentObj.length);
                        if (dependentRow > (rowNo[0] + count - 1)) {
                            var newString = (dependentRow - count) + remainingString;
                            newDepedencyArray.push(newString);
                        }
                        else if (!rowNo.includes(dependentRow)) {
                            newDepedencyArray.push(dependentObj);
                        }
                    }
                    else {
                        var objIndex = dependentRowArray.findIndex(function (o) { return parseInt(o) === parseInt($(obj).find('[data-slno]').attr('data-slno')) })
                        if (objIndex == -1) {
                            dependentRowArray.push(parseInt($(obj).find('[data-slno]').attr('data-slno')));
                        }
                    }
                });
                $(obj).find('[data-dependency]').val(newDepedencyArray.join(","));
            }

        })

        smartSheetCalculation(relationId, 1, dependentRowArray, "deleterow");

        var rowToMove = rowNo[0] > 7 ? rowNo[0] - 4 : rowNo[0];

        if (rowToMove > 7)
            document.getElementById("row_" + rowToMove).scrollIntoView({ behavior: 'smooth' });
    });
}
function addRow(e) {

    var $td = $(e).closest('td').siblings('td[data-slno]');
    var rowNo = parseInt($($td).attr('data-slno'));
    if ($.fn.DataTable.isDataTable('#pmumapping')) {
        $('#pmumapping').dataTable().fnDestroy();
    }
    var newTr =
        '<tr id="row_' + (rowNo + 1) + '" data-milestonestatus="Not Started">' +
        '<td data-slno="' + (rowNo + 1) + '">' + (rowNo + 1) + '</td>' +
        '<td data-slack=""></td>' +
        '<td><div class="action_width"><a  class="plus_icon mr-2" onclick="addRow(this)"><i class="fas fa-plus" title="Add Row"></i></a><a class="trash_icon" onclick="deleteRow(this)"><i class="fas fa-trash" title="Delete Row"></i></a></div></td>' +
        '<td class="taskheader_section"><input type="text" class="colwidth_250 form-control"  data-wbsheader="" placeholder="" title="" /><span class="text-danger hide">Please select WBS Header</span> <span class="text-danger hide duplicate-data">WBS Header cannot be duplicated</span> <span class="text-danger hide select-from-list">Please select WBS Header from the list</span> <span class="text-danger hide not-valid-data">Please select a valid WBS Header</span> </td>' +
        '<td class="taskheader_section"><input type="text" class="colwidth_250 form-control" data-task="" placeholder="" title="" /><span class="text-danger hide">Please select the Task</span> <span class="text-danger hide duplicate-data">Task cannot be duplicated</span> <span class="text-danger hide select-from-list">Please select Task from the list</span> <span class="text-danger hide not-valid-data">Please select a valid Task</span> </td>' +
        '<td><span class="d-flex align-items-center action_icons"><input data-dependency="" type="text" class="form-control depndency -uppercase" title="" /><i class="fas fa-pen color-info ml-2" role="button" title="Edit Predecessors" onclick="showDependency(this)"></i></span> </td>' +
        '<td><div class="duration"><input type="text" class="form-control text-right colwidth_50" data-duration="" title="" /> <span class="text-danger hide">Please enter the Duration</span></div></td>' +
        '<td><input type="text" class="form-control from" readonly data-startdate="" title="" /> <span class="text-danger hide">Please select the Start Date</span> </td>' +
        '<td><input type="text" class="form-control to" readonly data-enddate="" title="" /> </td>' +
        '<td>' +
        '<div class="percentage_list">' +
        '<input type="text" class="form-control text-right colwidth_60" data-percentage="" title="" />' +
        '<span class="w3-light-grey"><span class="w3-grey" style="width:0%"></span></span>' +
        '</div>' +
        '</td>' +
        '<td><input type="text" class="form-control colwidth_160" data-resources="" placeholder="Please select the Resources" /><span class="text-danger hide">Please select the Resources</span><span class="text-danger hide duplicate-data">Resource cannot be duplicated</span><span class="text-danger hide select-from-list">Please select Resource from the list</span> </td>' +
        '<td class="file_upload action_icons"><input type="file" class="form-control" name="files_' + (rowNo + 1) + '" data-files="" multiple /> </td>' +
        '<td class="input_width"><textarea class="form-control action_icons" data-remarks=""></textarea> </td>' +
        '</tr>';
    $('#row_' + rowNo).after(newTr);
    var tableLength = $('#pmumapping tbody tr').length;
    initializeDataTable(tableLength);
    $($('#row_' + (rowNo + 1)).find('[data-wbsheader]')).focus();
    $('#pmumapping').dataTable().$('td[data-slno]').each(function (i, obj) {
        var tr = $(obj).parent();
        $(tr).attr('id', 'row_' + (i + 1));
        $(tr).find('td[data-slno]').attr('data-slno', (i + 1));
        $(tr).find('[data-files]').attr('name', "files_" + (i + 1));
        $(tr).find('td[data-slno]').text((i + 1));
    })
    $('#pmumapping').dataTable().$('tr[data-headerid]').each(function (i, obj) {

        var headerid = $(obj).attr('data-headerid');
        var slno = $(obj).find('td[data-slno]').attr('data-slno');

        if (parseInt(headerid) !== parseInt(slno)) {
            $(obj).attr('data-headerid', slno);
            $('#pmumapping').dataTable().$('tr[data-relationid="' + headerid + '"]').each(function (j, child) {
                $(child).attr('data-relationid', slno);
            })
        }

    })
    $('#pmumapping').dataTable().$('[data-relationid]').each(function (relationi, relationobj) {
        var dependency = $(relationobj).find('[data-dependency]').val();
        var newDependencyArray = [];
        if (dependency !== null && dependency !== '' && typeof (dependency) !== "undefined") {
            $.each(dependency.split(","), function (dependentIndex, dependentObj) {
                var index = dependentObj.indexOf('F') > -1 ? dependentObj.indexOf('F') : dependentObj.indexOf('S');
                var dependentRow = dependentObj.substr(0, index);
                var remainingString = dependentObj.substr(index, dependentObj.length);
                if (parseInt(dependentRow) > parseInt(rowNo)) {
                    var newString = (parseInt(dependentRow) + 1) + remainingString;
                    newDependencyArray.push(newString);
                }
                else {
                    newDependencyArray.push(dependentObj);
                }
            })
            $(relationobj).find('[data-dependency]').val(newDependencyArray.join(","));
        }
    })
    ManipulateFilesRemarksArray("1", rowNo);
    loadAutoCompleteDropdowns(autocompleteDrodownArray)
    smartSheetCalculation(0);

}
function ManipulateFilesRemarksArray(Action, changedslNo, tasksToDelete) {

    //Action - 1 - add row
    //Action - 2 - delete row

    if (Action == "1") {
        for (var docindex = 0; docindex < documentDetails.length; docindex++) {
            if (documentDetails[docindex].SlNo > changedslNo) {
                documentDetails[docindex].SlNo = documentDetails[docindex].SlNo + 1;
            }
        }

        for (var remindex = 0; remindex < remarksDetails.length; remindex++) {
            if (remarksDetails[remindex].SlNo > changedslNo) {
                remarksDetails[remindex].SlNo = remarksDetails[remindex].SlNo + 1;
            }
        }
    }
    else if (Action == "2") {
        if (tasksToDelete.length > 0) {
            documentDetails = documentDetails.filter(function (o) {
                return !tasksToDelete.includes(o.SlNo);
            });
            remarksDetails = remarksDetails.filter(function (o) {
                return !tasksToDelete.includes(o.SlNo);
            });
        }
        else {
            documentDetails = documentDetails.filter(function (o) {
                return o.SlNo != changedslNo;
            });
            remarksDetails = remarksDetails.filter(function (o) {
                return o.SlNo != changedslNo;
            });
        }

        for (var docindex = 0; docindex < documentDetails.length; docindex++) {
            if (documentDetails[docindex].SlNo > changedslNo) {
                documentDetails[docindex].SlNo = documentDetails[docindex].SlNo - 1;
            }
        }

        for (var remindex = 0; remindex < remarksDetails.length; remindex++) {
            if (remarksDetails[remindex].SlNo > changedslNo) {
                remarksDetails[remindex].SlNo = remarksDetails[remindex].SlNo - 1;
            }
        }
    }
}
function initializeDataTable(length = 50) {

    $('#pmumapping').DataTable({
        ordering: false,
        orderCellsTop: true,
        fixedHeader: true,
        pageLength: length,
        scrollCollapse: true,
        paging: true,
    });

    $('#pmumapping_paginate').hide();

}
function smartSheetCalculation(relationId, isChanged = 0, dependentRows = [], requestFrom = "") {

    var startDateArray = []; var endDateArray = []; var percentageArray = [];
    var overAllPercentageArray = []; var overAllStartDateArray = []; var overAllEndDateArray = [];
    var data = []; var revisedData = []; requestedData = []; var dateParts; var date;

    // 1. Approval data value
    if ($("#RevisedRequestData").val() != null && $("#RevisedRequestData").val() != undefined && $("#RevisedRequestData").val() != "") {
        data = JSON.parse($("#RevisedRequestData").val());
        revisedData = data.Item1;
        requestedData = data.Item2;
    }

    // 2. Getting PMUMapping Task Details in array
    var PMUMappingData = [];
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
        var SlNo = $(obj).find('[data-slno]').attr('data-slno');
        var task = $(obj).find('[data-task]').attr('data-task');
        var WBSHeaderId = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
        var dependency = $(obj).find('[data-dependency]').val();
        if (task != "" && task != null && task != undefined && task != "0") {
            var pmuMappings = {
                SlNo: parseInt(SlNo),
                TaskId: task,
                Dependency: dependency,
                WBSHeaderId: 0
            }
            PMUMappingData.push(pmuMappings);
        }
        if (WBSHeaderId != "" && WBSHeaderId != null && WBSHeaderId != undefined && WBSHeaderId != "0") {
            var pmuMappings = {
                SlNo: parseInt(SlNo),
                TaskId: 0,
                Dependency: dependency,
                WBSHeaderId: WBSHeaderId
            }
            PMUMappingData.push(pmuMappings);
        }
    });

    // 3. Getting Sorted Array Order for task
    var sortedOrder = slNoSortingArray(PMUMappingData);
    sortedOrder = sortedOrder.split(",");
    var orderToLoop = sortedOrder.map(function (element) {
        return element.trim();
    });

    //var sortedOrder2 = slNoSortingArray2(PMUMappingData);
    //sortedOrder2 = sortedOrder2.split(",");
    //orderToLoop = sortedOrder2.map(function (element) {
    //    return element.trim();
    //});

    // 4. handeling tasks
    orderToLoop.forEach(function (item) {
        $('#pmumapping').dataTable().$('#row_' + item).each(function (relationIndex, relationObj) {

            // handeling relationid updating in the tr of the respective task
            var slno = $(relationObj).closest('tr').find('[data-slno]').attr('data-slno');
            var TaskId = $(relationObj).closest('tr').find('[data-task]').attr('data-task');
            var parentRowIds = [];
            var maxParentRowNo = 0;

            if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
                var headerTr;
                $('#pmumapping').dataTable().$('[data-headerid]').each(function (headeri, headerobj) {
                    var parentRowNo = parseInt($(headerobj).attr('data-headerid'));
                    if (parentRowNo < slno) {
                        headerTr = headerobj;
                    }
                })
                maxParentRowNo = $(headerTr).attr('data-headerid');
                $(relationObj).closest('tr').attr("data-relationid", maxParentRowNo);
            }

            var dependencyValue = $(relationObj).find('[data-dependency]').val();

            // handeling Tasks depedency if there
            if (dependencyValue !== null && dependencyValue !== '' && typeof (dependencyValue) !== "undefined") {
                var newDependencyArray = dependencyValue.split(",");
                var dependentStartDateArray = [];

                $.each(newDependencyArray, function (newDependencyIndex, newDependencyobj) {

                    var dependencyIndex = newDependencyobj.indexOf('F') > -1 ? newDependencyobj.indexOf('F') : newDependencyobj.indexOf('S');
                    var dependencyRowNo = newDependencyobj.substr(0, dependencyIndex);
                    var durationIndex = newDependencyobj.indexOf('+') > -1 ? newDependencyobj.indexOf('+') : newDependencyobj.indexOf('-')
                    var duration = Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) < 0 ?
                        Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) :
                        Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) === 0 ? 0 :
                            Number(newDependencyobj.substr(durationIndex, newDependencyobj.length));
                    var $dependentTr = $('#pmumapping').dataTable().$('#row_' + dependencyRowNo);

                    var endDate = $($dependentTr).find('td [data-enddate]').val();

                    if (endDate !== null && endDate !== '' && typeof (endDate) !== "undefined") {
                        if ($(relationObj).find('[data-duration]').val() !== null && $(relationObj).find('[data-duration]').val() !== '' && typeof ($(relationObj).find('[data-duration]').val()) !== "undefined"
                            && parseInt($(relationObj).find('[data-duration]').val()) === 0) {
                            endDate = moment(addBusinessDays(moment(endDate, "DD/MM/YYYY"), 0)).format("DD/MM/YYYY");
                        }
                        else {
                            endDate = moment(addBusinessDays(moment(endDate, "DD/MM/YYYY"), 1)).format("DD/MM/YYYY");
                        }
                    }

                    var dependentStartDate = newDependencyobj.indexOf('F') > -1 ? endDate : $($dependentTr).find('td [data-startdate]').val();
                    if (dependentStartDate !== null && dependentStartDate !== '' && typeof (dependentStartDate) !== "undefined") {
                        var dependentStartDateAfterduration = addBusinessDays(moment(dependentStartDate, "DD/MM/YYYY"), duration);
                        dependentStartDateArray.push(dependentStartDateAfterduration);
                    }

                });

                if (dependentStartDateArray.length > 0) {
                    var maxStarDate = moment.max(dependentStartDateArray);
                    var currentTrDuration = $(relationObj).find('td [data-duration]').val() !== null && $(relationObj).find('td [data-duration]').val() !== '' && typeof ($(relationObj).find('td [data-duration]').val()) !== "undefined" ? Number($(relationObj).find('td [data-duration]').val()) : 0;
                    var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                    var maxEndDate = addBusinessDays(maxStarDate, addNoOfDays);
                    if (parseInt(currentTrDuration) === 0) {
                        if ($(relationObj).find('[data-duration]').val() !== null && $(relationObj).find('[data-duration]').val() !== '' && typeof ($(relationObj).find('[data-duration]').val()) !== "undefined"
                            && parseInt($(relationObj).find('[data-duration]').val()) === 0) {
                            $(relationObj).find('[data-duration]').val(0);
                            $(relationObj).find('[data-duration]').siblings('span').addClass('hide');
                        }
                        else {
                            $(relationObj).find('[data-duration]').val(1);
                            $(relationObj).find('[data-duration]').siblings('span').addClass('hide');
                        }
                    }

                    if (requestedData.length > 0) {

                        var revisedItem = revisedData.filter(item => item.TaskDescription == TaskId);
                        var requestedItem = requestedData.filter(item => item.Task == TaskId);

                        if (revisedItem.length > 0 && isChanged == 0) {

                            dateParts = (revisedItem[0].UpdatedStartDate).split("/");
                            date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            maxStarDate = moment(date);

                            dateParts = (revisedItem[0].UpdatedEndDate).split("/");
                            date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                            currentTrDuration = revisedItem[0].RevisedDuration;

                            if (requestedItem.length > 0) {
                                var dateParts1 = (requestedItem[0].ReqEndDate).split("/");
                                var date1 = new Date(dateParts1[2], dateParts1[1] - 1, dateParts1[0]);
                                if (moment(date).isSameOrAfter(moment(date1))) {
                                    $(relationObj).find('td:not([data-startdate])').addClass('add-approval-color');
                                    $(relationObj).find('td:not([data-startdate])').siblings().addClass('add-approval-color');
                                }
                                else {
                                    $(relationObj).find('td:not([data-startdate])').removeClass('add-approval-color');
                                    $(relationObj).find('td:not([data-startdate])').siblings().removeClass('add-approval-color');
                                }
                            }
                            else {
                                $(relationObj).find('td:not([data-startdate])').removeClass('add-approval-color');
                                $(relationObj).find('td:not([data-startdate])').siblings().removeClass('add-approval-color');
                            }
                            maxEndDate = moment(date);

                            $(relationObj).find('td [data-duration]').val(currentTrDuration);
                            $(relationObj).find('td [data-duration]').siblings('span').addClass('hide');
                        }
                        else if (requestedItem.length > 0 && isChanged == 1) {

                            dateParts = (requestedItem[0].ReqEndDate).split("/");
                            date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                            if (moment(maxEndDate).isSameOrAfter(moment(date))) {
                                $(relationObj).find('td:not([data-startdate])').addClass('add-approval-color');
                                $(relationObj).find('td:not([data-startdate])').siblings().addClass('add-approval-color');
                            }
                            else {
                                $(relationObj).find('td:not([data-startdate])').removeClass('add-approval-color');
                                $(relationObj).find('td:not([data-startdate])').siblings().removeClass('add-approval-color');
                            }
                        }
                        $(relationObj).find('td [data-startdate]').val(maxStarDate.format("DD/MM/YYYY"));
                        $(relationObj).find('td [data-startdate]').siblings('span').addClass('hide');

                        $(relationObj).find('[data-enddate]').val(maxEndDate.format("DD/MM/YYYY"));
                        $(relationObj).find('[data-enddate]').siblings('span').addClass('hide');

                        $(relationObj).find('[data-enddate]').attr('data-previousvalue', maxEndDate.format("DD/MM/YYYY"));
                    }
                    else {
                        $(relationObj).find('td [data-startdate]').val(maxStarDate.format("DD/MM/YYYY"));
                        $(relationObj).find('td [data-startdate]').siblings('span').addClass('hide');

                        $(relationObj).find('[data-enddate]').val(maxEndDate.format("DD/MM/YYYY"));
                        $(relationObj).find('[data-enddate]').siblings('span').addClass('hide');

                        $(relationObj).find('[data-enddate]').attr('data-previousvalue', maxEndDate.format("DD/MM/YYYY"));
                    }
                }
            }
            // handeling Tasks depedency if not there
            else {
                if (requestedData.length > 0) {
                    if ($(relationObj).find('[data-startdate]').val() !== null && $(relationObj).find('[data-startdate]').val() !== '' && typeof ($(relationObj).find('[data-startdate]').val()) !== "undefined") {
                        {
                            var revisedItem = revisedData.filter(item => item.TaskDescription == TaskId);
                            var requestedItem = requestedData.filter(item => item.Task == TaskId);

                            var maxStarDate = moment($(relationObj).find('[data-startdate]').val(), "DD/MM/YYYY");
                            var currentTrDuration = $(relationObj).find('td [data-duration]').val() !== null && $(relationObj).find('td [data-duration]').val() !== '' && typeof ($(relationObj).find('td [data-duration]').val()) !== "undefined" ? Number($(relationObj).find('td [data-duration]').val()) : 0;
                            var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                            var maxEndDate = addBusinessDays(maxStarDate, addNoOfDays);

                            if (revisedItem.length > 0 && isChanged == 0) {
                                dateParts = (revisedItem[0].UpdatedStartDate).split("/");
                                date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                                maxStarDate = moment(date);

                                dateParts = (revisedItem[0].UpdatedEndDate).split("/");
                                date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                                if (requestedItem.length > 0) {
                                    var dateParts1 = (requestedItem[0].ReqEndDate).split("/");
                                    var date1 = new Date(dateParts1[2], dateParts1[1] - 1, dateParts1[0]);
                                    if (moment(date).isSameOrAfter(moment(date1))) {
                                        $(relationObj).find('td:not([data-startdate])').addClass('add-approval-color');
                                        $(relationObj).find('td:not([data-startdate])').siblings().addClass('add-approval-color');
                                    }
                                    else {
                                        $(relationObj).find('td:not([data-startdate])').removeClass('add-approval-color');
                                        $(relationObj).find('td:not([data-startdate])').siblings().removeClass('add-approval-color');
                                    }
                                }
                                else {
                                    $(relationObj).find('td:not([data-startdate])').removeClass('add-approval-color');
                                    $(relationObj).find('td:not([data-startdate])').siblings().removeClass('add-approval-color');
                                }

                                maxEndDate = moment(date);

                                currentTrDuration = revisedItem[0].RevisedDuration;
                                $(relationObj).find('td [data-duration]').val(currentTrDuration);

                            }
                            else if (requestedItem.length > 0 && isChanged == 1) {

                                dateParts = (requestedItem[0].ReqEndDate).split("/");
                                date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                                if (moment(maxEndDate).isSameOrAfter(moment(date))) {
                                    $(relationObj).find('td:not([data-startdate])').addClass('add-approval-color');
                                    $(relationObj).find('td:not([data-startdate])').siblings().addClass('add-approval-color');
                                }
                                else {
                                    $(relationObj).find('td:not([data-startdate])').removeClass('add-approval-color');
                                    $(relationObj).find('td:not([data-startdate])').siblings().removeClass('add-approval-color');
                                }
                            }

                            $(relationObj).find('td [data-startdate]').val(maxStarDate.format("DD/MM/YYYY"));
                            $(relationObj).find('[data-enddate]').val(maxEndDate.format("DD/MM/YYYY"));
                            $(relationObj).find('[data-enddate]').attr('data-previousvalue', maxEndDate.format("DD/MM/YYYY"));

                            $(relationObj).find('td [data-startdate]').siblings('span').addClass('hide');
                            $(relationObj).find('[data-enddate]').siblings('span').addClass('hide');
                        }
                    }
                }
                else {
                    var maxStarDate = moment($(relationObj).find('[data-startdate]').val(), "DD/MM/YYYY");
                    if ($(relationObj).find('[data-startdate]').val() !== null && $(relationObj).find('[data-startdate]').val() !== '' && typeof ($(relationObj).find('[data-startdate]').val()) !== "undefined") {
                        if ($("#isWeekEndExclude").val() == "True") {
                            if (maxStarDate.day() == 6) {
                                maxStarDate = maxStarDate.add(1, 'days');
                            }
                            if (maxStarDate.day() == 0) {
                                maxStarDate = maxStarDate.add(1, 'days');
                            }
                            $(relationObj).find('[data-startdate]').val(maxStarDate.format("DD/MM/YYYY"));
                            $(relationObj).find('[data-startdate]').siblings('span').addClass('hide');
                            $(relationObj).find('[data-startdate]').attr('data-previousvalue', maxStarDate.format("DD/MM/YYYY"));
                        }
                        var currentTrDuration = $(relationObj).find('[data-duration]').val() !== null && $(relationObj).find('[data-duration]').val() !== '' && typeof ($(relationObj).find('[data-duration]').val()) !== "undefined" ? Number($(relationObj).find('[data-duration]').val()) : 0;
                        var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                        var maxEndDate = addBusinessDays(maxStarDate, addNoOfDays);
                        if (parseInt(currentTrDuration) === 0) {
                            if ($(relationObj).find('[data-duration]').val() !== null && $(relationObj).find('[data-duration]').val() !== '' && typeof ($(relationObj).find('[data-duration]').val()) !== "undefined"
                                && parseInt($(relationObj).find('[data-duration]').val()) === 0) {
                                $(relationObj).find('[data-duration]').val(0);
                                $(relationObj).find('[data-duration]').siblings('span').addClass('hide');
                            }
                            else {
                                $(relationObj).find('[data-duration]').val(1);
                                $(relationObj).find('[data-duration]').siblings('span').addClass('hide');
                            }
                        }
                        $(relationObj).find('[data-enddate]').val(maxEndDate.format("DD/MM/YYYY"));
                        $(relationObj).find('[data-enddate]').siblings('span').addClass('hide');
                        $(relationObj).find('[data-enddate]').attr('data-previousvalue', maxEndDate.format("DD/MM/YYYY"));
                    }
                }
            }

            $(relationObj).find('td [data-dependency]')
                .attr('title', $(relationObj).find('td [data-dependency]').val())
                .trigger('mouseleave').trigger('mouseenter');

            $(relationObj).find('td [data-duration]')
                .attr('title', $(relationObj).find('td [data-duration]').val())
                .trigger('mouseleave').trigger('mouseenter');

            $(relationObj).find('td [data-startdate]')
                .attr('title', $(relationObj).find('td [data-startdate]').val())
                .trigger('mouseleave').trigger('mouseenter');

            $(relationObj).find('td [data-enddate]')
                .attr('title', $(relationObj).find('td [data-enddate]').val())
                .trigger('mouseleave').trigger('mouseenter');

        });
    });

    // 5. handeling header
    $('#pmumapping').dataTable().$('[data-headerid]').each(function (headeri, headerobj) {
        var headerid = $(headerobj).attr('data-headerid');
        percentageArray = []; startDateArray = []; endDateArray = [];
        $('#pmumapping').dataTable().$('[data-relationid="' + headerid + '"]').each(function (i, obj) {
            var startDate = $(obj).find('[data-startdate]').val();
            if (startDate !== null && startDate !== '' && typeof (startDate) !== "undefined") {
                startDateArray.push(moment(startDate, "DD/MM/YYYY"));
            }
            var endDate = $(obj).find('[data-enddate]').val();
            if (endDate !== null && endDate !== '' && typeof (endDate) !== "undefined") {
                endDateArray.push(moment(endDate, "DD/MM/YYYY"));
            }
            var percentage = $(obj).find('[data-percentage]').val();
            if (percentage !== null && percentage !== '' && typeof (percentage) !== "undefined") {
                percentageArray.push(Number(percentage));
            }
        })
        var relationTrsLength = $('#pmumapping').dataTable().$('[data-relationid="' + headerid + '"]').length;
        if (startDateArray.length > 0 && endDateArray.length > 0) {
            var maxStartDate = moment.min(startDateArray);
            var maxEndDate = moment.max(endDateArray);

            $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-startdate]').val(moment(maxStartDate).format("DD/MM/YYYY"));
            $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-startdate]').attr('data-previousvalue', moment(maxStartDate).format("DD/MM/YYYY"));
            $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-startdate]').siblings('span').hide();

            $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-enddate]').val(moment(maxEndDate).format("DD/MM/YYYY"));
            $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-enddate]').attr('data-previousvalue', moment(maxStartDate).format("DD/MM/YYYY"));
            $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-enddate]').siblings('span').hide();

            var duration = getBusinessDays(moment(maxStartDate), moment(maxEndDate)) + 1;
            $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-duration]').val(duration);
            $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-duration]').siblings('span').hide();
        }

        var averageValue = 0;
        if (percentageArray.length > 0) {
            averageValue = percentageArray.reduce(function (a, b) {
                return a + b;
            }, 0) / relationTrsLength;
        }

        $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-percentage]').val(averageValue.toFixed(2));
        $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-percentage]').siblings('span').children('span').width(averageValue + '%');

        var headerpercentage = $(headerobj).find('[data-percentage]').val();
        if (headerpercentage !== null && headerpercentage !== '' && typeof (headerpercentage) !== "undefined") {
            overAllPercentageArray.push(Number(headerpercentage));
        }
        var headerStartDate = $(headerobj).find('[data-startdate]').val();
        if (headerStartDate !== null && headerStartDate !== '' && typeof (headerStartDate) !== "undefined") {
            overAllStartDateArray.push(moment(headerStartDate, "DD/MM/YYYY"));
        }
        var headerEndDate = $(headerobj).find('[data-enddate]').val();
        if (headerEndDate !== null && headerEndDate !== '' && typeof (headerEndDate) !== "undefined") {
            overAllEndDateArray.push(moment(headerEndDate, "DD/MM/YYYY"));
        }

        $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-duration]')
            .attr('title', $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-duration]').val())
            .trigger('mouseleave').trigger('mouseenter');

        $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-enddate]')
            .attr('title', $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-enddate]').val())
            .trigger('mouseleave').trigger('mouseenter');

        $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-startdate]')
            .attr('title', $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-startdate]').val())
            .trigger('mouseleave').trigger('mouseenter');

        $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-percentage]')
            .attr('title', $('#pmumapping').dataTable().$('#row_' + headerid).find('[data-percentage]').val())
            .trigger('mouseleave').trigger('mouseenter');

    });

    // 6. handeling Versions dropdown
    var currentWorkingVersion = $("#currentWorkingVersion").val();
    if (
        !(currentWorkingVersion === "" || currentWorkingVersion === null || typeof (currentWorkingVersion) === "undefined") ||
        isScopeChanged == 1
    ) {
        $(".version-div").show();
        currentWorkingVersion == "" ? $("#Marquee_span").show() : $("#Marquee_span").hide();
        var pmuVersionList = JSON.parse($('#PMUVersionList').val());
        var versionDropdown = $("#Version");

        versionDropdown.empty();
        $.each(pmuVersionList, function (index, value) {
            versionDropdown.append(
                $('<option>', {
                    value: value.PMUVersion,
                    text: value.PMUVersion
                })
            );
        });
        lastSelectedVersion = isScopeChanged == 1 && currentWorkingVersion == "" ? "Latest" : currentWorkingVersion;
        versionDropdown.val(lastSelectedVersion);
    }
    else {
        $(".version-div").hide();
        $("#Marquee_span").show();
        $("#Version").val("");
    }

    // 7. handeling template dropdown
    var TemplateCount = autocompleteDrodownArray['Template'].length
    if (TemplateCount > 0) {
        if (
            $('#currentSavedLatestVersion').val() !== null && $('#currentSavedLatestVersion').val() !== '' &&
            typeof ($('#currentSavedLatestVersion').val()) !== "undefined" &&
            (
                ($('#Version option:selected').text().toLowerCase() !== "latest") ||
                ($('#currentSavedLatestVersion').val().toLowerCase() !== "latest")
            )
        ) {
        }
        else {
            $(".template-div").show();
            var templateList = autocompleteDrodownArray.Template;
            var templateDropDown = $("#fromtemplate");

            templateDropDown.empty();
            templateDropDown.append($('<option value="0">Select Template</option>'));
            $.each(templateList, function (index, value) {
                templateDropDown.append($('<option>', {
                    value: value.TemplateId,
                    text: value.TemplateName
                }));
            });
            templateDropDown.val($("#selectedTemplate").val());
        }
    }
    else {
        $(".template-div").hide();
    }

    // 8. handeling weekend dropdown
    var weekendDropdown = $("#weekend-switching");
    weekendDropdown.empty();
    weekendDropdown.append('<option value="True">Excluded</option>' +
        '<option value="False">Included</option>');
    var currentWeekendStatus = $("#isWeekEndExclude").val();
    weekendDropdown.val(currentWeekendStatus);

    // 9. handeling kpi task dropdown
    var kpiselected = $("#IsKPIIncluded").val().toLowerCase();
    kpiselected = kpiselected == "true" ? "1" : "0"
    $("#YesOrNoKPI").val(kpiselected).trigger('change');

    // 10. handeling overall percentage
    var overAllAverageValue = 0;
    if (overAllPercentageArray.length > 0) {
        overAllAverageValue = overAllPercentageArray.reduce(function (a, b) {
            return a + b;
        }, 0) / overAllPercentageArray.length;
    }

    // 11. handeling overall startdate and enddate
    $('#OverAllProjectPercentage').text(overAllAverageValue.toFixed(2));
    if (overAllStartDateArray.length > 0) {
        $('#OverAllStartDate').text(moment(moment.min(overAllStartDateArray)).format("DD/MM/YYYY"));
    }
    else {
        $('#OverAllStartDate').text("");
    }
    if (overAllEndDateArray.length > 0) {
        $('#OverAllEndDate').text(moment(moment.max(overAllEndDateArray)).format("DD/MM/YYYY"));
    }
    else {
        $('#OverAllEndDate').text("");
    }

    // 12. handeling colors to td (on delete row and manually change startdate)
    $.each(dependentRows, function (i, obj) {
        if (requestFrom === "deleterow") {
            $('#pmumapping').dataTable().$('#row_' + obj).find('[data-dependency]').closest('td').attr("style", "background-color:#f0c756 !important");
        }
        else {

            $('#pmumapping').dataTable().$('#row_' + obj).find('[data-startdate]').closest('td').attr("style", "background-color:#bee520 !important");
            $('#pmumapping').dataTable().$('#row_' + obj).find('[data-enddate]').closest('td').attr("style", "background-color:#bee520 !important");
        }
    });

}
function GenerateDataTable(result) {

    $('#pmumapping').dataTable().fnDestroy();
    document.getElementById('pmumappingtablediv').innerHTML = '';
    $('#pmumappingtablediv').html(result);
    var tableLength = $('#pmumapping tbody tr').length;
    initializeDataTable(tableLength);

}
function ManipulateArrayLoadAutoSuggest(type) {

    //type 1 --- template data
    //type 2 --- pmu mapping data
    //type 3 --- version data
    //type 4 --- clone

    if (type == 1) {
        documentDetails = [];
        remarksDetails = [];
    }
    else if (type == 2) {
        documentDetails = JSON.parse($('#DocumentDetails').val());
        remarksDetails = JSON.parse($('#RemarksDetails').val());
        documentDetails = documentDetails.filter(m => m.DocumentName !== null);
        remarksDetails = remarksDetails.filter(m => m.RemarkDesc !== null);
    }
    else if (type == 3 || type == 4) {
        documentDetails = JSON.parse($('#DocumentDetails').val());
        remarksDetails = JSON.parse($('#RemarksDetails').val());
    }
    loadAutoCompleteDropdowns(autocompleteDrodownArray);

}
function GenerateKpiTaskSmartSheetCriticalPath() {

    task_checkkpiarray = [];
    gettaskkpidata();
    smartSheetCalculation(0);
    GetCriticalPath();

    alreadySavedWeekendFlag = $("#isWeekEndExclude").val();

    alreadySavedKPIFlag = $("#IsKPIIncluded").val()?.toLowerCase();
    alreadySavedKPIFlag = alreadySavedKPIFlag == "true" ? "1" : "0";

    $(".plus_icon").css("pointer-events", "all");
    $(".fa-history").css("pointer-events", "all");

}
function SaveTemplateButtonShowHide() {

    if (
        ($('#currentSavedLatestVersion').val() == $('#currentWorkingVersion').val()) ||
        ($('#currentWorkingVersion').val() == "" && $('#currentSavedLatestVersion').val()?.toLowerCase() == "latest")
    ) {

        $("#save-template").show();

        if ($("#RevisedRequestData").val() == null || $("#RevisedRequestData").val() == undefined || $("#RevisedRequestData").val() == "") {
            if (isSavable == 1) {
                $('#btn-save').show();
            }
            else {
                $('#btn-save').hide();
            }
        }
        else {
            $('#btn-save').show();
        }

    }
    else {
        $('#btn-save').hide();
        $("#save-template").hide();
    }

}
function ButtonsBeforeApprove() {

    if (isScopeChanged == 1) {
        $(".version-div").show();
    }
    else {
        $(".version-div").hide();
    }

    $("#weekend-selected").text('');
    $(".weekend-selected-span").hide();
    $("#kpi-selected").text('');
    $(".kpi-selected-span").hide();

    if ($('#currentSavedLatestVersion').val() == $('#currentWorkingVersion').val()) {
        $("#save-template").show();
    }

    $('#btn-approve').show();
    $('#btn-clone').show();
    $('.template-div').show();
    $(".kpi-selected").show();
    $('.weekend-switching-div').show();

    $("#DisplayVersionRemarks").show();


}
function ButtonsAfterApprove() {

    var weekendSelected = $("#isWeekEndExclude").val().toLowerCase();
    weekendSelected = weekendSelected == "true" ? "Excluded" : "Included";

    var kpiselected = $("#IsKPIIncluded").val().toLowerCase();
    kpiselected = kpiselected == "true" ? "Yes" : "No";

    $('#btn-approve').hide();
    $('#btn-clone').hide();
    $('.template-div').hide();
    $(".kpi-selected").hide();
    $('.weekend-switching-div').hide();

    if ($('#currentSavedLatestVersion').val() == $('#currentWorkingVersion').val()) {
        $("#save-template").show();
    }

    $(".version-div").show();
    $("#weekend-selected").text(weekendSelected);
    $(".weekend-selected-span").show();
    $("#kpi-selected").text(kpiselected);
    $(".kpi-selected-span").show();

    $("#DisplayVersionRemarks").show();

}
function HideAndShowAllButtons(type) {

    //type 1 --- template data
    //type 2 --- pmu mapping data
    //type 3 --- version data
    //type 4 --- Clone data

    if (
        // scope changed but not yet saved or approved
        (isScopeChanged == 1 && isCloneAccepted == 0) ||
        // No scope change & project is not yet approved
        (isScopeChanged == 0 && $('#currentSavedLatestVersion').val() == "") ||
        // clone means
        (type == 4)
    ) {
        if (type == 1 || type == 2 || type == 4 || ($('#currentSavedLatestVersion').val() == $('#Version option:selected').text())) {
            ButtonsBeforeApprove();
        }
        else {
            ButtonsAfterApprove(); // Version change
        }
    }
    // scope changed but not yet approved
    else if (
        isScopeChanged == 1 &&
        isCloneAccepted != 0 &&
        $('#currentSavedLatestVersion').val().toLowerCase() == "latest"
    ) {

        if (type == 1 || type == 2 || ($('#currentSavedLatestVersion').val() == $('#Version option:selected').text())) {
            ButtonsBeforeApprove();
        }
        else if (type == 3) {
            ButtonsAfterApprove(); // Version change
        }
    }
    else if (
        // scope changed & approved
        (isScopeChanged == 1 && isCloneAccepted != 0 && $('#currentSavedLatestVersion').val().toLowerCase() !== "latest") ||
        // Normal approved
        (isScopeChanged == 0 && ($('#currentSavedLatestVersion').val() !== null && $('#currentSavedLatestVersion').val() !== ''
            && typeof ($('#currentSavedLatestVersion').val()) !== "undefined"))
    ) {
        if (type == 2 || type == 3) {
            ButtonsAfterApprove();
        }
    }

}
function RevertInitialPageStructure() {

    $(".template-div").hide();
    $(".version-div").hide();
    $(".kpi-selected").hide();
    $(".weekend-switching-div").hide();
    $(".weekend-selected-span").hide();
    $(".kpi-selected-span").hide();
    $("#DisplayVersionRemarks").hide();

    $("#save-template").hide();
    $("#btn-save").hide();
    $("#btn-approve").hide();
    $('#btn-clone').hide();

    $('#OverAllProjectPercentage').text('');
    $('#OverAllStartDate').text('');
    $('#OverAllEndDate').text('');

    var table = $('#pmumapping').DataTable();
    table.clear().destroy();
    $('#pmumappingtablediv').empty();

}
function GetPMUMappingData(isFromTemplate = false) {

    var headerLength = $('#pmumapping').dataTable().$('[data-headerid]').length;
    var relationLength = $('#pmumapping').dataTable().$('[data-relationid]').length;

    var projectId = parseInt($('#ProjectId').val());
    var projectName = $('#ProjectId option:selected').text().trim();
    var hubId = parseInt($('#Hub option:selected').val());
    var hubName = $('#Hub option:selected').text().trim();
    var version = $('#Version option:selected').text() == null ? '' : $('#Version option:selected').text().trim();

    if (isFromTemplate && (relationLength > 0 || headerLength > 0)) {
        confirmWithTempalte("Are you sure do you want to override the existing data?",
            function () {
                $.ajax({
                    url: ROOT + 'ProjectTracker/PV_PMUmappingTable',
                    type: 'POST',
                    async: false,
                    cache: false,
                    dataType: 'HTML',
                    data: {
                        ProjectId: projectId,
                        ProjectName: projectName,
                        HubId: hubId,
                        HubName: hubName,
                        CurrentSelectedVersion: version,
                        IsFromTemplate: isFromTemplate,
                        Template_Id: parseInt($('#fromtemplate').val()),
                        IsScopeChanged: isScopeChanged,
                        IsCloneAccepted: isCloneAccepted
                    },
                    success: function (result) {

                        GenerateDataTable(result);

                        ManipulateArrayLoadAutoSuggest(1);

                        HideAndShowAllButtons(1);

                        SaveTemplateButtonShowHide();

                        GenerateKpiTaskSmartSheetCriticalPath();

                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });
            },
            function () {
                var templateDropDownAutoSelect = $("#fromtemplate");
                templateDropDownAutoSelect.val("0").change();
            }
        );
    }
    else {
        var approvalSlNo = ""; var approvalVersion = ""; var approvalStartDate = ""; var approvalEndDate = "";
        if ($('#selectedProjectId').val() == parseInt($('#ProjectId').val()) &&
            $('#selectedHubId').val() == parseInt($('#Hub option:selected').val())) {
            approvalSlNo = $("#ApprovalSlNo").val();
            approvalVersion = $("#ApprovalVersion").val();
            approvalStartDate = $("#ApprovalStartDate").val();
            approvalEndDate = $("#ApprovalEndDate").val();
        }
        else {
            let url = new URL(window.location.href);
            if (url.searchParams.has('q')) {
                url.searchParams.delete('q');
                window.history.replaceState({}, document.title, url.toString());
                $("#ApprovalSlNo").val('');
                $("#ApprovalVersion").val('');
                $("#ApprovalStartDate").val('');
                $("#ApprovalEndDate").val('');
            }
        }

        $.ajax({
            url: ROOT + 'ProjectTracker/PV_PMUmappingTable',
            type: 'POST',
            async: false,
            cache: false,
            dataType: 'HTML',
            data: {
                ProjectId: projectId,
                ProjectName: projectName,
                HubId: hubId,
                HubName: hubName,
                CurrentSelectedVersion: version,
                IsFromTemplate: isFromTemplate,
                Template_Id: parseInt($('#fromtemplate').val()),
                IsScopeChanged: isScopeChanged,
                IsCloneAccepted: isCloneAccepted,

                ApprovalSlNo: approvalSlNo,
                ApprovalVersion: approvalVersion,
                ApprovalStartDate: approvalStartDate,
                ApprovalEndDate: approvalEndDate
            },
            success: function (result) {

                GenerateDataTable(result);

                ManipulateArrayLoadAutoSuggest(2);

                HideAndShowAllButtons(2);

                SaveTemplateButtonShowHide();

                GenerateKpiTaskSmartSheetCriticalPath();

            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    }

}
function getVersionData() {

    if (isScopeChanged == 1 && $('#Version option:selected').text() == "Latest" && isCloneAccepted == 0) {
        AjaxToCheckConditions();
    }
    else {
        remarksDetails = [];
        documentDetails = [];

        $.ajax({
            url: ROOT + 'ProjectTracker/PV_PMUmappingTable',
            type: 'POST',
            async: false,
            cache: false,
            dataType: 'HTML',
            data: {
                ProjectId: parseInt($('#ProjectId').val()),
                ProjectName: $('#ProjectId option:selected').text(),
                HubId: parseInt($('#Hub option:selected').val()),
                HubName: $('#Hub option:selected').text(),
                CurrentSelectedVersion: $('#Version option:selected').text() == null ? '' : $('#Version option:selected').text(),
                IsScopeChanged: isScopeChanged,
                IsCloneAccepted: isCloneAccepted
            },
            success: function (result) {

                GenerateDataTable(result);

                ManipulateArrayLoadAutoSuggest(3);

                HideAndShowAllButtons(3);

                SaveTemplateButtonShowHide();

                GenerateKpiTaskSmartSheetCriticalPath();

                let url = new URL(window.location.href);
                if (url.searchParams.has('q')) {
                    url.searchParams.delete('q');
                    window.history.replaceState({}, document.title, url.toString());
                    $("#ApprovalSlNo").val('');
                    $("#ApprovalVersion").val('');
                    $("#ApprovalStartDate").val('');
                    $("#ApprovalEndDate").val('');
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    }

}
function GenerateSubmitDataAjaxCallToSubmit(versionForSave, versionGroupForSave, islatest, saveAppRemarks, isSaveAppRemarks) {

    var formData = new FormData();
    var pmuMappingsArray = [];
    var data = []; var revisedData = []; requestedData = []; var ExtendedId = 0;

    GetCriticalPath();
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {

        var wbsHeader = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
        var headerid = $(obj).attr('data-headerid');
        var task = $(obj).find('[data-task]').attr('data-task');
        var dependency = $(obj).find('[data-dependency]').val();
        var duration = $(obj).find('[data-duration]').val();
        var startdate = $(obj).find('[data-startdate]').val();
        var enddate = $(obj).find('[data-enddate]').val();
        var percentage = $(obj).find('[data-percentage]').val() !== null &&
            $(obj).find('[data-percentage]').val() !== '' &&
            typeof ($(obj).find('[data-percentage]').val()) !== "undefined" ? parseFloat($(obj).find('[data-percentage]').val()) : 0;
        var resources = $(obj).find('[data-resources]').val();
        var remarks = $(obj).find('[data-remarks]').val().trim();
        var projectId = $('#ProjectId').val();
        var rowNo = $(obj).find('[data-slno]').attr('data-slno');
        var files = $(obj).find("[data-files]")[0].files;
        var relationId = $(obj).attr('data-relationid');
        var milestonestatus = $(obj).attr('data-milestonestatus');
        var Slack = $(obj).find('[data-slack]').text();
        var containsHighlightSlno = $(obj).find('[data-slno]').hasClass('highlight-slno');
        var isCritical = containsHighlightSlno ? 1 : 0;
        var resourcesArray = [];

        // to handel resources
        if (resources !== null && resources !== '' && typeof (resources) !== "undefined") {
            $.each(resources.split(","), function (i, obj) {
                var resourceSplit = obj.split("-");
                if (resourceSplit.length > 1) {
                    var objIndex = autocompleteDrodownArray.Resources.findIndex(function (o) { return o.UserName === resourceSplit[1].replace(" ", "") });
                    if (objIndex >= 0) {
                        var resource = {
                            ProjectId: parseInt(projectId),
                            RowNum: parseInt(rowNo),
                            ResourceName: resourceSplit[1].replace(" ", "")
                        }
                        resourcesArray.push(resource);
                    }
                }
            })
        }

        // wbs header
        if (headerid !== null && headerid !== '' && typeof (headerid) !== "undefined" &&
            wbsHeader !== null && wbsHeader !== '' && typeof (wbsHeader) !== "undefined" &&
            duration !== null && duration !== '' && typeof (duration) !== "undefined" &&
            startdate !== null && startdate !== '' && typeof (startdate) !== "undefined" &&
            enddate !== null && enddate !== '' && typeof (enddate) !== "undefined") {
            // to handel documents
            $.each(files, function (fileIndex, file) {
                if (file.size > 0) {
                    var timestamp = moment().valueOf();
                    formData.append(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp, file);
                    var extension = file.name.split(".").pop();

                    var document = {
                        SlNo: parseInt(rowNo),
                        WBSHeader: parseInt(wbsHeader),
                        Task: 0,
                        ProjectId: parseInt(projectId),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " "),
                        SubmittedBy: "",
                        SubmittedOn: ""
                    };
                    documentDetails.push(document);
                }
            });

            // to handel remarks
            if (remarks != "" && remarks != null && remarks != undefined) {
                var remark = {
                    SlNo: parseInt(rowNo),
                    WBSHeader: parseInt(wbsHeader),
                    Task: 0,
                    ProjectId: parseInt(projectId),
                    RemarkDesc: remarks,
                    SubmittedBy: "",
                    SubmittedOn: ""
                };
                remarksDetails.push(remark);
            }

            // to handel PMUmappings
            var pmuMappings = {
                WBSHeader: parseInt(wbsHeader),
                Task: 0,
                RelationId: 0,
                Dependency: dependency,
                Duration: parseInt(duration),
                StartDate: moment(startdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                EndDate: moment(enddate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                Percentage: parseFloat(percentage),
                Resources: resources,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                DependencyArray: [],
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                Slack: '',
                isCritical: ''
            }

            pmuMappingsArray.push(pmuMappings);
        }

        // task
        if (relationId !== null && relationId !== '' && typeof (relationId) !== "undefined" &&
            task !== null && task !== '' && typeof (task) !== "undefined" &&
            duration !== null && duration !== '' && typeof (duration) !== "undefined" &&
            startdate !== null && startdate !== '' && typeof (startdate) !== "undefined" &&
            enddate !== null && enddate !== '' && typeof (enddate) !== "undefined") {
            // to handel documents
            $.each(files, function (fileIndex, file) {
                if (file.size > 0) {
                    var timestamp = moment().valueOf();
                    formData.append(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp, file);
                    var extension = file.name.split(".").pop();

                    var document = {
                        SlNo: parseInt(rowNo),
                        WBSHeader: 0,
                        Task: parseInt(task),
                        ProjectId: parseInt(projectId),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " "),
                        SubmittedBy: "",
                        SubmittedOn: ""
                    };
                    documentDetails.push(document);
                }
            });

            // to handel remarks
            if (remarks != "" && remarks != null && remarks != undefined) {
                var remark = {
                    SlNo: parseInt(rowNo),
                    WBSHeader: 0,
                    Task: parseInt(task),
                    ProjectId: parseInt(projectId),
                    RemarkDesc: remarks,
                    SubmittedBy: "",
                    SubmittedOn: ""
                };
                remarksDetails.push(remark);
            }

            // to hide dependency
            var dependencyArray = [];
            if (dependency !== null && dependency !== '' && typeof (dependency) !== "undefined") {
                $.each(dependency.split(","), function (depedencyIndex, dependencyObj) {
                    var index = dependencyObj.indexOf('F') > -1 ? dependencyObj.indexOf('F') : dependencyObj.indexOf('S');
                    var dependentRow = dependencyObj.substr(0, index);
                    var dependencyType = dependencyObj.substr(index, 2);
                    var operatorindex = dependencyObj.indexOf('+') > -1 ? dependencyObj.indexOf('+') : dependencyObj.indexOf('-');
                    var dependencyLeadOrLag = dependencyObj.substr(operatorindex, dependencyObj.length);
                    dependencyArray.push({
                        RowNum: parseInt(rowNo),
                        ProjectId: parseInt(projectId),
                        Depedency: parseInt(dependentRow),
                        DependencyType: dependencyType,
                        LeadOrLag: parseInt(dependencyLeadOrLag)
                    })
                })
            }

            // to handel PMUmappings
            var pmuMappings = {
                WBSHeader: 0,
                Task: parseInt(task),
                RelationId: parseInt(relationId),
                Dependency: dependency,
                Duration: parseInt(duration),
                StartDate: moment(startdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                EndDate: moment(enddate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                Percentage: parseFloat(percentage),
                Resources: resources,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                DependencyArray: dependencyArray,
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                Slack: Slack,
                isCritical: isCritical
            }

            pmuMappingsArray.push(pmuMappings);
        }
    });

    formData.append("PMUMappings", JSON.stringify(pmuMappingsArray));
    formData.append("Documents", JSON.stringify(documentDetails));
    formData.append("Remarks", JSON.stringify(remarksDetails));

    // don't use global variable since condition passing the version & version group
    formData.append("LatestVersion", versionForSave);
    formData.append("LatestVersionGroup", versionGroupForSave);
    formData.append("PreviousVersion", $("#currentSavedLatestVersion").val());
    formData.append("PreviousVersionGroup", $("#currentSavedLatestVersionGroup").val());

    formData.append("IsLatest", islatest);
    formData.append("IsWeekendExcluded", $('#weekend-switching option:selected').val());

    var kpiselected = parseInt($("#YesOrNoKPI").val());
    kpiselected = kpiselected == 1 ? true : false
    formData.append("IsKPIIncluded", kpiselected);

    formData.append("HubId", parseInt($('#Hub option:selected').val()));
    formData.append("ProjectId", $('#ProjectId').val());

    if ($("#RevisedRequestData").val() != null && $("#RevisedRequestData").val() != undefined && $("#RevisedRequestData").val() != "") {

        data = JSON.parse($("#RevisedRequestData").val());
        revisedData = data.Item1;
        requestedData = data.Item2;
        ExtendedId = requestedData
            .filter(item => revisedData.some(revItem => revItem.SlNo === item.SlNo))
            .map(item => item.ExtendId);
        ExtendedId = ExtendedId[0];

    }
    formData.append("ExtendedId", ExtendedId);

    formData.append("IsCloneAcceptedForProject", isCloneAcceptedForProject);

    formData.append("saveAppRemarks", saveAppRemarks);
    if (isSaveAppRemarks) {
        formData.append("isSaveAppRemarks", 1);
    }
    else {
        formData.append("isSaveAppRemarks", 0);
    }

    $.ajax({
        url: ROOT + 'ProjectTracker/SavePMUMappings',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.includes("success")) {

                let url = new URL(window.location.href);

                if (url.searchParams.has('q')) {

                    url.searchParams.delete('q');
                    window.history.replaceState({}, document.title, url.toString());

                }
                window.location.reload();

            }
            else {
                alert(response);
            }
            $('#VersionRemarks').val('');
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

}
function submitData(versionForSave, versionGroupForSave, islatest) {

    if (versionForSave.includes("Baseline") && isDatesNotModified == false) {

        handelConfirmRemarksPopup("Are you sure, Do you want to approve?", function () {

            var remarks = $("#with-remarks-data").val().trim();
            $("#save-with-remarks-popup").modal("hide");
            GenerateSubmitDataAjaxCallToSubmit(versionForSave, versionGroupForSave, islatest, remarks, false);

        });

    }
    else if (versionForSave == '') {
        handelConfirmRemarksPopup("Are you sure, Do you want to save?", function () {

            var remarks = $("#with-remarks-data").val().trim();
            $("#save-with-remarks-popup").modal("hide");
            GenerateSubmitDataAjaxCallToSubmit(versionForSave, versionGroupForSave, islatest, remarks, true);

        });
    }
    else if (versionChangeConfirmed == 0) {
        GenerateSubmitDataAjaxCallToSubmit(versionForSave, versionGroupForSave, islatest, $('#VersionRemarks').val(), true);
    }
    else {
        GenerateSubmitDataAjaxCallToSubmit(versionForSave, versionGroupForSave, islatest, $('#VersionRemarks').val(), false);
        versionChangeConfirmed = 0;
    }

}
function validateKPITask(version, versionGroup, islatest, istotalKPI) {

    var pmuMappingsArray = [];

    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {

        var wbsHeader = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
        var headerid = $(obj).attr('data-headerid');
        var task = $(obj).find('[data-task]').attr('data-task');
        var dependency = $(obj).find('[data-dependency]').val();
        var duration = $(obj).find('[data-duration]').val();
        var startdate = $(obj).find('[data-startdate]').val();
        var enddate = $(obj).find('[data-enddate]').val();
        var percentage = $(obj).find('[data-percentage]').val() !== null && $(obj).find('[data-percentage]').val() !== '' && typeof ($(obj).find('[data-percentage]').val()) !== "undefined" ? parseFloat($(obj).find('[data-percentage]').val()) : 0;
        var resources = $(obj).find('[data-resources]').val();
        var remarks = $(obj).find('[data-remarks]').val().trim();
        var projectId = $('#ProjectId').val();
        var rowNo = $(obj).find('[data-slno]').attr('data-slno');
        var files = $(obj).find("[data-files]")[0].files;
        var relationId = $(obj).attr('data-relationid');
        var milestonestatus = $(obj).attr('data-milestonestatus');
        var resourcesArray = [];

        // to handel resources
        if (resources !== null && resources !== '' && typeof (resources) !== "undefined") {
            $.each(resources.split(","), function (i, obj) {
                var resourceSplit = obj.split("-");
                if (resourceSplit.length > 1) {
                    var objIndex = autocompleteDrodownArray.Resources.findIndex(function (o) { return o.UserName === resourceSplit[1].replace(" ", "") });
                    if (objIndex >= 0) {
                        var resource = {
                            ProjectId: parseInt(projectId),
                            RowNum: parseInt(rowNo),
                            ResourceName: resourceSplit[1].replace(" ", "")
                        }
                        resourcesArray.push(resource);
                    }
                }
            })
        }

        // wbs header
        if (headerid !== null && headerid !== '' && typeof (headerid) !== "undefined" &&
            wbsHeader !== null && wbsHeader !== '' && typeof (wbsHeader) !== "undefined" &&
            duration !== null && duration !== '' && typeof (duration) !== "undefined" &&
            startdate !== null && startdate !== '' && typeof (startdate) !== "undefined" &&
            enddate !== null && enddate !== '' && typeof (enddate) !== "undefined") {
            // to handel documents
            $.each(files, function (fileIndex, file) {
                if (file.size > 0) {
                    var timestamp = moment().valueOf();
                    //formData.append(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp, file);
                    var extension = file.name.split(".").pop();

                    var document = {
                        SlNo: parseInt(rowNo),
                        WBSHeader: parseInt(wbsHeader),
                        Task: 0,
                        ProjectId: parseInt(projectId),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
                    };
                }
            });

            // to handel remarks
            if (remarks != "" && remarks != null && remarks != undefined) {
                var remark = {
                    SlNo: parseInt(rowNo),
                    WBSHeader: parseInt(wbsHeader),
                    Task: 0,
                    ProjectId: parseInt(projectId),
                    RemarkDesc: remarks
                };
            }

            // to handel PMUmappings
            var pmuMappings = {
                WBSHeader: parseInt(wbsHeader),
                Task: 0,
                RelationId: 0,
                Dependency: dependency,
                Duration: parseInt(duration),
                StartDate: moment(startdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                EndDate: moment(enddate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                Percentage: parseFloat(percentage),
                Resources: resources,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                DependencyArray: [],
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                VersionRemarks: $('#VersionRemarks').val()
            }

            pmuMappingsArray.push(pmuMappings);
        }

        // task
        if (relationId !== null && relationId !== '' && typeof (relationId) !== "undefined" &&
            task !== null && task !== '' && typeof (task) !== "undefined" &&
            duration !== null && duration !== '' && typeof (duration) !== "undefined" &&
            startdate !== null && startdate !== '' && typeof (startdate) !== "undefined" &&
            enddate !== null && enddate !== '' && typeof (enddate) !== "undefined") {
            // to documents
            $.each(files, function (fileIndex, file) {
                if (file.size > 0) {
                    var timestamp = moment().valueOf();
                    var extension = file.name.split(".").pop();

                    var document = {
                        SlNo: parseInt(rowNo),
                        WBSHeader: 0,
                        Task: parseInt(task),
                        ProjectId: parseInt(projectId),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
                    };
                }
            });

            // to handel remarks
            if (remarks != "" && remarks != null && remarks != undefined) {
                var remark = {
                    SlNo: parseInt(rowNo),
                    WBSHeader: 0,
                    Task: parseInt(task),
                    ProjectId: parseInt(projectId),
                    RemarkDesc: remarks
                };
            }

            // to dependency
            var dependencyArray = [];
            if (dependency !== null && dependency !== '' && typeof (dependency) !== "undefined") {
                $.each(dependency.split(","), function (depedencyIndex, dependencyObj) {
                    var index = dependencyObj.indexOf('F') > -1 ? dependencyObj.indexOf('F') : dependencyObj.indexOf('S');
                    var dependentRow = dependencyObj.substr(0, index);
                    var dependencyType = dependencyObj.substr(index, 2);
                    var operatorindex = dependencyObj.indexOf('+') > -1 ? dependencyObj.indexOf('+') : dependencyObj.indexOf('-');
                    var dependencyLeadOrLag = dependencyObj.substr(operatorindex, dependencyObj.length);
                    dependencyArray.push({
                        RowNum: parseInt(rowNo),
                        ProjectId: parseInt(projectId),
                        Depedency: parseInt(dependentRow),
                        DependencyType: dependencyType,
                        LeadOrLag: parseInt(dependencyLeadOrLag)
                    })
                })
            }

            // to handel PMUmappings
            var pmuMappings = {
                WBSHeader: 0,
                Task: parseInt(task),
                RelationId: parseInt(relationId),
                Dependency: dependency,
                Duration: parseInt(duration),
                StartDate: moment(startdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                EndDate: moment(enddate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                Percentage: parseFloat(percentage),
                Resources: resources,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                DependencyArray: dependencyArray,
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                VersionRemarks: $('#VersionRemarks').val()
            }

            pmuMappingsArray.push(pmuMappings);
        }

    });

    var isValid = true;
    var Kpicount = KPIarray.length;
    var totalCount = 0;
    var pendingkpidata = []
    $.each(KPIarray, function (i, obj) {
        var index = -1;
        index = pmuMappingsArray.findIndex(function (m) {
            return m.Task == obj.TaskId
        });
        if (index > -1) {
            totalCount++;
        }
        else {
            pendingkpidata.push({ "TaskDesc": obj.TaskDesc })
        }
    });
    if (Kpicount != totalCount && istotalKPI === false) {
        isValid = false;
        getkpiGrid(pendingkpidata);

        $("#pendingkpimodal").modal('show')
        if (version != "") {
            $(".approvekpi").show()
            $(".savekpi").hide()
            $("#displaySpanmsg").text("Below KPI Tasks are pending .Please enter all the KPI tasks")

        } else {
            $(".approvekpi").hide()
            $(".savekpi").show()
            $("#displaySpanmsg").text("Below KPI Tasks are pending .Do you want to continue")
            kpi_version = version;
            kpi_versionGroup = versionGroup;
            kpi_islatest = islatest;
        }
    }
    if (!isValid) {
        return false;
    }
    else {
        return true;
    }

}
function addBusinessDays(originalDate, numDaysToAdd) {

    const Sunday = 0;
    const Saturday = 6;
    let daysRemaining = numDaysToAdd;
    const newDate = originalDate.clone();
    var isWeekEndExclude = JSON.parse($('#isWeekEndExclude').val().toLowerCase())
    if (isWeekEndExclude) {
        while (daysRemaining > 0) {
            newDate.add(1, 'days');
            if (newDate.day() !== Sunday && newDate.day() !== Saturday) {
                daysRemaining--;
            }
        }
        while (daysRemaining < 0) {
            newDate.add(-1, 'days');
            if (newDate.day() !== Sunday && newDate.day() !== Saturday) {
                daysRemaining++;
            }
        }
    }
    else {
        while (daysRemaining > 0) {
            newDate.add(1, 'days');
            daysRemaining--;
        }
        while (daysRemaining < 0) {
            newDate.add(-1, 'days');
            daysRemaining++;
        }
    }
    return newDate;
}
function getBusinessDays(startDate, endDate) {
    var currentDate = startDate.clone();
    var businessDays = 0;
    var isWeekEndExclude = JSON.parse($('#isWeekEndExclude').val().toLowerCase())
    if (isWeekEndExclude) {
        while (currentDate.isBefore(endDate)) {
            if (currentDate.day() !== 0 && currentDate.day() !== 6) {
                businessDays++;
            }
            currentDate.add(1, 'days');
        }
    }
    else {
        while (currentDate.isBefore(endDate)) {
            businessDays++;
            currentDate.add(1, 'days');
        }
    }
    return businessDays;
}
function PMUMappingDataCompare(Action, FromVersionChange = 0) {

    //Action 1 ---> Compare without resource,files and remarks remaining all data
    //Action 2 ---> Compare with all the data

    if ($.fn.DataTable.isDataTable('#pmumapping')) {

        if (isSavable == 1) {

            var PMUMappings = [];
            var Documents = [];
            var Remarks = [];

            var projectId = 0;
            var hubId = 0;
            var currentWorkingVersion = "";

            if (Action == 2) {
                projectId = lastSelectedProject;
                hubId = lastSelectedHub;
            }
            else if (Action == 1) {
                projectId = parseInt($('#ProjectId').val());
                hubId = parseInt($('#Hub option:selected').val());
            }

            // If it is from version dropdown change then we should take the already selected version and check the mapping
            currentWorkingVersion = ($('#Version option:selected').text() == null) ? '' : $('#Version option:selected').text();
            currentWorkingVersion = FromVersionChange == 1 ? lastSelectedVersion : currentWorkingVersion;

            // Resetting the flag's to true
            isPMUMappingNotModified = true;
            isDatesNotModified = true;

            // This code has been written to avoid checking the for old version data
            if ((FromVersionChange == 1 && currentWorkingVersion == $('#currentSavedLatestVersion').val()) || FromVersionChange == 0) {

                $.ajax({
                    url: ROOT + 'ProjectTracker/GetPMUDataToCompare',
                    type: 'POST',
                    dataType: 'JSON',
                    async: false,
                    data: {
                        projectId: projectId,
                        HubId: hubId,
                        CurrentSelectedVersion: currentWorkingVersion
                    },
                    success: function (result) {
                        if (result) {
                            PMUMappings = result.PMUMappingDetails;
                            Documents = result.DocumentDetails;
                            Remarks = result.RemarkDetails;
                        }
                        else {
                            alert("Error Occured :" + result);
                        }
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });

                var CurrentPMUMappings = [];
                var CurrentDocuments = structuredClone(documentDetails);
                var CurrentRemarks = structuredClone(remarksDetails);

                $('#pmumapping').dataTable().$('tr').each(function (i, obj) {

                    var wbsHeader = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
                    var headerid = $(obj).attr('data-headerid');
                    var task = $(obj).find('[data-task]').attr('data-task');
                    var dependency = $(obj).find('[data-dependency]').val();
                    var duration = $(obj).find('[data-duration]').val();
                    var startdate = $(obj).find('[data-startdate]').val();
                    var enddate = $(obj).find('[data-enddate]').val();
                    var percentage = $(obj).find('[data-percentage]').val() !== null && $(obj).find('[data-percentage]').val() !== '' && typeof ($(obj).find('[data-percentage]').val()) !== "undefined" ? parseFloat($(obj).find('[data-percentage]').val()) : 0;
                    var remarks = $(obj).find('[data-remarks]').val().trim();
                    var projectId = $('#ProjectId').val();
                    var rowNo = $(obj).find('[data-slno]').attr('data-slno');
                    var files = $(obj).find("[data-files]")[0].files;
                    var relationId = $(obj).attr('data-relationid');
                    var resources = $(obj).find('[data-resources]').val();

                    // wbs header
                    if (headerid !== null && headerid !== '' && typeof (headerid) !== "undefined" &&
                        wbsHeader !== null && wbsHeader !== '' && typeof (wbsHeader) !== "undefined") {
                        // to handel documents
                        $.each(files, function (fileIndex, file) {
                            if (file.size > 0) {
                                var timestamp = moment().valueOf();

                                var document = {
                                    SlNo: parseInt(rowNo),
                                    WBSHeader: parseInt(wbsHeader),
                                    Task: 0,
                                    ProjectId: parseInt(projectId),
                                    DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
                                };
                                CurrentDocuments.push(document);
                            }
                        });

                        // to handel remarks
                        if (remarks != "" && remarks != null && remarks != undefined) {
                            var remark = {
                                SlNo: parseInt(rowNo),
                                WBSHeader: parseInt(wbsHeader),
                                Task: 0,
                                ProjectId: parseInt(projectId),
                                RemarkDesc: remarks
                            };
                            CurrentRemarks.push(remark);
                        }

                        var pmuMappings = {
                            WBSHeader: parseInt(wbsHeader),
                            Task: 0,
                            RelationId: 0,
                            Dependency: dependency,
                            Duration: parseInt(duration),
                            StartDate: moment(startdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                            EndDate: moment(enddate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                            Percentage: parseFloat(percentage),
                            ProjectId: parseInt(projectId),
                            slNo: parseInt(rowNo),
                            resources: ""
                        }

                        CurrentPMUMappings.push(pmuMappings);

                    }

                    // task
                    if (relationId !== null && relationId !== '' && typeof (relationId) !== "undefined" &&
                        task !== null && task !== '' && typeof (task) !== "undefined") {
                        // to handel documents
                        $.each(files, function (fileIndex, file) {
                            if (file.size > 0) {
                                var timestamp = moment().valueOf();

                                var document = {
                                    SlNo: parseInt(rowNo),
                                    WBSHeader: 0,
                                    Task: parseInt(task),
                                    ProjectId: parseInt(projectId),
                                    DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
                                };
                                CurrentDocuments.push(document);
                            }
                        });

                        // to handel remarks
                        if (remarks != "" && remarks != null && remarks != undefined) {
                            var remark = {
                                SlNo: parseInt(rowNo),
                                WBSHeader: 0,
                                Task: parseInt(task),
                                ProjectId: parseInt(projectId),
                                RemarkDesc: remarks
                            };
                            CurrentRemarks.push(remark);
                        }

                        var pmuMappings = {
                            WBSHeader: 0,
                            Task: parseInt(task),
                            RelationId: parseInt(relationId),
                            Dependency: dependency,
                            Duration: parseInt(duration),
                            StartDate: moment(startdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                            EndDate: moment(enddate, "DD/MM/YYYY").format("YYYY-MM-DD"),
                            Percentage: parseFloat(percentage),
                            slNo: parseInt(rowNo),
                            resources: resources
                        }

                        CurrentPMUMappings.push(pmuMappings);
                    }

                });

                if (Action == 1) {

                    if (PMUMappings.length !== CurrentPMUMappings.length) {
                        isDatesNotModified = false;
                    }
                    else {
                        for (var i = 0; i < CurrentPMUMappings.length; i++) {

                            var currentSlNo = CurrentPMUMappings[i].slNo;
                            var filteredMappings = PMUMappings.filter(mapping => mapping.SlNo === currentSlNo);

                            if (filteredMappings.length === 0) {
                                isDatesNotModified = false;
                                break;
                            }
                            else {
                                var currentMapping = CurrentPMUMappings[i];
                                var mapping = filteredMappings[0];
                                var Dependency = mapping.Dependency == null ? "" : mapping.Dependency;
                                var StartDate = moment(currentMapping.StartDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
                                var EndDate = moment(currentMapping.EndDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
                                if (
                                    currentMapping.WBSHeader !== mapping.WBSHeaderId ||
                                    currentMapping.Dependency !== Dependency ||
                                    currentMapping.Duration !== mapping.Duration ||
                                    StartDate !== mapping.StartDate ||
                                    EndDate !== mapping.EndDate ||
                                    currentMapping.RelationId !== mapping.Relation ||
                                    currentMapping.Percentage !== mapping.TaskPercentage ||
                                    currentMapping.slNo !== mapping.SlNo ||
                                    currentMapping.Task !== mapping.TaskId
                                ) {
                                    isDatesNotModified = false;
                                    break;
                                }
                            }

                        }
                    }
                }
                else if (Action == 2) {

                    var currentWeekendFlag = "";
                    var currentKPIFlag = "";

                    if ($('#currentSavedLatestVersion').val() == "" || $('#currentSavedLatestVersion').val() == "Latest") {
                        currentWeekendFlag = $("#weekend-switching").val();
                        currentKPIFlag = $("#YesOrNoKPI").val();
                    }
                    else {
                        currentWeekendFlag = $("#weekend-selected").text();
                        currentKPIFlag = $("#kpi-selected").text();

                        if (currentWeekendFlag == "Included") {
                            currentWeekendFlag = "False";
                        }
                        else {
                            currentWeekendFlag = "True"
                        }

                        if (currentKPIFlag == "No") {
                            currentKPIFlag = "0";
                        }
                        else {
                            currentKPIFlag = "1"
                        }
                    }

                    if (
                        // checking kpi and weekend flag
                        (alreadySavedWeekendFlag != currentWeekendFlag) ||
                        (alreadySavedKPIFlag != currentKPIFlag)
                    ) {
                        isPMUMappingNotModified = false;
                    }
                    else {
                        // checking doc, rem & pmumapping array length
                        if (
                            PMUMappings.length !== CurrentPMUMappings.length ||
                            Documents.length !== CurrentDocuments.length || // Comparing already saved and current doc
                            documentDetails.length !== CurrentDocuments.length || // Comparing current modified (deleted) and current doc
                            Remarks.length !== CurrentRemarks.length
                        ) {
                            isPMUMappingNotModified = false;
                        }
                        else {
                            // checking PMU Mappings data
                            for (var i = 0; i < CurrentPMUMappings.length; i++) {

                                var currentSlNo = CurrentPMUMappings[i].slNo;
                                var filteredMappings = PMUMappings.filter(mapping => mapping.SlNo === currentSlNo);

                                if (filteredMappings.length === 0) {
                                    isPMUMappingNotModified = false;
                                    break;
                                }
                                else {
                                    var currentMapping = CurrentPMUMappings[i];
                                    var mapping = filteredMappings[0];
                                    var Dependency = mapping.Dependency == null ? "" : mapping.Dependency;
                                    var StartDate = moment(currentMapping.StartDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
                                    var EndDate = moment(currentMapping.EndDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
                                    if (
                                        currentMapping.WBSHeader !== mapping.WBSHeaderId ||
                                        currentMapping.Dependency !== Dependency ||
                                        currentMapping.Duration !== mapping.Duration ||
                                        StartDate !== mapping.StartDate ||
                                        EndDate !== mapping.EndDate ||
                                        currentMapping.RelationId !== mapping.Relation ||
                                        currentMapping.Percentage !== mapping.TaskPercentage ||
                                        currentMapping.slNo !== mapping.SlNo ||
                                        currentMapping.Task !== mapping.TaskId ||
                                        currentMapping.resources !== mapping.Resources
                                    ) {
                                        isPMUMappingNotModified = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

            }

        }
    }
}
function confirmWithVersion(msg, func, func1) {

    $("#VersionRemarks").val('');

    PMUMappingDataCompare(1);

    var flag = $("#currentSavedLatestVersion").val()?.includes("Baseline");

    if (flag && isDatesNotModified == false) {
        $('#VersionPopupMessage').empty().html('A new version "<b> ' + NextVersion + ' </b>" will be created on clicking <b>save</b>');
        $("#VersionPopupNewVersion").empty().text('Save');
    }
    else if (flag && isDatesNotModified == true) {
        $('#VersionPopupMessage').empty().html("Are you sure, Do you want to save?");
    }
    else {
        $('#VersionPopupMessage').empty().html(msg);
    }

    $('#versionpopup').modal('show');

    //How this will work is while opening the popup it will bind all the condition and make the button ready

    // for version's above version 1
    if (func) {
        $('#VersionRemarks').show();
        $('#VersionRemarks').attr("placeholder", "Version Remarks*");
        $("#VersionPopupNewVersion").show();
        $("#VersionPopupNoVersion").show();
        $("#VersionPopupSave").hide();

        $("#VersionPopupNewVersion").unbind("click");
        $('#VersionPopupNewVersion').on("click", func);
    }

    // for Baseline version with dates modification (for save as version 1)
    if (func1) {
        if (($("#Version").val())?.includes("Baseline")) {
            $("#VersionPopupNoVersion").hide();
        }
        else {
            $('#VersionRemarks').show();
            $('#VersionRemarks').attr("placeholder", "Version Remarks*");
            $("#VersionPopupSave").hide();
            $("#VersionPopupNoVersion").unbind("click");
        }
        $('#VersionPopupNoVersion').on("click", func1);
    }

    // for Baseline version with No dates modification
    if (func1) {
        if (($("#Version").val())?.includes("Baseline")) {

            $("#VersionPopupNoVersion").hide();
            if (isDatesNotModified) {
                $('#VersionRemarks').show();
                $('#VersionRemarks').attr("placeholder", "Version Remarks");
                $("#VersionPopupNewVersion").hide();
                $("#VersionPopupSave").show();
                $("#VersionPopupSave").unbind("click");
            }
        }
        $('#VersionPopupSave').on("click", func1);
    }
}
function confirmWithTempalte(msg, func, func1) {
    $('#confirmpopupmesssage').empty().html(msg);
    $('#confirmpopup').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }
    if (func1) {
        $("#Confirmcancelbutton").unbind("click");
        $('#Confirmcancelbutton').on("click", func1);
    }
}
function confirmWithEndDateDependentAlert(msg, func, func1) {
    $('#dependentAlertTable').empty().html(msg);
    $('#dependentMilestonesAlert').modal('show');
    if (func) {
        $("#dependentMilestonesAlertYes").unbind("click");
        $('#dependentMilestonesAlertYes').on("click", func);
    }
    if (func1) {
        $("#dependentMilestonesAlertNo").unbind("click");
        $('#dependentMilestonesAlertNo').on("click", func1);
    }
}
function confirmWithStartDateDependentAlert(msg, func) {
    $('#confirmpopupmesssage').empty().html(msg);
    $('#confirmpopup').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }
}
function handelConfirmRemarksPopup(msg, func) {

    $('#save-with-remarks-msg').empty().html(msg);
    $("#with-remarks-data").val("");
    $('#save-with-remarks-popup').modal('show');
    $('.hide-remarks-div .star').addClass('hide');

    if (func) {
        $("#save-confirm").unbind("click");
        $('#save-confirm').on("click", func);
    }

}
function handelConfirmPopup(msg, func, func1, func2) {

    $("#resource-req-scope-change").val("0");

    $('#confirmpopupmesssage1').empty().html(msg);
    $('#confirmpopup1').modal('show');

    if (func) {
        $("#ConfirmYesbutton1").unbind("click");
        $('#ConfirmYesbutton1').on("click", func);
    }
    if (func1) {
        $("#ConfirmNobutton1").unbind("click");
        $('#ConfirmNobutton1').on("click", func1);
    }
    if (func2) {
        $(".ConfirmCancelbutton1").unbind("click");
        $('.ConfirmCancelbutton1').on("click", func2);
    }

}

function UnsavedDataAlert(msg, func, func1, func2) {

    $('#unsavedmessage').empty().html(msg);
    $('#UnsavedChangesAlert').modal('show');
    if (func) {
        $("#saveunsavedchanges").unbind("click");
        $('#saveunsavedchanges').on("click", func);
    }
    if (func1) {
        $("#continueunsavedchanges").unbind("click");
        $('#continueunsavedchanges').on("click", func1);
    }
    if (func2) {
        $("#unsavedchangesclose").unbind("click");
        $('#unsavedchangesclose').on("click", func2);
    }

}
function showDependency(e) {

    var $currentTr = $(e).closest('tr');
    var dependencyInputVal = $(e).siblings('input').val();
    var rowNo = $($currentTr).find('[data-slno]').attr('data-slno');
    var taskDesc = $($currentTr).find('[data-task]').val();

    $('#SelectedRow').text(rowNo);
    $('#SelectedTask').text(taskDesc);
    $('#dependency').modal('show');
    $('#dependencyTable tbody').html('');

    if (dependencyInputVal !== null && dependencyInputVal !== '' && typeof (dependencyInputVal) !== "undefined") {
        $.each(dependencyInputVal.split(","), function (i, obj) {
            var index = obj.indexOf('F') > -1 ? obj.indexOf('F') : obj.indexOf('S');
            var dependentRow = obj.substr(0, index);
            var type = obj.substr(index, 2);
            var leadOrLagIndex = obj.indexOf('+') > -1 ? obj.indexOf('+') : obj.indexOf('-');
            var leadOrLag = obj.substr(leadOrLagIndex, obj.length);
            var task = $('#row_' + dependentRow).find('[data-task]').val();
            var tr = '<tr>' +
                '<td><input type="text" class="form-control text-center" value="' + dependentRow + '" data-predecessor="" /></td>' +
                '<td data-predecessortask="">' + task + '</td>' +
                '<td>' +
                '<select class="form-control" data-predecessortype="">' +
                '<option value="">Select</option>' +
                (type === "FS" ? '<option value="FS" selected>Finish to Start (FS)</option>' : '<option value="FS">Finish to Start (FS)</option>') +
                (type === "SS" ? '<option value="SS" selected>Start to Start (SS)</option>' : '<option value="SS">Start to Start (SS)</option>') +
                '</select>' +
                '<span class="hide text-danger">Please select type<span>' +
                '</td>' +
                '<td><input type="text" class="form-control text-center" data-predecessorleadorlag="" value="' + leadOrLag + '" /></td>' +
                '<td class="text-center"><div class="action_width"><a class="trash_icon ml-2" onclick="deletePredecessorRow(this)"><i class="fas fa-trash" title="Delete"></i></a></div></td>' +
                '</tr>';
            $('#dependencyTable tbody').append(tr);
        });
    }
    var nextTr = '<tr>' +
        '<td><input type="text" class="form-control" value="" data-predecessor="" /></td>' +
        '<td data-predecessortask="">' + '</td>' +
        '<td>' +
        '<select class="form-control" data-predecessortype="">' +
        '<option value="">Select</option>' +
        '<option value="FS">Finish to Start (FS)</option>' +
        '<option value="SS">Start to Start (SS)</option>' +
        '</select>' +
        '<span class="hide text-danger">Please select type<span>' +
        '</td>' +
        '<td><input type="text" class="form-control" data-predecessorleadorlag="" value="" /></td>' +
        '<td class="text-center"><div class="action_width"><a class="trash_icon ml-2" onclick="deletePredecessorRow(this)"><i class="fas fa-trash" title="Delete"></i></a></div></td>' +
        '</tr>';
    $('#dependencyTable tbody').append(nextTr);
}
function deletePredecessorRow(e) {
    var currentTr = $(e).closest('tr');
    $(currentTr).remove();
}
function showDocuments(e, Action = 1) {

    var $tr = $(e).closest('tr');
    var rowNo = parseInt($($tr).find('[data-slno]').attr('data-slno'));

    $('#documents').modal('show');
    var documentheadertask = $('#row_' + rowNo).find('[data-task]').val() !== '' ? 2 : 1;
    var labelForDocument = '';
    var valueForHeaderDocument = '';
    if (documentheadertask == 1) {
        labelForDocument = "WBS Header: ";
        valueForHeaderDocument = $('#row_' + rowNo).find('[data-wbsheader]').val();
    }
    else {
        labelForDocument = "Task: ";
        valueForHeaderDocument = $('#row_' + rowNo).find('[data-task]').val();
    }
    $('.documents-label').text(labelForDocument);
    $('#documentsSelectedRow').text(valueForHeaderDocument);
    $('#documentsTable tbody').html("");
    var filteredDocuments = documentDetails.filter(function (o) {
        return parseInt(o.SlNo) === parseInt(rowNo);
    });
    var result = filteredDocuments.filter(function (filteredDoc) {
        return !deletedDocumentsArray.some(function (deletedDoc) {
            return filteredDoc.DocumentName === deletedDoc.DocumentName;
        });
    });

    if (Action != 0) {
        $.each(result, function (i, obj) {
            $('#documentsTable tbody').append('<tr>' +
                '<td data-documentname="' + obj.DocumentName + '">' + obj.DocumentName + '</td>' +
                '<td>' + obj.SubmittedBy + '</td>' +
                '<td>' + obj.SubmittedOn + '</td>' +
                '<td class="text-center action_icons"><a href="' + ROOT + 'PMUMappingsUploads/' + obj.ProjectId + '/' + obj.SlNo + '/' + obj.DocumentName + '" download><i class="fas fa-download color-download" title="Download"></i></a>' +
                '<a class="trash_icon ml-2" onclick="DeleteDocument(this,' + rowNo + ')"><i class="fas fa-trash"  title="Delete" ></i></a>' +
                '</td>' +
                '</tr>');
        });
    }
    else if (Action == 0) {
        $.each(filteredDocuments, function (i, obj) {
            $('#documentsTable tbody').append('<tr>' +
                '<td data-documentname="' + obj.DocumentName + '">' + obj.DocumentName + '</td>' +
                '<td>' + obj.SubmittedBy + '</td>' +
                '<td>' + obj.SubmittedOn + '</td>' +
                '<td class="text-center action_icons"><a href="' + ROOT + 'PMUMappingsUploads/' + obj.ProjectId + '/' + obj.SlNo + '/' + obj.DocumentName + '" download><i class="fas fa-download color-download" title="Download"></i></a>' +
                '</td>' +
                '</tr>');
        });
    }
}
function DeleteDocument(e, rowNo) {
    confirm("Are you sure, do you want to delete?", function () {

        var currentTr = $(e).closest('tr');
        var documentName = $(currentTr).find('[data-documentname]').attr('data-documentname');
        var deleteRowArray = documentDetails.filter(function (o) { return o.SlNo === rowNo && o.DocumentName === documentName });

        // adding to deletedDocumentsArray
        $.each(deleteRowArray, function (i, obj) {
            deletedDocumentsArray.push(obj);
        });

        // removing from documentDetails
        documentDetails = documentDetails.filter(function (o) { return o.DocumentName !== documentName });

        $(currentTr).remove();

        var currentRowDocumentCount = documentDetails.filter(item => item.SlNo === rowNo);

        if (currentRowDocumentCount.length == 0) {
            var currentFileIcon = $("#row_" + rowNo).find(".show-file-icon")
            $('.fa-history').each(function () {
                currentFileIcon.css('display', 'none');
            });
        }

    });
}
function showRemarks(e) {

    var $tr = $(e).closest('tr');
    var rowNo = parseInt($($tr).find('[data-slno]').attr('data-slno'));

    $('#remarks').modal('show');
    var remarksheadertask = $('#row_' + rowNo).find('[data-task]').val() !== '' ? 2 : 1;
    var labelForremarks = '';
    var valueForHeaderremarks = '';
    if (remarksheadertask == 1) {
        labelForremarks = "WBS Header: ";
        valueForHeaderremarks = $('#row_' + rowNo).find('[data-wbsheader]').val();
    }
    else {
        labelForremarks = "Task: ";
        valueForHeaderremarks = $('#row_' + rowNo).find('[data-task]').val();
    }
    $('.remarks-label').text(labelForremarks);
    $('#remarksSelectedRow').text(valueForHeaderremarks);
    $('#remarksTable tbody').html("");
    var filteredRemarks = remarksDetails.filter(function (o) {
        return parseInt(o.SlNo) === parseInt(rowNo);
    });
    $.each(filteredRemarks, function (i, obj) {
        $('#remarksTable tbody').append('<tr>' +
            '<td class="remark_td">' + obj.RemarkDesc + '</td>' +
            '<td>' + obj.SubmittedBy + '</td>' +
            '<td>' + obj.SubmittedOn + '</td>' +
            '</tr>');
    });
}
function GetNotesData() {

    $("#notes_msg").text('')
    $("#notes_msg").removeClass("text-red")
    $("#notes_msg").removeClass("text-success")
    var isValid = true;
    var hubId = parseInt($('#Hub').val())
    var projectId = parseInt($('#ProjectId').val())
    if (hubId === 0 && projectId === 0) {
        alert("Please Select Project and HUB")
        isValid = false;
        return false
    }
    else if (projectId == 0) {
        alert("Please select Project");
        isValid = false
    }
    else if (hubId == 0) {
        alert("Please select Hub");
        isValid = false
    }
    else {
        if (isValid) {
            $("#notesmodal").modal("show");
            CreateNotesModal(hubId, projectId);
            $("#Hub_text").text($('#Hub option:selected').text());
            $("#project_text").text($("#ProjectId :selected").text());
        }
    }

}
function CreateNotesModal(hubid, projectid) {
    $.ajax({
        url: ROOT + 'ProjectTracker/GetNotes',
        type: 'GET',
        data: {
            HubId: hubid, ProjectId: projectid
        },
        success: function (result) {
            notesData = result
            $.jgrid.gridUnload('#viewlist');
            createModalGrid();
        },
        error: function () {
            alert("An Error occured!!");
        }
    });
}
function createModalGrid() {

    $("#viewlist").jqGrid({
        url: '',
        datatype: 'local',
        data: notesData,
        mtype: 'GET',
        colModel: remarkscolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected1',
        rowNum: 200,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#viewlist tbody tr");
            var objHeader = $("#viewlist tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

    $('#viewlist').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#viewlist').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#viewlist').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#viewlist').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#viewlist').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#viewlist').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#viewlist').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

}
function getWbsHeaderGrid() {

    $(".Err-exists-wbsheader").hide();
    $(".Err-empty-wbsheader").hide();
    $("#new-wbsheader").val('');
    $.jgrid.gridUnload('#wbsheader-grid');

    wbsheadergridColModels = [

        {
            name: 'WBSHeaderId',
            label: 'Action',
            resizable: true,
            ignoreCase: true,
            align: 'center',
            width: 40,
            key: true,
            search: false,

            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsApproved == false) {
                    var Action_wbs = 1;
                    return '<div></button > <a class="trash_icon" onclick="deleteWbsheaderTask(' + cellvalue + ',' + Action_wbs + ',this)"><i class="fas fa-trash" title="Delete"></i></a></div>'
                }
                else {
                    return ''
                }

            }
        },
        {
            name: 'WBSHeaderDesc',
            label: 'WBS Header',
            resizable: true,
            ignoreCase: true,
            width: 220,
        },
    ],

        $("#wbsheader-grid").jqGrid({
            url: '',
            datatype: 'local',
            data: autocompleteDrodownArray.hasOwnProperty('WBSHeader') ? autocompleteDrodownArray['WBSHeader'] : [],
            mtype: 'GET',
            colModel: wbsheadergridColModels,
            loadonce: true,
            viewrecords: true,
            pager: '#wbsheadergrid-pager',
            rowNum: 20,
            scroll: 1,


            gridComplete: function () {
                var objRows = $("#wbsheader-grid tbody tr");
                var objHeader = $("#wbsheader-grid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
            }

        });

    $("#wbsheader-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#wbsheader-grid').closest('.jqg-first-row-header').hide();
    $('#wbsheader-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '22vh' });
    $('#wbsheader-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#wbsheader-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#wbsheader-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#wbsheader-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#wbsheader-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#wbsheader-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
function getTaskGrid() {

    $(".Err-empty-task").hide();
    $(".Err-exists-task").hide();
    $(".Err-kpi-task").hide();
    $("#YesNoProperty").val("0").trigger("change");
    var roleId = $("#RoleId").val()
    parseInt(roleId) === 1 ? $(".isAdmin").show() : $(".isAdmin").hide()
    $("#new-task").val('');
    $.jgrid.gridUnload('#task-grid');
    KPIarray = autocompleteDrodownArray.Task.filter(function (m) {
        return m.IsKPI == true
    });
    var userRole = parseInt($('#userRole').val());

    taskgridColModels = [
        {
            name: 'TaskId',
            label: 'Action',
            resizable: true,
            ignoreCase: true,
            align: 'center',
            width: 40,
            key: true,
            search: false,
            formatter: function (cellvalue, options, rowobject) {

                if (rowobject.IsApproved == false) {
                    if (userRole != 1 && rowobject.IsKPI == true) {
                        return '';
                    }
                    else {
                        var Action_task = 2;
                        return '<div></button > <a class="trash_icon"  onclick="deleteWbsheaderTask(' + cellvalue + ',' + Action_task + ',this)"><i class="fas fa-trash" title="Delete"></i></a></div>'
                    }
                }
                else {
                    return ''
                }
            }
        },
        {
            name: 'TaskDesc',
            label: 'Task',
            resizable: true,
            ignoreCase: true,
            width: 220,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsKPI == true) {
                    return '<span class="color-red">' + cellvalue + '</span>';
                }

                else {
                    return cellvalue
                }
            }

        },
    ],

        $("#task-grid").jqGrid({
            url: '',
            datatype: 'local',
            data: autocompleteDrodownArray.hasOwnProperty('Task') ? autocompleteDrodownArray['Task'] : [],
            mtype: 'GET',
            colModel: taskgridColModels,
            loadonce: true,
            viewrecords: true,
            pager: '#taskgrid-pager',
            rowNum: 20,
            scroll: 1,


            gridComplete: function () {
                var objRows = $("#task-grid tbody tr");
                var objHeader = $("#task-grid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
            }

        });

    $("#task-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#task-grid').closest('.jqg-first-row-header').hide();
    $('#task-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '22vh' });
    $('#task-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#task-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#task-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#task-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#task-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#task-grid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}
function saveNewWbsHeaderTask(Action) {
    // wbsheader means will pass 1
    // task means will pass 2
    var newData = "";
    var type = "";

    if (Action == 1) {
        newData = $("#new-wbsheader").val().trim();
        newData = newData.replace(/\s+/g, ' ');
        type = "WBSHeader";
        kpitask = false

    }
    else if (Action == 2) {
        newData = $("#new-task").val().trim();
        newData = newData.replace(/\s+/g, ' ');
        type = "Task";
        var kpitask = parseInt($("#YesNoProperty").val()) === 1 ? true : false
    }

    $.ajax({
        url: ROOT + 'ProjectTracker/SaveNewWBSHeaderTask',
        type: 'POST',
        dataType: 'JSON',
        data: {
            newData: newData,
            type: type,
            kpitask: kpitask
        },
        success: function (response) {

            var message = response.Item1;
            var newId = response.Item2;

            if (message.toLowerCase().includes("successfully")) {

                if (type.toLowerCase() == "task") {
                    autocompleteDrodownArray['Task'].unshift({
                        TaskId: newId,
                        TaskDesc: newData,
                        IsApproved: 0,
                        IsKPI: kpitask
                    });

                    $.jgrid.gridUnload('#task-grid');

                    getTaskGrid();
                    $("#new-task").val('');
                    $(".alt-saved-task").show().delay(3000).fadeOut();

                }
                else if (type.toLowerCase() == "wbsheader") {
                    autocompleteDrodownArray['WBSHeader'].unshift({
                        WBSHeaderId: newId,
                        WBSHeaderDesc: newData,
                        IsApproved: 0,

                    });

                    $.jgrid.gridUnload('#wbsheader-grid');
                    getWbsHeaderGrid();
                    $("#new-wbsheader").val('');
                    $(".alt-saved-wbsheader").show().delay(3000).fadeOut();

                }
                else {
                    alert('Error Occured: ' + result);
                }
            }
        },
        error: function (e) {
            alert('<b>Error Occured</b> : ' + e);
        }
    })

}
function deleteWbsheaderTask(deleteId, Action, obj) {
    // wbsheader means will pass 1
    // task means will pass 2
    $("#ConfirmDelete").modal("show");
    $('#deleteok').off('click').on('click', function () {

        var closestRow = $(obj).closest("tr.jqgrow");
        var rowId = parseInt(closestRow.attr("id"));

        if (Action == 1) {
            Action = "WBSHeader";
        }
        else if (Action == 2) {
            Action = "Task";
        }

        $.ajax({
            url: ROOT + 'ProjectTracker/DeleteWBSHeaderTask',
            type: 'POST',
            dataType: 'JSON',
            data: {
                deleteId: deleteId,
                type: Action
            },
            success: function (response) {

                var result = response.result;

                if (result.toLowerCase().includes("successfully")) {

                    if (Action.toLowerCase() == "task") {

                        autocompleteDrodownArray['Task'] = autocompleteDrodownArray['Task'].filter(item => item.TaskId != rowId)
                        $.jgrid.gridUnload('#task-grid');
                        getTaskGrid();
                        $(".alt-delete-task").show().delay(3000).fadeOut();

                    }
                    else if (Action.toLowerCase() == "wbsheader") {

                        autocompleteDrodownArray['WBSHeader'] = autocompleteDrodownArray['WBSHeader'].filter(item => item.WBSHeaderId != rowId)
                        $.jgrid.gridUnload('#wbsheader-grid');
                        getWbsHeaderGrid();
                        $(".alt-delete-wbsheader").show().delay(3000).fadeOut();

                    }
                    else {
                        alert('Error Occured: ' + result);
                    }

                }
            },
            error: function (e) {
                alert('<b>Error Occured</b> : ' + e);
            }
        })
    });
}
function findLargestTemplateId() {
    const largestId = autocompleteDrodownArray['Template']
        .map(template => template.TemplateId)
        .reduce((max, currentId) => Math.max(max, currentId), 0);
    return largestId;
}
function saveTemplateData(TemplateName) {

    var formData = new FormData();
    var pmuMappingsTemplateArray = [];

    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
        var wbsHeader = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
        var headerid = $(obj).attr('data-headerid');
        var task = $(obj).find('[data-task]').attr('data-task');
        var dependency = $(obj).find('[data-dependency]').val();
        var duration = $(obj).find('[data-duration]').val();
        var projectId = $('#ProjectId').val();
        var rowNo = $(obj).find('[data-slno]').attr('data-slno');
        var relationId = $(obj).attr('data-relationid');

        if (headerid !== null && headerid !== '' && typeof (headerid) !== "undefined" &&
            wbsHeader !== null && wbsHeader !== '' && typeof (wbsHeader) !== "undefined") {
            var pmuMappings = {
                WBSHeader: parseInt(wbsHeader),
                Task: 0,
                RelationId: 0,
                Dependency: dependency,
                Duration: parseInt(duration),
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
            }
            pmuMappingsTemplateArray.push(pmuMappings);
        }

        if (relationId !== null && relationId !== '' && typeof (relationId) !== "undefined" &&
            task !== null && task !== '' && typeof (task) !== "undefined") {
            var pmuMappings = {
                WBSHeader: 0,
                Task: parseInt(task),
                RelationId: parseInt(relationId),
                Dependency: dependency,
                Duration: parseInt(duration),
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
            }
            pmuMappingsTemplateArray.push(pmuMappings);
        }
    })

    formData.append("PMUMappings", JSON.stringify(pmuMappingsTemplateArray));
    formData.append("TemplateName", TemplateName);

    $.ajax({
        url: ROOT + 'ProjectTracker/SaveNewTemplate',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            if (response.toLowerCase().includes("successfully")) {

                $("#new-template-name").val('');
                $(".err-exists-template").hide();
                $(".err-need-template").hide();
                $("#save-as-template-popup").modal("hide");
                autocompleteDrodownArray['Template'].unshift({
                    TemplateId: findLargestTemplateId() + 1,
                    TemplateName: TemplateName
                })
                smartSheetCalculation(0);
                alert(response);
            }
            else {
                alert(response);
            }
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

}
function getkpiGrid(pendingkpidata) {

    $.jgrid.gridUnload('#kpigrid');

    kpigridColModels = [
        {
            name: 'TaskDesc',
            label: 'Task',
            resizable: true,
            ignoreCase: true,
            width: 60,
        },
    ],

        $("#kpigrid").jqGrid({
            url: '',
            datatype: 'local',
            data: pendingkpidata,
            mtype: 'GET',
            colModel: kpigridColModels,
            loadonce: true,
            viewrecords: true,
            pager: '#kpipager',
            rowNum: 20,
            scroll: 1,
            gridComplete: function () {
                var objRows = $("#kpigrid tbody tr");
                var objHeader = $("#kpigrid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }
            }

        });

    $("#kpigrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#kpigrid').closest('.jqg-first-row-header').hide();
    $('#kpigrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': '22vh' });
    $('#kpigrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#task-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#kpigrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#kpigrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "6px");
    }
    else {
        $('#kpigrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#kpigrid').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}
function GetCloneData() {

    var hubId = parseInt($('#Hub').val());
    var projectId = parseInt($('#ProjectId').val());

    $('#MappedHubId').val("").trigger('change');
    $('#MappedProjectId').val("").trigger('change');

    var isValid = true;

    if (projectId == 0 && hubId == 0) {
        alert("Please select Project and Hub");
        isValid = false;
    }
    else if (projectId == 0) {
        alert("Please select Project");
        isValid = false
        return false;
    }
    else if (hubId == 0) {
        alert("Please select Hub");
        isValid = false
        return false;
    }
    else {
        if (isValid) {

            $("#To_Project").text($("#ProjectId :selected").text());
            $("#To_Hub").text($('#Hub option:selected').text());
            $("#resource-req").val("0"); // By default No

            $("#cloneModal").modal("show");

        }
    }

}
function loadClonedProjectHubData(projectId, hubId, isResourceRequired, isFromAutoClone, projectName, hubName, isEmptyTable = 0) {

    remarksDetails = [];
    documentDetails = [];

    $.ajax({
        url: ROOT + 'ProjectTracker/PV_PMUMappingTableClone',
        type: 'POST',
        async: false,
        cache: false,
        dataType: 'HTML',
        data: {
            CloneFromProjectId: projectId,
            CloneFromHubId: hubId,
            CloneFromProjectName: projectName,
            CloneFromHubName: hubName,

            ProjectId: parseInt($('#ProjectId').val()),
            HubId: parseInt($('#Hub option:selected').val()),
            Version: $('#Version option:selected').text() == null ? '' : $('#Version option:selected').text(),
            IsResourceRequired: parseInt(isResourceRequired),
            IsEmptyTable: isEmptyTable,
            IsFromAutoClone: isFromAutoClone,
            IsScopeChange: isScopeChanged,
            IsCloneAccepted: isCloneAccepted,

            ApprovedLatestVersion: isScopeChanged == 1 ? "" : $('#currentSavedLatestVersion').val(),
            ApprovedLatestVersionGroup: isScopeChanged == 1 ? "" : $('#currentSavedLatestVersionGroup').val(),
            CurrentWorkingVersion: isScopeChanged == 1 ? "" : $('#currentWorkingVersion').val()
        },
        success: function (result) {

            GenerateDataTable(result);

            ManipulateArrayLoadAutoSuggest(4);

            HideAndShowAllButtons(4);

            SaveTemplateButtonShowHide();

            GenerateKpiTaskSmartSheetCriticalPath();

        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

}
function MissingRowAlert() {

    // Getting the last row id
    var lastRowId = 0;
    $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
        var headerId = $(obj).attr('data-headerid');
        $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').each(function (detailsi, detailsobj) {
            var detailslno = parseInt($(detailsobj).find('[data-slno]').attr('data-slno'));
            lastRowId = detailslno;
        })
    });

    var AvaliableRow = [];
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
        AvaliableRow.push(parseInt($(obj).find('[data-slno]').attr('data-slno')));
    });

    var MissingRow = [];

    for (var index = 1; index <= lastRowId; index++) {
        if (!AvaliableRow.includes(index)) {
            MissingRow.push(index);
        }
    }

    if (MissingRow.length == 0) {
        return true;
    }
    else {
        MissingRow = MissingRow.toString();
        var message = 'S.No: <b>' + MissingRow + '</b> is Missing, Please Add the row'
        alert(message);
        return false;
    }
}
function ValidatePMUMappings(Action) {

    //Action 1 ---> save
    //Action 2 ---> approve

    var ErrorMsg = [];

    var CircularalDependencySlNo = "",
        TaskDependencySlNo = "",
        ExceedDependencySlNo = "",
        WBSDependencySlNo = "",
        slNoToAlert = [],
        lastRowId = 0,
        duplicateTask = [],
        taskNeedToAddOnHeader = [],
        dependencyDependentArray = [],
        startEndDateNeedToAdd = [],
        resourcesNeedToAdd = [],
        wbsHeaderNeedToAdd = [],
        taskNeedToAdd = [],
        durationNeedToAdd = [],
        wbsheaderForTaskToAdd = [],
        headerArray = [],
        taskArray = [],
        InvalidHeader = [],
        result = [];

    // Getting the last row id
    $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
        var headerId = $(obj).attr('data-headerid');
        $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').each(function (detailsi, detailsobj) {
            var detailslno = parseInt($(detailsobj).find('[data-slno]').attr('data-slno'));
            lastRowId = detailslno;
        })
    });


    // 1. Getting InBetween Empty rows
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
        if (i < lastRowId) {

            var count = 0;
            var slNo = parseInt($(obj).find('[data-slno]').attr('data-slno'));

            var wbsheader = $('#row_' + slNo).find('[data-wbsheader]').val();
            if (wbsheader === null || wbsheader === '' || typeof (wbsheader) === "undefined") {
                count++
            }
            var task = $('#row_' + slNo).find('[data-task]').val();
            if (task === null || task === '' || typeof (task) === "undefined") {
                count++
            }
            if (count == 2) {
                slNoToAlert.push(slNo);
            }
        }
    });
    if (slNoToAlert.length > 0) {
        ErrorMsg.push("Empyt row");
        slNoToAlert = slNoToAlert.toString();
    }


    // 2. Getting Duplicates task's slNo
    $('#pmumapping').dataTable().$('[data-relationid]').each(function (detailsi1, detailsobj1) {

        var checkingSlNo = parseInt($(detailsobj1).closest('tr').find('[data-slno]').attr('data-slno'));
        var checkingTaskId = parseInt($(detailsobj1).closest('tr').find('[data-task]').attr('data-task'));

        $('#pmumapping').dataTable().$('[data-relationid]').each(function (detailsi2, detailsobj2) {

            var loopSlNo = parseInt($(detailsobj2).closest('tr').find('[data-slno]').attr('data-slno'));
            var loopTaskId = parseInt($(detailsobj2).closest('tr').find('[data-task]').attr('data-task'));

            if (checkingTaskId == loopTaskId && loopSlNo > checkingSlNo) {
                if (!duplicateTask.includes(loopSlNo)) {
                    duplicateTask.push(loopSlNo);
                }
            }
        });

    });
    if (duplicateTask.length > 0) {
        ErrorMsg.push("Duplicate SlNo");
        duplicateTask = duplicateTask.toString();
    }


    // 3. All dependency related validations
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {

        var dependency = $(obj).find('[data-dependency]').val();
        var slno = $(obj).find('[data-slno]').attr('data-slno');
        var headerIds = [];

        $('#pmumapping').dataTable().$('[data-headerid]').each(function (headeri, headerobj) {
            if ($(headerobj).attr('data-headerid') !== null && $(headerobj).attr('data-headerid') !== '' && typeof ($(headerobj).attr('data-headerid')) !== "undefined") {
                headerIds.push(Number($(headerobj).attr('data-headerid')));
            }
        });

        if (dependency !== null && dependency !== '' && typeof (dependency) !== "undefined") {
            var dependencyArray = dependency.toUpperCase().split(',');
            var newDependencyArray = [];
            $.each(dependencyArray, function (i, obj) {
                var $trlength = $('#pmumapping').dataTable().$('tr').length;
                var pattern = /^\d*(?:FS|SS)[+-]\d+$/;
                if (obj !== null && obj !== '' && typeof (obj) !== "undefined") {
                    var lastTwoCharacters = obj.slice(-2)
                    var testValue = lastTwoCharacters === 'FS' || lastTwoCharacters === 'SS' ? obj + "+0" : obj;
                    if (pattern.test(testValue)) {
                        var index = testValue.indexOf('F') > -1 ? testValue.indexOf('F') : testValue.indexOf('S');
                        var dependencyRowNo = testValue.substr(0, index);
                        var $trlength = $('#pmumapping').dataTable().$('tr').length;

                        dependencyDependentArray = [];
                        dependencyDependentArray = dependencyDependentSlNo($('#row_' + dependencyRowNo).find('[data-dependency]').val()?.toUpperCase().split(','));

                        if (dependencyDependentArray.length > 0) {
                            var index = 0;
                            while (index < dependencyDependentArray.length) {
                                var item = dependencyDependentArray[index];
                                var tempArray = dependencyDependentSlNo($('#row_' + item).find('[data-dependency]').val()?.toUpperCase().split(','));
                                tempArray.forEach(function (element) {
                                    if (!dependencyDependentArray.includes(element)) {
                                        dependencyDependentArray.push(element);
                                    }
                                });
                                index++;
                            }
                        }

                        if (Number(dependencyRowNo) === 0) {
                            ErrorMsg.push("Dependency Value cannot be zero");
                        }
                        else if (Number(dependencyRowNo) === Number(slno)) {
                            ErrorMsg.push("Task Connot be given as Dependency");
                            TaskDependencySlNo += Number(slno) + ","
                        }
                        else if (jQuery.inArray(Number(obj), headerIds) != -1) {
                            ErrorMsg.push("WBS Header ID cannot be considered as dependency, Please enter the valid task ID for dependency.");
                        }
                        else if (Number(dependencyRowNo) > $trlength) {
                            ErrorMsg.push("Dependency Row No cannot exceed the total no of rows");
                            ExceedDependencySlNo += Number(slno) + ","
                        }
                        else if ($('#row_' + dependencyRowNo).find('[data-task]').val() === null || $('#row_' + dependencyRowNo).find('[data-task]').val() === '' || typeof ($('#row_' + dependencyRowNo).find('[data-task]').val()) === "undefined") {
                            ErrorMsg.push("Row:doesn't have any task");
                            WBSDependencySlNo += Number(slno) + ","
                        }
                        else if (jQuery.inArray(Number(slno), dependencyDependentSlNo($('#row_' + dependencyRowNo).find('[data-dependency]').val().toUpperCase().split(','))) != -1) {
                            ErrorMsg.push("Circular Dependency is not possible");
                            CircularalDependencySlNo += Number(slno) + ","
                        }
                        else if (jQuery.inArray(Number(slno), dependencyDependentArray) != -1) {
                            ErrorMsg.push("Circular Dependency is not possible");
                            CircularalDependencySlNo += Number(slno) + ","
                        }
                    }
                    else {
                        ErrorMsg.push(testValue + " does not match the pattern");
                    }
                }
            });
        }
    });


    // 4. Overall One WBSheader need to be added atleast
    var taskHeader = $('#pmumapping').dataTable().$('[data-headerid]').length;
    if (taskHeader === 0) {
        ErrorMsg.push("Add atleast one WBS Header");
    }


    // 5. PMUMapping Validation on all fields & one Wbsheader should have atleast one task
    $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {

        var headerId = $(obj).attr('data-headerid');
        var headerslno = parseInt($(obj).find('[data-slno]').attr('data-slno'));

        var wbsheader = $('#row_' + headerslno).find('[data-wbsheader]').attr('data-wbsheader');
        if (wbsheader === null || wbsheader === '' || typeof (wbsheader) === "undefined") {
            $('#row_' + headerslno).find('[data-wbsheader]').siblings('span:first').removeClass('hide');
            if (!wbsHeaderNeedToAdd.includes(headerslno)) {
                wbsHeaderNeedToAdd.push(headerslno);
            }
        }
        else {
            $('#row_' + headerslno).find('[data-wbsheader]').siblings('span:first').addClass('hide');
        }

        var duration = $('#row_' + headerslno).find('[data-duration]').val();
        if (duration === null || duration === '' || typeof (duration) === "undefined") {
            $('#row_' + headerslno).find('[data-duration]').siblings('span').removeClass('hide');
            if (!durationNeedToAdd.includes(headerslno)) {
                durationNeedToAdd.push(headerslno);
            }
        }
        else {
            $('#row_' + headerslno).find('[data-duration]').siblings('span').addClass('hide');
        }

        var startdate = $('#row_' + headerslno).find('[data-startdate]').val();
        if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
            $('#row_' + headerslno).find('[data-startdate]').siblings('span').removeClass('hide');
            if (!startEndDateNeedToAdd.includes(headerslno)) {
                startEndDateNeedToAdd.push(headerslno);
            }
        }
        else {
            $('#row_' + headerslno).find('[data-startdate]').siblings('span').addClass('hide');
        }

        var enddate = $('#row_' + headerslno).find('[data-enddate]').val();
        if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
            $('#row_' + headerslno).find('[data-enddate]').siblings('span').removeClass('hide');
            if (!startEndDateNeedToAdd.includes(headerslno)) {
                startEndDateNeedToAdd.push(headerslno);
            }
        }
        else {
            $('#row_' + headerslno).find('[data-enddate]').siblings('span').addClass('hide');
        }

        var taskDetails = $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').length;
        if (taskDetails === 0) {
            taskNeedToAddOnHeader.push(headerslno);
        }

        $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').each(function (detailsi, detailsobj) {

            var detailslno = parseInt($(detailsobj).find('[data-slno]').attr('data-slno'));
            var task = $('#row_' + detailslno).find('[data-task]').attr('data-task');

            if (task === null || task === '' || typeof (task) === "undefined") {
                $('#row_' + detailslno).find('[data-task]').siblings('span').addClass('hide');
                $('#row_' + detailslno).find('[data-task]').siblings('span:first').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });;
                if (!taskNeedToAdd.includes(detailslno)) {
                    taskNeedToAdd.push(detailslno);
                }
            }
            else {
                $('#row_' + detailslno).find('[data-task]').siblings('span:first').addClass('hide');
            }

            var duration = $('#row_' + detailslno).find('[data-duration]').val();
            if (duration === null || duration === '' || typeof (duration) === "undefined") {
                $('#row_' + detailslno).find('[data-duration]').siblings('span').removeClass('hide');
                if (!durationNeedToAdd.includes(detailslno)) {
                    durationNeedToAdd.push(detailslno);
                }
            }
            else {
                $('#row_' + detailslno).find('[data-duration]').siblings('span').addClass('hide');
            }

            var startdate = $('#row_' + detailslno).find('[data-startdate]').val();
            if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
                $('#row_' + detailslno).find('[data-startdate]').siblings('span').removeClass('hide');
                if (!startEndDateNeedToAdd.includes(detailslno)) {
                    startEndDateNeedToAdd.push(detailslno);
                }
            }
            else {
                $('#row_' + detailslno).find('[data-startdate]').siblings('span').addClass('hide');
            }

            var enddate = $('#row_' + detailslno).find('[data-enddate]').val();
            if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
                $('#row_' + detailslno).find('[data-enddate]').siblings('span').removeClass('hide');
                if (!startEndDateNeedToAdd.includes(detailslno)) {
                    startEndDateNeedToAdd.push(detailslno);
                }
            }
            else {
                $('#row_' + detailslno).find('[data-enddate]').siblings('span').addClass('hide');
            }

            if (
                (
                    $('#currentSavedLatestVersion').val() !== null && $('#currentSavedLatestVersion').val() !== ''
                    && typeof ($('#currentSavedLatestVersion').val()) !== "undefined" && Action == 1 &&
                    $('#currentSavedLatestVersion').val()?.toLowerCase() != 'latest'
                ) || Action == 2
            ) {

                var resources = $('#row_' + detailslno).find('[data-resources]').val();
                if (resources === null || resources === '' || typeof (resources) === "undefined") {
                    $('#row_' + detailslno).find('[data-resources]').siblings('span:first').removeClass('hide');
                    if (!resourcesNeedToAdd.includes(detailslno)) {
                        resourcesNeedToAdd.push(detailslno);
                    }
                }
                else {
                    $('#row_' + detailslno).find('[data-resources]').siblings('span:first').addClass('hide');
                }
            }
        })
    });

    if (taskNeedToAddOnHeader.length > 0) {
        ErrorMsg.push("Add Atleast one Task under WBS Header");
        taskNeedToAddOnHeader = taskNeedToAddOnHeader.toString();
    }
    if (wbsHeaderNeedToAdd.length > 0) {
        ErrorMsg.push("WBS Header Need to be Added");
        wbsHeaderNeedToAdd = wbsHeaderNeedToAdd.toString();
    }
    if (taskNeedToAdd.length > 0) {
        ErrorMsg.push("Task Need to be Added");
        taskNeedToAdd = taskNeedToAdd.toString();
    }
    if (durationNeedToAdd.length > 0) {
        ErrorMsg.push("Duration Need to be Added");
        durationNeedToAdd = durationNeedToAdd.toString();
    }
    if (startEndDateNeedToAdd.length > 0) {
        ErrorMsg.push("Start Date & End Date Need to be Added");
        startEndDateNeedToAdd = startEndDateNeedToAdd.toString();
    }
    if (resourcesNeedToAdd.length > 0) {
        ErrorMsg.push("Resource Need to be Added");
        resourcesNeedToAdd = resourcesNeedToAdd.toString();
    }


    // 6. Task without WBS header alert (Mostly only on first row wbsheader has been removed)
    // getting headers and task in a array
    $('#pmumapping').dataTable().$('[data-relationid]').each(function (detailsi, detailsobj) {
        var headerId = parseInt($(detailsobj).attr('data-relationid'));
        if (!headerArray.some(item => item.Header === headerId)) {
            headerArray.push({
                Header: headerId
            });
        }
        taskArray.push({
            Header: headerId,
            Task: parseInt($(detailsobj).find('[data-slno]').attr('data-slno'))
        });
    });
    // if in header array slno has not header desc means then pushing to invalid header array
    for (var index = 0; index < headerArray.length; index++) {
        var headerDesc = $('#pmumapping').dataTable().$('tr').find('[data-slno="' + headerArray[index].Header + '"]').closest('tr').find('[data-wbsheader]').val();
        if (headerDesc == null || headerDesc == '' || headerDesc == undefined) {
            InvalidHeader.push(headerArray[index].Header);
        }
    }
    if (InvalidHeader.length > 0) {
        InvalidHeader.forEach(function (header) {
            var tasksForHeader = taskArray.filter(item => item.Header === header).map(item => item.Task);
            wbsheaderForTaskToAdd = result.concat(tasksForHeader);
            wbsheaderForTaskToAdd.push(header);
        });

        wbsheaderForTaskToAdd.sort((a, b) => a - b);
        ErrorMsg.push("Add WBS Header for the task");
        wbsheaderForTaskToAdd = wbsheaderForTaskToAdd.toString();
    }


    if (ErrorMsg.length == 0) {
        return true;
    }
    else {
        let message = "";
        let uniqueErrorMsgs = [...new Set(ErrorMsg)];
        uniqueErrorMsgs.forEach(function (Msg, index) {

            if (Msg == "Circular Dependency is not possible") {
                message += `<div>${index + 1}.<b class="word-wrap-popup">S No: ${CircularalDependencySlNo.replace(/,\s*$/, '')}</b> - For the listed Tasks, ${Msg} </div>`;
            }
            else if (Msg == "Task Connot be given as Dependency") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${TaskDependencySlNo.replace(/,\s*$/, '')}</b> - For the listed Tasks, Same Task Id is entered as dependency</div>`;
            }
            else if (Msg == "Dependency Row No cannot exceed the total no of rows") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${ExceedDependencySlNo.replace(/,\s*$/, '')}</b> - For the listed Tasks, dependency Task ID is greater than the total number of  rows.</div>`;
            }
            else if (Msg == "Row:doesn't have any task") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${WBSDependencySlNo.replace(/,\s*$/, '')}</b> - For the listed Tasks, WBS header cannot  be entered as dependency.</div>`;
            }
            else if (Msg == "Empyt row") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${slNoToAlert.replace(/,\s*$/, '')}</b> - Please Enter Data Or Delete the rows if not required.</div>`;
            }
            else if (Msg == "Duplicate SlNo") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${duplicateTask.replace(/,\s*$/, '')}</b> - Duplicate tasks are not allowed.</div>`;
            }
            else if (Msg == "Add atleast one WBS Header") {
                message += `<div>${index + 1}. Please Add atleast one WBS Header.</div>`;
            }
            else if (Msg == "Add Atleast one Task under WBS Header") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${taskNeedToAddOnHeader.replace(/,\s*$/, '')}</b> - For the listed WBS Header, Please Add Atleast one Task.</div>`;
            }
            else if (Msg == "WBS Header Need to be Added") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${wbsHeaderNeedToAdd.replace(/,\s*$/, '')}</b> - Please select the WBS Header.</div>`;
            }
            else if (Msg == "Task Need to be Added") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${taskNeedToAdd.replace(/,\s*$/, '')}</b> - Please select the task.</div>`;
            }
            else if (Msg == "Duration Need to be Added") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${durationNeedToAdd.replace(/,\s*$/, '')}</b> - Please Enter the Duration.</div>`;
            }
            else if (Msg == "Start Date & End Date Need to be Added") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${startEndDateNeedToAdd.replace(/,\s*$/, '')}</b> - Please select the Start Date and End Date.</div>`;
            }
            else if (Msg == "Resource Need to be Added") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${resourcesNeedToAdd.replace(/,\s*$/, '')}</b> - Please select the Resource.</div>`;
            }
            else if (Msg == "Add WBS Header for the task") {
                message += `<div>${index + 1}. <b class="word-wrap-popup">S No: ${wbsheaderForTaskToAdd.replace(/,\s*$/, '')}</b> - For the listed Tasks, WBS Header Need to be Added.</div>`;
            }
            else {
                message += `<div>${index + 1}. ${Msg}</div>`;
            }
        });
        alert(message);
        return false;
    }
}

versionmodels = [
    {
        name: 'NewVersion',
        label: 'Version',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 40
    },
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 40
    },
    {
        name: 'RemarksType',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        // width: 80
    },
    {
        name: 'CreatedBy',
        label: 'Created By',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 40
    },
    {
        name: 'CreatedDate',
        label: 'Created Date',
        resizable: true,
        ignoreCase: true,
        width: 30
    },
]

function VersionRemarksJqgrid(data) {

    $.jgrid.gridUnload('#Versionremarksdisplay');

    $("#Versionremarksdisplay").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'Get',
        colModel: versionmodels,
        loadonce: true,
        viewrecords: true,
        rowNum: 20,
        pager: '#Versionremarksdisplaypager',
        scroll: 1,
        gridComplete: function () {

            var objRows = $("#Versionremarksdisplay tbody tr");
            var objHeader = $("#Versionremarksdisplay tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        },
    });

    $("#Versionremarksdisplay").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#Versionremarksdisplay').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-240px + 100vh)' });

    var $TableHeight = $('#Versionremarksdisplay').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#Versionremarksdisplay').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Versionremarksdisplay').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#Versionremarksdisplay').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Versionremarksdisplay').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

    $('#VersionRemarksPopup').modal('show');
}

//--------------------On click and change events----------------

$('body').on('input', '.noSpacesField', function () {
    this.value = this.value.replace(/^\s+/g, '');
});
$('body').on('change', '#ProjectId', function () {

    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' &&
        typeof ($('#ProjectId').val()) !== "undefined" && $('#ProjectId').val() !== '0') {

        $('.projectName_error').text('');

        GetHubList($('#ProjectId').children(":selected").attr('value'));

        if ($('#Hub').val() === null || $('#Hub').val() === '' || typeof ($('#Hub').val()) === "undefined" || $('#Hub').val() === '0') {
            lastSelectedProject = $('#ProjectId').val();
            $('.hubName_error').text('Please select HUB');
        }
        else {
            PMUMappingDataCompare(2);
            if (isPMUMappingNotModified) {
                lastSelectedProject = $('#ProjectId').val();
                AjaxToCheckConditions();
            }
            else {
                UnsavedDataAlert("Project needs to be saved otherwise you will lose the unsaved data",
                    function () {
                        $('#ProjectId').val(lastSelectedProject).change();
                        $("#btn-save").click();
                    },
                    function () {
                        lastSelectedProject = $('#ProjectId').val();
                        AjaxToCheckConditions();
                    },
                    function () {
                        $('#ProjectId').val(lastSelectedProject).change();
                    }
                );
            }
        }
    }
    else {

        $('.projectName_error').text('Please select the Project');
        if ($('#Hub').val() === null || $('#Hub').val() === '' || typeof ($('#Hub').val()) === "undefined" || $('#Hub').val() === '0') {
            $('.hubName_error').text('Please select HUB');
        }

        RevertInitialPageStructure();

    }

});
$('body').on('change', '#Hub', function () {

    if ($('#Hub').val() !== null && $('#Hub').val() !== '' && typeof ($('#Hub').val()) !== "undefined" && $('#Hub').val() !== '0') {

        $('.hubName_error').text('');

        if ($('#ProjectId').val() === null || $('#ProjectId').val() === '' || typeof ($('#ProjectId').val()) === "undefined" || $('#ProjectId').val() === '0') {
            lastSelectedHub = $('#Hub').val();
            $('.projectName_error').text('Please select the Project');
        }
        else {
            PMUMappingDataCompare(2);
            if (isPMUMappingNotModified) {
                lastSelectedHub = $('#Hub').val();
                AjaxToCheckConditions();
            }
            else {
                UnsavedDataAlert("Project needs to be saved otherwise you will lose the unsaved data",
                    function () {
                        $('#Hub').val(lastSelectedHub).change();
                        $("#btn-save").click();
                    },
                    function () {
                        lastSelectedHub = $('#Hub').val();
                        AjaxToCheckConditions();
                    },
                    function () {
                        $('#Hub').val(lastSelectedHub).change();
                    }
                );
            }
        }
    }
    else {
        $('.hubName_error').text('Please select HUB');
        if ($('#ProjectId').val() === null || $('#ProjectId').val() === '' || typeof ($('#ProjectId').val()) === "undefined" || $('#ProjectId').val() === '0') {
            $('.projectName_error').text('Please select the Project');
        }

        RevertInitialPageStructure();
    }

});

$('body').on('change', '#Version', function () {

    var latestVersion = $("#currentSavedLatestVersion").val();
    var currentversion = $(this).val();

    PMUMappingDataCompare(2, 1);

    if (isPMUMappingNotModified) {
        CallVersionMarqueeChange();
    }
    else {
        UnsavedDataAlert("Project needs to be saved otherwise you will lose the unsaved data",
            function () {
                $('#Version').val(lastSelectedVersion).change();
                $("#btn-save").click();
            },
            function () {
                CallVersionMarqueeChange();
            },
            function () {
                $('#Version').val(lastSelectedVersion).change();
            }
        );
    }

    function CallVersionMarqueeChange() {

        getVersionData();
        SaveCriticalPathData(currentversion);
        if (currentversion === latestVersion && (latestVersion?.toLowerCase() == "latest") || latestVersion == "") {
            $("#Marquee_span").show();
        }
        else {
            $("#Marquee_span").hide();
        }

    }

});
$('body').on('change', '#YesOrNoKPI', function () {

    var value = parseInt($(this).val()) === 1 ? true : false;
    $('#IsKPIIncluded').val(value);
    $.each(task_checkkpiarray, function (i, obj) {
        var datatask = document.querySelectorAll('[data-task="' + obj.Task + '"]');
        $.each(datatask, function (j, o) {

            if (datatask[j].classList.contains('color-red')) {
                datatask[j].classList.remove("color-red");
            }
            if (value === true && obj.IsKPI === true) {
                datatask[j].classList.add("color-red");
            }
        });
    });

});
$('body').on('change', '[data-dependency]', function () {

    var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
    var parentRowIds = [];
    var maxParentRowNo = 0;

    if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
        var headerTr;
        $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
            var parentRowNo = parseInt($(obj).attr('data-headerid'));
            if (parentRowNo < slno) {
                headerTr = obj;
            }
        })
        maxParentRowNo = $(headerTr).attr('data-headerid');
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }

    var $currentTr = $(this).closest('tr');
    var relationId = $(this).closest('tr').attr('data-relationid');
    var task = $($currentTr).find('[data-task]').val();

    if (task === null || task === '' || typeof (task) === "undefined") {
        $($currentTr).find('[data-dependency]').val('');
        $($currentTr).find('[data-task]').siblings('span').addClass('hide');
        $($currentTr).find('[data-task]').siblings('span:first').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });;
        return false;
    }
    else {
        $($currentTr).find('[data-task]').siblings('span:first').addClass('hide');
    }

    var headerIds = [];
    $('#pmumapping').dataTable().$('[data-headerid]').each(function (headeri, headerobj) {
        if ($(headerobj).attr('data-headerid') !== null && $(headerobj).attr('data-headerid') !== '' && typeof ($(headerobj).attr('data-headerid')) !== "undefined") {
            headerIds.push(Number($(headerobj).attr('data-headerid')));
        }
    });

    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {

        var dependencyArray = $(this).val().toUpperCase().split(',');
        var newDependencyArray = [];
        $.each(dependencyArray, function (i, obj) {

            var $trlength = $('#pmumapping').dataTable().$('tr').length;

            if ($.isNumeric(obj)) {
                dependencyDependentArray = [];
                dependencyDependentArray = dependencyDependentSlNo($('#row_' + obj).find('[data-dependency]').val()?.toUpperCase().split(','));

                if (dependencyDependentArray.length > 0) {
                    var index = 0;
                    while (index < dependencyDependentArray.length) {
                        var item = dependencyDependentArray[index];
                        var tempArray = dependencyDependentSlNo($('#row_' + item).find('[data-dependency]').val()?.toUpperCase().split(','));
                        tempArray.forEach(function (element) {
                            if (!dependencyDependentArray.includes(element)) {
                                dependencyDependentArray.push(element);
                            }
                        });
                        index++;
                    }
                }

                if (Number(obj) === 0) {
                    alert("Dependency Value cannot be zero");
                    return false;
                }
                else if (Number(obj) === Number(slno)) {
                    alert("Circular Dependency is not possible");
                    return false;
                }
                else if (jQuery.inArray(Number(obj), headerIds) != -1) {
                    alert("WBS Header ID cannot be considered as dependency, Please enter the valid task ID for dependency.");
                    return false;
                }
                else if (Number(obj) > $trlength) {
                    alert("Dependency Row No cannot exceed the total no of rows");
                    return false;
                }
                else if ($('#row_' + obj).find('[data-task]').val() === null || $('#row_' + obj).find('[data-task]').val() === '' || typeof ($('#row_' + obj).find('[data-task]').val()) === "undefined") {
                    alert("row: " + obj + " doesn't have any task");
                    return false;
                }
                else if (jQuery.inArray(Number(slno), dependencyDependentSlNo($('#row_' + obj).find('[data-dependency]').val().toUpperCase().split(','))) != -1) {
                    alert("Circular Dependency is not possible");
                    return false;
                }
                else if (jQuery.inArray(Number(slno), dependencyDependentArray) != -1) {
                    alert("Circular Dependency is not possible");
                    return false;
                }
                else {

                    newDependencyArray.push(obj + "FS+" + 0);
                }
            }
            else {
                dependencyDependentArray = [];
                var pattern = /^\d*(?:FS|SS)[+-]\d+$/;
                if (obj !== null && obj !== '' && typeof (obj) !== "undefined") {
                    var lastTwoCharacters = obj.slice(-2)
                    var testValue = lastTwoCharacters === 'FS' || lastTwoCharacters === 'SS' ? obj + "+0" : obj;
                    if (pattern.test(testValue)) {
                        var index = testValue.indexOf('F') > -1 ? testValue.indexOf('F') : testValue.indexOf('S');
                        var dependencyRowNo = testValue.substr(0, index);
                        var $trlength = $('#pmumapping').dataTable().$('tr').length;

                        dependencyDependentArray = dependencyDependentSlNo($('#row_' + dependencyRowNo).find('[data-dependency]').val()?.toUpperCase().split(','));

                        if (dependencyDependentArray.length > 0) {
                            var index = 0;
                            while (index < dependencyDependentArray.length) {
                                var item = dependencyDependentArray[index];
                                var tempArray = dependencyDependentSlNo($('#row_' + item).find('[data-dependency]').val()?.toUpperCase().split(','));
                                tempArray.forEach(function (element) {
                                    if (!dependencyDependentArray.includes(element)) {
                                        dependencyDependentArray.push(element);
                                    }
                                });
                                index++;
                            }
                        }

                        if (Number(dependencyRowNo) === 0) {
                            alert("Dependency Value cannot be zero");
                            return false;
                        }
                        else if (Number(dependencyRowNo) === Number(slno)) {
                            alert("Circular Dependency is not possible");
                            return false;
                        }
                        else if (jQuery.inArray(Number(obj), headerIds) != -1) {
                            alert("WBS Header ID cannot be considered as dependency, Please enter the valid task ID for dependency.");
                            return false;
                        }
                        else if (Number(dependencyRowNo) > $trlength) {
                            alert("Dependency Row No cannot exceed the total no of rows");
                            return false;
                        }
                        else if ($('#row_' + dependencyRowNo).find('[data-task]').val() === null || $('#row_' + dependencyRowNo).find('[data-task]').val() === '' || typeof ($('#row_' + dependencyRowNo).find('[data-task]').val()) === "undefined") {
                            alert("row: " + obj + " doesn't have any task");
                            return false;
                        }
                        else if (jQuery.inArray(Number(slno), dependencyDependentSlNo($('#row_' + dependencyRowNo).find('[data-dependency]').val().toUpperCase().split(','))) != -1) {
                            alert("Circular Dependency is not possible");
                            return false;
                        }
                        else if (jQuery.inArray(Number(slno), dependencyDependentArray) != -1) {
                            alert("Circular Dependency is not possible");
                            return false;
                        }
                        else {

                            newDependencyArray.push(testValue);
                        }
                    }
                    else {
                        alert(testValue + " does not match the pattern");
                        return false;
                    }
                }
            }
        });
        if (newDependencyArray.length === 0) {
            $(this).val('');
        }
        else {
            var SlNoArray = dependencyDependentSlNo(newDependencyArray);
            var uniqueSlNoArray = [];
            SlNoArray.forEach(function (element) {
                if (!uniqueSlNoArray.includes(element)) {
                    uniqueSlNoArray.push(element);
                }
            });

            var DuplicateslNo = [];
            var unDuplicateslNo = [];
            var unDuplicateDependency = [];

            uniqueSlNoArray.forEach(function (item) {
                if (SlNoArray.filter(i => i == item).length == 1) {
                    unDuplicateslNo.push(item);
                }
                else {
                    if (!DuplicateslNo.includes(item)) {
                        DuplicateslNo.push(item);
                    }
                }
            });

            unDuplicateslNo.forEach(function (item) {
                newDependencyArray.forEach(function (items) {
                    var index = items.indexOf('F') > -1 ? items.indexOf('F') : items.indexOf('S');
                    var dependencyRowNo = items.substr(0, index);
                    if (parseInt(dependencyRowNo) == item) {
                        unDuplicateDependency.push(items);
                    }
                });
            });

            DuplicateslNo.forEach(function (item) {
                for (var i = 0; i < newDependencyArray.length; i++) {
                    var items = newDependencyArray[i];
                    var index = items.indexOf('F') > -1 ? items.indexOf('F') : items.indexOf('S');
                    var dependencyRowNo = items.substr(0, index);
                    if (parseInt(dependencyRowNo) === item) {
                        unDuplicateDependency.push(items);
                        break;
                    }
                }
            });

            $(this).val(unDuplicateDependency.join(","));
            smartSheetCalculation(relationId, 1);

            if (DuplicateslNo.length > 0) {
                alert("S.No <b>" + slno + "</b> Dependencies <b>" + DuplicateslNo.toString() + "</b> cannot be duplicated")
            }
        }
    }

});

$('body').on('input', 'input[data-duration], input[data-enddate], input[data-startdate], input[data-percentage], input[data-dependency]', function () {
    $(this).attr('title', $(this).val()).trigger('mouseleave').trigger('mouseenter');
});

$('body').on('change', '[data-duration]', function () {

    var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
    var parentRowIds = [];
    var maxParentRowNo = 0;

    if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
        var headerTr
        $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
            var parentRowNo = parseInt($(obj).attr('data-headerid'));
            if (parentRowNo < slno) {
                headerTr = obj;
            }
            else {
                return false;
            }
        })
        maxParentRowNo = $(headerTr).attr('data-headerid');
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }

    var $currentTr = $(this).closest('tr');
    var relationId = $(this).closest('tr').attr('data-relationid');
    var task = $($currentTr).find('[data-task]').val();

    if (task === null || task === '' || typeof (task) === "undefined") {
        $($currentTr).find('[data-duration]').val('');
        $($currentTr).find('[data-task]').siblings('span').addClass('hide');
        $($currentTr).find('[data-task]').siblings('span:first').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });;
        return false;
    }
    else {
        $($currentTr).find('[data-task]').siblings('span:first').addClass('hide');
    }

    this.value = this.value.replace(/[^0-9\.]/g, '');

    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        $(this).siblings('span').addClass('hide');
    }

    if ($.isNumeric(this.value)) {
        var duration = $(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined" ? Number($(this).val()) : 0;
        var noOfDays = duration === 0 ? 0 : duration - 1;
        var startDate = $($currentTr).find('td [data-startdate]').val();
        if (startDate !== null && startDate !== '' && typeof (startDate) !== "undefined") {
            var endDate = moment(addBusinessDays(moment(startDate, 'DD/MM/YYYY'), noOfDays)).format("DD/MM/YYYY");
            $($currentTr).find('td [data-enddate]').val(endDate);
            smartSheetCalculation(relationId, 1);
        }
    }

    if ($(this).val() == "") {
        var startDate = $($currentTr).find('td [data-startdate]').val();
        var endDate = $($currentTr).find('td [data-enddate]').val();
        var duration = getBusinessDays(moment(startDate, 'DD/MM/YYYY'), moment(endDate, 'DD/MM/YYYY')) + 1;
        $($currentTr).find('[data-duration]').val(duration);
    }

});
$('body').on('change', '[data-startdate]', function () {

    var currentTr = $(this).closest('tr');
    var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
    var startDate = $(this).val();
    var parentRowIds = [];
    var maxParentRowNo = 0;

    if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
        var headerTr
        $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
            var parentRowNo = parseInt($(obj).attr('data-headerid'));
            if (parentRowNo < slno) {
                headerTr = obj;
            }
            else {
                return false;
            }
        })
        maxParentRowNo = $(headerTr).attr('data-headerid');
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }

    var task = $(currentTr).find('[data-task]').val();
    if (task === null || task === '' || typeof (task) === "undefined") {
        $(currentTr).find('[data-startdate]').val('');
        $(currentTr).find('[data-task]').siblings('span').addClass('hide');
        $(currentTr).find('[data-task]').siblings('span:first').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });;
        return false;
    }
    else {
        $(currentTr).find('[data-task]').siblings('span:first').addClass('hide');
    }

    var dependency = $(currentTr).find('[data-dependency]').val();
    var dependentRow = [];
    if ($(currentTr).find('[data-startdate]').attr("data-previousvalue") !== null && $(currentTr).find('[data-startdate]').attr("data-previousvalue") !== ''
        && typeof ($(currentTr).find('[data-startdate]').attr("data-previousvalue")) !== "undefined") {
        dependentRow.push(parseInt($(currentTr).find('[data-slno]').attr('data-slno')));
        var initialdependentRow = 0;
        while (initialdependentRow < dependentRow.length) {
            $('#pmumapping').dataTable().$('[data-relationid]').each(function (relationi, relationobj) {
                var relationdependency = $(relationobj).find('[data-dependency]').val();
                if (relationdependency !== null && relationdependency !== '' && typeof (relationdependency) !== "undefined") {
                    var relationDependencyArray = relationdependency.split(",");
                    var relationExists = false;
                    var currentSlNo = dependentRow[initialdependentRow];
                    $.each(relationDependencyArray, function (i, obj) {
                        var relationindex = obj.indexOf('F') > -1 ? obj.indexOf('F') : obj.indexOf('S');
                        var relationdependencyRowNo = obj.substr(0, relationindex);
                        if (parseInt(currentSlNo) === parseInt(relationdependencyRowNo)) {
                            relationExists = true;
                        }
                    })
                    if (relationExists) {
                        var dependentRowIndex = dependentRow.findIndex(function (o) { return Number(o) === parseInt($(relationobj).find('[data-slno]').attr('data-slno')) })
                        if (dependentRowIndex == -1) {
                            dependentRow.push(parseInt($(relationobj).find('[data-slno]').attr('data-slno')));
                        }
                    }
                }
            })
            initialdependentRow += 1;
        }
    }

    if ((dependency === null || dependency === '' || typeof (dependency) === "undefined")) {
        var duration = $(currentTr).find('td [data-duration]').val() !== null && $(currentTr).find('td [data-duration]').val() !== ''
            && typeof ($(currentTr).find('td [data-duration]').val()) !== "undefined" ? Number($(currentTr).find('td [data-duration]').val()) : 0;
        var noOfDays = duration === 0 ? 0 : duration - 1;
        if (noOfDays === 0) {
            $(currentTr).find('[data-duration]').val(1);
            $(currentTr).find('[data-duration]').siblings('span').addClass('hide');
        }
        else {
            $(currentTr).find('[data-duration]').val(duration);
            $(currentTr).find('[data-duration]').siblings('span').addClass('hide');
        }
        if (startDate !== null && startDate !== '' && typeof (startDate) !== "undefined") {
            $(currentTr).find('[data-startdate]').siblings('span').addClass('hide');
            var endDate = moment(addBusinessDays(moment(startDate, 'DD/MM/YYYY'), noOfDays)).format("DD/MM/YYYY");
            $(currentTr).find('[data-enddate]').val(endDate);
            $(currentTr).find('[data-startdate]').attr('data-previousvalue', startDate);
            $(currentTr).find('[data-enddate]').siblings('span').addClass('hide');
        }
    }
    else {
        confirmWithStartDateDependentAlert('Manually changing "Start Date" will result in the removal of all predecessor relationships on this row. Do you wish to continue?',
            function () {
                $(currentTr).find('[data-dependency]').val("");
                $(currentTr).find('[data-startdate]').val(startDate);
                var duration = $(currentTr).find('td [data-duration]').val() !== null && $(currentTr).find('td [data-duration]').val() !== '' && typeof ($(currentTr).find('td [data-duration]').val()) !== "undefined" ? Number($(currentTr).find('td [data-duration]').val()) : 0;
                var noOfDays = duration === 0 ? 0 : duration - 1;
                if (noOfDays === 0) {
                    $(currentTr).find('[data-duration]').val(1);
                }
                else {
                    $(currentTr).find('[data-duration]').val(duration);
                }
                if (startDate !== null && startDate !== '' && typeof (startDate) !== "undefined") {
                    $(currentTr).find('[data-startdate]').siblings('span').addClass('hide');
                    var endDate = moment(addBusinessDays(moment(startDate, 'DD/MM/YYYY'), noOfDays)).format("DD/MM/YYYY");
                    $(currentTr).find('[data-enddate]').val(endDate);
                    $(currentTr).find('[data-startdate]').attr('data-previousvalue', startDate);
                    $(currentTr).find('[data-enddate]').siblings('span').addClass('hide');
                    smartSheetCalculation(relationId, 1, dependentRow);
                }
            },
        );
    }

    var relationId = $(currentTr).attr('data-relationid');
    if ((dependency === null || dependency === '' || typeof (dependency) === "undefined")) {
        smartSheetCalculation(relationId, 1, dependentRow);
    }
    else {
        smartSheetCalculation(relationId, 1);
    }
});
$('body').on('change', '[data-enddate]', function () {

    var currentTr = $(this).closest('tr');
    var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
    var parentRowIds = []; var maxParentRowNo = 0;

    if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
        var headerTr
        $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
            var parentRowNo = parseInt($(obj).attr('data-headerid'));
            if (parentRowNo < slno) {
                headerTr = obj;
            }
            else {
                return false;
            }
        })
        maxParentRowNo = $(headerTr).attr('data-headerid');
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }

    var relationId = parseInt($(currentTr).find('[data-relationid]').attr('data-relationid'));
    var currentValue = $(this).val();
    var task = $(currentTr).find('[data-task]').val();

    if (task === null || task === '' || typeof (task) === "undefined") {
        $(currentTr).find('[data-enddate]').val('');
        $(currentTr).find('[data-task]').siblings('span').addClass('hide');
        $(currentTr).find('[data-task]').siblings('span:first').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });;
        return false;
    }
    else {
        $(currentTr).find('[data-task]').siblings('span:first').addClass('hide');
    }

    var startDate = $(currentTr).find('[data-startdate]').val();
    if (startDate === null || startDate === '' || typeof (startDate) === "undefined") {
        $(currentTr).find('[data-startdate]').siblings('span').removeClass('hide');
        return false;
    }
    else {
        $(currentTr).find('[data-startdate]').siblings('span').addClass('hide');
    }
    var endDate = $(currentTr).find('[data-enddate]').val();
    if (endDate === null || endDate === '' || typeof (endDate) === "undefined") {
        $(currentTr).find('[data-enddate]').siblings('span').removeClass('hide');
        return false;
    }
    else {
        $(currentTr).find('[data-enddate]').siblings('span').addClass('hide');
    }
    if (moment(startDate, "DD/MM/YYYY") > moment(endDate, "DD/MM/YYYY")) {
        alert("End Date should be greater than Start Date");
        var previousValue = $(currentTr).find('[data-previousvalue]').attr('data-previousvalue');
        var previousEndDate = previousValue !== '' && previousValue !== null && typeof (previousValue) !== "undefined" ? previousValue : startDate;
        $(currentTr).find('[data-enddate]').val(previousEndDate);
        $(currentTr).find('[data-enddate]').attr('data-previousvalue', previousEndDate);
        var duration = getBusinessDays(moment(startDate, "DD/MM/YYYY"), moment(previousEndDate, "DD/MM/YYYY"));
        $(currentTr).find('[data-duration]').val((duration + 1));
    }
    else {
        var dependentRow = [];

        dependentRow.push(parseInt($(currentTr).find('[data-slno]').attr('data-slno')));
        var initialdependentRow = 0;

        while (initialdependentRow < dependentRow.length) {
            $('#pmumapping').dataTable().$('[data-relationid]').each(function (relationi, relationobj) {
                var relationdependency = $(relationobj).find('[data-dependency]').val();
                if (relationdependency !== null && relationdependency !== '' && typeof (relationdependency) !== "undefined") {
                    var relationDependencyArray = relationdependency.split(",");
                    var relationExists = false;
                    var currentSlNo = dependentRow[initialdependentRow];
                    $.each(relationDependencyArray, function (i, obj) {
                        var relationindex = obj.indexOf('F') > -1 ? obj.indexOf('F') : obj.indexOf('S');
                        var relationdependencyRowNo = obj.substr(0, relationindex);
                        if (parseInt(currentSlNo) === parseInt(relationdependencyRowNo)) {
                            relationExists = true;
                        }
                    })
                    if (!dependentRow.includes(parseInt($(relationobj).find('[data-slno]').attr('data-slno'))) && relationExists) {
                        dependentRow.push(parseInt($(relationobj).find('[data-slno]').attr('data-slno')));
                    }
                }
            })
            initialdependentRow += 1;
        }

        // Getting PMUMapping Task Details in array
        var PMUMappingData = [];
        $('#pmumapping').dataTable().$('tr').each(function (i, obj) {

            var slNo = $(obj).find('[data-slno]').attr('data-slno');
            var task = $(obj).find('[data-task]').attr('data-task');
            var wBSHeaderId = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
            var dependency = $(obj).find('[data-dependency]').val();
            var startDate = $(obj).find('[data-startDate]').val();
            var endDate = $(obj).find('[data-endDate]').val();
            var duration = $(obj).find('[data-duration]').val();

            if (task != "" && task != null && task != undefined && task != "0") {
                var pmuMappings = {
                    SlNo: parseInt(slNo),
                    WBSHeaderId: 0,
                    TaskId: task,
                    Dependency: dependency,
                    StartDate: startDate,
                    EndDate: endDate,
                    RevisedStartDate: "",
                    RevisedEndDate: "",
                    Duration: duration
                }
                PMUMappingData.push(pmuMappings);
            }
            if (wBSHeaderId != "" && wBSHeaderId != null && wBSHeaderId != undefined && wBSHeaderId != "0") {
                var pmuMappings = {
                    SlNo: parseInt(slNo),
                    WBSHeaderId: wBSHeaderId,
                    TaskId: 0,
                    Dependency: dependency,
                    StartDate: startDate,
                    EndDate: endDate,
                    RevisedStartDate: "",
                    RevisedEndDate: "",
                    Duration: duration
                }
                PMUMappingData.push(pmuMappings);
            }
        });

        var sortedOrder = slNoSortingArray(PMUMappingData);
        sortedOrder = sortedOrder.split(",");
        var orderToLoop = sortedOrder.map(function (element) {
            return parseInt(element.trim());
        });
        orderToLoop.forEach(function (item) {

            if (item != Number(slno)) {

                var filteredArray = PMUMappingData.filter(items => items.SlNo == item);

                var slNo = filteredArray[0].SlNo;
                var dependencyValue = filteredArray[0].Dependency;

                // handeling Tasks depedency if there
                if (dependencyValue !== null && dependencyValue !== '' && typeof (dependencyValue) !== "undefined") {
                    var newDependencyArray = dependencyValue.split(",");
                    var dependentStartDateArray = [];

                    $.each(newDependencyArray, function (newDependencyIndex, newDependencyobj) {

                        var dependencyIndex = newDependencyobj.indexOf('F') > -1 ? newDependencyobj.indexOf('F') : newDependencyobj.indexOf('S');
                        var dependencyRowNo = newDependencyobj.substr(0, dependencyIndex);
                        var durationIndex = newDependencyobj.indexOf('+') > -1 ? newDependencyobj.indexOf('+') : newDependencyobj.indexOf('-')
                        var duration = Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) < 0 ?
                            Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) :
                            Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) === 0 ? 0 :
                                Number(newDependencyobj.substr(durationIndex, newDependencyobj.length));

                        var dependentTr = PMUMappingData.filter(item => item.SlNo == dependencyRowNo);

                        var endDate = dependentTr[0].RevisedEndDate;

                        if (endDate !== null && endDate !== '' && typeof (endDate) !== "undefined") {
                            if (dependentTr[0].Duration !== null && dependentTr[0].Duration !== '' && typeof (dependentTr[0].Duration) !== "undefined"
                                && dependentTr[0].Duration === 0) {
                                endDate = moment(addBusinessDays(moment(endDate, "DD/MM/YYYY"), 0)).format("DD/MM/YYYY");
                            }
                            else {
                                endDate = moment(addBusinessDays(moment(endDate, "DD/MM/YYYY"), 1)).format("DD/MM/YYYY");
                            }
                        }

                        var dependentStartDate = newDependencyobj.indexOf('F') > -1 ? endDate : dependentTr[0].RevisedStartDate;
                        if (dependentStartDate !== null && dependentStartDate !== '' && typeof (dependentStartDate) !== "undefined") {
                            var dependentStartDateAfterduration = addBusinessDays(moment(dependentStartDate, "DD/MM/YYYY"), duration);
                            dependentStartDateArray.push(dependentStartDateAfterduration);
                        }
                    });

                    if (dependentStartDateArray.length > 0) {

                        var maxStarDate = moment.max(dependentStartDateArray);
                        var currentTrDuration = filteredArray[0].Duration !== null && filteredArray[0].Duration !== ''
                            && typeof (filteredArray[0].Duration) !== "undefined" ? Number(filteredArray[0].Duration) : 0;
                        var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                        var maxEndDate = addBusinessDays(maxStarDate, addNoOfDays);

                        PMUMappingData.forEach(item => {
                            if (item.SlNo === slNo) {
                                item.RevisedStartDate = maxStarDate.format("DD/MM/YYYY");
                                item.RevisedEndDate = maxEndDate.format("DD/MM/YYYY");
                                item.Duration = currentTrDuration;
                            }
                        });
                    }
                }
                // handeling Tasks depedency if not there
                else {
                    if (filteredArray[0].StartDate !== null && filteredArray[0].StartDate !== '' && typeof (filteredArray[0].StartDate) !== "undefined") {
                        var maxStarDate = moment(filteredArray[0].StartDate, 'DD/MM/YYYY');
                        if ($("#isWeekEndExclude").val() == "True") {
                            if (maxStarDate.day() == 6) {
                                maxStarDate = maxStarDate.add(1, 'days');
                            }
                            if (maxStarDate.day() == 0) {
                                maxStarDate = maxStarDate.add(1, 'days');
                            }
                        }
                        var currentTrDuration = filteredArray[0].Duration !== null && filteredArray[0].Duration !== ''
                            && typeof (filteredArray[0].Duration) !== "undefined" ? Number(filteredArray[0].Duration) : 0;
                        var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                        var maxEndDate = addBusinessDays(moment(maxStarDate, 'DD/MM/YYYY'), addNoOfDays);

                        PMUMappingData.forEach(item => {
                            if (item.SlNo === slNo) {
                                item.RevisedStartDate = maxStarDate.format("DD/MM/YYYY");
                                item.RevisedEndDate = maxEndDate.format("DD/MM/YYYY");
                                item.Duration = currentTrDuration;
                            }
                        });
                    }
                }
            }
            else {
                PMUMappingData.forEach(item => {
                    if (item.SlNo === Number(slno)) {
                        item.RevisedStartDate = startDate;
                        item.RevisedEndDate = endDate;
                        item.Duration = getBusinessDays(moment(startDate, "DD/MM/YYYY"), moment(endDate, "DD/MM/YYYY"));
                        item.EndDate = $('#pmumapping').dataTable().$('#row_' + item.SlNo).find('[data-enddate]').attr('data-previousvalue');
                    }
                });
            }
        });

        $('#dependentAlertTable tbody').html("");
        if (dependentRow.length > 1) {
            var msg = '';

            PMUMappingData = PMUMappingData.filter(item => dependentRow.includes(parseInt(item.SlNo)));

            $.each(PMUMappingData, function (revi, revobj) {

                var Task = $('#pmumapping').dataTable().$('#row_' + revobj.SlNo).find('[data-task]').val();

                msg += ('<tr>' +
                    '<td>' + revobj.SlNo + '</td>' +
                    '<td>' + Task + '</td>' +
                    '<td>' + revobj.Dependency + '</td>' +
                    '<td>' + revobj.Duration + '</td>' +
                    '<td>' + revobj.StartDate + '</td>' +
                    '<td>' + revobj.EndDate + '</td>' +
                    '<td>' + revobj.RevisedStartDate + '</td>' +
                    '<td>' + revobj.RevisedEndDate + '</td>' +
                    '</tr>');
            });
            confirmWithEndDateDependentAlert(msg, function () {

                $(currentTr).find('[data-enddate]').val(currentValue);
                $(currentTr).find('[data-enddate]').attr('data-previousvalue', currentValue);
                var duration = getBusinessDays(moment(startDate, "DD/MM/YYYY"), moment(currentValue, "DD/MM/YYYY"));
                $(currentTr).find('[data-duration]').val((duration + 1));
                smartSheetCalculation(relationId, 1, dependentRow);
            }, function () {
                $(currentTr).find('[data-enddate]').val($(currentTr).find('[data-enddate]').attr('data-previousvalue'));
                $(currentTr).find('[data-enddate]').attr('data-previousvalue', $(currentTr).find('[data-enddate]').attr('data-previousvalue'));
                var duration = getBusinessDays(moment(startDate, "DD/MM/YYYY"), moment($(currentTr).find('[data-enddate]').attr('data-previousvalue'), "DD/MM/YYYY"));
                $(currentTr).find('[data-duration]').val((duration + 1));
                smartSheetCalculation(relationId);
            })
        }
        else {
            $(currentTr).find('[data-enddate]').val(currentValue);
            $(currentTr).find('[data-enddate]').attr('data-previousvalue', currentValue);
            var duration = getBusinessDays(moment(startDate, "DD/MM/YYYY"), moment(currentValue, "DD/MM/YYYY"));
            $(currentTr).find('[data-duration]').val((duration + 1));
            smartSheetCalculation(relationId, 1);
        }
    }

});
$('body').on('keyup', '[data-percentage]', function () {

    var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
    var parentRowIds = [];
    var maxParentRowNo = 0;

    if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
        var headerTr
        $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
            var parentRowNo = parseInt($(obj).attr('data-headerid'));
            if (parentRowNo < slno) {
                headerTr = obj;
            }
            else {
                return false;
            }
        })
        maxParentRowNo = $(headerTr).attr('data-headerid');
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }

    var $currentTr = $(this).closest('tr');
    var relationId = $(this).closest('tr').attr('data-relationid');
    var task = $($currentTr).find('[data-task]').val();

    if (task === null || task === '' || typeof (task) === "undefined") {
        $($currentTr).find('[data-percentage]').val('');
        $($currentTr).find('[data-task]').siblings('span').addClass('hide');
        $($currentTr).find('[data-task]').siblings('span:first').removeClass('hide');
        return false;
    }
    else {
        $($currentTr).find('[data-task]').siblings('span:first').addClass('hide');
    }

    this.value = this.value.replace(/[^0-9\.]/g, '');

    if (this.value === null || this.value === '' || typeof (this.value) === "undefined") {
        this.value = '';
    }
    if ($.isNumeric(this.value)) {
        if (Number(this.value) > 100) {
            alert("Percentage cannot be greater than 100");
            this.value = 100;
        }
        $(this).siblings('span').children('span').width(this.value + '%');
        var $tr = $(this).closest('tr');
        var relationId = $($tr).attr('data-relationid');
        smartSheetCalculation(relationId);
    }
});
$('body').on('click', '#btn-save', function () {

    var yesnokpi = parseInt($("#YesOrNoKPI").val()) === 1 ? true : false

    var isRowMissing = MissingRowAlert();

    var isNoNegativePMUMapping;

    if (isRowMissing) {
        isNoNegativePMUMapping = ValidatePMUMappings(1);
    }
    else {
        return false;
    }

    if (isRowMissing) {

        if (isNoNegativePMUMapping) {

            // Save as draft (no version) -- in scope and normal case
            if ($('#currentSavedLatestVersion').val() === null || $('#currentSavedLatestVersion').val() === '' ||
                typeof ($('#currentSavedLatestVersion').val()) === "undefined" || $('#currentSavedLatestVersion').val()?.toLowerCase() == "latest") {
                PMUMappingDataCompare(2);
                if (isPMUMappingNotModified) {
                    alert('There is no changes to save');
                }
                else {
                    if (yesnokpi == true) {
                        if (validateKPITask("", NextVersionGroup, false, false)) {
                            submitData("", NextVersionGroup, false);
                        }
                    }
                    else {
                        submitData("", NextVersionGroup, false);
                    }
                }
            }
            // Either approval save or version save (new version or old version but version present)
            else {
                PMUMappingDataCompare(2);
                if (
                    ($("#RevisedRequestData").val() == null || $("#RevisedRequestData").val() == undefined || $("#RevisedRequestData").val() == "") &&
                    isPMUMappingNotModified
                ) {
                    alert('There is no changes to save');
                }
                else {
                    var isValid = true;
                    if (yesnokpi === true) {
                        if (!(validateKPITask($('#currentSavedLatestVersion').val(), $('#currentSavedLatestVersionGroup').val(), false, false))) {
                            isValid = false;
                        }
                    }
                    if (isValid) {
                        confirmWithVersion("Do you want to save it as a new version?",
                            function () {
                                var isvalid = true;

                                if ($("#VersionRemarks").val().trim() === "" || $("#VersionRemarks").val().trim() === null || typeof ($("#VersionRemarks").val().trim()) === "undefined") {
                                    isvalid = false;
                                    $('#VersionRemarks').siblings('span').removeClass('hide')
                                    return false;
                                }
                                else {
                                    $('#VersionRemarks').siblings('span').addClass('hide');
                                    isvalid = true;
                                }

                                versionChangeConfirmed = 1;
                                if (isvalid) {
                                    $('#VersionRemarks').siblings('span').addClass('hide');
                                    submitData(NextVersion, NextVersionGroup, true);
                                }
                            },
                            function () {
                                submitData($('#currentSavedLatestVersion').val(), $('#currentSavedLatestVersionGroup').val(), false);
                            }
                        );
                    }
                }
            }
        }
    }

});
$('body').on('click', '#btn-approve', function () {

    var yesnokpi = parseInt($("#YesOrNoKPI").val()) === 1 ? true : false;

    var isRowMissing = MissingRowAlert();

    var isNoNegativePMUMapping;

    if (isRowMissing) {
        isNoNegativePMUMapping = ValidatePMUMappings(2);
    }
    else {
        return false;
    }

    if (isRowMissing) {

        if (isNoNegativePMUMapping) {

            isDatesNotModified = false; // since the approval popup should show, making the flag as false

            if (!(isScopeChanged == 1 && isCloneAccepted == 0)) {
                if (yesnokpi === true) {
                    if (validateKPITask(NextVersion, NextVersionGroup, true, false)) {
                        submitData(NextVersion, NextVersionGroup, true);
                    }
                }
                else {
                    submitData(NextVersion, NextVersionGroup, true);
                }
            }
            else {

                PMUMappingDataCompare(2);
                if (isPMUMappingNotModified) {
                    alert('There is no changes to approve');
                }
                else {
                    if (yesnokpi === true) {
                        if (validateKPITask(NextVersion, NextVersionGroup, true, false)) {
                            submitData(NextVersion, NextVersionGroup, true);
                        }
                    }
                    else {
                        submitData(NextVersion, NextVersionGroup, true);
                    }
                }
            }

        }

    }

});
$('body').on("click", "#KPIConfirm", function () {
    submitData(kpi_version, kpi_versionGroup, kpi_islatest);
});
$('body').on('change', '[data-predecessor]', function () {

    dependencyDependentArray = [];

    this.value = this.value.replace(/[^0-9\.]/g, '');

    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {

        var rowNo = $(this).val();
        var slno = parseInt($('#row_' + rowNo).find('[data-slno]').attr('data-slno'));
        var selectedRowNo = parseInt($('#SelectedRow').text());
        var tableLength = $('#pmumapping').dataTable().$('tr').length;
        var headerId = $('#row_' + rowNo).attr('data-headerid');
        var task = $('#row_' + rowNo).find('[data-task]').val();
        var currentTr = $(this).closest('tr');
        var headerIds = [];
        var currentDependency = [];

        $('#pmumapping').dataTable().$('[data-headerid]').each(function (headeri, headerobj) {
            if ($(headerobj).attr('data-headerid') !== null && $(headerobj).attr('data-headerid') !== '' && typeof ($(headerobj).attr('data-headerid')) !== "undefined") {
                headerIds.push(Number($(headerobj).attr('data-headerid')));
            }
        });

        dependencyDependentArray = dependencyDependentSlNo($('#row_' + rowNo).find('[data-dependency]').val()?.toUpperCase().split(','));

        if (dependencyDependentArray.length > 0) {
            var index = 0;
            while (index < dependencyDependentArray.length) {
                var item = dependencyDependentArray[index];
                var tempArray = dependencyDependentSlNo($('#row_' + item).find('[data-dependency]').val()?.toUpperCase().split(','));
                tempArray.forEach(function (element) {
                    if (!dependencyDependentArray.includes(element)) {
                        dependencyDependentArray.push(element);
                    }
                });
                index++;
            }
        }

        $('#dependencyTable tbody tr').each(function (i, obj) {
            var dependencyRowNo = $(obj).find('[data-predecessor]').val();
            currentDependency.push(dependencyRowNo);
        });

        currentDependency.pop();

        if (Number(rowNo) == 0) {
            $(this).val('');
            alert("Dependency Value cannot be zero");
            return false;
        }
        if (Number(rowNo) === selectedRowNo) {
            $(this).val('');
            alert("Circular Dependency is not possible");
            return false;
        }
        if (jQuery.inArray(Number(rowNo), headerIds) != -1) {
            $(this).val('');
            alert("WBS Header ID cannot be considered as dependency, Please enter the valid task ID for dependency.");
            return false;
        }
        if (parseInt(rowNo) > tableLength) {
            $(this).val('');
            alert("Invalid Row Number");
            return false;
        }
        if (task === null || task === '' || typeof (task) === "undefined") {
            $(this).val('');
            alert("Please enter the task to add the dependency");
            return false;
        }
        if (jQuery.inArray(parseInt($('#SelectedRow').text()),
            dependencyDependentSlNo($('#row_' + rowNo).find('[data-dependency]').val().toUpperCase().split(','))) != -1) {
            $(this).val('');
            alert("Circular Dependency is not possible");
            return false;
        }
        if (jQuery.inArray(Number(slno), dependencyDependentArray) != -1) {
            $(this).val('');
            alert("Circular Dependency is not possible");
            return false;
        }
        if (jQuery.inArray(rowNo, currentDependency) != -1) {
            $(this).val('');
            alert("S.No " + rowNo + " Dependency cannot be duplicated");
            return false;
        }

        $(currentTr).find('[data-predecessortask]').text(task);
        $(currentTr).find('[data-predecessortype]').val('FS');
        var nextTr = '<tr>' +
            '<td><input type="text" class="form-control" value="" data-predecessor="" /></td>' +
            '<td data-predecessortask="">' + '</td>' +
            '<td>' +
            '<select class="form-control" data-predecessortype="">' +
            '<option value="">Select</option>' +
            '<option value="FS">Finish to Start (FS)</option>' +
            '<option value="SS">Start to Start (SS)</option>' +
            '</select>' +
            '<span class="hide text-danger">Please select type<span>' +
            '</td>' +
            '<td><input type="text" class="form-control" data-predecessorleadorlag="" value="" /></td>' +
            '<td class="text-center"><div class="action_width"><a class="trash_icon ml-2" onclick="deletePredecessorRow(this)"><i class="fas fa-trash" title="Delete"></i></a></div></td>' +
            '</tr>';
        $('#dependencyTable tbody').append(nextTr);
    }
});
$('body').on('click', '#dependencypopupOk', function () {

    var selectedRow = $('#SelectedRow').text();
    var relationId = parseInt($('#row_' + selectedRow).attr('data-relationid'));
    var selectedTr = $('#row_' + selectedRow);
    var dependentStartDateArray = [];
    var newDependencyArray = [];

    var invalidselect = [];
    $('#dependencyTable tbody tr').each(function (i, obj) {

        var dependencyRowNo = $(obj).find('[data-predecessor]').val();
        if (dependencyRowNo !== null && dependencyRowNo !== '' && typeof (dependencyRowNo) !== "undefined") {

            var dependencyType = $(obj).find('[data-predecessortype]').val();
            if (dependencyType === null || dependencyType === "" || typeof (dependencyType) === "undefined") {
                $(obj).find('[data-predecessortype]').siblings('span').removeClass('hide');
                invalidselect.push(dependencyRowNo);
            }
            else {
                $(obj).find('[data-predecessortype]').siblings('span').addClass('hide');
            }
            var leadOrLag = $(obj).find('[data-predecessorleadorlag]').val() !== null && $(obj).find('[data-predecessorleadorlag]').val() !== '' && typeof ($(obj).find('[data-predecessorleadorlag]').val()) !== "undefined" ? parseInt($(obj).find('[data-predecessorleadorlag]').val()) : 0;
            var duration = leadOrLag === 0 ? 0 : leadOrLag > 0 ? (leadOrLag - 1) : (leadOrLag + 1);
            var dependentStartDate = dependencyType === 'FS' ? $('#pmumapping').dataTable().$('#row_' + dependencyRowNo).find('td [data-enddate]').val() : $('#pmumapping').dataTable().$('#row_' + dependencyRowNo).find('td [data-startdate]').val();
            if (dependentStartDate !== null && dependentStartDate !== '' && typeof (dependentStartDate) !== "undefined") {
                var dependentStartDateAfterduration = addBusinessDays(moment(dependentStartDate, "DD/MM/YYYY"), duration);
                dependentStartDateArray.push(dependentStartDateAfterduration);
            }
            var dependency = dependencyRowNo + dependencyType + (leadOrLag >= 0 ? '+' + leadOrLag : leadOrLag);
            newDependencyArray.push(dependency);
        }
    });

    if (invalidselect.length == 0) {

        var $currentTr = $('#pmumapping').dataTable().$('#row_' + selectedRow);
        if (dependentStartDateArray.length > 0) {
            var maxStarDate = moment.max(dependentStartDateArray);
            $($currentTr).find('td [data-startdate]').val(maxStarDate.format("DD/MM/YYYY"));
            var currentTrDuration = $($currentTr).find('td [data-duration]').val() !== null && $($currentTr).find('td [data-duration]').val() !== '' && typeof ($($currentTr).find('td [data-duration]').val()) !== "undefined" ? Number($($currentTr).find('td [data-duration]').val()) - 1 : 0;
            var maxEndDate = addBusinessDays(maxStarDate, currentTrDuration);
            if (currentTrDuration === 0) {
                $($currentTr).find('td [data-duration]').val(1);
            }
            $($currentTr).find('td [data-enddate]').val(maxEndDate.format("DD/MM/YYYY"));
        }
        $($currentTr).find('td [data-dependency]').val(newDependencyArray.join(","));
        smartSheetCalculation(relationId, 1);
        $("#dependency").modal('hide');
    }

})
$('body').on('change', '[data-predecessortype]', function () {

    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        $(this).siblings('span').addClass('hide');
    }
    else if ($(this).val() == '' && $(this).closest('tr').find('[data-predecessor]').val() != "") {
        $(this).siblings('span').removeClass('hide');
    }

});
$("#btnAdd").on("click", function () {

    $("#notes_msg").text('');
    $("#notes_msg").removeClass("text-red");
    $("#notes_msg").removeClass("text-success");

    var isValid = true;
    var notes = $("#Notes").val();
    var hubId = parseInt($('#Hub option:selected').val());
    var projectId = parseInt($('#ProjectId').val());

    if (notes == "" || notes == null || typeof (notes) == "undefined") {
        $("#btnRemarks").show();
        isValid = false
        return false
    }
    if (isValid) {
        $.ajax({
            url: ROOT + 'ProjectTracker/SaveNotes',
            type: 'POST',
            data: {
                HubId: hubId, ProjectId: projectId, Notes: notes
            },
            success: function (result) {
                if (result.includes("Successfully")) {
                    $("#notes_msg").text(result)
                    $("#notes_msg").addClass("text-success")
                    $("#notes_msg").removeClass("text-danger")
                    $("#Notes").val('');
                    CreateNotesModal(hubId, projectId);
                } else {
                    $("#notes_msg").text(result)
                    $("#notes_msg").addClass("text-danger")
                    $("#notes_msg").removeClass("text-success")
                }

            },
            error: function () {

            }
        });
    }
});
$("#Notes").on('keyup', function () {
    $("#btnRemarks").hide();
});
$('body').on('click', '#wbsheader', function () {
    getWbsHeaderGrid();
    $("#wbsheader-modal").modal("show");
});
$('body').on('click', '#task', function () {
    getTaskGrid();
    $("#task-modal").modal("show");
});
$('body').on('click', '#add-new-wbsheader,#add-new-task', function () {
    var Action = $(this).attr('id');
    var validWbsHeaderTaskFlag = 1;

    if (Action.toLowerCase().includes("wbsheader")) {
        var NewWbsHeader = $("#new-wbsheader").val().trim();
        NewWbsHeader = NewWbsHeader.replace(/\s+/g, ' ')
        if (NewWbsHeader == "") {
            $(".Err-exists-wbsheader").hide();
            $(".Err-empty-wbsheader").show();
            validWbsHeaderTaskFlag = 0;
        }
        else {
            $(".Err-empty-wbsheader").hide();
            validWbsHeaderTaskFlag = 1;
        }

        if (validWbsHeaderTaskFlag == 1) {

            for (var wbsHeaderIndex = 0; wbsHeaderIndex < autocompleteDrodownArray['WBSHeader'].length; wbsHeaderIndex++) {
                var element = autocompleteDrodownArray['WBSHeader'][wbsHeaderIndex].WBSHeaderDesc;
                if (element.toLowerCase() == NewWbsHeader.toLowerCase()) {
                    validWbsHeaderTaskFlag = 0;
                    $(".Err-exists-wbsheader").show();
                    break;
                }
            }

            if (validWbsHeaderTaskFlag == 1) {
                $(".Err-exists-wbsheader").hide();
            }
        }

        if (validWbsHeaderTaskFlag == 1) {
            saveNewWbsHeaderTask(1);
        }
    }
    else if (Action.toLowerCase().includes("task")) {
        var NewTask = $("#new-task").val().trim();
        NewTask = NewTask.replace(/\s+/g, ' ')
        var kpi = $("#YesNoProperty").val();
        if (kpi === "") {
            $(".Err-kpi-task").show();
            validWbsHeaderTaskFlag = 0;
        }
        else {
            $(".Err-kpi-task").hide();
        }

        if (NewTask == "") {
            $(".Err-exists-task").hide();
            $(".Err-empty-task").show();
            validWbsHeaderTaskFlag = 0;
        }
        else {
            $(".Err-empty-task").hide();
        }



        if (validWbsHeaderTaskFlag == 1) {

            for (var taskIndex = 0; taskIndex < autocompleteDrodownArray['Task'].length; taskIndex++) {
                var element = autocompleteDrodownArray['Task'][taskIndex].TaskDesc;
                if (element.toLowerCase() == NewTask.toLowerCase()) {
                    validWbsHeaderTaskFlag = 0;
                    $(".Err-exists-task").show();
                    break;
                }
            }

            if (validWbsHeaderTaskFlag == 1) {
                $(".Err-exists-task").hide();
            }
        }

        if (validWbsHeaderTaskFlag == 1) {
            saveNewWbsHeaderTask(2);
        }
    }
});
$('body').on('change', '#weekend-switching', function () {
    $('#isWeekEndExclude').val($(this).val());
    loadAutoCompleteDropdowns(autocompleteDrodownArray);
    smartSheetCalculation(0);
});
$('body').on('click', '#save-template', function () {

    var rowheaderCount = $('#pmumapping').dataTable().$('[data-headerid]').length;
    if (rowheaderCount === 0) {
        alert("Please add atleast one row to save as template");
    }
    else {
        $("#new-template-name").val('');
        $(".err-exists-template").hide();
        $(".err-need-template").hide();

        $("#save-as-template-popup").modal("show");
        $('body').off('click', '#save-as-template').on('click', '#save-as-template', function () {
            var newTemplateName = $("#new-template-name").val().trim();
            var validTemplateName = 1;

            if (newTemplateName == "") {
                $(".err-exists-template").hide();
                $(".err-need-template").show();
                validTemplateName = 0;
            }
            else {
                $(".err-need-template").hide();
                validTemplateName = 1;
                for (var templateIndex = 0; templateIndex < autocompleteDrodownArray['Template'].length; templateIndex++) {
                    var element = autocompleteDrodownArray['Template'][templateIndex].TemplateName;
                    if (element.toLowerCase() == newTemplateName.toLowerCase()) {
                        validTemplateName = 0;
                        $(".err-exists-template").show();
                        break;
                    }
                }
                if (validTemplateName == 1) {
                    $(".err-exists-template").hide();
                    saveTemplateData(newTemplateName);
                }
            }
        });
    }
});
$('body').on('change', '#fromtemplate', function () {
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined" && $(this).val() !== '0') {
        GetPMUMappingData(true);
    }
});
$('body').on('click', "#ExcelDownload", function () {

    var projectId = parseInt($('#ProjectId').val())
    var hubId = parseInt($('#Hub').val())
    var projectName = $('#ProjectId option:selected').text()
    var hubName = $('#Hub option:selected').text()
    var version = $('#Version option:selected').text()
    var taskHeader = $('#pmumapping').dataTable().$('[data-headerid]').length;

    if (version == '' || version == null || typeof (version) == "undefined") {
        version = ''
    }
    var isValid = true;
    if (projectId == 0 && hubId == 0) {
        alert("Please select Project and Hub");
        isValid = false
    }
    else if (projectId == 0) {
        alert("Please select Project ");
        isValid = false
    }
    else if (hubId == 0) {
        alert("Please select Hub");
        isValid = false
    }
    else if (taskHeader === 0) {
        alert("No data in the grid");
        isValid = false;
    }
    else {
        isValid = true;
    }
    if (isValid) {
        window.location.href = ROOT + "ProjectTracker/GetPMUExcelSummaryData?projectId=" + projectId + "&&projectName=" + projectName + "&&HubId=" + hubId + "&&HubName=" + hubName + "&&Version=" + version;
    }

});
$("body").on('change', "#MappedProjectId", function () {

    var projectId = $("#MappedProjectId").val();

    if (parseInt(projectId === 0) || projectId == '') {

        $('#MappedHubId').empty();
        $('#MappedHubId').append('<option value="">--Select the HUB--</option>');
        $('#MappedHubId').select2();

    }
    else {
        $(".FromProjectId_error").text("");
        $.ajax({
            url: ROOT + 'ProjectTracker/GetNewPMUMappingsHubData',
            type: 'GET',
            dataType: 'JSON',
            async: false,
            data: {
                ProjectId: projectId,
            },
            success: function (result) {
                if (result.length > 0) {
                    $('#MappedHubId').empty();
                    $('#MappedHubId').append('<option value="">--Select the HUB--</option>');
                    $.each(result, function (index, item) {
                        $('#MappedHubId').append('<option value=' + item.Value + '>' + item.Text + '</option>');
                    });
                    $('#MappedHubId').select2();
                    $('#MappedHubId').each(function () {
                        $(this).select2({
                            dropdownParent: $(this).parent()
                        });
                    });
                }
            },
            error: function (result) {
                alert(result);
            }
        });
    }
});
$("body").on('click', '#Clone-Submit', function () {

    var projectId = $('#MappedProjectId').val();
    var hubid = $('#MappedHubId').val();
    var isResReq = $('#resource-req').val();

    var isValid = true;

    if (projectId == 0 || projectId == '' || projectId == null || typeof (projectId) == "undefined") {
        $(".FromProjectId_error").text("Please Select Project");
        isValid = false;
    }
    if (hubid == 0 || hubid == '' || hubid == null || typeof (hubid) == "undefined") {
        $(".FromHubId_error").text("Please Select Hub");
        isValid = false;
    }
    if (isValid) {
        var headerLength = $('#pmumapping').dataTable().$('[data-headerid]').length;
        var relationLength = $('#pmumapping').dataTable().$('[data-relationid]').length;

        if ((relationLength > 0 || headerLength > 0)) {
            confirm("Are you sure do you want to override the existing data?", function () {
                loadClonedProjectHubData(projectId, hubid, isResReq, 0)
                $("#cloneModal").modal("hide");
                $('#MappedHubId').val("").trigger('change');
                $('#MappedProjectId').val("").trigger('change');
            });
        }
        else {
            loadClonedProjectHubData(projectId, hubid, isResReq, 0)
            $("#cloneModal").modal("hide");
            $('#MappedHubId').val("").trigger('change');
            $('#MappedProjectId').val("").trigger('change');
        }
    }

});
$("#MappedHubId").on('change', function () {
    $(".FromHubId_error").text("");
});
$('input[name="checkedfilter"]').on('change', function () {
    var checkedCheckboxText = $('input[name="checkedfilter"]:checked').parent().text().trim();
    $.ajax({
        dataType: 'json',
        url: ROOT + "ProjectTracker/GetProjectBasedOnAction",
        method: "get",
        data: {
            Type: checkedCheckboxText
        },
        success: function (data) {
            if (data.length > 0) {
                $('#ProjectId').empty();
                $("#ProjectId").append('<option value="0">Select Project Name</option>')
                $.each(data, function (index, item) {
                    var option = "";

                    if (item.FilterStatus == 'P') {
                        if (item.PMUMappingStatus == null) {
                            option = '<option value=' + item.ProjectId + '>' + item.ProjectName + '</option>';
                        }
                        else {
                            option = '<option data-bgcolor="#358375 !important;" value=' + item.ProjectId + '>' + item.ProjectName + '</option>';
                        }
                    }
                    else {
                        option = '<option data-bgcolor="#358375 !important;" value=' + item.ProjectId + '>' + item.ProjectName + '</option>';
                    }
                    $('#ProjectId').append(option);
                });
                $('#ProjectId').select2();
                $("#ProjectId").trigger("change");
            } else {
                $('#ProjectId').empty();
                $('#ProjectId').select2();
                $("#ProjectId").trigger("change");
            }

            $('#ProjectId').select2({
                templateResult: function (data) {
                    if (!data.id) {
                        return data.text;
                    }
                    var option = $(data.element);
                    var bgColor = option.data('bgcolor') || 'block';
                    var text = option.text();
                    return $('<span style="color: ' + bgColor + ';  font-weight: bold;">' + text + '</span>');
                }
            });
        }
    });
});

$("body").on('click', '#DisplayVersionRemarks', function () {

    var version = $('#Version option:selected').text() == null ? '' : $('#Version option:selected').text();
    var hubId = parseInt($('#Hub option:selected').val());
    var projectId = parseInt($('#ProjectId').val());

    $.ajax({
        url: ROOT + "ProjectTracker/GetVersionRemarksDetails",
        method: "GET",
        dataType: 'JSON',
        data: {
            projectId: projectId,
            HubId: hubId,
            Version: version,
            IsFrom: 2
        },
        success: function (data) {
            if (data) {
                data = JSON.parse(data);
                VersionRemarksJqgrid(data);
            }
            else {
                alert(data);
            }
        },
        error: function (err) {
            alert(err);
        }
    });

});

//--------------------critical path----------------

var array = [];
var val = 0;
var criticalval = 0;
var criticalarray = [];
var SlNoDependency = [];
var SortedData = [];
var taskData = [];

function GetCriticalPath() {

    taskData = [];
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {

        var WBSHeaderId = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
        var task = $(obj).find('[data-task]').attr('data-task');
        var dependency = $(obj).find('[data-dependency]').val();
        var duration = $(obj).find('[data-duration]').val();
        var projectId = $('#ProjectId').val();
        var SlNo = $(obj).find('[data-slno]').attr('data-slno');
        var startdate = $(obj).find('[data-startdate]').val();
        var enddate = $(obj).find('[data-enddate]').val();
        $(obj).find('[data-slno]').removeClass('highlight-slno');
        $('#pmumapping tbody tr').eq(SlNo).find('td[data-slack]').text("");
        if (WBSHeaderId != "" || task != "") {
            var pmuMappings = {
                WBSHeaderId: WBSHeaderId == "" ? 0 : parseInt(WBSHeaderId),
                TaskId: task == "" ? 0 : parseInt(task),
                Dependency: dependency,
                Duration: duration == "" ? 0 : parseInt(duration),
                ProjectId: parseInt(projectId),
                SlNo: parseInt(SlNo),
                StartDate: startdate,
                EndDate: enddate
            }
            taskData.push(pmuMappings);
        }

    });

    computeCPM(taskData);
}
function getTaskCode(data, code) {

    var index = 0;
    var flag = 0;

    $.each(data, function (i, task) {
        var inputString = code;
        var fsIndex = inputString.toUpperCase().indexOf("FS");
        var ssIndex = inputString.toUpperCase().indexOf("SS");
        var fsCharacters = inputString.substring(0, fsIndex).length;
        var ssCharacters = inputString.substring(0, ssIndex).length;
        if ((fsIndex !== -1 && fsIndex > 0) || (ssIndex !== -1 && ssIndex > 0)) {
            var letterBefore;
            if (fsIndex !== -1) {
                letterBefore = inputString.substring(fsIndex - fsCharacters, fsIndex).toUpperCase();
            } else {
                letterBefore = inputString.substring(ssIndex - ssCharacters, ssIndex).toUpperCase();
            }
            if (task.SlNo == letterBefore) {
                flag = 1;
                task.dependentslno = letterBefore;
                return false;
            }
        }
        else {
            if (task.SlNo == inputString) {
                flag = 1;
                task.dependentslno = letterBefore;
                return false;
            }
        }
        index++;
    });

    if (flag === 1) {
        return index;
    } else {
        return -1;
    }

}
function SortAccordingtoDependency(myData) {
    var succesorslno = [];
    SlNoDependency = [];
    SortedData = [];
    var countt = 0; // No of task in the array
    var HeaderCount = [];
    for (var i = 0; i < myData.length; i++) {
        if (myData[i].WBSHeaderId != 0) {
            HeaderCount.push(myData[i].SlNo)
        }
        if (myData[i].TaskId != 0) {
            countt++
            var arrayslno = {}
            var depend = myData[i].Dependency?.split(',');
            var highestLetterBefore = 0;
            $.each(depend, function (j, dep) {
                var relationindex = dep.indexOf('F') > -1 ? dep.indexOf('F') : dep.indexOf('S');
                var letterBefore = dep.substr(0, relationindex);
                if (parseInt(letterBefore) > highestLetterBefore) {
                    highestLetterBefore = parseInt(letterBefore);
                }
            })
            if (highestLetterBefore != 0) {
                if (!SlNoDependency.includes(highestLetterBefore)) {

                    succesorslno.push({
                        SlNo: myData[i].SlNo,
                        HighestDependentNo: highestLetterBefore,
                        AllData: myData[i]
                    });
                }
                else if (SlNoDependency.includes(highestLetterBefore)) {

                    // pushing data and slNo to main array (SlNoDependency,SortedData)

                    SlNoDependency.push(myData[i].SlNo);
                    SortedData.push(myData[i]);
                    var found = false;
                    for (var j = 0; j < succesorslno.length; j++) {
                        if (succesorslno[j].HighestDependentNo == myData[i].SlNo) {
                            found = true;
                            SlNoDependency.push(succesorslno[j].SlNo);
                            SortedData.push(succesorslno[j].AllData);
                            for (var k = 0; k < succesorslno.length; k++) {
                                if (succesorslno[k].HighestDependentNo == succesorslno[j].SlNo) {
                                    SlNoDependency.push(succesorslno[k].SlNo);
                                    SortedData.push(succesorslno[k].AllData);
                                }
                            }
                        }
                    }
                }
            }
            else {
                SlNoDependency.push(myData[i].SlNo);
                SortedData.push(myData[i]);
                for (var k = 0; k < succesorslno.length; k++) {
                    if (succesorslno[k].HighestDependentNo == myData[i].SlNo) {
                        SlNoDependency.push(succesorslno[k].SlNo);
                        SortedData.push(succesorslno[k].AllData);
                    }
                }
            }
        }
    }
    var count = 0;
    while (countt != SortedData.length) {
        // if both array length is not same, then use successor array and insert that slno data to main array (SlNoDependency,SortedData)
        count++
        if (succesorslno.length > 0) {
            for (var q = 0; q < succesorslno.length; q++) {
                if (!SlNoDependency.includes(succesorslno[q].SlNo) && SlNoDependency.includes(succesorslno[q].HighestDependentNo)) {
                    SlNoDependency.push(succesorslno[q].SlNo);
                    SortedData.push(succesorslno[q].AllData);
                }
                else if (succesorslno[q].SlNo == succesorslno[q].HighestDependentNo) {
                    return SortedData;
                }
                else if (HeaderCount.includes(succesorslno[q].SlNo) || HeaderCount.includes(succesorslno[q].HighestDependentNo)) {
                    return SortedData;
                }
            }
        }
        if (count > countt) {
            return SortedData;
        }
    }
    return SortedData;
}
function forwardPass(myData) {

    var nTask = myData.length;
    var temp = [];
    var tempdate = [];
    array = [];
    Arraylength = 0;
    val = 0;

    $.each(myData, function (i, task) {

        //DurationWdependency ---> Duration + Dependency Sum

        // Only Task
        if (task.WBSHeaderId == 0) {

            // if No dependency is there
            if (task.Dependency == null || task.Dependency == "") {
                task.ES = 0;
                try {
                    task.DurationWdependency = task.Duration;
                    task.EF = task.ES + task.Duration;
                }
                catch (error) {
                }
            }
            // if Dependency is there
            else {

                var depend = task.Dependency.split(',');
                var dependencyDuration = [];

                $.each(depend, function (j, pred) {

                    var index = getTaskCode(myData, pred);
                    var fsIndex = pred.toUpperCase().indexOf("FS");
                    var ssIndex = pred.toUpperCase().indexOf("SS");
                    if (pred.indexOf('+') != -1) {
                        dependencyDuration.push(parseInt(pred.substr(pred.indexOf('+')),));
                    }
                    else if (pred.indexOf('-') != -1) {
                        dependencyDuration.push(parseInt(pred.substr(pred.indexOf('-')),));
                    }
                    if (fsIndex != -1) {
                        temp.push(myData[index].EF + (dependencyDuration[j] == undefined ? 0 : dependencyDuration[j]));
                        if (dependencyDuration[j] != undefined) {
                            var NewDate = moment(addBusinessDays(moment(myData[index].EndDate, "DD/MM/YYYY"), dependencyDuration[j])).format("DD/MM/YYYY");
                            tempdate.push({ date: NewDate, leadlag: dependencyDuration[j], EF: myData[index].EF });
                        }
                    }
                    else {
                        temp.push(myData[index].ES + (dependencyDuration[j] == undefined ? 0 : dependencyDuration[j]));
                        if (dependencyDuration[j] != undefined) {
                            var NewDate = moment(addBusinessDays(moment(myData[index].EndDate, "DD/MM/YYYY"), dependencyDuration[j])).format("DD/MM/YYYY");
                            tempdate.push({ date: NewDate, leadlag: dependencyDuration[j], EF: myData[index].ES });
                        }
                    }

                });
                var dateObjects = tempdate.map(function (entry) {
                    var parts = entry.date.split('/');
                    var day = parseInt(parts[0], 10);
                    var month = parseInt(parts[1], 10) - 1;
                    var year = parseInt(parts[2], 10);
                    return new Date(year, month, day);
                });

                // Get timestamps from Date objects
                var timestamps = dateObjects.map(function (date) {
                    return date.getTime();
                });

                // Find the maximum timestamp
                var maxTimestamp = Math.max.apply(null, timestamps);

                // Find all indices of the maximum timestamp
                var maxIndices = timestamps.reduce(function (indices, timestamp, index) {
                    if (timestamp === maxTimestamp) {
                        indices.push(index);
                    }
                    return indices;
                }, []);

                // Find the maximum leadlag among the maximum timestamp indices
                var maxLeadlagIndices = maxIndices.reduce(function (indices, currentIndex) {
                    var currentLeadlag = tempdate[currentIndex].leadlag;
                    if (indices.length === 0 || currentLeadlag > tempdate[indices[0]].leadlag) {
                        return [currentIndex];
                    } else if (currentLeadlag === tempdate[indices[0]].leadlag) {
                        indices.push(currentIndex);
                    }
                    return indices;
                }, []);

                // Find the maximum EF among the maximum leadlag indices
                var maxEFIndex = maxLeadlagIndices.reduce(function (maxIndex, currentIndex) {
                    return tempdate[currentIndex].EF > tempdate[maxIndex].EF ? currentIndex : maxIndex;
                }, maxLeadlagIndices[0]);
                task.ES = temp[maxEFIndex];
                var correspondingDuration = dependencyDuration[maxEFIndex];

                try {
                    task.EF = task.ES + task.Duration;
                    // console.log(task.SlNo,"ES - " + task.ES,"EF - " +task.EF)
                    task.DurationWdependency = task.Duration + (correspondingDuration == undefined ? 0 : correspondingDuration);
                } catch (error) {

                }
                //var getval = "";
                //var Arraylength = Object.values(array).map(array => array.length).length;
                //for (var i = 1; i <= Arraylength; i++) {
                //    var innerArryLength = array["Array" + i].length;
                //    for (var j = 0; j < innerArryLength; j++) {
                //        task.dependentslno = "";
                //        var inputString = task.Dependency.split(',');
                //        for (var k = 0; k < inputString.length; k++) {
                //            var fsIndex = inputString[k].toUpperCase().indexOf("FS");
                //            var ssIndex = inputString[k].toUpperCase().indexOf("SS");
                //            var fsCharacters = inputString[k].substring(0, fsIndex).length;
                //            var ssCharacters = inputString[k].substring(0, ssIndex).length;
                //            if ((fsIndex !== -1 && fsIndex > 0) || (ssIndex !== -1 && ssIndex > 0)) {
                //                var letterBefore;
                //                if (fsIndex !== -1) {
                //                    letterBefore = inputString[k].substring(fsIndex - fsCharacters, fsIndex).toUpperCase();
                //                } else {
                //                    letterBefore = inputString[k].substring(ssIndex - ssCharacters, ssIndex).toUpperCase();
                //                }
                //                task.dependentslno += letterBefore + ',';
                //            }
                //        }
                //        var dependecyarray = task.dependentslno.replace(/,$/, '').split(",");
                //        for (var n = 0; n < dependecyarray.length; n++) {
                //            if (array["Array" + i][j].SlNo == dependecyarray[n]) {
                //                getval += i + ',';
                //            }
                //        }
                //    }
                //}
                //if (getval == "") {
                //    array["Array" + val][Arraylength] = task;
                //}
                //else {
                //    var getvalArray = getval.replace(/,$/, '').split(",");
                //    var uniqueValues = [...new Set(getvalArray)];
                //    for (var m = 0; m < uniqueValues.length; m++) {
                //        Arraylength = array["Array" + uniqueValues[m]].length
                //        array["Array" + uniqueValues[m]][Arraylength] = task
                //    }
                //}
                temp = [];
                tempdate = [];
            }
            //console.log(myData[i].SlNo, "ES -" + myData[i].ES, "EF -" + myData[i].EF)
        }

    });

    return myData;

}
function backwardPass(myData) {
    var nTask = myData.length;
    var temp = [];
    var tempdate = [];
    var successors = [];
    var EndDates = [];
    //var Arraylength = Object.values(array).map(array => array.length).length;
    //for (var i = 1; i <= Arraylength; i++) {
    //    var innerArryLength = array["Array" + i].length;
    //    for (var j = innerArryLength - 1; j >= 0; j--) {
    for (var i = myData.length - 1; i >= 0; i--) {
        if (myData[i].Dependency !== "") {
            var dependencyDuration = [];
            var depend = myData[i].Dependency.split(',');
            $.each(depend, function (k, pred) {
                var ssIndex = pred.toUpperCase().indexOf("SS");
                //  if (ssIndex == -1) { 
                var index = getTaskCode(myData, pred);
                if (!myData["successors"]) {
                    myData["successors"] = [];
                }
                if (myData["successors"][index] !== undefined) {
                    myData["successors"][index] += ',' + myData[i].SlNo;
                }
                else {
                    myData["successors"][index] = myData[i].SlNo;
                }
                //}
            });
        }
    }
    //for (var i = 1; i <= Arraylength; i++) {
    //    var innerArryLength = array["Array" + i].length;
    //    for (var j = 0; j <= innerArryLength - 1; j++) {
    for (var i = 0; i < myData.length; i++) {
        EndDates.push({ EndDate: myData[i].EndDate, SlNo: myData[i].SlNo, EF: myData[i].EF });
        if (myData.length == 1) {
            myData[i].SUCCESSORS = undefined
        }
        else {
            if (myData["successors"] != undefined && myData["successors"] != null && myData["successors"] != "") {
                myData[i].SUCCESSORS = myData["successors"][i]?.toString().split(',');
            }
        }
        //}
    }
    var dateObjects = EndDates.map(function (date) {
        var parts = date.EndDate.split('/');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1;
        var year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    });
    var timestamps = dateObjects.map(function (date) {
        return date.getTime();
    });
    var maxTimestamp = Math.max.apply(null, timestamps);
    var maxIndex = timestamps.indexOf(maxTimestamp);
    var maxEF = EndDates[maxIndex];
    //for (var i = 1; i <= Arraylength; i++) {
    //    var innerArryLength = array["Array" + i].length;
    //    for (var j = innerArryLength - 1; j >= 0; j--) {
    for (var i = myData.length - 1; i >= 0; i--) {
        if (myData[i].SUCCESSORS == null || myData[i].SUCCESSORS == undefined || myData[i].SlNo == maxEF?.SlNo) {
            // added code to get the maxenddate ef value
            myData[i].LF = maxEF?.EF;

            // array["Array" + i][j].LF = array["Array" + i].length > 0 ? Math.max(...array["Array" + i].map(m => !isNaN(m.EF) ? m.EF : 0)) : 0;
            //array["Array" + i][j].LF = array["Array" + i].length > 0 ? array["Array" + i][j].EF : 0;
            // added because for to get the end node as the SS
            myData[i].LS = myData[i].LF - myData[i].Duration;
        }
        else {
            var successor = myData[i].SUCCESSORS.toString().split(',');
            var dependencyDuration = [];
            $.each(successor, function (mm, succ) {
                var index = getTaskCode(myData, succ);
                if (myData[index] && !isNaN(myData[index].LS)) {
                    //var ssIndex = array["Array" + i][index].Dependency.toUpperCase().indexOf("SS");
                    //var fsIndex = array["Array" + i][index].Dependency.toUpperCase().indexOf("FS");
                    var ssIndex = "", fsIndex = "";

                    var succdependency = myData[index].Dependency.split(',');
                    // if succdependency having multiple dependencies..
                    $.each(succdependency, function (aa, aobj) {
                        var relationindex = aobj.indexOf('F') > -1 ? aobj.indexOf('F') : aobj.indexOf('S');
                        var letterBefore = parseInt(aobj.substr(0, relationindex));
                        if (myData[i].SlNo == letterBefore) {
                            ssIndex = aobj.toUpperCase().indexOf("SS");
                            fsIndex = aobj.toUpperCase().indexOf("FS");
                            if (aobj.indexOf('+') != -1) {
                                dependencyDuration.push(parseInt(aobj.substr(aobj.indexOf('+')),));
                            }
                            else if (aobj.indexOf('-') != -1) {
                                dependencyDuration.push(parseInt(aobj.substr(aobj.indexOf('-')),));
                            }
                        }
                    })
                    if (fsIndex != -1) {
                        temp.push(myData[index].LS - dependencyDuration[mm]);
                        tempdate.push(myData[index].EndDate)
                    }
                    else {
                        temp.push(myData[index].LS + myData[i].Duration - dependencyDuration[mm]);
                        tempdate.push(myData[index].StartDate)
                    }
                }
            });

            if (temp.length > 0) {
                myData[i].LF = Math.min.apply(null, temp);
                myData[i].LS = myData[i].LF - myData[i].Duration;
            } else {
                if (myData[i].SUCCESSORS != undefined && temp.length == 0) {
                    myData[i].LF = myData.length > 0 ? myData[i].EF : 0;
                    myData[i].LS = myData[i].LF - myData[i].Duration;
                } else {
                    myData[i].LF = myData[i].Duration;
                    myData[i].LS = 0;
                }
            }
            //  console.log(myData[i].SlNo, "ES - " + myData[i].ES, "EF - " + myData[i].EF, "LS - " + myData[i].LS, "LF - " + myData[i].LF);
            temp = [];
            tempdate = [];
            dependencyDuration = [];
        }
        //}
    }
    return myData;
}
function slack(myData) {
    for (var i = 0; i < myData.length; i++) {
        myData[i].SLACK = myData[i].LS - myData[i].ES;
        myData[i].CRITICAL = (myData[i].SLACK === 0) ? "YES" : "NO";

        if (!isNaN(myData[i].SLACK)) {
            $('#pmumapping tbody tr').eq((myData[i].SlNo) - 1).find('td[data-slack]').text(myData[i].SLACK);
        }
    }
    return myData;
}
function computeCPM(myData) {
    myData = SortAccordingtoDependency(myData);
    myData = forwardPass(myData);
    myData = backwardPass(myData);
    myData = slack(myData);
    printTask(myData);
}
function printTask(myData) {
    criticalarray = [];
    criticalval = 0;
    array = [];
    Arraylength = 0;
    val = 0;
    $.each(myData, function (ob, task) {
        if (task.Dependency == null || task.Dependency == "") {
            val = val + 1;
            if (!array["Array" + val]) {
                array["Array" + val] = [];
                array["Array" + val].push(task);
            }
        }
        else {
            var getval = "";
            var Arraylength = Object.values(array).map(array => array.length).length;
            for (var i = 1; i <= Arraylength; i++) {
                var innerArryLength = array["Array" + i]?.length;
                for (var j = 0; j < innerArryLength; j++) {
                    task.dependentslno = "";
                    var inputString = task.Dependency.split(',');
                    for (var k = 0; k < inputString.length; k++) {
                        var fsIndex = inputString[k].toUpperCase().indexOf("FS");
                        var ssIndex = inputString[k].toUpperCase().indexOf("SS");
                        var fsCharacters = inputString[k].substring(0, fsIndex).length;
                        var ssCharacters = inputString[k].substring(0, ssIndex).length;
                        if ((fsIndex !== -1 && fsIndex > 0) || (ssIndex !== -1 && ssIndex > 0)) {
                            var letterBefore;
                            if (fsIndex !== -1) {
                                letterBefore = inputString[k].substring(fsIndex - fsCharacters, fsIndex).toUpperCase();
                            } else {
                                letterBefore = inputString[k].substring(ssIndex - ssCharacters, ssIndex).toUpperCase();
                            }
                            task.dependentslno += letterBefore + ',';
                        }
                    }
                    var dependecyarray = task.dependentslno.replace(/,$/, '').split(",");
                    for (var n = 0; n < dependecyarray.length; n++) {
                        if (array["Array" + i][j].SlNo == dependecyarray[n]) {
                            getval += i + ',';
                        }
                    }
                }
            }
            if (getval == "") {
                array["Array" + val][Arraylength] = task;
            }
            else {
                var getvalArray = getval.replace(/,$/, '').split(",");
                var uniqueValues = [...new Set(getvalArray)];
                for (var m = 0; m < uniqueValues.length; m++) {
                    Arraylength = array["Array" + uniqueValues[m]].length
                    array["Array" + uniqueValues[m]][Arraylength] = task
                }
            }
        }
    });

    var Arraylength = Object.values(array).map(array => array.length).length;
    for (var i = 1; i <= Arraylength; i++) {
        var innerArryLength = array["Array" + i]?.length;
        for (var j = innerArryLength - 1; j >= 0; j--) {

            /*console.log(array["Array" + i][j].SlNo);*/
            if (array["Array" + i][j].CRITICAL == "YES") {
                if (array["Array" + i][j].SUCCESSORS == undefined) {
                    criticalval = 1 + criticalval;
                    criticalarray["Array" + criticalval] = [];
                    criticalarray["Array" + criticalval].push(array["Array" + i][j])
                }
                else {
                    var Sucessor = array["Array" + i][j].SUCCESSORS;

                    var CriticalArrayLength = Object.values(criticalarray).map(criticalarray => criticalarray.length).length;
                    if (CriticalArrayLength == 0) {
                        criticalval = 1 + criticalval;
                        criticalarray["Array" + criticalval] = [];
                        criticalarray["Array" + criticalval].push(array["Array" + i][j])
                    }
                    else {
                        for (var q = 1; q <= CriticalArrayLength; q++) {
                            if (criticalarray["Array" + q] != undefined) {
                                var innerCriticalArryLength = criticalarray["Array" + q].length;
                                for (var b = 0; b < Sucessor.length; b++) {
                                    for (var r = innerCriticalArryLength - 1; r >= 0; r--) {
                                        if (criticalarray["Array" + q][r]?.SlNo == Sucessor[b]) {
                                            criticalarray["Array" + q].push(array["Array" + i][j])
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var maxArray = [];
    for (var key in criticalarray) {

        if (criticalarray.hasOwnProperty(key)) {
            var countkeyduration = 0;
            var tempdate = [];
            var keyCriticalarray = [...new Set(criticalarray[key])];

            for (var i = 0; i < keyCriticalarray?.length; i++) {

                //if (keyCriticalarray[i].Dependency != "") {
                //    var depend = keyCriticalarray[i].Dependency.split(',');
                //    $.each(depend, function (de, dobj) {
                //        var ssIndex = dobj.toUpperCase().indexOf("SS");
                //        if (ssIndex != -1) {
                //            var letterBefore = parseInt(dobj.substr(0, ssIndex));
                //            var indexofleadorlag = dobj.indexOf('+') > -1 ? dobj.indexOf('+') : dobj.indexOf('-');
                //            var leadorlag = parseInt(dobj.substr(indexofleadorlag),)
                //            if (keyCriticalarray[i + 1].SlNo == letterBefore) {
                //                countkeyduration = countkeyduration + (keyCriticalarray[i].Duration - keyCriticalarray[i + 1].Duration) + leadorlag;
                //            }
                //        }
                //        else {
                //            var fsIndex = dobj.toUpperCase().indexOf("FS");
                //            var letterBefore = parseInt(dobj.substr(0, fsIndex));
                //            if (keyCriticalarray[i + 1].SlNo == letterBefore) {
                //                var indexofleadorlag = dobj.indexOf('+') > -1 ? dobj.indexOf('+') : dobj.indexOf('-');
                //                var leadorlag = parseInt(dobj.substr(indexofleadorlag),)
                //                countkeyduration = countkeyduration + keyCriticalarray[i].Duration + leadorlag;
                //            }
                //        }
                //    })
                //}
                //else {
                //    countkeyduration = countkeyduration + keyCriticalarray[i].DurationWdependency;
                //}
                //tempdate.push(keyCriticalarray[i].EndDate);

                countkeyduration = countkeyduration + keyCriticalarray[i].DurationWdependency;
                tempdate.push(keyCriticalarray[i].EndDate);
            }
            var dateObjects = tempdate.map(function (date) {
                var parts = date.split('/');
                var day = parseInt(parts[0], 10);
                var month = parseInt(parts[1], 10) - 1;
                var year = parseInt(parts[2], 10);
                return new Date(year, month, day);
            });
            var timestamps = dateObjects.map(function (date) {
                return date.getTime();
            });

            var maxTimestamp = Math.max.apply(null, timestamps);
            var maxIndex = timestamps.indexOf(maxTimestamp);
            var maxtime = tempdate[maxIndex];

            maxArray.push({
                arrayKey: key,
                DurationSum: countkeyduration
                , MaxEndDate: maxtime,
                MaxtimeStamp: maxTimestamp
            })
        }
    }

    var MaxtimeinArray = Math.max(...maxArray.map(item => item.MaxtimeStamp));
    var keysWithMaxDuration = maxArray.filter(item => item.MaxtimeStamp === MaxtimeinArray);

    var criticalsl = []
    if (keysWithMaxDuration.length != undefined) {
        $.each(keysWithMaxDuration, function (a, paths) {
            var Uniqcriticalarray = [...new Set(criticalarray[paths.arrayKey])];

            for (var k = Uniqcriticalarray.length - 1; k >= 0; k--) {
                var depend = Uniqcriticalarray[k].Dependency.split(',');
                if (depend == "") {
                    var critlen = Object.values(criticalsl).map(criticalsl => criticalsl.length).length;
                    if (!criticalsl["A" + critlen]) {
                        criticalsl["A" + critlen] = [];
                        criticalsl["A" + critlen].push(Uniqcriticalarray[k]);
                    }
                } else {
                    $.each(depend, function (j, dep) {
                        var relationindex = dep.indexOf('F') > -1 ? dep.indexOf('F') : dep.indexOf('S');
                        var letterBefore = parseInt(dep.substr(0, relationindex));
                        var criticalslLenght = Object.values(criticalsl).map(criticalsl => criticalsl.length).length;
                        for (var x = 0; x < criticalslLenght; x++) {
                            var criticalinslength = criticalsl["A" + x]?.length
                            if (criticalsl["A" + x][criticalinslength - 1]?.SlNo == letterBefore) {
                                if (Uniqcriticalarray[k].SUCCESSORS?.length == 1 || Uniqcriticalarray[k].SUCCESSORS == undefined) {

                                    for (var y = x; y <= criticalslLenght; y++) {
                                        var criticalremlength = criticalsl["A" + (y + 1)]?.length
                                        if (criticalremlength != undefined) {
                                            if (criticalsl["A" + (y + 1)][criticalremlength - 1]?.SlNo == letterBefore) {
                                                if (criticalremlength !== criticalinslength) {

                                                    if (!criticalsl["A" + (y + 1)].some(m => m.SlNo == Uniqcriticalarray[k].SlNo)) {
                                                        criticalsl["A" + (y + 1)].push(Uniqcriticalarray[k]);
                                                    }
                                                };
                                                for (var a = 0; a < criticalinslength; a++) {
                                                    if (criticalsl["A" + (y + 1)][a] !== criticalsl["A" + x][a]) {
                                                        if (!criticalsl["A" + (y + 1)].some(m => m.SlNo == Uniqcriticalarray[k].SlNo)) {
                                                            criticalsl["A" + (y + 1)].push(Uniqcriticalarray[k]);
                                                        }
                                                    };
                                                }
                                            }
                                        }
                                    }
                                    criticalsl["A" + x].push(Uniqcriticalarray[k])
                                    break;
                                }
                                else {
                                    //Added because of to insert into all the same last number
                                    for (var y = x; y <= criticalslLenght; y++) {
                                        var criticalremlength = criticalsl["A" + (y + 1)]?.length
                                        if (criticalremlength != undefined) {
                                            if (criticalsl["A" + (y + 1)][criticalremlength - 1]?.SlNo == letterBefore) {
                                                if (criticalremlength !== criticalinslength) {
                                                    if (!criticalsl["A" + (y + 1)].some(m => m.SlNo == Uniqcriticalarray[k].SlNo)) {
                                                        criticalsl["A" + (y + 1)].push(Uniqcriticalarray[k]);
                                                    }
                                                };
                                                for (var a = 0; a < criticalinslength; a++) {
                                                    if (criticalsl["A" + (y + 1)][a] !== criticalsl["A" + x][a]) {
                                                        if (!criticalsl["A" + (y + 1)].some(m => m.SlNo == Uniqcriticalarray[k].SlNo)) {
                                                            criticalsl["A" + (y + 1)].push(Uniqcriticalarray[k]);
                                                        }
                                                    };
                                                }
                                            }
                                        }
                                    }
                                    criticalsl["A" + x].push(Uniqcriticalarray[k])
                                    $.each(Uniqcriticalarray[k].SUCCESSORS, function (row, rowobj) {
                                        if (row < Uniqcriticalarray[k].SUCCESSORS.length - 1) {
                                            var critlen = Object.values(criticalsl).map(criticalsl => criticalsl.length).length;
                                            if (!criticalsl["A" + critlen]) {
                                                criticalsl["A" + critlen] = [];
                                                for (var n = 0; n < criticalsl["A" + x]?.length; n++) {
                                                    criticalsl["A" + critlen].push(criticalsl["A" + x][n]);
                                                }
                                            }
                                        }
                                    });
                                    break;
                                }
                            }
                        }
                    })
                }
            }
        });

        var maxDurationSum = Math.max(...maxArray.map(item => item.DurationSum));
        var keysWithMaxDuration = maxArray.filter(item => item.DurationSum === maxDurationSum)

        var PrevMaxArray = keysWithMaxDuration;
        var maxArray = [];
        for (var key in criticalsl) {
            if (criticalsl.hasOwnProperty(key)) {
                var countkeyduration = 0;
                var keyCriticalarray = [...new Set(criticalsl[key])];
                for (var i = 0; i < keyCriticalarray?.length; i++) {
                    if (keyCriticalarray[i].Dependency != "") {
                        var depend = keyCriticalarray[i].Dependency.split(',');
                        $.each(depend, function (de, dobj) {
                            var ssIndex = dobj.toUpperCase().indexOf("SS");
                            if (ssIndex != -1) {
                                var letterBefore = parseInt(dobj.substr(0, ssIndex));
                                var indexofleadorlag = dobj.indexOf('+') > -1 ? dobj.indexOf('+') : dobj.indexOf('-');
                                var leadorlag = parseInt(dobj.substr(indexofleadorlag),)
                                if (keyCriticalarray[i - 1].SlNo == letterBefore) {
                                    countkeyduration = countkeyduration + (keyCriticalarray[i].Duration - keyCriticalarray[i - 1].Duration) + leadorlag;
                                }
                            }
                            else {
                                var fsIndex = dobj.toUpperCase().indexOf("FS");
                                var letterBefore = parseInt(dobj.substr(0, fsIndex));
                                if (keyCriticalarray[i - 1].SlNo == letterBefore) {
                                    var indexofleadorlag = dobj.indexOf('+') > -1 ? dobj.indexOf('+') : dobj.indexOf('-');
                                    var leadorlag = parseInt(dobj.substr(indexofleadorlag),)
                                    countkeyduration = countkeyduration + keyCriticalarray[i].Duration + leadorlag;
                                }
                            }
                        })
                    }
                    else {
                        countkeyduration = countkeyduration + keyCriticalarray[i].DurationWdependency;
                    }
                }

                maxArray.push({
                    arrayKey: key,
                    DurationSum: countkeyduration
                })
            }
        }

        if (maxArray.length != 0) {
            var maxDurationSum = Math.max(...maxArray.map(item => item.DurationSum));
            var keysWithMaxDuration = maxArray.filter(item => item.DurationSum === maxDurationSum);

            if (keysWithMaxDuration != "") {
                $.each(keysWithMaxDuration, function (i, obj) {
                    for (var i = 0; i < criticalsl[obj.arrayKey].length; i++) {
                        $('#pmumapping tbody tr td[data-slno="' + criticalsl[obj.arrayKey][i].SlNo + '"]').addClass('highlight-slno');
                    }
                })
            }
        }
        else if (PrevMaxArray != "") {
            $.each(PrevMaxArray, function (i, obj) {
                for (var i = 0; i < criticalarray[obj.arrayKey].length; i++) {
                    $('#pmumapping tbody tr td[data-slno="' + criticalarray[obj.arrayKey][i].SlNo + '"]').addClass('highlight-slno');
                }
            });
        }
    }
}
function SaveCriticalPathData(version) {

    var formData = new FormData();
    var pmuMappingsArray = [];
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
        var wbsHeader = $(obj).find('[data-wbsheader]').attr('data-wbsheader');
        var headerid = $(obj).attr('data-headerid');
        var task = $(obj).find('[data-task]').attr('data-task');
        var projectId = $('#ProjectId').val();
        var rowNo = $(obj).find('[data-slno]').attr('data-slno');
        var relationId = $(obj).attr('data-relationid');
        var Slack = $(obj).find('[data-slack]').text();
        var containsHighlightSlno = $(obj).find('[data-slno]').hasClass('highlight-slno');
        var isCritical = containsHighlightSlno ? 1 : 0;

        if (headerid !== null && headerid !== '' && typeof (headerid) !== "undefined" &&
            wbsHeader !== null && wbsHeader !== '' && typeof (wbsHeader) !== "undefined") {
            var pmuMappings = {
                WBSHeader: parseInt(wbsHeader),
                Task: 0,
                RelationId: 0,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                Slack: '',
                isCritical: ''
            }
            pmuMappingsArray.push(pmuMappings);
        }

        if (relationId !== null && relationId !== '' && typeof (relationId) !== "undefined" &&
            task !== null && task !== '' && typeof (task) !== "undefined") {
            var pmuMappings = {
                WBSHeader: 0,
                Task: parseInt(task),
                RelationId: parseInt(relationId),
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                Slack: Slack,
                isCritical: isCritical
            }
            pmuMappingsArray.push(pmuMappings);
        }
    });

    formData.append("PMUMappings", JSON.stringify(pmuMappingsArray));
    formData.append("PMUVersion", version);
    formData.append("HubId", parseInt($('#Hub option:selected').val()));
    formData.append("ProjectId", $('#ProjectId').val());

    $.ajax({
        url: ROOT + 'ProjectTracker/SavePreviousVersionPath',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

}

// ---------------------------------------------Sl No Sorting Array

//var sortedSlNoArray = [];
//var unsortedArray = [];
//var unsortedSlNo = [];

//function slNoSortingArray2(myData) {
//    unsortedArray = [];
//    sortedSlNoArray = [];

//    myData.forEach(function (e) {
//        if (e.TaskId != 0) {
//            unsortedArray.push({
//                slNo: e.SlNo,
//                dependency: dependencyDependentSlNo(e.Dependency.split(','))
//            });
//        }
//    });

//    unsortedArray.forEach(function (e) {
//        if (e.dependency.length === 0) {
//            sortedSlNoArray.push(e.slNo);
//        }
//    });

//    function processUnsorted() {

//        unsortedSlNo = unsortedArray.filter(e => !sortedSlNoArray.includes(e.slNo)).map(e => e.slNo);

//        if (unsortedSlNo.length > 0) {
//            var newlySorted = false;

//            unsortedSlNo.forEach(function (slNo) {
//                var element = unsortedArray.find(e => e.slNo === slNo);
//                var allDependenciesAvaliable = element.dependency.every(dep => sortedSlNoArray.includes(dep));

//                if (allDependenciesAvaliable) {
//                    sortedSlNoArray.push(element.slNo);
//                    newlySorted = true;
//                }
//            });

//            if (newlySorted) {
//                processUnsorted();
//            }
//        }
//    }

//    processUnsorted();

//    return sortedSlNoArray.toString();
//}
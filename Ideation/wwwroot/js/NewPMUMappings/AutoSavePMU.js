$(document).ready(function () {
    setInterval(() => {
        debugger;
        var isValidHeader = true;
        var isValidDetails = true;
        var taskHeader = $('#pmumapping').dataTable().$('[data-headerid]').length;
        if (taskHeader === 0) {
            isValidHeader = false;
        }
        $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
            var headerId = $(obj).attr('data-headerid');
            var headerslno = parseInt($(obj).find('[data-slno]').attr('data-slno'));
            var wbsheader = $('#row_' + headerslno).find('[data-wbsheader]').attr('data-wbsheader');
            if (wbsheader === null || wbsheader === '' || typeof (wbsheader) === "undefined") {
                isValidHeader = false;
            }

            var duration = $('#row_' + headerslno).find('[data-duration]').val();
            if (duration === null || duration === '' || typeof (duration) === "undefined") {
                isValidHeader = false;
            }

            var startdate = $('#row_' + headerslno).find('[data-startdate]').val();
            if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
                isValidHeader = false;
            }

            var enddate = $('#row_' + headerslno).find('[data-enddate]').val();
            if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
                isValidHeader = false;
            }

            var taskDetails = $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').length;
            if (taskDetails === 0) {
                isValidDetails = false;
                return false;
            }
            $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').each(function (detailsi, detailsobj) {
                var detailslno = parseInt($(detailsobj).find('[data-slno]').attr('data-slno'));
                var task = $('#row_' + detailslno).find('[data-task]').attr('data-task');
                if (task === null || task === '' || typeof (task) === "undefined") {
                    isValidDetails = false;
                }

                var duration = $('#row_' + detailslno).find('[data-duration]').val();
                if (duration === null || duration === '' || typeof (duration) === "undefined") {
                    isValidDetails = false;
                }

                var startdate = $('#row_' + detailslno).find('[data-startdate]').val();
                if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
                    isValidDetails = false;
                }

                var enddate = $('#row_' + detailslno).find('[data-enddate]').val();
                if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
                    isValidDetails = false;
                }

                if ($('#ApprovedLatestVersion').val() !== null && $('#ApprovedLatestVersion').val() !== '' && typeof ($('#ApprovedLatestVersion').val()) !== "undefined") {
                    var resources = $('#row_' + detailslno).find('[data-resources]').val();
                    if (resources === null || resources === '' || typeof (resources) === "undefined") {
                        isValidHeader = false;
                    }

                }
            })
        });
        if (isValidHeader && isValidDetails) {
          submitAutoData("", false);
        }
        $('#loader').hide();
        $("#loader").css("visibility", "hidden");
    }, 5* 60 * 1000)
});
function submitAutoData(version, islatest) {
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
        var percentage = $(obj).find('[data-percentage]').val() !== null && $(obj).find('[data-percentage]').val() !== '' && typeof ($(obj).find('[data-percentage]').val()) !== "undefined" ? parseFloat($(obj).find('[data-percentage]').val()) : 0;
        var resources = $(obj).find('[data-resources]').val();
        var remarks = $(obj).find('[data-remarks]').val();
        var projectId = $('#ProjectId').val();
        var rowNo = $(obj).find('[data-slno]').attr('data-slno');
        var files = $(obj).find("[data-files]")[0].files;
        var relationId = $(obj).attr('data-relationid');
        var milestonestatus = $(obj).attr('data-milestonestatus');
        var documentArray = [];
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
            })
        }
        if (headerid !== null && headerid !== '' && typeof (headerid) !== "undefined" &&
            wbsHeader !== null && wbsHeader !== '' && typeof (wbsHeader) !== "undefined" &&
            duration !== null && duration !== '' && typeof (duration) !== "undefined" &&
            startdate !== null && startdate !== '' && typeof (startdate) !== "undefined" &&
            enddate !== null && enddate !== '' && typeof (enddate) !== "undefined") {
            $.each(files, function (fileIndex, file) {
                if (file.size > 0) {
                    var timestamp = moment().valueOf();
                    formData.append(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp, file);
                    var extension = file.name.split(".").pop();
                    var document = {
                        ProjectId: parseInt(projectId),
                        RowNum: parseInt(rowNo),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", "")
                    };
                    documentArray.push(document);
                }
            })
            var DeletedDocumentsArray = deletedDocumentsArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
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
                Remarks: remarks,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                DocumentArray: documentArray,
                DependencyArray: [],
                DeletedDocumentsArray: DeletedDocumentsArray,
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                VersionRemarks: $('#VersionRemarks').val()
            }
            pmuMappingsArray.push(pmuMappings);
        }
        if (relationId !== null && relationId !== '' && typeof (relationId) !== "undefined" &&
            task !== null && task !== '' && typeof (task) !== "undefined" &&
            duration !== null && duration !== '' && typeof (duration) !== "undefined" &&
            startdate !== null && startdate !== '' && typeof (startdate) !== "undefined" &&
            enddate !== null && enddate !== '' && typeof (enddate) !== "undefined") {
            var dependencyArray = [];
            $.each(files, function (fileIndex, file) {
                if (file.size > 0) {
                    var timestamp = moment().valueOf();
                    formData.append(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp, file);
                    var extension = file.name.split(".").pop();
                    var document = {
                        ProjectId: parseInt(projectId),
                        RowNum: parseInt(rowNo),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", "")
                    };
                    documentArray.push(document);
                }
            })
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
            var DeletedDocumentsArray = deletedDocumentsArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
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
                Remarks: remarks,
                ProjectId: parseInt(projectId),
                RowNum: parseInt(rowNo),
                DocumentArray: documentArray,
                DependencyArray: dependencyArray,
                DeletedDocumentsArray: DeletedDocumentsArray,
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                VersionRemarks: $('#VersionRemarks').val()
            }
            pmuMappingsArray.push(pmuMappings);
        }
    })
    formData.append("PMUMappings", JSON.stringify(pmuMappingsArray));
    formData.append("PMUVersion", version);
    formData.append("IsLatest", islatest);
    formData.append("IsWeekendExcluded", $('#weekend-switching option:selected').val());
    formData.append("HubId", parseInt($('#Hub option:selected').val()));
    formData.append("ProjectId", $('#ProjectId').val());
    $.ajax({
        url: ROOT + 'Master/AutoSavePMUMappings', 
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            $('#VersionRemarks').val('');
            return false;
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    })
}


var selectedWBSHeadrId = 0;
var isExport = false;
var selectedTaskId = 0;
var selectedResourcesId = 0;
var documentDetails = [];
var remarksDetails = [];
var deletedDocumentsArray = [];
var autocompleteDrodownArray = [];
var wbsheaderArray = [];
var taskArray = [];
var isSavable = 1;
var DeletedRemarksArray = [];
//var isManuallySelectedSD = [];
//var isManuallySelectedED = [];
var from;
var to;

var flagloaded = 0;
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
function ajaxtocallgetdata() {    
    //checking any approval request is pending ?  

    $.ajax({
        url: ROOT + 'Master/CheckForApproval',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            projectId: parseInt($('#ProjectId').val()),
            HubId: parseInt($('#Hub option:selected').val()),
        },
        success: function (result) {
            if (result.length > 0) {
                
                isSavable = 0;
                getData();
                var html = "<b><ul>";
                $.each(result, function (i, obj) {
                    html += "<li>" + obj.TaskDesc + "</li>"
                })
                html += "</ul></b>";
                if ($("#RevisedRequestData").val() == null || $("#RevisedRequestData").val() == undefined || $("#RevisedRequestData").val() == "") {
                    alert("There is a end date request for the following Task(s).You cannot update the dates in the New PMU Mapping page until you approve the tasks."
                        + "</br>" + html);
                }
            }
            else
            {
                isSavable = 1;
                getData();
            }
        }
    })
}
$(document).ready(function () {
    var flagToAjaxCall = 0;
    $("#btnRemarks").hide();
    $("#addModal").modal("hide");
    $("#notes_span").hide();
    setInterval(() => {
        
        // version should not be created and isSavable should be one
        if (isSavable == 1 && ($("#Version").val() == "" || $("#Version").val() == null)) {
            submitAutoData("", false);
        }
        $('#loader').hide();
        $("#loader").css("visibility", "hidden");
    }, 5 * 60 * 1000)
    $('body').on('input', '.noSpacesField', function () {
        this.value = this.value.replace(/^\s+/g, '');
    });
    $("#new-wbsheader").autocomplete({
        source: function (request, response) {
            var filter_array = [];
            $.each(autocompleteDrodownArray.WBSHeader, function (i, obj) {
                if (obj.WBSHeaderDesc.toLowerCase().includes(request.term.trim().toLowerCase())){
                    filter_array.push(obj.WBSHeaderDesc)
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
                    filter_array.push(obj.TaskDesc)
                }

            });
            response(filter_array)
        },
        minLength: 2
    });
    $.ajax({
        url: ROOT + 'Master/DropdownList',
        type: 'POST',
        async: false,
        dataType: 'JSON',
        success: function (result) {
            autocompleteDrodownArray = result;
        }
    })

    if ($('#selectedProjectId').val() === null || $('#selectedProjectId').val() === '' || typeof ($('#selectedProjectId').val()) === "undefined" || $('#selectedProjectId').val() === '0') {
        $('.projectName_error').text('Please select the Project');

        $(".template-div").hide();
        $(".version-div").hide();
        $("#notes_span").show()
        $(".weekend-switching-div").hide();
        $(".weekend-selected-span").hide();

        $("#save-template").hide();
        $("#btnSubmit").hide();
        $("#btnApprove").hide();
        $('#btnClone').hide();

        flagToAjaxCall = 0;
    }
    else {
        $('#ProjectId').val($('#selectedProjectId').val());
        $('.projectName_error').text('');
        GetHubList($('#selectedProjectId').val());

        flagToAjaxCall = 1;
    }
    if ($('#selectedHubId').val() === null || $('#selectedHubId').val() === '' || typeof ($('#selectedHubId').val()) === "undefined" || $('#selectedHubId').val() === '0') {
        $('.hubName_error').text('Please select HUB');
        $(".template-div").hide();
        $(".version-div").hide();
        $("#notes_span").show();
        $(".weekend-switching-div").hide();
        $(".weekend-selected-span").hide();

        $("#save-template").hide();
        $("#btnSubmit").hide();
        $("#btnApprove").hide();
        $('#btnClone').hide();

        flagToAjaxCall = 0;
    }
    else {
        $('#Hub').val($('#selectedHubId').val()).change();
        $('.hubName_error').text('');

        flagToAjaxCall = 1;
    }
    
    if (flagToAjaxCall == 1 && flagloaded==0) {
        ajaxtocallgetdata();
    }

})
$('body').on('change', '#ProjectId', function () {   
    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== "undefined" && $('#ProjectId').val() !== '0') {

        $('.projectName_error').text('');
        if ($('#Hub').val() === null || $('#Hub').val() === '' || typeof ($('#Hub').val()) === "undefined" || $('#Hub').val() === '0') {
            $('.hubName_error').text('Please select HUB');
        }
        else {
            
            ajaxtocallgetdata();
        }
    }
    else {

        $('.projectName_error').text('Please select the Project');
        if ($('#Hub').val() === null || $('#Hub').val() === '' || typeof ($('#Hub').val()) === "undefined" || $('#Hub').val() === '0') {
            $('.hubName_error').text('Please select HUB');
        }

        $('#pmumappingtablediv').html('');
        $(".template-div").hide();
        $(".version-div").hide();
        $("#notes_span").show();
        $(".weekend-switching-div").hide();
        $(".weekend-selected-span").hide();
        $("#save-template").hide();
        $("#btnSubmit").hide();
        $("#btnApprove").hide();
        $('#btnClone').hide();

        $('#OverAllProjectPercentage').text('');
        $('#OverAllStartDate').text('');
        $('#OverAllEndDate').text('');
       
    }
    GetHubList($('#ProjectId').children(":selected").attr('value'));   
});
$('body').on('change', '#Hub', function () {
    $("#notes_span").show();
    if ($('#Hub').val() !== null && $('#Hub').val() !== '' && typeof ($('#Hub').val()) !== "undefined" && $('#Hub').val() !== '0') {
        $('.hubName_error').text('');
        if ($('#ProjectId').val() === null || $('#ProjectId').val() === '' || typeof ($('#ProjectId').val()) === "undefined" || $('#ProjectId').val() === '0') {
            $('.projectName_error').text('Please select the Project');
        }
        else {
            
            ajaxtocallgetdata();
            flagloaded = 1;               
        }
    }
    else {
        $('.hubName_error').text('Please select HUB');
        if ($('#ProjectId').val() === null || $('#ProjectId').val() === '' || typeof ($('#ProjectId').val()) === "undefined" || $('#ProjectId').val() === '0') {
            $('.projectName_error').text('Please select the Project');
        }

        $('#pmumappingtablediv').html('');
        $(".template-div").hide();
        $(".version-div").hide();
        $("#notes_span").show();
        $(".weekend-switching-div").hide();
        $(".weekend-selected-span").hide();
        $("#save-template").hide();
        $("#btnSubmit").hide();
        $("#btnApprove").hide();
        $('#btnClone').hide();

        $('#OverAllProjectPercentage').text('');
        $('#OverAllStartDate').text('');
        $('#OverAllEndDate').text('');
    }
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
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
                    };
                    documentArray.push(document);
                }
            })
            var DeletedDocuments = deletedDocumentsArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
            var DeletedRemarks = DeletedRemarksArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
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
                DeletedDocumentsArray: DeletedDocuments,
                DeletedRemarksArray: DeletedRemarks,
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
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
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
            var DeletedDocuments = deletedDocumentsArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
            var DeletedRemarks = DeletedRemarksArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
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
                DeletedDocumentsArray: DeletedDocuments,
                DeletedRemarksArray: DeletedRemarks,
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
            $("#RemarkDetails").val('');
            $("#DocumentDetails").val('');
            remarksDetails = JSON.parse(response.Item2);
            documentDetails = JSON.parse(response.Item1);
            $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
                if (!($(obj).find('[data-remarks]').val() === "")) {
                    $("#newRemarks_" + (i + 1)).css("display", "block");
                }
                if (!($(obj).find('[data-files]').val() === "")) {
                    $("#newDocuments_" + (i + 1)).css("display", "block");
                }
                if (!(documentDetails===null || documentDetails==='')) {
                    if (documentDetails.filter(function (no) { return no.SlNo === (i + 1) }).length = 0) {
                        $("#newDocuments_" + (i + 1)).css("display", "none");
                    }
                }
                $(obj).find('[data-remarks]').val("");
                $(obj).find("[data-files]").val("");
                deletedDocumentsArray = [];
                DeletedRemarksArray = [];
            });
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    })
}
function loadAutoCompleteDropdowns(result) {

    var dateFormat = "dd/mm/yy";
    $('.from').datepicker('destroy');
    $('.to').datepicker('destroy');

    if ($("#isWeekEndExclude").val() == "True") {
        from = $(".from")
            .datepicker({
                //defaultDate: "+1w",
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
                //defaultDate: "+1w",
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
                //defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: 'dd/mm/yy',
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
            to = $(".to").datepicker({
                //defaultDate: "+1w",
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
            selectedWBSHeadrId = 0;
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
        select: function (e, ui) {
            selectedWBSHeadrId = 0;
            $(e.target).attr('data-wbsheader', ui.item.id);
            selectedWBSHeadrId = parseInt(ui.item.id);
        },
        change: function (event, ui) {
            var $tr = $(event.target).closest('tr');
            $($tr).removeAttr("data-relationid");
            $($tr).find('.depndency').val('');
            $('#pmumapping').dataTable().$('[data-relationid]').each(function (i, obj) {
                $($tr).find('[data-slno]').html();
                $($tr).find("[data-relationid]").html();
                var depedency = $(obj).find('[data-dependency]').val();
            });
            changedSLNoForSave += $($tr).find('[data-slno]').html() + ',';
            if (ui.item === null) {
                var $tr = $(event.target).closest('tr');
                $($tr).removeAttr("data-headerid");
                $($tr).find('[data-task]').attr('readonly', false);
                $($tr).find('[data-dependency]').attr('readonly', false);
                $($tr).find('[data-duration]').attr('readonly', false);
                $($tr).find('[data-duration]').siblings('i').removeClass('hide');
                $($tr).find('[data-percentage]').attr('readonly', false);
                $($tr).find('[data-resources]').attr('readonly', false);
                $($tr).find('[data-startdate]').addClass('from');
                $($tr).find('[data-enddate]').addClass('to');
                $($tr).find('[data-dependency]').siblings('i').removeClass('hide');
                var dateFormat = "dd/mm/yy",
                    from = $(".from")
                        .datepicker({
                            //defaultDate: "+1w",
                            changeMonth: true,
                            numberOfMonths: 1,
                            dateFormat: 'dd/mm/yy',
                        })
                        .on("change", function () {
                            to.datepicker("option", "minDate", getDate(this));
                        }),
                    to = $(".to").datepicker({
                        //defaultDate: "+1w",
                        changeMonth: true,
                        numberOfMonths: 1,
                        dateFormat: 'dd/mm/yy',
                    })
                        .on("change", function () {
                            from.datepicker("option", "maxDate", getDate(this));
                        });
            }
            smartSheetCalculation(0);
        },
        close: function (event, ui) {
            if ($(event.target).val() !== '' && $(event.target).val() !== null && typeof ($(event.target).val()) !== "undefined") {
                var inWBSHeaderArray = result.WBSHeader.filter(item => item.WBSHeaderDesc == $(event.target).val()).length;
                if (selectedWBSHeadrId === 0 && inWBSHeaderArray == 0) {
               /* if (selectedWBSHeadrId === 0) {*/
                    $(event.target).val("");
                    $(event.target).attr('data-wbsheader', '');
                    alert("Please select the WBS Header from the list");
                }
                else {
                    $(event.target).siblings('span').addClass('hide');
                    var rowId = $(event.target).closest('tr').attr('id');
                    var slno = $(event.target).parent().siblings('td[data-slno]').attr('data-slno');
                    var count = 0;
                    if (selectedWBSHeadrId == 0) {
                        selectedWBSHeadrId = autocompleteDrodownArray.WBSHeader.find(item => item.WBSHeaderDesc == $(event.target).val()).WBSHeaderId;
                    }
                    $('#pmumapping').dataTable().$('[data-wbsheader]').each(function (i, obj) {
                        var objectrowId = $(obj).closest('tr').attr('id');
                        var wbsheaderId = $(obj).attr('data-wbsheader') == '0' ? -1 : $(obj).attr('data-wbsheader');
                        if (rowId != objectrowId) {
                            if (parseInt(wbsheaderId) === selectedWBSHeadrId) {
                                count++;
                            }
                        }
                    })
                    if (count > 0) {
                        $(event.target).val("");
                        $(event.target).attr("data-wbsheader", "");
                        alert("WBS Header cannot be duplicated");
                    }
                    else {
                        var $tr = $(event.target).closest('tr');
                        $($tr).attr("data-headerid", slno);
                        $($tr).find('td [data-task]').attr('readonly', true);
                        $($tr).find('td [data-dependency]').attr('readonly', true);
                        $($tr).find('td [data-duration]').attr('readonly', true);
                        $($tr).find('td [data-percentage]').attr('readonly', true);
                        $($tr).find('[data-resources]').attr('readonly', true);
                        $($tr).find('td [data-startdate]').removeClass('from');
                        $($tr).find('td [data-startdate]').datepicker('destroy');
                        $($tr).find('td [data-enddate]').removeClass('to');
                        $($tr).find('td [data-enddate]').datepicker('destroy');
                        $($tr).find('td [data-startdate]').removeClass('hasDatepicker');
                        $($tr).find('td [data-enddate]').removeClass('hasDatepicker');
                        $($tr).find('[data-dependency]').siblings('i').addClass('hide');

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
                var $tr = $(event.target).closest('tr');
                $($tr).removeAttr("data-headerid");
                $($tr).find('[data-task]').attr('readonly', false);
                $($tr).find('[data-dependency]').attr('readonly', false);
                $($tr).find('[data-duration]').attr('readonly', false);
                $($tr).find('[data-duration]').siblings('i').removeClass('hide');
                $($tr).find('[data-percentage]').attr('readonly', false);
                $($tr).find('[data-resources]').attr('readonly', false);
                $($tr).find('[data-startdate]').addClass('from');
                $($tr).find('[data-enddate]').addClass('to');
                $($tr).find('[data-dependency]').siblings('i').removeClass('hide');
            }
            smartSheetCalculation(0);
        }
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
                if (matcher.test(name) && cnt < 10) {
                    obj.push({ "value": name, "id": id })
                    cnt++
                }
                //if (matcher.test(name)) {
                //    obj.push({ "value": name, "id": id })
                //}
                //return matcher.test(name) || matcher.test(id);
                return matcher.test(id);
            });
            response(obj);
        },
        select: function (e, ui) {
            selectedTaskId = 0;
            $(e.target).attr('data-task', ui.item.id);
            selectedTaskId = parseInt(ui.item.id);
        },
        change: function (event, ui) {
            if (ui.item === null) {
                var $tr = $(event.target).closest('tr');
                //$($tr).removeAttr("data-relationid");
                $($tr).find('[data-wbsheader]').attr('readonly', false);
                $($tr).find('[data-task]').attr('data-task', "");
            }
        },
        close: function (event, ui) {
            if ($(event.target).val() !== '' && $(event.target).val() !== null && typeof ($(event.target).val()) !== "undefined") {

                var inTaskArray = result.Task.filter(item => item.TaskDesc == $(event.target).val()).length;
                if (selectedTaskId === 0 && inTaskArray == 0) {
                /*if (selectedTaskId === 0) {*/
                    $(event.target).val("");
                    $(event.target).attr('data-task', '');
                    alert("Please select the Task from the list");
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
                            //$(this).closest('tr').addClass("child_" + maxParentRowNo);
                            $(this).closest('tr').attr("data-relationid", maxParentRowNo);
                        }
                        var count = 0;
                        if (selectedTaskId == 0) {
                            selectedTaskId = autocompleteDrodownArray.Task.find(item => item.TaskDesc == $(event.target).val()).TaskId;
                        }
                        $('#pmumapping').dataTable().$('[data-relationid="' + maxParentRowNo + '"]').each(function (i, obj) {
                            var objectrowId = $(obj).attr('id');
                            var taskId = $(obj).find('td [data-task]').attr('data-task');
                            if (rowId != objectrowId) {
                                if (parseInt(taskId) === selectedTaskId) {
                                    count++;
                                }
                            }
                        })
                        if (count > 0) {
                            $(event.target).val("");
                            $(event.target).attr("data-task", "");
                            $(event.target).closest('tr').find("[data-wbsheader]").attr('readonly', false);
                            alert("Task cannot be duplicated");
                        }
                        else {
                            ChangedSLNo += $(event.target).closest('tr').find("[data-slno]").attr("data-slno") + ',';
                            $(event.target).closest('tr').find("[data-wbsheader]").attr('readonly', true);
                        }
                    }
                }
            }
            else {
                var $tr = $(event.target).closest('tr');
                //$($tr).removeAttr("data-relationid");
                $($tr).find('[data-wbsheader]').attr('readonly', false);
                $($tr).find('[data-task]').attr('data-task', "");
            }
            smartSheetCalculation(0);
        }
    });
    $("[data-resources]")
        // don't navigate away from the field on tab when selecting an item
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
                // delegate back to autocomplete, but extract the last term
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
                // prevent value inserted on focus
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                terms.pop();
                var selectedTerm = ui.item.value;
                if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                    alert("Resource already selected");
                    selectedResourcesId = 2;
                    terms.push("");
                    this.value = terms.join(", ");
                }
                else {
                    selectedResourcesId = 1;
                    terms.push(selectedTerm);
                    terms.push("");
                    this.value = terms.join(", ");
                }
                return false;
            },
            close: function (event, ui) {

                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (selectedResourcesId === 0) {
                        var inputValue = $(event.target).val();
                        var parts = inputValue.split(',');
                        parts.pop();
                        var result = parts.join(',');
                        $(event.target).val(result);
                        $(event.target).attr('data-resources', '');
                        alert("Please select the Resources from the list");
                    }
                    else if (selectedResourcesId === 1) {
                        $(event.target).siblings('span').addClass('hide');
                    }
                }
            }
        });
}
function deleteRow(e) {
    var $tr = $(e).closest('tr');
    var rowNo = parseInt($($tr).find('[data-slno]').attr('data-slno'));
    var isHeader = $($tr).attr('data-headerid') !== null && $($tr).attr('data-headerid') !== '' && typeof ($($tr).attr('data-headerid')) !== "undefined" ? true : false;
    var id = $($tr).attr('data-headerid');
    var message = isHeader ? "Are you sure, Do you want to delete this header and dependent tasks?" : "Are you sure, Do you want to delete this task and it's dependencies will be cleared?";
    var count = 1;
    confirm(message, function () {
        changedSLNoForSave += rowNo + ',';
        if ($.fn.DataTable.isDataTable('#pmumapping')) {
            $('#pmumapping').dataTable().fnDestroy();
        }
        $($tr).remove();
        var relationId = 0
        if (!isHeader) {
            relationId = ($($tr).attr('data-relationid') !== null && $($tr).attr('data-relationid') !== '' && typeof ($($tr).attr('data-relationid')) !== "undefined") ? parseInt($($tr).attr('data-relationid')) : 0;
        }
        else {
            $('tr[data-relationid="' + id + '"]').each(function (i, obj) {
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
        var dependentRowArray = [];
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
        if (!isHeader) {
            smartSheetCalculation(relationId,1, dependentRowArray, "deleterow");
        }
    })
}
function addRow(e) {
    var $td = $(e).closest('td').siblings('td[data-slno]');
    var rowNo = parseInt($($td).attr('data-slno'));
    if ($.fn.DataTable.isDataTable('#pmumapping')) {
        $('#pmumapping').dataTable().fnDestroy();
    }
    var newTr = '<tr id="row_' + (rowNo + 1) + '">' +
        '<td data-slno="' + (rowNo + 1) + '">' + (rowNo + 1) + '</td>' +
        '<td><div class="action_width"><button type="button" class="mr-2" onclick="addRow(this)"><i class="fas fa-plus"></i></button><button class="trash_icon" type="button" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button></div></td>' +
        '<td class="input_width"><input type="text" class="form-control"  data-wbsheader="" placeholder="" /><span class="text-danger hide">Please select WBS Header</span> </td>' +
        '<td><input type="text" class="form-control" data-task="" placeholder="" /><span class="text-danger hide">Please enter the Task</span> </td>' +
        '<td><span class="d-flex align-items-center"><input data-dependency="" type="text" class="form-control depndency -uppercase" /><i class="fas fa-pencil ml-2" title="Edit Predecessors" onclick="showDependency(this)"></i></span> </td>' +
        '<td><div class="duration"><input type="text" class="form-control text-right" data-duration="" /> <span class="text-danger hide">Please enter the Duration</span></div></td>' +
        '<td><input type="text" class="form-control from" readonly data-startdate="" /> <span class="text-danger hide">Please select the Start Date</span> </td>' +
        '<td><input type="text" class="form-control to" readonly data-enddate="" /> </td>' +
        '<td>' +
        '<div class="percentage_list">' +
        '<input type="text" class="form-control text-right" data-percentage="" />' +
        '<span class="w3-light-grey"><span class="w3-grey" style="height:24px;width:0%"></span></span>' +
        '</div>' +
        '</td>' +
        '<td><input type="text" class="form-control" data-resources="" placeholder="Please select the Resource" /><span class="text-danger hide">Please select the Resources</span> </td>' +
        '<td class="file_upload"><input type="file" class="form-control" name="files_' + (rowNo + 1) + '" data-files="" multiple /> </td>' +
        '<td class="input_width"><textarea class="form-control" data-remarks=""></textarea> </td>' +
        '</tr>';
    $('#row_' + rowNo).after(newTr);
    //var siblings = $('#row_' + rowNo).siblings();
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
    //$('#pmumapping').dataTable().$('[data-dependency]').each(function (i, obj) {
    //    var dependencyValue = $.isNumeric($(obj).val()) ? parseInt($(obj).val()) : $(obj).val();
    //    if ((rowNo + 1) <= dependencyValue) {
    //        $(obj).val(dependencyValue + 1)
    //    }
    //})
    loadAutoCompleteDropdowns(autocompleteDrodownArray)
    smartSheetCalculation(0);
}
function initializeDataTable(length = 50) {
    // Setup - add a text input to each footer cell
    var table = $('#pmumapping').DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        //scrollY: '500px',
        pageLength: length,
        scrollCollapse: true,
        paging: true,
        initComplete: function () {
            var api = this.api();

            // For each column
            api
                .columns()
                .eq(0)
                .each(function (colIdx) {
                    // Set the header cell to contain the input element
                    var cell = $('.filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    var title = $(api.column(colIdx).header()).text();
                    if (colIdx == 0) {
                        $(cell).html('<input type="text" placeholder="' + title + '" />');
                    }
                    else {
                        $(cell).html('');
                    }


                    // On every keypress in this input
                    $(
                        'input',
                        $('.filters th').eq($(api.column(colIdx).header()).index())
                    )
                        .off('keyup change')
                        .on('change', function (e) {
                            // Get the search value
                            $(this).attr('title', $(this).val());
                            var regexr = '({search})'; //$(this).parents('th').find('select').val();

                            var cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api
                                .column(colIdx)
                                .search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '(((' + this.value + ')))')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                )
                                .draw();
                        })
                        .on('keyup', function (e) {
                            e.stopPropagation();

                            $(this).trigger('change');
                            $(this)
                                .focus()[0]
                                .setSelectionRange(cursorPosition, cursorPosition);
                        });
                });
        },
    });

    $('#pmumapping_paginate').hide();
}
$('body').on('keyup', '[data-percentage]', function () {
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
        //$(this).closest('tr').addClass("child_" + maxParentRowNo);
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
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
        $($tr).attr('data-isupdate', 1);
        var relationId = $($tr).attr('data-relationid');
        smartSheetCalculation(relationId);
    }
})
$('body').on('change', '[data-duration]', function () {
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
        //$(this).closest('tr').addClass("child_" + maxParentRowNo);
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }
    var $currentTr = $(this).closest('tr');
    var relationId = $(this).closest('tr').attr('data-relationid');
    var task = $($currentTr).find('[data-task]').val();
    if (task === null || task === '' || typeof (task) === "undefined") {
        $($currentTr).find('[data-task]').siblings('span').removeClass('hide');
        $($currentTr).find('[data-duration]').val('');
    }
    else {
        $($currentTr).find('[data-task]').siblings('span').addClass('hide');
    }
    this.value = this.value.replace(/[^0-9\.]/g, '');
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        $(this).siblings('span').addClass('hide');
    }
    if ($.isNumeric(this.value)) {
        var duration = $(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined" ? Number($(this).val()) : 0;
        var noOfDays = duration === 0 ? 0 : duration - 1;
        $(this).closest('tr').attr('data-isupdate', 1);
        var startDate = $($currentTr).find('td [data-startdate]').val();
        if (startDate !== null && startDate !== '' && typeof (startDate) !== "undefined") {
            var endDate = moment(addBusinessDays(moment(startDate, 'DD/MM/YYYY'), noOfDays)).format("DD/MM/YYYY");
            $($currentTr).find('td [data-enddate]').val(endDate);
            smartSheetCalculation(relationId,1);
        }
    }
})
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
        //$(this).closest('tr').addClass("child_" + maxParentRowNo);
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }
    var task = $(currentTr).find('[data-task]').val();
    if (task === null || task === '' || typeof (task) === "undefined") {
        $(currentTr).find('[data-task]').siblings('span').removeClass('hide');
        $(currentTr).find('[data-startdate]').val('');
        startDate = '';
    }
    else {
        $(currentTr).find('[data-startdate]').siblings('span').addClass('hide');
    }
    var dependency = $(currentTr).find('[data-dependency]').val();
    var dependentRow = [];
    if ($(currentTr).find('[data-startdate]').attr("data-previousvalue") !== null && $(currentTr).find('[data-startdate]').attr("data-previousvalue") !== '' && typeof ($(currentTr).find('[data-startdate]').attr("data-previousvalue")) !== "undefined") {
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
    if (dependency === null || dependency === '' || typeof (dependency) === "undefined") {
        var duration = $(currentTr).find('td [data-duration]').val() !== null && $(currentTr).find('td [data-duration]').val() !== '' && typeof ($(currentTr).find('td [data-duration]').val()) !== "undefined" ? Number($(currentTr).find('td [data-duration]').val()) : 0;
        var noOfDays = duration === 0 ? 0 : duration - 1;
        if (noOfDays === 0) {
            $(currentTr).find('[data-duration]').val(1);
        }
        else {
            $(currentTr).find('[data-duration]').val(duration);
        }
        if (startDate !== null && startDate !== '' && typeof (startDate) !== "undefined") {
            //if ((moment($(currentTr).find('[data-startdate]').val(), "DD/MM/YYYY").day() == 6) || (moment($(currentTr).find('[data-startdate]').val(), "DD/MM/YYYY").day() == 0)) {
            //    if (isManuallySelectedSD.indexOf(slno) === -1) {
            //        isManuallySelectedSD.push(slno);
            //    }
            //}
            //else {
            //    isManuallySelectedSD = isManuallySelectedSD.filter(item => item != slno);
            //}

            $(currentTr).find('[data-startdate]').siblings('span').addClass('hide');
            var endDate = moment(addBusinessDays(moment(startDate, 'DD/MM/YYYY'), noOfDays)).format("DD/MM/YYYY");
            $(currentTr).find('[data-enddate]').val(endDate);
            $(currentTr).find('[data-startdate]').attr('data-previousvalue', startDate);
            $(currentTr).find('[data-enddate]').siblings('span').addClass('hide');
        }
    }
    else {
        confirm('Manually changing "Start Date" will result in the removal of all predecessor relationships on this row. Do you wish to continue?', function () {
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
                //if ((moment($(currentTr).find('[data-startdate]').val(), "DD/MM/YYYY").day() == 6) || (moment($(currentTr).find('[data-startdate]').val(), "DD/MM/YYYY").day() == 0)) {
                //    if (isManuallySelectedSD.indexOf(slno) === -1) {
                //        isManuallySelectedSD.push(slno);
                //    }
                //}
                //else {
                //    isManuallySelectedSD = isManuallySelectedSD.filter(item => item != slno);
                //}
                $(currentTr).find('[data-startdate]').siblings('span').addClass('hide');
                var endDate = moment(addBusinessDays(moment(startDate, 'DD/MM/YYYY'), noOfDays)).format("DD/MM/YYYY");
                $(currentTr).find('[data-enddate]').val(endDate);
                $(currentTr).find('[data-startdate]').attr('data-previousvalue', startDate);
                $(currentTr).find('[data-enddate]').siblings('span').addClass('hide');
                smartSheetCalculation(relationId, dependentRow);
            }
        })
    }
    var relationId = $(currentTr).attr('data-relationid');
    smartSheetCalculation(relationId,1, dependentRow);
    removeValidationStartEndDate();

})
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
        //$(this).closest('tr').addClass("child_" + maxParentRowNo);
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }
    var relationId = parseInt($(currentTr).find('[data-relationid]').attr('data-relationid'));
    var currentValue = $(this).val();
    var task = $(currentTr).find('[data-task]').val();
    if (task === null || task === '' || typeof (task) === "undefined") {
        $(currentTr).find('[data-task]').siblings('span').removeClass('hide');
        return false;
    }
    else {
        $(currentTr).find('[data-task]').siblings('span').addClass('hide');
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
    // if all conditions is passed then it will start the revised calc
    else {
        var dependentRow = [];
        var revisedDatesArray = [];
        var addressedRow = [];
        var revisedDateObject = {
            SlNo: parseInt($(currentTr).find('[data-slno]').attr('data-slno')),
            Task: $(currentTr).find('[data-task]').val(),
            StartDate: $(currentTr).find('[data-startdate]').val(),
            EndDate: $(currentTr).find('[data-enddate]').attr('data-previousvalue'),
            RevisedStartDate: $(currentTr).find('[data-startdate]').val(),
            RevisedEndDate: currentValue,
            Dependency: $(currentTr).find('[data-dependency]').val(),
            Duration: $(currentTr).find('[data-duration]').val()
        };        
        revisedDatesArray.push(revisedDateObject);
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

                    if (addressedRow.includes(parseInt($(relationobj).find('[data-slno]').attr('data-slno'))) == false) {
                        var dependentRowIndex = dependentRow.findIndex(function (o) { return Number(o) === parseInt($(relationobj).find('[data-slno]').attr('data-slno')) })
                        if (dependentRowIndex == -1) {
                            dependentRow.push(parseInt($(relationobj).find('[data-slno]').attr('data-slno')));
                        }
                        var dependentStartDateArray = [];
                        $.each(relationDependencyArray, function (newDependencyIndex, newDependencyobj) {
                            var dependencyIndex = newDependencyobj.indexOf('F') > -1 ? newDependencyobj.indexOf('F') : newDependencyobj.indexOf('S');
                            var dependencyRowNo = newDependencyobj.substr(0, dependencyIndex);
                            var durationIndex = newDependencyobj.indexOf('+') > -1 ? newDependencyobj.indexOf('+') : newDependencyobj.indexOf('-')
                            var duration = Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) < 0 ? Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) : Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) === 0 ? 0 : Number(newDependencyobj.substr(durationIndex, newDependencyobj.length));

                            if (Number(dependencyRowNo === Number(currentSlNo))) {
                                var currentObject = revisedDatesArray.filter(function (o) { Number(o.SlNo) === Number(currentSlNo) })
                                if (currentObject.length > 0) {
                                    var endDate = currentObject[0].RevisedEndDate;
                                    if (endDate !== null && endDate !== '' && endDate !== "undefined") {
                                        if (currentObject[0].Duration !== null && currentObject[0].Duration !== '' && typeof (currentObject[0].Duration) !== "undefined"
                                            && parseInt(currentObject[0].Duration) === 0) {
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
                                }
                            }
                            else {
                                var $dependentTr = $('#pmumapping').dataTable().$('#row_' + dependencyRowNo);
                                var ischanged = dependentRow.includes(parseInt(dependencyRowNo));
                                var endDate = $($dependentTr).find('td [data-enddate]').val();
                                var startDate = $($dependentTr).find('td [data-startdate]').val();
                                if (ischanged) {
                                    endDate = revisedDatesArray.filter(item => item.SlNo === parseInt(dependencyRowNo)).map(item => item.RevisedEndDate);
                                    startDate = revisedDatesArray.filter(item => item.SlNo === parseInt(dependencyRowNo)).map(item => item.RevisedStartDate);
                                }
                                if (endDate !== null && endDate !== '' && endDate !== "undefined") {
                                    if ($(relationobj).find('[data-duration]').val() !== null && $(relationobj).find('[data-duration]').val() !== '' && typeof ($(relationobj).find('[data-duration]').val()) !== "undefined"
                                        && parseInt($(relationobj).find('[data-duration]').val()) === 0) {
                                        endDate = moment(addBusinessDays(moment(endDate, "DD/MM/YYYY"), 0)).format("DD/MM/YYYY");
                                    }
                                    else {
                                        endDate = moment(addBusinessDays(moment(endDate, "DD/MM/YYYY"), 1)).format("DD/MM/YYYY");
                                    }
                                }
                                var dependentStartDate = newDependencyobj.indexOf('F') > -1 ? endDate : startDate;
                                if (dependentStartDate !== null && dependentStartDate !== '' && typeof (dependentStartDate) !== "undefined") {
                                    var dependentStartDateAfterduration = addBusinessDays(moment(dependentStartDate, "DD/MM/YYYY"), duration);
                                    dependentStartDateArray.push(dependentStartDateAfterduration);
                                }
                            }
                        })
                        if (dependentStartDateArray.length > 0) {
                            revisedDateObject = {
                                SlNo: parseInt($(relationobj).find('[data-slno]').attr('data-slno')),
                                Task: $(relationobj).find('[data-task]').val(),
                                StartDate: $(relationobj).find('[data-startdate]').val(),
                                EndDate: $(relationobj).find('[data-enddate]').attr('data-previousvalue'),
                                RevisedStartDate: "",
                                RevisedEndDate: "",
                                Dependency: $(relationobj).find('[data-dependency]').val(),
                                Duration: $(relationobj).find('[data-duration]').val()
                            };
                            var maxStarDate = moment.max(dependentStartDateArray);
                            revisedDateObject.RevisedStartDate = maxStarDate.format("DD/MM/YYYY");
                            var currentTrDuration = $(relationobj).find('[data-duration]').val() !== null && $(relationobj).find('[data-duration]').val() !== '' && typeof ($(relationobj).find('[data-duration]').val()) !== "undefined" ? Number($(relationobj).find('[data-duration]').val()) : 0;
                            var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                            var maxEndDate = addBusinessDays(maxStarDate, addNoOfDays);
                            revisedDateObject.RevisedEndDate = maxEndDate.format("DD/MM/YYYY");
                            revisedDatesArray.push(revisedDateObject);
                        }
                        addressedRow.push(parseInt($(relationobj).find('[data-slno]').attr('data-slno')))
                    }
                }
            }
        })
            initialdependentRow += 1;
        }
        $('#dependentAlertTable tbody').html("");
        if (revisedDatesArray.length > 1) {
            var msg = '';
            $.each(revisedDatesArray, function (revi, revobj) {
                msg += ('<tr>' +
                    '<td>' + revobj.SlNo + '</td>' +
                    '<td>' + revobj.Task + '</td>' +
                    '<td>' + revobj.Dependency + '</td>' +
                    '<td class="text-right">' + revobj.Duration + '</td>' +
                    '<td>' + revobj.StartDate + '</td>' +
                    '<td>' + revobj.EndDate + '</td>' +
                    '<td>' + revobj.RevisedStartDate + '</td>' +
                    '<td>' + revobj.RevisedEndDate + '</td>' +
                    '</tr>');
            })
            confirmWithDependentAlert(msg, function () {
                //if ((moment($(currentTr).find('[data-enddate]').val(), "DD/MM/YYYY").day() == 6) || (moment($(currentTr).find('[data-enddate]').val(), "DD/MM/YYYY").day() == 0)) {
                //    if (isManuallySelectedED.indexOf(slno) === -1) {
                //        isManuallySelectedED.push(slno);
                //    }
                //}
                //else {
                //    isManuallySelectedED = isManuallySelectedED.filter(item => item != slno);
                //}
                $(currentTr).find('[data-enddate]').val(currentValue);
                $(currentTr).find('[data-enddate]').attr('data-previousvalue', currentValue);
                var duration = getBusinessDays(moment(startDate, "DD/MM/YYYY"), moment(currentValue, "DD/MM/YYYY"));
                $(currentTr).find('[data-duration]').val((duration + 1));
                smartSheetCalculation(relationId,1, dependentRow)
            }, function () {
                $(currentTr).find('[data-enddate]').val($(currentTr).find('[data-enddate]').attr('data-previousvalue'));
                $(currentTr).find('[data-enddate]').attr('data-previousvalue', $(currentTr).find('[data-enddate]').attr('data-previousvalue'));
                var duration = getBusinessDays(moment(startDate, "DD/MM/YYYY"), moment($(currentTr).find('[data-enddate]').attr('data-previousvalue'), "DD/MM/YYYY"));
                $(currentTr).find('[data-duration]').val((duration + 1));
                smartSheetCalculation(relationId)
            })
        }
        else {
            $(currentTr).find('[data-enddate]').val(currentValue);
            $(currentTr).find('[data-enddate]').attr('data-previousvalue', currentValue);
            var duration = getBusinessDays(moment(startDate, "DD/MM/YYYY"), moment(currentValue, "DD/MM/YYYY"));
            $(currentTr).find('[data-duration]').val((duration + 1));
        }
    }
    smartSheetCalculation(relationId,1);
    removeValidationStartEndDate();
})
$('body').on('change', '[data-dependency]', function () {
    var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
    var parentRowIds = []; var maxParentRowNo = 0;
    if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
        var headerTr;
        $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
            var parentRowNo = parseInt($(obj).attr('data-headerid'));
            if (parentRowNo < slno) {
                headerTr = obj;
            }
        })
        maxParentRowNo = $(headerTr).attr('data-headerid');
        //$(this).closest('tr').addClass("child_" + maxParentRowNo);
        $(this).closest('tr').attr("data-relationid", maxParentRowNo);
    }
    var $currentTr = $(this).closest('tr');
    var relationId = $(this).closest('tr').attr('data-relationid');
    var headerIds = [];
    $('#pmumapping').dataTable().$('[data-headerid]').each(function (headeri, headerobj) {
        if ($(headerobj).attr('data-headerid') !== null && $(headerobj).attr('data-headerid') !== '' && typeof ($(headerobj).attr('data-headerid')) !== "undefined") {
            headerIds.push(Number($(headerobj).attr('data-headerid')));
        }
    })
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        var dependencyArray = $(this).val().toUpperCase().split(',');
        var newDependencyArray = [];
        $.each(dependencyArray, function (i, obj) {

            var $trlength = $('#pmumapping').dataTable().$('tr').length;

            if ($.isNumeric(obj)) {
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
                else {
                    ChangedSLNo = slno + ',';
                    newDependencyArray.push(obj + "FS+" + 0);
                }
            }
            else {
                var pattern = /^\d*(?:FS|SS)[+-]\d+$/;
                if (obj !== null && obj !== '' && typeof (obj) !== "undefined") {
                    var lastTwoCharacters = obj.slice(-2)
                    var testValue = lastTwoCharacters === 'FS' || lastTwoCharacters === 'SS' ? obj + "+0" : obj;
                    if (pattern.test(testValue)) {
                        var index = testValue.indexOf('F') > -1 ? testValue.indexOf('F') : testValue.indexOf('S');
                        var dependencyRowNo = testValue.substr(0, index);
                        var $trlength = $('#pmumapping').dataTable().$('tr').length;
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
                        else {
                            ChangedSLNo += slno + ',';
                            newDependencyArray.push(testValue);
                        }
                        // You can perform further actions here for matched strings
                    } else {
                        alert(testValue + " does not match the pattern");
                        return false;
                    }
                }
            }
        })
        if (newDependencyArray.length === 0) {
            $(this).val('');
        }
        else {
            var uniqueDependencyArray = $.unique(newDependencyArray);
            $(this).val(uniqueDependencyArray.join(","));
        }
        smartSheetCalculation(relationId,1);
    }
})


function smartSheetCalculation(relationId, isChanged = 0, dependentRows = [], requestFrom = "") {    
    var startDateArray = []; var endDateArray = []; var percentageArray = []; var overAllPercentageArray = []; var overAllStartDateArray = [];
    var overAllEndDateArray = [];

    var data = []; var revisedData = []; requestedData = []; var dateParts; var date;

    if ($("#RevisedRequestData").val() != null && $("#RevisedRequestData").val() != undefined && $("#RevisedRequestData").val() != "") {
         data = JSON.parse($("#RevisedRequestData").val());
         revisedData = data.Item1;
         requestedData = data.Item2;
    }
    
    $('#pmumapping').dataTable().$('[data-relationid]').each(function (relationIndex, relationObj) {
        var slno = $(relationObj).closest('tr').find('[data-slno]').attr('data-slno');
        var parentRowIds = []; var maxParentRowNo = 0;
        if ($('#pmumapping').dataTable().$('[data-headerid]').length > 0) {
            var headerTr;
            $('#pmumapping').dataTable().$('[data-headerid]').each(function (headeri, headerobj) {
                var parentRowNo = parseInt($(headerobj).attr('data-headerid'));
                if (parentRowNo < slno) {
                    headerTr = headerobj;
                }
            })
            maxParentRowNo = $(headerTr).attr('data-headerid');
            //$(this).closest('tr').addClass("child_" + maxParentRowNo);
            $(relationObj).closest('tr').attr("data-relationid", maxParentRowNo);
        }

        var dependencyValue = $(relationObj).find('[data-dependency]').val();
        if (dependencyValue !== null && dependencyValue !== '' && typeof (dependencyValue) !== "undefined") {
            var newDependencyArray = dependencyValue.split(",");
            var dependentStartDateArray = [];
            $.each(newDependencyArray, function (newDependencyIndex, newDependencyobj) {
                var dependencyIndex = newDependencyobj.indexOf('F') > -1 ? newDependencyobj.indexOf('F') : newDependencyobj.indexOf('S');
                var dependencyRowNo = newDependencyobj.substr(0, dependencyIndex);
                var durationIndex = newDependencyobj.indexOf('+') > -1 ? newDependencyobj.indexOf('+') : newDependencyobj.indexOf('-')
                var duration = Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) < 0 ? Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) : Number(newDependencyobj.substr(durationIndex, newDependencyobj.length)) === 0 ? 0 : Number(newDependencyobj.substr(durationIndex, newDependencyobj.length));
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
            })
            if (dependentStartDateArray.length > 0) {
                var maxStarDate = moment.max(dependentStartDateArray);
                var currentTrDuration = $(relationObj).find('td [data-duration]').val() !== null && $(relationObj).find('td [data-duration]').val() !== '' && typeof ($(relationObj).find('td [data-duration]').val()) !== "undefined" ? Number($(relationObj).find('td [data-duration]').val()) : 0;
                var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                var maxEndDate = addBusinessDays(maxStarDate, addNoOfDays);
                if (parseInt(currentTrDuration) === 0) {
                    if ($(relationObj).find('[data-duration]').val() !== null && $(relationObj).find('[data-duration]').val() !== '' && typeof ($(relationObj).find('[data-duration]').val()) !== "undefined"
                        && parseInt($(relationObj).find('[data-duration]').val()) === 0) {
                        $(relationObj).find('[data-duration]').val(0);
                    }
                    else {
                        $(relationObj).find('[data-duration]').val(1);
                    }
                }

                if (requestedData.length > 0) {

                    var revisedItem = revisedData.filter(item => item.SlNo == slno);
                    var requestedItem = requestedData.filter(item => item.SlNo == slno);

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
                }
                else {
                    $(relationObj).find('td [data-startdate]').val(maxStarDate.format("DD/MM/YYYY"));
                    $(relationObj).find('[data-enddate]').val(maxEndDate.format("DD/MM/YYYY"));
                    $(relationObj).find('[data-enddate]').attr('data-previousvalue', maxEndDate.format("DD/MM/YYYY"));
                }
            }
        }
        else
        {
            if (requestedData.length > 0) {
                if ($(relationObj).find('[data-startdate]').val() !== null && $(relationObj).find('[data-startdate]').val() !== '' && typeof ($(relationObj).find('[data-startdate]').val()) !== "undefined") {
                    {
                        var revisedItem = revisedData.filter(item => item.SlNo == slno);
                        var requestedItem = requestedData.filter(item => item.SlNo == slno);

                        var maxStarDate = moment($(relationObj).find('[data-startdate]').val(), "DD/MM/YYYY");
                        var currentTrDuration = $(relationObj).find('td [data-duration]').val() !== null && $(relationObj).find('td [data-duration]').val() !== '' && typeof ($(relationObj).find('td [data-duration]').val()) !== "undefined" ? Number($(relationObj).find('td [data-duration]').val()) : 0;
                        var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                        var maxEndDate = addBusinessDays(maxStarDate, addNoOfDays);

                        if (revisedItem.length > 0 && isChanged == 0) {
                            dateParts = (revisedItem[0].UpdatedStartDate).split("/");
                            date = new Date(dateParts[2], dateParts[1]-1, dateParts[0]);
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
                        else if (requestedItem.length > 0 && isChanged == 1)
                        {
                        
                            dateParts = (requestedItem[0].ReqEndDate).split("/");
                            date = new Date(dateParts[2], dateParts[1]-1, dateParts[0]);

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
                        $(relationObj).find('[data-startdate]').attr('data-previousvalue', maxStarDate.format("DD/MM/YYYY"));
                    }
                    var currentTrDuration = $(relationObj).find('[data-duration]').val() !== null && $(relationObj).find('[data-duration]').val() !== '' && typeof ($(relationObj).find('[data-duration]').val()) !== "undefined" ? Number($(relationObj).find('[data-duration]').val()) : 0;
                    var addNoOfDays = currentTrDuration === 0 ? 0 : currentTrDuration - 1;
                    var maxEndDate = addBusinessDays(maxStarDate, addNoOfDays);
                    if (parseInt(currentTrDuration) === 0) {
                        if ($(relationObj).find('[data-duration]').val() !== null && $(relationObj).find('[data-duration]').val() !== '' && typeof ($(relationObj).find('[data-duration]').val()) !== "undefined"
                            && parseInt($(relationObj).find('[data-duration]').val()) === 0) {
                            $(relationObj).find('[data-duration]').val(0);
                        }
                        else {
                            $(relationObj).find('[data-duration]').val(1);
                        }
                    }
                    $(relationObj).find('[data-enddate]').val(maxEndDate.format("DD/MM/YYYY"));
                    $(relationObj).find('[data-enddate]').attr('data-previousvalue', maxEndDate.format("DD/MM/YYYY"));
                }
            }
        }
    });
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
    })
    var overAllAverageValue = 0;
    if (overAllPercentageArray.length > 0) {
        overAllAverageValue = overAllPercentageArray.reduce(function (a, b) {
            return a + b;
        }, 0) / overAllPercentageArray.length;
    }

    /*$("#Version").text($('#ApprovedLatestVersion').val())*/

    var TemplateCount = autocompleteDrodownArray['Template'].length

    if (TemplateCount > 0) {
        if ($('#ApprovedLatestVersion').val() !== null && $('#ApprovedLatestVersion').val() !== '' && typeof ($('#ApprovedLatestVersion').val()) !== "undefined") {
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
        

    var currentSelectedVersion = $("#currentSelectedVersion").val();

    if (!(currentSelectedVersion === "" || currentSelectedVersion === null || typeof (currentSelectedVersion) === "undefined")) {
        $(".version-div").show();
        $("#notes_span").hide();
        var pmuVersionList = JSON.parse($('#PMUVersionList').val());
        var versionDropdown = $("#Version");

        versionDropdown.empty();
        $.each(pmuVersionList, function (index, value) {
            versionDropdown.append($('<option>', {
                value: value.PMUVersion,
                text: value.PMUVersion
            }));
        });
        versionDropdown.val(currentSelectedVersion);
    }
    else {
        $(".version-div").hide();
        $("#notes_span").show();
    }

    var weekendDropdown = $("#weekend-switching");
    weekendDropdown.empty();
    weekendDropdown.append('<option value="True">Excluded</option>' +
        '<option value="False">Included</option>');
    var currentWeekendStatus = $("#isWeekEndExclude").val();
    weekendDropdown.val(currentWeekendStatus);

    $('#OverAllProjectPercentage').text(overAllAverageValue.toFixed(2));
    if (overAllStartDateArray.length > 0) {
        $('#OverAllStartDate').text(moment(moment.min(overAllStartDateArray)).format("DD/MM/YYYY"));
    }
    if (overAllEndDateArray.length > 0) {
        $('#OverAllEndDate').text(moment(moment.max(overAllEndDateArray)).format("DD/MM/YYYY"));
    }
    $.each(dependentRows, function (i, obj) {
        if (requestFrom === "deleterow") {
            $('#pmumapping').dataTable().$('#row_' + obj).find('[data-dependency]').closest('td').attr("style", "background-color:#f0c756 !important");
        } else {
            ChangedSLNo += $('#pmumapping').dataTable().$('#row_' + obj).find('[data-slno]').attr('data-slno') + ',';
            $('#pmumapping').dataTable().$('#row_' + obj).find('[data-startdate]').closest('td').attr("style", "background-color:#bee520 !important");
            $('#pmumapping').dataTable().$('#row_' + obj).find('[data-enddate]').closest('td').attr("style", "background-color:#bee520 !important");
        }
    })
}
function getData(isFromTemplate = false) {
    var headerLength = $('#pmumapping').dataTable().$('[data-headerid]').length;
    var relationLength = $('#pmumapping').dataTable().$('[data-relationid]').length;
    if (isFromTemplate && (relationLength > 0 || headerLength > 0)) {
        confirm("Are you sure do you want to override the existing data?", function () {
            DeletedRemarksArray = remarksDetails;
            deletedDocumentsArray = documentDetails;
            $.ajax({
                url: ROOT + 'Master/PV_NewPMUMappings',
                type: 'POST',
                async: false,
                cache: false,
                dataType: 'HTML',
                data: {
                    ProjectId: parseInt($('#ProjectId').val()),
                    ProjectName: $('#ProjectId option:selected').text(),
                    IsFromTemplate: isFromTemplate,
                    HubId: parseInt($('#Hub option:selected').val()),
                    HubName: $('#Hub option:selected').text(),
                    CurrentSelectedVersion: $('#Version option:selected').text() == null ? '' : $('#Version option:selected').text(),
                    Template_Id: parseInt($('#fromtemplate').val())
                },
                success: function (result) {
                    $('#pmumappingtablediv').html(result);
                    $('#pmumapping thead tr')
                        .clone(true)
                        .addClass('filters')
                        .appendTo('#pmumapping thead');
                    var tableLength = $('#pmumapping tbody tr').length;
                    initializeDataTable(tableLength);
                    documentDetails = JSON.parse($('#DocumentDetails').val());
                    remarksDetails = JSON.parse($('#RemarksDetails').val());
                    loadAutoCompleteDropdowns(autocompleteDrodownArray);
                    
                    // It is approved and current latest version
                    if ($('#ApprovedLatestVersion').val() !== null && $('#ApprovedLatestVersion').val() !== '' && typeof ($('#ApprovedLatestVersion').val()) !== "undefined") {
                        var selectedval = $("#isWeekEndExclude").val().toLowerCase();
                        selectedval = selectedval == "true" ? "Excluded" : "Included"

                        $('#btnApprove').hide();
                        $('#btnClone').hide();
                        $('.template-div').hide();
                        $('.weekend-switching-div').hide();

                        if ($('#ApprovedLatestVersion').val() == $('#currentSelectedVersion').val()) {
                            $("#save-template").show();
                        }
                        $(".version-div").show();
                        $("#weekend-selected").text(selectedval);
                        $(".weekend-selected-span").show();
                    }
                    // It is only saved i.e (unapproved or new fresh project hub combo)
                    else {
                        $(".version-div").hide();
                        $("#weekend-selected").text('');
                        $(".weekend-selected-span").hide();

                        if ($('#ApprovedLatestVersion').val() == $('#currentSelectedVersion').val()) {
                            $("#save-template").show();
                        }
                        $('#btnApprove').show();
                        $('#btnClone').show();
                        $('.template-div').show();
                        $('.weekend-switching-div').show();
                    }

                    if ($('#ApprovedLatestVersion').val() == $('#currentSelectedVersion').val()) {
                        if ($("#RevisedRequestData").val() == null || $("#RevisedRequestData").val() == undefined || $("#RevisedRequestData").val() == "") {
                            if (isSavable == 1) {
                                $('#btnSubmit').show();
                            }
                            else {
                                $('#btnSubmit').hide();
                            }
                        }
                        else {
                            $('#btnSubmit').show();
                        }
                        
                    }
                    else {
                        $('#btnSubmit').hide();
                    }
                    smartSheetCalculation(0);
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            })
        })
    }
    else {
        var approvalSlNo = ""; var approvalVersion = ""; var approvalStartDate = ""; var approvalEndDate = ""; 
        if ($('#selectedProjectId').val() == parseInt($('#ProjectId').val()) && $('#selectedHubId').val() == parseInt($('#Hub option:selected').val())) {

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
            url: ROOT + 'Master/PV_NewPMUMappings',
            type: 'POST',
            async: false,
            cache: false,
            dataType: 'HTML',
            data: {
                ProjectId: parseInt($('#ProjectId').val()),
                ProjectName: $('#ProjectId option:selected').text(),
                IsFromTemplate: isFromTemplate,
                HubId: parseInt($('#Hub option:selected').val()),
                HubName: $('#Hub option:selected').text(),
                Template_Id: parseInt($('#fromtemplate').val()),
                ApprovalSlNo: approvalSlNo,
                ApprovalVersion: approvalVersion,
                ApprovalStartDate: approvalStartDate,
                ApprovalEndDate: approvalEndDate
            },
            success: function (result) {
                //$('#loader').show();
                //$("#loader").css("visibility", "visible");
                $('#pmumappingtablediv').html(result);
                $('#pmumapping thead tr')
                    .clone(true)
                    .addClass('filters')
                    .appendTo('#pmumapping thead');
                var tableLength = $('#pmumapping tbody tr').length;
                initializeDataTable(tableLength);
                documentDetails = JSON.parse($('#DocumentDetails').val());
                remarksDetails = JSON.parse($('#RemarksDetails').val());
                loadAutoCompleteDropdowns(autocompleteDrodownArray);
                // It is approved and current latest version
                if ($('#ApprovedLatestVersion').val() !== null && $('#ApprovedLatestVersion').val() !== '' && typeof ($('#ApprovedLatestVersion').val()) !== "undefined") {
                    var selectedval = $("#isWeekEndExclude").val().toLowerCase();
                    selectedval = selectedval == "true" ? "Excluded" : "Included"

                    $('#btnApprove').hide();
                    $('#btnClone').hide();
                    $('.template-div').hide();
                    $('.weekend-switching-div').hide();

                    if ($('#ApprovedLatestVersion').val() == $('#currentSelectedVersion').val()) {
                        $("#save-template").show();
                    }
                    $(".version-div").show();
                    $("#weekend-selected").text(selectedval);
                    $(".weekend-selected-span").show();
                }
                // It is only saved i.e (unapproved or new fresh project hub combo)
                else {
                    $(".version-div").hide();
                    $("#weekend-selected").text('');
                    $(".weekend-selected-span").hide();

                    if ($('#ApprovedLatestVersion').val() == $('#currentSelectedVersion').val()) {
                        $("#save-template").show();
                    }
                    $('#btnApprove').show();
                    $('#btnClone').show();
                    $('.template-div').show();
                    $('.weekend-switching-div').show();
                }

                if ($('#ApprovedLatestVersion').val() == $('#currentSelectedVersion').val()) {
                    if ($("#RevisedRequestData").val() == null || $("#RevisedRequestData").val() == undefined || $("#RevisedRequestData").val() == "") {
                        if (isSavable == 1) {
                            $('#btnSubmit').show();
                        }
                        else {
                            $('#btnSubmit').hide();
                        }
                    }
                    else {
                        $('#btnSubmit').show();
                    }
                }
                else {
                    $('#btnSubmit').hide();
                }
                smartSheetCalculation(0);
                
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        })
    }
}
$('body').on('click', '#btnSubmit', function () {
    var isValidHeader = true; var isValidDetails = true;
    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== 'undefined' && $('#ProjectId').val() !== '0') {
        $('.projectName_error').text('');
        if ($('#Hub').val() === null || $('#Hub').val() === '' || typeof ($('#Hub').val()) === "undefined" || $('#Hub').val() === '0') {
            $('.hubName_error').text('Please select HUB');
        }
        else {

            $('.hubName_error').text('');

            var taskHeader = $('#pmumapping').dataTable().$('[data-headerid]').length;
            if (taskHeader === 0) {
                alert("Please add atleast one WBS Header");
                isValidHeader = false;
            }
            $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
                var headerId = $(obj).attr('data-headerid');
                var headerslno = parseInt($(obj).find('[data-slno]').attr('data-slno'));
                var wbsheader = $('#row_' + headerslno).find('[data-wbsheader]').attr('data-wbsheader');
                if (wbsheader === null || wbsheader === '' || typeof (wbsheader) === "undefined") {
                    $('#row_' + headerslno).find('[data-header]').siblings('span').removeClass('hide');
                    isValidHeader = false;
                }
                else {
                    $('#row_' + headerslno).find('[data-header]').siblings('span').addClass('hide');
                }
                var duration = $('#row_' + headerslno).find('[data-duration]').val();
                if (duration === null || duration === '' || typeof (duration) === "undefined") {
                    $('#row_' + headerslno).find('[data-duration]').siblings('span').removeClass('hide');
                    isValidHeader = false;
                }
                else {
                    $('#row_' + headerslno).find('[data-duration]').siblings('span').addClass('hide');
                }
                var startdate = $('#row_' + headerslno).find('[data-startdate]').val();
                if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
                    $('#row_' + headerslno).find('[data-startdate]').siblings('span').removeClass('hide');
                    isValidHeader = false;
                }
                else {
                    $('#row_' + headerslno).find('[data-startdate]').siblings('span').addClass('hide');
                }
                var enddate = $('#row_' + headerslno).find('[data-enddate]').val();
                if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
                    $('#row_' + headerslno).find('[data-enddate]').siblings('span').removeClass('hide');
                    isValidHeader = false;
                }
                else {
                    $('#row_' + headerslno).find('[data-enddate]').siblings('span').addClass('hide');
                }
                //var resources = $('#row_' + headerslno).find('[data-resources]').val();
                //if (resources === null || resources === '' || typeof (resources) === "undefined") {
                //    $('#row_' + headerslno).find('[data-resources]').siblings('span').removeClass('hide');
                //    isValidHeader = false;
                //}
                //else {
                //    $('#row_' + headerslno).find('[data-resources]').siblings('span').addClass('hide');
                //}
                var taskDetails = $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').length;
                if (taskDetails === 0) {
                    alert("Please add atleast one Task under WBS Header");
                    isValidDetails = false;
                    return false;
                }
                $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').each(function (detailsi, detailsobj) {
                    var detailslno = parseInt($(detailsobj).find('[data-slno]').attr('data-slno'));
                    var task = $('#row_' + detailslno).find('[data-task]').attr('data-task');
                    if (task === null || task === '' || typeof (task) === "undefined") {
                        $('#row_' + detailslno).find('[data-task]').siblings('span').removeClass('hide');
                        isValidDetails = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-task]').siblings('span').addClass('hide');
                    }
                    var duration = $('#row_' + detailslno).find('[data-duration]').val();
                    if (duration === null || duration === '' || typeof (duration) === "undefined") {
                        $('#row_' + detailslno).find('[data-duration]').siblings('span').removeClass('hide');
                        isValidDetails = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-duration]').siblings('span').addClass('hide');
                    }
                    var startdate = $('#row_' + detailslno).find('[data-startdate]').val();
                    if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
                        $('#row_' + detailslno).find('[data-startdate]').siblings('span').removeClass('hide');
                        isValidDetails = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-startdate]').siblings('span').addClass('hide');
                    }
                    var enddate = $('#row_' + detailslno).find('[data-enddate]').val();
                    if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
                        $('#row_' + detailslno).find('[data-enddate]').siblings('span').removeClass('hide');
                        isValidDetails = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-enddate]').siblings('span').addClass('hide');
                    }
                    if ($('#ApprovedLatestVersion').val() !== null && $('#ApprovedLatestVersion').val() !== '' && typeof ($('#ApprovedLatestVersion').val()) !== "undefined") {
                        var resources = $('#row_' + detailslno).find('[data-resources]').val();
                        if (resources === null || resources === '' || typeof (resources) === "undefined") {
                            $('#row_' + detailslno).find('[data-resources]').siblings('span').removeClass('hide');
                            isValidHeader = false;
                        }
                        else {
                            $('#row_' + detailslno).find('[data-resources]').siblings('span').addClass('hide');
                        }
                    }
                })
            });
            if (isValidHeader && isValidDetails) {
                if ($('#ApprovedLatestVersion').val() === null || $('#ApprovedLatestVersion').val() === '' || typeof ($('#ApprovedLatestVersion').val()) === "undefined") {
                    submitData("", false);
                }
                else {
                    if ((ChangedSLNo == "" && changedSLNoForSave == "") &&
                        ($("#RevisedRequestData").val() == null || $("#RevisedRequestData").val() == undefined || $("#RevisedRequestData").val() == ""))
                    {
                        alert('There is no changes to save');
                    }
                    else {
                        confirmWithVersion("Do you want to save it as a new version?", function () {
                            var isvalid = true;
                            
                            //if ($('#NewVersion').val() === null || $('#NewVersion').val() === '' || typeof ($('#NewVersion').val()) === "undefined") {
                            //    isvalid = false;
                                //$('#NewVersion').siblings('span').removeClass('hide')
                                if ($("#VersionRemarks").val() === "" || $("#VersionRemarks").val() === null || typeof ($("#VersionRemarks").val()) === "undefined") {
                                    isvalid = false;
                                    $('#VersionRemarks').siblings('span').removeClass('hide')
                                    return false;
                                }
                              //  return false;
                            //}
                            //else {
                            //    $('#NewVersion').siblings('span').addClass('hide');
                            //    isvalid = true;
                            //}

                            if ($("#VersionRemarks").val() === "" || $("#VersionRemarks").val() === null || typeof ($("#VersionRemarks").val()) === "undefined") {
                                isvalid = false;
                                $('#VersionRemarks').siblings('span').removeClass('hide')
                                return false;
                            }
                            else {
                                $('#VersionRemarks').siblings('span').addClass('hide');
                                isvalid = true;
                            }

                            if (isvalid) {
                                var newversion = "";
                                $('#NewVersion').siblings('span').addClass('hide');
                                $('#VersionRemarks').siblings('span').addClass('hide');
                                if ($("#Version").val() == "Baseline") {
                                    newversion = "Version 1";
                                }
                                else {
                                    var curVersion = $("#Version").val();
                                    var version = curVersion.split(' ');
                                    var versionNumber = parseInt(version[1]) +1;
                                    newversion = version[0] + ' ' + versionNumber;
                                }

                                submitData(newversion, true);
                            }
                        }, function () {
                            submitData($('#ApprovedLatestVersion').val(), false);
                        })
                    }
                }
            }
        }
    }
    else {
        $('.projectName_error').text('Please select the Project');
        if ($('#Hub').val() === null || $('#Hub').val() === '' || typeof ($('#Hub').val()) === "undefined" || $('#Hub').val() === '0') {
            $('.hubName_error').text('Please select HUB');
        }
    }
})
$('body').on('click', '#btnApprove', function () {
    var isValidHeader = true; var isValidDetails = true;
    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== 'undefined' && $('#ProjectId').val() !== '0') {
        $('.projectName_error').text('');
        if ($('#Hub').val() === null || $('#Hub').val() === '' || typeof ($('#Hub').val()) === "undefined" || $('#Hub').val() === '0') {
            $('.hubName_error').text('Please select HUB');
        }
        else {
            $('.hubName_error').text('');
            var taskHeader = $('#pmumapping').dataTable().$('[data-headerid]').length;
            if (taskHeader === 0) {
                alert("Please add atleast one WBS Header");
                isValidHeader = false;
            }
            $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
                var headerId = $(obj).attr('data-headerid');
                var headerslno = parseInt($(obj).find('[data-slno]').attr('data-slno'));
                var wbsheader = $('#row_' + headerslno).find('[data-wbsheader]').attr('data-wbsheader');
                if (wbsheader === null || wbsheader === '' || typeof (wbsheader) === "undefined") {
                    $('#row_' + headerslno).find('[data-header]').siblings('span').removeClass('hide');
                    isValidHeader = false;
                }
                else {
                    $('#row_' + headerslno).find('[data-header]').siblings('span').addClass('hide');
                }
                var duration = $('#row_' + headerslno).find('[data-duration]').val();
                if (duration === null || duration === '' || typeof (duration) === "undefined") {
                    $('#row_' + headerslno).find('[data-duration]').siblings('span').removeClass('hide');
                    isValidHeader = false;
                }
                else {
                    $('#row_' + headerslno).find('[data-duration]').siblings('span').addClass('hide');
                }
                var startdate = $('#row_' + headerslno).find('[data-startdate]').val();
                if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
                    $('#row_' + headerslno).find('[data-startdate]').siblings('span').removeClass('hide');
                    isValidHeader = false;
                }
                else {
                    $('#row_' + headerslno).find('[data-startdate]').siblings('span').addClass('hide');
                }
                var enddate = $('#row_' + headerslno).find('[data-enddate]').val();
                if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
                    $('#row_' + headerslno).find('[data-enddate]').siblings('span').removeClass('hide');
                    isValidHeader = false;
                }
                else {
                    $('#row_' + headerslno).find('[data-enddate]').siblings('span').addClass('hide');
                }
                //var resources = $('#row_' + headerslno).find('[data-resources]').val();
                //if (resources === null || resources === '' || typeof (resources) === "undefined") {
                //    $('#row_' + headerslno).find('[data-resources]').siblings('span').removeClass('hide');
                //    isValidHeader = false;
                //}
                //else {
                //    $('#row_' + headerslno).find('[data-resources]').siblings('span').addClass('hide');
                //}
                var taskDetails = $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').length;
                if (taskDetails === 0) {
                    alert("Please add atleast one Task under WBS Header");
                    isValidDetails = false;
                    return false;
                }
                $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').each(function (detailsi, detailsobj) {
                    var detailslno = parseInt($(detailsobj).find('[data-slno]').attr('data-slno'));
                    var task = $('#row_' + detailslno).find('[data-task]').attr('data-task');
                    if (task === null || task === '' || typeof (task) === "undefined") {
                        $('#row_' + detailslno).find('[data-task]').siblings('span').removeClass('hide');
                        isValidDetails = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-task]').siblings('span').addClass('hide');
                    }
                    var duration = $('#row_' + detailslno).find('[data-duration]').val();
                    if (duration === null || duration === '' || typeof (duration) === "undefined") {
                        $('#row_' + detailslno).find('[data-duration]').siblings('span').removeClass('hide');
                        isValidDetails = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-duration]').siblings('span').addClass('hide');
                    }
                    var startdate = $('#row_' + detailslno).find('[data-startdate]').val();
                    if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
                        $('#row_' + detailslno).find('[data-startdate]').siblings('span').removeClass('hide');
                        isValidDetails = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-startdate]').siblings('span').addClass('hide');
                    }
                    var enddate = $('#row_' + detailslno).find('[data-enddate]').val();
                    if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
                        $('#row_' + detailslno).find('[data-enddate]').siblings('span').removeClass('hide');
                        isValidDetails = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-enddate]').siblings('span').addClass('hide');
                    }
                    var resources = $('#row_' + detailslno).find('[data-resources]').val();
                    if (resources === null || resources === '' || typeof (resources) === "undefined") {
                        $('#row_' + detailslno).find('[data-resources]').siblings('span').removeClass('hide');
                        isValidHeader = false;
                    }
                    else {
                        $('#row_' + detailslno).find('[data-resources]').siblings('span').addClass('hide');
                    }
                })
            });
            if (isValidHeader && isValidDetails) {
                confirm("Are you sure, Do you want to Approve?", function () {
                    submitData("Baseline", true);
                })
            }
        }
    }
    else {
        $('.projectName_error').text('Please select the Project');
        if ($('#Hub').val() === null || $('#Hub').val() === '' || typeof ($('#Hub').val()) === "undefined" || $('#Hub').val() === '0') {
            $('.hubName_error').text('Please select HUB');
        }
    }
})
function removeValidationStartEndDate() {
    $('#pmumapping').dataTable().$('[data-headerid]').each(function (i, obj) {
        var headerId = $(obj).attr('data-headerid');
        var headerslno = parseInt($(obj).find('[data-slno]').attr('data-slno'));

        var startdate = $('#row_' + headerslno).find('[data-startdate]').val();
        if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
            $('#row_' + headerslno).find('[data-startdate]').siblings('span').removeClass('hide');
        }
        else {
            $('#row_' + headerslno).find('[data-startdate]').siblings('span').addClass('hide');
        }

        var enddate = $('#row_' + headerslno).find('[data-enddate]').val();
        if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
            $('#row_' + headerslno).find('[data-enddate]').siblings('span').removeClass('hide');
        }
        else {
            $('#row_' + headerslno).find('[data-enddate]').siblings('span').addClass('hide');
        }

        $('#pmumapping').dataTable().$('[data-relationid="' + headerId + '"]').each(function (detailsi, detailsobj) {
            var detailslno = parseInt($(detailsobj).find('[data-slno]').attr('data-slno'));
            var task = $('#row_' + detailslno).find('[data-task]').attr('data-task');
            if (task === null || task === '' || typeof (task) === "undefined") {
                $('#row_' + detailslno).find('[data-task]').siblings('span').removeClass('hide');
            }
            else {
                $('#row_' + detailslno).find('[data-task]').siblings('span').addClass('hide');
                var startdate = $('#row_' + detailslno).find('[data-startdate]').val();
                if (startdate === null || startdate === '' || typeof (startdate) === "undefined") {
                    $('#row_' + detailslno).find('[data-startdate]').siblings('span').removeClass('hide');
                }
                else {
                    $('#row_' + detailslno).find('[data-startdate]').siblings('span').addClass('hide');
                }

                var enddate = $('#row_' + detailslno).find('[data-enddate]').val();
                if (enddate === null || enddate === '' || typeof (enddate) === "undefined") {
                    $('#row_' + detailslno).find('[data-enddate]').siblings('span').removeClass('hide');
                }
                else {
                    $('#row_' + detailslno).find('[data-enddate]').siblings('span').addClass('hide');
                }
            }
        })
    });
}
function submitData(version, islatest) {
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
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
                    };
                    documentArray.push(document);
                }
            })
            var DeletedDocuments = deletedDocumentsArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
            var DeletedRemarks = DeletedRemarksArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
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
                DeletedDocumentsArray: DeletedDocuments,
                DeletedRemarksArray: DeletedRemarks,
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
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
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
            var DeletedDocuments = deletedDocumentsArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
            var DeletedRemarks = DeletedRemarksArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
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
                DeletedDocumentsArray: DeletedDocuments,
                DeletedRemarksArray: DeletedRemarks,
                ResourcesArray: resourcesArray,
                MileStoneStatus: milestonestatus,
                VersionRemarks: $('#VersionRemarks').val()
            }
            pmuMappingsArray.push(pmuMappings);
        }
    })
    var distinctArray = Array.from(new Set(ChangedSLNo.split(',')));
    distinctArray = distinctArray.filter(Boolean);
    var changedData= distinctArray.join(',');

    formData.append("PMUMappings", JSON.stringify(pmuMappingsArray));
    formData.append("PMUVersion", version);
    formData.append("IsLatest", islatest);
    formData.append("IsWeekendExcluded", $('#weekend-switching option:selected').val());
    formData.append("HubId", parseInt($('#Hub option:selected').val()));
    formData.append("ProjectId", $('#ProjectId').val());
    //formData.append("IsAutoSave",0);
    var data = []; var revisedData = []; requestedData = []; var ExtendedId = 0;
    if ($("#RevisedRequestData").val() != null && $("#RevisedRequestData").val() != undefined && $("#RevisedRequestData").val() != "") {
        data = JSON.parse($("#RevisedRequestData").val());
        revisedData = data.Item1;
        requestedData = data.Item2;
        ExtendedId = requestedData
            .filter(item => item.SlNo === revisedData[0].SlNo)
            .map(item => item.ExtendId);
        ExtendedId = ExtendedId[0];
    }
    formData.append("ExtendedId", ExtendedId);
    formData.append("ChangedSlInfo", changedData);
    $.ajax({
        url: ROOT + 'Master/SavePMUMappings', 
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
            $('#NewVersion').val('');
            $('#VersionRemarks').val('');
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    })
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
function confirmWithVersion(msg, func, func1) {
    $("#NewVersion").val('');
    $("#VersionRemarks").val('');
    if ($("#Version").val() == "Baseline") {
        $('#versionpopupmesssage').empty().html('A new version "<b> Version 1 </b>" will be created on clicking <b>save</b>');
        $("#versionpopupOK").empty().text('Save')
    }
    else {
        $('#versionpopupmesssage').empty().html(msg);
    }
    $('#versionpopup').modal('show');
    if (func) {
        $("#versionpopupOK").unbind("click");
        $('#versionpopupOK').on("click", func);
    }
    if (func1) {
        if ($("#Version").val() == "Baseline") {
            $("#versionpopupCancel").hide();
        } else {
            $("#versionpopupCancel").unbind("click");
        }
        $('#versionpopupCancel').on("click", func1);
    }
}
function confirmWithDependentAlert(msg, func, func1) {
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
                '</td>' +
                '<td><input type="text" class="form-control text-center" data-predecessorleadorlag="" value="' + leadOrLag + '" /></td>' +
                '<td class="text-center"><div class="action_width"><button class="trash_icon ml-2" type="button" onclick="deletePredecessorRow(this)"><i class="fas fa-trash"></i></button></div></td>' +
                '</tr>';
            $('#dependencyTable tbody').append(tr);
        });
    }
    var nextTr = '<tr>' +
        '<td><input type="text" class="form-control text-right" value="" data-predecessor="" /></td>' +
        '<td data-predecessortask="">' + '</td>' +
        '<td>' +
        '<select class="form-control" data-predecessortype="">' +
        '<option value="">Select</option>' +
        '<option value="FS">Finish to Start (FS)</option>' +
        '<option value="SS">Start to Start (SS)</option>' +
        '</select>' +
        '</td>' +
        '<td><input type="text" class="form-control text-right" data-predecessorleadorlag="" value="" /></td>' +
        '<td class="text-center"><div class="action_width"><button class="trash_icon ml-2" type="button" onclick="deletePredecessorRow(this)"><i class="fas fa-trash"></i></button></div></td>' +
        '</tr>';
    $('#dependencyTable tbody').append(nextTr);
}
$('body').on('change', '[data-predecessor]', function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        var rowNo = $(this).val();
        var slno = parseInt($('#row_' + rowNo).find('[data-slno]').attr('data-slno'));
        var selectedRowNo = parseInt($('#SelectedRow').text());
        var tableLength = $('#pmumapping').dataTable().$('tr').length;
        var headerId = $('#row_' + rowNo).attr('data-headerid');
        var task = $('#row_' + rowNo).find('[data-task]').val();
        var currentTr = $(this).closest('tr');
        var headerIds=[];
        $('#pmumapping').dataTable().$('[data-headerid]').each(function (headeri, headerobj) {
            if ($(headerobj).attr('data-headerid') !== null && $(headerobj).attr('data-headerid') !== '' && typeof ($(headerobj).attr('data-headerid')) !== "undefined") {
                headerIds.push(Number($(headerobj).attr('data-headerid')));
            }
        })
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
        $(currentTr).find('[data-predecessortask]').text(task);
        $(currentTr).find('[data-predecessortype]').val('FS');
        var nextTr = '<tr>' +
            '<td><input type="text" class="form-control text-right" value="" data-predecessor="" /></td>' +
            '<td data-predecessortask="">' + '</td>' +
            '<td>' +
            '<select class="form-control" data-predecessortype="">' +
            '<option value="">Select</option>' +
            '<option value="FS">Finish to Start (FS)</option>' +
            '<option value="SS">Start to Start (SS)</option>' +
            '</select>' +
            '</td>' +
            '<td><input type="text" class="form-control text-right" data-predecessorleadorlag="" value="" /></td>' +
            '<td class="text-center"><div class="action_width"><button class="trash_icon ml-2" type="button" onclick="deletePredecessorRow(this)"><i class="fas fa-trash"></i></button></div></td>' +
            '</tr>';
        $('#dependencyTable tbody').append(nextTr);
    }
})
$('body').on('click', '#dependencypopupOk', function () {
    var selectedRow = $('#SelectedRow').text();
    var relationId = parseInt($('#row_' + selectedRow).attr('data-relationid'));
    var selectedTr = $('#row_' + selectedRow);
    var dependentStartDateArray = []; var newDependencyArray = [];
    $('#dependencyTable tbody tr').each(function (i, obj) {
        var dependencyRowNo = $(obj).find('[data-predecessor]').val();
        if (dependencyRowNo !== null && dependencyRowNo !== '' && typeof (dependencyRowNo) !== "undefined") {
            var dependencyType = $(obj).find('[data-predecessortype]').val();
            var leadOrLag = $(obj).find('[data-predecessorleadorlag]').val() !== null && $(obj).find('[data-predecessorleadorlag]').val() !== '' && typeof ($(obj).find('[data-predecessorleadorlag]').val()) !== "undefined" ? parseInt($(obj).find('[data-predecessorleadorlag]').val()) : 0;
            var duration = leadOrLag === 0 ? 0 : leadOrLag > 0 ? (leadOrLag - 1) : (leadOrLag + 1);
            var dependentStartDate = dependencyType === 'FS' ? $('#pmumapping').dataTable().$('#row_' + dependencyRowNo).find('td [data-enddate]').val() : $('#pmumapping').dataTable().$('#row_' + dependencyRowNo).find('td [data-startdate]').val();
            if (dependentStartDate !== null && dependentStartDate !== '' && typeof (dependentStartDate) !== "undefined") {
                var dependentStartDateAfterduration = addBusinessDays(moment(dependentStartDate, "DD/MM/YYYY"), duration);
                dependentStartDateArray.push(dependentStartDateAfterduration);
            }
            var dependency = dependencyRowNo + dependencyType + (leadOrLag >= 0 ? '+' + leadOrLag : leadOrLag);
            newDependencyArray.push(dependency)
        }
    })
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
    smartSheetCalculation(relationId);
})
function deletePredecessorRow(e) {
    var currentTr = $(e).closest('tr');
    $(currentTr).remove();
}
function showDocuments(rowNo, Action = 1) {
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
    })
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
                '<td class="text-center"><a href="' + ROOT + 'PMUMappingsUploads/' + obj.ProjectId + '/' + obj.SlNo + '/' + obj.DocumentName + '" download><i class="fa fa-download" title="Download"></i></a>' +
                '<button class="trash_icon ml-2" type="button" onclick="deleteDocuments(this,' + rowNo + ')"><i class="fas fa-trash"  title="Delete" ></i></button>' +
                '</td>' +
                '</tr>');
        })
    }
    else if (Action == 0) {
        $.each(filteredDocuments, function (i, obj) {
            $('#documentsTable tbody').append('<tr>' +
                '<td data-documentname="' + obj.DocumentName + '">' + obj.DocumentName + '</td>' +
                '<td>' + obj.SubmittedBy + '</td>' +
                '<td>' + obj.SubmittedOn + '</td>' +
                '<td class="text-center"><a href="' + ROOT + 'PMUMappingsUploads/' + obj.ProjectId + '/' + obj.SlNo + '/' + obj.DocumentName + '" download><i class="fa fa-download" title="Download"></i></a>' +
                '</td>' +
                '</tr>');
        })
    }
}
function deleteDocuments(e, rowNo) {
    confirm("Are you sure, do you want to delete?", function () {
        var currentTr = $(e).closest('tr');
        var documentName = $(currentTr).find('[data-documentname]').attr('data-documentname');
        var deleteRowArray = documentDetails.filter(function (o) { return o.SlNo === rowNo && o.DocumentName === documentName });
        $.each(deleteRowArray, function (i, obj) {
            deletedDocumentsArray.push(obj);
        })
        $(currentTr).remove();
        var documentCount = documentDetails.filter(item => item.SlNo === rowNo && item.DocumentName !== documentName)
        documentCount = documentCount.filter(item =>
            !deletedDocumentsArray.some(deletedItem =>
                deletedItem.SlNo === item.SlNo && deletedItem.DocumentName === item.DocumentName
            )
        );
        if (documentCount.length == 0) {
            var currentFileIcon = $("#row_" + rowNo).find(".show-file-icon")
            $('.fa-history').each(function () {
                currentFileIcon.css('display', 'none');
            });
        }
    })
}
function showRemarks(rowNo) {
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
    })
    $.each(filteredRemarks, function (i, obj) {
        $('#remarksTable tbody').append('<tr>' +
            '<td class="remark_td">' + obj.RemarkDesc + '</td>' +
            '<td>' + obj.SubmittedBy + '</td>' +
            '<td>' + obj.SubmittedOn + '</td>' +
            '</tr>');
    })
}
////////////////////////////-----------------Remarks(Notes) Popup-------------------//////////////////////////////////////////
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
$('#ProjectId').val($('#selectedProjectId').val())
var projectId = parseInt($('#ProjectId').val())
var hubId = parseInt($('#Hub option:selected').val())
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
            $("#RemarksModal1").modal("show");
            CreateNotesModal(hubId, projectId);
            $("#Hub_text").text($('#Hub option:selected').text());
            $("#project_text").text($("#ProjectId :selected").text());
        }
    }

}
$("#btnAdd").on("click", function () {
    $("#notes_msg").text('')
    $("#notes_msg").removeClass("text-red")
    $("#notes_msg").removeClass("text-success")
    var isValid = true;
    var notes = $("#Notes").val();
    var hubId = parseInt($('#Hub option:selected').val())
    var projectId = parseInt($('#ProjectId').val())
    if (notes == "" || notes == null || typeof (notes) == "undefined") {
        $("#btnRemarks").show();
        isValid = false
        return false
    }
    if (isValid) {
        $.ajax({
            url: ROOT + 'Master/SaveNotes',
            type: 'POST',
            data: {
                HubId: hubId, ProjectId: projectId, Notes: notes
            },
            success: function (result) {
                if (result.includes("Successfully")) {
                    $("#notes_msg").text(result)
                    $("#notes_msg").addClass("text-success")
                    $("#notes_msg").removeClass("text-red")
                    $("#Notes").val('');
                    CreateNotesModal(hubId, projectId);
                } else {
                    $("#notes_msg").text(result)
                    $("#notes_msg").addClass("text-red")
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
function CreateNotesModal(hubid, projectid) {
    //debugger;
    $.ajax({
        url: ROOT + 'Master/GetNotes',
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
            alert(" An Error occured!!");
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

////////////////////////////-----------------WBS HEADER & TASK MASTER,  VERSION SWITCHING, SAVING NEW TEMPLATE-------------------//////////////////////////////////////////

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
                    var Action = 1;
                    return '<div></button > <button class="trash_icon" type="button" onclick="deleteWbsheaderTask(' + cellvalue + ',' + Action + ',this)"><i class="fas fa-trash" title="Delete"></i></button></div>'
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
$('body').on('click', '#wbsheader', function () {

    getWbsHeaderGrid();
    $("#wbsheader-modal").modal("show");

});
function getTaskGrid() {

    $(".Err-empty-task").hide();
    $(".Err-exists-task").hide();
    $("#new-task").val('');
    $.jgrid.gridUnload('#task-grid');

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
                    var Action = 2;
                    return '<div></button > <button class="trash_icon" type="button" onclick="deleteWbsheaderTask(' + cellvalue + ',' + Action + ',this)"><i class="fas fa-trash" title="Delete"></i></button></div>'
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
$('body').on('click', '#task', function () {

    getTaskGrid();
    $("#task-modal").modal("show");

});
function saveNewWbsHeaderTask(Action) {
    // wbsheader means will pass 1
    // task means will pass 2

    var newData = "";
    var type = "";

    if (Action == 1) {
        newData = $("#new-wbsheader").val().trim();
        newData = newData.replace(/\s+/g, ' ');
        type = "WBSHeader";
    }
    else if (Action == 2) {
        newData = $("#new-task").val().trim();
        newData = newData.replace(/\s+/g, ' ');
        type = "Task";
    }

    $.ajax({
        url: ROOT + 'Master/SaveNewWBSHeaderTask',
        type: 'POST',
        dataType: 'JSON',
        data: {
            newData: newData,
            type: type
        },
        success: function (response) {

            var message = response.Item1;
            var newId = response.Item2;

            if (message.toLowerCase().includes("successfully")) {

                if (type.toLowerCase() == "task") {
                    autocompleteDrodownArray['Task'].unshift({
                        TaskId: newId,
                        TaskDesc: newData,
                        IsApproved: 0
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
                        IsApproved:0
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
            alert('<bold>Error Occured</bold> : ' + e);
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
            url: ROOT + 'Master/DeleteWBSHeaderTask',
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
                alert('<bold>Error Occured</bold> : ' + e);
            }
        })
    });
}
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
        if (NewTask == "") {
            $(".Err-exists-task").hide();
            $(".Err-empty-task").show();
            validWbsHeaderTaskFlag = 0;
        }
        else {
            $(".Err-empty-task").hide();
            validWbsHeaderTaskFlag = 1;
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
function getVersionData() {
    $.ajax({
        url: ROOT + 'Master/PV_NewPMUMappings',
        type: 'POST',
        async: false,
        cache: false,
        dataType: 'HTML',
        data: {
            ProjectId: parseInt($('#ProjectId').val()),
            ProjectName: $('#ProjectId option:selected').text(),
            CurrentSelectedVersion: $('#Version option:selected').text() == null ? '' : $('#Version option:selected').text(),
            HubId: parseInt($('#Hub option:selected').val()),
            HubName: $('#Hub option:selected').text()
        },
        success: function (result) {
            $('#pmumappingtablediv').html(result);
            $('#pmumapping thead tr')
                .clone(true)
                .addClass('filters')
                .appendTo('#pmumapping thead');
            var tableLength = $('#pmumapping tbody tr').length;
            initializeDataTable(tableLength);
            documentDetails = JSON.parse($('#DocumentDetails').val());
            remarksDetails = JSON.parse($('#RemarksDetails').val());
            loadAutoCompleteDropdowns(autocompleteDrodownArray);

            var selectedval = $("#isWeekEndExclude").val().toLowerCase();
            selectedval = selectedval == "true" ? "Excluded" : "Included"

            $('#btnClone').hide();
            $('#btnApprove').hide();
            $('#notes_span').hide();
            $('.template-div').hide();
            $('.weekend-switching-div').hide();

            $(".version-div").show();
            $("#weekend-selected").text(selectedval);
            $(".weekend-selected-span").show();

            if ($('#ApprovedLatestVersion').val() == $('#currentSelectedVersion').val()) {
                $("#save-template").show();
                if ($("#RevisedRequestData").val() == null || $("#RevisedRequestData").val() == undefined || $("#RevisedRequestData").val() == "") {
                    if (isSavable == 1) {
                        $('#btnSubmit').show();
                    }
                    else {
                        $('#btnSubmit').hide();
                    }
                }
                else {
                    $('#btnSubmit').show();
                }
            }
            else {
                $('#btnSubmit').hide();
                $("#save-template").hide();
            }
            smartSheetCalculation(0);
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
    })
}
$('body').on('change', '#Version', function () {
    var latestVersion = $("#ApprovedLatestVersion").val()
    var currentversion = $(this).val()
    if (currentversion === latestVersion) {
        $("#notes_span").show()

    }
    else {
        $("#notes_span").hide()
    }
    $.ajax({
        url: ROOT + 'Master/CheckForApproval',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            projectId: parseInt($('#ProjectId').val()),
            HubId: parseInt($('#Hub option:selected').val()),
        },
        success: function (result) {
            if (result.length > 0) {
                getVersionData();
            }
            else {
                getVersionData();
            }
        }
    })
});
$('body').on('change', '#weekend-switching', function () {
    //if (isManuallySelectedSD.length > 0 && ($(this).val()) == "True") {
    //    $('#isWeekEndExclude').val("False");
    //    $('#weekend-switching').val("False").change();
    //    alert('You have manually selected Saturday or Sunday in start date of row No <strong>' + isManuallySelectedSD.join(", ") + '</strong>. Please change the dates.');
    //}
    //if (isManuallySelectedED.length > 0 && ($(this).val()) == "True") {
    //    $('#isWeekEndExclude').val("False");
    //    $('#weekend-switching').val("False").change();
    //    alert('You have manually selected Saturday or Sunday in end date of row No <strong>' + isManuallySelectedED.join(", ") + '</strong>. Please change the dates.')
    //    return false;
    //}
    /* else {*/
    $('#isWeekEndExclude').val($(this).val());
    loadAutoCompleteDropdowns(autocompleteDrodownArray);
    smartSheetCalculation(0);
    //}
});
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
        url: ROOT + 'Master/SaveNewTemplate',
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
    })
}
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
        getData(true);
    }
});
$('body').on('click', '.confirm-cancel', function () {

    var templateDropDownAutoSelect = $("#fromtemplate");
    templateDropDownAutoSelect.val("0").change();

});
var excel_documentarray = [];
var excelremarksarray = [];
function CreateJqGrid(data) {
    $.jgrid.gridUnload('#jqgrid');
    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'Get',
        colModel: [
            {
                name: 'RowNum',
                label: 'Sl.No',
                width: 60,
                resizable: true,
                ignoreCase: true,
                search: false,
            },
            {
                name: 'WBSHeader',
                label: 'WBS Header',
                // width: 150,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'Task',
                label: 'Task',
                // width: 150,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'Dependency',
                label: 'Dependency',
                // width: 100,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'Duration',
                label: 'Duration',
                // width: 100,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'StartDate',
                label: 'Start Date',
                // width: 55,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'EndDate',
                label: 'End Date',
                //  width: 55,
                resizable: true,
                ignoreCase: true
            },


            {
                name: 'Percentage',
                label: 'Percentage',
                // width: 100,
                resizable: true,
                ignoreCase: true
            },
            {
                name: 'Resources',
                label: 'Resources',
                //  width: 70,
                resizable: true,
                ignoreCase: true,
            },
            {
                name: 'Files',
                label: 'Files',
                //width: 70,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    var filelength = excel_documentarray.filter(function (o) { return parseInt(o.SlNo) === parseInt(rowobject.RowNum) }).length;
                    if (filelength > 0) {
                        return "Yes";
                    }
                    else {
                        return "";
                    }

                }
            },
            {
                name: 'Remarks',
                label: 'Remarks',
                //width: 70,
                resizable: true,
                ignoreCase: true,
                formatter: function (cellvalue, options, rowobject) {
                    var remfilelength = excelremarksarray.filter(function (o) { return parseInt(o.SlNo) === parseInt(rowobject.RowNum) }).length;
                    if (remfilelength > 0) {
                        return "Yes";
                    }
                    else {
                        return "";
                    }

                }
            },
        ],
        loadonce: true,
        viewrecords: true,
        rowNum: 20,
        pager: '#pager',
        subGrid: true,
        gridComplete: function () {
            var objRows = $("#jqgrid tbody tr");
            var objHeader = $("#jqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
    });
    $("#jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();

    if ($TableHeight > 278) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
    }
    else {
        $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");

    }
}
function GetPMUMappingsExcelData(projectId, hubId) {

    $.ajax({
        url: ROOT + 'Master/GetNewPMUMappingsExcelData',
        type: 'GET',
        dataType: 'JSON',
        async: false,
        data: {
            ProjectId: projectId,
            HubId: hubId
        },
        success: function (result) {
            CreateJqGrid(result);

        }
    })
}
$("#ExcelDownload").on('click', function () {
    CreateJqGrid("");
    var projectId = parseInt($('#ProjectId').val())
    var hubId = parseInt($('#Hub option:selected').val())
     var projectName= $('#ProjectId option:selected').text()
 
         var hubName= $('#Hub option:selected').text()
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
    else {
        exceldatadownload();
        var data = $('#jqgrid').jqGrid('getGridParam', 'data');
        if (data.length === 0) {
            alert("No data in Grid");
            isValid = false;
        }

    }
    if (isValid) {
        isExport = true;
        $("#jqgrid").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: projectName +"_" + hubName+".xlsx",
            maxlength: 1000, 
        });
        isExport = false;
    }
});
$("#MappedProjectId").on('change', function () {
    var projectId = $("#MappedProjectId").val()
    if (parseInt(projectId === 0) || projectId == '') {
        $('#MappedHubId').empty();
        $('#MappedHubId').select2();
    } else {
        $.ajax({
            url: ROOT + 'Master/GetNewPMUMappingsHubData',
            type: 'GET',
            dataType: 'JSON',
            async: false,
            data: {
                ProjectId: projectId,
            },
            success: function (result) {
                // debugger;
                if (result.length > 0) {
                    $('#MappedHubId').empty();
                    $('#MappedHubId').append('<option value="">-- Select the HUB--</option>');
                    $.each(result, function (index, item) {
                        $('#MappedHubId').append('<option value=' + item.Value + '>' + item.Text + '</option>');
                    })
                    $('#MappedHubId').select2();
                }

            },
            error: function (result) {
                //debugger;
                console.log(result)
            }
        })
    }

});
function GetCloneData() {
    var hubId = parseInt($('#Hub').val())
    var projectId = parseInt($('#ProjectId').val())
    $('#MappedHubId').val("").trigger('change')
    $('#MappedProjectId').val("").trigger('change')
    var isValid = true
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
    else
    {
        if (isValid) {
            $("#addModal").modal("show");
            $("#To_Project").text($("#ProjectId :selected").text())
            $("#To_Hub").text($('#Hub option:selected').text())
        }
    }
}

$("#btnClonseSubmit").on('click', function () {
    $("#notes_span").show();
    var projectId = $('#MappedProjectId').val()
    var hubid = $('#MappedHubId').val()
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
                loadClonedProjectHubData(projectId, hubid)
                $("#addModal").modal("hide");
                $('#MappedHubId').val("").trigger('change');
                $('#MappedProjectId').val("").trigger('change');
            });
        }
        else {
            loadClonedProjectHubData(projectId, hubid)
            $("#addModal").modal("hide");
            $('#MappedHubId').val("").trigger('change');
            $('#MappedProjectId').val("").trigger('change');
        }
    }
});
function loadClonedProjectHubData(projectId, hubId) {
    DeletedRemarksArray = remarksDetails;
    deletedDocumentsArray = documentDetails;
    $.ajax({
        url: ROOT + 'Master/PV_CloneNewPMUMappings',
        type: 'POST',
        async: false,
        cache: false,
        dataType: 'HTML',
        data: {
            ProjectId: projectId,
            HubId: hubId,
            CurrentSelectedVersion: "",
            ApprovedLatestVersion: $('#ApprovedLatestVersion').val()
        },
        success: function (result) {
            $('#pmumappingtablediv').html(result);
            $('#pmumapping thead tr')
                .clone(true)
                .addClass('filters')
                .appendTo('#pmumapping thead');
            var tableLength = $('#pmumapping tbody tr').length;
            initializeDataTable(tableLength);
            documentDetails = JSON.parse($('#DocumentDetails').val());
            remarksDetails = JSON.parse($('#RemarksDetails').val());
            loadAutoCompleteDropdowns(autocompleteDrodownArray);
            var selectedval = $("#isWeekEndExclude").val();
            $("#weekend-switching").val(selectedval).trigger('change');
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    })

}
$("#MappedProjectId").on('change', function () {
    $(".FromProjectId_error").text(" ");

});
$("#MappedHubId").on('change', function () {
    $(".FromHubId_error").text(" ");
});
function exceldatadownload() {
    var pmuMappingsArray = [];
    excel_documentarray = [];
    excelremarksarray = [];
    excelremarksarray = JSON.parse($("#RemarksDetails").val())
    excel_documentarray = JSON.parse($("#DocumentDetails").val())
    $('#pmumapping').dataTable().$('tr').each(function (i, obj) {
        var wbsHeader = $(obj).find('[data-wbsheader]').val();
        var headerid = $(obj).attr('data-headerid');
        var task = $(obj).find('[data-task]').val();
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
                    // formData.append(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp, file);
                    var extension = file.name.split(".").pop();
                    var document = {
                        ProjectId: parseInt(projectId),
                        RowNum: parseInt(rowNo),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
                    };
                    documentArray.push(document);
                }
            })
            var DeletedDocumentsArray = deletedDocumentsArray.filter(function (o) { return o.SlNo === parseInt(rowNo) });
            var pmuMappings = {
                WBSHeader: wbsHeader,
                Task: '',
                RelationId: 0,
                Dependency: dependency,
                Duration: parseInt(duration),
                StartDate: moment(startdate, "DD/MM/YYYY").format("DD/MM/YYYY"),
                EndDate: moment(enddate, "DD/MM/YYYY").format("DD/MM/YYYY"),
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
                VersionRemarks: $('#VersionRemarks').val(),
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
                    var extension = file.name.split(".").pop();
                    var document = {
                        ProjectId: parseInt(projectId),
                        RowNum: parseInt(rowNo),
                        DocumentName: $.trim(projectId + "_" + rowNo + "_" + (fileIndex + 1) + "_" + timestamp + file.name).replace(" ", " ")
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
                WBSHeader: '',
                Task: task,
                RelationId: parseInt(relationId),
                Dependency: dependency,
                Duration: parseInt(duration),
                StartDate: moment(startdate, "DD/MM/YYYY").format("DD/MM/YYYY"),
                EndDate: moment(enddate, "DD/MM/YYYY").format("DD/MM/YYYY"),
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
        excel_documentarray.push(documentArray)
        excelremarksarray.push(remarks)
    })
    CreateJqGrid(pmuMappingsArray)
}

var ChangedSLNo = "";
$('body').on('change', '[data-duration] , [data-startdate] ,[data-enddate] , [data-resources], [data-remarks]', function () {
       var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
        ChangedSLNo += slno + ',';
});

$('body').on('keyup', '[data-percentage]', function () {
    var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
    ChangedSLNo += slno + ',';
});

var changedSLNoForSave = "";
$('body').on('change', '[data-files],[data-remarks]', function () {
    var slno = $(this).closest('tr').find('td[data-slno]').attr('data-slno');
    changedSLNoForSave += slno + ',';
});


function GetHubList(projectId) {
    $.ajax({
        dataType: 'json',
        url: ROOT + "Home/GetHubBasedOnProjectId",
        method: "get",
        data: { projectId: projectId },
        success: function (data) {
            var hubDrop = '';
            var PriousHub = $("#Hub").val();
            if (data.length > 0) {
                $("#Hub").html("");
                hubDrop += '<option  value="0">Select Hub</option>';

                for (var i = 0; i < data.length; i++) {
                    if (data[i].HubApproved === "1") {
                        hubDrop += '<option  data-bgcolor="#358375 !important;" class="approvedHub" value="' + data[i].HubId + '">' + data[i].HubName + '</option>';
                    } else if (data[i].HubApproved === "0" && data[i].HubSaved === "1") {
                        hubDrop += '<option  data-bgcolor="#db8c44 !important;" class="savedHub" value="' + data[i].HubId + '">' + data[i].HubName + '</option>';
                    } else {
                        hubDrop += '<option value="' + data[i].HubId + '">' + data[i].HubName + '</option>';
                    }
                }
                $("#Hub").html(hubDrop);
                $("#Hub").val(PriousHub);
                $('#Hub').select2({
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
        }
    });
}
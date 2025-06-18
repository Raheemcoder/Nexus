var latestProjectId = "";
var changedProjectId = "";
var templateId = "";
var latestRoleId = "";
var isSaveCancelled = 0;
var selectedResourcesId = 0;
var resourceListArray = [];
var projectHeaderArray = [];
var rolesDetailsArray = []
var rolesResourceDetailsArray = [];

$(document).ready(function () {

    var searchedId = $("#SearchedProjectId").val();

    if (searchedId == null || searchedId == "") {
        $(".prj-err").removeClass('hide');
        $(".role-resources-div").addClass('hide');
    }
    else {
        $(".prj-err").addClass('hide');
        $(".role-resources-div").removeClass('hide');
        $('#PRMProjectId').val(searchedId).change();
    }

    resourceListArray = $("#ResourcesList").val() ? JSON.parse(($("#ResourcesList").val())) : [];

    initializeAutocomplete();

});

function split(val) {
    return val.split(/,\s*/);
}

function extractLast(term) {
    return split(term).pop();
}

function initializeAutocomplete() {

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
                var matching = $.grep(resourceListArray, function (value) {
                    var name = value.ResourceName;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name })
                        cnt++
                    }
                    return matcher.test(name);
                });
                response(obj);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {

                var terms = split(this.value);
                terms.pop();
                var selectedTerm = ui.item.value;
                if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                    $(event.target).siblings('.already-selected').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
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
                        var lastWord = parts.pop();
                        if (lastWord.length > 0) {
                            validateResource(this);
                        }
                    }
                    else if (selectedResourcesId === 1) {
                        // this will handel over all span tag
                        $(event.target).siblings('span').addClass('hide');
                        validateResource(this);
                    }

                }
            },
            change: function (event, ui) {

                $(event.target).siblings('span').addClass('hide');
                validateResource(this);

            }
        });
}

function validateResource(obj) {

    var terms = split(obj.value);
    var validResources = [];
    var invalidResources = [];
    var duplicateResources = [];

    if (terms.length > 0) {
        terms.forEach(function (resource) {
            if (resource != null && resource != "") {
                var filteredResources = resourceListArray.filter(item => item.ResourceName.toLowerCase().trim() === resource.toLowerCase().trim());
                if (filteredResources.length > 0) {
                    if (validResources.includes(filteredResources[0].ResourceName) || isResourceAlreadySelected(filteredResources[0].ResourceName)) {
                        duplicateResources.push(filteredResources[0].ResourceName);
                    }
                    else {
                        validResources.push(filteredResources[0].ResourceName);
                    }
                }
                else {
                    invalidResources.push(resource);
                }
            }
        });

        if (validResources.length > 0) {
            validResources.push("");
            obj.value = validResources.join(", ");
        }

        if (invalidResources.length > 0) {
            obj.value = validResources.join(", ");
            $('.not-valid-user').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
        }

        if (duplicateResources.length > 0) {
            $('.already-selected').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
        }

    }

}

function isResourceAlreadySelected(resource) {
    var selectedRoleResources = rolesResourceDetailsArray.filter(item => item.RoleId == latestRoleId);
    if (selectedRoleResources.includes(resource)) {
        return true;
    }
    else {
        return false;
    }
}

$(document).on('change', '#PRMProjectId', function () {

    if (isSaveCancelled == 0) {

        changedProjectId = $(this).val();

        if (latestProjectId != "" && latestProjectId != null && latestProjectId != undefined) {

            if (changedProjectId != "" && changedProjectId != null && changedProjectId != undefined) {

                if (ValidateChangesDone()) {
                    UnsavedDataAlert("You have some unsaved data, Please save otherwise you will lose the data",
                        function () {
                            $("#save-prj").click();
                        },
                        function () {
                            latestProjectId = changedProjectId;
                            ChangedProjectDetail();
                        },
                    );
                }
                else {
                    latestProjectId = changedProjectId;
                    ChangedProjectDetail(); 
                }
            }
            else {

                if (ValidateChangesDone()) {
                    UnsavedDataAlert("You have some unsaved data, Please save otherwise you will lose the data",
                        function () {
                            $("#save-prj").click();
                        },
                        function () {
                            latestProjectId = changedProjectId;
                            $(".prj-err").removeClass('hide');
                            getData();
                            $(".role-resources-div").addClass('hide');
                        },
                    );
                }
                else {
                    latestProjectId = changedProjectId;
                    $(".prj-err").removeClass('hide');
                    getData();
                    $(".role-resources-div").addClass('hide');
                }

            }
        }
        else if (changedProjectId != "" && changedProjectId != null && changedProjectId != undefined) {
            latestProjectId = changedProjectId;
            $(".prj-err").addClass('hide');
            getData();
            $(".role-resources-div").removeClass('hide');
        }

    }
    else {
        isSaveCancelled = 0;
    }

});

function ChangedProjectDetail() {
    $(".prj-err").addClass('hide');
    getData();
    $(".role-resources-div").removeClass('hide');
}

$(document).on('click', '#refresh', function () {

    if (ValidateChangesDone()) {
        UnsavedDataAlert("You have some unsaved data, Please save otherwise you will lose the data",
            function () {
                $("#save-prj").click();
            },
            function () {
                $('#PRMProjectId').val('').change();
                latestProjectId = "";
                $(".prj-err").removeClass('hide');
                getData();
                $(".role-resources-div").addClass('hide');
            },
        );
    }
    else {
        $('#PRMProjectId').val('').change();
        latestProjectId = "";
        $(".prj-err").removeClass('hide');
        getData();
        $(".role-resources-div").addClass('hide');
    }

});

function AppendHeadersRolesResourcesToUI() {

    if (projectHeaderArray[0].TemplateName != "") {
        $("#prj-template-name").text(projectHeaderArray[0].TemplateName);
        $("#prj-budget").text(projectHeaderArray[0].PlannedBudget);
        $("#prj-duration").text(projectHeaderArray[0].AssignedDuration);
    }
    else {
        $("#prj-template-name").text('');
        $("#prj-budget").text('');
        $("#prj-duration").text('');
    }

    var htmlToAppend = `
        <ul class="nav nav-tabs tabs_initiation tabs_center project_resources_" role="tablist">
    `
    var isActiveAdded = false;
    rolesDetailsArray.forEach(function (item) {

        var isActive = isActiveAdded ? "" : (isActiveAdded = true, "active");

        htmlToAppend += `
         <li class="nav-item" onclick = switchRole(${item.RoleId},this)>
            <a class="nav-link ${isActive}">

                <div class="row">
                    <div class="col-auto">
                        <div class="form-group mb-0">
                            <span>Role Name : </span>
                            <span><strong>${item.RoleName}</strong></span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-auto">
                        <div class="form-group mb-0" style="text-align:left;">
                            <span>HOD : </span>
                            <span><strong>${item.HOD}</strong></span>
                        </div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-auto">
                        <div class="form-group mb-0">
                            <span>Duration : </span>
                            <span><strong>${item.RoleDuration}</strong></span>
                        </div>
                    </div>

                    <div class="col-auto">
                        <div class="form-group mb-0">
                            <span>Unit : </span>
                            <span><strong>${item.Unit}</strong></span>
                        </div>
                    </div>

                    <div class="col-auto">
                        <div class="form-group mb-0">
                            <span>Allocated Days : </span>
                            <span><strong class="allocated-days-text">${item.RoleAllocatedDuration}</strong></span>
                        </div>
                    </div>

                </div>

            </a>
        </li>
        `

        if (isActive == "active") {
            latestRoleId = item.RoleId;
        }

    });

    htmlToAppend += `
        </ul>
    `

    $(".roles-list").html(htmlToAppend);

    getRoleResourceGrid();
}

function getRoleResourceGrid() {

    var dataToJqgridArray = rolesResourceDetailsArray.filter(item => item.RoleId == latestRoleId);
    var roleHeaderDetails = rolesDetailsArray.filter(item => item.RoleId == latestRoleId);

    if (roleHeaderDetails.length > 0) {
        $("#role-budget").val(roleHeaderDetails[0].PlannedBudget);
        $("#role-duration").val(roleHeaderDetails[0].AssignedDuration);
        $("#role-allo-days").text(roleHeaderDetails[0].RoleAllocatedDuration);
    }
    else {
        $("#role-budget").val('');
        $("#role-duration").val('');
        $("#role-allo-days").text('');
    }

    LoadResourceGrid(dataToJqgridArray);

}

function switchRole(roleId, obj) {
    $('#role-resources').val('');
    $(obj).children('a').addClass('active');
    $(obj).siblings().children('a').removeClass('active');

    latestRoleId = roleId;
    getRoleResourceGrid();

}

colmodels = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        ignoreCase: true,
        width: 10,
        search: false,

        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex align-items-center justify-content-center" title="Delete">' +
                '<a class="btn-icon -delete"><i class="fas fa-trash text-danger" onclick="deleteResourceName(this)" title="Delete"></i></a>' +
                '</div>';
        }
    },
    {
        name: 'ResourceName',
        label: 'Resource Name',
        width: 80,
        resizable: true,
        ignoreCase: true,
        align: 'center',
        classes: "resource-name-td"
    },
    {
        name: 'Duration',
        label: 'Days',
        resizable: true,
        ignoreCase: true,
        width: 20,
        search: false,

        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center action_icons" title=""><input type="number" min="0" class="form-control duration-input" onkeydown="return DayValue(event)" onchange="addEditResourceDuration(this)" onpaste="handlePaste(event)" placeholder="Enter Days" value="' + cellvalue + '"></div>';
        }
    },
    {
        name: 'IsSaved',
        label: 'Days',
        resizable: true,
        ignoreCase: true,
        width: 1,
        search: false,
        hidden: true,
        classes: "isSaved-td"
    },
]

function MoneyValue(event) {
    const invalidChars = ["e", "E", "-", "+"];
    if (invalidChars.includes(event.key)) {
        return false;
    }
}

function DayValue(event) {
    const invalidChars = ["e", "E", "-", "+", "."];
    if (invalidChars.includes(event.key)) {
        return false;
    }
}

function handlePaste(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');
    if (/[^0-9]/.test(pastedData) || pastedData.includes('.')) {
        event.preventDefault();
        event.target.value = '';
        alert('Please enter a valid duration');
        return;
    }
}

function LoadResourceGrid(data) {

    $.jgrid.gridUnload('#role-resource-grid');

    $("#role-resource-grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#role-resource-grid-pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#role-resource-grid tbody tr");
            var objHeader = $("#role-resource-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#role-resource-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-280px + 100vh)' });
    $('#role-resource-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#role-resource-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#role-resource-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#role-resource-grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#role-resource-grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#role-resource-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}

function getData() {
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetProjectResoucesDetails",
        async: false,
        data: {
            ProjectId: latestProjectId
        },
        success: function (response) {
            if (response != null && response != undefined) {

                projectHeaderArray = response.ProjectHeaderData;
                rolesDetailsArray = response.ProjectRoleDataList;
                rolesResourceDetailsArray = response.ProjectRoleResourceDataList;

                rolesResourceDetailsArray = rolesResourceDetailsArray.map(roleResoruce => {
                    return { ...roleResoruce, IsSaved: 1 };
                });

                alreadySavedHeaderData = structuredClone(response.ProjectHeaderData);
                alreadySavedRoleData = structuredClone(response.ProjectRoleDataList);
                alreadySavedRolesResourceData = structuredClone(rolesResourceDetailsArray);

                templateId = projectHeaderArray[0].TemplateId;

                AppendHeadersRolesResourcesToUI();
            }
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

$(document).on('click', '.add-resources-to-grid', function () {

    var isReloadNeeded = false;
    var resourcesToAdd = split($("#role-resources").val());
    resourcesToAdd.pop();

    if (resourcesToAdd.length > 0) {
        resourcesToAdd.forEach(function (item) {

            var foundIndex = rolesResourceDetailsArray.findIndex(x => x.RoleId == latestRoleId &&
                (x.ResourceName).toLowerCase().trim() == item.toLowerCase().trim());

            if (foundIndex == -1) {
                rolesResourceDetailsArray.push({
                    RoleId: latestRoleId,
                    ResourceName: item.trim(),
                    Duration: "",
                    IsSaved: 0
                });
                isReloadNeeded = true;
            }
            else {
                $(".already-selected").removeClass('hide').delay(3000).queue(
                    function (next) {
                        $(this).addClass('hide');
                        next();
                    }
                );
            }
        });
    }
    else {
        $("#role-resources").siblings('span:first').removeClass('hide').delay(3000).queue(
            function (next) {
                $(this).addClass('hide');
                next();
            }
        );
    }

    if (isReloadNeeded) {
        getRoleResourceGrid();
    }

    $("#role-resources").val('');
});

function addEditRolePlannedBudget(obj) {

    var roleBudget = parseFloat($(obj).val());
    var roleObj = rolesDetailsArray.find(item => item.RoleId == latestRoleId);
    if (roleObj) {
        roleObj.PlannedBudget = roleBudget;
    }
    alterHeaderDetails(1);

}

function addEditRolePlannedDuration(obj) {

    var roleDuration = parseInt($(obj).val());
    var roleObj = rolesDetailsArray.find(item => item.RoleId == latestRoleId);
    if (roleObj) {
        roleObj.AssignedDuration = roleDuration;
    }
    alterHeaderDetails(2);

}

function addEditResourceDuration(obj) {

    var tr = $(obj).closest('tr');
    var resourceName = tr.find(".resource-name-td").text().trim();
    var duration = $(obj).val();

    var roleObj = rolesResourceDetailsArray.filter(item => item.RoleId == latestRoleId && item.ResourceName == resourceName)
    if (roleObj) {
        roleObj[0].Duration = duration;
    }

    alterAllocatedDays(duration, 1);
}

function alterAllocatedDays(duration, type,fromSaved = 0) {

    //type == 1 ---> add resource
    //type == 2 ---> delete resource
    // formSaved == 1 -----> then we need to remove the data from old array also

    var roleObj1 = rolesDetailsArray.find(item => item.RoleId == latestRoleId);

    // doing to avoid unnecessary alert to save the unsaved data
    var roleObj2 = alreadySavedRoleData.find(item => item.RoleId == latestRoleId);

    if (roleObj1 && type == 2) {
        roleObj1.RoleAllocatedDuration = roleObj1.RoleAllocatedDuration - duration;
        if (fromSaved == 1)
            roleObj2.RoleAllocatedDuration = roleObj1.RoleAllocatedDuration - duration;
    }
    else if (roleObj1 && type == 1) {

        var sum = 0;

        var roleObj2 = rolesResourceDetailsArray.filter(item => item.RoleId == latestRoleId)
        if (roleObj2 && roleObj2.length > 0) {
            roleObj2.forEach(function (item) {
                sum += item.Duration == "" ? 0 : parseInt(item.Duration);
            });
        }

        roleObj1.RoleAllocatedDuration = sum;
    }

    $(".nav-link.active").find(".allocated-days-text").text(roleObj1.RoleAllocatedDuration);

    $("#role-allo-days").text(roleObj1.RoleAllocatedDuration);

}

function alterHeaderDetails(type) {

    //type == 1 ---> budget
    //type == 2 ---> duration

    if (type == 1) {
        var totalPlannedBudget = 0;

        rolesDetailsArray.forEach(function (item) {
            totalPlannedBudget += isNaN(item.PlannedBudget) ? 0 : item.PlannedBudget;
        });

        projectHeaderArray[0].PlannedBudget = totalPlannedBudget;

        $("#prj-budget").text(totalPlannedBudget);
    }
    else {
        var totalAssignedDuration = 0;

        rolesDetailsArray.forEach(function (item) {
            totalAssignedDuration += isNaN(item.AssignedDuration) ? 0 : item.AssignedDuration;
        });

        projectHeaderArray[0].AssignedDuration = totalAssignedDuration;

        $("#prj-duration").text(totalAssignedDuration);
    }

}

function deleteResourceName(obj) {

    handelConfirmPopup('Are you sure do you want to Delete ?',
        function () {

            var isDeleted = false;
            var responseMsg = "";
            var responseMsgClass = "";

            var tr = $(obj).closest('tr');
            var resourceToDelete = tr.find(".resource-name-td").text().trim();
            var duration = tr.find(".duration-input").val();
            var isSaved = parseInt(tr.find(".isSaved-td").text());

            if (isSaved == 1) {
                $.ajax({
                    type: "POST",
                    url: ROOT + "NewProjectInitiation/DeleteProjectResourcesRoleResource",
                    dataType: "JSON",
                    data: {
                        ProjectId: latestProjectId,
                        RoleId: latestRoleId,
                        Resource: resourceToDelete
                    },
                    async: false,
                    success: function (result) {
                        responseMsgClass = result.MessageClass;
                        responseMsg = result.Message;

                        if (result.Message.toLowerCase().includes('success')) {
                            deleteResourceFromGrid();
                            alterAllocatedDays(duration, 2,1);
                        }
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });
            }
            else {
                responseMsg = "Resources deleted successfully";
                responseMsgClass = "alert-danger";
                deleteResourceFromGrid();
                alterAllocatedDays(duration, 2);
            }

            function deleteResourceFromGrid() {
                var foundIndex = rolesResourceDetailsArray.findIndex(x => x.RoleId == latestRoleId &&
                    (x.ResourceName).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());

                if (foundIndex !== -1) {
                    rolesResourceDetailsArray.splice(foundIndex, 1);
                    isDeleted = true;
                }

                if (isSaved == 1) {
                    var foundIndex = alreadySavedRolesResourceData.findIndex(x => x.RoleId == latestRoleId &&
                        (x.ResourceName).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());

                    if (foundIndex !== -1) {
                        alreadySavedRolesResourceData.splice(foundIndex, 1);
                        isDeleted = true;
                    }
                }
            }

            if (isDeleted) {
                getRoleResourceGrid();

                $("#response-message-div").html(

                    `<div class="alert ${responseMsgClass} alert-dismissible d-flex justify-content-between" role="alert" id="message_alert">
                        ${responseMsg}
                        </div>`

                );

                $("#response-message-div").removeClass('hide').delay(3000).queue(
                    function (next) {
                        $(this).addClass('hide');
                        next();
                    }
                );
            }
        }
    )

}

$(document).on('click', '#excel-download', function () {

    if (latestProjectId == "" || latestProjectId == null) {
        alert("Please select project");
    }
    else {
        window.location.href = ROOT + "NewProjectInitiation/GetProjectResourcesMasterExcelData?ProjectId=" + latestProjectId;
    }

});

function ValidateChangesDone() {
    
    if (parseInt($("#prj-duration").text().trim()) != projectHeaderArray[0].AssignedDuration) {
        return true;
    }

    if (parseFloat($("#prj-budget").text().trim()) != projectHeaderArray[0].PlannedBudget) {
        return true;
    }

    if (rolesResourceDetailsArray.length != alreadySavedRolesResourceData.length) {
        return true;
    }

    for (let i = 0; i < alreadySavedRoleData.length; i++) {
        if (!rolesDetailsArray.some(
            (
                item => item.RoleId === alreadySavedRoleData[i].RoleId &&
                    item.PlannedBudget == alreadySavedRoleData[i].PlannedBudget &&
                    item.RoleAllocatedDuration == alreadySavedRoleData[i].RoleAllocatedDuration &&
                    item.AssignedDuration == alreadySavedRoleData[i].AssignedDuration
            )
        )) {
            return true;
        }
    }

    for (let i = 0; i < alreadySavedRoleData.length; i++) {
        const savedRoleLength = alreadySavedRolesResourceData.filter(obj => obj.RoleId == alreadySavedRoleData[i].RoleId).length;
        const unSavedRoleLength = rolesResourceDetailsArray.filter(obj => obj.RoleId == alreadySavedRoleData[i].RoleId).length;
        if (savedRoleLength !== unSavedRoleLength) {
            return true;
        }
    }

    for (let i = 0; i < alreadySavedRoleData.length; i++) {

        const alreadySavedRoleResources = alreadySavedRolesResourceData.filter(obj => obj.RoleId == alreadySavedRoleData[i].RoleId)
            .map(resources1 =>
            ({
                name: resources1.ResourceName.trim(),
                duration: resources1.Duration
            })
            );

        const cameForSaveRoleResources = rolesResourceDetailsArray.filter(obj => obj.RoleId == alreadySavedRoleData[i].RoleId)
            .map(resources2 =>
            ({
                name: resources2.ResourceName.trim(),
                duration: resources2.Duration
            })
            );

        for (let j = 0; j < alreadySavedRoleResources.length; j++) {

            const alreadySavedResource = alreadySavedRoleResources[j];
            if (
                !(cameForSaveRoleResources.some(
                    item => item.name === alreadySavedResource.name &&
                        item.duration === alreadySavedResource.duration
                ))
            ) {
                return true;
            }
        }

    }

    return false;
}

$(document).on('click', '#save-prj', function () {

    if ((latestProjectId != "" && latestProjectId != null)) {
        var isSavable = false;

        if (ValidateChangesDone()) {
            isSavable = true;
        }
        else {
            alert('There is no changes to save');
            isSavable = false;
        }

        if (isSavable) {

            handelConfirmPopup("Are you sure you want to save the details ?",
                function () {

                    var concatedResource = "";
                    rolesDetailsArray.forEach(function (item1) {

                        rolesResourceDetailsArray.forEach(function (item2) {

                            if (item1.RoleId == item2.RoleId) {
                                concatedResource += item2.ResourceName + ', ';
                            }

                        });

                        if (concatedResource.endsWith(', ')) {
                            concatedResource = concatedResource.slice(0, -2);
                        }

                        rolesDetailsArray = rolesDetailsArray.map(array => {
                            if (array.RoleId == item1.RoleId) {
                                return { ...array, ConcatedResources: concatedResource };
                            }
                            return array;
                        });

                        concatedResource = "";

                    });

                    var roleDataToSave = JSON.stringify(rolesDetailsArray);
                    var roleResourceDataToSave = JSON.stringify(rolesResourceDetailsArray);

                    $.ajax({
                        url: ROOT + "NewProjectInitiation/InsertUpdateProjectResourceMasterDetails",
                        type: "POST",
                        data: {
                            RoleJsonData: roleDataToSave,
                            RoleResoruceJsonData: roleResourceDataToSave,
                            ProjectId: latestProjectId,
                            TemplateId: templateId
                        },
                        success: function (result) {
                            if (result.toLowerCase().includes('success')) {
                                window.location.href = ROOT + 'NewProjectInitiation/ProjectResourceMaster';
                            }
                            else {
                                alert(result);
                            }
                        },
                        error: function (xhr, status, error) {
                            alert("Error Occured: " + error);
                        }
                    });

                }
            );

            $(".confirm-cancel-btn").off("click").on("click", function () {
                isSaveCancelled = 1;
                $("#PRMProjectId").val(latestProjectId).change();

            });

        }
    }
    else {
        alert("Please select project");
    }
    
});

$(document).on('click', '.preview', function () {
    if ((latestProjectId != "" && latestProjectId != null)) {
        $(".project-name").text($('#PRMProjectId option:selected').text());
        $('.template-name').text(projectHeaderArray[0].TemplateName)

        var role = "";
        var tableHtml = ``;
        var arrayForPreview = [];
        rolesDetailsArray.forEach(function (item1) {
            var filterArray = rolesResourceDetailsArray.filter(item2 => item2.RoleId == item1.RoleId);
            if (filterArray.length > 0) {
                filterArray.forEach(function (item) {
                    arrayForPreview.push({
                        Role: item1.RoleName,
                        HOD: item1.HOD,
                        RoleTotalDuration: item1.AssignedDuration,
                        RoleTotalBudget: item1.PlannedBudget,
                        Resource: item.ResourceName,
                        Duration: item.Duration
                    });
                });
            }
            else {
                arrayForPreview.push({
                    Role: item1.RoleName,
                    HOD: item1.HOD,
                    RoleTotalDuration: item1.AssignedDuration,
                    RoleTotalBudget: item1.PlannedBudget,
                    Resource: '',
                    Duration: ''
                });
            }
        });

        arrayForPreview.sort((a, b) => a.Role.toLowerCase().localeCompare(b.Role.toLowerCase()));
        arrayForPreview.forEach(function (obj) {
            if (role == obj.Role) {
                tableHtml += `
                                <tr>
                                    <td class="tablewidth1"></td>
                                    <td class="tablewidth3"></td>
                                    <td class="tablewidth2"></td>
                                    <td class="tablewidth2"></td>
                                    <td class="tablewidth3">${obj.Resource}</td>
                                    <td class="tablewidth2">${obj.Duration}</td>
                                </tr>
                            `;
            }
            else {
                tableHtml += `
                                <tr>
                                    <td class="tablewidth1">${obj.Role}</td>
                                    <td class="tablewidth3">${obj.HOD}</td>
                                    <td class="tablewidth2">${obj.RoleTotalBudget}</td>
                                    <td class="tablewidth2">${obj.RoleTotalDuration}</td>
                                    <td class="tablewidth3">${obj.Resource}</td>
                                    <td class="tablewidth2">${obj.Duration}</td>
                                </tr>
                            `;
                role = obj.Role;
            }
        });

        tableHtml += ``

        $('.resource-preview-table-body').html(tableHtml);

        $("#preview-modal").modal("show");
    }
    else {
        alert("Please select project");
    }

});
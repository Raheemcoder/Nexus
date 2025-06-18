var projectId = "";

// Used for Role tabs and its manipulations
var latestRoleId = 0;
var latestRoleName = "";
var activeDepartments = [];
var latestSearchedDepartments = "";

// Used for Overall resouces mapped count, default users array and already saved mapped array
var countOfDepResources = 0;
var defaultResourceList = [];
var alreadySavedMappedResourceList = [];
var arrayForPreview = [];

// Used this Variable array for manipulation (add, edit, delete and save)
var mappedActiveResourceList = [];
var defaultMappedActiveResourceList = [];

$(document).ready(function () {

    projectId = $("#ProjectId").val();

    $('.multiselect-users').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });

    $("#header-dept").multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true,
    });

    $("#header-dept").multiselect('selectAll', false);
    $("#header-dept").multiselect('updateButtonText');

    latestRoleId = $("#active-role-id").val() ? parseInt($("#active-role-id").val()) : 0;
    latestRoleName = $("#active-role-name").val() ? ($("#active-role-name").val()) : "";
    countOfDepResources = $("#NoOfDepartmentResources").val() ? parseInt($("#NoOfDepartmentResources").val()) : 0;
    latestSearchedDepartments = $("#header-dept").val().join(',');

    GetUserDetails();

    GenerateMultiselectandJqgrid(latestRoleId);

});

function GenerateMultiselectandJqgrid(roleId) {

    // since defaultMappedActiveResourceList and mappedActiveResourceList can be manipulated while adding and deleting
    // using defaultResourceList

    var particularRoleDefaultResources = defaultResourceList.filter(item => item.RoleId == roleId);

    var particularRoleUnmappedResources = defaultMappedActiveResourceList.filter(item => item.RoleId == roleId);
    var particularRolemappedResources = mappedActiveResourceList.filter(item => item.RoleId == roleId);

    var gridResource = [];
    var optionResource = [];

    particularRoleDefaultResources.forEach(function (i) {

        // New (using 2 arrays since before saving also users can add and delete thats why (one is default other is for manipulation))
        if (countOfDepResources == 0) {

            var flag = particularRoleUnmappedResources.filter(item => item.RoleId == i.RoleId && item.Resource == i.Resource).length > 0 ? true : false;
            if (flag) {
                gridResource.push({
                    Resource: i.Resource
                });
            }
            else {
                optionResource.push({
                    Resource: i.Resource
                });
            }
        }

        // Already saved
        else if (countOfDepResources > 0) {

            var flag = particularRolemappedResources.filter(item => item.RoleId == i.RoleId && item.Resource == i.Resource).length > 0 ? true : false;
            if (flag) {
            }
            else {
                optionResource.push({
                    Resource: i.Resource,
                    IsBudgetRequested: i.IsBudgetRequested
                });
            }
        }

    });

    if (countOfDepResources > 0) {
        particularRolemappedResources.forEach(function (i) {
            gridResource.push({
                Resource: i.Resource,
                IsBudgetRequested: i.IsBudgetRequested
            });
        });
    }
    debugger;
    LoadResourceGrid(gridResource);

    var CategoryList = '';
    $("option").remove(".addOption");
    $.each(optionResource, function (i, obj) {
        if (obj != "") {
            CategoryList += '<option class="addOption" value="' + obj.Resource + '">' + obj.Resource + '</option>';
        }
    });
    $(".multiselect-users").html(CategoryList);
    $('.multiselect-users').multiselect('rebuild');

}

function switchRole(roleId, obj) {

    $(obj).children('a').addClass('active');
    $(obj).siblings().children('a').removeClass('active');

    latestRoleId = roleId;
    latestRoleName = activeDepartments.filter(item => item.RoleId == roleId).map(item => item.Role)[0];

    GenerateMultiselectandJqgrid(roleId);

}

function GetUserDetails() {

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetActiveDepartments",
        dataType: "JSON",
        async: false,
        data: {
            ProjectId: projectId,
            Departments: latestSearchedDepartments
        },
        success: function (result) {

            activeDepartments = result.DepartmentDetails;
            arrayForPreview = structuredClone(result.ActiveResourcePreview);

        },
    });

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetDepartmentUsers",
        dataType: "JSON",
        async: false,
        data: {
            ProjectId: projectId,
            Departments: latestSearchedDepartments
        },
        success: function (result) {
            debugger;
            alreadySavedMappedResourceList = structuredClone(result.DepartmentResources);
            defaultResourceList = structuredClone(result.DefaultResources);

            if (countOfDepResources == 0) {
                defaultMappedActiveResourceList = structuredClone(result.DefaultResources);
                defaultMappedActiveResourceList = defaultMappedActiveResourceList.map(roleResoruce => {
                    return { ...roleResoruce, IsSaved: 0 };
                });
            }
            else {
                mappedActiveResourceList = structuredClone(result.DepartmentResources);
                mappedActiveResourceList = mappedActiveResourceList.map(roleResoruce => {
                    return { ...roleResoruce, IsSaved: 1 };
                });
            }

        },
    });

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
            debugger;
            if (parseInt(rowobject.IsBudgetRequested) == 0) {
                return '<div class="d-flex align-items-center justify-content-center" title="Delete">' +
                    '<a class="btn-icon -delete"><i class="fas fa-trash text-danger" onclick="deleteResourceName(this)" title="Delete"></i></a>' +
                    '</div>';
            }
            else {
                return '';
            }
        }
    },
    {
        name: 'Resource',
        label: 'Resource Name',
        width: 90,
        resizable: true,
        ignoreCase: true,
        align: 'center',
        classes: "resource-name-td"
    }
]

function LoadResourceGrid(data) {

    $.jgrid.gridUnload('#resources-grid');

    $("#resources-grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#resources-grid-pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#resources-grid tbody tr");
            var objHeader = $("#resources-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#resources-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-280px + 100vh)' });
    $('#resources-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#resources-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#resources-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#resources-grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#resources-grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#resources-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}

function deleteResourceName(obj) {

    handelConfirmPopup('Are you sure do you want to Delete ?',
        function () {

            var isDeleted = false;
            var responseMsg = "";
            var responseMsgClass = "";

            var tr = $(obj).closest('tr');
            var resourceToDelete = tr.find(".resource-name-td").text().trim();

            if (countOfDepResources > 0) {

                var isResourceSaved = mappedActiveResourceList.filter(item => item.RoleId == latestRoleId && item.Resource == resourceToDelete).map(item => item.IsSaved)[0];

                if (isResourceSaved == 1) {
                    $.ajax({
                        type: "POST",
                        url: ROOT + "NewProjectInitiation/DeleteProjectDepartmentResource",
                        dataType: "JSON",
                        data: {
                            ProjectId: projectId,
                            RoleId: latestRoleId,
                            Resource: resourceToDelete
                        },
                        async: false,
                        success: function (result) {

                            responseMsgClass = result.MessageClass;
                            responseMsg = result.Message;

                            if (result.Message.toLowerCase().includes('success')) {

                                var foundIndex = mappedActiveResourceList.findIndex(x => x.RoleId == latestRoleId &&
                                    (x.Resource).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());
                                if (foundIndex !== -1) {
                                    mappedActiveResourceList.splice(foundIndex, 1);
                                    isDeleted = true;
                                }

                                var foundIndex = arrayForPreview.findIndex(x => x.RoleId == latestRoleId &&
                                    (x.Resource).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());
                                if (foundIndex !== -1) {
                                    arrayForPreview.splice(foundIndex, 1);
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                            alert("Error Occured: " + error);
                        }
                    });
                }
                else {
                    var foundIndex = mappedActiveResourceList.findIndex(x => x.RoleId == latestRoleId &&
                        (x.Resource).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());
                    if (foundIndex !== -1) {
                        mappedActiveResourceList.splice(foundIndex, 1);
                        isDeleted = true;
                        responseMsgClass = "alert-success";
                        responseMsg = "Resource deleted successfully";
                    }

                    var foundIndex = arrayForPreview.findIndex(x => x.RoleId == latestRoleId &&
                        (x.Resource).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());
                    if (foundIndex !== -1) {
                        arrayForPreview.splice(foundIndex, 1);
                    }
                }

            }
            else {
                var foundIndex = defaultMappedActiveResourceList.findIndex(x => x.RoleId == latestRoleId &&
                    (x.Resource).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());
                if (foundIndex !== -1) {
                    defaultMappedActiveResourceList.splice(foundIndex, 1);
                    isDeleted = true;
                    responseMsgClass = "alert-success";
                    responseMsg = "Resource deleted successfully";
                }

                var foundIndex = arrayForPreview.findIndex(x => x.RoleId == latestRoleId &&
                    (x.Resource).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());
                if (foundIndex !== -1) {
                    arrayForPreview.splice(foundIndex, 1);
                }
            }

            if (isDeleted) {

                countOfDepResources--;

                var foundIndex = alreadySavedMappedResourceList.findIndex(x => x.RoleId == latestRoleId &&
                    (x.Resource).toLowerCase().trim() == resourceToDelete.toLowerCase().trim());
                if (foundIndex !== -1) {
                    alreadySavedMappedResourceList.splice(foundIndex, 1);
                }

                GenerateMultiselectandJqgrid(latestRoleId);

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

$(document).on('click', '.addResourceName', function () {

    var isReloadNeeded = false;

    var resourcesToAdd = $(".multiselect-users").val();
    if (resourcesToAdd.length > 0) {
        resourcesToAdd.forEach(function (item) {

            var hod = defaultResourceList.filter(x => x.RoleId == latestRoleId).map(item => item.HOD)[0];

            if (countOfDepResources == 0) {

                var foundIndex = defaultMappedActiveResourceList.findIndex(x => x.RoleId == latestRoleId &&
                    (x.Resource).toLowerCase().trim() == item.toLowerCase().trim());

                if (foundIndex == -1) {
                    defaultMappedActiveResourceList.push({
                        RoleId: latestRoleId,
                        Role: latestRoleName,
                        Resource: item.trim(),
                        IsSaved: 0,
                        IsConfirmed: 0,
                        IsBudgetRequested:0,
                        HOD: hod
                    });
                    arrayForPreview.push({
                        RoleId: latestRoleId,
                        Role: latestRoleName,
                        Resource: item.trim(),
                        IsMailSent: 0,
                        IsConfirmed: 0,
                        IsBudgetRequested: 0,
                        HOD: hod
                    });
                    isReloadNeeded = true;
                }
                else {
                    $(".resource-exists").removeClass('hide').delay(3000).queue(
                        function (next) {
                            $(this).addClass('hide');
                            next();
                        }
                    );
                }

            }
            else {

                var foundIndex = mappedActiveResourceList.findIndex(x => x.RoleId == latestRoleId &&
                    (x.Resource).toLowerCase().trim() == item.toLowerCase().trim());

                if (foundIndex == -1) {
                    mappedActiveResourceList.push({
                        RoleId: latestRoleId,
                        Role: latestRoleName,
                        Resource: item.trim(),
                        IsSaved: 0,
                        IsConfirmed: 0,
                        IsBudgetRequested: 0,
                        HOD: hod
                    });
                    arrayForPreview.push({
                        RoleId: latestRoleId,
                        Role: latestRoleName,
                        Resource: item.trim(),
                        IsMailSent: 0,
                        IsConfirmed: 0,
                        IsBudgetRequested: 0,
                        HOD: hod
                    });
                    isReloadNeeded = true;
                }
                else {
                    $(".resource-exists").removeClass('hide').delay(3000).queue(
                        function (next) {
                            $(this).addClass('hide');
                            next();
                        }
                    );
                }

            }
        });

        if (isReloadNeeded) {
            GenerateMultiselectandJqgrid(latestRoleId);
        }
    }
    else {
        $(".multiselect-users").siblings('span:first').removeClass('hide').delay(3000).queue(
            function (next) {
                $(this).addClass('hide');
                next();
            }
        );
    }

});

$(document).on('click', '#save-draft-Button,#save-con-Button', function () {

    var isSavable = false;

    if (countOfDepResources > 0) {

        var anyThingToConfirm = mappedActiveResourceList.filter(o => o.IsConfirmed == 0).length > 0 ? true : false;

        if (ValidateChangesDone() || anyThingToConfirm) {
            isSavable = true;
        }
        else {
            alert('There is no changes to save');
            isSavable = false;
        }

    }
    else if (countOfDepResources == 0) {
        isSavable = true;
    }

    if (isSavable) {

        var typeOfSave = 0;
        var msg = "";

        if ($(this).is('#save-draft-Button')) {
            typeOfSave = 1;
            msg = "Are you sure you want to save the details?";
        }
        else if ($(this).is('#save-con-Button')) {
            typeOfSave = 2;
            msg = "Are you sure you want to save and confirm the details?";
        }

        handelConfirmPopup(msg,

            function () {

                var dataToSave = countOfDepResources == 0 ? JSON.stringify(defaultMappedActiveResourceList) : JSON.stringify(mappedActiveResourceList);

                $.ajax({
                    url: ROOT + "NewProjectInitiation/InsertUpdateDBUMappingDetails",
                    type: "POST",
                    data: {
                        JsonData: dataToSave,
                        ProjectId: projectId,
                        Type: typeOfSave
                    },
                    success: function (result) {
                        if (result.toLowerCase().includes('success')) {
                            window.location.href = ROOT + 'NewProjectInitiation/DepartmentBudgetUserMappings?q=' + Encrypt('ProjectId=' + projectId);
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
        )
    }

});

$(document).on('click', '#excel-download', function () {

    if (projectId == "" || projectId == null) {
        alert("Please select Project");
    }
    else {
        window.location.href = ROOT + `NewProjectInitiation/GetDBUMappingsExcelData?ProjectId=${projectId}&DepartmentId=${latestSearchedDepartments}`;
    }

});

$(document).on('click', '.preview', function () {

    var role = "";
    var tableHtml = ``;
    var roleFilter = $('#roleFilter').val().toLowerCase();
    var resourceFilter = $('#resourceFilter').val().toLowerCase();

    if (countOfDepResources > 0) {
        role = "";
        arrayForPreview.sort((a, b) => a.Role.toLowerCase().localeCompare(b.Role.toLowerCase()));
        arrayForPreview.forEach(function (obj) {

            let textStyle = obj.IsMailSent == 1 ? 'style="color: green;"' : '';
            const hodNames = obj.HOD ? obj.HOD.split(',').map(hod => hod.trim()) : [];
            const resourceWithHod = hodNames.includes(obj.Resource)
                ? `${obj.Resource}<b> [HOD]</span>`
                : obj.Resource;
            if ((roleFilter === "" || obj.Role.toLowerCase().includes(roleFilter)) &&
                (resourceFilter === "" || obj.Resource.toLowerCase().includes(resourceFilter))) {

                if (role == obj.Role) {
                    tableHtml +=
                        `<tr>
                            <td class="tablewidth1 text-center"></td>
                            <td ${textStyle} class="text-center">${resourceWithHod}</td>
                        </tr>`;
                } else {
                    tableHtml +=
                        `<tr>
                            <td class="tablewidth1 text-center">${obj.Role}</td>
                            <td ${textStyle} class="text-center">${resourceWithHod}</td>
                        </tr>`;
                    role = obj.Role;
                }
            }
        });
    }
    else if (countOfDepResources == 0) {
        defaultMappedActiveResourceList.sort((a, b) => a.Role.toLowerCase().localeCompare(b.Role.toLowerCase()));
        role = "";
        defaultMappedActiveResourceList.forEach(function (obj) {
            // Apply the filter conditions
            if ((roleFilter === "" || obj.Role.toLowerCase().includes(roleFilter)) &&
                (resourceFilter === "" || obj.Resource.toLowerCase().includes(resourceFilter))) {

                if (role == obj.Role) {
                    tableHtml += `
                                    <tr>
                                        <td class="tablewidth1 text-center"></td>
                                        <td class="text-center">${obj.Resource}</td>
                                    </tr>`;
                } else {
                    tableHtml += `
                                    <tr>
                                        <td class="tablewidth1 text-center">${obj.Role}</td>
                                        <td class="text-center">${obj.Resource}</td>
                                    </tr>`;
                    role = obj.Role;
                }
            }
        });
    }
    $('.resource-preview-table-body').html(tableHtml);
    $("#preview-modal").modal("show");
});
$('#roleFilter, #resourceFilter').on('input', function () {
    $('.preview').trigger('click');
});
$('#preview-modal').on('hidden.bs.modal', function () {
    $('#roleFilter').val('')
    $('#resourceFilter').val('')

});


function NavigateToList() {
    if (ValidateChangesDone()) {
        UnsavedDataAlert("You have some unsaved Data, Please save as draft otherwise you will lose the data",
            function () {
                $("#save-draft-Button").click();
            },
            function () {
                window.location.href = ROOT + 'NewProjectInitiation/ProjectInitiationList';
            },
        );
    }
    else {
        window.location.href = ROOT + 'NewProjectInitiation/ProjectInitiationList';
    }
}

function ValidateChangesDone() {

    var distinctRoleAlreadySaved = [];
    var distinctRoleCameForSave = [];

    // 0. checking (array for save and array default) - both array length
    if (countOfDepResources == 0) {
        if (defaultResourceList.length != defaultMappedActiveResourceList.length) {
            return true;
        }
    }

    // 1: checking (array for save and array already saved) - both array length
    if (alreadySavedMappedResourceList.length != mappedActiveResourceList.length) {
        return true;
    }

    alreadySavedMappedResourceList.forEach(function (item) {
        if (!distinctRoleAlreadySaved.some(role => role.RoleId === item.RoleId)) {
            distinctRoleAlreadySaved.push({
                RoleId: item.RoleId
            });
        }
    });

    mappedActiveResourceList.forEach(function (item) {
        if (!distinctRoleCameForSave.some(role => role.RoleId === item.RoleId)) {
            distinctRoleCameForSave.push({
                RoleId: item.RoleId
            });
        }
    });


    // 2: checking (array for save and array already saved)'s distinct role array's length
    if (distinctRoleAlreadySaved.length != distinctRoleCameForSave.length) {
        return true;
    }

    // 3: checking (array for save and array already saved)'s distinct role array's individual roleids are same
    for (let i = 0; i < distinctRoleAlreadySaved.length; i++) {
        if (!distinctRoleCameForSave.some(role => role.RoleId === distinctRoleAlreadySaved[i].RoleId)) {
            return true;
        }
    }

    // 4: checking (array for save and array already saved) both array individual roles resources length
    for (let i = 0; i < distinctRoleAlreadySaved.length; i++) {
        const alreadySavedRoleResourcesLength = alreadySavedMappedResourceList.filter(obj1 => obj1.RoleId == distinctRoleAlreadySaved[i].RoleId).length;
        const cameForSaveRoleResourcesLength = mappedActiveResourceList.filter(obj1 => obj1.RoleId == distinctRoleAlreadySaved[i].RoleId).length;
        if (alreadySavedRoleResourcesLength !== cameForSaveRoleResourcesLength) {
            return true;
        }
    }

    // 5: checking (array for save and array already saved) both array individual roles resources are same
    for (let i = 0; i < distinctRoleAlreadySaved.length; i++) {

        const alreadySavedRoleResources = alreadySavedMappedResourceList.filter(obj1 => obj1.RoleId == distinctRoleAlreadySaved[i].RoleId)
            .map(resources1 => resources1.Resource.trim());
        const cameForSaveRoleResources = mappedActiveResourceList.filter(obj1 => obj1.RoleId == distinctRoleAlreadySaved[i].RoleId)
            .map(resources2 => resources2.Resource.trim());

        for (let j = 0; j < alreadySavedRoleResources.length; j++) {
            if (!cameForSaveRoleResources.some(resourceName2 => resourceName2 === alreadySavedRoleResources[j])) {
                return true;
            }
        }
    }

    return false;
}

$(document).on('click', '#search-btn', function () {

    var departments = $("#header-dept").val().join(',');

    if (ValidateChangesDone()) {
        UnsavedDataAlert("You have some unsaved Data, Please save as draft otherwise you will lose the data",
            function () {
                $("#save-draft-Button").click();
            },
            function () {
                $("#header-dept").val(latestSearchedDepartments.split(','));
                $("#header-dept").change();
                if (departments != latestSearchedDepartments) {
                    if (departments != "" && departments != null && departments != undefined) {
                        latestSearchedDepartments = departments;
                        GetUserDetails();
                        AppendRolesResourcesToUI();
                    }
                    else {
                        alert("Please select departments to search");
                    }
                }
            },
        );
    }
    else {
        if (departments != latestSearchedDepartments) {
            if (departments != "" && departments != null && departments != undefined) {
                latestSearchedDepartments = departments;
                GetUserDetails();
                AppendRolesResourcesToUI();
            }
            else {
                alert("Please select departments to search");
            }
        }
    }
});

function AppendRolesResourcesToUI() {

    var isActiveAdded = false;

    var htmlToAppend = "";

    activeDepartments.forEach(function (item) {

        var isActive = isActiveAdded ? "" : (isActiveAdded = true, "active");

        htmlToAppend += `
         <li class="nav-item" onclick = switchRole(${item.RoleId},this)>
            <a class="nav-link ${isActive}">

                <div class="row">
                    <div class="col-auto">
                        <div class="form-group mb-0">
                            <span>Department Name : </span>
                            <span><strong>${item.Role}</strong></span>
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

            </a>
        </li>
        `

        if (isActive == "active") {
            latestRoleId = item.RoleId;
            latestRoleName = item.Role;
        }

    });

    $(".roles-list").html(htmlToAppend);

    GenerateMultiselectandJqgrid(latestRoleId);
}
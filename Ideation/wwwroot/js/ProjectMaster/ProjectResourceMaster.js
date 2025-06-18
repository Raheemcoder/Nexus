var capturedProjectId;
var capturedRole;
var capturedAllocatedDays;
var capturedDuration;
var ValidateDataToSave = [];
var gridBindflag = true;
var selectedValues = [];
var availableTagsdataid = [];
var plannedBudget;
var validatePlannedBudgetToSave;
let targetArray = [];
var Role;
var Duration;
var AllocatedDays;
var isSaved = false;
var isDeleted = false;
var clickedProjectId;


//-------------------------------------- Handeling the Search-------------------------------------------------------------------------------------------------------------

$('#SearchPRMData').on('click', function () {
    if (targetArray.length == 0) {
        ValidateDataToSave = [];
        targetArray = [];
        Duration = '';
        capturedDuration = '';
        isSaved = true;
    }
    var projectId = $("#PRMProjectId").val();
    if (projectId != clickedProjectId) {
        capturedRole = '';
        capturedProjectId = undefined;
        targetArray = [];

    }
    clickedProjectId = projectId;
    if (projectId == "" || projectId == "Select ProjectId") {

        /*$("#alertEmptyProjectIdSearch").modal('show');*/
        openEmptyAlert("Please Select a ProjectId");

    }
    else {
        let firstSpaceIndex = projectId.indexOf(" ");
        if (firstSpaceIndex != -1) {
            projectId = projectId.substr(0, firstSpaceIndex);
        }

        $('#loader').show();
        $('#loader').css('visibility', 'visible');
        $.ajax({
            type: "POST",
            url: ROOT + "ProjectMaster/GetResourceMasterHeaderData",
            data: {
                ProjectId: projectId,
            },
            success: function (response) {
                var responseData = JSON.parse(response);

                var templateDataArray = responseData.TemplateData;
                var resourceDataArray = responseData.ResourceData;



                if (templateDataArray.length > 0) {
                    $('.template_name').text(templateDataArray[0].TemplateName);
                    $('.duration').text(templateDataArray[0].Duration);
                    var plannedBudget = templateDataArray[0].PlannedBudget;
                    var formattedBudget = plannedBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 });
                    $('.plannedbudget').text(formattedBudget);
                }

                const tabcontentdiv = document.getElementById('v-pills-tabContent');
                const tabdiv = document.getElementById('v-pills-tab');
                const tabbuttondiv = document.createElement('div');
                tabbuttondiv.style.width = '100%';
                tabbuttondiv.style.maxHeight = '400px';
                tabbuttondiv.style.overflowY = 'auto';
                while (tabdiv.children[1]) {
                    tabdiv.removeChild(tabdiv.children[1]);
                }

                while (tabcontentdiv.firstChild) {
                    tabcontentdiv.removeChild(tabcontentdiv.firstChild);
                }

                for (let index = 0; index < resourceDataArray.length; index++) {

                    if (resourceDataArray[index].HODName == undefined) {
                        resourceDataArray[index].HODName = ''
                    }

                    const button = document.createElement('button');
                    button.style.width = '100%';
                    button.classList.add('nav-link', 'dynamic-button');
                    button.setAttribute('id', `v-pills-tab-${index}`);
                    button.setAttribute('data-bs-toggle', 'pill');
                    button.setAttribute('data-bs-target', `#v-pills-${index}`);
                    button.setAttribute('type', 'button');
                    button.setAttribute('role', 'tab');
                    button.setAttribute('aria-controls', `v-pills-${index}`);
                    button.setAttribute('aria-selected', 'false');
                    button.setAttribute('data-projectid', projectId);

                    button.innerHTML = `
                    <div class="row" style="row-gap:0px;"  id="roleInfoContainer">
                        <div class="col-auto">
                            <div class="form-group mb-0">
                                <span>Role Name : </span>
                                <span><strong>${resourceDataArray[index].Role}</strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <div class="form-group mb-0" style='text-align:left;'>
                                <span>HOD : <b>${resourceDataArray[index].HODName}</b></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <div class="form-group mb-0" >
                                <span>Duration : </span>
                                <span><strong>${resourceDataArray[index].Duration}</strong></span>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="form-group mb-0">
                                <span>Unit : </span>
                                <span><strong>${resourceDataArray[index].Unit}</strong></span>
                            </div>
                        </div>
                         <div class="col-auto">
                            <div class="form-group mb-0">
                                <span>Allocated Days : </span>
                                <span class="highlightAllocatedDays" style="padding:5px"><strong>${resourceDataArray[index].AllocatedDays}</strong></span>
                            </div>
                        </div>
                    </div>
                `;
                    // Code for Search input filtering Based on RoleName,Duration,Hod
                    $('.ser').on('input', function () {
                        var searchText = $(this).val().toLowerCase();

                        $('.dynamic-button').each(function () {
                            var roleName = $(this).find('.form-group:nth-child(1)').text().toLowerCase();
                            var hodName = $(this).find('.form-group:nth-child(2)').text().toLowerCase();
                            var duration = $(this).find('.form-group:nth-child(4)').text().toLowerCase();
                            var actualDays = $(this).find('.form-group:nth-child(6)').text().toLowerCase();

                            var buttonValues = roleName + ' ' + hodName + ' ' + duration + ' ' + actualDays;

                            if (buttonValues.indexOf(searchText) > -1) {
                                $(this).show();
                            } else {
                                $(this).hide();
                            }
                        });
                    });



                    //button.addEventListener('click', function () { getResourceData(projectId, resourceDataArray[index].Role); });

                    button.addEventListener('click', function () {
                        capturedProjectId = projectId;
                        Role = capturedRole;
                        AllocatedDays = capturedAllocatedDays;
                        capturedRole = resourceDataArray[index].Role;
                        capturedAllocatedDays = resourceDataArray[index].AllocatedDays;

                        getResourceData(capturedProjectId, capturedRole);
                    });


                    tabbuttondiv.appendChild(button);

                }
                tabdiv.appendChild(tabbuttondiv);
                const firstButton = tabbuttondiv.querySelector('.dynamic-button');

                if (firstButton && capturedProjectId == undefined && (capturedRole == undefined || capturedRole == "")) {
                    firstButton.click();
                }
                else {
                    const buttons = tabbuttondiv.querySelectorAll('.dynamic-button');

                    for (const button of buttons) {
                        const roleNameElement = button.querySelector('.form-group:nth-child(1) strong');
                        const roleName = roleNameElement ? roleNameElement.textContent.trim() : '';

                        if (roleName === capturedRole) {
                            button.click();
                            break;
                        }
                    }
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
});

//------------------------------------code to post tabdata to backend and get the response and add jqgrid dynamically--------------------------------------------------------

function getResourceData(projectId, roleName) {
    console.log(ValidateDataToSave);
    if ((!validateDatafunction(SaveResourcesData()) || !validatePlannedBudgetfunction() || !validateDurationfunction()) && !isSaved && !isDeleted) {
        var dataToSave = [];
        var projectId = $("#PRMProjectId").val();
        let firstSpaceIndexes = projectId.indexOf(" ");

        if (firstSpaceIndexes != -1) {
            projectId = projectId.substr(0, firstSpaceIndexes);
        }
        var dataToSave = SaveResourcesData();
        for (i = 0; i < dataToSave.length; i++) {
            if (dataToSave[i].days === 0) {
                flag = true;
                break;
            }
        }
        //if (flag == true && !validateDatafunction(SaveResourcesData())) {
        //    plannedBudget = $("#PlannedBudget").val();
        //    var keyValuePB = labelElement.textContent;
        //    var keyValue = dataToSave.keyValue;
        //    let existingIndex = -1;
        //    for (let i = 0; i < targetArray.length; i++) {
        //        if (targetArray[i].keyValuePB === keyValuePB) {
        //            existingIndex = i;
        //            break; // Stop the loop if a match is found
        //        }
        //    }
        //    if (dataToSave != null) {
        //        const newObject = {
        //            dataToSave: JSON.stringify(dataToSave),
        //            plannedBudget: plannedBudget,
        //            keyValuePB: keyValuePB,
        //            allocatedDays: AllocatedDays,
        //            duration: Duration,
        //            Role: Role
        //        };
        //        if (existingIndex !== -1) {
        //            targetArray.splice(existingIndex, 1); // Remove the entire object
        //        }
        //        targetArray.push(newObject);
        //    }
        //    $('#loader').show();
        //    $('#loader').css('visibility', 'visible');

        //}

        // else {


        var dataToSave = SaveResourcesData();
        plannedBudget = $("#PlannedBudget").val();
        Duration = $("#Duration").val();
        var keyValuePB = labelElement.textContent;
        var keyValue = dataToSave.keyValue;
        let existingIndex = -1;
        for (let i = 0; i < targetArray.length; i++) {
            if (targetArray[i].keyValuePB === keyValuePB) {
                existingIndex = i;
                break; // Stop the loop if a match is found
            }
        }
        if (dataToSave != null) {
            const newObject = {
                dataToSave: JSON.stringify(dataToSave),
                plannedBudget: plannedBudget,
                keyValuePB: keyValuePB,
                allocatedDays: AllocatedDays,
                duration: Duration,
                Role: Role,
                projectId: projectId
            };
            if (existingIndex !== -1) {
                targetArray.splice(existingIndex, 1); // Remove the entire object
            }
            targetArray.push(newObject);
        }
        //$('#loader').show();
        //$('#loader').css('visibility', 'visible');


        //}
    }








    //----------------------------------------------------------------------------------------------------- rightside -----------------//

    let firstSpaceIndex = projectId.indexOf(" ");
    if (firstSpaceIndex != -1) {
        projectId = projectId.substr(0, firstSpaceIndex);
    }
    var matchingObject = null;

    for (let i = 0; i < targetArray.length; i++) {
        if (targetArray[i].Role === roleName) {
            matchingObject = targetArray[i];
            break;
        }
    }
    $(document).ready(function () {

        if (matchingObject !== null) {
            console.log("Matching Object:", matchingObject);
            var ProjectElementArray = [{
                PlannedBudget: matchingObject.plannedBudget,
                KeyValue: matchingObject.keyValuePB,
                AllocatedDays: matchingObject.allocatedDays,
                Duration: matchingObject.duration,
                Role: matchingObject.Role
            }]

            var AddedResourceArray = JSON.parse(matchingObject.dataToSave);
            console.log('AddedResourceArray', AddedResourceArray);
            //var ProjectElementArray = responseData.ResourceData;

            removeScriptTags();
            $(".tabdetails").remove();

            for (var index = 0; index < ProjectElementArray.length; index++) {
                var tabId = "v-pills-tabpanel-" + index;
                var gridId = "ResourceMaster-jqgrid-" + index;
                var pagerId = "ResourceMaster-jqgrid-pager-" + index;

                var filteredResources = FilterResourcesName(ProjectElementArray[index].ProjectElement);
                function FilterResourcesName(ProjectElement) {
                    var filteredResources = AddedResourceArray.filter(function (value) {
                        return value.ProjectElement === ProjectElement;
                    });

                    return filteredResources;
                }

                var data = JSON.stringify(filteredResources)

                //Creating the tab content HTML
                var tabContent = `
                                <div class="tabdetails" id="${tabId}" role="tabpanel" aria-labelledby="${tabId}">
                                    <div class="row">
                                         <div class="row mt-0" style='display:flex;justify-content:center;'>
                                           <div class="col-md-3 mt-3" style='padding:0;width:25%'> 
                                                <div class="form-group mb-0 ">
                                                    <div class="demo-content">
                                                        <input id="tags_" class="form-control tags autocomplete-tags appendValue${index}" placeholder="Select Resources" >
                                                        <span class="Err_addResourceName${index}" style="display:none;color:red;">Please select the Resource</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-1 mt-3" style='width:5%;;padding:0 0 0 5px'>
                                                <div class="form-group mb-0 ">
                                                    <button type="button"  title="Add" class="btn-add ex_bt excel_btn addResourceName${index}"><i class="fas fa-plus ex_download"  title="Add"  aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                           <div style='display:flex;flex-direction:column;width:19%;padding:0;margin-left:15px'>
                                            <div class="col-auto">
                                                <div class="form-group mb-0 ">
                                                    <label class="control-label">
                                                        Planned Budget (INR)
                                                    </label>
                                                </div>
                                            </div>
                                             <div class="col-md-2" style='width:75%'>
                                                <div class="form-group mb-0" style="position: relative;">
                                                    <input type="number" class="form-control mt-0" id="PlannedBudget" oninput="validateInput(this)"
                                                    value="${ProjectElementArray[index].PlannedBudget}">
                                                </div>
                                            </div>
                                            </div>
                                            <div style='display:flex;flex-direction:column;width:14%;padding:0;margin-left:15px'>
                                                <div class="col-auto">
                                                <div class="form-group  mb-0 ">
                                                    <label class="control-label">
                                                        Duration in Days
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-2" style='width:75%'>
                                                <div class="form-group  mb-0">
                                                    <input type="number" class="form-control mt-0 "  id="Duration" value="${ProjectElementArray[index].Duration}"
                                                    oninput="validateNegativeInput(this)"/>
                                                </div>
                                            </div>
                                            </div>
                                           
                                            <div style='display:flex;flex-direction:column;width:15%;padding:0;margin-left:15px'>
                                                <div class="col-auto">
                                                <div class="form-group  mb-0 ">
                                                    <label class="control-label">
                                                        Allocated Days
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-1" style='width:20%;padding:0'>
                                                <div class="form-group mt-1  mb-0 highlightAllocatedDays">
                                                    <label class="control-label mt-0"><strong>${ProjectElementArray[index].AllocatedDays}</strong></label>
                                                </div>
                                            </div>
                                           </div>
                                           <div style='display:flex;flex-direction:column;width:15%;padding:0;'>
                                            <div class="col-auto">
                                                <div class="form-group mb-0 ">
                                                    <label class="control-label">
                                                        Planned Manpower
                                                    </label><strong></strong>
                                                </div>
                                            </div>               
                                             <div class="col-md-2" style='width:75%'>
                                                <div class="form-group mb-0" style="position: relative;">
                                                    <input type="number" class="form-control mt-0" id="PlannedBudget" oninput="validateInput(this)" readonly>
                                                </div>
                                            </div></div>
                                        </div>
                                        </div>
                                        <lable style='display:none' class='SaveKeyValue' id='keyvalue-${index}'>${ProjectElementArray[index].KeyValue}</lable>
                                        <div class="add_grid__">
                                            <div class="m-table__main mt-2 mb-2">
                                                <div class="m-table__responsive -virtual-scroll">
                                                    <table id="${gridId}"></table>
                                                    <div id="${pagerId}"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `;


                // Append the tab content to the tabs container
                $(".tab-content").append(tabContent);

                // creating the jqgrid script tag
                var scriptTag = document.createElement("script");
                scriptTag.setAttribute("data-dynamic-script", "true");
                scriptTag.textContent = `
                    var colmodels_${index} = [
                        {
                            name: 'ResourceName',
                            label: 'Resource Name',
                            ignoreCase: true,
                            width: 380,

                        },
                         {
                            name: 'KeyValue',
                            label: 'Key Value',
                            ignoreCase: true,
                            hidden: true,
                            width: 40,
                        },
                        {
                            name: 'Days',
                            label: 'Days',
                            ignoreCase: true,
                            search: false,
                            width: 60,
                            
                            formatter: function (cellvalue, options, rowobject) {
                            if (cellvalue === 0) {
                                return '<div class="demo-content days_input" ><input type="number" oninput="preventMinusInput(event)" min="1" class="form-control days" value="" ></div>';
                            } else {
                                return '<div class="demo-content days_input" ><input type="number" oninput="preventMinusInput(event)" min="1"  class="form-control days" value="' + cellvalue + '"></div>';
                            }
                           


                             
                            
                        }                    
                        },
                        {
                            name: 'Action',
                            label: 'Action',
                            width: 50,
                            search: false,
                            resizable: true,
                            ignoreCase: true,
                            formatter: function (cellvalue, options, rowobject) {

                                return '<div class="justify-center_" style="justify-content: space-around;">' +
                                            '<a class="btn-icon -delete"><i class="fas fa-trash" id="DeleteResource" title="Delete"></i></a>' +
                                            '</div>'
                            }
                        },
                    ];

                    $('#'+'${gridId}').jqGrid({
                    url: '',
                    datatype: 'local',
                    data: ${data},
                    mtype: 'GET',
                    colModel: colmodels_${index},
                    loadonce: true,
                    rowNum: 20,
                    scroll: 1,

                    gridComplete: function () {
                        var objRows = $("${gridId} tbody tr");
                        var objHeader = $("${gridId} tbody tr td");

                        if (objRows.length > 1) {
                            var objFirstRowColumns = $(objRows[1]).children("td");
                            for (i = 0; i < objFirstRowColumns.length; i++) {
                                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                            }
                        }

                    }
                    });
                    $('#'+'${gridId}').jqGrid('filterToolbar', {
                        autosearch: true,
                        stringResult: false,
                        searchOnEnter: false,
                        defaultSearch: "cn"
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
                             
                    $(".addResourceName${index}").click(function () {

                        var newResource = $.trim($('.appendValue${index}').val());
                        newResource = newResource.replace(/^,|,$/g, '');
                         var selectednamearray=newResource.split(',');
                            
                          var gridBindflag = true; 

                            for (var i = 0; i < selectednamearray.length; i++) {
                              var element = selectednamearray[i];
                              var index = $.inArray(element, availableTagsdataid);
  
                              if (index !== -1) {
                                //alert(element + ' exists');
                              } else if(element.Length>0) {
                                openEmptyAlert('Please enter valid resource name');
                                gridBindflag = false;
                                break; // Use 'break' to exit the loop
                              }
                            }

                           
                   if(gridBindflag){

                             if(newResource==""){
                           $(".Err_addResourceName${index}").css("display","block");
                       }
                       else{
                            $(".Err_addResourceName${index}").css("display","none");
                       }
                        if (newResource !== "") {
                            var splitResources = newResource.split(',');

                                var uniqueResources = [];
                                var duplicates = [];

                                for (var i = 0; i < splitResources.length; i++) {
                                    var singleResource = $.trim(splitResources[i]);

                                    if (singleResource !== "") {
                                        if (uniqueResources.includes(singleResource)) {
                                            duplicates.push(singleResource);
                                        } else {
                                            uniqueResources.push(singleResource.trim());
                                        }
                                    }
                                }

                                    if (duplicates.length > 0) {


                                        //alert('Duplicate resources found: ' + duplicates.join(', ') + '. Duplicates are not allowed.');

                                        openEmptyAlert('Duplicate resources found: ' + duplicates.join(', ') + '. Duplicates are not allowed.');
                                        var InputResource = $.trim($('.tags').val());
                                         var currentResourcearr = InputResource.split(',');

                                         var updatedResourcearr = [];
                                         for(let i=0;i<currentResourcearr.length;i++){
                                             if(!updatedResourcearr.includes(currentResourcearr[i])){
                                                 updatedResourcearr.push(currentResourcearr[i]);
                                             }

                                         }

                                         var updatedResource = updatedResourcearr.toString();
                                         $('.tags').val(updatedResource);
                                        singleResource="";

                                        return; // Stop processing if duplicates are found
                                    }

                            var newRowDataArray = [];
                             var collectedResources = [];

                            var grid =$('#'+'${gridId}');
                             var allResources = grid.jqGrid('getCol', 'ResourceName');

                            allResources.forEach(function(resource) {
                                collectedResources.push(resource.trim());
                            });

                            //-------------Checking with the array whether resources already present in grid

                                    var currentResourcearr = newResource.split(',');
                                    var duplicateResorucearr = [];
                                    var updatedResourcearr = [];

 

                                    for (let i = 0; i < currentResourcearr.length; i++)
                                    {
                                          if (!collectedResources.includes(currentResourcearr[i])) {
                                            updatedResourcearr.push(currentResourcearr[i]);
                                          }
                                          else{
                                             duplicateResorucearr.push(currentResourcearr[i]);
                                          }
                                    }

 

 

                                     //-------------showing alert if duplicate is there (To jqgrid if resource repeated)
                                    if (duplicateResorucearr.length > 0) {

 

                                         openEmptyAlert('Duplicate resources found: ' + duplicateResorucearr.join(', ') + '. Duplicates are not allowed.');
                                         var updatedResource = updatedResourcearr.toString();
                                         $('.tags').val(updatedResource);
                                    }

                                    else  {
                                        for(let i=0;i<updatedResourcearr.length;i++){
                                                var newRowData = {
                                            ResourceName: updatedResourcearr[i] ,
                                            Days:'',
                                            Action: '<div class="justify-center_" style="justify-content: space-around;">' +
                                                '<a class="btn-icon -delete"><i class="fas fa-trash" id="DeleteResource" title="Delete"></i></a>' +
                                                '</div>',
                                        };
                                        }
                                        newRowDataArray.push(newRowData);
                                       //--------------Adding resources to grid after filtering



                                        // Get reference to the grid
                                        var grid =$('#'+'${gridId}');

 

                                        // Add the new row to the jqGrid
                                        grid.jqGrid('addRowData', undefined, newRowDataArray);

 

                                        // Clear the input field after adding the row
                                        $('.appendValue${index}').val('');

                                        }
                                    
                                }
                            
                        

                       
                        }

                        
                    });

                `;

                // Append the script tag to the head of the document
                document.head.appendChild(scriptTag);
                availableTagsdataid = [];

            }

            ValidateDataToSave = SaveResourcesData();

            validatePlannedBudgetToSave = $("#PlannedBudget").val();

        }
        else {

            isSaved = false;
            isDeleted = false;

            $.ajax({
                type: "POST",
                url: ROOT + "ProjectMaster/GetResourceMasterHeaderData",
                data: {
                    Role: roleName,
                    ProjectId: projectId
                },
                success: function (response) {
                    var responseData = JSON.parse(response);

                    var ProjectElementArray = responseData.ResourceData;

                    var AddedResourceArray = responseData.AddedResource;
                    console.log(ProjectElementArray, AddedResourceArray)

                    removeScriptTags();
                    $(".tabdetails").remove();

                    for (var index = 0; index < ProjectElementArray.length; index++) {
                        var tabId = "v-pills-tabpanel-" + index;
                        var gridId = "ResourceMaster-jqgrid-" + index;
                        var pagerId = "ResourceMaster-jqgrid-pager-" + index;

                        var filteredResources = FilterResourcesName(ProjectElementArray[index].ProjectElement);

                        function FilterResourcesName(ProjectElement) {
                            var filteredResources = AddedResourceArray.filter(function (value) {
                                return value.ProjectElement === ProjectElement;
                            });

                            return filteredResources;
                        }

                        var data = JSON.stringify(filteredResources)

                        //Creating the tab content HTML
                        var tabContent = `
                                <div class="tabdetails" id="${tabId}" role="tabpanel" aria-labelledby="${tabId}">
                                    <div class="row">
                                         <div class="row mt-0" style='display:flex;justify-content:center;'>
                                           <div class="col-md-3 mt-3" style='padding:0;width:25%'> 
                                                <div class="form-group mb-0 ">
                                                    <div class="demo-content">
                                                        <input id="tags_" class="form-control tags autocomplete-tags appendValue${index}" placeholder="Select Resources" >
                                                        <span class="Err_addResourceName${index}" style="display:none;color:red;">Please select the Resource</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-1 mt-3" style='width:5%;;padding:0 0 0 5px'>
                                                <div class="form-group mb-0 ">
                                                    <button type="button"  title="Add" class="btn-add ex_bt excel_btn addResourceName${index}"><i class="fas fa-plus ex_download"  title="Add"  aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                           <div style='display:flex;flex-direction:column;width:19%;padding:0;margin-left:15px'>
                                            <div class="col-auto">
                                                <div class="form-group mb-0 ">
                                                    <label class="control-label">
                                                        Planned Budget (INR)
                                                    </label>
                                                </div>
                                            </div>
                                             <div class="col-md-2" style='width:75%'>
                                                <div class="form-group mb-0" style="position: relative;">
                                                    <input type="number" class="form-control mt-0" id="PlannedBudget" oninput="validateInput(this)"
                                                    value="${ProjectElementArray[index].PlannedBudget}">
                                                </div>
                                            </div>
                                            </div>
                                            <div style='display:flex;flex-direction:column;width:14%;padding:0;margin-left:15px'>
                                                <div class="col-auto">
                                                <div class="form-group  mb-0 ">
                                                    <label class="control-label">
                                                        Duration in Days
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-2" style='width:75%'>
                                                <div class="form-group  mb-0">
                                                    <input type="number" class="form-control mt-0 "  id="Duration" value="${ProjectElementArray[index].Duration}"
                                                    oninput="validateNegativeInput(this)"/>
                                                </div>
                                            </div>
                                            </div>
                                           
                                            <div style='display:flex;flex-direction:column;width:15%;padding:0;margin-left:15px'>
                                                <div class="col-auto">
                                                <div class="form-group  mb-0 ">
                                                    <label class="control-label">
                                                        Allocated Days
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-1" style='width:20%;padding:0'>
                                                <div class="form-group mt-1  mb-0 highlightAllocatedDays">
                                                    <label class="control-label mt-0"><strong>${ProjectElementArray[index].AllocatedDays}</strong></label>
                                                </div>
                                            </div>
                                           </div>
                                           <div style='display:flex;flex-direction:column;width:15%;padding:0;'>
                                            <div class="col-auto">
                                                <div class="form-group mb-0 ">
                                                    <label class="control-label">
                                                        Planned Manpower
                                                    </label><strong></strong>
                                                </div>
                                            </div>               
                                             <div class="col-md-2" style='width:75%'>
                                                <div class="form-group mb-0" style="position: relative;">
                                                    <input type="number" class="form-control mt-0" id="PlannedBudget" oninput="validateInput(this)" readonly>
                                                </div>
                                            </div></div>
                                        </div>
                                        </div>
                                        <lable style='display:none' class='SaveKeyValue' id='keyvalue-${index}'>${ProjectElementArray[index].KeyValue}</lable>
                                        <div class="add_grid__">
                                            <div class="m-table__main mt-2 mb-2">
                                                <div class="m-table__responsive -virtual-scroll">
                                                    <table id="${gridId}"></table>
                                                    <div id="${pagerId}"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `;

                        // Append the tab content to the tabs container
                        $(".tab-content").append(tabContent);

                        // creating the jqgrid script tag
                        var scriptTag = document.createElement("script");
                        scriptTag.setAttribute("data-dynamic-script", "true");
                        scriptTag.textContent = `
                    var colmodels_${index} = [
                        {
                            name: 'ResourceName',
                            label: 'Resource Name',
                            ignoreCase: true,
                            width: 380,

                        },
                         {
                            name: 'KeyValue',
                            label: 'Key Value',
                            ignoreCase: true,
                            hidden: true,
                            width: 40,
                        },
                        {
                            name: 'Days',
                            label: 'Days',
                            ignoreCase: true,
                            search: false,
                            width: 60,
                            
                            formatter: function (cellvalue, options, rowobject) {
                            if (cellvalue === 0) {
                                return '<div class="demo-content days_input" ><input type="number" oninput="preventMinusInput(event)" min="1" class="form-control days" value="" ></div>';
                            } else {
                                return '<div class="demo-content days_input" ><input type="number" oninput="preventMinusInput(event)" min="1"  class="form-control days" value="' + cellvalue + '"></div>';
                            }
                           


                             
                            
                        }                    
                        },
                        {
                            name: 'Action',
                            label: 'Action',
                            width: 50,
                            search: false,
                            resizable: true,
                            ignoreCase: true,
                            formatter: function (cellvalue, options, rowobject) {

                                return '<div class="justify-center_" style="justify-content: space-around;">' +
                                            '<a class="btn-icon -delete"><i class="fas fa-trash" id="DeleteResource" title="Delete"></i></a>' +
                                            '</div>'
                            }
                        },
                    ];

                    $('#'+'${gridId}').jqGrid({
                    url: '',
                    datatype: 'local',
                    data: ${data},
                    mtype: 'GET',
                    colModel: colmodels_${index},
                    loadonce: true,
                    rowNum: 20,
                    scroll: 1,

                    gridComplete: function () {
                        var objRows = $("${gridId} tbody tr");
                        var objHeader = $("${gridId} tbody tr td");

                        if (objRows.length > 1) {
                            var objFirstRowColumns = $(objRows[1]).children("td");
                            for (i = 0; i < objFirstRowColumns.length; i++) {
                                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                            }
                        }

                    }
                    });
                    $('#'+'${gridId}').jqGrid('filterToolbar', {
                        autosearch: true,
                        stringResult: false,
                        searchOnEnter: false,
                        defaultSearch: "cn"
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
                             
                    $(".addResourceName${index}").click(function () {

                        var newResource = $.trim($('.appendValue${index}').val());
                        newResource = newResource.replace(/^,|,$/g, '');
                         var selectednamearray=newResource.split(',');
                            
                          var gridBindflag = true; 

                            for (var i = 0; i < selectednamearray.length; i++) {
                              var element = selectednamearray[i];
                              var index = $.inArray(element, availableTagsdataid);
  
                              if (index !== -1) {
                                //alert(element + ' exists');
                              } else if(element.Length>0) {
                                openEmptyAlert('Please enter valid resource name');
                                gridBindflag = false;
                                break; // Use 'break' to exit the loop
                              }
                            }

                           
                   if(gridBindflag){

                             if(newResource==""){
                           $(".Err_addResourceName${index}").css("display","block");
                       }
                       else{
                            $(".Err_addResourceName${index}").css("display","none");
                       }
                        if (newResource !== "") {
                            var splitResources = newResource.split(',');

                                var uniqueResources = [];
                                var duplicates = [];

                                for (var i = 0; i < splitResources.length; i++) {
                                    var singleResource = $.trim(splitResources[i]);

                                    if (singleResource !== "") {
                                        if (uniqueResources.includes(singleResource)) {
                                            duplicates.push(singleResource);
                                        } else {
                                            uniqueResources.push(singleResource.trim());
                                        }
                                    }
                                }

                                    if (duplicates.length > 0) {


                                        //alert('Duplicate resources found: ' + duplicates.join(', ') + '. Duplicates are not allowed.');

                                        openEmptyAlert('Duplicate resources found: ' + duplicates.join(', ') + '. Duplicates are not allowed.');
                                        var InputResource = $.trim($('.tags').val());
                                         var currentResourcearr = InputResource.split(',');

                                         var updatedResourcearr = [];
                                         for(let i=0;i<currentResourcearr.length;i++){
                                             if(!updatedResourcearr.includes(currentResourcearr[i])){
                                                 updatedResourcearr.push(currentResourcearr[i]);
                                             }

                                         }

                                         var updatedResource = updatedResourcearr.toString();
                                         $('.tags').val(updatedResource);
                                        singleResource="";

                                        return; // Stop processing if duplicates are found
                                    }

                            var newRowDataArray = [];
                             var collectedResources = [];

                            var grid =$('#'+'${gridId}');
                             var allResources = grid.jqGrid('getCol', 'ResourceName');

                            allResources.forEach(function(resource) {
                                collectedResources.push(resource.trim());
                            });

                            //-------------Checking with the array whether resources already present in grid

                                    var currentResourcearr = newResource.split(',');
                                    var duplicateResorucearr = [];
                                    var updatedResourcearr = [];

 

                                    for (let i = 0; i < currentResourcearr.length; i++)
                                    {
                                          if (!collectedResources.includes(currentResourcearr[i])) {
                                            updatedResourcearr.push(currentResourcearr[i]);
                                          }
                                          else{
                                             duplicateResorucearr.push(currentResourcearr[i]);
                                          }
                                    }

 

 

                                     //-------------showing alert if duplicate is there (To jqgrid if resource repeated)
                                    if (duplicateResorucearr.length > 0) {

 

                                         openEmptyAlert('Duplicate resources found: ' + duplicateResorucearr.join(', ') + '. Duplicates are not allowed.');
                                         var updatedResource = updatedResourcearr.toString();
                                         $('.tags').val(updatedResource);
                                    }

                                    else  {
                                        for(let i=0;i<updatedResourcearr.length;i++){
                                                var newRowData = {
                                            ResourceName: updatedResourcearr[i] ,
                                            Days:'',
                                            Action: '<div class="justify-center_" style="justify-content: space-around;">' +
                                                '<a class="btn-icon -delete"><i class="fas fa-trash" id="DeleteResource" title="Delete"></i></a>' +
                                                '</div>',

                                        };
                                        newRowDataArray.push(newRowData);
                                        }
                                        
                                       //--------------Adding resources to grid after filtering



                                        // Get reference to the grid
                                        var grid =$('#'+'${gridId}');

 

                                        // Add the new row to the jqGrid
                                        grid.jqGrid('addRowData', undefined, newRowDataArray);

 

                                        // Clear the input field after adding the row
                                        $('.appendValue${index}').val('');

                                        }
                                    
                                }
                            
                        

                       
                        }

                        
                    });

                `;

                        // Append the script tag to the head of the document
                        document.head.appendChild(scriptTag);
                        availableTagsdataid = [];

                    }

                    ValidateDataToSave = SaveResourcesData();

                    validatePlannedBudgetToSave = $("#PlannedBudget").val();
                    capturedDuration = $("#Duration").val();

                },


                error: function () {
                    alert('Error occurred during AJAX call.');
                }
            });
        }
    });
    // Perform AJAX call to the controller
}
function preventNegativeInput(input) {
    let inputValue = input.value;

    let numericValue = parseFloat(inputValue);

    if (numericValue < 0) {
        input.value = 0;
    }
}




//---------------------------function to remove the dynamic script of jqgrid added------------------------------------------------------------------------------------------

function removeScriptTags() {
    var scriptTags = document.querySelectorAll("script[data-dynamic-script]");
    scriptTags.forEach(function (scriptTag) {
        document.head.removeChild(scriptTag);
    });
}

//-------------------------Multi suggest drop down code---------------------------------------------------------------------------------------------------------------------


$(document).on("focus", ".autocomplete-tags", function () {

    $('#loader').hide();

    $('#loader').css('visibility', 'hidden');

    initializeAutocomplete(this);


});

var availableTags = [];

var usersMap = {};

var availabledata = [];



function initializeAutocomplete(inputField) {



    var rowId = $(inputField).data("rowid");

    selectedValues = [];

    var terms = [];

    // Function to update the visible input field with selected values



    function updateVisibleInput() {


        $(inputField).val(selectedValues.join(","));

    }

    // Initialize selectedValues with existing values in the input field

    var initialValue = $(inputField).val();

    //var initialValue = inputField.target.val();



    if (initialValue) {

        selectedValues = initialValue.split(/,\s*/);

    }



    $('.autocomplete-tags').autocomplete({

        classes: {

            "ui-autocomplete": "multiple-autocomplete",

        },

        minLength: 0,

        source: function (request, response) {



            var term = extractLast(request.term) || "";

            $.ajax({

                type: "GET",

                url: ROOT + "ProjectMaster/GetResourceNames",

                dataType: "json",

                data: { term: term },

                success: function (data) {

                    availableTags = [];

                    usersMap = {};



                    data.forEach(element => {



                        availableTags.push({

                            label: element,

                            value: element

                        });




                        availableTagsdataid.push(element.trim());
                        usersMap[element.UserName] = element.UserId;


                    });
                    // Filter the suggestions to remove already selected values

                    var filteredData = data.filter(function (item) {

                        return !selectedValues.includes(item);

                    });

                    response(filteredData);

                },

                error: function (xhr, status, error) {


                    response([]);

                },

            });

            var term = request.term;

            var item = request.term;



            var FullList = [];



            // substring of new string (only when a comma is in string)

            if (term.indexOf(',') > 0) {



                FullList = term.split(/;/g);

                FullList.pop();

                $.each(FullList, function (i, v) {

                    //v = $.trim(v).toLowerCase();

                    v = v.replace(/^\s+/, "").toLowerCase();

                })



                var index = term.lastIndexOf(',');

                term = term.substring(index + 1);

            }



            // regex to match string entered with start of suggestion strings

            var regex_validated_array = [];

            if ($.trim(term).length > 0) {

                //var re = $.ui.autocomplete.escapeRegex(term);

                var re = term;

                var matcher = new RegExp('^' + re, 'i');



                regex_validated_array = $.grep(availableTags, function (item, index) {

                    //return matcher.indexOf(item)!=-1;

                    return $.trim(item.label).toLowerCase().indexOf(re.toLowerCase()) != -1 && (FullList.length == 0 || FullList.length > 0 && !FullList.includes($.trim(item.label)));

                });

            }



            // pass array `regex_validated_array ` to the response and 

            // `extractLast()` which takes care of the comma separation



            response($.ui.autocomplete.filter(regex_validated_array.slice(0, 50),

                extractLast(term)));



            //added for remove

            //console.log(item, 'term');



            item = item.split(',');

            item.forEach(term => {

                terms.push(term.trim());

            });

            //console.log('terms', terms);

            var userIds = [];

            terms.forEach(term => {



                userIds.push(usersMap[term]);

            });



            // empty strings for adding , at the end

            terms.push('');



            this.value = terms.join(',');

        },
        select: function (event, ui) {
            var selectedValue = ui.item.value;

            // Store or use the selected value here
            // For example, store it in a variable
            // 
            const storedValue = selectedValue;
            // Or send it to the server using AJAX
            // 

            sendToServer(selectedValue);

        },
        focus: function (event, ui) {

            $('#loader').hide();

            $('#loader').css('visibility', 'hidden');



            //$(this).val(ui.item.value);

            //terms.push(ui.item.value);

            //this.value = terms.join(',');

            return false;

        },

        select: function (event, ui) {



            var selectedValues = [];



            var term = split(this.value.trim());

            term.pop();

            // Add the selected value to the array if not already present

            if (!selectedValues.includes(ui.item.value)) {

                //selectedValues.push(ui.item.value);

                term.push(ui.item.label);

            } else {

                alert('Duplicate selection is not allowed');

            }

            term.forEach(item => {

                selectedValues.push(item.trim());

            });

            //selectedValues.push('');


            // Clear input to show suggestions again

            $(this).val("");

            $(inputField).val(selectedValues.join(","));



            //updateVisibleInput();



            return false;

        },

    });



    // Trigger autocomplete suggestions on focus

    $(inputField).on("focus", function () {

        $('#loader').hide();

        $('#loader').css('visibility', 'hidden');

        $(this).autocomplete("search", "");

    });



    // Update the visible input field on initialization

    updateVisibleInput();

}



$(function () {

    function split(val) {

        return val.split(/,\s*/);

    }



    function extractLast(term) {

        return split(term).pop();

    }



    $(".tags")

        .on("keydown", function (event) {

            if (

                event.keyCode === $.ui.keyCode.TAB &&

                $(this).autocomplete("instance").menu.active

            ) {

                event.preventDefault();

            }

        })

        .autocomplete({

            classes: {

                "ui-autocomplete": "multiple-autocomplete"

            },

            minLength: 0,

            source: function (request, response) {

                $.ajax({

                    url: ROOT + "ProjectMaster/GetResourceNames", // Replace with the actual URL of the controller method

                    dataType: "json",

                    data: {

                        term: extractLast(request.term)

                    },

                    success: function (data) {

                        $('#loader').hide();

                        $('#loader').css('visibility', 'hidden');

                        response(data);

                        availableTags = [];

                        usersMap = {};



                        data.forEach(element => {



                            availableTags.push({

                                label: element.UserName,

                                value: element.UserId

                            });



                            usersMap[element.UserName] = element.UserId;

                        });



                    }

                });



            },

            focus: function () {

                return false;

            },

            select: function (event, ui) {

                var terms = split(this.value);

                terms.pop();

                terms.push(ui.item.value);

                terms.push("");

                this.value = terms.join(",");

                return false;

            }

        });

});



function extractLast(term) {

    return split(term).pop();

}



function split(val) {

    return val.split(/,\s*/);

}

//----------------------------------------------------------------------save functionality---------------------------------------------------------------------

function validateDatafunction(ValidateNewDataToSave) {
    var result = JSON.stringify(ValidateNewDataToSave) === JSON.stringify(ValidateDataToSave);

    return result;

}

var labelElement = '';
function SaveResourcesData() {
    var dataToSave = [];
    $(".tabdetails").each(function (index, tab) {
        var tabId = tab.id;
        var gridId = "ResourceMaster-jqgrid-" + index;
        var daysInputs = $(tab).find(".days"); // Assuming .days is the class of input elements
        labelElement = document.getElementById(`keyvalue-${index}`);
        var keyValue = labelElement.textContent;

        // Get the data from the grid for this tab
        var gridData = $("#" + gridId).jqGrid("getGridParam", "data");
        var projectId = $("#PRMProjectId").val();
        let firstSpaceIndex = projectId.indexOf(" ");

        if (firstSpaceIndex != -1) {
            projectId = projectId.substr(0, firstSpaceIndex);
        }
        var DaysArray = []
        gridData.forEach(function (row, rowIndex) {

            var resourceName = row.ResourceName;
            var days = $(daysInputs[rowIndex]).val(); // Get the corresponding days value
            //var keyvalue = row.KeyValue;
            //if (keyvalue != "" && keyvalue != null) {
            //    rowkeyValue = keyvalue;
            //}
            //else {
            //    rowkeyValue = keyValue;
            //}
            //console.log(days);



            if (!days) {
                days = 0;


            }

            var rowData = {
                ResourceName: resourceName,
                Days: days, // Use the collected days value
                KeyValue: keyValue,
                ProjectId: projectId,
            };
            dataToSave.push(rowData);


        });
    });

    return dataToSave;
}

var flag = false;
var plannedbudgedvalue
function validatePlannedBudgetfunction() {
    plannedbudgedvalue = $("#PlannedBudget").val();
    var result = validatePlannedBudgetToSave === plannedbudgedvalue ;
    return result;
}

function validateDurationfunction() {

    var result = capturedDuration === $("#Duration").val();
    return result;
}

//$("#saveButton").on("click", function () {

//    var dataToSave = [];
//    var projectId = $("#PRMProjectId").val();
//    let firstSpaceIndex = projectId.indexOf(" ");

//    if (firstSpaceIndex != -1) {
//        projectId = projectId.substr(0, firstSpaceIndex);
//    }
//    var dataToSave = SaveResourcesData();
//    for (i = 0; i < dataToSave.length; i++) {
//        if (dataToSave[i].days === 0) {
//            flag = true;
//            break;
//        }
//    }

//    if (projectId == "" || projectId == "Select ProjectId") {
//        /*$("#alertEmptyProjectIdSave").modal('show');*/
//        openEmptyAlert("Please Select a ProjectId");
//    }

//    else if (validateDatafunction(SaveResourcesData()) && validatePlannedBudgetfunction()) {
//        /* $("#alertEmptyProjectIdSave").modal('show');*/
//        openEmptyAlert("There is No Data to Save");
//    }

//    else if (flag == true && !validateDatafunction(SaveResourcesData())) {
//        $("#SaveAlertPopup").modal('show');
//        $('#saveResourceDays').on('click', function () {
//            plannedBudget = $("#PlannedBudget").val();
//            // var ref = document.getElementsByClassName("SaveKeyValue");
//            // var keyValuePB = ref[0].textContent;
//            var keyValuePB = labelElement.textContent;
//            $("#SaveAlertPopup").modal('hide');
//            $('#loader').show();
//            $('#loader').css('visibility', 'visible');

//            $.ajax({
//                type: "POST",
//                url: ROOT + "ProjectMaster/SaveResourcesNameAndDays",
//                data: {
//                    dataToSave: JSON.stringify(dataToSave),
//                    plannedBudget: plannedBudget,
//                    keyValuePB: keyValuePB,
//                    projectId: projectId
//                },
//                success: function (response) {

//                    showSuccessMessage("Resources saved Successfully");
//                    dataToSave = [];
//                    flag = false;
//                    $('#SearchPRMData').click();


//                },
//                error: function (error) {
//                    console.error("Error while saving data:", error);
//                }
//            });
//        });
//        $('#cancelAlertResources').on('click', function () {
//            $("#SaveAlertPopup").modal('hide');
//            flag = false;
//        });
//    }

//    else {

//        $("#SaveConfirmPopup").modal('show');

//        $('#saveResources').on('click', function () {

//            $("#SaveConfirmPopup").modal('hide');

//            var dataToSave = SaveResourcesData();
//            plannedBudget = $("#PlannedBudget").val();
//            var keyValuePB = labelElement.textContent;

//            $('#loader').show();
//            $('#loader').css('visibility', 'visible');
//            $.ajax({
//                type: "POST",
//                url: ROOT + "ProjectMaster/SaveResourcesNameAndDays",
//                data: {
//                    dataToSave: JSON.stringify(dataToSave),
//                    plannedBudget: plannedBudget,
//                    keyValuePB: keyValuePB,
//                    projectid: projectId
//                },
//                success: function (response) {

//                    showSuccessMessage("Resources saved Successfully");
//                    $('#SearchPRMData').click();
//                },
//                error: function (error) {
//                    console.error("Error while saving data:", error);
//                }
//            });
//        });

//        $('#cancelSaveResources').on('click', function () {
//            $("#SaveConfirmPopup").modal('hide');
//        });



//    }


//});

$("#saveButton").on("click", function () {
    if (targetArray.length == 0) {
        var dataToSave = [];
        var projectId = $("#PRMProjectId").val();
        let firstSpaceIndex = projectId.indexOf(" ");

        if (firstSpaceIndex != -1) {
            projectId = projectId.substr(0, firstSpaceIndex);
        }
        var dataToSave = SaveResourcesData();
        for (i = 0; i < dataToSave.length; i++) {
            if (dataToSave[i].days === 0) {
                flag = true;
                break;
            }
        }

        if (projectId == "" || projectId == "Select ProjectId") {
            /*$("#alertEmptyProjectIdSave").modal('show');*/
            openEmptyAlert("Please Select a ProjectId");
        }

        else if (validateDatafunction(SaveResourcesData()) && validatePlannedBudgetfunction() && validateDurationfunction()) {
            /* $("#alertEmptyProjectIdSave").modal('show');*/
            openEmptyAlert("There is No Data to Save");

        }
        else {

            $("#SaveConfirmPopup").modal('show');

            $('#saveResources').off('click').on('click', function () {

                $("#SaveConfirmPopup").modal('hide');

                var dataToSave = SaveResourcesData();
                plannedBudget = $("#PlannedBudget").val();
                var duration = $("#Duration").val();
                var keyValuePB = labelElement.textContent;

                $('#loader').show();
                $('#loader').css('visibility', 'visible');
                $.ajax({
                    type: "POST",
                    url: ROOT + "ProjectMaster/SaveResourcesNameAndDays",
                    data: {
                        dataToSave: JSON.stringify(dataToSave),
                        plannedBudget: plannedBudget,
                        keyValuePB: keyValuePB,
                        duration: duration,
                        projectid: projectId
                    },
                    success: function (response) {

                        showSuccessMessage("Resources saved Successfully");
                        ValidateDataToSave = [];
                        targetArray = [];
                        Duration = '';
                        capturedDuration = '';
                        isSaved = true;
                        $('#SearchPRMData').click();
                    },
                    error: function (error) {
                        console.error("Error while saving data:", error);
                    }
                });
            });

            $('#cancelSaveResources').off('click').on('click', function () {
                $("#SaveConfirmPopup").modal('hide');
                flag = false;
            });
        }
    }
    else {
        var dataToSave = [];
        var ajaxRequests = [];
        var projectId = $("#PRMProjectId").val();
        let firstSpaceIndex = projectId.indexOf(" ");

        if (firstSpaceIndex != -1) {
            projectId = projectId.substr(0, firstSpaceIndex);
        }
        var dataToSave = SaveResourcesData();
        //if (!validateDatafunction(SaveResourcesData())) {
        for (i = 0; i < dataToSave.length; i++) {
            if (dataToSave[i].days === 0) {
                flag = true;
                break;
            }
        }
        var plannedBudgetValue = parseFloat($("#PlannedBudget").val().replace(/\s+/g, '').replace('INR', ''));
        var duration = $("#Duration").val();
        var keyValuePB = labelElement.textContent;
        let existingIndex = -1;
        for (let i = 0; i < targetArray.length; i++) {
            if (targetArray[i].keyValuePB === keyValuePB) {
                existingIndex = i;
                break; // Stop the loop if a match is found
            }
        }
        if (dataToSave != null) {
            const newObject = {
                dataToSave: JSON.stringify(dataToSave),
                plannedBudget: plannedBudgetValue,
                keyValuePB: keyValuePB,
                allocatedDays: AllocatedDays,
                duration: duration,
                Role: Role,
                projectId: projectId
            };
            if (existingIndex !== -1) {
                targetArray.splice(existingIndex, 1); // Remove the entire object
            }
            targetArray.push(newObject);
        }
        //}
        if (projectId == "" || projectId == "Select ProjectId") {
            /*$("#alertEmptyProjectIdSave").modal('show');*/
            openEmptyAlert("Please Select a ProjectId");
        }

        else if (targetArray.length === 0 && validatePlannedBudgetfunction() && validateDurationfunction()) {
            /* $("#alertEmptyProjectIdSave").modal('show');*/
            openEmptyAlert("There is No Data to Save");
        }
        else {


            $("#SaveAlertPopup").modal('show');
            $('#saveResourceDays').off('click').on('click', function () {

                $("#SaveAlertPopup").modal('hide');
                $('#loader').show();
                $('#loader').css('visibility', 'visible');



                targetArray.forEach(function (item, index) {
                    ajaxRequests.push(
                        $.ajax({
                            type: "POST",
                            url: ROOT + "ProjectMaster/SaveResourcesNameAndDays",
                            data: {
                                dataToSave: item.dataToSave,
                                plannedBudget: item.plannedBudget,
                                keyValuePB: item.keyValuePB,
                                duration: item.duration,
                                projectId: item.projectId
                            },
                            success: function (response) {

                                //showSuccessMessage("Resources saved Successfully");

                            },
                            error: function (error) {
                            }
                        })
                    );

                });
                $.when.apply($, ajaxRequests).done(function () {
                    showSuccessMessage("Resources saved Successfully");
                    ValidateDataToSave = [];
                    targetArray = [];
                    isSaved = true;
                    $('#SearchPRMData').click();

                });
            });
            $('#cancelAlertResources').off('click').on('click', function () {
                $("#SaveAlertPopup").modal('hide');
                flag = false;
            });
        }
    }
});
//-------------------------------------------success alert for delete and save functionlity---------------------------------------------------------------------

function showSuccessMessage(message) {
    $("#SaveDeleteSuccessAlert strong").text(message);
    $("#SaveDeleteSuccessAlert").fadeIn().delay(3000).fadeOut();
}

//----------------------------------------------------------------------Delete functionality---------------------------------------------------------------------


var rowId;
var jqGridName;
var keyValue;
var ResourceNameToDelete;
var projectId;
$(document).off('click').on('click', '.-delete', function (e) {

    var dataToSave = [];
    e.preventDefault();

    rowId = $(this).closest('tr').attr('id');

    var jqGridTable = $(this).closest('table');

    jqGridName = jqGridTable.attr('id');

    ResourceNameToDelete = jqGridTable.jqGrid('getCell', rowId, 'ResourceName');

    var gridnumber = jqGridName.charAt(jqGridName.length - 1);

    var labelElement = document.getElementById("keyvalue-" + gridnumber);

    keyValue = labelElement.textContent;
    var daysHtml = $("#" + jqGridName).jqGrid('getCell', rowId, 'Days'); // Get the HTML content from the 'Days' column
    var daysValue = $(daysHtml).find('.days').val(); // Extract the value from the input element
    projectId = $("#PRMProjectId").val();
    let firstSpaceIndex = projectId.indexOf(" ");

    if (firstSpaceIndex != -1) {
        projectId = projectId.substr(0, firstSpaceIndex);
    }

    dataToSave = SaveResourcesData();
    dataToSave = dataToSave.filter(x => x.ResourceName != ResourceNameToDelete)

    capturedAllocatedDays = capturedAllocatedDays - daysValue;

    $('#Deletetemplateresourcename').modal('show');


    $('#deleteResource').off('click').on('click', function () {
        $.ajax({
            type: "POST",
            url: ROOT + "ProjectMaster/ResourceMasterResourceNameDelete",
            data: {
                ResourceName: ResourceNameToDelete,
                keyValue: keyValue,
                Days: daysValue,
                ProjectId: projectId
            },
            success: function (response) {

                if (response == "success") {
                    $("#" + jqGridName).jqGrid("delRowData", rowId);
                    showSuccessMessage("Resources Deleted Successfully");
                    //if ( targetArray.length ===0) {
                    //targetArray = [];
                    for (i = 0; i < dataToSave.length; i++) {
                        if (dataToSave[i].days === 0) {
                            flag = true;
                            break;
                        }
                    }
                    var plannedBudget = $("#PlannedBudget").val();
                    var keyValuePB = labelElement.textContent;
                    let existingIndex = -1;
                    for (let i = 0; i < targetArray.length; i++) {
                        if (targetArray[i].keyValuePB === keyValuePB) {
                            existingIndex = i;
                            break; // Stop the loop if a match is found
                        }
                    }
                    if (dataToSave != null) {
                        const newObject = {
                            dataToSave: JSON.stringify(dataToSave),
                            plannedBudget: plannedBudget,
                            keyValuePB: keyValuePB,
                            allocatedDays: capturedAllocatedDays,
                            duration: capturedDuration,
                            Role: capturedRole,
                            projectId: projectId
                        };
                        if (existingIndex !== -1) {
                            targetArray.splice(existingIndex, 1); // Remove the entire object
                        }
                        targetArray.push(newObject);

                    }
                    isDeleted = true;
                    $('#SearchPRMData').click();
                    //}
                }
            },
            error: function (error) {
                // Handle error response
                console.error("Error while sending data:", error);
            }
        });
        $('#Deletetemplateresourcename').modal('hide');

    });

    // Handle cancel button click inside the modal
    $('#cancelDeleteResource').off('click').on('click', function () {

        $('#Deletetemplateresourcename').modal('hide');
    });
});


// --------------------------------------------------------- Show modal and close for empty data is searched, exported or saved-------------------------------------------

function openEmptyAlert(message) {

    $("#EmptyAlertbody").text(message);
    $("#EmptyAlert").modal("show");
    flag = false;

}

$("#closeEmptyAlert").on("click", function () {

    $("#EmptyAlert").modal('hide');
    flag = false;
});

//-----------------------------------------------------------------------tab remove active functionlity---------------------------------------------------------------------

let activeButton = null;

$(document).on("click", ".dynamic-button", function () {
    if (activeButton !== null) {
        activeButton.removeClass("active");
    }

    activeButton = $(this);
    activeButton.addClass("active");
});

//----------------------------------------------------------Excel save functionality----------------------------------------------------------------------------

$("#ExcelDownload").click(function () {
    var projectId = $("#PRMProjectId").val();
    if (projectId == "" || projectId == "Select ProjectId") {

        /* $("#alertExcelEmpty").modal('show');*/
        openEmptyAlert("No Data Available for Export");

    }
    else {
        let firstSpaceIndex = projectId.indexOf(" ");
        if (firstSpaceIndex != -1) {
            projectId = projectId.substr(0, firstSpaceIndex);
        }

        // Make an AJAX request to the controller to fetch the data
        $.ajax({
            url: ROOT + 'ProjectMaster/GetExcelResourceMasterData',
            type: 'GET',
            data: { projectId: projectId },
            xhrFields: {
                responseType: 'blob' // This indicates that the response will be binary data (a blob)
            },
            success: function (response) {
                // Call the function to save the Excel data as a file
                saveData(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'ProjectResourceMaster.xlsx');
            },
            error: function () {
                alert('Error fetching data');
            }
        });
    }
});



// Function to save data as a file
function saveData(data, type, filename) {
    var blob = new Blob([data], { type: type });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename; // Use the provided filename
    a.click();
    window.URL.revokeObjectURL(url);
}

function validateInput(inputElement) {
    const enteredValue = parseFloat(inputElement.value);

    if (isNaN(enteredValue)) {
        inputElement.value = '';
        return;
    }

    if (enteredValue <= 0) {
        inputElement.value = '';
    }
}
function validateNegativeInput(inputElement) {
    const enteredValue = parseFloat(inputElement.value);

    if (isNaN(enteredValue)) {
        inputElement.value = '';
        return;
    }

    const integerValue = parseInt(enteredValue);

    inputElement.value = integerValue;
}
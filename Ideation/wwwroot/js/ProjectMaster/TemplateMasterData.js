var capturedTemplate;
var capturedRole;

var ValidateDataToSave = [];
var gridBindflag = true;
var selectedValues = [];
var availableTagsdataid = [];
var validateDurationToSave;
var saveStateArr = [];
var unSavedDurationarr = [];

$("#SaveDeleteSuccessAlert").hide();

//---------------------------------Handeling the Search, Making left side tabs to appear and default selecting the first tab------------------------------

$('#SearchTMData').on('click', function () {

    var templateName = $("#TMTemplateName").val();


    if (templateName == "" || templateName == "Select TemplateName") {

        openEmptyAlert("Please Select a Template");

    }
    else
    {

        if (templateName != capturedTemplate) {
            capturedRole = undefined;
            capturedTemplate = undefined;
            if ((saveStateArr.length != 0) || (unSavedDurationarr.length != 0)) {

                $("#AlterForUnsavedChanges").modal('show');

                $('#leaveunsavedchanges').on('click', function () {

                    saveStateArr = [];
                    unSavedDurationarr = [];
                    $("#AlterForUnsavedChanges").modal('hide');
                    search(templateName);
                });

                $('#savechanges').on('click', function () {

                    $("#AlterForUnsavedChanges").modal('hide');
                    $("#saveButton").click();

                });

            }
            else {
               
                search(templateName);
            }

        }
        else {
            search(templateName);
        }
            

    }

 
    function search(templateName) {

        $.ajax({

            type: "GET",

            url: ROOT + "ProjectMaster/GetTemplateMasterHeaderData",

            data: {

                TemplateId: templateName,

            },

            success: function (response) {

                var responseData = JSON.parse(response);

                var templateDataArray = responseData.TemplateData;

                const tabdiv = document.getElementById('v-pills-tab');

                const tabcontentdiv = document.getElementById('v-pills-tabContent');

                const tabbuttondiv = document.createElement('div');
                tabbuttondiv.style.width = '100%';
                tabbuttondiv.style.maxHeight = '400px';
                tabbuttondiv.style.overflowY = 'auto';
                tabbuttondiv.id = 'dynamic-button-div';

                while (tabdiv.children[1]) {
                    tabdiv.removeChild(tabdiv.children[1]);
                }

                while (tabcontentdiv.firstChild) {
                    tabcontentdiv.removeChild(tabcontentdiv.firstChild);
                }

                for (let index = 0; index < templateDataArray.length; index++) {

                    if (templateDataArray[index].HODName == undefined) {
                        templateDataArray[index].HODName = ''
                    }

                    const button = document.createElement('button');

                    button.style.width = '100%';

                    button.classList.add('nav-link', 'dynamic-button', 'RemoveActive');

                    button.setAttribute('id', `v-pills-tab-${index}`);

                    button.setAttribute('data-bs-toggle', 'pill');

                    button.setAttribute('data-bs-target', `#v-pills-${index}`);

                    button.setAttribute('type', 'button');

                    button.setAttribute('role', 'tab');

                    button.setAttribute('aria-controls', `v-pills-${index}`);

                    button.setAttribute('aria-selected', 'false');

                    button.innerHTML = `

                        <div class="row" style="row-gap:0px;">

                            <div class="col-auto">

                                <div class="form-group mb-0">

                                <span>Role Name : </span>

                                <span><strong>${templateDataArray[index].Role}</strong></span>

                            </div>

                        </div>

                        </div>

                            <div class="row">

                            <div class="col-auto">

                                <div class="form-group mb-0" style='text-align:left;'>

                                    <span>HOD : </span>

                                    <span><strong>${templateDataArray[index].HODName}</strong></span>

                                </div>

                            </div>

                        </div>

                        <div class="row">

                        <div class="col-auto">

                            <div class="form-group mb-0">

                                <span>Duration : </span>

                                <span><strong>${templateDataArray[index].Duration}</strong></span>

                            </div>

                        </div>

                        <div class="col-auto">

                            <div class="form-group mb-0">

                                <span>Unit : </span>

                                <span><strong>${templateDataArray[index].Unit}</strong></span>

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
                    button.addEventListener('click', function () {

                        capturedTemplate = templateName;
                        capturedRole = templateDataArray[index].Role;

                        PostTabData(templateName, templateDataArray[index].Role);
                    });

                    tabbuttondiv.appendChild(button);

                }

                tabdiv.appendChild(tabbuttondiv);

                const firstButton = tabbuttondiv.querySelector('.dynamic-button');

                if (firstButton && capturedTemplate == undefined && capturedRole == undefined) {
                    firstButton.click();
                }
                else
                {
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

//------------------------------------code to post selected tab to backend and get the response and add jqgrid dynamically---------------------------------

function PostTabData(templateId, roleName) {

    $.ajax({

        type: "GET",

        url: ROOT + "ProjectMaster/GetTemplateMasterHeaderData",

        data: {

            TemplateId: templateId,

            Rolename: roleName

        },

        success: function (response) {
            $('#loader').show();
            $('#loader').css('visibility', 'visible');

            var responseData = JSON.parse(response);

            var ProjectElementArray = responseData.TemplateData;

            var AddedResourceArray = responseData.AddedResource;

            removeScriptTags();

            $(".tabdetails").remove();

            for (var index = 0; index < ProjectElementArray.length; index++)
            {

                var tabId = "v-pills-tabpanel-" + index;
                var gridId = "TemplateMaster-jqgrid-" + index;
                var pagerId = "TemplateMaster-jqgrid-pager-" + index;

                var unsavedresources = [];

                var localKeyValue = ProjectElementArray[0].KeyValue;
                
                if (saveStateArr.length != 0) {
                    var unSavedData = saveStateArr.filter(function (item) {
                        return item.Keyvalue === localKeyValue;
                    });
                    unsavedresources = unSavedData;
                }

                var resources = AddedResourceArray.concat(unsavedresources);

                var data = JSON.stringify(resources)

                var Duration = ProjectElementArray[index].Duration;

                if (unSavedDurationarr.length != 0) {
                    var updatedDuration = unSavedDurationarr.filter(function (item) {
                        return item.KeyValue === ProjectElementArray[index].KeyValue;
                    });

                    if (updatedDuration.length != 0) {
                        Duration = updatedDuration[0].Duration;
                    }
                }

                // Creating the tab content HTML
                var tabContent = `
                                <div class="tabdetails" id="${tabId}" role="tabpanel" aria-labelledby="${tabId}">
                                    <div class="row">
                                         <div class="row mt-0">
                                            <div class="col-md-4">
                                                <div class="form-group mb-0 ">
                                                    <div class="demo-content">
                                                        <input id="tags_" class="form-control tags autocomplete-tags appendValue${index}" placeholder="Select Resources">
                                                        <span class="Err_addResourceName${index}" style="display:none;color:red;">Please select the Resource</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-1">
                                                <div class="form-group mb-0 ">
                                                    <button type="button"  title="Add" class="btn-add ex_bt excel_btn addResourceName${index}"><i class="fas fa-plus ex_download"  title="Add" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div class="form-group mb-0 ">
                                                    <label class="control-label mt-2">
                                                        Duration
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group mb-0 ">
                                                    <input type="number" oninput="preventMinusInput(event)" min="1" class="form-control" value='${Duration}' onchange="unSavedDuration(this.value)" />
                                                </div>
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
                
                    // dynamic colmodel
                    var colmodels_${index} = [
                        {
                            name: 'ResourceName',
                            label: 'Resource Name',
                            ignoreCase: true,
                            width: 390,

                        },
                         {
                            name: 'KeyValue',
                            label: 'Key Value',
                            resizable: true,
                            ignoreCase: true,
                            hidden: true,
                            width: 40,
                        },
                        {
                            name: 'Action',
                            label: 'Action',
                            width: 50,
                            search: false,
                            resizable: true,
                            ignoreCase: true,
                            formatter: function (cellvalue, options, rowobject) {

                                return '<div class="justify-center_" style = "justify-content: space-around;" >' +
                                   '<a class="btn-icon -delete"><i class="fas fa-trash" id="DeleteResource" title="Delete"></i></a>'+
                                       '</div >';
                            }
                        },
                    ];

                    // ---------------------------------------------------------------dynamic jqgrid
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

                    //-------------------------------------------------------------dynamic jqgrid filter
                    $('#'+'${gridId}').jqGrid('filterToolbar', {
                        autosearch: true,
                        stringResult: false,
                        searchOnEnter: false,
                        defaultSearch: "cn"
                    });

                    // dynamic jqgrid look 
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

                    //--------------------------------------------------------- Adding Resources to jqgrid after checking duplicates are there
                    $(".addResourceName${index}").click(function ()
                    {
                           //------Added resources to check
                            var newResource = $.trim($('.appendValue${index}').val());
                            newResource = newResource.replace(/^,|,$/g, '');

                            //-------Spliting added resources to check
                            var selectednamearray=newResource.split(',');
                            
                            var gridBindflag = true; 

                            //---------checking Added resources is a valid data added from autosuggest
                            for (var i = 0; i < selectednamearray.length; i++)
                            {
                                var element = selectednamearray[i];
                                var index = $.inArray(element, availableTagsdataid);
  
                                if (index !== -1) {
                                    //alert(element + ' exists');
                                } 
                                else {
                                    //console.log(element);
                                    openEmptyAlert('Please enter valid resource name');
                                    gridBindflag = false;
                                    break; 
                                }
                            }

                           //----------------------If valid resources then proceed to check duplicate
                           if(gridBindflag)
                           {
                               //---------If empty Resources is added then diplay error
                                if(newResource==""){
                                    $(".Err_addResourceName${index}").css("display","block");
                                }
                                else
                                {
                                    $(".Err_addResourceName${index}").css("display","none");
                                }

                                //------------If resource is not empty then check duplicate
                                if (newResource !== "")
                                {
                                    var splitResources = newResource.split(',');
                                    var uniqueResources = [];
                                    var duplicates = [];

                                    //-----------Splitting Unique and duplicate array
                                    for (var i = 0; i < splitResources.length; i++) 
                                    {
                                        var singleResource = $.trim(splitResources[i]);
                                    
                                        if (singleResource !== "") {
                                            if (uniqueResources.includes(singleResource))
                                            {
                                                duplicates.push(singleResource);
                                            }
                                            else 
                                            {
                                                uniqueResources.push(singleResource.trim());
                                            }
                                        }
                                    }

                                    //-------------showing alert if duplicate is there (particular to input field if resource repeated)
                                    if (duplicates.length > 0) {

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
                                        return; 

                                    }

                                    
                                    //------------Taking the grid data in array to check the resources is already present
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
                                    else
                                    {
                                        for(let i=0;i<updatedResourcearr.length;i++)
                                        {
                                            //-----------------handeling added resource in array for overall save
                                                    var ref = document.getElementsByClassName("SaveKeyValue");
                                                    var keyValue = ref[0].textContent;
                                                    var newDataarr = {
                                                        Keyvalue : keyValue,
                                                        ResourceName: updatedResourcearr[i]
                                                    }

                                                    var newRowData = {
                                                    ResourceName: updatedResourcearr[i],
                                                    Action: '<div class="justify-center_" style="justify-content: space-around;">' +
                                                        '<a class="btn-icon -delete"><i class="fas fa-trash" id="DeleteResource" title="Delete"></i></a>' +
                                                        '</div>',
                                                    };

                                                     saveStateArr.push(newDataarr);  
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

        },

        error: function () {

            alert("Error occured!!");

        }
    });

}

//---------------------------function to remove the dynamic script of jqgrid added------------------------------------------------------------------------

function removeScriptTags() {

    var scriptTags = document.querySelectorAll("script[data-dynamic-script]");

    scriptTags.forEach(function (scriptTag) {

        document.head.removeChild(scriptTag);

    });

}

//-------------------------Auto suggest drop down code---------------------------------------------------------------------------------------------------

var availableTags = [];
var usersMap = {};
var availabledata = [];

// Handels initializing of auto complete
$(document).on("focus", ".autocomplete-tags", function () {

    // hiding loader
    $('#loader').hide();
    $('#loader').css('visibility', 'hidden');

    // taking reference of the input filed and passing to function
    initializeAutocomplete(this);

    /*console.log(this);*/

});

// Handel the autocomplete on keyup of input field
function initializeAutocomplete(inputField) {



    var rowId = $(inputField).data("rowid");

    var terms = [];

    // Function to update the visible input field with selected values
    selectedValues = [];
    function updateVisibleInput() {

       /* console.log(selectedValues);*/

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


                        availableTagsdataid.push(element.trim())
                        usersMap[element.UserName] = element.UserId;

                    });

                    // Filter the suggestions to remove already selected values

                    var filteredData = data.filter(function (item) {

                        return !selectedValues.includes(item);

                    });

                      response(filteredData);

                },

                error: function (xhr, status, error) {

                /*    console.error(error);*/

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

            //console.log('selectedValues', selectedValues);

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

// Handel the autocomplete on Keydown of input field
$(function () {

    function split(val) {

        return val.split(/,\s*/);

    }



    function extractLast(term) {

        return split(term).pop();

    }


    // handel key down of input field
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

// functions to extractlast term 
function extractLast(term) {

    return split(term).pop();

}

// functions to split value
function split(val) {

    return val.split(/,\s*/);

}

//-----------------------------------------------------------------------delete functionlity--------------------------------------------------------------

var rowId;
var jqGridName;
var keyValue;
var ResourceNameToDelete;
var templateId;
$(document).on('click', '.-delete', function (e) {

    e.preventDefault();

    rowId = $(this).closest('tr').attr('id');

    var jqGridTable = $(this).closest('table');

    jqGridName = jqGridTable.attr('id');

    ResourceNameToDelete = jqGridTable.jqGrid('getCell', rowId, 'ResourceName');

    var gridnumber = jqGridName.charAt(jqGridName.length - 1);

    var labelElement = document.getElementById("keyvalue-" + gridnumber);

    keyValue = labelElement.textContent;

    templateId = $("#TMTemplateName").val();

    var removefromsavestatearr = {
        Keyvalue: keyValue,
        ResourceName: ResourceNameToDelete
    }

    $('#Deletetemplateresourcename').modal('show');

    var count = 0;
    
    $('#deleteResource').off('click').on('click', function () {
        
        $.ajax({
            type: "POST",
            url: ROOT + "ProjectMaster/TemplateResourceNameDelete",
            data: {
                ResourceName: ResourceNameToDelete,
                keyValue: keyValue,
                TemplateId: templateId
            },
            success: function (response) {

                $('#loader').show();
                $('#loader').css('visibility', 'visible');

                if (response == "success") {

                    $("#" + jqGridName).jqGrid("delRowData", rowId);

                    saveStateArr = saveStateArr.filter(item => !(item.Keyvalue === removefromsavestatearr.Keyvalue &&
                        item.ResourceName === removefromsavestatearr.ResourceName));

                    showSuccessMessage("Resources Deleted Successfully");

                    $('#SearchTMData').click();
                }
            },
            error: function (error) {
                alert(error);
            }
        });
        $('#Deletetemplateresourcename').modal('hide');
    });

     $('#cancelDeleteResource').off('click').on('click', function () {

        $('#Deletetemplateresourcename').modal('hide');
    });


   
});

//-----------------------------------------------------------------------tab remove active functionlity----------------------------------------------------------

let activeButton = null;

$(document).on("click", ".dynamic-button", function () {
    if (activeButton !== null) {
        activeButton.removeClass("active");
    }

    activeButton = $(this);
    activeButton.addClass("active");
});

//-------------------------------------------success alert for delete and save functionlity---------------------------------------------------------------------

function showSuccessMessage(message) {
    $("#SaveDeleteSuccessAlert strong").text(message);
    $("#SaveDeleteSuccessAlert").fadeIn().delay(3000).fadeOut();
}

// --------------------------------------------------------- Show modal and close for empty data is searched, exported or saved---------------------------------

function openEmptyAlert(message) {

    $("#EmptyAlertbody").text(message);
    $("#EmptyAlert").modal("show");

}


$("#closeEmptyAlert").on("click", function () {

    $("#EmptyAlert").modal('hide');

});


//----------------------------------------------------------Excel save functionality----------------------------------------------------------------------------
$("#ExcelDownload").click(function () {

    var templateName = $("#TMTemplateName").val();

    if (templateName == "" || templateName == "Select TemplateName") {

        //$("#alertExcelEmpty").modal('show');
        openEmptyAlert("No Data Available for Export");

    }
    else
    {
        // Make an AJAX request to the controller to fetch the data
        $.ajax({

            url: ROOT + 'ProjectMaster/GetExcelTemplateMasterData',
            type: 'GET',
            data: {
                templateName: templateName
            },
            xhrFields: {
                responseType: 'blob' // This indicates that the response will be binary data (a blob)
            },
            success: function (response) {
                // Call the function to save the Excel data as a file
                saveData(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'TemplateMasterData.xlsx');
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
/*---------------------------------------------------------------------function to prevent negative number-----------------------------------------------------*/

function preventMinusInput(event) {
    const input = event.target;
    const currentValue = input.value;
    const newValue = currentValue.replace(/-/g, '').replace(/^0+/, ''); // Remove all minus symbols
    input.value = newValue;
}

/*---------------------------------------------------------------------Handel Duration changes overall save-----------------------------------------------------*/

function unSavedDuration(duration) {

    var ref = document.getElementsByClassName("SaveKeyValue");
    var keyValue = ref[0].textContent;

    const index = unSavedDurationarr.findIndex(element => element.KeyValue === keyValue);

    if (index !== -1) {
        // If the ID is already present in the array, update its value
        unSavedDurationarr[index].Duration = duration;
    } else {
        // If the ID is not present, add a new object to the array
        unSavedDurationarr.push({ KeyValue:keyValue , Duration: duration });
    }
}

/*---------------------------------------------------------------------save functionality--------------------------------------------------------------*/
$("#saveButton").on("click", function () {

    var templateName = $("#TMTemplateName").val();

    if (templateName == "" || templateName == "Select TemplateName") {

        openEmptyAlert("Please Select a Template");

    }

    else if ((saveStateArr.length == 0) && (unSavedDurationarr.length == 0)) {

        openEmptyAlert("There is No Data to Save");

    }

    else {

        SaveAlertMessage("Are you sure you want to save the details?");

        $('#saveResources').off('click').on('click', function () {

            $("#SaveConfirmPopup").modal('hide');

            $('#loader').show();
            $('#loader').css('visibility', 'visible');

            $.ajax({
                type: "POST",
                url: ROOT + "ProjectMaster/UpdateTemplateMasterResource",
                data: {
                    resourcesToSave: JSON.stringify(saveStateArr),
                    durationToSave: JSON.stringify(unSavedDurationarr)
                },
                success: function (response) {
                    saveStateArr = [];
                    unSavedDurationarr = [];
                    showSuccessMessage("Data saved Successfully");
                    $('#SearchTMData').click();

                },
                error: function (error) {
                    alert(error);
                }
            });
        });

        $('#cancelSaveResources').off('click').on('click', function () {
            $("#SaveConfirmPopup").modal('hide');
        });

    }
});

function SaveAlertMessage(message) {

    $("#SaveConfirmPopup span").text(message);
    $("#SaveConfirmPopup").modal('show');

}
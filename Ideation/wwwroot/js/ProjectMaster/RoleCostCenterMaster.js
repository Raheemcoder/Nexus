var capturedTemplate;
var capturedRole;

var ValidateDataToSave = [];
var gridBindflag = true;
var selectedValues = [];
var availableTagsdataid = [];

var saveStateArr = [];
var CostCenterNamesArray = []; 


$("#SaveDeleteSuccessAlert").hide();

//--------------------------------------Handeling the Search--------------------------------------------------------------------------------------------------

$("#roleCostCenterLink").click(function (e) {

    e.preventDefault();

    $.ajax({

        type: "GET",

        url: ROOT + "ProjectMaster/GetRoleCostCenterMasterData",

        dataType: "json",

        success: function (response) {

            var responseData = JSON.parse(response);

            var templateDataArray = responseData.RoleCostCenterMaster;

            const tabdiv = document.getElementById('v-pills-tab');

            const tabcontentdiv = document.getElementById('v-pills-tabContent');

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

            for (let index = 0; index < templateDataArray.length; index++) {

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
                                 <lable style='display:none' id='Role-${index}'>${templateDataArray[index].Role}</lable>
                                <span><strong>${templateDataArray[index].Role}</strong></span>

                            </div>

                        </div>

                        </div>

                        `;


                // Code for Search input filtering Based on RoleName
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

                    capturedRole = templateDataArray[index].Role;
                    PostTabData(templateDataArray[index].Role);

                });

                tabbuttondiv.appendChild(button);

            }

            tabdiv.appendChild(tabbuttondiv);

            const firstButton = tabbuttondiv.querySelector('.dynamic-button');

            if (firstButton && capturedRole == undefined) {
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

});

//------------------------------------code to post tabdata to backend and get the response and add jqgrid dynamically-------------------------------------------
var SelectedRoleName = '';
function PostTabData(roleName) {
    SelectedRoleName = roleName;

    $.ajax({

        type: "GET",

        url: ROOT + "ProjectMaster/GetRoleCostCenterMasterData",

        data: {
            Rolename: roleName
        },

        success: function (response) {

            var responseData = JSON.parse(response);

            var RoleCostCenterArray = responseData.RoleCostCenterMaster;

            var AddedCostCenterArray = responseData.AddedCostCenter;

            removeScriptTags();

            $(".tabdetails").remove();

            for (var index = 0; index < RoleCostCenterArray.length; index++) {

                var tabId = "v-pills-tabpanel-" + index;
                var gridId = "TemplateMaster-jqgrid-" + index;
                var pagerId = "TemplateMaster-jqgrid-pager-" + index;

                var unsavedCostCenters = [];

                if (saveStateArr.length != 0) {
                    var unSavedData = saveStateArr.filter(function (item) {
                        return item.CapturedRole === capturedRole;
                    });
                    unsavedCostCenters = unSavedData;
                }

                var unsavedCostCentersFormated = [];
                for (let i = 0; i < unsavedCostCenters.length; i++) {
                    var newDataarr = {
                        CostCenterName: unsavedCostCenters[i].CostCenter
                    }
                    unsavedCostCentersFormated.push(newDataarr);
                }

                var costCenters = AddedCostCenterArray.concat(unsavedCostCentersFormated);

                var data = JSON.stringify(costCenters)

                // Creating the tab content HTML
                var tabContent = `
                                           <div class="tabdetails" id="${tabId}" role="tabpanel" aria-labelledby="${tabId}">
                                           <div class="row">
                                            <div class="col-md-2" style="display:flex;align-items:center;">
                                                <span>Cost Center : </span>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group mb-0">
                                                    <div class="demo-content">
                                                        <input id="costcenter" class="form-control autoSuggestValue  appendValue${index}" placeholder="Please Select CostCenter">
                                                        <span class="Err_addResourceName${index}" style="display:none;color:red;">Please select the CostCenterName</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-1">
                                                <div class="form-group mb-0">
                                                    <button type="button" title="Add" class="btn-add ex_bt excel_btn addResourceName${index}">
                                                        <i class="fas fa-plus ex_download" title="Add" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        
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
                            name: 'CostCenterName',
                            label: 'Cost Center Name',
                            ignoreCase: true,
                            width: 390,

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
                       
                           //var selectednamearray=newResource.split(',');
                           var selectedname=newResource.trim();

                          var gridBindflag = true; 

                            //for (var i = 0; i < selectednamearray.length; i++)
                            //{
                            //  var element = selectednamearray[i];
                            //  var index = $.inArray(element, CostCenterNamesArray);
                            //  if (index !== -1) {
                            //  } else {
                            //    openEmptyAlert('Please enter valid Cost center');
                            //    gridBindflag = false;
                            //    break; // Use 'break' to exit the loop
                            //  }
                            //}
                           
                              var element = selectedname;
                              var index = $.inArray(element, CostCenterNamesArray);
                              if (index !== -1) {
                              } else {
                                 $("#costcenter").val('');
                                openEmptyAlert('Please enter valid Cost center');
                                gridBindflag = false;
                              }
                            

                           
                   if(gridBindflag){
                       if(newResource==""){
                           $(".Err_addResourceName${index}").css("display","block");
                       }
                       //else if(isexit==0){
                       //$(".Err_addResourceName${index}").css("display","block");
                       //}
                       else{
                            $(".Err_addResourceName${index}").css("display","none");
                       }
                            

                            if (newResource !== "") {
                            var splitResources = newResource;
                             var uniqueResources = [];
                                var duplicates = [];

                                //for (var i = 0; i < splitResources.length; i++) {
                                //    var singleResource = $.trim(splitResources[i]);
                                    
                                //    if (singleResource !== "") {
                                //        if (uniqueResources.includes(singleResource)) {
                                //            duplicates.push(singleResource);
                                //        } else {
                                //            uniqueResources.push(singleResource.trim());
                                //        }
                                //    }
                                //}
                                var singleResource = splitResources.trim();
                                    //if (duplicates.length > 0) {
                                    //    //alert('Duplicate resources found: ' + duplicates.join(', ') + '. Duplicates are not allowed.');
                                    //     openEmptyAlert('Duplicate resources found: ' + duplicates.join(', ') + '. Duplicates are not allowed.');
                                    //    singleResource="";
                                    //    return; // Stop processing if duplicates are found
                                    //}

                            var newRowDataArray = [];
                             var collectedResources = [];

                            var grid =$('#'+'${gridId}');
                             var allResources = grid.jqGrid('getCol', 'CostCenterName');

                            allResources.forEach(function(resource) {
                                collectedResources.push(resource.trim());
                            });

                            //for (var i = 0; i < splitResources.length; i++) {
                                //var singleResource = $.trim(splitResources[i]);



                                 var singleResource = splitResources.trim();
                                 if (collectedResources.includes(singleResource)) {
                                     $("#costcenter").val('');
                                 openEmptyAlert('Duplicate CostCenter "' + singleResource + '" found. Duplicates are not allowed.');

                                 singleResource="";
                                 return;
                                 }




                                //if (singleResource !== "") {
                                //    if (collectedResources.includes(singleResource)) {
                                //    //alert('Duplicate resource "' + singleResource + '" found. Duplicates are not allowed.');
                                //     openEmptyAlert('Duplicate resource "' + singleResource + '" found. Duplicates are not allowed.');
                                //    singleResource="";
                                //   return;

                                //}
                                     if(singleResource!="")
                                    {
                                        var newDataarr = {
                                            CapturedRole : capturedRole,
                                            CostCenter: singleResource
                                        }

                                        var newRowData = {
                                        CostCenterName: singleResource,
                                       Action: '<div class="justify-center_" style="justify-content: space-around;">' +
                                            '<a class="btn-icon -delete"><i class="fas fa-trash" id="DeleteResource" title="Delete"></i></a>' +
                                            '</div>',
                                    };

                                    }
                                    
                                    newRowDataArray.push(newRowData);
                                    saveStateArr.push(newDataarr);
                                //}
                            //}

                        }
                            // Get reference to the grid
                            var grid =$('#'+'${gridId}');

                            // Add the new row to the jqGrid
                            grid.jqGrid('addRowData', undefined, newRowDataArray);

                            // Clear the input field after adding the row
                            $('.appendValue${index}').val('');
                          
                       }
                       

                        
                    });
                  

                `;

                // Append the script tag to the head of the document
                document.head.appendChild(scriptTag);
                availableTagsdataid = [];

            }
            /* ValidateDataToSave = SaveResourcesData("forValidate");*/
        },

        error: function () {

            alert("Error occured!!");

        }


    });

}

//---------------------------function to remove the dynamic script of jqgrid added------------------------------------------------------------------------------

function removeScriptTags() {

    var scriptTags = document.querySelectorAll("script[data-dynamic-script]");

    scriptTags.forEach(function (scriptTag) {

        document.head.removeChild(scriptTag);

    });

}

//-------------------------Multi suggest drop down code---------------------------------------------------------------------------------------------------------
//For Providing Autosuggest values for ProjectBriefId field
$(document).on("click", ".autoSuggestValue", function () {
    $(".autoSuggestValue").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: ROOT + "ProjectMaster/GetCostCenterNames", 
                type: 'GET',
                dataType: 'json',
                data: { term: request.term }, // Change 'autoSuggestValue' to 'term'
                success: function (data) {
                    $('#loader').hide();
                    $('#loader').css('visibility', 'hidden');
                    var suggestions = data.map(item => item.Name);
                    response(suggestions);
                },
                error: function () {
                    console.log("Error Occurred");
                }
            });
        },
        minLength: 1
    });
});


//-----------------------------------------------------------------------delete functionlity---------------------------------------------------------------------

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

    CostCenterNameToDelete = jqGridTable.jqGrid('getCell', rowId, 'CostCenterName');

    var gridnumber = jqGridName.charAt(jqGridName.length - 1);

    var labelElement = document.getElementById("Role-" + gridnumber);

    Role = capturedRole;

    var removefromsavestatearr = {
        CapturedRole: capturedRole,
        CostCenter: CostCenterNameToDelete
    }

    $('#Deletetemplateresourcename').modal('show');

    $('#deleteResource').on('click', function () {
        $.ajax({
            type: "POST",
            url: ROOT + "ProjectMaster/RoleCostCenterNameDelete",
            data: {
                CostCenterName: CostCenterNameToDelete,
                Role: Role,
            },

            success: function (response) {
                $('#loader').show();
                $('#loader').css('visibility', 'visible');
                if (response == "success") {

                    $("#" + jqGridName).jqGrid("delRowData", rowId);

                    saveStateArr = saveStateArr.filter(item => !(item.CapturedRole === removefromsavestatearr.CapturedRole &&
                        item.CostCenter === removefromsavestatearr.CostCenter));

                    showSuccessMessage("Cost Centers Deleted Successfully");

                    $('#roleCostCenterLink').click();
                }
            },
            error: function (error) {
                alert(error);
            }
        });
        $('#Deletetemplateresourcename').modal('hide');
    });

    $('#cancelDeleteResource').on('click', function () {

        $('#Deletetemplateresourcename').modal('hide');
    });



});

//-----------------------------------------------------------------------tab remove active functionlity---------------------------------------------------------

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

// --------------------------------------------------------- Show modal and close for empty data is searched, exported or saved-----------------------------------

function openEmptyAlert(message) {

    $("#EmptyAlertbody").text(message);
    $("#EmptyAlert").modal("show");

}


$("#closeEmptyAlert").on("click", function () {

    $("#EmptyAlert").modal('hide');

});


//----------------------------------------------------------Excel save functionality----------------------------------------------------------------------------
$("#ExcelDownload").click(function () {
    // Make an AJAX request to the controller to fetch the data
    $.ajax({

        url: ROOT + 'ProjectMaster/GetExcelRoleCostCenterMasterData',
        type: 'GET',
        xhrFields: {
            responseType: 'blob' // This indicates that the response will be binary data (a blob)
        },
        success: function (response) {
            // Call the function to save the Excel data as a file
            saveData(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'RoleCostCenter.xlsx');
        },
        error: function () {
            alert('Error fetching data');
        }
    });

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

//----------------------------------------------------------------------save functionality---------------------------------------------------------------------
$("#saveButton").on("click", function () {


    if (saveStateArr.length == 0) {

        openEmptyAlert("There is No Data to Save");

    }
    else {

        SaveAlertMessage("Are you sure you want to save the details?");

        $('#saveResources').on('click', function () {
            $("#SaveConfirmPopup").modal('hide');

            $('#loader').show();
            $('#loader').css('visibility', 'visible');

            // Now you have the data to save, send it via AJAX
            $.ajax({
                type: "POST",
                url: ROOT + "ProjectMaster/UpdateRoleCostCenterName",
                data: {
                    dataToSave: JSON.stringify(saveStateArr)
                },
                success: function (response) {

                    saveStateArr = [];
                    showSuccessMessage("Cost Centers Details saved Successfully");
                    $('#roleCostCenterLink').click();

                },
                error: function (error) {
                    alert(error);
                }
            });
        });

        $('#cancelSaveResources').on('click', function () {
            $("#SaveConfirmPopup").modal('hide');
        });

    }

});

function SaveAlertMessage(message) {

    $("#SaveConfirmPopup span").text(message);
    $("#SaveConfirmPopup").modal('show');

}


$.ajax({
    type: "GET",
    url: ROOT + "ProjectMaster/GetCostCenterValues",
    dataType: "json",
    success: function (data) {
        CostCenterNamesArray = data;
    },
    error: function (xhr, status, error) {
        console.error("Error fetching names:", error);
    },
});

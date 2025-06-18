var TemplateDataList = $('#TemplateDataList').val();
var availableTagsdataid = [];
var namesArray = []; 


if (TemplateDataList == "") {
    TemplateDataList = [];
}
else {
    TemplateDataList = $.parseJSON($('#TemplateDataList').val());
}
colmodels = [
    {
        name: 'Role',
        label: 'Role Name',
        resizable: true,
        ignoreCase: true,
        width: 70,
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

        name: 'HODName',
        label: 'HOD Name',
        resizable: true,
        ignoreCase: true,
        width: 160,
        formatter: function (cellvalue, options, rowobject) {
            var rowId = options.rowId;
            if (cellvalue == 'Draft' || cellvalue === null || cellvalue === '' || cellvalue === undefined) {
                return '<div class="demo-content">' +
                    '<input id="tags_' + rowId + '" class="form-control tags autocomplete-tags appendValue" data-rowid="' + rowId + '" placeholder="Enter HOD Name">' +
                    '</div>';
            } else {
                return '<div class="demo-content">' +
                    '<input id="tags_' + rowId + '" class="form-control tags autocomplete-tags appendValue" data-rowid="' + rowId + '" value="' + cellvalue + '">' +
                    '</div>';
            }
        }

    }

],

    $(document).ready(function () {
        loadjqgrid([]);
        $("#closeSearchProjectIdError").on("click", function () {
            $("#alertEmptyTemplateSearch").modal('hide');
        });
        $("#closeExcelError").on("click", function () {
            $("#alertExcelEmpty").modal('hide');
        });



    });
function loadjqgrid(data) {
    $.jgrid.gridUnload('#RHMJqgrid');
    //Jqgrid for Role HOD Master
    $("#RHMJqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_RHMJqgrid',
        rowNum: data.length,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#RHMJqgrid tbody tr");
            var objHeader = $("#RHMJqgrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            $.each(document.getElementsByClassName("appendvalue"), function () {
                console.log(new Date());
                if ($.trim($(this).attr('data')) != '') {
                    $(this).val($.trim($(this).attr('data')).split(','));
                }
            })
            $('.appendvalue').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true,
                numberDisplayed: 1,
                enableCaseInsensitiveFiltering: true,
                allSelectedText: 'All Selected'
            });

        },
    });


    $("#RHMJqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn",

    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
}
$(document).ready(function () {
    loadjqgrid([]);
    $("#closeSearchProjectIdError").on("click", function () {
        $("#alertEmptyTemplateSearch").modal('hide');
    });
    $("#closeExcelError").on("click", function () {
        $("#alertExcelEmpty").modal('hide');
    });

});
var newArray = []

// Handeling the Search
$('#SearchTMData').on('click', function () {
    var templateName = $("#TemplateName").val();
    if (templateName == "" || templateName == "Select TemplateName") {

        $("#alertEmptyTemplateSearch").modal('show');

    }
    else {
        $.ajax({
            type: "GET",
            url: ROOT + "ProjectMaster/GetRoleHODMasterHeaderData",
            data: {
                TemplateName: templateName,
            },
            success: function (App_Results) {
                App_jsons = JSON.parse(App_Results);
                for (var i = 0; i < App_jsons.length; i++) {
                    var element = App_jsons[i].HODName;
                    if (element === "" || element == null) {
                        continue;
                    }
                    else if (!newArray.includes(element)) {
                        newArray.push(element);
                        availableTagsdataid.push(element);
                    }
                }
                //$.jgrid.gridUnload('#TMJqgrid');
                loadjqgrid(App_jsons);



            },

            error: function () {
                alert("Error occured!!");
            }
        });
    }
});

var Newflag = false;
//This function get the column data for the grid and pass to controller using ajax
var modifiedData = [];
var HODNameData = [];

$("#saveButton").click(function () {
    var  DuplicateFound = true;
    var templateName = $("#TemplateName").val();

    if (templateName == "" || templateName == "Select TemplateName") {

        $("#alertEmptyHodNameSave").modal('show');

    }
    else {
        // Loop through each row in the grid
        $("#RHMJqgrid").find("tbody > tr").each(function (index, row) {
            var rowData = $("#RHMJqgrid").jqGrid("getRowData", row.id);

            // Get the values of the editable "Resources" field and the hidden "KeyValue" field
            var hodValue = $(row).find("input.tags").val();


            if (hodValue !== undefined && hodValue !== null) {
                // Split the hodValue into an array of values using a comma as the separator
                var values = hodValue.split(',');

                // Check for duplicate values
                var uniqueValues = [];

                for (var i = 0; i < values.length; i++) {
                    var value = values[i].trim(); // Trim to remove any leading/trailing spaces

                    if (uniqueValues.indexOf(value) === -1) {
                        uniqueValues.push(value); // Add to uniqueValues if it doesn't exist

                    }

                    else {
                        DuplicateFound = false;
                        hodValue = uniqueValues.join(', ');

                        $(row).find("input.tags").val(hodValue);

                        // Show an alert to notify the user
                        openEmptyAlert('Duplicate values are not Allowed');
                        

                    }

                }

            }

            var role = rowData.Role;
            // Create an object representing the modified row
            if (hodValue !== rowData.cellvalue) {
                var modifiedRow = {
                    templateName: templateName,
                    hodName: hodValue,
                    role: role,
                };

                // Add the modified row to the array
                modifiedData.push(modifiedRow);
            }

        });
        for (var i = 0; i < modifiedData.length; i++) {
            if (availableTagsdataid.indexOf(modifiedData[i].hodName) === -1) {
                Newflag = true;
                break;
            }
        }

        for (var i = 0; i < modifiedData.length; i++) {
            var element = modifiedData[i].hodName;
            if (element === "") {
                continue;
            }
            else if (!HODNameData.includes(element)) { // Check if element is not in HODNameData
                HODNameData.push(element); // Insert element into HODNameData
            }
        }

        var loppbreak = false;
        if (availableTagsdataid.length > 0) {

            for (var i = 0; i < HODNameData.length; i++) {
                var elementrow = HODNameData[i].split(',');

                for (var name = 0; name < elementrow.length; name++) {
                    elementrow[name] = elementrow[name].replace(/^,|,$/g, '');
                    
                    if (elementrow[name].length > 0) {

                        var index = namesArray.indexOf(elementrow[name].trim().toLowerCase());

                    }

                    if (index !== -1) {
                        
                        Newflag = true;
                    } else {
                        
                        openEmptyAlert('Please enter valid resource name');
                        modifiedData = [];
                        HODNameData = [];
                        Newflag = false;
                        loppbreak = true
                        break; // Use 'break' to exit the loop
                    }
                }
                if (loppbreak) {
                    break;
                }
            }
        }

        if (Newflag && DuplicateFound) {
            // Send the modified data to the server-side controller
            if (modifiedData == "") {
                $("#alertEmptySave").modal('show');
            }
            else {
                $("#SaveConfirmPopup").modal('show');

                $('#saveResources').on('click', function () {
                    $("#SaveConfirmPopup").modal('hide');
                    $('#loader').show();
                    $('#loader').css('visibility', 'visible');
                    $.ajax({
                        url: ROOT + "ProjectMaster/UpdateRoleHODName",
                        type: "POST",
                        data: { modifiedData: JSON.stringify(modifiedData) },
                        success: function (data) {
                            modifiedData = [];
                            if (data.success) {
                                showAlertMessage('Updated HOD Name Successfully', 'alert-success');
                                $('#ResourcePopup').modal('hide');
                                $.ajax({
                                    url: ROOT + "ProjectMaster/GetRoleHODMasterHeaderData",
                                    type: "GET",
                                    data: { TemplateName: templateName },
                                    success: function (App_Results) {

                                        App_jsons = JSON.parse(App_Results);
                                        loadjqgrid(App_jsons);
                                    },
                                    error: function (xhr, status, error) {
                                        // Handle any errors
                                        alert(error);
                                    }
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            // Handle any errors
                            alert(error);
                        }
                    });
                });

                $('#cancelSaveResources').on('click', function () {
                    $("#SaveConfirmPopup").modal('hide');
                });

            }
        }
    }

});
function showAlertMessage(message, alertClass) {
    // Set the message text and class for the alert
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);

    // Show the alert message
    $('#alertMessage').show();

    // Hide the alert message after a few seconds (optional)
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}

// Handel the ExcelDownload
$("#ExcelDownload").click(function () {
    isExport = true;



    var grid = $("#RHMJqgrid");



    // Get the total number of records in the grid (including filtered ones)
    var totalRecords = grid[0].p.reccount;


    // Check if there is no data available after filtering
    if (totalRecords === 0) {
        $("#alertExcelEmpty").modal('show');
    } else {
        try {
            // Get the current search filter from the jqGrid
            var postData = grid.jqGrid("getGridParam", "postData");
            var searchFilter = postData.filters;



            // Get the data from the currently displayed rows in the grid (including filtered data)
            var data = grid.jqGrid("getGridParam", "data");



            // If there's a search filter applied, use it to filter the data
            var filteredData = data;
            if (searchFilter && searchFilter !== "") {
                var filterObj = $.parseJSON(searchFilter);
                filteredData = $.grep(data, function (row) {
                    var match = true;
                    $.each(filterObj.rules, function (index, rule) {
                        if (row[rule.field].toString().toLowerCase().indexOf(rule.data.toLowerCase()) === -1) {
                            match = false;
                            return false; // Break the loop
                        }
                    });
                    return match;
                });
            }



            // Get the column names and indexes
            var colModel = grid.jqGrid("getGridParam", "colModel");
            var visibleColumns = [];
            var hiddenColumnIndex = -1;



            for (var i = 0; i < colModel.length; i++) {

                visibleColumns.push(colModel[i].name);

            }



            // Remove the hidden column data from the exported data
            var filteredDataForExport = filteredData.map(function (row) {
                var filteredRow = {};
                visibleColumns.forEach(function (columnName) {

                    if (columnName !== "KeyValue") {
                        filteredRow[columnName] = row[columnName];
                    }

                });
                return filteredRow;
            });




            var excelData = [];
            var headers = Object.keys(filteredDataForExport[0]);

            excelData.push(headers);



            filteredDataForExport.forEach(function (row) {
                var rowData = [];
                headers.forEach(function (header) {
                    rowData.push(row[header]);
                });
                excelData.push(rowData);
            });



            // Create a new workbook and worksheet using "exceljs"
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("Sheet1");



            // Add data to the worksheet
            worksheet.addRows(excelData);



            // Apply bold font style to the first row (header row)
            worksheet.getRow(1).font = { bold: true };



            // Save the workbook as an Excel file
            workbook.xlsx.writeBuffer().then(function (data) {
                var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download = "RoleHODMaster.xlsx";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }).catch(function (err) {
                alert("Error while exporting data: " + err);
            });
        } catch (err) {
            alert(err);
        }
    }



    isExport = false;
});




$(document).on("focus", ".autocomplete-tags", function () {

    $('#loader').hide();

    $('#loader').css('visibility', 'hidden');

    initializeAutocomplete(this);

    /*console.log(this);*/

});



var availableTags = [];

var usersMap = {};

var availabledata = [];



function initializeAutocomplete(inputField) {



    var rowId = $(inputField).data("rowid");

    //console.log(rowId);


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

                url: ROOT + "ProjectMaster/GetHODNames",

                dataType: "json",

                data: { term: term },

                success: function (data) {
                    console.log('data', data)
                    //availableTags = [];

                    usersMap = {};



                    data.forEach(element => {



                        availableTags.push({

                            label: element,

                            value: element

                        });

                        availableTagsdataid.push(element.trim())

                        usersMap[element.UserName] = element.UserId;

                    });
                    console.log(availableTagsdataid);
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

            if (!term.includes(ui.item.value.trim())) {

                //selectedValues.push(ui.item.value);

                term.push(ui.item.label.trim());

            } else {

                openEmptyAlert('Duplicate selection is not allowed');

            }

            term.forEach(item => {

                selectedValues.push(item.trim());

            });

            //selectedValues.push('');

            /* console.log('selectedValues', selectedValues);*/

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
                debugger
                $.ajax({

                    url: ROOT + "ProjectMaster/GetHODNames", // Replace with the actual URL of the controller method

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

function openEmptyAlert(message) {

    $("#EmptyAlertbody").text(message);
    $("#EmptyAlert").modal("show");
}

$("#closeEmptyAlert").on("click", function () {

    $("#EmptyAlert").modal('hide');

});
$.ajax({
    type: "GET",
    url: ROOT+ "ProjectMaster/GetResources",
    dataType: "json",
    success: function (data) {
        namesArray = data;
    },
    error: function (xhr, status, error) {
        console.error("Error fetching names:", error);
    },
});


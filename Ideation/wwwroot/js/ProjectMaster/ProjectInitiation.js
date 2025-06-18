var SetProjectMasterDataList;
SetProjectMasterDataList = $('#ProjectMasterHeaderDataList').val();

if (SetProjectMasterDataList == undefined) {
    SetProjectMasterDataList = [];
}
else {
    SetProjectMasterDataList = $.parseJSON($('#ProjectMasterHeaderDataList').val());
}
$(document).ready(function () {

    var Role = $("#Role").val();
    if (Role == "DeptTL" || Role == "L1 Approver" || Role == "HOD" || Role == "View Role")
    {
        $(".CreateProject").hide();
        $(".hide-icon").hide();
    }

    var toAppend = '<option value="All">All</option>';
    $('#PMSearchItemType').prepend(toAppend);
    $('#PMSearchItemType').val('All');

});

// colmodel for jqgrid
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 60,
        search: false,
        resizable: true,
        ignoreCase: true,

        formatter: function (cellvalue, options, rowobject)
        {
            return '<div class="d-flex justify-content-center">'
                +
                ((rowobject.ProjectId != null)
                    ?'<a onclick="BudgetUsers(\'' + rowobject.ProjectId + '\')" class="btn-icon deptusers -deptUser" style="cursor:pointer;" title="Department Budget Users"><i class="fas fa-user-friends" title="Department Budget Users"></i></a>'
                    : '<i></i>') /*DBU icon*/
                +

                (((rowobject.ProjectBriefId != null) && (rowobject.ProjectId == null) && (rowobject.SAPStatus == null))
                    ? '<a onclick="AddHiddenData(\'' + rowobject.ProjectBriefId + '\' ,  \'' + rowobject.Product + '\' ,  \'' + rowobject.ProjectCode + '\',  \'' + rowobject.ProjectDescription + '\') " class="btn-icon -view" title="Add"><i class="fas fa-plus" title="Add" style="cursor:pointer;" ></i></a>'
                    : '<i></i>') /*Plus icon*/
                +

                (((rowobject.ProjectId != null) || ((rowobject.SAPStatus == "E") || (rowobject.SAPStatus == "S")))
                    ? '<a id="ViewProjectDatabtn" class="btn-icon -edit" title="Info" onclick="GetViewData(\'' + rowobject.ProjectCode + '\')" style="cursor:pointer;"> <i class="fas fa-info" title="Info"></i></a>'
                    : '<i></i>') /*i icon*/
                +

                ((rowobject.SAPStatus == 'E')
                    ? '<a onclick="SendProjectCode(\'' + rowobject.ProjectCode + '\') " class="btn-icon -warning" style="cursor:pointer;" title="Post SAPStatus"><i class="fas fa-rotate-right" title="SAP Remarks" ></i></a>'
                    : '<i></i>') /*reverse icon*/

                +
                ((rowobject.ProjectId != null)
                    ? '<a class="btn-icon -view resourcedata" onclick="NavigateProjectResource(\'' + rowobject.ProjectId + '\')" style="cursor:pointer;" title="Link to Project Resource Master"><i class="fas fa-users" title="Link to Project Resource Master"></i></a>'
                    : '<i></i>') /*PRM icon*/
                '</div>';
        }
    },
    {
        name: 'ProjectBriefId',
        label: 'Project Brief ID',
        resizable: true,
        ignoreCase: true,
        width: 80,
    },
    {
        name: 'Product',
        label: 'Product Name',
        resizable: true,
        ignoreCase: true,
        width: 160,
    },
    {
        name: 'ItemType',
        label: 'Item Type',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ProjectId',
        label: 'Project ID',
        resizable: true,
        ignoreCase: true,
        width: 90,
        classes: "Project",
    },
    {
        name: 'StartDate',
        label: 'Start Date',
        resizable: true,
        ignorecase: true,
        width: 80,

    },
    {
        name: 'EndDate',
        label: 'End Date',
        resizable: true,
        ignorecase: true,
        width: 80,

    },
    {
        name: 'Template',
        label: 'Template',
        resizable: true,
        ignorecase: true,
        width: 80,
    },
    {
        label: 'Created Date',
        name: 'CreatedDate',
        resizable: true,
        ignorecase: true,
        width: 80,

    },
    {
        name: 'Legacy',
        label: 'Legacy',
        resizable: true,
        width: 100,
        ignoreCase: true,
        search: true,
        //hidden: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.Legacy == 'Yes') {
                return '<span class="true">Yes</span>'
            }
            else {
                return '<span class="">No</span>'
            }
        }
    },
],

// Jqgrid for project Initiation
$("#PMJqgrid").jqGrid({
    url: '',
    mtype: 'GET',
    datatype: 'local',
    data: SetProjectMasterDataList,
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_PMJqgrid',
    rowNum: SetProjectMasterDataList.length,
    shrinkToFit: true,
    scroll: 1,
    autoResizing: true,

    gridComplete: function () {

        $(".true").closest("tr").find("td.Project").addClass("legacy_color");
        var objRows = $("#PMJqgrid tbody tr");
        var objHeader = $("#PMJqgrid tbody tr td");

        if (objRows.length > 1) {
            var objFirstRowColumns = $(objRows[1]).children("td");
            for (i = 0; i < objFirstRowColumns.length; i++) {
                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            }
        }
        var Role = $("#Role").val();
        if (Role == "DeptTL" || Role == "L1 Approver" || Role == "HOD" || Role == "View Role") {
            $(".deptusers").hide();
            $(".resourcedata").hide();
        }
    }
});

//Jqgrid FilterToolBar
$("#PMJqgrid").jqGrid('filterToolbar', {
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

// Handeling the Search
$('#SearchPMData').on('click', function () {
    var searchBrief = $("#PMSearchBrief").val();
    var searchItem = $("#PMSearchItemType").val();


    if (searchBrief == "" && searchItem == null) {
        $("#alertProjectInitiationSearch").modal('show');
    }
    else {
        $.ajax({
            type: "GET",
            url: ROOT + "ProjectMaster/GetProjectMasterHeaderData",
            data: {
                ProjectBriefId: searchBrief,
                ItemName: searchItem,
            },
            success: function (App_Results) {

                App_jsons = JSON.parse(App_Results);

                $.jgrid.gridUnload('#PMJqgrid');

                $("#PMJqgrid").jqGrid({
                    height: 'auto',
                    datatype: 'local',
                    data: App_jsons,
                    mtype: 'GET',
                    colModel: colmodels,
                    loadonce: true,
                    viewrecords: true,
                    pager: '#pager_PMJqgrid',
                    rowNum: 3000,
                    scroll: true,
                    gridComplete: function () {
                        var objRows = $("#PMJqgrid tbody tr");
                        var objHeader = $("#PMJqgrid tbody tr td");
                        if (objRows.length > 1) {
                            var objFirstRowColumns = $(objRows[1]).children("td");
                            for (i = 0; i < objFirstRowColumns.length; i++) {
                                $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                            }
                        }
                        $(".true").closest("tr").find("td.Project").addClass("legacy_color");
                    }
                });
                $("#PMJqgrid").jqGrid('filterToolbar', {
                    autosearch: true,
                    stringResult: false,
                    searchOnEnter: false,
                    defaultSearch: "cn"
                });
                $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
                $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
                var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
                if ($TableHeight > 258) {
                    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
                }
                else {
                    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
});

// changing the Date format
function DateFormatChange(DateToChange) {
    var date = new Date(DateToChange);
    if (isNaN(date)) {
        return '';
    }

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let name = month[date.getMonth()];
    var day = date.getDate();


    // Add a leading '0' to the day if it is a single digit
    var formattedDay = (day < 10 ? '0' : '') + day;

    var formattedDate = formattedDay + ' ' + name + ' ' + date.getFullYear();
    return formattedDate;
}

// Getting the ProjectDataView Modal value
function GetViewData(projectCode) {
    $.ajax({
        type: "GET",
        url: ROOT + "ProjectMaster/GetProjectMasterViewData",
        data: {
            ProductCode: projectCode,
        },

        success: function (response) {

            var result = JSON.parse(response);

            /*  $('#View_PrjDesc').text(result[0].ProjectDescription);*/
            $('#View_Product').text(result[0].Product);
            $('#View_Template').text(result[0].Template);
            $('#View_Itemtype').text(result[0].ItemType);
            $('#View_Bucket').text(result[0].BucketName);
            $('#View_Hub').text(result[0].HubName);
            $('#View_StartDate').text(DateFormatChange(result[0].StartDate));
            $('#View_EndDate').text(DateFormatChange(result[0].EndDate));

            $('#View_CreateDate').text(DateFormatChange(result[0].CreatedDate));
            $('#View_CreatedBy').text(result[0].CreatedBy);
            $('#View_Remarks').text(result[0].Remarks);
            //if (result[0].Remarks == "" || result[0].Remarks == null) {
            //    $('#View_Remarks').text("Nil");
            //}
            //else {
            //    $('#View_Remarks').text(result[0].Remarks);
            //}

            $('#ViewProjectData').modal('show');
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

// To pass below four paramater to the controller and redirecting to the add project view on success
function AddHiddenData(projectBreifId, product, projectCode, projectDescription) {
    $.ajax({
        type: "GET",
        url: ROOT + "ProjectMaster/SetHiddenDataAddProject",
        data: {
            ProjectBriefId: projectBreifId,
            Product: product,
            ProjectCode: projectCode,
            ProjectDescription: projectDescription
        },
        success: function (response) {
            if (response == "1") {
                window.location.href = "./AddProject";
            }

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

//Handeling the Excel download
$("#ExcelDownload").click(function () {
    isExport = true;

    var grid = $("#PMJqgrid");
    var data = grid.jqGrid("getGridParam", "data");

    // Get the current search filter from the jqGrid
    var postData = grid.jqGrid("getGridParam", "postData");
    var searchFilter = postData.filters;

    if (data.length == 0) {
        $("#alertExcelEmpty").modal("show");
    } else {
        try {
            // If there's a search filter applied, use it to filter the data
            var filteredData = data;
            if (searchFilter && searchFilter !== "") {
                var filterObj = $.parseJSON(searchFilter);
                filteredData = $.grep(data, function (row) {
                    var match = true;
                    $.each(filterObj.rules, function (index, rule) {
                        var fieldValue = row[rule.field];
                        if (fieldValue !== null && fieldValue !== undefined) {
                            var fieldValueString = fieldValue.toString().toLowerCase();
                            if (fieldValueString.indexOf(rule.data.toLowerCase()) === -1) {
                                match = false;
                                return false; // Break the loop
                            }
                        } else {
                            // Handle the case when fieldValue is null or undefined
                            match = false;
                            return false; // Break the loop
                        }
                    });
                    return match;
                });
            }

            // Check if there is data after applying the filter
            if (filteredData.length === 0) {
                $("#alertExcelEmpty").modal("show");

                return;
            }

            // Get the column names and indexes
            var colModel = grid.jqGrid("getGridParam", "colModel");
            var visibleColumns = [];
            var hiddenColumnIndex = -1;

            for (var i = 0; i < colModel.length; i++) {
                if (colModel[i].name === 'Action') {
                    hiddenColumnIndex = i;
                } else if (!colModel[i].hidden) {
                    visibleColumns.push(colModel[i].name);
                }
            }
            var filteredDataForExport = filteredData.map(function (row) {
                var filteredRow = {};
                visibleColumns.forEach(function (columnName) {
                    // Format the date columns before exporting
                    if (columnName === "StartDate" || columnName === "EndDate") {
                        var date = new Date(row[columnName]);
                        var formattedDate = date.toLocaleDateString("en-GB"); // Format to "dd/mm/yyyy"
                        if (formattedDate !== "Invalid Date") {
                            filteredRow[columnName] = formattedDate;
                        }
                    }
                    else if (columnName === "Product") {
                        filteredRow["Product Name"] = row[columnName];
                    }
                    else {
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
                a.download = "ProjectInitiationData.xlsx";
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

// To Redirect to the Project Resource page by using the ProjectId
function NavigateProjectResource(projectId) {

    var ProjectIdrowData = GetProductUsingProjectId(projectId);

    function GetProductUsingProjectId(projectId) {
        var Product = SetProjectMasterDataList.filter(function (item) {
            return item.ProjectId == projectId;
        });
        return Product;

    }

    var productName = ProjectIdrowData[0].Product;

    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/SetProjectId",
        data: {
            ProjectId: projectId,
            ProductName: productName,
        },
        success: function (response) {
            if (response == "1") {
                window.location.href = "./ProjectResources";
            }

        },
        error: function () {
            alert("Error occured!!");
        }

    });

}

// To post the ProjectId to the controller for reprocessing in the SAP
function SendProjectCode(projectCode) {
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/SendProjectCode",
        data: {
            ProjectCode: projectCode
        },
        success: function (response) {
            if (response == "1") {
                window.location.href = "./ProjectMaster";
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

//For Providing Autosuggest values for ProjectBriefId field
$(document).on("click", ".searchValue", function () {
    $(".searchValue").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: ROOT + "ProjectMaster/GetProjectBIList",
                type: 'GET',
                dataType: 'json',
                data: {
                    searchvalue: request.term
                },
                success: function (data) {
                    $('#loader').hide();
                    $('#loader').css('visibility', 'hidden');
                    var suggestions = data.map(item => item.ProjectBriefId);
                    response(suggestions);
                },
                error: function () {
                    console.log("Error Occured on autosuggest...");
                }
            });
        },
        minLength: 1
    });
});

setTimeout(function () {
    $('#message').hide();
}, 5000);

function BudgetUsers(projectId) {
    window.location.href = ROOT + 'ProjectMaster/ProjectBudgetPlanners?q=' + Encrypt('ProjectId=' + projectId);
}
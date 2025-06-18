var ProjectMasterHeaderDataList = [];
var userGroupArray = [];
var d3UserData = [];
var bucketArray = [];
var itemTypeArray = [];
var templateArray = [];
var portfolioArray = [];
var project_array = [];
var Role = "";

// Add and View Project variables
var projectBriefId = "";
var product = "";
var projectCode = "";
var projectDescription = "";

// Add popup variable
var divisionId = "";
var IsProjectPlanning = "";

// View popup variable
var viewDivisionId = 0;
var viewIsProjectPlanning = 0;
var viewIsHGHRequired = 0;

// View Project bussiness values variables 
var business_info_arr = [];
var business_info_max = 0;
var business_infoedit_id = 0;
var projectBriefIdForPopup;
var projectCodeForPopup;
var projectIdForPopup;

// var for HGH file uploads
var lastHGHFileIndex = 0;
var supportingTypes = ['pdf', 'docx', 'doc', 'xlsx', 'xls', 'jpg', 'jpeg', 'png', 'txt', 'csv', 'ppt', 'pptx', 'msg', 'pst', 'eml'];
var unSupportedViewTypes = {
    'doc': 'Microsoft Word Document',
    'docx': 'Microsoft Word Document',
    'xls': 'Microsoft Excel Spreadsheet',
    'xlsx': 'Microsoft Excel Spreadsheet',
    'csv': 'Microsoft Excel Spreadsheet',
    'ppt': 'Microsoft PowerPoint',
    'pptx': 'Microsoft PowerPoint',
    'msg': 'Mail',
    'pst': 'Mail',
    'eml': 'Mail'
}
var viewPopupHGHDocArray = [];

$(document).ready(function () {

    Role = $("#Role").val();
    if (Role == "DeptTL" || Role == "Approver" || Role == "HOD" || Role == "View Role") {
        $(".CreateProject").hide();
        $(".business-info-fields").hide();
        $('.business-info-savebtn').hide();
    }
    var toAppend = '<option value="All">All</option>';
    $('#PMSearchItemType').prepend(toAppend);
    $('#PMSearchItemType').val('All');
    ProjectMasterHeaderDataList = parseSafeJSON($('#ProjectMasterHeaderDataList').val());
    userGroupArray = parseSafeJSON($("#UserGrpList").val());
    d3UserData = parseSafeJSON($("#D3GrpList").val());
    bucketArray = parseSafeJSON($('#BucketList').val());
    itemTypeArray = parseSafeJSON($('#ItemTypeList').val());
    templateArray = parseSafeJSON($('#TemplateList').val());
    portfolioArray = parseSafeJSON($('#PortfolioList').val());
    project_array = ProjectMasterHeaderDataList;
    LoadListGrid(ProjectMasterHeaderDataList);
    findTemplateCount(ProjectMasterHeaderDataList);
    AutoWorks();

});

//------------------------------------------------------Code to List grid & action, excel download, tabs switch, search and refresh
var colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 60,
        search: false,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="d-flex action_icons align-items-center justify-content-center">'
                +

                (
                    (rowobject.ProjectId != null && rowobject.ProjectId != "")
                        ? '<a onclick="BudgetUsers(\'' + rowobject.ProjectId + '\')" class="deptusers" role="button" title="Department Budget Users"><i class="fas fa-user-friends" title="Department Budget Users"></i></a>'
                        : '<i></i>'
                ) /*DBU icon*/
                +

                (
                    (
                        (Role != "DeptTL" && Role != "Approver" && Role != "HOD" && Role != "View Role")
                        && (rowobject.ProjectBriefId != null && rowobject.ProjectBriefId != "")
                        && (rowobject.ProjectId == null || rowobject.ProjectId == "")
                        && (rowobject.SAPStatus == null || rowobject.SAPStatus == "")
                        && (rowobject.ProjectStatus?.toLowerCase() != "waiting for sap posting" && rowobject.ProjectStatus?.toLowerCase() != "sap in progress")
                    )

                        ? '<a onclick="showAddProjectPopup(this,2)" class="edit-color" title="Add"><i class="fas fa-plus" title="Add" role="button" ></i></a>'
                        : '<i></i>'
                ) /*Plus icon*/
                +

                (
                    (
                        (rowobject.ProjectId != null && rowobject.ProjectId != "") || ((rowobject.SAPStatus == "E") || (rowobject.SAPStatus == "S"))
                    )
                        ? '<a onclick="GetViewData(\'' + rowobject.ProjectCode + '\', \'' + rowobject.ProjectId + '\', \'' + rowobject.ProjectBriefId + '\')" id="ViewProjectDatabtn" class="remarks-color" title="Info" role="button"> <i class="fas fa-info color-info" title="Info"></i></a>'
                        : '<i></i>'
                ) /*i icon*/
                +

                (
                    (rowobject.SAPStatus == 'E' && (rowobject.ProjectStatus?.toLowerCase() == "sap failed"
                        || rowobject.ProjectStatus?.toLowerCase() == "" || rowobject.ProjectStatus?.toLowerCase() == null)
                    )
                        ? '<a onclick="SendProjectCode(\'' + rowobject.ProjectCode + '\') " class="view-color" role="button" title="Post SAPStatus"><i class="fas fa-reply color-eye" title="Retry" ></i></a>'
                        : '<i></i>'
                ) /*reverse icon*/
                +

                (
                    (rowobject.ProjectId != null && rowobject.ProjectId != "")
                        ? '<a onclick="NavigateProjectResource(\'' + rowobject.ProjectId + '\')" class="download-color resourcedata" role="button" title="Link to Project Resource Master"><i class="fas fa-users" title="Link to Project Resource Master"></i></a>'
                        : '<i></i>'
                ) /*PRM icon*/
                +

                '</div>';
        }
    },
    {
        name: 'ProjectBriefId',
        label: 'Project Brief ID',
        resizable: true,
        classes: "prj-brief",
        ignoreCase: true,
        width: 80,
    },
    {
        name: 'Product',
        label: 'Product Name',
        resizable: true,
        classes: "prj-prod",
        ignoreCase: true,
        width: 160,
    },
    {
        name: 'ProjectDescription',
        label: 'project description',
        resizable: true,
        ignoreCase: true,
        classes: "prj-desc",
        width: 160,
        hidden: true
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
        width: 80,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue == "" && rowobject.ProjectStatus != null) {
                if (rowobject.ProjectStatus?.toLowerCase() == "waiting for sap posting") {
                    return '<span class="color-blue">' + rowobject.ProjectStatus + '</span>';
                }
                else if (rowobject.ProjectStatus?.toLowerCase() == "sap failed") {
                    return '<span class="text-danger">' + rowobject.ProjectStatus + '</span>';
                }
                else if (rowobject.ProjectStatus?.toLowerCase() == "sap in progress") {
                    return '<span class="text-warning">' + rowobject.ProjectStatus + '</span>';
                }
                else {
                    return ''
                }
            }
            else if (rowobject.Legacy == 'Yes') {
                return '<span class="Project legacy_color">' + rowobject.ProjectId + '</span>'
            }
            else {
                return '<span class="">' + rowobject.ProjectId + '</span>'
            }
        }

    },
    {
        name: 'ProjectId',
        label: 'Project ID',
        resizable: true,
        ignoreCase: true,
        width: 80,
        hidden: true
    },
    {
        name: 'ProjectCode',
        label: 'Project Code',
        resizable: true,
        ignoreCase: true,
        classes: "prj-code",
        width: 80,
        hidden: true
    },
    {
        name: 'StartDate',
        label: 'Start Date',
        resizable: true,
        ignorecase: true,
        width: 80,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd F Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd MM yyyy',
                    autoclose: true
                }).change(function () {
                    $('#project-initiation-list')[0].triggerToolbar();
                });

            }
        }
    },
    {
        name: 'EndDate',
        label: 'End Date',
        resizable: true,
        ignorecase: true,
        width: 80,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd F Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd MM yyyy',
                    autoclose: true
                }).change(function () {
                    $('#project-initiation-list')[0].triggerToolbar();
                });

            }
        }

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
        width: 60,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd/m/Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {

                $(e).datepicker({
                    format: 'dd/mm/yyyy',
                    autoclose: true
                }).change(function () {

                    $('#project-initiation-list')[0].triggerToolbar();
                });

            }
        }
    },
    {
        name: 'Legacy',
        label: 'Legacy',
        resizable: true,
        width: 50,
        ignoreCase: true,
    },
    {
        name: 'ProjectStatus',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        width: 70,
        hidden: true,
    },
    {
        name: 'DivisionId',
        label: 'Division',
        resizable: true,
        ignoreCase: true,
        width: 70,
        hidden: true,
        classes: "prj-division",
    },
    {
        name: 'IsProjectPlanning',
        label: 'Is Project Planning Required',
        resizable: true,
        width: 50,
        ignoreCase: true,
    },
    {
        name: 'IsHGHRequired',
        label: 'Is HGH Required',
        resizable: true,
        width: 50,
        ignoreCase: true,
    }
];
function parseSafeJSON(jsonString) {
    if (!jsonString || jsonString === "null" || jsonString === "undefined" || jsonString === "") {
        return [];
    }
    try {
        var parsedData = JSON.parse(jsonString);
        return Array.isArray(parsedData) ? parsedData : [];
    }
    catch (e) {
        return [];
    }
}
function LoadListGrid(data) {

    $.jgrid.gridUnload('#project-initiation-list');
    $("#project-initiation-list").jqGrid({
        url: '',
        mtype: 'GET',
        datatype: 'local',
        data: data,
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#project-initiation-list-pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#project-initiation-list tbody tr");
            var objHeader = $("#project-initiation-list tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            var Role = $("#Role").val()
            if (Role == "DeptTL" || Role == "Approver" || Role == "HOD" || Role == "View Role") {
                $(".deptusers").hide()
                $(".resourcedata").hide()
            }
        }
    });

    $('#project-initiation-list').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-300px + 100vh)' });
    $('#project-initiation-list').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#project-initiation-list').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#project-initiation-list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#project-initiation-list').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#project-initiation-list').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#project-initiation-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
function InitiationListLoad(flag, Template) {

    if (flag == "refresh") {
        $(".TemplateDetails li").find('.active').removeClass("active");
        $(".allTemplates").addClass("active");
    }
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetProjectMasterHeaderData",
        data: {
            template: Template
        },
        success: function (App_Results) {
            App_jsons = JSON.parse(App_Results);
            if (flag == "refresh") {
                findTemplateCount(App_jsons);
            }
            LoadListGrid(App_jsons);
        },
        error: function () {
            alert("Error occured!!");
        }
    });

}
function findTemplateCount(result) {

    var TemplateTotals = {};
    var allTemplateElements = $(".template-count");
    allTemplateElements.each(function () {
        $(this).text('0');
    });

    $.each(result, function (i, obj) {
        var template = $.trim(obj.Template).toLowerCase();
        if (TemplateTotals[template] === undefined) {
            TemplateTotals[template] = 1;
        } else {
            TemplateTotals[template]++;
        }
    });
    var sum = 0;
    for (var template in TemplateTotals) {
        if (template != "") {
            var totalCountElement = $("#" + template.replaceAll(" ", '').toLowerCase());
            if (totalCountElement.length > 0) {
                totalCountElement.text(parseInt(TemplateTotals[template]).toLocaleString('en-IN'));
            }
        }
        sum = TemplateTotals[template] + sum;
        $(".allTemplateTotal").text(parseInt(sum).toLocaleString('en-IN'));
    }
}
function getTemplatedetails(obj) {
    var templateid = obj.getAttribute('data-templateid');
    templateid = templateid == "All" ? "" : templateid;
    $('#searchedtemplate').val(templateid);
    InitiationListLoad('', templateid);
}
function BudgetUsers(projectId) {
    window.location.href = ROOT + 'NewProjectInitiation/DepartmentBudgetUserMappings?q=' + Encrypt('ProjectId=' + projectId);
}
function NavigateProjectResource(projectId) {

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/NavigateProjectResource",
        data: {
            ProjectId: projectId,
        },
        success: function (response) {
            if (response == "1") {
                window.location.href = "./ProjectResourceMaster";
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

}
function SendProjectCode(projectCode) {

    confirm("Are you sure you want to Retry?", function () {
        $.ajax({
            type: "POST",
            url: ROOT + "NewProjectInitiation/SendProjectCode",
            data: {
                ProjectCode: projectCode,
                PageType: "List"
            },
            success: function () {
                window.location.reload();
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    });

}
function AutoWorks() {

    const idArray = ['PMPortfolioName', 'PMBucketName', 'PMItemTypeName', 'PMTemplateName', 'IsProjectPlanning', 'DivisionId',
        'IsHGHRequired', 'InfoIsProjectPlanning', 'InfoDivisionId', 'InfoIsHGHRequired'];
    idArray.forEach(function (item) {
        $('#' + item).each(function () {
            $(this).select2({
                dropdownParent: $(this).parent()
            });
        });
    });

    var start = new Date();
    var end = new Date(new Date().setYear(start.getFullYear() + 1));

    $('[data-datepicker-startdate1]').datepicker({
        format: 'dd/mm/yyyy',
        endDate: end,
        endDate: end,
        autoclose: true
    }).on('changeDate', function () {
        $('[data-datepicker-enddate1]').datepicker('setStartDate', $(this).val());
    });
    $('[data-datepicker-enddate1]').datepicker({
        format: 'dd/mm/yyyy',
        startDate: start,
        autoclose: true
    }).on('changeDate', function () {
    });

}

$(".searchValue").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: ROOT + "NewProjectInitiation/GetProjectBIList",
            type: 'GET',
            dataType: 'json',
            global: false,
            data: {
                searchvalue: request.term
            },
            success: function (data) {
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
$('#ProjectId').autocomplete({
    source: function (request, response) {
        var filtered_array = [];
        $.each(project_array, function (index, obj) {
            if (obj.ProjectId && request.term && obj.ProjectId.toLowerCase().trim().includes(request.term.toLowerCase().trim())) {
                var index = filtered_array.findIndex(function (m) {
                    return m.ProjectId === obj.ProjectId
                });
                if (index == -1) {
                    filtered_array.push(obj.ProjectId)
                }
            }
        });
        response(filtered_array);
    },
    minLength: 1
});
$('#SearchPMData').on('click', function () {

    var searchBrief = $("#PMSearchBrief").val();
    var searchItem = $("#PMSearchItemType").val();
    var projectId = $('#ProjectId').val()
    var startDate = $('#Search_Start_Date').val()
    var endDate = $('#Search_End_Date').val()
    var template = $('#searchedtemplate').val()
    if (searchBrief == "" && searchItem == null) {
        $("#alertProjectInitiationSearch").modal('show');
    }
    else {
        $.ajax({
            type: "GET",
            url: ROOT + "NewProjectInitiation/GetProjectMasterHeaderData",
            data: {
                ProjectBriefId: searchBrief,
                ItemName: searchItem,
                projectId: projectId,
                startDate: startDate,
                endDate: endDate,
                template: template
            },
            success: function (App_Results) {
                App_jsons = JSON.parse(App_Results);
                LoadListGrid(App_jsons);
                findTemplateCount(App_jsons);
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
});
$('#refreshdata').on('click', function () {
    $("#PMSearchBrief").val('');
    $("#PMSearchItemType").val('All').trigger('change');
    $('#ProjectId').val('');
    $('#Search_Start_Date').val('');
    $('#Search_End_Date').val('');
    InitiationListLoad('refresh');
});
$("#excel-download").on('click', function () {

    var projectbriefid = $("#PMSearchBrief").val();
    var itemtype = $("#PMSearchItemType").val()
    var projectId = $('#ProjectId').val();
    var startdate = $('#Search_Start_Date').val();
    var enddate = $('#Search_End_Date').val();
    var template = $('#searchedtemplate').val();
    var isValid = true;
    var data = $('#project-initiation-list').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewProjectInitiation/GetProjectInitiationExcelData?ProjectBriefId=" + projectbriefid + "&&ItemName=" + itemtype + "&&projectId=" + projectId + "&&startDate=" + startdate + "&&endDate=" + enddate + "&&template=" + template;
    }

});

//---------------------------------------------------------- Code for View Project Data & Bussiness information
function GetViewData(projectCode, projectId, projectBriefId) {

    projectCodeForPopup = projectCode
    projectIdForPopup = projectId
    projectBriefIdForPopup = projectBriefId;

    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetProjectMasterViewData",
        data: {
            ProductCode: projectCode,
        },
        success: function (response) {

            if (response != null) {

                var result = response;
                var popupName = "View Project : " + projectId;

                $('.ProjectId_text').text(popupName);
                $('#View_Product').text(result.Product);
                $('#View_Template').text(result.Template);
                $('#View_Itemtype').text(result.ItemType);
                $('#View_Bucket').text(result.BucketName);
                $('#View_Hub').text(result.HubName);
                $('#View_StartDate').text(result.StartDate);
                $('#View_EndDate').text(result.EndDate);
                $('#View_CreateDate').text(result.CreatedDate);
                $('#View_CreatedBy').text(result.CreatedBy);
                $('#View_Remarks').text(result.Remarks);
                $('#Business_Product').val(result.Product);
                $('#Business_Project').val(projectId);

                business_info_arr = result.BusinessData
                refreshBusinessInformationData();
                if (projectBriefId != null && projectBriefId != '' && projectBriefId != 'null') {
                    $('.adhocproject_view').hide();
                }
                else {
                    $('.adhocproject_view').show();
                }

                if (Role == "DeptTL" || Role == "Approver" || Role == "HOD" || Role == "View Role") {
                    $('.business-info-savebtn').hide();
                    $('.hideforpartusers').addClass('hide');
                    $('#Save_ViewDivisionInfo').addClass('hide');
                }
                else {
                    $('.hideforpartusers').removeClass('hide');
                    $('#Save_ViewDivisionInfo').removeClass('hide');

                    $('.InfoDivisionId').val(result.DivisionId).change();
                    $('.InfoIsProjectPlanning').val(result.IsProjectPlanning).change();
                    $('.InfoIsHGHRequired').val(result.IsHGHRequired).change();

                    viewDivisionId = result.DivisionId;
                    viewIsProjectPlanning = result.IsProjectPlanning;
                    viewIsHGHRequired = result.IsHGHRequired;

                    if (result.IsHGHRequired == "" || result.IsHGHRequired == "0") {
                        $("#hgh-required-view-div").addClass('hide');
                        $("#hgh-required-select-div").removeClass('hide');
                    }
                    else if (result.IsHGHRequired == "1") {
                        $("#hgh-required-select-div").addClass('hide');
                        $("#hgh-required-view-div").removeClass('hide');

                        $("#IsHGHReqSpan").text(result.IsHGHRequired == "0" ? 'No' : 'Yes');
                    }

                    if (result.IsHGHRequired == "" || result.IsHGHRequired == "0") {
                        $("#hgh-supp-doc-add-div").addClass('hide');
                        $("#hgh-supp-doc-view-div").addClass('hide');
                    }
                    else if (result.IsHGHRequired == "1" && result.HGHSuppDocExists > 0) {
                        $("#hgh-supp-doc-add-div").addClass('hide');
                        $("#hgh-supp-doc-view-div").removeClass('hide');
                    }
                    else if (result.IsHGHRequired == "1" && result.HGHSuppDocExists == 0) {
                        $("#hgh-supp-doc-add-div").addClass('hide');
                        $("#hgh-supp-doc-view-div").addClass('hide');
                    }

                    if (result.IsHGHRequired == "1") {
                        $("#Save_ViewDivisionInfo").text("Save");
                    }
                }

                $(".Err_PM").hide();

                $('#ViewProjectData').modal('show');

            }
            else {
                alert("Error occured!!");
            }

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
var businesscolmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left action_icons">

              <a onclick="onEditBusinessInformation(this)" class="edit-color" data-businessinfoid="${rowobject.GridRowNo}"
                  data-product="${rowobject.Product}" data-sku="${rowobject.SKU}" data-hub="${rowobject.HUBId}" data-proposedsp="${rowobject.ProposedSellingPrice}" data-currency="${rowobject.Currency}" data-businessvalue="${rowobject.BusinessValue}"
                  data-m1quantity="${rowobject.M1Q}" data-m2quantity="${rowobject.M2Q}" data-m3quantity="${rowobject.M3Q}" data-m4quantity="${rowobject.M4Q}" data-m5quantity="${rowobject.M5Q}" data-m6quantity="${rowobject.M6Q}"
                  data-y1quantity="${rowobject.Y1Q}" data-y2quantity="${rowobject.Y2Q}" data-y3quantity="${rowobject.Y3Q}" data-uom="${rowobject.UOM}"
                  title="Edit" id="edit_info"><i class="fas fa-pen mr-2" title="Edit"></i></a>

              <a onclick="onDeleteBusinessInformation(this)" data-businessinfoid="${rowobject.GridRowNo}"
                data-product="${rowobject.Product}" data-sku="${rowobject.SKU}" data-hub="${rowobject.HUB}" 
                 title="Delete"><i class="fas fa-trash color-delete" title="Delete"></i></a>

             </div>`;
        }
    },
    {
        name: 'Product',
        label: 'Product',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HUBName',
        label: 'HUB',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HUBId',
        label: 'HUB',
        width: 90,
        resizable: true,
        ignoreCase: true,
        hidden: true
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Currency',
        label: 'Currency',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BusinessValue',
        label: 'Business Value <span class="Bus_val">(Y2 Quantity * Proposed Selling Price)</span>',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M1Q',
        label: 'M1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M2Q',
        label: 'M2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M3Q',
        label: 'M3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M4Q',
        label: 'M4 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M5Q',
        label: 'M5 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M6Q',
        label: 'M6 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y1Q',
        label: 'Y1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y2Q',
        label: 'Y2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y3Q',
        label: 'Y3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UOM',
        label: 'UOM',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },

];
function createBusinessJQGrid(data) {

    $.jgrid.gridUnload('#Business_Information');
    data = data.filter(function (obj) {
        return obj.IsActive == 1;
    })
    $("#Business_Information").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: businesscolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_businessinfo',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Business_Information tbody tr");
            var objHeader = $("#Business_Information tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            if (projectBriefIdForPopup != null && projectBriefIdForPopup != '' && projectBriefIdForPopup != 'null') {
                $("#Business_Information").jqGrid('hideCol', 'Action');
            }

        }
    });

    $('#Business_Information').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#Business_Information').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#Business_Information').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#Business_Information').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Business_Information').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#Business_Information').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }
}
$('body').on("change", '.validation', function () {

    var id = $(this)[0].id;
    var value = this.value;
    if (value === "" || value === null) {
        $("#Error_" + id).show();
    } else {
        $("#Error_" + id).hide();
    }

    $("#Error_Zero_" + id).hide();
    $("#Error_Sum_" + id).hide();

});
$('body').on('keyup', '.trim', function () {
    var index = this.value.length - 2;
    var key = this.value.charAt(index);
    var initialkey = this.value.charAt(0);
    if ((!(key === " " || key === "    ") && (index > -1)) && (initialkey != " ")) {
        this.value = this.value;
    } else {
        this.value = this.value.trim();
    }
});
function restrictSpecialCharacters(evt) {

    var e = event || evt;
    var charCode = e.which || e.keyCode;
    var targetId = e.target ? e.target.id : e.srcElement.id;

    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32 ||
        (targetId === "Business_SKU" && charCode >= 48 && charCode <= 57)) {
        return true;
    }
    else {
        return false;
    }

}
function onlyNumbers(evt) {
    var e = event || evt;
    var charCode = e.which || e.keyCode;
    if (evt != '') {
        var currentValue = evt.value;
    }
    if (charCode == 46 && (currentValue.indexOf(".") !== -1 || currentValue.length === 0)) {
        return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }
    return true;
}
$("#Business_ProposedSP, #Business_Y2").change(function () {
    $("#Business_BV").val("");
    if ($("#Business_ProposedSP").val() != "" && $("#Business_Y2").val() != "") {
        const value = ($("#Business_ProposedSP").val().replaceAll(',', '')) * ($("#Business_Y2").val().replaceAll(',', ''));
        const formattedValue = value.toLocaleString('en-US', { maximumFractionDigits: 0 });
        $("#Business_BV").val(formattedValue);
    }
});
function refreshBusinessInformationData() {

    $('#Business_SKU').val('')
    $('#Business_HUB').val('').trigger('change');
    $('#Business_ProposedSP').val('')
    $('#Business_Currency').val('').trigger('change');
    $('#Business_M1').val('')
    $('#Business_M2').val('')
    $('#Business_M3').val('')
    $('#Business_M4').val('')
    $('#Business_M5').val('')
    $('#Business_M6').val('')
    $('#Business_Y1').val('')
    $('#Business_Y2').val('')
    $('#Business_Y3').val('')
    $('#Business_UOM').val('')
    $('#Business_BV').val('')
    createBusinessJQGrid(business_info_arr);

    business_infoedit_id = 0;
    business_info_max = 0;
    $(".Error_BusinessInformation").hide();
    $.each(business_info_arr, function (i, obj) {
        if (business_info_max < obj.AdhocProjectBusinessInformationId) {
            business_info_max = obj.AdhocProjectBusinessInformationId
        }
    });
    business_info_max = business_info_max + 1
}
function onEditBusinessInformation(data) {

    var product = data.getAttribute('data-product');
    var sku = data.getAttribute('data-sku');
    var hub = data.getAttribute('data-hub');
    var sellingprice = data.getAttribute('data-proposedsp');
    var currency = data.getAttribute('data-currency');
    var m1quantity = data.getAttribute('data-m1quantity');
    var m2quantity = data.getAttribute('data-m2quantity');
    var m3quantity = data.getAttribute('data-m3quantity');
    var m4quantity = data.getAttribute('data-m4quantity');
    var m5quantity = data.getAttribute('data-m5quantity');
    var m6quantity = data.getAttribute('data-m6quantity');
    var y1quantity = data.getAttribute('data-y1quantity');
    var y2quantity = data.getAttribute('data-y2quantity');
    var y3quantity = data.getAttribute('data-y3quantity');
    var uom = data.getAttribute('data-uom');
    var businessvalue = data.getAttribute('data-businessvalue')
    business_infoedit_id = data.getAttribute('data-businessinfoid');

    //var hubArray = hub.split(',')
    $('#Business_Product').val(product)
    $('#Business_SKU').val(sku)
    $('#Business_HUB').val(hub).trigger('change')
    $('#Business_ProposedSP').val(sellingprice)
    $('#Business_Currency').val(currency).trigger('change')
    $('#Business_M1').val(m1quantity)
    $('#Business_M2').val(m2quantity)
    $('#Business_M3').val(m3quantity)
    $('#Business_M4').val(m4quantity)
    $('#Business_M5').val(m5quantity)
    $('#Business_M6').val(m6quantity)
    $('#Business_Y1').val(y1quantity)
    $('#Business_Y2').val(y2quantity)
    $('#Business_Y3').val(y3quantity)
    $('#Business_UOM').val(uom)
    $('#Business_BV').val(businessvalue);

    $(".Error_BusinessInformation").hide();
}
function onDeleteBusinessInformation(data) {

    $('#DeleteModal').modal('show');
    $("#DeleteRecord").off("click").on("click", function () {
        var businessId = data.getAttribute('data-businessinfoid');
        var index = business_info_arr.findIndex(function (obj) {
            return obj.GridRowNo == businessId
        });
        if (index > -1) {
            business_info_arr[index].IsActive = 0;
        }
        if (business_infoedit_id === businessId) {
            business_infoedit_id = 0
        }
        createBusinessJQGrid(business_info_arr);
    });
    $('#DeleteModal').modal('hide');

}
$('#Add_BusinessInformation').on('click', function () {

    var isValid = true;

    var product = $('#Business_Product').val().trim()
    var sku = $('#Business_SKU').val().trim()
    var hub = $('#Business_HUB').val()
    var hubname = $('#Business_HUB option:selected').text()
    var sellingprice = $('#Business_ProposedSP').val().trim()
    var currency = $('#Business_Currency').val().trim()
    var m1 = $('#Business_M1').val().trim()
    var m2 = $('#Business_M2').val().trim()
    var m3 = $('#Business_M3').val().trim()
    var m4 = $('#Business_M4').val().trim()
    var m5 = $('#Business_M5').val().trim()
    var m6 = $('#Business_M6').val().trim()
    var y1 = $('#Business_Y1').val().trim()
    var y2 = $('#Business_Y2').val().trim()
    var y3 = $('#Business_Y3').val().trim()
    var uom = $('#Business_UOM').val().trim()
    var businessValue = $('#Business_BV').val().trim();

    var data_array = [];
    data_array = {
        Business_SKU: sku,
        Business_HUB: hub,
        Business_ProposedSP: sellingprice,
        Business_Currency: currency,
        Business_M1: m1,
        Business_M2: m2,
        Business_M3: m3,
        Business_Y1: y1,
        Business_Y2: y2,
        Business_Y3: y3,
        Business_UOM: uom
    };

    $.each(data_array, function (i, obj) {
        if (obj === "" || obj === null) {
            $("#Error_" + i).show()
            isValid = false;
        }
        else {
            $("#Error_" + i).hide()
            if (i == "Business_M1" || i == "Business_Y1") {
                if (obj === "0" || parseInt(obj) === 0) {
                    $("#Error_Zero_" + i).show();
                    isValid = false
                }
                else {
                    $("#Error_Zero_" + i).hide();
                    if (i == "Business_Y1") {
                        if (y1 < ((+m1) + (+m2) + (+m3) + (+(isNaN(m4) ? "" : m4)) + (+(isNaN(m5) ? "" : m5)) + (+(isNaN(m6) ? "" : m6)))) {
                            $("#Error_Sum_Business_Y1").show();
                            isValid = false;
                        }
                        else {
                            $("#Error_Sum_Business_Y1").hide();
                        }
                    }
                }

            }
        }
    });

    var index = business_info_arr.findIndex(function (obj) {
        return obj.Product == product && obj.SKU == sku && obj.HUBId == hub && obj.IsActive == 1 && obj.GridRowNo != business_infoedit_id
    });
    if (index > -1) {
        alert('The same combination of SKU and HUB already exists')
        isValid = false;
    }
    if (isValid) {
        var editindex = business_info_arr.findIndex(function (obj) {
            return obj.GridRowNo == business_infoedit_id
        });
        if (editindex == -1) {
            business_info_arr.push({
                AdhocProjectBusinessInformationId: 0,
                GridRowNo: business_info_arr.length + 1,
                Product: product,
                SKU: sku,
                HUBId: hub,
                HUBName: hubname,
                ProposedSellingPrice: sellingprice,
                Currency: currency,
                M1Q: m1,
                M2Q: m2,
                M3Q: m3,
                M4Q: m4,
                M5Q: m5,
                M6Q: m6,
                Y1Q: y1,
                Y2Q: y2,
                Y3Q: y3,
                BusinessValue: businessValue,
                UOM: uom,
                IsActive: 1
            });
        }
        else {
            business_info_arr[editindex].Product = product;
            business_info_arr[editindex].SKU = sku;
            business_info_arr[editindex].HUBId = hub;
            business_info_arr[editindex].HUBName = hubname;
            business_info_arr[editindex].ProposedSellingPrice = sellingprice;
            business_info_arr[editindex].Currency = currency;
            business_info_arr[editindex].M1Q = m1;
            business_info_arr[editindex].M2Q = m2;
            business_info_arr[editindex].M3Q = m3;
            business_info_arr[editindex].M4Q = m4;
            business_info_arr[editindex].M5Q = m5;
            business_info_arr[editindex].M6Q = m6;
            business_info_arr[editindex].Y1Q = y1;
            business_info_arr[editindex].Y2Q = y2;
            business_info_arr[editindex].Y3Q = y3;
            business_info_arr[editindex].BusinessValue = businessValue;
            business_info_arr[editindex].UOM = uom;
            business_info_arr[editindex].IsActive = 1;
        }
        refreshBusinessInformationData();
    }
});
$('#Save_BusinessInformation').off('click').on('click', function () {
    if (business_info_arr.length == 0) {
        alert('Please enter atleast one row data to save');
    }
    else {
        var projectMasters = {
            ProjectId: $('#Business_Project').val(),
            Product: $('#Business_Product').val().trim(),
            BusinessJsonData: JSON.stringify(business_info_arr)
        }

        $('#confirmationPopUpforSave').modal('show');
        $('#confirmationmsgforsave').html('Are you sure you want to save the Business Information details');
        $('#confirmsave').off('click').on('click', function () {
            $.ajax({
                type: "POST",
                url: ROOT + "NewprojectInitiation/SaveBusinessProjectData",
                type: "POST",
                data: {
                    projectMasters: projectMasters
                },
                success: function (result) {

                    $('#confirmationPopUpforSave').modal('hide');

                    if (result) {
                        var responseMsgClass = result.Item2;
                        var responseMsg = result.Item1;
                        $("#response-message-div").html(

                            `<div class="alert ${responseMsgClass} alert-dismissible d-flex justify-content-between" role="alert" id="message_alert">
                         ${responseMsg}
                         </div>`

                        );

                        $("#response-message-div").removeClass('hide').delay(5000).queue(
                            function (next) {
                                $(this).addClass('hide');
                                next();
                            }
                        );
                        GetViewData(projectCodeForPopup, projectIdForPopup, projectBriefIdForPopup);

                    }
                    else {
                        alert(result);
                    }
                },
                error: function (err) {
                    alert(err);
                }
            });
        });
    }
});

$("#InfoIsHGHRequired").on("change", function () {

    var data = $(this).val();
    if (data == "1") {
        $("#hgh-supp-doc-add-div").removeClass('hide');
        $("#Save_ViewDivisionInfo").text("Save & Send HGH Mail");
    }
    else {
        $("#hgh-supp-doc-FileUpload").val('');
        $("#hgh-supp-doc-add-div").addClass('hide');
        $("#Save_ViewDivisionInfo").text("Save");
    }

});

$('#hgh-supp-doc-FileUpload').on('change', function () {
    ValidateFileUpload({ target: { files: $('#hgh-supp-doc-FileUpload')[0].files } });
});
function ValidateFileUpload(event) {

    var count = event.target.files.length;

    for (var i = 0; i < count; i++) {
        var fileExtension = event.target.files[i].name.split('.').pop().toLowerCase();
        if (!supportingTypes.includes(fileExtension)) {
            $(".file-format-err").removeClass('hide').delay(5000).queue(
                function (next) {
                    $(this).addClass('hide');
                    next();
                }
            );
            $("#hgh-supp-doc-FileUpload").val('');
            isValid = false;
            return false;
        }
    }

    var maxSizeInBytes = 10 * 1024 * 1024;
    var validFilesArr = [];
    for (var i = 0; i < count; i++) {
        if (event.target.files[i].size <= maxSizeInBytes) {
            validFilesArr.push(i);
        }
    }

    if (count != validFilesArr.length) {
        var dt = new DataTransfer();
        validFilesArr.forEach(function (index) {
            dt.items.add(event.target.files[index]);
        });
        const fileInput = document.getElementById('hgh-supp-doc-FileUpload');
        fileInput.files = dt.files;
        $(".file-exceed-err").removeClass('hide').delay(5000).queue(
            function (next) {
                $(this).addClass('hide');
                next();
            }
        );
    }

}
$("#Save_ViewDivisionInfo").on("click", function () {

    var projectId = projectIdForPopup;
    var division = $(".InfoDivisionId").val();
    var isProjectPlanning = $(".InfoIsProjectPlanning").val();
    var isHGHRequired = $(".InfoIsHGHRequired").val(); // whether it is span or select (taking from select and setting in select)
    var files = $('#hgh-supp-doc-FileUpload')[0].files;
    var documentArray = [];
    var documentFilesArray = [];

    Array.from(files).forEach(function (item) {
        var id = lastHGHFileIndex + 1;
        documentArray.push({
            DocId: id,
            DocumentName: item.name
        });
        documentFilesArray.push({
            DocId: id,
            File: item,
        });
        lastHGHFileIndex = id;
    });

    var flag = true;

    if (division == "" || isProjectPlanning == "" || isHGHRequired == "") {
        division == "" ? ($(".Err_InfoDivision").show(), flag = false) : $(".Err_InfoDivision").hide()
        isProjectPlanning == "" ? ($(".Err_InfoIsPlanning").show(), flag = false) : $(".Err_InfoIsPlanning").hide();
        isHGHRequired == "" ? ($(".Err_InfoIsHGH").show(), flag = false) : $(".Err_InfoIsHGH").hide();
    }
    if (flag) {

        if (division != viewDivisionId || isProjectPlanning != viewIsProjectPlanning || isHGHRequired != viewIsHGHRequired || documentArray.length > 0) {
            $('#confirmationPopUpforSave').modal('show');
            $('#confirmationmsgforsave').html('Are you sure you want to save the details?');
            $('#confirmsave').off('click').on('click', function () {

                var formData = new FormData();
                formData.append("ProjectId", projectId);
                formData.append("DivisionId", division);
                formData.append("IsProjectPlanning", isProjectPlanning);
                formData.append("IsHGHRequired", isHGHRequired);
                formData.append("DocumentJson", JSON.stringify(documentArray));

                documentFilesArray.forEach(doc => {
                    if (doc.File) {
                        formData.append(`${doc.DocId}`, doc.File);
                    }
                });

                $.ajax({
                    type: "POST",
                    url: ROOT + "NewprojectInitiation/SaveDivisionInfo",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        $('#confirmationPopUpforSave').modal('hide');

                        if (result) {

                            var responseMsgClass = result.Item2;
                            var responseMsg = result.Item1;

                            $("#response-message-div").html(

                                `<div class="alert ${responseMsgClass} alert-dismissible d-flex justify-content-between" role="alert" id="message_alert">
                                    ${responseMsg}
                                 </div>`

                            );
                            $("#response-message-div").removeClass('hide').delay(5000).queue(
                                function (next) {
                                    $(this).addClass('hide');
                                    next();
                                }
                            );

                            $("#hgh-supp-doc-FileUpload").val('');

                            GetViewData(projectCodeForPopup, projectIdForPopup, projectBriefIdForPopup);
                            $('#SearchPMData').click();

                        }
                    },
                    error: function () {
                        alert("Error occured!!");

                    }
                })
            })
        }
        else {
            alert('There is no changes to save');
        }
        
    }
});
function OpenHGHDocPopup() {

    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetHGHSupportingDocument",
        data: {
            ProjectId: projectIdForPopup
        },
        async: false,
        success: function (result) {
            if (result) {
                viewPopupHGHDocArray = result;
            }
        },
        error: function () {
            alert("Error occured!!!");
        }
    });

    createFileModalGrid(viewPopupHGHDocArray);
}

var HGHFileColModels = [
    {
        name: 'Action',
        label: 'Action',
        align: 'center',
        width: 50,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            var fileName = rowobject.DocName;
            var fileExtension = fileName.split('.').pop().toLowerCase();

            return `
                    <div class="d-flex action_icons align-items-center justify-content-center">
                        <span class="mr-2" role="button" onclick="DownloadHGHDoc(${rowobject.HGHCodeMailSuppDocId})">
                            <i class="fas fa-download download-pr-file-item color-download" title="Download"></i>
                        </span>
                        ${(fileExtension in unSupportedViewTypes) ? `` :
                    `<span class="mr-2" role="button" onclick="ViewHGHDoc(${rowobject.HGHCodeMailSuppDocId})">
                                <i class="fas fa-eye view-pr-file-item color-eye" title="View"></i>
                            </span>`
                }
                    </div>`;
        }
    },
    {
        name: 'DocName',
        label: 'Document Name',
        sortable: false,
        width: 100
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded By',
        sortable: false,
        width: 60
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        sortable: false,
        width: 40
    }
];
function createFileModalGrid(data) {

    $.jgrid.gridUnload('#HGHviewfiles');

    $("#HGHviewfiles").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: HGHFileColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_HGHviewfiles',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#HGHviewfiles tbody tr");
            var objHeader = $("#HGHviewfiles tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#HGHviewfiles').closest('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
    $('#HGHviewfiles').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#viewlist').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 300) {
        $('#HGHviewfiles').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#HGHviewfiles').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#HGHviewfiles').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#HGHviewfiles').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

    $("#HGHviewfiles").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    var popupName = "HGH Supporting Documents";

    if (projectIdForPopup != "") {
        popupName = popupName + " : " + projectIdForPopup;
    }

    $("#hgh-doc-popup-name").text(popupName);
    $("#ViewFileModal").modal("show");

}
function ViewHGHDoc(HGHCodeMailSuppDocId) {

    var fileName = viewPopupHGHDocArray.filter(item => item.HGHCodeMailSuppDocId == HGHCodeMailSuppDocId)[0].DocName;
    var url = ROOT + 'HGHFiles/' + fileName; // showing from folder
    window.open(url, '_blank');

}
function DownloadHGHDoc(HGHCodeMailSuppDocId) {

    var fileName = viewPopupHGHDocArray.filter(item => item.HGHCodeMailSuppDocId == HGHCodeMailSuppDocId)[0].DocName;
    window.open(ROOT + "NewProjectInitiation/DownloadHGHFile?DocumentName=" + fileName, "_blank");

}

//--------------------------------------------------- Code for new/project breif --- add project data
function showAddProjectPopup(obj, Action) {

    if (obj) {
        var row = $(obj).closest("tr.jqgrow");
        projectBriefId = $(row).find(".prj-brief").text().trim();
        product = $(row).find(".prj-prod").text().trim();
        projectCode = $(row).find(".prj-code").text().trim();
        projectDescription = $(row).find(".prj-desc").text().trim();
        divisionId = $(row).find(".prj-division").text().trim();
    }
    else {
        projectBriefId = "";
        product = "";
        projectCode = "";
        projectDescription = "";
        divisionId = "";
    }

    if (Action == 1) {
        CreateAddProjectPopup();
    }
    else if (Action == 2) {

        var isDuplicateProductExists = 0;
        var duplicatedProductData = [];

        $.ajax({
            type: "GET",
            url: ROOT + "NewProjectInitiation/CheckIsDuplicateProductExists",
            data: {
                ProjectCode: projectCode,
                Product: product
            },
            async: false,
            success: function (result) {
                if (result) {
                    duplicatedProductData = result;
                    isDuplicateProductExists = result[0].IsDupExists;
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });

        if (isDuplicateProductExists == 0) {
            CreateAddProjectPopup();
        }
        else {
            CreateDuplicateProductJqgrid(duplicatedProductData);
            $("#product-already-exists-popup").modal("show");
        }

    }

}
function CreateAddProjectPopup() {

    $('#PMPrjName').val('');
    $('#PMPortfolioName').val('').change();
    $('#PMHubMaster').val('');
    $('#PMHubMaster').multiselect('refresh');
    $("#PMHubMaster").multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true,
    });
    $('#PMStartDate').val('');
    $('#PMEndDate').val('');
    $('#DivisionId').val(divisionId).change();
    $('#IsProjectPlanning').val('').change();
    //$('#IsHGHRequired').val('').change();

    $('#PMPrjName').val(product);
    var prjName = $.trim($('#PMPrjName').val());
    if (prjName.length > 40) {
        $('#Err_PrjName_Exceed').show();
    }
    else {
        $('#Err_PrjName_Exceed').hide();
    }

    $('#PMStartDate').datepicker('destroy');
    $('#PMEndDate').datepicker('destroy');

    $('#PMStartDate').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
    });

    $('#PMEndDate').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
    });

    if (userGroupArray[0].UserGroup?.toLowerCase() == "d3") {
        var defaultPortfolioValue = d3UserData[0].UserPortfolio;
        $('#PMPortfolioName').val(defaultPortfolioValue).trigger('change');
    }

    $(".Err_PM").hide();
    $('#add-project').modal('show');

}

$('#PMStartDate').on('change', function () {
    $('#PMEndDate').datepicker('setStartDate', $(this).val());
});

$('#PMEndDate').on('change', function () {
    $('#PMStartDate').datepicker('setEndDate', $(this).val());
});

$('#PMPrjName').on("keyup", function (event) {
    var prjName = $.trim($('#PMPrjName').val());
    if (prjName.length > 0) {

        $('#Err_PrjName').hide();
    }
    else {
        $('#Err_PrjName').show();
    }
    if (prjName.length > 40) {
        $('#Err_PrjName_Exceed').show();
    }
    else {
        $('#Err_PrjName_Exceed').hide();
    }
});

$("#PMTemplateName").on("change", function () {
    var template = $.trim($('#PMTemplateName').val());
    if (template.length > 0 && template != "Select") {

        $('#Err_Template').hide();
    }
    else {
        $('#Err_Template').show();
    }
});

$("#PMHubMaster").on("change", function () {
    var hub = $.trim($('#PMHubMaster').val());
    if (hub.length > 0) {

        $('#Err_Hub').hide();
    }
    else {
        $('#Err_Hub').show();
    }
});

$("#PMStartDate").on("change", function () {

    var startDate = $.trim($('#PMStartDate').val());

    if (startDate.length > 0) {
        $('#Err_StartDate').hide();
    }
    else {
        $('#Err_StartDate').show();
    }
});

$("#PMEndDate").on("change", function () {

    var endDate = $.trim($('#PMEndDate').val());

    if (endDate.length > 0) {

        $('#Err_EndDate').hide();
    }
    else {
        $('#Err_EndDate').show();
    }
});

$("#PMStartDate").on("keyup", function () {

    var startDate = $.trim($('#PMStartDate').val());

    if (startDate.length > 0 && startDate.length != 10) {
        $('#Val_StartDate').show();
    }
    else {
        $('#Val_StartDate').hide();
    }
});

$("#PMEndDate").on("keyup", function () {

    var endDate = $.trim($('#PMEndDate').val());

    if (endDate.length > 0 && endDate.length != 10) {
        $('#Val_EndDate').show();
    }
    else {
        $('#Val_EndDate').hide();
    }
});

$(document).on('change', '#PMPortfolioName', function () {

    var portfolio = $.trim($('#PMPortfolioName').val());
    if (portfolio.length > 0) {
        $('#Err_Portfolio').hide();
    }
    else {
        $('#Err_Portfolio').show();
        $('#Err_Bucket').show();
        $('#Err_ItemType').show();
        $('#Err_Template').show();
    }

    var portfolioId = $(this).val();

    var filteredBuckets = FilterBucketDropDown(portfolioId);
    function FilterBucketDropDown(PortfolioId) {
        var Buckets = bucketArray.filter(function (item) {
            return item.Parent === PortfolioId;
        });
        return Buckets;
    }

    $('#PMBucketName').empty();
    var bucketList = '<option>Select</option>';
    $.each(filteredBuckets, function (index, value) {
        bucketList += '<option value="' + value["BucketId"] + '">' + value["BucketName"] + '</option>';
    });

    $('#PMItemTypeName').empty();
    var itemTypeList = '<option>Select</option>';

    $('#PMTemplateName').empty();
    var templateList = '<option>Select</option>';

    $('#PMBucketName').append(bucketList);
    $('#PMItemTypeName').append(itemTypeList);
    $('#PMTemplateName').append(templateList);

    if (userGroupArray[0].UserGroup?.toLowerCase() == "d3") {
        var defaultBucketValue = d3UserData[0].UserBucket;
        $('#PMBucketName').val(defaultBucketValue).trigger('change');
    }

});

$(document).on('change', '#PMBucketName', function () {

    var bucket = $.trim($('#PMBucketName').val());
    if (bucket.length > 0 && bucket != "Select") {

        $('#Err_Bucket').hide();
    }
    else {
        flag = false;
        $('#Err_Bucket').show();
        $('#Err_ItemType').show();
        $('#Err_Template').show();
    }

    var bucketId = $(this).val();
    var filteredItemType = FilterItemTypeDropDown(bucketId);

    function FilterItemTypeDropDown(BucketId) {
        var filteredItemType = itemTypeArray.filter(function (item) {
            return item.Parent === BucketId;
        });

        return filteredItemType;
    }

    $('#PMItemTypeName').empty();
    var itemTypeList = '<option>Select</option>';
    $.each(filteredItemType, function (index, value) {
        itemTypeList += '<option value="' + value["ItemTypeId"] + '">' + value["ItemTypeName"] + '</option>';
    });

    $('#PMTemplateName').empty();
    var templateList = '<option>Select</option>';

    $('#PMItemTypeName').append(itemTypeList);
    $('#PMTemplateName').append(templateList);

    if (userGroupArray[0].UserGroup?.toLowerCase() == "d3") {
        var defaultItemType = d3UserData[0].UserItemType;
        $('#PMItemTypeName').val(defaultItemType).trigger('change');
    }

});

$(document).on('change', '#PMItemTypeName', function () {

    var itemType = $.trim($('#PMItemTypeName').val());
    if (itemType.length > 0 && itemType != "Select") {

        $('#Err_ItemType').hide();
    }
    else {
        $('#Err_ItemType').show();
        $('#Err_Template').show();
    }

    var itemTypeId = $(this).val();

    var filteredTemplate = FilterTemplateDropDown(itemTypeId);

    function FilterTemplateDropDown(ItemtypeId) {
        var filteredTemplate = templateArray.filter(function (item) {
            return item.Parent === ItemtypeId;
        });

        return filteredTemplate;
    }

    $('#PMTemplateName').empty();

    var templateList = '<option>Select</option>';

    $.each(filteredTemplate, function (index, value) {
        templateList += '<option value="' + value["TemplateId"] + '">' + value["Template"] + '</option>';
    });

    $('#PMTemplateName').append(templateList);

    if (userGroupArray[0].UserGroup?.toLowerCase() == "d3") {
        var defaultTemplateName = d3UserData[0].UserTemplate;
        $('#PMTemplateName').val(defaultTemplateName).trigger('change');
    }

});

$(".DivisionId , .IsProjectPlanning, .InfoDivisionId, .InfoIsProjectPlanning,.IsHGHRequired,.InfoIsHGHRequired").on("change", function () {

    var data = $(this).val();
    if ($(this).hasClass("DivisionId")) {
        data === "" ? $(".Err_Division").show() : $(".Err_Division").hide();
    } else if ($(this).hasClass("IsProjectPlanning")) {
        data === "" ? $(".Err_isPlanning").show() : $(".Err_isPlanning").hide();
    } else if ($(this).hasClass("InfoDivisionId")) {
        data === "" ? $(".Err_InfoDivision").show() : $(".Err_InfoDivision").hide();
    } else if ($(this).hasClass("InfoIsProjectPlanning")) {
        data === "" ? $(".Err_InfoIsPlanning").show() : $(".Err_InfoIsPlanning").hide();
    } else if ($(this).hasClass("IsHGHRequired")) {
        data === "" ? $(".Err_isHGH").show() : $(".Err_isHGH").hide();
    } else if ($(this).hasClass("InfoIsHGHRequired")) {
        data === "" ? $(".Err_InfoIsHGH").show() : $(".Err_InfoIsHGH").hide();
    }

});

function validateNewProjectForm() {

    var flag = true;

    var prjName = $.trim($('#PMPrjName').val());
    var portfolio = $('#PMPortfolioName').val();
    var template = $('#PMTemplateName').val();
    var itemType = $('#PMItemTypeName').val();
    var bucket = $('#PMBucketName').val();
    var hub = $('#PMHubMaster').val().toString();
    var startDate = $('#PMStartDate').val();
    var endDate = $('#PMEndDate').val();
    var division = $(".DivisionId").val();
    var isProjectPlanning = $(".IsProjectPlanning").val();
    // var isHGHRequired = $(".IsHGHRequired").val();

    $('.Err_PM').hide();
    if (
        prjName == "" || portfolio == "" || template == "" || template == "Select"
        || itemType == "" || itemType == "Select" || bucket == "" || bucket == "Select"
        || startDate == "" || endDate == "" || hub == ""
        || startDate.length > 0 && startDate.length != 10 || prjName.length > 40
        || division == "" || isProjectPlanning == "" //|| isHGHRequired == ""
    ) {

        flag = false;
        prjName == "" ? $('#Err_PrjName').show() : $('#Err_PrjName').hide();
        prjName.length > 40 ? $('#Err_PrjName_Exceed').show() : $('#Err_PrjName_Exceed').hide();
        portfolio == "" ? $('#Err_Portfolio').show() : $('#Err_Portfolio').hide();
        ((template == "") || (template == "Select")) ? $('#Err_Template').show() : $('#Err_Template').hide();
        ((itemType == "") || (itemType == "Select")) ? $('#Err_ItemType').show() : $('#Err_ItemType').hide();
        ((bucket == "") || (bucket == "Select")) ? $('#Err_Bucket').show() : $('#Err_Bucket').hide();
        hub == "" ? $('#Err_Hub').show() : $('#Err_Hub').hide();
        startDate == "" ? $('#Err_StartDate').show() : $('#Err_StartDate').hide();
        endDate == "" ? $('#Err_EndDate').show() : $('#Err_EndDate').hide();
        division == "" ? $('.Err_Division').show() : $('.Err_Division').hide();
        isProjectPlanning == "" ? $('.Err_isPlanning').show() : $('.Err_isPlanning').hide();
        //isHGHRequired == "" ? $('.Err_isHGH').show() : $('.Err_isHGH').hide();

    }

    if (flag) {

        $('#SaveAddProjectModal').modal('show');

        if (projectBriefId == "" || projectBriefId == null) {
            $(".msg-1").addClass("hide");
            $(".msg-2").removeClass("hide");
        }
        else {
            $(".msg-2").addClass("hide");
            $(".msg-1").removeClass("hide");
            $("#prj-brief-id").html(projectBriefId);
        }

        $('#SaveNewProject').off('click').on('click', function () {

            $('#SaveAddProjectModal').modal('hide');
            $('#loader').show();
            $('#loader').css('visibility', 'visible');

            $.ajax({
                type: "POST",
                url: ROOT + "NewProjectInitiation/SaveAddProjectData",
                data: {
                    ProjectCode: projectCode,
                    ProjectBriefId: projectBriefId,
                    Product: prjName,
                    Template: template,
                    ItemTypeName: itemType,
                    BucketName: bucket,
                    HubList: hub,
                    StartDate: startDate,
                    EndDate: endDate,
                    Portfolio: portfolio,
                    DivisionId: division,
                    IsProjectPalanning: isProjectPlanning
                    //IsHGHRequired: isHGHRequired
                },
                success: function (result) {
                    if (result.toLowerCase().includes('waiting')) {
                        window.location.reload();
                    }
                    else {
                        alert(result);
                    }
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
        });
    }
}

var DuplicateProductColModel = [
    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        classes: "prj-prod",
        ignoreCase: true,
        width: 160,
    },
    {
        name: 'Template',
        label: 'Template',
        resizable: true,
        ignorecase: true,
        width: 100,
    },
    {
        name: 'ItemType',
        label: 'Item Type',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'BucketName',
        label: 'Bucket',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'StartDate',
        label: 'Start Date',
        resizable: true,
        ignorecase: true,
        width: 80,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd F Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd MM yyyy',
                    autoclose: true
                }).change(function () {
                    $('#duplicate-product-grid')[0].triggerToolbar();
                });
            }
        }
    },
    {
        name: 'EndDate',
        label: 'End Date',
        resizable: true,
        ignorecase: true,
        width: 80,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd F Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd MM yyyy',
                    autoclose: true
                }).change(function () {
                    $('#duplicate-product-grid')[0].triggerToolbar();
                });

            }
        }
    },
    {
        name: 'HubName',
        label: 'HUB',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'ProjectId',
        label: 'Project Id',
        resizable: true,
        ignoreCase: true,
        width: 80,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue == "" && rowobject.ProjectStatus != null) {
                if (rowobject.ProjectStatus?.toLowerCase() == "waiting for sap posting") {
                    return '<span class="color-blue">' + rowobject.ProjectStatus + '</span>';
                }
                else if (rowobject.ProjectStatus?.toLowerCase() == "sap failed") {
                    return '<span class="text-danger">' + rowobject.ProjectStatus + '</span>';
                }
                else if (rowobject.ProjectStatus?.toLowerCase() == "sap in progress") {
                    return '<span class="text-warning">' + rowobject.ProjectStatus + '</span>';
                }
                else {
                    return ''
                }
            }
            else if (rowobject.Legacy == 'Yes') {
                return '<span class="Project legacy_color">' + rowobject.ProjectId + '</span>'
            }
            else {
                return '<span class="">' + rowobject.ProjectId + '</span>'
            }
        }
    },
    {
        name: 'Remarks',
        label: 'SAP Remarks',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        label: 'Created Date',
        name: 'CreatedDate',
        resizable: true,
        ignorecase: true,
        width: 60,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd/m/Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {

                $(e).datepicker({
                    format: 'dd/mm/yyyy',
                    autoclose: true
                }).change(function () {
                    $('#duplicate-product-grid')[0].triggerToolbar();
                });

            }
        }
    },
    {
        name: 'CreatedBy',
        label: 'Created By',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'Legacy',
        label: 'Legacy',
        resizable: true,
        width: 50,
        ignoreCase: true,
    },
    {
        name: 'Division',
        label: 'Division',
        resizable: true,
        width: 70,
        ignoreCase: true,
    },
    {
        name: 'IsProjectPlanning',
        label: 'Is Project Planning Required',
        resizable: true,
        width: 50,
        ignoreCase: true,
    },
    {
        name: 'IsHGHRequired',
        label: 'Is HGH Required',
        resizable: true,
        width: 50,
        ignoreCase: true,
    }
]
function CreateDuplicateProductJqgrid(data) {

    $.jgrid.gridUnload('#duplicate-product-grid');

    $("#duplicate-product-grid").jqGrid({
        url: '',
        mtype: 'GET',
        datatype: 'local',
        data: data,
        colModel: DuplicateProductColModel,
        loadonce: true,
        viewrecords: true,
        pager: '#duplicate-product-grid-pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#duplicate-product-grid tbody tr");
            var objHeader = $("#duplicate-product-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#duplicate-product-grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-280px + 100vh)' });
    $('#duplicate-product-grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#duplicate-product-grid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#duplicate-product-grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#duplicate-product-grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "8px");
    }
    else {
        $('#duplicate-product-grid').closest(".m-table__responsive").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#duplicate-product-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}

$(document).on("click", "#confirm-to-map-brief", function () {

    $.ajax({
        type: "POST",
        url: ROOT + "NewprojectInitiation/MapBriefToAdhocProject",
        type: "POST",
        data: {
            Product: product,
            ProjectBriefId: projectBriefId,
            ProjectCode: projectCode,
        },
        success: function (result) {

            $('#product-already-exists-popup').modal('hide');

            if (result) {

                var responseMsgClass = result.Item2;
                var responseMsg = result.Item1;

                $("#response-message-div-page").html(
                    `<div class="alert ${responseMsgClass} alert-dismissible d-flex justify-content-between" role="alert" id="message_alert">
                         ${responseMsg}
                         </div>`
                );

                $("#response-message-div-page").removeClass('hide').delay(5000).queue(
                    function (next) {
                        $(this).addClass('hide');
                        next();
                    }
                );

                $('#SearchPMData').click();
            }
            else {
                alert(result);
            }
        },
        error: function (err) {
            alert(err);
        }
    });

});
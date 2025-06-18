var projectArray = [];
projectArray = $("#Projects").val();
projectArray = projectArray != [] && projectArray != null ? JSON.parse(projectArray) : [];

var statusArray = [];
statusArray = $("#StatusValue").val();
statusArray = statusArray != [] && statusArray != null ? JSON.parse(statusArray) : [];

var DepartmentArray = [];
DepartmentArray = $("#Departments").val();
DepartmentArray = DepartmentArray != [] && DepartmentArray != null ? JSON.parse(DepartmentArray) : [];

var StatusList = '';
if (statusArray.length != 0) { 
    $.each(statusArray, function (i, obj){
        StatusList += '<option class="DepartmentOption" value="' + obj.StatusId + '">' + obj.StatusName + '</option>';
    })
    $(".addOption").append(StatusList);
}

var DepartmentList = '';

if (DepartmentArray.length != 0) {
    $.each(DepartmentArray, function (i, obj) {
        DepartmentList += '<option class="DeptmentOption" value="' + obj.DepartmentId + '">' + obj.DepartmentName + '</option>';
    })
    $(".addDepartmentOption").append(DepartmentList);
}

var today = new Date();
var startDate = new Date(today.getFullYear(), today.getMonth(), 1);
var endDate = today

function formatDate(date) {
    var dd = date.getDate().toString().padStart(2, '0');
    var mm = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    var yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

$('[data-datepicker-startdate1]').val(formatDate(startDate));
$('[data-datepicker-enddate1]').val(formatDate(endDate));

var selectedId = "";
var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 1));

$('[data-datepicker-startdate1]').datepicker({
    format: 'dd/mm/yyyy',
    endDate: start,
    autoclose: true
}).on('changeDate', function () {
    $('[data-datepicker-enddate1]').datepicker('setStartDate', $(this).val());

    var fromDate = parseDate($('#FromDate').val());
    var toDate = parseDate($('#ToDate').val());

    if (fromDate > toDate) {
        alert('From Date should not be greater than To Date');
        $('#FromDate').val('');
    }
});

$('[data-datepicker-enddate1]').datepicker({
    format: 'dd/mm/yyyy',
    endDate: start,
    autoclose: true
}).on('changeDate', function () {
    $('[data-datepicker-startdate1]').datepicker('setEndDate', $(this).val());

    var toDate = parseDate($('#ToDate').val());
    var fromDate = parseDate($('#FromDate').val());

    if (fromDate > toDate) {
        alert('To Date should not be less than From Date');
        $('#ToDate').val('');
    }
});
function parseDate(dateString) {
    var parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

initializeAutocomplete();

function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function initializeAutocomplete() {
    $("[data-projectid]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                SelectedFlag = 0;
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                var obj = [];
                var cnt = 0;
                $.grep(projectArray, function (value) {
                    var name = value.ProjectId;
                    var id = value.ProjectId;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id })
                        cnt++
                    }
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
                    SelectedFlag = 2;
                    terms.push("");
                    this.value = terms.join(", ");
                }
                else {
                    SelectedFlag = 1;
                    terms.push(selectedTerm);
                    terms.push("");
                    this.value = terms.join(", ");
                }
                return false;
            },
            close: function (event, ui) {
                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (SelectedFlag === 0 && $(event.target).val() != '') {
                        var inputValue = $(event.target).val();
                        var parts = inputValue.split(',');
                        parts.pop();
                        parts.push("");
                        var result = parts.join(', ');
                        $(event.target).val(result);
                        $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                    else if (SelectedFlag === 1) {
                        // this will handel over all span tag
                        $(event.target).siblings('span').addClass('hide');
                    }
                }
            },
            change: function (event, ui) {

                $(event.target).siblings('span').addClass('hide');

                var terms = split(this.value);
                var validItem = [];
                var invalidItem = [];
                if (terms.length > 0) {
                    terms.forEach(function (obj) {
                        if (obj != null && obj != "") {
                            var filteredResources = projectArray.filter(item => item.ProjectId === obj);

                            if (filteredResources.length > 0) {
                                validItem.push(obj);
                            }
                            else {
                                invalidItem.push(obj);
                            }
                        }
                    });

                    if (validItem.length > 0) {
                        validItem.push("");
                        this.value = validItem.join(", ");
                    }

                    if (invalidItem.length > 0) {
                        this.value = validItem.join(", ");
                        $(event.target).siblings('.not-valid').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                }
            }
        });
}
function GetBudgetReport() {
    var ProjectId = $("#ProjectId").val().trim();
    var fromDate = $("#FromDate").val();
    var toDate = $("#ToDate").val();
    var Status = $("#Status").val();
    var Department = $("#Department").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetBudgetReport",
        dataType: "JSON",
        async: false,
        data: {
            ProjectId: ProjectId,
            FromDate: fromDate,
            ToDate: toDate,
            Status: Status,
            Department: Department
        },
        success: function (data) {
            if (data) {
                CreateBudgetReport(data);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}

colmodels = [
    {
        name: 'ProjectId',
        label: 'Project Id',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    
    {
        name: 'DepartmentName',
        label: 'Department',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'Category',
        label: 'Category',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'ReqYear',
        label: 'Requested Year',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'BudgetType',
        label: 'Budget Type',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'RequestedAmount',
        label: 'Requested Amount',
        width: 50,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'ApprovedAmount',
        label: 'Approved Amount',
        width: 50,
        resizable: true,
        ignoreCase: true,
        classes: "text-right",
        formatter: function (cellvalue, options, rowobject) {
            return MakeAsMoney(cellvalue);
        }
    },
    {
        name: 'Status',
        label: 'Status',
        width: 90,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.Status?.toLowerCase() == "pending for approval") {
                return '<div class="task_status value_info "> <span class="text-warning">' + cellvalue + '</span></div>'
            }
            else if (rowobject.Status?.toLowerCase() == "approved") {
                return '<div class="task_status value_info "> <span class="text-success">' + cellvalue + '</span></div>'
            }
            else if (rowobject.Status?.toLowerCase() == "rejected" || rowobject.Status?.toLowerCase() == "sap failed") {
                return '<div class="task_status value_info "> <span class="text-danger">' + cellvalue + '</span></div>'
            }
        }
    },
    {
        name: 'StatusName',
        label: 'Status',
        width: 80,
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        hidden: true,
    },
    {
        name: 'RequestedBy',
        label: 'Requested By',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RequestedOn',
        label: 'Requested On',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ApprovedBy',
        label: 'Approved/ Rejected By',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ApprovedOn',
        label: 'Approved/ Rejected On',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },
]
GetBudgetReport();
function CreateBudgetReport(data) {
    $.jgrid.gridUnload('#BudgetDetailsReport');
    $("#BudgetDetailsReport").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_BudgetDetailsReport',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#BudgetDetailsReport tbody tr");
            var objHeader = $("#BudgetDetailsReport tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#BudgetDetailsReport").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });


    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-250px + 100vh)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 100) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "7px");
    }
    else {
        $(".m-table__responsive").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }
}

$(document).on("click", "#SearchPMData", function () {
    GetBudgetReport();
});

$(document).on("click", "#RefreshData", function () {
    $("#ProjectId").val('');
    $("#Department").val('').trigger('change');
    $("#Status").val('').trigger('change');
    $('[data-datepicker-startdate1]').val(formatDate(startDate));
    $('[data-datepicker-enddate1]').val(formatDate(endDate));
    GetBudgetReport();
});

$("#DownloadListExcel").click(function () {
    var data = $('#BudgetDetailsReport').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#BudgetDetailsReport").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "BudgetDetailsReport.xlsx",
            maxlength: 1000,
        });
    }
});

function MakeAsMoney(number) {

    if (number != null && number != "" && number != undefined) {
        return parseFloat(number).toLocaleString('en-IN', { maximumFractionDigits: 0 })
    }
    else if (number == 0) {
        return 0;
    }
    return "";
}
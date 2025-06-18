var result = [];
var modified_result = [];
var initial_array = [];
var filtered_array = [];
var checkedData = [];
var selectedbox = [];
var selectedboxActive = [];
$(document).ready(function () {
    $('.data-singleselect').select2();
    createJQgrid(result)
    var selectedTemplateId = $('#selectedTemplateId').val()
    if (selectedTemplateId == '') {
        $('#TemplateName').val('').trigger('change');
    }
    else {
        $('#TemplateName').val(selectedTemplateId).trigger('change');
        $('#SearchTMData').trigger('click');
    }
});
var colmodels = [
    {
        name: 'RoleId',
        label: 'Role Id',
        resizable: true,
        ignoreCase: true,
        width: 150,
        hidden: true,
    }, {
        name: 'Role',
        label: 'Department Name',
        resizable: true,
        ignoreCase: true,
        width: 150,
        formatter: 'text'
    },
    {
        name: 'IsActive',
        label: '<div class="text-center header_style">Is Active</div> <div class="mr-2 checkbox_position text-center"><input type="checkbox" id="cbox_isactive" onclick="checkboxforactive(event)"</div>',
        resizable: true,
        ignoreCase: true,
        width: 50,
        search: false,
        align: "center",
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<span> <input type="checkbox" class="isActivecbox" data-roleId="` + rowobject.RoleId + `" id="isActivebox_` + rowobject.RoleId + `"><span></span></span>`;
        }
    }
    , {
        name: 'IsBudgetPlanning',
        label: '<div class="text-center header_style">Budget Planning</div><div class="mr-2 checkbox_position text-center"><input type="checkbox" id="cbox_isbudget" onclick="checkboxforbudget(event)"</div>',
        resizable: true,
        ignoreCase: true,
        width: 50,
        search: false,
        align: "center",
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<span> <input type="checkbox" class="isBudgetcbox" data-roleId="` + rowobject.RoleId + `" id="isBudgetbox_` + rowobject.RoleId + `"><span></span></span>`;
        }
    }
];

function createJQgrid(result) {
    $.jgrid.gridUnload('#budget-planning-list');
    $("#budget-planning-list").jqGrid({
        data: result,
        datatype: 'local',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#budget-planning-list-pager',
        rowNum: result.length,
        scroll: 1,
        gridComplete: function () {
            if (modified_result.length > 0) {
                $.each(modified_result, function (i, obj) {
                    if (obj.IsActive === "True") {
                        $("#isActivebox_" + obj.RoleId).prop('checked', true);
                    } else {
                        $("#isActivebox_" + obj.RoleId).prop('checked', false);
                    }

                    if (obj.IsBudgetPlanning === "True") {
                        $("#isBudgetbox_" + obj.RoleId).prop('checked', true);
                    } else {
                        $("#isBudgetbox_" + obj.RoleId).prop('checked', false);
                    }
                });

                var notcheckedIsActiveRecords = modified_result.filter(function (obj) {
                    return obj.IsActive != "True"
                }).length;

                if (notcheckedIsActiveRecords > 0) {
                    $("#cbox_isactive").prop('checked', false);
                } else {
                    $("#cbox_isactive").prop('checked', true);
                }

                var notcheckedBudgetRecords = modified_result.filter(function (obj) {
                    return obj.IsBudgetPlanning != "True"
                }).length;

                if (notcheckedBudgetRecords > 0) {
                    $("#cbox_isbudget").prop('checked', false);
                } else {
                    $("#cbox_isbudget").prop('checked', true);
                }
            } else {
                $("#cbox_isactive").prop('checked', false);

                $("#cbox_isbudget").prop('checked', false);
            }

            var objRows = $("#budget-planning-list tbody tr");
            var objHeader = $("#budget-planning-list tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (var i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $("#budget-planning-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '60vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 500) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    } else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }
}
function getData(templateName) {
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetRoleHODMasterHeaderData",
        data: {
            TemplateName: templateName,
        },
        success: function (App_Results) {
            result = JSON.parse(App_Results);
            modified_result = JSON.parse(App_Results);
            initial_array = JSON.parse(App_Results);
            createJQgrid(result);
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
$('#SearchTMData').on('click', function () {
    var isModified = false;
    var templateName = $("#TemplateName").val();
    if (templateName == "" || templateName == "Select TemplateName") {
        alert("Please select templete");
    }
    else {
        debugger;
        isModified = validateSave();
        if (isModified && ($('#selectedTemplateId').val() != $("#TemplateName").val()))
        {
            UnsavedDataAlert("You have some unsaved Data, Please save otherwise you will lose the data",
                function () {
                    $("#saveButton").click();
                    //getData(templateName);
                },
                function () {
                    selectedTemplateId = templateName;
                    getData(selectedTemplateId);
                },
            );
        }
        else {
            getData(templateName);
        }
    }
});
function checkboxforactive(e) {
    debugger;
    e = e || event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = false;
    var headerCheckboxforIsActive = document.getElementById('cbox_isactive');
    var isactiveChecked = headerCheckboxforIsActive.checked;
    var isActive = isactiveChecked ? "True" : "False";

    var gridDataIds = $("#budget-planning-list").jqGrid('getDataIDs');
    if (gridDataIds != '' || gridDataIds.length > 0) {
        $.each(gridDataIds, function (row, rowId) {
            var roWData = $("#budget-planning-list").jqGrid('getRowData', rowId);
            $("#isActivebox_" + roWData.RoleId).prop("checked", isactiveChecked);

            var index = modified_result.findIndex(function (obj) {
                return parseInt(obj.RoleId) == parseInt(roWData.RoleId);
            });

            if (index > -1) {
                modified_result[index].IsActive = isActive;
            }
        })
    }
}
function checkboxforbudget(e) {
    e = e || event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = false;
    var headerCheckboxforIsBudgetPlanning = document.getElementById('cbox_isbudget');
    var isbudgetChecked = headerCheckboxforIsBudgetPlanning.checked;
    var isbudgetPlanning = isbudgetChecked ? "True" : "False";

    var gridDataIds = $("#budget-planning-list").jqGrid('getDataIDs');
    if (gridDataIds != '' || gridDataIds.length > 0) {
        $.each(gridDataIds, function (row, rowId) {
            var roWData = $("#budget-planning-list").jqGrid('getRowData', rowId);
            $("#isBudgetbox_" + roWData.RoleId).prop("checked", isbudgetChecked);

            var index = modified_result.findIndex(function (obj) {
                return parseInt(obj.RoleId) == parseInt(roWData.RoleId);
            });

            if (index > -1) {
                modified_result[index].IsBudgetPlanning = isbudgetPlanning;
            }
        })
    }
}

$('body').on('click', '.isActivecbox', function () {
    debugger;
    var roleId = $(this)[0].getAttribute('data-roleId');
    var checkedVal = $(this).prop('checked');
    var isActive = checkedVal ? "True" : "False";

    var index = modified_result.findIndex(function (obj) {
        return parseInt(obj.RoleId) == parseInt(roleId);
    });

    if (index > -1) {
        modified_result[index].IsActive = isActive;
    }
    checkisChecked(modified_result);
});

$('body').on('click', '.isBudgetcbox', function () {

    var roleId = $(this)[0].getAttribute('data-roleId');
    var checkedVal = $(this).prop('checked');
    var isBudgetPlanning = checkedVal ? "True" : "False";

    var index = modified_result.findIndex(function (obj) {
        return parseInt(obj.RoleId) == parseInt(roleId);
    });

    if (index > -1) {
        modified_result[index].IsBudgetPlanning = isBudgetPlanning;
    }
    checkisChecked(modified_result);
});

function checkisChecked(resData) {
    var notCheckedIsActive = resData.filter(function (obj) {
        return obj.IsActive != "True"
    }).length;
    var isActive = notCheckedIsActive > 0 ? false : true;
    $('#cbox_isactive').prop('checked', isActive);

    var notCheckedIsBudget = resData.filter(function (obj) {
        return obj.IsBudgetPlanning != "True"
    }).length;
    var isBudget = notCheckedIsBudget > 0 ? false : true;
    $('#cbox_isbudget').prop('checked', isBudget);
}

function validateSave() {

    var isModified = false;
    filtered_array = [];
    $.each(result, function (i, obj) {
        if (result[i].IsActive != modified_result[i].IsActive || result[i].IsBudgetPlanning != modified_result[i].IsBudgetPlanning) {
            isModified = true;
            filtered_array.push(modified_result[i]);
        }
    });

    return isModified;
}
$("#saveButton").on("click", function () {
    var flag = true;
    var templateName = $("#TemplateName").val();
    if (templateName == "" || templateName == "Please select Template Name") {
        flag = false;
        alert("There is no data to save");
    }
    if (flag) {
        var isValid = validateSave();
        if (isValid) {
            $("#SavePopUp").modal('show');
            $('#SaveOk').off('click').on('click', function () {
                $.ajax({
                    url: ROOT + "NewProjectInitiation/InsertBudgetPlanning",
                    type: "POST",
                    data: { budgetplaning: JSON.stringify(modified_result), Templete: templateName },
                    success: function (data) {
                        $("#SavePopUp").modal('hide');
                        showAlertMessage(data.OutMessage, data.StyleClass)
                        window.location.href = ROOT + 'NewProjectInitiation/BudgetPlanning';
                    }, error: function () {
                        alert("Error occured!!");
                    }

                });
            });
        }
        else {
            alert("There are no changes to save");
        }

    }
})
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}

$("#excel-download").click(function () {
    var templateName = $("#TemplateName").val();
    if (templateName == "" || templateName == "Select TemplateName") {
        alert("Please select templete");
        return false;
    }
    else if (result.length == 0) {
        alert("There is no data to download");
        return false;
    }
    else {
        $.ajax({
            url: ROOT + 'NewProjectInitiation/GetExcelData_BudgetPlanning',
            type: 'GET',
            data: { Template: templateName },
            xhrFields: {
                responseType: 'blob'
            },
            success: function (response) {
                saveData(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'BudgetPlanning.xlsx');
            },
            error: function () {
                alert('Error fetching data');
            }
        });
    }

});
$('#refreshdata').on('click', function () {
    var templateName = $("#TemplateName").val();
    if (templateName == "" || templateName == "Select TemplateName") {
        alert('Please select Template');
    }
    else {
            result = [];
            modified_result = [];
            initial_array = [];
            createJQgrid(result);
           $("#TemplateName").val('').trigger('change');
    }
});

// Function to save data as a file
function saveData(data, type, filename) {
    var blob = new Blob([data], { type: type });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}
var Users = [];
var DeptUsers = [];
var roleBudgetGridData = [];
var roleBudgetGridUpdated = [];
var roleMainData = [];
var Newflag = false;
var modifiedData = [];
var HODNameData = [];
$(document).ready(function () {
    getDepartmentList();
    getDepartmentResources();
    getUsers();
});
var colmodels = [
    {
        name: 'Role',
        label: 'Department Name',
        resizable: true,
        ignoreCase: true,
        width: 70,
        formatter: 'text'
    },
    {
        name: 'RoleId',
        label: '',
        resizable: true,
        ignoreCase: true,
        width: 70,
        formatter: 'text',
        hidden: true,
        classes: "roleid"
    },
    {
        name: 'HODName',
        label: 'HOD Name',
        resizable: true,
        ignoreCase: true,
        width: 70,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue === null || cellvalue === '' || cellvalue === undefined) {
                return '<div class="demo-content">' +
                // '<input type="text" class="form-control Hodtags appendValue" id="Hod" data-roleid="' + rowobject.RoleId + '" data-hod placeholder="Please select the HOD"/>' +
                 '<textarea class="form-control Hodtags appendValue" id="Hod" data-roleid="' + rowobject.RoleId + '" data-hod placeholder="Please select the HOD"></textarea>' +
                    '<span class="text-danger" style="display:none">Please select the HOD</span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                // '<input type="text" class="form-control Hodtags appendValue" id="Hod" data-roleid="' + rowobject.RoleId + '" data-hod value="' + cellvalue + '" /> ' +
                    '<textarea class="form-control Hodtags appendValue" id="Hod" data-roleid="' + rowobject.RoleId + '" data-hod value="' + cellvalue + '">' + cellvalue + '</textarea>' +
                    '</div>';
            }
        }
    }, {
        name: 'Resources',
        label: 'Resources',
        resizable: true,
        ignoreCase: true,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            var rowId = options.rowId;
            if (cellvalue === null || cellvalue === '' || cellvalue === undefined) {
                return '<div class="demo-content">' +
                // '<input type="text" class="form-control Resources appendValue" id="Resources" data-roleid="' + rowobject.RoleId + '" data-resource="' + rowId + '" placeholder="Please select the Resource"/>' +
                 '<textarea class="form-control Resources appendValue" id="Resources" data-roleid="' + rowobject.RoleId + '" data-resource="' + rowId + '" placeholder="Please select the Resource"></textarea>' +
                 '<span class="text-danger" style="display:none">Please select the Resources</span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                  //  '<input type="text" class="form-control Resources appendValue" id="Resources" data-roleid="' + rowobject.RoleId + '" data-resource="' + rowId + '" value="' + cellvalue + '" />' +
                    '<textarea class="form-control Resources appendValue" id="Resources" data-roleid="' + rowobject.RoleId + '" data-resource="' + rowId + '" value="' + cellvalue + '" >' + cellvalue + '</textarea>' +
                    '</div>';
            }
        }
    }
];
function createJQGrid(result) {
    $.jgrid.gridUnload('#role-team-list');
    $("#role-team-list").jqGrid({
        data: result,
        datatype: 'local',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#role-team-list-pager',
        rowNum: result.length,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#role-team-list tbody tr");
            var objHeader = $("#role-team-list tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (var i = 0; i < objFirstRowColumns.length; i++) {
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
            $(".Hodtags").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    selectedResourcesId = 0;
                    // delegate back to autocomplete, but extract the last term
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                    var obj = [];
                    var cnt = 0;
                    var matching = $.grep(Users, function (value, i) {
                        var name = value.EmployeeName + "-" + value.UserName;
                        var id = value.EmployeeName + "-" + value.UserName;
                        if (matcher.test(name) && cnt < 10) {
                            obj.push({ "value": name, "id": id })
                            cnt++
                        }
                        return matcher.test(id);
                    });
                    response(obj);
                },
                focus: function () {
                    // prevent value inserted on focus
                    return false;
                },
                select: function (event, ui) {
                    debugger;
                    var terms = split(this.value);
                    terms.pop();
                    var selectedTerm = ui.item.value;
                    if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                        alert("HOD already selected");
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
                            parts.pop();
                            var result = parts.join(',');
                            $(event.target).val(result);
                            alert("Please select the HOD from the list");
                        }
                        else if (selectedResourcesId === 1) {
                            $(event.target).siblings('span').addClass('hide');
                        }
                    }
                },
                change: function (event, ui) {
                    debugger;
                    var terms = split(this.value);
                    var validResources = [];
                    var invalidResources = [];
                    if (terms.length > 0) {
                        terms.forEach(function (usernames) {
                            if (usernames != null && usernames != "") {
                                debugger;
                                var HODName = usernames.split('-')[0].trim().toLowerCase();
                                var filteredHODs = Users.filter(item => item.EmployeeName.toLowerCase().trim() === HODName);

                                if (filteredHODs.length > 0) {
                                    var value = filteredHODs[0];
                                    validResources.push(value.EmployeeName + "-" + value.UserName);
                                }
                                else {
                                    invalidResources.push(usernames);
                                }
                            }
                        });

                        if (validResources.length > 0) {
                            validResources.push("");
                            this.value = validResources.join(", ");
                        }

                        if (invalidResources.length > 0) {
                            alert("<strong>" + invalidResources.toString() + "</strong> is not a valid HOD Name");
                            this.value = ""
                        }
                    }

                },

            });

            $(".Resources").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    debugger;
                    selectedResourcesId = 0;
                    // delegate back to autocomplete, but extract the last term
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                    var obj = [];
                    var cnt = 0;
                    var matching = $.grep(DeptUsers, function (value, i) {
                        var name = value.EmployeeName + "-" + value.UserName;
                        var id = value.EmployeeName + "-" + value.UserName;
                        if (matcher.test(name) && cnt < 10) {
                            obj.push({ "value": name, "id": id })
                            cnt++
                        }

                        return matcher.test(id);
                    });
                    response(obj);
                },
                focus: function () {
                    // prevent value inserted on focus
                    return false;
                },
                select: function (event, ui) {
                    var terms = split(this.value);
                    terms.pop();
                    var selectedTerm = ui.item.value;
                    if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                        alert("Resource already selected");
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
                    debugger;
                    if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                        if (selectedResourcesId === 0) {
                            var inputValue = $(event.target).val();
                            var parts = inputValue.split(',');
                            parts.pop();
                            var result = parts.join(',');
                            $(event.target).val(result);
                            alert("Please select the Resources from the list");
                        }
                        else if (selectedResourcesId === 1) {
                            $(event.target).siblings('span').addClass('hide');
                        }
                    }
                },
                change: function (event, ui) {
                    debugger;
                    var terms = split(this.value);
                    var validResources = [];
                    var invalidResources = [];
                    if (terms.length > 0) {
                        terms.forEach(function (deptusernames) {
                            if (deptusernames != null && deptusernames != "") {
                                var UserName = deptusernames.split('-')[0].trim().toLowerCase();
                                var filteredUsers = DeptUsers.filter(item => item.EmployeeName.toLowerCase().trim() === UserName);

                                if (filteredUsers.length > 0) {
                                    var value = filteredUsers[0];
                                    validResources.push(value.EmployeeName + "-" + value.UserName);
                                }
                                else {
                                    invalidResources.push(deptusernames);
                                }
                            }
                        });

                        if (validResources.length > 0) {
                            validResources.push("");
                            this.value = validResources.join(", ");
                        }

                        if (invalidResources.length > 0) {
                            alert("<strong>" + invalidResources.toString() + "</strong> is not a valid resource");
                            this.value = ""
                        }
                    }

                },
            });

            var isModified = false;
            $.each(roleBudgetGridData, function (i, obj) {
                var index = roleBudgetGridUpdated.findIndex(function (elem) {
                    return (parseInt(obj.RoleId) === parseInt(elem.RoleId)) && (obj.Hod === elem.Hod) && (obj.Resources === elem.Resources)
                });
                if (index === -1) {
                    isModified = true;
                }
            });
            if (isModified) {
                $("#role-team-list").jqGrid('setGridParam', { data: roleMainData });
            }
        }

    });

    $("#role-team-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '60vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    } else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }
}

function getDepartmentList() {
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/RoleTeamMasterList",
        dataType: "json",
        data: {},
        success: function (result) {
            roleMainData = result;
            roleBudgetGridData = [];
            roleBudgetGridUpdated = [];
            createJQGrid(result);
            $("#role-team-list").find("tr").each(function (index, element) {
                var rowData = {};
                if (index != 0) {
                    $(element).find("textarea").each(function () {
                        var id = $(this).attr("id");
                        var value = $(this).val();
                        rowData[id] = value;
                    });
                    rowData['dept'] = element.innerText.trim();
                    rowData['RoleId'] = parseInt($(element).find('td.roleid').text());
                    roleBudgetGridData.push(JSON.parse(JSON.stringify(rowData)));
                    roleBudgetGridUpdated.push(JSON.parse(JSON.stringify(rowData)));
                }
            });
        }
    });
}

$(document).on("click", ".Resources", function (event) {
    var parentRow = $(this).closest(".row");
    var val = parentRow.find('input[data-hod]').attr('data-hod');
});
function getUsers() {

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetUsers",
        dataType: "json",
        data: {},
        success: function (result) {
            Users = result;
        }
    });
}

function getDepartmentResources() {

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetDepartmentResources",
        dataType: "json",
        data: {},
        success: function (result) {
            DeptUsers = result;
        }
    });
}

var flagloaded = 0;
function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}


function validateSave() {
    var isModified = false;
    $.each(roleBudgetGridData, function (i, obj) {
        var index = roleBudgetGridUpdated.findIndex(function (elem) {
            return (parseInt(obj.RoleId) === parseInt(elem.RoleId)) && (obj.Hod === elem.Hod) && (obj.Resources === elem.Resources)
        });
        if (index === -1) {
            isModified = true;
        }
    });
    return isModified;
}
function checkRemovedDepartments() {
    var removedDepartments = [];
    $.each(roleBudgetGridData, function (i, originalRow) {
        var updatedRow = roleBudgetGridUpdated[i];

        var isOriginalHodNotEmpty = originalRow.Hod;
        var isOriginalResourcesNotEmpty = originalRow.Resources;

        var isUpdatedHodEmpty = !updatedRow.Hod;
        var isUpdatedResourcesEmpty = !updatedRow.Resources;

        if ((isOriginalHodNotEmpty && isUpdatedHodEmpty) || (isOriginalResourcesNotEmpty && isUpdatedResourcesEmpty)) {
            removedDepartments.push(originalRow.dept);
        }
    });

    if (removedDepartments.length > 0) {
        $('#ConfirmationPopup').modal('show');
        $('#confirmation_msg').html(
            'The following departments have HOD or resources removed: ' +
            '<strong>' + removedDepartments.join(', ') + '</strong>.' +
            '<div>Are you sure you want to continue?</div>'
        );
        $('#saveresources').on('click', function () {
            saveResources(0);
        });
    } else {
        saveResources(1);
    }
}

function saveResources(flag) {
    if (flag == 1) {
        $("#SavePopUp").modal('show');
        $('#SaveOk').off('click').on('click', function () {
            $.ajax({
                url: ROOT + "NewProjectInitiation/InsertResourcesName",
                type: "POST",
                data: { UsersData: JSON.stringify(roleBudgetGridUpdated) },
                success: function (data) {
                    $("#SavePopUp").modal('hide');
                    showAlertMessage(data.OutMessage, data.StyleClass);
                    roleBudgetGridData = JSON.parse(JSON.stringify(roleBudgetGridUpdated));
                },
                error: function () {
                    alert("Error occurred!!");
                }
            });
        });
    }
    else {
        $.ajax({
            url: ROOT + "NewProjectInitiation/InsertResourcesName",
            type: "POST",
            data: { UsersData: JSON.stringify(roleBudgetGridUpdated) },
            success: function (data) {
                $("#ConfirmationPopup").modal('hide');
                showAlertMessage(data.OutMessage, data.StyleClass);
                roleBudgetGridData = JSON.parse(JSON.stringify(roleBudgetGridUpdated));
            },
            error: function () {
                alert("Error occurred!!");
            }
        });
    }
}
$(document).on('change', '.Hodtags', function () {
    debugger;
    var e = $(this);
    var roleId = parseInt($(e).data('roleid'));
    var index = roleBudgetGridUpdated.findIndex(function (elem) { return parseInt(elem.RoleId) === parseInt(roleId) });
    if (index > -1) {
        roleBudgetGridUpdated[index].Hod = $(this).val().trim();
        roleMainData[index].HODName = $(this).val().trim();
    }
});
$(document).on('change', '.Resources', function () {
    debugger;
    var e = $(this);
    var roleId = parseInt($(e).data('roleid'));
    var index = roleBudgetGridUpdated.findIndex(function (elem) { return parseInt(elem.RoleId) === parseInt(roleId) });
    if (index > -1) {
        roleBudgetGridUpdated[index].Resources = $(this).val().trim();
        roleMainData[index].Resources = $(this).val().trim();
    }
});
$("#saveButton").click(function () {
    var flag = true;
    var validdatacount = 0;

    validdatacount = roleBudgetGridUpdated.filter(function (obj, i) {
        return obj.Hod != "" && obj.Resources != ""
    }).length

    if (validdatacount == 0) {
        flag = false;
        alert("Please select at least one department's HOD and Resource");
    } else {
        var isValid = validateSave();
        if (isValid) {
            checkRemovedDepartments();
        } else {
            alert("There are no changes to save");
        }
    }
});
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}
$("#excel-download").click(function () {
    $.ajax({
        url: ROOT + 'NewProjectInitiation/GetExcelData_TeamRoleMaster',
        type: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (response) {
            saveData(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'RoleTeamMaster.xlsx');
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
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}
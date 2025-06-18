var Users = [];
var DeptUsers = [];
var roleBudgetGridData = [];
var roleBudgetGridUpdated = [];
var isAddedToFiled = false;

$(document).ready(function () {
    getDepartmentList();
    getDepartmentResources();
    getUsers();
});

function loadJqgrid(data) {

    jqgridData = [];
    jqgridData = data;

    $.jgrid.gridUnload('#RoleBudgetGrid');

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
                var rowId = options.rowId;
                if (cellvalue === null || cellvalue === '' || cellvalue === undefined) {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control Hodtags appendValue" id="Hod"  data-roleid="' + rowobject.RoleId + '" data-hod placeholder="Please select the HOD" /><span class="text-danger" style="display:none">Please select the HOD</span>' +
                        '</div>';
                }
                else {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control Hodtags appendValue" id="Hod"  data-roleid="' + rowobject.RoleId + '" data-hod value="' + cellvalue + '" /> ' +
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
                        '<input type="text" class="form-control Resources appendValue" id="Resources"  data-roleid="' + rowobject.RoleId + '" data-resource="' + rowId + '" placeholder="Please select the Resource" /><span class="text-danger" style="display:none">Please select the Resources</span>' +
                        '</div>';
                }
                else {
                    return '<div class="demo-content">' +
                        '<input type="text" class="form-control Resources appendValue" id="Resources"  data-roleid="' + rowobject.RoleId + '" data-resource="' + rowId + '" value="' + cellvalue + '" />' +
                        '</div>';

                }
            }
        }
    ];

    $("#RoleBudgetGrid").jqGrid({
        data: data,
        datatype: 'local',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_RoleBudgetGrid',
        rowNum: data.length,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#RoleBudgetGrid tbody tr");
            var objHeader = $("#RoleBudgetGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (var i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            $.each(document.getElementsByClassName("appendvalue"), function () {
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
        }
    });

    $("#RoleBudgetGrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
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
        url: ROOT + "ProjectMaster/RoleTeamMasterList",
        dataType: "json",
        async: false,
        data: {},
        success: function (result) {
            roleBudgetGridData = [];
            roleBudgetGridUpdated = [];
            if (result != undefined && result != null && result != "") {
                loadJqgrid(result);
            }
            else {
                loadJqgrid();
            }
            $("#RoleBudgetGrid").find("tr").each(function (index, element) {
                var rowData = {};
                if (index != 0) {
                    $(element).find("input").each(function () {
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
function getUsers() {

    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetUsers",
        dataType: "json",
        data: {},
        async: false,
        success: function (result) {
            Users = result;
        }
    });
}
function getDepartmentResources() {

    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetDepartmentResources",
        dataType: "json",
        async: false,
        data: {},
        success: function (result) {
            DeptUsers = result;
        }
    });
}
$(document).on("keypress", ".Hodtags", function (event) {

    $(".Hodtags").autocomplete({
        minLength: 0,
        source: function (request, response) {
            selectedResourcesId = 0;
            isAddedToFiled = false;
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
            var obj = [];
            var cnt = 0;
            if (request.term.trim() != "") {
                var matching = $.grep(Users, function (value, i) {
                    var name = Users[i];
                    var id = Users[i];
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id })
                        cnt++
                    }
                    return matcher.test(id);
                });
            }
            if (obj.length != 0) {
                response(obj);
            }
            else {
                var terms = split($(event.target).val());
                terms.pop();
                terms.push("");
                $(event.target).val(terms.join(', '))
                alert("Please select the HOD from the list");
            }
        },
        focus: function () {
            return false;
        },
        select: function (event, ui) {
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
                isAddedToFiled = true;
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
                    terms.pop();
                    terms.push("");
                    var result = parts.join(',');
                    $(event.target).val(result);
                    alert("Please select the HOD from the list");
                }
                else if (selectedResourcesId === 1) {
                    $(event.target).siblings('span').addClass('hide');
                }
            }
        }
    });

});
$(document).on("keypress", ".Resources", function (event) {

    $(".Resources").autocomplete({
        minLength: 0,
        source: function (request, response) {
            isAddedToFiled = false;
            selectedResourcesId = 0;
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
            var obj = [];
            var cnt = 0;
            if (request.term.trim() != "") {
                var matching = $.grep(DeptUsers, function (value, i) {
                    var name = DeptUsers[i];
                    var id = DeptUsers[i];
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id })
                        cnt++
                    }
                    return matcher.test(id);
                });
            }
            if (obj.length != 0) {
                response(obj);
            }
            else {
                var terms = split($(event.target).val());
                terms.pop();
                terms.push("");
                $(event.target).val(terms.join(", "))
                alert("Please select the Resources from the list");
            }
        },
        focus: function () {
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
                isAddedToFiled = true;
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
                    terms.pop();
                    terms.push("");
                    var result = parts.join(',');
                    $(event.target).val(result);
                    alert("Please select the Resources from the list");
                }
                else if (selectedResourcesId === 1) {
                    $(event.target).siblings('span').addClass('hide');
                }
            }
        }
    });

});

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
function saveResources() {

    $("#SavePopUp").modal('show');
    $('#SaveOk').off('click').on('click', function () {
        $.ajax({
            url: ROOT + "ProjectMaster/InsertResourcesName",
            type: "POST",
            data: { UsersData: JSON.stringify(roleBudgetGridUpdated) },
            success: function (data) {
                $("#SavePopUp").modal('hide');
                showAlertMessage(data.OutMessage, data.StyleClass);
                getDepartmentList();
            },
            error: function () {
                alert("Error occurred!!");
            }
        });
    });

}
$(document).on('change', '.Hodtags', function () {

    var e = $(this);
    var roleId = parseInt($(e).data('roleid'));
    var index = roleBudgetGridUpdated.findIndex(function (elem) { return parseInt(elem.RoleId) === parseInt(roleId) });
    if (index > -1) {
        roleBudgetGridUpdated[index].Hod = $(this).val().trim();
    }
    
   //if (isAddedToFiled) {
        var index = jqgridData.findIndex(function (elem) { return parseInt(elem.RoleId) === parseInt(roleId) });
        if (index > -1) {
            jqgridData[index].HODName = $(this).val().trim();
        }
   //}

});
$(document).on('change', '.Resources', function () {
    
    var e = $(this);
    var roleId = parseInt($(e).data('roleid'));
    var index = roleBudgetGridUpdated.findIndex(function (elem) { return parseInt(elem.RoleId) === parseInt(roleId) });
    if (index > -1) {
        roleBudgetGridUpdated[index].Resources = $(this).val().trim();
    }

    //if (isAddedToFiled) {
        var index = jqgridData.findIndex(function (elem) { return parseInt(elem.RoleId) === parseInt(roleId) });
        if (index > -1) {
            jqgridData[index].Resources = $(this).val().trim();
        }
   //}
});
$("#saveButton").click(function () {

    var validdatacount = 0;
    validdatacount = roleBudgetGridUpdated.filter(function (obj, i) {
        return obj.Hod != "" && obj.Resources != ""
    }).length

    if (validdatacount == 0) {
        flag = false;
        alert("Please select at least one department's HOD and Resource");
    }
    else {
        var isValid = validateSave();
        if (isValid) {
            saveResources();
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
$("#ExcelDownload").click(function () {
    $.ajax({
        url: ROOT + 'ProjectMaster/GetExcelData_TeamRoleMaster',
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
function saveData(data, type, filename) {
    var blob = new Blob([data], { type: type });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}
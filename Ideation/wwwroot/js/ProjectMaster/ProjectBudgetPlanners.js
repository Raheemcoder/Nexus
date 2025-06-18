var details = [];
var role = "";
var Resourcesdetails = {};
var count = 0;
var deletedArr = [];

$(document).ready(function () {

    $('.example-dropUp').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });

    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetActiveDepartments",
        data: {
            ProjectId: $("#ProjectId").val()
        },
        dataType: "JSON",
        success: function (result) {

            details = result.TemplateMasterListOld;
            if (details.length == 0) {
                $(".projectid").val($("#ProjectId").val());
            }
            else {
                $(".projectid").val($("#ProjectId").val() + "-" + details[0].Product);
            }

            $.each(result.TemplateMasterListOld, function (i, data) {
                var hodname = $.trim(data.HODName)
                if (hodname.endsWith(',')) {
                    var hod = hodname.slice(0, -1);
                }
                var hname = hod == undefined ? "" : hod
                var htmlTag = ""
                htmlTag = `<li class="nav-item">
                                <a data-toggle="tab" class="list-item" onclick=Getdetails(`+ i + `)>
                                    <div class="row" style="row-gap: 0px;" id="roleInfoContainer">
                                        <div class="col-auto">
                                            <div class="form-group mb-0">
                                                <span>Department Name : </span>
                                                <span><strong>`+ data.Role + `</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-auto">
                                            <div class="form-group mb-0" style="text-align:left;">
                                                <span>HOD : <b></b></span>
                                                <span>`+ hname + `</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>`
                $(".BasedOnRole").append(htmlTag);
            });

            $.each(result.GetDepartmentUsersList, function (i, obj) {
                var resources = obj.Resources.split(",");
                $.each(resources, function (i, user) {

                    var ResourceName = {};
                    ResourceName =
                    {
                        ResourceName: user,
                    }
                    if (!Resourcesdetails[obj.DepartmentName]) {
                        Resourcesdetails[obj.DepartmentName] = [];
                        Resourcesdetails[obj.DepartmentName].push(ResourceName);
                    }
                    else {
                        Resourcesdetails[obj.DepartmentName].push(ResourceName);
                    }
                });
            });

        }
    });
});

function Getdetails(i) {

    role = details[i].Role;
    var username = [];
    $.ajax({
        type: "POST",
        url: ROOT + "ProjectMaster/GetDepartmentUsers",
        data: {
            Role: role,
            ProjectId: $("#ProjectId").val()
        },
        dataType: "JSON",
        success: function (result) {
            var ResourceList = result.Item1[0]?.Resources.split(",").map(function (resource) {
                return resource.trim();
            });
            count = result.Item2;

            $(".error_user").val("").hide();
            var CategoryList = '';
            $("option").remove(".addOption");
            $.each(ResourceList, function (i, obj) {
                if (obj != "") {
                    CategoryList += '<option class="addOption" value="' + obj + '">' + obj + '</option>';
                    username.push(obj);
                }
            });
            $(".addUserOption").html(CategoryList);
            $('.addUserOption').multiselect('rebuild');

            jQuery('#ResourceGrid').jqGrid('clearGridData');

            // New 
            if (count == 0) {

                $.each(username, function (i, obj) {

                    var flag = deletedArr.filter(item => item.role == role && item.resource == obj).length == 0 ? true : false;

                    if (flag) {
                        var ResourceName = {};
                        var griddata = [];
                        ResourceName =
                        {
                            ResourceName: obj,
                        }
                        griddata.push(ResourceName);
                        var data1 = $("#ResourceGrid").jqGrid('getGridParam', 'data');
                        var data2 = $.merge(data1, griddata);
                        $("#ResourceGrid").jqGrid('setGridParam', { data: data2 });
                        $("#ResourceGrid").trigger('reloadGrid', [{ page: 1 }]);
                    }

                    if (Resourcesdetails[role] != undefined) {
                        if (flag) {
                            var foundIndex = Resourcesdetails[role].findIndex(x => x.ResourceName === ResourceName.ResourceName);
                            if (foundIndex == -1) {
                                Resourcesdetails[role].push(ResourceName);
                            }
                        }
                    }
                    else {
                        if (flag) {
                            Resourcesdetails[role] = [];
                            Resourcesdetails[role].push(ResourceName);
                        }
                    }

                });
            }
            // Already saved
            else if (count > 0) {

                if (Resourcesdetails[role] != undefined) {
                    var data1 = $("#ResourceGrid").jqGrid('getGridParam', 'data');
                    var data2 = $.merge(data1, Resourcesdetails[role]);
                    $("#ResourceGrid").jqGrid('setGridParam', { data: data2 });
                    $("#ResourceGrid").trigger('reloadGrid', [{ page: 1 }]);
                }
                else {
                    $("#ResourceGrid").jqGrid('setGridParam', { data: [] });
                    $("#ResourceGrid").trigger('reloadGrid', [{ page: 1 }]);
                }

            }
        },
    });

}

$(".addResourceName").on("click", function () {

    var username = $(".addUserOption").val();
    checkUsersPresence();
    if (username == "") {
        alert("Please select the user");
    }
    else {
        if ($(".error_user").text() == "") {
            $.each(username, function (i, obj) {
                var ResourceName = {};
                var griddata = [];
                ResourceName =
                {
                    ResourceName: obj,
                }
                griddata.push(ResourceName);
                var data1 = $("#ResourceGrid").jqGrid('getGridParam', 'data');
                var data2 = $.merge(data1, griddata);
                $("#ResourceGrid").jqGrid('setGridParam', { data: data2 });
                $("#ResourceGrid").trigger('reloadGrid', [{ page: 1 }]);

                if (!Resourcesdetails[role]) {
                    Resourcesdetails[role] = [];
                    debugger
                    var foundIndex = deletedArr.findIndex(item => item.role == role && item.resource != ResourceName);
                    if (foundIndex !== -1) {
                        deletedArr.splice(foundIndex, 1);
                    }
                    Resourcesdetails[role].push(ResourceName);
                }
                else {
                    var foundIndex = deletedArr.findIndex(item => item.role == role && item.resource != ResourceName);
                    if (foundIndex !== -1) {
                        deletedArr.splice(foundIndex, 1);
                    }
                    Resourcesdetails[role].push(ResourceName);
                }
            });
            $(".addUserOption").val("").multiselect("refresh");
        }
    }
});

function checkUsersPresence() {
    var names = $.trim($(".addUserOption").val()).toLowerCase().split(",");
    const productList = $("#ResourceGrid").jqGrid("getCol", "ResourceName");
    const lowerCaseProductList = productList.map(product => product.toLowerCase());
    if (names.length > 0) {
        let userExists = false;
        names.forEach(name => {
            if (lowerCaseProductList.includes(name)) {
                userExists = true;
            }
        });
        if (userExists) {
            $(".error_user").show().text('User already exists. Please add another user');
        } else {
            $(".error_user").hide().text('');
        }
    }
}

colmodels = [
    {
        name: 'ResourceName',
        label: 'Resource Name',
        width: 620,
        resizable: true,
        ignoreCase: true
    },
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        width: 80,
        ignoreCase: true,
        search: false,

        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex action_icons align-items-center" title="">' +
                '<a class="btn-icon -delete"><i class="fas fa-trash" onclick=OnDeleteResources(' + options.rowId + ') id="DeleteResource" title="Delete"></i></a>' +
                '</div>';
        }
    },

],
    $("#ResourceGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_ResourceGrid',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#ResourceGrid tbody tr");
            var objHeader = $("#ResourceGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#ResourceGrid").jqGrid('filterToolbar', {
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
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
}

function OnDeleteResources(RowData) {

    var rowid = RowData;
    var DataFromTheRow = jQuery('#ResourceGrid').jqGrid('getRowData', rowid);

    $("#Deletetemplateresourcename").modal("show");

    $("#deleteResource").off("click").on("click", function () {

        var foundIndex = Resourcesdetails[role].findIndex(x => x.ResourceName === DataFromTheRow.ResourceName);
        if (foundIndex !== -1) {
            Resourcesdetails[role].splice(foundIndex, 1);
            if (count == 0) {
                deletedArr.push({
                    role: role,
                    resource: DataFromTheRow.ResourceName
                });
            }
        }

        $("#ResourceGrid").jqGrid("clearGridData");
        $("#ResourceGrid").jqGrid('setGridParam', { data: Resourcesdetails[role] });
        $("#ResourceGrid").trigger('reloadGrid', [{ page: 1 }]);
        rowid = "";

    });

}

$("#save-con-Button").off("click").on("click", function () {
    var flag = true;
    if (flag) {

        $(".save-msg").empty().html('Are you sure you want to save and confirm the details?')
        $("#SavePopUp").modal('show');
        $('#SaveOk').off("click").on('click', function () {
            $.ajax({
                url: ROOT + "ProjectMaster/InsertProjectResourcesDetails",
                type: "POST",
                data: {
                    ProjectUserData: JSON.stringify(Resourcesdetails),
                    ProjectId: $("#ProjectId").val(),
                    Type: 2
                },
                success: function (data) {
                    deletedArr = [];
                    showAlertMessage(data.OutMessage, data.StyleClass)
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
        });
    }
});

$("#save-draft-Button").off("click").on("click", function () {
    var flag = true;
    if (flag) {
        $(".save-msg").empty().html('Are you sure you want to save the details?')
        $("#SavePopUp").modal('show');
        $('#SaveOk').off("click").on('click', function () {
            $.ajax({
                url: ROOT + "ProjectMaster/InsertProjectResourcesDetails",
                type: "POST",
                data: {
                    ProjectUserData: JSON.stringify(Resourcesdetails),
                    ProjectId: $("#ProjectId").val(),
                    Type: 1
                },
                success: function (data) {
                    deletedArr = [];
                    showAlertMessage(data.OutMessage, data.StyleClass)
                },
                error: function () {
                    alert("Error occured!!");
                }
            });
        });
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
        url: ROOT + 'ProjectMaster/GetExcelData_DepartmentBudgetUsers',

        type: 'GET',
        data: { PRojectId: $("#ProjectId").val() },
        xhrFields: {
            responseType: 'blob'
        },
        success: function (response) {
            saveData(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'DepartmentBudgetUsers.xlsx');
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

$('#global-search').on('input', function () {
    var searchValue = $(this).val().toLowerCase();
    var navitem = $('.nav-item');
    navitem.each(function () {
        var BasedOnRole = $(this).find('.list-item');
        var cardText = BasedOnRole.text().toLowerCase();

        if (cardText.includes(searchValue)) {
            $(this).css('display', 'block');
        } else {
            $(this).css('display', 'none');
        }
    });
});
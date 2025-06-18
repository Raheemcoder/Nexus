var initialcostcenters_arr = [];
var costcenters_arr = [];
var autosuggestcostcenter = [];
var costcenters = [];
var filtered_arr = [];
$(document).ready(function () {
    $.ajax({
        url: ROOT + "NewProjectInitiation/GetRoleCostCenterMasterData",
        type: 'GET',
        dataType: 'json',
        data: {},
        async: false,
        success: function (data) {
            initialcostcenters_arr = JSON.parse(data).AddedCostCenter;
            costcenters_arr = JSON.parse(data).AddedCostCenter;
        },
        error: function () {
            console.log("Error Occurred");
        }
    });
    var firstLink = $("a.nav-link").first();
    getCostCenterDetails(firstLink.get(0));

    $("#global-search").on("keyup", function () {
        var searchText = $(this).val().toLowerCase();
        $(".nav-link").each(function () {
            var tabText = $(this).text().toLowerCase();
            if (tabText.indexOf(searchText) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
$("#costcenter").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: ROOT + "NewProjectInitiation/GetCostCenterNames",
            type: 'GET',
            dataType: 'json',
            data: { term: request.term },
            global: false,
            success: function (data) {
                autosuggestcostcenter = data;
                costcenters = [];
                $.each(autosuggestcostcenter, function (i, obj) {
                    if (obj.Name && request.term && obj.Name.trim().toLowerCase().includes(request.term.trim().toLowerCase())) {
                        var index = costcenters.findIndex(function (obj1) { return obj1.label === obj.Name });
                        if (index == -1) {
                            costcenters.push({
                                label: obj.Name,
                                value: obj.Name,
                                "CostCenterName": obj.Name,
                            });
                        }
                    }
                });
                response(costcenters);
            },
            error: function () {
                console.log("Error Occurred");
            }
        });
    },
    minLength: 1,
    change: function (event, ui) {
        if ($(event.target).val() !== '' && $(event.target).val() !== null && typeof ($(event.target).val()) !== "undefined") {
            var costArray = costcenters.filter(item => item.CostCenterName.trim().toLowerCase() == $(event.target).val().trim().toLowerCase()).length;
            if (costArray == 0) {
                $(event.target).val("");
                alert("Please select the Cost Center from the list");
            }
        }
    }
});
function getCostCenterDetails(obj) {
    filtered_arr = [];
    var role = obj.getAttribute('data-role');
    $('#rolename').val(role);
    filtered_arr = costcenters_arr.filter(function (res) {
        return res.Role.toLowerCase() === role.toLowerCase();
    });
    createJQGrid(filtered_arr);
    $('#costcenter').val('');
}
$('.addgriddata').on('click', function () {
    filtered_arr = [];
    var isValid = true;
    var costcenter = $('#costcenter').val().trim();
    var role = $('#rolename').val();
    if (costcenter == '' || costcenter == null) {
        alert('Please select Cost Center');
        isValid = false;
        return false;
    }
    else {
        if (isValid) {
            var index = costcenters_arr.findIndex(function (obj) {
                return obj.Role.toLowerCase() == role.toLowerCase() && obj.CostCenterName.trim().toLowerCase() === costcenter.trim().toLowerCase();
            });
            if (index > -1) {
                alert('Duplicate Cost Center ' + "<strong>" + costcenter + "</strong>" + ' found. Duplicates are not allowed');

            }
            else {
                var costcenterdescription = {
                    "Role": role,
                    "CostCenterName": costcenter
                }

                costcenters_arr.unshift(costcenterdescription);
            }
            filtered_arr = costcenters_arr.filter(function (res) {
                return res.Role.toLowerCase() === role.toLowerCase();
            })
            createJQGrid(filtered_arr);
        }

    }
    $('#costcenter').val('');
});
var colmodels = [
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        width: 50,
        ignoreCase: true,
        sortable: false,
        search:false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex action_icons align-items-center justify-content-center"" style="text-align: center;" title="">' +
                '<a href="#" class="" title=""><i class="fas fa-trash color-delete" title="Delete" onclick="deleteResource(\'' + rowobject.CostCenterName + '\')"></i></a>' +
                '</div>';
        }
    },
    {
        name: 'CostCenterName',
        label: 'Cost Center Name',
        width: 500,
        resizable: true,
        ignoreCase: true,
        align: 'left'
    },
];

function createJQGrid(result) {
    $.jgrid.gridUnload('#claims-grid-list');
    $("#claims-grid-list").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#claims-grid-pager',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#claims-grid-list tbody tr");
            var objHeader = $("#claims-grid-list tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#claims-grid-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}
function validateSave() {
    var isModified = false;
    $.each(costcenters_arr, function (i, ele) {
        var index = initialcostcenters_arr.findIndex(function (obj) {
            return ele.Role.toLowerCase() === obj.Role.toLowerCase() && ele.CostCenterName.trim().toLowerCase() == obj.CostCenterName.trim().toLowerCase();
        })
        if (index == -1) {
            isModified = true;
        }
    })
    return isModified;
}
$('#savebtn').on('click', function () {
    var isModified = validateSave();
    if (isModified) {
        $("#confirmationPopUpforSave").modal('show');
        $('#confirmationmsgforsave').text('Are you sure you want to save the cost center details');
        $('#confirmsave').off('click').on('click', function () {
            $.ajax({
                type: "POST",
                url: ROOT + "NewProjectInitiation/UpdateRoleCostCenterName",
                data: {
                    dataToSave: JSON.stringify(costcenters_arr)
                },
                success: function (response) {
                    debugger;
                    $('#loader').show();
                    $('#loader').css('visibility', 'visible');
                    filtered_arr = [];
                    $("#confirmationPopUpforSave").modal('hide');
                    showAlertMessage(response.message, response.success);
                },
                error: function (error) {
                    alert(error);
                }
            });
        });

    }
    else {
        alert('There are no changes to save');
    }
});
function deleteResource(costcenter) {
    filtered_arr = [];
    var role = $('#rolename').val();
    $('#confirmationPopUpforDelete').modal('show');
    $('#confirmationmsgfordelete').html('Are you sure you want to delete the cost center for the role <strong>' + role + '</strong>');
    $('#confirmdelete').on('click', function () {
        $.ajax({
            type: "POST",
            url: ROOT + "NewProjectInitiation/RoleCostCenterNameDelete",
            data: {
                CostCenterName: costcenter,
                Role: role,
            },
            success: function (response) {
                $('#loader').show();
                $('#loader').css('visibility', 'visible');
                filtered_arr = costcenters_arr.filter(function (res) {
                    return res.Role.toLowerCase() === role.toLowerCase();
                });
                var index = costcenters_arr.findIndex(function (ele) {
                    return ele.Role.toLowerCase() === role.toLowerCase() && ele.CostCenterName.trim().toLowerCase() == costcenter.trim().toLowerCase();
                });
                if (index > -1) {
                    costcenters_arr.splice(index, 1);
                    filtered_arr = costcenters_arr.filter(function (res) {
                        return res.Role.toLowerCase() === role.toLowerCase();
                    });
                }
                var initialIndex = initialcostcenters_arr.findIndex(function (ele) {
                    return ele.Role.toLowerCase() === role.toLowerCase() && ele.CostCenterName.trim().toLowerCase() == costcenter.trim().toLowerCase();
                })
                if (initialIndex > -1) {
                    initialcostcenters_arr.splice(initialIndex, 1);
                }
                showAlertMessage('Cost Center Details Deleted Successfully', 'alert-danger');
                createJQGrid(filtered_arr);
                $('#confirmationPopUpforDelete').modal('hide');
            },
            error: function (error) {
                alert(error);
            }
        });

    });
}
$('.preview').on('click', function () {
    debugger;
    var tableHtml = `<tbody>`;
    var groupedData = {};
    costcenters_arr.forEach(({ Role, CostCenterName }) => {
        debugger;
        if (!groupedData[Role]) {
            groupedData[Role] = [];
        }
        groupedData[Role].push(CostCenterName);
    });
    var result = Object.keys(groupedData).map(Role => ({
        Role,
        CostCenterNames: groupedData[Role].join(', ')
    })).sort((a, b) => a.Role.localeCompare(b.Role));

    $.each(result, function (i, obj) {
        tableHtml += `
            <tr>
                <th class="tablewidth1">${obj.Role}</th>
                <td class="previewprojectname">${obj.CostCenterNames}</td>
            </tr>
        `;
    });

    $('.costcenter-preview-table-body').html(tableHtml);

    $("#preview-modal").modal("show");
});
$("#excel-download").on('click', function () {
    window.location.href = ROOT + "NewProjectInitiation/GetExcelRoleCostCenterMasterData"
});

$(".board_view").hide();
$(".list_gridview").hide();

$(".list").click(function () {
    $(".grid_view").addClass("list_view");
    $(".grid_view").removeClass("listgrid_table");
    $(".list_gridview").show();
    $(".grid_table").hide();
});

$(".table_view").click(function () {
    $(".grid_view").addClass("listgrid_table");
    $(".grid_view").removeClass("list_view");
    $(".grid_table").show();
});

$(".collapse_cell").click(function () {
    $(this).closest("li").addClass("cell_close");
});
$(".expand_cell").click(function () {
    $(this).closest("li").removeClass("cell_close");
});

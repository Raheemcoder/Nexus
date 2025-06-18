var response_array = [];
var resourcearray = [];
var initial_array = [];
var templatearray = [];
var filtered_array = [];
var initial_duration = 0;
var template = $('.template-row').first();
var datafortemplate;
$(document).ready(function () {
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

    loadData();
    var selectedTemplateId = $('#selectedTemplateId').val()
    if (selectedTemplateId == '') {
        $('#TMTemplateName').val('').trigger('change');
    }
    else {
        $('#TMTemplateName').val(selectedTemplateId).trigger('change');
        $('#SearchTMData').trigger('click');
    }
});
function loadData() {
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetTemplateMasterHeaderData",
        data: {},
        success: function (response) {
            filtered_array = [];
            $('#loader').show();
            $('#loader').css('visibility', 'visible');
            var responseData = JSON.parse(response);
            templatearray = responseData.TemplateData;
            var initialdata = JSON.parse(response);
            initial_array = initialdata.AddedResource;
            resourcearray = responseData.AddedResource;
        }
    });
}
function preventMinusInput(event) {
    const input = event.target;
    const currentValue = input.value;
    const newValue = currentValue.replace(/-/g, '').replace(/^0+/, '');
    input.value = newValue;
}
function handlePaste(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');
    if (/[^0-9]/.test(pastedData) || pastedData.includes('.')) {
        event.preventDefault();
        alert('Please enter a valid duration');
        event.target.value = '';
        return;
    }
    let sanitizedData = pastedData.replace(/^0+/, '');
    event.preventDefault();
    const input = event.target;
    input.value = sanitizedData;
}


var colmodels = [

    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        width: 50,
        ignoreCase: true,
        sortable: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex action_icons align-items-center justify-content-center" title="">' +
                '<a href="#" class="" title=""><i class="fas fa-trash color-delete" title="Delete" onclick="deleteResource(\'' + rowobject.ResourceName + '\')"></i></a>' +
                '</div>';
        }
    },
    {
        name: 'ResourceName',
        label: 'Resource Name',
        width: 500,
        resizable: true,
        ignoreCase: true
    }
];
function createJQGrid(data) {
    $.jgrid.gridUnload('#resource-grid-list');
    $("#resource-grid-list").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#resource-grid-pager',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#resource-grid-list tbody tr");
            var objHeader = $("#resource-grid-list tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#resource-grid-list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });


    $('.ui-jqgrid-bdiv').css({ 'max-height': '59vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}

function gettemplatedata(element) {
    $('#resource').val('');
    var template = $('#TMTemplateName').val();
    var role = element.getAttribute('data-role');
    var rolename = element.getAttribute('data-rolename');
    $('#selectedrole').val(role);
    $('#selectedrolename').val(rolename);
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetTemplateMasterHeaderData",
        data: {
            TemplateId: template,
            Role: rolename
        },
        success: function (response) {
            filtered_array = [];
            $('#loader').show();
            $('#loader').css('visibility', 'visible');
            var responseData = JSON.parse(response);
            templatearray = responseData.TemplateData;
            filtered_array = resourcearray.filter(function (obj) {
                return obj.TemplateId === template && obj.Role.trim().toLowerCase() === rolename.trim().toLowerCase() && (obj.ResourceName != '' && obj.ResourceName != null)
            });
            createJQGrid(filtered_array);
            var index = resourcearray.findIndex(function (obj) {
                return obj.TemplateId === template && obj.Role.trim().toLowerCase() === rolename.trim().toLowerCase()
            });
            $('#duration').val(resourcearray[index].Duration)
            initial_duration = templatearray[0].Duration

        }
    });

}
function getData(selectedTemplateId) {
    debugger;
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetTemplateMasterHeaderData",
        data: { TemplateId: selectedTemplateId },
        async: false,
        success: function (response) {
            response_array = JSON.parse(response);
            if (response_array.TemplateData && Array.isArray(response_array.TemplateData)) {
                $('#templatetab').empty();
                response_array.TemplateData.forEach(function (item, index) {
                    var newRow = template.clone().removeClass('template-row').show();
                    newRow.find('.role-name').text(item.Role || '');
                    newRow.find('.hod').text(item.HODName || '');
                    newRow.find('.duration').text(item.Duration || 0);
                    newRow.find('.unit').text(item.Unit || '');
                    newRow.find('a').attr('data-role', item.RoleId || '')
                        .attr('data-rolename', item.Role || '')
                        .attr('data-hod', item.HODName || '')
                        .attr('data-duration', item.Duration || 0)
                        .attr('data-unit', item.Unit || '');
                    if (index == 0) {
                        newRow.find('a').addClass('active');
                    }

                    $('#templatetab').append(newRow);
                });
                var firstElement = $('#templatetab').find('.nav-item a').first();
                if (firstElement.length) {
                    gettemplatedata(firstElement[0]);
                }
                if (response_array.TemplateData.length > 0) {
                    $('#showresourcesduration').show();
                    $('#resourcegrid').show();

                }
                else {
                    $('#showresourcesduration').hide();
                    $('#resourcegrid').hide();
                }
            } else {
                alert("No data returned.");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error: " + error);
            alert("Failed to retrieve data.");
        }
    });
}
$('#SearchTMData').on('click', function () {
    debugger;
    var isModified = false;
    var templateName = $("#TMTemplateName").val();
    if (templateName == "" || templateName == "Select TemplateName") {
        alert("Please Select a Template");
        $('#showresourcesduration').hide();
        createJQGrid('');
        return;
    }
    else {
        isModified = validateSave();
        if (isModified && datafortemplate != $("#TMTemplateName").val())
        {
            UnsavedDataAlert("You have some unsaved Data, Please save otherwise you will lose the data",
                function () {
                    $("#savebtn").click();
                },
                function () {
                    selectedTemplateId = templateName;
                    loadData();
                    getData(selectedTemplateId);
                },
            );

        }
        else {
            getData(templateName);
        }
    }
});
$('#resource').autocomplete({
    source: function (request, response) {
        $.ajax({
            url: ROOT + "NewProjectInitiation/GetResourceNames",
            type: 'GET',
            dataType: 'json',
            global: false,
            data: {},
            success: function (data) {
                autosuggestresources = data;
                resources = [];
                $.each(autosuggestresources, function (i, obj) {
                    if (obj.ResourceName && request.term && obj.ResourceName.trim().toLowerCase().includes(request.term.trim().toLowerCase())) {
                        var index = resources.findIndex(function (obj1) { return obj1.label === obj.Name });
                        if (index == -1) {
                            resources.push({
                                label: obj.ResourceName,
                                value: obj.ResourceName,
                                "Resource": obj.ResourceName,
                            });
                        }
                    }
                });
                response(resources);
            },
            error: function () {
                console.log("Error Occurred");
            }
        });
    },
    minLength: 1,
    change: function (event, ui) {
        if ($(event.target).val() !== '' && $(event.target).val() !== null && typeof ($(event.target).val()) !== "undefined") {
            var intaskArray = resources.filter(item => item.Resource.toLowerCase() == $(event.target).val().toLowerCase()).length;
            if (intaskArray == 0) {
                $(event.target).val("");
                alert("Please select the resource from the list");
            }
        }
    }

});
$('#resoureadd').on('click', function () {
    filtered_array = [];
    var isValid = true;
    var template = $("#TMTemplateName").val();
    var role = $('#selectedrole').val();
    var roleName = $('#selectedrolename').val()
    var resource = $('#resource').val();
    if (resource == '' || resource == null) {
        alert('Please select Resource');
        isValid = false;
        return false;
    }
    else {
        if (isValid) {
            var index = resourcearray.findIndex(function (obj) {
                return obj.TemplateId == template && obj.Role.trim().toLowerCase() === roleName.trim().toLowerCase() && obj.ResourceName == resource;
            });
            if (index > -1) {
                alert('Duplicate Resources found .Duplicates are not allowed');

            }
            else {
                var resourcedescription = {
                    "TemplateId": template,
                    "RoleId": role,
                    "Role": roleName,
                    "ResourceName": resource,
                    "Duration": $('#duration').val()
                }

                resourcearray.unshift(resourcedescription);
            }
            filtered_array = resourcearray.filter(function (res) {
                return res.TemplateId === template && res.Role.trim().toLowerCase() === roleName.trim().toLowerCase() && (res.ResourceName !== '' && res.ResourceName !== null);
            })
            createJQGrid(filtered_array);
            datafortemplate = template;
        }

    }
    $('#resource').val('');
});
$('#duration').on('change', function () {
    var template = $("#TMTemplateName").val().trim();
    var role = $('#selectedrole').val();
    var rolename = $('#selectedrolename').val()
    var filteredarray = resourcearray.filter(function (res) {
        return res.TemplateId === template && res.Role.trim().toLowerCase() === rolename.trim().toLowerCase();
    })
    $.each(filteredarray, function (i, ele) {
        var index = resourcearray.findIndex(function (obj) {
            return ele.Role.trim().toLowerCase() === obj.Role.trim().toLowerCase() && ele.TemplateId === obj.TemplateId && ele.ResourceName.trim().toLowerCase() === obj.ResourceName.trim().toLowerCase();
        });
        if (index > -1) {
            resourcearray[index].Duration = $('#duration').val()
        }
    });
});
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}
$('#savebtn').on('click', function () {
    if (validateSave()) {
        $('#confirmationPopUpforSave').modal('show');
        $('#confirmationmsgforsave').html('Are you sure you want to save the details');
        $('#confirmsave').off('click').on('click', function () {
            $.ajax({
                type: "POST",
                url: ROOT + "NewProjectInitiation/UpdateTemplateMasterResource",
                data: {
                    resourcesToSave: JSON.stringify(resourcearray),

                },
                success: function (response) {
                    showAlertMessage(response.message, response.success);
                    $('#confirmationPopUpforSave').modal('hide');
                    window.location.href = ROOT + 'NewProjectInitiation/TemplateResourceMaster';
                    var activeElement = $('#templatetab').find('.nav-item .nav-link.active');
                    activeElement.find('.duration').text($('#duration').val())
                },
                error: function (error) {
                    alert(error);
                }
            });
        });
    } else {
        alert("There are no changes to Save");
    }

});

function validateSave() {
    var isModified = false;
    if (initial_duration != $('#duration').val()) {
        isModified = true;
    }
    $.each(resourcearray, function (i, ele) {
        var index = initial_array.findIndex(function (obj) {
            return ele.Role.trim().toLowerCase() === obj.Role.trim().toLowerCase() && ele.TemplateId === obj.TemplateId && ele.ResourceName.trim().toLowerCase() === obj.ResourceName.trim().toLowerCase();
        })
        if (index == -1) {
            isModified = true;
        }
    })

    return isModified;
}

function deleteResource(resourcename) {
    filtered_array = [];
    var role = $('#selectedrole').val();
    var rolename = $('#selectedrolename').val()
    var template = $('#TMTemplateName').val();
    $('#confirmationPopUpforDelete').modal('show');
    $('#confirmationmsgfordelete').html('Are you sure you want to delete the resource');
    $('#confirmdelete').off('click').on('click', function () {
        $.ajax({
            type: "POST",
            url: ROOT + "NewProjectInitiation/TemplateResourceNameDelete",
            data: {
                ResourceName: resourcename,
                Role: rolename,
                TemplateId: template
            },
            success: function (response) {

                $('#loader').show();
                $('#loader').css('visibility', 'visible');
                var index = resourcearray.findIndex(function (ele) {
                    return ele.Role.trim().toLowerCase() === rolename.trim().toLowerCase() && ele.TemplateId === template && ele.ResourceName == resourcename;
                });
                if (index > -1) {
                    resourcearray.splice(index, 1);
                    filtered_array = resourcearray.filter(function (res) {
                        return res.TemplateId === template && res.Role.trim().toLowerCase() === rolename.trim().toLowerCase() && (res.ResourceName !== '' && res.ResourceName !== null);
                    });
                }
                var initialindex = initial_array.findIndex(function (ele) {
                    return ele.Role === rolename && ele.TemplateId === template && ele.ResourceName.trim().toLowerCase() == resourcename.trim().toLowerCase();
                });
                if (initial_array > -1) {
                    initialindex.splice(index, 1);
                }
                showAlertMessage('Resource Deleted Successfully', 'alert-danger');
                createJQGrid(filtered_array);
                $('#confirmationPopUpforDelete').modal('hide');
            },
            error: function (error) {
                alert(error);
            }
        });
    });
}
$("#excel-download").on('click', function () {
    var isValid = true;
    var templateId = $('#TMTemplateName').val()
    var templateName = $('#TMTemplateName option:selected').text()
    if ($('#TMTemplateName').val() == '') {
        alert("No data available for export");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "NewProjectInitiation/GetExcelTemplateMasterData?templateId=" + templateId + "&&templateName=" + templateName;
    }
});
$('.preview').on('click', function () {
    var template = $('#TMTemplateName').val()
    if (template != '') {
        var tableHtml = `<tbody>`;
        var groupedData = {};
        var filtered_arrforpreview = [];
        var filtered_arrforpreview = resourcearray.filter(function (ele) {
            return ele.TemplateId == $('#TMTemplateName').val()
        });
        filtered_arrforpreview.forEach(({ Role, ResourceName, Duration, Unit }) => {
            if (!groupedData[Role]) {
                groupedData[Role] = {
                    ResourceNames: [],
                    Durations: [],
                    HODName: '',
                    Unit: ''
                };
            }
            groupedData[Role].ResourceNames.push(ResourceName);
            if (groupedData[Role].Durations.indexOf(Duration) === -1) {
                groupedData[Role].Durations.push(Duration);
            }
        });
        response_array.TemplateData.forEach(({ Role, HODName, Unit }) => {
            if (groupedData[Role]) {
                groupedData[Role].HODName = HODName;
                groupedData[Role].Unit = Unit;
            }
        });

        var result = Object.keys(groupedData).map(Role => ({
            Role,
            HODName: groupedData[Role].HODName || '',
            ResourceName: groupedData[Role].ResourceNames
                .filter(name => name.trim() !== '')
                .join(', '),
            Duration: groupedData[Role].Durations,
            Unit: groupedData[Role].Unit || ''
        })).sort((a, b) => a.Role.localeCompare(b.Role));

        $.each(result, function (i, obj) {
            tableHtml += `
            <tr>
                <th class="tablewidth1">${obj.Role}</th>
                <td class="previewhod">${obj.HODName}</td>
                <td class="previewresourcename">${obj.ResourceName}</td>
                <td class="previewduration">${obj.Duration && obj.Duration.length > 0 ? obj.Duration : 0}</td>
                <td class="previewunit">${obj.Unit}</td>
            </tr>
        `;
        });

        $('.templateresourcemaster-preview-table-body').html(tableHtml);
        $("#preview-modal").modal("show");
    }
    else {
        alert('Please Select Template');
    }
});

$('#refreshbtn').on('click', function () {
    $('#TMTemplateName').val('').trigger('change');
    $('#templatetab').find('li:visible').hide();
    $('#showresourcesduration').hide();
    $('#resourcegrid').hide();
    initial_duration = 0;
    $('#duration').val(initial_duration);
    response_array = [];
    initial_array = [];
    templatearray = [];
    filtered_array = [];
    resourcearray = [];
    loadData();
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
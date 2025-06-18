var result_arr = [];
var region_arr = [];
var ingredienttype_arr = [];
var maxheaderId = 0;
var complianceHeaderData = [];

$(document).ready(function () {
    $(".data-singleselect").select2();
    $(".required").hide();
    GetComplianceHeaderData();
    region_arr = JSON.parse($('#RegionList').val())
    region_arr.forEach(function (item) {
        item.Region = item.Text;
        item.RegionId = parseInt(item.Value);
    });
    ingredienttype_arr = JSON.parse($('#IngredientTypeList').val())
    ingredienttype_arr.forEach(function (item) {
        item.IngredientType = item.IngredientTypeName;
        item.IngredientTypeId = parseInt(item.IngredientTypeId);
    });
});
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert alert_green alert-dismissable ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}
var complianceheadercolmodels =
    [
        {
            name: 'Action',
            label: 'Action',
            width: 50,
            resizable: true,
            ignoreCase: true,
            search: false,
            sortable: false,
            exportcol: false,
            formatter: function (cellvalue, options, rowobject) {
                var deleteIcon = '';
                if (!rowobject.IsUtilized && (rowobject.IsUtilized == null || rowobject.IsUtilized == '')) {
                    deleteIcon = '<a href="#" class="btn-icon" onclick="OnDeleteComplianceHeader(this)" data-headerid="' + rowobject.ComplianceHeaderId + '" data-headername="' + rowobject.ComplianceHeaderName + '" data-regionid="' + rowobject.RegionId + '" data-ingredienttypeid="' + rowobject.IngredientTypeId + '" title="Delete">' +
                        '<i class="fas fa-trash color-delete"></i>' +
                        '</a>';
                }

                return '<div class="justify-center_ action_icons" style="text-align:center;">' +
                    '<a href="#" class="btn-icon edit-color" onclick="EditComplianceHeader(this)" data-headerid="' + rowobject.ComplianceHeaderId + '" data-headername="' + rowobject.ComplianceHeaderName + '" data-regionid="' + rowobject.RegionId + '" data-ingredienttypeid="' + rowobject.IngredientTypeId + '" title="Edit">' +
                    '<i class="fas fa-pen"></i>' +
                    '</a>' +
                    deleteIcon +
                    '</div>';
            }
        },
        {
            name: 'ComplianceHeaderId',
            label: 'Header Id',
            resizable: true,
            ignoreCase: true,
            search: true,
            width: 100,
            hidden: true

        },
        {
            name: 'Region',
            label: 'Region',
            resizable: true,
            ignoreCase: true,
            search: true,
            width: 100,

        },
        {
            name: 'IngredientType',
            label: 'Ingredient Type',
            resizable: true,
            ignoreCase: true,
            search: true,
            width: 100,

        },
        {
            name: 'ComplianceHeaderName',
            label: 'Header Name',
            resizable: true,
            ignoreCase: true,
            search: true,
            width: 200,

        },
    ];
function GetComplianceHeaderData() {
    $.ajax({
        type: "GET",
        url: ROOT + "NewRID/GetComplianceHeaderMasterData",
        success: function (result) {
            complianceHeaderData = result;
            result_arr = structuredClone(result);
            createJQGrid(result);
            bindmaxheaderId();
            clearData();
        }
    });
}
function createJQGrid(data) {
    data = data.filter(function (obj) {
        return obj.IsActive == 1
    });
    $.jgrid.gridUnload('#complianceHeader_list');
    jQuery("#complianceHeader_list").jqGrid({
        datatype: 'local',
        data: data,
        colModel: complianceheadercolmodels,
        loadonce: true,
        pager: "#complianceHeader_list_pager",
        viewrecords: true,
        ignoreCase: true,
        rowNum: data.length,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#complianceHeader_list tbody tr");
            var objHeader = $("#complianceHeader_list tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#complianceHeader_list").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('#complianceHeader_list').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 260px)' });
    $('#complianceHeader_list').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $('#complianceHeader_list').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#complianceHeader_list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#complianceHeader_list').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#complianceHeader_list').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#complianceHeader_list').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
    $('#complianceHeader_list').closest("#gview_complianceHeader_list").css({ 'z-index': '0' });
}
$('#RegionId').on('change', function () {
    var regionId = $('#RegionId').val();
    if (regionId == '' || regionId == null) {
        isValid = false;
        $("#RegionId_valid").show();
    } else {
        $("#RegionId_valid").hide();
    }
});
$('#IngredientTypeId').on('change', function () {
    var ingredientTypeId = $('#IngredientTypeId').val();
    if (ingredientTypeId == '' || ingredientTypeId == null) {
        isValid = false;
        $("#IngredientTypeId_valid").show();
    } else {
        $("#IngredientTypeId_valid").hide();
    }
});
$('#ComplianceHeaderName').on('keyup', function () {
    var complianceHeaderName = $('#ComplianceHeaderName').val().trim();
    if (complianceHeaderName == '' || complianceHeaderName == null) {
        isValid = false;
        $("#ComplianceHederName_valid").show();
    } else {
        $("#ComplianceHederName_valid").hide();
    }
});
$('#addcompliancedata').on('click', function () {
    debugger;
    var isValid = true;
    var regionId = $('#RegionId').val();
    var region = $('#RegionId option:selected').text();
    var ingredientTypeId = $('#IngredientTypeId').val();
    var ingredientType = $('#IngredientTypeId option:selected').text();
    var complianceHeaderName = $('#ComplianceHeaderName').val().trim();
    var headerId = $('#ComplianceHeaderId').val();
    if (regionId == '' || regionId == null) {
        isValid = false;
        $("#RegionId_valid").show();
    } else {
        $("#RegionId_valid").hide();
    }
    if (ingredientTypeId == '' || ingredientTypeId == null) {
        isValid = false;
        $("#IngredientTypeId_valid").show();
    } else {
        $("#IngredientTypeId_valid").hide();
    }
    if (complianceHeaderName == '' || complianceHeaderName == null) {
        isValid = false;
        $("#ComplianceHederName_valid").show();
    } else {
        $("#ComplianceHederName_valid").hide();
    }
    if (isValid) {
        debugger;
        var duplicatedataindex = result_arr.findIndex(function (item) {
            return parseInt(item.RegionId) === parseInt(regionId) && parseInt(item.IngredientTypeId) === parseInt(ingredientTypeId) && item.ComplianceHeaderName.trim().toLowerCase() == complianceHeaderName.trim().toLowerCase() && parseInt(item.ComplianceHeaderId) != parseInt(headerId) && item.IsActive == 1
        });
        if (duplicatedataindex > -1) {
            alert('Data already exists with same Region, Ingredient Type and Header Name');
            isValid = false;
            return false;
        }
        if (isValid) {
            debugger;
            var index = result_arr.findIndex(function (obj) {
                return parseInt(obj.ComplianceHeaderId) === parseInt(headerId);

            })
            if (index > -1) {
                result_arr[index].RegionId = parseInt(regionId);
                result_arr[index].Region = region;
                result_arr[index].IngredientTypeId = parseInt(ingredientTypeId);
                result_arr[index].IngredientType = ingredientType;
                result_arr[index].ComplianceHeaderName = complianceHeaderName;
            }
            else {
                var headerData = {
                    "ComplianceHeaderId": parseInt(headerId),
                    "RegionId": parseInt(regionId),
                    "Region": region,
                    "IngredientTypeId": parseInt(ingredientTypeId),
                    "IngredientType": ingredientType,
                    "ComplianceHeaderName": complianceHeaderName,
                    "IsActive": 1
                };
                result_arr.unshift(headerData);
            }
            createJQGrid(result_arr);
            bindmaxheaderId();
            clearData();
        }

    }

});

function EditComplianceHeader(data) {
    debugger;
    var headerId = data.getAttribute('data-headerid');
    var regionId = data.getAttribute('data-regionid');
    var ingredienttypeId = data.getAttribute('data-ingredienttypeid');
    var headerName = data.getAttribute('data-headername');

    $('#ComplianceHeaderId').val(parseInt(headerId));
    $('#RegionId').val(parseInt(regionId));
    $('#IngredientTypeId').val(parseInt(ingredienttypeId));
    $('#ComplianceHeaderName').val(headerName);
    $('#RegionId').trigger("change");
    $('#IngredientTypeId').trigger("change");
    $(".required").hide();
}
function validateResultArr(result_arr) {
    debugger;
    var isValid = false;
    region_arr.forEach(function (region) {
        var regionHasAllHeaders = true;
        ingredienttype_arr.forEach(function (ingredientType) {
            var found = result_arr.some(function (item) {
                return item.Region == region.Region &&
                    item.IngredientType == ingredientType.IngredientType &&
                    item.ComplianceHeaderName && item.ComplianceHeaderName.trim() !== "" &&
                    item.IsActive == 1
            });
            if (!found) {
                regionHasAllHeaders = false;
            }
        });
        if (regionHasAllHeaders) {
            isValid = true;
        }
    });
    return isValid;
}
//function validateEditedData(result_arr) {
//    var isSameData = true;
//    $.each(result_arr, function (i, obj) {
//        debugger;
//        var index = complianceHeaderData.findIndex(function (item) {
//            return parseInt(obj.RegionId) === parseInt(item.RegionId) && parseInt(obj.IngredientTypeId) === parseInt(item.IngredientTypeId) && obj.ComplianceHeaderName.trim().toLowerCase() == item.ComplianceHeaderName.trim().toLowerCase()
//        })
//        if (index === -1) {
//            isSameData = false;
//        }
//    })
//    return isSameData;
//}
function validateEditData(result_arr) {
    var isModified = false;
    if (result_arr.length != complianceHeaderData.length) {
        isModified = true;

    }
    else {
        $.each(complianceHeaderData, function (i, obj) {
            debugger;
            if (complianceHeaderData[i].IsActive == 1) {
                if (parseInt(result_arr[i].RegionId) != parseInt(complianceHeaderData[i].RegionId) ||
                    parseInt(result_arr[i].IngredientTypeId) != parseInt(complianceHeaderData[i].IngredientTypeId) ||
                    result_arr[i].ComplianceHeaderName.trim().toLowerCase() != complianceHeaderData[i].ComplianceHeaderName.trim().toLowerCase()) {
                    isModified = true;
                }
            }
        });
    }
    return isModified;
}
function validateCount(result_arr) {
    debugger;
    var isValidCount = true;
    var countMap = {};
    $.each(result_arr, function (i, obj) {
        if (obj.ComplianceHeaderName !== '' && obj.IsActive == 1) {
            var key = obj.Region + '_' + obj.IngredientType;
            if (!countMap[key]) {
                countMap[key] = 0;
            }
            countMap[key]++;
        }
    });
    $.each(countMap, function (key, count) {
        if (count > 30) {
            isValidCount = false;
        }
    });
    return isValidCount;
}
$('#saveButton').on('click', function () {
    var isValidSave = validateResultArr(result_arr);
    var isValidCount = validateCount(result_arr);
    var isDataEdited = validateEditData(result_arr);
    if (!isValidSave) {
        alert("At least one region should contain all ingredient types with header names.");
        return false;
    } else if (!isDataEdited) {
        alert("There are no changes to Save");
        return false;
    }
    else if (!isValidCount) {
        alert('Maximum of 30 headers can be entered for each region and ingredient type');
        return false;
    }
    else {
        var final_valid_arr = result_arr.filter(function (obj) {
            return obj.IsActive == 1
        })
        var headerData = {
            JsonHeaderData: JSON.stringify(final_valid_arr)
        }
        

        $('#confirmationPopUpforSave').modal('show');
        $('#confirmationmsgforsave').html('Are you sure you want to save the Header details');
        $('#confirmsave').off('click').on('click', function () {
            $.ajax({
                type: "POST",
                url: ROOT + "NewRID/SaveRegionComplianceHeader",
                dataType: 'JSON',
                //contentType: 'application/json; charset=utf-8',
                data: { headerData: headerData },
                success: function (result) {
                    if (result.toLowerCase().includes('success')) {
                        complianceHeaderData = JSON.parse(JSON.stringify(result_arr));
                        showAlertMessage(result, 'alert-success');
                        bindmaxheaderId();
                        //clearData();
                        $('#confirmationPopUpforSave').modal('hide');
                    } else {
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
function OnDeleteComplianceHeader(data) {
    debugger;
    var headerId = data.getAttribute('data-headerid');
    var regionId = data.getAttribute('data-regionid');
    var ingredienttypeId = data.getAttribute('data-ingredienttypeid');
    var headerName = data.getAttribute('data-headername');
    var headerData = {
        ComplianceHeaderId: parseInt(headerId), RegionId: parseInt(regionId), IngredientTypeId: parseInt(ingredienttypeId), ComplianceHeaderName: headerName
    }
    $('#DeleteModal').modal('show');
    $("#DeleteRecord").off("click").on("click", function () {
        $.ajax({
            type: "POST",
            url: ROOT + "NewRID/DeleteRegionComplianceHeader",
            dataType: 'JSON',
            data: { headerData: headerData },
            success: function (result) {
                if (result.toLowerCase().includes('success')) {
                    var index = result_arr.findIndex(function (obj) {
                        return parseInt(obj.RegionId) == parseInt(regionId) && parseInt(obj.IngredientTypeId) == parseInt(ingredienttypeId) && obj.ComplianceHeaderName.trim().toLowerCase() == headerName.trim().toLowerCase() && obj.IsActive == 1;
                    });
                    if (index > -1) {
                        result_arr.splice(index, 1);
                        createJQGrid(result_arr);
                        showAlertMessage("Header Data Deleted Successfully", 'alert-danger');
                    }
                    var mainarrindex = complianceHeaderData.findIndex(function (obj) {
                        return parseInt(obj.RegionId) == parseInt(regionId) && parseInt(obj.IngredientTypeId) == parseInt(ingredienttypeId) && obj.ComplianceHeaderName.trim().toLowerCase() == headerName.trim().toLowerCase() && obj.IsActive == 1;
                    });
                    if (mainarrindex > -1) {
                        complianceHeaderData.splice(index, 1);
                    }
                } else {
                    debugger;
                    var index = result_arr.findIndex(function (obj) {
                        return parseInt(obj.RegionId) == parseInt(regionId) && parseInt(obj.IngredientTypeId) == parseInt(ingredienttypeId) && obj.ComplianceHeaderName.trim().toLowerCase() == headerName.trim().toLowerCase() && obj.IsActive == 1;
                    });
                    if (index > -1) {
                        result_arr.splice(index, 1);
                        createJQGrid(result_arr);
                        showAlertMessage("Data Deleted Successfully", 'alert-danger');
                    }
                    var mainarrindex = complianceHeaderData.findIndex(function (obj) {
                        return parseInt(obj.RegionId) == parseInt(regionId) && parseInt(obj.IngredientTypeId) == parseInt(ingredienttypeId) && obj.ComplianceHeaderName.trim().toLowerCase() == headerName.trim().toLowerCase() && obj.IsActive == 1;
                    });
                    if (mainarrindex > -1) {
                        complianceHeaderData.splice(index, 1);
                    }
                }
                bindmaxheaderId();
                //clearData();
            }
        });

    });
}
function clearData() {
    $('#RegionId').val('').trigger('change');
    $('#IngredientTypeId').val('').trigger('change');
    $('#ComplianceHeaderName').val('');
    $("#ComplianceHeaderId").val(maxheaderId);
    $(".required").hide();
}
function bindmaxheaderId() {
    $.each(result_arr, function (i, obj) {
        if (maxheaderId < parseInt(obj.ComplianceHeaderId)) {
            maxheaderId = obj.ComplianceHeaderId;
        }
    });
    maxheaderId = maxheaderId + 1;
}
$("#exceldownload").on('click', function () {
    var data = $('#complianceHeader_list').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("There is no data present in the grid");
        return false;
    }
    else {
        $("#complianceHeader_list").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "RegionComplianceHeaderMasterData.xlsx",
            maxlength: 1000,
        });
    }
});
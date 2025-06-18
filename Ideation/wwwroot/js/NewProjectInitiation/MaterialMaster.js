var isExport = false;
var materialData = [];
var selectedIds_arr = [];


$(document).ready(function () {
    LoadDropdownData();
    $('#btnSearch').trigger('click');
});

function LoadDropdownData() {
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetMaterialDropDownList",
        data: {},
        async: false,
        success: function (response) {
            
            materialData = response;
            bindMaterialDropdown();
        },
        error: function (response) {
            alert(response);
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
function bindMaterialDropdown() {
    $("#MaterialId")
        // don't navigate away from the field on tab when selecting an item
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                selectedMaterialsId = 0;
                // delegate back to autocomplete, but extract the last term
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                var obj = [];
                var cnt = 0;
                var matching = $.grep(materialData, function (value) {
                    var name = value.MaterialName;
                    var id = value.MaterialId;
                    if (matcher.test(name) && cnt < 1000) {
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
                var selectedIds= ui.item.id;
                if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                    alert("Material already selected");
                    selectedMaterialsId = 2;
                    terms.push("");
                    this.value = terms.join(", ");
                }
                else {
                    selectedMaterialsId = 1;
                    terms.push(selectedTerm);
                    terms.push("");
                    this.value = terms.join(", ");
                    selectedIds_arr.push(selectedIds);
                }
                return false;
            },
            close: function (event, ui) {

                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (selectedMaterialsId === 0) {
                        var inputValue = $(event.target).val();
                        var parts = inputValue.split(',');
                        parts.pop();
                        var result = parts.join(',');
                        $(event.target).val(result);
                    }
                }
            }
        });
}

var colmodels = [
    {
        name: 'MaterialCode',
        label: 'Material Code',
        resizable: true,
        width: 75,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'MaterialName',
        label: 'Material Name',
        width: 150,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'DivisionName',
        label: 'Division',
        width: 35,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'MaterialTypeName',
        label: 'Material Type',
        width: 50,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'UOM',
        label: 'UOM',
        width: 35,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'PurchaseGroup',
        label: 'Purchase Group',
        width: 50,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    },
    {
        name: 'HSNCode',
        label: 'HSN Code',
        width: 60,
        resizable: true,
        ignoreCase: true,
        exportCol: true
    }
];

function createJQGrid(result) {
    $.jgrid.gridUnload('#MaterialMaster_grid');
    $("#MaterialMaster_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#MaterialMaster_pager',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#MaterialMaster_grid tbody tr");
            var objHeader = $("#MaterialMaster_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#MaterialMaster_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 210px)' });
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

$('#btnSearch').on('click', function () {
    
    var material = selectedIds_arr.join(',');
    var division = $('#DivisionId').val()
    var materialType = $('#MaterialTypeId').val()
    var purchaseGroup = $('#PurchaseGroupId').val()
    $('#loader').show();
    $('#loader').css('visibility', 'visible');
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/GetMaterialMasterList",
        data: {
            MaterialId: material,
            Division: division,
            MaterialType: materialType,
            PurchaseGroup: purchaseGroup
        },
        success: function (response) {
            $('#loader').show();
            $('#loader').css('visibility', 'visible');
            createJQGrid(response);
        },
        error: function (response) {
            alert(response);
        }
    });
});
$('#btnrefresh').on('click', function () {
    selectedIds_arr = [];
    $("#MaterialId").val('');
    $('#DivisionId').val('').trigger('change');
    $('#MaterialTypeId').val('').trigger('change');
    $('#PurchaseGroupId').val('').trigger('change');
    $('#btnSearch').trigger('click');
   
});
function exportToExcel(gridId, file) {
    $("#" + gridId).jqGrid("exportToExcel", {
        includeLabels: true,
        includeGroupHeader: true,
        includeFooter: true,
        fileName: file + ".xlsx",
        maxlength: 200
    });
}
$("#exceldownload").click(function () {
    isExport = true;
    var fileName = "Material Master";
    var data = $('#MaterialMaster_grid').jqGrid('getGridParam', 'data');
    if (data.length === 0) {
        alert("There is no data present in the grid");
        isExport = false;
    }
    if (isExport) {
        exportToExcel("MaterialMaster_grid", fileName);
        isExport = false;
    }
});
$('#SyncMaterial').on('click', function () {
    $.ajax({
        type: "GET",
        url: ROOT + "NewProjectInitiation/SyncMaterialList",
        data: {},
        datatype:'local',
        success: function (response) {
            $('#loader').show();
            $('#loader').css('visibility', 'visible');
            alert(response);
            LoadDropdownData();
            $('#btnSearch').trigger('click');
        },
        error: function (response) {
            alert(response);
        }
    });
});
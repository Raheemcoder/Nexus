var gridData = [];
var old_gridData = [];
var old_synonyms = $("#Synonyms").val().toLowerCase().trim();
var old_casnumber = $("#CASNumber").val().toLowerCase().trim();
var old_functionid = $("#FunctionId_arr").val().join(',').toString();
var EnclosureName = [];
var filesData = [];
var oldfiles_uploadedData = [];
var documentData = [];
var view_file_data = [];
var ingredientId = parseInt($("#IngredientId").val());
var ingredientreqId = parseInt($("#IngredientId").val());
var colModel = [];
var oldRegion;
var login_region = [];
var ingredientNames = [];
var isConfirmed = 0;
arrtSetting = function (rowId, val) {
    var result;
    if (oldRegion = undefined || oldRegion != val) {
        var regDataFilter = gridData.filter(function (obj) { return obj.Region === val });
        var count = regDataFilter.length;
        result = ' rowspan=' + '"' + count + '"';
    }
    else {
        result = ' style="display:none"';
    }
    oldRegion = val;
    return result;
};
var insertcolmodels =
    [
        { name: 'RowNo', align: 'center', hidden: true },

        {
            name: 'Region',
            width: 50,
            align: 'center',
            classes: 'trs',
            cellattr: arrtSetting,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    var index = login_region.findIndex(function (obj) { return obj === cellvalue });
                    index == -1 ? login_region.push(cellvalue) : '';
                }
                return cellvalue;

            }
        },
        {
            name: 'Category',
            classes: 'trs1',
            width: 60,
            formatter: function (cellvalue, options, rowobject) {
                return cellvalue;

            }
        },
        {

            name: 'RegulatoryStatus',
            search: false,
            width: 80,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    return '<div class="demo-content">' +
                        '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect>' +
                        '<option value="0">Select</option>' +
                        '</select>' +
                        '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>' +
                        '</div>';

                }
                else {
                    return '<div class="demo-content">' +
                        '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect disabled>' +
                        '<option value="0">Select</option>' +
                        '</select>' +
                        '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>' +
                        '</div>';
                }

            }

        },
        {
            name: 'CRemarks',
            width: 125,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    return '<div class="demo-content">' +
                        '<textarea class="form-control textvalid form-control-sm Cremarks_text noSpacesField" id="cremarks_selected_' + rowobject.RowNo + '" rows="2" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"></textarea>' +
                        '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                        '</div>';
                }
                else {
                    return '<div class="demo-content">' +
                        '<textarea class="form-control textvalid form-control-sm Cremarks_text noSpacesField" id="cremarks_selected_' + rowobject.RowNo + '" rows="2" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"readonly></textarea>' +
                        '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                        '</div>';
                }

            }
        },
        {
            name: 'ImpactDates',
            search: false,
            width: 55,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    return '<div class="demo-content" >' +
                        '<input type="text" readonly class= "form-control form-control-sm data-datepicker ImpactDates_text ImpactDates_text_freezed" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"/> ' +
                        '</div>';
                }
                else {
                    return '<div class="demo-content" >' +
                        '<input type="text" readonly disabled class= "form-control form-control-sm data-datepicker ImpactDates_text" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"/> ' +
                        '</div>';
                }
            }
        },
        {
            name: 'References',
            width: 60,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    return '<div class="demo-content" >' +
                        '<input type="text" class= "form-control form-control-sm  References_text noSpacesField" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"/> ' +
                        '</div>';
                }
                else {
                    return '<div class="demo-content" >' +
                        '<input type="text" class= "form-control form-control-sm  References_text noSpacesField" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" readonly/> ' +
                        '</div>';
                }
            }
        },
        {
            name: 'ReferenceDoc',
            width: 80,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    return '<div class="demo-content">' +
                        '<input type="file" id="RefDoc_' + rowobject.RowNo + '" class="form-control form-control-sm RefDocs_text" ' +
                        'data-regionId="' + rowobject.RegionId + '" data-categoryId="' + rowobject.CategoryId + '" data-lineno="' + rowobject.RowNo + '" ' +
                        'data-name="' + options.colModel.name + '" accept=".pdf, .docx, .xlsx,xls,.docx" multiple/>' +
                        '</div>';
                }
                else {
                    return '<div class="demo-content">' +
                        '<input type="file" id="RefDoc_' + rowobject.RowNo + '" class="form-control form-control-sm RefDocs_text" ' +
                        'data-regionId="' + rowobject.RegionId + '" data-categoryId="' + rowobject.CategoryId + '" data-lineno="' + rowobject.RowNo + '" ' +
                        'data-name="' + options.colModel.name + '" accept=".pdf, .docx, .xlsx,xls,.docx" multiple disabled/>' +
                        '</div>';
                }
            }
        },
    ];
var updatecolmodels = [

    { name: 'RowNo', align: 'center', hidden: true },

    {
        name: 'Region',
        align: 'center',
        classes: 'trs',
        width: 50,
        cellattr: arrtSetting,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                var index = login_region.findIndex(function (obj) { return obj === cellvalue });
                index == -1 ? login_region.push(cellvalue) : '';
            }
            return cellvalue;

        }
    },
    {
        name: 'Category',
        classes: 'trs1',
        width: 60,
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;

        }
    },
    {
        name: 'RegulatoryStatus',
        search: false,
        width: 80,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                return '<div class="demo-content">' +
                    '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect>' +
                    '<option value="0">Select</option>' +
                    '</select>' +
                    '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect disabled>' +
                    '<option value="0">Select</option>' +
                    '</select>' +
                    '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>' +
                    '</div>';

            }
        }

    },
    {
        name: 'CRemarks',
        width: 125,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {

                return '<div class="demo-content">' +
                    '<textarea class="form-control textvalid form-control-sm Cremarks_text noSpacesField" id="cremarks_selected_' + rowobject.RowNo + '" rows="2"  data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '">' + rowobject.CRemarks + '</textarea>' +
                    '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<textarea class="form-control textvalid form-control-sm Cremarks_text noSpacesField" id="cremarks_selected_' + rowobject.RowNo + '" rows="2"  data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" readonly>' + rowobject.CRemarks + '</textarea>' +
                    '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                    '</div>';
            }
        }
    },
    {
        name: 'ImpactDates',
        search: false,
        width: 55,

        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                return '<div class="demo-content" >' +
                    '<input type="text" readonly class= "form-control form-control-sm data-datepicker ImpactDates_text ImpactDates_text_freezed" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.ImpactDates + '"/> ' +
                    '</div>';
            }
            else {
                return '<div class="demo-content" >' +
                    '<input type="text" readonly disabled class= "form-control form-control-sm data-datepicker ImpactDates_text" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.ImpactDates + '"/> ' +
                    '</div>';
            }
        }
    },
    {
        name: 'References',
        width: 60,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                return '<div class="demo-content" >' +
                    '<input type="text" class= "form-control form-control-sm  References_text noSpacesField" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.References + '"/> ' +
                    '</div>';
            }
            else {
                return '<div class="demo-content" >' +
                    '<input type="text" class= "form-control form-control-sm  References_text noSpacesField" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.References + '" readonly/> ' +
                    '</div>';
            }
        }
    },
    {
        name: 'ReferenceDoc',
        width: 80,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                return '<div class="demo-content ">' +
                    '<div class="row">' +
                    '<div class="_hide col-md-1 pdt_9" id="old_' + rowobject.RegionId + "_" + rowobject.CategoryId + '"><a href="#" data-target="#IngredientModal1" data-categoryId="' + rowobject.CategoryId + '" data-regionId="' + rowobject.RegionId + '"data-region="' + rowobject.Region + '" onclick="ViewDocumentsDataModal(this)" title="View Documents"><i class="fa fa-info-circle"></i></a></div> ' +
                    '<div class="col-md-10"><input type="file" id="RefDoc_' + rowobject.RowNo + '" class="form - control form - control - sm RefDocs_text" ' +
                    'data-regionId="' + rowobject.RegionId + '" data-categoryId="' + rowobject.CategoryId + '" data-lineno="' + rowobject.RowNo + '" ' +
                    'data-name="' + options.colModel.name + '" accept=".pdf, .docx, .xlsx,xls,.docx" multiple/>' +
                    '</div>' +
                    '</div >' +
                    '</div >';
            }
            else {
                return '<div class="demo-content ">' +
                    '<div class="row">' +
                    '<div class="_hide col-md-1 pdt_9" id="old_' + rowobject.RegionId + "_" + rowobject.CategoryId + '"><a href="#" data-target="#IngredientModal1" data-categoryId="' + rowobject.CategoryId + '" data-regionId="' + rowobject.RegionId + '"data-region="' + rowobject.Region + '" onclick="ViewDocumentsDataModal(this)" title="View Documents"><i class="fa fa-info-circle"></i></a></div> ' +
                    '<div class="col-md-10"><input type="file" id="RefDoc_' + rowobject.RowNo + '" class="form - control form - control - sm RefDocs_text" ' +
                    'data-regionId="' + rowobject.RegionId + '" data-categoryId="' + rowobject.CategoryId + '" data-lineno="' + rowobject.RowNo + '" ' +
                    'data-name="' + options.colModel.name + '" accept=".pdf, .docx, .xlsx,xls,.docx" multiple disabled/>' +
                    '</div>' +
                    '</div >' +
                    '</div >';

            }
        }
    },
];
var IngridentDocViewColModels = [
    {
        name: 'EnclosureName',
        label: 'Document Name'
    },
    {
        name: 'CategoryId',
        label: 'CategoryId',
        align: 'center',
        hidden: true,
    },
    {
        name: 'RegionId',
        label: 'RegionId',
        align: 'center',
        hidden: true,
    },
    {
        name: 'Region',
        label: 'Region',
        align: 'center',
        hidden: true,
    },
    {
        name: 'Action',
        label: 'Action',
        align: 'center',
        formatter: function (cellvalue, options, rowobject) {
            var index = login_region.findIndex(function (obj) { return obj == rowobject.Region });
            if (index > -1) {
                return '<div class="d-flex action_icons align-items-center">' +
                    '<a href="#" title="Download" class="" onclick="downloadoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" ><i class="fas fa-download color-download"></i></a>' +
                    '<a href="#" title="Delete" onclick="deletedoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" class=""><i class="fa fa-trash color-delete"></i></a>' +
                    '</div >';
            }
            else {
                return '<div class="d-flex action_icons align-items-center ">' +
                    '<a href="#" title="Download" class="btn-icon" onclick="downloadoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" ><i class="fas fa-download color-download"></i></a>' +
                    '</div >';
            }


        }
    }

];

$(document).ready(function () {

    isConfirmed = parseInt($("#IsConfirmed").val());

    $('body').on('change', '.textvalid', function () {
        var id = $(this)[0].id;
        var value = this.value.trim();
        if (value === "") {
            $("#" + id + "_valid").removeClass("_hide");
        } else {
            $("#" + id + "_valid").addClass("_hide");
        }
    });
    $('body').on('change', '.regulatorystatus_c', function () {
        var id = $(this)[0].id;
        var value = this.value;
        if (parseInt(value) === 0) {
            $("#" + id + "_valid").removeClass("_hide");
        } else {
            $("#" + id + "_valid").addClass("_hide");
        }
    });
    $('body').on('keyup', '.textvalid', function () {
        var id = $(this)[0].id;
        var value = this.value.trim();
        if (value === "") {
            $("#" + id + "_valid").removeClass("_hide");
            $("#IngredientName_exists").addClass("_hide");
        } else {
            $("#" + id + "_valid").addClass("_hide");
        }
    });

    if (ingredientId > 0) {
        gridData = JSON.parse($("#IngredientListData").val());
        old_gridData = JSON.parse($("#IngredientListData").val());
        colModel = updatecolmodels;
        oldfiles_uploadedData = JSON.parse($("#IngredientFileData").val());
        $("#title").text("Edit Ingredient");
    }

    else {
        var data = JSON.parse($("#DivisionBasedIngredientListJson").val())
        gridData = data;
        colModel = insertcolmodels;
        ingredientNames = JSON.parse($("#IngredientNameList").val());
        $("#title").text("Add Ingredient");
    }

    $("#list").jqGrid({
        datatype: 'local',
        data: gridData,
        colNames: ['RowNo', 'Region', 'Category', 'Regulatory Status', 'Compliance Remarks', 'Impact Date', 'References', 'Ref Documents'],
        colModel: colModel,
        cmTemplate: { sortable: false },
        loadonce: true,
        viewrecords: true,
        pager: '#list_pager',
        rowNum: 200,
        hoverrows: false,
        scroll: 1,
        beforeSelectRow: function () {
            return false;
        },
        gridComplete: function () {
            bindregulatorystatusDropDown();
            $('.regulatorystatus_c').select2();

            if (ingredientId > 0) {
                $.each(gridData, function (i, obj) {
                    if (gridData.length >= 1) {
                        var a = i + 1;
                        if (parseInt(obj.RegulatoryStatus) != 0) {
                            $('#regulatory_status_selected_' + a).val(obj.RegulatoryStatus).trigger('change');
                        }
                    }
                })
            }

        }
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '58vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
    $('#list').closest("#gview_list").css({ 'z-index': '0' });


    $('[data-singleselect]').select2()
    $('.data-singleselect').select2()
    $('.data-singleselect').select2({
        dropdownParent: $('#add_project')
    });
    $('.data-datepicker').datepicker({
        todayHighlight: true,
        format: 'dd/mm/yyyy',
        autoclose: true,
    });
    ingredientId > 0 ? $(".readonly").attr("disabled", true) : $(".readonly").attr("disabled", false)
    $(gridData).each(function (i, obj) {
        gridData[i].ImpactDates = (obj.ImpactDates === "" || obj.ImpactDates === null || typeof (obj.ImpactDates) === "undefined") ? "" : convertToDate(obj.ImpactDates);
    })
    $(old_gridData).each(function (i, obj) {
        old_gridData[i].ImpactDates = (obj.ImpactDates === "" || obj.ImpactDates === null || typeof (obj.ImpactDates) === "undefined") ? "" : convertToDate(obj.ImpactDates);
    })
    bindFilesGrid();

});

function validateSave() {
    var isModified = false;
    var synonyms = $("#Synonyms").val().toLowerCase().trim();
    var casnumber = $("#CASNumber").val().toLowerCase().trim();
    var functionid = $("#FunctionId_arr").val().join(',').toString();
    var file_uploaded = JSON.parse($("#IngredientFileData").val());
    if (old_synonyms != synonyms || old_casnumber != casnumber || old_functionid != functionid) {
        isModified = true;
    }
    $.each(gridData, function (i, obj) {
        var oldgrid_impactdate = convertDateToString(old_gridData[i].ImpactDates);
        var grid_impactdate = convertDateToString(gridData[i].ImpactDates);
        if (parseInt(old_gridData[i].RegionId) != parseInt(gridData[i].RegionId) ||
            parseInt(old_gridData[i].CategoryId) != parseInt(gridData[i].CategoryId) ||
            parseInt(old_gridData[i].RegulatoryStatus) != parseInt(gridData[i].RegulatoryStatus) ||
            old_gridData[i].CRemarks.toLowerCase().trim() != gridData[i].CRemarks.toLowerCase().trim() ||
            oldgrid_impactdate != grid_impactdate ||
            old_gridData[i].References.toLowerCase().trim() != gridData[i].References.toLowerCase().trim()) {
            isModified = true;
        }
    })
    if (documentData.length > 0) {
        isModified = true;
    }
    $.each(file_uploaded, function (i, obj) {
        var index = oldfiles_uploadedData.findIndex(function (data, j) {
            return obj.RegionId === data.RegionId && obj.CategoryId === data.CategoryId && obj.EnclosureName === data.EnclosureName;
        });
        if (index == -1) {
            isModified = true;
        }
    });
    return isModified;
}

function SaveUploadedFiles(ingredientId, type) {
    var ingredientId = parseInt(ingredientId);
    var fd = new FormData();
    fd.append("IngredientId", ingredientId);
    fd.append("JsonFileNames", JSON.stringify(EnclosureName));
    fd.append("Division_Id", $("#Division_Id").val());
    type != "Save" ? fd.append("Source", $("#Source").val()) : '';

    $.each(oldfiles_uploadedData, function (i, obj) {
        documentData.push({ "RegionId": obj.RegionId, "CategoryId": obj.CategoryId, "EnclosureName": obj.EnclosureName });
    });
    fd.append("DocumentData", JSON.stringify(documentData));

    const regionIds = gridData.map(item => item.RegionId);
    const regionId_array = [...new Set(regionIds)];

    $.each(regionId_array, function (i, val) {
        var totalregionfiles = 0
        for (var count = 1; count <= gridData.length; count++) {
            var fileUpload = $("#RefDoc_" + count).get(0);
            var regionId = gridData[count - 1].RegionId;
            if (parseInt(val) === parseInt(regionId)) {
                var files = fileUpload.files;
                if (files.length != "0" || files.length != 0) {
                    totalregionfiles++;
                    for (var f = 0; f < files.length; f++) {
                        fd.append("PostedFile", files[f]);
                    }
                }
            }
        }
        if (totalregionfiles > 0) {
            $.ajax({
                url: ROOT + 'NewRID/UploadFile',
                dataType: 'JSON',
                type: 'POST',
                async: false,
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {

                },
                error: function () {
                    alert(" An Error occured!!");
                }
            });
        }
    });

};

$("#save_draftbtn").on("click", function () {

    var isValid = true;
    var ingredientId = parseInt($("#IngredientId").val());
    var ingredientname = $("#IngredientName").val();
    var synonyms = $("#Synonyms").val();
    var casnumber = $("#CASNumber").val();
    var functionid = $("#FunctionId_arr").val().join(',').toString();
    var divisionid = $("#Division_Id").val();

    var fd = new FormData();
    fd.append("IngredientId", ingredientId);
    fd.append("IngredientName", ingredientname);
    fd.append("Synonyms", synonyms);
    fd.append("CASNumber", casnumber);
    fd.append("FunctionId", functionid);
    fd.append("GridData", JSON.stringify(gridData));
    fd.append("JsonFileNames", JSON.stringify(EnclosureName));
    fd.append("Division_Id", $("#Division_Id").val());
    fd.append("IsConfirmed", 0);
    ingredientId > 0 ? fd.append("Source", $("#Source").val()) : '';

    if (!ingredientId > 0) {
        var index = ingredientNames.findIndex(function (obj, i) {
            return obj.IngredientName.trim().toLowerCase() === ingredientname.trim().toLowerCase()
        });
        if (index > -1) {
            alert("Ingredient Name Already Exists");
            isValid = false;
        }
    }

    if (ingredientname == null || ingredientname === "" || typeof (ingredientname) == "undefined") {
        $('#IngredientName_valid').removeClass("_hide");
        $("#IngredientName_exists").addClass("_hide");
        isValid = false;
    }
    else {
        $('#IngredientName_valid').addClass("_hide");
    }

    if (isValid && ingredientId > 0) {
        if (validateSave()) {

            handelConfirmPopup("Are you sure, you want to save the ingredients details as draft",
                function () {

                    $.each(oldfiles_uploadedData, function (i, obj) {
                        documentData.push({ "RegionId": obj.RegionId, "CategoryId": obj.CategoryId, "EnclosureName": obj.EnclosureName });
                    });
                    fd.append("DocumentData", JSON.stringify(documentData));

                    $.ajax({
                        url: ROOT + 'NewRID/UpdateDetails',
                        dataType: 'JSON',
                        type: 'POST',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            var ingredient = result.split("_")[1];
                            if (result.includes("Successfully")) {
                                SaveUploadedFiles(ingredient, "Update");
                                window.location.href = ROOT + "NewRID/IngredientsRegulation";
                            } else {
                                alert(result);
                            }
                        },
                        error: function () {
                            alert(" An Error occured!!");
                        }
                    });

                }
            )

        }
        else {
            alert('There are no changes to save');
        }

    }
    else if (isValid) {

        handelConfirmPopup("Are you sure, you want to save the ingredients details as draft",
            function () {

                $.each(oldfiles_uploadedData, function (i, obj) {
                    documentData.push({ "RegionId": obj.RegionId, "CategoryId": obj.CategoryId, "EnclosureName": obj.EnclosureName });
                });
                fd.append("DocumentData", JSON.stringify(documentData));

                $.ajax({
                    url: ROOT + 'NewRID/SaveDetails',
                    dataType: 'JSON',
                    type: 'POST',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        var ingredient = result.split("_")[1];
                        if (result.includes("Successfully")) {
                            SaveUploadedFiles(ingredient, "Save");
                            window.location.href = ROOT + "NewRID/IngredientsRegulation";
                        } else {
                            alert(result);
                        }
                    },
                    error: function () {
                        alert(" An Error occured!!");
                    }
                });

            }
        )
    }
});

$("#savebtn").on("click", function () {

    var isValid = true;
    var ingredientId = parseInt($("#IngredientId").val());
    var ingredientname = $("#IngredientName").val();
    var synonyms = $("#Synonyms").val();
    var casnumber = $("#CASNumber").val();
    var functionid = $("#FunctionId_arr").val().join(',').toString();
    var divisionid = $("#Division_Id").val();

    var fd = new FormData();
    fd.append("IngredientId", ingredientId);
    fd.append("IngredientName", ingredientname);
    fd.append("Synonyms", synonyms);
    fd.append("CASNumber", casnumber);
    fd.append("FunctionId", functionid);
    fd.append("GridData", JSON.stringify(gridData));
    fd.append("JsonFileNames", JSON.stringify(EnclosureName));
    fd.append("Division_Id", $("#Division_Id").val());
    fd.append("IsConfirmed", 1);
    ingredientId > 0 ? fd.append("Source", $("#Source").val()) : '';

    var region_array = [];
    var region_name = login_region.length == 1 ? login_region[0] : 'atleast one';
    var alert_msg = "Please enter the Regulatory Status and Compliance Remarks for " + region_name + " Region ";
    var totalvalidlength = 0;
    var totalvalidlength_regulatory = 0;
    var totalvalidlength_remarks = 0;
    var isValid_regulatory = true;
    var isValid_remarks = true;
    var isValid_regiondata = false;

    if (!ingredientId > 0) {
        var index = ingredientNames.findIndex(function (obj, i) {
            return obj.IngredientName.trim().toLowerCase() === ingredientname.trim().toLowerCase()
        });

        if (index > -1) {
            alert("Ingredient Name Already Exists");
            isValid = false;
        }
    }

    if (ingredientname == null || ingredientname === "" || typeof (ingredientname) == "undefined") {
        $('#IngredientName_valid').removeClass("_hide");
        $("#IngredientName_exists").addClass("_hide");
        isValid = false;
    }
    else {
        $('#IngredientName_valid').addClass("_hide");
    }

    if (functionid == null || functionid === "" || typeof (functionid) == "undefined" || functionid.length === 0) {
        $('#FunctionId_arr_valid').removeClass("_hide");
        isValid = false;
    }
    else {
        $('#FunctionId_arr_valid').addClass("_hide");
    }

    $.each(login_region, function (index, data) {
        var regionIds = gridData.filter(function (obj) {
            return obj.Region.toLowerCase() == data.toLowerCase();
        })
        region_array.indexOf(parseInt(regionIds[0].RegionId)) > -1 ? "" : region_array.push(parseInt(regionIds[0].RegionId));
    });

    $.each(region_array, function (i, obj1) {
        var regulatoryvalidlength = gridData.filter(function (obj) { return parseInt(obj.RegulatoryStatus) != 0 && parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var remarksvalidlength = gridData.filter(function (obj) { return !(obj.CRemarks === "" || obj.CRemarks === null) && parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var totallength = gridData.filter(function (obj) { return parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var invalidregionData = gridData.filter(function (obj) { return (!(parseInt(obj.RegulatoryStatus) === 0 && (obj.CRemarks === "" || obj.CRemarks === null)) && parseInt(obj1) === parseInt(obj.RegionId)) });
        var totalregiondata = gridData.filter(function (obj) { return (parseInt(obj1) === parseInt(obj.RegionId)) });

        regulatoryvalidlength === totallength && remarksvalidlength === totallength ? totalvalidlength++ : totalvalidlength;

        if (isValid_regulatory && isValid_remarks) {
            regulatoryvalidlength === totallength ? totalvalidlength_regulatory++ : totalvalidlength_regulatory;
            remarksvalidlength === totallength ? totalvalidlength_remarks++ : totalvalidlength_remarks;

            if (!(regulatoryvalidlength == 0 && remarksvalidlength == 0)) {
                if ((regulatoryvalidlength == totallength) || (remarksvalidlength == totallength)) {
                    isValid_regiondata = true

                    if (regulatoryvalidlength != totallength) {
                        isValid_regulatory = false;
                        alert_msg = "Please enter the Regulatory Status for " + region_name + " Region "
                    }
                    if (remarksvalidlength != totallength) {
                        isValid_remarks = false;
                        alert_msg = "Please enter the Compliance Remarks for " + region_name + " Region "
                    }
                }
            }
        }
    });

    $.each(region_array, function (i, obj1) {
        var regulatoryvalidlength = gridData.filter(function (obj) { return parseInt(obj.RegulatoryStatus) != 0 && parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var remarksvalidlength = gridData.filter(function (obj) { return !(obj.CRemarks === "" || obj.CRemarks === null) && parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var totallength = gridData.filter(function (obj) { return parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var invalidregionData = gridData.filter(function (obj) { return (!(parseInt(obj.RegulatoryStatus) === 0 && (obj.CRemarks === "" || obj.CRemarks === null)) && parseInt(obj1) === parseInt(obj.RegionId)) });
        var totalregiondata = gridData.filter(function (obj) { return (parseInt(obj1) === parseInt(obj.RegionId)) });

        if (((regulatoryvalidlength > 0 || remarksvalidlength > 0) && ((regulatoryvalidlength < totallength) || (remarksvalidlength < totallength)))) {
            var regiondata = (totalvalidlength === 0 && isValid_regiondata == false) ? totalregiondata : invalidregionData;
            $.each(regiondata, function (row, data) {
                if (parseInt(data.RegulatoryStatus) === 0) {
                    $('#regulatory_status_selected_' + data.RowNo + '_valid').removeClass("_hide");
                    isValid = false;
                } else {
                    $('#regulatory_status_selected_' + data.RowNo + '_valid').addClass("_hide");
                }

                if (data.CRemarks === "" || data.CRemarks === null) {
                    $('#cremarks_selected_' + data.RowNo + '_valid').removeClass("_hide");
                    isValid = false;
                } else {
                    $('#cremarks_selected_' + data.RowNo + '_valid').addClass("_hide");
                }
            })
        }
    });

    if (totalvalidlength === 0) {
        alert(alert_msg);
        isValid = false;
    }

    if (isValid && ingredientId > 0) {
        if (isConfirmed == 0 || validateSave()) {
            $("#Remarks_modal").modal("show");
            $('#SendtoApproveRevert').off('click').on('click', function () {
                $.each(oldfiles_uploadedData, function (i, obj) {
                    documentData.push({ "RegionId": obj.RegionId, "CategoryId": obj.CategoryId, "EnclosureName": obj.EnclosureName });
                });
                var remarksData = {
                    IngredientId: ingredientId,
                    Approvallevel: '',
                    Action: 'Sent for Level 1 Approval',
                    Remarks: $("#Remarks_text").val().trim()
                }
                fd.append("DocumentData", JSON.stringify(documentData));
                fd.append("RemarksData", JSON.stringify(remarksData));

                $.ajax({
                    url: ROOT + 'NewRID/UpdateDetails',
                    dataType: 'JSON',
                    type: 'POST',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        var ingredient = result.split("_")[1];
                        if (result.includes("Successfully")) {
                            SaveUploadedFiles(ingredient, "Update");
                            window.location.href = ROOT + "NewRID/IngredientsRegulation";
                        } else {
                            alert(result);
                        }
                    },
                    error: function () {
                        alert(" An Error occured!!");
                    }
                });
                $('#confirmpopup').modal('hide');
            });
        }
        else {
            alert('There are no changes to save');
        }
    }
    else if (isValid) {
        if (isConfirmed == 0 || validateSave()) {
            $("#Remarks_modal").modal("show");
            $('#SendtoApproveRevert').off('click').on('click', function () {
                $.each(oldfiles_uploadedData, function (i, obj) {
                    documentData.push({ "RegionId": obj.RegionId, "CategoryId": obj.CategoryId, "EnclosureName": obj.EnclosureName });
                });
                var remarksData = {
                    IngredientId: ingredientId,
                    Approvallevel: '',
                    Action: 'Sent for Level 1 Approval',
                    Remarks: $("#Remarks_text").val().trim()
                }

                fd.append("DocumentData", JSON.stringify(documentData));
                fd.append("RemarksData", JSON.stringify(remarksData));

                $.ajax({
                    url: ROOT + 'NewRID/SaveDetails',
                    dataType: 'JSON',
                    type: 'POST',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        var ingredient = result.split("_")[1];
                        if (result.includes("Successfully")) {
                            SaveUploadedFiles(ingredient, "Save");
                            window.location.href = ROOT + "NewRID/IngredientsRegulation";
                        } else {
                            alert(result);
                        }
                    },
                    error: function () {
                        alert(" An Error occured!!");
                    }
                });
                $('#confirmpopup').modal('hide');
            });
        }
        else {
            alert('There are no changes to save');
        }
    }

});
function bindregulatorystatusDropDown() {
    $.ajax({
        url: ROOT + "NewRID/GetRegulatoryStatus",
        dataType: "JSON",
        async: false,
        type: 'GET',
        success: function (data) {
            $.each(data, function (index, item) {
                $('.regulatorystatus_c').append('<option value=' + item.Value + '>' + item.Text + '</option>');
            })

        }
    })
    $('.regulatorystatus_c').select2();
}

$("#IngredientName").on('change', function () {
    var ingredientname = $(this).val().trim();
    var index = ingredientNames.findIndex(function (obj, i) {
        return obj.IngredientName.trim().toLowerCase() === ingredientname.trim().toLowerCase()
    });

    if (index > -1) {
        $("#IngredientName_exists").removeClass("_hide");
        $("#IngredientName_valid").addClass('_hide');
    }
    else {
        $("#IngredientName_exists").addClass("_hide");
    }
});

$(document).on('change', '.regulatorystatus_c', function (e) {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'))
    var name = $(e).data('name');
    var index = gridData.findIndex(m => m.RowNo === rowno);
    var rowData = $("#list").getRowData(rowno);
    if (index >= 0) {
        gridData[index][name] = $(this).val();
        var region = gridData[index].Region;
    }
});

$(document).on('change', '.RefDocs_text', function (e) {
    var valid = true;
    var row = $(this).data('lineno');
    var region = $(this).data('regionid');
    var category = $(this).data('categoryid');
    var count = e.target.files.length;
    var name = $(this).data('name');
    var rowno = parseInt($(this).data('lineno'));
    var index = gridData.findIndex(m => m.RowNo === rowno);
    var totalSize = 0;
    var count = e.target.files.length;
    for (var i = 0; i < count; i++) {
        totalSize += e.target.files[i].size;
    }

    // Check if total size exceeds 10 MB
    var maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    if (totalSize > maxSizeInBytes) {
        alert('The file size should be less than 10 MB');        // Optionally clear the file input
        $(this).val('');
        valid = false
        return false; // Stop further processing
    }

    if (valid) {
        if (index >= 0) {
            gridData[index][name] = filenames;
        }
        var filecount = documentData.filter(function (obj) { return obj.RegionId === region && obj.CategoryId === category }).length;
        while (filecount > 0) {
            var doc_index = documentData.findIndex(m => m.RegionId === region && m.CategoryId === category);
            documentData.splice(doc_index, 1);
            filecount--;
        }

        for (var i = 0; i < count; i++) {
            var files = e.target.files[i];
            var filenames = e.target.files[i].name;
            documentData.push({ RegionId: region, CategoryId: category, "EnclosureName": filenames.replaceAll(" ", "") });
            EnclosureName.push(filenames.replaceAll(" ", ""));
        }
    }
});

$(document).on('keyup', '.Cremarks_text', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var name = $(e).data('name');
    var index = gridData.findIndex(m => m.RowNo === rowno);
    if (index >= 0) {
        gridData[index][name] = $(this).val();
    }

});

$(document).on('change', '.ImpactDates_text', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var name = $(e).data('name');
    var index = gridData.findIndex(m => m.RowNo == rowno);
    if (index >= 0) {
        gridData[index][name] = convertToDate($(this).val());
    }

});
function convertToDate(dateString) {
    const [dd, mm, yyyy] = dateString.split("/");
    return new Date(`${yyyy}-${mm}-${dd}`);
}
function convertDateToString(dateString) {
    if (!(dateString === "" || dateString === null)) {
        const dateObj = new Date(dateString);

        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    } else {
        return "";
    }
}

$(document).on('keyup', '.References_text', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var name = $(e).data('name');
    var index = gridData.findIndex(m => m.RowNo == rowno);
    if (index >= 0) {
        gridData[index][name] = $(this).val();
    }

});

$(document).on('keyup', '.INCI_text', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var name = $(e).data('name');
    var index = gridData.findIndex(m => m.RowNo == rowno);
    if (index >= 0) {
        gridData[index][name] = $(this).val();
    }

});

$('#cancelbtn').click(function () {
    window.location.href = ROOT + "NewRID/IngredientsRegulation";
});

$('.data-multiselect').multiselect({
    enableFiltering: true,
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 5,
    buttonWidth: '75%',
    dropUp: true
});

function bindFilesGrid() {
    $.each(oldfiles_uploadedData, function (i, obj) {
        $("#old_" + obj.RegionId + "_" + obj.CategoryId).removeClass("_hide");
    })
}

function deletedoc(docdata) {
    
    var regionId = docdata.getAttribute("data-region");
    var categoryId = docdata.getAttribute("data-category");
    var enclosurename = docdata.getAttribute("data-enclosure");
    $('#closebtn').trigger("click");
    $("#confirmpopup1").modal("show");
    $('#ConfirmDeletebutton').on('click', function () {
        var doc_index = oldfiles_uploadedData.findIndex(m => m.RegionId === parseInt(regionId) && m.CategoryId === parseInt(categoryId) && m.EnclosureName === enclosurename);
        oldfiles_uploadedData.splice(doc_index, 1);
        alert("Document Deleted Successfully");
    });
    $('#confirmpopup1').modal('hide');


}

function downloadoc(docdata) {
    var regionId = docdata.getAttribute("data-region");
    var categoryId = docdata.getAttribute("data-category");
    var enclosurename = docdata.getAttribute("data-enclosure");
    window.location.href = ROOT + "NewRID/FileDownload?docName=" + enclosurename + "&&ingredientId=" + ingredientId + "&&regionId=" + regionId + "&&categoryId=" + categoryId;
}

function ViewDocumentsDataModal(FileData) {
    var categoryId = parseInt(FileData.getAttribute("data-categoryId"));
    var regionId = parseInt(FileData.getAttribute("data-regionId"));
    var region = FileData.getAttribute("data-region")
    $.jgrid.gridUnload('#viewlist');
    view_file_data = []
    var fileData_uploadedDocs = oldfiles_uploadedData.filter(m => m.RegionId === regionId && m.CategoryId === categoryId);
    $.each(fileData_uploadedDocs, function (i, obj) {
        view_file_data.push({ "EnclosureName": obj.EnclosureName, "CategoryId": obj.CategoryId, "RegionId": obj.RegionId, "Region": obj.Region })
    })
    createModalGrid();
    $("#IngredientModal1").modal("show");
}

function createModalGrid() {
    $("#viewlist").jqGrid({
        url: '',
        datatype: 'local',
        data: view_file_data,
        mtype: 'GET',
        colModel: IngridentDocViewColModels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected2',
        rowNum: 200,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#viewlist tbody tr");
            var objHeader = $("#viewlist tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }


    });

    $('#viewlist').closest('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('#viewlist').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#viewlist').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $('#viewlist').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#viewlist').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#viewlist').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#viewlist').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
}

$('#closebtn').click(function () {
    $("#IngredientModal1").modal("hide");
});
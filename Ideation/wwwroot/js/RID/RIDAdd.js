var gridData = [];
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
            name: 'Region', align: 'center', classes: 'trs', cellattr: arrtSetting,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    var index = login_region.findIndex(function (obj) { return obj === cellvalue });
                    index == -1 ? login_region.push(cellvalue) : '';
                }
                return cellvalue;

            }
        },
        {
            name: 'Category', classes: 'trs1',
            formatter: function (cellvalue, options, rowobject) {
                return cellvalue;

            }
        },
        {

            name: 'RegulatoryStatus', search: false,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    var str = '';
                    str = str + '<div class="demo-content"  >'
                    str = str + '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect>'
                    str = str + '<option value="0">Select</option>'
                    str = str + '</select>'
                    str = str + '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>'
                    str = str + '</div>';
                    return str;
                }
                else {
                    var str = '';
                    str = str + '<div class="demo-content"  >'
                    str = str + '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect disabled>'
                    str = str + '<option value="0">Select</option>'
                    str = str + '</select>'
                    str = str + '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>'
                    str = str + '</div>';
                    return str;
                }
                
            }

        },
        {
            name: 'CRemarks',
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    return '<div class="demo-content">' +
                        '<textarea class="form-control textvalid form-control-sm Cremarks_text" id="cremarks_selected_' + rowobject.RowNo + '" rows="3" cols="15" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"></textarea>' +
                        '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                        '</div>';
                }
                else {
                    return '<div class="demo-content">' +
                        '<textarea class="form-control textvalid form-control-sm Cremarks_text" id="cremarks_selected_' + rowobject.RowNo + '" rows="3" cols="15" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"readonly></textarea>' +
                        '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                        '</div>';
                }

            }
        },
        {
            name: 'ImpactDates', search: false,
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
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.IsEditable == true) {
                    return '<div class="demo-content" >' +
                        '<input type="text" class= "form-control form-control-sm  References_text" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"/> ' +
                        '</div>';
                }
                else {
                    return '<div class="demo-content" >' +
                        '<input type="text" class= "form-control form-control-sm  References_text" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" readonly/> ' +
                        '</div>';
                }
            }
        },
        {
            name: 'ReferenceDoc',
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
        name: 'Region', align: 'center', classes: 'trs', cellattr: arrtSetting,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                var index = login_region.findIndex(function (obj) { return obj === cellvalue });
                index == -1 ? login_region.push(cellvalue) : '';
            }
            return cellvalue;

        }
    },
    {
        name: 'Category', classes: 'trs1',
        formatter: function (cellvalue, options, rowobject) {
            return cellvalue;

        }
    },
    {
        name: 'RegulatoryStatus', search: false,

        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                debugger;
                var str = '';
                str = str + '<div class="demo-content"  >'
                str = str + '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect>'
                str = str + '<option value="0">Select</option>'
                str = str + '</select>'
                str = str + '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>'
                str = str + '</div>';
                return str;
            }
            else {
                var str = '';
                str = str + '<div class="demo-content"  >'
                str = str + '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect disabled>'
                str = str + '<option value="0">Select</option>'
                str = str + '</select>'
                str = str + '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>'
                str = str + '</div>';
                return str;
            }
        }

    },
    {
        name: 'CRemarks',
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {

                return '<div class="demo-content">' +
                    '<textarea class="form-control textvalid form-control-sm Cremarks_text" id="cremarks_selected_' + rowobject.RowNo + '" rows="3" cols="15" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '">' + rowobject.CRemarks + '</textarea>' +
                    '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                    '</div>';
            }
            else {
                return '<div class="demo-content">' +
                    '<textarea class="form-control textvalid form-control-sm Cremarks_text " id="cremarks_selected_' + rowobject.RowNo + '" rows="3" cols="15" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" readonly>' + rowobject.CRemarks + '</textarea>' +
                    '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                    '</div>';
            }
        }
    },
    {
        name: 'ImpactDates', search: false,
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
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                return '<div class="demo-content" >' +
                    '<input type="text" class= "form-control form-control-sm  References_text" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.References + '"/> ' +
                    '</div>';
            }
            else {
                return '<div class="demo-content" >' +
                    '<input type="text" class= "form-control form-control-sm  References_text" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.References + '" readonly/> ' +
                    '</div>';
            }
        }
    },
    {
        name: 'ReferenceDoc',
        name: 'ReferenceDoc',
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsEditable == true) {
                return '<div class="demo-content ">' +
                    '<div class="row">' +
                    '<div class="_hide col-md-1 pdt_9" id="old_' + rowobject.RegionId + "_" + rowobject.CategoryId + '"><a href="#" data-target="#IngredientModal1" data-categoryId="' + rowobject.CategoryId + '" data-regionId="' + rowobject.RegionId +'"data-region="'+rowobject.Region +'" onclick="ViewDocumentsDataModal(this)" title="View Documents"><i class="fa fa-info-circle"></i></a></div> ' +
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
]

var IngridentDocViewColModels = [
    {
        name: 'EnclosureName',
        label:'Document Name',
        align: 'center',
    },
    {
        name: 'CategoryId',
        label:'CategoryId',
        align: 'center',
        hidden: true,
    },
    {
        name: 'RegionId',
        label:'RegionId',
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
        label:'Action',
        align: 'center',
        formatter: function (cellvalue, options, rowobject) {
            var index = login_region.findIndex(function (obj) { return obj == rowobject.Region});
            if (index > -1) {
                return '<div class="demo-content ">' +
                    '<a href="#" title="Download" class="btn-icon btn-success" onclick="downloadoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" ><i class="fa fa-download"></i></a>' +
                    '<a href="#" title="Delete" onclick="deletedoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" class="btn-icon -delete"><i class="fa fa-trash"></i></a>' +
                    '</div >';
            }
            else {
                return '<div class="demo-content ">' +
                    '<a href="#" title="Download" class="btn-icon btn-success" onclick="downloadoc(this)" data-region="' + rowobject.RegionId + '" data-category="' + rowobject.CategoryId + '" data-enclosure="' + rowobject.EnclosureName + '" ><i class="fa fa-download"></i></a>' +
                    '</div >';
            }
                
            
        }
    }
    
];

$(document).ready(function () {
    var role = $("#userrole").val();
    $('body').on('change', '.textvalid', function () {
        var id = $(this)[0].id;
        var value = this.value.trim();
        if (value === "") {
            $("#" + id + "_valid").removeClass("_hide");
        } else {
            $("#" + id + "_valid").addClass("_hide");
        }
    });
    $('body').on('keyup', '.textvalid', function () {
        debugger;
        var id = $(this)[0].id;
        var value = this.value.trim();
        if (value === "") {
            $("#" + id + "_valid").removeClass("_hide");
        } else {
            $("#" + id + "_valid").addClass("_hide");
        }
    });

    if (ingredientId > 0) {
        gridData = JSON.parse($("#IngredientListData").val());
        colModel = updatecolmodels;
        oldfiles_uploadedData = JSON.parse($("#IngredientFileData").val());
        $("#title").text("/ Edit Ingredient");
    }

    else {
        var data = JSON.parse($("#DivisionBasedIngredientListJson").val())
        gridData = data;
        colModel = insertcolmodels;
    }
    $("#list").jqGrid({
        datatype: 'local',
        data: gridData,
        colNames: ['RowNo', 'Region', 'Category', 'Regulatory Status', 'Compliance Remarks', 'Impact Date', 'References', 'Ref Documents'],
        colModel: colModel,
        cmTemplate: { sortable: false },
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected1',
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
                        $('#regulatory_status_selected_' + a).val(obj.RegulatoryStatus).trigger('change');
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
    bindFilesGrid();
});
$("#savebtn").on("click", function () {
    debugger;
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
    ingredientId > 0 ? fd.append("Source", $("#Source").val()) : '';
    if (ingredientname == null || ingredientname === "" || typeof (ingredientname) == "undefined") {

        $('#IngredientName_valid').removeClass("_hide");
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
    var totalvalidlength = 0;
    var region_array = [];
    var region_name = login_region.length == 1 ? login_region[0] : 'atleast one';

    $.each(gridData, function (i, obj) {
        region_array.indexOf(parseInt(obj.RegionId)) > -1 ? "" : region_array.push(parseInt(obj.RegionId));
    });

    $.each(region_array, function (i, obj1) {
        var regionvalidLength = gridData.filter(function (obj) { return parseInt(obj.RegulatoryStatus) !== 0 && parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var remarksvalidlength = gridData.filter(function (obj) { return typeof obj.CRemarks === 'string' && obj.CRemarks.trim() !== "" && parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var totallength = gridData.filter(function (obj) { return parseInt(obj1) === parseInt(obj.RegionId) }).length;
        var regionData = gridData.filter(function (obj) { return parseInt(obj.RegulatoryStatus) !== 0 && parseInt(obj1) === parseInt(obj.RegionId) });

        regionvalidLength === totallength && remarksvalidlength === totallength ? totalvalidlength++ : totalvalidlength;

        if (((regionvalidLength > 0 || remarksvalidlength > 0) && ((regionvalidLength < totallength) || (remarksvalidlength < totallength)))&& totalvalidlength>0) {
            $.each(regionData, function (row, data) {
                if (data.RegulatoryStatus === "0" || data.RegulatoryStatus === null) {
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
    })

    if (totalvalidlength === 0) {
        alert("Please enter the Regulatory Status and Compliance Remarks for " + region_name + " Region ");
        isValid = false;
        return false;

    }
    
    
    for (var count = 1; count <= gridData.length; count++) {
        var fileUpload = $("#RefDoc_" + count).get(0);
        var files = fileUpload.files;
        if (files.length != "0" || files.length != 0) {
            for (var f = 0; f < files.length; f++) {
                fd.append("PostedFile", files[f]);
            }
        }
    }
   
    if (isValid && ingredientId > 0) {
        $("#confirmpopup").modal("show");
        $('#ConfirmOKbutton').off('click').on('click', function () {
            $.each(oldfiles_uploadedData, function (i, obj) {
                documentData.push({ "RegionId": obj.RegionId, "CategoryId": obj.CategoryId, "EnclosureName": obj.EnclosureName });
            });
            fd.append("DocumentData", JSON.stringify(documentData));
            $.ajax({
                url: ROOT + 'RID/UpdateDetails',
                dataType: 'JSON',
                type: 'POST',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.includes("Successfully")) {
                        window.location.href = ROOT + "RID/IngredientsRegulation";

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
    else if (isValid) {
        $("#confirmpopup").modal("show");
        $('#ConfirmOKbutton').off('click').on('click', function () {
            $.each(oldfiles_uploadedData, function (i, obj) {
                documentData.push({ "RegionId": obj.RegionId, "CategoryId": obj.CategoryId, "EnclosureName": obj.EnclosureName });
            });
            fd.append("DocumentData", JSON.stringify(documentData));
            $.ajax({
                url: ROOT + 'RID/SaveDetails',
                dataType: 'JSON',
                type: 'POST',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.includes("Successfully")) {
                        window.location.href = ROOT + "RID/IngredientsRegulation";

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
});

function bindregulatorystatusDropDown() {
    $.ajax({
        url: ROOT + "RID/GetRegulatoryStatus",
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
$(document).on('change', '.regulatorystatus_c', function (e) {
    debugger;
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
    debugger;
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
    var divisionid = $("#Division_Id").val();
    window.location.href = ROOT + "RID/IngredientsRegulation?DivisionId";
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
    window.location.href = ROOT + "RID/FileDownload?docName=" + enclosurename + "&&ingredientId=" + ingredientId + "&&regionId=" + regionId + "&&categoryId=" + categoryId;
}

function ViewDocumentsDataModal(FileData) {
    var categoryId = parseInt(FileData.getAttribute("data-categoryId"));
    var regionId = parseInt(FileData.getAttribute("data-regionId"));
    var region = FileData.getAttribute("data-region")
    $.jgrid.gridUnload('#viewlist');
    view_file_data=[]
    var fileData_uploadedDocs = oldfiles_uploadedData.filter(m => m.RegionId === regionId && m.CategoryId === categoryId);
    $.each(fileData_uploadedDocs, function (i, obj) {
        view_file_data.push({ "EnclosureName": obj.EnclosureName, "CategoryId": obj.CategoryId, "RegionId": obj.RegionId,"Region":obj.Region })
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


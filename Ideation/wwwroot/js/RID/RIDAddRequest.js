var gridData = [];
var fileName = [];
var documentData = [];
var login_region = [];
var ingredientId = parseInt($("#IngredientId").val());
$(document).ready(function () {
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
       var id = $(this)[0].id;
        var value = this.value.trim();
        if (value === "") {
            $("#" + id + "_valid").removeClass("_hide");
        } else {
            $("#" + id + "_valid").addClass("_hide");
        }
    });
    var data = JSON.parse($("#DivisionBasedIngredientListJson").val())
    gridData = data;
    var oldRegion;
    arrtSetting = function (rowId, val) {
        var result;
        if (oldRegion = undefined || oldRegion != val) {
            result = ' rowspan=' + '"' + 4 + '"';
        }
        else {
            result = ' style="display:none"';
        }
        oldRegion = val;
        return result;
    };
    $("#list").jqGrid({
        datatype: 'local',
        data: data,
        colNames: ['RowNo', 'Region', 'Category', 'Regulatory Status', 'Compliance Remarks', 'Impact Date', 'References', 'Ref Documents'],
        colModel: [
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
                        str = str + '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control textvalid singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect>'
                        str = str + '<option value="0">Select</option>'
                        str = str + '</select>'
                        str = str + '<span class="text-danger _hide" id="regulatory_status_selected_' + rowobject.RowNo + '_valid">Please select Regulatory Status</span>'
                        str = str + '</div>';
                        return str;
                    }
                    else {
                        var str = '';
                        str = str + '<div class="demo-content"  >'
                        str = str + '<select id="regulatory_status_selected_' + rowobject.RowNo + '" class="form-control textvalid singleselect regulatorystatus_c" data-lineno="' + rowobject.RowNo + '"  data-name="' + options.colModel.name + '" singleselect disabled>'
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
                            '<textarea class="form-control textvalid form-control-sm Cremarks_text" id="cremarks_selected_' + rowobject.RowNo + '" rows="3" cols="15" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" readonly></textarea>' +
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
                            '<input type="text" readonly class= "form-control form-control-sm data-datepicker ImpactDates_text" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"/> ' +
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
        ],
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
    //ingredientId > 0 ? $(".readonly").attr("disabled", true) : $(".readonly").attr("disabled", false)
    //if (ingredientId > 0) {
    //    $('#FunctionId_arr').multiselect("disable");
    //}
});
$("#savebtn").on("click", function () {
    debugger;
    var isValid = true;
    var ingredientname = $("#IngredientName").val();
    var synonyms = $("#Synonyms").val();
    var casnumber = $("#CASNumber").val();
    var functionid = $("#FunctionId_arr").val().join(',').toString();
    var divisionid = $("#Division_Id").val();
    var fd = new FormData();
    fd.append("IngredientName", ingredientname);
    fd.append("Synonyms", synonyms);
    fd.append("CASNumber", casnumber);
    fd.append("FunctionId", functionid);
    fd.append("GridData", JSON.stringify(gridData));
    fd.append("JsonFileNames", JSON.stringify(fileName));
    fd.append("DocumentData", JSON.stringify(documentData));
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

        if (((regionvalidLength > 0 || remarksvalidlength > 0) && ((regionvalidLength < totallength) || (remarksvalidlength < totallength))) && totalvalidlength > 0) {
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

    if (isValid) {
        $("#confirmpopup").modal("show");
        $('#ConfirmOKbutton').on('click', function () {
            $.ajax({
                url: ROOT + 'RID/SaveDetails',
                dataType: 'JSON',
                type: 'POST',
                data: fd,
                contentType: false,
                processData: false,
                success: function (result) {
                    jQuery("#list").jqGrid().setGridParam({
                        datatype: 'local',
                        data: result,
                    });
                    //$('#loader').show();
                    //$('#loader').css('visibility', 'visible');
                    window.location.href = ROOT + "RID/IngredientsRegulation";

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

    var e = $(this);
    var rowno = parseInt($(e).data('lineno'))
    var name = $(e).data('name');
    var index = gridData.findIndex(m => m.RowNo === rowno);
    var rowData = $("#list").getRowData(rowno);
    if (index >= 0) {
        gridData[index][name] = $(this).val();
    }

});
$(document).on('change', '.RefDocs_text', function (e) {
    //debugger;
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
            fileName.push(filenames.replaceAll(" ", ""));
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
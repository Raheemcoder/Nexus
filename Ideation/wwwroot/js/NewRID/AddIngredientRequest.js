var gridData = [];
var fileName = [];
var documentData = [];
var login_region = [];
var ingredientNames = [];
var ingredientId = parseInt($("#IngredientId").val());

var oldingredientname = "";
var oldsynonyms = "";
var oldcasnumber = "";
var oldfunctionid = "";
var old_gridData = [];

$(document).ready(function () {

    oldingredientname = $("#IngredientName").val().toLowerCase().trim();
    oldsynonyms = $("#Synonyms").val().toLowerCase().trim();
    oldcasnumber = $("#CASNumber").val().toLowerCase().trim();
    oldfunctionid = $("#FunctionId_arr").val().join(',').toString();

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
            $("#IngredientName_exists").addClass("_hide");

        } else {
            $("#" + id + "_valid").addClass("_hide");
        }
    });
    var data = JSON.parse($("#DivisionBasedIngredientListJson").val())
    gridData = data;
    ingredientNames = JSON.parse($("#IngredientNameList").val());
    old_gridData = JSON.parse($("#DivisionBasedIngredientListJson").val());

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
                width: 125,
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsEditable == true) {
                        return '<div class="demo-content">' +
                            '<textarea class="form-control textvalid form-control-sm Cremarks_text noSpacesField" id="cremarks_selected_' + rowobject.RowNo + '" rows="2"  data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"></textarea>' +
                            '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                            '</div>';
                    }
                    else {
                        return '<div class="demo-content">' +
                            '<textarea class="form-control textvalid form-control-sm Cremarks_text noSpacesField" id="cremarks_selected_' + rowobject.RowNo + '" rows="2"  data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" readonly></textarea>' +
                            '<span class="text-danger _hide" id="cremarks_selected_' + rowobject.RowNo + '_valid" >Please enter Remarks</span>' +
                            '</div>';
                    }
                }
            },
            {
                name: 'ImpactDates',
                width: 55,
                search: false,
                formatter: function (cellvalue, options, rowobject) {
                    if (rowobject.IsEditable == true) {
                        return '<div class="demo-content" >' +
                            '<input type="text" readonly class= "form-control form-control-sm data-datepicker ImpactDates_text ImpactDates_text_freezed" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"/> ' +
                            '</div>';
                    }
                    else {
                        return '<div class="demo-content" >' +
                            '<input type="text" disabled class= "form-control form-control-sm data-datepicker ImpactDates_text" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"/> ' +
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

});

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
function validateSave() {

    var isModified = false;

    var ingredientName = $("#IngredientName").val().toLowerCase().trim();
    var synonyms = $("#Synonyms").val().toLowerCase().trim();
    var casnumber = $("#CASNumber").val().toLowerCase().trim();
    var functionid = $("#FunctionId_arr").val().join(',').toString();

    if (oldingredientname != ingredientName || oldsynonyms != synonyms || oldcasnumber != casnumber || oldfunctionid != functionid) {
        isModified = true;
    }

    $.each(gridData, function (i, obj) {
        var oldgrid_impactdate = convertDateToString(old_gridData[i].ImpactDates);
        var grid_impactdate = convertDateToString(gridData[i].ImpactDates);
        if (parseInt(old_gridData[i].RegionId) != parseInt(gridData[i].RegionId) ||
            parseInt(old_gridData[i].CategoryId) != parseInt(gridData[i].CategoryId) ||
            parseInt(old_gridData[i].RegulatoryStatus) != parseInt(gridData[i].RegulatoryStatus) ||
            old_gridData[i].CRemarks?.toLowerCase().trim() != gridData[i].CRemarks?.toLowerCase().trim() ||
            oldgrid_impactdate != grid_impactdate ||
            old_gridData[i].References?.toLowerCase().trim() != gridData[i].References?.toLowerCase().trim()) {
            isModified = true;
        }
    });

    if (documentData.length > 0) {
        isModified = true;
    }

    return isModified;
}

$("#save_draftbtn").on("click", function () {

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
    fd.append("IsConfirmed", 0);
    ingredientId > 0 ? fd.append("Source", $("#Source").val()) : '';

    if (ingredientId > 0 && $("#Source").val().toLowerCase() == 'ingredientrequest') {
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

    if (isValid) {
        if (validateSave()) {
            handelConfirmPopup("Are you sure, you want to save the ingredients details as draft",

                function () {

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
        else {
            alert('There are no changes to save');
        }
    }

});

$("#savebtn").on("click", function () {

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

    var region_array = [];
    var region_name = login_region.length == 1 ? login_region[0] : 'atleast one';
    var alert_msg = "Please enter the Regulatory Status and Compliance Remarks for " + region_name + " Region ";
    var totalvalidlength = 0;
    var totalvalidlength_regulatory = 0;
    var totalvalidlength_remarks = 0;
    var isValid_regulatory = true;
    var isValid_remarks = true;
    var isValid_regiondata = false;

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

    $.each(gridData, function (i, obj) {
        region_array.indexOf(parseInt(obj.RegionId)) > -1 ? "" : region_array.push(parseInt(obj.RegionId));
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
    })

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
    })

    if (totalvalidlength === 0) {
        alert(alert_msg);
        isValid = false;
    }

    if (ingredientId > 0 && $("#Source").val().toLowerCase() == 'ingredientrequest') {
        var index = ingredientNames.findIndex(function (obj, i) {
            return obj.IngredientName.trim().toLowerCase() === ingredientname.trim().toLowerCase()
        });

        if (index > -1) {
            alert("Ingredient Name Already Exists");
            isValid = false;
        }
    }

    if (isValid) {
        $("#Remarks_modal").modal("show");
        $('#SendtoApproveRevert').off('click').on('click', function () {
            var remarksData = {
                IngredientId: ingredientId,
                Approvallevel: '',
                Action: 'Sent for Level 1 Approval',
                Remarks: $("#Remarks_text").val().trim()
            }

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
        });
    }

});

function SaveUploadedFiles(ingredientId, type) {

    var ingredientId = parseInt(ingredientId);

    var fd = new FormData();
    fd.append("IngredientId", ingredientId);
    fd.append("JsonFileNames", JSON.stringify(fileName));
    fd.append("Division_Id", $("#Division_Id").val());
    type != "Save" ? fd.append("Source", $("#Source").val()) : '';
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
    };
});

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
var lastDocId = 0;
var documentFilesArray = [];
var HeaderFile = [];
initializeAutocomplete();
var selectedId = "";
var AutosuggestDropdown = JSON.parse($("#AutosuggestDropdown").val());
var ManufacturingPlant = AutosuggestDropdown.filter(m => m.Type.toLowerCase() == "manufacturingplant")
var ProductGroup = AutosuggestDropdown.filter(m => m.Type.toLowerCase() == "productgroup")
var DocNumbers = AutosuggestDropdown.filter(m => m.Type.toLowerCase() == "docnumber")
var start = new Date();
const currentYear = new Date().getFullYear();
const twoYearsBack = currentYear - 2;
var startingFrom = new Date(twoYearsBack, 0, 1);
var end = new Date(new Date().setYear(start.getFullYear() + 1));
var EditProductGroupRow = 0;
var gridData_new = [];
var newfilename = "";

var declarationFileArray = [];
var declarationFileGridArray = [];
var loginId = $("#LoginId").val().trim();
var todayDate = new Date();
var latestDecDocId = 0;


$('[datepicker-startdate]').datepicker({
    format: 'dd/mm/yyyy',
    endDate: end,
    autoclose: true,
    todayHighlight: true
}).on('changeDate', function (selected) {
    $('[datepicker-enddate]').datepicker('setStartDate', $(this).val());
});

$('[datepicker-enddate]').datepicker({
    format: 'dd/mm/yyyy',
    startDate: start,
    autoclose: true,
    todayHighlight: true
}).on('changeDate', function (selected) {
    $('[datepicker-startdate]').datepicker('setEndDate', $(this).val());
});

$(function () {
    CreateProductGroupGrid();
});

colmodels = [
    {
        name: 'DocId',
        label: 'DocId',
        width: 150,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'RowNo',
        label: 'RowNo',
        width: 150,
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: '',
        label: '<div class="text-center header_style">Action</div> <div class="mr-2 checkbox_position text-center"><input type="checkbox" id="cbox_isDelete" onclick="checkboxfordelete(event)"</div>',
        resizable: true,
        search: false,
        sortable: false,
        width: 35,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                        <input type="checkbox" class="isDeletecbox" data-productGroup="` + rowobject.ProductGroup + `" data-rowno="` + rowobject.RowNo + `" id="isDeletebox_` + rowobject.RowNo + `">
                  <a onclick=OnEditProductGroup(`+ options.rowId + `) class= "icon_color btn_button edit" title = "Edit" id = "edit_info" ><i class="fas fa-pen ml-2 color-blue" title="Edit" aria-hidden="true"></i><span class="sr-only">Edit</span></a ></div>`;
        }
    },
    {
        name: 'ProductGroup',
        label: 'Product Name',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'EffectiveFrom',
        label: 'Effective From',
        width: 80,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DocumentName',
        label: 'Document Name',
        resizable: true,
        ignoreCase: true,
        width: 190,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="pr_fields_ link_color">' +
                '<a onclick=Viewdoc("' + rowobject.DocId + '")>' + cellvalue + '</a>' +
                '</div>';
        }
    },
    {
        name: 'NewDocument',
        label: 'Document',
        resizable: true,
        ignoreCase: true,
        width: 190,
        hidden: true,
    }
]

function CreateProductGroupGrid(result) {
    $.jgrid.gridUnload('#ProductGroup_Grid');
    $("#ProductGroup_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#ProductGroup_pager',
        rowNum: 1000,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#ProductGroup_Grid tbody tr");
            var objHeader = $("#ProductGroup_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            $.each(gridData_new, function (i, obj) {
                var checked = obj.IsActive ? false : true;
                $("#isDeletebox_" + obj.RowNo).prop("checked", checked)
            });
        }
    });

    $("#ProductGroup_Grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('#ProductGroup_Grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-230px + 100vh)' });
    $('#ProductGroup_Grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#audit_trail').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#ProductGroup_Grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#ProductGroup_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#ProductGroup_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }
}

var fields = [
    { Id: "ManufacturingPlant", e_Id: "E_ManufacturingPlant" },
    { Id: "LicenceType", e_Id: "E_LicenceType" },
    { Id: "DocCategory", e_Id: "E_DocCategory" },
    { Id: "DocumentNumber", e_Id: "E_DocumentNumber" },
    { Id: "ValidFrom", e_Id: "E_ValidFrom" },
    { Id: "ValidTo", e_Id: "E_ValidTo" },
    { Id: "H_FileUpload", e_Id: "E_H_FileUpload" },
];

function validateFields() {

    HideValidations();

    let isValid = true;

    fields.forEach(({ Id, e_Id, }) => {
        
        const input = document.getElementById(Id);
        const errorElement = document.getElementById(e_Id);

        var DocCategoryId = $("#DocCategory").val();
        if (DocCategoryId == "2" && (Id == "ValidFrom")) {
            return true;
        }
        var LicenceTypeName = $("#LicenceType option:selected").text()?.trim()?.toLowerCase();

        if (LicenceTypeName == "fssai" && DocCategoryId == "1" && (Id == "ValidFrom")) {
            return true;
        }

        if (input.value.trim() === "" || input.value.trim() === "0") {
            errorElement.classList.remove("hide");
            isValid = false;
        } else {
            errorElement.classList.add("hide");
        }

    });
    return isValid;
}

$(document).on("change", ".F_Value", function () {
    const errorElement = $(this).siblings().filter(function () {
        return this.id; // Select sibling elements with an `id` attribute
    });
    if ($(this).val().trim() === "" || $(this).val().trim() === "0") {
        errorElement.removeClass("hide");
    } else {
        errorElement.addClass("hide");
    }
});

$(document).on("click", "#btn_add", function () {
    $("#E_validateGrid").addClass('hide').text("");
    var productGroup = $("#ProductGroupId").val();
    var effectivefrom = $("#EffectiveFrom").val();
    //var isvalid = validateFields();
    //if (!isvalid) {
    //    return false;
    //}
    if (productGroup == "") {
        productGroup == "" ? $("#E_ProductGroupId").removeClass('hide').text('please select product name') : $("#E_ProductGroupId").addClass('hide').text("");
        // effectivefrom == "" ? $("#E_EffectiveFrom").removeClass('hide') : $("#E_EffectiveFrom").addClass('hide');
        return false;
    }
    var ProductGroupList = $("#ProductGroup_Grid").jqGrid("getCol", "ProductGroup");
    var productGroup_FileUpload = $("#P_FileUpload").get(0).files[0]?.name.toString().split('\\').pop();
    var files = $('#P_FileUpload')[0].files;
    if (EditProductGroupRow == 0) {
        if (ProductGroupList.includes(productGroup)) {
            $("#ProductGroupId").siblings('.already-selected').removeClass('hide');
            return false;
        }
        var id = lastDocId + 1;
        Array.from(files).forEach(function (item) {
            documentFilesArray.push({
                DocId: id,
                File: item,
            });
        });

        if (gridData_new.length == 0) {
            item = {
                RowNo: 1,
                DocId: id,
                ProductGroup: productGroup,
                DocumentName: productGroup_FileUpload == "" || productGroup_FileUpload == null || productGroup_FileUpload == undefined ? "" : productGroup_FileUpload,
                NewDocument: productGroup_FileUpload == "" || productGroup_FileUpload == null || productGroup_FileUpload == undefined ? "" : productGroup_FileUpload,
                IsActive: true,
                EffectiveFrom: effectivefrom
            }
            gridData_new.push(item)
        }
        else {
            var ids = gridData_new.map(function (object) {
                return object.RowNo;
            });
            var maxRowNo = Math.max(...ids);
            item = {
                RowNo: maxRowNo + 1,
                DocId: id,
                ProductGroup: productGroup,
                DocumentName: productGroup_FileUpload == "" || productGroup_FileUpload == null || productGroup_FileUpload == undefined ? "" : productGroup_FileUpload,
                NewDocument: productGroup_FileUpload == "" || productGroup_FileUpload == null || productGroup_FileUpload == undefined ? "" : productGroup_FileUpload,
                IsActive: true,
                EffectiveFrom: effectivefrom
            }
            gridData_new.push(item)
        }
        lastDocId = id;
    }
    else {
        var previousDoc = $("#EditedProductDocument").text();
        var currentDoc = $("#P_FileUpload").val().trim();
        var Gridindex = gridData_new.findIndex(doc => parseInt(doc.DocId) === EditProductGroupRow);
        if (currentDoc != "") {
            Array.from(files).forEach(function (item) {
                var index = documentFilesArray.findIndex(doc => doc.DocId === EditProductGroupRow);
                if (index !== -1) {
                    documentFilesArray[index].File = item;
                }
            });
            if (Gridindex !== -1) {
                gridData_new[Gridindex].DocumentName = productGroup_FileUpload == "" || productGroup_FileUpload == null || productGroup_FileUpload == undefined ? "" : productGroup_FileUpload
                gridData_new[Gridindex].NewDocument = productGroup_FileUpload == "" || productGroup_FileUpload == null || productGroup_FileUpload == undefined ? "" : productGroup_FileUpload
            }

        }
        else if (currentDoc == "" && previousDoc == "") {
            var index = documentFilesArray.findIndex(doc => doc.DocId === EditProductGroupRow);
            if (index !== -1) {
                documentFilesArray[index].File = "";
            }
            if (Gridindex !== -1) {
                gridData_new[Gridindex].DocumentName = "",
                    gridData_new[Gridindex].NewDocument = ""
            }
        }
        if (Gridindex != -1) {
            gridData_new[Gridindex].EffectiveFrom = effectivefrom;
        }
    }
    $("#ProductGroupId").val('').attr("disabled", false);
    $("#P_FileUpload").val('');
    $("#EffectiveFrom").val('');
    EditProductGroupRow = 0;
    $("#EditedProductDocument").text("").addClass('hide');
    $("#DeleteProductGroupFile").addClass('hide');
    CreateProductGroupGrid(gridData_new);
});

$(document).on("click", "#btn_delete", function () {
    $("#ProductGroupId").val('').attr("disabled", false);
    $("#P_FileUpload").val('');
    EditProductGroupRow = 0;
    $("#EditedProductDocument").text("").addClass('hide');
    $("#DeleteProductGroupFile").addClass('hide');

    var new_arr = structuredClone(gridData_new);
    var deleteselected = gridData_new.filter(function (obj) {
        return obj.IsActive == false
    }).length

    if (deleteselected == 0) {
        alert("Please select atleast one product name to delete")
    }
    else {
        confirm("Are you sure you want to delete?", function () {

            $.each(new_arr, function (i, obj) {
                if (obj.IsActive == false) {
                    var index = gridData_new.findIndex(function (item) {
                        return parseInt(obj.RowNo) === parseInt(item.RowNo)
                    });
                    if (index > -1) {
                        gridData_new.splice(index, 1);
                    }
                }
            });
            var row = 1
            $.each(gridData_new, function (i, obj) {
                obj.RowNo = row
                row = row + 1
            });
            CreateProductGroupGrid(gridData_new);
            showAlertMessage("Data deleted sucessfully", "alert-success");

        });
    }
});

function checkisChecked(resData) {
    var notCheckedIsActive = resData.filter(function (obj) {
        return obj.IsActive != false
    }).length;
    var isActive = notCheckedIsActive > 0 ? false : true;
    $('#cbox_isDelete').prop('checked', isActive);
}

$(document).on("click", ".isDeletecbox", function () {
    var rowNo = $(this)[0].getAttribute('data-rowno');
    var checkedVal = $(this).prop('checked');
    var isActive = checkedVal ? false : true;

    var index = gridData_new.findIndex(function (obj) {
        return parseInt(obj.RowNo) === parseInt(rowNo);
    });

    if (index > -1) {
        gridData_new[index].IsActive = isActive;
    }

    checkisChecked(gridData_new);
});

function checkboxfordelete(e) {
    e = e || event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = false;
    var headerCheckboxforIsDelete = document.getElementById('cbox_isDelete');
    var isactiveChecked = headerCheckboxforIsDelete.checked;
    var isActive = isactiveChecked ? false : true;

    var gridDataIds = $("#ProductGroup_Grid").jqGrid('getDataIDs');
    if (gridDataIds != '' || gridDataIds.length > 0) {
        $.each(gridDataIds, function (row, rowId) {
            var roWData = $("#ProductGroup_Grid").jqGrid('getRowData', rowId);
            $("#isDeletebox_" + roWData.RowNo).prop("checked", isactiveChecked);

            var index = gridData_new.findIndex(function (obj) {
                return parseInt(obj.RowNo) == parseInt(roWData.RowNo);
            });

            if (index > -1) {
                gridData_new[index].IsActive = isActive;
            }
        })
    }
}

$("#ProductGroupId").change(function () {
    var productName = $.trim($("#ProductGroupId").val()).toLowerCase();
    const productList = $("#ProductGroup_Grid").jqGrid("getCol", "ProductGroup");
    const lowerCaseProductList = productList.map(product => product.toLowerCase());
    if (productName != "") {
        lowerCaseProductList.includes(productName) ? ($("#E_ProductGroupId").removeClass('hide').text('Product name already exists. Please add another product name')) : $("#E_ProductGroupId").addClass('hide');
    }
});

function OnRemoveDoc(rowId, DocId) {
    confirm("Are you sure you want to delete?", function () {

        var foundindex = documentFilesArray.filter(item => item.DocId == DocId);
        if (foundindex > -1) {
            documentFilesArray.splice(foundindex, 1);
        }
        $("#ProductGroup_Grid").jqGrid('delRowData', rowId);
        $("#ProductGroup_Grid").trigger('reloadGrid', [{ page: 1 }]);
    });
}

var formData = new FormData();
function validateFileUpload(type) {

    var flag = true;
    var supportedExtention = ['pdf'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#${type}_FileUpload`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            $(`.${type}_invalidFormat`).removeClass('hide');
            setTimeout(function () {
                $(`.${type}_invalidFormat`).addClass('hide');
            }, 5000);

            $(`#${type}_FileUpload`).val('');

            flag = false;

            return false;
        }
    });

    if (flag) {
        for (var i = 0; i < $(`#${type}_FileUpload`).get(0).files.length; i++) {
            fileLength += $(`#${type}_FileUpload`).get(0).files[i].size / (1024 * 1024);

            if (fileLength > 100) {
                alert('The file size should be less than 100 MB');
                $(`#${type}_FileUpload`).val('');
                return false;
            }
            var supportedFiles = [];
            var file1 = $(`#${type}_FileUpload`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#${type}_FileUpload`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = "100" + fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);
        }
    }
}

function initializeAutocomplete() {

    $("[data-manufacturing-plant]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                var obj = [];
                var cnt = 0;
                var matching = $.grep(ManufacturingPlant, function (value) {
                    var name = value.Name;
                    var id = value.Id;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id });
                        cnt++;
                    }
                    return matcher.test(id);
                });
                response(obj);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                this.value = ui.item.value;
                selectedId = 0;// Indicate a valid selection
                selectedId = parseInt(ui.item.id);
                $(event.target).siblings('span').addClass('hide'); // Hide error messages if any
                return false;
            },
            close: function (event) {
                var inputValue = $(event.target).val();
                // If no valid project is selected, clear the input and show an error
                if (selectedId === 0) {
                    $(event.target).val("");
                    $("#ManufacturePlantId").val('');
                    // Clear the input
                    $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) {
                        $(this).addClass('hide');
                        next();
                    });
                } else {
                    $(event.target).val(inputValue);
                }
            },
            change: function (event, ui) {
                $(event.target).siblings('span').addClass('hide');
                var terms = this.value;
                var validResources = [];
                var invalidResources = [];
                if (terms.length > 0) {
                    if (terms != null && terms != "") {
                        var filteredResources = ManufacturingPlant.filter(item => item.Name === terms);

                        if (filteredResources.length > 0) {
                            var value = filteredResources[0].Name;
                            validResources.push(value);
                            $("#ManufacturePlantId").val(filteredResources[0].Id);
                        }
                        else {
                            invalidResources.push(terms);
                        }
                    }
                    if (validResources.length > 0) {
                        this.value = validResources.join(" ");
                    }

                    if (invalidResources.length > 0) {
                        $(event.target).val("");
                        $("#ManufacturePlantId").val('');
                        $(event.target).siblings('.not-valid').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                }
            }
        }),
        $("[data-productgroup]")
            .on("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).autocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 0,
                source: function (request, response) {
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                    var obj = [];
                    var cnt = 0;
                    var matching = $.grep(ProductGroup, function (value) {
                        var name = value.Name;
                        var id = value.Name;
                        if (matcher.test(name) && cnt < 10) {
                            obj.push({ "value": name, "id": id });
                            cnt++;
                        }
                        return matcher.test(id);
                    });
                    response(obj);
                },
                focus: function () {
                    return false;
                },
                select: function (event, ui) {
                    this.value = ui.item.value;
                    selectedId = 0;// Indicate a valid selection
                    selectedId = parseInt(ui.item.id);
                    $(event.target).siblings('span').addClass('hide'); // Hide error messages if any
                    return false;
                },
                close: function (event) {
                    var inputValue = $(event.target).val();
                    // If no valid project is selected, clear the input and show an error
                    if (selectedId === 0) {
                        $(event.target).val("");
                        // Clear the input
                        $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) {
                            $(this).addClass('hide');
                            next();
                        });
                    } else {
                        $(event.target).val(inputValue);
                    }
                },
                change: function (event, ui) {
                    $(event.target).siblings('span').addClass('hide');
                    var terms = split(this.value);
                    var validResources = [];
                    var invalidResources = [];
                    if (terms.length > 0) {
                        terms.forEach(function (name) {
                            if (name != null && name != "") {
                                var filteredResources = ProductGroup.filter(item => item.Name === name);

                                if (filteredResources.length > 0) {
                                    var value = filteredResources[0];
                                    validResources.push(name);
                                }
                                else {
                                    invalidResources.push(name);
                                }
                            }
                        });

                        if (validResources.length > 0) {
                            this.value = validResources.join(" ");
                        }

                        if (invalidResources.length > 0) {
                            $(event.target).val("");
                            $(event.target).siblings('.not-valid').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                        }
                    }
                }
            });
}

function split(val) {
    return val.split(/,\s*/);
}

function extractLast(term) {
    return split(term).pop();
}

$(document).on("click", "#Btn_Save", async function () {
    try {
        HideValidations();

        DocumentNumber = $("#DocumentNumber").val().trim();
        var found = DocNumbers.filter(item => item.Name === DocumentNumber)
        if (found.length > 0) {
            alert("Document no. is already present");
            return false;
        }
        var manufacturingplant = $("#ManufacturingPlant").val().trim();
        if (manufacturingplant == "") {
            $("#ManufacturingPlant").siblings('span').addClass('hide');
            $("#E_ManufacturingPlant").removeClass('hide');
            return false;
        }
        var Productgroup = $("#ProductGroup_Grid").jqGrid("getGridParam", "data");
        var RequestData = GetFiledValues();
        var DeclarationData = declarationFileGridArray;
        confirm("Are you sure you want to save?", async function () {

            var formData = new FormData();
            formData.append("Action", "Save");

            const { RequestData: updatedRequestData, Productgroup: updatedProductgroup, DeclarationData: updatedDeclarationData } =
                await SaveAllTheFiles(RequestData, Productgroup, DeclarationData);

            formData.append("RequestData", JSON.stringify(updatedRequestData));
            formData.append("Productgroup", JSON.stringify(updatedProductgroup));
            formData.append("DeclarationData", JSON.stringify(updatedDeclarationData));

            $.ajax({
                url: ROOT + "RDMS/InsertRDMSData",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.toLowerCase().includes('success')) {
                        window.location.href = ROOT + 'RDMS/LicenseManagementList';
                    }
                    else {
                        alert(result);
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error Occured: " + error);
                }
            });

        })
    } catch (error) {
        console.error(error);
    }
});

$(document).on("click", "#Btn_Confirm", async function () {

    try {

        var isvalid = validateFields();
        var Productgroup = $("#ProductGroup_Grid").jqGrid("getGridParam", "data");
        DocumentNumber = $("#DocumentNumber").val();
        var found = DocNumbers.filter(item => item.Name === DocumentNumber)
        if (found.length > 0) {
            alert("Document no. is already present");
            return false;
        }
        if (!isvalid) {
            return false;
        }
        var RequestData = GetFiledValues();
        var DeclarationData = declarationFileGridArray;

        $("#ApproveModal").modal('show');
        $("#ModalLabel").text("Submit Confirmation");
        $(".modalmsg").text("Are you sure you want to submit?");

        $('#ByClick_OK').off('click').on('click', async function () {

            const Remarks = $("#ApprovalRemarks").val().trim();
            if (!Remarks) {
                $("#E_ApprovalRemarks").show();
                return;
            }
            $(this).prop('disabled', true);
            var formData = new FormData();

            formData.append("Action", "Submit");
            formData.append("Remarks", Remarks);

            const { RequestData: updatedRequestData, Productgroup: updatedProductgroup, DeclarationData: updatedDeclarationData } =
                await SaveAllTheFiles(RequestData, Productgroup, DeclarationData);

            formData.append("RequestData", JSON.stringify(updatedRequestData));
            formData.append("Productgroup", JSON.stringify(updatedProductgroup));
            formData.append("DeclarationData", JSON.stringify(updatedDeclarationData));

            $.ajax({
                url: ROOT + "RDMS/InsertRDMSData",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.toLowerCase().includes('success')) {
                        window.location.href = ROOT + 'RDMS/LicenseManagementList';
                    }
                    else {
                        alert(result);
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error Occured: " + error);
                }
            });

        });
    }
    catch (error) {
        console.log(error)
    }
});

function GetFiledValues() {

    var data = [];
    data.push({

        ManufacturingPlant: $("#ManufacturePlantId").val(),
        LicenceType: $("#LicenceType").val(),
        DocCategory: $("#DocCategory").val(),
        DocumentNumber: $("#DocumentNumber").val(),
        ValidFrom: $("#ValidFrom").val(),
        ValidTo: $("#ValidTo").val(),
        HeaderDocumentName: $("#H_FileUpload").get(0).files[0]?.name.toString().split('\\').pop(),
        LicenceHeaderId: '0',
        Version: 'V0',
        DocId: 'HeaderFile',
        DeclarationDate: $("#dec-date").val().trim()

    });
    return data;

}
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}
function Viewdoc(DocId, from = "") {

    if (from == "") {
        var isFound = documentFilesArray.findIndex(item => item.DocId == DocId);
        if (isFound != -1) {
            var fileObj = documentFilesArray.filter(item => item.DocId == DocId)[0].File;
            var fileUrl = URL.createObjectURL(fileObj);
            window.open(fileUrl, '_blank');
            URL.revokeObjectURL(fileUrl);
        }
    }
    else {
        var isFound = declarationFileArray.findIndex(item => item.DocumentId == DocId);
        if (isFound != -1) {
            var fileObj = declarationFileArray.filter(item => item.DocumentId == DocId)[0].File;
            var fileUrl = URL.createObjectURL(fileObj);
            window.open(fileUrl, '_blank');
            URL.revokeObjectURL(fileUrl);
        }
    }

}
function HideValidations() {
    fields.forEach(({ Id, e_Id, }) => {
        const errorElement = document.getElementById(e_Id);
        errorElement.classList.add("hide");
    });
    $("#E_validateGrid").addClass('hide').text("");
}
function OnEditProductGroup(RowData) {
    $("#E_ProductGroupId").addClass('hide');
    $("#ProductGroupId", "#P_FileUpload").val("");
    var DataFromTheRow1 = jQuery('#ProductGroup_Grid').jqGrid('getRowData', RowData);
    var DocId = DataFromTheRow1.DocId;
    $('#ProductGroupId').val(DataFromTheRow1.ProductGroup).attr("disabled", true);
    $('#EditedProductDocument').text(DataFromTheRow1.NewDocument).removeClass('hide');
    $('#EffectiveFrom').val(DataFromTheRow1.EffectiveFrom)
    if (DataFromTheRow1.NewDocument != "") {
        $('#DeleteProductGroupFile').removeClass('hide');
    }
    EditProductGroupRow = parseInt(DocId, 10);
}
$(document).on("change", "#P_FileUpload", function () {
    $("#EditedProductDocument,#DeleteProductGroupFile").addClass('hide');
});

$(document).on("click", "#DeleteProductGroupFile", function () {
    $('#EditedProductDocument').text("").addClass('hide');
    $("#DeleteProductGroupFile").addClass('hide');
});

async function uploadFileChunk(file) {

    try {
        return new Promise((resolve, reject) => {
            const chunkSize = 20 * 1024 * 1024; // 20MB
            const totalChunks = Math.ceil(file.size / chunkSize);
            let chunkIndex = 0;
            const progressBar = document.getElementById("progress-Bar");

            function sendChunk(chunk, fileName) {

                const formData = new FormData();
                formData.append('file', chunk, file.name);
                formData.append('UpdatedFileName', fileName);
                formData.append('chunkIndex', chunkIndex);
                formData.append('totalChunks', totalChunks);

                $.ajax({
                    type: 'POST',
                    url: ROOT + "RDMS/UploadFileInChunks",
                    data: formData,
                    processData: false,
                    contentType: false,
                    timeout: 60000,
                    xhr: function () {
                        const xhr = new XMLHttpRequest();
                        xhr.upload.addEventListener('progress', function (event) {
                            const percentComplete = Math.round((event.loaded / event.total) * 100);

                            progressBar.textContent = percentComplete + '%';
                            progressBar.style.width = percentComplete + '%';

                        }, true);
                        return xhr;
                    },
                    success: function (response) {
                        chunkIndex++;
                        if (chunkIndex < totalChunks) {
                            sendChunk(file.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize), response);
                        } else {
                            resolve(response);
                            progressBar.textContent = "Upload Complete!";
                            progressBar.style.width = '100%';
                            setTimeout(() => {
                                document.body.removeChild(progressBarContainer); // Remove progress bar after some time
                            }, 2000);
                            // Resolve when all chunks are uploaded
                        }
                        newfilename = response;
                    },
                    error: function (response) {
                        document.body.removeChild(progressBarContainer);
                        reject(response.responseText);
                    }

                });

            }

            sendChunk(file.slice(0, chunkSize));
        });
    } catch (error) {
        console.log(error);
    }

}

async function SaveAllTheFiles(RequestData, Productgroup, DeclarationData) {

    $("#confirmpopup").modal('hide')
    $("#ApproveModal").modal('hide')
    try {

        var Hfiles = $('#H_FileUpload')[0].files;
        for (let item of Hfiles) {
            swal({
                title: 'Uploading...',
                text: `<p>Please wait...</p><br><div class="progress"><div class="progress-bar" role="progressbar" id="progress-Bar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">70%</div></div>`,
                html: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            const newfilename = await uploadFileChunk(item);
            RequestData[0].HeaderDocumentName = newfilename;
        }

        for (let doc of declarationFileArray) {
            if (doc.File) {
                swal({
                    title: 'Uploading...',
                    text: `<p>Please wait...</p><br><div class="progress"><div class="progress-bar" role="progressbar" id="progress-Bar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">70%</div></div>`,
                    html: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                const newfilename = await uploadFileChunk(doc.File);
                var indexToUpdate = declarationFileGridArray.findIndex(item => item.DocumentId == doc.DocumentId);
                if (indexToUpdate !== -1) {
                    DeclarationData[indexToUpdate].DocumentName = newfilename;
                }
            }
        }

        for (let doc of documentFilesArray) {
            if (doc.File) {
                swal({
                    title: 'Uploading...',
                    text: `<p>Please wait...</p><br><div class="progress"><div class="progress-bar" role="progressbar" id="progress-Bar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">70%</div></div>`,
                    html: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                const newfilename = await uploadFileChunk(doc.File);
                var indexToUpdate = Productgroup.findIndex(item => item.DocId == doc.DocId);
                if (indexToUpdate !== -1) {
                    Productgroup[indexToUpdate].NewDocument = newfilename;
                }
            }
        }

        return { RequestData, Productgroup, DeclarationData };
    }
    catch (error) {
        alert("Error in save the file:", error);
        throw error;
    }

}

$(window).on('hidden.bs.modal', function () {
    $("#ApprovalRemarks").val('');
    $("#E_ApprovalRemarks").hide();
});

$('#EffectiveFrom').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true
});

$('#dec-date').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true
});

function ClearHideDeclaration() {
    $("#dec-date").val('');
    $("#dec-file").val('');
    $(".dec-sub-div").addClass("hide");
}
$(document).on("change", "#DocCategory", function () {

    var DocCategoryId = $("#DocCategory").val().toString();
    checkSelectedCategory(DocCategoryId);
    ClearHideDeclaration();

    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetDocumentType",
        data: { DocCategoryId: DocCategoryId },
        dataType: "JSON",
        success: function (result) {
            if (result != null) {
                var List = '';
                $("option").remove(".addOption");
                $.each(result, function (i, obj) {
                    List += '<option class="addOption" value="' + obj.Id + '">' + obj.Name + '</option>';
                })
                $(".addOption").append(List);
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

});

$(document).on("change", "#LicenceType", function () {

    var DocCategory = $("#DocCategory option:selected").text()?.trim()?.toLowerCase();
    var LicenceTypeName = $("#LicenceType option:selected").text()?.trim()?.toLowerCase();

    if (LicenceTypeName == "ayush" && DocCategory == "license") {
        $(".dec-sub-div").removeClass('hide');
    }
    else {
        ClearHideDeclaration();
    }

    if (LicenceTypeName == "fssai" && DocCategory == "license") {
        $(".HideForCategory2").hide();
        $("#E_ValidFrom").addClass('hide');
    }
    else if (LicenceTypeName != "fssai" && DocCategory == "license") {
        $(".HideForCategory2").show();
    }

});

$(document).on("change", "#dec-date", function () {

    $("#dec-file").val('');

});

function checkSelectedCategory(DocCategoryId) {

    if (DocCategoryId == "2") {
        $(".HideForCategory2").hide();
        $("#E_ValidFrom").addClass('hide');
    }
    else {
        $(".HideForCategory2").show();
    }

}

function ValidateFile() {

    var supportedExtention = "pdf";

    var fileLength = 0;
    var filesArray = [];

    filesArray = $('#dec-file').get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (ext != supportedExtention) {
            $("#dec-file").siblings('span').addClass('hide');
            $('#dec-file').val('');
            $(".dec-file-invalid-span").removeClass('hide').delay(5000).
                queue(function (next) { $(".dec-file-invalid-span").addClass('hide'); next(); });
            return false;
        }

    });

    for (var i = 0; i < filesArray.length; i++) {

        fileLength += filesArray[i].size / (1024 * 1024);

        if (fileLength > 100) {

            $('#dec-file').val('');
            $("#dec-file").siblings('span').addClass('hide');
            $(".dec-file-overflow-span").removeClass('hide').delay(5000).
                queue(function (next) { $(".dec-file-overflow-span").addClass('hide'); next(); });
            return false;

        }

        var supportedFiles = [];
        var file1 = filesArray[i];

        supportedFiles.push(file1);

        var fileName = filesArray[i].name.toString().split('\\').pop();

        supportedFiles.name = "100" + fileName;

        const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

        formData.append('files', newFile);

    }

}
$(document).on("click", "#dec-file-add", function () {

    if ($("#dec-file").val().trim() != "") {

        var filesArray = [];

        filesArray = $('#dec-file').get(0).files;

        $.each(filesArray, function (index, file) {

            latestDecDocId = latestDecDocId + 1;
            var fileName = file.name.toString().split('\\').pop();

            declarationFileGridArray.push({
                DeclarationDate: $("#dec-date").val(),
                DocumentId: latestDecDocId,
                DocumentName: fileName,
                UploadedBy: loginId,
                UploadedOn: new Date(todayDate).toLocaleDateString("en-GB")
            });

            declarationFileArray.push({
                DocumentId: latestDecDocId,
                File: file
            });

        });

        $("#dec-file").val('');
    }
    else {
        $("#dec-file").siblings('span').addClass('hide');
        $(".dec-file-empty-span").removeClass('hide').delay(5000).
            queue(function (next) { $(".dec-file-empty-span").addClass('hide'); next(); });
    }

});
function OpenDeclarationFilePopup() {
    createFileModalGrid(declarationFileGridArray);
}
var DeclarationFileColModel = [
    {
        name: 'Action',
        label: 'Action',
        align: 'center',
        width: 20,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return `
                    <div class="d-flex action_icons align-items-center justify-content-center">
                        <span role="button" onclick="DeleteDecDoc(${rowobject.DocumentId})">
                            <i class="fas fa-trash delete-pr-file-item color-delete" title="Delete"></i>
                        </span>
                    </div>`;
        }
    },
    {
        name: 'DeclarationDate',
        label: 'Declaration Date',
        width: 50,
        sortable: false,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DocumentName',
        label: 'Document Name',
        sortable: false,
        width: 100,
        formatter: function (cellvalue, options, rowobject) {
            return `
                    <div class="link_color">
                        <a onclick="Viewdoc(${rowobject.DocumentId}, 'dec')"> ${cellvalue} </a>
                    </div>`;
        }

    },
    {
        name: 'UploadedBy',
        label: 'Uploaded By',
        sortable: false,
        width: 60
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        sortable: false,
        width: 40
    }
];
function createFileModalGrid(data) {

    $.jgrid.gridUnload('#declartionviewfiles');

    $("#declartionviewfiles").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: DeclarationFileColModel,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_declartionviewfiles',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#declartionviewfiles tbody tr");
            var objHeader = $("#declartionviewfiles tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#declartionviewfiles').closest('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
    $('#declartionviewfiles').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $('#viewlist').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 300) {
        $('#declartionviewfiles').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#declartionviewfiles').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "5px");
    }
    else {
        $('#declartionviewfiles').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#declartionviewfiles').closest(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

    $("#declartionviewfiles").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $("#DecFilePopup").modal("show");
}
function DeleteDecDoc(DocId) {

    handelConfirmPopup('Are you sure do you want to delete the file?',
        function () {
            var indexOfFile = declarationFileArray.findIndex(function (obj) {
                return obj.DocumentId == DocId
            });
            if (indexOfFile > -1) {
                declarationFileArray.splice(indexOfFile, 1);
            }
            var indexOfFile = declarationFileGridArray.findIndex(function (obj) {
                return obj.DocumentId == DocId
            });
            if (indexOfFile > -1) {
                declarationFileGridArray.splice(indexOfFile, 1);
            }

            createFileModalGrid(declarationFileGridArray);
        }
    )

}

function checkBeforeOpen() {

    var date = $("#dec-date").val().trim();
    if (date != "") {
        $("#dec-file").siblings('span').addClass('hide');
        return true;
    }
    else {
        $("#dec-file").val('');
        $("#dec-file").siblings('span').addClass('hide');
        $(".dec-date-empty-span").removeClass('hide').delay(5000).
            queue(function (next) { $(".dec-date-empty-span").addClass('hide'); next(); });
        return false;
    }

}
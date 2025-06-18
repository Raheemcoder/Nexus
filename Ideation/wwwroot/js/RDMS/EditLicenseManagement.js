var DocGrid = [];
initializeAutocomplete();
var LicenseHeaderData = $.parseJSON($("#LicenseHeaderData").val());
var ProductGroupList = $.parseJSON($("#ProductGroup").val());
var currentVersion = ""
var LicenceHeaderId = ""
var StatusId = ""
var ValidFrom = ""
var ValidTo = ""
var lastDocId = 0;
var gridData_new = [];
var EditProductGroupRow = 0;
var PreviousLastDocId = 0;
var ActionType = $("#ActionType").val();
// Actiontype= 1 - Edit, 2- Renewal
var documentFilesArray = [];
var selectedheaderid;
var selectedversion;
var DocType = "";
var DocCategory = "";
var isChanged = 0;
var isProductChanged = 0;

var asDecDate = "";
var declarationFileArray = [];
var declarationFileGridArray = [];
var loginId = $("#LoginId").val().trim();
var todayDate = new Date();
var latestDecDocId = 0;

declarationFileGridArray = $.parseJSON($("#DeclarationData").val());

latestDecDocId = declarationFileGridArray.length > 0
    ? Math.max.apply(Math, declarationFileGridArray.map(item => item.DocumentId))
    : 0;

if (ProductGroupList && ProductGroupList.length > 0) {
    var docIds = ProductGroupList.map(function (item) {
        return Number(item.DocId) || 0;
    });
    lastDocId = Math.max.apply(null, docIds);
    PreviousLastDocId = Math.max.apply(null, docIds);
    $.each(ProductGroupList, function (i, obj) {
        item = {
            RowNo: obj.RowNo,
            DocId: obj.DocId,
            ProductGroup: obj.ProductGroup,
            DocumentName: obj.DocumentName,
            NewDocument: obj.NewDocument == null ? "" : obj.NewDocument,
            Version: obj.Version,
            CreatedBy: obj.CreatedBy,
            IsActive: true,
            IsProductActive: obj.IsProductActive,
            EffectiveFrom: obj.EffectiveFrom,
            IsNew: false
        }
        gridData_new.push(item)
    });
}

AssignValueToFileds(LicenseHeaderData);
function AssignValueToFileds(LicenseHeaderData) {

    $("#ManufacturingPlant").val(LicenseHeaderData[0].ManufacturingPlant).attr('disabled', true);
    $("#ManufacturePlantId").val(LicenseHeaderData[0].ManufacturingPlantId)
    DocType = LicenseHeaderData[0].LicenceType
    DocCategory = LicenseHeaderData[0].DocCategory
    $("#DocCategory").val(LicenseHeaderData[0].DocCategory)
    checkSelectedCategory(LicenseHeaderData[0].DocCategory);
    $("#DocumentNumber").val(LicenseHeaderData[0].DocumentNumber)
    $("#ValidFrom").val(LicenseHeaderData[0].ValidFrom)
    $("#ValidTo").val(LicenseHeaderData[0].ValidTo)
    currentVersion = LicenseHeaderData[0].Version
    $(".displayversion").text(currentVersion)
    LicenceHeaderId = LicenseHeaderData[0].LicenceHeaderId
    $(".displayRefNo").text(LicenceHeaderId)
    StatusId = LicenseHeaderData[0].StatusId
    ValidFrom = LicenseHeaderData[0].ValidFrom
    ValidTo = LicenseHeaderData[0].ValidTo
    $("#Exsistingfile").text(LicenseHeaderData[0].HeaderDocumentName)
    if (LicenseHeaderData[0].HeaderDocumentName == "" || LicenseHeaderData[0].HeaderDocumentName == null) {
        $("#deleteHeaderFile").addClass('hide');
    }
    if (DocCategory != "" && DocCategory != null && DocCategory != undefined) {
        GetDocTypeByCategory(DocCategory);
    }

    if (DocCategory == "1" && DocType == "1") { // License & Ayush
        $(".dec-sub-div").removeClass('hide');
        $("#dec-date").val(LicenseHeaderData[0]?.DeclarationDate);
        asDecDate = LicenseHeaderData[0]?.DeclarationDate;
    }
    else {
        $(".dec-sub-div").addClass('hide');
    }
}

if (StatusId != "0" && ActionType != "1") {
    $("#ManufacturingPlant").attr('disabled', true);
    $("#LicenceType").attr('disabled', true);
    $("#DocCategory").attr('disabled', true);
    $("#DocumentNumber").attr('disabled', true);
    $("#Btn_Renewal").removeClass('hide');
    $("#Btn_Save, #Btn_Confirm").addClass('hide');
    $("#Exsistingfile").text("").addClass('hide');
    $("#deleteHeaderFile").addClass('hide');
}

if (StatusId != "0" && ActionType == "1") {
    $("#ManufacturingPlant").attr('disabled', true);
    $("#LicenceType").attr('disabled', true);
    $("#DocCategory").attr('disabled', true);
    $("#DocumentNumber").attr('disabled', true);
    $("#ValidFrom").attr('disabled', true);
    $("#ValidTo").attr('disabled', true);
    $("#H_FileUpload").attr('disabled', true);
    $("#deleteHeaderFile").addClass('hide');
    $("#Btn_Save").addClass('hide');
    $("#Btn_ProductsSave").addClass('hide');
}

if (StatusId == "0") {
    $("#ShowHeaderFile").addClass('hide');
    $("#Btn_ProductsSave").addClass('hide');
}

var selectedId = "";
var AutosuggestDropdown = JSON.parse($("#AutosuggestDropdown").val());
var ManufacturingPlant = AutosuggestDropdown.filter(m => m.Type.toLowerCase() == "manufacturingplant")
var ProductGroup = AutosuggestDropdown.filter(m => m.Type.toLowerCase() == "productgroup")
var start = new Date();
const currentYear = new Date().getFullYear();
const twoYearsBack = currentYear - 2;
var startingFrom = new Date(twoYearsBack, 0, 1);
var end = new Date(new Date().setYear(start.getFullYear() + 1));
var StartD = $("#ValidFrom").val();
$('[datepicker-startdate]').datepicker({
    format: 'dd/mm/yyyy',
    // startDate: startingFrom,
    endDate: end,
    autoclose: true,
    todayHighlight: true
}).on('changeDate', function (selected) {
    var fromDate = parseDate($('#ValidFrom').val());
    var toDate = parseDate($('#ValidTo').val());

    if (fromDate > toDate) {
        alert('Valid from should not be greater than valid to');
        $('#ValidFrom').val('');
    }
    $('[datepicker-enddate]').datepicker('setStartDate', $(this).val());
})

$('[datepicker-enddate]').datepicker({
    format: 'dd/mm/yyyy',
    startDate: StartD,
    autoclose: true,
    todayHighlight: true
}).on('changeDate', function (selected) {
    var toDate = parseDate($('#ValidTo').val());
    var fromDate = parseDate($('#ValidFrom').val());

    if (fromDate > toDate) {
        alert('Valid to should not be less than valid from');
        $('#ValidTo').val('');
    }
    $('[datepicker-startdate]').datepicker('setEndDate', $(this).val());
});

function parseDate(dateString) {
    var parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
colmodels = [
    {
        name: 'DocId',
        label: 'DocId',
        resizable: true,
        ignoreCase: true,
        width: 190,
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
        label: '<div class="text-center header_style"><b>Action</b></div> <div class="mr-2 checkbox_position text-center"><input type="checkbox" id="cbox_isDelete" onclick="checkboxfordelete(event)"</div>',
        resizable: true,
        search: false,
        sortable: false,
        width: 35,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return (
                '<div style="display: flex; justify-content: left; align-items: center; height: 100%;">' +
                '<input type="checkbox" class="isDeletecbox" data-productGroup="' + rowobject.ProductGroup +
                '" data-rowno="' + rowobject.RowNo +
                '" id="isDeletebox_' + rowobject.RowNo + '">' +
                '<a onclick="OnEditProductGroup(' + rowobject.RowNo +
                ')" class="icon_color btn_button edit" title="Edit" id="edit_info">' +
                '<i class="fas fa-pen ml-2 color-blue" title="Edit" aria-hidden="true"></i>' +
                '<span class="sr-only">Edit</span></a>' +
                ((StatusId != 0 && rowobject.IsNew == false)
                    ? '<a onclick="GetPopupData(4, \'' + LicenceHeaderId + '\', \'\', \'\', \'\', ' + rowobject.DocId +
                    ')" class="icon_color btn_button History" title="History" id="view_info">' +
                    '<i class="fas fa-eye ml-2 color-warning" aria-hidden="true"></i></a>'
                    : '') +
                '</div>'
            );
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
    },
    {
        name: 'Version',
        label: 'Version',
        resizable: true,
        ignoreCase: true,
        width: 40,
        hidden: true,
        exportcol: false,
    },
    {
        name: 'IsProductActive',
        label: 'Status',
        width: 50,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        stype: 'select',
        searchoptions: {
            value: ':All;True:Active;False:InActive',
        },
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsProductActive == "True") {
                return '<span class="">Active</span>';
            }
            else {
                return '<span class="">InActive</span>';
            }
        }
    },
    {
        name: 'CreatedBy',
        label: 'CreatedBy',
        resizable: true,
        ignoreCase: true,
        width: 190,
        hidden: true,
    },
]

CreateProductGroupGrid(gridData_new);
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
        },
    });

    $("#ProductGroup_Grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('#ProductGroup_Grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-200px + 100vh)' });
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
    { Id: "H_FileUpload", e_Id: "E_H_FileUpload" }
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

        if (StatusId == "0") {
            if (input.id == 'H_FileUpload') {
                if (input.value.trim() === "" && $("#Exsistingfile").text().trim() === "") {
                    errorElement.classList.remove("hide");
                    isValid = false;
                }
            }
            else if (input.value.trim() === "" || input.value.trim() === "0") {
                errorElement.classList.remove("hide");
                isValid = false;
            } else {
                errorElement.classList.add("hide");
            }
        }
        else {
            if (input.value.trim() === "" || input.value.trim() === "0") {
                errorElement.classList.remove("hide");
                isValid = false;
            } else {
                errorElement.classList.add("hide");
            }
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

    $(".OpenForProductEdit").addClass('hide');
    $("#E_validateGrid").addClass('hide').text("");
    var productGroup = $("#ProductGroupId").val();
    var effectivefrom = $("#EffectiveFrom").val();
    //var isvalid = validateFields();
    //if (!isvalid) {
    //    return false;
    //}
    if (productGroup == "") {
        productGroup == "" ? $("#E_ProductGroupId").removeClass('hide').text('please select product name') : $("#E_ProductGroupId").addClass('hide').text("");
        //effectivefrom == "" ? $("#E_EffectiveFrom").removeClass('hide') : $("#E_EffectiveFrom").addClass('hide');
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
                Version: currentVersion,
                CreatedBy: "",
                IsActive: true,
                IsProductActive: "True",
                EffectiveFrom: effectivefrom,
                IsNew: true
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
                Version: currentVersion,
                CreatedBy: "",
                IsActive: true,
                IsProductActive: "True",
                EffectiveFrom: effectivefrom,
                IsNew: true
            }
            gridData_new.push(item)
        }
        lastDocId = id;
    } else {
        var previousDoc = $("#EditedProductDocument").text();
        var currentDoc = $("#P_FileUpload").val().trim();
        var Status = $("#StatusType").val();
        var Gridindex = gridData_new.findIndex(doc => parseInt(doc.DocId) === EditProductGroupRow);
        if (currentDoc != "") {
            Array.from(files).forEach(function (item) {
                var index = documentFilesArray.findIndex(doc => parseInt(doc.DocId) === EditProductGroupRow);
                if (index !== -1) {
                    documentFilesArray[index].File = item;
                }
                else {
                    documentFilesArray.push({
                        DocId: EditProductGroupRow,
                        File: item,
                    });
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
                gridData_new[Gridindex].DocumentName = ""
                gridData_new[Gridindex].NewDocument = ""
            }
        }
        if (Gridindex !== -1) {
            gridData_new[Gridindex].IsProductActive = Status
            gridData_new[Gridindex].EffectiveFrom = effectivefrom;
            gridData_new[Gridindex].IsEdited = true;
        }

    }

    isChanged = 1;
    isProductChanged = 1;
    $("#ProductGroupId").val('').attr("disabled", false);
    $("#P_FileUpload").val('');
    $("#EffectiveFrom").val('');
    $("#EditedProductDocument").text("").addClass('hide');
    $("#DeleteProductGroupFile").addClass('hide');
    EditProductGroupRow = 0;
    $(".OpenForProductEdit").addClass('hide');
    CreateProductGroupGrid(gridData_new);

});
$(document).on("click", "#btn_delete", function () {
    $("#ProductGroupId").val('').attr("disabled", false);
    $("#P_FileUpload").val('');
    EditProductGroupRow = 0;
    $("#EditedProductDocument").text("").addClass('hide');
    $("#DeleteProductGroupFile").addClass('hide');
    $(".OpenForProductEdit").addClass('hide');


    var new_arr = structuredClone(gridData_new);
    var deletedDocsId = [];
    var deleteselected = gridData_new.filter(function (obj) {
        return obj.IsActive == false
    }).length

    if (deleteselected == 0) {
        alert("Please select atleast one Product name to delete")
    }
    else {
        confirm("Are you sure you want to delete?", function () {
            $.each(new_arr, function (i, obj) {
                if (obj.IsActive == false) {
                    var index = gridData_new.findIndex(function (item) {
                        return parseInt(obj.RowNo) === parseInt(item.RowNo)
                    });
                    if (index > -1) {
                        deletedDocsId.push(obj.DocId);
                        gridData_new.splice(index, 1);
                    }
                }
            });
            //      if (ActionType == "1") {
            $.ajax({
                type: "POST",
                url: ROOT + "RDMS/DeleteProductGroup",
                data: { LicenceHeaderId: LicenceHeaderId, Version: currentVersion, DocumentId: deletedDocsId.join(","), },
                dataType: "json",
                success: function (result) {
                    showAlertMessage(result.Item1, result.Item2);
                    var row = 1
                    $.each(gridData_new, function (i, obj) {
                        obj.RowNo = row
                        row = row + 1
                    });
                    CreateProductGroupGrid(gridData_new);
                }
            });
            // }
            //else {
            //    $.each(new_arr, function (i, obj) {
            //        var foundindex = documentFilesArray.filter(item => item.DocId == obj.DocId);
            //        if (foundindex > -1) {
            //            documentFilesArray.splice(foundindex, 1);
            //        }
            //    });
            //    var row = 1
            //    $.each(gridData_new, function (i, obj) {
            //        obj.RowNo = row
            //        row = row + 1
            //    });
            //    CreateProductGroupGrid(gridData_new);
            //}
        });
    }
});
function checkisChecked(resData) {
    var notCheckedIsActive = resData.filter(function (obj) {
        return obj.IsActive != false;
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
};

$("#ProductGroupId").change(function () {
    var productName = $.trim($("#ProductGroupId").val()).toLowerCase();
    const productList = $("#ProductGroup_Grid").jqGrid("getCol", "ProductGroup");
    const lowerCaseProductList = productList.map(product => product.toLowerCase());
    if (productName != "") {
        lowerCaseProductList.includes(productName) ? ($("#E_ProductGroupId").removeClass('hide').text('Product name already exists. Please add another product name')) : $("#E_ProductGroupId").addClass('hide');
    }
});

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
                var terms = split(this.value);
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

$(document).on("click", "#Btn_Save", function () {
    HideValidations();
    var Productgroup = $("#ProductGroup_Grid").jqGrid("getGridParam", "data");
    var manufacturingplant = $("#ManufacturingPlant").val().trim();
    if (manufacturingplant == "") {
        $("#ManufacturingPlant").siblings('span').addClass('hide');
        $("#E_ManufacturingPlant").removeClass('hide');
        return false;
    }
    confirm("Are you sure you want to save?", function () {
        var formData = new FormData();
        InsertData("Save");
    })
});
$(document).on("click", "#Btn_Confirm", function () {

    if (StatusId == '0') {
        var isvalid = validateFields();
        if (!isvalid) {
            return false;
        }
    }

    if (asDecDate != $("#dec-date").val().trim()) {
        isChanged = 1;
    }

    if (
        isChanged == 0 &&
        ActionType == "1" // edit
        && StatusId != "0" // not in draft stage
    ) {
        alert("There is no changes to save")
        return false;
    }
    $("#ApproveModal").modal('show');
    $("#ModalLabel").text("Submit Confirmation");
    $(".modalmsg").text("Are you sure you want to submit?");
    $('#ByClick_OK').off('click').on('click', function () {
        const Remarks = $("#ApprovalRemarks").val().trim();

        if (!Remarks) {
            $("#E_ApprovalRemarks").show();
            return;
        }
        $(this).prop('disabled', true);
        InsertData("Submit", Remarks);
    });
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
        HeaderDocumentName: ($("#H_FileUpload").val() === "" ? '' : $("#H_FileUpload").get(0).files[0]?.name.toString().split('\\').pop()),
        ExsistingHeaderDoc: $("#Exsistingfile").text(),
        LicenceHeaderId: LicenceHeaderId,
        Version: currentVersion,
        DocId: 'HeaderFile',
        DeclarationDate: $("#dec-date").val().trim()
    });
    return data;
}

$(document).on("click", "#Btn_Renewal", function () {
    var isvalid = validateFields();
    if (!isvalid) {
        return false;
    }
    var RequestData = GetFiledValues();
    if (ValidFrom === RequestData[0].ValidFrom && RequestData[0].ValidTo === ValidTo) {
        alert("There is no change in date for renewal");
        return false;
    }
    // var validToDate = parseDate(ValidTo);
    //var newValidToDate = parseDate(RequestData[0].ValidTo);

    //if (newValidToDate < validToDate) {
    //    alert("Renewal <b>Valid To</b> date cannot be lesser than <b>Valid To</b> date of previous version")
    //    return false;
    //}
    $("#ApproveModal").modal('show');
    $("#ModalLabel").text("Renewal Confirmation");
    $(".modalmsg").text("Are you sure you want to renewal?");
    $('#ByClick_OK').off('click').on('click', async function () {
        const Remarks = $("#ApprovalRemarks").val().trim();

        if (!Remarks) {
            $("#E_ApprovalRemarks").show();
            return;
        }
        $(this).prop('disabled', true);
        InsertData("Renewal", Remarks);
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
function Viewdoc(DocId, from = "") {

    if (from == "") {
        var isFound = documentFilesArray.findIndex(item => item.DocId == DocId);
        if (isFound != -1) {
            var fileObj = documentFilesArray.filter(item => item.DocId == DocId)[0].File;
            var fileUrl = URL.createObjectURL(fileObj);
            window.open(fileUrl, '_blank');
            URL.revokeObjectURL(fileUrl);
        }
        else {
            var filename = ProductGroupList.filter(item => item.DocId == DocId).map(item => item.DocumentName)[0];
            if (filename.length > 0) {
                var imageUrl = ROOT + 'RDMSFiles/' + filename;
                window.open(imageUrl, '_blank');
            }
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
        else {
            var filename = declarationFileGridArray.filter(item => item.DocumentId == DocId).map(item => item.DocumentName)[0];
            if (filename.length > 0) {
                var imageUrl = ROOT + 'RDMSFiles/' + filename;
                window.open(imageUrl, '_blank');
            }
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

$(document).on("click", "#ShowHeaderFile", function () {
    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetRDMSHeaderFiles",
        data: { LicenceHeaderId: LicenceHeaderId },
        dataType: "json",
        success: function (result) {
            $("#HeaderDocModal").modal('show');
            CreateHeaderDocGrid(result);
        }
    });
});

HeaderColModal = [

    {
        name: 'Version',
        label: 'Version',
        resizable: true,
        ignoreCase: true,
        width: 190,
    },
    {
        name: 'HeaderDocumentName',
        label: 'Document Name',
        resizable: true,
        ignoreCase: true,
        width: 190,
        formatter: function (cellvalue, options, rowobject) {
            var filename = encodeURIComponent(cellvalue)
            return '<div class="pr_fields_ link_color">' +
                '<a onclick=ViewHeaderdoc("' + filename + '")>' + cellvalue + '</a>' +
                '</div>';
        }
    },
]
function CreateHeaderDocGrid(result) {
    $.jgrid.gridUnload('#HeaderDoc_Grid');
    $("#HeaderDoc_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: result,
        mtype: 'GET',
        colModel: HeaderColModal,
        loadonce: true,
        viewrecords: true,
        pager: '#HeaderDoc_pager',
        rowNum: 1000,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#HeaderDoc_Grid tbody tr");
            var objHeader = $("#HeaderDoc_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $("#HeaderDoc_Grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('#HeaderDoc_Grid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-230px + 95vh)' });
    $('#HeaderDoc_Grid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#audit_trail').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#HeaderDoc_Grid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#HeaderDoc_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#HeaderDoc_Grid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }
}

$("#Exsistingfile").on("click", function () {
    var filename = $(this).text();
    if (filename.length > 0) {
        var imageUrl = ROOT + 'RDMSFiles/' + filename;
        window.open(imageUrl, '_blank');
    }
});

$(document).on("change", "#H_FileUpload", function () {
    $("#E_H_FileUpload").addClass('hide');
    if (StatusId == "0") {
        if ($("#H_FileUpload").val() != "") {
            $("#Exsistingfile").addClass('hide');
            $("#deleteHeaderFile").addClass('hide');
        } else {
            $("#Exsistingfile").removeClass('hide');
            if ($("#Exsistingfile").val() != "") {
                $("#deleteHeaderFile").removeClass('hide');
            }
        }
    }
});
$(document).on("click", "#deleteHeaderFile", function () {
    confirm('Are you sure you want to delete?', function () {
        $.ajax({
            type: "POST",
            url: ROOT + "RDMS/DeleteProductGroup",
            data: { LicenceHeaderId: LicenceHeaderId, Version: currentVersion, DocumentId: 0, },
            dataType: "json",
            success: function (result) {
                $("#Exsistingfile").text('').addClass('hide');
                $("#deleteHeaderFile").addClass('hide');
            }
        });
    })
});
function ViewHeaderdoc(name) {
    var filename = decodeURIComponent(name)
    if (filename.length > 0) {
        var imageUrl = ROOT + 'RDMSFiles/' + filename;
        window.open(imageUrl, '_blank');
    }
}

function GetPopupData(type, licenseHeaderId, version = 0, isPageGrid = 0, UpdatedOnWithTime, DocId) {
    // type 1 - Product
    // type 2 - Remarks
    // type 3 - History
    $(".HeaderId").text(licenseHeaderId);
    event.stopPropagation();
    selectedheaderid = licenseHeaderId;
    selectedversion = version
    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetLicensePopupData",
        dataType: "JSON",
        async: false,
        data: {
            Type: type,
            LicenseHeaderId: licenseHeaderId,
            Version: (version == 0, currentVersion, version),
            CreatedOn: UpdatedOnWithTime,
            DocId: DocId
        },
        success: function (data) {

            if (data) {
                if (type == 1) {
                    CreateProductGrid(data, isPageGrid);
                }
                else if (type == 2) {
                    CreateRemarksGrid(data);
                }
                else if (type == 3) {
                    CreateHistoryGrid(data);
                }
                else if (type == 4) {
                    CreateProductGroupHistory(data);
                }
            }
            else {
                alert("Error Occured: " + result);
            }

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}

prodColmodels = [
    {
        name: 'ProductGroup',
        label: 'Product Name',
        width: 190,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'EffectiveFrom',
        label: 'Effective From',
        resizable: true,
        sortable: false,
        width: 80,
        ignoreCase: true,
    },
    {
        name: 'ProductDocumentName',
        label: 'Document Name',
        resizable: true,
        ignoreCase: true,
        exportcol: true,
        hidden: true
    },
    {
        name: 'ProductDocumentName',
        label: 'Document Name',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="pr_fields_ link_color">
                        <a href="${ROOT + `RDMSFiles/` + cellvalue}" target="_blank">${cellvalue}</a>
                    </div>`;
        }
    },
];
function CreateProductGrid(data, type) {

    // type 1 -- page grid
    // type 0 -- popup grid

    $.jgrid.gridUnload('#product-grid');
    $("#product-grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: prodColmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#product-grid-pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#product-grid tbody tr");
            var objHeader = $("#product-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#product-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    if (type == 0) {
        $("#product-grid").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 210px)' });
        $("#product-grid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
        var $ProductTableHeight = $("#product-grid").closest(".ui-jqgrid-bdiv").find("tbody").height();
        if ($ProductTableHeight > 130) {
            $("#product-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $("#product-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
        } else {
            $("#product-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $("#product-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        }
        //$("#prd-plant").text(plantName);
        //$("#prd-lictype").text(licTypeName);
        //$("#prd-doccat").text(docCatName);
        //$("#prd-docno").text(docNo);
        $("#product-popup").modal('show');
    }
    else if (type == 1) {
        $("#product-grid").closest('.ui-jqgrid-bdiv').css({ 'max-height': '200px' });
        $("#product-grid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
        var $ProductTableHeight = $("#product-grid").closest(".ui-jqgrid-bdiv").find("tbody").height();
        if ($ProductTableHeight > 130) {
            $("#product-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $("#product-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
        } else {
            $("#product-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $("#product-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        }
    }

}

remarksColmodels = [
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 185,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ActionOn',
        label: 'Action On',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ActionBy',
        label: 'Action By',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
];
function CreateRemarksGrid(data) {

    $.jgrid.gridUnload('#remarks-grid');

    $("#remarks-grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: remarksColmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#remarks-grid-pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#remarks-grid tbody tr");
            var objHeader = $("#remarks-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#remarks-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $("#remarks-grid").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 210px)' });
    $("#remarks-grid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $RemarksTableHeight = $("#remarks-grid").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($RemarksTableHeight > 130) {
        $("#remarks-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#remarks-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    } else {
        $("#remarks-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#remarks-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#rem-plant").text(plantName);
    $("#rem-lictype").text(licTypeName);
    $("#rem-doccat").text(docCatName);
    $("#rem-docno").text(docNo);

    $("#remarks-popup").modal('show');
}
historyColmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 70,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="action_icons text-left" title="">
                <a href="${ROOT + 'RDMSFiles/' + rowobject.HeaderDocumentName}" target="_blank">
                    <i class="fas fa-file color-green" title="Document"></i>
                </a>
                ${(rowobject.IsProductGroupPresent > 0)
                    ? `<span onclick="GetPopupData(1, '${rowobject.LicenseHeaderId}','${rowobject.Version}',0,'${rowobject.UpdatedOnWithTime}')">
                        <i class="fas fa-eye color-info" title="Products" role="button"></i>
                      </span>`
                    : ''}
            </div>`;
        }
    },
    {
        name: 'ValidFrom',
        label: 'Valid From',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ValidTo',
        label: 'Valid To',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Version',
        label: 'Version',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Status',
        label: 'Status',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UpdatedBy',
        label: 'Updated By',
        width: 95,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UpdatedOn',
        label: 'Updated On',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UpdatedOnWithTime',
        label: 'Updated On',
        width: 85,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 185,
        resizable: true,
        ignoreCase: true,
    },
];
function CreateHistoryGrid(data) {

    $.jgrid.gridUnload('#history-grid');

    $("#history-grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: historyColmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#history-grid-pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#history-grid tbody tr");
            var objHeader = $("#history-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#history-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $("#history-grid").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 210px)' });
    $("#history-grid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $HistoryTableHeight = $("#history-grid").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($HistoryTableHeight > 130) {
        $("#history-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#history-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    } else {
        $("#history-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#history-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }
    $("#history-popup").modal('show');
}

$(document).on("click", "#ViewDetails", function () {
    GetPopupData(3, LicenceHeaderId, 0, '')
})

//-----------------------Excel
var docNo = ($("#DocumentNumber").val() == "" ? LicenceHeaderId : $("#DocumentNumber").val())
$(document).on('click', "#prd-excel-download", function () {

    var isValid = true;
    var data = $('#product-grid').jqGrid('getGridParam', 'data');
    var plant = $('#ManufacturingPlant').val()
    var version = selectedversion
    if (data.length == 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "RDMS/DownloadRDMSProductsExcel?LicenseHeaderId=" + selectedheaderid + "&&plantName=" + plant + "&&type=" + "Version" + "&&version=" + version;

    }

});
$(document).on('click', "#his-excel-download", function () {
    var isValid = true;
    var plant = $('#ManufacturingPlant').val()
    var data = $('#history-grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "RDMS/DownloadRDMSHistoryExcel?LicenseHeaderId=" + selectedheaderid + "&&plantName=" + plant + "&&type=" + "History";

    }

});
$(document).on('click', "#rem-excel-download", function () {
    var isValid = true;
    var plant = $('#ManufacturingPlant').val()
    var data = $('#remarks-grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "RDMS/DownloadRDMSRemarksExcel?LicenseHeaderId=" + selectedheaderid + "&&plantName=" + plant + "&&type=" + "Remarks";
    }
});
function OnEditProductGroup(RowData) {
    $(".OpenForProductEdit").removeClass('hide');
    $("#StatusType").val('').select2()
    $("#E_ProductGroupId").addClass('hide');
    $("#ProductGroupId", "#P_FileUpload").val("");
    //var DataFromTheRow1 = jQuery('#ProductGroup_Grid').jqGrid('getRowData', RowData);
    //$('#ProductGroupId').val(DataFromTheRow1.ProductGroup).attr("disabled", true);
    //$('#EffectiveFrom').val(DataFromTheRow1.EffectiveFrom)
    var DocId = '';

    var index = gridData_new.findIndex(doc => parseInt(doc.RowNo) === parseInt(RowData));
    if (index !== -1) {
        $('#EditedProductDocument').text(gridData_new[index].DocumentName).removeClass('hide');
        $('#ProductGroupId').val(gridData_new[index].ProductGroup).attr("disabled", true);
        $('#EffectiveFrom').val(gridData_new[index].EffectiveFrom);
        gridData_new[index].DocumentName != '' ? $('#DeleteProductGroupFile').removeClass('hide') : $('#DeleteProductGroupFile').addClass('hide');
        $("#StatusType").val(gridData_new[index].IsProductActive).select2();
        DocId = gridData_new[index].DocId;
    }
    EditProductGroupRow = parseInt(DocId, 10);
}
$(document).on("change", "#P_FileUpload", function () {
    $("#EditedProductDocument,#DeleteProductGroupFile").addClass('hide');
})
$(document).on("click", "#DeleteProductGroupFile", function () {
    $('#EditedProductDocument').text("").addClass('hide');
    $("#DeleteProductGroupFile").addClass('hide');
})
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
                        reject(response.responseText); // Reject on error
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
    } catch (error) {
        alert("Error in save the file:", error);
        throw error;
    }
}
$(document).on("change", "#DocCategory", function () {

    var DocCategoryId = $("#DocCategory").val().toString();
    GetDocTypeByCategory(DocCategoryId);
    checkSelectedCategory(DocCategoryId);
    ClearHideDeclaration();

});
function GetDocTypeByCategory(DocCategory) {

    var docType = "";

    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetDocumentType",
        data: {
            DocCategoryId: DocCategory
        },
        dataType: "JSON",
        success: function (result) {
            if (result != null) {
                $("option").remove(".addOption");
                var List = '';
                $.each(result, function (i, obj) {
                    if (obj.Id == DocType) {
                        docType = obj.Name;
                        List += '<option class="addOption" selected value="' + obj.Id + '">' + obj.Name + '</option>';
                    }
                    else {
                        List += '<option class="addOption" value="' + obj.Id + '">' + obj.Name + '</option>';
                    }
                })
                $(".addOption").append(List);
                debugger
                if (DocCategory == "1" && docType.toLowerCase() == "fssai") {
                    $(".HideForCategory2").hide();
                }
            }
        },
        error: function () {
            alert("Error occured!!!");
        }
    });
}
$(document).on("click", "#Btn_ProductsSave", function () {

    if (isProductChanged == 0) {
        alert("There is no changes to save");
        return false;
    }

    $("#ApproveModal").modal('show');
    $("#ModalLabel").text("Save Confirmation");
    $(".modalmsg").html('Are you sure you want to save <b>Product Info</b> details?');
    $('#ByClick_OK').off('click').on('click', function () {
        const Remarks = $("#ApprovalRemarks").val().trim();

        if (!Remarks) {
            $("#E_ApprovalRemarks").show();
            return;
        }
        $(this).prop('disabled', true);
        InsertData("ProductSave", Remarks);
    });

});
async function InsertData(ClickedBtn, Remarks) {

    var formData = new FormData();
    switch (ClickedBtn != "") {
        case ClickedBtn == "Save":
            formData.append("Action", "Save");
            break;
        case ClickedBtn == "Submit":
            if (StatusId != '0' && ActionType == "1") {
                ClickedBtn = "EditSubmit";
                formData.append("Action", "EditSubmit");
            }
            else {
                formData.append("Action", "Submit");
            }
            formData.append("Remarks", Remarks);
            break;
        case ClickedBtn == "Renewal":
            formData.append("Action", "Renewal");
            formData.append("Remarks", Remarks);
            break;
        case ClickedBtn == "ProductSave":
            formData.append("Action", "ProductSave");
            formData.append("Remarks", Remarks);
            break;
    }
    var Productgroup = [];
    if (ClickedBtn == "ProductSave" || ClickedBtn == "EditSubmit") {
        Productgroup = gridData_new.filter(item => item.IsNew === true || item.IsEdited === true);
    }
    else {
        Productgroup = $("#ProductGroup_Grid").jqGrid("getGridParam", "data");
    }
    var RequestData = GetFiledValues();
    var DeclarationData = declarationFileGridArray;

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

ProductHistory = [
    {
        name: 'ProductGroupName',
        label: 'Product Name',
        width: 155,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'EffectiveFrom',
        label: 'Effective From',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProductDocName',
        label: 'Document Name',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Version',
        label: 'Version',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'IsProductActive',
        label: 'Status',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 60,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedBy',
        label: 'Action By',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedOn',
        label: 'Action On',
        width: 85,
        resizable: true,
        ignoreCase: true,
    },
];
function CreateProductGroupHistory(data) {

    $.jgrid.gridUnload('#ProductHistory_Grid');

    $("#ProductHistory_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: ProductHistory,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_ProductHistory',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#ProductHistory_Grid tbody tr");
            var objHeader = $("#ProductHistory_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#ProductHistory_Grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $("#ProductHistory_Grid").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 210px)' });
    $("#ProductHistory_Grid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $RemarksTableHeight = $("#remarks-grid").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($RemarksTableHeight > 130) {
        $("#ProductHistory_Grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#ProductHistory_Grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    } else {
        $("#ProductHistory_Grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#ProductHistory_Grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }
    $("#ProductHistory_Modal").modal('show');
}
$("#ProductGroupHistoryExcel").click(function () {
    var data = $('#ProductHistory_Grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#ProductHistory_Grid").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "ProductInfoHistory.xlsx",
            maxlength: 1000,
        });
    }
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

            $("#dec-file").siblings('span').addClass('hide');
            $('#dec-file').val('');
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
                UploadedOn: new Date(todayDate).toLocaleDateString("en-GB"),
                IsActive: 1,
                IsNew: 1
            });

            declarationFileArray.push({
                DocumentId: latestDecDocId,
                File: file
            });

            isChanged = 1;

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

    data = data.filter(item => item.IsActive == 1);

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
            declarationFileGridArray.forEach(function (obj) {
                if (obj.DocumentId == DocId) {
                    obj.IsActive = 0;
                }
                isChanged = 1;
            });

            createFileModalGrid(declarationFileGridArray);
        }
    )

}
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

function ClearHideDeclaration() {
    $("#dec-date").val('');
    $("#dec-file").val('');
    $(".dec-sub-div").addClass("hide");
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
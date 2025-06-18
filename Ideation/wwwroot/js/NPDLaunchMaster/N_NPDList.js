var editedNpdListData = [];
var gridDataArray = [];
var ErrorPreviewData = [];
var DivisionName = "";
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 70,
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {

            if (rowobject.StatusId == 2) {
                return `<div class="text-center">
                            <div>
                                <span class="edit-color -edit close_edit" ><i class="fas fa-pen" title="Edit"></i></span>
                            </div>
                            <div class="save_edit1">
                                <span class="view-color -view hidesave" onclick="onClickSaveInGridRowDuringReject(this)"><i class="fas fa-save" title="Save"></i></span>
                                <span class="btn-times -delete time_cross pl-1 hidecancel" onclick="onClickCloseInGridRowDuringReject(this)"><i class="fas fa-times-circle" title="Close"></i></span>
                            </div>
                        </div>`;
            }
            else {

                return '';
            }
        }
    },
    {
        name: 'MaterialCode',
        label: 'Material Code',
        resizable: true,
        ignoreCase: true,
        width: 100,
        classes: "MaterialCode"
    },
    {
        name: 'MaterialName',
        label: 'Material Name',
        resizable: true,
        ignoreCase: true,
        width: 250,
    },
    {
        name: 'CreatedDate',
        label: 'Material Created Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
        exportcol: false,
    },
    {
        name: 'MaterialCreatedDate',
        label: 'Material Created Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'ProductGroup',
        label: 'HGML Product Group',
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'HGMLSubCategory',
        label: 'HGML Sub Category',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HGMLCategory',
        label: 'HGML Category',
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'HGMLDivision',
        label: 'HGML Division',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },

    {
        name: 'HGMLFormulation',
        label: 'HGML Product Format',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BusinessLaunchYear',
        label: 'Business Launch Year',
        exportcol: true,
        search: true,
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'BusinessLaunchDate',
        label: 'Business Launch Date',
        resizable: true,
        ignoreCase: true,
        width: 140,
        exportcol: false,
        classes: "BusinessLaunchDate",
        sorttype: 'date',
        formatter: 'date',
        formatter: function (cellvalue, options, rowobject) {

            var index = editedNpdListData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var businessLaunchDateValue;

            if (index >= 0) {

                businessLaunchDateValue = editedNpdListData[index].BusinessLaunchDate;
            }
            else {

                businessLaunchDateValue = rowobject.BusinessLaunchDate;
            }

            if (rowobject.StatusId == 2) {
                return `<div class="text-left datepicker-container calender-icon">
                                <input type="text" onpaste="return false;" autocomplete = "off" class="form-control input_height save_edit data-datepicker BusinessLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `BusinessLaunchDate' value=" ` + businessLaunchDateValue + `" />
                                <span class="fas fa-calendar-alt input_height save_edit data-datepicker"></span>
                                <span class="value_close"> `+ rowobject.BusinessLaunchDate + `</span>
                            </div>`;
            }
            else {

                return businessLaunchDateValue;
            }
        }
    },
    {
        name: 'BusinessLaunchDate',
        label: 'Business Launch Date',
        hidden: true,
        exportcol: true,
        search: false,
        resizable: true,
        ignoreCase: true,
        width: 140,
    },
    {
        name: 'RandDLaunchDate',
        label: 'R&D Launch Date',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        width: 140,
        classes: "RandDLaunchDate",
        sorttype: 'date',
        formatter: function (cellvalue, options, rowobject) {

            var index = editedNpdListData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var rAndDLaunchDateValue;

            if (index >= 0) {

                rAndDLaunchDateValue = editedNpdListData[index].RandDLaunchDate;
            }
            else {

                rAndDLaunchDateValue = rowobject.RandDLaunchDate;
            }

            if (rowobject.StatusId == 2) {

                return `<div class="text-left datepicker-container calender-icon">
                            <input type="text" onpaste="return false;" autocomplete = "off" class="form-control input_height save_edit data-datepicker RandDLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `RandDLaunchDate' value=" ` + rAndDLaunchDateValue + `" />
                            <span class="fas fa-calendar-alt input_height save_edit data-datepicker"></span>
                            <span class="value_close"> `+ rowobject.RandDLaunchDate + `</span>
                        </div>`;
            }
            else {

                return rAndDLaunchDateValue;
            }
        }
    },
    {
        name: 'RandDLaunchDate',
        label: 'R&D Launch Date',
        hidden: true,
        exportcol: true,
        search: false,
        resizable: true,
        ignoreCase: true,
        width: 140,
    },
    {
        name: 'Source',
        label: 'Source',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },
    {
        name: 'IsNPD',
        label: 'Is NPD',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },

    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {

            if (rowobject.StatusId == 1) {
                return '<a <p class="text-warning">' + rowobject.Status + '</p></a>'
            }
            else if (rowobject.StatusId == 2) {
                return '<a <p class="text-success">' + rowobject.Status + '</p></a>'
            }
            else if (rowobject.StatusId == 3) {
                return '<a <p class="text-danger">' + rowobject.Status + '</p></a>'
            }
            else {
                return '<a <p class="text-danger"></p></a>'
            }
        }
    },
    {
        name: 'Status',
        label: 'Status',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'SubmittedToMyApprovalPendingBy',
        label: 'Submitted By',
        resizable: true,
        ignoreCase: true,
        exportcol: true,
    },
    {
        name: 'UpdatedBy',
        label: 'Hierarchy Updated By',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ApprovedOrRejectedBy',
        label: 'Approved / Rejected By',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'StatusId',
        label: 'StatusId',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'ApprovedOrRejectedOn',
        label: 'Approved / Rejected On',
        resizable: true,
        ignoreCase: true,
    },
]

$(document).ready(function () {

    var NPDLaunchMasterDetailsHeaderData = $.parseJSON($('#NPDLaunchMasterDetailsHeaderData').val());
    findDivisionCount(NPDLaunchMasterDetailsHeaderData);

    $("#SearchNpdLmData").click();

    $('.data-datepicker').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        autoclose: true
    });

    $('.date-datepicker-year').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
        autoclose: true
    });

    $('.multiselect').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        maxHeight: 300,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });

    $("#NPDlist_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: NPDLaunchMasterDetailsHeaderData,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_NPDlist_Grid',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#NPDlist_Grid tbody tr");
            var objHeader = $("#NPDlist_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            $(".save_edit1").hide();
            $(".save_edit").hide();

            $('.data-datepicker').datepicker({
                format: 'dd-mm-yyyy',
                todayHighlight: true,
                autoclose: true
            });

            $('[data-singleselect]').select2();
            $('.data-singleselect').select2();
        }
    });

    $("#NPDlist_Grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '48vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }

});

$("#ExcelDownload").click(function () {

    var data = $('#NPDlist_Grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        try {
            $('#NPDlist_Grid').jqGrid("exportToExcel", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "NPDList.xlsx",
                maxlength: 80,
                exportcol: true,

            });
        } catch (err) {
            alert(err);
        }
    }
});
$("#SearchNpdLmData").on("click", function () {
    $(".DivisionDetails li").find('.active').removeClass("active");
    $(".allDivisions").addClass("active");
    NPDListLoad(1);
});
$(document).on("click", ".time_cross", function () {
    var $parentRow = $(this).closest("tr");
    $parentRow.removeClass('show_edit');
    $parentRow.find(".close_edit, .value_close").show();
    $parentRow.find("select.save_edit").hide();
    $parentRow.find(".save_edit1").hide();
    $parentRow.find(".save_edit").hide();
});
$(document).on("click", ".close_edit", function () {
    var $parentRow = $(this).closest("tr");
    $parentRow.find(".save_edit1").show();
    $parentRow.find(".close_edit").hide();
    $parentRow.addClass('show_edit');
    $parentRow.find("select.save_edit").show();
    $parentRow.find(".save_edit").show();
    $parentRow.find(".value_close").hide();
});
$('body').on('change', '.BusinessLaunchDate, .RandDLaunchDate', function () {
    rowData = getRowDataInArray(this);

    var foundIndex = editedNpdListData.findIndex(x => x.MaterialCode.trim() === rowData.MaterialCode.trim());

    if (foundIndex !== -1) {
        editedNpdListData[foundIndex] = rowData;
    }
    else {
        editedNpdListData.push(rowData);
    }
});
$(document).on('keydown paste', '.BusinessLaunchDate', function (event) {
    event.preventDefault();
});
$(document).on('keydown paste', '.RandDLaunchDate', function (event) {
    event.preventDefault();
});
$("#refresh").click(function () {
    NPDListLoad("refresh");
});

function findDivisionCount(result) {

    var DivisionTotals = {};
    var allDivisionElements = $(".division-count");
    allDivisionElements.each(function () {
        $(this).text('0');
    });
    $.each(result, function (i, obj) {
        var Division = $.trim(obj.HGMLDivision).toLowerCase();
        if (DivisionTotals[Division] === undefined) {
            DivisionTotals[Division] = 1;
        } else {
            DivisionTotals[Division]++;
        }
    });
    var sum = 0;
    for (var Division in DivisionTotals) {
        if (Division != "") {
            var totalCountElement = $("#" + Division);
            if (totalCountElement.length > 0) {
                totalCountElement.text(parseInt(DivisionTotals[Division]).toLocaleString('en-IN'));
            }
        }
        sum = DivisionTotals[Division] + sum;
        $(".allDivisionTotal").text(parseInt(sum).toLocaleString('en-IN'));
    }

}
function getDivisiondetails(obj) {
    var type = obj.innerText.split(' ');
    var sanitizedDivision = type.map(function (word) {
        return word.replace(/[\d,]+/g, '');
    });
    DivisionName = $.trim(sanitizedDivision.join(' '));
    DivisionName = DivisionName == "All" ? "" : DivisionName;
    NPDListLoad('', DivisionName);
}
function getRowDataInArray(obj) {
    var materialCode = $.trim($(obj).closest('tr').find('td.MaterialCode').text());
    var businessLaunchDate = $.trim($(obj).closest('tr').find('td.BusinessLaunchDate input.BusinessLaunchDate').val()) != "" ? $.trim($(obj).closest('tr').find('td.BusinessLaunchDate input.BusinessLaunchDate').val()) : $.trim($(obj).closest('tr').find('td.BusinessLaunchDate').text());
    var rAndDLaunchDate = $.trim($(obj).closest('tr').find('td.RandDLaunchDate input.RandDLaunchDate').val()) != "" ? $.trim($(obj).closest('tr').find('td.RandDLaunchDate input.RandDLaunchDate').val()) : $.trim($(obj).closest('tr').find('td.RandDLaunchDate').text());

    var arrayitem = {

        MaterialCode: materialCode,
        BusinessLaunchDate: businessLaunchDate,
        RandDLaunchDate: rAndDLaunchDate,
    };
    return arrayitem;
}
function onClickCloseInGridRowDuringReject(obj) {

    var clossestTableRow = $(obj).closest("tr");

    var materialCode = $.trim($(obj).closest('tr').find('td.MaterialCode').text());

    editedNpdListData = editedNpdListData.filter(item => item.MaterialCode.trim() !== materialCode.trim());

    var initialRowData = NPDLaunchMasterDetailsHeaderData.filter(item => item.MaterialCode.trim() === materialCode.trim());
    $(clossestTableRow).find(".RandDLaunchDate").val(initialRowData[0].RandDLaunchDate);
    $(clossestTableRow).find(".BusinessLaunchDate").val(initialRowData[0].BusinessLaunchDate);
}
function onClickSaveInGridRowDuringReject(obj) {

    var npdListData = [];
    var rowData = getRowDataInArray(obj);
    npdListData.push(rowData);

    var materialCode = rowData.MaterialCode;
    var materialCodesToSave = [];

    if (npdListData.length != 0) {
        npdListData.forEach(function (obj) {

            materialCodesToSave.push(obj.MaterialCode);
        });

        var materialCodesToSaveInStringFormat = materialCodesToSave.join(", ");
        const confirmationMessage = `Are you sure you want to save the details?`;
        confirm(confirmationMessage, function () {

            $('#NpdListData').val(JSON.stringify(rowData));
            $('#NPDList_Submit').submit();
        });
    }
}
function NPDListLoad(flag, DivisionName) {

    if (flag == "refresh") {
        $(".DivisionDetails li").find('.active').removeClass("active");
        $(".allDivisions").addClass("active");
        $("#NpdHgmlCategory").val("").select2();
        $("#NpdHgmlProductGroup").val("").select2();
        $("#NpdHgmlFormulation").val("").select2();
        $("#NpdHgmlSource").val("").select2();
    }
    var division = DivisionName;
    var category = $("#NpdHgmlCategory").val();
    var productGroup = $("#NpdHgmlProductGroup").val();
    var formulation = $("#NpdHgmlFormulation").val();
    var source = $("#NpdHgmlSource").val();

    $.ajax({
        type: "POST",
        url: ROOT + "NPDLaunchMaster/NPDLaunchMasterHeaderData",
        data: {
            division: division,
            category: category,
            productGroup: productGroup,
            formulation: formulation,
            source: source
        },
        success: function (result) {
            var result_json = JSON.parse(result);
            if (flag == 1) {
                findDivisionCount(result_json);
            }
            $("#NPDlist_Grid").jqGrid("clearGridData");
            $("#NPDlist_Grid").jqGrid('setGridParam', { data: result_json });
            $("#NPDlist_Grid").trigger('reloadGrid', [{ page: 1 }]);
        },
        error: function () {
            alert("Error occured!!");
        }
    });

}
$(document).on("click", "#temp_exceldownload", function () {

    var category = $("#NpdHgmlCategory").val();
    var productGroup = $("#NpdHgmlProductGroup").val();
    var formulation = $("#NpdHgmlFormulation").val();
    var source = $("#NpdHgmlSource").val();

    var data = $('#NPDlist_Grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
        return
    }
    window.location.href = ROOT + "NPDLaunchMaster/GetNPDLMListExcel?q=" + "&division=" + DivisionName + "&category=" + category + "&productGroup=" + productGroup + "&formulation=" + formulation + "&source=" + source;
})
$("#Excel_file").on("change", function () {
    var file = $(this).val();
    (file == "") ? $("#E_Excel_file").removeClass('hide') : $("#E_Excel_file").addClass('hide');
})
$('#Excel-Upload-File').click(function () {
    var file = $('#Excel_file').val()
    if (file == "") {
        $("#E_Excel_file").removeClass('hide');
        return false;
    }
    confirm("Are you sure want to save the details?", function () {
        var selectedFile = document.getElementById('Excel_file');
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

        var fileExtension = ['xls', 'xlsx'];
        if ($.inArray($("#Excel_file").val().split('.').pop().toLowerCase(), fileExtension) === -1) {
            alert("Please upload a valid Excel file.");
            $('#Excel_file').val("");
            return false;
        }
        else {

            var formData = new FormData();
            var files = $('#Excel_file').get(0).files;
            if (files.length > 0) {
                formData.append("file", files[0]);
            }

            if ($('#Excel_file').val() !== "") {
                $.ajax({
                    url: ROOT + 'NPDLaunchMaster/NPDLMExcelUpload',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if (result === "Invalid File") {
                            alert("Please select valid file");
                            $('#Excel_file').val("");
                            return false;
                        }
                        else if (result == '') {

                            $('#Excel_file').empty();
                            $('#Excel_file').val("");
                            alert("please upload valid Excel File");
                            return false;
                        }
                        else {
                            $('#Excel_file').empty();
                            $('#Excel_file').val("");
                            $("#save-btn").prop('disabled', false);
                            ShowUploadedExcelData(result);
                        }
                    },
                    error: function (result) {
                        alert(result);
                    }
                });
            }
            else {
                $('.fileerror').text("Please Upload EXCEL files");
            }
        }
    })
});

colmodels_e = [
    {
        name: 'MaterialCode',
        label: 'Material Code',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'MaterialName',
        label: 'Material Name',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'MaterialCreatedDate',
        label: 'Material Created Date',
        width: 50,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Source',
        label: 'Source',
        width: 35,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProductGroup',
        label: 'HGML Product Group',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HGMLSubCategory',
        label: 'HGML Sub Category',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HGMLCategory',
        label: 'HGML Category',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HGMLDivision',
        label: 'HGML Division',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HGMLFormulation',
        label: 'HGML Product Format',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },

    //{
    //    name: 'IsNPD',
    //    label: 'IsNPD',
    //    width: 30,
    //    resizable: true,
    //    ignoreCase: true,
    //},
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 200,
        resizable: true,
        ignoreCase: true,
        classes: "color-red"
    },
]
var ExcelDataToSave = [];
function ShowUploadedExcelData(data) {
    $("#SearchNpdLmData").click();
    showAlertMessage(data.Message);
    if (data.NPDDetails.length == 0) {
        return false;
    }
    ErrorPreviewData = data.NPDDetails;
    CreatePreviewGrid(ErrorPreviewData);
}

function CreatePreviewGrid(data) {
    $("#ExcelUpload_Modal").modal('show');
    $.jgrid.gridUnload('#Show_InvalidData');
    $("#Show_InvalidData").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels_e,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_Show_InvalidData',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#Show_InvalidData tbody tr");
            var objHeader = $("#Show_InvalidData tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#Show_InvalidData").jqGrid('filterToolbar', {
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

$(document).on("click", "#Error_Preview", function () {
    if (ErrorPreviewData.length == 0) {
        alert("There is no data")
        return false
    }
    CreatePreviewGrid(ErrorPreviewData)
})
$(document).on("click", "#Error_exceldownload", function () {
    var data = $("#Show_InvalidData").jqGrid("getGridParam", "data");
    var errorData = JSON.stringify(data);
    // Create a hidden form and submit it
    var form = document.createElement("form");
    form.method = "POST";
    form.action = ROOT + "NPDLaunchMaster/GetErrorFileDownload";

    var input1 = document.createElement("input");
    input1.type = "hidden";
    input1.name = "ErrorData";
    input1.value = errorData;
    form.appendChild(input1);

    var input2 = document.createElement("input");
    input2.type = "hidden";
    input2.name = "Country";
    input2.value = "HGML";
    form.appendChild(input2);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
});


function showAlertMessage(message) {
    var mes = message.split(',');
    $('#alertText').text(mes[0]);
    $('#alertMessage').removeClass().addClass('alert ' + mes[1]);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 8000);
}
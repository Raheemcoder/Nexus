
var NPDLaunchMasterDetailsHeaderData = $.parseJSON($('#NPDLaunchMasterDetailsHeaderData').val());
var editedNpdListData = [];

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
                                <span class="btn-icon -edit close_edit" ><i class="fas fa-edit" title="Edit"></i></span>
                            </div>
                            <div class="save_edit1">
                                <span class="btn-icon -view" onclick="onClickSaveInGridRowDuringReject(this)"><i class="fas fa-save" title="Save"></i></span>
                                <span class="btn-icon -delete time_cross" onclick="onClickCloseInGridRowDuringReject(this)"><i class="fas fa-times" title="Close"></i></span>
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
        width: 200,
    },
    {
        name: 'CreatedDate',
        label: 'Material Created Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
        sorttype: 'date',
        formatter: 'date',
        exportcol: false,
        formatoptions: { newformat: 'd-m-Y' }
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
        //formatoptions: { newformat: 'd/m/Y' },
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

                //if (businessLaunchDateValue == "" || businessLaunchDateValue == null || businessLaunchDateValue == undefined) {

                //    return `<div class="text-left datepicker-container">
                //        <input type="text" onpaste="return false;" class="form-control input_height data-datepicker BusinessLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `BusinessLaunchDate'/>
                //        <span class="datepicker-symbol"></span>
                //        </div>`;
                //} else {

                return `<div class="text-left datepicker-container">
                                <input type="text" onpaste="return false;" class="form-control input_height save_edit data-datepicker BusinessLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `BusinessLaunchDate' value=" ` + businessLaunchDateValue + `" />
                                <span class="datepicker-symbol save_edit"></span>
                                <span class="value_close"> `+ rowobject.BusinessLaunchDate + `</span>
                            </div>`;
                //}
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
        //formatter: 'date',
        //formatoptions: { newformat: 'd/m/Y' },
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

                //if (rAndDLaunchDateValue == "" || rAndDLaunchDateValue == null || rAndDLaunchDateValue == undefined) {

                //    return `<div class="text-left datepicker-container">
                //    <input type="text" onpaste="return false;" class="form-control input_height data-datepicker RandDLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `RandDLaunchDate'/>
                //    <span class="datepicker-symbol"></span>
                //    </div>`;
                //}
                //else {

                return `<div class="text-left datepicker-container">
                            <input type="text" onpaste="return false;" class="form-control input_height save_edit data-datepicker RandDLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `RandDLaunchDate' value=" ` + rAndDLaunchDateValue + `" />
                            <span class="datepicker-symbol save_edit"></span>
                            <span class="value_close"> `+ rowobject.RandDLaunchDate + `</span>
                        </div>`;
                //}
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
            debugger
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
        label: 'Updated By',
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
        // sorttype: 'date',
        //formatter: 'date',
        //formatoptions: { newformat: 'd-m-Y' }
    },
],

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

            $('.data-datepicker').datepicker({
                format: 'dd-mm-yyyy',
                todayHighlight: true,
                autoclose: true
            });
        }
    });

$.ajax({
    type: "POST",
    datatype: 'json',
    url: ROOT + "NPDLaunchMaster/NPDLaunchMasterHeaderData",
    data: { division: '', category: '', productGroup: '', formulation: '', source: '' },
    success: function (result) {

        var result_json = JSON.parse(result);
        $("#NPDlist_Grid").jqGrid("clearGridData");
        $("#NPDlist_Grid").jqGrid('setGridParam', { data: result_json });
        $("#NPDlist_Grid").trigger('reloadGrid', [{ page: 1 }]);

        $('.data-datepicker').datepicker({
            format: 'dd-mm-yyyy',
            todayHighlight: true,
            autoclose: true
        });

    },
    error: function () {

        alert("Error occured!!");
    }
});

$("#NPDlist_Grid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
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

setTimeout(function () {
    $('#message_alert').fadeOut('slow');
}, 5000);

$('.multiselect').multiselect({
    includeSelectAllOption: true,
    buttonWidth: 220,
    maxHeight: 300,
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
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
    NPDListLoad();
});

function NPDListLoad() {
    debugger
    var division = $("#NpdHmlDivision").val();
    var category = $("#NpdHgmlCategory").val();
    var productGroup = $("#NpdHgmlProductGroup").val();
    var formulation = $("#NpdHgmlFormulation").val();
    var source = $("#NpdHgmlSource").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NPDLaunchMaster/NPDLaunchMasterHeaderData",
        data: { division: division, category: category, productGroup: productGroup, formulation: formulation, source: source },
        success: function (result) {
            var result_json = JSON.parse(result);
            $("#NPDlist_Grid").jqGrid("clearGridData");
            $("#NPDlist_Grid").jqGrid('setGridParam', { data: result_json });
            $("#NPDlist_Grid").trigger('reloadGrid', [{ page: 1 }]);
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

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
    $parentRow.addClass('show_edit');
    $parentRow.find("select.save_edit").show();
    $parentRow.find(".value_close").hide();
});


$('body').on('change', '.BusinessLaunchDate, .RandDLaunchDate', function () {
    debugger
    rowData = getRowDataInArray(this);

    var foundIndex = editedNpdListData.findIndex(x => x.MaterialCode.trim() === rowData.MaterialCode.trim());

    if (foundIndex !== -1) {
        editedNpdListData[foundIndex] = rowData;
    }
    else {
        editedNpdListData.push(rowData);
    }
});
function getRowDataInArray(obj) {
    debugger
    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#NPDlist_Grid');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    //var materialCode = grd.jqGrid('getCell', rowid, 'MaterialCode');
    //var businessLaunchDate = $(clossestTableRow).children().find(".BusinessLaunchDate").val() != undefined ? $(clossestTableRow).children().find(".BusinessLaunchDate").val() : grd.jqGrid('getCell', rowid, 'BusinessLaunchDate');
    //var rAndDLaunchDate = $(clossestTableRow).children().find(".RandDLaunchDate").val() != undefined ? $(clossestTableRow).children().find(".RandDLaunchDate").val() : grd.jqGrid('getCell', rowid, 'RandDLaunchDate');

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
    var grd = $('#NPDlist_Grid');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    var materialCode = $.trim($(obj).closest('tr').find('td.MaterialCode').text());

    editedNpdListData = editedNpdListData.filter(item => item.MaterialCode.trim() !== materialCode.trim());

    var initialRowData = NPDLaunchMasterDetailsHeaderData.filter(item => item.MaterialCode.trim() === materialCode.trim());
    $(clossestTableRow).find(".RandDLaunchDate").val(initialRowData[0].RandDLaunchDate);
    $(clossestTableRow).find(".BusinessLaunchDate").val(initialRowData[0].BusinessLaunchDate);
}

$(document).on('keydown paste', '.BusinessLaunchDate', function (event) {
    event.preventDefault();
});
$(document).on('keydown paste', '.RandDLaunchDate', function (event) {
    event.preventDefault();
});


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

$('[data-singleselect]').select2();
$('.data-singleselect').select2();

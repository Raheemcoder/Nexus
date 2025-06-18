debugger

var gridData = [];
var launchInfoInitialData = [];

//var productLaunchInformationData = $.parseJSON($('#ProductLaunchInformationData').val());
var isNpdList = $.parseJSON($('#IsNpdList_Serialized').val());
var sourceList = $.parseJSON($('#SourceString').val());

var sourceOption = "";
var isNpdOption = "";

$(document).ready(function () {

    for (var i = 0; i < sourceList.length; i++) {

        sourceOption += `<option value="` + sourceList[i].SourceName + `" >` + sourceList[i].SourceName + `</option>`
    }
    for (var i = 0; i < isNpdList.length; i++) {

        isNpdOption += '<option  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
    }

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

                if (rowobject.StatusId == 3) {

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
            classes: 'MaterialCode'
        },
        {
            name: 'MaterialName',
            label: 'Material Name',
            resizable: true,
            ignoreCase: true,
            width: 200,
            classes: 'MaterialName'
        },
        {
            name: 'CreatedDate',
            label: 'Material Created Date',
            resizable: true,
            ignoreCase: true,
            width: 100,
            classes: 'CreatedDate',
            sorttype: 'date',
            formatter: 'date',
            formatoptions: { newformat: 'd-m-Y' },
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
            name: 'HGMLCategory',
            label: 'HGML Category',
            resizable: true,
            ignoreCase: true,
            width: 140,
            // hidden: true,
            exportcol: true,
            classes: "HGMLCategory"
        },
        {
            name: 'HGMLDivision',
            label: 'HGML Division',
            resizable: true,
            ignoreCase: true,
            width: 120,
            //hidden: true,
            exportcol: true,
            classes: "HGMLDivision"
        },

        {
            name: 'BusinessLaunchDate',
            label: 'Business Launch Date',
            resizable: true,
            ignoreCase: true,
            width: 130,
            exportcol: false,
            classes: "BusinessLaunchDate",
            formatter: function (cellvalue, options, rowobject) {
                debugger
                var index = editedProductLaunchInfoData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
                var businessLaunchDateValue;

                if (index >= 0) {

                    businessLaunchDateValue = editedProductLaunchInfoData[index].BusinessLaunchDate;
                }
                else {

                    businessLaunchDateValue = rowobject.BusinessLaunchDate;
                }

                if (rowobject.StatusId != 3) {

                    if (businessLaunchDateValue == "" || businessLaunchDateValue == null || businessLaunchDateValue == undefined) {

                        return `<div class="text-left datepicker-container">
                        <input type="text" onpaste="return false;" class="form-control input_height data-datepicker BusinessLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `BusinessLaunchDate'/>
                        <span class="datepicker-symbol"></span>
                        </div>`;
                    }
                    else if (businessLaunchDateValue != rowobject.BusinessLaunchDate) {

                        return `<div class="text-left datepicker-container">
                        <input type="text" onpaste="return false;" value="`+ businessLaunchDateValue + `" class="form-control input_height data-datepicker BusinessLaunchDate datepicker-input" id='` + rowobject.MaterialCode + `BusinessLaunchDate'/>
                        <span class="datepicker-symbol"></span>
                        </div>`;

                    }
                    else {

                        return businessLaunchDateValue;
                    }
                }
                else {
                    if (businessLaunchDateValue == "" || businessLaunchDateValue == null || businessLaunchDateValue == undefined) {

                        return `<div class="text-left datepicker-container">
                        <input type="text" onpaste="return false;" class="form-control input_height data-datepicker BusinessLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `BusinessLaunchDate'/>
                        <span class="datepicker-symbol"></span>
                        </div>`;
                    } else {

                        return `<div class="text-left datepicker-container">
                                <input type="text" onpaste="return false;" class="form-control input_height save_edit data-datepicker BusinessLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `BusinessLaunchDate' value=" ` + businessLaunchDateValue + `" />
                                <span class="datepicker-symbol save_edit"></span>
                                <span class="value_close"> `+ rowobject.BusinessLaunchDate + `</span>
                            </div>`;
                    }
                }
            }
        },
        {
            name: 'RandDLaunchDate',
            label: 'R&D Launch Date',
            resizable: true,
            ignoreCase: true,
            exportcol: false,
            width: 130,
            classes: "RandDLaunchDate",
            formatter: function (cellvalue, options, rowobject) {

                var index = editedProductLaunchInfoData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
                var rAndDLaunchDateValue;

                if (index >= 0) {

                    rAndDLaunchDateValue = editedProductLaunchInfoData[index].RandDLaunchDate;
                }
                else {

                    rAndDLaunchDateValue = rowobject.RandDLaunchDate;
                }

                if (rowobject.StatusId != 3) {
                    if (rAndDLaunchDateValue == "" || rAndDLaunchDateValue == null || rAndDLaunchDateValue == undefined) {

                        return `<div class="text-left datepicker-container">
                    <input type="text" onpaste="return false;" class="form-control input_height data-datepicker RandDLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `RandDLaunchDate'/>
                    <span class="datepicker-symbol"></span>
                    </div>`;
                    }
                    else if (rAndDLaunchDateValue != rowobject.RandDLaunchDate) {

                        return `<div class="text-left datepicker-container">
                    <input type="text" value="`+ rAndDLaunchDateValue + `" onpaste="return false;" class="form-control input_height data-datepicker RandDLaunchDate datepicker-input" id='` + rowobject.MaterialCode + `RandDLaunchDate'/>
                    <span class="datepicker-symbol"></span>
                    </div>`;
                    }
                    else {

                        return rAndDLaunchDateValue;
                    }
                }
                else {

                    if (rAndDLaunchDateValue == "" || rAndDLaunchDateValue == null || rAndDLaunchDateValue == undefined) {
                        return `<div class="text-left datepicker-container">
                    <input type="text" onpaste="return false;" class="form-control input_height data-datepicker RandDLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `RandDLaunchDate'/>
                    <span class="datepicker-symbol"></span>
                    </div>`;
                    }
                    else {
                        return `<div class="text-left datepicker-container">
                            <input type="text" onpaste="return false;" class="form-control input_height save_edit data-datepicker RandDLaunchDate datepicker-input" id='`+ rowobject.MaterialCode + `RandDLaunchDate' value=" ` + rAndDLaunchDateValue + `" />
                            <span class="datepicker-symbol save_edit"></span>
                            <span class="value_close"> `+ rowobject.RandDLaunchDate + `</span>
                        </div>`;
                    }
                }
            }
        },
        {
            name: 'Source',
            label: 'Source',
            resizable: true,
            ignoreCase: true,
            width: 120,
            exportcol: false,
            classes: 'Source',

        },
        {
            name: 'IsNPD',
            label: 'Is NPD',
            resizable: true,
            ignoreCase: true,
            width: 120,
            exportcol: false,
            classes: 'IsNPDValue1',
            cellattr: function (rowId, value, rawObject, cm, rdata) {
                return 'title=""';
            },
            formatter: function (cellvalue, options, rowobject) {

                //var rowid = options.rowId;
                //$(options.gid).find('tr#' + rowid).addClass('show_edit');
                //$(options.gid).find('tr#' + rowid).siblings().removeClass('show_edit');
                //$(options.gid).find("select.save_edit").show();
                //$(options.gid).find(".value_close").hide();

                var index = editedProductLaunchInfoData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
                var isNpdValue;

                if (index >= 0) {

                    if (editedProductLaunchInfoData[index].IsNPD == '1') {
                        isNpdValue = 'Yes';
                    }
                    else if (editedProductLaunchInfoData[index].IsNPD == '0') {
                        isNpdValue = 'No';
                    } else {
                        isNpdValue = editedProductLaunchInfoData[index].IsNPD;
                    }
                }
                else {
                    isNpdValue = rowobject.IsNPD;
                }

                if (rowobject.StatusId != 3) {

                    if (isNpdValue == "" || isNpdValue == null || isNpdValue == undefined) {
                        var isNpd = "";

                        return `<div class="text-left IsNpdOption">
                               <select class="form-control appearence IsNPD" id='`+ rowobject.MaterialCode + `IsNPD'>
                                    <option value="">Select</option>`+ isNpdOption +
                            `</select>
                        </div>`;

                    }
                    else {

                        var isNpd = "";

                        for (var i = 0; i < isNpdList.length; i++) {

                            if (isNpdValue == isNpdList[i].Text) {

                                isNpd += '<option selected  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
                            } else {

                                isNpd += '<option  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
                            }
                        }

                        return `<div class="text-left IsNpdOption">
                               <select class="form-control appearence IsNPD ${isNpdValue === rowobject.IsNPD ? 'save_edit' : ''}" id='` + rowobject.MaterialCode + `IsNPD'>
                                    <option value="">Select</option>`+ isNpd +
                            `</select>
                            ${isNpdValue === rowobject.IsNPD ? '<span class="value_close">' + isNpdValue + '</span>' : ''}
                        </div>`;
                    }
                }
                else {

                    if (isNpdValue == "" || isNpdValue == null || isNpdValue == undefined) {

                        return `<div class="text-left IsNpdOption">
                               <select class="form-control appearence IsNPD" id='`+ rowobject.MaterialCode + `IsNPD'>
                                    <option value="">Select</option>`+ isNpdOption +
                            `</select>
                        </div>`;
                    }
                    else {

                        var isNpd = "";
                        for (var i = 0; i < isNpdList.length; i++) {

                            if (isNpdValue == isNpdList[i].Text) {
                                isNpd += '<option selected  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
                            } else {
                                isNpd += '<option  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
                            }
                        }

                        return `<div class="text-left IsNpdOption">
                               <select class="form-control save_edit appearence IsNPD" id='` + rowobject.MaterialCode + `IsNPD'>
                                    <option value="">Select</option>`+ isNpd +
                            `</select>
                               <span class="value_close">` + rowobject.IsNPD + `</span>
                        </div>`;
                    }
                }
            }
        },
        {
            name: 'StatusName',
            label: 'Status',
            resizable: true,
            ignoreCase: true,
            exportcol: false,
            classes: "StatusName",
            formatter: function (cellvalue, options, rowobject) {

                if (rowobject.StatusId == 1) {
                    return '<a <p class="text-warning">' + rowobject.StatusName + '</p></a>'
                }
                else if (rowobject.StatusId == 2) {
                    return '<a <p class="text-success">' + rowobject.StatusName + '</p></a>'
                }
                else if (rowobject.StatusId == 3) {
                    return '<a <p class="text-danger">' + rowobject.StatusName + '</p></a>'
                }
                else {
                    return '<a <p class=""></p></a>'
                }
            }
        },
        {
            name: 'StatusId',
            label: 'Status',
            resizable: true,
            ignoreCase: true,
            hidden: true,
            classes: "StatusId"
        },

        {
            name: 'BusinessLaunchDate',
            label: 'Business Launch Date',
            resizable: true,
            ignoreCase: true,
            width: 120,
            hidden: true,
            exportcol: true,
            classes: "BusinessLaunchDate"
        },
        {
            name: 'RandDLaunchDate',
            label: 'R&D Launch Date',
            resizable: true,
            ignoreCase: true,
            width: 120,
            hidden: true,
            exportcol: true,
            classes: "RandDLaunchDate"
        },
        {
            name: 'Source',
            label: 'Source',
            resizable: true,
            ignoreCase: true,
            width: 120,
            hidden: true,
            exportcol: true,
        },
        {
            name: 'IsNPD',
            label: 'IsNPD',
            resizable: true,
            ignoreCase: true,
            width: 120,
            hidden: true,
            exportcol: true,
            classes: "IsNPDValue2"
        },
        {
            name: 'StatusName',
            label: 'Status',
            resizable: true,
            ignoreCase: true,
            hidden: true,
            exportcol: true,
            classes: "StatusName"
        },
        {
            name: 'Remarks',
            label: 'Remarks',
            resizable: true,
            ignoreCase: true,
            classes: "Remarks"
        },
        {
            name: 'UpdatedBy',
            label: 'Updated by',
            resizable: true,
            ignoreCase: true,
            classes: "UpdatedBy"
        },
        {
            name: 'ApprovedOrRejectedBy',
            label: 'Approved /Rejected by',
            resizable: true,
            ignoreCase: true,
            classes: "ApprovedOrRejectedBy"
        },
        {
            name: 'HGMLSubCategory',
            label: 'HGML SubCategory',
            resizable: true,
            ignoreCase: true,
            width: 100,
            hidden: true,
            classes: "HGMLSubCategory"
        },
        {
            name: 'ProductGroup',
            label: 'Product Group',
            resizable: true,
            ignoreCase: true,
            width: 100,
            hidden: true,
            classes: "ProductGroup"
        },
        {
            name: 'HGMLFormulation',
            label: 'HGML Formulation',
            resizable: true,
            ignoreCase: true,
            width: 100,
            hidden: true,
            classes: "HGMLFormulation"
        },
        {
            name: 'IsProductHierarchyFilled',
            label: 'Is Product Hierarchy Data Filled',
            resizable: true,
            ignoreCase: true,
            width: 100,
            hidden: true,
            classes: "IsProductHierarchyFilled"
        },
    ],

        $("#ProductLaunchInfo_Grid").jqGrid({

            //url: ROOT + "NPDLaunchMaster/OnSearchProductLaunchInformation?q=" + Encrypt("npdLaunchYearType='All'&npdLaunchYear=''"),
            url: '',
            mtype: 'GET',
            datatype: 'local',
            data: [],
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            rowNum: 20,
            scroll: true,
            pager: "pager_ProductLaunchInfo_Grid",
            rownumbers: false,
            rowattr: function (rowData) {
                if (rowData.IsProductHierarchyFilled == '0') {
                    return {
                        "style": "outline: 1.5px solid #FF0000;"
                        //"style": "background: red;"
                        //"class": "highlight-row"
                    };
                }
            },
            gridComplete: function () {

                var objRows = $("#ProductLaunchInfo_Grid tbody tr");
                var objHeader = $("#ProductLaunchInfo_Grid tbody tr td");

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

                $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
                $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
                var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
                if ($TableHeight > 330) {
                    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
                }
                else {
                    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");
                }
            }
        });

    $("#ProductLaunchInfo_Grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });


    $.ajax({
        type: "POST",
        datatype: 'json',
        url: ROOT + "NPDLaunchMaster/OnSearchProductLaunchInformation",
        data: { npdLaunchYearType: "All", npdLaunchYear: "" },
        success: function (result) {

            launchInfoInitialData = result;

            $("#ProductLaunchInfo_Grid").jqGrid("clearGridData");
            $("#ProductLaunchInfo_Grid").jqGrid('setGridParam', { data: launchInfoInitialData });
            $("#ProductLaunchInfo_Grid").trigger('reloadGrid', [{ page: 1 }]);

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
});


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

$(".year_dropdown").css("display", "none");
$("input[name='chkPinNo']").click(function () {
    if ($("#chkNo").is(":checked")) {
        $(".year_dropdown").css("display", "block");
    } else if ($("#chkYes").is(":checked")) {
        $(".year_dropdown").css("display", "block");
    } else if ($("#chkAll").is(":checked")) {
        $(".year_dropdown").css("display", "none");
    }
});

setTimeout(function () {
    $('#message_alert').fadeOut('slow');
}, 5000);


//$('#ProductLaunchInfo_Grid tr td:nth-child(1)').click(function () {

//    $('#ProductLaunchInfo_Grid tr').removeClass('active');
//    $(this).parent().addClass('show_edit').siblings().removeClass('show_edit');
//});


$(document).on("click", ".close_edit", function () {

    var $parentRow = $(this).closest("tr");
    //$parentRow.addClass('show_edit').siblings().removeClass('show_edit');
    $parentRow.addClass('show_edit');
    $parentRow.find("select.save_edit").show();
    $parentRow.find(".value_close").hide();
});

$(document).on("click", ".time_cross", function () {

    var $parentRow = $(this).closest("tr");
    //$parentRow.removeClass('show_edit').siblings().removeClass('show_edit');
    $parentRow.removeClass('show_edit');
    $parentRow.find(".close_edit, .value_close").show();
    $parentRow.find("select.save_edit").hide();
    $parentRow.find(".save_edit1").hide();
    $parentRow.find(".save_edit").hide();
});
//$(".close_edit").click(function () {

//    $('#ProductLaunchInfo_Grid tr td:nth-child(1)').click(function () {

//        $(this).parent().addClass('show_edit').siblings().removeClass('show_edit');
//    });
//    $(".show_edit select.save_edit").show();
//    $(".value_close").hide();
//});

//$(".time_cross").click(function () {

//    $('#ProductLaunchInfo_Grid tr td:nth-child(1)').click(function () {

//        $(this).parent().removeClass('show_edit').siblings().removeClass('show_edit');
//    });

//    $(".close_edit, .value_close").show();
//    $(".value_close").show();
//    $(".show_edit select.save_edit").hide();
//    $(".save_edit1").hide();
//    $(".save_edit").hide();
//});

$('.multiselect').multiselect({
    includeSelectAllOption: true,
    buttonWidth: 220,
    maxHeight: 300,
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});
$(document).ready(function () {

    $('.NpdLaunchYear').hide();
    $('#NpdLaunchYearType').on('change', function () {

        $("#NpdLaunchYear").val('');
        if (this.value == 'Business Launch Year') {
            $(".NpdLaunchYear").show();
        }
        else if (this.value == 'R&D Launch Year') {
            $(".NpdLaunchYear").show();
        }
        else {
            $(".NpdLaunchYear").hide();
        }
    });
});

$("#ExcelDownload").click(function () {

    var grid = $('#ProductLaunchInfo_Grid');
    /*  grid.hideCol('Source');*/
    var data = $('#ProductLaunchInfo_Grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        try {

            $('#ProductLaunchInfo_Grid').jqGrid("exportToExcel", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "ProductLaunchInfo.xlsx",
                maxlength: 80,
                exportcol: true,

            });
        } catch (err) {
            alert(err);
        }
        /*  grid.showCol('Source');*/
    }
});


$('#onClickSearch').click(function () {

    var division = $("#NpdHmlDivision").val();
    var category = $("#NpdHgmlCategory").val().toString();
    var npdLaunchYearType = $("#NpdLaunchYearType").val();
    var npdLaunchYear = $("#NpdLaunchYear").val();
    var status = $("#Status").val();

    if (NpdLaunchYearType == 'All') {
        npdLaunchYear = '';
    }

    $.ajax({
        type: "POST",
        url: ROOT + "NPDLaunchMaster/OnSearchProductLaunchInformation",
        data: { division: division, category: category, npdLaunchYearType: npdLaunchYearType, npdLaunchYear: npdLaunchYear, status: status },
        success: function (result) {
            launchInfoInitialData = result;

            $("#ProductLaunchInfo_Grid").jqGrid("clearGridData");
            $("#ProductLaunchInfo_Grid").jqGrid('setGridParam', { data: launchInfoInitialData });
            $("#ProductLaunchInfo_Grid").trigger('reloadGrid', [{ page: 1 }]);

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
});

var editedProductLaunchInfoData = [];

$('body').on('change', '.IsNPD, .BusinessLaunchDate, .RandDLaunchDate, .Source', function () {

    rowData = getRowDataInArray(this);

    var foundIndex = editedProductLaunchInfoData.findIndex(x => x.MaterialCode === rowData.MaterialCode);

    if (foundIndex !== -1) {
        editedProductLaunchInfoData[foundIndex] = rowData;
    }
    else {
        editedProductLaunchInfoData.push(rowData);
    }
});

function getRowDataInArray(obj) {

    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#ProductLaunchInfo_Grid');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    var materialCode = $.trim($(obj).closest('tr').find('td.MaterialCode').text());
    var materialName = $.trim($(obj).closest('tr').find('td.MaterialName').text());
    var createdDate = $.trim($(obj).closest('tr').find('td.CreatedDate').text());
    var source = $.trim($(obj).closest('tr').find('td.Source').text());
    //var isNPD = $.trim($(obj).closest('tr').find('td.IsNPDValue1 select.IsNPD').val()) != "" ? $.trim($(obj).closest('tr').find('td.IsNPDValue1 select.IsNPD').val()) : $.trim($(obj).closest('tr').find('td.IsNPDValue2').text());
    var isNPD = $.trim($(obj).closest('tr').find('td.IsNPDValue1 select.IsNPD').val());
    var businessLaunchDate = $.trim($(obj).closest('tr').find('td.BusinessLaunchDate input.BusinessLaunchDate').val()) != "" ? $.trim($(obj).closest('tr').find('td.BusinessLaunchDate input.BusinessLaunchDate').val()) : $.trim($(obj).closest('tr').find('td.BusinessLaunchDate').text());
    var rAndDLaunchDate = $.trim($(obj).closest('tr').find('td.RandDLaunchDate input.RandDLaunchDate').val()) != "" ? $.trim($(obj).closest('tr').find('td.RandDLaunchDate input.RandDLaunchDate').val()) : $.trim($(obj).closest('tr').find('td.RandDLaunchDate').text());
    var statusId = $.trim($(obj).closest('tr').find('td.StatusId').text());
    var remarks = $.trim($(obj).closest('tr').find('td.Remarks').text());
    var updatedBy = $.trim($(obj).closest('tr').find('td.UpdatedBy').text());
    var approvedOrRejectedBy = $.trim($(obj).closest('tr').find('td.ApprovedOrRejectedBy').text());

    var HGMLCategory = $.trim($(obj).closest('tr').find('td.HGMLCategory').text());
    var HGMLSubCategory = $.trim($(obj).closest('tr').find('td.HGMLSubCategory').text());
    var productGroup = $.trim($(obj).closest('tr').find('td.ProductGroup').text());
    var HGMLDivision = $.trim($(obj).closest('tr').find('td.HGMLDivision').text());
    var HGMLFormulation = $.trim($(obj).closest('tr').find('td.HGMLFormulation').text());
    var isProductHierarchyFilled = $.trim($(obj).closest('tr').find('td.IsProductHierarchyFilled').text());

    var arrayitem = {

        MaterialCode: materialCode,
        MaterialName: materialName,
        CreatedDate: createdDate,
        Source: source,
        IsNPD: isNPD,
        BusinessLaunchDate: businessLaunchDate,
        RandDLaunchDate: rAndDLaunchDate,
        StatusId: statusId,
        Remarks: remarks,
        UpdatedBy: updatedBy,
        ApprovedOrRejectedBy: approvedOrRejectedBy,

        HGMLCategory: HGMLCategory,
        HGMLSubCategory: HGMLSubCategory,
        ProductGroup: productGroup,
        HGMLDivision: HGMLDivision,
        HGMLFormulation: HGMLFormulation,

        IsProductHierarchyFilled: isProductHierarchyFilled
    };

    return arrayitem;
}

$(".SaveProductLaunchInfo").on("click", function () {
    debugger
    var materialCodesSendForHgmlApprove = [];
    var materialCodesNotSendForHgmlApprove = [];

    if (editedProductLaunchInfoData.length != 0) {
        editedProductLaunchInfoData.forEach(function (obj) {
            if (obj.IsNPD !== '') {
                materialCodesSendForHgmlApprove.push(obj.MaterialCode);
            }
        });
        //editedProductLaunchInfoData.forEach(function (obj) {
        //    if (obj.IsProductHierarchyFilled !== '1') {
        //        materialCodesNotSendForHgmlApprove.push(obj.MaterialCode);
        //    }
        //});

        var materialCodesSendForHgmlApproveString = materialCodesSendForHgmlApprove.join(", ");
        //var materialCodesNotSendForHgmlApproveString = materialCodesNotSendForHgmlApprove.join(", ");

        const confirmationMessage = ` ${materialCodesSendForHgmlApproveString != '' ? `The following products <b>${materialCodesSendForHgmlApproveString}</b> Launch Information will be submitted for HGML approval. Do you want to continue?` : `Are you sure you want to save the details?`}`;

        confirm(confirmationMessage, function () {

            $('#ProductLaunchInformationData').val(JSON.stringify(editedProductLaunchInfoData));
            $('#ProductLaunchInformation_Submit').submit();
        });
    } else {

        alert('There are no changes to save.');
    }
});

function onClickSaveInGridRowDuringReject(obj) {

    var launchInformationData = []

    var rowData = getRowDataInArray(obj);
    launchInformationData.push(rowData);

    var materialCode = rowData.MaterialCode;
    var materialCodesSendForHgmlApprove = [];
    var materialCodesNotSendForHgmlApprove = [];

    if (launchInformationData.length != 0) {
        launchInformationData.forEach(function (obj) {
            if (obj.IsNPD !== '') {
                materialCodesSendForHgmlApprove.push(obj.MaterialCode);
            }
        });

        var materialCodesSendForHgmlApproveString = materialCodesSendForHgmlApprove.join(", ");
        const confirmationMessage = ` ${materialCodesSendForHgmlApproveString != '' ? `The following products <b>${materialCodesSendForHgmlApproveString}</b> Launch Information will be submitted for HGML approval. Do you want to continue?` : `Are you sure you want to save the details?`}`;
        confirm(confirmationMessage, function () {

            $('#ProductLaunchInformationData').val(JSON.stringify(rowData));
            $('#ProductLaunchInformation_Submit').submit();
        });

        //$.ajax({
        //    type: "POST",
        //    url: ROOT + "NPDLaunchMaster/.........",
        //    data: { hubIds: HubIds },
        //    dataType: "json",
        //    success: function (UserEmailResult) {

        //    },
        //    error: function () {
        //        alert("Error occured!!");
        //    }
        //});

    }
}

function onClickCloseInGridRowDuringReject(obj) {

    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#ProductLaunchInfo_Grid');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");
    var materialCode = grd.jqGrid('getCell', rowid, 'MaterialCode');

    editedProductLaunchInfoData = editedProductLaunchInfoData.filter(item => item.MaterialCode !== materialCode);

    // var isNPD = $(clossestTableRow).children().find(".IsNPD").val() != undefined ? $(clossestTableRow).children().find(".IsNPD").val() : grd.jqGrid('getCell', rowid, 'IsNPD');
    var isNPD = $.trim($(obj).closest('tr').find('td.IsNPDValue1 select.IsNPD').val());

    if (isNPD == "0") {
        isNPD = "No";
    } else if (isNPD == "1") {
        isNPD = "Yes";
    }

    var initialRowData = launchInfoInitialData.filter(item => item.MaterialCode === materialCode);

    var isNpd = "";
    isNpd = `<select class="form-control appearence IsNPD save_edit" id='` + initialRowData[0].MaterialCode + `IsNPD'>
                    <option value="">Select</option>`;
    for (var i = 0; i < isNpdList.length; i++) {

        if (initialRowData[0].IsNPD == isNpdList[i].Text) {

            isNpd += '<option selected  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
        } else {

            isNpd += '<option  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
        }
    }
    isNpd += `</select><span class="value_close">` + initialRowData[0].IsNPD + `</span>`;

    $(clossestTableRow).find(".IsNpdOption").empty();
    $(clossestTableRow).find(".IsNpdOption").append(isNpd);
    $(clossestTableRow).find(".RandDLaunchDate").val(initialRowData[0].RandDLaunchDate);
    $(clossestTableRow).find(".BusinessLaunchDate").val(initialRowData[0].BusinessLaunchDate);
}

$(document).on('keydown paste', '.BusinessLaunchDate', function (event) {
    event.preventDefault();
});
$(document).on('keydown paste', '.RandDLaunchDate', function (event) {
    event.preventDefault();
});


$('[data-singleselect]').select2();
$('.data-singleselect').select2();




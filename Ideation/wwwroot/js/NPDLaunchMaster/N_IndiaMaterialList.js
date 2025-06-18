var editedNpdListData = [];
var gridDataArray = [];
var ErrorPreviewData = [];
var DivisionName = "";
colmodels = [
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
        width: 220,
        classes: "mat-desc"
    },
    {
        name: 'CreatedDate',
        label: 'Material Created Date',
        resizable: true,
        ignoreCase: true,
        width: 70,
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
        name: 'IndiaCategory',
        label: 'India Category',
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'IndiaDivision',
        label: 'India Division',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },
    {
        name: 'DubaiCategory',
        label: 'Dubai Category',
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'DubaiDivision',
        label: 'Dubai Division',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },
    {
        name: 'UpdatedBy',
        label: 'Hierarchy Updated By',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },
    {
        name: 'UpdatedOn',
        label: 'Hierarchy Updated On',
        resizable: true,
        ignoreCase: true,
        width: 70,
    },
    {
        name: 'History',
        label: 'History',
        width: 50,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return `
                        <div class= "d-flex action_icons align-items-center justify-content-center">
                        <span class="mr-2" role="button" onclick="showMaterialModificationHistory('${rowobject.MaterialCode}',this)">
                            <i class="fas fa-eye color-info" title="Modification History"></i>
                        </span>
                    `;
        }
    }

]

function showMaterialModificationHistory(MaterialCode,obj) {

    var tr = $(obj).closest('tr');
    var matCodeDesc = tr.find(".mat-desc").text();
    $("#mat-code-desc").text(MaterialCode + " - " + matCodeDesc);

    $.ajax({
        url: ROOT + "NPDLaunchMaster/GetMaterialModificationHistory",
        dataType: "JSON",
        data: {
            MatCode: MaterialCode
        },
        success: function (result) {
            createPRModificationHistGrid(result);
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}

var modificationhistcolmodels = [
    {
        name: 'MaterialCode',
        label: 'Material Code',
        resizable: true,
        ignoreCase: true,
        width: 70,
        classes: "MaterialCode"
    },
    {
        name: 'IndiaCategory',
        label: 'India Category',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'IndiaDivision',
        label: 'India Division',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'DubaiCategory',
        label: 'Dubai Category',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'DubaiDivision',
        label: 'Dubai Division',
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'CreatedBy',
        label: 'Action By',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'CreatedOn',
        label: 'Action On',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false
    }
];
function createPRModificationHistGrid(data) {

    $.jgrid.gridUnload('#MaterialModificationHistoryGrid');

    $("#MaterialModificationHistoryGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: modificationhistcolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#MaterialModificationHistoryGrid_pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#MaterialModificationHistoryGrid tbody tr");
            var objHeader = $("#MaterialModificationHistoryGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#MaterialModificationHistoryGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#MaterialModificationHistoryGrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#PRDetailsGrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#MaterialModificationHistoryGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#MaterialModificationHistoryGrid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#MaterialModificationHistoryGrid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

    $("#MaterialModificationHistoryGrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $("#MaterialModificationHistoryPopUp").modal('show');

}

$(document).ready(function () {

    var NPDLaunchMasterDetailsHeaderData = $.parseJSON($('#NPDLaunchMasterDetailsHeaderData').val());
    findDivisionCount(NPDLaunchMasterDetailsHeaderData);

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

    $('.ui-jqgrid-bdiv').css({ 'max-height': '55vh' });
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
function findDivisionCount(result) {
    
    var DivisionTotals = {};
    var allDivisionElements = $(".division-count");
    allDivisionElements.each(function () {
        $(this).text('0');
    });
    $.each(result, function (i, obj) {
        var Division = $.trim(obj.IndiaDivision).toLowerCase()
        if (DivisionTotals[Division] === undefined) {
            DivisionTotals[Division] = 1;
            return;
        } else {
            DivisionTotals[Division]++;
            return;
        }
        var Division = $.trim(obj.DubaiDivision).toLowerCase()
        if (DivisionTotals[Division] === undefined) {
            DivisionTotals[Division] = 1;
            return;
        } else {
            DivisionTotals[Division]++;
            return;
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
function NPDListLoad(flag, DivisionName) {
    
    var division = (DivisionName == undefined || DivisionName == null)? "" : DivisionName;
    $.ajax({
        type: "POST",
        url: ROOT + "NPDLaunchMaster/N_IndiaMaterialListFilter",
        data: {
            division: division,
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
    var data = $('#NPDlist_Grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
        return
    }
    window.location.href = ROOT + "NPDLaunchMaster/GetIndiaNPDLMListExcel?q=" + "&division=" + DivisionName;
});
$("#Excel_file").on("change", function () {
    var file = $(this).val();
    (file == "") ? $("#E_Excel_file").removeClass('hide') : $("#E_Excel_file").addClass('hide');
});
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
                    url: ROOT + 'NPDLaunchMaster/IndiaNPDLMExcelUpload',
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
        name: 'IndiaCategory',
        label: 'India Category',
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'IndiaDivision',
        label: 'India Division',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },
    {
        name: 'DubaiCategory',
        label: 'Dubai Category',
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'DubaiDivision',
        label: 'Dubai Division',
        resizable: true,
        ignoreCase: true,
        width: 120,
    },
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
    showAlertMessage(data.Message);
    NPDListLoad(1);
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
    input2.value = "India & Dubai";
    form.appendChild(input2);

    document.body.appendChild(form);
    form.submit();
    // Cleanup
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
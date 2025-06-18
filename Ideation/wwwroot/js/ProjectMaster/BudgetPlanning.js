
var result = [];
var checkedData = [];
var selectedbox = [];
var selectedboxActive = [];
$(document).ready(function () {

    $('.data-singleselect').select2();
    $('[data-singleselect]').select2();

    var colmodels = [
        {
            name: 'Role',
            label: 'Department Name',
            resizable: true,
            ignoreCase: true,
            width: 150,
            formatter: 'text'
        },
        {
            name: 'IsActive',
            label: 'Is Active',
            resizable: true,
            ignoreCase: true,
            width: 50,
            search: false,
            formatter: function (cellvalue, options, rowobject) {
                var isChecked = (cellvalue == "True" ? 'checked' : '');
                return `<label> <input type="checkbox" class="isActivecbox" ${isChecked}><span></span></label>`;
            }
        }
        , {
            name: 'IsBudgetPlanning',
            label: 'Budget Planning',
            resizable: true,
            ignoreCase: true,
            width: 50,
            search: false,
            formatter: function (cellvalue, options, rowobject) {
                var isChecked = (cellvalue == "True" ? 'checked' : '');
                return `<label> <input type="checkbox" class="isBudgetbox" ${isChecked}><span></span></label>`;
            }
        }
    ];

    $("#BudgetPlanning").jqGrid({
        data: [],
        datatype: 'local',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_BudgetPlanning',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#BudgetPlanning tbody tr");
            var objHeader = $("#BudgetPlanning tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (var i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $("#BudgetPlanning").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    } else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px");
    }
});


$('#SearchTMData').on('click', function () {
    var templateName = $("#TemplateName").val();
    if (templateName == "" || templateName == "Select TemplateName") {
        alert("Please select templete");
    }
    else {
        $.ajax({
            type: "GET",
            url: ROOT + "ProjectMaster/GetRoleHODMasterHeaderData",
            data: {
                TemplateName: templateName,
            },
            success: function (App_Results) {
                result = JSON.parse(App_Results);
                $("#BudgetPlanning").jqGrid("clearGridData");

                $("#BudgetPlanning").jqGrid('setGridParam', { data: result });

                $("#BudgetPlanning").trigger('reloadGrid', [{ page: 1 }]);
            },
            error: function () {
                alert("Error occured!!");
            }
        });
    }
});

$(document).on("change", ".isActivecbox", function () {
    var rowData = getisAcivedata(this);
    var index = result.findIndex(x => x.Role === rowData.Role);
    if (index !== -1) {
        result[index].IsActive = rowData.IsActive;
    }
});


$('body').on('change', '.isBudgetbox', function () {
    var rowData = getisbudgetdata(this);
    var index = result.findIndex(x => x.Role === rowData.Role);
    if (index !== -1) {
        result[index].IsBudgetPlanning = rowData.IsBudgetPlanning;
    }
});

function getisbudgetdata(obj) {
    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#BudgetPlanning');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    var Role = grd.jqGrid('getCell', rowid, 'Role');
    var arrayitem = {
        Role: Role,
        IsBudgetPlanning: $(obj).is(':checked'),
    }
    return arrayitem;
}

function getisAcivedata(obj) {
    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#BudgetPlanning');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    var Role = grd.jqGrid('getCell', rowid, 'Role');
    var arrayitem = {
        Role: Role,
        IsActive: $(obj).is(':checked'),
    }
    return arrayitem;
}


$("#saveButton").on("click", function () {
    var flag = true;
    var templateName = $("#TemplateName").val();
    if (templateName == "" || templateName == "Select TemplateName") {
        flag = false;
        alert("There is no data to save");
    }
    if (flag) {
        $("#SavePopUp").modal('show');
        $('#SaveOk').on('click', function () {

            $.ajax({
                url: ROOT + "ProjectMaster/InsertBudgetPlanning",
                type: "POST",
                data: { budgetplaning: JSON.stringify(result), Templete: templateName },
                success: function (data) {
                    showAlertMessage(data.OutMessage, data.StyleClass)
                }, error: function () {
                    alert("Error occured!!");
                }

            });
        });
    }
})

function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}

$("#ExcelDownload").click(function () {
    var templateName = $("#TemplateName").val();
    if (templateName == "" || templateName == "Select TemplateName") {
        alert("Please select templete");
        return false;
    }
    else if (result.length == 0) {
        alert("There is no data to download");
        return false;
    }
    else {
        $.ajax({
            url: ROOT + 'ProjectMaster/GetExcelData_BudgetPlanning',
            type: 'GET',
            data: { Template: templateName },
            xhrFields: {
                responseType: 'blob'
            },
            success: function (response) {
                saveData(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'BudgetPlanning.xlsx');
            },
            error: function () {
                alert('Error fetching data');
            }
        });
    }

});

// Function to save data as a file
function saveData(data, type, filename) {
    var blob = new Blob([data], { type: type });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}
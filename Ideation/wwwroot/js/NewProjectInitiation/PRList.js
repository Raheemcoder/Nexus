var prNoArray = [];
var userRole = "";
var loginId = "";
var prStartDate = "";
var today = new Date();
todayDate = new Date(today);
var prNoSelectedFlag = 0;
var unSupportedViewTypes = {
    'doc': 'Microsoft Word Document',
    'docx': 'Microsoft Word Document',
    'xls': 'Microsoft Excel Spreadsheet',
    'xlsx': 'Microsoft Excel Spreadsheet',
    'csv': 'Microsoft Excel Spreadsheet',
    'ppt': 'Microsoft PowerPoint',
    'pptx': 'Microsoft PowerPoint'
}
var responseMsg = "";
var responseMsgClass = "";
var remarks = "";
var datepickerOptions = {
    format: 'dd/mm/yyyy',
    autoclose: true,
    changeMonth: true,
    todayHighlight: true
};

$(document).ready(function () {

    userRole = ($("#Role").val())?.toLowerCase();
    loginId = $("#LoginId").val()?.toLowerCase();
    prNoArray = $("#PRNoList").val();
    prNoArray = prNoArray != [] && prNoArray != null ? JSON.parse(prNoArray) : [];
    prStartDate = $("#FromDate").val();

    GenerateDatePicker();
    $("#search_btn").click();

});

function GenerateDatePicker() {

    $('#fromdate').datepicker('destroy');
    $('#fromdate').datepicker({
        ...datepickerOptions,
        startDate: new Date(prStartDate),
        endDate: new Date(today),
        defaultViewDate: {
            year: new Date(prStartDate).getFullYear(),
            month: new Date(prStartDate).getMonth(),
            day: 1
        },
    });

    $('#todate').datepicker('destroy');
    $('#todate').datepicker({
        ...datepickerOptions,
        startDate: new Date(prStartDate),
        endDate: new Date(today),
    });

}

$(document).on('changeDate', "#fromdate", function () {

    var fromDate = $("#fromdate").val();

    $('#todate').datepicker('destroy');
    $('#todate').datepicker({
        ...datepickerOptions,
        startDate: fromDate,
        endDate: todayDate,
    });

});

$(document).on('changeDate', "#todate", function () {

    var toDate = $("#todate").val();

    $('#fromdate').datepicker('destroy');
    $('#fromdate').datepicker({
        ...datepickerOptions,
        startDate: prStartDate,
        endDate: toDate,
    });

});

function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function initializeAutocomplete() {

    $("[data-pr-no]")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function (request, response) {
                prNoSelectedFlag = 0;
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term)), "i");
                var obj = [];
                var cnt = 0;
                $.grep(prNoArray, function (value) {
                    var name = value.PRNo;
                    var id = value.PRNo;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id })
                        cnt++
                    }
                });
                response(obj);
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {

                var terms = split(this.value);
                terms.pop();
                var selectedTerm = ui.item.value;
                if (terms.length > 0 && (terms.filter(term => term === selectedTerm).length) > 0) {
                    $(event.target).siblings('.already-selected').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    prNoSelectedFlag = 2;
                    terms.push("");
                    this.value = terms.join(", ");
                }
                else {
                    prNoSelectedFlag = 1;
                    terms.push(selectedTerm);
                    terms.push("");
                    this.value = terms.join(", ");
                }
                return false;
            },
            close: function (event, ui) {

                if ($(event.target).val() !== null || $(event.target).val() !== '' || typeof ($(event.target).val()) !== "undefined") {
                    if (prNoSelectedFlag === 0 && $(event.target).val() != '') {
                        var inputValue = $(event.target).val();
                        var parts = inputValue.split(',');
                        parts.pop();
                        parts.push("");
                        var result = parts.join(', ');
                        $(event.target).val(result);
                        $(event.target).siblings('.select-from-list').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                    else if (prNoSelectedFlag === 1) {
                        // this will handel over all span tag
                        $(event.target).siblings('span').addClass('hide');
                    }
                }
            },
            change: function (event, ui) {

                $(event.target).siblings('span').addClass('hide');

                var terms = split(this.value);
                var validItem = [];
                var invalidItem = [];
                if (terms.length > 0) {
                    terms.forEach(function (obj) {
                        if (obj != null && obj != "") {
                            var filteredResources = prNoArray.filter(item => item.PRNo === obj);

                            if (filteredResources.length > 0) {
                                validItem.push(obj);
                            }
                            else {
                                invalidItem.push(obj);
                            }
                        }
                    });

                    if (validItem.length > 0) {
                        validItem.push("");
                        this.value = validItem.join(", ");
                    }

                    if (invalidItem.length > 0) {
                        this.value = validItem.join(", ");
                        $(event.target).siblings('.not-valid-pr').removeClass('hide').delay(3000).queue(function (next) { $(this).addClass('hide'); next(); });
                    }
                }
            }
        });

}

PRcolmodels = [
    {
        name: 'PRHeaderId',
        label: 'PRHeaderId',
        width: 10,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        hidden: true,
    },
    {
        name: 'Action',
        label: 'Action',
        resizable: true,
        search: false,
        width: 100,
        ignoreCase: true,
        exportcol: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            return `
                    <div class="action_icons d-flex align-items-center justify-content-center">
                    
                    ${true ?
                    '<a onclick="ShowVendorDetails(' + rowobject.PRHeaderId + ')" title="Vendor Details"><i class="fas fa-file text-success"></i></a>' : ''}

                    ${true ?
                    '<a onclick="ShowHistory(' + rowobject.PRHeaderId + ', \'' + rowobject.ReferenceNo + '\')" title="History" ><i class="fas fa-history text-warning"></i></a>' : ''}

                    ${userRole != "admin" && rowobject.StatusId != 15 && rowobject.StatusId != 60 &&
                    rowobject.StatusId != 80 && rowobject.StatusId != 120 &&
                    (
                        (rowobject.PRInitiatedBy?.toLowerCase().includes(loginId) && (rowobject.StatusId == 5 || rowobject.StatusId == 130)) ||
                        (rowobject.StatusId == 140 && rowobject.IsEditableRole?.toLowerCase() == userRole) ||
                        (rowobject.StatusId != 5 && userRole == "pr admin") ||
                        (rowobject.StatusId == 70 && rowobject.IsEditableRole?.toLowerCase() == userRole)
                    ) ?
                    '<a onclick="OnEditPR(' + rowobject.PRHeaderId + ', ' + rowobject.IsInitiatorPR + ')" title="Edit"><i class="fas fa-pen color-primary"></i></a>' : ''}

                    ${userRole != "admin" && rowobject.StatusId == 140 &&
                    (
                        (rowobject.IsEditableRole?.toLowerCase() == userRole) ||
                        (userRole == "pr admin")
                    ) ?
                    '<a onclick="OnApprovePR(' + rowobject.PRHeaderId + ')" title="Approve & Create PR"><i class="fas fa-thumbs-up text-success"></i></a>' : ''}

                    ${userRole != "admin" && rowobject.IsEditableRole?.toLowerCase() == userRole && rowobject.StatusId == 140 ?
                    '<a onclick="OnRejectPR(' + rowobject.PRHeaderId + ')" title="Reject"><i class="fas fa-thumbs-down text-danger"></i></a>' : ''}

                    ${userRole != "admin" && rowobject.IsEditableRole?.toLowerCase() == userRole && (rowobject.StatusId == 140 || (rowobject.StatusId == 70 && rowobject.IsInitiatorPR == 1)) ?
                    '<a onclick="OnRollBackPR(' + rowobject.PRHeaderId + ')" title="Roll back to initiator" ><i class="fas fa-repeat color-blue"></i></a>' : ''}

                    ${userRole != "admin" && rowobject.PRInitiatedBy?.toLowerCase().includes(loginId) && rowobject.StatusId == 5 ?
                    '<a onclick="OnDeletePR(' + rowobject.PRHeaderId + ')" title="Delete"><i class="fas fa-trash color-delete"></i></a>' : ''}

                    ${userRole != "admin" && rowobject.StatusId == 70 &&
                    (
                        (rowobject.IsEditableRole?.toLowerCase() == userRole) ||
                        (userRole == "pr admin")
                    ) ?
                    '<a onclick="OnRetrytoApprove(' + rowobject.PRHeaderId + ')" title="SAP Retry" ><i class="fas fa-reply color-blue"></i></a>' : ''}

                    ${(
                    (rowobject.StatusId == 70) ||
                    ((rowobject.IsSAPFailed == 1) && (rowobject.StatusId == 130))
                ) ?
                    '<a onclick="ShowSAPFailedInfo(' + rowobject.PRHeaderId + ')" title="SAP Remarks" ><i class="fas fa-info text-info"></i></a>' : ''}

                    </div>
            `;
        },
    },
    {
        name: 'ReferenceNoExcel',
        label: 'PR Ref No',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true,
        hidden: true
    },
    {
        name: 'ReferenceNo',
        label: 'PR Ref No',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: false,
        classes: "list-ref-no",
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.PRNo != "") {
                return '<div>' + cellvalue + '</div>';
            }
            else if (rowobject.ReferenceNo != "") {
                return '<div>' + '<span class="PR_Details_Link" onclick="OnPRDetails(' + rowobject.PRHeaderId + ',this)">' + cellvalue + '</span> ' + '</div>';
            }
            else {
                return '';
            }
        }
    },
    {
        name: 'PRNoExcel',
        label: 'PR No',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true,
        hidden: true
    },
    {
        name: 'PRNo',
        label: 'PR No',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: false,
        classes: "pr-no",
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.PRNo != "") {
                return '<div>' + '<span class="PR_Details_Link" onclick="OnPRDetails(' + rowobject.PRHeaderId + ',this)">' + cellvalue + '</span> ' + '</div>';
            }
            else {
                return '';
            }
        }
    },
    {
        name: 'Department',
        label: 'Department',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true,
        classes: "list-dept"
    },
    {
        name: 'Category',
        label: 'Category',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true,
        classes: "list-cat"
    },
    {
        name: 'PRType',
        label: 'PR Type',
        width: 10,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        hidden: true
    },
    {
        name: 'Priority',
        label: 'Priority',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true

    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 150,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true

    },
    {
        name: 'StatusExcel',
        label: 'Status',
        width: 50,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true
    },
    {
        name: 'StatusName',
        label: 'Status',
        width: 100,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<span class= "${rowobject.StatusClass}"> ${rowobject.StatusName}</span> `;
        }
    },
    {
        name: 'PRInitiatedBy',
        label: 'PR Initiated By',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true

    },
    {
        name: 'PRInitiatedOn',
        label: 'Initiated On',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true

    },
    {
        name: 'SentForPRCreationBy',
        label: 'PR Created By',
        width: 80,
        classes: "pr-crea-by",
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true

    },
    {
        name: 'SentForPRCreationOn',
        label: 'PR Created On',
        classes: "pr-crea-on",
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        exportcol: true

    },
]
function CreatePRListGrid(data) {

    $.jgrid.gridUnload('#PRListGrid');

    $("#PRListGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: PRcolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#PRListGrid_pager',
        rowNum: 20,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#PRListGrid tbody tr");
            var objHeader = $("#PRListGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $("#PRListGrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $("#PRListGrid").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 245px)' });
    $("#PRListGrid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $("#PRListGrid").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $("#PRListGrid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#PRListGrid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $("#PRListGrid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#PRListGrid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }

}
$(document).on('click', '#refresh_btn', function () {

    $("#pr-no").val('');
    $("#fromdate").val('');
    $("#todate").val('');

    GenerateDatePicker();

    $("#search_btn").click();

});

$(document).on('click', '#search_btn', function () {

    var prNo = $("#pr-no").val();
    var fromDate = $("#fromdate").val();
    var toDate = $("#todate").val();

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetPRGridListData",
        dataType: "JSON",
        data: {
            PrNo: prNo,
            FromDate: fromDate,
            ToDate: toDate
        },
        success: function (result) {
            initializeAutocomplete();
            CreatePRListGrid(result);
        }
    });

});
$(document).on('change', "#fromdate", function () {
    var fromDate = $("#fromdate").val();
    $("#todate").datepicker("setStartDate", fromDate);
});

$(document).on('change', "#todate", function () {
    var toDate = $("#todate").val();
    $("#fromdate").datepicker("setEndDate", toDate);
});

//-----------------------------------------------------Vendor Files
function ShowVendorDetails(PRHeaderId) {
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetPRVendorData",
        data: {
            PRHeaderId: PRHeaderId
        },
        success: function (data) {
            if (data) {
                ShowVendorQuatationsGrid(data);
            }
            else {
                alert("Error Occured: " + data);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}

vendcolmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 40,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            var fileName = rowobject.DocumentName;
            var fileExtension = fileName.split('.').pop().toLowerCase();
            return `
                        <div class= "d-flex action_icons align-items-center justify-content-center">
                        <span class="mr-2" role="button" onclick="DownloadVendorDoc(this)">
                            <i class="fas fa-download download-pr-file-item color-download" title="Download"></i>
                        </span>
                            ${(fileExtension in unSupportedViewTypes) ? `` :
                    `<span role="button" onclick="ViewVendorDoc(this)">
                                    <i class="fas fa-eye view-pr-file-item color-eye" title="View"></i>
                                </span>`
                }
                        </div >
                    `;
        }
    },
    {
        name: 'VendorName',
        label: 'Vendor Name',
        width: 70,
        ignoreCase: true,
        sortable: false,
        resizable: true,
    },
    {
        name: 'DocumentName',
        label: 'Document Name',
        width: 110,
        classes: "file-name",
        ignoreCase: true,
        sortable: false,
        resizable: true,
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded by',
        width: 60,
        ignoreCase: true,
        sortable: false,
        resizable: true,
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        width: 40,
        ignoreCase: true,
        sortable: false,
        resizable: true,
    }
]
function ShowVendorQuatationsGrid(data) {

    $.jgrid.gridUnload('#Grid_Vendor_Document');

    $('#Grid_Vendor_Document').jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: vendcolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#Grid_Vendor_Document_pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Grid_Vendor_Document tbody tr");
            var objHeader = $("#Grid_Vendor_Document tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#Grid_Vendor_Document').closest('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('#Grid_Vendor_Document').closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
    var $TableHeight = $('#Grid_Vendor_Document').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $('#Grid_Vendor_Document').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Grid_Vendor_Document').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
        $('#Grid_Vendor_Document').closest(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
    }
    else {
        $('#Grid_Vendor_Document').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#Grid_Vendor_Document').closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $('#Grid_Vendor_Document').closest(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
    }
    $("#Document_show_popup").modal('show');

    $("#Grid_Vendor_Document").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}
function ViewVendorDoc(obj) {
    var tr = $(obj).closest('tr');
    var fileName = tr.find(".file-name").text();
    if (IsValidData(fileName)) {
        var imageUrl = ROOT + 'BudgetRequestFiles/' + fileName;
        window.open(imageUrl, '_blank');
    }
}
function DownloadVendorDoc(obj) {
    var tr = $(obj).closest('tr');
    var fileName = tr.find(".file-name").text();
    if (IsValidData(fileName)) {
        window.location.href = ROOT + "NewProjectInitiation/DownloadPRVendorFile?DocumentName=" + fileName;
    }
}

//-----------------------------------------------------PR Details Grid
PR_Colmodels =
    [
        {
            name: 'Project',
            label: 'Project Id',
            width: 90,
            resizable: true,
            hidden: true,
            ignoreCase: true,
            sortable: false,
            exportcol: false
        },
        {
            name: 'ProjectIdDesc',
            label: 'Project',
            width: 200,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
        },
        //{
        //    name: 'BalanceBudget',
        //    label: 'Balance Budget',
        //    width: 90,
        //    resizable: true,
        //    ignoreCase: true,
        //    sortable: false,
        //    exportcol: true,
        //    formatter: function (cellvalue, options, rowobject) {
        //        if (cellvalue != 0) {
        //            return cellvalue;
        //        }
        //        return "";
        //    }
        //},
        {
            name: 'GLCodeDescription',
            label: 'GL Code Description',
            width: 180,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
        },
        {
            name: 'MaterialCodeDescription',
            label: 'Material Code Description',
            width: 180,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            classes: "mat-codedesc",
            exportcol: true
        },
        {
            name: 'PurchaseGrp',
            label: 'Purchase Group',
            width: 80,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
        },
        {
            name: 'HSNCode',
            label: 'HSN Code',
            width: 90,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
        },
        {
            name: 'Quantity',
            label: 'Quantity',
            width: 90,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue != 0) {
                    return cellvalue;
                }
                return "";
            }
        },
        {
            name: 'UOM',
            label: 'UOM',
            width: 90,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
        },
        {
            name: 'ApproximateCost',
            label: 'Approx Cost (INR)',
            width: 90,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue != 0) {
                    return cellvalue;
                }
                return "";
            }
        },
        {
            name: 'PlantCode',
            label: 'Plant',
            width: 80,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
        },
        {
            name: 'StorageLocationCode',
            label: 'Storage Location',
            width: 80,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
        },
        {
            name: 'StockOnHand',
            label: 'Stock On Hand',
            width: 90,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue != 0) {
                    return cellvalue;
                }
                return "";
            }
        },
        {
            name: 'DeliveryDate',
            label: 'Delivery Date',
            width: 80,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
        },
        {
            name: 'Remarks',
            label: 'Remarks',
            width: 150,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            exportcol: true
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
                        <span class="mr-2" role="button" onclick="showMaterialModificationHistory('${rowobject.DetailId}',this)">
                            <i class="fas fa-eye color-info" title="Modification History"></i>
                        </span>
                    `;
            }
        },
    ]
function createPRDetailsGrid(data) {

    $.jgrid.gridUnload('#PRDetailsGrid');

    $("#PRDetailsGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: PR_Colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#PRDetailsGrid_pager',
        rowNum: 1000,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#PRDetailsGrid tbody tr");
            var objHeader = $("#PRDetailsGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#PRDetailsGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#PRDetailsGrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#PRDetailsGrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#PRDetailsGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#PRDetailsGrid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#PRDetailsGrid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

    $("#PRDetailsGrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $("#PRDetailsPopUp").modal('show');
}

function OnPRDetails(PRHeaderId, obj) {

    var $row = $(obj).closest('tr');

    $(".department").text($row.find('.list-dept').text().trim());
    $(".category").text($row.find('.list-cat').text().trim());
    $(".refNo").text($row.find('.list-ref-no').text().trim());
    $(".prDate").text($row.find('.pr-crea-on').text().trim());
    $(".prBy").text($row.find('.pr-crea-by').text().trim());
    $(".prNo").text($row.find('.pr-no').text().trim());

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetPRDetailsData",
        dataType: "JSON",
        data: {
            PRHeaderId: PRHeaderId
        },
        success: function (result) {
            if (result) {
                createPRDetailsGrid(result);
            }
            else {
                alert("Error Occured:" + result)
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}
var modificationhistcolmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        search: false,
        sortable: false,
    },
    {
        name: 'CreatedBy',
        label: 'Action By',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false

    },
    {
        name: 'CreatedOn',
        label: 'Action On',
        width: 50,
        resizable: true,
        ignoreCase: true,
        sortable: false
    }
];
function createPRModificationHistGrid(data) {

    $.jgrid.gridUnload('#PRHistoryGrid');

    $("#PRHistoryGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: modificationhistcolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#PRHistoryGrid_pager',
        rowNum: 1000,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#PRHistoryGrid tbody tr");
            var objHeader = $("#PRHistoryGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#PRHistoryGrid').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#PRHistoryGrid').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#PRDetailsGrid').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#PRHistoryGrid').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#PRHistoryGrid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#PRHistoryGrid').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

    $("#PRHistoryGrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}
function showMaterialModificationHistory(PRDetailId, obj) {

    var tr = $(obj).closest('tr');
    var matCodeDesc = tr.find(".mat-codedesc").text();
    $("#mat-code-desc").text(matCodeDesc);

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetPRModificationHistory",
        dataType: "JSON",
        data: {
            PRDetailId: PRDetailId
        },
        success: function (result) {
            $("#PRHistoryPopUp").modal('show');
            createPRModificationHistGrid(result);
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}

//-----------------------------------------------------SAP Failed
function ShowSAPFailedInfo(PRHeaderId) {

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetSAPFailedInfo",
        dataType: "JSON",
        data: {
            ReqNo: PRHeaderId,
            Page: "PRreq"
        },
        success: function (result) {
            if (result.length > 0) {
                alert(result[0].Response);
            }
            else {
                alert("There is no SAP failed remarks !!!")
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}

//-----------------------------------------------------PR History Grid
function ShowHistory(PRHeaderId, RefNo) {
    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/GetPRHistoryData",
        dataType: "JSON",
        data: {
            PRHeaderId: PRHeaderId
        },
        success: function (result) {
            if (result) {
                CreateHistoryFlow(result.Header);
                UpdateHistoryFlowClass(result.Details, result.LastValue);
                CreateAuditJQGrid(result.Details, RefNo);
            }
            else {
                alert("Error Occured:" + result)
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}
function CreateHistoryFlow(result) {
    var ulElement = `<ul class="history-flow-ul">`
    var count = result.length - 1;
    result.forEach(function (item, index) {

        ulElement += `
            <li data-value = ${item.id} class="mt-2">${item.value}</li>
        `;

        if (index < count) {
            ulElement += `
            <li data-value = ${item.id} class="fas fa-arrow-right mt-2"></li>
        `;
        }

    });
    ulElement += `</ul>`
    $(".lifecycle_list").html(ulElement);
}
function UpdateHistoryFlowClass(result, LastValue) {
    var lastid = LastValue[0].id
    var lastvalue = LastValue[0].value
    $.each(result, function (index, item) {
        var currentStageId = item.ToStageId;
        $(".history-flow-ul li").each(function () {
            var value = $(this).attr('data-value');
            if (value != currentStageId) {

                if (currentStageId == "130" && value == "5") {
                    var currentText = $(this).text();
                    if (!currentText.includes(item.ToStage)) {
                        $(this).text(currentText + " / " + item.ToStage);
                        $(this).addClass("warning");
                    }
                }
                if (lastid == "70" && value == "120") {
                    $(this).text(lastvalue);
                    $(this).addClass("bg_hgml rejected");
                }
                if (lastid == "120" && value == "120") {
                    $(this).text(lastvalue);
                    $(this).addClass("bg_hgml completed");
                }
                if (result.filter(item => item.ToStageId == value).length > 0 || value == "5") {
                    $(this).addClass("completed");
                }
                else if (currentStageId == "15" && value == "60") {
                    $(this).text("Rejected");
                    $(this).addClass("bg_hgml rejected");
                }
                else {
                    $(this).addClass("yet-tocomplete");
                }
            }
            else {
                if (currentStageId == "15") {
                    $(this).addClass("bg_hgml rejected");
                }
                else {
                    $(this).addClass("warning");
                }
            }
            $(".fa-arrow-right").text("");
        });
        if (currentStageId == lastid && lastid != "120") {
            $(".history-flow-ul li[data-value='" + lastid + "']").removeClass("completed");
            $(".history-flow-ul li[data-value='" + lastid + "']").addClass("warning");
        }
    });
    if (result.length == 0) {
        $(".history-flow-ul li").addClass("yet-tocomplete");
        $(".history-flow-ul li[data-value='5']").addClass("warning");
    }
    if (lastid == "130") {
        $(".history-flow-ul li[data-value='5']").removeClass("completed");
        $(".history-flow-ul li[data-value='5']").addClass("warning");
    }
}
var audit_colmodels = [
    {
        name: 'FromStage',
        label: 'From Stage',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 120,
    },
    {
        name: 'ToStage',
        label: 'To Stage',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 120,
    },
    {
        name: 'AssingedTo',
        label: 'Assigned To',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 150,
    },
    {
        name: 'ReceivedOn',
        label: 'Received On',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 80,
    },
    {
        name: 'SubmittedBy',
        label: 'Submitted By',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 120,
    },
    {
        name: 'SubmittedOn',
        label: 'Submitted On',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 80,
    },
    {
        name: 'Days',
        label: 'No of Days taken',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 80,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        sortable: false,
        width: 200,
    },
];
function CreateAuditJQGrid(data, id) {

    $.jgrid.gridUnload('#audit_trail');

    $("#audit_trail").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: audit_colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#audit_pager',
        rowNum: 1000,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#audit_trail tbody tr");
            var objHeader = $("#audit_trail tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });

    $('#audit_trail').closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(-270px + 100vh)' });
    $('#audit_trail').closest('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $('#audit_trail').closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 130) {
        $('#audit_trail').closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $('#audit_trail').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "8px");
    }
    else {
        $('#audit_trail').closest(".m-table__responsive").find(".ui-jqgrid-sdiv").css("padding-right", "0px");
    }

    id != "" ? $(".pr-ref-no-excel").text('- ' + id) : "";

    $("#auditTrail").modal("show");

    $("#audit_trail").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
$(document).on('click', '#HistoryExcel', function () {

    var isValid = true;
    var data = $('#audit_trail').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {

        var fileName = $(".pr-ref-no-excel").text().trim() != "" ?
            "PR Life Cycle History " + $(".pr-ref-no-excel").text().trim() + ".xlsx" :
            "PR Life Cycle History.xlsx";

        $("#audit_trail").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: fileName,
            maxlength: 100000,
        });

    }

});

//-----------------------------------------------------Action Buttons
function OnEditPR(PRHeaderId, IsInitiatorPR) {
    PRHeaderId = (PRHeaderId == null) ? 0 : PRHeaderId;
    window.location.href = ROOT + 'NewProjectInitiation/PRCreation' + '?q=' + Encrypt("PRHeaderId=" + PRHeaderId + "&IsInitiatorPR=" + IsInitiatorPR);
}
function OnDeletePR(PRHeaderId) {
    setTimeout(function () {
        $(".hide-remarks-div .star").addClass('hide');
    }, 0);
    handelConfirmRemarksPopup("Are you sure you want to delete?", function () {
        GetRemarks("delete");
        $.ajax({
            type: "POST",
            url: ROOT + "NewProjectInitiation/DeletePRData",
            dataType: "JSON",
            data: {
                Id: PRHeaderId,
                Remarks: remarks
            },
            success: function (result) {
                responseMsgClass = result.Item2;
                responseMsg = result.Item1;

                if (responseMsg?.toLowerCase().includes('success')) {

                    $("#response-message-div").html(

                        `<div class="alert ${responseMsgClass} alert-dismissible d-flex justify-content-between" role="alert" id="message_alert">
                        ${responseMsg}
                        </div>`

                    );

                    $("#response-message-div").removeClass('hide').delay(3000).queue(
                        function (next) {
                            $(this).addClass('hide');
                            next();
                        }
                    );
                    $("#search_btn").click();

                }
                else {
                    alert(result.Item1);
                }
            },
            error: function (xhr, status, error) {
                alert("Error Occured: " + error);
            }
        });
    });

}
function OnApprovePR(PRHeaderId) {

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/CheckIsPRCanBeApproved",
        dataType: "JSON",
        data: {
            PRHeaderId: PRHeaderId,
            Action: "approve the PR"
        },
        success: function (result) {

            if (result) {

                if (result.Item1 == "") {
                    handelConfirmRemarksPopup("Are you sure you want to approve?", function () {
                        if (GetRemarks("approve")) {
                        } else {
                            actionFunction(
                                "approve",
                                PRHeaderId,
                                "approved and sent for PR creation",
                                "Approved and sent for PR creation",
                                remarks
                            );
                        }
                    });
                }
                else {
                    alert(result.Item1);
                }

            }
            else {
                alert("Error Occured: " + result)
            }

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}
function OnRejectPR(PRHeaderId) {
    handelConfirmRemarksPopup("Are you sure you want to reject?", function () {
        if (GetRemarks("reject")) {
        }
        else {
            actionFunction(
                "reject",
                PRHeaderId,
                "rejected",
                "Rejected",
                remarks
            );
        }
    });
}
function OnRollBackPR(PRHeaderId) {
    handelConfirmRemarksPopup("Are you sure you want to roll back to initiator?", function () {
        if (GetRemarks("rollback")) {
        }
        else {
            actionFunction(
                "roll back",
                PRHeaderId,
                "roll backed to initiator",
                "Roll backed to initiator",
                remarks
            );
        }
    });
}
function OnRetrytoApprove(PRHeaderId) {


    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/CheckIsPRCanBeApproved",
        dataType: "JSON",
        data: {
            PRHeaderId: PRHeaderId,
            Action: "retry in SAP for PR Creation"
        },
        success: function (result) {

            if (result) {

                if (result.Item1 == "") {
                    confirm("Are you sure you want to retry in SAP for PR Creation?", function () {
                        actionFunction(
                            "retry",
                            PRHeaderId,
                            "",
                            "",
                            ""
                        );
                    });
                }
                else {
                    alert(result.Item1);
                }

            }
            else {
                alert("Error Occured: " + result)
            }

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}

function GetRemarks(type) {

    remarks = "";
    remarks = $("#with-remarks-data").val().trim();

    if (type != "delete") {
        if (remarks != "" && remarks != null && remarks != undefined) {
            $("#with-remarks-data").siblings('span').addClass('hide');
            $("#save-with-remarks-popup").modal("hide");
            return false;
        }
        else {
            $("#with-remarks-data").siblings('span').removeClass('hide');
            return true;
        }
    }
    else if (type == "delete") {
        $("#save-with-remarks-popup").modal("hide");
    }

}

$(document).on('show.bs.modal', '#save-with-remarks-popup', function () {
    $("#save-with-remarks-popup #save-confirm").html("Ok");
});
$(document).on('hidden.bs.modal', '#save-with-remarks-popup', function () {
    $(".hide-remarks-div .star").removeClass("hide");
    $("#save-with-remarks-popup #save-confirm").html("Save");
});

function actionFunction(type, PRHeaderId, Msg, Action, Remark) {

    var remarksArray = []
    remarksArray.push({
        Remark: Remark,
        Action: Action,
        Msg: Msg
    });

    $.ajax({
        type: "POST",
        url: ROOT + "NewProjectInitiation/PRListAction",
        dataType: "JSON",
        data: {
            PRHeaderId: PRHeaderId,
            Type: type,
            RemarksJson: JSON.stringify(remarksArray)
        },
        success: function (result) {
            responseMsgClass = result.Item2;
            responseMsg = result.Item1;

            if (responseMsg?.toLowerCase().includes('success')) {

                $("#response-message-div").html(

                    `<div class="alert ${responseMsgClass} alert-dismissible d-flex justify-content-between" role="alert" id="message_alert">
                ${responseMsg}
                </div>`

                );

                $("#response-message-div").removeClass('hide').delay(3000).queue(
                    function (next) {
                        $(this).addClass('hide');
                        next();
                    }
                );
                $("#search_btn").click();

            }
            else {
                alert(result.Item1);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}
$('#exceldownload').on('click', function () {

    var isValid = true;
    var data = $('#PRListGrid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        $("#PRListGrid").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "PR List.xlsx",
            maxlength: 100000,
        });
    }

});
$('#details_exceldownload').on('click', function () {

    var isValid = true;
    var data = $('#PRDetailsGrid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        $("#PRDetailsGrid").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "PR Details List.xlsx",
            maxlength: 100000,
        });
    }

});
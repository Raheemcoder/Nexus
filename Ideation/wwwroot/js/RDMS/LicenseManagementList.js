// variables
var userRole = "";
var loginId = "";
var licenseStartDate = "";
var licenseEndDate = "";
var selectedheaderid;
var selectedversion;
var datepickerOptions = {
    format: 'dd/mm/yyyy',
    autoclose: true,
    changeMonth: true,
    todayHighlight: true
};
var plantName = "";
var licTypeName = "";
var docCatName = "";
var docNo = "";
var currentTabId = "All";

// arrays
var licArray = [];
var licTypeCount = [];

$(document).ready(function () {
    var AutosuggestDropdown = JSON.parse($("#AutosuggestDropdown").val());
    userRole = $("#role").val();
    loginId = $("#login-id").val();
    licenseStartDate = $("#lic-start-date").val();
    licenseEndDate = $("#lic-end-date").val();

    $("#global-search").on("keyup", function () {
        var nocount = 0
        var searchText = $(this).val().toLowerCase();
        $(".card-section").each(function () {
            var tabText = $(this).text().toLowerCase();
            if (tabText.indexOf(searchText) !== -1) {
                $(this).show();
                nocount = nocount + 1

            } else {
                $(this).hide();
            }
        });
        $("#RecordsCount").text(nocount)
    });

    $('.multi-select-dd').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true
    });

    GenerateDatePicker();

    $("#search_btn").click();
    var LicenseTypeList = AutosuggestDropdown.filter(m => m.Type.toLowerCase() == "licensetype")
    if (LicenseTypeList != null) {
        var List = ''
        $("option").remove(".addOption");
        $.each(LicenseTypeList, function (i, obj) {

            List += '<option class="addOption" value="' + obj.Id + '">' + obj.Name + '</option>';
        })
        $("#LicenceType").html(List);
        $('#LicenceType').multiselect('rebuild');

        $("#PopupLicenceType").html(List);
        $('#PopupLicenceType').multiselect('rebuild');
    }
});

$(document).on('changeDate', "#fromdate", function () {

    var fromDate = $("#fromdate").val();

    $('#todate').datepicker('destroy');
    $('#todate').datepicker({
        ...datepickerOptions,
        startDate: fromDate,
        endDate: licenseEndDate,
    });

});

$(document).on('changeDate', "#todate", function () {

    var toDate = $("#todate").val();

    $('#fromdate').datepicker('destroy');
    $('#fromdate').datepicker({
        ...datepickerOptions,
        startDate: licenseStartDate,
        endDate: toDate,
    });

});

$(document).on('changeDate', "#popup-fromdate", function () {

    var fromDate = $("#popup-fromdate").val();

    $('#popup-todate').datepicker('destroy');
    $('#popup-todate').datepicker({
        ...datepickerOptions,
        startDate: fromDate,
        endDate: licenseEndDate,
    });

});

$(document).on('changeDate', "#popup-todate", function () {

    var toDate = $("#popup-todate").val();

    $('#popup-fromdate').datepicker('destroy');
    $('#popup-fromdate').datepicker({
        ...datepickerOptions,
        startDate: licenseStartDate,
        endDate: toDate,
    });

});

$(document).on('click', "[card-id]", function () {

    if ($(this).siblings('.product-jqgrid-card').html().trim() == "") {

        $(".product-jqgrid-card").html('');

        var licenseHeaderId = $(this).attr('card-id');
        var licenseVersion = $(this).attr('card-version');
        var gridDiv = `<div>`;
        gridDiv = `
            <div>
                <div class="col-md-12 p-0">
                    <div class="m-table__main">
                        <div class="m-table__responsive -virtual-scroll">
                            <table id="product-grid-page" class="table table-bordered"></table>
                            <div id="product-grid-pager-page"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        gridDiv += `</div>`;
        $(this).siblings('.product-jqgrid-card').html(gridDiv);
        GetPopupData(1, licenseHeaderId, licenseVersion, 1);

    }
    else {
        $(".product-jqgrid-card").html('');
    }
});

$(document).on('click', "[data-tab-id]", function () {

    $(this).parent().siblings().find('a').removeClass('active');
    $(this).addClass('active');

    currentTabId = $(this).attr('data-tab-id');

    $("#search_btn").click();

});

function GenerateDatePicker() {

    $('#fromdate').datepicker('destroy');
    $('#fromdate').datepicker({
        ...datepickerOptions,
        startDate: licenseStartDate,
        endDate: licenseEndDate,
        defaultViewDate: {
            year: new Date(licenseStartDate).getFullYear(),
            month: new Date(licenseStartDate).getMonth(),
            day: 1
        },
    });

    $('#todate').datepicker('destroy');
    $('#todate').datepicker({
        ...datepickerOptions,
        startDate: licenseStartDate,
        endDate: licenseEndDate,
    });

    $('#popup-fromdate').datepicker('destroy');
    $('#popup-fromdate').datepicker({
        ...datepickerOptions,
        startDate: licenseStartDate,
        endDate: licenseEndDate,
        defaultViewDate: {
            year: new Date(licenseStartDate).getFullYear(),
            month: new Date(licenseStartDate).getMonth(),
            day: 1
        },
    });

    $('#popup-todate').datepicker('destroy');
    $('#popup-todate').datepicker({
        ...datepickerOptions,
        startDate: licenseStartDate,
        endDate: licenseEndDate,
    });

}
function AddLicenseCardsToUI() {
    $("#RecordsCount").text("");
    var div = `<div>`;
    var HeaderDiv = `<div>
     <div class="Headercolor">
            <div class="card-body">
                <div class="card_details">
                    <div class="user_skus _w-6">
                        <div class="skus_allocated ">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link"><b>Reference No.</b></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated ">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link"><b>Plant</b></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated ">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link"><b>Document Category</b></span>
                                </label>
                            </div>
                        </div>
                    </div>
                     <div class="user_skus _w-10">
                        <div class="skus_allocated ">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link"><b>Document Type</b></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link"><b>Document No.</b></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link">
                                        <b>Valid:</b> <i class="fas fa-calendar"></i>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated">
                            <div class="list_forms">
                                <label class="control-label status_label">
                                    <span class="color-link">
                                        <span><b>Status (Days)</b></span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-5">
                        <div class="skus_allocated">
                            <div class="list_forms">
                                <label class="control-label status_label">
                                 <span class="color-link">
                                        <span><b>Action</b></span>
                                    </span>
                                 </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>`
    licArray.forEach(function (obj) {

        var isPending =
            obj.Status?.includes("Pending") && parseInt(obj.DueDate.split(' ')[0]) > 30 ? "pending-color" : // 30 to 90
                obj.Status?.includes("Pending") && parseInt(obj.DueDate.split(' ')[0]) <= 30 ? "overdue-pending pending-color" // 0 to 30
                    : "";

        var dates = (obj.ValidFrom != "" && obj.ValidTo != "") ? obj.ValidFrom + ' - ' + obj.ValidTo : obj.ValidFrom + ' ' + obj.ValidTo;
        var plantName = (obj.ManufacturingPlantName != "" || obj.ManufacturingPlantCode != "")
            ? (obj.ManufacturingPlantCode + " - " + obj.ManufacturingPlantName) : obj.ManufacturingPlantName;

        div += `
    
        <div class="card-section">
            <div class="card-body ${isPending}" card-id = "${obj.LicenseHeaderId}" card-version = "${obj.Version}">
                <div class="card_details">
                    <div class="user_skus _w-6">
                        <div class="skus_allocated ">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link"><b>${obj.LicenseHeaderId} - ${obj.Version}</b></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated ">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link"><b>${plantName}</b></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated ">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link">${obj.DocumentCategoryName}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                     <div class="user_skus _w-10">
                        <div class="skus_allocated ">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link">${obj.LicenseTypeName}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link">${obj.DocNumber}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated">
                            <div class="list_forms">
                                <label class="control-label">
                                    <span class="color-link">
                                        ${dates}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-15">
                        <div class="skus_allocated">
                            <div class="list_forms">
                                <label class="control-label status_label">
                                    <span class="color-link">
                                        <span class="status_ ${obj.DueClass}">${obj.Status}</span>
                                        <span class="">${obj.DueDate}</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="user_skus _w-5">
                        <div class="skus_allocated">
                            <div class="list_forms">
                                <div class="p-0">
                                    <div class="d-flex justify-content-end">

                                    ${obj.Status?.toLowerCase() != "draft" ?
                `<span class="remarks-color mr-2" role="button">
                                            <i class="fas fa-info" title = "Remarks" onclick="GetPopupData(2, '${obj.LicenseHeaderId}', '${obj.Version}')"></i>
                                        </span>`
                : ``
            }

                                        ${obj.IsFilePresent == 1 ?
                `<span class="mr-2" role="button" onclick="ShowLicenseFile('${obj.LicenseHeaderId}', '${obj.Version}')" target="_blank">
                                          <i class="fas fa-file text-success" title = "License Document"></i>
                                        </span>`
                : ``
            }
                                     ${obj.IsDeclarationPresent == 1 ?
                `<span class="mr-2" role="button" onclick="ShowDeclarationPopup('${obj.LicenseHeaderId}')">
                                          <i class="fas fa-file-signature text-primary" title = "Declaration Document"></i>
                                        </span>`
                : ``
            }
                                        ${obj.Status?.toLowerCase() != "draft" ?
                `<span class="mr-2" role="button" onclick="GetPopupData(3, '${obj.LicenseHeaderId}', '${obj.Version}')">
                                            <i class="fas fa-history text-warning" title = "History"></i>
                                        </span>`
                : ``
            }
                                        ${userRole != "view role" && obj.IsEditable == 1 && obj.IsRenewable == 0 ?
                `<span class="mr-2" role="button" onclick="ActionLicense(1, '${obj.LicenseHeaderId}','${obj.IsActivePlant}')">
                                                <i class="fas fa-pen text-info" title = "Edit"></i>
                                            </span >`
                : ``
            }

                                        ${userRole != "view role" && obj.IsEditable == 1 && obj.IsRenewable == 1 ?
                `<span class="mr-2" role="button" onclick="ActionLicense(2, '${obj.LicenseHeaderId}','${obj.IsActivePlant}')">
                                                <i class="fas fa-refresh text-primary" title = "Renew"></i>
                                            </span>`
                : ``
            }
                                            ${userRole != "view role" && obj.IsEditable == 1 && obj.Status?.toLowerCase() == "draft" ?
                `<span class="mr-2" role="button" onclick="ActionLicense(3, '${obj.LicenseHeaderId}')">
                                                <i class="fas fa-trash text-danger" title = "Delete"></i>
                                            </span>`
                : ``
            }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-jqgrid-card">
            </div>
        </div>

    `
    });

    div += `</div>`

    $(".license-type-tab li").each(function () {
        var $item = $(this);
        licTypeCount.forEach(function (item1) {
            if (item1.Id === $item.find('a').attr('data-tab-id')) {
                $item.find('a span').text(item1.Count);
            }
        });
    });
    $("#RecordsCount").text(licArray.length)
    $(".license-list-header").html(HeaderDiv);
    $(".license-list-cards").html(div);

}
function GetSearchedData(type) {

    //type-- 1 : search
    //type --2 : refresh

    var plant = ""
    var status = ""
    var fromDate = ""
    var toDate = ""
    var licenceType = ""
    var docCategory = ""

    if (type == 1) {
        plant = $("#plant").val().join(',');
        status = $("#status").val().join(',');
        fromDate = $("#fromdate").val();
        toDate = $("#todate").val();
        licenceType = $("#LicenceType").val().join(',');
        docCategory = $("#DocCategory").val().join(',');
    }
    else {
        //refresh all
        $("#plant").val('');
        $("#status").val('');
        $("#todate").val('');
        $("#fromdate").val('');
        $("#DocCategory").val('');
        $("#LicenceType").val('');
        $("#DocCategory").multiselect('refresh');
        $("#LicenceType").multiselect('refresh');
        $("#plant").multiselect('refresh');
        $("#status").multiselect('refresh');
        GenerateDatePicker();
        $(".license-type-tab li").find('a').removeClass('active');
        $(".license-type-tab li:first").find('a').addClass('active');
        currentTabId = "All";
    }

    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetLicenseManagementListData",
        dataType: "JSON",
        async: false,
        data: {
            Plant: plant,
            Status: status,
            FromDate: fromDate,
            ToDate: toDate,
            LicType: currentTabId,
            LicenceType: licenceType,
            DocCategory: docCategory
        },
        success: function (data) {

            licArray = data ? data.Headerdata : [];
            licTypeCount = data ? data.CountData : [];

            if (data) {
                AddLicenseCardsToUI();
            }

        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });
}

function ShowLicenseFile(licenseHeaderId, version) {

    event.stopPropagation();
    var obj = licArray.filter(item => item.LicenseHeaderId == licenseHeaderId && item.Version == version)[0];
    var fileName = obj?.HeaderDocumentName;

    window.open(ROOT + 'RDMSFiles/' + fileName, '_blank');

}
function GetPopupData(type, licenseHeaderId, version, isPageGrid = 0, UpdatedOnWithTime) {

    // type 1 - Product
    // type 2 - Remarks
    // type 3 - History

    $(".HeaderId").text(licenseHeaderId);
    event.stopPropagation();
    selectedheaderid = licenseHeaderId;
    selectedversion = version
    var obj = licArray.filter(item => item.LicenseHeaderId == licenseHeaderId)[0];
    plantName = (obj?.ManufacturingPlantName != "" || obj?.ManufacturingPlantCode != "")
        ? (obj?.ManufacturingPlantCode + " - " + obj?.ManufacturingPlantName) : obj?.ManufacturingPlantName;
    licTypeName = obj?.LicenseTypeName;
    docCatName = obj?.DocumentCategoryName;
    docNo = obj?.DocNumber;

    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetLicensePopupData",
        dataType: "JSON",
        async: false,
        data: {
            Type: type,
            LicenseHeaderId: licenseHeaderId,
            Version: version,
            CreatedOn: UpdatedOnWithTime
        },
        success: function (data) {

            if (data) {
                if (type == 1) {
                    CreateProductGrid(data, isPageGrid != 0 ? 1 : 2);
                }
                else if (type == 2) {
                    CreateRemarksGrid(data);
                }
                else if (type == 3) {
                    CreateHistoryGrid(data);
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
function ActionLicense(type, licenseHeaderId, isactiveplant = 0) {

    // type 1 - Edit
    // type 2 - Renew
    // type 3 - Delete

    event.stopPropagation();

    if (type == 3) {
        handelConfirmPopup('Are you sure do you want to delete the license?',
            function () {

                var isDeleted = false;
                var responseMsg = "";
                var responseMsgClass = "";

                $.ajax({
                    type: "POST",
                    url: ROOT + "RDMS/DeleteLicense",
                    dataType: "JSON",
                    data: {
                        LicenseHeaderId: licenseHeaderId,
                    },
                    async: false,
                    success: function (result) {
                        responseMsgClass = result?.Item2;
                        responseMsg = result?.Item1;
                        if (responseMsg.toLowerCase().includes('success')) {
                            isDeleted = true;
                        }
                    },
                    error: function (xhr, status, error) {
                        alert("Error Occured: " + error);
                    }
                });

                if (isDeleted) {

                    $("#search_btn").click();

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

                }
                else {
                    alert("Error Occured :" + responseMsg);
                }
            }
        )

    }
    else if (type == 1 || type == 2) {

        if (isactiveplant != 1) {
            alert("Plant is inactive, Kindly make plant active to update the details.");
        }
        else if (isactiveplant == 1) {
            window.location.href = ROOT + 'RDMS/EditLicenseManagement' + '?q=' + Encrypt("LicenceHeaderId=" + licenseHeaderId + "&Type=" + type);
        }

    }

}

prodColmodels = [
    {
        name: 'ProductGroup',
        label: 'Product Name',
        resizable: true,
        sortable: false,
        width: 40,
        ignoreCase: true,
    },
    {
        name: 'EffectiveFrom',
        label: 'Effective From',
        resizable: true,
        sortable: false,
        width: 20,
        ignoreCase: true,
    },
    {
        name: 'DocumentName',
        label: 'Document Name',
        resizable: true,
        ignoreCase: true,
        width: 0,
        sortable: false,
        exportcol: true,
        hidden: true
    },
    {
        name: 'ProductDocumentName',
        label: 'Document Name',
        resizable: true,
        sortable: false,
        width: 60,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="pr_fields_ link_color">
                        <a href="${ROOT + `RDMSFiles/` + cellvalue}" target="_blank">${cellvalue}</a>
                    </div>`;
        }
    },
];
function CreateProductGrid(data, gridType) {

    // gridType 1 -- page grid
    // gridType 2 -- popup grid

    var gridName = "";
    var gridPagerName = "";

    if (gridType == 1) {
        gridName = "#product-grid-page";
        gridPagerName = "#product-grid-pager-page";
    }
    else if (gridType == 2) {
        gridName = "#product-grid";
        gridPagerName = "#product-grid-pager";
    }

    $.jgrid.gridUnload(gridName);
    $(gridName).jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: prodColmodels,
        loadonce: true,
        viewrecords: true,
        pager: gridPagerName,
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $(gridName + " tbody tr");
            var objHeader = $(gridName + " tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $(gridName).jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    if (gridType == 2) {
        $(gridName).closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 300px)' });
        $(gridName).closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
        var $ProductTableHeight = $(gridName).closest(".ui-jqgrid-bdiv").find("tbody").height();
        if ($ProductTableHeight > 130) {
            $(gridName).closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $(gridName).closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
        } else {
            $(gridName).closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $(gridName).closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        }
        $("#prd-plant").text(plantName);
        $("#prd-lictype").text(licTypeName);
        $("#prd-doccat").text(docCatName);
        $("#prd-docno").text(docNo);
        $("#product-popup").modal('show');
    }
    else if (gridType == 1) {
        $(gridName).closest('.ui-jqgrid-bdiv').css({ 'max-height': '200px' });
        $(gridName).closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
        var $ProductTableHeight = $(gridName).closest(".ui-jqgrid-bdiv").find("tbody").height();
        if ($ProductTableHeight > 130) {
            $(gridName).closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $(gridName).closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
        } else {
            $(gridName).closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
            $(gridName).closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        }
    }

}

historyColmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 70,
        resizable: true,
        sortable: false,
        search: false,
        ignoreCase: true,
        exportcol: false,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="action_icons text-center" title="">
                        <a href="${ROOT + `RDMSFiles/` + rowobject.HeaderDocumentName}" target="_blank">
                            <i class="fas fa-file color-green" title = "License Document"></i>
                        </a>
                         ${(rowobject.IsProductGroupPresent > 0)
                    ?
                    `<span onclick="GetPopupData(1,'${rowobject.LicenseHeaderId}', '${rowobject.Version}',0,'${rowobject.UpdatedOnWithTime}')">
                                <i class="fas fa-eye color-info" title = "Products" role="button"></i>
                            </span>`
                    : ''
                }
                    </div>`;
        }
    },
    {
        name: 'ValidFrom',
        label: 'Valid From',
        width: 85,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'ValidTo',
        label: 'Valid To',
        width: 85,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'Version',
        label: 'Version',
        width: 85,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'Status',
        label: 'Status',
        width: 70,
        resizable: true,
        sortable: false,
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
        sortable: false,
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
        sortable: false,
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

    $("#his-plant").text(plantName);
    $("#his-lictype").text(licTypeName);
    $("#his-doccat").text(docCatName);
    $("#his-docno").text(docNo);

    $("#history-popup").modal('show');
}

remarksColmodels = [
    {
        name: 'Version',
        label: 'Version',
        width: 50,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 200,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'Action',
        label: 'Action',
        width: 50,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'ActionOn',
        label: 'Action On',
        width: 50,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'ActionBy',
        label: 'Action By',
        width: 50,
        sortable: false,
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

//--------------------------------------------------------------Excel downloads

$(document).on('click', "#prd-excel-download", function () {

    var isValid = true;
    var data = $('#product-grid').jqGrid('getGridParam', 'data');
    var plant = $('#prd-plant').text()
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
    var plant = $('#his-plant').text()
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
    var plant = $('#rem-plant').text()
    var data = $('#remarks-grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "RDMS/DownloadRDMSRemarksExcel?LicenseHeaderId=" + selectedheaderid + "&&plantName=" + plant + "&&type=" + "Remarks";

    }

});
$(document).on('click', "#exceldownload", function () {

    if (licArray.length > 0) {
        var plant = ""
        var status = ""
        var fromDate = ""
        var toDate = ""
        var licenceType = ""
        var docCategory = ""

        plant = $("#plant").val().join(',');
        status = $("#status").val().join(',');
        fromDate = $("#fromdate").val();
        toDate = $("#todate").val();
        licenceType = $("#LicenceType").val().join(',');
        docCategory = $("#DocCategory").val().join(',');

        window.location.href = ROOT + "RDMS/DownloadLicensesExcel?Plant=" + plant + "&&Status=" + status + "&&FromDate=" + fromDate + "&&ToDate=" + toDate + "&&LicType=" + currentTabId + "&&DocCategory=" + docCategory;
    }
    else {
        alert("There is no data to download");
    }
});
$(document).on("change", "#DocCategory", function () {
    var DocCategoryId = $("#DocCategory").val().toString();
    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetDocumentType",
        data: { DocCategoryId: DocCategoryId },
        dataType: "json",
        success: function (result) {

            if (result != null) {
                var List = ''
                $("option").remove(".addOption");
                $.each(result, function (i, obj) {

                    List += '<option class="addOption" value="' + obj.Id + '">' + obj.Name + '</option>';
                })
                $("#LicenceType").html(List);
                $('#LicenceType').multiselect('rebuild');
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});

function ShowDeclarationPopup(licenseHeaderId) {

    event.stopPropagation();

    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetLicensePopupData",
        dataType: "JSON",
        async: false,
        data: {
            Type: 5,
            LicenseHeaderId: licenseHeaderId,
        },
        success: function (data) {
            if (data) {
                CreateDeclarationGrid(data, licenseHeaderId);
            }
        },
        error: function (xhr, status, error) {
            alert("Error Occured: " + error);
        }
    });

}

declarationColmodels = [
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
            return `<div class="pr_fields_ link_color">
                        <a href="${ROOT + `RDMSFiles/` + cellvalue}" target="_blank">${cellvalue}</a>
                    </div>`;
        }
    },
    {
        name: 'UploadedBy',
        label: 'Uploaded By',
        width: 50,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'UploadedOn',
        label: 'Uploaded On',
        width: 50,
        sortable: false,
        resizable: true,
        ignoreCase: true,
    },
];
function CreateDeclarationGrid(data, licenseHeaderId) {

    $.jgrid.gridUnload('#declaration-grid');

    $("#declaration-grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: declarationColmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#declaration-grid-pager',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#declaration-grid tbody tr");
            var objHeader = $("#declaration-grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#declaration-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $("#declaration-grid").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 210px)' });
    $("#declaration-grid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $declarationTableHeight = $("#declaration-grid").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($declarationTableHeight > 130) {
        $("#declaration-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#declaration-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    } else {
        $("#declaration-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#declaration-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }
    $(".HeaderId").text(licenseHeaderId);
    $("#declaration-popup").modal('show');
}

function GetProductGroupMaterialDetails(type) {

    //type-- 1 : search
    //type --2 : refresh

    var plant = ""
    var productGrp = ""
    var material = ""
    var fromDate = ""
    var toDate = ""
    var licenceType = ""

    if (type == 1) {
        plant = $("#PopupPlant").val().join(',');
        productGrp = $("#PopupPrdGroup").val().join(',');
        material = $("#PopupMaterial").val().join(',');
        licenceType = $("#PopupLicenceType").val().join(',');
        fromDate = $("#popup-fromdate").val();
        toDate = $("#popup-todate").val();
    }
    else {
        //refresh all
        $("#PopupPlant").val('');
        $("#PopupPrdGroup").val('');
        $("#PopupMaterial").val('');
        $("#PopupLicenceType").val('');
        $("#PopupPlant").multiselect('refresh');
        $("#PopupPrdGroup").multiselect('refresh');
        $("#PopupMaterial").multiselect('refresh');
        $("#PopupLicenceType").multiselect('refresh');
        $("#popup-fromdate").val('');
        $("#popup-todate").val('');
        GenerateDatePicker();
    }

    $.ajax({
        type: "POST",
        url: ROOT + "RDMS/GetProductGroupMaterialData",
        dataType: "JSON",
        data: {
            Plant: plant,
            ProductGroup: productGrp,
            FromDate: fromDate,
            ToDate: toDate,
            LicenceType: licenceType,
            Material: material
        },
        success: function (data) {

            if (data) {
                CreatePrdGrpMatGrid(data);
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

const prdGrpMatColmodels = [
    {
        name: 'ProductGroup',
        label: 'Product Group',
        width: 100,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'EffectiveFrom',
        label: 'Effective From',
        width: 80,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'MATCODE',
        label: 'Material Code',
        width: 70,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'MATNAME',
        label: 'Material Name',
        width: 150,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'PlantCode',
        label: 'Plant Code',
        width: 70,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'DisplayName',
        label: 'Display Name',
        width: 150,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'PlantName',
        label: 'Plant Name',
        width: 150,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'DocumentType',
        label: 'Document Type',
        width: 70,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'DocNumber',
        label: 'Document Number',
        width: 90,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'ValidFrom',
        label: 'Valid From',
        width: 70,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    },
    {
        name: 'ValidTo',
        label: 'Valid To',
        width: 70,
        resizable: true,
        sortable: false,
        ignoreCase: true,
    }
];
function CreatePrdGrpMatGrid(data) {

    $.jgrid.gridUnload('#prd-grp-mat-grid');

    $("#prd-grp-mat-grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: prdGrpMatColmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#prd-grp-mat-grid-pager',
        rowNum: 30,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#prd-grp-mat-grid tbody tr");
            var objHeader = $("#prd-grp-mat-grid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#prd-grp-mat-grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $("#prd-grp-mat-grid").closest('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 320px)' });
    $("#prd-grp-mat-grid").closest('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $RemarksTableHeight = $("#prd-grp-mat-grid").closest(".ui-jqgrid-bdiv").find("tbody").height();
    if ($RemarksTableHeight > 130) {
        $("#prd-grp-mat-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#prd-grp-mat-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    } else {
        $("#prd-grp-mat-grid").closest(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $("#prd-grp-mat-grid").closest(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
    }

    $("#prd-grp-mat-popup").modal('show');

}

$("#prd-grp-mat-excel-download").click(function () {

    var data = $('#prd-grp-mat-grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        $("#prd-grp-mat-grid").jqGrid("exportToExcel", {
            includeLabels: true,
            includeGroupHeader: true,
            includeFooter: true,
            exportcol: false,
            fileName: "ProductGroupMaterialMapping.xlsx",
            maxlength: data.length + 200,
        });
    }

});
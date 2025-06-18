var jsonFormProjectUpdatesData = $.parseJSON($('#JsonFormProjectUpdatesData').val());

var projectMasterData = jsonFormProjectUpdatesData["ProjectMasterDataList"];
var headerData = jsonFormProjectUpdatesData["ProjectDetailsHeaderDataList"];

var flag = true;


$(document).ready(function () {
    debugger

    var currentMonth = new Date();
    var currentDate = new Date();
    currentDate.setDate(1);
    var day = currentMonth.getDate();
    var month = currentMonth.getMonth() + 1;
    var year = currentMonth.getFullYear();

    var today = currentDate.getDate();

    var formattedFromDate = ('0' + today).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + year;
    var formattedToDate = ('0' +day).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + year;
    $('#FromDate').val(formattedFromDate);

    $('#ToDate').val(formattedToDate);



    $('[data-datepicker-sd]').datepicker({
        format: 'dd/mm/yyyy',
        endDate: new Date(),
        autoclose: true
    }).on('changeDate', function (selected) {
        debugger
        // Get the selected date from the fromDateInput
        var fromDate = selected.date;

        // If the toDateInput already has a date selected and it is before the selected fromDate, clear the toDateInput value
        if ($('[data-datepicker-ed]').datepicker('getDate') < fromDate && $('[data-datepicker-ed]').datepicker('getDate') !=null) {
            debugger
            $('#FromDate_Err').text('From Date cannot be more than To Date');
            flag = false;
            $('[data-datepicker-ed]').datepicker('setDate', '');
            $('#FromDate_Err').show();
            setTimeout(function () {
                $('#FromDate_Err').hide();
            }, 4500)
            
        }

        // Update the minimum date of the toDateInput based on the selected fromDate
        //$('[data-datepicker-ed]').datepicker('setStartDate', fromDate);
    });
    $('[data-datepicker-ed]').datepicker({
        format: 'dd/mm/yyyy',
        endDate: new Date(),
        autoclose: true
    }).on('changeDate', function (selected) {
        debugger
        // Get the selected date from the toDateInput
        var toDate = selected.date;

        // If the fromDateInput already has a date selected and it is after the selected toDate, clear the fromDateInput value
        if ($('[data-datepicker-sd]').datepicker('getDate') > toDate && $('[data-datepicker-sd]').datepicker('getDate') != null) {
            debugger
            $('#ToDate_Err').text('To Date cannot be less From Date');
            flag = false;
            $('[data-datepicker-sd]').datepicker('setDate', '');
            $('#ToDate_Err').show();
            setTimeout(function () {
                $('#ToDate_Err').hide();
            }, 4500)
        }

        // Update the maximum date of the fromDateInput based on the selected toDate
        //$('[data-datepicker-sd]').datepicker('setEndDate', toDate);
    });





    if (projectMasterData.length > 0) {

        $('#ProjectCode').text(projectMasterData[0].ProjectCode);
        $('#ProjectDescription').text(projectMasterData[0].ProjectDescription);
        $('#ProjectHub').text(projectMasterData[0].ProjectHub);
        $('#ProjectDivision').text(projectMasterData[0].ProjectDivision);
        $('#ProjectType').text(projectMasterData[0].ProjectType);
        $('#ProjectClassification').text(projectMasterData[0].ProjectClassification);
        $('#HghCode').text(projectMasterData[0].HghCode);
        $('#RAndDName').text(projectMasterData[0].RAndDName);
        $('#ProjectStatus').text(projectMasterData[0].ProjectStatus);
    }

    var history = "";
    var originalFormat = "MM/DD/YYYY HH:mm:ss";
    var newFormat = "DD MMM YYYY hh:mm A";

    if (headerData.length > 0) {
        debugger
        headerData.forEach(function (data) {
            debugger
            var $html = $('<div>' + data.Comment + '</div>');
            $html.find('ol').css("font-size", "12px");
            $html.find('ol').css("font-family", "Open Sans,sans-serif");
            $html.find('ol li p').css("margin-top", "0px");
            var $listItems = $html.find('ol li');
           
            
            var threshold = 3;
            if ($listItems.length > threshold) {
                $listItems.slice(threshold).hide();

                var $readMore = $('<a class="read-more-show" data-commlist="' + data.Comment + '" href="#" id="2">Read More</a>');


                var $readLess = $('<a class="read-more-hide" data-commlist="' + data.Comment + '" href="#" more-id="2"> Read Less</a>');

                $readLess.hide();

                $(document).on('click', '.read-more-hide', function (e) {
                    e.preventDefault();
                    var $parent = $(this).parent();
                    $parent.find('ol li:gt(2)').hide();
                    $(this).hide();
                    $parent.find('.read-more-show').show();
                });

                $(document).on('click', '.read-more-show', function (e) {
                    e.preventDefault();
                    var $parent = $(this).parent();
                    $parent.find('ol li:gt()').show();
                    $(this).hide();
                    $parent.find('.read-more-hide').show();
                });

                // append the links to the HTML string
                $html.append($readMore);
                $html.append($readLess);
            }

            // Changing the date format
            var originalDate = data.CreatedDate;
            var originalMoment = moment(originalDate, originalFormat);
            var newDate = originalMoment.format(newFormat);

            // create HTML string
            history += '<div class="history_section mb-0">' +
                '<div class="user_history col-auto col-form-label lbl_flex">' +
                '<div class="history_info"><span><i class="fas fa-user"></i></span> <span class="history_name">' + data.CreatedByName + '</span></div>' +
                '<div style="display:flex;justify-content:end;align-items:center"><span class="date_font">' + newDate + '</span><span class="_download"><span' + (data.IsContainDocument == 0 ? ' style = "display:none"' : "") + ' ><i onclick="onClickViewToDownload(\'' + data.ProjectCode + '\',\'' + data.CreatedBy + '\',\'' + data.CreatedDate + '\')" class="fa fa-files-o" title="View Documents"></i></span></span></div > ' +
                '</div>' +
                '<p>' + $html.html() + '</p>' +
                '</div>';
        });

        $('#DynamicHistory').append(history);
        $('.read-more-show,.read-more-hide').css({"font-size":"13px","margin-left":"3vh"});
    }
    else {
        $('#DynamicHistory').empty();
        $('#DynamicHistory').append('<p>No Comments Available</p>');
    }

});
//<div class="_download"><span><i class="fas fa-download"></i></span><span class="date_font">13 Apr 2023 12:10 PM</span></div>


$('[data-multiselect]').multiselect({
    includeSelectAllOption: true,
    buttonWidth: '100%',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});


var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$('[data-datepicker-monthyear]').datepicker({
    format: 'M/yyyy',
    viewMode: 'months',
    minViewMode: 'months',
    todayHighlight: true,
    autoclose: true,
    startDate: '+30'

});
//$('[data-datepicker-monthyear]').datepicker('setDate', today);

$(function () {
    // Hide the extra content initially, using JS so that if JS is disabled, no problemo:
    $('.read-more-content').addClass('hide');
    $('.read-more-show, .read-more-hide').removeClass('hide');

    $('.read-more-show').on('click', function (e) {
        var content = $(this).siblings('.read-more-content');
        $(this).addClass('hide');
        content.removeClass('hide');
        e.preventDefault();
    });

    $(document).on('click', '.read-more-hide', function (e) {
        e.preventDefault();
        $(this).closest('.history_section').find('.read-more-show').removeClass('hide');
        $(this).closest('.read-more-content').addClass('hide');
    });
});


function onClickViewToDownload(projectCode, createdBy, createdDate) {
    debugger
    $.ajax({

        type: "POST",
        url: ROOT + "ProjectUpdates/GetUploadedDocumentDetail",
        data: { projectCode: projectCode, createdBy: createdBy, createdDate: createdDate },
        dataType: "json",
        success: function (response) {
            debugger
            if (response.length > 0) {
                debugger
                $("#Document_Download_Grid").jqGrid("clearGridData");
                $("#Document_Download_Grid").trigger('reloadGrid');
                $("#Document_Download_Grid").jqGrid('setGridParam', { data: response });
                $("#Document_Download_Grid").trigger('reloadGrid');
            } else {
                $("#Document_Download_Grid").jqGrid("clearGridData");
                $("#Document_Download_Grid").trigger('reloadGrid');
            }
            // console.log(response);

            $('#ViewModal').modal('show');
        },
        error: function (err) {

            alert(err.responseText);
        }
    });


}

colmodels = [
    {
        name: 'UploadDocument',
        label: 'Document',
        resizable: true,
        ignoreCase: true,
        width: 140,
    },
    {
        name: 'CreatedBy',
        label: 'Uploaded By',
        width: 55,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedDate',
        label: 'Uploaded On',
        resizable: true,
        ignoreCase: true,
        width: 85,
    },
    {
        name: 'Download',
        label: 'Action',
        width: 35,
        search: false,
        resizable: true,
        ignoreCase: true,
        classes: "DownloadFile",
        formatter: function (cellvalue, options, rowobject) {
            debugger
            var fileName = rowobject.UploadDocument;
            var downloadUrl = ROOT + "ProjectUpdates/DownloadFile?fileName=" + encodeURIComponent(fileName);

            var fileExtension = fileName.split('.').pop().toLowerCase(); // Extract the file extension
            // List of known file extensions and their corresponding types
            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
            };

            return `<div class="justify-center_">
                        <a title="Download" href="${downloadUrl}" class="btn-icon -view">
                            <i class="fas fa-download"></i>
                        </a>` + (fileExtension in fileTypes ? '' : `<a class="btn-icon -edit" title="View" id="${options.rowId}" href="${ROOT}ProjectUpdatesImages/${rowobject.UploadDocument}" target="_blank"><i class="fa fa-eye" title="View"></i></a>`) + `
                    </div>`;
        }
    },

],

    $("#Document_Download_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_upload',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Document_Download_Grid tbody tr");
            var objHeader = $("#Document_Download_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#Document_Download_Grid").jqGrid('filterToolbar', {
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


$('#SearchPrototypeData').click(function () {
   debugger
    var fromDate = $('#FromDate').val();
    var toDate = $('#ToDate').val();
    var _filter = 'FilteredComments';
    if (fromDate == '' || toDate == '') {
        fromDate == '' ? $('#FromDate_Err').text('Please select From Date').show() : $('#FromDate_Err').text('');
        toDate == '' ? $('#ToDate_Err').text('Please select To Date').show() : $('#ToDate_Err').text('');
    }
    else {
        debugger
        $.ajax({
            url: ROOT + `ProjectUpdates/GetCommentsHistory`,
            type: 'GET',
            dataType:'json',
            data: { ProjectCode: $('#ProjectCode').text(), FromDate: $('#FromDate').val(), ToDate: $('#ToDate').val(), Filter: _filter },
            success: function (result) {
                debugger
                if (result.message = 'Success') {
                    $('#DynamicHistory').empty();
                    var history = "";
                    var originalFormat = "MM/DD/YYYY HH:mm:ss";
                    var newFormat = "DD MMM YYYY hh:mm A";
                    var headerData = result.ProjectDetailsHeaderDataList;
                    if (headerData.length > 0) {
                        debugger
                        headerData.forEach(function (data) {

                            var $html = $('<div>' + data.Comment + '</div>');
                            $html.find('ol').css("font-size", "12px");
                            $html.find('ol').css("font-family", "Open Sans,sans-serif");
                            $html.find('ol li p').css("margin-top", "0px");
                            var $listItems = $html.find('ol li');
                            var threshold = 2;
                            if ($listItems.length > threshold) {
                                $listItems.slice(threshold).hide();

                                var $readMore = $('<a class="read-more-show" data-commlist="' + data.Comment + '" href="#" id="2">Read More</a>');


                                var $readLess = $('<a class="read-more-hide" data-commlist="' + data.Comment + '" href="#" more-id="2"> Read Less</a>');

                                $readLess.hide();

                                $(document).on('click', '.read-more-hide', function (e) {
                                    e.preventDefault();
                                    var $parent = $(this).parent();
                                    $parent.find('ol li:gt(1)').hide();
                                    $(this).hide();
                                    $parent.find('.read-more-show').show();
                                });

                                $(document).on('click', '.read-more-show', function (e) {
                                    e.preventDefault();
                                    var $parent = $(this).parent();
                                    $parent.find('ol li:gt()').show();
                                    $(this).hide();
                                    $parent.find('.read-more-hide').show();
                                });

                                // append the links to the HTML string
                                $html.append($readMore);
                                $html.append($readLess);
                            }

                            // Changing the date format
                            var originalDate = data.CreatedDate;
                            var originalMoment = moment(originalDate, originalFormat);
                            var newDate = originalMoment.format(newFormat);

                            // create HTML string
                            history += '<div class="history_section mb-0">' +
                                '<div class="user_history col-auto col-form-label lbl_flex">' +
                                '<div class="history_info"><span><i class="fas fa-user"></i></span> <span class="history_name">' + data.CreatedByName + '</span></div>' +
                                '<div style="display:flex;justify-content:end;align-items:center"><span class="date_font">' + newDate + '</span><span class="_download"><span' + (data.IsContainDocument == 0 ? ' style = "display:none"' : "") + ' ><i onclick="onClickViewToDownload(\'' + data.ProjectCode + '\',\'' + data.CreatedBy + '\',\'' + data.CreatedDate + '\')" class="fa fa-files-o" title="View Documents"></i></span></span></div > ' +
                                '</div>' +
                                '<p>' + $html.html() + '</p>' +
                                '</div>';

                        });

                        $('#DynamicHistory').append(history);
                        $('.read-more-show,.read-more-hide').css({ "font-size": "13px", "margin-left": "3vh" });

                        /*readMoreReadLess();*/
                    }
                    else {
                        $('#DynamicHistory').empty();
                        $('#DynamicHistory').append('<p>No Comments Available</p>');
                    }
                    
                }
                else {
                    debugger
                    alert(result.message)
                }
            },
            error: function (result)
            {
                debugger
                alert(result.message);
            }

        })
    //    alert('FromDate:' + fromDate + '  ToDate:' + toDate + '')
    }
});

$('#FromDate').change(function () {
    if(flag){
        if ($(this).val() != '') {
            $('#FromDate_Err').text('');
        }
        flag = true;
        }
   
})
$('#ToDate').change(function () {
    debugger
    if (flag) {
        if ($(this).val() != '') {
            $('#ToDate_Err').text('');
        }
        flag = true;
    }
})



    colmodels = [
        //{
        //    name: 'Volume',
        //    label: 'Volume',
        //    resizable: true,
        //    ignoreCase: true,
        //    width: 70,
        //},
        {
            name: 'TargetTTD',
            label: 'Target TTD',
            width: 85,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'TargetProductionDate',
            label: 'Target Production Date',
            resizable: true,
            ignoreCase: true,
            width: 85,
        },
        {
            name: 'TargetCost',
            label: 'Accepted Target Cost',
            resizable: true,
            ignoreCase: true,
            width: 65,
        },
        {
            name: 'Currency',
            label: 'Currency',
            resizable: true,
            ignoreCase: true,
            width: 85,
        },

        {
            name: 'CreatedBy',
            label: 'Updated By',
            resizable: true,
            ignoreCase: true,
            width: 85,
        },
        {
            name: 'CreatedOn',
            label: 'Updated On',
            resizable: true,
            ignoreCase: true,
            width: 105,
            //formatter: 'date', formatoptions: { srcformat: 'Y-m-d h:i:s A', newformat: 'd M Y h:i A' }
        },
    ],

        $("#ViewHistoryGrid").jqGrid({
            url: '',
            datatype: 'local',
            data: JSON.parse($('#ViewInfoHistoryData').val()),
            mtype: 'GET',
            colModel: colmodels,
            loadonce: true,
            viewrecords: true,
            pager: '#ViewHistoryGrid_Pager',
            rowNum: JSON.parse($('#ViewInfoHistoryData').val()).length,
            scroll: 1,

            gridComplete: function () {
                var objRows = $("#ViewHistoryGrid tbody tr");
                var objHeader = $("#ViewHistoryGrid tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
                    for (i = 0; i < objFirstRowColumns.length; i++) {
                        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
    $("#ViewHistoryGrid").jqGrid('filterToolbar', {
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

$('#viewHistoryPopup').click(function () {
    $('#InfoModal').modal('show');
})



debugger
colmodels = [
    //{
    //    name: 'projectlead',
    //    label: 'projectlead',
    //    resizable: true,
    //    ignorecase: true,
    //    width: 70,
    //},
    {
        name: 'M1Quantity',
        label: 'M1 Quantity',
        width: 55,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M2Quantity',
        label: 'M2 Quantity',
        resizable: true,
        ignoreCase: true,
        width: 55,
    },
    {
        name: 'M3Quantity',
        label: 'M3 Quantity',
        resizable: true,
        ignoreCase: true,
        width: 55,
    },
    {
        name: 'Y1Quantity',
        label: 'Y1 Quantity',
        resizable: true,
        ignoreCase: true,
        width: 55,
    },

    {
        name: 'Y2Quantity',
        label: 'Y2 Quantity',
        resizable: true,
        ignoreCase: true,
        width: 55,
    },
    {
        name: 'Y3Quantity',
        label: 'Y3 Quantity',
        resizable: true,
        ignoreCase: true,
        width: 55,
    },
    {
        name: 'CreatedBy',
        label: 'Updated By',
        resizable: true,
        ignoreCase: true,
        width: 75,
    },
    {
        name: 'CreatedOn', 
        label: 'Updated On',
        resizable: true,
        ignoreCase: true,
        width: 85,
        //formatter: 'date', formatoptions: { srcformat: 'Y-m-d h:i:s A', newformat: 'd M Y h:i A' }
    },
],

    $("#VolumeHistoryGrid").jqGrid({
        url: '',
        datatype: 'local',
        data: JSON.parse($('#VolumeInfoHistoryData').val()),
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#VolumeHistoryGrid_Pager',
        rowNum: JSON.parse($('#VolumeInfoHistoryData').val()).length,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#VolumeHistoryGrid tbody tr");
            var objHeader = $("#VolumeHistoryGrid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#VolumeHistoryGrid").jqGrid('filterToolbar', {
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

$('#volumeHistoryPopup').click(function () {
    $('#InfoVolumeModel').modal('show');
})

$('#InfoModal,#InfoVolumeModel').on('hidden.bs.modal', function () {
    var grid = $('#ViewHistoryGrid')
    var grid2 = $('#VolumeHistoryGrid')

    $('.ui-search-input input').val('');
   
    grid.jqGrid('setGridParam', { search: false, postData: { filters: '' } });
    grid.trigger('reloadGrid', [{ page: 1 }]);

    grid2.jqGrid('setGridParam', { search: false, postData: { filters: '' } });
    grid2.trigger('reloadGrid', [{ page: 1 }]);
})
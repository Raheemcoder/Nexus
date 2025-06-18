
var data = JSON.parse($('#IdeationListData').val());
var colmodels = [

    {
        name: 'InnovationId',
        label: 'Innovation Id',
        width: 15,
        resizable: true,
        ignoreCase: true,
        sorttype: 'number',
        formatter: function (cellValue, options, rowObject) {
            var dataAttribute = 'data-innovationid="' + rowObject.InnovationId + '"';
            return '<div ' + dataAttribute + '>' + cellValue + '</div>';
        }
    },
    {
        name: 'InnovationTitle',
        label: 'Innovation Title',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BusinessDivisionName',
        label: 'Platform Domain',
        width: 40,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'PlatformTypeName',
        label: 'Platform Type',
        width: 40,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'GeographicName',
        label: 'Geographic Scope',
        width: 40,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'StatusName',
        label: 'Status',
        width: 20,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.StatusName == "Pending") {
                return '<a href="#"> <span class="text-warning">Pending</span></a>';
            }
            else if (rowobject.StatusName == "Approved") {
                return '<a href="#"  > <span class="text-success">Approved</span></a>';
            }
            else if (rowobject.StatusName == "Declined") {
                return '<a href="#"> <span class="text-danger">Declined</span></a>';
            }
            else if (rowobject.StatusName == "SendBack") {
                return '<a  href="#"> <span class="text-info">SendBack</span></a>';
            }
            else if (rowobject.StatusName == "Existing") {
                return '<a  href="#"> <span class="text-primary">Existing</span></a>';
            }
            else {
                return " ";

            }

        }
    },
    {
        name: 'CreatedBy',
        label: 'Submitted By',
        width: 30,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedDate',
        label: 'Submitted Date',
        width: 30,
        resizable: true,
        ignoreCase: true,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd M Y' },
        searchoptions: {
            sopt: ['eq'],
            dataInit: function (e) {
                $(e).datepicker({
                    format: 'dd M yyyy',
                    autoclose: true
                }).change(function () {
                    $('#ideation_grid')[0].triggerToolbar();
                });

            }
        }
    },
        
];
$(document).ready(function () {
    $("#StartDate").datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        autoclose: true,
        clearBtn: true
    }).on('changeDate', function (selected) {
        debugger;
        var startDate = new Date(selected.date.valueOf());
        var endDate = $('#EndDate').datepicker('getDate');
        var today = new Date();
        startDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        $('#EndDate').datepicker('setStartDate', startDate);
        if (startDate <= today) {
            $('#EndDate').datepicker('update', today);
            return false;
        }
        if (startDate > endDate) {
            $('#EndDate').val("");
            return false;
        }
    });
    $('#EndDate').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        autoclose: true,
        clearBtn: true
    });
    $('#EndDate').datepicker('setStartDate', $("#StartDate").datepicker('getDate'));
    createJqgrid(data);
});
//function GetList() {
//    debugger;
//    var startdate = $("#StartDate").val();
//    var enddate = $("#EndDate").val();
//    var platformdomain = $("#BusinessDivisionId").val();
//    var platformtype = $("#PlatformTypeId").val();
//    var geographicscope = $("#GeographicId").val();
//    var status = $("#StatusId").val();
//    $.ajax({
//        type: "GET",
//        url: ROOT + "NewInnovation/GetIdeationSearchedResult",
//        data: { startdate: startdate, enddate: enddate, platformdomainid: platformdomain, platformtypeid: platformtype, geographicscopeid: geographicscope, statusid: status },
//        dataType: 'JSON',
//        success: function (result) {
//            debugger;
//            createJqgrid(result)
//        },
//    });
//}
function createJqgrid(data) {
    $.jgrid.gridUnload('#ideation_grid');
    $("#ideation_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#ideation_pager',
        rowNum: 20,
        scroll: 1,
        onSelectRow: function (rowid) {
            debugger;
            var rowData = $("#ideation_grid").jqGrid('getRowData', rowid);
            var innovationId = rowData['innovationid'];  // Adjust this key based on your colModel definition
        },
        gridComplete: function () {
            var objRows = $("#ideation_grid tbody tr");
            var objHeader = $("#ideation_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 270px)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "10px");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "10px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
    }

    $("#ideation_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
$("#btn-search").on('click', function () {
    var isValid = true;
    var startdate = $("#StartDate").val();
    var enddate = $("#EndDate").val();
    var platformdomain = $("#BusinessDivisionId").val();
    var platformtype = $("#PlatformTypeId").val();
    var geographicscope = $("#GeographicId").val();
    var status = $("#StatusId").val();
    if ((startdate == '' || startdate == null) && (enddate == '' || enddate == null)) {
        alert('Please select Start Date and End Date')
        isValid = false
        return false;
    }
    if (startdate == '' || startdate == null) {
        alert('Please select Start Date')
        isValid = false
        return false;

    }
    if (enddate == '' || enddate == null) {
        alert('Please select End Date')
        isValid = false
        return false;
    }
    if (isValid) {
        $.ajax({
            type: "GET",
            url: ROOT + "NewIdeation/GetIdeationSearchedResult",
            data: { startdate: startdate, enddate: enddate, platformdomainid: platformdomain, platformtypeid: platformtype, geographicid: geographicscope, statusid: status },
            dataType: 'JSON',
            success: function (result) {
                createJqgrid(result)
            },
        });
    }

    
});
$("#btn-refresh").on('click', function () {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var startformattedDate = day + "-" + month + "-" + year;
    $("#StartDate").val(startformattedDate);

    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();
    var formattedDate = day + '-' + month + '-' + year;

    $("#EndDate").val(formattedDate);

    $("#BusinessDivisionId").val('').trigger('change');
    $("#PlatformTypeId").val('').trigger('change');
    $("#GeographicId").val('').trigger('change');
    $("#StatusId").val(2).trigger('change');
    createJqgrid(data);
});
$('#exporttoexcel').on('click', function () {

    var startdate = $("#StartDate").val();
    var enddate = $("#EndDate").val();
    var platformdomain = $("#BusinessDivisionId").val();
    var platformtype = $("#PlatformTypeId").val();
    var geographicscope = $("#GeographicId").val();
    var status = $("#StatusId").val();
    window.location.href = ROOT + "NewIdeation/GetIdeationExceldata?startdate=" + startdate + "&&enddate=" + enddate + "&&platformdomainid=" + platformdomain + "&&platformtypeid=" + platformtype + "&&geographicid=" + geographicscope + "&&statusid=" + status;


});
$('.ideationdata_table').on('click', '#ideation_grid tr.jqgrow', function () {
    var innovationId = $(this).find('div[data-innovationid]').attr('data-innovationid');
    var role = $('#role').val();
    $.ajax({
        type: "POST",
        url: ROOT + "NewIdeation/GetIdeationById",
        data: { InnovationId: parseInt(innovationId) },
        dataType: "json",
        success: function (response) {
            $('.valStatus').hide();
            if (response == '') {
                alert("Please enter the correct no");
            }
            else {
                if (response != null) {
                    $('#Innovation_Details').modal('show');
                    var tabledata = ' <tr>  <td class="rd">' + response.BusinessDivisionName + '</td>' +
                        '<td>' + response.CreatedBy + '</td>' + '<td>' + response.CreatedDate + '</td>' +
                        '<td>' + response.StatusName + '</td>' + '<td>' + response.ActionBy + '</td>' +
                        '<td><a class="remark" target="_blank" data-bs-toggle="modal" data-bs-target="#remarkModal" data-bs-dismiss="modal" data-val="' + response.InnovationId + '" ><i class="fa fa-download" aria-hidden="true"></i>View Remarks</a></td>';

                    $("#modal_innovationtile").text(response.InnovationTitle);
                    $("#modal_innovationid").val(innovationId);

                    $("#modal_keywords").val(response.Keyword);
                    $("#modal_keywords").attr("title", response.Keyword);


                    $("#modal_pt").val(response.PlatformTypeName);
                    $("#modal_pt").attr("title", response.PlatformTypeName);

                    $("#modal_other").val(response.Other);
                    $("#modal_other").attr("title", response.Other);

                    $("#modal_bd").val(response.BusinessDivisionName);
                    $("#modal_bd").attr("title", response.BusinessDivisionName);

                    $("#modal_gs").val(response.GeographicName);
                    $("#modal_gs").attr("title", response.GeographicName);

                    $("#modal_region").val(response.Region);
                    $("#modal_region").attr("title", response.Region);

                    $("#modal_st").val(response.StrategicFitName);
                    $("#modal_st").attr("title", response.StrategicFitName);

                    $("#modal_description").val(response.Description);
                    $("#modal_description").attr("title", response.Description);

                    $("#modal_CreatedBy").val(response.CreatedBy);
                    $("#modal_CreatedBy").attr("title", response.CreatedBy);

                    $("#modal_status").val();
                    if (role.toLowerCase() == 'view ideation') {
                        $('#remarkfield').hide();
                        $('#remarkDrop').hide();
                        $('#model_submit').hide();
                        if (response.FilePath == null || response.FilePath == '') {
                            $("#model_filedownload").hide();
                            $("#filelabel").hide();
                        } else {
                            $("#model_filedownload").show();
                            $("#filelabel").show();
                            $("#model_filedownload").attr("href", ROOT + "imageUpload/" + response.FilePath);
                        }
                        $("#modal_table tbody").html(tabledata);

                    }

                    else { 
                        //$("#modal_remarks").val(response.Remarks);
                        $("#modal_remarks").attr("title", response.Remarks);

                        $("#mailDrop").hide();
                        $("#modal_status").change(function () {
                            var statusId = $(this).val();
                            var statusName = $("#modal_status option:selected").text()

                            $.ajax({
                                type: "POST",
                                url: ROOT + "NewIdeation/GetRemarkDiscription",
                                data: { RemarkId: statusId },
                                dataType: "json",
                                success: function (result) {
                                    if (result != null && result != 0) {
                                        $("#mailDrop").show();
                                        $(".valStatus").hide();
                                        $("#modal_emailcontent").val(result[0].RemarkDiscription);
                                    }
                                    else {
                                        $(".valStatus").show();
                                        $("#loader").hide();
                                    }
                                    if (statusId == 5 || statusId == 4 || statusId == '') {
                                        $("#mailDrop").hide();
                                    }

                                },
                                error: function () {
                                    alert("Error occured!!");
                                }
                            })

                        });
                        debugger;
                        if (response.FilePath == null || response.FilePath == '') {
                            $("#model_filedownload").hide();
                            $("#filelabel").hide();
                        } else {
                            $("#model_filedownload").show();
                            $("#filelabel").show();
                            $("#model_filedownload").attr("href", ROOT + "imageUpload/" + response.FilePath);
                        }
                    
                        $("#modal_table tbody").html(tabledata);

                        if (response.StatusName == 'Approved' || response.StatusName == 'Declined' || response.StatusName == 'SendBack' || response.StatusName == 'Existing') {
                            $("#modal_buttons").hide();
                            $("#remarkfield").hide();
                            $("#remarkDrop").hide();
                        } else {
                            $("#modal_buttons").show();
                            $("#remarkfield").show();
                            $("#remarkDrop").show();
                        }

                        $("#Innovation_Details").css({ opacity: 1 });
                        $("#Innovation_Details").show();
                        $("body").addClass("modal-open");
                    }
                }
                
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

});

$("#modalclose").click(function () {
    $("#Innovation_Details").css({ opacity: 0 });
    $("#Innovation_Details").hide();
    $("body").removeClass("modal-open");
});

$(".valStatus").hide();
$("#model_submit").click(function () {
    var action = "";
    var statusValue = 0;
    if ($("#modal_status").val() != '' && $("#modal_status").val() != null) {
        $(".valStatus").hide();
        if ($("#modal_remarks").val() == '') {
            if ($("#modal_status").val() == 5) {
                alert('Please enter remarks');
            } else {

                if ($("#modal_status").val() == 1) {
                    statusValue = 1;
                    action = 'Declined';
                } else if ($("#modal_status").val() == 2) {
                    statusValue = 5;
                    action = 'Existing';
                } else if ($("#modal_status").val() == 3) {
                    statusValue = 3;
                    action = 'Approved';
                } else if ($("#modal_status").val() == 5) {
                    statusValue = 4;
                    action = 'SendBack';
                }

                var idstats = { InnvoationId: $("#modal_innovationid").val(), ActionBy: "", Action: action, Remarks: $("#modal_remarks").val(), RemarkId: $("#modal_status").val(), StatusId: statusValue, CreatedBy: $("#modal_CreatedBy").val(), InnovationTitle: $("#modal_innovationtile").text() };

                ideationstatu(idstats);
            }
        } else {

            if ($("#modal_status").val() == 1) {
                statusValue = 1;
                action = 'Declined';
            } else if ($("#modal_status").val() == 2) {
                statusValue = 5;
                action = 'Existing';
            } else if ($("#modal_status").val() == 3) {
                statusValue = 3;
                action = 'Approved';
            } else if ($("#modal_status").val() == 5) {
                statusValue = 4;
                action = 'SendBack';
            }

            var idstats = { InnvoationId: $("#modal_innovationid").val(), ActionBy: "", Action: action, Remarks: $("#modal_remarks").val(), RemarkId: $("#modal_status").val(), StatusId: statusValue, CreatedBy: $("#modal_CreatedBy").val(), InnovationTitle: $("#modal_innovationtile").text() };
            ideationstatu(idstats);
        }
    } else {
        $(".valStatus").show();
    }
});
function ideationstatu(istats) {
    debugger;
    $.ajax({
        type: "POST",
        url: ROOT + "NewIdeation/UpdateIdeationStatus",
        data: { idstats: istats },
        dataType: "json",
        success: function (response) {
            alert("Change is Submited Successfully");
            $("#Innovation_Details").css({ opacity: 0 });
            $("#Innovation_Details").hide();
            $("body").removeClass("modal-open");

            window.location.reload();

        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

//view remark-----

$("body").on('click', '.remark', function () {
    var innovationValue = $(this).data('val');
    $.ajax({
        type: "POST",
        url: ROOT + "NewIdeation/GetIdeationRemarks",
        data: { InnovationId: innovationValue },
        dataType: "json",
        success: function (response) {
            if (response != null) {
                $("#remark_body").empty();
                $.each(response, function (i, obj) {
                    var tabledata = ' <tr>  <td class="rd">' + obj.BusinessDivisionName + '</td>' +
                        '<td>' + obj.CreatedBy + '</td>' + '<td>' + obj.CreatedDate + '</td>' +
                        '<td>' + obj.StatusName + '</td>' + '<td>' + obj.ActionBy + '</td>' +
                        '<td>' + obj.RemarkName + '</td>' +
                        '<tr>'
                    $("#remark_body").append(tabledata);
                })
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });


});
$('#closemodal').on('click', function () {
    $('#modal_remarks').val('');
    $('#modal_status').val('');
    $('.valStatus').hide();

})




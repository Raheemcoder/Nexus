$(".example-dropUp").multiselect({
    enableFiltering: true,
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    maxHeight: 500,
    buttonWidth: '100%',
    dropUp: true
});

var isSubmitted = false;

$('#weekpicker').datepicker({
    autoclose: true,
    viewMode: 'months',
    forceParse: false
})
    .on("changeDate", function (e) {
        var date = e.date;
        var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
        var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
        $('#weekpicker').datepicker('update', startDate);
        $('#weekpicker').val(('0' + startDate.getDate()).slice(-2) + '/' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '/' + startDate.getFullYear() + ' - '
            + ('0' + endDate.getDate()).slice(-2) + '/' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '/' + endDate.getFullYear());
    });
$(function () {
    var startDate = new Date(moment($('#WeekPickerHidden').val(), "DD/MM/YYYY"));
    var endDate = new Date(moment($('#WeekPickerHidden').val(), "DD/MM/YYYY").add(6, 'days'));
    $('#weekpicker').datepicker('update', startDate);
    mDate = endDate;
    $('#weekpicker').val(('0' + startDate.getDate()).slice(-2) + '/' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '/' + startDate.getFullYear() + ' - '
        + ('0' + endDate.getDate()).slice(-2) + '/' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '/' + endDate.getFullYear());
});

var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

var val = [];
$(document).ready(function () {
    debugger

    var a = $('#selectedUsers').val();
    var val = a.split(',');
    //$('#TEffortTracker tbody tr').each(function (i, obj) {
    //    debugger
    //    var columnIndex = $(this).index();

    //    var currentRow = $(this).closest("tr");

    //    var userID = $.trim(currentRow.find("td:eq(1) input").val());
    //    val.push(userID);
    //});
    for (var i = 0; i < val.length; i++) {
        debugger
        $("#UsersBasedOnManager option[value='" + val[i] + "']").attr("selected", "selected");

    }

    $("#UsersBasedOnManager").multiselect("refresh");


});

$("#searchbtn").on('click', function () {
    debugger;
    var RangeDate = $("#weekpicker").val().split("-");
    var StartDate = $.trim(RangeDate[0]);
    var EndDate = $.trim(RangeDate[1]);
    var Id = $("#UsersBasedOnManager").val();
    if (Id != []) {
        var userId = $("#UsersBasedOnManager").val().toString();
    }
    Id == [] ? $("#Error_UserName").show() : $("#Error_UserName").hide();
    StartDate == "" && EndDate == "" ? $("#Error_Datepicker").show() : $("#Error_Datepicker").hide();
    debugger
    if (StartDate != "" && EndDate != "" && userId != "") {
        window.location.href = ROOT + 'EffortTracker/Approve?q=' + Encrypt('UserID=' + userId + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&isSearch=' + 'Searched');
    }

});


$("#UsersBasedOnManager").change(function () {
    $("#Error_UserName").hide()
});

$("#weekpicker").change(function () {
    $("#Error_Datepicker").hide()
});


$('#TEffortTracker tbody td').click(function () {
    debugger;
    var columnIndex = $(this).index();

    var currentRow = $(this).closest("tr");

    var userID = $.trim(currentRow.find("td:eq(1) input").val());

    var getd = currentRow.find("td");

    var startday = $.trim($('#TEffortTracker th').eq(3).text());

    var endday = $.trim($('#TEffortTracker th').eq(getd.length - 2).text());

    debugger
    if (columnIndex == 0 || columnIndex == 1 || columnIndex == 2) {

    }
    else {
        var effortsDate = $.trim($('#TEffortTracker th').eq(columnIndex).text());

        $.ajax({
            type: "Get",
            url: ROOT + "EffortTracker/Approve_PV",
            data: { UserID: userID, StartDate: startday, EndDate: endday, EffortsDate: effortsDate },
            dataType: 'HTML',
            success: function (data) {
                debugger;
                console.log(data);
                $('#pv_insertupdate').html('');
                $('#pv_insertupdate').html(data);
                $('#edit_popup').modal('show');
                //    var $form = $('#ApprovePV_ID');
            },

            error: function () {
                alert("Error occured!!");
            }
        });
    }
});



$("#ApproveData").on('click', function () {
    debugger
    var flag = true;
    var data = getDetails();
    data == 0 ? flag = false : flag = true;
    var dateSplit = $('#weekpicker').val().split("-");
    $('#TEffortTracker tr').each(function (i, obj) {
        if ($(this).find('.childCheckBox').prop('checked')) {
            var countTd = 0;
            for (var index = 1; index <= 7; index++) {
                var day = "day" + (index);
                if (countTd > 0) {
                    $(this).find('.text-danger').hide();
                    flag = true;
                }
            }
        }
    });
    if (flag) {

        confirm("Are you sure you sure you want to Approve the efforts", function () {
            $("#JsonData").val(JSON.stringify(data));

            if (isSubmitted) {
                return false;
            }
            isSubmitted = true;

            $.ajax({
                url: ROOT + "EffortTracker/SaveApproveData",
                type: "POST",
                async: false,
                dataType: "json",
                data: { EffortDetails: JSON.stringify(data) },
                success: function (data1) {
                    isSubmitted = false;
                    location.reload();
                },
                error: function () {
                    isSubmitted = false;
                }

            });
        });
       
    }
});

function getDetails() {
    debugger
    var EfforList = []
    var dateSplit = $("#weekpicker").val().split("-");//date
    count = 0;
    $("#TEffortTracker tr").each(function (i, obj) {
        if ($(obj).find('.childCheckBox').prop('checked')) {
            count++;
            var tr = $(this);
            var UserId = $(tr).find(".childCheckBox").val();
            Remarks = $(".GetRemarks").val();
            for (var index = 1; index <= 7; index++) {

                var day = "day" + (index);
                var efforts = $(tr).find("." + day).val();
                if (efforts !== null && efforts !== '' && typeof (efforts) !== "undefined" /*&& parseFloat(efforts) !== 0.0*/) {

                    var dateParts = moment(dateSplit[0], "DD/MM/YYYY").add((index - 1), 'days').format("YYYY-MM-DD");
                    EfforList.push({ "UserId": UserId, "EffortDate": dateParts, "Remarks": Remarks, "Status": 1 })
                }
            }
        }
    });
    if (count > 0)
        return EfforList;
    else {
        $('#NoRecordsSelectedErr').show();
        $(window).scrollTop($('#nav-home').position().top)

        return 0;
    }
}

//For Send Back
$(".GetRemarks").on('keypress change', function () {
    $("#Error_To_send_back").hide();
});

$("#SendBack").on('click', function () {
       debugger
        var flag = true;
        Remarks = $(".GetRemarks").val();
    Remarks == "" ? ($("#Error_To_send_back").show(), flag = false) : $("#Error_To_send_back").hide();

    var count = 0;
    $("#TEffortTracker tr").each(function (i, obj) {
        if ($(obj).find('.childCheckBox').prop('checked')) {
            count++;
        }
    });
    if (count == 0)
    {
        $('#NoRecordsSelectedErr').show();
        flag = false
    }

        if (flag == true) {
            var data = getSendBackDetails();
        }

        data == 0 || data == "undefined" || data == null ? flag = false : flag = true;
        var dateSplit = $('#weekpicker').val().split("-");
        $('#TEffortTracker tr').each(function (i, obj) {
            if ($(this).find('.childCheckBox').prop('checked')) {
                var countTd = 0;
                for (var index = 1; index <= 7; index++) {
                    var day = "day" + (index);
                    if (countTd > 0) {
                        $(this).find('.text-danger').hide();
                        flag = true;
                    }
                }
            }
        });
    if (flag) {

        confirm("Are you sure you want to Send Back", function () {
            $("#JsonData").val(JSON.stringify(data));


            if (isSubmitted) {
                return false;
            }
            isSubmitted = true;

            $.ajax({
                url: ROOT + "EffortTracker/SaveSendBackData",
                type: "POST",
                async: false,
                dataType: "json",
                data: { EffortDetails: JSON.stringify(data) },
                success: function (data1) {
                    isSubmitted = false;
                    location.reload();
                },
                error: function () {
                    isSubmitted = false;
                }

            });

        });
       
           
        
    }
    
});

function getSendBackDetails() {
    debugger
    var EfforList = []
    var dateSplit = $("#weekpicker").val().split("-");//date
    count = 0;
    $("#TEffortTracker tr").each(function (i, obj) {
        if ($(obj).find('.childCheckBox').prop('checked')) {
            count++;
            var tr = $(this);
            var UserId = $(tr).find(".childCheckBox").val();
            Remarks = $(".GetRemarks").val();

            for (var index = 1; index <= 7; index++) {
                var day = "day" + (index);
                var efforts = $(tr).find("." + day).val();
                if (efforts !== null && efforts !== '' && typeof (efforts) !== "undefined" /*&& parseFloat(efforts) !== 0.0*/) {

                    var dateParts = moment(dateSplit[0], "DD/MM/YYYY").add((index - 1), 'days').format("YYYY-MM-DD");
                    EfforList.push({ "UserId": UserId, "EffortDate": dateParts, "Remarks": Remarks, "Status": 2})
                }
            }
        }
    });
    if (count > 0)
        return EfforList;
    else {
        $('#NoRecordsSelectedErr').show();
        $(window).scrollTop($('#nav-home').position().top)

        return 0;
    }
}

//$('.data-singleselect').select2()

$('#data-singleselect').select2()
$(".js-select2").select2({

    placeholder: "Select HUB",
    allowHtml: true,
    allowClear: false,
    includeSelectAllOption: true,
});

$('#data-singleselect').select2({ dropdownParent: $('#edit_popup') });

$(document).ready(function () {
    $('#table_body tr').each(function (i, obj) {

        var colday1 = $(obj).find('.day1').val() === null || $(obj).find('.day1').val() === '' || typeof ($(obj).find('.day1').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day1').val());
        colday1 += $(obj).find('.dayApportion1').val() === null || $(obj).find('.dayApportion1').val() === '' || typeof ($(obj).find('.dayApportion1').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion1').val());
        var colday2 = $(obj).find('.day2').val() === null || $(obj).find('.day2').val() === '' || typeof ($(obj).find('.day2').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day2').val());
        colday2 += $(obj).find('.dayApportion2').val() === null || $(obj).find('.dayApportion2').val() === '' || typeof ($(obj).find('.dayApportion2').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion2').val());

        var colday3 = $(obj).find('.day3').val() === null || $(obj).find('.day3').val() === '' || typeof ($(obj).find('.day3').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day3').val());
        colday3 += $(obj).find('.dayApportion3').val() === null || $(obj).find('.dayApportion3').val() === '' || typeof ($(obj).find('.dayApportion3').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion3').val());

        var colday4 = $(obj).find('.day4').val() === null || $(obj).find('.day4').val() === '' || typeof ($(obj).find('.day4').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day4').val());
        colday4 += $(obj).find('.dayApportion4').val() === null || $(obj).find('.dayApportion4').val() === '' || typeof ($(obj).find('.dayApportion4').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion4').val());

        var colday5 = $(obj).find('.day5').val() === null || $(obj).find('.day5').val() === '' || typeof ($(obj).find('.day5').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day5').val());
        colday5 += $(obj).find('.dayApportion5').val() === null || $(obj).find('.dayApportion5').val() === '' || typeof ($(obj).find('.dayApportion5').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion5').val());

        var colday6 = $(obj).find('.day6').val() === null || $(obj).find('.day6').val() === '' || typeof ($(obj).find('.day6').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day6').val());
        colday6 += $(obj).find('.dayApportion6').val() === null || $(obj).find('.dayApportion6').val() === '' || typeof ($(obj).find('.dayApportion6').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion6').val());

        var colday7 = $(obj).find('.day7').val() === null || $(obj).find('.day7').val() === '' || typeof ($(obj).find('.day7').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day7').val());
        colday7 += $(obj).find('.dayApportion7').val() === null || $(obj).find('.dayApportion7').val() === '' || typeof ($(obj).find('.dayApportion7').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion7').val());

        $(obj).find('.righttotal').text((colday1 + colday2 + colday3 + colday4 + colday5 + colday6 + colday7).toFixed(2))
    })
});


$('.childCheckBox').change(function () {
    if ($(this).prop('checked')) {
        $('#NoRecordsSelectedErr').hide();
    }
    
}) 
   
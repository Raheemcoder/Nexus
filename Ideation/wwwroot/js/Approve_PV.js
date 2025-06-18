
$(document).ready(function () {
    handler();
});

function handler(e) {
    debugger

    var day1Total = 0.0; var day2Total = 0.0; var day3Total = 0.0; var day4Total = 0.0;
    var day5Total = 0.0; var day6Total = 0.0; var day7Total = 0.0;

    $('.day1val').each(function (i, obj) {
        day1Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" || $(obj).val() == NaN ? 0.0 : parseFloat($(obj).val().replace(/[()]/g, ''))
        $('#day1totalval').text(day1Total.toFixed(2));
    })
    $('.day2val').each(function (i, obj) {
        day2Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val().replace(/[()]/g, ''))
        $('#day2totalval').text(day2Total.toFixed(2));
    })
    $('.day3val').each(function (i, obj) {
        day3Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val().replace(/[()]/g, ''))
        $('#day3totalval').text(day3Total.toFixed(2));
    })
    $('.day4val').each(function (i, obj) {
        day4Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val().replace(/[()]/g, ''))
        $('#day4totalval').text(day4Total.toFixed(2));
    })
    $('.day5val').each(function (i, obj) {
        day5Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val().replace(/[()]/g, ''))
        $('#day5totalval').text(day5Total.toFixed(2));
    })
    $('.day6val').each(function (i, obj) {
        day6Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val().replace(/[()]/g, ''))
        $('#day6totalval').text(day6Total.toFixed(2));
    })
    $('.day7val').each(function (i, obj) {
        day7Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val().replace(/[()]/g, ''))
        $('#day7totalval').text(day7Total.toFixed(2));
    })

    $('#TEffortTrackerPopUp tr').each(function (i, obj) {

        var colday1 = $(obj).find('.day1val').val() === null || $(obj).find('.day1val').val() === '' || typeof ($(obj).find('.day1val').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day1val').val());
        colday1 += $(obj).find('.dayApportion1').val() === null || $(obj).find('.dayApportion1').val() === '' || typeof ($(obj).find('.dayApportion1').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion1').val().replace(/[()]/g, ''));

        var colday2 = $(obj).find('.day2val').val() === null || $(obj).find('.day2val').val() === '' || typeof ($(obj).find('.day2val').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day2val').val());
        colday2 += $(obj).find('.dayApportion2').val() === null || $(obj).find('.dayApportion2').val() === '' || typeof ($(obj).find('.dayApportion2').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion2').val().replace(/[()]/g, ''));

        var colday3 = $(obj).find('.day3val').val() === null || $(obj).find('.day3val').val() === '' || typeof ($(obj).find('.day3val').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day3val').val());
        colday3 += $(obj).find('.dayApportion3').val() === null || $(obj).find('.dayApportion3').val() === '' || typeof ($(obj).find('.dayApportion3').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion3').val().replace(/[()]/g, ''));

        var colday4 = $(obj).find('.day4val').val() === null || $(obj).find('.day4val').val() === '' || typeof ($(obj).find('.day4val').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day4val').val());
        colday4 += $(obj).find('.dayApportion4').val() === null || $(obj).find('.dayApportion4').val() === '' || typeof ($(obj).find('.dayApportion4').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion4').val().replace(/[()]/g, ''));

        var colday5 = $(obj).find('.day5val').val() === null || $(obj).find('.day5val').val() === '' || typeof ($(obj).find('.day5val').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day5val').val());
        colday5 += $(obj).find('.dayApportion5').val() === null || $(obj).find('.dayApportion5').val() === '' || typeof ($(obj).find('.dayApportion5').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion5').val().replace(/[()]/g, ''));

        var colday6 = $(obj).find('.day6val').val() === null || $(obj).find('.day6val').val() === '' || typeof ($(obj).find('.day6val').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day6val').val());
        colday5 += $(obj).find('.dayApportion6').val() === null || $(obj).find('.dayApportion6').val() === '' || typeof ($(obj).find('.dayApportion6').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion6').val().replace(/[()]/g, ''));

        var colday7 = $(obj).find('.day7val').val() === null || $(obj).find('.day7val').val() === '' || typeof ($(obj).find('.day7val').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day7val').val());
        colday7 += $(obj).find('.dayApportion7').val() === null || $(obj).find('.dayApportion7').val() === '' || typeof ($(obj).find('.dayApportion7').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.dayApportion7').val().replace(/[()]/g, ''));

        $(obj).find('.righttotal').text((colday1 + colday2 + colday3 + colday4 + colday5 + colday6 + colday7).toFixed(2))
    })
    $('#FinalTotal').text((day1Total + day2Total + day3Total + day4Total + day5Total + day6Total + day7Total).toFixed(2))
}


//$('#TEffortTrackerPopUp tbody td').hover(function () {
//    debugger
//    var val = $(this).find('input').eq(1).val();
//    if (val == undefined) {
//    }
//    else {
//        var ProjectId = $(this).closest('tr').find('.projectid').val();
//        var columnIndex = $(this).index();
//        var effortsDate = $.trim($('#TEffortTrackerPopUp th').eq(columnIndex).text());
//        var userID = $('#TEffortTrackerPopUp thead').attr("class");
//        $.ajax({
//            type: "Get",
//            url: ROOT + "EffortTracker/ApportionEffortsForApprovepage",
//            data: { UserID: userID, EffortsDate: effortsDate, ProjectId: ProjectId },
//            dataType: 'HTML',
//            success: function (data) {
//                $('#EffortsBasedOnTask thead').empty();
//                $('#EffortsBasedOnTask tbody').empty();
//                debugger
//                console.log(data)
//                var d = $.parseJSON(data);

//                $('#showlist').modal('show');
//                var head = "<tr>"
//                var keys = Object.keys(d[0]);
//                console.log(keys);

//                head += "<th>" + keys[0] + "</th><th>" + keys[1] + "</th></tr>";
//                $('#EffortsBasedOnTask thead').append(head);

//                var body = "<tr>"
//                $(d).each(function (i, obj) {
//                    const values = Object.values(obj);
//                    for (let i = 0; i < values.length; i++) {
//                        body += "<td>" + values[i] + "</td>";

//                    }
//                    body += "</tr>"
//                    $('#EffortsBasedOnTask tbody').append(body);
//                });



//            },

//            error: function () {
//                alert("Error occured!!");
//            }
//        });


//    }
//},
//    function () {
//        $('#showlist').modal('hide');
//});

//function modalClose() {
//    $('#showlist').modal('hide');
//}
var ProjectList = [];
var count = 0;
var projecterrorcount = 0;
var RowNumber = "";
var mDate;
var isValidData = true;
var miscellaneousProjectId = "";
var isValidEfforts = 0;
var er = 0;
var ProjectsData=[];
var SelectedRecords=[];
var RecordsCount = 0;
var isSubmitted = false;


$(document).ready(function () {
    $('#table_body_shared').find("tr").remove();
    $.ajax({
        type: "POST",
        async: false,
        url: ROOT + 'EffortTracker/GetProjectList',
        data: { Division: '', Classification: '', ProjectType: '', RnD: '', IsFiltered: 'No' },
        dataType: 'json',
        success: function (result) {

            $('#table_body_shared').empty();
            $.each(result, function (i, obj) {
                ProjectsData.push(obj);
                create_tr(obj.ProjectCode, obj.ProjectName, obj.DivisionName, '');
            });
            RecordsCount = $('#table_body_shared').find('tr').length;
            $('#table_body_shared').prepend('<tr class="apportionFilter"><td></td><td><input type="text" class="form-control searchFilter" id="" placeholder="Search"></td><td class="tf_td text-danger"><label class="day1totalsplitvalue"></label><br><span class= "day1totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day2totalsplitvalue"></label><br><span class= "day2totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day3totalsplitvalue"></label><br><span class= "day3totalsplit text-danger font-weight:bold;" style = "display:none" > Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day4totalsplitvalue"></label><br><span class= "day4totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day5totalsplitvalue"></label><br><span class= "day5totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day6totalsplitvalue"></label><br><span class= "day6totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day7totalsplitvalue"></label><br><span class= "day7totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="FinalTotalSplit"></label></td></tr>');
            $('#tfoot').append('<tr><td colspan="10" class="tf_td text-right"><b><label class="mt-2">View 1 - ' + RecordsCount + ' of ' + RecordsCount + '</label></b></td></tr>');
        },
        error: function () {

        }

    });


})

$(document).ready(function () {
    $('.example-dropUp').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 500,
        buttonWidth: '100%',
        dropUp: true,
        autoclose: true
    });
});

$('#weekpicker').datepicker({
    autoclose: true,
    viewMode: 'months',
    forceParse: false,
    endDate: '+0d',
}).on("changeDate", function (e) {
    var date = e.date;
    var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
    //$('#weekpicker').datepicker("setDate", startDate);
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

$(".day1, .day7").css("background-color", "#ffd6b8");


function create_tr(projId, projName, division,state) {
    var checked = state == 'new' ? 'checked' : '';
    var disabled = state == 'new' ? '' : 'disabled';
    var addr = $("#ApportionTracker").find("tbody");
    var rowNo = $(addr).find("tr").length + 1;
    var Totalhr = "Totalhr";
    Totalhr = Totalhr + (rowNo)
    let tableRow1 = ` <tr class="valu" style="height:30px">
                                    <td style="text-align:center;">
                                        <div class="action_container">
                                            <input type="checkbox" value="`+ projId + `" class="childCheckBox" data-IsSelected="False" ` + checked +`>
                                        </div>
                                    </td>
                                    <td style="padding:0px;" >
                                     
                                           (`+ projId + `) (` + division + `) ` + projName +`
                                        
                                        <span class="projectiderrmsg text-danger" style="display:none">Please select Project</span>
                                    </td>
                                    <td style="padding:0px;">
                                    <input type="text" data-attr1="" class="form-control EfDaySplit number day1 day1split" data-attribute="1" style="background-color:#ffd6b8;height:6.4vh;" `+ disabled +`/);
">
                                    <span class="day1errormsg text-danger dayerrmsg" style="display:none">Please enter Efforts</span>
                                    <span class="effortGreater text-danger" style="display:none">The sum of manual and apportion efforts cannot be greater than 24 Hrs</span>
                                    </td>
                                     <td style="padding:0px;">
                                     <input type="text" data-attr2="" class="form-control EfDaySplit number day2 day2split" data-attribute="2" style="height:6.4vh;" `+ disabled +`/>
                                     <span class="day2errormsg text-danger dayerrmsg" style="display:none">Please enter Efforts</span>
    <span class="effortGreater text-danger" style="display:none">The sum of manual and apportion efforts cannot be greater than 24 Hrs</span>
                                     </td>
                                    <td style="padding:0px;">
                                    <input type="text" data-attr3="" class="form-control EfDaySplit number day3 day3split" data-attribute="3" style="height:6.4vh;" `+ disabled +`/>
                                    <span class="day3errormsg text-danger dayerrmsg" style="display:none">Please enter Efforts</span>
    <span class="effortGreater text-danger" style="display:none">The sum of manual and apportion efforts cannot be greater than 24 Hrs</span>
                                    </td>
                                    <td style="padding:0px;">
                                    <input type="text" data-attr4="" class="form-control EfDaySplit number day4 day4split" data-attribute="4" style="height:6.4vh;" `+ disabled +`/>
                                    <span class="day4errormsg text-danger dayerrmsg" style="display:none">Please enter Efforts</span>
    <span class="effortGreater text-danger" style="display:none">The sum of manual and apportion efforts cannot be greater than 24 Hrs</span>
                                    </td>
                                    <td style="padding:0px;">
                                    <input type="text" data-attr5="" class="form-control EfDaySplit number day5 day5split" data-attribute="5" style="height:6.4vh;" `+ disabled +`/>
                                    <span class="day5errormsg text-danger dayerrmsg" style="display:none">Please enter Efforts</span>
    <span class="effortGreater text-danger" style="display:none">The sum of manual and apportion efforts cannot be greater than 24 Hrs</span>
                                    </td>
                                     <td style="padding:0px;">
                                     <input type="text" data-attr6="" class="form-control EfDaySplit number day6 day6split" data-attribute="6" style="height:6.4vh;" `+ disabled +`/>
                                     <span class="day6errormsg text-danger dayerrmsg" style="display:none">Please enter Efforts</span>
    <span class="effortGreater text-danger" style="display:none">The sum of manual and apportion efforts cannot be greater than 24 Hrs</span>
                                     </td>
                                    <td style="padding:0px;">
                                    <input type="text" data-attr7="" class="form-control EfDaySplit number day7 day7split" data-attribute="7" style="background-color:#ffd6b8;height:6.4vh;" `+ disabled +`/>
                                    <span class="day7errormsg text-danger dayerrmsg" style="display:none">Please enter Efforts</span>
    <span class="effortGreater text-danger" style="display:none">The sum of manual and apportion efforts cannot be greater than 24 Hrs</span>
                                    </td>
                                    <td style="padding: 0;vertical-align: middle;text-align: center;color: blue;background: #e7ecf7;" class="righttotalsplit">0.00</td>
                                </tr>`
    $('#table_body_shared').append(tableRow1);
    $('.data-singleselect').select2();
}
var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$('.data-datepicker-month').datepicker({
    format: 'M-yyyy',
    viewMode: 'months',
    minViewMode: 'months',
    todayHighlight: true,
    autoclose: true,
    maxDate: mDate
});
$('.data-datepicker-month').datepicker('setDate', today);

$('.data-singleselect').select2()

$('[data-datepicker]').datepicker({
    todayHighlight: true,
    autoclose: true,
    maxDate: mDate
});

$(".js-select2").select2({

    placeholder: "Select HUB",
    allowHtml: true,
    allowClear: false,
    includeSelectAllOption: true,

});

$("#searchbtn").on('click', function () {

    var RangeDate = $("#weekpicker").val().split("-");
    var StartDate = $.trim(RangeDate[0]);
    var EndDate = $.trim(RangeDate[1]);
    window.location.href = ROOT + 'EffortTracker/Apportion?q=' + Encrypt('StartDate=' + StartDate + '&EndDate=' + EndDate);
});
var duplicateProjects = [];
function findDuplicates(arr) {
    return arr.filter((currentValue, currentIndex) =>
        arr.indexOf(currentValue) !== currentIndex);
}



$(".SaveData").on('click', function () {
    debugger
    $('#alertBox').text('');
    $('#alertBox').hide();
   
    var rowCount = 0;
    var errList = [];
    var errList2 = [];
    $('#table_body_shared tr').each(function (i, obj) {
        er = 0;
        $(obj).find('.childCheckBox').prop('checked') ? rowCount++ : "";
        $(obj).each(function (i, obj2) {
            $(obj2).find('.effortGreater:visible').length > 0 ? errList.push(1) : er + 0;
        })
    })

    $('#table_body tr').each(function (i, obj) {

        er = 0;
        $(obj).each(function (i, obj2) {
            $(obj2).find('.effortGreater:visible').length > 0 ? errList2.push(1) : er + 0;

        })

    })
    $('#Task').val() == '' ? ($('#ApportionTaskErr').show(), flag = false, $(window).scrollTop($('#myTabContent').position().top)) : $('#ApportionTaskErr').hide();
   // $('#Apportion_Remarks').val() == '' ? ($('#Error_ApportionRemarks').show(), flag = false, $(window).scrollTop($('#myTabContent').position().top)) : $('#Error_ApportionRemarks').hide();
    if (rowCount > 0) {
        
        var flag = true;
        var data = getDetails();
        data == 0 ? flag = false : flag = true;
        var gridlength = $('#table_body_shared tr').length - 1;
        var dateParts = $('#weekpicker').val().split("-");


        $('#table_body_shared tr').each(function (i, obj) {
            if ($(this).find('.childCheckBox').prop('checked')) {
                var countTd = 0;
                for (var index = 1; index <= 7; index++) {
                    var day = "day" + (index);
                    $(this).find('.' + day).val() == "" ? ($(this).find('.' + day + 'errormsg').show(), flag = false) : ($(this).find('.' + day + 'errormsg').hide(), countTd++);
                    if (countTd > 0) {
                        $(this).find('.dayerrmsg').hide();
                        flag = true;
                    }

                }
            }
        });

        $('#Division').val() == '' ? ($('#ApportionDivisionErr').show(), flag = false) : $('#ApportionDivivsionErr').hide();
        $('#Task').val() == '' ? ($('#ApportionTaskErr').show(), flag = false, $(window).scrollTop($('#myTabContent').position().top)) : $('#ApportionTaskErr').hide();
        $('#RnDTeam').val().toString() == '' ? ($('#ApportionProjectRnDErr').show(), flag = false) : $('#ApportionProjectRnDErr').hide();

        var division = $('#Division').val().toString();
        var classification = $('#Classification').val().toString();
        var task = $('#Task').val();
        var projectType = $('#ProjectType').val().toString();
        var rnd = $('#RnDTeam').val().toString();
        var remarks = $('#Apportion_Remarks').val();

        if (flag && isValidData && (errList.length == 0)) {
            debugger
            confirm("Please note that once Saved, the apportioned efforts cannot be updated. Do you want to continue?", function () {
                $("#JsonData").val(JSON.stringify(data));

                if (isSubmitted) {
                    return false;
                }
                isSubmitted = true;

                $.ajax({
                    url: ROOT + "EffortTracker/SaveApportionData",
                    type: "POST",
                    async: false,
                    dataType: "json",
                    data: { EffortDetails: JSON.stringify(data), Division: division, Classification: classification, TaskId: task, ProjectType: projectType, Rnd: rnd, Remarks: remarks },
                    success: function (data1) {
                        isSubmitted = false;
                        if (data1 === "Successfully Saved") {
                            location.reload();
                        }
                        else {
                            $('#alertBox').show();
                            $('#alertBox').append(data1);
                            setTimeout(function () {
                                $('#alertBox').fadeOut();
                            },6000)
                        }


                    },
                    error: function () {
                        isSubmitted = false;
                    }
                });
            });
        }
        console.log(isSubmitted);
    }
    else {
        $('#NoRecordsSelectedErr').show()
        //var flag = true;
        //$('#Task').val() == '' ? ($('#ApportionTaskErr').show(), flag = false, $(window).scrollTop($('#myTabContent').position().top)) : $('#ApportionTaskErr').hide();

        //if (flag) {
        //    var isMiscellaneous;
        //    var miscellaneousProject = "";

        //    $.ajax({

        //        type: "POST",
        //        url: ROOT + 'EffortTracker/GetProjectList',
        //        data: { Division: "Miscellaneous", Classification: "Miscellaneous", ProjectType: "Miscellaneous" },
        //        dataType: 'json',
        //        success: function (result) {
        //            $.each(result, function (i, obj) {

        //                miscellaneousProject = obj.ProjectCode + " - " + obj.ProjectName;
        //                miscellaneousProjectId = obj.ProjectCode;
        //            });


        //            var data = getMiscellaneousDetails();

        //            if (data != 0) {
        //                if (errList2.length == 0) {

        //                    var str = "Please note that if no other project is selected for apportion then the efforts will be saved automatically for the Project " + miscellaneousProject + ".<br><br>Once Saved,the apportioned efforts cannot be updated. Do you want to continue?";

        //                    var task = $('#Task').val();

        //                    confirm(str, function () {
        //                        if (isSubmitted) {
        //                            return false;
        //                        }
        //                        isSubmitted = true;
        //                        $.ajax({
        //                            url: ROOT + "EffortTracker/SaveApportionData",
        //                            type: "POST",
        //                            async: false,
        //                            dataType: "json",
        //                            data: { EffortDetails: JSON.stringify(data), TaskId: task },
        //                            success: function (data1) {
                                    
        //                                isSubmitted = false;

        //                                if (data1 === "Successfully Saved") {
        //                                    location.reload();
        //                                }
        //                                else {
        //                                    $('#alertBox').show();
        //                                    $('#alertBox').append(data1);
        //                                    setTimeout(function () {
        //                                        $('#alertBox').fadeOut();
        //                                    }, 6000)
        //                                }



        //                            },
        //                            error: function () {
        //                                isSubmitted = false;
        //                            }
        //                        });

        //                        isMiscellaneous = true;
        //                    });
        //                }

        //                else {
        //                    alert("Appotion Efforts + Manual Efforts exceeding for a day");
        //                }
        //            }
        //            else {
        //                $('#NoRecordsErr').show();
        //            }

        //        },
        //        error: function () {
        //            miscellaneousProject = "hello";
        //        }

        //    });




       // }
    }
});

function getDetails() {
    
    var EfforList = []
    var data = [];
    var dateSplit = $("#weekpicker").val().split("-");//date
    count = 0;


    $("#table_body_shared tr").each(function (i, obj) {
        
        if ($(obj).find('.childCheckBox').prop('checked')) {
            count++;
            var tr = $(this);
            var project = $(tr).find(".childCheckBox").val();

            for (var index = 1; index <= 7; index++) {
                
                var day = "day" + (index);
                var efforts = $(tr).find("." + day).val();
                if (efforts !== null && efforts !== '' && typeof (efforts) !== "undefined" && parseFloat(efforts) !== 0.0) {

                    var dateParts = moment(dateSplit[0], "DD/MM/YYYY").add((index - 1), 'days').format("YYYY-MM-DD");
                    EfforList.push({ "ProjectId": project, "EffortDate": dateParts, "EffortInHrs": parseFloat(efforts), "IsApportion": 1 })
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


function getMiscellaneousDetails() {


    var EfforList = []
    var dateSplit = $("#weekpicker").val().split("-");//date
    count = 0;

    $("#table_body tr").each(function (i, obj) {
        count++;
        for (var index = 1; index <= 7; index++) {


            var day = "day" + (index);
            var efforts = $(obj).find("." + day).val();
            if (efforts !== null && efforts !== '' && typeof (efforts) !== "undefined" && parseFloat(efforts) !== 0.0) {

                var dateParts = moment(dateSplit[0], "DD/MM/YYYY").add((index - 1), 'days').format("YYYY-MM-DD");
                EfforList.push({ "ProjectId": miscellaneousProjectId, "EffortDate": dateParts, "EffortInHrs": parseFloat(efforts), "IsApportion": 1 })
            }
        }
    });

    if (EfforList.length > 0)
        return EfforList;
    else {
        return 0;
    }

}


var JsonEfforts = $.parseJSON($('#JsonWeekEfforts').val());


var effortsArr = [];
var val1 = 0.0, val2 = 0.0, val3 = 0.0, val4 = 0.0, val5 = 0.0, val6 = 0.0, val7 = 0.0;

$(JsonEfforts).each(function (i, obj) {
    const keys = Object.values(obj);

    for (let i = 0; i < keys.length; i++) {

        i == 2 ? (val1 += keys[i] == "undefined" || keys[i] == null ? 0.0 : keys[i]) : "";

        i == 3 ? (val2 += keys[i] == "undefined" || keys[i] == null ? 0.0 : keys[i]) : "";

        i == 4 ? (val3 += keys[i] == "undefined" || keys[i] == null ? 0.0 : keys[i]) : "";

        i == 5 ? (val4 += keys[i] == "undefined" || keys[i] == null ? 0.0 : keys[i]) : "";

        i == 6 ? (val5 += keys[i] == "undefined" || keys[i] == null ? 0.0 : keys[i]) : "";

        i == 7 ? (val6 += keys[i] == "undefined" || keys[i] == null ? 0.0 : keys[i]) : "";

        i == 8 ? (val7 += keys[i] == "undefined" || keys[i] == null ? 0.0 : keys[i]) : "";
    }
});

effortsArr.push(val1, val2, val3, val4, val5, val6, val7);

$(document).on('keyup', '.EfDay', function () {
    $('#NoRecordsErr').hide();
    this.value = this.value.replace(/[^0-9.]/g, '');
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        var pattern = /^((([0-9])|1[0-9]|2[0-3])(\.[0-9]{0,2})?|24)$/;

        if (!pattern.test($(this).val())) {
            $(this).val($(this).val().slice(0, -1));
        }
        $(this).removeClass('-danger');
        $(this).siblings('span').hide();
    }
    var day1Total = 0.0; var day2Total = 0.0; var day3Total = 0.0; var day4Total = 0.0;
    var day5Total = 0.0; var day6Total = 0.0; var day7Total = 0.0;
    $('#table_body tr').each(function (i, obj) {
        var colday1 = $(obj).find('.day1').val() === null || $(obj).find('.day1').val() === '' || typeof ($(obj).find('.day1').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day1').val());
        var colday2 = $(obj).find('.day2').val() === null || $(obj).find('.day2').val() === '' || typeof ($(obj).find('.day2').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day2').val());
        var colday3 = $(obj).find('.day3').val() === null || $(obj).find('.day3').val() === '' || typeof ($(obj).find('.day3').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day3').val());
        var colday4 = $(obj).find('.day4').val() === null || $(obj).find('.day4').val() === '' || typeof ($(obj).find('.day4').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day4').val());
        var colday5 = $(obj).find('.day5').val() === null || $(obj).find('.day5').val() === '' || typeof ($(obj).find('.day5').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day5').val());
        var colday6 = $(obj).find('.day6').val() === null || $(obj).find('.day6').val() === '' || typeof ($(obj).find('.day6').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day6').val());
        var colday7 = $(obj).find('.day7').val() === null || $(obj).find('.day7').val() === '' || typeof ($(obj).find('.day7').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day7').val());
        $(obj).find('.righttotal').text((colday1 + colday2 + colday3 + colday4 + colday5 + colday6 + colday7).toFixed(2))
    })
    $('#FinalTotalSplit').text((day1Total + day2Total + day3Total + day4Total + day5Total + day6Total + day7Total).toFixed(2))


    var val = $(this).val();
    var colNo = parseFloat($(this).attr('data-attribute'));
    var tdObj = $(this);

    for (let i = 0; i < 7; i++) {
        if (colNo == (i + 1)) {
            (parseFloat(val) + effortsArr[i]) > 24 ? tdObj.closest('td').find('.effortGreater').show() : tdObj.closest('td').find('.effortGreater').hide();
        }
    }
});





$(document).on('keyup', '.EfDaySplit', function () {

    isValidData = true;
    this.value = this.value.replace(/[^0-9.]/g, '');
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        var pattern = /^((([0-9])|1[0-9]|2[0-3])(\.[0-9]{0,2})?|24)$/;

        if (!pattern.test($(this).val())) {
            $(this).val($(this).val().slice(0, -1));
        }
        $(this).removeClass('-danger');
        $(this).closest('tr').find('span:first').hide();
    }

    var val = $(this).val();
    var projId = $(this).closest('tr').find('td:first').find('.childCheckBox').val();
    var colNo = parseFloat($(this).attr('data-attribute'));
    var tdObj = $(this)


    $(JsonEfforts).each(function (i, obj) {

        if (obj.ProjectId == projId) {
            let totalEfforts = Object.values(obj);

            for (var i = 1; i < 8; i++) {

                if (colNo == i) {
                    if ((parseFloat(val) + totalEfforts[i + 1]) > 24) {

                        tdObj.closest('td').find('.effortGreater').show();
                        break;
                    }
                    else if (colNo == i) {
                        tdObj.closest('td').find('.effortGreater').hide();
                    }
                }

            }
        }
    });


    for (let i = 0; i < 7; i++) {
        if (colNo == (i + 1)) {
            (parseFloat(val) + effortsArr[i]) > 24 ? tdObj.closest('td').find('.effortGreater').show() : tdObj.closest('td').find('.effortGreater').hide();
        }
    }





    var day1Total = 0.0; var day2Total = 0.0; var day3Total = 0.0; var day4Total = 0.0;
    var day5Total = 0.0; var day6Total = 0.0; var day7Total = 0.0;
    $('#table_body_shared .day1').each(function (i, obj) {
        day1Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day1Total > 24 ? ($('.day1totalsplit').show(), isValidData = false) : ($('.day1totalsplit').hide())
        $('.day1totalsplitvalue').text(day1Total.toFixed(2));
    })
    $('#table_body_shared .day2').each(function (i, obj) {
        day2Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day2Total > 24 ? ($('.day2totalsplit').show(), isValidData = false) : ($('.day2totalsplit').hide())
        $('.day2totalsplitvalue').text(day2Total.toFixed(2));
    })
    $('#table_body_shared .day3').each(function (i, obj) {
        day3Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day3Total > 24 ? ($('.day3totalsplit').show(), isValidData = false) : ($('.day3totalsplit').hide())
        $('.day3totalsplitvalue').text(day3Total.toFixed(2));
    })
    $('#table_body_shared .day4').each(function (i, obj) {
        day4Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day4Total > 24 ? ($('.day4totalsplit').show(), isValidData = false) : ($('.day4totalsplit').hide())
        $('.day4totalsplitvalue').text(day4Total.toFixed(2));
    })
    $('#table_body_shared .day5').each(function (i, obj) {
        day5Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day5Total > 24 ? ($('.day5totalsplit').show(), isValidData = false) : ($('.day5totalsplit').hide())
        $('.day5totalsplitvalue').text(day5Total.toFixed(2));
    })
    $('#table_body_shared .day6').each(function (i, obj) {
        day6Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day6Total > 24 ? ($('.day6totalsplit').show(), isValidData = false) : ($('.day6totalsplit').hide())
        $('.day6totalsplitvalue').text(day6Total.toFixed(2));
    })
    $('#table_body_shared .day7').each(function (i, obj) {
        day7Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day7Total > 24 ? ($('.day7totalsplit').show(), isValidData = false) : ($('.day7totalsplit').hide())
        $('.day7totalsplitvalue').text(day7Total.toFixed(2));
    })
    $('#table_body_shared tr').each(function (i, obj) {

        var colday1 = $(obj).find('.day1').val() === null || $(obj).find('.day1').val() === '' || typeof ($(obj).find('.day1').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day1').val());
        var colday2 = $(obj).find('.day2').val() === null || $(obj).find('.day2').val() === '' || typeof ($(obj).find('.day2').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day2').val());
        var colday3 = $(obj).find('.day3').val() === null || $(obj).find('.day3').val() === '' || typeof ($(obj).find('.day3').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day3').val());
        var colday4 = $(obj).find('.day4').val() === null || $(obj).find('.day4').val() === '' || typeof ($(obj).find('.day4').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day4').val());
        var colday5 = $(obj).find('.day5').val() === null || $(obj).find('.day5').val() === '' || typeof ($(obj).find('.day5').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day5').val());
        var colday6 = $(obj).find('.day6').val() === null || $(obj).find('.day6').val() === '' || typeof ($(obj).find('.day6').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day6').val());
        var colday7 = $(obj).find('.day7').val() === null || $(obj).find('.day7').val() === '' || typeof ($(obj).find('.day7').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day7').val());

        $(obj).find('.righttotalsplit').text((colday1 + colday2 + colday3 + colday4 + colday5 + colday6 + colday7).toFixed(2))
    })
    $('#FinalTotalSplit').text((day1Total + day2Total + day3Total + day4Total + day5Total + day6Total + day7Total).toFixed(2))
    $('.FinalTotalSplit').text($('#FinalTotalSplit').text());
});

$('#filterbtn').click(function () {
    
    var flag = true;
    $('#Division').val() == "" ? ($('#ApportionDivisionErr').show(), flag = false) : $('#ApportionDivisionErr').hide();
    $('#Classification').val() == "" ? ($('#ApportionClassificationErr').show(), flag = false) : $('#ApportionClassificationErr').hide();
    $('#ProjectType').val() == "" ? ($('#ApportionProjectTypeErr').show(), flag = false) : $('#ApportionProjectTypeErr').hide();


    if (flag) {
        $('#table_body_shared').find("tr").remove();

        var divId = $('#Division').val().toString();
        var classification = $('#Classification').val().toString();
        var projectType = $('#ProjectType').val().toString();
        var rnd = $('#RnDTeam').val().toString()


        $.ajax({
            type: "POST",
            url: ROOT + 'EffortTracker/GetProjectList',
            data: { Division: divId, Classification: classification, ProjectType: projectType, RnD:rnd,IsFiltered:'Yes' },
            dataType: 'json',
            success: function (result) {
                ProjectsData = [];
                $('#table_body_shared').empty();
                $.each(result, function (i, obj) {
                    ProjectsData.push(obj);
                    create_tr(obj.ProjectCode, obj.ProjectName, obj.DivisionName, '');
                });
                if (result.length != 0) {
                    RecordsCount = $('#table_body_shared').find('tr').length;
                    $('#table_body_shared').prepend('<tr class="apportionFilter"><td></td><td><input type="text" class="form-control searchFilter" id="" placeholder="Search"></td><td class="tf_td text-danger"><label class="day1totalsplitvalue"></label><br><span class= "day1totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day2totalsplitvalue"></label><br><span class= "day2totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day3totalsplitvalue"></label><br><span class= "day3totalsplit text-danger font-weight:bold;" style = "display:none" > Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day4totalsplitvalue"></label><br><span class= "day4totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day5totalsplitvalue"></label><br><span class= "day5totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day6totalsplitvalue"></label><br><span class= "day6totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day7totalsplitvalue"></label><br><span class= "day7totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="FinalTotalSplit"></label></td></tr>');
                    $('#tfoot').show();
                    $('#tfoot tr:nth-child(2)').remove();
                    $('#tfoot').append('<tr><td colspan="10" class="tf_td text-right"><b><label class="mt-2">View 1 - ' + RecordsCount +' of '+RecordsCount+'</label></b></td></tr>');
                    leavesAndHolidaysHighlight();
                }
                else {
                    $('#table_body_shared').prepend('<tr class="apportionFilter"><td colspan="10" class="text-center">No Records Found</td></tr>');
                    $('#tfoot').hide();

                }
                for (var i = 1; i < 8; i++) {
                    $('.day' + i + 'totalsplitvalue').text(0.0);
                }
                $('#FinalTotalSplit').text(0.0)

            },
            error: function () {

            }
        });
       
    }
   
});

$('.parentCheckBox').click(function () {

    if ($('.parentCheckBox').prop('checked')) {
        $('.childCheckBox').prop('checked', true);


        $('#table_body_shared tr').each(function (i, obj) {
            for (var i = 1; i <= 7; i++) {
                $(obj).closest("tr").find('.day' + i + '').val('').prop('disabled', false);
            }
        })

    }
    else {
        $('.childCheckBox').prop('checked', false);
        $('#table_body_shared tr').each(function (i, obj) {
            for (var i = 1; i <= 7; i++) {
                $(obj).closest("tr").find('.day' + i + '').val('').prop('disabled', true);
            }
        })
    }
});



$(document).ready(function () {
    $('#SplitData').click(function () {
        var flag = true;
        var errList2 = [];
        $('#table_body tr').each(function (i, obj) {
            er = 0;
            $(obj).each(function (i, obj2) {
                $(obj2).find('.effortGreater:visible').length > 0 ? errList2.push(1) : er + 0;
            })
        })

        //$('#Division').val() == '' ? ($('#ApportionDivisionErr').show(), flag = false) : $('#ApportionDivisionErr').hide();
        $('#Task').val() == '' ? ($('#ApportionTaskErr').show(), flag = false) : $('#ApportionTaskErr').hide();
        if ($('#table_body .day1').val() == '' && $('#table_body .day2').val() == '' && $('#table_body .day3').val() == '' && $('#table_body .day4').val() == '' && $('#table_body .day5').val() == '' && $('#table_body .day6').val() == '' && $('#table_body .day7').val() == '') {
            $('#NoRecordsErr').show();
            flag = false;
        }
        else {
            $('#NoRecordsErr').hide();
        }

        if (errList2.length == 0) {
            if (flag) {
                var colday1, colday2, colday3, colday4, colday5, colday6, colday7;
                $('#table_body tr').each(function (i, obj) {
                    colday1 = $(obj).find('.day1').val() === null || $(obj).find('.day1').val() === '' || typeof ($(obj).find('.day1').val()) === "undefined" ? '' : $(obj).find('.day1').val();
                    colday2 = $(obj).find('.day2').val() === null || $(obj).find('.day2').val() === '' || typeof ($(obj).find('.day2').val()) === "undefined" ? '' : $(obj).find('.day2').val();
                    colday3 = $(obj).find('.day3').val() === null || $(obj).find('.day3').val() === '' || typeof ($(obj).find('.day3').val()) === "undefined" ? '' : $(obj).find('.day3').val();
                    colday4 = $(obj).find('.day4').val() === null || $(obj).find('.day4').val() === '' || typeof ($(obj).find('.day4').val()) === "undefined" ? '' : $(obj).find('.day4').val();
                    colday5 = $(obj).find('.day5').val() === null || $(obj).find('.day5').val() === '' || typeof ($(obj).find('.day5').val()) === "undefined" ? '' : $(obj).find('.day5').val();
                    colday6 = $(obj).find('.day6').val() === null || $(obj).find('.day6').val() === '' || typeof ($(obj).find('.day6').val()) === "undefined" ? '' : $(obj).find('.day6').val();
                    colday7 = $(obj).find('.day7').val() === null || $(obj).find('.day7').val() === '' || typeof ($(obj).find('.day7').val()) === "undefined" ? '' : $(obj).find('.day7').val();

                });

                var rows = 0;


                $('#table_body_shared tr').each(function (i, obj) {
                    if ($(obj).find('.childCheckBox').prop('checked')) {
                        rows++;
                    }
                });
                if (rows > 0) {
                    
                    $("#loader").css("visibility", "visible");
                    $('#table_body_shared').empty();

                    $.each(ProjectsData, function (i, obj) {
                        if (SelectedRecords.includes(obj.ProjectCode)) {
                            create_tr(obj.ProjectCode, obj.ProjectName, obj.DivisionName, 'new');
                        }
                    })
                    $.each(ProjectsData, function (i, obj) {
                        if (!SelectedRecords.includes(obj.ProjectCode)) {
                            create_tr(obj.ProjectCode, obj.ProjectName, obj.DivisionName, '');
                        }
                    })
                    RecordsCount = $('#table_body_shared').find('tr').length;
                    $('#table_body_shared').prepend('<tr class="apportionFilter"><td></td><td><input type="text" class="form-control searchFilter" id="" placeholder="Search"></td><td class="tf_td text-danger"><label class="day1totalsplitvalue"></label><br><span class= "day1totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day2totalsplitvalue"></label><br><span class= "day2totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day3totalsplitvalue"></label><br><span class= "day3totalsplit text-danger font-weight:bold;" style = "display:none" > Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day4totalsplitvalue"></label><br><span class= "day4totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day5totalsplitvalue"></label><br><span class= "day5totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day6totalsplitvalue"></label><br><span class= "day6totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="day7totalsplitvalue"></label><br><span class= "day7totalsplit text-danger font-weight:bold;" style = "display:none"> Total Efforts in a day cannot be more that 24 Hrs</span></td><td class="tf_td text-danger"><label class="FinalTotalSplit"></label></td></tr>');




                    $('#table_body_shared tr').each(function (i, obj) {
                        if ($(obj).find('.childCheckBox').prop('checked')) {

                            colday1 == '' ? '' : $(obj).find('.day1split').val((colday1 / rows).toFixed(2)).attr('data-attr1', colday1 / rows);
                            colday2 == '' ? '' : $(obj).find('.day2split').val((colday2 / rows).toFixed(2)).attr('data-attr2', colday2 / rows);
                            colday3 == '' ? '' : $(obj).find('.day3split').val((colday3 / rows).toFixed(2)).attr('data-attr3', colday3 / rows);
                            colday4 == '' ? '' : $(obj).find('.day4split').val((colday4 / rows).toFixed(2)).attr('data-attr4', colday4 / rows);
                            colday5 == '' ? '' : $(obj).find('.day5split').val((colday5 / rows).toFixed(2)).attr('data-attr5', colday5 / rows);
                            colday6 == '' ? '' : $(obj).find('.day6split').val((colday6 / rows).toFixed(2)).attr('data-attr6', colday6 / rows);
                            colday7 == '' ? '' : $(obj).find('.day7split').val((colday7 / rows).toFixed(2)).attr('data-attr7', colday7 / rows);


                            $(obj).find('.righttotalsplit').text((parseFloat(colday1 / rows) + parseFloat(colday2 / rows) + parseFloat(colday3 / rows) + parseFloat(colday4 / rows) + parseFloat(colday5 / rows) + parseFloat(colday6 / rows) + parseFloat(colday7 / rows)).toFixed(2));

                        }
                    });
                    $('#loader').css('visibility', 'hidden');
                }
                else {
                    $('#NoRecordsSelectedErr').show();
                }
                calculateValues();
            }
        }
        else {
            alert("Appotion Efforts + Manual Efforts exceeding for a day");
        }

        leavesAndHolidaysHighlight();
    });

})


$('#Division').change(function () {
    $(this).val() == '' ? $('#ApportionDivisionErr').show() : $('#ApportionDivisionErr').hide();
});
$('#Classification').change(function () {
    $(this).val() == '' ? $('#ApportionClassificationErr').show() : $('#ApportionClassificationErr').hide();
});
$('#ProjectType').change(function () {
    $(this).val() == '' ? $('#ApportionProjectTypeErr').show() : $('#ApportionProjectTypeErr').hide();
});



$(document).on('keyup', '.searchFilter', function () {

    var keyword = this.value;
    keyword = keyword.toUpperCase();

    var all_tr = $('#table_body_shared').find('tr');
    for (var i = 0; i < all_tr.length - 1; i++) {
        var proj_column = all_tr[i + 1].getElementsByTagName("td")[1];
        if (proj_column) {
            var name_value = proj_column.textContent || proj_column.innerText;
            name_value = name_value.toUpperCase();
            if (name_value.indexOf(keyword) > -1) {
                all_tr[i + 1].style.display = ""; // show
            } else {
                all_tr[i + 1].style.display = "none"; // hide
            }
        }
    }
});

$(document).on('click', '.childCheckBox', function () {
    $(this).prop('checked') ? SelectedRecords.push($(this).val()) : SelectedRecords.splice(SelectedRecords.indexOf($(this).val()),1)
    for (var i = 1; i <= 7; i++) {
        $(this).prop('checked') ? ($(this).closest("tr").find('.day' + i + '').prop('disabled', false)) : ($(this).closest("tr").find('.day' + i + '').val('').prop('disabled', true));

        if (!($(this).prop('checked'))) {

            $(this).closest('tr').find('.day' + i + 'errormsg').hide();
            $(this).closest('tr').find($('.righttotalsplit')).text('0.00');

        }
    }
    
    $('#NoRecordsSelectedErr').hide();
    calculateValues();
});

$('.parentCheckBox').click(function () {
    if ($(this).prop('checked')) {
        $('#table_body_shared tr').each(function (j, obj) {
            for (var i = 1; i <= 7; i++) {
                $(obj).closest("tr").find('.day' + i + '').val('');
                $('.day' + i + 'errormsg').hide();
                $(`#day` + i + 'totalsplit').text('0.00');
            }

            if (j > 0) {
                SelectedRecords.push($(this).find('.childCheckBox').val());
            }
            
        });
       
    }
    else {
        SelectedRecords = [];
    }
    $('.righttotalsplit').text('0.00');
    $('#NoRecordsSelectedErr').hide();
    calculateValues();

})

function calculateValues() {
    isValidData = true;
    var day1Total = 0.0; var day2Total = 0.0; var day3Total = 0.0; var day4Total = 0.0;
    var day5Total = 0.0; var day6Total = 0.0; var day7Total = 0.0;
    $('[data-attr1]').each(function (i, obj) {
        day1Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).data('attr1'))
        day1Total > 24 ? ($('.day1totalsplit').show(), isValidData = false) : ($('.day1totalsplit').hide())
        $('.day1totalsplitvalue').text(day1Total.toFixed(2));
    })
    $('[data-attr2]').each(function (i, obj) {
        day2Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).data('attr2'))
        day2Total > 24 ? ($('.day2totalsplit').show(), isValidData = false) : ($('.day2totalsplit').hide())
        $('.day2totalsplitvalue').text(day2Total.toFixed(2));
    })
    $('[data-attr3]').each(function (i, obj) {
        day3Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).data('attr3'))
        day3Total > 24 ? ($('.day3totalsplit').show(), isValidData = false) : ($('.day3totalsplit').hide())
        $('.day3totalsplitvalue').text(day3Total.toFixed(2));
    })
    $('[data-attr4]').each(function (i, obj) {
        day4Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).data('attr4'))
        day4Total > 24 ? ($('.day4totalsplit').show(), isValidData = false) : ($('.day4totalsplit').hide())
        $('.day4totalsplitvalue').text(day4Total.toFixed(2));
    })
    $('[data-attr5]').each(function (i, obj) {
        day5Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).data('attr5'))
        day5Total > 24 ? ($('.day5totalsplit').show(), isValidData = false) : ($('.day5totalsplit').hide())
        $('.day5totalsplitvalue').text(day5Total.toFixed(2));
    })
    $('[data-attr6]').each(function (i, obj) {
        day6Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).data('attr6'))
        day6Total > 24 ? ($('.day6totalsplit').show(), isValidData = false) : ($('.day6totalsplit').hide())
        $('.day6totalsplitvalue').text(day6Total.toFixed(2));
    })
    $('[data-attr7]').each(function (i, obj) {
        day7Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).data('attr7'))
        day7Total > 24 ? ($('.day7totalsplit').show(), isValidData = false) : ($('.day7totalsplit').hide())
        $('.day7totalsplitvalue').text(day7Total.toFixed(2));
    })

    $('#FinalTotalSplit').text((day1Total + day2Total + day3Total + day4Total + day5Total + day6Total + day7Total).toFixed(2))
    $('.FinalTotalSplit').text($('#FinalTotalSplit').text());

}


colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 60,
        search: false,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="text-center">' +
                '<button class="plus btn-danger" title="Delete"><a onclick=deleteApportionData(' + rowobject.ApportionId + ',' + options.rowId + ') class=""><i class="fa fa-trash" aria-hidden="true"></i></a></button>' + '<button class="btn-icon -view" title="View"><a onclick = showApportionData(' + rowobject.ApportionId + ',' + options.rowId +') class=""><i class="fa-sharp fa-solid fa-eye"></i></a></button>' +
                '</div>';
        }
    },

    {
        name: 'EffortStartDate',
        label: 'Effort Start Date',
        width: 100,
        resizable: true,
        ignoreCase: true,
        formatter: 'date', formatoptions: { srcformat: 'Y/m/d', newformat: 'd/m/Y' }
    },
    {
        name: 'EffortEndDate',
        label: 'Effort End Date',
        width: 100,
        resizable: true,
        ignoreCase: true,
        formatter: 'date', formatoptions: { srcformat: 'Y/m/d', newformat: 'd/m/Y' }
    },
    {
        name: 'Division',
        label: 'Division',
        width: 70,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Classification',
        label: 'Classification',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProjectType',
        label: 'Project Type',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TaskName',
        label: 'Task Name',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RnDTeam',
        label: 'R&D Name',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'ApportionId',
        label: 'Images Hide',
        resizable: true,
        ignoreCase: true,
        hidden: true
    },

],

    $("#centralmaster").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_central',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#centralmaster tbody tr");
            var objHeader = $("#centralmaster tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#centralmaster").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

$('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 155px - 155px)' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 320) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}




var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

$.ajax({
    type: "POST",
    url: ROOT + "EffortTracker/GetApportionViewData",
    data: { Month: month, Year: year },
    dataType: "json",
    success: function (Result) {

        if (Result != null) {
            $("#centralmaster").jqGrid('setGridParam', { data: Result });
            $("#centralmaster").trigger('reloadGrid', [{ page: 1 }]);
        }
    },
    error: function () {

    }
});

$('#apportionViewBtn').click(function () {

    var formattedMonthYear = moment($('#viewMonth').val()).format('M,YYYY'); // June 1, 2019
    var monthYear = formattedMonthYear.split(",");
    var month = monthYear[0];
    var year = monthYear[1];

    $.ajax({
        type: "POST",
        url: ROOT + "EffortTracker/GetApportionViewData",
        data: { Month: month, Year: year },
        dataType: "json",
        success: function (Result) {

            if (Result != null) {
                $("#centralmaster").jqGrid("clearGridData");
                $("#centralmaster").jqGrid('setGridParam', { data: Result });
                $("#centralmaster").trigger('reloadGrid', [{ page: 1 }]);
            }

        },
        error: function () {

        }
    });
});

function deleteApportionData(apportionID, rowId) {

    confirm("Are You Sure You Want To Delete The Apportion Data ?", function () {

        var rowData = $("#centralmaster").jqGrid("getRowData", rowId);
        var startDate = rowData.EffortStartDate
        var endDate = rowData.EffortEndDate

        $("#centralmaster").jqGrid('delRowData', rowId);
        $("#centralmaster").trigger('reloadGrid', [{ page: 1 }]);

        $.ajax({
            type: "POST",
            url: ROOT + "EffortTracker/DeleteApportionData",
            data: { ApportionId: apportionID, StartDate: startDate, EndDate: endDate },
            dataType: "json",
            success: function (Result) {

            },
            error: function () {

            }
        });


    });
}


function modalClose() {
    $('#showlist').modal('hide');
}

function showApportionData(apportionID, rowId) {
    debugger
    var weekefforts = $('#weekefforts').val();

    $('#showlist').modal('show');

    $.ajax({
        type: "POST",
        url: ROOT + "EffortTracker/ShowApportionData",
        data: { ApportionId: apportionID },
        dataType: "json",
        success: function (Result) {
            debugger
            $('#apportionMaster thead').empty();
            $('#apportionMaster tbody').empty();
            $('#apportionMaster tfoot').empty();
            var header = "<tr class='week_select'>"

            if (Result.length != 0) {
                debugger
                const weekHeaders = Object.keys(Result[0]) == null || Object.keys(Result[0]) == "undefined" ? "" : Object.keys(Result[0]);
                for (var i = 0; i < weekHeaders.length; i++) {
                    if (i > 1) {
                        var dayMon = moment(weekHeaders[i]).format("ddd,DD MMM").split(',');
                        header += "<th class='week_header'>" + (dayMon[0]) + "<br>" + (dayMon[1]) + "</th>";
                    }
                    else {
                        header += "<th class='week_header'>" + weekHeaders[i] + "</th>";
                    }
                }
                header += "<th class='week_header'>Total</th></tr>";
                $('#apportionMaster thead').append(header);


                var body = "<tr>"
                for (let i = 0; i < Result.length; i++) {
                    const weekEfforts = Object.values(Result[i]);
                    debugger
                    for (let j = 0; j < Object.values(Result[i]).length; j++) {
                        debugger
                        if (weekEfforts[0] == null || weekEfforts[0] == 'undefined' || weekEfforts[0] == '') {
                            continue;
                        }
                        else {
                            if (j > 1) {

                                body += "<td class='day" + (j - 1) + "popup'>" + (weekEfforts[j] == null ? 0.0 : weekEfforts[j]) + "</td>";
                            }
                            else {
                                body += "<td>" + weekEfforts[j] + "</td>";
                            }
                        }
                    }
                    body += " <td style='padding: 0; vertical-align: middle; text-align: center; color: blue; background: #e7ecf7;text-danger;' class='righttotalpopup'>0.0</td></tr>";
                }
                $('#apportionMaster tbody').append(body);


                var foot = "<tr  class='tr_padding value_ value1_'><td></td><td>Total Efforts</td>"
                for (let i = 0; i < 1; i++) {
                    const weekEfforts = Object.values(Result[i]);
                    for (let j = 0; j < Object.values(Result[i]).length - 2; j++) {
                        foot += "<td><label id ='day" + (j + 1) + "totalpopup'></label></td>";
                    }
                    foot += " <td class='tf_td'><label id='FinalTotalpopup'></label></td></tr>";
                }
                $('#apportionMaster tfoot').append(foot);

                handler();

            }
            else {
                $('#apportionMaster tbody').append("No Records Found");
            }

        },
        error: function () {

        }
    });
}


function handler(e) {
    var day1Total = 0.0; var day2Total = 0.0; var day3Total = 0.0; var day4Total = 0.0;
    var day5Total = 0.0; var day6Total = 0.0; var day7Total = 0.0;



    $('#viewApportionPopup tr').each(function (i, obj) {

        var colday1 = $(obj).find('.day1popup').text() === null || $(obj).find('.day1popup').text() === '' || typeof ($(obj).find('.day1popup').text()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day1popup').text());

        var colday2 = $(obj).find('.day2popup').text() === null || $(obj).find('.day2popup').text() === '' || typeof ($(obj).find('.day2popup').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day2popup').text());


        var colday3 = $(obj).find('.day3popup').text() === null || $(obj).find('.day3popup').text() === '' || typeof ($(obj).find('.day3popup').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day3popup').text());


        var colday4 = $(obj).find('.day4popup').text() === null || $(obj).find('.day4popup').text() === '' || typeof ($(obj).find('.day4popup').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day4popup').text());


        var colday5 = $(obj).find('.day5popup').text() === null || $(obj).find('.day5popup').text() === '' || typeof ($(obj).find('.day5popup').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day5popup').text());


        var colday6 = $(obj).find('.day6popup').text() === null || $(obj).find('.day6popup').text() === '' || typeof ($(obj).find('.day6popup').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day6popup').text());

        var colday7 = $(obj).find('.day7popup').text() === null || $(obj).find('.day7popup').text() === '' || typeof ($(obj).find('.day7popup').val()) === "undefined" ? 0.0 : parseFloat($(obj).find('.day7popup').text());


        $(obj).find('.righttotalpopup').text((colday1 + colday2 + colday3 + colday4 + colday5 + colday6 + colday7).toFixed(2))
    })


    $('.day1popup').each(function (i, obj) {
        day1Total += $(obj).text() === null || $(obj).text() === '' || typeof ($(obj).text()) === "undefined" ? '0.0' : parseFloat($(obj).text())
        $('#day1totalpopup').text(day1Total.toFixed(2));
    })
    $('.day2popup').each(function (i, obj) {
        day2Total += $(obj).text() === null || $(obj).text() === '' || typeof ($(obj).text()) === "undefined" ? '0.0' : parseFloat($(obj).text())
        $('#day2totalpopup').text(day2Total.toFixed(2));
    })
    $('.day3popup').each(function (i, obj) {
        day3Total += $(obj).text() === null || $(obj).text() === '' || typeof ($(obj).text()) === "undefined" ? '0.0' : parseFloat($(obj).text())
        $('#day3totalpopup').text(day3Total.toFixed(2));
    })
    $('.day4popup').each(function (i, obj) {
        day4Total += $(obj).text() === null || $(obj).text() === '' || typeof ($(obj).text()) === "undefined" ? '0.0' : parseFloat($(obj).text())
        $('#day4totalpopup').text(day4Total.toFixed(2));
    })
    $('.day5popup').each(function (i, obj) {
        day5Total += $(obj).text() === null || $(obj).text() === '' || typeof ($(obj).text()) === "undefined" ? '0.0' : parseFloat($(obj).text())
        $('#day5totalpopup').text(day5Total.toFixed(2));
    })
    $('.day6popup').each(function (i, obj) {
        day6Total += $(obj).text() === null || $(obj).text() === '' || typeof ($(obj).text()) === "undefined" ? '0.0' : parseFloat($(obj).text())
        $('#day6totalpopup').text(day6Total.toFixed(2));
    })
    $('.day7popup').each(function (i, obj) {
        day7Total += $(obj).text() === null || $(obj).text() === '' || typeof ($(obj).text()) === "undefined" ? '0.0' : parseFloat($(obj).text())
        $('#day7totalpopup').text(day7Total.toFixed(2));
    })


    $('#FinalTotalpopup').text((day1Total + day2Total + day3Total + day4Total + day5Total + day6Total + day7Total).toFixed(2))
}

setTimeout(function () {
    $("#alertBox").hide();
}, 5000);





$('#table_body_shared').css({
    'max-height': '300px',
    'overflow-y': 'scroll'
});


var holidaysList = JSON.parse($('#HolidaysList').val());
var leavesList = JSON.parse($('#LeavesList').val());

var holidays = holidaysList.flatMap(function (obj) {
    return Object.values(obj);
});

var leaves = leavesList.flatMap(function (obj) {
    return Object.values(obj);
});


//holidays.push('2023-04-24');
//leaves.push('2023-04-27');


$('#TEffortTracker thead tr th').each(function (i, obj) {
    if (holidays.includes($(this).attr('data-attr'))) {
      
        var headerIndex = $(this).parent().find('th').index(this);
        $('#TEffortTracker tbody td:nth-child(' + (headerIndex + 1) + ') input').css('background-color', '#bab7ffd1');
    }
    if (leaves.includes($(this).attr('data-attr'))) {
        
        var headerIndex = $(this).parent().find('th').index(this);
        $('#TEffortTracker tbody td:nth-child(' + (headerIndex + 1) + ') input').css('background-color', '#90EE90');
    }
});


$(document).ready(function () {
    leavesAndHolidaysHighlight();
})

function leavesAndHolidaysHighlight() {
    debugger
    $('#ApportionTracker thead tr th').each(function (i, obj) {
        if (holidays.includes($(this).attr('data-attr'))) {
            debugger
            var headerIndex = $(this).parent().find('th').index(this);
            $('#ApportionTracker tbody td:nth-child(' + (headerIndex + 1) + ') input').css('background-color', '#bab7ffd1');
        }
        if (leaves.includes($(this).attr('data-attr'))) {
            debugger
            var headerIndex = $(this).parent().find('th').index(this);
            $('#ApportionTracker tbody td:nth-child(' + (headerIndex + 1) + ') input').css('background-color', '#90EE90');
        }
    });
}


$("#Apportion_Remarks").on('keypress change', function () {
    $("#Error_ApportionRemarks").hide();
});

$("#Task").on('change', function () {
    $("#ApportionTaskErr").hide();
});
$(".weekpicker").keydown(function (event) {

    if (event.key == 'Backspace') {
        return false;
    }
});

$(".weekpicker").keypress(function (event) {
    debugger
    var inputValue = $(this).val();
    var allowedKeys = [45];
    if (event.which >= 48 && event.which <= 57) {
        allowedKeys.push(event.which);
    }

    if (allowedKeys.indexOf(event.which) == -1) {
        event.preventDefault();
        return;
    }
    if ((inputValue.match(/-/g) || []).length >= 2) {
        event.preventDefault();
        return;
    }
    var dateFormat = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateFormat.test(inputValue)) {
        event.preventDefault();
        return;
    }
});



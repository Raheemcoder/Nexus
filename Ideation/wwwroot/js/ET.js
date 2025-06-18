var ProjectList = [];
var count = 0; var projecterrorcount = 0;
var RowNumber = "";
var isValidData = true;


var isSubmitted = false;



//To disable the Projet code dropdown
$('.projectid').prop('disabled', true);
$('#weekpicker').datepicker({
    autoclose: true,
    viewMode: 'months',
    endDate: '+0d',
    forceParse: false
})
    .on("changeDate", function (e) {

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
    $('#weekpicker').val(('0' + startDate.getDate()).slice(-2) + '/' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '/' + startDate.getFullYear() + ' - '
        + ('0' + endDate.getDate()).slice(-2) + '/' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '/' + endDate.getFullYear());
    $.ajax({
        url: ROOT + "EffortTracker/ProjectDropDown",
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            
            if (data != null) {
                ProjectList += '<option value=' + "" + '>' + "Select" + '</option>'
                $.each(data, function (index, item4) {
                    ProjectList += '<option value=' + item4.ProjectCode + '>' + item4.ProjectName + '</option>';
                });
            }

        }
    })
});
var deletedData = [];
function remove_tr(obj) {

    confirm("Are you sure you want to delete?", function () {
        debugger
        var ProjId = $(obj).find(":selected").text();

        var projectId = $(obj).closest("tr").children().find(".projectid").val();
        var dateParts = $('#weekpicker').val().split("-");
        var startDate = dateParts[0].trim();
        var endDate = dateParts[1].trim();
        var userName = $('#UserName').val();
       var  data = {
           ProjectId: projectId,
           StartDate: startDate,
           EndDate: endDate,
           UserName: userName
        }
        deletedData.push(data);

        obj.closest('tr').remove();
        //$('#table_body tr').each(function (i, obj) {
        //    var ProjId = $(obj).find(":selected").text();
           
        //        $('#table_body tr').each(function (i, obj) {
        //            var PId = $(obj).find(":selected").text();
        //            if (PId == ProjId) {
        //                $(obj).closest('tr').removeClass("text-warning bg-warning");
        //            }
                    
        //        })
        //});
            handler(); 
    });
}


$(".dayApportion1, .dayApportion7").css("background-color", "#dddddd");


function create_tr(table_id) {
    var addr = $("#TEffortTracker").find("tbody");
    var rowNo = $(addr).find("tr").length + 1;
    var Totalhr = "Totalhr";
    Totalhr = Totalhr + (rowNo)
    let tableRow1 = ` <tr class="valu">
                                    <td style="text-align:center;" class="first-col">
                                        <div class="justify-center_">
                                                <div class="action_container">
                                                    <button class="plus btn-danger" onclick="remove_tr(this)" title="Delete">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                                <div class="btn-icon -history GetInfoIcon" style="display:none" title="Remarks" onclick="Efforts_Remarks_Section(this)">
                                                    <i class="fas fa-info" aria-hidden="true" ></i>
                                                </div>
                                            </div>
                                    </td>
                                    <td style="padding:0px;" >
                                        <select class="form-control data-singleselect projectid">
                                           "`+ ProjectList + `"
                                        </select>
                                        <span class="projectiderrmsg text-danger" style="display:none">Please select Project</span>
                                    </td>
                                    <td style="padding:0px;">
                                    <input type="text" class="form-control EfDay number day1"/>
                                    <span class="day1errormsg text-danger" style="display:none">Please enter Efforts</span>
                                  
                                    </td>
                                     <td style="padding:0px;">
                                     <input type="text" class="form-control EfDay number day2"/>
                                     <span class="day2errormsg text-danger" style="display:none">Please enter Efforts</span>

                                     </td>
                                    <td style="padding:0px;">
                                    <input type="text" class="form-control EfDay number day3" />
                                    <span class="day3errormsg text-danger" style="display:none">Please enter Efforts</span>

                                    </td>
                                    <td style="padding:0px;">
                                    <input type="text" class="form-control EfDay number day4" />
                                    <span class="day4errormsg text-danger" style="display:none">Please enter Efforts</span>

                                    </td>
                                    <td style="padding:0px;">
                                    <input type="text" class="form-control EfDay number day5"/>
                                    <span class="day5errormsg text-danger" style="display:none">Please enter Efforts</span>

                                    </td>
                                     <td style="padding:0px;">
                                     <input type="text" class="form-control EfDay number day6"/>
                                     <span class="day6errormsg text-danger" style="display:none">Please enter Efforts</span>

                                     </td>
                                    <td style="padding:0px;">
                                    <input type="text" class="form-control EfDay number day7" />
                                    <span class="day7errormsg text-danger" style="display:none">Please enter Efforts</span>

                                    </td>
                                    <td style="padding: 0;vertical-align: middle;text-align: center;color: blue;background: #e7ecf7;" class="righttotal">0.00</td>
                                </tr>`
    $(table_body).append(tableRow1);
    $('.data-singleselect').select2();
    highlightColumns();
}
var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$('.data-datepicker-month').datepicker({
    format: 'M-yyyy',
    viewMode: 'months',
    minViewMode: 'months',
    todayHighlight: true,
    autoclose: true
});
$('.data-datepicker-month').datepicker('setDate', today);

$('.data-singleselect').select2();

$(document).on('select2:open', e => {
    const select2 = $(e.target).data('select2');
    if (!select2.options.get('multiple')) {
        select2.dropdown.$search.get(0).focus();
    }
});

$('[data-datepicker]').datepicker({
    todayHighlight: true,
    autoclose: true
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
    window.location.href = ROOT + 'EffortTracker/EffortTracker?q='+Encrypt('StartDate=' + StartDate + '&EndDate=' + EndDate);
});
var duplicateProjects = [];
function findDuplicates(arr) {
    return arr.filter((currentValue, currentIndex) =>
        arr.indexOf(currentValue) !== currentIndex);
}

var isProjectEmpty = [];

$("#SaveData").on('click', function () {
    isProjectEmpty = [];
    $('#SaveData').prop("disabled", false);
    duplicateProjects = [];
    duplicateProjectsNames = [];
    $('#table_body tr').each(function (i, obj) {
       // duplicateProjects.push($(obj).find('td:nth-child(2)').find('span:nth-child(1)').text())
        duplicateProjects.push($(obj).find(":selected").text());
    })
    
    var dup = findDuplicates(duplicateProjects);
    var data = getDetails();
    var gridlength = $('#table_body tr').length;
    var dateParts = $('#weekpicker').val().split("-");
    var startDate = dateParts[0].trim();
    var endDate = dateParts[1].trim();
    debugger
    const savedArray = savedProjectIdData.filter(obj1 =>
        !deletedRemarksData.some(obj2 =>
            obj2.Remarks === obj1.Remarks && obj2.RemarksDate === obj1.RemarksDate && obj2.ProjectId === obj1.ProjectId
        )
    );

    const deletedRemarksArray = App_jsons.filter(obj1 =>
        deletedRemarksData.some(obj2 => obj2.RemarksId === obj1.RemarksId)
    );

    var RemarksAddedProjectIds = savedArray;
 
    if (isValidData) {
        if ($('#table_body tr').length > 0) {
            if (dup.length == 0) {
                if (projecterrorcount === 0 && count === gridlength) {
                    if (isSubmitted) {
                        return false;
                    }
                    isSubmitted = true;
                    $("#JsonData").val(JSON.stringify(data));
                    console.log(data);
                    $.ajax({
                        url: ROOT + "EffortTracker/SaveData",
                        type: "POST",
                        async: false,
                        dataType: "json",
                        data: { EffortDetails: JSON.stringify(data), DeletedDetais: JSON.stringify(deletedData), RemarksAddedProjectIds: JSON.stringify(RemarksAddedProjectIds), DeletedRemarksDetails: JSON.stringify(deletedRemarksArray) },
                        success: function (data1) {
                            isSubmitted = false;
                            window.location.reload();
                        },
                        error: function () {
                            isSubmitted = false;
                        }

                    })
                    $('#SaveData').prop("disabled", true);
                }
                else {
                    alert("Please enter efforts for atleast one day for each project");
                }
            }
            else {
                if (isProjectEmpty.length==0) {
                    $('#table_body tr').each(function (i, obj) {
                        var ProjId = $(obj).find(":selected").text();
                        if ($.inArray(ProjId, dup) != -1) {
                            $('#table_body tr').each(function (i, obj) {
                                var PId = $(obj).find(":selected").text();
                                if (PId == ProjId) {
                                    $(obj).closest('tr').addClass("text-warning bg-warning");
                                }
                            })

                        }
                    });

                    var str = "<br><b>";
                    for (var item = 0; item < dup.length; item++) {
                        str += item + 1 + ") " + dup[item] + "<br>";
                    }

                    alert("The project id should be unique.Duplicate projects are not allowed " + str);
                    setTimeout(function () {
                        $("#table_body tr").each(function (i, obj) {
                            $(obj).removeClass("bg-warning");
                        })
                    }, 20000);
                }
               
                   
            }
        }
        else {
            alert("Atleast one record is mandatory");
        }
    }
});



function getDetails() {
    var EfforList = []
    var dateSplit = $("#weekpicker").val().split("-");//date
    count = 0;
    $("#TEffortTracker tbody tr").each(function (i) {
        projecterrorcount = 0
        var tr = $(this);
        //var project = $(tr).find('td:nth-child(2)').find('span:nth-child(1)').attr('data-attr');
        var project = $(tr).find(".projectid").val();
        if (project === null || project === "" || typeof (project) === "undefined") {
            $(tr).find('.projectiderrmsg').show();
            isProjectEmpty.push(1);
            projecterrorcount++;
        }
        else {
            $(tr).find('.projectiderrmsg').hide();
        }
        for (var index = 1; index <= 7; index++) {
            
            var day = "day" + (index);
            var efforts = $(tr).find("." + day).val();

            var val1 = $(tr).find("." + day).val() == NaN ? "NaN" : ($(tr).find("." + day).val() == "" ? '' : parseFloat($(tr).find("." + day).val()));
            var val2 = $(tr).find(".dayApportion" + index).val() == NaN ? "NaN" : (typeof($(tr).find(".dayApportion" + index).val()) == "undefined" ? '' : $(tr).find(".dayApportion" + index).val());
           

            val = (val1 + val2) + "";

            if (projecterrorcount === 0 && val !== null && val !== '' && typeof (val) !== "undefined" && val!="0") {
                count = (i + 1);
                $(tr).find("." + day).removeClass('-danger');
                $(tr).find("." + day + "errormsg").hide();
                var dateParts = moment(dateSplit[0], "DD/MM/YYYY").add((index - 1), 'days').format("YYYY-MM-DD");
                EfforList.push({ "ProjectId": project, "EffortDate": dateParts, "EffortInHrs": parseFloat(efforts) })
            }
        }
    });
    return EfforList;
}

$(document).on('keyup', '.EfDay', function () {
    isValidData = true;
    this.value = this.value.replace(/[^0-9.]/g, '');
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        var pattern = /^((([0-9])|1[0-9]|2[0-3])(\.[0-9]{0,2})?|24)$/;
        if (!pattern.test($(this).val())) {
            $(this).val($(this).val().slice(0, -1));
        }
        $(this).removeClass('-danger');  
        $(this).siblings('span').hide();
    }
    handler();
});

//TO REFRESH CALCULATE VALUES IN THE TOTAL EFFORTS COLUMN ON PAGE LOAD 
$(document).ready(function () {
    handler();
});

function handler(e) {
    isValidData = true;

    var day1Total = 0.0; var day2Total = 0.0; var day3Total = 0.0; var day4Total = 0.0;
    var day5Total = 0.0; var day6Total = 0.0; var day7Total = 0.0;

    $('.day1').each(function (i, obj) {
        
        day1Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day1Total > 24 ? ($('.day1total').show(), isValidData = false) : ($('.day1total').hide())
        $('#day1total').text(day1Total.toFixed(2));
    })
    $('.day2').each(function (i, obj) {
        day2Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day2Total > 24 ? ($('.day2total').show(), isValidData = false) : ($('.day2total').hide())
        $('#day2total').text(day2Total.toFixed(2));
    })
    $('.day3').each(function (i, obj) {
        day3Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day3Total > 24 ? ($('.day3total').show(), isValidData = false) : ($('.day3total').hide())
        $('#day3total').text(day3Total.toFixed(2));
    })
    $('.day4').each(function (i, obj) {
        day4Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day4Total > 24 ? ($('.day4total').show(), isValidData = false) : ($('.day4total').hide())
        $('#day4total').text(day4Total.toFixed(2));
    })
    $('.day5').each(function (i, obj) {
        day5Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day5Total > 24 ? ($('.day5total').show(), isValidData = false) : ($('.day5total').hide())
        $('#day5total').text(day5Total.toFixed(2));
    })
    $('.day6').each(function (i, obj) {
        day6Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day6Total > 24 ? ($('.day6total').show(), isValidData = false) : ($('.day6total').hide())
        $('#day6total').text(day6Total.toFixed(2));
    })
    $('.day7').each(function (i, obj) {
        day7Total += $(obj).val() === null || $(obj).val() === '' || typeof ($(obj).val()) === "undefined" ? 0.0 : parseFloat($(obj).val())
        day7Total > 24 ? ($('.day7total').show(), isValidData = false) : ($('.day7total').hide())
        $('#day7total').text(day7Total.toFixed(2));
    })
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
    $('#FinalTotal').text((day1Total + day2Total + day3Total + day4Total + day5Total + day6Total + day7Total).toFixed(2))
}


var Remarks = $('#Remarks').val();
Remarks == '' ? $('.Remarks').hide() : $('#Remarks').show();


var ApprovedStatus = $('#Status').val();

if (ApprovedStatus == '2') {
    $('.pendingStatus').show();
}

if (ApprovedStatus == '1') {
    $('#SaveData').hide(); 
    $('.action_container').hide();
    $('.projectid').prop('disabled', true);
    $('.approvedStatus').show();
    $('#TEffortTracker').find('tr').find('th:first').hide();
    $('.first-col').hide();
    $('tfoot').find('td:first').remove();
    $('#effortsApproved').hide();
}


$('#table_body tr').each(function (i, obj) {
   
    for (var i = 1; i < 8; i++) {
        var val = $(obj).find('.day' + i).val();
        var newVal = "";
        if (val == "0.00") {
            $(obj).find('.day' + i + ':first').val('');
        }
    }
});

var holidaysList = JSON.parse($('#HolidaysList').val());
var leavesList = JSON.parse($('#LeavesList').val());

var holidays =  holidaysList.flatMap(function (obj) {
    return Object.values(obj);
});

var leaves = leavesList.flatMap(function (obj) {
    return Object.values(obj);
});


//holidays.push('2023-04-24');
//leaves.push('2023-04-25');


highlightColumns();
function highlightColumns() {
    $('#TEffortTracker thead tr th').each(function (i, obj) {

        if (holidays.includes($(this).attr('data-attr'))) {
            
            var headerIndex = $(this).parent().find('th').index(this);
            $('#TEffortTracker tbody td:nth-child(' + (headerIndex + 1) + ') input:nth-child(1)').css('background-color', '#bab7ffd1');
        }
        if (leaves.includes($(this).attr('data-attr'))) {
            
            var headerIndex = $(this).parent().find('th').index(this);
            $('#TEffortTracker tbody td:nth-child(' + (headerIndex + 1) + ') input:nth-child(1)').css('background-color', '#90EE90');
        }
    });
}

colmodels1 = [
    {
        name:'' ,
        label:'Action',
        resizable: true,
        ignoreCase: true,
        width: 40,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="justify-center_">
            <a onclick="remove_row(`+ options.rowId+`)" class="btn-icon -delete"><i class="fa fa-trash" title="Delete" aria-hidden="true"</i></a></div>`
        }
    },
    {
        name: 'RemarksDate',
        label: 'Date',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'RemarksId',
        label: 'RemarksId',
        resizable: true,
        ignoreCase: true,
        hidden:true,
    }
],

    $("#remarks_info").jqGrid({
        //url: '',
        dataType: 'json',
        data: [],
        //mtype: 'GET',
        colModel: colmodels1,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_remarks',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#remarks_info tbody tr");
            var objHeader = $("#remarks_info tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }

    });
$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
            

   
var addedData = {};
var savedProjectIdData = [];
var deletedRemarksData = [];
var App_jsons = [];
function Efforts_Remarks_Section(obj) {
    var currentRow = $(obj).closest("tr");
    var projectid = $.trim(currentRow.find(".projectid").val());
    var projectName = "";
    $.ajax({
        url: ROOT + "EffortTracker/ProjectDropDown",
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            if (data != null) {
                $.each(data, function (index, item) {
                    if (item.ProjectCode == projectid)
                        projectName = item.ProjectName;
                    var modifiedProject = projectName.replace(projectid, "").trim();

                    $('#EffortBookingRemarks_ProductName').text(modifiedProject + " Effort Remarks");
                    $('#EffortBookingRemarks_productid').text(projectid);
                });
            }
        }
    });

    $.ajax({
        type: "Get",
        url: ROOT + "EffortTracker/GetProjectRemarks",
        data: { ProjectId: projectid},
        dataType: 'HTML',
        success: function (App_Results) {
            App_jsons = JSON.parse(App_Results);
             const filteredArray = App_jsons.filter(obj1 =>
                 !deletedRemarksData.some(obj2 => obj2.RemarksId === obj1.RemarksId)
                );
                debugger
                const savedArray = savedProjectIdData.filter(obj1 =>
                    !deletedRemarksData.some(obj2 =>
                        obj2.Remarks === obj1.Remarks && obj2.RemarksDate === obj1.RemarksDate && obj2.ProjectId === obj1.ProjectId
                    )
                );
                const data = filteredArray.concat(savedArray);
               var mergedArray = data.filter(s => s.ProjectId == projectid);
                    $.jgrid.gridUnload('#remarks_info');
                    $("#remarks_info").jqGrid({
                        height: 'auto',
                        datatype: 'local',
                        data: mergedArray,
                        mtype: 'GET',
                        colModel: colmodels1,
                        loadonce: true,
                        viewrecords: true,
                        pager: '#pager_remarks',
                        rowNum: 100000,
                        scroll: true,

                        gridComplete: function () {
                            var objRows = $("#remarks_info tbody tr");
                            var objHeader = $("#remarks_info tbody tr td");

                            if (objRows.length > 1) {
                                var objFirstRowColumns = $(objRows[1]).children("td");
                                for (i = 0; i < objFirstRowColumns.length; i++) {
                                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                                }
                            }
                        }
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
        },

        error: function () {
            alert("Error occured!!");
        }
        
    });
    $("#remarks_section").modal('show');
    var dateRange = $("#weekpicker").val();
    var dates = dateRange.split('-');
    var currentDate = moment();
    if (dates.length > 1) {

    
        var startDate = dates[0].trim();
        var endDate = dates[1].trim();

        var startOfWeek = moment(moment(startDate, "DD/MM/YYYY").toDate()).format("DD/MM/YYYY");
        var endOfWeek = moment(moment(endDate, "DD/MM/YYYY").toDate()).format("DD/MM/YYYY");
    }
    else {
      
        var startDate = currentDate.clone().startOf('week').day(0);
        var endDate = currentDate.clone().endOf('week').day(6);
        var startOfWeek = moment(moment(startDate, "DD/MM/YYYY").toDate()).format("DD/MM/YYYY");
        var endOfWeek = moment(moment(endDate, "DD/MM/YYYY").toDate()).format("DD/MM/YYYY");
    }

    $('.weekdatepicker').datepicker({
        startDate: startOfWeek,
        endDate: endOfWeek,
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        autoclose: true,
        beforeShowDay: function (date) {
            var currDate = date.setHours(0, 0, 0, 0);
            return [currDate >= startOfWeek && currDate <= endOfWeek];
        }
    });

    $('.weekdatepicker').val(currentDate.format("DD-MM-YYYY"));
}

$('#Save_projectRemarks').on('click', function () {

    var projectId = $("#EffortBookingRemarks_productid").text();
    var remarksDate = $("#RemarksDate").val();
    var remarks = $.trim($("#ProjectRemarks").val());
  
    if (remarksDate == "" || remarks == "") {

        $('#Save_projectRemarks').attr("disabled", true);
    }
    else {
        $('#Save_projectRemarks').attr("disabled", false);
      
      
        var griddata = [];
        var RemarksData = {};
        RemarksData =
        {
            RemarksDate: remarksDate,
            Remarks: remarks,
        }
            griddata.push(RemarksData);
            var Remarks1 = $("#remarks_info").jqGrid('getGridParam', 'data');
            var Remarks2 = $.merge(Remarks1, griddata);
            $("#remarks_info").jqGrid('setGridParam', { data: Remarks2 });
            $("#remarks_info").trigger('reloadGrid', [{ page: 1 }]);

            addedData = {
                ProjectId: projectId,
                RemarksDate: remarksDate,
                Remarks: remarks,
            }
       $('.closeModal').val("");
        var currentDate = moment();
        $('.weekdatepicker').val(currentDate.format("DD-MM-YYYY"));
        savedProjectIdData.push(addedData);
    }
    $('#Save_projectRemarks').attr("disabled", false);
});

$(".weekdatepicker").keydown(function (event) {

    if (event.key == 'Backspace') {
        return false;
    }
});

$(".weekdatepicker").keypress(function (event) {
    
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

$(window).on('hidden.bs.modal', function () {
    $('.closeModal').val("");
    $('.Error_closeModal').hide();
});

$(document).on('change', '.projectid', function () {
    debugger
    var ProjectId = ($(this).closest('tr').find('.projectid')).val();
    if (ProjectId == "") {
        $(this).closest('tr').find('.GetInfoIcon').hide();
    }
    else if (ProjectId != "" || ProjectId != null || ProjectId != undefined) {
        $(this).closest('tr').find('.GetInfoIcon').show();
    }
});


function remove_row(RowData) {
    confirm("Are you sure you want to delete?", function () {
        debugger
        var projectid= $('#EffortBookingRemarks_productid').text();
        var remarksData = jQuery('#remarks_info').jqGrid('getRowData', RowData);
        var data = {
            ProjectId: projectid,
            Remarks: remarksData.Remarks,
            RemarksDate: remarksData.RemarksDate,
            RemarksId: remarksData.RemarksId,
        }
        deletedRemarksData.push(data);

        $("#remarks_info").jqGrid('delRowData', RowData);
        $("#remarks_info").trigger('reloadGrid');
    });
}

//function Edit_rowData(RowData) {
//    debugger
//    var remarksData = jQuery('#remarks_info').jqGrid('getRowData', RowData);
//    $('.weekdatepicker').val(remarksData.RemarksDate);
//    $('#ProjectRemarks').val(remarksData.Remarks);
//    count = remarksData.Counter;
//    remarksid = remarksData.RemarksId;
//    $('#Save_projectRemarks').text("Update");
//    editedRowId = RowData;
//}
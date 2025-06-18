var ProjStatus;
var PMUFlag;
var changedprojectId = 0;
var changedmilestoneId = 0;
var checkedmilestones = [];
var golbalsequencenumber = 1;
var usertextid = '';
var searchresult = [];
var milestoneconut = '';
var DefaultArray = [];
//var changedmilestoneIdList=0;
var DurationList = [];
var projectId = '';
var ProjectName = '';
var selectedval = 'n';
var pmudetails = [];
var isinvalide = 0;
var display = 's';
var issetrelationchanged = true;
var usernumber = '';
var pmugridData = [];
var durationflag = false;
var setrelationchanged = false;
var beforesetrelation = '';
var beforeDuration = '';
var MaterialArray = [];
var changedDuration = '';
var selectedmilestoneId = '';
var useridslist = '';
var compltedmilestone = true;
var sort = true;
var gridselectedrow = [];
var models = [
    {
        name: 'MilestoneId',
        label: 'Milestone Id',
        width: 60,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        sortable: false
    },

    {
        name: 'RowId',
        label: 'RowId',
        //width: 100,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {


            //return '<input type="text" id="' + options.rowId + '" >';

        }
    },

    {
        name: 'SequenceNo',
        label: 'Milestone No',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'MilestoneName',
        resizable: true,
        width: 150,
        label: 'Milestone Name',
        ignoreCase: true,
        sortable: false

    },
    {
        name: 'MilestoneStatus',
        resizable: true,
        width: 150,
        hidden: true,
        label: 'Milestone Name',
        ignoreCase: true,
        sortable: false
    },
    {
        name: 'rowidNo',
        resizable: true,
        width: 150,
        hidden: true,
        label: 'Milestone Name',
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return rowobject.rowidNo = options.rowId;
        }

    },
    {
        name: 'SetRelation',
        label: 'Set Relation',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            if (rowobject.SequenceNo == 1) {

                $('#1SetRelation').hide();
                return '';
            } else {
                if (cellvalue == undefined) {
                    return '<input type="text"   data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'SetRelation" class="form-control allownumericwithdecimal"  onchange="ChangeSetRelation(' + options.rowId + ',' + rowobject.SequenceNo + ')" />';

                } else if (rowobject.MilestoneStatus == 'Completed') {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'SetRelation" value="' + rowobject.SetRelation + '" class="form-control allownumericwithdecimal"  onchange="ChangeSetRelation(' + options.rowId + ',' + rowobject.SequenceNo + ')" readonly />';

                } else {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'SetRelation" value="' + rowobject.SetRelation + '" class="form-control allownumericwithdecimal"  onchange="ChangeSetRelation(' + options.rowId + ',' + rowobject.SequenceNo + ')"  />';
                }
            }





        }
    },
    {
        name: 'RelationType',
        label: 'RelationType',
        width: 100,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        sortable: false
    },
    {
        name: 'Duration',
        label: 'Duration',
        width: 60,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            if (cellvalue == undefined) {
                return '<input type="text" data-id="' + options.rowId + '"    id="' + rowobject.SequenceNo + 'Duration" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')" />';

            } else if (rowobject.MilestoneStatus == 'Completed') {
                return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'Duration" value="' + rowobject.Duration + '" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')" readonly />';
            } else {
                return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'Duration" value="' + rowobject.Duration + '" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')"  />';
            }


        }

    },
    {
        name: 'StartDate',
        label: 'Start Date',
        width: 100,
        resizable: true,
        //sorttype:'Date',
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            if (cellvalue == undefined) {

                return '<input type="text" class="form-control datepickerS" data-id="' + options.rowId + '"id="' +
                    rowobject.SequenceNo + 'start_date"  placeholder="dd/mm/yyyy"/>';
            } else if (rowobject.MilestoneStatus == 'Completed') {
                return '<input type="text" class="form-control" data-id="' + options.rowId + '"value="' + rowobject.StartDate + '" id="' +
                    rowobject.SequenceNo + 'start_date"  placeholder="dd/mm/yyyy" readonly/>';
            } else {
                return '<input type="text" class="form-control datepickerS" data-id="' + options.rowId + '"value="' + rowobject.StartDate + '" id="' +
                    rowobject.SequenceNo + 'start_date"  placeholder="dd/mm/yyyy" />';
            }


        }
    },
    {
        name: 'EndDate',
        resizable: true,
        label: 'End Date',
        sorttype: 'Date',
        width: 100,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (cellvalue == undefined) {
                // return '<div class="grid-icons-group -justify-center grid_date_picker"><input type="text" class="form-control datepicker" value="' + rowobject.EndDate + '" id="' + options.SequenceNo + 'end_date" onchange="ChangeDate(' + options.rowId + ')"   placeholder="dd-mm-yyyy" /></div>';
                return '<input type="text" class="form-control datepickerE" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo +
                    'end_date" placeholder="dd/mm/yyyy"/>';
            } else if (rowobject.MilestoneStatus == 'Completed') {
                return '<input type="text" class="form-control" data-id="' + options.rowId + '" value="' + rowobject.EndDate + '" id="' +
                    rowobject.SequenceNo + 'end_date"  placeholder="dd/mm/yyyy" readonly/>';
            }
            else {
                return '<input type="text" class="form-control datepickerE" data-id="' + options.rowId + '" value="' + rowobject.EndDate + '" id="' +
                    rowobject.SequenceNo + 'end_date"  placeholder="dd/mm/yyyy" />';

            }

        }
    },
    {
        name: 'userid',
        resizable: true,
        label: 'User(s)',
        ignoreCase: true,
        hidden: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            if (cellvalue == undefined) {
                //   return '<div class="grid-icons-group -justify-center grid_date_picker"><input type="text" id="' + options.rowId + 'mapperUser" value="' + rowobject.UserName + '" class="form-control tags" placeholder="user" /></div>';
                return '<input type="text"   id="' + rowobject.SequenceNo + 'mapperUserid" class="form-control tagsid" placeholder="user" />';

            }
            return '<input type="text" id="' + rowobject.SequenceNo + 'mapperUserid" value="' + rowobject.UserName + '" class="form-control tags" placeholder="user" />';

        }
    },
    {
        name: 'UserName',
        resizable: true,
        label: 'User(s)',
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            if (cellvalue == undefined) {
                //   return '<div class="grid-icons-group -justify-center grid_date_picker"><input type="text" id="' + options.rowId + 'mapperUser" value="' + rowobject.UserName + '" class="form-control tags" placeholder="user" /></div>';
                return '<input type="text"  id="' + rowobject.SequenceNo + 'mapperUser" class="form-control tags txtOnly"  placeholder="user" onchange="EditUser(' + options.rowId + ')"/>';

            } else if (rowobject.MilestoneStatus == 'Completed') {
                return '<input type="text" id="' + rowobject.SequenceNo + 'mapperUser" value="' + rowobject.UserName + '" class="form-control tags txtOnly" placeholder="user" onchange="EditUser(' + options.rowId + ')" readonly/>';
            } else {
                return '<input type="text" id="' + rowobject.SequenceNo + 'mapperUser" value="' + rowobject.UserName + '" class="form-control tags txtOnly" placeholder="user" onchange="EditUser(' + options.rowId + ')"/>';
            }


        }
    },

]

//$("#message").slideUp(6000);

$(document).ready(function () {

    $("#milestonedropdown").css('display', 'none');
    $('#SaveModel1').hide();
    //$('#loader').css('visibility', 'hidden');

    $('[data-multiselect]').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });

    DurationList = []; searchresult = [];
    var projectId = $('#ProjectId').val();
    $('[data-singleselect]').select2();

    

    if ($('#ProjectId').val() !== null && $('#ProjectId').val() !== '' && typeof ($('#ProjectId').val()) !== "undefined") {
        debugger
        $("#milestonedropdown").css('display', 'block');

        //var ProjectName = $('#ProjectId option:selected').text();
        //var projectId = $('#ProjectId').val();
        var ProjectName = $('#selectedProjectName').val();
        var projectId = $('#selectedProjectId').val();
        $('.projectName_error').hide();
        display = 'N';
        $("div.id_100 select").select2().val(projectId).change();
        var pMUMapping = {
            ProjectName: ProjectName,
            ProjectId: parseInt(projectId)
        }
        $.ajax({
            //contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: ROOT + "Master/NewProjectmappingList",
            type: "POST",
            data: { pMUMapping: pMUMapping },
            success: function (data) {
                console.log('data', data);
                display = 's';

                
                    ProjStatus = data[0].Status;
                    PMUFlag = data[0].Flag;
                
               
                    if (data[0].Status == 'SUBMITTED') {
                        $(".approve_btn").css('display', 'inline-block');
                        $(".Mistonelistdiv").css('display', 'block');
                        $(".checkboxpmu").css('display', 'none');
                    }
                    if (data[0].Status == 'APPROVED') {
                        $(".save_btn").css('display', 'none');
                        $(".approve_btn").css('display', 'none');
                        $(".checkboxpmu").css('display', 'block');

                    }
                    if (data[0].Status == '') {
                        $(".approve_btn").css('display', 'none');
                        // $(".Mistonelistdiv").css('display', 'block');
                        $(".checkboxpmu").css('display', 'none');
                    }

                    //this for restricting the projects data
                
                data.forEach(element => {

                    if (element.StartDate != '' && element.EndDate != '') {
                        DurationList.push({
                            milestoneName: element.MilestoneName,
                            Duration: element.Duration,
                            MilestoneId: element.MilestoneId
                        });
                    }

                });

                if (data[0].StartDate == null && data[0].EndDate == null) {
                    data = [];
                }
                var selestedMilestone = $('#multipleSelect').val();

                if (selestedMilestone.length > 0) {
                    for (var i in selestedMilestone) {
                        var optionval = selestedMilestone[i];
                        $("#multipleSelect option[value=" + optionval + "]").prop("selected", false);
                    }
                    $("#multipleSelect").multiselect('refresh');



                }

                if (data.length > 0) {
                    for (var i in data) {
                        var optionVal = data[i].SequenceNo;
                        $("#multipleSelect").find("option[value=" + optionVal + "]").prop("selected", "selected");
                    }
                    $("#multipleSelect").multiselect('refresh');
                    $('.projectName_error').css('display', 'none');
                }

                searchresult = data;
                pmugridData = data;
                //pmugridData[0].SetRelation = '0';

                var condata = searchresult.find(x => x.projectFlag === 'p');
                if (condata != undefined) {
                    searchresult = [];
                }
                MaterialArray = searchresult;
                pmugridData = searchresult;
                CreateJqGrid(data);
                CreateJqGridModal(data);

                data.forEach(element => {

                    pmudetails.push({
                        Duration: element.Duration,
                        MilestoneName: element.MilestoneName,
                        RelationType: element.RelationType,
                        SequenceNo: element.SequenceNo,
                        SetRelation: element.SetRelation
                    })



                })


                var j = 1;
                for (var i = 0; i <= searchresult.length - 1; i++) {

                    if (searchresult[i].Action == "true") {

                        $('#jqg_jqgrid_' + j).prop('checked', true);


                        $('body').addClass("menuitemshow");
                        $('#' + searchresult[i].SequenceNo + 'mapperUserid').val(searchresult[i].UserId);
                        //}

                    }
                    j++;

                }


                $('.datepickerS').datepicker({
                    dateFormat: 'dd/mm/yy',
                    autoclose: true,
                    onSelect: function (e) {
                        ChangeDate($(this).attr('data-id'));
                    }
                });
                $('.datepickerE').datepicker({
                    dateFormat: 'dd/mm/yy',
                    autoclose: true,
                    onSelect: function (e) {
                        EndChangeDate($(this).attr('data-id'));
                    }
                });

                //LoadUser();

                $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
                $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
                var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
                if ($TableHeight > 280) {
                    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
                }
                else {
                    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
                }


            },
            error: function (err) {
            }
        });
    }
    else {
        selected = 's';
        $("div.id_100 select").select2().val(projectId).change();
        $(".submit_btn").css('display', 'none');
        $(".Mistonelistdiv").css('display', 'none');
        $(".checkboxpmu").css('display', 'none');
        $(".projectName_error").html("Please Select Project Name");

    }





    $(".ui-th-div").removeClass('ui-jqgrid-sortable');



    $(".save_btn").on("click", function () {

        DefaultArray = $('#jqgrid').jqGrid('getGridParam', 'data');

        var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
        var myCellData = [];
        //for (var j = rows; j >= 1; j--) {
        //    if ($('#jqg_jqgrid_' + j).is(':not(:checked)')) {


        //    }
        //    else {
        //        myCellData.push(
        //            $('#jqgrid').jqGrid('getRowData', j, 'data')
        //        );
        //    }
        //}
        $.each(pmugridData, function (i, obj) {
            if (obj.Action == 'true') {
                myCellData.push(obj);
            }
        });
        if (myCellData.length == 0) {
            alert("Please select the check box ");
            return false;
        }
        else {
            $.each(myCellData, function (i, obj) {
                // obj.RowId = myCellData.RowId;
                console.log(obj.SequenceNo)
                obj.LineItemNo = i + 1;
                //obj.StartDate = $("#" + obj.SequenceNo + "start_date").val();
                //obj.EndDate = $("#" + obj.SequenceNo + "end_date").val();
                //obj.UserName = $("#" + obj.SequenceNo + "mapperUser").val();
                obj.ProjectId = $("#ProjectId option:Selected").val();
                obj.CreatedBy = $("#LoggedinUser").val();
                obj.Action = "";
                obj.Status = '0';
                obj.MilestoneStatus = 'Open';
                obj.projectFlag = 'p';
            });

            var date = 0;


            $.each(myCellData, function (i, obj) {

                if (obj.UserName == 0 || obj.UserName == "") {
                    date = 1;
                }
            });
            if (date === 1) {
                alert("Please Enter User");
                return false;
            }
            Griddata = JSON.stringify(myCellData);
            var flag = "SAVE";

            $.ajax({
                url: ROOT + 'Master/PMUMapping',
                type: "POST",
                //  dataType: 'JSON',
                data: { Griddata: Griddata, flag: flag },
                success: function (result) {

                    location.reload();
                }
            });
        }
    });


   

    $(".approve_btn").on("click", function () {
        $("#ApproveModal").show();
    });

    $("#OkApproval").on("click", function () {
        
        changedmilestoneIdList = [];

        var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
        // var ProjNameFlag = $("#ProjectId option:Selected").val();
        var myCellData = [];
        //for (var j = rows; j >= 1; j--) {
        //    if ($('#jqg_jqgrid_' + j).is(':not(:checked)')) {
        //    }
        //    else {
        //        myCellData.push(
        //            $('#jqgrid').jqGrid('getRowData', j, 'data')
        //        );
        //    }
        //}
        $.each(pmugridData, function (i, obj) {
            if (obj.Action == 'true') {
                myCellData.push(obj);
            }
        });
        if (myCellData.length == 0) {
            alert("Please select the check box ");
            return false;
        }
        else {
            $.each(myCellData, function (i, obj) {
                // obj.RowId = myCellData.RowId;

                obj.LineItemNo = i + 1;
                //obj.StartDate = $("#" + obj.SequenceNo + "start_date").val();
                //obj.EndDate = $("#" + obj.SequenceNo + "end_date").val();
                //obj.SetRelation = $("#" + obj.SequenceNo + "SetRelation").val();      //changed 
                //obj.UserId = $("#" + obj.SequenceNo + "mapperUserid").val();//.replace(",","");
                //obj.userid = '';
                //obj.UserName = $("#" + obj.SequenceNo + " mapperUser").val();
                obj.ProjectId = projectId;
                obj.CreatedBy = $("#LoggedinUser").val();
                // obj.Action = "";
                //obj.Duration = $("#" + obj.SequenceNo + "Duration").val();
                obj.Status = '1';
                obj.MilestoneStatus = 'Open';
                obj.projectFlag = 'p';

            });


            var date = 0;
            var emptydate = ''
            var emptysetrelation = '';
            var emptyDuration = '';
            $.each(myCellData, function (i, obj) {

                if (obj.UserName == 0 || obj.UserName == "") {
                    date = 1;
                }

                if (obj.StartDate == "" || obj.EndDate == "") {
                    emptydate = 1;
                }
            });

            //$.each(myCellData, function (i, obj) {

            //    if (obj.SetRelation == 0) {
            //        alert('please enter the currect Setrelation');
            //        return false;

            //    }
            //});

            if (emptysetrelation === 1) {
                alert("Please Enter the Set Relation");
                return false;
            }
            if (emptyDuration === 1) {
                alert("Please Enter the Duration");
                return false;
            }
            if (emptydate === 1) {
                alert("Please select the Date");
                return false;
            }
            if (date === 1) {
                alert("Please Enter User");
                return false;
            }
            Griddata = JSON.stringify(myCellData);


            if (projectId != '') {


                $.ajax({
                    url: ROOT + 'Master/PMUMapping',
                    type: "POST",
                    //  dataType: 'JSON',
                    data: { Griddata: Griddata, flag: 'APPROVED', projectId: projectId, changedmilestoneId: changedmilestoneId },
                    success: function (result) {

                        location.reload();
                    }
                });
            }

            //} else {
            //    alert('Set relation must be less than the MilestoneNo');

            //}

        }
    });


    var Historydata;
    function CreateJqGridModal(data) {
        Historydata = data;
        $(".txtOnly").keypress(function (e) {
            var key = e.keyCode;
            if (key >= 48 && key <= 57) {
                e.preventDefault();
            }
        });
    }

    $('.data-datepicker').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        autoclose: true,

    });






    $("#SaveModel").on("click", function () {
        
        DefaultArray = $('#jqgrid').jqGrid('getGridParam', 'data');
        projectId = $('#ProjectId').children(":selected").attr("value");
        var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
        //var ProjNameFlag = $("#ProjectId option:Selected").val();

        var myCellData = [];
        pmugridData[0].SetRelation = '0';
        $.each(pmugridData, function (i, obj) {
            if (obj.Action == 'true') {
                myCellData.push(obj);
            }
        });
        console.log('myCellData', myCellData);

        if (myCellData.length == 0) {
            alert("Please select the check box ");
            return false;
        }
        else {
            $.each(myCellData, function (i, obj) {
                // obj.RowId = myCellData.RowId;

                obj.LineItemNo = i + 1;
                //obj.StartDate = $("#" + obj.SequenceNo + "start_date").val();
                //obj.EndDate = $("#" + obj.SequenceNo + "end_date").val();
                //obj.UserId = $("#" + obj.SequenceNo + "mapperUserid").val();//.replace(",","");
                //obj.Duration = $("#" + obj.SequenceNo + "Duration").val();
                //obj.SetRelation = $("#" + obj.SequenceNo + "SetRelation").val();      //changed 

                //obj.UserName = $("#" + obj.SequenceNo + "mapperUser").val(); //.replace(",","");
                obj.ProjectId = projectId;
                obj.CreatedBy = $("#LoggedinUser").val();
                // obj.Action = "";
                obj.Status = '1';
                obj.MilestoneStatus = 'Open';
                obj.projectFlag = 'p';
            });
            console.log('myCellData', myCellData);
            var date = 0;
            var emptydate = '';
            var emptysetrelation = '';
            var emptyDuration = '';
            $.each(myCellData, function (i, obj) {
                
                if (obj.UserName == "" || obj.UserId == "" || obj.UserId == undefined) {
                    date = 1;
                }

                if (obj.StartDate == "" || obj.EndDate == "") {
                    emptydate = 1;
                }
               
                if (obj.SetRelation == '') {
                    emptysetrelation = 1;

                }
                if (obj.Duration == '') {
                    emptyDuration = 1;
                }
            });

            if (emptysetrelation === 1) {
                alert("Please Enter the Set Relation");
                return false;
            }
            if (emptyDuration === 1) {
                alert("Please Enter the Duration");
                return false;
            }
            if (emptydate === 1) {
                alert("Please select the Date");
                return false;
            }
            if (date === 1) {
                alert("Please Enter User");
                return false;
            }



            Griddata = JSON.stringify(myCellData);

            if (ProjStatus == 'APPROVED') {
                // var flag = "APPROVED";

                var flag = " ";

            }
            else {
                var flag = "SUBMIT";
            }
            console.log('AccepptVersionCreation', $('#AccepptVersionCreation').prop('checked'));
            var AccepptVersionCreation = $('#AccepptVersionCreation').prop('checked');

            if (projectId != '') {


                $.ajax({
                    url: ROOT + 'Master/PMUMapping',
                    type: "POST",
                    dataType: 'JSON',
                    data: { Griddata: Griddata, flag: flag, projectId: projectId, changedmilestoneId: changedmilestoneId, AccepptVersionCreation: AccepptVersionCreation },
                    success: function (result) {

                        location.reload();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('err', XMLHttpRequest, textStatus, errorThrown);
                    }
                });

            }
            else {
                // alert('Setrelation must be less than the MilestoneNo');


                $(".projectName_error").html("Please Select Project Name");

            }

        }

    });
    var result = [];
    var miltones = [];
    var newresult = [];
    var MilestoneMasterList = [];
    $("#btnAdd").on("click", function () {
        
        var selectedmiletonesList ='';
        var selestedMilestone = $('#multipleSelect').val();
        $.each(selestedMilestone, function (i) {
            selectedmiletonesList = selectedmiletonesList.concat(',',selestedMilestone[i]);
        });
        console.log(selectedmiletonesList, 'selectedmiletonesList');
        $.ajax({
            url: ROOT + 'Master/MilestoneBasedDuration',
            type: "POST",
            dataType: 'JSON',
            data: { MilestoneName: selectedmiletonesList },
            success: function (result) {
                

                console.log('result', result);
                MilestoneMasterList = result;
                dataBind();
                //pmugridData = result;
               

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('err', XMLHttpRequest, textStatus, errorThrown);
            }
        });



    });



    function dataBind() {
        
        var result = [];
        $("#multipleSelect option:selected").each(function () {
            var $this = $(this);
            if ($this.length) {
                var selText = $this.text();
                miltones.push(
                    selText
                )
            }
        });
       var mainGrid = [];
        var selestedMilestone = $('#multipleSelect').val();
        for (var index = 0; index <= selestedMilestone.length - 1; index++) {
            var found_names = MilestoneMasterList.filter(function (v) {
                return v.SequenceNo == selestedMilestone[index];
            });
            
            mainGrid.push(found_names[0]);
           
        }

        for (var milestone = 0; milestone <= mainGrid.length - 1; milestone++) {
            result.push({
                SequenceNo: mainGrid[milestone].SequenceNo,
                MilestoneId: mainGrid[milestone].MilestoneId,
                MilestoneName: mainGrid[milestone].MilestoneName,
                SetRelation: mainGrid[milestone].SetRelation,
                Duration: mainGrid[milestone].Duration

            })
        }
     
        //for (var i = 1; i <= selestedMilestone.length; i++) {
        //    for (var j = i; j <= i; j++) {
        //        result.push({
        //            SequenceNo: i,
        //            MilestoneId: selestedMilestone[i - 1],
        //            MilestoneName: miltones[j - 1],

        //        })

        //    }

        //}
        console.log(result, 'result');
        
        var griddata = $("#jqgrid").jqGrid('getGridParam', 'data');
        console.log('dropdown', result);
        console.log('griddata', griddata);
       

        const results = griddata.filter(({ SequenceNo: id1 }) => result.some(({ SequenceNo: id2 }) => id2 == id1));
        newresult = results;
        griddata = [];
        console.log(newresult, 'newresult');
        griddata = newresult;
      
        const diff = result.filter(({ SequenceNo: id1 }) => !newresult.some(({ SequenceNo: id2 }) => id2 == id1));

        console.log(diff, 'diff');
        for (var i = 0; i <= diff.length - 1; i++) {
            griddata.push(diff[i]);
        }
        //for (var i = 0; i <= diff.length - 1; i++) {
        //    var len = griddata.length + 1;
        //   griddata.push({
        //       SequenceNo: len,
        //       MilestoneId: diff[i].MilestoneId,
        //       MilestoneName: diff[i].MilestoneName
        //    });
        //    len = len + 1;
        //}
        console.log('griddata', griddata);
        //for (var i = 0; i <= griddata.length - 1; i++) {
        //    griddata[i].SequenceNo = i + 1;

        //}




        if (result.length > 0) {
            pmugridData = griddata;
           // MaterialArray = griddata;
            $.each(pmugridData, function (i) {
                if (i != 0) {
                    objindex = pmugridData.findIndex(obj => obj.SequenceNo == pmugridData[i].SetRelation);
                    if (objindex == -1) {
                        pmugridData[i].SetRelation = '';
                    }
                }


            });
            $('.projectName_error').css('display', 'none');

            $("#jqgrid").jqGrid("clearGridData", true);
            $("#jqgrid").jqGrid('setGridParam', { data: pmugridData });

            $("#jqgrid").trigger('reloadGrid');
            CreateJqGrid(pmugridData);
            CreateJqGridModal(pmugridData);
            var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
            var j = 1
            for (var i = 0; i <= searchresult.length - 1; i++) {

                if (searchresult[i].Action == "true") {

                    //$('#jqgrid').jqGrid('setSelection', rowids[i], result[i].Action);
                    $('#jqg_jqgrid_' + j).prop('checked', true);
                    //  if (($('#jqg_jqgrid_' + j).prop('checked') == true)) {


                    $('body').addClass("menuitemshow");
                    $('#' + searchresult[i].SequenceNo + 'mapperUserid').val(searchresult[i].UserId);
                    // }

                }
                j++;

            }


            $('.datepickerS').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    //ChangeDate($(this).attr('data-id'));
                }
            });
            $('.datepickerE').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    EndChangeDate($(this).attr('data-id'));
                }
            });

            //LoadUser();

            if (result[0].Status == 'SUBMITTED') {
                $(".approve_btn").css('display', 'inline-block');
                $(".Mistonelistdiv").css('display', 'block');
            }
            if (result[0].Status == 'APPROVED') {
                $(".save_btn").css('display', 'none');
                $(".approve_btn").css('display', 'none');
                //   $(".Mistonelistdiv").css('display', 'none');

            }
            if (result[0].Status == '') {
                $(".approve_btn").css('display', 'none');
                // $(".Mistonelistdiv").css('display', 'block');
            }

            $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 280) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
            }
            else {
                $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
            }
        } else {
            $('.projectName_error').css('display', 'block');
            $('.projectName_error').text('Please select the milestones');
            $("#jqgrid").jqGrid("clearGridData", true);
            $("#jqgrid").jqGrid('setGridParam', { data: result });

            $("#jqgrid").trigger('reloadGrid');
        }
    }
});
        
  

var data = JSON.parse('{}');
var Historydata;
function CreateJqGridModal(data) {
    Historydata = data;
}

function CreateJqGrid(data) {
    $.jgrid.gridUnload('#jqgrid');
    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: models,
        loadonce: true,
        viewrecords: true,
        sortable: false,
        // sortorder: 'desc',
        rowNum: 10000,
        multiselect: true,

        beforeSelectRow: function (rowid, e, isSelected) {
            //
            var rowData = $("#list").jqGrid("getRowData", rowid);
            // alert(rowData.milestoneName);
            var $target = $(e.target), $td = $target.closest("td"),
                // iCol = $.jgrid.getCellIndex($td[0]),
                colModel = $(this).jqGrid("getGridParam", "colModel");
            // if (isSelected)
            var isSelected = $('#jqg_jqgrid_' + rowid).prop('checked');

            rowselect(rowid, isSelected);

            if ($target.is(":checkbox")) {
                return false;
            }

            return true;

        },
        onSelectRow: function (rowid, isSelected, event) {
            // 
            console.log(event);
            var rowData = $("#list").jqGrid("getRowData", rowid);

            var checkbox = jQuery(this).find('#' + rowid + ' input#jqg_list_' + rowid + '[type=checkbox]');

            if ($(checkbox).is(':checked')) {
                $(checkbox).attr('checked', false);
            }
            rowselect(rowid, isSelected);

        },


        scroll: 1,
        pager: '#pager',
        userDataOnFooter: true,

        gridComplete: function () {
            var objRows = $("#jqgrid tbody tr");
            var objHeader = $("#jqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            // for loop MaterialArray
            // loop $("#jqgrid tbody tr") foreach loop
            // for each element's td:nth-child(4) text val == MaterialArray[i].SequenceNo
            // select first td and textbox inside the element and check the textbox
            
            console.log('MaterialArray', MaterialArray);
            //MaterialArray = pmugridData;
            for (var i = 0; i < MaterialArray.length; i++) {
                $("#jqgrid tbody tr").each(function (index, e) {

                    if ($(e).find("td:nth-child(4)").text() == MaterialArray[i].SequenceNo) {
                        console.log('MilestoneStatus', $(e).MilestoneStatus);
                        $(e).find("td:nth-child(1) input").attr("checked", true);

                        if ($(e).find("td:nth-child(6)").text() == 'Completed') {
                            $(e).find("td:nth-child(1) input").attr("disabled", true);

                        }

                        $('#' + MaterialArray[i].SequenceNo + 'start_date').val(MaterialArray[i].StartDate);
                        $('#' + MaterialArray[i].SequenceNo + 'end_date').val(MaterialArray[i].EndDate);
                        $('#' + MaterialArray[i].SequenceNo + 'mapperUserid').val(MaterialArray[i].UserId);
                        $('#' + MaterialArray[i].SequenceNo + 'mapperUser').val(MaterialArray[i].UserName);
                    }
                });

            }
            //durationflag = true;
            //if (!durationflag)
            //{
            //    jQuery('#jqgrid').trigger('reloadGrid');

            //}

            $('.datepickerS').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    ChangeDate($(this).attr('data-id'), $(this).attr('id'));
                }
            });
            $('.datepickerE').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    EndChangeDate($(this).attr('data-id'), $(this).attr('id'));
                }
            });

            LoadUser();




        },



        loadComplete: function () {
            var $grid = $('#jqgrid');
            // $("#jqgrid").jqGrid("setGridParam", { beforeSelectRow: function (rowid, e) { return $(e.target).is("input:checkbox"); } });
            var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
            $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
            $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
            parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
        }

    });

    $("#jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('.allownumericwithdecimal').keypress(function (e) {

        var charCode = (e.which) ? e.which : event.keyCode;
        if (String.fromCharCode(charCode).match(/[^0-9,\b]/g))

            return false;
    });
    $(".txtOnly").keypress(function (e) {
        var key = e.keyCode;
        if (key >= 48 && key <= 57) {
            e.preventDefault();
        }
    });


}


function EditUser(rowid) {
    
    // alert('hi');
    var rowData = $('#jqgrid').getRowData(rowid);
    usernumber = rowData.SequenceNo;
    var username = $('#' + usernumber + 'mapperUser').val();
    var userid = $('#' + usernumber + 'mapperUserid').val();
    if (username == '') {
        objindex = MaterialArray.findIndex(obj => obj.SequenceNo == usernumber);
        MaterialArray[objindex].UserId = '';
        MaterialArray[objindex].UserName = '';
        objindex = pmugridData.findIndex(obj => obj.SequenceNo == usernumber);
        pmugridData[objindex].UserId = '';
        pmugridData[objindex].UserName = '';
    }


}


var availableTags = [];
var usersMap = {};
var availabledata = [];
function LoadUser() {
    
    $.ajax({
        url: ROOT + 'Master/UserList',
        type: "POST",
        async: false,
        cache:false,
        dataType: 'JSON',
        //data: { "Griddata": DefaultArray },
        success: function (result) {

            availableTags = [];
            usersMap = {};

            result.forEach(element => {

                availableTags.push({
                    label: element.UserName,
                    value: element.UserId
                });

                usersMap[element.UserName] = element.UserId;

            });
            console.log('result', result);
            console.log('availableTags', availableTags);
            console.log('usersMap', usersMap);

            $(".tags").autocomplete({

                //source: availableTags,
                source: function (request, response) {

                    var term = request.term;
                    var item = request.term;
                    var terms = [];

                    var FullList = [];

                    // substring of new string (only when a comma is in string)
                    if (term.indexOf(',') > 0) {

                        FullList = term.split(/;/g);
                        FullList.pop();
                        $.each(FullList, function (i, v) {
                            //v = $.trim(v).toLowerCase();
                            v = v.replace(/^\s+/, "").toLowerCase();
                        })

                        var index = term.lastIndexOf(',');
                        term = term.substring(index + 1);
                    }

                    // regex to match string entered with start of suggestion strings
                    var regex_validated_array = [];
                    if ($.trim(term).length > 0) {
                        //var re = $.ui.autocomplete.escapeRegex(term);
                        var re = term;
                        var matcher = new RegExp('^' + re, 'i');

                        regex_validated_array = $.grep(availableTags, function (item, index) {
                            //return matcher.indexOf(item)!=-1;
                            return $.trim(item.label).toLowerCase().indexOf(re.toLowerCase()) != -1 && (FullList.length == 0 || FullList.length > 0 && !FullList.includes($.trim(item.label)));
                        });
                    }

                    // pass array `regex_validated_array ` to the response and 
                    // `extractLast()` which takes care of the comma separation

                    response($.ui.autocomplete.filter(regex_validated_array.slice(0, 50),
                        extractLast(term)));

                    //added for remove
                    console.log(item, 'term');

                    item = item.split(',');
                    item.forEach(term => {
                        terms.push(term.trim());
                    });
                    console.log('terms', terms);
                    var userIds = [];
                    terms.forEach(term => {

                        userIds.push(usersMap[term]);
                    });

                    // empty strings for adding , at the end
                    userIds.push('');
                    terms.push('');

                    this.value = terms.join(',');

                    useridslist = userIds.join(',');
                    $('#' + usernumber + 'mapperUserid').val(userIds.join(','));


                },
                focus: function () {
                    return false;
                },

                select: function (event, ui) {

                    var items = [];
                    // var row_id = $(event.target).parent('td').parent('tr').attr('id');

                    // preparing all the user's actual names list
                    var terms = split(this.value.trim());
                    terms.pop();
                    /* Logic goes here */
                    var inArrayExists = terms.indexOf(ui.item.label);
                    if (inArrayExists != -1) {
                        alert('Duplicate selection is not allowed');
                    } else {
                        terms.push(ui.item.label);
                    }
                    terms.forEach(term => {
                        items.push(term.trim());
                    });


                    // preparing all the user IDs list
                    var userIds = [];
                    items.forEach(term => {
                        userIds.push(usersMap[term]);
                    });
                    //remove du
                    // empty strings for adding , at the end
                    userIds.push('');
                    items.push('');

                    this.value = terms.join(',');
                    useridslist = userIds.join(',');
                    $('#' + usernumber + 'mapperUserid').val(userIds.join(','));
                    objindex = MaterialArray.findIndex(obj => obj.MilestoneId == selectedmilestoneId);
                    MaterialArray[objindex].UserId = userIds.join(',');
                    MaterialArray[objindex].UserName = this.value;
                    objindex = pmugridData.findIndex(obj => obj.MilestoneId == selectedmilestoneId);
                    pmugridData[objindex].UserId = userIds.join(',');
                    pmugridData[objindex].UserName = this.value;

                    $("#jqgrid").trigger('reloadGrid');

                    return false;


                }

            });


        },
        error: function (result) {
            
        }
    });
}
function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}

$('.tags').keyup(function (e) {
    

    if (e.keyCode == 8) alert('backspace trapped');
})  



$("#ProjectId").on("change", function () {

    if (display == 's') {
        DurationList = []; searchresult = [];
        MaterialArray = [];
        $("#milestonedropdown").css('display', 'block');

        var ProjectName = $("#ProjectId option:Selected").text();
        var projectId = $('#ProjectId').val()
        var pMUMapping = {
            ProjectName: ProjectName,
            ProjectId: parseInt(projectId)
        }
        if (projectId == "0") {
            $(".projectName_error").show();
            $(".Mistonelistdiv").css('display', 'none');
            $(".checkboxpmu").css('display', 'none');
            $(".projectName_error").html("Please Select Project Name");
            $.ajax({
                url: ROOT + "Master/NewProjectmappingList",
                type: 'POST',
                data: { pMUMapping: pMUMapping },
                dataType: 'JSON',
                success: function (result) {
                    console.log('result', result);
                    $("#jqgrid").jqGrid("clearGridData", true);

                    $(".approve_btn").css('display', 'none');
                    //  $('.Mistonelistdiv').hide();
                }
            });

        }
        else {
            console.log('project name changed');
            $(".projectName_error").html("");
            $("#SaveModel").show();
            $("#SaveModel1").show();
            $(".Mistonelistdiv").css('display', 'black');
            $(".checkboxpmu").css('display', 'none');
            DefaultArray = $('#jqgrid').jqGrid('getGridParam', 'data');
            var pMUMapping = {
                ProjectName: ProjectName,
                ProjectId: parseInt(projectId)
            }
            $.ajax({
                url: ROOT + "Master/NewProjectmappingList",
                type: 'POST',
                data: { pMUMapping: pMUMapping },
                dataType: 'JSON',
                success: function (result) {
                    console.log('result', result);
                    var condata = result.find(x => x.projectFlag === 'p');
                    if (condata != undefined) {
                        result = [];
                        $('#ApproveModal').hide();
                        $('.Mistonelistdiv').hide();
                        $(".projectName_error").hide();

                        $(".approve_btn").css('display', 'none');
                        alert('Details about this project can be found in the PMU mapping page');
                        $('#loader').css('visibility', 'hidden');

                        //$("#jqgrid").jqGrid("clearGridData", true);
                        //$("#jqgrid").jqGrid('setGridParam', { data: result });

                        //$("#jqgrid").trigger('reloadGrid');

                        CreateJqGrid(result);

                    } else {
                        ProjStatus = result[0].Status;
                        PMUFlag = result[0].Flag;
                        if (result[0].Status == 'SUBMITTED') {
                            $(".approve_btn").css('display', 'inline-block');
                            $(".Mistonelistdiv").css('display', 'block');
                            $(".checkboxpmu").css('display', 'none');
                        }
                        if (result[0].Status == 'APPROVED') {
                            $(".save_btn").css('display', 'none');
                            $(".approve_btn").css('display', 'none');
                            //   $(".Mistonelistdiv").css('display', 'none');
                            $(".checkboxpmu").css('display', 'block');
                        }
                        if (result[0].Status == '') {
                            $(".approve_btn").css('display', 'none');
                            $(".Mistonelistdiv").css('display', 'block');
                            $(".checkboxpmu").css('display', 'none');
                        }
                        if (result[0].StartDate == null && result[0].EndDate == null) {
                            result = [];
                        }
                        var selestedMilestone = $('#multipleSelect').val();

                        if (selestedMilestone.length > 0) {
                            for (var i in selestedMilestone) {
                                var optionval = selestedMilestone[i];
                                $("#multipleSelect option[value=" + optionval + "]").prop("selected", false);
                            }
                            $("#multipleSelect").multiselect('refresh');



                        }

                        if (result.length > 0) {
                            for (var i in result) {
                                var optionVal = result[i].SequenceNo;
                                $("#multipleSelect").find("option[value=" + optionVal + "]").prop("selected", "selected");
                            }
                            $("#multipleSelect").multiselect('refresh');
                            $('.projectName_error').css('display', 'none');
                        }
                        $.each(result, function (i, obj) {
                            obj.SequenceNo = i + 1;
                        })


                        pmugridData = result;

                        var selectedmilestonedata = pmugridData.filter(obj => obj.Action != null && obj.Action != '');
                         selectedmilestonedata = selectedmilestonedata.sort(SortByDate);
                        console.log('selectedmilestonedata', selectedmilestonedata);
                        var unselectedmilestonedata = pmugridData.filter(obj => obj.Action == null || obj.Action == '');
                        Array.prototype.push.apply(selectedmilestonedata, unselectedmilestonedata);
                        pmugridData = selectedmilestonedata;
                        //$("#jqgrid").jqGrid("clearGridData", true);
                        //$("#jqgrid").jqGrid('setGridParam', { data: pmugridData });

                        //$("#jqgrid").trigger('reloadGrid');

                        CreateJqGrid(result);
                        //CreateJqGridModal(result);
                        searchresult = result;
                       

                        var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
                        var j = 1
                        for (var i = 0; i <= searchresult.length - 1; i++) {

                            if (searchresult[i].Action == "true") {

                                //$('#jqgrid').jqGrid('setSelection', rowids[i], result[i].Action);
                                $('#jqg_jqgrid_' + j).prop('checked', true);
                                // if (($('#jqg_jqgrid_' + j).prop('checked') == true)) {
                                MaterialArray.push(searchresult[i]);

                                $('body').addClass("menuitemshow");
                                $('#' + searchresult[i].SequenceNo + 'mapperUserid').val(searchresult[i].UserId);
                                //}

                            }
                            j++;

                        }


                        $('.datepickerS').datepicker({
                            dateFormat: 'dd/mm/yy',
                            autoclose: true,
                            onSelect: function (e) {
                                ChangeDate($(this).attr('data-id'));
                            }
                        });
                        $('.datepickerE').datepicker({
                            dateFormat: 'dd/mm/yy',
                            autoclose: true,
                            onSelect: function (e) {
                                EndChangeDate($(this).attr('data-id'));
                            }
                        });

                        //LoadUser();



                        $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
                        $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
                        var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
                        if ($TableHeight > 280) {
                            $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                            $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
                        }
                        else {
                            $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
                        }
                    }

                }
            });
        }
    }
});




$('.displaycheck').on('change', function () {
    var Accept = $('#AccepptVersionCreation').prop('checked');
    if (Accept == true) {
        alert('Are you sure do you want to create new version ?');
    }
})

$('#Addmilestone').on('click', function () {
    $('#SequenceNo').val('');
    $('#MilestoneName').val('');
    $('#Setrelation').val('');
})

function ChangeDate(rowid, Sequnce) {


    
    if (sort) {


        var SequnceRowId = parseInt(Sequnce.substring(0, 2));

        var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);//row data
        var changedmilestoneId = Sequnce;

        var relationid = $('#' + SequnceRowId + 'SetRelation').val();

        var rowindex = 0;
        if (($('#jqg_jqgrid_' + rowid).prop('checked') == false)) {
            //alert('Please select the checkbox');
            $("#" + SequnceRowId + "start_date").val('');
            objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
            pmugridData[objIndex].StartDate = '';
            alert('Milestone are not selected for this for project');


        }
        if (rowid > 1) {

            var endDate = moment($("#" + relationid + "end_date").val(), 'DD-MM-YYYY');
            var startDate = moment($("#" + changedmilestoneId + "start_date").val(), 'DD-MM-YYYY');
            if (endDate > startDate) {
                alert('Selected date must be after the relation milestone end date');
                $("#" + changedmilestoneId + "start_date").val('');
                $("#" + changedmilestoneId + "end_date").datepicker("setDate", '');

            }

        }


        for (let days of pmugridData) {
            for (var i = 1; i <= pmugridData.length; i++) {
                if (($('#jqg_jqgrid_' + i).prop('checked') == true)) {

                    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);

                    var sd = $("#" + dataFromTheRow.SequenceNo + "start_date").val();

                    if (days.MilestoneName == dataFromTheRow.MilestoneName) {

                        rowindex++;
                        console.log('changedmilestoneId', changedmilestoneId);
                        if (($('#jqg_jqgrid_' + rowid).prop('checked') == true)) {

                            var startdatechange = moment(sd, 'DD/MM/YYYY');
                            var Enddate = '';
                            if (setrelationchanged) {//this false while change the duration after set 
                                Enddate = moment(startdatechange).add(days.Duration, 'days').format('DD/MM/YYYY');

                            } else {
                                Enddate = moment(startdatechange).add(days.Duration - 1, 'days').format('DD/MM/YYYY');

                            }

                            console.log('Enddate', Enddate);
                            $("#" + dataFromTheRow.SequenceNo + "end_date").val(Enddate);
                            $("#" + dataFromTheRow.SequenceNo + "end_date").datepicker("setDate", Enddate);
                            objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                            pmugridData[objIndex].EndDate = Enddate;
                            pmugridData[objIndex].StartDate = sd;
                            objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                            MaterialArray[objIndex].EndDate = Enddate;
                            MaterialArray[objIndex].StartDate = sd;


                        }

                        var nextRowId = parseInt(rowid) + 1;
                        var nextSequncerow = parseInt(changedmilestoneId) + 1;
                        console.log('nextRowId', nextRowId);
                        if (($('#jqg_jqgrid_' + nextRowId).prop('checked') == true)) {
                            var setrelationDate = '';

                            var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', nextRowId);
                            if (dataFromTheRow.MilestoneStatus != 'Completed') {
                                if (rowindex != DurationList.length) {
                                    //var SetRelation = dataFromTheRow.SetRelation;

                                    var SetRelation = $("#" + dataFromTheRow.SequenceNo + "SetRelation").val();
                                    console.log('seq', dataFromTheRow.SequenceNo);
                                    console.log('set', SetRelation);
                                    // var seq = dataFromTheRow.SetRelation;
                                    SetRelation = SetRelation.split(',');

                                    //SetRelation.forEach((function (item, index) {
                                    //    setrelationDate = $("#" + SetRelation[index] + "end_date").val();

                                    //}));

                                    FindRowIDsequnce = Math.max.apply(Math, SetRelation);

                                    setrelationDate = $("#" + FindRowIDsequnce + "end_date").val();
                                    ////Getting the set relation enddate
                                    //if (setrelationDate == '' || setrelationDate == null) {

                                    //       setrelationDate = await get_relation_end_date(dataFromTheRow.SequenceNo, [], 1);

                                    //}


                                    var nextStartDate = new Date(setrelationDate.split("/").reverse().join("-"));


                                    var newDate = moment(nextStartDate).add(1, 'days').format('DD/MM/YYYY');


                                    $("#" + dataFromTheRow.SequenceNo + "start_date").val(newDate);
                                    $("#" + dataFromTheRow.SequenceNo + "start_date").datepicker("setDate", newDate);
                                    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                                    pmugridData[objIndex].StartDate = newDate;
                                    objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                                    MaterialArray[objIndex].StartDate = newDate;

                                }
                            }

                        } else {
                            //changedmilestoneId++;
                            rowid++
                            //i = changedmilestoneId;
                            break;
                        }


                        sd = $("#" + nextRowId + "start_date").val();

                        //  changedmilestoneId++;
                        rowid++;


                    }
                } else {
                    break;
                }
            }
        }
    } else {
        sort = false;
        alert('Please click on refresh button for sorting the records based on dependancy');

    }

}

function EndChangeDate(rowid, Sequnce) {
    
    //   $("#jqgrid").jqGrid('getLocalRow', rowid).EndDate = $.trim($("#" + rowid + "end_date").val());
    // $("#jqgrid").jqGrid('getLocalRow', rowid).StartDate = $.trim($("#" + rowid + "start_date").val());
    var iserror = false;
    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
    if (($('#jqg_jqgrid_' + rowid).prop('checked') == false)) {
        //alert('Please select the checkbox');
        $("#" + dataFromTheRow.SequenceNo + "end_date").val('');
        objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
        pmugridData[objIndex].StartDate = '';

    }

    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    pmugridData[objIndex].EndDate = $("#" + dataFromTheRow.SequenceNo + "end_date").val();

    changedmilestoneId = dataFromTheRow.SequenceNo;
    var setrelation = parseInt($("#" + changedmilestoneId + "SetRelation").val());

    var sDate = $("#" + changedmilestoneId + "start_date").val().split('/').join('-');
    var eDate = $("#" + changedmilestoneId + "end_date").val().split('/').join('-');

    var ssdate = new Date(sDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    var eedate = new Date(eDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

    var milli_secs = ssdate - eedate;

    var days = milli_secs / (1000 * 3600 * 24);
    var diff = Math.round(Math.abs(days));

    $("#" + changedmilestoneId + "Duration").val(diff + 1);



    if (durationflag) {
        DurationList.forEach(function (item, index) {
            if (index == rowid - 1) {
                DurationList[index].Duration = diff;
            }
        });


    } else {
        DurationList.forEach(function (item, index) {
            if (index == rowid - 1) {
                DurationList[index].Duration = diff + 1;
            }
        });

    }

    objIndex = searchresult.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    searchresult[objIndex].Duration = diff + 1;
    console.log('After', searchresult);

    //var rowindex = parseInt(changedmilestoneId);
    var rowindex = parseInt(rowid) + 1;
    var SequnceRow = changedmilestoneId;
    var nextSequnce = parseInt(changedmilestoneId) + 1;
    // var nextRowId = parseInt(rowindex) + 1;

    for (var i = 1; i <= pmugridData.length - 1; i++) {
        if (($('#jqg_jqgrid_' + i).prop('checked') == true)) {

            for (var j = 0; j <= pmugridData.length - 1; j++) {

                var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowindex);
                var startDate = moment($("#" + rowid + "start_date").val(), 'DD-MM-YYYY');
                var endDate = moment($("#" + rowid + "end_date").val(), 'DD-MM-YYYY');

                if (issetrelationchanged) {
                    if (startDate > endDate) {
                        alert("End date should be greater than Start date");
                        $("#jqgrid").jqGrid('getLocalRow', SequnceRow).EndDate = "";
                        $("#" + SequnceRow + "end_date").val('');
                        $("#" + SequnceRow + "end_date").datepicker('setDate', '');
                        // $("#jqgrid").trigger('reloadGrid');
                        iserror = true;

                        break;
                    }
                }
                if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {



                    if (pmugridData[j].MilestoneName == dataFromTheRow.MilestoneName) {


                        var NextdataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowindex);

                        if (NextdataFromTheRow.MilestoneStatus != 'Completed') {
                            var sequnceno = NextdataFromTheRow.SequenceNo;
                            var NextrowSetrealtion = $('#' + sequnceno + 'SetRelation').val();
                            var ed = $("#" + NextrowSetrealtion + "end_date").val();

                            var stardatechange = new Date(ed.split("/").reverse().join("-"));

                            var newDate = moment(stardatechange).add(1, 'days').format('DD/MM/YYYY');


                            if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {
                                $("#" + sequnceno + "start_date").val(newDate);
                                $("#" + sequnceno + "start_date").datepicker("setDate", newDate);
                                objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceno));
                                pmugridData[objIndex].StartDate = newDate;
                                objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == sequnceno));
                                MaterialArray[objIndex].StartDate = newDate;

                            }
                        }

                        var enddateformate = new Date(newDate.split("/").reverse().join("-"));
                        var duration = $('#' + sequnceno + 'Duration').val();
                        if (durationflag) {
                            var Enddate = moment(enddateformate).add(duration, 'days').format('DD/MM/YYYY');
                        } else {
                            Enddate = moment(enddateformate).add(duration - 1, 'days').format('DD/MM/YYYY');
                        }

                        if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {
                            $("#" + sequnceno + "end_date").val(Enddate);
                            $("#" + sequnceno + "end_date").datepicker("setDate", Enddate);
                            objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceno));
                            pmugridData[objIndex].EndDate = Enddate;
                            objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == sequnceno));
                            MaterialArray[objIndex].EndDate = Enddate;
                        }

                        rowindex++;




                    }
                }
                else {
                    rowindex++;

                }


            }

        }
        if (iserror) {
            break;
        }
    }
    $("#jqgrid").jqGrid('getLocalRow', rowindex).StartDate = '';


}

function rowselect(rowid, isSelected) {
    
    var rowempty = true;
    selectedrowid = rowid;
    var rowData = $('#jqgrid').getRowData(rowid);
    selectedmilestoneId = rowData.MilestoneId;
    console.log('rowData', rowData);
    beforesetrelation = $('#' + rowData.SequenceNo + 'SetRelation').val();
    beforeDuration = $('#' + rowData.SequenceNo + 'Duration').val();
    var seqNo = rowData.SequenceNo;
    allData = $('#jqgrid').jqGrid('getGridParam', 'data');

    if (isSelected == true) {

        if (beforesetrelation == '') {
            alert('Please enter the set relation for this milestone');
            $('#jqgrid').jqGrid('setCell', rowid, 'Action', 0);
            $('#jqg_jqgrid_' + rowid).prop('checked', false);
        } else {


            setrelationchanged = false;
            if (selectedrowid == '1') {
                objIndex = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo);
                pmugridData[objIndex].Action = 'true';
            }
            if (beforesetrelation == undefined) {
                var index1 = -1;
                var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                if (index1 == -1) {
                    MaterialArray.push(pmugridData[objIndex]);
                }
            }
            //Added
            objIndex = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo);
            pmugridData[objIndex].Action = 'true';
            var index1 = -1;
            var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
            if (index1 == -1) {
                MaterialArray.push(pmugridData[objIndex]);
            }

            var relation = $('#' + seqNo + 'SetRelation').val();
            if (relation != undefined) {
                relation = relation.split(',');

                var data = $('#jqgrid').jqGrid('getGridParam', 'data');

                for (var j = 0; j <= relation.length - 1; j++) {
                    for (var i = 0; i <= data.length - 1; i++) {

                        if (data[i].SequenceNo == relation[j]) {
                            //var setrelationrowid = data[i].rowidNo;
                            objindex1 = pmugridData.findIndex(obj => obj.SequenceNo == relation[j]);
                            if (isSelected == true) {
                                if (pmugridData[objindex1].Action == null || pmugridData[objindex1].Action == '') {

                                    alert('Dependent Milestones are not mapped!! ');
                                    $('#jqg_jqgrid_' + rowid).prop('checked', false);

                                    $('#jqgrid').jqGrid('setCell', rowid, 'Action', 0);
                                    pmugridData[objIndex].Action = '';
                                    var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                                    if (index1 > 0) {
                                        MaterialArray.splice(index1, 1);
                                    }
                                    var alertdisplay = true;
                                    break;
                                } else {


                                    objIndex = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo && obj.MilestoneName == rowData.MilestoneName);
                                    pmugridData[objIndex].Action = 'true';
                                    var index1 = -1;
                                    var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                                    if (index1 == -1) {
                                        MaterialArray.push(pmugridData[objIndex]);
                                    }

                                    beforesetrelation = Math.max.apply(Math, relation);

                                    objIndex = pmugridData.findIndex(obj => obj.SequenceNo == beforesetrelation);
                                    var relationenddate = pmugridData[objIndex].EndDate;
                                    // var relationenddate = $("#" + setrelationsequnce + "end_date").val();
                                    if (relationenddate != undefined && relationenddate != '') {
                                        //var rowdata = $("#jqgrid").jqGrid('getLocalRow', rowid).SequenceNo;
                                        var startdatechange = new Date(relationenddate.split("/").reverse().join("-"));
                                        var Enddate = moment(startdatechange).add(1, 'days').format('DD/MM/YYYY');
                                        $("#" + seqNo + "start_date").val(Enddate);//For startdate
                                        //$("#" + seqNo + "start_date").datepicker("setDate", Enddate);
                                        var enddateforcheckedcheckbox = new Date(Enddate.split("/").reverse().join("-"));
                                        var duration = $('#' + seqNo + 'Duration').val();
                                        var Enddateforcheckedbox = moment(enddateforcheckedcheckbox).add(duration - 1, 'days').format('DD/MM/YYYY');
                                        $("#" + seqNo + "end_date").val(Enddateforcheckedbox);//For enddate
                                        //$("#" + seqNo + "end_date").datepicker("setDate", Enddateforcheckedbox);
                                        var index1 = pmugridData.findIndex(obj => obj.SequenceNo == seqNo);
                                        pmugridData[index1].StartDate = Enddate;
                                        pmugridData[index1].EndDate = Enddateforcheckedbox;
                                        var index1 = MaterialArray.findIndex(obj => obj.SequenceNo == seqNo);
                                        MaterialArray[index1].StartDate = Enddate;
                                        MaterialArray[index1].EndDate = Enddateforcheckedbox;


                                    }
                                    break;

                                }


                            }
                        }

                    }

                    if (alertdisplay) {

                        break;
                    }

                }
            }
        }

    }
    else {


        if (($('#jqg_jqgrid_' + rowid).prop('checked') == false)) {
            var flag = true;
            //objIndex = pmugridData.fin


            for (var i = 0; i <= pmugridData.length - 1; i++) {

                if (pmugridData[i].SetRelation != null) {
                    var SetRelation = pmugridData[i].SetRelation.split(',');


                    for (var k = 0; k <= SetRelation.length - 1; k++) {
                        if (SetRelation[k] == seqNo) {
                            console.log('obj.rowidNo', pmugridData[i].rowidNo);
                            if (pmugridData[i].Action == 'true') {
                                alert('Please check whether the below milestone(s) are dependent on the current milestone');
                                $('#jqgrid').jqGrid('setCell', allData[i].SequenceNo, 'Action', 1);
                                $('#jqg_jqgrid_' + rowid).prop('checked', true);
                                rowempty = false;
                                alertdisplay = true;
                                var index1 = -1;
                                var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                                if (index1 == -1) {
                                    MaterialArray.push(allData[i - 1]);
                                }

                                break;
                            }
                        }

                        //else {

                        //    // var Sequncenumber = DurationList[i].SequenceNo.split(',');
                        //    var index1 = -1;
                        //    var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                        //    if (index1 >= 0) {
                        //        MaterialArray.splice(index1, 1);
                        //    }



                        //    $('#jqg_jqgrid_' + rowid).prop('checked', false);
                        //    DurationList = DurationList.filter(function (obj) {
                        //        return obj.milestoneName !== rowData.MilestoneName;
                        //    });


                        //    $('#jqgrid').jqGrid('setCell', seqNo, 'Action', 0);

                        //}
                    }
                }
                else {
                    //  rowempty = false;
                }
                if (alertdisplay) {

                    break;
                }
            }

            if (rowempty) {
                $("#" + seqNo + "start_date").val('');
                $("#" + seqNo + "end_date").val('');
                $("#" + seqNo + "mapperUser").val('');

                var index1 = -1;
                var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                if (index1 >= 0) {
                    MaterialArray.splice(index1, 1);
                }



                $('#jqg_jqgrid_' + rowid).prop('checked', false);
                DurationList = DurationList.filter(function (obj) {
                    return obj.milestoneName !== rowData.MilestoneName;
                });


                $('#jqgrid').jqGrid('setCell', seqNo, 'Action', 0);


                var index1 = -1;
                var index1 = pmugridData.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                if (index1 >= 0) {
                    pmugridData[index1].StartDate = '';
                    pmugridData[index1].EndDate = '';
                    pmugridData[index1].UserId = '';
                    pmugridData[index1].UserName = '';
                    pmugridData[index1].Action = '';
                }
            }


        }

    }

}

function SortByName(a, b) {
    
    //a.SetRelation = Math.max.apply(Math, a.SetRelation);
    //b.SetRelation = Math.max.apply(Math, b.SetRelation);
    var aName = parseInt(a.SetRelation);
    var bName = parseInt(b.SetRelation);
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}



function ChangeSetRelation(rowid, sequnceNo) {
    

    var lastelement = '';
    var errorflag = true;
    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);//row data
    var SetRelation = $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val();
    if (SetRelation == '0') {
        alert('Please enter valid Set Relation');
        $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val(beforesetrelation);
    }
    allData = $('#jqgrid').jqGrid('getGridParam', 'data');

    var sequncelist = SetRelation.split(',');
    FindRowIDsequnce = Math.max.apply(Math, sequncelist);
    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceNo));
    pmugridData[objIndex].SetRelation = SetRelation;



    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == FindRowIDsequnce));

    var FindRowID = allData.findIndex((obj => obj.SequenceNo == FindRowIDsequnce));

    if (objIndex >=0) {


        if (pmugridData[objIndex].Action == "true") {

            var setrelation = FindRowIDsequnce;
            for (var seq = 0; seq <= sequncelist.length - 1; seq++) {


                if (sequnceNo <= sequncelist[seq]) {
                    // isinvalide = 1;


                    if (sequnceNo == sequncelist[seq]) {
                        errorflag = false;
                        sort = false
                        alert('please enter valide Set Relation ');
                        $("#" + sequnceNo + "SetRelation").val(beforesetrelation);
                    } else {
                        //alert('please click on refresh Button for sorting the records');
                        //var selectedmilestonedata = pmugridData.filter(obj => obj.Action != null && obj.Action != '');
                        //selectedmilestonedata = selectedmilestonedata.sort(SortByName);
                        //console.log('selectedmilestonedata', selectedmilestonedata);
                        //var unselectedmilestonedata = pmugridData.filter(obj => obj.Action == null || obj.Action == '');
                        //Array.prototype.push.apply(selectedmilestonedata, unselectedmilestonedata);
                        //pmugridData = selectedmilestonedata;
                        //$("#jqgrid").jqGrid("clearGridData", true);
                        //$("#jqgrid").jqGrid('setGridParam', { data: pmugridData });
                        //sort = true;
                        //$("#jqgrid").trigger('reloadGrid');
                        sortingrecord();
                        errorflag = true;
                    }

                    //  $("#" + sequnceNo + "SetRelation").val('');
                    break;
                }
            }

            //objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
            //pmugridData[objIndex].SetRelation = SetRelation;
            console.log('After', pmugridData);
            setrelationchanged = true

            if (errorflag) {

                isinvalide = 0;
                var Setrelationrowidend = pmugridData[objIndex].EndDate;
                var enddate = Setrelationrowidend
                if (enddate != '' && enddate != undefined) {

                    var startDateChange = moment(enddate, 'DD/MM/YYYY');
                    //var endDateFromate = new Date(endDateChange.split("/").reverse().join("-"));
                    //  allData[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                    var startdatechange = moment(startDateChange).add(1, 'days').format('DD/MM/YYYY');
                    //$('#' + changedmilestoneId + 'Duration').trigger('focusout()'); 
                    $("#" + sequnceNo + "start_date").val(startdatechange);
                    $("#" + sequnceNo + "start_date").datepicker("setDate", startdatechange);
                    issetrelationchanged = false;
                    // sequnceNo = sequnceNo.concat('start_date');

                    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceNo));
                    pmugridData[objIndex].StartDate = startdatechange;
                    console.log('After', pmugridData);



                    //updating the setrelation in duration list
                    objIndex = DurationList.findIndex((obj => obj.milestoneName == dataFromTheRow.MilestoneName));

                    console.log("Before update: ", DurationList[objIndex]);
                    if (objIndex != -1) {
                        DurationList[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                    }


                    console.log("After update: ", DurationList[objIndex]);

                    objIndex = searchresult.findIndex((obj => obj.MilestoneName == dataFromTheRow.MilestoneName));


                    if (objIndex != -1) {
                        searchresult[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                    }


                    //updating alldate
                    objIndex = allData.findIndex((obj => obj.MilestoneName == dataFromTheRow.MilestoneName));

                    console.log("Before update: ", allData[objIndex]);
                    console.log('SetRelation', $("#" + sequnceNo + "SetRelation").val());
                    if (objIndex != -1) {
                        allData[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                    }



                    console.log("After update: ", allData[objIndex]);

                    if (durationflag == false) {
                        setrelationchanged = false;

                    } else {
                        setrelationchanged = true;

                    }

                    sort = true;
                    sortingrecord();
                    ChangeDate(rowid, sequnceNo + 'start_date');


                }
                else {
                    objIndex = DurationList.findIndex((obj => obj.milestoneName == dataFromTheRow.MilestoneName));

                    console.log("Before update: ", DurationList[objIndex]);
                    if (objIndex != -1) {
                        DurationList[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                    }
                    console.log("After update: ", DurationList[objIndex]);

                    //searchresult update
                    objIndex = searchresult.findIndex((obj => obj.MilestoneName == dataFromTheRow.MilestoneName));



                    if (objIndex != -1) {
                        searchresult[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                    }

                    console.log("After update: ", searchresult[objIndex]);

                    //updating alldate
                    objIndex = allData.findIndex((obj => obj.MilestoneName == dataFromTheRow.MilestoneName));

                    console.log("Before update: ", allData[objIndex]);
                    console.log('SetRelation', $("#" + sequnceNo + "SetRelation").val());
                    if (objIndex != -1) {
                        allData[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                    }




                }
            }

        }

        //} else {
        //    alert('Changed Set relation milestone is not checked');
        //    $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val(beforesetrelation);
        //}
    } else {
        alert('Changed setrelation in not selected');
        $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val('');

    }

}



function ChangeDuration(rowid, sequnceNo) {
    
    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);//row data
    var changedmilestoneId = parseInt(rowid);
    var Duration = $("#" + sequnceNo + "Duration").val();
    changedDuration = Duration;
    console.log(MaterialArray);
    //filter Array
    objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    if (objIndex > 0) {
        MaterialArray[objIndex].Duration = $("#" + sequnceNo + "Duration").val();
        console.log('After', MaterialArray);
    }


    if (Duration == '0') {
        alert("Please enter valid Duration");
        $('#' + sequnceNo + 'Duration').val(beforeDuration);
    }
    Duration = $("#" + sequnceNo + "Duration").val();

    $.each(DurationList, function (index, ele) {
        if (index == rowid - 1) {
            DurationList[index].Duration = Duration;
        }

    })
    console.log('ChangeDuration', DurationList);

    objIndex = searchresult.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    searchresult[objIndex].Duration = $("#" + sequnceNo + "Duration").val();

    console.log('ChangeDuration', searchresult);


    var startDate = $("#" + sequnceNo + "start_date").val();
    if (startDate != '') {
        var startDateChange = moment(startDate, 'DD/MM/YYYY');
        // var endDateFromate = new Date(endDateChange.split("/").reverse().join("-"));

        var endDateChange = moment(startDateChange).add(Duration - 1, 'days').format('DD/MM/YYYY');
        $("#" + sequnceNo + "end_date").val(endDateChange);
        $("#" + sequnceNo + "end_date").datepicker("setDate", endDateChange);
        //main geid data
        objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
        pmugridData[objIndex].EndDate = endDateChange;
        pmugridData[objIndex].Duration = $("#" + sequnceNo + "Duration").val();

        console.log('After', pmugridData);

        sequnceNo = sequnceNo.toString();
        sequnceNo = sequnceNo.concat('start_date');
        durationflag = false;

        EndChangeDate(rowid, sequnceNo);

    }

}

$('#btnRefresh').on('click', function () {

    //sorting start
    sortingrecord();
});


function SortByDate(a, b) {
    if (a.StartDate != '' && b.EndDate != '') {
        var amyDate = a.StartDate.split("/");
        var aNewDate = new Date(amyDate[1] + "," + amyDate[0] + "," + amyDate[2]).getTime();
        var bmyDate = b.EndDate.split("/");
        var bNewDate = new Date(bmyDate[1] + "," + bmyDate[0] + "," + bmyDate[2]).getTime();
        return ((aNewDate < bNewDate) ? -1 : ((aNewDate > bNewDate) ? 1 : 0));
    }
}



function sortingrecord() {
    
    gridselectedrow = [];
    gridselectedrow.push(pmugridData[0]);
    for (var i = 0; i <= MaterialArray.length - 1; i++) {
        var dependedrows = MaterialArray.filter(v => v.SetRelation == gridselectedrow[i].SequenceNo);

        for (var j = 0; j <= dependedrows.length - 1; j++) {
            var index = gridselectedrow.findIndex(x => x.SequenceNo == dependedrows[j].SequenceNo);
            if (index == -1) {
                gridselectedrow.push(dependedrows[j]);
                console.log('gridselectedrow', gridselectedrow);
            }
        }


    }


    console.log('gridselectedrow', gridselectedrow);
    console.log('MaterialArray', MaterialArray);



    //var selectedmilestonedata = pmugridData.filter(obj => obj.Action != null && obj.Action != '');
    //selectedmilestonedata = selectedmilestonedata.sort(SortByName);
    //console.log('selectedmilestonedata', selectedmilestonedata);
    var selectedmilestonedata = gridselectedrow;
    var unselectedmilestonedata = pmugridData.filter(obj => obj.Action == null || obj.Action == '');
    Array.prototype.push.apply(selectedmilestonedata, unselectedmilestonedata);
    pmugridData = [];
    pmugridData = selectedmilestonedata;
    $("#jqgrid").jqGrid("clearGridData", true);
    $("#jqgrid").jqGrid('setGridParam', { data: pmugridData });
    sort = true;
    $("#jqgrid").trigger('reloadGrid');

}










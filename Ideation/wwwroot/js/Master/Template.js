var miltones = [];
var iserror = true;
var Griddata = [];
var TemplateName = '';
var subgrid_table_id = [];
var DurationChange = true;
var Subgrid_data = [];
var PrevSelectedMilestone = [];
var MilestoneMasterList = [];
var rowSequnce = '';
var TotalSubGridData = [];
var firstLoad = true;
var looping = true;

$(document).ready(function () {
    $('#ProjectId').hide();
    $(".projectName_error").hide();
    $('#projectNameList').hide();
    $('[data-multiselect]').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });

    $("#multipleSelect").find("option[value=" + 1 + "]").prop("selected", "selected");
    $("#multipleSelect").find("option[value=" + 1 + "]").attr("disabled", true);
     $("#multipleSelect").multiselect('refresh');
   $('.projectName_error').css('display', 'none');

    models = [

        {
            name: 'MilestoneId',
            label: 'Milestone Id',
           // width: 60,
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
           
        },

        {
            name: 'SequenceNo',
            label: 'Milestone No',
          /*  width:72,*/
            resizable: true,
            ignoreCase: true,
            sortable: false,
           
        },
        {
            name: 'MilestoneName',
            resizable: true,
          /*  width: 80,*/
            label: 'Milestone Name',
            ignoreCase: true,
            sortable: false,


        },
        {
            name: 'MilestoneStatus',
            resizable: true,
            //width: 150,
            hidden: true,
            label: 'Milestone Name',
            ignoreCase: true,
            sortable: false
        },
        {
            name: 'SetRelation',
            label: 'Set Relation',
            //width: 60,
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

                    } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
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
           // width: 100,
            resizable: true,
            ignoreCase: true,
            hidden: true,
            sortable: false
        },
        {
            name: 'Duration',
            label: 'Duration',
            //width: 60,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {

                if (cellvalue == undefined) {
                    return '<input type="text" data-id="' + options.rowId + '"    id="' + rowobject.SequenceNo + 'Duration" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')" />';

                } else if (rowobject.SubmilestoneExit == 'True') {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'Duration" value="' + rowobject.Duration + '" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')" readonly />';
                } else {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'Duration" value="' + rowobject.Duration + '" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')"  />';
                }


            }

        },

        {
            name: 'SubmilestoneExit',
            label: 'SubmilestoneExit',
            // width: 100,
            resizable: true,
            ignoreCase: true,
            hidden: true,
            sortable: false,
            classes: 'submilestoneexist'
        },
        
    ]

    CreateJqGrid('');
});


function CreateJqGrid(data) {
   // $.jgrid.gridUnload('#jqgrid');
    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: models,
        loadonce: true,
        viewrecords: true,
        sortable: false,
        rowNum: 20,
        scroll: 1,
        pager: '#pager',
        
        gridComplete: function () {
            var objRows = $("#jqgrid tbody tr");
            var objHeader = $("#jqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {
            var rows = $("#jqgrid").getDataIDs();
            
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
    $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 278) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
    }
    else {
        $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");

    }
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


$('#multipleSelect').on('change', function () {
     TemplateName = $('#TemplateName').val();
    if (TemplateName == '') {
        $('#ErrorMeassage').text('Please enter the Template name');
    }
})

$("#btnAdd").on("click", function () {

    var TemplateName = $('#Name').val();
    DurationChange = true;
    if ($('#Name').val() == '') {
        $('#ErrorMeassage').text('Please enter the template name')
        iserror = false;
    } else {
        iserror = true;
        var selectedmiletonesList = '1';
        var selestedMilestone = $('#multipleSelect').val();
        var diffArray = $.grep(selestedMilestone, function (value) {
            return $.inArray(value, PrevSelectedMilestone) === -1;
        });
        PrevSelectedMilestone = selestedMilestone;
        if (selestedMilestone.length == 0) {
            $('#MilestoneList_Error').text('Please select the milestone for template creation')
        }

        $.each(selestedMilestone, function (i) {
            selectedmiletonesList = selectedmiletonesList.concat(',', selestedMilestone[i]);
        });
        firstLoad = true;
        TotalSubGridData = [];
            $.ajax({
                url: ROOT + 'Master/MilestoneBasedDuration',
                type: "POST",
                dataType: 'JSON',
                data: { MilestoneName: selectedmiletonesList },
                success: function (result) {

                    console.log('result', result);
                    if (MilestoneMasterList.length == 0) {
                        MilestoneMasterList = result;
                    } else {
                        for (var i = 0; i < diffArray.length; i++) {
                            var index = result.findIndex(obj => obj.SequenceNo == diffArray[i]);
                            MilestoneMasterList.push(result[index]);
                        }

                    }

                    dataBind();
                    //pmugridData = result;


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log('err', XMLHttpRequest, textStatus, errorThrown);
                }
            });
        
    }

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
    
    var selestedMilestone = ['1',]
    selestedMilestone=$.merge(selestedMilestone, $('#multipleSelect').val());
    for (var index = 0; index <= selestedMilestone.length - 1; index++) {
        var found_names = MilestoneMasterList.filter(function (v) {
            return v.SequenceNo == selestedMilestone[index];
        });

        mainGrid.push(found_names[0]);

    }
    mainGrid=mainGrid.filter(function (element) { return element != undefined });
  
    for (var milestone = 0; milestone <= mainGrid.length-1; milestone++) {
        console.log(mainGrid[milestone].SequenceNo);
        if (mainGrid[milestone].SequenceNo>=0) {

            result.push({
                SequenceNo: mainGrid[milestone].SequenceNo,
                MilestoneId: mainGrid[milestone].MilestoneId,
                MilestoneName: mainGrid[milestone].MilestoneName,
                SetRelation: mainGrid[milestone].SetRelation,
                Duration: mainGrid[milestone].Duration,
                SubmilestoneExit: mainGrid[milestone].SubmilestoneExit
            })
        }
      
    }
    
    if (result.length > 0) {
        $.each(result, function (i) {
            /*if (i == 0) {*/
                objindex = result.findIndex(obj => obj.SequenceNo == result[i].SetRelation);
                if (objindex == -1) {
                    result[i].SetRelation = '';
                }
           // }


        });
        Griddata = result;

        $("#jqgrid").jqGrid("clearGridData", true);
        $("#jqgrid").jqGrid('setGridParam', { data: result });

        $("#jqgrid").trigger('reloadGrid');
        CreateJqGrid(result);
        displayDuration();

        $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
        $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
        
    }
   
}

$('#SaveModel').on('click', function () {
    var TemplateName = $('#Name').val();
    if ($('#Name').val() == '') {
        $('#ErrorMeassage').text('Please enter the template name')
        iserror = false;
    }

    //var Griddata = $('#jqgrid').jqGrid('getGridParam', 'data');
    if (Griddata.length == 0) {
        alert("Please select the check box ");
        return false;
    }
    else {
        if (looping) {

            var emptysetrelation = '';
            var emptyDuration = '';
            var emptyRelationType = ''
            Griddata[0].SetRelation = '0';

            $.each(Griddata, function (i, item) {
                Griddata[i].IsMainMilestone = 'Yes'
            })

            $.each(Griddata, function (i, obj) {
                if (obj.SetRelation == '') {
                    emptysetrelation = 1;

                }
                if (obj.Duration == '') {
                    emptyDuration = 1;
                }
                if (obj.RelationType == '') {
                    emptyRelationType = 1;

                }
            });
            if (emptysetrelation === 1) {
                alert("Please enter the set relation");
                return false;
            }
            if (emptyDuration === 1) {
                alert("Please Enter the Duration");
                return false;
            }

            for (var i = 0; i <= subgrid_table_id.length - 1; i++) {
                var SubGridData = $('#' + subgrid_table_id[i]).jqGrid('getGridParam', 'data');
                $.each(SubGridData, function (i, item) {
                    SubGridData[i].IsMainMilestone = 'No'
                    Griddata.push({
                        Duration: SubGridData[i].Duration,
                        IsMainMilestone: SubGridData[i].IsMainMilestone,
                        MilestoneId: SubGridData[i].SubMilestoneId,
                        MilestoneName: SubGridData[i].SubMilestoneName,
                        SequenceNo: SubGridData[i].SequenceNo,
                        SetRelation: SubGridData[i].SetRelation,
                        RelationType: SubGridData[i].RelationType,
                    })
                })
            }

            TableDetails = JSON.stringify(Griddata);
            if (iserror && $('#ErrorMeassage').text().trim().length == 0) {



                $.ajax({
                    url: ROOT + 'Master/TemaplateDetailsSave',
                    type: "POST",
                    dataType: 'JSON',
                    data: { TableDetails: TableDetails, TemplateName: TemplateName },
                    success: function (result) {
                        console.log(result);
                        location.reload();


                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('err', XMLHttpRequest, textStatus, errorThrown);
                    }
                });

            }

        }
    }

})




$('#Name').on('focusout', function () {
 
    $.ajax({
        url: ROOT + 'Master/TemplateList',
        type: 'get',
        datatype: 'json',
        success: function (result) {
            console.log(result);
            var TemplateList = result;
            var index = TemplateList.findIndex(obj => obj.TemplateName.toUpperCase() == $('#Name').val().toUpperCase());
            if (index >= 0) {
                $('#ErrorMeassage').text('The entered  template name already exists');

            } else {
                $('#ErrorMeassage').text('');

            }
        }
    })

})


function ChangeSetRelation(rowid, sequnceNo) {
    var rowdata = $('#jqgrid').jqGrid('getRowData', rowid);
    var Setrelation = $('#' + rowdata.SequenceNo + 'SetRelation').val();
    var Index = Griddata.findIndex(obj => obj.SequenceNo == Setrelation);
    if (Index >= 0) {
        var rowSetrelation = $('#' + rowdata.SequenceNo + 'SetRelation').val();
        var Index = Griddata.findIndex(obj => obj.SequenceNo == sequnceNo);
        Griddata[Index].SetRelation = rowSetrelation;
        //checking looping 
        findloopingSubgrid(rowdata.SequenceNo, [], 'jqgrid')
        if (looping) {
            
            for (var i = 0; i <= milestoneid_looping.length - 1; i++) {
                $("#jqgrid tbody tr").each(function (index, e) {

                    if ($(e).find("td:nth-child(4)").text() == milestoneid_looping[i]) {
                        //$("#jqgrid").jqGrid('setRowData', rowid, false, { color: 'white', weightfont: 'bold', background: 'orange' });
                        // $(e.target).closest('tr').children('td,th').css('background-color', '#000');
                        $(e).closest('tr').children('td,th').css('background-color', '');

                    }
                });
            }

        } else {

            for (var i = 0; i <= milestoneid_looping.length - 1; i++) {
                $("#jqgrid tbody tr").each(function (index, e) {

                    if ($(e).find("td:nth-child(4)").text() == milestoneid_looping[i]) {
                        //$("#jqgrid").jqGrid('setRowData', rowid, false, { color: 'white', weightfont: 'bold', background: 'orange' });
                        // $(e.target).closest('tr').children('td,th').css('background-color', '#000');
                        $(e).closest('tr').children('td,th').css('background-color', 'orange');

                    }
                });
            }
        }

    } else {
        alert('The entered set relation milestone is not selected in the milestone list');
        $('#' + rowdata.SequenceNo + 'SetRelation').val('');

    }

    if (rowdata.SequenceNo == Setrelation) {
        alert('Please enter the set relation greater or less than the selected milestone');
        $('#' + rowdata.SequenceNo + 'SetRelation').val('');
    }

  

};


function ChangeDuration(rowid, sequnceNo) {
    var rowdata = $('#jqgrid').jqGrid('getRowData', rowid);
    var Duration = $("#" + rowdata.SequenceNo + "Duration").val();

    var Index = Griddata.findIndex(obj => obj.SequenceNo == sequnceNo);
    Griddata[Index].Duration = Duration;
}




function displayDuration(SubGridId, rowid) {

    var SubMilestone_ExitArray = $.grep(Griddata, function (v) {
        return v.SubmilestoneExit === "True"
    });
    console.log('pmugridData', SubMilestone_ExitArray);
    for (var i = 0; i < SubMilestone_ExitArray.length; i++) {
        rowSequnce = SubMilestone_ExitArray[i].SequenceNo;
        SelectedSubMilestoneData = [];
        for (var j = 0; j < TotalSubGridData.length; j++) {
            var index = TotalSubGridData[j].findIndex(obj => obj.SequenceNo == rowSequnce);
            if (index != -1) {
                SelectedSubMilestoneData = TotalSubGridData[j];
            }
        }
        var Data = [];
        Data.push({
            SubMilestoneId: SelectedSubMilestoneData[0].SubMilestoneId,
            Duration: SelectedSubMilestoneData[0].Duration,
        })
        $.each(SelectedSubMilestoneData, function (i, item) {
            var SetReltion = item.SetRelation;
            var iNDEX = Data.findIndex(obj => obj.SubMilestoneId == SetReltion);
            if (item.RelationType == 'FS ( Sequence)') {
                var Duration = parseInt(item.Duration) + parseInt(Data[iNDEX].Duration);
                Data.push({
                    SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                    Duration: Duration
                })

            } else {
                if (item.RelationType == 'SS ( Parallel )') {

                    if (parseInt(item.Duration) > parseInt(Data[iNDEX].Duration)) {
                        Data.push({
                            SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                            Duration: item.Duration
                        })
                    } else {
                        Data.push({
                            SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                            Duration: Data[iNDEX].Duration
                        })
                    }
                }
            }

        })
        console.log('Data', Data);
        var highestSalary = -Infinity; // Initialize with a very small value

        $.each(Data, function (index, obj) {
            if (obj.Duration > highestSalary) {
                highestSalary = obj.Duration;
            }
        });
        console.log('highestSalary', highestSalary);

        var FindSequnce = Griddata.findIndex(obj => obj.SequenceNo == SelectedSubMilestoneData[0].SequenceNo);
        Griddata[FindSequnce].Duration = highestSalary;
        $('#' + Griddata[FindSequnce].SequenceNo + 'Duration').val(highestSalary)

    }
}
var milestoneid_looping = [];

function findloopingSubgrid(row_id, visited_relations, tableid) {

    if (visited_relations.includes(row_id)) {
        alert('There is circle dependency found between the milestones ' + row_id + ' and its relations are: ' + visited_relations);
        milestoneid_looping = visited_relations;
        looping = false;
        return true;
    } else {
        looping = true;
    }
    // get relation id
    var data = Griddata;
    objIndex = data.findIndex(obj => obj.SequenceNo == row_id);

    if (objIndex > 0) {
        var relation = data[objIndex].SetRelation.split(',');

        var Setrelation = Math.max.apply(Math, relation);

        var relation_id = Setrelation;

    } else {
        return true;
    }

    visited_relations.push(row_id);
    findloopingSubgrid(relation_id, visited_relations, tableid);

    return false;
}

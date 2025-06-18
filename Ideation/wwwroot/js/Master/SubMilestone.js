var SubMilestoneList = [];
var SubcombinedArray = [];
var newAddedSubMilestonesList = [];
var RelationDisable = true;
var MainData = [];
var SelectedSubMilestone = '';
var dependentdata = [];
$(document).ready(function () {

    $('#ProjectId').hide();
    $(".projectName_error").hide();

    $('[data-multiselect]').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });

    colmodels = [
        
        {
            name: 'RoleId',
            resizable: true,
            label: 'RoleId',
            hidden: true,
            ignoreCase: true
        },
        {
            name: 'MilestoneId',
            resizable: true,
            label: 'MilestoneId',
            ignoreCase: true,
            hidden: true
        },
        {
            name: 'SubMilestoneName',
            resizable: true,
            label: 'Milestone Name',
            ignoreCase: true
        },
        {
            name: 'SubMilestoneId',
            label: 'Sequence No',
          
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'RelationType',
            resizable: true,
            label: 'Relation Type',
            ignoreCase: true,
            //hidden: true
        },
        {
            name: 'SetRelation',
            resizable: true,
            label: 'Set Relation',
            ignoreCase: true
        },
        {
            name: 'Duration',
            resizable: true,
            label: 'Duration',
            ignoreCase: true
        },
        {
            name: 'MilestoneStatus',
            resizable: true,
           
            label: 'Status',
            ignoreCase: true,

            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.MilestoneStatus == "True") {
                    return '<span class="text-success">Active</span>';
                }
                else {
                    return '<span class="text-danger">InActive</span>';

                }
            }
        },
    ]


    CreateJqGrid('');
});

function CreateJqGrid(data) {

    $('#loader').css('visibility', 'visible');

    // $.jgrid.gridUnload('#jqgrid');
    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        sortable: false,
        rowNum: 20,
        scroll: 1,
        autowidth:true,
        pager: '#pager',
        userDataOnFooter: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            // return (cm[i].name === 'cb');
            return (cm[i].name === '');
        },

        onCellSelect: function (rowid, ci, html, e) {

            fileuploadedrow = rowid;
            var status = $('#jqg_jqgrid_' + rowid).prop('checked');
            if ($(e.target).hasClass('cbox')) {
                rowselect(rowid, status);
            }

        },
        gridComplete: function () {
            for (var i = 0; i < MainData.length; i++) {
                $("#jqgrid tbody tr").each(function (index, e) {

                    if ($(e).find("td:nth-child(5)").text() == MainData[i].SubMilestoneId && MainData[i].Action == 'True') {
                        // console.log('MilestoneStatus', $(e).MilestoneStatus);
                        $(e).find("td:nth-child(1) input").attr("checked", true);
                    }
                });
             }


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
    $('#loader').css('visibility', 'hidden');
}

$('#MilestoneList').on('change', function () {

    var selectedMilestone_id = parseInt($('#MilestoneList').val());

    $.ajax({
        url: ROOT + 'Master/GetSubMilestones',
        type: "POST",
        async: false,
        data: { SequnceNo: selectedMilestone_id },
        success: function (result) {

            console.log('result', result);
            var data = [];
            SubMilestoneListnew = [];
            SubMilestoneList = [];
            $.each(result, function (i, obj) {
                SubMilestoneListnew.push(obj);

            })
          
            var combinedArray = $.merge([], SubMilestoneListnew.concat(SubMilestoneList));
            SubcombinedArray = combinedArray;
            MainData = combinedArray;
                $("#jqgrid").jqGrid("clearGridData", true);
                jQuery('#jqgrid').jqGrid('setGridParam', { data: combinedArray });
                jQuery('#jqgrid').trigger('reloadGrid');
                CreateJqGrid(result);
            
            var DropdownData = $.grep(combinedArray, function (item) {
                return item.MilestoneStatus == 'True';
            });
            $.each(DropdownData, function (i, obj) {
                data.push({
                    value: obj.SubMilestoneId,
                    text: obj.SubMilestoneName
                })
            })
            var dropdown = $('#Setrelation');
            dropdown.empty();

            // Loop through the options and add each one to the dropdown
            $.each(data, function (index, option) {
                dropdown.append($('<option>').val(option.value).text(option.text));
            });

            var data = $("#jqgrid").jqGrid("getGridParam", 'data');
            var Sequnce = data.length;
           
           
            //    $("#jqgrid").jqGrid("clearGridData", true);
            //jQuery('#jqgrid').jqGrid('setGridParam', { data: result });
            //    jQuery('#jqgrid').trigger('reloadGrid');
            //    CreateJqGrid(result);
            
            $('#Name').val('');
            $("#Duration").val('');

            $('#MilestoneList_ErrorMilestoneList_Error').text('');
        }
    });



});



var SubMilestoneListnew = '';
//var Sequnce = 1;
$('#AddSubMilestone').click(function () {
   
    var selectedMilestone_id = parseInt($('#MilestoneList').val());
    if (selectedMilestone_id > 0) {
        $.ajax({
            url: ROOT + 'Master/GetSubMilestonesCount',
            type: "POST",
            async: false,
            data: { SequnceNo: selectedMilestone_id },
            success: function (result) {

                var data = [];
                SubMilestoneListnew = [];
                var DropdownData = $.grep(SubcombinedArray, function (item) {
                    return item.MilestoneStatus == 'True';
                });
                $.each(DropdownData, function (i, obj) {
                    data.push({
                        value: obj.SubMilestoneId,
                        text: obj.SubMilestoneName
                    })
                })
                console.log('data', data);
                var dropdown = $('#Setrelation');
                dropdown.empty();
                dropdown.append($('<option>').val('0').text('--Select--'));
                // Loop through the options and add each one to the dropdown
                $.each(data, function (index, option) {
                    dropdown.append($('<option>').val(option.value).text(option.text));
                });

                var data = $("#jqgrid").jqGrid("getGridParam", 'data');
                var Sequnce = data.length;
               
                if (data.length > 0) {
                    if (SubMilestoneList.length == 0) {
                        Sequnce = result[0].TotalSubMilestone + 1;
                    } else {
                        Sequnce = result[0].TotalSubMilestone+1 + Sequnce;
                    }
                    
                    $('#SequenceNo').val(Sequnce);
                    $('#relationtype').prop('disabled', false);
                    $('#Setrelation').prop('disabled', false);
                    $('#relationtype').removeClass('input-disabled');
                    $('#Setrelation').removeClass('input-disabled');
                    RelationDisable = true;
                } else {
                    var Sequnce = result[0].TotalSubMilestone+1;
                    //Sequnce =8000+Sequnce
                    $('#SequenceNo').val(Sequnce);
                    $('#relationtype').prop('disabled', true);
                    $('#Setrelation').prop('disabled', true);
                    $('#Setrelation').addClass('input-disabled');
                    RelationDisable = false;
                }
                $('#Name').val('');
                $("#Duration").val('');
                $('#addModal').modal('show');
                $('#relationtype').val('');
                $('#MilestoneList_ErrorMilestoneList_Error').text('');
            }
        });



    } else {
        $('#MilestoneList_ErrorMilestoneList_Error').text('Please select the Milestone Name');
    }
});

$('#btnSubmit').click(function () {
    
    submithide = '';
    var data = [];
    var Action = '';
    var SubMilestonesequnceNo = $('#SequenceNo').val();
    var Name = $('#Name').val();
    var relationType = $('#relationtype').val();
    var setRelationList = $("#Setrelation option:Selected").val();
    var setRelation = $('#Setrelation').val();
    //var status = $("input:radio[name='Status']:checked").val();
    var recordCount = $("#count").val();
    var duration = parseInt($("#Duration").val());
    if (recordCount == "0") {
        if (setRelation === "") {
            setRelation = '';
        }
    }

    //if (sequnceNo.length == "0") {
    //    alert("Please select the Sequence Number ");
    //    return false;
    //}

    if (Name.length == " ") {
        alert("Please enter  the Milestone Name");
        return false;
    }
    var dropdowndata = $("#Setrelation option").length;
    if (relationType == '') {
        if (dropdowndata>1) {
            alert("Please select the relation type");
            return false;
        }
    }

    if ($("#Duration").val() == '') {
        alert("Please enter the Duration");
        return false;
    }

  
    if (dropdowndata > 1) {
        if (setRelationList == '0') {

            alert("Please select the set relation");

            return false;

        }
    } 
    
    //if (status == undefined) {
    //    alert("Please select the Status");
    //    return false;
    //}
    //if (status == 'True') {
    //    Action ='True'
    //}
    
    var milestone = {
        "SequenceNo": parseInt($('#MilestoneList').val()),
        "SubMilestoneId": SubMilestonesequnceNo,
        "SubMilestoneName": $('#Name').val(),
        "RelationType": $('#relationtype').val(),
        "SetRelation": setRelation,
        "Duration": duration,
        "MilestoneStatus": 'True',
        "Action": 'True'
    };
   SubMilestoneList = [];
    SubMilestoneList.push(milestone);
    var data = MainData.find(obj => obj.SubMilestoneName.toLowerCase() == milestone.SubMilestoneName.toLowerCase())
    if (data) {
        alert('Sub MilestoneName must be unique;');
        return false;
    }
    var combinedArray = $.merge([], SubcombinedArray.concat(SubMilestoneList));
    SubcombinedArray = combinedArray;

    MainData = combinedArray;
   
        $("#jqgrid").jqGrid("clearGridData", true);
        jQuery('#jqgrid').jqGrid('setGridParam', { data: combinedArray });
        jQuery('#jqgrid').trigger('reloadGrid');
    CreateJqGrid(combinedArray);
    var DropdownData = $.grep(combinedArray, function (item) {
        return item.MilestoneStatus == 'True';
    });
    $.each(DropdownData, function (i, obj) {
        data.push({
            value: obj.SubMilestoneId,
            text: obj.SubMilestoneName
        })
    })
    console.log('data', data);
    var dropdown = $('#Setrelation');
    dropdown.empty();

    // Loop through the options and add each one to the dropdown
    $.each(data, function (index, option) {
        dropdown.append($('<option>').val(option.value).text(option.text));
    });

    var data = $("#jqgrid").jqGrid("getGridParam", 'data');
    var Sequnce = data.length;
   // $("#jqgrid").jqGrid("clearGridData", true);
   // jQuery('#jqgrid').jqGrid('setGridParam', { data:combinedArray });
   // jQuery('#jqgrid').trigger('reloadGrid');
   ///// CreateJqGrid(SubMilestoneList);
    $('#addModal').modal('Hide');
});


//$('#btnCancel').click(function () {
//    $('#addModal').modal('Hide');
//});

$('#SaveModel').click(function () {
    DefaultArray = $('#jqgrid').jqGrid('getGridParam', 'data');
    Griddata = JSON.stringify(DefaultArray);
    $.ajax({
        url: ROOT + 'Master/SubMilestone',
        type: "POST",
        async: false,
        data: { Griddata: Griddata },
        success: function (result) {
            location.reload();
        }
    });
});
function rowselect(rowid, status) {
    console.log(rowid, status);
    var data = $("#jqgrid").jqGrid("getGridParam", 'data');
    var rowdata = $("#jqgrid").jqGrid("getRowData", rowid);
    SelectedSubMilestone = rowdata.SubMilestoneId;
    if (status) {
        var Setrelation = rowdata.SetRelation;
        var index = data.findIndex(obj => obj.SubMilestoneId == Setrelation);
        if (data[index]?.MilestoneStatus == 'True' && data[index]?.Action == 'True' || Setrelation == '0' || Setrelation == '') {

            getdependentDetails(rowid);
            for (var i = 0; i < dependentdata.length; i++) {
                var findIndex = MainData.findIndex(obj => obj.SubMilestoneId == dependentdata[i].SubMilestoneId);
                MainData[findIndex].MilestoneStatus = 'True';
                MainData[findIndex].Action = 'True';
            }
        } else {
            alert('Selected milestone dependent milestone Status is inactive.please check the dependent milestone');
        }
        
    } else {
        getdependentDetails(rowid);
        if (dependentdata.length > 1) {


            $('#UserConfirmationforInactiveMilestone').modal('show');
            getdependentDetails(rowid);
            $('#DependingSubMilestoneList').empty();
            $.each(dependentdata, function (i) {

                $('#DependingSubMilestoneList').append(`<ul><li class='text-left'>${dependentdata[i].SubMilestoneName}</li></ul>`)
            })
        } else {
            var findIndex = MainData.findIndex(obj => obj.SubMilestoneId == SelectedSubMilestone)
            MainData[findIndex].MilestoneStatus = 'false';
            MainData[findIndex].Action = '';
        }
        
    }
    //MainData = data;
     $("#jqgrid").jqGrid("clearGridData", true);
    jQuery('#jqgrid').jqGrid('setGridParam', { data: MainData });
    jQuery('#jqgrid').trigger('reloadGrid');
}
$('#InactiveMilestone').click(function () {
    //  var findIndex = MainData.findIndex(obj => obj.SubMilestoneId == SelectedSubMilestone);
    for (var i = 0; i < dependentdata.length; i++) {
        var findIndex = MainData.findIndex(obj => obj.SubMilestoneId == dependentdata[i].SubMilestoneId);
        MainData[findIndex].MilestoneStatus = 'false';
        MainData[findIndex].Action = '';
    }

    $("#jqgrid").jqGrid("clearGridData", true);
    jQuery('#jqgrid').jqGrid('setGridParam', { data: MainData });
    jQuery('#jqgrid').trigger('reloadGrid');

});

function getdependentDetails(rowid) {
    var data = $("#jqgrid").jqGrid("getGridParam", 'data');
    var rowdata = $("#jqgrid").jqGrid("getRowData", rowid);
    var SubMilestoneId = rowdata.SubMilestoneId;
    dependentdata = [];
    dependentdata = $.grep(data, function (i) {
        return i.SubMilestoneId == SubMilestoneId
    })
    for (var i = 0; i < data.length; i++) {
        var dependent = $.grep(data, function (item) {
            return item.SetRelation == dependentdata[i]?.SubMilestoneId && item.MilestoneStatus!='false';
        });
        dependentdata = $.merge(dependentdata, dependent);
    }

}
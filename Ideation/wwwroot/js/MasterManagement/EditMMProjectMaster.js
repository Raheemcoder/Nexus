
var loaded = true;
var count = 0;
var mappedUsers = [];

$(document).ready(function () {

    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        url: ROOT + 'MasterManagement/GetUsersProjectMappingData',
        data: { ProjectCode: $('#ProjectCode').val() },
        success: function (data) { 
            if (data != null) {
                mappedUsers = data;
            }
        }
    });

    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        url: ROOT + 'MasterManagement/MMGetUsersListForMapping',
        success: function (data) {
            if (data != null) {
                const UsersDropDown = data.filter(obj => !mappedUsers.includes(obj.UserId));
                $.each(UsersDropDown, function (index, obj) {  //To populate the UsersDropdown without users who are already mapped
                    $('#usersDropDowm').append('<option value="' + obj.UserId + '" data-attribute="' + obj.Name + '">' + obj.UserId + " - " + obj.Name + '</option>');
                });
                const MappedDropdownUsers = data.filter(obj => mappedUsers.includes(obj.UserId));
                $.each(MappedDropdownUsers, function (index, obj) {  //To populate the MappedUsersDropdown,only users who are already mapped
                    $('#mappedUsersDropDowm').append('<option value="' + obj.UserId + '" data-attribute="mappedUser">' + obj.UserId + " - " + obj.Name + '</option>');
                });
            }
        }
    });



});


var mileVal = $('#ProjectStatusId').val();
$('#ProjectStatusId').change(function () {
    //if ($('#ProjectStatusId').prop('disabled')) {
    if ($('#milestonesCompleted').val() == 'No') { 
    alert('Status cannot be changed as the milestones are not completed for the project');
    $('#ProjectStatusId').val(mileVal);
    }
})


$('#addBtn').click(function () {
    if ($('#usersDropDowm').val() == '') {
        $('#addUserErr').show();
    }
    else {
        $('#mappedUsersDropDowm').append('<option value="' + $('#usersDropDowm').val() + '" data-attribute="mappedUser">' + $('#usersDropDowm :selected').text() + '</option>');
        $("#usersDropDowm option[value='" + $('#usersDropDowm').val() +"']").remove();
        $('#usersDropDowm').val('');
        $('#mappedUsersDropDownAdded').css('font-weight', 'bold').show();
        setTimeout(function () {
            $('#mappedUsersDropDownAdded').hide();
        }, 3000)
        $('#addUserErr').hide();
    }
})

$('#removeBtn').click(function () {
    if ($('#mappedUsersDropDowm').val() == '') {
        $('#removeUserErr').show();
    }
    else {
        $('#usersDropDowm').append('<option value="' + $('#mappedUsersDropDowm').val() + '">' + $('#mappedUsersDropDowm :selected').text() + '</option>');
        $("#mappedUsersDropDowm option[value='" + $('#mappedUsersDropDowm').val() + "']").remove();
        $('#mappedUsersDropDowm').val('');
        $('#usersDropDownAdded').css('font-weight','bold').show();
        setTimeout(function () {
            $('#usersDropDownAdded').hide();
        }, 3000)

        $('#removeUserErr').hide();
    }

})

//var selectedArray = [];

//function CreateJQGrid(data) {
    
//    $("#userGrid").jqGrid({
//        url: '',
//        datatype: 'local',
//        data:data,
//        mtype: 'GET',
//        colModel: models,
//        loadonce: true,
//        viewrecords: true,
//        rowNum: 10000,
//        scroll: true,
//        pager: '#pager',
//        viewrecords: true,
//        multiselect:true,
//        userDataOnFooter: true,
//        onSelectRow: updateIdsOfSelectedRows,

//        //multiselect: true,
//        gridComplete: function () {
//            var objRows = $("#userGrid tbody tr");
//            var objHeader = $("#userGrid tbody tr td");
//            if (objRows.length > 1) {
//                var objFirstRowColumns = $(objRows[1]).children("td");
//                for (i = 0; i < objFirstRowColumns.length; i++) {
//                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
//                }
//                
//                if ($('#gs_UserId').val() == 'undefined') { 
//                    var rowids = $('#userGrid').jqGrid('getDataIDs');
//                    selectedArray = [];
//                    for (let i = 0; i <= rowids.length; i++) {
//                        
//                        var rowData = jQuery('#userGrid').getRowData(i);

//                        if (mappedUsers.includes(rowData['UserId'])) {
//                            
//                            $('#userGrid').jqGrid('setSelection', rowids[i - 1], false);
//                            selectedArray.push(rowData);
//                            rowData.Checked = '1';
//                            $('#userGrid').jqGrid('setRowData', rowids[i - 1], rowData);

//                        }
//                        else {
//                            
//                            rowData.Checked = '0';
//                            $('#userGrid').jqGrid('setRowData', rowids[i - 1], rowData);

//                        }
//                    }
//                }
                
//            }
//        }

//    });
//    $("#userGrid").jqGrid('filterToolbar', {
//        autosearch: true,
//        stringResult: true,
//        searchOnEnter: false,
//        defaultSearch: "cn"
//    });
//    $('#jqgh_userGrid_cb').hide();
//    selectedArray = [];
//    $("#userGrid").jqGrid('sortGrid', "Checked", true, "desc");
//}


//var $grid = $("#userGrid"),

//    updateIdsOfSelectedRows = function (id, isSelected) {
//     
//        console.log(id + " " + isSelected);
//        var rowData = $grid.jqGrid("getRowData", id);
//        if (isSelected) {
//            
//            var rowData = jQuery('#userGrid').getRowData(id);
         
//            selectedArray.push(rowData);
//        }
//        else {
//            
//            var index1 = -1;
//            index1 = selectedArray.findIndex(s => s.UserName == rowData.UserName)
//            if (index1 >= 0) {
//                
//                selectedArray.splice(index1, 1);
//            }
//        }
//    };




$('#userAdd').click(function () {
    var dropdown = $('#mappedUsersDropDowm');
    var optionValues = [];

    dropdown.find('option').each(function () {
        optionValues.push($(this).val());
    });
    optionValues.shift();

    var optionString = optionValues.join(",");
   
    $('#mappedUsers').val(optionString);
    $('#MMProjectMasterForm').submit();
});


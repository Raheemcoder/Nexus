var userId=''

$(document).ready(function () {
    $('#ProjectId').hide();
    $(".projectName_error").hide();
    $('#projectNameList').hide();
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        url: ROOT + 'Master/GetUserList',
        success: function (data) {
            console.log('data', data);
            if (data != null) {
                $.each(data, function (index, obj) {
                    if (obj.IsActive == true) {
                        obj.IsActive = 'Active';
                    } else {
                        obj.IsActive = 'InActive';
                    }
                })
                console.log('changeduSERDATA', data)
                CreateJQGrid(data);
            }
        }
    });

   

    models = [
        {
            name: 'Action',
            resizable: true,
            width: 30,
            label: 'Action',
            ignoreCase: true,
            classes: 'text-center',
            search: false,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                return '<div class="grid-icons-group -justify-center"><a href="javascript: void(0);" class="grid-icon-only" onclick="EditUser(' + options.rowId + ')"><i class="fas fa-pen"></i></a></div>';
                //return '<div class="grid-icons-group -justify-center"><a href="javascript: void(0);" class="grid-icon-only" onclick="EditUser(' + rowobject.UserId + ')"><i class="fas fa-pen"></i></a></div>';
            }
        },
        {
            name: 'UserId',
            label: 'User Id',
            width: 70,
            resizable: true,
            ignoreCase: true,
            hidden: true
        },
        
        {
            name: 'UserName',
            resizable: true,
            label: 'Name',
            ignoreCase: true
        }, 
        {
            name: 'EmailId',
            label: 'Email Id',
            width: 120,
            resizable: true,
            ignoreCase: true,
            //hidden: true
        },
        {
            name: 'RoleId',
            resizable: true,
            label: 'RoleId',
            hidden: true,
            ignoreCase: true
        },
        {
            name: 'RoleName',
            resizable: true,
            label: 'Role',
            ignoreCase: true
        },
        {
            name: 'IsActive',
            resizable: true,
            width: 50,
            search: true,
            label: 'Status',
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                console.log('cellvalue', cellvalue);
                if (rowobject.IsActive == 'Active') {
                    return '<span class="text-success">' + 'Active' + '</span>';
                }
                else {
                    return '<span class="text-danger">' + 'InActive' + '</span>';

                }
            }
        }
    ]

});

$("#addModal").on("hidden.bs.modal", function () {
    $("#UserMasterForm").trigger('reset');
    $(".valmsg").hide();
    //$("#UserMasterForm").data('validator').resetForm();
    //var validator = $('#UserMasterForm').validate();

    //validator.submitted = {};
    //validator.prepareForm();
    //validator.hideErrors();
    //validator.elements().removeClass(validatorObject.settings.errorClass);
});


$("#Adduser").on('click', function () {
   // $("#addModal").modal('show');
    $("#IsActive").prop('checked', true);
    $("#element").text("Add User Details");

})

$("#UserMasterForm").on("submit", function () {
    $(".valmsg").show();
});
function CreateJQGrid(data) {
    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: models,
        loadonce: true,
        viewrecords: true,
        rowNum: 20,
        scroll: 1,
        pager: '#pager',
        userDataOnFooter: true,

        //multiselect: true,
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
            var $grid = $('#jqgrid');
            $("#jqgrid").jqGrid("setGridParam", { beforeSelectRow: function (rowId, e) { return $(e.target).is("input:checkbox"); } });
            var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
            $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
            $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
            parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
        }
    });
    $("#jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: true,
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


}

function EditUser(rowid) {
   
    $("#element").text("Edit User Details ");
    var rowData = $('#jqgrid').getRowData(rowid);
   // alert(rowData.RoleId);
    //$("#element").text($("#element").text().replace("Master", "Bye"));
    $("#UserId").val(rowData.UserId);
    $("#UserName").val(rowData.UserName);
    $("#EmailId").val(rowData.EmailId);
    userId = rowData.UserId;
    var type = rowData.RoleName;
    //if (type == 'Admin') {
    //    var roleId = 1;
    //} else if (type == 'Project Manager') {
    //    var roleId = 2;
    //} else {
    //    var roleId = 3;
    //}
    var roleId =rowData.RoleId
    

    if (String(rowData.IsActive) == "<span class=" + '"' + "text-success" + '"' + ">Active</span>") {
       $(".Active").prop('checked', true);
    }
    else {
        $(".InActive").prop('checked', true);

    }

    $("#RoleId option").each(function () {
        console.log($(this).val());
        if ($(this).val() == roleId) {
            
            $(this).prop('selected', true);
        }

    })
    
    $("#addModal").modal('show');
   
    
}

//$("#message").slideUp(6000);

$("#userAdd").click(function () {
    
    submithide = '';
    var UserName = $('#UserName').val();
    var EmailId = $('#EmailId').val();
    var RoleId = $('#RoleId').val();
    var status = $("input:radio[name='IsActive']:checked").val();

       if (UserName== "") {
        alert("Please enter Username");
        return false;
    }

    if (EmailId == "") {
        alert("Please enter Email ID");
        //Isvalidename = falsel
        return false;
    } else {
        
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(EmailId)) {
            alert("Please enter valid Email ID");
            return false;
        }
        
    }

    if (RoleId == "") {
        alert("Please select the Designation");
        return false;
    }

   
    
    var user = {
       "UserName": $("#UserName").val(),
       "EmailId":$('#EmailId').val(),
       "RoleId" :$('#RoleId').val(),
        "IsActive": status,
        "UserId" : userId,
    };
    


    if (user != null) {
        $.ajax({
            type: "POST",
            url: ROOT + "Master/AddUser",
            data: { user: user },
           // contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (response) {
                
                console.log('response', response);
                if (response != null && response != '') {
                   
                    window.location.href = ROOT + "Master/UserMaster";

                } else {
                    alert("Something went wrong");
                }
            },
            error: function (err) {
                alert(err.responseText);
            }

        });
    }
});
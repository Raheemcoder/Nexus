
$(document).ready(function () {
    
    if ($('#RoleId').val() != 0) {

        $.ajax({
            url: ROOT + "Role/MenuMappingJson",
            type: 'POST',
            datatype: 'JSON',
            data: { Id: $('#RoleId').val() },
            cache: false,
            success: function (result) {
                console.log(result)
                if (result != null) {
                    
                    $.each(result, function (i, obj) {
                        
                        if (obj.IsEdit) {
                            
                            $('#' + obj.MenuId + '_Edit').prop('checked', true);
                            if (obj.IsRead) {
                                $('#' + obj.MenuId + '_Read').prop('checked', true);
                                $('#' + obj.MenuId + '_Read').prop('disabled', true);
                            }
                        }
                        else {
                            if (obj.IsRead) {
                                
                                $('#' + obj.MenuId + '_Read').prop('checked', true);
                            }
                        }
                    })
                }

            }
        })
    }

        $('input[type="checkbox"]').on('click', function () {

            var arr = $(this).attr('id').split('_');
            if (arr[1] == "Edit") {
                if (this.checked) {
                    $('#' + arr[0] + '_Read').prop('checked', true);
                    $('#' + arr[0] + '_Read').prop('disabled', true);

                    $('.' + arr[0] + '_sublevel_Read').each(function () {
                        $(this).prop('checked', true);
                        $(this).prop('disabled', true);
                        $('.' + $(this).attr("data-value") + '_sublevel_Read').each(function () {
                            $(this).prop('checked', true);
                            $(this).prop('disabled', true);
                        });
                    });
                    $('.' + arr[0] + '_sublevel_Edit').each(function () {
                        $(this).prop('checked', true);
                        $('.' + $(this).attr("data-value") + '_sublevel_Edit').each(function () {
                            $(this).prop('checked', true);
                        });
                    });
                    $('#' + $('#' + arr[0] + '_Edit').attr('data-parent') + '_Edit').prop('checked', true);
                    $('#' + $('#' + arr[0] + '_Edit').attr('data-parent') + '_Read').prop('checked', true);
                    $('#' + $('#' + arr[0] + '_Edit').attr('data-parent') + '_Read').prop('disabled', true);

                    //for 3 level menu
                    var parentEdit = $('#' + $('#' + arr[0] + '_Edit').attr('data-parent') + '_Edit');
                    var parentRead = $('#' + $('#' + arr[0] + '_Edit').attr('data-parent') + '_Read');

                    $('#' + parentEdit.attr('data-parent') + '_Edit').prop('checked', true);
                    $('#' + parentRead.attr('data-parent') + '_Read').prop('checked', true);
                    $('#' + parentRead.attr('data-parent') + '_Read').prop('disabled', true);
                }
                else {
                    $('#' + arr[0] + '_Read').prop('disabled', false)
                    $('.' + arr[0] + '_sublevel_Read').each(function () {
                        $(this).prop('disabled', false);
                        $('.' + $(this).attr("data-value") + '_sublevel_Read').each(function () {
                            $(this).prop('disabled', false);
                        });
                    });
                    $('.' + arr[0] + '_sublevel_Edit').each(function () {
                        $(this).prop('checked', false);
                        $('.' + $(this).attr("data-value") + '_sublevel_Edit').each(function () {
                            $(this).prop('checked', false);
                        });
                    });
                }
            }
            else {
                if (!this.checked) {
                    $('.' + arr[0] + '_sublevel_Read').each(function () {
                        $(this).prop('checked', false);
                        $('.' + $(this).attr("data-value") + '_sublevel_Read').each(function () {
                            $(this).prop('checked', false);
                        });
                    });
                }
                else {
                    parentRead = $('#' + $('#' + arr[0] + '_Edit').attr('data-parent') + '_Read');
                    parentRead.prop('checked', true);
                    $('#' + parentRead.attr('data-parent') + '_Read').prop('checked', true);
                    $('.' + arr[0] + '_sublevel_Read').each(function () {
                        $(this).prop('checked', true);
                        $('.' + $(this).attr("data-value") + '_sublevel_Read').each(function () {
                            $(this).prop('checked', true);
                        });
                    });
                }
            }

        });
    });

var roleArr = [];
$('.subbtn').on('click', function () {
    
    $($('#roletable tbody tr').find('.isedit')).each(function (i, obj) {
        var item = {};
        if ($(this).prop('checked')) {
            item = { "MenuId": $(this).attr('data-value'), "IsRead": 1, "IsEdit": 1 };
            roleArr.push(item);
        }
        else {
            if ($('#roletable tbody tr:eq(' + (i) + ')').find('.isread').prop('checked')) {
                item = { "MenuId": $(this).attr('data-value'), "IsRead": 1, "IsEdit": 0 };
                roleArr.push(item);
            }
            else {
                item = { "MenuId": $(this).attr('data-value'), "IsRead": 0, "IsEdit": 0 };
                roleArr.push(item);
            }
        }
    });

        var id = $('#RoleId').val();

        
        var MenuPermissions = JSON.stringify({ "MenuPermissions": roleArr });

    $.ajax({
             url: ROOT + "Role/MenuAdd",
             type: 'POST',
             dataType: 'JSON',
             data: { MenuPermissions: MenuPermissions, RoleId: parseInt($('#RoleId').val())},
             success: function (result) {
                
                window.location.href = ROOT + "Role/RoleList";
            }
           });
    
});

  




    
  

  

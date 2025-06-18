var userList = [];
var applicationList = [];
$(function () {

    $('#ApplicationList tbody tr td').each(function () {
        if (!this.checked) {
            $(".uncheck").closest('tr').addClass("uncheckedBox");
        }
    });
    $('.field-validation-error').html("");
    applicationList = JSON.parse($('#ApplicationListData').val())
    if ($('#LoginId').val() !== null && $('#LoginId').val() !== '' && typeof ($('#LoginId').val()) !== "undefined") {
        $('#LoginId').valid()
        $('#LoginId').attr('readonly', true);
    }
    //$.ajax({
    //    url: ROOT + 'MasterManagement/UserList',
    //    type: 'POST',
    //    dataType: 'JSON',
    //    success: function (result) {
    //        userList = result;
    //        loadAutoComplete();
    //    }
    //})
    $('#ApplicationList thead tr')
        .clone(true)
        .addClass('filters')
        .appendTo('#ApplicationList thead');

    var table = $('#ApplicationList').DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        initComplete: function () {
            var api = this.api();

            // For each column
            api
                .columns()
                .eq(0)
                .each(function (colIdx) {
                    console.log(colIdx)
                    // Set the header cell to contain the input element
                    var cell = $('.filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    if (colIdx==1) {
                        var title = $(cell).text();
                        $(cell).html('<input type="text" class="form-control" placeholder="' + title + '" />');
                    }


                    // On every keypress in this input
                    $(
                        'input',
                        $('.filters th').eq($(api.column(colIdx).header()).index())
                    )
                        .off('keyup change')
                        .on('change', function (e) {
                            // Get the search value
                            $(this).attr('title', $(this).val());
                            var regexr = '({search})'; //$(this).parents('th').find('select').val();

                            var cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api
                                .column(colIdx)
                                .search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '(((' + this.value + ')))')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                )
                                .draw();
                        })
                        .on('keyup', function (e) {
                            e.stopPropagation();

                            $(this).trigger('change');
                            $(this)
                                .focus()[0]
                                .setSelectionRange(cursorPosition, cursorPosition);
                        });
                });
        },
    });
})
function loadAutoComplete() {
    $("#LoginId").autocomplete({
        minLength: 0,
        source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            var obj = [];
            var cnt = 0;
            var matching = $.grep(userList, function (value) {
                if (value.EmailId !== null && value.EmailId !== '' && typeof (value.EmailId) !== "undefined") {
                    var name = value.EmailId.replace("@himalayawellness.com", "");
                    var id = value.UserId;
                    if (matcher.test(name) && cnt < 10) {
                        obj.push({ "value": name, "id": id, username: value.Name });
                        cnt++;
                    }
                }
                return matcher.test(id);
            });
            response(obj);
        },
        select: function (event, ui) {
            var objIndex = -1;
            userList.some(function (obj, i) {
                if (obj.UserId == ui.item.id) {
                    objIndex = i;
                    return true;
                }
            });
            if (objIndex >= 0) {
                $('#EmailId').val(userList[objIndex].EmailId);
                $('#UserName').val(userList[objIndex].Name);
            }
        }
    });
}

$('#DivisionId').on('change', function () {
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined" && $(this).val().length > 0) {
        $.ajax({
            url: ROOT + 'MasterManagement/CategoryList',
            data: { division: $(this).val().toString() },
            type: 'GET',
            dataType: 'JSON',
            success: function (result) {
                $('.category').each(function (i, obj) {
                    $(obj).html('');
                    $(obj).multiselect('destroy');
                    $.each(result, function (index, data) {
                        $(obj).append('<option value="' + data.Id + '">' + data.Name + '</option>');
                    });
                })
                /* $('.data-multiselect').multiselect('destroy');*/
                $('.data-multiselect').multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: 220,
                    enableCaseInsensitiveFiltering: true,
                    enableFiltering: true
                })
            }
        })
    }
    {
        $(".category").empty();
        $(".category").multiselect('rebuild')
    }
})

$('.applicationlistcheckbox').on('click', function () {
    var tr = $(this).parent().parent();
    if ($(this).prop('checked')) {
        var selectedroleid = $(this).data('selectroleid');
        //$(tr).find('.role').val(selectedroleid).trigger('change');
        $(tr).find('.role').removeAttr('disabled');
       // $('.category').closest("td").removeClass('MMcategory');
        $(tr).find('.category').removeAttr('disabled');
        $(tr).find('.category').multiselect('destroy');
        $(tr).removeClass("uncheckedBox");
        $('.data-multiselect').multiselect({
            includeSelectAllOption: true,
            buttonWidth: 220,
            enableCaseInsensitiveFiltering: true,
            enableFiltering: true
        })


        //$(tr).find('.category').multiselect('refresh')
    }
    else {
        $(tr).find('.role').val("").select2();
        $(tr).addClass("uncheckedBox");
        $(tr).find('.role').attr('disabled', true);
        //$('.category').closest("td").addClass('MMcategory');
        $(tr).find('.category').attr('disabled', true);
        $(tr).find('.category').multiselect('destroy');
        $(tr).find('.category').multiselect('refresh');
        $(tr).find('.role').siblings('span.errmsgrole').hide();
        $(tr).find('.category').siblings('span.errmsgCategory').hide();
    }
})
$('.role').on('change', function () {
    debugger
    var currentobj = $(this);
    var tr = currentobj.parent().parent();
    if ($(this).val() !== null && $(this).val() !== '' && typeof ($(this).val()) !== "undefined") {
        $(tr).find('.role').siblings('span.errmsgrole').hide();
        var roleId = $(this).val();
        var groupId = $(this).data('groupid');
        var sameGroupApplication = applicationList.filter(a => {
            return a.GroupId == groupId;
        })
        $.each(sameGroupApplication, function (i, obj) {
            $('#app_' + obj.AppId).attr('data-selectroleid', roleId);
        })
    }
    else {
        $(tr).find('.role').siblings('span.errmsgrole').show();
    }
})

$('.category').on('change', function () {
    if ($(".category").val() != '') {
        $('span.errmsgCategory').hide();
    } 
    else {
        $('span.errmsgCategory').show();
    }
});
$('#userAdd').on('click', function () {
    
    var isChecked = 0;
    var selectedIsActive = $('input[type=radio][name=IsActive]:checked').val();

  /*  if (isChecked > 0) {*/
    if ($('form').valid()) {
        var isValid = true;
        
        var mMUser = {
            UsertypeId: $('#UserTypeId').val(),
            LoginId: $('#LoginId').val(),
            UserName: $('#UserName').val(),
            EmailId: $('#EmailId').val(),
            HUB: parseInt($('#HUB').val()),
            Manager: $('#ManagerId').val().toString(),
            DivisionId: $('#DivisionId').val(),
            ApplicationListData: null,
            IsActive: selectedIsActive,
            Profile: $('#ProfileId').val().toString(),
            Department:$('#Department').val()
    }
        var selectedApplicationListData = [];
        $('#ApplicationList').DataTable().$('.applicationlistcheckbox:checked').each(function (i, obj) {
            var currentobj = $(obj);
            var tr = currentobj.parent().parent();
            var roleId = ($(tr).find('.role').val() === null || $(tr).find('.role').val() === '' || typeof ($(tr).find('.role').val()) === "undefined") ? 0 : parseInt($(tr).find('.role').val())
            var category = ($(tr).find('.category').val() === null || $(tr).find('.category').val() === '' || typeof ($(tr).find('.category').val()) === "undefined") ? '' : $(tr).find('.category').val().toString()
            if (roleId > 0) {
                $(tr).find('.role').siblings('span.errmsgrole').hide();
                var item = {};
                item = {
                    AppId: parseInt(currentobj.data('appid')),
                    GroupId: parseInt(currentobj.data('groupid')),
                    RoleId: parseInt($(tr).find('.role').val()),
                    Category: $(tr).find('.category').length > 0 ? $(tr).find('.category').val().toString() : null
                }
                selectedApplicationListData.push(item);
            }
            else {
                isValid = false;
                $(tr).find('.role').siblings('span.errmsgrole').show();
            }
            var projectName = $(tr).find('td').eq(1).text();
            if (projectName == "Project Brief")
            {
                if (category != "") {
                    $(tr).find('.category').siblings('span.errmsgCategory').hide();
                }
                else {
                    isValid = false;
                    $(tr).find('.category').siblings('span.errmsgCategory').show();
                }
            }
        });

        $('#ApplicationList').DataTable().$('.applicationlistcheckbox:checked').each(function (i, obj) {
            debugger
            var currentobj = $(obj);
            var tr = currentobj.parent().parent();
           
        });
        if (selectedIsActive == "True") {
            $('#ApplicationListTableBody tr').each(function (i, obj) {
                if ($(obj).find('input[type="checkbox"]').prop('checked')) {
                    isChecked++;
                }
            })
            if (isChecked <= 0) {
                debugger
                isValid = false;
                $('#ApplicationList').css('border', '1px solid red');
                $('#Err_ApplicationList').show();

            }
        }
        mMUser.ApplicationListData = JSON.stringify(selectedApplicationListData);
        if (isValid) {
            $.ajax({
                url: ROOT + 'MasterManagement/MMAddUser',
                type: 'POST',
                dataType: 'JSON',
                data: { mMUser: mMUser },
                success: function (result) {
                    if (result.includes("Successfully")) {
                        window.location.href = ROOT + 'MasterManagement/MMUserMaster';
                    }
                }
            })
        }
    }
    else {
        if (selectedIsActive == "True") {
            $('#ApplicationListTableBody tr').each(function (i, obj) {
                if ($(obj).find('input[type="checkbox"]').prop('checked')) {
                    isChecked++;
                }
            })
            if (isChecked <= 0) {
                debugger
                isValid = false;
                $('#ApplicationList').css('border', '1px solid red');
                $('#Err_ApplicationList').show();

            }
        }
    }
    //}
    //else {
    //    $('#ApplicationList').css('border', '1px solid red');
    //    $('#Err_ApplicationList').show();
    //}
})
$('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked')) {
        $('#ApplicationList').css('border', '0px');
        $('#Err_ApplicationList').hide();
    }
    
})

$('#EmailId').change(function () {
    $('#EmailId').val() == "" ? $('#EmailId-error').show() : $('#EmailId-Error').hide()
});

$('#DivisionId').change(function () {
    $('#DivisionId').val() == "" ? $('#DivisionId-error').show() : $('#DivisionId-error').hide()
})

$('#HUB').change(function () {
    $('#HUB').val() == "" ? $('#HUB-error').show() : $('#HUB-error').hide()
});

$('#UserTypeId').change(function () {
    $('#UserTypeId').val() == "" ? $('#UserTypeId-error').show() : $('#UserTypeId-error').hide()
});


$('#UserTypeId').on('change', function () {
    debugger
    if (parseInt(this.value) === 1) {
        $("#LoginId").attr('readonly', true);
        $('#LoginId-error').hide();
        var s = $('#EmailId').val();
        s = s.substring(0, s.indexOf('@'));
        $('#LoginId').val(s);
    }
    else {
        $('#LoginId').attr('readonly', false);
        $('#LoginId').val("");
    }
});

$('#EmailId').focusout(function () {
    debugger
    if (parseInt($('#UserTypeId').val()) === 1) {
        $('#LoginId').attr('readonly', true);
        var s = $('#EmailId').val();
        s = s.substring(0, s.indexOf('@'));
        $('#LoginId').val(s);
    }
    else {
        if ($('#LoginId').val() === "") {
            $('#LoginId').attr('readonly', false);
            $('#LoginId').val("");
        }
    }
});
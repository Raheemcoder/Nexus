
$(document).ready(function () {
    if ($("#DivisionNames").val() != 0) {
        var DivisionIDs = $("#DivisionNames").val();
        $.ajax({
            type: "POST",
            url: ROOT + "User/GetCategoriesBasedonDivision",
            data: { divisionIDs: DivisionIDs },
            dataType: "json",
            success: function (Result) {
                debugger
                if (Result != null) {
                    let SelectedCategoryArr = $.trim($('#CategoryNames').val()).split(',');
                    //console.log(selectedCategoryArr, 'selectedCategoryArr jjjj')

                    $("option").remove(".Categorydropdown");
                    var UserCategorylList = ''

                    $.each(Result, function (i,obj) {
                        let matchFound = false;
                        matchFound = SelectedCategoryArr.includes(obj.CategoryID.toString())
                        if (matchFound) {
                            UserCategorylList += '<option class="Categorydropdown" value="' + obj.CategoryID + '" selected>' + obj.CategoryName + '</option>';
                        } else {
                            UserCategorylList += '<option class="Categorydropdown" value="' + obj.CategoryID + '">' + obj.CategoryName + '</option>';
                        }
                    })
                    console.log(UserCategorylList,'userCategorylList')

                    $("#Category").html(UserCategorylList);

                    $('#Category').multiselect({
                        enableFiltering: true,
                        includeSelectAllOption: true,
                        enableCaseInsensitiveFiltering: true,
                        maxHeight: 250,
                        nonSelectedText: 'Select',
                        buttonWidth: '100%',

                    });

                    $('#Category').val(SelectedCategoryArr)


                }
            },
            error: function () {
                debugger
                alert("Error occured!!");
            }


        });
    }
   
    if ($.trim($('#History').val()) == "") {
        $(".err").hide();
        $('#History').val("1")
    }
    $('.example-dropUp').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 250,
        buttonWidth: '100%',

        //dropUp: true
    });
       
         $("#Hubdropdown").multiselect({
               includeSelectAllOption: true,
               maxHeight: 300,
               enableFiltering: true,
               numberDisplayed: 1,
               enableCaseInsensitiveFiltering: true,
               allSelectedText: 'All Selected'
         });
      $("#managerdropdown").multiselect({
        includeSelectAllOption: true,
        maxHeight: 300,
        enableFiltering: true,
        numberDisplayed: 1,
        enableCaseInsensitiveFiltering: true,
        allSelectedText: 'All Selected'
      });
     //
       var DivId = $("#Division").val();
        var category = $("#Category").val()

    $.ajax({
        type: "POST",
        url: ROOT + "User/GetCategoryBYId",
        data: { divisionId: DivId },
        dataType: "json",
        success: function (Categoryresult) {
            //
            if (Categoryresult != null) {
                $("option").remove(".catopt");
                var CategoryList = '';

                $.each(Categoryresult, function (i, obj) {
                    //
                    if (obj.categoryID == category) {
                        CategoryList = '<option class="catopt" selected value="' + obj.categoryID + '">' + obj.categoryName + '</option>';

                    }
                    else {
                        CategoryList = '<option class="catopt" value="' + obj.categoryID + '">' + obj.categoryName + '</option>';

                    }
                    $(".addCategory-Option").append(CategoryList);
                })
                
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });

});

//$("#Division").change(function () {
//    
//    var DivId = $("#Division").val();
//    $.ajax({
//        type: "POST",
//        url: ROOT + "User/GetCategoryBYId",
//        data: { divisionId: DivId },
//        dataType: "json",
//        success: function (Categoryresult) {
//            //
//            if (Categoryresult != null) {
//                $("option").remove(".catopt");
//                $.each(Categoryresult, function (i, obj) {
//                    //
//                    var CategoryList = '<option class="catopt" value="' + obj.categoryID + '">' + obj.categoryName + '</option>';
//                    $(".addCategory-Option").append(CategoryList);
//                })
//            }
//        },
//        error: function () {
//            alert("Error occured!!");
//        }
//    });

   

//})

$('#UserType').on('change', function () {

    if (parseInt(this.value) === 1) {
        $("#LoginId").attr('readonly', true);
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

    if (parseInt($('#UserType').val()) === 1) {
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


$("#UserDivision").change(function () {
    //
    var DivisionIDs = $("#UserDivision").val().toString();;
    $.ajax({
        type: "POST",
        url: ROOT + "User/GetCategoriesBasedonDivision",
        data: { divisionIDs: DivisionIDs },
        dataType: "json",
        success: function (UserEmailResult) {
            //
            if (UserEmailResult != null) {
                $("option").remove(".Categorydropdown");
                var userCategorylList = ''
                $.each(UserEmailResult, function (i, obj) {
                    //
                    userCategorylList += '<option class="Categorydropdown" value="' + obj.CategoryID + '">' + obj.CategoryName + '</option>';

                   

                })
                $("#Category").html(userCategorylList);
                $('#Category').multiselect('rebuild');
            }
            var categories = $("#Category").val();
            $("#Category").val(categories.toString());
        },
        error: function () {
            alert("Error occured!!");
        }

       
    });
});



//App script
var retailerData = [
    {
        id: 0,
        name: 'A one General Stores',
        type: 'GT',
        channel: 'Cosmetic',
        address: 'KGN Complex Sh.No-26, Ashiyanagar Bardoli'
    }, {
        id: 1,
        name: 'A J Medical',
        type: 'GT',
        channel: 'Chemist',
        address: 'Linda Choke Modi Tovar, Bardoli Hospital, Bardoli'
    }
];
var productData = [
    {
        id: 0,
        name: '[7002590] Active Fresh Gel 80g',
        mrp: 50,
        stock: 65,
        stdPack: 50
    }, {
        id: 1,
        name: '[7001768] Anti Dandruff Shampoo 400ml',
        mrp: 140,
        stock: 21,
        stdPack: 24
    }
];
$(document).ready(function () {
    Common.init();
    setTimeout(function () {
        $('#message').fadeOut(100);

    }, 5000);
    //Select2 single select
    if ($('[data-singleselect]').length > 0) {
        $('[data-singleselect]').select2();

    }
    if ($('.data-singleselect').length > 0) {
        $('.data-singleselect').select2();

    }


    //Retailer Custom Single Select Dropdown
    if ($('[data-singleselect-custom]').length > 0) {
        $('[data-singleselect-custom]').select2({
            tags: "true",
            placeholder: "Select Retailer",
            templateResult: addFormatToRetailer,
            templateSelection: addFormatToRetailer,
            data: retailerData,
            matcher: matchCustom,
            allowClear: true,
        });
    }

    //Product Custom Single Select Dropdown
    if ($('[data-singleselect-custom]').length > 0) {
        $('[data-singleselect-custom]').select2({
            tags: "true",
            placeholder: "Select Product",
            templateResult: addFormatToProduct,
            templateSelection: addFormatToProduct,
            data: productData,
            matcher: matchCustom,
            allowClear: true,
        });
    }
    //Datepicker initialization
    if ($('[data-datepicker]').length > 0) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('[data-datepicker]').datepicker({
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true
        });
    }

    if ($('[data-datepicker-today]').length > 0) {
        //No Default date shown
        $('[data-datepicker-today]').datepicker({
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true
        });
        $('[data-datepicker-today]').datepicker('setDate', today);
    }
    if ($('[data-datepicker-month]').length > 0) {
        //Month Datepicker
        $('[data-datepicker-month]').datepicker({
            format: 'M',
            viewMode: "months",
            minViewMode: "months",
            todayHighlight: true,
            autoclose: true
        });
        $('[data-datepicker-month]').datepicker('setDate', today);
    }
    if ($('[data-datepicker-year]').length > 0) {
        //Year Datepicker
        $('[data-datepicker-year]').datepicker({
            format: 'yyyy',
            viewMode: "years",
            minViewMode: "years",
            todayHighlight: true,
            autoclose: true
        });
        $('[data-datepicker-year]').datepicker('setDate', today);
    }
    if ($('[data-datepicker-monthyear]').length > 0) {
        //MonthYear Datepicker
        $('[data-datepicker-monthyear]').datepicker({
            format: 'M/yyyy',
            viewMode: "months",
            minViewMode: "months",
            todayHighlight: true,
            autoclose: true
        });
        $('[data-datepicker-monthyear]').datepicker('setDate', today);
    }
    if ($('[data-datepicker-startdate]').length > 0) {
        //StartDate and EndDate Validation
        var start = new Date();
        // set end date to max one year period:
        var end = new Date(new Date().setYear(start.getFullYear() + 1));
        $('[data-datepicker-startdate]').datepicker({
            format: 'dd/mm/yyyy',
            //startDate: start,
            endDate: end,
            autoclose: true,
            todayHighlight: true
            // update "EndDate" defaults whenever "StartDate" changes
        }).on('changeDate', function () {
            // set the "EndDate" start to not be later than "StartDate" ends:
            $('[data-datepicker-enddate]').datepicker('setStartDate', $(this).val());
            $('[data-datepicker-enddate]').datepicker('setDate', $(this).val());
        });
        $('[data-datepicker-enddate]').datepicker({
            format: 'dd/mm/yyyy',
            startDate: start,
            endDate: end,
            autoclose: true,
            todayHighlight: true
            // update "StartDate" defaults whenever "EndDate" changes
        }).on('changeDate', function () {
            // set the "StartDate" end to not be later than "EndDate" starts:
            //$('[data-datepicker-startdate]').datepicker('setEndDate', $(this).val());
        });
    }
    if ($('[data-multiselect]').length > 0) {
        //Multiselect control
        $('[data-multiselect]').multiselect({
            includeSelectAllOption: true,
            buttonWidth: 220,
            enableCaseInsensitiveFiltering: true,
            enableFiltering: true,
            numberDisplayed: 1
        });
    }
    $('.multiselectDropdown').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true,
        numberDisplayed: 1
    });
    if ($('[data-datetimepicker]').length > 0) {
        //Datetimepicker control
        //Datepicker libraries available here https://github.com/monim67/bootstrap-datetimepicker
        $('[data-datetimepicker]').datetimepicker({
            format: 'DD-MM-YYYY hh:mm A',
            icons: {
                time: 'fas fa-clock',
                date: 'fas fa-calendar',
                up: 'fas fa-chevron-up',
                down: 'fas fa-chevron-down',
                previous: 'fas fa-chevron-left',
                next: 'fas fa-chevron-right',
                today: 'fas fa-check',
                clear: 'fas fa-trash',
                close: 'fas fa-times'
            }
        });
    }
    if ($('[data-timepicker]').length > 0) {
        //Datetimepicker control
        $('[data-timepicker]').datetimepicker({
            format: 'hh:mm:ss A',
            icons: {
                time: 'fas fa-clock',
                date: 'fas fa-calendar',
                up: 'fas fa-chevron-up',
                down: 'fas fa-chevron-down',
                previous: 'fas fa-chevron-left',
                next: 'fas fa-chevron-right',
                today: 'fas fa-check',
                clear: 'fas fa-trash',
                close: 'fas fa-times'
            }
        });
    }
    if ($('[data-timepicker]').length > 0) {
        //Datetimepicker 24 hrs format control
        $('[data-timepicker-24]').datetimepicker({
            format: 'HH:mm:ss',
        });
    }
    if ($('[data-autocomplete]').length > 0) {
        //Jquery-ui Auto Complete
        $('[data-autocomplete]').autocomplete({
            source: countryData
        });
    }
    if ($('[data-file-single]').length > 0) {
        //Dropify Initialization
        $('[data-file-single]').dropify();
    }

});
$(document).on('keyup', '[data-onlynumber]', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
})
$(document).on('keyup', '[data-alphanumeric]', function () {
    this.value = this.value.replace(/[^A-Za-z0-9,\s]/g, '');
    this.value = this.value.replace(/^\s*/g, '');
})
//Multiselect Control - Tabular Dropdown
//function CreateMultiselectTabularDropdown() {
//    $('[data-multiselect-tabular]').multiselect({
//        includeSelectAllOption: true,
//        'enableHTML': true,
//        enableFiltering: true,
//        enableCaseInsensitiveFiltering: true,
//        onDropdownShown: function (event) {
//            $('.custom-format-tabular .customtabluar-format-head').css('opacity', '1')
//        },
//        onDropdownHidden: function (event) {
//            $('.custom-format-tabular .customtabluar-format-head').css('opacity', '0')
//        },
//    });
//}

////Invoke Multiselect Control - Tabular Dropdown
//CreateMultiselectTabularDropdown();
//$('.custom-format-tabular .multiselect.dropdown-toggle').before('<div class="customtabluar-format-head d-flex" style="width: 100%"><div class="-w-15px"><strong> </strong></div><div class="-w-20 m-header-size"><strong>Material Code</strong></div><div class="-w-50 m-header-size"><strong>Material Name</strong></div><div class="-w-20 m-header-size"><strong>Material Type</strong></div><div class="-w-10 m-header-size"><strong>UOM</strong></div></div>');

//Retailer format
function addFormatToRetailer(item) {
    if (item.loading) {
        return item.name;
    }
    if (!item.name) { return; }
    var $item = $(
        '<span><b style="text-transform: uppercase;">' + item.name + '</b><br/><small> Type:' + item.type +
        '&emsp;&emsp; Channel: ' + item.channel +
        '<br/>Address: ' + item.address + '</small></span>'
    );
    item = null;
    return $item;
};
//Sample Retailer data to show in the dropdown


//To show more details for Product format
function addFormatToProduct(item) {
    if (item.loading) {
        return item.name;
    }
    if (!item.name) { return; }
    var $item = $(
        '<span><b style="text-transform: uppercase;">' + item.name + '</b><br/>' +
        '<small>MRP: ' + item.mrp + '</small>&emsp; <small>Available: ' + item.stock + '</small>&emsp; <small>Std Pack: ' + item.stdPack +
        '</small></span>'
    );
    item = null;
    return $item;
};
//Sample Product data to show in the dropdown


function matchCustom(params, data) {
    // If there are no search terms, return all of the data
    if ($.trim(params.term) === '') {
        return data;
    }
    // Do not display the item if there is no 'text' property
    if (typeof data.name === 'undefined') {
        return null;
    }
    // `params.term` should be the term that is used for searching
    // `data.text` is the text that is displayed for the data object
    if (data.name.indexOf(params.term) > -1) {
        var modifiedData = $.extend({}, data, true);
        modifiedData.text += ' (matched)';
        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
    }
    // Return `null` if the term should not be displayed
    return null;
}

//function readUrl(input) {
//    if (input.files && input.files[0]) {
//        let reader = new FileReader();
//        reader.onload = (e) => {
//            let imgData = e.target.result;
//            let imgName = input.files[0].name;
//            input.setAttribute("data-title", imgName);
//            console.log(e.target.result);
//        }
//        reader.readAsDataURL(input.files[0]);
//    }
//}

var countryData = [
    "India",
    "USA",
    "Russia",
    "England",
    "Dubai",
    "Srilanka",
    "Pakistan",
    "Malaysia",
    "Singapore"
];

// This function is used to highlight the textbox and label in red color when there is modal validation error
var Common = function () {
    return {
        init: function () {
            if ($('form').length > 0) {
                var form = $('form');
                var formData = $.data(form[0]);
                if (formData.unobtrusiveValidation !== undefined) {
                    var settings = formData.validator.settings;
                    // Store existing event handlers in local variables
                    var oldErrorPlacement = settings.errorPlacement;
                    var oldSuccess = settings.success;
                    settings.ignore = ":hidden:not(select)";
                    settings.ignore = [];
                    settings.errorPlacement = function (label, element) {
                        // Call old handler so it can update the HTML
                        oldErrorPlacement(label, element);

                        // Add Bootstrap classes to newly added elements
                        label.parents('.form-group').addClass('has-error');
                        label.parents('.c-login-form__group').addClass('has-error');
                        //label.closest(".field-validation-error").addClass('help-block animation-slideDown')
                    };


                    settings.success = function (label) {
                        // Remove error class from <div class="form-group">

                        label.parents('.form-group').removeClass('has-error');
                        label.parents('.c-login-form__group').removeClass('has-error');
                        // Call old handler to do rest of the work
                        oldSuccess(label);
                    };
                }
            }
        }
    };
}();
function Encrypt(str) {
    var key = CryptoJS.enc.Utf8.parse('8080808080808080');
    var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    var enString = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return enString;
}
$(window).on("load", function () {
    $('#loader').css('visibility', 'visible');
});
jQuery(document).ajaxStart(function () {
    $('#loader').css('visibility', 'visible');
});
jQuery(document).ajaxComplete(function () {
    $('#loader').css('visibility', 'hidden');
});
$(document).ajaxError(function (event, xhr, options, exc) {
    console.log(event)
    console.log(xhr)
    console.log(options)
    console.log(exc)
    if (xhr != null) {
        if (xhr.status == 401) {
            setTimeout(function () {
                window.location.href = ROOT + "Login/LogOff";
            }, 100);
        }
        else if (xhr.status != 401) {
            $('#loader').css('visibility', 'hidden');
            alert(xhr.responseText);
        }
    }
});
function alert(message) {
    $("#alertpopup").modal('show');
    $('#popupmesssage').html(message);
}
function closeModal(selector) {
    $(selector).modal('hide');
}

window.confirm = function (msg, func) {
    $('#confirmpopupmesssage').empty().html(msg);
    $('#confirmpopup').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }
};
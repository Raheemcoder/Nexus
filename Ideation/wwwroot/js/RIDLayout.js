$(document).ready(function () {

    ////takes only numbers
    //$('body').on('keyup', '.number', function () {
    //    debugger;
    //    this.value = this.value.replace(/[^0-9]/g, '');
    //});
    ////takes only numbers from 0-9
    //$('body').on('keyup', '.onlynumber', function () {
    //    this.value = this.value.replace(/[^0-9]/g, '');
    //    this.value = this.value > 0 ? this.value : "";
    //});
    ////takes only numbers from 0-9 with commas
    //$('body').on('keyup', '.onlynumbercommas', function () {
    //    this.value = this.value.replace(/[^,0-9]/g, '');
    //});
    ////takes only alphabets with commas and spaces
    //$('body').on('keyup', '.alphaspacecommas', function () {
    //    this.value = this.value.replace(/[^,A-Za-z\s]/g, '');
    //});
    ////remove spaces at last
    //$('body').on('keyup', '.trim', function () {
    //    var index = this.value.length - 2;
    //    var key = this.value.charAt(index);
    //    var initialkey = this.value.charAt(0);
    //    if ((!(key === " " || key === "    ") && (index > -1)) && (initialkey != " ")) {
    //        this.value = this.value;
    //    } else {
    //        this.value = this.value.trim();
    //    }
    //});
    ////takes only Alphabet with Space 
    //$('body').on('keyup', '.alpha', function () {
    //    this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    //});
    ////takes only Alphabet without Spaces
    //$('body').on('keyup', '.beta', function () {
    //    this.value = this.value.replace(/[^A-Za-z]/g, '');
    //});
    ////takes only Alphabet and Numeric with Space from 0-9
    //$('body').on('keyup', '.alphanumeric', function () {
    //    this.value = this.value.replace(/[^A-Za-z0-9\s]/g, '');
    //});
    ////takes only Alphabet and Numeric without Space from 0-9
    //$('body').on('keyup', '.onlyalphanumeric', function () {
    //    this.value = this.value.replace(/[^A-Za-z0-9]/g, '');
    //});
    ////takes only decimals from 0-9 and 0.0
    ////$('body').on('keyup', '.onlydecimal', function () {
    ////    this.value = this.value.replace(/[^0-9\.]/g, '');

    ////    this.value = this.value != "" ? parseFloat(this.value).toFixed(2) : parseFloat(0).toFixed(2);

    ////});
    //$('body').on('input', '.onlydecimal', function () {
    //    this.value = this.value.replace(/[^0-9.]/g, '');

    //    // Remove leading zeros before the decimal point
    //    this.value = this.value.replace(/^0+(\d)/, '$1');

    //    // Ensure only one decimal point is allowed
    //    var parts = this.value.split('.');
    //    if (parts.length > 2) {
    //        this.value = parts.slice(0, 2).join('.') + parts.slice(2).join('');
    //    }
    //});

    ////takes Alphabet and Numeric from 0-9 with underscore attherate dot
    //$('body').on('keyup', '.alphanumericwithunderscoreatdratedot', function () {
    //    this.value = this.value.replace(/[^@a-zA-Z0-9_.]/g, '');
    //});
    ////takes Alphabet and Numeric from 0-9 with underscore and dot
    //$('body').on('keyup', '.alphanumericwithhyphenunderscorecommadot', function () {
    //    this.value = this.value.replace(/[^a-zA-Z0-9_\.]/g, '');
    //});

    ////takes wvery character without spaces
    //$('body').on('keyup', '.removespaces', function () {
    //    this.value = this.value.trim();
    //});
    //$('body').on('keyup', '.textvalid', function () {
    //    var id = $(this)[0].id;
    //    var value = this.value;
    //    if (value === "") {
    //        $("#" + id + "_valid").removeClass("_hide");
    //    } else {
    //        $("#" + id + "_valid").addClass("_hide");
    //    }
    //});
    //$('body').on('keyup', '.mobilevalid', function () {
    //    var id = $(this)[0].id;
    //    var value = this.value;
    //    if ((value.length > 0 && value.length < 10) || parseInt(value) === 0) {
    //        $("#" + id + "_mobilevalid").removeClass("_hide");
    //    } else {
    //        $("#" + id + "_mobilevalid").addClass("_hide");
    //    }
    //});
    //$('body').on('keyup', '.emailvalid', function () {
    //    var id = $(this)[0].id;
    //    var value = this.value;
    //    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4}|[0-9]{3,6})+$/;
    //    if (!regex.test(value) && value != "") {
    //        $("#" + id + "_emailvalid").removeClass("_hide");
    //    } else {
    //        $("#" + id + "_emailvalid").addClass("_hide");
    //    }
    //});
    //$('body').on('input', '.onlydecimal', function () {
    //    this.value = this.value.replace(/[^0-9.]/g, '');
    //    this.value = this.value > 0 ? this.value : "";
    //    // Ensure only one decimal point is allowed
    //});
    $('body').on('input', '.alphanumeric', function () {
        this.value = this.value.replace(/"/g, '');
    });


    $('body').on('input', '.noSpacesField', function () {
        // Remove spaces only at the beginning of the input
        this.value = this.value.replace(/^\s+/g, '');
    });
    setTimeout(function () {
        $('#message_alert').hide();
    }, 3000);

});
$(document).ready(function () {
    "use strict";
    var body = $("body");
    //Select2 single select
    //$('.singleSelectDropdown').select2();
    //Datepicker initialization
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $('.datepicker').datepicker({
        dateFormat: 'd M yy',
        showButtonPanel: true,
        showOtherMonths: true,
        autoclose: true
    });
    //$('.datepicker').datepicker('setDate', today);
    //No Default date shown
    $('.datepicker-no-default').datepicker({
        dateFormat: 'd M yy',
        showButtonPanel: true,
        showOtherMonths: true,
        autoclose: true
    });
});


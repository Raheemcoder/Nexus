// App script
$(document).ready(function () {
    //Select2 single select
    $('[data-singleselect]').select2();
    $('.data-singleselect').select2();
    $('.dropdown-singleselect').select2();

    //$('.m-table__main .form-control').datepicker();

    //Datepicker initialization
    //var date = new Date();
    //var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //$('[data-datepicker-today]').datepicker({
    //    format: 'dd-mm-yyyy',
    //    todayHighlight: true,
    //    autoclose: true
    //});
    //$('[data-datepicker-today]').datepicker('setDate', today);

    ////No Default date shown
    //$('[data-datepicker]').datepicker({
    //    format: 'dd-mm-yyyy',
    //    todayHighlight: true,
    //    autoclose: true
    //});

    ////Month Datepicker
    //$('[data-datepicker-month]').datepicker({
    //    format: 'M',
    //    viewMode: 'months',
    //    minViewMode: 'months',
    //    todayHighlight: true,
    //    autoclose: true
    //});
    //$('[data-datepicker-month]').datepicker('setDate', today);

    ////Year Datepicker
    //$('[data-datepicker-year]').datepicker({
    //    format: 'yyyy',
    //    viewMode: 'years',
    //    minViewMode: 'years',
    //    todayHighlight: true,
    //    autoclose: true
    //});
    //$('[data-datepicker-year]').datepicker('setDate', today);

    ////MonthYear Datepicker
    //$('[data-datepicker-monthyear]').datepicker({
    //    format: 'M/yyyy',
    //    viewMode: 'months',
    //    minViewMode: 'months',
    //    todayHighlight: true,
    //    autoclose: true
    //});
    //$('[data-datepicker-monthyear]').datepicker('setDate', today);


    ////MonthYear Datepicker
    //$('.data-datepicker-monthyear').datepicker({
    //    format: 'M/yyyy',
    //    viewMode: 'months',
    //    minViewMode: 'months',
    //    todayHighlight: true,
    //    autoclose: true
    //});
    //$('.data-datepicker-monthyear').datepicker('setDate', '');



    ////StartDate and EndDate Validation
    //var start = new Date();
    //var end = new Date(new Date().setYear(start.getFullYear() + 1));
    //$('[data-datepicker-startdate]').datepicker({
    //    endDate: end,
    //    autoclose: true
    //}).on('changeDate', function () {
    //    $('[data-datepicker-enddate]').datepicker('setStartDate', new Date($(this).val()));
    //});
    //$('[data-datepicker-enddate]').datepicker({
    //    startDate: start,
    //    endDate: end,
    //    autoclose: true
    //}).on('changeDate', function () {
    //    $('[data-datepicker-startdate]').datepicker('setEndDate', new Date($(this).val()));
    //});

    // Multiselect Control
    $('.data-multiselect').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true,
    });
    $('.multiselectDropdown').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true,
        numberDisplayed: 1
    });

    var maxSelections = 2;

    //$('#Setrelation').select2({
    //    maxNumberOfOptions: 2
    //});

});

//Multiselect Control - Tabular Dropdown
function CreateMultiselectTabularDropdown() {
    $('[data-multiselect-tabular]').multiselect({
        includeSelectAllOption: true,
        'enableHTML': true,
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        //buttonWidth: '750px',
        maxHeight: 90,
        onDropdownShown: function (event) {
            $('.custom-format-tabular .customtabluar-format-head').css('opacity', '1')
        },
        onDropdownHidden: function (event) {
            $('.custom-format-tabular .customtabluar-format-head').css('opacity', '0')
        },
    });
};


//Adding loader for all pages
jQuery(document).ajaxStart(function () {
    //$(".preloader").fadeIn();
    $('#loader').css('visibility', 'visible');
});
jQuery(document).ajaxComplete(function () {
    //$(".preloader").fadeOut();
    $('#loader').css('visibility', 'hidden');
});
window.confirm = function (msg, func) {
    $('#ConfirmDialogMessage').empty().html(msg);
    $('#ConfirmDialog').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }
};
function alert(message) {
    $("#AlertDialog").modal('show');
    $('#AlertDialogMessage').html(message);
}

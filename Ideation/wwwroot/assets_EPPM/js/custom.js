/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {

    "use strict";

    var body = $("body");

    $(function () {
        $(".preloader").fadeOut();
        $('#side-menu').metisMenu();
    });

    /* ===== Open-Close Right Sidebar ===== */

    $(".right-side-toggle").on("click", function () {
        $(".right-sidebar").slideDown(50).toggleClass("shw-rside");
        $(".fxhdr").on("click", function () {
            body.toggleClass("fix-header"); /* Fix Header JS */
        });
        $(".fxsdr").on("click", function () {
            body.toggleClass("fix-sidebar"); /* Fix Sidebar JS */
        });

        /* ===== Service Panel JS ===== */

        var fxhdr = $('.fxhdr');
        if (body.hasClass("fix-header")) {
            fxhdr.attr('checked', true);
        } else {
            fxhdr.attr('checked', false);
        }
        if (body.hasClass("fix-sidebar")) {
            fxhdr.attr('checked', true);
        } else {
            fxhdr.attr('checked', false);
        }
    });

    $('.slimscrollright').slimScroll({
        height: '100%',
        position: 'right',
        size: "5px",
        color: '#dcdcdc'
    });

    //Select2 single select
    //$('.singleSelectDropdown').select2();

    //Datepicker initialization
    //var date = new Date();
    //var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //$('.datepicker').datepicker({
    //    todayHighlight: true,
    //    autoclose: true
    //});
    //$('.datepicker').datepicker('setDate', today);

    ////No Default date shown
    //$('.datepicker-no-default').datepicker({
    //    todayHighlight: true,
    //    autoclose: true
    //});

    /* ===========================================================
        Loads the correct sidebar on window load.
        collapses the sidebar on window resize.
        Sets the min-height of #page-wrapper to window size.
    =========================================================== */

    $(function () {
        var set = function () {
            var topOffset = 87,
                width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width,
                height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            if (width < 768) {
                $('div.navbar-collapse').addClass('collapse');
                topOffset = 100; /* 2-row-menu */
            } else {
                $('div.navbar-collapse').removeClass('collapse');
            }

            /* ===== This is for resizing window ===== */

            if (width < 1170) {
                body.addClass('content-wrapper');
                $(".open-close i").removeClass('icon-arrow-left-circle');
                $(".sidebar").css("overflow", "inherit").parent().css("overflow", "visible");
            } else {
                body.removeClass('content-wrapper');
                $(".open-close i").addClass('icon-arrow-left-circle');
            }

            height = height - topOffset;
            if (height < 1) {
                height = 1;
            }
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height) + "px");
            }
        },
            url = window.location,
            element = $('ul.nav a').filter(function () {
                return this.href === url || url.href.indexOf(this.href) === 0;
            }).addClass('active').parent().parent().addClass('in').parent();
        if (element.is('li')) {
            element.addClass('active');
        }
        $(window).ready(set);
        $(window).on("resize", set);
    });

    /* ===================================================
        This is for click on open close button
        Sidebar open close
    =================================================== */

    $(".open-close").on('click', function () {
        if ($("body").hasClass("content-wrapper")) {
            $("body").trigger("resize");
            $(".sidebar-nav, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
            $("body").removeClass("content-wrapper");
            $(".open-close i").addClass("icon-arrow-left-circle");
            $(".logo span").show();
        } else {
            $("body").trigger("resize");
            $(".sidebar-nav, .slimScrollDiv").css("overflow", "inherit").parent().css("overflow", "visible");
            $("body").addClass("content-wrapper");
            $(".open-close i").removeClass("icon-arrow-left-circle");
            $(".logo span").hide();
        }
    });
    /* ================================================================= 
        Update 1.5
        this is for close icon when navigation open in mobile view
    ================================================================= */

    $(".navbar-toggle").on("click", function () {
        $(".navbar-toggle i").toggleClass("ti-menu").addClass("ti-close");
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' }); var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 280) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "unset");
        $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }
});

function collapseNavbar() {
    if ($(window).scrollTop() > 70) {
        $("#wrapper").addClass("fix-top");
    } else {
        $("#wrapper").removeClass("fix-top");
    }
}

function readUrl(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let imgData = e.target.result;
            let imgName = input.files[0].name;
            input.setAttribute("data-title", imgName);
            console.log(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

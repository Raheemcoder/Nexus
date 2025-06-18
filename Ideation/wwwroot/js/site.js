// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

            function setNavigation() {
                var path = window.location.pathname;
                path = path.replace(/\/$/, "");
                path = decodeURIComponent(path);
                //path = path.split('/')[2];

                $("#main_menu li a, #main_menu1 li a").each(function () {
                    var href = $(this).attr('href');

                    //href = href.split('/')[2];
                    if (path === href) {
                        if ($(this).parents('#main_menu, #main_menu1').length >= 1) {
                            $(this).parents('li').addClass('active');
                            //$(this).parents(".has-menu").addClass('active');
                            //$(this).parents('.has-menu').last().addClass('activeparents');
                        }
                        else {
                            $(this).addClass('activeparents');
                            $(this).parents('li').addClass('activeparents');
                        }


                    }
                });
            }
            setNavigation();
   

  
      

        $(".selected-text").text($(".dropdown-menu .billing_text.active a").text())
        var setDefaultActive = function () {
            var path = window.location.pathname;

            switch (path) {
                case '/Ideation/Ideation': $(".dashboard").hide();
                    $(".innovation").hide();
                    $(".ideation").show();
                    break;
                case '/Dashboard/Dashboard':
                    $(".ideation").prop('hidden', true);
                    $(".innovation").prop('hidden', true);
                    $(".dashboard").prop('hidden', false);
                    break;
                case '/Innovation/YourInnovation':
                    $(".ideation").prop('hidden', true);
                    $(".innovation").prop('hidden', false);
                    $(".dashboard").prop('hidden', true);
                    break;


            }


        }
           setDefaultActive()

$('.hidden p').click(function () {
    $(this).closest('.select').find('.input').text($(this).text());
    $(this).closest('.select').find('input').val($(this).attr('value'));
    $(this).closest('.select').trigger("change");
});

$('.select').change(function () {

    $(this).find('.hidden').css({ "visibility": "hidden" })
    //$(this).find('input').children('option');
});
$('.select').hover(function () {

    $(this).find('.hidden').css({ "visibility": "visible" })
});

$(function () {
    $('#bcw').modal({
        keyboard: true,
        backdrop: "static",
        show: false,

    }).on('show', function () {
        var getIdFromRow = $(event.target).closest('tr').data('id');
        //make your ajax call populate items or what even you need
        $(this).find('#orderDetails').html($('<b> Order Id selected: ' + getIdFromRow + '</b>'))
    });
});

   
        function clicked(e) {
        if (!confirm('Are you sure?')) {
            e.preventDefault();
        }
    }

const buttonElement = document.querySelectorAll('.tablinks');
const tabContent = document.querySelectorAll(".tabcontent");
if (tabContent.length > 0) {
    tabContent[0].style.display = "block";
}


buttonElement.forEach(function (i) {
    i.addEventListener('click', function (event) {

        for (let x = 0; x < buttonElement.length; x++) {
            if (event.target.id == buttonElement[x].id) {
                buttonElement[x].className = buttonElement[x].className.replace(" active", "");
                tabContent[x].style.display = "block";
                event.currentTarget.className += " active";
            } else {
                tabContent[x].style.display = "none";
                buttonElement[x].className = buttonElement[x].className.replace(" active", "");
            }
        }

    });
});
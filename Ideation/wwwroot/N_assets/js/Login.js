$(document).ready(function () {
 
    $('#loginForm').on('submit', function (e) {
        const form = $(this);
        const submitBtn = form.find('.btn.signin');
        const btnText = submitBtn.find('.btn-text');
        const formBg = $('.form_bg');

        formBg.addClass('loading');
        btnText.text('Signing In...');
      
        setTimeout(function () {
            
        }, 500);
    });
   
    $('.form-control').on('focus', function () {
        $(this).closest('.form-group').addClass('focused');
    }).on('blur', function () {
        $(this).closest('.form-group').removeClass('focused');
    });

    $('.btn.signin').on('click', function (e) {
        const button = $(this);
        const ripple = $('<span class="ripple"></span>');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.css({
            width: size,
            height: size,
            left: x,
            top: y
        }).appendTo(button);

        setTimeout(() => ripple.remove(), 600);
    });
});

$(document).ready(function () {
    var $passwordInput = $("#Password");
    var $togglePassword = $("#togglePassword");
    var $eyeIcon = $("#eyeIcon");

    // Show eye icon on focus
    $passwordInput.on("focus", function () {
        $togglePassword.removeClass("d-none");
    });

    
    $passwordInput.on("blur", function () {
        if ($passwordInput.val().trim() === "") {
            $togglePassword.addClass("d-none");
            $passwordInput.attr("type", "password");
            $eyeIcon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
    });

    
    $togglePassword.on("click", function () {
        let type = $passwordInput.attr("type");
        if (type === "password") {
            $passwordInput.attr("type", "text");
            $eyeIcon.removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            $passwordInput.attr("type", "password");
            $eyeIcon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
    });
});


const rippleCSS = `
            .btn.signin {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
        @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;

$('<style>').text(rippleCSS).appendTo('head');
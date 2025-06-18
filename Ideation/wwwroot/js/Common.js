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

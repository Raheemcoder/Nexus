$(document).ready(function () {
    alert("1");
    var user = $("#uname").val();
    var pass = $("#pass").val();
    $("#save").click(function () {
        
        $.ajax({
            url: 'https://myinfo.himalayawellness.com/CEMServices/Api/Authenticate',
            type: 'POST',
            dataType: 'json',
            data = { "Username": user, "Password":pass, "type":"SSO"},
            success: function (result) {
            alert(result);
            },
            error: function (err) {
                alert('Error in Operation');
            }
        });
        
        alert("2");
    });
});
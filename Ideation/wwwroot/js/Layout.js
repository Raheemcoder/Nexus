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
$(document).ready(function () {
    $(document)
        .ajaxStart(function () {
            $("#loader").css("visibility", "visible");
        })
        .ajaxStop(function () {
            $("#loader").css("visibility", "hidden");
        })
        .ajaxComplete(function () {
            $("#loader").css("visibility", "hidden");
        });

    $('body').on('keyup', '.trim', function () {
        var index = this.value.length - 2;
        var key = this.value.charAt(index);
        var initialkey = this.value.charAt(0);
        if ((!(key === " " || key === "    ") && (index > -1)) && (initialkey != " ")) {
            this.value = this.value;
        } else {
            this.value = this.value.trim();
        }
    });

});

window.onload = function () {
    $("#loader").css("visibility", "hidden");
}

function crypto() {
	var plain = $("#string-field").val();
	$("#hash-md5").html(CryptoJS.MD5(plain).toString());
	$("#hash-sha1").html(CryptoJS.SHA1(plain).toString());
	$("#hash-sha256").html(CryptoJS.SHA256(plain).toString());
}

$("#string-field").bind('input propertychange', function() {
    crypto();
});

var field_onfocus = false;
$("#string-field").focus(function() {
    field_onfocus = true;
    $(this).select();
});

$("#string-field").mouseup(function() {
    if (field_onfocus) {
        field_onfocus = false;
        return false;
    } else {
        return true;
    }
});

$(document).ready(function() {
    crypto();
});

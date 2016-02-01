
function crypto() {
	var plain = $("#string-field").val();
	var show_capital = $("#show-capital").is(':checked');
	
	var result = {
		'hash-md5': CryptoJS.MD5(plain).toString(),
		'hash-sha1': CryptoJS.SHA1(plain).toString(),
		'hash-sha256': CryptoJS.SHA256(plain).toString()
	};
	
	for (var key in result) {
		if (show_capital) 
			result[key] = result[key].toUpperCase();
			
		$("#" + key).html(result[key]);
	}
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

$("#show-capital").change(function() {
	crypto();
});

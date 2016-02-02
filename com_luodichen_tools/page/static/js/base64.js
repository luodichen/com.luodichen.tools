var encode_lock = false;
var decode_lock = false;

function encode() {
	var plain = $("#base64-plain").val();
	$("#base64-encrypted").val(Base64.encode(plain));
}

function decode() {
	var encrypted = $("#base64-encrypted").val();
	$("#base64-plain").val(Base64.decode(encrypted));
}

$("#base64-plain").bind('input propertychange', function() {
	if (decode_lock)
		return;
	
	encode_lock = true;
	encode();
	encode_lock = false;
});

$("#base64-encrypted").bind('input propertychange', function() {
	if (encode_lock)
		return;
	
	decode_lock = true;
	decode();
	decode_lock = false;
});

var field_onfocus = false;
$(".base64-field").focus(function() {
    field_onfocus = true;
    $(this).select();
});

$(".base64-field").mouseup(function() {
    if (field_onfocus) {
        field_onfocus = false;
        return false;
    } else {
        return true;
    }
});

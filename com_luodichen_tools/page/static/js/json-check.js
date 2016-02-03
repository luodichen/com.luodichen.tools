function check() {
	var json_str = $("#json-field").val();
	
	if (json_str === '') {
		$("#check-result").html(' ');
		$("#check-result").attr('class', '');
		$("#check-result").html(' ');
		
		return;
	}
	
	try {
		var result = jsonlint.parse(json_str);
		if (result) {
			$("#check-result").html('检查通过');
			$("#check-result").attr('class', 'bg-success');
			$("#format").html(JSON.stringify(JSON.parse(json_str), null, 4));
			$("pre code").each(function(i, block) {
			    hljs.highlightBlock(block);
			});
		}
	} catch (e) {
		$("#format").html(' ');
		$("#check-result").html(e);
		$("#check-result").attr('class', 'bg-danger');
	}
}

$("#json-field").bind('input propertychange', function() {
    check();
});

var field_onfocus = false;
$("#json-field").focus(function() {
    field_onfocus = true;
    $(this).select();
});

$("#json-field").mouseup(function() {
    if (field_onfocus) {
        field_onfocus = false;
        return false;
    } else {
        return true;
    }
});

$(document).ready(function() {
	check();
});

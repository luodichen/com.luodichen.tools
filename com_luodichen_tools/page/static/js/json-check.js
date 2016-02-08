var LABEL_QUERING = 0;
var LABEL_SUCCEED = 1;
var LABEL_FAILED = 2;

var label_style = [
    {cls: 'label label-default text-right', text: '等待输入'},
    {cls: 'label label-primary text-right', text: '校验通过'},
    {cls: 'label label-danger text-right', text: '校验失败'}
];

function set_label(label, style) {
    t = $("#" + label);
    t.attr('class', label_style[style].cls);
    t.html(label_style[style].text);
}

function check() {
	var json_str = $("#json-field").val();
	
	if ($.trim(json_str) === '') {
		$("#check-result").html(' ');
		$("#check-result").attr('class', '');
		$("#check-result").html(' ');
		set_label('check-label', LABEL_QUERING);
		
		return;
	}
	
	try {
		var result = jsonlint.parse(json_str);
		if (result) {
			set_label('check-label', LABEL_SUCCEED);
			$("#check-result").attr('class', 'bg-success');
			$("#check-result").html('<code class="json bg-success">' + JSON.stringify(JSON.parse(json_str), null, 4) + '</code>');
			$("pre code").each(function(i, block) {
			    hljs.highlightBlock(block);
			});
		}
	} catch (e) {
		set_label('check-label', LABEL_FAILED);
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

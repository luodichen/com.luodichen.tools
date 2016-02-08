var LABEL_QUERING = 0;
var LABEL_SUCCEED = 1;
var LABEL_FAILED = 2;

var label_style = [
    {cls: 'label label-default text-right', text: '查询中'},
    {cls: 'label label-primary text-right', text: '查询成功'},
    {cls: 'label label-danger text-right', text: '查询失败'}
];

function set_label(label, style) {
    t = $("#" + label);
    t.attr('class', label_style[style].cls);
    t.html(label_style[style].text);
}

function on_query_button_clicked() {
	var macaddr = $("#macaddr-field").val();
	if (macaddr == '') {
		$("#macinfo-alert").removeClass('hidden');
		return;
	}
	
	$("#result-panel").removeClass('hidden');
	$(".mac-result").html('');
	set_label('query-label', LABEL_QUERING);
	
	$.ajax({
		url: '/api/macinfo/',
		data: 'macaddr=' + macaddr,
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function(data) {
			if (data.err == 0) {
				set_label('query-label', LABEL_SUCCEED);
				$("#mac-address").html(data.data.mac_address);
				$("#mac-registry").html(data.data.registry);
				$("#mac-assignment").html(data.data.assignment);
				$("#mac-organization").html(data.data.organization_name);
				$("#mac-organization-address").html(data.data.organization_address);
			} else {
				set_label('query-label', LABEL_FAILED);
			}
		},
		error: function() {
			set_label('query-label', LABEL_FAILED);
		}
	});
}

$("#macaddr-field").keydown(function(event) {
    if (event.keyCode == 13) {
        on_query_button_clicked();
    }
    
    if ($("#macinfo-alert").attr('class').indexOf('hidden') < 0) {
        $("#macinfo-alert").addClass('hidden');
    }
});

var macaddr_field_onfocus = false;
$("#macaddr-field").focus(function() {
	macaddr_field_onfocus = true;
    $(this).select();
});

$("#macaddr-field").mouseup(function() {
    if (macaddr_field_onfocus) {
    	macaddr_field_onfocus = false;
        return false;
    } else {
        return true;
    }
});
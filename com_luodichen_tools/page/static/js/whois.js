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

function query_whois(domain, success, error) {
    $.ajax({
        url: '/api/whois/',
        data: 'domain=' + domain,
        type: 'get',
        cache: false,
        dataType: 'json',
        success: success,
        error: error
    });
}

function on_query_button_clicked() {
    domain = $("#domain-field").val();
    if (domain == '') {
        $("#domain-alert").removeClass("hidden");
        return;
    }
    
    $("#result-panel").removeClass('hidden');
    $("#whois-result").html('');
    set_label('result-label', LABEL_QUERING);
    
    query_whois(domain,
        function(data) {
            if (data.err == 0) {
                set_label('result-label', LABEL_SUCCEED);
                $("#whois-result").html(data.data);
            } else {
                set_label('result-label', LABEL_FAILED);
                $("#whois-result").html(data.msg);
            }
        },
        function() {
            set_label('result-label', LABEL_FAILED);
        }
    );
}

$("#domain-field").keydown(function(event) {
    if (event.keyCode == 13) {
        on_query_button_clicked();
    }
    
    if ($("#domain-alert").attr('class').indexOf('hidden') < 0) {
        $("#domain-alert").addClass('hidden');
    }
});

var domain_field_onfocus = false;
$("#domain-field").focus(function() {
    domain_field_onfocus = true;
    $(this).select();
});

$("#domain-field").mouseup(function() {
    if (domain_field_onfocus) {
        domain_field_onfocus = false;
        return false;
    } else {
        return true;
    }
});

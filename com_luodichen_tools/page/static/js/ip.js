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

function query_ip(address, success, error) {
    $.ajax({
        url: '/api/ip/',
        data: 'address=' + address,
        type: 'get',
        cache: false,
        dataType: 'json',
        success: success,
        error: error
    });
}

function query_ipapi(address, success, error) {
    $.ajax({
        url: '/api/ip-api/',
        data: 'address=' + address,
        type: 'get',
        cache: false,
        dataType: 'json',
        success: success,
        error: error
    });
}

function set_my_location(success, msg, loc) {
    if (loc == null || loc == '') {
        success = false;
        msg = '无可用信息';
    }
    
    if (!success) {
        $("#my-location").attr('class', 'label label-danger');
        $("#my-location").html(msg);
    } else {
        $("#my-location").attr('class', '');
        $("#my-location").html(loc);
    }
}

function set_bd_result(success, msg, loc, isp, ip) {
    if (success && !(loc == null || loc == '')) {
        set_label('bd-label', LABEL_SUCCEED);
        $("#bd-adress").html(ip);
        $("#bd-location").html(loc);
        $("#bd-isp").html(isp);
    } else {
        set_label('bd-label', LABEL_FAILED);
    }
}

function set_ipapi_result(success, data) {
    if (success) {
        set_label('ipapi-label', LABEL_SUCCEED);
        $("#ipapi-address").html(data.query);
        $("#ipapi-country").html(data.country + '&nbsp;&nbsp;<img src="https://o1giezlv1.qnssl.com/flag/' 
                + data.countryCode.toLowerCase() + '.png" width="32px"/>');
        $("#ipapi-region").html(data.regionName);
        $("#ipapi-city").html(data.city);
        $("#ipapi-isp").html(data.isp);
        $("#ipapi-as").html(data.as);
        $("#ipapi-org").html(data.org);
        $("#ipapi-lon").html(data.lon);
        $("#ipapi-lat").html(data.lat);
    } else {
        set_label('ipapi-label', LABEL_FAILED);
    }
}

function format_bd_location(response) {
    loc = '';
    if (response.country != null && response.country != 'None')
        loc += response.country;
    if (response.province != null && response.province != 'None')
        loc += (response.province + '省');
    if (response.city != null && response.city != 'None')
        loc += (response.city + '市');
    if (response.district != null && response.district != 'None')
        loc += (response.district + '区');
    
    return loc;
}

$(document).ready(function() {
    query_ip(my_ipaddress, 
        function(data) {
            if (data.err != 0) {
                set_my_location(false, data.msg, null);
                set_bd_result(false, null, null, null, null);
            } else {
                loc = format_bd_location(data.data);
                set_my_location(true, data.msg, loc);
                set_bd_result(true, data.msg, loc, data.data.carrier, data.data.ip);
            }
        }, 
        function() {
            set_my_location(false, '网络错误', null);
            set_bd_result(false, null, null, null, null);
        }
    );
    query_ipapi(my_ipaddress,
        function(data) {
            set_ipapi_result(data.err == 0, data);
        },
        function() {
            set_ipapi_result(false, null);
        }
    );
});

function on_query_button_clicked() {
    address = $("#ip-field").val();
    $(".bd-field").html('');
    $(".ipapi-field").html('');
    set_label('bd-label', LABEL_QUERING);
    set_label('ipapi-label', LABEL_QUERING);
    //$("#ip-field").val('');
    
    query_ip(address, 
        function(data) {
            if (data.err == 0) {
                loc = format_bd_location(data.data);
                set_bd_result(true, data.msg, loc, data.data.carrier, data.data.ip);
            } else {
                set_bd_result(false, null, null, null, null);
            }
        },
        function() {
            set_bd_result(false, null, null, null, null);
        }
    );
    query_ipapi(address, 
        function(data) {
            set_ipapi_result(data.err == 0, data);
        },
        function() {
            set_ipapi_result(false, null);
        }
    );
}

$("#ip-field").keydown(function(event) {
    if (event.keyCode == 13) {
        on_query_button_clicked();
    }
});

var ip_field_onfocus = false;
$("#ip-field").focus(function() {
    ip_field_onfocus = true;
    $(this).select();
});

$("#ip-field").mouseup(function() {
    if (ip_field_onfocus) {
        ip_field_onfocus = false;
        return false;
    } else {
        return true;
    }
});

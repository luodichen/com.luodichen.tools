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

$(document).ready(function() {
    query_ip(my_ipaddress, 
        function(data) {
            if (data.err != 0) {
                set_my_location(false, data.msg, null);
            } else {
                info = data.data;
                loc = '';
                if (info.country != null && info.country != 'None')
                    loc += info.country;
                if (info.province != null && info.province != 'None')
                    loc += (info.province + '省');
                if (info.city != null && info.city != 'None')
                    loc += (info.city + '市');
                if (info.district != null && info.district != 'None')
                    loc += (info.district + '区');
                
                set_my_location(true, data.msg, loc);
            }
        }, 
        function() {
            set_my_location(false, '网络错误', null);
        }
    );
});

import urllib2
import re
import json
import socket
import httpresponse
import libnsresolve
from pywhois.pywhois import PyWhois
from macinfo import macinfo

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def ip(request):
    ret = {'err': 0, 'msg': '', 'data': None}
    
    try:
        address = request.REQUEST.get('address')
        if address == '':
            address = get_client_ip(request)
        else:
            address = socket.gethostbyname(address)
        url = 'http://ip.taobao.com/service/getIpInfo.php?ip=' + address
        req = urllib2.Request(url)
        
        response = json.loads(urllib2.urlopen(req).read())
        
        ret['err'] = response['code']
        ret['data'] = response['data']
    except Exception, e:
        ret['err'] = -1
        ret['msg'] = str(e)
    
    return httpresponse.JsonResponse(ret)

def ip_api(request):
    ret = {'err': 0, 'msg': ''}
    try:
        address = request.REQUEST.get('address')
        if address == '':
            address = get_client_ip(request)
        url = 'http://ip-api.com/json/' + address
        req = urllib2.Request(url)
        response = json.loads(urllib2.urlopen(req).read())
        
        if response['status'] != 'success':
            ret['err'] = 1
        
        ret['msg'] = response['status']
    except Exception, e:
        ret['err'] = -1
        ret['msg'] = str(e)
    
    return httpresponse.JsonResponse(dict(ret.items() + response.items()))

def whois(request):
    ret = {'err': 0, 'msg': '', 'data': None}
    try:
        domain = request.REQUEST.get('domain')
        ret['data'] = PyWhois().getwhois(domain)
        
    except Exception, e:
        ret['err'] = -1
        ret['msg'] = str(e)

    return httpresponse.JsonResponse(ret)

def make_records_container(obj):
    if type(obj) is list:
        return [make_records_container(item) for item in obj]
    elif isinstance(obj, libnsresolve.Record):
        return {key: make_records_container(obj.__dict__[key]) for key in obj.__dict__}
    elif type(obj) is libnsresolve.IPv4Address:
        return str(obj)
    else:
        return obj

def dns_resolve(request):
    ret = {'err': 0, 'msg': ''}
    try:
        domain = str(request.REQUEST['domain'])
        record_type = int(request.REQUEST['type'])
        server = str(request.REQUEST['server'])
        
        records = libnsresolve.resolve(domain, record_type, server, 10)
        ret['data'] = make_records_container(records)
    except libnsresolve.NSRException, e:
        ret['err'] = e.error_code
    except Exception, e:
        ret['err'] = -1
    
    return httpresponse.JsonResponse(ret)
        
def query_macinfo(request):
    ret = {'err': 0, 'msg': '', 'data': None}
    try:
        macaddr = request.REQUEST.get('macaddr')
        pattern = re.compile('^(?:(?:\d|[a-f]|[A-F]){2}(?::|-)){5}(?:\d|[a-f]|[A-F]){2}$')
        if not pattern.match(macaddr):
            raise Exception('invalid mac address')
            
        mac_info = macinfo.get_macinfo(macaddr)
        
        if mac_info is None:
            ret['err'] = 2
            ret['msg'] = 'mac address not found'
        else:
            ret['data'] = {
                'mac_address': macaddr,
                'registry': mac_info[1],
                'assignment': mac_info[2],
                'organization_name': mac_info[3],
                'organization_address': mac_info[4]
            }
    except Exception, e:
        ret['err'] = -1
        ret['msg'] = str(e)
    
    return httpresponse.JsonResponse(ret)

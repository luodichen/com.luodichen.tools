import urllib2
import json
import httpresponse

def ip(request):
    ret = {'err': 0, 'msg': '', 'data': None}
    apikey = 'ef804e1460acfabfd8b721c83e679f4b'
    try:
        address = request.REQUEST.get('address')
        url = 'http://apis.baidu.com/apistore/iplookupservice/iplookup?ip=' + address
        req = urllib2.Request(url)
        req.add_header('apikey', apikey)
        response = json.loads(urllib2.urlopen(req).read())
        
        ret['err'] = response['errNum']
        ret['msg'] = response['errMsg']
        ret['data'] = response['retData']
    except Exception, e:
        ret['err'] = -1
        ret['msg'] = str(e)
    
    return httpresponse.JsonResponse(ret)

def ip_api(request):
    ret = {'err': 0, 'msg': ''}
    try:
        address = request.REQUEST.get('address')
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

'''
Created on Nov 4, 2015

@author: luodichen
'''
from django.template import Context, loader
from django.http.response import HttpResponse
import tabpage

class BaseResponse(object):
    def __init__(self, req):
        self.request = req
    
    def get_content(self):
        pass
    
    def get_active_index(self):
        pass
    
    def get_response(self):
        tab_list = tabpage.tablist
        
        for i in xrange(len(tab_list)):
            tab_list[i].active = (self.get_active_index() == i)

        content = self.get_content()
        
        template = loader.get_template('mainframe.html')
        context = Context({
            'tab_list': tab_list,
            'tab_content': content,
            'js_files': tab_list[self.get_active_index()].js_files,
            'css_links': tab_list[self.get_active_index()].css_links,
        })
        
        return HttpResponse(template.render(context))

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

class IPResponse(BaseResponse):
    def __init__(self, req):
        BaseResponse.__init__(self, req)
    
    def get_content(self):
        ip_addr = get_client_ip(self.request)
        template = loader.get_template('ip.html')
        context = Context({
            'my_ipaddress': ip_addr,
        })
        
        return template.render(context)
    
    def get_active_index(self):
        return 0
    
class MACInfoResponse(BaseResponse):
    def __init__(self, req):
        BaseResponse.__init__(self, req)
        
    def get_content(self):
        template = loader.get_template('macinfo.html')
        context = Context({
        })
        
        return template.render(context)
    
    def get_active_index(self):
        return 1
    
class DNSResolveResponse(BaseResponse):
    def __init__(self, req):
        BaseResponse.__init__(self, req)
        
    def get_content(self):
        template = loader.get_template('dns-resolve.html')
        context = Context({
        })
        
        return template.render(context)
    
    def get_active_index(self):
        return 2

class WhoisResponse(BaseResponse):
    def __init__(self, req):
        BaseResponse.__init__(self, req)
    
    def get_content(self):
        template = loader.get_template('whois.html')
        context = Context({
        })
        
        return template.render(context)
    
    def get_active_index(self):
        return 2
    
class HashResponse(BaseResponse):
    def __init__(self, req):
        BaseResponse.__init__(self, req)
    
    def get_content(self):
        template = loader.get_template('hash.html')
        context = Context({
        })
        
        return template.render(context)
    
    def get_active_index(self):
        return 3
    
class Base64Response(BaseResponse):
    def __init__(self, req):
        BaseResponse.__init__(self, req)
    
    def get_content(self):
        template = loader.get_template('base64.html')
        context = Context({
        })
        
        return template.render(context)
    
    def get_active_index(self):
        return 4

class JsonCheckResponse(BaseResponse):
    def __init__(self, req):
        BaseResponse.__init__(self, req)
    
    def get_content(self):
        template = loader.get_template('json-check.html')
        context = Context({
        })
        
        return template.render(context)
    
    def get_active_index(self):
        return 5

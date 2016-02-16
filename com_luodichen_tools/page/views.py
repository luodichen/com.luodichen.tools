from django.http.response import HttpResponseRedirect
#from django.http.response import HttpResponse

import response

# Create your views here.

def redirect_index(request):
    return HttpResponseRedirect('/page/')

def index(request):
    return ip(request)

def ip(request):
    return response.IPResponse(request).get_response()

def whois(request):
    return response.WhoisResponse(request).get_response()

def md5(request):
    #return HttpResponse('hello world')
    return response.HashResponse(request).get_response()

def macinfo(request):
    return response.MACInfoResponse(request).get_response()

def base64(request):
    return response.Base64Response(request).get_response()

def jsoncheck(request):
    return response.JsonCheckResponse(request).get_response()

def dns_resolve(request):
    return response.DNSResolveResponse(request).get_response()


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
    return response.MD5(request).get_response()

def macinfo(request):
    return response.MACInfoResponse(request).get_response()

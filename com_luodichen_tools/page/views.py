from django.http.response import HttpResponseRedirect

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


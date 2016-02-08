'''
Created on Nov 5, 2015

@author: luodichen
'''

from django.conf.urls import url

urlpatterns = [
    url(r'^ip/$', 'api.views.ip'),
    url(r'^ip-api/$', 'api.views.ip_api'),
    url(r'^whois/$', 'api.views.whois'),
    url(r'^dns-resolve/$', 'api.views.dns_resolve'),
    url(r'^macinfo/$', 'api.views.query_macinfo'),
]

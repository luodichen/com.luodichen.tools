'''
Created on Nov 4, 2015

@author: luodichen
'''

from django.conf.urls import url

urlpatterns = [
    url(r'^$', 'page.views.index'),
    url(r'^ip/$', 'page.views.ip'),
    url(r'^whois/$', 'page.views.whois'),
    url(r'^hash/$', 'page.views.md5'),
    url(r'^macinfo/$', 'page.views.macinfo'),
    url(r'^base64/$', 'page.views.base64'),
    url(r'^json/$', 'page.views.jsoncheck'),
    url(r'^dns-resolve/$', 'page.views.dns_resolve'),
]

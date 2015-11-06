'''
Created on Nov 4, 2015

@author: luodichen
'''

from django.conf.urls import url

urlpatterns = [
    url(r'^$', 'page.views.index'),
    url(r'^ip/$', 'page.views.ip'),
    url(r'^whois/$', 'page.views.whois'),
]

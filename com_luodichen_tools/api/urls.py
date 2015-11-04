'''
Created on Nov 5, 2015

@author: luodichen
'''

from django.conf.urls import url

urlpatterns = [
    url(r'^ip/$', 'api.views.ip'),
]

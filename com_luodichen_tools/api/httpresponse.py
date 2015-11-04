'''
Created on Nov 5, 2015

@author: luodichen
'''

import json
from django.http.response import HttpResponse

class JsonResponse(HttpResponse):
    def __init__(self, obj):
        data = json.dumps(obj)
        HttpResponse.__init__(self, data, content_type='application/json')

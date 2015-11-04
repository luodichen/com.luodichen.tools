# -*- coding: utf-8 -*-
'''
Created on Nov 4, 2015

@author: luodichen
'''

class TabPage(object):
    def __init__(self, active=False, href=None, title=None, js_files=[]):
        self.active = active
        self.href = href
        self.title = title
        self.js_files = js_files
        
tablist = [
    TabPage(False, '/page/ip/', u'IP 地址', ['js/ip.js', ]),
]

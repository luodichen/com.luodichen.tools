# -*- coding: utf-8 -*-
'''
Created on Nov 4, 2015

@author: luodichen
'''

class TabPage(object):
    def __init__(self, active=False, href=None, title=None, js_files=[], css_links=[]):
        self.active = active
        self.href = href
        self.title = title
        self.js_files = js_files
        self.css_links = css_links
        
tablist = [
    TabPage(False, '/page/ip/', u'IP 地址', ['js/ip.js', ]),
    TabPage(False, '/page/macinfo/', u'MAC 地址', ['js/macinfo.js', ]),
    # TabPage(False, '/page/dns-resolve/', u'DNS 解析', []), 
    TabPage(False, '/page/whois/', 'Whois', ['js/whois.js', ]),
    TabPage(False, '/page/hash/', 'Hash',['js/crypto-js/rollups/md5.js', 
                                          'js/crypto-js/rollups/sha1.js',
                                          'js/crypto-js/rollups/sha256.js',
                                          'js/hash.js', ]),
    TabPage(False, '/page/base64/', 'Base64', ['js/base64.min.js', 
                                               'js/base64.js', ]),
    TabPage(False, '/page/json/', 'JSON', ['js/json2.js', 
                                           'js/jsonlint.js', 
                                           'js/json-check.js', ],
            ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/default.min.css', ]),
]

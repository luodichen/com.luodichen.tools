# -*- encoding: utf-8 -*-

'''
Created on Feb 1, 2016

@author: luodichen
'''

import os
import sqlite3

def get_macinfo(macaddr):
    macaddr = macaddr.upper().replace(':', '').replace('-', '')
    data_path = os.path.dirname(os.path.abspath(__file__)) + os.sep + 'data'
    data_list = [
        # prefix-length, database-path
        (6, data_path + os.sep + 'oui.sqlite3', ), 
        (7, data_path + os.sep + 'mam.sqlite3', ),
        (9, data_path + os.sep + 'oui36.sqlite3', ),
    ]
    
    ret = None
    for data in data_list:
        conn = None
        try:
            conn = sqlite3.connect(data[1])
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM `data` WHERE `assignment` = ?', (macaddr[:data[0]], ))
            
            result = cursor.fetchone()
            ret = result if result is not None else ret
        except Exception, e:
            print e
        finally:
            if conn is not None:
                conn.close()
    
    return ret

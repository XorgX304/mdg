workers = 4
errorlog = '/home/mockdatagenerator/mdg_project/mdg/logs/gunicorn/error.log'
loglevel = 'info'
accesslog = '/home/mockdatagenerator/mdg_project/mdg/logs/gunicorn/access.log'
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
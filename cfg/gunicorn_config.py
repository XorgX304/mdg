workers = 4
errorlog = '/home/ubuntu/logs/gunicorn/error.log'
loglevel = 'info'
accesslog = '/home/ubuntu/logs/gunicorn/access.log'
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
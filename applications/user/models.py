from django.db import models

class AdminInfo(models.Model):
    aid = models.AutoField(primary_key=True, null=False)    # 主键
    username = models.CharField(max_length=50,null=False)
    password = models.CharField(max_length=256,null=False)
    real_name = models.CharField(max_length=10, null=False)
    email = models.EmailField(max_length=30, null=False)
    phone = models.CharField(max_length=11, null=False)
    wechat = models.CharField(max_length=30, null=False)
    register_time = models.DateTimeField(auto_now_add=True, null=True)
    last_login_time = models.DateTimeField(null=True)
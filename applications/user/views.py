from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.shortcuts import redirect
from io import BytesIO
import json
from applications.user.models import AdminInfo
from applications.user.utils import validation_img
import datetime

# Create your views here.
def homepage(request):
    # print(request.session.get('isLogin'))

    if not request.session.get('isLogin', False):   # 未登录
        return redirect('/user/login')
    else:                                            # 已登陆
        return redirect('/work/manage')

def check_code(request):
    if request.method == 'GET':
        img = validation_img.check_code()
        check_img, check_code = img.create_img()
        stream = BytesIO()
        check_img.save(stream, 'JPEG')
        request.session['CheckCode'] = check_code
        return HttpResponse(stream.getvalue())

# ----------------- 登录代码 -----------------
def auth_login(func):
    def wrapper(request, *args, **kwargs):
        if request.session.get('isLogin', False):
            return redirect('/work/manage')   # 管理员页面
        else:
            res = func(request, *args, **kwargs)
            return res
    return wrapper

@auth_login
def login(request):
    if request.method == 'GET':
        return render(request, 'admin_login.html')     # 管理员登陆页面
    elif request.method == 'POST':
        status = {'state': '200', 'data': None}

        # 检查验证码
        identify_code = request.POST.get('identify_code', None)
        if request.session.get('CheckCode', 'emmmmmmmmmm').lower() != identify_code.lower():
            status['state'] = '303'
            return HttpResponse(json.dumps(status))

        # 检查用户名、密码
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        admin_obj = AdminInfo.objects.filter(username=username, password=password).first()
        if not admin_obj:
            status['state'] = '505'
            return HttpResponse(json.dumps(status))

        # 管理员登录成功

        # 刷新最后登录时间
        admin_obj.last_login_time = datetime.datetime.now()
        admin_obj.save()

        request.session['admin'] = admin_obj.aid
        request.session['isLogin'] = True

        status['state'] = '200'
        status['data'] = "/work/manage"          # 管理员页面

        request.session.set_expiry(0)  # 关闭页面即失效

        return HttpResponse(json.dumps(status))

def logout(request):
    request.session.delete(request.session.session_key)
    return redirect('/user/login')
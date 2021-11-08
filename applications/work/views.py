from geopy.distance import geodesic
from django.shortcuts import render
from django.shortcuts import redirect
from django.shortcuts import HttpResponse
from sklearn import metrics

from applications.user.models import AdminInfo
from applications.work.models import CarWorkDay, Route
from applications.work.models import RouteInfo
import json
import datetime
import math
import numpy as np
import matplotlib.pyplot as plt
import sklearn.cluster as skc  # 密度聚类

UNCLASSIFIED = False
NOISE = 0


# Create your views here.

class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, datetime.date):
            return obj.strftime("%Y-%m-%d")
        else:
            return json.JSONEncoder.default(self, obj)


#   跳转

def manage(request):
    if not request.session.get('isLogin', False):  # 未登录
        return redirect('/user/login')
    else:  # 已登陆
        return render(request, 'background.html')


def worklist(request):
    if not request.session.get('isLogin', False):  # 未登录
        return redirect('/user/login')
    else:  # 已登陆
        return render(request, 'worklist.html')


def workdetail(request, id):
    if not request.session.get('isLogin', False):  # 未登录
        return redirect('/user/login')
    else:  # 已登陆
        return render(request, 'workdetail.html')


def worksearch(request):
    if not request.session.get('isLogin', False):  # 未登录
        return redirect('/user/login')
    else:  # 已登陆
        return render(request, 'worksearch.html')


def workstatistics(request):
    if not request.session.get('isLogin', False):  # 未登录
        return redirect('/user/login')
    else:  # 已登陆
        return render(request, 'workstatistics.html')


def workroute(request):
    if not request.session.get('isLogin', False):  # 未登录
        return redirect('/user/login')
    else:  # 已登陆
        return render(request, 'workroute.html')


def routedetail(request, id):
    if not request.session.get('isLogin', False):  # 未登录
        return redirect('/user/login')
    else:  # 已登陆
        return render(request, 'routedetail.html')


#   api

def admin_info(request):
    aid = request.session['admin']
    user = AdminInfo.objects.filter(aid=aid).first()
    info = {'aid': user.aid, 'username': user.username, 'email': user.email,
            'phone': user.phone, 'wechat': user.wechat}
    result = {
        "state": 200,
        "data": info
    }
    return HttpResponse(json.dumps(result))


def work_list(request):
    if request.method == 'POST':
        return HttpResponse('请使用GET请求')
    try:
        page = request.GET['page']
        page = int(page)
    except:
        page = 0
    work_query = CarWorkDay.objects.all()
    pages = math.ceil(len(work_query) / 10)
    try:
        worklist = []
        for i in range(10):
            work = {'id': work_query[page * 10 + i].id, 'carId': work_query[page * 10 + i].carId,
                    'workType': work_query[page * 10 + i].workType,
                    'workDate': work_query[page * 10 + i].workDate}
            worklist.append(work)
    except:
        worklist = []
        for i in range(len(work_query) % 10):
            work = {'id': work_query[page * 10 + i].id, 'carId': work_query[page * 10 + i].carId,
                    'workType': work_query[page * 10 + i].workType,
                    'workDate': work_query[page * 10 + i].workDate}
            worklist.append(work)
    result = {
        "state": 200,
        "data": worklist,
        "page": page,
        "pages": pages
    }
    return HttpResponse(json.dumps(result, cls=DateEncoder))


def work_detail(request):
    if request.method == 'POST':
        return HttpResponse('请使用GET请求')
    id = request.GET.get('id', 1)
    work_query = CarWorkDay.objects.filter(id=id).first()
    work = {'carId': work_query.carId,
            'deviceId': work_query.deviceId,
            'disWork': work_query.disWork,
            'workType': work_query.workType,
            'beginTime': work_query.beginTime,
            'endTime': work_query.endTime,
            'workLocate': work_query.loc4}
    result = {
        "state": 200,
        "data": work
    }
    return HttpResponse(json.dumps(result, cls=DateEncoder))


def show_by_date(request):
    if request.method == 'POST':
        return HttpResponse('请使用GET请求')
    try:
        workDate1 = request.GET['workDate1']
        workDate_date1 = datetime.datetime.strptime(workDate1, '%Y-%m-%d').date()
        print(workDate_date1)
        workDate2 = request.GET['workDate2']
        workDate_date2 = datetime.datetime.strptime(workDate2, '%Y-%m-%d').date()
        print(workDate_date2)
        page = request.GET['page']
        page = int(page)
    except:
        workDate_date1 = datetime.datetime.today().date()
        workDate_date2 = datetime.datetime.today().date()
        page = 0
    work_query = CarWorkDay.objects.filter(workDate__range=(workDate_date1, workDate_date2)).all()
    pages = math.ceil(len(work_query) / 10)
    try:
        worklist = []
        for i in range(10):
            work = {'id': work_query[page * 10 + i].id, 'carId': work_query[page * 10 + i].carId,
                    'workType': work_query[page * 10 + i].workType,
                    'workDate': work_query[page * 10 + i].workDate}
            worklist.append(work)
    except:
        worklist = []
        for i in range(len(work_query) % 10):
            work = {'id': work_query[page * 10 + i].id, 'carId': work_query[page * 10 + i].carId,
                    'workType': work_query[page * 10 + i].workType,
                    'workDate': work_query[page * 10 + i].workDate}
            worklist.append(work)
    result = {
        "state": 200,
        "data": worklist,
        "page": page,
        "pages": pages
    }
    return HttpResponse(json.dumps(result, cls=DateEncoder))


def work_search(request):
    if request.method == 'POST':
        return HttpResponse('请使用GET请求')
    try:
        carid = request.GET['carid']
        worktype = request.GET['worktype']
        page = request.GET['page']
        page = int(page)
    except:
        page = 0
        carid = None
        worktype = None
    search_dict = dict()
    if carid:
        search_dict['carId'] = carid
    if worktype:
        search_dict['workType'] = worktype
    work_query = CarWorkDay.objects.filter(**search_dict)
    pages = math.ceil(len(work_query) / 10)
    try:
        worklist = []
        for i in range(10):
            work = {'id': work_query[page * 10 + i].id, 'carId': work_query[page * 10 + i].carId,
                    'workType': work_query[page * 10 + i].workType,
                    'workDate': work_query[page * 10 + i].workDate}
            worklist.append(work)
    except:
        worklist = []
        for i in range(len(work_query) % 10):
            work = {'id': work_query[page * 10 + i].id, 'carId': work_query[page * 10 + i].carId,
                    'workType': work_query[page * 10 + i].workType,
                    'workDate': work_query[page * 10 + i].workDate}
            worklist.append(work)
    result = {
        "state": 200,
        "data": worklist,
        "page": page,
        "pages": pages
    }
    return HttpResponse(json.dumps(result, cls=DateEncoder))


def work_statistics(request):
    if request.method == 'POST':
        return HttpResponse('请使用GET请求')
    mouthcount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    work_query = CarWorkDay.objects.all()
    for each in work_query:
        mouthcount[each.workDate.month - 1] += 1
    result = {
        "state": 200,
        "data": mouthcount
    }
    return HttpResponse(json.dumps(result, cls=DateEncoder))


def route_list(request):
    if request.method == 'POST':
        return HttpResponse('请使用GET请求')
    try:
        page = request.GET['page']
        page = int(page)
    except:
        page = 0
    route_query = Route.objects.all()
    pages = math.ceil(len(route_query) / 10)
    for i in range(len(route_query)):
        if (route_query[i].pointnum == None or route_query[i].distance == None):
            points = RouteInfo.objects.filter(workid=i + 1).all()
            num = len(points)
            distance = 0
            for j in range(len(points) - 1):
                distance = distance + (geodesic((points[j].latitude, points[j].longitude),
                                                (points[j + 1].latitude, points[j + 1].longitude)).m)
            route_query[i].pointnum = num
            route_query[i].distance = round(distance / 1000, 2)
            route_query[i].save()
    try:
        routelist = []
        for i in range(10):
            route = {'id': route_query[page * 10 + i].id, 'machineid': route_query[page * 10 + i].machineid,
                     'pointnum': route_query[page * 10 + i].pointnum, 'distance': route_query[page * 10 + i].distance,
                     'date': route_query[page * 10 + i].date, 'worktype': route_query[page * 10 + i].worktype}
            routelist.append(route)
    except:
        routelist = []
        for i in range(len(route_query) % 10):
            route = {'id': route_query[page * 10 + i].id, 'machineid': route_query[page * 10 + i].machineid,
                     'pointnum': route_query[page * 10 + i].pointnum, 'distance': route_query[page * 10 + i].distance,
                     'date': route_query[page * 10 + i].date, 'worktype': route_query[page * 10 + i].worktype}
            routelist.append(route)
    result = {
        "state": 200,
        "data": routelist,
        "page": page,
        "pages": pages
    }
    return HttpResponse(json.dumps(result, cls=DateEncoder))


def route_split_1(X):  # 插秧
    db = skc.DBSCAN(eps=11, min_samples=9).fit(X)  # DBSCAN聚类方法 还有参数，matric = ""距离计算方法
    #db = skc.KMeans(n_clusters=4, random_state=9).fit(X)
    labels = db.labels_  # 和X同一个维度，labels对应索引序号的值 为她所在簇的序号。若簇编号为-1，表示为噪声
    # print('每个样本的簇标号:')
    raito = len(labels[labels[:] == -1]) / len(labels)  # 计算噪声点个数占总数的比例
    print('噪声比:', format(raito, '.2%'))

    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)  # 获取分簇的数目
    print('分簇的数目: %d' % n_clusters_)
    print('Silhouette Coefficient: %0.3f' % metrics.silhouette_score(X, labels))
    # clusters = [[] for i in range(n_clusters_)]
    # for i in range(len(labels)):
    #   for j in range(n_clusters_):
    #        if (labels[i] == j):
    #            clusters[j].append(point[i])
    return labels, n_clusters_


def route_split_2(X):  # 深松
    db = skc.DBSCAN(eps=4.5, min_samples=7).fit(X)  # DBSCAN聚类方法 还有参数，matric = ""距离计算方法
    labels = db.labels_  # 和X同一个维度，labels对应索引序号的值 为她所在簇的序号。若簇编号为-1，表示为噪声
    # print('每个样本的簇标号:')
    raito = len(labels[labels[:] == -1]) / len(labels)  # 计算噪声点个数占总数的比例
    print('噪声比:', format(raito, '.2%'))

    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)  # 获取分簇的数目
    print('分簇的数目: %d' % n_clusters_)
    print('Silhouette Coefficient: %0.3f' % metrics.silhouette_score(X, labels))
    # clusters = [[] for i in range(n_clusters_)]
    # for i in range(len(labels)):
    #   for j in range(n_clusters_):
    #        if (labels[i] == j):
    #            clusters[j].append(point[i])
    return labels, n_clusters_


def evaluate(labels, time):
    labels = labels.tolist()
    timework = 0
    maxlabel = max(labels, key=labels.count)
    for i in range(len(labels) - 1):
        if (labels[i] == maxlabel and labels[i + 1] == maxlabel):
            timework = timework + (time[i + 1] - time[i]).total_seconds()
    timetotal = (time[len(labels) - 1] - time[0]).total_seconds()
    return timework, timetotal


def route_detail(request):
    if request.method == 'POST':
        return HttpResponse('请使用GET请求')
    workid = request.GET.get('id', 1)
    address_point = RouteInfo.objects.filter(workid=workid).all()
    work = Route.objects.filter(id=workid).first()
    address_longitude = []
    address_latitude = []
    #distance = []
    course = []
    speed = []
    deep = []
    time = []
    for i in range(len(address_point)):
        if (i != len(address_point) - 1):
            course.append(abs(address_point[i].course - address_point[i + 1].course))
            #distance.append(geodesic((address_point[i].latitude, address_point[i].longitude),
                                                                  #(address_point[i + 1].latitude, address_point[i + 1].longitude)).m)
        speed.append(address_point[i].speed)
        address_longitude.append(address_point[i].longitude)
        address_latitude.append(address_point[i].latitude)
        deep.append(address_point[i].deep)
        time.append(address_point[i].time)
    #distance.append(0)
    course.append(0)
    print(course)
    point = list(zip(address_longitude, address_latitude))
    if (work.worktype == '插秧'):
        data = list(zip(speed, course))
        X = np.array(data)
        (labels, n_clusters_) = route_split_1(X)
    elif (work.worktype == '深松'):
        data = list(zip(speed, deep))
        X = np.array(data)
        (labels, n_clusters_) = route_split_2(X)
    (timework, timetotal) = evaluate(labels, time)
    clusters = [[] for i in range(n_clusters_)]
    # for i in range(len(labels)):
    #     for j in range(n_clusters_):
    #         if (labels[i] == j):
    #             clusters[j].append(point[i])
    for i in range(n_clusters_):
        # print('簇 ', i, '的所有样本:')
        #3one_cluster = clusters[i]
        one_cluster=X[labels==i]
        #print(one_cluster)
        one_cluster = np.array(one_cluster)
        plt.plot(one_cluster[:, 0], one_cluster[:, 1], 'o')
    plt.xlabel(u'作业速度，单位:km/h',fontproperties='SimHei')
    plt.ylabel(u'作业深度',fontproperties='SimHei')
    plt.show()
    result = {'point': json.dumps(point),
              'data': json.dumps(data),
              'speed':json.dumps(speed),
              'labels': json.dumps(labels.tolist()),
              'n_clusters_': json.dumps(n_clusters_),
              'timework': json.dumps(timework),
              'timetotal': json.dumps(timetotal),
              }
    return HttpResponse(json.dumps(result, cls=DateEncoder))

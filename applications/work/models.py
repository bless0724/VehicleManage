from django.db import models


work_type = (
    ('1', '插秧'),
    ('2', '深松'),
)

# Create your models here.
class CarWorkDay(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    carId = models.CharField(max_length=30,null=False)
    deviceId = models.CharField(max_length=32, null=False)
    surveyPoints = models.IntegerField(default=0, null=False)
    disWork = models.FloatField(null=True)
    workType = models.CharField(max_length=5,null=False)
    loc4 = models.CharField(max_length=50, null=False)
    beginTime = models.DateTimeField(auto_now_add=True, null=False)
    endTime = models.DateTimeField(auto_now_add=True, null=False)
    workDate = models.DateField(auto_now_add=True, null=False)

class Route(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    machineid = models.CharField(max_length=30,null=False)
    pointnum = models.IntegerField(null=True)
    distance = models.FloatField(null=True)
    date = models.DateField(auto_now_add=True, null=False)
    worktype = models.CharField(max_length=5,null=False)
    workid = models.ForeignKey("CarWorkDay", to_field="id", default=1, on_delete=models.CASCADE)


class RouteInfo(models.Model):
    longitude = models.FloatField(null=False,default=0)
    latitude = models.FloatField(null=False,default=0)
    time = models.DateTimeField(auto_now=True, null=True)
    speed = models.FloatField(null=False,default=0)
    workid = models.ForeignKey("Route", to_field="id", default=1, on_delete=models.CASCADE)
    deep = models.FloatField(null=False,default=0)
    course = models.FloatField(null=False,default=0)
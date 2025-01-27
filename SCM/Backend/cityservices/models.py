from django.db import models

# Create your models here.

class BusRoute(models.Model):
    route_id = models.CharField(max_length=50)
    name = models.CharField(max_length=150)
    bus_name = models.CharField(max_length=50)
    geojson = models.JSONField(default=dict)

class BusStop(models.Model):
    stop_id = models.CharField(max_length=50)
    route_id = models.CharField(max_length=50)
    name = models.CharField(max_length=150)
    latitude = models.FloatField()
    longitude = models.FloatField()
    direction = models.IntegerField()

class DublinBikeStation(models.Model):
    station_id = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    bike_stands = models.CharField(max_length=50)
    available_bikes = models.IntegerField()
    usage_percent = models.FloatField()
    last_update = models.DateTimeField()
    status = models.CharField(max_length=20)
    latitude = models.FloatField()
    longitude = models.FloatField()

class SA_energy_consumption(models.Model):
    SA_code = models.IntegerField()
    Energy_use=models.IntegerField()
    Energy_cost=models.IntegerField()
    Total_Floor_Area=models.IntegerField()
    Small_Area_Name=models.CharField(max_length=50)   
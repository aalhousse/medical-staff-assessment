# frontend/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('analysis', views.analysis, name='analysis'),
    path('stations', views.stations, name='stations'),
    path('stations/<int:id>', views.station_patient_list, name='station_patient_list'),
    path('stations/<int:id>/<int:patient_id>/<str:date>', views.classification, name='patient_daily_classification'),
]

"""This file contains the URL patterns for the API."""

from django.urls import path
from .src import handle_calculations, handle_questions, handle_patients , handle_stations

urlpatterns = [
    path('questions/<int:patient_id>/', handle_questions.handle_questions, name='handle_questions'),
    path('calculate/', handle_calculations.handle_calculations, name='handle_calculations'),
    path('stations/', handle_stations.handle_stations, name='handle_stations'),
    path('stations/<int:station_id>/', handle_patients.handle_patients, name='handle_patients'),
]

"""This file contains the URL patterns for the API."""

from django.urls import path
from .src import handle_calculations, handle_questions

urlpatterns = [
    path('questions/<int:patient_id>/', handle_questions.handle_questions, name='handle_questions'),
    path('calculate/', handle_calculations.handle_calculations, name='handle_calculations'),
]

from django.shortcuts import render
from backend.models import Station
from datetime import datetime, timedelta


def home(request):
    return render(request, 'frontend/home.html')


def analysis(request):
    return render(request, 'frontend/analysis.html')


def stations(request):
    # all_stations = Station.objects.all()  # Retrieve all stations from the database
    all_stations = [
        Station(id=i, name=f'Station {i}', is_intensive_care=False, is_child_care_unit=False,
                patients_per_caregiver_ratio=1.5 + i * 0.1)
        for i in range(1, 11)
    ]

    context = {
        'stations': all_stations
    }
    return render(request, 'frontend/stations.html', context)


def station_patient_list(request, id):
    context = {
        'id': id
    }
    return render(request, 'frontend/station_patient_list.html', context)


def classification(request, id, patient_id, date):
    current_date = datetime.strptime(date, '%Y-%m-%d')
    # Calculate previous and next dates
    previous_date = (current_date - timedelta(days=1)).strftime('%Y-%m-%d')
    next_date = (current_date + timedelta(days=1)).strftime('%Y-%m-%d')
    # Example patient name - replace with actual database query when possible
    patient_name = "Max Mustermann"
    next_patient_id = int(patient_id) + 1
    context = {
        'id': id,
        'patient_id': patient_id,
        'date': current_date.strftime('%d.%m.%Y'),  # Format for display
        'previous_date_url': f"/stations/{id}/{patient_id}/{previous_date}",
        'next_date_url': f"/stations/{id}/{patient_id}/{next_date}",
        'next_patient_url': f"/stations/{id}/{next_patient_id}/{date}",
        'patient_name': patient_name
    }
    return render(request, 'frontend/classification.html', context)

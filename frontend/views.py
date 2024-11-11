from django.shortcuts import render
from backend.models import Station


def home(request):
    return render(request, 'frontend/home.html')


def stations(request):
    # all_stations = Station.objects.all()  # Retrieve all stations from the database
    all_stations = [
        Station(name=f'Station {i}', is_intensive_care=False, is_child_care_unit=False,
                patients_per_caregiver_ratio=1.5 + i * 0.1)
        for i in range(1, 11)
    ]

    context = {
        'stations': all_stations
    }
    return render(request, 'frontend/stations.html', context)

from django.shortcuts import render
from backend.models import Station


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
    context = {
        'id': id,
        'patient_id': patient_id,
        'date': date  # TODO parse and validate this
    }
    return render(request, 'frontend/classification.html', context)


def tables2(request):
    return render(request, 'frontend/tables2.html')


def tables3(request):
    # Sample data for the table
    checkbox_data = [
        {
            "id": 1,
            "field_id__name": "Allgemeine Pflege",
            "field_id__short": "A",
            "category_id__name": "Körperpflege",
            "name": "A-koerperpflege-1-1",
            "severity": 1,
            "description": "Alle Patienten, die nicht A2, A3 oder A4 zugeordnet werden.",
            "is_true": False
        },
        {
            "id": 2,
            "field_id__name": "Allgemeine Pflege",
            "field_id__short": "A",
            "category_id__name": "Körperpflege",
            "name": "A-koerperpflege-2-1",
            "severity": 2,
            "description": "Patient benötigt überwiegend selbständige Hilfe.",
            "is_true": True
        },
        {
            "id": 3,
            "field_id__name": "Spezielle Pflege",
            "field_id__short": "S",
            "category_id__name": "Körperpflege",
            "name": "S-koerperpflege-3-1",
            "severity": 3,
            "description": "Hilfe durch Pflegekräfte notwendig.",
            "is_true": False
        },
        {
            "id": 4,
            "field_id__name": "Spezielle Pflege",
            "field_id__short": "S",
            "category_id__name": "Körperpflege",
            "name": "S-koerperpflege-4-1",
            "severity": 4,
            "description": "Vollständige Hilfe durch Pflegekraft erforderlich.",
            "is_true": True
        }
    ]

    context = {
        'assessmentData': checkbox_data
    }

    return render(request, 'frontend/tables3.html', context)

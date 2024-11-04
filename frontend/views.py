from django.shortcuts import render


def home(request):
    return render(request, 'frontend/table.html')

def stations(request):
    return render(request, 'frontend/stations.html')

def analysis(request):
    return render(request, 'frontend/analysis.html')

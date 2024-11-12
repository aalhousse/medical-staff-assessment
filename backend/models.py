"""This file contains the all models for the database."""
from django.db import models


class CareServiceField(models.Model):
    """The Field for CareServices often abbreviated with a short name like A or S"""

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=128)  # For example 'Allgemeine Pflege'
    short = models.CharField(max_length=8)  # For example 'A'

    def __str__(self):
        return f"{self.name} ({self.short})"


class CareServiceCategory(models.Model):
    """The Category for a CareService whether the Services regard e.g. hygiene, nutrition or mobilisation"""

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)  # The name for the Category

    def __str__(self):
        return self.name


class CareServiceOption(models.Model):
    """Questions and their belonging to a CareServiceField, CareServiceCategory and their position within that
     according to the PPBV."""

    id = models.IntegerField(primary_key=True)
    field = models.ForeignKey('CareServiceField', on_delete=models.CASCADE)
    category = models.ForeignKey('CareServiceCategory', on_delete=models.CASCADE)
    severity = models.IntegerField()  # 1-4 the degree of help need, higher means more help
    list_index = models.IntegerField()  # Index of the questions within the filed, category and severity list
    description = models.TextField()  # Content of the question

    def __str__(self):
        return f"{self.field.short}{self.severity}-{self.category}-{self.list_index}"


class DailyClassification(models.Model):
    """Daily Classification of the care services for a person."""

    patient_id = models.ForeignKey('Patient', on_delete=models.CASCADE)
    classification_date = models.DateField()  # The date for which the classification is made
    is_in_isolation = models.BooleanField()
    data_accepted = models.BooleanField()  # Did the caregiver accept previous data
    result_minutes = models.IntegerField()  # Time in minutes calculated according to the PPBV
    station = models.ForeignKey('Station', on_delete=models.CASCADE)
    room_name = models.CharField(max_length=100)
    bed_number = models.CharField(max_length=100)

    class Meta:
        unique_together = ('patient_id', 'classification_date')

    def __str__(self):
        return f"{self.patient_id} ({self.classification_date})"


class IsCareServiceUsed(models.Model):
    """CareServices used for a patient for the Classification on a specific date.
    Any entry here means that the service is used"""

    care_service = models.ForeignKey('CareServiceOption', on_delete=models.CASCADE)
    classification = models.ForeignKey('DailyClassification', on_delete=models.CASCADE)

    class Meta:
        # Combined primary key
        unique_together = ('care_service', 'classification')

    def __str__(self):
        return f"{self.care_service} {self.classification}"


class Station(models.Model):
    """Stations in the hospital."""

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    is_intensive_care = models.BooleanField()
    is_child_care_unit = models.BooleanField()
    patients_per_caregiver_ratio = models.FloatField()

    def __str__(self):
        return self.name


class Patient(models.Model):
    """Patients in the database."""

    id = models.IntegerField(primary_key=True)  # The patients ID provided by the hospital
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    weight = models.FloatField()
    height = models.FloatField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

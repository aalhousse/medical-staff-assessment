export type CareServiceFieldClassification = {
  id: string,
  name: string,
  short: string,
  categories: CareServiceCategoryClassification[]
}

export type CareServiceCategoryClassification = {
  id: string,
  name: string,
  severities: CareServiceSeverityClassification[]
}

export type CareServiceSeverityClassification = {
  severity: number,
  options: CareServiceOptionClassification[]
}

export type CareServiceOptionClassification = {
  id: string,
  index: number,
  name: string,
  description: string
}

export type DailyClassification = {
  id: string,
  patientId: string,
  date: Date,
  isInIsolation: boolean,
  isDayOfAdmission: boolean,
  isDayOfDischarge: boolean,
  classificationValues: CareServiceFieldClassification[],
  result: DailyClassificationResult
}

export type DailyClassificationResult = {
  category1: string,
  category2: string,
  minutes: number
}

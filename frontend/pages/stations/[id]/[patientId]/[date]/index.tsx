import { useRouter } from 'next/router'
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { addDays, subDays } from 'date-fns'
import { Header } from '@/layout/Header'
import { Page } from '@/layout/Page'
import { useStationsAPI } from '@/api/stations'
import { usePatientsAPI } from '@/api/patients'
import { Sidebar } from '@/layout/Sidebar'
import type { DailyClassification } from '@/data-models/classification'
import { formatDate } from '@/util/formatDate'
import { parseDateString } from '@/util/parseDateString'
import { noop } from '@/util/noop'
import { ClassificationFieldCard } from '@/components/ClassificationFieldCard'

const dummyDate: DailyClassification = {
  id: 'daily-classification-001',
  patientId: 'patient-12345',
  date: new Date('2024-11-25'),
  isInIsolation: false,
  isDayOfAdmission: true,
  isDayOfDischarge: false,
  classificationValues: [
    {
      id: 'field-001',
      name: 'Allgemeine Pflege',
      short: 'A',
      categories: [
        {
          id: 'category-001',
          name: 'Hygene',
          severities: [
            {
              severity: 1,
              options: [
                {
                  id: 'option-001',
                  index: 0,
                  name: 'Option 1',
                  description: 'Description of Option 1',
                  selected: true,
                },
                {
                  id: 'option-002',
                  index: 1,
                  name: 'Option 2',
                  description: 'Description of Option 2',
                  selected: false,
                },
              ],
            },
            {
              severity: 2,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: true,
                },
              ],
            },
            {
              severity: 3,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
            {
              severity: 4,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
          ],
        },
        {
          id: 'category-002',
          name: 'Körperpflege',
          severities: [
            {
              severity: 1,
              options: [
                {
                  id: 'option-001',
                  index: 0,
                  name: 'Option 1',
                  description: 'Description of Option 1',
                  selected: true,
                },
                {
                  id: 'option-002',
                  index: 1,
                  name: 'Option 2',
                  description: 'Description of Option 2',
                  selected: false,
                },
              ],
            },
            {
              severity: 2,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: true,
                },
              ],
            },
            {
              severity: 3,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
            {
              severity: 4,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
          ],
        },
        {
          id: 'category-003',
          name: 'Mobilisation',
          severities: [
            {
              severity: 1,
              options: [
                {
                  id: 'option-001',
                  index: 0,
                  name: 'Option 1',
                  description: 'Description of Option 1',
                  selected: true,
                },
                {
                  id: 'option-002',
                  index: 1,
                  name: 'Option 2',
                  description: 'Description of Option 2',
                  selected: false,
                },
              ],
            },
            {
              severity: 2,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: true,
                },
              ],
            },
            {
              severity: 3,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
            {
              severity: 4,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'field-002',
      name: 'Spezielle Pflege',
      short: 'S',
      categories: [
        {
          id: 'category-001',
          name: 'Hygene',
          severities: [
            {
              severity: 1,
              options: [
                {
                  id: 'option-001',
                  index: 0,
                  name: 'Option 1',
                  description: 'Description of Option 1',
                  selected: true,
                },
                {
                  id: 'option-002',
                  index: 1,
                  name: 'Option 2',
                  description: 'Description of Option 2',
                  selected: false,
                },
              ],
            },
            {
              severity: 2,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: true,
                },
              ],
            },
            {
              severity: 3,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
            {
              severity: 4,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
          ],
        },
        {
          id: 'category-002',
          name: 'Körperpflege',
          severities: [
            {
              severity: 1,
              options: [
                {
                  id: 'option-001',
                  index: 0,
                  name: 'Option 1',
                  description: 'Description of Option 1',
                  selected: true,
                },
                {
                  id: 'option-002',
                  index: 1,
                  name: 'Option 2',
                  description: 'Description of Option 2',
                  selected: false,
                },
              ],
            },
            {
              severity: 2,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: true,
                },
              ],
            },
            {
              severity: 3,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
            {
              severity: 4,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
          ],
        },
        {
          id: 'category-003',
          name: 'Mobilisation',
          severities: [
            {
              severity: 1,
              options: [
                {
                  id: 'option-001',
                  index: 0,
                  name: 'Option 1',
                  description: 'Description of Option 1',
                  selected: true,
                },
                {
                  id: 'option-002',
                  index: 1,
                  name: 'Option 2',
                  description: 'Description of Option 2',
                  selected: false,
                },
              ],
            },
            {
              severity: 2,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: true,
                },
              ],
            },
            {
              severity: 3,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
            {
              severity: 4,
              options: [
                {
                  id: 'option-003',
                  index: 0,
                  name: 'Option 3',
                  description: 'Description of Option 3',
                  selected: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  result: {
    category1: 'A1',
    category2: 'S2',
    minutes: 120,
  },
}

export const PatientClassification = () => {
  const router = useRouter()
  const id = router.query.id as string
  const patientId = router.query.patientId as string
  const dateString: string = (router.query.date as string | undefined) ?? ''
  const date = parseDateString(dateString)
  const { stations } = useStationsAPI()
  const currentStation = stations.find(value => value.id === id)
  const { patients } = usePatientsAPI(currentStation?.id)
  const currentPatient = patients.find(value => value.id === patientId)
  const [classification] = useState<DailyClassification>(dummyDate)
  const currentPatientIndex = patients.findIndex(value => value.id === currentPatient?.id)
  const nextPatientIndex = currentPatientIndex !== -1 ? (currentPatientIndex + 1) % patients.length : undefined
  const nextPatient = nextPatientIndex !== undefined ? patients[nextPatientIndex] : undefined

  useEffect(noop, [router.query.date]) // reload once the date can be parsed

  return (
    <Page
      header={(
        <Header
          start={(
            <div className="flex flex-row gap-x-2 items-center">
              <button onClick={() => router.push(`/stations/${id}`)}><ArrowLeft/></button>
              <h2 className="text-2xl bold">{currentPatient?.name}</h2>
            </div>
          )}
          end={(
            <div className="flex flex-row gap-x-4 items-center">
              <div className="flex flex-col gap-y-1">
                <a href={`/stations/${id}/${patientId}/${formatDate(subDays(date, 1))}`}
                   className="arrow"><ChevronUp/></a>
                <a href={`/stations/${id}/${patientId}/${formatDate(addDays(date, 1))}`}
                   className="arrow"><ChevronDown/></a>
              </div>
              <a href={`/stations/${id}/${nextPatient?.id}/${formatDate(date)}`}>
                <button className="flex flex-row gap-x-2 items-center">Nächsten <ArrowRight size={20}/>
                </button>
              </a>
            </div>
          )}
        />
      )}
      sideBar={classification && (
        <Sidebar className="max-w-[250px] px-4 py-2 flex flex-col gap-y-6 w-full">
          <div className="flex flex-col gap-y-1 w-full">
            <h2 className="font-bold text-xl">Tagesdaten</h2>
            <div className="flex flex-col gap-y-2">
              <label className="flex flex-row gap-x-1">
                <input type="checkbox" checked={classification.isDayOfAdmission}/>
                Tag der Aufnahme
              </label>
              <label className="flex flex-row gap-x-1">
                <input type="checkbox" checked={classification.isDayOfDischarge}/>
                Tag der Entlassung
              </label>
              <label className="flex flex-row gap-x-1">
                <input type="checkbox" checked={classification.isInIsolation}/>
                In Isolation
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 bg-primary/30 rounded-2xl px-3 py-2">
            <h2 className="font-bold text-xl pb-1">Ergebnis</h2>
            <div className="flex flex-row items-center justify-between">
              Kategorie:
              <strong
                className="bg-white rounded-full px-2 py-1">{classification.result.category1}/{classification.result.category2}</strong>
            </div>
            <div className="flex flex-row items-center justify-between">
              Minutenzahl:
              <strong className="bg-white rounded-full px-2 py-1">{classification.result.minutes}min</strong>
            </div>
          </div>
        </Sidebar>
      )}
    >
      <div className="flex flex-col p-8 gap-y-6 w-full">
        {classification.classificationValues.map(field => (
          <ClassificationFieldCard key={field.id} field={field}/>
        ))}
      </div>
    </Page>
  )
}

export default PatientClassification

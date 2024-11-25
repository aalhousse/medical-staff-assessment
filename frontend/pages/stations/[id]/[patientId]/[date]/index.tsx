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
import { range } from '@/util/range'

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
      name: 'Field Name 1',
      short: 'FN',
      categories: [
        {
          id: 'category-001',
          name: 'Category Name 1',
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
          ],
        },
      ],
    },
    {
      id: 'field-002',
      name: 'Field Name 2',
      short: 'FN',
      categories: [
        {
          id: 'category-002',
          name: 'Category Name 2',
          severities: [
            {
              severity: 1,
              options: [
                {
                  id: 'option-004',
                  index: 0,
                  name: 'Option 4',
                  description: 'Description of Option 4',
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
                            <a href={`/stations/${id}/${parseInt(patientId) + 1 /* TODO change later */}/${formatDate(date)}`}>
                                <button className="flex flex-row gap-x-2 items-center">Nächsten <ArrowRight size={20}/>
                                </button>
                            </a>
                        </div>
                    )}
                />
            )}
            sideBar={classification && (
                <Sidebar className="max-w-[300px] px-4 py-2">
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

                    <div className="box">
                        <p>Something to fill this hole</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <span>Kategorie: <strong>{classification.result.category1}/{classification.result.category1}</strong></span>
                        <span>Minutenzahl: <strong>{classification.result.minutes}min</strong></span>
                    </div>
                </Sidebar>
            )}
        >
            <div className="flex flex-col p-8 gap-y-6 w-full">
                {classification.classificationValues.map(field => {
                  const categoryServerityCount = field.categories.sort((a, b) => a.severities.length - b.severities.length)[0].severities.length
                  return (
                        <div key={field.id} className="p-4 rounded-xl bg-container w-full">
                            <table className="w-full">
                                <thead>
                                <tr>
                                    <th className="text-left bold">Bereich</th>
                                    {range(1, categoryServerityCount + 1).map(value => (
                                        <th key={value} className="text-left bold">{`${field.short}${value}`}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {field.categories.map(category => (
                                    <tr key={category.id}>
                                        <td className="align-top font-semibold">{category.name}</td>
                                        {category.severities.map(optionList => (
                                            <td key={optionList.severity} className="px-2 py-1 align-top">
                                                <div className="flex flex-col gap-y-1 items-start">
                                                    {optionList.options.map(option => (
                                                        <label key={option.id} className="flex flex-row gap-x-2">
                                                            <input type="checkbox" value={option.name}
                                                                   checked={option.selected}/>
                                                            {option.description}
                                                        </label>
                                                    ))}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                  )
                })}
            </div>
        </Page>
  )
}

export default PatientClassification

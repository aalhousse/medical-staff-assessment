import { useRouter } from 'next/router'
import { useState } from 'react'
import { ArrowRight, LucideArrowDown, LucideArrowUp } from 'lucide-react'
import { Header } from '@/layout/Header'
import { Card } from '@/components/Card'
import { Page } from '@/layout/Page'
import { useStationsAPI } from '@/api/stations'
import { usePatientsAPI } from '@/api/patients'
import { dayFormatted } from '@/util/formatDate'

type SortingState = {
  nameAscending: boolean,
  hasClassificationAscending: boolean,
  last: 'name' | 'classification'
}

export const StationPatientList = () => {
  const router = useRouter()
  const id = router.query.id as string
  const [sortingState, setSortingState] = useState<SortingState>({
    hasClassificationAscending: true,
    nameAscending: true,
    last: 'name',
  })
  const { stations } = useStationsAPI()
  const currentStation = stations.find(value => value.id === id)
  const { patients } = usePatientsAPI(currentStation?.id)
  const sortedPatients = patients.sort((a, b) => {
    const nameCompare = a.name.localeCompare(b.name) * (sortingState.nameAscending ? 1 : -1)
    const classificationCompare = (a.hasClassification ? 1 : (b.hasClassification ? -1 : 1)) * (sortingState.hasClassificationAscending ? 1 : -1)

    if (sortingState.last === 'name') {
      if (nameCompare !== 0) {
        return nameCompare
      }
      return classificationCompare
    }
    if (sortingState.last === 'classification') {
      if (classificationCompare !== 0) {
        return classificationCompare
      }
      return nameCompare
    }
    return 1 // no sorting
  })

  return (
    <Page
      header={(<Header start={(<h2 className="text-2xl bold">{currentStation?.name}</h2>)}/>)}
    >
      <div className="flex flex-col gap-10 p-10 content-start max-w-[1200px] w-full">
        <Card>
          <h3 className="text-2xl bold">Patientenliste</h3>
          <table className="w-full border-separate border-spacing-1">
            <thead>
            <tr className="text-left">
              <th>
                <button onClick={() => setSortingState({
                  ...sortingState,
                  nameAscending: !sortingState.nameAscending,
                  last: 'name'
                })}>
                  <div className="flex flex-row gap-x-1 items-center">
                    <span>Name</span>
                    {sortingState.nameAscending ? <LucideArrowDown size={18}/> : <LucideArrowUp size={18}/>}
                  </div>
                </button>
              </th>
              <th>
                <button onClick={() => setSortingState({
                  ...sortingState,
                  hasClassificationAscending: !sortingState.hasClassificationAscending,
                  last: 'classification'
                })}>
                  <div className="flex flex-row gap-x-1 items-center">
                    <span>Letzter Eintrag</span>
                    {sortingState.hasClassificationAscending ? <LucideArrowDown size={18}/> : <LucideArrowUp size={18}/>}
                  </div>
                </button>
              </th>
              <th>Aktionen</th>
            </tr>
            </thead>
            <tbody>
            {sortedPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>
                  <div
                    className={`rounded-xl w-32 text-center px-2 py-1 border-2 ${patient.hasClassification ? 'border-green-500' : 'border-amber-400'}`}>
                    {patient.hasClassification ? 'Heute' : 'Gestern'}
                  </div>
                </td>
                <td>
                  <button
                    className="flex flex-row gap-x-2 rounded px-2 py-1 items-center bg-primary/60 hover:bg-primary/80"
                    onClick={() => router.push(`/stations/${id}/${patient.id}/${dayFormatted()}`)}
                  >
                    <span>Auswählen</span>
                    <ArrowRight size={20}/>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Page>
  )
}

export default StationPatientList

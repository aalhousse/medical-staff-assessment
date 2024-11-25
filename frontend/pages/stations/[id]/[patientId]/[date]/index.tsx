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
  const [classification] = useState<DailyClassification>()

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
                <a href={`/stations/${id}/${patientId}/${formatDate(subDays(date, 1))}`} className="arrow"><ChevronUp/></a>
                <a href={`/stations/${id}/${patientId}/${formatDate(addDays(date, 1))}`} className="arrow"><ChevronDown/></a>
              </div>
              <a href={`/stations/${id}/${parseInt(patientId) + 1 /* TODO change later */}/${formatDate(date)}`}>
                <button className="flex flex-row gap-x-2 items-center">Nächsten <ArrowRight size={20}/></button>
              </a>
            </div>
          )}
        />
      )}
      sideBar={classification && (
        <Sidebar>
          <h2>Tagesdaten</h2>
          <div className="flex flex-col gap-y-2">
            <label>
              <input type="checkbox" checked={classification.isDayOfAdmission}/>
              Tag der Aufnahme
            </label>
            <label>
              <input type="checkbox" checked={classification.isDayOfDischarge}/>
              Tag der Entlassung
            </label>
            <label>
              <input type="checkbox" checked={classification.isInIsolation}/>
              In Isolation
            </label>
          </div>

          <div className="box">
            <p>Something to fill this hole</p>
          </div>

          <div className="result">
            <span>Kategorie: <strong>{classification.result.category1}/{classification.result.category1}</strong></span>
            <span>Minutenzahl: <strong>{classification.result.minutes}min</strong></span>
          </div>
        </Sidebar>
      )}
    >
      <div className="flex flex-col p-10">
      </div>
    </Page>
  )
}

export default PatientClassification

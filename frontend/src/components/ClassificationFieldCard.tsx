import { useState } from 'react'
import { range } from '@/util/range'
import type { CareServiceFieldClassification } from '@/data-models/classification'

export type ClassificationFieldCardProps = {
  field: CareServiceFieldClassification
}

export const ClassificationFieldCard = ({ field }: ClassificationFieldCardProps) => {
  const [onlySelected, setOnlySelected] = useState<boolean>(true)

  const categorySeverityCount = field.categories.sort((a, b) => a.severities.length - b.severities.length)[0].severities.length
  return (
    <div key={field.id} className="py-3 px-6 rounded-xl bg-container w-full">
      <div className="flex flex-row gap-x-2 justify-between pb-3">
        <h3 className="text-xl font-bold">{field.name}</h3>
        <button
          onClick={() => setOnlySelected(!onlySelected)}
          className="px-2 py-1 rounded-lg border-2 border-primary hover:border-primary/80"
        >
          {onlySelected ? 'Alle Anzeigen' : 'Nur zutreffende anzeigen'}
        </button>
      </div>
      <table className="table-auto w-full border-separate border-2 border-black rounded-xl border-spacing-0">
        <thead>
        <tr>
          <th className="text-left bold border-b-2 border-r-2 border-black px-2">Bereich</th>
          {range(1, categorySeverityCount + 1).map(value => (
            <th key={value}
                className="text-left bold px-2 border-b-2 border-r-2 border-black last:border-r-0">{`${field.short}${value}`}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {field.categories.map((category, index) => (
          <tr key={category.id}>
            <td
              className={`align-top font-semibold px-2 border-r-2 last:border-r-0 border-black ${index !== field.categories.length - 1 ? 'border-b-2' : 'border-0'}`}>{category.name}</td>
            {category.severities.map(optionList => {
              const filteredOptionList = optionList.options.filter(option => option.selected)
              const hasSelected = filteredOptionList.length !== 0
              const usedList = onlySelected ? filteredOptionList : optionList.options
              return (
                <td key={optionList.severity}
                    className={`px-2 py-1 align-top border-r-2 last:border-r-0 border-black ${index !== field.categories.length - 1 ? 'border-b-2' : 'border-0'} ${hasSelected ? 'bg-primary/10' : ''}`}>
                  <div className="flex flex-col gap-y-1 items-start w-full">
                    {usedList.length !== 0 ? usedList.map(option => (
                      <label key={option.id} className="flex flex-row gap-x-2">
                        <input type="checkbox" value={option.name} checked={option.selected}/>
                        {option.description}
                      </label>
                    )) : (
                      <label key="empty" className="flex flex-row gap-x-2 w-full items-center">
                        <span>Nichts ausgewählt</span>
                      </label>
                    )}
                  </div>
                </td>
              )
            })}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

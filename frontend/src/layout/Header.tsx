import type { ReactNode } from 'react'

const DefaultStart = () => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <div className="rounded-full min-w-[64px] min-h-[64px] bg-primary"/>
      <span className="font-bold text-3xl">PPBV</span>
    </div>
  )
}

export type HeaderProps = {
  start?: ReactNode,
  end?: ReactNode
}
export const Header = ({
  start = (<DefaultStart/>),
  end
}: HeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-[64px] p-4 box-content bg-container z-1 shadow">
      {start}
      {end}
    </div>
  )
}

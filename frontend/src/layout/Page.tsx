import type { PropsWithChildren, ReactNode } from 'react'

export type PageProps = PropsWithChildren<{
  header?: ReactNode,
  sideBar?: ReactNode,
  className?: string
}>

export const Page = ({
  header,
  sideBar,
  children,
  className,
}: PageProps) => {
  return (
    <div className="flex flex-col w-screen h-screen justify-start items-start">
      {header}
      <div className={`flex flex-row w-full h-full overflow-hidden ${className}`}>
        {sideBar}
        {children}
      </div>
    </div>
  )
}

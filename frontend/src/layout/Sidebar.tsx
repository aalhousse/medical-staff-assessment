import type { PropsWithChildren } from 'react'

export type SidebarProps = PropsWithChildren
export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="flex flex-col gap-y-2 bg-container">
      {children}
    </div>
  )
}

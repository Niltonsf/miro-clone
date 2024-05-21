import React, { memo } from 'react'
import Sidebar from '@/app/(dashboard)/_components/Sidebar'
import OrgSidebar from '@/app/(dashboard)/_components/OrgSidebar'
import Navbar from './_components/Navbar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1 bg-blue">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default memo(DashboardLayout)

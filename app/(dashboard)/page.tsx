'use client'

import React, { memo } from 'react'
import EmptyOrg from './_components/EmptyOrg'
import { useOrganization } from '@clerk/nextjs'
import BoardList from './_components/BoardList'

interface DashboardProps {
  searchParams: {
    search?: string
    favorites?: string
  }
}

const Dashboard = ({ searchParams }: DashboardProps) => {
  const { organization } = useOrganization()

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  )
}

export default memo(Dashboard)

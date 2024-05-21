'use client'

import { useOrganizationList } from '@clerk/nextjs'
import React, { memo } from 'react'
import Item from './Item'

const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  if (!userMemberships.data?.length) return null

  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((mem) => (
        <Item
          key={mem.organization.id}
          id={mem.organization.id}
          imageUrl={mem.organization.imageUrl}
          name={mem.organization.name}
        />
      ))}
    </ul>
  )
}

export default memo(List)

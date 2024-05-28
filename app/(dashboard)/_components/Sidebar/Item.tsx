'use client'

import React, { memo } from 'react'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Hint from '@/components/Hint'

interface ItemProps {
  id: string
  name: string
  imageUrl: string
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  const onClick = () => {
    if (!setActive) return

    setActive({ organization: id })
  }

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          alt={name}
          src={imageUrl}
          onClick={onClick}
          fill
          className={cn(
            'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
            isActive && 'opacity-100',
          )}
        />
      </Hint>
    </div>
  )
}

export default memo(Item)
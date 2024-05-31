'use client'

import { Button } from '@/components/Ui/Button'
import Image from 'next/image'
import React, { memo } from 'react'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { useApiMutation } from '@/hooks/useApiMutation'
import { toast } from 'sonner'

const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    if (!organization) return

    mutate({
      orgId: organization?.id,
      title: 'Untitled',
    })
      .then(() => {
        toast.success('Board created')
      })
      .catch(() => toast.error('Failed to create board'))
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={'/note.svg'} alt="empty" width={110} height={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>

      <div className="mt-6" onClick={onClick}>
        <Button size={'lg'} disabled={pending}>
          Create board
        </Button>
      </div>
    </div>
  )
}

export default memo(EmptyBoards)

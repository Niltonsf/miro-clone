'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import React, { memo } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/Ui/DropdownMenu'
import { Link2, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useApiMutation } from '@/hooks/useApiMutation'
import { api } from '@/convex/_generated/api'
import ConfirmModal from './ConfirmModal'
import { Button } from './Ui/Button'
import { useRenameModal } from '@/store/useRenameModal'

interface ActionsProps {
  children: React.ReactNode
  id: string
  title: string
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
}

const Actions = ({ id, title, children, side, sideOffset }: ActionsProps) => {
  const { onOpen } = useRenameModal()
  const { mutate, pending } = useApiMutation(api.board.remove)

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Failed to copy link'))
  }

  const onDelete = () => {
    mutate({
      id,
    })
      .then(() => toast.success('Board deleted'))
      .catch(() => toast.error('Failed to delete board'))
  }

  const onRename = () => {
    onOpen(id, title)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          className="p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground"
          onClick={onCopyLink}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground"
          onClick={onRename}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          onConfirm={onDelete}
          header={'Delete board'}
          description="This will delete the board and all of its contents."
          disabled={pending}
        >
          <Button
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
            variant={'ghost'}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(Actions)

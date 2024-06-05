'use client'

import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Ui/Dialog'
import { useRenameModal } from '@/store/useRenameModal'
import { Input } from './Ui/Input'
import { Button } from './Ui/Button'
import { useApiMutation } from '@/hooks/useApiMutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

const RenameBoardModal = () => {
  const { mutate, pending } = useApiMutation(api.board.update)
  const { isOpen, onClose, initialValues } = useRenameModal()

  const [title, setTitle] = useState(initialValues.title)

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Board renamed')
        onClose()
      })
      .catch(() => toast.error('Failed to rename board'))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={handleInputChange}
            placeholder="Board title"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RenameBoardModal

'use client'

import React, { memo } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/Ui/AlertDialog'

interface ConfirmModalProps {
  children: React.ReactNode
  onConfirm: () => void
  header: string
  description?: string
  disabled?: boolean
}

const ConfirmModal = ({
  children,
  onConfirm,
  header,
  description,
  disabled,
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={disabled} onClick={handleConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(ConfirmModal)

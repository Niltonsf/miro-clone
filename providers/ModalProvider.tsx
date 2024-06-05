'use client'

import React, { useEffect, useState } from 'react'

import RenameBoardModal from '@/components/RenameBoardModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RenameBoardModal />
    </>
  )
}

export default ModalProvider

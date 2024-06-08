'use client'

import React from 'react'
import Info from './Info'
import Participants from './Participants'
import Toolbar from './Toolbar'
import { useSelf } from '@/liveblocks.config'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info)

  console.log('canvas: ', boardId, info)

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}

export default Canvas
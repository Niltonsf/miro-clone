'use client'

import React from 'react'
import Info from './Info'
import Participants from './Participants'
import Toolbar from './Toolbar'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  console.log('canvas: ', boardId)
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}

export default Canvas

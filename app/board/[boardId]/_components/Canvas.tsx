'use client'

import React, { useState } from 'react'
import Info from './Info'
import Participants from './Participants'
import Toolbar from './Toolbar'
import { CanvasMode, CanvasState } from '@/types/canvas'
import { useHistory, useCanUndo, useCanRedo } from '@/liveblocks.config'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canRedo}
        canRedo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  )
}

export default Canvas

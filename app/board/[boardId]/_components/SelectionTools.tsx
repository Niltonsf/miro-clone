'use client'

import { useSelectionBounds } from '@/hooks/useSelectionBounds'
import { useMutation, useSelf } from '@/liveblocks.config'
import { Button } from '@/components/Ui/Button'
import Hint from '@/components/Ui/Hint'
import { Trash2 } from 'lucide-react'
import { Camera, Color } from '@/types/canvas'
import React, { memo } from 'react'
import ColorPicker from './ColorPicker'
import useDeleteLayers from '@/hooks/useDeleteLayers'

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
}

const SelectionTools = ({ camera, setLastUsedColor }: SelectionToolsProps) => {
  const selection = useSelf((me) => me.presence.selection)

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get('layers')
      setLastUsedColor(fill)

      selection.forEach((id) => {
        liveLayers.get(id)?.set('fill', fill)
      })
    },
    [selection, setLastUsedColor],
  )

  const deleteLayers = useDeleteLayers()

  const selectionBounds = useSelectionBounds()

  if (!selectionBounds) {
    return null
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
  const y = selectionBounds.y + camera.y

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
      style={{
        transform: `translate(
        calc(${x}px - 50%),
        calc(${y - 16}px - 100%)
      )`,
      }}
    >
      <ColorPicker onChange={setFill} />
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Delete">
          <Button variant="board" size={'icon'} onClick={deleteLayers}>
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  )
}

export default memo(SelectionTools)

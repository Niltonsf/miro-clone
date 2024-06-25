'use client'

import { colorToCss } from '@/lib/utils'
import { Color } from '@/types/canvas'
import React from 'react'

interface ColorPickerProps {
  onChange: (color: Color) => void
}

interface ColorButtonProps {
  onClick: (color: Color) => void
  color: Color
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  )
}

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  const colors = [
    {
      r: 243,
      g: 82,
      b: 35,
    },
    {
      r: 255,
      g: 249,
      b: 177,
    },
    {
      r: 68,
      g: 202,
      b: 99,
    },
    {
      r: 0,
      g: 0,
      b: 0,
    },
    {
      r: 252,
      g: 142,
      b: 42,
    },
  ]

  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      {colors.map((color, index) => (
        <ColorButton
          key={index}
          onClick={onChange}
          color={{
            r: color.r,
            g: color.g,
            b: color.b,
          }}
        />
      ))}
    </div>
  )
}

export default ColorPicker

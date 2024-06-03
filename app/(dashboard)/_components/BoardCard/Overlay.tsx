import React, { memo } from 'react'

const Overlay = () => {
  return (
    <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black" />
  )
}

export default memo(Overlay)

'use client'

import { useOthersConnectionIds, useOthersMapped } from '@/liveblocks.config'
import React, { memo } from 'react'
import Cursor from './Cursor'
import { shallow } from '@liveblocks/client'
import Path from './Path'
import { colorToCss } from '@/lib/utils'

const Cursors = () => {
  const ids = useOthersConnectionIds()

  return (
    <>
      {ids.map((connectionId) => {
        return <Cursor key={connectionId} connectionId={connectionId} />
      })}
    </>
  )
}

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow,
  )

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : '#000'}
            />
          )
        }

        return null
      })}
    </>
  )
}

const CursorsPresence = () => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  )
}

CursorsPresence.displayName = 'CursorsPresence'

export default memo(CursorsPresence)

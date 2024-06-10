'use client'

import { useOthersConnectionIds } from '@/liveblocks.config'
import React, { memo } from 'react'
import Cursor from './Cursor'

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

const CursorsPresence = () => {
  return (
    <>
      {/* TODO: Draft pencil */}
      <Cursors />
    </>
  )
}

CursorsPresence.displayName = 'CursorsPresence'

export default memo(CursorsPresence)

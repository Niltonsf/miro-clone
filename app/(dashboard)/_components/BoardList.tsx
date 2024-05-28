'use client'

import React, { memo } from 'react'
import EmptySearch from './EmptySearch'
import EmptyFavorites from './EmptyFavorites'
import EmptyBoards from './EmptyBoards'

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [] // TODO: CHANGE API

  if (!data.length && query.search) {
    return <EmptySearch />
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites />
  }

  if (!data.length) {
    return <EmptyBoards />
  }

  return <div>{JSON.stringify(query)}</div>
}

export default memo(BoardList)

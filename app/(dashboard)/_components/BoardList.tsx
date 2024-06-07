'use client'

import React, { memo } from 'react'
import EmptySearch from './EmptySearch'
import EmptyFavorites from './EmptyFavorites'
import EmptyBoards from './EmptyBoards'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import BoardCard from './BoardCard'
import NewBoardButton from './NewBoardButton'

const SkeletonsAmount = 5

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, ...query })

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? 'Favorite boards' : 'Team boards'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          {Array.from(Array(SkeletonsAmount)).map((_, key) => (
            <BoardCard.Skeleton key={key} />
          ))}
        </div>
      </div>
    )
  }

  if (!data.length && query.search) {
    return <EmptySearch />
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites />
  }

  if (!data.length) {
    return <EmptyBoards />
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? 'Favorite boards' : 'Team boards'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data.map((board, index) => (
          <BoardCard key={index} board={board} />
        ))}
      </div>
    </div>
  )
}

export default memo(BoardList)

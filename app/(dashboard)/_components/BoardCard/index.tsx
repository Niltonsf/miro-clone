'use client'

import { Skeleton } from '@/components/Ui/Skeleton'
import { Board } from '@/types/board'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Overlay from './Overlay'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@clerk/nextjs'
import Footer from './Footer'
import Actions from '@/components/Actions'
import { MoreHorizontal } from 'lucide-react'

interface BoardCardProps {
  board: Board
  isFavorite: boolean
}

const BoardCard = ({ board, isFavorite }: BoardCardProps) => {
  const { userId } = useAuth()

  const authorLabel = userId === board.authorId ? 'You' : board.authorName
  const createdAtLabel = formatDistanceToNow(board._creationTime, {
    addSuffix: true,
  })

  return (
    <Link href={`/board/${board._id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={board.imageUrl}
            alt={board.title}
            fill
            className="object-fit"
          />
          <Overlay />
          <Actions id={board._id} title={board.title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>

        <Footer
          isFavorite={isFavorite}
          board={board}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  )
}

export default BoardCard

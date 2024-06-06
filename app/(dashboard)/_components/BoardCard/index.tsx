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
import { useApiMutation } from '@/hooks/useApiMutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

interface BoardCardProps {
  board: Board
}

const BoardCard = ({ board }: BoardCardProps) => {
  const { userId } = useAuth()
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite,
  )
  const { mutate: onUnFavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unFavorite,
  )

  const authorLabel = userId === board.authorId ? 'You' : board.authorName
  const createdAtLabel = formatDistanceToNow(board._creationTime, {
    addSuffix: true,
  })

  const handleFavorite = () => {
    if (board.isFavorite) {
      onUnFavorite({ id: board._id }).catch(() =>
        toast.error('Failed to unfavorite'),
      )
    } else {
      onFavorite({ id: board._id, orgId: board.orgId }).catch(() =>
        toast.error('Failed to favorite'),
      )
    }
  }

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
          isFavorite={board.isFavorite}
          board={board}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={handleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
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

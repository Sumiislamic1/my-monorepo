import { Metadata } from 'next'
import { Suspense } from 'react'
import ReelFeedClient from '@/components/reel-feed-client'
import PostUploadClient from '@/components/post-upload-client'

export const metadata: Metadata = {
  title: 'Reels | AI Interior',
  description: 'Watch interior design reels from AI and creators',
}

export default function SocialPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Suspense fallback={<div className="h-screen bg-black" />}>
        <ReelFeedClient />
      </Suspense>
      <PostUploadClient />
    </div>
  )
}

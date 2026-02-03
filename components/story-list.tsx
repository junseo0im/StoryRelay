"use client"

import { StoryCard } from "@/components/story-card"
import { sampleStories } from "@/lib/sample-data"

export function StoryList() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">진행 중인 이야기</h2>
        <span className="text-sm text-muted-foreground">{sampleStories.length}개의 이야기</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleStories.map((story) => (
          <StoryCard key={story.id} {...story} />
        ))}
      </div>
    </section>
  )
}

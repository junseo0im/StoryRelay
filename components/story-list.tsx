"use client"

import { useMemo } from "react"
import { StoryCard } from "@/components/story-card"
import { sampleStories } from "@/lib/sample-data"
import { FileX } from "lucide-react"

interface StoryListProps {
  filters: {
    genre: string
    search: string
    sort: string
  }
}

export function StoryList({ filters }: StoryListProps) {
  const filteredAndSortedStories = useMemo(() => {
    let filtered = [...sampleStories]

    // Genre filter
    if (filters.genre !== "all") {
      const genreMap: Record<string, string> = {
        free: "자유",
        fantasy: "판타지",
        sf: "SF",
        romance: "로맨스",
        horror: "공포"
      }
      const genreKorean = genreMap[filters.genre]
      if (genreKorean) {
        filtered = filtered.filter(story => story.genre === genreKorean)
      }
    }

    // Tag/Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase().replace(/#/g, "").trim()
      filtered = filtered.filter(story => {
        // Search in tags
        const matchesTags = story.tags.some(tag => 
          tag.toLowerCase().includes(searchLower)
        )
        // Search in title
        const matchesTitle = story.title.toLowerCase().includes(searchLower)
        // Search in preview
        const matchesPreview = story.preview?.toLowerCase().includes(searchLower)
        
        return matchesTags || matchesTitle || matchesPreview
      })
    }

    // Sort
    switch (filters.sort) {
      case "likes":
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case "deadline":
        // For now, prioritize challenge stories
        filtered.sort((a, b) => {
          if (a.isChallenge && !b.isChallenge) return -1
          if (!a.isChallenge && b.isChallenge) return 1
          return 0
        })
        break
      case "latest":
      default:
        // Keep original order (latest)
        break
    }

    return filtered
  }, [filters])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">진행 중인 이야기</h2>
        <span className="text-sm text-muted-foreground">{filteredAndSortedStories.length}개의 이야기</span>
      </div>
      
      {filteredAndSortedStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedStories.map((story) => (
            <StoryCard key={story.id} {...story} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="p-6 rounded-full bg-muted/50 mb-4">
            <FileX className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">검색 결과가 없습니다</h3>
          <p className="text-muted-foreground text-center max-w-md">
            다른 검색어나 필터를 사용해보세요
          </p>
        </div>
      )}
    </section>
  )
}

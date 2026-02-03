"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { Heart, PenLine, BookOpen } from "lucide-react"
import { GENRE_COLORS, type Story } from "@/lib/types"

type StoryCardProps = Pick<Story, "id" | "title" | "genre" | "tags" | "likes" | "turns" | "preview">

export function StoryCard({ id, title, genre, tags, likes, turns, preview }: StoryCardProps) {
  const { isLoggedIn, setShowLoginModal } = useAuth()

  const handleContinueClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault()
      setShowLoginModal(true)
    }
  }

  return (
    <div className="group bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <Badge className={GENRE_COLORS[genre] || GENRE_COLORS["자유"]}>
            {genre}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Heart className="h-4 w-4" aria-hidden="true" />
            <span aria-label={`좋아요 ${likes}개`}>{likes}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/story/${id}`}>
          <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
        </Link>

        {/* Preview */}
        {preview && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {preview}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>{turns}개의 턴</span>
          </div>
          {isLoggedIn ? (
            <Link href={`/story/${id}`}>
              <Button size="sm" variant="ghost" className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10">
                <PenLine className="h-4 w-4" aria-hidden="true" />
                이야기 이어쓰기
              </Button>
            </Link>
          ) : (
            <Button 
              size="sm" 
              variant="ghost" 
              className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10"
              onClick={handleContinueClick}
            >
              <PenLine className="h-4 w-4" aria-hidden="true" />
              이야기 이어쓰기
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

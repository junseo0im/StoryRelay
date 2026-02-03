"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ParagraphCardProps {
  author: string
  content: string
  turnNumber: number
  createdAt: string
}

export function ParagraphCard({ author, content, turnNumber, createdAt }: ParagraphCardProps) {
  return (
    <div className="group relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-border group-last:hidden" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
        <span className="text-xs font-bold text-primary">{turnNumber}</span>
      </div>

      {/* Content */}
      <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm hover:shadow-md transition-shadow">
        {/* Author info */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {author.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="text-sm font-medium text-card-foreground">{author}</span>
            <span className="text-xs text-muted-foreground ml-2">{createdAt}</span>
          </div>
        </div>

        {/* Paragraph content */}
        <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  )
}

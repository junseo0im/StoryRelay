"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Users, Trophy } from "lucide-react"

interface ChallengeCardProps {
  id: string
  title: string
  description: string
  genre: string
  endDate: Date
  participantCount: number
  storyCount: number
  status: "active" | "upcoming" | "ended"
}

export function ChallengeCard({
  id,
  title,
  description,
  genre,
  endDate,
  participantCount,
  storyCount,
  status,
}: ChallengeCardProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = endDate.getTime() - now.getTime()

      if (diff <= 0) {
        return "종료됨"
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) {
        return `${days}일 ${hours}시간 남음`
      }
      return `${hours}시간 ${minutes}분 남음`
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 60000)

    return () => clearInterval(timer)
  }, [endDate])

  const statusConfig = {
    active: { label: "진행 중", className: "bg-primary/10 text-primary" },
    upcoming: { label: "예정됨", className: "bg-secondary/50 text-secondary-foreground" },
    ended: { label: "종료됨", className: "bg-muted text-muted-foreground" },
  }

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Status Banner */}
      {status === "active" && (
        <div className="bg-gradient-to-r from-primary to-secondary h-1" />
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <Badge className={statusConfig[status].className}>
              {statusConfig[status].label}
            </Badge>
          </div>
          <Badge variant="outline">{genre}</Badge>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{timeLeft}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{participantCount}명 참여</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>{storyCount}개 스토리</span>
          </div>
        </div>

        {/* Action */}
        <Link href={`/challenges/${id}`}>
          <Button className="w-full" disabled={status === "ended"}>
            {status === "active" ? "참여 스토리 보기" : status === "upcoming" ? "자세히 보기" : "결과 보기"}
          </Button>
        </Link>
      </div>
    </div>
  )
}

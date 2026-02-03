"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const genres = [
  { value: "all", label: "전체" },
  { value: "free", label: "자유" },
  { value: "fantasy", label: "판타지" },
  { value: "sf", label: "SF" },
  { value: "romance", label: "로맨스" },
  { value: "horror", label: "공포" },
]

const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "likes", label: "좋아요순" },
  { value: "deadline", label: "마감 임박순" },
]

interface FilterBarProps {
  onFilterChange?: (filters: { genre: string; search: string; sort: string }) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("latest")

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre)
    onFilterChange?.({ genre, search, sort })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange?.({ genre: selectedGenre, search: value, sort })
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    onFilterChange?.({ genre: selectedGenre, search, sort: value })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-4 md:p-6">
        {/* Genre Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((genre) => (
            <Button
              key={genre.value}
              variant={selectedGenre === genre.value ? "default" : "ghost"}
              size="sm"
              onClick={() => handleGenreChange(genre.value)}
              className={cn(
                "rounded-full",
                selectedGenre === genre.value
                  ? ""
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {genre.label}
            </Button>
          ))}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="태그로 검색... (예: #힐링, #반전)"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[140px] bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  )
}

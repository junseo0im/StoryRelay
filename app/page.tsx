import { HeroSection } from "@/components/hero-section"
import { ChallengeBanner } from "@/components/challenge-banner"
import { FilterBar } from "@/components/filter-bar"
import { StoryList } from "@/components/story-list"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ChallengeBanner />
      <FilterBar />
      <StoryList />
    </div>
  )
}

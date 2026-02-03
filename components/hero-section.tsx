"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { PenLine, Sparkles } from "lucide-react"

export function HeroSection() {
  const { isLoggedIn, setShowLoginModal } = useAuth()

  const handleCTAClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            협업형 스토리텔링 플랫폼
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
            함께 이야기를
            <br />
            <span className="text-primary">완성해보세요</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto text-pretty">
            여러 작가들과 함께 한 문단씩 이어가며 세상에 하나뿐인 이야기를 만들어보세요.
            당신의 상상력이 새로운 이야기의 시작이 됩니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isLoggedIn ? (
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2">
                <PenLine className="h-5 w-5" />
                이야기 이어쓰기
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2" onClick={handleCTAClick}>
                <PenLine className="h-5 w-5" />
                글쓰기 시작하기
              </Button>
            )}
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 bg-transparent">
              둘러보기
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            { value: "1,234", label: "진행 중인 이야기" },
            { value: "5,678", label: "참여 작가" },
            { value: "23,456", label: "작성된 문단" },
            { value: "891", label: "완성된 이야기" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50">
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import Hero from "@/components/hero"
import FeaturedPredictions from "@/components/featured-predictions"
import StatsOverview from "@/components/stats-overview"
import UpcomingGames from "@/components/upcoming-games"
import TrendingInsights from "@/components/trending-insights"
import CallToAction from "@/components/call-to-action"
import { useMLBData } from "@/hooks/use-mlb-data"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const { data, isLoading, error } = useMLBData("all")

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          {isLoading ? (
            <>
              <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
              <Skeleton className="h-[600px] w-full rounded-lg" />
            </>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading data. Please try again later.</p>
            </div>
          ) : (
            <>
              <FeaturedPredictions games={data?.games} />
              <StatsOverview />
            </>
          )}
        </div>
        <div className="space-y-8">
          {isLoading ? (
            <>
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading data. Please try again later.</p>
            </div>
          ) : (
            <>
              <UpcomingGames games={data?.games} />
              <TrendingInsights />
            </>
          )}
        </div>
      </div>
      <CallToAction />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useMLBData } from "@/hooks/use-mlb-data"
import PredictionCard from "@/components/prediction-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PredictionsPage() {
  const { data, isLoading, error } = useMLBData("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter predictions based on search query
  const filteredGames = data?.games?.filter((game: any) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      game.home_team.toLowerCase().includes(searchLower) ||
      game.away_team.toLowerCase().includes(searchLower) ||
      game.predictions.some((pred: any) => pred.prediction.toLowerCase().includes(searchLower))
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MLB Predictions</h1>
          <p className="text-muted-foreground mt-1">Data-driven insights to help you make informed decisions</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search predictions..."
            className="pl-8 w-full md:w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading predictions. Please try again later.</p>
            </div>
          ) : filteredGames?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game: any) => (
                <PredictionCard key={game.game_id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No predictions found for your search criteria.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="tomorrow" className="mt-6">
          <div className="text-center py-8">
            <p>Predictions for tomorrow will be available soon.</p>
          </div>
        </TabsContent>
        <TabsContent value="week" className="mt-6">
          <div className="text-center py-8">
            <p>Weekly predictions are available for premium subscribers.</p>
            <Button className="mt-4">Upgrade to Premium</Button>
          </div>
        </TabsContent>
        <TabsContent value="custom" className="mt-6">
          <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Select Custom Date Range</h3>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input type="date" className="w-full md:w-auto" />
              <span className="self-center">to</span>
              <Input type="date" className="w-full md:w-auto" />
            </div>
            <Button>Apply Filter</Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}

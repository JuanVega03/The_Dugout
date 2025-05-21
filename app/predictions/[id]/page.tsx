"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Share2 } from "lucide-react"
import { useMLBData } from "@/hooks/use-mlb-data"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { getTeamLogo } from "@/utils/team-utils"

export default function PredictionDetailPage() {
  const params = useParams()
  const gameId = params.id as string
  const { data, isLoading, error } = useMLBData("all")
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()
  const { user } = useAuth()
  const { toast } = useToast()

  const game = data?.games?.find((g: any) => g.game_id === gameId)
  const matchup = game?.matchup

  const handleSavePrediction = async (prediction: any) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save predictions",
        variant: "destructive",
      })
      return
    }

    if (!game || !prediction) return

    try {
      setIsSaving(true)

      const predictionData = {
        user_id: user.id,
        prediction_id: prediction.id,
        teams: `${game.home_team} vs ${game.away_team}`,
        prediction: prediction.prediction,
        confidence: `${prediction.confidence}%`,
        date: new Date().toISOString(),
      }

      const { error } = await supabase.from("saved_predictions").insert(predictionData)

      if (error) throw error

      toast({
        title: "Success",
        description: "Prediction saved successfully",
      })
    } catch (error) {
      console.error("Error saving prediction:", error)
      toast({
        title: "Error",
        description: "Failed to save prediction",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Prediction Not Found</h2>
          <p className="text-muted-foreground">
            The prediction you're looking for doesn't exist or there was an error loading it.
          </p>
          <Button className="mt-6" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {game.home_team} vs {game.away_team}
        </h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{game.start_time}</Badge>
          <Badge variant="outline">{game.status}</Badge>
          {matchup && <Badge variant="outline">{matchup.venue}</Badge>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Game Predictions</CardTitle>
              <CardDescription>Our AI-powered predictions for this matchup</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={game.predictions[0]?.type || "spread"} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="spread">Spread</TabsTrigger>
                  <TabsTrigger value="moneyline">Moneyline</TabsTrigger>
                  <TabsTrigger value="total">Total</TabsTrigger>
                </TabsList>

                {game.predictions.map((prediction: any) => (
                  <TabsContent key={prediction.id} value={prediction.type} className="mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">{prediction.prediction}</h3>
                        <p className="text-muted-foreground">Confidence: {prediction.confidence}%</p>
                      </div>
                      <Badge
                        className={
                          prediction.confidence > 80
                            ? "bg-green-500/10 text-green-500"
                            : prediction.confidence > 70
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-orange-500/10 text-orange-500"
                        }
                      >
                        {prediction.confidence > 80 ? "Strong" : prediction.confidence > 70 ? "Moderate" : "Fair"}{" "}
                        Confidence
                      </Badge>
                    </div>

                    <div className="rounded-lg border p-4 space-y-3">
                      <h4 className="font-medium">Analysis:</h4>
                      <ul className="space-y-2">
                        {prediction.analysis.map((point: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 text-primary">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSavePrediction(prediction)}
                        disabled={isSaving}
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Prediction"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {matchup && (
            <Card>
              <CardHeader>
                <CardTitle>Game Details</CardTitle>
                <CardDescription>Venue, weather, and other game information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Venue</h3>
                      <p>{matchup.venue}</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Weather</h3>
                      <p>{matchup.weather}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-3">Starting Pitchers</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{matchup.home_team.name}</p>
                        <p>
                          {matchup.pitchers.home.name} ({matchup.pitchers.home.hand})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {matchup.pitchers.home.wins}-{matchup.pitchers.home.losses}, {matchup.pitchers.home.era} ERA,{" "}
                          {matchup.pitchers.home.strikeouts} K
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">{matchup.away_team.name}</p>
                        <p>
                          {matchup.pitchers.away.name} ({matchup.pitchers.away.hand})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {matchup.pitchers.away.wins}-{matchup.pitchers.away.losses}, {matchup.pitchers.away.era} ERA,{" "}
                          {matchup.pitchers.away.strikeouts} K
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {matchup && (
            <Card>
              <CardHeader>
                <CardTitle>Team Comparison</CardTitle>
                <CardDescription>Head-to-head statistical comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <img
                        src={getTeamLogo(matchup.home_team.name) || "/placeholder.svg"}
                        alt={matchup.home_team.name}
                        className="h-16 w-16 mx-auto mb-2 object-contain"
                      />
                      <h3 className="font-medium">{matchup.home_team.name}</h3>
                      <p className="text-sm text-muted-foreground">{matchup.home_team.record}</p>
                    </div>
                    <div className="text-2xl font-bold">vs</div>
                    <div className="text-center">
                      <img
                        src={getTeamLogo(matchup.away_team.name) || "/placeholder.svg"}
                        alt={matchup.away_team.name}
                        className="h-16 w-16 mx-auto mb-2 object-contain"
                      />
                      <h3 className="font-medium">{matchup.away_team.name}</h3>
                      <p className="text-sm text-muted-foreground">{matchup.away_team.record}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right">{matchup.home_team.stats.batting_avg}</div>
                      <div className="text-center text-sm font-medium">Batting Avg</div>
                      <div>{matchup.away_team.stats.batting_avg}</div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right">{matchup.home_team.stats.runs_per_game}</div>
                      <div className="text-center text-sm font-medium">Runs/Game</div>
                      <div>{matchup.away_team.stats.runs_per_game}</div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right">{matchup.home_team.stats.home_runs}</div>
                      <div className="text-center text-sm font-medium">Home Runs</div>
                      <div>{matchup.away_team.stats.home_runs}</div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right">{matchup.home_team.stats.era}</div>
                      <div className="text-center text-sm font-medium">ERA</div>
                      <div>{matchup.away_team.stats.era}</div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right">{matchup.home_team.stats.whip}</div>
                      <div className="text-center text-sm font-medium">WHIP</div>
                      <div>{matchup.away_team.stats.whip}</div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right">{matchup.home_team.stats.last_10}</div>
                      <div className="text-center text-sm font-medium">Last 10</div>
                      <div>{matchup.away_team.stats.last_10}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Betting Trends</CardTitle>
              <CardDescription>Recent betting patterns for this matchup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium mb-1">Public Betting</h4>
                  <div className="flex justify-between items-center">
                    <span>{game.home_team}</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span>{game.away_team}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">65% of bets on {game.home_team}</p>
                </div>

                <div className="rounded-lg border p-3">
                  <h4 className="font-medium mb-1">Line Movement</h4>
                  <p className="text-sm">Opening: {game.home_team} -1.5</p>
                  <p className="text-sm">Current: {game.home_team} -2.0</p>
                  <p className="text-xs text-muted-foreground mt-2">Line moved 0.5 points toward {game.home_team}</p>
                </div>

                <div className="rounded-lg border p-3">
                  <h4 className="font-medium mb-1">Historical Matchup</h4>
                  <p className="text-sm">
                    {game.home_team} is 7-3 in last 10 vs {game.away_team}
                  </p>
                  <p className="text-sm">Over is 6-4 in last 10 matchups</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

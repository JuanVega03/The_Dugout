"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { getTeamLogo } from "@/utils/team-utils"

interface PredictionCardProps {
  game: any
}

export default function PredictionCard({ game }: PredictionCardProps) {
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()
  const { user } = useAuth()
  const { toast } = useToast()

  // Get the highest confidence prediction
  const topPrediction =
    game.predictions?.length > 0
      ? game.predictions.reduce((prev: any, current: any) => (prev.confidence > current.confidence ? prev : current))
      : null

  const handleSavePrediction = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save predictions",
        variant: "destructive",
      })
      return
    }

    if (!topPrediction) return

    try {
      setIsSaving(true)

      const predictionData = {
        user_id: user.id,
        prediction_id: topPrediction.id,
        teams: `${game.home_team} vs ${game.away_team}`,
        prediction: topPrediction.prediction,
        confidence: `${topPrediction.confidence}%`,
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

  if (!game || !topPrediction) {
    return null
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <img
            src={getTeamLogo(game.home_team) || "/placeholder.svg"}
            alt={game.home_team}
            className="h-10 w-10 rounded-full object-contain"
          />
          <span className="font-medium">vs</span>
          <img
            src={getTeamLogo(game.away_team) || "/placeholder.svg"}
            alt={game.away_team}
            className="h-10 w-10 rounded-full object-contain"
          />
        </div>
        <Badge variant="outline">{game.start_time}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">
          {game.home_team} vs {game.away_team}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-medium">{topPrediction.prediction}</div>
          <Badge
            variant="secondary"
            className={
              topPrediction.confidence > 80
                ? "bg-green-500/10 text-green-500"
                : topPrediction.confidence > 70
                  ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-orange-500/10 text-orange-500"
            }
          >
            {topPrediction.confidence}%
          </Badge>
        </div>
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Key Insights:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {topPrediction.analysis.slice(0, 2).map((insight: string, i: number) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="ghost" size="sm" onClick={handleSavePrediction} disabled={isSaving}>
          <Bookmark className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
        <Link href={`/predictions/${game.game_id}`}>
          <Button size="sm">View Analysis</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

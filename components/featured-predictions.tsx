import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import { getTeamLogo } from "@/utils/team-utils"

interface FeaturedPredictionsProps {
  games?: any[]
}

export default function FeaturedPredictions({ games = [] }: FeaturedPredictionsProps) {
  // Get top 4 games with highest confidence predictions
  const featuredGames = games
    ?.filter((game) => game.predictions && game.predictions.length > 0)
    .map((game) => {
      // Find the prediction with highest confidence
      const topPrediction = game.predictions.reduce((prev: any, current: any) =>
        prev.confidence > current.confidence ? prev : current,
      )
      return { ...game, topPrediction }
    })
    .sort((a, b) => b.topPrediction.confidence - a.topPrediction.confidence)
    .slice(0, 4)

  if (!featuredGames || featuredGames.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Featured Predictions</CardTitle>
            <CardDescription>Today's top MLB betting opportunities</CardDescription>
          </div>
          <Link href="/predictions">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p>No predictions available at the moment.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Featured Predictions</CardTitle>
          <CardDescription>Today's top MLB betting opportunities</CardDescription>
        </div>
        <Link href="/predictions">
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredGames.map((game) => (
            <Link href={`/predictions/${game.game_id}`} key={game.game_id}>
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getTeamLogo(game.home_team) || "/placeholder.svg"}
                        alt={game.home_team}
                        className="h-8 w-8 rounded-full object-contain"
                      />
                      <span className="font-medium">vs</span>
                      <img
                        src={getTeamLogo(game.away_team) || "/placeholder.svg"}
                        alt={game.away_team}
                        className="h-8 w-8 rounded-full object-contain"
                      />
                    </div>
                    <Badge variant="outline">{game.start_time}</Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">
                      {game.home_team} vs {game.away_team}
                    </h4>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>{game.topPrediction.prediction}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          game.topPrediction.confidence > 80
                            ? "bg-green-500/10 text-green-500"
                            : game.topPrediction.confidence > 70
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-orange-500/10 text-orange-500"
                        }
                      >
                        {game.topPrediction.confidence}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

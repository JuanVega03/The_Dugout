import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTeamLogo } from "@/utils/team-utils"

interface UpcomingGamesProps {
  games?: any[]
}

export default function UpcomingGames({ games = [] }: UpcomingGamesProps) {
  // Sort games by start time
  const upcomingGames = [...games]
    .sort((a, b) => {
      const timeA = a.start_time.split(":").map(Number)
      const timeB = b.start_time.split(":").map(Number)

      // Compare hours
      if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0]
      // Compare minutes
      return timeA[1] - timeB[1]
    })
    .slice(0, 5)

  if (!upcomingGames || upcomingGames.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Games</CardTitle>
          <CardDescription>Schedule of upcoming MLB matchups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p>No upcoming games available at the moment.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Games</CardTitle>
        <CardDescription>Schedule of upcoming MLB matchups</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingGames.map((game) => (
            <Link href={`/games/${game.game_id}`} key={game.game_id}>
              <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src={getTeamLogo(game.home_team) || "/placeholder.svg"}
                      alt={game.home_team}
                      className="h-8 w-8 rounded-full object-contain"
                    />
                    <span className="text-xs font-medium">{game.home_team}</span>
                  </div>
                  <span className="text-sm font-medium">vs</span>
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src={getTeamLogo(game.away_team) || "/placeholder.svg"}
                      alt={game.away_team}
                      className="h-8 w-8 rounded-full object-contain"
                    />
                    <span className="text-xs font-medium">{game.away_team}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    Today
                  </Badge>
                  <div className="text-xs text-muted-foreground">{game.start_time}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

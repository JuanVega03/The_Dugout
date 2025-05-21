import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TeamStatsTable from "@/components/team-stats-table"
import PlayerStatsTable from "@/components/player-stats-table"
import StatsChart from "@/components/stats-chart"

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MLB Statistics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive stats for teams and players</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select defaultValue="2023">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023 Season</SelectItem>
              <SelectItem value="2022">2022 Season</SelectItem>
              <SelectItem value="2021">2021 Season</SelectItem>
              <SelectItem value="2020">2020 Season</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
        </TabsList>
        <TabsContent value="teams" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Overview</CardTitle>
              <CardDescription>Compare key performance metrics across all MLB teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <StatsChart type="team" />
              </div>
            </CardContent>
          </Card>

          <TeamStatsTable />
        </TabsContent>
        <TabsContent value="players" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Player Performance</CardTitle>
              <CardDescription>Visualizing the league's top performers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <StatsChart type="player" />
              </div>
            </CardContent>
          </Card>

          <PlayerStatsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

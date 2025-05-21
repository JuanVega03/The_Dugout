"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const battingData = [
  { name: "Judge", team: "NYY", avg: 0.312, hr: 42, rbi: 98 },
  { name: "Ohtani", team: "LAD", avg: 0.302, hr: 38, rbi: 92 },
  { name: "Soto", team: "NYY", avg: 0.298, hr: 35, rbi: 89 },
  { name: "Betts", team: "LAD", avg: 0.295, hr: 28, rbi: 82 },
  { name: "Guerrero", team: "TOR", avg: 0.29, hr: 32, rbi: 88 },
]

const pitchingData = [
  { name: "Cole", team: "NYY", era: 2.63, wins: 15, so: 210 },
  { name: "Burnes", team: "BAL", era: 2.75, wins: 14, so: 198 },
  { name: "Alcantara", team: "MIA", era: 2.89, wins: 12, so: 187 },
  { name: "Snell", team: "SF", era: 2.92, wins: 13, so: 220 },
  { name: "Strider", team: "ATL", era: 3.05, wins: 16, so: 235 },
]

export default function StatsOverview() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Stats Overview</CardTitle>
        <CardDescription>Key MLB statistics and league leaders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="batting">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="batting">Batting Leaders</TabsTrigger>
            <TabsTrigger value="pitching">Pitching Leaders</TabsTrigger>
          </TabsList>
          <TabsContent value="batting" className="space-y-4">
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Home Runs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      hr: {
                        label: "Home Runs",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={battingData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="hr" fill="var(--color-hr)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Batting Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      avg: {
                        label: "Batting Average",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={battingData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0.28, 0.32]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="avg" stroke="var(--color-avg)" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-4">Player</div>
                <div className="col-span-2 text-center">Team</div>
                <div className="col-span-2 text-center">AVG</div>
                <div className="col-span-2 text-center">HR</div>
                <div className="col-span-2 text-center">RBI</div>
              </div>
              {battingData.map((player, i) => (
                <div key={i} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-muted/50">
                  <div className="col-span-4 font-medium">{player.name}</div>
                  <div className="col-span-2 text-center">{player.team}</div>
                  <div className="col-span-2 text-center">{player.avg}</div>
                  <div className="col-span-2 text-center">{player.hr}</div>
                  <div className="col-span-2 text-center">{player.rbi}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pitching" className="space-y-4">
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">ERA</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      era: {
                        label: "ERA",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pitchingData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[2.5, 3.2]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="era" fill="var(--color-era)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Strikeouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      so: {
                        label: "Strikeouts",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pitchingData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[180, 240]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="so" stroke="var(--color-so)" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-4">Player</div>
                <div className="col-span-2 text-center">Team</div>
                <div className="col-span-2 text-center">ERA</div>
                <div className="col-span-2 text-center">W</div>
                <div className="col-span-2 text-center">SO</div>
              </div>
              {pitchingData.map((player, i) => (
                <div key={i} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-muted/50">
                  <div className="col-span-4 font-medium">{player.name}</div>
                  <div className="col-span-2 text-center">{player.team}</div>
                  <div className="col-span-2 text-center">{player.era}</div>
                  <div className="col-span-2 text-center">{player.wins}</div>
                  <div className="col-span-2 text-center">{player.so}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bookmark, Share2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTeamLogo } from "@/utils/team-utils"

export default function YankeesRedSoxPredictionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Yankees vs Red Sox</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">7:05 PM ET</Badge>
          <Badge variant="outline">Scheduled</Badge>
          <Badge variant="outline">Yankee Stadium</Badge>
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
              <Tabs defaultValue="spread" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="spread">Spread</TabsTrigger>
                  <TabsTrigger value="moneyline">Moneyline</TabsTrigger>
                  <TabsTrigger value="total">Total</TabsTrigger>
                </TabsList>

                <TabsContent value="spread" className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">Yankees -1.5</h3>
                      <p className="text-muted-foreground">Confidence: 85%</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500">Strong Confidence</Badge>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h4 className="font-medium">Analysis:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Yankees' starting pitcher has a 1.87 ERA in last 5 starts vs Boston</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Yankees are 7-3 against the spread in their last 10 home games</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Red Sox bullpen has struggled with a 4.56 ERA in the last week</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Yankees have won by 2+ runs in 6 of their last 8 games against Boston</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Prediction
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="moneyline" className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">Yankees ML</h3>
                      <p className="text-muted-foreground">Confidence: 78%</p>
                    </div>
                    <Badge className="bg-yellow-500/10 text-yellow-500">Moderate Confidence</Badge>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h4 className="font-medium">Analysis:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Yankees have won 6 of their last 8 home games against Boston</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Yankees' offense is averaging 5.3 runs per game in their last 10 games</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Red Sox are 3-7 in their last 10 road games</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Yankees have a significant advantage in starting pitching for this matchup</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Prediction
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="total" className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">Over 8.5 runs</h3>
                      <p className="text-muted-foreground">Confidence: 72%</p>
                    </div>
                    <Badge className="bg-yellow-500/10 text-yellow-500">Moderate Confidence</Badge>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h4 className="font-medium">Analysis:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>The over has hit in 7 of the last 10 meetings between these teams</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Both teams rank in the top 10 in runs scored per game</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Wind is blowing out to right field at 12 mph</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>Red Sox starting pitcher has allowed 4+ runs in 3 of his last 4 starts</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Prediction
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

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
                    <p>Yankee Stadium</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Weather</h3>
                    <p>Clear, 72°F, Wind 12mph out to RF</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Starting Pitchers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Yankees</p>
                      <p>Gerrit Cole (R)</p>
                      <p className="text-sm text-muted-foreground">5-0, 2.75 ERA, 58 K</p>
                    </div>
                    <div>
                      <p className="font-medium">Red Sox</p>
                      <p>James Paxton (L)</p>
                      <p className="text-sm text-muted-foreground">3-1, 3.65 ERA, 42 K</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
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
                      src={getTeamLogo("Yankees") || "/placeholder.svg"}
                      alt="Yankees"
                      className="h-16 w-16 mx-auto mb-2 object-contain"
                    />
                    <h3 className="font-medium">Yankees</h3>
                    <p className="text-sm text-muted-foreground">26-16</p>
                  </div>
                  <div className="text-2xl font-bold">vs</div>
                  <div className="text-center">
                    <img
                      src={getTeamLogo("Red Sox") || "/placeholder.svg"}
                      alt="Red Sox"
                      className="h-16 w-16 mx-auto mb-2 object-contain"
                    />
                    <h3 className="font-medium">Red Sox</h3>
                    <p className="text-sm text-muted-foreground">22-20</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="grid grid-cols-3 items-center">
                    <div className="text-right">0.255</div>
                    <div className="text-center text-sm font-medium">Batting Avg</div>
                    <div>0.262</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="text-right">5.2</div>
                    <div className="text-center text-sm font-medium">Runs/Game</div>
                    <div>4.8</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="text-right">62</div>
                    <div className="text-center text-sm font-medium">Home Runs</div>
                    <div>48</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="text-right">3.45</div>
                    <div className="text-center text-sm font-medium">ERA</div>
                    <div>4.12</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="text-right">1.18</div>
                    <div className="text-center text-sm font-medium">WHIP</div>
                    <div>1.32</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div className="text-right">7-3</div>
                    <div className="text-center text-sm font-medium">Last 10</div>
                    <div>5-5</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    <span>Yankees</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span>Red Sox</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">65% of bets on Yankees</p>
                </div>

                <div className="rounded-lg border p-3">
                  <h4 className="font-medium mb-1">Line Movement</h4>
                  <p className="text-sm">Opening: Yankees -1.5</p>
                  <p className="text-sm">Current: Yankees -2.0</p>
                  <p className="text-xs text-muted-foreground mt-2">Line moved 0.5 points toward Yankees</p>
                </div>

                <div className="rounded-lg border p-3">
                  <h4 className="font-medium mb-1">Historical Matchup</h4>
                  <p className="text-sm">Yankees are 7-3 in last 10 vs Red Sox</p>
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

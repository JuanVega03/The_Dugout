import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon as ArrowTrendingUp, Calendar, TrendingUp, Users } from "lucide-react"

export default function TrendingInsights() {
  const insights = [
    {
      id: 1,
      title: "Yankees' bullpen showing signs of fatigue",
      category: "Team Analysis",
      date: "2 hours ago",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "Ohtani on pace for historic 50/30 season",
      category: "Player Trends",
      date: "5 hours ago",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: 3,
      title: "Weather impact on tonight's games",
      category: "Game Conditions",
      date: "8 hours ago",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 4,
      title: "Betting line movements for today's slate",
      category: "Betting Trends",
      date: "10 hours ago",
      icon: <ArrowTrendingUp className="h-4 w-4" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Insights</CardTitle>
        <CardDescription>Latest analysis and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <Link href={`/insights/${insight.id}`} key={insight.id}>
              <div className="flex gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  {insight.icon}
                </div>
                <div className="space-y-1">
                  <p className="font-medium leading-none">{insight.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {insight.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{insight.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

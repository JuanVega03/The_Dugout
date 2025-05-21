import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function InsightPage({ params }: { params: { id: string } }) {
  const insights = [
    {
      id: "1",
      title: "Yankees' bullpen showing signs of fatigue",
      category: "Team Analysis",
      date: "May 15, 2023",
      content: `
        <p>The Yankees' bullpen has been a strength all season, but recent performances suggest fatigue may be setting in. Over the last 10 games, the bullpen ERA has risen from 2.85 to 3.45, with key relievers showing decreased velocity and command issues.</p>
        <p>Clay Holmes, in particular, has seen his sinker velocity drop by 1.2 mph in his last three appearances, while his walk rate has nearly doubled compared to his season average. Manager Aaron Boone acknowledged the concern in his post-game press conference yesterday: "We're monitoring workloads closely. We might need to give some guys extra rest in the coming weeks."</p>
        <p>With a challenging schedule ahead, including series against the Red Sox and Astros, managing bullpen fatigue will be crucial for the Yankees' success in the coming weeks.</p>
      `,
    },
    {
      id: "2",
      title: "Ohtani on pace for historic 50/30 season",
      category: "Player Trends",
      date: "May 15, 2023",
      content: `
        <p>Shohei Ohtani continues to redefine what's possible in baseball. Through 45 games, he's on pace for a historic 50 home run, 30 stolen base season, a feat accomplished only twice in MLB history (by Barry Bonds in 2001 and Brady Anderson in 1996).</p>
        <p>Ohtani's power-speed combination has been on full display this season. His average exit velocity of 93.2 mph ranks in the top 5% of the league, while his sprint speed of 28.9 ft/sec places him in the top 15% among all players.</p>
        <p>What makes Ohtani's performance even more remarkable is his continued excellence on the mound, where he's maintained a 2.82 ERA with 11.3 K/9 across 8 starts. If he maintains this pace, he could become the first player in MLB history to hit 50+ home runs while also qualifying for the ERA title as a pitcher.</p>
      `,
    },
    {
      id: "3",
      title: "Weather impact on tonight's games",
      category: "Game Conditions",
      date: "May 15, 2023",
      content: `
        <p>Weather conditions are expected to play a significant role in several of tonight's MLB matchups. Here's a breakdown of the key weather factors to consider:</p>
        <p><strong>Yankees vs. Red Sox (Yankee Stadium):</strong> Clear skies with temperatures around 72°F. Wind blowing out to right field at 12 mph could boost offensive production, particularly for left-handed hitters. The ball typically carries well at Yankee Stadium under these conditions.</p>
        <p><strong>Cubs vs. Cardinals (Wrigley Field):</strong> Partly cloudy with temperatures around 65°F. The forecast shows winds blowing in from right field at 12 mph, which could suppress power to right field. This may favor pitchers, particularly those who induce fly balls to right.</p>
        <p><strong>Dodgers vs. Giants (Dodger Stadium):</strong> Clear evening with temperatures around 68°F. Minimal wind impact expected. Standard neutral conditions should prevail.</p>
        <p>Weather conditions can significantly impact betting totals and player prop markets, so consider these factors when placing wagers on tonight's games.</p>
      `,
    },
    {
      id: "4",
      title: "Betting line movements for today's slate",
      category: "Betting Trends",
      date: "May 15, 2023",
      content: `
        <p>Several notable line movements have occurred for today's MLB games, potentially signaling sharp money action:</p>
        <p><strong>Yankees vs. Red Sox:</strong> The Yankees opened as -150 favorites but have moved to -175. The total has also shifted from 8.5 to 9, suggesting professional bettors are expecting more runs than initially projected.</p>
        <p><strong>Dodgers vs. Giants:</strong> Despite Clayton Kershaw starting for the Dodgers, we've seen the line move from Dodgers -180 to -165, indicating some respected money on the Giants. This could be related to Kershaw's historical struggles against the current Giants lineup (collective .285 batting average).</p>
        <p><strong>Astros vs. Rangers:</strong> The most significant move of the day has been on the total in this matchup, dropping from 8.5 to 7.5. With two strong pitchers on the mound and weather conditions favoring pitchers, sharp bettors appear to be expecting a lower-scoring affair.</p>
        <p>Line movements often provide valuable insights into where professional bettors are placing their money. These shifts suggest sharp action on the Yankees, Giants, and the Under in the Astros-Rangers game.</p>
      `,
    },
  ]

  const insight = insights.find((i) => i.id === params.id)

  if (!insight) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Insight not found</h1>
          <p className="mt-2 text-muted-foreground">The insight you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="mt-4">Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge>{insight.category}</Badge>
            <span className="text-sm text-muted-foreground">{insight.date}</span>
          </div>
          <CardTitle className="text-2xl md:text-3xl">{insight.title}</CardTitle>
          <CardDescription>MLB Analysis and Insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: insight.content }} />
        </CardContent>
      </Card>
    </div>
  )
}

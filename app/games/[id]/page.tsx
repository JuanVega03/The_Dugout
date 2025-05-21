import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

export default function GamePage({ params }: { params: { id: string } }) {
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
            <Badge>Upcoming Game</Badge>
            <span className="text-sm text-muted-foreground">Today, 7:05 PM ET</span>
          </div>
          <CardTitle className="text-2xl md:text-3xl">Yankees vs Red Sox</CardTitle>
          <CardDescription>Game Details and Analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <p>
              This game information is currently being updated. Please check back later for detailed game analysis and
              predictions.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/predictions">
              <Button>View All Predictions</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

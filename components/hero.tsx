import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getTeamLogo } from "@/utils/team-utils"

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-blue-900 to-blue-950 py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('/baseball-stadium.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                MLB Stats & Predictions
              </h1>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                Data-driven insights to help you make informed decisions. Get the edge on your MLB bets with our
                advanced analytics.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/predictions">
                <Button size="lg" className="bg-white text-blue-950 hover:bg-white/90">
                  View Predictions
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full max-w-[400px] rounded-lg bg-white/5 p-4 backdrop-blur-sm">
              <div className="absolute -top-2 -left-2 h-full w-full rounded-lg border border-white/10 bg-white/5" />
              <div className="relative z-10 h-full w-full rounded-lg bg-gradient-to-br from-blue-800/80 to-blue-950/80 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Today's Top Pick</h3>
                  <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-500">
                    85% Confidence
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <img
                      src={getTeamLogo("Yankees") || "/placeholder.svg"}
                      alt="Yankees"
                      className="h-12 w-12 rounded-full bg-white/10 p-1 object-contain"
                    />
                    <span className="mt-2 text-sm font-medium text-white">Yankees</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-white">vs</span>
                    <div className="mt-1 text-xs text-white/60">7:05 PM ET</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={getTeamLogo("Red Sox") || "/placeholder.svg"}
                      alt="Red Sox"
                      className="h-12 w-12 rounded-full bg-white/10 p-1 object-contain"
                    />
                    <span className="mt-2 text-sm font-medium text-white">Red Sox</span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-md bg-white/10 p-3">
                    <h4 className="font-medium text-white">Prediction</h4>
                    <p className="text-sm text-white/80">Yankees to win by 2+ runs</p>
                  </div>
                  <div className="rounded-md bg-white/10 p-3">
                    <h4 className="font-medium text-white">Key Insight</h4>
                    <p className="text-sm text-white/80">
                      Yankees' starting pitcher has a 1.87 ERA in last 5 starts vs Boston
                    </p>
                  </div>
                </div>
                <Link href="/predictions/yankees-redsox">
                  <Button className="mt-6 w-full bg-white text-blue-950 hover:bg-white/90">View Full Analysis</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

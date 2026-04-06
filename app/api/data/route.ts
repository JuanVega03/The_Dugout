import { NextResponse } from "next/server"
import matchups from "@/data/matchups_data.json"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const data = matchups as any

  try {
    if (!data) {
      return NextResponse.json({ error: "Data not available" }, { status: 404 })
    }
    if (type === "matchups") {
      return NextResponse.json(data)
    }
    const picks = data.games
      ?.flatMap((game: any) => {
        const sides: any[] = []
        if (game.away?.tier && game.away.tier !== "NO_PLAY") {
          sides.push({ ...game.away, game_number: game.game_number, game_time: game.game_time, opponent: game.home?.team })
        }
        if (game.home?.tier && game.home.tier !== "NO_PLAY") {
          sides.push({ ...game.home, game_number: game.game_number, game_time: game.game_time, opponent: game.away?.team })
        }
        return sides
      })
      .sort((a: any, b: any) => (a.pick_rank || 99) - (b.pick_rank || 99)) || []

    return NextResponse.json({
      date: data.date,
      generated_at: data.generated_at,
      algorithm_version: data.algorithm_version,
      games: data.games,
      picks,
      summary: data.summary,
      config: data.config,
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

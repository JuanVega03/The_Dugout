import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const readJsonFile = (filePath: string) => {
  try {
    const fullPath = path.join(process.cwd(), filePath)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error reading file from ${filePath}:`, error)
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  try {
    const matchups = readJsonFile("data/matchups_data.json")

    if (!matchups) {
      return NextResponse.json({ error: "Data not available" }, { status: 404 })
    }

    if (type === "matchups") {
      return NextResponse.json(matchups)
    }

    // For "all" or default, return the full algorithm output
    // Extract games with picks (positive edge) for featured/predictions
    const picks = matchups.games
      ?.flatMap((game: any) => {
        const sides = []
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
      date: matchups.date,
      generated_at: matchups.generated_at,
      algorithm_version: matchups.algorithm_version,
      games: matchups.games,
      picks,
      summary: matchups.summary,
      config: matchups.config,
    })
  } catch (error) {
    console.error("Error processing data request:", error)
    return NextResponse.json({ error: "Failed to process data request" }, { status: 500 })
  }
}

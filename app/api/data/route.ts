import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { PivotsData, MatchupsData } from "@/types/data"

// Helper function to read JSON files
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
    if (type === "pivots") {
      const data = readJsonFile("data/pivots_data.json") as PivotsData
      return NextResponse.json(data)
    } else if (type === "matchups") {
      const data = readJsonFile("data/matchups_data.json") as MatchupsData
      return NextResponse.json(data)
    } else if (type === "all") {
      const pivots = readJsonFile("data/pivots_data.json") as PivotsData
      const matchups = readJsonFile("data/matchups_data.json") as MatchupsData

      // Combine data for a more comprehensive response
      const combinedData = {
        date: pivots?.date || matchups?.date,
        games:
          pivots?.games.map((game) => {
            const matchup = matchups?.matchups.find((m) => m.game_id === game.game_id)
            return {
              ...game,
              matchup: matchup || null,
            }
          }) || [],
      }

      return NextResponse.json(combinedData)
    } else {
      return NextResponse.json({ error: "Invalid data type requested" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error processing data request:", error)
    return NextResponse.json({ error: "Failed to process data request" }, { status: 500 })
  }
}

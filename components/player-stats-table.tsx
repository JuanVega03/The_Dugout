"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const players = [
  { name: "Aaron Judge", team: "NYY", position: "OF", avg: 0.312, hr: 42, rbi: 98, obp: 0.425, slg: 0.686, ops: 1.111 },
  {
    name: "Shohei Ohtani",
    team: "LAD",
    position: "DH",
    avg: 0.302,
    hr: 38,
    rbi: 92,
    obp: 0.412,
    slg: 0.654,
    ops: 1.066,
  },
  { name: "Juan Soto", team: "NYY", position: "OF", avg: 0.298, hr: 35, rbi: 89, obp: 0.41, slg: 0.585, ops: 0.995 },
  {
    name: "Mookie Betts",
    team: "LAD",
    position: "SS/OF",
    avg: 0.295,
    hr: 28,
    rbi: 82,
    obp: 0.39,
    slg: 0.55,
    ops: 0.94,
  },
  {
    name: "Vladimir Guerrero Jr.",
    team: "TOR",
    position: "1B",
    avg: 0.29,
    hr: 32,
    rbi: 88,
    obp: 0.365,
    slg: 0.52,
    ops: 0.885,
  },
  {
    name: "Freddie Freeman",
    team: "LAD",
    position: "1B",
    avg: 0.325,
    hr: 25,
    rbi: 90,
    obp: 0.395,
    slg: 0.535,
    ops: 0.93,
  },
  {
    name: "Yordan Alvarez",
    team: "HOU",
    position: "OF/DH",
    avg: 0.293,
    hr: 30,
    rbi: 85,
    obp: 0.385,
    slg: 0.57,
    ops: 0.955,
  },
  { name: "Rafael Devers", team: "BOS", position: "3B", avg: 0.285, hr: 33, rbi: 95, obp: 0.35, slg: 0.53, ops: 0.88 },
  {
    name: "Gunnar Henderson",
    team: "BAL",
    position: "SS",
    avg: 0.28,
    hr: 28,
    rbi: 80,
    obp: 0.36,
    slg: 0.51,
    ops: 0.87,
  },
  { name: "Bobby Witt Jr.", team: "KC", position: "SS", avg: 0.31, hr: 25, rbi: 85, obp: 0.355, slg: 0.525, ops: 0.88 },
]

export default function PlayerStatsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [position, setPosition] = useState<string | null>(null)

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPosition = position ? player.position.includes(position) : true
    return matchesSearch && matchesPosition
  })

  const positions = ["OF", "DH", "SS", "1B", "3B", "2B", "C", "P"]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              {position || "All Positions"} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked={position === null} onCheckedChange={() => setPosition(null)}>
              All Positions
            </DropdownMenuCheckboxItem>
            {positions.map((pos) => (
              <DropdownMenuCheckboxItem key={pos} checked={position === pos} onCheckedChange={() => setPosition(pos)}>
                {pos}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>POS</TableHead>
              <TableHead className="text-right">AVG</TableHead>
              <TableHead className="text-right">HR</TableHead>
              <TableHead className="text-right">RBI</TableHead>
              <TableHead className="text-right">OBP</TableHead>
              <TableHead className="text-right">SLG</TableHead>
              <TableHead className="text-right">OPS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player) => (
              <TableRow key={player.name}>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell>{player.team}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell className="text-right">{player.avg}</TableCell>
                <TableCell className="text-right">{player.hr}</TableCell>
                <TableCell className="text-right">{player.rbi}</TableCell>
                <TableCell className="text-right">{player.obp}</TableCell>
                <TableCell className="text-right">{player.slg}</TableCell>
                <TableCell className="text-right">{player.ops}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

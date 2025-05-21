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

const teams = [
  {
    name: "New York Yankees",
    division: "AL East",
    wins: 92,
    losses: 70,
    pct: 0.568,
    gb: "-",
    l10: "7-3",
    streak: "W2",
  },
  {
    name: "Boston Red Sox",
    division: "AL East",
    wins: 78,
    losses: 84,
    pct: 0.481,
    gb: "14.0",
    l10: "4-6",
    streak: "L1",
  },
  {
    name: "Toronto Blue Jays",
    division: "AL East",
    wins: 89,
    losses: 73,
    pct: 0.549,
    gb: "3.0",
    l10: "6-4",
    streak: "W3",
  },
  {
    name: "Tampa Bay Rays",
    division: "AL East",
    wins: 86,
    losses: 76,
    pct: 0.531,
    gb: "6.0",
    l10: "5-5",
    streak: "L2",
  },
  {
    name: "Baltimore Orioles",
    division: "AL East",
    wins: 83,
    losses: 79,
    pct: 0.512,
    gb: "9.0",
    l10: "6-4",
    streak: "W1",
  },
  {
    name: "Minnesota Twins",
    division: "AL Central",
    wins: 87,
    losses: 75,
    pct: 0.537,
    gb: "-",
    l10: "7-3",
    streak: "W4",
  },
  {
    name: "Cleveland Guardians",
    division: "AL Central",
    wins: 92,
    losses: 70,
    pct: 0.568,
    gb: "-",
    l10: "8-2",
    streak: "W6",
  },
  {
    name: "Detroit Tigers",
    division: "AL Central",
    wins: 77,
    losses: 85,
    pct: 0.475,
    gb: "15.0",
    l10: "5-5",
    streak: "L3",
  },
  {
    name: "Chicago White Sox",
    division: "AL Central",
    wins: 61,
    losses: 101,
    pct: 0.377,
    gb: "31.0",
    l10: "3-7",
    streak: "L5",
  },
  {
    name: "Kansas City Royals",
    division: "AL Central",
    wins: 75,
    losses: 87,
    pct: 0.463,
    gb: "17.0",
    l10: "4-6",
    streak: "W2",
  },
]

export default function TeamStatsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [division, setDivision] = useState<string | null>(null)

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDivision = division ? team.division === division : true
    return matchesSearch && matchesDivision
  })

  const divisions = Array.from(new Set(teams.map((team) => team.division)))

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              {division || "All Divisions"} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked={division === null} onCheckedChange={() => setDivision(null)}>
              All Divisions
            </DropdownMenuCheckboxItem>
            {divisions.map((div) => (
              <DropdownMenuCheckboxItem key={div} checked={division === div} onCheckedChange={() => setDivision(div)}>
                {div}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Division</TableHead>
              <TableHead className="text-right">W</TableHead>
              <TableHead className="text-right">L</TableHead>
              <TableHead className="text-right">PCT</TableHead>
              <TableHead className="text-right">GB</TableHead>
              <TableHead className="text-right">L10</TableHead>
              <TableHead className="text-right">STRK</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow key={team.name}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.division}</TableCell>
                <TableCell className="text-right">{team.wins}</TableCell>
                <TableCell className="text-right">{team.losses}</TableCell>
                <TableCell className="text-right">{team.pct}</TableCell>
                <TableCell className="text-right">{team.gb}</TableCell>
                <TableCell className="text-right">{team.l10}</TableCell>
                <TableCell className="text-right">{team.streak}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

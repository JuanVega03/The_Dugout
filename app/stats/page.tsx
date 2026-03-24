"use client"

import Link from "next/link"
import { useMLBData } from "@/hooks/use-mlb-data"

function formatPct(v) { if (v == null) return "—"; return `${(v * 100).toFixed(1)}%` }

export default function StatsPage() {
  const { data, isLoading, error } = useMLBData("all")
  const teamStats = []
  const games = data?.games || []
  games.forEach((game) => {
    ;[game.away, game.home].filter(Boolean).forEach((side) => { teamStats.push(side) })
  })
  const ranked = teamStats.sort((a, b) => (a.pick_rank || 99) - (b.pick_rank || 99))

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <nav className="border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
          <Link href="/" className="text-sm font-bold tracking-[0.2em] text-yellow-400 uppercase">The Dugout</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">Home</Link>
            <Link href="/predictions" className="text-sm text-gray-400 hover:text-white">Predictions</Link>
            <Link href="/stats" className="text-sm text-white font-medium">Stats</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-black text-white mb-2">Algorithm Rankings</h1>
        <p className="text-gray-400 text-sm mb-8">Today&apos;s team power rankings from the 12-variable model</p>




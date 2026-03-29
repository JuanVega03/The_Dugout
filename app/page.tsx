// @ts-nocheck
"use client"

import Link from "next/link"
import { useMLBData } from "@/hooks/use-mlb-data"

function formatPct(v) {
  if (v == null) return "\u2014"
  return `${(v * 100).toFixed(1)}%`
}

function formatEdge(v) {
  if (v == null) return "\u2014"
  return `${v > 0 ? "+" : ""}${(v * 100).toFixed(1)}%`
}

function formatML(v) {
  if (v == null) return "\u2014"
  return v > 0 ? `+${v}` : `${v}`
}

const TIER_STYLES = {
  PREMIUM: { label: "PREMIUM", bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  STANDARD: { label: "STANDARD", bg: "bg-gray-400/10", text: "text-gray-300", border: "border-gray-400/30" },
  VALUE: { label: "VALUE", bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
  NO_PLAY: { label: "NO PLAY", bg: "bg-gray-700/10", text: "text-gray-500", border: "border-gray-600/30" },
}

export default function Home() {
  const { data, isLoading, error } = useMLBData("all")
  const picks = (data?.picks || []).slice(0, 5)
  const games = data?.games || []
  const summary = data?.summary || {}

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <nav className="border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm font-bold tracking-[0.2em] text-yellow-400 uppercase">The Dugout</Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm text-white font-medium">Home</Link>
              <Link href="/predictions" className="text-sm text-gray-400 hover:text-white transition-colors">Predictions</Link>
              <Link href="/stats" className="text-sm text-gray-400 hover:text-white transition-colors">Stats</Link>
            </div>
          </div>
          <Link href="/predictions" className="text-xs font-bold px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 transition-colors">View Picks</Link>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-yellow-900/10" />
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 relative">
          <p className="text-xs font-bold tracking-[0.3em] text-yellow-400 uppercase mb-3">Algorithm v{data?.algorithm_version || "2025"}</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">MLB Picks &amp;<br/>Predictions</h1>
          <p className="text-gray-400 text-lg max-w-lg mb-8">Data-driven picks powered by a 12-variable weighted algorithm. Edge%, Model Win%, Kelly Criterion sizing.</p>
          {data?.date && <p className="text-xs text-gray-500 font-mono">{new Date(data.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>}
        </div>
      </div>

      {!isLoading && !error && (
        <div className="max-w-6xl mx-auto px-6 -mt-2 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Games Today", value: summary.total_games || games.length, color: "text-white" },
              { label: "Premium Picks", value: summary.premium_picks || 0, color: "text-yellow-400" },
              { label: "Value Picks", value: summary.value_picks || 0, color: "text-orange-400" },
              { label: "No Play", value: summary.no_play || 0, color: "text-gray-500" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{label}</div>
                <div className={`text-2xl font-black font-mono ${color} mt-1`}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-bold tracking-[0.3em] text-yellow-400 uppercase">Top Picks Today</h2>
          <Link href="/predictions" className="text-xs text-gray-400 hover:text-yellow-400 transition-colors">View All &rarr;</Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[1,2,3].map((i) => <div key={i} className="h-48 bg-white/[0.03] border border-white/5 rounded-xl animate-pulse" />)}</div>
        ) : picks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No picks available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {picks.map((pick, i) => {
              const tier = TIER_STYLES[pick.tier] || TIER_STYLES.NO_PLAY
              return (
                <div key={i} className={`bg-white/[0.03] border ${tier.border} rounded-xl p-5 hover:bg-white/[0.05] transition-all`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500 text-black flex items-center justify-center font-black text-sm">#{pick.pick_rank}</div>
                      <div>
                        <div className="text-lg font-black text-white">{pick.team}</div>
                        <div className="text-xs text-gray-500">{pick.starter}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${tier.bg} ${tier.text} ${tier.border} border`}>{tier.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div><div className="text-[10px] text-gray-500 font-mono">MODEL</div><div className="text-base font-black text-green-400 font-mono">{formatPct(pick.model_win_pct)}</div></div>
                    <div><div className="text-[10px] text-gray-500 font-mono">EDGE</div><div className={`text-base font-black font-mono ${(pick.edge_pct||0) > 0 ? "text-green-400" : "text-red-400"}`}>{formatEdge(pick.edge_pct)}</div></div>
                    <div><div className="text-[10px] text-gray-500 font-mono">ML</div><div className="text-base font-bold text-white font-mono">{formatML(pick.moneyline)}</div></div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-2">Get Full Algorithm Access</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">All pick rankings, edge percentages, model probabilities, projected scores, and Kelly criterion sizing.</p>
          <Link href="/predictions" className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors text-sm">View All Predictions</Link>
        </div>
      </div>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[10px] text-gray-600 font-mono">THE DUGOUT &middot; Algorithm-powered MLB analytics</p>
          <p className="text-[9px] text-gray-700 mt-1">For entertainment purposes only. Past performance does not guarantee future results.</p>
        </div>
      </footer>
    </div>
  )
}

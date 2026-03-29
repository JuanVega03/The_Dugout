// @ts-nocheck
"use client"

import Link from "next/link"
import { useMLBData } from "@/hooks/use-mlb-data"

function formatPct(v) { if (v == null) return "\u2014"; return `${(v * 100).toFixed(1)}%` }

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
        {isLoading ? <div className="h-96 bg-white/[0.03] border border-white/5 rounded-xl animate-pulse" />
        : error ? <div className="text-center py-16 text-gray-500">Error loading stats.</div>
        : ranked.length === 0 ? <div className="text-center py-16 text-gray-500">No data available.</div>
        : (
          <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/5 text-[9px] text-gray-500 font-mono uppercase tracking-wider">
                  <th className="px-3 py-3 text-left">#</th>
                  <th className="px-3 py-3 text-left">Team</th>
                  <th className="px-3 py-3 text-left">Starter</th>
                  <th className="px-3 py-3 text-right">Tier</th>
                  <th className="px-3 py-3 text-right">Model%</th>
                  <th className="px-3 py-3 text-right">Edge</th>
                  <th className="px-3 py-3 text-right">ML</th>
                  <th className="px-3 py-3 text-right">R/G</th>
                  <th className="px-3 py-3 text-right">RA/G</th>
                  <th className="px-3 py-3 text-right">OPS</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((t, i) => {
                  const isPick = t.tier !== "NO_PLAY"
                  return (
                    <tr key={`${t.team}-${i}`} className={`border-b border-white/5 ${isPick ? "bg-yellow-500/[0.03]" : "hover:bg-white/[0.02]"} transition-colors`}>
                      <td className="px-3 py-2.5 font-black text-yellow-400 font-mono">{t.pick_rank}</td>
                      <td className="px-3 py-2.5 font-bold text-white">{t.team}</td>
                      <td className="px-3 py-2.5 text-gray-400">{t.starter}</td>
                      <td className={`px-3 py-2.5 text-right font-bold text-[9px] ${t.tier==="PREMIUM"?"text-yellow-400":t.tier==="VALUE"?"text-orange-400":"text-gray-600"}`}>{t.tier==="NO_PLAY"?"\u2014":t.tier}</td>
                      <td className={`px-3 py-2.5 text-right font-mono font-bold ${(t.model_win_pct||0)>0.6?"text-green-400":"text-gray-400"}`}>{formatPct(t.model_win_pct)}</td>
                      <td className={`px-3 py-2.5 text-right font-mono font-bold ${(t.edge_pct||0)>0?"text-green-400":"text-red-400/60"}`}>{t.edge_pct!=null?`${(t.edge_pct*100).toFixed(1)}`:"\u2014"}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-gray-300">{t.moneyline!=null?(t.moneyline>0?`+${t.moneyline}`:t.moneyline):"\u2014"}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-gray-300">{t.avg_runs?.toFixed(1)}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-gray-300">{t.avg_runs_allowed?.toFixed(1)}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-gray-300">{t.team_ops?.toFixed(3)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <footer className="border-t border-white/5 py-8 mt-12"><div className="max-w-6xl mx-auto px-6 text-center"><p className="text-[10px] text-gray-600 font-mono">THE DUGOUT &middot; Algorithm-powered MLB analytics</p></div></footer>
    </div>
  )
}

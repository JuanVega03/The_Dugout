"use client"

import Link from "next/link"
import { useMLBData } from "@/hooks/use-mlb-data"
import { useState } from "react"

function formatPct(v) { if (v == null) return "—"; return `${(v * 100).toFixed(1)}%` }
function formatEdge(v) { if (v == null) return "—"; return `${v > 0 ? "+" : ""}${(v * 100).toFixed(1)}%` }
function formatML(v) { if (v == null) return "—"; return v > 0 ? `+${v}` : `${v}` }

const T = {
  PREMIUM: { label: "PREMIUM", bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  STANDARD: { label: "STANDARD", bg: "bg-gray-400/10", text: "text-gray-300", border: "border-gray-400/30" },
  VALUE: { label: "VALUE", bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
  NO_PLAY: { label: "NO PLAY", bg: "bg-gray-700/10", text: "text-gray-500", border: "border-gray-600/20" },
}

function Side({ side, label }) {
  if (!side) return null
  const isPick = side.tier && side.tier !== "NO_PLAY"
  return (
    <div className="py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs ${isPick ? "bg-yellow-500 text-black" : "bg-white/5 text-gray-500"}`}>{side.team}</div>
        <div>
          <div className="text-sm font-semibold text-white">{side.starter || "TBD"}</div>
          <div className="text-[11px] text-gray-500">{label} · ML {formatML(side.moneyline)}</div>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div className="text-right w-16">
          <div className="text-[9px] text-gray-500 font-mono uppercase">Model</div>
          <div className={`text-sm font-black font-mono ${(side.model_win_pct||0) > 0.6 ? "text-green-400" : (side.model_win_pct||0) > 0.4 ? "text-white" : "text-red-400"}`}>{formatPct(side.model_win_pct)}</div>
        </div>
        <div className="text-right w-16">
          <div className="text-[9px] text-gray-500 font-mono uppercase">Edge</div>
          <div className={`text-sm font-bold font-mono ${(side.edge_pct||0) > 0 ? "text-green-400" : "text-red-400"}`}>{formatEdge(side.edge_pct)}</div>
        </div>
        <div className="text-right w-14">
          <div className="text-[9px] text-gray-500 font-mono uppercase">Kelly</div>
          <div className="text-sm font-bold font-mono text-gray-300">{formatPct(side.kelly_pct)}</div>
        </div>
      </div>
    </div>
  )
}

function GameCard({ game }) {
  const [expanded, setExpanded] = useState(false)
  const away = game.away
  const home = game.home
  if (!away || !home) return null
  const fav = (away.pick_rank||99) < (home.pick_rank||99) ? away : home
  const tier = T[fav?.tier] || T.NO_PLAY
  const time = game.game_time ? new Date(game.game_time.replace(" ","T")).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:true}) : ""

  return (
    <div onClick={() => setExpanded(!expanded)} className={`bg-white/[0.02] border ${tier.border} rounded-xl overflow-hidden cursor-pointer hover:bg-white/[0.04] transition-all`}>
      <div className="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-white/5">
        <div className="flex gap-3 items-center">
          <span className="text-[10px] text-gray-500 font-mono">GAME {game.game_number}</span>
          <span className="text-[10px] text-gray-400">{time}</span>
          {game.over_under && <span className="text-[10px] text-gray-500 font-mono">O/U {game.over_under}</span>}
        </div>
        <div className="flex gap-2 items-center">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tier.bg} ${tier.text} border ${tier.border}`}>{tier.label}</span>
          {fav.pick_rank && fav.tier !== "NO_PLAY" && <span className="text-[10px] font-black text-yellow-500 font-mono">#{fav.pick_rank}</span>}
          <span className={`text-[10px] text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`}>▼</span>
        </div>
      </div>
      <div className="px-4">
        <Side side={away} label="AWAY" />
        <div className="border-t border-white/5" />
        <Side side={home} label="HOME" />
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-black/10">
          <div className="grid grid-cols-2 gap-6">
            {[away, home].map((s) => (
              <div key={s.team}>
                <div className="text-[10px] font-bold text-yellow-400 font-mono tracking-wider mb-2">{s.team}</div>
                {s.pitcher && (
                  <div className="bg-white/5 rounded-lg p-3 mb-3">
                    <div className="text-xs font-semibold text-white mb-1">{s.pitcher.name}</div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                      <span className="text-gray-500">ERA</span><span className="text-white font-mono text-right">{s.pitcher.era?.toFixed(2)}</span>
                      <span className="text-gray-500">WHIP</span><span className="text-white font-mono text-right">{s.pitcher.whip?.toFixed(2)}</span>
                      <span className="text-gray-500">Record</span><span className="text-white font-mono text-right">{s.pitcher.wins}W-{s.pitcher.losses}L</span>
                      <span className="text-gray-500">IP/GS</span><span className="text-white font-mono text-right">{s.pitcher.ip_per_gs?.toFixed(1)}</span>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                  <span className="text-gray-500">Proj Score</span><span className="text-green-400 font-mono font-bold text-right">{s.proj_score?.toFixed(1) || "—"}</span>
                  <span className="text-gray-500">R/G</span><span className="text-white font-mono text-right">{s.avg_runs?.toFixed(1)}</span>
                  <span className="text-gray-500">RA/G</span><span className="text-white font-mono text-right">{s.avg_runs_allowed?.toFixed(1)}</span>
                  <span className="text-gray-500">OPS</span><span className="text-white font-mono text-right">{s.team_ops?.toFixed(3)}</span>
                  <span className="text-gray-500">BP ERA</span><span className="text-white font-mono text-right">{s.bullpen_era?.toFixed(2)}</span>
                  <span className="text-gray-500">Streak</span><span className="text-white font-mono text-right">{formatPct(s.streak_10d)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function PredictionsPage() {
  const { data, isLoading, error } = useMLBData("all")
  const [filter, setFilter] = useState("ALL")
  const games = data?.games || []
  const summary = data?.summary || {}
  const picks = data?.picks || []
  const filtered = filter === "ALL" ? games : filter === "PICKS" ? games.filter((g) => [g.away?.tier,g.home?.tier].some((t) => t && t !== "NO_PLAY")) : games.filter((g) => [g.away?.tier,g.home?.tier].includes(filter))

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <nav className="border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-8">
          <Link href="/" className="text-sm font-bold tracking-[0.2em] text-yellow-400 uppercase">The Dugout</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">Home</Link>
            <Link href="/predictions" className="text-sm text-white font-medium">Predictions</Link>
            <Link href="/stats" className="text-sm text-gray-400 hover:text-white">Stats</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-black text-white">MLB Predictions</h1>
        <p className="text-gray-400 mt-1 text-sm">Algorithm-powered picks with edge analysis</p>
        {data?.date && <p className="text-[10px] text-gray-500 font-mono mt-2">{new Date(data.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})} · Algorithm v{data.algorithm_version}</p>}

        {isLoading ? <div className="space-y-4 mt-8">{[1,2,3].map(i=><div key={i} className="h-32 bg-white/[0.03] border border-white/5 rounded-xl animate-pulse"/>)}</div>
        : error ? <div className="text-center py-16 text-gray-500">Error loading predictions.</div>
        : <>
          <div className="grid grid-cols-4 gap-3 mt-6 mb-6">
            {[{l:"Games",v:summary.total_games||games.length,c:"text-white"},{l:"Premium",v:summary.premium_picks||0,c:"text-yellow-400"},{l:"Value",v:summary.value_picks||0,c:"text-orange-400"},{l:"No Play",v:summary.no_play||0,c:"text-gray-500"}].map(({l,v,c})=>(
              <div key={l} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                <div className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">{l}</div>
                <div className={`text-xl font-black font-mono ${c}`}>{v}</div>
              </div>
            ))}
          </div>

          {picks.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[10px] font-bold tracking-[0.3em] text-yellow-400 font-mono uppercase mb-3">TOP 5 PICKS</h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {picks.slice(0,5).map((p,i)=>(
                  <div key={i} className="flex-shrink-0 bg-white/[0.03] border border-yellow-500/15 rounded-lg p-3 min-w-[140px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-lg font-black text-yellow-500 font-mono">#{p.pick_rank}</span>
                      <span className="text-sm font-black text-white font-mono">{p.team}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 truncate">{p.starter}</div>
                    <div className="text-xs font-bold text-green-400 font-mono mt-1">Edge {formatEdge(p.edge_pct)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 mb-5 overflow-x-auto">
            {[{k:"ALL",l:"All Games"},{k:"PICKS",l:"All Picks"},{k:"PREMIUM",l:"Premium"},{k:"VALUE",l:"Value"}].map(({k,l})=>(
              <button key={k} onClick={()=>setFilter(k)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono whitespace-nowrap border transition-all ${filter===k?"border-yellow-500/40 bg-yellow-500/10 text-yellow-400":"border-white/10 text-gray-400 hover:text-white"}`}>{l}</button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? <div className="text-center py-16 text-gray-500">No games match this filter.</div>
            : filtered.map((game) => <GameCard key={game.game_number} game={game} />)}
          </div>
        </>}
      </div>
      <footer className="border-t border-white/5 py-8 mt-12"><div className="max-w-5xl mx-auto px-6 text-center"><p className="text-[10px] text-gray-600 font-mono">THE DUGOUT · Algorithm-powered MLB analytics</p></div></footer>
    </div>
  )
}

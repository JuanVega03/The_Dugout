"use client"

import { useMLBData } from "@/hooks/use-mlb-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const TIER_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string; border: string }> = {
  PREMIUM: { label: "PREMIUM", icon: "🔒", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  STANDARD: { label: "STANDARD", icon: "⭐", color: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/30" },
  VALUE: { label: "VALUE", icon: "📊", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  NO_PLAY: { label: "NO PLAY", icon: "⚠️", color: "text-gray-500", bg: "bg-gray-500/5", border: "border-gray-500/20" },
}

function formatPct(v: number | null | undefined) {
  if (v == null) return "—"
  return `${(v * 100).toFixed(1)}%`
}

function formatEdge(v: number | null | undefined) {
  if (v == null) return "—"
  return `${v > 0 ? "+" : ""}${(v * 100).toFixed(1)}%`
}

function formatML(v: number | null | undefined) {
  if (v == null) return "—"
  return v > 0 ? `+${v}` : `${v}`
}

function TierBadge({ tier }: { tier: string }) {
  const cfg = TIER_CONFIG[tier] || TIER_CONFIG.NO_PLAY
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${cfg.color} ${cfg.bg} ${cfg.border} border`}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

function TeamSide({ side, isTop }: { side: any; isTop: boolean }) {
  if (!side) return null
  const isPick = side.tier && side.tier !== "NO_PLAY"
  const edgeColor = (side.edge_pct || 0) > 0 ? "text-green-500" : "text-red-400"
  const winColor = (side.model_win_pct || 0) > 0.6 ? "text-green-500" : (side.model_win_pct || 0) > 0.4 ? "text-white" : "text-red-400"

  return (
    <div className={`flex items-center justify-between py-3 ${!isTop ? "border-t border-white/5" : ""}`}>
      <div className="flex items-center gap-3 flex-1">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm ${isPick ? "bg-yellow-500 text-black" : "bg-white/10 text-gray-400"}`}>
          {side.team}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{side.starter || "TBD"}</div>
          <div className="text-xs text-gray-500">{isTop ? "AWAY" : "HOME"} · ML {formatML(side.moneyline)}</div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="text-right">
          <div className="text-[10px] text-gray-500 font-mono">MODEL</div>
          <div className={`text-base font-black font-mono ${winColor}`}>{formatPct(side.model_win_pct)}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-500 font-mono">EDGE</div>
          <div className={`text-sm font-bold font-mono ${edgeColor}`}>{formatEdge(side.edge_pct)}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-500 font-mono">KELLY</div>
          <div className="text-sm font-bold font-mono text-gray-300">{formatPct(side.kelly_pct)}</div>
        </div>
      </div>
    </div>
  )
}

function GameCard({ game }: { game: any }) {
  const [expanded, setExpanded] = useState(false)
  const away = game.away
  const home = game.home
  const favSide = (away?.pick_rank || 99) < (home?.pick_rank || 99) ? away : home
  const isPremium = favSide?.tier === "PREMIUM" || favSide?.tier === "STANDARD"

  const gameTime = game.game_time ? new Date(game.game_time.replace(" ", "T")).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) : ""

  return (
    <Card
      className={`cursor-pointer transition-all hover:bg-white/[0.02] ${isPremium ? "border-yellow-500/15" : "border-white/5"} bg-white/[0.02]`}
      onClick={() => setExpanded(!expanded)}
    >
      <CardHeader className="py-2 px-4 flex flex-row items-center justify-between border-b border-white/5 bg-black/20">
        <div className="flex gap-3 items-center">
          <span className="text-xs text-gray-500 font-mono">GAME {game.game_number}</span>
          <span className="text-xs text-gray-400">{gameTime}</span>
          {game.over_under && <span className="text-xs text-gray-500 font-mono">O/U {game.over_under}</span>}
        </div>
        <div className="flex gap-2 items-center">
          <TierBadge tier={favSide?.tier || "NO_PLAY"} />
          {favSide?.pick_rank && <span className="text-xs font-mono font-bold text-yellow-500">#{favSide.pick_rank}</span>}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <TeamSide side={away} isTop={true} />
        <TeamSide side={home} isTop={false} />

        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
            {[away, home].filter(Boolean).map((side: any) => (
              <div key={side.team} className="space-y-2">
                <div className="text-xs font-bold text-yellow-500 font-mono">{side.team}</div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="text-gray-500">Proj Score</div>
                  <div className="text-white font-mono">{side.proj_score?.toFixed(1) || "—"}</div>
                  <div className="text-gray-500">R/G</div>
                  <div className="text-white font-mono">{side.avg_runs?.toFixed(1) || "—"}</div>
                  <div className="text-gray-500">RA/G</div>
                  <div className="text-white font-mono">{side.avg_runs_allowed?.toFixed(1) || "—"}</div>
                  <div className="text-gray-500">OPS</div>
                  <div className="text-white font-mono">{side.team_ops?.toFixed(3) || "—"}</div>
                  <div className="text-gray-500">BP ERA</div>
                  <div className="text-white font-mono">{side.bullpen_era?.toFixed(2) || "—"}</div>
                  <div className="text-gray-500">Streak 10d</div>
                  <div className="text-white font-mono">{formatPct(side.streak_10d)}</div>
                </div>
                {side.pitcher && (
                  <div className="mt-1 p-2 rounded bg-white/5">
                    <div className="text-xs font-semibold text-white">{side.pitcher.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-1">
                      ERA {side.pitcher.era?.toFixed(2)} · WHIP {side.pitcher.whip?.toFixed(2)} · {side.pitcher.wins}W-{side.pitcher.losses}L · {side.pitcher.ip_per_gs?.toFixed(1)} IP/GS
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function PredictionsPage() {
  const { data, isLoading, error } = useMLBData("all")
  const [filter, setFilter] = useState("ALL")

  const games = data?.games || []
  const summary = data?.summary || {}

  const filteredGames = filter === "ALL"
    ? games
    : filter === "PICKS"
      ? games.filter((g: any) => [g.away?.tier, g.home?.tier].some((t: string) => t && t !== "NO_PLAY"))
      : games.filter((g: any) => [g.away?.tier, g.home?.tier].includes(filter))

  const topPicks = (data?.picks || []).slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">MLB Predictions</h1>
        <p className="text-gray-400 mt-1">Algorithm-powered picks with edge analysis</p>
        {data?.date && (
          <p className="text-xs text-gray-500 font-mono mt-2">
            {new Date(data.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            {" · "}Algorithm v{data.algorithm_version}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[100px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Error loading predictions. Please try again later.</p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "Games", value: summary.total_games || games.length, color: "text-white" },
              { label: "Premium", value: summary.premium_picks || 0, color: "text-yellow-500" },
              { label: "Value", value: summary.value_picks || 0, color: "text-orange-400" },
              { label: "No Play", value: summary.no_play || 0, color: "text-gray-500" },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-gray-500 font-mono uppercase">{label}</div>
                <div className={`text-xl font-black font-mono ${color}`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Top Picks */}
          {topPicks.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-yellow-500 font-mono tracking-widest mb-3">🏆 TOP PICKS</h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {topPicks.map((p: any, i: number) => (
                  <div key={i} className="flex-shrink-0 p-3 rounded-lg bg-white/[0.03] border border-yellow-500/15 min-w-[130px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-lg font-black text-yellow-500 font-mono">#{p.pick_rank}</span>
                      <span className="text-sm font-black font-mono text-white">{p.team}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 truncate">{p.starter}</div>
                    <div className="text-xs font-bold text-green-500 font-mono mt-1">Edge {formatEdge(p.edge_pct)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {[
              { key: "ALL", label: "All Games" },
              { key: "PICKS", label: "All Picks" },
              { key: "PREMIUM", label: "🔒 Premium" },
              { key: "VALUE", label: "📊 Value" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono whitespace-nowrap transition-all border ${
                  filter === key
                    ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-500"
                    : "border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Games */}
          <div className="space-y-3">
            {filteredGames.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No predictions available for this filter.
              </div>
            ) : (
              filteredGames.map((game: any) => (
                <GameCard key={game.game_number} game={game} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const teamData = [
  { name: "Yankees", wins: 92, runs: 780, era: 3.65, avg: 0.255 },
  { name: "Dodgers", wins: 95, runs: 810, era: 3.45, avg: 0.26 },
  { name: "Astros", wins: 90, runs: 760, era: 3.7, avg: 0.25 },
  { name: "Braves", wins: 94, runs: 800, era: 3.5, avg: 0.258 },
  { name: "Phillies", wins: 89, runs: 770, era: 3.75, avg: 0.252 },
  { name: "Guardians", wins: 92, runs: 740, era: 3.6, avg: 0.248 },
  { name: "Padres", wins: 88, runs: 750, era: 3.8, avg: 0.245 },
  { name: "Orioles", wins: 91, runs: 765, era: 3.68, avg: 0.253 },
]

const playerData = [
  { name: "Judge", hr: 42, avg: 0.312, obp: 0.425, slg: 0.686 },
  { name: "Ohtani", hr: 38, avg: 0.302, obp: 0.412, slg: 0.654 },
  { name: "Soto", hr: 35, avg: 0.298, obp: 0.41, slg: 0.585 },
  { name: "Betts", hr: 28, avg: 0.295, obp: 0.39, slg: 0.55 },
  { name: "Guerrero", hr: 32, avg: 0.29, obp: 0.365, slg: 0.52 },
  { name: "Freeman", hr: 25, avg: 0.325, obp: 0.395, slg: 0.535 },
  { name: "Alvarez", hr: 30, avg: 0.293, obp: 0.385, slg: 0.57 },
  { name: "Devers", hr: 33, avg: 0.285, obp: 0.35, slg: 0.53 },
]

interface StatsChartProps {
  type: "team" | "player"
}

export default function StatsChart({ type }: StatsChartProps) {
  const [chartType, setChartType] = useState<"bar" | "line">("bar")
  const [metric, setMetric] = useState(type === "team" ? "wins" : "hr")

  const data = type === "team" ? teamData : playerData
  const metrics =
    type === "team"
      ? [
          { value: "wins", label: "Wins" },
          { value: "runs", label: "Runs Scored" },
          { value: "era", label: "ERA" },
          { value: "avg", label: "Batting Average" },
        ]
      : [
          { value: "hr", label: "Home Runs" },
          { value: "avg", label: "Batting Average" },
          { value: "obp", label: "On-Base %" },
          { value: "slg", label: "Slugging %" },
        ]

  const handleChartTypeChange = (value: string) => {
    setChartType(value as "bar" | "line")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            {metrics.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Tabs value={chartType} onValueChange={handleChartTypeChange}>
          <TabsList>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="line">Line</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardContent className="p-6">
          <ChartContainer
            config={{
              [metric]: {
                label: metrics.find((m) => m.value === metric)?.label || metric,
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey={metric} fill={`var(--color-${metric})`} radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey={metric}
                    stroke={`var(--color-${metric})`}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

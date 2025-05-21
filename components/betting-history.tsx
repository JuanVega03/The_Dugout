"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function BettingHistory() {
  const [bettingHistory, setBettingHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchBettingHistory = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("betting_history")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false })

        if (error) throw error

        setBettingHistory(data || [])
      } catch (error) {
        console.error("Error fetching betting history:", error)
        toast({
          title: "Error",
          description: "Failed to load betting history",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBettingHistory()
  }, [user, supabase, toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Calculate betting stats
  const totalBets = bettingHistory.length
  const wins = bettingHistory.filter((bet) => bet.result === "Win").length
  const losses = totalBets - wins
  const winRate = totalBets > 0 ? ((wins / totalBets) * 100).toFixed(1) : "0.0"
  const totalStaked = bettingHistory.reduce((sum, bet) => sum + Number(bet.stake), 0)
  const totalPayout = bettingHistory.reduce((sum, bet) => sum + Number(bet.payout), 0)
  const profit = totalPayout - totalStaked
  const roi = totalStaked > 0 ? ((profit / totalStaked) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ArrowUpDown className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
              <h3 className="text-2xl font-bold">
                {winRate}%{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  ({wins}-{losses})
                </span>
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Staked</p>
              <h3 className="text-2xl font-bold">${totalStaked.toFixed(2)}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                profit >= 0 ? "bg-green-500/10" : "bg-red-500/10"
              }`}
            >
              {profit >= 0 ? (
                <TrendingUp className="h-6 w-6 text-green-500" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Profit/Loss</p>
              <h3 className={`text-2xl font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                {profit >= 0 ? "+" : ""}${profit.toFixed(2)}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                Number.parseFloat(roi) >= 0 ? "bg-green-500/10" : "bg-red-500/10"
              }`}
            >
              {Number.parseFloat(roi) >= 0 ? (
                <TrendingUp className="h-6 w-6 text-green-500" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">ROI</p>
              <h3 className={`text-2xl font-bold ${Number.parseFloat(roi) >= 0 ? "text-green-500" : "text-red-500"}`}>
                {Number.parseFloat(roi) >= 0 ? "+" : ""}
                {roi}%
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {bettingHistory.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <DollarSign className="mb-2 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-medium">No Betting History</h3>
            <p className="text-center text-muted-foreground">
              You haven't recorded any bets yet. Start tracking your bets to see your performance over time.
            </p>
            <Button className="mt-4">Record a Bet</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Bet</TableHead>
                  <TableHead>Odds</TableHead>
                  <TableHead className="text-right">Stake</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead className="text-right">Payout</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bettingHistory.map((bet) => (
                  <TableRow key={bet.id}>
                    <TableCell>{new Date(bet.date).toLocaleDateString()}</TableCell>
                    <TableCell>{bet.game}</TableCell>
                    <TableCell>{bet.bet}</TableCell>
                    <TableCell>{bet.odds}</TableCell>
                    <TableCell className="text-right">${Number(bet.stake).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={bet.result === "Win" ? "success" : "destructive"}
                        className={
                          bet.result === "Win" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        }
                      >
                        {bet.result}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${Number(bet.payout).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button variant="outline">View More History</Button>
      </div>
    </div>
  )
}

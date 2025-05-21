"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, ExternalLink, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { getTeamLogo } from "@/utils/team-utils"

export default function SavedPredictions() {
  const [savedPredictions, setSavedPredictions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchSavedPredictions = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("saved_predictions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        setSavedPredictions(data || [])
      } catch (error) {
        console.error("Error fetching saved predictions:", error)
        toast({
          title: "Error",
          description: "Failed to load saved predictions",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedPredictions()
  }, [user, supabase, toast])

  const handleRemovePrediction = async (id: string) => {
    try {
      const { error } = await supabase.from("saved_predictions").delete().eq("id", id)

      if (error) throw error

      setSavedPredictions(savedPredictions.filter((prediction) => prediction.id !== id))

      toast({
        title: "Success",
        description: "Prediction removed successfully",
      })
    } catch (error) {
      console.error("Error removing prediction:", error)
      toast({
        title: "Error",
        description: "Failed to remove prediction",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (savedPredictions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Bookmark className="mb-2 h-12 w-12 text-muted-foreground" />
          <h3 className="text-xl font-medium">No Saved Predictions</h3>
          <p className="text-center text-muted-foreground">
            You haven't saved any predictions yet. Browse predictions and click the save button to add them here.
          </p>
          <Link href="/predictions">
            <Button className="mt-4">Browse Predictions</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {savedPredictions.map((prediction) => (
        <Card key={prediction.id}>
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <img
                  src={getTeamLogo(prediction.teams.split(" vs ")[0]) || "/placeholder.svg"}
                  alt={prediction.teams.split(" vs ")[0]}
                  className="h-8 w-8 rounded-full object-contain"
                />
                <span className="font-medium">vs</span>
                <img
                  src={getTeamLogo(prediction.teams.split(" vs ")[1]) || "/placeholder.svg"}
                  alt={prediction.teams.split(" vs ")[1]}
                  className="h-8 w-8 rounded-full object-contain"
                />
              </div>
              <Badge variant="outline">{new Date(prediction.date).toLocaleDateString()}</Badge>
            </div>
            <div className="p-4">
              <h4 className="font-medium">{prediction.teams}</h4>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Prediction: </span>
                  {prediction.prediction}
                </div>
                <Badge
                  variant={
                    prediction.result === "Correct"
                      ? "success"
                      : prediction.result === "Incorrect"
                        ? "destructive"
                        : "outline"
                  }
                  className={
                    prediction.result === "Correct"
                      ? "bg-green-500/10 text-green-500"
                      : prediction.result === "Incorrect"
                        ? "bg-red-500/10 text-red-500"
                        : ""
                  }
                >
                  {prediction.result}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between border-t p-4">
              <Button variant="ghost" size="sm" onClick={() => handleRemovePrediction(prediction.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
              <Link href={`/predictions/${prediction.prediction_id}`}>
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

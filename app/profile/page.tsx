"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bell, CreditCard, LogOut, Settings, Star, User } from "lucide-react"
import SavedPredictions from "@/components/saved-predictions"
import BettingHistory from "@/components/betting-history"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
    memberSince: "",
    subscription: "Free",
  })
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    game_alerts: true,
    betting_tips: true,
    newsletter: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return

      try {
        setIsLoading(true)

        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError

        // Fetch preferences
        const { data: preferencesData, error: preferencesError } = await supabase
          .from("user_preferences")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (preferencesError && preferencesError.code !== "PGRST116") throw preferencesError

        // Format member since date
        const memberSince = new Date(user.created_at || Date.now()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })

        setProfile({
          name: profileData?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "",
          email: user.email || "",
          avatar: profileData?.avatar_url || user.user_metadata?.avatar_url || "",
          memberSince,
          subscription: profileData?.subscription_tier || "Free",
        })

        if (preferencesData) {
          setPreferences(preferencesData)
        }
      } catch (error) {
        console.error("Error fetching profile data:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [user, supabase, toast])

  const handleUpdateProfile = async () => {
    if (!user) return

    try {
      setIsSaving(true)

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdatePreferences = async () => {
    if (!user) return

    try {
      setIsSaving(true)

      const { error } = await supabase.from("user_preferences").upsert({
        user_id: user.id,
        ...preferences,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Preferences updated successfully",
      })
    } catch (error) {
      console.error("Error updating preferences:", error)
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center">{profile.name}</CardTitle>
                <CardDescription className="text-center">{profile.email}</CardDescription>
                <div className="mt-2">
                  <Badge variant="secondary" className="mr-1">
                    <Star className="h-3 w-3 mr-1" />
                    {profile.subscription}
                  </Badge>
                  <Badge variant="outline">Member since {profile.memberSince}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscription
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500 hover:text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="predictions">Saved Predictions</TabsTrigger>
              <TabsTrigger value="history">Betting History</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profile.email} disabled />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed directly. Please contact support.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value="********" disabled />
                    <p className="text-xs text-muted-foreground">
                      To change your password, use the "Forgot password" option on the login page.
                    </p>
                  </div>
                  <Button onClick={handleUpdateProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="mt-6">
              <SavedPredictions />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <BettingHistory />
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive prediction updates via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={preferences.email_notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, email_notifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="game-alerts">Game Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about game starts and results</p>
                    </div>
                    <Switch
                      id="game-alerts"
                      checked={preferences.game_alerts}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, game_alerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="betting-tips">Betting Tips</Label>
                      <p className="text-sm text-muted-foreground">Receive daily betting tips and insights</p>
                    </div>
                    <Switch
                      id="betting-tips"
                      checked={preferences.betting_tips}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, betting_tips: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newsletter">Weekly Newsletter</Label>
                      <p className="text-sm text-muted-foreground">Get our weekly MLB insights newsletter</p>
                    </div>
                    <Switch
                      id="newsletter"
                      checked={preferences.newsletter}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, newsletter: checked })}
                    />
                  </div>
                  <Button className="mt-4" onClick={handleUpdatePreferences} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Preferences"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

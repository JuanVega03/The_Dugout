export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          subscription_tier: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          subscription_tier?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          subscription_tier?: string
        }
      }
      saved_predictions: {
        Row: {
          id: string
          user_id: string
          prediction_id: string
          teams: string
          prediction: string
          confidence: string | null
          date: string
          result: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prediction_id: string
          teams: string
          prediction: string
          confidence?: string | null
          date?: string
          result?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prediction_id?: string
          teams?: string
          prediction?: string
          confidence?: string | null
          date?: string
          result?: string
          created_at?: string
        }
      }
      betting_history: {
        Row: {
          id: string
          user_id: string
          game: string
          bet: string
          odds: string
          stake: number
          result: string
          payout: number
          date: string
        }
        Insert: {
          id?: string
          user_id: string
          game: string
          bet: string
          odds: string
          stake: number
          result?: string
          payout?: number
          date?: string
        }
        Update: {
          id?: string
          user_id?: string
          game?: string
          bet?: string
          odds?: string
          stake?: number
          result?: string
          payout?: number
          date?: string
        }
      }
      user_preferences: {
        Row: {
          user_id: string
          email_notifications: boolean
          game_alerts: boolean
          betting_tips: boolean
          newsletter: boolean
          updated_at: string
        }
        Insert: {
          user_id: string
          email_notifications?: boolean
          game_alerts?: boolean
          betting_tips?: boolean
          newsletter?: boolean
          updated_at?: string
        }
        Update: {
          user_id?: string
          email_notifications?: boolean
          game_alerts?: boolean
          betting_tips?: boolean
          newsletter?: boolean
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Types for pivots_data.json
export interface PivotsData {
  date: string
  games: PivotGame[]
}

export interface PivotGame {
  game_id: string
  home_team: string
  away_team: string
  home_score?: number
  away_score?: number
  status: string
  start_time: string
  predictions: Prediction[]
}

export interface Prediction {
  id: string
  type: string
  prediction: string
  confidence: number
  analysis: string[]
}

// Types for matchups_data.json
export interface MatchupsData {
  date: string
  matchups: Matchup[]
}

export interface Matchup {
  game_id: string
  home_team: {
    name: string
    abbr: string
    record: string
    stats: TeamStats
  }
  away_team: {
    name: string
    abbr: string
    record: string
    stats: TeamStats
  }
  pitchers: {
    home: Pitcher
    away: Pitcher
  }
  venue: string
  weather: string
  start_time: string
}

export interface TeamStats {
  batting_avg: number
  runs_per_game: number
  home_runs: number
  era: number
  whip: number
  last_10: string
}

export interface Pitcher {
  name: string
  hand: string
  era: number
  wins: number
  losses: number
  strikeouts: number
}

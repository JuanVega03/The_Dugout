// Map team names to their logo paths
const teamLogoMap: Record<string, string> = {
  // Full names
  Yankees: "/teams/yankees-logo.png",
  "Red Sox": "/teams/red-sox-logo.png",
  Dodgers: "/teams/dodgers-logo.png",
  Giants: "/teams/giants-logo.png",
  Astros: "/teams/astros-logo.png",
  Rangers: "/teams/rangers-logo.png",
  Cubs: "/teams/cubs-logo.png",
  Cardinals: "/teams/cardinals-logo.png",
  "Blue Jays": "/teams/blue-jays-logo.png",
  Guardians: "/teams/guardians-logo.png",
  Orioles: "/teams/orioles-logo.png",
  Braves: "/teams/braves-logo.png",
  Phillies: "/teams/phillies-logo.png",
  Padres: "/teams/padres-logo.png",

  // Abbreviations
  NYY: "/teams/yankees-logo.png",
  BOS: "/teams/red-sox-logo.png",
  LAD: "/teams/dodgers-logo.png",
  SF: "/teams/giants-logo.png",
  HOU: "/teams/astros-logo.png",
  TEX: "/teams/rangers-logo.png",
  CHC: "/teams/cubs-logo.png",
  STL: "/teams/cardinals-logo.png",
  TOR: "/teams/blue-jays-logo.png",
  CLE: "/teams/guardians-logo.png",
  BAL: "/teams/orioles-logo.png",
  ATL: "/teams/braves-logo.png",
  PHI: "/teams/phillies-logo.png",
  SD: "/teams/padres-logo.png",
}

export function getTeamLogo(teamName: string): string {
  // Try to find the logo in our map
  const logo = teamLogoMap[teamName]

  // If we have a logo, return it, otherwise return a placeholder
  return logo || `/placeholder.svg?height=80&width=80&query=${teamName} logo`
}

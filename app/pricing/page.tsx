import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic access to MLB stats and predictions",
      features: [
        "Daily game predictions",
        "Basic team and player stats",
        "Limited historical data",
        "Ad-supported experience",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "Enhanced predictions and exclusive insights",
      features: [
        "All Free features",
        "Advanced prediction models",
        "Detailed player and team analytics",
        "Betting trend analysis",
        "Ad-free experience",
        "Email alerts for your favorite teams",
      ],
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "per month",
      description: "Professional-grade MLB analytics",
      features: [
        "All Premium features",
        "Proprietary prediction algorithms",
        "Advanced statistical models",
        "Custom alerts and notifications",
        "API access",
        "Priority customer support",
      ],
      cta: "Go Pro",
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing Plans</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that's right for you and take your MLB predictions and analysis to the next level.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-md relative" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/register" className="w-full">
                <Button className={`w-full ${plan.popular ? "" : "bg-muted-foreground hover:bg-muted-foreground/90"}`}>
                  {plan.cta}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

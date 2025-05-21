import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <div className="my-12 rounded-xl bg-gradient-to-r from-blue-900 to-blue-950 p-8 text-center md:p-12">
      <div className="mx-auto max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Get Premium MLB Predictions</h2>
        <p className="text-white/80 md:text-lg">
          Unlock exclusive predictions, advanced stats, and personalized alerts with our premium subscription.
        </p>
        <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center">
          <Link href="/register">
            <Button size="lg" className="w-full bg-white text-blue-950 hover:bg-white/90 sm:w-auto">
              Sign Up Now
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

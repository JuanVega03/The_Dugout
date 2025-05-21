import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Disclaimer</CardTitle>
          <CardDescription>Last updated: May 15, 2023</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <h2>1. Information Accuracy</h2>
          <p>
            The information provided on The Dugout is for general informational and entertainment purposes only. While
            we strive to provide accurate and up-to-date information, we make no representations or warranties of any
            kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the
            information, products, services, or related graphics contained on the website.
          </p>

          <h2>2. Betting and Gambling</h2>
          <p>
            The predictions, statistics, and betting insights provided on The Dugout are not intended as betting advice.
            Any reliance you place on such information is strictly at your own risk. We are not responsible for any
            losses that may result from your betting decisions.
          </p>
          <p>
            Gambling involves risk and should be approached as a form of entertainment, not as a way to make money.
            Always gamble responsibly and be aware of the risks involved. If you or someone you know has a gambling
            problem, please seek help from appropriate support services.
          </p>

          <h2>3. External Links</h2>
          <p>
            The Dugout may contain links to external websites that are not provided or maintained by us. We do not
            guarantee the accuracy, relevance, timeliness, or completeness of any information on these external
            websites.
          </p>

          <h2>4. MLB Trademarks and Copyrights</h2>
          <p>
            MLB trademarks and copyrights are used with permission of Major League Baseball. The Dugout is not endorsed
            by, sponsored by, or affiliated with MLB or any MLB team.
          </p>

          <h2>5. Financial Responsibility</h2>
          <p>
            In no event will we be liable for any loss or damage including without limitation, indirect or consequential
            loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in
            connection with, the use of this website or any betting decisions made based on the information provided.
          </p>

          <h2>6. Age Restrictions</h2>
          <p>
            The Dugout is intended for users who are of legal age to gamble in their jurisdiction. By using our website,
            you confirm that you are of legal age to gamble in your jurisdiction and that gambling is legal in your
            location.
          </p>

          <h2>7. Changes to This Disclaimer</h2>
          <p>
            We reserve the right to make changes to this disclaimer at any time. We encourage users to frequently check
            this page for any changes. Your continued use of The Dugout after any changes to this disclaimer constitutes
            your acceptance of such changes.
          </p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this disclaimer, please contact us at legal@dugout.example.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}

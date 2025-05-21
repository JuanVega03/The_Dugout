import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Terms of Service</CardTitle>
          <CardDescription>Last updated: May 15, 2023</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <h2>1. Introduction</h2>
          <p>
            Welcome to The Dugout. These Terms of Service govern your use of our website and services. By accessing or
            using The Dugout, you agree to be bound by these Terms.
          </p>

          <h2>2. Definitions</h2>
          <p>
            <strong>"The Dugout"</strong> refers to our website, accessible at dugout.example.com.
            <br />
            <strong>"Services"</strong> refers to the MLB statistics, predictions, and betting insights provided through
            The Dugout.
            <br />
            <strong>"User"</strong> refers to individuals who access or use The Dugout.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            To access certain features of The Dugout, you may be required to register for an account. You agree to
            provide accurate, current, and complete information during the registration process and to update such
            information to keep it accurate, current, and complete.
          </p>

          <h2>4. Use of Services</h2>
          <p>
            The Dugout provides MLB statistics, predictions, and betting insights for informational and entertainment
            purposes only. The information provided should not be considered as financial or betting advice. Users are
            responsible for their own betting decisions and should gamble responsibly.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on The Dugout, including but not limited to text, graphics, logos, icons, images, audio clips,
            digital downloads, and data compilations, is the property of The Dugout or its content suppliers and is
            protected by international copyright laws.
          </p>

          <h2>6. User Conduct</h2>
          <p>Users agree not to:</p>
          <ul>
            <li>Use The Dugout for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to any portion of The Dugout</li>
            <li>Interfere with the proper working of The Dugout</li>
            <li>Engage in any conduct that restricts or inhibits any other user from using The Dugout</li>
          </ul>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Dugout is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied,
            regarding the operation or availability of The Dugout.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall The Dugout be liable for any indirect, incidental, special, consequential, or punitive
            damages resulting from your use of or inability to use The Dugout.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of any material changes by
            posting the new Terms on The Dugout. Your continued use of The Dugout after such modifications will
            constitute your acknowledgment and agreement to the modified Terms.
          </p>

          <h2>10. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at support@dugout.example.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}

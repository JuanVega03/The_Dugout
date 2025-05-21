import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Privacy Policy</CardTitle>
          <CardDescription>Last updated: May 15, 2023</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <h2>1. Introduction</h2>
          <p>
            At The Dugout, we respect your privacy and are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, and safeguard your information when you use our website and services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, and account credentials when you register for
              an account.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our website, including pages visited, time
              spent on pages, and other analytics data.
            </li>
            <li>
              <strong>Preferences:</strong> Your favorite teams, players, and betting preferences to personalize your
              experience.
            </li>
            <li>
              <strong>Device Information:</strong> Information about your device, browser, and IP address.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To personalize your experience on our website</li>
            <li>To send you notifications about games, predictions, and other relevant information</li>
            <li>To improve our website and services</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To detect and prevent fraudulent activity</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain
            information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            We may use third-party services, such as analytics providers and payment processors, that collect, monitor,
            and analyze information to help us improve our services. These third parties have their own privacy policies
            addressing how they use such information.
          </p>

          <h2>7. Your Data Protection Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to rectify inaccurate personal data</li>
            <li>The right to request the deletion of your personal data</li>
            <li>The right to restrict the processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to object to the processing of your personal data</li>
          </ul>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@dugout.example.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Cookie Policy</CardTitle>
          <CardDescription>Last updated: May 15, 2023</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <h2>1. Introduction</h2>
          <p>
            This Cookie Policy explains how The Dugout uses cookies and similar technologies to recognize you when you
            visit our website. It explains what these technologies are and why we use them, as well as your rights to
            control our use of them.
          </p>

          <h2>2. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well
            as to provide reporting information.
          </p>

          <h2>3. Why Do We Use Cookies?</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and
              cannot be switched off in our systems. They are usually only set in response to actions made by you which
              amount to a request for services, such as setting your privacy preferences, logging in, or filling in
              forms.
            </li>
            <li>
              <strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can
              measure and improve the performance of our site. They help us to know which pages are the most and least
              popular and see how visitors move around the site.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality
              and personalization. They may be set by us or by third-party providers whose services we have added to our
              pages.
            </li>
            <li>
              <strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners.
              They may be used by those companies to build a profile of your interests and show you relevant
              advertisements on other sites.
            </li>
          </ul>

          <h2>4. Types of Cookies We Use</h2>
          <p>The specific cookies we use on The Dugout include:</p>
          <ul>
            <li>
              <strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser.
            </li>
            <li>
              <strong>Persistent Cookies:</strong> These remain on your device until they expire or you delete them.
            </li>
            <li>
              <strong>First-Party Cookies:</strong> These are cookies that we set on The Dugout domain.
            </li>
            <li>
              <strong>Third-Party Cookies:</strong> These are cookies that are set by other domains, such as Google
              Analytics or social media platforms.
            </li>
          </ul>

          <h2>5. How to Control Cookies</h2>
          <p>
            You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies
            can negatively impact your user experience and parts of our website may no longer be fully accessible.
          </p>
          <p>
            <strong>Browser Controls:</strong> Most browsers allow you to control cookies through their settings. Please
            refer to your specific browser's help documentation for more information.
          </p>
          <p>
            <strong>Cookie Management Tools:</strong> We provide a cookie management tool on our website that allows you
            to choose which types of cookies you accept or reject.
          </p>

          <h2>6. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
            business practices. Any changes will become effective when we post the revised Cookie Policy on our website.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at
            privacy@dugout.example.com.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

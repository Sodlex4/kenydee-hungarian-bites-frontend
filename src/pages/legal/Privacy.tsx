import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-section)' }}>
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-sm rounded-2xl p-8 border" style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))'
          }}>
            <h1 className="text-4xl font-bold mb-8 text-center" style={{ 
              color: 'hsl(var(--foreground))',
              fontFamily: 'Pacifico, cursive'
            }}>
              Privacy Policy
            </h1>

            <div className="space-y-8" style={{ color: 'hsl(var(--foreground))' }}>
              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  Information We Collect
                </h2>
                <p className="leading-relaxed mb-4">
                  When you use Hungarian Hot Dog services in Murang'a, we may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal information such as name, phone number, and delivery address</li>
                  <li>Order history and preferences</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communication records with our customer service team</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing and fulfilling your orders</li>
                  <li>Communicating with you about your orders and our services</li>
                  <li>Improving our products and services</li>
                  <li>Sending promotional offers (with your consent)</li>
                  <li>Ensuring food safety and quality control</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  Information Sharing
                </h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                  except as described in this policy. We may share information with trusted partners who assist us in operating 
                  our website, conducting our business, or serving our customers in Murang'a, as long as those parties agree to 
                  keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                  storage is 100% secure, so we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  Cookies and Tracking
                </h2>
                <p className="leading-relaxed">
                  Our website may use cookies to enhance your experience, gather general visitor information, and track visits 
                  to our website. You can choose to have your computer warn you each time a cookie is being sent, or you can 
                  choose to turn off all cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  Your Rights
                </h2>
                <p className="leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information we hold</li>
                  <li>Correct any inaccurate or incomplete information</li>
                  <li>Delete your personal information (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>File a complaint with relevant authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at our 
                  Murang'a location or through our customer service channels.
                </p>
              </section>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Last updated: January 2024
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
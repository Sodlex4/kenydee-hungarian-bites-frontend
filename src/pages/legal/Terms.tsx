import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Terms = () => {
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
              Terms of Service
            </h1>

            <div className="space-y-8" style={{ color: 'hsl(var(--foreground))' }}>
              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  1. Agreement to Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing and using Hungarian Hot Dog services in Murang'a, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  2. Use License
                </h2>
                <p className="leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials on Hungarian Hot Dog's website for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  3. Food Safety & Quality
                </h2>
                <p className="leading-relaxed">
                  We are committed to providing high-quality Hungarian Hot Dog Rolls in Murang'a. All our products are prepared following 
                  strict food safety standards. However, please inform us of any allergies or dietary restrictions before placing your order.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  4. Orders and Payment
                </h2>
                <p className="leading-relaxed">
                  All orders are subject to availability and confirmation of the order price. We accept various payment methods including 
                  mobile money and cash on delivery within Murang'a. Prices are subject to change without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  5. Delivery Policy
                </h2>
                <p className="leading-relaxed">
                  We provide delivery services within Murang'a town and surrounding areas. Delivery times may vary based on location and order volume. 
                  We are not responsible for delays due to weather conditions or other circumstances beyond our control.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  6. Contact Information
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at our Murang'a location or through our 
                  customer service channels.
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

export default Terms;
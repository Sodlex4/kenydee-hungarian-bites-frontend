
import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using Hungarian Bites services, you accept and agree to be bound by 
              the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Products and Services</h2>
            <p className="leading-relaxed">
              We offer Hungarian-style hot dog rolls and related food products. All products are 
              subject to availability. We reserve the right to limit quantities and discontinue 
              products at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Ordering and Payment</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>All orders are subject to acceptance and availability</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment is required at the time of order</li>
              <li>We accept mobile money, bank transfers, and cash on delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Delivery</h2>
            <p className="leading-relaxed">
              We provide delivery services within Nairobi and selected areas. Delivery times are 
              estimates and may vary based on location and order volume. We are not responsible 
              for delays due to circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cancellation and Refunds</h2>
            <p className="leading-relaxed">
              Orders can be cancelled within 30 minutes of placement. Refunds will be processed 
              for cancelled orders or in case of quality issues. Refund processing time may vary 
              depending on the payment method used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p className="leading-relaxed">
              Hungarian Bites shall not be liable for any indirect, incidental, special, or 
              consequential damages arising out of or in connection with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <p className="leading-relaxed">
              For questions about these Terms of Service, contact us at:
              <br />Email: legal@hungarianbites.co.ke
              <br />Phone: +254 (0) 700 123 456
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-400">
              Last updated: January 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;

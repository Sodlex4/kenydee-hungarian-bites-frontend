import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import BackToTop from '../../components/BackToTop';
import MobileBottomNav from '../../components/MobileBottomNav';
import { CartProvider } from '../../context/CartContext';
import { FileText, ShoppingCart, Truck, AlertTriangle, Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../../lib/env';

const Terms = () => {
  useEffect(() => {
    document.title = 'Terms of Service | Hungarian Bites';
  }, []);

  const lastUpdated = 'May 2026';

  const tableOfContents = [
    { id: 'agreement', title: 'Agreement to Terms' },
    { id: 'use-license', title: 'Use License' },
    { id: 'food-safety', title: 'Food Safety & Quality' },
    { id: 'orders-payment', title: 'Orders and Payment' },
    { id: 'delivery', title: 'Delivery Policy' },
    { id: 'cancellation', title: 'Cancellation & Refunds' },
    { id: 'limitation', title: 'Limitation of Liability' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'contact', title: 'Contact Information' },
  ];

  return (
    <CartProvider>
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="backdrop-blur-sm rounded-2xl p-8 border" style={{
            background: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))'
          }}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center" style={{
              color: 'hsl(var(--foreground))',
              fontFamily: 'Pacifico, cursive'
            }}>
              Terms of Service
            </h1>
            <p className="text-center mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Last updated: {lastUpdated}
            </p>

            <div className="grid md:grid-cols-[250px_1fr] gap-8">
              <div className="space-y-4">
                <div className="md:hidden">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        const el = document.getElementById(e.target.value);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="w-full h-12 rounded-lg border px-4 text-sm"
                    style={{
                      background: 'hsl(var(--input))',
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))',
                    }}
                    aria-label="Jump to section"
                  >
                    <option value="">Jump to section...</option>
                    {tableOfContents.map((item) => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                  </select>
                </div>
                <nav className="hidden md:block">
                  <div className="sticky top-28">
                    <h3 className="font-semibold mb-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      TABLE OF CONTENTS
                    </h3>
                    <ul className="space-y-2">
                      {tableOfContents.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-sm hover:underline transition-colors"
                            style={{ color: 'hsl(var(--foreground))' }}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="space-y-10" style={{ color: 'hsl(var(--foreground))' }}>
                <section id="agreement">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <FileText className="w-5 h-5" />
                    1. Agreement to Terms
                  </h2>
                  <p className="leading-relaxed">
                    By accessing and using Hungarian Bites services in Murang'a, Kenya, you accept and agree to be bound by these Terms of Service.
                    If you do not agree to abide by these terms, please do not use our services. These terms apply to all visitors, users, and
                    customers of our website and services.
                  </p>
                </section>

                <section id="use-license">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    2. Use License
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of the materials on Hungarian Bites' website for personal,
                    non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or public display</li>
                    <li>attempt to reverse engineer any software on the website</li>
                    <li>remove any copyright or proprietary notations</li>
                    <li>transfer materials to another person or "mirror" on another server</li>
                  </ul>
                </section>

                <section id="food-safety">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <AlertTriangle className="w-5 h-5" />
                    3. Food Safety & Quality
                  </h2>
                  <p className="leading-relaxed">
                    We are committed to providing high-quality Hungarian Hot Dog Rolls in Murang'a. All products are prepared following
                    strict food safety standards. Please inform us of any allergies or dietary restrictions before placing your order.
                    While we take every precaution, our products may contain or come into contact with common allergens including
                    gluten, dairy, and sesame.
                  </p>
                </section>

                <section id="orders-payment">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <ShoppingCart className="w-5 h-5" />
                    4. Orders and Payment
                  </h2>
                  <p className="leading-relaxed mb-4">
                    All orders are subject to availability and confirmation. We accept the following payment methods:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>M-Pesa</strong> - Mobile money transfer (preferred)</li>
                    <li><strong>Cash on Delivery</strong> - Available within Murang'a town</li>
                    <li><strong>Bank Transfer</strong> - For bulk/corporate orders</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Prices are displayed in Kenyan Shillings (KES) and are subject to change without notice.
                    We reserve the right to cancel any order at our discretion.
                  </p>
                </section>

                <section id="delivery">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <Truck className="w-5 h-5" />
                    5. Delivery Policy
                  </h2>
                  <p className="leading-relaxed">
                    We provide delivery services within Murang'a town and surrounding areas (within 15km). Delivery times typically range
                    from 30-90 minutes depending on order volume and location. We are not responsible for delays due to weather conditions,
                    road closures, or other circumstances beyond our control. Delivery fees may apply based on distance.
                  </p>
                </section>

                <section id="cancellation">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    6. Cancellation & Refunds
                  </h2>
                  <p className="leading-relaxed">
                    Orders can be cancelled within 10 minutes of placement for a full refund. After this window, cancellations are at our
                    discretion. Refunds for defective products or delivery issues will be processed within 3-5 business days via the
                    original payment method. We do not offer refunds for change of mind or incorrect orders placed by the customer.
                  </p>
                </section>

                <section id="limitation">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    7. Limitation of Liability
                  </h2>
                  <p className="leading-relaxed">
                    In no event shall Hungarian Bites be liable for any indirect, incidental, special, consequential, or punitive damages,
                    or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of our services.
                    Our total liability shall not exceed the amount paid by you for the specific order giving rise to the claim.
                  </p>
                </section>

                <section id="governing-law">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    8. Governing Law
                  </h2>
                  <p className="leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of Kenya. Any disputes arising under these
                    Terms shall be subject to the exclusive jurisdiction of the courts of Kenya. If any provision of these Terms is held
                    to be invalid, the remaining provisions shall continue in full force and effect.
                  </p>
                </section>

                <section id="contact">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <Phone className="w-5 h-5" />
                    9. Contact Information
                  </h2>
                  <p className="leading-relaxed mb-6">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="flex items-center gap-3 p-4 rounded-lg border transition-colors hover:scale-105"
                      style={{
                        background: 'hsl(var(--muted))',
                        borderColor: 'hsl(var(--border))'
                      }}
                    >
                      <Mail className="w-5 h-5 flex-shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                      <div>
                        <p className="font-medium text-sm">Email</p>
                        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {CONTACT_EMAIL}
                        </p>
                      </div>
                    </a>
                    <a
                      href={`tel:+${WHATSAPP_NUMBER}`}
                      className="flex items-center gap-3 p-4 rounded-lg border transition-colors hover:scale-105"
                      style={{
                        background: 'hsl(var(--muted))',
                        borderColor: 'hsl(var(--border))'
                      }}
                    >
                      <Phone className="w-5 h-5 flex-shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                      <div>
                        <p className="font-medium text-sm">Phone</p>
                        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          +254 759 233 065
                        </p>
                      </div>
                    </a>
                    <div
                      className="flex items-center gap-3 p-4 rounded-lg border"
                      style={{
                        background: 'hsl(var(--muted))',
                        borderColor: 'hsl(var(--border))'
                      }}
                    >
                      <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                      <div>
                        <p className="font-medium text-sm">Location</p>
                        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          Murang'a, Kenya
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: 'hsl(var(--border))' }}>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                These terms are governed by the laws of Kenya
              </p>
              <p className="text-sm mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Cart />
      <FloatingWhatsApp />
      <BackToTop />
      <MobileBottomNav />
    </div>
    </CartProvider>
  );
};

export default Terms;
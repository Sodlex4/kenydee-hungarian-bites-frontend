import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import BackToTop from '../../components/BackToTop';
import MobileBottomNav from '../../components/MobileBottomNav';
import { CartProvider } from '../../context/CartContext';
import { Mail, Phone, MapPin, Shield, Cookie, UserX, Globe } from 'lucide-react';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../../lib/env';

const Privacy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Hungarian Bites';
  }, []);

  const lastUpdated = 'May 2026';

  const tableOfContents = [
    { id: 'information-collect', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Your Information' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'children', title: 'Children\'s Privacy' },
    { id: 'contact', title: 'Contact Us' },
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
              Privacy Policy
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
                <section id="information-collect">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <Shield className="w-5 h-5" />
                    Information We Collect
                  </h2>
                  <p className="leading-relaxed mb-4">
                    When you use Hungarian Bites services in Murang'a, Kenya, we may collect the following types of information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Personal information (name, phone number, delivery address, email)</li>
                    <li>Order history, preferences, and special instructions</li>
                    <li>Payment information (processed securely via M-Pesa and third-party providers)</li>
                    <li>Communication records with our customer service team via WhatsApp/phone</li>
                    <li>Website usage data through cookies and analytics (Google Analytics)</li>
                  </ul>
                </section>

                <section id="how-we-use">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    How We Use Your Information
                  </h2>
                  <p className="leading-relaxed mb-4">
                    We use the collected information for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders accurately and efficiently</li>
                    <li>Communicate with you about your orders and delivery updates</li>
                    <li>Improve our products, services, and website experience</li>
                    <li>Send promotional offers and updates (only with your consent)</li>
                    <li>Ensure food safety, quality control, and allergy management</li>
                    <li>Comply with legal obligations under the Kenya Data Protection Act 2019</li>
                  </ul>
                </section>

                <section id="third-party">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <Globe className="w-5 h-5" />
                    Third-Party Services
                  </h2>
                  <p className="leading-relaxed mb-4">
                    We integrate with the following third-party services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>WhatsApp</strong> - Order communication and customer support (Meta Platforms Inc.)</li>
                    <li><strong>Google Analytics</strong> - Website traffic analysis and user behavior insights</li>
                    <li><strong>Unsplash</strong> - High-quality images displayed on our website</li>
                    <li><strong>M-Pesa</strong> - Mobile payment processing (Safaricom PLC)</li>
                    <li><strong>Vercel</strong> - Website hosting and deployment infrastructure</li>
                  </ul>
                  <p className="leading-relaxed mt-4 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    These services have their own privacy policies. We encourage you to review them.
                  </p>
                </section>

                <section id="information-sharing">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    Information Sharing
                  </h2>
                  <p className="leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                    except as described in this policy. We may share information with trusted partners who assist us in operating
                    our website, conducting our business, or serving our customers in Murang'a, Kenya, as long as those parties agree to
                    keep this information confidential and comply with the Kenya Data Protection Act 2019.
                  </p>
                </section>

                <section id="data-security">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    Data Security
                  </h2>
                  <p className="leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information against
                    unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                    or electronic storage is 100% secure, so we cannot guarantee absolute security. We regularly review our security
                    practices to ensure your data remains protected.
                  </p>
                </section>

                <section id="cookies">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <Cookie className="w-5 h-5" />
                    Cookies and Tracking
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Our website uses cookies and similar tracking technologies to enhance your experience:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential cookies</strong> - Required for basic site functionality</li>
                    <li><strong>Analytics cookies</strong> - Help us understand how visitors use our site (Google Analytics)</li>
                    <li><strong>Preference cookies</strong> - Remember your settings and preferences</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    You can choose to have your computer warn you each time a cookie is being sent, or you can
                    choose to turn off all cookies through your browser settings. Note that disabling cookies may affect
                    your website experience.
                  </p>
                </section>

                <section id="your-rights">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    Your Rights
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Under the Kenya Data Protection Act 2019, you have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Correct any inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information (subject to legal requirements)</li>
                    <li>Object to or restrict processing of your personal data</li>
                    <li>Opt-out of marketing communications at any time</li>
                    <li>Data portability - receive your data in a structured format</li>
                    <li>File a complaint with the Office of the Data Protection Commissioner of Kenya</li>
                  </ul>
                </section>

                <section id="data-retention">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    Data Retention
                  </h2>
                  <p className="leading-relaxed">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy,
                    unless a longer retention period is required by law. Order records are typically kept for 7 years for tax and
                    accounting purposes. You may request deletion of your data at any time, subject to these legal requirements.
                  </p>
                </section>

                <section id="children">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--accent))' }}>
                    <UserX className="w-5 h-5" />
                    Children's Privacy
                  </h2>
                  <p className="leading-relaxed">
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
                    information from children under 18. If you are a parent or guardian and believe your child has provided us
                    with personal information, please contact us immediately. If we become aware that we have collected personal
                    information from a child under 18 without parental consent, we will take steps to remove that information.
                  </p>
                </section>

                <section id="contact">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    Contact Us
                  </h2>
                  <p className="leading-relaxed mb-6">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
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
              <p className="text-sm mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                This policy complies with the Kenya Data Protection Act 2019
              </p>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
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

export default Privacy;
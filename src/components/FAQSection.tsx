import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/env';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I place an order?',
    answer: 'You can order directly through our website by selecting your preferred package and clicking "Add to Cart", or you can order via WhatsApp by clicking the green chat button. We\'ll confirm your order and delivery details promptly.'
  },
  {
    question: 'What areas do you deliver to?',
    answer: 'We currently offer free delivery within Murang\'a Town. For locations outside this area, please contact us via WhatsApp to arrange delivery and discuss any additional charges.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Orders are delivered within 2 hours of confirmation. We prepare your hot dog rolls fresh upon receiving your order to ensure the best taste and quality.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa, cash on delivery, and bank transfers. Payment details will be confirmed when you place your order.'
  },
  {
    question: 'Is there a minimum order?',
    answer: 'Yes, the minimum order is 5 pieces (Ksh 350). We also offer packages of 10 pieces (Ksh 650) and 20 pieces (Ksh 1,200) for better value.'
  },
  {
    question: 'Are the hot dog rolls halal?',
    answer: 'Please contact us directly via WhatsApp for specific ingredient information and halal certification details. We\'re happy to provide all the information you need.'
  },
  {
    question: 'Can I order for events or parties?',
    answer: 'Absolutely! We cater for events, parties, and gatherings. For bulk orders (50+ pieces), please contact us via WhatsApp for special pricing and arrangements.'
  },
  {
    question: 'How should I store leftover hot dog rolls?',
    answer: 'Store in an airtight container in the refrigerator and reheat in an oven or air fryer at 180°C for 5-7 minutes to restore the crispy texture. Microwave reheating is not recommended as it may make them soft.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom, hsl(270 40% 8%), hsl(330 30% 10%), hsl(270 40% 8%))'
    }}>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="badge-chip">
            Una Doubt?
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
            Frequently <span className="text-gradient-primary">Asked</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
            All the deets you need.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: openIndex === index ? 'hsl(var(--card) / 0.5)' : 'hsl(var(--card) / 0.3)',
                borderColor: 'hsl(var(--primary) / 0.2)'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold pr-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300" style={{
                  background: openIndex === index ? 'var(--gradient-primary)' : 'hsl(var(--muted) / 0.5)'
                }}>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5" style={{ color: 'hsl(var(--muted-foreground))' }} />
                  )}
                </div>
              </button>
              <div className={`accordion-grid ${openIndex === index ? 'open' : ''}`}>
                <div>
                  <p className="px-6 pb-6 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Still have questions?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello!%20I%20have%20a%20question%20about%20Hungarian%20Hot%20Dog%20Rolls.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 text-white"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: '0 10px 30px hsl(var(--primary) / 0.3)'
            }}
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

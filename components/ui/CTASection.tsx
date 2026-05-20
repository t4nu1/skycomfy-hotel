import Link from 'next/link';
import SectionWrapper from '@/components/ui/SectionWrapper';

const WHATSAPP_URL = 'https://wa.me/254747118328';

interface CTASectionProps {
  headline?: string;
  subtext?: string;
}

export default function CTASection({
  headline = 'Experience Comfort, Elegance, and Exceptional Hospitality',
  subtext = 'Ready to make your reservation or have a question? We are here to help.',
}: CTASectionProps) {
  return (
    <SectionWrapper>
      <section className="bg-primary py-section px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="font-serif text-display-md text-accent mb-4 leading-tight">
            {headline}
          </h2>

          {/* Subtext */}
          {subtext && (
            <p className="font-sans text-base text-white/80 mb-10 max-w-xl mx-auto">
              {subtext}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Book Your Stay */}
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-light text-primary font-sans font-semibold text-sm px-8 py-3 rounded-btn shadow-btn transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Book Your Stay
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white/60 hover:border-white text-white font-sans font-semibold text-sm px-8 py-3 rounded-btn transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact Us
            </Link>

            {/* WhatsApp Inquiry */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send a WhatsApp inquiry to SKYCOMFY HOTEL KITALE"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-semibold text-sm px-8 py-3 rounded-btn transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            >
              {/* WhatsApp icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

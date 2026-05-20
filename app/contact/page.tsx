'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import PageFadeIn from '@/components/ui/PageFadeIn';
import SectionWrapper from '@/components/ui/SectionWrapper';
import type { ContactFormData, ContactFormErrors } from '@/types';

const WHATSAPP_NUMBER = '254747118328';
const MAP_IFRAME_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4682056157813!2d34.99616787496695!3d1.0191599989679659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1782276cb0db7ad3%3A0xe543eaec166d1f05!2sKitale!5e0!3m2!1sen!2ske!4v1716200000000!5m2!1sen!2ske';

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'Room Reservation',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user begins correcting it
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Client-Side Validation
  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select or enter an inquiry subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please type a short message detailing your request.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message details should be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // Reset form to send another inquiry
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Room Reservation',
      message: '',
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <PageFadeIn>
      {/* 1. HERO COVER */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center bg-primary text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600"
            alt="Skycomfy reception counter and hospitality team background"
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-primary/45" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs md:text-sm font-semibold tracking-widest text-accent uppercase mb-3 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Contact & Reservations
          </motion.h1>
        </div>
      </section>

      {/* 2. CONTACT COLUMNS SECTION */}
      <section className="bg-background py-16 px-4 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Contact Cards & Embedded Map (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <SectionWrapper direction="left">
                <div className="flex flex-col gap-6">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                    Connect With Our Managers
                  </h2>
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    Have questions about room rates, availability, dining menus, or hosting garden weddings? Reach out to us using any channel.
                  </p>

                  <div className="flex flex-col gap-4 mt-2">
                    {/* Call Card */}
                    <div className="flex items-start gap-4 p-4 bg-surface rounded-card border border-border shadow-sm">
                      <div className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0">
                        <Phone size={18} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                          Call Reservations
                        </span>
                        <a href="tel:+254747118328" className="font-sans text-sm text-muted hover:text-accent transition-colors duration-200">
                          +254 747 118 328
                        </a>
                        <a href="tel:+254719530249" className="font-sans text-sm text-muted hover:text-accent transition-colors duration-200">
                          +254 719 530 249
                        </a>
                      </div>
                    </div>

                    {/* Email Card */}
                    <div className="flex items-start gap-4 p-4 bg-surface rounded-card border border-border shadow-sm">
                      <div className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0">
                        <Mail size={18} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                          Email Enquiries
                        </span>
                        <a href="mailto:info@skycomfyhotel.com" className="font-sans text-sm text-muted hover:text-accent transition-colors duration-200 break-all">
                          info@skycomfyhotel.com
                        </a>
                      </div>
                    </div>

                    {/* Location Card */}
                    <div className="flex items-start gap-4 p-4 bg-surface rounded-card border border-border shadow-sm">
                      <div className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                          Physical Address
                        </span>
                        <p className="font-sans text-sm text-muted leading-relaxed">
                          Off Kitale-Kapenguria Highway,
                          <br />
                          Kitale, Kenya, 30200
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionWrapper>

              {/* Styled Maps iframe */}
              <SectionWrapper direction="left" delay={0.2}>
                <div className="relative aspect-[4/3] w-full rounded-card overflow-hidden border border-border shadow-card bg-primary/5">
                  <iframe
                    src={MAP_IFRAME_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="SKYCOMFY HOTEL KITALE location map"
                    aria-label="Google Maps physical position display"
                  />
                </div>
              </SectionWrapper>
            </div>

            {/* RIGHT COLUMN: Interactive Form (7 Cols) */}
            <div className="lg:col-span-7 w-full">
              <SectionWrapper direction="right">
                <div className="bg-surface rounded-card border border-border p-6 md:p-10 shadow-card">
                  
                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                        noValidate
                      >
                        <div className="flex flex-col gap-2 mb-2">
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                            Send Booking Inquiry
                          </h3>
                          <p className="font-sans text-xs md:text-sm text-muted">
                            Complete the fields below and we&apos;ll reply to your email or call you back directly within 1 hour.
                          </p>
                        </div>

                        {/* Name input */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="form-name" className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                            Full Name *
                          </label>
                          <input
                            id="form-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full bg-background border rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors ${
                              errors.name ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                            }`}
                          />
                          {errors.name && (
                            <span className="font-sans text-xs text-red-500 flex items-center gap-1 mt-0.5">
                              <AlertCircle size={12} />
                              {errors.name}
                            </span>
                          )}
                        </div>

                        {/* Email / Phone side-by-side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Email input */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="form-email" className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                              Email Address *
                            </label>
                            <input
                              id="form-email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              className={`w-full bg-background border rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors ${
                                errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                              }`}
                            />
                            {errors.email && (
                              <span className="font-sans text-xs text-red-500 flex items-center gap-1 mt-0.5">
                                <AlertCircle size={12} />
                                {errors.email}
                              </span>
                            )}
                          </div>

                          {/* Phone input */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="form-phone" className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                              Phone Number (Optional)
                            </label>
                            <input
                              id="form-phone"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+254 7XX XXX XXX"
                              className="w-full bg-background border border-border focus:border-accent rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        {/* Subject Select */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="form-subject" className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                            Subject of Inquiry *
                          </label>
                          <select
                            id="form-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-background border border-border focus:border-accent rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors appearance-none cursor-pointer"
                          >
                            <option value="Room Reservation">Room & Stay Reservation</option>
                            <option value="Garden Venue Event">Garden Venue & Weddings</option>
                            <option value="Conference Facility">Conference & Business Events</option>
                            <option value="General Question">General Inquiry</option>
                          </select>
                        </div>

                        {/* Message input */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="form-message" className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                            Your Message *
                          </label>
                          <textarea
                            id="form-message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Type details about your inquiry here (e.g. check-in/out dates, guest counts, wedding layout requests...)"
                            className={`w-full bg-background border rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors resize-y ${
                              errors.message ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                            }`}
                          />
                          {errors.message && (
                            <span className="font-sans text-xs text-red-500 flex items-center gap-1 mt-0.5">
                              <AlertCircle size={12} />
                              {errors.message}
                            </span>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 bg-primary hover:bg-primary-light text-white font-sans font-bold text-sm rounded-btn shadow-md flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-75 cursor-pointer mt-2"
                        >
                          {isSubmitting ? (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send size={15} />
                              Send Inquiry
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      /* Stunning Success Screen */
                      <motion.div
                        key="success-screen"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8 flex flex-col items-center gap-6"
                      >
                        <div className="h-16 w-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center shadow-inner">
                          <CheckCircle2 size={36} strokeWidth={2.5} />
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          <span className="font-sans text-xs font-bold text-accent uppercase tracking-widest flex items-center justify-center gap-1">
                            <Sparkles size={12} className="fill-accent" />
                            Delivery Successful
                          </span>
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                            Thank You, {formData.name}!
                          </h3>
                          <p className="font-sans text-sm text-muted leading-relaxed max-w-md mx-auto">
                            We have received your reservation inquiry. Our booking desk will review the details and reach out to you via <strong>{formData.email}</strong> within 1–2 hours.
                          </p>
                        </div>

                        {/* Success Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Skycomfy%20Hotel%20Kitale,%20my%20name%20is%20${encodeURIComponent(formData.name)}.%20I%20just%20submitted%20a%20website%20inquiry%20for%20a%20${encodeURIComponent(formData.subject)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-bold text-sm rounded-btn transition-colors duration-200"
                          >
                            <MessageCircle size={16} className="fill-white" />
                            Follow up on WhatsApp
                          </a>
                          
                          <button
                            onClick={handleReset}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent border-2 border-primary/20 hover:border-primary/50 text-primary font-sans font-semibold text-sm rounded-btn transition-colors duration-200 cursor-pointer"
                          >
                            Send Another Message
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </SectionWrapper>
            </div>

          </div>
        </div>
      </section>
    </PageFadeIn>
  );
}

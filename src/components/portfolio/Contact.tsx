'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { profile } from '@/lib/data';
import { toast } from '../ui/toaster';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { cn } from '@/lib/utils';

const COUNTRY_CODES = [
  { code: '+91', name: 'India' },
  { code: '+1', name: 'USA/Canada' },
  { code: '+44', name: 'UK' },
  { code: '+61', name: 'Australia' },
  { code: '+971', name: 'UAE' },
];

export function Contact() {
  const db = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    subject: '',
    message: '',
    honeypot: '',
  });

  const socialLinks = [
    { icon: Mail, href: `mailto:${profile.email}`, label: profile.email },
    { icon: Linkedin, href: "#", label: "LinkedIn Profile" },
    { icon: Github, href: "#", label: "GitHub Profile" },
    { icon: MapPin, href: "#", label: profile.location },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Sanitize phone number: digits only, max 10
    if (name === 'phone') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Focus and scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      toast({ 
        variant: "destructive", 
        title: "Validation Error", 
        description: "Please correct the highlighted fields." 
      });
      return;
    }

    setIsSubmitting(true);
    
    const firestoreData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      countryCode: formData.countryCode,
      subject: formData.subject.trim(),
      message: formData.message.trim() || null,
      createdAt: serverTimestamp(),
      status: 'unread'
    };

    const timestampIST = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const web3FormsData = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "ccdd135d-3d05-4ae6-a82d-2e150fe4dc36",
      from_name: "Abhay Kumar | Portfolio Contact Form",
      subject: `New Portfolio Enquiry | ${formData.subject.trim()} | Abhay Kumar Portfolio`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: `${formData.countryCode} ${formData.phone.trim()}`,
      country_code: formData.countryCode,
      inquiry_subject: formData.subject.trim(),
      message: formData.message.trim() || "No message provided",
      replyto: formData.email.trim(),
      submitted_at: `${timestampIST} (IST)`,
    };

    const contactRef = collection(db, 'contactMessages');

    try {
      // 1. Primary Operation: Save to Firestore
      await addDoc(contactRef, firestoreData);
      
      // 2. Success Feedback
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>Message Sent Successfully!</span>
          </div>
        ),
        description: "Your enquiry has been received. I'll get back to you soon.",
      });

      // 3. Reset form
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        countryCode: '+91', 
        subject: '', 
        message: '', 
        honeypot: '' 
      });
      setErrors({});

      // 4. Secondary Operation: Attempt Web3Forms independently
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(web3FormsData),
      })
      .then(async (response) => {
        const result = await response.json();
        if (!result.success) {
          console.info("Web3Forms Notification Fallback: Message stored in DB, but email notification failed.", result.message);
        }
      })
      .catch((emailErr) => {
        console.info("Web3Forms Network Fallback: Message stored in DB, but email notification network failed.");
      });

    } catch (err) {
      const permissionError = new FirestorePermissionError({
        path: contactRef.path,
        operation: 'create',
        requestResourceData: firestoreData,
      } satisfies SecurityRuleContext);
      
      errorEmitter.emit('permission-error', permissionError);
      
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertCircle size={18} />
            <span>Submission Failed</span>
          </div>
        ),
        description: "Something went wrong saving your message. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Let's Build Something Great Together</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-md">
              I'm open to Full Stack Developer, React.js Developer and Next.js Developer opportunities.
            </p>

            <div className="space-y-6">
              {socialLinks.map((link, i) => (
                <a 
                  key={i}
                  href={link.href}
                  className="flex items-center gap-4 group hover:translate-x-2 transition-transform w-fit"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all shrink-0">
                    <link.icon className="text-primary" size={20} />
                  </div>
                  <span className="text-sm md:text-base text-muted-foreground group-hover:text-primary transition-colors font-medium break-all">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-8 lg:p-6 rounded-2xl md:rounded-[2.5rem] w-full lg:mt-0 lg:p-4 scroll-mt-24 md:scroll-mt-0"
          >
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 lg:space-y-3">
              <div className="hidden">
                <input 
                  type="text" 
                  name="honeypot" 
                  value={formData.honeypot} 
                  onChange={handleChange} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-3">
                <div className="space-y-2 lg:space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base",
                      errors.name && "border-destructive focus:border-destructive"
                    )}
                  />
                  {errors.name && <p className="text-destructive text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.name}</p>}
                </div>
                <div className="space-y-2 lg:space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base",
                      errors.email && "border-destructive focus:border-destructive"
                    )}
                  />
                  {errors.email && <p className="text-destructive text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2 lg:space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Phone Number *</label>
                <div className="flex items-center gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className={cn(
                      "w-[70px] md:w-[80px] shrink-0 bg-white/5 border border-white/10 rounded-xl px-2 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base cursor-pointer",
                      errors.phone && "border-destructive focus:border-destructive"
                    )}
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.code} value={c.code} className="bg-[#0d1117] text-white">{c.code}</option>
                    ))}
                  </select>
                  <input 
                    type="tel" 
                    name="phone"
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={cn(
                      "flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base",
                      errors.phone && "border-destructive focus:border-destructive"
                    )}
                  />
                </div>
                {errors.phone && <p className="text-destructive text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.phone}</p>}
              </div>

              <div className="space-y-2 lg:space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Subject *</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base",
                    errors.subject && "border-destructive focus:border-destructive"
                  )}
                />
                {errors.subject && <p className="text-destructive text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.subject}</p>}
              </div>

              <div className="space-y-2 lg:space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Message (Optional)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 lg:py-2 lg:h-24 lg:min-h-[80px] focus:outline-none focus:border-primary transition-colors resize-none text-sm md:text-base"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3.5 md:py-4 lg:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base active:scale-95 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

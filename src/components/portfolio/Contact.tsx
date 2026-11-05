'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Search,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { profile } from '@/lib/data';
import { toast } from '../ui/toaster';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { cn } from '@/lib/utils';

// Comprehensive Country Data
const COUNTRIES = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
];

import { useTheme } from '@/providers/theme-provider';

export function Contact() {
  const { theme } = useTheme();
  const isCyberpunk = theme === 'cyberpunk';
  const db = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Country Selector State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [opensUp, setOpensUp] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const socialLinks = [
    { icon: Mail, href: `mailto:${profile.email}`, label: profile.email },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/abhay-kumar-5aa8b5230/", 
      label: "LinkedIn Profile",
      isExternal: true 
    },
    { icon: Github, href: "#", label: "GitHub Profile" },
    { icon: MapPin, href: "#", label: profile.location },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search when dropdown opens & calculate positioning
  useEffect(() => {
    if (isDropdownOpen) {
      if (searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      
      // Intelligent Positioning Logic
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        // If space below is limited (less than 400px) and there's more space above, open upwards.
        setOpensUp(spaceBelow < 400 && spaceAbove > spaceBelow);
      }
    }
  }, [isDropdownOpen]);

  const filteredCountries = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return COUNTRIES;
    return COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.dialCode.includes(query)
    );
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
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
      countryCode: selectedCountry.dialCode,
      countryName: selectedCountry.name,
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
      subject: `New Portfolio Inquiry | ${formData.subject.trim()} | Abhay Kumar Portfolio`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: `${selectedCountry.dialCode} ${formData.phone.trim()}`,
      country: selectedCountry.name,
      inquiry_subject: formData.subject.trim(),
      message: formData.message.trim() || "No message provided",
      replyto: formData.email.trim(),
      submitted_at: `${timestampIST} (IST)`,
    };

    const contactRef = collection(db, 'contactMessages');

    try {
      await addDoc(contactRef, firestoreData);
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

      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '', 
        honeypot: '' 
      });
      setErrors({});

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(web3FormsData),
      }).catch(console.error);

    } catch (err) {
      const permissionError = new FirestorePermissionError({
        path: contactRef.path,
        operation: 'create',
        requestResourceData: firestoreData,
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please check your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            {isCyberpunk && (
              <span className="text-xs font-mono text-primary mb-2 block tracking-wider">{"// 05. $ nc -vz connect 2026"}</span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">Let's Build Something Great Together</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-md">
              I'm open to Full Stack Developer, React.js Developer and Next.js Developer opportunities.
            </p>

            <div className="space-y-6">
              {socialLinks.map((link, i) => (
                <a 
                  key={i}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
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
                  onChange={() => {}} 
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
                      "w-full bg-muted/40 border border-border text-foreground rounded-xl px-4 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base",
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
                      "w-full bg-muted/40 border border-border text-foreground rounded-xl px-4 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base",
                      errors.email && "border-destructive focus:border-destructive"
                    )}
                  />
                  {errors.email && <p className="text-destructive text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2 lg:space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Phone Number *</label>
                <div className="flex items-center gap-2 relative">
                  {/* Premium Country Selector */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      ref={triggerRef}
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={cn(
                        "w-[70px] flex items-center justify-center gap-1 bg-muted/40 border border-border text-foreground rounded-xl py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base cursor-pointer hover:bg-muted",
                        isDropdownOpen && "border-primary",
                        errors.phone && "border-destructive"
                      )}
                    >
                      <span>{selectedCountry.dialCode}</span>
                      <ChevronDown size={14} className={cn("transition-transform", isDropdownOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: opensUp ? 10 : -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: opensUp ? 10 : -10, scale: 0.95 }}
                          className={cn(
                            "absolute left-0 w-[280px] sm:w-[320px] bg-card border border-border text-foreground rounded-2xl shadow-2xl z-[150] overflow-hidden",
                            opensUp ? "bottom-full mb-2" : "top-full mt-2"
                          )}
                        >
                          {/* Fixed Search Header */}
                          <div className="p-3 border-b border-border bg-muted/20 shrink-0">
                            <div className="relative">
                              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <input 
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search country or code..."
                                className="w-full bg-muted/40 border border-border text-foreground rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                                onKeyDown={(e) => {
                                  if (e.key === 'Escape') setIsDropdownOpen(false);
                                  e.stopPropagation();
                                }}
                              />
                            </div>
                          </div>

                          {/* Independently Scrollable Country List */}
                          <div 
                            className="max-h-[min(360px,52dvh)] overflow-y-auto custom-scrollbar p-1 overscroll-contain"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                          >
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setIsDropdownOpen(false);
                                    setSearchQuery('');
                                  }}
                                  className={cn(
                                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors hover:bg-muted/50 group text-foreground",
                                    selectedCountry.code === country.code && "bg-primary/10 text-primary"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-base">{country.flag}</span>
                                    <span className="font-medium group-hover:text-primary transition-colors">{country.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground font-mono">{country.dialCode}</span>
                                    {selectedCountry.code === country.code && <Check size={14} />}
                                  </div>
                                </button>
                              ))
                            ) : (
                              <div className="py-8 text-center text-muted-foreground text-xs">
                                No country found.
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <input 
                    type="tel" 
                    name="phone"
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={cn(
                      "flex-1 min-w-0 bg-muted/40 border border-border text-foreground rounded-xl px-4 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base",
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
                    "w-full bg-muted/40 border border-border text-foreground rounded-xl px-4 py-3 lg:py-2 focus:outline-none focus:border-primary transition-colors text-sm md:text-base",
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
                  className="w-full bg-muted/40 border border-border text-foreground rounded-xl px-4 py-3 lg:py-2 lg:h-24 lg:min-h-[80px] focus:outline-none focus:border-primary transition-colors resize-none text-sm md:text-base"
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

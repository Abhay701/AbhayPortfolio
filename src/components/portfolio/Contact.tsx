'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Loader2 } from 'lucide-react';
import { profile } from '@/lib/data';
import { toast } from '../ui/toaster';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Valid email is required";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!formData.subject.trim()) return "Subject is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    const error = validateForm();
    if (error) {
      toast({ variant: "destructive", title: "Validation Error", description: error });
      return;
    }

    setIsSubmitting(true);
    const contactRef = collection(db, 'contactMessages');
    
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

    addDoc(contactRef, firestoreData)
      .then(() => {
        toast({
          title: "Message Submitted!",
          description: "Your message has been submitted successfully!",
        });
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          countryCode: '+91', 
          subject: '', 
          message: '', 
          honeypot: '' 
        });
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: contactRef.path,
          operation: 'create',
          requestResourceData: firestoreData,
        } satisfies SecurityRuleContext);
        
        errorEmitter.emit('permission-error', permissionError);
        
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "Permission denied. Check Firestore security rules.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2.5rem] w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Phone Number *</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full sm:w-32 bg-white/5 border border-white/10 rounded-xl px-2 py-3 focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.code} value={c.code} className="bg-[#0d1117] text-white">{c.code} ({c.name})</option>
                    ))}
                  </select>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Subject *</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Message (Optional)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none text-sm md:text-base"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base active:scale-95"
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

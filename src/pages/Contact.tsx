import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="bg-background min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-6">Contact Us</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch for any questions or support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-sage/30 rounded-3xl p-8 md:p-12 h-full">
              <h3 className="font-serif text-3xl text-primary mb-8">Get in Touch</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-white p-4 rounded-full text-primary shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-primary mb-1">Call Us</h4>
                    <p className="text-text-muted mb-2">Mon-Sat, 9am to 6pm</p>
                    <a href="tel:+9190989090909" className="text-accent hover:text-primary font-semibold transition-colors">+91 90989090909</a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-white p-4 rounded-full text-primary shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-primary mb-1">Email Us</h4>
                    <p className="text-text-muted mb-2">We'll reply within 24 hours</p>
                    <a href="mailto:support@herbaldeck.com" className="text-accent hover:text-primary font-semibold transition-colors">support@herbaldeck.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-white p-4 rounded-full text-primary shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-primary mb-1">Our Location</h4>
                    <p className="text-text-muted">Indore, Madhya Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            <h3 className="font-serif text-3xl text-primary mb-8">Send a Message</h3>
            
            {isSubmitted ? (
              <div className="bg-sage/50 text-primary p-6 rounded-2xl text-center">
                <h4 className="font-medium text-xl mb-2">Thank you!</h4>
                <p>Your message has been sent successfully. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-main mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-main mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit Indian mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <p className="text-xs text-text-muted">
                  * This form saves data locally for demonstration purposes only.
                </p>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center group"
                >
                  Send Message
                  <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

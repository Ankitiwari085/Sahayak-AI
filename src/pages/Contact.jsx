import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdEmail, MdPhone, MdAccessTime } from 'react-icons/md';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const contactCards = [
    {
      icon: MdEmail,
      title: "Email Us",
      info: "support@sahayakai.com",
      subInfo: "We'll respond within 24 hours",
      color: "blue",
      link: "mailto:support@sahayakai.com"
    },
    {
      icon: MdPhone,
      title: "Call Us",
      info: "+91 98765 43210",
      subInfo: "Mon-Fri, 9 AM - 6 PM IST",
      color: "green",
      link: "tel:+919876543210"
    },
    {
      icon: HiOutlineLocationMarker,
      title: "Visit Office",
      info: "123 Innovation Hub, Tech Park",
      subInfo: "Bengaluru, Karnataka, India",
      color: "purple",
      link: "#"
    },
    {
      icon: MdAccessTime,
      title: "Business Hours",
      info: "Monday - Friday",
      subInfo: "9:00 AM - 6:00 PM IST",
      color: "orange",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, name: "LinkedIn", url: "#", color: "from-blue-600 to-blue-700" },
    { icon: FaGithub, name: "GitHub", url: "#", color: "from-gray-700 to-gray-900" },
    { icon: FaTwitter, name: "Twitter", url: "#", color: "from-sky-500 to-sky-600" },
    { icon: FaFacebook, name: "Facebook", url: "#", color: "from-blue-500 to-blue-600" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors pt-16">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-4 py-16 md:py-20"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-xl">
              💬
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Have questions, feedback, or need support? We're here to help! 
            Reach out to us through any of the channels below and our team will get back to you as soon as possible.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Cards Grid */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactCards.map((card, index) => {
            const colorClasses = {
              blue: "from-blue-500 to-blue-600",
              green: "from-green-500 to-green-600",
              purple: "from-purple-500 to-purple-600",
              orange: "from-orange-500 to-orange-600"
            };

            return (
              <motion.a
                key={index}
                href={card.link}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[card.color]} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300`}>
                  <card.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">
                  {card.info}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.subInfo}
                </p>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* Main Contact Section */}
      <section className="bg-white dark:bg-slate-800 py-16 md:py-20 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          >
            {/* Contact Form */}
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-700 dark:to-slate-600 p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-300"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-300"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-300 resize-none"
                      required
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiSend className="text-xl" />
                    Send Message
                  </motion.button>

                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center">
                    <FiClock />
                    <span>We typically respond within 24 hours</span>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Image and Social Links */}
            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8 rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800&h=600&fit=crop"
                  alt="Contact us"
                  className="w-full h-80 object-cover"
                />
              </motion.div>

              {/* Social Media Links */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 p-8 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Connect With Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Follow us on social media for updates, tips, and success stories
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-br ${social.color} p-4 rounded-xl flex items-center gap-3 text-white shadow-md hover:shadow-xl transition-all duration-300`}
                    >
                      <social.icon className="text-2xl" />
                      <span className="font-semibold">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* FAQ Quick Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Need Quick Answers?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Check out our FAQ section for instant solutions to common questions
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Visit FAQ
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-3xl overflow-hidden shadow-2xl h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <HiOutlineLocationMarker className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300 font-semibold">
                Interactive Map Coming Soon
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                123 Innovation Hub, Tech Park, Bengaluru
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

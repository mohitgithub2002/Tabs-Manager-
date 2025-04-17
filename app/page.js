'use client';

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Chrome, AppleIcon as Safari } from "lucide-react"
import { useSession, signIn } from "next-auth/react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src="/tabmaster-icon.png" alt="TabMaster Icon" width={32} height={32} />
              <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9]">
                Tab Manager
              </span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {[
                { name: "Features", href: "#features" },
                { name: "About", href: "#about" },
                { name: "Pricing", href: "#pricing" },
                { name: "Privacy Policy", href: "/privacy-policy" }
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              {status === "authenticated" ? (
                <motion.a
                  href="/collections"
                  className="bg-gradient-to-r from-[#4F46E5] to-[#0ea5e9] text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go to Collections
                </motion.a>
              ) : (
                <motion.button
                  onClick={() => signIn()}
                  className="bg-gradient-to-r from-[#4F46E5] to-[#0ea5e9] text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              )}
              
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-2xl mx-auto text-center mb-16"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
              variants={fadeIn}
            >
              Master Your Tabs,
              <br />
              Boost Productivity
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              variants={fadeIn}
            >
              The smart way to organize and access your browser tabs.
              Save time and stay focused with our intelligent tab management.
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              variants={fadeIn}
            >
              <motion.a
                href="https://chromewebstore.google.com/detail/klmmgbmpeabaapnkdjkjhjohbkodnbjm"
                className="bg-gradient-to-r from-[#4F46E5] to-[#0ea5e9] text-white px-8 py-3 rounded-full text-lg font-medium hover:shadow-xl hover:shadow-blue-500/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Install Extension
              </motion.a>
              <motion.a
                href="#features"
                className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-medium border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Product Screenshot */}
          <motion.div 
            className="relative max-w-5xl mx-auto"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
            <motion.div 
              className="relative rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl bg-white"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/tabmaster-interface.png"
                alt="TabMaster Interface"
                width={1904}
                height={937}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Browser Compatibility */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-gray-500 mb-4">AVAILABLE ON ALL MAJOR BROWSERS</p>
            <motion.div 
              className="flex justify-center space-x-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[Chrome,  Safari].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-8 h-8 text-gray-600" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1] to-[#4F46E5]"></div>
        <motion.div 
          className="container mx-auto px-4 relative"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            variants={fadeIn}
          >
            Powerful Features for Power Users
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Tab Manager?
            </h2>
            <p className="text-xl text-gray-600">
              We're on a mission to revolutionize how you manage your browser tabs and boost your productivity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe that managing browser tabs should be effortless and intuitive. Our extension is designed to help you stay organized, focused, and productive in your daily browsing activities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Save up to 2 hours daily on tab management
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Reduce browser memory usage by up to 40%
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Access your tabs from any device, anywhere
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Enterprise-grade security and privacy
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that works best for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Free Plan</h3>
                <p className="text-4xl font-bold text-gray-900 mb-2">$0</p>
                <p className="text-gray-500">Forever free</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Unlimited tab collections</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic search functionality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Cross-device sync</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Community support</span>
                </li>
              </ul>
              <motion.a
                href="https://chromewebstore.google.com/detail/klmmgbmpeabaapnkdjkjhjohbkodnbjm"
                className="block w-full bg-gradient-to-r from-[#4F46E5] to-[#0ea5e9] text-white text-center py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Free
              </motion.a>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-[#4F46E5] to-[#0ea5e9] p-8 rounded-2xl shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-white/10 w-32 h-32 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 bg-white/10 w-32 h-32 rounded-full transform -translate-x-16 translate-y-16"></div>
              <div className="relative text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Enterprise Plan</h3>
                <p className="text-4xl font-bold text-white mb-2">Custom</p>
                <p className="text-white/80">Tailored to your needs</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white">Everything in Free Plan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white">Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white">Team collaboration</span>
                </li>
              </ul>
              <motion.a
                href="mailto:contact@revenuelogy.com"
                className="block w-full bg-white text-[#4F46E5] text-center py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Sales
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Image src="/tabmaster-icon.png" alt="TabMaster Icon" width={32} height={32} />
              <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9]">
                Tab Manager
              </span>
            </motion.div>
            <div className="flex space-x-6 text-sm text-gray-500 mt-4 md:mt-0">
              <motion.a
                href="/privacy-policy"
                className="hover:text-gray-900"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/terms"
                className="hover:text-gray-900"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Smart Organization",
    description: "Automatically categorize and group your tabs based on content and usage patterns.",
    icon: "📊",
  },
  {
    title: "Instant Search",
    description: "Find any saved tab instantly with powerful search capabilities across all sessions.",
    icon: "🔍",
  },
  {
    title: "Cross-Device Sync",
    description: "Access your tabs from anywhere. Your data is securely synced across all devices.",
    icon: "🔄",
  },
  {
    title: "Session Management",
    description: "Save and restore entire browsing sessions with a single click.",
    icon: "💾",
  },
  {
    title: "Privacy First",
    description: "Your data is encrypted and stored securely. We never track your browsing.",
    icon: "🔒",
  },
  {
    title: "Custom Collections",
    description: "Create and organize collections of tabs for different projects or topics.",
    icon: "📁",
  },
];

function FeatureCard({ title, description, icon, index }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}


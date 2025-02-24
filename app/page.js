import Image from "next/image"
import Link from "next/link"
import { Chrome, ChromeIcon as Firefox, AppleIcon as Safari } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/tabmaster-icon.png" alt="TabMaster Icon" width={32} height={32} />
            <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9]">Tab Manager</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-gray-900">
              Help Center
            </Link>
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
          <a
            href="#"
            className="bg-[#4F46E5] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors"
          >
            INSTALL TABMANAGER
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            All your tabs,
            <br />
            one-click away
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Boost your productivity with a central hub for all your browser tabs. Save, organize, and access them
            instantly.
          </p>
          <a
            href="#"
            className="bg-[#4F46E5] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors inline-block"
          >
            INSTALL TABMANAGER
          </a>
        </div>

        {/* Product Screenshot */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100 to-rose-50 rounded-full blur-3xl opacity-20"></div>
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
            <Image
              src="/tabmaster-interface.png"
              alt="TabMaster Interface"
              width={1904}
              height={937}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Browser Compatibility */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">AVAILABLE ON</p>
          <div className="flex justify-center space-x-4">
            <Chrome className="w-6 h-6 text-gray-600" />
            <Firefox className="w-6 h-6 text-gray-600" />
            <Safari className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[#6366f1] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              title="Smart Organization"
              description="Automatically categorize and group your tabs based on their content and your usage patterns."
            />
            <FeatureCard
              title="Instant Search"
              description="Find any saved tab instantly with powerful search capabilities across all your saved sessions."
            />
            <FeatureCard
              title="Cross-Device Sync"
              description="Access your tabs from anywhere. Your data is securely synced across all your devices."
            />
          </div>
        </div>
      </section>

      {/* Social Proof
      <section className="py-20 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-8">TRUSTED BY TEAMS AT</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["Google", "Facebook", "LinkedIn", "Uber", "Intercom"].map((company) => (
              <div key={company} className="text-gray-400 text-sm font-medium">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/tabmaster-icon.png" alt="TabMaster Icon" width={32} height={32} />
            <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#0ea5e9]">Tab Manager</span>
          </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-gray-900">
                Privacy
              </Link>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}


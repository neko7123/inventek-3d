"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Mail, Phone, Linkedin, Instagram, Facebook, MapPin, ExternalLink, Menu, X, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const founders = [
    {
      name: "Rohit Solanki",
      position: "Founder & CEO",
      specialization: "Mechanical Engineering (CAD Design, 3D Printing Technology, Material Science & Business Strategy)",
      image: "/rohitsolanki.jpg",
      linkedin: "https://www.linkedin.com/in/rohit-solanki-4125082aa",
      description: "Visionary leader with skills in additive manufacturing, CAD design and sustainable innovation.",
    },
    {
      name: "Sairaj Shinde",
      position: "Co-Founder & CTO",
      specialization: "Mechanical Engineering (AIML Automation, Web Development & CAD Design",
      image: "/sairajshinde.png",
      linkedin: "https://www.linkedin.com/in/sairaj-shinde2003",
      description: "Tech innovator specializing in AIML automation, Web Development and advanced CAD systems.",
    },
  ]

  const contactOptions = [
    {
      icon: Mail,
      title: "Email",
      value: "inventek3d@gmail.com",
      link: "mailto:inventek3d@gmail.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 88306 22940",
      link: "tel:+918830622940",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "InvenTek 3D",
      link: "#",
      color: "from-blue-700 to-blue-800",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@inventek3d",
      link: "#",
      color: "from-pink-500 to-purple-600",
    },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Cursor Glow Effect */}
      <div
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          zIndex: 1,
        }}
      />

      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/App%20logo1-484avml67aUc7NUJfgLacdhWkW0liv.jpg"
              alt="InvenTek 3D Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-xl font-bold text-purple-900">InvenTek 3D</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </a>
            <a href="/#services" className="text-gray-700 hover:text-purple-600 transition">
              Services
            </a>
            <a href="/#about" className="text-gray-700 hover:text-purple-600 transition">
              About
            </a>
            <a href="/#sdg" className="text-gray-700 hover:text-purple-600 transition">
              Impact
            </a>
            <a href="/careers" className="text-gray-700 hover:text-purple-600 transition">
              Careers
            </a>
            <a href="/shop" className="text-gray-700 hover:text-purple-600 transition">
              Shop
            </a>
            <a href="/verify-certificate" className="text-gray-700 hover:text-purple-600 transition">
              Verify Certificate
            </a>
            <a href="/contact" className="text-purple-600 font-semibold">
              Contact
            </a>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-100 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-purple-600" /> : <Menu className="w-6 h-6 text-purple-600" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-purple-100 animate-slide-down">
            <div className="px-4 py-4 space-y-3">
               <a
                href="/"
                onClick={handleNavClick}
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                Home
              </a>
              <a
                href="/#services"
                onClick={handleNavClick}
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                Services
              </a>
              <a
                href="/#about"
                onClick={handleNavClick}
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                About
              </a>
              <a
                href="/#sdg"
                onClick={handleNavClick}
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                Impact
              </a>
              <a
                href="/careers"
                onClick={handleNavClick}
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                Careers
              </a>
              <a
                href="/shop"
                onClick={handleNavClick}
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                Shop
              </a>
              <a
                href="/verify-certificate"
                onClick={handleNavClick}
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                Verify Certificate
              </a>
              <a
                href="/contact"
                onClick={handleNavClick}
                className="block px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition font-semibold"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Animated Parallax Background */}
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)`, animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-10 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.2}px) translateX(-50%)` }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-full text-sm font-semibold border border-purple-200">
            Get In Touch
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Let's Connect &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
              Create Together
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Have questions, want to collaborate, or need more information? Our team is here to help bring your ideas to
            life.
          </p>
        </div>
      </section>

      {/* Contact Options Grid */}
      <section className="py-20 bg-gradient-to-b from-white via-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Reach Out Today</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Multiple ways to connect with us</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <a
                key={index}
                href={option.link}
                target={option.link.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative p-8 bg-white rounded-2xl border border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200 cursor-pointer overflow-hidden"
              >
                {/* Animated gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} p-4 mb-4 group-hover:scale-110 group-hover:shadow-lg transition transform`}
                  >
                    <option.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4 font-semibold">{option.value}</p>
                  <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition">
                    <span>Connect Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Meet Our Visionary Founders</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Industry veterans driving innovation in sustainable 3D printing
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="group"
                style={{
                  transform: `translateY(${Math.sin((scrollY + index * 100) / 100) * 8}px)`,
                }}
              >
                <div className="relative mb-8 overflow-hidden">
                  <div className="relative h-96 overflow-hidden rounded-3xl border-4 border-purple-200 group-hover:border-purple-600 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-300">
                    <Image
                      src={founder.image || "/placeholder.svg"}
                      alt={founder.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm leading-relaxed">{founder.description}</p>
                    </div>

                    {/* Floating badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                      {founder.position.split("&")[0].trim()}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border-2 border-purple-100 group-hover:border-purple-400 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-200 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{founder.name}</h3>
                  <p className="text-purple-600 font-semibold mb-1 text-sm uppercase tracking-wide">
                    {founder.position}
                  </p>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{founder.specialization}</p>

                  {/* Know More Button with enhanced styling */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-300 transition-all duration-300 group/btn hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Know More</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-purple-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Visit Our Office</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Located in Mumbai</p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="group p-8 bg-white rounded-2xl border-2 border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-2 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 p-3 mb-4 group-hover:scale-110 transition transform">
                  <MapPin className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
                <p className="text-gray-600 font-medium">Mumbai, India</p>
              </div>

              <div className="group p-8 bg-white rounded-2xl border-2 border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-2 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 p-3 mb-4 group-hover:scale-110 transition transform">
                  <Phone className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-600 font-medium">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                <p className="text-gray-600 font-medium">Saturday: 10:00 AM - 4:00 PM IST</p>
                <p className="text-gray-600 font-medium">Sunday: Closed</p>
              </div>

              <div className="group p-8 bg-white rounded-2xl border-2 border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-2 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-700 p-3 mb-4 group-hover:scale-110 transition transform">
                  <Mail className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Response</h3>
                <p className="text-gray-600 font-medium">We respond to all inquiries within 24 hours</p>
              </div>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden border-4 border-purple-300 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 flex items-center justify-center group-hover:shadow-2xl transition-all duration-300">
                <div className="text-center text-white">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition transform">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-2xl font-bold mb-2">Mumbai, India</p>
                  <p className="text-lg opacity-90">India's Tech Innovation Hub</p>
                  <p className="text-sm opacity-75 mt-4">Building the future of sustainable manufacturing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white relative overflow-hidden">
        {/* Background animated elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Let's Create Something Extraordinary</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? We're excited to hear from you and turn your vision into
            reality!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:inventek3d@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition transform hover:scale-105 shadow-xl"
            >
              <Mail className="w-5 h-5" />
              Send Us an Email
            </a>
            <a
              href="tel:+918830622940"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/30 transition border-2 border-white/50"
            >
              <Phone className="w-5 h-5" />
              Call Us Today
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">InvenTek 3D</h4>
              <p className="text-gray-400">Transforming ideas into reality through sustainable 3D printing.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/shop" className="hover:text-white transition">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/#services" className="hover:text-white transition">
                    3D Printing
                  </a>
                </li>
                <li>
                  <a href="/#services" className="hover:text-white transition">
                    Eco-Printing
                  </a>
                </li>
                <li>
                  <a href="/#services" className="hover:text-white transition">
                    Education
                  </a>
                </li>
                <li>
                  <a href="/verify-certificate" className="hover:text-white transition">
                    Verify Certificate
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@inventek3d.com" className="hover:text-white transition">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 InvenTek 3D. All rights reserved. | Invent. Innovate. Print.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

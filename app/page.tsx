"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown, Zap, BookOpen, Cloud, Leaf, Recycle, Menu, X } from "lucide-react"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-white">
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2">
                  <Image
                    src="/logo.jpg"
                    alt="InvenTek 3D Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg"
                  />
                  <span className="text-xl font-bold text-purple-900">InvenTek 3D</span>
                </a>
                <div className="hidden md:flex items-center gap-8">
                  <a href="/" className="text-purple-600 font-semibold">
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
                  <a href="/contact" className="text-gray-700 hover:text-purple-600 transition">
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
                      className="block px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition font-semibold"
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
                      className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              )}
            </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Parallax Background Elements */}
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-in-down mb-6">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              🚀 The Future of Manufacturing
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-in-up leading-tight">
            Invent. Innovate.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
              Print.
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Transform your ideas into reality with sustainable, precision 3D printing and design innovation.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button onClick={() => (window.location.href = "/shop")} className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition transform hover:scale-105">
              Place an Order
            </button>
            <button
              onClick={() => (window.location.href = "/careers")}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition"
            >
              Explore Career Opportunities
            </button>
          </div>

          <div className="flex justify-center mt-8 animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Comprehensive solutions for your 3D printing and design needs
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            {[
              {
                icon: Zap,
                title: "Customized 3D Printing",
                description:
                  "Send your STL files and we manufacture with precision using high-quality materials and quick delivery.",
              },
              {
                icon: BookOpen,
                title: "Educational Programs",
                description:
                  "Hands-on FREE training in Fusion 360, SolidWorks, and real-world design-to-print projects for students.",
              },
              {
                icon: Cloud,
                title: "Cloud Printing Services",
                description: "A vast netwrok of cloud printers in various cities across India for quick delivery at your doorstep.",
              },
              {
                icon: Leaf,
                title: "Eco-Printing",
                description:
                  "Send plastic waste bottle or failed/old 3d prints we'll recycle it into usable 3D printing material for sustainable creation.",
              },
              {
                icon: Leaf,
                title: "CAD/CAE Service",
                description:
                  "Got an idea? discuss it with us and get a customized CAD model ready along with prototyping and CAE testing.",
              },
              {
                icon: Zap,
                title: "FREE Internship Programs",
                description:
                  "Hands-on experience in CAD, prototyping, and innovation for the next generation of makers.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200 cursor-pointer"
                style={{
                  transform: `translateY(${Math.sin((scrollY + index * 100) / 100) * 10}px)`,
                }}
              >
                <service.icon className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">About InvenTek 3D</h2>
              <p className="text-lg text-gray-600 mb-4">
                We are a next-generation 3D printing and design innovation startup dedicated to transforming ideas into
                reality through sustainable, technology-driven fabrication.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                By integrating sustainability with advanced manufacturing, we are shaping a future where design meets
                responsibility.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Precision Engineering</h4>
                    <p className="text-gray-600">High-quality materials and expert craftsmanship</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Eco-Conscious</h4>
                    <p className="text-gray-600">Sustainable practices and circular economy focus</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Educational Impact</h4>
                    <p className="text-gray-600">Empowering students and innovators worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl opacity-10" />
              <Image
                src="/logo.jpg"
                alt="InvenTek 3D"
                width={300}
                height={300}
                className="relative z-10 w-80 h-80 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SDG Focus Section */}
      <section id="sdg" className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-4">UN Sustainable Development Goals</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Our commitment to shaping a sustainable future</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "4",
                title: "Quality Education",
                description: "Providing 3D design workshops and internships to empower students.",
              },
              {
                number: "9",
                title: "Industry & Innovation",
                description: "Promoting additive manufacturing for smarter production.",
              },
              {
                number: "12",
                title: "Responsible Consumption",
                description: "Encouraging recycling and eco-printing practices.",
              },
              {
                number: "13",
                title: "Climate Action",
                description: "Minimizing waste and fostering sustainable product design.",
              },
            ].map((sdg, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200"
              >
                <div className="text-5xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition">
                  SDG {sdg.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{sdg.title}</h3>
                <p className="text-gray-600">{sdg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">Our Core Values</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Innovation", subtitle: "Through Learning", icon: "💡" },
              { title: "Sustainability", subtitle: "Through Action", icon: "🌱" },
              { title: "Precision", subtitle: "Through Technology", icon: "⚙️" },
              { title: "Empowerment", subtitle: "Through Collaboration", icon: "🤝" },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-purple-600 font-semibold">{value.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Ideas?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join us in revolutionizing manufacturing with sustainable, innovative 3D printing solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => (window.location.href = "/shop")} className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105">
              Start Your Project
            </button>
            <button onClick={() => (window.location.href = "/contact")} className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">InvenTek 3D</h4>
              <p className="text-gray-400">Transforming ideas into reality through sustainable 3D printing.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    3D Printing
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-white transition">
                    Education
                  </a>
                </li>   
                <li>
                  <a href="/shop" className="hover:text-white transition">
                    Cloud Printing
                  </a>
                </li>
                <li>
                  <a href="/shop" className="hover:text-white transition">
                    Eco-Printing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#about" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog (Coming Soon)
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
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://www.linkedin.com/in/inventek-3d-6a7962391" className="hover:text-white transition">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/inventek_3d?igsh=MTFzem55MmNzYWJuZQ==" className="hover:text-white transition">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="mailto:info@inventek3d.com" className="hover:text-white transition">
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

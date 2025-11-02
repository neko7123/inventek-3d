"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, Menu, X, Briefcase, Clock, MapPin, DollarSign, Trophy } from "lucide-react"
import InternshipForm from "@/components/internship-form"

export default function CareersPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedInternship, setSelectedInternship] = useState<string | null>(null)

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

  const internships = [
    {
      id: "ITEK001",
      title: "Mechanical Design Engineer Intern",
      specialization: "SolidWorks",
      duration: "3 months",
      mode: "Online",
      stipend: "₹0 (Chance of PPO after completion)",
      description:
        "Work on real-world mechanical design projects using SolidWorks. Learn industry-standard design practices and contribute to our innovative 3D printing projects.",
      skills: ["SolidWorks", "CAD Design", "3D Modeling", "Product Design"],
    },
    {
      id: "ITEK002",
      title: "Mechanical Design Engineer Intern",
      specialization: "Inventor",
      duration: "3 months",
      mode: "Online",
      stipend: "₹0 (Chance of PPO after completion)",
      description:
        "Dive into advanced mechanical design using Autodesk Inventor. Collaborate with our engineering team to prototype and optimize 3D printing solutions.",
      skills: ["Inventor", "CAD Design", "3D Modeling", "Prototyping"],
    },
    {
      id: "ITEK003",
      title: "Mechanical Design Engineer Intern",
      specialization: "FUSION 360",
      duration: "3 months",
      mode: "Online",
      stipend: "₹0 (Chance of PPO after completion)",
      description:
        "Master FUSION 360 and cloud-based design workflows. Participate in end-to-end product design projects from concept to 3D printing.",
      skills: ["FUSION 360", "CAD Design", "Cloud Workflows", "3D Modeling"],
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

      {/* Navigation */}
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
                        <a href="/careers" className="text-purple-600 font-semibold">
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
                            className="block px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition font-semibold"
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
              🚀 Join Our Team
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-in-up leading-tight">
            Build the Future
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">
              with InvenTek 3D
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover exciting career opportunities to innovate, learn, and grow with us.
          </p>

          <div className="flex justify-center mt-12 animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              💼 Career Opportunities
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Open Internships</h2>
            <p className="text-xl text-gray-600">
              Join our team and gain hands-on experience in cutting-edge 3D design and manufacturing. Learn from
              industry experts and contribute to real projects.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {internships.map((internship, index) => (
              <div
                key={internship.id}
                className="group p-8 bg-white rounded-2xl border border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200 hover:-translate-y-2"
                style={{
                  transform: `translateY(${Math.sin((scrollY + index * 100) / 100) * 5}px)`,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                        {internship.specialization}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{internship.title}</h3>
                    <p className="text-purple-600 font-semibold text-sm mt-1">ID: {internship.id}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{internship.description}</p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Duration</p>
                      <p className="font-semibold text-gray-900">{internship.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Mode</p>
                      <p className="font-semibold text-gray-900">{internship.mode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg col-span-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Stipend</p>
                      <p className="font-semibold text-gray-900">{internship.stipend}</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-3">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 text-sm rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => setSelectedInternship(internship.id)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-300 transition-all duration-300 transform hover:scale-105 group/btn"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Apply Now
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* InternshipForm Modal */}
      {selectedInternship && (
        <InternshipForm internshipId={selectedInternship} onClose={() => setSelectedInternship(null)} />
      )}

      {/* Jobs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              🎯 Full-Time Positions
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Job Opportunities</h2>
          </div>

          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Coming Soon</h3>
              <p className="text-xl text-gray-600 max-w-md">
                We're actively hiring! Check back soon for exciting full-time job opportunities in design, engineering,
                operations, and more.
              </p>
              <button className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">Why Join InvenTek 3D?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Learn Cutting-Edge Tech",
                description: "Master industry-standard tools like SolidWorks, Inventor, and FUSION 360",
                icon: "🔧",
              },
              {
                title: "Real-World Projects",
                description: "Contribute to actual 3D printing and design projects that matter",
                icon: "🎯",
              },
              {
                title: "Mentorship",
                description: "Learn from experienced engineers and innovators in the 3D printing space",
                icon: "👨‍🏫",
              },
              {
                title: "PPO Opportunity",
                description: "Outstanding interns have a chance to convert to permanent roles",
                icon: "⭐",
              },
              {
                title: "Flexible Learning",
                description: "100% online, work at your own pace while developing valuable skills",
                icon: "🌍",
              },
              {
                title: "Sustainability Focus",
                description: "Be part of a movement towards eco-conscious manufacturing",
                icon: "🌱",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border border-purple-100 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Innovate With Us?</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't see a position that fits? Send us your resume and let's explore opportunities together.
          </p>
          <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Get In Touch
          </button>
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
                  <a href="/#services" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/#about" className="hover:text-white transition">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Careers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/careers" className="hover:text-white transition">
                    View Positions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Internships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Culture
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Email
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Twitter
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

"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ShoppingCart, Menu, X } from "lucide-react"
import OrderForm from "@/components/order-form"

export default function Shop() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
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

  const products = [
    {
      id: 1,
      name: "Custom 3D Print",
      price: 499,
      image: "/3d-printed-custom-miniature-figure.jpg",
      category: "Customized",
      description: "Share your product idea, and we’ll design a custom 3D model and print it in your chosen material",
    },
    {
      id: 2,
      name: "3D Printing",
      price: 299,
      image: "/3d-printed-phone-stand.png",
      category: "Printing",
      description: "Share your 3D model and we'll print it in your chosen material",
    },
    {
      id: 3,
      name: "Eco-Printing",
      price: 199,
      image: "/3d-printed-desk-organizer.jpg",
      category: "Sustainability",
      description: "Bring us your plastic bottles—we’ll recycle them into filament and 3D print your custom design at no extra filament cost",
    },
    {
      id: 4,
      name: "CAD/CAE Service",
      price: 999,
      image: "/3d-printed-architecture-model.jpg",
      category: "Special Service",
      description: "Have a product idea that needs a 3D model or CAE testing? We’ll handle it for you!",
    },
  ]

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
                        <a href="/shop" className="text-purple-600 font-semibold">
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
                            className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          >
                            Careers
                          </a>
                          <a
                            href="/shop"
                            onClick={handleNavClick}
                            className="block px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition font-semibold"
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
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-purple-50 to-white">
        {/* Parallax Background */}
        <div
          className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Shop 3D Creations</h1>
          <p className="text-xl text-gray-600 mb-2">
            Discover amazing 3D printed products crafted with precision and innovation
          </p>
          <p className="text-lg text-purple-600 font-semibold">Prices may vary by request. Our team will confirm your order within 24 hours.</p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-purple-100 overflow-hidden hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200 hover:scale-105 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-purple-50 to-white overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow p-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 min-h-[48px]">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <span className="text-2xl font-bold text-purple-600 block mb-3">
                    ₹{product.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition" />
                    Order Now
                  </button>
                </div>
              </div>
            </div>

            ))}
          </div>
        </div>
      </section>

      {/* OrderForm modal */}
      {selectedProduct && <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Our Shop?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white border border-purple-100 hover:border-purple-400 transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Turnaround</h3>
              <p className="text-gray-600">Fast 3D printing and delivery within 7-10 business days</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white border border-purple-100 hover:border-purple-400 transition">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Eco-Friendly</h3>
              <p className="text-gray-600">Made with sustainable, recycled materials and ethical practices</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white border border-purple-100 hover:border-purple-400 transition">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">Precision-engineered 3D prints with exceptional finishing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8 opacity-90">
            Have a custom design in mind? We also accept custom 3D file submissions!
          </p>
          <button onClick={() => (window.location.href = "/shop")} className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Submit Custom Design
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">InvenTek 3D</h4>
              <p className="text-gray-400">Your trusted partner for 3D printing solutions.</p>
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
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Custom Printing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Cloud Printing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Eco-Printing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: inventek3d@gmail.con</li>
                <li>Phone: +91 88306 22940</li>
                <li>Follow us on social media</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 InvenTek 3D Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

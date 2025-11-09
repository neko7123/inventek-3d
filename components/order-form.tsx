"use client"

import type React from "react"

import { useState } from "react"
import { X, Truck, CreditCard } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  category: string
}

interface OrderFormProps {
  product: Product
  onClose: () => void
}

export default function OrderForm({ product, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    quantity: 1,
    // Shipping Details
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    // Billing Details
    sameAsShipping: true,
    billingAddressLine1: "",
    billingAddressLine2: "",
    billingCity: "",
    billingState: "",
    billingPincode: "",
    // Payment & Preferences
    paymentMethod: "upi",
    specialInstructions: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const totalPrice = product.price * formData.quantity
  const shippingCost = totalPrice > 1000 ? 0 : 100
  const finalPrice = totalPrice + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log("Order submitted:", { product, ...formData })

    setTimeout(() => {
      alert(
        `Order placed successfully!\nProduct: ${product.name}\nQuantity: ${formData.quantity}\nTotal: ₹${finalPrice.toLocaleString()}`,
      )
      setIsSubmitting(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  {/* Scrollable modal container */}
  <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 overflow-y-auto max-h-[90vh] relative">
    {/* Header (scrolls with the content) */}
    <div className="relative bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-6 rounded-t-2xl flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Order Now</h2>
        <p className="text-purple-100 mt-1">{product.name}</p>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-purple-700 rounded-lg transition"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
    </div>

     {/* Google Form Embed */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdVw-4o4ZCajd6FAEJyUkNMNu-uONnU0M_z7bRstv-kPoKocA/viewform?embedded=true"
            title="InvenTek 3D Order Form"
            className="w-full h-[80vh] border-0 rounded-b-2xl"
          >
            Loading…
          </iframe>

        {/* Future: restore your internal form here */}

        {/* <form onSubmit={handleSubmit} className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                    <p className="text-purple-600 font-semibold">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      name="quantity"
                      className="w-16 text-center px-2 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, quantity: prev.quantity + 1 }))}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>


              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>


              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-purple-600" />
                  <span>Shipping Address</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="House No., Street Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Apartment, suite, etc. (Optional)"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="400001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                      <input
                        type="text"
                        value={formData.country}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>


              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                  rows={3}
                  placeholder="Any special delivery instructions or preferences..."
                />
              </div>


              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <span>Payment Method</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { value: "upi", label: "UPI" },
                    { value: "card", label: "Credit/Debit Card" },
                    { value: "netbanking", label: "Net Banking" },
                    { value: "wallet", label: "Wallet" },
                    { value: "cod", label: "Cash on Delivery" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-purple-50 transition"
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="ml-3 font-semibold text-gray-900">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>


            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-purple-50 p-6 rounded-2xl border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-purple-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Product Price</span>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Quantity</span>
                    <span>{formData.quantity}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600 font-semibold" : ""}>
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                    </span>
                  </div>
                  {shippingCost === 0 && (
                    <p className="text-sm text-green-600 font-semibold">✓ Free shipping on orders above ₹1000</p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-purple-600">₹{finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <p>✓ Free returns within 30 days</p>
                  <p>✓ 100% secure payment</p>
                  <p>✓ Eco-friendly packaging</p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form> */}
      </div>
    </div>
  )
}

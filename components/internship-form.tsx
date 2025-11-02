"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload } from "lucide-react"

interface InternshipFormProps {
  internshipId: string
  onClose: () => void
}

export default function InternshipForm({ internshipId, onClose }: InternshipFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    github: "",
    college: "",
    currentYear: "",
    cgpa: "",
    experience: "",
    resume: null as File | null,
    coverLetter: "",
    expectations: "",
  })

  const [resumeFileName, setResumeFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }))
      setResumeFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    console.log("Form submitted:", formData)

    // Show success message
    setTimeout(() => {
      alert(`Application submitted successfully for internship ${internshipId}!`)
      setIsSubmitting(false)
      onClose()
    }, 1500)
  }

  return (
   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  {/* Scrollable container */}
  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
    
    {/* Header */}
    <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-6 rounded-t-2xl flex items-center justify-between z-10">
      <div>
        <h2 className="text-2xl font-bold">Apply for Internship</h2>
        <p className="text-purple-100 mt-1">ID: {internshipId}</p>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-purple-700 rounded-lg transition"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
    </div>


        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
          {/* Personal Information Section */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub Profile</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                  placeholder="github.com/yourprofile"
                />
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                2
              </span>
              Education
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College/University *</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                  placeholder="Your College"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Year *</label>
                <select
                  name="currentYear"
                  value={formData.currentYear}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CGPA/Percentage *</label>
                <input
                  type="text"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                  placeholder="7.5"
                />
              </div>
            </div>
          </div>

          {/* Experience & Skills Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                3
              </span>
              Experience & Skills
            </h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Relevant Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none"
                rows={3}
                placeholder="Tell us about your experience with CAD tools, 3D modeling, or relevant projects..."
              />
            </div>
          </div>

          {/* Resume Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                4
              </span>
              Resume & Documents
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-center border-2 border-dashed border-purple-300 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition">
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" required />
                <div className="text-center">
                  <Upload className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Upload Resume *</p>
                  <p className="text-sm text-gray-600">PDF, DOC, or DOCX (Max 5MB)</p>
                  {resumeFileName && <p className="text-sm text-purple-600 mt-2 font-medium">📎 {resumeFileName}</p>}
                </div>
              </label>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none"
                  rows={4}
                  placeholder="Tell us why you're interested in this internship and what you hope to learn..."
                />
              </div>
            </div>
          </div>

          {/* Expectations Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                5
              </span>
              Your Expectations
            </h3>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What do you hope to gain from this internship?
            </label>
            <textarea
              name="expectations"
              value={formData.expectations}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none"
              rows={3}
              placeholder="Your expectations and goals..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 sticky bottom-0 bg-white border-t border-gray-200 -mx-8 px-8 py-6">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

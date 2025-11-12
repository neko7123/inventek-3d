"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Download, CheckCircle, XCircle, Menu, X } from "lucide-react";
import jsPDF from "jspdf";
import { db } from "@/lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

// helper for date formatting
const formatDate = (ts?: Timestamp | null) =>
  ts ? ts.toDate().toISOString().split("T")[0] : "N/A";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => setIsMenuOpen(false);

  const handleVerify = async () => {
  if (!certificateId.trim()) {
    alert("Please enter a certificate ID");
    return;
  }

  setIsSearching(true);
  const id = certificateId.trim().toUpperCase();

  try {
    const snap = await getDoc(doc(db, "certificates", id));

    if (snap.exists()) {
      const data = snap.data();
      setVerificationResult({
        id,
        name: data.candidateName || "N/A",
        course: data.courseWorkshop || "N/A",
        issueDate: formatDate(data.issueDate),
        expiryDate: data.lifetime
          ? "Lifetime"
          : formatDate(data.expiryDate ?? null),
        status: data.status || "valid",
        score: data.performanceScore || 0,
        completionDate: formatDate(data.completionDate),
      });
    } else {
      setVerificationResult({
        id,
        name: "N/A",
        course: "N/A",
        issueDate: "N/A",
        expiryDate: "N/A",
        status: "invalid",
        score: 0,
        completionDate: "N/A",
      });
    }
  } catch (err) {
    console.error("Error verifying certificate:", err);
    alert("Error verifying certificate. Try again later.");
  } finally {
    setIsSearching(false);
  }
};


  const handleDownloadPDF = () => {
    if (!verificationResult) return;

    const docx = new jsPDF();
    const pageWidth = docx.internal.pageSize.getWidth();
    const pageHeight = docx.internal.pageSize.getHeight();

    docx.setFillColor(139, 92, 246);
    docx.rect(0, 0, pageWidth, 40, "F");

    docx.setTextColor(255, 255, 255);
    docx.setFontSize(24);
    docx.text("Certificate Verification Report", pageWidth / 2, 25, {
      align: "center",
    });

    docx.setTextColor(0, 0, 0);
    docx.setFontSize(14);
    docx.setFont("Noto Sans", "bold");
    docx.text("Verification Status", 20, 60);

    docx.setFontSize(12);
    docx.setFont("Noto Sans", "normal");
    const statusText =
      verificationResult.status === "valid" ? "✓ VERIFIED" : "✗ INVALID";
    const statusColor: [number, number, number] =
      verificationResult.status === "valid"
        ? [34, 197, 94]
        : [239, 68, 68];

    docx.setTextColor(...statusColor);
    docx.text(statusText, 20, 70);
    docx.setTextColor(0, 0, 0);

    docx.setFontSize(14);
    docx.setFont("Noto Sans", "bold");
    docx.text("Certificate Details", 20, 90);

    docx.setFontSize(11);
    docx.setFont("Noto Sans", "normal");
    const details = [
      `Certificate ID: ${verificationResult.id}`,
      `Name: ${verificationResult.name}`,
      `Course/Workshop: ${verificationResult.course}`,
      `Issue Date: ${verificationResult.issueDate}`,
      `Expiry Date: ${
        verificationResult.expiryDate === "Lifetime"
          ? "Lifetime (No Expiry)"
          : verificationResult.expiryDate
      }`,
      `Completion Date: ${verificationResult.completionDate}`,
      ...(verificationResult.status === "valid"
        ? [`Performance Score: ${verificationResult.score}%`]
        : []),
    ];

    let yPosition = 100;
    details.forEach((detail) => {
      docx.text(detail, 20, yPosition);
      yPosition += 8;
    });

    docx.setFontSize(10);
    docx.setTextColor(128, 128, 128);
    docx.text(
      "This is an automated verification report from InvenTek 3D",
      20,
      pageHeight - 20
    );
    docx.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      20,
      pageHeight - 14
    );

    docx.save(`Certificate_Verification_${verificationResult.id}.pdf`);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
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
                        <a href="/shop" className="text-gray-700 hover:text-purple-600 transition">
                          Shop
                        </a>
                        <a href="/verify-certificate" className="text-purple-600 font-semibold">
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
                            className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition "
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
                            className="block px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition font-semibold"
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

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Verify Your Certificate</h1>
            <p className="text-xl text-gray-600">
              Enter your certificate ID below to verify your InvenTek 3D internship certificate
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-purple-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g., ITEK001CER001)"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleVerify()}
                className="flex-1 px-6 py-3 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-gray-900"
              />
              <button
                onClick={handleVerify}
                disabled={isSearching}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-purple-400 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                {isSearching ? "Verifying..." : "Verify"}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              📝 Try: ITEK001CER001
            </p>
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div
              className={`rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-500 animate-fade-in ${
                verificationResult.status === "valid" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
              }`}
            >
              {/* Status Header */}
              <div
                className={`p-6 ${
                  verificationResult.status === "valid"
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
                } text-white`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {verificationResult.status === "valid" ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <XCircle className="w-8 h-8" />
                  )}
                  <span className="text-2xl font-bold">
                    {verificationResult.status === "valid" ? "✓ VERIFIED" : "✗ INVALID"}
                  </span>
                </div>
                <p className="text-sm opacity-90">
                  {verificationResult.status === "valid"
                    ? "This certificate is valid and authentic"
                    : "This certificate could not be verified"}
                </p>
              </div>

              {/* Certificate Details */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Left Column */}
                  <div>
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-gray-600 uppercase">Candidate Name</label>
                      <p className="text-xl font-bold text-gray-900 mt-1">{verificationResult.name}</p>
                    </div>
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-gray-600 uppercase">Certificate ID</label>
                      <p className="text-lg font-mono text-purple-600 mt-1 break-all">{verificationResult.id}</p>
                    </div>
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-gray-600 uppercase">Issue Date</label>
                      <p className="text-lg text-gray-900 mt-1">{verificationResult.issueDate}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-gray-600 uppercase">Course / Workshop</label>
                      <p className="text-lg text-gray-900 mt-1">{verificationResult.course}</p>
                    </div>
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-gray-600 uppercase">Completion Date</label>
                      <p className="text-lg text-gray-900 mt-1">{verificationResult.completionDate}</p>
                    </div>
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-gray-600 uppercase">Expiry Date</label>
                      <p className="text-lg text-gray-900 mt-1">{verificationResult.expiryDate}</p>
                    </div>
                  </div>
                </div>

                {/* Performance Score */}
                {verificationResult.status === "valid" && (
                  <div className="mb-8 p-4 bg-purple-100 rounded-lg border border-purple-300">
                    <label className="text-sm font-semibold text-gray-600 uppercase">Performance Score</label>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-full transition-all duration-1000"
                          style={{ width: `${verificationResult.score}%` }}
                        />
                      </div>
                      <span className="text-2xl font-bold text-purple-600">{verificationResult.score}%</span>
                    </div>
                  </div>
                )}

                {/* Download Button */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Report
                </button>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-bold text-gray-900 mb-2">Internship Tracks</h3>
              <p className="text-gray-600 text-sm">
                Certificates issued for SolidWorks, Inventor, and FUSION 360 courses.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-bold text-gray-900 mb-2">Valid for 1 Year</h3>
              <p className="text-gray-600 text-sm">
                Internship certificates are valid for one year from the issue date.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-bold text-gray-900 mb-2">Download Reports</h3>
              <p className="text-gray-600 text-sm">
                Export verification results as PDF for official records and employment.
              </p>
            </div>
          </div>
        </div>
      </div>

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
                  <a href="/careers" className="hover:text-white transition">
                    Internships
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-white transition">
                    Culture
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

//certificate-admin
"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Download, AlertCircle } from "lucide-react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { setDoc } from "firebase/firestore";

interface Certificate {
  id: string;
  certificateID: string;
  candidateName: string;
  courseWorkshop: string;
  issueDate: string;
  completionDate: string;
  expiryDate: string | null;
  lifetime: boolean;
  performanceScore: number;
}

export default function CertificateManagement() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newCert, setNewCert] = useState({
    certificateID: "",
    candidateName: "",
    courseWorkshop: "",
    issueDate: "",
    completionDate: "",
    expiryDate: "",
    lifetime: false,
    performanceScore: 0,
  });


  // 🔥 Live Firestore listener
  useEffect(() => {
  const unsub = onSnapshot(collection(db, "certificates"), (snapshot) => {
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        certificateID: d.certificateID || doc.id, // fallback if missing
        candidateName: d.name || d.candidateName || "N/A",
        courseWorkshop: d.course || d.courseWorkshop || "N/A",
        issueDate: d.issueDate?.toDate().toISOString().split("T")[0] || "",
        completionDate: d.completionDate?.toDate().toISOString().split("T")[0] || "",
        expiryDate: d.expiryDate ? d.expiryDate.toDate().toISOString().split("T")[0] : null,
        lifetime: d.isLifetime ?? d.lifetime ?? false,
        performanceScore: d.score ?? d.performanceScore ?? 0,
      };
    }) as Certificate[];
    setCertificates(data);
    setLoading(false);
  });

  return () => unsub();
}, []);

  // 📦 Add or update certificate
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId) {
        const ref = doc(db, "certificates", editId);
        await updateDoc(ref, {
          candidateName: newCert.candidateName,
          courseWorkshop: newCert.courseWorkshop,
          issueDate: Timestamp.fromDate(new Date(newCert.issueDate)),
          completionDate: Timestamp.fromDate(new Date(newCert.completionDate)),
          expiryDate: newCert.lifetime ? null : Timestamp.fromDate(new Date(newCert.expiryDate)),
          lifetime: newCert.lifetime,
          performanceScore: newCert.performanceScore,
        });
        toast.success("Certificate updated successfully!");
      } else {
        const nextNumber = (certificates.length + 1).toString().padStart(3, "0");
        const certificateID = `ITEK001CER${nextNumber}`;
        await setDoc(doc(db, "certificates", certificateID), {
            certificateID,
            candidateName: newCert.candidateName,
            courseWorkshop: newCert.courseWorkshop,
            issueDate: Timestamp.fromDate(new Date(newCert.issueDate)),
            completionDate: Timestamp.fromDate(new Date(newCert.completionDate)),
            expiryDate: newCert.lifetime ? null : Timestamp.fromDate(new Date(newCert.expiryDate)),
            lifetime: newCert.lifetime,
            performanceScore: newCert.performanceScore,
            status: "valid",
        });
        toast.success("Certificate added successfully!");
      }

      setNewCert({
        certificateID: "", // ✅ added to match the state structure
        candidateName: "",
        courseWorkshop: "",
        issueDate: "",
        completionDate: "",
        expiryDate: "",
        lifetime: false,
        performanceScore: 0,
      });

      setShowModal(false);
      setEditId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save certificate");
    }
  };

  // ❌ Delete certificate
  const deleteCertificate = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    await deleteDoc(doc(db, "certificates", id));
    toast.success("Certificate deleted");
  };

  const getExpiryStatus = (expiryDate: string | null, lifetime: boolean) => {
    if (lifetime) return { status: "Lifetime", color: "bg-green-500/20 text-green-300" };
    if (!expiryDate) return { status: "Active", color: "bg-green-500/20 text-green-300" };

    const expiry = new Date(expiryDate);
    const today = new Date();

    if (expiry < today) {
      return { status: "Expired", color: "bg-red-500/20 text-red-300" };
    }

    const daysLeft = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 30) {
      return { status: "Expiring Soon", color: "bg-yellow-500/20 text-yellow-300" };
    }

    return { status: "Active", color: "bg-green-500/20 text-green-300" };
  };

  if (loading) return <div className="text-center text-gray-400 p-6">Loading certificates...</div>;

  const expiringCertificates = certificates.filter((cert) => {
    const status = getExpiryStatus(cert.expiryDate, cert.lifetime);
    return status.status === "Expiring Soon" || status.status === "Expired";
  });

  const handleEdit = (cert: Certificate) => {
    setEditId(cert.id);
    setShowModal(true);
    setNewCert({
    certificateID: cert.certificateID || "", // ✅ added this line
    candidateName: cert.candidateName,
    courseWorkshop: cert.courseWorkshop,
    issueDate: cert.issueDate,
    completionDate: cert.completionDate,
    expiryDate: cert.expiryDate || "",
    lifetime: cert.lifetime,
    performanceScore: cert.performanceScore,
  });
  };

  const exportCSV = () => {
    const csv = [
      "Certificate ID,Candidate Name,Course/Workshop,Issue Date,Completion Date,Expiry Date,Lifetime,Performance Score",
      ...certificates.map(
        (cert) =>
          `${cert.certificateID},"${cert.candidateName}","${cert.courseWorkshop}",${cert.issueDate},${cert.completionDate},${cert.expiryDate || "Lifetime"},${cert.lifetime},${cert.performanceScore}`
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificates.csv";
    a.click();
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Certificate Management</h1>
        <p className="text-gray-400">Manage and verify internship certificates</p>
      </div>

      {/* Alert for expiring certificates */}
      {expiringCertificates.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-300 font-semibold">Attention Required</p>
            <p className="text-sm text-yellow-200">
              {expiringCertificates.length} certificate(s) expiring soon or already expired
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Certificates</p>
          <p className="text-3xl font-bold text-white">{certificates.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Lifetime Certs</p>
          <p className="text-3xl font-bold text-green-400">{certificates.filter((c) => c.lifetime).length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Avg. Performance</p>
          <p className="text-3xl font-bold text-purple-400">
            {(certificates.reduce((sum, c) => sum + c.performanceScore, 0) / certificates.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Expiring/Expired</p>
          <p className="text-3xl font-bold text-red-400">{expiringCertificates.length}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200"
        >
          <Plus size={20} />
          Add Certificate
        </button>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
    {/* Outer wrapper allows scrolling if content is taller than screen */}
    <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 my-10">
      {/* Make inner modal responsive and scrollable */}
      <div className="max-h-[85vh] overflow-y-auto pr-2">
        <h2 className="text-xl font-bold text-white mb-4 sticky top-0 bg-gray-800 pb-2">
          Add New Certificate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Certificate ID */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Certificate ID</label>
            <input aria-label="certificate ID"
              type="text"
              value={newCert.certificateID || "Will be auto-generated"}
              readOnly
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-400 rounded text-sm cursor-not-allowed"
            />
          </div>

          {/* Candidate Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Candidate Name</label>
            <input
              type="text"
              placeholder="Enter candidate name"
              value={newCert.candidateName}
              onChange={(e) =>
                setNewCert({ ...newCert, candidateName: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
              required
            />
          </div>

          {/* Course / Workshop */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Course / Workshop</label>
            <select aria-label="course"
              value={newCert.courseWorkshop}
              onChange={(e) =>
                setNewCert({ ...newCert, courseWorkshop: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
              required
            >
              <option value="">Select Course</option>
              <option>Mechanical Design Engineer - SolidWorks</option>
              <option>Mechanical Design Engineer - Inventor</option>
              <option>Mechanical Design Engineer - FUSION 360</option>
            </select>
          </div>

          {/* Issue Date */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Issue Date</label>
            <input aria-label="issue date"
              type="date"
              value={newCert.issueDate}
              onChange={(e) =>
                setNewCert({ ...newCert, issueDate: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
              required
            />
          </div>

          {/* Completion Date */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Completion Date</label>
            <input aria-label="date"
              type="date"
              value={newCert.completionDate}
              onChange={(e) =>
                setNewCert({ ...newCert, completionDate: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
              required
            />
          </div>

          {/* Lifetime Checkbox */}
          <div className="flex items-center gap-2">
            <input aria-label="lifetime"
              type="checkbox"
              checked={newCert.lifetime}
              onChange={(e) =>
                setNewCert({ ...newCert, lifetime: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label className="text-white text-sm">Lifetime Validity</label>
          </div>

          {/* Expiry Date */}
          {!newCert.lifetime && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Expiry Date</label>
              <input aria-label="date job"
                type="date"
                value={newCert.expiryDate}
                onChange={(e) =>
                  setNewCert({ ...newCert, expiryDate: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
                required
              />
            </div>
          )}

          {/* Performance Score */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Performance Score (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Enter score"
              value={newCert.performanceScore}
              onChange={(e) =>
                setNewCert({
                  ...newCert,
                  performanceScore: Number.parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4 sticky bottom-0 bg-gray-800 pb-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-all"
            >
              Add Certificate
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

      {/* Certificates Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-700/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Candidate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Certificate ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Course</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Performance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => {
                const status = getExpiryStatus(cert.expiryDate, cert.lifetime)
                return (
                  <tr key={cert.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-all">
                    <td className="px-6 py-4 text-white font-medium">{cert.candidateName}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{cert.certificateID}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{cert.courseWorkshop}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                            style={{ width: `${cert.performanceScore}%` }}
                          />
                        </div>
                        <span className="text-white font-medium">{cert.performanceScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${status.color}`}>{status.status}</span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button aria-label="edit" className="p-2 hover:bg-gray-600 rounded transition-all">
                        <Edit2 size={18} className="text-blue-400" />
                      </button>
                      <button aria-label="delete"
                        onClick={() => deleteCertificate(cert.id)}
                        className="p-2 hover:bg-gray-600 rounded transition-all"
                      >
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

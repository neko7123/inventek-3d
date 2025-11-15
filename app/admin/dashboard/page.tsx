"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Award, Briefcase, Clock, AlertCircle, ShoppingCart, Package } from "lucide-react";
import { onSnapshot } from "firebase/firestore";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<any[]>([])
  const [internships, setInternships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [certificates, setCertificates] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
      const unsub = onSnapshot(collection(db, "products"), (snap) => {
        setProducts(snap.docs.map((d) => d.data()));
      });
      return () => unsub();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const jobSnap = await getDocs(collection(db, "jobs"))
          const internSnap = await getDocs(collection(db, "internships"))
          const certSnap = await getDocs(collection(db, "certificates")) // ✅ allowed now

          const jobData = jobSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          const internData = internSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          const certData = certSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

          setJobs(jobData)
          setInternships(internData)
          setCertificates(certData)
        } catch (err) {
          console.error("🔥 Error fetching dashboard data:", err)
          setError("Failed to load data")
        } finally {
          setLoading(false)
        }
      }

      fetchData() // ✅ actually call it
    }, [])

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Overview of current job and internship listings</p>
      </div>

      {loading && <p className="text-gray-400">Loading data...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <>
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Active Jobs</p>
                  <p className="text-4xl font-bold text-white">{jobs.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg">
                  <Briefcase size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Jobs currently listed on careers page</p>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Active Internships</p>
                  <p className="text-4xl font-bold text-white">{internships.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg">
                  <Clock size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Internship opportunities accepting applications</p>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Certificates Issued</p>
                  <p className="text-4xl font-bold text-white">{certificates.length}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg">
                  <Award size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Issued certificates to interns or employees</p>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Total Openings</p>
                  <p className="text-4xl font-bold text-white">{jobs.length + internships.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg">
                  <AlertCircle size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Combined count of all active listings</p>
            </div>
  {/* Active Products */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Active Products</p>
                  <p className="text-4xl font-bold text-white">
                    {products.filter((p) => p.status === "Active").length}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-3 rounded-lg">
                  <ShoppingCart size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Products currently available in shop</p>
            </div>

            {/* Total Orders */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Total Orders</p>
                  <p className="text-4xl font-bold text-white">0</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-lg">
                  <Package size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Orders received from the shop</p>
            </div>
          </div>

          {/* Jobs List */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Job Postings</h2>
            {jobs.length === 0 ? (
              <p className="text-gray-500">No jobs found.</p>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all flex justify-between"
                  >
                    <div>
                      <p className="text-white font-medium">{job.title}</p>
                      <p className="text-xs text-gray-400">{job.mode} • {job.duration}</p>
                    </div>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded">
                      {job.status || "Active"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Internships List */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Internships</h2>
            {internships.length === 0 ? (
              <p className="text-gray-500">No internships found.</p>
            ) : (
              <div className="space-y-3">
                {internships.map((intern) => (
                  <div
                    key={intern.id}
                    className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all flex justify-between"
                  >
                    <div>
                      <p className="text-white font-medium">{intern.title}</p>
                      <p className="text-xs text-gray-400">{intern.mode} • {intern.duration}</p>
                    </div>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded">
                      {intern.status || "Active"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Commented out — future sections */}
      {/*
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        ... alerts, orders, stats etc ...
      </div>
      */}
    </div>
  )
}


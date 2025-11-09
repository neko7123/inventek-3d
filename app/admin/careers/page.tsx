"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Eye, Download } from "lucide-react"
import { useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore"


interface JobPosting {
  id: string
  title: string
  specialization?: string
  description: string
  duration: string
  mode: string
  stipend: string
  skills: string[]
  status?: string
  applyLink?: string
  datePosted?: string
}

interface Application {
  id: string
  fullName: string
  email: string
  phone: string
  jobId: string
  jobTitle: string
  status: string
  cgpa: string
  dateApplied: string
}

export default function CareerManagement() {
  const [showJobModal, setShowJobModal] = useState(false)
  const [showAppModal, setShowAppModal] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const [internships, setInternships] = useState<JobPosting[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [showInternshipModal, setShowInternshipModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"jobs" | "internships" | "applications">("jobs")


  const exportCSV = (data: any[], filename: string) => {
    const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
  }

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch internships
          const internSnap = await getDocs(collection(db, "internships"));
          const internData = internSnap.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              title: (data.title || "").trim() || "Untitled Internship",
              specialization: data.specialization || "N/A",
              description: data.description || "No description available",
              duration: data.duration || "Not specified",
              mode: data.mode || "Not specified",
              stipend: data.stipend || "N/A",
              applyLink: data.applyLink || "",
              status: data.status || "Active",
              datePosted: data.datePosted || new Date().toISOString(),
              skills: Array.isArray(data.skills)
                ? data.skills.flatMap((s: string) => s.split(",").map((x) => x.trim()))
                : [],
            };
          }) as JobPosting[];
          setInternships(internData);

          // Fetch jobs
          const jobSnap = await getDocs(collection(db, "jobs"));
          const jobData = jobSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as JobPosting[];
          setJobs(jobData);
        } catch (err) {
          console.error("🔥 Error fetching career data:", err);
        }
      };

      fetchData();
    }, []);



    const handleDeleteJob = async (id: string) => {
      try {
        await deleteDoc(doc(db, "jobs", id));
        setJobs((prev) => prev.filter((job) => job.id !== id));
        console.log("Job deleted:", id);
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    };

      const handleDeleteInternship = async (id: string) => {
        try {
          await deleteDoc(doc(db, "internships", id));
          setInternships((prev) => prev.filter((intern) => intern.id !== id));
          console.log("Internship deleted:", id);
        } catch (error) {
          console.error("Error deleting internship:", error);
        }
      };

      const getStatusColor = (status?: string) => {
        switch (status) {
          case "Active":
            return "bg-green-500/20 text-green-300";
          case "Archived":
            return "bg-gray-500/20 text-gray-300";
          case "Shortlisted":
            return "bg-blue-500/20 text-blue-300";
          case "Under Review":
            return "bg-yellow-500/20 text-yellow-300";
          case "Rejected":
            return "bg-red-500/20 text-red-300";
          default:
            return "bg-gray-500/20 text-gray-300";
        }
      };

      const handleAddInternship = async (newInternship: Omit<JobPosting, "id">) => {
        try {
          // Generate the next internship ID (e.g., ITEKI001, ITEKI002)
          const newId = `ITEKI${String(internships.length + 1).padStart(3, "0")}`;

          const internshipWithId = { ...newInternship, id: newId };

          // Create document in Firestore with custom ID
          await setDoc(doc(db, "internships", newId), internshipWithId);

          // Update local state
          setInternships((prev) => [...prev, internshipWithId]);

          setShowInternshipModal(false);
          console.log("✅ Internship added:", internshipWithId);
        } catch (error) {
          console.error("🔥 Error adding internship:", error);
        }
      };


  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Career Management</h1>
        <p className="text-gray-400">Manage job postings and candidate applications</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === "jobs" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"
          }`}
        >
          Job Postings ({jobs.length})
        </button>

        <button
          onClick={() => setActiveTab("internships")}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === "internships" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"
          }`}
        >
          Internships ({internships.length})
        </button>

        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === "applications"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Applications ({applications.length})
        </button>
      </div>

      {/* Job Postings Section */}
      {activeTab === "jobs" && (
        <div>
          <button
            onClick={() => setShowJobModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg mb-6 transition-all duration-200"
          >
            <Plus size={20} />
            Add New Job
          </button>

          {jobs.length === 0 ? (
            <p className="text-gray-400">No jobs available yet.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-400 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{job.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{job.description}</p>
                    </div>

                    <div className="flex gap-2">
                      <button aria-label="edit job"
                        onClick={() => console.log("Edit job:", job.id)}
                        className="p-2 hover:bg-gray-700 rounded transition-all"
                      >
                        <Edit2 size={18} className="text-blue-400" />
                      </button>

                      <button aria-label="Delete job"
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 hover:bg-gray-700 rounded transition-all"
                      >
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Job ID</p>
                      <p className="text-white font-medium">{job.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Duration</p>
                      <p className="text-white font-medium">{job.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Mode</p>
                      <p className="text-white font-medium">{job.mode}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Stipend</p>
                      <p className="text-white font-medium">{job.stipend}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(job.skills) ? (
                        job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 italic">No skills listed</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

            {activeTab === "internships" && (
              <div>
                <button
                  onClick={() => setShowInternshipModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg mb-6 transition-all duration-200"
                >
                  <Plus size={20} />
                  Add New Internship
                </button>

                {internships.length === 0 ? (
                  <p className="text-gray-400">No internships available yet.</p>
                ) : (
                  <div className="space-y-4">
                    {internships.map((intern) => (
                      <div
                        key={intern.id}
                        className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-400 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-white">{intern.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(intern.status)}`}>
                                {intern.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{intern.description}</p>
                          </div>

                          <div className="flex gap-2">
                            <button aria-label="edit internship"
                              onClick={() => console.log("Edit internship:", intern.id)}
                              className="p-2 hover:bg-gray-700 rounded transition-all"
                            >
                              <Edit2 size={18} className="text-blue-400" />
                            </button>

                            <button aria-label="Delete internship"
                              onClick={() => handleDeleteInternship(intern.id)}
                              className="p-2 hover:bg-gray-700 rounded transition-all"
                            >
                              <Trash2 size={18} className="text-red-400" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Internship ID</p>
                            <p className="text-white font-medium">{intern.id}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Duration</p>
                            <p className="text-white font-medium">{intern.duration}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Mode</p>
                            <p className="text-white font-medium">{intern.mode}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Stipend</p>
                            <p className="text-white font-medium">{intern.stipend}</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <p className="text-sm text-gray-400 mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(intern.skills) ? (
                              intern.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded"
                                >
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 italic">No skills listed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

      {/* Applications Section */}
      {activeTab === "applications" && (
        <div>
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => exportCSV(applications, "applications.csv")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-700/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">CGPA</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Applied</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-all">
                      <td className="px-6 py-4 text-white">{app.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{app.jobId}</td>
                      <td className="px-6 py-4 text-white font-medium">{app.cgpa}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(app.status)}`}>{app.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{app.dateApplied}</td>
                      <td className="px-6 py-4">
                        <button
                          className="p-2 hover:bg-gray-600 rounded transition-all"
                          aria-label="View application details"
                          title="View application details"
                        >
                          <Eye size={18} className="text-blue-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showJobModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowJobModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Add New Job</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                // Generate a new ID dynamically (ITEKJ001, ITEKJ002, etc.)
                const newId = `ITEKJ${String(jobs.length + 1).padStart(3, "0")}`;

                const formData = new FormData(e.currentTarget);
                const newJob = {
                  id: newId,
                  title: formData.get("title") as string,
                  description: formData.get("description") as string,
                  stipend: formData.get("stipend") as string,
                  mode: formData.get("mode") as string,
                  skills: (formData.get("skills") as string)
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                  applyLink: formData.get("applyLink") as string,
                  status: formData.get("status") as string,
                  duration: formData.get("duration") as string,
                  datePosted: new Date().toISOString(),
                };

                try {
                  // Generate custom job ID (e.g., ITEKJ001, ITEKJ002, etc.)
                  const newId = `ITEKJ${String(jobs.length + 1).padStart(3, "0")}`;

                  const jobWithId = { ...newJob, id: newId };

                  // Create document using your custom ID
                  await setDoc(doc(db, "jobs", newId), jobWithId);

                  // Update state
                  setJobs((prev) => [...prev, jobWithId]);

                  setShowJobModal(false);
                  console.log("✅ Job added:", jobWithId);
                } catch (error) {
                  console.error("🔥 Error adding job:", error);
                }
              }}
              className="space-y-4"
            >
            <div>
              <label
                htmlFor="title"
                className="block text-sm text-gray-300 mb-1"
              >
                Job Title
              </label>

              <input
                id="title"
                name="title"
                required
                placeholder="Enter the job title"
                title="Job title"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </div>


              <div>
                <label
                  htmlFor="description"
                  className="block text-sm text-gray-300 mb-1"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows={3}
                  placeholder="Enter a short job or internship description"
                  title="Job or Internship description"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>


              <div>
                <label className="block text-sm text-gray-300 mb-1">Duration</label>
                <input name="duration" placeholder="e.g., 3 months" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Mode of Work</label>
                <input name="mode" placeholder="Online / Hybrid / Onsite" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Salary / Stipend</label>
                <input name="stipend" placeholder="₹20,000 / month" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Required Skills (comma separated)</label>
                <input name="skills" placeholder="React, Node.js, Firebase" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Application Link</label>
                <input name="applyLink" placeholder="https://..." className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm text-gray-300 mb-1"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                  title="Select status"   // 👈 extra accessibility boost
                >
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>


              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-all"
              >
                Save Job
              </button>
            </form>
          </div>
        </div>
      )}

        {showInternshipModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowInternshipModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">Add New Internship</h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);

                  const newInternship = {
                    title: formData.get("title") as string,
                    specialization: formData.get("specialization") as string,
                    description: formData.get("description") as string,
                    duration: formData.get("duration") as string,
                    mode: formData.get("mode") as string,
                    stipend: formData.get("stipend") as string,
                    skills: (formData.get("skills") as string)
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                    applyLink: formData.get("applyLink") as string,
                    status: formData.get("status") as string,
                    datePosted: new Date().toISOString(),
                  };

                  await handleAddInternship(newInternship);
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="title" className="block text-sm text-gray-300 mb-1">
                    Internship Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    required
                    placeholder="Enter internship title"
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Specialization</label>
                  <input name="specialization" placeholder="SolidWorks, CAD, etc." className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={3}
                    placeholder="Enter job or internship description"
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                  />
                </div>


                <div>
                  <label className="block text-sm text-gray-300 mb-1">Duration</label>
                  <input name="duration" placeholder="e.g., 1 month" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Mode of Work</label>
                  <input name="mode" placeholder="Online / Hybrid / Onsite" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Stipend</label>
                  <input name="stipend" placeholder="₹0 or ₹10,000/month" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Required Skills (comma separated)</label>
                  <input name="skills" placeholder="SolidWorks, CAD, 3D Modeling" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Application Link</label>
                  <input name="applyLink" placeholder="https://..." className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
                </div>

                    <div>
                      <label htmlFor="status" className="block text-sm text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                      >
                        <option value="Active">Active</option>
                        <option value="Archived">Archived</option>
                        <option value="Under Review">Under Review</option>
                      </select>
                    </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-all"
                >
                  Save Internship
                </button>
              </form>
            </div>
          </div>
        )}

    </div>
  )
}

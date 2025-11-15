"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Download, AlertCircle } from "lucide-react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  runTransaction,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: "3D" | "Electronics" | string;
  inventory: number;
  status: "Active" | "Out of stock" | "Discontinued" | "Inactive" | string;
  imageUrl?: string;
  createdDate?: string;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: string;
  orderDate: string;
  targetDate: string;
  address: string;
}

export default function ShopManagement() {

  useEffect(() => {
    return auth.onAuthStateChanged((usr) => {
      console.log("AUTH STATUS:", usr);
      setUser(usr);
      setLoadingAuth(false);
      if (!usr) router.push("/admin/login");
    });
  }, []);

  const router = useRouter();
  const auth = getAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]); // keep static or later connect to Firestore
  const [showProductModal, setShowProductModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "3D",
    inventory: 1,
    status: "Active",
    imageUrl: "",
  });

  // subscribe to products collection (live updates)
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name,
          description: data.description || "",
          price: data.price || 0,
          category: data.category || "3D",
          inventory: data.inventory ?? 0,
          status: data.status || "Inactive",
          imageUrl: data.imageUrl || "",
          createdDate: data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString().split("T")[0] : "",
        } as Product;
      });
      setProducts(docs);
    });

    return () => unsub();
  }, []);

  // Helper: export CSV (works same as before)
  const exportCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  // IMPORTANT: generate next product ID safely using a counters doc in Firestore (atomic)
  // This function uses a transaction to increment a counter and returns the new ID like ITEKS001.
  const genNextProductId = async (): Promise<string> => {
    const counterRef = doc(db, "counters", "products");
    const newId = await runTransaction(db, async (t) => {
      const snap = await t.get(counterRef);
      let next = 1;
      if (!snap.exists()) {
        t.set(counterRef, { seq: 1 });
        next = 1;
      } else {
        const current = (snap.data() as any).seq ?? 0;
        next = current + 1;
        t.update(counterRef, { seq: next });
      }
      return `ITEKS${String(next).padStart(3, "0")}`;
    });
    return newId;
  };

  // Create or update product
  const handleSaveProduct = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      if (editing) {
        // update existing product doc (id is editing.id)
        const prodRef = doc(db, "products", editing.id);
        await setDoc(
          prodRef,
          {
            name: form.name,
            description: form.description,
            price: Number(form.price),
            category: form.category,
            inventory: Number(form.inventory),
            status: form.status,
            imageUrl: form.imageUrl,
            // keep createdAt as is; you could update modifiedAt if you want
          },
          { merge: true }
        );
      } else {
        // create new product with generated ID
        const newId = await genNextProductId();
        const prodRef = doc(db, "products", newId);
        await setDoc(prodRef, {
          id: newId,
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          inventory: Number(form.inventory),
          status: form.status,
          imageUrl: form.imageUrl,
          createdAt: serverTimestamp(),
        });
      }

      // reset UI
      setShowProductModal(false);
      setEditing(null);
      setForm({
        name: "",
        description: "",
        price: 0,
        category: "3D",
        inventory: 1,
        status: "Active",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Check console.");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // open editor
  const openEditor = (p?: Product) => {
    if (p) {
      setEditing(p);
      setForm({
        name: p.name,
        description: p.description || "",
        price: p.price,
        category: p.category,
        inventory: p.inventory,
        status: p.status,
        imageUrl: p.imageUrl || "",
      });
    } else {
      setEditing(null);
      setForm({
        name: "",
        description: "",
        price: 0,
        category: "3D",
        inventory: 1,
        status: "Active",
        imageUrl: "",
      });
    }
    setShowProductModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300";
      case "Out of stock":
        return "bg-yellow-500/20 text-yellow-300";
      case "Discontinued":
        return "bg-gray-500/20 text-gray-300";
      case "Designing":
        return "bg-blue-500/20 text-blue-300";
      case "Printing":
        return "bg-purple-500/20 text-purple-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  // Orders: keep current static UI or later connect to Firestore (you said static for now).
  // ... (you can reuse your existing static orders data or migrate later)
      if (loadingAuth) {
        return (
          <div className="text-center text-white p-10">
            Checking admin authentication…
          </div>
        );
      }

      if (!user) return null; // Redirect in progress

  return (

    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Shop Management</h1>
        <p className="text-gray-400">Manage products and orders</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button aria-label="products" onClick={() => setActiveTab("products")} className={`px-4 py-2 font-medium ${activeTab === "products" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}>
          Products ({products.length})
        </button>
        <button aria-label="orders" onClick={() => setActiveTab("orders")} className={`px-4 py-2 font-medium ${activeTab === "orders" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}>
          Orders ({orders.length})
        </button>
      </div>

      {/* Product area */}
      {activeTab === "products" && (
        <div>
          <button aria-label="add-products" onClick={() => openEditor()} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg mb-6">
            <Plus size={20} /> Add Product
          </button>

          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-700/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Inventory</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-white font-medium">{p.name}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{p.id}</td>
                      <td className="px-6 py-4 text-white">₹{p.price}</td>
                      <td className="px-6 py-4 text-white">{p.inventory} units</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(p.status)}`}>{p.status}</span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button aria-label="editor" onClick={() => openEditor(p)} className="p-2 hover:bg-gray-600 rounded">
                          <Edit2 size={18} className="text-blue-400" />
                        </button>
                        <button aria-label="delete" onClick={() => handleDeleteProduct(p.id)} className="p-2 hover:bg-gray-600 rounded">
                          <Trash2 size={18} className="text-red-400" />
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

      {/* Orders (static for now) */}
      {activeTab === "orders" && (
        <div>
          <div className="flex gap-2 mb-6">
            <button aria-label="export CSV" onClick={() => exportCSV(orders, "orders.csv")} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
              <Download size={18} /> Export CSV
            </button>
          </div>
          {/* you can keep your current orders UI here unchanged */}
          <p className="text-gray-400">Orders remain static (Google Form) until you enable full order flow.</p>
        </div>
      )}

      {/* Product modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-lg p-6">
            <button onClick={() => setShowProductModal(false)} className="absolute top-4 right-4 text-gray-400">✕</button>
            <h3 className="text-xl font-bold text-white mb-4">{editing ? "Edit Product" : "Add Product"}</h3>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="text-sm text-gray-300 block mb-1">Name</label>
                <input required value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} className="w-full p-2 bg-gray-800 rounded text-white" placeholder="Product name" />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} className="w-full p-2 bg-gray-800 rounded text-white" placeholder="Short description" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Category</label>
                  <select aria-label="category" value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} className="w-full p-2 bg-gray-800 rounded text-white">
                    <option value="3D">3D Prints</option>
                    <option value="3D Printing">3D Printing</option>
                    <option value="CAD and CAE">CAD and CAE</option>
                    <option value="Customized">Customized</option>
                    <option value="Sustainablity">Sustainablity</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Status</label>
                  <select aria-label="status" value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))} className="w-full p-2 bg-gray-800 rounded text-white">
                    <option value="Active">Active</option>
                    <option value="Out of stock">Out of stock</option>
                    <option value="Discontinued">Discontinued</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Price (₹)</label>
                  <input type="number" min={0} value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: Number(e.target.value) }))} className="w-full p-2 bg-gray-800 rounded text-white" placeholder="299" />
                </div>
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Inventory</label>
                  <input aria-label="Inventory" type="number" min={0} value={form.inventory} onChange={(e) => setForm((s) => ({ ...s, inventory: Number(e.target.value) }))} className="w-full p-2 bg-gray-800 rounded text-white" />
                </div>
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Image URL</label>
                  <input
                    value={form.imageUrl}
                    onChange={(e) => {
                      const v = e.target.value.trim();

                      // User typed only a filename → auto prepend /products/
                      if (
                        v &&
                        !v.startsWith("http://") &&
                        !v.startsWith("https://") &&
                        !v.startsWith("/products/")
                      ) {
                        setForm((s) => ({ ...s, imageUrl: `/products/${v}` }));
                      } else {
                        setForm((s) => ({ ...s, imageUrl: v }));
                      }
                    }}
                    className="w-full p-2 bg-gray-800 rounded text-white"
                    placeholder="example: stand.jpg"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button type="submit" className="flex-1 px-4 py-2 bg-purple-600 rounded text-white">
                  {editing ? "Update Product" : "Create Product"}
                </button>
                <button type="button" onClick={() => setShowProductModal(false)} className="flex-1 px-4 py-2 bg-gray-700 rounded text-white">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

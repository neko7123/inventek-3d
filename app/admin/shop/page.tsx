"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Download, AlertCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  category: string
  inventory: number
  status: string
  createdDate: string
}

interface Order {
  id: string
  customerName: string
  email: string
  productName: string
  quantity: number
  totalAmount: number
  status: string
  orderDate: string
  targetDate: string
  address: string
}

export default function ShopManagement() {
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products")
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD001",
      name: "Custom Miniature Figure",
      price: 499,
      category: "Custom Prints",
      inventory: 15,
      status: "Active",
      createdDate: "2025-10-20",
    },
    {
      id: "PROD002",
      name: "Phone Stand",
      price: 349,
      category: "Accessories",
      inventory: 28,
      status: "Active",
      createdDate: "2025-10-15",
    },
    {
      id: "PROD003",
      name: "Desk Organizer",
      price: 599,
      category: "Office",
      inventory: 8,
      status: "Active",
      createdDate: "2025-10-18",
    },
  ])

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      customerName: "Rahul Sharma",
      email: "rahul@email.com",
      productName: "Custom Miniature Figure",
      quantity: 2,
      totalAmount: 998,
      status: "Printing",
      orderDate: "2025-11-01",
      targetDate: "2025-11-05",
      address: "Mumbai, Maharashtra",
    },
    {
      id: "ORD002",
      customerName: "Priya Patel",
      email: "priya@email.com",
      productName: "Phone Stand",
      quantity: 1,
      totalAmount: 349,
      status: "Completed",
      orderDate: "2025-10-28",
      targetDate: "2025-11-01",
      address: "Bangalore, Karnataka",
    },
    {
      id: "ORD003",
      customerName: "Aditya Kumar",
      email: "aditya@email.com",
      productName: "Desk Organizer",
      quantity: 3,
      totalAmount: 1797,
      status: "Packing",
      orderDate: "2025-11-02",
      targetDate: "2025-11-08",
      address: "Delhi, NCR",
    },
  ])

  const orderStatuses = [
    "Designing",
    "Printing",
    "Packing",
    "Pre-processing",
    "Post-processing",
    "Delivery",
    "Completed",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300"
      case "Inactive":
        return "bg-gray-500/20 text-gray-300"
      case "Designing":
        return "bg-blue-500/20 text-blue-300"
      case "Printing":
        return "bg-purple-500/20 text-purple-300"
      case "Packing":
        return "bg-yellow-500/20 text-yellow-300"
      case "Delivery":
        return "bg-orange-500/20 text-orange-300"
      case "Completed":
        return "bg-green-500/20 text-green-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const exportCSV = (data: any[], filename: string) => {
    const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  // Calculate dashboard stats
  const totalOrders = orders.length
  const ordersInProgress = orders.filter((o) => o.status !== "Completed").length
  const completedOrders = orders.filter((o) => o.status === "Completed").length
  const overdueOrders = orders.filter((o) => new Date(o.targetDate) < new Date() && o.status !== "Completed").length

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Shop Management</h1>
        <p className="text-gray-400">Manage products and orders</p>
      </div>

      {/* Order Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-white">{totalOrders}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">In Progress</p>
          <p className="text-3xl font-bold text-purple-400">{ordersInProgress}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-400">{completedOrders}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Overdue</p>
          <p className="text-3xl font-bold text-red-400">{overdueOrders}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === "products" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 font-medium transition-all duration-200 ${
            activeTab === "orders" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"
          }`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {/* Products Section */}
      {activeTab === "products" && (
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg mb-6 transition-all duration-200">
            <Plus size={20} />
            Add Product
          </button>

          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-700/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Product Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Inventory</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-all">
                      <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{product.id}</td>
                      <td className="px-6 py-4 text-white">₹{product.price}</td>
                      <td className="px-6 py-4 text-white">{product.inventory} units</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="p-2 hover:bg-gray-600 rounded transition-all">
                          <Edit2 size={18} className="text-blue-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-600 rounded transition-all">
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

      {/* Orders Section */}
      {activeTab === "orders" && (
        <div>
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => exportCSV(orders, "orders.csv")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>

          <div className="space-y-4">
            {orders.map((order) => {
              const isOverdue = new Date(order.targetDate) < new Date() && order.status !== "Completed"
              return (
                <div
                  key={order.id}
                  className={`bg-gray-800 rounded-lg border ${isOverdue ? "border-red-500" : "border-gray-700"} p-6`}
                >
                  {isOverdue && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <AlertCircle size={18} className="text-red-400" />
                      <p className="text-sm text-red-300">This order is overdue</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Order ID / Customer</p>
                      <p className="text-white font-bold">{order.id}</p>
                      <p className="text-gray-300 text-sm">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Product</p>
                      <p className="text-white">
                        {order.productName} (Qty: {order.quantity})
                      </p>
                      <p className="text-purple-400 font-semibold">₹{order.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Order Date</p>
                      <p className="text-white">{order.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Target Date</p>
                      <p className="text-white">{order.targetDate}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Delivery Address</p>
                    <p className="text-gray-300">{order.address}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Order Status</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded text-sm"
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <span className={`text-xs px-3 py-1 rounded ${getStatusColor(order.status)}`}>{order.status}</span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">View Details</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

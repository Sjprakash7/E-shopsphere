import { Routes, Route, Navigate } from "react-router-dom"

import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Dashboard from "../pages/dashboard/Dashboard"
import Products from "../pages/products/Products"
import Users from "../pages/users/Users"
import Orders from "../pages/orders/Orders"
import Reports from "../pages/reports/Reports"
import Payment from "../pages/payment/Payment"


import MasterLayout from "../components/layout/MasterLayout"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MasterLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
<Route path="/reports" element={<Reports />} />
<Route path="/payment" element={<Payment />} />


        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes

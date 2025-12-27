import { NavLink } from "react-router-dom"

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <aside className="sidebar">
      <div className="logo">ShopSphere</div>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "nav-item nav-active" : "nav-item"
        }
      >
        📊 Dashboard
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
            isActive ? "nav-item nav-active" : "nav-item"
        }
        >
        📦 Products
        </NavLink>

      <NavLink to="/payment" className="nav-item">
        💳 Payment
      </NavLink>

      <NavLink to="/orders" className="nav-item">
        🧾 Orders
      </NavLink>

      <NavLink to="/reports" className="nav-item">
        📈 Reports
      </NavLink>

      {/* ✅ ADMIN ONLY */}
      {user?.role === "Admin" && (
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav-item nav-active" : "nav-item"
          }
        >
          👥 Users
        </NavLink>
      )}
    </aside>
  )
}

export default Sidebar

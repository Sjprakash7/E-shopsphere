import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light-theme"
  )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login", { replace: true })
  }

  return (
    <header className="header">
      <input className="search-box" placeholder="Search..." />

      <div className="user-info">
        {/* 🔔 Notification */}
        <span style={{ cursor: "pointer" }}>🔔</span>

        {/* 🌙 / ☀️ Theme Toggle */}
        <span
          style={{ cursor: "pointer", fontSize: "18px" }}
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "light-theme" ? "🌙" : "☀️"}
        </span>

        {/* USER MENU */}
        <div className="user-menu">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="avatar"
            onClick={() => setOpen(!open)}
            style={{ cursor: "pointer" }}
          />

          {open && (
            <div className="dropdown">
              <div className="dropdown-item">
                <strong>{user?.name}</strong>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {user?.email}
                </div>
              </div>

              <div className="dropdown-divider" />

              <div
                className="dropdown-item"
                style={{ color: "#dc2626" }}
                onClick={handleLogout}
              >
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

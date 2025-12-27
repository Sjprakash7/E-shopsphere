import { useNavigate, Link } from "react-router-dom"
import authData from "../../data/auth.json"

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const user = authData.users.find(
      u => u.email === email && u.password === password
    )

    if (!user) {
      alert("Invalid credentials")
      return
    }

    localStorage.setItem("user", JSON.stringify(user))
    navigate("/dashboard", { replace: true })

  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>ShopSphere Login</h2>

        <input name="email" placeholder="Email" className="auth-input" />
        <input name="password" type="password" placeholder="Password" className="auth-input" />

        <button className="auth-btn">Login</button>

        <div className="auth-link">
          New user? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login

import { useNavigate, Link } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    alert("Demo register successful")
    navigate("/login")
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Register Shop</h2>

        <input placeholder="Name" className="auth-input" />
        <input placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />

        <button className="auth-btn">Register</button>

        <div className="auth-link">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register

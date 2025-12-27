import { useEffect, useState } from "react"
import { getDashboardData } from "../../services/dashboardService"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    todaySales: 0,
    visitors: 0
  })

  const [recentOrders, setRecentOrders] = useState([])
  const [weeklySales, setWeeklySales] = useState([])
  const [monthlySales, setMonthlySales] = useState([])
  const [yearlySales, setYearlySales] = useState([])

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    const { orders, payments, reports } = await getDashboardData()

    const today = new Date().toISOString().split("T")[0]

    /* ================= STATS ================= */
    const totalOrders = orders.length

    const totalRevenue = payments
      .filter(p => p.status === "Success")
      .reduce((s, p) => s + p.amount, 0)

    const todaySales = payments
      .filter(p => p.date === today && p.status === "Success")
      .reduce((s, p) => s + p.amount, 0)

    /* ================= WEEKLY DATA ================= */
    const weekData = [
      { label: "Mon", value: 12000 },
      { label: "Tue", value: 18000 },
      { label: "Wed", value: 15000 },
      { label: "Thu", value: 22000 },
      { label: "Fri", value: 26000 },
      { label: "Sat", value: 30000 },
      { label: "Sun", value: 17000 }
    ]

    /* ================= MONTHLY DATA ================= */
    const monthData = reports.map(r => ({
      label: r.month,
      value: r.revenue
    }))

    /* ================= YEARLY DATA ================= */
    const yearData = [
      { label: "2023", value: 280000 },
      { label: "2024", value: 410000 },
      { label: "2025", value: totalRevenue }
    ]

    /* ================= SET STATE ================= */
    setStats({
      totalOrders,
      totalRevenue,
      todaySales,
      visitors: totalOrders * 3
    })

    setWeeklySales(weekData)
    setMonthlySales(monthData)
    setYearlySales(yearData)
    setRecentOrders(orders.slice(-6).reverse())
  }

  return (
    <div className="dashboard">

      {/* WELCOME */}
      <div className="welcome-card">
        <div>
          <h2>Welcome Back 👋</h2>
          <p>Here’s what’s happening with your store</p>
        </div>
        <div className="welcome-icon">🛒</div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <Stat title="Total Orders" value={stats.totalOrders} />
        <Stat title="Total Revenue" value={`₹${stats.totalRevenue}`} />
        <Stat title="Today's Sales" value={`₹${stats.todaySales}`} />
        <Stat title="Visitors" value={stats.visitors} />
      </div>

      {/* GRAPHS */}
      <div className="graph-grid">
        <GraphCard title="Weekly Sales (₹)" data={weeklySales} />
        <GraphCard title="Monthly Sales (₹)" data={monthlySales} />
        <GraphCard title="Yearly Revenue (₹)" data={yearlySales} />
      </div>

      {/* RECENT ORDERS */}
      <div className="table-card">
        <h3>Recent Orders</h3>

        <table className="data-grid">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o.id}>
                <td>{o.orderNo}</td>
                <td>{o.customer}</td>
                <td>₹{o.amount}</td>
                <td>
                  <span className={`status-badge ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

/* ================= COMPONENTS ================= */

const Stat = ({ title, value }) => (
  <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
  </div>
)

const GraphCard = ({ title, data }) => (
  <div className="chart-card">
    <h3 className="chart-title">{title}</h3>

    <div className="bar-chart">
      {data.map(d => (
        <div key={d.label} className="bar-wrapper">
          <div
            className="bar"
            style={{ "--bar-height": `${d.value / 1200}px` }}
          >

            <span className="bar-tooltip">₹{d.value}</span>
          </div>
          <span className="bar-label">{d.label}</span>
        </div>
      ))}
    </div>
  </div>
)

export default Dashboard

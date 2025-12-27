import { useEffect, useState } from "react"
import { getPayments, addPayment } from "../../services/paymentService"

const Payment = () => {
  const [payments, setPayments] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    customer: "",
    amount: "",
    method: "Card"
  })

  /* LOAD PAYMENTS */
  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    const data = await getPayments()
    setPayments(data)
  }

  const totalReceived = payments
    .filter(p => p.status === "Success")
    .reduce((a, b) => a + b.amount, 0)

  const totalPending = payments
    .filter(p => p.status === "Pending")
    .reduce((a, b) => a + b.amount, 0)

  const savePayment = async () => {
    if (!form.customer || !form.amount) {
      alert("All fields are required")
      return
    }

    const newPayment = {
      paymentNo: `PAY-${Date.now()}`,
      customer: form.customer,
      method: form.method,
      amount: Number(form.amount),
      status: "Success",
      date: new Date().toISOString().split("T")[0]
    }

    await addPayment(newPayment)
    setShowModal(false)
    setForm({ customer: "", amount: "", method: "Card" })
    loadPayments()
  }

  return (
    <div>
      {/* HEADER */}
      <div className="products-header">
        <h2>Payments</h2>
        <button className="btn-buy" onClick={() => setShowModal(true)}>
          + Add Payment
        </button>
      </div>

      {/* SUMMARY */}
      <div className="payment-summary">
        <div className="payment-card">
          <h4>Total Received</h4>
          <p>₹{totalReceived}</p>
        </div>

        <div className="payment-card">
          <h4>Pending Amount</h4>
          <p>₹{totalPending}</p>
        </div>
      </div>

      {/* PAYMENTS TABLE */}
      <div className="payment-table">
        <table>
          <thead>
            <tr>
              <th>Payment No</th>
              <th>Customer</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>{p.paymentNo}</td>
                <td>{p.customer}</td>
                <td>{p.method}</td>
                <td>₹{p.amount}</td>
                <td
                  className={
                    p.status === "Success"
                      ? "payment-success"
                      : "payment-pending"
                  }
                >
                  {p.status}
                </td>
                <td>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD PAYMENT MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add Payment</h3>

            <input
              placeholder="Customer Name"
              value={form.customer}
              onChange={e =>
                setForm({ ...form, customer: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={e =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <select
              value={form.method}
              onChange={e =>
                setForm({ ...form, method: e.target.value })
              }
            >
              <option>Card</option>
              <option>UPI</option>
              <option>Cash</option>
            </select>

            <div className="modal-actions">
              <button
                className="btn-cart"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-buy" onClick={savePayment}>
                Add Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment
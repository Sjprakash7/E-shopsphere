const API_URL = "http://localhost:4000/payments"

export const getPayments = async () => {
  const res = await fetch(API_URL)
  return res.json()
}

export const addPayment = async (payment) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment)
  })
  return res.json()
}

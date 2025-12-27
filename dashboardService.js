const BASE_URL = "http://localhost:4000"

export const getDashboardData = async () => {
  const [orders, payments, reports] = await Promise.all([
    fetch(`${BASE_URL}/orders`).then(res => res.json()),
    fetch(`${BASE_URL}/payments`).then(res => res.json()),
    fetch(`${BASE_URL}/reports`).then(res => res.json())
  ])

  return { orders, payments, reports }
}

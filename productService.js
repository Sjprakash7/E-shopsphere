const API_URL = "http://localhost:4000/products"

export const getProducts = async () => {
  const res = await fetch(API_URL)
  return res.json()
}

export const addProduct = async (product) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  })
  return res.json()
}

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  })
  return res.json()
}

export const deleteProduct = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" })
}

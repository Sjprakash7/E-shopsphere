import { useEffect, useState } from "react"
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../../services/productService"

const Products = () => {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: ""
  })

  /* LOAD FROM API */
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const data = await getProducts()
    setProducts(data)
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setForm({ name: "", price: "", image: "" })
    setShowModal(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setForm(product)
    setShowModal(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith("image/")) {
      alert("Only image files allowed")
      return
    }
    setForm({ ...form, image: URL.createObjectURL(file) })
  }

  const saveProduct = async () => {
    if (!form.name || !form.price || !form.image) {
      alert("All fields required")
      return
    }

    if (editingProduct) {
      await updateProduct(editingProduct.id, form)
    } else {
      await addProduct(form)
    }

    setShowModal(false)
    loadProducts()
  }

  const removeProduct = async (id) => {
    if (window.confirm("Remove this product?")) {
      await deleteProduct(id)
      loadProducts()
    }
  }

  return (
    <div>
      <div className="products-header">
        <h2>Products</h2>
        <button className="btn-buy" onClick={openAddModal}>
          + Add Product
        </button>
      </div>

      <div className="products-grid">
        {products.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.image} className="product-image" />

            <div className="product-body">
              <div className="product-name">{p.name}</div>
              <div className="product-price">₹{p.price}</div>

              <div className="product-actions">
                <button className="btn-cart" onClick={() => openEditModal(p)}>
                  Edit
                </button>
                <button className="btn-buy" onClick={() => removeProduct(p.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>

            <input
              placeholder="Product Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {form.image && (
              <img
                src={form.image}
                style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
              />
            )}

            <div className="modal-actions">
              <button className="btn-cart" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-buy" onClick={saveProduct}>
                {editingProduct ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products

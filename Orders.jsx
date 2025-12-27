import { AgGridReact } from "ag-grid-react"
import orders from "../../data/orders.json"

const Orders = () => {
  const columns = [
    { headerName: "Order ID", field: "orderId", filter: true },
    { headerName: "Customer", field: "customer", filter: true },
    { headerName: "Date", field: "date" },
    { headerName: "Amount (₹)", field: "amount" },
    { headerName: "Status", field: "status" }
  ]

  return (
    <div>
      <h2 style={{ marginBottom: "12px" }}>Orders</h2>

      <div
        className="ag-theme-alpine"
        style={{ height: 400, background: "#fff" }}
      >
        <AgGridReact
          rowData={orders}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
          defaultColDef={{
            sortable: true,
            resizable: true,
            flex: 1
          }}
        />
      </div>
    </div>
  )
}

export default Orders

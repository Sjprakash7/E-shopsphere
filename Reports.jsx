import { AgGridReact } from "ag-grid-react"
import { ModuleRegistry } from "ag-grid-community"
import { ClientSideRowModelModule } from "ag-grid-community"
import reports from "../../data/reports.json"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

// ✅ Register required AG Grid module ONCE
ModuleRegistry.registerModules([ClientSideRowModelModule])

const Reports = () => {
  const totalOrders = reports.reduce((sum, r) => sum + r.orders, 0)
  const totalRevenue = reports.reduce((sum, r) => sum + r.revenue, 0)

  const columns = [
    { headerName: "Month", field: "month", filter: true },
    { headerName: "Orders", field: "orders", filter: "agNumberColumnFilter" },
    {
      headerName: "Revenue (₹)",
      field: "revenue",
      valueFormatter: (p) => `₹${p.value.toLocaleString()}`
    }
  ]

  return (
    <div>
      <h2 style={{ marginBottom: "12px" }}>Sales Reports</h2>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <div className="stat-card">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">{totalOrders}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* GRID */}
      <div
        className="ag-theme-alpine"
        style={{ height: 350, background: "#fff" }}
      >
        <AgGridReact
          rowData={reports}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1
          }}
        />
      </div>
    </div>
  )
}

export default Reports

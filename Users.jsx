import { useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import authData from "../../data/auth.json"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import { provideGlobalGridOptions } from 'ag-grid-community';

    provideGlobalGridOptions({ theme: "legacy" });
const Users = () => {
  const [rowData, setRowData] = useState(authData.users)

  const columns = [
    { field: "name", editable: true },
    { field: "email", editable: true },
    { field: "role", editable: true }
  ]

  const addUser = () => {
    setRowData([
      ...rowData,
      { id: Date.now(), name: "New User", email: "new@mail.com", role: "Staff" }
    ])
  }
const user = JSON.parse(localStorage.getItem("user"))

if (user?.role !== "Admin") {
  return <div>Access Denied</div>
}

  return (
    <div>
      <h2 style={{ marginBottom: "12px" }}>User Management</h2>
      <button onClick={addUser} className="auth-btn" style={{ width: "200px", marginBottom: "12px" }}>
        + Add User
      </button>

      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={{ flex: 1, resizable: true }}
        />
      </div>
    </div>
  )
}

export default Users

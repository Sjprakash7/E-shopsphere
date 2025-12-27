import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

const MasterLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MasterLayout

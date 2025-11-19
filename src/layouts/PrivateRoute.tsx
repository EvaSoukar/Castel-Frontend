import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace /> 
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}
export default PrivateRoute
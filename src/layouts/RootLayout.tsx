import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="font-body bg-secondary">
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  )
}
export default RootLayout
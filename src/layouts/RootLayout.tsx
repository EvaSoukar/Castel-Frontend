import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CastleProvider } from "../contexts/CastleContext";

const RootLayout = () => {
  return (
    <div className="font-body bg-secondary">
      <Navbar />
        <CastleProvider>
          <Outlet />
        </CastleProvider>
      <Footer />
    </div>
  )
}
export default RootLayout
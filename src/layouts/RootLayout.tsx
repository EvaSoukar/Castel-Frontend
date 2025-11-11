import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CastleProvider } from "../contexts/CastleContext";
import { AuthProvider } from "../contexts/AuthContext";

const RootLayout = () => {
  return (
    <div className="font-body bg-secondary text-dark-brown">
      <AuthProvider>
        <Navbar />
          <CastleProvider>
            <main className="min-h-screen">
              <Outlet />
            </main>
          </CastleProvider>
        </AuthProvider>
      <Footer />
    </div>
  )
}
export default RootLayout
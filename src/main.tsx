import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Castles from "./pages/Castles";
import Login from "./pages/Login";
import PrivateRoute from "./layouts/PrivateRoute";
import CreateCastle from "./pages/CreateCastle";
import Register from "./pages/Register";
import CastleDetails from "./pages/CastleDetails";
import FilteredCastles from "./pages/FilteredCastles";
import { MyBooking } from "./pages/MyBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "signup",
        element: <Register />
      },
      {
        path: "castles",
        element: <Castles />
      },
      {
        path: "FilteredCastles",
        element: <FilteredCastles />
      },
      {
        path: "castles/:castleId",
        element: <CastleDetails />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "myBookings",
        element: <MyBooking />
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "create-castle",
            element: <CreateCastle />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
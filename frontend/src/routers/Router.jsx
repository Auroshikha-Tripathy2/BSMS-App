<<<<<<< HEAD
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Shops from "../pages/Shops";
import ReaderHub from "../pages/ReaderHub";
import ShopkeeperHub from "../pages/ShopkeeperHub";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AdminLogin from "../components/auth/AdminLogin";
import ProtectedRoute from "../components/ProtectedRoute";
import Account from "../pages/Account";
import Settings from "../pages/Settings";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import ReadingStatus from "../pages/ReadingStatus";
import OrderHistory from "../pages/OrderHistory";
=======
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
// import Home from "../pages/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AdminLogin from "../components/auth/AdminLogin";
import AdminDashboard from "../pages/shpkpr/Dashboard";
import Dashboard from "../pages/shpkpr/Dashboard";
import Inventory from "../pages/shpkpr/Inventory";
import Orders from "../pages/shpkpr/Order";
>>>>>>> 0181b91 (Dashboard-FE)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
<<<<<<< HEAD
      { index: true, element: <Home /> },
      { path: "shops", element: <Shops /> },
      { path: "reader", element: <ReaderHub /> },
      { path: "shopkeeper", element: <ShopkeeperHub /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "status",
        element: (
          <ProtectedRoute>
            <ReadingStatus />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
=======
      { path: "/", element: <div className="p-4">Home</div> }
>>>>>>> 0181b91 (Dashboard-FE)
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin-login",
    element: <AdminLogin />
<<<<<<< HEAD
  }
]);

export default router;
=======
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />
  },
  // {
  //   path: "/inventory",
  //   element: <Inventory />
  // },
  // {
  //   path: "/orders",
  //   element: <Orders />
  // }
]);

export default router;
>>>>>>> 0181b91 (Dashboard-FE)

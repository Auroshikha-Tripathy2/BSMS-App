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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
  }
]);

export default router;

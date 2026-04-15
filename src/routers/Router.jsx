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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shops", element: <Shops /> },
      { path: "reader", element: <ReaderHub /> },
      { path: "shopkeeper", element: <ShopkeeperHub /> },
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

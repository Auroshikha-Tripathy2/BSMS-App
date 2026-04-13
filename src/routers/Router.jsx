import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
// import Home from "../pages/Home";
import Login from "../components/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <div className="p-4">Home</div> }
    ],
  },
  {
    path: "/login",
    element: <Login />
  }

]);

export default router;

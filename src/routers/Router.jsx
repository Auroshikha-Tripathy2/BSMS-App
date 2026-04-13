import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <div className="p-4">Home</div> },
      { path: "/shops", element: <div className="p-4">Shops</div> },
      { path: "/logout", element: <div className="p-4">Logout</div> },
      { path: "/account", element: <div>Account</div> },
      { path: "/settings", element: <div>Settings</div> },
      { path: "/stats", element: <div>Reading Stats</div> },
    ],
  },
]);

export default router;
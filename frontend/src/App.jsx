<<<<<<< HEAD
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/Router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
=======
import { RouterProvider } from "react-router-dom";
import router from "./routers/Router";


function App() {
  return <RouterProvider router={router} />;
}

export default App;
>>>>>>> 0181b91 (Dashboard-FE)

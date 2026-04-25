<<<<<<< HEAD
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/Router";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
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

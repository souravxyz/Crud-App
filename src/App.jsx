import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import ProductList from "./pages/ProductList.jsx";
import Signup from "./Auth/Signup.jsx";
import Signin from "./Auth/Signin.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import AuthRouter from "./utils/AuthRouter.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./Auth/LandingPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true, 
        element: <LandingPage />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        element: <AuthRouter />,
        children: [
          {
            path: "createProduct",
            element: <CreateProduct />,
          },
          {
            path: "productList",
            element: <ProductList />,
          },
          {
            path: "editProduct/:id",
            element: <EditProduct />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

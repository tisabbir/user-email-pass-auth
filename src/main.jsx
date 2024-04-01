import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Components/Error";
import HeroRegister from "./Components/HeroRegister";
import LogIn from "./Components/LogIn";
import Register from "./Components/Register";
import "./index.css";
import Home from "./Layouts/Home";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/heroRegister",
        element: <HeroRegister />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

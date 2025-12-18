import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import AuthLayout from "../auth/authLayout";
import Home from "../pages/home/page";
import Saved from "../pages/saveds/page";
import Categories from "../pages/categories/page";
import Suggestion from "../pages/suggestion/page";
import Login from "../auth/login/page";
import Signup from "../auth/signup/page";
import Error from "../pages/error/page";

import { homePageLoader, categoriesPageLoader } from "../api/loaders";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homePageLoader,
      },

      {
        path: "categories",
        element: <Categories />,
        loader: categoriesPageLoader
      },

      {
        path: "suggested",
        element: <Suggestion />,
      },

      {
        path: "saved",
        element: <Saved />,
      },

      // {
      //   path: "*",
      //   element: <Error />
      // }
    ],
  },

  {
    path: "/auth",
    errorElement: <Error />,
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

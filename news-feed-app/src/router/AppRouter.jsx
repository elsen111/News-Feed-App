import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import Home from "../pages/home/page";
import Saved from "../pages/Saved/page";
import Category from "../pages/category/page";
import Suggestion from "../pages/suggestion/page";
import Error from "../pages/error/page";

import { homeLoader } from "../api/loaders";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: homeLoader,
      },

      {
        path: "/categories",
        element: <Category />,
      },

      {
        path: "/suggested",
        element: <Suggestion />,
      },

      {
        path: "/saved",
        element: <Saved />,
      },

      {
        path: "*",
        element: <Error />
      }
    ],
  },
]);

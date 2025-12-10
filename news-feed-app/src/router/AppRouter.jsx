import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import Home from "../pages/home/page";
import Saved from "../pages/saveds/page";
import Categories from "../pages/categories/page";
import Suggestion from "../pages/suggestion/page";
import Error from "../pages/error/page";

import { homeLoader } from "../api/loaders";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: homeLoader,
      },

      {
        path: "/categories",
        element: <Categories />,
      },

      {
        path: "/suggested",
        element: <Suggestion />,
      },

      {
        path: "/saved",
        element: <Saved />,
      },

      // {
      //   path: "*",
      //   element: <Error />
      // }
    ],
  },
]);

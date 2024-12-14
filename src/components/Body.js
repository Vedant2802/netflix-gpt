import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  // const navigate = useNavigate();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    // {
    //   path: "./login",
    //   element: <Login />,
    // },

    {
      path: "/Browse",
      element: <Browse />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

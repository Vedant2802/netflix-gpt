import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
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

  // on every change of authentication state the store will be updated , this api is given to us by the Firebase
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photo: photoURL,
          })
        );
        // navigate("/browse");
      } else {
        dispatch(removeUser());
        // navigate("/");
      }
    });
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LOGIN_LOGO, PHOTO_URL } from "../constants/constants";

const Login = () => {
  const [isSignIn, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("name", name);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignIn);
  };
  // eslint-disable-next-line
  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      //sign up
      // api given to us by firebase
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("user", user);
          // navigate("/browse");
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              // Profile updated!
              const { uid, displayName, email, photoURL } = auth.currentUser; //We get this auth.currentUser from the firebase functionality
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photo: photoURL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in
      // api given to us by firebase
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("signedIn", user);
          // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          // className="w-44 h-44 mx-auto"
          src={LOGIN_LOGO}
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()} //inbuilt method given to us by form
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80 text-white rounded-lg"
      >
        <h1 className="text-2xl font-bold py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full bg-gray-600 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg"
        />
        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg"
        />

        <p>
          {errorMessage && (
            <span className="text-red-600 font-bold text-lg py-2">
              {errorMessage}
            </span>
          )}
        </p>

        <button
          className="p-4 my-4 bg-red-600 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn
            ? "Already a User! Please Sign In."
            : "Are You New to Netflix? Please Sign Up."}
        </p>
      </form>
    </div>
  );
};

export default Login;

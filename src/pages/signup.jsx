import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../components/firebase";

const Auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

const SignUp = () => {
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async () => {
    try {
      if (!Email || !Password || !Name) {
        alert("Please fill in all fields");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        Auth,
        Email,
        Password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: Name,
      });
      await set(ref(db, `users/${user.uid}`), {
        displayName: Name,
        email: user.email,
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userinfo = await signInWithPopup(Auth, provider);
      const using = userinfo.user;
      console.log(using);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-[url('https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2022/11/cover.webp?ssl=1&quality=80&w=800')] bg-cover bg-center flex flex-col justify-between p-4 sm:p-8">
      {/* Header Section */}
      <header className="text-center mb-8 pt-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg leading-tight font-mono">
          <span className="text-white">
            Cine<span className="text-red-600">PCX</span>
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mt-2 font-light">
          Your Ultimate Guide to Cinema
        </p>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className=" bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 max-w-2xl text-center border border-gray-200 gap-4">
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Create New Account
          </h4>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="border border-gray-100 rounded-sm text-xl text-gray-200  placeholder-shown:text-gray-400 placeholder-shown:p-2"
              placeholder="Enter Name"
              value={Name}
              onChange={(e) => SetName(e.target.value)}
              required
            />
            <input
              type="email"
              className="border border-gray-100 rounded-sm text-xl text-gray-200 placeholder-shown:text-gray-400 placeholder-shown:p-2"
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => SetEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="border border-gray-100 rounded-sm text-xl text-gray-200 placeholder-shown:text-gray-400 placeholder-shown:p-2"
              placeholder="Enter password"
              value={Password}
              onChange={(e) => {
                SetPassword(e.target.value);
              }}
              required
            />
            <p className="text-white">OR</p>
            <button
              onClick={handleGoogleSignup}
              className="bg-gradient-to-tr from-red-600 via-red-700 to-red-800 text-white text-xl py-2 cursor-pointer rounded-full"
            >
              Sign Up With Google
            </button>
          </div>
          <p className="text-white p-2 mt-2">
            Already have an account?{" "}
            <NavLink to="/login">
              <button className=" text-red-600 cursor-pointer">Login</button>
            </NavLink>
          </p>
          <button
            onClick={handleEmailSignup}
            className=" mt-2 bg-gradient-to-tr from-red-600 via-red-700 to-red-800 text-white font-bold py-3 px-8 rounded-3xl text-xl shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75"
          >
            Create New Account
          </button>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="text-center mt-8 pb-4">
        <p className="text-gray-300 text-sm">
          Made by <span className=" text-red-600">Tiyas</span>
        </p>
      </footer>
    </div>
  );
};

export default SignUp;

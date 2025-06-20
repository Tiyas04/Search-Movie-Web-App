import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";
import { app } from "../components/firebase";

const auth = getAuth(app);
const db = getDatabase(app);

const Login = () => {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const navigate = useNavigate();

  const HandleLogin = async () => {
    try {
      if (!Email || !Password) {
        alert("Please fill in both email and password.");
        return;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      const user = userCredential.user;
      const nowUTC = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(nowUTC.getTime() + istOffset);
    const istString = istTime.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });

    // Store in database
    await set(ref(db, `users/${user.uid}/lastLoginIST`), istString);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
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
            Login to Your Account
          </h4>
          <div className="flex flex-col gap-6">
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
          </div>
          <p className="text-white p-2 mt-2">
            Don't have an account?{" "}
            <NavLink to="/signup">
              <button className=" text-red-600 cursor-pointer">Signup </button>
            </NavLink>
          </p>
          <button
            className=" mt-2 bg-gradient-to-tr from-red-600 via-red-700 to-red-800 text-white font-bold py-3 px-8 rounded-3xl text-xl shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75"
            onClick={HandleLogin}
          >
            Login
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

export default Login;

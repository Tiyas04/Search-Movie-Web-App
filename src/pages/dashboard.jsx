import { Link } from "react-router-dom";
import SlideBar from "../components/slidebar";
import { User, Search, Film } from "lucide-react";
import Profile from "./profile";

const DashBoard = () => {
  return (
    <div className="flex flex-row bg-gray-950 min-h-screen z-0">
      <SlideBar />

      <div className="flex-1 flex flex-col">
        {/* Hero Section with Background */}
        <div className="relative h-64 w-full bg-cover bg-center rounded-b-3xl shadow-xl overflow-hidden"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598899134739-b98e1c65f06b?auto=format&fit=crop&w=1950&q=80')" }}>
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide font-mono">
              Cine<span className="text-red-500">PCX</span>
            </h1>
            <p className="mt-2 text-lg md:text-2xl font-light">
              Your Gateway to the World of Cinema 🎥
            </p>
          </div>
        </div>

        {/* Navigation Cards */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-10">
          {/* Movie Search */}
          <Link
            to="/search"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-6 h-6 text-red-400 group-hover:text-white" />
              <h2 className="text-xl font-semibold">Movie Search</h2>
            </div>
            <p className="text-sm text-gray-300 group-hover:text-white transition-all">
              Dive deep into details, posters, ratings, and more for any movie.
            </p>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-2">
              <User className="w-6 h-6 text-red-400 group-hover:text-white" />
              <h2 className="text-xl font-semibold">Your Profile</h2>
            </div>
            <p className="text-sm text-gray-300 group-hover:text-white transition-all">
              Customize preferences, save favorites, and track viewing habits.
            </p>
          </Link>

          {/* Coming Soon */}
          <div
            className="group bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-semibold">Coming Soon</h2>
            </div>
            <p className="text-sm text-gray-300">
              Upcoming: Watchlists, trailers, and social movie ratings.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-gray-500 text-xs">
        <p className="text-gray-300 text-sm">
         Made by <span className=" text-red-600">Tiyas</span>
        </p>
        </footer>
      </div>
    </div>
  );
};

export default DashBoard;

import { NavLink } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className="min-h-screen min-w-screen bg-[url('./public/Background.webp')] bg-cover bg-center flex flex-col justify-between p-4 sm:p-8">
      
      {/* Header Section */}
      <header className="text-center mb-8 pt-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg leading-tight font-mono">
          <span className="text-white">Cine<span className="text-red-600">PCX</span></span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mt-2 font-light">
          Your Ultimate Guide to Cinema
        </p>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className=" bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 max-w-2xl text-center border border-gray-200">
          <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Your Next Favorite Movie
          </h4>
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-6">
            Explore the latest blockbusters, hidden gems, and timeless classics. Your perfect movie night starts here.
          </p>
          <NavLink to="/login">
          <button className="bg-gradient-to-tr from-red-600 via-red-700 to-red-800 text-white font-bold py-3 px-8 rounded-3xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75 cursor-pointer">
            Get Started
          </button>
          </NavLink>
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

export default GetStarted;
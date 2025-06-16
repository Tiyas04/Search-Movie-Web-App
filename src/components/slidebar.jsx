import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const SlideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const NavItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Search", path: "/search" },
        { name: "Profile", path: "/profile" }
    ];

    function HandleLogout() {
        // Handle logout logic here
        console.log("Logging out...");
    }

    return (
        <div
            className={`h-screen bg-gradient-to-tl from-gray-700 via-gray-800 to-gray-900 flex flex-col transition-all duration-300 ease-in-out z-30 md:z-0
            ${isOpen ? 'w-10/12 md:w-1/5' : 'w-16'} md:relative `}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-3 focus:outline-none self-end md:self-start"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Title */}
            {isOpen && (
                <h1 className="text-3xl md:text-5xl text-white font-extrabold font-mono mt-1 ml-2 whitespace-nowrap">
                    Cine<span className='text-red-600'>PCX</span>
                </h1>
            )}

            {/* Navigation */}
            <nav className="mt-6 flex flex-col gap-4">
                {NavItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `text-white font-semibold text-lg hover:scale-105 transform ease-in-out duration-300 transition-transform p-2 rounded-xl ${
                                isActive ? 'bg-gradient-to-tl from-red-500 via-red-600 to-red-700 w-11/12' : ''
                            } ${isOpen ? 'ml-3' : 'text-sm text-center ml-0'}`
                        }
                    >
                        {isOpen ? item.name : item.name[0]}
                    </NavLink>
                ))}

                {/* Logout */}
                <div
                    className={`cursor-pointer text-white font-semibold text-lg hover:scale-105 transform ease-in-out duration-300 transition-transform p-2 rounded-xl ${isOpen ? 'ml-3' : 'text-sm text-center ml-0'}`}
                    onClick={HandleLogout}
                >
                    {isOpen ? "Logout" : "⎋"}
                </div>
            </nav>
        </div>
    );
};

export default SlideBar;

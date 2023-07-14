'use client';
import { useState } from 'react';

export default function Screen() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    // Implement your logout functionality here
    console.log("Logout Function");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-[#bc7101] text-white flex justify-between">
        <h1 className="text-2xl">Goregaon Jamaat Broadcasting App</h1>
        <div className="relative inline-block">
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center px-4 py-2 bg-[#edb767] text-black"
            >
              User Name
              <svg
                className="w-4 h-4 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                stroke="none"
              >
                <path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path>
              </svg>
            </button>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
              <a
                href="#"
                className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 p-10 flex justify-center">
        <iframe
          width="1400"
          height="787"
          src="https://www.youtube.com/embed/6Wca7Svh7Kg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
}

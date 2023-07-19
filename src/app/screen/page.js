'use client';
import { useEffect, useState } from 'react';

export default function Screen() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(user);
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      // Replace with your own redirect logic
      window.location.href = '/';
    }
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          its: userData?.its,
        }),
      });
      if (!response.ok) throw new Error('Logout failed');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  useEffect(() => {
    const logoutUser = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        try {
          const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              its: user?.its,
            }),
          });
          if (!response.ok) throw new Error('Logout failed');
          localStorage.removeItem('user');
        } catch (error) {
          console.error('Failed to logout:', error);
        }
      }
    };

    window.addEventListener('beforeunload', logoutUser);

    return () => {
      window.removeEventListener('beforeunload', logoutUser);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-[#1c6e04] text-white flex justify-between">
        <h1 className="text-2xl">Goregaon Jamaat Broadcasting App</h1>
        <div className="relative inline-block">
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center px-4 py-2 bg-[#edb767] text-black"
            >
              {userData?.name}
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
                className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-[#1c6e04] hover:text-white"
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
          src="https://www.youtube.com/embed/6Wca7Svh7Kg?modestbranding=1&autoplay=1&sprivacy-enhanced-mode=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </main>
    </div>
  );
}

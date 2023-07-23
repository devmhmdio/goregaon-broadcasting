'use client';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './style.css';

export default function Screen() {
  const [userData, setUserData] = useState(null);
  const [youtube, setYoutube] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/get-youtube-url');
      const data = await res.json();
      setYoutube(data.url);
    };
    fetchData();
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
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-[#edb767] text-black"
            >
              Logout
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
        <div>
          <ReactPlayer
            url={youtube}
            controls={true}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  controls: 1,
                  disablekb: 1,
                  autoplay: 1,
                  rel: 0,
                },
              },
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '100px',
              right: '13vw',
              width: '700px',
              height: '100px',
              backgroundColor: 'transparent',
              zIndex: '1',
            }}
          ></div>
        </div>
      </main>
    </div>
  );
}

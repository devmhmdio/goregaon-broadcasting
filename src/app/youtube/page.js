'use client';

import { useEffect, useState } from 'react';

export default function Youtube() {
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && JSON.parse(user).userRole === 'admin') {
      setUserData(JSON.parse(user));
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/youtube", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (res.status === 200) {
      alert('URL updated successfully');
      window.location.reload();
    } else {
      alert('URL not added');
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          its: userData?.its
        })
      });
      if (!response.ok) throw new Error('Logout failed');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-[#1c6e04] text-white flex justify-between">
        <h1 className='text-2xl'>Goregaon Jamaat Broadcasting App</h1>
        <div className="relative inline-block">
          <div>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="inline-flex items-center px-4 py-2 bg-[#edb767] color-[#1c6e04]">
              {userData?.name}
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" stroke="none"><path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path></svg>
            </button>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
              <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-[#1c6e04] hover:text-white" onClick={handleLogout}>Logout</a>
            </div>
          )}
        </div>
      </header>
      <div className="flex-1 flex min-h-screen">
        <aside className="p-4 w-64 bg-[#edb767]">
          <ul className="space-y-2">
            <li><a href="/admin" className="block">Add Users</a></li>
            {/*<li><a href="#!" className="block">View Reports</a></li>*/}
            <li><a href="/screen" className="block">Live Screen</a></li>
            <li><a href="/viewUsers" className="block">View Users</a></li>
            <li><a href="/youtube" className="block">Change URL</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-24">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="name" className="block">Youtube Url:</label>
                <input 
                  type="text" 
                  id="url" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  required 
                  className="px-3 py-2 border border-gray-300 block w-full"
                />
              </div>
            </div>
            <button type="submit" className="px-4 py-2 text-white">Update URL</button>
          </form>
        </main>
      </div>
    </div>
  );
}
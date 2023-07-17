'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Login() {
  const [its, setIts] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ its }),
    });

    const data = await res.json();

    console.log('this is response', data);
    if (data.status === 'Already logged in') {
      alert('Already logged in');
      window.location.reload();
    }

    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.userRole === 'user') {
        if (data.user.isLoggedIn === false) {
          window.location.href = '/screen';
        } else {
          alert('Already logged in');
          window.location.reload();
        }
      } else if (data.user.userRole === 'admin') {
        window.location.href = '/admin';
      }
    } else {
      const body = await res.json();
      setError(body.error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="relative flex place-items-center z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/ITS_Logo_Golden.png"
          alt="App Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col mt-8">
        <label htmlFor="its" className="mb-2">
          Enter ITS:
        </label>
        <input
          type="number"
          id="its"
          value={its}
          onChange={(e) => setIts(e.target.value)}
          required
          className="mb-4 px-3 py-2 border border-gray-300"
        />
        <button type="submit" className="px-4 py-2 bg-[#1c6e04] text-white">
          View Waaz
        </button>
      </form>
    </main>
  );
}

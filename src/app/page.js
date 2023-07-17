'use client'

import { useState } from "react"
import Image from "next/image";

export default function Login() {
  const [its, setIts] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ its }),
    });

    if (res.status === 200) {
      window.location.href = '/admin';
    } else {
      // If it wasn't, show an error message
      const body = await res.json();
      setError(body.error);
    }

    // Do something with email
    console.log(`ITS: ${its}`);
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
        <label htmlFor="its" className="mb-2">Enter ITS:</label>
        <input 
          type="number" 
          id="its" 
          value={its} 
          onChange={(e) => setIts(e.target.value)} 
          required 
          className="mb-4 px-3 py-2 border border-gray-300"
        />
        <button type="submit" className="px-4 py-2 bg-[#bc7101] text-white">View Waaz</button>
      </form>
    </main>
  );
}

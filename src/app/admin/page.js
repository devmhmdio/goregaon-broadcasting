'use client'
import { useState } from 'react';

export default function Admin() {
  const [name, setName] = useState('');
  const [its, setITS] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with name, ITS, phone, address
    console.log(`Name: ${name}, ITS: ${its}, Phone: ${phone}, Address: ${address}`);
  };

  const handleLogout = () => {
    // Implement your logout functionality here
    console.log("Logout Function");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-[#bc7101] text-white flex justify-between">
        <h1 className='text-2xl'>Goregaon Jamaat Broadcasting App</h1>
        <div className="relative inline-block">
          <div>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="inline-flex items-center px-4 py-2 bg-[#edb767] text-black">
              User Name
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" stroke="none"><path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path></svg>
            </button>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
              <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white" onClick={handleLogout}>Logout</a>
            </div>
          )}
        </div>
      </header>
      <div className="flex-1 flex min-h-screen">
        <aside className="p-4 w-64 bg-[#edb767]">
          <ul className="space-y-2">
            <li><a href="#!" className="block">Create Login</a></li>
            <li><a href="#!" className="block">View Reports</a></li>
            <li><a href="#!" className="block">View Screen</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-24">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="name" className="block">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="px-3 py-2 border border-gray-300 block w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="its" className="block">ITS:</label>
                <input 
                  type="text" 
                  id="its" 
                  value={its} 
                  onChange={(e) => setITS(e.target.value)} 
                  required 
                  className="px-3 py-2 border border-gray-300 block w-full"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="phone" className="block">Phone:</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  className="px-3 py-2 border border-gray-300 block w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="address" className="block">Address:</label>
                <input 
                  type="text" 
                  id="address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  required 
                  className="px-3 py-2 border border-gray-300 block w-full"
                />
              </div>
            </div>
            <button type="submit" className="px-4 py-2 bg-[#bc7101] text-white">Submit</button>
          </form>
        </main>
      </div>
    </div>
  );
}

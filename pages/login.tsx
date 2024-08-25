import "@/styles/globals.css";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username); // Store username
    router.push('/');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        <div className="flex flex-col items-center justify-center w-[500px] h-[300px] bg-gray-700 drop-shadow-lg rounded-md shadow-black">
          <h1 className="text-2xl mb-4 text-white">Sympre Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2 p-2 border border-gray-500 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-0 drop-shadow-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-2 border border-gray-500 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-0 drop-shadow-md"
          />
          <button
            onClick={handleLogin}
            className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 active:bg-white active:text-black drop-shadow-md"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}


import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black text-center">
      <form
        onSubmit={handleSubmit}
        className='space-y-6'
      >
        <h1 className='font-bold text-2xl'>Sign Up</h1>
        <p className='font-light'>Be a part of the creativity in food</p>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 rounded-xl shadow-sm bg-gray-300"
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl shadow-sm bg-gray-300"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-xl shadow-sm bg-gray-300"
          />
        </div>
        <p>or</p>
        <button
          type="submit"
          className="w-full bg-dark-yellow p-2 rounded-xl"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

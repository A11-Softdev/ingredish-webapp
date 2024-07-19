import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black text-center">
      <form
        onSubmit={handleSubmit}
      >
        <h1 className='font-bold text-2xl'>Login</h1>
        <p className='font-light'>make everyday cooking EZ!</p>
        <div className="my-4">
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Username'
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
        <button
          type="submit"
          className="w-full bg-dark-yellow p-2 rounded-md"
        >
          Login
        </button>
        <p>or</p>
        <p>No account yet?</p>
        <button
          className="w-full bg-dark-yellow p-2 rounded-md"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;

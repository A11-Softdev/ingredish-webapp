'use client';

import Link from "next/link";
import { useState } from "react";
import { LoginFormData } from "../types/LoginTypes";

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({username, password});
    }

    return (
        <form
        onSubmit={handleSubmit}
        className='space-y-6'
      >
        <h1 className='font-bold text-2xl'>Login</h1>
        <p className='font-light'>make everyday cooking EZ!</p>
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
          className="w-full bg-dark-yellow p-2 rounded-xl"
        >
          Login
        </button>
        <p>or</p>
        <p>No account yet?</p>
        <Link
          href="/register"

        >
          <button className="w-full bg-dark-yellow p-2 rounded-xl">Sign up</button>

        </Link>
      </form>
    );
}

export default LoginForm;
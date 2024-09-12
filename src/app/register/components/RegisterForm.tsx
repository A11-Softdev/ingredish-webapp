'use client';

import { useState } from 'react';
import { RegisterFormData } from '../types/RegisterTypes';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ email, password, username });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <h1 className='font-bold text-2xl'>Sign Up</h1>
      <input
        type="text"
        value={username}
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full p-3 rounded-xl shadow-sm bg-gray-300"
      />
      <input
        type="email"
        value={email}
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 rounded-xl shadow-sm bg-gray-300"
      />
      <input
        type="password"
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 rounded-xl shadow-sm bg-gray-300"
      />
      <button type="submit" className="w-full bg-dark-yellow p-2 rounded-xl">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;

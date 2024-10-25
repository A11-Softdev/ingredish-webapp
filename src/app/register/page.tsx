'use client';

import RegisterForm from './components/RegisterForm';
import { registerUser } from './api/registerUser';
import { RegisterFormData } from './types/RegisterTypes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      const result = await registerUser(formData);
      Cookies.set('token', result.access_token, { expires: 7, path: '/' });
      console.log('Registration successful:', result);
      router.push('/home');
    } catch (error: any) {
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black text-center">
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;

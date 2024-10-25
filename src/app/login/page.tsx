'use client'

import { useRouter } from 'next/navigation';
import { LoginFormData } from "./types/LoginTypes";
import { login } from "./api/login";
import Cookies from "js-cookie";
import LoginForm from "./components/LoginForm";


const Login = () => {
  const router = useRouter();

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const result = await login(formData);
      Cookies.set('token', result.access_token, { expires: 7, path: '/' });
      Cookies.set('userId' , result.user_id, { expires: 7, path: '/' });
      router.push('/home');
    } catch (error: any) {}
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black text-center">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;

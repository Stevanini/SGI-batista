'use client';
import Form from './form';

export default function Login() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-1/4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">Faça login em sua conta</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form />
        </div>
      </div>

      <div className="w-3/4 h-screen flex justify-center items-center auth-bg hidden md:flex"></div>
    </div>
  );
}

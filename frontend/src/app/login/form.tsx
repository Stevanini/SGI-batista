import { useForm } from 'react-hook-form';

const form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Dados do formulário:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-100">
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="admin@sgi.com"
            required
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('email', { required: 'Email obrigatório' })}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
            Senha
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            placeholder="******"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('password', { required: 'Senha obrigatório' })}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-[#fa8a03] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ffa22f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Entrar
        </button>
      </div>
    </form>
  );
};

export default form;

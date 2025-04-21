'use client';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // Aqui você pode enviar os dados para uma API ou serviço de email
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="container-1560 px-4 md:px-8 mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-10 text-center font-serif">Contato</h2>
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow overflow-hidden">
          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  {...register('name', { required: 'Nome obrigatório' })}
                  placeholder="Full name"
                  className="w-full rounded-2xl bg-zinc-50 px-6 py-4 text-zinc-700 placeholder-zinc-400 outline-none border-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && <span className="text-red-500 text-xs ml-2">{errors.name.message}</span>}
              </div>
              <div className="flex-1">
                <input
                  {...register('email', { required: 'Email obrigatório' })}
                  placeholder="Email address"
                  type="email"
                  className="w-full rounded-2xl bg-zinc-50 px-6 py-4 text-zinc-700 placeholder-zinc-400 outline-none border-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && <span className="text-red-500 text-xs ml-2">{errors.email.message}</span>}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  {...register('phone')}
                  placeholder="Phone number"
                  className="w-full rounded-2xl bg-zinc-50 px-6 py-4 text-zinc-700 placeholder-zinc-400 outline-none border-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1">
                <input
                  {...register('subject')}
                  placeholder="Subject"
                  className="w-full rounded-2xl bg-zinc-50 px-6 py-4 text-zinc-700 placeholder-zinc-400 outline-none border-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <textarea
              {...register('message', { required: 'Mensagem obrigatória' })}
              placeholder="Write message"
              rows={5}
              className="w-full rounded-2xl bg-zinc-50 px-6 py-4 text-zinc-700 placeholder-zinc-400 outline-none border-none focus:ring-2 focus:ring-primary resize-none"
            />
            {errors.message && <span className="text-red-500 text-xs ml-2">{errors.message.message}</span>}
            <button
              type="submit"
              className="mt-4 w-48 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 shadow transition self-start"
            >
              Enviar
            </button>
          </form>
          {/* Informações de contato */}
          <div className="flex-1 bg-zinc-50 flex flex-col items-center justify-center gap-4 min-w-[260px] p-8">
            <h3 className="text-lg font-bold mb-2">Address</h3>
            <p className="text-zinc-500">
              88 New Street, Washington DC
              <br />
              United States, America
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2">Phone</h3>
            <p className="text-zinc-500">
              Local: 666 888 0000
              <br />
              Mobile: 000 8888 999
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2">Email</h3>
            <p className="text-zinc-500">
              needhelp@company.com
              <br />
              inquiry@asting.com
            </p>
            <h3 className="text-lg font-bold mt-4">Follow</h3>
            <div className="flex gap-4 mt-2 justify-center">
              <a
                href="#"
                className="rounded-full bg-[#405DE6] w-12 h-12 flex items-center justify-center text-white text-2xl hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="rounded-full bg-[#1DA1F2] w-12 h-12 flex items-center justify-center text-white text-2xl hover:scale-110 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="rounded-full bg-[#e130a0] w-12 h-12 flex items-center justify-center text-white text-2xl hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="rounded-full bg-[#FF0000] w-12 h-12 flex items-center justify-center text-white text-2xl hover:scale-110 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

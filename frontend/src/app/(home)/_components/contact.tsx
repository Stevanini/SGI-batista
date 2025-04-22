'use client';
import { useForm } from 'react-hook-form';
import { SocialLinks } from '~/components/atoms/SocialLinks';
import { useContato } from '../../../hooks/useContato';
import { useRef } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const { contato, loading, error } = useContato();

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (data: ContactFormData) => {
    if (!contato?.telefone) return;
    const whatsappNumber = contato.telefone.replace(/\D/g, '');
    const message = `Nome: ${data.name}\nEmail: ${data.email}\nMensagem: ${data.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  if (loading) return <div>Carregando contato...</div>;
  if (error) return <div>Erro ao carregar contato: {error}</div>;
  if (!contato) return <div>Nenhum contato encontrado.</div>;

  return (
    <section id="contact" className="w-full py-16 bg-white">
      <div className="container-1560 px-4 md:px-8 mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-10 text-center font-serif">Contato</h2>
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow overflow-hidden">
          {/* Formulário */}
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-4 p-6 md:p-10">
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
            <h3 className="text-lg font-bold mb-2">Endereço</h3>
            <p className="text-zinc-500">
              {contato.endereco}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2">WhatsApp</h3>
            <p className="text-zinc-500">
              Local: {contato.telefone}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2">Email</h3>
            <p className="text-zinc-500">
              <a href={`mailto:${contato.email}`} className="underline hover:text-orange-500 transition">
                {contato.email}
              </a>
            </p>
            <h3 className="text-lg font-bold mt-4">Redes Sociais</h3>
            <SocialLinks
              className="mt-2 justify-center"
              iconSize={24}
              facebook={contato.facebook}
              instagram={contato.instagram}
              youtube={contato.youtube}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

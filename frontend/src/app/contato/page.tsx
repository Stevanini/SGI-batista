import Image from "next/image";
import Link from 'next/link';
import bannercontact from "../../../assets/bannerContato.jpg";
import './style.css';

export default function Contact() {
  // UTILIZAR "REACT HOOK FORM" PARA ENVIAR O FORMULÁRIO
  return (
    <div className="w-full h-full">
      <div className="headerContact w-full">
        <Image
          className="headerImage"
          src={bannercontact}
          alt="Picture of the author"
        />
        <div className="headerTitle text-white text-center font-semibold text-lg"> {/* Tem uma posição absoluta */}
          <h2 className="text-4xl">Contato</h2>
          <p className="text-sm"><Link className="hover:underline" href={'/'} >Home</Link> / Contato</p>
        </div>
      </div>

      <div className="contentContact w-[900px] m-auto my-10 p-10 rounded-[10px] border-[#333] shadow">
        <div className="contentTitle text-center">
          <p className="text-sm">Faça sua pergunta</p>
          <h2 className="text-2xl">Contate-nos</h2>
        </div>
        <div className="contentForm">
          <form>
            <div className="flex flex-col my-3">
              {/* <label htmlFor="name">Nome completo</label> */}
              <input className="p-3 rounded-2xl border-[1px] shadown-sm bg-[#f7f4f2]" type="text" id="name" placeholder="Nome completo" />
            </div>
            <div className="flex flex-col my-3">
              {/* <label htmlFor="email">Email</label> */}
              <input className="p-3 rounded-2xl border-[1px] shadown-sm bg-[#f7f4f2]" type="text" id="email" placeholder="Email" />
            </div>
            <div className="flex flex-col my-3">
              {/* <label htmlFor="phone">Número de contato</label> */}
              <input className="p-3 rounded-2xl border-[1px] shadown-sm bg-[#f7f4f2]" type="text" id="phone" placeholder="Número de contato" />
            </div>
            <div className="flex flex-col my-3">
              {/* <label htmlFor="subject">Assunto</label> */}
              <input className="p-3 rounded-2xl border-[1px] shadown-sm bg-[#f7f4f2]" type="text" id="subject" placeholder="Digite o assunto aqui..." />
            </div>
            <div className="flex flex-col my-3">
              {/* <label htmlFor="ask">Digite sua mensagem</label> */}
              <textarea className="p-3 resize-none rounded-2xl border-[1px] shadown-sm bg-[#f7f4f2]" disa id="ask" rows={5} cols={30} placeholder="Digite sua pergunta aqui..."></textarea>
            </div>

            <div>
              <button type="submit" className="rounded-full text-white font-bold shadow-lg bg-orange-500 p-4">Enviar mensagem</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
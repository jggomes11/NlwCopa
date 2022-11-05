import { FormEvent, useState } from "react";
import { GetStaticProps } from "next";

import Image from "next/image";
import { api } from "../lib/axios";

import appPreviewImg from "../assets/app-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";

type CountResponse = {
  count: number;
};

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const { poolCount, guessCount, userCount } = props;

  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const res = await api.post("pools", {
        title: poolTitle,
      });

      const { code } = res.data;

      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso, o código foi copiado para área de transferência",
      );

      setPoolTitle("");
    } catch (error) {
      console.log(error);
      alert("Falha ao criar o bolão, tente novamente!");
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImg} alt='NLW Copa' quality={100} />
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entra amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExampleImg} alt='' quality={100} />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form className='mt-10 flex gap-2' onSubmit={createPool}>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type={"text"}
            required
            placeholder='Qual nome do seu bolão?'
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type='submit'
          >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt='' quality={100} />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt='' quality={100} />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt='Dois celulares exibindo uma prévia da aplicação móvel'
        quality={100}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [poolCountRes, guessCountRes, userCountRes] = await Promise.all([
    api.get<CountResponse>("pools/count"),
    api.get<CountResponse>("guesses/count"),
    api.get<CountResponse>("users/count"),
  ]);

  return {
    props: {
      poolCount: poolCountRes.data.count,
      guessCount: guessCountRes.data.count,
      userCount: userCountRes.data.count,
    },
    revalidate: 1800, // 30 minutes in seconds
  };
};

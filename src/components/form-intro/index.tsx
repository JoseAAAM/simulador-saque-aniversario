'use client';

import { useFgts } from '@/contexts/fgts';
import { DollarSign } from 'react-feather';

export function FormIntro() {
  const { data } = useFgts();

  const [name] = data?.name?.split(' ');

  return (
    <div className="flex flex-col gap-6 pb-8 px-4">
      {name ? (
        <p className="text-4xl font-bold">
          <br />
          <br />
          Olá, {name}!
        </p>
      ) : (
        <p className="text-4xl font-bold">
          Use uma grana
          <br />
          que já é sua e<br />
          saia do aperto.
        </p>
      )}
      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-center gap-4">
          <div className="p-1 border-[1px] border-cyan-600 rounded-sm w-fit">
            <DollarSign className="text-cyan-600" size={16} />
          </div>
          <span className="w-[1px] h-full bg-cyan-600" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">SAQUE ANIVERSÁRIO</h1>
          <h2>
            <strong>Insira seus dados</strong> e verifique o<br /> quanto você
            poderá receber!
          </h2>
        </div>
      </div>
    </div>
  );
}

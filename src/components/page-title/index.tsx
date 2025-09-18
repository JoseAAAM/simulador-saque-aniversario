'use client';

import { useAnniversaryWithdrawal } from '@/contexts/anniversary-withdrawal';
import { DollarSign } from 'react-feather';

export function PageTitle() {
  const { data, isLoading } = useAnniversaryWithdrawal();

  const [name] = data?.name?.split(' ');

  return (
    <section className="flex flex-wrap items-end justify-between gap-6 pb-8 px-4 md:pb-18 lg:pb-26">
      {isLoading ? (
        <div className="flex items-end space-x-1 w-[300px] animate-pulse h-30 lg:h-36 lg:w-[400px]">
          <div className="h-10 lg:h-12 bg-gray-300 rounded w-full"></div>
        </div>
      ) : name ? (
        <p className="text-4xl lg:text-5xl font-bold italic">
          <br />
          <br />
          Olá, {name}!
        </p>
      ) : (
        <p className="text-4xl lg:text-5xl font-bold italic">
          Use uma grana
          <br />
          que já é sua e<br />
          saia do aperto.
        </p>
      )}
      <div className="flex flex-row items-end gap-4 h-22">
        <div className="flex flex-col justify-between items-center h-full gap-4">
          <div className="p-1 border-[1px] border-cyan-600 rounded-sm">
            <DollarSign className="text-cyan-600" size={16} />
          </div>
          <div className="w-[1px] flex-1 bg-cyan-600" />
        </div>
        <div className="flex flex-col justify-between h-full">
          <h1 className="font-bold">SAQUE ANIVERSÁRIO</h1>
          <h2>
            <strong>Insira seus dados</strong> e verifique o<br /> quanto você
            poderá receber!
          </h2>
        </div>
      </div>
    </section>
  );
}

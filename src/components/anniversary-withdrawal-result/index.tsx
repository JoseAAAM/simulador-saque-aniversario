'use client';

import { useAnniversaryWithdrawal } from '@/contexts/anniversary-withdrawal';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export function AnniversaryWithdrawalResult() {
  const { data, isLoading } = useAnniversaryWithdrawal();

  const [real, cents] = data?.amount?.toString().split('.');

  useEffect(() => {
    if ((!data.name || !data.amount) && !isLoading) {
      redirect('/');
    }
  }, [data, isLoading]);

  return (
    <div className="bg-white w-full py-16 rounded-xl mx-auto flex flex-col px-8 gap-8 items-center justify-between md:items-start md:flex-row lg:px-20 lg:py-26">
      <div className="flex flex-col gap-2 items-center lg:items-start">
        <p className="text-cyan-600 font-bold text-lg whitespace-nowrap lg:text-xl">
          Você pode receber até
        </p>
        <div className="flex items-baseline">
          {isLoading ? (
            <div className="flex items-baseline space-x-1 w-[200px] animate-pulse h-full">
              <div className="h-6 bg-gray-300 rounded w-1/5"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-7 bg-gray-300 rounded w-1/5"></div>
            </div>
          ) : (
            <>
              <span className="text-md text-gray-600 font-bold mr-1">R$</span>
              <span className="text-cyan-600 font-semibold text-5xl">
                {new Intl.NumberFormat('pt-BR').format(Number(real))}
              </span>
              <span className="text-cyan-600 font-semibold text-2xl">
                ,{cents?.toString().padEnd(2, '0') ?? '00'}
              </span>
            </>
          )}
        </div>
      </div>
      <p className="text-gray-500 text-center font-bold text-xs md:text-start max-w-[300px] leading-5">
        <span className="text-cyan-600">
          Esta simulação traz valores aproximados
        </span>
        . Para calcular o valor exato,{' '}
        <span className="text-cyan-600">
          entre em contato com o Smile Co a consultar seu saldo no app do FGTS
        </span>
      </p>
    </div>
  );
}

'use client';

import React from 'react';
import z from 'zod';
import { InputMask } from '@react-input/mask';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NumericFormat } from 'react-number-format';
import { useAnniversaryWithdrawal } from '@/contexts/anniversary-withdrawal';
import { calculateWithdrawal as calculateWithdrawal } from '@/utils/calculate-withdrawal';
import { FormField } from '../form-field';
import { useRouter } from 'next/navigation';
import { months } from '@/constants/months';
import { anniversaryWithdrawalFormSchema } from './schema';

export type AnniversaryWithdrawalFormType = z.infer<
  typeof anniversaryWithdrawalFormSchema
>;

export const AnniversaryWithdrawalForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(anniversaryWithdrawalFormSchema),
    defaultValues: {
      name: '',
      balance: '',
      phone: '',
      date: '',
    },
  });
  const { saveFormData } = useAnniversaryWithdrawal();
  const router = useRouter();

  console.log(watch());

  const onSubmit: SubmitHandler<AnniversaryWithdrawalFormType> = (data) => {
    const balance = Number(
      data.balance
        .replace(/\./g, '')
        .replace(/,/g, '.')
        .replace(/[^\d.]/g, ''),
    );

    const result = calculateWithdrawal({
      balance: Number.isNaN(balance) ? 0 : balance,
    });

    saveFormData({ name: data.name, amount: result.withdrawalAmount });

    router.push('/resultado');
  };

  return (
    <form
      className="flex flex-col bg-white gap-4 justify-center items-center py-8 rounded-xl mx-auto lg:py-12 lg:gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="flex flex-wrap gap-4 w-[100%] justify-center">
        <FormField label="Qual seu nome?" error={errors.name?.message}>
          <input
            {...register('name')}
            data-testid="name"
            placeholder="ex: Guilherme Neves"
            className="w-100 max-w-[300px] p-4 border-2 border-gray-400 rounded-md text-sm"
          />
        </FormField>

        <FormField label="Qual seu telefone?" error={errors.phone?.message}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputMask
                data-testid="phone"
                mask={'(__) _____-____'}
                replacement={{ _: /\d/ }}
                separate
                name="phone"
                value={field.value}
                onChange={field.onChange}
                placeholder="ex: (21) 98765-9087"
                className="w-100 max-w-[300px] p-4 border-2 border-gray-400 rounded-md text-sm"
              />
            )}
          />
        </FormField>
      </fieldset>

      <fieldset className="flex flex-wrap gap-4 w-[100%] justify-center">
        <FormField label="Qual seu saldo?" error={errors.balance?.message}>
          <Controller
            name="balance"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                data-testid="balance"
                prefix="R$ "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                placeholder="Saldo FGTS"
                className="w-100 max-w-[300px] p-4 border-2 border-gray-400 rounded-md text-sm"
              />
            )}
          />
        </FormField>

        <FormField
          label="Qual seu mês de aniversário?"
          error={errors.date?.message}
        >
          <select
            {...register('date')}
            data-testid="date"
            className="w-100 max-w-[300px] p-4 border-2 border-gray-400 rounded-md text-sm"
          >
            <option className="text-sm" value="">
              Selecione um mês
            </option>
            {months.map((month) => (
              <option className="text-sm" key={month}>
                {month}
              </option>
            ))}
          </select>
        </FormField>
      </fieldset>

      <button
        data-testid="submit-button"
        className="w-100 max-w-[300px] px-4 py-6 rounded-md bg-yellow-500 font-bold lg:mt-8"
        type="submit"
      >
        Ver Proposta
      </button>
    </form>
  );
};

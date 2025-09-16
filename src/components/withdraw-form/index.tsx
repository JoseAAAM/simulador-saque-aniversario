'use client';

import React from 'react';
import z from 'zod';
import { InputMask } from '@react-input/mask';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NumericFormat } from 'react-number-format';
import { useFgts } from '@/contexts/fgts';
import { calculateWithdraw } from '@/utils/calculate-withdraw';
import { FormField } from '../form-field';
import { useRouter } from 'next/navigation';

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString('pt-BR', { month: 'long' }),
);

export const withdrawFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome é obrigatório')
    .max(100, 'O nome é muito longo'),

  cellphone: z
    .string()
    .transform((val) => (val ?? '').toString().replace(/\D/g, ''))
    .refine((digits) => digits.length === 10 || digits.length === 11, {
      message: 'O celular deve conter 11 dígitos',
    }),

  balance: z
    .string()
    .trim()
    .refine((s) => s.length > 0, { message: 'O saldo é obrigatório' })
    .refine(
      (s) => {
        const cleaned = s
          .replace(/\./g, '')
          .replace(/,/g, '.')
          .replace(/[^\d.]/g, '');
        const number = Number(cleaned);
        return !Number.isNaN(number) && number >= 0;
      },
      { message: 'O saldo deve ser um número positivo' },
    ),

  date: z.string().refine((val) => MONTHS.includes(val), {
    message: 'Mês inválido',
  }),
});

export type WithdrawFormType = z.infer<typeof withdrawFormSchema>;

export const WithdrawForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(withdrawFormSchema),
    defaultValues: {
      name: '',
      balance: '',
      cellphone: '',
      date: '',
    },
  });
  const { saveFormData } = useFgts();
  const router = useRouter();

  const onSubmit: SubmitHandler<WithdrawFormType> = (data) => {
    const balance = Number(
      data.balance
        .replace(/\./g, '')
        .replace(/,/g, '.')
        .replace(/[^\d.]/g, ''),
    );

    const result = calculateWithdraw({
      balance: Number.isNaN(balance) ? 0 : balance,
    });

    saveFormData({ name: data.name, amount: result.withdrawAmount });

    router.push('/resultado');
  };

  return (
    <form
      className="flex flex-col bg-white gap-4 justify-center items-center py-8 rounded-xl mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="flex flex-wrap gap-4 w-[100%] justify-center">
        <FormField label="Qual seu nome?" error={errors.name?.message}>
          <input
            {...register('name')}
            placeholder="ex: Guilherme Neves"
            className="w-100 max-w-[300px] p-4 border-2 border-gray-400 rounded-md text-sm"
          />
        </FormField>

        <FormField label="Qual seu telefone?" error={errors.cellphone?.message}>
          <Controller
            name="cellphone"
            control={control}
            render={({ field }) => (
              <InputMask
                mask={'(__) _____-____'}
                replacement={{ _: /\d/ }}
                separate
                name="cellphone"
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
                prefix="R$ "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
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
            className="w-100 max-w-[300px] p-4 border-2 border-gray-400 rounded-md text-sm"
          >
            <option className="text-sm" value="">
              Selecione um mês
            </option>
            {MONTHS.map((month) => (
              <option className="text-sm" key={month}>
                {month}
              </option>
            ))}
          </select>
        </FormField>
      </fieldset>

      <button
        className="w-100 max-w-[300px] px-4 py-6 rounded-md bg-yellow-500 font-bold"
        type="submit"
      >
        Ver Proposta
      </button>
    </form>
  );
};

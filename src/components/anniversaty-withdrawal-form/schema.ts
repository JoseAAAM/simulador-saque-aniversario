import { months } from "@/constants/months";
import z from "zod";

export const anniversaryWithdrawalFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome é obrigatório')
    .max(100, 'O nome é muito longo'),

  phone: z
    .string()
    .transform((val) => (val ?? '').toString().replace(/\D/g, ''))
    .refine((digits) => digits.length === 10 || digits.length === 11, {
      message: 'O telefone deve conter 11 dígitos',
    })
    .superRefine(async (digits, ctx) => {
      if (digits.length !== 10 && digits.length !== 11) {
        return;
      }

      try {
        const res = await fetch(`/api/validate-phone/${digits}`);
        const data = await res.json();

        if (!res.ok || !data.valid) {
          ctx.addIssue({
            code: 'custom',
            message: 'Telefone inválido',
          });
        }
      } catch {
        ctx.addIssue({
          code: 'custom',
          message: 'Erro ao validar o telefone',
        });
      }
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

  date: z.string().refine((val) => months.includes(val), {
    message: 'Mês inválido',
  }),
});
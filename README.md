# Saque-Aniversário FGTS – Formulário de Cálculo

Este projeto é um formulário interativo que calcula o valor do **saque-aniversário do FGTS** com base no saldo informado pelo usuário e nas regras oficiais de saque.

Além disso, o formulário realiza a **validação do telefone** via API externa para garantir que os dados fornecidos sejam válidos.

---

## 📋 Funcionalidades

- Campos do formulário:

  - **Nome**
  - **Telefone** (validado via API da [Abstract API](https://www.abstractapi.com/api/phone-validation-api))
  - **Saldo** (valor disponível em FGTS)
  - **Mês de Aniversário**

- Cálculo automático do saque com base nas seguintes faixas de valores:

| Faixa de Saldo (R$) | Percentual (%) | Parcela Fixa (R$) |
| ------------------- | -------------- | ----------------- |
| 0 – 500             | 50%            | 0                 |
| 500,01 – 1.000      | 40%            | 50                |
| 1.000,01 – 5.000    | 30%            | 150               |
| 5.000,01 – 10.000   | 20%            | 650               |
| 10.000,01 – 15.000  | 15%            | 1.150             |
| 15.000,01 – 20.000  | 10%            | 1.900             |
| Acima de 20.000,01  | 5%             | 2.900             |

- Integração com **Zod** e **React Hook Form** para validação de dados de formulário.
- Validação do telefone feita em uma **API Route do Next.js**, que consome a Abstract API.
- Testes unitários com **Jest** e **Testing Library**.

---

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Abstract API – Phone Validation](https://www.abstractapi.com/api/phone-validation-api)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🚀 Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/JoseAAAM/formulario-saque-aniversario.git
cd formulario-saque-aniversario
```

### 2. Instalar dependências

```
npm install
# ou
yarn install
```

### 3. Configurar variáveis de ambiente

Crie uma conta em Abstract API e gere uma chave de API (Plano gratuito com 250 chamadas para teste).

Clone o arquivo .env.example, renomeie para .env e adicione sua chave na variavel **PHONE_VALIDATION_API_KEY**.

### 4. Rodar o servidor de desenvolvimento

```
npm run dev
# ou
yarn dev
```

import Image from 'next/image';

import logo from '@/assets/logo.svg';

export function Header() {
  return (
    <header className="pt-10 pb-8 px-4">
      <div className="gap-2 flex flex-row items-center">
        <Image src={logo} alt="Logo Paraná Banco" className="invert-100" />
        <p className="font-bold text-sm">SMILE Co.</p>
      </div>
    </header>
  );
}

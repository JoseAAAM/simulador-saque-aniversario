import React from 'react';
import { XCircle } from 'react-feather';

export function FormField({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-black text-sm">{label}</label>
      {children}
      {error && (
        <div className="bg-red-100 p-3 rounded-sm flex flex-row gap-3 mt-1">
          <XCircle className="text-red-800" />
          <span className="text-red-800 font-bold text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}

import { getSession } from '@/app/supabase-server';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';

export default async function Add() {
  const session = await getSession();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <h2>Form Here For New Project: Import Component, Check plan for payment/</h2>

        </div>
      </div>
    </div>
  );
}

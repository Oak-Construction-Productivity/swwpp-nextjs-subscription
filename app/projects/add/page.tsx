'use client';

import Logo from '@/components/icons/Logo';
import AddSwpppProject from '@/components/ui/SupabaseQueries/AddSwpppProject';
import ProjectAddForm from '@/components/ui/SupabaseQueries/ProjectAddForm';
import { Session, User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export default async function Add() {
  const supabaseUrl = 'https://eggvjyydqfibdrgfyyny.supabase.co';
  const supabaseKey: string | undefined =
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set in the environment variables.'
    );
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.auth.getSession();

  if (!data) {
    return redirect('/signin');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col items-center max-w-lg p-3 m-auto w-80">
        <div className="pb-12">
          <AddSwpppProject />
        </div>
        <div className="flex flex-col justify-center text-center">
          <p>
            Form Here For New Project: Import Component, Check plan for payment/
          </p>
          <p>
            redirect to projects upon success, redirect to increase subscription
            if not paid enough projects
          </p>
        </div>
      </div>
    </div>
  );
}

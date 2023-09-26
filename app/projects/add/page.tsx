'use client'
import { Session, User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';
import ProjectAddForm from '@/components/ui/SupabaseQueries/ProjectAddForm';

export default async function Add() {
  const supabaseUrl = 'https://eggvjyydqfibdrgfyyny.supabase.co'
  const supabaseKey: string | undefined  = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in the environment variables.');
  }
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.auth.getSession();

  if (!data) {
    return redirect('/signin');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <h2>Form Here For New Project: Import Component, Check plan for payment/</h2>
            <h5>redirect to projects upon success, redirect to increase subscription if not paid enough projects</h5>
          <ProjectAddForm />
        </div>
      </div>
    </div>
  );
}

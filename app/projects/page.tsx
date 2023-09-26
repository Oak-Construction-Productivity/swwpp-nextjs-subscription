import { getSession } from '@/app/supabase-server';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';
import ProjectList from '@/components/ui/SupabaseQueries/ProjectList';

export default async function Projects() {
  const session = await getSession();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
          <ul>
           <li>- Populate Current Projects Here</li>
           <li>- Add a project button - takes you to -- add project form</li>
           <li>- This is the third sentence.</li>
           <li>- <ProjectList session={session}
      user={session?.user}/></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

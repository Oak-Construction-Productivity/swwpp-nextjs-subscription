import { getSession } from '@/app/supabase-server';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';
import ProjectList from '@/components/ui/SupabaseQueries/ProjectList';
import ProjectButton from '@/components/ui/Common/ProjectButton';

export default async function Projects() {
  const session = await getSession();

  if (!session) {
    return redirect('/signin');
  }

  return (
<div className="flex flex-col items-center justify-center height-screen-helper">
  <div className="w-3/4 mt-2 text-center"> {/* Reduced mt-4 to mt-2 */}
    <ProjectList session={session} user={session?.user} />
    <ProjectButton redirectTo="projects/add" color="bg-gradient-to-r from-yellow-500 via-red-600 to-pink-500" size="150" className="custom-class" />

  </div>
  <div className="w-3/4 mt-4 text-center"> {/* You can adjust mt-4 as needed */}
    <ul className="mx-auto">
      <li>- Populate Current Projects Here</li>
      <li>- Add a project button - takes you to -- add project form</li>
      <li>- This is the third sentence.</li>
    </ul>
  </div>
</div>
  );
}

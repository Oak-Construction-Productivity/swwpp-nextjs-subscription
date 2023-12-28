import { getSession, getSubscription } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import ProjectButton from '@/components/ui/Common/ProjectButton';
import ProjectList from '@/components/ui/SupabaseQueries/ProjectList';
import { redirect } from 'next/navigation';

export default async function Projects() {
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);

  if (!session) {
    return redirect('/signin');
  }

  return (
    <div className="flex flex-col items-center justify-center height-screen-helper">
      <div className="w-3/4 mt-2 text-center">
        {' '}
        {/* Reduced mt-4 to mt-2 */}
        <ProjectList session={session} user={session?.user} />
        (subscription ? 
        <ProjectButton
          redirectTo="projects/add"
          color="bg-gradient-to-r from-yellow-500 via-red-600 to-pink-500"
          size="150"
          className="custom-class"
        /> : <h2>Upgrade to add more projects</h2>)
      </div>
      <div className="w-3/4 mt-4 text-center">
        {' '}
        {/* You can adjust mt-4 as needed */}
        <ul className="mx-auto">
          <li>- Populate Current Projects Here</li>
          <li>- Add a project button - takes you to -- add project form</li>
          <li>- This is the third sentence.</li>
        </ul>
      </div>
    </div>
  );
}

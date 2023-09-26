import { getSession } from '@/app/supabase-server';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';

export default async function Todo() {
  const session = await getSession();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex flex-col justify-center pb-12 ">
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Add report automation scheduling into database column (frequency)</div>
  </div>
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Create a form that successfully updates the project database</div>
  </div>
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Display projects on the project page</div>
  </div>
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Form handeling and not letting non payers add more than one/two projects</div>
  </div>
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Create a button/utility function that successfully deletes the project, in project settings</div>
  </div>
  <div className="flex items-center p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Slug project page, integrate a weather api to display 10 day percipitation schedule and notable info</div>
  </div>
  <div className="flex items-center p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>In project page, allow for info to be added then a button to send email report</div>
  </div>
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Create a button/utility function that successfully deletes the project, in project settings</div>
  </div>
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Improve the homepage and design</div>
  </div>
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Figure out report automation with stmp or something</div>
  </div>
</div>
      </div>
    </div>
  );
}

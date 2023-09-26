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
    <div>Item 1</div>
  </div>
  <div className="flex items-center mb-2 p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Item 2</div>
  </div>
  <div className="flex items-center p-2 border rounded">
    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
    <div>Item 3</div>
  </div>
</div>
      </div>
    </div>
  );
}

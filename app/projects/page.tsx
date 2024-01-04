import { getSession, getSubscription, getActiveProductsWithPrices } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import ManageSubscriptionButton from '../account/ManageSubscriptionButton';
import ProjectButton from '@/components/ui/Common/ProjectButton';
import ProjectList from '@/components/ui/SupabaseQueries/ProjectList';
import { redirect } from 'next/navigation';

interface NumberLibrary {
  dictionary: Record<string, number>;
}

export default async function Projects() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  const myNumberLibrary: NumberLibrary = {
    dictionary: {
      prod_OhoFcs9hVtVJtp: 2,
      prod_OhoFqawVrACe4U: 6,
      prod_OhoFoNfFMZ5GBu: 12,
    },
  };

  if (!session) {
    return redirect('/signin');
  }

  console.log(products[0].active, "here")
  const id = subscription?.prices?.products?.id
  const valueFromDictionary = id !== undefined ? myNumberLibrary.dictionary?.[id] : undefined;


  return (
    <div className="flex flex-col items-center justify-center height-screen-helper">
      <div className="w-3/4 mt-2 text-center">
        {' '}
        {/* Reduced mt-4 to mt-2 */}
        <ProjectList session={session} user={session?.user} projectNumber={valueFromDictionary}/>
        <h1>{products[0].active}</h1>
        <h1>{
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name}. You have a max of ${valueFromDictionary} projects.`
              : 'You are not currently subscribed to any plan.'
          }</h1>
        <ManageSubscriptionButton session={session} />
      </div>
      <div className="w-3/4 mt-4 text-center">
        {' '}
        {/* You can adjust mt-4 as needed */}
        <ul className="mx-auto">
        </ul>
      </div>
    </div>
  );
}

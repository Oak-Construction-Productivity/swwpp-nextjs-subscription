import Home from '@/components/Home';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <Home
      session={session}
      user={session?.user}
      products={products}
      subscription={subscription}
    />
  );
}

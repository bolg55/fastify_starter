import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Loader from './components/Loader';
import TierCard from './components/TierCard';
import { useAuth } from './hooks/useAuth';
import { goToCheckout } from './utils/checkout';
import useProfile from './hooks/useProfile';

const tiers = [
  {
    name: 'Starter',
    id: import.meta.env.VITE_PRODUCT_STARTER,
    priceMonthly: '$69',
    description: 'The essentials to provide your best work for clients.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: import.meta.env.VITE_PRODUCT_PRO,
    priceMonthly: '$99',
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: import.meta.env.VITE_PRODUCT_ENTERPRISE,
    priceMonthly: '$399',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
    ],
    mostPopular: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { data, error, isLoading, isError } = useProfile();

  const isActive = !!data?.data?.subscriptions[0].isActive;

  useEffect(() => {
    const savedState = localStorage.getItem('isLoggedIn');
    if (savedState) {
      const state = JSON.parse(savedState);

      setIsLoggedIn(state);

      localStorage.removeItem('isLoggedIn');
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (isError) {
      toast.error(`Error: ${error}`);
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loader text='Loading...' />;
  }

  const handleClick = async (tier: { id: string }) => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    await goToCheckout(tier.id, !!isLoggedIn, isActive, navigate);
  };

  return (
    <div className='max-w-5xl mx-auto my-24 sm:my-32'>
      <div className='px-6 mx-auto max-w-7xl lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-base font-semibold leading-7 text-indigo-400'>
            Pricing
          </h2>
          <p className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className='max-w-2xl mx-auto mt-6 text-lg leading-8 text-center text-gray-400'>
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
          quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
        </p>
        <div className='grid max-w-md grid-cols-1 mx-auto mt-16 isolate gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {tiers.map((tier, index) => (
            <TierCard
              key={tier.id}
              tier={tier}
              isActive={isActive}
              goToCheckout={() => handleClick(tier)}
              index={index}
              totalTiers={tiers.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Pricing;

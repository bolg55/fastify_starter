import { useEffect, useState } from 'react';
import { getMe, handleBillingPortal } from './utils';
import { CheckIcon } from '@heroicons/react/20/solid';
import getStripe from './utils/getStripe';

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Pricing = () => {
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    const response = getMe();
    response.then((data) => {
      setData(data.message);
      setIsActive(data?.data?.subscriptions[0].isActive);
    });
  }, []);

  const goToCheckout = async (planId: string) => {
    if (data === 'unauthorised') {
      window.location.assign('/auth');
    }

    if (isActive) handleBillingPortal();

    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/stripe/checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      }
    );
    const session = await response.json();

    const stripe = await getStripe();
    stripe?.redirectToCheckout({
      sessionId: session.sessionId,
    });
  };

  return (
    <div className='my-24 sm:my-32'>
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
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                tierIdx === 0 ? 'lg:rounded-r-none' : '',
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-zinc-100 p-8 ring-1 ring-gray-200 xl:p-10'
              )}
            >
              <div>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className='rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600'>
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className='mt-4 text-sm leading-6 text-gray-600'>
                  {tier.description}
                </p>
                <p className='flex items-baseline mt-6 gap-x-1'>
                  <span className='text-4xl font-bold tracking-tight text-gray-900'>
                    {tier.priceMonthly}
                  </span>
                  <span className='text-sm font-semibold leading-6 text-gray-600'>
                    /month
                  </span>
                </p>
                <ul
                  role='list'
                  className='mt-8 space-y-3 text-sm leading-6 text-gray-600'
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className='flex gap-x-3'>
                      <CheckIcon
                        className='flex-none w-5 h-6 text-indigo-600'
                        aria-hidden='true'
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => goToCheckout(tier.id)}
                type='button'
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                {isActive ? 'Manage subscription' : 'Subscribe now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Pricing;

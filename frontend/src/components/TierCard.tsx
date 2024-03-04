import { CheckIcon } from '@heroicons/react/20/solid';

const TierCard = ({
  tier,
  isActive,
  goToCheckout,
  index,
  totalTiers,
}: {
  tier: {
    name: string;
    id: string;
    priceMonthly: string;
    description: string;
    features: string[];
    mostPopular: boolean;
  };
  isActive: boolean;
  goToCheckout: (id: string) => void;
  index: number;
  totalTiers: number;
}) => (
  <div
    key={tier.id}
    className={`${
      tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8'
    } ${index === 0 ? 'lg:rounded-r-none' : ''} ${
      index === totalTiers - 1 ? 'lg:rounded-l-none' : ''
    } flex flex-col justify-between rounded-3xl bg-zinc-100 p-8 ring-1 ring-gray-200 xl:p-10`}
  >
    <div>
      <div className='flex items-center justify-between gap-x-4'>
        <h3
          id={tier.id}
          className={`${
            tier.mostPopular ? 'text-indigo-600' : 'text-gray-900'
          } text-lg font-semibold leading-8`}
        >
          {tier.name}
        </h3>
        {tier.mostPopular && (
          <p className='rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600'>
            Most popular
          </p>
        )}
      </div>
      <p className='mt-4 text-sm leading-6 text-gray-600'>{tier.description}</p>
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
      className={`${
        tier.mostPopular
          ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
          : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300'
      } mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {isActive ? 'Manage subscription' : 'Subscribe now'}
    </button>
  </div>
);

export default TierCard;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarteBancaire } from './CarteBancaire';

export const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className='right-sidebar'>
      <section className='flex flex-col pb-8'>
        <div className='profile-banner'>
          <div className='profile'>
          <div className="profile-img">
            <span className="text-5xl font-bold text-purple-500">{user.firstName[0]}</span>

          </div>
            <div className='profile-details'>
              <h1 className='profile-name'>
                {user.firstName} {user.lastName}
              </h1>
              <p className='profile-email'>{user?.email ?? "Email non disponible"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className='banques mt-6'>
        <div className='flex w-full justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Mes Banques12365</h2>
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="plus"
            />
            <span className='text-sm font-semibold text-gray-600'>Ajouter une banque</span>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className='relative flex flex-col gap-0'>
            <div className='relative z-10'>
              <CarteBancaire 
              key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>

            {banks[1] && (
              <div className='absolute right-0 top-8 z-0 w-[90%]'>
                <CarteBancaire 
                  key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false} 
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

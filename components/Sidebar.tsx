'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { Footer } from './Footer';



export const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname(); 

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
      <Link
  href="/"
  className="mb-12 flex items-center w-full"
>
  <Image
    src="/icons/UniPay-Logo_Black.png"
    width={180}
    height={74}
    alt="UniPay Logo"
  />
</Link>

        {sidebarLinks.map((item) => {
          const estActif = pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': estActif })}
            >
              <div className='relative size-6'>
                <Image 
                src={item.imgURL}
                alt={item.label}
                fill
                className={cn({
                    'brightness-[3] invert-0':
                    estActif
                })}></Image>
              </div>
              <p className={cn('sidebar-label sidebar-label w-[224px] h-[24px] truncate text-sm', { '!text-white': estActif })}>
              {item.label}
               </p>

            </Link>
          );
        })}
      </nav>
      <Footer user = {user}/>
    </section>
  );
};



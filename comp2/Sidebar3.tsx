'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarLinks3A } from '@/constants2';
import { cn } from '@/lib/utils';

export const Sidebar2 = () => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 flex items-center w-full">
          <img
            src="/icons/UniPay-Logo_Black.png"
            width={180}
            height={74}
            alt="UniPay Logo"
          />
        </Link>

        {sidebarLinks3A.map((item) => {
          const estActif = pathname === item.route || pathname.startsWith(`${item.route}/`);

          // Emoji حسب المسار
          let emoji = '';
          if (item.route === '/Branch-Manage-Dashboard') emoji = '🖥️ ';
          else if (item.route === '/Employees2') emoji = '🧑‍💼 ';
          else if (item.route === '/Operations') emoji = '📆 ';

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': estActif })}
            >
              <p
                className={cn(
                  'sidebar-label w-[224px] h-[24px] truncate text-sm',
                  { '!text-white': estActif }
                )}
              >
                {emoji}{item.label}
              </p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};


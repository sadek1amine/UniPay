'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/constants';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'; 
import Footer from './Footer';

export const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px] flex justify-end">
  <Sheet>
    <SheetTrigger>
      <Image
        src="/icons/hamburger.svg"
        width={30}
        height={30}
        alt="menu"
        className="cursor-pointer"
      />
    </SheetTrigger>

    <SheetContent side="left" className="border-none bg-white">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 flex items-center w-full">
          <Image
            src="/icons/UniPay-Logo_Black.png"
            width={180}
            height={74}
            alt="UniPay Logo"
          />
        </Link>

        <div className="mobilenav-sheet">
          <SheetClose asChild>
            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
              {sidebarLinks.map((item) => {
                const estActif =
                  pathname === item.route || pathname.startsWith(`${item.route}/`);
                return (
                  <Link
                    href={item.route}
                    key={item.label}
                    className={cn('mobilenav-sheet_close w-full', {
                      'bg-bank-gradient': estActif,
                    })}
                  >
                    <div className="relative size-6">
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={20}
                        height={20}
                        className={cn({ 'brightness-[3] invert-0': estActif })}
                      />
                    </div>
                    <p
                      className={cn('font-semibold text-black-2 whitespace-nowrap', {
                        'text-white': estActif,
                      })}
                    >
                      {item.label}
                    </p>
                  </Link>
                );
              })}
              USER
            </nav>
          </SheetClose>
          <Footer user= {user}type ="mobile"/>
        </div>
      </nav>
    </SheetContent>
  </Sheet>
</section>

  );
};

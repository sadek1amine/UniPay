'use server';

import Image from "next/image";
 
import { Sidebar2 } from "@/comp2/Sidebar3";

import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: 'yasin' };

  // Uncomment this when auth is ready
  // if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar2 />

      <div className="flex size-full flex-col">
        <div className="root-layout flex items-center justify-between px-4 py-2">
          <Image
            src="/icons/UniPay-Logo_Black.png"
            width={75}
            height={75}
            alt="logo"
          />
          {/* <MobileNav2 user={loggedIn} /> */}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </main>
  );
}

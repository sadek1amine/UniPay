'use server';

import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";
import { Sidebar } from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = await getLoggedInUser();
  if(!loggedIn) redirect('/sign-in')
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      
      <div className="flex size-full flex-col">
        <div className="root-layout flex items-center justify-between px-4 py-2">
          <Image src="/icons/UniPay-Logo_Black.png" width={75} height={75} alt="menu icon" />
          <MobileNav user={loggedIn} />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </main>
  );
}

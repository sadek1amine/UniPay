import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full bg-white overflow-hidden">

      {/* LEFT SIDE → CONTENT WITH SMALL WIDTH */}
      <div className="flex items-center justify-center w-auto px-6 lg:px-12">
        <div className="max-w-md w-full">
          {children}
        </div>
      </div>

      {/* RIGHT SIDE → IMAGE TAKES ALL REMAINING SPACE */}
      <div className="flex-1 relative hidden lg:block">
        <Image
          src="/icons/back-office.jpg"
          alt="Back office"
          fill
          className="object-cover"
          priority
        />
      </div>

    </main>
  );
}

import LeftSideBar from "@/components/LeftSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div>
    <main className="">
    <LeftSideBar/>
      {children}
      <p className="text-white-1">Right</p>

    </main>
  </div>     
  );
}

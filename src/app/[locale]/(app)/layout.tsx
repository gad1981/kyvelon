export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100svh] bg-navy" data-nav-tone="dark">
      {children}
    </div>
  );
}


import './globals.css';
// Metadata for the root layout can be minimal or very generic,
// as [locale]/layout.tsx will handle locale-specific metadata.
// It's useful to define some fallback metadata here.
export const metadata = {
  title: 'Ciaodigi Navigator',
  description: 'Your partner in digital transformation and custom software solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The <html> and <body> tags are now primarily managed by src/app/[locale]/layout.tsx
  // This RootLayout acts as a passthrough for children and global styles.
  return <>{children}</>;
}

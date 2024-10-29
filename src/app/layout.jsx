import ClientProvider from '../components/provider/client-provider';
import './globals.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

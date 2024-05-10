import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BTEC Pearson L3 ICT Calculator",
  description: "An easy way to quickly calculate your BTEC Pearson L3 ICT grades.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <Script
        async
        src="https://umami-azure-one.vercel.app/script.js"
        data-website-id="684d1fef-f173-44dc-a1ed-a0159f144315"
       />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

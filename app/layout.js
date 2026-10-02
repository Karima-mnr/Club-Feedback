import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'InfoBrains · Feedback 2026/2027',
  description:
    'Share your honest ideas, event suggestions, and improvements for InfoBrains Scientific Club — Faculty of Exact Sciences and Informatics.',
  icons: { icon: '/infobrainsClubLogo.png' },
  themeColor: '#050910',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <div className="ambient-bg" aria-hidden />
        <div className="grid-overlay" aria-hidden />
        <div className="grain" aria-hidden />
        <div className="page-content">{children}</div>
      </body>
    </html>
  );
}
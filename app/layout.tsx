import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
  openGraph: {
    title: "婚礼邀请函丨韩宝国❤赵玉梅",
    description: "这里是内容描述部分",
    url: "https//thewedding.today",
    images: ["/lovo-song.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center ">
          <div className="relative z-10 w-full h-full max-w-[430px] max-h-[932px] overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

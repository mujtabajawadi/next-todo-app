import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Header, Sidebar, Container } from "@/components/index.js";
import Providers from "@/lib/provider.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TaskEasy",
  description: "Manage your tasks easily with TaskEasy",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <div className="flex grow ">
            <Sidebar />
            <Container children={children}></Container>
          </div>
        </Providers>
      </body>
    </html>
  );
}

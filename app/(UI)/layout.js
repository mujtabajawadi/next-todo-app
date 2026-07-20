import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Header, Sidebar, Container } from "@/components/index.js";
import Providers from "@/lib/provider.js";
import localFont from "next/font/local"


const urbanist = localFont({
  src:[
    {
      path: "../../public/fonts/general-sans/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal"
    }
  ],
  variable: "--font-custom"
})

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
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className={`min-h-screen flex flex-col ${urbanist.className} bg-linear-to-br from-[#081e21] to-[#0b2a2d]`}>
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

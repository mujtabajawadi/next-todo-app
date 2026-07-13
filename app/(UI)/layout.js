import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import {Header,Sidebar, Container} from '@/components/index.js'


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
        <Header/>       
        {/* <Sidebar/> */}
        {/* <Content/> */}
         <div className="flex grow ">
              <Sidebar />
              <Container children={children}>
              </Container>
              
              {/* <div className="flex grow bg-gray-800 px-5">
                <div className="bg-amber-950 w-full h-full pt-8 pb-4 pl-5 flex flex-col">
                  <div className="bg-green-900 py-3 px-5 grid grid-cols-2 gap-3 grow rounded-md">
                  {children}
                  </div>
                </div>
              </div> */}
            </div>
        </body>
    </html>
  );
}

import "@/app/globals.css";
import { Header, Sidebar, Container } from "@/components/index.js";
import Providers from "@/lib/provider.js";
import localFont from "next/font/local"


const GeneralSans = localFont({
  src:[
    {
      path: "../../public/fonts/general-sans/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/general-sans/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal"
    },
  ],
  variable: "--font-generalSans"
})
const Urbanist = localFont({
  src:[
    {
      path: "../../public/fonts/urbanist/Urbanist-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/urbanist/Urbanist-Medium.ttf",
      weight: "500",
      style: "normal"
    },
  ],
  variable: "--font-urbanist"
})
const Karla = localFont({
  src:[
    {
      path: "../../public/fonts/karla/Karla-Regular.ttf",
      weight: "400",
      style: "normal"
    },
  ],
  variable: "--font-karla"
})
const Poppins = localFont({
  src:[
    {
      path: "../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal"
    },
  ],
  variable: "--font-poppins"
})
const MarkaziText = localFont({
  src:[
    {
      path: "../../public/fonts/MarkaziText/MarkaziText-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/MarkaziText/MarkaziText-Medium.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../../public/fonts/MarkaziText/MarkaziText-SemiBold.ttf",
      weight: "600",
      style: "semibold"
    },
    {
      path: "../../public/fonts/MarkaziText/MarkaziText-Bold.ttf",
      weight: "800",
      style: "bold"
    },
  ],
  variable: "--font-MarkaziText"
})



export const metadata = {
  title: "TaskEasy",
  description: "Manage your tasks easily with TaskEasy",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeneralSans.variable} ${Urbanist.variable} ${Karla.variable} ${Poppins.variable} ${MarkaziText.variable} h-full antialiased`}
    >
      <body className={`min-h-screen flex flex-col bg-linear-to-br from-[#081e21] to-[#0b2a2d]`}>
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

import "@/styles/reset.css";
import { Header, } from "@/components/header"
import { Footer } from "@/components/footer"



export const metadata = {
  title: "Recipea",
  description: "This website was created by Barış Demir",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
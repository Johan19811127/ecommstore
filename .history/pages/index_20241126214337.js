import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import NavLinks from "@/components/NavLinks";
import Carousel from "@/components/Carousel";
import Intro from "@/components/Intro";
import Products from "@/components/Products";
import Footer from "@/components/footer";
import HeroVideo from "@/components/Video";
import A4Invoice from "@/components/Sales/invoice";


const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const invoiceData = {
    companyName: "Monte Vista Supplies",
    companyAddress: "123 School Lane, Cape Town, SA",
    invoiceDate: "2024-11-26",
    invoiceNumber: "MV-1001",
    items: [
      { name: "Textbook A", quantity: 2, price: 100.0 },
      { name: "Notebook", quantity: 5, price: 25.0 },
      { name: "Pencil Pack", quantity: 3, price: 15.0 },
    ],
  };
  const images = ['/1.png','/2.png','/3.png']
  return (
  <div>
    <Navbar></Navbar>
    <NavLinks></NavLinks>
   <HeroVideo></HeroVideo>
    <Intro></Intro>
  <Products></Products>
  <A4Invoice></A4Invoice>
  <Footer></Footer>

  </div>
  );
}

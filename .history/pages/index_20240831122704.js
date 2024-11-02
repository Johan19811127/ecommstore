import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import NavLinks from "@/components/NavLinks";
import Carousel from "@/components/Carousel";
import Intro from "@/components/Intro";
import Products from "@/components/Products";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const images = ['/1.png','/2.png','/3.png']
  return (
  <div>
    <Navbar></Navbar>
    <NavLinks></NavLinks>
    <Carousel images={images}/>
    <Intro></Intro>
  <Products></Products>
  <Footer
  </div>
  );
}

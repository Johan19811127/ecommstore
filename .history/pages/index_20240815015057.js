import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import NavLinks from "@/components/NavLinks";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
  <div>
    <Navbar></Navbar>
    <NavLinks></NavLinks>
  </div>
  );
}

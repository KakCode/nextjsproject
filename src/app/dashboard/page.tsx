import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/components/layout/sections/footer-section";
import HeroSection from "@/components/layout/sections/hero-section";

export default function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return  (
     <>
     <Navbar/>
     <HeroSection/>
     {children}
      <FooterSection/>
     </>

   )
}
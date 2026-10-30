import HeroSlider from "@/components/home/HeroSlider";
import Welcome from "@/components/home/Welcome";
import Packages from "@/components/home/Packages";
import Menus from "@/components/home/Menus";
import RoutesSection from "@/components/home/RoutesSection";
import Faq from "@/components/home/Faq";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Welcome />
      <Packages />
      <Menus />
      <RoutesSection />
      <Faq />
    </>
  );
}

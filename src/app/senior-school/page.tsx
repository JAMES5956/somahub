import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import GradesSection from "@/components/home/GradesSection";
import PathwaysSection from "@/components/home/PathwaysSection";
import SubjectsSection from "@/components/home/SubjectsSection";
import FeaturedResources from "@/components/home/FeaturedResources";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <GradesSection />
      <PathwaysSection />
      <SubjectsSection />
      <FeaturedResources />
    </>
  );
}
import CourseOffered from "@/components/CourseOffered";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PartnerWith from "@/components/PartnerWith";
import React from "react";

function Home() {
  return (
    <div className="">
      <HeroSection />
      <CourseOffered />
      <PartnerWith />
      <Footer />
    </div>
  );
}

export default Home;

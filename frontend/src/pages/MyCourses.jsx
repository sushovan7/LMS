import CourseCard from "@/components/CourseCard";
import CourseSkeleton from "@/components/CourseSkeleton";
import Footer from "@/components/Footer";
import PartnerWith from "@/components/PartnerWith";
import React from "react";

function MyCourses() {
  const isLoading = false;
  const myCourses = [2, 1, 1, 1, 1];
  return (
    <div className="w-full pl-4">
      <h1 className="text-2xl mt-28 mb-10">
        Enrolled <span className="font-mono text-[#23CFA6]">courses:</span>
      </h1>
      <div className="flex flex-col gap-10">
        <div className="h-[50vh] mb-10 rounded-t-lg   flex flex-wrap gap-3 md:gap-6 items-center md:justify-start md:flex-wrap  ">
          {isLoading ? (
            <CourseSkeleton />
          ) : myCourses.length === 0 ? (
            "You are not enrolled in any courses yet. Please buy a course to get enrolled."
          ) : (
            myCourses.map((course) => <CourseCard />)
          )}
        </div>
        <PartnerWith />
        <Footer />
      </div>
    </div>
  );
}

export default MyCourses;

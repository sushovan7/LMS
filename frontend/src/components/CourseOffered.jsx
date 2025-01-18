import React from "react";
import CourseCard from "./CourseCard";
import CourseSkeleton from "./CourseSkeleton";

function CourseOffered() {
  const isLoading = false;
  return (
    <div className=" md:bg-green-400">
      <section className="flex flex-col gap-6 mb-20">
        <h1 className="font-md text-2xl text-center">Course Offered :</h1>
        <div className="h-[50vh] md:min-h-[100vh] rounded-t-lg flex-nowrap overflow-x-auto  flex gap-3 md:gap-6 items-center md:justify-center md:flex-wrap md:overflow-visible ">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))
            : Array.from({ length: 8 }).map((_, i) => <CourseCard key={i} />)}
        </div>
      </section>
    </div>
  );
}

export default CourseOffered;

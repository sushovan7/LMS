import React from "react";
import { Skeleton } from "./ui/skeleton";

function CourseSkeleton() {
  return (
    <section className="w-[80vw] shrink-0 flex flex-col gap-6 h-full md:w-80">
      <div className="flex flex-col bg-[#171717] gap-3 overflow-hidden w-full h-full rounded-lg">
        <div className="w-full relative h-[60%]">
          <Skeleton className="w-full h-full rounded-md" />{" "}
          <h1 className="text-black top-2 right-2 absolute px-2 py-1 rounded-md"></h1>
        </div>
        <div className="h-[40%] flex py-2 justify-between flex-col">
          <Skeleton className="h-6 w-[60%] mb-2" />{" "}
          <div className="flex items-center px-2 justify-between">
            <Skeleton className="h-6 w-[40%]" />
            <Skeleton className="h-6 w-[20%]" />
          </div>
        </div>
      </div>

      <Skeleton className="h-14 text-xl rounded-lg " size="lg">
        {false ? "View Details" : <Skeleton className="w-24 h-6" />}{" "}
      </Skeleton>
    </section>
  );
}

export default CourseSkeleton;

import React from "react";
import { Button } from "./ui/button";

function CourseOffered() {
  return (
    <section className="flex flex-col gap-6 mb-20">
      <h1 className="font-md text-xl">Course Offered :</h1>
      <div className="h-[50vh] rounded-t-lg flex-nowrap overflow-x-auto flex gap-3  items-center ">
        <div className="w-[80vw] shrink-0  flex flex-col  gap-6  h-full">
          <div className="flex flex-col bg-[#171717] gap-3 overflow-hidden w-full h-full rounded-lg">
            <div className="w-full relative  h-[60%]">
              <h1 className="text-black top-2 right-2 absolute bg-white px-2 py-1  rounded-md">
                Indepth
              </h1>
              <img
                src="https://images.pexels.com/photos/27677952/pexels-photo-27677952/free-photo-of-woman-sitting-with-magazine.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="course_image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[40%]  flex py-2 justify-between flex-col">
              <h1 className="font-md text-2xl">JavaScript Domination:</h1>
              <div className="flex items-center px-2 justify-between">
                <h1 className="font-bold text-lg">Rs. 5999 (+GST)</h1>
                <h1 className="text-black bg-white px-2 py-1  rounded-md">
                  41% off
                </h1>
              </div>
            </div>
          </div>

          <Button className=" h-14 text-xl rounded-lg bg-[#23CFA6] " size="lg">
            View Details
          </Button>
        </div>
        <div className="w-[80vw] shrink-0  flex flex-col  gap-6  h-full">
          <div className="flex flex-col bg-[#171717] gap-3 overflow-hidden w-full h-full rounded-lg">
            <div className="w-full relative  h-[50%]">
              <h1 className="text-black top-2 right-2 absolute bg-white px-2 py-1  rounded-md">
                Indepth
              </h1>
              <img
                src="https://images.pexels.com/photos/27677952/pexels-photo-27677952/free-photo-of-woman-sitting-with-magazine.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="course_image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-4 h-[50%]   flex py-4 justify-between flex-col">
              <h1 className="font-md text-2xl">JavaScript Domination:</h1>
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg">Rs. 5999 (+GST)</h1>
                <h1 className="text-black bg-white px-2 py-1  rounded-md">
                  41% off
                </h1>
              </div>
            </div>
          </div>

          <Button className=" h-14 text-xl rounded-lg bg-[#23CFA6] " size="lg">
            View Details
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CourseOffered;

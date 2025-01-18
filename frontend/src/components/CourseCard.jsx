import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function CourseCard() {
  return (
    <section className="w-[80vw] shrink-0 flex flex-col  gap-6  h-full md:w-80 ">
      <Link className="flex flex-col  bg-[#171717] gap-3 overflow-hidden w-full h-full rounded-lg">
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
      </Link>

      <Button className=" h-14 text-xl rounded-lg bg-[#23CFA6] " size="lg">
        View Details
      </Button>
    </section>
  );
}

export default CourseCard;

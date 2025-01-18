import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="w-full flex flex-col gap-4 mb-20">
      <div className="min-h-[60vh]  relative  flex flex-col items-center justify-center gap-10">
        <div className=" flex mt-10  items-center flex-col gap-2">
          <h1 className="text-5xl text-center sm:text-7xl">
            We only <span className="font-mono  text-[#23CFA6]">teach</span>
          </h1>
          <h1 className="text-5xl text-center sm:text-7xl">
            what we are really
          </h1>
          <h1 className="text-5xl text-center sm:text-7xl">
            really <span className="font-mono text-[#23CFA6]">good</span> at.
          </h1>
        </div>
        <Link to={"/courses"}>
          <Button className=" sm:h-16 h-14 text-xl bg-[#23CFA6] " size="lg">
            Check Courses-Make an Impact
          </Button>
        </Link>

        {/* <div className="md:fixed hidden bg-red-400 md:top-[43vh] md:left-[70vw]  text-xs md:flex md:flex-col md:items-start">
          <p>
            Get ready to{" "}
            <span className="font-mono text-[#23CFA6]">acclerate your</span>
          </p>
          <p>
            <span className="font-mono text-[#23CFA6]">career </span> with
            customized courses
          </p>
          <p>and leave your mark in the</p>
          <p>tech industry</p>
        </div> */}
      </div>
      <div className="h-[25vh] py-4 flex justify-between  flex-col">
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center ">
            <h1 className="font-bold text-2xl">25+</h1>
            <h1>Students taught</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl">20+</h1>
            <h1>Instructor</h1>
          </div>
          <div className="flex flex-col items-center ">
            <h1 className="font-bold text-2xl">447k+</h1>
            <h1>Youtube subs</h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl">
            We do whatever it takes to help you
          </h1>
          <h1 className="font-bold text-xl text-[#23CFA6]">
            understand the concepts
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

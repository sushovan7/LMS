import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="sm:flex sm:gap-8 sm:flex-row  w-full flex flex-col gap-12 min-h-[20vh]">
        <div className="flex  items-start sm:w-[45%] flex-col gap-6">
          <h1 className="text-4xl font-bold text-mono ">Course</h1>
          <p className="w-full text-sm md:w-[75%]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            necessitatibus earum eum. Accusamus earum repudiandae nihil!
            Voluptate fugiat nihil sunt sapiente nesciunt incidunt ut beatae
            veritatis, molestias autem officia saepe odit dolor? Ducimus, est
            maxime.
          </p>
        </div>
        <div className="sm:flex sm:w-[55%] flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="flex   items-start flex-col gap-6">
            <h1 className="text-xl font-bold font-mono text-[#23CFA6]">
              GET IN TOUCH
            </h1>
            <div className="flex flex-col gap-1 ">
              <p>Sushovan Bhattarai</p>
              <Link
                to="https://www.instagram.com/sushovanbhattarai/"
                target="_blank"
              >
                Instagram
              </Link>
              <Link to="https://github.com/sushovan7" target="_blank">
                Github
              </Link>
              <Link
                to="https://www.linkedin.com/in/sushovan-bhattarai-dev/"
                target="_blank"
              >
                Linkedin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full mt-10 h-[1px] bg-gray-600 " />
      <div className="py-4 text-center w-full ">
        Copyright 2024@ <span className="text-[#23CFA6]">Sushovan</span> - All
        Right Reserved.
      </div>
    </>
  );
}

export default Footer;

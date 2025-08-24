import React from "react";
import Spline from "@splinetool/react-spline";

const Hero = () => {
  return (
    <main className="flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)] mb-16 sm:mb-20">
      <div className="max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-0">
        <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full">
          <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
            <i className="bx bx-diamond"></i>
            INTRODUCING
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8">
          End To End
          <br />
          Preparation for{" "}
          <span className="inline bg-gradient-to-r from-[#ffffff] via-[#e99b63] to-[#e99b63] inline-block text-transparent bg-clip-text">
            NSET
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 tracking-wider max-w-[25rem] lg:max-w-[30rem]">
          Unlock your potential with our comprehensive study materials and
          expert guidance.
        </p>

        <div className="flex gap-4 mt-12">
          <a
            className="border border-[#2a2a2a] shadow-[0_0_15px_rgba(255,255,255,0.4)] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]"
            href="#"
          >
            Mock Tests <i className="bx bx-link-external"></i>
          </a>
          <a
            className="border border-[#2a2a2a] bg-gradient-to-r from-[#ffffff] to-[#e99b63] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-orange-400"
            href="#"
          >
            Interview Prep <i className="bx bx-link-external"></i>
          </a>
        </div>
      </div>

      {/* 3d model */}
      <Spline
        className="absolute lg:top-0 top-[-20%] bottom-0 lg:left-[25%] sm:left[-2%] h-full"
        scene="https://prod.spline.design/qop6equFZcOijbGa/scene.splinecode"
        interact="false"
      />
    </main>
  );
};

export default Hero;

import React from "react";
import "boxicons/css/boxicons.min.css";

const Header = () => {
  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobileMenu");
    const body = document.body;

    // Scroll lock during mobile menu open
    if (mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.remove("hidden");
      body.style.overflow = "hidden";
    } else {
      mobileMenu.classList.add("hidden");
      body.style.overflow = "auto";
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20">
      <h1 className="font-astron text-3xl md:text-4xl lg:text-5xl font-light m-0">
        VECTOR
      </h1>
      <nav className="hidden md:flex items-center gap-12">
        <a
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          href="#"
        >
          Home
        </a>

        <a
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          href="/mock-tests"
        >
          Mock Tests
        </a>

        <a
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          href="#"
        >
          Interview Prep{" "}
        </a>

        <a
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          href="/contact"
        >
          Contact Us
        </a>
      </nav>

      <button className="hidden md:block bg-[#e99b63] text-black py-3 px-8 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50">
        <a href="/auth" className="text-black no-underline">
          SIGN IN
        </a>
      </button>

      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-3xl p-2 z-50"
      >
        <i className="bx bx-menu"></i>
      </button>

      <div
        id="mobileMenu"
        className="hidden fixed top-16 bottom-0 right-0 left-0 p-6 md:hidden z-40 backdrop-blur-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderLeft: "1px solid rgba(233, 155, 99, 0.2)",
        }}
      >
        <div className="relative h-full">
          {/* Glass card container */}
          <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            {/* Inner content */}
            <div className="relative h-full p-8">
              {/* Subtle glow effect */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[15rem] h-px bg-gradient-to-r from-transparent via-[#e99b63] to-transparent opacity-70"></div>

              <nav className="flex flex-col gap-8 items-center pt-16">
                <a
                  className="text-lg tracking-wider transition-all duration-300 hover:text-[#e99b63] hover:scale-105 relative group text-white/90"
                  href="#"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e99b63] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a
                  className="text-lg tracking-wider transition-all duration-300 hover:text-[#e99b63] hover:scale-105 relative group text-white/90"
                  href="#"
                >
                  Mock Tests
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e99b63] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a
                  className="text-lg tracking-wider transition-all duration-300 hover:text-[#e99b63] hover:scale-105 relative group text-white/90"
                  href="/ai-interview"
                >
                  Interview Prep
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e99b63] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a
                  className="text-lg tracking-wider transition-all duration-300 hover:text-[#e99b63] hover:scale-105 relative group text-white/90"
                  href="/contact"
                >
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e99b63] transition-all duration-300 group-hover:w-full"></span>
                </a>

                {/* Mobile Sign In Button */}
                <a
                  href="/auth"
                  className="mt-8 bg-[#e99b63] text-black py-3 px-8 rounded-full font-medium transition-all duration-300 hover:bg-[#f9c199] hover:scale-105 shadow-lg backdrop-blur-sm"
                >
                  SIGN IN
                </a>
              </nav>

              {/* Decorative elements */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#e99b63] opacity-20 rounded-full blur-xl"></div>
              <div className="absolute top-1/3 right-8 w-6 h-6 bg-[#e99b63] opacity-15 rounded-full blur-lg"></div>
              <div className="absolute top-2/3 left-8 w-4 h-4 bg-[#e99b63] opacity-25 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

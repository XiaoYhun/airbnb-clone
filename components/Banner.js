import React from "react";
import Image from "next/image";
function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] flex items-center justify-center">
      <Image src="https://links.papareact.com/0fm" layout="fill" objectFit="cover" />
      <div className="absolute text-center">
        <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
        <button className="h-12 bg-white rounded-full py-3 px-10 shadow-md text-purple-500 font-semibold cursor-pointer hover:shadow-xl active:scale-90 transition duration-100">
          Im flexible!
        </button>
      </div>
    </div>
  );
}

export default Banner;

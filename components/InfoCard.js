import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
function InfoCard({ id, img, location, title, description, star, price, total, onMouseHover }) {
  return (
    <div
      className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition transform duration-200 ease-out first:border-t"
      onMouseOver={onMouseHover}
    >
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 rounded-xl overflow-hidden">
        <Image src={img} layout="fill" objectFit="cover" />
      </div>
      <div className="flex-grow flex flex-col pl-5">
        <div className="flex justify-between">
          <p className="text-gray-600">{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 p-2"></div>
        <p className="pt-2 text-sm flex-grow">{description}</p>
        <div className="flex justify-between">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>
          <div>
            <p className="inline text-lg font-semibold lg:text-2xl">{price} </p>
            <small className="text-lg">/night</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;

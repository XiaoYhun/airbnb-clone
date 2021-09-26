import Image from "next/image";
function LargeCard({ img, title, description, buttonText }) {
  return (
    <section className="relative cursor-pointer py-16">
      <div className="relative h-80 ">
        <Image className="rounded-2xl" src={img} layout="fill" objectFit="cover" />
      </div>
      <div className="absolute top-32 left-10">
        <h3 className="text-2xl mt-3">{title}</h3>
        <p>{description}</p>
        <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default LargeCard;

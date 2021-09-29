import { useRouter } from "next/router";
import { format } from "date-fns";
import React, { useState } from "react";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import { getLocations } from "../pages/api";
function Search({ searchResults }) {
  const [hoverLocationId, setHoverLocationId] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = startDate && format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = endDate && format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <main className="flex">
        <section className="flex-grow pt-14 px-6 xl:w-[calc(100%-700px)] md:w-[calc(100%-500px)]">
          <p className="">
            300+ Stays {range} for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mb-6">Stays in {location}</h1>
          <div className="hidden md:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map(({ id, img, location, title, description, star, price }) => (
              <InfoCard
                key={id}
                id={id}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                onMouseHover={() => setHoverLocationId((i) => (i !== id ? id : i))}
              />
            ))}
          </div>
        </section>
        <section className="flex-grow hidden xl:flex xl:min-w-[700px] relative items-stretch">
          <div className="h-screen xl:w-[700px] md:w-[500px] right-0 top-0 fixed">
            <Map
              searchResults={searchResults}
              hoverLocationId={hoverLocationId}
              selectedLocationId={selectedLocationId}
              onSelectLocation={(id) => setSelectedLocationId(id)}
              onCloseSelect={() => setSelectedLocationId("")}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const a = {
    img: "https://a0.muscache.com/im/pictures/f11f9906-2055-420c-986f-94d65b9defba.jpg?im_w=720",
    location: "Entire rental unit in Thành phố Vũng Tàu",
    title: "Amazing Seaview - Thuy Tien Building",
    description: "5 guest · 2 bedroom · 2 beds · 2 baths · Kitchen",
    star: 4.84,
    price: "£30 / night",
    total: "£117 total",
    long: -0.0022275,
    lat: 51.5421655,
  };
  const searchResults = getLocations().map((item) => {
    return {
      id: item.listing.id,
      img: item.listing.contextualPictures[0].picture,
      location: item.listing.kickerContent.messages,
      title: item.listing.name,
      description: item.listing.homeDetails.map((i) => i.title).join(" · "),
      star: item.listing.avgRating,
      price: item.pricingQuote.priceString,
      long: item.listing.lng,
      lat: item.listing.lat,
    };
  });

  return {
    props: { searchResults },
  };
}

export default Search;

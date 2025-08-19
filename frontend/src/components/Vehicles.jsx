import { useState } from "react";


//TODO: Card front and back designs and layouts
//TODO: implement new route in rails
const CardFront = ({
  company,
  rocketName,
  rocketImage,
  country,
  description,
  isReusable,
  type,
}) => {
  return (
    <div className="card flex h-full w-full flex-col items-center justify-center rounded-xl bg-blue-700 text-white">
      <h1>{rocketName}</h1>
    </div>
  );
};

const CardBack = ({
  company,
  rocketName,
  rocketImage,
  country,
  description,
  isReusable,
  type,
}) => {
  return (
    <div className="card flex h-full w-full flex-col items-center justify-center rounded-xl bg-emerald-700 text-white">
      Back
    </div>
  );
};

//dummy data
const vehiclesData = [
  {
    company: "SpaceX",
    rocketName: "Falcon 9",
    rocketImage: "falcon9.jpg",
    country: "USA",
    description:
      "Reusable two-stage rocket designed and manufactured by SpaceX.",
    isReusable: true,
    type: "Orbital",
  },
  {
    company: "Blue Origin",
    rocketName: "New Shepard",
    rocketImage: "newshepard.jpg",
    country: "USA",
    description: "Suborbital rocket system designed for space tourism.",
    isReusable: true,
    type: "Suborbital",
  },
  {
    company: "Roscosmos",
    rocketName: "Soyuz",
    rocketImage: "soyuz.jpg",
    country: "Russia",
    description: "Reliable workhorse for crewed and uncrewed missions.",
    isReusable: false,
    type: "Orbital",
  },
  {
    company: "Arianespace",
    rocketName: "Ariane 5",
    rocketImage: "ariane5.jpg",
    country: "France",
    description: "Heavy-lift launch vehicle for satellites and cargo.",
    isReusable: false,
    type: "Orbital",
  },
];

export const Vehicles = () => {
  const [flip, setFlip] = useState(vehiclesData.map(() => false));

  const handleFlip = (index) => {
    setFlip((prev) =>
      prev.map((flipState, i) => (i === index ? !flipState : flipState)),
    );
  };

  return (
    <div className="flex flex-wrap justify-center">
      {vehiclesData.map((item, index) => (
        <button
          type="button"
          key={index}
          onClick={() => handleFlip(index)}
          className="perspective-midrange mx-4 my-4 h-[460px] w-96 outline-none"
        >
          <div
            className={`transform-3d relative size-full transition-transform duration-500 ${
              flip[index] ? "rotate-y-180" : ""
            }`}
          >
            <div className="backface-hidden absolute inset-0 size-full">
              <CardFront rocketName={item.rocketName} />
            </div>
            <div className="backface-hidden rotate-y-180 absolute inset-0 size-full">
              <CardBack />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

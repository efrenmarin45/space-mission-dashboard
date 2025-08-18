import tempLogo from "../assets/react.svg";

const LaunchBlade = ({
  logo,
  logoName,
  flightNum,
  missionName,
  launchStatus,
  missionTime,
  launchpad,
  rocketName,
}) => {
  return (
    <>
      <div className="hover:scale-101 font-family-header m-4 flex h-60 transform flex-row content-center rounded-lg bg-black/40 pt-4 text-white shadow-sm shadow-neutral-600 backdrop-blur duration-500">
        <div className="logoCard flex-1/6">
          <div className="w-30 ml-8 h-8 text-center font-semibold">
            <p>{logoName}</p>
          </div>
          <div className="w-30 ml-8 h-40 rounded-xl bg-white/10 backdrop-blur">
            <img className="h-full w-full px-2" src={logo} />
          </div>
        </div>
        <div className="flex-5/6 flex flex-col">
          <div className="flex-5/6 flex flex-row">
            <div className="min-w-0 flex-1 px-2">
              <div className="text-sm font-semibold uppercase text-neutral-400">
                Mission Name
              </div>
              <div className="truncate text-2xl">{missionName}</div>
            </div>
            <div className="min-w-0 flex-1 px-2">
              <div className="text-sm font-semibold uppercase text-neutral-400">
                Flight
              </div>
              <div className="truncate text-2xl">{flightNum}</div>
            </div>
            <div className="min-w-0 flex-1 px-2">
              <div className="text-sm font-semibold uppercase text-neutral-400">
                Time
              </div>
              <div className="truncate text-2xl">{missionTime}</div>
            </div>
          </div>
          <div className="infoSection flex-5/6 flex flex-row">
            <div className="min-w-0 flex-1 px-2">
              <div className="text-sm font-semibold uppercase text-neutral-400">
                Rocket
              </div>
              <div className="truncate text-2xl">{rocketName}</div>
            </div>
            <div className="min-w-0 flex-1 px-2">
              <div className="text-sm font-semibold uppercase text-neutral-400">
                Launchpad
              </div>
              <div className="truncate text-2xl">{launchpad}</div>
            </div>
            <div className="min-w-0 flex-1 px-2">
              <div className="text-sm font-semibold uppercase text-neutral-400">
                Status
              </div>
              <div
                className={`truncate text-2xl ${launchStatus === "SUCCESS" ? `text-shadow-lg text-shadow-neutral-700 bg-green-700` : launchStatus === "FAILURE" ? `text-shadow-lg text-shadow-neutral-700 bg-red-700` : `text-shadow-lg text-shadow-neutral-700 bg-neutral-500`}`}
              >
                {launchStatus}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const launchTestInfo = [
  {
    logo: tempLogo,
    logoName: "temp logo1",
    flightNum: "0001",
    missionName: "Mission Alpha",
    launchStatus: "SUCCESS",
    missionTime: "1 12 2008, 06:40 AM",
    launchpad: "Apple",
    rocketName: "RocketOne",
  },
  {
    logo: tempLogo,
    logoName: "temp logo2",
    flightNum: "0002",
    missionName: "Mission Beta",
    launchStatus: "FAILURE",
    missionTime: "2 15 2009, 07:30 AM",
    launchpad: "Banana",
    rocketName: "RocketTwo",
  },
  {
    logo: tempLogo,
    logoName: "temp logo3",
    flightNum: "0003",
    missionName: "Mission Gamma",
    launchStatus: "SUCCESS",
    missionTime: "3 18 2010, 08:20 AM",
    launchpad: "Cherry",
    rocketName: "RocketThree",
  },
  {
    logo: tempLogo,
    logoName: "temp logo4",
    flightNum: "0004",
    missionName: "Mission Delta",
    launchStatus: "PENDING",
    missionTime: "4 21 2011, 09:10 AM",
    launchpad: "Date",
    rocketName: "RocketFour",
  },
  {
    logo: tempLogo,
    logoName: "temp logo5",
    flightNum: "0005",
    missionName: "Mission Epsilon",
    launchStatus: "FAILURE",
    missionTime: "5 24 2012, 10:00 AM",
    launchpad: "Elderberry",
    rocketName: "RocketFive",
  },
  {
    logo: tempLogo,
    logoName: "temp logo6",
    flightNum: "0006",
    missionName: "Mission Zeta",
    launchStatus: "SUCCESS",
    missionTime: "6 27 2013, 10:50 AM",
    launchpad: "Fig",
    rocketName: "RocketSix",
  },
  {
    logo: tempLogo,
    logoName: "temp logo7",
    flightNum: "0007",
    missionName: "Mission Eta",
    launchStatus: "SUCCESS",
    missionTime: "7 30 2014, 11:40 AM",
    launchpad: "Grape",
    rocketName: "RocketSeven",
  },
  {
    logo: tempLogo,
    logoName: "temp logo8",
    flightNum: "0008",
    missionName: "Mission Theta",
    launchStatus: "FAILURE",
    missionTime: "8 2 2015, 12:30 PM",
    launchpad: "Honeydew",
    rocketName: "RocketEight",
  },
  {
    logo: tempLogo,
    logoName: "temp logo9",
    flightNum: "0009",
    missionName: "Mission Iota",
    launchStatus: "SUCCESS",
    missionTime: "9 5 2016, 01:20 PM",
    launchpad: "Kiwi",
    rocketName: "RocketNine",
  },
  {
    logo: tempLogo,
    logoName: "temp logo10",
    flightNum: "0010",
    missionName: "Mission Kappa",
    launchStatus: "SUCCESS",
    missionTime: "10 8 2017, 02:10 PM",
    launchpad: "Lemon",
    rocketName: "RocketTen",
  },
];

export const Launches = () => {
  return (
    <div className="launchDiv">
      {launchTestInfo.map((item) => {
        return (
          <LaunchBlade
            key={item.flightNum}
            logo={item.logo}
            logoName={item.logoName}
            flightNum={item.flightNum}
            missionName={item.missionName}
            launchStatus={item.launchStatus}
            missionTime={item.missionTime}
            launchpad={item.launchpad}
            rocketName={item.rocketName}
          />
        );
      })}
    </div>
  );
};

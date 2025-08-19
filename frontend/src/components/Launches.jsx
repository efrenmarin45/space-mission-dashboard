import { useLaunchData } from "../api/useLaunchData";

const LaunchBlade = ({
  logo,
  logoName,
  flightType,
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
          <div className="ml-8 h-8 w-44 text-center font-semibold">
            <p>{!logoName ? "Unknown" : logoName}</p>
          </div>
          <div className="ml-8 h-44 w-44 rounded-lg bg-white/10 px-1 py-3 backdrop-blur">
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
                Type
              </div>
              <div className="truncate text-2xl">
                {!flightType ? "Unknown" : flightType}
              </div>
            </div>
            <div className="min-w-0 flex-1 px-2">
              <div className="text-sm font-semibold uppercase text-neutral-400">
                Time (NET)
              </div>
              <div className="truncate text-2xl">
                {missionTime
                  ? new Date(missionTime).toLocaleString("en-us", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZoneName: "short",
                    })
                  : "Unknown"}
              </div>
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
                className={`w-fit truncate rounded-lg p-2 text-2xl ${launchStatus === "Launch Successful" || launchStatus === "Go for Launch" ? `text-shadow-lg text-shadow-neutral-700 bg-green-700` : launchStatus === "Launch Failure" ? `text-shadow-lg text-shadow-neutral-700 bg-red-700` : launchStatus === "To Be Confirmed" || launchStatus === "To Be Determined" ? `text-shadow-lg text-shadow-neutral-700 bg-neutral-500` : `text-shadow-lg text-shadow-neutral-700 bg-neutral-500`}`}
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

export const Launches = () => {
  const { loading, error, launchData } = useLaunchData();

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!launchData) return <p className="text-white">Launch Data Not Loaded</p>;

  console.log("launchData", launchData);

  return (
    <div className="launchDiv">
      {launchData.results.map((item) => {
        return (
          <LaunchBlade
            key={item.id}
            logo={item.image.thumbnail_url}
            logoName={item.launch_service_provider.name}
            flightType={item.mission.type}
            missionName={item.mission.name}
            launchStatus={item.status.name}
            missionTime={item.net}
            launchpad={item.pad.name}
            rocketName={item.rocket.configuration.name}
          />
        );
      })}
    </div>
  );
};

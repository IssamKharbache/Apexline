import { CiClock1 } from "react-icons/ci";

type TimeProps = {
  startDate: Date;
  gmtOffset: string;
};

const Time = ({ startDate, gmtOffset }: TimeProps) => {
  // My local time
  const myTime = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Track time
  const trackTime = formatTrackTime(startDate, gmtOffset);

  return (
    <div className="flex items-center gap-5 mr-15 p-4">
      <CiClock1 size={45} />

      <div className="space-y-1">
        {/* my time */}
        <div className="flex items-center gap-6">
          <p>My time</p>
          <p>{myTime}</p>
        </div>

        {/* track time */}
        <div className="flex items-center gap-2">
          <p>Track time</p>
          <p>{trackTime}</p>
        </div>
      </div>
    </div>
  );
};

export default Time;

function formatTrackTime(date: Date, gmtOffset: string): string {
  const [hours, minutes] = gmtOffset.split(":").map(Number);

  const offsetMs = (hours * 60 + minutes) * 60 * 1000;

  const trackDate = new Date(date.getTime() + offsetMs);

  return trackDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

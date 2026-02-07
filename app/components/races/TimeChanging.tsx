"use client";

import { useTime } from "@/app/store/timeStore";

interface TimechangingProps {
  dateStart: string;
  dateEnd: string;
  offset: string;
}
const TimeChanging = ({ dateStart, dateEnd, offset }: TimechangingProps) => {
  const { time } = useTime();
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const pad = (num: number) => num.toString().padStart(2, "0");

  const startTime = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
  const endTime = `${pad(end.getHours())}:${pad(end.getMinutes())}`;

  const startTrackTime = calculateTime(startTime, offset);
  const endTrackTime = calculateTime(endTime, offset);

  if (time === "my_time") {
    return (
      <p>
        {startTime} - {endTime}
      </p>
    );
  } else {
    return (
      <p>
        {startTrackTime} - {endTrackTime}
      </p>
    );
  }
};

export default TimeChanging;

function calculateTime(time: string, offset: string) {
  // parse time (HH:mm)
  const [h, m] = time.split(":").map(Number);
  let totalMinutes = h * 60 + m;

  // parse offset (+02:00:00 or -08:00:00)
  const sign = offset.startsWith("-") ? -1 : 1;
  const [oh, om] = offset.slice(1).split(":").map(Number);
  const offsetMinutes = sign * (oh * 60 + om);

  // apply offset
  totalMinutes += offsetMinutes;

  // normalize to 0–1439
  totalMinutes = (totalMinutes + 1440) % 1440;

  // back to HH:mm
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

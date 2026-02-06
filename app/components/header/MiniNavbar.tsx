import { RaceSession } from "@/app/types/currentSeasonRace";
import { baseUrl } from "@/app/utils/getBaseUrl";
import Time from "./Time";
import ReactCountryFlag from "react-country-flag";
import { iso3ToIso2 } from "@/app/utils/Iso3ToIso2";

const MiniNavbar = async () => {
  const currentYear = new Date().getFullYear();

  const response = await fetch(`${baseUrl}/api/racesByYear/${currentYear}`);
  const data: RaceSession[] = await response.json();

  const eventInfo = getNextUpcomingEvent(data);

  if (!eventInfo) return null;

  return (
    <nav className="flex flex-col md:flex-row md:items-center justify-between bg-black/95">
      <div className="flex flex-col border-b md:border-b-0 p-2">
        <p className="text-primary text-2xl font-semibold">Next session</p>

        <div className="flex items-center gap-2 text-lg text-gray-300">
          <p>{eventInfo.category}</p>
          <p>|</p>
          <p>{formatDateRange(eventInfo.startDate, eventInfo.endDate)}</p>
        </div>
        <div className="flex items-center gap-2 text-lg text-white">
          <p> {eventInfo.country}</p>
          <ReactCountryFlag
            countryCode={iso3ToIso2(eventInfo.countryCode)}
            svg
            title={eventInfo.country}
          />
        </div>
      </div>

      {eventInfo && (
        <Time startDate={eventInfo.startDate} gmtOffset={eventInfo.gmtOffset} />
      )}
    </nav>
  );
};

export default MiniNavbar;

/* ===================== helpers ===================== */

function toDate(date: string) {
  return new Date(date);
}

export function getSessionCategory(session: RaceSession): string {
  if (
    session.session_type === "Practice" &&
    session.session_name.startsWith("Day")
  ) {
    return "Testing";
  }

  return session.session_type;
}

/**
 * Returns the next upcoming EVENT (whole GP / Testing block)
 */
export function getNextUpcomingEvent(sessions: RaceSession[]) {
  const now = new Date();

  // sorting sessions by start date
  const sorted = [...sessions].sort(
    (a, b) => toDate(a.date_start).getTime() - toDate(b.date_start).getTime(),
  );

  // find the next session that hasn’t started yet
  const nextSession = sorted.find((s) => toDate(s.date_end) > now);

  if (!nextSession) return null;

  const meetingKey = nextSession.meeting_key;

  // get all sessions of the same meeting (GP / Testing event)
  const meetingSessions = sorted.filter((s) => s.meeting_key === meetingKey);

  // 5. compute event start & end (with HOURS)
  const startDate = toDate(meetingSessions[0].date_start);
  const endDate = toDate(meetingSessions[meetingSessions.length - 1].date_end);

  return {
    meetingKey,
    category: getSessionCategory(nextSession),
    country: nextSession.country_name,
    startDate,
    endDate,
    gmtOffset: nextSession.gmt_offset,
    sessions: meetingSessions,
    countryCode: nextSession.country_code,
  };
}

/*
 */
export function formatDateRange(start: Date, end: Date): string {
  const sameMonth = start.getMonth() === end.getMonth();

  const startDay = start.getDate();
  const endDay = end.getDate();

  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const endMonth = end.toLocaleString("en-US", { month: "short" });

  return sameMonth
    ? `${startDay} – ${endDay} ${startMonth}`
    : `${startDay} ${startMonth} – ${endDay} ${endMonth}`;
}

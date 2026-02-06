import { RaceSession } from "@/app/types/currentSeasonRace";
import { Meeting } from "@/app/types/meetingType";
import { CalendarDays, Clock, MapPin, Flag } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MeetingDetailsProps {
  meeting: Meeting;
  year: number;
  country: string;
}

const MeetingDetails = async ({
  meeting,
  year,
  country,
}: MeetingDetailsProps) => {
  const meetingSessions = await fetch(
    `https://api.openf1.org/v1/sessions?country_name=${country}&year=${year}`,
  );
  const meetingSessionsData: RaceSession[] = await meetingSessions.json();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <Flag size={14} />
            {meeting.country_code}
          </div>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            {meeting.year} Season
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {meeting.meeting_official_name}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin size={18} className="text-red-500" />
              <span className="text-lg font-medium">{meeting.location}</span>
            </div>
          </div>

          {/* Country Flag */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <img
                src={meeting.country_flag}
                alt={meeting.country_name}
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <p className="font-medium">{meeting.country_name}</p>
              <p className="text-sm text-gray-500">Host Country</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Circuit Image & Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Dates Card */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CalendarDays className="text-blue-600" />
                Event Schedule
              </h3>

              <div>
                <Tabs defaultValue="overview">
                  <TabsList variant="line">
                    <TabsTrigger value="overview">My time</TabsTrigger>
                    <TabsTrigger value="analytics">Track time</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {meetingSessionsData.map((s) => (
              <div
                key={s.session_key}
                className="flex justify-between border rounded-2xl p-5 m-2"
              >
                <div className="flex items-center gap-3 ">
                  <div className="text-gray-600">
                    <p>{formatDateDayMonth(s.date_start)}</p>
                  </div>
                  <div> | </div>
                  <p>{s.session_name}</p>
                </div>
                <div>{formatTimeRange(s.date_start, s.date_end)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Event Details */}
        <div className="space-y-6">
          {/* Circuit Card */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {meeting.circuit_short_name}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-gray-600 flex items-center gap-2">
                  <p> {meeting.circuit_type}</p>
                </div>
              </div>
            </div>

            {/* Circuit Image */}
            <div className="relative h-full rounded-lg overflow-hidden mb-6">
              <img
                src={meeting.circuit_image}
                alt={`${meeting.circuit_short_name} circuit`}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-lg font-semibold">
                  {meeting.circuit_short_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;

function formatTimeRange(dateStart: string, dateEnd: string): string {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);

  const pad = (num: number) => num.toString().padStart(2, "0");

  const startTime = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
  const endTime = `${pad(end.getHours())}:${pad(end.getMinutes())}`;

  return `${startTime} - ${endTime}`;
}

function formatDateDayMonth(isoString: string): string {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = monthNames[date.getMonth()];

  return `${day} ${month}`;
}

"use client";
import { RaceSession } from "@/app/types/currentSeasonRace";
import { iso3ToIso2 } from "@/app/utils/Iso3ToIso2";
import ReactCountryFlag from "react-country-flag";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface RacesInfoProps {
  races: RaceSession[];
}
const RacesInfos = ({ races }: RacesInfoProps) => {
  const currentYear = new Date().getFullYear();

  const racesOnly = races.filter(
    (r) => r.session_type === "Race" && r.session_name === "Race",
  );

  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className=" min-h-screen bg-black text-white">
      <div className="flex items-center p-8 justify-between text-4xl">
        <p>{currentYear} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center justify-between py-4 px-7 text-lg rounded-2xl text-black">
                {currentYear}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuGroup>
                {years.map((year) => (
                  <DropdownMenuItem key={year}>{year}</DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* races */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-15">
        {racesOnly.map((session: RaceSession, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between border p-5 m-2 rounded-2xl min-h-50"
          >
            <div className="flex items-center gap-4 text-4xl">
              <ReactCountryFlag
                countryCode={iso3ToIso2(session.country_code)}
                svg
                title={session.country_name}
              />
              <p>{session.circuit_short_name}</p>
            </div>
            <p>{session.country_name}</p>
            <div className="flex items-center justify-between">
              <button className="border rounded-lg px-5 py-2">
                Info and Details
              </button>
              <p className="text-md">{formatDateShort(session.date_start)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RacesInfos;

function formatDateShort(isoDate: string) {
  const date = new Date(isoDate);

  // Options for month short name and day
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options); // "Mar 8"
}

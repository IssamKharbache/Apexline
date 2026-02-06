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
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface RacesInfoProps {
  races: RaceSession[];
  year: string;
}
const RacesInfos = ({ races, year }: RacesInfoProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [chosenYear, setChosenYear] = useState<string>(year);

  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const racesOnly = races.filter(
    (r) => r.session_type === "Race" && r.session_name === "Race",
  );
  const MIN_YEAR = 2023;

  const years = Array.from(
    { length: currentYear - MIN_YEAR + 1 },
    (_, i) => currentYear - i,
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [pathName]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center p-8 justify-center">
          <Loader2 className="animate-spin mt-24 size-14" />
        </div>
      </div>
    );
  }
  return (
    <div className=" min-h-screen bg-black text-white">
      <div className="flex items-center p-8 justify-between text-4xl">
        <p>{year} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center justify-between py-4 px-7 text-lg rounded-2xl text-black">
                {chosenYear}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuGroup>
                {years.map((yearMap) => (
                  <DropdownMenuItem
                    onClick={() => {
                      const year = yearMap.toString();
                      setChosenYear(year);
                      router.push(`/schedule/${year}`);
                    }}
                    className={`${yearMap === Number(chosenYear) ? "bg-primary" : ""}  m-1 border`}
                    key={yearMap}
                  >
                    {yearMap}
                  </DropdownMenuItem>
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
            <div className="flex items-center gap-1">
              <p>{session.location},</p>
              <p>{session.country_name}</p>
            </div>
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

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options); // "Mar 8"
}

import RacesInfos from "@/app/components/races/RacesInfos";
import { RaceSession } from "@/app/types/currentSeasonRace";
import { baseUrl } from "@/app/utils/getBaseUrl";

type Props = {
  params: Promise<{ year: string }>;
};

const page = async ({ params }: Props) => {
  const year = (await params).year;
  const response = await fetch(`${baseUrl}/api/racesByYear/${year}`);
  const data: RaceSession[] = await response.json();

  if (!data) return null;
  return (
    <div>
      <RacesInfos races={data} />
    </div>
  );
};

export default page;

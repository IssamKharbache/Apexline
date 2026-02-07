import MeetingDetails from "@/app/components/races/MeetingDetails";

interface Meeting {
  params: Promise<{ year: number; country: string }>;
}

export default async function MeetingsPage({ params }: Meeting) {
  const year = (await params).year;
  const country = (await params).country;

  const res = await fetch(
    `https://api.openf1.org/v1/meetings?year=${year}&country_name=${country}`,
  );
  const data = await res.json();

  return (
    <div>
      <MeetingDetails meeting={data[0]} year={year} country={country} />
    </div>
  );
}

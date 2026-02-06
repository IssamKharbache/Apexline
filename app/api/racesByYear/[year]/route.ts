import { RaceSession } from "@/app/types/currentSeasonRace";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  context: { params: Promise<{ year: string }> },
) => {
  const year = (await context.params).year;

  if (!year) {
    return NextResponse.json({ error: "Year is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.openf1.org/v1/sessions?year=${year}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch sessions" },
        { status: res.status },
      );
    }

    const data = await res.json();

    //removing fake sessions
    const realSessions = data.filter(
      (s: RaceSession) => !s.session_key.toString().startsWith("99"),
    );

    return NextResponse.json(realSessions);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

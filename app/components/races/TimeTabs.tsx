"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTime } from "@/app/store/timeStore";

const Tracktime = () => {
  const { setTime } = useTime();

  return (
    <div>
      <Tabs defaultValue="my_time">
        <TabsList variant="line">
          <TabsTrigger onClick={() => setTime("my_time")} value="my_time">
            My time
          </TabsTrigger>
          <TabsTrigger onClick={() => setTime("track_time")} value="track_time">
            Track time
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Tracktime;

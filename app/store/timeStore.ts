import { create } from "zustand";

interface TimeState {
  time: string;
  setTime: (time: string) => void;
}

export const useTime = create<TimeState>()((set) => ({
  time: "my_time",
  setTime: (time) => set(() => ({ time })),
}));

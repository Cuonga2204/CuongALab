import dayjs from "dayjs";

export const formatSecondsToTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return dayjs()
    .set("hour", h)
    .set("minute", m)
    .set("second", s)
    .format("HH:mm:ss");
};

export const convertDayjsToSeconds = (time: dayjs.Dayjs): number => {
  return time.hour() * 3600 + time.minute() * 60 + time.second();
};

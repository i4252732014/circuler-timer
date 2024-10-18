export function formatTimeMS(timeInSeconds: number) {
  if (String(timeInSeconds).split(" : ")[1]) {
    return timeInSeconds;
  }
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return (
    String(minutes < 10 ? "0" + minutes : minutes) +
    " : " +
    (seconds < 10 ? "0" + seconds : seconds)
  );
}

export function formatTimeInSec(timeMinuteFormat: string) {
  if (timeMinuteFormat.split(" : ")[1]) {
    const minutes = Number(timeMinuteFormat.split(" : ")[0]) * 60;
    const seconds = Number(timeMinuteFormat.split(" : ")[1]);
    return Number(minutes + seconds);
  } else {
    return timeMinuteFormat;
  }
}

export function convertTime(milliseconds: number): {
  days: number;
  hours: number;
  mins: number;
} {
  let absoluteDays = milliseconds / (3600000 * 24);
  let days = Math.floor(absoluteDays);

  let absoluteHours = (absoluteDays - days) * 24;
  let hours = Math.floor(absoluteHours);

  let absoluteMins = (absoluteHours - hours) * 60;
  let mins = Math.floor(absoluteMins);

  return { days, hours, mins };
}

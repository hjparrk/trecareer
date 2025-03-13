export function formatDateFull(date: string) {
  return new Date(date).toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatDateShort(date: string) {
  return new Date(date).toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

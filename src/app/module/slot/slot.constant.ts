export const convertToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const convertToTimeString = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

export const filterSearchQuery = (
  query: { date?: string; roomId?: string },
  searchQuery: { date?: unknown; room?: unknown }
) => {
  if (!query || !query?.date || !query?.roomId) {
    if (!query) {
      delete searchQuery.date;
      delete searchQuery.room;
    }

    if (!query.date) {
      delete searchQuery.date;
    }
    if (!query.roomId) {
      delete searchQuery.room;
    }
  }

  return searchQuery;
};

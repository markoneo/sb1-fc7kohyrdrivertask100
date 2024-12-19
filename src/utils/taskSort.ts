export function sortTasksByDateTime(a: { date: string; time: string }, b: { date: string; time: string }): number {
  const dateTimeA = new Date(`${a.date}T${a.time}`);
  const dateTimeB = new Date(`${b.date}T${b.time}`);
  return dateTimeA.getTime() - dateTimeB.getTime();
}
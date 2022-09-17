export function convertHourStringToMinutes(hour: string) {
  const [hours, minutes] = hour.split(':').map(Number);
  return (hours * 60) + minutes;
}

export function convertMinutesToHourString(amount: number) {
  const hours = Math.floor(amount / 60);
  const minutes = amount % 60;

  return `${String(hours).padStart(2, '0')}: ${String(minutes).padStart(2, '0')}`
}
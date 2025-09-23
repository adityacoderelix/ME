export function istTime() {
  const hours = 5 * 60 * 60 * 1000;
  const minutes = 30 * 60 * 1000;
  const today = new Date().getTime();
  return today + hours + minutes;
}

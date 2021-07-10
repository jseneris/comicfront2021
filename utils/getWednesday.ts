export default function getWednesday() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const wednesday = new Date(currentDate);
  let offset = 0;

  if (currentDay < 3) {
    offset = 4 + currentDay;
  } else if (currentDay > 3) {
    offset = -3 + currentDay;
  }

  wednesday.setDate(wednesday.getDate() - offset);
  return `${wednesday.getFullYear()}-${
    wednesday.getMonth() + 1
  }-${wednesday.getDate()}`;
}

export default function getColorByValue(value: number): string {
  if (value >= 0 && value <= 20) {
    return "green";
  } else if (value >= 21 && value <= 40) {
    return "yellow";
  } else if (value >= 41 && value <= 60) {
    return "orange";
  } else {
    return "red";
  }
}

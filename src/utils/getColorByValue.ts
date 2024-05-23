export default function getColorByValue(value: number): string {
  if (value >= 0 && value <= 25) {
    return "blue";
  } else if (value >= 26 && value <= 37) {
    return "green";
  } else if (value >= 38 && value <= 50) {
    return "yellow";
  } else if (value >= 51 && value <= 90) {
    return "orange";
  } else {
    return "red";
  }
}

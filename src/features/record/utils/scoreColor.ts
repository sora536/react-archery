export function getScoreColor(score: string) {
  switch (score) {
    case "X":
    case "10":
    case "9":
      return { backgroundColor: "yellow", color: "black" };

    case "8":
    case "7":
      return { backgroundColor: "red", color: "black" };

    case "6":
    case "5":
      return { backgroundColor: "blue", color: "white" };

    case "4":
    case "3":
      return { backgroundColor: "black", color: "white" };

    case "2":
    case "1":
      return { backgroundColor: "white", color: "black" };

    case "M":
      return { backgroundColor: "grey", color: "black" };
  }
}

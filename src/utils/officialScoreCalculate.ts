import type {
  ShotScore,
  ShotDistance,
  OfficialSessionDraft,
} from "../features/record/types/score";

type scoreCell = number | "";

interface Result {
  date: string;
  distance: ShotDistance;
  scores: ShotScore[];
  ends: scoreCell[];
  totals: scoreCell[];
}
export function OfficialScoreCalculate(score: OfficialSessionDraft): Result {
  const ends: scoreCell[] = [];
  const totals: scoreCell[] = [];

  let total = 0;
  let incomplete = false;

  for (let i = 0; i < Math.max(6, Math.ceil(score.scores.length / 6)); i++) {
    if (incomplete) {
      ends.push("");
      totals.push("");
      continue;
    }

    let end = 0;

    for (let j = 0; j < 6; j++) {
      const shot = score.scores[6 * i + j];

      if (shot === "" || shot === undefined) {
        incomplete = true;
        break;
      }

      if (shot === "X") {
        end += 10;
      } else if (shot === "M") {
        end += 0;
      } else {
        end += Number(shot);
      }
    }

    if (incomplete) {
      ends.push("");
      totals.push("");
      continue;
    }

    total += end;
    ends.push(end);
    totals.push(total);
  }

  return {
    date: score.date,
    distance: score.distance,
    scores: score.scores,
    ends,
    totals,
  };
}

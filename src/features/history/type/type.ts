import type {
  OfficialSession,
  PracticeSession,
  CloseShotSession,
  ShotDistance,
} from "../../record/types/score";
import type { DateString } from "../../../types/common";

export type SessionView =
  | { date: DateString; type: "official"; data: OfficialSession }
  | {
      date: DateString;
      type: "practice";
      distance: ShotDistance;
      data: PracticeSession;
    }
  | { date: DateString; type: "closeShot"; data: CloseShotSession };

export type HistoryFilter = {
  type?: "practice" | "official";
  distance?: ShotDistance;
  tags: string[];
};

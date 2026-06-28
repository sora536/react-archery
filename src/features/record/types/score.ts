import type { DateString } from "../../../types/common";
export type ShotScore =
  | "X"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2"
  | "1"
  | "M"
  | "";

export type ShotDistance = "70m" | "50m" | "30m" | "18m" | "10m";
//汎用
export interface OfficialSessionDraft {
  date: DateString;
  distance: ShotDistance;
  scores: ShotScore[];
}
//保存用
export interface DailyRecord {
  date: DateString;
  officialSessions: OfficialSession[];
  practiceSessions: PracticeSessions;
}
export interface OfficialSession {
  id: string;
  distance: ShotDistance;
  scores: ShotScore[];
  tags?: string[];
  memo?: string;
}
export type PracticeSessions = Partial<
  Record<ShotDistance, PracticeSession>
> & {
  closeShot?: CloseShotSession;
};
export interface PracticeSession {
  scores: ShotScore[];
  tags?: string[];
  memo?: string;
}
export interface CloseShotSession {
  shotCount: number;
  tags?: string[];
  memo?: string;
}

import type {
  DailyRecord,
  OfficialSession,
  PracticeSession,
  ShotDistance,
  CloseShotSession,
  ShotScore,
} from "../features/record/types/score";
import type { DateString } from "../types/common";
import type { SessionView } from "../features/history/type/type";
import { formatDate } from "../utils/formatDate";
const STORAGE_KEY = "archeryRecords";
const OFFICIAL_DRAFT_KEY = "officialDraft";
const CLOSE_SHOT_DRAFT_KEY = "closeShotDraft";
//正式データ保存
export function loadRecords(): DailyRecord[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

function saveRecords(records: DailyRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
export function loadDailyRecord(date: DateString): DailyRecord | undefined {
  return loadRecords().find((record) => record.date === date);
}
function createDailyRecord(date: DateString): DailyRecord {
  return {
    date,
    officialSessions: [],
    practiceSessions: {},
  };
}

export function saveOfficialSession(
  date: DateString,
  session: OfficialSession,
) {
  const records = loadRecords();

  let day = records.find((record) => record.date === date);

  if (!day) {
    day = createDailyRecord(date);
    records.push(day);
  }

  day.officialSessions.push(session);

  saveRecords(records);
}
export function savePracticeSession(
  date: DateString,
  distance: ShotDistance,
  session: PracticeSession,
) {
  const records = loadRecords();

  let day = records.find((record) => record.date === date);

  if (!day) {
    day = createDailyRecord(date);
    records.push(day);
  }

  day.practiceSessions[distance] = session;

  saveRecords(records);
}
export function saveCloseShotSession(
  date: DateString,
  session: CloseShotSession,
) {
  const records = loadRecords();

  let day = records.find((record) => record.date === date);

  if (!day) {
    day = createDailyRecord(date);
    records.push(day);
  }

  day.practiceSessions.closeShot = session;

  saveRecords(records);
}
//officialの途中データ
export function loadOfficialDraft(): { date: DateString; scores: ShotScore[] } {
  const data = localStorage.getItem(OFFICIAL_DRAFT_KEY);

  if (!data) return { date: formatDate(new Date()), scores: [] };

  return JSON.parse(data);
}
export function saveOfficialDraft(scores: ShotScore[], date: DateString) {
  localStorage.setItem(
    OFFICIAL_DRAFT_KEY,
    JSON.stringify({ date: date, scores: scores }),
  );
}
//近射の途中データ

export function loadCloseShotDraft(): { date: DateString; shotCount: number } {
  const data = localStorage.getItem(CLOSE_SHOT_DRAFT_KEY);

  if (!data) return { date: formatDate(new Date()), shotCount: 0 };

  return JSON.parse(data);
}
export function saveCloseShotDraft(num: number, date: DateString) {
  localStorage.setItem(
    CLOSE_SHOT_DRAFT_KEY,
    JSON.stringify({ date: date, shotCount: num }),
  );
}

export function updateSession(date: DateString, session: SessionView) {
  const records = loadRecords();

  const day = records.find((r) => r.date === date);
  if (!day) return;

  switch (session.type) {
    case "official": {
      const index = day.officialSessions.findIndex(
        (s) => s.id === session.data.id,
      );

      if (index !== -1) {
        const data = day.officialSessions[index];
        day.officialSessions[index] = {
          ...data,
          memo:
            session.data.memo !== undefined ? session.data.memo : data?.memo,
          tags: session.data.tags ?? data.tags,
        };
      }
      break;
    }

    case "practice": {
      const data = day.practiceSessions[session.distance];

      day.practiceSessions[session.distance] = {
        ...data,
        memo: session.data.memo !== undefined ? session.data.memo : data?.memo,
        tags: session.data.tags ?? data?.tags,
      } as PracticeSession;
      break;
    }

    case "closeShot": {
      const data = day.practiceSessions.closeShot;
      day.practiceSessions.closeShot = {
        ...data,
        memo: session.data.memo !== undefined ? session.data.memo : data?.memo,
        tags: session.data.tags ?? data?.tags,
      } as CloseShotSession;
      break;
    }
  }
  saveRecords(records);
}

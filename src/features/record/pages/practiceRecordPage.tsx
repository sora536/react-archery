import { useState, useEffect } from "react";
import ScoreButton from "../components/scoreButton";
import DeleteButton from "../components/deleteButton";
import PracticeScoreTable from "../components/practiceScoreTable";
import SaveScoreDialog from "../../../components/saveScoreDialog";
import type { ShotDistance, ShotScore } from "../types/score";
import type { DateString } from "../../../types/common";
import SaveButton from "../components/saveButton";
import {
  savePracticeSession,
  loadDailyRecord,
} from "../../../repositories/recordRepository";

type Props = {
  distance: ShotDistance;
  changeDistance: (distance: ShotDistance) => void;
  date: DateString;
};

function PracticeRecordPage({ distance, changeDistance, date }: Props) {
  const [score, setScore] = useState<ShotScore[]>([]);
  const [saveScoreOpen, setSaveScoreOpen] = useState(false);
  const addScore = (newScore: ShotScore) => {
    setScore((prev) => {
      return [...prev, newScore];
    });
  };
  const deleteLastScore = () => {
    setScore((prev) => prev.slice(0, -1));
  };
  useEffect(() => {
    const record = loadDailyRecord(date)?.practiceSessions[distance];

    if (!record) {
      setScore([]);
      return;
    }

    setScore(record?.scores ?? []);
  }, [date, distance]);
  return (
    <>
      <PracticeScoreTable
        changeDistance={changeDistance}
        officialSessionDraft={{
          date: date,
          distance: distance,
          scores: score,
        }}
      />
      <ScoreButton addScore={addScore} />
      <SaveButton setSaveScoreOpen={() => setSaveScoreOpen(true)} />
      <DeleteButton deleteLastScore={deleteLastScore} />
      <SaveScoreDialog
        open={saveScoreOpen}
        date={date}
        distance={distance}
        score={score}
        onClose={() => setSaveScoreOpen(false)}
        onSave={(session, distance, date) => {
          savePracticeSession(date, distance, session);
        }}
      />
    </>
  );
}
export default PracticeRecordPage;

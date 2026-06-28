import { useEffect, useState } from "react";
import { v4 } from "uuid";
import OfficialScoreTable from "../components/officialScoreTable";
import ScoreButton from "../components/scoreButton";
import DeleteButton from "../components/deleteButton";
import TimerButton from "../components/timerButton";
import TimerModal from "../components/timerModal";
import SaveScoreDialog from "../../../components/saveScoreDialog";
import type { ShotDistance, ShotScore } from "../types/score";
import type { DateString } from "../../../types/common";
import {
  loadOfficialDraft,
  saveOfficialDraft,
  saveOfficialSession,
} from "../../../repositories/recordRepository";

type Props = {
  distance: ShotDistance;
  changeDistance: (distance: ShotDistance) => void;
  date: DateString;
};

function OfficialRecordPage({ distance, changeDistance, date }: Props) {
  const draft = loadOfficialDraft();

  const [score, setScore] = useState<ShotScore[]>(draft.scores || []);
  const [saveScoreOpen, setSaveScoreOpen] = useState(false);
  const addScore = (newScore: ShotScore) => {
    setScore((prev) => {
      if (prev.length >= 36) {
        setSaveScoreOpen(true);
        return prev;
      }
      return [...prev, newScore];
    });
  };
  const deleteLastScore = () => {
    setScore((prev) => prev.slice(0, -1));
  };
  const [timerOpen, setTimerOpen] = useState(false);
  useEffect(() => {
    if (draft.date !== date) {
      saveOfficialDraft([], date);
      setScore([]);
    }
  }, [date]);
  useEffect(() => {
    saveOfficialDraft(score, date);
  }, [score]);

  return (
    <>
      <OfficialScoreTable
        changeDistance={changeDistance}
        officialSessionDraft={{
          date: date,
          distance: distance,
          scores: score,
        }}
      />
      <ScoreButton addScore={addScore} />
      <TimerButton setTimerOpen={setTimerOpen} />
      {timerOpen && (
        <TimerModal open={timerOpen} onClose={() => setTimerOpen(false)} />
      )}{" "}
      <DeleteButton deleteLastScore={deleteLastScore} />
      <SaveScoreDialog
        open={saveScoreOpen}
        date={date}
        distance={distance}
        score={score}
        onClose={() => setSaveScoreOpen(false)}
        onSave={(data, distance, date) => {
          const session = { ...data, distance: distance, id: v4() };
          saveOfficialSession(date, session);
          saveOfficialDraft([], date);
          setScore([]);
        }}
      />
    </>
  );
}
export default OfficialRecordPage;

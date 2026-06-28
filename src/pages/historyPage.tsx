import { Box } from "@mui/material";
import { useState, useMemo } from "react";
import SummaryCard from "../features/history/components/summaryCard";
import { normalizeDailyRecord } from "../features/history/utils/utils";
import { loadRecords } from "../repositories/recordRepository";
import type { SessionView } from "../features/history/type/type";
import type { DateString } from "../types/common";
import HistoryFilterBar from "../features/history/components/historyFilterBar";
import type { HistoryFilter } from "../features/history/type/type";
import { applyFilter } from "../features/history/utils/utils";
import HistoryDetailModal from "../features/history/components/historyDetailModal";
type SelectedSession = {
  session: SessionView;
  date: DateString;
};
function HistoryPage() {
  const data = loadRecords();
  const [selected, setSelected] = useState<SelectedSession | null>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<HistoryFilter>({ tags: [] });

  const filteredData = useMemo(() => {
    return applyFilter(
      data.slice().reverse().flatMap(normalizeDailyRecord),
      filter,
    );
  }, [data, filter]);

  const handleOpen = (session: SessionView, date: DateString) => {
    setSelected({ session, date });
    setOpen(true);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <HistoryFilterBar filter={filter} setFilter={setFilter} />

      {filteredData.map((session, i) => (
        <SummaryCard
          key={i}
          session={session}
          date={session.date}
          onClick={() => handleOpen(session, session.date)}
        />
      ))}
      {selected && (
        <HistoryDetailModal
          date={selected.date}
          open={open}
          session={selected.session}
          onClose={() => setOpen(false)}
        />
      )}
    </Box>
  );
}
export default HistoryPage;

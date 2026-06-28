import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useRef } from "react";
import DistanceSelect from "./distanceSelect";
import { OfficialScoreCalculate } from "../../../utils/officialScoreCalculate";
import type { OfficialSessionDraft } from "../types/score";
import type { ShotDistance } from "../types/score";
import { SCORE_TABLE_HEIGHT } from "../constants/layout";

type Props = {
  changeDistance: (distance: ShotDistance) => void;
  officialSessionDraft: OfficialSessionDraft;
};

function PracticeScoreTable({ changeDistance, officialSessionDraft }: Props) {
  const score = OfficialScoreCalculate(officialSessionDraft);

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!tableRef.current) return;

      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    });
  }, []);

  useEffect(() => {
    if (!tableRef.current) return;

    tableRef.current.scrollTop = tableRef.current.scrollHeight;
  }, [score.scores.length]);

  return (
    <TableContainer
      component={Paper}
      ref={tableRef}
      sx={{
        height: SCORE_TABLE_HEIGHT,
        overflowY: "auto",
      }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: 0, width: 50 }}>
              <DistanceSelect
                distance={officialSessionDraft.distance}
                changeDistance={changeDistance}
              />
            </TableCell>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableCell key={i} align="center" sx={{ padding: 0 }}>
                {i + 1}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ padding: 0 }}>
              小計
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: score.ends.length }).map((_, i) => (
            <TableRow key={i}>
              <TableCell
                sx={{ textAlign: "center", padding: 0.5, fontSize: "0.8rem" }}
              >
                {i + 1}
              </TableCell>
              {Array.from({ length: 6 }).map((_, j) => (
                <TableCell
                  key={j}
                  align="center"
                  sx={{ padding: 0, width: 28 }}
                >
                  {score.scores[6 * i + j]}
                </TableCell>
              ))}

              <TableCell align="center" sx={{ padding: 0 }}>
                {score.ends[i]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default PracticeScoreTable;

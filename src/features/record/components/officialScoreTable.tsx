import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import type { OfficialSessionDraft, ShotDistance } from "../types/score";
import { OfficialScoreCalculate } from "../../../utils/officialScoreCalculate";
import DistanceSelect from "./distanceSelect";
import { SCORE_TABLE_HEIGHT } from "../constants/layout";

type Props = {
  changeDistance: (distance: ShotDistance) => void;
  officialSessionDraft: OfficialSessionDraft;
};

function OfficialScoreTable({ changeDistance, officialSessionDraft }: Props) {
  const score = OfficialScoreCalculate(officialSessionDraft);
  return (
    <TableContainer component={Paper} sx={{ height: SCORE_TABLE_HEIGHT }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: 0, width: 50 }}>
              <DistanceSelect
                distance={officialSessionDraft.distance}
                changeDistance={changeDistance}
              />
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              1
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              2
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              3
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              4
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              5
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              6
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              小計
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              合計
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 6 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell
                sx={{ textAlign: "center", padding: 0.5, fontSize: "0.8rem" }}
              >
                {i + 1}
              </TableCell>

              <TableCell align="center" sx={{ padding: 0, width: 28 }}>
                {score.scores[6 * i]}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0, width: 28 }}>
                {score.scores[6 * i + 1]}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0, width: 28 }}>
                {score.scores[6 * i + 2]}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0, width: 28 }}>
                {score.scores[6 * i + 3]}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0, width: 28 }}>
                {score.scores[6 * i + 4]}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0, width: 28 }}>
                {score.scores[6 * i + 5]}
              </TableCell>

              <TableCell align="center" sx={{ padding: 0 }}>
                {score.ends[i]}
              </TableCell>
              <TableCell align="center" sx={{ padding: 0 }}>
                {score.totals[i]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default OfficialScoreTable;

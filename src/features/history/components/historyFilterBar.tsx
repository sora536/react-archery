import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";
import type { HistoryFilter } from "../type/type";
import { Tags } from "../../../constants/tags";

function HistoryFilterBar({
  filter,
  setFilter,
}: {
  filter: HistoryFilter;
  setFilter: (f: HistoryFilter) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
        p: 2,
      }}
    >
      {/* 種別 */}
      <FormControl size="small" sx={{ width: 80 }}>
        <InputLabel>種別</InputLabel>
        <Select
          sx={{ fontSize: "0.7rem" }}
          value={filter.type ?? ""}
          label="種別"
          onChange={(e) =>
            setFilter({
              ...filter,
              type: (e.target.value as any) || undefined,
            })
          }
        >
          <MenuItem value="">全て</MenuItem>
          <MenuItem value="official">点取り</MenuItem>
          <MenuItem value="practice">練習</MenuItem>
          <MenuItem value="closeShot">近射</MenuItem>
        </Select>
      </FormControl>

      {/* 距離 */}
      <FormControl size="small" sx={{ width: 80 }}>
        <InputLabel>距離</InputLabel>
        <Select
          sx={{ fontSize: "0.7rem" }}
          value={filter.distance ?? ""}
          label="距離"
          onChange={(e) =>
            setFilter({
              ...filter,
              distance: (e.target.value as any) || undefined,
            })
          }
        >
          <MenuItem value="">全て</MenuItem>
          <MenuItem value="70m">70m</MenuItem>
          <MenuItem value="50m">50m</MenuItem>
          <MenuItem value="30m">30m</MenuItem>
          <MenuItem value="18m">18m</MenuItem>
          <MenuItem value="10m">10m</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 80, flex: 1 }}>
        <InputLabel>タグ</InputLabel>

        <Select
          sx={{ fontSize: "0.7rem" }}
          multiple
          value={filter.tags}
          label="タグ"
          renderValue={(selected) => {
            const tags = selected as string[];

            return `${tags.length}件`;
          }}
          onChange={(e) =>
            setFilter({
              ...filter,
              tags: e.target.value as string[],
            })
          }
        >
          {Tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              <Checkbox checked={filter.tags.includes(tag)} />
              <ListItemText primary={tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* リセットボタン（追加） */}
      <Button
        onClick={() =>
          setFilter({ type: undefined, distance: undefined, tags: [] })
        }
        sx={{
          cursor: "pointer",
          fontSize: 14,
          color: "text.secondary",
          userSelect: "none",
          px: 1,
          py: 0.5,
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        リセット
      </Button>
    </Box>
  );
}

export default HistoryFilterBar;

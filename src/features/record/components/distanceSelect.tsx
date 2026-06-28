import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { ShotDistance } from "../types/score";
type Props = {
  distance: ShotDistance;
  changeDistance: (distance: ShotDistance) => void;
};
function DistanceSelect({ distance, changeDistance }: Props) {
  return (
    <FormControl variant="standard">
      <InputLabel
        id="distanceSelectLabel"
        sx={{
          fontSize: "0.8rem",
        }}
      >
        距離
      </InputLabel>
      <Select
        size="small"
        sx={{
          fontSize: "0.8rem",
        }}
        labelId="distanceSelectLabel"
        id="distanceSelect"
        value={distance}
        onChange={(event: SelectChangeEvent) =>
          changeDistance(event.target.value as ShotDistance)
        }
      >
        <MenuItem value={"70m"}>70m</MenuItem>
        <MenuItem value={"50m"}>50m</MenuItem>
        <MenuItem value={"30m"}>30m</MenuItem>
        <MenuItem value={"18m"}>18m</MenuItem>
        <MenuItem value={"10m"}>10m</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DistanceSelect;

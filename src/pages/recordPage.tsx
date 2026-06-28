import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OfficialRecordPage from "../features/record/pages/officialRecordPage";
import { formatDate } from "../utils/formatDate";
import type { SyntheticEvent } from "react";
import type { ShotDistance } from "../features/record/types/score";
import type { DateString } from "../types/common";
import PracticeRecordPage from "../features/record/pages/practiceRecordPage";
import CloseRecordPage from "../features/record/pages/closeRecoedPage";

function RecordPage() {
  const [value, setValue] = useState("1");
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [distance, setDistance] = useState<ShotDistance>("70m");
  const [date] = useState<DateString>(formatDate(new Date()));
  const changeDistance = (distance: ShotDistance) => {
    setDistance(distance);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        typography: "body1",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="official" value="1" />
            <Tab label="practice" value="2" />
            <Tab label="cloceShot" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={{ flex: 1, padding: 2, position: "relative" }} value="1">
          <OfficialRecordPage
            distance={distance}
            changeDistance={changeDistance}
            date={date}
          />
        </TabPanel>
        <TabPanel sx={{ flex: 1, padding: 2, position: "relative" }} value="2">
          <PracticeRecordPage
            distance={distance}
            changeDistance={changeDistance}
            date={date}
          />
        </TabPanel>
        <TabPanel sx={{ flex: 1, padding: 2 }} value="3">
          <CloseRecordPage />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default RecordPage;

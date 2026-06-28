import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

import WidgetRenderer from "../features/analysis/components/widgetRenderer";
import WidgetEditorDialog from "../features/analysis/components/editor/addWidgetDialog";

import { loadWidgetConfig } from "../features/analysis/widgetConfigRepository";

function AnalysisPage() {
  // Widget設定
  const [configs, setConfigs] = useState(loadWidgetConfig());

  // 編集ダイアログ
  const [editorOpen, setEditorOpen] = useState(false);

  const handleSaveConfig = (newConfigs: typeof configs) => {
    setConfigs(newConfigs);
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">分析</Typography>

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditorOpen(true)}
          >
            Widgetを編集
          </Button>
        </Box>

        {/* Widget一覧 */}
        <WidgetRenderer configs={configs} />
      </Box>

      <WidgetEditorDialog
        open={editorOpen}
        configs={configs}
        onClose={() => setEditorOpen(false)}
        onSave={handleSaveConfig}
      />
    </>
  );
}

export default AnalysisPage;

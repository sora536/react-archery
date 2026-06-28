import { Button } from "@mui/material";
import { Save } from "@mui/icons-material";

interface Props {
  setSaveScoreOpen: () => void;
}

function SaveButton({ setSaveScoreOpen }: Props) {
  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<Save />}
      onClick={setSaveScoreOpen}
      sx={{
        width: "100%",
        borderRadius: 3,
      }}
    >
      保存する
    </Button>
  );
}
export default SaveButton;

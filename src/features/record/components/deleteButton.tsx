import { Fab } from "@mui/material";
import { Backspace } from "@mui/icons-material";
interface Props {
  deleteLastScore: () => void;
}
function DeleteButton({ deleteLastScore }: Props) {
  return (
    <Fab
      sx={{
        position: "absolute",
        right: 8,
        bottom: 6,
      }}
      color="primary"
      aria-label="delete"
      onClick={deleteLastScore}
    >
      <Backspace />
    </Fab>
  );
}
export default DeleteButton;

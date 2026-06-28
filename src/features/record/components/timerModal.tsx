import { useEffect, useRef, useState } from "react";
import { Dialog, Box, Typography, IconButton } from "@mui/material";
import { Close, RestartAlt } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
}

const INITIAL_TIME = 190;

function TimerModal({ open, onClose }: Props) {
  const intervalRef = useRef<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const endTimeRef = useRef<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);

  const playedSignalsRef = useRef(new Set<number>());
  const remainingSeconds = endTimeRef.current
    ? Math.max(0, Math.ceil((endTimeRef.current - now) / 1000))
    : INITIAL_TIME;
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    return audioContextRef.current;
  };

  const playSignal = (count: number, frequency: number, duration = 0.15) => {
    const ctx = getAudioContext();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    for (let i = 0; i < count; i++) {
      const startTime = ctx.currentTime + i * 0.25;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.value = frequency;

      gain.gain.setValueAtTime(0.15, startTime);

      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    }
  };

  useEffect(() => {
    if (!open) return;

    endTimeRef.current = Date.now() + INITIAL_TIME * 1000;

    playedSignalsRef.current.clear();

    setNow(Date.now());

    const ctx = getAudioContext();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    intervalRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [open]);

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    endTimeRef.current = Date.now() + INITIAL_TIME * 1000;

    playedSignalsRef.current.clear();

    setNow(Date.now());

    intervalRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, 250);
  };
  const closeTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    playedSignalsRef.current.clear();

    endTimeRef.current = null;

    onClose();
  };

  const timerState =
    remainingSeconds > 180
      ? "waiting"
      : remainingSeconds > 30
        ? "shooting"
        : remainingSeconds > 0
          ? "warning"
          : "finished";

  const backgroundColor =
    timerState === "waiting"
      ? "#d32f2f" // 赤
      : timerState === "shooting"
        ? "#2e7d32" // 緑
        : timerState === "warning"
          ? "#f9a825" // 黄
          : "#d32f2f"; // 終了時赤

  const textColor = "#ffffff";

  useEffect(() => {
    if (playedSignalsRef.current.has(remainingSeconds)) return;

    switch (remainingSeconds) {
      case 190:
        playSignal(2, 1000);
        break;

      case 180:
        playSignal(1, 1000);
        break;

      case 30:
        break;

      case 0:
        playSignal(2, 1000);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        break;

      default:
        return;
    }

    playedSignalsRef.current.add(remainingSeconds);
  }, [remainingSeconds]);

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");

  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  return (
    <Dialog open={open} fullScreen disableRestoreFocus>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: backgroundColor,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          position: "relative",

          transition: "background-color 0.3s ease",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: textColor,

            fontSize: {
              xs: "5rem",
              md: "12rem",
            },

            fontWeight: "bold",

            fontVariantNumeric: "tabular-nums",

            userSelect: "none",
          }}
        >
          {minutes}:{seconds}
        </Typography>

        <IconButton
          onClick={reset}
          sx={{
            color: textColor,

            position: "absolute",
            bottom: 32,
            left: 32,
          }}
        >
          <RestartAlt fontSize="large" />
        </IconButton>

        <IconButton
          onClick={closeTimer}
          sx={{
            color: textColor,

            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          <Close fontSize="large" />
        </IconButton>
      </Box>
    </Dialog>
  );
}

export default TimerModal;

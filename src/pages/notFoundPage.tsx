import { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const messages = [
  "命中率 0% です。",
  "M（ミス）",
  "ターゲットロスト。",
  "404点獲得！\nおめでとう！",
  "URL確認ヨシ！\n…じゃなかった。",
  "ナイスミス。",
  "探しても出ません。",
  "矢は飛んだ。\nページは無かった。",
  "404チャレンジ成功。",
];

export default function NotFoundPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);

    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "hidden",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        animation: "slotBg 0.2s infinite",

        "@keyframes slotBg": {
          "0%": {
            background: "linear-gradient(45deg,#ff0000,#ffff00)",
          },
          "25%": {
            background: "linear-gradient(45deg,#00ff00,#00ffff)",
          },
          "50%": {
            background: "linear-gradient(45deg,#0000ff,#ff00ff)",
          },
          "75%": {
            background: "linear-gradient(45deg,#ffff00,#ff8800)",
          },
          "100%": {
            background: "linear-gradient(45deg,#ff0000,#ffff00)",
          },
        },
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: 5,
          width: "90%",
          maxWidth: 900,

          textAlign: "center",

          background: "rgba(255,255,255,0.9)",

          animation: "shake 0.15s infinite",

          "@keyframes shake": {
            "0%": {
              transform: "translate(0px,0px)",
            },
            "25%": {
              transform: "translate(4px,-4px)",
            },
            "50%": {
              transform: "translate(-4px,4px)",
            },
            "75%": {
              transform: "translate(4px,4px)",
            },
            "100%": {
              transform: "translate(0px,0px)",
            },
          },
        }}
      >
        <Stack spacing={3}>
          <Typography
            sx={{
              fontSize: {
                xs: "5rem",
                md: "10rem",
              },

              fontWeight: 900,

              color: "#ff0000",

              textShadow: `
                0 0 10px #fff,
                0 0 20px #ff0,
                0 0 40px #f00,
                0 0 80px #f00
              `,

              animation: "flash 0.3s infinite",

              "@keyframes flash": {
                "0%": {
                  opacity: 1,
                  transform: "scale(1)",
                },
                "50%": {
                  opacity: 0.2,
                  transform: "scale(1.15)",
                },
                "100%": {
                  opacity: 1,
                  transform: "scale(1)",
                },
              },
            }}
          >
            404
          </Typography>

          <Typography
            sx={{
              whiteSpace: "pre-line",

              fontSize: {
                xs: "1.5rem",
                md: "2.5rem",
              },

              fontWeight: "bold",

              color: "#d50000",

              minHeight: 60,

              animation: "messageBlink 0.5s infinite",

              "@keyframes messageBlink": {
                "0%": {
                  opacity: 1,
                },
                "50%": {
                  opacity: 0.3,
                },
                "100%": {
                  opacity: 1,
                },
              },
            }}
          >
            {message}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            ★★★ SUPER ERROR BONUS ★★★
          </Typography>

          <Typography>お探しのページは存在しません</Typography>

          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",

              animation: "buttonGlow 0.5s infinite",

              "@keyframes buttonGlow": {
                "0%": {
                  boxShadow: "0 0 5px red",
                },
                "50%": {
                  boxShadow: "0 0 30px yellow",
                },
                "100%": {
                  boxShadow: "0 0 5px red",
                },
              },
            }}
          >
            ホームへ帰還
          </Button>

          <Typography
            variant="caption"
            sx={{
              mt: 2,
            }}
          >
            JACKPOT ERROR 404
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

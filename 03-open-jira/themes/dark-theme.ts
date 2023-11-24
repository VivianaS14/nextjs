import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#AB77AF",
    },
    secondary: {
      main: "#c299a0",
    },
    error: {
      main: red.A400,
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#AB77AF",
        },
      },
    },
  },
});

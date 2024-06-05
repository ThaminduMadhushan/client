import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#74c69d',  // Your primary green color
    },
    secondary: {
      main: '#40916c',  // Your secondary green color
    },
    background: {
      default: '#d8f3dc',  // Lightest green for background
      paper: '#ffffff',  // White color for paper components
    },
    text: {
      primary: '#081c15',  // Dark green for primary text
      secondary: '#1b4332',  // Another shade of dark green for secondary text
    },
  },
});

export default theme;

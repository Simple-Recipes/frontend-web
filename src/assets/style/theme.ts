import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#616161',
      light: '#00e676',
      dark: '#bdbdbd',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#8bc34a',
      light: '#a2a5a9',
      dark: '#558b2f',
      contrastText: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,    // Extra small devices (phones)
      sm: 600,  // Small devices (tablets)
      md: 960,  // Medium devices (desktops)
      lg: 1280, // Large devices (large desktops)
      xl: 1920, // Extra large devices (larger desktops)
    },
  },
});

export default theme;

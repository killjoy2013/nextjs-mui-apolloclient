import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { purple } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: purple[400],
      dark: purple[600],
      light: purple[200],
    },
    secondary: green,
    error: red,
    text: {
      primary: grey[400],
      disabled: grey[200],
    },
  },
  //spacing: [0, 2, 3, 5, 8],
});

// const theme = createTheme({
//   palette: {
//     labelColor: {
//       dark: '#616161',
//       main: '#757575',
//       light: '#9e9e9e',
//     },
//     iconColor: {
//       dark: '#bdbdbd',
//       main: '#9e9e9e',
//       light: '#757575',
//     },
//     tableHeadColor: {
//       dark: '#bdbdbd',
//       main: '#9e9e9e',
//       light: '#757575',
//     },
//   },
//   typography: {
//     button: {
//       textTransform: 'none',
//     },
//   },
//   spacing: 8,
// });

export default theme;

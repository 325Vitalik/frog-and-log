import { ThemeOptions, createTheme } from '@mui/material/styles';

const theme: ThemeOptions = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#971dad',
		},
		secondary: {
			main: '#3fc627',
		},
		error: {
			main: '#c6273f',
		},
	},
});

export { theme };

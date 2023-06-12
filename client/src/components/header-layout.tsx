import 'react';
import { Grid, Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Header } from './header';

function HeaderLayout({ children }: PropsWithChildren) {
	return (
		<Box width='100vw' sx={{ position: 'absolute', m: 0, p: 0 }}>
			<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 0 }}>
				<Grid item xs={12}>
					<Header />
				</Grid>
				<Grid item xs={2} />
				<Grid item xs={8}>
					{children}
				</Grid>
				<Grid item xs={2} />
			</Grid>
		</Box>
	);
}

export { HeaderLayout };

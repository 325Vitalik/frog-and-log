import 'react';
import { Avatar, Paper } from '@mui/material';
import logo from '../assets/frog-and-log-logo.png';
import { UserMenu } from './user-menu';

function Header() {
	return (
		<Paper
			sx={{
				width: '100%',
				height: 80,
				display: 'flex',
				justifyContent: 'space-between',
				bgcolor: 'background.paper',
				alignItems: 'center',
			}}
		>
			<Avatar alt='frog-and-log-logo' src={logo} sx={{ height: 55, width: 55, ml: 10, borderRadius: 0 }} />
			<UserMenu />
		</Paper>
	);
}

export { Header };

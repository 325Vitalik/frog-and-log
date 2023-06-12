import 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { appWriteService } from '../services/appwrite-service';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../redux/auth/authSlice';

function UserMenu() {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const dispatch = useDispatch();

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorEl(null);
	};

	const handleSignOut = () => {
		appWriteService.signOut().then(() => dispatch(signOutUser()));
	};

	const open = Boolean(anchorEl);

	return (
		<React.Fragment>
			<Button onClick={handleOpenUserMenu}>
				<Avatar
					id='user-avatar'
					alt='avatar'
					src='https://mui.com/static/images/avatar/3.jpg'
					sx={{
						height: 55,
						width: 55,
						mr: 10,
						bgcolor: 'secondary.main',
						borderColor: 'primary.main',
						borderStyle: 'solid',
						borderWidth: 2,
					}}
				/>
			</Button>
			<Menu
				id='user-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleCloseUserMenu}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
				<MenuItem onClick={handleSignOut}>Logout</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

export { UserMenu };

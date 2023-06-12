import 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	CSSObject,
	Collapse,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Theme,
	useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { PropsWithChildren, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupsIcon from '@mui/icons-material/Groups';
import SourceIcon from '@mui/icons-material/Source';
import { useNavigate, useParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

const DRAWER_WIDTH = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: DRAWER_WIDTH,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

function ProjectLayout({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	const [openDashboards, setOpenDashboards] = useState(false);
	const theme = useTheme();
	const navigate = useNavigate();
	const params = useParams();

	return (
		<Box
			width='100vw'
			sx={{ position: 'absolute', m: 0, p: 0, display: 'flex', minHeight: '100vh', bgcolor: '#121212' }}
		>
			<Drawer
				sx={{
					width: DRAWER_WIDTH,
					flexShrink: 0,
					whiteSpace: 'nowrap',
					boxSizing: 'border-box',
					...(open && {
						...openedMixin(theme),
						'& .MuiDrawer-paper': openedMixin(theme),
					}),
					...(!open && {
						...closedMixin(theme),
						'& .MuiDrawer-paper': closedMixin(theme),
					}),
				}}
				variant='permanent'
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={() => setOpen(state => !state)}>
						{open ? <ChevronLeftIcon /> : <MenuIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => navigate(`/project/${params.projectId}/data-sources`)}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<SourceIcon />
							</ListItemIcon>
							<ListItemText primary={'Data sources'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => navigate(`/project/${params.projectId}/search`)}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<SearchIcon />
							</ListItemIcon>
							<ListItemText primary={'Search dashboards'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{ display: 'block' }}
						onClick={() =>
							open
								? setOpenDashboards(state => !state)
								: navigate(`/project/${params.projectId}/dashboards`)
						}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary={'Dashboards'} sx={{ opacity: open ? 1 : 0 }} />
							{open && (openDashboards ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
						</ListItemButton>
					</ListItem>
					<Collapse in={open && openDashboards} timeout='auto' unmountOnExit>
						<List component='div' disablePadding>
							<ListItemButton
								sx={{ pl: 4 }}
								onClick={() => navigate(`/project/${params.projectId}/dashboards`)}
							>
								<ListItemText primary='Browse' />
							</ListItemButton>
							<ListItemButton
								sx={{ pl: 4 }}
								onClick={() => navigate(`/project/${params.projectId}/playlists`)}
							>
								<ListItemText primary='Playlists' />
							</ListItemButton>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemText
									primary='+ Add dashboard'
									onClick={() => navigate(`/project/${params.projectId}/dashboard/new`)}
								/>
							</ListItemButton>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemText
									primary='+ New folder'
									onClick={() => navigate(`/project/${params.projectId}/dashboards/folder/new`)}
								/>
							</ListItemButton>
						</List>
					</Collapse>
					<ListItem
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => navigate(`/project/${params.projectId}/explore`)}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<ExploreIcon />
							</ListItemIcon>
							<ListItemText primary={'Explore with SQL'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => navigate(`/project/${params.projectId}/alerting/list`)}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<NotificationsIcon />
							</ListItemIcon>
							<ListItemText primary={'Alerting'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => navigate(`/project/${params.projectId}/team`)}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<GroupsIcon />
							</ListItemIcon>
							<ListItemText primary={'Team'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
					<ListItem
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => navigate(`/project/${params.projectId}/team`)}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary={'Settings'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				{children}
			</Box>
		</Box>
	);
}

export { ProjectLayout };

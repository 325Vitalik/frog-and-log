import 'react';
import { ProjectLayout } from '../../components/project-layout';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Avatar,
	Button,
	Container,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Stack,
	TextField,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';

function DataSourcesPage() {
	const params = useParams();

	//TODO: get data sources from API and render

	const navigate = useNavigate();

	return (
		<ProjectLayout>
			<Paper sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
				<Container sx={{ width: '60%' }}>
					<Stack direction='row' sx={{ mt: 1, mb: 1 }}>
						<TextField id='standard-basic' label='Standard' variant='standard' sx={{ width: '100%' }} />
						<Button sx={{ minWidth: '170px', ml: 1 }} variant='outlined'>
							Search sources
						</Button>
					</Stack>
					<Divider variant='middle' sx={{ mt: 5, mb: 5 }} />
					<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<ImageIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Photos' secondary='syslog' />
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<WorkIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Work' secondary='docker' />
						</ListItem>
						<Divider />
						<ListItem
							sx={{ cursor: 'pointer' }}
							onClick={() => navigate(`/project/${params.projectId}/data-sources/new`)}
						>
							<ListItemAvatar>
								<Avatar>
									<AddIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Add source' />
						</ListItem>
					</List>
				</Container>
			</Paper>
		</ProjectLayout>
	);
}

export { DataSourcesPage };

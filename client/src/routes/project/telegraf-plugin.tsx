import 'react';
import { ProjectLayout } from '../../components/project-layout';
import { useParams } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { WRITE_DATA_TELEGRAF_PLUGINS } from '../../common/config/telegraf-plugins';
import { useMemo, useState } from 'react';

function TelegrafPluginPage() {
	const [openDialog, setOpenDialog] = useState(false);
	const params = useParams();
	const plugin = useMemo(() => {
		return WRITE_DATA_TELEGRAF_PLUGINS.find(plugin => plugin.id === params.pluginId);
	}, [params]);

	const handleClose = () => {
		setOpenDialog(false);
	};

	const handleOpen = () => {
		setOpenDialog(true);
	};

	return (
		<ProjectLayout>
			<Paper sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
				<Container maxWidth={false} sx={{ width: '100%', maxWidth: '90vw', m: 0, height: '100%' }}>
					<Grid container spacing={3}>
						<Grid item xs={2}>
							<Box sx={{ mt: 7 }}>
								<img
									src={plugin?.image}
									alt={plugin?.name}
									style={{ width: '100%', padding: '10px' }}
								/>
								<Button variant='contained' fullWidth sx={{ mt: 5 }} onClick={handleOpen}>
									Create source
								</Button>
							</Box>
						</Grid>
						<Grid item xs={10}>
							<Typography textAlign='left' sx={{ overflowX: 'scroll' }}>
								{plugin?.markdown ? <plugin.markdown /> : null}
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</Paper>
			<Dialog open={openDialog} onClose={handleClose}>
				<DialogTitle>Add data source</DialogTitle>
				<DialogContent>
					<Container component='form'>
						<TextField
							autoFocus
							margin='dense'
							id='id'
							label='Data source identifier'
							type='id'
							fullWidth
							variant='standard'
						/>
						<TextField
							autoFocus
							margin='dense'
							id='name'
							label='Data source name'
							type='name'
							fullWidth
							variant='standard'
						/>
						<TextField
							autoFocus
							margin='dense'
							id='name'
							label='Data retention period in days'
							type='number'
							fullWidth
							variant='standard'
						/>
						<Divider sx={{ mt: 3, mb: 3 }} />
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button variant='contained' onClick={handleClose}>
								Add
							</Button>
						</DialogActions>
					</Container>
				</DialogContent>
			</Dialog>
		</ProjectLayout>
	);
}

export { TelegrafPluginPage };

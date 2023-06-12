import 'react';
import { ProjectLayout } from '../../components/project-layout';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Divider,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { WRITE_DATA_TELEGRAF_PLUGINS } from '../../common/config/telegraf-plugins';

function CreateDataSource() {
	const params = useParams();
	const navigate = useNavigate();

	return (
		<ProjectLayout>
			<Paper sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
				<Container maxWidth={false} sx={{ width: '100%', m: 0, height: '100%' }}>
					<Stack direction='row' sx={{ mt: 1, mb: 1 }}>
						<TextField id='standard-basic' label='Source name' variant='standard' sx={{ width: '100%' }} />
						<Button sx={{ minWidth: '170px', ml: 1 }} variant='outlined'>
							Search sources
						</Button>
					</Stack>
					<Stack direction='row' useFlexGap flexWrap='wrap' justifyContent='space-between'>
						{WRITE_DATA_TELEGRAF_PLUGINS.map(plugin => {
							return (
								<Card
									variant='outlined'
									key={plugin.id}
									sx={{ width: 275, height: 275, m: 2 }}
									onClick={() =>
										navigate(`/project/${params.projectId}/data-sources/plugin/${plugin.id}`)
									}
								>
									<CardActionArea
										sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
									>
										<CardMedia
											component='img'
											image={plugin.image}
											alt={plugin.name}
											sx={{ objectFit: 'contain', m: 1, width: '160px', height: '160px' }}
										/>
										<Divider />
										<CardContent sx={{ height: '60px' }}>
											<Typography gutterBottom variant='subtitle1' component='div'>
												{plugin.name}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							);
						})}
					</Stack>
				</Container>
			</Paper>
		</ProjectLayout>
	);
}

export { CreateDataSource };

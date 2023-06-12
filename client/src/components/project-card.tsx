import 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Project } from '../common/types/project';
import { useNavigate } from 'react-router-dom';

type ProjectProps = PropsWithChildren & Project;

function ProjectCard({ id, name, description }: ProjectProps) {
	const navigate = useNavigate();

	return (
		<Box sx={{ flexShrink: 0, flexGrow: 1 }}>
			<Card sx={{ minWidth: 275, height: 180 }}>
				<CardContent sx={{ textAlign: 'left' }}>
					<Typography variant='h5' component='div'>
						{name}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color='text.secondary'>
						{id}
					</Typography>
					<Typography variant='body2'>{description}</Typography>
				</CardContent>
				<CardActions>
					<Button onClick={() => navigate(`/project/${id}/dashboards`)} size='small'>
						Open
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
}

export { ProjectCard };

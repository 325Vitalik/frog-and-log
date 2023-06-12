import 'react';
import { Box, Button, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ProjectCreatorProps {
	onCreate: () => void;
}

function ProjectCreator({ onCreate }: ProjectCreatorProps) {
	return (
		<Box>
			<Button sx={{ padding: 0 }} onClick={onCreate}>
				<Card sx={{ minWidth: 275, height: 180 }}>
					<AddIcon sx={{ fontSize: 180, color: 'primary.dark' }} />
				</Card>
			</Button>
		</Box>
	);
}

export { ProjectCreator };

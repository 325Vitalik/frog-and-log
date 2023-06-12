import 'react';
import { Stack } from '@mui/material';
import { ProjectCard } from '../../components/project-card';
import { ProjectCreator } from '../../components/project-creator';
import { useNavigate } from 'react-router-dom';
import { HeaderLayout } from '../../components/header-layout';
import { useEffect, useState } from 'react';
import { appWriteService } from '../../services/appwrite-service';
import { ProjectDocument } from '../../common/types/project-document';

function Home() {
	const [projects, setProjects] = useState<ProjectDocument[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		appWriteService.getProjects().then(projects => setProjects(projects));
	}, []);

	const handleCreateProject = () => {
		navigate('/create-project');
	};

	return (
		<HeaderLayout>
			<Stack spacing={3} direction={'row'} useFlexGap flexWrap='wrap'>
				{projects.map(project => (
					<ProjectCard
						key={project.id}
						id={project.id}
						name={project.name}
						description={project.description}
						author={project.author}
						size={project.size}
					/>
				))}
				<ProjectCreator onCreate={handleCreateProject} />
			</Stack>
		</HeaderLayout>
	);
}

export { Home };

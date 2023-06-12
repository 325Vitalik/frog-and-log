import 'react';
import { ProjectLayout } from '../../components/project-layout';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { appWriteService } from '../../services/appwrite-service';

interface GrafanaPageProps {
	route: string;
}

function GrafanaPage({ route }: GrafanaPageProps) {
	const [active, setActive] = useState(false);
	const params = useParams();

	const grafanaPath = getGrafanaPath(route, params.projectId);

	useEffect(() => {
		setActive(false);
		appWriteService
			.getJWTTokenOfCurrentUser()
			.then(jwt =>
				fetch(getGrafanaPath(`/initialize-auth/?projectId=${params.projectId}`, params.projectId), {
					credentials: 'include',
					headers: {
						'Authorization': `Bearer ${jwt}`,
					},
				}),
			)
			.finally(() => setActive(true));
	}, [grafanaPath, params.projectId]);

	if (!active) {
		return null;
	}

	return (
		<ProjectLayout>
			<iframe
				name='grafana'
				id='grafana'
				style={{
					width: '100%',
					height: '100%',
					border: 'none',
				}}
				src={grafanaPath}
			/>
		</ProjectLayout>
	);
}

const getGrafanaPath = (route: string, projectId: string | undefined) => {
	if (import.meta.env.MODE === 'development') {
		return `${import.meta.env.VITE_GRAFANA_PROTOCOL}://${import.meta.env.VITE_GRAFANA_DOMAIN}/grafana${route}`;
	}

	return `${import.meta.env.VITE_GRAFANA_PROTOCOL}://${projectId}.${
		import.meta.env.VITE_GRAFANA_DOMAIN
	}/grafana${route}`;
};

export { GrafanaPage };

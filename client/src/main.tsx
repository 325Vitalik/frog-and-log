import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignUp } from './routes/auth/sign-up/sign-up.tsx';
import { Root } from './routes/root.tsx';
import { SignIn } from './routes/auth/sign-in/sign-in.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme.ts';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import './index.css';
import { Home } from './routes/home/home.tsx';
import { PrivateRoute } from './components/private-route.tsx';
import { UnauthorizedRoute } from './components/unauthorized-route.tsx';
import { CreateProject } from './routes/project/create-project.tsx';
import { GrafanaPage } from './routes/project/grafana-page.tsx';
import { DataSourcesPage } from './routes/project/data-sources.tsx';
import { CreateDataSource } from './routes/project/create-data-source.tsx';
import { TelegrafPluginPage } from './routes/project/telegraf-plugin.tsx';
import { App } from './App.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
	},
	{
		path: '/sign-up',
		element: (
			<UnauthorizedRoute>
				<SignUp />
			</UnauthorizedRoute>
		),
	},
	{
		path: '/sign-in',
		element: (
			<UnauthorizedRoute>
				<SignIn />
			</UnauthorizedRoute>
		),
	},
	{
		path: '/home',
		element: (
			<PrivateRoute>
				<Home />
			</PrivateRoute>
		),
	},
	{
		path: '/create-project',
		element: (
			<PrivateRoute>
				<CreateProject />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/data-sources',
		element: (
			<PrivateRoute>
				<DataSourcesPage />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/data-sources/new',
		element: (
			<PrivateRoute>
				<CreateDataSource />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/data-sources/plugin/:pluginId',
		element: (
			<PrivateRoute>
				<TelegrafPluginPage />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/search',
		element: (
			<PrivateRoute>
				<GrafanaPage route='/?search=open' />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/explore',
		element: (
			<PrivateRoute>
				<GrafanaPage route='/explore' />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/dashboards',
		element: (
			<PrivateRoute>
				<GrafanaPage route='/dashboards' />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/playlists',
		element: (
			<PrivateRoute>
				<GrafanaPage route='/playlists' />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/dashboard/new',
		element: (
			<PrivateRoute>
				<GrafanaPage route='/dashboard/new' />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/dashboards/folder/new',
		element: (
			<PrivateRoute>
				<GrafanaPage route='/dashboards/folder/new' />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/alerting/list',
		element: (
			<PrivateRoute>
				<GrafanaPage route='/alerting/list' />
			</PrivateRoute>
		),
	},
	{
		path: '/project/:projectId/team',
		element: (
			<PrivateRoute>
				<div>TODO</div>
			</PrivateRoute>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App>
					<CssBaseline />
					<RouterProvider router={router} />
				</App>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
);

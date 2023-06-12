import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function PrivateRoute({ children }: React.PropsWithChildren) {
	const user = useSelector((state: RootState) => state.auth.user);
	const prevRoute = useLocation();

	if (!user) {
		return <Navigate to='/sign-in' state={{ from: prevRoute }} />;
	}

	return <React.Fragment>{children}</React.Fragment>;
}

export { PrivateRoute };

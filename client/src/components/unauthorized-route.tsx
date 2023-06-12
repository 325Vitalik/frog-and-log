import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function UnauthorizedRoute({ children }: React.PropsWithChildren) {
	const user = useSelector((state: RootState) => state.auth.user);
	const prevRoute = useLocation();

	if (user) {
		return <Navigate to='/home' state={{ from: prevRoute }} />;
	}

	return <React.Fragment>{children}</React.Fragment>;
}

export { UnauthorizedRoute };

import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from './redux/auth/authSlice';
import { appWriteService } from './services/appwrite-service';
import { useLocation } from 'react-router-dom';

function App({ children }: PropsWithChildren) {
	const [render, setRender] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setRender(false);
		appWriteService
			.getUser()
			.then(user => dispatch(signInUser(user)))
			.finally(() => setRender(true));
	}, [dispatch]);

	if (!render) {
		return null;
	}

	return <React.Fragment>{children}</React.Fragment>;
}

export { App };

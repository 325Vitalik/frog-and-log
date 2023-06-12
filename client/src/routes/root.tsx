import 'react';
import React from 'react';

function Root() {
	return (
		<React.Fragment>
			<div id='sidebar'>
				<h1>React Router Contacts</h1>
				<nav>
					<ul>
						<li>
							<a href={`/sign-up`}>Sign Up</a>
						</li>
						<li>
							<a href={`/sign-in`}>Log In</a>
						</li>
					</ul>
				</nav>
			</div>
			<div id='detail'></div>
		</React.Fragment>
	);
}

export { Root };

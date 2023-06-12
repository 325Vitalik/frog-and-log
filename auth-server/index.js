const express = require('express');
const app = express();
const cors = require('cors');
const sdk = require('node-appwrite');
const cookieParser = require('cookie-parser');

app.use(
	cors({
		origin: ['http://localhost:5173', 'frog-and-log.pp.ua'],
		credentials: true,
	}),
);
app.use(cookieParser());

const APPWRITE_URL = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = 'frog-and-log';

app.get('/initialize-auth', async function (req, res) {
	const client = new sdk.Client();

	const projectId = req.query.projectId;
	const token = req.headers.authorization?.match(/^JWT (.*)$/) || req.headers.authorization?.match(/^Bearer (.*)$/);

	client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT_ID).setJWT(token);

	const account = new sdk.Account(client);
	const teams = new sdk.Teams(client);

	try {
		await account.get();
		const found = (await teams.list()).teams.find(team => team.name === projectId);
		if (!found) {
			throw new Error();
		}
	} catch (error) {
		return res.sendStatus(401);
	}

	res.cookie('JWT_TOKEN', token, { maxAge: 900000, httpOnly: true });
	res.cookie('PROJECT_ID', projectId, { maxAge: 900000, httpOnly: true });
	res.status(200).send('');
});

app.get('/auth', async function (req, res) {
	if (!req.cookies.JWT_TOKEN || !req.cookies.PROJECT_ID) {
		return res.sendStatus(401);
	}

	const client = new sdk.Client();

	client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT_ID).setJWT(req.cookies.JWT_TOKEN);

	const account = new sdk.Account(client);
	const teams = new sdk.Teams(client);
	try {
		await account.get();
		const found = (await teams.list()).teams.find(team => team.name === req.cookies.PROJECT_ID);
		if (!found) {
			throw new Error();
		}
	} catch (error) {
		return res.sendStatus(401);
	}

	res.sendStatus(200);
});

app.listen(3001);

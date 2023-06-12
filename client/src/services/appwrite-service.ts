import { Account, Client, Databases, ID, Permission, Role, Teams } from 'appwrite';
import { AppWriteConfig } from '../common/config/appwrite-config';
import { UserPreferences } from '../common/types/user-preferences';
import { UserTeamRole } from '../common/enums/user-team-role';
import { Project } from '../common/types/project';
import { ProjectDocument } from '../common/types/project-document';
import { MachineSize } from '../common/enums/machine-size';

class AppWriteService {
	private account: Account;
	private teams: Teams;
	private databases: Databases;

	constructor() {
		const client = new Client().setEndpoint(AppWriteConfig.endpoint).setProject(AppWriteConfig.project);
		this.account = new Account(client);
		this.teams = new Teams(client);
		this.databases = new Databases(client);
	}

	async signInWithEmailAndPassword(email: string, password: string) {
		await this.account.createEmailSession(email, password);

		return this.account.get<UserPreferences>();
	}

	async signInWithGoogle() {
		await this.account.createOAuth2Session(
			'google',
			`${import.meta.env.VITE_HOSTNAME}/home`,
			`${import.meta.env.VITE_HOSTNAME}/#failure`,
		);

		return this.account.get<UserPreferences>();
	}

	async signUpWithEmailAndPassword({
		email,
		password,
		firstName,
		lastName,
	}: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	}) {
		return this.account.create<UserPreferences>(ID.unique(), email, password, `${firstName} ${lastName}`);
	}

	async signUpWithGoogle() {
		return this.signInWithGoogle();
	}

	async getUser() {
		return this.account.get<UserPreferences>();
	}

	async signOut() {
		return this.account.deleteSession('current');
	}

	async getProjects() {
		return (
			await this.databases.listDocuments<ProjectDocument>(
				AppWriteConfig.databaseId,
				AppWriteConfig.projectsCollectionId,
			)
		).documents;
	}

	async createProject({
		id,
		name,
		description,
		size,
	}: {
		id: string;
		name: string;
		description: string;
		size: MachineSize;
	}) {
		const author = (await this.getUser()).$id;
		const team = await this.teams.create(ID.unique(), id, [UserTeamRole.ADMIN, UserTeamRole.VIEWER]);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		await this.databases.createDocument(
			AppWriteConfig.databaseId,
			AppWriteConfig.projectsCollectionId,
			ID.unique(),
			{
				id,
				name,
				description,
				author,
				size,
			} as Project,
			[
				Permission.read(Role.team(team.$id)),
				Permission.write(Role.team(team.$id, UserTeamRole.ADMIN)),
				Permission.update(Role.team(team.$id, UserTeamRole.ADMIN)),
				Permission.delete(Role.team(team.$id, UserTeamRole.ADMIN)),
			],
		);
		//TODO: call function to setup instance
	}

	async getJWTTokenOfCurrentUser() {
		return (await this.account.createJWT()).jwt;
	}
}

const appWriteService = new AppWriteService();

export { appWriteService };

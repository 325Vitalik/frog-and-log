import { MachineSize } from '../enums/machine-size';

export type Project = {
	id: string;
	name: string;
	description: string;
	author: string;
	size: MachineSize;
};

import { Card, CardContent, Stack, Typography } from '@mui/material';
import { MachineSize } from '../common/enums/machine-size';

interface MachineSizeSelectionProps {
	size: MachineSize;
	onSetSize: (size: MachineSize) => void;
}

function MachineSizeSelector({ size, onSetSize }: MachineSizeSelectionProps) {
	const styleOfSelected = {
		borderColor: 'primary.main',
		borderWidth: 1,
		borderStyle: 'solid',
	};

	return (
		<Stack direction='row' justifyContent='space-around'>
			<Card
				sx={{
					minWidth: 275,
					cursor: 'pointer',
					...(size === MachineSize.SMALL && styleOfSelected),
				}}
				raised={size === MachineSize.SMALL}
				variant={size === MachineSize.SMALL ? 'elevation' : 'outlined'}
				onClick={() => onSetSize(MachineSize.SMALL)}
			>
				<CardContent>
					<Typography variant='h5' component='div'>
						Small
					</Typography>
					<Typography variant='body2'>
						1 GB / 1 AMD CPU
						<br />
						25 GB NVMe SSDs
						<br />
						1000 GB transfer
					</Typography>
					<br />
					<Typography variant='h5' component='div'>
						Free
					</Typography>
				</CardContent>
			</Card>
			<Card
				sx={{
					minWidth: 275,
					cursor: 'pointer',
					...(size === MachineSize.MEDIUM && styleOfSelected),
				}}
				raised={size === MachineSize.MEDIUM}
				variant={size === MachineSize.MEDIUM ? 'elevation' : 'outlined'}
				onClick={() => onSetSize(MachineSize.MEDIUM)}
			>
				<CardContent>
					<Typography variant='h5' component='div'>
						Medium
					</Typography>
					<Typography variant='body2'>
						2 GB / 1 AMD CPU
						<br />
						50 GB NVMe SSDs
						<br />2 TB transfer
					</Typography>
					<br />
					<Typography variant='h5' component='div'>
						10$
					</Typography>
				</CardContent>
			</Card>
			<Card
				sx={{
					minWidth: 275,
					cursor: 'pointer',
					...(size === MachineSize.LARGE && styleOfSelected),
				}}
				raised={size === MachineSize.LARGE}
				variant={size === MachineSize.LARGE ? 'elevation' : 'outlined'}
				onClick={() => onSetSize(MachineSize.LARGE)}
			>
				<CardContent>
					<Typography variant='h5' component='div'>
						Large
					</Typography>
					<Typography variant='body2'>
						4 GB / 2 AMD CPU
						<br />
						80 GB NVMe SSDs
						<br />4 TB transfer
					</Typography>
					<br />
					<Typography variant='h5' component='div'>
						20$
					</Typography>
				</CardContent>
			</Card>
		</Stack>
	);
}

export { MachineSizeSelector };

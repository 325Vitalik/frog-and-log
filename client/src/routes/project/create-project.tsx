import 'react';
import { Box, Button, Divider, FormControl, FormHelperText, Paper, Stack, TextField, Typography } from '@mui/material';
import { HeaderLayout } from '../../components/header-layout';
import { useNavigate } from 'react-router-dom';
import { appWriteService } from '../../services/appwrite-service';
import { MachineSizeSelector } from '../../components/machine-size-selector';
import { MachineSize } from '../../common/enums/machine-size';
import { useState } from 'react';

function CreateProject() {
	const [size, setSize] = useState(MachineSize.MEDIUM);
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const id = data.get('id')?.toString() || '';
		const name = data.get('name')?.toString() || '';
		const description = data.get('description')?.toString() || '';

		appWriteService.createProject({ id, name, description, size });
	};

	const handleReset = () => {
		navigate(-1);
	};

	const handleSetSize = (size: MachineSize) => {
		setSize(size);
	};

	return (
		<HeaderLayout>
			<Paper sx={{ height: '110%' }}>
				<Box component='form' onSubmit={handleSubmit} onReset={handleReset} sx={{ p: 2 }}>
					<Typography component='h1' variant='h5'>
						Create project
					</Typography>
					<Stack justifyContent='center' spacing={{ xs: 1, sm: 2, md: 4 }}>
						<FormControl>
							<TextField
								margin='normal'
								required
								fullWidth
								id='id'
								label='Project ID'
								name='id'
								autoComplete='id'
								autoFocus
							/>
							<FormHelperText>
								This id should be unique, subdomain will be assigned to it. You will not be able to
								change it!
							</FormHelperText>
						</FormControl>
						<TextField
							margin='normal'
							required
							fullWidth
							id='name'
							label='Project name'
							name='name'
							autoComplete='name'
							autoFocus
						/>
						<TextField
							margin='normal'
							fullWidth
							name='description'
							label='Description'
							id='description'
							autoComplete='description'
						/>
					</Stack>
					<Divider variant='middle' sx={{ m: 5 }} />
					<MachineSizeSelector size={size} onSetSize={handleSetSize} />
					<Divider variant='middle' sx={{ m: 5 }} />
					<Stack direction='row' spacing={2}>
						<Button type='submit' fullWidth variant='contained'>
							Create
						</Button>
						<Button type='reset' fullWidth variant='outlined'>
							Cancel
						</Button>
					</Stack>
				</Box>
			</Paper>
		</HeaderLayout>
	);
}

export { CreateProject };

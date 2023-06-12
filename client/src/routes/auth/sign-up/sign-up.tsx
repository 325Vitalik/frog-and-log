import 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch } from 'react-redux';
import { appWriteService } from '../../../services/appwrite-service';
import { signInUser } from '../../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';

function SignUp() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		appWriteService
			.signUpWithEmailAndPassword({
				email: data.get('email')?.toString() || '',
				password: data.get('password')?.toString() || '',
				firstName: data.get('firstName')?.toString() || '',
				lastName: data.get('lastName')?.toString() || '',
			})
			.then(user => {
				dispatch(signInUser(user));
				navigate('/home');
			});
	};

	const signInWithGoogle = () => {
		appWriteService.signInWithGoogle().then(user => {
			dispatch(signInUser(user));
			navigate('/home');
		});
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				position: 'absolute',
				width: '100%',
				height: '100%',
			}}
		>
			<Paper>
				<Container component='main' maxWidth='xs'>
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='firstName'
								label='First Name'
								name='firstName'
								autoComplete='firstName'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lastName'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
							<FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Remember me'
							/>
							<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
								Sign Up
							</Button>
							<Button
								type='button'
								fullWidth
								variant='outlined'
								sx={{ mb: 2 }}
								onClick={signInWithGoogle}
							>
								<GoogleIcon fontSize='small' sx={{ mr: 1 }} />
								Google
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href='#' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href='#' variant='body2'>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</Paper>
		</Box>
	);
}

export { SignUp };

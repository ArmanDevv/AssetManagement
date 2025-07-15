import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import imagepic from './4380747.jpg'
import axios from 'axios'

const defaultTheme = createTheme();


export default function RegistrationForm() {
    // const [userRegistration, setUserRegistration] = React.useState({
    //     firstName :'',
    //     lastName : '',
    //     email : '',
    //     password : ''
    // })

    // const handleChange = (e) => {

    // }
    const[signUp, setSignUp] = React.useState(false)
    const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const userRegInfo = {
        firstName : data.get('firstName'),
        lastName :  data.get('lastName'),
        email:      data.get('email'),
        password:   data.get('password'),
      }
    
    const res = await axios.post('http://localhost:3001/RegistrationForm',userRegInfo)
    if(res.status === 201){
      setSignUp(true)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height:'100vh', backgroundColor:'white'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'70%', margin:'auto', backgroundColor:'white', padding:'40px', boxShadow: 'rgba(59,130, 246, 0.5) 5px 10px 15px', height:'600px'}}>
        <div>
            <img src={imagepic} width={450}/>
        </div>
        <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'rgba(59,130, 246)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signUp ? "Successfully Signed Up" : "Sign up"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                //   value={userRegistration.firstName}
                //   onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                //   value={userRegistration.lastName}
                //   onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                //   value={userRegistration.email}
                //   onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                //   value={userRegistration.password}
                //   onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {signUp ? "Please Login Using Below Link" : "Sign Up "}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      </div>
      </div>
      </div>
    </ThemeProvider>
  );
}
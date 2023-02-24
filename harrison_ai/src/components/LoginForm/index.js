import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import validator from 'email-validator';


export default function LoginForm() {
  const SUCCESSFUL_LOGIN_MESSAGE = "Login Successful";
  const [showAlert, setShowAlert] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState({status: false, message: ""});
  const [invalidPassword, setInvalidPassword] = useState({status: false, message: ""});

  const validatePassword = (password) => {
    const specialCharacters = '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    if (password.length <= 8) {
      return false;
    }

    let hasLowerCase = false;
    let hasUpperCase = false;
    let hasNumericalValue = false;
    let hasSpecialCharacter = false;

    for (let passwordCharacter of password.split('')) {
      if (alphabets.includes(String(passwordCharacter).toLowerCase())) {
        if (passwordCharacter === passwordCharacter.toUpperCase()) {
          hasUpperCase = true;
        }
        if (passwordCharacter === passwordCharacter.toLowerCase()) {
          hasLowerCase = true;
        }
      }
      if (Number.isInteger(Number(passwordCharacter))) {
        hasNumericalValue = true;
      }
      if (specialCharacters.split('').includes(passwordCharacter)) {
        hasSpecialCharacter = true;
      }
    }
    if(!hasUpperCase || !hasLowerCase || !hasNumericalValue || !hasSpecialCharacter) {
      return false;
    }
    return true;
  }

  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    // Add validation code here
    const emailIsInvalid = !validator.validate(email);
    const passwordIsInvalid = !validatePassword(password);
    if(emailIsInvalid || passwordIsInvalid) {
      setInvalidEmail({status: true, message: "Please enter a valid email."});
      setInvalidPassword({status: true, message: "Please ensure your password is at least 8 characters long and includes an uppercase letter, a lower case letter, a digit, and a special character."});
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const formIsValid = validateForm(event);
    if (formIsValid) {
      setInvalidEmail({status: false, message: ""});
      setInvalidPassword({status: false, message: ""});
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={SUCCESSFUL_LOGIN_MESSAGE}
        >
          <Alert>{SUCCESSFUL_LOGIN_MESSAGE}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={invalidEmail.status}
              helperText={invalidEmail.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={invalidPassword.status}
              helperText={invalidPassword.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = ({ history }) => {
    const classes = useStyles();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:1000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, username, password })
            });
            const data = await res.json();
            if (data.err) {
                setErrMsg(data.msg);
                setTimeout(() => {
                    setErrMsg(null);
                }, 3000);
                return;
            } else {
                setSuccessMsg(data.msg);
                setTimeout(() => {
                    setSuccessMsg(null);
                    history.push('/signin')
                }, 3500);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: "10px" }} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar style={{ marginTop: '20px' }} className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {!errMsg ? null : <Alert style={{ textAlign: 'center', margin: '15px auto 0' }} severity="error">{errMsg}</Alert>}
                {!successMsg ? null : <Alert style={{ textAlign: 'center', margin: '15px auto 0' }} severity="success">{successMsg}</Alert>}
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid style={{ padding: '8px 24px 8px 8px' }} item xs={12} sm={6}>
                            <TextField
                                autoComplete="off"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid style={{ padding: '8px 24px 8px 8px' }} item xs={12} sm={6}>
                            <TextField
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid style={{ padding: '8px 24px 8px 8px' }} item xs={12}>
                            <TextField
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid style={{ padding: '8px 24px 8px 8px' }} item xs={12}>
                            <TextField
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid style={{ marginBottom: '20px' }} item>
                            <Link style={{ textDecoration: 'unset', color: '#3f51b5' }} to='/signin'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SignUp;




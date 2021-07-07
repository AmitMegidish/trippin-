import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        if (user.username) {
            history.push('/vacations');
        }
    }, [history, user]);

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const res = await fetch('http://localhost:1000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.err) {
                setErrMsg(data.msg);
                setTimeout(() => {
                    setErrMsg(null);
                }, 2000);
                return;
            } else {
                localStorage.token = data.token;
                const decoded = await jwt_decode(data.token);
                dispatch({
                    type: 'SIGNIN',
                    payload: decoded
                });
                setSuccessMsg(data.msg);
                setTimeout(() => {
                    setSuccessMsg(null);
                    history.push('/vacations');
                }, 3000);
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
                    Sign in
                </Typography>
                {!errMsg ? null : <Alert style={{ textAlign: 'center', margin: '15px auto 0' }} severity="error">{errMsg}</Alert>}
                {!successMsg ? null : <Alert style={{ textAlign: 'center', margin: '15px auto 0' }} severity="success">{successMsg}</Alert>}
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid style={{ marginBottom: '20px' }} item>
                            <Link style={{ textDecoration: 'unset', color: '#3f51b5' }} to='/signup'>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SignIn;
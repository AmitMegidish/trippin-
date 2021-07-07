import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, TextField, Button, Grid, CssBaseline, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import styles from './AddVacation.module.css';

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

const AddVacation = ({ history }) => {
    const user = useSelector(state => state.user);
    const classes = useStyles();
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [vacationDescription, setVacationDescription] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (user.role !== 'admin') {
            return history.push('/');
        }
    }, [user, history]);


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:1000/vacations/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city, country, vacationDescription, departureDate: departureDate, returnDate: returnDate, price, image })
            });
            const data = await res.json();
            console.log(data)
            if (data.err) {
                setErrMsg(data.msg);
                setTimeout(() => {
                    setErrMsg(null);
                }, 3000);
                return;
            } else {
                setSuccessMsg(data.msg);
                setCity('');
                setCountry('');
                setVacationDescription('');
                setDepartureDate('');
                setReturnDate('');
                setPrice(0);
                setImage('');
                setTimeout(() => {
                    setSuccessMsg(null);
                }, 3000);
            }
        } catch (err) {
            setErrMsg(err);
        }
    };

    return (
        <Container style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: "10px" }} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography style={{ paddingTop: '10px' }} component="h4" variant="h5">
                    Add A new Vacation
                    </Typography>
                {!errMsg ? null : <Alert style={{ textAlign: 'center', margin: '15px auto 0' }} severity="error">{errMsg}</Alert>}
                {!successMsg ? null : <Alert style={{ textAlign: 'center', margin: '15px auto 0' }} severity="success">
                    {successMsg}</Alert>}
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid className={styles.Item} item xs={12} sm={6}>
                            <TextField
                                autoComplete="off"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                name="city"
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                autoFocus
                            />
                        </Grid>
                        <Grid className={styles.Item} item xs={12} sm={6}>
                            <TextField
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="country"
                                label="Country"
                                name="country"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid className={styles.Item} item xs={12}>
                            <TextField
                                value={vacationDescription}
                                onChange={e => setVacationDescription(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="vacation-description"
                                label="Description"
                                name="vdescription"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid className={styles.Item} item xs={12} sm={6} >
                            <TextField
                                id="departure"
                                label="Departure"
                                type="date"
                                fullWidth
                                required
                                value={departureDate}
                                onChange={e => setDepartureDate(e.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid className={styles.Item} item xs={12} sm={6}>
                            <TextField
                                id="return-date"
                                label="Return"
                                type="date"
                                fullWidth
                                required
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid className={styles.Item} item xs={12} sm={6}>
                            <TextField
                                id="price"
                                label="Price"
                                type="number"
                                fullWidth
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid className={styles.Item} item xs={12} sm={6}>
                            <TextField
                                autoComplete="off"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                name="image"
                                variant="outlined"
                                required
                                fullWidth
                                id="image"
                                label="Image URL"
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type=""
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    > Add
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default AddVacation;

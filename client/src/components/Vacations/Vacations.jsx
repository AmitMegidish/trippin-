import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Vacation from './Vacation/Vacation';
import { Button } from '@material-ui/core';
import classes from './Vacations.module.css';

const Vacations = ({ history }) => {
    const user = useSelector(state => state.user);
    const [vacationsArr, setVacationsArr] = useState([]);

    useEffect(() => {
        if (!user.id)
            return history.push('/signin');

        const getVacations = async () => {
            try {
                const res = await fetch(`http://localhost:1000/vacations/${user.id}`, {
                    method: 'GET',
                    headers: { 'token': localStorage.getItem('token') }
                });
                const data = await res.json();
                setVacationsArr(data);
            } catch (err) {
                console.log(err);
            }
        }
        getVacations();
    }, [history, user.id]);

    const handleAddVacation = () => {
        history.push('/add');
    };

    return (
        <div className={classes.Main}>
            {user.role === "admin" ? <Button style={{ margin: '10px auto auto' }} variant="contained" color="primary" onClick={handleAddVacation}>Add A new vacation</Button> : null}
            <Grid
                style={{ width: '100%', marginTop: '10px' }}
                container
                spacing={2}
                direction='row'
                justify='space-evenly'
                alignItems='center'
            >
                {vacationsArr.map(singleVacation => {
                    return (
                        <Grid key={singleVacation.id} item>
                            <Vacation setVacationsArr={setVacationsArr} vacation={singleVacation} vacationsArr={vacationsArr} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default Vacations;
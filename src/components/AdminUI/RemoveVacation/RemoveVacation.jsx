import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import classes from './RemoveVacation.module.css';

const RemoveVacation = ({ history }) => {
    const vacation = useSelector(state => state.vacation);
    const user = useSelector(state => state.user);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (user.role !== 'admin') {
            return history.push('/');
        }
    }, [user, history]);

    const handleSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:1000/vacations/remove/${vacation.id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.err) {
                setErrMsg(data.msg);
                setTimeout(() => {
                    setErrMsg('');
                }, 3000);
            } else if (!data.err) {
                setSuccessMsg(data.msg);
                setTimeout(() => {
                    history.push('/vacations');
                    setErrMsg('');
                }, 3000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleAbort = () => {
        history.push('/vacations');
    };

    return (
        <div className={classes.Main}>
            {errMsg ? <Alert className={classes.Alerts}> {errMsg} </Alert> : null}
            {successMsg ? <Alert className={classes.Alerts}> {successMsg} </Alert> : (
                <>
                    <h1>Are you sure you want to remove this vacation?</h1>
                    <div>
                        <Button style={{ margin: '0 2px 8px' }} variant='contained' color='primary' onClick={handleSubmit}>Yes</Button>
                        <Button style={{ margin: '0 2px 8px' }} variant='contained' color='primary' onClick={handleAbort}>No</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RemoveVacation;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import classes from './Reports.module.css';

const Reports = ({ history }) => {
    const user = useSelector(state => state.user);
    const [vacations, setVacations] = useState([]);

    useEffect(() => {
        if (user.role !== 'admin') {
            return history.push('/');
        }
    }, [user, history]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:1000/follow/reports');
            const data = await res.json();
            console.log(data);
            setVacations(data);
        };
        fetchData();
    }, []);

    const data = {
        labels: ["Vacations:", ...vacations.map(vacation => `I.D: ${vacation.id}, ${vacation.city}`)],
        datasets: [
            {
                label: 'Followed Vacations',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [0, ...vacations.map(vacation => vacation.number_of_followers)]
            }
        ]
    };

    return (
        <>
            {!vacations.length ? (
                <div className={classes.Alert}>
                    <h1>
                        There are no followed vacations at the moment.
                    </h1>
                </div>) : (
                    <div className={classes.Chart}>
                        <Bar data={data} height={100} />
                    </div>
                )}
        </>
    );
};
export default Reports;

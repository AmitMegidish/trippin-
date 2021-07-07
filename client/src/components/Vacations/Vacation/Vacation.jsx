import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: 360
    },
});

const Vacation = ({ vacation, vacationsArr, setVacationsArr }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isFollowed, setIsFollowed] = useState(false);
    let btns;

    useEffect(() => {
        if (vacation.isFollowed) {
            setIsFollowed(true);
        } else if (!vacation.isFollowed) {
            setIsFollowed(false);
        }
    }, [vacation.isFollowed]);

    const handleVacationEdit = () => {
        dispatch({
            type: "EDIT",
            payload: vacation
        });
    };

    const handleVacationRemoval = e => {
        dispatch({
            type: "REMOVE",
            payload: vacation
        });
    };

    const handleFollow = async e => {
        try {
            if (e.target.checked) {
                const res = await fetch('http://localhost:1000/follow/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, vacationId: vacation.id })
                })
                const data = await res.json();
                console.log(data);
                setIsFollowed(!isFollowed);
                const followedVacation = vacationsArr.filter(v => v.id === vacation.id);
                const restOfVacations = vacationsArr.filter(v => v.id !== vacation.id);
                const finalVacationsArr = [...followedVacation, ...restOfVacations];
                setVacationsArr(finalVacationsArr);
            } else if (!e.target.checked) {
                const res = await fetch('http://localhost:1000/follow/remove', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, vacationId: vacation.id })
                });
                const data = await res.json();
                console.log(data);
                setIsFollowed(!isFollowed);
                const unFollowedVacation = vacationsArr.filter(v => v.id === vacation.id);
                const restOfVacations = vacationsArr.filter(v => v.id !== vacation.id);
                restOfVacations.push(...unFollowedVacation);
                setVacationsArr(restOfVacations);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (user.role === 'admin') {
        btns = (
            <div>
                <Link onClick={handleVacationEdit} to='/edit'>
                    <EditTwoToneIcon />
                </Link>
                <Link onClick={handleVacationRemoval} to='/remove'>
                    <DeleteForeverTwoToneIcon />
                </Link>
            </div>
        );
    } else {
        btns = <FormControlLabel
            checked={isFollowed}
            onChange={e => handleFollow(e)}
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label="" />;
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={vacation.city}
                    height="140"
                    style={{ width: '95%', margin: '8px auto' }}
                    image={vacation.image}
                    title={vacation.city}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {vacation.city}, {vacation.country}
                    </Typography>
                    <Typography gutterBottom style={{ textAlign: 'center' }} variant="body2" color="textPrimary" component="p">
                        {vacation.vacation_description}
                    </Typography>
                    <Typography style={{ textAlign: 'center' }} gutterBottom variant="body2" color="textPrimary" component="p">
                        From: {vacation.departure_date.split('-').reverse().join('-')} , To: {vacation.return_date.split('-').reverse().join('-')}
                    </Typography>
                    <Typography style={{ textAlign: 'center' }} variant="body2" color="textPrimary" component="p">
                        Price: ${vacation.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {btns}
            </CardActions>
        </Card>
    );
};

export default Vacation;

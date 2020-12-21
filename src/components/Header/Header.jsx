import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './Header.module.css';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    let navItems;

    const handleSignout = () => {
        localStorage.removeItem('token');
        dispatch({
            type: 'SIGNOUT'
        });
    };

    if (!user) {
        navItems = null;
    } else if (user.role === 'admin') {
        navItems = (<div className={styles.NavItems}>
            <NavLink style={{ textDecoration: "unset", color: 'white' }} activeClassName={styles.Active} to='/vacations'>Vacations</NavLink>
            <NavLink style={{ textDecoration: "unset", color: 'white' }} activeClassName={styles.Active} to='/reports'>Reports</NavLink>
            <NavLink style={{ textDecoration: "unset", color: 'white' }} onClick={handleSignout} to='/signin'>SignOut</NavLink>
        </div>);
    } else if (user.role === 'user') {
        navItems = <NavLink style={{ textDecoration: "unset", color: 'white' }} onClick={handleSignout} to='/signin'> SignOut</NavLink>
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Trippin'
                    </Typography>
                    {navItems}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;

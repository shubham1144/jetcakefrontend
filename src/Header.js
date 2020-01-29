import {Link} from "react-router-dom";
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import { Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    }
}));

const Header = (props) => {
    const classes = useStyles();
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(()=>{
        if(localStorage.getItem("loggedIn") === "true") {
            setLoggedIn(true);
        }
    }, []);

    useEffect(()=>{
        if(props.loggedIn) {
            setLoggedIn(true);
        }else {
            setLoggedIn(false);
        }
    }, [props.loggedIn]);

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>

                    <Link to="/">
                        JetCake
                    </Link>
                </Typography>
                {loggedIn ? (
                    <>
                        <Link to="/signup">
                            <Button href="#" color="primary" variant="outlined">
                                profile
                            </Button>
                        </Link>
                        <Button  color="primary" variant="outlined">
                            Signout
                        </Button>
                    </>
                    ) : (
                    <>
                    <Link to="/signup">
                        <Button href="#" color="primary" variant="outlined">
                            Signup
                        </Button>
                    </Link>
                    <Link to="/signin">
                        <Button href="#" color="primary" variant="outlined">
                        Login
                        </Button>
                    </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )

};

const mapStateToProps = function(state) {
    return {
        loggedIn: state.loggedIn
    }
};

export default connect(mapStateToProps, null)(Header);


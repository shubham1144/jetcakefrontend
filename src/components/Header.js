import {Link} from "react-router-dom";
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import { Typography, Button, AppBar, Toolbar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    headerButton: {
        margin: '0px 4px'
    }
}));

const Header = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(()=>{
        if(localStorage.getItem("loggedIn") == 'true') {
            setLoggedIn('true');
        }
    }, []);

    useEffect(()=>{
        //used when header is alredy loaded and the user logs in
        if(props.loggedIn !== loggedIn) {
            if(props.loggedIn) {
                setLoggedIn(true);
            }else {
                setLoggedIn(false);
            }
        }
    }, [props.loggedIn]);

    const signOut = () => {
        //@todo : Remove the profile from store
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
        history.push("/");
        setLoggedIn(false);
    };

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>

                            <Link to="/">
                                JetCake
                            </Link>
                        </Typography>
                    </Grid>

                    <Grid item xs={9}>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            {loggedIn ? (
                                <>
                                    <Link to="/profile">
                                        <Button href="#" color="primary" variant="outlined" className={classes.headerButton}>
                                            profile
                                        </Button>
                                    </Link>
                                    <Button color="primary" variant="outlined" onClick={signOut} className={classes.headerButton}>
                                        Signout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup">
                                        <Button color="primary" variant="outlined" className={classes.headerButton}>
                                            Signup
                                        </Button>
                                    </Link>
                                    <Link to="/signin">
                                        <Button color="primary" variant="outlined" className={classes.headerButton}>
                                            Login
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Grid>

                    </Grid>
                </Grid>
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


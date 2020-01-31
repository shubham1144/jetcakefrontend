import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid, Snackbar} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { getProfile, updateProfile } from './actions';
import UserDetails from './userDetails';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    paperMain: {
        margin: theme.spacing(8),
        marginTop : 0,
        padding: theme.spacing(2),
    },
    paperMainSkeleton: {
        width: "90%",
        padding: theme.spacing(2),
    }
}));

const Profile = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState('view');
    useEffect(()=>{
        if(props.message) {
            setOpen(true);
            setMode('view');
        } else {
            setOpen(false);
        }
    }, [props.message]);

    useEffect(()=>{
        if(localStorage.getItem("loggedIn") == 'true') {
            props.getProfile();
        }else {
            history.push('/')
        }

    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const editModeEnable = () => {
        setMode('edit')
    }
    return (
        <Grid container spacing={1} className={classes.paperMain}>
            {props.message && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top', horizontal: 'center'
                                        }}>
                <Alert onClose={handleClose} severity="success">
                    {props.message}
                </Alert>
            </Snackbar>}
            <Grid container alignItems={"flex-end"}>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={editModeEnable}
                    >
                        Edit
                    </Button>
                </Grid>
            </Grid>
            {props.isLoading && !props.profile ? (
                <Grid className={classes.paperMainSkeleton}>
                    <Skeleton height={100} animation="wave"/>
                    <Skeleton height={100} animation="wave"/>
                    <Skeleton height={100} animation="wave"/>
                    <Skeleton height={100} animation="wave"/>
                </Grid>

            ) : (
                <UserDetails
                    mode={mode}
                    onSuccess={props.updateProfile}
                    profile={props.profile}
                    isLoading={props.isLoading}
                />
            )}

        </Grid>
    );
}

const mapStateToProps = function(state) {
    return {
        isLoading: state.isLoading,
        message: state.message,
        profile: state.profile
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: data => dispatch(getProfile(data)),
        updateProfile: data => dispatch(updateProfile(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

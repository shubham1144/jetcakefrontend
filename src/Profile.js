import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar } from '@material-ui/core'
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
    }
}));

const Profile = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    useEffect(()=>{
        if(props.message) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [props.message]);

    useEffect(()=>{
        props.getProfile({
            userId : 2
        });
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
            <UserDetails
                mode={'view'}
                onSuccess={props.updateProfile}
                profile={props.profile}
            />
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

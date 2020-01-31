import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { signup } from './actions';
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

const SignUp = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(()=>{
        if(props.message) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [props.message]);

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
                onSuccess={props.signup}
                mode={'add'}
                isLoading={props.isLoading}
            />
        </Grid>
    );
}

const mapStateToProps = function(state) {
    return {
        isLoading: state.isLoading,
        message: state.message
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signup: data => dispatch(signup(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

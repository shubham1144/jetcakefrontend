import React, {useEffect} from 'react';
import { Container, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { signup, signupReset } from '../container/actions';
import UserDetails from './userDetails';
import { useHistory } from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = (props) => {
    let history = useHistory();
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

    useEffect(()=>{
        if(props.signUpSuccess) {
            setOpen(true);
            setTimeout(() => {
                history.push('/signin')
            }, 3000);
        }
    }, [props.signUpSuccess])


    useEffect(() => {
        return () => {
            props.reset()
        }
    }, []);

    return (
        <Container component="main">
            {props.message && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top', horizontal: 'center'
                                }}>
                <Alert onClose={handleClose} severity={props.message && !props.signUpSuccess ? "error": "success"}>
                    {props.message}
                </Alert>
            </Snackbar>}
            <div>
                <UserDetails
                    onSuccess={props.signup}
                    mode={'add'}
                    isLoading={props.isLoading}
                />
            </div>

        </Container>
    );
}

const mapStateToProps = function(state) {
    return {
        isLoading: state.isLoading,
        message: state.message,
        signUpSuccess: state.signUpSuccess
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signup: data => dispatch(signup(data)),
        reset: () => dispatch(signupReset())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

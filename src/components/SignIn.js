import React, {useEffect} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {signin} from "../container/actions";
import {connect} from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

import {
    Link as RouterLink
} from "react-router-dom";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Container,
    FormHelperText,
    Snackbar,
    CircularProgress
} from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CircularProgressStyled = withStyles({
    colorPrimary: {
        color: '#ffffff',
    },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const [userData, setUserData] = React.useState({
        email : '',
        password: ''
    });
    const [errorData, setErrorData] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const SignInValidator = {
        email : {
            message : "We'll never share your email.",
            validator : (email)=>{
                var re = /\S+@\S+\.\S+/;
                return re.test(email);
            },
            validatorMessage : "provide an valid email"
        }
    };

    useEffect(()=>{
        if(props.message) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [props.message]);

    useEffect(()=>{
        if(props.loggedIn) {
            history.push("/profile");
        }
    }, [props.loggedIn]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleFieldChange = (event, validator) => {
        const { name, value } = event.target;
        userData[name] = value;
        setUserData(userData);
        if(validator && !validator(value)) {
            errorData[name] = SignInValidator[name].validatorMessage || SignInValidator[name].message;
        } else {
            delete errorData[name];
        }
        setErrorData({...errorData});
    };

    const isErrorState = (value) => {
        return errorData[value] !== undefined;
    };

    const ErrorMessageDisplay = (value) => {
        return isErrorState(value) ?  (
            <FormHelperText id="email-helper-text">{errorData[value]}</FormHelperText>
        ) : null;
    };

    const onSignInSubmit = (e) => {
        e.preventDefault();
        Object.keys(userData).map((key)=>{
            if(userData[key] === '' || !userData[key]){
                errorData[key] = "Field is required";
            }
        });
        if(Object.keys(errorData).length > 0) {
            setErrorData({...errorData});
        } else {
            props.signin(userData);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            {props.message && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top', horizontal: 'center'
                }}>
                <Alert onClose={handleClose} severity={props.message && !props.loggedIn ? "error": "success"}>
                    {props.message}
                </Alert>
            </Snackbar>}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSignInSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        error={isErrorState('email')}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=> { handleFieldChange(e, SignInValidator[e.target.name].validator)} }
                    />
                    {ErrorMessageDisplay('email')}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={isErrorState('password')}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleFieldChange}
                    />
                    {ErrorMessageDisplay('password')}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={props.isLoading}
                    >
                        {!props.isLoading && 'Sign In'}
                        {props.isLoading && <CircularProgressStyled size={24} />}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to={'/signup'} href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = function(state) {
    return {
        isLoading: state.isLoading,
        message: state.message,
        loggedIn: state.loggedIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signin: data => dispatch(signin(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

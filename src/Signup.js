import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import { Container, Grid, Link, Checkbox, FormControlLabel,
    TextField, CssBaseline, FormHelperText, Button, CircularProgress, Snackbar
} from '@material-ui/core'

import MuiAlert from '@material-ui/lab/Alert';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {DropzoneArea} from 'material-ui-dropzone'

import { connect } from 'react-redux';

import { signup } from './actions';

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperMain: {
        margin: theme.spacing(8),
        marginTop : 0,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    dateOfBirthWrapper: {
        border: "1px solid rgb(192, 192, 192)",
        borderRadius: "3px",
        margin: "9px",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    dob : {
        left: "3rem",
        top: "-2rem",
    },
    profileImage: {
        border : "none",
        background : "none"
    },
    profilePicContainer : {
        marginTop: theme.spacing(24),
    }
}));



const SignUp = (props) => {
    const classes = useStyles();
    // The first commit of Material-UI
    const [agreeToTerms, setAgreeToTerms] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date('1994-06-27'));
    const [uploadFile, setFiles] = React.useState(null);
    const [previewURL, setpreviewURL] = React.useState(null);
    const [userData, setUserData] = React.useState({
        email : '',
        password: '',
        dob: selectedDate.toDateString(),
        contactNumber: '',
        address: '',
        securityAns1: '',
        securityAns2: '',
        securityAns3: ''
    });
    const [errorData, setErrorData] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const SignUpValidator = {
        email : {
            message : "We'll never share your email.",
            validator : (email)=>{
                var re = /\S+@\S+\.\S+/;
                return re.test(email);
            },
            validatorMessage : "provide an valid email"
        },
        contactNumber: {
            validator : (number)=>{
                var re = /[^A-Za-z]+/;
                return re.test(number);
            },
            validatorMessage : "provide an valid contact number"
        }
    };

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

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleFileChange = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            setFiles(files[0]);
            setpreviewURL(e.target.result)
        };
        reader.readAsDataURL(files[0]);

    };

    const handleFieldChange = (event, validator) => {
        const { name, value } = event.target;
        userData[name] = value;
        setUserData(userData);
        if(validator && !validator(value)) {
            errorData[name] = SignUpValidator[name].validatorMessage || SignUpValidator[name].message;
            setErrorData({...errorData});
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

    const switchAgreeToTerms = (event) => {
        setAgreeToTerms(event.target.checked);
    };

    const onSignUpSubmit = (e) => {
        e.preventDefault();
        const userPayload = {
            ...userData,
            dob: selectedDate.toDateString(),
            image: uploadFile
        };
        Object.keys(userData).map((key)=>{
            if(userData[key] === '' || !userData[key]){
                errorData[key] = "Field is required";
            }
        });
        if(Object.keys(errorData).length > 0) {
            console.log("the error data length is : ", errorData);
            setErrorData({...errorData});
        } else {
            console.log("Making an api call here", userPayload);
            props.signup(userPayload);
        }
    };

    return (
        <Grid container spacing={1} className={classes.paperMain}>
            <Grid
                item
                md={4}
                xs={12}
                direction="row"
                justify="center"
                alignItems="center"
                classes={{ root : classes.profilePicContainer }}
            >
                <DropzoneArea
                    dropzoneText={previewURL? <img src={previewURL}/> :  "Profile Photo"}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviewsInDropzone={false}
                    dropzoneClass={classes.profileImage}
                    maxFileSize={5000000}
                    onChange={handleFileChange}
                />
            </Grid>
            <Grid item md={8} xs={12}>
                {props.message && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{
                      vertical: 'top', horizontal: 'center'
                  }}>
                    <Alert onClose={handleClose} severity="success">
                        {props.message}
                    </Alert>
                </Snackbar>}
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <form
                            className={classes.form}
                            onSubmit={onSignUpSubmit}
                            noValidate
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        error={isErrorState('email')}
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e)=> { handleFieldChange(e, SignUpValidator[e.target.name].validator)} }
                                    />
                                    {ErrorMessageDisplay('email')}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            error={isErrorState('password')}
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={handleFieldChange}
                                        />
                                    {ErrorMessageDisplay('password')}
                                </Grid>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around" className={classes.dateOfBirthWrapper}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Your Birthday *"
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            InputLabelProps={{
                                                shrink : false,
                                                classes : { root : classes.dob}
                                            }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="contactNumber"
                                        label="Contact Number"
                                        id="contactNumber"
                                        onChange={(e)=> { handleFieldChange(e, SignUpValidator[e.target.name].validator)} }
                                        error={isErrorState('contactNumber')}
                                    />
                                    {ErrorMessageDisplay('contactNumber')}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        onChange={handleFieldChange}
                                        error={isErrorState('address')}
                                    />
                                    {ErrorMessageDisplay('address')}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="securityAns1"
                                        name="securityAns1"
                                        fullWidth
                                        label="Which school did you attend?"
                                        onChange={handleFieldChange}
                                        error={isErrorState('securityAns1')}
                                    />
                                    {ErrorMessageDisplay('securityAns1')}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="securityAns2"
                                        name="securityAns2"
                                        fullWidth
                                        label="Where were you born?"
                                        onChange={handleFieldChange}
                                        error={isErrorState('securityAns2')}
                                    />
                                    {ErrorMessageDisplay('securityAns2')}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="securityAns3"
                                        name="securityAns3"
                                        fullWidth
                                        label="Your first pet's name?"
                                        onChange={handleFieldChange}
                                        error={isErrorState('securityAns3')}
                                    />
                                    {ErrorMessageDisplay('securityAns3')}
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox checked={agreeToTerms} onChange={switchAgreeToTerms} color="primary" />}
                                        label="I understand this is a jetcake coding test website"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={!agreeToTerms || props.isLoading}
                            >
                                {!props.isLoading && 'Sign Up'}
                                {props.isLoading && <CircularProgressStyled size={24} />}
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </Grid>
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

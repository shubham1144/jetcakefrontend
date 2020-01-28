import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Link, Checkbox, FormControlLabel, TextField, CssBaseline, FormHelperText, Button } from '@material-ui/core'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {DropzoneArea} from 'material-ui-dropzone'

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



export default function SignUp() {
    const classes = useStyles();
    // The first commit of Material-UI
    const [agreeToTerms, setAgreeToTerms] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date('1994-06-27'));
    const [uploadFile, setFiles] = React.useState([]);
    const [previewURL, setpreviewURL] = React.useState(null);
    const [userData, setUserData] = React.useState({
        email : '',
        password: '',
        dob: '',
        contactNumber: '',
        address: '',
        securityAns1: '',
        securityAns2: '',
        securityAns3: ''
    });
    const [errorData, setErrorData] = React.useState({});
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
            console.log("the vaidator value is : ", validator(value))
            errorData[name] = SignUpValidator[name].validatorMessage || SignUpValidator[name].message;
            setErrorData({...errorData});
        }
    };

    const isErrorState = (value) => {
        return errorData[value] !== undefined;
    };

    const ErrorMessageDisplay = (value) => {
        return isErrorState(value) ?  (
            <FormHelperText id="email-helper-text">{errorData[value]}</FormHelperText>
        ) : null;
    }

    const switchAgreeToTerms = (event) => {
        setAgreeToTerms(event.target.checked);
    }
    const onSignUpSubmit = (e) => {
        e.preventDefault();
        const userPayload = {
            ...userData,
            dob: selectedDate.toDateString(),
            image: uploadFile
        };
        Object.keys(userPayload).map((key)=>{
            if(userData[key] === '' || !userData[key]){
                errorData[key] = "Field is required";
            }
        });
        if(Object.keys(errorData).length > 0) {
            setErrorData({...errorData});
        } else {
            console.log("Making an api call here", userPayload)
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
                                disabled={!agreeToTerms}
                            >
                                Sign Up
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

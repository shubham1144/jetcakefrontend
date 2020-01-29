import {
    Button,
    Checkbox, CircularProgress,
    Container, CssBaseline,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    TextField,
} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React, {useEffect} from "react";
import {DropzoneArea} from "material-ui-dropzone";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

const UserDetails = (props)=>{
    const classes = useStyles();
    const [agreeToTerms, setAgreeToTerms] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [uploadFile, setFiles] = React.useState(null);
    const [previewURL, setpreviewURL] = React.useState(null);
    const [userData, setUserData] = React.useState(props.profile ? props.profile : {
        email : '',
        password: '',
        dob: selectedDate.toDateString(),
        contactNumber: '',
        address: '',
        securityAns1: '',
        securityAns2: '',
        securityAns3: ''
    });
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

    const [errorData, setErrorData] = React.useState({});
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


    const switchAgreeToTerms = (event) => {
        setAgreeToTerms(event.target.checked);
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

    useEffect(()=>{
        if(props.profile) {
            let userProfileData = {...props.profile};
            //delete userProfileData['image'];
            setUserData(userProfileData);
            setSelectedDate(new Date(props.profile.dob));
            // const reader = new FileReader();
            // reader.readAsDataURL(props.profile.profileImage);
            // reader.onloadend = function() {
            //     // result includes identifier 'data:image/png;base64,' plus the base64 data
            //     setpreviewURL(reader.result);
            // }
        }
    }, [props.profile]);

    const onFormSubmit = (e) => {
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
            setErrorData({...errorData});
        } else {
            props.onSuccess(userPayload);
        }
    };

    return (
        <>
        <Grid
            item
            md={4}
            xs={12}
            direction="row"
            justify="center"
            alignItems="center"
            classes={{ root : classes.profilePicContainer }}
        >
            {props.mode !== 'view'?
            <DropzoneArea
                dropzoneText={previewURL? <img src={previewURL}/> :  "Profile Photo"}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviewsInDropzone={false}
                dropzoneClass={classes.profileImage}
                maxFileSize={5000000}
                onChange={handleFileChange}
            /> : (
                <div>
                    PROFILE IMAGE GOES HERE
                </div>
                )}
        </Grid>
        <Grid item md={8} xs={12}>
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
            <form
                className={classes.form}
                onSubmit={onFormSubmit}
                noValidate
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={props.mode === 'add' ? 6 : 12}>
                        <TextField
                            variant="outlined"
                            required
                            error={isErrorState('email')}
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={userData['email']}
                            disabled={props.mode === 'view'}
                            onChange={(e)=> { handleFieldChange(e, SignUpValidator[e.target.name].validator)} }
                        />
                        {ErrorMessageDisplay('email')}
                    </Grid>
                    {props.mode === 'add' &&
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
                    }
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around" className={classes.dateOfBirthWrapper}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Your Birthday *"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                disabled={props.mode === 'view'}
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
                            disabled={props.mode === 'view'}
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
                            value={userData['address']}
                            disabled={props.mode === 'view'}
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
                            disabled={props.mode === 'view'}
                            label="Which school did you attend?"
                            onChange={handleFieldChange}
                            value={userData['securityAns1']}
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
                            disabled={props.mode === 'view'}
                            label="Where were you born?"
                            onChange={handleFieldChange}
                            value={userData['securityAns2']}
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
                            disabled={props.mode === 'view'}
                            label="Your first pet's name?"
                            onChange={handleFieldChange}
                            value={userData['securityAns3']}
                            error={isErrorState('securityAns3')}
                        />
                        {ErrorMessageDisplay('securityAns3')}
                    </Grid>
                    {props.mode === 'add' &&
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={agreeToTerms} onChange={switchAgreeToTerms} color="primary" />}
                                label="I understand this is a jetcake coding test website"
                            />
                        </Grid>
                    }

                </Grid>
                {props.mode !== 'view' &&
                <>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={props.mode === 'add' ? !agreeToTerms || props.isLoading : props.isLoading}
                    >
                        {!props.isLoading && (props.mode === 'add' ? 'Sign Up' : 'Update Profile')}
                        {props.isLoading && <CircularProgressStyled size={24} />}
                    </Button>
                    {props.mode === 'add' &&
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    }

                </>}

            </form>
            </div>
        </Container>
    </Grid>
        </>
    )
}

export default UserDetails;

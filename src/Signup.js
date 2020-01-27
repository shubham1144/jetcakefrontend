import React from 'react';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {DropzoneArea} from 'material-ui-dropzone'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                ShubhamChodankar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperMain: {
        margin: theme.spacing(8),
        marginTop : 0,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
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
        width: '100%', // Fix IE 11 issue.
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
        // margin: "14rem 4rem",
        background : "none"
    },
    profilePicContainer : {
        marginTop: theme.spacing(24),
    }
}));


export default function SignUp() {
    const classes = useStyles();
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [uploadFile, setFiles] = React.useState([]);
    const [previewURL, setpreviewURL] = React.useState(null);

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleFileChange = files => {
        // console.log("The file being uploaded is : ", files);
        var reader = new FileReader();
        reader.onload = function (e) {
            setFiles(files[0]);
            setpreviewURL(e.target.result)
        };
        reader.readAsDataURL(files[0]);

    }
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
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
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
                                <Grid item item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="telephone"
                                        label="Contact Number"
                                        id="telephone"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="filled-required"
                                        fullWidth
                                        label="Which school did you attend?"
                                        defaultValue=""
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="filled-required"
                                        fullWidth
                                        label="Where were you born?"
                                        defaultValue=""
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="filled-required"
                                        fullWidth
                                        label="Your first pet's name?"
                                        defaultValue=""
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
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

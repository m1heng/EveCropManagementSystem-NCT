import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { authProvider } from "providers/authProvider";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Link } from "react-router-dom";

const styles = theme => ({
    root: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justify: "center",

        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justify: "center",
        justifyContent: "center"
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        width: 150
    },
    textField: {
        width: 300
    }
});

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error_open: false,
            error_message: ""
        };
    }

    _handleEmailChange = e => {
        this.setState({
            email: e.target.value
        });
    };
    _handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ error_open: false });
    };

    submit = e => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };

        // Dispatch the userLogin action (injected by connect)
        authProvider.login(credentials).then(
            current_user => {
                const { from } = this.props.location.state || {
                    from: { pathname: "/" }
                };
                this.props.history.push(from);
            },
            error => {
                this.setState({ error_message: error, error_open: true });
            }
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <main className={this.props.classes.root}>
                <Paper className={this.props.classes.paper}>
                    <Typography component="h1" variant="h5">
                        九州<del>简陋</del>ESI
                    </Typography>
                    <form
                        onSubmit={this.submit}
                        className={this.props.classes.form}
                    >
                        <TextField
                            className={classes.textField}
                            onChange={this._handleEmailChange}
                            label="邮箱"
                        />
                        <br />

                        <TextField
                            className={classes.textField}
                            onChange={this._handlePasswordChange}
                            type="password"
                            label="密码"
                        />
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={this.props.classes.submit}
                        >
                            登录
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            className={this.props.classes.submit}
                            component={Link}
                            to="/register"
                        >
                            注册
                        </Button>
                    </form>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    open={this.state.error_open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                >
                    <SnackbarContent
                        onClose={this.handleClose}
                        message={this.state.error_message}
                    />
                </Snackbar>
            </main>
        );
    }
}
LoginPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);

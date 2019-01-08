import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Link } from "react-router-dom";
import { NCT_API_URL } from "Constants";

const styles = theme => ({
    main: {
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
        marginTop: theme.spacing.unit * 2,
        width: 300
    }
});

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            chinese_alias: "",
            english_alias: "",
            qq: "",
            open: false,
            dialogtext: "",
            successopen: false
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    submit = e => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = {
            email: this.state.email,
            password: this.state.password,
            chinese_alias: this.state.chinese_alias,
            english_alias: this.state.english_alias,
            qq: this.state.qq
        };

        const request = new Request(`${NCT_API_URL}/auth/register`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: new Headers({ "Content-Type": "application/json" })
        });
        fetch(request)
            .then(response => {
                if (response.status !== 200) {
                    return response.json();
                } else {
                    this.setState({ successopen: true });
                }
            })
            .then(data => {
                if (data) {
                    switch (data.duplicate) {
                        case "email":
                            this.setState({
                                open: true,
                                dialogtext: "邮箱已被使用"
                            });
                            break;
                        case "qq":
                            this.setState({
                                open: true,
                                dialogtext: "QQ已被使用"
                            });
                            break;
                        default:
                            this.setState({
                                open: true,
                                dialogtext: data.duplicate
                            });
                    }
                }
            });
    };

    handleDialogOpen = () => {
        this.setState({ open: true });
    };

    handleDialogClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <main className={this.props.classes.main}>
                <Paper className={this.props.classes.paper}>
                    <Typography component="h1" variant="h5">
                        九州<del>简陋</del>ESI
                    </Typography>
                    <Typography component="h1" variant="h5">
                        注册
                    </Typography>
                    <form
                        onSubmit={this.submit}
                        className={this.props.classes.form}
                    >
                        <TextField
                            value={this.state.email}
                            className={classes.textField}
                            onChange={this.handleChange("email")}
                            label="邮箱"
                        />
                        <br />
                        <TextField
                            value={this.state.password}
                            className={classes.textField}
                            onChange={this.handleChange("password")}
                            label="密码"
                            type="password"
                        />
                        <br />
                        <TextField
                            value={this.state.chinese_alias}
                            className={classes.textField}
                            onChange={this.handleChange("chinese_alias")}
                            label="中文昵称"
                        />
                        <br />
                        <TextField
                            value={this.state.english_alias}
                            className={classes.textField}
                            onChange={this.handleChange("english_alias")}
                            label="英文昵称(GOONS论坛名称)"
                        />
                        <br />
                        <TextField
                            value={this.state.qq}
                            className={classes.textField}
                            onChange={this.handleChange("qq")}
                            label="qq号"
                        />
                        <br />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={this.props.classes.submit}
                        >
                            注册
                        </Button>
                    </form>
                </Paper>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleDialogClose}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.dialogtext}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleDialogClose}
                            color="primary"
                            autoFocus
                        >
                            知道了
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.successopen}
                    onClose={this.handleDialogClose}
                    aria-describedby="alert-dialog-description2"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description2">
                            注册成功，点击返回登录页面
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            autoFocus
                            component={Link}
                            to="/"
                        >
                            知道了
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
        );
    }
}
RegisterPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterPage);

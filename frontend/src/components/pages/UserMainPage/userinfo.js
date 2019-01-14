import React, { Component } from "react";
import { withStyles, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CheckIcon from "@material-ui/icons/Check";
import DialogTitle from "@material-ui/core/DialogTitle";
import { nctProvider } from "../../../providers/nctProvider";
import { authProvider } from "providers/authProvider";

const styles = theme => ({
    card: {
        flex: 1,
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

class UserInfo extends Component {
    state = {
        infoOpen: false,
        restOpen: false,
        success: false,
        resetsuccess: false
    };

    componentDidMount() {
        this.setState({
            email: this.props.user.email,
            chinese_alias: this.props.user.chinese_alias,
            english_alias: this.props.user.english_alias,
            qq: this.props.user.qq,
            old_pass: "",
            new_pass: ""
        });
    }

    handleInfoOpen = () => {
        this.setState({ infoOpen: true });
    };

    handleInfoClose = () => {
        if (this.state.success) {
            window.location.reload();
        }
        this.setState({ infoOpen: false });
    };
    handleSubmit = () => {
        nctProvider
            .updateUserinfo({
                chinese_alias: this.state.chinese_alias,
                english_alias: this.state.english_alias,
                qq: this.state.qq
            })
            .then(reps => {
                this.setState({ success: true });
            })
            .catch();
    };

    handleResetOpen = () => {
        this.setState({ restOpen: true });
    };

    handleRestClose = () => {
        if (this.state.resetsuccess) {
            authProvider.logout();
            window.location.reload();
        }
        this.setState({ restOpen: false });
    };
    handleRestSubmit = () => {
        nctProvider
            .resetPassword(this.state.old_pass, this.state.new_pass)
            .then(reps => {
                this.setState({ resetsuccess: true });
            })
            .catch();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { user, classes } = this.props;
        const {
            email,
            chinese_alias,
            english_alias,
            qq,
            success,
            resetsuccess
        } = this.state;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader title="基本信息" />
                    <CardContent>
                        <Typography gutterBottom variant="title">
                            邮箱: {user.email}
                            <br />
                            中文昵称: {user.chinese_alias}
                            <br />
                            英文昵称: {user.english_alias}
                            <br />
                            QQ：{user.qq}
                            <br />
                            注册时间:
                            {new Date(user.registered_on).toLocaleString(
                                "en-GB"
                            )}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            style={{ marginRight: "1em" }}
                            size="medium"
                            color="primary"
                            onClick={this.handleInfoOpen}
                        >
                            修改信息
                        </Button>
                        <Button
                            style={{ marginRight: "1em" }}
                            size="medium"
                            color="primary"
                            onClick={this.handleResetOpen}
                        >
                            修改密码
                        </Button>
                    </CardActions>
                </Card>
                <Dialog
                    open={this.state.infoOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">修改信息</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="邮箱"
                            type="email"
                            value={email}
                            onChange={this.handleChange("email")}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="chinese_alias"
                            label="中文昵称"
                            value={chinese_alias}
                            onChange={this.handleChange("chinese_alias")}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="english_alias"
                            label="英文昵称"
                            value={english_alias}
                            onChange={this.handleChange("english_alias")}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="qq"
                            label="QQ"
                            value={qq}
                            onChange={this.handleChange("qq")}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        {success ? (
                            <CheckIcon />
                        ) : (
                            <Button onClick={this.handleSubmit} color="primary">
                                确认
                            </Button>
                        )}
                        <Button onClick={this.handleInfoClose} color="primary">
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.restOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="old_pass"
                            label="旧密码"
                            value={this.state.old_pass}
                            onChange={this.handleChange("old_pass")}
                            type="password"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="qq"
                            label="新密码"
                            value={this.state.new_pass}
                            onChange={this.handleChange("new_pass")}
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        {resetsuccess ? (
                            <div>密码重置成功 点击返回重新登录</div>
                        ) : (
                            <Button
                                onClick={this.handleRestSubmit}
                                color="primary"
                            >
                                确认
                            </Button>
                        )}
                        <Button onClick={this.handleRestClose} color="primary">
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(UserInfo);

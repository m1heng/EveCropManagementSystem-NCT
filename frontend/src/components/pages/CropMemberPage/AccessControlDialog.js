import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import { nctProvider } from "providers/nctProvider";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    progress: {
        margin: theme.spacing.unit * 2
    }
});

class AccessControlDialog extends React.Component {
    state = {
        fc: false,
        director: false,
        hr: false,
        button: false,
        success: false,
        progress: false
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const target_user = this.props.user;
        this.setState({
            fc: target_user.fc,
            director: target_user.director,
            hr: target_user.hr,
            progress: false,
            button: true,
            success: false
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.checked,
            progress: false,
            button: true,
            success: false
        });
    };

    handleClose = () => {
        this.state.success
            ? this.props.onClose(true)
            : this.props.onClose(false);
    };

    handleSaveChange = () => {
        this.setState({ progress: true, button: false, success: false });
        nctProvider
            .updateRole(this.props.user.public_id, {
                fc: this.state.fc,
                hr: this.state.hr,
                director: this.state.director
            })
            .then(() => {
                this.setState({
                    progress: false,
                    button: false,
                    success: true
                });
            })
            .catch(err => {
                this.setState({
                    progress: false,
                    button: true,
                    success: false
                });
            });
    };

    render() {
        const { classes, onClose, user, ...other } = this.props;
        const { fc, director, hr, button, success, progress } = this.state;
        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                {...other}
            >
                <DialogTitle id="simple-dialog-title">权限管理</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl
                            className={classes.formControl}
                            component="fieldset"
                        >
                            <FormLabel component="legend">
                                {user.chinese_alias}
                            </FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={fc}
                                            onChange={this.handleChange("fc")}
                                            value="fc"
                                        />
                                    }
                                    label="指挥"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={hr}
                                            onChange={this.handleChange("hr")}
                                            value="hr"
                                        />
                                    }
                                    label="招新"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={director}
                                            onChange={this.handleChange(
                                                "director"
                                            )}
                                            value="director"
                                        />
                                    }
                                    label="总监"
                                />
                            </FormGroup>
                            <FormHelperText>Be careful</FormHelperText>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    {button && (
                        <Button onClick={this.handleSaveChange} color="primary">
                            保存
                        </Button>
                    )}
                    {success && <CheckIcon />}
                    {progress && (
                        <CircularProgress className={classes.progress} />
                    )}
                    <Button onClick={this.handleClose} color="primary">
                        退出
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AccessControlDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func
};

export default withStyles(styles)(AccessControlDialog);

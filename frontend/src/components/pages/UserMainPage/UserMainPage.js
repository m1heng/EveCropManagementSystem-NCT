import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CharacterList from "./charlist";
import UserInfo from "./userinfo";

import { nctProvider } from "providers/nctProvider";
import userinfo from "./userinfo";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary
    }
});

class UserMainPage extends React.Component {
    state = {};

    componentDidMount() {
        const pid = localStorage.getItem("pid");
        nctProvider.getUserInfo(pid).then(info => {
            this.setState({ user: info });
        });

        nctProvider.getCharList(pid).then(data => {
            this.setState({ charlist: data });
        });
    }

    render() {
        const { classes } = this.props;
        const { user, charlist } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        {user && <UserInfo user={user} />}
                    </Grid>
                    <Grid item xs={8}>
                        <CharacterList charcters={charlist} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

UserMainPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserMainPage);

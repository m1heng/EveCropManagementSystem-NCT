import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CharacterList from "./charlist";
import UserInfo from "./userinfo";

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
        this.setState({
            user: {
                email: "someemail",
                chinese_alias: "米感觉",
                english_alias: "niubi",
                qq: "5465464566",
                registered_on: "2019-01-01T00:55:12.016087"
            },
            charlist: [
                {
                    id: "1",
                    name: "666niubi",
                    add_on: "2019-01-01T00:55:12.016087"
                },
                {
                    id: "2",
                    name: "666niubi",
                    add_on: "2019-01-01T00:55:12.016087"
                },
                {
                    id: "3",
                    name: "666niubi",
                    add_on: "2019-01-01T00:55:12.016087"
                },
                {
                    id: "4",
                    name: "666niubi",
                    add_on: "2019-01-01T00:55:12.016087"
                }
            ]
        });
    }

    render() {
        const { classes } = this.props;
        const { user, charlist } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <UserInfo user={user} />
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

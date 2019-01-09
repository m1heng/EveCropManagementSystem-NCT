import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import MemberView from "./MemberView";
import { nctProvider } from "providers/nctProvider";

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
});

class CropMemberPage extends React.Component {
    state = {
        value: 0,
        users: []
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentDidMount() {
        nctProvider.getUserList().then(data => {
            console.log(data);
            this.setState({ users: data });
        });
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="成员列表" />
                        <Tab label="角色列表" />
                    </Tabs>
                </AppBar>
                {value === 0 && (
                    <TabContainer>
                        {/* <MemberView users={this.state.users} /> */}
                    </TabContainer>
                )}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
            </div>
        );
    }
}

CropMemberPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CropMemberPage);

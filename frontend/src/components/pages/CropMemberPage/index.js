import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import MemberView from "./MemberView";
import CharacterView from "./CharacterView";
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
        users: null
    };

    constructor(props) {
        super(props);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentWillMount() {
        nctProvider.getUserList().then(userList => {
            nctProvider.getAllCharList().then(allcharList => {
                userList.map(user => {
                    user.characters = [];
                    return allcharList.map(char => {
                        if (char.user_id === user.id) {
                            user.characters.push(char);
                            return user;
                        }
                    });
                });
                this.setState({ allcharList: allcharList });
            });
            this.setState({ users: userList });
        });
    }

    render() {
        const { classes } = this.props;
        const { value, users, allcharList } = this.state;

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
                        {users && <MemberView users={users} />}
                    </TabContainer>
                )}
                {value === 1 && (
                    <TabContainer>
                        {allcharList && <CharacterView chars={allcharList} />}
                    </TabContainer>
                )}
            </div>
        );
    }
}

CropMemberPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CropMemberPage);

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
        users: null,
        test:[
            {
                "email": "111",
                "public_id": "2fdec22b-ff4e-42fd-bfa6-aeda5d4d48ec",
                "registered_on": "2019-01-09T04:18:45.735534",
                "admin": false,
                "fc": false,
                "member": true,
                "hr": false,
                "director": false,
                "chinese_alias": "111",
                "english_alias": "111",
                "qq": "111"
            },
            {
                "email": "nct@admin",
                "public_id": "2fdec22b-ff4e-42fd-bfa6-aeda5d4d48e5",
                "registered_on": "2019-01-09T04:18:45.735534",
                "admin": true,
                "fc": true,
                "member": true,
                "hr": true,
                "director": true,
                "chinese_alias": "232",
                "english_alias": "232",
                "qq": "232"
            }
        ]
    }
    
    constructor(props){
        super(props);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentWillMount() {
        nctProvider.getUserList().then(userList => {
            nctProvider.getAllCharList().then(allcharList =>{
                userList.map(user => {
                    user.characters = [];
                    return allcharList.map(char => {
                        if (char.user_id === user.id) {
                            user.characters.push(char);
                            return user;
                        }
                    });
                });
                console.log(allcharList);
                this.setState({allCharist : allcharList});
            })
            console.log(userList)
            this.setState({ users: userList });
        });
    }

    render() {
        const { classes } = this.props;
        const { value, users } = this.state;

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
                {value === 1 && <TabContainer>Item Two</TabContainer>}
            </div>
        );
    }
}

CropMemberPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CropMemberPage);

import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import { ESI_LOGIN_URL, ESI_CHAR_AV_URL } from "Constants";

const style = theme => ({
    root: {
        flex: 1
    },
    cost: {
        marginRight: "1em",
        color: theme.palette.text.primary
    },
    avatar: {
        background: theme.palette.background.avatar
    },
    fab: {
        align: "right"
    }
});

const CharacterList = ({ charcters = [], classes }) => (
    <Card className={classes.root}>
        <CardHeader
            title={
                <div>
                    已注册角色
                    <Button
                        size="small"
                        className={classes.fab}
                        color="secondary"
                        href={ESI_LOGIN_URL}
                    >
                        <AddIcon />
                    </Button>
                </div>
            }
        />

        <List dense={true}>
            {charcters.map(char => (
                <ListItem key={char.id}>
                    <Avatar
                        className={classes.avatar}
                        src={`${ESI_CHAR_AV_URL}/95887944_32.jpg`}
                    />

                    <ListItemText
                        primary={`${char.name} - 添加于：${new Date(
                            char.add_on
                        ).toLocaleString("en-GB")}`}
                    />
                </ListItem>
            ))}
        </List>
    </Card>
);

export default withStyles(style)(CharacterList);

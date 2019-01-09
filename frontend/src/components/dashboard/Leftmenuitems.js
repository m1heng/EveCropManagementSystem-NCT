import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccessibleIcon from "@material-ui/icons/Accessible";
import GradeIcon from "@material-ui/icons/Grade";
import FlightIcon from "@material-ui/icons/Flight";
import PeopleIcon from "@material-ui/icons/People";
import BuildIcon from "@material-ui/icons/Build";
import ChildCareIcon from "@material-ui/icons/ChildCare";

export const UserListItems = <div />;

export const DirectorListItems = (
    <div>
        <ListSubheader inset>管理界面</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <GradeIcon />
            </ListItemIcon>
            <ListItemText primary="军团管理" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="军团成员" />
        </ListItem>
        <ListItem button disabled>
            <ListItemIcon>
                <BuildIcon />
            </ListItemIcon>
            <ListItemText primary={<del>战损管理</del>} />
        </ListItem>
        <ListItem button disabled>
            <ListItemIcon>
                <ChildCareIcon />
            </ListItemIcon>
            <ListItemText primary={<del>舰队管理</del>} />
        </ListItem>
    </div>
);

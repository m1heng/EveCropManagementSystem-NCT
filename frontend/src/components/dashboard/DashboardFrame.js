import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { authProvider } from "providers/authProvider";
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
import blue from "@material-ui/core/colors/blue";
import { Link } from "react-router-dom";

const drawerWidth = 180;

const styles = theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        backgroundColor: blue[500]
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    chartContainer: {
        marginLeft: -22
    },
    tableContainer: {
        height: 320
    },
    h5: {
        marginBottom: theme.spacing.unit * 2
    }
});

class DashboardFrame extends React.Component {
    state = {
        open: true
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleLogout = () => {
        authProvider.logout();
        window.location.reload();
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(
                        classes.appBar,
                        this.state.open && classes.appBarShift
                    )}
                >
                    <Toolbar
                        disableGutters={!this.state.open}
                        className={classes.toolbar}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            九州 ESI 系统
                        </Typography>
                        <IconButton onClick={this.handleLogout} color="inherit">
                            登出
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(
                            classes.drawerPaper,
                            !this.state.open && classes.drawerPaperClose
                        )
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <div>
                            <ListItem button component={Link} to="/">
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="主页" />
                            </ListItem>
                            {authProvider.isMember() ? (
                                <div>
                                    <ListItem button disabled>
                                        <ListItemIcon>
                                            <FlightIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<del>舰队</del>}
                                        />
                                    </ListItem>
                                    <ListItem button disabled>
                                        <ListItemIcon>
                                            <AccessibleIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<del>补损</del>}
                                        />
                                    </ListItem>
                                </div>
                            ) : (
                                <div />
                            )}
                        </div>
                    </List>
                    <Divider />
                    <List>
                        {(authProvider.isDirector() ||
                            authProvider.isAdmin()) && (
                            <div>
                                <ListSubheader inset>管理界面</ListSubheader>
                                <ListItem
                                    button
                                    component={Link}
                                    to="/cropmain"
                                >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="军团管理" />
                                </ListItem>
                                <ListItem
                                    button
                                    component={Link}
                                    to="/cropmember"
                                >
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="军团成员" />
                                </ListItem>
                                <ListItem button disabled>
                                    <ListItemIcon>
                                        <BuildIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<del>战损管理</del>}
                                    />
                                </ListItem>
                                <ListItem button disabled>
                                    <ListItemIcon>
                                        <ChildCareIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<del>舰队管理</del>}
                                    />
                                </ListItem>
                            </div>
                        )}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {this.props.children}
                    <div className={classes.tableContainer} />
                </main>
            </div>
        );
    }
}

DashboardFrame.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardFrame);

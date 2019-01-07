import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import { Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { Link } from 'react-router-dom'


const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify:'center',
      
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justify:'center',
      justifyContent: 'center',
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
      width: 150,
    },
    textField: {
        width: 300,
    },
  });
  

class MyLoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }

    }

    _handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    _handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    
    submit = (e) => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = { 
            email : this.state.email,
            password: this.state.password
         };

        // Dispatch the userLogin action (injected by connect)
        this.props.userLogin(credentials);
    }



    render() {
        const { classes } = this.props;
        return (
    <main className={this.props.classes.main}>
      <Paper className={this.props.classes.paper}>
        <Typography component="h1" variant="h5">
        九州<del>简陋</del>ESI
        </Typography>
        <form onSubmit={this.submit} className={this.props.classes.form}> 
                
            <TextField
                className={classes.textField}
                onChange={this._handleEmailChange}
                label="邮箱"
                />
            <br/>
            
            <TextField
                className={classes.textField}
                onChange={this._handlePasswordChange}
                type="password"
                label="密码"
            />
            <br/>
                <Button 
                    type='submit' 
                    fullWidth variant="contained" 
                    className={this.props.classes.submit}>
                    登录
                </Button>
                <Button
                    fullWidth variant="contained" 
                    className={this.props.classes.submit}
                    component={Link}
                    to='/register'>
                    注册
                </Button>
              
        </form>
      </Paper>
    </main>
        );
    }
};
MyLoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const enhance = compose(
    connect(
        undefined,
        {userLogin}
    ),
    withStyles(styles)
);

export default enhance(MyLoginPage);


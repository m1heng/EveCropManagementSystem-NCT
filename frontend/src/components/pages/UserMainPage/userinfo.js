import React, { Component } from 'react';
import { withStyles, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

const styles = theme => ({
    card: {
        flex: 1,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    
})

const UserInfo = ({user = {}, classes}) =>(
    <Card className={classes.card}>
        <CardHeader title="基本信息"/>
        <CardContent>
            <Typography gutterBottom variant="title" >
                邮箱: {user.email}<br/>
                中文昵称: {user.chinese_alias}<br/>
                英文昵称: {user.english_alias}<br/>
                QQ：{user.qq}<br/>
                注册时间:{new Date(user.registered_on ).toLocaleString('en-GB')}
            </Typography>
        </CardContent>
        <CardActions >
            <Button style={{ marginRight: '1em' }} size="medium" color="primary">
                修改
            </Button>
        </CardActions>
    </Card>
);


export default withStyles(styles)(UserInfo);












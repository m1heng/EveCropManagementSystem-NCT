import React, { Component } from "react";
import axios from "axios";
import { NCT_API_URL } from "Constants";
import decodeJwt from "jwt-decode";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2
    }
});

class ESIcallback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            esi_access_token: "",
            esi_refresh_token: "",
            esi_char_info: {},
            message: "加载中"
        };
    }
    componentDidMount() {
        const queryString = require("query-string");
        const parsed = queryString.parse(this.props.location.search);
        const encoded_authcode =
            "YjZhOTFlOTNjZWMyNGQ3YWI2MWYyNmY0MTEyY2ExM2E6T0Q4YlpQdmZyN003VEVucG16eldISEZ0eFhqTW1sMDc0cUZLV2tWSA==";
        console.log(parsed.code);
        axios({
            method: "post",
            url:
                "https://cors-anywhere.herokuapp.com/https://login.eveonline.com/oauth/token",
            params: {
                grant_type: "authorization_code",
                code: parsed.code
            },
            headers: {
                Authorization: "Basic " + encoded_authcode,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(response => {
                const AuthResponse = {
                    esi_access_token: response.data.access_token,
                    esi_refresh_token: response.data.refresh_token
                };
                return AuthResponse;
            })
            .then(AuthResponse => {
                return axios({
                    method: "get",
                    url: `https://cors-anywhere.herokuapp.com/https://esi.evetech.net/verify/`,
                    headers: {
                        Authorization: `Bearer ${
                            AuthResponse.esi_access_token
                        }`,
                        Pragma: "no-cache"
                    }
                })
                    .then(response => {
                        const VerifyResponse = response.data;
                        return VerifyResponse;
                    })
                    .then(VerifyResponse => {
                        console.log(VerifyResponse);
                        axios({
                            method: "post",
                            url: `${NCT_API_URL}/characters/${localStorage.getItem(
                                "pid"
                            )}`,
                            headers: {
                                "x-access-token": localStorage.getItem("token")
                            },
                            data: {
                                esi_id: VerifyResponse.CharacterID,
                                name: VerifyResponse.CharacterName,
                                esi_refresh_token:
                                    AuthResponse.esi_refresh_token
                            }
                        })
                            .then(resp => {
                                this.setState({
                                    message: "成功，正在返回主页"
                                });
                                setTimeout(() => {
                                    this.props.history.push("/");
                                }, 3000);
                            })
                            .catch(error => {
                                if (
                                    error.response.data.status === "Duplicate"
                                ) {
                                    this.setState({
                                        message: "失败，角色已被注册，正在返回"
                                    });
                                } else {
                                    this.setState({
                                        message: error.response.data.message
                                    });
                                }

                                setTimeout(() => {
                                    this.props.history.push("/");
                                }, 5000);
                            });
                    })
                    .catch(error => {
                        this.setState({
                            message: "ESI Verify Server Error, Contact M1heng"
                        });
                        setTimeout(() => {
                            this.props.history.push("/");
                        }, 10000);
                    });
            })
            .catch(error => {
                this.setState({
                    message: "ESI Login Server Error, Contact M1heng"
                });
                setTimeout(() => {
                    this.props.history.push("/");
                }, 10000);
            });
    }
    render() {
        const { classes } = this.props;
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <CircularProgress className={classes.progress} />
                    <br />
                    <h1>{this.state.message}</h1>
                </div>
            </div>
        );
    }
}
ESIcallback.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ESIcallback);

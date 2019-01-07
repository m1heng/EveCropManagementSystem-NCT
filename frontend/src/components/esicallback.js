import React, { Component } from "react";
import axios from "axios";
import decodeJwt from "jwt-decode";

export default class ESIcallback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            esi_access_token: "",
            esi_refresh_token: "",
            esi_char_info: {}
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
                console.log(response.data);
                console.log(response.refresh_token);
                this.setState({
                    esi_access_token: response.data.access_token,
                    esi_refresh_token: response.data.refresh_token
                });
                axios({
                    method: "get",
                    url: `https://cors-anywhere.herokuapp.com/https://esi.tech.ccp.is/verify/`,
                    headers: {
                        Authorization: `Bearer ${this.state.esi_access_token}`
                    }
                })
                    .then(res => {
                        this.setState({
                            esi_char_info: res.data
                        });
                        axios({
                            method: "post",
                            url: `http://127.0.0.1:5000/characters/${localStorage.getItem(
                                "pid"
                            )}`,
                            headers: {
                                "x-access-token": localStorage.getItem("token")
                            },
                            data: {
                                esi_id: this.state.esi_char_info.CharacterID,
                                name: this.state.esi_char_info.CharacterName,
                                esi_refresh_token: this.state.esi_refresh_token
                            }
                        })
                            .then(resp => {
                                console.log(resp);
                            })
                            .catch(error => {});
                    })
                    .catch(error => {});
            })
            .catch(errror => {});
    }
    render() {
        return <h1>加载中</h1>;
    }
}

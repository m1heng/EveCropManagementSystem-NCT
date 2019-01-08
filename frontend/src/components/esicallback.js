import React, { Component } from "react";
import axios from "axios";
import { NCT_API_URL } from "Constants";
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
                const AuthResponse = {
                    esi_access_token: response.data.access_token,
                    esi_refresh_token: response.data.refresh_token
                };
                return AuthResponse;
            })
            .then(AuthResponse => {
                return axios({
                    method: "get",
                    url: `https://cors-anywhere.herokuapp.com/https://esi.tech.ccp.is/verify/`,
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
                                console.log(resp);

                                this.props.history.push("/");
                            })
                            .catch(error => {});
                    })
                    .catch(error => {});
            })
            .catch(error => {});
    }
    render() {
        return <h1>加载中</h1>;
    }
}

import Axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { ESI_AUTH_URL, ESI_APP_AUTH_TOKEN, ESI_BASE_URL } from "Constants";

const querystring = require("querystring");

const cache = setupCache({
    maxAge: 15 * 60 * 1000
});

const cachedAxios = Axios.create({
    adapter: cache.adapter
});

function getNamebyId(id) {
    return cachedAxios({
        url: `${ESI_BASE_URL}/latest/universe/names/`,
        method: "post",
        data: `[${id}]`
    }).then(resp => {
        return resp.data[0].name;
    });
}

function getNamesbyIds(ids) {
    return cachedAxios({
        url: `${ESI_BASE_URL}/latest/universe/names/`,
        method: "post",
        data: ids
    }).then(resp => {
        return resp.data;
    });
}

function getAccessToken(refresh_token) {
    return Axios({
        url: `${ESI_AUTH_URL}`,
        method: "post",
        headers: {
            Authorization: `Basic ${ESI_APP_AUTH_TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: querystring.stringify({
            grant_type: "refresh_token",
            refresh_token: refresh_token
        })
    })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function characterIDtoInfo(char_id) {
    if (char_id === 0) return 0;
    return cachedAxios({
        url: `${ESI_BASE_URL}/latest/characters/${char_id}/`,
        method: "get"
    })
        .then(resp => {
            return resp.data.name;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function locationIDtoName(loc_id, refresh_response_data) {
    if (loc_id < 2147483647) return getNamebyId(loc_id);
    return cachedAxios({
        url: `${ESI_BASE_URL}/latest/universe/structures/${loc_id}`,
        method: "get",
        headers: {
            Authorization: `${refresh_response_data.token_type} ${
                refresh_response_data.access_token
            }`,
            Accept: "application/json"
        }
    })
        .then(resp => {
            return resp.data.name;
        })
        .catch(err => {
            return "No Access";
        });
}

function getCharContracts(character, refresh_response_data, page_num) {
    if (!refresh_response_data) {
        return getAccessToken(character.esi_refresh_token)
            .then(resp => {
                return getCharContracts(character, resp, page_num);
            })
            .catch(err => {
                return Promise.reject();
            });
    }
    return Axios({
        url: `${ESI_BASE_URL}/latest/characters/${character.esi_id}/contracts/`,
        method: "get",
        headers: {
            Authorization: `${refresh_response_data.token_type} ${
                refresh_response_data.access_token
            }`,
            Accept: "application/json"
        },
        data: querystring.stringify({ page: page_num })
    })
        .then(resp => {
            if (resp.headers["x-pages"] != page_num && page_num < 5) {
                return resp.data.push(
                    ...getCharContracts(
                        character,
                        refresh_response_data,
                        page_num + 1
                    )
                );
            }
            return resp.data;
        })
        .catch(err => {
            return Promise.reject();
        });
}

function getCharWallet(character, refresh_response_data, page_num) {
    if (!refresh_response_data) {
        return getAccessToken(character.esi_refresh_token)
            .then(resp => {
                return getCharWallet(character, resp, page_num);
            })
            .catch(err => {
                return Promise.reject();
            });
    }
    return Axios({
        url: `${ESI_BASE_URL}/latest/characters/${
            character.esi_id
        }/wallet/journal/`,
        method: "get",
        headers: {
            Authorization: `${refresh_response_data.token_type} ${
                refresh_response_data.access_token
            }`,
            Accept: "application/json"
        },
        data: querystring.stringify({ page: page_num })
    })
        .then(resp => {
            if (resp.headers["x-pages"] != page_num) {
                return resp.data.push(
                    ...getCharWallet(
                        character,
                        refresh_response_data,
                        page_num + 1
                    )
                );
            }
            return resp.data;
        })
        .catch(err => {
            return Promise.reject();
        });
}

export const esiProvider = {
    getCharContracts,
    characterIDtoInfo,
    locationIDtoName,
    getAccessToken,
    getNamebyId,
    getCharWallet,
    getNamesbyIds
};

import axios from "axios";
import { NCT_API_URL } from "Constants";

function getUserInfo(pid) {
    const current_pid = localStorage.getItem("pid");
    const current_role = localStorage.getItem("role");
    const current_token = localStorage.getItem("token");

    if (pid !== current_pid && current_role !== "director") {
        return Promise.reject();
    }
    return axios({
        headers: {
            "x-access-token": current_token
        },
        url: `${NCT_API_URL}/users/${current_pid}`,
        method: "get"
    }).then(res => {
        console.log(res.data);
        return res.data;
    });
}

function getUserList() {
    const current_role = localStorage.getItem("role");
    if (current_role !== "admin" || current_role !== "director") {
        return Promise.reject("Unauthorized");
    }
    const current_pid = localStorage.getItem("pid");
    const current_token = localStorage.getItem("token");

    return axios({
        headers: { "x-access-token": current_token },
        usl: `${NCT_API_URL}/users`,
        method: "get"
    })
        .then(response => {
            return response.data;
        })
        .catch(err => {});
}

function getCharList(pid) {
    const current_pid = localStorage.getItem("pid");
    const current_role = localStorage.getItem("role");
    if (current_pid !== pid && current_role !== "director") {
        return Promise.reject("Unauthorized");
    }
    const current_token = localStorage.getItem("token");

    return axios({
        headers: { "x-access-token": current_token },
        url: `${NCT_API_URL}/characters/${pid}`,
        method: "get"
    })
        .then(response => {
            return response.data;
        })
        .catch(err => {});
}

function addChar(pid, character) {
    const current_pid = localStorage.getItem("pid");
    const current_role = localStorage.getItem("role");
    const current_token = localStorage.getItem("token");
    if (current_pid !== pid) {
        return Promise.reject("denied");
    }

    return axios({
        url: `${NCT_API_URL}/characters/${pid}`,
        method: "post",
        headers: { "x-access-token": current_token },
        data: character
    })
        .then(response => {})
        .catch(err => {});
}

function deleteChar(pid, char_esi_id) {
    const current_pid = localStorage.getItem("pid");
    const current_role = localStorage.getItem("role");
    const current_token = localStorage.getItem("token");
    if (current_pid !== pid) {
        return Promise.reject("denied");
    }

    return axios({
        url: `${NCT_API_URL}/characters/${pid}`,
        method: "delete",
        headers: { "x-access-token": current_token },
        data: {
            char_esi_id: char_esi_id
        }
    })
        .then(response => {
            window.location.reload();
        })
        .catch(err => {});
}

export const nctProvider = {
    getUserInfo,
    getCharList,
    deleteChar
};

import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { NCT_API_URL } from "Constants";
import { authProvider } from "./authProvider";

const cache = setupCache({
    maxAge: 15 * 60 * 1000
});

const cachedAxios = axios.create({
    adapter: cache.adapter
});

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
    if (!authProvider.isAdmin() || !authProvider.isDirector()) {
        return Promise.reject("Unauthorized");
    }
    const current_pid = localStorage.getItem("pid");
    const current_token = localStorage.getItem("token");

    return axios({
        headers: { "x-access-token": current_token },
        url: `${NCT_API_URL}/users/`,
        method: "get"
    })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
}

function getAllCharList() {
    const current_role = localStorage.getItem("role");
    if (!authProvider.isAdmin() || !authProvider.isDirector()) {
        return Promise.reject("Unauthorized");
    }
    const current_pid = localStorage.getItem("pid");
    const current_token = localStorage.getItem("token");

    return axios({
        headers: { "x-access-token": current_token },
        url: `${NCT_API_URL}/characters/`,
        method: "get"
    })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
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

function updateRole(pid, new_roles) {
    if (!authProvider.isAdmin() || !authProvider.isDirector()) {
        return Promise.reject("Unauthorized");
    }
    const current_pid = localStorage.getItem("pid");
    const current_token = localStorage.getItem("token");

    return axios({
        headers: { "x-access-token": current_token },
        url: `${NCT_API_URL}/auth/roleoperation/${pid}`,
        method: "put",
        data: new_roles
    })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return Promise.reject();
        });
}

function updateUserinfo({ chinese_alias, english_alias, qq }) {
    const pid = localStorage.getItem("pid");
    const current_token = localStorage.getItem("token");
    return axios({
        headers: { "x-access-token": current_token },
        url: `${NCT_API_URL}/users/${pid}`,
        method: "put",
        data: {
            chinese_alias: chinese_alias,
            english_alias: english_alias,
            qq: qq
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return Promise.reject();
        });
}

function resetPassword(old_pass, new_pass) {
    const pid = localStorage.getItem("pid");
    const token = localStorage.getItem("token");
    return axios({
        headers: { "x-access-token": token },
        url: `${NCT_API_URL}/auth/resetpassword`,
        method: "put",
        data: {
            old_pass: old_pass,
            new_pass: new_pass
        }
    })
        .then(resp => {
            return resp.data;
        })
        .catch(err => {
            console.log(err);
            return Promise.reject();
        });
}

export const nctProvider = {
    getUserInfo,
    getCharList,
    deleteChar,
    getUserList,
    getAllCharList,
    updateRole,
    updateUserinfo,
    resetPassword
};

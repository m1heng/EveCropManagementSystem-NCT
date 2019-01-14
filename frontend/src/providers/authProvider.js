import decodeJwt from "jwt-decode";
import { NCT_API_URL } from "Constants";

function login(credentials) {
    const { email, password } = credentials;
    const request = new Request(`${NCT_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({ "Content-Type": "application/json" })
    });
    return fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return response.json().then(text => {
                    const error = text && text.message;
                    return Promise.reject(error);
                });
            }
        })
        .then(({ token }) => {
            const decodedToken = decodeJwt(token);
            localStorage.setItem("token", token);
            localStorage.setItem("pid", decodedToken.pid);
            localStorage.setItem("role", decodedToken.role);
            localStorage.setItem("exp", decodedToken.exp);
        });
}

function isNotExpired() {
    const exp_time = new Date(0);
    exp_time.setUTCSeconds(localStorage.getItem("exp"));
    const cur_time = new Date();
    return exp_time > cur_time;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("pid");
    localStorage.removeItem("role");
    localStorage.removeItem("exp");
}

function isLoggedIn() {
    if (!isNotExpired() || !localStorage.getItem("token")) {
        logout();
        return false;
    }
    return true;
}

function isDirector() {
    const current_role = localStorage.getItem("role");
    return current_role.includes("director");
}

function isAdmin() {
    const current_role = localStorage.getItem("role");
    return current_role.includes("admin");
}

function isFC() {
    const current_role = localStorage.getItem("role");
    return current_role.includes("fc");
}

function isHR() {
    const current_role = localStorage.getItem("role");
    return current_role.includes("hr");
}

function isMember() {
    const current_role = localStorage.getItem("role");
    return current_role.includes("member");
}

export const authProvider = {
    login,
    logout,
    isDirector,
    isAdmin,
    isFC,
    isHR,
    isMember,
    isNotExpired,
    isLoggedIn
};

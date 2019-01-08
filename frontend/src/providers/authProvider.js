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
            const current_user = {
                token: token,
                pid: decodedToken.pid,
                role: decodedToken.tole
            };

            localStorage.setItem("current_user", current_user);
            return current_user;
        });
}

function logout() {
    localStorage.removeItem("current_user");
}

function isDicrector() {}

function isAdmin() {}

function isFC() {}

export const authProvider = {
    login
};

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
        });
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("pid");
    localStorage.removeItem("role");
    window.location.reload();
}

function isDicrector() {}

function isAdmin() {}

function isFC() {}

export const authProvider = {
    login,
    logout
};

import decodeJwt from "jwt-decode";

export default (type, params) => {
    // called when the user attempts to log in
    if (type === "AUTH_LOGIN") {
        const { email, password } = params;
        const request = new Request("http://127.0.0.1:5000/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: new Headers({ "Content-Type": "application/json" })
        });
        return fetch(request)
            .then(response => {
                if (response.status === 200) {
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = decodeJwt(token);
                localStorage.setItem("token", token);
                localStorage.setItem("pid", decodedToken.pid);
                console.log(decodedToken.pid);
            });
    }
    // called when the user clicks on the logout button
    if (type === "AUTH_LOGOUT") {
        localStorage.removeItem("token");
        localStorage.removeItem("pid");
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === "AUTH_ERROR") {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("pid");
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === "AUTH_CHECK") {
        return localStorage.getItem("token")
            ? Promise.resolve()
            : Promise.reject({ redirectTo: "/login" });
    }
    return Promise.reject("Unknown method");
};


function setCookie() {
    // document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

    const key = '';
    const value = '';

    const expires = new Date().toUTCString();
    document.cookie = `${key}=${value}; expires=${expires}; path=/`;
}
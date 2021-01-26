// listen for click on logout button and call logout endpoint
function logout() {
    fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    }).then(function () {
        document.location.replace('/login');
    }).catch(err => console.log(err));
}

document.querySelector("#logout-link").addEventListener("click", logout);